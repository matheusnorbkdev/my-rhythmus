package dev.java10x.MyRhythmus.repository;

import dev.java10x.MyRhythmus.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository para operações de banco de dados com Usuario.
 * Spring Data JPA gera automaticamente a implementação em tempo de execução.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    /**
     * Busca usuário pelo username (único).
     * Retorna Optional para tratar caso não encontrado.
     * O Spring Data gera automaticamente a query: SELECT * FROM usuarios WHERE username = ?
     */
    Optional<Usuario> findByUsername(String username);
    
    /**
     * Verifica se já existe um usuário com o username informado.
     * Útil para validação de unicidade antes do cadastro.
     */
    boolean existsByUsername(String username);
}