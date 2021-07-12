'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// 나라 정보 화면에 출력
const renderCountry = function (data, className = '') {
  const html = `
          <article class="country ${className}" >
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>🚩</span>${data.capital}</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>
          `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// 에러 메세지
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// 위치정보 API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/*
//////////////////////////////////////////////////
// 1. 현재 위치로 국가 정보
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    if ('South Korea' === dataGeo.country)
      dataGeo.country = 'Korea (Republic of)';
    else if ('North Korea' === dataGeo.country)
      dataGeo.country = "Korea (Democratic People's Republic of)";

    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

btn.addEventListener('click', whereAmI);

*/

//////////////////////////////////////////////////
// 2. 국가 1과 인접한 국가 2
/*
const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

//////////////////////////////////////////////////
//  3. 현재 내가 위치한 국가 + 인접한 국가
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    const country = checkCountryName(dataGeo.country);
    countryData(country);
    btn.style.display = 'none';
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

const countryData = async function (country) {
  try {
    const country1 = await getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`,
      'Country not found'
    );
    renderCountry(country1[0]);

    const neighbour = country1[0].borders[0];

    if (!neighbour) throw new Error('No neighbour found!');

    const country2 = await getJSON(
      `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
      'Country not found'
    );

    renderCountry(country2, 'neighbour');
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    throw err;
  }
};

const checkCountryName = function (name) {
  if (!'South Korea' === name || !'PRK' === name) return name;
  else if ('South Korea' === name) return 'Korea (Republic of)';
  else if ('PRK' === name) return "Korea (Democratic People's Republic of)";
};

btn.addEventListener('click', whereAmI, { once: true });
