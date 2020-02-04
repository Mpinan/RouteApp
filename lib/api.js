function readMovies() {
  fetch("http://localhost:3000/movies", {
    method: "GET"
  })
    .then(response => response.json())

    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
  console.log(response);
}

readMovies();
