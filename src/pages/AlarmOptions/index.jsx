import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { Button, Container, Footer, Header, Title } from './style';

import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity } from 'react-native';

import { removeAlarm , saveAlarm} from '../../libs/storage';
import { Alert } from 'react-native';

export function AlarmOptions({ route }) {
    const { 
        key,        
        title,
        photo,
        time,
        dosagem,
        dateTimeNotification,
     } = route.params;

    const navigation = useNavigation();

    function handleDelete() {
        Alert.alert('Remover', `Deseja apagar o alarme do medicamento ${title}?`, [
            {
                text: 'Não',
                style: 'cancel'
            }, {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeAlarm(key);        
                        navigation.navigate('MyAlarms')
                    } catch (error) {
                        Alert.alert('Ocorreu um ero na remoção!');
                    }
                }
            }
        ])
    }

    async function handleComplet() {
        try {
            await removeAlarm(key);
            await saveAlarm({
              key: key,
              title: title,
              time: time,
              photo: photo,
              dosagem: dosagem,
              dateTimeNotification: dateTimeNotification,
            });
            Alert.alert('Alarme reagendado')
            navigation.navigate('MyAlarms');
          } catch {
              Alert.alert('Não foi possível confirmar!');
          }
    }

    return (
        <Container>
            <Header>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" color="#00ff55" size={30} onPress={() => navigation.goBack()}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <Feather name="trash" color="#ff0000" size={30} />
                </TouchableOpacity>
            </Header>

            <Title>
                {title}
            </Title>
            <Text style={{fontSize: 20}}>
                A dosagem é de {dosagem}
            </Text>

            <Image style={{ width: 300, height: 300, marginBottom: 20, borderRadius: 6 }} source={{ uri: photo }} />

            <Footer>
                <Button activeOpacity={.8} onPress={handleComplet}>
                    <Text style={{ color: "#FFF", fontSize: 16 }}>
                        Marcar medicamento como tomado {`   `}
                        <FontAwesome5 name="check-circle" size={24} color="#00ff55" />
                    </Text>
                </Button>
            </Footer>
        </Container>
    );
}