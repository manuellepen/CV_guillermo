// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input
var formulario = document.form;
var elementos = formulario.elements;

// Funcion que se ejecuta cuando el evento click es activado

// var validarInputs = function () {
//     for (var i = 0; i < elementos.length; i++) {
//         // Identificamos si el elemento es de tipo texto, email, password, radio o checkbox
//         if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "textarea") {
//             // Si es tipo texto, email o password vamos a comprobar que esten completados los input
//             if (elementos[i].value.length == 0) {
//                 console.log('El campo ' + elementos[i].name + ' esta incompleto');
//                 elementos[i].className = elementos[i].className + " error";
//                 return false;
//             } else {
//                 elementos[i].className = elementos[i].className.replace(" error", "");
//             }
//         }
//     }


//     return true;
// };



// function validarNombre(){
//     var tamaño = elementos.nombre.value.length;
//     if(tamaño > 0 && tamaño < 50){
//         return true;
//     }else{
//         error("Nombre");
//         blurInput(elementos.nombre);
//         return false;
//     }
// }

function error(campo){
    console.log("Hay un error en el campo " + campo);
}

var enviar = function (e) {
    if (!validarNombre()){//!validarInputs()) {
        console.log('Falto validar los Input');
        e.preventDefault();
    } else {
        console.log('Envia');
        e.preventDefault();
    }
}

function focusInput() {
    //console.log(this.name + ' fue modificado')
    removeError(this);
}


function blurInput() {
    //var mensaje="";
   
    if (!this.classList.contains('error') && validarVacio(this.value) ) {
        //mensaje = 'El campo ' + this.name + ' no puede estar vacio.';
        addError(this,mensaje);
            // advertirError(mensaje)
    }else if(validarEmail(this)) {
        //mensaje = 'El campo ' + this.name + ' debe tener la siguiente estructura texto@texto.com.';    
        addError(this);
    }else if (validarMax(this.value)) {
        //mensaje = 'El campo ' + this.name + ' no puede tener mas de 50 caracteres.';
        addError(this,mensaje);
    } else if(validarMaxTextArea(this.value)){
        //mensaje = 'El campo ' + this.name + ' no puede tener mas de 300 caracteres.';
        addError(this,mensaje);
    }else{
        formulario.querySelector(".formcontato__botao").disabled = false;
    }

}

function addError(element, mensaje){
    element.parentElement.children[1].classList.remove("active");
    element.parentElement.children[1].classList.add("error");
    element.parentElement.children[0].classList.add("error");
   // advertirError(mensaje);
}

function removeError(element) {
    element.parentElement.children[0].classList.remove("error");
    element.parentElement.children[1].classList.remove("error")
    element.parentElement.children[1].classList.add("active");
}

function validarVacio(valor){
    //console.log(valor);
    return valor.length == 0 || valor == null ?  true :  false;
}

function validarMax(valor){
    //console.log(this.name);
    return valor.length > 50 && this.name != "mensaje" ?  true :  false;
}

function validarMaxTextArea(valor){
    return valor.length > 50 && this.name != "mensaje" ?  true :  false;
}

function validarEmail(valor){
    var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(valor.name == "email"){
        
        return !regOficial.test(valor.value);
    }else{
        return true;
    }
}

function advertirError(mensaje){
    console.log(mensaje);
    //confirm(mensaje);
    alert(mensaje);
}


// --- Eventos ---
formulario.addEventListener("submit", enviar);

for (var i = 0; i < elementos.length; i++) {
    if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "textarea") {
        elementos[i].addEventListener("focus", focusInput);
        elementos[i].addEventListener("blur", blurInput);
    }
}

