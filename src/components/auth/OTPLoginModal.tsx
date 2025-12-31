import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Phone, ArrowRight } from 'lucide-react';
import { toast } from '@/utils/toast';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

interface OTPLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const OTPLoginModal = ({ isOpen, onClose, onSuccess }: OTPLoginModalProps) => {
  const { refreshUser, isAuthenticated } = useAuth();
  const { syncCart } = useCart();
  const [step, setStep] = useState<'identifier' | 'otp'>('identifier');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStep('identifier');
      setIdentifier('');
      setOtp('');
      setCountdown(0);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const isEmail = identifier.includes('@');
  const isPhone = /^[6-9]\d{9}$/.test(identifier);

  const handleSendOTP = async () => {
    if (!identifier.trim()) {
      toast.error('Please enter your email or phone number');
      return;
    }

    if (!isEmail && !isPhone) {
      toast.error('Please enter a valid email or 10-digit phone number');
      return;
    }

    setIsSendingOTP(true);
    try {
      await authService.sendOTP(identifier);
      toast.success(`OTP sent to your ${isEmail ? 'email' : 'phone'}`);
      setStep('otp');
      setCountdown(60); // 60 second countdown
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.verifyOTP(identifier, otp);
      
      // Cookie is automatically set by server (httpOnly)
      // Refresh user state from server to ensure consistency
      if (response.success) {
        await refreshUser();
        
        // Link any guest orders to this user
        try {
          await authService.linkGuestOrders(
            isEmail ? identifier : undefined,
            isPhone ? identifier : undefined
          );
        } catch (linkError) {
          // Non-critical error, just log it
          console.log('Could not link guest orders:', linkError);
        }
        
        // Don't sync cart here - just keep the guest cart visible
        // The backend will handle linking the order when it's created
        
        toast.success('Login successful!');
        onSuccess?.();
        onClose();
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
      setOtp(''); // Clear OTP on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    await handleSendOTP();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (step === 'identifier') {
        handleSendOTP();
      } else {
        handleVerifyOTP();
      }
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to Continue</DialogTitle>
          <DialogDescription>
            {step === 'identifier'
              ? 'Enter your email or phone number to receive an OTP'
              : `Enter the 6-digit OTP sent to your ${isEmail ? 'email' : 'phone'}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 'identifier' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="identifier">Email or Phone Number</Label>
                <div className="relative">
                  {isEmail ? (
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  ) : (
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  )}
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="your@email.com or 9876543210"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send you a 6-digit OTP for verification
                </p>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={isSendingOTP || !identifier.trim()}
                className="w-full"
                size="lg"
              >
                {isSendingOTP ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                  }}
                  onKeyPress={handleKeyPress}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground text-center">
                  OTP sent to {isEmail ? identifier : `+91 ${identifier}`}
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Login'
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={countdown > 0}
                    className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
                  >
                    {countdown > 0
                      ? `Resend OTP in ${countdown}s`
                      : 'Resend OTP'}
                  </button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep('identifier');
                    setOtp('');
                    setCountdown(0);
                  }}
                  className="w-full"
                >
                  Change Email/Phone
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

