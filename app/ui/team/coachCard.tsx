import React from "react";
import Image from "next/image";

interface CoachCardProps {
  firstName: string;
  lastName: string;
  joinedTeam: string;
  dateOfBirth: string;
  nationality: string;
  profileUrl?: string;
  teamColor: string;
}

const CoachCard: React.FC<CoachCardProps> = ({
    firstName,
    lastName,
    joinedTeam,
    dateOfBirth,
    nationality,
    profileUrl,
    teamColor,
}) => {
  return (
    <div className="w-[320px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer">
        <div className="flex">
            {/* Stats Section */}
            <div
            className="grow flex flex-col justify-between p-4 text-indigo-900"
            >
            <div className="text-sm">
                <div className="mb-2">
                    <span>Joined Team</span>
                    <p className="text-xl font-bold">{joinedTeam}</p>
                </div>
                <div className="mb-2">
                    <span>Nationality</span>
                    <p className="text-xl font-bold">{nationality}</p>
                </div>
                <div>
                    <span>Date of Birth</span>
                    <p className="text-xl font-bold">{dateOfBirth}</p>
                </div>
            </div>
            </div>

            {/* Image Section */}
            <div className="relative w-40 h-48 flex-shrink-0 bg-cover bg-center" style={{ backgroundColor: teamColor }}>
            <Image
                src={profileUrl || '/assets/img/Photo-Missing-Profile.png'}
                alt={`${firstName} ${lastName}`}
                layout="fill"
                className="rounded-t-lg"
            />
            </div>
        </div>

        {/* Details Section */}
        <div className="px-4 mb-4">
            <div className="leading-[0px]">{firstName}</div>
            <div className="text-[32px] font-bold text-indigo-900">
                {lastName}
            </div>
        </div>
    </div>
  );
};

export default CoachCard;