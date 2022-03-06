import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {productService} from "../../services";

class EditProduct extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id ? this.props.match.params.id : 0,
            nombre: "",
            referencia: "",
            precio: 0,
            peso: 0,
            categoria: "",
            stock: 0,
            fechaCreacion: ""
        }

        this.changeNombre = this.changeNombre.bind(this);
        this.changeReferencia= this.changeReferencia.bind(this);
        this.changePrecio = this.changePrecio.bind(this);
        this.changePeso = this.changePeso.bind(this);
        this.changeCategoria = this.changeCategoria.bind(this);
        this.changeStock = this.changeStock.bind(this);

        this.save = this.save.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    changeNombre(event){
        this.setState({
            nombre: event.target.value
        })
    }

    changeReferencia(event){
        this.setState({
            referencia: event.target.value
        })
    }

    changePrecio(event){
        this.setState({
            precio: event.target.value
        })
    }

    changePeso(event){
        this.setState({
            peso: event.target.value
        })
    }

    changeCategoria(event){
        this.setState({
            categoria: event.target.value
        })
    }

    changeStock(event){
        this.setState({
            stock: event.target.value
        })
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
            fechaCreacion: producto.fechaCreacion
        });
    }

    async save(){

        let date = new Date();
        let fecha_creacion = date.toISOString().split('T')[0];

        const { id, nombre, referencia, precio, peso, categoria, stock } = this.state;
        const producto = { id, nombre, referencia, precio, peso, categoria, stock, fecha_creacion }

        console.log(producto)
        await productService.update(id, producto);
        this.props.history.push("/products");
    }

    async componentDidMount() {
        await this.getProduct();
    }

    render(){
        return (
            <div className="m-5">
                <div className="card">
                    <div className="card-header">
                        Editar producto
                    </div>
                    <div className="card-body">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" className="form-control" id="nombre"
                                   placeholder="Nombre" value={this.state.nombre} onChange={this.changeNombre}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Referencia:</label>
                            <input type="text" className="form-control" id="referencia"
                                   placeholder="Referencia" value={this.state.referencia} onChange={this.changeReferencia}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Precio:</label>
                            <input type="number" className="form-control" id="precio"
                                   placeholder="Precio" value={this.state.precio} onChange={this.changePrecio}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Peso [gr]:</label>
                            <input type="number" className="form-control" id="peso"
                                   placeholder="Peso" value={this.state.peso} onChange={this.changePeso}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Categoria:</label>
                            <input type="text" className="form-control" id="categoria"
                                   placeholder="Categoria" value={this.state.categoria} onChange={this.changeCategoria}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Stock:</label>
                            <input type="number" className="form-control" id="stock"
                                   placeholder="Stock" value={this.state.stock} onChange={this.changeStock}/>
                        </div>
                        <div className="row">
                            <div className="col text-right">
                                <Link className="btn btn-default mr-2" to={"/products"}>Cancelar</Link>
                                <span className="btn btn-success" onClick={async () => {await this.save()}}><i className="fas fa-save mr-2"/>Guardar</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export {EditProduct};
