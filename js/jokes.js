$(document).ready( function () {
    jokeUpdate();
    progressBar();

    window.setInterval(jokeUpdate, 10000);
    window.setInterval(progressBar, 10000);
});

function jokeUpdate() {
    $.getJSON('http://api.icndb.com/jokes/random', function(data) {
        if(data["type"] == "success")
            $('#joke').replaceWith("<h1 id=\"joke\" class=\"text-right box_textshadow\">" + data["value"]["joke"] + "</h1>");
        else
            $('#joke').replaceWith("<h1 id=\"joke\">" + "Even Chuck Norris can't retrieve jokes from an API that doesn't work right..." + "</h1>");

        var fileNumber = Math.floor(Math.random() * 5);
        $('.full-width-image').css("background", "url(\"../images/chucknorris/" + fileNumber + ".jpg\") no-repeat center center fixed");
    });
}

function progressBar() {
    var progress = $('.progress');
    var progressBar = $('.progress-bar');

    progressBar.stop();
    progressBar.animate({width: "0%"}, 1000);
    progressBar.animate({width: "100%"}, 10000);
}