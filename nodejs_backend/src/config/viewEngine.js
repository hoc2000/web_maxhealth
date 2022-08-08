import express from "express"


let configviewEngine = (app) =>{
    //arrow function
    app.use(express.static("./src/public"))//chi duoc lay du lieu o public
    app.set("view engine","ejs");//jsp cua java
    app.set("views","./src/views");
}

module.exports = configviewEngine;