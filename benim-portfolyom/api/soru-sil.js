import mongoose from 'mongoose';

const Soru = mongoose.models.Soru || mongoose.model('Soru', new mongoose.Schema({}));

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ hata: "Sadece DELETE yöntemi!" });

  const { id, sifre } = req.body;
  
  // BURAYA GİZLİ ŞİFRENİ YAZ
  if (sifre !== "admin123") { 
    return res.status(401).json({ hata: "Yetkisiz erişim!" });
  }

  await mongoose.connect(process.env.MONGODB_URI);
  await Soru.findByIdAndDelete(id);
  res.status(200).json({ mesaj: "Soru silindi." });
}

