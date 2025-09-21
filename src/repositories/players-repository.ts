import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";
import fs from "fs/promises";

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
    const data: PlayerModel[] = JSON.parse(await fs.readFile("./src/data/players.json", "utf-8"));
    return data;
};

export const findPlayerById = async (id: number): Promise<PlayerModel | undefined> => {
    const data: PlayerModel[] = JSON.parse(await fs.readFile("./src/data/players.json", "utf-8"));
    return data.find( player => player.id === id);
};

export const insertPlayer = async (player: PlayerModel) => {
    const data: PlayerModel[] = JSON.parse(await fs.readFile("./src/data/players.json", "utf-8"));
    data.push(player);
    await fs.writeFile("./src/data/players.json", JSON.stringify(data));
};

export const deletePlayer = async (id: number) => {
    const data: PlayerModel[] = JSON.parse(await fs.readFile("./src/data/players.json", "utf-8"));
    const index = data.findIndex(player => player.id === id);

    if (index !== -1) {
        data.splice(index, 1);
        await fs.writeFile("./src/data/players.json", JSON.stringify(data));
        return true;
    }
    
    return false;
};

export const findAndModifyPlayer = async (id: number, statistics: StatisticsModel): Promise<PlayerModel> => {
    const data: PlayerModel[] = JSON.parse(await fs.readFile("./src/data/players.json", "utf-8"));
    const playerIndex = data.findIndex(player => player.id === id);

    if (playerIndex !== -1) {
        data[playerIndex].statistics = statistics;
        await fs.writeFile("./src/data/players.json", JSON.stringify(data));
    }
    
    return data[playerIndex];
};