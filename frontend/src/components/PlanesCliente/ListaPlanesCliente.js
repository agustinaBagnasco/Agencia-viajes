import React, { useState, useEffect } from "react";
import PlanesClienteDataService from "../../services/planescliente.service";
import PlanDataService from "../../services/plan.service"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ListaPlanes = () => {
    const { id } = useParams();

    const [planes, setPlanes] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchPlan, setSearchPlan] = useState("");

    useEffect(() => {
        retrievePlanes();
    }, []);

    const retrievePlanes = () => {
        PlanesClienteDataService.get(id).then(response => {
            setPlanes(response.data);
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const setActivePlan = (plan, index) => {
        setCurrentPlan(plan);
        setCurrentIndex(index);
    }

    const buscarPlan = (e) => {
        if (e.target.value === "") {
            try {
                PlanDataService.get(id).then(response => {
                    setPlanes(response.data)
                });
            } catch (e) {
                console.log(e);
            }
        }
        const searchResult = planes.filter(plan => plan.destino.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchPlan(e.target.value);
        setPlanes(searchResult);
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
                    {planes && planes.map((plan, index) => (
                        <li
                            className={
                                "list-group-item" +
                                (index === currentIndex ? " active" : "")
                            }
                            onClick={() => setCurrentPlan(plan, index)}
                            key={index}
                            style={{ cursor: "pointer" }}>
                            {plan.destino} <strong>U$S</strong>{plan.precio}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                <br></br>
                {currentPlan ? (
                    <div style={{ border: '1px solid #C7C8C9', padding: '5px', borderRadius: '1%' }}>
                        <h4 style={{ margin: "1%" }}>{currentPlan.destino}</h4>
                        <div style={{ margin: "1%" }}>
                            <label>
                                <strong>Modalidad:</strong>
                            </label>{" "}
                            {currentPlan.modalidad}
                        </div>
                        <div style={{ margin: "1%" }}>
                            <label>
                                <strong>Fecha:</strong>
                            </label>{" "}
                            {currentPlan.fecha}
                        </div>
                        <div style={{ margin: "1%" }}>
                            <label>
                                <strong>Precio:</strong>
                            </label>{" "}
                            U$S{currentPlan.precio}
                        </div>

                        <div className="btn btn-primary" style={{ margin: "1%" }}>
                            <Link
                                to={"/planescliente/" + currentPlan.id} style={{ textDecoration: 'none', color: 'white' }}>
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

export default ListaPlanes;