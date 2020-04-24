console.log("welcome to my project");

const projectForm = document.querySelector('#projectForm');
const btnViewX = document.querySelector('#btnViewX');

// viewData();
projectForm.addEventListener('submit', function (e) {
    let xhr = new XMLHttpRequest;
    let name = document.querySelector('#name').value;
    let image = document.querySelector('#image').value;
    let description = document.querySelector('#description').value;
    let data = {
        "name": name,
        "image": image,
        "description": description
    }
    xhr.open('POST', 'http://localhost:3030/projects', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
    // viewData();
    let form = document.querySelector('#projectForm');
    form.reset();
    e.preventDefault();
});

btnViewX.addEventListener('click', viewData);
function viewData() {
    let xhr = new XMLHttpRequest;
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonData = JSON.parse(this.responseText);
            let html = "";
            Array.from(jsonData).forEach((element, index) => {
                html += `<div class="card  my-3 mx-2" style="width: 21rem;">
                                <img src=${element.image} class="card-img-top" alt="image">
                                <div class="card-body">
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
    }
    xhr.open('GET', 'http://localhost:3030/projects', true);
    xhr.send();
}

function viewProjectDetails(index) {
    console.log('clicked')
    let xhr = new XMLHttpRequest;
    let html = "";
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonData = JSON.parse(this.responseText);
            Array.from(jsonData).forEach((element) => {
                // console.log(element._id);
                if (element._id == index) {
                    html += `<div class="cardDetails">
                            <div class="card my-card">
                                <div class="card-body details">
                                   <button id="btnClose" onclick="closeBtn()" class="btn btn-dark btn-close">X</button>
                                   <h5 class="card-title title">${element.name}</h5>
                                   <img src="${element.image}" class="img"
                                   alt="image">
                                   <p class="card-text text">${element.description}</p>
                                </div>
                            </div>
                        </div>`
                }
            });
            let mainContainer = document.querySelector('#main-container');
            mainContainer.style.display = "block";
            mainContainer.innerHTML = html;
        }
    }

    xhr.open('GET', 'http://localhost:3030/projects', true);
    xhr.send();
    // }
}

function closeBtn() {
    let cardDetails = document.querySelector('#main-container');
    cardDetails.style.display = "none";
};

function deleteProject(index) {
    // console.log(index);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonData = JSON.parse(this.responseText);
        }
    }
    xhr.open('DELETE', 'http://localhost:3030/projects/' + index, true);
    xhr.send();
    // jsonData.splice(index, 1);
    viewData();
};
