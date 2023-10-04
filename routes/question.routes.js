const express = require("express");
const fs = require("fs");
const router = express.Router();

// GET ALL questions
router.get("/", (req, res) => {
  // Đọc ra file questions và gửi trả về toàn bộ mảng questions

  // __dirname === root folder
  let questions = fs.readFileSync(`${__dirname}/../dev-data/questions.json`);
  questions = JSON.parse(questions);

  res.json({
    status: "success",
    questions, //  Cú pháp ES6
  });
});

// GET ONE question with id
router.get("/:id", (req, res) => {
  // Đọc ra file questions

  // __dirname === root folder
  let questions = fs.readFileSync(`${__dirname}/../dev-data/questions.json`);
  questions = JSON.parse(questions); // mảng

  // Trích xuất ra id từ params
  let { id } = req.params;

  // Tiến hành tìm kiếm đối tượng question có id == id ở trên params
  let question = questions.find((e, i) => e.id === Number(id));

  if (!question) {
    res.json({
      status: "fail",
      message: "Question not found", //  Cú pháp ES6
    });
  } else {
    res.json({
      status: "success",
      question, //  Cú pháp ES6
    });
  }
});

// POST new question
router.post("/", (req, res) => {
  // Lấy dữ liệu từ client gửi lên req.body
  let { content } = req.body;
  // Tạo ra id ngẫu nhiên
  let id = Math.floor(Math.random() * 100000000000000); // random 0 -- 0.9999999999

  // Tạo ra đối tượng question mới từ id, và req.body
  let question = {
    content,
    like: 0,
    dislike: 0,
    id,
  };
  // Đọc file questions.json
  // __dirname === root folder
  let questions = fs.readFileSync(`${__dirname}/../dev-data/questions.json`);
  questions = JSON.parse(questions); // mảng
  // Thêm mới đối tượng question vừa tạo ra vào trong mảng questions
  questions.push(question);

  fs.writeFileSync(
    `${__dirname}/../dev-data/questions.json`,
    JSON.stringify(questions)
  );
  // Res về một message là thêm mới thành công
  res.json({
    status: "success",
    message: "Question have been created",
  });
});

// PATCH question (update like và dislike)
router.patch("/:id", (req, res) => {
  // Lấy ra lượt like và dislike tại thời điểm client
  // Vừa thực hiện sự kiện like hoặc dislike
  let { like, dislike } = req.body;
  console.log(like, dislike);
  // Trích xuất ra id từ params
  let { id } = req.params;
  // Đọc file questions.json
  // __dirname === root folder
  let questions = fs.readFileSync(`${__dirname}/../dev-data/questions.json`);
  questions = JSON.parse(questions); // mảng
  // Tìm kiếm câu hỏi với id được gửi lên từ client trên params
  let questionIndex = questions.findIndex((e, i) => e.id === Number(id)); // -1
  if (questionIndex === -1) {
    res.json({
      status: "fail",
      message: "Question not found",
    });
  } else {
    // Tiến hành update các trường (like, dislike) trong question vừa tìm được
    questions[questionIndex].like = like;
    questions[questionIndex].dislike = dislike;
    fs.writeFileSync(
      `${__dirname}/../dev-data/questions.json`,
      JSON.stringify(questions)
    );
    // Res về một message là thêm mới thành công
    res.json({
      status: "success",
      message: "Question have been updated",
    });
  }

  // res cho client một message: update thành công
});

module.exports = router;
