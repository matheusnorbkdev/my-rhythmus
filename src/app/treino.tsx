import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useLocalSearchParams, useRouter } from "expo-router";

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
    const { treinoId } = useLocalSearchParams<{ treinoId?: string }>();

    const treinoAtual = treinos.find((treino) => String(treino.id) === String(treinoId)) ?? treinos[0];
    const exerciciosOrdenados = [...treinoAtual.exercicios].sort((a, b) => a.ordem - b.ordem);

    const [isPlaying, setIsPlaying] = useState(false);
    const [indiceExercicio, setIndiceExercicio] = useState(0);
    const [treinoConcluido, setTreinoConcluido] = useState(false);
    const [listaExpandida, setListaExpandida] = useState(false);

    // Exercício atual dentro do treino
    const exercicioTreino = exerciciosOrdenados[indiceExercicio];

    // Informações completas do catálogo
    const exercicioAtual = buscarExercicio(exercicioTreino);

    // Configuração do cronômetro
    const TEMPO_TOTAL = exercicioTreino.duracao ?? 0;

    const [segundosRestantes, setSegundosRestantes] = useState(TEMPO_TOTAL);

    useEffect(() => {
        setIndiceExercicio(0);
        setIsPlaying(false);
        setTreinoConcluido(false);
        setListaExpandida(false);
        setSegundosRestantes(treinoAtual.exercicios[0]?.duracao ?? 0);
    }, [treinoId]);

    // Avançar para o próximo exercício
    function proximoExercicio() {
        if (indiceExercicio < exerciciosOrdenados.length - 1) {
            setTreinoConcluido(false);
            setIndiceExercicio((prev: number) => prev + 1);
        } else {
            setIsPlaying(false);
            setTreinoConcluido(true);
            Alert.alert("Treino concluído!", `Você finalizou ${treinoAtual.nome}.`, [
                { text: "Voltar ao início", onPress: () => router.push("/tabs/home") },
                { text: "Ficar nesta tela", style: "cancel" },
            ]);
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
        <ScrollView contentContainerStyle={styles.container}>

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

            <Text style={styles.workoutTitle}>{treinoAtual.nome}</Text>
            <Text style={styles.workoutDescription}>{treinoAtual.descricao}</Text>

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
                                source={
                                    typeof exercicioAtual.imagemURL === "string"
                                        ? { uri: exercicioAtual.imagemURL }
                                        : exercicioAtual.imagemURL
                                }
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
                    {exerciciosOrdenados.length}
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
                    {exercicioTreino.repeticoes
                        ? ` • ${exercicioTreino.repeticoes} repetições`
                        : ""}
                    {` • ${formatarTempo(TEMPO_TOTAL)}`}
                </Text>

            </View>

            {/* CONTROLES E CRONÔMETRO */}
            <View style={styles.footer}>

                {TEMPO_TOTAL > 0 ? (
                    <Text style={styles.timerText}>{formatarTempo(segundosRestantes)}</Text>
                ) : (
                    <Text style={styles.timerHint}>Complete as repetições no seu ritmo</Text>
                )}

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

                <Pressable onPress={proximoExercicio} style={styles.doneButton}>
                    <Feather name="check" size={20} color="#2E008B" />
                    <Text style={styles.doneButtonText}>
                        {indiceExercicio === exerciciosOrdenados.length - 1
                            ? "Finalizar treino"
                            : "Marcar exercício como pronto"}
                    </Text>
                </Pressable>

                {/* Reiniciar cronômetro */}
                {TEMPO_TOTAL > 0 && (
                    <Pressable onPress={reiniciarExercicio} style={styles.restartButton}>
                        <Text style={styles.restartText}>Reiniciar cronômetro</Text>
                    </Pressable>
                )}

            </View>

            <View style={styles.exerciseList}>
                <Pressable
                    onPress={() => setListaExpandida((aberta) => !aberta)}
                    style={styles.listToggle}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: listaExpandida }}
                >
                    <View>
                        <Text style={styles.listTitle}>Exercícios do treino</Text>
                        <Text style={styles.listSubtitle}>
                            {listaExpandida ? "Toque para ocultar" : `${exerciciosOrdenados.length} exercícios • Toque para ver`}
                        </Text>
                    </View>
                    <Feather name={listaExpandida ? "chevron-up" : "chevron-down"} size={24} color="#2E008B" />
                </Pressable>
                {listaExpandida && (
                    <View style={styles.exerciseListContent}>
                        {exerciciosOrdenados.map((item, indice) => {
                            const exercicio = buscarExercicio(item);
                            const atual = indice === indiceExercicio;
                            const concluido = indice < indiceExercicio || (treinoConcluido && atual);
                            return (
                                <Pressable
                                    key={item.id}
                                    onPress={() => {
                                        setTreinoConcluido(false);
                                        setIndiceExercicio(indice);
                                    }}
                                    style={[styles.exerciseListItem, atual && styles.exerciseListItemActive]}
                                >
                                    <Text style={[styles.listNumber, atual && styles.listTextActive]}>
                                        {concluido ? "✓" : `${indice + 1}.`}
                                    </Text>
                                    <Text style={[styles.listExerciseName, atual && styles.listTextActive]}>
                                        {exercicio?.nome ?? "Exercício não encontrado"}
                                    </Text>
                                    <Text style={[styles.listDose, atual && styles.listTextActive]}>
                                        {item.repeticoes ? `${item.repeticoes} reps • ` : ""}{formatarTempo(item.duracao)}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                )}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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

    workoutTitle: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 4,
    },

    workoutDescription: {
        color: "#D0D0D0",
        fontSize: 13,
        textAlign: "center",
        marginTop: 4,
        marginBottom: 8,
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

    exerciseList: {
        backgroundColor: "#FFF",
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginBottom: 18,
    },

    listToggle: {
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    listSubtitle: {
        color: "#666",
        fontSize: 12,
        marginTop: 2,
    },

    exerciseListContent: {
        paddingBottom: 6,
    },

    listTitle: {
        color: "#2E008B",
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 8,
    },

    exerciseListItem: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        borderRadius: 10,
    },

    exerciseListItemActive: {
        backgroundColor: "#2E008B",
    },

    listNumber: {
        color: "#555",
        width: 30,
        fontWeight: "700",
    },

    listExerciseName: {
        color: "#333",
        flex: 1,
        fontSize: 13,
    },

    listDose: {
        color: "#666",
        fontSize: 12,
        marginLeft: 6,
    },

    listTextActive: {
        color: "#FFF",
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

    timerHint: {
        fontSize: 15,
        color: "#FFF",
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

    doneButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: 18,
        gap: 8,
    },

    doneButtonText: {
        color: "#2E008B",
        fontSize: 15,
        fontWeight: "700",
    },

    restartText: {
        color: "#D0D0D0",
        fontSize: 13,
    },
});
