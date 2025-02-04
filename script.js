// Obtener la dirección IP
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("ip-address").textContent = `Su dirección IP: ${data.ip}`;
  })
  .catch(error => {
    console.error("Error obteniendo la IP:", error);
    document.getElementById("ip-address").textContent = "No se pudo obtener la dirección IP.";
  });

// Obtener información del dispositivo
const userAgent = navigator.userAgent;
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

document.getElementById("device-info").textContent = `
  Información del dispositivo: 
  Navegador: ${userAgent}
  Resolución: ${screenWidth}x${screenHeight}
  Zona horaria: ${timeZone}
`;

// Botón para finalizar el simulacro
document.getElementById("retry-btn").addEventListener("click", () => {
  alert("Simulacro finalizado. Mantén tus datos seguros.");
  window.location.href = "https://github.com"; // Redirigir a una página segura.
});
