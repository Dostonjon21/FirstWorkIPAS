'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = function(info){

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
}



const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();+
    0 
    request.addEventListener("load", () => {
        const [info] = JSON.parse(request.responseText);
     const [neighbour] = info.borders


        renderCountry(info);
        const request2 = new XMLHttpRequest();
        request2.open('GET', 'https://restcountries.com/v3.1/alpha/${neighbour}');
        request2.send();
        request2.addEventListener("load", () => {
            const [neighbourInfo]= JSON.parse(request2.responseText)
            renderCountry(neighbourInfo)
            
        })
    });
};

getCountryData('Uzbekistan');
