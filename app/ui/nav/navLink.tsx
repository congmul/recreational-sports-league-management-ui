
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'; 
import clsx from 'clsx';

const navigation = [
  {
    id: '/',
    name: 'Home'
  },
  {
    id: '/teams',
    name: 'Teams'
  },
  {
    id: '/players',
    name: 'Players'
  },
  {
    id: '/coaches',
    name: 'Coaches'
  },
]
  
export default function NavLink() {
    const pathname = usePathname();
    return(<>
        {/* Flyout menus */}
        <div className="hidden lg:ml-8 lg:block lg:self-stretch h-full">
          <div className="flex h-full space-x-8">                    
            {
              navigation.map((navMenu) => (
                  <Link key={navMenu.name}
                      href={`${navMenu.id}`}
                      data-open="true"
                      className={clsx("relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 hover:border-violet-900 hover:text-violet-900",
                          {
                              "border-violet-900 text-violet-900": pathname === navMenu.id
                          }                                
                      )}
                  >
                      {navMenu.name}
                  </Link>
              ))
            }
          </div>
        </div>
    </>)
}