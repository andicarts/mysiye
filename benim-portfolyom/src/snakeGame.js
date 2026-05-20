export function setupSnakeGame() {
  const canvas = document.getElementById('snakeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const scoreDisplay = document.getElementById('snake-score');
  const highscoreDisplay = document.getElementById('snake-highscore');
  const startBtn = document.getElementById('start-snake-btn');

  const gridSize = 20; // Her kare 20x20 piksel
  const tileCount = canvas.width / gridSize;

  let snake = [{ x: 10, y: 10 }];
  let food = { x: 5, y: 5 };
  let dx = 0; // X eksenindeki hız
  let dy = 0; // Y eksenindeki hız
  let score = 0;
  let highscore = localStorage.getItem('snakeHighscore') || 0;
  let gameInterval;
  let gameRunning = false;

  highscoreDisplay.innerText = highscore;

  function startGame() {
    if (gameRunning) return;
    
    snake = [{ x: 10, y: 10 }];
    generateFood();
    dx = 1; // Başlangıçta sağa doğru hareket et
    dy = 0;
    score = 0;
    scoreDisplay.innerText = score;
    gameRunning = true;
    startBtn.innerText = "Yeniden Başlat";
    
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100); // Her 100 milisaniyede bir ekranı güncelle (Oyun hızı)
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    
    // Yemin yılanın üstünde doğmamasını garanti et
    snake.forEach(part => {
      if (part.x === food.x && part.y === food.y) {
        generateFood();
      }
    });
  }

  function updateGame() {
    // Yılanın yeni kafa pozisyonunu hesapla
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Duvara çarpma kontrolü
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      gameOver();
      return;
    }

    // Kendine çarpma kontrolü
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        gameOver();
        return;
      }
    }

    // Yılanın kafasını hareket yönüne ekle
    snake.unshift(head);

    // Yem yeme kontrolü
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreDisplay.innerText = score;
      if (score > highscore) {
        highscore = score;
        highscoreDisplay.innerText = highscore;
        localStorage.setItem('snakeHighscore', highscore);
      }
      generateFood();
    } else {
      // Eğer yem yemediyse kuyruğu kısalt (böylece ilerlemiş olur)
      snake.pop();
    }

    drawGame();
  }

  function drawGame() {
    // Canvası temizle
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Yemi çiz (Kırmızı kare)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    // Yılanı çiz (Mavi tonları)
    snake.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? '#60a5fa' : '#3b82f6'; // Kafa açık mavi, gövde koyu mavi
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
  }

  function gameOver() {
    clearInterval(gameInterval);
    gameRunning = false;
    startBtn.innerText = "Oyunu Başlat";
    
    // Ekrana karartma perdesi çek
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Oyun bitti yazısı
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Oyun Bitti!', canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px sans-serif';
    ctx.fillText(`Skorunuz: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  }

  function handleKeyDown(e) {
    if (!gameRunning) return;
    const key = e.key.toLowerCase();
    
    // Geriye doğru ani dönüşleri engellemek için hız kontrolleri
    if ((key === 'arrowup' || key === 'w') && dy !== 1) { dx = 0; dy = -1; }
    if ((key === 'arrowdown' || key === 's') && dy !== -1) { dx = 0; dy = 1; }
    if ((key === 'arrowleft' || key === 'a') && dx !== 1) { dx = -1; dy = 0; }
    if ((key === 'arrowright' || key === 'd') && dx !== -1) { dx = 1; dy = 0; }

    // Oyun oynanırken yön tuşlarının sayfayı aşağı yukarı kaydırmasını önle
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key)) {
      e.preventDefault();
    }
  }

  // --- MOBİL DOKUNMATİK (SWIPE) KONTROLLERİ ---
  let touchStartX = 0;
  let touchStartY = 0;

  // Parmağın ekrana ilk dokunduğu an
  canvas.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: false });

  // Mobil cihazda oyun oynanırken ekranın kaymasını engelle
  canvas.addEventListener('touchmove', function(e) {
    if (gameRunning) {
      e.preventDefault();
    }
  }, { passive: false });

  // Parmağın ekrandan kalktığı an
  canvas.addEventListener('touchend', function(e) {
    if (!gameRunning) return;
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
  }, { passive: false });

  function handleSwipe(startX, startY, endX, endY) {
    let xDiff = endX - startX;
    let yDiff = endY - startY;

    // Çok küçük dokunmaları kaydırma olarak algılamaması için sınır (threshold)
    if (Math.abs(xDiff) < 30 && Math.abs(yDiff) < 30) return;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // Yatay Düzlem (Sağ / Sol)
      if (xDiff > 0 && dx !== -1) { dx = 1; dy = 0; } // Sağa kaydırma
      else if (xDiff < 0 && dx !== 1) { dx = -1; dy = 0; } // Sola kaydırma
    } else {
      // Dikey Düzlem (Yukarı / Aşağı)
      if (yDiff > 0 && dy !== -1) { dx = 0; dy = 1; } // Aşağı kaydırma
      else if (yDiff < 0 && dy !== 1) { dx = 0; dy = -1; } // Yukarı kaydırma
    }
  }
  // --------------------------------------------

  // Olay dinleyicilerini bağla (Çift tetiklemeyi önlemek için önce temizliyoruz)
  window.removeEventListener('keydown', handleKeyDown);
  window.addEventListener('keydown', handleKeyDown);
  startBtn.onclick = startGame;

  // İlk boş ekranı çiz
  drawGame();
}