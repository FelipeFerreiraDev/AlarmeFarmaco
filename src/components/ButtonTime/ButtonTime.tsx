import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface ButtonTimeProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function ButtonTime({title, active= false, ...rest}: ButtonTimeProps) {
    return(
        <RectButton style={[styles.container, active && styles.containerActive]} {...rest}>
            <Text style={[styles.text, active && styles.textActive]}>
                { title }
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#bdbdbd',
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 9,
    },
    containerActive: {
        backgroundColor: '#6C63FF',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    textActive: {
        color: '#FFF',
    }
})