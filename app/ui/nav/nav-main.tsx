import Image from 'next/image'
import Link from 'next/link'
import NavLink from './navLink';
import NavMobile from './navMobile';
import { cookies } from "next/headers";
import LoginModal from '../loginModal/loginModal';
import LogoutModal from '../logoutModal/logoutModal';
import { capitalizeFirstLetter } from '@/app/lib/utils';

export default async function NavMain() {    
  const cookieStore = await cookies();
  const userInfo = cookieStore.get('userInfo')?.value 
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined
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
                      {
                        !parsedUserInfo
                        ? <>
                          <LoginModal />
                          <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                              Create account
                          </Link>
                        </>
                        : <>
                          { parsedUserInfo.firstName && <div className="text-sm font-medium text-gray-700 hover:text-gray-800">Hi, {capitalizeFirstLetter(parsedUserInfo.firstName)}</div> }
                          <LogoutModal />
                        </>
                      }
                    </div>
                </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    </>)
}