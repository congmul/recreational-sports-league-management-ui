"use client"

import { teamService } from "@/app/lib/api-services";
import { getCookie } from "@/app/lib/utils";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import Spinner from "../spinner/spinner";

interface RemoveCircleButtonType {
    title: string
    id: string,
    name: string
}
const RemoveCircleButton = ({title, id, name}:RemoveCircleButtonType) => {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = getCookie("userInfo");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined  
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if(parsedUserInfo && parsedUserInfo.role === 'admin'){
    return (<>
      <div className="fixed bottom-[50px] right-[50px] z-50">
        <div className="relative group">
          {/* Button */}
          <button
            className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full shadow-lg transition-all duration-300 group-hover:w-48 group-hover:rounded-lg"
            onClick={() => openModal()}
          >
            <span className="text-xl font-bold group-hover:mr-2 w-6"><TrashIcon /></span>
            <span className="hidden opacity-0 whitespace-nowrap text-sm transition-opacity duration-300 group-hover:opacity-100 group-hover:block m-w-[125px] truncate">
              {title}
            </span>
          </button>
        </div>
      </div>
      
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
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-900 flex items-center" onClick={async () => {
                try{
                  setIsLoading(true)
                  await teamService.deleteTeam(id);
                  router.push(`/teams`);
                }catch(error){
                  console.log(error);
                }finally{
                  setIsLoading(false)
                }
              }}>Confirm
              {
                isLoading &&  <span className="ml-3"><Spinner size={"h-4"} color="white" /></span>
              }
              </button>
            </div>
          </div>
        </div>
        , document.body
        )
      )}
    </>);
  }else{
    return (<></>)
  }
};

export default RemoveCircleButton;