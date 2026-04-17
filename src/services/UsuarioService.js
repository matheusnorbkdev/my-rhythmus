import axios from "axios";
class UsuarioServices {
  async cadastrar(data) {
    return axios({
      url: "192.168.3.35 /api/usuario/cadastrar", 
      method: "POST",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "application/json"
      }
    }).then((response) => {
    return Promise.resolve(response);
    }).catch((error) => {
    return Promise.reject(error);  
      });
}
}
const userService = new UsuarioServices();
export default userService;