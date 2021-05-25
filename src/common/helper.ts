import APIHelper from './APIhelper';
import {AirQuality, UNIT, Weather} from '../types/weather.interface';
import {getDateByOffset} from './util';

const endpoint = process.env.REACT_APP_ENDPOINT;
const token = process.env.REACT_APP_API_TOKEN;
const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT;

export const getCord = async (
    cityName: String,
    limit: Number = 1,
): Promise<any> => {
    return APIHelper.get(
        `${endpoint}geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${token}`,
    );
};

export const getWeather = async (
    lat: String,
    long: String,
    unit: UNIT,
): Promise<Weather> => {
    return new Promise(async (resolve, reject) => {
        let queryUnit = unit === 'CELSIUS' ? 'metric' : 'imperial';
        try {
            let data = await APIHelper.get(
                `${endpoint}data/2.5/onecall?lat=${lat}&lon=${long}&appid=${token}&exclude=minutely,hourly,alerts&units=${queryUnit}`,
            );
            // @ts-ignore
            if (data && data.current) {
                data.current.dt = getDateByOffset(data.timezone);
                // @ts-ignore
                data.daily = data.daily.map(day => {
                    return {
                        ...day,
                        dt: new Date(1000 * day.dt),
                    };
                });
            }
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
};

export const getWeatherImageString = (name: String = '03d'): string => {
    return `${imageEndpoint}img/wn/${name}@2x.png`;
};

export const getAirquality = (
    lat: String,
    long: String,
): Promise<AirQuality> => {
    return APIHelper.get(
        `${endpoint}data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${token}`,
    );
};
