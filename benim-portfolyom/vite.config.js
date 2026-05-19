import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Vercel'in ve Windows'un anlaştığı ortak IP adresi:
    host: '127.0.0.1', 
    
    // Vite'a diyoruz ki: "İnat etme, Vercel sana hangi portu verdiyse onu kullan!"
    port: process.env.PORT || 5173 
  }
});