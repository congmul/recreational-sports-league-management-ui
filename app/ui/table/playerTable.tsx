import React from "react";
import { capitalizeFirstLetter } from "@/app/lib/utils";
import Image from "next/image";
import { playerService } from "@/app/lib/api-services";
import Link from "next/link";
import { cookies } from "next/headers";
import RemoveModal from "../removeModal/removeModal";


async function PlayerTable() {
  const players = await playerService.getAllPlayers();
  const cookieStore = await cookies();
  const userInfo = cookieStore.get('userInfo')?.value 
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined

  return (
    <div className="overflow-y-auto w-full max-h-[calc(100vh-187px)] lg:max-h-[calc(100vh-241px)]">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 text-indigo-900">
            <th className="px-6 py-3 border-b">Player</th>
            <th className="px-6 py-3 border-b">Position</th>
            <th className="px-6 py-3 border-b">Nationality</th>
              {
                parsedUserInfo && parsedUserInfo.role && 
                <th className="px-6 py-3 border-b">Option</th>
              }
          </tr>
        </thead>
        <tbody>        
          {players && players.map((player) => (
            <tr key={player._id} className=" hover:bg-gray-50 border-b">
              <td className="px-6 py-4 flex items-center gap-4">     
                <Link className="group flex items-center gap-4" href={`/players/${player._id}`}>
                  <Image
                    src={player.profileUrl || '/assets/img/Photo-Missing.png'}
                    alt={player.firstName}
                    className="rounded-full object-cover cursor-pointer"
                    width={40}
                    height={40}
                  />
                  <span className="text-gray-900 group-hover:underline cursor-pointer">{`${player.firstName} ${player.lastName}`}</span>
                </Link>           
              </td>
              <td className="px-6 py-4 text-gray-700">{capitalizeFirstLetter(player.position)}</td>
              <td className="px-6 py-4 text-gray-700">{player.nationality}</td>
              {
                parsedUserInfo && parsedUserInfo.role && 
                <td className="px-6 py-4 text-gray-700">
                  <RemoveModal id={player._id} name={`${player.firstName} ${player.lastName}`} category="player" />
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;