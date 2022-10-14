import './css/styles.css';
import { fetchCountries } from './js/fetch';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


const notes = debounce(e => {
    const trimmedValue = input.value.trim();
    cleanHtml();
    if (trimmedValue !== '') {
        fetchCountries(trimmedValue).then(data => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (data.length === 0) {
                Notify.failure('Oops, there is no country with that name');
            }
            else if (data >= 2 && data <= 10) {
                renderCountryList(data);
            }
            else if (data.length === 1) {
                renderOneCountry(data);
            }
        })
    }

}, DEBOUNCE_DELAY);

input.addEventListener('input', notes);

function renderCountryList(countries) {
    const markup = countries.map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official
            }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    }).join('');
    countryList.innerHTML = markup;
};

function renderOneCountry(countries) {
    const markup = countries.map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official
            }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    }).join(''); 
    countryList.innerHTML = markup;
}
function cleanHtml() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}