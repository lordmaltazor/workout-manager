import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import SelectSplitHeader from './SelectSplitHeader.js';
import WorkoutSplitButton from './WorkoutSplitButton.js';

export default function SelectSplit({ workoutSplits, Split, createNewSplit, deleteSplit, updateSplitName, setViewedWorkoutSplit }) {
  const deleteSplitQuestion = (workoutSplit) => {
    Alert.alert(
      "Warning:",
      `Are you sure that you want to delete '${workoutSplit.name}'?`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete", onPress: () => {
            deleteSplit(workoutSplit.index);
          }
        }
      ],
      { cancelable: false }
    );
  }

  const viewInfo = (index) => {
    Alert.alert(
      `${workoutSplits[index].name}:`,
      workoutSplits[index].info,
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.selectSplit}>
      <SelectSplitHeader />

      <ScrollView style={styles.workoutSplits}>
        {workoutSplits.slice(1).map((split) =>
          <WorkoutSplitButton key={split.index} workoutSplit={split} setViewedWorkoutSplit={setViewedWorkoutSplit} updateSplitName={updateSplitName} viewInfo={viewInfo} deleteSplit={() => deleteSplitQuestion(split)} />
        )}

        <TouchableOpacity style={styles.createSplitButton} onPress={() => {
          createNewSplit(new Split(
            "Custom Split", // Name
            0, // Index (this value is set in the 'createNewSplit' function) 
            0, // Frequency (this value is set in the 'createNewSplit' function)     
            true, // isCustom
            "", // Info (not used for custom splits)           
            "Rest", // Monday
            "Rest", // Tuesday
            "Rest", // Wednesday
            "Rest", // Thursday
            "Rest", // Friday
            "Rest", // Saturday
            "Rest" // Sunday
          ))
        }} activeOpacity={0.6}>

          <Text style={styles.createSplitLabel}>Create New Split</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  selectSplit:
  {
    flex: 1,
  },

  workoutSplits:
  {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },

  createSplitButton:
  {
    backgroundColor: 'rgb(163, 18, 18)',
    justifyContent: 'center',
    height: 75,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 35,
    borderRadius: 20,
  },

  createSplitLabel:
  {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
  },
});