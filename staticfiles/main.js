// Global decleration
var contact_f_data
var contact_f_data_week
var api


var from_HIStime, to_HIStime;
var default_time_param = " 00-00-00";
var default_currnt_param = "00-00-00";
var default_end_param = "23-59-59";
from_HIStime = default_currnt_param;
to_HIStime = default_end_param;

var times



var co;
function color() {
    if (localStorage.getItem("theme") == "light") {
        co = 'black'
    }
    else if (localStorage.getItem("theme") == "dark") {
        co = 'white'
    }
    if (selectdate === undefined) {
        console.log(selectdate)
    }
    else {
        daily_data(selectdate);
    }
    weekly_data()
}

function exampleFunction(selectdate) {
    console.log("api", from_HIStime, to_HIStime)
    fetch('https://takvaviya.in/coolpad_backend/user/team_freq/' + selectdate + " " + from_HIStime + '/' + selectdate + " " + to_HIStime + '/' + common4all)
        .then(response => response.json())
        .then(data_user => {
            contact_f_data = data_user
            loadFreq(Object.keys(contact_f_data)[0])
            daily_tracker_freq()
            getHeapMapData()
        })
    fetch('https://takvaviya.in/coolpad_backend/user/frequency_weekly/' + start_date + " " + default_currnt_param + '/' + end_date + " " + default_end_param + '/' + common4all)
        .then(response => response.json())
        .then(data_week => {
            contact_f_data_week = data_week
            loadFreqWeekly(Object.keys(contact_f_data_week)[0])
            getHeapMapDataWeekly();
        })
}





var input = document.getElementById('togBtn1');
input.addEventListener('change', function () {
    if (this.checked) {
        document.getElementById("contact_frequency1").style.display = 'none';
        document.getElementById("chartt").style.display = 'block';
    }
    else {
        document.getElementById("contact_frequency1").style.display = 'block';
        document.getElementById("chartt").style.display = 'none';
    }
});

var input = document.getElementById('togBtn2');
input.addEventListener('change', function () {
    if (this.checked) {
        document.getElementById("contact_frequency_weekly1").style.display = 'none';
        document.getElementById("chartt1").style.display = 'block';
    }
    else {
        document.getElementById("contact_frequency_weekly1").style.display = 'block';
        document.getElementById("chartt1").style.display = 'none';
    }
});
function userid() {
    obj1 = {}
    sta = []
    batery = []
    uuID = []
    fetch('https://takvaviya.in/coolpad_backend/user/userDeviceStatus/' + common4all)
        // response.json()
        // fetch(api)
        .then(response => response.json())
        .then(data => {
            dataa = Object.values(data)
            console.log(dataa, "uuuuuidddd")
            Object.values(data).map(item => {
                var bat = item['recent_heartbeat_event']['battery']
                bat = Math.round(bat / 10)
                if (bat) {
                    batery.push(bat)
                }
                else {
                    bat = "-";
                    batery.push(bat)
                }
                var uuid = item["user_id"]
                uuID.push(uuid.slice(0, 5))
            })
            for (var i = 0; i < dataa.length; i++) {
                dataa[i]["battery"] = batery[i]
                dataa[i]["user_id"] = uuID[i]
            }
            let undeletedUsers = dataa.filter(user => user.is_Deleted === "false");
            $('#user_status_table').DataTable({
                columnDefs: [
                    { type: 'natural-nohtml', targets: [0, 1] }
                ],
                "searching": false,
                "info": false,
                "bLengthChange": false,
                data: undeletedUsers,
                "columns": [{ "data": "user" }, { "data": "user_id" }, { "data": "device_status", "defaultContent": "-" }, { "data": "battery", "defaultContent": "-" }, { "data": "time_stamp" }]
            });
        });
}
userid();

function userlive() {
    var i = 0
    fetch('https://takvaviya.in/coolpad_backend/user/live_data' + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            dataa = Object.values(data)
            i = i + 1
            $('#usertable').DataTable({
                "searching": false,
                "info": false,
                "bLengthChange": false,
                data: dataa,
                "columns": [{ "data": "local" }, { "data": "remote" }, { "data": "duration" }, { "data": "avgDist" }]
            });
        });
}
userlive();
// hari *******************************************************************************************************
var input = document.getElementById('togBtn');
input.addEventListener('change', function () {
    if (this.checked) {
        document.getElementById("chart12").style.display = 'none';
        document.getElementById("chart10").style.visibility = 'visible';
    }
    else {
        document.getElementById("chart12").style.display = 'block';
        document.getElementById("chart10").style.visibility = 'hidden';
    }
});
// ****************************************************************************************************
function opentab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
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
        if(tabName == 'daily'){
            document.getElementById('date_time').style.display ="flex";

        }
        else if(tabName == 'weekly'){
            document.getElementById('date_time').style.display ="none";

        }
    evt.currentTarget.className += " active";
    daily_data(selectdate)
    exampleFunction(selectdate);
    document.getElementById('weekpicker').value = moment().format('YYYY-[W]WW');
    document.getElementById('weekpicker').max = moment().format('YYYY-[W]WW');
    weekly_data()
}

function loadFreq(option) {
    dataa = contact_f_data[option]
    const rowLen = Object.keys(dataa).length;
    var i = 0
    $("#contact_frequency").empty();
    const outerdiv = ` <tr style="height: 50px;">
              <td class="demo-txt"><b>User</b></td> ` +
        Object.keys(dataa).map(item => {
            i = i + 1
            if (rowLen === i) {
                // console.log("enter")
                return `<td class="demo-txt"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>` +
                    `<td class="demo-txt"><b>Others</b></td>`
            }
            else {
                return `<td class="demo-txt"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>`;
            }
        }).join(" ") + `</tr>`
    const innerdiv = Object.keys(dataa).map(item => {
        return `
             <tr style="height: 50px;">
             <td class="demo-txt"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td> ` +
            Object.keys(dataa[item]).map(items => {
                // console.log("iii", item)
                if (dataa[item][items] > 0) {
                    return `<td style="color: #e67e22;cursor: pointer;"><b>${dataa[item][items]}</b></td> `
                }
                return `<td style="cursor: pointer;"><b> </b></td> `
                // return ` <td><b>${dataa[item][items]}</b></td> `
            }).join(" ");
    }).join(" ");
    // document.getElementById("contact_frequency").innerHTML = outerdiv + innerdiv
    $("#contact_frequency").append(outerdiv + innerdiv);
    // });
}

function daily_tracker_freq() {
    const innerdiv = Object.keys(contact_f_data).map(item => {
        return `<option value='${item}'>${item.charAt(0).toUpperCase() + item.slice(1)}</option>`
    }).join("");
    document.getElementById("team_select").innerHTML = innerdiv
    loadFreq(Object.keys(contact_f_data)[0])
    // });
}

// daily_tracker_freq();

function getSelectValue() {
    var sel = document.getElementById('team_select').value;
    // console.log("hello", sel);
    this.loadFreq(sel);
}
setInterval(function () {
    daily_tracker_freq();
    daily_data(selectdate);
    exampleFunction(selectdate);
    //TODO refresh clock
}, 300000);

function loadFreqWeekly(option) {
    dataa = contact_f_data_week[option]
    // console.log(contact_f_data_week)
    var rowlen1 = Object.keys(dataa).length;
    var n = 0;
    $("#contact_frequency_weekly").empty();
    const outerdiv =
        ` <tr style="height: 50px;">
              <td class="demo-txt"><b>User</b></td> ` +
        Object.keys(dataa).map(item => {
            n = n + 1
            if (rowlen1 === n) {
                // console.log("enter")
                return `<td class="demo-txt"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>` +
                    `<td class="demo-txt"><b>Others</b></td>`
            }
            else {
                return `<td class="demo-txt"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>`;
            }
            //  return `<td style="color:white"><b>${item.toUpperCase()}</b></td>`
        }).join(" ") + `</tr>`
    const innerdiv = Object.keys(dataa).map(item => {
        return `
             <tr style="height: 50px;">
             <td class="demo-txt"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td> ` +
            Object.keys(dataa[item]).map(items => {
                // console.log("iii", dataa[item][items])
                if (dataa[item][items] > 0) {
                    return `<td style="color: #e67e22;"><b>${dataa[item][items]}</b></td> `
                }
                return `<td ><b> </b></td> `
            }).join(" ");
    }).join(" ");
    $("#contact_frequency_weekly").append(outerdiv + innerdiv);
    // });
}
function getSelectValueweekly() {
    var sel = document.getElementById('team_select_weekly').value;
    // console.log("hello", sel);
    this.loadFreqWeekly(sel);
}


setInterval(function () {
    weekly_data();
    // weekly_clk();
    //TODO refresh clock
}, 1000 * 60 * 60);

// elamparithi heat chart
var heatMapData;
var heatMapChart;
function getHeapMapData() {
    heatMapData = contact_f_data;
    let teams = Object.keys(heatMapData);
    getDropDownOptions(teams);
    renderHeatMap(teams[0]);

    // });
    function getDropDownOptions(teams) {
        if (heatMapData) {
            if (teams) {
                $("#teamDropDownButton").empty();
                let dropDown = document.getElementById('teamDropDownButton');
                teams.forEach(team => {
                    let dropDownItem = document.createElement('option');
                    dropDownItem.id = `${team}`;
                    dropDownItem.value = `${team}`;
                    dropDownItem.innerHTML = `${team}`
                    dropDown.append(dropDownItem);
                });
                document.getElementById('teamDropDownButton').value = teams[0];
            }
        }
    }
}
// getHeapMapData();
function renderHeatMap(team) {
    var seriesData = [];
    switchTeamChart(team);
    function switchTeamChart(team) {
        seriesData = [];
        if (heatMapData) {
            let temp_team = heatMapData[team];
            for (const emp in heatMapData[team]) {
                let emp_data = temp_team[emp];
                let chart_temp = []
                for (const emp in emp_data) {
                    chart_temp.push({
                        x: emp,
                        y: emp_data[emp],
                        min: -100,
                        max: 100,
                    })
                }
                seriesData.push({
                    name: emp,
                    data: chart_temp
                });
            }
            if (heatMapChart) {
                heatMapChart.updateSeries(seriesData);
            }
            else {
                renderChart();
            }
        }
    };
    function renderChart() {
        var options = {
            series: seriesData,
            chart: {
                height: 330,
                type: 'heatmap',
            },
            stroke: {
                show: true,
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: true,
                labels: {
                    colors: '#888ea8'
                },
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: '#888EA8',
                    }
                },
                axisBorder: {
                    show: false
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: '#888EA8',
                        fontSize: '12px',
                    }
                },
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: true,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 0,
                            color: '#1A1C2D'
                        },
                        {
                            from: 1,
                            to: 20,
                            color: '#D6FEFF'
                        },
                        {
                            from: 21,
                            to: 45,
                            color: '#7CEAFC'
                        },
                        {
                            from: 46,
                            to: 55,
                            color: '#094198'
                        }
                        ]
                    }
                }
            },
        };
        heatMapChart = new ApexCharts(document.querySelector("#chart30"), options);
        heatMapChart.render();
    }
}
function switchHeatMap(team) {
    renderHeatMap(team);
}

// *********************************************************************************************
//Heat map weekly
var heatMapDataWeekly;
var heatMapChartWeekly;
function getHeapMapDataWeekly() {
    heatMapDataWeekly = contact_f_data_week;
    let teams = Object.keys(heatMapDataWeekly);
    getDropDownOptions(teams);
    renderHeatMapWeekly(teams[0])
    function getDropDownOptions(teams) {
        if (heatMapDataWeekly) {
            if (teams) {
                $("#teamDropDownButtonWeek").empty();
                let dropDown = document.getElementById('teamDropDownButtonWeek');
                teams.forEach(team => {
                    let dropDownItem = document.createElement('option');
                    dropDownItem.id = `${team}`;
                    dropDownItem.value = `${team}`;
                    dropDownItem.innerHTML = `${team}`
                    dropDown.append(dropDownItem);
                });
                document.getElementById('teamDropDownButtonWeek').value = teams[0];
            }
        }
    }
}
function renderHeatMapWeekly(team) {
    var seriesData = [];
    switchTeamChartWeekly(team);
    function switchTeamChartWeekly(team) {
        seriesData = [];
        if (heatMapDataWeekly) {
            let temp_team = heatMapDataWeekly[team];
            for (const emp in heatMapDataWeekly[team]) {
                let emp_data = temp_team[emp];
                let chart_temp = []
                for (const emp in emp_data) {
                    chart_temp.push({
                        x: emp,
                        y: emp_data[emp],
                        min: -100,
                        max: 100,
                    })
                }
                seriesData.push({
                    name: emp,
                    data: chart_temp
                });
            }
            if (heatMapChartWeekly) {
                heatMapChartWeekly.updateSeries(seriesData);
            }
            else {
                renderChart();
            }
        }
    };
    function renderChart() {
        var options = {
            series: seriesData,
            chart: {
                height: 330,
                type: 'heatmap',
            },
            stroke: {
                show: true,
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: true,
                labels: {
                    colors: '888ea8'
                },
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: '#888EA8',
                    }
                },
                axisBorder: {
                    show: false
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: '#888EA8',
                        fontSize: '12px',
                    }
                },
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: true,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 0,
                            color: '#1A1C2D'
                        },
                        {
                            from: 1,
                            to: 20,
                            color: '#D6FEFF'
                        },
                        {
                            from: 21,
                            to: 45,
                            color: '#7CEAFC'
                        },
                        {
                            from: 46,
                            to: 55,
                            color: '#094198 '
                        }
                        ]
                    }
                }
            },
        };
        heatMapChartWeekly = new ApexCharts(document.querySelector("#heatMapChartWeekly"), options);
        heatMapChartWeekly.render();
    }
}
function switchHeatMapWeekly(team) {
    renderHeatMapWeekly(team);
}

// Daily report download

function rp_one_daily() {
    var user_instance = localStorage.getItem('current_user');
    fetch('https://www.takvaviya.in/coolpad_backend/user/daily_report/' + selectdate + " " + from_HIStime + '/' + selectdate + " " + to_HIStime + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".pdf");
            /*            window.location.href = data.path + ".pdf"*/
            window.open(data.path + ".pdf");
        });
}
https://takvaviya.in/coolpad_backend/user/summary_report/2020-10-22%2000-00-00/2020-10-22%2023-59-59/2020-10-18%2000-00-00/2020-10-24%2023-59-59/Tyson__America__South__Tyson
function daily_summary_report() {
    var user_instance = localStorage.getItem('current_user');
    fetch('https://www.takvaviya.in/coolpad_backend/user/summary_report/' + selectdate + " " + from_HIStime + '/' + selectdate + " " + to_HIStime + '/' +start_date + " " + default_currnt_param + '/' + end_date + " " + default_end_param + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".pdf");
            /*            window.location.href = data.path + ".pdf"*/
            window.open(data.path + ".pdf");
        });
}


var selectedWeekStart = null;
var selectedWeekEnd = null;
var ctHistoryAllWeekTable;
function generateWeeklyReport() {
    //Todo not user instance its emp instance
    let start_date_week = start_date;
    let end_date_week = end_date;
    if(selectedWeekStart && selectedWeekEnd)
    {
        start_date_week = selectedWeekStart;
        end_date_week = selectedWeekEnd;
    }
    var user_instance = localStorage.getItem('current_user');
    fetch('https://www.takvaviya.in/coolpad_backend/user/weekly_report/' + start_date_week + " " + default_currnt_param + '/' + end_date_week + " " + default_currnt_param + '/' + current_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            /*            window.location.href = data.path + ".pdf"*/
            console.log("ffff", data.path)
            window.open(data.path + ".pdf");
        });
}

function weekly_data(startSunday="",endSaturday="") {
    document.getElementById('weeklyLoadingSpinner').style.display = "block"
    var total_no_contact;
    var week_team_track;
    var contact_frequency_week;
    var top5_contact_history_week;
    var contact_history_all_weelk;
    var daily_total_for_week;
    let start_date_week = start_date;
    let end_date_week = end_date;
    if(startSunday && endSaturday)
    {
        start_date_week = startSunday;
        end_date_week = endSaturday;
    }
    fetch('https://takvaviya.in/coolpad_backend/user/weekly_tracker_get/' + start_date_week + " " + default_currnt_param + '/' + end_date_week + " " + default_end_param + '/' + common4all)
        .then(response => response.json())
        .then(
            data => {
             document.getElementById('weeklyLoadingSpinner').style.display = "none"
                document.getElementById("weekly_tracker_loader").innerHTML = ''
                total_no_contact = data['total_no_of_contacts_weekly']
                week_team_track = data['weekly_team_tracker']
                contact_frequency_week = data['freqency_matrix_weekly']
                top5_contact_history_week = data['top_pairs_maxmium_contact_week']
                contact_history_all_weelk = data['pairs_history_weekly']
                daily_total_for_week = data['clk_chart_weekly']
                document.getElementById("totalnocontact_weekly").innerHTML = `<b style="font-size:50px;">${total_no_contact}</b>`

                var la;
                var laa = []
                la = Object.keys(week_team_track).map(item => {
                    laa.push(item.charAt(0).toUpperCase() + item.slice(1))
                })
                $("#chart7").empty();


                var options = {
                    series: [{
                        name: 'Data',
                        data: Object.values(week_team_track)
                    }],
                    chart: {
                        type: 'bar',
                        height: 350,
                        // width:450
                    },
                    grid: {
                        show: false
                    },
                    xaxis: {
                        categories: laa,
                        labels: {
                            show: true,
                            style: {
                                colors: co,
                                fontSize: '18px',
                            }
                        },
                        axisBorder: {
                            show: false
                        },
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: co,
                                fontSize: '12px',
                            }
                        },
                    },
                    stroke: {
                        curve: 'stepline',
                    },
                    dataLabels: {
                        enabled: true
                    },

                    markers: {
                        hover: {
                            sizeOffset: 4
                        }
                    }
                };
                var chart = new ApexCharts(document.querySelector("#chart7"), options);
                chart.render();
                $("#chart5").empty();
                var options = {
                    series: [{
                        name: 'Contact',
                        data: Object.values(top5_contact_history_week)
                    }],
                    chart: {
                        type: 'bar',
                        height: 400,
                    },
                    grid: {
                        show: false
                    },
                    xaxis: {
                        categories: Object.keys(top5_contact_history_week),
                        labels: {
                            show: true,
                            style: {
                                colors: co,
                                fontSize: '12px',
                            }
                        },
                        axisBorder: {
                            show: false
                        },
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: co,
                                fontSize: '12px',
                            }
                        },
                    },
                    stroke: {
                        curve: 'stepline',
                    },
                    dataLabels: {
                        enabled: true
                    },
                    markers: {
                        hover: {
                            sizeOffset: 4
                        }
                    }
                };

                if( Object.values(top5_contact_history_week).length !== 0 )
                {
                    $('#no_data').hide();
                    $('#chart5').show();
                    var chart2 = new ApexCharts(document.querySelector("#chart5"), options);
                    chart2.render();
                }else
                {
                    console.log("hit");
                    $('#no_data').show();
                    $('#chart5').hide();
                }


                // end

                keys_week = []
                values_week = []
                obj_week = {}

                Object.keys(contact_history_all_weelk).map(item => { keys_week.push(item) })
                Object.values(contact_history_all_weelk).map(item => { values_week.push(item) })

                for (var i = 0; i < keys_week.length; i++) {
                    if (values_week[i] != 0) {
                        obj_week[i] = { "pair": keys_week[i], "count": values_week[i] };
                    }
                }
                dataa_week = Object.values(obj_week)
                                if(!ctHistoryAllWeekTable)
                {
                    ctHistoryAllWeekTable = $('#contact_his_week').DataTable({
                        "retrieve": true,
                        "paging": true,
                        "searching": false,
                        "info": false,
                        "bLengthChange": false,
                        data: dataa_week, "columns": [{ "data": "pair" }, { "data": "count" }]
                    });
                }
                else
                {
                    ctHistoryAllWeekTable.clear();
                    ctHistoryAllWeekTable.rows.add(dataa_week);
                    ctHistoryAllWeekTable.draw();
                }
                $("#chart11").empty();
                var options = {
                    series: [{
                        name: "Contacts",
                        data: Object.values(daily_total_for_week)
                    }],
                    chart: {
                        height: 350,
                        type: 'bar',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: '',
                        align: 'left'
                    },
                    grid: {
                        show: false
                    },
                    xaxis: {

                        categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                        labels: {
                            style: {
                                colors: co,
                            },
                        },
                    },

                    yaxis: {
                        labels: {
                            style: {
                                colors: co,
                                // fontSize: '14px',
                            }

                        }
                    },
                };

               if(Object.values(daily_total_for_week).length !== 0)
               {

                var chart = new ApexCharts(document.querySelector("#chart11"), options);
                chart.render();

               }else
               {

                $('#chart11').hide();
                console.log("hhit");
               }







                const innerdiv = Object.keys(contact_frequency_week).map(item => {
                    return `<option value='${item}'>${item.charAt(0).toUpperCase() + item.slice(1)}</option>`
                }).join("");
                document.getElementById("team_select_weekly").innerHTML = innerdiv
                loadFreqWeekly(Object.keys(contact_frequency_week)[0])
            }
        )

    fetch('https://takvaviya.in/coolpad_backend/user/frequency_weekly/' + start_date_week + " " + default_currnt_param + '/' + end_date_week + " " + default_end_param + '/' + common4all)
        .then(response => response.json())
        .then(data_week => {
            contact_f_data_week = data_week
            loadFreqWeekly(Object.keys(contact_f_data_week)[0])
            getHeapMapDataWeekly();
        })
    }
function weekChanged(event) {
    let selectedWeekStartDate = moment(event.target.value);
    selectedWeekStart = selectedWeekStartDate.day('sunday').format('YYYY-MM-DD')
    selectedWeekEnd = selectedWeekStartDate.day('saturday').format('YYYY-MM-DD')
    weekly_data(selectedWeekStart,selectedWeekEnd);
}
var value = 100
console.log('https://takvaviya.in/coolpad_backend/user/daily_tracker_get/' + current_date + '/' + common4all)


function daily_data(selectdate) {
    document.getElementById("daily_tracker_loader").innerHTML = `<b style="padding-left: 2rem;font-size: larger;">Loading Data . . .</b>`;
    fetch('https://takvaviya.in/coolpad_backend/user/daily_tracker_get/' + selectdate + " " + from_HIStime + '/' + selectdate + " " + to_HIStime + '/' + common4all)
        .then(response => response.json())
        .then(
            data => {
                console.log('https://takvaviya.in/coolpad_backend/user/daily_tracker_get/' + selectdate + " " + from_HIStime + '/' + selectdate + " " + to_HIStime + '/' + common4all)

                document.getElementById("daily_tracker_loader").innerHTML = ''
                var top_contact_history = data['top_pairs_maxmium_contact']
                var total_no_contact_daily = data['total_no_of_contacts']
                var clock_data_daily = data['clk_chart']
                var contact_frequency_daily = data['contact_History_all']
                $("#chart9").empty();
                var top = Object.keys(top_contact_history)
                var options = {

                    series: [{
                        name: 'Data',
                        data: Object.values(top_contact_history)
                    }],
                    chart: {
                        type: 'bar',
                        height: 200,
                    },
                    grid: {
                        show: false
                    },
                    xaxis: {
                        categories: Object.keys(top_contact_history),
                        labels: {
                            show: true,
                            style: {
                                colors: co,
                                fontSize: '11px',
                            }
                        },
                        axisBorder: {
                            show: false
                        },
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: co,
                                fontSize: '12px',
                            }
                        },
                    },
                    stroke: {
                        curve: 'stepline',
                    },
                    dataLabels: {
                        enabled: true
                    },
                    markers: {
                        hover: {
                            sizeOffset: 4
                        }
                    }
                };
                var chart = new ApexCharts(document.querySelector("#chart9"), options);
                chart.render();
                document.getElementById("totalnocontact").innerHTML = `<b style="font-size:50px;">${total_no_contact_daily}</b>`
                $("#chart12").empty();
                var options = {
                    series: [{
                        name: 'Data',
                        data: Object.values(clock_data_daily)
                    }],
                    grid: {
                        show: false
                    },

                    chart: {

                        height: 380,
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
                                colors: co,
                                fontSize: '14px',
                            }
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: co,
                            }
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'string'
                        },
                    },
                };
                var chart = new ApexCharts(document.querySelector("#chart12"), options);
                chart.render();
                var am_data = []

                $("#chart10").empty();
                var options = {
                    series: [{
                        name: 'AM',
                        data: Object.values(clock_data_daily).slice(0, 12)
                    }, {
                        name: 'PM',
                        data: Object.values(clock_data_daily).slice(12, 24)
                    }],
                    grid: {
                        show: false
                    },

                    chart: {

                        height: 380,
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
                                colors: co,
                                fontSize: '14px',
                            }
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: co,
                                // fontSize: '14px',
                            }
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'string'
                        },
                    },
                };
                var chart = new ApexCharts(document.querySelector("#chart10"), options);
                chart.render();
                // end
                dataa_history = {};
                keys_history = []
                values_history = []
                obj_history = {}
                Object.keys(contact_frequency_daily).map(item => { keys_history.push(item) })
                Object.values(contact_frequency_daily).map(item => { values_history.push(item) })
                // console.log(keys_history)

                for (var i = 0; i < keys_history.length; i++) {
                    if (values_history[i] != 0) {
                obj_history[i] = { "pair": keys_history[i], "count": values_history[i]['count'], "max_duration": values_history[i]['max_duration'], "avgDist": values_history[i]['avgDist'],'milliseconds': values_history[i]['milliseconds'] };                    }
                }

                dataa_history = Object.values(obj_history)
                console.log(dataa_history)
                $('#contact_his').DataTable({
                    "searching": false,
                    "info": false,
                    "bLengthChange": false,
                    "bDestroy": true,
                    data: dataa_history,
                    "columns": [{ "data": "pair" }, { "data": "count" }, { "data": "max_duration" }, { "data": "avgDist" }],
                    columnDefs: [
                        { type: 'natural-nohtml', targets: [2] },
                    ],
                    fixedColumns: true,
                    fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.milliseconds >= 900000) {
                        $(nRow).addClass('beyondFifteen');
                    }
                }
                });

            }
        )
}
function render() {
    daily_contact_freq = contact_f_data[option]
}
var selectdate;
$(function () {
    var today = new Date();
    // console.log("fda",today,current_date)
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 14);
    var minDate = convertDateToReadableDate(today);
    var maxDate = convertDateToReadableDate(lastDay);
//    $('#txtDate').attr('min', maxDate);
    $('#txtDate').attr('max', minDate);
    selectdate = current_date
    daily_data(selectdate)
    exampleFunction(selectdate);
    $('#txtDate').val(selectdate);
    $("#txtDate").on('change', function (event) {
        event.preventDefault();
        selectdate = this.value
        // console.log(selectdate)
        // console.log("curr", current_date)

        let today = moment().format('YYYY-MM-DD')
        //hide/display "Live Data Table" by date selected
        if(today !== selectdate)
        {
            document.getElementById("liveDataTable").style.display = "none";
        }
        else if (today === selectdate)
        {
            document.getElementById("liveDataTable").style.display = "block";
        }

        daily_data(selectdate)
        exampleFunction(selectdate);


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

var hid = 1
function openDashTimer() {
    // console.log(hid)
    document.getElementById("timePicker_dash").style.display = "block";
    setTimeout(function () { $('.timerange').click(); }, 20);
}

$(document).mouseup(function (e)
                    {
  var container = $("#timePicker_dash"); // YOUR CONTAINER SELECTOR

  if (!container.is(e.target) // if the target of the click isn't the container...
      && container.has(e.target).length === 0) // ... nor a descendant of the container
  {
    container.hide();
  }
});


// window.addEventListener('mouseup',function(event){
//     var pol = document.getElementById('timePicker_dash');
//     if(event.target != pol && event.target.parentNode != pol){
//         pol.style.display = 'none';
//     }
//     times = 1
// });

//function submit_Dashtime(){
//from_HIStime = $("#from_time_dash").val()+':00';
//to_HIStime = $("#to_time_dash").val()+':00';
//from_HIStime = from_HIStime.replace(/:/g,"-");
//to_HIStime = to_HIStime.replace(/:/g,"-");
//daily_data(selectdate);
//exampleFunction(selectdate);
//document.getElementById("timePicker_dash").style.display="none";
//}
//
//function reset_Dashtime(){
//from_HIStime = default_currnt_param;
//to_HIStime = default_end_param;
//daily_data(selectdate);
//exampleFunction(selectdate);
//}


function submit_Dashtime() {
    from_HIStime = $("#from_time_dash").val() + ':00';
    to_HIStime = $("#to_time_dash").val() + ':00';

    from_HIStime = from_HIStime.replace(/:/g, "-");
    to_HIStime = to_HIStime.replace(/:/g, "-");


    from_O_HIStime = $("#from_time_dash").val() + ':00';
    to_O_HIStime = $("#to_time_dash").val() + ':00';
    daily_data(selectdate);
    exampleFunction(selectdate);
    document.getElementById("timePicker_dash").style.display = "none";
    document.getElementById("selected_time").innerHTML = `<b>From = ${from_O_HIStime} &ensp;&ensp; To =  ${to_O_HIStime}</b>`
}

function reset_Dashtime() {
    // document.getElementById("selected_time").innerHTML = ``
    document.getElementById("daily_tracker_loader").innerHTML = `  <b style="padding-left: 2rem;font-size: larger;">Loading Data . . .</b>`;
    document.getElementById("daily_tracker_loader").innerHTML = ` <b style="padding-left: 2rem;font-size: larger;">Loading Data . . .</b>`;
    from_HIStime = default_currnt_param;
    to_HIStime = default_end_param;
    difault_name_from = "00:00";
    default_name_to = "00:00";
    // console.log("to change",from_HIStime)
    // console.log("to change",to_HIStime)

    // selectdate = current_date;
    document.getElementById("name_change").innerHTML = `${difault_name_from} &nbsp;To&nbsp; ${default_name_to}`

    // $('#txtDate').val(selectdate);

    daily_data(selectdate);
    exampleFunction(selectdate);


}

function cancel_Dashtime() {
    document.getElementById("timePicker_dash").style.display = 'none'
    times = 1
}






// times = 1
$('.timerange').on('click', function (e) {

    console.log("times")

    // if (times == 1) {
    e.stopPropagation();
    var input = $(this).find('input');
    // console.log(input.val())
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
    if (input.val() == "") {
        // console.log("checkisad", input.val())
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
    if(range.from.hour ==0 &&  range.to.hour==0){
        range.from.hour=12
        range.to.hour =12
    }
console.log(range.from.hour)
    set_range(range);
    var html = '<div class="timerangepicker-container">' +
        '<div class="timerangepicker-from">' +
        '<label class="timerangepicker-label">From:</label>' +
        '<div class="timerangepicker-display hour from">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value" id="editableHour">' + ('0' + range.from.hour).substr(-2) + '</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display minute from">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value" id="editableMinute">' + ('0' + range.from.minute).substr(-2) + '</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display period">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">AM</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        '</div>' +
        '<div class="timerangepicker-to">' +
        '<label class="timerangepicker-label">To:</label>' +
        '<div class="timerangepicker-display hour to">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value" id="editableToHour">' + ('0' + range.to.hour).substr(-2) + '</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display minute to">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value" id="editableToMinute">' + ('0' + range.to.minute).substr(-2) + '</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        ':' +
        '<div class="timerangepicker-display period">' +
        '<span class="increment fa fa-angle-up"></span>' +
        '<span class="value">PM</span>' +
        '<span class="decrement fa fa-angle-down"></span>' +
        '</div>' +
        '</div>' +'<div class="float-right mt-2">'+
        '<button id="cancel_DashTime" class="custom_modal_btn outline mr-5" onclick="cancel_Dashtime()" data-toggle="tooltip" title="cancel"><i class="fa fa-close" aria-hidden="true"></i></button>'+
        '<button id="submit_DashTime" class="custom_modal_btn fill " onclick="setHistoryTime()" data-toggle="tooltip" title="submit"><i class="fa fa-check" aria-hidden="true"></i> </button>'+
        '</div>'+
        '</div>';
    $(html).insertAfter(this);
    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.hour .increment',
        function () {
            var value = $(this).siblings('.value');
            value.text(
                increment(value.text(), 12, 1, 2)
            );
        }
    );
    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.hour .decrement',
        function () {
            var value = $(this).siblings('.value');
            value.text(
                decrement(value.text(), 12, 1, 2)
            );
        }
    );
    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.minute .increment',
        function () {
            var value = $(this).siblings('.value');
            value.text(
                increment(value.text(), 59, 0, 2)
            );
        }
    );
    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.minute .decrement',
        function () {
            var value = $(this).siblings('.value');
            value.text(
                decrement(value.text(), 59, 0, 2)
            );
        }
    );
    $('.timerangepicker-container').on(
        'click',
        '.timerangepicker-display.period .increment, .timerangepicker-display.period .decrement',
        function () {
            var value = $(this).siblings('.value');
            var next = value.text() == "PM" ? "AM" : "PM";
            value.text(next);

        }

    );
    // editable input start
    $('#editableHour').on('click',
        function(event) {
            $('#editableHour').attr('contenteditable', 'true');
        }
    );
    $('#editableToHour').on('click',
        function(event) {
            $('#editableToHour').attr('contenteditable', 'true');
        }
    );
    $('#editableMinute').on('click',
        function(event) {
            $('#editableMinute').attr('contenteditable', 'true');
        }
    );
    $('#editableToMinute').on('click',
        function(event) {
            $('#editableToMinute').attr('contenteditable', 'true');
        }
    );
    document.getElementById('editableHour').addEventListener("input", function(e) {
        let insertedValue = parseInt(e.target.innerText);
        if (insertedValue <= 12 && insertedValue > 0) {
            $('.timerangepicker-display.hour.from').css({ 'border': '1px solid black', 'max-width': '100%' });
            let currentValue = insertedValue;
            setTimeout(function() {
                if (currentValue >= 10) {
                    console.log('e', insertedValue)
                    $('#editableHour').text(insertedValue);
                } else {
                    $('#editableHour').text('0' + insertedValue);
                }
            }, 1000);
        } else {
            $('#editableHour').text('01');
            $('.timerangepicker-display.hour.from').css({ 'border': '1px solid red' });
        }
    }, false);
    document.getElementById('editableToHour').addEventListener("input", function(e) {
        let insertedValue = parseInt(e.target.innerText);
        if (insertedValue <= 12 && insertedValue > 0) {
            $('.timerangepicker-display.hour.to').css({ 'border': '1px solid black' });
            let currentValue = insertedValue;
            setTimeout(function() {
                if (currentValue >= 10) {
                    $('#editableToHour').text(insertedValue);
                } else {
                    $('#editableToHour').text('0' + insertedValue);
                }
            }, 1000);
        } else {
            $('#editableToHour').text('01');
            $('.timerangepicker-display.hour.to').css({ 'border': '1px solid red' });
        }
    }, false);
    document.getElementById('editableMinute').addEventListener("input", function(e) {
        let insertedValue = parseInt(e.target.innerText);
        console.log("input event fired", insertedValue);
        if (insertedValue <= 59) {
            $('.timerangepicker-display.minute.from').css({ 'border': '1px solid black' });
            let currentValue = insertedValue;
            setTimeout(function() {
                if (currentValue >= 10) {
                    console.log('e', insertedValue)
                    $('#editableMinute').text(insertedValue);
                } else {
                    $('#editableMinute').text('0' + insertedValue);
                }
            }, 1000);
        } else {
            $('#editableMinute').text('01');
            console.log('else part is working');
            $('.timerangepicker-display.minute.from').css({ 'border': '1px solid red' });
        }
    }, false);
    document.getElementById('editableToMinute').addEventListener("input", function(e) {
        let insertedValue = parseInt(e.target.innerText);
        console.log("input event fired", insertedValue);
        if (insertedValue <= 59) {
            $('.timerangepicker-display.minute.to').css({ 'border': '1px solid black' });
            let currentValue = insertedValue;
            setTimeout(function() {
                if (currentValue >= 10) {
                    console.log('e', insertedValue)
                    $('#editableToMinute').text(insertedValue);
                } else {
                    $('#editableToMinute').text('0' + insertedValue);
                }
            }, 1000);
        } else {
            $('#editableToMinute').text('01');
            console.log('else part is working');
            $('.timerangepicker-display.minute.to').css({ 'border': '1px solid red' });
        }
    }, false);

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
    times = 1
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

    var hr_name = histimerange.from.hour;
    var mi_name = histimerange.from.minute;
    var pe_name = histimerange.from.period;

    var hr = histimerange.from.hour;
    var mi = histimerange.from.minute;
    var pe = histimerange.from.period;

    var dash = '-';


    // from_HIStime = hr + dash + mi + dash + '00';
    var to_hr = histimerange.to.hour;
    var to_mi = histimerange.to.minute;
    var to_pe = histimerange.to.period;

    var to_hr_name = histimerange.to.hour;
    var to_mi_name = histimerange.to.minute;
    var to_pe_name = histimerange.to.period;
    // to_HIStime = to_hr + dash + to_mi + dash + '00';

    if (hr === '12') {
        hr = '00';
    }

    if (pe === 'PM') {
        hr = parseInt(hr, 10) + 12;
    }

    if (to_hr === '12') {
        to_hr = '00';
    }

    if (to_pe === 'PM') {
        to_hr = parseInt(to_hr, 10) + 12;
    }


    from_HIStime = hr + dash + mi + dash + '00';
    to_HIStime = to_hr + dash + to_mi + dash + '00';


    var name_from_time = hr_name + ':' + mi_name + pe_name
    var name_to_time = to_hr_name + ':' + to_mi_name + to_pe_name

    if(from_HIStime>to_HIStime){
        alert("Please Enter the Valid Time");

    }
    else if(from_HIStime === to_HIStime){
        alert("Please Enter the Valid Time");
    }
    else{


        document.getElementById("name_change").innerHTML = `${name_from_time} &nbsp;To&nbsp; ${name_to_time}`
        document.getElementById("timePicker_dash").style.display = 'none'

        daily_data(selectdate);
        exampleFunction(selectdate);
    }

    // console.log("final", from_HIStime)
    // console.log("fianal", to_HIStime)


    // document.getElementById("timePicker_dash").style.display = "none";
    // document.getElementById("selected_time").innerHTML = `<b>From - ${from_O_HIStime} &ensp;&ensp; To -  ${to_O_HIStime}</b>`
}
function set_range(range) {
    time_range = range
}
function get_range() {
    return time_range;
}