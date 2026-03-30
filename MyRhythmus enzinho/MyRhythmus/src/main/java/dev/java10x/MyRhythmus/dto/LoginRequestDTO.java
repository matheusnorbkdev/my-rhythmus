package dev.java10x.MyRhythmus.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO para requisição de login.
 */
@Data
public class LoginRequestDTO {
    
    @NotBlank(message = "Nome de usuário é obrigatório")
    private String username;
    
    @NotBlank(message = "Senha é obrigatória")
    private String senha;
}