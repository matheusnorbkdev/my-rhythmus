import {View, StyleSheet, ScrollView, Image, Text} from "react-native"
import {Button} from "@/Components/button"
import {Input} from "@/Components/Input"
import { Link } from "expo-router"
import userService from "@/services/UsuarioService"
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function home(){
	return(
    <KeyboardAwareScrollView
      // O estilo principal define o fundo roxo da tela inteira
      style={styles.mainContainer}
      // Garante que o conteúdo estique se a tela for pequena
      contentContainerStyle={{ flexGrow: 1 }}
      // Desativa o efeito de "mola" no topo para a cor não descolar
      bounces={false}
    >
      {/* --- CABEÇALHO (PARTE ROXA) --- */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/logo.png")}
          style={styles.illustration}
        />
        <Text style={styles.headerTitle}>Olá {/*userService.getNome()*/}, Qual treino deseja realizar?</Text>
      </View>

      {/* --- CORPO (CARD BRANCO) --- */}
      {/* Este View é o que cria o efeito de "folha de papel" por cima do roxo */}
	  <View style={styles.contentCard}>
        <View style={styles.form}>
          <View style={styles.listinhaDostreinos}>
            <Link href="/treino" style={styles.treinos}>
              <Text style={styles.textinho}>Treino 1</Text>

            </Link>
          </View>
        </View>
      </View>

    </KeyboardAwareScrollView>
	)	
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	listinhaDostreinos:{
		display: "flex",
		flexDirection: "row",
		width: "120%",
		marginTop: 100,
		padding: 10,
		borderRadius: 10,
	},
	treinos: {
		backgroundColor: "#2E008B",
		padding: 5,
		borderRadius: 10,
		height: 100,
		width: 150,
		alignItems: "center",
		marginBottom: 20,
		marginLeft: 20,
	},
	textinho:{
		color: "#fff",
	},
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
});
