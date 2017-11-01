var username;

/*
* Shows the username prompt modal after page load
*/
$(window).on('load',function(){
    $('#initialModal').modal({backdrop: 'static', keyboard: false});    
    $('#initialModal').modal('show');
});

/*
* Sets username
*/
function setUsername() {
    if($("#username").val() != "") {
        username = $("#username").val();
        $('#initialModal').modal('hide');
    }
}

/*
* Listens to database changes, waiting for chat updates
*/
firebase.database().ref('messages/').on('child_added', function(snapshot) {
    console.log("RECEIVED MESSAGE: " + snapshot.val().text);
    receiveMessage(snapshot.val().author, snapshot.val().text);
})

/*
* Adds timestamp to message
*/
function sendMessage(message) {
    var timeStamp = Math.floor(Date.now());
    logMessage(message, timeStamp);
}

/*
* Sends message to database
*/
function logMessage(message, timestamp) {
    firebase.database().ref('messages/' + timestamp).set({
        author: username,
        text: message
    });
}

/*
* Updates displayed messages to include any new messages on the database
*/
function receiveMessage(author, message) {
    //add received message to list of displayed messages
    $("#chat").append("<div class=\"alert alert-success\" role=\"alert\"><b style=\"float: left\">" + author + ":</b><p>&nbsp" + message + "</p></div>");

    //scroll chat text area to bottom, to keep up with the conversation
    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
}

/*
* Awaits the 'Enter' key in the user text input field
*/
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

/*
* Prepares text area content to be sent and clears it
*/
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