import express from "express";
import budgetRouter from "./routes/budget";
import cors from "cors"; 

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:1234"  // фронт Parcel
}));

// подключаем роут
app.use("/budget", budgetRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
