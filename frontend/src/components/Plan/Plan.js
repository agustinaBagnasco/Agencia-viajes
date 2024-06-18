import React, { useState, useEffect } from "react";
import PlanDataService from "../../services/plan.service";
import { useParams, useNavigate } from 'react-router-dom';

const Plan = props => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialPlanState = {
        id: null,
        destino: "",
        fecha: "",
        modalidad: "",
        precio: null
    };

    const [currentPlan, setCurrentPlan] = useState(initialPlanState);
    const [message, setMessage] = useState("");

    const getPlan = id => {
        PlanDataService.get(id)
            .then(response => {
                setCurrentPlan(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getPlan(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPlan({ ...currentPlan, [name]: value });
    };

    const updatePlan = () => {
        PlanDataService.update(
            currentPlan.id,
            currentPlan
        )
            .then(response => {
                console.log(response.data);
                setMessage("Plan modificado con éxito");
                navigate("/planes");
            }).catch(e => {
                console.log(e);
            })
    }

    return (
        <div>
            {currentPlan ? (
                <div className="edit-form">
                    <h4>Plan</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="destino">Destino</label>
                            <input
                                type="text"
                                className="form-control"
                                id="destino"
                                required
                                value={currentPlan.destino}
                                onChange={handleInputChange}
                                name="destino"
                            />

                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                required
                                value={currentPlan.fecha}
                                onChange={handleInputChange}
                                name="fecha"
                            />

                            <label htmlFor="modalidad">Modalidad</label>
                            <input
                                type="text"
                                className="form-control"
                                id="modalidad"
                                required
                                value={currentPlan.modalidad}
                                onChange={handleInputChange}
                                name="modalidad"
                            />

                            <label htmlFor="precio">Precio</label>
                            <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                type="text"
                                className="form-control"
                                id="precio"
                                required
                                value={currentPlan.precio}
                                onChange={handleInputChange}
                                name="precio"
                            />
                        </div>
                    </form>

                    <br></br>
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updatePlan}>
                        Modificar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br></br>
                    <p>Haga click en un plan</p>
                </div>
            )}
        </div>
    )
}

export default Plan;