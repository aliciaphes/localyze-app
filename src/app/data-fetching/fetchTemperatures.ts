import { ApiUser, OpenMeteoData, User } from '../components/List/types';



const temperatureCache: Record<string, Promise<number>> = {};




const fetchTemperatureWithCache = (latitude: number, longitude: number): Promise<number> => {
    const key = `${latitude},${longitude}`;

    if (!temperatureCache[key]) {
        temperatureCache[key] = getTemperatureInCelsius(latitude, longitude);
    }

    return temperatureCache[key];
};




const getTemperatureInCelsius = async (lat: number, lon: number) => {
    const data: OpenMeteoData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, {
        cache: 'force-cache',
    }).then((res) => res.json())

    return data.current_weather.temperature;
}


export const fetchTemperatures = async (users: ApiUser[]) => {
    const userPromises = users.map(async (user) => {
        const locationTemp = await fetchTemperatureWithCache(user.location.lat, user.location.lon);
        const movingToTemp = await fetchTemperatureWithCache(user.movingTo.lat, user.movingTo.lon);

        const userData: User = {
            name: user.name,
            location: { ...user.location, temp: locationTemp },
            movingTo: { ...user.movingTo, temp: movingToTemp },
            tempDifference: Math.abs(locationTemp - movingToTemp),
            skills: user.skills,
        };

        return userData;
    });
    return Promise.all(userPromises);
}



