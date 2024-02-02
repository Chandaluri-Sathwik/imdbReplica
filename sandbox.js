const apiKey="c3527ead";
let movieSearch=document.querySelector("#Input");
let implementSearch=document.querySelector(".search-icon");
let showBeforeDetails=document.querySelector(".search-items");
implementSearch.addEventListener("click",displayMovie);
let exploring=document.querySelector(".start-exploring");
let noOfFav=0;
movieSearch.addEventListener('input', findMovies);
movieSearch.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        implementSearch.click();
    }
});

async function singleMovie(){
    let urlQueryParams = new URLSearchParams(window.location.search);
    let id = urlQueryParams.get('id');
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
    const res = await fetch(`${url}`);
    const data = await res.json();
    let output=`<div class="movie-poster">
    <img src=${data.Poster} alt="Movie Poster">
</div>
<div class="movie-details">
    <div class="details-header">
        <div class="dh-title">
            <h2>${data.Title}</h2>
        </div>
        <div class="dh-bk">
            <i class="fa-solid fa-bookmark" onClick=addTofavorites('${id}') style="cursor: pointer;"></i>
        </div>
    </div>
    <span class="italics-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                style="font-size: 18px; font-weight: 600;">${data.imdbRating}</span>/10 </i></span>
    <ul class="details-ul">
        <li><strong>Actors: </strong>${data.Actors}</li>
        <li><strong>Director: </strong>${data.Director}</li>
        <li><strong>Writers: </strong>${data.Writer}</li>
    </ul>
    <ul class="details-ul">
        <li><strong>Genre: </strong>${data.Genre}</li>
        <li><strong>Release Date: </strong>${data.DVD}</li>
        <li><strong>Box Office: </strong>${data.BoxOffice}</li>
        <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
    </ul>
    <p style="font-size: 14px; margin-top:10px;">${data.Plot}</p>
    <p style="font-size: 15px; font-style: italic; color: #222; margin-top: 10px;">
        <i class="fa-solid fa-award"></i>
        &thinsp; ${data.Awards}
    </p>
</div>`;
    document.querySelector(".movie-container").innerHTML=output;
}
async function displayMovie(){
   let title=movieSearch.value;
   const url= `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
   const res = await fetch(`${url}`);
   const data = await res.json();
   let img=data.Poster;
   exploring.style.display="none";
   let output=`
   <div class="search-item">
   <div class="movie-poster1">
       <a href="movie.html?id=${data.imdbID}"><img src=${img} alt="Favourites Poster"></a>
   </div>
   <div class="search-details">
       <div class="search-details-box">
           <div>
               <p class="movie-name">${data.Title}</p>
               <p class="movie-year">${data.Year} </p>
           </div>
        <div id="bookmarkDiv">
           <i class="fa-solid fa-bookmark" id="bookmark" style="cursor:pointer;" onclick=addTofavorites('${data.imdbID}')></i>
       </div>
       </div>
   </div>
</div>`;
  showBeforeDetails.innerHTML=output;
}
async function addTofavorites(id){
    for(i in localStorage){
        if (localStorage[i] == id) {
            alert("this movie is already in your watchlist");
            return;
        }
    }
    if(localStorage.getItem("fav")){
    noOfFav=Number(localStorage.getItem("fav"));
    noOfFav++;
    }
    if(noOfFav===0){
    noOfFav++;
    localStorage.setItem("fav",String(noOfFav));}
    localStorage.setItem(String(noOfFav),id);
    alert("We will remember it for you!!");
    localStorage.setItem("fav",String(noOfFav));
    console.log(localStorage);
}
async function removeFromFavorites(id){
    for (i in localStorage) {
        // If the ID passed as argument matches with value associated with key, then removing it 
        if (localStorage[i] == id) {
            localStorage.removeItem(i)
            break;
        }
    }
    alert("This Movie is surely going to miss your thoughts :(");
    window.location.replace('Watchlist.html');
}
async function favoritesMovieLoader(){
    let output='';
    for(i in localStorage){
        let id= localStorage.getItem(i);
        if(i==="fav"){
        continue;
        }
        if(id != null) {
            const url = `https://www.omdbapi.com/?i=${localStorage[i]}&plot=full&apikey=${apiKey}`
            const res = await fetch(`${url}`);
            const data = await res.json();
            let img='';
            if (data.Poster) {
                img = data.Poster;
            }
            else { img = data.Title }
            output += `

        <div class="fav-item">
            <div class="fav-poster">
                <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name">${data.Title}</p>
                        <p class="fav-movie-rating">${data.Year} &middot; <span
                                style="font-size: 15px; font-weight: 600;">${data.imdbRating}</span>/10</p>
                    </div>
                    <div style="color: maroon">
                        <i class="fa-solid fa-trash" style="cursor:pointer;" onClick=removeFromFavorites('${localStorage[i]}')></i>
                    </div>
                </div>
            </div>
        </div>

       `
        }
    }
    document.querySelector(".fav-container").innerHTML=output;
}
async function findMovies(){
    const url=`https://www.omdbapi.com/?s=${(movieSearch.value).trim()}&apikey=${apiKey}`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    if(data.Search){
        displayMovieList(data.Search);
    }
}
async function displayMovieList(movies){
    exploring.style.display="none";
    let output='';

    for(movie of movies){
         let img=" ";
         if(movie.Poster !='N/A'){
            img=movie.Poster;
         }else{
            img="blank-poster.webp";
         }
         let id=movie.imdbID;
         output+=`<div class="search-item">
         <div class="movie-poster1">
             <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
         </div>
         <div class="search-details">
             <div class="search-details-box">
                 <div>
                     <p class="movie-name">${movie.Title}</p>
                     <p class="movie-year">${movie.Year} </p>
                 </div>
              <div id="bookmarkDiv">
                 <i class="fa-solid fa-bookmark" id="bookmark" style="cursor:pointer;" onclick=addTofavorites('${id}')></i>
             </div>
             </div>
         </div>
      </div>`
    }
    document.querySelector('.search-items').innerHTML = output;
    console.log("here is movie list ..", movies);
}
let getA=document.querySelector("#movieOut");
let implementmovie=document.querySelector("#movieOutput");
let movieInput=document.querySelector("#movieInput");
implementmovie.addEventListener("click",pageLoad);
async function pageLoad(){
    let title=movieInput.value;
    const url= `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    console.log(data);
    
}