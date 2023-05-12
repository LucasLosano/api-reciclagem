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
    const response = await fetch(link, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    if (response.ok) {
        alert('Pedido enviado com sucesso!');
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
