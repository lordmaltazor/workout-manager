import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';

export default function TodaysWorkoutHeader({onPress}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
            <View style={styles.header}>
                <Ionicons style={styles.backIcon} name='arrow-back' size={32} color='#fff' />
                <Text style={styles.title}>Todays Workout:</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    header:
    {        
        backgroundColor: 'rgb(50, 50, 50)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    title:
    {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
    },

    backIcon:
    {
        position: 'absolute',
        left: 10,      
    }
});