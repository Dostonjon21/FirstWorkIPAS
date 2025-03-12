'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = (info) => {
    const borders = info.borders?.join(', ') || 'No borders';
    const html = `
        <article class="country">
            <img src="${info.flags.png}" class="country-img">
            <div class="country-data">
                <h3 class="country-name">${info.name.common}</h3>
                <h4 class="country-region">${info.region}</h4>
                <p class="country-row"><span>Population: </span>${(info.population / 1_000_000).toFixed(1)} million</p>
                <p class="country-row"><span>Capital: </span>${info.capital?.[0] || 'No capital'}</p>
                <p class="country-row"><span>Borders: </span>${borders}</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const getCountryData = (country) => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    request.addEventListener('load', function () {
        const info = JSON.parse(this.responseText)[0];
        renderCountry(info);
        
        const firstNeighbour = info.borders?.[0] || '';
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
        request2.send();
        request2.addEventListener('load', function () {
            const neighbourInfo = JSON.parse(this.responseText)[0];
            renderCountry(neighbourInfo);
            
            const secondNeighbour = neighbourInfo.borders?.[0] || '';
            const request3 = new XMLHttpRequest();
            request3.open('GET', `https://restcountries.com/v3.1/alpha/${secondNeighbour}`);
            request3.send();
            request3.addEventListener('load', function () {
                const secondNeighbourInfo = JSON.parse(this.responseText)[0];
                renderCountry(secondNeighbourInfo);
            });
        });
    });
};

getCountryData('Uzbekistan');
