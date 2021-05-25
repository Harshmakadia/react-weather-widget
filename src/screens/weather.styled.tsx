import styled from 'styled-components';

export const StyledWeather = styled.div`
    width: 465px;
    .ui.input {
        width: 100%;
        border: 1px solid #f0f0f0;
    }
    height: 500px;
    margin-left: 10px;
`;

export const WeatherCard = styled.div`
    border: 1px solid #f0f0f0;
    box-shadow: 1px 3px 3px #858585;
    height: 65%;
    margin-top: 6px;
    .city-name {
        color: black;
        font-size: 1.4em;
        font-weight: bold;
    }
    .city-details {
        color: grey;
        font-size: 0.8em;
    }
`;
type UnitTextProp = {
    isSelected: boolean;
};
export const StyledWeatherInfo = styled.div`
    padding: 5px;
    font-size: 1.6em;
    font-weight: bold;
    display: flex;
    .weather-number {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .unit {
        font-size: 0.7em;
        margin-top: 37px;
        margin-left: 10px;
    }
`;
export const StyledUnitText = styled.span<UnitTextProp>`
    color: ${({isSelected}) => (isSelected ? 'black' : 'grey')};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
export const StyledAtomospherInfo = styled.div`
    font-size: 1em;
    color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-left: 4em;
`;
export const StyledDetailWrapper = styled.div`
    display: flex;
`;
export const StyledWeatherDetails = styled.div`
    padding: 10px 10px;
`;
