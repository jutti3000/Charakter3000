/* --- CB.BildEbenen ---*/

CB.BildEbenen = {};

CB.BildEbenen.Selected = {};
CB.BildEbenen.Selected.Index = null;
CB.BildEbenen.Selected.Element = null;
CB.BildEbenen.Selected.Wer = null;

CB.BildEbenen.ZeigDasBild = function(wer, plane, levelNr, modus){
	let elementeArray = null;
	CB.BildEbenen.Selected.Wer = wer;
	CB.BildEbenen.Selected.Element = plane;
	CB.BildEbenen.Selected.Index = levelNr;
	AktuelleBildAuswahl.style.border = "0.3vh solid black";
	ElementCreationContainer.style.display = "none";
	if(modus == "Stempel"){
		elementeArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1];
		OptionsContainerId.innerHTML = faktuellerCharakter().Stempel.WelcheGibtEs[levelNr][0];
	}else
	if(modus == "Bestandteil"){
		elementeArray = faktuellerCharakter()[plane + levelNr].CanvasElemente.Alle;
		OptionsContainerId.innerHTML = wer;
	}
	OptionsContainerAnzeige.innerHTML = "";
	ElementCreationContainerAnzeige.innerHTML = "";
	const containerId = "OptionsContainerAnzeige";
	if(plane != ""){
		const elementMoverOeffnen = createButtonElement(containerId, containerId + "ElementMoverOeffnenButton", containerId + "ElementMoverOeffnenButton", 'ElementMover.Check("' + modus + '")', "ElementMover Oeffnen");
		createButtonElement(containerId, containerId + "ElementHinzufuegenButton", containerId + "ElementHinzufuegenButton", 'CB.ElementCreation.Anzeigen("OptionsContainerAnzeigeElementHinzufuegenButton", ' + all + ', "' + plane + '", ' + levelNr + ', "' + wer + '", "' + modus + '")', "Element hinzufügen");
		if (modus === "Bestandteil") {
			createButtonElement(containerId, containerId + "ElementZuStempelButton", containerId + "ElementZuStempelButton nonSelect", 'CB.Stempel.ElementZuStempel("OptionsContainerAnzeigeElementZuStempelButton", ' + all + ', "' + plane + '", ' + levelNr + ', "' + wer + '")', "Element zu Stempel");
			createInputElement(containerId, containerId + "ElementZuStempelId", containerId + "ElementZuStempelId nonSelect", "text", "Stempel"+ faktuellerCharakter().Stempel.WelcheGibtEs.length);
		}
		createSelectElement(containerId, containerId + "ElementHinzufuegenSelectFeld", 'OptionsContainerAnzeigeElementHinzufuegenSelectFeld', 'CB.Elemente.ElementAendern(this)')
		for(typen in CB.Daten.Struktur.WelcheGibtEs){
			var elementTyp = CB.Daten.Struktur.WelcheGibtEs[typen];
			createOptionElement(containerId + "ElementHinzufuegenSelectFeld", containerId + "ElementHinzufuegenSelectFeld" + elementTyp, 'OptionsContainerAnzeigeElementHinzufuegenSelectFeldOption', elementTyp, elementTyp)
		}
		OptionsContainerAnzeigeElementHinzufuegenSelectFeld.value = CB.Elemente.WelchesElementSollGemachtWerden;
	}
	for(let teile in faktuellerCharakter().WelcheGibtEs){
		$(faktuellerCharakter().WelcheGibtEs[teile][1]).style.border = "0.3vh solid black";
	}
	for(let bildNr = 0; bildNr < faktuellerCharakter().Bild.Anzahl; bildNr++){
		$('Bild' + bildNr).style.border = "0.3vh solid black";
	}
	if(modus == "Bestandteil" || modus == "Gesamt"){
		$(wer).style.border = "0.3vh solid blue";
		AktuelleBildAuswahlBild.src = $(wer + "Bild").src;
	}else
	if(modus == "Stempel"){
		createCanvasElement('StempelCanvasElementContainer', 'StempelCanvasElement', 'bild', faktuellerCharakter().Bild.Width, faktuellerCharakter().Bild.Height);
		var canvas = $('StempelCanvasElement');
		canvas.width = faktuellerCharakter().Bild.Width;
		canvas.height = faktuellerCharakter().Bild.Height;
		var ctx = canvas.getContext('2d');
		const stempelName = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][0];
		ctx.drawImage($(stempelName + "Canvas"), 0, 0);

		AktuelleBildAuswahlBild.src = canvas.toDataURL();
	}
	AktuelleBildAuswahl.onclick = function(){
		CB.BildEbenen.ZeigDasBild(wer, plane, levelNr, modus);
		AktuelleBildAuswahl.style.border = "0.3vh solid red";
	};
	if(plane != ""){
		CB.Elemente.Machen(wer, plane, levelNr, elementeArray, modus);
	}else{
		CanvasElementContainer.innerHTML = "";
		OptionsContainerId.innerHTML = wer;
	}
}

CB.BildEbenen.Erstellen = function() {
  	$("BildEbenen_MainContainer").innerHTML = "";
  	const bildData = faktuellerCharakter().Bild;
  	const bildAnzahl = bildData.Anzahl;
  	const bildBestandteile = bildData.Bestandteile;
  	const gesamtHoehe = 55;
  	let teilHoehe = gesamtHoehe / bildAnzahl;
  	const gesamtBreite = 75;
  	let teilBreite = gesamtBreite / bildBestandteile.length;
   	if (bildAnzahl < 9) {
	  	teilHoehe = gesamtHoehe / 8;
	  	if (bildBestandteile.length <= 4) {
		  	teilBreite = gesamtBreite / 4;
	  	} else if (bildBestandteile.length > 4) {
		  	teilHoehe = teilBreite / 3;
	  	}
	} else if (bildAnzahl > 8) {
	  	if ((1 * 1 + teilBreite * 1) * bildBestandteile.length > gesamtBreite && (1 * 1 + teilHoehe * 1) * bildAnzahl < gesamtHoehe) {
		  	teilHoehe = teilBreite / 3;
	  	} else {
		  	teilBreite = teilHoehe * 3;
	  	}
  	}
  	for (let bildNr = 0; bildNr < bildAnzahl; bildNr++) {
	  	let bildId = "BildEbenen_MainContainer";
	  	let containerId = 'Bild' + bildNr;
	  	createButtonElement(bildId, containerId, 'BildKlasse', 'CB.BildEbenen.ZeigDasBild("' + containerId + '","", ' + bildNr + ', "Gesamt")', '');
	  	$(containerId).style.top = teilHoehe * bildNr + 1 + "%";
	  	$(containerId).style.left = "2%";
	  	$(containerId).style.width = teilBreite - 2 + "%";
	  	$(containerId).style.height = teilHoehe - 1 + "%";
	  	let imgId = 'Bild' + bildNr + 'Bild';
	  	let img = createImageElement(containerId, imgId, 'bild', '');
	  	for (let teilNr = 0; teilNr < bildBestandteile.length; teilNr++) {
		  	let teil = bildBestandteile[teilNr];
		  	let teilContainerId = 'Bild' + bildNr + teil;
		  	let onclick = 'CB.BildEbenen.ZeigDasBild("' + teilContainerId + '","' + teil + '", ' + bildNr + ', "Bestandteil")';
		  	createButtonElement(bildId, teilContainerId, 'BildKlasse', onclick, '');
		  	$(teilContainerId).style.top = teilHoehe * bildNr + 1 + "%";
		  	$(teilContainerId).style.left = teilBreite * teilNr + 22 + "%";
		  	$(teilContainerId).style.width = teilBreite - 2 + "%";
		  	$(teilContainerId).style.height = teilHoehe - 1 + "%";
		  	let teilImgId = 'Bild' + bildNr + teil + 'Bild';
		  	let teilImg = createImageElement(teilContainerId, teilImgId, 'bild', '');
	  	}
  	}
};

CB.BildEbenen.DefaultSelection = function(){
	CB.BildEbenen.Selected.Wer = "";
	CB.BildEbenen.Selected.Element = "Kopf";
	CB.BildEbenen.Selected.Index = 0;
	CB.BildEbenen.ZeigDasBild("Bild0","Kopf",0,"Bestandteil");
}