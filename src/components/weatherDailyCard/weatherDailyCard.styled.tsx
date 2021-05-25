import styled from 'styled-components';

type StyledCardTypes = {
    isSelected: boolean;
};

export const StyledCardWrapper = styled.div<StyledCardTypes>`
    width: 4.3em;
    background-color: ${({isSelected}) => (isSelected ? '#f1f1f1' : 'white')};
    height: 11em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #e0dede;
    .day {
        font-weight: 600;
        font-size: 1em;
    }
    .highest-temprature {
        font-size: 1em;
        font-weight: bold;
    }
    .lowest-temprature {
        font-size: 0.9em;
    }
    &:hover {
        background: #f1f1f1;
    }
`;
export const StyledWeatherImage = styled.img`
    height: 4em;
    width: 4em;
`;
