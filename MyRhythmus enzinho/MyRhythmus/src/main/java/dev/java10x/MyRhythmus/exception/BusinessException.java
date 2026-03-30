package dev.java10x.MyRhythmus.exception;

/**
 * Exceção personalizada para erros de regras de negócio.
 * Usada quando uma operação viola as regras da aplicação.
 */
public class BusinessException extends RuntimeException {
    
    public BusinessException(String message) {
        super(message);
    }
    
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}