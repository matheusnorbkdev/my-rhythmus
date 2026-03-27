package dev.java10x.MyRhythmus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * (Data Transfer Objects)
 * DTO para resposta de autenticação (cadastro e login).
 * Contém o token JWT e informações básicas do usuário.
 */
@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;      // JWT para autenticação nas próximas requisições
    private String tipo;       // Tipo do token (Bearer)
    private String username;   // Nome de usuário
    private String nome;       // Nome completo
    private Long id;           // ID do usuário
}