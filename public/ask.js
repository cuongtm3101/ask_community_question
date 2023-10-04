const form = document.getElementById("main-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let content = form.question.value;

  try {
    let res = await fetch("http://localhost:3000/api/v1/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    let data = await res.json();
    alert(data.message);
  } catch (error) {
    console.log(error);
  }
});
