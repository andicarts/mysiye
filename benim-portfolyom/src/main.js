import './style.css'
import { setupCounter } from './counter.js'
import { setupDateTracker } from './dateCounter.js'
import { setupMovieTracker } from './movieTracker.js'
import { setupTypingTest } from './typingTest.js'
import { setupSnakeGame } from './snakeGame.js' 
import { setupUcanKacanGame } from './ucanKacanGame.js'

import { anasayfaHTML } from './anasayfa.js'
import { sayaclarHTML } from './sayaclar.js'
import { filmlerHTML } from './filmler.js'
import { hizliyazmaHTML } from './hizliyazma.js'
import { oyunlarHTML } from './oyunlar.js' 
// YENİ FORUM İÇE AKTARIMI
import { forumHTML, setupForum } from './forum.js' 

document.querySelector('#app').innerHTML = `
  <div class="container">
    <nav class="navbar">
      <a href="#anasayfa" class="nav-link">Anasayfa</a>
      <a href="#sayaclar" class="nav-link">Sayaçlar</a>
      <a href="#filmler" class="nav-link">Film Kütüphanem</a>
      <a href="#hizliyazma" class="nav-link">Hızlı Yazma Testi</a>
      <a href="#oyunlar" class="nav-link">Oyunlar</a>
      <a href="#forum" class="nav-link">Forum</a> 
    </nav>
    <div id="page-content"></div>
  </div>
`

const pageContent = document.querySelector('#page-content');

const pages = {
  anasayfa: anasayfaHTML,
  sayaclar: sayaclarHTML,
  filmler: filmlerHTML,
  hizliyazma: hizliyazmaHTML,
  oyunlar: oyunlarHTML,
  forum: forumHTML // YENİ FORUM EKLENTİSİ
};

function renderPage() {
  const hash = window.location.hash.replace('#', '') || 'anasayfa';

  if (pages[hash]) {
    pageContent.innerHTML = pages[hash];
  } else {
    pageContent.innerHTML = '<h1 style="text-align:center; color:white;">404 - Sayfa Bulunamadı</h1>';
  }

  // Sayfalara göre ilgili JavaScript tetikleyicileri
  if (hash === 'sayaclar') {
    setupCounter(document.querySelector('#counter'));
    setupDateTracker();
  }
  if (hash === 'filmler') {
    setupMovieTracker();
  }
  if (hash === 'hizliyazma') {
    setupTypingTest();
  }
  if (hash === 'oyunlar') {
    setupSnakeGame();
    setupUcanKacanGame();

    const tabSnake = document.getElementById('tab-snake');
    const tabUk = document.getElementById('tab-ucankacan');
    const secSnake = document.getElementById('snake-section');
    const secUk = document.getElementById('ucankacan-section');

    tabSnake.onclick = () => {
      tabSnake.classList.add('active'); 
      tabUk.classList.remove('active');
      secSnake.style.display = 'block'; 
      secUk.style.display = 'none';
    };

    tabUk.onclick = () => {
      tabUk.classList.add('active'); 
      tabSnake.classList.remove('active');
      secUk.style.display = 'block'; 
      secSnake.style.display = 'none';
    };
  }
  // YENİ FORUM TETİKLEYİCİSİ
  if (hash === 'forum') {
    setupForum(); // Olay dinleyicisi sadece sayfa ekrana basıldıktan sonra çalışır!
  }

  // Aktif menüyü vurgula
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === '#' + hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('hashchange', renderPage);
renderPage();