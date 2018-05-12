var squaresModule = (function() {
    
    var currentButtonLeft = 0;
    var currentButtonTop = 0;
    
    var tdTemplate = function() {
        var td = document.createElement("td");
        td.classList.add("squaresTd");
        return td;
    }
    
    var trTemplate = function() { 
        var tr = document.createElement("tr");
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
        return document.getElementsByClassName("squaresTbody")[0];
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
    
    var overTable = function(elem) {
        var rows = elem.children[0].children;
        var cells = rows[0].children;
        var x = event.clientX;
        var y = event.clientY;
        var row = rows.length - 1;
        var cell = cells.length - 1;
        for(var i = 0; i < rows.length; i++) {
            if(y < rows[i].getBoundingClientRect().top) {
                row = i == 0 ? 0 : i - 1;
                break;
            }
        }
        for(var i = 0; i < cells.length; i++) {
            if(x < cells[i].getBoundingClientRect().left) {
                cell = i == 0 ? 0 : i - 1;
                break;
            }
        }
        if(numberOfColumns() != 1) { 
            currentButtonTop = cell;
            addButton(topButton());
            topButton().style.marginLeft = getOffsetLeft((getSquares().children[0].children[currentButtonTop])) + "px";
        }
        if(numberOfRows() != 1) { 
            currentButtonLeft = row;
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
            tp.classList.add("buttonSign");
            var topButton = document.createElement("div");
            topButton.classList.add("button");
            topButton.classList.add("squareDiv");
            topButton.appendChild(tp);
            topButton.onclick = removeColumn;
            var topButtonCover = document.createElement("div");
            topButtonCover.classList.add("squareDiv");
            topButtonCover.classList.add("topButton");
            topButtonCover.appendChild(topButton);    
            
            var lp = document.createElement("p");
            lp.innerHTML = "-";
            lp.classList.add("buttonSign");
            var leftButton = document.createElement("div");
            leftButton.classList.add("button");
            leftButton.classList.add("squareDiv");
            leftButton.appendChild(lp);
            leftButton.onclick = removeRow;
            var leftButtonCover = document.createElement("div");
            leftButtonCover.classList.add("squareDiv");
            leftButtonCover.classList.add("leftButton");
            leftButtonCover.appendChild(leftButton);
            
            var tr = trTemplate();
            tr.appendChild(tdTemplate());
            var squaresTable = document.createElement("tbody");
            squaresTable.classList.add("squaresTbody"); 
            squaresTable.appendChild(tr);
            var table = document.createElement("table");
            table.appendChild(squaresTable);
            table.classList.add("squaresTable");
            table.onmousemove = function(){ overTable(this);};
            
            var rp = document.createElement("p");
            rp.innerHTML = "+";
            rp.classList.add("buttonSign");
            var rightButton = document.createElement("div");
            rightButton.classList.add("squareDiv");
            rightButton.classList.add("button");
            rightButton.appendChild(rp);
            rightButton.onclick = addColumn;
            var rightButtonCover = document.createElement("div");
            rightButtonCover.classList.add("squareDiv");
            rightButtonCover.classList.add("rightButton");
            rightButtonCover.appendChild(rightButton);     
            
            var centerPart = document.createElement("div");
            centerPart.classList.add("squareDiv");
            centerPart.classList.add("centerPart");
            centerPart.appendChild(leftButtonCover);
            centerPart.appendChild(table);    
            centerPart.appendChild(rightButtonCover);
            
            var bp = document.createElement("p");
            bp.innerHTML = "+";
            bp.classList.add("buttonSign");
            var bottomButton = document.createElement("div");
            bottomButton.classList.add("squareDiv");
            bottomButton.classList.add("button");
            bottomButton.appendChild(bp);
            bottomButton.onclick = addRow;
            var bottomButtonCover = document.createElement("div");
            bottomButtonCover.classList.add("squareDiv");
            bottomButtonCover.classList.add("bottomButton");
            bottomButtonCover.appendChild(bottomButton);  
            
            var squares = document.createElement("div");
            squares.classList.add("squareDiv");
            squares.setAttribute("id", "squares");
            squares.onmouseleave = outTable;
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