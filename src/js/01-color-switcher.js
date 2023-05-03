function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const colorSwitchStart = document.querySelector('button[data-start]')
const colorSwitchStop = document.querySelector('button[data-stop]')
const body = document.body



colorSwitchStart.addEventListener('click', ()  => {
intervalId = setInterval (()=> {
    const color = getRandomHexColor();
    body.style.backgroundColor = color
}, 1000);
colorSwitchStart.disabled = true;
})

colorSwitchStop.addEventListener ('click', () => {
    clearInterval(intervalId);
    colorSwitchStart.disabled = false;

})