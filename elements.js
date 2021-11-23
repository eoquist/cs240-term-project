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
door.src = "images/door-open.png";
door.style.position = "absolute";
door.style.left = "350px";
door.style.top = "180px"
} else {
    door.className = "door-closed";
    door.src = "images/door-close.png";
    door.style.position = "absolute";
    door.style.left = "600px";
    door.style.top = " 208px";

}
})
