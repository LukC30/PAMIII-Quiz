import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

export default function Quiz() {
    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');

    // Carregando uma pergunta aleatória quando o componente é montado
    useEffect(() => {
        carregarPergunta();
    }, []);

    // Função para carregar uma pergunta aleatória do banco de dados
    const carregarPergunta = () => {
        
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1;', [], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setPergunta(pergunta.pergunta);
                    setRespostaCorreta(pergunta.resposta_correta);
                    setAlternativas([pergunta.alternativaA, pergunta.alternativaB, pergunta.alternativaC, pergunta.alternativaD]);
                }
            });
        });
    };

    const verificarResposta = (resposta) => {
        if (resposta === respostaCorreta) {
            Alert.alert('Parabéns!', 'Você acertou a resposta!');
            carregarPergunta();
        } else {
            Alert.alert('Ops!', 'Resposta incorreta.');
        }
    };

    return (
        <View style={styles.view}>
            {/* <Image source={require('../assets/logo.png')} style={styles.image}/> */}
            <Text multline={true} style={styles.text}>{pergunta}</Text>
            {alternativas && alternativas.map((alternativa, index)=>(
                <View style={styles.alternativaa}> 
                    <Button key={index} title={`${String.fromCharCode(65 + index)}. ${alternativa}`} onPress={()=>{
                        verificarResposta(String.fromCharCode(65 + index))
                    }}></Button>
                </View>
            ))}
            <View style={styles.alternativaa}>
                <Button title="Proxima pergunta" onPress={carregarPergunta}></Button>
            </View>
        </View>

       
    );


}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        width: '90%',
        marginStart: 'auto',
        marginEnd: 'auto'
    },
    image: {
        width: '90%',
        height: 150,
        marginBottom: 45
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'justify',
        width: '90%'
    },
    alternativaa:{
        width: '90%',
        marginBottom: 15
    }


})