const form = document.getElementById("forecast-form");
const forecast = document.getElementById("forecast");
const message = document.getElementById("message");

if (form && forecast && message) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = document.getElementById("city").value;
    const days = document.getElementById("days").value;
    forecast.replaceChildren();
    message.textContent = "Загрузка прогноза...";

    try {
      const response = await fetch(`/api/forecast/${encodeURIComponent(city)}?days=${encodeURIComponent(days)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Не удалось получить прогноз");
      }

      data.forEach((item) => {
        const card = document.createElement("article");
        card.className = "weather-card";
        const title = document.createElement("h3");
        title.textContent = item.date;
        const temperature = document.createElement("p");
        temperature.textContent = `Температура: ${item.temp} °C`;
        const condition = document.createElement("p");
        condition.textContent = `Условия: ${item.condition}`;
        card.append(title, temperature, condition);
        forecast.appendChild(card);
      });

      message.textContent = `Прогноз получен: ${data.length} дн.`;
    } catch (error) {
      message.textContent = error.message;
    }
  });

  form.requestSubmit();
}
