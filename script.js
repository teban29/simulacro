// Obtener la dirección IP y ubicación
fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(data => {
    // Mostrar dirección IP
    document.getElementById("ip-address").textContent = `Su dirección IP: ${data.ip}`;

    // Actualizar mapa basado en la ubicación
    const mapIframe = document.querySelector("iframe");
    mapIframe.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${data.latitude},${data.longitude}`;

    // Generar y descargar archivo con los datos
    const deviceInfo = `IP: ${data.ip}\nUbicación: ${data.city}, ${data.region}, ${data.country_name}\nZona Horaria: ${data.timezone}`;
    const blob = new Blob([deviceInfo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `registro_${data.ip}.txt`;
    link.click();
  })
  .catch(error => {
    console.error("Error obteniendo la IP y ubicación:", error);
    document.getElementById("ip-address").textContent = "No se pudo obtener la dirección IP y ubicación.";
  });

// Obtener información básica del navegador y sistema operativo
const userAgent = navigator.userAgent;
let browserName = "Desconocido";
let operatingSystem = "Desconocido";

// Detectar navegador
if (userAgent.includes("Chrome")) browserName = "Google Chrome";
else if (userAgent.includes("Firefox")) browserName = "Mozilla Firefox";
else if (userAgent.includes("Safari")) browserName = "Safari";
else if (userAgent.includes("Edge")) browserName = "Microsoft Edge";
else if (userAgent.includes("Opera")) browserName = "Opera";

// Detectar sistema operativo
if (userAgent.includes("Windows")) operatingSystem = "Windows";
else if (userAgent.includes("Mac OS")) operatingSystem = "MacOS";
else if (userAgent.includes("Linux")) operatingSystem = "Linux";
else if (userAgent.includes("Android")) operatingSystem = "Android";
else if (userAgent.includes("like Mac")) operatingSystem = "iOS";

// Mostrar información del navegador y sistema operativo
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById("device-info").textContent = `
  Navegador: ${browserName}
  Sistema Operativo: ${operatingSystem}
  Zona horaria: ${timeZone}`;

// Mostrar información del dispositivo como identificador aproximado
document.getElementById("hostname").textContent = `Software del equipo: ${operatingSystem}`;
