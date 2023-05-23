function validarFormulario() {
    const peso = document.getElementById('peso').value;
    const material = document.getElementById('material').value;
    const departamento = document.getElementById('departamento').value;
    const link = document.getElementById('link').value;
    const identificador = document.getElementById('identificador').value;

    if (!peso || !material || !departamento || !link || !identificador) {
        alert('Por favor, preencha todos os campos obrigatórios!');
    } else {
        console.log(peso);
        console.log(material);
        console.log(departamento);
        console.log(link);

        enviarFormulario(peso, material, departamento, link, identificador);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const response = fetch('http://localhost:3000/api/v1/materiais', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDY5MGU4N2NjYTY1N2U2YmVlZDdlYWQiLCJpYXQiOjE2ODQ2OTQwNDF9.zN8hxa8bleteLdpyVFJql7kjmrhQtAp2TrXIwEbaIHA'
        },
    }).then(response => response.json())
    .then(data => {
      const selectElement = document.getElementById('material'); // Substitua 'seu-select' pelo ID correto do seu elemento <select>
      data.retorno.forEach(opcao => {
        const optionElement = document.createElement('option');
        console.log( opcao.nomeMaterial);
        console.log( opcao.valor);
        optionElement.label = opcao.nomeMaterial;
        optionElement.value = opcao.id;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => {
      console.error('Erro ao obter as opções:', error);
    });
  });

async function enviarFormulario(peso, material, departamento, link, identificador) {
    console.log(peso);
    console.log(material);
    console.log(departamento);
    console.log(link);
    const data = JSON.stringify({
        departamentoId:  Number(departamento),
        peso:  Number(peso),
        materialId : Number(material),
        id: Number(identificador)
    });
    const response = await fetch(link, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDY5MGU4N2NjYTY1N2U2YmVlZDdlYWQiLCJpYXQiOjE2ODQ2OTQwNDF9.zN8hxa8bleteLdpyVFJql7kjmrhQtAp2TrXIwEbaIHA'
        },
        body: data
    });
    if (response.ok) {
        alert('Pesagem enviada com sucesso!');
        console.log(await response.text());
        clearFields();
    } else {
        alert('Houve um erro ao enviar o pedido.');
    }
}

function clearFields(params) {
    document.getElementById('peso').value = "";
    document.getElementById('departamento').value = "";
    document.getElementById('link').value = "";
    document.getElementById('identificador').value = "";
}
var form = document.getElementById("scaleForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);
