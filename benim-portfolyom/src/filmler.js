export const filmlerHTML = `
  <div class="movies-section animate-fade-in">
    <h1 class="page-title">Film Kütüphanem</h1>

    <div class="tabs-container">
      <button id="tab-watched" class="tab-btn active">İzlediklerim</button>
      <button id="tab-watchlist" class="tab-btn">İzlemek İstediklerim</button>
    </div>

    <div id="watched-section">
      <div class="card" style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem;">İzlediğim Film Ekle</h2>
        <div class="input-group" style="flex-wrap: wrap;">
          <input type="text" id="movieName" placeholder="Film Adı (Örn: The Man from Earth)" class="input-field" style="min-width: 200px;" />
          <input type="date" id="movieDate" class="input-field" />
          <input type="text" id="moviePoster" placeholder="Afiş Linki (URL)" class="input-field" style="min-width: 200px;" />
          <button id="addMovieBtn" type="button" class="btn primary-btn">Ekle</button>
        </div>
      </div>
      <div id="movieGrid" class="movie-grid"></div>
    </div>

    <div id="watchlist-section" style="display: none;">
      <div class="card" style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem;">İzlenecek Film Ekle</h2>
        <div class="input-group" style="flex-wrap: wrap;">
          <input type="text" id="watchName" placeholder="Film Adı (Örn: Inception)" class="input-field" style="min-width: 200px;" />
          <input type="text" id="watchPoster" placeholder="Afiş Linki (URL)" class="input-field" style="min-width: 200px;" />
          <button id="addWatchBtn" type="button" class="btn primary-btn">Listeye Ekle</button>
        </div>
      </div>
      <div id="watchlistGrid" class="movie-grid"></div>
    </div>

  </div>
`;