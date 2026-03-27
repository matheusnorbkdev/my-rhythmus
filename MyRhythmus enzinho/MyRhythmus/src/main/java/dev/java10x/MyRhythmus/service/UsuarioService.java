package dev.java10x.MyRhythmus.service;

import dev.java10x.MyRhythmus.dto.CadastroRequestDTO;
import dev.java10x.MyRhythmus.dto.AuthResponseDTO;
import dev.java10x.MyRhythmus.config.JwtUtil;
import dev.java10x.MyRhythmus.exception.BusinessException;
import dev.java10x.MyRhythmus.model.Usuario;
import dev.java10x.MyRhythmus.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Serviço com a lógica de negócio relacionada a usuários.
 * Gerencia cadastro, login e operações com usuários.
 */
@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;  // Para codificar senhas
    
    @Autowired
    private JwtUtil jwtUtil;  // Para gerar tokens
    
    /**
     * Realiza o cadastro de um novo usuário.
     * 
     * @param request DTO com dados do cadastro
     * @return AuthResponseDTO com token e dados do usuário
     * @throws BusinessException Se houver violação de regras de negócio
     */
    @Transactional  // Garante atomicidade: tudo ou nada
    public AuthResponseDTO cadastrar(CadastroRequestDTO request) {
        // Validação de negócio: senhas devem coincidir
        if (!request.getSenha().equals(request.getConfirmarSenha())) {
            throw new BusinessException("As senhas não coincidem");
        }
        
        // Validação de negócio: username deve ser único
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new BusinessException("Nome de usuário já está em uso");
        }
        
        // Criação da entidade
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setUsername(request.getUsername());
        
        // ⚠️ CRÍTICO: NUNCA armazenar senha em texto puro!
        // Usa BCrypt para codificar a senha antes de salvar
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setAtivo(true);
        
        // Persiste no banco
        usuario = usuarioRepository.save(usuario);
        
        // Gera token JWT para o usuário recém-criado
        String token = jwtUtil.generateToken(usuario.getUsername());
        
        // Retorna resposta com token e dados
        return new AuthResponseDTO(
            token,
            "Bearer",
            usuario.getUsername(),
            usuario.getNome(),
            usuario.getId()
        );
    }
    
    /**
     * Realiza o login do usuário.
     * 
     * @param username Nome de usuário
     * @param senha Senha em texto puro (será comparada com a codificada)
     * @return AuthResponseDTO com token e dados do usuário
     * @throws BusinessException Se credenciais inválidas
     */
    @Transactional
    public AuthResponseDTO login(String username, String senha) {
        // Busca o usuário pelo username
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException("Usuário ou senha inválidos"));
        
        // Verifica a senha (compara texto puro com hash armazenado)
        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new BusinessException("Usuário ou senha inválidos");
        }
        
        // Verifica se o usuário está ativo
        if (!usuario.isAtivo()) {
            throw new BusinessException("Usuário está desativado");
        }
        
        // Atualiza data do último login
        usuario.setUltimoLogin(LocalDateTime.now());
        usuarioRepository.save(usuario);
        
        // Gera novo token JWT
        String token = jwtUtil.generateToken(usuario.getUsername());
        
        return new AuthResponseDTO(
            token,
            "Bearer",
            usuario.getUsername(),
            usuario.getNome(),
            usuario.getId()
        );
    }
}