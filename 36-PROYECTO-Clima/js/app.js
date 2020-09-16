const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

 window.addEventListener('load', () =>{
     formulario.addEventListener('submit', buscarClima);
 })


 function buscarClima(e){
     e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '')
    {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    //consultar la API

    consultarAPI(ciudad, pais);
    
 }

 function mostrarError(mensaje){
   const alerta = document.querySelector('.bg-red-100');

   if(!alerta){
     // crear alerta

     const alerta = document.createElement('div');
     alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounend', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

     alerta.innerHTML=`
     <strong class="font-bold">Error!!</strong>
     <span class="block">${mensaje}</span>
     
     `;

     container.appendChild(alerta);

     //eliminar la alerta despues de 5 segundos
     setTimeout(() =>{
         alerta.remove();
     }, 5000);
 }

}

function consultarAPI(ciudad, pais){

    const appID='a97954e3030d98e523d7fcf90f45355c';

    const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;  

        spinner(); //muestra un spinner de carga

    fetch(url)
        .then ( respuesta => respuesta.json())
        .then(datos => {
           // console.log(datos);
           LimpiarHtml();//limpiar el html
            if(datos.cod === "404")
            {
                mostrarError('Ciudad no encontrada')
                return;
            }
            //imprimer datos;
            mostrarClima(datos);

        })
}

function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min }} = datos;
    
    const centigrados = KelvinACentigrados(temp);   
    const max = KelvinACentigrados(temp_max);
    const min = KelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-4xl');

    const temperaturaMaxima = document.createElement('p');
    temperaturaMaxima.innerHTML = `Temperatura Maxima: ${max} &#8451;`;
    temperaturaMaxima.classList.add('text-xl');
    
    const temperaturaMinima = document.createElement('p');
    temperaturaMinima.innerHTML = `Temperatura Minima: ${min} &#8451;`;
    temperaturaMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temperaturaMaxima);
    resultadoDiv.appendChild(temperaturaMinima);
    

    resultado.appendChild(resultadoDiv);
}

function KelvinACentigrados(grados){
return parseInt(grados - 273.15);
}

function LimpiarHtml (){
    while(resultado.firstChild)
    {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner (){

    LimpiarHtml(); 
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `

  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>

    
    `;
    resultado.appendChild(divSpinner);
}