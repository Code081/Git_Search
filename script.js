const searchInput = document.getElementById('search-input');
const Container = document.getElementById('results');

searchInput.addEventListener('input', handleSearch);

async function handleSearch() {
  const query = searchInput.value;

  if (query.length < 3) {
    Container.innerHTML = '';
    return;
  }

  const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
  const data = await response.json();

  if (response.ok) {
      const repositories = data.items;
      displayResults(repositories);
  } else {
    Container.innerHTML = `<p>Error: ${data.message}</p>`;
  }
}

function displayResults(repositories) {
  Container.innerHTML = '';

  repositories.forEach(repository => {
    const repoLink = document.createElement('a');
    repoLink.href = repository.html_url;
    repoLink.target = '_blank';
    repoLink.textContent = repository.name;

    const repoDiv = document.createElement('div');
    repoDiv.classList.add('repo');
    repoDiv.appendChild(repoLink);

    Container.appendChild(repoDiv);
  });
}