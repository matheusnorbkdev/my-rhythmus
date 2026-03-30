package dev.java10x.MyRhythmus.service;

import dev.java10x.MyRhythmus.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Implementação do UserDetailsService do Spring Security.
 * Responsável por carregar os dados do usuário durante a autenticação.
 */
@Service
public class AuthService implements UserDetailsService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    /**
     * Carrega o usuário pelo username.
     * Este método é chamado pelo Spring Security durante a autenticação.
     * 
     * @param username Nome de usuário para busca
     * @return UserDetails (nossa entidade Usuario)
     * @throws UsernameNotFoundException Se o usuário não for encontrado
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    }
}