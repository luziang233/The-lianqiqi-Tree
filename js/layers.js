addLayer("lq", {
    name: "炼气期", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "炼气", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(100000),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "炼气期层数", // Name of prestige currency
    baseResource: "灵气", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base:1.04,
    exponent: 0.512, // Prestige currency exponent
    canBuyMax:1,
    resetDescription:"突破",//Use this to replace "Reset for " on the Prestige button with something else.
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('lq', 13)) mult = mult.times(upgradeEffect('lq', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "lq", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "什么，已经十万层了？",
            description: "开始无敌之路",
            cost: new Decimal(0),
        },
        12: {
            title: "接下来干点啥好呢?",
            description: "没有对手啊",
            cost: new Decimal(2e5),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "测试3",
            description: "测试3",
            cost: new Decimal(5e5),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    milestones: {
        0: {
            requirementDescription: "炼气期三十万层",
            done() { return player[this.layer].points.gte(3e5)},
            effectDescription:"灵气获得X2",
        },
    },
    tabFormat: [
        "resource-display",
        "main-display",
        "prestige-button",
        "blank",
        "blank",
        "upgrades",
        "blank",
        "blank",
        "milestones",
    ],
    layerShown(){return true}
})

addLayer("dr", {
    name: "敌人", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "敌人", // This appears on the layer's node. Default is the id with the first letter capitalized
    position:1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    displayRow:1,
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "敌人", // Name of prestige currency
    baseResource: "并没有", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "dr", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "什么，已经十万层了？",
            description: "开始无敌之路",
            cost: new Decimal(0),
        },
    },
    milestones: {
        0: {
            requirementDescription: "炼气期三十万层",
            done() { return player[this.layer].points.gte(3e5)},
            effectDescription:"灵气获得X2",
        },
    },
    bars: {
        bigBar: {
            direction: LEFT,
            width: 200,
            height: 50,
            fillStyle: {
                "background-color": "#dc143c",
            },
            progress() {
                return player[this.layer].points.div(player[this.layer].requires)
            },
            display() {
                return "<h5>敌人还有" + format(player.dr.requires-(player[this.layer].points)) + "/" + format(player.dr.requires) + "<h5> 血量";
            },
        },
    },
    update(diff) {
        player.dr.requires = player[this.layer].points.add(10)
    },
    tabFormat: [
        ["display-text",function() { return '你已经击杀了 ' + format(player[this.layer].points) + ' 个敌人!' }, { "color": "red", "font-size": "26px", "font-family": "Comic Sans MS" }],
        "prestige-button",
        ["row", [["bar", "bigBar"]]],
        "blank",
        "blank",
        "upgrades",
        "blank",
        "blank",
        "milestones",
    ],
    layerShown(){return true}
})

