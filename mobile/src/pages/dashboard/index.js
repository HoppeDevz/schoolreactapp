import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import api from '../../../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import ImgLogo from '../../assets/logo.png';
import * as ImagePicker from 'expo-image-picker';

export default function Dashboard() {
    const route = useRoute();
    const user_info = route.params

    const navigation = useNavigation();

    const [tasks, setTasks] = useState([]);
    const [avatarURL, setAvatarURL] = useState({ image: '' });

    function reloadPage() {
        navigation.navigate("Dashboard", user_info)
    }

    function NavBillHandler() {
        navigation.navigate("Boletim", { id: user_info.id } )
    }

    function NavTasksHandler() {
        navigation.navigate("Tarefas", { user : user_info } )
    }

    async function choosePhoto() {
        const result = await ImagePicker.launchImageLibraryAsync();
        setAvatarURL({image: result.uri})
        console.log(result.uri)

        api.post("changeAvatarURL", {
            id: user_info.id,
            uri: avatarURL.image
        }).then(response => {
            console.log(avatarURL.image)
            //console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        api.post("/getTasksByGrid", { grid: user_info.grid } ) 
        .then(response => {

            setTasks(response.data.data)
        }).catch(err => {
            alert(false)
        })

        api.post("getAccountInfo", {
            user_email: user_info.user_email
        }).then(response => {
            setAvatarURL({ image: response.data.data[0].avatarURL })

        }).catch(err => {
            console.log(err)
        })

    }, [])

    return(
        <View >

            <View style={styles.dashboardHeaderContainer}>
                
            <TouchableOpacity
            onPress={choosePhoto}
            >
            <Image 
            source={{uri: avatarURL.image }} 
            style={{height:50, width:50, borderRadius: 50, marginLeft: 20, marginTop: 30, }} 
            />
            </TouchableOpacity>
            

            <View style={styles.dashboardContainer} >
            <Text style={styles.helloTitle}>Olá!</Text>
            <Text style={styles.helloName} >{user_info.name} {user_info.lastname} </Text>
            </View>
            </View>


            <View style={styles.dasboardHeader} >
            
            <Text style={ styles.descriptionText }>Aqui você pode ver algumas coisas como por exemplo seu boletim e suas tarefas a serem feitas, com suas respectivas informações como: título, descrição e valor</Text>
            </View>


            <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.billContainer} onPress={NavBillHandler} >
                <Text style={styles.billtext}> <Feather  name="calendar" size={16} color="#FFF" /> Ver Boletim</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.billContainer} onPress={NavTasksHandler} >
                <Text style={styles.billtext}> <Feather  name="flag" size={16} color="#FFF" /> Ver Tarefas</Text>
            </TouchableOpacity>
            </View>

        </View>

    
    )
}