const mysql = require('mysql');

// Source DB connection (Localhost)
const sourceDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bala"
});

// Destination DB connection (Remote)
const destDB = mysql.createConnection({
    host: "auth-db1559.hstgr.io",
    user: "u471227235_Tamilan",
    password: "Tamilan@1234",
    database: "u471227235_Tamilan_car123"
});

// Connect and transfer data
sourceDB.connect(err => {
    if (err) {
        console.error('Source DB connection failed:', err);
        return;
    }
    console.log('Connected to source DB');

    destDB.connect(err => {
        if (err) {
            console.error('Destination DB connection failed:', err);
            return;
        }
        console.log('Connected to destination DB');

        const query = `SELECT 
            id, image1, image2, image3, image4, mainName,
            carModel, carKm, carRate1, carRate2, carMonth,
            carType, carDoor, carSeat, carPower, carAutomation,
            carTarget, carColor, carInterColor, carFuel,
            carCylinder, carWaranty, carName2
            FROM photo5`;

        sourceDB.query(query, (err, rows) => {
            if (err) {
                console.error('Error fetching data from source:', err);
                return;
            }

            rows.forEach(row => {
                const insertQuery = `INSERT INTO photo5 (
                    id, image1, image2, image3, image4, mainName,
                    carModel, carKm, carRate1, carRate2, carMonth,
                    carType, carDoor, carSeat, carPower, carAutomation,
                    carTarget, carColor, carInterColor, carFuel,
                    carCylinder, carWaranty, carName2
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                const values = [
                    row.id, row.image1, row.image2, row.image3, row.image4, row.mainName,
                    row.carModel, row.carKm, row.carRate1, row.carRate2, row.carMonth,
                    row.carType, row.carDoor, row.carSeat, row.carPower, row.carAutomation,
                    row.carTarget, row.carColor, row.carInterColor, row.carFuel,
                    row.carCylinder, row.carWaranty, row.carName2
                ];

                destDB.query(insertQuery, values, (err) => {
                    if (err) {
                        console.error(`Error inserting row ID ${row.id}:`, err);
                    }
                });
            });

            console.log(`Transferred ${rows.length} rows to photo5.`);
        });
    });
});
