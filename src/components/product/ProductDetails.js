import React from 'react';
import {Link} from "react-router-dom";
import {productService} from "../../services";

class ProductDetails extends React.Component {

    constructor(props){
        console.log(props)
        super(props);
        this.state = {
            id: props.match.params.id ? props.match.params.id : 0,
            nombre: "",
            referencia: "",
            precio: 0,
            peso: 0,
            categoria: "",
            stock: 0,
            fechaCreacion: ""
        }

        this.getProduct = this.getProduct.bind(this);
    }

    async getProduct(){
        const producto = await productService.getOne(this.state.id);
        this.setState({
            id: producto.id,
            nombre: producto.nombre,
            referencia: producto.referencia,
            precio: producto.precio,
            peso: producto.peso,
            categoria: producto.categoria,
            stock: producto.stock,
            fechaCreacion: producto.fecha_creacion
        });
    }

    async componentDidMount() {
        await this.getProduct();
    }

    render(){
        return (
            <div className="m-5">
                <div className="card">
                    <div className="card-header">
                        Producto
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3">Nombre:</div>
                            <div className="col-9">{this.state.nombre}</div>
                        </div>
                        <div className="row">
                            <div className="col-3">Referencia:</div>
                            <div className="col-9">{this.state.referencia}</div>
                        </div>
                        <div className="row">
                            <div className="col-3">Precio:</div>
                            <div className="col-9">{this.state.precio}</div>
                        </div>
                        <div className="row">
                            <div className="col-3">Peso:</div>
                            <div className="col-9">{this.state.peso}</div>
                        </div>
                        <div className="row">
                            <div className="col-3">Categoria:</div>
                            <div className="col-9">{this.state.categoria}</div>
                        </div>
                        <div className="row">
                            <div className="col-3">Stock:</div>
                            <div className="col-9">{this.state.stock}</div>
                        </div>
                        <div className="row">
                            <div className="col-3">Fecha creacion:</div>
                            <div className="col-9">{this.state.fechaCreacion}</div>
                        </div>
                        <div className="row">
                            <div className="col text-right">
                                <Link className="btn btn-default mr-2" to={"/products"}>Regresar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export {ProductDetails};
