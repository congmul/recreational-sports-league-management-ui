import { Team } from "./team";

export type Coach = {
    _id: string,
    firstName: string,
    lastName: string,
    profileUrl: string,
    nationality: string,
    dateOfBirth: string,
    team: Team,
    teamName: string,
    crest: string,
    joinedTeam: string,
    createdAt: string,
    updatedAt: string,
}

export type CoachFormType = {
    id: string;
    profileUrl?: string;
    firstName: string;
    lastName: string;
    nationality?: string;
    dateOfBirth?: string;
    team?: string; // Team Id
    teamName?: string,
    crest?: string,
    joinedTeam?: string;
}