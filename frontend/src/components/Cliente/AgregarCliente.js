import React, { useState } from "react";
import ClienteDataService from "../../services/cliente.service";
import { useNavigate } from 'react-router-dom';

const AgregarCliente = () => {
    let navigate = useNavigate();

    const initialClienteState = {
        ci: "",
        apellido: "",
        email: "",
        nombre: "",
        tipo: ""
    };

    const [cliente, setCliente] = useState(initialClienteState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };

    const saveCliente = () => {
        var data = {
            ci: cliente.ci,
            apellido: cliente.apellido,
            email: cliente.email,
            nombre: cliente.nombre,
            tipo: "Estandar"
        };

        ClienteDataService.createClienteEstandar(data).then(response => {
            setCliente({
                ci: response.data.ci,
                apellido: response.data.apellido,
                email: response.data.email,
                nombre: response.data.nombre,
                tipo: response.data.tipo
            });
            console.log(response.data);
            navigate("/clientes")
        })
            .catch(e => {
                console.log(e.response.data);
            })
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="ci">Cédula</label>
                    <input
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        type="text"
                        className="form-control"
                        id="ci"
                        required
                        value={cliente.ci}
                        onChange={handleInputChange}
                        name="ci"
                        maxLength={8}
                    />

                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        required
                        value={cliente.nombre}
                        onChange={handleInputChange}
                        name="nombre"
                    />

                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        required
                        value={cliente.apellido}
                        onChange={handleInputChange}
                        name="apellido"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={cliente.email}
                        onChange={handleInputChange}
                        name="email"
                    />

                </div>

                <br></br>
                <button onClick={saveCliente} className="btn btn-success">
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default AgregarCliente;