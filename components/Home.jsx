import React from 'react';
import { Button, View, StyleSheet, Image } from 'react-native';



// Definindo o componente Home
export default function Home({ navigation }) {

    return (

        <View style={styles.container}>

            <Image source={require("../assets/unnamed.png")} style={{width: '90%', height: 150, marginBottom: 45}} />
            <View style={styles.button}>
                <Button style={styles.button} title="Adicionar pergunta" onPress={() => navigation.navigate('Add')} />
            </View>
            <View style={styles.button}>
                <Button style={styles.button} title="Iniciar Quiz de 10 perguntas" onPress={() => navigation.navigate('Quiz10')}  color={'brown'}/>
            </View>
            <View style={styles.button}>
                <Button style={styles.button} title="Iniciar quiz" onPress={() => navigation.navigate('Quiz')} color={'green'} />
            </View>
            <View style={styles.button}>
                <Button style={styles.button} title="Editar Perguntas" onPress={() => navigation.navigate('Edit')} color={'red'} />
            </View>

            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        minWidth: "50%",
        marginBottom: 15
    }
});
