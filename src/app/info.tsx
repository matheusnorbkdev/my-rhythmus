import React from "react";
// Importamos os componentes básicos do celular
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// O ScrollView inteligente que sobe a tela quando o teclado abre
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Ícones (usaremos a setinha 'chevron')
import Feather from "@expo/vector-icons/Feather";
// Importação dos seus componentes customizados
import { Input } from "@/Components/Input";
import { useRouter } from "expo-router";

export default function Info() {
  const router = useRouter();

  return (
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
          source={require("@/assets/init.png")}
          style={styles.illustration}
        />
        <Text style={styles.headerTitle}>Insira suas informações</Text>
      </View>

      {/* --- CORPO (CARD BRANCO) --- */}
      {/* Este View é o que cria o efeito de "folha de papel" por cima do roxo */}
      <View style={styles.contentCard}>
        <View style={styles.form}>
          {/* Campo: Data */}
          <Text style={styles.label}>Data de nascimento:</Text>
          <Input
            placeholder="xx/xx/xxxx"
            keyboardType="numeric"
            style={styles.inputGray} // Estilo cinza arredondado
          />

          {/* Campo: Sexo (Simulado) */}
          <Text style={styles.label}>Qual seu sexo?</Text>
          <View style={styles.pickerFake}>
            <Text style={styles.pickerText}>Sexo</Text>
            {/* Ícone de seta para baixo igual ao da sua foto */}
            <Feather name="chevron-down" size={28} color="#606060" />
          </View>

          {/* Campo: Altura */}
          <Text style={styles.label}>Qual sua altura?</Text>
          <Input
            placeholder="Altura (em cm)"
            keyboardType="numeric"
            style={styles.inputGray}
          />

          {/* Campo: Peso */}
          <Text style={styles.label}>Qual seu peso?</Text>
          <Input
            placeholder="Peso (em kg)"
            keyboardType="numeric"
            style={styles.inputGray}
          />

          {/* --- BOTÃO DE PRÓXIMO --- */}
          {/* Na imagem, o botão é apenas uma seta preta no canto */}
          <Pressable
            style={styles.nextButton}
            onPress={() => router.push("/tabs/home")}
          >
            <Feather name="chevron-right" size={50} color="black" />
          </Pressable>
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
    paddingTop: 50,
    paddingBottom: 30,
  },
  illustration: {
    width: "70%",
    height: 120,
    resizeMode: "contain",
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
    color: "#161a18",
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
  },
  // 6. Alinha a seta de navegação no canto inferior direito
  nextButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    paddingBottom: 30,
  },
});
