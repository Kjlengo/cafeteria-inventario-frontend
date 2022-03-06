import React from 'react';

class OrderDetailPicker extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            orderDetail:{
                producto: props.orderDetail.producto || null,
                cantidad: props.orderDetail.cantidad || 0,
                total: props.orderDetail.total || 0
            }
        }

        this.changeProducto = this.changeProducto.bind(this);
        this.changeCantidad = this.changeCantidad.bind(this);
        this.calculeTotalPrice = this.calculeTotalPrice.bind(this);
    }

    

    changeProducto(event){
        const { orderDetail } = this.state;
        const producto = this.props.products.filter(producto => producto.id == event.target.value);

        if(producto.length > 0){
            orderDetail.producto = producto[0];
            orderDetail.productoX = producto[0];
            orderDetail.precio = producto[0].precio;
        }

        this.setState({
            orderDetail: orderDetail
        });
        this.calculeTotalPrice();
    }

    changeCantidad(event){
        const { orderDetail } = this.state;
        orderDetail.cantidad = event.target.value;
        this.setState({
            orderDetail: orderDetail
        });
        this.calculeTotalPrice();
    }

    calculeTotalPrice(){
        const { orderDetail } = this.state;

        if(orderDetail.producto && orderDetail.producto.precio != null){
            orderDetail.total = orderDetail.producto ? orderDetail.producto.precio * orderDetail.cantidad : 0;
        }

        this.setState({
            orderDetail: orderDetail
        })
        this.props.onChange(orderDetail);
    }

    render(){
        return (
            <div className="m-5">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="product">Producto:</label>
                                    <select className="form-control" name={this.props.id + "-products"} id={this.props.id + "-products"} placeholder="selecciona un producto..." onChange={this.changeProducto}>
                                        <option value=""/>
                                        {this.props.products.length > 0 && this.props.products.map(product => {
                                            return (
                                                <option value={product.id}>{product.referencia} - {product.nombre}</option>
                                            );
                                        })}
                                    </select>
                                </div>                                
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor={this.props.id + "-quantity"}>Cantidad:</label>
                                    <input type="number" className="form-control" id={this.props.id + "-quantity"} name={this.props.id + "-quantity"}
                                        min="0" placeholder="cantidad" value={this.state.orderDetail.cantidad} onChange={this.changeCantidad}/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor={this.props.id + "-total"}>Total:</label>
                                    <input type="number" className="form-control" id={this.props.id + "-total"} name={this.props.id + "-totalPrice"}
                                        value={this.state.orderDetail.total} disabled={true}/>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export {OrderDetailPicker};
