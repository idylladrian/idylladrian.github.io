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
	  <nav style="
		// margin: 1em 0;
		// padding: 1.5em; 
		border: 1px solid #ccc;
		// border-radius: 8px;
		// text-align: right;
		background-image: url('https://adrianontheweb.net/catskill-webring/webring.jpg');
		background-size: 20vw 10vw;
		background-position: center;
		width: 20vw;
		height: 10vw;
		color: white; /* optional for contrast */
		margin-left: auto;
		margin-right: auto;
		
		@media (max-width: 600px) {
			background-size: 40vw 20vw;
			width: 40vw;
			height: 20vw;	
		}
		
	  ">
		<div style="
			position: relative;
			left: 45%;
			top: 20%;
			width: 50%;
			text-align: right;
			font-size: 1.5vw;
			@media (max-width: 600px) {
				font-size: 3vw;
			}
		">
			<a href="${prevSite.url}" style="margin: 0 1em; color: white; text-shadow: 0 0 2px black;">⬅ Prev</a><br>
			<a href="${getRandomSite(webringSites, currentIndex).url}" style="margin: 0 1em; color: white; text-shadow: 0 0 2px black;">Random</a><br>
			<a href="${nextSite.url}" style="margin: 0 1em; color: white; text-shadow: 0 0 2px black;">Next ➡</a>
		</div>
	  </nav>
	`;
  })
  .catch(error => {
    console.error("Webring error:", error);
    const container = document.getElementById('webring');
    if (container) container.innerText = "Failed to load webring data.";
  });