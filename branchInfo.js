var branchDiv = document.querySelectorAll(".branch");
function maxNodes(elem) {
	var max = 0;
	for (var i = 0, n = elem.length; i < n; i++) {
		if (elem[i].noNodes > max) {
			max = elem[i].noNodes;
		}
	}
	return max;
}

function maxSubNodes(elem) {
	var max = 0;
	for (var i = 0, n = elem.length; i < n; i++) {
		if (elem[i].subNodes > max) {
			max = elem[i].subNodes;
		}
	}
	return max;
}
var subNodeInfo;
// Number of branches identified by the number of div elements with the class name "branch"
const noBranch = branchDiv.length;
// Branch adjustable variables

// "Branches" variable stores the svg element for each branch which will be appended to the corresponding branch classes in the html
var branches = [noBranch];

var viewBoxValue,
	circle,
	noNodes = undefined;

// Adjust starting distance from the start to the first node in the branch from here
var startDist = 600;

// Adjust value of nodeDist to change the distance between each node in the branch
var nodeDist = 500;

//Adjust circle size here
var circleSize = 100;

// Adjust length of a node for each branch here
var nodeLength = 150;

// Adjust view box width from here
var viewBoxWidth;

// Subnode adjustable variable

// Distance between each subnode
var subNodeDist = 300;

//Length of each subnode
var subNodeLength = 100;

var circleLength = 2 * Math.PI * circleSize;

var animationDuration = 2000;
// Branch info will store all the necessary information for each branch
var branchInfo = [noBranch];
branchInfo = [
	//Science
	{
		name: "svg1",
		noNodes: 5,
		nodeContent: [
			["Physics"],

			["Chemistry"],

			["Biology"],

			["Further Maths"],

			["Maths"],
		],
	},
	//Arts
	{
		name: "svg2",
		noNodes: 8,
		nodeContent: [
			["Sinhala"],

			["Tamil"],

			["Language"],

			["Literature"],

			["French"],

			["German"],

			["Sri Lankan History"],

			["Geography"],
		],
	},
	//Tech
	{
		name: "svg3",
		noNodes: 2,
		nodeContent: [["ICT"], ["Computer Science"]],
	},
	// Business
	{
		name: "svg4",
		noNodes: 3,
		nodeContent: [["Economics"], ["Business Studies"], ["Accounting"]],
	},
];
// Info for each node in each branch
var nodeInfo = [noBranch][maxNodes(branchInfo)];
nodeInfo = [
	// Branch 1 node info
	[
		{
			branchIndex: 0,
			nodeName: "node1",
			subNodes: 3,
			subNodeContent: [["Waves"], ["Electricity"], ["Moment"]],
			subNodeLinks: [
				["/subject/Waves/"],

				["/subject/Electricity/"],

				["/subject/Moment/"],
			],
		},

		{
			branchIndex: 0,
			nodeName: "node2",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [["/subject/Organic/"], ["/subject/Inorganic/"]],
		},

		{
			branchIndex: 0,
			nodeName: "node3",
			subNodes: 2,
			subNodeContent: [["Human Body"], ["Zoology"]],
			subNodeLinks: [["/subject/Human Body/"], ["/subject/Zoology/"]],
		},

		{
			branchIndex: 0,
			nodeName: "node4",
			subNodes: 0,
			subNodeContent: [],
			subNodeLinks: [],
		},

		{
			branchIndex: 0,
			nodeName: "node5",
			subNodes: 0,
			subNodeContent: [],
			subNodeLinks: [],
		},
	],
	// Branch 2 node info
	[
		{
			branchIndex: 1,
			nodeName: "node1",
			subNodes: 4,
			subNodeContent: [
				["Organic"],
				["Inorganic"],
				["Organic"],
				["Inorganic"],
				["Organic"],
				["Inorganic"],
			],
			subNodeLinks: [],
		},

		{
			branchIndex: 1,
			nodeName: "node2",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},
	],
	// Branch 3 node info
	[
		{
			branchIndex: 2,
			nodeName: "node8",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},

		{
			branchIndex: 2,
			nodeName: "node8",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},

		{
			branchIndex: 2,
			nodeName: "node8",
			subNodes: 0,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},

		{
			branchIndex: 2,
			nodeName: "node8",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},
		{
			branchIndex: 2,
			nodeName: "node8",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},
	],
	// Branch 4 node info
	[
		{
			branchIndex: 3,
			nodeName: "node13",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},

		{
			branchIndex: 3,
			nodeName: "node13",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},

		{
			branchIndex: 3,
			nodeName: "node13",
			subNodes: 2,
			subNodeContent: [["Organic"], ["Inorganic"]],
			subNodeLinks: [],
		},
	],
];

startPoints = {
	x: 275,
	y: startDist,
};
