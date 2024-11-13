import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.port || 5000;
 
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
 });
