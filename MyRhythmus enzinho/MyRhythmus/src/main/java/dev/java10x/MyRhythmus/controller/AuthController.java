package dev.java10x.MyRhythmus.controller;

import dev.java10x.MyRhythmus.dto.CadastroRequestDTO;
import dev.java10x.MyRhythmus.dto.LoginRequestDTO;
import dev.java10x.MyRhythmus.dto.AuthResponseDTO;
import dev.java10x.MyRhythmus.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller responsável pelos endpoints de autenticação.
 * Endpoints: /api/auth/cadastro e /api/auth/login
 */
@RestController
@RequestMapping("/api/auth")  // Base path para todos os endpoints deste controller
@CrossOrigin(origins = "*")  // Permite requisições de qualquer origem (CORS)
public class AuthController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    /**
     * Endpoint para cadastro de novos usuários.
     * 
     * @param request DTO com dados do cadastro (validado automaticamente)
     * @return AuthResponseDTO com token JWT e dados do usuário
     */
    @PostMapping("/cadastro")
    public ResponseEntity<AuthResponseDTO> cadastrar(@Valid @RequestBody CadastroRequestDTO request) {
        AuthResponseDTO response = usuarioService.cadastrar(request);
        return ResponseEntity.ok(response);
    }
    
    /**
     * Endpoint para login de usuários.
     * 
     * @param request DTO com username e senha
     * @return AuthResponseDTO com token JWT e dados do usuário
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        AuthResponseDTO response = usuarioService.login(request.getUsername(), request.getSenha());
        return ResponseEntity.ok(response);
    }
}