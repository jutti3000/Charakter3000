/* --- CB.Elemente ---*/

CB.Elemente = {};

CB.Elemente.WelchesElementSollGemachtWerden = "FarbEllipse";
CB.Elemente.WelcheElementeWurdenErstellt = [];
CB.Elemente.Selected = {};
CB.Elemente.Selected.Index = null;
CB.Elemente.Selected.Element = null;

CB.Elemente.AenderDenWert = (value, stelle, stelle2, plane, levelNr, modus) => {
 	if (modus === "Bestandteil") {
 		const elementeArray = faktuellerCharakter()[plane + levelNr].CanvasElemente.Alle;
	  	elementeArray[stelle][stelle2] = value;
	  	const imageId = "Bild" + levelNr + plane;
	  	CB.Elemente.Machen(imageId, plane, levelNr, elementeArray, modus);
	  	CB.CanvasElemente.MalDieBilder([plane, levelNr]);
	  	CB.BildEbenen.ZeigDasBild(imageId, plane, levelNr, modus);
  	} else if (modus === "Stempel") {
  		const aktuellerStempelArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index];
  		const stempelName = aktuellerStempelArray[0];
  		const stempelData = aktuellerStempelArray[1];
	  	stempelData[stelle][stelle2] = value;
	  	const imageId = "Stempel" + CB.Stempel.Selected.Index;
	  	CB.Elemente.Machen(imageId, plane, levelNr, stempelData, modus);
	  	CB.CanvasElemente.StempelAktualisieren(stempelName, stempelData);
	  	CB.CanvasElemente.MalDieBilder("AlleWoDerStempelIst", stempelName);
	  	CB.BildEbenen.ZeigDasBild(imageId, plane, levelNr, modus);
  	}
};

CB.Elemente.Verschieben = function(id, stelle, plane, levelNr, wer, richtung, modus){
	let elementeArray;
	if(modus == "Bestandteil"){
		elementeArray = faktuellerCharakter()[plane + levelNr].CanvasElemente.Alle;
	}else
	if(modus == "Stempel"){
		elementeArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1];
	}
	const merkVary = elementeArray[stelle];
	let neueStelle;
	elementeArray.splice(stelle, 1);
	if(richtung == "Hoch"){
		elementeArray.splice(stelle - 1, 0, merkVary);
		neueStelle = stelle - 1;
	}else
	if(richtung == "Runter"){
		elementeArray.splice(stelle + 1, 0, merkVary);
		neueStelle = stelle + 1;
	}
	if(ElementMover.Status == false){
		if(modus == "Bestandteil"){
			CB.CanvasElemente.MalDieBilder([plane, levelNr]);
		}else
		if(modus == "Stempel"){
			const aktuellerStempelArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index];
			const stempelName = aktuellerStempelArray[0];
			CB.CanvasElemente.StempelAktualisieren(stempelName);
			CB.CanvasElemente.MalDieBilder("AlleWoDerStempelIst", faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][0]);
		}
	}
	CB.BildEbenen.ZeigDasBild(wer, plane, levelNr, modus);
  	if(modus == "Bestandteil"){
  		CB.Elemente.Auswaehlen(id, neueStelle, plane, levelNr, wer, neueStelle, modus);
  	}
  	if(modus == "Stempel"){
  		const stempelElementId = "Stempel" + CB.Stempel.Selected.Index + "CanvasElement" + neueStelle;
 	 	CB.Elemente.Auswaehlen(stempelElementId, neueStelle, plane, levelNr, wer, neueStelle, modus);
  	}
  	if(ElementMover.Status == true){
  		ElementMover.DrawCanvas(ElementMover_Canvas.getContext('2d'), modus);
  		ElementMover.ManipulationsFelderErstellen(modus);
  	}
}

CB.Elemente.Loeschen = function(id, stelle, plane, levelNr, wer, modus){
	let elementeArray;
	if(modus == "Bestandteil"){
		elementeArray = faktuellerCharakter()[plane+levelNr].CanvasElemente.Alle;
	}else
	if(modus == "Stempel"){
		elementeArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1];
	}
	elementeArray.splice(stelle, 1);
	if(modus == "Bestandteil"){
		CB.CanvasElemente.MalDieBilder([plane, levelNr]);
	}else
	if(modus == "Stempel"){
		CB.CanvasElemente.MalDieBilder("AlleWoDerStempelIst", faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][0]);
	}
	CB.BildEbenen.ZeigDasBild(wer, plane, levelNr, modus);
};

CB.Elemente.Duplizieren = function(id, stelle, plane, levelNr, wer, modus){
	let elementeArray;
	if(modus == "Bestandteil"){
		elementeArray = faktuellerCharakter()[plane+levelNr].CanvasElemente.Alle;
	}else
	if(modus == "Stempel"){
		elementeArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1];
	}
	let arrayVary = [];
	for(all in elementeArray[stelle]){
		arrayVary[arrayVary.length] = elementeArray[stelle][all];
	}
	elementeArray.splice(stelle, 0, arrayVary);
	if(modus == "Bestandteil"){
		CB.CanvasElemente.MalDieBilder([plane, levelNr]);
	}else
	if(modus == "Stempel"){
		CB.CanvasElemente.MalDieBilder("AlleWoDerStempelIst", faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][0]);
	}
	CB.BildEbenen.ZeigDasBild(wer, plane, levelNr, modus);
};

CB.Elemente.Auswaehlen = function(id, stelle, plane, levelNr, wer, neueStelle, modus) {
//alert(id)
	CB.Elemente.Selected.Element = id;
	CB.Elemente.Selected.Index = neueStelle;
	ElementMover.EinElementWurdeAusgewaehlt();
  	AktuelleBildAuswahl.style.border = "0.3vh solid black";
  	let elementeArray;
  	if (modus === "Bestandteil") {
 	 	elementeArray = faktuellerCharakter()[plane + levelNr].CanvasElemente.Alle;
  	} else if (modus === "Stempel") {
 	 	elementeArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1];
  	}
  	ElementCreationContainer.style.display = "none";
  	for (let elementId of CB.Elemente.WelcheElementeWurdenErstellt) {
	  	$(elementId).style.border = "0.2vh solid black";
  	}
  	if (typeof neueStelle === "number") {
	  	if(modus ==="Bestandteil") {
		  	$(plane + levelNr + "CanvasElement" + neueStelle).style.border = "0.2vh solid red";
	  	}else
	  	if(modus ==="Stempel") {
		  	$(id).style.border = "0.2vh solid red";
	  	}
	  	stelle = neueStelle;
	} else {
	  	$(id).style.border = "0.2vh solid red";
  	}
	OptionsContainerId.innerHTML = id;
  	OptionsContainerAnzeige.innerHTML = "";
  	ElementCreationContainerAnzeige.innerHTML = "";
  	const containerId = "OptionsContainerAnzeige";
   	let id2 = containerId + 'Loeschen';
  	createButtonElement(containerId, id2, id2, 'CB.Elemente.Loeschen(this.id,' + stelle + ',"' + plane + '",' + levelNr + ',"' + wer + '","' + modus + '")', "Dieses Element Löschen");
	id2 = containerId + 'DiesesElementDuplizieren';
	createButtonElement(containerId, id2, id2, 'CB.Elemente.Duplizieren(this.id,' + stelle + ',"' + plane + '",' + levelNr + ',"' + wer + '","' + modus + '")', "Element duplizieren"); 	
  	id2 = containerId + 'ElementMoverOeffnenButton';
  	createButtonElement(containerId, id2, id2, 'ElementMover.Check("' + modus + '")', "ElementMover Oeffnen");
  	
  
  	
  	if (stelle > 0) {
	  	id2 = containerId + 'Hoch';
	  	createButtonElement(containerId, id2, id2, 'CB.Elemente.Verschieben("' + id + '",' + neueStelle + ',"' + plane + '",' + levelNr + ',"' + wer + '","Hoch","' + modus + '")', "↑");
  	}
  	if (stelle < CB.Elemente.WelcheElementeWurdenErstellt.length - 1) {
	  	id2 = containerId + 'Runter';
	  	createButtonElement(containerId, id2, id2, 'CB.Elemente.Verschieben("' + id + '",' + neueStelle + ',"' + plane + '",' + levelNr + ',"' + wer + '","Runter","' + modus + '")', "↓");
  	}
  	if (elementeArray[stelle][0] === "Stempel") {
	  	id2 = 'CB.Stempel.Selected.Element';
	  	createButtonElement(containerId, id2, containerId + 'DiesenStempelBearbeiten', 'CB.Stempel.Bearbeiten(' + stelle + ',"' + plane + '",' + levelNr + ',"' + wer + '")', "Stempel Bearbeiten");
  	}
}

CB.Elemente.ElementAendern = function(wer){
	CB.Elemente.WelchesElementSollGemachtWerden = wer.value;
}

CB.Elemente.Machen = function(wer, plane, levelNr, array, modus) {
	const canvasElementContainer = document.getElementById('CanvasElementContainer');
	canvasElementContainer.innerHTML = "";
	if (plane !== "") {
		CB.Elemente.WelcheElementeWurdenErstellt = [];
		array.forEach((element, all) => {
			let canvasElementId;
			if(modus === "Bestandteil"){
				canvasElementId = plane + levelNr + 'CanvasElement' + all;
			}else
			if(modus === "Stempel"){
				canvasElementId = "Stempel" + CB.Stempel.Selected.Index + 'CanvasElement' + all;
			}
			const canvasElement = document.createElement('div');
			canvasElement.setAttribute('id', canvasElementId);
			canvasElement.setAttribute('class', 'BildCanvasElementContainer');
			canvasElement.setAttribute('onclick', `CB.Elemente.Auswaehlen('${canvasElementId}', ${all}, '${plane}', ${levelNr}, '${wer}', ${all}, '${modus}')`);
			canvasElement.style.top = (103 * all) + 13 + "px";
			canvasElementContainer.appendChild(canvasElement);
			CB.Elemente.WelcheElementeWurdenErstellt[CB.Elemente.WelcheElementeWurdenErstellt.length]=canvasElementId;
			const welcherTyp = element[0];
			element.forEach((value, each) => {
				const inputId = `CanvasElement${all}_${each}`;
				const input = document.createElement('input');
				input.setAttribute('id', inputId);
				input.setAttribute('class', `BildCanvasElementInput ${welcherTyp}BildCanvasElement${CB.Daten.SchummelArray[welcherTyp][each][0]}`);
				input.setAttribute('value', value);
				if (welcherTyp !== "Stempel" || CB.Daten.SchummelArray[welcherTyp][each][1] !== "Id") {
					input.addEventListener('change', () => CB.Elemente.AenderDenWert(input.value,  all,  each,  plane, levelNr, modus));							
				}else{
					input.setAttribute('onclick', 'CB.Elemente.TauschDenStempelAus.Anzeigen("' + array[all][each] + '")');
					CB.Elemente.TauschDenStempelAus.SelectFeldOptionenErstellen();
					TauschDenStempelAusButton.onclick=function(){CB.Elemente.TauschDenStempelAus.Machen(all, each, plane, levelNr, modus, wer)};
				}
				const labelId = `CanvasElement${all}_${each}Lable`;
				const label = document.createElement('div');
				label.setAttribute('id', labelId);
				label.setAttribute('class', `BildCanvasElementInputLable ${welcherTyp}BildCanvasElement${CB.Daten.SchummelArray[welcherTyp][each][0]}Lable`);
				if (welcherTyp !== "Stempel" || CB.Daten.SchummelArray[welcherTyp][each][1] !== "Id") {
					label.addEventListener('click', () => document.getElementById(inputId).select());
				}
				label.innerHTML = CB.Daten.SchummelArray[welcherTyp][each][1];
				canvasElement.appendChild(input);
				canvasElement.appendChild(label);
			});
			const canvasElementBildContainer = document.createElement('div');
			canvasElementBildContainer.setAttribute('class', 'BildCanvasElementBild');
			canvasElement.appendChild(canvasElementBildContainer);
			const canvasElementBildContainerCanvas = document.createElement('canvas');
			canvasElementBildContainerCanvas.setAttribute('class', 'bild');
			canvasElementBildContainer.appendChild(canvasElementBildContainerCanvas);
			const ctx = canvasElementBildContainerCanvas.getContext('2d');
			const width = faktuellerCharakter().Bild.Width;
			const height = faktuellerCharakter().Bild.Height;
			canvasElementBildContainerCanvas.width = width;
			canvasElementBildContainerCanvas.height = height;
			const elementName = element[0];
			if (CB.CanvasElemente.hasOwnProperty(elementName)) {
				CB.CanvasElemente[elementName](ctx, ...element.slice(1));
			}
			const canvasElementBildContainerImage = document.createElement('img');
			canvasElementBildContainerImage.setAttribute('class', 'bildAuto');
			canvasElementBildContainer.appendChild(canvasElementBildContainerImage);
			canvasElementBildContainerImage.src = canvasElementBildContainerCanvas.toDataURL();
		});
	}
}

CB.Elemente.BildElementeLoeschenAbfrage = function() {
  	let text = "Willst du nur diese Stelle löschen?";
  	if (confirm(text)) {
  		CB.Elemente.BildElementeLoeschen("Stelle");
  	} else {
  		text = "Willst du nur diese Reihe löschen?";
  		if (confirm(text)) {
			CB.Elemente.BildElementeLoeschen("Reihe");
		} else {
 		 	text = "Willst du wirklich alle Elemente löschen?\nEs gibt noch keinen Undo-Button.";
  			if (confirm(text)) {
  				CB.Elemente.BildElementeLoeschen("Alle");
 		 	}
 	 	}
  	}
}

CB.Elemente.BildElementeLoeschen = function(modus) {
	const bildIndex = CB.BildEbenen.Selected.Index;
	const bildName = CB.BildEbenen.Selected.Element;
	  	if (modus === "Stelle" || modus === "Reihe") {
		  	if (bildName !== "") {
			  	const start = (modus === "Stelle") ? bildIndex : 0;
			  	const end = (modus === "Stelle") ? bildIndex + 1 : faktuellerCharakter().Bild.Anzahl;
			  	for (let j = start; j < end; j++) {
				  	faktuellerCharakter()[bildName + j].CanvasElemente.Alle = [];
			  	}
		  	}
		} else 
		if (modus === "Alle") {
			Object.values(faktuellerCharakter().WelcheGibtEs).forEach(array => {
		  		faktuellerCharakter()[array[0]].CanvasElemente.Alle = [];
		  	});
	}

	CB.CanvasElemente.MalDieBilder("Alle");
	CB.BildEbenen.ZeigDasBild(CB.BildEbenen.Selected.Wer, bildName, bildIndex, "Bestandteil");
}

CB.Elemente.TauschDenStempelAus = {}

CB.Elemente.TauschDenStempelAus.SelectFeldOptionenErstellen = function(){
	$('TauschDenStempelAusSelectFeld').innerHTML = "";
	const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	for(let stempel in stempelArray){
		const welcherStempelId = stempelArray[stempel][0];
		const id = 'TauschDenStempelAusSelectFeld';
		const id2 = 'CanvasElementOption' + stempel;
		const p = document.createElement('option');
		p.setAttribute('id', id2);
		p.setAttribute('value', welcherStempelId);
		$(id).appendChild(p);
		$(id2).innerHTML=welcherStempelId;
	}
}

CB.Elemente.TauschDenStempelAus.Machen = function(Nr, Nr2, plane, levelNr, modus, wer) {
  	const arrayAltername = faktuellerCharakter()[plane + levelNr].CanvasElemente.Alle;
  	const alterNameVary = arrayAltername[Nr][1];
  	const neuerStempelname = TauschDenStempelAusSelectFeld.value;
  	if (TauschDenStempelAusFuerAlleCheckbox.checked) {
		const charakter = faktuellerCharakter();
		for (const key in charakter.WelcheGibtEs) {
		    const array = charakter.WelcheGibtEs[key];
		    const nameVary = array[0];
		    for (const prop in charakter[nameVary].CanvasElemente.Alle) {
		        const array2 = charakter[nameVary].CanvasElemente.Alle[prop];
		        array2.forEach((value, index) => {
		            if (value === alterNameVary) {
		                array2[index] = neuerStempelname;
		            }
		        });
		    }
		}
	 	CB.CanvasElemente.MalDieBilder("AlleWoDerStempelIst", neuerStempelname);
	} else {
	  	arrayAltername[CB.Elemente.Selected.Index][1] = neuerStempelname;
	  	CB.CanvasElemente.MalDieBilder([plane, levelNr]);
  	} 	
  	CB.BildEbenen.ZeigDasBild(wer, plane, levelNr, modus);
  	$("TauschDenStempelAus").close();
}

CB.Elemente.TauschDenStempelAus.Anzeigen = function(stempelName){
	TauschDenStempelAusAlterName.innerHTML = stempelName;
	$("TauschDenStempelAus").show();
}
