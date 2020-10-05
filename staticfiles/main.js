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
    fetch('https://takvaviya.in/coolpad_backend/user/userDeviceStatus/'+common4all)
        .then(response => response.json())
        .then(data => {
            dataa = Object.values(data)
            Object.values(data).map(item => {
                var bat = item['recent_heartbeat_event']['battery']
                bat = Math.round(bat / 10)
                if (bat) {
                    batery.push(bat)
                }
                else {
                    batery.push(bat)
                }
            })
            for (var i = 0; i < dataa.length; i++) {
                dataa[i]["battery"] = batery[i]
            }
            let undeletedUsers = dataa.filter(user => user.is_Deleted === "false");
            $('#user_status_table').DataTable({
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
    evt.currentTarget.className += " active";
}
/*function daily_live_user_tracker() {
    fetch('https://takvaviya.in/coolpad_backend/user/live_data' + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            // console.log("live", data);
            $("#live_contact").empty();
            var i = 0;
            const innerdiv = Object.keys(data).map(item => {
                i = i + 1;
                var st = data[item].local;
                var st1 = data[item].remote;
                // console.log(data[item].device_id)
                return `<div class="row_user_status">
        <div style="flex:1"><b>${i}</b></div>
        <div style="flex:2"><b>${st.charAt(0).toUpperCase() + st.slice(1)}</b></div>
        <div style="flex:2"><b>${st1.charAt(0).toUpperCase() + st1.slice(1)}</b></div>
        <div style="flex:2"><b>${data[item].duration}</b></div>
        <div style="flex:2"><b>${data[item].avgDist}</b></div>
        </div>`
            }).join(" ");
            $("#live_contact").append(innerdiv);
        });
}
daily_live_user_tracker();
setInterval(function () { daily_live_user_tracker(); }, 10000);*/

function daily_tracker_contact_history() {

    fetch('https://takvaviya.in/coolpad_backend/user/contact_history/' + current_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            $("#contact_history").empty();
            var i = 0;
            const innerdiv = Object.keys(data).map(item => {
                i = i + 1;
                return `
            <div class="row_user_status">
            <div style="flex:1"><b>${i}</b></div>
            <div style="flex:2;"><b>${item}</b></div>
            <div style='flex:1;'><b>${data[item]}</b></div>
        </div>`
            }).join(" ");
            $("#contact_history").append(innerdiv);
        });
}

daily_tracker_contact_history();


function loadFreq(option) {
    fetch('https://takvaviya.in/coolpad_backend/user/team_freq/' + current_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            dataa = data[option]
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
        });
}

function daily_tracker_freq() {
    fetch('https://takvaviya.in/coolpad_backend/user/team_freq/' + current_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            const innerdiv = Object.keys(data).map(item => {
                return `<option value='${item}'>${item.charAt(0).toUpperCase() + item.slice(1)}</option>`
            }).join("");
            document.getElementById("team_select").innerHTML = innerdiv
            loadFreq(Object.keys(data)[0])
        });
}

daily_tracker_freq();

function getSelectValue() {
    var sel = document.getElementById('team_select').value;
    // console.log("hello", sel);
    this.loadFreq(sel);
}
setInterval(function () {
    clk_chart();
    clk_chart_24();
    daily_tracker_total_contact();
    daily_tracker_contact_history();
    daily_tracker_freq();
    //TODO refresh clock
}, 300000);

function loadFreqWeekly(option) {
    // console.log("sellll", option);
    fetch('https://takvaviya.in/coolpad_backend/user/frequency_weekly/' + start_date + '/' + end_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            dataa = data[option]
            var rowlen1 = Object.keys(dataa).length;
            var n = 0;
            console.log(dataa)
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
        });
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
}, 1000 * 60 *60);

// elamparithi heat chart
var heatMapData;
var heatMapChart;
function getHeapMapData() {
    fetch('https://takvaviya.in/coolpad_backend/user/team_freq/' + current_date + '/' + common4all).then(
        response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            document.getElementById("chart30").innerHTML = `${networkError.message}`;
        }).then(function (responseJson) {
            heatMapData = responseJson;
            let teams = Object.keys(heatMapData);
            getDropDownOptions(teams);
            renderHeatMap(teams[0]);

        });
    function getDropDownOptions(teams) {
        if (heatMapData) {
            if(teams) {
            let dropDown = document.getElementById('teamDropDownButton');
            teams.forEach(team => {
                let dropDownItem = document.createElement('option');
                dropDownItem.id = `${team}`;
                dropDownItem.value = `${team}`;
                dropDownItem.innerHTML = `${team}`
                dropDown.append(dropDownItem);
            });
                document.getElementById('teamDropDownButton').value=teams[0];
            }
        }
    }
}
getHeapMapData();
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
                        colors: ' #888EA8',
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
                        colors: "#888EA8",
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
    fetch('https://takvaviya.in/coolpad_backend/user/frequency_weekly/' + start_date + '/' + end_date + '/' + common4all).then(
        response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            document.getElementById("heatMapChartWeekly").innerHTML = `${networkError.message}`;
        }).then(function (responseJson) {
            heatMapDataWeekly = responseJson;
            let teams = Object.keys(heatMapDataWeekly);
            getDropDownOptions(teams);
            renderHeatMapWeekly(teams[0])
        });
    function getDropDownOptions(teams) {
        if (heatMapDataWeekly) {
            if(teams)
            {
                let dropDown = document.getElementById('teamDropDownButtonWeek');
                teams.forEach(team => {
                    let dropDownItem = document.createElement('option');
                    dropDownItem.id = `${team}`;
                    dropDownItem.value = `${team}`;
                    dropDownItem.innerHTML = `${team}`
                    dropDown.append(dropDownItem);
                });
                document.getElementById('teamDropDownButtonWeek').value=teams[0];
            }
        }
    }
}
getHeapMapDataWeekly();
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
                        colors: ' #888EA8',
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
                        colors: "#888EA8",
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

    // console.log("hello");
    var user_instance = localStorage.getItem('current_user');
    // 'https://takvaviya.in/coolpad_backend/user/pdf_gen/' + user_instance + '/' + start_date + '/' + end_date + '/' + current_date + '/' + common4all
    fetch('https://www.takvaviya.in/coolpad_backend/user/daily_report/' + current_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".pdf");
            window.location.href = data.path + ".pdf"
        });
}



function rp_weekly() {

    //Todo not user instance its emp instance

    var user_instance = localStorage.getItem('current_user');
    fetch('https://www.takvaviya.in/coolpad_backend/user/weekly_report/' + start_date + '/' + end_date + '/' + current_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            // console.log(data.path+".pdf");
            window.location.href = data.path + ".pdf"
        });

}




function weekly_data() {
    var total_no_contact
    var week_team_track
    var contact_frequency_week
    var top5_contact_history_week
    var contact_history_all_weelk
    var daily_total_for_week

    fetch('https://takvaviya.in/coolpad_backend/user/weekly_tracker_get/'+start_date+'/'+end_date+'/'+common4all)
        .then(response => response.json())
        .then(
            data => {

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
                    // la.append(item)
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
                                colors: "#718093",
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
                                colors: '#718093',
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

                // end

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
                                colors: ' #888ea8',
                                fontSize: '8px',
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
                                colors: "#888ea8",
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
                var chart2 = new ApexCharts(document.querySelector("#chart5"), options);
                chart2.render();
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
                $('#contact_his_week').DataTable({
                    "retrieve": true,
                    "paging": true,
                    "searching": false,
                    "info": false,
                    "bLengthChange": false,
                    data: dataa_week, "columns": [{ "data": "pair" }, { "data": "count" }]
                });
                // end

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
                                colors: '#888ea8',
                            },
                        },
                    },

                    yaxis: {
                        labels: {
                            style: {
                                colors: '#888ea8',
                                // fontSize: '14px',
                            }

                        }
                    },
                };
                var chart = new ApexCharts(document.querySelector("#chart11"), options);
                chart.render();
                // end



                // contact_frequency_week

                const innerdiv = Object.keys(contact_frequency_week).map(item => {
                    return `<option value='${item}'>${item.charAt(0).toUpperCase() + item.slice(1)}</option>`
                }).join("");
                document.getElementById("team_select_weekly").innerHTML = innerdiv
                loadFreqWeekly(Object.keys(contact_frequency_week)[0])




            }
        )
}

weekly_data();


function daily_data() {
    fetch('https://takvaviya.in/coolpad_backend/user/daily_tracker_get/'+current_date+'/'+common4all)
        .then(response => response.json())
        .then(
            data => {
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
                                colors: ' #888ea8',
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
                                colors: "#888ea8",
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
                var chart = new ApexCharts(document.querySelector("#chart12"), options);
                chart.render();
                var am_data = []
                var co;
                if (localStorage.getItem("theme") == "dark") { co = 'white' }
                else { co = 'black' }
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
                for (var i = 0; i < keys_history.length; i++) {
                    if (values_history[i] != 0) {
                        obj_history[i] = { "pair": keys_history[i], "count": values_history[i] };
                    }
                }
                dataa_history = Object.values(obj_history)
                $('#contact_his').DataTable({
                    "searching": false,
                    "info": false,
                    "bLengthChange": false,
                    data: dataa_history, "columns": [{ "data": "pair" }, { "data": "count" }]
                });

            }
        )
}
daily_data();



function render(){
    fetch('https://takvaviya.in/coolpad_backend/user/team_freq/' + current_date + '/' + common4all)
        .then(response => response.json())
        .then(data => {
            daily_contact_freq = data[option]
})
}