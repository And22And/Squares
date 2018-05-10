var currentButtonLeft = 0;
var currentButtonTop = 0;

function tdTemplate() {
    var td = document.createElement("td");
    td.onmouseover = function(){overCell(this)};
    return td;
}

function trTemplate() { 
    var tr = document.createElement("tr");
    tr.onmouseover = function(){overRow(this)};
    return tr;
}

function numberOfRows(){
    return getSquares().children.length;
}

function numberOfColumns(){
    return getSquares().children[0].children.length;
}

function leftButton(){
    return document.getElementsByClassName("leftButton")[0].children[0];
}

function rightButton(){
    return document.getElementsByClassName("rightButton")[0].children[0];
}

function topButton(){
    return document.getElementsByClassName("topButton")[0].children[0];
}

function bottomButton(){
    return document.getElementsByClassName("bottomButton")[0].children[0];
}

function getSquares(){
    return document.getElementsByClassName("squaresTable")[0];
}

function addRow(){
    var i;
    var row = trTemplate();
    for(i = 0; i < numberOfColumns(); i++) {
        row.appendChild(tdTemplate());
    }
    getSquares().appendChild(row);
}

function removeRow(){
    getSquares().children[currentButtonLeft].remove();
    if(currentButtonLeft == numberOfRows()) {
        currentButtonLeft--;
    }
    leftButton().style.marginTop = getOffsetTop((getSquares().children[currentButtonLeft])) + "px";
    if(numberOfRows() == 1){
        removeButton(leftButton());
    }
}

function addColumn(){
    var rows = Array.from(getSquares().children);
    rows.forEach(function(row) {
        row.appendChild(tdTemplate());
    });   
}

function removeColumn(){
    var rows = Array.from(getSquares().children);
    rows.forEach(function(row) {
        row.children[currentButtonTop].remove();
    });
    if(currentButtonTop == numberOfColumns()) {
        currentButtonTop--;
    }
    topButton().style.marginLeft = getOffsetLeft((getSquares().children[currentButtonLeft].children[currentButtonTop])) + "px";
    if(numberOfColumns() == 1){
        removeButton(topButton());
    }
}

function findPosition(elem){
    return Array.from(elem.parentElement.children).indexOf(elem);
}

function addButton(elem){
    elem.style.visibility = "visible";
}

function removeButton(elem){
    elem.style.visibility = "hidden";
}

function overCell(obj){
    if(numberOfColumns() != 1) { 
        currentButtonTop = findPosition(obj);
        addButton(topButton());
        topButton().style.marginLeft = getOffsetLeft((getSquares().children[currentButtonLeft].children[currentButtonTop])) + "px";
    }
}

function overRow(obj){
    if(numberOfRows() != 1) { 
        currentButtonLeft = findPosition(obj);
        addButton(leftButton());
        leftButton().style.marginTop = getOffsetTop((getSquares().children[currentButtonLeft])) + "px";
    }
}

function getOffsetLeft(elem){
    return elem.getBoundingClientRect().left - document.getElementById("squares").getBoundingClientRect().left;
}

function getOffsetTop(elem){
    return elem.offsetTop;
}

function outTable(){
    removeButton(topButton());
    removeButton(leftButton());
}

function startPlacing(){
    rightButton().style.marginTop = getOffsetTop((getSquares().children[0])) + "px";
    bottomButton().style.marginLeft = getOffsetLeft((getSquares().children[0].children[0])) + "px";
}

window.onload = function() {
    addRow();
    addColumn();
    addRow();
    addColumn();
    addRow();
    addColumn();
    startPlacing();
    outTable();
};