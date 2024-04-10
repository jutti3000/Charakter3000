/* --- CB.ElementCreation ---*/

CB.ElementCreation = {};

CB.ElementCreation.Check = function(){
	if(ElementCreationContainer.style.display == "block"){
  	ElementCreationContainer.style.display = "none";
 	}else{
	 	ElementCreationContainer.style.display = "block";
 	}
}

CB.ElementCreation.Anzeigen = function(id, stelle, plane, levelNr, wer, modus){		
	$(id).style.display = "none"; // der Button wird noch wegen einem Bug ausgeblendet. 		
	ElementCreationContainer.style.display = "block";
	const containerId = 'ElementCreationContainerAnzeige';	
	const elementContainerId = containerId + "Container";
	const elementContainer = createDivElement(containerId, elementContainerId, containerId, ""); 	
	 	const creationData = CB.Daten.Struktur[CB.Elemente.WelchesElementSollGemachtWerden];
	 	const creationElements = creationData.WelcheGibtEs;
	 	for (let elementNr in creationElements) {
		 	const was = creationElements[elementNr][0];
		 	const elementCreationData = creationData.ElementErstellen[was];
		 	const elementType = elementCreationData.Type;
		 	const elementValue = elementCreationData.Value;
		 	const elementOnchange = elementCreationData.Onchange;
		 	const elementOnclick = elementCreationData.Onclick;
		 	const id = containerId + was;
		 	const p = document.createElement(elementType);
		 	p.setAttribute('id', id);
		 	p.setAttribute('class', containerId + was + ' ' + CB.Elemente.WelchesElementSollGemachtWerden + was);
		 	if (elementValue !== "") {
		 		p.setAttribute('value', elementValue);
		 	}
		 	if (elementOnchange !== "") {
		 		p.setAttribute('onchange', elementOnchange);
		 	}
		 	if (elementOnclick !== "") {
			 	p.setAttribute('onclick', elementOnclick);
		 	}
		 	$(elementContainerId).appendChild(p);
		 	const elementEigenHTML = elementCreationData.EigenHTML;
		 	if (elementEigenHTML !== "") {
		 		$(id).innerHTML = elementEigenHTML;
		 	}
	 	}
	createImageElement(elementContainerId, containerId + 'ZwischenZeichnung', containerId + 'ZwischenZeichnung', 'img');
	createButtonElement(elementContainerId, containerId + 'MachDas', containerId + 'MachDas', `CB.ElementCreation.NeuesElementMachen(this.id, ${stelle}, "${plane}", ${levelNr}, "${wer}", "${modus}")`, 'In dieser Ebene erstellen');
	if(modus == "Bestandteil"){
		createButtonElement(elementContainerId, containerId + 'MachDasFuerAlleEbenen', containerId + 'MachDasFuerAlleEbenen', `CB.ElementCreation.NeuesElementMachenFuerAlleEbenen(this.id, ${stelle}, "${plane}", ${levelNr}, "${wer}")`, 'In allen Ebenen erstellen');
	}
	CB.ElementCreation.ZwischenzeichnungMachen();
}

CB.ElementCreation.ZwischenzeichnungMachen = function(){
	const canvasId = 'ElementCreationZwischenZeichnungCanvas';
	const existingCanvas = $(canvasId);
	if (!existingCanvas) {
	  		const canvas = document.createElement('canvas');
	  		canvas.setAttribute('id', canvasId);
	  		canvas.setAttribute('class', 'bild');
	  		$('Bilder').appendChild(canvas);
	}
	const width = faktuellerCharakter().Bild.Width;
	const height = faktuellerCharakter().Bild.Height;
	const canvas = $(canvasId);
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext('2d');
	const element = ElementCreationContainerAnzeigeElement.value;
	if (element == "Stempel") {
	  		const welcheNummer = "";
	  		const idWert = ElementCreationContainerAnzeigeIdWert.value;
	  		const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	  		for (let stempelNr in stempelArray) {
		  		if (stempelArray[stempelNr][0] == idWert) {
			  		const stempelElemente = stempelArray[stempelNr][1];
			  		for (let index = 0; index < stempelElemente.length; index++) {
				  		const stempelElement = stempelElemente[index];
				  		const elementType = stempelElement[0];
				  		const args = stempelElement.slice(1);
				  		CB.CanvasElemente[elementType].apply(null, [context].concat(args));
			  		}
			  		break;
		  		}
		}
	}else{
		let textVary = "";
		const position = ElementCreationContainerAnzeigePositionWert.value;
		const elementData = CB.Daten.SchummelArray[element];
	  		for(let dataNr in elementData){
		  		if(dataNr > 0){
		  			const inputId = 'ElementCreationContainerAnzeige' + elementData[dataNr][0];
		  			const propValue = $(inputId).value;
		  			textVary += "'" + propValue + "'";
		  			if(dataNr < elementData.length - 1){
		  				textVary += ",";
		  			}
		  		}
	  		}
	  		eval("CB.CanvasElemente[element](context," + textVary + ");");
	}
	ElementCreationContainerAnzeigeZwischenZeichnung.src = canvas.toDataURL();
}

CB.ElementCreation.NeuesElementMachen = function(id, stelle, plane, levelNr, wer, modus) {
  	ElementCreationContainer.style.display = "none";
  	const neuesElement = [];
  	const element = ElementCreationContainerAnzeigeElement.value;
  	const position = ElementCreationContainerAnzeigePositionWert.value;
  	let zielArray;
  	if (modus === "Bestandteil") {
	  	zielArray = faktuellerCharakter()[plane + levelNr].CanvasElemente.Alle;
  	} else if (modus === "Stempel") {
	  	zielArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1];
  	}
		for (const [propName, label] of CB.Daten.SchummelArray[element]) {
	  	const inputId = 'ElementCreationContainerAnzeige' + propName;
	  	const propValue = $(inputId).value;
	  	neuesElement.push(propValue);
  	}
  	zielArray.splice(position, 0, neuesElement);
  	if (modus === "Bestandteil") {
	  	CB.CanvasElemente.MalDieBilder([plane, levelNr]);
  	} else if (modus === "Stempel") {
	  	CB.CanvasElemente.MalDieBilder("Alle");
  	}
  	CB.BildEbenen.ZeigDasBild(wer, plane, levelNr, modus);
}

CB.ElementCreation.NeuesElementMachenFuerAlleEbenen = function(id, stelle, plane, levelNr, wer) {
	ElementCreationContainer.style.display = "none";
	for (let bildNr = 0; bildNr < faktuellerCharakter().Bild.Anzahl; bildNr++) {
		const zielArray = faktuellerCharakter()[plane + bildNr].CanvasElemente.Alle;
		const element = ElementCreationContainerAnzeigeElement.value;
		const position = ElementCreationContainerAnzeigePositionWert.value;
		const neuesElement = [];
		for (const [propName, label] of CB.Daten.SchummelArray[element]) {
			const inputId = 'ElementCreationContainerAnzeige' + propName;
			const propValue = $(inputId).value;
			neuesElement.push(propValue);
		}
		zielArray.splice(position, 0, neuesElement);
	}
	CB.CanvasElemente.MalDieBilder("Alle");
	CB.BildEbenen.ZeigDasBild(wer, plane, levelNr, "Bestandteil");
}