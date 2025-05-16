const localStorageKey = 'to-do-list-AS'

function validateIFExisteNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exist = values.find(x => x.name == inputValue)
    return !exist ? false : true
}

function newTask() {

    let input = document.getElementById('input-new-task') //recebe o valor do inupt.

    //validação
    if(!input.value){
        window.alert("Por favor, preencha o campo!")
    }else if (validateIFExisteNewTask()){
        window.alert("Já exite uma task com essa descrição!")
    }
    else {
        //ADICIONANDO MINHAS TASK NO "LOCALSTORAGE" OU SALVANDO!

        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
             id: Date.now(),
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))

        //chamando a funtion de monstrar na tela
        showValues ()
    }
    input.value = ''
}
//FUNTION RESPONSAVEL POR MOSTRAR O VALOR NA TELA!

function showValues () {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''

    //laço de repetição
    for( let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values [i] ['name']}<button id='btn-ok' onclick= "removeItem('${values [i].id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></button></li>`
    }
}
function removeItem(id){
     let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
     let index = values.findIndex(x => x.id == id)
     values.splice(index, 1)
     localStorage.setItem(localStorageKey,JSON.stringify(values))

    showValues()
}

showValues()