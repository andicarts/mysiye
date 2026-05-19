import mongoose from 'mongoose';

// Soru eklerken kullandığımız şemanın aynısını buraya da koyuyoruz ki veriyi tanısın
const soruSemasi = new mongoose.Schema({
  baslik: { type: String, required: true },
  icerik: { type: String, required: true },
  yazar_id: { type: String, required: true }, 
  olusturulma_tarihi: { type: Date, default: Date.now }
});

const Soru = mongoose.models.Soru || mongoose.model('Soru', soruSemasi);

export default async function handler(req, res) {
  // Bu sefer sadece GET (okuma) isteklerini kabul ediyoruz
  if (req.method !== 'GET') {
    return res.status(405).json({ hata: "Sadece GET istekleri kabul edilir." });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Veritabanındaki tüm soruları bul ve tarihe göre en yeniler en üstte olacak şekilde sırala (-1)
    const sorular = await Soru.find({}).sort({ olusturulma_tarihi: -1 });

    // Bulunan soruları ön yüze gönder
    return res.status(200).json(sorular);

  } catch (hata) {
    console.error("Soruları çekerken hata:", hata);
    return res.status(500).json({ hata: "Sorular yüklenemedi." });
  }
}