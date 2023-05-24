//Resizing script for Photoshop
//CC BY Lyn Seren

var activeDoc = app.activeDocument;

var initUnits = app.preferences.rulerUnits;
var initColourBG = app.backgroundColor;

//Global vars
var borderWmm;
var paperDimensions;
var bias;
var biasMM;
var topAlign
var paperWmm;
var paperWpx;
var paperHmm;
var paperHpx;
var imgW;
var imgH;
var maxWmm;
var maxHmm;
var borderSides;
var borderTop;
var borderBase;
var actualImgH;
var actualImgW;
var totalVBorder;
var dTopAlign;
var baseControl;
var sliderVal;
var aspect;
var imageRatio;
var cropType;
var matchAll;
var bordersMatch;
var testMaxH;
var testMaxW;

const LANDSCAPE = "ASPECT_LANDSCAPE";
const PORTRAIT = "ASPECT_PORTRAIT";
const SQUARE = "ASPECT_SQUARE";
const WIDTH = "CROP_WIDTH";
const HEIGHT = "HEIGHT";

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":10,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"dlg","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Resizer","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Panel","parentId":22,"style":{"enabled":true,"varName":"pnlBias","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Vertical offset","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["center","top"],"alignment":null}},"item-2":{"id":2,"type":"RadioButton","parentId":8,"style":{"enabled":true,"varName":"rbutPercent","text":"%","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-3":{"id":3,"type":"RadioButton","parentId":8,"style":{"enabled":true,"varName":"rbutMM","text":"mm","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-4":{"id":4,"type":"EditText","parentId":6,"style":{"enabled":true,"varName":"txtBias","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"0","justify":"left","preferredSize":[45,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"StaticText","parentId":6,"style":{"enabled":true,"varName":"stxtBias","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"mm","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"Panel","parentId":21,"style":{"enabled":true,"varName":"pnlPaperSize","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Paper size","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["center","top"],"alignment":null}},"item-10":{"id":10,"type":"DropDownList","parentId":9,"style":{"enabled":true,"varName":"ddPaperSize","text":"DropDownList","listItems":"A4,A3,A2,A1,A0","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-11":{"id":11,"type":"Panel","parentId":21,"style":{"enabled":true,"varName":"pnlBorder","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Border width","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["center","top"],"alignment":null}},"item-12":{"id":12,"type":"EditText","parentId":14,"style":{"enabled":true,"varName":"txtWidth","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"20","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"StaticText","parentId":14,"style":{"enabled":true,"varName":"stxtWidth","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"mm","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-14":{"id":14,"type":"Group","parentId":11,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-15":{"id":15,"type":"Panel","parentId":34,"style":{"enabled":true,"varName":"pnlConfirm","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Confirmation","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["center","top"],"alignment":null}},"item-16":{"id":16,"type":"Button","parentId":15,"style":{"enabled":true,"varName":"btnOkay","text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"Button","parentId":15,"style":{"enabled":true,"varName":"btnCancel","text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-19":{"id":19,"type":"Checkbox","parentId":20,"style":{"enabled":true,"varName":"checkTop","text":"Top = sides","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-20":{"id":20,"type":"Group","parentId":32,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-21":{"id":21,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"topGroup1","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-22":{"id":22,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"topGroup3","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-24":{"id":24,"type":"Panel","parentId":22,"style":{"enabled":true,"varName":"pnlBase","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Base border height","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-32":{"id":32,"type":"Panel","parentId":21,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"3-side match","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-34":{"id":34,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"topGroup4","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-35":{"id":35,"type":"Checkbox","parentId":24,"style":{"enabled":true,"varName":"checkBase","text":"Adjust by base height","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-36":{"id":36,"type":"Slider","parentId":24,"style":{"enabled":false,"varName":null,"preferredSize":[200,0],"alignment":null,"helpTip":null}},"item-37":{"id":37,"type":"Panel","parentId":34,"style":{"enabled":true,"varName":"pnlStats","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Stats","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":3,"alignChildren":["left","top"],"alignment":null}},"item-38":{"id":38,"type":"StaticText","parentId":40,"style":{"enabled":true,"varName":"stxtStatBase","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Base:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-40":{"id":40,"type":"Group","parentId":37,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-41":{"id":41,"type":"Group","parentId":37,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-43":{"id":43,"type":"StaticText","parentId":40,"style":{"enabled":true,"varName":"stxtStatTop","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Top:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-44":{"id":44,"type":"StaticText","parentId":41,"style":{"enabled":true,"varName":"stxtTopMM","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"20 mm","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-45":{"id":45,"type":"StaticText","parentId":41,"style":{"enabled":true,"varName":"stxtBaseMM","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"20 mm","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-46":{"id":46,"type":"StaticText","parentId":40,"style":{"enabled":true,"varName":"stxtStatSides","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Sides:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-47":{"id":47,"type":"StaticText","parentId":41,"style":{"enabled":true,"varName":"stxtSidesMM","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"20 mm","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,21,9,10,11,14,12,13,32,20,19,22,1,8,3,2,6,4,7,24,35,36,34,37,40,46,43,38,41,47,44,45,15,16,17],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

// DLG
// ===
var dlg = new Window("dialog"); 
    dlg.text = "Resizer"; 
    dlg.orientation = "column"; 
    dlg.alignChildren = ["center","top"]; 
    dlg.spacing = 10; 
    dlg.margins = 16; 

// TOPGROUP1
// =========
var topGroup1 = dlg.add("group", undefined, {name: "topGroup1"}); 
    topGroup1.orientation = "row"; 
    topGroup1.alignChildren = ["left","center"]; 
    topGroup1.spacing = 10; 
    topGroup1.margins = 0; 

// PNLPAPERSIZE
// ============
var pnlPaperSize = topGroup1.add("panel", undefined, undefined, {name: "pnlPaperSize"}); 
    pnlPaperSize.text = "Paper size"; 
    pnlPaperSize.orientation = "column"; 
    pnlPaperSize.alignChildren = ["center","top"]; 
    pnlPaperSize.spacing = 10; 
    pnlPaperSize.margins = 10; 

var ddPaperSize_array = ["A4","A3","A2","A1","A0"]; 
var ddPaperSize = pnlPaperSize.add("dropdownlist", undefined, undefined, {name: "ddPaperSize", items: ddPaperSize_array}); 
    ddPaperSize.selection = 0; 

// PNLBORDER
// =========
var pnlBorder = topGroup1.add("panel", undefined, undefined, {name: "pnlBorder"}); 
    pnlBorder.text = "Border width"; 
    pnlBorder.orientation = "column"; 
    pnlBorder.alignChildren = ["center","top"]; 
    pnlBorder.spacing = 10; 
    pnlBorder.margins = 10; 

// GROUP1
// ======
var group1 = pnlBorder.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

var txtWidth = group1.add('edittext {properties: {name: "txtWidth"}}'); 
    txtWidth.text = "20"; 
    txtWidth.preferredSize.width = 40; 

var stxtWidth = group1.add("statictext", undefined, undefined, {name: "stxtWidth"}); 
    stxtWidth.text = "mm"; 

// pnlMatch
// ======
var pnlMatch = topGroup1.add("panel", undefined, undefined, {name: "pnlMatch"}); 
    pnlMatch.text = "3-side match"; 
    pnlMatch.orientation = "column"; 
    pnlMatch.alignChildren = ["left","top"]; 
    pnlMatch.spacing = 10; 
    pnlMatch.margins = 10; 

// GROUP2
// ======
var group2 = pnlMatch.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["center","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

var checkTop = group2.add("checkbox", undefined, undefined, {name: "checkTop"}); 
    checkTop.text = "Top = sides"; 

// TOPGROUP3
// =========
var topGroup3 = dlg.add("group", undefined, {name: "topGroup3"}); 
    topGroup3.orientation = "row"; 
    topGroup3.alignChildren = ["left","center"]; 
    topGroup3.spacing = 10; 
    topGroup3.margins = 0; 

// PNLBIAS
// =======
var pnlBias = topGroup3.add("panel", undefined, undefined, {name: "pnlBias"}); 
    pnlBias.text = "Vertical offset"; 
    pnlBias.orientation = "column"; 
    pnlBias.alignChildren = ["center","top"]; 
    pnlBias.spacing = 10; 
    pnlBias.margins = 10; 

// GROUP3
// ======
var group3 = pnlBias.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var rbutMM = group3.add("radiobutton", undefined, undefined, {name: "rbutMM"}); 
    rbutMM.text = "mm"; 
    rbutMM.value = true; 

var rbutPercent = group3.add("radiobutton", undefined, undefined, {name: "rbutPercent"}); 
    rbutPercent.text = "%"; 

// GROUP4
// ======
var group4 = pnlBias.add("group", undefined, {name: "group4"}); 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 10; 
    group4.margins = 0; 

var txtBias = group4.add('edittext {properties: {name: "txtBias"}}'); 
    txtBias.text = "0"; 
    txtBias.preferredSize.width = 45; 

var stxtBias = group4.add("statictext", undefined, undefined, {name: "stxtBias"}); 
    stxtBias.text = "mm"; 

// PNLBASE
// =======
var pnlBase = topGroup3.add("panel", undefined, undefined, {name: "pnlBase"}); 
    pnlBase.text = "Base border height"; 
    pnlBase.orientation = "column"; 
    pnlBase.alignChildren = ["left","top"]; 
    pnlBase.spacing = 10; 
    pnlBase.margins = 10; 

var checkBase = pnlBase.add("checkbox", undefined, undefined, {name: "checkBase"}); 
    checkBase.text = "Adjust by base height"; 

var sliderBase = pnlBase.add("slider", undefined, undefined, undefined, undefined, {name: "sliderBase"}); 
    sliderBase.enabled = false; 
    sliderBase.minvalue = 0; 
    sliderBase.maxvalue = 100; 
    sliderBase.value = 50; 
    sliderBase.preferredSize.width = 200; 

// TOPGROUP4
// =========
var topGroup4 = dlg.add("group", undefined, {name: "topGroup4"}); 
    topGroup4.orientation = "row"; 
    topGroup4.alignChildren = ["left","center"]; 
    topGroup4.spacing = 10; 
    topGroup4.margins = 0; 

// PNLALL
// ======
var pnlAll = topGroup4.add("panel", undefined, undefined, {name: "pnlAll"}); 
    pnlAll.text = "Match all sides"; 
    pnlAll.orientation = "column"; 
    pnlAll.alignChildren = ["left","top"]; 
    pnlAll.spacing = 10; 
    pnlAll.margins = 10; 

var checkAll = pnlAll.add("checkbox", undefined, undefined, {name: "checkAll"}); 
    checkAll.text = "Match all"; 

// GROUP5
// ======
var group5 = pnlAll.add("group", undefined, {name: "group5"}); 
    group5.orientation = "column"; 
    group5.alignChildren = ["left","center"]; 
    group5.spacing = 5; 
    group5.margins = 0; 

var stxtAll1 = group5.add("statictext", undefined, undefined, {name: "stxtAll1"}); 
    stxtAll1.text = "CAUTION:"; 

var stxtAll2 = group5.add("statictext", undefined, undefined, {name: "stxtAll2"}); 
    stxtAll2.text = "Check stats"; 

// PNLSTATS
// ========
var pnlStats = topGroup4.add("panel", undefined, undefined, {name: "pnlStats"}); 
    pnlStats.text = "Stats"; 
    pnlStats.orientation = "row"; 
    pnlStats.alignChildren = ["left","top"]; 
    pnlStats.spacing = 3; 
    pnlStats.margins = 10; 

// GROUP6
// ======
var group6 = pnlStats.add("group", undefined, {name: "group5"}); 
    group6.orientation = "column"; 
    group6.alignChildren = ["left","center"]; 
    group6.spacing = 10; 
    group6.margins = 0; 

var stxtStatSides = group6.add("statictext", undefined, undefined, {name: "stxtStatSides"}); 
    stxtStatSides.text = "Sides:"; 

var stxtStatTop = group6.add("statictext", undefined, undefined, {name: "stxtStatTop"}); 
    stxtStatTop.text = "Top:"; 

var stxtStatBase = group6.add("statictext", undefined, undefined, {name: "stxtStatBase"}); 
    stxtStatBase.text = "Base:"; 

// GROUP7
// ======
var group7 = pnlStats.add("group", undefined, {name: "group6"}); 
    group7.orientation = "column"; 
    group7.alignChildren = ["left","center"]; 
    group7.spacing = 10; 
    group7.margins = 0; 

var stxtSidesMM = group7.add("statictext", undefined, undefined, {name: "stxtSidesMM"}); 
    stxtSidesMM.text = "20 mm"; 

var stxtTopMM = group7.add("statictext", undefined, undefined, {name: "stxtTopMM"}); 
    stxtTopMM.text = "20 mm"; 

var stxtBaseMM = group7.add("statictext", undefined, undefined, {name: "stxtBaseMM"}); 
    stxtBaseMM.text = "20 mm"; 

// PNLCONFIRM
// ==========
var pnlConfirm = topGroup4.add("panel", undefined, undefined, {name: "pnlConfirm"}); 
    pnlConfirm.text = "Confirmation"; 
    pnlConfirm.orientation = "column"; 
    pnlConfirm.alignChildren = ["center","top"]; 
    pnlConfirm.spacing = 10; 
    pnlConfirm.margins = 10; 

var btnOkay = pnlConfirm.add("button", undefined, undefined, {name: "btnOkay"}); 
    btnOkay.text = "OK"; 

var btnCancel = pnlConfirm.add("button", undefined, undefined, {name: "btnCancel"}); 
    btnCancel.text = "Cancel"; 


//Initial setup
var biasPercent = false;

calcBorders();

rbutMM.onClick = function() {
    stxtBias.text = "mm";
    biasPercent = false;

    calcBorders();
}

rbutPercent.onClick = function() {
    stxtBias.text = "%";
    biasPercent = true;

    calcBorders();
}

checkTop.onClick = function() {
    if (checkTop.value == true) {
        pnlBias.enabled = false;
        pnlBase.enabled = false;
        pnlAll.enabled = false;
    } else {
        pnlBias.enabled = true;
        pnlBase.enabled = true;
        pnlAll.enabled = true;
    }

    calcBorders();
}

checkBase.onClick = function() {
    if (checkBase.value == true) {
        sliderBase.enabled = true;
        pnlBias.enabled = false;
        pnlMatch.enabled = false;
        pnlAll.enabled = false;
    } else {
        sliderBase.enabled = false;
        pnlBias.enabled = true;
        pnlMatch.enabled = true;
        pnlAll.enabled = true;
    }

    calcBorders();
}

checkAll.onClick = function() {
    if (checkAll.value == true) {
        matchAll = true;
        pnlBorder.enabled = false;
        pnlMatch.enabled = false;
        pnlBias.enabled = false;
        pnlBase.enabled = false;
    } else {
        matchAll = false;
        pnlBorder.enabled = true;
        pnlMatch.enabled = true;
        pnlBias.enabled = true;
        pnlBase.enabled = true;
    }

    calcBorders();
}

ddPaperSize.onChange = function() {
    calcBorders();
}

txtWidth.onChange = function() {
    sliderSet = false;
    calcBorders();
}

txtBias.onChange = function() {
    calcBorders();
}

sliderBase.onChanging = function() {
    calcBorders();
}

btnOkay.onClick = function() {
    
    //Prevent duplication - this solution is hacky
    btnOkay.onClick = function(){};

    dlg.hide();

    //Flatten image
    activeDoc.flatten();
    activeDocument.activeLayer.isBackgroundLayer = false;

    borderWmm = parseFloat(txtWidth.text);
    paperDimensions = getPaperDimensions(ddPaperSize.selection.text);
    bias = parseFloat(txtBias.text);
    biasMM;
    if (biasPercent == false) {
        biasMM = bias; } else {
        biasMM = borderWmm * (bias * 0.01); }
    topAlign = checkTop.value;
    baseControl = checkBase.value;
    
    pageResize();

    dlg.exit();
}

btnCancel.onClick = function() {
    app.preferences.rulerUnits = initUnits;
    app.backgroundColor = initColourBG;
    
    dlg.exit();
}

var sliderSet = false;

app.preferences.rulerUnits = Units.MM;

imgW = activeDoc.width;
imgH = activeDoc.height;
imageRatio = imgW / imgH;

if (imageRatio < 1) {
    aspect = PORTRAIT;
} else if (imageRatio == 1) {
    aspect = SQUARE;
} else {
    aspect = LANDSCAPE;
}

calcBorders();

//Show dialogue (after initial setup)
dlg.show();

function getValuesAndSetVars() {
    borderWmm = parseFloat(txtWidth.text);

    paperDimensions = getPaperDimensions(ddPaperSize.selection.text);
    //Check if landscape or portrait;
    if (aspect == PORTRAIT || aspect == SQUARE) {
        paperWmm = paperDimensions[0][0];
        paperWpx = paperDimensions[1][0];
        paperHmm = paperDimensions[0][1];
        paperHpx = paperDimensions[1][1];
    } else {
        paperWmm = paperDimensions[0][1];
        paperWpx = paperDimensions[1][1];
        paperHmm = paperDimensions[0][0];
        paperHpx = paperDimensions[1][0];
    }
    paperRatio = paperWmm / paperHmm;

    bias = parseFloat(txtBias.text);
    if (biasPercent == false) {
        biasMM = bias; } else {
        biasMM = borderWmm * (bias * 0.01); }
    topAlign = checkTop.value;

    //Calc size - border    
    maxWmm = paperWmm - (2 * borderWmm);
    maxHmm = paperHmm - ((2 * borderWmm) + biasMM);

    //Assume crop H, then test
    actualImgH = maxHmm;
    actualImgW = maxHmm * imageRatio;
    cropType = HEIGHT;

    reCalcBorders();

    if (borderTop   < borderWmm ||
        borderBase  < borderWmm ||
        borderSides < borderWmm ) {
            actualImgW = maxWmm;
            actualImgH = maxWmm / imageRatio;
            cropType = WIDTH;

            reCalcBorders();
    }

    checkMatchBorders();

    function reCalcBorders() {
        borderTop = (paperHmm - actualImgH) / 2;
        borderBase = borderTop;
        borderSides = (paperWmm - actualImgW) / 2; 
    }

    function checkMatchBorders() {
        switch (aspect) {
            case PORTRAIT:
            case SQUARE:
                //Equation solved using WolframAlpha
                bordersMatch = ((paperWmm * imageRatio) - (1/Math.SQRT2 * paperWmm)) / (2 * (imageRatio - 1));
                break;
            case LANDSCAPE:
                //Equation solved using WolframAlpha
                bordersMatch = ((paperHmm * imageRatio) - (Math.SQRT2 * paperHmm)) / (2 * (imageRatio - 1));
                break;
        }

        testMaxH = paperHmm - (2 * bordersMatch);
        testMaxW = paperWmm - (2 * bordersMatch);

        if (testMaxH <= 0 ||
            testMaxW <= 0 ||
            testMaxH > paperHmm ||
            testMaxW > paperWmm) {
                pnlAll.enabled = false;
            }
    }

    totalVBorder = paperHmm - actualImgH;
    dTopAlign = (totalVBorder / 2) - borderWmm;
    sliderVal = sliderBase.value;
}

function calcBorders(){
    getValuesAndSetVars();    

    //Set parameters for slider
    if (!sliderSet) {
        sliderBase.minvalue = 0;
        sliderBase.maxvalue = Math.floor(paperHmm - actualImgH); 
        sliderBase.value = borderWmm;
        sliderSet = true;
    }

    if (matchAll) {
        //Use calculated values
        borderTop = bordersMatch;
        borderBase = bordersMatch;
        borderSides = bordersMatch;
    } else if (checkBase.value == true) {
        //get value from slider
        borderTop = totalVBorder - sliderBase.value;
        borderBase = totalVBorder - borderTop;
    } else if (checkTop.value == true /*|| (biasMM / 2) < dTopAlign*/) {
        borderTop = borderWmm;
        borderSides = borderTop;
        borderBase = totalVBorder - borderTop;
    } else {
        //Adjust for offset
        borderTop -= (biasMM / 2);
        borderBase += (biasMM / 2);
    }

     //Check if sides always wider than top can be
    if ((borderSides * 2) + actualImgH > paperHmm || matchAll) {
        pnlMatch.enabled = false;
    } else {
        pnlMatch.enabled = true;
    }

    //Update text
    stxtSidesMM.text = String(Math.round(borderSides)) + " mm";
    stxtTopMM.text = String(Math.round(borderTop)) + " mm";
    stxtBaseMM.text = String(Math.round(borderBase)) + " mm";
}

function pageResize() {
    getValuesAndSetVars();
    app.backgroundColor.rgb.hexValue = "FFFFFF";
    
    switch (cropType) {
        case HEIGHT:
                activeDoc.resizeImage (undefined, maxHmm, 300, ResampleMethod.AUTOMATIC);
            break;
        case WIDTH:
                activeDoc.resizeImage (maxWmm, undefined, 300, ResampleMethod.AUTOMATIC);
            break;
    }
    
    //Resize canvas
    activeDoc.resizeCanvas(paperWmm, paperHmm, undefined);

    //Adjust vertical position
    if (baseControl) {
        activeDoc.activeLayer.translate(0,-(totalVBorder - sliderVal));
    } else if (topAlign) {
        //translate such as top gap = border width
        activeDoc.activeLayer.translate(0,-dTopAlign);
    } else if ((biasMM / 2) < dTopAlign){
        //unless tranlation means top border < sides: Then top align
        activeDoc.activeLayer.translate(0,-(biasMM / 2));
    } else {
        activeDoc.activeLayer.translate(0,-((totalVBorder / 2) - borderWmm));
    }

    app.preferences.rulerUnits = initUnits;
    app.backgroundColor = initColourBG;
}

function getPaperDimensions(aSize) {
    //Returns 2-dimensional array with paper size in _portrait_, first in mm then pixels at 300 ppi
    switch (aSize){
        case 'A0':
            return [[841, 1189],[9933, 14043]];
            break;
        case 'A1':
            return [[594, 841],[7016, 9933]];
            break;
        case 'A2':
            return [[420, 594],[4961, 7016]];
        break;
        case 'A3':
            return [[297, 420],[3508, 4961]];
            break;
        case 'A4':
            return [[210, 297],[2480, 3508]];
            break;
        case 'A5':
            return [[148, 210],[1748, 2408]];
            break;
        case 'A6':
            return [[105, 148],[1240, 1748]];
            break;
        case 'A7':
            return [[74, 105],[874, 1240]];
            break;
        default:
            alert("Invalid paper size.")
    }
}