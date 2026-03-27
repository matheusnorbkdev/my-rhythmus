package dev.java10x.MyRhythmus.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO para requisição de cadastro de usuário.
 * Separa a camada de API do modelo de domínio (Usuario).
 */
@Data
public class CadastroRequestDTO {
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "Nome de usuário é obrigatório")
    @Size(min = 3, max = 50, message = "Nome de usuário deve ter entre 3 e 50 caracteres")
    private String username;
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, max = 100, message = "Senha deve ter entre 6 e 100 caracteres")
    private String senha;
    
    @NotBlank(message = "Confirmação de senha é obrigatória")
    private String confirmarSenha;  // Campo adicional apenas para validação
}