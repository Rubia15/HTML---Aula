const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');
const weatherIcon = document.getElementById('weather-icon'); 
const set = (id, value) => document.getElementById(id).textContent = value;

async function buscarClima(cidade) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=77082b028c55416295b194129251208&q=${cidade}&aqi=no&lang=pt`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error('Ouve erro ao realizar busca dos dados');
    }

    const dados = await resposta.json();
    Clima(dados);
  } catch (erro) {
    Erro();
  }
}

function Clima(dados) {
    weatherResult.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = dados.current.condition.icon;
    weatherIcon.alt = dados.current.condition.text;
    
    set('city-name', `${dados.location.name}, ${dados.location.country}`);
    set('local-time', `Horário Local: ${dados.location.localtime}`);
    set('temperature', `${dados.current.temp_c}°C`);
    set('condition', dados.current.condition.text);
    set('feels-like', `${dados.current.feelslike_c}°C`);
    set('humidity', `${dados.current.humidity}%`);
    set('wind-speed', `${dados.current.wind_kph} km/h`);
    set('pressure', `${dados.current.pressure_mb} mb`);
    set('visibility', `${dados.current.vis_km} km`);
    set('uv-index', dados.current.uv);
}
function Erro() {
  weatherResult.classList.add('hidden');
  errorMessage.classList.remove('hidden');
  errorMessage.querySelector('p').textContent = 'A cidade não foi encontrada.';
}

searchBtn.addEventListener('click', () => {
  const cidade = cityInput.value.trim();
  if (cidade !== '') {
    buscarClima(cidade);
  }
});