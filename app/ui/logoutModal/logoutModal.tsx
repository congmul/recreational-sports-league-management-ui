'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/app/lib/utils';

const LogoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="text-sm font-medium text-gray-700 hover:text-gray-800"
      >
        Logout
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-[-30px] flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Logout</h2>
            <p className="text-gray-700 mb-3">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end">
              <button className="text-gray-500 hover:text-gray-700 mr-4" onClick={() => closeModal()}>Cancel</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-900" onClick={() => {
                setCookie("accessToken", "", 0);
                setCookie("userInfo", "", 0);
                closeModal();
                router.refresh();
              }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutModal;