import type { Metadata } from 'next';
import SlidesDeck from './SlidesDeck';

export const metadata: Metadata = {
  title: 'Challenges | Zero to Coder',
  description:
    'Hands-on challenge tracks for the Vibe Coders community social and hack night.',
};

export default function ChallengesPage() {
  return <SlidesDeck />;
}

