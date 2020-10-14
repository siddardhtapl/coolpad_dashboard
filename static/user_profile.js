function Get_team_add_edit() {
  fetch('https://takvaviya.in/coolpad_backend/user/getTeams' + '/' + common4all)
    .then(response => response.json())
    .then(data => {
      const innerdiv = Object.values(data.teams).map(item => {
        return `<option>${item}</option>`
      }).join(" ");
      document.getElementById('team1').innerHTML = `<option>Select</option>` + innerdiv
      const innerdiv_edit_team = Object.values(data.teams).map(item => {
        return `<option>${item}</option>`
      }).join(" ");
      document.getElementById('team-value').innerHTML = `<option>Select</option>` + innerdiv_edit_team
    });
}
Get_team_add_edit();
function out_csv() {

  //Todo not user instance its emp instance

  var user_instance = localStorage.getItem('current_user');
  fetch('https://www.takvaviya.in/coolpad_backend/user/outliers_report/csv/' + start_date + '/' + end_date + '/' + common4all)
    .then(response => response.json())
    .then(data => {
      // console.log(data.path+".pdf");
      window.open(data.path + ".csv");

    });

}
function out_pdf() {

  //Todo not user instance its emp instance

  var user_instance = localStorage.getItem('current_user');
  console.log(user_instance);
  // 'https://takvaviya.in/coolpad_backend/user/pdf_gen/' + user_instance + '/' + start_date + '/' + end_date + '/' + current_date + '/' + common4all
  fetch('https://www.takvaviya.in/coolpad_backend/user/pdf_gen_outlier/' + start_date + '/' + end_date + '/' + common4all)
    .then(response => response.json())
    .then(data => {
      // console.log(data.path+".pdf");
      window.open(data.path + ".pdf");
    });

}

function out_xls() {

  //Todo not user instance its emp instance

  var user_instance = localStorage.getItem('current_user');
  console.log(user_instance);
  fetch('https://www.takvaviya.in/coolpad_backend/user/outliers_report/xlsx/' + start_date + '/' + end_date + '/' + common4all)
    .then(response => response.json())
    .then(data => {
      // console.log(data.path+".pdf");
      window.open(data.path + ".xlsx");
    });
}
/**/


function outlier() {
  fetch('https://takvaviya.in/coolpad_backend/user/outliers/' + start_date + '/' + end_date + '/' + common4all).then(responsive => {
    return responsive.json();
  }).then(data => {

    console.log("aslkf'lsakfa;d'k;", data)
    const innerdiv = Object.keys(data).map(item => {


      return `<div class="center">

  <div class="profile">
      <div class="image">
          <div class="circle-1"></div>
          <div class="circle-2"></div>
          <span class="outliers-img"><i class="fa fa-user" aria-hidden="true"></i></span>
      </div>

  </div>

  <div class="stats">
      <div class="box">
          <span class="value">${item}</span>
          <span class="parameter">NAME</span>
      </div>
      <div class="box">
          <span class="value">${data[item]}</span>
          <span class="parameter">COUNT</span>
      </div>

  </div>
</div><br>`
    }).join(" ")
    document.getElementById("out").innerHTML = innerdiv;
  })
}

outlier();


/* Edit USER*/
function save() {

  if (localStorage.getItem('priv') === 'HR') {
    console.log(document.getElementById("modal_uid").value + document.getElementById("team-value").value);
    console.log("HR save logic");

    if (document.getElementById("team-value").value == "Select") {
      var obj = {
        "team": localStorage.getItem("cteam"),
        "user_id": document.getElementById("modal_uid").value
      }
      console.log(obj);
    }
    else if (document.getElementById("modal_uid").value == "") {

      var obj = {
        "team": document.getElementById("team-value").value,
        "user_id": localStorage.getItem("current_user_id")
      }
      console.log(obj);
    }
    else {
      var obj = {
        "team": document.getElementById("team-value").value,
        "user_id": document.getElementById("modal_uid").value
      }
      console.log(obj);
    }

    fetch("https://www.takvaviya.in/coolpad_backend/user/editUsername/" + localStorage.getItem('cuser') + "/" + common4all, {
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
  else {
    console.log(document.getElementById("modal_did").value + document.getElementById("team-value").value);
    if (document.getElementById("team-value").value == "Select") {
      var obj = {
        "team": localStorage.getItem("cteam"),
        "device_id": document.getElementById("modal_did").value
      }
    }
    else if (document.getElementById("modal_did").value == "") {

      var obj = {
        "team": document.getElementById("team-value").value,
        "device_id": localStorage.getItem("current_dev_id")
      }
    }
    else {
      var obj = {
        "team": document.getElementById("team-value").value,
        "device_id": document.getElementById("modal_did").value
      }
    }
    console.log("fd", JSON.stringify(obj))
    fetch("https://takvaviya.in/coolpad_backend/user/update_emp/" + localStorage.getItem('cuser') + "/" + common4all, {
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


}

function update_user(user, current_team, device_id, user_id) {

  document.getElementById("dialog_update").innerHTML = "";

  document.getElementById("checkbox_update").innerHTML = "";

  if (localStorage.getItem('priv') === 'HR') {

    document.getElementById("checkbox_update").innerHTML = `User Name`;

    document.getElementById("dialog_update").innerHTML = `<div class="form-group">
    <label>User Name</label>
   <input type="text" class="form-control" placeholder="User Name"
       id="modal_uid">
 </div>`;


  } else {
    document.getElementById("checkbox_update").innerHTML = `Device ID`;
    document.getElementById("dialog_update").innerHTML = `<div class="form-group">
   <label>Device ID</label>
  <input type="text" class="form-control" placeholder="Device ID"
      id="modal_did">
</div>`
  }


  localStorage.setItem("cuser", user);
  localStorage.setItem("cteam", current_team);
  localStorage.setItem("current_dev_id", device_id);
  localStorage.setItem("current_user_id", user_id);
  document.getElementById("def_select").value = localStorage.getItem('cteam')


}
function deviceStatus(deviceId) {
  fetch('https://takvaviya.in/coolpad_backend/user/deviceStatus/' + deviceId)
    .then(response => response.json())
    .then(data => {
      if (data.shutdown === "ON") {
        document.getElementById(deviceId).innerHTML = `<div>ON</div>`
      }
      else {
        document.getElementById(deviceId).innerHTML = `<div>OFF</div>`
      }
    });

}

/*Delete*/
function delete_user(user) {
  if (confirm('Are you sure you want to delete this?')) {
    // Save it!
    console.log('Thing was saved to the database.');
    fetch('https://takvaviya.in/coolpad_backend/user/deleteEmps/' + user, {
      method: 'POST'
    })
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        if (data['deleted'] === "true") {
          load_user_list();
        }
      });
  }
   else {
    // Do nothing!
    console.log('Thing was not saved to the database.');
  }
}

function load_user_list() {
  fetch('https://takvaviya.in/coolpad_backend/user/userDeviceStatus' + '/' + common4all)
    .then(response => response.json())
    .then(data => {
      let allUsers = Object.values(data);
      let unDeletedUsers = allUsers.filter(user => user.is_Deleted === 'false');
      const innerdiv = unDeletedUsers.map(user => {
        return `<tr>
                <td>${user["user"]}</td>
                <td>${user["user_id"]}</td>
                <td>${user["device_id"]}</td>
                <td>${user["zone"]}</td>
                <td><span class="status text-success"></span> ${user["locations"]}</td>
                <td class="action-icons">
                    <a href="#" class="Edit btn btn-outline-primary" data-toggle="modal"  onclick="update_user('${user["user"]}', '${user["team"]}','${user["device_id"]}', '${user["user_id"]}')" data-target="#myModal" title="Edit" data-toggle="tooltip"><i class="fa fa-edit" aria-hidden="true"></i></a>
                    <a href="#" class="delete btn btn-outline-danger" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" aria-hidden="true" onclick="delete_user('${user["device_id"]}')"></i></a>
                   <div id='${user["device_id"]}'>
                   <a href="#" class="delete btn btn-outline-danger" title="clone" data-toggle="tooltip" onclick="deviceStatus('${user["device_id"]}')">
	                    <i class="fa fa-circle" aria-hidden="true"></i>
                    </a>
                    </div>
                </td>
                </tr>`
      }).join(" ");
      document.getElementById("user_list").innerHTML = innerdiv;
    });
}
load_user_list();
setInterval(load_user_list(), 30 * 60 * 1000);