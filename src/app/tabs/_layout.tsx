import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
export default function Layout(){
    return(
        //tabela e baixo
        <Tabs>
            //aqui tem a home, header Shwon é pra tirar o header, e o tabBarIcon 
            //é pra colocar o icone que fica em baixo da tela, tem que ser um componente do Feather, 
            //e tem que ser o nome do icone, e o size e color é pra deixar bonitinho legal legal
            <Tabs.Screen name = "IaScreen" options={{
                headerShown: false,
                tabBarIcon: ({color, size}: {color: string; size: number}) => (
                    <Feather name="cpu" size={24} color={"black"} />
                ),
            }} />
            <Tabs.Screen name = "desempenho" options={{
                headerShown: false,
                tabBarIcon: ({color, size}: {color: string; size: number}) => (
                    <Feather name="bar-chart-2" size={24} color={"black"} />
                ),
            }} />
            <Tabs.Screen name="home" options={{
                headerShown: false,
                tabBarIcon: ({color, size}: {color: string; size: number}) => (
                    <Feather name="home" size={28} color={color} />
                ),
            }} />
            <Tabs.Screen name="perfil" options={{
                headerShown: false,
                tabBarIcon: ({color, size}: {color: string; size: number}) => (
                    <Feather name="user" size={24} color={"black"} />
                ),
            }} />
            <Tabs.Screen name = "configuracoes" options={{
                headerShown: false,
                tabBarIcon: ({color, size}: {color: string; size: number}) => (
                    <Feather name="settings" size={24} color={"black"} />
                ),
            }} />
        </Tabs>         
    )
}
<Tabs
  screenOptions={{
    tabBarActiveTintColor: "#7C3AED",
    tabBarStyle: {
      backgroundColor: "#0F172A",
      height: 60,
      borderTopWidth: 0,
    },
  }}
></Tabs>