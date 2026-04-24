import axios from "axios";
class UsuarioServices {
  async cadastrar(data) {
    return axios.post("https://jsonplaceholder.typicode.com/users", data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
    } 
  async getNome() {
    return axios.get("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
      return response.data.name;
    })
    .catch(error => {
      console.error(error);
    });
  }
}
const userService = new UsuarioServices();
export default userService;