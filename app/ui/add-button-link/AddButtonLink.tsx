import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

interface AddButtonLinkType {
    title: string
    url: string
}
const AddButtonLink = async ({title, url}:AddButtonLinkType) => {
  const cookieStore = await cookies();
  const userInfo = cookieStore.get('userInfo')?.value 
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined
  if(parsedUserInfo && parsedUserInfo.role === 'admin'){
    return (
      <div className="fixed bottom-[50px] right-[50px]">
        <Link className="relative group" href={url}>
          {/* Button */}
          <button
            className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300 group-hover:w-40 group-hover:rounded-lg"
          >
            <span className="text-xl font-bold group-hover:mr-2">+</span>
            <span className="hidden opacity-0 whitespace-nowrap text-sm transition-opacity duration-300 group-hover:opacity-100 group-hover:block">
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

export default AddButtonLink;