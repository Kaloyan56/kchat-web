"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var thisid = "";
//Disable the send button until connection is established.
document.getElementById('sendmsg').disabled = true;
connection.on("ReceiveMessage", function (message, user, id, length) {
    var li = document.createElement("li");
    if (id === thisid) {
        li.className = "li-msg-r";
        li.textContent = `${message}`;
        document.getElementById("chat").appendChild(li);
    }
    else {
        var lastChildID = document.getElementById("chat").lastChild.id;
        if (lastChildID === id) {
            li.className = "li-msg";
            li.id = id;
            li.textContent = `${message}`;
            document.getElementById("chat").appendChild(li);
        }
        else {
            li.className = "li-msg";
            li.id = id;
            var lin = document.createElement("li");
            lin.className = "li-nam";
            lin.textContent = `${user}`;
            li.textContent = `${message}`;
            document.getElementById("chat").appendChild(lin);
            document.getElementById("chat").appendChild(li);
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
    }
    
);


connection.on("ClientConn", function (usern, id) {
    if (thisid === "") {
        thisid = id;
    }
    

    
    var li = document.createElement("li");
    li.className = "li-msg-c";
    li.textContent = `${usern} has connected.`;
    document.getElementById("chat").appendChild(li);
    

}
);

connection.on("ClientDisc", function (id) {
    var li = document.createElement("li");
    li.className = "li-msg-c";
    li.textContent = `${id} has disconnected.`;
    document.getElementById("chat").appendChild(li);
    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
}
);

connection.start().then(function () {
    document.getElementById('sendmsg').disabled = false;
    
}).catch(function (err) {
    return console.error(err.toString());
});
document.getElementById('sendmsg').addEventListener("click", function (event) {
    var message = document.getElementById('msgtxt').value;
    connection.invoke("SendMessage", message, thisid).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("msgtxt").value = '';
    event.preventDefault();
});

var input = document.getElementById("msgtxt");

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("sendmsg").click();
    }
   
});