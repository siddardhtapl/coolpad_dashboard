var zone = localStorage.getItem('zone')
var locationn = localStorage.getItem('location')
var company = localStorage.getItem('company')
var group = localStorage.getItem('group')
var common4all = group + '__' + locationn + '__' + zone + '__' + company



current_date = "2020-08-04"
start_date = "2020-08-03"
end_date = "2020-08-07"
//  current_date = moment().format('YYYY-MM-DD');
//  start_date = moment().startOf('isoWeek').format('YYYY-MM-DD');
//  end_date=moment().add(1,'days').format('YYYY-MM-DD');



if (!localStorage.getItem("session")) {
  alert("Please Login to continue");
  window.location.href = "../login";
}

function logout() {
  localStorage.removeItem("session");
  window.location.href = "../login";
}

function share() {
  var msgbody = "http://takvaviya.in:8001/coolpad_ui/project/login/";
  var url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Coolpad Dashboard&body=link here: ' + msgbody + '&ui=2&tf=1&pli=1';
  window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
}


// praveen
console.log("hellos");

function load_user_list() {

  console
  // document.getElementById("user_list").innerHTML = ``
  fetch('https://takvaviya.in/coolpad_backend/user/getall'+ '/' + common4all)
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
                    <a href="#" class="Edit btn btn-outline-primary" data-toggle="modal"  onclick="update_user('${user["user"]}', '${user["team"]}')" data-target="#myModal" title="Edit" data-toggle="tooltip"><i class="fa fa-edit" aria-hidden="true"></i></a>
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

// update_user('${data[item]["user"]}', '${data[item]["team"]}')
load_user_list();





function delete_user(user) {
  console.log("heit", user);
  if (confirm('Are you sure you want to delete this?')) {
    // Save it!
    console.log('Thing was saved to the database.');
    fetch('https://takvaviya.in/coolpad_backend/user/deleteEmps/' + user + '/' + common4all , {
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
  } else {
    // Do nothing!
    console.log('Thing was not saved to the database.');
  }


  // https://takvaviya.in/coolpad_backend/user/deleteEmps/152346789A123456789B
  // fetch('https://takvaviya.in/coolpad_backend/user/deleteEmps/' + user, {
  //   method: 'POST'
  // })
  //   .then(function (response) {
  //     return response.json();
  //   }).then(function (data) {
  //     console.log(data);
  //     if (data.status === "success") {
  //       console.log("ss");
  //       load_user_list();
  //     }
  //   });
}





function update_user(user, current_team) {

  localStorage.setItem("cuser", user);
  localStorage.setItem("cteam", current_team);
  document.getElementById("def_select").value = localStorage.getItem('cteam')


}


function deviceStatus(deviceId) {
  console.log("clicked clone", deviceId)

  fetch('https://takvaviya.in/coolpad_backend/user/deviceStatus/' + deviceId )
    .then(response => response.json())
    .then(data => {
      console.log('ee', data.shutdown);

      if (data.shutdown === false) {
        document.getElementById(deviceId).innerHTML = `<div>ON</div>`
        //  refStatus(deviceId)
        //  setInterval(load_user_list(),500000 );

      } else {
        document.getElementById(deviceId).innerHTML = `<div>OFF</div>`
      }

    });

}

setInterval(load_user_list(), 30 * 60 * 1000);




// console.log("ct", current_teamm);

function save() {
  console.log(document.getElementById("modal_did").value + document.getElementById("team-value").value);

  var obj = {
    "team": document.getElementById("team-value").value,
    "device_id": document.getElementById("modal_did").value
  }


  console.log("fd", JSON.stringify(obj))

  //   https://takvaviya.in/coolpad_backend/user/update_emp/username

  fetch("https://takvaviya.in/coolpad_backend/user/update_emp/" + localStorage.getItem('cuser'), {
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

/*Theme Toggle*/
function toggleCheck() {
  if (document.getElementById("myCheckbox").checked === true) {
    localStorage.setItem("theme", "light");
    document.getElementById("img").src = "../../static/assets/img/coolpad-logo-black.png";
    document.getElementById("img1").src = "../../static/assets/img/logo-final-black.png";
    document.getElementById('theme').href = "../../static/assets/css/style_light.css";
    try {
      changeNetworkmodelTheme('light');

    }
    catch (e) { console.log(e) }

    try {

      clk_chart();
    }
    catch (e) { console.log(e) }



  }
  else {
    localStorage.setItem("theme", "dark");
    document.getElementById("img").src = "../../static/assets/img/coolpad-logo.png";
    document.getElementById("img1").src = "../../static/assets/img/takvaviya-main-logo.png";
    document.getElementById('theme').href = "../../static/assets/css/style.css";
    try {
      changeNetworkmodelTheme('dark');

    }
    catch (e) { console.log(e) }

    try {

      clk_chart();
    }
    catch (e) { console.log(e) }




  }
}
function checkTheme() {
  if (localStorage.getItem("theme") == "light") {
    document.getElementById("myCheckbox").checked = true;


  }
  else if (localStorage.getItem("theme") == "dark") {
    document.getElementById("myCheckbox").checked = false;

  }
  toggleCheck();
}
/*Theme toggle Ends*/


// A $( document ).ready() block.
$(document).ready(function () {

  checkTheme();
  //document.getElementById('theme').href="../../static/assets/css/style_light.css";
});

function outlier() {
  fetch('https://takvaviya.in/coolpad_backend/user/outliers/'+start_date+'/'+end_date+'/'+common4all).then(responsive => {
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

function opentab_cf(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}


function Get_team_add() {

  fetch('https://takvaviya.in/coolpad_backend/user/getTeams/'+ '/' + common4all)
    .then(response => response.json())
    .then(data => {
      console.log("teams", Object.values(data.teams))

      const innerdiv = Object.values(data.teams).map(item => {
        console.log(item)
        return `<option>${item}</option>`
      }).join(" ");

      console.log('ss', innerdiv);
      document.getElementById('team1').innerHTML = `<option>Select</option>` + innerdiv

    });


}


function Get_team_edit() {

  fetch('https://takvaviya.in/coolpad_backend/user/getTeams/'+ '/' + common4all)
    .then(response => response.json())
    .then(data => {
      console.log("teams", Object.values(data.teams))

      const innerdiv = Object.values(data.teams).map(item => {
        console.log(item)
        return `<option>${item}</option>`
      }).join(" ");

      console.log('ss', innerdiv);
      document.getElementById('team-value').innerHTML = `<option>Select</option>` + innerdiv

    });


}

Get_team_edit()
Get_team_add();




/* LOST DEVICES START */
function getAllMissingDevices() {
  let missingDevicesTab = document.getElementById('missing-devices');
  //don't call api if not on the missing devices tab
  if (missingDevicesTab.style.display === 'block') {
    fetch('https://takvaviya.in/coolpad_backend/user/missedDevice/'+common4all).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        document.getElementById("missing-card-noData").innerHTML = `Request failed!`;
        throw new Error('Request failed!');
      }, networkError => {
        document.getElementById("missing-card-noData").innerHTML = `${networkError.message}`;
      }).then(function (responseJson) {
        let allmissingDevices = Object.values(responseJson);
        if (allmissingDevices && allmissingDevices.length > 0) {
          renderMissingDevices(allmissingDevices)
        }
      });
  }
  //todo filter only today's devices.
}
function renderMissingDevices(allmissingDevices) {
  let missingDevicesDiv = document.getElementById('missing-devices-list');
  let innerHtml = `<div class="missingDeviceCard"><div class="missingCardText">No data Available</div></div>`;
  if (allmissingDevices && missingDevicesDiv) {
    innerHtml = '';
    allmissingDevices.forEach(missing => {
      innerHtml += `<div class="missingDeviceCard">
          <div><i class="fa fa-mobile-alt" aria-hidden="true"></i> Device ID:<div class="missingCardText">${missing.deviceID}</div></div>
          <div><i class="fa fa-id-badge" aria-hidden="true"></i> User: <div class="missingCardText">${missing.emp}</div></div>
          <div><i class="fa fa-calendar-o" aria-hidden="true"></i> Date: <span>${new Date(missing.date).toLocaleDateString()}</span></div>
          <div><i class="fa fa-clock-o" aria-hidden="true"></i> Missing Duration: <span>${missing.duration} hrs</span></div>
                    </div>`
    });
    missingDevicesDiv.innerHTML = innerHtml;
    console.clear();
    console.log(allmissingDevices);
  }
  else {
    missingDevicesDiv.innerHTML = innerHtml;
  }
}
//refresh every 30 minutes
missingDevicesInterval = setInterval(() => {
  getAllMissingDevices();
}, 180000);
/* LOST DEVICES END */