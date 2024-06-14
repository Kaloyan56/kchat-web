//const { post } = require("jquery");

window.onload = function () {
    var refButton = document.getElementById('bttn');
    refButton.onclick = function checker(event) {
        
        var namec = document.getElementById('usernameT').value;
        if (namec === "") {
            alert("Name cannot be empty.");
            event.preventDefault();
        }
        else if (namec.length > 12) {
            alert("Name cannot be longer than 12 characters.");
            event.preventDefault();
        }
        else {
            window.location.replace("chats");
        }
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("myForm");
        form.addEventListener("submit", validateForm);
    });

}