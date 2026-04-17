class UsuarioServices {
  async cadastrar(data) {
    let response = {
      mensagem: "Usuário cadastrado com sucesso!"
    };
    return response;
  }
}

const userService = new UsuarioServices();
export default userService;