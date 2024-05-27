import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

// Definindo o componente Home
export default function Home({ navigation }) {

    return (

        <View style={styles.container}>

            {/* <Image source={require('../assets/logo.png')} style={{width: '90%', height: 150, marginBottom: 45}} /> */}

            <View style={styles.button}>
                <Button style={styles.button} title="Iniciar Quiz" onPress={() => navigation.navigate('Add')} />
            </View>

            <View style={styles.button}>
                <Button style={styles.button} title="Criar Pergunta" onPress={() => navigation.navigate('Quiz')} color={'green'} />
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
