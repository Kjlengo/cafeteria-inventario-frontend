export const orderService = {
    getAll,
    create
};

async function getAll(){

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };

    return await fetch("http://localhost:8090/api/mostrar-facturas", requestOptions).then(response => response.json());    
}

async function create(factura){
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(factura)
    };
    console.log("aca kevinsito oreder.service")    
    console.log(factura)
    return await fetch("http://localhost:8090/api/crear-factura", requestOptions).then(response => response.json());
}