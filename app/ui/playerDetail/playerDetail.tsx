import Image from 'next/image';
import { capitalizeFirstLetter } from '@/app/lib/utils';
import RemoveModal from '../removeModal/removeModal';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface PlayerDetailProps {
  id: string,
  name: string,
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
  id,
  name,
  nationality,
  dateOfBirth,
  teamName,
  teamLogoUrl,
  joinedTeam,
  position,
  section,
  isCoach
}: PlayerDetailProps) {  
  const cookieStore = await cookies();
  const userInfo = cookieStore.get('userInfo')?.value 
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined

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
              {
                teamName 
                ?<>
                    <Image src={teamLogoUrl} alt="Club Logo" width={24} height={24} />
                    <span className="text-indigo-900 font-medium">{teamName}</span>
                  </>
                : "None"
              }
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
      {
        parsedUserInfo && parsedUserInfo.role === "admin" && <div className="flex w-full justify-end item-center">
        <Link href={isCoach ? `/coaches/${id}/edit` : `/players/${id}/edit`}
            className={"mt-5 mr-3 w-[28px] text-sm font-medium text-gray-700 hover:text-red-500"}
          >
            <PencilSquareIcon />
        </Link>
        <RemoveModal id={id} name={name} category={isCoach ? 'coaches' : 'players'} isPlayerDetail={true} />
        </div>
      }
        </div>
      </div>
  )
}

export default PlayerDetail;