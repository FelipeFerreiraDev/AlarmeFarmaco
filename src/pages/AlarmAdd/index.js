import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ButtonTime } from '../../components/ButtonTime/ButtonTime';
import { Container, ContainerRow } from './styles/Container';
import { Title } from './styles/Title';

import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { loadAlarm, saveAlarm } from '../../libs/storage';

export function AlarmAdd({ route }) {

  const { imageUri } = route.params;
  const navigation = useNavigation();

  const dataHours = [
    {
      key: '4',
      title: '4 horas',
    },
    {
      key: '6',
      title: '6 horas',
    },
    {
      key: '8',
      title: '8 horas',
    },
    {
      key: '12',
      title: '12 horas',
    },
    {
      key: '24',
      title: '24 horas',
    }
  ];

  const [timeSelected, setTimeSelected] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

  const [nameMed, setNameMed] = useState('');

  function handleTimeSelected(time) {
    setTimeSelected(time);
  }

  function handleChangeTime(event, dateTime) {
    if (Platform.OS === 'android') {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDatetimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  function handleStartCamera() {
    navigation.navigate('Camera')
  }

  function handleMyAlarms() {
    navigation.navigate('MyAlarms')
  }

  async function handleSaveAlarm() {
    try {
      await saveAlarm({
        key: nameMed,
        title: nameMed,
        time: timeSelected,
        photo: imageUri,
        dateTimeNotification: selectedDateTime,
      });
      navigation.navigate('MyAlarms');
    } catch {
        Alert.alert('Não foi possível salvar o novo alarme!');
    }
  }

  function handleInputChange(value) {
    setNameMed(value);
  }

  return (
    <Container>
      <Title>
        Selecione a quantidade de horas
      </Title>
      <ContainerRow >
        <FlatList data={dataHours} renderItem={(item) => (
          <ButtonTime
            title={item.item.title}
            active={item.item.key === timeSelected}
            onPress={() => handleTimeSelected(item.item.key)}
          />
        )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonTimeList}
        />
      </ContainerRow>

      <KeyboardAvoidingView style={{width: "50%"}}>
        <View style={{borderBottomWidth: 1, alignItems: "center"}}>
          <TextInput 
            placeholder="Nome do medicamento" 
            style={{fontSize: 18}} 
            onChangeText={handleInputChange} 
          />
        </View>
      </KeyboardAvoidingView>

      {
        showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )
      }

      {
        Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDatetimePickerForAndroid}>
            <Text style={styles.dateTimePickerText}>
              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )
      }

      {
        imageUri && (
          <Image style={{ width: 300, height: 300, marginBottom: 20, borderRadius: 6 }} source={{ uri: imageUri }} />
        )
      }

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleStartCamera}
        style={styles.ButtonContainer}
      >
        <Text style={styles.buttonText}>
          Abrir Camera
            </Text>
        <FontAwesome name="camera-retro" size={24} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSaveAlarm}
        style={styles.ButtonContainer}
      >
        <Text style={styles.buttonText}>
          Cadastrar Medicamento
            </Text>
        <AntDesign name="checkcircleo" size={24} color="#19fd00" />
      </TouchableOpacity>

      <TouchableOpacity style={{width: "100%"}} onPress={handleMyAlarms}>
        <Text style={{ color: "#000000",marginTop: 10,fontSize: 18,textAlign: 'center',alignContent: 'center', justifyContent: 'center'}}>
          Voltar para meus alarmes
        </Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: '#6C63FF',
    width: '90%',
    borderRadius: 6,
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '3%'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 10,
  },
  buttonTimeList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginRight: 32,
    marginVertical: 28
  },
  dateTimePickerButton: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dateTimePickerText: {
    fontWeight: 'bold',
    color: '#6C63FF',
    fontSize: 24
  },
})