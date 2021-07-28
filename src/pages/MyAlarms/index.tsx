import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Image, FlatList, Text, Alert } from 'react-native';
import { Container } from './Container';

import { AlarmProps, loadAlarm, removeAlarm, StorageAlarmProps } from '../../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Title } from './Title';
import { AlarmCard } from '../../components/AlarmCard/AlarmCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function MyAlarms() {
    const [myAlarms, setMyAlarms] = useState<AlarmProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextMed, setNextMed] = useState<String>();

    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('AlarmAdd', { imageUri: 'a' });
    }

    useEffect(() => {
        async function loadStorageData() {
            const alarmsStoraged = await loadAlarm();
            if (alarmsStoraged.length != 0) {
                const nextTime = formatDistance(
                    new Date(alarmsStoraged[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                    { locale: pt }
                );

                setNextMed(
                    `O próximo medicamento é ${alarmsStoraged[0].title}`
                )

                setMyAlarms(alarmsStoraged);
                setLoading(false);
            } else {
                setLoading(false);
                setNextMed('Sem alarmes cadastrados')
            }
        }
        loadStorageData();

    }, [myAlarms]);


    function handleRemove(alarm: AlarmProps) {
        Alert.alert('Remover', `Deseja apagar o alarme do medicamento ${alarm.title}?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeAlarm(alarm.key);

                        setMyAlarms((oldData) =>
                            oldData?.filter((item) => item.key !== alarm.key)
                        )
                    } catch (error) {
                        Alert.alert('Ocorreu um ero na remoção!');
                    }
                }
            }
        ])
    }

    if(loading) {
        return <Text>
            CARREGANDO...
        </Text>
    }

    return (
        <Container>
            <Title>
                Próximos medicamentos
            </Title>
            <View style={styles.nextAlarmContainer}>
                <Text style={styles.nextAlarmContainerText}>
                    {nextMed || `Nenhum medicamento cadastrado`}
                </Text>
            </View>

            <View style={{ flex: 1, width: '100%' }}>
                <FlatList
                    data={myAlarms}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <AlarmCard
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                />
            </View>

            <View style={{ backgroundColor: "transparent", width: "100%", alignItems: 'flex-end', position: 'absolute', bottom: 50, right: 40 }}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleStart} activeOpacity={.9}>
                    <Text style={{ textAlign: 'center', color: "#FFF", fontSize: 32 }}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    nextAlarmContainer: {
        backgroundColor: "#8c83e7",
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: "95%"
    },
    nextAlarmContainerText: {
        color: "#FFF",
        fontSize: 18,
        textAlign: 'center',
    },
    buttonAdd: {
        backgroundColor: "#5f58b3",
        width: 60,
        height: 60,
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 100
    }
})