<?php

	
		$archivo = fopen('data/data-1.json', 'r') or die('Error al abrir el archivo');
		$file = fread($archivo, filesize('./data/data-1.json'));
		fclose($archivo);
		echo $file;
	
		
	
?>


