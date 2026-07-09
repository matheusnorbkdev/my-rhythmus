import api from "./api"; // Caminho de importação corrigido
import axios from "axios"; // Importar axios para getNome e getEmail, se necessário

class UsuarioServices {
  async login(email, senha) {
    try {
      const response = await api.post("/auth/login", { email, senha });
      return response.data;
    } catch (error) {
      console.error("Erro no login:", error.response ? error.response.data : error.message);
      throw error; // Re-lançar o erro para que o chamador possa tratá-lo
    }
  }

  async cadastrar(data) {
    try {
      const response = await api.post("/cadastrar", data);
      return response.data;
    } catch (error) {
      console.error("Erro no cadastro:", error.response ? error.response.data : error.message);
      throw error; 
    }
  }

  async getNome() {
    try {
      // Assumindo que 'api' deve ser usado para endpoints internos
      // Se for um endpoint externo diferente, um novo axios.create pode ser necessário
      const response = await api.get("/nome"); // Usando a instância 'api' e um endpoint relativo
      return response.data.name;
    } catch (error) {
      console.error("Erro ao obter nome:", error.response ? error.response.data : error.message);
      throw error; // Re-lançar o erro
    }
  }

  async getEmail() {
    try {
      // Assumindo que 'api' deve ser usado para endpoints internos
      const response = await api.get("/email"); // Usando a instância 'api' e um endpoint relativo
      return response.data.email;
    } catch (error) {
      console.error("Erro ao obter email:", error.response ? error.response.data : error.message);
      throw error; // Re-lançar o erro
    }
  }

  async getDataNascimento() {
    // Simulando a obtenção da data de nascimento - Retorna um valor fixo
    return "15/05/1998";
  }

  async getAltura() {
    // Simulando a obtenção da altura - Retorna um valor fixo
    return "175";
  }

  async getPeso() {
    // Simulando a obtenção do peso - Retorna um valor fixo
    return "72";
  }

  async getSexo() {
    // Simulando a obtenção do sexo - Retorna um valor fixo
    return "Masculino";
  }
 
}

const userService = new UsuarioServices();
export default userService;