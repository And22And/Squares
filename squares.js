var numberOfRows = 1;
var numberOfColumns = 1;
var currentButtonLeft = 0;
var currentButtonTop = 0;
var tdTemplate = "<td onmouseover='overCell(this)'></td>";
var trTemplate = "<tr onmouseover='overRow(this)'>";
var tdRemoveTemplate = "<td onmouseover='buttonOver(this);' onmouseout='buttonOut(this)'></td>";
var leftButton;
var rightButton;
var topButton;
var bottomButton;

function addRow(){
    var i;
    var row = trTemplate;
    for(i = 0; i < numberOfColumns; i++) {
        row += tdTemplate;
    }
    row += "</tr>"
    document.getElementById("squaresTable").insertAdjacentHTML("beforeend", row);
    rightButton.insertAdjacentHTML("beforeend", "<tr><td></td></tr>");
    leftButton.insertAdjacentHTML("beforeend", "<tr>" + tdRemoveTemplate + "</tr>");
    numberOfRows++;
}

function removeRow(){
    rightButton.lastChild.remove();
    if(numberOfRows == 2) {
        leftButton.children[currentButtonLeft].remove();
    } else {
        leftButton.children[currentButtonLeft == leftButton.children.length - 1 ? currentButtonLeft - 1 : currentButtonLeft + 1].remove();
    }
    document.getElementById("squaresTable").children[currentButtonLeft].remove();
    if(currentButtonLeft == leftButton.children.length) {
        currentButtonLeft--;
    }
    numberOfRows--;
}

function addColumn(){
    var rows = Array.from(document.getElementById("squaresTable").children);
    rows.forEach(function(row) {
        row.insertAdjacentHTML("beforeend", tdTemplate);
    }); 
    bottomButton.children[0].insertAdjacentHTML("beforeend", "<td></td>");
    topButton.children[0].insertAdjacentHTML("beforeend", tdRemoveTemplate);
    numberOfColumns++;    
}

function removeColumn(){
    bottomButton.firstChild.lastChild.remove();
    if(numberOfColumns == 2) {
        topButton.firstChild.children[currentButtonTop].remove();
    } else {
        topButton.firstChild.children[currentButtonTop == topButton.firstChild.children.length - 1 ? currentButtonTop - 1 : currentButtonTop + 1].remove()
    }
    var rows = Array.from(document.getElementById("squaresTable").children);
    rows.forEach(function(row) {
        row.children[currentButtonTop].remove();
    });
    if(currentButtonTop == topButton.firstChild.children.length) {
        currentButtonTop--;
    }
    numberOfColumns--;
}

function findPosition(elem){
    return Array.from(elem.parentElement.children).indexOf(elem);
}

function addButton(elem){
    elem.innerHTML = '-';
    elem.classList.add('button');
}

function removeButton(elem){
    elem.innerHTML = '';
    elem.onclick = null;
    elem.classList.remove('button');
    elem.classList.remove("animatedRemoveOut");
    elem.classList.remove("animatedRemoveOn");
}

function outCell(){  
    if(currentButtonTop < numberOfColumns) {
        removeButton(topButton.firstChild.children[currentButtonTop]);
        topButton.firstChild.children[currentButtonTop].classList.remove("animatedRemoveOn");
    }
}

function overCell(obj){
    if(numberOfColumns != 1) { 
        outCell();
        currentButtonTop = findPosition(obj);
        var elem = topButton.firstChild.children[currentButtonTop];
        addButton(elem);
        elem.onclick = removeColumn;
    }    
}

function outRow(){
    if(currentButtonLeft < numberOfRows) {
        removeButton(leftButton.children[currentButtonLeft].firstChild);
    }    
}

function overRow(obj){
    if(numberOfRows != 1) { 
        outRow();
        currentButtonLeft = findPosition(obj);
        var elem = leftButton.getElementsByTagName('td')[currentButtonLeft];
        addButton(elem);
        elem.onclick = removeRow;
    }   
}

function buttonOver(obj) {
    if((rightButton.contains(obj) || bottomButton.contains(obj)) && obj.classList.contains("button")) {
        obj.classList.add("animatedAddOn");    
        obj.classList.remove("animatedAddOut");
    }
    if((topButton.contains(obj) || leftButton.contains(obj)) && obj.classList.contains("button")) {
        obj.classList.add("animatedRemoveOn");
        obj.classList.remove("animatedRemoveOut");
    }    
}

function buttonOut(obj){
    if((rightButton.contains(obj) || bottomButton.contains(obj)) && obj.classList.contains("button")) {
        obj.classList.remove("animatedAddOn");   
        obj.classList.add("animatedAddOut"); 
    }
    if((topButton.contains(obj) || leftButton.contains(obj)) && obj.classList.contains("button")) {
        obj.classList.remove("animatedRemoveOn");
        obj.classList.add("animatedRemoveOut");
    }  
}

function outTable(){
    outCell();
    outRow();
}

window.onload = function() {
    rightButton = document.getElementById("rightButton");
    leftButton = document.getElementById("leftButton");
    topButton = document.getElementById("topButton");
    bottomButton = document.getElementById("bottomButton");
    addRow();
    addColumn();
    addRow();
    addColumn();
    addRow();
    addColumn();
};