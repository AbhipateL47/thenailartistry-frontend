import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { orderService, ShippingAddress } from '@/services/orderService';
import { userService, Address } from '@/services/userService';
import { paymentService } from '@/services/paymentService';
import { generateDummyAddress } from '@/utils/dummyAddress';
import { generateIdempotencyKey } from '@/utils/generateIdempotencyKey';
import { RazorpayCheckout } from '@/components/payment/RazorpayCheckout';
import { OTPLoginModal } from '@/components/auth/OTPLoginModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { formatCurrency } from '@/utils/formatCurrency';
import { Separator } from '@/components/ui/separator';
import { Loader2, MapPin, Tag, Search, HelpCircle, ShoppingBag, CreditCard, Lock, ExternalLink } from 'lucide-react';
import { toast } from '@/utils/toast';
import { useForm, Controller } from 'react-hook-form';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link } from 'react-router-dom';

interface CheckoutFormData {
  // Contact
  email: string;
  newsletter: boolean;
  // Shipping Address
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  saveAddress: boolean;
  // Billing
  sameAsShipping: boolean;
  billingFullName: string;
  billingPhone: string;
  billingEmail: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  // Payment
  paymentMethod: 'razorpay' | 'cod';
}

export default function Checkout() {
  usePageTitle('Secure Checkout - Complete Your Order');
  const navigate = useNavigate();
  const { items, subtotal, clearCart, syncCart } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isCartLoading, setIsCartLoading] = useState(false);

  // Log page load
  useEffect(() => {
    console.log('📄 Checkout Page Loaded');
  }, []);

  // After order is placed successfully, sync the cart
  // This ensures any remaining items in guest cart are synced to user's account

  // Store form data when user needs to login first
  const [pendingFormData, setPendingFormData] = useState<CheckoutFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Generate dummy address on component mount
  const [dummyAddress] = useState(() => generateDummyAddress());
  
  const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      sameAsShipping: true,
      paymentMethod: 'razorpay',
      country: 'India',
      billingCountry: 'India',
      newsletter: false,
      saveAddress: false,
      // Split fullName into firstName and lastName
      firstName: dummyAddress.fullName?.split(' ')[0] || '',
      lastName: dummyAddress.fullName?.split(' ').slice(1).join(' ') || '',
      email: user?.email || dummyAddress.email || '',
      phone: user?.phone || dummyAddress.phone || '',
      addressLine1: dummyAddress.addressLine1 || '',
      addressLine2: dummyAddress.addressLine2 || '',
      city: dummyAddress.city || '',
      state: dummyAddress.state || '',
      postalCode: dummyAddress.postalCode || '',
    },
  });

  // Reset form with new dummy data on reload
  useEffect(() => {
    const newDummy = generateDummyAddress();
    const nameParts = (newDummy.fullName || '').split(' ');
    reset({
      sameAsShipping: true,
      paymentMethod: 'razorpay',
      country: 'India',
      billingCountry: 'India',
      newsletter: false,
      saveAddress: false,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: user?.email || newDummy.email || '',
      phone: user?.phone || newDummy.phone || '',
      addressLine1: newDummy.addressLine1 || '',
      addressLine2: newDummy.addressLine2 || '',
      city: newDummy.city || '',
      state: newDummy.state || '',
      postalCode: newDummy.postalCode || '',
    });
  }, []); // Only on mount

  const sameAsShipping = watch('sameAsShipping');
  const paymentMethod = watch('paymentMethod');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [showRazorpayCheckout, setShowRazorpayCheckout] = useState(false);
  const [currentOrderIntentId, setCurrentOrderIntentId] = useState<string | null>(null);
  const [currentOrderNumber, setCurrentOrderNumber] = useState<string | null>(null);
  const [currentIdempotencyKey, setCurrentIdempotencyKey] = useState<string | null>(null);
  const [razorpayKeyId, setRazorpayKeyId] = useState<string | null>(null);
  const [razorpayOrderId, setRazorpayOrderId] = useState<string | null>(null);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isSubmittingRef = useRef(false); // Prevent double submission

  // Fetch saved addresses for logged-in users
  const { data: savedAddresses } = useQuery({
    queryKey: ['user-addresses'],
    queryFn: userService.getAddresses,
    enabled: isAuthenticated,
  });

  // Calculate totals
  const effectiveSubtotal = subtotal;
  const shippingFee = effectiveSubtotal > 1000 ? 0 : 50;
  const tax = Math.round(effectiveSubtotal * 0.18);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const grandTotal = effectiveSubtotal + shippingFee + tax - discount;

  // Load default address if available
  useEffect(() => {
    if (savedAddresses && savedAddresses.length > 0 && isAuthenticated && !useSavedAddress) {
      const defaultAddress = savedAddresses.find(addr => addr.isDefault) || savedAddresses[0];
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
        setUseSavedAddress(true);
      }
    }
  }, [savedAddresses, isAuthenticated]);

  // Handle address selection
  const handleAddressSelect = (address: Address) => {
    setSelectedAddressId(address._id);
    setUseSavedAddress(true);
  };

  // Handle coupon code
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    setIsApplyingCoupon(true);
    // TODO: Implement coupon validation API
    // For now, mock validation
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'WELCOME10') {
        const discountAmount = Math.round(subtotal * 0.1);
        setDiscount(discountAmount);
        toast.success('Coupon applied! 10% discount');
      } else {
        toast.error('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 500);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    // Prevent double submission
    if (isSubmittingRef.current || isSubmitting) {
      toast.error('Please wait, order is being processed...');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Check if user is logged in - if not, show login modal first
    if (!isAuthenticated) {
      setPendingFormData(data);
      setShowLoginModal(true);
      return;
    }

    // User is authenticated, proceed with order creation
    await processOrder(data);
  };

  const processOrder = async (data: CheckoutFormData) => {
    // Prevent double submission
    if (isSubmittingRef.current || isSubmitting) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      // Generate idempotency key for this payment attempt
      const idempotencyKey = generateIdempotencyKey(
        `order-${Date.now()}`,
        grandTotal
      );
      // Use saved address if selected, otherwise use form data
      let shippingAddress: ShippingAddress;
      
      // Combine firstName and lastName
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      
      if (useSavedAddress && selectedAddressId && savedAddresses) {
        const selectedAddress = savedAddresses.find(addr => addr._id === selectedAddressId);
        if (selectedAddress) {
          shippingAddress = {
            fullName: selectedAddress.name || '',
            phone: selectedAddress.phone || '',
            email: user?.email || data.email,
            addressLine1: selectedAddress.line1 || '',
            addressLine2: selectedAddress.line2 || undefined,
            city: selectedAddress.city || '',
            state: selectedAddress.state || '',
            postalCode: selectedAddress.postalCode || '',
            country: selectedAddress.country || 'India',
          };
        } else {
          shippingAddress = {
            fullName,
            phone: data.phone,
            email: data.email,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 || undefined,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
          };
        }
      } else {
        shippingAddress = {
          fullName,
          phone: data.phone,
          email: data.email,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2 || undefined,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        };
      }

      const billingAddress: ShippingAddress = sameAsShipping
        ? shippingAddress
        : {
            fullName: data.billingFullName,
            phone: data.billingPhone,
            email: data.billingEmail,
            addressLine1: data.billingAddressLine1,
            addressLine2: data.billingAddressLine2 || undefined,
            city: data.billingCity,
            state: data.billingState,
            postalCode: data.billingPostalCode,
            country: data.billingCountry,
          };

      // Filter out items with invalid productIds (mock data has string IDs like "1")
      // Valid MongoDB ObjectId is 24 hex characters
      const validItems = items.filter(item => {
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(item.productId);
        if (!isValidObjectId) {
          console.warn(`Skipping item with invalid productId: ${item.productId}`);
        }
        return isValidObjectId;
      });

      if (validItems.length === 0) {
        toast.error('No valid items in cart. Please add products to your cart.');
        setIsSubmitting(false);
        isSubmittingRef.current = false;
        return;
      }

      if (validItems.length < items.length) {
        toast.warning(`${items.length - validItems.length} invalid item(s) removed from cart. Please add valid products.`);
      }

      // Map payment method: 'razorpay' -> 'upi' (default for Razorpay), 'cod' -> 'upi' (COD not supported, use UPI)
      // Note: Backend expects 'upi' | 'card' | 'netbanking', so we map both to 'upi'
      const paymentMethod: 'upi' | 'card' | 'netbanking' = 'upi';

      const orderIntentData = {
        items: validItems.map(item => ({
          ...item,
          variantSku: item.variant || undefined, // Map variant to variantSku for backend
        })),
        shippingAddress,
        billingAddress,
        paymentMethod,
        ...(!isAuthenticated && {
          guestEmail: data.email,
          guestPhone: data.phone,
        }),
      };

      // Create OrderIntent (temporary state before payment)
      const orderIntentResponse = await orderService.createOrderIntent(orderIntentData);
      const orderIntentId = orderIntentResponse.data.orderIntentId;

      // Initiate Razorpay payment for all payment methods
      try {
        const paymentResponse = await paymentService.createOrder({
          orderIntentId,
          amount: grandTotal,
          paymentMethod: paymentMethod,
          idempotencyKey,
        });

        // Store payment details
        setCurrentOrderIntentId(orderIntentId);
        setCurrentIdempotencyKey(idempotencyKey);
        setRazorpayKeyId(paymentResponse.data.razorpayKeyId);
        setRazorpayOrderId(paymentResponse.data.razorpayOrderId);
        setCurrentPaymentMethod(data.paymentMethod);

        // Open Razorpay checkout
        setShowRazorpayCheckout(true);
        
        // Keep button disabled and loading until payment completes
        // Don't clear cart or navigate yet - wait for payment confirmation
        return;
      } catch (paymentError: any) {
        console.error('Payment initiation error:', paymentError);
        toast.error(paymentError.response?.data?.message || 'Failed to initiate payment. Please try again.');
        // Order is created but payment failed - user can retry payment
        throw paymentError;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  // Handle payment success
  const handlePaymentSuccess = async (orderNumber: string, paymentId: string) => {
    setShowRazorpayCheckout(false);
    setIsSubmitting(false);
    isSubmittingRef.current = false;
    
    // Clear cart (both frontend and backend)
    clearCart();
    
    navigate(`/order-confirmation/${orderNumber}`, {
      state: { 
        orderData: {
          orderNumber,
          payment: { 
            status: 'paid', 
            method: currentPaymentMethod || 'upi', 
            provider: 'razorpay' 
          },
        },
      },
    });
  };

  // Handle payment error
  const handlePaymentError = (error: string) => {
    setShowRazorpayCheckout(false);
    setIsSubmitting(false);
    isSubmittingRef.current = false;
    // Don't clear cart - user can retry
    if (error !== 'Payment cancelled') {
      toast.error(error || 'Payment failed. Please try again.');
    }
  };

  // Show loading state
  if (isCartLoading || (isAuthenticated && isLoading)) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Please add items to your cart before checkout.
          </p>
          <Button asChild>
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  // Indian states list
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-2xl font-bold text-primary">The Nail Artistry</Link>
              <p className="text-sm text-gray-500">Get Press-on Nails at Home</p>
      </div>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <ShoppingBag className="h-6 w-6" />
            </Link>
        </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-8 max-w-7xl mx-auto">
          {/* Left Column - Forms */}
            <div className="space-y-6 order-2 lg:order-1">
              {/* Contact Section */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Contact</h2>
                  {!isAuthenticated && (
                    <Link to="/login" className="text-sm text-primary hover:underline">
                      Sign in
                    </Link>
                              )}
                            </div>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="newsletter"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="newsletter"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
                      Email me with news and offers
                    </Label>
                  </div>
                </div>
              </section>

              {/* Delivery Section */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery</h2>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="country">Country/Region</Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                  <Input
                        id="firstName"
                        {...register('firstName', { required: 'First name is required' })}
                    className="mt-1"
                  />
                      {errors.firstName && (
                        <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        {...register('lastName', { required: 'Last name is required' })}
                        className="mt-1"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="addressLine1">Address</Label>
                    <div className="relative mt-1">
                  <Input
                    id="addressLine1"
                    {...register('addressLine1', { required: 'Address is required' })}
                        className="pr-10"
                  />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  {errors.addressLine1 && (
                    <p className="text-sm text-destructive mt-1">{errors.addressLine1.message}</p>
                  )}
                </div>
                  <div>
                    <Label htmlFor="addressLine2">Apartment, suite, etc.</Label>
                    <Input
                      id="addressLine2"
                      {...register('addressLine2')}
                      className="mt-1"
                    />
                </div>
                  <div className="grid grid-cols-3 gap-4">
                <div>
                      <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register('city', { required: 'City is required' })}
                    className="mt-1"
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                      <Label htmlFor="state">State</Label>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {indianStates.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                  )}
                </div>
                <div>
                      <Label htmlFor="postalCode">PIN code</Label>
                  <Input
                    id="postalCode"
                        {...register('postalCode', { required: 'PIN code is required' })}
                    className="mt-1"
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
                  )}
                </div>
                  </div>
                <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      Phone
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </Label>
                  <Input
                      id="phone"
                      type="tel"
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Phone must be 10 digits',
                        },
                      })}
                    className="mt-1"
                  />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>
                  {isAuthenticated && (
                    <div className="flex items-center space-x-2">
                <Controller
                        name="saveAddress"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                            id="saveAddress"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                      <Label htmlFor="saveAddress" className="text-sm font-normal cursor-pointer">
                        Save this information for next time
                </Label>
              </div>
                  )}
                  </div>
              </section>

              {/* Shipping Method Section */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Shipping method</h2>
                    <Input
                  placeholder="Enter your shipping address to view available shipping methods"
                  disabled
                  className="bg-gray-50"
                />
              </section>

              {/* Payment Section */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Payment</h2>
                <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="razorpay" id="razorpay" />
                          <div className="flex-1">
                            <Label htmlFor="razorpay" className="font-medium cursor-pointer">
                              Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)
                            </Label>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <span>UPI</span>
                                <CreditCard className="h-4 w-4" />
                                <span>+17</span>
                  </div>
                  </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Clicking "Pay now" will redirect you to Razorpay to complete your purchase securely.
                            </p>
                            <div className="mt-3 p-2 bg-gray-50 rounded border border-gray-200 text-xs text-gray-400">
                              [Browser window preview]
                  </div>
                  </div>
                  </div>
                  </div>
                    </RadioGroup>
                  )}
                />
              </section>

              {/* Billing Address Section */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Billing address</h2>
                <Controller
                  name="sameAsShipping"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup value={field.value ? 'same' : 'different'} onValueChange={(val) => field.onChange(val === 'same')} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="same" id="same" />
                        <Label htmlFor="same" className="cursor-pointer">Same as shipping address</Label>
                  </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="different" id="different" />
                        <Label htmlFor="different" className="cursor-pointer">Use a different billing address</Label>
                </div>
                    </RadioGroup>
              )}
                />
            </section>

              {/* Pay Now Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isSubmitting || showRazorpayCheckout}
              >
                {isSubmitting || showRazorpayCheckout ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {showRazorpayCheckout ? 'Processing Payment...' : 'Placing Order...'}
                  </>
                ) : (
                  'Pay now'
                )}
              </Button>

              {/* Footer Links */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-4">
                <Link to="/refund-policy" className="hover:text-gray-900">Refund policy</Link>
                <Link to="/shipping" className="hover:text-gray-900">Shipping</Link>
                <Link to="/privacy" className="hover:text-gray-900">Privacy policy</Link>
                <Link to="/terms" className="hover:text-gray-900">Terms of service</Link>
                <Link to="/contact" className="hover:text-gray-900">Contact</Link>
              </div>
          </div>

          {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-4 h-fit order-1 lg:order-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                {/* Scrollable Product List */}
                <div className="max-h-[400px] overflow-y-auto space-y-4 mb-6 pr-2">
                  {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                        className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Both Hands</p>
                        <p className="text-sm font-semibold text-gray-900 mt-2">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                      </div>
                      <div className="text-sm text-gray-600">{item.quantity}</div>
                  </div>
                ))}
                  {items.length > 3 && (
                    <div className="text-center pt-2">
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        Scroll for more items ↓
                      </Button>
                    </div>
                  )}
              </div>

                <Separator className="my-6" />

                {/* Discount Code */}
                <div className="space-y-2 mb-6">
                  <Label className="text-sm font-medium">Discount code</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                    disabled={discount > 0}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || discount > 0 || !couponCode.trim()}
                    className="shrink-0"
                  >
                    {isApplyingCoupon ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : discount > 0 ? (
                      'Applied'
                    ) : (
                      'Apply'
                    )}
                  </Button>
                </div>
              </div>

                <Separator className="my-6" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal · {items.length} item{items.length !== 1 ? 's' : ''}</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      Shipping
                      <HelpCircle className="h-3 w-3 text-gray-400" />
                    </span>
                    <span className="font-medium">
                      {shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}
                    </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                      <span className="font-medium">-{formatCurrency(discount)}</span>
                  </div>
                )}
              </div>

                <Separator className="my-6" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">INR {formatCurrency(grandTotal)}</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Razorpay Checkout */}
      {showRazorpayCheckout && 
       currentOrderIntentId && 
       currentIdempotencyKey && 
       razorpayKeyId && 
       razorpayOrderId && (
        <RazorpayCheckout
          orderIntentId={currentOrderIntentId}
          amount={grandTotal}
          idempotencyKey={currentIdempotencyKey}
          razorpayKeyId={razorpayKeyId}
          razorpayOrderId={razorpayOrderId}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}

      {/* OTP Login Modal - Show when user clicks Place Order without login */}
      <OTPLoginModal
        isOpen={showLoginModal}
        onClose={() => {
          // Allow closing - user can try again later
          setShowLoginModal(false);
          setPendingFormData(null);
        }}
        onSuccess={async () => {
          // User logged in successfully, proceed with pending order
          setShowLoginModal(false);
          if (pendingFormData) {
            // Small delay to ensure auth state is updated
            setTimeout(() => {
              processOrder(pendingFormData);
            }, 100);
            setPendingFormData(null);
          }
        }}
      />
    </div>
  );
}
