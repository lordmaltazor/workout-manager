import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutSplitHeader({ workoutSplit, onPress, updateSplitName }) {
    const textInput = useRef(null);

    const onLongPress = () => {
        updateSplitName('');

        textInput.current.focus();
    }

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} activeOpacity={0.6}>
            <View style={styles.header}>
                <Ionicons style={styles.backIcon} name='arrow-back' size={32} color='#fff' />
                <TextInput style={styles.title} defaultValue={workoutSplit.name} onChangeText={(value) => updateSplitName(value)} clearTextOnFocus={true} ref={textInput} maxLength={30} pointerEvents='none'></TextInput>
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
        marginBottom: 10,
        paddingTop: 30,
        paddingBottom: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    title:
    {
        color: '#fff',
        fontSize: 35,
        textAlign: 'center',
    },

    backIcon:
    {
        position: 'absolute',
        left: 10,
    }
});