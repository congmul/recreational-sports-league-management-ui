import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import NavLink from './navLink';
import NavMobile from './navMobile';
  
export default function NavMain() {
    return(<>
    <div className="bg-white">
      <header className="relative bg-white border-b border-gray-200">
        <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex h-16 items-center">
                {/* hamburger menu icon and slide menu */}
                <NavMobile />

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                    <Link href="/">
                    <span className="sr-only">Premier league</span>
                    <Image
                        src="/assets/img/logo-premier.png"
                        width={50}
                        height={50}
                        priority={true}
                        alt="Logo of Permier league"
                        />
                    </Link>
                </div>

                {/* Flyout menus */}
                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                    <NavLink />
                </div>

                <div className="ml-auto flex items-center">
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                    </Link>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                    </Link>
                    </div>

                    {/* Search */}
                    <div className="flex lg:ml-6">
                    <Link href="#" className="p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Search</span>
                        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                    </Link>
                    </div>
                </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    </>)
}