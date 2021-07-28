import React, { useEffect, useRef, useState } from 'react';
import { Alert, TouchableOpacity, View, Modal, Image } from 'react-native';

import { Camera } from 'expo-camera';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';

import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export function CameraScreen() {
    const camRef = useRef(null);
    const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back)
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />
    }

    if (hasPermission === false) {
        return Alert.alert('Acesso negado');
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpenModal(true);
        }
    }

    async function savePicture() {
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto);
        navigation.navigate('AlarmAdd', { imageUri: asset.uri });
    }

    return (
        <>
            <Camera
                style={{ flex: 1 }}
                type={typeCamera}
                ref={camRef}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 20, left: 20 }}
                        onPress={() => {
                            setTypeCamera(
                                typeCamera === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back);
                        }}>
                        <Ionicons name="camera-reverse-outline" size={80} color="#6C63FF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 20, right: 20 }}
                        onPress={takePicture}>
                        <MaterialIcons name="camera" size={80} color="#23a115" />
                    </TouchableOpacity>
                </View>
            </Camera>

            {
                capturedPhoto &&
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={openModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 10, marginRight: 100 }} onPress={() => setOpenModal(false)}>
                                <AntDesign name="closecircleo" size={50} color="#FF0000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 10 }} onPress={savePicture}>
                                <AntDesign name="check" size={50} color="#23a115" />
                            </TouchableOpacity>
                        </View>

                        <Image
                            style={{ width: '100%', height: 400, borderRadius: 20 }}
                            source={{ uri: capturedPhoto }}
                        />
                    </View>
                </Modal>
            }
        </>
    );
}