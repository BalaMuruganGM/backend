fetch('http://auth-db1559.hstgr.io/images/get')
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
    document.getElementById('Uname').value = car.name;
    document.getElementById('UcarName').value = car.carName;
    document.getElementById('UcarPrice').value = car.carPrice;
    document.getElementById('UcarModel').value = car.carModel;
    document.getElementById('UcarMillage').value = car.carMillage;
    document.getElementById('UfuelType').value = car.fuelType;
    document.getElementById('UcarCC').value = car.carCC;
    document.getElementById('UcarType').value = car.carType;
    document.getElementById('UcarDoor').value = car.carDoor;
    document.getElementById('UcarSeat').value = car.carSeat;
    document.getElementById('Ucarpower').value = car.carpower;
    document.getElementById('UcarAutomation').value = car.carAutomation;
    document.getElementById('UcarTarget').value = car.carTarget;
    document.getElementById('UcarColor').value = car.carColor;
    document.getElementById('UcarInterColor').value = car.carInterColor;
    document.getElementById('UcarCylinder').value = car.carCylinder;
    document.getElementById('UcarWaranty').value = car.carWaranty;

    // Preview images
    document.getElementById('previewPhoto1').src = car.photo1;
    document.getElementById('previewPhoto2').src = car.photo2;
    document.getElementById('previewPhoto3').src = car.photo3;
    document.getElementById('previewPhoto4').src = car.photo4;
}



// Submit the updated car data to the server
document.getElementById('updateCarForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', document.getElementById('Uname').value);
    formData.append('carName', document.getElementById('UcarName').value);
    formData.append('carPrice', document.getElementById('UcarPrice').value);
    formData.append('carModel', document.getElementById('UcarModel').value);
    formData.append('carMillage', document.getElementById('UcarMillage').value);
    formData.append('fuelType', document.getElementById('UfuelType').value);
    formData.append('carCC', document.getElementById('UcarCC').value);
    formData.append('carType', document.getElementById('UcarType').value);
    formData.append('carDoor', document.getElementById('UcarDoor').value);
    formData.append('carSeat', document.getElementById('UcarSeat').value);
    formData.append('carpower', document.getElementById('Ucarpower').value);
    formData.append('carAutomation', document.getElementById('UcarAutomation').value);
    formData.append('carTarget', document.getElementById('UcarTarget').value);
    formData.append('carColor', document.getElementById('UcarColor').value);
    formData.append('carInterColor', document.getElementById('UcarInterColor').value);
    formData.append('carCylinder', document.getElementById('UcarCylinder').value);
    formData.append('carWaranty', document.getElementById('UcarWaranty').value);

    // File inputs
    if (document.getElementById('photo1').files[0])
        formData.append('photo1', document.getElementById('photo1').files[0]);
    if (document.getElementById('photo2').files[0])
        formData.append('photo2', document.getElementById('photo2').files[0]);
    if (document.getElementById('photo3').files[0])
        formData.append('photo3', document.getElementById('photo3').files[0]);
    if (document.getElementById('photo4').files[0])
        formData.append('photo4', document.getElementById('photo4').files[0]);

    const id = document.getElementById('editId').value;

    fetch(`http://localhost:4015/Listing/update/${id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert('Car updated successfully!');
            location.reload();
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
    // tb3.innerHTML = ''; // Clear previous data
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
        
        document.getElementById('BcarId').value = car.id;
        document.getElementById('mainName').value = car.mainName;
        document.getElementById('BcarModel').value = car.carModel;
        document.getElementById('BcarKm').value = car.carKm;
        document.getElementById('BcarRate1').value = car.carRate1;
        document.getElementById('BcarRate2').value = car.carRate2;
        document.getElementById('BcarMonth').value = car.carMonth;
        document.getElementById('BcarFuel').value = car.carFuel;
        document.getElementById('BcarType').value = car.carType;
        document.getElementById('BcarDoor').value = car.carDoor;
        document.getElementById('BcarSeat').value = car.carSeat;
        document.getElementById('BcarPower').value = car.carPower;
        document.getElementById('BcarAutomation').value = car.carAutomation;
        document.getElementById('BcarTarget').value = car.carTarget;
        document.getElementById('BcarColor').value = car.carColor;
        document.getElementById('BcarInterColor').value = car.carInterColor;
        document.getElementById('BcarCylinder').value = car.carCylinder;
        document.getElementById('BcarWaranty').value = car.carWaranty;
    
        // Set the image previews (VERY IMPORTANT)
        document.getElementById('imgPreview1').src = car.image1 ? car.image1 : '';
        document.getElementById('imgPreview2').src = car.image2 ? car.image2 : '';
        document.getElementById('imgPreview3').src = car.image3 ? car.image3 : '';
        document.getElementById('imgPreview4').src = car.image4 ? car.image4 : '';
    }
    

document.getElementById('bodyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('mainName', document.getElementById('mainName').value);
    formData.append('carModel', document.getElementById('BcarModel').value);
    formData.append('carKm', document.getElementById('BcarKm').value);
    formData.append('carRate1', document.getElementById('BcarRate1').value);
    formData.append('carRate2', document.getElementById('BcarRate2').value);
    formData.append('carMonth', document.getElementById('BcarMonth').value);
    formData.append('carFuel', document.getElementById('BcarFuel').value);
    formData.append('carType', document.getElementById('BcarType').value);
    formData.append('carDoor', document.getElementById('BcarDoor').value);
    formData.append('carSeat', document.getElementById('BcarSeat').value);
    formData.append('carPower', document.getElementById('BcarPower').value);
    formData.append('carAutomation', document.getElementById('BcarAutomation').value);
    formData.append('carTarget', document.getElementById('BcarTarget').value);
    formData.append('carColor', document.getElementById('BcarColor').value);
    formData.append('carInterColor', document.getElementById('BcarInterColor').value);
    formData.append('carCylinder', document.getElementById('BcarCylinder').value);
    formData.append('carWaranty', document.getElementById('BcarWaranty').value);
    
    // Add images if new images are selected
    if (document.getElementById('image1').files.length > 0) {
        formData.append('image1', document.getElementById('image1').files[0]);
    }
    if (document.getElementById('image2').files.length > 0) {
        formData.append('image2', document.getElementById('image2').files[0]);
    }
    if (document.getElementById('image3').files.length > 0) {
        formData.append('image3', document.getElementById('image3').files[0]);
    }
    if (document.getElementById('image4').files.length > 0) {
        formData.append('image4', document.getElementById('image4').files[0]);
    }
        const id = document.getElementById('BcarId').value;

    fetch(`http://localhost:4015/BodyList/update/${id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert('Car updated successfully!');
            location.reload();
        } else {
            alert('Update failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Update error:', error);
        alert('Something went wrong.');
    });
});

// Body Put Lisitng clouses

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


// Body post Method Start && create usere

  function submitForm() {
    // Gather text input values
    const mainName = document.getElementById('BP-mainName').value;
    const carModel = document.getElementById('BP-carModel').value;
    const carKm = document.getElementById('BP-carKm').value;
    const carRate1 = document.getElementById('BP-carRate1').value;
    const carRate2 = document.getElementById('BP-carRate2').value;
    const carMonth = document.getElementById('BP-carMonth').value;
    const carType = document.getElementById('BP-carType').value;
    const carDoor = document.getElementById('BP-carDoor').value;
    const carSeat = document.getElementById('BP-carSeat').value;
    const carPower = document.getElementById('BP-carPower').value;
    const carAutomation = document.getElementById('BP-carAutomation').value;
    const carTarget = document.getElementById('BP-carTarget').value;
    const carColor = document.getElementById('BP-carColor').value;
    const carInterColor = document.getElementById('BP-carInterColor').value;
    const carFuel = document.getElementById('BP-carFuel').value;
    const carCylinder = document.getElementById('BP-carCylinder').value;
    const carWaranty = document.getElementById('BP-carWaranty').value;

    // Gather file inputs (each is a File object)
    const image1 = document.getElementById('BP-image1').files[0];
    const image2 = document.getElementById('BP-image2').files[0];
    const image3 = document.getElementById('BP-image3').files[0];
    const image4 = document.getElementById('BP-image4').files[0];

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
      location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting listing');
    });
  }


// Body Post Method clouses




// Listing Page Stat

function LForm() {
    const formData = new FormData();
    
    // Add form data from inputs
    formData.append('mainName', document.getElementById('L-mainName').value);
    formData.append('carModel', document.getElementById('L-carModel').value);
    formData.append('carKm', document.getElementById('L-carKm').value);
    formData.append('carRate1', document.getElementById('L-carRate1').value);
    formData.append('carRate2', document.getElementById('L-carRate2').value);
    formData.append('carMonth', document.getElementById('L-carMonth').value);
    formData.append('carType', document.getElementById('L-carType').value);
    formData.append('carDoor', document.getElementById('L-carDoor').value);
    formData.append('carSeat', document.getElementById('L-carSeat').value);
    formData.append('carPower', document.getElementById('L-carPower').value);
    formData.append('carAutomation', document.getElementById('L-carAutomation').value);
    formData.append('carTarget', document.getElementById('L-carTarget').value);
    formData.append('carColor', document.getElementById('L-carColor').value);
    formData.append('carInterColor', document.getElementById('L-carInterColor').value);
    formData.append('carFuel', document.getElementById('L-carFuel').value);
    formData.append('carCylinder', document.getElementById('L-carCylinder').value);
    formData.append('carWaranty', document.getElementById('L-carWaranty').value);
    formData.append('carName2', document.getElementById('L-carName2').value);

    // Add files from input fields
    formData.append('image1', document.getElementById('L-image1').files[0]);
    formData.append('image2', document.getElementById('L-image2').files[0]);
    formData.append('image3', document.getElementById('L-image3').files[0]);
    formData.append('image4', document.getElementById('L-image4').files[0]);

    // Logging to check if the data is correct
    console.log('Form Data:', formData);

    // Send data to backend
    fetch('http://localhost:4015/pageListing/post', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Car listing submitted successfully');
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error submitting car listing');
    });
  }

// List page post clouses

fetch('http://localhost:4015/pageList/get')
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        console.log("Something perssha");
    }
})
.then(data => {
    let a = data.data;
    const tb4 = document.querySelector('.tb-4'); 
    // tb4.innerHTML = ''; // Clear previous data
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
                <button class="LEdit" onclick="LbodyXon()">Update</button>
                <button class="">Delete</button>
            </td>
        `;

        tr1.querySelector('.LEdit').addEventListener('click', () => {
            LCar(element);
        });

        // tr1.querySelector('.bodyDelete').addEventListener('click', () => {
        //     if (confirm('Are you sure you want to delete this car?')) {
        //         deleteCar(element.id);
        //     }
        // });

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
            <td>${element.carName2}</td>
        `;
   
        tb4.appendChild(tr1);
        tb4.appendChild(tr2);
    });
})
.catch(error => {
    console.log("error: " + error);
});


// Listing page put method Start

function LCar(car) {
    document.getElementById('LForm').style.display = 'block';
    
    document.getElementById('LcarId').value = car.id;
    document.getElementById('LmainName').value = car.mainName;
    document.getElementById('LcarModel').value = car.carModel;
    document.getElementById('LcarKm').value = car.carKm;
    document.getElementById('LcarRate1').value = car.carRate1;
    document.getElementById('LcarRate2').value = car.carRate2;
    document.getElementById('LcarMonth').value = car.carMonth;
    document.getElementById('LcarFuel').value = car.carFuel;
    document.getElementById('LcarType').value = car.carType;
    document.getElementById('LcarDoor').value = car.carDoor;
    document.getElementById('LcarSeat').value = car.carSeat;
    document.getElementById('LcarPower').value = car.carPower;
    document.getElementById('LcarAutomation').value = car.carAutomation;
    document.getElementById('LcarTarget').value = car.carTarget;
    document.getElementById('LcarColor').value = car.carColor;
    document.getElementById('LcarInterColor').value = car.carInterColor;
    document.getElementById('LcarCylinder').value = car.carCylinder;
    document.getElementById('LcarWaranty').value = car.carWaranty;
    document.getElementById('LcarName2')
    // Set the image previews (VERY IMPORTANT)
    document.getElementById('LimgPreview1').src = car.image1 ? car.image1 : '';
    document.getElementById('LimgPreview2').src = car.image2 ? car.image2 : '';
    document.getElementById('LimgPreview3').src = car.image3 ? car.image3 : '';
    document.getElementById('LimgPreview4').src = car.image4 ? car.image4 : '';
}


document.getElementById('LForm').addEventListener('submit', function(e) {
e.preventDefault();

const formData = new FormData();
formData.append('mainName', document.getElementById('LmainName').value);
formData.append('carModel', document.getElementById('LcarModel').value);
formData.append('carKm', document.getElementById('LcarKm').value);
formData.append('carRate1', document.getElementById('LcarRate1').value);
formData.append('carRate2', document.getElementById('LcarRate2').value);
formData.append('carMonth', document.getElementById('LcarMonth').value);
formData.append('carFuel', document.getElementById('LcarFuel').value);
formData.append('carType', document.getElementById('LcarType').value);
formData.append('carDoor', document.getElementById('LcarDoor').value);
formData.append('carSeat', document.getElementById('LcarSeat').value);
formData.append('carPower', document.getElementById('LcarPower').value);
formData.append('carAutomation', document.getElementById('LcarAutomation').value);
formData.append('carTarget', document.getElementById('LcarTarget').value);
formData.append('carColor', document.getElementById('LcarColor').value);
formData.append('carInterColor', document.getElementById('LcarInterColor').value);
formData.append('carCylinder', document.getElementById('LcarCylinder').value);
formData.append('carWaranty', document.getElementById('LcarWaranty').value);

// Add images if new images are selected
if (document.getElementById('image1').files.length > 0) {
    formData.append('image1', document.getElementById('LimgPreview1').files[0]);
}
if (document.getElementById('image2').files.length > 0) {
    formData.append('image2', document.getElementById('LimgPreview2').files[0]);
}
if (document.getElementById('image3').files.length > 0) {
    formData.append('image3', document.getElementById('LimgPreview3').files[0]);
}
if (document.getElementById('image4').files.length > 0) {
    formData.append('image4', document.getElementById('LimgPreview4').files[0]);
}
    const id = document.getElementById('LcarId').value;

fetch(`http://localhost:4015/pageList/update${id}`, {
    method: 'PUT',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.status) {
        alert('Car updated successfully!');
        location.reload();
    } else {
        alert('Update failed: ' + data.message);
    }
})
.catch(error => {
    console.error('Update error:', error);
    alert('Something went wrong.');
});
});

// Listing page put method clouses


// Lpage get Start 




// Lpage get Clouses

// Listing page Clouses

