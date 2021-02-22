import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Workout({day, name, updateWorkoutDay}) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => updateWorkoutDay(day, name)}>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: 'rgb(50, 50, 50)',    
        alignItems: 'center',    
        marginVertical: 8,
        marginHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 5,

        elevation: 12,
    },

    name:
    {
        color: '#fff',
        fontSize: 30,
    },
});