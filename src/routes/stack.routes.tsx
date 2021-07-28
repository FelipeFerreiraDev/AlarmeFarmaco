import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from '../pages/Welcome';
import { AlarmAdd } from '../pages/AlarmAdd';
import { CameraScreen } from '../pages/Camera';
import { MyAlarms } from '../pages/MyAlarms';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: "#fff"
            },
        }}
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen
            name="AlarmAdd"
            component={AlarmAdd}
        />

        <stackRoutes.Screen
            name="Camera"
            component={CameraScreen}
        />

        <stackRoutes.Screen
            name="MyAlarms"
            component={MyAlarms}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;