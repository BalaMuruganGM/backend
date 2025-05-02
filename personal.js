

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


// Lpost

function LpostOn(){
    document.querySelector('.LPost').style.display = "flex";
}

function LpostOff(){
    document.querySelector('.LPost').style.display = "none";
}

function LbodyXon(){
    document.querySelector('.LForm').style.display = "flex";
}

function LbodyXoff(){
    document.querySelector('.LForm').style.display = "none";
}


// Table Script Start

// document.querySelector('.selectTap-1').addEventListener('click', function(){
//     document.querySelector('.tb-1').style.display = "flex";
// });

function select1(){
    document.querySelector('.tb-1').style.display = "inline-block";
    document.querySelector('.homePageH1').style.display = "flex";
    document.querySelector('.Latest').style.display = "none";
    document.querySelector('.tb-2').style.display = "none";
    document.querySelector('.tb-3').style.display = "none";
    document.querySelector('.tb-4').style.display = "none";
    document.querySelector('.postCreat').style.display = "none";
    document.querySelector('.bodyListingTable').style.display = "none";
    document.querySelector('.LPostH1').style.display = "none";
    document.querySelector('.Lbody_postCreate').style.display = "none";      

}

function select2(){
    document.querySelector('.tb-1').style.display = "none";
    document.querySelector('.tb-2').style.display = "inline-block";
    document.querySelector('.homePageH1').style.display = "none";
    document.querySelector('.Latest').style.display = "flex";
    document.querySelector('.tb-3').style.display = "none";
    document.querySelector('.tb-4').style.display = "none";
    document.querySelector('.postCreat').style.display = "none";
    document.querySelector('.bodyListingTable').style.display = "none";
    document.querySelector('.LPostH1').style.display = "none";
    document.querySelector('.Lbody_postCreate').style.display = "none";      
}

function select3(){
    document.querySelector('.tb-1').style.display = "none";
    document.querySelector('.tb-2').style.display = "none";
    document.querySelector('.tb-3').style.display = "inline-block";
    document.querySelector('.tb-4').style.display = "none";
    document.querySelector('.postCreat').style.display = "flex";
    document.querySelector('.bodyListingTable').style.display = "flex";
    document.querySelector('.LPostH1').style.display = "none";
    document.querySelector('.Lbody_postCreate').style.display = "none";      
    document.querySelector('.homePageH1').style.display = "none";
    document.querySelector('.Latest').style.display = "none";
}

function select4(){
    document.querySelector('.tb-1').style.display = "none";
    document.querySelector('.tb-2').style.display = "none";
    document.querySelector('.tb-3').style.display = "none";
    document.querySelector('.tb-4').style.display = "inline-block";
    document.querySelector('.postCreat').style.display = "none";
    document.querySelector('.bodyListingTable').style.display = "none";
    document.querySelector('.LPostH1').style.display = "flex";
    document.querySelector('.Lbody_postCreate').style.display = "flex";    
    document.querySelector('.homePageH1').style.display = "none";
    document.querySelector('.Latest').style.display = "none";

}



// Table Script Clouses