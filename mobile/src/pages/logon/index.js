import React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

export default function Logon() {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const navigation = useNavigation();

    function SubmitHandler() {
        if (!email == '' && !password == '') {
            //const data = { user_email: email, password }

            api.post("/loginAccount", { user_email : email, password })
            .then(response => {
                if (response.data.response[0].exist_account) {
                    alert('Login feito com sucesso!')
                    navigation.navigate('Dashboard',  response.data.response[0] )
                } else {
                    alert('Login/Senha incorretos!')
                }
            }).catch(err => {
                alert('Erro ao tentar efetuar login')
            })
        } else {
            alert('Campos Vazios!')
        }
    }

    return(
        <View style={styles.logincontainer}>
            <Text style={styles.titlelogin}> <Feather name="log-in" size={16} color="#222" /> Fazer login</Text>
            <View style={styles.divinputs}>
                <TextInput placeholder="Email" textContentType="emailAddress" value={email} onChangeText={(text) => setEmail(text)} style={styles.setvalues} />
                <TextInput placeholder="Senha" textContentType="password" value={password} onChangeText={(text) => setPassword(text)} style={styles.setvalues} />
            </View>
            <TouchableOpacity style={styles.button} onPress={SubmitHandler} >
                <Text style={styles.buttonText} >Login</Text>
            </TouchableOpacity>
        </View>
    )
}