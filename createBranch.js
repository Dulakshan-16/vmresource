var button = getComputedStyle(document.getElementsByTagName("button")[0]);
var buttonWidth = parseFloat(button.width.replace("px", ""));
var imgWidth = parseFloat(
	getComputedStyle(document.getElementsByTagName("img")[0]).width.replace(
		"px",
		""
	)
);
var buttonMarginLeft = parseFloat(button.marginLeft.replace("px", ""));

// Create linear gradient for each branch
function createLinearGradient(branchIndex) {
	var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	var gradientDark = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"linearGradient"
	);

	// Dark mode gradient
	var stopsDark = [
		{ color: "#9921e8", offset: "0%" },
		{ color: "#4d5fa5", offset: "100%" },
	];

	// Parses an array of stop information and appends <stop> elements to the <linearGradient>
	for (var i = 0, length = stopsDark.length; i < length; i++) {
		// Create a <stop> element and set its offset based on the position of the for loop.
		var stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
		stop.setAttribute("offset", stopsDark[i].offset);
		stop.setAttribute("stop-color", stopsDark[i].color);

		// Add the stop to the <lineargradient> element.
		gradientDark.appendChild(stop);
	}

	// Apply the <lineargradient> to <defs>
	gradientDark.id = `grad${branchIndex + 1}`;
	gradientDark.setAttribute("x1", "0");
	gradientDark.setAttribute("x2", "0");
	gradientDark.setAttribute("y1", "0");
	gradientDark.setAttribute("y2", "1");
	defs.appendChild(gradientDark);

	// Light Mode gradien
	var gradientLight = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"linearGradient"
	);

	// Dark mode gradient
	var stopsLight = [
		{ color: "#bdd4e7", offset: "0%" },
		{ color: "#8693ab", offset: "100%" },
	];

	// Parses an array of stop information and appends <stop> elements to the <linearGradient>
	for (var i = 0, length = stopsLight.length; i < length; i++) {
		// Create a <stop> element and set its offset based on the position of the for loop.
		var stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
		stop.setAttribute("offset", stopsLight[i].offset);
		stop.setAttribute("stop-color", stopsLight[i].color);

		// Add the stop to the <lineargradient> element.
		gradientLight.appendChild(stop);
	}

	// Apply the <lineargradient> to <defs>
	gradientLight.id = `lightgrad${branchIndex + 1}`;
	gradientLight.setAttribute("x1", "0");
	gradientLight.setAttribute("x2", "0");
	gradientLight.setAttribute("y1", "0");
	gradientLight.setAttribute("y2", "1");

	defs.appendChild(gradientLight);

	branches[branchIndex].appendChild(defs);
}
// Draw the path of each subnode for each node
function drawSubNodePath(noSubNodes, branchIndex, nodeIndex, subNodeContent) {
	var startPath, circleX, circleY;
	var xPost;

	xPost =
		imgWidth +
		buttonMarginLeft +
		buttonWidth / 2 -
		5 +
		(nodeLength + circleSize * 2);

	startPath = `M ${xPost} `;
	if (nodeIndex == 0) {
		startPath += startDist;
	} else {
		startPath += startDist + nodeIndex * nodeDist;
	}

	var circles = [noSubNodes];
	var textContent = [noSubNodes];
	for (var i = 0; i < noSubNodes; i++) {
		var pathCords;
		if (i % 2 == 0) {
			pathCords = `l ${subNodeDist} 0 l 0 -${subNodeLength} l 0 ${subNodeLength}`;

			startPath += pathCords;
			if (i == noSubNodes - 1) {
				startPath += `l ${subNodeDist} 0`;
			}

			circleX = xPost + subNodeDist * (i + 1);

			circleY = startDist + nodeDist * nodeIndex - (subNodeLength + circleSize);
		} else {
			pathCords = `l ${subNodeDist} 0 l 0 ${subNodeLength} l 0 -${subNodeLength} `;

			startPath += pathCords;
			if (i == noSubNodes - 1) {
				startPath += `l ${subNodeDist} 0`;
			}

			circleX = xPost + subNodeDist * (i + 1);

			circleY = startDist + nodeDist * nodeIndex + (subNodeLength + circleSize);
		}
		var textAndcircleContent = drawCircle(
			circleY,
			circleX,
			subNodeContent[i],
			branchIndex,
			false,
			nodeIndex,
			i
		);
		circles[i] = textAndcircleContent.circleContent;
		textContent[i] = textAndcircleContent.textContent;
	}

	var currPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	currPath.setAttribute("d", startPath);
	currPath.setAttribute("stroke", `url(#grad${branchIndex + 1})`);
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: light)").matches
	) {
		currPath.setAttribute("stroke", `url(#lightgrad${branchIndex + 1})`);
	}
	currPath.setAttribute("class", "subnode-branch");

	var subNodePathLength = currPath.getTotalLength();
	currPath.style.strokeDashoffset = subNodePathLength;
	currPath.style.strokeDasharray = subNodePathLength;
	currPath.style.transition = `stroke-dashoffset ${animationDuration}ms cubic-bezier(0.47, 0, 0.745, 0.715) 0s`;
	currPath.style.display = "none";

	return { path: currPath, circle: circles, text: textContent };
}

// Draw subnodes for each node in the branch
function drawSubNodes(branchIndex, nodeInfo) {
	for (var i = 0, n = nodeInfo.length; i < n; i++) {
		var pathcirclesAndText = drawSubNodePath(
			nodeInfo[i].subNodes,
			branchIndex,
			i,
			nodeInfo[i].subNodeContent
		);
		branches[branchIndex].appendChild(pathcirclesAndText.path);
		for (var j = 0, m = nodeInfo[i].subNodes; j < m; j++) {
			circle = pathcirclesAndText.circle[j];
			text = pathcirclesAndText.text[j];
			branches[branchIndex].appendChild(text);
			branches[branchIndex].appendChild(circle);
		}
	}
}

// Draw circle function would set the necessary values for the radius and the position for the circle
function drawCircle(
	height,
	width,
	textContent,
	branchIndex,
	isNodeCircle,
	nodeIndex,
	subNodeIndex
) {
	var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circle.setAttribute("cx", width);
	circle.setAttribute("cy", height);
	circle.setAttribute("r", circleSize);
	circle.setAttribute("stroke", `url(#grad${branchIndex + 1})`);
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: light)").matches
	) {
		circle.setAttribute("stroke", `url(#lightgrad${branchIndex + 1})`);
	}
	circle.style.visibility = "hidden";
	circle.style.strokeDasharray = circleLength;
	circle.style.strokeDashoffset = circleLength;
	circle.style.transition = `stroke-dashoffset ${animationDuration}ms cubic-bezier(0.47, 0, 0.745, 0.715) 0s`;

	var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text.setAttribute("x", width);
	text.setAttribute("y", height);
	text.setAttribute("text-anchor", "middle");
	text.setAttribute("alignment-baseline", "middle");

	text.setAttribute("fill", "white");
	text.style.display = "none";

	var words = textContent[0].split(" ");

	for (var i = 0, n = words.length; i < n; i++) {
		var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
		var tspanNode = document.createTextNode(words[i]);
		tspan.setAttribute("x", width);
		if (i > 0) {
			tspan.setAttribute("dy", "1.2em");
		}
		tspan.setAttribute("alignment-baseline", "middle");
		tspan.setAttribute("text-anchor", "middle");
		tspan.append(tspanNode);
		text.append(tspan);
	}
	text.setAttribute("y", text.getAttribute("y") - (words.length - 1) * 1.2 * 8);

	if (isNodeCircle) {
		// text.setAttribute("class", `node${nodeCounter}`);
		// circle.setAttribute("class", `node${nodeCounter}`);
		text.setAttribute("class", "node");
		circle.setAttribute("class", "node");
	} else {
		// text.setAttribute("class", `subnode${subNodeCounter}`);
		// circle.setAttribute("class", `subnode${subNodeCounter}`);
		text.setAttribute("class", "subnode");
		var link = document.createElementNS("http://www.w3.org/2000/svg", "a");
		link.setAttribute(
			"href",
			nodeInfo[branchIndex][nodeIndex].subNodeLinks[subNodeIndex]
		);
		link.setAttribute("target", "_blank");
		circle.setAttribute("class", "subnode");
		link.appendChild(circle);

		return { circleContent: link, textContent: text };
	}

	return { circleContent: circle, textContent: text };
}

// Draw path according to each branch
function drawPathAndcircle(branchIndex, branchSize) {
	var currHeight = startDist;
	// Path would start at the center of the svg and initially have a line of "startDist" size
	var startX = imgWidth + buttonMarginLeft + buttonWidth / 2 - 5;
	var pathCords = `M ${startX} 0 l 0 ${startPoints.y}`;
	var circlePost =
		imgWidth + buttonMarginLeft + buttonWidth / 2 - 5 + nodeLength + circleSize;

	viewBoxWidth += startX;
	pathCords += `l ${nodeLength} 0 l -${nodeLength} 0 l 0 ${nodeDist}`.repeat(
		branchSize
	);

	for (var i = 0; i < branchSize; i++) {
		// Set path coordinates for each svg branch according to the number of nodes

		// Append circle to svg branch

		var textAndcircleContent = drawCircle(
			currHeight,
			circlePost,
			branchInfo[branchIndex].nodeContent[i],
			branchIndex,
			true,
			0,
			0
		);
		branches[branchIndex].appendChild(textAndcircleContent.textContent);
		branches[branchIndex].appendChild(textAndcircleContent.circleContent);
		currHeight += nodeDist;
	}
	var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", pathCords);
	path.setAttribute("class", `main-branch${branchIndex + 1}`);
	path.setAttribute("stroke", `url(#grad${branchIndex + 1})`);
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: light)").matches
	) {
		path.setAttribute("stroke", `url(#lightgrad${branchIndex + 1})`);
	}
	path.style.visibility = "hidden";
	var pathLength = path.getTotalLength();
	path.style.strokeDasharray = pathLength;
	path.style.strokeDashoffset = pathLength;
	path.style.transition = `stroke-dashoffset ${animationDuration}ms cubic-bezier(0.47, 0, 0.745, 0.715) 0s`;
	// Append path to svg branch
	branches[branchIndex].appendChild(path);

	var viewBoxValue = `0 0 ${viewBoxWidth} ${currHeight}`;
	branches[branchIndex].setAttribute("class", branchInfo[branchIndex].name);
	branches[branchIndex].style.display = "none";
	branches[branchIndex].setAttribute("viewbox", viewBoxValue);
	branches[branchIndex].setAttribute("width", viewBoxWidth);
	branches[branchIndex].setAttribute("height", currHeight);

	branchDiv[branchIndex].style.width = viewBoxWidth;
	branchDiv[branchIndex].style.height = currHeight;

	return branches[branchIndex];
}

// Loop over every div tag with the class name "branch" and add the path and circles
for (var i = 0; i < noBranch; i++) {
	viewBoxWidth = nodeLength + circleSize * 2;
	viewBoxWidth += subNodeDist * (maxSubNodes(nodeInfo[i]) + 1);

	branches[i] = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	noNodes = branchInfo[i].noNodes;

	// Add a lienar gradient to each brnach
	createLinearGradient(i);

	// Append subnodes to the nodes in the branch
	drawSubNodes(i, nodeInfo[i]);

	// Append the branch svg to the corresponding branch class
	branchDiv[i].appendChild(drawPathAndcircle(i, noNodes));
}
