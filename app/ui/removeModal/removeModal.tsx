'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { coachService, playerService } from '@/app/lib/api-services';

const RemoveModal = ({id, name, category, isPlayerDetail}: {id: string, name:string, category: string, isPlayerDetail?: boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      {
        isPlayerDetail 
        ?<div className="flex justify-end mt-5">
            <button
              onClick={openModal}
              className={clsx("w-7 text-sm font-medium text-gray-700 hover:text-red-500")}
            >
              <TrashIcon />
          </button>
          </div>
        : <button
          onClick={openModal}
          className={clsx("w-5 text-sm font-medium text-gray-700 hover:text-red-500")}
        >
          <TrashIcon />
        </button>
      }

      {/* Modal */}
      {isOpen && (
        createPortal(
        <div className="fixed inset-[-30px] flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Delete</h2>
            <p className="text-gray-700 mb-3">
              Are you sure you want to delete <span className="font-extrabold">{name}</span>?
            </p>
            <div className="flex justify-end">
              <button className="text-gray-500 hover:text-gray-700 mr-4" onClick={() => closeModal()}>Cancel</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-900" onClick={async () => {
                try{
                  if(category === 'players'){
                    await playerService.deletePlayerById(id);                  
                  }else if(category === 'coaches'){
                    await coachService.deleteCoachById(id); 
                  }else if(category === 'team'){
  
                  }
                  if(isPlayerDetail){
                    router.push(`/${category}`)
                  } 
                }catch(error){
                  console.log(error);
                }
              }}>Confirm</button>
            </div>
          </div>
        </div>
        , document.body
        )
      )}
    </>
  );
};

export default RemoveModal;