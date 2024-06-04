import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('qsuiz.db');

export default function Quiz10({ navigation }) {
    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [perguntasCarregadas, setPerguntasCarregadas] = useState([]);
    const [count, setCount] = useState(0);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        VerificarPerguntas();
    }, []);

    function VerificarPerguntas() {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT count(*) as total FROM perguntas;',
                [],
                (tx, results) => {
                    const total = results.rows.item(0).total;
                    if (total < 10) {
                        Alert.alert("Peninha que você não tem perguntas suficientes.");
                        navigation.navigate("Home");
                    } else {
                        carregarPergunta();
                    }
                },
                (tx, error) => {
                    console.error('Erro ao executar a consulta SQL:', error);
                    Alert.alert('Erro ao executar a consulta SQL:', error.message);
                }
            );
        });
    }

    const carregarPergunta = () => {
        if (count >= 10) {
            Alert.alert('Fim do quiz!', `Você fez ${points} pontos.`);
            navigation.navigate("pontos", {Pontos: {points}});
            return;
        }

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1;', [], (_, { rows }) => {
                if (rows.length > 0) {
                    let novaPergunta = rows._array[0];
                    if (!perguntasCarregadas.some(p => p.id === novaPergunta.id)) {
                        setPergunta(novaPergunta.pergunta);
                        setRespostaCorreta(novaPergunta.resposta_correta);
                        setAlternativas([novaPergunta.alternativaA, novaPergunta.alternativaB, novaPergunta.alternativaC, novaPergunta.alternativaD]);
                        setPerguntasCarregadas([...perguntasCarregadas, novaPergunta]);
                        setCount(count + 1);
                    } else {
                        carregarPergunta(); // Tentar carregar outra pergunta se a pergunta atual já foi carregada
                    }
                }
            });
        });
    };

    const verificarResposta = (resposta) => {
        if (resposta === respostaCorreta) {
            Alert.alert('Parabéns!', 'Você acertou a resposta!');
            setPoints(points + 10);
        } else {
            Alert.alert('Ops!', 'Resposta incorreta.');
        }

        carregarPergunta();
    };

    return (
        <View style={styles.view}>
            <Text multiline={true} style={styles.text}>{pergunta}</Text>
            {alternativas.map((alternativa, index) => (
                <View key={index} style={styles.alternativaa}>
                    <Button
                        title={`${String.fromCharCode(65 + index)}. ${alternativa}`}
                        onPress={() => verificarResposta(String.fromCharCode(65 + index))}
                    />
                </View>
            ))}
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
    text: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'justify',
        width: '90%'
    },
    alternativaa: {
        width: '90%',
        marginBottom: 15
    }
});
