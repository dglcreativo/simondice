window.onload = cargarColor;

var secuencia = new Array();
var ronda = 0;
var jugador = "";
var movimiento = 0;

//Array con los botones
var zonas = new Array('rojo', 'verde', 'azul', 'amarillo');

//Array con los distintos colores del simon
var colores = new Array();

	colores[0] = ['rgb(255, 139, 139)', 'Red', 'FireBrick']; //rojo
	colores[1] = ['rgb(153, 249, 133)', 'Green', 'DarkGreen'];	//verde
	colores[2] = ['rgb(142, 186, 255)', 'Blue', 'MediumBlue'];	//azul
	colores[3] = ['rgb(255, 247, 138)', 'Yellow', 'LightYellow'];	//amarillo

//función que comienza el juego y pone las ronda del juego a cero
function empezar(){
	ronda = 0;
	//mostramos en pantalla lo que tardará en comenzar el juego al pulsar el botón empezar
	document.getElementById('poner-ronda').innerHTML = 'La partida empezará en 3 segundos estaté atento.';
	secuencia = new Array();
	setTimeout(simon, 3000);	//tiempo que tardá en arrancar el juego
}

//función que oculta los campos de los jugadores al acabar la partida
function finalizar(){
	document.getElementById('simondice').style.visibility = 'hidden';
	document.getElementById('tu').style.visibility = 'hidden';
}

//Función que carga los colores en la página
function cargarColor(){

	for(var i = 0; i < zonas.length; i++){
		var zona = document.getElementById(zonas[i]);	//recogemos los zonas del array
		zona.style.background = colores[i][0];	//añadimos los colores a las zonas
		zona.style.borderColor = colores[i][2];	//añadimos un borde a la zonas
	}
}

//Función que establece un sonido a cada una de las zonas segun su color
function sonidos(idZona){

	//si la zona es la roja
	if(idZona == "rojo"){
		var audio = document.createElement('audio');	//creamos la etiqueta audio
		var source = document.createElement('source');	//creamos la etiqueta source

		audio.setAttribute("autoplay","autoplay");	//añadimos a la etiqueta audio el atributo autoplay para que se inicié automáticamente

		source.setAttribute("src","sounds/1.mp3");	//añadimos a la etiqueta source el atributo source o src con la dirección del archivo de audio
		source.setAttribute("type","audio/mpeg");	//añadimos a la etiqueta source el atributo type con el tipo de formato que vamos a reproducir
		source.setAttribute("src", "sounds/1.ogg");	//añadimos a la etiqueta source el atributo source o src con la dirección del archivo de audio
		source.setAttribute("type", "audio/ogg");	//añadimos a la etiqueta source el atributo type con el tipo de formato que vamos a reproducir

		audio.appendChild(source);	//decimos que source es un hijo de la etiqueta audio
		document.getElementById('sonido').appendChild(audio);//decimos que audio es hijo del div sonido
	}
	if(idZona == "verde"){
		var audio = document.createElement('audio');
		var source = document.createElement('source');

		audio.setAttribute("autoplay","autoplay");

		source.setAttribute("src","sounds/2.mp3");
		source.setAttribute("type","audio/mpeg");
		source.setAttribute("src", "sounds/2.ogg");
		source.setAttribute("type", "audio/ogg");

		audio.appendChild(source);
		document.getElementById('sonido').appendChild(audio);
	}
	if(idZona == "azul"){
		var audio = document.createElement('audio');
		var source = document.createElement('source');

		audio.setAttribute("autoplay","autoplay");

		source.setAttribute("src","sounds/3.mp3");
		source.setAttribute("type","audio/mpeg");
		source.setAttribute("src", "sounds/3.ogg");
		source.setAttribute("type", "audio/ogg");

		audio.appendChild(source);
		document.getElementById('sonido').appendChild(audio);
	}
	if(idZona == "amarillo"){
		var audio = document.createElement('audio');
		var source = document.createElement('source');

		audio.setAttribute("autoplay","autoplay");

		source.setAttribute("src","sounds/4.mp3");
		source.setAttribute("type","audio/mpeg");
		source.setAttribute("src", "sounds/4.ogg");
		source.setAttribute("type", "audio/ogg");

		audio.appendChild(source);
		document.getElementById('sonido').appendChild(audio);
	}

}

//Función que muestra el color seleccionado aleatoriamente y el sonido de ese color
function pulsarZona(idZona){

	//Se busca la zona a pulsar
	var pulsaZona = zonas.indexOf(idZona);
	var zona = document.getElementById(idZona);
	sonidos(idZona);	//Se asigna el sonido correspondiente segun el color de la zona
	zona.style.background = colores[pulsaZona][1];	//Se cambia el color de la zona

	setTimeout(cargarColor, 400);	//tiempo que transcurre para cambiar a los colores por defecto

}

//Función que muestra el turno del usuario
function tuTurno(){

	movimiento = 0;	//ponemos los movimientos en 0
	document.getElementById('simondice').style.visibility = 'hidden';	//ocultamos el campo del simon
	document.getElementById('tu').style.visibility = 'visible';	//mostramos el campo del usuario
	jugador = document.getElementById('tu');

}

//Función que recoge la partida del usuario y muestra un mensaje si perdemos
function tuSecuencia(idZona){

	var pulsaZona = zonas.indexOf(idZona);	//Busca el botón que se ha presionado por simon
	//si la secuencia es distinta a la de simon
	if(secuencia[movimiento++] != pulsaZona){
		cargarColor();	//carga los colores por defecto
		document.getElementById('poner-ronda').innerHTML = "Lo sentimos te quedasté en la RONDA " + ronda;	//muestra la ronda en la que nos hemos quedado

		finalizar();	//oculta los jugadores
		return;
	}
	//si hemos acertado con la secuencia
	if(movimiento == secuencia.length){
		jugador = '';
		setTimeout(simon, 1000);	//tiempo que transcurre para pasar el turno a simon
	}

}

//Función que muestra el color usado por el usuario
function zonaPulsada(idZona){
	//si es el usuario el que pulsa la zona
	if(jugador == document.getElementById('tu')){		
		pulsarZona(idZona);	//se muestra el color y el sonido
		tuSecuencia(idZona);	//se recoge la partida del usuario
	}

}

//Función que genera números aleatorios con un máximo y un mínimo
function numerosAleatorios(minimo, maximo){

	var numero = Math.floor((Math.random() * (maximo - minimo + 1) + minimo));
	return numero;

}

//Función que va sumando rondas segun vaya el usuario acertando
function sumarRonda(){

	ronda++;
	document.getElementById('poner-ronda').innerHTML = 'Ronda: '+ ronda;//mostramos la ronda por la que vamos

}

//Función que muestra el movimiento de simon
function movimientoSimon(){

	pulsarZona(zonas[secuencia[movimiento]]);	//muestra el color seleccionado y lo guarda en la secuencia
	movimiento++;	//suma un movimiento
	if(movimiento == secuencia.length){
		setTimeout(tuTurno, 1000);	//pasa el turno al usuario
	}

}

//Función que genera el turno de simon y el nivel del mismo
function simon(){

	document.getElementById('simondice').style.visibility = 'visible';//mostramos el campo de simon
	document.getElementById('tu').style.visibility = 'hidden';//ocultamos el campo del usuario
	sumarRonda();	//ponemos la ronda por la que vamos
	secuencia[secuencia.length] = numerosAleatorios(0,3);	//genaramos un movimiento nuevo y lo guardamos
	movimiento = 0;

	var niveles = document.getElementsByName('niveles');
	//bucle para ver que nivel esta seleccionado
	for(var i=0;i<niveles.length;i++){
		 if(niveles[i].checked){
            var nivel=niveles[i].value;
		}
	}
	//nivel normal
	if(nivel=="normal"){
		for(var i = 0; i < secuencia.length; i++){
			//velocidad de simon a la hora de encender los colores
			setTimeout(movimientoSimon, 1000 * (i + 1));
		}
	}else if(nivel=="medio"){	//nivel medio
		for(var i = 0; i < secuencia.length; i++){
			//velocidad de simon a la hora de encender los colores
			setTimeout(movimientoSimon, 500 * (i + 1));
		}
	}else if(nivel=="experto"){	//nivel experto
		for(var i = 0; i < secuencia.length; i++){
			//velocidad de simon a la hora de encender los colores
			setTimeout(movimientoSimon, 300 * (i + 1));
		}
	}

}