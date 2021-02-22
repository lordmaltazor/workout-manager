import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons} from '@expo/vector-icons';

export default function WorkoutSplitButton({workoutSplit, setViewedWorkoutSplit, viewInfo, deleteSplit}) {    
    return (
        <TouchableOpacity onPress={() => setViewedWorkoutSplit(workoutSplit.index)} activeOpacity={0.6}>
            <View style={styles.container}>                
                {!workoutSplit.isCustom && <TouchableOpacity style={styles.infoButtonContainer} onPress={() => viewInfo(workoutSplit.index)}>
                    <Ionicons name='information-circle' size={45} color='rgb(210, 210, 210)' />
                </TouchableOpacity>}
                
                <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => deleteSplit(workoutSplit.index)}>
                    <Ionicons name='close-circle' size={45} color='rgb(225, 225, 225)' />
                </TouchableOpacity>

                <Text style={styles.name}>{workoutSplit.name}</Text>

                {workoutSplit.frequency !== '' && <Text style={styles.frequency}>{workoutSplit.frequency === 0 ? 'Empty' : workoutSplit.frequency === 1 ? 'Once a week' : (workoutSplit.frequency + ' Times/week')}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:
    {                
        backgroundColor: 'rgb(50, 50, 50)',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,                    
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 30,   

        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.5, 
        shadowRadius: 5,

        elevation: 12,
    },

    infoButtonContainer:
    {        
        position: 'absolute',        
        top: -10,
        left: -10,
        borderRadius: 100,

        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.35, 
        shadowRadius: 5,

        elevation: 12,
    },

    deleteButtonContainer:
    {                
        position: 'absolute',                
        top: -15,
        right: -15,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.35, 
        shadowRadius: 5,

        elevation: 12,
    },    

    name:
    {
        color: 'rgb(255, 255, 255)',
        marginBottom: 5,
        marginHorizontal: 7,
        fontSize: 30,       
        textAlign: 'center',         
    },

    frequency:
    {
        color: 'rgb(200, 200, 200)',
        marginHorizontal: 7,
        fontSize: 30,                
    },
});