import React from 'react';
import {Link} from "react-router-dom";
import { orderService } from "../../services";

class Orders extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            orders: []
        }

        this.getOrders = this.getOrders.bind(this);
        this.remove = this.remove.bind(this);
    }

    async getOrders(){
        const orders = await orderService.getAll();
        this.setState({orders: orders})
    }

    async remove(id){
        await orderService.remove(id);
        await this.getOrders();
    }

    async componentDidMount() {
        await this.getOrders();
    }

    render(){
        return (
            <div className="m-5">
                <div className="card">
                    <div className="card-header">
                        Facturas
                        <Link to={"/orders/create"} className="btn btn-success ml-2"><i className="fas fa-plus"/></Link>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Fecha de venta</th>
                                <th scope="col">Total de productos</th>
                                <th scope="col">Precio total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.orders.length > 0 && this.state.orders.map(order => {
                                    return (
                                        <tr key={order.id}>
                                            <th scope="row">{order.id}</th>
                                            <td>{order.fecha_venta}</td>
                                            <td>{(order.listaDetalle).length}</td>
                                            <td>{order.total_venta}</td>
                                        </tr>
                                    );
                                })
                            }
                            {
                                this.state.orders.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="center">Aun no hay facturas</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export {Orders};
