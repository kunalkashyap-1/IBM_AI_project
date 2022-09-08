// Api details and info 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '70a6d7c1b2msh03249ba3dd0bd20p16b692jsn690df7aacd1c',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

// data to be accessed and their respective api requests 
let data_mov1={
    "movie_name":document.querySelector(".mov1").textContent,
    "image":document.querySelector(".img1"),
    "cast":document.querySelector(".cast1")
}

console.log(data_mov1.movie_name);
fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q='+data_mov1.movie_name, options)
.then(response => response.json())
.then((response) => {
    data_mov1.image.setAttribute("src", response.d[0].i.imageUrl);
    data_mov1.cast.innerHTML=response.d[0].s;
})
.catch(err => console.error(err));

let data_mov2={
    "movie_name":document.querySelector(".mov2").textContent,
    "image":document.querySelector(".img2"),
    "cast":document.querySelector(".cast2")
}

console.log(data_mov2.movie_name);
fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q='+data_mov2.movie_name, options)
.then(response => response.json())
.then((response) => {
    data_mov2.image.setAttribute("src", response.d[0].i.imageUrl);
    data_mov2.cast.innerHTML=response.d[0].s;
})
.catch(err => console.error(err));

let data_mov3={
    "movie_name":document.querySelector(".mov3").textContent,
    "image":document.querySelector(".img3"),
    "cast":document.querySelector(".cast3")
}

console.log(data_mov3.movie_name);
fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q='+data_mov3.movie_name, options)
.then(response => response.json())
.then((response) => {
    data_mov3.image.setAttribute("src", response.d[0].i.imageUrl);
    data_mov3.cast.innerHTML=response.d[0].s;
})
.catch(err => console.error(err));


let data_mov4={
    "movie_name":document.querySelector(".mov4").textContent,
    "image":document.querySelector(".img4"),
    "cast":document.querySelector(".cast4")
}

console.log(data_mov4.movie_name);
fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q='+data_mov4.movie_name, options)
.then(response => response.json())
.then((response) => {
    data_mov4.image.setAttribute("src", response.d[0].i.imageUrl);
    data_mov4.cast.innerHTML=response.d[0].s;
})
.catch(err => console.error(err));

let data_mov5={
    "movie_name":document.querySelector(".mov5").textContent,
    "image":document.querySelector(".img5"),
    "cast":document.querySelector(".cast5")
}

console.log(data_mov5.movie_name);
fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q='+data_mov5.movie_name, options)
.then(response => response.json())
.then((response) => {
    data_mov5.image.setAttribute("src", response.d[0].i.imageUrl);
    data_mov5.cast.innerHTML=response.d[0].s;
})
.catch(err => console.error(err));



