

function postmark_none(){
    const postmethod = document.querySelector('.postmethod');
    postmethod.style.display = "none";
}

function postmark_block(){
const postmethod = document.querySelector('.postmethod');
postmethod.style.display = "block";

}

function putmethod_block(){
    const putmethod = document.getElementById('updateForm');
    putmethod.style.display = "flex";
}

function putmethod_none(){
    const putmethod = document.getElementById('updateForm');
    putmethod.style.display = "none";
   
}


document.querySelector('.editButton').addEventListener('click' , ()=>{
    document.querySelector('.editForm').style.display = "flex";
})

function fbXmark(){
    document.querySelector('.editForm').style.display = "none";
}

// document.querySelector('.bodyXmark').addEventListener('click' , ()=>{
//     document.querySelector('.bodyForm').style.display = "none";
// })

function bodyX(){
    document.querySelector('.bodyForm').style.display = "none";
}

document.querySelector('.bodyEdit').addEventListener('click' , ()=>{
    document.querySelector('.bodyForm').style.display = "flex";
})


function postBodyOn(){
    document.querySelector('.bodyPost').style.display = "flex";
}

function postBodyOff(){
    document.querySelector('.bodyPost').style.display = "none";

}


