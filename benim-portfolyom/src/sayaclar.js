export const sayaclarHTML = `
  <div class="tools-section animate-fade-in">
    <h1 class="page-title">Sayaçlar</h1>
    
    <div class="cards-container">
      <div class="card">
        <h2>Tıklama Sayacı</h2>
        <button id="counter" type="button" class="btn primary-btn"></button>
      </div>

      <section id="date-tracker-section" class="card">
        <h2>Zaman Sayacı</h2>
        <div class="input-group">
          <input type="text" id="eventName" placeholder="Örn: Sınav Hazırlığı" class="input-field" />
          <input type="date" id="eventDate" class="input-field" />
          <button id="addEventBtn" type="button" class="btn primary-btn">Kaydet</button>
        </div>
        <ul id="eventList" class="event-list"></ul>
      </section>
    </div>
  </div>
`;