import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default async function ScheduleNotification(titleMessage, bodyMessage, hour, minute) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: titleMessage,
            body: bodyMessage,
        },
        
        trigger:
        {
            hour: hour,
            minute: minute,
            second: 0,
            repeats: true,
        }
    });
}