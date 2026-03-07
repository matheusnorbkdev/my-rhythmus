import {Image, Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import {Button} from "@/Components/button"
import {Input} from "@/Components/Input"
import { Link } from "expo-router"
export default function Signup(){
        function handleSignIn(){
        Alert.alert("Login", "Função do cadasatro ainda está sendo criado")
        }
    return (
        <ScrollView>
                    <View style = {styles.container} >
                        <Image source={require("@/assets/init.png")}
                        style = {styles.illustration}
                        />
                        <Text style = {styles.title}>Cadastro</Text>
                        <Text style = {styles.subtitle}>Preencha os campos para realizar seu cadastro</Text>
                <View style = {styles.form}>
			<Input placeholder= "Nome" />
			<Input placeholder= "Sobrenome " />
                        <Input placeholder="E-mail" keyboardType="email-address" onChangeText = {(text) => console.log(text)} />
                        <Input placeholder="Senha" secureTextEntry/>
			<Input placeholder="Confirme sua senha" secureTextEntry/> 
                        <Button label ="Criar Conta" onPress={handleSignIn}/>
                </View>
                <Text style= {styles.footerText}>
                        Já tem uma conta?
                        <Link href ="/index"> Entre aqui! </Link>
                </Text>
        </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
        illustration: {
                flex : 1,
                width : "100%",
                height: 200,
                resizeMode : "contain",
                marginTop : 32,
        },
        container: {
        flex: 1,
        backgroundColor :"#FDFDFD",padding : 32,
        },
        title: {
        fontSize: 32,
        fontWeight: "900",
        textAlign : "center",
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
})

