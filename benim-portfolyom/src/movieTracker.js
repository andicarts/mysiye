export function setupMovieTracker() {
  
  // --- SEKME (TAB) DEĞİŞTİRME MANTIĞI ---
  const tabWatched = document.querySelector('#tab-watched');
  const tabWatchlist = document.querySelector('#tab-watchlist');
  const sectionWatched = document.querySelector('#watched-section');
  const sectionWatchlist = document.querySelector('#watchlist-section');

  // "İzlediklerim" sekmesine tıklanınca
  tabWatched.addEventListener('click', () => {
    tabWatched.classList.add('active'); // Butonu mavi yap
    tabWatchlist.classList.remove('active'); // Diğer butonu gri yap
    sectionWatched.style.display = 'block'; // İzlediklerimi göster
    sectionWatchlist.style.display = 'none'; // İzleyeceklerimi gizle
  });

  // "İzlemek İstediklerim" sekmesine tıklanınca
  tabWatchlist.addEventListener('click', () => {
    tabWatchlist.classList.add('active');
    tabWatched.classList.remove('active');
    sectionWatchlist.style.display = 'block';
    sectionWatched.style.display = 'none';
  });


  // --- 1. İZLEDİKLERİM SİSTEMİ (Mevcut Sistem) ---
  const nameInput = document.querySelector('#movieName');
  const dateInput = document.querySelector('#movieDate');
  const posterInput = document.querySelector('#moviePoster');
  const addBtn = document.querySelector('#addMovieBtn');
  const movieGrid = document.querySelector('#movieGrid');

  let movies = JSON.parse(localStorage.getItem('myMovies')) || [];

  function renderMovies() {
    movieGrid.innerHTML = ''; 
    movies.forEach((movie, index) => {
      const letterboxdUrl = `https://letterboxd.com/search/${encodeURIComponent(movie.name)}/`;
      const posterSrc = movie.poster || 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Afiş+Yok';

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <a href="${letterboxdUrl}" target="_blank" class="movie-link">
          <img src="${posterSrc}" alt="${movie.name}" class="movie-poster" />
          <div class="movie-info">
            <h3 class="movie-title">${movie.name}</h3>
            <p class="movie-date">İzleme: ${movie.date}</p>
          </div>
        </a>
        <button class="delete-movie-btn" data-index="${index}" data-type="watched">Sil</button>
      `;
      movieGrid.appendChild(card);
    });
    bindDeleteButtons();
  }

  addBtn.addEventListener('click', () => {
    if (!nameInput.value || !dateInput.value) { alert("Lütfen film adı ve tarih girin!"); return; }
    movies.push({ name: nameInput.value, date: dateInput.value, poster: posterInput.value });
    localStorage.setItem('myMovies', JSON.stringify(movies));
    nameInput.value = ''; dateInput.value = ''; posterInput.value = '';
    renderMovies();
  });


  // --- 2. İZLEYECEKLERİM SİSTEMİ (Yeni Sistem) ---
  const watchNameInput = document.querySelector('#watchName');
  const watchPosterInput = document.querySelector('#watchPoster');
  const addWatchBtn = document.querySelector('#addWatchBtn');
  const watchlistGrid = document.querySelector('#watchlistGrid');

  // Farklı bir hafıza adı kullanıyoruz: 'myWatchlist'
  let watchlist = JSON.parse(localStorage.getItem('myWatchlist')) || [];

  function renderWatchlist() {
    watchlistGrid.innerHTML = ''; 
    watchlist.forEach((movie, index) => {
      const letterboxdUrl = `https://letterboxd.com/search/${encodeURIComponent(movie.name)}/`;
      const posterSrc = movie.poster || 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Afiş+Yok';

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <a href="${letterboxdUrl}" target="_blank" class="movie-link">
          <img src="${posterSrc}" alt="${movie.name}" class="movie-poster" />
          <div class="movie-info">
            <h3 class="movie-title">${movie.name}</h3>
            <p class="movie-date" style="color: #f59e0b;">İzlenecek</p>
          </div>
        </a>
        <button class="delete-movie-btn" data-index="${index}" data-type="watchlist">Sil</button>
      `;
      watchlistGrid.appendChild(card);
    });
    bindDeleteButtons();
  }

  addWatchBtn.addEventListener('click', () => {
    if (!watchNameInput.value) { alert("Lütfen en azından bir film adı girin!"); return; }
    watchlist.push({ name: watchNameInput.value, poster: watchPosterInput.value });
    localStorage.setItem('myWatchlist', JSON.stringify(watchlist));
    watchNameInput.value = ''; watchPosterInput.value = '';
    renderWatchlist();
  });

  // --- ORTAK SİLME FONKSİYONU ---
  function bindDeleteButtons() {
    document.querySelectorAll('.delete-movie-btn').forEach(btn => {
      // Olayın birden fazla kez eklenmesini önlemek için eski onclick özelliğini eziyoruz
      btn.onclick = (e) => {
        const indexToDelete = e.target.getAttribute('data-index');
        const listType = e.target.getAttribute('data-type'); // Hangi listeden silinecek?

        if (listType === 'watched') {
          movies.splice(indexToDelete, 1);
          localStorage.setItem('myMovies', JSON.stringify(movies));
          renderMovies();
        } else if (listType === 'watchlist') {
          watchlist.splice(indexToDelete, 1);
          localStorage.setItem('myWatchlist', JSON.stringify(watchlist));
          renderWatchlist();
        }
      };
    });
  }

  // Sayfa açıldığında her iki listeyi de tarayıcıya çiz
  renderMovies();
  renderWatchlist();
}