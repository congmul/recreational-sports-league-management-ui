import { teamService } from "@/app/lib/api-services"
import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import clsx from "clsx"
import PlayerCard from '@/app/ui/team/playerCard';
import CoachCard from '@/app/ui/team/coachCard';
import { Player } from "@/app/lib/models";
import Link from "next/link";
import Banner from "@/app/ui/banner/banner";

interface TeamDetailProps {
    params: Promise<{ teamId: string }>
}

function sortingPlayers(players:Player[] | undefined){
    if(!players) return { goalkeepers: [], defenders: [], midfielders: [], forwards: []};
    const goalkeepers:Player[] = []
    const defenders:Player[] = []
    const midfielders:Player[] = []
    const forwards:Player[] = []
    players.forEach(player => {
        if(player.position === 'goalkeeper'){
            goalkeepers.push(player);
        }else if(player.position === 'defender'){
            defenders.push(player);
        }else if(player.position === 'midfielder'){
            midfielders.push(player);
        }else if(player.position === 'forward'){
            forwards.push(player);
        }
    })
    return ({
        goalkeepers,
        defenders,
        midfielders,
        forwards
    })
}

export default async function Page({ params }: TeamDetailProps) {
    // It follows https://nextjs.org/docs/messages/sync-dynamic-apis
    // Should use "await".
    const { teamId } = await params
    const team = await teamService.getTeam(teamId); 
    const organizedPlayers = sortingPlayers(team?.players);    
    return(<>
    {
        team && <>
            <Banner isTeamDetail={true} title={team.name} color={team.teamColor} tla={team.tla} est={team.establish} stadium={team.homeStadium} baseCity={team.baseCity} logoUrl={team.crest} />
            <TabGroup className="pl-3" style={{marginTop:"-40px"}}>
                <TabList className="flex gap-4">
                    <Tab
                        key={'squad'}
                        className={clsx(`text-[16px] rounded-t-lg py-2 px-4 border-white text-white outline-none
                            hover:bg-gray-100 hover:text-black                            
                            data-[selected]:border-4 data-[selected]:-m-1
                            data-[selected]:text-white
                        `, `data-[selected]:data-[hover]:bg-transparent`)}
                    >
                        Squad
                    </Tab>
                    <Tab
                        key={'coach'}
                        className={clsx(`text-[16px] rounded-t-lg py-2 px-4 border-white text-white outline-none
                            hover:bg-gray-100 hover:text-black                            
                            data-[selected]:border-4 data-[selected]:-m-1
                            data-[selected]:text-white
                        `, `data-[selected]:data-[hover]:bg-transparent`)}
                    >
                        Coach
                    </Tab>
                </TabList>
                <TabPanels className="mt-3 max-h-[calc(100vh-307px)] lg:max-h-[calc(100vh-407px)] overflow-y-auto">
                    <TabPanel key={"squad"} className="rounded-xl bg-white/5 p-3">
                        <div className="text-[32px] font-bold text-indigo-900">Goalkeepers</div>
                        <div className="flex flex-wrap">
                        {
                            organizedPlayers['goalkeepers'].map(player => {
                                return (<Link href={`/players/${player._id}`} key={player._id} className="p-3">                               
                                    <PlayerCard 
                                        firstName={player.firstName}
                                        lastName={player.lastName}
                                        shirtNumber={player.shirtNumber}
                                        position={player.position}
                                        section={player.section}
                                        joinedTeam={player.joinedTeam?.split("T")[0]}
                                        dateOfBirth={player.dateOfBirth?.split("T")[0]}
                                        nationality={player.nationality}
                                        profileUrl={player.profileUrl}
                                        teamColor={team.teamColor}
                                    />
                                </Link>
                            )})
                        }
                        </div>
                        <div className="text-[32px] font-bold text-indigo-900 mt-5">Defenders</div>
                        <div className="flex flex-wrap">
                        {
                            organizedPlayers['defenders'].map(player => {
                                return (<Link href={`/players/${player._id}`} key={player._id} className="p-3">                                
                                    <PlayerCard 
                                        firstName={player.firstName}
                                        lastName={player.lastName}
                                        shirtNumber={player.shirtNumber}
                                        position={player.position}
                                        section={player.section}
                                        joinedTeam={player.joinedTeam?.split("T")[0]}
                                        dateOfBirth={player.dateOfBirth?.split("T")[0]}
                                        nationality={player.nationality}
                                        profileUrl={player.profileUrl}
                                        teamColor={team.teamColor}
                                    />
                                </Link>
                            )})
                        }
                        </div>
                        <div className="text-[32px] font-bold text-indigo-900 mt-5">Midfielders</div>
                        <div className="flex flex-wrap">
                        {
                            organizedPlayers['midfielders'].map(player => {
                                return (<Link href={`/players/${player._id}`} key={player._id} className="p-3">                              
                                    <PlayerCard 
                                        firstName={player.firstName}
                                        lastName={player.lastName}
                                        shirtNumber={player.shirtNumber}
                                        position={player.position}
                                        section={player.section}
                                        joinedTeam={player.joinedTeam?.split("T")[0]}
                                        dateOfBirth={player.dateOfBirth?.split("T")[0]}
                                        nationality={player.nationality}
                                        profileUrl={player.profileUrl}
                                        teamColor={team.teamColor}
                                    />
                                </Link>
                            )})
                        }
                        </div>
                        <div className="text-[32px] font-bold text-indigo-900 mt-5">Forwards</div>
                        <div className="flex flex-wrap">
                        {
                            organizedPlayers['forwards'].map(player => {
                                return (<Link href={`/players/${player._id}`} key={player._id} className="p-3">                                  
                                    <PlayerCard 
                                        firstName={player.firstName}
                                        lastName={player.lastName}
                                        shirtNumber={player.shirtNumber}
                                        position={player.position}
                                        section={player.section}
                                        joinedTeam={player.joinedTeam?.split("T")[0]}
                                        dateOfBirth={player.dateOfBirth?.split("T")[0]}
                                        nationality={player.nationality}
                                        profileUrl={player.profileUrl}
                                        teamColor={team.teamColor}
                                    />
                                </Link>
                            )})
                        }
                        </div>
                    </TabPanel>

                    <TabPanel key={"coach"} className="rounded-xl bg-white/5 p-3">
                        <Link href={`/coaches/${team.coach._id}`} className="p-3">
                            <CoachCard 
                                firstName={team.coach.firstName}
                                lastName={team.coach.lastName}
                                joinedTeam={team.coach.joinedTeam?.split("T")[0]}
                                dateOfBirth={team.coach.dateOfBirth?.split("T")[0]}
                                nationality={team.coach.nationality}
                                profileUrl={team.coach.profileUrl}
                                teamColor={team.teamColor}
                            />
                        </Link>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    }
    </>)
}