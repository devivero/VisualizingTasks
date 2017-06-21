var tasks = []

/*var task = {
  "description": "",
  "difficulty": "",
  "person": ""
}*/
function drawList() {
  // Select #list-container element from HTML
  var parent = document.getElementById("list-container")
  // Clear out existing contents
  parent.innerHTML = ""
  // Create a <ul> node
  var ul = document.createElement("ul")
  for(var i =0; i<tasks.length; i++){
    // Create an <li> node
    var li = document.createElement("li")
    // Add the roof string to the li
    li.innerHTML = tasks[i].person + " will: " + tasks[i].description + " (" + tasks[i].difficulty + ")"
    // Append li to ul
    ul.appendChild(li)
  }
  // Append the ul to the #list-container
  parent.appendChild(ul)

  //draw google charts
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawStacked);
}
// Form submit handler
function addInfo(){
  event.preventDefault();
  var form = document.querySelector("form");
  // Create a new house object with form values (just one for right now)
  var newTask = {
    description: form.taskDesc.value,
    difficulty: document.getElementById('difficulty').value,
    person: form.person.value,
  }
  // Insert new task object into taskList array
  tasks.push(newTask)
  // Trigger printing the list to page
  drawList();
}

//Google chart funtion
function drawStacked() {

  let sijanE = 0;
  let sijanM = 0;
  let sijanH = 0;
  let alexE = 0;
  let alexM = 0;
  let alexH = 0;
  let chrisE = 0;
  let chrisM = 0;
  let chrisH = 0;

  for(var i =0; i<tasks.length; i++){
    //li.innerHTML = tasks[i].person + " will: " + tasks[i].description + " (" + tasks[i].difficulty + ")"
    if (tasks[i].person == "Sijan") {
      if (tasks[i].difficulty == "Easy"){
        sijanE ++;
      } else if (tasks[i].difficulty == "Medium") {
        sijanM ++;
      } else {
        sijanH ++;
      }
    } else if (tasks[i].person == "Alexander") {
      if (tasks[i].difficulty == "Easy"){
        alexE ++;
      } else if (tasks[i].difficulty == "Medium") {
        alexM ++;
      } else {
        alexH ++;
      }
    } else {
      if (tasks[i].difficulty == "Easy"){
        chrisE ++;
      } else if (tasks[i].difficulty == "Medium") {
        chrisM ++;
      } else {
        chrisH ++;
      }
    }
  }
      var data = google.visualization.arrayToDataTable([
        ['Difficulty', 'Easy', 'Medium', 'Hard'],
        ['Sijan', sijanE, sijanM, sijanH],
        ['Alexander', alexE, alexM, alexH],
        ['Christopher', chrisE, chrisM, chrisH]
      ]);

      var options = {
        title: 'Assigment of Tasks',
        chartArea: {width: '50%'},
        isStacked: true,
        hAxis: {
          title: 'Quantity of Tasks',
          minValue: 0,
        },
        vAxis: {
          title: 'Persons'
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById('chart-container'));
      chart.draw(data, options);
    }

window.onload = function(){


  var form = document.querySelector("form");
  form.onsubmit = addInfo;
  //Google Chart

}
