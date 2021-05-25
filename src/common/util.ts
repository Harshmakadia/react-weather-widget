import {toast, TypeOptions} from 'react-toastify';
export const degToDirection = (deg: Number = 0) => {
    if (deg > 11.25 && deg <= 33.75) {
        return 'NNE';
    } else if (deg > 33.75 && deg <= 56.25) {
        return 'ENE';
    } else if (deg > 56.25 && deg <= 78.75) {
        return 'E';
    } else if (deg > 78.75 && deg <= 101.25) {
        return 'ESE';
    } else if (deg > 101.25 && deg <= 123.75) {
        return 'ESE';
    } else if (deg > 123.75 && deg <= 146.25) {
        return 'SE';
    } else if (deg > 146.25 && deg <= 168.75) {
        return 'SSE';
    } else if (deg > 168.75 && deg <= 191.25) {
        return 'S';
    } else if (deg > 191.25 && deg <= 213.75) {
        return 'SSW';
    } else if (deg > 213.75 && deg <= 236.25) {
        return 'SW';
    } else if (deg > 236.25 && deg <= 258.75) {
        return 'WSW';
    } else if (deg > 258.75 && deg <= 281.25) {
        return 'W';
    } else if (deg > 281.25 && deg <= 303.75) {
        return 'WNW';
    } else if (deg > 303.75 && deg <= 326.25) {
        return 'NW';
    } else if (deg > 326.25 && deg <= 348.75) {
        return 'NNW';
    } else {
        return 'N';
    }
};

export const getFullWeekDay = (date: Date) => {
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return days[date.getDay()];
};
export const getShortWeekDay = (date: Date) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
};
export function formatAMPM(date: Date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // @ts-ignore
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
export const isToday = (someDate: Date, today: Date = new Date()) => {
    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    );
};

export const getAirQualityDetail = (AQI: Number = 0): String => {
    if (AQI >= 1 && AQI <= 3) {
        return 'Low';
    } else if (AQI > 3 && AQI <= 6) {
        return 'Moderate';
    } else if (AQI > 6 && AQI <= 10) {
        return 'High';
    } else if (AQI > 10) {
        return 'Very High';
    }
    return '-';
};
export const getDateByOffset = (timezone: string) => {
    let date = new Date();
    return new Date(
        (typeof date === 'string' ? new Date(date) : date).toLocaleString(
            'en-US',
            {timeZone: timezone},
        ),
    );
};
export const getToast = (content: String, type: TypeOptions = 'default') => {
    return toast(content, {
        type,
    });
};
