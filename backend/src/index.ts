import express from "express";
import budgetRouter from "./routes/budget";

const app = express();
const PORT = 3000;

// подключаем роут
app.use("/budget", budgetRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
