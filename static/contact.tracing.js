var contactTracingData;
var contactGraph;
var immediateContacts;
var currentEmpLabel;
var imagesLoaded = 0;
var nodeSize;
var defaultNodeColor = '#68BB59';
var subContactNodeColor = '#20c997';
var subContactEdgeColor = '#20c997';

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

//Get Data from Api
function getContactTracingData(e, s_date, e_date) {
  if (!contactGraph) {
    initSigma();
  }
  removeContactLabel();
  removeL1Icons();
  let emp = e;
  let startDate = s_date;
  let endDate = e_date;
  if (emp && startDate && endDate) {
    fetch('https://takvaviya.in/coolpad_backend/user/contact_trace/'+emp+'/'+startDate+" "+default_currnt_param+ "/" + endDate +" "+default_currnt_param +"/" + common4all).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        document.getElementById("contact-graph").innerHTML = `${networkError.message}`;
      }).then(function (responseJson) {
        if (window.scrollY < 200)
          window.scroll({
            top: 500,
            left: 0,
            behavior: 'smooth'
          });
        contactTracingData = responseJson;
        if(contactTracingData[2].length > 0)
        {
          document.getElementById("contact-graph").style.display = "block";
          document.getElementById("contact-graph-zoomControl").style.display = "block";
          getGraphData(contactTracingData[1]);
          document.getElementById("contact-graph-noData").style.display = "none";
        }
        else
        {
          document.getElementById("contact-graph").style.display = "none";
          document.getElementById("contact-graph-zoomControl").style.display = "none";
          document.getElementById("contact-graph-noData").style.display = "block";
          contactTracingData = null
        }
        
      });
  }
}
function renderZoomContactGraph(zoomRatio) {
  sigma.utils.zoomTo(
    contactGraph.cameras[0],                        // cam
    0,   // x
    0,   // y
    zoomRatio,                         // ratio
    { 'duration': 1000 }          // animation
  )
}
//Custom Node Image Rendering
sigma.utils.pkg('sigma.canvas.nodes');
sigma.canvas.nodes.image = (function () {
  var _cache = {},
    _loading = {},
    _callbacks = {};

  // Return the renderer itself:
  var renderer = function (node, context, settings) {
    var args = arguments,
      prefix = settings('prefix') || '',
      size = node[prefix + 'size'],
      color = node.color || settings('defaultNodeColor'),
      url = node.url;

    if (_cache[url]) {
      context.save();

      // Draw the clipping disc:
      context.beginPath();
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        node[prefix + 'size'],
        0,
        Math.PI * 2,
        true
      );
      context.closePath();
      context.clip();

      // Draw the image
      context.drawImage(
        _cache[url],
        node[prefix + 'x'] - size,
        node[prefix + 'y'] - size,
        2 * size,
        2 * size
      );

      // Quit the "clipping mode":
      context.restore();

      // Draw the border:
      context.beginPath();
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        node[prefix + 'size'],
        0,
        Math.PI * 2,
        true
      );
      context.lineWidth = size / 5;
      context.strokeStyle = node.color || settings('defaultNodeColor');
      context.stroke();
    } else {
      sigma.canvas.nodes.image.cache(url);
      sigma.canvas.nodes.def.apply(
        sigma.canvas.nodes,
        args
      );
    }
  };

  // Let's add a public method to cache images, to make it possible to
  // preload images before the initial rendering:
  renderer.cache = function (url, callback) {
    if (callback)
      _callbacks[url] = callback;

    if (_loading[url])
      return;

    var img = new Image();

    img.onload = function () {
      _loading[url] = false;
      _cache[url] = img;

      if (_callbacks[url]) {
        _callbacks[url].call(this, img);
        delete _callbacks[url];
      }
    };

    _loading[url] = true;
    img.src = url;
  };

  return renderer;
})();

var imageUrls = [
  '../../static/assets/img/icon1.png',
  '../../static/assets/img/icon2.png',
  '../../static/assets/img/icon3.png',
  '../../static/assets/img/icon4.png',
  '../../static/assets/img/icon5.png',
  '../../static/assets/img/icon6.png',
  '../../static/assets/img/icon7.png',
  '../../static/assets/img/icon8.png',
  '../../static/assets/img/icon9.png',
  '../../static/assets/img/icon10.png',
]
var teamIconMap = {};
// Create a graph object
var graph = {
  nodes: [

  ],
  edges: [
  ]
}

//Extracting Direct Contacts of Searched Employee
function getGraphData(currentEmp) {
  graph.nodes = [];
  graph.edges = [];
  teamIconMap = {};
  currentEmpLabel = Object.keys(currentEmp)[0];
  immediateContacts = currentEmp[currentEmpLabel];
  numContacts = Object.keys(immediateContacts).length;
  nodeSize = 30 / numContacts;
  let searched_emp_team = contactTracingData[0]["searched_emp_team"]
  teamIconMap[searched_emp_team] = 0;
  graph.nodes.push({ id: `${currentEmpLabel}`, label: `${currentEmpLabel}`, x: 0, y: 0, type: 'image', url: imageUrls[0], size: nodeSize },);
  let teamLegendDiv = `<div><img src="${imageUrls[0]}" alt="teamicon" width="50" height="60">   ${searched_emp_team} </div>`;
  let i = 1, j = 1, teamCount = 1;

  for (const contact in immediateContacts) {
    let circular_x = Math.cos((Math.PI * 2 * i++) / (numContacts - Math.PI * 2));
    let circular_y = Math.sin((Math.PI * 2 * j++) / (numContacts - Math.PI * 2));

    if(!teamIconMap.hasOwnProperty(immediateContacts[contact].team))
    {
      teamIconMap[immediateContacts[contact].team] = teamCount;
      teamLegendDiv+=`<div><img src="${imageUrls[teamCount]}" alt="teamicon" width="50" height="60">   ${immediateContacts[contact].team} </div>`
      teamCount++;
    }
    graph.nodes.push({ id: `${contact}`, label: `${contact}`, x: circular_x, y: circular_y, size: nodeSize, type: 'image', url: imageUrls[teamIconMap[immediateContacts[contact].team]] });

    graph.edges.push({ id: `${contact}`, source: `${currentEmpLabel}`, target: `${contact}`, type: 'arrow', size: 5 })
  }

  if (imagesLoaded === imageUrls.length) {
    renderContactGraph(graph);
  }
  else {
    // Then, wait for all images to be loaded before instanciating sigma:
    imageUrls.forEach(function (url) {
      sigma.canvas.nodes.image.cache(
        url,
        function () {
          if (++imagesLoaded === imageUrls.length)
            // Instantiate sigma:
            renderContactGraph(graph);
        }
      );
    })
  };

  if(teamLegendDiv!=='')
  {
    document.getElementById('teamIcons').innerHTML = teamLegendDiv;
  }
}

function initSigma() {
  // Initialise sigma:
  contactGraph = new sigma(
    {
      renderer: {
        container: document.getElementById('contact-graph'),
        type: 'canvas'
      },
      settings: {
        minEdgeSize: 0.1,
        maxEdgeSize: 2,
        minNodeSize: 10,
        maxNodeSize: 30,
        defaultNodeColor: 'transparent',
        defaultEdgeColor: '#fff',
        edgeColor: 'default',
        defaultLabelColor: '#fff',
        font: "calibri",
        defaultLabelSize: 20,
        labelSize: "fixed",
        labelThreshold: 0,
        doubleClickZoomingRatio: 1.5,
        defaultLabelAlignment: 'bottom',
        zoomingRatio: 1,

        //hover properties
        defaultHoverLabelBGColor: 'transparent',
        defaultLabelHoverColor: 'transparent'

      }
    }
  );

  //On Click Show Second Level Contacts
  contactGraph.bind('clickNode', function (e) {
    removeSubContacts();
    if (e.data.node.id === currentEmpLabel) {
      centerOnClickedNode(e.data.node);
      removeContactLabel();
    } else {
      getSubContacts(e.data.node);
      renderLabel(e.data.node);
    }

  });

  contactGraph.bind('rightClickNode', function (e) {
    removeSubContacts();
    removeContactLabel();
  });

  // To enable node dragging
  //var dragListener = sigma.plugins.dragNodes(contactGraph, contactGraph.renderers[0]);

  changeNetworkmodelTheme(localStorage.getItem('theme'));
}
function changeNetworkmodelTheme(theme) {
  if(contactGraph) {
    if(theme === 'light') {
      contactGraph.settings(
        {
        defaultEdgeColor: '#000',
        defaultLabelColor: '#000'}
        )
      contactGraph.refresh();

     }
     else {
       contactGraph.settings(
         {
         defaultEdgeColor: '#fff',
         defaultLabelColor: '#fff'}
         )
       contactGraph.refresh();
     }
  }
}

function renderContactGraph(graph) {
  // Load the graph in sigma
  contactGraph.graph.clear();
  contactGraph.graph.read(graph);
  // Ask sigma to draw it
  forceAtlasGraph();
  document.getElementById('label-currentEmp').innerHTML = `${currentEmpLabel}`;
  document.getElementById('contact-graph-zoomControl').style.display = 'block';
}
//Node Distribution Plugin
function forceAtlasGraph() {
  contactGraph.startForceAtlas2({ worker:true, barnesHutOptimize: false, slowdown: 1000, startingIterations: 1000, iterationsPerRender: 1000, gravity: 0 });
  setTimeout(function () { contactGraph.stopForceAtlas2(); }, 1000);
  contactGraph.cameras[0].goTo(
    {
      x: 0,
      y: 0,
      ratio: 1.1,
      angle: 0
    });
}

//Label on Click
function renderLabel(node) {
  if (immediateContacts.hasOwnProperty(node.id)) {
    let labelDiv = document.getElementById('label-onclick');
    let label = node.id;
    let innerHtml = `<p style="font-size:20px; cursor: context-menu;">Contact Details</p><div id="contact-graph-label" class="layer1_card act"><p><i class="fa fa-calendar-o" aria-hidden="true"></i> ${moment(immediateContacts[label].Date.split("T")[0]).format("MM-DD-YYYY")}</p><h4  id="cd_title" value="emp 11">${label}</h4><br><div class="in_content mt-2"><span><i class="fa fa-users" aria-hidden="true"></i> Interaction ${immediateContacts[label].count}</span></div><div class="in_content mt-2"><span><i class="fa fa-clock-o" aria-hidden="true"></i> Max Duration ${immediateContacts[label].max_duration}</span></div></div>`
    labelDiv.innerHTML = innerHtml;
  }
}

//Second Level Contacts
function getSubContacts(node) {
  let nodeLabel = node.id;
  let subContactsArray = contactTracingData[2];
  let clickedEmp;
  for (const emp in subContactsArray) {
    if (subContactsArray[emp].hasOwnProperty(nodeLabel)) {
      clickedEmp = subContactsArray[emp];
      renderSubContacts(clickedEmp, nodeLabel, node);
      break;
    }
  }
}

function renderSubContacts(clickedEmp, nodeLabel, node) {
  removeSubContacts();
  let contacts = clickedEmp[nodeLabel];
  let existingNodes = contactGraph.graph.nodes().map(node => node.id);
  let ClickedNode_X = node.x;
  let ClickedNode_Y = node.y;
  let i = 1;
  let j = 1;
  let numContacts = Object.keys(contacts).length;
  let teamIconDiv = document.getElementById('teamIcons');
  let teamCount = teamIconDiv.childNodes.length;
  let l1Teams = [...document.getElementById('teamIcons').childNodes]
  l1Teams = l1Teams.map(team => team.textContent.trim());
  let teamIconDivL2 = document.createElement('div');
  teamIconDivL2.id="l2_teamIcons";
  teamIconDivL2.innerHTML = '';
  for (const contact in contacts) {
    if (contact !== currentEmpLabel) {
      if (existingNodes.includes(contact)) {
        contactGraph.graph.addEdge({ id: `${nodeLabel}to${contact}`, source: `${nodeLabel}`, target: `${contact}`, color: subContactEdgeColor, type: 'arrow', size: 10 })
      }
      else {
        let circular_x = -3 * Math.cos(Math.PI * i++ / (numContacts - Math.PI * 2));
        let circular_y = -3 * Math.sin(Math.PI * j++ / (numContacts - Math.PI * 2));
        let teamName = contacts[contact].team;

        if(!teamIconMap.hasOwnProperty(teamName))
        {
          teamCount++;
          teamIconMap[teamName] = teamCount;
        }
        contactGraph.graph.addNode({ id: `${nodeLabel}to${contact}`, label: `${contact}`, x: (circular_x + ClickedNode_X), y: (circular_y + ClickedNode_Y), size: nodeSize, type: 'image', url: imageUrls[teamIconMap[teamName]] });
        contactGraph.graph.addEdge({ id: `${nodeLabel}to${contact}`, source: `${nodeLabel}`, target: `${nodeLabel}to${contact}`, color: subContactEdgeColor, type: 'arrow', size: 10 });
        if(!l1Teams.includes(teamName))
        {
          teamIconDivL2.innerHTML+=`<div><img src="${imageUrls[teamIconMap[teamName]]}" alt="teamicon" width="50" height="60">  ${teamName}</div>`;
          l1Teams.push(teamName);
        }
      }
    }
  }

  forceAtlasGraph();
  centerOnClickedNode(node);
  teamIconDiv.appendChild(teamIconDivL2);
}

function centerOnClickedNode(node) {
  let moveX = node.x;
  let moveY = node.y;
  let zoomRatio = 1.4;
  let angle = 10;

  //if clicked on searced emp center on it and zoom in
  if (node.id === currentEmpLabel) {
    moveX = 0;
    moveY = 0;
    zoomRatio = 1.1;
    angle = 0;
  }
  contactGraph.cameras[0].goTo(
    {
      x: moveX,
      y: moveY,
      ratio: zoomRatio,
      angle: angle
    }
  )
}

function removeSubContacts() {
  let existingSubNodes = contactGraph.graph.nodes().filter(node => node.id.indexOf('to') > 0);
  existingSubNodes.map(node => contactGraph.graph.dropNode(node.id));

  let existingSubEdges = contactGraph.graph.edges().filter(edge => edge.id.indexOf('to') > 0);
  existingSubEdges.map(edge => contactGraph.graph.dropEdge(edge.id));
  contactGraph.refresh();
  removeL2Icons();
}

function removeContactLabel() {
  let labelDiv = document.getElementById('label-onclick');
  if (labelDiv) {
    labelDiv.innerHTML = '';
  }
  removeL2Icons();
}
function removeL1Icons() {
  document.getElementById('teamIcons').innerHTML = '';
}
function removeL2Icons() {
  let l2Icons = document.getElementById('l2_teamIcons');
  if(l2Icons) {
    l2Icons.parentNode.removeChild(l2Icons);
  }
}


//###########################

function getUserSelectDropdown() {
  fetch('https://takvaviya.in/coolpad_backend/user/userDeviceStatus'+ '/' + common4all)
      .then(response => response.json())
      .then(data => {
          let allUsers = Object.values(data);
          let unDeletedUsers = allUsers.filter(user => user.is_Deleted === 'false');
          let userNames = unDeletedUsers.map(user=> user.user);
          const innerdiv = userNames.map(userName => {
            // `<option value=''>select</option>`
             return  `<option value='${userName}'>${userName}</option>`
          }).join("");
          document.getElementById("render_emp_list").innerHTML = `<option value=''>select</option>`+innerdiv;
      });
}
getUserSelectDropdown()