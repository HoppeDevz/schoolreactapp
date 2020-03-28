import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import api from '../../../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export default function Dashboard() {
    const route = useRoute();
    const user_info = route.params

    const navigation = useNavigation();

    const [tasks, setTasks] = useState([]);

    function reloadPage() {
        navigation.navigate("Dashboard", user_info)
    }

    useEffect(() => {
        api.post("/getTasksByGrid", { grid: user_info.grid } ) 
        .then(response => {

            setTasks(response.data.data)
        }).catch(err => {
            alert(false)
        })
    }, [])

    return(
        <View >
            <View style={styles.dasboardHeader} >
            <Text style={styles.dashboardText}>Olá {user_info.name} {user_info.lastname} =) </Text>
            <Text style={ styles.descriptionText }>Aqui você pode ver algumas de suas tarefas a serem feitas, com suas respectivas informações como: título, descrição e valor</Text>
            </View>

            <View>
                <Text style={styles.titleTask} > <Feather name="repeat" size={16} color="#FFF" /> Tarefas: {tasks.length}</Text>
            </View>

            <FlatList
            data={tasks}
            keyExtractor={tasks => String(tasks.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: tasks }) => (
                <View style={styles.takscontainer}>
                    <Text style={styles.titletask}>Titulo:</Text>
                    <Text style={styles.desctask}>{tasks.title}</Text>

                    <Text style={styles.titletask}>Descrição:</Text>
                    <Text style={styles.desctask}>{tasks.description}</Text>

                    <Text style={styles.titletask}>Valor:</Text>
                    <Text style={styles.desctask}>{tasks.value}</Text>

                    <Text style={styles.titletask}>Enviado por:</Text>
                    <Text style={styles.desctask}>{tasks.account_name}</Text>

                    <TouchableOpacity>
                        <Text style={styles.taskButtonDetail}>Ver Detalhes</Text>
                    </TouchableOpacity>
                </View>
            )}
            >

            </FlatList>
        </View>

    
    )
}