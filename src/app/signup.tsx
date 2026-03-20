import { Image, Alert, ScrollView, StyleSheet, Text, View, Pressable, K} from "react-native"
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

    illustration:{
        flex:1,
        width:"100%",
        height:200,
        resizeMode:"contain",
        marginTop: 32,
    },

    container:{
        flex:1,
        backgroundColor:"#FDFDFD",
        padding: 16,
    },

    title:{
        fontSize:32,
        fontWeight:"900",
        textAlign:"center",
    },

    subtitle:{
        fontSize:16,
    },

    form:{
        marginTop:14,
        gap:10,
    },

    footerText:{
        fontSize:14,
        textAlign:"center",
        marginTop:24,
        color:"#585860",
    },

    containerInPass:{
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

    link:{
        color:"#2772c9",
        textDecorationLine:"underline",
    }
})