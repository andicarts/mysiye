export const forumHTML = `
  <div class="icerik-bolumu">
    <h2 style="color: white; text-align: center; margin-bottom: 20px;">Topluluk Forumu</h2>
    <div class="forum-kapsayici">
      <form id="soruFormu">
        <div class="form-grup">
          <label for="baslik">Soru Başlığı:</label>
          <input type="text" id="baslik" name="baslik" required placeholder="Sorunu kısaca özetle...">
        </div>
        <div class="form-grup">
          <label for="icerik">Sorunun Detayı:</label>
          <textarea id="icerik" name="icerik" rows="5" required placeholder="Sorunun detaylarını buraya yazabilirsin..."></textarea>
        </div>
        <div class="form-grup">
          <label for="yazar_id">Kullanıcı Adın / ID (Geçici):</label>
          <input type="text" id="yazar_id" name="yazar_id" required placeholder="Örn: omer123">
        </div>
        <button type="submit" class="forum-buton">Soruyu Gönder</button>
      </form>
      <p id="sonucMesaji"></p>
      <div id="sorular-listesi" style="margin-top: 30px;"></div>
    </div>
  </div>
`;

export function setupForum() {
  const soruFormu = document.getElementById('soruFormu');
  const sonucMesaji = document.getElementById('sonucMesaji');
  const listeKutusu = document.getElementById('sorular-listesi');

  // Soru Ekleme İşlemi
  soruFormu.addEventListener('submit', async function(olay) {
    olay.preventDefault();
    const baslik = document.getElementById('baslik').value;
    const icerik = document.getElementById('icerik').value;
    const yazar_id = document.getElementById('yazar_id').value;

    const response = await fetch('/api/soru-ekle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baslik, icerik, yazar_id })
    });

    if (response.ok) {
      sonucMesaji.textContent = "Soru başarıyla eklendi!";
      soruFormu.reset();
      sorulariYukle(); // Listeyi güncelle
    }
  });

  // Soruları Yükleme ve Silme İşlemlerini Yöneten Fonksiyon
  async function sorulariYukle() {
    listeKutusu.innerHTML = '<p style="color: white;">Yükleniyor...</p>';
    const cevap = await fetch('/api/sorulari-getir');
    const sorular = await cevap.json();
    listeKutusu.innerHTML = '';

    sorular.forEach(soru => {
      const tarih = new Date(soru.olusturulma_tarihi).toLocaleDateString('tr-TR');
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const silButonu = isAdmin ? `<button class="sil-btn" data-id="${soru._id}" style="background: red; color: white; border: none; padding: 5px; cursor: pointer;">Sil</button>` : '';

      const soruKarti = document.createElement('div');
      soruKarti.style.cssText = "background: #1e293b; padding: 15px; border-radius: 8px; margin-bottom: 10px; color: white;";
      soruKarti.innerHTML = `<h3>${soru.baslik}</h3><p>${soru.icerik}</p><div>${tarih}</div>${silButonu}`;
      listeKutusu.appendChild(soruKarti);
    });
  }

  // EVENT DELEGATION: Tıklamayı kutu üzerinden yakalıyoruz (En garantili yöntem)
  listeKutusu.addEventListener('click', async (e) => {
    if (e.target.classList.contains('sil-btn')) {
      const id = e.target.getAttribute('data-id');
      
      if (!confirm("Bu soruyu silmek istediğine emin misin?")) return;

      const cevap = await fetch('/api/soru-sil', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, sifre: "admin123" })
      });

      if (cevap.ok) {
        alert("Soru silindi!");
        sorulariYukle();
      } else {
        alert("Yetkisiz işlem!");
      }
    }
  });

  sorulariYukle();
}