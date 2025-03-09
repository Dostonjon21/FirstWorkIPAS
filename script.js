'use strict'
const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')
const request = new XMLHttpRequest()
request.open('GET','https://restcountries.com/v3.1/name/uzbekistan')
request.send()
request.addEventListener("load", () => {
const info = JSON.parse(request.responseText)
console.log(info);

})