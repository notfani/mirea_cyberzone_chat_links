function generateCaptcha() {
  const captchaValue = Math.random().toString(36).substring(2, 8);
  document.getElementById("captchaValue").value = captchaValue;

  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Добавление фона
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Добавление шума
  for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random()})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
  }

  // Добавление линий
  for (let i = 0; i < 15; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random()})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
  }

  // Добавление искаженного разноцветного текста
  ctx.font = "30px Arial";
  for (let i = 0; i < captchaValue.length; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`; // Разноцветные символы
      ctx.setTransform(1, Math.random() * 0.3, Math.random() * 0.3, 1, 0, 0); // Искажение текста
      ctx.fillText(captchaValue[i], 20 + i * 30, 50);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Сброс трансформации
}

// Проверка CAPTCHA и декодирование контента
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

      // Декодирование контента из Base64
      const encodedContent = "aHR0cHM6Ly92ay5jb20vYWxfZmVlZC5waHA="; // Пример закодированного контента
      const decodedContent = atob(encodedContent);

      // Отображение контента
      document.getElementById("content").innerHTML = `
          <h1>Добро пожаловать на защищённую страницу!</h1>
          <p>${decodedContent}</p>
      `;
  } else {
      message.textContent = "Неверная CAPTCHA. Попробуйте снова.";
      message.style.color = "red";
      document.getElementById("captcha-input").value = "";
      generateCaptcha(); // Генерация новой CAPTCHA при неудачной попытке
  }
}

// Инициализация
window.addEventListener("load", generateCaptcha); // Генерация CAPTCHA при загрузке страницы
document.getElementById("captcha-submit").addEventListener("click", handleCaptchaSubmit); // Обработчик отправки CAPTCHA