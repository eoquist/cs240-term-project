var door_open = false;
var door = document.getElementById("door-closed");
/**
 * having a problem here, i want to be able to just toggle between CSS
 * class names on click event but for some reason it doesnt seem to be registering the
 * positioning in each class when i just change the class name, so right now its done manually
 * but is ugly
 */
door.addEventListener("mouseup", function(){
if(!door_open){
    door_open = true;
    return;
}
if(door.getAttribute("src") == "images/door-close.png"){
door.className = "dooropen";
door.src = "images/door-openv4.png";
door.style.position = "absolute";
door.style.left = "570px";
door.style.top = "193px"
door.style.width= "445px";
door.style.heigth= "445px";
} else {
    door.className = "door-closed";
    door.src = "images/door-close.png";
    door.style.position = "absolute";
    door.style.left = "570px";
    door.style.top = " 208px";
    door.style.width= "325px";
    door.style.heigth= "325px";
}
})

// Paper that rips one time if you click on it
onetime(document.getElementById("paper1"), "click", "icons/paper1-ripped.png");
onetime(document.getElementById("paper2"), "click", "icons/paper2-ripped.png");

// taken from https://www.sitepoint.com/create-one-time-events-javascript/
function onetime(node, type, imgToSwap) { // create a one-time event
	node.addEventListener(type, function(e) { // create event
        e.target.src = imgToSwap;
		e.target.removeEventListener(e.type, arguments.callee); // remove event
	});
}
