// GET /app/settings         -> go the settings

const express = require('express');
const router = express.Router();
const blood=require("./../server/models/blood.js");
var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');

router.get('/app/blood', (req, res) => {
    res.status(200).render('blood', {pageTitle: "Blood Avaliability"});
});

router.post('/app/addBlood',(req,res)=>{
    let ob={
        Id:req.body.HospitalId,
        BloodGroup : req.body.BloodType
    }
    let NewBlood=new blood(ob);
    NewBlood.save().then((result)=>{
        console.log("Blood Added");
        res.status(200).redirect('/app/blood');
    }).catch((err) => {
        console.log(err);
        res.status(400).redirect('/app/blood');
    });
    
});
router.get('/app/allBloods',(req,res)=>{
    blood.find({}).then((result)=>{
       // console.log(result);
        res.status(200).send(result);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send();
    })
});
router.get('/app/getBloodPage/:id',(req,res)=>{
   blood.find({Id:req.params.id}).then((result)=>{
       res.status(200).render('bloodPage');
   }).catch(err=>{
    res.status(404).redirect('/app');
   }); 
});
router.get('/app/getOne/:id',(req,res)=>{

    blood.findOne({Id:req.params.id}).then((result)=>{
        res.status(200).send(result);
    }).catch(err=>{
        res.status(400).redirect('/app');
    })
});
router.get('/app/deleteblood/:hospitalNumber', (req, res) => {
    var hospitalNumber = req.params.hospitalNumber;

    Promise.all([blood.find({}), blood.findOne({Id: hospitalNumber})])
        .then((data) => {
            var rooms = data[0];
            var patient = data[1];

            // if the patient is in a room, make the room empty
            if (patient.room !== 'noroom') {
                 for (var i = 0; i < rooms.length; ++i) {
                    if (rooms[i].name === patient.room) {
                         rooms[i].availability = false;
                         rooms[i].save();
                         break;
                    }
                 }
            }

            patient.remove().then((patients) => {
               res.status(200).redirect('/app');
            });
         }).catch((err) => {
            res.status(400).redirect('/app');
         });
});

module.exports = router;
