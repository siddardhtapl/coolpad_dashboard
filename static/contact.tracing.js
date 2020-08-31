// var contactTracingData;
// var contactGraph;
// var immediateContacts;
// var currentEmpLabel;
// var imagesLoaded = 0;
// //Get Data from Api
// function getContactTracingData() {
//   let emp = 'emp 2';
//   let startDate = '2020-08-03';
//   let endDate = '2020-08-07'
//   fetch(`https://takvaviya.in/coolpad_backend/user/contact_trace/${emp}/${startDate}/${endDate}`).then(
//     response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Request failed!');
//     }, networkError => {
//       document.getElementById("contact-graph").innerHTML = `${networkError.message}`;
//     }).then(function (responseJson) {
//       contactTracingData = responseJson;
//       getGraphData(contactTracingData[0]);
//     });
// }
// getContactTracingData();

// //Custom Node Image Rendering
// sigma.utils.pkg('sigma.canvas.nodes');
// sigma.canvas.nodes.image = (function () {
//   var _cache = {},
//     _loading = {},
//     _callbacks = {};

//   // Return the renderer itself:
//   var renderer = function (node, context, settings) {
//     var args = arguments,
//       prefix = settings('prefix') || '',
//       size = node[prefix + 'size'],
//       color = node.color || settings('defaultNodeColor'),
//       url = node.url;

//     if (_cache[url]) {
//       context.save();

//       // Draw the clipping disc:
//       context.beginPath();
//       context.arc(
//         node[prefix + 'x'],
//         node[prefix + 'y'],
//         node[prefix + 'size'],
//         0,
//         Math.PI * 2,
//         true
//       );
//       context.closePath();
//       context.clip();

//       // Draw the image
//       context.drawImage(
//         _cache[url],
//         node[prefix + 'x'] - size,
//         node[prefix + 'y'] - size,
//         2 * size,
//         2 * size
//       );

//       // Quit the "clipping mode":
//       context.restore();

//       // Draw the border:
//       context.beginPath();
//       context.arc(
//         node[prefix + 'x'],
//         node[prefix + 'y'],
//         node[prefix + 'size'],
//         0,
//         Math.PI * 2,
//         true
//       );
//       context.lineWidth = size / 5;
//       context.strokeStyle = node.color || settings('defaultNodeColor');
//       context.stroke();
//     } else {
//       sigma.canvas.nodes.image.cache(url);
//       sigma.canvas.nodes.def.apply(
//         sigma.canvas.nodes,
//         args
//       );
//     }
//   };

//   // Let's add a public method to cache images, to make it possible to
//   // preload images before the initial rendering:
//   renderer.cache = function (url, callback) {
//     if (callback)
//       _callbacks[url] = callback;

//     if (_loading[url])
//       return;

//     var img = new Image();

//     img.onload = function () {
//       _loading[url] = false;
//       _cache[url] = img;

//       if (_callbacks[url]) {
//         _callbacks[url].call(this, img);
//         delete _callbacks[url];
//       }
//     };

//     _loading[url] = true;
//     img.src = url;
//   };

//   return renderer;
// })();

// var imageUrls = [
//   './maleIcon.png',
//   './femaleIcon.png',
// ]

// // Create a graph object
// var graph = {
//   nodes: [

//   ],
//   edges: [
//   ]
// }

// //Extracting Direct Contacts of Searched Employee
// function getGraphData(currentEmp) {
//   currentEmpLabel = Object.keys(currentEmp)[0];
//   graph.nodes.push({ id: `${currentEmpLabel}`, label: `${currentEmpLabel}`, x: 0, y: 0, type: 'image', url: imageUrls[Math.floor(Math.random() * imageUrls.length)], size: 30 },)
//   immediateContacts = currentEmp[Object.keys(currentEmp)[0]];
//   let numContacts = Object.keys(immediateContacts).length;
//   let i = 1, j = 1;
//   for (const contact in immediateContacts) {
//     let count = immediateContacts[contact].count;
//     let circular_x = 100 * Math.cos((Math.PI * 2 * i++) / numContacts);
//     let circular_y = 100 * Math.sin((Math.PI * 2 * j++) / numContacts);
//     let contactTime = getMinutes(immediateContacts[contact].max_duration);
//     graph.nodes.push({ id: `${contact}`, label: `${contact}`, x: circular_x, y: circular_y, size: 20, type: 'image', url: imageUrls[Math.floor(Math.random() * imageUrls.length)] });

//     graph.edges.push({ id: `${contact}`, source: `${currentEmpLabel}`, target: `${contact}`, color: '#fff', type: 'arrow', size: 10 })

//   }

//   function getMinutes(time) {
//     let timeArray = time.split(':');
//     let minutes = (+timeArray[0]) * 60 + (+timeArray[1]);
//     return minutes;
//   }


//   // Then, wait for all images to be loaded before instanciating sigma:
//   imageUrls.forEach(function (url) {
//     sigma.canvas.nodes.image.cache(
//       url,
//       function () {
//         if (++imagesLoaded === imageUrls.length)
//           // Instantiate sigma:
//           renderContactGraph(graph);
//       }
//     );
//   });


// }

// // Initialise sigma:
// var contactGraph = new sigma(
//   {
//     renderer: {
//       container: document.getElementById('contact-graph'),
//       type: 'canvas'
//     },
//     settings: {
//       minEdgeSize: 0.1,
//       maxEdgeSize: 3,
//       minNodeSize: 1,
//       maxNodeSize: 50,
//       defaultNodeColor: '#008cc2',
//       defaultEdgeColor: '#fff',
//       defaultLabelColor: '#fff',
//       font: "calibri",
//       defaultLabelSize: 25,
//       labelSize: "fixed",
//       boderSize: 1,
//       labelThreshold: 0,
//       doubleClickZoomingRatio: 1.5,
//     }
//   }
// );

// function renderContactGraph(graph) {
//   // Load the graph in sigma
//   contactGraph.graph.clear();
//   contactGraph.graph.read(graph);
//   // Ask sigma to draw it
//   forceAtlasGraph();
// }
// //Node Distribution Plugin
// function forceAtlasGraph() {
//   contactGraph.startForceAtlas2({ worker: true, barnesHutOptimize: false, startingIterations: 100000, iterationsPerRender: 100000 });
//   setTimeout(function () { contactGraph.stopForceAtlas2(); }, 1000);
// }

// //Label on Hover
// function renderLabel(node) {
//   if (immediateContacts.hasOwnProperty(node.label)) {
//     let contactGraph = document.getElementById('contact-graph');
//     let labelDiv = document.createElement('div');
//     let label = node.label;
//     labelDiv.classList = ['contact-label'];
//     labelDiv.id = `${node.label}`;
//     let innerHtml = `<div id="contact-label">
//                       <p><i class="fa fa-users" aria-hidden="true"></i> : ${immediateContacts[label].count}</p>
//                       <p><i class="fa fa-hourglass" aria-hidden="true"></i> : ${immediateContacts[label].max_duration}</p>
//                       </div>`
//     labelDiv.innerHTML = innerHtml;

//     let left = node['renderer1:x'];
//     let top = node['renderer1:y'];
//     let height = 100;
//     let width = 100;
//     labelDiv.style.position = 'absolute';
//     labelDiv.style.top = (top - (height / 2)) + 35 + 'px';
//     labelDiv.style.left = left - 30 - width + 'px';
//     contactGraph.appendChild(labelDiv);
//   }

// }

// //Second Level Contacts
// function getSubContacts(node) {
//   let nodeLabel = node.label;
//   let subContactsArray = contactTracingData[1];
//   let clickedEmp;
//   for (const emp in subContactsArray) {
//     if (subContactsArray[emp].hasOwnProperty(nodeLabel)) {
//       clickedEmp = subContactsArray[emp];
//       renderSubContacts(clickedEmp, nodeLabel, node);
//       break;
//     }
//   }
// }
// function renderSubContacts(clickedEmp, nodeLabel, node) {
//   removeSubContacts();
//   let contacts = clickedEmp[nodeLabel];
//   let existingNodes = contactGraph.graph.nodes().map(node => node.label);
//   let ClickedNode_X = node.x;
//   let ClickedNode_Y = node.y;
//   let i = 1;
//   let j = 1;
//   let numContacts = Object.keys(contacts).length;
//   for (const contact in contacts) {
//     if (contact !== currentEmpLabel) {
//       if (existingNodes.includes(contact)) {
//         contactGraph.graph.addEdge({ id: `${nodeLabel}to${contact}`, source: `${nodeLabel}`, target: `${contact}`, color: '#20c997', type: 'arrow', size: 10 })
//       }
//       else {
//         let parentDiv = document.getElementById('contact-graph')
//         let circular_x = -3 * Math.cos(Math.PI * 1 * i++ / numContacts);
//         let circular_y = -3 * Math.sin(Math.PI * 1 * j++ / numContacts);
//         let parentHeight = parentDiv.clientHeight;
//         let parentWidth = parentDiv.clientWidth;
//         contactGraph.graph.addNode({ id: `${nodeLabel}to${contact}`, label: `${contact}`, x: (circular_x + ClickedNode_X), y: (circular_y + ClickedNode_Y), size: 15, type: 'image', url: imageUrls[Math.floor(Math.random() * imageUrls.length)] })
//         contactGraph.graph.addEdge({ id: `${nodeLabel}to${contact}`, source: `${nodeLabel}`, target: `${nodeLabel}to${contact}`, color: '#20c997', type: 'arrow', size: 10 })
//       }
//     }
//   }

//   forceAtlasGraph();

//   contactGraph.cameras[0].goTo(
//     {
//       x: node.x,
//       y: node.y,
//       ratio: 1.1,
//       angle: 5
//     }
//   )
// }

// function removeSubContacts() {
//   let existingSubNodes = contactGraph.graph.nodes().filter(node => node.id.indexOf('to') > 0);
//   existingSubNodes.map(node => contactGraph.graph.dropNode(node.id));

//   let existingSubEdges = contactGraph.graph.edges().filter(edge => edge.id.indexOf('to') > 0);
//   existingSubEdges.map(edge => contactGraph.graph.dropEdge(edge.id));
//   contactGraph.refresh();
// }

// //On Hover Show Labels
// contactGraph.bind('overNode', function (e) {
//   overNode = e.data.node;
//   renderLabel(overNode);
// });
// contactGraph.bind('outNode', function (e) {
//   let nodeLabel = document.getElementById(e.data.node.label);
//   if (nodeLabel) {
//     nodeLabel.parentNode.removeChild(nodeLabel);
//   }
// });

// //On Click Show Second Level Contacts
// contactGraph.bind('clickNode', function (e) {
//   if (e.data.node.label === currentEmpLabel) {
//     removeSubContacts();
//   } else {
//     getSubContacts(e.data.node);
//     let nodeLabel = document.getElementById(e.data.node.label);
//     if (nodeLabel) {
//       nodeLabel.parentNode.removeChild(nodeLabel);
//     }
//   }
// });

// contactGraph.bind('rightClickNode', function (e) {
//   removeSubContacts()
// });

// // To enable node dragging
// var dragListener = sigma.plugins.dragNodes(contactGraph, contactGraph.renderers[0]);

var contactTracingData;
var contactGraph;
var immediateContacts;
var currentEmpLabel;
var imagesLoaded = 0;
var defaultNodeColor = '#68BB59';
var defaultEdgeColor = '#fff';
var subContactNodeColor = '#20c997';
var subContactEdgeColor = '#20c997';
//Get Data from Api
function getContactTracingData(e, s_date, e_date) {
  let emp = e;
  let startDate = s_date;
  let endDate = e_date;
  if (emp && startDate && endDate) {
    fetch(`https://takvaviya.in/coolpad_backend/user/contact_trace/${emp}/${startDate}/${endDate}`).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        document.getElementById("contact-graph").innerHTML = `${networkError.message}`;
      }).then(function (responseJson) {
        if(window.scrollY<200)
        window.scroll({
          top: 300,
          left: 0,
          behavior: 'smooth'
            });
        contactTracingData = responseJson;
        getGraphData(contactTracingData[0]);
      });
  }
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
  '../../static/assets/img/maleIcon.png',
  '../../static/assets/img/femaleIcon.png',
]
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
  currentEmpLabel = Object.keys(currentEmp)[0];
  immediateContacts = currentEmp[Object.keys(currentEmp)[0]];
  numContacts = Object.keys(immediateContacts).length;
  graph.nodes.push({ id: `${currentEmpLabel}`, label: `${currentEmpLabel}`, x: 0, y: 0, type: 'image', url: imageUrls[Math.floor(Math.random() * imageUrls.length)], size: 100/numContacts, color:'#008cc2'},)
  let i = 1, j = 1;
  for (const contact in immediateContacts) {
    let count = immediateContacts[contact].count;
    let circular_x = Math.cos((Math.PI * 2 * i++) / numContacts);
    let circular_y = Math.sin((Math.PI * 2 * j++) / numContacts);
    let contactTime = getMinutes(immediateContacts[contact].max_duration);
    let nodeColor = '';
    if(contactTime >= 30) {
      nodeColor = '#FF4500'
    }
    else if(contactTime >= 10) {
      nodeColor = '#ffff00'
    }
    graph.nodes.push({ id: `${contact}`, label: `${contact}`, x: circular_x, y: circular_y, size: 70/numContacts, type: 'image', color: nodeColor, url: imageUrls[Math.floor(Math.random() * imageUrls.length)] });
    graph.edges.push({ id: `${contact}`, source: `${currentEmpLabel}`, target: `${contact}`, color: '#fff', type: 'arrow', size: 10 })
  }
  function getMinutes(time) {
    let timeArray = time.split(':');
    let minutes = (+timeArray[0]) * 60 + (+timeArray[1]);
    return minutes;
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
}
// Initialise sigma:
var contactGraph = new sigma(
  {
    renderer: {
      container: document.getElementById('contact-graph'),
      type: 'canvas'
    },
    settings: {
      minEdgeSize: 0.1,
      maxEdgeSize: 3,
      minNodeSize: 10,
      maxNodeSize: 50,
      defaultNodeColor: defaultNodeColor,
      defaultEdgeColor: defaultEdgeColor,
      defaultLabelColor: '#718093',
      font: "calibri",
      defaultLabelSize: 25,
      labelSize: "fixed",
      boderSize: 1,
      labelThreshold: 0,
      doubleClickZoomingRatio: 1.5,
    }
  }
);
function renderContactGraph(graph) {
  // Load the graph in sigma
  contactGraph.graph.clear();
  contactGraph.graph.read(graph);
  // Ask sigma to draw it
  forceAtlasGraph();
}
//Node Distribution Plugin
function forceAtlasGraph() {
  contactGraph.startForceAtlas2({ worker: true, barnesHutOptimize: false, startingIterations: 10000, iterationsPerRender: 100000, gravity: 0 });
  setTimeout(function () { contactGraph.stopForceAtlas2(); }, 1000);
}
//Label on Hover
function renderLabel(node) {
  if (immediateContacts.hasOwnProperty(node.label)) {
    let contactGraph = document.getElementById('contact-graph');
    let labelDiv = document.createElement('div');
    let label = node.label;
    labelDiv.classList = ['contact-label'];
    labelDiv.id = `${node.label}`;
    let innerHtml = `<div id="contact-label">
                      <p><i class="fa fa-users" aria-hidden="true"></i> : ${immediateContacts[label].count}</p>
                      <p><i class="fa fa-hourglass" aria-hidden="true"></i> : ${immediateContacts[label].max_duration}</p>
                      </div>`
    labelDiv.innerHTML = innerHtml;
    let left = node['renderer1:x'];
    let top = node['renderer1:y'];
    let height = 100;
    let width = 100;
    labelDiv.style.position = 'absolute';
    labelDiv.style.top = (top - (height / 2)) + 35 + 'px';
    labelDiv.style.left = left - 30 - width + 'px';
    contactGraph.appendChild(labelDiv);
  }
}
//Second Level Contacts
function getSubContacts(node) {
  let nodeLabel = node.label;
  let subContactsArray = contactTracingData[1];
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
  let existingNodes = contactGraph.graph.nodes().map(node => node.label);
  let ClickedNode_X = node.x;
  let ClickedNode_Y = node.y;
  let i = 1;
  let j = 1;
  let numContacts = Object.keys(contacts).length;
  for (const contact in contacts) {
    if (contact !== currentEmpLabel) {
      if (existingNodes.includes(contact)) {
        contactGraph.graph.addEdge({ id: `${nodeLabel}to${contact}`, source: `${nodeLabel}`, target: `${contact}`, color: subContactEdgeColor, type: 'arrow', size: 10 })
      }
      else {
        let parentDiv = document.getElementById('contact-graph')
        let circular_x = -3 * Math.cos(Math.PI * 1 * i++ / numContacts);
        let circular_y = -3 * Math.sin(Math.PI * 1 * j++ / numContacts);
        let parentHeight = parentDiv.clientHeight;
        let parentWidth = parentDiv.clientWidth;
        contactGraph.graph.addNode({ id: `${nodeLabel}to${contact}`, label: `${contact}`, x: (circular_x + ClickedNode_X), y: (circular_y + ClickedNode_Y), size: 15, color: subContactNodeColor, type: 'image', url: imageUrls[Math.floor(Math.random() * imageUrls.length)] })
        contactGraph.graph.addEdge({ id: `${nodeLabel}to${contact}`, source: `${nodeLabel}`, target: `${nodeLabel}to${contact}`, color: subContactEdgeColor, type: 'arrow', size: 10 })
      }
    }
  }
  forceAtlasGraph();
  centerOnClickedNode(node);
}
function centerOnClickedNode(node) {
  contactGraph.cameras[0].goTo(
    {
      x: node['read_cam0:x'],
      y: node['read_cam0:y'],
      ratio: 1.2,
      angle: 5
    }
  )
}
function removeSubContacts() {
  let existingSubNodes = contactGraph.graph.nodes().filter(node => node.id.indexOf('to') > 0);
  existingSubNodes.map(node => contactGraph.graph.dropNode(node.id));
  let existingSubEdges = contactGraph.graph.edges().filter(edge => edge.id.indexOf('to') > 0);
  existingSubEdges.map(edge => contactGraph.graph.dropEdge(edge.id));
  contactGraph.refresh();
}
//On Hover Show Labels
contactGraph.bind('overNode', function (e) {
  overNode = e.data.node;
  renderLabel(overNode);
});
contactGraph.bind('outNode', function (e) {
  let nodeLabel = document.getElementById(e.data.node.label);
  if (nodeLabel) {
    nodeLabel.parentNode.removeChild(nodeLabel);
  }
});
//On Click Show Second Level Contacts
contactGraph.bind('clickNode', function (e) {
  if (e.data.node.label === currentEmpLabel) {
    removeSubContacts();
    centerOnClickedNode(e.data.node);
  } else {
    getSubContacts(e.data.node);
    let nodeLabel = document.getElementById(e.data.node.label);
    if (nodeLabel) {
      nodeLabel.parentNode.removeChild(nodeLabel);
    }
  }
});
contactGraph.bind('rightClickNode', function (e) {
  removeSubContacts()
});
// To enable node dragging
var dragListener = sigma.plugins.dragNodes(contactGraph, contactGraph.renderers[0]);
