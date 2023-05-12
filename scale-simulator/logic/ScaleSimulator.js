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

async function enviarFormulario(peso, material, departamento, link, identificador) {
    console.log(peso);
    console.log(material);
    console.log(departamento);
    console.log(link);
    const data = JSON.stringify({
        departamento: departamento,
        peso: peso,
        nome: material,
        id: identificador
    });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDVkYWM3NmE0M2I2NzQ3ODc5NTgyOTciLCJpYXQiOjE2ODM4NjA2MDN9.nmKIVjLWxA0cWdZkiNuml-4FNQnCMPUtpJkn6Z6tka8';
    const response = await fetch(link, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: data
    });
    
    if (response.ok) {
        alert('Requisição enviado com sucesso!');
        console.log(await response.text());
        clearFields();
    } else {
        alert('Houve um erro ao enviar a Requisição.');
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