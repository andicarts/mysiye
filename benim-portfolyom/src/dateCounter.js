export function setupDateTracker() {
  const nameInput = document.querySelector('#eventName');
  const dateInput = document.querySelector('#eventDate');
  const addBtn = document.querySelector('#addEventBtn');
  const eventList = document.querySelector('#eventList');

  // Tarayıcı hafızasından eski kayıtları al, yoksa boş bir liste başlat
  let records = JSON.parse(localStorage.getItem('dateRecords')) || [];

  // Ekrana kayıtları çizdirme fonksiyonu
  function renderList() {
    eventList.innerHTML = ''; // Önce listeyi temizle
    const bugun = new Date();

    // forEach içine 'index' parametresini ekledik, böylece hangi kaydı sileceğimizi bileceğiz
    records.forEach((record, index) => {
      const secilenTarih = new Date(record.date);
      const zamanFarki = bugun - secilenTarih;
      const gunFarki = Math.floor(zamanFarki / (1000 * 60 * 60 * 24));

      // Liste elemanını (li) oluştur
      const li = document.createElement('li');
      li.style.padding = "8px 0";
      li.style.borderBottom = "1px solid #eee";
      li.style.display = "flex"; // Yazı ve butonu yan yana düzgün göstermek için
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      
      // Kayıt yazısını oluştur
      const textSpan = document.createElement('span');
      textSpan.innerHTML = `<strong>${record.name}</strong>: ${gunFarki} gün geçti.`;

      // Sil butonunu oluştur
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Sil';
      deleteBtn.style.padding = "4px 8px";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.backgroundColor = "#ff4d4d"; // Kırmızımsı bir renk
      deleteBtn.style.color = "white";
      deleteBtn.style.border = "none";
      deleteBtn.style.borderRadius = "4px";

      // SİLME İŞLEMİ: Butona tıklandığında çalışacak kod
      deleteBtn.addEventListener('click', () => {
        // İlgili sıradaki (index) kaydı diziden çıkar
        records.splice(index, 1); 
        
        // Güncellenmiş diziyi tekrar localStorage'a kaydet
        localStorage.setItem('dateRecords', JSON.stringify(records)); 
        
        // Listeyi ekranda tekrar çiz (böylece silinen eleman kaybolur)
        renderList(); 
      });

      // Yazıyı ve butonu liste elemanına (li) ekle
      li.appendChild(textSpan);
      li.appendChild(deleteBtn);
      
      // En son liste elemanını ana listeye ekle
      eventList.appendChild(li);
    });
  }

  // Ekle butonuna tıklandığında çalışacak kodlar
  addBtn.addEventListener('click', () => {
    const nameValue = nameInput.value;
    const dateValue = dateInput.value;

    if (!nameValue || !dateValue) {
      alert("Lütfen hem bir isim hem de bir tarih girin!");
      return;
    }

    records.push({ name: nameValue, date: dateValue });
    localStorage.setItem('dateRecords', JSON.stringify(records));

    nameInput.value = '';
    dateInput.value = '';

    renderList();
  });

  // Sayfa ilk yüklendiğinde hafızadaki kayıtları ekrana çiz
  renderList();
}