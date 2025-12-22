import { Marquee } from '@/components/common/Marquee';

interface HeaderAnnouncementProps {
  isDismissed: boolean;
  onDismiss: () => void;
}

export const HeaderAnnouncement = ({ isDismissed, onDismiss }: HeaderAnnouncementProps) => {
  if (isDismissed) return null;

  return (
    <div className="bg-[#DD2C6C] text-white py-2 px-4 text-sm font-medium">
      <Marquee speed={5} onDismiss={onDismiss} />
    </div>
  );
};

