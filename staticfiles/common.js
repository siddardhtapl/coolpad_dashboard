if (!localStorage.getItem("session")) {
  alert("Please Login to continue");
  window.location.href = "../login";
}

function logout() {
  localStorage.removeItem("session");
  window.location.href = "../login";
}

function share() {
  var msgbody = "https://takvaviya.in/coolpad_backend_ui/project/login/";
  var url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Coolpad Dashboard&body=link here: ' + msgbody + '&ui=2&tf=1&pli=1';
  window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
}


// praveen
console.log("hello");

function load_user_list() {

  // document.getElementById("user_list").innerHTML = ``
  fetch('https://takvaviya.in/coolpad_backend/user/getall/')
    .then(response => response.json())
    .then(data => {

      console.log(data)

      const innerdiv = Object.keys(data).map(item => {
        return `<tr>
                <td>${data[item]["user"]}</td>
                <td>${data[item]["user_id"]}</td>
                <td>${data[item]["device_id"]}</td>                        
                <td>${data[item]["zone"]}</td>
                <td><span class="status text-success"></span> ${data[item]["locations"]}</td>
                <td class="action-icons">
                    <a href="#" class="Edit btn btn-outline-primary" data-toggle="modal"  onclick="update_user('${data[item]["user"]}', '${data[item]["team"]}')" data-target="#myModal" title="Edit" data-toggle="tooltip"><i class="fa fa-edit" aria-hidden="true"></i></a>
                    <a href="#" class="delete btn btn-outline-danger" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" aria-hidden="true" onclick="delete_user('${data[item]["user"]}')"></i></a>
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

  fetch('https://takvaviya.in/coolpad_backend/user/delete_emp/' + user, {
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
console.log("clickeket jtheme")
    document.getElementById("img").src = "../../static/assets/img/coolpad-logo-black.png";
    document.getElementById("img1").src = "../../static/assets/img/logo-final-black.png";
    document.getElementById('theme').href="../../static/assets/css/style_light.css";
  }
  else {
    localStorage.setItem("theme", "dark");
    document.getElementById("img").src = "../../static/assets/img/coolpad-logo.png";
    document.getElementById("img1").src = "../../static/assets/img/takvaviya-main-logo.png";
    document.getElementById('theme').href="../../static/assets/css/style.css";

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
  fetch('https://takvaviya.in/coolpad_backend/user/outliers/2020-08-03/2020-08-07').then(responsive => {
    return responsive.json();
  }).then(data => {

    console.log("aslkf'lsakfa;d'k;",data)
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