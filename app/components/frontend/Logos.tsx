import Image from 'next/image';
import KindeLogo from '@/public/logos/kinde.svg';
import Nextjs from '@/public/logos/nextjs.svg';

const logos = [
  { src: KindeLogo, alt: 'Kinde Logo' },
  { src: Nextjs, alt: 'Next.js Logo' },
  { src: KindeLogo, alt: 'Kinde Logo' },
  { src: Nextjs, alt: 'Next.js Logo' },
  { src: KindeLogo, alt: 'Kinde Logo' },
];

export function Logos() {
  return (
    <div className="py-12 sm:py-16">
      <h2 className="text-center text-lg font-semibold text-muted-foreground">
        Trusted by the best companies
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-16">
        {logos.map((logo, index) => (
          <div key={index} className="relative h-12 w-32 transition-opacity hover:opacity-70">
            <Image src={logo.src} alt={logo.alt} className="object-contain dark:invert" fill />
          </div>
        ))}
      </div>
    </div>
  );
}
