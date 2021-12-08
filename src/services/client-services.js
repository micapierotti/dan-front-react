import React from 'react'
import ClientAPIService from '../api/client-api'

export default class clientService extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            clients: []
        }
    }

    componentDidMount(){
        ClientAPIService.getClients().then((data) => {
            this.setState({clients: data})
            console.log(this.state.data);
        })
        .catch(function (ex) {
            console.log("Hubo un error al buscar los clientes al api. Error: ", ex);
        })
    }
}