import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Loader2, Mail, Phone, ArrowRight } from 'lucide-react';
import { toast } from '@/shared/utils/toast';
import { authService } from '@/features/auth/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/shared/hooks/use-mobile';

interface OTPLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const OTPLoginModal = ({ isOpen, onClose, onSuccess }: OTPLoginModalProps) => {
  const { refreshUser, isAuthenticated, closeLoginModal } = useAuth();
  const { syncCart } = useCart();
  const isMobile = useIsMobile();
  const [step, setStep] = useState<'identifier' | 'otp'>('identifier');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;
  const otpInputRef = useRef<React.ComponentRef<typeof InputOTP>>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStep('identifier');
      setIdentifier('');
      setOtp('');
      setCountdown(0);
      setFailedAttempts(0);
    }
  }, [isOpen]);

  // Auto-focus OTP input when step changes to 'otp'
  useEffect(() => {
    if (step === 'otp' && isOpen) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        // Try to focus using the ref first
        if (otpInputRef.current) {
          const input = otpInputRef.current.querySelector('input') as HTMLInputElement;
          if (input) {
            input.focus();
            return;
          }
        }
        // Fallback: try to focus any input in the OTP container
        const otpContainer = document.querySelector('[data-otp-container]');
        if (otpContainer) {
          const input = otpContainer.querySelector('input') as HTMLInputElement;
          input?.focus();
        }
      }, 150);
    }
  }, [step, isOpen]);

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
      setFailedAttempts(0); // Reset failed attempts when new OTP is sent
      setOtp(''); // Clear previous OTP
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

    // Check if max attempts reached
    if (failedAttempts >= MAX_ATTEMPTS) {
      toast.error(`Maximum ${MAX_ATTEMPTS} attempts reached. Please request a new OTP.`);
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
        } catch {
          // Non-critical — guest order linking is best-effort
        }
        
        // Don't sync cart here - just keep the guest cart visible
        // The backend will handle linking the order when it's created
        
        toast.success('Login successful!');
        setFailedAttempts(0); // Reset on success
        onSuccess?.();
        // Close modal using context function (preferred) or prop fallback
        if (closeLoginModal) {
          closeLoginModal();
        } else {
          onClose();
        }
      } else {
        // Backend returned error (shouldn't happen with current API, but handle it)
        toast.error(response.message || 'Invalid OTP. Please try again.');
        setOtp(''); // Clear OTP on error
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      
      // Extract error response from backend
      const errorResponse = error.response?.data;
      const errorMessage = errorResponse?.message || 'Invalid OTP. Please try again.';
      const remainingAttempts = errorResponse?.remainingAttempts;
      const lockedUntil = errorResponse?.lockedUntil;
      
      // If backend provides remaining attempts, use it to sync frontend state
      if (remainingAttempts !== undefined) {
        const backendFailedAttempts = MAX_ATTEMPTS - remainingAttempts;
        setFailedAttempts(backendFailedAttempts);
      } else {
        // Fallback: increment frontend counter if backend doesn't provide it
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
      }
      
      // Check if OTP is locked
      if (lockedUntil) {
        const lockDate = new Date(lockedUntil);
        const now = new Date();
        if (lockDate > now) {
          // OTP is locked, force max attempts state
          setFailedAttempts(MAX_ATTEMPTS);
          toast.error('Maximum attempts reached. Please request a new OTP.');
        }
      } else {
        // Show error message from backend
        toast.error(errorMessage);
      }
      
      setOtp(''); // Clear OTP on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    // Reset failed attempts when resending OTP
    setFailedAttempts(0);
    await handleSendOTP();
  };

  const handleRequestNewOTP = async () => {
    // Reset failed attempts and send new OTP
    setFailedAttempts(0);
    setOtp('');
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

  // Shared content for both Dialog and Drawer
  const modalContent = (
    <>
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
                <div 
                  className="flex justify-center" 
                  data-otp-container
                  onPaste={(e) => {
                    // Prevent paste if max attempts reached
                    if (failedAttempts >= MAX_ATTEMPTS) {
                      e.preventDefault();
                      return;
                    }
                    // Handle paste event - extract numbers from clipboard
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData('text/plain');
                    // Extract only digits and limit to 6
                    const digits = pastedText.replace(/\D/g, '').slice(0, 6);
                    if (digits.length > 0) {
                      setOtp(digits);
                      // Auto-submit if 6 digits pasted
                      if (digits.length === 6) {
                        setTimeout(() => {
                          handleVerifyOTP();
                        }, 100);
                      }
                    }
                  }}
                >
                  <InputOTP
                    ref={otpInputRef}
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      // Prevent input if max attempts reached
                      if (failedAttempts >= MAX_ATTEMPTS) {
                        return;
                      }
                      setOtp(value);
                    }}
                    onComplete={(value) => {
                      // Prevent auto-submit if max attempts reached
                      if (failedAttempts >= MAX_ATTEMPTS) {
                        return;
                      }
                      setOtp(value);
                      // Auto-submit when all 6 digits are entered
                      if (value.length === 6) {
                        handleVerifyOTP();
                      }
                    }}
                    disabled={failedAttempts >= MAX_ATTEMPTS}
                    containerClassName="gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground text-center">
                    OTP sent to {isEmail ? identifier : `+91 ${identifier}`}
                  </p>
                  {failedAttempts > 0 && failedAttempts < MAX_ATTEMPTS && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 text-center font-medium">
                      {MAX_ATTEMPTS - failedAttempts} attempt{MAX_ATTEMPTS - failedAttempts > 1 ? 's' : ''} remaining
                    </p>
                  )}
                  {failedAttempts >= MAX_ATTEMPTS && (
                    <p className="text-xs text-destructive text-center font-medium">
                      Maximum attempts reached. Please request a new OTP.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {failedAttempts >= MAX_ATTEMPTS ? (
                  <>
                    <Button
                      onClick={handleRequestNewOTP}
                      disabled={isSendingOTP}
                      className="w-full"
                      size="lg"
                    >
                      {isSendingOTP ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Request New OTP
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      You've reached the maximum number of attempts. Request a new OTP to try again.
                    </p>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleVerifyOTP}
                      disabled={isLoading || otp.length !== 6 || failedAttempts >= MAX_ATTEMPTS}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify'
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
                  </>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep('identifier');
                    setOtp('');
                    setCountdown(0);
                    setFailedAttempts(0); // Reset attempts when changing identifier
                  }}
                  className="w-full"
                >
                  Change Email/Phone
                </Button>
              </div>
            </>
          )}
      </div>
    </>
  );

  // Render Drawer on mobile, Dialog on desktop
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => {
        if (!open) {
          if (closeLoginModal) {
            closeLoginModal();
          } else {
            onClose();
          }
        }
      }}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Login to Continue</DrawerTitle>
            <DrawerDescription>
              {step === 'identifier'
                ? 'Enter your email or phone number to receive an OTP'
                : `Enter the 6-digit OTP sent to your ${isEmail ? 'email' : 'phone'}`}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            {modalContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          if (closeLoginModal) {
            closeLoginModal();
          } else {
            onClose();
          }
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
        {modalContent}
      </DialogContent>
    </Dialog>
  );
};

