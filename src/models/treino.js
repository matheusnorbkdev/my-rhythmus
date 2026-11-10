export default class Treino {
    constructor(
        id,
        nome,
        descricao,
        esporte,
        dificuldade,
        objetivo,
        exercicios = []
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.esporte = esporte;
        this.dificuldade = dificuldade;
        this.objetivo = objetivo;
        this.exercicios = exercicios;
    }
}