import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WorkoutSplitHeader from './WorkoutSplitHeader';
import WorkoutDay from './WorkoutDay';
import Button from '../Button';
import SelectWorkoutModal from './SelectWorkoutModal/SelectWorkoutModal';

export default function WorkoutSplit({workoutSplits, setWorkoutSplits, workouts, viewedWorkoutSplit, setViewedWorkoutSplit, setSelectedWorkoutSplit, getWorkoutFrequency}) {
    const [selectedDay, setSelectedDay] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const workoutSplit = workoutSplits[viewedWorkoutSplit];

    const changeWorkout = (day) => {
        setSelectedDay(day);

        setIsModalVisible(true);
    }

    const updateSplitName = (value) => {
        const newArray = [...workoutSplits];
        newArray[viewedWorkoutSplit].name = value;
    
        setWorkoutSplits(newArray);
    }

    const updateWorkoutDay = (day, workout) => {
        const newArray = [...workoutSplits];
        day === 'Monday' ? newArray[viewedWorkoutSplit].mondayWorkout = workout : 
        day === 'Tuesday' ? newArray[viewedWorkoutSplit].tuesdayWorkout = workout : 
        day === 'Wednesday' ? newArray[viewedWorkoutSplit].wednesdayWorkout = workout : 
        day === 'Thursday' ? newArray[viewedWorkoutSplit].thursdayWorkout = workout : 
        day === 'Friday' ? newArray[viewedWorkoutSplit].fridayWorkout = workout : 
        day === 'Saturday' ? newArray[viewedWorkoutSplit].saturdayWorkout = workout : 
        newArray[viewedWorkoutSplit].sundayWorkout = workout;
    
        setWorkoutSplits(newArray);
    
        setWorkoutSplits(
            workoutSplits.map(split => 
                split.index === workoutSplit.index ? {...split, frequency: getWorkoutFrequency(workoutSplit)} : split 
        ));

        setIsModalVisible(false);
    }

    const selectSplit = () => {
        if (workoutSplit.frequency === 0)
        {
            alert("You have to enter something for every day like 'Arms', 'Back' or 'Rest'!");
        }
        else
        {
            setSelectedWorkoutSplit(viewedWorkoutSplit);
        }    
    }

    const goBack = () => {
        if (workoutSplit.name === '')
        {
            alert("You have to enter a workout split name!");
        }
        else
        {
            setViewedWorkoutSplit(0);
        }
    }

    return (
        <View style={styles.workoutSplit}>
            <WorkoutSplitHeader workoutSplit={workoutSplit} onPress={goBack} updateSplitName={updateSplitName}/>

            <View style={styles.week}>
                <WorkoutDay day={'Monday'} workout={workoutSplit.mondayWorkout} changeWorkout={changeWorkout}></WorkoutDay>
                <WorkoutDay day={'Tuesday'} workout={workoutSplit.tuesdayWorkout} changeWorkout={changeWorkout}></WorkoutDay>
                <WorkoutDay day={'Wednesday'} workout={workoutSplit.wednesdayWorkout} changeWorkout={changeWorkout}></WorkoutDay>
                <WorkoutDay day={'Thursday'} workout={workoutSplit.thursdayWorkout} changeWorkout={changeWorkout}></WorkoutDay>
                <WorkoutDay day={'Friday'} workout={workoutSplit.fridayWorkout} changeWorkout={changeWorkout}></WorkoutDay>
                <WorkoutDay day={'Saturday'} workout={workoutSplit.saturdayWorkout} changeWorkout={changeWorkout}></WorkoutDay>
                <WorkoutDay day={'Sunday'} workout={workoutSplit.sundayWorkout} changeWorkout={changeWorkout}></WorkoutDay>
            </View>

            {isModalVisible && <SelectWorkoutModal setIsVisible={setIsModalVisible} day={selectedDay} workouts={workouts} updateWorkoutDay={updateWorkoutDay}/>}

            <View style={styles.selectButtonContainer}>
                <Button label="Select" onPress={selectSplit}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    test:
    {
        color: '#fff',
        fontSize: 20,
    },
    
    workoutSplit:
    {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        flex: 1,
    },
    
    week:
    {        
        flex: 1,
        justifyContent: 'space-around',        
    },

    selectButtonContainer:
    {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 15,
    },
});