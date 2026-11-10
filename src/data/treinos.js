import Treino from "@/models/treino";
import ExercicioTreino from "@/models/ExercicioTreino";

const treinoTeste = new Treino(
    1, // id
    "Mobilidade para membros inferiores",
    "Treino de mobilidade e alongamento para preparar as pernas.",
    "geral", // esporte
    "mobilidade", // objetivo
    "iniciante", // dificuldade
    "administrador", // origem
    "publico", // visibilidade
    [
        new ExercicioTreino(
            1, // id da associação
            1, // id do exercício no catálogo
            "mobilidade",
            1, // ordem
            2, // séries
            10, // repetições
            null, // duração
            15 // descanso em segundos
        ),

        new ExercicioTreino(
            2,
            1,
            "alongamento",
            2,
            2,
            null,
            30, // duração em segundos
            15
        ),

        new ExercicioTreino(
            3,
            7,
            "mobilidade",
            3,
            2,
            10,
            null,
            15
        ),

        new ExercicioTreino(
            4,
            10,
            "alongamento",
            4,
            2,
            null,
            30,
            15
        )
    ]
);

const treinos = [
    treinoTeste
];

export default treinos;
