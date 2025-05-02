const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const { error } = require('console');
const app = express();
app.use(cors());
app.use( bodyParser.json());


const db = mysql.createConnection({
    // host : "localhost",
    // user : "root",
    // password : "",
    // database : "bala"

    host: "auth-db1559.hstgr.io",
    user: "u471227235_Tamilan",
    password: "Tamilan@1234",
    database: "u471227235_Tamilan_car123"
});

db.connect((error)=>{
    if(!error){
        console.log("database connection")
    }else{
        console.log(error);
    }
});

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , 'uploads/');
    },
    filename : function(req , file , cb){
        cb(null , Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage : storage});

// app.post('/images/post' , upload.single('images') , function(req, res , error){

//     if(!req.file){
//         return res.send("file not uploaded");
//     }

//     const query = "insert into photo1 (name , photo) values (?,?)";
    
//     const imgname = req.file.filename;
//     const imgpath = req.file.path;
    
//     db.query(query , [imgname , imgpath] , function(error , result){
//         if(error){
//             res.send({status:false , message : "not data req", data:error});
//         }
//         else{
//             res.send({status : true , data : result});
//         }
//     })

// });



app.get('/images/get', function(req, res) {
    const query = "SELECT * FROM photo1";
    db.query(query, function(error, result) {
        if (error) {
            console.error("Error fetching images:", error);
            res.status(500).send({ message: "Error fetching images", error });
        } else {
            const dataWithUrls = result.map(row => ({
                id: row.id,
                name: row.name,
                // url: `${req.protocol}://${req.get('host')}/uploads/${row.photo}`
                url: `${req.protocol}://${req.get('host')}/${row.photo.replace(/\\/g, '/')}` // Normalize slashes

            }));
            res.send({ data: dataWithUrls });
        }
    });
});



app.get('/images/get/:id', function(req, res) {
    const query = "SELECT * FROM photo1";
    db.query(query, function(error, result) {
        if (error) {
            console.error("Error fetching images:", error);
            res.status(500).send({ message: "Error fetching images", error });
        } else {
            const dataWithUrls = result.map(row => ({
                id: row.id,
                name: row.name,
                // url: `${req.protocol}://${req.get('host')}/uploads/${row.photo}`
                url: `${req.protocol}://${req.get('host')}/${row.photo.replace(/\\/g, '/')}` // Normalize slashes

            }));
            res.send({ data: dataWithUrls });
        }
    });
});


app.get('/images/get/:id', function(req, res) {
    const id = req.params.id;
    const query = "SELECT * FROM photo1 WHERE id = ?";

    db.query(query, [id], function(error, result) {
        if (error) {
            console.error("Error fetching image by ID:", error);
            res.status(500).send({ message: "Error fetching image", error });
        } else if (result.length === 0) {
            res.status(404).send({ message: "Image not found" });
        } else {
            const row = result[0];
            const dataWithUrl = {
                id: row.id,
                name: row.name,
                url: `${req.protocol}://${req.get('host')}/${row.photo.replace(/\\/g, '/')}`
            };
            res.send({ data: dataWithUrl });
        }
    });
});




app.put('/images/put/:id' ,upload.single('images') , function(req,res){
    const id = req.params.id;
    const name = req.file ? req.file.filename : null;
    const url = req.file ? req.file.path:null;

    // const query = "update photo set name = ? , photo = ? , where id=?";
    const query = "UPDATE photo1 SET name = ?, photo = ? WHERE id = ?";

    db.query(query , [name , url , id] , function(error , result){
        if(error){
            res.send("Its error");
        }else{
            res.send({status:true , data:result , message : "data successfully"});
        }
    })

})


app.delete('/image/delete/:id' , function(req ,res){
    const query = "DELETE FROM PHOTO1 WHERE ID = ?";
    const id = req.params.id;

    db.query(query , [id] , (error , result)=>{
        if(error){
            res.send({message : "Data cannot delete" , data : result});
        }else{
            res.send({message : "Data delete successfully", data : result} )
        }
    })

})


// Listing page post Start Start

app.post('/Listing/post', upload.fields([
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 },
    { name: 'photo4', maxCount: 1 }
]), function (req, res) {

    if (!req.files) {
        return res.send("Files not uploaded");
    }

    const {
        carName, carPrice, carModel, carMillage,
        fuelType, carCC, carType, carDoor, carSeat,
        carpower, carAutomation, carTarget, carColor,
        carInterColor, carCylinder, carWaranty
    } = req.body;

    const query = `
        INSERT INTO photo3 
        (name, photo1, photo2, photo3, photo4, carName, carPrice, carModel, carMillage, 
        fuelType, carCC, carType, carDoor, carSeat, carpower, carAutomation, carTarget, 
        carColor, carInterColor, carCylinder, carWaranty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const imgname = req.body.name;
    const photo1 = req.files['photo1'] ? req.files['photo1'][0].path : null;
    const photo2 = req.files['photo2'] ? req.files['photo2'][0].path : null;
    const photo3 = req.files['photo3'] ? req.files['photo3'][0].path : null;
    const photo4 = req.files['photo4'] ? req.files['photo4'][0].path : null;

    db.query(query, [
        imgname, photo1, photo2, photo3, photo4,
        carName, carPrice, carModel, carMillage,
        fuelType, carCC, carType, carDoor, carSeat,
        carpower, carAutomation, carTarget, carColor,
        carInterColor, carCylinder, carWaranty
    ], function (error, result) {
        if (error) {
            res.send({ status: false, message: "Data insertion error", data: error });
        } else {
            res.send({ status: true, data: result });
        }
    });

});


// List putmethod start

app.put('/Listing/update/:id', upload.fields([
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 },
    { name: 'photo4', maxCount: 1 }
]), function (req, res) {
    const id = req.params.id;

    if (!req.body) {
        return res.status(400).send("No data provided for update");
    }

    const {
        carName, carPrice, carModel, carMillage,
        fuelType, carCC, carType, carDoor, carSeat,
        carpower, carAutomation, carTarget, carColor,
        carInterColor, carCylinder, carWaranty
    } = req.body;

    const imgname = req.body.name;
    const photo1 = req.files['photo1'] ? req.files['photo1'][0].path : null;
    const photo2 = req.files['photo2'] ? req.files['photo2'][0].path : null;
    const photo3 = req.files['photo3'] ? req.files['photo3'][0].path : null;
    const photo4 = req.files['photo4'] ? req.files['photo4'][0].path : null;

    // Build query dynamically if photos exist
    let query = `UPDATE photo3 SET 
        name=?, 
        carName=?, carPrice=?, carModel=?, carMillage=?,
        fuelType=?, carCC=?, carType=?, carDoor=?, carSeat=?,
        carpower=?, carAutomation=?, carTarget=?, carColor=?,
        carInterColor=?, carCylinder=?, carWaranty=?`;

    const values = [
        imgname, carName, carPrice, carModel, carMillage,
        fuelType, carCC, carType, carDoor, carSeat,
        carpower, carAutomation, carTarget, carColor,
        carInterColor, carCylinder, carWaranty
    ];

    if (photo1) {
        query += `, photo1=?`;
        values.push(photo1);
    }
    if (photo2) {
        query += `, photo2=?`;
        values.push(photo2);
    }
    if (photo3) {
        query += `, photo3=?`;
        values.push(photo3);
    }
    if (photo4) {
        query += `, photo4=?`;
        values.push(photo4);
    }

    query += ` WHERE id=?`;
    values.push(id);

    db.query(query, values, function (error, result) {
        if (error) {
            res.send({ status: false, message: "Data update error", data: error });
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// List putmethod clouses

// new listing page start

app.get('/List/get', function(req, res) {
    const query = "SELECT * FROM photo3";
    db.query(query, function(error, result) {
        if (error) {
            console.error("Error fetching car listings:", error);
            res.status(500).send({ message: "Error fetching car listings", error });
        } else {
            const dataWithUrls = result.map(row => ({
                id: row.id,
                name: row.name,
                photo1: `${req.protocol}://${req.get('host')}/${row.photo1.replace(/\\/g, '/')}`,
                photo2: `${req.protocol}://${req.get('host')}/${row.photo2.replace(/\\/g, '/')}`,
                photo3: `${req.protocol}://${req.get('host')}/${row.photo3.replace(/\\/g, '/')}`,
                photo4: `${req.protocol}://${req.get('host')}/${row.photo4.replace(/\\/g, '/')}`,
                carName: row.carName,
                carPrice: row.carPrice,
                carModel: row.carModel,
                carMillage: row.carMillage,
                fuelType: row.fuelType,
                carCC: row.carCC,
                carType: row.carType,
                carDoor: row.carDoor,
                carSeat: row.carSeat,
                carPower: row.carPower,
                carAutomation: row.carAutomation,
                carTarget: row.carTarget,
                carColor: row.carColor,
                carInterColor: row.carInterColor,
                carCylinder: row.carCylinder,
                carWaranty: row.carWaranty
            }));
            res.send({ data: dataWithUrls });
        }
    });
});

// new listing page clouses


// new Listing page choose get start

app.get('/List/get/:id', function(req, res) {
    const id = req.params.id; // <== You must get the id from params
    const query = "SELECT * FROM photo3 WHERE id = ?";

    db.query(query, [id], function(error, result) { // <== Here pass [id] into db.query
        if (error) {
            console.error("Error fetching car listing by id:", error);
            res.status(500).send({ message: "Error fetching car listing", error });
        } else if (result.length === 0) {
            res.status(404).send({ message: "Car listing not found" });
        } else {
            const row = result[0]; // Only one row because id is unique
            const dataWithUrls = {
                id: row.id,
                name: row.name,
                photo1: `${req.protocol}://${req.get('host')}/${row.photo1.replace(/\\/g, '/')}`,
                photo2: `${req.protocol}://${req.get('host')}/${row.photo2.replace(/\\/g, '/')}`,
                photo3: `${req.protocol}://${req.get('host')}/${row.photo3.replace(/\\/g, '/')}`,
                photo4: `${req.protocol}://${req.get('host')}/${row.photo4.replace(/\\/g, '/')}`,
                carName: row.carName,
                carPrice: row.carPrice,
                carModel: row.carModel,
                carMillage: row.carMillage,
                fuelType: row.fuelType,
                carCC: row.carCC,
                carType: row.carType,
                carDoor: row.carDoor,
                carSeat: row.carSeat,
                carPower: row.carPower,
                carAutomation: row.carAutomation,
                carTarget: row.carTarget,
                carColor: row.carColor,
                carInterColor: row.carInterColor,
                carCylinder: row.carCylinder,
                carWarranty: row.carWarranty
            };
            res.send({ data: dataWithUrls });
        }
    });
});


// new Listing page choose get closes


// Listing page clouses

// BodyListing Start 

app.post('/BodyListing/post', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), (req, res) => {
    const {
        mainName, carModel, carKm, carRate1, carRate2, carMonth,
        carType, carDoor, carSeat, carPower, carAutomation,
        carTarget, carColor, carInterColor, carFuel, carCylinder, carWaranty
    } = req.body;

    const image1 = req.files['image1'] ? req.files['image1'][0].path : null;
    const image2 = req.files['image2'] ? req.files['image2'][0].path : null;
    const image3 = req.files['image3'] ? req.files['image3'][0].path : null;
    const image4 = req.files['image4'] ? req.files['image4'][0].path : null;

    if (!image1 || !image2 || !image3 || !image4) {
        return res.status(400).send({ status: false, message: "All 4 images are required" });
    }

    const sql = `INSERT INTO photo4 
    (image1, image2, image3, image4, mainName, carModel, carKm, carRate1, carRate2, carMonth,
    carType, carDoor, carSeat, carPower, carAutomation, carTarget, carColor, carInterColor, carFuel, carCylinder, carWaranty) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        image1, image2, image3, image4, mainName, carModel, carKm, carRate1, carRate2, carMonth,
        carType, carDoor, carSeat, carPower, carAutomation, carTarget, carColor, carInterColor, carFuel, carCylinder, carWaranty
    ];

    db.query(sql, values, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Insert failed", error: error });
        } else {
            res.send({ status: true, message: "Body Listing inserted successfully", data: result });
        }
    });
});


// BodyListing get code start

app.get('/BodyList/get', function(req, res) {
    const query = "SELECT * FROM photo4"; // Using the 'photo4' table
    db.query(query, function(error, result) {
        if (error) {
            console.error("Error fetching car listings:", error);
            res.status(500).send({ message: "Error fetching car listings", error });
        } else {
            // Map the results to add image URLs dynamically
            const dataWithUrls = result.map(row => ({
                id: row.id,
                image1: `${req.protocol}://${req.get('host')}/${row.image1.replace(/\\/g, '/')}`,
                image2: `${req.protocol}://${req.get('host')}/${row.image2.replace(/\\/g, '/')}`,
                image3: `${req.protocol}://${req.get('host')}/${row.image3.replace(/\\/g, '/')}`,
                image4: `${req.protocol}://${req.get('host')}/${row.image4.replace(/\\/g, '/')}`,
                mainName: row.mainName,
                carModel: row.carModel,
                carKm: row.carKm,
                carRate1: row.carRate1,
                carRate2: row.carRate2,
                carMonth: row.carMonth,
                carType: row.carType,
                carDoor: row.carDoor,
                carSeat: row.carSeat,
                carPower: row.carPower,
                carAutomation: row.carAutomation,
                carTarget: row.carTarget,
                carColor: row.carColor,
                carInterColor: row.carInterColor,
                carFuel: row.carFuel,
                carCylinder: row.carCylinder,
                carWaranty: row.carWaranty
            }));

            // Send the data with image URLs in response
            res.send({ data: dataWithUrls });
        }
    });
});

// Body Listing get code clouses

// Body Listing put method Start

// Get Car Data (for Editing)
app.get('/List/edit/:id', function(req, res) {
    const carId = req.params.id;
    const query = "SELECT * FROM photo4 WHERE id = ?";
    
    db.query(query, [carId], function(error, result) {
        if (error) {
            console.error("Error fetching car data:", error);
            res.status(500).send({ message: "Error fetching car data", error });
        } else {
            if (result.length > 0) {
                const carData = result[0];
                res.send({ 
                    data: carData 
                });
            } else {
                res.status(404).send({ message: "Car not found" });
            }
        }
    });
});

// Update Car Data
app.put('/BodyList/update/:id', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), function(req, res) {
    const carId = req.params.id;
    const { 
        mainName, carModel, carKm, carRate1, carRate2, carMonth, carType, 
        carDoor, carSeat, carPower, carAutomation, carTarget, carColor, 
        carInterColor, carFuel, carCylinder, carWaranty 
    } = req.body;

    const image1 = req.files['image1'] ? req.files['image1'][0].path : null;
    const image2 = req.files['image2'] ? req.files['image2'][0].path : null;
    const image3 = req.files['image3'] ? req.files['image3'][0].path : null;
    const image4 = req.files['image4'] ? req.files['image4'][0].path : null;

    let query = `
        UPDATE photo4 SET 
            mainName = ?, 
            carModel = ?, 
            carKm = ?, 
            carRate1 = ?, 
            carRate2 = ?, 
            carMonth = ?, 
            carType = ?, 
            carDoor = ?, 
            carSeat = ?, 
            carPower = ?, 
            carAutomation = ?, 
            carTarget = ?, 
            carColor = ?, 
            carInterColor = ?, 
            carFuel = ?, 
            carCylinder = ?, 
            carWaranty = ?
    `;

    const values = [
        mainName, carModel, carKm, carRate1, carRate2, carMonth, carType, 
        carDoor, carSeat, carPower, carAutomation, carTarget, carColor, 
        carInterColor, carFuel, carCylinder, carWaranty
    ];

    if (image1) {
        query += `, image1 = ?`;
        values.push(image1);
    }
    if (image2) {
        query += `, image2 = ?`;
        values.push(image2);
    }
    if (image3) {
        query += `, image3 = ?`;
        values.push(image3);
    }
    if (image4) {
        query += `, image4 = ?`;
        values.push(image4);
    }

    query += ` WHERE id = ?`;
    values.push(carId);

    db.query(query, values, function(error, result) {
        if (error) {
            console.error("Error updating car data:", error);
            res.status(500).send({ message: "Error updating car data", error });
        } else {
            res.send({ status: true, message: "Car data updated successfully!" });
        }
    });
});


// Body Listing put method clouses


// bodyListing delete page Start
app.delete('/BodyList/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM photo4 WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Delete error:', err);
            return res.status(500).json({ status: false, message: 'Database delete error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Car not found' });
        }

        res.json({ status: true, message: 'Car deleted successfully' });
    });
});

// bodyLisitng delete page clouses

// BodyListing Clouses


// Listing Page Start

// Listing page post method

app.post('/pageListing/post', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), (req, res) => {
    const {
        mainName, carModel, carKm, carRate1, carRate2, carMonth,
        carType, carDoor, carSeat, carPower, carAutomation,
        carTarget, carColor, carInterColor, carFuel, carCylinder, carWaranty , carName2
    } = req.body;

    const image1 = req.files['image1'] ? req.files['image1'][0].path : null;
    const image2 = req.files['image2'] ? req.files['image2'][0].path : null;
    const image3 = req.files['image3'] ? req.files['image3'][0].path : null;
    const image4 = req.files['image4'] ? req.files['image4'][0].path : null;

    if (!image1 || !image2 || !image3 || !image4) {
        return res.status(400).send({ status: false, message: "All 4 images are required" });
    }

    const sql = `INSERT INTO photo5 
    (image1, image2, image3, image4, mainName, carModel, carKm, carRate1, carRate2, carMonth,
    carType, carDoor, carSeat, carPower, carAutomation, carTarget, carColor, carInterColor, carFuel, carCylinder, carWaranty , carName2) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;

    const values = [
        image1, image2, image3, image4, mainName, carModel, carKm, carRate1, carRate2, carMonth,
        carType, carDoor, carSeat, carPower, carAutomation, carTarget, carColor, carInterColor, carFuel, carCylinder, carWaranty , carName2
    ];

    db.query(sql, values, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Insert failed", error: error });
        } else {
            res.send({ status: true, message: "Body Listing inserted successfully", data: result });
        }
    });
});

// Listing page get method

app.get('/pageList/get', function(req, res) {
    const query = "SELECT * FROM photo5"; // Updated to photo5

    db.query(query, function(error, result) {
        if (error) {
            console.error("Error fetching car listings:", error);
            res.status(500).send({ message: "Error fetching car listings", error });
        } else {
            const dataWithUrls = result.map(row => ({
                id: row.id,
                image1: `${req.protocol}://${req.get('host')}/${row.image1.replace(/\\/g, '/')}`,
                image2: `${req.protocol}://${req.get('host')}/${row.image2.replace(/\\/g, '/')}`,
                image3: `${req.protocol}://${req.get('host')}/${row.image3.replace(/\\/g, '/')}`,
                image4: `${req.protocol}://${req.get('host')}/${row.image4.replace(/\\/g, '/')}`,
                mainName: row.mainName,
                carModel: row.carModel,
                carKm: row.carKm,
                carRate1: row.carRate1,
                carRate2: row.carRate2,
                carMonth: row.carMonth,
                carType: row.carType,
                carDoor: row.carDoor,
                carSeat: row.carSeat,
                carPower: row.carPower,
                carAutomation: row.carAutomation,
                carTarget: row.carTarget,
                carColor: row.carColor,
                carInterColor: row.carInterColor,
                carFuel: row.carFuel,
                carCylinder: row.carCylinder,
                carWaranty: row.carWaranty,
                carName2: row.carName2 // new column
            }));

            res.send({ status: true, data: dataWithUrls });
        }
    });
});

// Listing page puting page Start

app.put('/pageList/update/:id', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), function(req, res) {
    const carId = req.params.id;
    const { 
        mainName, carModel, carKm, carRate1, carRate2, carMonth, carType, 
        carDoor, carSeat, carPower, carAutomation, carTarget, carColor, 
        carInterColor, carFuel, carCylinder, carWaranty , carName2
    } = req.body;

    const image1 = req.files['image1'] ? req.files['image1'][0].path : null;
    const image2 = req.files['image2'] ? req.files['image2'][0].path : null;
    const image3 = req.files['image3'] ? req.files['image3'][0].path : null;
    const image4 = req.files['image4'] ? req.files['image4'][0].path : null;

    let query = `
        UPDATE photo5 SET 
            mainName = ?, 
            carModel = ?, 
            carKm = ?, 
            carRate1 = ?, 
            carRate2 = ?, 
            carMonth = ?, 
            carType = ?, 
            carDoor = ?, 
            carSeat = ?, 
            carPower = ?, 
            carAutomation = ?, 
            carTarget = ?, 
            carColor = ?, 
            carInterColor = ?, 
            carFuel = ?, 
            carCylinder = ?, 
            carWaranty = ?,
            carName2 = ?
    `;

    const values = [
        mainName, carModel, carKm, carRate1, carRate2, carMonth, carType, 
        carDoor, carSeat, carPower, carAutomation, carTarget, carColor, 
        carInterColor, carFuel, carCylinder, carWaranty , carName2
    ];

    if (image1) {
        query += `, image1 = ?`;
        values.push(image1);
    }
    if (image2) {
        query += `, image2 = ?`;
        values.push(image2);
    }
    if (image3) {
        query += `, image3 = ?`;
        values.push(image3);
    }
    if (image4) {
        query += `, image4 = ?`;
        values.push(image4);
    }

    query += ` WHERE id = ?`;
    values.push(carId);

    db.query(query, values, function(error, result) {
        if (error) {
            console.error("Error updating car data:", error);
            res.status(500).send({ message: "Error updating car data", error });
        } else {
            res.send({ status: true, message: "Car data updated successfully!" });
        }
    });
});



// Listing page put method clouses

// Listing Page Clouses


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000 , (error)=>{
    if(error){
        console.log(error);
    }
    console.log("port is running :3000");
})




