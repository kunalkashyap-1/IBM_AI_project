const express=require("express");
const bodyParse=require("body-parser");
const spawn = require("child_process").spawn;

const app=express();

app.use(bodyParse.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


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

app.post("/movie_recc",function(req,res){
    let movie = req.body.Movie;
    const process=spawn("python",["./app.py",JSON.stringify(movie)]);
    process.stdout.on("data",(data)=>{
        // let result=Object.assign({},cleaner(data));
        // console.log(result);
        arr=cleaner(data);
        var mov_ser=(arr[1]).trim();
        var mov1=(arr[2]).trim();
        var mov2=(arr[3]).trim();
        var mov3=(arr[4]).trim();
        var mov4=(arr[5]).trim();
        var mov5=(arr[6]).trim();
        res.write(mov1);
        res.end();

    });
});





app.listen(8383, ()=>{
    console.log("Server is active on port 8383");
})