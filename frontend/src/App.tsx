import React, { useEffect, useState } from "react";

function App() {
  const [budget, setBudget] = useState<number | null>(null);

  useEffect(() => {
    fetch("/budget") // прокси перенаправит на backend:3000
      .then((res) => res.json())
      .then((data) => setBudget(data.budget))
      .catch((err) => console.error("Ошибка при загрузке бюджета:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 50, fontFamily: "sans-serif" }}>
      <h1>Добро пожаловать в игру 🎮</h1>
      {budget !== null ? (
        <h2>Ваш бюджет: ${budget}</h2>
      ) : (
        <p>Загружаем бюджет...</p>
      )}
    </div>
  );
}

export default App;
