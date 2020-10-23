var zone = localStorage.getItem('zone')
var locationn = localStorage.getItem('location')
var company = localStorage.getItem('company')
var group = localStorage.getItem('group')
var sess_user = localStorage.getItem("session_user")
var common4all = group + '__' + locationn + '__' + zone + '__' + company

/*current_date = moment().tz("America/Chicago").format('YYYY-MM-DD');
start_date = moment().startOf('isoWeek').format('YYYY-MM-DD');
end_date=moment().add(1,'days').tz("America/Chicago").format('YYYY-MM-DD');*/
var try_date = moment().tz("America/Chicago").format('YYYY-MM-DD');
current_date = moment().tz("America/Chicago").format('YYYY-MM-DD');
start_date = moment().startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD');
end_date=moment().endOf('isoWeek').subtract(1, 'days').tz("America/Chicago").format('YYYY-MM-DD');


try_date = try_date+" 00:00:00";
console.log(try_date);
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


var daily_report,weekly_reoprt;
var default_st_time = " 00-00-00";
var default_end_time = " 23-59-59";

var render_email;
function email_share(){
$('head').append('<script src="https://smtpjs.com/v3/smtp.js">');
//    render_email ='';
//    render_email +='<div class="email_div" style="position:fixed;top:20%;left:20%">';
//    render_email +='<input type="email" id="recip" >';
//    render_email +='<button onclick="email_share1()">Send</button>';
//    render_email +='</div>';
//    $('body').append(render_email);
render_email ='';
render_email +=' <div class="modal fade" id="myModal">'
render_email +='        <div class="modal-dialog modal-dialog-centered">'
render_email +='            <div class="modal-content">'
render_email +='                <div class="modal-header">'
render_email +='                    <h4 class="modal-title">Email</h4>'
render_email +='                    <button type="button" class="close" data-dismiss="modal">&times;</button>'
render_email +='                </div>'
render_email +='                <div class="modal-body">'
render_email +='                    <div class="mb-2">'
render_email +='                        <div class="form-group">'
render_email +='                            <label for="usr">Email ID</label>'
render_email +='                            <input type="text" class="form-control" id="recip">'
//render_email +='                            <p class="hint">Invalid Email id</p>'
render_email +='                        </div>'
render_email +='                    </div>'
render_email +='                </div>'
render_email +='                <div class="modal-footer">'
render_email +='                    <button type="button" class="btn btn-primary" onclick="email_share1()" data-dismiss="modal">Send</button>'
render_email +='                </div>'
render_email +='            </div>'
render_email +='        </div>'
render_email +='    </div>'
$('body').append(render_email);
}
$('#emailID').keyup(function(e) {
    let email = e.target.value;
    if (email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)) {
        $('#emailID').css({ 'border': '1px solid black' });
        $('.hint').css({ 'display': 'none' });
    } else {
        $('#emailID').css({ 'border': '1px solid red' });
        $('.hint').css({ 'display': 'block' });
    }
});
function email_share1() {
//var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        if(isValidEmailAddress($("#recip").val())){
             $.ajax({
                type: "GET",
                url: 'https://www.takvaviya.in/coolpad_backend/user/weekly_report/' +  start_date +default_st_time+ '/' + end_date +default_st_time + '/' +current_date+'/' + common4all,
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    weekly_reoprt = response;
                    daily_report_resp();
                    }
                    });
                    }
         else{
         alert("invalid email format");
         }
}
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}
function daily_report_resp(){
    $.ajax({
        type: "GET",
        url: "https://www.takvaviya.in/coolpad_backend/user/daily_report/"  + current_date + default_st_time+ "/" +current_date + default_end_time+ "/" +common4all,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            daily_report = response;
            var Rdaily_report = daily_report['path']+'.pdf';
            var Rweekly_reoprt = weekly_reoprt['path']+'.pdf';
            Email.send({
            Host: "smtp.gmail.com",
            Username: "noreply@takvaviya.com",
            Password: "Takvav!yaemail",
            From: "noreply@takvaviya.com",
                    To : $("#recip").val(),
                        Subject : "Report",
                        Body : "Report for the day! ",
                    Attachments : [
                    {
                        name : "Daily.pdf",
                        path : Rdaily_report
                    },
                    {
                        name : "Weekly.pdf",
                        path : Rweekly_reoprt
                    }
                    ]
            }).then(message =>{
              alert("sent");
//              $('body').empty(render_email);
              }
            );
            }
            });
        }






// praveen
/*Theme Toggle*/
function toggleCheck() {
  if (document.getElementById("myCheckbox").checked === true ) {
    localStorage.setItem("theme", "light");
    if(sess_user === 'demo' || sess_user === 'tyson_test' || sess_user === 'tyson_poc')
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
    try {color();}
    catch (e) { console.log(e) }
  }
  else {
    localStorage.setItem("theme", "dark");
    if(sess_user === 'demo' || sess_user === 'tyson_test' || sess_user === 'tyson_poc')
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
    try {color();}
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
  if(missingDevicesTab){
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