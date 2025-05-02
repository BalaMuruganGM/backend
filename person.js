fetch('http://localhost:4015/images/get')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const table = document.querySelector('.tbOne');
    data.data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td><img src="${item.url}"/></td>
        <td>
          <button class="tdbut1" onclick="editImage(${item.id})">Edit</button>
          <button class="tdbut1" onclick="deleteImage(${item.id})">Delete</button>
        </td>
      `;
      table.appendChild(row);
    });
  });


// post method

  function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('images', fileInput.files[0]);
  
    fetch('http://localhost:4015/images/post', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log('Uploaded:', data);
      alert("Image uploaded successfully!");
    });
  }


// putMethod

document.getElementById('updateForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent page reload

    let id = document.getElementById('idInput').value; // Get image ID
    let fileInput = document.getElementById('imageInput').files[0]; // Get new image file

    if (!id) {
        alert('Please enter the Image ID.');
        return;
    }

    let formData = new FormData();
    formData.append('images', fileInput); // Add image file (backend expects 'images')

    try {
        let response = await fetch(`http://localhost:4015/image/put/${id}`, {
            method: 'PUT',
            body: formData
        });

        let result = await response.json();

        if (result.status) {
            alert('Image updated successfully!');
            console.log(result);
        } else {
            alert('Failed to update image.');
        }
    } catch (error) {
        console.log('Error:', error);
        alert('Something went wrong.');
    }
});

  
//  Delete Method

function deleteImage(id) {
    fetch(`http://localhost:4015/image/delete/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      console.log('Deleted:', data);
      alert("Image deleted successfully!");
      location.reload(); // refresh page to reflect change
    });
  }
  