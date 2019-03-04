/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}

//Para activar los select
function Ciudad(){
  var selector = $('#selectCiudad').detach()
  var insertar = document.createElement('div')
  
  $('.filtroCiudad').append(insertar)
  $('.filtroCiudad').find('div').addClass('select-wrapper')
  $('.filtroCiudad').find('.select-wrapper').append(selector)
}

function Tipo(){
  var tipo = $('#selectTipo').detach()
  var insertar = document.createElement('div')

  $('.filtroTipo').append(insertar)
  $('.filtroTipo').find('div').addClass('select-wrapper')
  $('.filtroTipo').find('.select-wrapper').append(tipo)
}

inicializarSlider();
Ciudad();
Tipo();

//Peticiones Ajax
function darInformacion(){
  var xhr;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open('GET', 'buscador.php', true);
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var datos = JSON.parse(this.responseText);
        $.each(datos, function(index, obj){
          $(".informacion").append(
                                  '<div class="card horizontal">'+
                                    '<div class="card-image">'+
                                      '<img src="./img/home.jpg">'+
                                    '</div>'+
                                    '<div class="card-stacked">'+
                                      '<div class="card-content">'+
                                        '<p><b>Direccion:</b> '+obj.Direccion+'</p>'+
                                        '<p><b>Ciudad:</b> '+obj.Ciudad+'</p>'+
                                        '<p><b>Telefono:</b> '+obj.Telefono+'</p>'+
                                        '<p><b>Codigo Postal:</b> '+obj.Codigo_Postal+'</p>'+
                                        '<p><b>Tipo:</b> '+obj.Tipo+'</p>'+
                                        '<p><b>Precio:</b> <span class="orange-text lighten-1">'+obj.Precio+'</span></p>'+
                                      '</div>'+
                                      '<div class="card-action">'+
                                        '<a>Ver mas</a>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'
          );
      });
    }
  }
  xhr.send();
}

function seleccionarCiudad(){
  var xhr;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open('GET', 'buscador.php', true);
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var datos = JSON.parse(this.responseText);
      var i = 0;
      var arreglo = [];
      var ciudad;

      while(i < 100){
        ciudad = datos[i].Ciudad;
        if(arreglo.includes(ciudad) == false){
          arreglo.push(ciudad);
        }
        i++;    
      }
      for(var j in arreglo){
        $('#selectCiudad').append('<option>'+arreglo[j]+'</option>');
      } 
    }
  }
  xhr.send()
}

function seleccionarTipo(){
  var xhr;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.open('GET', 'buscador.php', true),
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var datos = JSON.parse(this.responseText);
      var arreglo = [];
      var ciudad;
      var i=0;
      while(i < 100){
        ciudad = datos[i].Tipo;
        if(arreglo.includes(ciudad) == false){
          arreglo.push(ciudad);
        }
        i++;
      }
      for(var j in arreglo){
        $('#selectTipo').append('<option>'+arreglo[j]+'</option>');
      }
    }
  }
  xhr.send();
}

function rangoPrecios(e){
  e.preventDefault()
  var from = $('.irs-from').text();
  var to = $('.irs-to').text();

  $.ajax(
    {
      url: 'buscador.php',
      type: 'GET',
      success: function(res){
        var datos = JSON.parse(res);

        var fromString = from.substring(1);
        var toString = to.substring(1);
        var fromEntero = parseInt(fromString);
        var toEntero = parseInt(toString);
        var precio;
        var arreglo = [];
        var i=0;

        while(i<100){
          precio = datos[i];
          pre = precio.Precio
          var s = pre.substring(1);
          var e = parseInt(s);
          if(e >= fromEntero || e <= toEntero){
            arreglo.push(precio);
          }
          i++;
        }
        console.log(arreglo);
      }
    }
  );

}

//Para cuando la pagina esta cargada
$(document).ready(function(){
  $('select').css('display','block');
  $('#mostrarTodos').click(darInformacion);

  //Funcion click para el select Ciudad
  var cli = 0;
  $('#selectCiudad').on("click", function(){
    if(cli <= 0){
      cli = 1;
      seleccionarCiudad();
    }
  });
  
  //Funcion click para el select Tipo de Casa
  var tipo = 0;
  $('#selectTipo').on("click", function(){
    if(tipo <= 0){
      tipo = 1;
      seleccionarTipo();
    }
  });
  
  $('#formulario').submit(rangoPrecios);

});
