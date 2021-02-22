import React from 'react';
import { Modal, View, ScrollView, Text, StyleSheet } from 'react-native';
import Workout from './Workout';

export default function SelectWorkoutModal({setIsVisible, day, workouts, updateWorkoutDay}) {
    return (
        <View style={styles.backdrop}>
            <Modal transparent={true}>
                <View style={styles.dayContainer}>
                    <Text style={styles.day}>{day}:</Text>
                </View>
                
                <ScrollView style={styles.scrollView}>
                    {workouts.map((workout) => <Workout key={workout} day={day} name={workout} setIsVisible={setIsVisible} updateWorkoutDay={updateWorkoutDay}/>)}
                </ScrollView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: 
    {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,        
    },

    dayContainer:
    {
        backgroundColor: 'rgb(50, 50, 50)',
        alignSelf: 'center',
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,        
        borderRadius: 50,
    },

    day:
    {
        color: '#fff',
        fontSize: 35,
    },

    scrollView:
    {
        backgroundColor: 'rgb(125, 125, 125)',
        flex: 1,
        marginTop: 20,
        marginBottom: 50,
        marginHorizontal: 30,  
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: 40,
    },
});