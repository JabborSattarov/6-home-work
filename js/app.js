const listOne = document.querySelector('.list-1');
const listTwo = document.querySelector('.list-2');
const modalOverlay = document.querySelector(".modal-overlay");



const tempEl = document.querySelector('#template-1').content;
const tempElTwo = document.querySelector('#template-2').content;
// const tempElThree = document.querySelector('#template-3').content;

const bookmark = [];


let inpSearch = document.querySelector("#inpSearch");
inpSearch.addEventListener("input", searching);

function searching() {
    listOne.innerHTML = "";

    let filmsName = films.filter(name => {
        let lower = name.title.toLowerCase();
        if (lower.includes(inpSearch.value)) return name;
    })
    render(filmsName, listOne)
}


function render(films, list) {
    list.innerHTML = null;
    const fragEl = document.createDocumentFragment();

    films.forEach(film => {
        const clone = tempEl.cloneNode(true);
        const img = clone.querySelector(".img");
        img.src = film.poster;

        const title = clone.querySelector(".title").textContent = film.title;

        const bookmarkBtn = clone.querySelector(".bookmarkBtn");
        bookmarkBtn.dataset.idonfication = film.id;

        const readMoreBtn = clone.querySelector(".read-more");
        readMoreBtn.dataset.idonfication = film.id;

        fragEl.appendChild(clone)

    
    })
    
    list.appendChild(fragEl)
}
render(films,listOne)



const addToBookmark = listOne.addEventListener("click", evt => {

 if(  evt.target.matches(".bookmarkBtn") ){

    const idonfication = evt.target.dataset.idonfication;
    const findEl = films.find(mov => mov.id == idonfication);

    if(!bookmark.includes(findEl)){
        bookmark.push(findEl)
    
        renderBookmark(bookmark, listTwo)
    }   
}
 modalOverlay.addEventListener("click", evt =>{
    if(evt.target.matches(".close")){
        modalOverlay.style.display = "none"
    }
    if(evt.target.matches(".span    ")){
        modalOverlay.style.display = "none"
    }
    if(evt.target.matches(".modal-overlay")){
        modalOverlay.style.display = "none"
    }

})

 if(evt.target.matches(".read-more")){
    
     modalOverlay.style.display = "flex" ;

     const idonfication = evt.target.dataset.idonfication;
     const findElement = films.find(film => film.id == idonfication); 

     const img = document.querySelector(".modal__img");
     img.src = findElement.poster;

     const modalTitle = document.querySelector(".modal__title").textContent = findElement.title;

     const modalText = document.querySelector(".modal__text").textContent = findElement.overview;

     const ulEl = document.querySelector(".modal__ul");
     ulEl.innerHTML = null;
     
     const genres = findElement.genres.forEach( genre => {
         const liEl = document.createElement("li")
         liEl.textContent = genre;
         liEl.style.listStyle = "none"
         liEl.style.color = "white"
         ulEl.appendChild(liEl)
     })

 };
   
})

function renderBookmark(films, list) {
    list.innerHTML = null;
    const fragEl = document.createDocumentFragment();
   
    films.forEach(film => {
        const clone = tempElTwo.cloneNode(true);
        
        const title = clone.querySelector(".title-2").textContent = film.title;

        const delBtn = clone.querySelector(".deleteBtn");
        delBtn.dataset.idonfication = film.id;
            console.log(delBtn);
        fragEl.appendChild(clone)

    
    })
    
    list.appendChild(fragEl)

}

renderBookmark(bookmark, listTwo)

const delBookmark = listTwo.addEventListener("click", evt => {

    if(  evt.target.matches(".deleteBtn") ){
   
       const idonfication = evt.target.dataset.idonfication;
       let findArr = bookmark.findIndex(film => film.id == idonfication);
       bookmark.splice(findArr, 1)
       
       renderBookmark(bookmark, listTwo)
           
    }
   })
   
   modalOverlay.addEventListener("click", evt =>{
       if(evt.target.matches(".close")) {

       }
   })

