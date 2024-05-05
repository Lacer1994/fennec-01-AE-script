function myScript(thisObj){
      function myScript_buildUI(thisObj){
        var gridFENNEC = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Script", undefined, {resizeable:true, closeButton: false});
        gridFENNEC.size = [190,290];
        gridFENNEC.minSize = [170,290];

        var mainGroup = gridFENNEC.add("group", undefined, "mainContainer");
        mainGroup.orientation = "column";

        var textMain = mainGroup.add("statictext", undefined, "The number of tiles");
        textMain.alignment = "left";
        var theColorArray = [0.73, 0.73, 0.73, 1];
        var tmg = textMain.graphics;
        var nptmg = tmg.newPen(tmg.PenType.SOLID_COLOR,theColorArray,1);
        tmg.foregroundColor = nptmg;

        var numberOfTiles = mainGroup.add("group", undefined, "numberOfTiles");
            numberOfTiles.orientation = "row";
            var xNumberTilesText = numberOfTiles.add("statictext", undefined, "x :");
            var xNumberTilesEditable = numberOfTiles.add("edittext", undefined, "4");
            xNumberTilesEditable.characters = 3;
            var yNumberTilesText = numberOfTiles.add("statictext", undefined, "y :");
            var yNumberTilesEditable = numberOfTiles.add("edittext", undefined, "4");
            yNumberTilesEditable.characters = 3;

        var separatorLineOne = mainGroup.add("panel");
        separatorLineOne.size = [140, 2];

        var dropdownList = mainGroup.add("dropdownlist", undefined, ["Tiles dimention", "Grid dimention", "Grid same comp size"]);
        dropdownList.selection = 0;
        dropdownList.size = [134, undefined];

        var tilesDimentionGroup = mainGroup.add("group", undefined, "tilesDimentionGroup");
            tilesDimentionGroup.orientation = "row";
            var xDimentionTilesText = tilesDimentionGroup.add("statictext", undefined, "x :");
            var xDimentionTilesEditable = tilesDimentionGroup.add("edittext", undefined, "40");
            xDimentionTilesEditable.characters = 3;
            var yDimentionTilesText = tilesDimentionGroup.add("statictext", undefined, "y :");
            var yDimentionTilesEditable = tilesDimentionGroup.add("edittext", undefined, "40");
            yDimentionTilesEditable.characters = 3;

        var separatorLineTwo = mainGroup.add("panel");
        separatorLineTwo.size = [140, 2];

        var clampGroup = mainGroup.add("group", undefined, "clampGroup");
            var textClamp = clampGroup.add("statictext", undefined, "Clamp the lines:");
            textClamp.size = [104, 20];
            textClamp.alignment = "left";
            var tcg = textClamp.graphics;
            var nptcg = tcg.newPen(tcg.PenType.SOLID_COLOR,theColorArray,1);
            tcg.foregroundColor = nptcg;
            var checkboxClamp = clampGroup.add("checkbox", undefined);
            checkboxClamp.size = [30, 18];
            checkboxClamp.alignment = "bottom";

        var numberStrokesGroup = mainGroup.add("group", undefined, "clampGroup");
            var textNumberStrokes = numberStrokesGroup.add("statictext", undefined, "Number of strokes:");
            textNumberStrokes.size = [98, 20];
            textNumberStrokes.alignment = "left";
            var tnsg = textNumberStrokes.graphics;
            var nptnsg = tnsg.newPen(tnsg.PenType.SOLID_COLOR,theColorArray,1);
            tnsg.foregroundColor = nptnsg;
            var xNumberStroke = numberStrokesGroup.add("edittext", undefined, "3");
            xNumberStroke.size = [26, 20];
            xNumberStroke.characters = 2;
            var adjustSpace = numberStrokesGroup.add("group");
            adjustSpace.size = [0, 20];

        var separatorLineThr = mainGroup.add("panel");
        separatorLineThr.size = [140, 2];
        
        var runButton = mainGroup.add("button", undefined, "Create the FENNEC grid");
        runButton.size = [140, 30]

        dropdownList.onChange = function() {
            var selectedOption = this.selection.text;
            xDimentionTilesEditable.enabled = (selectedOption !== "Grid same comp size");
            yDimentionTilesEditable.enabled = (selectedOption !== "Grid same comp size");
        };

        function validaInput(input) {
                var numero = parseFloat(input);
                return isNaN(numero);
            }
            
            runButton.onClick = function() {
                var inputValxN = xNumberTilesEditable.text;
                var inputValxD = xDimentionTilesEditable.text;
                var inputValyN = yNumberTilesEditable.text;
                var inputValyD = yDimentionTilesEditable.text;
                var inputValS = xNumberStroke.text;
                var dropdownListAlert = dropdownList.selection.index;
                var chekedClamp = checkboxClamp.value;
                //alert(dropdownListAlert);

                if (validaInput(inputValxD)) {
                    alert(inputValxD + " is NOT a number");
                } else if (validaInput(inputValyD)) {
                    alert(inputValyD + " is NOT a number");
                } else if (validaInput(inputValxN)) {
                    alert(inputValxN + " is NOT a number");
                } else if (validaInput(inputValyN)) {
                    alert(inputValyN + " is NOT a number");
                } else if (validaInput(inputValS)) {
                    alert(inputValS + " is NOT a number");
                } else if (inputValxN < 1 || inputValxD < 1 || inputValyN < 1 || inputValyD < 1 || inputValS < 1) {
                    alert("All numbers must higher than 0");
                } else {
                    createGrid(inputValxN,inputValyN,inputValxD,inputValyD,inputValS,dropdownListAlert,chekedClamp);
                }
            };

            //gridFENNEC.show();

            function createGrid(a, b, c, d, e, f, g) {
                app.beginUndoGroup("FENNEC grid");
                var curComp = app.project.activeItem;
                if (curComp != null && curComp instanceof CompItem) {
            
                var shapeLayer = curComp.layers.addShape();
                shapeLayer.name = "FENNEC grid";
                var shapeContents = shapeLayer.property("ADBE Root Vectors Group"); // contents
            
                var xv = Math.floor(a);
                var yv = Math.floor(b);
                var nStroke = Math.floor(e);
                var tileDimentionWidth = Math.floor(c);
                var tileDimentioHeight = Math.floor(d);
                var allGridPoints = [];
                var reScale = [100,100];
                
                var xPosition = 0;
                var yPosition = 0;
                if (f==2){
                    // sameCompSize
                    tileDimentionWidth = curComp.width/xv;
                    tileDimentioHeight = curComp.height/yv;
                } else if (f==1){
                    // tileSize
                    xPosition = curComp.width/2 - tileDimentionWidth/2;
                    yPosition = curComp.height/2 - tileDimentioHeight/2;  
                    tileDimentionWidth = tileDimentionWidth/xv;
                    tileDimentioHeight = tileDimentioHeight/yv;
                } else {
                    xPosition = curComp.width/2 - tileDimentionWidth*xv/2;
                    yPosition = curComp.height/2 - tileDimentioHeight+yv/2;
                };
                shapeLayer.property("ADBE Transform Group").property("ADBE Position").setValue([xPosition,yPosition]);
                if (g==true){
                    // clampTheSize
                    if(tileDimentionWidth>tileDimentioHeight){
                        reScale[0] = 100*tileDimentionWidth/tileDimentioHeight;
                    } else {
                        reScale[1] = 100*tileDimentioHeight/tileDimentionWidth;
                    };
                    tileDimentionWidth = Math.min(tileDimentionWidth, tileDimentioHeight);
                    tileDimentioHeight = Math.min(tileDimentionWidth, tileDimentioHeight);
                };
                var tileMinDimetion = Math.min(tileDimentionWidth, tileDimentioHeight);
            
                for (var ia = 0; ia < xv; ia++) {
                    for(var ib = 0; ib < yv; ib++){
                        var aPoint = [ia,ib];
                        allGridPoints.push(aPoint);
                    }
                };
            
                var indexToRemove = 0;
                var target = [];
                var newGrid = [];
                var collision;
                var idPath = 1;
                var tempFTarget;
                var tempSTarget;
                
                while (allGridPoints.length > 0) {
                    newGrid = [];
                    collision = 0;
                    indexToRemove = Math.floor(Math.random()*allGridPoints.length);
                    target = allGridPoints[indexToRemove];
                    var oldirection = Math.floor(Math.random() * 4);
                    var firstStep = setTempTarget(oldirection,tileDimentionWidth, tileDimentioHeight, target);
                    newGrid.push(firstStep[1]);
                    while (collision < 1) {
                        var d = noSameDirection(oldirection);
                        var newTarget = [];
                        tempFTarget = [target[0]*tileDimentionWidth+(tileDimentionWidth/2), target[1]*tileDimentioHeight+(tileDimentioHeight/2)];
                        newGrid.push(tempFTarget);
                        var resultsOfDirection = setTempTarget(d,tileDimentionWidth, tileDimentioHeight, target);
                        newTarget = resultsOfDirection[0];
                        tempSTarget = resultsOfDirection[1];
                        newGrid.push(tempSTarget);
                        allGridPoints.splice(indexToRemove, 1);
                        if (allGridPoints.length != 0) {
                            for (var i = 0; i < allGridPoints.length; i++) {
                                if (allGridPoints[i][0] === newTarget[0] && allGridPoints[i][1] === newTarget[1]) {
                                    indexToRemove = i;
                                    target = newTarget;
                                    collision = 0;
                                    break;
                                } else {
                                    collision = 1;}
                            };
                        } else { collision = 1;};
                        oldirection = becameOld(d);
                    };
                    addShapeGroup(newGrid,idPath,shapeContents);
                    idPath++;
                };
                creatStrokes(nStroke,idPath,tileMinDimetion);
                shapeContents.addProperty("ADBE Vector Filter - RC");
                shapeContents.property("ADBE Vector Filter - RC").property(1).setValue(20);
                shapeLayer.property("ADBE Transform Group").property("ADBE Scale").setValue(reScale);
                shapeContents.addProperty("ADBE Vector Filter - Trim");
                shapeContents.property("ADBE Vector Filter - Trim").property(4).setValue(2);
                shapeContents.property("ADBE Vector Filter - Trim").property(2).setValueAtTime(shapeLayer.inPoint, 0);
                shapeContents.property("ADBE Vector Filter - Trim").property(2).setValueAtTime(shapeLayer.outPoint, 100);
                alert("We have done!")
            } else {
                alert("Select a composition");
            };
            
            //functions
            function creatStrokes(nstrs, idp, tileS){
                for (var i = 0; i < nstrs; i++){
                    var smallestStroke = tileS/10;
                    var segmentDimetion = (tileS-smallestStroke)/(nstrs-1);
                    shapeContents.addProperty("ADBE Vector Graphic - Stroke");
                    shapeContents.property(idp+i).property("ADBE Vector Stroke Width").setValue(smallestStroke+segmentDimetion*i);
                    var randomColor = [Math.random(),Math.random(),Math.random(),1];
                    shapeContents.property(idp+i).property("ADBE Vector Stroke Color").setValue(randomColor);
                };
            };
            
            function addShapeGroup(thePoints, id,theGrid){
                var shapeGroup = theGrid.addProperty("ADBE Vector Group");
                shapeGroup.name = "tile " + id;
                var starPath = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
                var thePath = shapeGroup.property("ADBE Vectors Group").property("ADBE Vector Shape - Group").property("ADBE Vector Shape");
                var newPath = thePoints;
                var newShape = new Shape();
                newShape.vertices = newPath;
                newShape.closed = false;
                thePath.setValue(newShape);
            };
            
            function becameOld(nd){
                if (nd == 0){
                    return 1;
                } else if (nd == 1){
                    return 0;
                } else if (nd == 2){
                    return 3;
                } else if (nd == 3){
                    return 2;
                };
            };
            
            function noSameDirection(oldr){
                var newr = oldr;
                while (oldr == newr) {
                    newr = Math.floor(Math.random() * 4);
                };
                return newr;
            };
            
            function setTempTarget(tileDirection,tileDimentionW, tileDimentionH, tileTarget){
                var nT;
                var tsT;
                if (tileDirection == 0) {
                    nT = [tileTarget[0]+1, tileTarget[1]];
                    tsT = [tileTarget[0]*tileDimentionW+tileDimentionW, tileTarget[1]*tileDimentionH+tileDimentionH/2];
                } else if (tileDirection == 1) {
                    nT = [tileTarget[0]-1, tileTarget[1]];
                    tsT = [tileTarget[0]*tileDimentionW, tileTarget[1]*tileDimentionH+tileDimentionH/2];
                } else if (tileDirection == 2) {
                    nT = [tileTarget[0], tileTarget[1]+1];
                    tsT = [tileTarget[0]*tileDimentionW+tileDimentionW/2, tileTarget[1]*tileDimentionH+tileDimentionH];
                } else if (tileDirection == 3){
                    nT = [tileTarget[0], tileTarget[1]-1];
                    tsT = [tileTarget[0]*tileDimentionW+tileDimentionW/2, tileTarget[1]*tileDimentionH];
                };
                return [nT, tsT];
            };
            app.endUndoGroup();
            };
    gridFENNEC.layout.layout(true);
    return gridFENNEC;
    }
   
   
      var myScriptPal = myScript_buildUI(thisObj);

      if (myScriptPal != null && myScriptPal instanceof Window){
         myScriptPal.center();
         myScriptPal.show();
        };

}
myScript(this);
