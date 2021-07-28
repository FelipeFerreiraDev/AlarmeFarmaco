import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface AlarmProps {
    key: string;
    title: string;
    photo?: string;
    time: string;
    dateTimeNotification: Date;
}

interface StorageAlarmProps {
    [key: string]: {
        data: AlarmProps;
    }
}

export async function saveAlarm(alarm: AlarmProps): Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@alarmManager:alarm');
        const oldAlarm = data ? (JSON.parse(data) as StorageAlarmProps) : {};

        const newAlarm = {
            [alarm.key]: {
                data: alarm
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