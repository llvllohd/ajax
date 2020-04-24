// console.log("Iam fetch")

const btnSave = document.querySelector('#btnSave');
const btnViewF = document.querySelector('#btnViewF');

btnSave.onsubmit= function(e){
    // console.log("clicked")
    let name = document.querySelector('#name').value;
    let image = document.querySelector('#image').value;
    let description = document.querySelector('#description').value;

    fetch('http://localhost:3030/projects',{
        method:'POST',
        headers:{
            'Content-Type':'application/json:charset=utf-8'
        },
        body: JSON.stringify({
            'name': name,
            'image':image,
            'description':description
        })
    }).then(response => {
        response.json()
    })
    .then(function(jsonData) {
        console.log(JSON.parse(jsonData));
    });
}

btnViewF.addEventListener('click',function(e){
    fetch('http://localhost:3030/projects')
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        let html="";
       Array.from(jsonData).forEach(element => {
           html+= `<div class="card  my-3 mx-2" style="width: 21rem;">
                     <img src=${element.image} class="card-img-top" alt="image">
                        <div class="card-body d-flex flex-column">
                           <h5 class="card-title">${element.name}</h5>
                          <p class="card-text">${element.description}</p>
                          <div class="d-flex flex-row">
                          <button id="${element._id}" onclick="viewProjectDetails(this.id)" class="btn mt-auto btn-block btn-dark btnView" >View details</button>       
                          <button id="${element._id}" onclick="deleteProject(this.id)" class="btn mt-auto mx-1 btn-block btn-dark btnDelete" >Delete</button>
                          </div>
                          </div>
                    </div>`
       }); 
       let cardData = document.querySelector('#cardData');
       cardData.innerHTML = html;
    })
    .catch(function(err){
        console.log("Something is wrong..");
    });


});