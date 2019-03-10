<?php
	
	function fileOpen(){
		$archivo = fopen('data/data-1.json', 'r') or die('Error al abrir el archivo');
		$file = fread($archivo, filesize('./data/data-1.json'));
		fclose($archivo);
		return $file;
	}

	function openTipo(){
		$archivo = fileOpen();
		$datos = json_decode($archivo);
		$arreglo = array();
		foreach ($datos as $key => $value) {
			$arreglo[]=$value->Tipo;
		}
		$tipo = array_unique($arreglo);
		$tipoOpcion = "";
		foreach ($tipo as $key) {
			$tipoOpcion .= '<option>'.$key.'</option>';
		}
		return json_encode($tipoOpcion);
	}
	echo openTipo();

?>