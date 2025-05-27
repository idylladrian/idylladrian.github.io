function getRandomSite(sites, excludeIndex) {
  let idx;
  do {
    idx = Math.floor(Math.random() * sites.length);
  } while (idx === excludeIndex); // avoid random = current site
  return sites[idx];
}
fetch('https://adrianontheweb.net/catskill-webring/webring.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load webring.json");
    return response.json();
  })
  .then(webringSites => {
    console.log("Webring sites loaded:", webringSites);

    const currentUrl = window.location.href;
    const currentIndex = webringSites.findIndex(site => currentUrl.includes(site.url));
    console.log("currentUrl:", currentUrl);
    console.log("currentIndex:", currentIndex);

    if (currentIndex === -1) throw new Error("Current site not found in webring");

    const total = webringSites.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    const prevSite = webringSites[prevIndex];
    const nextSite = webringSites[nextIndex];

    const container = document.getElementById('webring');
    if (!container) throw new Error("No #webring container found in DOM");

    container.innerHTML = `
	  <nav style="margin: 1em 0; 
	  padding: 0.5em; 
	  border: 1px solid #ccc; 
	  border-radius: 8px; 
	  text-align: center;
	  background-image: url('/catskill-webring/webring.jpg'); 
	  background-size: 600px 300px;
	  ">
		<strong>Catskill Webring</strong><br><br>
		<a href="${prevSite.url}" style="margin: 0 1em;">⬅ Prev</a>
		<a href="${getRandomSite(webringSites, currentIndex).url}" style="margin: 0 1em;">🎲 Random</a>
		<a href="${nextSite.url}" style="margin: 0 1em;">Next ➡</a>
	  </nav>
	`;
  })
  .catch(error => {
    console.error("Webring error:", error);
    const container = document.getElementById('webring');
    if (container) container.innerText = "Failed to load webring data.";
  });