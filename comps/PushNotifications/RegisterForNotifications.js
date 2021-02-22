import * as Permissions from 'expo-permissions';

export default async function RegisterForNotifications() {
    let wasSuccessful = true;

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') 
    {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;

        wasSuccessful = false;
    }  

    if (finalStatus !== 'granted') 
    {
        wasSuccessful = false;
    }

    return wasSuccessful;
}