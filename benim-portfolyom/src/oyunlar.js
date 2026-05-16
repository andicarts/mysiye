export const oyunlarHTML = `
  <div class="games-section animate-fade-in">
    <h1 class="page-title">Oyun Odası</h1>

    <div class="tabs-container">
      <button id="tab-snake" class="tab-btn active">Snake (Yılan)</button>
      <button id="tab-ucankacan" class="tab-btn">Uçan Kaçan</button>
    </div>

    <div id="snake-section" class="card" style="max-width: 440px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 1.1rem; font-weight: bold;">
        <div>Skor: <span id="snake-score" class="text-accent">0</span></div>
        <div>En Yüksek: <span id="snake-highscore" class="text-accent">0</span></div>
      </div>
      <canvas id="snakeCanvas" width="400" height="400" style="background-color: #0f172a; border: 2px solid #334155; border-radius: 8px; display: block; margin: 0 auto; max-width: 100%;"></canvas>
      <div style="margin-top: 15px;">
        <button id="start-snake-btn" class="btn primary-btn" style="width: 100%;">Oyunu Başlat</button>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 10px;">
          Yılanı yönlendirmek için <b>Yön Tuşlarını</b> kullanabilirsiniz.
        </p>
      </div>
    </div>

    <div id="ucankacan-section" class="card" style="max-width: 600px; margin: 0 auto; display: none;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 1.1rem; font-weight: bold;">
        <div>Skor: <span id="uk-score" class="text-accent">0</span></div>
        <div>En Yüksek: <span id="uk-highscore" class="text-accent">0</span></div>
      </div>
      <canvas id="ukCanvas" width="550" height="200" style="background-color: #0f172a; border: 2px solid #334155; border-radius: 8px; display: block; margin: 0 auto; max-width: 100%;"></canvas>
      <div style="margin-top: 15px;">
        <button id="start-uk-btn" class="btn primary-btn" style="width: 100%;">Oyunu Başlat</button>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 10px;">
          <b>Serdar Duman'ı</b> zıplatmak için <b>Boşluk (Space)</b> veya <b>Yukarı Yön</b> tuşunu kullanın.
        </p>
      </div>
    </div>

  </div>
`;