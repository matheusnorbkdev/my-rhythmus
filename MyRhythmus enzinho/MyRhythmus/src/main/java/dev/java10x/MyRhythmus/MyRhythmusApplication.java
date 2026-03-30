package dev.java10x.MyRhythmus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal da aplicação Spring Boot.
 * 
 * @SpringBootApplication é uma combinação de:
 * - @Configuration: Define que a classe tem beans
 * - @EnableAutoConfiguration: Configura automaticamente com base nas dependências
 * - @ComponentScan: Escaneia componentes nos pacotes abaixo
 * 
 * Este é o ponto de entrada da aplicação My Rhythmus.
 * O método main() inicia o servidor embutido (Tomcat) e carrega todo o contexto.
 */
@SpringBootApplication
public class MyRhythmusApplication {

    /**
     * Método principal que inicia a aplicação Spring Boot.
     * 
     * @param args Argumentos de linha de comando (opcionais)
     */
    public static void main(String[] args) {
        // Inicia a aplicação Spring Boot com o servidor embutido (Tomcat)
        SpringApplication.run(MyRhythmusApplication.class, args);
    }

}