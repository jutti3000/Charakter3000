CB.Daten = {};	
CB.Daten.Struktur = {};

CB.Daten.Struktur.WelcheGibtEs = [
		"FarbEllipse", 
		"Stempel", 
		"FarbKreis", 
		"FarbRechteck", 
		"FarbStern", 
		"FarbPoligon", 
		"Linie", 
		"Kurve"
	];
	
CB.Daten.SchummelArray = {
	FarbEllipse: [
		["Element", "Typ"], 
		["RGBAWert", "Farbe"], 
		["XWert", "XWert"], 
		["YWert", "YWert"], 
		["WWert", "Breite"], 
		["HWert", "Hoehe"], 
		["RotationWert", "Rotation"], 
		["BorderWidthWert", "Rand"], 
		["BorderColorWert", "RFarbe"]
	], 
	Linie: [
		["Element", "Typ"], 
		["XWert", "XWert"], 
		["YWert", "YWert"], 
		["X2Wert", "X2Wert"], 
		["Y2Wert", "Y2Wert"], 
		["RotationWert", "Rotation"], 
		["BorderWidthWert", "Rand"], 
		["BorderColorWert", "RFarbe"]
	], 
	Kurve: [
		["Element", "Typ"], 
		["XWert", "XWert"], 
		["YWert", "YWert"], 
		["X2Wert", "X2Wert"], 
		["Y2Wert", "Y2Wert"], 
		["B1Wert", "B1Wert"], 
		["B2Wert", "B2Wert"], 
		["C1Wert", "C1Wert"], 
		["C2Wert", "C2Wert"], 
		["RotationWert", "Rotation"], 
		["BorderWidthWert", "Rand"], 
		["BorderColorWert", "RFarbe"]
	], 
	FarbPoligon: [
		["Element", "Typ"], 
		["RGBAWert", "Farbe"], 
		["XWert", "XWert"], 
		["YWert", "YWert"], 
		["ArrayWert", "Array"], 
		["RotationWert", "Rotation"], 
		["BorderWidthWert", "Rand"], 
		["BorderColorWert", "RFarbe"]
	], 
	FarbRechteck: [
		["Element", "Typ"], 
		["RGBAWert", "Farbe"], 
		["XWert", "XWert"], 
		["YWert", "YWert"], 
		["WWert", "Breite"], 
		["HWert", "Hoehe"], 
		["RotationWert", "Rotation"], 
		["BorderWidthWert", "Rand"], 
		["BorderColorWert", "RFarbe"]
	], 
	FarbStern: [
		["Element", "Typ"], 
		["RGBAWert", "Farbe"], 
		["XWert", "XWert"], 
		["YWert", "YWert"], 
		["RadiusWert", "Radius"], 
		["SpitzenWert", "Spitzen"], 
		["RotationWert", "Rotation"], 
		["BorderWidthWert", "Rand"], 
		["BorderColorWert", "RFarbe"]
	], 
	FarbKreis: [
		["Element", "Typ"], 
		["RGBAWert", "Farbe"], 
		["XWert", "XWert"], 
		["YWert", "YWert"], 
		["WWert", "Breite"], 
		["BorderWidthWert", "Rand"], 
		["BorderColorWert", "RFarbe"]
	], 
	Stempel: [
		["Element", "Typ"], 
		["IdWert", "Id"], 
		["XWert", "X"], 
		["YWert", "Y"], 
		["ScaleXWert", "ScaleX"], 
		["ScaleYWert", "scaleY"], 
		["SkewXWert", "skewX"], 
		["SkewYWert", "skewY"], 
		["RotationWert", "Rotation"]
	], 
	FuellungenRadial: [
		["X1Wert", "X1Wert"], 
		["Y1Wert", "Y1Wert"], 
		["Radius1Wert", "Radius1"], 
		["X2Wert", "X2Wert"], 
		["Y2Wert", "Y2Wert"], 
		["Radius2Wert", "Radius2"]
	], 
	FuellungenLinear: [
		["X1Wert", "X1Wert"], 
		["Y1Wert", "Y1Wert"], 
		["X2Wert", "X2Wert"], 
		["Y2Wert", "Y2Wert"]
	], 
	FuellungenPattern: [
		["ImageWert", "Image"], 
		["RepeatWert", "Repeat"], 
		["ScaleXWert", "ScaleX"], 
		["ScaleYWert", "ScaleY"], 
		["TranslateXWert", "TranslateX"], 
		["TranslateYWert", "TranslateY"], 
		["OpacityWert", "Opacity"], 
		["RotateWert", "Rotate"]
	], 
	Timestop: [
		["Nr", "Nummer"], 
		["RgbaWert", "rgbaWert"]
	]
 };
	
CB.Daten.Struktur.Erstellen = function(element){
	const strukturElement = CB.Daten.Struktur[element];
	const strukturElementArray = strukturElement.WelcheGibtEs;
	for(const elementNr in strukturElementArray){
		const elementArray = strukturElementArray[elementNr];
		const elementId = elementArray[0];
		const type = elementArray[1];
		const value = elementArray[2];
		const onChange = elementArray[3];
		const onClick = elementArray[4];
		const html = elementArray[5];
		const directory = strukturElement.ElementErstellen;
		directory[elementId] = {};
		const dataTarget = directory[elementId];
		dataTarget.Type = type;
		dataTarget.Value = value;
		dataTarget.Onchange = onChange;
		dataTarget.Onclick = onClick;
		dataTarget.EigenHTML = html;
	}
};

const strukturArray = CB.Daten.Struktur.WelcheGibtEs;
for(let strukturElementNr in strukturArray){
	const elementId = strukturArray[strukturElementNr];
	CB.Daten.Struktur[elementId] = {};
}

	
CB.Daten.Struktur.FarbEllipse.WelcheGibtEs = [
	['Element', 'input', 'FarbEllipse', '', '', ''], 
	['XWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'xWert'], 
	['YWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'yWert'], 
	['WWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['WWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeWWert").select()', 'wWert'], 
	['HWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['HWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeHWert").select()', 'hWert'], 
	['RotationWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RotationWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRotationWert").select()', 'Rotation'], 
	['RGBAWert', 'input', 'Weiss', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RGBAWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRGBAWert").select()', 'Farbe'], 
	['BorderWidthWert', 'input', '2', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderWidthWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderWidthWert").select()', 'Rand'], 
	['BorderColorWert', 'input', 'Schwarz', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderColorWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderColorWert").select()', 'RFarbe'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];

CB.Daten.Struktur.Stempel.WelcheGibtEs = [
	['Element', 'input', 'Stempel', '', '', ''], 
	['IdWert', 'input', "Stempel0", 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['IdWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'id'], 
	['XWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'X'], 
	['YWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'Y'], 
	['ScaleXWert', 'input', 1, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['ScaleXWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'ScaleX'], 
	['ScaleYWert', 'input', 1, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['ScaleYWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'scaleY'], 
	['SkewXWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['SkewXWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'SkewX'], 
	['SkewYWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['SkewYWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'SkewY'], 
	['RotationWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RotationWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRotationWert").select()', 'Rotation'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];

CB.Daten.Struktur.Linie.WelcheGibtEs = [
	['Element', 'input', 'Linie', '', '', ''], 
	['XWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 4, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'xWert'], 
	['YWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 4, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'yWert'], 
	['X2Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['X2WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeWWert").select()', 'x2Wert'], 
	['Y2Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['Y2WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeHWert").select()', 'y2Wert'], 
	['RotationWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RotationWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRotationWert").select()', 'Rotation'], 
	['BorderWidthWert', 'input', '2', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderWidthWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderWidthWert").select()', 'Rand'], 
	['BorderColorWert', 'input', 'Schwarz', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderColorWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderColorWert").select()', 'RFarbe'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];

CB.Daten.Struktur.Kurve.WelcheGibtEs = [
	['Element', 'input', 'Kurve', '', '', ''], 
	['XWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 4, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'xWert'], 
	['YWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 4, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'yWert'], 
	['X2Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['X2WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeWWert").select()', 'x2Wert'], 
	['Y2Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['Y2WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeHWert").select()', 'y2Wert'], 
	['B1Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 4, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['B1WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'b1Wert'], 
	['B2Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 4, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['B2WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'b2Wert'], 
	['C1Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['C1WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeWWert").select()', 'c1Wert'], 
	['C2Wert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['C2WertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeHWert").select()', 'c2Wert'], 
	['RotationWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RotationWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRotationWert").select()', 'Rotation'], 
	['BorderWidthWert', 'input', '2', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderWidthWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderWidthWert").select()', 'Rand'], 
	['BorderColorWert', 'input', 'Schwarz', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderColorWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderColorWert").select()', 'RFarbe'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];

CB.Daten.Struktur.FarbPoligon.WelcheGibtEs = [
	['Element', 'input', 'FarbPoligon', '', '', ''], 
	['XWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'xWert'], 
	['YWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'yWert'], 
	['ArrayWert', 'input', ['Polygon4'], 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['ArrayWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeWWert").select()', 'Array'], 
	['RotationWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RotationWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRotationWert").select()', 'Rotation'], 
	['RGBAWert', 'input', 'Weiss', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RGBAWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRGBAWert").select()', 'Farbe'], 
	['BorderWidthWert', 'input', '2', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderWidthWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderWidthWert").select()', 'Rand'], 
	['BorderColorWert', 'input', 'Schwarz', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderColorWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderColorWert").select()', 'RFarbe'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];
	
CB.Daten.Struktur.FarbKreis.WelcheGibtEs = [
	['Element', 'input', 'FarbKreis', '', '', ''], 
	['XWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'xWert'], 
	['YWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'yWert'], 
	['WWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['WWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeWWert").select()', 'wWert'], 
	['RGBAWert', 'input', 'Weiss', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RGBAWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRGBAWert").select()', 'Farbe'], 
	['BorderWidthWert', 'input', '2', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderWidthWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderWidthWert").select()', 'Rand'], 
	['BorderColorWert', 'input', 'Schwarz', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderColorWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderColorWert").select()', 'RFarbe'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];

CB.Daten.Struktur.FarbRechteck.WelcheGibtEs = [
	['Element', 'input', 'FarbRechteck', '', '', ''], 
	['XWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'xWert'], 
	['YWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'yWert'], 
	['WWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['WWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeWWert").select()', 'wWert'], 
	['HWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['HWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeHWert").select()', 'hWert'], 
	['RotationWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RotationWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRotationWert").select()', 'Rotation'], 
	['RGBAWert', 'input', 'Weiss', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RGBAWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRGBAWert").select()', 'Farbe'], 
	['BorderWidthWert', 'input', '2', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderWidthWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderWidthWert").select()', 'Rand'], 
	['BorderColorWert', 'input', 'Schwarz', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderColorWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderColorWert").select()', 'RFarbe'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];

CB.Daten.Struktur.FarbStern.WelcheGibtEs = [
	['Element', 'input', 'FarbStern', '', '', ''], 
	['XWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['XWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeXWert").select()', 'xWert'], 
	['YWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Height / 2, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['YWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeYWert").select()', 'yWert'], 
	['RadiusWert', 'input', CB.GegnerSchablone[AktuelleCharakter].Bild.Width / 4, 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RadiusWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRadiusWert").select()', 'Radius'], 
	['SpitzenWert', 'input', '5', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['SpitzenWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeSpitzenWert").select()', 'Spitzen'], 
	['RotationWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RotationWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRotationWert").select()', 'Rotation'], 
	['RGBAWert', 'input', 'Weiss', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['RGBAWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeRGBAWert").select()', 'Farbe'], 
	['BorderWidthWert', 'input', '2', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderWidthWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderWidthWert").select()', 'Rand'], 
	['BorderColorWert', 'input', 'Schwarz', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['BorderColorWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigeBorderColorWert").select()', 'RFarbe'], 
	['PositionWert', 'input', '0', 'CB.ElementCreation.ZwischenzeichnungMachen()', '', ''], 
	['PositionWertLable', 'div', '', '', '$("ElementCreationContainerAnzeigePositionWert").select()', 'Position']
];

for(let strukturElementNr in strukturArray){
	const elementId = strukturArray[strukturElementNr];
	CB.Daten.Struktur[elementId].ElementErstellen = {};
	CB.Daten.Struktur.Erstellen(elementId);
}