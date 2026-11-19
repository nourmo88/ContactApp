var btnForm = document.querySelector(".Form");
var imgInput = document.querySelector("#img");
var nameInput = document.querySelector(".Form .full-name");
var phoneInput = document.querySelector(".Form .phone-num");
var emailInput = document.querySelector(".Form .email");
var addressInput = document.querySelector(".Form .add");
var groupInput = document.querySelector(".Form .group");
var notesInput = document.querySelector(".Form .notes");
var favoriteInput = document.querySelector(".Form .favorite");
var emergencyInput = document.querySelector(".Form .emergency");
var nocotact = document.querySelector(".main .nocontact");
var nofav = document.querySelector(".main .nofav");
var noemr = document.querySelector(".main .noemr");
var profile = document.querySelector(".Form .profile");
var savebtn = document.querySelector(".Form .savebtn");
var updatebtn = document.querySelector(".Form .updatebtn");
var insearch = document.querySelector(".main #search");


var contacts = [];
if (localStorage.getItem("Contact") !== null) {
    nocotact.classList.add("d-none")
    contacts = JSON.parse(localStorage.getItem("Contact"))
    displayContacts();
}
else {
    document.querySelector(".total").innerHTML = 0;
    document.querySelector(".totalfav").innerHTML = 0;
    document.querySelector(".totalemr").innerHTML = 0;
}

function openForm() {
    btnForm.classList.remove("d-none")
}

function cloceForm() {
    btnForm.classList.add("d-none");
    clear();
}

function addContact() {
    if (validation(nameInput, "Name") &&
        validation(phoneInput, "Phone") &&
        validation(emailInput, "Email") &&
        validation(addressInput, "Add") &&
        validation(groupInput, "Group") &&
        validation(imgInput, "IMG")) {
        var contact = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            address: addressInput.value,
            group: groupInput.value,
            notes: notesInput.value,
            favorite: favoriteInput.checked ? favoriteInput.value : "",
            emergency: emergencyInput.checked ? emergencyInput.value : "",
            img: imgInput.files[0] ? `img/${imgInput.files[0].name}` : "img/user.png",
        }

        contacts.push(contact);
        localStorage.setItem("Contact", JSON.stringify(contacts));
        displayContacts();
        clear();
        Swal.fire({
            title: 'Success!',
            text: 'Contact add successfully',
            icon: 'success',
        })
    }
}

function displayContacts() {
    var x = "";
    var fav = "";
    var emr = "";
    var favnum = 0;
    var emrnum = 0;
    for (var i = 0; i < contacts.length; i++) {
        x += `<div class="item col-sm-12 col-md-6">
                                <div class="inner rounded-4 bg-white overflow-hidden">
                                    <div class="ps-3 pe-3 pt-3">
                                        <div class="maininformation d-flex gap-3 align-items-center">
                                            <div class="forimg position-relative">
                                                <img src="${contacts[i].img}" class="rounded-3" alt="photo">
                                                `
        if (contacts[i].favorite) {
            x += `
                                                <div class="fav foricon position-absolute badge p-1">
                                                    <i class="fa-solid fa-star text-white"></i>
                                                </div>`}
        if (contacts[i].emergency) {
            x += `
                                                <div class="emricon foricon position-absolute badge p-1">
                                                    <i class="fa-solid fa-heart-pulse text-white"></i>
                                                </div>`}
        x += `
                                            </div>
                                            <div>
                                                <p class="name fw-bold mb-1">${contacts[i].name}</p>
                                                <div class="phone foricon d-inline-block rounded-3">
                                                    <i class="fa-solid fa-phone"></i>
                                                </div>
                                                <span class="number text-secondary">${contacts[i].phone}</span>
                                            </div>
                                        </div>
                                        <div class="information pt-3 pb-3">
                                            <div class="d-flex gap-3 pb-1">
                                                <div class="foricon mess rounded-3">
                                                    <i class="fa-solid fa-message"></i>
                                                </div>
                                                ${contacts[i].email}
                                            </div>
                                            <div class="d-flex gap-3 pb-1">
                                                <div class="foricon loc rounded-3">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                </div>
                                                ${contacts[i].address}
                                            </div>
                                            <div class="category d-flex gap-2">
                                                <div class="group p-1 rounded-3 mt-1">
                                                    ${contacts[i].group}
                                                </div>`
        if (contacts[i].emergency) {
            x += `
                                                <div class="emr p-1 rounded-3 mt-1">
                                                    <i class="fa-solid fa-heart-pulse"></i>
                                                    Emergency
                                                </div>`}
        x += `
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="footer d-flex justify-content-between align-items-center pt-2 pb-2 ps-3 pe-3">
                                        <div class="d-flex gap-2">
                                            <div class="phone rounded-3 p-1">
                                                <i class="fa-solid fa-phone"></i>
                                            </div>
                                            <div class="mess rounded-3 p-1">
                                                <i class="fa-solid fa-message"></i>
                                            </div>
                                        </div>
                                        <div class="edit d-flex gap-2 text-secondary">
                                        `
        if (contacts[i].favorite) {
            x += `
                                            <button onclick="addFavorite(${i})" class="star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-solid fa-star"></i>
                                            </button>`}
        else {
            x += `                          <button onclick="addFavorite(${i})" class="star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-regular fa-star text-secondary"></i>
                                            </button>`
        }
        if (contacts[i].emergency) {
            x += `
                                            <button onclick="addEmergency(${i})" class="emri star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-solid fa-heart-pulse"></i>
                                            </button>`}
        else {
            x += `                          <button onclick="addEmergency(${i})" class="emri star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-regular fa-heart"></i>
                                            </button>`
        }
        x += `
                                            <button onclick="setContact(${i})" class="btn update rounded-3 border fa-border-none p-1 py-0"> <i class="fa-solid fa-pencil "></i></button>
                                            <button onclick="deleteContact(${i})" class="btn delete rounded-3 border fa-border-none p-1 py-0"> <i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        if (contacts[i].favorite) {
            favnum += 1;
            nofav.classList.add("d-none");
            fav += `<div class="contact d-flex justify-content-between align-items-center p-2 rounded-3">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="forimg">
                                            <img src="${contacts[i].img}" class="rounded-3" alt="photo">
                                        </div>
                                        <div>
                                            <p class="name fw-bold">${contacts[i].name}</p>
                                            <span class="number text-secondary">${contacts[i].phone}</span>
                                        </div>
                                    </div>
                                    <div class="phoneicon rounded-4 p-1">
                                        <i class="fa-solid fa-phone"></i>
                                    </div>
                                </div>`
        }
        if (contacts[i].emergency) {
            emrnum += 1;
            noemr.classList.add("d-none");
            emr += `<div class="contact d-flex justify-content-between align-items-center p-2 rounded-3">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="forimg">
                                            <img src="${contacts[i].img}" class="rounded-3" alt="photo">
                                        </div>
                                        <div>
                                            <p class="name fw-bold">${contacts[i].name}</p>
                                            <span class="number text-secondary">${contacts[i].phone}</span>
                                        </div>
                                    </div>
                                    <div class="phoneicon rounded-4 p-1">
                                        <i class="fa-solid fa-phone"></i>
                                    </div>
                                </div> `
        }

    }

    document.querySelector(".contant").innerHTML = x;
    document.querySelector(".favcontact").innerHTML = fav;
    document.querySelector(".emrcontact").innerHTML = emr;
    document.querySelector(".total").innerHTML = contacts.length;
    document.querySelector(".totalfav").innerHTML = favnum;
    document.querySelector(".totalemr").innerHTML = emrnum;
}

function clear() {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
    notesInput.value = "";
    groupInput.value = "";
    favoriteInput.checked = false;
    emergencyInput.checked = false;
    imgInput.value = null;


    document.getElementById("Phone").classList.add("d-none");
    document.getElementById("Name").classList.add("d-none");
    document.getElementById("Add").classList.add("d-none");
    document.getElementById("Email").classList.add("d-none");
    document.getElementById("Group").classList.add("d-none");
    document.getElementById("IMG").classList.add("d-none");

    btnForm.classList.add("d-none");
}

function deleteContact(index) {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel"
    }).then((result) => {

        if (result.isConfirmed) {

            contacts.splice(index, 1);
            localStorage.setItem("Contact", JSON.stringify(contacts));

            Swal.fire({
                title: "Deleted!",
                text: "Contact has been deleted.",
                icon: "success"
            });

            displayContacts();
        }
    });

}

var updateindex;
function setContact(index) {
    console.log("setContact");

    updateindex = index;
    openForm();
    nameInput.value = contacts[index].name;
    phoneInput.value = contacts[index].phone;
    emailInput.value = contacts[index].email;
    addressInput.value = contacts[index].address;
    notesInput.value = contacts[index].notes;
    groupInput.value = contacts[index].group;
    favoriteInput.checked = contacts[index].favorite ? favoriteInput.value : "";
    emergencyInput.checked = contacts[index].emergency ? emergencyInput.value : "";
    profile.src = contacts[index].img;

    savebtn.classList.add("d-none");
    updatebtn.classList.remove("d-none");

}

function updateContact() {

    if (validation(nameInput, "Name") &&
        validation(phoneInput, "Phone") &&
        validation(emailInput, "Email") &&
        validation(addressInput, "Add") &&
        validation(groupInput, "Group")) {
        var contact = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            address: addressInput.value,
            group: groupInput.value,
            notes: notesInput.value,
            favorite: favoriteInput.checked ? favoriteInput.value : "",
            emergency: emergencyInput.checked ? emergencyInput.value : "",
            img: imgInput.files[0]
                ? `img/${imgInput.files[0].name}`
                : contacts[updateindex].img,
        }

        contacts.splice(updateindex, 1, contact);
        localStorage.setItem("Contact", JSON.stringify(contacts));
        displayContacts();
        clear();
        Swal.fire({
            title: 'Success!',
            text: 'Contact Update successfully',
            icon: 'success',
        })
        savebtn.classList.remove("d-none");
        updatebtn.classList.add("d-none");
    }
}

function validation(element, msg) {
    var text = element.value;
    var regex = {
        fullname: /^(?=.{2,50}$)[A-Za-z]+(?:\s+[A-Za-z]+)+$/,
        phonenum: /^(\+2)?01[0125][0-9]{8}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        group: /^(Family|Work|Friend|School|Other)$/i,
        add: /^[A-Za-z0-9\u0600-\u06FF\s,.-]{5,100}$/,
        img: /\.(jpe?g|png|gif|webp|bmp|tiff)$/i,
    }
    var msg = document.getElementById(msg);
    if (regex[element.id].test(text)) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        msg.classList.add("d-none")
        return true;
    }
    else {
        element.classList.add("is-invalid");
        msg.classList.remove("d-none");
        return false;
    }
}

function search() {
    var section = "";
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].name.toLowerCase().includes(insearch.value.toLowerCase()) || contacts[i].phone.toLowerCase().includes(insearch.value.toLowerCase()) || contacts[i].email.toLowerCase().includes(insearch.value.toLowerCase())) {
            section += `<div class="item col-sm-12 col-md-6">
                                <div class="inner rounded-4 bg-white overflow-hidden">
                                    <div class="ps-3 pe-3 pt-3">
                                        <div class="maininformation d-flex gap-3 align-items-center">
                                            <div class="forimg position-relative">
                                                <img src="${contacts[i].img}" class="rounded-3" alt="photo">
                                                `
            if (contacts[i].favorite) {
                section += `
                                                <div class="fav foricon position-absolute badge p-1">
                                                    <i class="fa-solid fa-star text-white"></i>
                                                </div>`}
            if (contacts[i].emergency) {
                section += `
                                                <div class="emricon foricon position-absolute badge p-1">
                                                    <i class="fa-solid fa-heart-pulse text-white"></i>
                                                </div>`}
            section += `
                                            </div>
                                            <div>
                                                <p class="name fw-bold mb-1">${contacts[i].name}</p>
                                                <div class="phone foricon d-inline-block rounded-3">
                                                    <i class="fa-solid fa-phone"></i>
                                                </div>
                                                <span class="number text-secondary">${contacts[i].phone}</span>
                                            </div>
                                        </div>
                                        <div class="information pt-3 pb-3">
                                            <div class="d-flex gap-3 pb-1">
                                                <div class="foricon mess rounded-3">
                                                    <i class="fa-solid fa-message"></i>
                                                </div>
                                                ${contacts[i].email}
                                            </div>
                                            <div class="d-flex gap-3 pb-1">
                                                <div class="foricon loc rounded-3">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                </div>
                                                ${contacts[i].address}
                                            </div>
                                            <div class="category d-flex gap-2">
                                                <div class="group p-1 rounded-3 mt-1">
                                                    ${contacts[i].group}
                                                </div>`
            if (contacts[i].emergency) {
                section += `
                                                <div class="emr p-1 rounded-3 mt-1">
                                                    <i class="fa-solid fa-heart-pulse"></i>
                                                    Emergency
                                                </div>`}
            section += `
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="footer d-flex justify-content-between align-items-center pt-2 pb-2 ps-3 pe-3">
                                        <div class="d-flex gap-2">
                                            <div class="phone rounded-3 p-1">
                                                <i class="fa-solid fa-phone"></i>
                                            </div>
                                            <div class="mess rounded-3 p-1">
                                                <i class="fa-solid fa-message"></i>
                                            </div>
                                        </div>
                                        <div class="edit d-flex gap-2 text-secondary">
                                        `
            if (contacts[i].favorite) {
                section += `
                                            <button onclick="addFavorite(${i})" class="star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-solid fa-star"></i>
                                            </button>`}
            else {
                section += `                          <button onclick="addFavorite(${i})" class="star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-regular fa-star text-secondary"></i>
                                            </button>`
            }
            if (contacts[i].emergency) {
                section += `
                                            <button onclick="addEmergency(${i})" class="emri star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-solid fa-heart-pulse"></i>
                                            </button>`}
            else {
                section += `                          <button onclick="addEmergency(${i})" class="emri star btn update rounded-3 border fa-border-none p-1 py-0">
                                                <i class="fa-regular fa-heart"></i>
                                            </button>`
            }
            section += `
                                            <button onclick="setContact(${i})" class="btn update rounded-3 border fa-border-none p-1 py-0"> <i class="fa-solid fa-pencil "></i></button>
                                            <button onclick="deleteContact(${i})" class="btn delete rounded-3 border fa-border-none p-1 py-0"> <i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

        }
    }
    document.querySelector(".main .contant").innerHTML = section;

}

function addFavorite(index) {
    if (contacts[index].favorite) {
        var contact = {
            name: contacts[index].name,
            phone: contacts[index].phone,
            email: contacts[index].email,
            address: contacts[index].address,
            group: contacts[index].group,
            notes: contacts[index].notes,
            favorite: "",
            emergency: contacts[index].emergency,
            img: contacts[index].img,
        }
    }
    else {
        var contact = {
            name: contacts[index].name,
            phone: contacts[index].phone,
            email: contacts[index].email,
            address: contacts[index].address,
            group: contacts[index].group,
            notes: contacts[index].notes,
            favorite: favoriteInput.value,
            emergency: contacts[index].emergency,
            img: contacts[index].img,
        }
    }
    contacts.splice(index, 1, contact);
    localStorage.setItem("Contact", JSON.stringify(contacts));
    displayContacts();
}

function addEmergency(index) {
    if (contacts[index].emergency) {
        var contact = {
            name: contacts[index].name,
            phone: contacts[index].phone,
            email: contacts[index].email,
            address: contacts[index].address,
            group: contacts[index].group,
            notes: contacts[index].notes,
            favorite: contacts[index].favorite,
            emergency: "",
            img: contacts[index].img,
        }
    }
    else {
        var contact = {
            name: contacts[index].name,
            phone: contacts[index].phone,
            email: contacts[index].email,
            address: contacts[index].address,
            group: contacts[index].group,
            notes: contacts[index].notes,
            favorite: contacts[index].favorite,
            emergency: emergencyInput.value,
            img: contacts[index].img,
        }
    }
    contacts.splice(index, 1, contact);
    localStorage.setItem("Contact", JSON.stringify(contacts));
    displayContacts();
}