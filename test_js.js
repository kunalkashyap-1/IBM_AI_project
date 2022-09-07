const express=require("express");
const bodyParse=require("body-parser");
const spawn = require("child_process").spawn;
const path=require("path");
//api realted material
const request = require('request');

const port=8383;

const app=express();


var mov_ser;
var mov1;
var mov2;
var mov3;
var mov4;
var mov5;



app.use(bodyParse.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/text_html.html");
});

//pug realted stuff
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));


//pug stuff more
app.post("/movie_recc", function (req,res){
    let movie = req.body.Movie;
    const process=spawn("python",["./app.py",JSON.stringify(movie)]);
    process.stdout.on("data",(data)=>{
        // let result=Object.assign({},cleaner(data));
        // console.log(result);
        arr=cleaner(data);
        mov_ser="Movie Selected:- "+movie.charAt(0).toUpperCase() + movie.slice(1);
        mov1=(arr[1]).trim();
        mov2=(arr[2]).trim();
        mov3=(arr[3]).trim();
        mov4=(arr[4]).trim();
        mov5=(arr[5]).trim();

        let params=[{
          "movie_searched":mov_ser,
          "movie1":api_func(mov1),
          "movie2":dummy_api_func(mov2),
          "movie3":dummy_api_func(mov3),
          "movie4":dummy_api_func(mov4),
          "movie5":dummy_api_func(mov5)
      }];
      res.status(200).render("movie_recc.pug",{"param":params})

    });
});

function api_func(movie_name){
            //api related code
            const options = {
                method: 'GET',
                url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
                qs: {q: movie_name},
                headers: {
                  'X-RapidAPI-Key': '70a6d7c1b2msh03249ba3dd0bd20p16b692jsn690df7aacd1c',
                  'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
                  useQueryString: true
                }
              };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                let api_res=JSON.parse(body);
                console.log(api_res);
                return api_res;
    });
}


function cleaner(data){
    let mystr=data.toString();
    let mystr1;
    for (let i = 0; i < mystr.length; i++) {
        char=mystr[i];
        if (!char.match(/[0-9]/g)){
            mystr1+=char;
        }
        
    }
    let myarr=mystr1.split("=");
    return myarr;
}


//testing purpose api data
function dummy_api_func(movie_name){
    // console.log("dummy function works on "+movie_name);
    return ({
        "d": [
          {
            "i": {
              "height": 2048,
              "imageUrl": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
              "width": 1382
            },
            "id": "tt4154796",
            "l": movie_name,
            "q": "feature",
            "qid": "movie",
            "rank": 223,
            "s": "Robert Downey Jr., Chris Evans",
            "y": 2019
          },
          {
            "i": {
              "height": 2160,
              "imageUrl": "https://m.media-amazon.com/images/M/MV5BNTQ1OWQzODktMTY3Zi00OTQxLWExOTYtZTNjZjY5ZTY4M2UyXkEyXkFqcGdeQXVyMTAzMzk0NjAy._V1_.jpg",
              "width": 3840
            },
            "id": "tt10399328",
            "l": "Avengers Endgame: the Butt Plan",
            "q": "video",
            "qid": "video",
            "rank": 234269,
            "s": "Vin Craig, Chris Ireland",
            "y": 2019
          },
          {
            "i": {
              "height": 667,
              "imageUrl": "https://m.media-amazon.com/images/M/MV5BODVmMTgxYjEtOTFhNy00Mjk3LTgzN2YtYTI4ZjczNmMyM2MyXkEyXkFqcGdeQXVyNzExMzc0MDg@._V1_.jpg",
              "width": 500
            },
            "id": "tt16103750",
            "l": "Rifftrax: Avengers: Endgame",
            "q": "video",
            "qid": "video",
            "rank": 467259,
            "s": "Bill Corbett, Kevin Murphy",
            "y": 2020
          },
          {
            "i": {
              "height": 1348,
              "imageUrl": "https://m.media-amazon.com/images/M/MV5BNThjZDgwZTYtMjdmYy00ZmUyLTk4NTUtMzdjZmExODQ3ZmY4XkEyXkFqcGdeQXVyMjkzMDgyNTg@._V1_.jpg",
              "width": 2560
            },
            "id": "tt10240638",
            "l": "Marvel Studios' Avengers: Endgame LIVE Red Carpet World Premiere",
            "q": "TV special",
            "qid": "tvSpecial",
            "rank": 217870,
            "s": "Victoria Alonso, Linda Cardellini",
            "y": 2019
          },
          {
            "i": {
              "height": 1080,
              "imageUrl": "https://m.media-amazon.com/images/M/MV5BZjg2ZTM3OTgtY2ExMS00OGM4LTg3NDEtNjQ0MjJiZDFmMGFkXkEyXkFqcGdeQXVyMDY3OTcyOQ@@._V1_.jpg",
              "width": 1920
            },
            "id": "tt10025738",
            "l": "Avengers: Endgame and the Latest Captain Marvel Outrage!!",
            "q": "video",
            "qid": "video",
            "rank": 722033,
            "s": "Dave Cullen",
            "y": 2019
          },
          {
            "i": {
              "height": 1080,
              "imageUrl": "https://m.media-amazon.com/images/M/MV5BMjVhMGQ1NjYtNzg0YS00ZTRlLWIzNmYtZGYyYTljYzdmNTE3XkEyXkFqcGdeQXVyMzc1MDQyNTM@._V1_.jpg",
              "width": 1920
            },
            "id": "tt9511690",
            "l": "Avengers Civil War Stop Motion: End Game",
            "q": "short",
            "qid": "short",
            "rank": 190688,
            "s": "Mario Durán Araujo, Alexander Bishop",
            "y": 2018
          }
        ],
        "q": "avengers%20endgame",
        "v": 1
      });
}


app.listen(port, ()=>{
    console.log("Server is active on port 8383");
})