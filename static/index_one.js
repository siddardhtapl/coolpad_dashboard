//Global Declartions

var current_user;

var clk_d;



if(!localStorage.getItem("session"))
{
window.location.href="../login";
}
//tab controls

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

    fetch('http://takvaviya.in:8001/coolpad/user/User_history_data/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            dataa = data[option];
            
            clk_d = dataa["24_hr_clock"]
            const innerdiv0 = `   <p class="count-id">${clk_d}</p>`            
            // document.getElementById("abc").innerHTML = innerdiv0
            console.log(clk_d);
            history_clk(clk_d);


            const innerdiv = `   <p class="count-id">${dataa["Current Device ID"]}</p>`
            document.getElementById("cdid").innerHTML = innerdiv

            const innerdiv1 = `   <p class="count-id">${dataa["Users in Contact Day"]}</p>`
            document.getElementById("nouinc").innerHTML = innerdiv1

            const innerdiv2 = `   <p class="count-id">${dataa["Users in Contact Week"]}</p>`
            document.getElementById("nouinw").innerHTML = innerdiv2

            const innerdiv3 = `   <p class="count-id">${dataa["Max Contact Duration Day"]}</p>`
            document.getElementById("hcdd").innerHTML = innerdiv3

            const innerdiv4 = `   <p class="count-id">${dataa["Max Contact Duration Week"]}</p>`
            document.getElementById("hcdw").innerHTML = innerdiv4
           
            var d = 0;
            const innerdiv5 = Object.keys(dataa["Contact History Day"]).map(item => {

                d = d + 1;
                // console.log(dataa["24_hr_clock"])

                // console.log("ssd", item);
                return `<div class="row_user_status">
                    <div style="flex:1"><b>${d}</b></div>
                    <div style="flex:1"><b class="capi-text">${item}</b></div>
                    <div style="flex:1"><b>${dataa["Contact History Day"][item].count}</b></div>
                    <div style="flex:1;"><b>${dataa["Contact History Day"][item].max_duration}</b></div>
                  </div>`

            }).join(" ");
            document.getElementById("contact_history_day").innerHTML = innerdiv5

            // const innerdiv15 = Object.keys(dataa["24_hr_clock"]).map(item => {
            //     console.log(dataa["24_hr_clock"])
            //     // console.log("ssd", item);
                
            // }).join(" ");



            var c = 0;
            const innerdiv6 = Object.keys(dataa["Contact History Day"]).map(item => {
                c = c + 1;
                // console.log("ssd", item);
                return `<div class="row_user_status">
                    <div style="flex:1"><b>${c}</b></div>
                    <div style="flex:1"><b class="capi-text">${item}</b></div>
                    <div style="flex:1"><b>${dataa["Contact History Day"][item].count}</b></div>
                    <div style="flex:1;"><b>${dataa["Contact History Day"][item].max_duration}</b></div>
                  </div>`

            }).join(" ");

         

            document.getElementById("contact_history_week").innerHTML = innerdiv6




        })

}
function history_clk(clk_d){
    $("#chart20").empty()
    var options = {
        series: [{
        name: 'AM',
        data: clk_d
      }, {
        // name: 'PM',
        // data: clk_d.slice(12,24)
      }],
        grid:{
            show:false
      },
      
        chart: {
         
        height: 180,
        type: 'area'
      },
      legend: {
        labels: {
            colors: '#fff'
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
        categories: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"],
        labels: {
            show: true,
            style: {
                colors: 'white',
                fontSize: '14px',
            }
        },
    },
    yaxis:{
        labels:{
            style:{
                colors:'white',
            }
        }
    },
      tooltip: {
        x: {
          format:'string'
            },
      },
      };

      var chart = new ApexCharts(document.querySelector("#chart20"), options);
      chart.render();
}

function loadUserHistoy() {
    fetch('http://takvaviya.in:8001/coolpad/user/User_history_data/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            // console.log("ft", Object.keys(data));
            const innerdiv = Object.keys(data).map(item => {
                return `<option value='${item}'>${item}</option>`
            }).join("");
            document.getElementById("user_history_select").innerHTML = innerdiv
            // console.log("lll", Object.keys(data)[0])
            UserHistoy(Object.keys(data)[0])
            this.current_user = Object.keys(data)[0]
            localStorage.setItem('current_user', Object.keys(data)[0]);

        });
}


loadUserHistoy();



function getSelectValueUserHistory() {
    var sel = document.getElementById('user_history_select').value;
    // console.log("hello", sel);
    this.UserHistoy(sel);
    localStorage.setItem('current_user', sel)
}


// Team history

function TeamHistoy(option) {

    fetch('http://takvaviya.in:8001/coolpad/user/team_history/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            dataa = data[option];
            // console.log("k", dataa["Users in Contact"]);

            const innerdiv = `   <p class="count-id">${dataa["Users in Contact"]}</p>`
            document.getElementById("tuic").innerHTML = innerdiv

            const innerdiv4 = `   <p class="count-id">${dataa["Contacts in a Day"]}</p>`
            document.getElementById("tcid").innerHTML = innerdiv4

            const innerdiv1 = `   <p class="count-id">${dataa["Contacts in a Week"]}</p>`
            document.getElementById("tciw").innerHTML = innerdiv1

            const innerdiv2 = `   <p class="count-id">${Object.keys(dataa["Most contact user pair Day"])}&ensp;&ensp;&ensp;&ensp;Count:&ensp;${Object.values(dataa["Most contact user pair Day"])}</p>`
            document.getElementById("tmcup").innerHTML = innerdiv2

            const innerdiv3 = `   <p class="count-id">${Object.keys(dataa["Most contact user pair Week"])}&ensp;&ensp;&ensp;&ensp;Count:&ensp;${Object.values(dataa["Most contact user pair Week"])}</p>`
            document.getElementById("tmcupw").innerHTML = innerdiv3

           
            var c = 0;
            const innerdiv5 = Object.keys(dataa["top 5 users in contact Day"]).map(item => {

                c = c + 1;
                // console.log("ssd", item);
                return `<div class="row_user_status">
                <div style="flex:1"><b>${c}</b></div>
                <div style="flex:1"><b class="capi-text">${item}</b></div>
                <div style="flex:1"><b>${dataa["top 5 users in contact Day"][item]}</b></div>
              </div>`

            }).join(" ");


            document.getElementById("contact_history_tday").innerHTML = innerdiv5

            var d = 0;
            const innerdiv6 = Object.keys(dataa["top 5 users in contact Week"]).map(item => {
                d = d + 1;
                // console.log("ssd", item);
                return `<div class="row_user_status">
                <div style="flex:1"><b>${d}</b></div>
                <div style="flex:1"><b class="capi-text">${item}</b></div>
                <div style="flex:1"><b>${dataa["top 5 users in contact Week"][item]}</b></div>
              </div>`

            }).join(" ");


            document.getElementById("contact_history_tweek").innerHTML = innerdiv6




        })


}



function loadTeamHistory() {

    // window.location.href = "http://106.51.3.224:6661/coolpad_report/team A-Team History.csv"
    // console.log("click");
    fetch('http://takvaviya.in:8001/coolpad/user/team_history/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            // console.log("ft", Object.keys(data));
            const innerdiv = Object.keys(data).map(item => {
                return `<option value='${item}'>${item}</option>`
            }).join("");
            document.getElementById("team_history_select").innerHTML = innerdiv
            // console.log("lll", Object.keys(data)[0])
            TeamHistoy(Object.keys(data)[0])
            localStorage.setItem('current_team', Object.keys(data)[0]);
        });

}

loadTeamHistory();

function getSelectValueTeamHistory() {
    var sel = document.getElementById('team_history_select').value;
    // console.log("hello", sel);
    this.TeamHistoy(sel);
     localStorage.setItem('current_team', sel)
}


// Download Report PDF

function dwnldusrpdf() {

    // console.log("lll", localStorage.getItem('current_user'));
    var user_instance = localStorage.getItem('current_user');
    fetch('http://takvaviya.in:8001/coolpad/user/pdf_gen/'+ user_instance +'/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".pdf");
        window.location.href = data.path + ".pdf"
        });
}

// Download Report CSV

function dwnldusrcsv() {
    // console.log("lll", localStorage.getItem('current_user'));
    var user_instance = localStorage.getItem('current_user');
    fetch('http://takvaviya.in:8001/coolpad/user/report/'+ user_instance +'/csv/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".csv");
             window.location.href = data.path + ".csv"
        });
    }

// Download Report xlsx

 function dwnldusrxlsx() {

     // console.log("lll", localStorage.getItem('current_user'));
     var user_instance = localStorage.getItem('current_user');
     fetch('http://takvaviya.in:8001/coolpad/user/report/'+ user_instance +'/xl/2020-08-03/2020-08-07/2020-08-04')
         .then(response => response.json())
         .then(data => {
            //  console.log(data.path+".xlsx");
              window.location.href = data.path + ".xlsx"
         });
     }


// Team download

// Download Report PDF

function dwnldtmpdf() {

    // console.log("lll", localStorage.getItem('current_user'));
    var user_instance = localStorage.getItem('current_team');
    fetch('http://takvaviya.in:8001/coolpad/user/pdf_gen_team/'+ user_instance +'/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".pdf");
            window.location.href = data.path + ".pdf"
        });
}

// Download Report CSV

function dwnldtmcsv() {

    // console.log("lll", localStorage.getItem('current_user'));
    var user_instance = localStorage.getItem('current_team');
    fetch('http://takvaviya.in:8001/coolpad/user/team_report/'+ user_instance +'/csv/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".csv");
             window.location.href = data.path + ".csv"
        });
    }

// Download Report xlsx

function dwnldtmxlsx() {

    // console.log("lll", localStorage.getItem('current_user'));
    var user_instance = localStorage.getItem('current_team');
    fetch('http://takvaviya.in:8001/coolpad/user/team_report/'+ user_instance +'/xl/2020-08-03/2020-08-07/2020-08-04')
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".xlsx");
             window.location.href = data.path + ".xlsx"
        });
    }

