export const hizliyazmaHTML = `
  <div class="typing-section animate-fade-in">
    <h1 class="page-title">Hızlı Yazma Testi</h1>
    
    <div class="card" style="max-width: 800px; margin: 0 auto;">
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 1.2rem; font-weight: bold;">
        <div>Süre: <span id="time-left" class="text-accent">60</span>s</div>
        <div>WPM (Kelime/Dk): <span id="wpm-display" class="text-accent">0</span></div>
        <div>Doğruluk: <span id="accuracy-display" class="text-accent">100</span>%</div>
      </div>

      <div id="text-display" style="position: relative; font-size: 1.5rem; line-height: 1.8; margin-bottom: 20px; text-align: left; padding: 15px; background: #0f172a; border-radius: 8px; height: 160px; overflow-y: auto; border: 1px solid #334155;">
        </div>

      <div class="input-group">
        <input type="text" id="typing-input" class="input-field" placeholder="Yazmaya başlamak için buraya tıklayın ve yazın..." autocomplete="off" style="font-size: 1.2rem; padding: 15px;" />
        <button id="restart-btn" class="btn primary-btn">Yeniden Başla</button>
      </div>
      
    </div>
  </div>
`;