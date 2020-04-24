console.log('hello')


const btnViewJ = document.querySelector('#btnViewJ');
const btnSaveJquery = document.querySelector('#btnSaveJquery');

btnSaveJquery.addEventListener("click",function(e){
    console.log("hello");
    var name = $('#name').val();
    let image = document.querySelector('#image').value;
    let description = document.querySelector('#description').value;
    let jsonData = {
        "name": name,
        "image": image,
        "description":description
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3030/projects',
        data: jsonData,
        success: function(data) {
            // var str = JSON.stringify(data, undefined, 4);
            // output(syntaxHighlight(str));
        },
        contentType: "application/json",
        dataType: 'json'
    });
    // e.preventdefault();
});


btnViewJ.addEventListener('click', function(){
    // console.log("hello")
    $.ajax({
        type: "GET",
        url: 'http://localhost:3030/projects',
        success: function(result) {
            // console.log(JSON.stringify(result));
            let html = "";
            result.forEach(element => {
                html += `<div class="card  my-3 mx-2" style="width: 21rem;">
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
        }
    });

});
