// essential is clickSwap but with added BS because otherwise it looks awful
document.getElementById("door").addEventListener("click", function(){
    let node = document.getElementById("door");
    let src1 = "images/door-close.png";
    let src2 = "images/door-openv4.png";
        if(node.getAttribute("src") == src1){
            node.src = src2; // set to open
            node.style.setProperty("height","590px");
            node.style.setProperty("left","563.5px");
            node.style.setProperty("top","193px");
        }
        else{
            node.src = src1; // close
            node.style.setProperty("height","512px");
            node.style.setProperty("left","570px");
            node.style.setProperty("top","208px");
        }
});
// SEPARATOR BETWEEN MAIN CODE AND FUNCTIONS ：）

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
