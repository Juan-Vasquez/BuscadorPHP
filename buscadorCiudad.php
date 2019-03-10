<?php
	
	function fileOpen(){
		$archivo = fopen('data/data-1.json', 'r') or die('Error al abrir el archivo');
		$file = fread($archivo, filesize('./data/data-1.json'));
		fclose($archivo);
		return $file;
	}

	function openCiudad(){
		$archivo = fileOpen();	
		$Ciudades = json_decode($archivo);
		$ciudad = array();	
		foreach ($Ciudades as $key => $value) {
			$ciudad[]=$value->Ciudad;
		}
		$ciudad = array_unique($ciudad);
		$ciudadOPC = "";
		foreach ($ciudad as $key) {
			$ciudadOPC .= '<option>'.$key.'</option>';	
		}
		return json_encode($ciudadOPC);
	}

	echo openCiudad();
?>