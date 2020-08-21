var user_name = "demo"
function load_notes() {
    fetch('http://takvaviya.in:8001/coolpad/notes/getallnotes/' + user_name)
        .then(response => response.json())
        .then(data => {
            console.log("xx", data);
            Object.keys(data).map(item => {
                console.log("item", Object.keys(data[item]));
                const innerdiv = Object.keys(data[item]).map(nitem => {
                    console.log("nn", data[item][nitem].date_time)
                    return `
                    <div class="note_card">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                    <div class="ndate" style='flex:5'><b>${ data[item][nitem].date_time}</b></div>
                    <div onclick="Note_delete(${nitem})" style="color: rgb(187, 66, 66); font-size:10px;cursor: pointer;margin-right: 1rem;"><b>REMOVE</b></div>
                    </div>
                    <div class="nnote" id="nnote"><p style="padding-right: 40px;">${ data[item][nitem].notes}</p></div>
                    </div>`
                }).join(" ");
                document.getElementById("load_notes").innerHTML = innerdiv
            })
        });
}
 load_notes();
const trigger = document.getElementById("open-modal-btn")
const closeBtn = document.getElementById("close-modal-btn")
const modal = document.getElementById("my-modal")
trigger.addEventListener('click', () => {
    modal.showModal();
});
closeBtn.addEventListener('click', () => {
    modal.close();
    document.getElementById("note_textt").value = '';
});
function Submit() {
    console.log("logged", document.getElementById("note_textt").value)
    var note = document.getElementById("note_textt").value
    const data = { "date_time": "2020-08-01", "notes": note }
    fetch('http://takvaviya.in:8001/coolpad/notes/save/' + user_name, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            load_notes();
            modal.close();
            document.getElementById("note_textt").value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            modal.close();
        });
}
function Note_delete(id) {
    console.log("delete", id);
    // fetch()
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    function reqListener() {
        console.log("res", this.responseText);
    }
    fetch('http://takvaviya.in:8001/coolpad/notes/delete/' + id + '/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            load_notes();
            modal.close();
            document.getElementById("note_textt").value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            modal.close();
        });
    load_notes();
}