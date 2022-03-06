import React from 'react';
import {Link} from "react-router-dom";
import {productService} from "../../services";

class Products extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            productos: []
        }

        this.getProducts = this.getProducts.bind(this);
        this.remove = this.remove.bind(this);
    }

    async getProducts(){
        const productos = await productService.getAll();
        this.setState({productos: productos})
    }

    async remove(id){
        await productService.remove(id);
        await this.getProducts();
    }

    async componentDidMount() {
        await this.getProducts();
    }

    render(){
        return (
            <div className="m-5">
                <div className="card">
                    <div className="card-header">
                        Productos
                        <Link to={"/products/create"} className="btn btn-success ml-2"><i className="fas fa-plus"/></Link>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Referencia</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Peso[gr]</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Fecha creacion</th>
                                <th scope="col">Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.productos.length > 0 && this.state.productos.map(producto => {
                                    return (
                                        <tr key={producto.id}>
                                            <th scope="row">{producto.id}</th>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.referencia}</td>
                                            <td>${producto.precio}</td>
                                            <td>{producto.peso}</td>
                                            <td>{producto.categoria}</td>
                                            <td>{producto.stock}</td>
                                            <td>{producto.fecha_creacion}</td>
                                            <td>
                                                <Link to={"/products/"+producto.id}  className="btn btn-primary mr-2"><i className="fas fa-eye"/></Link>
                                                <Link to={"/products/"+producto.id+"/edit"}  className="btn btn-warning mr-2"><i className="fas fa-pencil-alt"/></Link>
                                                <span className="btn btn-danger" onClick={async ()=>{await this.remove(producto.id)}}><i className="fas fa-trash-alt"/></span>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            {
                                this.state.productos.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="center">Aun no hay productos</td>
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

export {Products};
