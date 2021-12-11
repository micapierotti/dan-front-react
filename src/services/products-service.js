import React from 'react'
import ProductsAPIService from '../api/products-api'

export default class clientService extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }

    componentDidMount(){
        ProductsAPIService.getProducts().then((data) => {
            this.setState({products: data})
            console.log(this.state.data);
        })
        .catch(function (ex) {
            console.log("Hubo un error al buscar los productos al api. Error: ", ex);
        })
    }
}