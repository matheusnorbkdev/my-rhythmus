package dev.java10x.MyRhythmus.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuração de segurança da aplicação.
 * Define política de autenticação stateless com JWT.
 */
@Configuration
@EnableWebSecurity  // Habilita o Spring Security na aplicação
public class SecurityConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    /**
     * Configura a cadeia de filtros de segurança.
     * Define quais endpoints são públicos e quais exigem autenticação.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Desabilita CSRF pois a API é stateless e não usa cookies de sessão
            .csrf(csrf -> csrf.disable())
            
            // Configura política de sessão como STATELESS
            // IMPORTANTE: O Spring não vai criar nem usar sessões HTTP
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Configura autorização dos endpoints
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos - qualquer um pode acessar
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()  // Apenas para desenvolvimento
                // Qualquer outra requisição exige autenticação
                .anyRequest().authenticated()
            )
            // Adiciona nosso filtro JWT antes do filtro padrão do Spring Security
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        // Permite iframes para o console H2 (apenas desenvolvimento)
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));
        
        return http.build();
    }
    
    /**
     * Bean para codificação de senhas.
     * BCrypt é um algoritmo de hash com salt, seguro para senhas.
     * Nunca usar MD5 ou SHA1 para senhas!
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    /**
     * Bean do AuthenticationManager gerenciado pelo Spring.
     * Responsável por processar a autenticação.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}