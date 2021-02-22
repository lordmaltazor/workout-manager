import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SelectSplit from './comps/SelectWorkoutSplitMenu/SelectSplit';
import WorkoutSplit from './comps/WorkoutSplitMenu/WorkoutSplit';
import TodaysWorkout from './comps/TodaysWorkout/TodaysWorkout';

export default function app() {
  const day = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

  let weekday = days[day.getDay()];

  class Split {
    constructor(name, index, frequency, isCustom, info, mondayWorkout, tuesdayWorkout, wednesdayWorkout, thursdayWorkout, fridayWorkout, saturdayWorkout, sundayWorkout) {
      this.name = name;
      this.index = index;
      this.frequency = frequency;
      this.isCustom = isCustom;
      this.info = info;

      this.mondayWorkout = mondayWorkout;
      this.tuesdayWorkout = tuesdayWorkout;
      this.wednesdayWorkout = wednesdayWorkout;
      this.thursdayWorkout = thursdayWorkout;
      this.fridayWorkout = fridayWorkout;
      this.saturdayWorkout = saturdayWorkout;
      this.sundayWorkout = sundayWorkout;
    }
  }

  const [workoutSplits, setWorkoutSplits] = useState([new Split("(no split selected)", 0, 0, "Rest", "Rest", "Rest", "Rest", "Rest", "Rest", "Rest")]); // An array of WorkoutSplit classes
  const workouts = ['Rest', 'Full Body', 'Upper Body', 'Legs', 'Chest', 'Back', 'Shoulders', 'Arms', 'Abs', 'Cardio', 'Sport', 'Flexibility', 'Yoga'];

  // The index of the workout split that has been selected. The split[0] is null
  const [viewedWorkoutSplit, setViewedWorkoutSplit] = useState(0);
  const [selectedWorkoutSplit, setSelectedWorkoutSplit] = useState(0);

  const createNewSplit = (newSplit) => {
    newSplit.frequency = getWorkoutFrequency(newSplit);

    if (newSplit.index === 0) {
      newSplit.index = workoutSplits.length;
    }

    setWorkoutSplits(workoutSplits => [
      ...workoutSplits, newSplit
    ]);
  }

  const deleteSplit = (index) => {
    setWorkoutSplits(workoutSplits.filter(split => split.index !== index))
  }

  const getWorkoutFrequency = (workoutSplit) => {
    let frequency = 0;

    workoutSplit.mondayWorkout.toLowerCase() !== 'rest' && frequency++;
    workoutSplit.tuesdayWorkout.toLowerCase() !== 'rest' && frequency++;
    workoutSplit.wednesdayWorkout.toLowerCase() !== 'rest' && frequency++;
    workoutSplit.thursdayWorkout.toLowerCase() !== 'rest' && frequency++;
    workoutSplit.fridayWorkout.toLowerCase() !== 'rest' && frequency++;
    workoutSplit.saturdayWorkout.toLowerCase() !== 'rest' && frequency++;
    workoutSplit.sundayWorkout.toLowerCase() !== 'rest' && frequency++;

    return frequency;
  }

  useEffect(() => {
    createNewSplit(new Split(
      "Full Body Split", // Name    
      1, // Index 
      0, // Frequency (this value is set in the 'createNewSplit' function)
      false, // isCustom  
      "This is a great split for beginners that want to workout 2 or 3 times/week",
      "Full Body", // Monday
      "Rest", // Tuesday
      "Rest", // Wednesday
      "Full Body", // Thursday
      "Rest", // Friday
      "Rest", // Saturday
      "Rest" // Sunday
    ));

    createNewSplit(new Split(
      "Upper/lower Body Split", // Name
      2, // Index 
      0, // Frequency (this value is set in the 'createNewSplit' function)
      false, // isCustom
      "This is a good split for people who want a balanced physique and workout 3 or 4 times/week", // Info                
      "Upper Body", // Monday
      "Lower Body", // Tuesday
      "Rest", // Wednesday
      "Upper Body", // Thursday
      "Lower Body", // Friday
      "Rest", // Saturday
      "Rest", // Sunday
    ));

    createNewSplit(new Split(
      "Bro Split", // Name
      3, // Index 
      0, // Frequency (this value is set in the 'createNewSplit' function)
      false, // isCustom
      "This is a common workout split for people that want to really focus on one specific muscle group / workout", // Info                
      "Chest", // Monday
      "Back", // Tuesday
      "Shoulders", // Wednesday
      "Legs", // Thursday
      "Arms and Abs", // Friday
      "Rest", // Saturday
      "Rest", // Sunday
    ));

    createNewSplit(new Split(
      "Push/pull/legs Split", // Name
      4, // Index 
      0, // Frequency (this value is set in the 'createNewSplit' function)
      false, // isCustom
      "This is an excellent workout split for experienced lifters who want to workout 6 times/week", // Info                
      "Push", // Monday
      "Pull", // Tuesday
      "Legs", // Wednesday
      "Rest", // Thursday
      "Push", // Friday
      "Pull", // Saturday
      "Legs" // Sunday
    ));
  }, []);

  return (
    <View style={styles.app}>
      {viewedWorkoutSplit === 0 ? <SelectSplit workoutSplits={workoutSplits} Split={Split} createNewSplit={createNewSplit} deleteSplit={deleteSplit} setViewedWorkoutSplit={setViewedWorkoutSplit} /> :
        selectedWorkoutSplit === 0 ? <WorkoutSplit workoutSplits={workoutSplits} setWorkoutSplits={setWorkoutSplits} workouts={workouts} viewedWorkoutSplit={viewedWorkoutSplit} setViewedWorkoutSplit={setViewedWorkoutSplit} setSelectedWorkoutSplit={setSelectedWorkoutSplit} getWorkoutFrequency={getWorkoutFrequency} /> :
          <TodaysWorkout workoutSplits={workoutSplits} selectedWorkoutSplit={selectedWorkoutSplit} setSelectedWorkoutSplit={setSelectedWorkoutSplit} setViewedWorkoutSplit={setViewedWorkoutSplit} weekday={weekday} />}
    </View>
  )
}

const styles = StyleSheet.create({
  app:
  {
    backgroundColor: 'rgb(25, 25, 25)',
    flex: 1,
  },
});