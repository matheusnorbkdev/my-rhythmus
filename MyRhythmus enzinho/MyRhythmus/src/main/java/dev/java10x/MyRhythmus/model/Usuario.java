package dev.java10x.MyRhythmus.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

/**
 * Entidade Usuario que representa um usuário do sistema.
 * Implementa UserDetails para integração nativa com Spring Security.
 */
@Entity
@Table(name = "usuarios")
@Data  // Lombok: gera getters, setters, toString, equals, hashCode
@NoArgsConstructor  // Construtor sem argumentos (JPA obrigatório)
@AllArgsConstructor  // Construtor com todos os argumentos
public class Usuario implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto incremento do banco
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)  // UNIQUE é essencial
    private String username;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(nullable = false)
    private String senha;  // NUNCA armazenar em texto puro! Sempre codificada
    
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;
    
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;
    
    @Column(name = "ultimo_login")
    private LocalDateTime ultimoLogin;
    
    @Column(name = "ativo")
    private boolean ativo = true;  // Soft delete - nunca remover registros fisicamente
    
    /**
     * Callback executado antes de persistir a entidade pela primeira vez.
     * Preenche automaticamente as datas de criação e atualização.
     */
    @PrePersist
    protected void onCreate() {
        dataCadastro = LocalDateTime.now();
        dataAtualizacao = LocalDateTime.now();
    }
    
    /**
     * Callback executado antes de atualizar a entidade.
     * Atualiza a data de modificação automaticamente.
     */
    @PreUpdate
    protected void onUpdate() {
        dataAtualizacao = LocalDateTime.now();
    }
    
    // ============================================
    // MÉTODOS DO SPRING SECURITY (UserDetails)
    // ============================================
    
    /**
     * Retorna as permissões/roles do usuário.
     * Por enquanto, sem roles definidas (sistema simples).
     * Para expansão futura, retornar lista de GrantedAuthority.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();  // Sem roles por enquanto
    }
    
    /**
     * Mapeia o campo senha para o Spring Security.
     * IMPORTANTE: O Spring Security espera o método getPassword()
     */
    @Override
    public String getPassword() {
        return this.senha;
    }
    
    /**
     * Mapeia o campo username para o Spring Security.
     */
    @Override
    public String getUsername() {
        return this.username;
    }
    
    /**
     * Indica se a conta não expirou.
     * Implementação simples - pode ser expandida para controle de expiração.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    /**
     * Indica se a conta não está bloqueada.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    /**
     * Indica se as credenciais não expiraram.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    /**
     * Indica se a conta está habilitada.
     * Usa o campo 'ativo' para soft delete.
     */
    @Override
    public boolean isEnabled() {
        return ativo;
    }
}