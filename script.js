'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    request.addEventListener("load", () => {
        const [info] = JSON.parse(request.responseText);
        console.log(info);
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
    });
};
getCountryData('France');
getCountryData('Uzbekistan');
