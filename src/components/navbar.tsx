'use client'
import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';

export default function Navbar() {
  const [showTrackers, setShowTrackers] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-dropdown')) {
        setShowLanguage(false);
      }
      if (!target.closest('.trackers-dropdown')) {
        setShowTrackers(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-zinc-900 text-white  flex justify-center items-center">
      <div className="max-w-4xl w-full px-6 py-4">
        <nav className="flex justify-between items-center">
          {/* Left side: Brand name and Trackers dropdown */}
          <div className="flex items-center">
            <Link href="/">
              <div className="text-2xl font-bold cursor-pointer">OHDB</div>
            </Link>
            <div className="relative trackers-dropdown ml-10">
              <button
                className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
                onClick={() => setShowTrackers(!showTrackers)}
              >
                Trackers
              </button>
              {showTrackers && (
                <div className="absolute mt-2 w-40 bg-white text-black shadow-lg rounded-md left-0">
                  <Link href="/deviants">
                    <span className="block px-4 py-2 rounded-md hover:bg-gray-200">Deviants</span>
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-500 cursor-not-allowed"
                    disabled
                  >
                    Formulas
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right side: Login button and Language dropdown */}
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed"
              disabled
            >
              Login
            </button>
            <div className="relative language-dropdown">
              <button
                className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowLanguage(!showLanguage)}
              >
                Language
              </button>
              {showLanguage && (
                <div className="absolute mt-2 w-24 bg-white text-black shadow-lg rounded-md">
                  <Link href={pathname} locale="ru" className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md">
                    RU
                  </Link>
                  <Link href={pathname} locale="en" className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md">
                    EN
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}