import React, { useState } from "react";
import PlanDataService from "../../services/plan.service";
import { useNavigate } from 'react-router-dom';

const AgregarPlan = () => {
    let navigate = useNavigate();

    const initialPlanState = {
        id: null,
        destino: "",
        fecha: "",
        modalidad: "",
        precio: ""
    };

    const [plan, setPlan] = useState(initialPlanState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPlan({ ...plan, [name]: value });
    };

    const savePlan = () => {
        var data = {
            destino: plan.destino,
            fecha: plan.fecha,
            modalidad: plan.modalidad,
            precio: plan.precio
        };

        PlanDataService.create(data).then(response => {
            setPlan({
                destino: response.data.destino,
                fecha: response.data.fecha,
                modalidad: response.data.modalidad,
                precio: response.data.precio
            });
            console.log(response.data);
            navigate("/planes")
        })
            .catch(e => {
                console.log(e.response.data);
            })
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="destino">Destino</label>
                    <input
                        type="text"
                        className="form-control"
                        id="destino"
                        required
                        value={plan.destino}
                        onChange={handleInputChange}
                        name="destino"
                    />

                    <label htmlFor="fecha">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        required
                        value={plan.fecha}
                        onChange={handleInputChange}
                        name="fecha"
                        min={new Date().toISOString().split('T')[0]}
                    />

                    <label htmlFor="modalidad">Modalidad</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modalidad"
                        required
                        value={plan.modalidad}
                        onChange={handleInputChange}
                        name="modalidad"
                    />

                    <label htmlFor="precio">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        required
                        value={plan.precio}
                        onChange={handleInputChange}
                        name="precio"
                    />

                </div>

                <br></br>
                <button onClick={savePlan} className="btn btn-success">
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default AgregarPlan;