import React, { useState, useEffect } from "react";
import PlanesClienteDataService from "../../services/planescliente.service";
//import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

const AgregarPlanCliente = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const initialPlanState = {
        id: ""
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPlanCliente({ ...planCliente, [name]: value });
    };

    const [planCliente, setPlanCliente] = useState(initialPlanState);

    const savePlanCliente = () => {
        var data = {
            id: planCliente.id
        };

        PlanesClienteDataService.create(data, id).then(response => {
            setPlanCliente({
                id: response.data.id
            });
            console.log(response.data);
        })
    }

    return (
        <div>
            <input
                type="number"
                className="form-control"
                id="id"
                required
                value={planCliente.id}
                onChange={handleInputChange}
                name="id"
            />

            <button onClick={savePlanCliente} className="btn btn-success">
                Agregar
            </button>
        </div>
    )
}

export default AgregarPlanCliente;