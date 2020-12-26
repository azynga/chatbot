$(document).ready(()=>{

    let username = "Anonymous";

    $("#chatWindow").draggable();

    // Enter username
    $("#username button").on("click",(event)=>{
        event.preventDefault();
        username = $("#username input").val();
        $(".username").remove();
    })

    // Enter message on enter key
    $("#userInput textarea").on("keydown",(event)=>{
        console.log(event)
        if(event.key == "Enter" && !event.shiftKey){
            enterMessage(event,username)
        }
    })

    // Enter message on click
    $("#send").on("click",(event)=>{
        enterMessage(event,username);
    })

    /*
    let lightOn = true;

    $("#lightSwitch").on("click",()=>{
        lightSwitch();
    })
    */
})

function enterMessage(event, username){
    event.preventDefault();
    const input = $("#userInput textarea").val();

    // Prevent empty input
    if(!input){
        return;
    }
    // Post user message
    $("<p>")
        .html(timeStamp()+" | <strong>"+username+":</strong> "+input)
        .addClass("userMessage")
        .appendTo("#messages")
        .addClass("animate__fadeInRightBig");
    
    $('#messages')
        .scrollTop($('#messages')[0].scrollHeight);

    
    // Post bot message after delay
    setTimeout(()=>{
        $("<p>")
            .text("...")
            .addClass("botMessage")
            .appendTo("#messages")
            .addClass("animate__fadeInLeftBig");
        $('#messages')
            .scrollTop($('#messages')[0].scrollHeight);
        setTimeout(()=>{
            $("p:last-of-type")
                .html(timeStamp()+" | <strong>Chatbot:</strong> "+answer(input))
            $('#messages')
                .scrollTop($('#messages')[0].scrollHeight);
        }, 1500);
    },1000);

    $(".chat")[0].reset();
}

function timeStamp(){
    const now = new Date();
    const hours = now.getHours()<10 ? "0"+now.getHours() : now.getHours();
    const minutes = now.getMinutes()<10 ? "0"+now.getMinutes() : now.getMinutes();
    const time = [hours,minutes];
    return time.join(":");
}

function lightSwitch(){
    if(lightOn){
        $("#style").attr("href","'style_dark.css'");
    }
    else{
        $("#style").attr("href","'style_light.css'");
    }
}

function answer(input){
    return "Selber "+input+"!";
}