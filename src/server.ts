import http from "http";
import app from "./app";
import { connectDB } from "./config/db.config";

const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/mern-stack";



//* http server
const server = http.createServer(app);

//* database connect
connectDB(DB_URI);

//* server listen
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});