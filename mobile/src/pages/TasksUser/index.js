import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function Tasks() {

    const routes = useRoute();
    const user_info = routes.params.user

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        api.post("getTasksByGrid", { grid: user_info.grid })
        .then(data => {
            //alert(data.data.data)
            setTasks(data.data.data)
        })
    }, [])

    return(
        <View>
            <Text style={styles.pageTitle}> Olá { user_info.name }! Você possui {tasks.length} tarefas </Text>
            <FlatList 
            data={tasks}
            keyExtractor={tasks => String(tasks.id)}
            renderItem={({ item: tasks }) => (
                <View style={styles.taskCotainer}>
                    <Text style={styles.taskMasterTitle}>Tarefa</Text>

                    <Text style={styles.taskTitle}>Título:</Text>
                    <Text style={styles.taskValue}>{tasks.title}</Text>

                    <Text style={styles.taskTitle}>Descrição:</Text>
                    <Text style={styles.taskValue}>{tasks.description}</Text>

                    <Text style={styles.taskTitle}>Valor:</Text>
                    <Text style={styles.taskValue}>{tasks.value}</Text>

                    <Text style={styles.taskTitle}>Postado por:</Text>
                    <Text style={styles.taskValue}>ID:{tasks.account_posted} "{tasks.account_name}" Data: {tasks.date}</Text>
                </View>       
            )}

            />
        </View>
    )
}