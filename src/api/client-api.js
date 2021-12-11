import axios from 'axios'

const CLIENTS_REST_URL = "http://localhost:9000/api/cliente"

class ClientAPIService {
    getClients(){
        return axios.get(CLIENTS_REST_URL)
    }
}

export default new ClientAPIService()