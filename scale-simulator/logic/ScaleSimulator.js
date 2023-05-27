function validarFormulario() {
    const peso = document.getElementById('peso').value;
    const material = document.getElementById('material').value;
    const departamento = document.getElementById('departamento').value;
    const identificador = document.getElementById('identificador').value;

    if (!peso || !material || !departamento ||  !identificador) {
        alert('Por favor, preencha todos os campos obrigatórios!');
    } else {
        enviarFormulario(peso, material, departamento, identificador);
    }
}
var urlGeral = sessionStorage["url"];

document.addEventListener('DOMContentLoaded', function() {
    var token = sessionStorage.getItem('token');
    if(token) {
        const response = fetch(urlGeral + 'materiais', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
        }).then(response => response.json())
        .then(data => {
          const selectElement = document.getElementById('material'); // Substitua 'seu-select' pelo ID correto do seu elemento <select>
          data.retorno.forEach(opcao => {
            const optionElement = document.createElement('option');
            optionElement.label = opcao.nomeMaterial;
            optionElement.value = opcao.id;
            selectElement.appendChild(optionElement);
          });
        })
        .catch(error => {
          console.error('Erro ao obter as opções:', error);
        });
    } else {
        window.location.assign("ScaleLogin.html");
    }
});
    
async function enviarFormulario(peso, material, departamento, identificador) {
    const data = JSON.stringify({
        departamentoId:  Number(departamento),
        peso:  Number(peso),
        materialId : Number(material),
        id: Number(identificador)
    });
    var token = sessionStorage.getItem('token');

    const response = await fetch(urlGeral + "pesagens", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        },
        body: data
    });
    if (response.ok) {
        alert('Pesagem enviada com sucesso!');
        clearFields();
    } else {
        alert('Houve um erro ao enviar o pedido.');
    }
}

function clearFields(params) {
    document.getElementById('peso').value = "";
    document.getElementById('departamento').value = "";
    document.getElementById('identificador').value = "";
}
var form = document.getElementById("scaleForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);
