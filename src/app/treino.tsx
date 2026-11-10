import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useRouter } from "expo-router";

import { alongamentos } from "@/data/alongamentos";
import { mobilidades } from "@/data/mobilidades";
import treinos from "@/data/treinos";

// Busca o exercício correspondente no catálogo
function buscarExercicio(exercicioTreino: any) {
    if (exercicioTreino.tipo === "alongamento") {
        return alongamentos.find(
            (exercicio) =>
                String(exercicio.id) === String(exercicioTreino.exercicioId)
        );
    }

    if (exercicioTreino.tipo === "mobilidade") {
        return mobilidades.find(
            (exercicio) =>
                String(exercicio.id) === String(exercicioTreino.exercicioId)
        );
    }

    return undefined;
}

export default function WorkoutScreen() {
    const router = useRouter();

    // Treino selecionado para teste
    const treinoAtual = treinos[0];

    const [isPlaying, setIsPlaying] = useState(false);
    const [indiceExercicio, setIndiceExercicio] = useState(0);

    // Exercício atual dentro do treino
    const exercicioTreino = treinoAtual.exercicios[indiceExercicio];

    // Informações completas do catálogo
    const exercicioAtual = buscarExercicio(exercicioTreino);

    // Configuração do cronômetro
    const TEMPO_TOTAL = exercicioTreino.duracao ?? 0;

    const [segundosRestantes, setSegundosRestantes] = useState(TEMPO_TOTAL);

    // Avançar para o próximo exercício
    function proximoExercicio() {
        if (indiceExercicio < treinoAtual.exercicios.length - 1) {
            setIndiceExercicio((prev: number) => prev + 1);
        } else {
            setIsPlaying(false);
            console.log("Treino concluído!");
        }
    }

    // Voltar para o exercício anterior
    function exercicioAnterior() {
        if (indiceExercicio > 0) {
            setIndiceExercicio((prev: number) => prev - 1);
        }
    }

    // Reiniciar cronômetro quando mudar de exercício
    useEffect(() => {
        setIsPlaying(false);
        setSegundosRestantes(TEMPO_TOTAL);
    }, [indiceExercicio, TEMPO_TOTAL]);

    // Cronômetro regressivo
    useEffect(() => {
        let intervalo: ReturnType<typeof setInterval> | null = null;

        if (isPlaying && segundosRestantes > 0) {
            intervalo = setInterval(() => {
                setSegundosRestantes((prev: number) => prev - 1);
            }, 1000);
        } else if (segundosRestantes === 0) {
            setIsPlaying(false);
        }

        return () => {
            if (intervalo) clearInterval(intervalo);
        };
    }, [isPlaying, segundosRestantes]);

    // Matemática do círculo de progresso
    const RAIO = 135;
    const CIRCUNFERENCIA = 2 * Math.PI * RAIO;

    const progresso = TEMPO_TOTAL > 0
        ? (TEMPO_TOTAL - segundosRestantes) / TEMPO_TOTAL
        : 0;

    const strokeDashoffset = CIRCUNFERENCIA * (1 - progresso);

    // Formatação do tempo
    function formatarTempo(segundos: number) {
        const mins = Math.floor(segundos / 60)
            .toString()
            .padStart(2, "0");

        const segs = (segundos % 60)
            .toString()
            .padStart(2, "0");

        return `${mins}:${segs}`;
    }

    // Reiniciar o exercício atual
    function reiniciarExercicio() {
        setIsPlaying(false);
        setSegundosRestantes(TEMPO_TOTAL);
    }

    return (
        <View style={styles.container}>

            {/* CABEÇALHO */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.push("/tabs/home")}
                    style={styles.closeButton}
                >
                    <Ionicons name="close" size={36} color="#FFF" />
                </Pressable>

                <Image
                    source={require("@/assets/logo menor.png")}
                    style={styles.logoTopo}
                />
            </View>

            {/* IMAGEM E CÍRCULO DE PROGRESSO */}
            <View style={styles.imageContainer}>
                <View style={styles.outerCircleContainer}>

                    <Svg
                        width={290}
                        height={290}
                        style={styles.svgAbsolute}
                    >
                        {/* Círculo de fundo */}
                        <Circle
                            cx={145}
                            cy={145}
                            r={RAIO}
                            stroke="#B0B0B0"
                            strokeWidth={15}
                            fill="none"
                        />

                        {/* Círculo progressivo */}
                        <Circle
                            cx={145}
                            cy={145}
                            r={RAIO}
                            stroke="#00D2FF"
                            strokeWidth={15}
                            fill="none"
                            strokeDasharray={CIRCUNFERENCIA}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            transform="rotate(-90 145 145)"
                        />
                    </Svg>

                    <View style={styles.innerCircle}>
                        {exercicioAtual?.imagemURL ? (
                            <Image
                                source={{ uri: exercicioAtual.imagemURL }}
                                style={styles.exerciseImage}
                            />
                        ) : (
                            <Text style={styles.imagePlaceholder}>
                                Sem imagem
                            </Text>
                        )}
                    </View>

                </View>
            </View>

            {/* INFORMAÇÕES DO EXERCÍCIO */}
            <View style={styles.infoContainer}>

                <Text style={styles.exerciseCounter}>
                    Exercício {indiceExercicio + 1} de{" "}
                    {treinoAtual.exercicios.length}
                </Text>

                <View style={styles.titleRow}>
                    <Text style={styles.exerciseTitle}>
                        {exercicioAtual?.nome ?? "Exercício não encontrado"}
                    </Text>

                    <Pressable
                        onPress={() => console.log(exercicioAtual)}
                    >
                        <View style={styles.infoIconCircle}>
                            <Text style={styles.infoIconText}>!</Text>
                        </View>
                    </Pressable>
                </View>

                <Text style={styles.xpText}>
                    {exercicioTreino.series} séries
                    {" • "}
                    {exercicioTreino.duracao
                        ? `${exercicioTreino.duracao} segundos`
                        : `${exercicioTreino.repeticoes} repetições`}
                </Text>

            </View>

            {/* CONTROLES E CRONÔMETRO */}
            <View style={styles.footer}>

                <Text style={styles.timerText}>
                    {formatarTempo(segundosRestantes)}
                </Text>

                <View style={styles.controlsRow}>

                    {/* Voltar */}
                    <Pressable
                        onPress={exercicioAnterior}
                        disabled={indiceExercicio === 0}
                        style={{
                            opacity: indiceExercicio === 0 ? 0.4 : 1,
                        }}
                    >
                        <Feather
                            name="skip-back"
                            size={40}
                            color="#FFF"
                        />
                    </Pressable>

                    {/* Play / Pause */}
                    <Pressable
                        onPress={() => setIsPlaying(!isPlaying)}
                        style={styles.playPauseBtn}
                        disabled={TEMPO_TOTAL === 0 || segundosRestantes === 0}
                    >
                        <Feather
                            name={isPlaying ? "pause" : "play"}
                            size={50}
                            color="#FFF"
                        />
                    </Pressable>

                    {/* Avançar */}
                    <Pressable onPress={proximoExercicio}>
                        <Feather
                            name="skip-forward"
                            size={40}
                            color="#FFF"
                        />
                    </Pressable>

                </View>

                {/* Reiniciar cronômetro */}
                <Pressable
                    onPress={reiniciarExercicio}
                    style={styles.restartButton}
                >
                    <Text style={styles.restartText}>
                        Reiniciar exercício
                    </Text>
                </Pressable>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A0066",
        paddingHorizontal: 24,
        paddingTop: 50,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 80,
        position: "relative",
    },

    closeButton: {
        zIndex: 10,
    },

    logoTopo: {
        position: "absolute",
        right: -10,
        top: 5,
        width: 80,
        height: 70,
        resizeMode: "contain",
    },

    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    outerCircleContainer: {
        width: 290,
        height: 290,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    svgAbsolute: {
        position: "absolute",
        top: 0,
        left: 0,
    },

    innerCircle: {
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    exerciseImage: {
        width: "80%",
        height: "80%",
        resizeMode: "contain",
    },

    imagePlaceholder: {
        color: "#666",
        fontSize: 16,
    },

    infoContainer: {
        alignItems: "center",
        marginBottom: 40,
    },

    exerciseCounter: {
        color: "#D0D0D0",
        fontSize: 14,
        marginBottom: 10,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    exerciseTitle: {
        fontSize: 28,
        color: "#FFF",
        fontWeight: "500",
        textAlign: "center",
        flexShrink: 1,
    },

    infoIconCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    infoIconText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 14,
    },

    xpText: {
        fontSize: 14,
        color: "#D0D0D0",
        marginTop: 8,
        fontWeight: "600",
        letterSpacing: 1,
    },

    footer: {
        alignItems: "center",
        paddingBottom: 40,
    },

    timerText: {
        fontSize: 48,
        color: "#FFF",
        fontWeight: "300",
        marginBottom: 15,
    },

    controlsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },

    playPauseBtn: {
        marginHorizontal: 10,
    },

    restartButton: {
        marginTop: 20,
    },

    restartText: {
        color: "#D0D0D0",
        fontSize: 13,
    },
});
