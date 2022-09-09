const express=require("express");
const bodyParse=require("body-parser");
const spawn = require("child_process").spawn;
const path=require("path");
const port=8383;

const app=express();



app.use(bodyParse.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

//pug realted stuff
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));


//pug stuff more
app.post("/movie_recc", function (req,res){
    let movie = req.body.Movie;
    const process=spawn("python",["./app.py",JSON.stringify(movie)]);
    process.stdout.on("data",(data)=>{
        arr=cleaner(data);
        mov_ser="Movie Selected:- "+movie.charAt(0).toUpperCase() + movie.slice(1);
        mov1=(arr[1]).trim();
        mov2=(arr[2]).trim();
        mov3=(arr[3]).trim();
        mov4=(arr[4]).trim();
        mov5=(arr[5]).trim();

        // sending movie names as locals 
        let params={
          "movie_searched":mov_ser,
          "movie1":mov1,
          "movie2":mov2,
          "movie3":mov3,
          "movie4":mov4,
          "movie5":mov5
      };
      

      res.status(200).render("movie_recc.pug",{"param":params});
    });
});


//function to clean the data recieved from python file into a maniputable format 

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



app.listen(port, ()=>{
    console.log(`Server is started Successfully on ${port}`);
})