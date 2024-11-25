import { Team } from "./team"

export type Player = {
    _id: string
    firstName: string
    lastName: string
    profileUrl: string,
    shirtNumber: number
    nationality: string
    dateOfBirth: string
    team: Team
    joinedTeam: string
    section: string
    position: string
    createdAt: string
    updatedAt: string
}

export type PlayerFormType = {
    id: string;
    profileUrl: string;
    firstName: string;
    lastName: string;
    nationality: string;
    dateOfBirth: string;
    team: string; // Team Id
    shirtNumber?: number;
    joinedTeam: string;
    position?: string;
    section?: string;
}