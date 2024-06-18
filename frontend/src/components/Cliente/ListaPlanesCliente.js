import React, { useState, useEffect } from "react";
import PlanesClienteDataService from "../../services/planescliente.service";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

const ListaPlanesCliente = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [planesCliente, setPlanesCliente] = useState([]);
    const [currentPlanCliente, setCurrentPlanCliente] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchPlan, setSearchPlan] = useState("");

    useEffect(() => {
        retrievePlanesCliente();
    }, []);

    const retrievePlanesCliente = () => {
        PlanesClienteDataService.get(id).then(response => {
            setPlanesCliente(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const setActivePlanCliente = (planCliente, index) => {
        setCurrentPlanCliente(planCliente);
        setCurrentIndex(index);
    }

    const buscarPlan = (e) => {
        if (e.target.value === "") {
            try {
                PlanesClienteDataService.get(id).then(response => {
                    setPlanesCliente(response.data)
                });
            } catch (e) {
                console.log(e);
            }
        }
        const searchResult = planesCliente.filter(plan => plan.destino.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchPlan(e.target.value);
        setPlanesCliente(searchResult);
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por destino"
                        value={searchPlan}
                        onChange={buscarPlan}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <h4>Lista de planes de {id}</h4>
                <Link to={"/agregarplan"} className="btn btn-success" style={{ marginTop: "1%", marginBottom: "1%" }}>
                    Agregar nuevo
                </Link>

                <ul className="list-group">
                    {planesCliente && planesCliente.map((plan, index) => (
                        <li
                            className={
                                "list-group-item" +
                                (index === currentIndex ? " active" : "")
                            }
                            onClick={() => setActivePlanCliente(plan, index)}
                            key={index}
                            style={{ cursor: "pointer" }}>
                            {plan.destino} <strong>U$S</strong>{plan.precio}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                <br></br>
                {currentPlanCliente ? (
                    <div style={{ border: '1px solid #C7C8C9', padding: '5px', borderRadius: '1%' }}>
                        <h4 style={{ margin: "1%" }}>{currentPlanCliente.destino}</h4>
                        <div style={{ margin: "1%" }}>
                            <label>
                                <strong>Modalidad:</strong>
                            </label>{" "}
                            {currentPlanCliente.modalidad}
                        </div>
                        <div style={{ margin: "1%" }}>
                            <label>
                                <strong>Fecha:</strong>
                            </label>{" "}
                            {currentPlanCliente.fecha}
                        </div>
                        <div style={{ margin: "1%" }}>
                            <label>
                                <strong>Precio:</strong>
                            </label>{" "}
                            U$S{currentPlanCliente.precio}
                        </div>

                        <div className="btn btn-primary" style={{ margin: "1%" }}>
                            <Link
                                to={"/planescliente/" + currentPlanCliente.id} style={{ textDecoration: 'none', color: 'white' }}>
                                Editar
                            </Link>
                        </div>

                        <button
                            className="btn btn-danger"
                            onClick={"#"}
                            style={{ margin: "1%" }}>
                            Borrar
                        </button>
                    </div>
                ) : (
                    <div>
                        <h4>Seleccione un plan</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaPlanesCliente;