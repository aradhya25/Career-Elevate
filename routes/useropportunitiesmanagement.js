const express=require("express");
const app=express();
const db = require("../config/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


module.exports=app;