export type ApiUser = {
    name: string;
    age: number;
    location: {
        country: string;
        city: string;
        lat: number;
        lon: number;
    };
    movingTo: {
        country: string;
        city: string;
        lat: number;
        lon: number;
    };
    skills: string[];
};

export type User = {
    name: string;
    location: {
        country: string;
        city: string;
        lat: number;
        lon: number;
        temp: number;
    };
    movingTo: {
        country: string;
        city: string;
        lat: number;
        lon: number;
        temp: number;
    };
    skills: string[];
    tempDifference: number;
};

export type OpenMeteoData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather_units: {
        time: string;
        interval: string;
        temperature: string;
        windspeed: string;
        winddirection: string;
        is_day: string;
        weathercode: string;
    };
    current_weather: {
        time: string;
        interval: number;
        temperature: number;
        windspeed: number;
        winddirection: number;
        is_day: number;
        weathercode: number;
    };
};