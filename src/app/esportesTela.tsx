import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
// Importamos os componentes básicos do celular
import { Image, Pressable, StyleSheet, Text, View, Alert } from "react-native";
// O ScrollView inteligente que sobe a tela quando o teclado abre
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Ícones (usaremos a setinha 'chevron')
import Feather from "@expo/vector-icons/Feather";
// Importação dos seus componentes customizados
import { Input } from "@/Components/Input";
import { useRouter } from "expo-router";

export default function EsportesTela() {
  const router = useRouter();
  // Criando as "caixinhas" de memória para cada campo
  const { nome, email, senha } = useLocalSearchParams();
  const esportes = useState([
    "Futebol",
    "Basquete",
    "Vôlei",
    "Tênis",
    "Natação",
    "Corrida",
    "Ciclismo",
    "Artes Marciais",
  ]);
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Esportes</Text>
      </View>
      <View style={styles.contentCard}>
        <View style={styles.form}>
          {/* Sports selection will go here */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // 1. O fundo de toda a página
  mainContainer: {
    flex: 1,
    backgroundColor: "#2E008B",
  },
  // 2. Área do topo onde fica o logo e a frase branca
  header: {
    alignItems: "center",
    height: 270, // Fixe uma altura para o topo roxo
    justifyContent: "center", // Centraliza o conteúdo dentro desses 250px
    paddingBottom: 40,
  },
  illustration: {
    width: "90%", // ou "90%"
    height: 200,
    resizeMode: "contain",
    // Se quiser que ela suba um pouco sem mexer no resto:
    marginTop: -20,
  },
  headerTitle: {
    fontSize: 28,
    color: "#FFF", // Texto branco sobre o roxo
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
  },
  // 3. O "Pulo do Gato": Este container branco sobe e arredonda só um lado
  contentCard: {
    flex: 1, // Faz o card ocupar o restante da tela
    backgroundColor: "#FFF", // Fundo branco
    borderTopRightRadius: 80, // Cria a curva acentuada no canto direito
    paddingHorizontal: 35,
    paddingTop: 40,
  },
  form: {
    gap: 15, // Espaçamento vertical automático entre os campos
  },
  label: {
    fontSize: 16,
    color: "#000000",
    marginBottom: -8, // Aproxima o texto do input abaixo dele
    marginLeft: 5,
  },
  // 4. Estilo dos inputs cinzas da imagem
  inputGray: {
    backgroundColor: "#BDBDBD", // Cor cinza de fundo
    borderRadius: 20, // Bordas bem redondas
    height: 45,
    paddingHorizontal: 15,
    borderWidth: 0, // Remove bordas laterais se houver
  },
  // 5. O seletor de Sexo (é um botão que parece um input)
  pickerFake: {
    backgroundColor: "#BDBDBD",
    height: 45,
    borderRadius: 20,
    flexDirection: "row", // Alinha texto e ícone lado a lado
    alignItems: "center",
    justifyContent: "space-between", // Joga o ícone para a ponta direita
    paddingHorizontal: 15,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
    paddingLeft: 4,
  },
  // 6. Alinha a seta de navegação no canto inferior direito
  nextButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    paddingBottom: 30,
  },
  secao : {
  width: "100%",
  height: 60,
  backgroundColor: "#2E008B",
  fontSize: 18,
  color: "#FFF",
  fontWeight: "600",
  borderRadius: 20,
  textAlign: "center",
  }
});