import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { TutorialPage } from '@/features/tutorial/components/TutorialPage';

export default function Tutorial() {
  usePageTitle('How to Apply Press-On Nails — The Nail Artistry');
  return <TutorialPage />;
}
