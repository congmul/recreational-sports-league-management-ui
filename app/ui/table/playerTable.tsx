import React from "react";
import { Player } from "@/app/lib/models";
import { capitalizeFirstLetter } from "@/app/lib/utils";
import Image from "next/image";

interface TableProps {
  players: Player[];
}

const PlayerTable: React.FC<TableProps> = ({ players }) => {
  return (
    <div className="overflow-y-auto w-full max-h-[calc(100vh-187px)] lg:max-h-[calc(100vh-241px)]">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 text-indigo-900">
            <th className="px-6 py-3 border-b">Player</th>
            <th className="px-6 py-3 border-b">Position</th>
            <th className="px-6 py-3 border-b">Nationality</th>
          </tr>
        </thead>
        <tbody>        
          {players.map((player) => (
            <tr key={player._id} className="group hover:bg-gray-50 border-b cursor-pointer">
              <td className="px-6 py-4 flex items-center gap-4">                
                <Image
                  src={'/assets/img/Photo-Missing.png'}
                  alt={player.firstName}
                  className="rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <span className="text-gray-900 group-hover:underline">{`${player.firstName} ${player.lastName}`}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">{capitalizeFirstLetter(player.position)}</td>
              <td className="px-6 py-4 text-gray-700">{player.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;