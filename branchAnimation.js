// Branch animations
var buttons = document.querySelectorAll(".button");
const cards = document.querySelectorAll(".card");
var cardDuration = 1000;

var fadeIn = [{ opacity: 0 }, { opacity: 1 }];

var fadeOut = [{ opacity: 1 }, { opacity: 0 }];
var options = {
	duration: 2000,
	fillMode: "both",
};

function eraseSubNode(subNodeClasses, subNodes, index, branchIndex, isPath) {
	var startIndex, endIndex;
	for (var i = 0, n = subNodes.length; i < n; i++) {
		if (subNodes[i].style.display == "block" && i != index) {
			var subNodeLength = subNodes[i].getTotalLength();
			subNodes[i].style.strokeDashoffset = subNodeLength * 2;

			// For animation to begin
			subNodes[i].style.strokeDashoffset = subNodeLength;

			// For branch to dissapear

			subNodes[i].style.strokeDashoffset = subNodeLength;
		}

		if (i == 0) {
			startIndex = 0;
			endIndex = nodeInfo[branchIndex][i].subNodes * 2;
		} else {
			endIndex = startIndex + nodeInfo[branchIndex][i].subNodes * 2;
		}

		for (var j = startIndex, m = endIndex; j < m; j++) {
			if (
				subNodeClasses[j].tagName == "circle" &&
				subNodeClasses[j].style.visibility == "visible" &&
				i != index
			) {
				console.log(i);
				var subNodeCircle = subNodeClasses[j];
				subNodeCircle.style.strokeDashoffset = circleLength * 2;

				// For animation to begin
				subNodeCircle.style.strokeDashoffset = circleLength;

				// For circle to dissapear
				subNodeCircle.style.strokeDashoffset = circleLength;
			} else if (
				subNodeClasses[j].tagName == "text" &&
				subNodeClasses[j].style.display == "block"
			) {
				var subNodeText = subNodeClasses[j];
				subNodeText.animate(fadeOut, options);
			}
		}
		startIndex = endIndex;
	}

	setTimeout(function () {
		for (var i = 0, n = subNodes.length; i < n; i++) {
			if (subNodes[i].style.display == "block" && i != index) {
				subNodes[i].style.display = "none";
			}
			if (i == 0) {
				startIndex = 0;
				endIndex = nodeInfo[branchIndex][i].subNodes * 2;
			} else {
				endIndex = startIndex + nodeInfo[branchIndex][i].subNodes * 2;
			}

			for (var j = startIndex, m = endIndex; j < m; j++) {
				if (
					subNodeClasses[j].tagName == "circle" &&
					subNodeClasses[j].style.visibility == "visible" &&
					i != index
				) {
					var subNodeCircle = subNodeClasses[j];
					subNodeCircle.style.visibility = "hidden";
				} else if (
					subNodeClasses[j].tagName == "text" &&
					subNodeClasses[j].style.display == "block" &&
					i != index
				) {
					var subNodeText = subNodeClasses[j];
					subNodeText.style.display = "none";
				}
			}
			startIndex = endIndex;
		}
	}, animationDuration);
}

const timeline = gsap.timeline({
	defaults: { duration: 0.4, ease: "power2.inOut" },
});

// Draw path for the corresponding branch as the button is pressed
function drawPath(index) {
	for (var i = 0; i < cards.length; i++) {
		if (i != index) {
			timeline.to(cards[i], { opacity: 0 });
		}
	}
	if (index == 0) {
		timeline.to(cards[index], { position: "relative", left: "0" });
		timeline.play();
	} else if (index == 1) {
		timeline.to(cards[index], { position: "relative", left: "-20%" });
		timeline.play();
	} else if (index == 2) {
		timeline.to(cards[index], { position: "relative", right: "45%" });
		timeline.play();
	} else if (index == 3) {
		timeline.to(cards[index], { position: "relative", right: "70%" });
		timeline.play();
	}

	var currBranch, currPath, currNodeClasses;

	setTimeout(function () {
		for (var i = 0; i < noBranch; i++) {
			// Get the svg element
			currBranch = branchDiv[i].firstChild;

			// Get the path for the main branch
			currPath = currBranch.querySelector(`.main-branch${i + 1}`);

			// Get the circle nodes for the main branch
			currNodeClasses = currBranch.querySelectorAll(".node");
			for (var j = 0, n = currNodeClasses.length; j < n; j++) {
				var currNode = currNodeClasses[j];
				if (
					currNode.tagName == "circle" &&
					currNode.style.visibility == "visible" &&
					currNode.style.display == "block" &&
					i != index
				) {
					currNode.style.strokeDashoffset = circleLength * 2;

					// This code is for the animation to begin
					currNode.style.strokeDashoffset = circleLength;

					// This is for the path to dissappear
					currNode.style.strokeDashoffset = circleLength;
				} else if (
					currNode.tagName == "text" &&
					currNode.style.display == "block" &&
					i != index
				) {
					currNode.animate(fadeOut, options);
				}
			}

			var pathLength = currPath.getTotalLength();
			if (currBranch.style.display == "block") {
				currPath.style.strokeDashoffset = pathLength * 2;

				// This code is for the animation to begin
				currPath.style.strokeDasharray = pathLength;

				// This is for the path to dissappear
				currPath.style.strokeDashoffset = pathLength;
			}
		}
		for (var i = 0; i < noBranch; i++) {
			// Get the svg element
			currBranch = branchDiv[i].firstChild;

			// Get the path for the main branch
			currPath = currBranch.querySelector(`.main-branch${i + 1}`);

			var subNodeIndex;
			if (i != index && currBranch.style.display == "block") {
				var subNodes = branchDiv[i].querySelectorAll(".subnode-branch");
				for (var j = 0, n = branchInfo[i].noNodes; j < n; j++) {
					console.log(subNodes[j], index, j, n);
					if (subNodes[j].style.visibility == "visible") {
						subNodeIndex = j;
						break;
					}
				}
				eraseSubNode(
					currBranch.querySelectorAll(".subnode"),
					subNodes,
					subNodeIndex,
					i,
					true
				);
			}
		}

		setTimeout(function () {
			for (var i = 0; i < noBranch; i++) {
				currBranch = branchDiv[i].firstChild;
				if (currBranch.style.display == "block" && i != index) {
					currBranch = branchDiv[i].firstChild;
					currBranch.style.display = "none";
				}
			}
		}, animationDuration);

		currBranch = branchDiv[index].firstChild;
		currBranch.style.display = "block";
		currPath = currBranch.querySelector(`.main-branch${index + 1}`);
		currPath.style.visibility = "visible";

		// Draw nodes for the corresponding branch
		currNodeClasses = currBranch.querySelectorAll(".node");

		// Timeout funciton used to set the aniamtions for the branches and the nodes
		setTimeout(function () {
			currPath.style.strokeDashoffset = 0;
			for (var i = 0, n = currNodeClasses.length; i < n; i++) {
				if (currNodeClasses[i].tagName == "circle") {
					var currCircle = currNodeClasses[i];

					currCircle.style.strokeDashoffset = 0;
					currCircle.style.visibility = "visible";
					currCircle.style.display = "block";
				} else {
					currNodeClasses[i].animate(fadeIn, options);
					currNodeClasses[i].style.display = "block";
				}
			}
		}, 0);
	}, 3000);
}

//Draw subnode path for the corresponding node as the node is presses
function drawSubNodePath(index, branchIndex) {
	var subNodes =
		branchDiv[branchIndex].firstChild.getElementsByClassName("subnode-branch");
	var subNodeClasses =
		branchDiv[branchIndex].firstChild.querySelectorAll(".subnode");

	eraseSubNode(subNodeClasses, subNodes, index, branchIndex, false);

	subNodes[index].style.display = "block";

	currSubNode = subNodes[index];

	setTimeout(function () {
		startIndex = 0;
		currSubNode.style.strokeDashoffset = 0;

		endIndex = nodeInfo[branchIndex][index].subNodes * 2;
		if (index == 0) {
			startIndex = 0;
			endIndex = nodeInfo[branchIndex][index].subNodes * 2;
		} else {
			for (var i = 0; i < index; i++) {
				startIndex += nodeInfo[branchIndex][i].subNodes * 2;
			}
			endIndex = startIndex + nodeInfo[branchIndex][index].subNodes * 2;
		}
		for (var i = startIndex, n = endIndex; i < n; i++) {
			if (subNodeClasses[i].tagName == "circle") {
				currCircle = subNodeClasses[i];
				currCircle.style.strokeDashoffset = 0;
				currCircle.style.visibility = "visible";
			} else if (subNodeClasses[i].tagName == "text") {
				currText = subNodeClasses[i];
				currText.animate(fadeIn, options);
				currText.style.display = "block";
			}
		}
	}, 0);
}

// Loop through every button to add the branch animation
for (var i = 0, n = buttons.length; i < n; i++) {
	currBranch = branchDiv[i].firstChild;
	var nodeClasses = currBranch.querySelectorAll(".node");
	var circleIndex = 0;
	//Loop through every node to add the subnode animation
	for (var j = 0, m = nodeClasses.length; j < m; j++) {
		if (nodeClasses[j].tagName == "circle") {
			nodeClasses[j].setAttribute(
				"onclick",
				`drawSubNodePath(${circleIndex}, ${i})`
			);
			circleIndex++;
		}
	}
	buttons[i].setAttribute("onclick", `drawPath(${i})`);
}

$(document).ready(function () {
	$(window).load(function () {
		$("head").append(
			'<link rel="stylesheet" href="onload-animation/animate.css" />'
		);
		var div = $(".onload");
		$(div).delay(6000);
		$(div).animate({ height: "toggle" }, 1000);
		setTimeout(function () {
			$(div).remove();
		}, 7000);
	});
});
