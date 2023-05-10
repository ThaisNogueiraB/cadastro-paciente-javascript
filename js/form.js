var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener('click', function(event) {
    event.preventDefault();
   
    var form = document.querySelector('#form-adiciona');

    //extraindo inforçaoes do paciente do form
    var paciente = obtemPacienteDoFormulario(form);

    //cria a tr e a td do paciente
    var erros = validaPaciente(paciente);
    if (erros.length > 0){
        exibeMensagansDeErro(erros);
        return;
    }

    //adicionando o  paciente na tabela 
   adicionaPacienteNaTabela(paciente);

    form.reset();
    var mensagemsErro = document.querySelector('#mensagem-erro');
    mensagemsErro.innerHTML = '';
});

function adicionaPacienteNaTabela (paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector('#tabela-pacientes');
    tabela.appendChild(pacienteTr);
};


function exibeMensagansDeErro(erros){
    var ul = document.querySelector('#mensagem-erro');
    ul.innerHTML = '';

    erros.forEach(function(erro){
        var li = document.createElement ('li');
        li.textContent = erro;
        ul.appendChild (li);
    });
}

function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement('tr');
    pacienteTr.classList.add('paciente');

    pacienteTr.appendChild(montaTd(paciente.nome,'info-nome'));
    pacienteTr.appendChild( montaTd(paciente.peso,'info-peso'));
    pacienteTr.appendChild(montaTd(paciente.altura,'info-altura'));
    pacienteTr.appendChild( montaTd(paciente.gordura,'info-gordura'));
    pacienteTr.appendChild(montaTd(paciente.imc,'info-imc'));

    return pacienteTr;
}


function montaTd(dado,classe){
    var td = document.createElement('td');
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){

    var erros = [];



    if (!validaPeso(paciente.peso)){ 
        erros.push('Peso é invalido')
    }

    if (!validaAltura(paciente.altura)){
        erros.push('Altura é inválida')
    }
        
    if (paciente.nome.length ==0){
        erros.push('O nome nao pode ser em branco');
    }

    if (paciente.gordura.length ==0){
        erros.push('A gordura nao pode ser em branco');
    }

    if (paciente.peso.length ==0){
        erros.push('O peso nao pode ser em branco');
    }

    if (paciente.altura.length ==0){
        erros.push('A altura nao pode ser em branco');
    }

    return erros;
}