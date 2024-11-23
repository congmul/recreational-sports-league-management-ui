import Image from 'next/image';
import { capitalizeFirstLetter } from '@/app/lib/utils';

interface PlayerDetailProps {
  nationality: string,
  dateOfBirth: string,
  teamName: string,
  teamLogoUrl: string,
  joinedTeam: string,
  position?: string,
  section?: string,
  isCoach?: boolean
}

async function PlayerDetail({
  nationality,
  dateOfBirth,
  teamName,
  teamLogoUrl,
  joinedTeam,
  position,
  section,
  isCoach
}: PlayerDetailProps) {  
    return(
      <div className="bg-white rounded-md p-5">
        <h2 className="text-lg font-bold text-indigo-900 mb-4">Personal Details</h2>
        <div className="">
          {/* Nationality */}
          <div className="flex items-center justify-between border-b py-3">
            <span className="text-gray-600 font-medium">Nationality</span>
            <div className="flex items-center">
              <span className="text-indigo-900 font-medium">{nationality}</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center justify-between border-b py-3">
            <span className="text-gray-600 font-medium">Date of Birth</span>
            <span className="text-indigo-900 font-medium">{dateOfBirth.split('T')[0]}</span>
          </div>

          {/* Club */}
          <div className="flex items-center justify-between border-b py-3">
            <span className="text-gray-600 font-medium">Team</span>
            <div className="flex items-center space-x-2">
              <Image src={teamLogoUrl} alt="Club Logo" width={24} height={24} />
              <span className="text-indigo-900 font-medium">{teamName}</span>
            </div>
          </div>

          {/* Joined Team */}
          <div className="flex items-center justify-between border-b py-3">
            <span className="text-gray-600 font-medium">Joined Team</span>
            <span className="text-indigo-900 font-medium">{joinedTeam.split('T')[0]}</span>
          </div>

      {
        !isCoach &&
        <>
          {/* Position */}
          <div className="flex items-center justify-between border-b py-3">
            <span className="text-gray-600 font-medium">Position</span>
            <span className="text-indigo-900 font-medium">{position && capitalizeFirstLetter(position)}</span>
          </div>


          {/* Section */}
          <div className="flex items-center justify-between border-b py-3">
            <span className="text-gray-600 font-medium">Section</span>
            <span className="text-indigo-900 font-medium">{section}</span>
          </div>
        </>
      }
        </div>
      </div>
  )
}

export default PlayerDetail;