import React from 'react';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function TimePicker({isVisible, setIsVisible, setNotificationDate, scheduleNotification}) {
    const handleConfirm = (date) => {
        const newDate = date;
        newDate.setSeconds(0);

        setNotificationDate(newDate);

        setIsVisible(false);

        // Cancel all the previous notification schedules
        Notifications.cancelAllScheduledNotificationsAsync();         
        
        scheduleNotification(newDate.getHours(), newDate.getMinutes());
    }
    
    return (                
        <DateTimePickerModal
            isVisible={isVisible}
            mode="time"
            is24Hour={true}
            onConfirm={handleConfirm}
            onCancel={() => setIsVisible(false)}
        />
    )
}