import Treino from "@/models/treino";
import ExercicioTreino from "@/models/ExercicioTreino";

function criarTreino(id, nome, descricao, esporte, dificuldade, objetivo, itens) {
    const exercicios = itens.map(([tipo, exercicioId, series, repeticoes, duracao]) =>
        new ExercicioTreino(
            `${id}-${tipo}-${exercicioId}`,
            exercicioId,
            tipo,
            0,
            series,
            repeticoes,
            duracao ?? 30,
            15
        )
    );

    exercicios.forEach((exercicio, indice) => {
        exercicio.ordem = indice + 1;
    });

    return new Treino(id, nome, descricao, esporte, dificuldade, objetivo, exercicios);
}

// Os exercícios são referenciados pelo ID do catálogo de mobilidades ou alongamentos.
// Cada item segue: [tipo, id do exercício, séries, repetições, duração em segundos].
const treinos = [
    criarTreino(1, "Flexibilidade", "Rotina para soltar e alongar as pernas.", "geral", "iniciante", "flexibilidade", [
        ["mobilidade", 1, 2, 10, null],
        ["mobilidade", 3, 2, 8, null],
        ["alongamento", 1, 2, null, 30],
        ["alongamento", 7, 2, null, 30],
        ["alongamento", 9, 2, null, 30],
        ["alongamento", 10, 2, null, 30],
    ]),
    criarTreino(2, "Abertura Zero", "Sequência progressiva para quadril e parte interna das pernas.", "geral", "intermediario", "flexibilidade", [
        ["mobilidade", 2, 2, 8, null],
        ["mobilidade", 3, 2, 8, null],
        ["mobilidade", 5, 2, 10, null],
        ["alongamento", 12, 2, null, 30],
        ["alongamento", 10, 2, null, 30],
        ["alongamento", 8, 2, null, 30],
    ]),
    criarTreino(3, "Coluna Alinhada", "Movimentos suaves para mobilizar e alongar as costas.", "geral", "iniciante", "postura", [
        ["mobilidade", 13, 2, 8, null],
        ["mobilidade", 14, 2, 10, null],
        ["alongamento", 16, 2, null, 30],
        ["alongamento", 17, 2, null, 30],
        ["alongamento", 18, 2, null, 30],
        ["alongamento", 19, 2, null, 30],
    ]),
    criarTreino(4, "Alongar ao Acordar", "Uma rotina curta para começar o dia em movimento.", "geral", "iniciante", "mobilidade", [
        ["mobilidade", 1, 2, 10, null],
        ["mobilidade", 7, 2, 10, null],
        ["mobilidade", 14, 2, 10, null],
        ["alongamento", 4, 2, null, 25],
        ["alongamento", 3, 2, null, 25],
    ]),
    criarTreino(5, "Pausa no Trabalho", "Alívio leve para pescoço, braços e punhos.", "geral", "iniciante", "relaxamento", [
        ["alongamento", 2, 2, null, 20],
        ["alongamento", 3, 2, null, 25],
        ["alongamento", 14, 2, null, 25],
        ["alongamento", 15, 2, null, 25],
        ["alongamento", 20, 2, null, 20],
        ["mobilidade", 16, 2, 10, null],
        ["mobilidade", 17, 2, 10, null],
    ]),
    criarTreino(6, "Relaxante Noturno", "Alongamentos tranquilos para desacelerar no fim do dia.", "geral", "iniciante", "relaxamento", [
        ["alongamento", 17, 2, null, 40],
        ["alongamento", 11, 2, null, 30],
        ["alongamento", 18, 2, null, 30],
        ["alongamento", 20, 2, null, 20],
        ["alongamento", 19, 2, null, 30],
    ]),
    criarTreino(7, "Alívio Lombar", "Mobilidade e alongamentos suaves para a região das costas.", "geral", "iniciante", "relaxamento", [
        ["mobilidade", 14, 2, 10, null],
        ["alongamento", 17, 2, null, 35],
        ["alongamento", 18, 2, null, 30],
        ["alongamento", 11, 2, null, 30],
        ["alongamento", 19, 2, null, 30],
    ]),
    criarTreino(8, "Pescoço e Ombros", "Movimentos leves para a parte superior do corpo.", "geral", "iniciante", "mobilidade", [
        ["mobilidade", 9, 2, 10, null],
        ["mobilidade", 11, 2, 8, null],
        ["alongamento", 20, 2, null, 20],
        ["alongamento", 3, 2, null, 25],
        ["alongamento", 13, 2, null, 25],
    ]),
    criarTreino(9, "Mãos e Punhos", "Rotina curta para movimentar punhos e antebraços.", "geral", "iniciante", "mobilidade", [
        ["mobilidade", 16, 2, 10, null],
        ["mobilidade", 17, 2, 10, null],
        ["alongamento", 15, 2, null, 25],
    ]),
];

export default treinos;
