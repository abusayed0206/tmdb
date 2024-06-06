const apiKey = '2b42438394973b5b48202c4c83a34183'; // Replace with your TMDB API Key

async function fetchTVShowDetails() {
    const tvShowId = prompt("Enter the TMDB TV Show ID:");
    if (!tvShowId) return;

    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&append_to_response=credits`);
    const tvShow = await response.json();

    const name = tvShow.name;
    const year = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : 'N/A';
    const genres = tvShow.genres.map(genre => genre.name).join(', ') || 'N/A';
    const ageRating = tvShow.adult ? '18+' : 'PG-13';
    const overview = tvShow.overview || 'N/A';
    const status = tvShow.status || 'N/A';
    const creator = tvShow.created_by ? tvShow.created_by.map(creator => creator.name).join(', ') : 'N/A';
    const topBilledCast = tvShow.credits.cast.slice(0, 5).map(actor => actor.name).join(', ') || 'N/A';
    const seasons = tvShow.number_of_seasons || 'N/A';
    const episodes = tvShow.number_of_episodes || 'N/A';
    const tmdbLink = `[TMDB Link](https://www.themoviedb.org/tv/${tvShowId})`;

    const markdown = `
| Detail            | Information    |
|-------------------|----------------|
| Name              | ${name}        |
| Year              | ${year}        |
| Genre             | ${genres}      |
| Age Rating        | ${ageRating}   |
| Overview          | ${overview}    |
| Status            | ${status}      |
| Creator           | ${creator}     |
| Top Billed Cast   | ${topBilledCast} |
| Seasons           | ${seasons}     |
| Episodes          | ${episodes}    |
| TMDB Link         | ${tmdbLink}    |
`;

    document.getElementById('markdown').textContent = markdown;
}

function copyMarkdown() {
    const markdown = document.getElementById('markdown').textContent;
    navigator.clipboard.writeText(markdown).then(() => {
        alert('Markdown copied to clipboard!');
    });
}
