var squaresModule = (function() {
    
    var currentButtonLeft = 0;
    var currentButtonTop = 0;
    
    var tdTemplate = function() {
        var td = document.createElement("td");
        td.onmouseover = function(){overCell(this)};
        return td;
    }
    
    var trTemplate = function() { 
        var tr = document.createElement("tr");
        tr.onmouseover = function(){overRow(this)};
        return tr;
    }
    
    var numberOfRows = function(){
        return getSquares().children.length;
    }
    
    var numberOfColumns = function(){
        return getSquares().children[0].children.length;
    }
    
    var leftButton = function(){
        return document.getElementsByClassName("leftButton")[0].children[0];
    }
    
    var rightButton = function(){
        return document.getElementsByClassName("rightButton")[0].children[0];
    }
    
    var topButton = function(){
        return document.getElementsByClassName("topButton")[0].children[0];
    }
    
    var bottomButton = function(){
        return document.getElementsByClassName("bottomButton")[0].children[0];
    }
    
    var getSquares = function(){
        return document.getElementsByClassName("squaresTable")[0];
    }
    
    var addRow = function(){
        var i;
        var row = trTemplate();
        for(i = 0; i < numberOfColumns(); i++) {
            row.appendChild(tdTemplate());
        }
        getSquares().appendChild(row);
    }
    
    var removeRow = function(){
        getSquares().children[currentButtonLeft].remove();
        if(currentButtonLeft == numberOfRows()) {
            currentButtonLeft--;
        }
        leftButton().style.marginTop = getOffsetTop((getSquares().children[currentButtonLeft])) + "px";
        if(numberOfRows() == 1){
            removeButton(leftButton());
        }
    }
    
    var addColumn = function(){
        var rows = Array.from(getSquares().children);
        rows.forEach(function(row) {
            row.appendChild(tdTemplate());
        });   
    }
    
    var removeColumn = function(){
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
    
    var findPosition = function(elem){
        return Array.from(elem.parentElement.children).indexOf(elem);
    }
    
    var addButton = function(elem){
        elem.style.visibility = "visible";
    }
    
    var removeButton = function(elem){
        elem.style.visibility = "hidden";
    }
    
    var overCell = function(obj){
        if(numberOfColumns() != 1) { 
            currentButtonTop = findPosition(obj);
            addButton(topButton());
            topButton().style.marginLeft = getOffsetLeft((getSquares().children[currentButtonLeft].children[currentButtonTop])) + "px";
        }
    }
    
    var overRow = function(obj){
        if(numberOfRows() != 1) { 
            currentButtonLeft = findPosition(obj);
            addButton(leftButton());
            leftButton().style.marginTop = getOffsetTop((getSquares().children[currentButtonLeft])) + "px";
        }
    }
    
    var getOffsetLeft = function(elem){
        return elem.getBoundingClientRect().left - document.getElementById("squares").getBoundingClientRect().left;
    }
    
    var getOffsetTop = function(elem){
        return elem.offsetTop;
    }
    
    var outTable = function(){
        removeButton(topButton());
        removeButton(leftButton());
    }
    
    var startPlacing = function(){
        rightButton().style.marginTop = getOffsetTop((getSquares().children[0])) + "px";
        bottomButton().style.marginLeft = getOffsetLeft((getSquares().children[0].children[0])) + "px";
    }
    
    return {
        createSquares : function(parent){
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
    }
}());

window.onload = function() {
    squaresModule.createSquares(document.body);
};