const questionContent = document.getElementsByClassName("question-content")[0];
const voteNumber = document.getElementsByClassName("vote-number")[0];
const like = document.getElementsByClassName("like")[0];
const dislike = document.getElementsByClassName("dislike")[0];

const id =
  window.location.href.split("/")[window.location.href.split("/").length - 1];

fetch("http://localhost:3000/api/v1/questions/" + id)
  .then((res) => res.json())
  .then((data) => {
    questionContent.innerHTML = data.question.content;
    voteNumber.innerHTML = data.question.like + data.question.like;

    // like
    like.innerHTML = `${
      (data.question.like / (data.question.like + data.question.dislike)) * 100
    }%`;
    like.style.width = like.innerHTML;
    // dislike
    dislike.innerHTML = `${
      (1 - data.question.like / (data.question.like + data.question.dislike)) *
      100
    }`;
    dislike.style.width = dislike.innerHTML;
  })
  .catch((err) => {
    console.log(err);
  });
