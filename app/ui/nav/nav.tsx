
'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'; 
import clsx from 'clsx';

const navigation = {
    categories: [
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
    ],
}
  
export default function Nav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname();
  
    return(<>
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <div className="border-t border-gray-200 py-3">
                {navigation.categories.map((category) => (
                    <Link 
                        key={category.name}
                        className="px-4 py-3 hover:bg-violet-900 hover:text-white cursor-pointer block" 
                        href={`${category.id}`} onClick={() => setOpen(false)}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            <div className="border-t border-gray-200 py-3">
              <div className="flow-root px-4 py-3 hover:bg-violet-900 hover:text-white cursor-pointer">
                <a href="#" className="-m-2 block p-2 font-medium">
                  Sign in
                </a>
              </div>
              <div className="flow-root px-4 py-3 hover:bg-violet-900 hover:text-white cursor-pointer">
                <a href="#" className="-m-2 block p-2 font-medium">
                  Create account
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
                {/* hamburger menu icon */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Premier league</span>
                  <Image
                    src="/assets/img/logo-premier.png"
                    width={50}
                    height={50}
                    alt="Logo of Permier league"
                    />
                </a>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">                    
                  {
                    navigation.categories.map((category) => (
                        <Link key={category.name}
                            href={`${category.id}`}
                            data-open="true"
                            className={clsx("relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 hover:border-violet-900 hover:text-violet-900",
                                {
                                    "border-violet-900 text-violet-900": pathname === category.id
                                }                                
                            )}
                        >
                            {category.name}
                        </Link>
                    ))
                  }
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    </>)
}