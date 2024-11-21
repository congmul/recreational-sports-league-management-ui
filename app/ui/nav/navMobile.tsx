
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

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
  
export default function NavMobile() {
    const [open, setOpen] = useState(false)
  
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
    </div>
    </>)
}