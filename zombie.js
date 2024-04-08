let score = 0;
let zombiesLeft = 30;
let popupLength = 3000;
let hideTimeout;
let clickable = false;

function popUpRandomZombie() {
    if (zombiesLeft <= 0) {
        document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
        return;
    }

    const zombieHeads = document.querySelectorAll('.wgs__zombie');

    if (zombieHeads.length === 0) {
        return;
    }

    const zombieIndex = Math.floor(Math.random() * zombieHeads.length);
    const zombieHead = zombieHeads[zombieIndex];

    clickable = true;

    zombieHead.classList.remove('wgs__zombie--hidden', 'wgs__zombie--whacked');

    zombiesLeft -= 1;
    document.querySelector('.sb__zombies').innerHTML = zombiesLeft;

    hideTimeout = setTimeout(() => hideZombie(zombieHead), popupLength);
}

function hideZombie(zombieHead) {
    clickable = false;
    zombieHead.classList.add('wgs__zombie--hidden');

    setTimeout(popUpRandomZombie, 500);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(popUpRandomZombie, 0);

    const zombieHeads = document.querySelectorAll('.wgs__zombie');
    zombieHeads.forEach(zombieHead => {
        zombieHead.addEventListener('click', event => {
            if (!clickable) return;

            score += 1;
            document.querySelector('.sb__score').innerHTML = score;
            popupLength -= popupLength / 10;

            clearTimeout(hideTimeout);
            hideZombie(zombieHead);

            event.target.classList.add('wgs__zombie--hidden');
            event.target.classList.add('wgs__zombie--whacked');
        });
    });
});
