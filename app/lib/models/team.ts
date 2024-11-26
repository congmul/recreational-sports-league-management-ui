import { Coach } from "./coach";
import { Player } from "./player";

export type Team = {
    _id: string,
    name: string,
    tla: string,
    crest: string,
    teamColor: string,
    baseCity: string,
    establish: string,
    homeStadium: string,
    players: Player[],
    maxNumber: number,
    createdAt: string,
    updatedAt: string,
    coach: Coach,
}

export type TeamWithoutPopulate = {
    _id: string,
    name: string,
    tla: string,
    crest: string,
    teamColor: string,
    baseCity: string,
    establish: string,
    homeStadium: string,
    players: string[],
    maxNumber: number,
    createdAt: string,
    updatedAt: string,
    coach: string,
}

export type TeamFormType = {
    _id: string,
    name: string,
    tla: string,
    crest: string,
    teamColor: string,
    baseCity: string,
    establish: string,
    homeStadium: string,
    players: string[],
    maxNumber: number,
    coach: string,
}