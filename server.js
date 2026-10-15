const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const forecasts = {
  paris: [
    { date: "2026-10-27", temp: 16, condition: "cloudy" },
    { date: "2026-10-28", temp: 18, condition: "sunny" },
    { date: "2026-10-29", temp: 14, condition: "rain" },
    { date: "2026-10-30", temp: 15, condition: "cloudy" },
    { date: "2026-10-31", temp: 17, condition: "sunny" },
    { date: "2026-11-01", temp: 13, condition: "rain" },
    { date: "2026-11-02", temp: 12, condition: "cloudy" }
  ],
  london: [
    { date: "2026-10-27", temp: 13, condition: "rain" },
    { date: "2026-10-28", temp: 15, condition: "cloudy" },
    { date: "2026-10-29", temp: 14, condition: "cloudy" },
    { date: "2026-10-30", temp: 12, condition: "rain" },
    { date: "2026-10-31", temp: 16, condition: "sunny" },
    { date: "2026-11-01", temp: 11, condition: "rain" },
    { date: "2026-11-02", temp: 13, condition: "cloudy" }
  ],
  tokyo: [
    { date: "2026-10-27", temp: 21, condition: "sunny" },
    { date: "2026-10-28", temp: 20, condition: "cloudy" },
    { date: "2026-10-29", temp: 22, condition: "sunny" },
    { date: "2026-10-30", temp: 19, condition: "cloudy" },
    { date: "2026-10-31", temp: 18, condition: "rain" },
    { date: "2026-11-01", temp: 21, condition: "sunny" },
    { date: "2026-11-02", temp: 20, condition: "cloudy" }
  ],
  moscow: [
    { date: "2026-10-27", temp: 7, condition: "cloudy" },
    { date: "2026-10-28", temp: 9, condition: "rain" },
    { date: "2026-10-29", temp: 6, condition: "cloudy" },
    { date: "2026-10-30", temp: 8, condition: "rain" },
    { date: "2026-10-31", temp: 5, condition: "cloudy" },
    { date: "2026-11-01", temp: 7, condition: "sunny" },
    { date: "2026-11-02", temp: 4, condition: "cloudy" }
  ],
  newyork: [
    { date: "2026-10-27", temp: 17, condition: "sunny" },
    { date: "2026-10-28", temp: 19, condition: "sunny" },
    { date: "2026-10-29", temp: 16, condition: "cloudy" },
    { date: "2026-10-30", temp: 15, condition: "rain" },
    { date: "2026-10-31", temp: 18, condition: "cloudy" },
    { date: "2026-11-01", temp: 20, condition: "sunny" },
    { date: "2026-11-02", temp: 17, condition: "cloudy" }
  ]
};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", service: "weather-forecast", variant: 11 });
});

app.get("/api/forecast/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  const days = Number(req.query.days || 3);

  if (!Number.isInteger(days) || days < 1 || days > 7) {
    return res.status(400).json({ error: "days must be a number from 1 to 7" });
  }

  if (!forecasts[city]) {
    return res.status(404).json({ error: "City not supported" });
  }

  res.json(forecasts[city].slice(0, days));
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
