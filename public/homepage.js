const questionContent = document.getElementsByClassName("question-content")[0];
const likeBtn = document.getElementById("like");
let randomQuestion = undefined;

fetch("http://localhost:3000/api/v1/questions")
  .then((res) => res.json())
  .then((data) => {
    let { questions } = data;
    let randomIndex = Math.floor(Math.random() * questions.length);
    // length = 10, index: [0 - 9]// [0 - 9,99999]
    // random*length [0 - 0.9999999*length]
    randomQuestion = questions[randomIndex];
    questionContent.innerHTML = randomQuestion.content;
  })
  .catch((err) => console.log(err));

likeBtn.onclick = async () => {
  try {
    let res = await fetch(
      `http://localhost:3000/api/v1/questions/${randomQuestion.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: randomQuestion.like + 1,
          dislike: randomQuestion.dislike,
        }),
      }
    );
    let data = await res.json();
    window.location.href = `/question-detail/${randomQuestion.id}`;
  } catch (error) {
    console.log(error);
  }
};
