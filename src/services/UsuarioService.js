import api from "@/services/api";
class UsuarioServices {
  async login(email, senha){
    try{
      const response = await api.post("/login", {email, senha});
      return response.data;  
    }catch(error){
      console.log("erro no login" , error.response.data)
    }

  }
  async cadastrar(data) {
    return api.post("/cadastrar", data)
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
