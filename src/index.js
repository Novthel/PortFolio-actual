
//variables
const nav = document.querySelector('#nav');
const formulario = document.querySelector('#formulario');
const divMensaje = document.querySelector('#msj')

const inputNombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const inputTema = document.querySelector('#tema');
const inputMensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('#btn-enviar');

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;



//funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('btn-disabled');
}

function mostrarMenu (){
    nav.classList.toggle('responsive');
}

function mostrarMensaje( mensaje, tipo) {
    const oldMsg = document.querySelector('.old-msg');

    if(!oldMsg) {
        const msg = document.createElement('p');

        msg.textContent= mensaje;
        if(tipo === 'error') {
            msg.classList.add('msg-error', 'old-msg');
        }else{
            msg.classList.add('msg-success', 'old-msg');
        }
        divMensaje.appendChild(msg);
        setTimeout(()=>{
            msg.remove()
        },3000)

    }  
}

function validarCampo (e) {

    if(e.target.value.length <= 0 ){
        mostrarMensaje('* Por Favor, Complete todos los campos', 'error');
        e.target.classList.remove('border-success');
        e.target.classList.add('border-error');
    }else {
        e.target.classList.add('border-success');
        e.target.classList.remove('border-error');
        validarEmail(e.target);
    }

    if(re.test(inputEmail.value) && inputNombre.value !== '' && inputTema.value !== '' && inputMensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('btn-disabled')
    }

}

function validarEmail(campo) {
    if(campo.type === 'email'){
        const data = campo.value;

        if(re.test(data.toLowerCase() )){
            campo.classList.remove('border-error');
            campo.classList.add('border-success');
        }else {
            mostrarMensaje('Email No valido', 'error');
            campo.classList.remove('border-success');
            campo.classList.add('border-error');
        }   
    }
}

function enviarEmail(e) {
    e.preventDefault()

    emailjs.sendForm('service_b2c5gcx', 'template_bbtrew6', e.target)
    .then((result) => {
        const resp = result.text;

        if(resp === 'OK') {
            mostrarMensaje('Correo Enviado Exitosamente', '')
            resetFormulario();
        }
    }, (error) => {
        console.log(error.text);
    });
}

function resetFormulario(){
    const bs = document.querySelectorAll('.border-success', 'border-error');
    if(bs){
        inputEmail.classList.remove('border-success', 'border-error');
        inputNombre.classList.remove('border-success', 'border-error');
        inputTema.classList.remove('border-success', 'border-error');
        inputMensaje.classList.remove('border-success', 'border-error');
    }
    formulario.reset();
    iniciarApp();
}


inputNombre.addEventListener('blur', validarCampo);
inputEmail.addEventListener('blur', validarCampo);
inputTema.addEventListener('blur', validarCampo);
inputMensaje.addEventListener('blur', validarCampo);

window.onload =()=>{
    iniciarApp()
    formulario.addEventListener('submit', enviarEmail);
}
