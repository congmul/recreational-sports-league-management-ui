'use client';

import { userService } from '@/app/lib/api-services';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/app/lib/utils';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import Spinner from "../spinner/spinner";

const LoginModal = ({isMobile}: {isMobile?:boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className={clsx("text-sm font-medium text-gray-700 hover:text-gray-800", {"w-full text-left -m-2 block p-2 text-[16px] text-black hover:text-white": isMobile})}
      >
        Sign in
      </button>

      {/* Modal */}
      {isOpen && 
        createPortal(
          <div className="fixed inset-[-30px] flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Sign In</h2>
              <p className="mb-4">Sign in to your account.</p>
              <form action={async (formData) => {
                  setIsLoading(true);
                  const email = formData.get('email') as string;
                  const password = formData.get('password') as string;
                  const res = await userService.login({email, password});
                  // store auth in cookie
                  if(!res) return;
                  setCookie('accessToken', res.access_token, 1);
                  setCookie('userInfo',  JSON.stringify(res.userInfo), 1);
                  setTimeout(() => {
                    setIsLoading(false);
                    closeModal();
                    router.refresh();
                  }, 500)
              }}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-900 flex items-center"
                  >
                    Sign in
                  {
                    isLoading &&  <span className="ml-3"><Spinner size={"h-4"} color="white" /></span>
                  }
                  </button>
                </div>
              </form>
            </div>
          </div>
        , document.body)}
    </>
  );
};

export default LoginModal