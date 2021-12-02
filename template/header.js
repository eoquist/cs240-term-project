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

 // click and hold to drag dragable elements function
var moving = false;

dog.addEventListener("mousedown", initialClick, false);
cat.addEventListener("mousedown", initialClick, false);


function move(e){
  var newX = e.clientX - 10;
  var newY = e.clientY - 10;

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