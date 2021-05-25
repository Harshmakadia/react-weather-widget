/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import {StyledCardWrapper, StyledWeatherImage} from './weatherDailyCard.styled';

function WeatherCard(props: {
    day: String;
    imageUrl: string;
    highestTemprature: String | Number;
    lowestTemprature: String | Number;
    isSelected?: boolean;
    onCardClick: React.MouseEventHandler;
}) {
    return (
        <StyledCardWrapper
            isSelected={props.isSelected || false}
            onClick={props.onCardClick}
        >
            <span className="day">{props.day}</span>
            <StyledWeatherImage src={props.imageUrl} alt="weather-image " />
            <span className="highest-temprature">
                {props.highestTemprature}&deg;
            </span>
            <span className="lowest-temprature">
                {props.lowestTemprature}&deg;
            </span>
        </StyledCardWrapper>
    );
}

export default WeatherCard;
