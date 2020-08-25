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
    var body = document.getElementsByClassName('body');




    for (var i = 0; i < body.length; i++) {
      body[i].style.backgroundColor = "#F8F8F8";
    }
    document.getElementById("img").src = "../../static/assets/img/coolpad-logo-black.png";
    document.getElementById("img1").src = "../../static/assets/img/logo-final-black.png";
    //document.body.style.backgroundColor = "#F8F8F8";

    // 
    var card = document.getElementsByClassName('center');
    for (var n = 0; n < card.length; n++) {
      card[n].style.backgroundColor = "#7c7c7c5e";
    }

    var widget = document.getElementsByClassName('widget');
    for (var i = 0; i < widget.length; i++) {
      widget[i].style.backgroundColor = "#fff";
    }
    var para = document.getElementsByClassName('para');
    for (var i = 0; i < para.length; i++) {
      para[i].style.color = "#2F3640";
    }
    var side = document.getElementsByClassName('sidebar-wrapper');
    for (var i = 0; i < side.length; i++) {
      side[i].style.width = "195px";
      side[i].style.top = "54px";
      //side[i].style.left = "0px";
    }
    var menu = document.getElementsByClassName('menuu');
    for (var i = 0; i < menu.length; i++) {
      menu[i].style.color = "#2F3640";
      menu[i].style.fontWeight = "bold";
    }
    var actives = document.getElementsByClassName('actives');
    for (var i = 0; i < actives.length; i++) {
      actives[i].style.backgroundColor = "#b7bec5";
      actives[i].style.color = "#2F3640";
      actives[i].style.fontWeight = "bold";
    }
    var tab = document.getElementsByClassName('tab');
    for (var i = 0; i < tab.length; i++) {
      tab[i].style.border = "1px solid #F8F8F8";
      tab[i].style.backgroundColor = "#F8F8F8";
    }
    var navbar = document.getElementsByClassName('navbar');
    for (var i = 0; i < navbar.length; i++) {
      navbar[i].style.backgroundColor = "#fff";
    }
    var header = document.getElementsByClassName('header-container fixed-top');
    for (var i = 0; i < header.length; i++) {
      header[i].style.borderBottom = "1px solid #fff";
    }
    var service = document.getElementsByClassName('card service-card card-inverse');
    for (var i = 0; i < service.length; i++) {
      service[i].style.backgroundColor = "#fff";
      service[i].style.boxShadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
    }
    var card = document.getElementsByClassName('card-title');
    for (var i = 0; i < card.length; i++) {
      card[i].style.color = "#2F3640";
      card[i].style.fontWeight = "bold";
    }
    var list = document.getElementsByClassName('#sidebar list-unstyled menu-categories ps');
    for (var i = 0; i < list.length; i++) {
      list[i].style.borderRight = "1px solid #F8F8F8";
    }
    var drop = document.getElementsByClassName('dropbtnss');
    for (var i = 0; i < drop.length; i++) {
      drop[i].style.color = "#2F3640";
      drop[i].style.fontWeight = "bold";
    }
    var sidemenu = document.getElementsByClassName('side-menu-icon');
    for (var i = 0; i < sidemenu.length; i++) {
      sidemenu[i].style.color = "#2F3640";
    }
    var drop = document.getElementsByClassName('dropdown-contentss');
    for (var i = 0; i < drop.length; i++) {
      drop[i].style.color = "#2F3640";
      drop[i].style.backgroundColor = "white";
      drop[i].style.boxShadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
    }
    var note = document.getElementsByClassName('note_card');
    for(var i = 0; i < note.length; i++){
    note[i].style.backgroundColor = "#fff";    
      }

    document.getElementById("team_select").style.color = "#2F3640";
    document.getElementById("team_select").style.backgroundColor = "white";
    document.getElementById("team_select").style.fontWeight = "bold";
    document.getElementById("team_select_weekly").style.color = "#2F3640";
    document.getElementById("team_select_weekly").style.backgroundColor = "white";
    document.getElementById("team_select_weekly").style.fontWeight = "bold";
  }
  else {
    localStorage.setItem("theme", "dark");
    var body = document.getElementsByClassName('body');
    for (var i = 0; i < body.length; i++) {
      body[i].style.backgroundColor = "#060818";
    }
    document.getElementById("img").src = "../../static/assets/img/coolpad-logo.png";
    document.getElementById("img1").src = "../../static/assets/img/takvaviya-main-logo.png";
    //document.body.style.backgroundColor = "#060818";
    var card = document.getElementsByClassName('center');
    for (var n = 0; n < card.length; n++) {
      card[n].style.backgroundColor = "#7c7c7c5e";
    }
    var widget = document.getElementsByClassName('note_card');
    for (var i = 0; i < widget.length; i++) {
      widget[i].style.backgroundColor = "rgb(26, 28, 45)";
    }
    var widget = document.getElementsByClassName('widget');
    for (var i = 0; i < widget.length; i++) {
      widget[i].style.backgroundColor = "rgb(26, 28, 45)";
    }
    var para = document.getElementsByClassName('para');
    for (var i = 0; i < para.length; i++) {
      para[i].style.color = "#fff";
    }
    var side = document.getElementsByClassName('sidebar-wrapper');
    for (var i = 0; i < side.length; i++) {
      side[i].style.width = "194px";
      side[i].style.top = "60px";
      side[i].style.left = "16px";
    }
    var menu = document.getElementsByClassName('menuu');
    for (var i = 0; i < menu.length; i++) {
      menu[i].style.color = "#fff";
      menu[i].style.fontWeight = "normal";
    }
    var actives = document.getElementsByClassName('actives');
    for (var i = 0; i < actives.length; i++) {
      actives[i].style.backgroundColor = "#2F3640";
      actives[i].style.color = "#fff";
      actives[i].style.fontWeight = "normal";
    }
    var tab = document.getElementsByClassName('tab');
    for (var i = 0; i < tab.length; i++) {
      tab[i].style.border = "1px solid #060818";
      tab[i].style.backgroundColor = "#060818";
    }
    var navbar = document.getElementsByClassName('navbar');
    for (var i = 0; i < navbar.length; i++) {
      navbar[i].style.backgroundColor = "#060818";
    }
    var header = document.getElementsByClassName('header-container fixed-top');
    for (var i = 0; i < header.length; i++) {
      header[i].style.borderBottom = "1px solid #060818";
    }
    var service = document.getElementsByClassName('card service-card card-inverse');
    for (var i = 0; i < service.length; i++) {
      service[i].style.backgroundColor = "rgb(26, 28, 45)";
      service[i].style.boxShadow = "none";
    }
    var card = document.getElementsByClassName('card-title');
    for (var i = 0; i < card.length; i++) {
      card[i].style.color = "#fff";
      card[i].style.fontWeight = "normal";
    }
    var list = document.getElementsByClassName('#sidebar list-unstyled menu-categories ps');
    for (var i = 0; i < list.length; i++) {
      list[i].style.borderRight = "1px solid #0e1726";
    }
    var drop = document.getElementsByClassName('dropbtnss');
    for (var i = 0; i < drop.length; i++) {
      drop[i].style.color = "white";
      drop[i].style.fontWeight = "normal";
    }
    var sidemenu = document.getElementsByClassName('side-menu-icon');
    for (var i = 0; i < sidemenu.length; i++) {
      sidemenu[i].style.color = "white";
    }
    var drop = document.getElementsByClassName('dropdown-contentss');
    for (var i = 0; i < drop.length; i++) {
      drop[i].style.color = "white";
      drop[i].style.backgroundColor = "#191e3a";
      drop[i].style.boxShadow = "none";
    }
    document.getElementById("team_select").style.color = "#fff";
    document.getElementById("team_select").style.backgroundColor = "rgb(26, 28, 45)";
    document.getElementById("team_select_weekly").style.color = "#fff";
    document.getElementById("team_select_weekly").style.backgroundColor = "rgb(26, 28, 45)";
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
});

function outlier() {
  fetch('https://takvaviya.in/coolpad_backend/user/outliers/2020-08-03/2020-08-07').then(responsive => {
    return responsive.json();
  }).then(data => {

    console.log(data)
    const innerdiv = Object.keys(data).map(item => {


      return `<div class="center">

  <div class="profile">
      <div class="image">
          <div class="circle-1"></div>
          <div class="circle-2"></div>
          <img src="https://static.thenounproject.com/png/19085-200.png" width="100"
              height="100" alt="Jessica Potter">
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