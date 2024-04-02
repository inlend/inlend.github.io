window.addEventListener("load", init);
function init() {
	const frame = document.body;
	//const frame = document.getElementById("project_body");
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
	document.addEventListener("click", function () {
		const xPos = event.clientX - frame.offsetLeft;
		if (xPos > halfImgWidth) {
			var message = "right";
			window.parent.postMessage(message, "*");
		} else {
			var message = "left";
			window.parent.postMessage(message, "*");
		}

	});

	addEventListener("wheel", (event) => {

		document.getElementById("loading-animation").style.display= "none";
	});
}