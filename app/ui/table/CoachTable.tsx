import React from "react";
import Image from "next/image";
import { coachService } from "@/app/lib/api-services";

async function Table(){
  const coaches = await coachService.getAllCoaches();

  return (
    <div className="overflow-y-auto w-full max-h-[calc(100vh-187px)] lg:max-h-[calc(100vh-241px)]">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 text-indigo-900">
            <th className="px-6 py-3 border-b">Coach</th>
            <th className="px-6 py-3 border-b">Nationality</th>
            <th className="px-6 py-3 border-b">Team</th>
          </tr>
        </thead>
        <tbody>        
          {coaches && coaches.map((coach) => (
            <tr key={coach._id} className="group hover:bg-gray-50 border-b cursor-pointer">
              <td className="px-6 py-4 flex items-center gap-4">                
                <Image
                  src={coach.profileUrl || '/assets/img/Photo-Missing.png'}
                  alt={coach.firstName}
                  className="rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <span className="text-gray-900 group-hover:underline">{`${coach.firstName} ${coach.lastName}`}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">{coach.nationality}</td>
              <td className="px-6 py-4 flex items-center gap-4">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;