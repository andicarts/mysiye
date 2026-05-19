import mongoose from 'mongoose';

// 1. Veritabanı Şemasını (Kuralını) Tanımlıyoruz
const soruSemasi = new mongoose.Schema({
  baslik: { type: String, required: true },
  icerik: { type: String, required: true },
  yazar_id: { type: String, required: true }, 
  olusturulma_tarihi: { type: Date, default: Date.now }
});

// Model daha önce oluşturulmadıysa yeni oluştur (Vercel Serverless yapısı için zorunlu)
const Soru = mongoose.models.Soru || mongoose.model('Soru', soruSemasi);

// 2. Ana API Fonksiyonu
export default async function handler(req, res) {
  // Sadece POST isteklerini kabul et
  if (req.method !== 'POST') {
    return res.status(405).json({ hata: "Sadece POST istekleri kabul edilir." });
  }

  try {
    // MongoDB'ye bağlan (Eğer zaten bağlı değilse)
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Ön yüzden gelen verileri alıyoruz
    const { baslik, icerik, yazar_id } = req.body;

    // Verilerin boş olup olmadığını kontrol et
    if (!baslik || !icerik || !yazar_id) {
      return res.status(400).json({ hata: "Lütfen tüm alanları doldurun." });
    }

    // Yeni soruyu oluştur ve veritabanına kaydet
    const yeniSoru = new Soru({ baslik, icerik, yazar_id });
    await yeniSoru.save();

    // Ön yüze başarılı sonucunu dön
    return res.status(200).json({ mesaj: "Soru başarıyla eklendi!", soru: yeniSoru });

  } catch (hata) {
    console.error("Veritabanı hatası:", hata);
    return res.status(500).json({ hata: "Sunucu hatası, soru kaydedilemedi." });
  }
}