import axios from "axios";
class UsuarioServices {
  async cadastrar(data) {
    return axios.post("https://naotem", data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
    } 
  async getNome() {
    return axios.get("https://naotem")
    .then(response => {
      return response.data.name;
    })
    .catch(error => {
      console.error(error);
    });
  }
  async getEmail() {
    return axios.get("https://naotem")
    .then(response => {
      return response.data.email;
    })
    .catch(error => {
      console.error(error);
    });
  }
  async getDataNascimento() {
    // Simulando a obtenção da data de nascimento
    return "15/05/1998";
  }
  async getAltura() {
    // Simulando a obtenção da altura
    return "175";
  }
  async getPeso() {
    // Simulando a obtenção do peso
    return "72";
  }
  async getSexo() {
    // Simulando a obtenção do sexo
    return "Masculino";
  }
}
const userService = new UsuarioServices();
export default userService;