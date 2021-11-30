var door_open = false;
var door = document.getElementById("door-closed");
var game_start = false;
const API = "https://trivia.willfry.co.uk/example";



door.addEventListener("mouseup", function(){
if(!door_open){
    door_open = true;
    return;
}
if(door.getAttribute("src") == "images/door-close.png"){
door.className = "door-open";
door.src = "images/door-open.png";
door.style.position = "absolute";
door.style.left = "350px";
door.style.top = "180px"
make_table();
game_start = true;
} else if(!game_start){
    door.className = "door-closed";
    door.src = "images/door-close.png";
    door.style.position = "absolute";
    door.style.left = "600px";
    door.style.top = " 208px";
}
})
<<<<<<< HEAD
function make_table(){
    var tbl = document.createElement("table");
    tbl.style.width = '100px';
  tbl.style.border = '1px solid black';
  for (let i = 0; i < 3; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 5; j++) {
      if (i === 2 && j === 1) {
        break;
      } else {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
        td.style.border = '1px solid black';
        if (i === 1 && j === 1) {
          td.setAttribute('rowSpan', '2');
        }
      }
    }
}
document.body.appendChild(tbl);
tbl.style.position = "absolute";
tbl.style.left = "500px";
tbl.style.top = "180px"
tbl.style.backgroundColor = "white";
}
=======

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
>>>>>>> eadd9f8b7a2365aad86190f82852dbda9ea3ee5a
