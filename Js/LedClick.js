// Инициализация
let ledToggled = false;

const leds = [
  document.getElementById('led1'),
  document.getElementById('led2'),
  document.getElementById('led3'),
  document.getElementById('led4'),
  document.getElementById('led5'),
  document.getElementById('led6')
];

const LedButton = document.getElementById('ledBtn');
LedButton.onclick = toggleLed;

// Cookie helpers
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

// Применение состояния
function applyLedState(on) {
  const addClass = on ? 'ornament-clicked' : 'ornament';
  const removeClass = on ? 'ornament' : 'ornament-clicked';
  leds.forEach(el => {
    if (!el) return;
    el.classList.remove(removeClass);
    el.classList.add(addClass);
  });
}

// Инициализация при загрузке — если cookie ledStatus=true, включаем ёлку
(function initFromCookie() {
  const cookieVal = getCookie('ledStatus');
  if (cookieVal === 'true') {
    ledToggled = true;
    applyLedState(true);
  } else {
    ledToggled = false;
    applyLedState(false);
  }
})();

function toggleLed() {
  if (!ledToggled) {
    ledToggled = true;
    applyLedState(true);
    setCookie('ledStatus', 'true', 365);
    console.log('ledToggled:', ledToggled);
    alert("Вы уже отметились✅ Больше нечего нажимать не нужно ;)");
  }
}
document.addEventListener('DOMContentLoaded', function () {
    // Текущее значение счетчика из localStorage
    let cnt = localStorage.getItem('visitCount');
    // Устанавливаем счетчик в 0, если посещение впервые
    if (cnt === null) { cnt = 0; };
    // Увеличиваем счетчик на 1
    cnt++;
    // Обновляем значение счетчика в localStorage
    localStorage.setItem('visitCount', cnt);
    // Выводим значение счетчика на страницу
    document.getElementById('counter').innerText = cnt;
});