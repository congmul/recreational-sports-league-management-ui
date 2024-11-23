import { playerService } from '@/app/lib/api-services';
import PlayerBanner from '../playerBanner/playerBanner';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/app/lib/utils';

interface PlayerDetailProps {
  id: string
}

async function PlayerDetail({id}: PlayerDetailProps) {  
  const player = await playerService.getPlayerById(id);
    return(<>
      {player && <>
        <PlayerBanner 
          firstName={player.firstName}
          lastName={player.lastName}
          shirtNumber={player.shirtNumber}
          color={player.team.teamColor}
          profileUrl={player?.profileUrl}
        />
        <div className="bg-white rounded-md p-5">
          <h2 className="text-lg font-bold text-indigo-900 mb-4">Personal Details</h2>
          <div className="">
            {/* Nationality */}
            <div className="flex items-center justify-between border-b py-3">
              <span className="text-gray-600 font-medium">Nationality</span>
              <div className="flex items-center">
                <span className="text-indigo-900 font-medium">{player.nationality}</span>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-center justify-between border-b py-3">
              <span className="text-gray-600 font-medium">Date of Birth</span>
              <span className="text-indigo-900 font-medium">{player.dateOfBirth.split('T')[0]}</span>
            </div>

            {/* Club */}
            <div className="flex items-center justify-between border-b py-3">
              <span className="text-gray-600 font-medium">Team</span>
              <div className="flex items-center space-x-2">
                <Image src={player.team.crest} alt="Club Logo" width={24} height={24} />
                <span className="text-indigo-900 font-medium">{player.team.name}</span>
              </div>
            </div>

            {/* Joined Team */}
            <div className="flex items-center justify-between border-b py-3">
              <span className="text-gray-600 font-medium">Joined Team</span>
              <span className="text-indigo-900 font-medium">{player.joinedTeam.split('T')[0]}</span>
            </div>

            {/* Position */}
            <div className="flex items-center justify-between border-b py-3">
              <span className="text-gray-600 font-medium">Position</span>
              <span className="text-indigo-900 font-medium">{capitalizeFirstLetter(player.position)}</span>
            </div>


            {/* Section */}
            <div className="flex items-center justify-between border-b py-3">
              <span className="text-gray-600 font-medium">Section</span>
              <span className="text-indigo-900 font-medium">{player.section}</span>
            </div>
          </div>
        </div>
        </>
        }
    </>)
}

export default PlayerDetail;