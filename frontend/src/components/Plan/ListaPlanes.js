import React, { Component } from "react";
import PlanDataService from "../../services/plan.service";
import { Link } from "react-router-dom";

export default class ListaPlanes extends Component {
    constructor(props) {
        super(props);
        this.retrievePlan = this.retrievePlanes.bind(this);
        this.refreshLista = this.refreshLista.bind(this);
        this.buscarPlan = this.buscarPlan.bind(this);

        this.state = {
            planes: [],
            currentPlan: null,
            currentIndex: -1,
            buscarPlan: ""
        };
    }

    componentDidMount() {
        this.retrievePlanes();
    }

    retrievePlanes() {
        PlanDataService.getAll().then(response => {
            this.setState({
                planes: response.data
            });
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            })
    }

    refreshLista() {
        this.retrievePlan();
        this.setState({
            currentPlan: null,
            currentIndex: -1
        });
    }

    setActivePlan(plan, index) {
        this.setState({
            currentPlan: plan,
            currentIndex: index
        });
    }

    buscarPlan(e) {
        if (e.target.value === "") {
            PlanDataService.getAll().then(response => {
                this.setState({
                    buscarPlan: "",
                    planes: response.data
                });
                console.log(response.data);
            })
                .catch(e => {
                    console.log(e);
                })
        }
        const searchResult = this.state.planes.filter(plan => plan.destino.toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({
            buscarPlan: e.target.value,
            planes: searchResult
        })
    };

    deletePlan = () => {
        PlanDataService.delete(this.state.currentPlan.id)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            }).catch(e => {
                console.log(e);
            })
    }

    render() {
        const { buscarPlan, planes, currentPlan, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por destino"
                            value={buscarPlan}
                            onChange={this.buscarPlan}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Planes</h4>
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
                                onClick={() => this.setActivePlan(plan, index)}
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
                                    to={"/planes/" + currentPlan.id} style={{ textDecoration: 'none', color: 'white' }}>
                                    Editar
                                </Link>
                            </div>

                            <button
                                className="btn btn-danger"
                                onClick={this.deletePlan}
                                style={{ margin: "1%" }}>
                                Borrar
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={"#"}
                                style={{ margin: "1%" }}>
                                Comprar
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h4>Seleccione un plan</h4>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}