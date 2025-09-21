import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";
import * as playerRepository from "../repositories/players-repository";
import * as HttpResponse from "../utils/http-helper";

export const getPlayerService = async () => {
    const data = await playerRepository.findAllPlayers();
    if (data) {
        return await HttpResponse.ok(data);    
    } else {
        return await HttpResponse.noContent();
    }
};

export const getPlayerByIdService = async (id: number) => {
    const data = await playerRepository.findPlayerById(id);
    if (data) {
        return await HttpResponse.ok(data);
    } else {
        return await HttpResponse.noContent();
    }
};

export const createPlayerService = async (player: PlayerModel) => {
    if (Object.keys(player).length !== 0) {
        await playerRepository.insertPlayer(player);
        return await HttpResponse.created();
    } else {
        return await HttpResponse.badRequest();
    }
};

export const deletePlayerService = async (id: number) => {
    const isDeleted = await playerRepository.deletePlayer(id);
    if (isDeleted) {
        return HttpResponse.ok({ message: "deleted"});
    } else {
        return HttpResponse.badRequest();
    }
};

export const updatePlayerService = async (id: number, statistics: StatisticsModel) => {
    const data = await playerRepository.findAndModifyPlayer(id, statistics);

    if (Object.keys(data).length === 0) {
        return await HttpResponse.badRequest();
    } else {
        return await HttpResponse.ok(data);
    }
};
