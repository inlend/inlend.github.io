//list of all projects, starting from top left and going around clockwise (navigation elements not included)
var prj = ['p1', 'p2', 'p3','p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18'];

var random = Math.random();
        //var current = (random<0.25) ? 1 : (random<0.5) ? 2 : (random<0.75) ? 4 : 9;
var current = 0;

open_prj(prj[current]);

prj.forEach(assign_prj);

function assign_prj(y) {
  document.getElementById(y).addEventListener("click", () => {
    current = prj.indexOf(y);
    open_prj(y);
  })
}

function open_prj(x) {
  document.getElementById("iframe").src='portfolio_projects/' + x + '.html';
  document.getElementById("textbox").innerHTML = description[current];
  deactivate_items();
  document.getElementById(x).classList.add("active");
}

function move_right() {
  current = (current+1)%prj.length;
  open_prj(prj[current]);
}

function move_left() {
  current = (current-1)%prj.length;
  if (current < 0) {
    current = prj.length-1;
  }
  open_prj(prj[current]);
}

function relaod() {
  document.getElementById("iframe").src='projects/home.html';
  deactivate_items();
}

        //make sure all other elements don't have active class enabled
function deactivate_items() {
  var items = document.getElementsByClassName('item');
  for (var i=0; i<items.length; i++) {
    items[i].classList.remove("active");
  }
}

/*______FÜR PORTFOLIO PRJEKTSEITEN (CURSER VERÄNDERUNG)*/ 

window.addEventListener("load", init);
      function init() {
        const frame = document.getElementById("project_body");
        const {width} = frame.getBoundingClientRect();
        const halfImgWidth = width / 2;
        frame.addEventListener("mousemove", function(e) {
          const xPos = e.pageX - frame.offsetLeft;
          this.classList.remove("cursor-prev", "cursor-next");
          if (xPos > halfImgWidth) {
            this.classList.add("cursor-next");
          } else {
            this.classList.add("cursor-prev");
          }
        });
      }