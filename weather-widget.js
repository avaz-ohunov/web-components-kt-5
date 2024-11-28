// weather-widget.js

'use strict';


class WeatherWidget extends HTMLElement {
    constructor() {
        super();

        // Shadow DOM
        this.attachShadow({ mode: 'open' });

        // API URL (пример)
        this.apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&current_weather=true'; 

        // Создание стилей и структуры
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --bg-color: #343a40;
                --text-color: #f8f9fa;
                --card-radius: 10px;
                --font-size: 1rem;
                font-family: Arial, sans-serif;
                display: block;
                max-width: 300px;
                margin: auto;
            }
            
            .weather-card {
                background-color: var(--bg-color);
                color: var(--text-color);
                border-radius: var(--card-radius);
                padding: 1rem;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .weather-location {
                margin: 0;
            }

            .weather-temp {
                font-size: calc(var(--font-size) * 2);
                font-weight: bold;
            }
        `;

        const container = document.createElement('div');
        container.className = 'weather-card';

        container.innerHTML = `
            <img src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-07-1024.png"
                width="100" height="100"
            >
            <h2 class="weather-location">Loading...</h2>
            <div class="weather-temp">--°C</div>
        `;

        this.shadowRoot.append(style, container);

        this.container = container;
    }

    connectedCallback() {
        this.fetchWeatherData();
    }

    async fetchWeatherData() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();

            // Обновление данных в компоненте
            this.updateWeather(data.current_weather);
        } catch (error) {
            console.error('Ошибка получения данных:', error);
            this.container.querySelector('.weather-location').textContent = 'Error fetching weather data';
        }
    }

    updateWeather(weather) {
        const location = 'Moscow'; // Демо-значение
        const temperature = weather.temperature || '--';

        this.container.querySelector('.weather-location').textContent = location;
        this.container.querySelector('.weather-temp').textContent = `${temperature}°C`;
    }
}


// Регистрация компонента
customElements.define('weather-widget', WeatherWidget);
