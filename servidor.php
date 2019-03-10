<?php

	function fileOpen(){
		$archivo = fopen('data/data-1.json', 'r') or die('Error al abrir el archivo');
		$file = fread($archivo, filesize('./data/data-1.json'));
		fclose($archivo);
		return $file;
	}

	function rangoPrecio(){
		$derecha=$_POST['derecha'];
		$izquierda=$_POST['izquierda'];
		$ciudad=$_POST['ciudad'];
		$tipo=$_POST['tipo'];
		$archivo = fileOpen();	
		$datos = json_decode($archivo);
		$rangos = array();	

		foreach ($datos as $key => $value) {
			$pais= $value->Ciudad;
			$tipoCasa= $value->Tipo;
			$validar =str_replace("$",'',$value->Precio);
			$entero = str_replace(",",'', $validar);
			if($entero>=$izquierda && $entero<=$derecha){
					if(empty($ciudad) && empty($tipo)){
						$rangos[]=$value;
					}else if($pais==$ciudad && empty($tipo)){
						$rangos[]=$value;
					}else if($tipoCasa==$tipo && empty($ciudad)){
						$rangos[]=$value;
					}else if($pais==$ciudad && $tipoCasa==$tipo){
						$rangos[]=$value;
					}
			}
		}
		return json_encode($rangos);
 	}

 echo rangoPrecio();

?>