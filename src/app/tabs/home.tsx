import {View, StyleSheet, ScrollView, Image, Text} from "react-native"
import {Button} from "@/Components/button"
import {Input} from "@/Components/Input"
import { Link } from "expo-router"
import userService from "@/services/UsuarioService"
export default function home(){
	return(
	<ScrollView>
		<View style={styles.container}>
		<Text style = {styles.title}>Bem Vindo {/*userService.getNome()*/}</Text>
		<View style={styles.listinhaDostreinos}>
			<View style={styles.treinos}>
			<Text style={styles.textinho}>Alongamento</Text>
			
		</View>
		<View style={styles.treinos}>
			<Text style={styles.textinho}>Bom dia!</Text>
		</View>
		<View style={styles.treinos}>
			<Text style={styles.textinho}>Alongamento</Text>
		</View>
		</View>
		</View>
    </ScrollView>
	)	
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	illustration: {
		width: 200,
		height: 200,
		marginBottom: 20,
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
	}

})