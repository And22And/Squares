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

function createSquares(parent){
    var tp = document.createElement("p");
    tp.innerHTML = "-";
    var topButton = document.createElement("div");
    topButton.classList.add("button");
    topButton.appendChild(tp);
    topButton.onclick = removeColumn;
    var topButtonCover = document.createElement("div");
    topButtonCover.classList.add("topButton");
    topButtonCover.appendChild(topButton);    
    
    var lp = document.createElement("p");
    lp.innerHTML = "-";
    var leftButton = document.createElement("div");
    leftButton.classList.add("button");
    leftButton.appendChild(lp);
    leftButton.onclick = removeRow;
    var leftButtonCover = document.createElement("div");
    leftButtonCover.classList.add("leftButton");
    leftButtonCover.appendChild(leftButton);
    
    var tr = trTemplate();
    tr.appendChild(tdTemplate());
    var squaresTable = document.createElement("tbody");
    squaresTable.classList.add("squaresTable"); 
    squaresTable.appendChild(tr);
    var table = document.createElement("table");
    table.appendChild(squaresTable);
    
    
    var rp = document.createElement("p");
    rp.innerHTML = "+";
    var rightButton = document.createElement("div");
    rightButton.classList.add("button");
    rightButton.appendChild(rp);
    rightButton.onclick = addColumn;
    var rightButtonCover = document.createElement("div");
    rightButtonCover.classList.add("rightButton");
    rightButtonCover.appendChild(rightButton);     
    
    var centerPart = document.createElement("div");
    centerPart.classList.add("centerPart");
    centerPart.appendChild(leftButtonCover);
    centerPart.appendChild(table);    
    centerPart.appendChild(rightButtonCover);
    
    var bp = document.createElement("p");
    bp.innerHTML = "+";
    var bottomButton = document.createElement("div");
    bottomButton.classList.add("button");
    bottomButton.appendChild(bp);
    bottomButton.onclick = addRow;
    var bottomButtonCover = document.createElement("div");
    bottomButtonCover.classList.add("bottomButton");
    bottomButtonCover.appendChild(bottomButton);  
    
    var squares = document.createElement("div");
    squares.setAttribute("id", "squares");
    squares.appendChild(topButtonCover);
    squares.appendChild(centerPart);
    squares.appendChild(bottomButtonCover);
    
    parent.appendChild(squares);
    
    addRow();
    addColumn();
    addRow();
    addColumn();
    addRow();
    addColumn();
    startPlacing();
    outTable();
}

window.onload = function() {
    createSquares(document.body);
};