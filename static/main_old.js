// hari *******************************************************************************************************

// ****************************************************************************************************



function opentab(evt, tabName) {
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


function timerTick() {
    with (new Date()) {
        var h, m, s;

        h = 30 * ((getHours() % 12) + getMinutes() / 60);
        m = 6 * getMinutes();
        s = 6 * getSeconds();

        document.getElementById('h_pointer').setAttribute('transform', 'rotate(' + h + ', 50, 50)');
        document.getElementById('m_pointer').setAttribute('transform', 'rotate(' + m + ', 50, 50)');
        document.getElementById('s_pointer').setAttribute('transform', 'rotate(' + s + ', 50, 50)');

        setTimeout(timerTick, 1000);
    }
}





document.querySelector('button').addEventListener('click', function () {
    html2canvas(document.querySelector('.specific'), {
        onrendered: function (canvas) {
            // document.body.appendChild(canvas);
            return Canvas2Image.saveAsPNG(canvas);
        }
    });
});


function clk_data() {
    fetch("http://takvaviya.in:8001/coolpad/user/clock/").then(responsive => {
        return responsive.json();
    }).then(data => {
        var clock_data = data;
        var max_clk_value = Math.max(...clock_data)
        var min_clk_value = Math.min(...clock_data)
        var clk_band_value = max_clk_value / 3
        var clk_band_medium = clk_band_value + clk_band_value
        var clk_band_high = clk_band_value + clk_band_value + clk_band_value
        console.log(clk_band_value)
        console.log(clk_band_medium)
        console.log(clk_band_high)

        for (i = 0; i < data.length; i++) {
            document.getElementById('clk' + i).innerHTML = data[i]
            if (data[i] >= min_clk_value && data[i] <= clk_band_value) {
                document.getElementById('clk' + i).style.backgroundColor = "mediumaquamarine";
            }

            if (data[i] >= clk_band_value && data[i] <= clk_band_medium) {
                document.getElementById('clk' + i).style.backgroundColor = "goldenrod";
            }

            if (data[i] >= clk_band_medium && data[i] <= clk_band_high) {
                document.getElementById('clk' + i).style.backgroundColor = "indianred";
            }

        }
    });
}
clk_data();

// hari *******************************************************************************************************

// praveen *******************************************************************************************************


// Global Declartions

var current_date, start_date, end_date;

current_date = "2020-08-04"
start_date = "2020-08-03"
end_date = "2020-08-07"
//  current_date = moment().format('YYYY-MM-DD');
//  start_date = moment().startOf('isoWeek').format('YYYY-MM-DD');

//User status
function user_status() {
    fetch("http://takvaviya.in:8001/coolpad/user/device_status/")
        .then(response => response.json())
        .then(data => {
            console.log("timer", data);
            $("#user_status").empty();
            var i = 0;
            const innerdiv = Object.keys(data).map(item => {
                i = i + 1;
                // console.log(data[item].device_id)
                return `<div class="row_user_status">
        <div style="flex:1"><b>${i}</b></div>
        <div style="flex:1"><b>${data[item].user.charAt(0).toUpperCase() + data[item].user.slice(1)}</b></div>
        <div style="flex:3"><b>${data[item].device_id}</b></div>
        <div style='flex:1; color:#ca4a4a'><b>Off</b></div>
    </div>`
            }).join(" ");
            $("#user_status").append(innerdiv);
            // document.getElementById("user_status").innerHTML = innerdiv
        });
}

user_status();



// Live user data



function daily_live_user_tracker() {
    fetch('http://takvaviya.in:8001/coolpad/user/live_data/')
        .then(response => response.json())
        .then(data => {
            console.log("live", data);
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
            // document.getElementById("live_contact").innerHTML = innerdiv
        });
}

daily_live_user_tracker();
setInterval(function () { daily_live_user_tracker(); }, 10000);

//Top contact history

function daily_tracker_top_contacts(){
    fetch('http://takvaviya.in:8001/coolpad/user/user_pair/' + current_date).then(responsive => {
        return responsive.json();
    }).then(val => {
        $("#chart9").empty();
        // console.log("weekly dat",val)
        var top = Object.keys(val)
        // console.log("1111111111111111",Object.values(val))
        var options = {
            series: [{
                data: Object.values(val)
            }],
            chart: {
                type: 'bar',
                height: 200,
            },
            grid: {
                show: false
            },
            xaxis: {
                categories: Object.keys(val),
                labels: {
                    show: true,
                    style: {
                        colors: ' #fff',
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
                        colors: "#fff",
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
    });
}
daily_tracker_top_contacts();


//total number of contact

//total number of contact
function daily_tracker_total_contact() {
    fetch('http://takvaviya.in:8001/coolpad/user/total_number/' + current_date)
        .then(response => response.json())
        .then(data => {
            document.getElementById("totalnocontact").innerHTML=`<b style="font-size:50px;">${data}</b>`
         });
}

daily_tracker_total_contact();


//contact history all
function daily_tracker_contact_history() {

    fetch('http://takvaviya.in:8001/coolpad/user/contact_history/' + current_date)
        .then(response => response.json())
        .then(data => {
            // console.log("his", data)
            $("#contact_history").empty();
            var i = 0;
            const innerdiv = Object.keys(data).map(item => {
                i = i + 1;
                // console.log("his", data[item])
                return `
            <div class="row_user_status">
            <div style="flex:1"><b>${i}</b></div>
            <div style="flex:2;"><b>${item}</b></div>
            <div style='flex:1;'><b>${data[item]}</b></div>
        </div>`
            }).join(" ");

            $("#contact_history").append(innerdiv);
            // document.getElementById("contact_history").innerHTML = innerdiv
        });
}

daily_tracker_contact_history();

// Contact Frequency matrix with teams


function loadFreq(option) {
    console.log("sel", option);
    fetch('http://takvaviya.in:8001/coolpad/user/team_freq/' + current_date)
        .then(response => response.json())
        .then(data => {
            dataa = data[option]
            console.log("dataq", dataa);
            const rowLen = Object.keys(dataa).length;
            var i=0
            console.log("fsahflk",Object.keys(dataa).length)
            $("#contact_frequency").empty();
            const outerdiv =` <tr style="height: 50px;">
              <td style="color:white"><b>User</b></td> ` +
            Object.keys(dataa).map(item => {
              i =i+1
                if(rowLen === i){
                    // console.log("enter")
                    return `<td style="color:white"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>`+
                    `<td style="color:white"><b>Others</b></td>`
                }
                else{
                    return `<td style="color:white"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>`;
                }
            }) .join(" ") + `</tr>`
            // return `<td style="color:white"><b>${item.toUpperCase()}</b></td>`;
            const innerdiv = Object.keys(dataa).map(item => {
                return `
             <tr style="height: 50px;">
             <td style="color:white"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td> ` +
                    Object.keys(dataa[item]).map(items => {
                        // console.log("iii", data[item][items])
                        if(dataa[item][items] > 0 ){
                            return `<td style="color: yellow;"><b>${dataa[item][items]}</b></td> `
                        }
                        return `<td ><b>${dataa[item][items]}</b></td> `
                        // return ` <td><b>${dataa[item][items]}</b></td> `
                    }).join(" ");
            }).join(" ");
            // document.getElementById("contact_frequency").innerHTML = outerdiv + innerdiv
            $("#contact_frequency").append(outerdiv + innerdiv);
        });
}

function daily_tracker_freq() {
    fetch('http://takvaviya.in:8001/coolpad/user/team_freq/' + current_date)
        .then(response => response.json())
        .then(data => {
            // console.log("ft", Object.keys(data));
            const innerdiv = Object.keys(data).map(item => {
                return `<option value='${item}'>${item.charAt(0).toUpperCase() + item.slice(1)}</option>`
            }).join("");
            document.getElementById("team_select").innerHTML = innerdiv
            // console.log("lll", Object.keys(data)[0])
            loadFreq(Object.keys(data)[0])
        });
}

daily_tracker_freq();

function getSelectValue() {
    var sel = document.getElementById('team_select').value;
    console.log("hello", sel);
    this.loadFreq(sel);
}

// Interval of 5 mins
setInterval(function () {
    user_status();
    daily_tracker_top_contacts();
        clk_chart();
    daily_tracker_total_contact();
    daily_tracker_contact_history();
    daily_tracker_freq();
    //TODO refresh clock
}, 300000);

300000


// Weekly Tracker

// Contact history all

function weekly_contact_history() {
    fetch('http://takvaviya.in:8001/coolpad/user/pairs_history_weekly/' + start_date + '/' + end_date)
        .then(response => response.json())
        .then(data => {
            // console.log("his", data)
            $("#contact_history_weekly").empty();
            var i = 0;
            const innerdiv = Object.keys(data).map(item => {
                i = i + 1;
                // console.log("his", data[item])
                return `  
            <div class="row_user_status">
            <div style="flex:1"><b>${i}</b></div>
            <div style="flex:2"><b>${item}</b></div>
            <div style='flex:1;'><b>${data[item]}</b></div>
        </div>`
            }).join(" ");
            // document.getElementById("contact_history_weekly").innerHTML = innerdiv
            $("#contact_history_weekly").append(innerdiv);
        });


}
weekly_contact_history();

//Top contact history
function weekly_top_contact() {
    fetch('http://takvaviya.in:8001/coolpad/user/pairs_weekly/' + start_date + '/' + end_date)
        .then(response => response.json())
        .then(data => {
            console.log("ss", Object.values(data));
            //chart 2
            $("#chart5").empty();
            var options = {
                series: [{
                    data: Object.values(data)
                }],
                chart: {
                    type: 'bar',
                    height: 400,
                },
                grid: {
                    show: false
                },
                xaxis: {
                    categories: Object.keys(data),
                    labels: {
                        show: true,
                        style: {
                            colors: ' #fff',
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
                            colors: "#fff",
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
        });
}
weekly_top_contact();


//total number of contact

function weekly_total_number() {
    fetch('http://takvaviya.in:8001/coolpad/user/total_number_weekly/' + start_date + '/' + end_date)
        .then(response => response.json())
        .then(data => {

            $("#chart6").empty();
            var options_two = {
                series: [data],
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '60%',
                        },
                        dataLabels: {
                            showOn: "always",
                            name: {
                                offsetY: -10,
                                show: true,
                                color: "#7AC7F9",
                                fontSize: "22px"
                            },
                            value: {
                                color: "#ffffff",
                                fontSize: "30px",
                                show: true,
                                formatter: function (val) {
                                    return val
                                }
                            }
                        }
                    },
                },
                labels: ['Total'],
            };
            var chart3 = new ApexCharts(document.querySelector("#chart6"), options_two);
            chart3.render();
        });
}

weekly_total_number();

// Contact Frequency matrix with teams
function loadFreqWeekly(option) {
    console.log("sellll", option);
    fetch('http://takvaviya.in:8001/coolpad/user/frequency_weekly/' + start_date + '/' + end_date)
        .then(response => response.json())
        .then(data => {
            dataa = data[option]
            var rowlen1 = Object.keys(dataa).length;
            var n=0;
            $("#contact_frequency_weekly").empty();
            console.log("dataq", dataa);
            const outerdiv =
                ` <tr style="height: 50px;">
              <td style="color:white"><b>User</b></td> ` +
                Object.keys(dataa).map(item => {
                    n =n+1
                    if(rowlen1 === n){
                        // console.log("enter")
                        return `<td style="color:white"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>`+
                        `<td style="color:white"><b>Others</b></td>`
                    }
                    else{
                        return `<td style="color:white"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td>`;
                    }
                    //  return `<td style="color:white"><b>${item.toUpperCase()}</b></td>`
                     }).join(" ") + `</tr>`
            const innerdiv = Object.keys(dataa).map(item => {
                return `
             <tr style="height: 50px;">
             <td style="color:white"><b>${item.charAt(0).toUpperCase() + item.slice(1)}</b></td> ` +
                    Object.keys(dataa[item]).map(items => {
                        // console.log("iii", dataa[item][items])
                        if(dataa[item][items] > 0 ){
                            return `<td style="color: yellow;"><b>${dataa[item][items]}</b></td> `
                        }
                        return `<td ><b>${dataa[item][items]}</b></td> `
                    }).join(" ");
            }).join(" ");
            // document.getElementById("contact_frequency_weekly").innerHTML = outerdiv + innerdiv
            $("#contact_frequency_weekly").append(outerdiv + innerdiv);
        });
}

function weekly_tracker_freq() {
    fetch('http://takvaviya.in:8001/coolpad/user/frequency_weekly/' + start_date + '/' + end_date)
        .then(response => response.json())
        .then(data => {
            // console.log("ft", Object.keys(data));
            const innerdiv = Object.keys(data).map(item => {
                return `<option value='${item}'>${item.charAt(0).toUpperCase() + item.slice(1)}</option>`
            }).join("");
            document.getElementById("team_select_weekly").innerHTML = innerdiv
            // console.log("lll", Object.keys(data)[0])
            loadFreqWeekly(Object.keys(data)[0])
        });
}

function getSelectValueweekly() {
    var sel = document.getElementById('team_select_weekly').value;
    console.log("hello", sel);
    this.loadFreqWeekly(sel);
}

weekly_tracker_freq();

// Weeklt team tracker
function weekly_team_tracker() {
    fetch('http://takvaviya.in:8001/coolpad/user/weekly_team_tracker/' + start_date + '/' + end_date)
        .then(response => response.json())
        .then(data => {
            console.log("tdata", data)
            var la ;
            var laa = []
            la = Object.keys(data).map(item => {
                // la.append(item)
               laa.push(item.charAt(0).toUpperCase() + item.slice(1))
            })
            $("#chart7").empty();
            var options = {
                series: [{
                    data: Object.values(data)
                }],
                chart: {
                    type: 'bar',
                    height: 350
                },
                grid: {
                    show: false
                },
                xaxis: {
                    categories: laa,
                    labels: {
                        show: true,
                        style: {
                            colors: "#fff",
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

            var chart = new ApexCharts(document.querySelector("#chart7"), options);
            chart.render();



        });

}

weekly_team_tracker();

setInterval(function () {
    weekly_contact_history();
    weekly_top_contact();
    weekly_team_tracker();
    weekly_tracker_freq();
    weekly_total_number();
    weekly_total_number();
    weekly_clk();

    //TODO refresh clock
}, 1000 * 60 * 60);




// praveen *******************************************************************************************************
clk_chart()
;function clk_chart(){
    // var am_data=[]
    // var pm_data=[]
    fetch('http://takvaviya.in:8001/coolpad/user/clock/').then(responsive => {
        return responsive.json();
    }).then(data => {
        // am_data=data.slice(0,12)
        // pm_data=data.slice(12,24)
        // console.log(am_data)
                    $("#chart10").empty();
var options = {
    series: [{
    name: 'AM',
    data: data.slice(0,12)
  }, {
    name: 'PM',
    data: data.slice(12,24)
  }],
    grid:{
        show:false
  },
    chart: {
    height: 350,
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
    categories: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
    labels: {
        show: true,
        style: {
            colors: ["#888ea8"],
            fontSize: '14px',
        }
    },
},
  tooltip: {
    x: {
      format:'string'
        },
  },
  };
  var chart = new ApexCharts(document.querySelector("#chart10"), options);
  chart.render();
})
}

/*Weekly */
function weekly_total_number() {
    fetch('http://takvaviya.in:8001/coolpad/user/total_number_weekly/' + start_date + '/' + end_date)
        .then(response => response.json())
        .then(data => {
            document.getElementById("totalnocontact_weekly").innerHTML=`<b style="font-size:50px;">${data}</b>`
        });
}
weekly_total_number();
function weekly_clk(){
    fetch('http://takvaviya.in:8001/coolpad/user/clock_weekly/2020-08-03').then(responsive => {
        return responsive.json();
    }).then(data => {
                     $("#chart11").empty();
    var options = {
        series: [{
          name: "Contacts",
          data: Object.values(data)
      }],
        chart: {
        height: 350,
        type: 'line',
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
        show:false
      },
      xaxis: {
        categories: ['MON','TUE','WED','THU','FRI'],
      }
      };
      var chart = new ApexCharts(document.querySelector("#chart11"), options);
      chart.render();
    })
}
weekly_clk();










