  function logar() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Por favor, preencha o usuário e a senha');
    } else {
        var request = {
            username: username,
            password: password
        }
        const response = fetch('https://ecogestor-dev.azurewebsites.net/api/v1/usuarios/autenticar', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(request)
        }).then(response => response.json())
        .then(data => {
            this.errorMessage = data.error;
            if (data.sucesso) {
              sessionStorage.setItem('token', data.retorno.token)
              window.location.assign("ScaleSimulator.html");
            } else {
              alert('Erro ao Logar, verifique se o usuário e a senha estão corretos');
            }
          })
        .catch(error => {
            alert('Erro ao Logar, verifique se o usuário e a senha estão corretos');
        });
    }
}

function setAmbiente(ambiente){
  if(ambiente == 'dev')
    sessionStorage["url"] = "https://ecogestor-dev.azurewebsites.net/api/v1/";
  else
    sessionStorage["url"] = "https://ecogestor.azurewebsites.net/api/v1/";
}

var form = document.getElementById("loginForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

sessionStorage["url"] = 'https://ecogestor-dev.azurewebsites.net/api/v1/';

