/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {debounce} from 'debounce';
import Input from '../components/input/input.components';
import {
    StyledWeather,
    WeatherCard,
    StyledWeatherInfo,
    StyledAtomospherInfo,
    StyledDetailWrapper,
    StyledWeatherDetails,
    StyledUnitText,
} from './weather.styled';
import {
    getAirquality,
    getCord,
    getWeather,
    getWeatherImageString,
} from '../common/helper';
import {
    degToDirection,
    getFullWeekDay,
    formatAMPM,
    isToday,
    getAirQualityDetail,
    getToast,
} from '../common/util';
import {TEXT} from '../common/constants';
import {
    AirQuality,
    Weather,
    UNIT,
    ActualShowWeather,
} from '../types/weather.interface';
import WeatherCardMaker from '../components/weatherCardMaker/weatherCardMaker.component';
import NoResultFound from '../components/noResultFound';

const WeatherScreen = () => {
    const [cityName, setCityName] = useState<String>();
    const [coordinates, setCoordinates] = useState();
    const [weatherDetails, setWeatherDetails] = useState<Weather | undefined>();
    const [airQualityIndex, setAirQualityIndex] =
        useState<AirQuality | undefined>();
    const [currentUnit, setCurrentUnit] = useState<UNIT>('CELSIUS');
    const [currentTemprature, setCurrentTemprature] =
        useState<ActualShowWeather | undefined>();
    const fetchCoordinates = useCallback(cityname => {
        getCord(String(cityname))
            .then(data => {
                if (data && data.length > 0) {
                    setCoordinates({
                        // @ts-ignore
                        latitude: data[0].lat,
                        longitude: data[0].lon,
                        cityName: data[0].name,
                        country: data[0].country,
                    });
                } else {
                    setCoordinates(undefined);
                }
            })
            .catch(e => {
                getToast(e.message || TEXT.STANDARD_ERROR_MESSAGE, 'error');
            });
    }, []);
    const debounceSearchCity = useRef(debounce(fetchCoordinates, 500));
    const onChangeCity = (e: any) => {
        setCityName(e.target.value);
    };
    useEffect(() => {
        if (cityName) {
            debounceSearchCity.current(cityName);
        } else {
            setWeatherDetails(undefined);
            setCurrentTemprature(undefined);
            setAirQualityIndex(undefined);
            setCoordinates(undefined);
        }
    }, [cityName, debounceSearchCity]);
    useEffect(() => {
        if (coordinates && coordinates !== undefined) {
            // @ts-ignore
            if (coordinates.latitude && coordinates.longitude) {
                getWeather(
                    // @ts-ignore
                    coordinates.latitude,
                    // @ts-ignore
                    coordinates.longitude,
                    currentUnit,
                )
                    .then((data: Weather) => {
                        setWeatherDetails(data);
                        setCurrentTemprature({
                            temprature: data.current.temp,
                            date: data.current.dt,
                            humidity: data.current.humidity,
                            windDegree: data.current.wind_deg,
                            windSpeed: data.current.wind_speed,
                            imgUrl: data.current.weather[0].icon,
                        });
                    })
                    .catch((e: any) => {
                        getToast(
                            e.message || TEXT.STANDARD_ERROR_MESSAGE,
                            'error',
                        );
                    });
                // @ts-ignore
                getAirquality(coordinates.latitude, coordinates.longitude)
                    .then((data: AirQuality) => {
                        setAirQualityIndex(data);
                    })
                    .catch((e: Error) => {
                        getToast(
                            e.message || TEXT.STANDARD_ERROR_MESSAGE,
                            'error',
                        );
                    });
            }
        }
    }, [coordinates, currentUnit]);
    const getCityName = (): String => {
        if (coordinates !== undefined)
            //@ts-ignore
            return `${coordinates.cityName}, ${coordinates.country}`;
        return '--';
    };
    const onUnitChange = (e: any) => {
        setCurrentUnit(e.target.dataset.value);
    };

    return (
        <StyledWeather>
            <Input
                placeholder="Search City"
                onChange={onChangeCity}
                onClearClick={() => setCityName('')}
                value={cityName || ''}
            />
            <WeatherCard>
                {coordinates === undefined &&
                cityName !== undefined &&
                cityName?.length > 0 ? (
                    <>
                        <NoResultFound />
                    </>
                ) : (
                    <>
                        <StyledWeatherDetails>
                            <div className="city-name">{getCityName()}</div>
                            <div className="city-details">
                                {weatherDetails?.current.dt
                                    ? getFullWeekDay(weatherDetails?.current.dt)
                                    : ''}
                                &nbsp;
                                {weatherDetails?.current.dt
                                    ? formatAMPM(weatherDetails?.current.dt)
                                    : ''}{' '}
                                &nbsp;-{' '}
                                {weatherDetails?.current.weather[0].description}
                            </div>
                        </StyledWeatherDetails>
                        <StyledDetailWrapper>
                            <StyledWeatherInfo>
                                <img
                                    src={getWeatherImageString(
                                        currentTemprature?.imgUrl,
                                    )}
                                    alt="weather-image"
                                />
                                <span className="weather-number">
                                    {currentTemprature?.temprature}&deg;
                                </span>
                                <span className="unit">
                                    <StyledUnitText
                                        isSelected={
                                            currentUnit === 'FAHRENHEIT'
                                        }
                                        data-value="FAHRENHEIT"
                                        onClick={onUnitChange}
                                    >
                                        {TEXT.FAHRENHEIT}
                                    </StyledUnitText>{' '}
                                    /{' '}
                                    <StyledUnitText
                                        isSelected={currentUnit === 'CELSIUS'}
                                        data-value="CELSIUS"
                                        onClick={onUnitChange}
                                    >
                                        {TEXT.CELSIUS}
                                    </StyledUnitText>
                                </span>
                            </StyledWeatherInfo>
                            <StyledAtomospherInfo>
                                {TEXT.HUMIDITY}: {currentTemprature?.humidity}%
                                <br />
                                {TEXT.WIND}: {currentTemprature?.windSpeed}
                                &nbsp;{' '}
                                {currentTemprature
                                    ? currentUnit === 'CELSIUS'
                                        ? 'KPH'
                                        : 'MPH'
                                    : ''}{' '}
                                &nbsp;
                                {currentTemprature
                                    ? degToDirection(
                                          currentTemprature?.windDegree,
                                      )
                                    : ''}
                                <br />
                                {TEXT.AIR_QUALITY}:{' '}
                                {getAirQualityDetail(
                                    airQualityIndex?.list[0].main.aqi,
                                )}
                            </StyledAtomospherInfo>
                        </StyledDetailWrapper>
                        <WeatherCardMaker
                            dayForcast={weatherDetails?.daily}
                            onCardClick={(_: any, item: any) => {
                                if (isToday(item.dt)) {
                                    setCurrentTemprature({
                                        temprature:
                                            weatherDetails?.current.temp ||
                                            undefined,
                                        date:
                                            weatherDetails?.current.dt ||
                                            undefined,
                                        humidity:
                                            weatherDetails?.current.humidity ||
                                            undefined,
                                        windDegree:
                                            weatherDetails?.current.wind_deg ||
                                            undefined,
                                        windSpeed:
                                            weatherDetails?.current
                                                .wind_speed || undefined,
                                        imgUrl:
                                            weatherDetails?.current.weather[0]
                                                .icon || undefined,
                                    });
                                } else {
                                    setCurrentTemprature({
                                        temprature: item.temp.max,
                                        date: item.dt,
                                        humidity: item.humidity,
                                        windDegree: item.wind_deg,
                                        windSpeed: item.wind_speed,
                                        imgUrl: item.weather[0].icon,
                                    });
                                }
                            }}
                            temprature={currentTemprature}
                        />
                    </>
                )}
            </WeatherCard>
        </StyledWeather>
    );
};
export default WeatherScreen;
