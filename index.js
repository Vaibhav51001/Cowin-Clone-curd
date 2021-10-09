let globalTaskData=[];
taskContents = document.getElementById("taskContents");
taskModal = document.getElementById("task__modal")

const addCard=()=>{
    const newTaskDetails={
        id: `${Date.now()}`,
        Vtype: document.getElementById("Vtype").value,
        member: document.getElementById("member").value,
        yBirth: document.getElementById("yBirth").value,
        photoID: document.getElementById("photoID").value,
        idno: document.getElementById("idno").value,
        dose1: document.getElementById("dose1").value,
        dose2: document.getElementById("dose2").value
    }
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}
const generateTaskCard=({id, Vtype, member, yBirth, photoID, idno, dose1, dose2}) =>
`<div class="col-md-4 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card shadow-sm task__card text-center">
        <div class="card-header d-flex justify-content-end">
            <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
            <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
            </button>
            <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
            <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
            </button>
        </div>
        <div class="card-header card-header-mod">
            <img src="./assets/syringe.png" class="img-thumbnail" alt="...">
            <h5 class="display-5" style="display: inline; padding-left: 1rem;">${Vtype}</h5>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush" style="font-weight=bold">
                <li class="list-group-item">Name:<h5 class="card-title">${member}</h5></li>
                <li class="list-group-item">Year of Birth:<p class="card-text"> ${yBirth}</p></li>
                <li class="list-group-item">Photo-ID:<p class="card-text"><span class="badge bg-primary">${photoID}</span></p></li>
                <li class="list-group-item">ID-Number:<p class="card-text">${idno}</p></li>
                <li class="list-group-item">Dose1:<p class="card-text">${dose1}</p></li>
                <li class="list-group-item">Dose2:<p class="card-text">${dose2}</p></li>
            </ul>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary float-begin" name=${id} data-bs-toggle="modal" data-bs-target="#displayTask" onclick="openTask(this)"></button>
        </div>
    </div>
</div>`

const saveToLocalStorage=() => {
    localStorage.setItem("member", JSON.stringify({members: globalTaskData}))
}
// here reloadTaskCard funct always load the card on reload of page.
const reloadTaskCard=() => {
    const localStorageCopy = JSON.parse(localStorage.getItem("member"));
    if(localStorageCopy){
        globalTaskData = localStorageCopy["members"];
    }
    globalTaskData.map((cardData)=>{
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));    
    })
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editTask =(e)=>{
    const targetID = e.getAttribute("name");
    // console.log(e);
    // console.log(e.parentNode);
    // console.log(e.parentNode.parentNode.parentNode);
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].childNodes[1]);
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]);
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]);
    // to check index in console.
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].childNodes[1].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[3].childNodes[1].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[5].childNodes[1].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[7].childNodes[1].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[9].childNodes[1].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[11].childNodes[1].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].classList.remove("fa-pencil-alt");
    e.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].classList.add("fa-check");
    e.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].setAttribute("onclick","saveEditTask(this)");  
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML="Save Changes";
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)");
}
const saveEditTask =(e)=>{
    const targetID = e.getAttribute("name"); 
    const e_obj = {
        member: e.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].childNodes[1].innerHTML,
        yBirth: e.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML,
        photoID: e.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[5].childNodes[1].innerHTML,
        idno: e.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[7].childNodes[1].innerHTML,
        dose1: e.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[9].childNodes[1].innerHTML,
        dose2: e.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[11].childNodes[1].innerHTML
    }
    console.log(globalTaskData);
    globalTaskData = globalTaskData.filter((cardData)=> {
    if(cardData.id==targetID){
        cardData.member = e_obj.member;
        cardData.yBirth = e_obj.yBirth;
        cardData.photoID = e_obj.photoID;
        cardData.idno = e_obj.idno;
        cardData.dose1 = e_obj.dose1;
        cardData.dose2 = e_obj.dose2;
    }
    return globalTaskData;
    })
    saveToLocalStorage();
    window.location.reload();  
}
// const openModalContent = ({ id, title, description, url }) => {
//     const date = new Date(parseInt(id));
//     return ` <div id=${id}>
//                 <img width="100%" 
//                 src=${url || `https://images.unsplash.com/photo-1611465577672-8fc7be1dc826?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
//                 alt="bg image"
//                 class="img-fluid place__holder__image mb-3"
//                 />
//                 <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
//                 <h2 class="my-3">${title}</h2>
//                 <p class="lead">${description}</p>
//             </div>`;
//   };
// const openTask = (e) => {
//     const targetID = e.getAttribute("name"); 
//     const getTask =  globalTaskData.filter((cardData) => cardData.id === targetID);
//     taskModal.innerHTML = openModalContent(getTask[0]);
// };
// const searchTask =()=>{
//     const s_title = document.getElementById("search_txt").value;
//     console.log(s_title);
//     while (taskContents.firstChild) {
//         taskContents.removeChild(taskContents.firstChild);
//     }
//     globalTaskData = globalTaskData.filter((cardData)=> {
//         if(cardData.title===s_title){
//             taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
//         }
//     })
//     // const resultData = globalTaskData.filter((obj) => obj.title===s_title);
//     // resultData.filter((cardData) => {
//     //     taskContents.insertAdjacentHTML("beforeend", globalTaskData(cardData));
//     // });
// }
