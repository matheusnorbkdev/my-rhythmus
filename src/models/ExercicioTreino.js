export default class ExercicioTreino {
    constructor(
        id,
        exercicioId,
        tipo,
        ordem,
        series,
        repeticoes,
        duracao,
        descanso
    ) {
        this.id = id;
        this.exercicioId = exercicioId;
        this.tipo = tipo;
        this.ordem = ordem;
        this.series = series;
        this.repeticoes = repeticoes;
        this.duracao = duracao;
        this.descanso = descanso;
    }
}
