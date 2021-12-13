document.getElementById("door").addEventListener("click", function(){
    let node = document.getElementById("door");
    let src1 = "/images/door-close.png";
    let src2 = "/images/door-openv4.png";
        if(node.getAttribute("src") == src1){
            node.src = src2; // set to open
            node.style.setProperty("height","593px");
            node.style.setProperty("left","564px");
            node.style.setProperty("top","193px");
            // play portal sounds
            var audio = new Audio("sfx/8bit-SFX-Library/Environment/ufo.wav");
            audio.play();
        }
        else{
            node.src = src1; // close
            node.style.setProperty("height","512px");
            node.style.setProperty("left","570px");
            node.style.setProperty("top","208px");
        } 
});


const bg = new Audio('sounds/273_Arcane_Clockworks.mp3');
bg.play();
// alternative-- use text icon // String.fromCodePoint() 0x1f508 off, 0x1f509 medium, 0x1f50a high
// con: .textContent.trim()
var vol_isOn = "high";
document.getElementById("sound_button").addEventListener("click", function(){
    if(vol_isOn == "high"){
        document.getElementById("sound_button").src = "icons/speaker-medium-vol.png"; // set medium
        vol_isOn = "medium";
        bg.volume = 0.5;
    }
    else if(vol_isOn == "medium"){
        document.getElementById("sound_button").src = "icons/speaker-low-vol.png"; // set off
        vol_isOn = "off";
        bg.volume = 0.0;
    }
    else{
        document.getElementById("sound_button").src = "icons/speaker-high-vol.png"; // set high
        vol_isOn = "high";
        bg.volume = 1.0;
    }
});

// taken from https://www.sitepoint.com/create-one-time-events-javascript/
 function onetime(node, type, srcToSwap) { // create a one-time event
    node.addEventListener(type, function(e) { // create event
        e.target.src = srcToSwap;
        e.target.removeEventListener(e.type, arguments.callee); // remove event
    });
}
function onetimeClickSwap(node, srcToSwap) {
   node.addEventListener("click", function(e) { // create event
       e.target.src = srcToSwap;
       e.target.removeEventListener("click", arguments.callee); // remove event
   });
}
function clickSwap(node, src1, src2) {
   node.addEventListener("click", function(e){
       if(node.getAttribute("src") == src1){
           node.src = src2; 
       }
       else{
           node.src = src1;
       }
   }
   )}

//    https://www.tutorialspoint.com/javascript/javascript_dialog_boxes.htm
// confirmation box:
function getConfirmation(alertbox, confirmQ, confirmed, denied) {
    var retVal = confirm(confirmQ);
    if( retVal == true ) {
        var text = document.getElementById(alertbox);
        text.innerHTML = confirmed;
       return true;
    } else {
        var text = document.getElementById(alertbox);
        text.innerHTML = denied;
       return false;
    }
 }

 /**
  * Functions that allow a user to click and move an image around the screen
  * Code snippets taken from:
  * Endless's post --> https://stackoverflow.com/questions/33948464/move-an-image-with-javascript-using-mouse-events
  */
 // click and hold to drag dragable elements function
        var moving = false;
        const draggableElements = document.querySelectorAll(".draggable");
        for (const element of draggableElements) { // apply eventListener to all elements returned by the querySelector above
        element.addEventListener("mousedown", initialClick, false);
        }

        function move(e){
        var newX = e.clientX - 10;
        var newY = e.clientY - 10;
        // TODO: If element ends up out of bounds, return to a default position??
        image.style.left = newX + "px";
        image.style.top = newY + "px";
        }

        function initialClick(e) {
        if(moving){
            document.removeEventListener("mousemove", move);
            moving = !moving;
            return;
        }
        moving = !moving;
        image = this;
        document.addEventListener("mousemove", move, false);
        }
        // TODO: LIMIT RANGE OF DRAGGABLE ITEMS TO SPECIFIC AREAS AND CHANGE THEIR Z-INDEX