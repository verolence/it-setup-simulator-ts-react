import { Router } from "express";

const router = Router();

// функция для случайного бюджета от 1000 до 3000
function getRandomBudget() {
  const min = 1000;
  const max = 3000;
  const step = 100; // кратность 100
  const range = Math.floor((max - min) / step) + 1;
  const randomStep = Math.floor(Math.random() * range);
  return min + randomStep * step;
}

router.get("/", (req, res) => {
  const budget = getRandomBudget();
  res.json({ budget });
});

export default router;
