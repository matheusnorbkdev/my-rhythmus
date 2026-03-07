import { StyleSheet, TextInput, TextInputProps} from "react-native"
export function Input({...rest}: TextInputProps){
    return (
        <TextInput style = {style.Input} {...rest}/>
    )
}
const style = StyleSheet.create({
    Input: {
        width: "100%",
        height: 46,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#000080",
        fontSize: 16,
        paddingLeft: 12,
        
    }

})