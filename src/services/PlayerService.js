import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";

class PlayerService {
    getAllPlayers() {
        return axios.get(API_BASE_URL + '/viewPlayers/all');
    }

    getPagedPlayers() {
        return axios.get(API_BASE_URL + '/playerpage');
    }

    getSearchedPlayers(params) {
        return axios.get(API_BASE_URL + '/searchName/' + params);
    }

    getPlayerByRank(rank) {
        return axios.get(API_BASE_URL + '/searchRank/' + rank);
    }
}
export default new PlayerService();