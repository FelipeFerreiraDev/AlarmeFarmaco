import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Image, FlatList, Text } from 'react-native';
import { Container } from './Container';

import { AlarmProps, loadAlarm } from '../../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Title } from './Title';
import { AlarmCard } from '../../components/AlarmCard/AlarmCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

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
            if(alarmsStoraged.length!=0) {
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
                setNextMed('Sem alarmes cadastrados')
            }
        }

        loadStorageData();
    }, []);

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
                        <AlarmCard data={item} />
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