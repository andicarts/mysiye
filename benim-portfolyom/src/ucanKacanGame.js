export function setupUcanKacanGame() {
  const canvas = document.getElementById('ukCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const scoreDisplay = document.getElementById('uk-score');
  const highscoreDisplay = document.getElementById('uk-highscore');
  const startBtn = document.getElementById('start-uk-btn');

  let score = 0;
  let highscore = localStorage.getItem('ukHighscore') || 0;
  highscoreDisplay.innerText = highscore;

  let gameRunning = false;
  let animationId;
  let frameCount = 0;
  let gameSpeed = 5;

  // Ana Karakterimiz Serdar Duman'ın Fiziksel Özellikleri
  const serdar = {
    x: 50,
    y: 150,
    width: 30,
    height: 30,
    dy: 0,
    jumpPower: -10, // Zıplama gücü
    gravity: 0.5,   // Yerçekimi ivmesi
    grounded: true
  };

  const groundHeight = 20;
  let obstacles = [];

  function resetGame() {
    serdar.y = canvas.height - groundHeight - serdar.height;
    serdar.dy = 0;
    serdar.grounded = true;
    obstacles = [];
    score = 0;
    gameSpeed = 5;
    frameCount = 0;
    scoreDisplay.innerText = score;
  }

  function startGame() {
    if (gameRunning) return;
    resetGame();
    gameRunning = true;
    startBtn.innerText = "Yeniden Başlat";
    // Eski animasyon varsa temizle ve yenisini başlat
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(updateGame);
  }

  function jump(e) {
    if (!gameRunning) return;
    // Boşluk veya Yukarı yön tuşuna basıldığında
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      // Eğer Serdar yerdeyse zıplayabilir (Havada çift zıplamayı engeller)
      if (serdar.grounded) {
        serdar.dy = serdar.jumpPower;
        serdar.grounded = false;
      }
    }
  }

  function updateGame() {
    if (!gameRunning) return;

    // --- FİZİK KURALLARI ---
    serdar.dy += serdar.gravity; // Yerçekimini hıza ekle
    serdar.y += serdar.dy;       // Hızı konuma ekle

    // Yere çarpma kontrolü
    if (serdar.y + serdar.height >= canvas.height - groundHeight) {
      serdar.y = canvas.height - groundHeight - serdar.height;
      serdar.dy = 0;
      serdar.grounded = true;
    }

    // --- ENGELLER ---
    frameCount++;
    // Belli aralıklarla yeni engel üret (Oyun hızlandıkça aralık daralabilir)
    if (frameCount % 90 === 0) { 
      let obsHeight = Math.random() > 0.5 ? 30 : 45; // Engeller iki farklı boyda gelebilir
      obstacles.push({
        x: canvas.width,
        y: canvas.height - groundHeight - obsHeight,
        width: 20,
        height: obsHeight
      });
      gameSpeed += 0.05; // Oyun ilerledikçe yavaşça hızlansın
    }

    for (let i = 0; i < obstacles.length; i++) {
      let obs = obstacles[i];
      obs.x -= gameSpeed; // Engeli sola doğru kaydır

      // Çarpışma (Collision) Kontrolü
      if (
        serdar.x < obs.x + obs.width &&
        serdar.x + serdar.width > obs.x &&
        serdar.y < obs.y + obs.height &&
        serdar.y + serdar.height > obs.y
      ) {
        gameOver();
        return;
      }
    }

    // Ekrandan çıkan (arkada kalan) engelleri diziden silerek hafızayı temizle
    obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

    // --- SKOR ---
    if (frameCount % 10 === 0) {
      score++;
      scoreDisplay.innerText = score;
      if (score > highscore) {
        highscore = score;
        localStorage.setItem('ukHighscore', highscore);
        highscoreDisplay.innerText = highscore;
      }
    }

    drawGame();
    // Oyun döngüsünü akıcı bir şekilde devam ettir (60 FPS)
    animationId = requestAnimationFrame(updateGame);
  }

  function drawGame() {
    // Arka plan
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Zemin
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - groundHeight);
    ctx.lineTo(canvas.width, canvas.height - groundHeight);
    ctx.stroke();

    // Serdar Duman (Karakter)
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(serdar.x, serdar.y, serdar.width, serdar.height);
    
    // Karakterin İsmi
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '12px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Serdar Duman', serdar.x + serdar.width / 2, serdar.y - 8);

    // Engeller (Kırmızı)
    ctx.fillStyle = '#ef4444';
    obstacles.forEach(obs => {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
  }

  function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    startBtn.innerText = "Oyunu Başlat";

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Yakalandın!', canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px sans-serif';
    ctx.fillText(`Skorunuz: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  }

  // Olayları (Event) Bağlama
  window.removeEventListener('keydown', jump); // Çift tetiklenmeyi önle
  window.addEventListener('keydown', jump);
  startBtn.onclick = startGame;

  // Başlangıç ekranını çiz
  drawGame();
}