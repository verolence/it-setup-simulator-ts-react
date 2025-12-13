import { useEffect, useState } from "react";

export default function App() {
  const [budget, setBudget] = useState<number | null>(null);

useEffect(() => {
  fetch("http://localhost:3000/budget")
    .then(res => res.json())
    .then(data => setBudget(data.budget))
    .catch(console.error);
}, []);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>IT Setup Simulator 🎮</h1>
      {budget === null ? (
        <p>Загружаем бюджет...</p>
      ) : (
        <h2>Ваш бюджет: ${budget}</h2>
      )}
    </div>
  );
}
