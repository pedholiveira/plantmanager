import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { AndroidNotificationPriority, cancelScheduledNotificationAsync, scheduleNotificationAsync } from 'expo-notifications';

const PLANTS_KEY = '@plantmanager:plants';

export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number,
        repeat_every: string
    },
    dateTimeNotification: Date,
    hour: string
}

export interface StoragePlantProps {
    [id: string]: {
        data: PlantProps,
        notificationId: string
    }
}

export async function savePlant(plant: PlantProps) : Promise<void> {
    try {
        const nextTime = new Date(plant.dateTimeNotification);
        const now = new Date();

        const { times, repeat_every } = plant.frequency;
        if(repeat_every === 'week') {
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval);
        } else {
            nextTime.setDate(nextTime.getDate() + 1);
        }

        const seconds = Math.abs(Math.ceil((now.getTime() - nextTime.getTime()) / 1000));

        const notificationId = await scheduleNotificationAsync({
            content: {
                title: 'Heeey, 🌱',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        });

        const data = await AsyncStorage.getItem(PLANTS_KEY);
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }
        await AsyncStorage.setItem(PLANTS_KEY, JSON.stringify({
            ...newPlant,
            ...oldPlants
        }));
    } catch(erro) {
        throw new Error(erro);
    }
}

export async function loadPlants() : Promise<PlantProps[]> {
    try {
        const data = await AsyncStorage.getItem(PLANTS_KEY);
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
        const plantsSorted = Object.keys(plants)
                                    .map(plant => mapPlants(plants[plant].data))
                                    .sort((a, b) => sortPlants(a.dateTimeNotification, b.dateTimeNotification));
        return plantsSorted;
    } catch(erro) {
        throw new Error(erro);
    }
}

export async function removePlant(id: string): Promise<void> {
    const data = await AsyncStorage.getItem(PLANTS_KEY);
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    await cancelScheduledNotificationAsync(plants[id].notificationId);
    
    delete plants[id];

    await AsyncStorage.setItem(PLANTS_KEY, JSON.stringify(plants));
}

function mapPlants(plant: PlantProps) {
    return {
        ...plant,
        hour: format(new Date(plant.dateTimeNotification), 'HH:mm')
    }
}

function sortPlants(dateTimeNotificationA: Date, dateTimeNotificationB: Date) {
    return Math.floor(new Date(dateTimeNotificationA).getTime() / 1000 - Math.floor(new Date(dateTimeNotificationB).getTime() / 1000));
}