import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SelectSplitHeader() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Workout planner</Text>
            <Text style={styles.description}>Please select one of the presets below or create your own workout split</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:
    {
        backgroundColor: 'rgb(50, 50, 50)',
        marginBottom: 15,
        paddingTop: 30,        
        paddingBottom: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    title:
    {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
    },
    
    description:
    {
        color: '#fff',
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center',
    },
});