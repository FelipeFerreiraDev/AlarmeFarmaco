import React from 'react';
import {
    Animated,
    Image,
    StyleSheet, Text, View
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface AlarmProps extends RectButtonProps {
    data: {
        key: string
        title: string;
        photo: string;
        hour: string;
    };
}

export const AlarmCard = ({ data }: AlarmProps) => {
    
  const navigation = useNavigation();

    function handleOptionAlarm() {
        navigation.navigate('AlarmOptions', {key: data.key, title: data.title, photo: data.photo});
    }

    return (
        <RectButton style={styles.container} onPress={handleOptionAlarm}>
            {data.photo != 'a' ?
                <Image
                    source={{ uri: data.photo }}
                    style={{
                        resizeMode: 'cover', width: 100,
                        height: 100,
                        borderRadius: 6
                    }}
                /> : null}
            <Text style={styles.title}>
                {data.title}
            </Text>
            <View style={styles.details}>
                <Text style={styles.details}>
                    Tomar às
                </Text>
                <Text style={styles.timeLabel}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#ccc9c9",
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 17,
        color: "#000"
    },
    details: {
        alignItems: 'flex-end',
    },
    timeLabel: {
        fontSize: 16,
        color: "#000",
        fontWeight: 'bold'
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        color: "#000",
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: "#ff0000",
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 10,
        paddingLeft: 15
    }
})