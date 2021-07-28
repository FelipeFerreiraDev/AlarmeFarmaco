import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AlarmAdd } from '../pages/AlarmAdd';
import { MaterialIcons } from '@expo/vector-icons';
import { MyAlarms } from '../pages/MyAlarms';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: "#6C63FF",
                inactiveTintColor: "#a9a6e2",
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: 20,
                    height: 88,
                },
            }}
        >
            <AppTab.Screen
                name="Novo Alarm"
                component={AlarmAdd}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="add-circle-outline"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />


            <AppTab.Screen
                name="Meus Alarms"
                component={MyAlarms}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;