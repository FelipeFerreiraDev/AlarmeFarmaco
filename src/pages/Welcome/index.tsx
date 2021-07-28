import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles/Container';
import { Title } from './styles/Title';
import { Button } from './styles/Button';
import { Subtitle } from './styles/Subtitle';

import Doctor from '../../../assets/Doctor.png';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    //navigation.navigate('AlarmAdd', {imageUri: 'a'});
    navigation.navigate('MyAlarms');
  }

  return (
      <Container>
        <Title>
          Gerencie o horário para tomar seus medicamentos
      </Title>
        <Image source={Doctor} style={{ width: '100%', height: '43%', resizeMode: 'contain' }} />
        <Subtitle>
          Não esqueça de tomar seus medicamentos. 
          Nós iremos te lembrar quando a hora chegar.
          Cuide-se!!
        </Subtitle>
        <Button activeOpacity={0.89} onPress={handleStart}>
          <AntDesign name="doubleright" size={24} color="white" />
        </Button>
      </Container>
  );
}