const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// register user data
router.post("/create", (req, res) => {

    // console.log(req.body);

    const { house_no, house_name, house_area, house_member_name, date_of_birth,
        date_of_marriage, date_of_divorce,date_of_death} = req.body;

  /* if (!name || !email || !age || !mobile || !work || !add || !desc) {
        res.status(422).json("plz fill the all data");
    }*/

    try {
       /* conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {*/
                conn.query("INSERT INTO persons SET ?", {house_no, house_name, house_area, house_member_name, date_of_birth,
                    date_of_marriage, date_of_divorce,date_of_death}, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            //}
       // })
    } catch (error) {
        res.status(422).json(error);
    }

    //"INSERT INTO persons SET ?", { name, email, age, mobile, work, add, desc }

});




// get userdata

router.get("/getusers",(req,res)=>{

    conn.query("SELECT * FROM persons",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
            console.log("Get Users")
            console.log(result);
        }
    })
});


// user delete api

router.delete("/deleteuser/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM persons WHERE personid = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
            console.log("Delete user")
            console.log(result);
        }
    })
});



// get single user

router.get("/induser/:id",(req,res)=>{

    const {id} = req.params;
    conn.query("SELECT * FROM persons WHERE personid = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
            console.log("Ind Users")
            console.log(result);
        }
    })
});

// get single user

router.get("/userbyhouseno/:houseno",(req,res)=>{

    const {houseno} = req.params;
    conn.query("SELECT * FROM persons WHERE houseno = ? ",houseno,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
            console.log("Ind Users")
            console.log(result);
        }
    })
});

// update users api


router.patch("/updateuser/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE persons SET ? WHERE personid = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
            console.log("Update Users")
            console.log(result);
        }
    })
});

module.exports = router;



