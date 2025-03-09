'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/uzbekistan');
request.send();
request.addEventListener("load", () => {
const [info] = JSON.parse(request.responseText); 
console.log(info);
const html = `
        <article class="country">
                <img src="${info.flags.png}" class="country-img">
                <div class="country-data">
                    <h3 class="country-name">${info.name.common}</h3>
                    <h4 class="country-region">${info.region}</h4>
                     <p class="country-row"><span>👨‍👩‍👦</span>${Math.round(info.population / 1000000)}</p>
                     <p class="country-row"><span>🗣</span>lANG</p>
                     <p class="country-row"><span>💸</span>CUR</p>
                </div>
              </article>
    `
});
