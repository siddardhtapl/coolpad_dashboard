if(!localStorage.getItem("session"))
{
alert("Please Login to continue");
window.location.href="../login";
}

function logout(){
localStorage.removeItem("session");
window.location.href="../login";
}

function share(){
                var msgbody = "http://takvaviya.in:8001/coolpad_ui/project/login/";
                var url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Coolpad Dashboard&body=link here: '+msgbody+'&ui=2&tf=1&pli=1';
                window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
            }


            // praveen
            console.log("hello");

function load_user_list() {

    document.getElementById("user_list").innerHTML = ``
    fetch('http://takvaviya.in:8001/coolpad/user/getall/')
        .then(response => response.json())
        .then(data => {

            console.log(data)

            const innerdiv = Object.keys(data).map(item => {
                return `<tr>
                <td>${data[item]["user"]}</td>
                <td><a href="#">${data[item]["user_id"]}</a></td>
                <td>${data[item]["device_id"]}</td>                        
                <td>${data[item]["zone"]}</td>
                <td><span class="status text-success"></span> ${data[item]["locations"]}</td>
                <td class="action-icons">
                    <a href="#" class="Edit btn btn-outline-primary" data-toggle="modal"  onclick="update_user('${data[item]["user"]}', '${data[item]["team"]}')" data-target="#myModal" title="Edit" data-toggle="tooltip"><i class="fa fa-edit" aria-hidden="true"></i></a>
                    <a href="#" class="delete btn btn-outline-danger" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" aria-hidden="true" onclick="delete_user('${data[item]["user"]}')"></i></a>
                </td>
                </tr>`
            }).join(" ");

            document.getElementById("user_list").innerHTML = innerdiv
        });
}

// update_user('${data[item]["user"]}', '${data[item]["team"]}')
load_user_list();


function delete_user(user) {
    console.log("heit", user);

    fetch('http://takvaviya.in:8001/coolpad/user/delete_emp/' + user, {
        method: 'POST'
    })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data.status === "success") {
                console.log("ss");
                load_user_list();
            }
        });
}





function update_user(user, current_team) {

    localStorage.setItem("cuser", user);
    localStorage.setItem("cteam", current_team);

    document.getElementById("def_select").value = localStorage.getItem('cteam')


}



// console.log("ct", current_teamm);

function save() {
    console.log(document.getElementById("modal_did").value + document.getElementById("team-value").value);

    var obj = {
        "team": document.getElementById("team-value").value,
        "device_id": document.getElementById("modal_did").value
    }


    console.log("fd", JSON.stringify(obj))

    //   http://takvaviya.in:8001/coolpad/user/update_emp/username

    fetch("http://takvaviya.in:8001/coolpad/user/update_emp/"+localStorage.getItem('cuser'), {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            load_user_list();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

