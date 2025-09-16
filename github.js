// Configrations
// const CACHE_EXPIRY = 24 * 60 * 60 * 1000;
const username = "raivenrt";
const url = `https://api.github.com/users/${username}/repos`;
const CACHE_EXPIRY = 5000;
const CACHE_KEY = `${username}_repos`;

/**
 * Determines whether the cache is still valid based on the provided timestamp.
 *
 * @param {number} timestamp - The timestamp (in milliseconds) when the cache was last updated.
 * @returns {boolean} Returns true if the cache is still valid; otherwise, false.
 */
function isCacheValid(timestamp) {
  return Date.now() - timestamp < CACHE_EXPIRY;
}

/**
 * Loads cached repository data from localStorage if available and valid.
 *
 * Checks if there is cached data for the user's repositories in localStorage.
 * If the cache exists and is still valid (not expired), it returns the cached repository data.
 * Otherwise, it returns false to indicate that fresh data should be fetched.
 *
 * @returns {Array|false} The cached repository data array if valid, or false if no valid cache exists.
 */
function loadCachedData() {
  const cached = localStorage.getItem(CACHE_KEY);

  // Load cached & valid data, using cache system to avoid github rate-limit block ^_^
  if (cached) {
    const parsed = JSON.parse(cached);

    if (isCacheValid(parsed.timestamp)) {
      console.log("%cUsing cached data ^_^", "color: green;font-size:2rem");
      return parsed.repos;
    }
  }

  return false;
}

/**
 * Fetches the user's GitHub repositories, utilizing a caching mechanism to reduce API calls.
 *
 * Attempts to load repository data from localStorage cache. If valid cached data exists,
 * it returns the cached repositories. Otherwise, it fetches fresh data from the GitHub API,
 * updates the cache, and returns the new data.
 *
 * @async
 * @returns {Promise<Array>} A promise that resolves to an array of repository objects.
 * @throws {string} Throws an error message if the fetch request fails.
 */
async function fetchRepos() {
  const cache = loadCachedData();
  if (cache) return cache;

  // Fetching repos when no cache are avilable or is expired
  console.log("%cCache not valid or expired(^!^)", "color: red;font-size:2rem");
  const res = await fetch(url, { method: "GET" });

  if (!res.ok) throw "An error has accourd while fetching the data";

  const repos = await res.json();
  const dataString = JSON.stringify({ repos, timestamp: Date.now() });

  localStorage.setItem(CACHE_KEY, dataString);

  return repos;
}

// Not used needs to Write a caching system -?> coming soon
async function getUsedLanguages(repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  );
  if (!res.ok) "An error accourd while fetching Languages";

  const languages = await res.json();
  return languages;
}

function createProjectMarkup({ name, description, topics }) {
  const repoMarkup = `
    <a class="project-card" target="_blank" href="https://${username}.github.io/${name}/">
      <div class="project-mockup">
        <img
          src="https://raw.githubusercontent.com/${username}/${name}/main/mockup.png"
          alt=${name}
        />
      </div>
      <div class="project-info">
        <h3 class="project-title">${name.replaceAll("-", " ")}</h3>
        <p class="project-description">
          ${description}
        </p>
        <div class="project-tech">
        ${topics
          .map((topic) => `<span class="tech-tag">${topic}</span>`)
          .join("")}
        </div>
      </div>
      </a>
  `;

  projectsContainer.insertAdjacentHTML("beforeend", repoMarkup);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRepos().then((repos) => {
    console.log(repos[0], repos[0].name, repos[0].topics, repos[0].languages);
    repos
      .filter(({ topics }) => topics.includes("portfolio"))
      .forEach((repo) => createProjectMarkup(repo));
  });
});
