CB.Stempel = {
	Selected : {
		Index : null,
		Element :null
	},
	
  	Init : function(wer) {
	  	const stempel = CB.GegnerSchablone[wer].Stempel.WelcheGibtEs;
	  	for (const entry of stempel) {
		  	const [stempelName, stempelWert] = entry;
		  	CB.GegnerSchablone[wer].Stempel[stempelName] = stempelWert;
	  	}
  	},
	Check : function(){
	 	if(StempelContainer_MainContainer.style.display == "block"){
	 		StempelContainer_MainContainer.style.display = "none";
	 	//	CB.Stempel.Selected.Index = null;
	 	//	CB.Stempel.Selected.Element = null;
	 		StempelContainer_NameAendernInput.value = "";
	 		StempelContainer_NameAendernInput.style.display = "none";
	 		StempelContainer_DieseStempelLoeschenButton.style.display = "none";
	 		StempelContainer_DieseStempelBearbeitenButton.style.display = "none";
	 		StempelContainer_DieseStempelDuplizierenButton.style.display = "none";
	 		StempelContainer_CanvasAnzeigeGross.style.display = "none";
	 	}else{
			StempelContainer_MainContainer.style.display = "block";
			CB.Stempel.Anzeigen();
	 	}
	},
 	ElementZuStempel : function(id,stelle,plane,levelNr,wer){
 		const stempelInhalt = faktuellerCharakter()[plane + levelNr].CanvasElemente.Alle;
		const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
		const neueStempelId = OptionsContainerAnzeigeElementZuStempelId.value;
		for(let stempelNr in stempelArray){
			if(stempelArray[stempelNr][0] == neueStempelId){
				SagDas("Dieser Stempelname ist schon vergeben. Such einen anderen Namen aus.");
				return;
			}
		}
		stempelArray[stempelArray.length] = [neueStempelId, stempelInhalt];
		CB.CanvasElemente.StempelInit();
		SagDas(neueStempelId + " wurde als Stempel hinzugefuegt.");
 	},
	NeuerStempelContainerCheck : function(){
		if(StempelContainer_NeueStempelContainer.style.display == "block"){
		 	StempelContainer_NeueStempelContainer.style.display = "none";
		}else{
		 	StempelContainer_NeueStempelContainer.style.display = "block";
		}
	},
	Auswaehlen : function(element, stempelNrVary) {
	  	for (let stempelNr in faktuellerCharakter().Stempel.WelcheGibtEs) {
		  	const welchesElement2 = 'StempelContainer_AnzeigeStempel' + stempelNr;
		  	$(welchesElement2).style.border = "0.2vh solid black";
	  	}
	  	element.style.border = "0.2vh solid red";
	  	CB.Stempel.Selected.Index = stempelNrVary;
	  	CB.Stempel.Selected.Element = element;
	  	if (CB.Stempel.Selected.Element != null) {
		  	const idVary = $('StempelContainer_AnzeigeStempel' + stempelNrVary + 'id').innerHTML;
		  	StempelContainer_NameAendernInput.value = idVary;
		  	StempelContainer_NameAendernInput.style.display = "block";
		  	StempelContainer_DieseStempelLoeschenButton.style.display = "block";
		  	StempelContainer_DieseStempelBearbeitenButton.style.display = "block";
		  	StempelContainer_DieseStempelDuplizierenButton.style.display = "block";
		  	StempelContainer_CanvasAnzeigeGross.style.display = "block";
		  	const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs[CB.Stempel.Selected.Index];
		  	const width = faktuellerCharakter().Bild.Width;
		  	const height = CB.GegnerSchablone[AktuelleCharakter].Bild.Height;
		  	const canvas = $("StempelContainer_CanvasAnzeigeGross");
		  	canvas.width = width;
		  	canvas.height = height;
		  	const ctx = canvas.getContext('2d');
		  	CB.CanvasElemente["Stempel"](ctx, stempelArray[0], 0, 0, 1, 1, 0, 0, 0);
	  	}
	},
	Anzeigen : function(){
	    const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	    StempelContainer_AlleStempelContainer.innerHTML = "";
	    let nameVary = "";
	    if(CB.Stempel.Selected.Index !== null){
	        nameVary = stempelArray[CB.Stempel.Selected.Index][0];
	    }
	    stempelArray.sort();
	    for(const stempelNr in stempelArray){
		    const width = faktuellerCharakter().Bild.Width;
		    const height = faktuellerCharakter().Bild.Height;
	        const stempelElementArrayId = stempelArray[stempelNr][0];
	        const containerElementId = "StempelContainer_AlleStempelContainer";
	        const stempelElementContainerId = 'StempelContainer_AnzeigeStempel' + stempelNr;
	        const stempelElementContainer = createButtonElement(containerElementId, stempelElementContainerId, 'StempelContainerAnzeigeStempelContainer', 'CB.Stempel.Auswaehlen(this,'+stempelNr+')', "");
	        const stempelElementIdAnzeige = createDivElement(stempelElementContainerId, stempelElementContainerId + 'id', 'StempelContainerAnzeigeStempelContainerId', stempelElementArrayId);
	        const stempelElementThumpnail = createCanvasElement(stempelElementContainerId, stempelElementContainerId + 'Canvas', 'StempelContainerAnzeigeStempelContainerCanvas', width, height);
	        const canvas = stempelElementThumpnail;
	        CB.Stempel.ThumpnailMachen(canvas, width, height, stempelElementArrayId);
	        if(stempelElementArrayId === nameVary){
	            CB.Stempel.Selected.Index = stempelNr;
	            CB.Stempel.Selected.Element = $(stempelElementContainerId);
	        }
	    }
	},
	ThumpnailMachen : function(canvas, width, height, stempelId){
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		CB.CanvasElemente["Stempel"](ctx, stempelId, 0, 0, 1, 1, 0, 0, 0);
	},
	Duplizieren : function(){
		const index = CB.Stempel.Selected.Index;
		const stempelArray = CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs;
		const aktuellerStempel = stempelArray[index];
		const alterStempelName = aktuellerStempel[0];
		const neuerStempelName = alterStempelName + "Kopie";
		for(let stempelNr in stempelArray){
			if(neuerStempelName == stempelArray[stempelNr][0]){
				SagDas("Dieser Name ist schon vergeben. Aender den Namen der Ursprungskopie.");
				return;
			}
		}
		let elemente = [];
		for(let elementNr in aktuellerStempel[1]){
			elemente[elemente.length] = aktuellerStempel[1][elementNr];
		}
		const neuerStempel = [neuerStempelName, elemente];
		stempelArray.splice(parseInt(index)+1, 0, neuerStempel);
		CB.CanvasElemente.StempelInit();
		CB.Stempel.Anzeigen();
		CB.Stempel.Auswaehlen($("StempelContainer_AnzeigeStempel" + index), index);
		CB.Elemente.TauschDenStempelAus.SelectFeldOptionenErstellen();
	},
	Bearbeiten : function(stelle, plane, levelNr, wer) {
	    if (typeof stelle === "number") {
	        const canvasElemente = CB.GegnerSchablone[AktuelleCharakter][plane + levelNr].CanvasElemente.Alle;
	        const stempelName = canvasElemente[stelle][1];
	        const stempelArray = CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs;
	        for (let index in stempelArray) {
	            if (stempelArray[index][0] === stempelName) {
		            CB.Elemente.Selected.Index = null;
		            CB.Elemente.Selected.Element = null;
	                CB.Stempel.Selected.Index = index;
	                CB.Stempel.Selected.Element = "Stempel" + index;
	            }
	        }
	    } else {
	        CB.Stempel.Check();
	    }
	    CB.BildEbenen.ZeigDasBild("Stempel" + CB.Stempel.Selected.Index, "Stempel"+ CB.Stempel.Selected.Index, CB.Stempel.Selected.Index, "Stempel");
	    AktuelleBildAuswahl.style.border = "0.3vh solid red";
	    CB.Elemente.Machen("Stempel", "Stempel", CB.Stempel.Selected.Index, CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs[CB.Stempel.Selected.Index][1], "Stempel");
	},
	Loeschen : function() {
	    const nameZuLoeschen = StempelContainer_NameAendernInput.value;
	    let elementBeispiel = "";
	    let darfGeloeschtWerden = true;
	    Object.values(CB.GegnerSchablone[AktuelleCharakter].WelcheGibtEs).some(function(array) {
	        const name = array[0];
	        return Object.values(CB.GegnerSchablone[AktuelleCharakter][name].CanvasElemente.Alle).some(function(elementArray) {
	            return elementArray.some(function(element) {
	                if (element === nameZuLoeschen) {
	                    darfGeloeschtWerden = false;
	                    elementBeispiel += " " + array[1] + ",";
	                    return true;
	                }
	                return false;
	            });
	        });
	    });
	    elementBeispiel += "...";
	    if (!darfGeloeschtWerden) {
	        SagDas("Dieser Stempel kann nicht gelöscht werden, da er noch von Elementen verwendet wird. Zum Beispiel:" + elementBeispiel);
	        return;
	    }
	    CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs.splice(CB.Stempel.Selected.Index, 1);
	    CB.Stempel.Selected.Index = null;
	    CB.Stempel.Selected.Element = null;
	    StempelContainer_NameAendernInput.value = "";
	    StempelContainer_DieseStempelLoeschenButton.style.display = "none";
	    StempelContainer_DieseStempelBearbeitenButton.style.display = "none";
	    StempelContainer_DieseStempelDuplizierenButton.style.display = "none";
	    StempelContainer_CanvasAnzeigeGross.style.display = "none";
	    StempelContainer_NameAendernInput.style.display = "none";
	    CB.Stempel.Anzeigen();
	},
	NameAendern : function() {
	    const zielArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	    const neuerName = StempelContainer_NameAendernInput.value;
	    const stempelIndex = CB.Stempel.Selected.Index;
	    const alterNameVary = zielArray[stempelIndex][0];
	    if (zielArray.some(stempel => stempel[0] === neuerName)) {
	        SagDas("Dieser Name ist schon vergeben. Suche einen anderen Namen aus.");
	        StempelContainer_NameAendernInput.value = alterNameVary;
	        return;
	    }
	    for (let [name, element] of Object.entries(faktuellerCharakter())) {
	        if (element.CanvasElemente && element.CanvasElemente.Alle) {
	            for (let unterElement of element.CanvasElemente.Alle) {
	                for (let index in unterElement) {
	                    if (unterElement[index] === alterNameVary) {
	                        unterElement[index] = neuerName;
	                    }
	                }
	            }
	        }
	    }
	    zielArray[stempelIndex][0] = neuerName;
	    CB.Stempel.Init(AktuelleCharakter);
	    CB.CanvasElemente.StempelInit();
	    CB.Stempel.Anzeigen();
	    CB.Stempel.Selected.Element = $("StempelContainer_AnzeigeStempel" + stempelIndex);
	    CB.Stempel.Auswaehlen(CB.Stempel.Selected.Element, stempelIndex);
	},
	Erstellen : function(){
	    const nameVary = StempelContainer_NeueStempelNameInput.value;
	    let darfDerNameVerwendetWerden = true;
	    CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs.forEach(farbArray => {
	        if(nameVary === farbArray[0]){
	            darfDerNameVerwendetWerden = false;
	        }
	    });
	    if(darfDerNameVerwendetWerden){
	        CB.Stempel.NeuerStempelContainerCheck();
	        const arrayVary = [nameVary, []];
	        CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs.unshift(arrayVary);
	        CB.Stempel.Init(AktuelleCharakter);
	        CB.CanvasElemente.StempelInit();
	        CB.Stempel.Anzeigen();
	        CB.Elemente.TauschDenStempelAus.SelectFeldOptionenErstellen();
	    } else {
	        SagDas(nameVary + " ist schon vergeben. Suche einen anderen Namen aus.");
	    }
	}
}