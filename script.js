'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/uzbekistan');
request.send();

request.addEventListener("load", () => {
    const [info] = JSON.parse(request.responseText); 

    const html = `
      <article class="country">
        <img src="${info.flags.png}" class="country-img" />
        <div class="country-data">
            <h3 class="country-name">${info.name.common}</h3>
            <h4 class="country-region">${info.region}</h4>
            <p class="country-row"><span>👨‍👩‍👦</span>${(info.population / 1_000_000).toFixed(1)} million people</p>
            <p class="country-row"><span>🗣</span>${Object.values(info.languages).join(', ')}</p>
            <p class="country-row"><span>💸</span>${Object.values(info.currencies)[0].name} (${Object.keys(info.currencies)[0]})</p>
        </div>
      </article>
    `
});
