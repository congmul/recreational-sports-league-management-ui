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