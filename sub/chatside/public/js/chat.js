var username;

$(window).on('load',function(){
    $('#initialModal').modal({backdrop: 'static', keyboard: false});    
    $('#initialModal').modal('show');
});

function setUsername() {
    if($("#username").val() != "") {
        username = $("#username").val();
        $('#initialModal').modal('hide');
    }
}

//listen for database changes
firebase.database().ref('messages/').on('child_added', function(snapshot) {
    console.log("RECEIVED MESSAGE: " + snapshot.val().text);
    receiveMessage(snapshot.val().author, snapshot.val().text);
})

function sendMessage(message) {
    var timeStamp = Math.floor(Date.now());
    logMessage(message, timeStamp);
}

function logMessage(message, timestamp) {
    firebase.database().ref('messages/' + timestamp).set({
        author: username,
        text: message
    });
}

function receiveMessage(author, message) {
    //add received message to list of displayed messages
    $("#chat").append("<div class=\"alert alert-success\" role=\"alert\"><b style=\"float: left\">" + author + ":</b><p>&nbsp" + message + "</p></div>");

    //scroll chat text area to bottom, to keep up with the conversation
    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
}

function onInputChange() {
    var key = window.event.keyCode;

    // If the user has pressed enter
    if (key === 13) {
        onClickSend();
    }
    else {
        return true;
    }
}

function onClickSend() {
    message = document.getElementById("inputmessage").value;
    if(message != "")
        sendMessage(message);
    else
        return;
    document.getElementById("inputmessage").value = "";
    //prevent unnecessary new lines
    if(event.preventDefault)
        event.preventDefault();
}