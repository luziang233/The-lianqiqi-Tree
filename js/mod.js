let modInfo = {
	name: "史上最强炼气期树",
	id: "sszqlqq",
	author: "luziang",
	pointsName: "灵气",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.000004",
	name: "无敌测试版",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.000001</h3><br>
		- 还在学习<br><br>
	<h3>v0.000002</h3><br>
		- 新增了三个层<br>
		- 可以攻击敌人<br>
		- 设计层级排列<br><br>
	<h3>v0.000003</h3><br>
		- 新增了一个时间层，对玩家无用处<br>
		- 敌人会说话<br>
		- 看着很离谱<br><br>
	<h3>v0.000004</h3><br>
		- 优化了屎山代码<br>
		- 敌人不会说话了<br>`
let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("lq", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(5e5)
	if (hasUpgrade('lq', 12)) gain = gain.times(upgradeEffect('lq', 12))
	if (hasMilestone('lq', 0)) gain = gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){return "你有"+format(player.lq.points)+"炼气期层数"},
	"当前版本终局：到第5个垃圾打败就会卡住，正常的。",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}