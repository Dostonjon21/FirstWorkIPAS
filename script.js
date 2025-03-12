'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (info) {
    const borders = info.borders ? info.borders.join(', ') : 'No borders';
    const html = `
        <article class="country">
            <img src="${info.flags.png}" class="country-img">
            <div class="country-data">
                <h3 class="country-name">${info.name.common}</h3>
                <h4 class="country-region">${info.region}</h4>
                <p class="country-row"><span>Population: </span>${(info.population / 1_000_000).toFixed(1)} million</p>
                <p class="country-row"><span>Capital: </span>${info.capital ? info.capital[0] : 'No capital'}</p>
                <p class="country-row"><span>Borders: </span>${borders}</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const getCountryData = async function (country) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const [info] = await res.json();
        renderCountry(info);

        if (!info.borders) return;

        const firstNeighbour = info.borders[0];
        if (!firstNeighbour) return;

        const res2 = await fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
        const [neighbourInfo] = await res2.json();
        renderCountry(neighbourInfo);

        if (!neighbourInfo.borders) return;

        const secondNeighbour = neighbourInfo.borders[0];
        if (!secondNeighbour) return;

        const res3 = await fetch(`https://restcountries.com/v3.1/alpha/${secondNeighbour}`);
        const [secondNeighbourInfo] = await res3.json();
        renderCountry(secondNeighbourInfo);
    } catch (err) {
        console.error(err);
    }
};

getCountryData('Uzbekistan');
