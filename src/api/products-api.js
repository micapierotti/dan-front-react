import axios from 'axios'

const PRODUCTS_REST_URL = "http://localhost:9001/api/productos"

class ProductsAPIService {
    getProducts(){
        return axios.get(PRODUCTS_REST_URL)
    }
}

export default new ProductsAPIService()