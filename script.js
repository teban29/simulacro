// Obtener la dirección IP y ubicación
fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(data => {
    // Mostrar dirección IP
    document.getElementById("ip-address").textContent = `Su dirección IP: ${data.ip}`;

    // Mostrar información adicional (ciudad, país, etc.)
    document.getElementById("hostname").textContent = `Ubicacion de su Datacenter: Cali, Colombia`;

    // Generar y descargar archivo con los datos
    const deviceInfo = `IP: ${data.ip}\nUbicación: ${data.city}, ${data.region}, ${data.country_name}\nZona Horaria: ${data.timezone}`;
    const blob = new Blob([deviceInfo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.ip}.txt`;
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

// Detectar navegador usando criterios más específicos
if (userAgent.includes("Edg")) browserName = "Microsoft Edge";
else if (userAgent.includes("OPR") || userAgent.includes("Opera")) browserName = "Opera";
else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) browserName = "Google Chrome";
else if (userAgent.includes("Firefox")) browserName = "Mozilla Firefox";
else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browserName = "Safari";

// Detectar sistema operativo
if (userAgent.includes("Windows")) operatingSystem = "Windows";
else if (userAgent.includes("Mac OS")) operatingSystem = "MacOS";
else if (userAgent.includes("Linux")) operatingSystem = "Linux";
else if (userAgent.includes("Android")) operatingSystem = "Android";
else if (userAgent.includes("like Mac")) operatingSystem = "iOS";

// Obtener la zona horaria
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Mostrar información con saltos de línea
document.getElementById("device-info").innerHTML = `
  Navegador: ${browserName} <br>
  Sistema Operativo: ${operatingSystem} <br>
  Zona horaria: ${timeZone}`;
