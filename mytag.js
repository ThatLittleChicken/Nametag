let user = JSON.parse(sessionStorage.getItem('user')) ?? 'Not logged in';

document.getElementById('user').textContent = user;

let inputIdArray = ['name','phone','email','insta','fb','linkedin','others'];

inputIdArray.forEach((id) => {
    let el = document.getElementById(id);
    [ "input", "keydown", "keyup", "drop", "focusout" ].forEach(function(event) {
        el.addEventListener(event, () => updateField(el,id));
    });
});

function updateField(el,id){
    id = id + "F";
    if(el.value != null){
        if(id == "phoneF"){
            el.value = el.value.replace(/[^(0-9\(\)\-) ]/g, '');
        }
        if(id == "emailF"){
            el.value = el.value.replace(/[^a-zA-Z0-9@.]/g, '');
        }
        document.getElementById(id).textContent = el.value;
    }
}