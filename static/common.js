var zone = localStorage.getItem('zone')
var locationn = localStorage.getItem('location')
var company = localStorage.getItem('company')
var group = localStorage.getItem('group')
var sess_user = localStorage.getItem("session_user")
var common4all = group + '__' + locationn + '__' + zone + '__' + company

/*current_date = moment().tz("America/Chicago").format('YYYY-MM-DD');
start_date = moment().startOf('isoWeek').format('YYYY-MM-DD');
end_date=moment().add(1,'days').tz("America/Chicago").format('YYYY-MM-DD');*/

current_date = moment().tz("America/Chicago").format('YYYY-MM-DD');
start_date = moment().startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD');
end_date=moment().endOf('isoWeek').subtract(1, 'days').tz("America/Chicago").format('YYYY-MM-DD');

if (!localStorage.getItem("session")) {
  alert("Please Login to continue");
  window.location.href = "../login";
}

function logout() {
  localStorage.removeItem("session");
  window.location.href = "../login";
}

function share() {
  var msgbody = "https://takvaviya.in/coolpad/project/login/";
  var url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Coolpad Dashboard&body=link here: ' + msgbody + '&ui=2&tf=1&pli=1';
  window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
}

// praveen
/*Theme Toggle*/
function toggleCheck() {
  if (document.getElementById("myCheckbox").checked === true ) {
    localStorage.setItem("theme", "light");
    if(sess_user === 'demo')
    {
      document.getElementById("img").src = "../../static/assets/img/Tyson_Foods_logo.svg.png";
    }
    else{ document.getElementById("img").src = "../../static/assets/img/coolpad-logo-black.png";  }
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
    if(sess_user === 'demo')
    {
      document.getElementById("img").src = "../../static/assets/img/Tyson_Foods_logo_bright.svg.png";
    }
    else{ document.getElementById("img").src = "../../static/assets/img/coolpad-logo.png";  }
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
});



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


/* missing device toast starts*/
$(document).ready(function () {
  $('.toast').toast();
  let toastContainer = document.createElement('div');
  toastContainer.id = "missingDevicesContainer";
  document.body.append(toastContainer);
 // startMissingDeviceWatch();
});
function startMissingDeviceWatch() {
  //TODO api call integ, multiple missing device implementation, changing to push notif
  setInterval(() => { 
    $('.toast').toast('hide')
    let missingDeviceId = 1234;
    let missingSince = 1;
    let toastContainer = document.getElementById('missingDevicesContainer');
    fetch('https://takvaviya.in/coolpad_backend/user/notifyDevice/'+common4all).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
      }).then(function (responseJson) {
        //dummy data for now
        missingDeviceId = "1234XXXXXXX";
        missingSince = 2;
        });
    toastInnerHtml = `<div style="position: absolute;top: 60px;right: 30px;" class="toast" data-autohide="false">
                        <div class="toast-header bg-warning" style="color:white">
                          <strong class="mr-auto">Device Missing !</strong>
                          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
                        </div>
                        <div class="toast-body" style="background-color:white; color:black">
                          <div>Device with ID ${missingDeviceId} has been missing for ${missingSince} hrs </div>
                        </div>
                      </div>`
    toastContainer.innerHTML = toastInnerHtml;
    $('.toast').toast('show')
  }, 360000); // change to suitable timelimit
}
/*missing device toast ends*/