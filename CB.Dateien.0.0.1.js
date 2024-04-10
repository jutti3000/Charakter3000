/* --- CB.Dateien ---*/

CB.Dateien = {};

CB.Dateien.Check = function(){
 	if(DateienContainer.style.display == "block"){
	  	DateienContainer.style.display = "none";
  	}else{
	 	DateienContainer.style.display = "block";
	 	CB.Dateien.Anzeigen();
 	}
}

CB.Dateien.Anzeigen = function() {
    DateinContainerAnzeige.innerHTML = "";
    for (let all in CB.GegnerSchablone.CharakterWelcheGibtEs) {
        let wer = CB.GegnerSchablone.CharakterWelcheGibtEs[all][0];
        let flaecheVary = CB.GegnerSchablone[wer].Bild.Width + "x" + CB.GegnerSchablone[wer].Bild.Height;
        let ebenenVary = CB.GegnerSchablone[wer].Bild.Anzahl;
        let containerId = 'DateinContainerAnzeigeElementContainer' + all;
        createButtonElement('DateinContainerAnzeige', containerId, 'DateinContainerAnzeigeElementContainer', 'CB.Dateien.CharakterAuswaehlen("' + wer + '")', "");
        createDivElement(containerId, containerId + 'id', 'DateinContainerAnzeigeElementContainerid', wer);
        createDivElement(containerId, containerId + 'Flaeche', 'DateinContainerAnzeigeElementContainerFlaeche', flaecheVary);
        createDivElement(containerId, containerId + 'Ebenen', 'DateinContainerAnzeigeElementContainerEbenen', ebenenVary);
    }
};

CB.Dateien.CharakterAuswaehlen = function(wer) {
  	CanvasElementContainer.innerHTML = "";
  	AM.Bildcounter = 0;
  	CB.AusgewaehlterCharakter = wer;
  	AktuelleCharakter = CB.AusgewaehlterCharakter;
  	CB.BildEbenen.Erstellen();
  	CB.GegnerSchablone.PatternErstellen();
  	CB.GegnerSchablone.FarbenErstellen();
  	CB.CanvasElemente.MalDieBilder("Alle");
  	CB.BildEbenen.ZeigDasBild("Bild0", "Kopf", 0, "Bestandteil");
  	CB.Dateien.Check();
  	CB.Farben.Initialisieren(AktuelleCharakter);
  	AM.Check();
  	window.setTimeout(() => {
  	AM.Check();
  	}, 100);
};