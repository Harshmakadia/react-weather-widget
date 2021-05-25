import React from 'react';
import DailyCard from '../weatherDailyCard';
import {StyledCardWrapper} from './weatherCardMaker.styled';
import {ActualShowWeather, weekDays} from '../../types/weather.interface';
import {getWeatherImageString} from '../../common/helper';
import {getShortWeekDay, isToday} from '../../common/util';

const WeatherCardMaker = (props: {
    dayForcast: weekDays[] | undefined;
    onCardClick: any;
    temprature: ActualShowWeather | undefined;
}) => {
    if (!props.dayForcast) {
        return <div>-</div>;
    }

    return (
        <StyledCardWrapper>
            {props.dayForcast.map(weatherForcast => {
                let temparature = weatherForcast.temp;
                return (
                    <DailyCard
                        day={getShortWeekDay(weatherForcast.dt)}
                        highestTemprature={temparature.max}
                        lowestTemprature={temparature.min}
                        imageUrl={getWeatherImageString(
                            weatherForcast.weather[0].icon,
                        )}
                        key={String(weatherForcast.dt)}
                        onCardClick={e => props.onCardClick(e, weatherForcast)}
                        isSelected={
                            props.temprature?.date
                                ? isToday(
                                      props.temprature.date,
                                      weatherForcast.dt,
                                  )
                                : false
                        }
                    />
                );
            })}
        </StyledCardWrapper>
    );
};

export default WeatherCardMaker;
