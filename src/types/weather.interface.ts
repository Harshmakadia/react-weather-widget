interface Temparature {
    max: Number;
    min: Number;
}
export interface Current {
    clouds: Number;
    dew_point: Number;
    dt: Date;
    humidity: Number;
    temp: Number;
    wind_deg: Number;
    wind_speed: Number;
    weather: [
        {
            description: String;
            icon: string;
            id: Number;
            main: String;
        },
    ];
}
export interface weekDays {
    temp: Temparature;
    clouds: Number;
    dew_point: Number;
    dt: Date;
    humidity: Number;
    wind_deg: Number;
    wind_speed: Number;
    weather: [
        {
            description: String;
            icon: string;
            id: Number;
            main: String;
        },
    ];
}
export interface Weather {
    current: Current;
    daily: weekDays[];
    timezone: String;
    timezone_offset: Number;
}

export interface AQI {
    main: {
        aqi: Number;
    };
}
export interface AirQuality {
    list: AQI[];
}
export type UNIT = 'CELSIUS' | 'FAHRENHEIT';

export type WeatherUnit = {
    [key in UNIT]: Weather | undefined;
};

export interface ActualShowWeather {
    temprature: Number | undefined;
    date: Date | undefined;
    humidity: Number | undefined;
    windDegree: Number | undefined;
    windSpeed: Number | undefined;
    imgUrl: String | undefined;
}
