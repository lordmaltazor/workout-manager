import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import TodaysWorkoutHeader from './TodaysWorkoutHeader';
import TimePicker from './TimePicker';
import ScheduleNotification from '../PushNotifications/ScheduleNotification';
import RegisterForNotifications from '../PushNotifications/RegisterForNotifications.js';

export default function TodaysWorkout({workoutSplits, selectedWorkoutSplit, setSelectedWorkoutSplit, setViewedWorkoutSplit, weekday}) {    
    const getNoonAm = () => {
        let today = new Date();
        today.setHours(12);
        today.setMinutes(0);
        today.setSeconds(0);

        return today;
    }
    
    const [hasPermission, setHasPermission] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [notificationDate, setNotificationDate] = useState(getNoonAm);
    const [formattedTime, setFormattedTime] = useState('');
    const [timePickerEnabled, setTimePickerEnabled] = useState(false);

    const [todaysWorkout, setTodaysWorkout] = useState('');

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
    
        return () => {
          AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);
    
    const _handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") 
        {
            checkPermissions();
        }
    
        appState.current = nextAppState;
    };

    // Getting what todays workout is
    useEffect(() => {
        if (weekday === 'Monday') { setTodaysWorkout(workoutSplits[selectedWorkoutSplit].mondayWorkout) } 
        else if (weekday === 'Tuesday') { setTodaysWorkout(workoutSplits[selectedWorkoutSplit].tuesdayWorkout) } 
        else if (weekday === 'Wednesday') { setTodaysWorkout(workoutSplits[selectedWorkoutSplit].wednesdayWorkout) } 
        else if (weekday === 'Thursday') { setTodaysWorkout(workoutSplits[selectedWorkoutSplit].thursdayWorkout) } 
        else if (weekday === 'Friday') { setTodaysWorkout(workoutSplits[selectedWorkoutSplit].fridayWorkout) } 
        else if (weekday === 'Saturday') { setTodaysWorkout(workoutSplits[selectedWorkoutSplit].saturdayWorkout) } 
        else { setTodaysWorkout(workoutSplits[selectedWorkoutSplit].sundayWorkout) } 
    }, [])

    const toggleNotificationsEnabled = () => {
        if (notificationsEnabled === true)
        {
            Notifications.cancelAllScheduledNotificationsAsync();
        }  
        
        setNotificationsEnabled(previousState => !previousState);     
    }

    const checkPermissions = async () => {
        setHasPermission(await RegisterForNotifications());

        if (hasPermission === false)
        {
            Notifications.cancelAllScheduledNotificationsAsync();

        }        
    }

    const scheduleNotification = (hour, minute) => {
        let workoutName = todaysWorkout.toString();

        if (workoutName.toLowerCase() === 'rest')  
        {
            ScheduleNotification(`No workout today!`, `Just relax and rest.`, hour, minute);
        } 
        else
        {
            ScheduleNotification(`Don't forget to workout today!`, `Today is '${workoutName.toLowerCase()}' day.`, hour, minute);
        }
    }

    function formatTime(target) {
        return target < 10 ? '0' + target : target;
      }

    return (
        <View style={styles.todaysWorkout}>
            <TodaysWorkoutHeader onPress={() => {
                setViewedWorkoutSplit(selectedWorkoutSplit);
                setSelectedWorkoutSplit(0);
            }}/>

            <View style={styles.container}>
                <Text style={styles.day}>{weekday}:</Text>
                <Text style={styles.workout}>{todaysWorkout === '' ? 'Rest' : todaysWorkout}</Text>   
            </View>

            {hasPermission ? <View style={styles.notificationSettings}>
                    <Text style={styles.enableNotifications}>Workout Reminders:</Text>

                    <Switch
                        style={styles.notificationSwitch}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor={"#3e3e3e"}
                        onValueChange={toggleNotificationsEnabled}
                        value={notificationsEnabled}
                    />                    

                    <Text style={styles.notificationTime}>{formatTime(notificationDate.getHours()) + ':' + formatTime(notificationDate.getMinutes())}</Text>

                    {notificationsEnabled && <TouchableOpacity onPress={() => setTimePickerEnabled(true)} activeOpacity={0.6}>                                                
                        <View style={styles.button}>
                            <Text style={styles.buttonLabel}>Change Time</Text>
                        </View>
                    </TouchableOpacity>}
                </View> 
                : 
                    <View style={styles.noPermissionContainer}>
                        <Text style={styles.noPermission}>This app doesn't have permission to send notifications yet. Go into your phones settings and enable it if you want notifications</Text>
                    </View>
                }

                {timePickerEnabled && <TimePicker isVisible={timePickerEnabled} setIsVisible={setTimePickerEnabled} setNotificationDate={setNotificationDate} scheduleNotification={scheduleNotification}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    todaysWorkout:
    {
        flex: 1,
    },

    container:
    {        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    workoutSplit:
    {
        color: '#fff',
        marginBottom: 10,
        fontSize: 25,
        textAlign: 'center',
    },

    day:
    {
        color: '#fff',
        fontSize: 40,
    },

    workout:
    {
        color: 'rgb(175, 175, 175)',
        fontSize: 40,
        textAlign: 'center',
    },

    notificationSettings:
    {
        backgroundColor: 'rgb(50, 50, 50)',
        alignItems: 'center',
        marginTop: 40,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
    },

    enableNotifications:
    {
        color: '#fff',        
        fontSize: 35,
    },

    notificationSwitch:
    {
        marginTop: 10,
    },

    notificationTime:
    {        
        color: '#fff',
        marginTop: 10,
        fontSize: 25,
        textAlign: 'center',
    },

    button:
    {
        backgroundColor: 'rgb(163, 18, 18)',
        justifyContent: 'center',      
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20,        
    },
    
    buttonLabel:
    {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
    },

    noPermissionContainer:
    {
        backgroundColor: 'rgb(50, 50, 50)',
        marginTop: 40,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    noPermission:
    {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },

    timePicker:
    {
        color: '#fff',
        width: 100,
        height: 50,       
        marginTop: 20,
    },
});