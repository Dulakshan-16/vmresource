// Branch animations
var buttons = document.querySelectorAll(".button");

var branchIndex = undefined;
const n = branch.length;
function fadeOut(elem) {
	elem.style.animation = "fadeOut 0.5s linear forwards";
}
function fadeIn(elem) {
	elem.style.animation = "fadeIn 0.5s linear forwards";
}
function indexOf(button) {
	for (var i = 0; i < n; i++) {
		if (buttons[i] === button) {
			return i;
		}
	}
}

function eraseBtn(btn) {
	fadeOut(btn);
	setTimeout(function () {
		btn.style.visibility = "hidden";
	}, 500);
	branchIndex = indexOf(btn);
	for (var i = 0; i < n; i++) {
		if (branch[i].style.display == "block") {
			buttons[i].style.visibility = "visible";
			fadeIn(buttons[i]);
			fadeOut(branch[i]);
			var currBranch = branch[i];
			setTimeout(function () {
				currBranch.style.display = "none";
			}, 500);
			break;
		}
	}
	fadeIn(branch[branchIndex]);
	branch[branchIndex].style.display = "block";
}

// Sub Node animations
function indexOfNode(node, nodes) {
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i] === node) {
			return i + 1;
		}
	}
}
function drawNode(node, size) {
	for (var i = 0; i < size; i++) {
		if (node[i].tagName == "ellipse") {
			node[i].style.animation =
				"animate-svg1-draw-stroke-1 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s both";
			node[i].style.display = "block";
		} else if (node[i].tagName == "path") {
			node[i].style.animation =
				"animate-svg1-draw-stroke-2 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s both";

			node[i].style.display = "block";
		} else if (node[i].tagName == "text") {
			fadeIn(node[i]);
			node[i].style.display = "block";
		}
	}
}
function eraseSubNode(node) {
	for (var i = 0, n = node.length; i < n; i++) {
		if (node[i].style.display == "block") {
			var currNode = node[i];
			if (node[i].tagName == "ellipse") {
				currNode.style.transitionDelay = "2s";
				currNode.style.animation =
					"animate-svg1-erase-stroke-1 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s both";
			} else if (node[i].tagName == "path") {
				currNode.style.animation =
					"animate-svg1-erase-stroke-2 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s both";
			} else if (node[i].tagName == "text") {
				fadeOut(currNode);
			}
		}
	}

	setTimeout(function () {
		for (var i = 0, n = node.length; i < n; i++) {
			if (node[i].style.display == "block") {
				node[i].style.display = "none";
			}
		}
	}, 1500);
}
function drawSubNode(node) {
	var nodeName = ".node" + (branchIndex + 1);
	var nodes = document
		.getElementById("branch" + (branchIndex + 1))
		.querySelectorAll(nodeName);
	var index = indexOfNode(node, nodes);
	for (var i = 0, n = nodes.length; i < n; i++) {
		var nodeIndex = (i + 1).toString();
		var subNodeName = "subnode" + nodeIndex;
		var currnode = document.getElementsByClassName(subNodeName);

		if (nodeIndex === index.toString()) {
			drawNode(currnode, currnode.length);
		} else {
			eraseSubNode(currnode);
		}
	}
}
