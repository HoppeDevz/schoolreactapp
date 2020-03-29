import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logon from './pages/logon';
import Dashboard from './pages/dashboard';
import BillDetails from './pages/BillDetails';
import Tasks from './pages/TasksUser';

const Appstack = createStackNavigator();

export default function Routes() {
    return(
        <NavigationContainer>
            <Appstack.Navigator >
                <Appstack.Screen name="Login" component={Logon} />
                <Appstack.Screen name="Dashboard" component={Dashboard} />
                <Appstack.Screen name="Boletim" component={BillDetails} />
                <Appstack.Screen name="Tarefas" component={Tasks} />
            </Appstack.Navigator>
        </NavigationContainer>
    )
}