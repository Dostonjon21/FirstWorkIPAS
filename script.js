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
                <img src="" class="country-img">
                <div class="country-data">
                    <h3 class="country-name">Country</h3>
                    <h4 class="country-region">Region</h4>
                     <p class="country-row"><span>👨‍👩‍👦</span>POP people</p>
                     <p class="country-row"><span>🗣</span>lANG</p>
                     <p class="country-row"><span>💸</span>CUR</p>
                </div>
              </article>
    `
});
