import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WorkoutDay({day, workout, changeWorkout}) {
    return (
        <TouchableOpacity style={styles.workoutDay} onPress={() => changeWorkout(day)} activeOpacity={0.6}>
            <Text style={styles.day}>{day}: </Text> 
            <Text style={styles.workoutName}>{workout}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    workoutDay:
    {
        backgroundColor: 'rgb(50, 50, 50)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,        
        maxHeight: 80,
        minHeight: 40,        
        marginVertical: 7,
        marginHorizontal: 10,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.65, 
        shadowRadius: 5,

        elevation: 12,
    },

    day:
    {
        color: 'rgb(185, 185, 185)',
        fontSize: 25,   
    },

    workoutName:
    {
        color: 'rgb(225, 225, 225)',
        fontSize: 25,   
    },
});