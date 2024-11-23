import { teamService } from "@/app/lib/api-services";
import { Team } from "@/app/lib/models";
import Banner from "@/app/ui/banner/banner"
import React from "react";

interface TeamDetailLayoutProps {
    params: Promise<{ teamId: string }>
    children: React.ReactNode
}

export default async function TeamDetailLayout({
    params,
    children, // will be a page or nested layout
  }: TeamDetailLayoutProps) {
    // It follows https://nextjs.org/docs/messages/sync-dynamic-apis
    // Should use "await".
    const { teamId } = await params
    // TODO: Need to call one time. It is called app/teams/[teamId]/page.tsx as well.
    const team = await teamService.getTeam(teamId);
    return (
      <section>        
        {team && <Banner isTeamDetail={true} title={team.name} color={team.teamColor} tla={team.tla} est={team.establish} stadium={team.homeStadium} baseCity={team.baseCity} logoUrl={team.crest} />}
        {children}
      </section>
    )
  }