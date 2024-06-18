import http from "../http-common";

class ClienteDataService {
  getAll() {
    return http.get("/clientes");
  }

  getAllClienteEstandar() {
    return http.get("/clientesestandar");
  }

  getAllClientePremium() {
    return http.get("/clientespremium");
  }

  get(ci) {
    return http.get(`/clientes/${ci}`);
  }

  createClienteEstandar(data) {
    return http.post("/agregarclienteestandar", data);
  }

  createClientePremium(data) {
    return http.post("/agregarclientepremium", data);
  }

  updateClienteEstandar(ci, data) {
    return http.put(`/modificarclienteestandar/${ci}`, data);
  }

  updateClientePremium(ci, data) {
    return http.put(`/modificarclientepremium/${ci}`, data);
  }

  deleteClienteEstandar(ci) {
    return http.delete(`/borrarclienteestandar/${ci}`);
  }

  deleteClientePremium(ci) {
    return http.delete(`/borrarclientepremium/${ci}`);
  }

  delete(ci){
    return http.delete(`/borrarcliente/${ci}`);
  }
}

export default new ClienteDataService();