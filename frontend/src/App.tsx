import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: "desk" | "laptop" | "chair";
  label: string;
  price: number;
};

const items: Item[] = [
  { id: "desk1", name: "desk", label: "Desk 1", price: 500 },
  { id: "desk2", name: "desk", label: "Desk 2", price: 700 },
  { id: "laptop1", name: "laptop", label: "Laptop 1", price: 1000 },
  { id: "laptop2", name: "laptop", label: "Laptop 2", price: 1200 },
  { id: "chair1", name: "chair", label: "Chair 1", price: 200 },
  { id: "chair2", name: "chair", label: "Chair 2", price: 300 }
];

export default function App() {
  const [budget, setBudget] = useState<number | null>(null);
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const [zoneOne, setZoneOne] = useState<{
    desk: Item | null;
    laptop: Item | null;
    chair: Item | null;
  }>({
    desk: null,
    laptop: null,
    chair: null
  });

  const [selectedItems, setSelectedItems] = useState<Record<string, string | null>>({
    desk: null,
    laptop: null,
    chair: null
  });

  useEffect(() => {
    fetch("http://localhost:3000/budget")
      .then(res => res.json())
      .then(data => {
        setBudget(data.budget);
        setRemainingBudget(data.budget);
      })
      .catch(console.error);
  }, []);

  const handleItemClick = (item: Item) => {
    if (remainingBudget !== null && item.price > remainingBudget) {
      alert("Бюджета не хватает!");
      return;
    }

    setZoneOne(prev => ({ ...prev, [item.name]: item }));
    setSelectedItems(prev => ({ ...prev, [item.name]: item.id }));
    setRemainingBudget(prev => (prev !== null ? prev - item.price : null));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      {!started ? (
        <div style={{ textAlign: "center" }}>
          <h1>IT Setup Simulator 🎮</h1>
          {budget === null ? (
            <p>Загружаем бюджет...</p>
          ) : (
            <>
              <h2>Ваш бюджет: ${budget}</h2>
              <button
                style={{ padding: "10px 20px", marginTop: 20, cursor: "pointer" }}
                onClick={() => setStarted(true)}
              >
                Начать
              </button>
            </>
          )}
        </div>
      ) : (
        // Сюда вставляем твой текущий код с зонами
        <div style={{ display: "flex", gap: 20 }}>
          {/* Левая зона — рабочее место */}
          <div style={{ flex: 5, border: "2px solid black", padding: 10 }}>
            <h2>Рабочее место</h2>
            <h3>Бюджет: ${remainingBudget} / ${budget}</h3>
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              {(["desk", "laptop", "chair"] as const).map(slot => (
                <div
                  key={slot}
                  style={{
                    flex: 1,
                    height: 150,
                    border: "1px dashed gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{slot.toUpperCase()}</span>
                  <span>{zoneOne[slot]?.label || "-"}</span>
                  {zoneOne[slot] && <span>${zoneOne[slot]?.price}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Правая зона — выбор предметов */}
          <div style={{ flex: 1, border: "2px solid blue", padding: 10 }}>
            <h2>Выбор предметов</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
              {items.map(item => {
                const isSelected = selectedItems[item.name] === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    style={{
                      opacity: isSelected ? 0.5 : 1,
                      padding: "10px",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    {item.label} (${item.price})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
