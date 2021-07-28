import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import * as Notifications from 'expo-notifications';

export interface AlarmProps {
    key: string;
    title: string;
    photo: string;
    time: string;
    dateTimeNotification: Date;
    hour: string;
}

export interface StorageAlarmProps {
    [key: string]: {
        data: AlarmProps;
    }
}

export async function saveAlarm(alarm: AlarmProps): Promise<void> {
    try {
        const nextTime = new Date(alarm.dateTimeNotification);
        const now = new Date();

        const nextHourTime = alarm.time

        nextTime.setDate(now.getDate() * Number(1))

        const seconds = Math.abs(
            Math.ceil(now.getTime() - nextTime.getTime() / 1000)
        );

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hora de tomar sua medicação 🙂',
                body: `Está na hora de tomar a medicação ${alarm.title}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    alarm
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true,
            }
        })

        const data = await AsyncStorage.getItem('@alarmManager:alarm');
        const oldAlarm = data ? (JSON.parse(data) as StorageAlarmProps) : {};

        const newAlarm = {
            [alarm.key]: {
                data: alarm,
                notificationId
            }
        }

        await AsyncStorage.setItem('@alarmManager:alarm',
            JSON.stringify({
                ...newAlarm,
                ...oldAlarm
            }));

    } catch (error) {
        throw new Error(error);
    }
}

export async function loadAlarm(): Promise<AlarmProps[]> {
    try {
        const data = await AsyncStorage.getItem('@alarmManager:alarm');
        const alarms = data ? (JSON.parse(data) as StorageAlarmProps) : {};

        const alarmsSorted = Object.keys(alarms).map((alarm) => {
            return {
                ...alarms[alarm].data,
                hour: format(new Date(alarms[alarm].data.dateTimeNotification), 'HH:mm')
            }
        }).sort((a, b) =>
            Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 -
                Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
            )
        );

        return alarmsSorted;

    } catch (error) {
        throw new Error(error);
    }
}

export async function removeAlarm(key: string): Promise<void> {
    const data = await AsyncStorage.getItem('@alarmManager:alarm');
    const alarms = data ? (JSON.parse(data) as StorageAlarmProps) : {};

    delete alarms[key];

    await AsyncStorage.setItem(
        '@alarmManager:alarm',
        JSON.stringify(alarms)
    );
}