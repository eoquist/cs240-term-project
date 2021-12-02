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

function allowDrop(ev){
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
async function drop(ev) {
    ev.preventDefault();
    document.querySelector("#lock").src = "images/open-lock.png";
    await removeImg(document.querySelector("#lock"),700);
    await removeImg(document.querySelector("#key"),0);
    let node = document.getElementById("door");
    let src2 = "images/door-openv4.png";
    node.src = src2; // set to open
    node.style.setProperty("height","592px");
    node.style.setProperty("left","563.5px");
    node.style.setProperty("top","192.5px");
}

function removeImg(ele, delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            ele.parentNode.removeChild(ele);
            resolve(); // promise is resolved
        }, delay);
    });
}