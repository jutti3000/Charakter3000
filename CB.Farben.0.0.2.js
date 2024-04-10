/* ---CB.Farben--- */

CB.Farben = {
	Selected : {
		Index : null,
		Element :null
	},
	AlleFarben :{},
	FarbFunktion : function(id,farbe){
  		this.id = id;
  		this.Farbe = farbe;
  		this.GibDieFarbeRaus = function(){
  			return(
  				farbe = faktuellerCharakter().Farben[id]
  			)
  		}
  	},
	Check : function(){	//	CB.Farben.Check
		if(FarbenContainer_MainContainer.style.display == "block"){
			CB.CanvasElemente.StempelInit();
			CB.CanvasElemente.MalDieBilder("Alle");
			CB.BildEbenen.DefaultSelection();
			FarbenContainer_FarbenAnzeigeContainer.style.display = "none";
			FarbenContainer_MainContainer.style.display = "none";
			CB.Farben.Selected.Index = null;
			CB.Farben.Selected.Element = null;
			FarbenContainer_NameAendernInput.value = "";
			FarbenContainer_DieseFarbeLoeschenButton.style.display = "none";
			FarbenContainer_DieseFarbeDuplizierenButton.style.display = "none";
			$("FS_MainContainer").close();
		}else{
			FarbenContainer_MainContainer.style.display = "block";
			CB.Farben.Anzeigen();
		}
	},
	Anzeigen : function(){	//	CB.Farben.Anzeigen
		let farbIndex = null;
		if(CB.Farben.Selected.Index !== null){
			farbIndex = CB.Farben.Selected.Index;
		}
		const farbenArray = faktuellerCharakter().Farben.WelcheGibtEs;
	    FarbenContainer_AlleFarbenContainer.innerHTML = "";
	    let farbenId = "";
	    if(farbIndex !== null){
	        farbenId = farbenArray[farbIndex][0];
	    }
	    farbenArray.sort();
	    for(const farbenNr in farbenArray){
	        if(farbenArray[farbenNr][0] === farbenId){
	            CB.Farben.Selected.Index = farbenNr;
	            CB.Farben.Selected.Element = $("FarbenContainer_Farbe" + farbenNr);
	        }
	    }
	    for(const farbNr in farbenArray){
	        const farbe = farbenArray[farbNr];
	        const containerId = "FarbenContainer_AlleFarbenContainer";
	        const containerElementId = "FarbenContainer_Farbe" + farbNr;
	        const containerElement = createButtonElement(containerId, containerElementId, 'FarbenAnzeigeContainer', 'CB.Farben.Auswaehlen(this,' + farbNr + ')', "");
	        const idElement = createDivElement(containerElementId, containerElementId + "id", 'FarbenAnzeigeContainerId', farbe[0]);
	        const valueElement = createDivElement(containerElementId, containerElementId + "Value", 'FarbenAnzeigeContainerValue', farbe[1]);
	        const canvasElement = createCanvasElement(containerElementId, containerElementId + "FarbAnzeige", 'FarbenAnzeigeContainerFarbAnzeige');
	        CB.Farben.Fuellungen.ZeigDieFuellungen(farbe, farbNr);
	    }
	    if(farbIndex !== null){
	        $("FarbenContainer_FarbThumpnail").src = $('FarbenContainer_Farbe' + farbIndex + 'FarbAnzeige').toDataURL();
	    }
	},
	Auswaehlen : function(element, farbNrVary) {
		FarbenContainer_FarbenAnzeigeContainer.style.display = "block";
		FarbenContainer_FuellungenBearbeitenContainer.style.display = "none";
		const farbenArray = faktuellerCharakter().Farben.WelcheGibtEs;
		const fuellungenArray = farbenArray[farbNrVary][2];
	  	FarbenContainer_FuellungenAnzeigeContainer.innerHTML = "";
	  	for (let fuellungNr in fuellungenArray) {
		  	const welchesElement = "FarbenContainer_FuellungenAnzeigeContainer";
		  	const welchesElement2 = 'Fuellung' + fuellungNr;
		  	createButtonElement(welchesElement, welchesElement2, 'fuellungContainer', 'CB.Farben.Fuellungen.BearbeitungsContainer.Init("' + welchesElement2 + '","' + farbNrVary + '","' + fuellungNr + '")', fuellungenArray[fuellungNr][0]);
	  	}
	  	for (let farbNr in farbenArray) {
		  	const welchesElement2 = 'FarbenContainer_Farbe' + farbNr;
		  	$(welchesElement2).style.border = "0.2vh solid black";
		  	if (farbNr == farbNrVary) {
		  		$(welchesElement2).style.border = "0.2vh solid red";
		  	}
	  	}
	  	if (typeof farbenArray[farbNrVary][2] == "object") {
		  	$("FarbenContainer_FuellungHinzufuegenEbeneInput").innerHTML = "";
		  	for (let fuellungNr = 0; fuellungNr <= fuellungenArray.length; fuellungNr++) {
			  	const welchesElement = "FarbenContainer_FuellungHinzufuegenEbeneInput";
			  	const welchesElement2 = "FarbenContainer_FuellungHinzufuegenEbeneInputOption" + fuellungNr;
			  	createOptionElement(welchesElement, welchesElement2, 'option', fuellungNr, fuellungNr);
		  	}
	  	}
	  	CB.Farben.Selected.Index = farbNrVary;
	  	CB.Farben.Selected.Element = element;
	  	const idVary = $('FarbenContainer_Farbe' + farbNrVary + 'id').innerHTML;
	  	FarbenContainer_NameAendernInput.value = idVary;
	  	const valueVary = $('FarbenContainer_Farbe' + farbNrVary + 'Value').innerHTML;
	  	FarbenContainer_ValueAendernInput.value = valueVary;
	  	$("FarbenContainer_FarbThumpnail").src = $('FarbenContainer_Farbe' + farbNrVary + 'FarbAnzeige').toDataURL();
	  	FarbenContainer_DieseFarbeLoeschenButton.style.display = "block";
	  	FarbenContainer_DieseFarbeDuplizierenButton.style.display = "block";
	},
	ValueAendern : function(){
		const farbIndex = CB.Farben.Selected.Index;
		const farbArray = faktuellerCharakter().Farben.WelcheGibtEs[farbIndex];
		const neuerValue = FarbenContainer_ValueAendernInput.value;
	 	farbArray[1] = neuerValue;
	 	CB.Farben.Initialisieren(AktuelleCharakter);
	 	CB.Farben.Anzeigen();
	 	CB.Farben.Selected.Element = $("FarbenContainer_Farbe" + farbIndex);
	 	CB.Farben.Auswaehlen(CB.Farben.Selected.Element, farbIndex);
	},
	NameAendern : function(){
		const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
		const bestandteile = faktuellerCharakter().WelcheGibtEs;
		const nameVary = FarbenContainer_NameAendernInput.value;
		const alterNameVary = faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][0];for (let farbNr in faktuellerCharakter().Farben.WelcheGibtEs) {
			let farbEintrag = faktuellerCharakter().Farben.WelcheGibtEs[farbNr];
	  		if (nameVary === farbEintrag[0]) {
		  		SagDas("Dieser Name ist bereits vergeben. Bitte wählen Sie einen anderen Namen.");
		  		return;
	  		}
		}
		for (let teilNr in bestandteile) {
		    var bestandteilId = bestandteile[teilNr][0];
		    const alleElemente = faktuellerCharakter()[bestandteilId].CanvasElemente.Alle;
		    for (let elementeNr in alleElemente) {
		        const einzelnesElement = alleElemente[elementeNr];
		        for (let index in einzelnesElement) {
		            const unterElement = einzelnesElement[index];
		            if (unterElement == alterNameVary) {
		                einzelnesElement[index] = nameVary;
		            }
		        }
		    }
		}
		for (let stempelNr in stempelArray) {
		    const stempelDetails = stempelArray[stempelNr][1];
		    for (let eigenschaft in stempelDetails) {
		        for (let index in stempelDetails[eigenschaft]) {
		            const aktuelleFarbe = stempelDetails[eigenschaft][index];
		            if (aktuelleFarbe == alterNameVary) {
		                stempelDetails[eigenschaft][index] = nameVary;
		            }
		        }
		    }
		}
		faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][0] = nameVary;
		CB.Farben.Initialisieren(AktuelleCharakter);
		CB.Farben.Anzeigen();
		CB.Farben.Selected.Element = $("FarbenContainer_Farbe"+CB.Farben.Selected.Index);
		CB.Farben.Auswaehlen(CB.Farben.Selected.Element,CB.Farben.Selected.Index);
	},
	Loeschen : function(){
	    const nameVary = FarbenContainer_NameAendernInput.value;
	    const farbenArray = faktuellerCharakter().Farben.WelcheGibtEs;
	    const farbeIndex = CB.Farben.Selected.Index;
	    const alterNameVary = farbenArray[farbeIndex][0];
	    let darfGeloeschtWerden = true;
	    let elementBeispielVary = "";
	    let stempelHTMLVary = "";
		for (let teilNr in faktuellerCharakter().WelcheGibtEs) {
		    const elementArray = faktuellerCharakter().WelcheGibtEs[teilNr];
		    const elementName = elementArray[0];
		    for (let elementIndex in faktuellerCharakter()[elementName].CanvasElemente.Alle) {
		        const einzelnesElementArray = faktuellerCharakter()[elementName].CanvasElemente.Alle[elementIndex];
		        for (let unterElementIndex in einzelnesElementArray) {
		            const unterElement = einzelnesElementArray[unterElementIndex];
		            if (unterElement === alterNameVary) {
		                darfGeloeschtWerden = false;
		                elementBeispielVary += " " + elementArray[1] + ",";
		            }
		        }
		    }
		}
	    elementBeispielVary += "...";
		if(darfGeloeschtWerden == true){
			if(alterNameVary == "Leer" || alterNameVary == "Weiss" || alterNameVary == "Schwarz"){
				darfGeloeschtWerden = false;
			}
		}
		for (let stempelNr in faktuellerCharakter().Stempel.WelcheGibtEs) {
		    const stempelDetails = faktuellerCharakter().Stempel.WelcheGibtEs[stempelNr][1];
		    for (let eigenschaft in stempelDetails) {
		        for (let eigenschaftIndex in stempelDetails[eigenschaft]) {
		            const aktuelleFarbe = stempelDetails[eigenschaft][eigenschaftIndex];
		            if (aktuelleFarbe === nameVary) {
		                darfGeloeschtWerden = false;
		                stempelHTMLVary = faktuellerCharakter().Stempel.WelcheGibtEs[stempelNr][0];
		            }
		        }
		    }
		}
	    if (darfGeloeschtWerden) {
	        farbenArray.splice(farbeIndex, 1);
	        CB.Farben.Selected.Index = null;
	        CB.Farben.Selected.Element = null;
	        FarbenContainer_NameAendernInput.value = "";
	        FarbenContainer_FarbenAnzeigeContainer.style.display = "none";
	        FarbenContainer_DieseFarbeLoeschenButton.style.display = "none";
	        FarbenContainer_DieseFarbeDuplizierenButton.style.display = "none";
	        CB.Farben.Anzeigen();
	    } else {
	        if (alterNameVary === "Leer" || alterNameVary === "Weiss" || alterNameVary === "Schwarz") {
	            SagDas("Diese Farbe kann nicht gelöscht werden, da sie für interne Prozesse verwendet wird.");
	        } else if (stempelHTMLVary !== "") {
	            SagDas("Diese Farbe kann nicht gelöscht werden, weil sie noch von mindestens einem Stempel verwendet wird. Zum Beispiel: " + stempelHTMLVary);
	        } else {
	            SagDas("Diese Farbe kann nicht gelöscht werden, weil sie noch von Elementen verwendet wird. Zum Beispiel: " + elementBeispielVary);
	        }
	    }
	},
	Duplizieren : function(){
	  	const index = CB.Farben.Selected.Index;
	  	const farbenArray = faktuellerCharakter().Farben.WelcheGibtEs;
	  	const aktuelleFarbe = faktuellerCharakter().Farben.WelcheGibtEs[index];
	  	const alterFarbenName = aktuelleFarbe[0];
	  	const neuerFarbenName = alterFarbenName + "Kopie";
	  	for(let farbenNr in farbenArray){
		  	if(neuerFarbenName == farbenArray[farbenNr][0]){
			  	SagDas("Dieser Name ist schon vergeben. Aender den Namen der Ursprungskopie.")
			  	return;
		  	}
	  	}
	  	const neueFarbe = [neuerFarbenName, aktuelleFarbe[1], aktuelleFarbe[2]];
	  	const neuerIndex = parseInt(index)+1;
	  	farbenArray.splice(neuerIndex, 0, neueFarbe);
	  	CB.Farben.Initialisieren(AktuelleCharakter);
	  	CB.Farben.Anzeigen();
	  	CB.Farben.Auswaehlen($("FarbenContainer_Farben" + neuerIndex), neuerIndex);
	},
	Initialisieren : function(wer) {
	  	const farben = CB.GegnerSchablone[wer].Farben.WelcheGibtEs;
	  	for (const entry of farben) {
		  	const [farbeName, farbeWert] = entry;
		  	CB.GegnerSchablone[wer].Farben[farbeName] = farbeWert;
		  	CB.Farben.AlleFarben[farbeName] = new CB.Farben.FarbFunktion(farbeName, farbeWert);
	  	}
  	},
	Erstellen : function(){
	    const nameVary = FarbenContainer_NeueFarbeContainer_FarbenNameContainer_FarbenNameInput.value;
	    const valueVary = FarbenContainer_NeueFarbeContainer_FarbenValueContainer_FarbenValueInput.value;
	    let darfDerNameVerwendetWerden = true;
	    faktuellerCharakter().Farben.WelcheGibtEs.forEach(farbArray => {
	        if(nameVary === farbArray[0]){
	            darfDerNameVerwendetWerden = false;
	        }
	    });
	    if(darfDerNameVerwendetWerden){
	        CB.Farben.NeueFarbeContainer.Check();
	        const arrayVary = [nameVary, valueVary, []];
	        faktuellerCharakter().Farben.WelcheGibtEs.unshift(arrayVary);
	        CB.Farben.Initialisieren(AktuelleCharakter);
	        CB.Farben.Selected.Index = 0;
	        CB.Farben.Selected.Element = $("FarbenContainer_Farbe" + CB.Farben.Selected.Index);
	        CB.Farben.Anzeigen();
	        CB.Farben.Auswaehlen(CB.Farben.Selected.Element, CB.Farben.Selected.Index);
	    } else {
	        SagDas(nameVary + " ist schon vergeben. Suche einen anderen Namen aus.");
	    }
	},
	NeueFarbeContainer : {
		Check : function(){
		 	if(FarbenContainer_NeueFarbeContainer.style.display == "block"){
			  	FarbenContainer_NeueFarbeContainer.style.display = "none";
		  	}else{
			 	FarbenContainer_NeueFarbeContainer.style.display = "block";
		 	}
		}
	},
	Fuellungen : {
		Selected : {
			Index : null,
			Element :null
		},
		ZeigDieFuellungen : function(farbArray, farbNr){
		    const { Bild } = faktuellerCharakter();
		    const { Width, Height } = Bild;
		    const canvas = $('FarbenContainer_Farbe' + farbNr + 'FarbAnzeige');
		    canvas.width = Width;
		    canvas.height = Height;
		    const ctx = canvas.getContext('2d');
		    ctx.fillStyle = farbArray[1];
		    ctx.fillRect(0, 0, Width, Height);
		    for(const fuellungen in farbArray[2]){
		        ctx.beginPath();
		        ctx.moveTo(0, 0);
		        ctx.lineTo(0, Height);
		        ctx.lineTo(Width, Height);
		        ctx.lineTo(Width, 0);
		        ctx.closePath();
		        CB.Farben.Fuellungen.MachDieFuellungen(ctx, farbArray[0]);
		    }
		},
		MachDieFuellungen : function(context, rgba) {
		  	for (const farbenNr in faktuellerCharakter().Farben.WelcheGibtEs) {
			  	const aktuelleFarbe = faktuellerCharakter().Farben.WelcheGibtEs[farbenNr];
			  	if (rgba === aktuelleFarbe[0]) {
				  	for (const fuellungen in aktuelleFarbe[2]) {
					  	const fuellungNr = aktuelleFarbe[2][fuellungen];
					  	let gradient;
					  	if (fuellungNr[0] === "Radial") {
						  	const maasseVary = fuellungNr[1];
						  	gradient = context.createRadialGradient(maasseVary[0], maasseVary[1], maasseVary[2], maasseVary[3], maasseVary[4], maasseVary[5]);
					  	} else if (fuellungNr[0] === "Linear") {
						  	const maasseVary = fuellungNr[1];
						  	gradient = context.createLinearGradient(maasseVary[0], maasseVary[1], maasseVary[2], maasseVary[3]);
			 		 	} else if (fuellungNr[0] === "Pattern") {
						  	gradient = context.createPattern($(fuellungNr[1][0]), fuellungNr[1][1]);
						  	gradientVary = gradient;
						  	context.scale(fuellungNr[1][2], fuellungNr[1][3]);
						  	context.translate(fuellungNr[1][4], fuellungNr[1][5]);
						  	context.globalAlpha = fuellungNr[1][6];
						  	context.rotate(fuellungNr[1][7]);
						  	context.fillStyle = gradientVary;
						  	context.fill();
						  	context.rotate(-fuellungNr[1][7]);
						  	context.globalAlpha = 1;
						  	context.translate(-fuellungNr[1][4], -fuellungNr[1][5]);
						  	context.scale(1 / fuellungNr[1][2], 1 / fuellungNr[1][3]);
					  	}
					  	if (fuellungNr[0] === "Linear" || fuellungNr[0] === "Radial") {
						  	for (const grad in fuellungNr[2]) {
							  	const gradVary = fuellungNr[2][grad];
							  	gradient.addColorStop(gradVary[0], gradVary[1]);
					  		}
						  	gradientVary = gradient;
						  	context.fillStyle = gradientVary;
						  	context.fill();
					  	}
				  	}
			  	}
		  	}
	  	},
		Verschieben : function(richtung){
			const aktuelleFarbe = faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index];
			const fuellungen = aktuelleFarbe[2];
			const aktuelleFuellung=fuellungen[CB.Farben.Fuellungen.Selected.Index];
			const index = CB.Farben.Fuellungen.Selected.Index;
			let newIndex;
			if (richtung === "hoch") {
				newIndex = index - 1;
			} else if (richtung === "runter") {
				newIndex = parseInt(index) + 1;
			}
			fuellungen.splice(index, 1);
			fuellungen.splice(newIndex, 0, aktuelleFuellung);
			CB.Farben.Fuellungen.Selected.Index = newIndex;
			CB.WelcheFuellungIstGeradeAusgesuchtElement=$('Fuellung'+index);
			CB.Farben.Fuellungen.ThumpnailAnzeigen();
			CB.Farben.Anzeigen();
			$("FarbenContainer_Farbe" + CB.Farben.Selected.Index).style.border = "2px solid red";
			CB.Farben.Fuellungen.BearbeitungsContainer.Anzeigen();
		},
		Loeschen : function(){
			faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2].splice(CB.Farben.Fuellungen.Selected.Index, 1);
			CB.Farben.Fuellungen.BearbeitungsContainer.Check();
			FarbenContainer_FuellungenBearbeitenContainerDiesenTimestopLoeschenButton.style.display = "none";
			CB.Farben.Anzeigen();
			CB.Farben.Auswaehlen(CB.Farben.Selected.Element, CB.Farben.Selected.Index);
			CB.Farben.Fuellungen.Selected.Index = null;
			CB.WelcheFuellungIstGeradeAusgesuchtElement = null;
		},
		Erstellen : function() {
		  	if (typeof faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2] !== "object") {
			  	SagDas("nie");
			  	faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2] = [];
		  	}
		  	let valueVary;
		  	if (FarbenContainer_FuellungHinzufuegenTypInput.value === "Radial") {
			  	valueVary = ["Radial", ["200", "200", "1", "200", "200", "300"], [["0", "rgba(170,120,0,0.7)"], ["1", "rgba(0,0,0,0)"]]];
			} else if (FarbenContainer_FuellungHinzufuegenTypInput.value === "Linear") {
			  	valueVary = ["Linear", ["0", "200", "400", "200"], [["0", "rgba(170,120,0,0.7)"], ["1", "rgba(0,0,0,0)"]]];
		 	} else if (FarbenContainer_FuellungHinzufuegenTypInput.value === "Pattern") {
			  	const testPattern = faktuellerCharakter().Pattern.WelcheGibtEs[0][0];
			  	valueVary = ["Pattern", [testPattern, "repeat", "1", "1", "0", "0", "1", "0"]];
		  	}
		  	CB.Farben.Fuellungen.Selected.Index = FarbenContainer_FuellungHinzufuegenEbeneInput.value;
		  	CB.WelcheFuellungIstGeradeAusgesuchtElement = $("Fuellung" + CB.Farben.Fuellungen.Selected.Index);
		  	faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2].splice(FarbenContainer_FuellungHinzufuegenEbeneInput.value, 0, valueVary);
		  	CB.Farben.Anzeigen();
		  	CB.Farben.Auswaehlen(CB.Farben.Selected.Element, CB.Farben.Selected.Index);
		  	CB.Farben.Fuellungen.BearbeitungsContainer.Anzeigen();
		  	if (FarbenContainer_FuellungenBearbeitenContainer.style.display !== "block") {
			  	FarbenContainer_FuellungenBearbeitenContainer.style.display = "block";
		  	}
		},
		ThumpnailAnzeigen : function(){
		  	let gradient;
			const farbenArray = faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2][CB.Farben.Fuellungen.Selected.Index];
			const width = faktuellerCharakter().Bild.Width;
			const height = faktuellerCharakter().Bild.Height;
			const canvas = $('FarbenContainer_FuellungThumpnail');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, width, height);
			ctx.fillStyle = farbenArray[1];
			ctx.fillRect(0, 0, width, height);
			if(farbenArray[0] == "Pattern"){
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, width, height);
				ctx.scale(farbenArray[1][2], farbenArray[1][3]);
				ctx.translate(farbenArray[1][4], farbenArray[1][5]);
				ctx.globalAlpha = farbenArray[1][6];
				ctx.rotate(farbenArray[1][7]);
				ctx.beginPath();
				ctx.moveTo(-width * 2, -height * 2);
				ctx.lineTo(-width * 2, height * 4);
				ctx.lineTo(width * 4, height * 4);
				ctx.lineTo(width * 4, -height * 2);
				ctx.closePath();
				gradient = ctx.createPattern($(farbenArray[1][0]), farbenArray[1][1]);
				ctx.fillStyle = gradient;
				ctx.fill();
				ctx.rotate(-farbenArray[1][7]);
				ctx.globalAlpha = 1;
				ctx.translate(-farbenArray[1][4], -farbenArray[1][5]);
				ctx.scale(1 / farbenArray[1][2], 1 / farbenArray[1][3]);
			}
			for(let fuellungen in farbenArray[2]){
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(0, height);
				ctx.lineTo(width, height);
				ctx.lineTo(width, 0);
				ctx.closePath();
				if(farbenArray[0] == "Radial"){
					let maasseVary = farbenArray[1];
					gradient = ctx.createRadialGradient(maasseVary[0], maasseVary[1], maasseVary[2], maasseVary[3], maasseVary[4], maasseVary[5]);
				}else
				if(farbenArray[0] == "Linear"){
					let maasseVary = farbenArray[1];
					gradient = ctx.createLinearGradient(maasseVary[0], maasseVary[1], maasseVary[2], maasseVary[3]);
				}
				if(farbenArray[0] == "Linear"||farbenArray[0] == "Radial"){
					for(let grad in farbenArray[2]){
						let gradVary = farbenArray[2][grad];
						gradient.addColorStop(gradVary[0], gradVary[1]);
					}
					ctx.fillStyle = gradient;
					ctx.fill();
				}
			}
		},
		WertAndern : function (value, stelle, stelle2, stelle3) {
			const farbenArray = faktuellerCharakter().Farben.WelcheGibtEs;
			const farbe = farbenArray[CB.Farben.Selected.Index];
		 	const fuellungArray = farbe[2][CB.Farben.Fuellungen.Selected.Index];
			if (typeof fuellungArray[stelle][stelle2] === "number" || typeof fuellungArray[stelle][stelle2] === "string") {
				fuellungArray[stelle][stelle2] = value;
			} else {
				fuellungArray[stelle][stelle3][stelle2] = value;
			}
			CB.Farben.Fuellungen.ThumpnailAnzeigen();
			CB.Farben.Anzeigen();
			$("FarbenContainer_FarbThumpnail").src = $('FarbenContainer_Farbe' + CB.Farben.Selected.Index + 'FarbAnzeige').toDataURL();
		},
		BearbeitungsContainer : {
			Init : function(element, farbNrVary, Nr){
				if(FarbenContainer_FuellungenBearbeitenContainer.style.display == "block"){
					CB.Farben.Fuellungen.BearbeitungsContainer.Check();
				}
				CB.Farben.Fuellungen.Selected.Index = Nr;
				CB.WelcheFuellungIstGeradeAusgesuchtElement = $(element);
				CB.Farben.Fuellungen.BearbeitungsContainer.Check();
			},
			Check : function(){
			  	if(FarbenContainer_FuellungenBearbeitenContainer.style.display == "block"){
				  	FarbenContainer_FuellungenBearbeitenContainer.style.display = "none";
				  	FarbenContainer_FuellungenBearbeitenContainerDiesenTimestopLoeschenButton.style.display = "none";
				  	CB.Farben.Fuellungen.Selected.Index = null;
				  	CB.WelcheFuellungIstGeradeAusgesuchtElement = null;
			  	}else{
				  	FarbenContainer_FuellungenBearbeitenContainer.style.display = "block";
				  	CB.Farben.Fuellungen.BearbeitungsContainer.Anzeigen();
				}
			},
			Anzeigen : function(){
				const farbIndex = CB.Farben.Selected.Index;
				const fuellungIndex = CB.Farben.Fuellungen.Selected.Index;
				const farbArray = faktuellerCharakter().Farben.WelcheGibtEs[farbIndex];
				const fuellungElementeArray = farbArray[2];
				const fuellungArray = fuellungElementeArray[fuellungIndex];
				const fuellungName = fuellungArray[0];
				const fuellungData = fuellungArray[1];
				const timestopArray = fuellungArray[2];
				const fuellungenBearbeitenContainerId = "FarbenContainer_FuellungenBearbeitenContainerAnzeige";
				if(fuellungName == "Linear" || fuellungName == "Radial"){
					FarbenContainer_FuellungenBearbeitenContainerDiesenTimestopHinzufuegenButton.style.display = "block";
				}else
				if(fuellungName == "Pattern"){
					FarbenContainer_FuellungenBearbeitenContainerDiesenTimestopHinzufuegenButton.style.display = "none";
				}
				CB.Farben.Fuellungen.ThumpnailAnzeigen();
				FarbenContainer_FuellungThumpnailContainer.style.display = "block";
				FarbenContainer_FuellungenBearbeitenContainerDieseFuellungVerschiebenHochButton.style.display = "none";
				FarbenContainer_FuellungenBearbeitenContainerDieseFuellungVerschiebenRunterButton.style.display = "none";
				if(fuellungElementeArray.length > 1){
					if(fuellungIndex > 0){
						FarbenContainer_FuellungenBearbeitenContainerDieseFuellungVerschiebenHochButton.style.display = "block";
					}
					if(fuellungIndex < fuellungElementeArray.length - 1){
						FarbenContainer_FuellungenBearbeitenContainerDieseFuellungVerschiebenRunterButton.style.display = "block";
					}
				}
				if(fuellungName == "Linear" || fuellungName == "Radial"){
					timestopArray.sort();
				}
				for(let fuellungElementNr in fuellungElementeArray){
					const fuellungElementId = 'Fuellung' + fuellungElementNr;
					$(fuellungElementId).style.border = "0.2vh solid black";
					if(fuellungElementNr == fuellungIndex){
						$(fuellungElementId).style.border = "0.2vh solid red";
					}
				}
				$(fuellungenBearbeitenContainerId).innerHTML = "";
				const fuellungBearbeitenContainerLable = createDivElement(fuellungenBearbeitenContainerId, fuellungenBearbeitenContainerId + 'Typ' + fuellungIndex, fuellungenBearbeitenContainerId + 'Typ', fuellungName);
				let fuellungTyp;
				if (fuellungName === "Radial") {
					fuellungTyp = "FuellungenRadial";
				}else
				if (fuellungName === "Linear") {
					fuellungTyp = "FuellungenLinear";
				}
				if (fuellungName === "Radial" || fuellungName === "Linear") {
				    fuellungData.forEach((value, werte) => {
				        const fuellungElementId = 'FuellungElement' + werte;
				        const fuellungInputElement = createInputElement(fuellungenBearbeitenContainerId, fuellungElementId, 'FuellungInput ' + fuellungTyp + CB.Daten.SchummelArray[fuellungTyp][werte][0], 'text', value, 'CB.Farben.Fuellungen.WertAndern(this.value,' + 1 + ',' + werte + ', "")');
				        const fuellungElementLabel = createButtonElement(fuellungenBearbeitenContainerId, fuellungElementId + 'Lable', 'FuellungInputLable ' + fuellungTyp + CB.Daten.SchummelArray[fuellungTyp][werte][0] + 'Lable', '$("FuellungElement' + werte + '").select()', CB.Daten.SchummelArray[fuellungTyp][werte][1]);
				    });
				}
				else
				if(fuellungName == "Pattern"){
					for(let werte in fuellungData){
						const fuellungDataValue = fuellungData[werte];
						const patternArray = faktuellerCharakter().Pattern.WelcheGibtEs;
						let istDasEinPattern = false;
						let welcherPattern = "";
						for(let patternNr in patternArray){
							if(patternArray[patternNr][0] == fuellungDataValue){
								istDasEinPattern = true;
								welcherPattern = fuellungDataValue;
							}
						}
						if(istDasEinPattern == true){
							fuellungTyp = "FuellungenPattern";
							const fuellungenBearbeitenPatternSelectFeld = createSelectElement(fuellungenBearbeitenContainerId, 'FuellungElement' + werte, 'FuellungInput ' + fuellungTyp + CB.Daten.SchummelArray[fuellungTyp][werte][0], 'CB.Farben.Fuellungen.WertAndern(this.value,' + 1 + ',' + werte + ',"")');
							for(let patternNr in patternArray){
								const fuellungenBearbeitenPatternSelectFeldOption = createOptionElement('FuellungElement' + werte, "Option" + patternNr, "", patternArray[patternNr][0], patternArray[patternNr][0]);
							}
						}else
						if(fuellungDataValue == "repeat" || fuellungDataValue == "repeat-x" || fuellungDataValue == "repeat-y"){
							fuellungTyp = "FuellungenPattern";
							const idFuellungenSelect = 'FuellungElement' + werte;
							const fuellungenBearbeitenPatternSelectFeld = createSelectElement(fuellungenBearbeitenContainerId, idFuellungenSelect, 'FuellungInput '+ fuellungTyp + CB.Daten.SchummelArray[fuellungTyp][werte][0], 'CB.Farben.Fuellungen.WertAndern(this.value,' + 1 + ',' + werte + ',"")');
							createOptionElement(idFuellungenSelect, "OptionRepeat", "", "repeat", "repeat");
							createOptionElement(idFuellungenSelect, "OptionRepeatX", "", "repeat-x", "repeat-x");
							createOptionElement(idFuellungenSelect, "OptionRepeatY", "", "repeat-y", "repeat-y");
							$('FuellungElement' + werte).value = fuellungDataValue;
						}else{
							fuellungTyp = "FuellungenPattern";
							createInputElement(fuellungenBearbeitenContainerId, 'FuellungElement' + werte, 'FuellungInput ' + fuellungTyp + CB.Daten.SchummelArray[fuellungTyp][werte][0], 'text', fuellungDataValue, 'CB.Farben.Fuellungen.WertAndern(this.value,' + 1 + ',' + werte + ',"")');
						}
						createButtonElement(fuellungenBearbeitenContainerId, 'FuellungElement' + werte + 'Lable', 'FuellungInputLable ' + fuellungTyp + CB.Daten.SchummelArray[fuellungTyp][werte][0] + 'Lable', '$("FuellungElement' + werte + '").select()', CB.Daten.SchummelArray[fuellungTyp][werte][1]);
					}
				}
				if(fuellungName == "Radial"||fuellungName == "Linear"){
					const colorstopContainer = 'FarbenContainer_FuellungenBearbeitenContainerAnzeigeColorstopContainer';
					createDivElement(fuellungenBearbeitenContainerId, colorstopContainer, 'FarbenContainer_FuellungenBearbeitenContainerAnzeigeColorstopContainer', "");
					for(let timestopNr in timestopArray){
						const colorstopElementContainer = 'TimestopElement'+timestopNr+'Container';
						createButtonElement(colorstopContainer, colorstopElementContainer, 'TimestopInputContainer', 'CB.Farben.Fuellungen.Colorstop.Auswaehlen('+timestopNr+')', "");
						$('TimestopElement'+timestopNr+'Container').style.top = 1*1+timestopNr*8+"%";
						for(let werte in timestopArray[timestopNr]){
							const timestopTyp = "Timestop";
							createInputElement(colorstopElementContainer, 'TimestopElement' + timestopNr + werte, 'TimestopInput ' + timestopTyp + CB.Daten.SchummelArray[timestopTyp][werte][0], "text", timestopArray[timestopNr][werte], 'CB.Farben.Fuellungen.WertAndern(this.value,' + 2 + ',' + werte + ',"' + timestopNr + '")')
							createButtonElement(colorstopElementContainer, 'TimestopElement' + timestopNr + werte + 'Lable', 'TimestopInputLable ' + timestopTyp + CB.Daten.SchummelArray[timestopTyp][werte][0] + 'Lable', '$("TimestopElement' + timestopNr + werte + '").select()', CB.Daten.SchummelArray[timestopTyp][werte][1]);
						}
					}
				}
			}
		},
		Colorstop : {
			Selected : {
				Index : null,
				Element :null
			},
			Auswaehlen : function(timestopNr){
			    CB.Farben.Fuellungen.Colorstop.Selected.Index = timestopNr;
			    CB.Farben.Fuellungen.Colorstop.Selected.Element = $('TimestopElement'+timestopNr+'Container');
			    for(let fuellungNr in faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2][CB.Farben.Fuellungen.Selected.Index][2]){
			        let welchesElement2 = 'TimestopElement' + fuellungNr + 'Container';
			        $(welchesElement2).style.border = "0.2vh solid black";
			    }
			    CB.Farben.Fuellungen.Colorstop.Selected.Element.style.border = "0.2vh solid red";
			    FarbenContainer_FuellungenBearbeitenContainerDiesenTimestopLoeschenButton.style.display = "block";
			},
			Loeschen : function(){
				faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2][CB.Farben.Fuellungen.Selected.Index][2].splice(CB.Farben.Fuellungen.Colorstop.Selected.Index, 1);
				CB.Farben.Fuellungen.Colorstop.Selected.Index = null;
				CB.Farben.Fuellungen.Colorstop.Selected.Element = null;
				FarbenContainer_FuellungenBearbeitenContainerDiesenTimestopLoeschenButton.style.display = "none";
				CB.Farben.Fuellungen.BearbeitungsContainer.Anzeigen();
			},
			Hinzuguegen : function(){
				faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2][CB.Farben.Fuellungen.Selected.Index][2][faktuellerCharakter().Farben.WelcheGibtEs[CB.Farben.Selected.Index][2][CB.Farben.Fuellungen.Selected.Index][2].length] = [0, "rgba(0,0,0,1)"];
				CB.Farben.Fuellungen.Colorstop.Selected.Index = null;
				CB.Farben.Fuellungen.Colorstop.Selected.Element = null;
				FarbenContainer_FuellungenBearbeitenContainerDiesenTimestopLoeschenButton.style.display = "none";
				CB.Farben.Fuellungen.BearbeitungsContainer.Anzeigen();
			}
		}
	}
}