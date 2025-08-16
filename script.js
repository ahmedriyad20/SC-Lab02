
                    // Task 1
var myScore = 0;
var draggedItem = null;
var startX = 0;
var startY = 0;

window.onload = function() {
    if (sessionStorage.getItem("gameScore")) {
        myScore = parseInt(sessionStorage.getItem("gameScore"));
        document.getElementById("score").innerHTML = "Score: " + myScore;
    }
};

function dragStart(event) {
    draggedItem = event.target;
    startX = event.target.offsetLeft;
    startY = event.target.offsetTop;
}

function dragOver(event) {
    event.preventDefault();
    var box = document.getElementById("box1");
    var itemText = draggedItem.innerHTML;
    
    if (itemText === "A" || itemText === "a") {
        box.style.backgroundColor = "yellow";
    } else {
        box.style.backgroundColor = "red";
    }
}

function dragLeave(event) {
    var box = document.getElementById("box1");
    box.style.backgroundColor = "lightblue";
}

function drop(event) {
    event.preventDefault();
    var box = document.getElementById("box1");
    var itemText = draggedItem.innerHTML;
    
    if (itemText === "A" || itemText === "a") {
        box.style.backgroundColor = "lightgreen";
        box.classList.add("correct");
        
        myScore = myScore + 10;
        document.getElementById("score").innerHTML = "Score: " + myScore;
        
        sessionStorage.setItem("gameScore", myScore);
        
    } else {
        box.style.backgroundColor = "lightblue";
        draggedItem.style.position = "static";
    }
}


                            // Task 2       


function changeColor(part, newColor) {
    part.style.fill = newColor;
}

function showTooltip(event, partName) {
    var tooltip = document.getElementById("tooltip1");
    tooltip.innerHTML = partName;
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY + 10 + "px";
}

document.getElementById("face1").onmouseleave = function() {
    document.getElementById("tooltip1").style.display = "none";
};


                    // Task 4

var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var isDrawing = false;
var isErasing = false;
var lastX = 0;
var lastY = 0;

// Disable right click menu on canvas
canvas.oncontextmenu = function(e) {
    e.preventDefault();
    return false;
};

// Get mouse position relative to canvas
function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Mouse down event
canvas.onmousedown = function(e) {
    var pos = getMousePos(e);
    lastX = pos.x;
    lastY = pos.y;
    
    if (e.button === 0) { 
        isDrawing = true;
        isErasing = false;
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
    } else if (e.button === 2) { 
        isErasing = true;
        isDrawing = false;
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 20;
    }
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
};

// Mouse move event
canvas.onmousemove = function(e) {
    if (!isDrawing && !isErasing) return;
    
    var pos = getMousePos(e);
    
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    
    lastX = pos.x;
    lastY = pos.y;
};

// Mouse up event
canvas.onmouseup = function() {
    isDrawing = false;
    isErasing = false;
    ctx.beginPath();
};

// Mouse leave event
canvas.onmouseleave = function() {
    isDrawing = false;
    isErasing = false;
    ctx.beginPath();
};

ctx.lineCap = "round";
ctx.lineJoin = "round";


                        // Task 5


function getMyLocation() {
    var status = document.getElementById("status1");
    
    if (!navigator.geolocation) {
        status.innerHTML = "Your browser does not support location";
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            
            status.innerHTML = "Location found! Opening Google Maps...";
            
            var mapUrl = "https://www.google.com/maps?q=" + lat + "," + lng + "&z=15";
            
            window.open(mapUrl, "_blank");
            
            status.innerHTML = "Your location: " + lat.toFixed(6) + ", " + lng.toFixed(6);
        },
        function(error) {
            var message = "";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = "Location access denied by user";
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = "Location information not available";
                    break;
                case error.TIMEOUT:
                    message = "Location request timed out";
                    break;
                default:
                    message = "Unknown error getting location";
                    break;
            }
            status.innerHTML = message;
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}