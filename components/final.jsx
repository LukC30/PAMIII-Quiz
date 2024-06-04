import React, { useState, useEffect } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function points({ route, navigation }) {

    const { Pontos } = route.params;
    console.log(Pontos)
    // useEffect(()=>{console.log(Pontos)

    // },[])

    function points(points) {
        if (points <= 20 && points > 0) {
            return (
                <View style={styles.view}>
                    <Text>Voce eh noobao morra, {points} pontos</Text>
                </View>
            )
        }
        else if (points <= 40 && points > 20) {
            return (
                <View style={styles.view}>
                    <Text>Estamos no caminho, continue tentando lixo inutil, {points} pontos</Text>
                </View>
            )
        }
        else if (points <= 60 && points > 40) {
            return (
                <View style={styles.view}>
                    <Text>esta comecando a melhorar verme, parabens pelo esforco inutil, {points} pontos</Text>
                </View>
            )
        }
        else if (points <= 80 && points > 60) {
            return (
                <View style={styles.view}>
                    <Text>continue se esforcando assim, a vcida nao vai te recompensar, {points} pontos</Text>
                </View>
            )
        }
        else if (points <= 100 && points > 80) {
            return (
                <View style={styles.view}>
                    <Text>PARABENS POR SER UM EXPERT NESTE LIXO! {points} pontos</Text>
                </View>
            )
        }

    }

    return (
        <View style={styles.view}>
            {points(Pontos.points)}
            <Button
                title={"Sair"}
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )


}

const styles = StyleSheet.create({
    view: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: "30px"


    }
})