package dev.java10x.MyRhythmus.config;

import dev.java10x.MyRhythmus.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro que intercepta todas as requisições para validar o token JWT.
 * Executado uma vez por requisição (OncePerRequestFilter).
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AuthService authService;
    
    /**
     * Método principal do filtro que processa cada requisição.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) 
            throws ServletException, IOException {
        
        // 1. Extrai o header Authorization
        final String authHeader = request.getHeader("Authorization");
        
        // 2. Verifica se o header existe e está no formato correto
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);  // Continua sem autenticar
            return;
        }
        
        // 3. Extrai o token (remove o prefixo "Bearer ")
        final String jwt = authHeader.substring(7);
        
        // 4. Extrai o username do token
        final String username = jwtUtil.extractUsername(jwt);
        
        // 5. Se encontrou username e ainda não há autenticação no contexto
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 6. Carrega os dados do usuário do banco
            UserDetails userDetails = authService.loadUserByUsername(username);
            
            // 7. Valida o token com os dados do usuário
            if (jwtUtil.validateToken(jwt, userDetails)) {
                // 8. Cria objeto de autenticação com as permissões do usuário
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                // 9. Adiciona detalhes da requisição (IP, etc.)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 10. Coloca a autenticação no contexto do Spring Security
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // 11. Continua a cadeia de filtros
        filterChain.doFilter(request, response);
    }
}