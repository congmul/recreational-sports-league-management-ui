import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface LinkCircleButtonType {
    title: string
    url: string
    rightLocation?: string 
    isEdit?: boolean
}
const LinkCircleButton = async ({title, url, rightLocation = 'right-[50px]', isEdit}:LinkCircleButtonType) => {
  const cookieStore = await cookies();
  const userInfo = cookieStore.get('userInfo')?.value 
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined
  if(parsedUserInfo && parsedUserInfo.role === 'admin'){
    return (
      <div className={`fixed bottom-[50px] ${rightLocation} z-50`}>
        <Link className="relative group" href={url}>
          {/* Button */}
          <button
            className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300 group-hover:w-40 group-hover:rounded-lg"
          >            
            <span className="text-xl font-bold group-hover:mr-2">
              { !isEdit 
                ? "+" 
                : 
                <div
                  className={"w-6 text-white"}
                >
                  <PencilSquareIcon className="w-42" />
                </div>
              } 
            </span>
            <span className="hidden opacity-0 whitespace-nowrap text-sm transition-opacity duration-300 group-hover:opacity-100 group-hover:block w-[125px] truncate">
              {title}
            </span>
          </button>
        </Link>
      </div>
    );
  }else{
    return (<></>)
  }
};

export default LinkCircleButton;