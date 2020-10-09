//Global Declartions
var current_user;
var clk_d;
if (!localStorage.getItem("session")) {
    window.location.href = "../login";
}

var data_user2;
var dev_id;
window.onload = exampleFunction();
function exampleFunction() {
    fetch('https://takvaviya.in/coolpad_backend/user/User_history_data/' + start_date + '/' + end_date + '/' + current_date + '/' + common4all)
    .then(response => response.json())
    .then(data_user => {
        data_user2= data_user
        UserHistoy(Object.keys(data_user2)[0])
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
            let allUsers = Object.values(data);
            let unDeletedUsers = allUsers.filter(user => user.is_Deleted === 'false');
            let userNames = unDeletedUsers.map(user => user.user);
            const innerdiv = userNames.map(userName => {
                return `<option value='${userName}'>${userName}</option>`
            }).join("");
            document.getElementById("user_history_select").innerHTML = innerdiv;
/*
            UserHistoy(Object.keys(data)[0])
*/
            this.current_user = Object.keys(data)[0]
            localStorage.setItem('current_user', Object.keys(data)[0]);
        });
}


loadUserHistoy();



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
    duration_w = []
    obj_w = {}

    fetch('https://takvaviya.in/coolpad_backend/user/team_history/'+ start_date+'/'+ end_date + '/' + current_date + '/' + common4all)
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


            Object.keys(dataa["top 5 users in contact Day"]).map(item => { keys.push(item) })
            Object.values(dataa["top 5 users in contact Day"]).map(item => { values.push(item) })
            for (var i = 0; i < keys.length; i++) {
                if(values[i] !=0 ){
                obj[i] = { "sno": i + 1, "pair": keys[i], "contact": values[i] };
            }
            }
            dataa = Object.values(obj)
            $('#user_contact').DataTable({
                "searching": false,
                "info": false,
                "bLengthChange": false,
                "bDestroy": true,
                data: dataa, "columns": [ { "data": "pair" }, { "data": "contact" }]
            });


            Object.keys(dataa_ww["top 5 users in contact Week"]).map(item => { keys_w.push(item) })
            Object.values(dataa_ww["top 5 users in contact Week"]).map(item => { values_w.push(item) })
            for (var i = 0; i < keys_w.length; i++) {
                obj_w[i] = { "sno": i + 1, "pair": keys_w[i], "contact": values_w[i] };
            }
            dataa_weak = Object.values(obj_w)
            $('#user_contact_weekss').DataTable({
                "searching": false,
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
    fetch('https://takvaviya.in/coolpad_backend/user/pdf_gen/' + user_instance + '/'+ start_date+'/'+ end_date + '/' + current_date +'/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.path + ".pdf"
        });
}

// Download Report CSV

function dwnldusrcsv() {
    var user_instance = localStorage.getItem('current_user');
    fetch('https://takvaviya.in/coolpad_backend/user/report/' + user_instance + '/csv/'+ start_date+'/'+ current_date +'/'+ end_date  +'/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.path + ".csv"
        });
}

// Download Report xlsx

function dwnldusrxlsx() {

    var user_instance = localStorage.getItem('current_user');
    fetch('https://takvaviya.in/coolpad_backend/user/report/' + user_instance + '/xl/'+ start_date+'/'+ end_date + '/' + current_date +'/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.path + ".xlsx"
        });
}


// Team download

// Download Report PDF

function dwnldtmpdf() {

    var user_instance = localStorage.getItem('current_team');
    fetch('https://takvaviya.in/coolpad_backend/user/pdf_gen_team/' + user_instance + '/'+ start_date+'/'+ end_date + '/' + current_date  +'/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.path + ".pdf"
        });
}

// Download Report CSV

function dwnldtmcsv() {
    var user_instance = localStorage.getItem('current_team');
    fetch('https://takvaviya.in/coolpad_backend/user/team_report/' + user_instance + '/csv/'+ start_date+'/'+ current_date +'/'+ end_date  +'/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.path + ".csv"
        });
}

// Download Report xlsx

function dwnldtmxlsx() {

    var user_instance = localStorage.getItem('current_team');
    fetch('https://takvaviya.in/coolpad_backend/user/team_report/' + user_instance + '/xl/'+ start_date+'/'+ current_date +'/'+ end_date  +'/'+common4all)
        .then(response => response.json())
        .then(data => {
            window.location.href = data.path + ".xlsx"
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
