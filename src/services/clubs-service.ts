import * as HttpResponse from "../utils/http-helper";
import * as clubRepository from "../repositories/clubs-repository";

export const getClubService = async () => {
    const data = await clubRepository.findAllClubs();
    const response = HttpResponse.ok(data);
    return response;
};