const express=require("express");
const app=express();
const https=require("https");
const bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){


res.sendFile(__dirname+"/index.html");


})
app.post("/",function(req,res){
const city=req.body.Cityname;


  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=51ac7b1693d936d617df2c7275ca53a0";
  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data", function(data){

      let weatherdata=JSON.parse(data);
   let temp=weatherdata.main.temp;

    let descrip=weatherdata.weather[0].description;
    const icon=weatherdata.weather[0].icon;
    const imageurl="http://openweathermap.org/img/wn/"+icon+"02x.png";
    console.log(temp);
    temp=Math.round(parseInt(temp)-273.15);
    console.log(descrip);

    res.write("<p>the weather is currently "+descrip+"</p>");
    res.write("<h1>The temperature in "+city+" is "+temp+" celsius</h1>");
   res.write("<img src=imageurl>");
    res.send();
    })
  })


});
//


app.listen(3000,function(){

  console.log("server is running on port 3000");
})
