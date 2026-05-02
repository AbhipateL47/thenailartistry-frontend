import { useAuth } from '@/contexts/AuthContext';
import { OTPLoginModal } from './OTPLoginModal';

/**
 * Global login modal component that can be opened from anywhere
 * Consumes AuthContext to manage modal state
 * Renders nothing when modal is closed
 */
export const GlobalLoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuth();

  if (!isLoginModalOpen) {
    return null;
  }

  return (
    <OTPLoginModal
      isOpen={isLoginModalOpen}
      onClose={closeLoginModal}
      onSuccess={() => {
        // Modal will be closed by OTPLoginModal after successful login
        // Additional success handling can be added here if needed
      }}
    />
  );
};
