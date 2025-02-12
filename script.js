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

// Obtener información básica del navegador y zona horaria
const userAgent = navigator.userAgent;
let browserName = "Desconocido";
if (userAgent.includes("Chrome")) browserName = "Google Chrome";
else if (userAgent.includes("Firefox")) browserName = "Mozilla Firefox";
else if (userAgent.includes("Safari")) browserName = "Safari";
else if (userAgent.includes("Edge")) browserName = "Microsoft Edge";
else if (userAgent.includes("Opera")) browserName = "Opera";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById("device-info").textContent = `
  Navegador: ${browserName}
  Zona horaria: ${timeZone}`;

// Mostrar nombre del equipo (hostname)
fetch("https://api.ipify.org?format=json") // Este punto se debe ajustar si se desea un hostname más específico
  .then(() => {
    const hostname = window.location.hostname || "Equipo Desconocido";
    document.getElementById("hostname").textContent = `Nombre del equipo: ${hostname}`;
  })
  .catch(error => {
    console.error("Error obteniendo el hostname:", error);
    document.getElementById("hostname").textContent = "No se pudo obtener el nombre del equipo.";
  });
