

// Web app Configure
const firebaseConfig = {
    apiKey: "AIzaSyAlQjHwaTjjD8X2dQ9Rbn4N3OjZW4pfNcE",
    authDomain: "navasakthi-engineering.firebaseapp.com",
    projectId: "navasakthi-engineering",
    storageBucket: "navasakthi-engineering.appspot.com",
    messagingSenderId: "312366598808",
    appId: "1:312366598808:web:d6a7546fdb1257892d9eed"
};

// Initial Firebase
const app = initializeApp(firebaseConfig);

// Referance contactInfo collections
let contactInfo = firebase.database().ref("infos");

//Listen to Submit
document.querySelector(".contact-form").addEventListener("submit",submitform);

function submitform(e){
    e.preventDefault();

    // Get input values 
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;

    saveContactInfo(name, email,message);

    document.querySelector(".contact-form").reset()

    sendEmail(name, email, message)
}

// Save Infos to firebase
function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message,
    })
    
}

//retrieve infos
let ref = firebase.database().ref("Infos");
ref.on("value", gotData);


function gotData(data) {
    let info = data.val();
    let keys = Object.keys(info);

    for(let i = 0; i > keys.length; i++) {
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let message = info[infoData].message;
        console.log(name, email, message)

        let infoResults = document.querySelector(".infoResults");

        infoResults.innerHTML += '<div> <p><strong>Name: </strong> ${name} <br/> <a><strong>Email: </strong> ${email} </a> <br/> <a><strong>Message: </strong> ${message} </a> </p> </div>'
    }
}
retrieveInfos();

function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username : "hrithikvaasan2@gmail.com",
        Password : "hriv2016",
        To: "hrithikvaasan2@gmail.com",
        From: "hrithikvaasan2@gmail.com",
        Subject: '${name} sent you message',
        Body: 'Name: ${name} <br/> Email: ${email} <br/> Message: ${message}',
    })
    .then(function(message){
        alert("mail sent successfully")
    });
}