import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [shopingCart, setShopingCart] = useState([]);
  const[total,setTotal]=useState(0)

  useEffect(() => {
    fetch("JSON/productos.json")
      .then((response) => response.json())
      .then((data) => setProductos(data.productos));
  }, []);

  function agregarAlCarrito(producto) {
    
    setShopingCart([...shopingCart, producto])
    setTotal(total+producto.precio)
  }

  function removerDelCarrito(producto){
    setShopingCart(shopingCart.filter(p=>p.id !== producto.id))
    setTotal(total-producto.precio)
  }

  return (
    <div>
      <h2>Tienda de productos</h2>
      <div className="row">
        <div className="productos col-md-8">
          <div className="row">
            {productos.map((producto) => (
              <div Key={producto.id}>
                <div className="card">
                  <div className="card-header">
                    <h4>{producto.name}</h4>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Precio:</strong>
                      {producto.precio}
                    </p>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

                <div className="col-md-4">
                  <ul className="list-group">
                    <li className="list-group-item active"> Carrito de compras</li>
                    {shopingCart.map(producto=>(
                        <li className="list-group-item" Key={producto.id}>
                          <div>
                            <div>
                              {producto.nombre} - ${producto.precio}
                            </div>
                            <div className="col-5">
                              <button className="btn btn-danger" onClick={()=>removerDelCarrito(producto)}>Eliminar</button>
                            </div>
                          </div>
                        </li>
                        
                    ))}
                    <li>Total: ${total}</li>
                  </ul>
                  <button>Pagar</button>
                </div>
               


       </div>
      </div>
 

  );
}

export default App;
