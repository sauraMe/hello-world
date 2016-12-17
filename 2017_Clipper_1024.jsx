/* 	Basado en guarda_k.js  /	Guión para Photoshop
	========================================
	Guarda el documento en .jpg, caldad 6, añadiendo un prefijo
	Soporte: pepesaura@gmail.com
*/
//	Variables a personalizar *****************************************

    var calidad = 6;
    var prefijo = "ClipperTK_"; // A_ indica calidad 10
	var comoCopia = true;
	var sufijo = ".jpg";
	//var comoCopia = false;

//	Inicio del script ************************************************

	displayDialogs = DialogModes.NO;
	var strtRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.CM;

if (documents.length > 0) {
	var docRef = activeDocument;
	var ok = true;
	if (docRef.bitsPerChannel != BitsPerChannelType.EIGHT){
		var w = new Window ('dialog', ' Documento con 16 bits', [0, 0, 230, 85]);
		w.add ('statictext', [10, 15, 165, 35], 'Convertir el documento a 8 bits?');
		w.ok = w.add ('button', [10, 45, 110, 65], 'Ok', { name:'ok' });
		w.no = w.add ('button', [120, 45, 220, 65], 'cancelar', { name:'cancel' });
		w.ok.active = true;
		w.center();
		//var ok = w.show() == 1;
		if (ok) docRef.bitsPerChannel = BitsPerChannelType.EIGHT;
		}	// el documento tenía 16 bits
		if (ok) {	//el documento tiene 8 bits
			var myPath = docRef.path + "/";
			var cNombre = SinExtension( txtCorta( activeDocument.name, "-" ) );
			if ( cNombre.substr( 0,1 ) == prefijo ) cNombre = cNombre.substr( 1, cNombre.length - 1 ); 
			
			var cNewName = prefijo + cNombre + sufijo;
			preferences.rulerUnits = Units.CM;
					jpgFile = new File( myPath.toString() + cNewName );
					jpgSaveOptions = new JPEGSaveOptions();
					jpgSaveOptions.embedColorProfile = true;
					jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
					jpgSaveOptions.matte = MatteType.NONE;
					jpgSaveOptions.quality = calidad;
					docRef.saveAs(jpgFile, jpgSaveOptions, comoCopia, Extension.LOWERCASE);
			cNombre = activeDocument.name;
			//if (cNombre != cNewName) alert("¡Ojo! El documento tuvo que guardarse como copia.")
		} //ok
		preferences.rulerUnits = strtRulerUnits;
}
else
{
	alert("Debes abrir al menos un documento.");
}

function SinExtension( cName ) {
	return txtCorta( cName, "." );
}
function txtCorta( cName, cTag ) {
   var i =1;
   var nLong = cName.length;
   var cText = cName.substr(i,1);
   while ((i < nLong) && (cText != cTag ))
   {
    i++;
    cText = cName.substr(i,1);
   }
   return cName.substr( 0, i );
}
