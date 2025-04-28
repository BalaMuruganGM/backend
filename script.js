fetch('http://localhost:4015/images/get/1')
.then((response)=>{
    if(response.ok){
        return response.json();
    }else{
        console.log("perasshanai");
    }
}).then((data)=>{
    console.log(data);

    let a = data;
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


// //postmethod 
// //postmethod start

// document.getElementById('uploadForm').addEventListener('submit', async function (e) {
//     e.preventDefault(); // Prevent page reload

//     let fileInput = document.getElementById('imageInput'); // Get file input
//     let nameInput = document.getElementById('nameInput'); // Get name input

//     if (fileInput.files.length === 0) {
//         alert('Please select an image.');
//         return;
//     }

//     let formData = new FormData();
//     formData.append('name', nameInput.value); // Add image name
//     formData.append('images', fileInput.files[0]); // Add image file (backend expects 'images')

//     try {
//         let response = await fetch('http://localhost:4015/images/post', {
//             method: 'POST',
//             body: formData
//         });

//         let result = await response.json();

//         if (result.status) {
//             alert('Image uploaded successfully!');
//             location.reload();
//             console.log(result);
//         } else {
//             alert('Failed to upload image.');
//             console.log(result.message);
//         }
//     } catch (error) {
//         console.log('Error:', error);
//         alert('Something went wrong.');
//     }
// });





// //postmethod clouse

// //putmethod 

// // put method start

// document.getElementById('updateForm').addEventListener('submit', async function (e) {
//     e.preventDefault(); // Prevent page reload

//     let id = document.getElementById('idInput').value; // Get image ID
//     let fileInput = document.getElementById('imageput').files[0]; // Get new image file

//     if (!id) {
//         alert('Please enter the Image ID.');
//         return;
//     }

//     let formData = new FormData();
//     formData.append('images', fileInput); // Add image file (backend expects 'images')

//     try {
//         let response = await fetch(`http://localhost:4015/image/put/${id}`, {
//             method: 'PUT',
//             body: formData
//         });

//         let result = await response.json();

//         if (result.status) {
//             alert('Image updated successfully!');
//             console.log(result);
//         } else {
//             alert('Failed to update image.');
//         }
//     } catch (error) {
//         console.log('Error:', error);
//         alert('Something went wrong.');
//     }
// });


// //put method clouse


// POST Method (Image Upload)
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent page reload

    let fileInput = document.getElementById('imageInput'); // Get file input
    let nameInput = document.getElementById('nameInput'); // Get name input

    if (fileInput.files.length === 0) {
        alert('Please select an image.');
        return;
    }

    let formData = new FormData();
    formData.append('name', nameInput.value.trim()); // Trim spaces from name input
    formData.append('images', fileInput.files[0]); // Add image file

    try {
        let response = await fetch('http://localhost:4015/images/post', {
            method: 'POST',
            body: formData
        });

        let result = await response.json();

        if (response.ok && result.status) {
            alert('Image uploaded successfully!');
            location.reload();
        } else {
            alert('Failed to upload image: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

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


// delete method 

// document.getElementById('deleteForm').addEventListener('submit', async function (e) {
//     e.preventDefault(); // Prevent page reload

//     let id = document.getElementById('idInput').value; // Get image ID

//     if (!id) {
//         alert('Please enter the Image ID.');
//         return;
//     }


//     async function deleteImage(Id) {
//         if (!confirm("Are you sure you want to delete this image?")) {
//             return;
//     }

//     try {
//         let response = await fetch(`http://localhost:4015/image/delete/${id}`, {
//             method: 'DELETE'
//         });

//         let result = await response.json();

//         if (result.status) {
//             alert('Image deleted successfully!');
//             console.log(result);
//         } else {
//             alert('Failed to delete image.');
//         }
//     } catch (error) {
//         console.log('Error:', error);
//         alert('Something went wrong.');
//     }
// };

// fetch('http://localhost:4015/images/get')
//     .then((response) => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             console.log("perasshanai");
//         }
//     })
//     .then((data) => {
//         console.log(data);

//         let a = data.data;
//         console.log(a);

//         const tableData = document.querySelector('.tap-1');

//         a.forEach((element) => {
//             const Newtr = document.createElement('tr');
//             Newtr.innerHTML =
//                 `<td>${element.id}</td>
//                 <td>${element.name}</td>
//                 <td><img src="${element.url}" width="100"></td>
//                 <td>
//                     <div class="td-button">
//                         <button class="td-but1" data-id="${element.id}">Edit</button>
//                         <button class="td-but2" data-id="${element.id}">Delete</button>
//                     </div>
//                 </td>`;

//             tableData.appendChild(Newtr);
//         });

//         // Attach event listener for Edit button
//         document.querySelectorAll('.td-but1').forEach(button => {
//             button.addEventListener('click', function () {
//                 let imageId = this.getAttribute('data-id'); 
//                 document.getElementById('idInput').value = imageId;
//             });
//         });

//         // Attach event listener for Delete button
//         document.querySelectorAll('.td-but2').forEach(button => {
//             button.addEventListener('click', function () {
//                 let imageId = this.getAttribute('data-id'); 
//                 deleteImage(imageId);
//             });
//         });

//     })
//     .catch((error) => {
//         console.log(error);
//     });

// ✅ Delete function to send DELETE request
async function deleteImage(imageId) {
    if (!confirm("Are you sure you want to delete this image?")) {
        return;
    };

    try {
        let response = await fetch(`http://localhost:4015/image/delete/${imageId}`, {
            method: 'DELETE'
        });

        let result = await response.json();

        if (response.ok && result.status) {
            alert('Image deleted successfully!');
            location.reload(); // Refresh the page to update the table
        }else{
            alert('Failed to delete image: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
};
