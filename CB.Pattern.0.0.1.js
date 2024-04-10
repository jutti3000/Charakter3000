/* --- CB.Pattern ---  */
CB.Pattern = {};

CB.Pattern.Selected = {};
CB.Pattern.Selected.Index = null;
CB.Pattern.Selected.Element = null;

CB.Pattern.AllePattern = {};
CB.Pattern.Init = function(wer) {
  	const patterns = CB.GegnerSchablone[wer].Pattern.WelcheGibtEs;
  	for (const entry of patterns) {
	  	const [patternName, patternValue] = entry;
	  	CB.GegnerSchablone[wer].Pattern[patternName] = patternValue;
  	}
  	CB.GegnerSchablone.PatternErstellen();
};
CB.Pattern.Check = function(){
  	if(PatternContainer_MainContainer.style.display == "block"){
 	 	PatternContainer_MainContainer.style.display = "none";
  		CB.Pattern.Selected.Index = null;
  		CB.Pattern.Selected.Element = null;
 	 	PatternContainer_NameAendernInput.value = "";
  		PatternContainer_NameAendernInput.style.display = "none";
  		PatternContainer_AnzeigeCanvas.style.display = "none";
  		PatternContainer_TexturAendernInput.value = "";
  		PatternContainer_TexturAendernInput.style.display = "none";
  		PatternContainer_FarbeAendernInput.value = "";
  		PatternContainer_FarbeAendernInput.style.display = "none";
  		PatternContainer_FarbsucherButton.style.display = "none";
 	 	PatternContainer_DiesePatternLoeschenButton.style.display = "none";
 	 	$("FS_MainContainer").close();
 	}else{
  		PatternContainer_MainContainer.style.display = "block";
 	CB.Pattern.Anzeigen();
	}
}
CB.Pattern.NeuePatternContainerCheck = function(){
	if(PatternContainer_NeuePatternContainer.style.display == "block"){
		PatternContainer_NeuePatternContainer.style.display = "none";
 	 	}else{
		PatternContainer_NeuePatternContainer.style.display = "block";
	}
}

CB.Pattern.PatternAnzeigeMachen = function() {
  	const width = faktuellerCharakter().Bild.Width;
  	const height = faktuellerCharakter().Bild.Height;
  	const canvas = PatternContainer_AnzeigeCanvas;
  	canvas.width = width;
  	canvas.height = height;
  	const ctx = canvas.getContext('2d');
  	ctx.fillStyle = "rgba(255,255,255,1)";
  	ctx.fillRect(0, 0, width, height);
  	ctx.beginPath();
  	ctx.moveTo(0, 0);
  	ctx.lineTo(0, height);
  	ctx.lineTo(width, height);
  	ctx.lineTo(width, 0);
  	ctx.closePath();
  	const gradient = ctx.createPattern($(faktuellerCharakter().Pattern.WelcheGibtEs[CB.Pattern.Selected.Index][0]), "repeat");
  	gradientVary = gradient;
  	ctx.fillStyle = gradientVary;
  	ctx.fill();
};

CB.Pattern.Auswaehlen = function(element, patternNummer) {
  	const patternArray = faktuellerCharakter().Pattern.WelcheGibtEs;
  	for (let patternNr in patternArray) {
	  	$('PatternContainer_AnzeigePattern' + patternNr).style.border = "0.2vh solid black";
  	}
  	element.style.border = "0.2vh solid red";
  	CB.Pattern.Selected.Index = patternNummer;
  	CB.Pattern.Selected.Element = element;
  	if (CB.Pattern.Selected.Element != null) {
	  	const idVary = patternArray[patternNummer][0];
	  	PatternContainer_NameAendernInput.value = idVary;
	  	PatternContainer_NameAendernInput.style.display = "block";
	  	PatternContainer_AnzeigeCanvas.style.display = "block";
	  	const texturVary = patternArray[patternNummer][1][0];
	  	PatternContainer_TexturAendernInput.value = texturVary;
	  	PatternContainer_TexturAendernInput.style.display = "block";
	  	const farbeVary = patternArray[patternNummer][1][1];
	  	PatternContainer_FarbeAendernInput.value = farbeVary;
	  	PatternContainer_FarbeAendernInput.style.display = "block";
	  	PatternContainer_FarbsucherButton.style.display = "block";
	  	PatternContainer_DiesePatternLoeschenButton.style.display = "block";
	  	CB.Pattern.PatternAnzeigeMachen();
  	}
};

CB.Pattern.Anzeigen = function(){
	const patternArray = faktuellerCharakter().Pattern.WelcheGibtEs;
	PatternContainer_AllePatternContainer.innerHTML = "";
	let nameVary = "";
	if(CB.Pattern.Selected.Index != null){
		nameVary = patternArray[CB.Pattern.Selected.Index][0];
	}
	patternArray.sort();
	for(patternNr in patternArray){
  		const width = faktuellerCharakter().Bild.Width;
  		const height = faktuellerCharakter().Bild.Height;
		const patternElementArrayId = patternArray[patternNr][0];
		const containerElement = "PatternContainer_AllePatternContainer";
		const patternElementContainerId = 'PatternContainer_AnzeigePattern'+patternNr;
		const patternElementContainer = createButtonElement(containerElement, patternElementContainerId, 'PatternContainerAnzeigePatternContainer', 'CB.Pattern.Auswaehlen(this,'+patternNr+')', "");
		const patternElementIdAnzeige = createDivElement(patternElementContainerId, patternElementContainerId + "id", 'PatternContainerAnzeigePatternContainerId', patternElementArrayId);
		const patternElementThumpnail = createCanvasElement(patternElementContainerId, patternElementContainerId + "Canvas", 'PatternContainerAnzeigePatternContainerCanvas', width, height);
		const canvas = patternElementThumpnail;
		CB.Pattern.ThumpnailMachen(canvas, width, height, patternElementArrayId);
		if(patternArray[patternNr][0] == nameVary){
			CB.Pattern.Selected.Index = patternNr;
			CB.Pattern.Selected.Element = $(patternElementContainerId);
		}
	}
}

CB.Pattern.ThumpnailMachen = function(canvas, width, height, pattern){
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = "rgba(255,255,255,1)"
	ctx.fillRect(0,0,width,height);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,height);
	ctx.lineTo(width,height);
	ctx.lineTo(width,0);
	ctx.closePath();
	const gradient = ctx.createPattern($(pattern),"repeat");
	gradientVary = gradient;
	ctx.fillStyle = gradientVary;
	ctx.fill();
}

CB.Pattern.Erstellen = function(){
    const nameVary = PatternContainer_NeuePatternNameInput.value;
    let darfDerNameVerwendetWerden = true;
    faktuellerCharakter().Pattern.WelcheGibtEs.forEach(farbArray => {
        if(nameVary === farbArray[0]){
            darfDerNameVerwendetWerden = false;
        }
    });
    if(darfDerNameVerwendetWerden){
        CB.Pattern.NeuePatternContainerCheck();
        const arrayVary = [nameVary, ["Zufall", "rgba(0,0,0,1)"]];
        faktuellerCharakter().Pattern.WelcheGibtEs.unshift(arrayVary);
        CB.Pattern.Init(AktuelleCharakter);
        CB.Pattern.Anzeigen();
    } else {
        SagDas(nameVary + " ist schon vergeben. Suche einen anderen Namen aus.");
    }
}

CB.Pattern.NameAendern = function() {
    const neuerName = PatternContainer_NameAendernInput.value;
    const alterName = faktuellerCharakter().Pattern.WelcheGibtEs[CB.Pattern.Selected.Index][0];
    for (let farbNr in faktuellerCharakter().Pattern.WelcheGibtEs) {
        let farbEintrag = faktuellerCharakter().Pattern.WelcheGibtEs[farbNr];
        if (neuerName === farbEintrag[0]) {
            SagDas("Dieser Name ist bereits vergeben. Bitte wählen Sie einen anderen Namen.");
            return;
        }
    }
    $(alterName).id = neuerName;
    for (let farbNr in faktuellerCharakter().Farben.WelcheGibtEs) {
        let farbEintrag = faktuellerCharakter().Farben.WelcheGibtEs[farbNr];
        for (let eintragNr in farbEintrag[2]) {
            let eintrag = farbEintrag[2][eintragNr];
            if (eintrag[0] === "Pattern" && eintrag[1][0] === alterName) {
                eintrag[1][0] = neuerName;
            }
        }
    }
    faktuellerCharakter().Pattern.WelcheGibtEs[CB.Pattern.Selected.Index][0] = neuerName;
    CB.Pattern.Init(AktuelleCharakter);
    CB.Pattern.Anzeigen();
    CB.Pattern.Auswaehlen($("PatternContainer_AnzeigePattern" + CB.Pattern.Selected.Index), CB.Pattern.Selected.Index);
}

CB.Pattern.Loeschen=function(){
	const farbenArray = faktuellerCharakter().Farben.WelcheGibtEs;
	const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	const alterNameVary = faktuellerCharakter().Pattern.WelcheGibtEs[CB.Pattern.Selected.Index][0];
	let darfGeloeschtWerden = true;
	const alleFarbenMitDiesemPattern = [];
	const welcheStempelWerdenVerwendet = [];
	const welcheFarbenWerdenVerwendet = [];
	Object.values(faktuellerCharakter().WelcheGibtEs).forEach(function(array) {
        const name = array[0];
        Object.values(faktuellerCharakter()[name].CanvasElemente.Alle).forEach(function(elementArray) {
            elementArray.forEach(function(element) {
                if (element[0] === "Stempel" && !welcheStempelWerdenVerwendet.includes(element[1])) {
                    welcheStempelWerdenVerwendet.push(element[1]);
                } else if (!welcheFarbenWerdenVerwendet.includes(element[1])) {
                    welcheFarbenWerdenVerwendet.push(element[1]);
                }
            });
        });
    });
	for (const stempel of stempelArray) {
		if(welcheStempelWerdenVerwendet.includes(stempel[0])){
	        for (const stempelDetail of stempel[1]) {
	        	if (!welcheFarbenWerdenVerwendet.includes(stempelDetail[1])) {
	      			welcheFarbenWerdenVerwendet.push(stempelDetail[1]);
	 		    }		        
	        }
		}
	}
	for(let farbNr in farbenArray){
		const farbId  =  farbenArray[farbNr][0];
		const fuellungenArray  =  farbenArray[farbNr][2];
		for(let fuellungNr in fuellungenArray){
			const fuellundId = fuellungenArray[fuellungNr][0];
			const fuellungFarbeId = fuellungenArray[fuellungNr][1][0];
			if(fuellundId == "Pattern"){
				if(alterNameVary == fuellungFarbeId){
					darfGeloeschtWerden = false;
					if (!alleFarbenMitDiesemPattern.includes(farbId)) {
						alleFarbenMitDiesemPattern.push(farbId);
					}
					
				}
			}
		}
	}
	if(darfGeloeschtWerden == false){
		SagDas("Dieses Pattern darf nicht geloescht werden, weil es noch in Farben verwendet wird. Z.B.: "+alleFarbenMitDiesemPattern);
		return;
	}
	let elementBeispielVary = "";
	Object.entries(faktuellerCharakter().WelcheGibtEs).forEach(([key, value]) => {
	    const name = value[0];
	    Object.values(faktuellerCharakter()[name].CanvasElemente.Alle).forEach((array2) => {
	        array2.forEach((array3) => {
	            if (array3 === alterNameVary) {
	            alert("zuzu")
	                darfGeloeschtWerden = false;
	                elementBeispielVary += ` ${value[1]},`;
	            }
	        });
	    });
	});
	elementBeispielVary += "...";
	if(darfGeloeschtWerden == true){
		faktuellerCharakter().Pattern.WelcheGibtEs.splice(CB.Pattern.Selected.Index,1);
		CB.Pattern.Selected.Index = null;
		CB.Pattern.Selected.Element = null;
		PatternContainer_DiesePatternLoeschenButton.style.display = "none";
		PatternContainer_NameAendernInput.value = "";
		PatternContainer_NameAendernInput.style.display = "none";
		PatternContainer_AnzeigeCanvas.style.display = "none";
		PatternContainer_TexturAendernInput.value = "";
		PatternContainer_TexturAendernInput.style.display = "none";
		PatternContainer_FarbeAendernInput.value = "";
		PatternContainer_FarbeAendernInput.style.display = "none";
		PatternContainer_FarbsucherButton.style.display = "none";
		CB.Pattern.Anzeigen();
	}else
	if(darfGeloeschtWerden == false){
		SagDas("Diese Pattern kann nicht geloescht werden, weil sie noch von Elementen verwendet wird. Zum Beispiel:"+elementBeispielVary);
	}
}

CB.Pattern.ValueAendern = function(element, Nr){
	const patternIndex = CB.Pattern.Selected.Index;
	const patternArray = faktuellerCharakter().Pattern.WelcheGibtEs[patternIndex];
	const nameVary = $(element).value;
	const alterValueVary = patternArray[1][Nr];
	patternArray[1][Nr] = nameVary;
	CB.Pattern.Init(AktuelleCharakter);
	CB.Pattern.Anzeigen();
	CB.CanvasElemente.MalDieBilder("Alle");
	CB.Pattern.PatternAnzeigeMachen();
	$(element).value = nameVary;
	CB.Pattern.Auswaehlen($("PatternContainer_AnzeigePattern" + patternIndex), patternIndex);
}

CB.Pattern.Schablonen={};
CB.Pattern.Schablonen.WelcheGibtEs=["Schachbrett","Streifen","Zufall","Kugeln","Zacken","Wellen","Sinus"];
CB.Pattern.Schablonen.Init=function(){
	const schablonen = CB.Pattern.Schablonen;
	const schablonenArray = schablonen.WelcheGibtEs;
	schablonenArray.sort();
	
	for(let schablonenNr in schablonenArray){
		schablonen[schablonenArray[schablonenNr]]={};
	}
	
	schablonen.Schachbrett.Bauen = function(element, farbe){
		const canvas = $(element);
		canvas.width = 20;
		canvas.height = 20;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = farbe;
		ctx.fillRect(0, 0, 10, 10);
		ctx.fillRect(10, 10, 10, 10);
	};
	
	schablonen.Streifen.Bauen = function(element, farbe){
 		const canvas = $(element);
		canvas.width = 20;
		canvas.height = 20;
 		const ctx = canvas.getContext('2d');
	 	ctx.fillStyle = farbe;
 		ctx.fillRect(0, 0, 10, 20);
	};
		
	schablonen.Zufall.Bauen = function(element, farbe){
		const canvas = $(element);
		canvas.width = 100;
		canvas.height = 100;
		const ctx = canvas.getContext('2d');
		for(i = 0;i<canvas.width;i++){
			for(j = 0;j<canvas.width;j++){
				ctx.fillStyle = farbe;
				ctx.globalAlpha = Math.random();
				ctx.fillRect(i, j, 1, 1);
			}
		}
		ctx.globalAlpha = 1;
	};
		
	schablonen.Kugeln.Bauen = function(element, farbe){
		const canvas = $(element);
		const width = 200;
		const height = 200;
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		for(kugeln = 0;kugeln<354;kugeln++){
			const x = parseInt(Math.random()*width);
			const y = parseInt(Math.random()*height);
			const h = parseInt(Math.random()*10)+3*1;
			ctx.beginPath();
			ctx.arc(x, y, h, 0, 2*Math.PI);
			ctx.fillStyle = farbe;
			ctx.globalAlpha = Math.random();
			ctx.fill();
		}
		/*for(i = 0;i<canvas.width;i++){
			for(j = 0;j<canvas.width;j++){
				ctx.fillStyle = farbe;
				ctx.globalAlpha = Math.random();
				ctx.fillRect(i, j, 1, 1);
			}
		}*/
		ctx.globalAlpha = 1;
	};
		
	schablonen.Zacken.Bauen = function(element, farbe){
	 	const canvas = $(element);
	 	canvas.width = 20;
	 	canvas.height = 20;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = farbe;
		ctx.strokeStyle = farbe;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(0, -5);
		ctx.lineTo(15, 10);
		ctx.lineTo(-5, 30);
		ctx.stroke();
	};
	
	schablonen.Wellen.Bauen = function(element, farbe){
		const canvas = $(element);
		canvas.width = 20;
		canvas.height = 20;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = farbe;
		ctx.strokeStyle = farbe;
		ctx.lineWidth = 4;
	 	ctx.beginPath();
	 	ctx.moveTo(20, -5);
		ctx.bezierCurveTo(-2, 5, -2, 15, 20, 25);
	 	ctx.stroke();
	};
	
	schablonen.Sinus.Bauen = function(element, farbe){
		const canvas = $(element);
		canvas.width = 20;
		canvas.height = 40;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = farbe;
		ctx.strokeStyle = farbe;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(13, -10);
		ctx.bezierCurveTo(-2, 5, -2, 15, 21, 20);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(-2, 19);
		ctx.bezierCurveTo(12, 25, 12, 35, 0, 45);
		ctx.stroke();
	};
}