//Global Declartions
var crnt_date
var current_user;
var select_date
var st_date
var en_date
var clk_d;
var from_HIStime, to_HIStime;
var default_time_param = " 00-00-00";
var default_currnt_param = "00-00-00";
var default_end_param = "23-59-59";
from_HIStime = default_currnt_param;
to_HIStime = default_end_param;
var time_range;

if (!localStorage.getItem("session")) {
    window.location.href = "../login";
}

var data_user2;
var dev_id;
// window.onload = exampleFunction();
function exampleFunction() {
    document.getElementById("user_history_loader").innerHTML = ` <div class="loader" ></div> <b style="padding-left: 2rem;font-size: larger;">Loading Data</b>`;
    console.log("apiiii",from_HIStime,to_HIStime)
    fetch('https://takvaviya.in/coolpad_backend/user/User_history_data/' + st_date + '/' + en_date + '/' + select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+ common4all)
    .then(response => response.json())
    .then(data_user => {
        data_user2= data_user
        loadUserHistoy()
/*        UserHistoy(Object.keys(data_user2)[0])*/
    })

    fetch('https://takvaviya.in/coolpad_backend/user/userDeviceStatus' + '/' + common4all)
    .then(response => response.json())
    .then(data => {
        dev_id = data
        load_notes_user();
    })
}

function opentab_history(evt, tabName) {
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




// User history

function UserHistoy(option) {
            dataa = data_user2[option];
            dataa_w = data_user2[option];
            keys = []
            values = []
            duration = []
            obj = {}
            m = 1
            keys_w = []
            values_w = []
            duration_w = []
            obj_w = {}
            m_w = 1
            clk_d = dataa['24_hr_clock']
            const innerdiv0 = `   <p class="count-id">${clk_d}</p>`
            // document.getElementById("abc").innerHTML = innerdiv0
            if (clk_d != null) {
                history_clk(clk_d);
                history_clk_12hr(clk_d);
            } else {
                document.getElementById("chart21").innerHTML = '<div style="color:#007bff;padding:1rem"><a>No data available<a></div>'
                document.getElementById("chart20").innerHTML = '<div style="color:#007bff;padding:1rem"><a>No data available<a></div>'
            }


            if (dataa["Current Device ID"] != null) {
                const innerdiv = `   <p class="count-id">${dataa["Current Device ID"]}</p>`
                document.getElementById("cdid").innerHTML = innerdiv

            } else {
                document.getElementById("cdid").innerHTML = '<div>No data available</div>'
            }


            if (dataa["Users in Contact Day"] != null) {
                const innerdiv1 = `   <p class="count-id">${dataa["Users in Contact Day"]}</p>`
                document.getElementById("nouinc").innerHTML = innerdiv1
            } else {
                document.getElementById("nouinc").innerHTML = '<div>No data available</div>'
            }

            if (dataa["Users in Contact Week"] != null) {
                const innerdiv2 = `   <p class="count-id">${dataa["Users in Contact Week"]}</p>`
                document.getElementById("nouinw").innerHTML = innerdiv2
            } else {
                document.getElementById("nouinw").innerHTML = '<div>No data available</div>'
            }

            if (dataa["Max Contact Duration Day"] != null) {
                const innerdiv3 = `   <p class="count-id">${dataa["Max Contact Duration Day"]}</p>`
                document.getElementById("hcdd").innerHTML = innerdiv3
            } else {
                document.getElementById("hcdd").innerHTML = '<div>No data available</div>'
            }
            if (dataa["Device History"] != null) {
                const innerdiv4 = Object.values(dataa["Device History"]).map(item => { return `<div style="padding-bottom:1rem">${item}</div>`}).join(" ")
                document.getElementById("device_id_history").innerHTML = innerdiv4
            }
            else {
                document.getElementById("device_id_history").innerHTML = '<div>No data available</div>'
            }
            if (dataa["Max Contact Duration Week"] != null) {
                const innerdiv4 = `   <p class="count-id">${dataa["Max Contact Duration Week"]}</p>`
                document.getElementById("hcdw").innerHTML = innerdiv4
            }
            else {
                document.getElementById("hcdw").innerHTML = '<div>No data available</div>'
            }
            if (dataa["Contact History Week"] != null) {
                document.getElementById('ctw').innerHTML = `<table id="contact_trace_wee" class=" " data-page-length='8'>
                <thead align="center">
                  <tr>
                    <th>User</th>
                    <th>Count</th>
                    <th>Max Duration</th>
                  </tr>
                </thead>
                <tfoot></tfoot>
              </table>`
                Object.keys(dataa_w["Contact History Week"]).map(item => { keys_w.push(item) })
                //  Object.values(data["emp 1"]["Contact History Week"]["count"]).map(item => { values.push(item) })
                Object.keys(dataa_w["Contact History Week"]).map(item => {
                    values_w.push(dataa_w["Contact History Week"][item]["count"]);
                })
                Object.keys(dataa_w["Contact History Week"]).map(item => {
                    duration_w.push(dataa_w["Contact History Week"][item]["max_duration"]);
                })
                for (var i = 0; i < keys_w.length; i++) {
                    obj_w[i] = { "sno": i + 1, "pair": keys_w[i], "count": values_w[i], "duration": duration_w[i] };
                }
                dataa2 = Object.values(obj_w )
                $('#contact_trace_wee').DataTable({
                columnDefs: [
                    { type: 'natural-nohtml', targets: 0 }
                  ],
                    "searching": false,
                    "info": false,
                    "bLengthChange": false,
                    "bDestroy": true,
                    data: dataa2, "columns": [{ "data": "pair" }, { "data": "count" }, { "data": "duration" }]
                });
            }
            else {
                document.getElementById("ctw").innerHTML = '<div style="color:#007bff; padding:1rem"><a>No data available</a></div>'
            }
            if (dataa["Contact History Day"] != null) {
                document.getElementById('ctd').innerHTML = `<table id="contact_trace_day" class=" " data-page-length='8'>
                <thead align="center">
                  <tr>
                    <th>User</th>
                    <th>Count</th>
                    <th>Max Duration</th>
                  </tr>
                </thead>
                <tfoot></tfoot>
              </table>`

                Object.keys(dataa["Contact History Day"]).map(item => { keys.push(item) })
                //  Object.values(data["emp 1"]["Contact History Day"]["count"]).map(item => { values.push(item) })
                Object.keys(dataa["Contact History Day"]).map(item => {
                    values.push(dataa["Contact History Day"][item]["count"]);
                })
                Object.keys(dataa["Contact History Day"]).map(item => {
                    duration.push(dataa["Contact History Day"][item]["max_duration"]);
                })
                for (var i = 0; i < keys.length; i++) {
                    obj[i] = { "sno": i + 1, "pair": keys[i], "count": values[i], "duration": duration[i]};
                }
                dataa_c = Object.values(obj)
                $('#contact_trace_day').DataTable({
                columnDefs: [
                    { type: 'natural-nohtml', targets: 0 }
                  ],
                    "searching": false,
                    "info": false,
                    "bLengthChange": false,
                    "bDestroy": true,
                    data: dataa_c, "columns": [{ "data": "pair" }, { "data": "count" }, { "data": "duration" }]

                });
            }
            else {
                document.getElementById("ctd").innerHTML = '<div style="color:#007bff;padding:1rem"><a>No data available</a></div>'

            }
            document.getElementById('cea').innerHTML = `<table id="contact_event_all" class=" " data-page-length='8'>
                <thead align="center">
                  <tr>
                    <th>User</th>
                    <th>MinDist</th>
                    <th>AvgDist</th>
                    <th>Duration</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tfoot></tfoot>
              </table>`
            var ceh = []
            var na = []
            Object.values(dataa["contact_event_all"]).map(item => {
                ceh.push(Object.values(item)[0])
                na.push(Object.keys(item)[0])
            })
            for(var i =0 ;i<ceh.length;i++){
                Object.assign(ceh[i], {user: na[i]});
            }
            // ceh.push(na)
            $('#contact_event_all').DataTable({
                "scrollY": "200px",
                "retrieve": true,
                "scrollCollapse": true,
                "paging": false,
                "searching": false,
                "info": false,
                "bLengthChange": false,
                "bDestroy": true,
                data: ceh, "columns": [{ "data": "user" },{ "data": "minDist" }, { "data": "avgDist" }, { "data": "duration" }, { "data": "timestamp" }]
            });


}
function history_clk(clk_d) {
    $("#chart20").empty()
    var options = {
        series: [{
            name: 'Data',
            data: clk_d
        }],
        grid: {
            show: false
        },

        chart: {

            height: 180,
            type: 'area'
        },
        legend: {
            labels: {
                colors: '#888ea8'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'string',
            categories: ["1 AM", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12 PM", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12 AM"],
            labels: {
                show: true,
                style: {
                    colors: '#888ea8',
                    fontSize: '14px',
                }
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#888ea8',
                }
            }
        },
        tooltip: {
            x: {
                format: 'string'
            },
        },
    };

    var chart = new ApexCharts(document.querySelector("#chart20"), options);
    chart.render();
}
function history_clk_12hr(clk_d) {
    $("#chart21").empty()
    var options = {
        series: [{
            name: 'AM',
            data: clk_d.slice(0, 12)
        }, {
            name: 'PM',
            data: clk_d.slice(12, 24)
        }],
        grid: {
            show: false
        },

        chart: {

            height: 170,
            type: 'area'
        },
        legend: {
            labels: {
                colors: '#888ea8'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'string',
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            labels: {
                show: true,
                style: {
                    colors: '#888ea8',
                    fontSize: '14px',
                }
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#888ea8',
                }
            }
        },
        tooltip: {
            x: {
                format: 'string'
            },
        },
    };

    var chart = new ApexCharts(document.querySelector("#chart21"), options);
    chart.render();
}


function loadUserHistoy() {
    fetch('https://takvaviya.in/coolpad_backend/user/userDeviceStatus' + '/' + common4all)
        .then(response => response.json())
        .then(data => {
         document.getElementById("user_history_loader").innerHTML = '';
            let allUsers = Object.values(data);
            let unDeletedUsers = allUsers.filter(user => user.is_Deleted === 'false');
            let userNames = unDeletedUsers.map(user => user.user);
            const innerdiv = userNames.map(userName => {
                return `<option value='${userName}'>${userName}</option>`
            }).join("");
            document.getElementById("user_history_select").innerHTML = innerdiv;
            UserHistoy(Object.keys(data)[0])
            this.current_user = Object.keys(data)[0]
            localStorage.setItem('current_user', Object.keys(data)[0]);
        });
}


//loadUserHistoy();



function getSelectValueUserHistory() {
    var sel = document.getElementById('user_history_select').value;
    this.UserHistoy(sel);
    localStorage.setItem('current_user', sel)
    load_notes_user();
}


// Team history

function TeamHistoy(option) {
    keys = []
    values = []
    duration = []
    obj = {}

    keys_w = []
    values_w = []
    keys_w_team = []
    values_w_team = []
    keys_team = []
    values_team = []
    duration_w = []
    obj_w = {}


    fetch('https://takvaviya.in/coolpad_backend/user/team_history/'+ st_date+'/'+ en_date + '/' +  select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+  common4all)
        .then(response => response.json())
        .then(data => {
            dataa = data[option];
            dataa_ww = data[option];
            if (dataa["Users in Contact"] != null) {
                const innerdiv = `   <p class="count-id">${dataa["Users in Contact"]}</p>`
                document.getElementById("tuic").innerHTML = innerdiv
            }
            else {
                document.getElementById("tuic").innerHTML = `<div style="color:blue">No data available</div>`
            }
            if (dataa["Contacts in a Day"] != null) {
                const innerdiv4 = `   <p class="count-id">${dataa["Contacts in a Day"]}</p>`
                document.getElementById("tcid").innerHTML = innerdiv4
            }
            else { document.getElementById("tcid").innerHTML = `<div style="color:blue">No data available</div>` }

            if (dataa["Contacts in a Week"] != null) {
                const innerdiv1 = `   <p class="count-id">${dataa["Contacts in a Week"]}</p>`
                document.getElementById("tciw").innerHTML = innerdiv1
            }
            else { document.getElementById("tciw").innerHTML = `<div style="color:blue">No data available</div>` }
            if (dataa["Contacts in a Week"] != null) {
                if(Object.values(dataa["Most contact user pair Day"])!=0){
                    const innerdiv2 = `   <p class="count-id">${Object.keys(dataa["Most contact user pair Day"])}&ensp;&ensp;&ensp;&ensp;Count:&ensp;${Object.values(dataa["Most contact user pair Day"])}</p>`
                    document.getElementById("tmcup").innerHTML = innerdiv2
                }
                else{
                    document.getElementById("tmcup").innerHTML = `<div style="">No data available</div>`
                }
            } else { document.getElementById("tmcup").innerHTML = `<div style="">No data available</div>` }

            if (dataa["Contacts in a Week"] != null) {
                const innerdiv3 = `   <p class="count-id">${Object.keys(dataa["Most contact user pair Week"])}&ensp;&ensp;&ensp;&ensp;Count:&ensp;${Object.values(dataa["Most contact user pair Week"])}</p>`
                document.getElementById("tmcupw").innerHTML = innerdiv3
            }
            else { document.getElementById("tmcupw").innerHTML = `<div style="color:blue">No data available</div>` }


            Object.keys(dataa["top 5 users in contact Day"]).map(item => { keys_team.push(item) })
            Object.values(dataa["top 5 users in contact Day"]).map(item => { values_team.push(item) })
            for (var i = 0; i < keys_team.length; i++) {
                if(values_team[i] !=0 ){
                obj[i] = { "sno": i + 1, "pair": keys_team[i], "contact": values_team[i] };
            }
            }
            dataa_top_5_team = Object.values(obj)
            $('#user_contact').DataTable({
            columnDefs: [
                    { type: 'natural-nohtml', targets: 0 }
                  ],
                "searching": false,
                "info": false,
                "paging":false,
                "bLengthChange": false,
                "bDestroy": true,
                data: dataa_top_5_team, "columns": [ { "data": "pair" }, { "data": "contact" }]
            });
            Object.keys(dataa_ww["top 5 users in contact Week"]).map(item => { keys_w_team.push(item) })
            Object.values(dataa_ww["top 5 users in contact Week"]).map(item => { values_w_team.push(item) })
            for (var i = 0; i < keys_w_team.length; i++) {
                obj_w[i] = { "sno": i + 1, "pair": keys_w_team[i], "contact": values_w_team[i] };
            }
            dataa_weak = Object.values(obj_w)
            $('#user_contact_weekss').DataTable({
            columnDefs: [
                    { type: 'natural-nohtml', targets: 0 }
                  ],
                "searching": false,
                "paging":false,
                "info": false,
                "bLengthChange": false,
                "bDestroy": true,
                data: dataa_weak, "columns": [{ "data": "pair" }, { "data": "contact" }]
            });
        })
}



function loadTeamHistory() {
    fetch('https://takvaviya.in/coolpad_backend/user/getTeams/'+ '/' + common4all)
        .then(response => response.json())
        .then(data => {
        document.getElementById("team_history_loader").innerHTML = '';
            const innerdiv = Object.values(data.teams).map(item => {
                return `<option value='${item}'>${item}</option>`
            }).join("");
            document.getElementById("team_history_select").innerHTML = innerdiv
            TeamHistoy(Object.values(data)[0][0])
            localStorage.setItem('current_team', Object.values(data)[0][0]);
            load_notes_team();
        });
}

loadTeamHistory();

function getSelectValueTeamHistory() {
    var sel = document.getElementById('team_history_select').value;
    this.TeamHistoy(sel);
    localStorage.setItem('current_team', sel);
    load_notes_team();
}

// Download Report PDF

function dwnldusrpdf() {
    var user_instance = localStorage.getItem('current_user');
    fetch('https://takvaviya.in/coolpad_backend/user/pdf_gen/' + user_instance + '/'+ start_date+default_time_param+'/'+ end_date +default_time_param  + '/' + select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+common4all)
        .then(response => response.json())
        .then(data => {
//            window.location.href = data.path + ".pdf"
            window.open(data.path + ".pdf");
        });
}

// Download Report CSV

function dwnldusrcsv() {
    var user_instance = localStorage.getItem('current_user');
    fetch('https://takvaviya.in/coolpad_backend/user/report/' + user_instance + '/csv/'+ start_date+default_time_param+'/'+ select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+ end_date +default_time_param +'/'+common4all)
        .then(response => response.json())
        .then(data => {
//            window.location.href = data.path + ".csv"
            window.open(data.path + ".csv");

        });
}

// Download Report xlsx

function dwnldusrxlsx() {

    var user_instance = localStorage.getItem('current_user');
    fetch('https://takvaviya.in/coolpad_backend/user/report/' + user_instance + '/xl/'+  start_date+default_time_param+'/'+ end_date +default_time_param  + '/' + select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.open(data.path + ".xlsx");
        });
}


// Team download

// Download Report PDF

function dwnldtmpdf() {

    var user_instance = localStorage.getItem('current_team');
    fetch('https://takvaviya.in/coolpad_backend/user/pdf_gen_team/' + user_instance + '/'+ start_date+default_time_param+'/'+ end_date +default_time_param  + '/' + select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.open(data.path + ".pdf");
        });
}

// Download Report CSV

function dwnldtmcsv() {
    var user_instance = localStorage.getItem('current_team');
    fetch('https://takvaviya.in/coolpad_backend/user/team_report/' + user_instance + '/csv/'+ start_date+default_time_param+'/'+ select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+ end_date +default_time_param +'/'+common4all)
        .then(response => response.json())
        .then(data => {
//            window.location.href = data.path + ".csv"
              window.open(data.path + ".csv");

        });
}

// Download Report xlsx

function dwnldtmxlsx() {

    var user_instance = localStorage.getItem('current_team');
    fetch('https://takvaviya.in/coolpad_backend/user/team_report/' + user_instance + '/xl/'+ start_date+default_time_param+'/'+ select_date +" "+from_HIStime+ '/' + select_date +" "+to_HIStime+ '/'+ end_date +default_time_param +'/'+common4all)
        .then(response => response.json())
        .then(data => {
/*
            window.location.href = data.path + ".xlsx"
*/
            window.open(data.path + ".xlsx");
        });
}

// user wise sticky notes

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
function Submit1() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day;
    var note = document.getElementById("note_textt").value
    //TODO dynamci location
    const data = {
       "user": dev_id[localStorage.getItem("current_user")]['device_id'],
        "date_time": String(newdate),
        "location": common4all,
        "notes": note
    }
    fetch('https://takvaviya.in/coolpad_backend/user/saveEmpnote/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            load_notes_user();
            modal.close();
            document.getElementById("note_textt").value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            modal.close();
        });
}
function load_notes_user() {
    fetch('https://takvaviya.in/coolpad_backend/user/empallnotes/' + dev_id[localStorage.getItem("current_user")]['device_id']  + '/'+common4all)
        .then(response => response.json())
        .then(data => {
            Object.keys(data).map(item => {
                const innerdiv = Object.keys(data[item]).map(nitem => {
                    return `
                    <div class="note_card">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                    <div class="ndate" style='flex:5'><b>${data[item][nitem].date_time}</b></div>
                    <div onclick="Note_delete(${nitem})" style="color: rgb(187, 66, 66); font-size:10px;cursor: pointer;margin-right: 1rem;"><b>REMOVE</b></div>
                    </div>
                    <div class="nnote" id="nnote"><p style="padding-right: 40px;">${data[item][nitem].notes}</p></div>
                    </div>`
                }).join(" ");
                document.getElementById("load_notes").innerHTML = innerdiv
                // **************************************
                var stick_data = [];
                var da;
                Object.keys(data[item]).map(nitem => {
                    stick_data.push(data[item][nitem].notes)
                    da = data[item][nitem].date_time

                }).join(" ");
                 if(da == undefined){
                    da ='N/A'
                }
                if(stick_data.length == 0){
                    stick_data ='-'
                }

                const innerdiv1 = `
                    <div class="note_card1">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                    <div class="ndate1" style='flex:5'><b>${da}</b></div>
                    </div>
                    <div class="nnote1" id="nnote1"><p style="padding-right: 40px; color:#cec1c1">${stick_data.slice(-1)[0]}</p></div>
                    </div>`
                document.getElementById("load_notes1").innerHTML = innerdiv1
            })
        });
}


function Note_delete(id) {
    function reqListener() {
        console.log("res", this.responseText);
    }
    fetch('https://takvaviya.in/coolpad_backend/user/deleteEmpnote/' + id + '/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            load_notes_user();
            modal.close();
            document.getElementById("note_textt").value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            modal.close();
        });
    load_notes_user();
}
// end user sticky notes

function team_notes_show(){
 document.getElementById("my-modal1").showModal();
}
function close_team_notes(){
    document.getElementById("my-modal1").close();
    document.getElementById("note_textt1").value = '';
}
function Submit2() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day;

    var note = document.getElementById("note_textt1").value
    //TODO dynamci location
    const data = {
        "team": localStorage.getItem("current_team").toLowerCase(),
        "date_time": String(newdate),
        "location": common4all,
        "notes": note
    }
    fetch('https://takvaviya.in/coolpad_backend/user/saveTeamnote/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            load_notes_team();
            document.getElementById("my-modal1").close();
            document.getElementById("note_textt1").value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("my-modal1").close();
        });
}
function load_notes_team() {
    var a = String(localStorage.getItem("current_team").toLowerCase())
    fetch('https://takvaviya.in/coolpad_backend/user/teamallnotes/' + a + '/'+common4all)
        .then(response => response.json())
        .then(data => {
            Object.keys(data).map(item => {
                const innerdiv = Object.keys(data[item]).map(nitem => {
                    return `
                    <div class="note_card">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                    <div class="ndate" style='flex:5'><b>${data[item][nitem].date_time}</b></div>
                    <div onclick="Note_delete_team(${nitem})" style="color: rgb(187, 66, 66); font-size:10px;cursor: pointer;margin-right: 1rem;"><b>REMOVE</b></div>
                    </div>
                    <div class="nnote" id="nnote"><p style="padding-right: 40px;">${data[item][nitem].notes}</p></div>
                    </div>`
                }).join(" ");
                document.getElementById("load_notes_team").innerHTML = innerdiv
                var stick_data = [];
                var da;
                Object.keys(data[item]).map(nitem => {
                    stick_data.push(data[item][nitem].notes)
                    da = data[item][nitem].date_time
                }).join(" ");
                if(da == undefined){
                    da ='N/A'
                }
                if(stick_data.length == 0){
                    stick_data ='-'
                }
                const innerdiv1 = `
                    <div class="note_card1">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                    <div class="ndate1" style='flex:5'><b>${da}</b></div>
                    </div>
                    <div class="nnote1" id="nnote1"><p style="padding-right: 40px; color:#cec1c1">${stick_data.slice(-1)[0]}</p></div>
                    </div>`
                document.getElementById("load_notes2").innerHTML = innerdiv1
            })
        });
}
load_notes_team();
function Note_delete_team(id) {
    function reqListener() {
        console.log("res", this.responseText);
    }
    fetch('https://takvaviya.in/coolpad_backend/user/deleteTeamnote/' + id + '/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            load_notes_team();
            modal.close();
            document.getElementById("note_textt").value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            modal.close();
        });
    load_notes_team();
}


setInterval(function(){
exampleFunction();
loadTeamHistory();
}, 300000);


$(function(){

    var today = new Date();
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#date_history').attr('max', maxDate);
    $('#date_history').attr('max', maxDate);
    select_date = current_date
    $('#date_history').val(select_date);
    console.log("currnt",select_date,moment(select_date).add(1, 'days').startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD'))
    st_date = moment(select_date).add(1, 'days').startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD');
    en_date = moment(select_date).add(1, 'days').endOf('isoWeek').subtract(1, 'days').tz("America/Chicago").format('YYYY-MM-DD');

    st_date = st_date+default_time_param;
    en_date = en_date+" "+default_end_param;
    select_date = select_date;
    exampleFunction()
    console.log("check time",select_date,st_date,en_date)
    $("#date_history").on('change', function (event) {
        event.preventDefault();
        select_date = this.value
        // console.log(select_date)
        // console.log("curr", se_date)
        st_date = moment(select_date).add(1, 'days').startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD');
        en_date = moment(select_date).add(1, 'days').endOf('isoWeek').subtract(1, 'days').tz("America/Chicago").format('YYYY-MM-DD');

        st_date = st_date+default_time_param;
        en_date = en_date+" "+default_end_param;
        select_date = select_date;
        exampleFunction()
        loadTeamHistory()

    });




});
function convertDateToReadableDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var readableDate = year + '-' + month + '-' + day;
    return readableDate;
}


$(function(){

    var today = new Date();
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#date_history_team').attr('max', maxDate);
    $('#date_history_team').attr('max', maxDate);
    select_date = current_date
    $('#date_history_team').val(select_date);
    console.log("currnt",select_date,moment(select_date).add(1, 'days').startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD'))
    st_date = moment(select_date).add(1, 'days').startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD');
    en_date = moment(select_date).add(1, 'days').endOf('isoWeek').subtract(1, 'days').tz("America/Chicago").format('YYYY-MM-DD');

    st_date = st_date+default_time_param;
    en_date = en_date+" "+default_end_param;
    select_date = select_date;
    exampleFunction()
    console.log("check time",select_date,st_date,en_date)
    $("#date_history_team").on('change', function (event) {
        event.preventDefault();
        select_date = this.value
        // console.log(select_date)
        // console.log("curr", se_date)
        st_date = moment(select_date).add(1, 'days').startOf('isoWeek').tz("America/Chicago").format('YYYY-MM-DD');
        en_date = moment(select_date).add(1, 'days').endOf('isoWeek').subtract(1, 'days').tz("America/Chicago").format('YYYY-MM-DD');

        st_date = st_date+default_time_param;
        en_date = en_date+" "+default_end_param;
        select_date = select_date;
        exampleFunction()
        loadTeamHistory()

    });




});
function convertDateToReadableDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var readableDate = year + '-' + month + '-' + day;
    return readableDate;
}

function timepicker_his(){
document.getElementById("timePicker_his").style.display="block";
}


var from_O_HIStime,to_O_HIStime;
function submit_histime(){
from_HIStime = $("#from_time").val()+':00';
to_HIStime = $("#to_time").val()+':00';
from_HIStime = from_HIStime.replace(/:/g,"-");
to_HIStime = to_HIStime.replace(/:/g,"-");
console.log(from_HIStime)
exampleFunction()
loadTeamHistory()
document.getElementById("timePicker_his").style.display="none";

from_O_HIStime = $("#from_time").val() + ':00';
to_O_HIStime = $("#to_time").val() + ':00';
document.getElementById("selected_time_user").innerHTML = `<b>From = ${from_O_HIStime} &ensp;&ensp; To =  ${to_O_HIStime}</b>`
document.getElementById("selected_time_team").innerHTML = `<b>From = ${from_O_HIStime} &ensp;&ensp; To =  ${to_O_HIStime}</b>`
}

function Restpicker_his(){
document.getElementById("selected_time_user").innerHTML = ``
document.getElementById("selected_time_team").innerHTML = ``
document.getElementById("user_history_loader").innerHTML = ` <div class="loader" ></div> <b style="padding-left: 2rem;font-size: larger;">Loading Data</b>`;
document.getElementById("team_history_loader").innerHTML = ` <div class="loader" ></div> <b style="padding-left: 2rem;font-size: larger;">Loading Data</b>`;
from_HIStime = default_currnt_param;
to_HIStime = default_end_param;
select_date = current_date
$('#date_history').val(select_date);
difault_name_from = "00:00:00";
default_name_to = "23:59:59";
document.getElementById("time_change").innerHTML=`From- ${difault_name_from} To- ${default_name_to}`


exampleFunction()
loadTeamHistory()
}

var times_team =1
function cancel_histime() {
                document.getElementById("timePicker_his").style.display = 'none'
                times_team =1
            }
            


            $('.timerange').on('click', function(e) {
                if(times_team==1){
                    e.stopPropagation();
                    var input = $(this).find('input');
                    var now = new Date();
                    var hours = now.getHours();
                    var period = "PM";
                    if (hours < 12) {
                        period = "AM";
                    } else {
                        hours = hours - 11;
                    }
                    var minutes = now.getMinutes();
                    var range = {
                        from: {
                            hour: hours,
                            minute: minutes,
                            period: period
                        },
                        to: {
                            hour: hours,
                            minute: minutes,
                            period: period
                        }
                    };
                    if (input.val() !== "") {
                        var timerange = input.val();
                        var matches = timerange.match(/([0-9]{2}):([0-9]{2}) (\bAM\b|\bPM\b)-([0-9]{2}):([0-9]{2}) (\bAM\b|\bPM\b)/);
                        if (matches.length === 7) {
                            range = {
                                from: {
                                    hour: matches[1],
                                    minute: matches[2],
                                    period: matches[3]
                                },
                                to: {
                                    hour: matches[4],
                                    minute: matches[5],
                                    period: matches[6]
                                }
                            }
                        }
                    };
                    set_range(range);
                    var html = '<div class="timerangepicker-container">' +
                        '<div class="timerangepicker-from">' +
                        '<label class="timerangepicker-label">From:</label>' +
                        '<div class="timerangepicker-display hour">' +
                        '<span class="increment fa fa-angle-up"></span>' +
                        '<span class="value">' + ('0' + range.from.hour).substr(-2) + '</span>' +
                        '<span class="decrement fa fa-angle-down"></span>' +
                        '</div>' +
                        ':' +
                        '<div class="timerangepicker-display minute">' +
                        '<span class="increment fa fa-angle-up"></span>' +
                        '<span class="value">' + ('0' + range.from.minute).substr(-2) + '</span>' +
                        '<span class="decrement fa fa-angle-down"></span>' +
                        '</div>' +
                        ':' +
                        '<div class="timerangepicker-display period">' +
                        '<span class="increment fa fa-angle-up"></span>' +
                        '<span class="value">PM</span>' +
                        '<span class="decrement fa fa-angle-down"></span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="timerangepicker-to">' +
                        '<label class="timerangepicker-label">To:</label>' +
                        '<div class="timerangepicker-display hour">' +
                        '<span class="increment fa fa-angle-up"></span>' +
                        '<span class="value">' + ('0' + range.to.hour).substr(-2) + '</span>' +
                        '<span class="decrement fa fa-angle-down"></span>' +
                        '</div>' +
                        ':' +
                        '<div class="timerangepicker-display minute">' +
                        '<span class="increment fa fa-angle-up"></span>' +
                        '<span class="value">' + ('0' + range.to.minute).substr(-2) + '</span>' +
                        '<span class="decrement fa fa-angle-down"></span>' +
                        '</div>' +
                        ':' +
                        '<div class="timerangepicker-display period">' +
                        '<span class="increment fa fa-angle-up"></span>' +
                        '<span class="value">PM</span>' +
                        '<span class="decrement fa fa-angle-down"></span>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $(html).insertAfter(this);
                    $('.timerangepicker-container').on(
                        'click',
                        '.timerangepicker-display.hour .increment',
                        function() {
                            var value = $(this).siblings('.value');
                            value.text(
                                increment(value.text(), 12, 1, 2)
                            );
                        }
                    );
                    $('.timerangepicker-container').on(
                        'click',
                        '.timerangepicker-display.hour .decrement',
                        function() {
                            var value = $(this).siblings('.value');
                            value.text(
                                decrement(value.text(), 12, 1, 2)
                            );
                        }
                    );
                    $('.timerangepicker-container').on(
                        'click',
                        '.timerangepicker-display.minute .increment',
                        function() {
                            var value = $(this).siblings('.value');
                            value.text(
                                increment(value.text(), 59, 0, 2)
                            );
                        }
                    );
                    $('.timerangepicker-container').on(
                        'click',
                        '.timerangepicker-display.minute .decrement',
                        function() {
                            var value = $(this).siblings('.value');
                            value.text(
                                decrement(value.text(), 12, 1, 2)
                            );
                        }
                    );
                    $('.timerangepicker-container').on(
                        'click',
                        '.timerangepicker-display.period .increment, .timerangepicker-display.period .decrement',
                        function() {
                            var value = $(this).siblings('.value');
                            var next = value.text() == "PM" ? "AM" : "PM";
                            value.text(next);
                        }
                    );
                }
                else{
                    times_team=0
                }
                times_team=times_team+1
                
            });
            $(document).on('click', e => {
                if (!$(e.target).closest('.timerangepicker-container').length) {
                    if ($('.timerangepicker-container').is(":visible")) {
                        var timerangeContainer = $('.timerangepicker-container');
                        if (timerangeContainer.length > 0) {
                            var timeRange = {
                                from: {
                                    hour: timerangeContainer.find('.value')[0].innerText,
                                    minute: timerangeContainer.find('.value')[1].innerText,
                                    period: timerangeContainer.find('.value')[2].innerText
                                },
                                to: {
                                    hour: timerangeContainer.find('.value')[3].innerText,
                                    minute: timerangeContainer.find('.value')[4].innerText,
                                    period: timerangeContainer.find('.value')[5].innerText
                                },
                            };
                            set_range(timeRange);
                            timerangeContainer.parent().find('input').val(
                                timeRange.from.hour + ":" +
                                timeRange.from.minute + " " +
                                timeRange.from.period + "-" +
                                timeRange.to.hour + ":" +
                                timeRange.to.minute + " " +
                                timeRange.to.period
                            );
                            timerangeContainer.remove();
                        }
                    }
                }
            });
            function increment(value, max, min, size) {
                var intValue = parseInt(value);
                if (intValue == max) {
                    return ('0' + min).substr(-size);
                } else {
                    var next = intValue + 1;
                    return ('0' + next).substr(-size);
                }
            }
            function decrement(value, max, min, size) {
                var intValue = parseInt(value);
                if (intValue == min) {
                    return ('0' + max).substr(-size);
                } else {
                    var next = intValue - 1;
                    return ('0' + next).substr(-size);
                }
            }
            function setHistoryTime() {
                times_team=1
                if ($('.timerangepicker-container').is(":visible")) {
                    var timerangeContainer = $('.timerangepicker-container');
                    if (timerangeContainer.length > 0) {
                        var timeRange = {
                            from: {
                                hour: timerangeContainer.find('.value')[0].innerText,
                                minute: timerangeContainer.find('.value')[1].innerText,
                                period: timerangeContainer.find('.value')[2].innerText
                            },
                            to: {
                                hour: timerangeContainer.find('.value')[3].innerText,
                                minute: timerangeContainer.find('.value')[4].innerText,
                                period: timerangeContainer.find('.value')[5].innerText
                            },
                        };
                        set_range(timeRange);
                        timerangeContainer.parent().find('input').val(
                            timeRange.from.hour + ":" +
                            timeRange.from.minute + " " +
                            timeRange.from.period + "-" +
                            timeRange.to.hour + ":" +
                            timeRange.to.minute + " " +
                            timeRange.to.period
                        );
                        timerangeContainer.remove();
                    }
                }
                var histimerange = get_range();
                var hr = histimerange.from.hour;
                var mi = histimerange.from.minute;
                var pe = histimerange.from.period;
                var dash = '-';
                var HIStime = hr + dash + mi +dash+ '00';
                from_HIStime = HIStime;
                var to_hr = histimerange.to.hour;
                var to_mi = histimerange.to.minute;
                var to_pe = histimerange.to.period;
                to_HIStime = to_hr + dash + to_mi + dash+'00';


                time_change_name_from = hr + ':' + mi +':'+ '00';
                time_change_name_to = to_hr + ':' + to_mi + ':'+'00'
                console.log(from_HIStime)
                console.log(to_HIStime)
                document.getElementById('time_change').innerHTML=`From- ${time_change_name_from} To- ${time_change_name_to}`
                document.getElementById("timePicker_his").style.display = 'none'

                exampleFunction()
                loadTeamHistory()

                // from_O_HIStime = from_HIStime;
                // to_O_HIStime = to_HIStime;
                // document.getElementById("timePicker_his").style.display = "none";
                // document.getElementById("selected_time_user").innerHTML = `<b>From - ${from_O_HIStime} &ensp;&ensp; To -  ${to_O_HIStime
                            // }</b>`
            }
            function set_range(range) {
                time_range = range
            }
            function get_range() {
                return time_range;
            }