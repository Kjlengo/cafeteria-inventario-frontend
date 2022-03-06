import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Products, ProductDetails, CreateProduct, EditProduct } from './components/product';
import { Orders, CreateOrder } from './components/order';

function App() {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Inicio</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active mr-2">
                <Link className="text-decoration-none" to="/products">Productos</Link>
              </li>
              <li className="nav-item mr-2">
                <Link className="text-decoration-none" to="/orders">Facturas</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>

          <Route exact path="/products" component={Products}/>
          <Route exact path="/products/create" component={CreateProduct}/>
          <Route exact path="/products/:id" component={ProductDetails}/>
          <Route exact path="/products/:id/edit" component={EditProduct}/>

          <Route exact path="/orders" component={Orders}/>
          <Route exact path="/orders/create" component={CreateOrder}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
