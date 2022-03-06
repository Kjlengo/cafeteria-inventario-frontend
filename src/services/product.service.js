export const productService = {
    getAll,
    getOne,
    create,
    update,
    remove
};

async function getAll(){

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };

    return await fetch("http://localhost:8090/api/productos", requestOptions).then(response => response.json())
    
}

async function getOne(id){
    
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };

    return await fetch("http://localhost:8090/api/productos/"+id, requestOptions).then(response => response.json());
    
}

async function create(producto){
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    };

    return await fetch("http://localhost:8090/api/productos", requestOptions).then(response => response.json());
}

async function update(id, producto){
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    };

    return await fetch("http://localhost:8090/api/productos/"+id, requestOptions).then(response => response.json());
}

async function remove(id){
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    };

    return await fetch("http://localhost:8090/api/productos/"+id, requestOptions);
}
