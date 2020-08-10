const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require('multer')
const fs =  require('fs');
const moment = require('moment')
let arrFinal = [];
let twoEmployeesArr = [];

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})
// const fileFilter = (req,res,cb) =>{
//     if(req.file.mimetype === 'text/plain'){
//         cb(null,true)
//     }else{
//         cb(new Error('wrong type of file'),false)
//     }
// }
const upload = multer({storage:storage,limits:{fileSize:1024 * 1024 * 1}})

app.use(express.json());
app.use(bodyParser.json());



app.use(express.static("./dist", { index: "index.html" }));

app.post("/send-file",upload.single('myFile'), function (req,res){
    // console.log(req.file,"request")

    fs.readFile('./uploads/file.txt', 'utf8', function(err, data) {
        if (err) throw err;

        //split the whole text file
        let splitted = data.split(/\r?\n/)
     
        //split single line by " , "
        let splitRow = []

        for(let i=0;i<splitted.length;i++){

            splitRow.push(splitted[i].split(","))     
        } 
        for(let j=0;j<splitRow.length;j++){

            obj = {
                empId:splitRow[j][0],
                projectId:splitRow[j][1],
                dateFrom:splitRow[j][2],
                dateTo:splitRow[j][3],
                workedDays:null
            }
            arrFinal.push(obj)
        }

    });
    res.send("from BE")
})
app.get("/get-file",function(req,res){
    res.status(200).json({
        status: "success",
        data: {
          arrFinal
        },
      });
})
app.get("/find-emp",function(req,res){
    
    let from,to;
    let daysArr = [];
    let filteredEmployees = [];
    let combinedObjArr = []
    let sortedAscending = []

    //filtering employees who worked on same project
    const lookup = arrFinal.reduce((a, e) => {
        a[e.projectId] = ++a[e.projectId] || 0;
        return a;
      }, {});
      
      filteredEmployees = arrFinal.filter(e => lookup[e.projectId])

      

        for(let i=0;i<filteredEmployees.length;i++){
        
            from = moment(filteredEmployees[i].dateFrom,"YYYY-MM-DD");
            to =  moment(filteredEmployees[i].dateTo, "YYYY-MM-DD");
            daysArr.push(to.diff(from,"days"))
            combinedObjArr[i] = Object.assign(filteredEmployees[i],{workedDays:daysArr[i]})
        }
        sortedAscending = combinedObjArr.sort((a,b)=>{
            const empA = a.workedDays;
            const empB = b.workedDays;
            let comparison = 0;

            if(empA>empB){
                comparison = -1;
            }else{
                comparison = 1;
            }
            return comparison
        })

        twoEmployeesArr.push(sortedAscending[0],sortedAscending[1]);
    
    
        res.status(200).json({
            status: "success",
            data: {
                twoEmployeesArr
            },
          });
    
})



app.use(cors())

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
