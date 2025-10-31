const express = require("express");
const router = express.Router();
const db = require("../db.js");
//add new password
router.post("/",(req,resp)=>{
    const{site,username,password}=req.body;
    if(!site || !username || !password){
        return resp.status(400).json({message:"all fields required!"});

    }
    const query = "INSERT INTO passwords (site,username,password) VALUES (?,?,?)";
    db.query(query,[site,username,password],(err,result)=>{
        if(err){
            console.error("Error inserting data:",err);
            return resp.status(500).json({message:"database error"});
        }
        resp.status(201).json({message:"password saved "});
    });
});
//get all passowrd 
router.get("/",(req,resp)=>{
    const query = "SELECT * FROM passwords";
    db.query(query,(err,results)=>{
        if(err){
            console.error("Error Fetching data :",err);
            return resp.status(500).json({message:"database error"});


        }
        resp.status(200).json(results);
    });
});
//delete password by id 
router.delete("/:id",(req,resp)=>{
    const { id } = req.params;
    const query = "DELETE FROM passwords WHERE id=?";
    db.query(query,[id],(err,result)=>{
        if(err){
            console.log("error deleting data",err);
            return resp.status(500).json({message:"DATABASE ERROR"});
        }
        if(result.affectedRows===0){
            return resp.status(404).json({messages:"password not found"});
        }
        resp.status(200).json({message:"password deleted successfully"});
    });
});


module.exports =router;