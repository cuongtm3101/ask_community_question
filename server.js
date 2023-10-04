// B1: Require các packages cần thiết
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// B2: Khởi tạo 1 biến server
const server = express();

// B2.2: Import các routes cần thiết
const questionRoutes = require("./routes/question.routes");

// B3: Sử dụng các third-party middlewares, packages cần thiết
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

// B3.2: Sử dụng các routes đã được tách ra

server.use("/api/v1/questions", questionRoutes);

// B4: Khởi tạo các endpoint, url, http request ở trên server

server.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/homepage.html`);
});

server.get("/ask", (req, res) => {
  res.sendFile(`${__dirname}/public/ask.html`);
});

server.get("/question-detail/:id", (req, res) => {
  res.sendFile(`${__dirname}/public/question-detail.html`);
});

// B5: Bật server, cho server vào trong trạng thái luôn lắng nghe
// Tại một cổng nào đó (3000);

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
