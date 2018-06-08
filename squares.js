var squaresModule = (function() {
    
    var currentButtonLeft = 0;
    var currentButtonTop = 0;
    
    var createTemplate = function() {
        var temp = document.createElement("div");
        temp.id = 'squares';
        temp.innerHTML = "\
                <div class='movable'>Move</div>\
                <div class='topButton squareDiv button'><p class='buttonSign'>-</p></div>\
                <div class='leftButton squareDiv button'><p class='buttonSign'>-</p></div>\
                <table class='squaresTable'>\
                    <tbody class='squaresTbody'>\
                        <tr>\
                            <td class='squaresTd'></td>\
                        </tr>\
                    </tbody>\
                </table>\
                <div class='rightButton squareDiv button'><p class='buttonSign'>+</p></div>\
            <div class='bottomButton squareDiv button'><p class='buttonSign'>+</p></div>";
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
        return document.getElementsByClassName("leftButton")[0]
    }
    
    var rightButton = function(){
        return document.getElementsByClassName("rightButton")[0];
    }
    
    var topButton = function(){
        return document.getElementsByClassName("topButton")[0];
    }
    
    var bottomButton = function(){
        return document.getElementsByClassName("bottomButton")[0];
    }
    
    var wrapper = function(){
        return document.getElementById("squares");
    }
    
    var movable = function(){
        return document.getElementsByClassName("movable")[0];
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
        var table = elem.parentElement
        while(table.tagName != 'TABLE'){
            table = table.parentElement
        }
        return elem.offsetLeft + elem.offsetWidth + parseInt(window.getComputedStyle(elem).borderSpacing, 10) + parseInt(window.getComputedStyle(table).borderLeft, 10);
    }
    
    var getOffsetTop = function(elem){
        var table = elem.parentElement
        while(table.tagName != 'TABLE'){
            table = table.parentElement
        }
        return elem.offsetTop + parseInt(window.getComputedStyle(table).borderLeft, 10);
    }
    
    var outTable = function(){
        removeButton(topButton());
        removeButton(leftButton());
    }
    
    var startPlacing = function(){
        rightButton().style.marginTop = getOffsetTop((getSquares().children[0])) + "px";
        bottomButton().style.marginLeft = getOffsetLeft((getSquares().children[0].children[0])) + "px";
    }
    
    var moveSquares = function(event){
        var shiftX = event.pageX - wrapper().offsetLeft;
        var shiftY = event.pageY - wrapper().offsetTop;

        moveAt(event);
        wrapper().style.zIndex = 10;

        function moveAt(event) {
            wrapper().style.left = event.pageX - shiftX + 'px';
            wrapper().style.top = event.pageY - shiftY + 'px';
        }

        document.onmousemove = function(event) {
            moveAt(event);
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
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
            wrapper().ondragstart = function() { return false; };
            wrapper().onmouseleave = outTable;
            
            movable().onmousedown = moveSquares;
            
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