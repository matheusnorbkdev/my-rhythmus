import { Input } from "@/Components/Input"
import { Button } from "@/Components/button"
import Feather from '@expo/vector-icons/Feather'
import { Link, useRouter } from "expo-router"
import { useState } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
export default function Index(){
	const [senha, setSenha] = useState("")
	
	const [viewPassNormie, setViewPassNormie] = useState(true)
	const router = useRouter()
    return (
		<KeyboardAwareScrollView
  style={styles.container}
  enableOnAndroid={true}
  extraScrollHeight={20}
  keyboardShouldPersistTaps="handled"
>	
		{/*IMAGEM e configurações */}
		 <View>
			<Image source={require("@/assets/init.png")}
			style = {styles.illustration}
			/>
		{/*botão de entrar*/}	
				<Text style = {styles.title}>Entrar</Text>
				<Text style = {styles.subtitle}>Clique aqui para conseguir entrar em sua conta</Text>
			<View style = {styles.form}>
				<Input placeholder="E-mail" keyboardType="email-address" onChangeText = {(text) => console.log(text)} />
				{/* Parte da senha*/}
				<View style={styles.containerInPass}>
                        <Input
                            placeholder="Senha:"
                            secureTextEntry={viewPassNormie}
                            style={styles.inPass}
							value={senha}
							onChangeText={setSenha}
                        />
						{/* botão para mostrar/esconder senha */}
                        <Pressable style={styles.btnEyePass} onPress={() => setViewPassNormie(!viewPassNormie)}> {/* quando aperta serve para inverter o sinal de viewPassNormie*/}
                            <Feather
                                name={viewPassNormie ? "eye" : "eye-off"}
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    </View>
			{/* botão de entrar, aqui tem um onPress que é pra ir pra home, depois a gente muda isso pra ir pra tela de autenticação, mas por enquanto vamo deixar assim pra testar a home e o layout */}
			<Button label ="Entrar" onPress={() =>router.push("/tabs/home")}/>
		</View>
		{/* Link pro cadastro*/}
		<Text style= {styles.footerText}>
			Nao tem uma conta?
			<Link style = {styles.link} href="/signup"> Cadastre-se aqui! </Link> 
		</Text>
	</View>
	</KeyboardAwareScrollView>

    )
}
const styles = StyleSheet.create({
    //ilustration é a imagem do cadastro, tem um flex 1 pra ela ocupar todo o espaço disponivel, 
    // width 100% pra ela ocupar toda a largura da tela, height 200 pra deixar ela com uma altura fixa, 
    // resizeMode contain pra ela manter a proporção da imagem, marginTop 32 pra deixar um espacinho entre o topo da tela e a imagem
    illustration:{
        flex:1,
        width:"100%",
        height:200,
        resizeMode:"contain",
        marginTop: 32,
    },
    //container serve para deixar o fundo branco, e colocar um padding de 32 em toda a tela
    container:{
        flex:1,
        backgroundColor:"#FDFDFD",
        padding: 16,
    },
    //titulo
    title:{
        fontSize:32,
        fontWeight:"900",
        textAlign:"center",
    },
    //subtitulo
    subtitle:{
        fontSize:16,
    },
    //form serve para deixar os inputs do cadastro com um gap de 10, gap é a distancia entre os elementos, e marginTop 14 é pra deixar um espacinho entre o subtitulo e os inputs
    form:{
        marginTop:14,
        gap:10,
    },
    //texto do rodapé, tem um link pra ir pra tela de login, o link é do expo-router, e tem um estilo pra deixar ele azul e sublinhado
    footerText:{
        fontSize:14,
        textAlign:"center",
        marginTop:24,
        color:"#585860",
    },
    //serve para deixar o input de senha e o botão de mostrar senha alinhados, o flexDirection row é pra deixar eles na horizontal, e o alignItems center é pra deixar eles alinhados verticalmente
    containerInPass:{
        flexDirection:"row",
        alignItems:"center",
    },
    //deixa o botao do olho de senha 12 pra direita, 8 pra baixo, e deixa ele em cima do input de senha com o position absolute
    btnEyePass:{
        position:"absolute",
        right:12,
        marginBottom: 8,
    },
    // é pra fazer o input de senha ficar bonitinho, sem isso o input de senha fica gigante
    inPass:{
        flex:1,
    },
    //link
    link:{
        color:"#2772c9",
        textDecorationLine:"underline",
    }
})
