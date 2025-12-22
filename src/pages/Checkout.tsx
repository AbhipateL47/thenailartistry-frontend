import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { orderService, ShippingAddress } from '@/services/orderService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { formatCurrency } from '@/utils/formatCurrency';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { usePageTitle } from '@/hooks/usePageTitle';

interface CheckoutFormData {
  // Shipping Address
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
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
  paymentMethod: 'cod' | 'card' | 'upi' | 'netbanking';
}

export default function Checkout() {
  usePageTitle('Secure Checkout - Complete Your Order');
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      sameAsShipping: true,
      paymentMethod: 'cod',
      country: 'India',
      billingCountry: 'India',
      ...(user && {
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }),
    },
  });

  const sameAsShipping = watch('sameAsShipping');
  const paymentMethod = watch('paymentMethod');

  // Calculate totals
  const shippingFee = subtotal > 1000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const discount = 0;
  const grandTotal = subtotal + shippingFee + tax - discount;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingAddress: ShippingAddress = {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || undefined,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      };

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

      const orderData = {
        items,
        shippingAddress,
        billingAddress,
        paymentMethod: data.paymentMethod,
        ...(!isAuthenticated && {
          guestEmail: data.email,
          guestPhone: data.phone,
        }),
      };

      const response = await orderService.createOrder(orderData);
      
      // Clear cart on success
      clearCart();
      
      // Navigate to order confirmation
      navigate(`/order-confirmation/${response.data.orderNumber}`, {
        state: { orderData: response.data },
      });
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="md:col-span-2 space-y-8">
            {/* Shipping Address */}
            <section className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...register('fullName', { required: 'Full name is required' })}
                    className="mt-1"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
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

                <div>
                  <Label htmlFor="phone">Phone *</Label>
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

                <div className="md:col-span-2">
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    {...register('addressLine1', { required: 'Address is required' })}
                    className="mt-1"
                  />
                  {errors.addressLine1 && (
                    <p className="text-sm text-destructive mt-1">{errors.addressLine1.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input id="addressLine2" {...register('addressLine2')} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
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
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    {...register('state', { required: 'State is required' })}
                    className="mt-1"
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    {...register('postalCode', { required: 'Postal code is required' })}
                    className="mt-1"
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    {...register('country', { required: 'Country is required' })}
                    className="mt-1"
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Billing Address */}
            <section className="bg-white border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Controller
                  name="sameAsShipping"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="sameAsShipping"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="sameAsShipping" className="text-lg font-semibold cursor-pointer">
                  Billing address same as shipping address
                </Label>
              </div>

              {!sameAsShipping && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="billingFullName">Full Name *</Label>
                    <Input
                      id="billingFullName"
                      {...register('billingFullName', {
                        required: !sameAsShipping ? 'Full name is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="billingEmail">Email *</Label>
                    <Input
                      id="billingEmail"
                      type="email"
                      {...register('billingEmail', {
                        required: !sameAsShipping ? 'Email is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="billingPhone">Phone *</Label>
                    <Input
                      id="billingPhone"
                      type="tel"
                      {...register('billingPhone', {
                        required: !sameAsShipping ? 'Phone is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="billingAddressLine1">Address Line 1 *</Label>
                    <Input
                      id="billingAddressLine1"
                      {...register('billingAddressLine1', {
                        required: !sameAsShipping ? 'Address is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="billingAddressLine2">Address Line 2</Label>
                    <Input id="billingAddressLine2" {...register('billingAddressLine2')} className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="billingCity">City *</Label>
                    <Input
                      id="billingCity"
                      {...register('billingCity', {
                        required: !sameAsShipping ? 'City is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="billingState">State *</Label>
                    <Input
                      id="billingState"
                      {...register('billingState', {
                        required: !sameAsShipping ? 'State is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="billingPostalCode">Postal Code *</Label>
                    <Input
                      id="billingPostalCode"
                      {...register('billingPostalCode', {
                        required: !sameAsShipping ? 'Postal code is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="billingCountry">Country *</Label>
                    <Input
                      id="billingCountry"
                      {...register('billingCountry', {
                        required: !sameAsShipping ? 'Country is required' : false,
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-3">
                {['cod', 'card', 'upi', 'netbanking'].map((method) => (
                  <label
                    key={method}
                    className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                  >
                    <input
                      type="radio"
                      value={method}
                      {...register('paymentMethod')}
                      className="w-4 h-4"
                    />
                    <span className="font-medium capitalize">
                      {method === 'cod' ? 'Cash on Delivery' : method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI' : 'Net Banking'}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-muted/30 rounded-lg p-6 sticky top-24 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (GST)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
