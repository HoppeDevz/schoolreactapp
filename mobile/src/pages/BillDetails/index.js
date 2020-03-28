import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../../../services/api';
import { useRoute } from '@react-navigation/native'
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function BillDetails() {
    const routes = useRoute();
    const user_id = routes.params.id

    const [bill, setBill] = useState([]);

    useEffect(() => {
        api.post("getBillFromId", { id: user_id })
        .then(data => {
            setBill(data.data.data.data)
        })
        .catch(err => {
            setBill([]);
        })
    }, [])

    

    return(
        <View>

        <FlatList
        data={bill}
        keyExtractor={bill => String(bill.id)}
        renderItem={({ item: bill }) => (
            <View style={styles.billContainer}>

                <Text style={styles.billTitleText}> <Feather name="calendar" size={16} color="#FFF" /> Bimestre {bill.id}</Text>

                
                <Text style={styles.disciplineTitle}>Matemática</Text>
                <Text style={styles.disciplineValue}>{bill.math} pts</Text>

                <Text style={styles.disciplineTitle}>Física</Text>
                <Text style={styles.disciplineValue}>{bill.physical} pts</Text>

                <Text style={styles.disciplineTitle}>Química</Text>
                <Text style={styles.disciplineValue}>{bill.chemistry} pts</Text>

                <Text style={styles.disciplineTitle}>Filosofia</Text>
                <Text style={styles.disciplineValue}>{bill.philosophy} pts</Text>

                <Text style={styles.disciplineTitle}>Sociologia</Text>
                <Text style={styles.disciplineValue}>{bill.sociology} pts</Text>

                <Text style={styles.disciplineTitle}>Redação</Text>
                <Text style={styles.disciplineValue}>{bill.essay} pts</Text>

                <Text style={styles.disciplineTitle}>Educação Física</Text>
                <Text style={styles.disciplineValue}>{bill.physical_education} pts</Text>

                <Text style={styles.disciplineTitle}>Português</Text>
                <Text style={styles.disciplineValue}>{bill.portuguese} pts</Text>

                <Text style={styles.disciplineTitle}>Literatura</Text>
                <Text style={styles.disciplineValue}>{bill.literature} pts</Text>

                <Text style={styles.disciplineTitle}>Inglês</Text>
                <Text style={styles.disciplineValue}>{bill.english} pts</Text>
                
                <Text style={styles.disciplineTitle}>Biologia</Text>
                <Text style={styles.disciplineValue}>{bill.biology} pts</Text>

            </View>
            
        )}
        >

        </FlatList>

        </View>
        
    )
}