import { useEffect, useState } from "react";

export default function App() {
  const [budget, setBudget] = useState<number | null>(null);

useEffect(() => {
  fetch("http://localhost:3000/budget")
    .then(res => res.json())
    .then(data => setBudget(data.budget))
    .catch(console.error);
}, []);

// тип предмета
type Item = {
  id: string;
  name: "desk" | "laptop" | "chair";
  label: string; // для отображения текста, можно потом заменить на картинку
};

// Слоты в ZoneOne
const [zoneOne, setZoneOne] = useState<{
  desk: Item | null;
  laptop: Item | null;
  chair: Item | null;
}>({ desk: null, laptop: null, chair: null });

// Выбор для ZoneTwo (для прозрачности)
const [selectedItems, setSelectedItems] = useState<Record<string, string | null>>({
  desk: null,
  laptop: null,
  chair: null
});

const items: Item[] = [
  { id: "desk1", name: "desk", label: "Desk 1" },
  { id: "desk2", name: "desk", label: "Desk 2" },
  { id: "laptop1", name: "laptop", label: "Laptop 1" },
  { id: "laptop2", name: "laptop", label: "Laptop 2" },
  { id: "chair1", name: "chair", label: "Chair 1" },
  { id: "chair2", name: "chair", label: "Chair 2" }
];

const handleItemClick = (item: Item) => {
  setZoneOne(prev => ({ ...prev, [item.name]: item }));
  setSelectedItems(prev => ({ ...prev, [item.name]: item.id }));
};


  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>IT Setup Simulator 🎮</h1>
      {budget === null ? (
        <p>Загружаем бюджет...</p>
      ) : (
        <h2>Ваш бюджет: ${budget}</h2>
      )}
      {/* ZoneOne */}
      <div style={{ border: "2px solid black", padding: 10, marginBottom: 20 }}>
        <h2>Zone One</h2>
        <div style={{ display: "flex", gap: 20 }}>
          {(["desk", "laptop", "chair"] as const).map(slot => (
            <div key={slot} style={{ width: 100, height: 100, border: "1px dashed gray", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {zoneOne[slot]?.label || slot.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* ZoneTwo */}
      <div style={{ border: "2px solid blue", padding: 10 }}>
        <h2>Zone Two</h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {items.map(item => {
            const isSelected = selectedItems[item.name] === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{ opacity: isSelected ? 0.5 : 1, padding: "10px 20px", cursor: "pointer" }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
