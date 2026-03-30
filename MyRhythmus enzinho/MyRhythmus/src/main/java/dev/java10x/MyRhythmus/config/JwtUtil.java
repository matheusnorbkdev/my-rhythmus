package dev.java10x.MyRhythmus.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

/**
 * Utilitário para gerenciamento de tokens JWT.
 * Responsável por criar, validar e extrair informações dos tokens.
 */
@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;  // Chave secreta para assinatura do token
    
    @Value("${jwt.expiration}")
    private Long expiration;  // Tempo de expiração em milissegundos
    
    /**
     * Cria a chave de assinatura a partir do secret.
     * Usa algoritmo HMAC-SHA256 que requer chave com pelo menos 32 bytes.
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    /**
     * Gera um token JWT para o username informado.
     * O token contém subject (username), data de criação e data de expiração.
     */
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);
        
        return Jwts.builder()
                .setSubject(username)           // Identificador do usuário
                .setIssuedAt(now)               // Data de emissão
                .setExpiration(expiryDate)      // Data de expiração
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)  // Assinatura
                .compact();
    }
    
    /**
     * Extrai o username (subject) do token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    /**
     * Extrai a data de expiração do token.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    /**
     * Método genérico para extrair qualquer claim do token.
     * Usa Function para permitir extração flexível de diferentes claims.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    /**
     * Extrai todos os claims do token.
     * Valida a assinatura durante o parsing.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    /**
     * Verifica se o token está expirado.
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    /**
     * Valida o token comparando o username e verificando se não expirou.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}