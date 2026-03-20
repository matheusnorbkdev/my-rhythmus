import { Input } from "@/Components/Input"
import { Button } from "@/Components/button"
import Feather from '@expo/vector-icons/Feather'
import { Link } from "expo-router"
import { useState } from "react"
import {useRouter} from "expo-router"
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Index(){
	const [viewPassNormie, setViewPassNormie] = useState(true)
	const router = useRouter()
    return (
		<KeyboardAwareScrollView
  style={styles.container}
  enableOnAndroid={true}
  extraScrollHeight={20}
  keyboardShouldPersistTaps="handled"
>
		 <View>
			<Image source={require("@/assets/init.png")}
			style = {styles.illustration}
			/>
			<Text style = {styles.title}>Entrar</Text>
			<Text style = {styles.subtitle}>Clique aqui para conseguir entrar em sua conta</Text>
		<View style = {styles.form}>
			<Input placeholder="E-mail" keyboardType="email-address" onChangeText = {(text) => console.log(text)} />
			{/* */}
			<View style={styles.containerInPass}>
                        <Input
                            placeholder="Confirme sua senha"
                            secureTextEntry={viewPassNormie}
                            style={styles.inPass}
                        />

                        <Pressable style={styles.btnEyePass} onPress={() => setViewPassNormie(!viewPassNormie)}>
                            <Feather
                                name={viewPassNormie ? "eye" : "eye-off"}
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    </View>
			
			<Button label ="Entrar" onPress={() =>router.push("/tabs/home")}/>
		</View>
		<Text style= {styles.footerText}>
			Nao tem uma conta?
			<Link style = {styles.link} href="/signup"> Cadastre-se aqui! </Link> 
		</Text>
		{/* aqui tem um link para a home, parte de desenvolvedor, obviamente vamo tira depois, aqui nao tek mais, se nao erra saporra */}
	</View>
	</KeyboardAwareScrollView>

    )
}
const styles = StyleSheet.create({
	illustration: {
		flex : 1,
		width : "100%",
		height: 200,
		resizeMode : "contain",
		marginTop : 32,
		marginBottom : 22,
	},
	container: {
	flex: 1,
	backgroundColor : "#fff",
	padding : 32,
	},
	title: {
	fontSize: 32,
	fontWeight: "900",
	textAlign : "center",
	marginBottom : 8,	
	},
	subtitle: {
		fontSize: 16,
	},
	image: {
	width: "100%",
	height: "100%",
	resizeMode: "cover",
	},
	form: {
		marginTop : 24,
		gap: 12,
	},
	footerText: {
		fontSize: 14,
		textAlign: "center",
		marginTop: 24,
		color: "#585860",
	},
	link: {
		color: "#2772c9",
		textDecorationLine: "underline",
	},
	containerInPass: {
        flexDirection:"row",
        alignItems:"center",
    },

    btnEyePass:{
        position:"absolute",
        right:12,
    },

    inPass:{
        flex:1,
    },
})

