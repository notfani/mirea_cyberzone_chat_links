function generateComplexCaptcha() {
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const captchaLength = 6;
  let captchaText = "";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 30; i++) {
    ctx.strokeStyle = getRandomColor();
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  for (let i = 0; i < captchaLength; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    captchaText += char;
    ctx.font = `${Math.floor(Math.random() * 10) + 20}px Arial`;
    ctx.fillStyle = getRandomColor();
    ctx.save();
    ctx.translate(30 * i + 15, 25);
    ctx.rotate((Math.random() - 0.5) * 0.5);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }

  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = getRandomColor();
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  document.getElementById("captchaValue").value = captchaText;

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

window.onload = function () {
  generateComplexCaptcha();
  document.getElementById("captcha-submit").addEventListener("click", handleCaptchaSubmit);
};

function handleCaptchaSubmit() {
  const userInput = document.getElementById("captcha-input").value;
  const correctCaptcha = document.getElementById("captchaValue").value;
  const message = document.getElementById("captcha-message");

  if (!userInput) {
    message.textContent = "Введите CAPTCHA.";
    message.style.color = "orange";
    return;
  }

  if (userInput === correctCaptcha) {
    message.textContent = "CAPTCHA успешно пройдена!";
    message.style.color = "green";
    document.getElementById("captcha-overlay").style.display = "none";
    document.getElementById("content").style.display = "block";
  } else {
    message.textContent = "Неверная CAPTCHA. Попробуйте снова.";
    message.style.color = "red";
    document.getElementById("captcha-input").value = "";
    generateComplexCaptcha();
  }
}
