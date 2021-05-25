import React from 'react';
import WeatherScreen from './screens/weather.screen';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <ToastContainer
                autoClose={5000}
                position={'top-center'}
                hideProgressBar
            />
            <WeatherScreen />
        </div>
    );
}

export default App;
