// Reemplaza TU_TOKEN_AQUI con el token que obtienes al registrarte en ipinfo.io
const API_TOKEN = "0ec06efd48ca18";

// Obtener la dirección IP y ubicación
fetch(`https://ipinfo.io?token=${API_TOKEN}`)
  .then(response => {
    if (!response.ok) throw new Error("Error al obtener datos de la API");
    return response.json();
  })
  .then(data => {
    // Mostrar dirección IP
    document.getElementById("ip-address").textContent = `Su dirección IP: ${data.ip}`;

    // Mostrar información adicional
    document.getElementById("hostname").textContent = `Ubicación del DataCenter: Cali, Colombia`;

    // Preparar información para descargar
    const deviceInfo = `IP: ${data.ip}\nUbicación: ${data.city}, ${data.region}, ${data.country}\nZona Horaria: ${data.timezone}`;
    
    // Crear y simular descarga del archivo
    const blob = new Blob([deviceInfo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.ip}.txt`;
    link.style.display = "none"; // Ocultar el enlace
    document.body.appendChild(link); // Agregar al DOM temporalmente
    link.click(); // Simular clic para descargar
    document.body.removeChild(link); // Eliminar el enlace después de la descarga
  })
  .catch(error => {
    console.error("Error al obtener la IP y ubicación:", error);
    document.getElementById("ip-address").textContent = "No se pudo obtener la dirección IP.";
    document.getElementById("hostname").textContent = "No se pudo determinar la ubicación.";
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
