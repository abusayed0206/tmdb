const apiKey = '2b42438394973b5b48202c4c83a34183'; // Replace with your TMDB API Key

async function fetchDetails() {
    const type = document.getElementById('type').value;
    let id;
    if (type === 'movie') {
        id = prompt("Enter the TMDB Movie ID:");
    } else if (type === 'tv') {
        id = prompt("Enter the TMDB TV Show ID:");
    }
    if (!id) return;

    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&append_to_response=credits`);
    const data = await response.json();

    let name, year, genres, ageRating, overview, status, creator, topBilledCast, tmdbLink, runtime;
    if (type === 'movie') {
        name = data.title;
        year = data.release_date ? new Date(data.release_date).getFullYear() : 'N/A';
        genres = data.genres.map(genre => genre.name).join(', ') || 'N/A';
        ageRating = data.adult ? '18+' : 'PG-13';
        overview = data.overview || 'N/A';
        status = data.status || 'N/A';
        creator = 'N/A';
        topBilledCast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ') || 'N/A';
        tmdbLink = `[TMDB Link](https://www.themoviedb.org/movie/${id})`;
        runtime = data.runtime ? `${data.runtime} min` : 'N/A';
    } else if (type === 'tv') {
        name = data.name;
        year = data.first_air_date ? new Date(data.first_air_date).getFullYear() : 'N/A';
        genres = data.genres.map(genre => genre.name).join(', ') || 'N/A';
        ageRating = data.adult ? '18+' : 'PG-13';
        overview = data.overview || 'N/A';
        status = data.status || 'N/A';
        creator = data.created_by ? data.created_by.map(creator => creator.name).join(', ') : 'N/A';
        topBilledCast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ') || 'N/A';
        tmdbLink = `[TMDB Link](https://www.themoviedb.org/tv/${id})`;
        runtime = data.episode_run_time.length > 0 ? `${data.episode_run_time[0]} min` : 'N/A';
    }

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
| Runtime           | ${runtime}     |
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
