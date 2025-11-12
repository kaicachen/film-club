import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white whitespace-nowrap`}
    >
      <GlobeAltIcon className="h-10 w-10 rotate-[15deg] md:h-12 md:w-12" />
      <p className="ml-2 text-[28px] md:text-[36px]">Film Club</p>
    </div>
  );
}
