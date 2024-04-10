/* ---CB.GegnerSchablone --- */

CB.GegnerSchablone = {};

CB.GegnerSchablone.CharakterWelcheGibtEs = [
	["TestFigur",400,400,8,["Beine","Arme","Koerper","Kopf"]],
	["NeueFigur",400,400,8,["Beine","Arme","Koerper","Kopf"]],
	["Schneemann",400,400,8,["Beine","Arme","Koerper","Kopf"]],
	["Testmann",400,400,16,["Beine","Arme","Koerper","Kopf"]],
  	["Taube",100,100,4,["Ab","Ac","Arme","Koerper","Kopf"]]
];

CB.GegnerSchablone.LadePruefung = {};
for(let charakterNr in CB.GegnerSchablone.CharakterWelcheGibtEs){
	const id = CB.GegnerSchablone.CharakterWelcheGibtEs[charakterNr][0];
	CB.GegnerSchablone.LadePruefung[id] = {};
	CB.GegnerSchablone.LadePruefung[id].Geladen = false;
}
CB.GegnerSchablone.FarbenErstellen = function(){
	for(let charakterNr in CB.GegnerSchablone.CharakterWelcheGibtEs){
		const charakterId = CB.GegnerSchablone.CharakterWelcheGibtEs[charakterNr][0];
		CB.Farben.Initialisieren(charakterId);
	}
}
CB.GegnerSchablone.PatternErstellen = function() {
  	const patternArray = CB.GegnerSchablone[AktuelleCharakter].Pattern.WelcheGibtEs;
  	for (const pattern of patternArray) {
	  	const canvasId = pattern[0];
	  	const canvasContainerId = "PatternCanvasContainer";
	  	createCanvasElement(canvasContainerId, canvasId, 'bild');
	  	CB.Pattern.Schablonen[pattern[1][0]].Bauen(canvasId, pattern[1][1]);
  	}
  	PatternContainer_TexturAendernInput.innerHTML = "";
  	const patternList = CB.Pattern.Schablonen.WelcheGibtEs;
  	for (const patternName of patternList) {
	  	const optionId = "Option" + patternName;
	  	createOptionElement('PatternContainer_TexturAendernInput', optionId, '', patternName, patternName);
  	}
};

let faktuellerCharakter = function(){
	return CB.GegnerSchablone[CB.AusgewaehlterCharakter];
}

CB.GegnerSchablone.CharakterInit = function() {
	for (const char of CB.GegnerSchablone.CharakterWelcheGibtEs) {
		const typ = char[0];
		CB.GegnerSchablone[typ] = {};
		const charData = CB.GegnerSchablone[typ];
		charData.Bild = {
			Width: char[1],
			Height: char[2],
			Anzahl: char[3],
			Bestandteile: char[4]
		};
		charData.Farben = { WelcheGibtEs: [] };
		charData.Stempel = { WelcheGibtEs: [] };
		charData.Pattern = { WelcheGibtEs: [] };
		charData.Polygone = { WelcheGibtEs: [] };
		charData.WelcheGibtEs = [];
		let stellenCounter = 0;
		for (const part of charData.Bild.Bestandteile) {
			for (let i = 0; i < charData.Bild.Anzahl; i++) {
				charData.WelcheGibtEs[stellenCounter] = [part + i, `Bild${i}${part}`];
				stellenCounter++;
			}
		}
		for (const entry of charData.WelcheGibtEs) {
			const name = entry[0];
			charData[name] = {
				CanvasElemente: { Alle: [] }
			};
		}
	}
};

CB.GegnerSchablone.CharakterInit();
	
CB.GegnerSchablone.Schneemann.Polygone.WelcheGibtEs=[];
CB.GegnerSchablone.Schneemann.Farben.WelcheGibtEs=[["Arm","rgba(225,225,225,1)",[]],["Auge","rgba(12,12,12,1)",[]],["Hand","rgba(255,255,255,1)",[]],["Hut","rgba(80,80,80,1)",[]],["Knopf","rgba(20,20,20,1)",[]],["Koerper","rgba(200,200,200,1)",[]],["Koerper2","rgba(160,160,160,1)",[]],["Kopf","rgba(245,245,245,1)",[]],["Leer","rgba(0,0,0,0)",[]],["Nase","rgba(200,72,2,1)",[]],["Schwarz","rgba(0,0,0,1)",[]],["Weiss","rgba(255,255,255,1)",[]],["farbe5","rgba(23,23,23,1)",[]]];
CB.GegnerSchablone.Schneemann.Stempel.WelcheGibtEs=[["StempelKopf",[["FarbEllipse","Nase","200","105","20","40","0","2","Schwarz"],["FarbEllipse","Kopf","200","200","90","90","0","2","Schwarz"],["FarbEllipse","Auge","150","130","17","17","0","2","Schwarz"],["FarbEllipse","Auge","250","130","17","17","0","2","Schwarz"]]]];
CB.GegnerSchablone.Schneemann.Pattern.WelcheGibtEs=[["Namek",["Zufall","rgba(0,0,0,1)"]]];
CB.GegnerSchablone.Schneemann.Beine0.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","200","150","150",0,2,"Schwarz"],["FarbEllipse","Knopf","200","55","5","5","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Beine1.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","200","162","162",0,2,"Schwarz"],["FarbEllipse","Knopf","200","50","7","7","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Beine2.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","200","175","175",0,2,"Schwarz"],["FarbEllipse","Knopf","200","60","8","8","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Beine3.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","200","190","190",0,2,"Schwarz"],["FarbEllipse","Knopf","200","50","10","10","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Beine4.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","200","190","190",0,2,"Schwarz"],["FarbEllipse","Knopf","200","60","13","13","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Beine5.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","170","170","170",0,2,"Schwarz"],["FarbEllipse","Knopf","200","40","10","10","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Beine6.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","180","150","150",0,2,"Schwarz"],["FarbEllipse","Knopf","200","50","7","7","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Beine7.CanvasElemente.Alle=[["FarbEllipse","Koerper2","200","190","150","150",0,2,"Schwarz"],["FarbEllipse","Knopf","200","50","5","5","0","2","Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme0.CanvasElemente.Alle=[["FarbEllipse","Hand","100","155","15","15",0,2,"Schwarz"],["FarbEllipse","Hand","300","155","15","15",0,2,"Schwarz"],["FarbEllipse","Arm","100",200,"20","50",0,2,"Schwarz"],["FarbEllipse","Arm","300",200,"20","50",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme1.CanvasElemente.Alle=[["FarbEllipse","Hand","90","140","20","20",0,2,"Schwarz"],["FarbEllipse","Hand","310","140","20","20",0,2,"Schwarz"],["FarbEllipse","Arm","95","190","25","60","-0.1",2,"Schwarz"],["FarbEllipse","Arm","305","190","25","60","0.1",2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme2.CanvasElemente.Alle=[["FarbEllipse","Hand","65","120","25","25",0,2,"Schwarz"],["FarbEllipse","Hand","335","120","25","25",0,2,"Schwarz"],["FarbEllipse","Arm","75","180","30","70","-0.15",2,"Schwarz"],["FarbEllipse","Arm","325","180","30","70","0.15",2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme3.CanvasElemente.Alle=[["FarbEllipse","Hand","50","115",30,30,0,2,"Schwarz"],["FarbEllipse","Hand","350","115",30,30,0,2,"Schwarz"],["FarbEllipse","Arm","55","180",40,"75","-0.08",2,"Schwarz"],["FarbEllipse","Arm","345","180",40,"75","0.08",2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme4.CanvasElemente.Alle=[["FarbEllipse","Hand","60","80",30,30,0,2,"Schwarz"],["FarbEllipse","Hand","340","80",30,30,0,2,"Schwarz"],["FarbEllipse","Arm","55","170",40,"100",0,2,"Schwarz"],["FarbEllipse","Arm","345","170",40,"100",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme5.CanvasElemente.Alle=[["FarbEllipse","Hand","90","110",30,30,0,2,"Schwarz"],["FarbEllipse","Hand","310","110",30,30,0,2,"Schwarz"],["FarbEllipse","Arm","75","170",40,70,"0.15",2,"Schwarz"],["FarbEllipse","Arm","325","170",40,70,"-0.15",2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme6.CanvasElemente.Alle=[["FarbEllipse","Hand","105","145","15","15",0,2,"Schwarz"],["FarbEllipse","Hand","295","145","15","15",0,2,"Schwarz"],["FarbEllipse","Arm","100","200","20","55","0.1",2,"Schwarz"],["FarbEllipse","Arm","300","200","20","55","-0.1",2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Arme7.CanvasElemente.Alle=[["FarbEllipse","Hand","100","155","15","15",0,2,"Schwarz"],["FarbEllipse","Hand","300","155","15","15",0,2,"Schwarz"],["FarbEllipse","Arm","100","200","20","50",0,2,"Schwarz"],["FarbEllipse","Arm","300","200","20","50",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper0.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","200","100","100",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper1.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","180","115","115",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper2.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","170","130","130",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper3.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","160","140","140",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper4.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","180","140","140",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper5.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","200","120","120",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper6.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","220","100","100",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Koerper7.CanvasElemente.Alle=[["FarbEllipse","Koerper","200","200","100","100",0,2,"Schwarz"]];
CB.GegnerSchablone.Schneemann.Kopf0.CanvasElemente.Alle=[["Stempel","StempelKopf","60","40","0.7","0.7","0","0","0"]];
CB.GegnerSchablone.Schneemann.Kopf1.CanvasElemente.Alle=[["Stempel","StempelKopf","60","40","0.7","0.7","0","0","0"]];
CB.GegnerSchablone.Schneemann.Kopf2.CanvasElemente.Alle=[["Stempel","StempelKopf","40","-10","0.8","0.8","0","0","0"]];
CB.GegnerSchablone.Schneemann.Kopf3.CanvasElemente.Alle=[["Stempel","StempelKopf","-20","-50","1.1","1.1","0","0","0"]];
CB.GegnerSchablone.Schneemann.Kopf4.CanvasElemente.Alle=[["Stempel","StempelKopf","0","-30","1","1","0","0","0"]];
CB.GegnerSchablone.Schneemann.Kopf5.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Schneemann.Kopf6.CanvasElemente.Alle=[["Stempel","StempelKopf","60","80","0.7","0.7","0","0","0"]];
CB.GegnerSchablone.Schneemann.Kopf7.CanvasElemente.Alle=[["Stempel","StempelKopf","70","80","0.65","0.65","0","0","0"]];

CB.GegnerSchablone.TestFigur.Farben.WelcheGibtEs=[["Gesicht","rgba(210,140,118,1)",[["Radial",["200","200","1","200","200","120"],[["0","rgba(240,220,20,0)"],["1","rgba(0,0,0,0.5)"]]]]],["Haar","rgba(195,175,5,1)",[["Radial",["150","150","1","150","150","300"],[["0","rgba(230,220,230,0.5)"],["1","rgba(0,0,0,0)"]]],["Pattern",["PatternWelle","repeat","1","2","0","0","1","0.1"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","23","23","0","0","0.5","0"]],["Linear",["100","200","300","200"],[["0","rgba(20,45,20,0.5)"],["0.5","rgba(0,0,0,0)"],["1","rgba(20,45,20,0.5)"]]],["Radial",["200","200","1","200","200","70"],[["0","rgba(170,120,0,0)"],["1","rgba(80,220,0,0.6)"]]]]],["HandFarbe","rgba(210,140,118,1)",[["Radial",["200","200","1","200","200","70"],[["0","rgba(170,0,0,0)"],["1","rgba(0,0,0,1)"]]]]],["Haut","rgba(210,140,118,1)",[]],["Hose1","rgba(146,146,0,1)",[]],["Hose2","rgba(156,156,0,1)",[]],["Leer","rgba(0,0,0,0)",[]],["Oberteil1","rgba(122,125,255,1)",[["Linear",["0","200","400","200"],[["0","rgba(120,120,250,0.7)"],["0.5","rgba(0,0,250,5)"],["1","rgba(120,120,250,0.7)"]]],["Pattern",["PatternOberteil","repeat","0.4","0.4","0","0","1","0.6"]],["Pattern",["PatternOberteil","repeat","0.4","0.4","0","0","1","-0.6"]],["Radial",["200","200","1","200","200","200"],[["0","rgba(120,120,170,0.7)"],["1","rgba(250,0,0,0)"]]]]],["Oberteil2","rgba(122,55,200,1)",[["Radial",["200","200","1","200","200","100"],[["0","rgba(250,250,250,0.7)"],["1","rgba(10,30,180,1)"]]],["Radial",["200","200","40","200","200","180"],[["0","rgba(20,40,0,0.7)"],["1","rgba(232,220,220,0)"]]]]],["Schnuersenkel","rgba(250,252,212,1)"],["Schuh","rgba(200,180,180,1)",[["Radial",["200","200","1","200","200","50"],[["0","rgba(20,50,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["SchulterAbzeichen","rgba(0,0,220,1)",[["Linear",["200","150","200","250"],[["0","rgba(170,120,0,0.7)"],["0.2","rgba(230,0,0,1)"],["0.4","rgba(0,230,0,1)"],["0.6","rgba(0,0,230,1)"],["0.8","rgba(0,230,230,1)"],["1","rgba(0,0,0,0)"]]],["Linear",["0","200","400","200"],[["0","rgba(170,120,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["Schwarz","rgba(0,0,0,1)",[]],["Weiss","rgba(255,255,255,1)",[]]];
CB.GegnerSchablone.TestFigur.Stempel.WelcheGibtEs=[["StempelHand",[["FarbEllipse","HandFarbe","200","200","17","30","0","2","Schwarz"],["FarbEllipse","HandFarbe","210","185","8","17","0.2","2","Schwarz"],["FarbEllipse","HandFarbe","200","164","7","16","0.5","2","Schwarz"]]],["StempelKoerper",[["FarbEllipse","Oberteil1","200","200","160","70","0","6","Schwarz"],["FarbRechteck","SchulterAbzeichen","55","170","14","60","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","70","165","14","70","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","85","160","14","80","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","100","155","14","90","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","285","155","14","90","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","300","160","14","80","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","315","165","14","70","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","330","170","14","60","0","2","Schwarz"],["FarbEllipse","Oberteil2","200","200","100","70","0","6","Schwarz"]]],["StempelKopf",[["FarbEllipse","Haut","210","124","8","10","0","2","Schwarz"],["FarbEllipse","Haut","190","124","8","10","0","2","Schwarz"],["FarbEllipse","Haut","200","118","10","12","0","4","Schwarz"],["FarbEllipse","Gesicht","200","200","70","80","0","4","Schwarz"],["FarbEllipse","Gesicht","228","134","24","8","0.5","2","Schwarz"],["FarbEllipse","Gesicht","172","134","24","8","-0.5","2","Schwarz"],["FarbEllipse","Schwarz","227","135","10","2","0.2","2","Schwarz"],["FarbEllipse","Schwarz","173","135","10","2","-0.2","2","Schwarz"],["FarbPoligon","Haar","0","0","Polygon4","0","4","Schwarz"]]],["StempelOberarm",[["FarbEllipse","Oberteil1","200","200","25","40","0","6","Schwarz"]]],["StempelSchuh",[["FarbEllipse","Schuh","200","200","30","50","0","6","Schwarz"],["Linie","190","180","210","180","0","2","Schnuersenkel"],["Linie","185","185","215","185","0","2","Schnuersenkel"],["Linie","180","195","220","195","0","2","Schnuersenkel"],["Linie","180","190","220","190","0","2","Schnuersenkel"],["Linie","200","150","200","250","0","2","Schwarz"]]],["StempelUnterarm",[["FarbEllipse","Oberteil1","200","200","25","40","0","6","Schwarz"]]],["Stempelzzz",[["FarbEllipse","Haut","200","200","200","200","0","2","Schwarz"],["Stempel","StempelHand","545","460","-1","-1","0","0","0"],["Stempel","StempelHand","-135","-40","1","1","0","0","0"],["Stempel","StempelOberarm","-135","-20","1","1.1","0","0","0"],["Stempel","StempelOberarm","145","-30","1","1.3","0","0","0"]]]];
CB.GegnerSchablone.TestFigur.Pattern.WelcheGibtEs=[["Namek",["Zufall","rgba(0,0,0,1)"]],["Pattern4",["Zufall","rgba(230,230,230,1)"]],["Pattern51",["Schachbrett","rgba(0,0,0,1)"]],["PatternHaar",["Zufall","rgba(83,60,23,1)"]],["PatternOberteil",["Streifen","rgba(0,0,0,1)"]],["PatternWelle",["Sinus","rgba(0,0,0,1)"]]];
CB.GegnerSchablone.TestFigur.Polygone.WelcheGibtEs=[[["id","Polygon4"],["LineWidth",6],["LineColor","#000000"],["FillColor","#00ff00"],["LineAlpha",1],["FillAlpha","0.5"],["Coordinates",[{"x":190.69857604230475,"y":168.07245445152404},{"x":201.2886709061286,"y":176.81107425845596},{"x":205.17028364964975,"y":160.51710964838827},{"x":214.28733823496478,"y":162.9408919273637},{"x":215.85756748224352,"y":151.5303449431678},{"x":226.46683905672606,"y":159.34180679726728},{"x":236.2336017043882,"y":140.444193265761},{"x":239.30324040523405,"y":155.4608944105757},{"x":248.69945672457655,"y":148.83431553160165},{"x":247.07266280165115,"y":155.77600106376187},{"x":254.80647605748658,"y":148.2351978845876},{"x":254.01190110632734,"y":156.42713454790913},{"x":263.35630312356204,"y":155.72416847227083},{"x":274.65087375686625,"y":155.4694468896301},{"x":268.5472695565357,"y":167.4069625890567},{"x":275.8883004461016,"y":173.32780464675054},{"x":274.18871439617527,"y":184.15357884812687},{"x":283.8893580800543,"y":185.66129587891305},{"x":274.3889821347529,"y":195.86964738326748},{"x":283.90201008886663,"y":195.51112448821493},{"x":279.84525532242105,"y":206.94872729202493},{"x":273.43288502286515,"y":216.53460964426},{"x":279.13138434142627,"y":223.35859261039656},{"x":270.87454570114943,"y":236.23336017978644},{"x":281.4181675583678,"y":249.15774926391225},{"x":268.56673455858544,"y":253.63916092500625},{"x":275.05876448757084,"y":265.0688410238892},{"x":270.36595860910165,"y":261.9929252808024},{"x":269.5624470879504,"y":278.54898808172004},{"x":266.274900647161,"y":287.1822781947373},{"x":252.12959348750894,"y":280.15425050606194},{"x":256.8736368076598,"y":301.4236949028235},{"x":241.20889890160902,"y":294.5867226506465},{"x":236.93945586285338,"y":288.043453258878},{"x":228.17073077954362,"y":298.61942925671127},{"x":225.50704743517994,"y":285.16751466006707},{"x":217.7887979135947,"y":292.32869396305733},{"x":211.5257540644612,"y":300.5326558893416},{"x":203.95656299420617,"y":291.67057796515564},{"x":188.9173729293017,"y":307.16215380814174},{"x":188.5464280313197,"y":293.23525789768814},{"x":180.8413309494844,"y":299.51810572723366},{"x":176.8717683830921,"y":293.2273704335791},{"x":172.28938030016434,"y":285.61309996841},{"x":166.4898355171438,"y":292.32869396305733},{"x":158.24535941771404,"y":297.12163513917426},{"x":148.78474097576347,"y":288.44968885372566},{"x":141.0064199203152,"y":296.52251749215935},{"x":137.56731288660498,"y":288.06490898669625},{"x":138.08365741148427,"y":280.8490703857025},{"x":150.06842207281633,"y":269.34840029894394},{"x":134.08474016222954,"y":271.11142574639456},{"x":139.11965181645246,"y":258.76392750438873},{"x":123.18574353350682,"y":259.9298876607467},{"x":126.781614573647,"y":250.54622212132992},{"x":117.05435653426753,"y":241.4553998973443},{"x":125.39668970103929,"y":236.02824975472004},{"x":131.33181420191164,"y":229.55048463167643},{"x":116.25634535280805,"y":224.62269787895744},{"x":125.6397469565598,"y":217.7328449382894},{"x":115.91514382844821,"y":205.75049199799594},{"x":124.33008610180207,"y":194.58023767853086},{"x":129.5376481728912,"y":188.7727523366401},{"x":123.84124392724702,"y":182.28505234688944},{"x":138.76983852231828,"y":174.59637435323285},{"x":134.18957402263513,"y":169.50387435360767},{"x":145.2592806085169,"y":167.74082417514893},{"x":134.80027595592617,"y":156.62284494279277},{"x":148.59764943174585,"y":159.12097219599227},{"x":144.26615592193804,"y":146.43784494354315},{"x":160.89439348604594,"y":144.04137435548472},{"x":173.87261044130432,"y":151.81488018072855},{"x":178.41763725416783,"y":144.37201653314443},{"x":188.1163401239729,"y":149.47428212981742}]],["CanvasWidth",400],["CanvasHeight",400]],[["id","Polygon2"],["LineWidth",6],["LineColor","#000000"],["FillColor","#00ffff"],["LineAlpha",1],["FillAlpha",1],["Coordinates",[{"x":90,"y":130},{"x":90,"y":100},{"x":310,"y":100},{"x":310,"y":130},{"x":180,"y":130},{"x":180,"y":370},{"x":220,"y":370},{"x":220,"y":130}]],["CanvasWidth",400],["CanvasHeight",400]],[["id","Polygon7"],["LineWidth",6],["LineColor","#000000"],["FillColor","#ffa617"],["LineAlpha",1],["FillAlpha","0.7"],["Coordinates",[{"x":227.5519936553632,"y":173.84902168318882},{"x":201.30718954248366,"y":143.94201246349877},{"x":247.6562122702713,"y":162.40482957916942},{"x":263.4794293521455,"y":147.61886674419378},{"x":274.8485286479735,"y":128.2252626402302},{"x":264.0522875816994,"y":101.62301976560545},{"x":319.7889141007966,"y":64.8610599902983},{"x":296.7680507668333,"y":111.41369446198902},{"x":322.3126663794204,"y":108.06080234902932},{"x":337.86276490075295,"y":121.10387341089672},{"x":332.29615644232473,"y":140.051695601652},{"x":326.8502459304706,"y":156.1538238243175},{"x":310.7332146490109,"y":172.51961008935046},{"x":298.6875116748322,"y":175.78090906085347},{"x":259.8115861626727,"y":204.68469306702752},{"x":269.3909118989397,"y":254.22570895118997},{"x":268.13151412676444,"y":278.5710841259618},{"x":287.7894979281193,"y":293.69005538075345},{"x":306.36671372448603,"y":310.22684413462395},{"x":317.7668564788802,"y":330.2070557308396},{"x":306.05152467702806,"y":347.06891875873873},{"x":288.6543999843499,"y":361.5308697317573},{"x":271.0317407322212,"y":370.6153856606227},{"x":257.45420063415537,"y":364.53963204289687},{"x":243.089706730687,"y":358.30187249419373},{"x":210.88804604399115,"y":307.38433740275076},{"x":171.04721616807083,"y":297.5422114927967},{"x":160.90095767167674,"y":277.41005293553485},{"x":145.93848754951523,"y":261.2073350135528},{"x":134.41764684854812,"y":244.0728173854265},{"x":128.6572264980641,"y":235.50555857136408},{"x":100.84623826262575,"y":233.47095667023856},{"x":81.26688192092865,"y":224.51933217462872},{"x":64.19529409523045,"y":215.26381375692603},{"x":45.79119455187484,"y":199.992895541088},{"x":41.846077705342964,"y":186.05826065280291},{"x":41.90400952595607,"y":165.97639694519884},{"x":48.33619924944378,"y":153.35792744460417},{"x":65.57055550863225,"y":150.75471116694678},{"x":83.20356258028215,"y":154.79480047147433},{"x":106.19833918995448,"y":160.75884300787976},{"x":130.55183667050215,"y":174.79406759548053},{"x":141.51677163969296,"y":172.95058612305633},{"x":153.76180002010216,"y":173.0109399426467}]],["CanvasWidth",400],["CanvasHeight",400]],[["id","Polygon5"],["LineWidth",6],["LineColor","#000000"],["FillColor","#ffffff"],["LineAlpha",1],["FillAlpha",1],["Coordinates",[{"x":202.0586484969892,"y":158.6167485485026},{"x":200.4873361324733,"y":154.2491469524263},{"x":202.0586484969892,"y":146.5416147240562},{"x":197.34471140344166,"y":148.08312116973025},{"x":203.36807546741912,"y":140.88942442325148},{"x":213.81139492523528,"y":138.60423998633595},{"x":220.65251147709347,"y":144.74319053743656},{"x":223.5332508120391,"y":148.34003891067593},{"x":227.98530251150072,"y":149.36770987445857},{"x":235.05620815182186,"y":149.11079213351292},{"x":250.24556100880824,"y":145.77086150121917},{"x":254.43572731418402,"y":150.13846309729558},{"x":260.19720598407537,"y":154.50606469337194},{"x":260.6919334518705,"y":165.2823596911977},{"x":258.8877790136456,"y":176.08715493280815},{"x":262.2922891367631,"y":180.4547565288844},{"x":266.220570048053,"y":183.53776942023248},{"x":269.6250801711705,"y":186.87770005252614},{"x":269.10130938299864,"y":195.09906776278737},{"x":264.649257683537,"y":200.7512580635922},{"x":262.8160599249352,"y":208.71570803290777},{"x":265.173028471709,"y":218.9924176707347},{"x":265.958684653967,"y":223.87385474870237},{"x":266.7443408362247,"y":229.78296279045284},{"x":265.43491386579495,"y":233.89364664558357},{"x":261.5066329545055,"y":238.0043305007143},{"x":255.483268890528,"y":247.7672046566498},{"x":254.959498102356,"y":253.93323043934595},{"x":251.55498797923798,"y":264.2099400771726},{"x":249.72179022063665,"y":268.06370619135765},{"x":234.00866657547812,"y":273.45897875121676},{"x":228.24718790558643,"y":273.97281423310784},{"x":223.00948002386718,"y":272.94514326932534},{"x":208.86766874322453,"y":277.05582712445624},{"x":204.67750243784897,"y":277.5696626063472},{"x":198.9160237679575,"y":278.59733357012993},{"x":194.72585746258187,"y":277.82658034729303},{"x":187.1311810340887,"y":272.94514326932546},{"x":182.15535854645518,"y":269.348294896086},{"x":167.75166187172658,"y":260.09925622204184},{"x":155.44304834968568,"y":253.16247721650876},{"x":151.25288204431018,"y":251.87788851178058},{"x":150.20534046796624,"y":246.99645143381272},{"x":148.37214270936445,"y":241.6011788739536},{"x":148.89591349753655,"y":236.46282405504016},{"x":152.03853822656816,"y":232.09522245896392},{"x":155.96681913785773,"y":227.72762086288756},{"x":157.80001689645957,"y":222.07543056208272},{"x":158.06190229054553,"y":216.68015800222352},{"x":157.27624610828767,"y":212.56947414709282},{"x":154.65739216742776,"y":208.45879029196223},{"x":149.6815696797943,"y":203.83427095494008},{"x":146.0151741625907,"y":200.4943403226464},{"x":141.0393516749572,"y":197.66824517224416},{"x":138.4204977340974,"y":194.32831453995047},{"x":137.11107076366758,"y":183.02393393834112},{"x":144.18197640398887,"y":171.9764710776775},{"x":148.11025731527855,"y":168.37962270443808},{"x":155.96681913785778,"y":159.13058403039403},{"x":157.01436071420167,"y":153.99222921148063},{"x":157.27624610828772,"y":149.62462761540425},{"x":158.06190229054562,"y":143.45860183270818},{"x":169.58485963032842,"y":135.23723412244678},{"x":174.56068211796196,"y":135.23723412244678},{"x":185.03609788140088,"y":139.3479179775775},{"x":191.05946194537827,"y":142.68784860987117}]],["CanvasWidth",400],["CanvasHeight",400]]];
CB.GegnerSchablone.TestFigur.Beine0.CanvasElemente.Alle=[["Stempel","StempelSchuh","50","0","1","1","0","0","0"],["Stempel","StempelSchuh","-35","0","1","1","0","0","0"],["FarbEllipse","Hose1","150",200,"30",50,0,6,"Schwarz"],["FarbEllipse","Hose1","250",200,"30",50,0,6,"Schwarz"],["FarbEllipse","Hose2","150",200,40,50,0,6,"Schwarz"],["FarbEllipse","Hose2","250",200,40,50,0,6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Beine1.CanvasElemente.Alle=[["Stempel","StempelSchuh","-45","-120","1","1","0","0","0.1"],["Stempel","StempelSchuh","50","90","1","1","0","0","-0.1"],["FarbEllipse","Hose1","150","120","30",50,"0.2",6,"Schwarz"],["FarbEllipse","Hose1","250","270","30",50,0,6,"Schwarz"],["FarbEllipse","Hose2","150","140",40,50,"0.2",6,"Schwarz"],["FarbEllipse","Hose2","250","260",40,50,0,6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Beine2.CanvasElemente.Alle=[["Stempel","StempelSchuh","-35","-140","1","1","0","0","-0.1"],["Stempel","StempelSchuh","50","110","1","1","0","0","0"],["FarbEllipse","Hose1","160","100","30",50,"0.2",6,"Schwarz"],["FarbEllipse","Hose1","250","290","30",50,0,6,"Schwarz"],["FarbEllipse","Hose2","150","150",40,"80","0.2",6,"Schwarz"],["FarbEllipse","Hose2","250","250",40,"80",0,6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Beine3.CanvasElemente.Alle=[["Stempel","StempelSchuh","50","90","1","1","0","0","0"],["Stempel","StempelSchuh","-45","-120","1","1","0","0","0.1"],["FarbEllipse","Hose1","150","120","30",50,"0.2",6,"Schwarz"],["FarbEllipse","Hose1","250","270","30",50,0,6,"Schwarz"],["FarbEllipse","Hose2","150",140,40,50,"0.2",6,"Schwarz"],["FarbEllipse","Hose2","250",260,40,50,0,6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Beine4.CanvasElemente.Alle=[["Stempel","StempelSchuh","50","0","1","1","0","0","0"],["Stempel","StempelSchuh","-35","0","1","1","0","0","0"],["FarbEllipse","Hose1","150",200,"30",50,0,6,"Schwarz"],["FarbEllipse","Hose1","250",200,"30",50,0,6,"Schwarz"],["FarbEllipse","Hose2","150",200,40,50,0,6,"Schwarz"],["FarbEllipse","Hose2","250",200,40,50,0,6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Beine5.CanvasElemente.Alle=[["Stempel","StempelSchuh","40","-120","1","1","0","0","-0.1"],["Stempel","StempelSchuh","-50","90","1","1","0","0","0"],["FarbEllipse","Hose1","150","270","30",50,0,6,"Schwarz"],["FarbEllipse","Hose1","245","120","30",50,"-0.1",6,"Schwarz"],["FarbEllipse","Hose2","150","260",40,50,0,6,"Schwarz"],["FarbEllipse","Hose2","250","140",40,50,"-0.1",6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Beine6.CanvasElemente.Alle=[["Stempel","StempelSchuh","35","-140","1","1","0","0","0.1"],["Stempel","StempelSchuh","-50","110","1","1","0","0","0"],["FarbEllipse","Hose1","150","290","30",50,0,6,"Schwarz"],["FarbEllipse","Hose1","240","100","30",50,"-0.2",6,"Schwarz"],["FarbEllipse","Hose2","150","250",40,"80",0,6,"Schwarz"],["FarbEllipse","Hose2","250","150",40,"80","-0.2",6,"Schwarz"],["FarbEllipse","Hose2","250","150",40,"80","-0.2",6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Beine7.CanvasElemente.Alle=[["Stempel","StempelSchuh","40","-120","1","1","0","0","-0.1"],["Stempel","StempelSchuh","-50","90","1","1","0","0","0"],["FarbEllipse","Hose1","150","270","30",50,0,6,"Schwarz"],["FarbEllipse","Hose1","245","120","30",50,"-0.1",6,"Schwarz"],["FarbEllipse","Hose2","150",260,40,50,0,6,"Schwarz"],["FarbEllipse","Hose2","250",140,40,50,"-0.1",6,"Schwarz"]];
CB.GegnerSchablone.TestFigur.Arme0.CanvasElemente.Alle=[["Stempel","StempelHand","545","15","-1","1","0","0","0"],["Stempel","StempelHand","-145","15","1","1","0","0","0"],["Stempel","StempelOberarm","-140","0","1","1","0","0","0"],["Stempel","StempelOberarm","140","0","1","1","0","0","0"],["Stempel","StempelUnterarm","-140","15","1","1","0","0","0"],["Stempel","StempelUnterarm","140","15","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Arme1.CanvasElemente.Alle=[["Stempel","StempelHand","535","-40","-1","1","0","0","0"],["Stempel","StempelHand","-145","460","1","-1","0","0","0"],["Stempel","StempelOberarm","135","10","1","1","0","0","0"],["Stempel","StempelUnterarm","-145","20","1","1","0","0","0"],["Stempel","StempelOberarm","-145","0","1","1","0","0","0"],["Stempel","StempelUnterarm","135","0","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Arme2.CanvasElemente.Alle=[["Stempel","StempelHand","525","-80","-1","1","0","0","0"],["Stempel","StempelHand","-145","500","1","-1","0","0","0"],["Stempel","StempelOberarm","125","10","1","1","0","0","0"],["Stempel","StempelUnterarm","-145","60","1","1","0","0","0"],["Stempel","StempelOberarm","-145","20","1","1","0","0","0"],["Stempel","StempelUnterarm","125","-30","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Arme3.CanvasElemente.Alle=[["Stempel","StempelHand","535","-40","-1","1","0","0","0"],["Stempel","StempelHand","-145","460","1","-1","0","0","0"],["Stempel","StempelOberarm","135","10","1","1","0","0","0"],["Stempel","StempelOberarm","-145","20","1","1","0","0","0"],["Stempel","StempelUnterarm","-145","0","1","1","0","0","0"],["Stempel","StempelUnterarm","135","0","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Arme4.CanvasElemente.Alle=[["Stempel","StempelHand","545","15","-1","1","0","0","0"],["Stempel","StempelHand","-145","15","1","1","0","0","0"],["Stempel","StempelOberarm","-140","0","1","1","0","0","0"],["Stempel","StempelOberarm","140","0","1","1","0","0","0"],["Stempel","StempelUnterarm","-140","15","1","1","0","0","0"],["Stempel","StempelUnterarm","140","15","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Arme5.CanvasElemente.Alle=[["Stempel","StempelHand","545","460","-1","-1","0","0","0"],["Stempel","StempelHand","-135","-40","1","1","0","0","0"],["Stempel","StempelOberarm","-135","-20","1","1.1","0","0","0"],["Stempel","StempelOberarm","145","-30","1","1.3","0","0","0"],["Stempel","StempelUnterarm","-135","-20","1","1.1","0","0","0"],["Stempel","StempelUnterarm","145","420","1","1.3","0","0","0"]];
CB.GegnerSchablone.TestFigur.Arme6.CanvasElemente.Alle=[["Stempel","StempelHand","545","500","-1","-1","0","0","0"],["Stempel","StempelHand","-125","-80","1","1","0","0","0"],["Stempel","StempelOberarm","-125","0","1","1","0","0","0"],["Stempel","StempelOberarm","145","30","1","1","0","0","0"],["Stempel","StempelUnterarm","-125","-50","1","1","0","0","0"],["Stempel","StempelUnterarm","145","60","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Arme7.CanvasElemente.Alle=[["Stempel","StempelHand","545","460","-1","-1","0","0","0"],["Stempel","StempelHand","-135","-40","1","1","0","0","0"],["Stempel","StempelOberarm","-135","-20","1","1.1","0","0","0"],["Stempel","StempelOberarm","145","-30","1","1.3","0","0","0"],["Stempel","StempelUnterarm","-135","-20","1","1.1","0","0","0"],["Stempel","StempelUnterarm","145","-20","1","1.3","0","0","0"]];
CB.GegnerSchablone.TestFigur.Koerper0.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Koerper1.CanvasElemente.Alle=[["Stempel","StempelKoerper","-6","0","1","1","0","0","0.1"]];
CB.GegnerSchablone.TestFigur.Koerper2.CanvasElemente.Alle=[["Stempel","StempelKoerper","-14","0","1","1","0","0","0.2"]];
CB.GegnerSchablone.TestFigur.Koerper3.CanvasElemente.Alle=[["Stempel","StempelKoerper","-6","0","1","1","0","0","0.1"]];
CB.GegnerSchablone.TestFigur.Koerper4.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Koerper5.CanvasElemente.Alle=[["Stempel","StempelKoerper","6","0","1","1","0","0","-0.1"]];
CB.GegnerSchablone.TestFigur.Koerper6.CanvasElemente.Alle=[["Stempel","StempelKoerper","14","0","1","1","0","0","-0.2"]];
CB.GegnerSchablone.TestFigur.Koerper7.CanvasElemente.Alle=[["Stempel","StempelKoerper","6","0","1","1","0","0","-0.1"]];
CB.GegnerSchablone.TestFigur.Kopf0.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Kopf1.CanvasElemente.Alle=[["Stempel","StempelKopf","-4","0","1","1","0","0","0.025"]];
CB.GegnerSchablone.TestFigur.Kopf2.CanvasElemente.Alle=[["Stempel","StempelKopf","-10","0","1","1","0","0","0.05"]];
CB.GegnerSchablone.TestFigur.Kopf3.CanvasElemente.Alle=[["Stempel","StempelKopf","-4","0","1","1","0","0","0.025"]];
CB.GegnerSchablone.TestFigur.Kopf4.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.TestFigur.Kopf5.CanvasElemente.Alle=[["Stempel","StempelKopf","4","0","1","1","0","0","-0.025"]];
CB.GegnerSchablone.TestFigur.Kopf6.CanvasElemente.Alle=[["Stempel","StempelKopf","10","0","1","1","0","0","-0.05"]];
CB.GegnerSchablone.TestFigur.Kopf7.CanvasElemente.Alle=[["Stempel","StempelKopf","4","0","1","1","0","0","-0.025"]];


CB.GegnerSchablone.NeueFigur.Farben.WelcheGibtEs=[["Haar","rgba(195,175,5,1)",[["Radial",["150","150","1","150","150","300"],[["0","rgba(230,220,230,0.5)"],["1","rgba(0,0,0,0)"]]],["Pattern",["PatternWelle","repeat","1","2","0","0","1","0.1"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","23","23","0","0","0.5","0"]],["Linear",["100","200","300","200"],[["0","rgba(20,45,20,0.5)"],["0.5","rgba(0,0,0,0)"],["1","rgba(20,45,20,0.5)"]]],["Radial",["200","200","1","200","200","70"],[["0","rgba(170,120,0,0)"],["1","rgba(80,40,0,0.6)"]]]]],["Haut","rgba(210,140,118,1)",[]],["Leer","rgba(0,0,0,0)",[]],["Schuh","rgba(200,180,180,1)",[["Radial",["200","200","1","200","200","50"],[["0","rgba(20,50,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["Schwarz","rgba(0,0,0,1)",[]],["Weiss","rgba(255,255,255,1)",[]]];
CB.GegnerSchablone.NeueFigur.Stempel.WelcheGibtEs=[];
CB.GegnerSchablone.NeueFigur.Pattern.WelcheGibtEs=[["Pattern4",["Zufall","rgba(230,230,230,1)"]],["Pattern51",["Schachbrett","rgba(0,0,0,1)"]],["PatternHaar",["Zufall","rgba(83,60,23,1)"]],["PatternOberteil",["Streifen","rgba(0,0,0,1)"]],["PatternWelle",["Sinus","rgba(0,0,0,1)"]]];
CB.GegnerSchablone.NeueFigur.Beine0.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Beine1.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Beine2.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Beine3.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Beine4.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Beine5.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Beine6.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Beine7.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme0.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme1.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme2.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme3.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme4.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme5.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme6.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Arme7.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper0.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper1.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper2.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper3.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper4.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper5.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper6.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Koerper7.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf0.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf1.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf2.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf3.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf4.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf5.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf6.CanvasElemente.Alle=[];
CB.GegnerSchablone.NeueFigur.Kopf7.CanvasElemente.Alle=[];

CB.GegnerSchablone.Testmann.Farben.WelcheGibtEs=[["Gesicht","rgba(210,140,118,1)",[["Radial",["200","200","1","200","200","120"],[["0","rgba(240,220,20,0)"],["1","rgba(0,0,0,0.5)"]]]]],["Haar","rgba(195,175,5,1)",[["Radial",["150","150","1","150","150","300"],[["0","rgba(230,220,230,0.5)"],["1","rgba(0,0,0,0)"]]],["Pattern",["PatternWelle","repeat","1","2","0","0","1","0.1"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","23","23","0","0","0.5","0"]],["Linear",["100","200","300","200"],[["0","rgba(20,45,20,0.5)"],["0.5","rgba(0,0,0,0)"],["1","rgba(20,45,20,0.5)"]]],["Radial",["200","200","1","200","200","70"],[["0","rgba(170,120,0,0)"],["1","rgba(80,40,0,0.6)"]]]]],["HandFarbe","rgba(210,140,118,1)",[["Radial",["200","200","1","200","200","70"],[["0","rgba(170,0,0,0)"],["1","rgba(0,0,0,1)"]]]]],["Haut","rgba(210,140,118,1)",[]],["Hose1","rgba(146,146,0,1)",[]],["Hose2","rgba(156,156,0,1)",[]],["Leer","rgba(0,0,0,0)",[]],["Oberteil1","rgba(122,125,255,1)",[["Linear",["0","200","400","200"],[["0","rgba(120,120,250,0.7)"],["0.5","rgba(0,0,250,5)"],["1","rgba(120,120,250,0.7)"]]],["Pattern",["PatternOberteil","repeat","0.4","0.4","0","0","1","0.6"]],["Pattern",["PatternOberteil","repeat","0.4","0.4","0","0","1","-0.6"]],["Radial",["200","200","1","200","200","200"],[["0","rgba(120,120,170,0.7)"],["1","rgba(250,0,0,0)"]]]]],["Oberteil2","rgba(122,55,200,1)",[["Radial",["200","200","1","200","200","100"],[["0","rgba(250,250,250,0.7)"],["1","rgba(10,30,180,1)"]]],["Radial",["200","200","40","200","200","180"],[["0","rgba(20,40,0,0.7)"],["1","rgba(232,220,220,0)"]]]]],["Schnuersenkel","rgba(250,252,212,1)"],["Schuh","rgba(200,180,180,1)",[["Radial",["200","200","1","200","200","50"],[["0","rgba(20,50,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["SchulterAbzeichen","rgba(0,0,220,1)",[["Linear",["200","150","200","250"],[["0","rgba(170,120,0,0.7)"],["0.2","rgba(230,0,0,1)"],["0.4","rgba(0,230,0,1)"],["0.6","rgba(0,0,230,1)"],["0.8","rgba(0,230,230,1)"],["1","rgba(0,0,0,0)"]]],["Linear",["0","200","400","200"],[["0","rgba(170,120,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["Schwarz","rgba(0,0,0,1)",[]],["Weiss","rgba(255,255,255,1)",[]]];
CB.GegnerSchablone.Testmann.Stempel.WelcheGibtEs=[["StempelHand",[["FarbEllipse","HandFarbe","200","200","17","30","0","2","Schwarz"],["FarbEllipse","HandFarbe","210","185","8","17","0.2","2","Schwarz"],["FarbEllipse","HandFarbe","200","164","7","16","0.5","2","Schwarz"]]],["StempelKoerper",[["FarbEllipse","Oberteil1","200","200","160","70","0","6","Schwarz"],["FarbEllipse","Oberteil2","200","200","100","70","0","6","Schwarz"],["FarbRechteck","SchulterAbzeichen","60","170","14","60","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","320","170","14","60","0","2","Schwarz"]]],["StempelKopf",[["FarbEllipse","Haut","210","124","8","10","0","2","Schwarz"],["FarbEllipse","Haut","190","124","8","10","0","2","Schwarz"],["FarbEllipse","Haut","200","118","10","12","0","4","Schwarz"],["FarbEllipse","Gesicht","200","200","70","80","0","4","Schwarz"],["FarbEllipse","Gesicht","228","134","24","8","0.5","2","Schwarz"],["FarbEllipse","Gesicht","172","134","24","8","-0.5","2","Schwarz"],["FarbEllipse","Schwarz","227","135","10","2","0.2","2","Schwarz"],["FarbEllipse","Schwarz","173","135","10","2","-0.2","2","Schwarz"],["FarbPoligon","Haar","0","0",["200","140","190","137","180","140","170","151","160","156","135","180","130","200","135","240","150","260","160","270","200","285","220","280","220","280","260","250","270","200","260","160","250","150","230","160"],"0.1","4","Schwarz"]]],["StempelSchuh",[["FarbEllipse","Schuh","200","200","30","50","0","6","Schwarz"],["Linie","190","180","210","180","0","2","Schnuersenkel"],["Linie","185","185","215","185","0","2","Schnuersenkel"],["Linie","180","195","220","195","0","2","Schnuersenkel"],["Linie","180","190","220","190","0","2","Schnuersenkel"],["Linie","200","150","200","250","0","2","Schwarz"]]]];
CB.GegnerSchablone.Testmann.Pattern.WelcheGibtEs=[["Namek",["Kugeln","rgba(0,0,0,1)"]]];

CB.GegnerSchablone.Testmann.Farben.WelcheGibtEs=[["Gesicht","rgba(210,140,118,1)",[["Radial",["200","200","1","200","200","120"],[["0","rgba(240,220,20,0)"],["1","rgba(0,0,0,0.5)"]]]]],["Haar","rgba(195,175,5,1)",[["Radial",["150","150","1","150","150","300"],[["0","rgba(230,220,230,0.5)"],["1","rgba(0,0,0,0)"]]],["Pattern",["PatternWelle","repeat","1","2","0","0","1","0.1"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","8","8","0","0","1","0"]],["Pattern",["PatternHaar","repeat","23","23","0","0","0.5","0"]],["Linear",["100","200","300","200"],[["0","rgba(20,45,20,0.5)"],["0.5","rgba(0,0,0,0)"],["1","rgba(20,45,20,0.5)"]]],["Radial",["200","200","1","200","200","70"],[["0","rgba(170,120,0,0)"],["1","rgba(80,40,0,0.6)"]]]]],["HandFarbe","rgba(210,140,118,1)",[["Radial",["200","200","1","200","200","70"],[["0","rgba(170,0,0,0)"],["1","rgba(0,0,0,1)"]]]]],["Haut","rgba(210,140,118,1)",[]],["Hose1","rgba(146,146,0,1)",[]],["Hose2","rgba(156,156,0,1)",[]],["Leer","rgba(0,0,0,0)",[]],["Oberteil1","rgba(122,125,255,1)",[["Linear",["0","200","400","200"],[["0","rgba(120,120,250,0.7)"],["0.5","rgba(0,0,250,5)"],["1","rgba(120,120,250,0.7)"]]],["Pattern",["PatternOberteil","repeat","0.4","0.4","0","0","1","0.6"]],["Pattern",["PatternOberteil","repeat","0.4","0.4","0","0","1","-0.6"]],["Radial",["200","200","1","200","200","200"],[["0","rgba(120,120,170,0.7)"],["1","rgba(250,0,0,0)"]]]]],["Oberteil2","rgba(122,55,200,1)",[["Radial",["200","200","1","200","200","100"],[["0","rgba(250,250,250,0.7)"],["1","rgba(10,30,180,1)"]]],["Radial",["200","200","40","200","200","180"],[["0","rgba(20,40,0,0.7)"],["1","rgba(232,220,220,0)"]]]]],["Schnuersenkel","rgba(250,252,212,1)"],["Schuh","rgba(200,180,180,1)",[["Radial",["200","200","1","200","200","50"],[["0","rgba(20,50,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["SchulterAbzeichen","rgba(0,0,220,1)",[["Linear",["200","150","200","250"],[["0","rgba(170,120,0,0.7)"],["0.2","rgba(230,0,0,1)"],["0.4","rgba(0,230,0,1)"],["0.6","rgba(0,0,230,1)"],["0.8","rgba(0,230,230,1)"],["1","rgba(0,0,0,0)"]]],["Linear",["0","200","400","200"],[["0","rgba(170,120,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["Schwarz","rgba(0,0,0,1)",[]],["Weiss","rgba(255,255,255,1)",[]]];
CB.GegnerSchablone.Testmann.Stempel.WelcheGibtEs=[["StempelHand",[["FarbEllipse","HandFarbe","200","200","17","30","0","2","Schwarz"],["FarbEllipse","HandFarbe","210","185","8","17","0.2","2","Schwarz"],["FarbEllipse","HandFarbe","200","164","7","16","0.5","2","Schwarz"]]],["StempelKoerper",[["FarbEllipse","Oberteil1","200","200","160","70","0","6","Schwarz"],["FarbEllipse","Oberteil2","200","200","100","70","0","6","Schwarz"],["FarbRechteck","SchulterAbzeichen","60","170","14","60","0","2","Schwarz"],["FarbRechteck","SchulterAbzeichen","320","170","14","60","0","2","Schwarz"]]],["StempelKopf",[["FarbEllipse","Haut","210","124","8","10","0","2","Schwarz"],["FarbEllipse","Haut","190","124","8","10","0","2","Schwarz"],["FarbEllipse","Haut","200","118","10","12","0","4","Schwarz"],["FarbEllipse","Gesicht","200","200","70","80","0","4","Schwarz"],["FarbEllipse","Gesicht","228","134","24","8","0.5","2","Schwarz"],["FarbEllipse","Gesicht","172","134","24","8","-0.5","2","Schwarz"],["FarbEllipse","Schwarz","227","135","10","2","0.2","2","Schwarz"],["FarbEllipse","Schwarz","173","135","10","2","-0.2","2","Schwarz"],["FarbPoligon","Haar","0","0",["200","140","190","137","180","140","170","151","160","156","135","180","130","200","135","240","150","260","160","270","200","285","220","280","220","280","260","250","270","200","260","160","250","150","230","160"],"0.1","4","Schwarz"]]],["StempelSchuh",[["FarbEllipse","Schuh","200","200","30","50","0","6","Schwarz"],["Linie","190","180","210","180","0","2","Schnuersenkel"],["Linie","185","185","215","185","0","2","Schnuersenkel"],["Linie","180","195","220","195","0","2","Schnuersenkel"],["Linie","180","190","220","190","0","2","Schnuersenkel"],["Linie","200","150","200","250","0","2","Schwarz"]]]];
CB.GegnerSchablone.Testmann.Pattern.WelcheGibtEs=[["Namek",["Kugeln","rgba(0,0,0,1)"]]];
CB.GegnerSchablone.Testmann.Beine0.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine1.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine2.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine3.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine4.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine5.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine6.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine7.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine8.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine9.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine10.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine11.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine12.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine13.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine14.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Beine15.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme0.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme1.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme2.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme3.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme4.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme5.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme6.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme7.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme8.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme9.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme10.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme11.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme12.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme13.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme14.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Arme15.CanvasElemente.Alle=[];
CB.GegnerSchablone.Testmann.Koerper0.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper1.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper2.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper3.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper4.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper5.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper6.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper7.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper8.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper9.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper10.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper11.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper12.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper13.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper14.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Koerper15.CanvasElemente.Alle=[["Stempel","StempelKoerper","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Kopf0.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Kopf1.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Kopf2.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Kopf3.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Kopf4.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Kopf5.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];
CB.GegnerSchablone.Testmann.Kopf6.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.05"]];
CB.GegnerSchablone.Testmann.Kopf7.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.1"]];
CB.GegnerSchablone.Testmann.Kopf8.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.2"]];
CB.GegnerSchablone.Testmann.Kopf9.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.3"]];
CB.GegnerSchablone.Testmann.Kopf10.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.4"]];
CB.GegnerSchablone.Testmann.Kopf11.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.5"]];
CB.GegnerSchablone.Testmann.Kopf12.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.3"]];
CB.GegnerSchablone.Testmann.Kopf13.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.1"]];
CB.GegnerSchablone.Testmann.Kopf14.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0.05"]];
CB.GegnerSchablone.Testmann.Kopf15.CanvasElemente.Alle=[["Stempel","StempelKopf","0","0","1","1","0","0","0"]];

CB.GegnerSchablone.Taube.Farben.WelcheGibtEs=[["Auge","rgba(0,0,0,1)",[]],["Feder","rgba(90,90,90,1)",[]],["Fluegel","rgba(190,190,190,1)",[["Pattern",["Namek","repeat","0.2","0.2","0","0","1","0"]]]],["Koerper","rgba(170,170,170,1)",[]],["Kopf","rgba(235,235,235,1)",[["Radial",["200","200","1","200","200","300"],[["0","rgba(170,120,0,0.7)"],["1","rgba(0,0,0,0)"]]]]],["Leer","rgba(0,0,0,0)",[]],["Schnabel","rgba(210,120,10,1)",[]],["Schwarz","rgba(0,0,0,1)",[]],["Weiss","rgba(255,255,255,1)",[]]];
CB.GegnerSchablone.Taube.Stempel.WelcheGibtEs=[];
CB.GegnerSchablone.Taube.Pattern.WelcheGibtEs=[["Namek",["Kugeln","rgba(0,0,0,1)"]],["Tester",["Zufall","rgba(0,0,0,1)"]],["Tester2",["Zufall","rgba(0,0,0,1)"]]];
CB.GegnerSchablone.Taube.Ab0.CanvasElemente.Alle=[["FarbEllipse","Fluegel","50","60","20","20","0","2","Schwarz"]];
CB.GegnerSchablone.Taube.Ab1.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49.5","60","22","20","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Ab2.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49","60","24","20","0.1","2","Schwarz"]];
CB.GegnerSchablone.Taube.Ab3.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49.5","60","22","20","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Ac0.CanvasElemente.Alle=[["FarbEllipse","Fluegel","50","60","20","20","0","2","Schwarz"]];
CB.GegnerSchablone.Taube.Ac1.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49.5","60","22","20","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Ac2.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49","60","24","20","0.1","2","Schwarz"]];
CB.GegnerSchablone.Taube.Ac3.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49.5","60","22","20","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Arme0.CanvasElemente.Alle=[["FarbEllipse","Fluegel","50","60","20","20","0","2","Schwarz"]];
CB.GegnerSchablone.Taube.Arme1.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49.5","60","22","20","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Arme2.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49","60","24","20","0.1","2","Schwarz"]];
CB.GegnerSchablone.Taube.Arme3.CanvasElemente.Alle=[["FarbEllipse","Fluegel","49.5","60","22","20","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Koerper0.CanvasElemente.Alle=[["FarbEllipse","Feder","57","76","6","12","-0.3","2","Schwarz"],["FarbEllipse","Feder","43","76","6","12","0.3","2","Schwarz"],["FarbEllipse","Feder","50","80","6","12","0","2","Schwarz"],["FarbEllipse","Koerper","50","60","14","22","0","2","Schwarz"]];
CB.GegnerSchablone.Taube.Koerper1.CanvasElemente.Alle=[["FarbEllipse","Feder","54","78","6","12","-0.2","2","Schwarz"],["FarbEllipse","Feder","43","76","6","12","0.5","2","Schwarz"],["FarbEllipse","Feder","47","80","6","12","0.05","2","Schwarz"],["FarbEllipse","Koerper","49","60","14","22","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Koerper2.CanvasElemente.Alle=[["FarbEllipse","Feder","50","78","6","12","-0.4","2","Schwarz"],["FarbEllipse","Feder","41","76","6","12","0.6","2","Schwarz"],["FarbEllipse","Feder","45","80","6","12","0.1","2","Schwarz"],["FarbEllipse","Koerper","48","60","14","22","0.1","2","Schwarz"]];
CB.GegnerSchablone.Taube.Koerper3.CanvasElemente.Alle=[["FarbEllipse","Feder","54","78","6","12","-0.2","2","Schwarz"],["FarbEllipse","Feder","43","76","6","12","0.5","2","Schwarz"],["FarbEllipse","Feder","47","80","6","12","0.05","2","Schwarz"],["FarbEllipse","Koerper","49","60","14","22","0.05","2","Schwarz"]];
CB.GegnerSchablone.Taube.Kopf0.CanvasElemente.Alle=[["FarbEllipse","Schnabel","50","27","4.1","8","0","2","Schwarz"],["FarbEllipse","Kopf","50","35","7","11","0","2","Schwarz"],["FarbEllipse","Auge","54","30","2.1","2.1","0","1","Schwarz"],["FarbEllipse","Auge","46","30","2.1","2.1","0","1","Schwarz"]];
CB.GegnerSchablone.Taube.Kopf1.CanvasElemente.Alle=[["FarbEllipse","Schnabel","50","23","4.3","8","0.05","2","Schwarz"],["FarbEllipse","Kopf","50","33","8","13","0.05","2","Schwarz"],["FarbEllipse","Auge","55","27","2.3","2.3","0","1","Schwarz"],["FarbEllipse","Auge","45","27","2.3","2.3","0","1","Schwarz"]];
CB.GegnerSchablone.Taube.Kopf2.CanvasElemente.Alle=[["FarbEllipse","Schnabel","50","18","4.5","8","0.1","2","Schwarz"],["FarbEllipse","Kopf","50","31","10","15","0.1","2","Schwarz"],["FarbEllipse","Auge","56","24","2.5","2.5","0","1","Schwarz"],["FarbEllipse","Auge","44","24","2.5","2.5","0","1","Schwarz"]];
CB.GegnerSchablone.Taube.Kopf3.CanvasElemente.Alle=[["FarbEllipse","Schnabel","50","13","4.7","8","0.05","2","Schwarz"],["FarbEllipse","Kopf","50","29","11","17","0.05","2","Schwarz"],["FarbEllipse","Auge","57","20","2.7","2.7","0","1","Schwarz"],["FarbEllipse","Auge","43","20","2.7","2.7","0","1","Schwarz"]];