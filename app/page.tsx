import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* <div className={styles.shape}/> */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* <div
            className="relative w-0 h-0 border-l-15 border-r-15 border-b-26 border-l-transparent border-r-transparent border-b-black"
          /> */}
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Film Club.</strong> <br></br> This is the new and improved place to view stats for our little film discussion club, brought to you by Kai Achen.
          </p>
          {/* <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link> */}
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            rel="noopener noreferrer" target="_blank"
            href="https://github.com/kaicachen/film-club"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>GitHub Repo</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center flex-col justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/piper_birthday.jpg"
            width={250}
            height={100}
            className="hidden md:block"
            alt="My dog, Piper, wearing her birthday hat"
          />
          <Image
            src="/timmy_sit.jpg"
            width={250}
            height={100}
            className="block md:hidden"
            alt="My cat, Timmy, sitting like an old man"
          />
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-xl md:leading-normal px-6`}> One of my pets, depending on your device type.</p>
        </div>
      </div>
    </main>
  );
}
