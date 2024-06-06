const apiKey = "2b42438394973b5b48202c4c83a34183"; // Replace with your TMDB API Key

async function fetchMovieDetails() {
  const movieId = prompt("Enter the TMDB movie ID:");
  if (!movieId) return;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`
  );
  const movie = await response.json();

  const name = movie.title;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const genres = movie.genres.map((genre) => genre.name).join(", ") || "N/A";
  const ageRating = movie.adult ? "18+" : "PG-13";
  const tagline = movie.tagline || "N/A";
  const overview = movie.overview || "N/A";
  const status = movie.status || "N/A";
  const runtime = data.runtime ? `${data.runtime} min` : 'N/A';
  const director =
    movie.credits.crew.find((person) => person.job === "Director")?.name ||
    "N/A";
  const writer =
    movie.credits.crew.find((person) => person.job === "Writer")?.name || "N/A";

  const topBilledCast =
    movie.credits.cast
      .slice(0, 5)
      .map((actor) => actor.name)
      .join(", ") || "N/A";
  const tmdbLink = `[TMDB Link](https://www.themoviedb.org/movie/${movieId})`;

  const markdown = `
| Detail        | Information    |
|---------------|----------------|
| Name          | ${name}        |
| Year          | ${year}        |
| Genre         | ${genres}      |
| Age Rating    | ${ageRating}   |
| Runtime       | ${runtime}     |
| Tagline       | ${tagline}     |
| Overview      | ${overview}    |
| Status        | ${status}      |
| Director      | ${director}    |
| Writer        | ${writer}      |
| Top Billed Cast | ${topBilledCast} |
| TMDB Link     | ${tmdbLink}    |
`;

  document.getElementById("markdown").textContent = markdown;
}

function copyMarkdown() {
  const markdown = document.getElementById("markdown").textContent;
  navigator.clipboard.writeText(markdown).then(() => {
    alert("Markdown copied to clipboard!");
  });
}
