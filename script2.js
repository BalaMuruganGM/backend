fetch('http://localhost:4015/images/get')
.then((response)=>{
    if(response.ok){
        return response.json();
    }else{
        console.log("perasshanai");
    }
}).then((data)=>{
    console.log(data);

    let a = data.data;
    console.log(a);

    const tableData = document.querySelector('.tap-1');

    a.forEach(element => {
        
        const Newtr = document.createElement('tr');
        Newtr.innerHTML =
        `<td>${element.id}</td>
        <td>${element.name}</td>
        <td><img src="${element.url}"></td>
         <td>
        <div class="td-button">
                <button class="td-but1"  onclick="putmethod_block()" data-id = "${element.id}">Edit</button>
       </div>
        </td>
    `
        tableData.appendChild(Newtr);


    // ---------------------------------------------------------------------------

        // put method vodathu edit button
    
        document.querySelectorAll('.td-but1').forEach(button => {
            button.addEventListener('click', function () {
                let imageId = this.getAttribute('data-id'); // Get ID from data-id attribute
                document.getElementById('idInput').value = imageId; // Set value in input field
            });
        });

    
        // put method vodathu delete button

        const puttingmethod = document.querySelectorAll('.td-but2');

        puttingmethod.forEach((but)=>{
            but.addEventListener('click' , function(){
                let dataDelete = this.getAttribute('delete-id');
                // document.getElementById('deleteInput').value = dataDelete;             
                deleteImage(imageId);
            })
        })
    

    });

})
.catch((error)=>{
    console.log(error);
})



// PUT Method (Image Update)
document.getElementById('updateForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent page reload

    let id = document.getElementById('idInput').value.trim(); // Get image ID
    let fileInput = document.getElementById('imageput'); // Get file input

    if (!id) {
        alert('Please enter the Image ID.');
        return;
    }

    if (fileInput.files.length === 0) {
        alert('Please select a new image to update.');
        return;
    }

    let formData = new FormData();
    formData.append('images', fileInput.files[0]); // Add image file

    try {
        let response = await fetch(`http://localhost:4015/images/put/${id}`, {
            method: 'PUT',
            body: formData
        });

        let result = await response.json();

        if (response.ok && result.status) {
            alert('Image updated successfully!');
        } else {
            alert('Failed to update image: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});



// Listen page is Start

fetch('http://localhost:4015/List/get')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong while fetching data.');
        }
    })
    .then(data => {
        const tb2 = document.querySelector('.tb2');
        if (!tb2) {
            console.error('Table body not found');
            return;
        }

        let a = data.data; // Assuming the car data is inside `data.data`
        console.log(a);

        a.forEach(element => {
            const tr1 = document.createElement('tr');
            tr1.innerHTML = `
                <td>${element.id}</td>
                <td><img src ="${element.photo1}"/></td>
                <td><img src ="${element.photo2}"/></td>
                <td><img src ="${element.photo3}"/></td>
                <td><img src ="${element.photo4}"/></td>
                <td>${element.carName}</td>
                <td>${element.carPrice}</td>
                <td>${element.carModel}</td>
                <td>${element.carMillage}</td>
                <td>${element.fuelType}</td>
                <td>${element.carCC}</td>
                <td><button class="editButton">Edit</button></td>
            `;

            // Correct the event listener here
          


            const tr2 = document.createElement('tr');
            tr2.innerHTML = `
                <td></td>
                <td>${element.carName}</td>
                <td>${element.carType}</td>
                <td>${element.carDoor}</td>
                <td>${element.carSeat}</td>
                <td></td>
                <td>${element.carAutomation}</td>
                <td>${element.carTarget}</td>
                <td>${element.carColor}</td>
                <td>${element.carInterColor}</td>
                <td>${element.fuelType}</td>
                <td>${element.carCylinder}</td>
                <td>${element.carWaranty}</td>
            `;

            tb2.appendChild(tr1);
            tb2.appendChild(tr2);

            tr1.querySelector('.editButton').addEventListener('click', ()=> {
                // Pass the current `element` (car) data to the editCar function
                editCar(element); // Pass the element object to editCar
            });


        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

// Function to populate the form with car data
function editCar(car) {
    document.getElementById('editForm').style.display = 'block'; // Show the form
    document.getElementById('editId').value = car.id;
    document.getElementById('name').value = car.carName; // Corrected field name
    document.getElementById('photo1').value = car.photo1; // Assuming you're passing photo paths
    document.getElementById('photo2').value = car.photo2;
    document.getElementById('photo3').value = car.photo3;
    document.getElementById('photo4').value = car.photo4;
    document.getElementById('carName').value = car.carName;
    document.getElementById('carPrice').value = car.carPrice;
    document.getElementById('carModel').value = car.carModel;
    document.getElementById('carMillage').value = car.carMillage;
    document.getElementById('fuelType').value = car.fuelType;
    document.getElementById('carCC').value = car.carCC;
    document.getElementById('carType').value = car.carType;
    document.getElementById('carDoor').value = car.carDoor;
    document.getElementById('carSeat').value = car.carSeat;
    document.getElementById('carpower').value = car.carpower;
    document.getElementById('carAutomation').value = car.carAutomation;
    document.getElementById('carTarget').value = car.carTarget;
    document.getElementById('carColor').value = car.carColor;
    document.getElementById('carInterColor').value = car.carInterColor;
    document.getElementById('carCylinder').value = car.carCylinder;
    document.getElementById('carWaranty').value = car.carWaranty;
}

// Submit the updated car data to the server
document.getElementById('updateCarForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();

    // Append normal fields
    formData.append('name', document.getElementById('name').value);
    formData.append('carName', document.getElementById('carName').value);
    formData.append('carPrice', document.getElementById('carPrice').value);
    formData.append('carModel', document.getElementById('carModel').value);
    formData.append('carMillage', document.getElementById('carMillage').value);
    formData.append('fuelType', document.getElementById('fuelType').value);
    formData.append('carCC', document.getElementById('carCC').value);
    formData.append('carType', document.getElementById('carType').value);
    formData.append('carDoor', document.getElementById('carDoor').value);
    formData.append('carSeat', document.getElementById('carSeat').value);
    formData.append('carpower', document.getElementById('carpower').value);
    formData.append('carAutomation', document.getElementById('carAutomation').value);
    formData.append('carTarget', document.getElementById('carTarget').value);
    formData.append('carColor', document.getElementById('carColor').value);
    formData.append('carInterColor', document.getElementById('carInterColor').value);
    formData.append('carCylinder', document.getElementById('carCylinder').value);
    formData.append('carWaranty', document.getElementById('carWaranty').value);

    // Append file fields (if any)
    formData.append('photo1', document.getElementById('photo1').files[0]);
    formData.append('photo2', document.getElementById('photo2').files[0]);
    formData.append('photo3', document.getElementById('photo3').files[0]);
    formData.append('photo4', document.getElementById('photo4').files[0]);

    const id = document.getElementById('editId').value; // Get the ID of the car to update

    // Send the FormData via PUT request
    fetch(`http://localhost:4015/Listing/update/${id}`, {
        method: 'PUT',
        body: formData // Using FormData to handle both files and form fields
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert('Car updated successfully!');
            location.reload();  // Refresh the page or reload the table
        } else {
            alert('Failed to update car: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error updating car:', error);
        alert('There was an error updating the car. Please try again later.');
    });
});

// putting method clouses

// Body Listing Start

fetch('http://localhost:4015/BodyList/get')
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        console.log("Something perssha");
    }
})
.then(data => {
    let a = data.data;
    const tb3 = document.querySelector('.tb-3'); 
    tb3.innerHTML = ''; // Clear previous data
    a.forEach((element) => {
        const tr1 = document.createElement('tr');
        tr1.innerHTML = `
            <td>${element.id}</td>
            <td><img src="${element.image1}" width="100"></td>
            <td><img src="${element.image2}" width="100"></td>
            <td><img src="${element.image3}" width="100"></td>
            <td><img src="${element.image4}" width="100"></td>
            <td>${element.mainName}</td>
            <td>${element.carModel}</td>
            <td>${element.carKm}</td>
            <td>${element.carRate1}</td>
            <td>${element.carRate2}</td>
            <td>${element.carMonth}</td>
            <td class="buttonTag">
                <button class="bodyEdit">Update</button>
                <button class="bodyDelete">Delete</button>
            </td>
        `;

        tr1.querySelector('.bodyEdit').addEventListener('click', () => {
            bodyCar(element);
        });

        tr1.querySelector('.bodyDelete').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this car?')) {
                deleteCar(element.id);
            }
        });

        const tr2 = document.createElement('tr');
        tr2.innerHTML = `
            <td></td>
            <td>${element.carType}</td>
            <td>${element.carDoor}</td>
            <td>${element.carSeat}</td>
            <td>${element.carPower}</td>
            <td>${element.carAutomation}</td>
            <td>${element.carTarget}</td>
            <td>${element.carColor}</td>
            <td>${element.carInterColor}</td>
            <td>${element.carFuel}</td>
            <td>${element.carCylinder}</td>
            <td>${element.carWaranty}</td>
        `;
   
        tb3.appendChild(tr1);
        tb3.appendChild(tr2);
    });
})
.catch(error => {
    console.log("error: " + error);
});

function bodyCar(car) {
    document.getElementById('bodyForm').style.display = 'block';
    document.getElementById('carId').value = car.id;
    document.getElementById('mainName').value = car.mainName;
    document.getElementById('image1').value = car.image1;
    document.getElementById('image2').value = car.image2;
    document.getElementById('image3').value = car.image3;
    document.getElementById('image4').value = car.image4;
    document.getElementById('carModel').value = car.carModel;
    document.getElementById('carKm').value = car.carKm;
    document.getElementById('carRate1').value = car.carRate1;
    document.getElementById('carRate2').value = car.carRate2;
    document.getElementById('carMonth').value = car.carMonth;
    document.getElementById('fuelType').value = car.carFuel;
    document.getElementById('carType').value = car.carType;
    document.getElementById('carDoor').value = car.carDoor;
    document.getElementById('carSeat').value = car.carSeat;
    document.getElementById('carpower').value = car.carPower;
    document.getElementById('carAutomation').value = car.carAutomation;
    document.getElementById('carTarget').value = car.carTarget;
    document.getElementById('carColor').value = car.carColor;
    document.getElementById('carInterColor').value = car.carInterColor;
    document.getElementById('carCylinder').value = car.carCylinder;
    document.getElementById('carWaranty').value = car.carWaranty;
}

document.getElementById('bodyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('mainName', document.getElementById('mainName').value);
    formData.append('carModel', document.getElementById('carModel').value);
    formData.append('carKm', document.getElementById('carKm').value);
    formData.append('carRate1', document.getElementById('carRate1').value);
    formData.append('carRate2', document.getElementById('carRate2').value);
    formData.append('carMonth', document.getElementById('carMonth').value);
    formData.append('carFuel', document.getElementById('fuelType').value);
    formData.append('carType', document.getElementById('carType').value);
    formData.append('carDoor', document.getElementById('carDoor').value);
    formData.append('carSeat', document.getElementById('carSeat').value);
    formData.append('carPower', document.getElementById('carpower').value);
    formData.append('carAutomation', document.getElementById('carAutomation').value);
    formData.append('carTarget', document.getElementById('carTarget').value);
    formData.append('carColor', document.getElementById('carColor').value);
    formData.append('carInterColor', document.getElementById('carInterColor').value);
    formData.append('carCylinder', document.getElementById('carCylinder').value);
    formData.append('carWaranty', document.getElementById('carWaranty').value);

    // Photos
    formData.append('image1', document.getElementById('image1').files[0]);
    formData.append('image2', document.getElementById('image2').files[0]);
    formData.append('image3', document.getElementById('image3').files[0]);
    formData.append('image4', document.getElementById('image4').files[0]);

    const id = document.getElementById('carId').value;

    fetch(`http://localhost:4015/BodyList/update/${id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert('Car updated successfully!');
            location.reload(); // or you can call fetchCars() again
        } else {
            alert('Update failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Update error:', error);
        alert('Something went wrong.');
    });
});

// Body Lisitng clouses


//body Listing  delete code start

function deleteCar(id) {
    fetch(`http://localhost:4015/BodyList/delete/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert('Car deleted successfully!');
            location.reload(); // or call fetch to refresh car list
        } else {
            alert('Delete failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Delete error:', error);
        alert('Something went wrong.');
    });
}

// Body Listing delete code clouses


// Body post Method Start

  function submitForm() {
    // Gather text input values
    const mainName = document.getElementById('mainName').value;
    const carModel = document.getElementById('carModel').value;
    const carKm = document.getElementById('carKm').value;
    const carRate1 = document.getElementById('carRate1').value;
    const carRate2 = document.getElementById('carRate2').value;
    const carMonth = document.getElementById('carMonth').value;
    const carType = document.getElementById('carType').value;
    const carDoor = document.getElementById('carDoor').value;
    const carSeat = document.getElementById('carSeat').value;
    const carPower = document.getElementById('carPower').value;
    const carAutomation = document.getElementById('carAutomation').value;
    const carTarget = document.getElementById('carTarget').value;
    const carColor = document.getElementById('carColor').value;
    const carInterColor = document.getElementById('carInterColor').value;
    const carFuel = document.getElementById('carFuel').value;
    const carCylinder = document.getElementById('carCylinder').value;
    const carWaranty = document.getElementById('carWaranty').value;

    // Gather file inputs (each is a File object)
    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];
    const image3 = document.getElementById('image3').files[0];
    const image4 = document.getElementById('image4').files[0];

    // Create FormData and append all fields
    const formData = new FormData();
    formData.append('mainName', mainName);
    formData.append('carModel', carModel);
    formData.append('carKm', carKm);
    formData.append('carRate1', carRate1);
    formData.append('carRate2', carRate2);
    formData.append('carMonth', carMonth);
    formData.append('carType', carType);
    formData.append('carDoor', carDoor);
    formData.append('carSeat', carSeat);
    formData.append('carPower', carPower);
    formData.append('carAutomation', carAutomation);
    formData.append('carTarget', carTarget);
    formData.append('carColor', carColor);
    formData.append('carInterColor', carInterColor);
    formData.append('carFuel', carFuel);
    formData.append('carCylinder', carCylinder);
    formData.append('carWaranty', carWaranty);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('image4', image4);

    // Send the POST request with fetch()
    fetch('http://localhost:4015/BodyListing/post', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      alert('Body listing submitted successfully');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting listing');
    });
  }


// Body Post Method clouses

