/* ---ElementMover--- */

ElementMover = {
  Canvas: ElementMover_Canvas,
  TouchStartPoint: { x: null, y: null },
  TeileModus: null,
  Status: false,
  AktuellerElementeArray: null,
};

ElementMover.EinElementWurdeAusgewaehlt = function(){
	if(ElementMover.Status){
		ElementMover.ManipulationsFelderErstellen(ElementMover.TeileModus);
	};
}

ElementMover.Check = function(modus) {
  this.Status = !this.Status;
  ElementMover_MainContainer.style.display = this.Status ? "block" : "none";
  if (this.Status) {
    this.Start(modus, this.Canvas);
  }else{
  	ElementMover.Ende();
  }
};

ElementMover.Start = function(modus, canvas) {
	ElementMover_ManipulationsContainer.innerHTML = "";
	const charakter = faktuellerCharakter();
	const ausgesuchtesBild = CB.BildEbenen.Selected.Element + CB.BildEbenen.Selected.Index;
	const isSelectedIndexNull = CB.Elemente.Selected.Index === null;
	if (modus === 'Bestandteil' || modus === "Stempel") {
	    ElementMover.AktuellerElementeArray = modus === 'Bestandteil' ? charakter[ausgesuchtesBild].CanvasElemente.Alle : charakter.Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1];
	    if (isSelectedIndexNull && ElementMover.AktuellerElementeArray.length > 0) {
	        const levelNr = CB.BildEbenen.Selected.Index;
	        const plane = CB.BildEbenen.Selected.Element;
	        const wer = CB.BildEbenen.Selected.Wer;
	        const stelle = CB.Elemente.Selected.Index;
	        const id = modus === 'Bestandteil' ? plane + levelNr + "CanvasElement" + 0 : "Stempel" + CB.Stempel.Selected.Index + "CanvasElement" + 0;
	        CB.Elemente.Auswaehlen(id, 0, plane, levelNr, wer, 0, modus);
	    }
	}
	canvas.width = charakter.Bild.Width;
	canvas.height = charakter.Bild.Height;
	const ctx = canvas.getContext('2d');
    ElementMover.TeileModus = modus;
    ElementMover.DrawCanvas(ctx, modus);
    ElementMover.ManipulationsFelderErstellen(ElementMover.TeileModus);
}

ElementMover.Ende = function(){
	if(ElementMover.TeileModus == "Bestandteil"){
		const plane = CB.BildEbenen.Selected.Element;
		const levelNr = CB.BildEbenen.Selected.Index;
		const imageId = "Bild" + levelNr + plane;
		CB.CanvasElemente.MalDieBilder([plane, levelNr]);
		CB.BildEbenen.ZeigDasBild(imageId, plane, levelNr, ElementMover.TeileModus);
	}else
	if(ElementMover.TeileModus == "Stempel"){
		const imageId = "Stempel" + CB.Stempel.Selected.Index;
		CB.CanvasElemente.StempelAktualisieren(faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][0]);
		CB.BildEbenen.ZeigDasBild(imageId, imageId, CB.Stempel.Selected.Index, ElementMover.TeileModus);
		CB.CanvasElemente.MalDieBilder("Alle");
	}
	CB.Elemente.Selected.Index = null;
	CB.Elemente.Selected.Element = null;
}

ElementMover.CreateManipulationControl = function(attributeId, label, changeMode, datenNr) {
    const divId = 'ElementMover_' + label + 'Regler';
    const div = createDivElement('ElementMover_ManipulationsContainer', divId, "elementMover_ManipulationControl", label);
    $(divId).addEventListener('touchstart', function(event) {
        ElementMover.HandleTouchStart(event, ElementMover_Canvas);
    });
    $(divId).addEventListener('touchmove', function(event) {
        const point = ElementMover.HandleTouchMove(event, ElementMover_Canvas);
        if (CB.Elemente.Selected.Element != null) {
            ElementMover.TransformSelectedElement(point[0], point[1], changeMode, datenNr);
        }
    });
    $(divId).addEventListener('touchend', function(event) {
        ElementMover.HandleTouchEnd(event);
    });
}

ElementMover.ManipulationsFelderErstellen = function(modus){
	ElementMover_ManipulationsContainer.innerHTML = "";
	if(CB.Elemente.Selected.Index == null){
		alert("nüschte");
		return;
	}
	const elementId = ElementMover.AktuellerElementeArray[CB.Elemente.Selected.Index][0];
	const datenArray = CB.Daten.SchummelArray[elementId];
	const divId = 'ElementMover_PositionRegler';
	const div = createDivElement('ElementMover_ManipulationsContainer', divId, "elementMover_ManipulationControl", "Position");
	$(divId).addEventListener('touchstart', function(event) {
		ElementMover.HandleTouchStart(event, ElementMover_Canvas);
	});
	$(divId).addEventListener('touchmove', function(event) {
		const point = ElementMover.HandleTouchMove(event, ElementMover_Canvas);
		if (CB.Elemente.Selected.Element != null) {
			ElementMover.TransformSelectedElement(point[0], point[1], "Position", "");
		}
	});
	$(divId).addEventListener('touchend', function(event) {
		ElementMover.HandleTouchEnd(event);
	});
	for(let datenNr in datenArray){
		let attributeId = datenArray[datenNr][0];
	    switch (attributeId) {
	        case "WWert":
	            ElementMover.CreateManipulationControl(attributeId, "Breite", "Breite", datenNr);
	            break;
	        case "HWert":
	            ElementMover.CreateManipulationControl(attributeId, "Hoehe", "Hoehe", datenNr);
	            break;
	        case "RotationWert":
	            ElementMover.CreateManipulationControl(attributeId, "Rotation", "Rotation", datenNr);
	            break;
	        case "ScaleXWert":
	            ElementMover.CreateManipulationControl(attributeId, "ScaleX", "ScaleX", datenNr);
	            break;
	        case "ScaleYWert":
	            ElementMover.CreateManipulationControl(attributeId, "ScaleY", "ScaleY", datenNr);
	            break;
	        case "SkewXWert":
	            ElementMover.CreateManipulationControl(attributeId, "SkewX", "SkewX", datenNr);
	            break;
	        case "SkewYWert":
	            ElementMover.CreateManipulationControl(attributeId, "SkewY", "SkewY", datenNr);
	            break;
	        case "BorderWidthWert":
	            ElementMover.CreateManipulationControl(attributeId, "BorderWidth", "BorderWidth", datenNr);
	            break;
	        case "RadiusWert":
	            ElementMover.CreateManipulationControl(attributeId, "Radius", "Radius", datenNr);
	            break;
	        case "SpitzenWert":
	            ElementMover.CreateManipulationControl(attributeId, "Spitzen", "Spitzen", datenNr);
	            break;
	        default:
	            // Handle unknown attribute ID
	            break;
	    }
	}
	const stelle = CB.Elemente.Selected.Index;
	const containerId = 'ElementMover_ManipulationsContainer';
	const levelNr = CB.BildEbenen.Selected.Index;
	const plane = CB.BildEbenen.Selected.Element;
	const wer = CB.BildEbenen.Selected.Wer;
	if (stelle > 0) {
	  	id2 = containerId + 'Hoch';
	  	createButtonElement(containerId, id2, id2, 'CB.Elemente.Verschieben(this.id,' + stelle + ',"' + plane + '",' + levelNr + ',"' + wer + '","Hoch","' + modus + '")', "↑");
	}
	if (stelle < CB.Elemente.WelcheElementeWurdenErstellt.length - 1) {
	  	id2 = containerId + 'Runter';
	  	createButtonElement(containerId, id2, id2, 'CB.Elemente.Verschieben(this.id,' + stelle + ',"' + plane + '",' + levelNr + ',"' + wer + '","Runter","' + modus + '")', "↓");
	}
}

ElementMover.HandleTouchStart = function(event, canvas){
	event.preventDefault();
	const touch = event.touches[0];
	const mouseX = touch.clientX - canvas.offsetLeft;
	const mouseY = touch.clientY - canvas.offsetTop;
	ElementMover.TouchStartPoint.x = mouseX;
	ElementMover.TouchStartPoint.y = mouseY;
}

ElementMover.HandleTouchMove = function(event, canvas){
	event.preventDefault();
	const touch = event.touches[0];
	const mouseX = touch.clientX - canvas.offsetLeft;
	const mouseY = touch.clientY - canvas.offsetTop;
	const point = [mouseX, mouseY]
	return point;
}

ElementMover.HandleTouchEnd = function(event){
	if(ElementMover.TeileModus == "Bestandteil"){
		const plane = CB.BildEbenen.Selected.Element;
		const levelNr = CB.BildEbenen.Selected.Index;
		const imageId = "Bild" + levelNr + plane;
		CB.Elemente.Machen(imageId, plane, levelNr, ElementMover.AktuellerElementeArray, ElementMover.TeileModus);
		if(CB.Elemente.Selected.Index !== null){
			$(plane + levelNr + "CanvasElement" + CB.Elemente.Selected.Index).style.border = "0.2vh solid red";
		}
	}else
	if(ElementMover.TeileModus == "Stempel"){
		const imageId = "Stempel" + CB.Stempel.Selected.Index;
		CB.Elemente.Machen("Stempel", "Stempel", CB.Stempel.Selected.Index, ElementMover.AktuellerElementeArray, ElementMover.TeileModus);
		if(CB.Elemente.Selected.Index !== null){
			$(imageId + 'CanvasElement' + CB.Elemente.Selected.Index).style.border = "0.2vh solid red";
		}
	}
}

ElementMover_Canvas.addEventListener('touchstart', function(event) {
	ElementMover.HandleTouchStart(event, ElementMover_Canvas);
});

ElementMover_Canvas.addEventListener('touchmove', function(event) {
	const point = ElementMover.HandleTouchMove(event, ElementMover_Canvas);
	if (CB.Elemente.Selected.Element != null) {
		ElementMover.TransformSelectedElement(point[0], point[1], "Position");
	}
});

ElementMover_Canvas.addEventListener('touchend', function(event) {
	ElementMover.HandleTouchEnd(event);
});

ElementMover.TransformSelectedElement = function(currentX, currentY, changeMode, datenNr) {
    const deltaX = currentX - ElementMover.TouchStartPoint.x;
    const deltaY = currentY - ElementMover.TouchStartPoint.y;
    const ausgesuchtesElementArray = ElementMover.AktuellerElementeArray[CB.Elemente.Selected.Index];
    switch (changeMode) {
        case "Position":
	        ausgesuchtesElementArray[2] = parseInt(ausgesuchtesElementArray[2]) + deltaX;
	        ausgesuchtesElementArray[3] = parseInt(ausgesuchtesElementArray[3]) + deltaY;
            break;
        case "BorderWidth":
    		ausgesuchtesElementArray[datenNr] = parseInt(Math.abs(deltaX)/5);
            break;
        case "Spitzen":
            ausgesuchtesElementArray[datenNr] = parseInt(Math.abs(deltaX)/5);
            break;
        case "Breite":
        case "Hoehe":
        case "Radius":
            if (parseInt(ausgesuchtesElementArray[datenNr]) + deltaX > 0) {
                ausgesuchtesElementArray[datenNr] = parseInt(ausgesuchtesElementArray[datenNr]) + deltaX;
            }
            break;
        case "Rotation":
            const rotation = (deltaX / 200) * Math.PI;
            ausgesuchtesElementArray[datenNr] = rotation;
            break;
        case "ScaleX":
        case "ScaleY":
        case "SkewX":
        case "SkewY":
            const scaleFactor = (changeMode === "Rotation") ? 200 : 20000;
            const scaleValue = ausgesuchtesElementArray[datenNr] - (deltaX / scaleFactor);
            ausgesuchtesElementArray[datenNr] = scaleValue;
            break;
        default:
            break;
    }
    const ctx = ElementMover_Canvas.getContext('2d');
    ElementMover.DrawCanvas(ctx, ElementMover.TeileModus);
    if (changeMode !== "Spitzen" &&changeMode !== "BorderWidth" &&changeMode !== "Rotation" && changeMode !== "ScaleX" && changeMode !== "ScaleY" && changeMode !== "SkewX" && changeMode !== "SkewY") {
        ElementMover.TouchStartPoint.x = currentX;
        ElementMover.TouchStartPoint.y = currentY;
    }
};

ElementMover.DrawCanvas = function(ctx, modus){
	ctx.clearRect(0, 0 , faktuellerCharakter().Bild.Width, faktuellerCharakter().Bild.Height);
	if(modus == 'Bestandteil'){
		const ausgesuchtesBild = CB.BildEbenen.Selected.Element + CB.BildEbenen.Selected.Index;
		CB.CanvasElemente.Bauen(AktuelleCharakter, ausgesuchtesBild, ctx);
	}else
	if(modus == "Stempel"){
		for(let all in ElementMover.AktuellerElementeArray){
			const array = ElementMover.AktuellerElementeArray[all];
			const element = array[0];
			let textVary	=	"";
			for(let each in CB.Daten.SchummelArray[element]){
				if(each>0){
					textVary += "'" + array[each] + "'";
					if(each < CB.Daten.SchummelArray[element].length - 1){
						textVary += ",";
					}
				}
			}
			eval("CB.CanvasElemente[element](ctx," + textVary + ");");
		}
	}
};