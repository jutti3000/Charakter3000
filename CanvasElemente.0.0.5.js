/* --- CB.CanvasElemente --- */

CB.CanvasElemente={};

CB.CanvasElemente.WelcheGibtEs = [
	["Linie"],
	["Kurve"],
	["FarbEllipse"],
	["Stempel"],
	["FarbKreis"],
	["GarbRechteck"],
	["FarbStern"],
	["FarbPoligon"]
];

CB.CanvasElemente.MalDieBilderModusPruefung = function(modus, werIstEs){
	if(modus == "AlleWoDerStempelIst"){
		let sollGemachtWerden = false;
		const charakter = faktuellerCharakter();
		const charakterArray = charakter.WelcheGibtEs;
		for(let charakterNr in charakterArray){
			const charakterDataId = charakterArray[charakterNr][0];
			const elementeArray = charakter[charakterDataId].CanvasElemente.Alle;
			for(let elementeNr in elementeArray){
				const elementId = elementeArray[elementeNr][1];
				if(elementId == werIstEs){
					sollGemachtWerden = true;
				}
			}
		}
		if(sollGemachtWerden == false){
			return true;
		}
	}
}

CB.CanvasElemente.MalDieBilder = function(modusMalDieBilder, werIstEs) {
	const charakterBild = faktuellerCharakter().Bild;
	const charakterBildAnzahl = charakterBild.Anzahl;
	const charakterBildBestandteile = charakterBild.Bestandteile;
	const charakterArray = faktuellerCharakter().WelcheGibtEs;
  	const width = faktuellerCharakter().Bild.Width;
  	const height = faktuellerCharakter().Bild.Height;
  	if (!CB.GegnerSchablone.LadePruefung[AktuelleCharakter].Geladen) {
	  	for (let charakterNr in charakterArray) {
		  	var id = 'Canvas' + charakterArray[charakterNr][0];
		  	createCanvasElement('AllerErstellungsCanvassesContainer', id, '', width, height);
	  	}
	  	CB.GegnerSchablone.LadePruefung[AktuelleCharakter].Geladen = true;
  	}
  	var pruefungStatus = CB.CanvasElemente.MalDieBilderModusPruefung(modusMalDieBilder, werIstEs);
	if(pruefungStatus == true){
		return;
	}
	if(modusMalDieBilder == "Alle" || modusMalDieBilder == "AlleWoDerStempelIst"){
		for(let charakterNr in charakterArray){
			const array = charakterArray[charakterNr];
			const wer = 'Canvas' + array[0];
			const name = array[0];
			const id = wer;
			const canvas = $(id);
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			CB.CanvasElemente.Bauen(AktuelleCharakter, name, ctx);
		}
	}else{
		const wer = 'Canvas' + modusMalDieBilder[0] + modusMalDieBilder[1];
		const name = modusMalDieBilder[0] + modusMalDieBilder[1];
		const id = wer;
		const canvas = $(id);
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		CB.CanvasElemente.Bauen(AktuelleCharakter, name, ctx);
	}
	const canvasEndergebnisId = 'CanvasEndergebnis';
	createCanvasElement('AllerErstellungsCanvassesContainer', canvasEndergebnisId, '', width, height);
	const canvasEndergebnis = document.getElementById(canvasEndergebnisId);
 	const ctxEndergebnis = canvasEndergebnis.getContext('2d');
 	if(modusMalDieBilder == "Alle"||modusMalDieBilder == "AlleWoDerStempelIst"){
	 	for(let bildNr = 0; bildNr < charakterBildAnzahl; bildNr++){
			ctxEndergebnis.clearRect(0, 0, width, height);
			for(let bestandteileNr in charakterBildBestandteile){
				const teil = charakterBildBestandteile[bestandteileNr];
				ctxEndergebnis.drawImage($('Canvas'+teil+bildNr), 0, 0);
			}
		 	$('Bild' + bildNr + 'Bild').src = $('CanvasEndergebnis').toDataURL();
	 		for(let bestandteileNr in charakterBildBestandteile){
		 		const teil = charakterBildBestandteile[bestandteileNr];
	 			ctxEndergebnis.clearRect(0, 0, width, height);
		 		ctxEndergebnis.drawImage($('Canvas' + teil + bildNr), 0, 0);
		 		$('Bild' + bildNr + teil + 'Bild').src = $('CanvasEndergebnis').toDataURL();
	 		}
 		}
 	}
 	else{
 		ctxEndergebnis.clearRect(0, 0, width, height);
 		for(let bestandteileNr in charakterBildBestandteile){
 			const teil = charakterBildBestandteile[bestandteileNr];
 			ctxEndergebnis.drawImage($('Canvas' + teil + modusMalDieBilder[1]), 0, 0);
 		}
 		$('Bild' + modusMalDieBilder[1] + 'Bild').src = $('CanvasEndergebnis').toDataURL();
 		ctxEndergebnis.clearRect(0, 0, width, height);
 		ctxEndergebnis.drawImage($('Canvas'+modusMalDieBilder[0]+modusMalDieBilder[1]), 0, 0);
 		$('Bild' + modusMalDieBilder[1] + modusMalDieBilder[0] + 'Bild').src = $('CanvasEndergebnis').toDataURL();
 	}
};

CB.CanvasElemente.Bauen = function(charakterId, teil, ctx){
	const elementeArray = CB.GegnerSchablone[charakterId][teil].CanvasElemente.Alle;
	for(let elementNr in elementeArray){
		const array = elementeArray[elementNr];
		const elementId = array[0];
		let textVary = "";
		for(let elementNr in CB.Daten.SchummelArray[elementId]){
			if(elementNr > 0){
				textVary += "'" + array[elementNr] + "'";
  				if(elementNr<CB.Daten.SchummelArray[elementId].length - 1){
  					textVary += ",";
  				}
			}
		}
		eval("CB.CanvasElemente[elementId](ctx, " + textVary + ");");
	}
};
  	
CB.CanvasElemente.Linie = function (wer, x, y, x2, y2, rotation, borderWidth, borderColor, position) {
    const werte = CB.CanvasElemente.FarbenSetzer("", borderColor);
    const rgbaVary = werte[0];
    const borderColorVary = werte[1];
    const kleinstesX = Math.min(x, x2);
    const groesstesX = Math.max(x, x2);
    const kleinstesY = Math.min(y, y2);
    const groesstesY = Math.max(y, y2);
    const translateX = (kleinstesX + groesstesX) / 2;
    const translateY = (kleinstesY + groesstesY) / 2;
    wer.translate(translateX, translateY);
    wer.rotate(rotation);
    wer.translate(-translateX, -translateY);
    wer.beginPath();
    wer.moveTo(x, y);
    wer.lineTo(x2, y2);
    wer.strokeStyle = borderColorVary;
    wer.lineWidth = borderWidth;
    wer.stroke();
    wer.closePath();
    wer.resetTransform();
};

CB.CanvasElemente.Kurve = function (wer, x, y, x2, y2, b1, b2, c1, c2, rotation, borderWidth, borderColor, position) {
    const werte = CB.CanvasElemente.FarbenSetzer("", borderColor);
    const rgbaVary = werte[0];
    const borderColorVary = werte[1];
    const kleinstesX = Math.min(x, x2);
    const groesstesX = Math.max(x, x2);
    const kleinstesY = Math.min(y, y2);
    const groesstesY = Math.max(y, y2);
    const translateX = (kleinstesX + groesstesX) / 2;
    const translateY = (kleinstesY + groesstesY) / 2;
    wer.translate(translateX, translateY);
    wer.rotate(rotation);
    wer.translate(-translateX, -translateY);
    wer.strokeStyle = borderColorVary;
    wer.lineWidth = borderWidth;
    wer.beginPath();
    wer.moveTo(x, y);
    wer.bezierCurveTo(b1, b2, c1, c2, x2, y2);
    wer.stroke();
    wer.resetTransform();
};

CB.CanvasElemente.FarbEllipse = function (wer, rgba, x, y, w, h, rotation, borderWidth, borderColor, position) {
    const werte = CB.CanvasElemente.FarbenSetzer(rgba, borderColor);
    const rgbaVary = werte[0];
    const borderColorVary = werte[1];
    wer.beginPath();
    wer.fillStyle = rgbaVary;
    wer.ellipse(x, y, w, h, rotation, 0, 2 * Math.PI, true);
    wer.closePath();
    wer.fill();
    CB.Farben.Fuellungen.MachDieFuellungen(wer, rgba);
    wer.strokeStyle = borderColorVary;
    wer.lineWidth = borderWidth;
    wer.stroke();
    wer.resetTransform();
};

CB.CanvasElemente.Stempel = function (wer, id, x, y, scaleX, scaleY, skewX, skewY, rotation, position) {
    wer.resetTransform();
    wer.transform(scaleX, skewX, skewY, scaleY, x, y);
    const translateX = faktuellerCharakter().Bild.Width / 2;
    const translateY = faktuellerCharakter().Bild.Height / 2;
    wer.translate(translateX, translateY);
    wer.rotate(rotation);
    wer.translate(-translateX, -translateY);
    wer.drawImage($(id + "Canvas"), 0, 0);
    wer.resetTransform();
};

CB.CanvasElemente.FarbPoligon = function (wer, rgba, x, y, Array, rotation, borderWidth, borderColor, position) {
    wer.translate(x, y);
    const werte = CB.CanvasElemente.FarbenSetzer(rgba, borderColor);
    const rgbaVary = werte[0];
    const borderColorVary = werte[1];
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const polygonArray = faktuellerCharakter().Polygone.WelcheGibtEs;
    for (const polygonNr in polygonArray) {
        if (Array == polygonArray[polygonNr][0][1]) {
            Array = polygonArray[polygonNr][6][1];
        }
    }
    for (let i = 0; i < Array.length; i++) {
        if (i % 2 === 0) {
            minX = Math.min(minX, Array[i].x);
            maxX = Math.max(maxX, Array[i].x);
        } else {
            minY = Math.min(minY, Array[i].y);
            maxY = Math.max(maxY, Array[i].y);
        }
    }
    const translateX = (minX + maxX) / 2;
    const translateY = (minY + maxY) / 2;
    wer.translate(translateX, translateY);
    wer.rotate(rotation);
    wer.translate(-translateX, -translateY);
    wer.beginPath();
    wer.fillStyle = rgbaVary;
    wer.moveTo(Array[0].x, Array[0].y);
    for (let item = 1; item < Array.length; item++) {
        wer.lineTo(Array[item].x, Array[item].y);
    }
    wer.closePath();
    wer.fill();
    CB.Farben.Fuellungen.MachDieFuellungen(wer, rgba);
    wer.strokeStyle = borderColorVary;
    wer.lineWidth = borderWidth;
    wer.stroke();
    wer.resetTransform();
};

CB.CanvasElemente.FarbKreis = function (wer, rgba, x, y, radius, borderWidth, borderColor, position) {
    const werte = CB.CanvasElemente.FarbenSetzer(rgba, borderColor);
    const rgbaVary = werte[0];
    const borderColorVary = werte[1];
    wer.beginPath();
    wer.fillStyle = rgbaVary;
    wer.arc(x, y, radius, 0, 2 * Math.PI);
    wer.fill();
    CB.Farben.Fuellungen.MachDieFuellungen(wer, rgba);
    wer.strokeStyle = borderColorVary;
    wer.lineWidth = borderWidth;
    wer.stroke();
    wer.closePath();
    wer.resetTransform();
};

CB.CanvasElemente.FarbStern = function (wer, rgba, x, y, radius, spitzen, rotation, borderWidth, borderColor, position) {
    const werte = CB.CanvasElemente.FarbenSetzer(rgba, borderColor);
    const rgbaVary = werte[0];
    const borderColorVary = werte[1];
    const translateX = x * 1;
    const translateY = y * 1;
    wer.translate(translateX, translateY);
    wer.rotate(rotation);
    wer.translate(-translateX, -translateY);
    wer.strokeStyle = borderColorVary;
    wer.lineWidth = borderWidth;
    const points = spitzen || 5;
    wer.fillStyle = rgbaVary;
    wer.beginPath();
    wer.moveTo(x * 1, y * 1 + radius * 1);
    for (let i = 0; i < 2 * points + 1; i++) {
        const r = (i % 2 == 0) ? radius : radius / 2;
        const a = Math.PI * i / points;
        wer.lineTo(x * 1 + r * Math.sin(a), y * 1 + r * Math.cos(a));
    };
    wer.closePath();
    wer.fill();
    CB.Farben.Fuellungen.MachDieFuellungen(wer, rgba);
    wer.stroke();
    wer.resetTransform();
}

CB.CanvasElemente.FarbRechteck = function (wer, rgba, x, y, w, h, rotation, borderWidth, borderColor, position) {
    const werte = CB.CanvasElemente.FarbenSetzer(rgba, borderColor);
    const rgbaVary = werte[0];
    const borderColorVary = werte[1];
    const translateX = x * 1 + (w / 2) * 1;
    const translateY = y * 1 + (h / 2) * 1;
    wer.translate(translateX, translateY);
    wer.rotate(rotation);
    wer.translate(-translateX, -translateY);
    wer.beginPath();
    wer.fillStyle = rgbaVary;
    wer.fillRect(x, y, w, h);
    wer.closePath();
    wer.beginPath();
    wer.moveTo(x, y);
    wer.lineTo(x, y * 1 + h * 1);
    wer.lineTo(x * 1 + w * 1, y * 1 + h * 1);
    wer.lineTo(x * 1 + w * 1, y);
    wer.closePath();
    CB.Farben.Fuellungen.MachDieFuellungen(wer, rgba);
    wer.strokeStyle = borderColorVary;
    wer.lineWidth = borderWidth;
    wer.strokeRect(x, y, w, h);
    wer.closePath();
    wer.resetTransform();
};

CB.CanvasElemente.FarbenSetzer = function(rgba, borderColor){
	let rgbaVary;
	let borderColorVary;
	const farben = faktuellerCharakter().Farben.WelcheGibtEs;
	farben.forEach(array => {
	    if (array.some(color => color === rgba)) {
	        rgbaVary = CB.Farben.AlleFarben[array[0]].GibDieFarbeRaus();
	    }
	    if (array.some(color => color === borderColor)) {
	        borderColorVary = CB.Farben.AlleFarben[array[0]].GibDieFarbeRaus();
	    }
	});
	const werte = [rgbaVary, borderColorVary]
	return werte; 
}

CB.CanvasElemente.StempelAktualisieren = function(id, data){
	const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	const canvas = $(id + "Canvas");
	const width = faktuellerCharakter().Bild.Width;
	const height = faktuellerCharakter().Bild.Height;
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,width,height);
	CB.CanvasElemente["StempelSpeichert"](ctx, id, 0, 0, 1, 1, 0, 0, 0, 0);
}

CB.CanvasElemente.StempelInit = function(){
	StempelCanvasElementContainer.innerHTML = "";
	const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	for(let stempelNr in stempelArray){
		const array = stempelArray[stempelNr];
		const id = array[0];
		const width = faktuellerCharakter().Bild.Width;
		const height = faktuellerCharakter().Bild.Height;
		const canvas = createCanvasElement('StempelCanvasElementContainer', id + "Canvas", "bild", width, height);
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,width,height);
		CB.CanvasElemente["StempelSpeichert"](ctx, id, 0, 0, 1, 1, 0, 0, 0, 0);
	}
}

CB.CanvasElemente.StempelSpeichert = function (wer, id, x, y, scaleX, scaleY, skewX, skewY, rotation, position){
	const stempelArray = faktuellerCharakter().Stempel.WelcheGibtEs;
	for(let stempelNr in stempelArray){
		const stempel = stempelArray[stempelNr];
		const stempelId = stempel[0];
		const stempelData = stempel[1];
		if(id == stempelId){
			for(let dataElementNr in stempelData){
				const dataElement = stempelData[dataElementNr];
				const elementId = dataElement[0];
				if(elementId == "FarbKreis"){
					const rgbaWert = dataElement[1];
					const xWert = dataElement[2];
					const yWert = dataElement[3];
					const radius = dataElement[4];
					const borderWidth = dataElement[5];
					const borderColor = dataElement[6];
					CB.CanvasElemente[elementId](wer, rgbaWert, xWert, yWert, radius, borderWidth, borderColor);
				}else
				if(elementId == "FarbRechteck"){
					const rgbaWert = dataElement[1];
					const xWert = dataElement[2];
					const yWert = dataElement[3];
					const w = dataElement[4];
					const h = dataElement[5];
					const rotationWert = dataElement[6];
					const borderWidth = dataElement[7];
					const borderColor = dataElement[8];
					CB.CanvasElemente[elementId](wer, rgbaWert, xWert, yWert, w, h, rotationWert, borderWidth, borderColor);
				}else
				if(elementId == "FarbStern"){
					const rgbaWert = dataElement[1];
					const xWert = dataElement[2];
					const yWert = dataElement[3];
					const radius = dataElement[4];
					const spitzen = dataElement[5];
					const rotationWert = dataElement[6];
					const borderWidth = dataElement[7];
					const borderColor = dataElement[8];
					CB.CanvasElemente[elementId](wer, rgbaWert, xWert, yWert, radius, spitzen, rotationWert, borderWidth, borderColor);
				}else
				if(elementId == "FarbEllipse"){
					const rgbaWert = dataElement[1];
					const xWert = dataElement[2];
					const yWert = dataElement[3];
					const w = dataElement[4];
					const h = dataElement[5];
					const rotationWert = dataElement[6];
					const borderWidth = dataElement[7];
					const borderColor = dataElement[8];
					CB.CanvasElemente[elementId](wer, rgbaWert, xWert, yWert, w, h, rotationWert, borderWidth, borderColor);
				}else
				if(elementId == "Stempel"){
					const x = dataElement[2];
					const y = dataElement[3];
					const scaleX = dataElement[4];
					const scaleY = dataElement[5];
					const skewX = dataElement[6];
					const skewY = dataElement[7];
					const rotation = dataElement[8];
					wer.resetTransform();
					wer.transform(scaleX, skewX, skewY, scaleY, x, y);
					const translateX = faktuellerCharakter().Bild.Width/2;
					const translateY = faktuellerCharakter().Bild.Height/2;
					wer.translate(translateX, translateY);
					wer.rotate(rotation);
					wer.translate(-translateX, -translateY);
					wer.drawImage($(dataElement[1] + 'Canvas'),  0,  0)
					wer.resetTransform();
				}else
				if(elementId == "Linie"){
					const xWert = dataElement[1];
					const yWert = dataElement[2];
					const xWert2 = dataElement[3];
					const yWert2 = dataElement[4];
					const rotationWert = dataElement[5];
					const borderWidth = dataElement[6];
					const borderColor = dataElement[7];
					CB.CanvasElemente[elementId](wer, xWert, yWert, xWert2, yWert2, rotationWert, borderWidth, borderColor);
				}else
				if(elementId == "Kurve"){
					const xWert = dataElement[1];
					const yWert = dataElement[2];
					const xWert2 = dataElement[3];
					const yWert2 = dataElement[4];
					const b1 = dataElement[5];
					const b2 = dataElement[6];
					const c1 = dataElement[7];
					const c2 = dataElement[8];
					const rotationWert = dataElement[9];
					const borderWidth = dataElement[10];
					const borderColor = dataElement[11];
					CB.CanvasElemente[elementId](wer, xWert, yWert, xWert2, yWert2, b1, b2, c1, c2, rotationWert, borderWidth, borderColor);
				}else
				if(elementId == "FarbPoligon"){
					const rgbaWert = dataElement[1];
					const xWert = dataElement[2];
					const yWert = dataElement[3];
					const Array = dataElement[4];
					const rotationWert = dataElement[5];
					const borderWidth = dataElement[6];
					const borderColor = dataElement[7];
					CB.CanvasElemente[elementId](wer, rgbaWert, xWert, yWert, Array, rotationWert, borderWidth, borderColor);
				}
			}
		}
	}
}