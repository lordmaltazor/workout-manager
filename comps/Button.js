import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Button({label, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
            <View style={styles.button}>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:
    {
        backgroundColor: 'rgb(163, 18, 18)',
        justifyContent: 'center',     
        height: 75,   
        paddingHorizontal: 35,
        borderRadius: 20,        
    },
    
    label:
    {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
    },
});