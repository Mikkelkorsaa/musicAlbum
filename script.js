
fetchData("albums.json").then((data) => {
  const tableContainer = document.getElementById("tableContainer")
  
  let table = document.createElement('table');
  const chooseGenre = [];

// Opretter en ny række til overskrifterne
  let headerRow = document.createElement('thead');

// Opretter en celle for hver overskrift
  let albumNameHeader = document.createElement('th');
  albumNameHeader.innerHTML = 'albumName';
  headerRow.appendChild(albumNameHeader);

  let artistNameHeader = document.createElement('th');
  artistNameHeader.innerHTML = 'artistName';
  headerRow.appendChild(artistNameHeader);

  let artistWebsiteHeader = document.createElement('th');
  artistWebsiteHeader.innerHTML = 'artistWebsite';
  headerRow.appendChild(artistWebsiteHeader);

  let productionYearHeader = document.createElement('th');
  productionYearHeader.innerHTML = 'productionYear';
  headerRow.appendChild(productionYearHeader);

  let genreHeader = document.createElement('th');
  genreHeader.innerHTML = 'genre';
  headerRow.appendChild(genreHeader);

//tilføjer hearderRow i tabellenn 
  table.appendChild(headerRow) 

for (let i = 0; i < data.length; i++){
    
    let tr = document.createElement('tr')
    tr.setAttribute('class', 'tableRow ' + data[i].genre)

    let albumName = document.createElement('td')
    albumName.innerHTML = data[i].albumName;
    tr.appendChild(albumName)
   
    let artistName = document.createElement('td')
    artistName.innerHTML = data[i].artistName
    tr.appendChild(artistName) 

    let td = document.createElement('td')
    let artistWebsite = document.createElement('a')
    if (data[i].artistWebsite != "NIL") {
      artistWebsite.innerHTML = data[i].artistWebsite
      artistWebsite.setAttribute('href', data[i].artistWebsite)
    }

    td.appendChild(artistWebsite)
    tr.appendChild(td) 
    
    let productionYear = document.createElement('td')
    productionYear.innerHTML = data[i].productionYear
    tr.appendChild(productionYear) 

    //denne kode forhindrer den samme genre tilføjes flere gange 
    if (!chooseGenre.includes(data[i].genre)){
      chooseGenre.push(data[i].genre)
    
    }
    
    let genre = document.createElement('td')
    genre.innerHTML = data[i].genre
    tr.appendChild(genre)

    table.appendChild(tr)
  }
  tableContainer.appendChild(table)
  
});


// async function - deklaration at den skal hente URL daten 
// async og await hjælper med at udføre handlingen, der tager tid uden at blokere resten af koden
// resten af koden kan køre mens den venter på at asynkrone handlingen bliver færdig
async function fetchData(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}


// Vis/skjul dropdown-menuen, når "Genre"-knappen klikkes

//finder html elemntet med id 'genrebutton'. 
// metoden siger når knappen med denne iden bliver klikket på, udføres den fucktion der er angivet som det andet argument
//til .addEventListner. Når man klikker på knappen vil koden inde i  fucktionen blive kørt 
document.getElementById('genreButton').addEventListener('click', function() {

  // Her finder koden html-elemntet med denne id 
  let dropdown = document.getElementById('genreChoose');

  //Her tjekker man om menuen ersjult(dispay:none) eller ikke synlig (ingen display er sat 
  //fordi  koden i stedet bruger JavaScript til at ændre visningen af dropdown-menuen dynamisk baseret på brugerens handlinger.)
  // Hvis menuen er skjult, udføres koden inden i if-statment 
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    
    // denne kode linje ændre visningsstillen fra skjult til at være synlig 
    dropdown.style.display = 'block';

    //Hvis menuen allerede er synlig, udføres koden inden i else else-statment 
  } else {

    // hvis menuen allerede er ssynlig, ændre dette kodelinje display-stilen til "none", hvilket skjuler den 
    dropdown.style.display = 'none';
  }
});

function filter(){
  let genreDropdown = document.getElementById("genreDropdown").value
  
  const tableRow = document.getElementsByClassName('tableRow ')

  for (let i = 0; i < tableRow.length; i++){
    tableRow[i].classList.add("hide")
  }

  const showGenreRows = document.getElementsByClassName('tableRow ' + genreDropdown)

  for (let i = 0; i < showGenreRows.length; i++){
    showGenreRows[i].classList.remove("hide")
  }

}
