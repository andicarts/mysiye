export function setupTypingTest() {
  const textDisplay = document.getElementById('text-display');
  const typingInput = document.getElementById('typing-input');
  const timeLeftDisplay = document.getElementById('time-left');
  const wpmDisplay = document.getElementById('wpm-display');
  const accuracyDisplay = document.getElementById('accuracy-display');
  const restartBtn = document.getElementById('restart-btn');

  const wordsList = [
    "merhaba", "dünya", "yazılım", "geliştirici", "unity", "tasarım", "oyun", 
    "kod", "klavye", "bilgisayar", "programlama", "javascript", "dungeon", "master",
    "html", "css", "portfolyo", "ömer", "zaman", "proje", "hızlı", "yazma", 
    "testi", "başarı", "öğrenmek", "deneyim", "gelecek", "çalışmak", "mekanik"
  ];

  let words = [];
  let currentWordIndex = 0;
  let time = 60;
  let timer;
  let isPlaying = false;
  let correctKeystrokes = 0;
  let totalKeystrokes = 0;

  function initGame() {
    words = [];
    for(let i = 0; i < 100; i++) {
      words.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
    }
    
    currentWordIndex = 0;
    time = 60;
    isPlaying = false;
    correctKeystrokes = 0;
    totalKeystrokes = 0;
    clearInterval(timer);

    timeLeftDisplay.innerText = time;
    wpmDisplay.innerText = 0;
    accuracyDisplay.innerText = 100;
    typingInput.value = '';
    typingInput.disabled = false;
    
    renderWords();
  }

  function renderWords() {
    textDisplay.innerHTML = '';
    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.innerText = word + ' ';
      wordSpan.className = 'word';
      if (index === 0) wordSpan.classList.add('current-word');
      textDisplay.appendChild(wordSpan);
    });
    // Oyuna başlarken scroll'u en başa al
    textDisplay.scrollTop = 0; 
  }

  typingInput.addEventListener('input', () => {
    if (!isPlaying && time > 0) {
      isPlaying = true;
      timer = setInterval(updateTimer, 1000);
    }

    const currentWord = words[currentWordIndex];
    const typedValue = typingInput.value;
    const wordSpans = textDisplay.querySelectorAll('.word');

    if (typedValue.endsWith(' ')) {
      const typedWord = typedValue.trim();
      totalKeystrokes += typedValue.length;
      
      if (typedWord === currentWord) {
        wordSpans[currentWordIndex].classList.add('correct');
        correctKeystrokes += typedValue.length;
      } else {
        wordSpans[currentWordIndex].classList.add('incorrect');
      }
      
      wordSpans[currentWordIndex].classList.remove('current-word');
      wordSpans[currentWordIndex].classList.remove('typing-error');
      
      currentWordIndex++;
      typingInput.value = ''; 

      // YENİ, DÜZELTİLMİŞ KAYDIRMA SİSTEMİ
      if (currentWordIndex < words.length) {
        wordSpans[currentWordIndex].classList.add('current-word');
        
        // Elementi yumuşakça görünür alana getirir, gereksiz atlamaları önler
        wordSpans[currentWordIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      if (!currentWord.startsWith(typedValue)) {
        wordSpans[currentWordIndex].classList.add('typing-error');
      } else {
        wordSpans[currentWordIndex].classList.remove('typing-error');
      }
    }
  });

  function updateTimer() {
    time--;
    timeLeftDisplay.innerText = time;
    
    const minutesPassed = (60 - time) / 60;
    const wpm = minutesPassed > 0 ? Math.round((correctKeystrokes / 5) / minutesPassed) : 0;
    wpmDisplay.innerText = wpm;

    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
    accuracyDisplay.innerText = accuracy;

    if (time === 0) {
      clearInterval(timer);
      isPlaying = false;
      typingInput.disabled = true; 
    }
  }

  restartBtn.addEventListener('click', initGame);
  initGame();
}