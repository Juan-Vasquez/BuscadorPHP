<?php

	function fileOpen(){
		$archivo = fopen('data/data-1.json', 'r') or die('Error al abrir el archivo');
		$file = fread($archivo, filesize('./data/data-1.json'));
		echo $file;
		fclose($archivo);
	}
	//Ejecutar Funciones
	fileOpen();
?>


