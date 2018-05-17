var squaresModule = (function() {
    
    var currentButtonLeft = 0;
    var currentButtonTop = 0;
    
    var createTemplate = function() {
        var temp = document.createElement("div");
        temp.id = 'squares';
        temp.innerHTML = "<div class='topButton'><div class='squareDiv button'><p class='buttonSign'>-</p></div></div>\
            <div class='centerPart'>\
                <div class='leftButton squareDiv'><div class='squareDiv button'><p class='buttonSign'>-</p></div></div>\
                <table class='squaresTable'>\
                    <tbody class='squaresTbody'>\
                        <tr>\
                            <td class='squaresTd'></td>\
                        </tr>\
                    </tbody>\
                </table>\
                <div class='rightButton squareDiv'><div class='squareDiv button'><p class='buttonSign'>+</p></div></div>\
            </div>\
            <div class='bottomButton'><div class='squareDiv button'><p class='buttonSign'>+</p></div></div>";
        return temp;
    };
    
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
        if(event.target.tagName == "TD") {
            if(numberOfColumns() != 1) { 
                currentButtonTop = findPosition(event.target);
                addButton(topButton());
                topButton().style.marginLeft = getOffsetLeft((getSquares().children[0].children[currentButtonTop])) + "px";
            }
            if(numberOfRows() != 1) { 
                currentButtonLeft = findPosition(event.target.parentElement);
                addButton(leftButton());
                leftButton().style.marginTop = getOffsetTop((getSquares().children[currentButtonLeft])) + "px";
            }
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
            var template = createTemplate();            
            parent.appendChild(template);
            
            topButton().onclick = removeColumn;
            leftButton().onclick = removeRow;
            rightButton().onclick = addColumn;
            bottomButton().onclick = addRow;
            getSquares().parentElement.onmousemove = function(){ overTable(this);};
            document.getElementById("squares").onmouseleave = outTable;
            
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