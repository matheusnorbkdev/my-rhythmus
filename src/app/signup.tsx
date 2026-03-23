import { Image, Alert, ScrollView, StyleSheet, Text, View, Pressable} from "react-native"
import { Button } from "@/Components/button"
import { Input } from "@/Components/Input"
import { Link } from "expo-router"
import Feather from '@expo/vector-icons/Feather'
import { useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function Signup(){

    const [viewPass, setViewPass] = useState(true)

    function onViewPass(){
        setViewPass(!viewPass)
    }

    function handleSignIn(){
        Alert.alert("Login", "Função do cadastro ainda está sendo criado")
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            >
            <View style={styles.container}>

                <Image
                    source={require("@/assets/init.png")}
                    style={styles.illustration}
                />

                <Text style={styles.title}>Cadastro</Text>
                <Text style={styles.subtitle}>
                    Preencha os campos para realizar seu cadastro
                </Text>

                <View style={styles.form}>

                    <Input placeholder="Nome" />
                    <Input placeholder="Sobrenome" />

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        onChangeText={(text) => console.log(text)}
                    />

                    {/* SENHA */}
                    <View style={styles.containerInPass}>
                        <Input
                            placeholder="Senha"
                            secureTextEntry={viewPass}
                            style={styles.inPass}
                        />

                        <Pressable style={styles.btnEyePass} onPress={onViewPass}>
                            <Feather
                                name={viewPass ? "eye" : "eye-off"}
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    </View>

                    {/* CONFIRMAR SENHA */}
                    <View style={styles.containerInPass}>
                        <Input
                            placeholder="Confirme sua senha"
                            secureTextEntry={viewPass}
                            style={styles.inPass}
                        />

                        <Pressable style={styles.btnEyePass} onPress={onViewPass}>
                            <Feather
                                name={viewPass ? "eye" : "eye-off"}
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    </View>

                    <Button
                        label="Criar Conta"
                        onPress={handleSignIn}
                    />

                </View>

                <Text style={styles.footerText}>
                    Já tem uma conta?
                    <Link style={styles.link} href={"/"}> Entre aqui! </Link>
                </Text>

            </View>
        </KeyboardAwareScrollView>
    );
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