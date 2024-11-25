import React from "react";
import Image from "next/image";
import { coachService } from "@/app/lib/api-services";
import Link from "next/link";
import RemoveModal from "../removeModal/removeModal";
import { cookies } from "next/headers";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

async function Table(){
  const coaches = await coachService.getAllCoaches();
  const cookieStore = await cookies();
  const userInfo = cookieStore.get('userInfo')?.value 
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined

  return (
    <div className="overflow-y-auto w-full max-h-[calc(100vh-187px)] lg:max-h-[calc(100vh-241px)]">
      <table className="min-w-full border-collapse border border-gray-200 mb-[125px]">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 text-indigo-900">
            <th className="px-6 py-3 border-b">Coach</th>
            <th className="px-6 py-3 border-b">Nationality</th>
            <th className="px-6 py-3 border-b">Team</th>
              {
                parsedUserInfo && parsedUserInfo.role === "admin" && 
                <th className="px-6 py-3 border-b">Option</th>
              }
          </tr>
        </thead>
        <tbody>        
          {coaches && coaches.map((coach) => (
            <tr key={coach._id} className="hover:bg-gray-50 border-b">
              <td className="px-6 py-4 flex items-center gap-4">                
                <Link className="group flex items-center gap-4" href={`/coaches/${coach._id}`}>
                  <Image
                    src={coach.profileUrl || '/assets/img/Photo-Missing.png'}
                    alt={coach.firstName}
                    className="rounded-full object-cover cursor-pointer"
                    width={40}
                    height={40}
                  />
                  <span className="text-gray-900 group-hover:underline  cursor-pointer">{`${coach.firstName} ${coach.lastName}`}</span>
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-700">{coach.nationality}</td>
                {
                  coach.teamName 
                  ? <td className="px-6 py-4 flex items-center gap-4">
                    {
                      coach.teamName === 'Liverpool FC'
                      ? 
                        <Image
                          src={`/assets/img/team-logo/LIV_filled.png`}
                          alt={coach.firstName}
                          className="rounded-full object-cover"
                          width={40}
                          height={40}
                        />
                      :
                        <Image
                          src={coach.crest}
                          alt={coach.firstName}
                          className="rounded-full object-cover"
                          width={40}
                          height={40}
                        />
                    }
                    <span className="text-gray-900">{coach.teamName}</span> 
                  </td>
                  : <td className="px-6 py-4"><span className="h-full text-gray-900">none</span></td>
                }
              {
                parsedUserInfo && parsedUserInfo.role === "admin" && 
                <td className="px-6 py-4 text-gray-700">
                    <div className="flex">
                      <Link href={`/coaches/${coach._id}/edit`}
                        className={"mr-3 w-6 text-sm font-medium text-gray-700 hover:text-red-500"}
                      >
                        <PencilSquareIcon />
                    </Link>                    
                    <RemoveModal id={coach._id} name={`${coach.firstName} ${coach.lastName}`} category="coaches" />
                  </div>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;