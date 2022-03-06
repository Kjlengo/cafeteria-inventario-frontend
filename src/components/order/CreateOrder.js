import React from 'react';
import { orderService, productService } from "../../services";
import {Link, Redirect} from "react-router-dom";

import { OrderDetailPicker } from "../orderDetail"

class CreateOrder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            orderDetails: [],
            products: [],
            totalFactura: 0
        }
        
        this.onAddOrderDetailPicker = this.onAddOrderDetailPicker.bind(this);
        this.onDeleteOrderDetailPicker = this.onDeleteOrderDetailPicker.bind(this);
        this.calculateTotalOrderPrice = this.calculateTotalOrderPrice.bind(this);

        this.save = this.save.bind(this);
    }

    async componentDidMount(){
        const products = await productService.getAll();
        this.setState({products: products});
    }

    updateOrderDetail(index, orderDetail){
        const { orderDetails } = this.state;
        orderDetails[index] = orderDetail;
        this.setState({
            orderDetails: orderDetails
        });
        this.calculateTotalOrderPrice();
    }

    onAddOrderDetailPicker(){
        const { orderDetails } = this.state;
        orderDetails.push({producto: null, cantidad: 0, total: 0});
        this.setState({
            orderDetails: orderDetails
        });
        this.calculateTotalOrderPrice();
    }

    onDeleteOrderDetailPicker(index){
        const { orderDetails } = this.state;
        orderDetails.splice(index, 1);
        this.setState({
            orderDetails: orderDetails
        });
        this.calculateTotalOrderPrice();
    }

    calculateTotalOrderPrice() {
        const { orderDetails } = this.state;        
        this.setState({
            totalFactura: orderDetails.reduce((totalOrderPrice, orderDetail) => totalOrderPrice + orderDetail.total, 0)
        })

    }

    async save(){
        let date = new Date();
        let fecha_venta = date.toISOString().split('T')[0];

        const { orderDetails, totalFactura } = this.state;
        const factura = { fecha_venta, listaDetalle: orderDetails, total_venta: totalFactura };
        
        await orderService.create(factura);
        this.props.history.push("/orders");
    }

    render(){
        return (
            <div className="m-5">
                <div className="card">
                    <div className="card-header">
                        Nueva factura
                    </div>
                    <div className="card-body">
                        <h3>Productos:</h3>
                        {this.state.orderDetails.map( (orderDetail, index) => (
                            <OrderDetailPicker
                                id={index}
                                products={this.state.products}
                                orderDetail={orderDetail}
                                onChange={(orderDetailUpdated)=> this.updateOrderDetail(index, orderDetailUpdated)}
                                onDelete={()=>this.onDeleteOrderDetailPicker(index)}
                            />
                        ))}
                        <div className="row">
                            <div className="col text-center">
                                <h4>Total: ${this.state.totalFactura}</h4>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col text-center">
                                <span className="btn btn-success" onClick={this.onAddOrderDetailPicker}><i className="fas fa-plus mr-2"/>Añadir producto</span>
                                {
                                    this.state.orderDetails.length > 0 && 
                                    <span className="ml-2 btn btn-danger" onClick={() => this.onDeleteOrderDetailPicker(this.state.orderDetails.length-1)}><i className="fas fa-trash mr-2"/>Eliminar ultimo producto</span>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-right">
                                <Link className="btn btn-default mr-2" to={"/orders"}>Cancelar</Link>
                                <span className="btn btn-success" onClick={async () => {await this.save()}}><i className="fas fa-save mr-2"/> Registrar compra</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export {CreateOrder};
