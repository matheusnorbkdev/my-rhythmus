export default class ExercicioTreino {
    constructor(
        id,
        exercicioId,
        tipo,
        ordem,
        repeticoes,
        duracao,
        descanso
    ) {
        this.id = id;
        this.exercicioId = exercicioId;
        this.tipo = tipo;
        this.ordem = ordem;
        this.repeticoes = repeticoes;
        this.duracao = duracao;
        this.descanso = descanso;
    }
}