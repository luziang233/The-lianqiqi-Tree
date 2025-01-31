addLayer("lq", {
    name: "炼气期", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "炼气", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(100000),
    }},
    color: "white",
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
    update(diff){
        if(hasUpgrade("lq",14)) player.zj.unlocked = true
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
        hp:new Decimal(1),//玩家自己的血量，目前没用
        dr_num:new Decimal(1),//第几个敌人
    }},
    //下面是重要的我定义的东西
    damage: new Decimal(0),
    hurt: new Decimal(1),
    dead: new Decimal(1),

    color: "red",
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "dr", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        
    },
    clickables: {
        11: {
            title:"普通的一拳",
            tooltip(){return "造成"+format(tmp.dr.enemies[player.dr.dr_num].hp.div(10))+"伤害"},
            canClick(){
                return tmp.dr.enemies[player.dr.dr_num].hp.sub(tmp.dr.damage).gt(0)
            },
            onClick(){
                tmp.dr.damage=tmp.dr.enemies[player.dr.dr_num].hp.div(10).add(tmp.dr.damage)
                tmp.dr.hurt=new Decimal(0)
            },
            display(){return "伤害 " + format(clickableEffect("dr", 11)) },
        }
    },
    milestones: {
        
    },
    bars: {
        bigBar: {
            direction: LEFT,
            width: 600,
            height: 50,
            fillStyle:{
                "background-color": "#dd6e78",
            },
            baseStyle: {
                "background-color": "#dc143c",
            },
            progress() {
                return tmp.dr.damage.div(tmp.dr.enemies[player.dr.dr_num].hp)
            },
            display() {
                return tmp.dr.enemies[player.dr.dr_num].name + "还有 " + format(tmp.dr.enemies[player.dr.dr_num].hp.sub(tmp.dr.damage)) + "/" + format(tmp.dr.enemies[player.dr.dr_num].hp) + " 血量";
            },
        },
    },
    enemies:{
        1:{
            name:"小垃圾",
            hp(){return new Decimal(10) },
            live(){
                return this.hp().gte(0)
            },
        },
        2:{
            name:"大垃圾",
            hp(){return new Decimal(1e5) },
            live(){
                return this.hp().gte(0)
            },
        },
        3:{
            name:"测试更大的垃圾",
            hp(){return new Decimal(1e15) },
            live(){
                return this.hp().gte(0)
            },
        },
    },
    infoboxes: {
        1: {
            title() {
                let title1 = [
                    "  ",
                    "__",
                    "  ",
                    "你为",
                    "你为__",
                    "你为",
                    "你为什么",
                    "你为什么__",
                    "你为什么",
                    "你为什么要打",
                    "你为什么要打__",
                    "你为什么要打",
                    "你为什么要打我？",
                    "你为什么要打我？__",
                    "你为什么要打我？",
                    "你为什么要打我？你真",
                    "你为什么要打我？你真__",
                    "你为什么要打我？你真",
                    "你为什么要打我？你真的忍",
                    "你为什么要打我？你真的忍__",
                    "你为什么要打我？你真的忍",
                    "你为什么要打我？你真的忍心做",
                    "你为什么要打我？你真的忍心做__",
                    "你为什么要打我？你真的忍心做",
                    "你为什么要打我？你真的忍心做这种",
                    "你为什么要打我？你真的忍心做这种__",
                    "你为什么要打我？你真的忍心做这种",
                    "你为什么要打我？你真的忍心做这种事吗",
                    "你为什么要打我？你真的忍心做这种事吗__",
                    "你为什么要打我？你真的忍心做这种事吗",
                    "你为什么要打我？你真的忍心做这种事吗？",
                    "你为什么要打我？你真的忍心做这种事吗？__",
                    "你为什么要打我？你真的忍心做这种事吗？"
                  ]
                if(tmp.dr.hurt.eq(1)||tmp.dr.dead.eq(0)){
                    return "文本框"
                }else{
                    return title1[player.t.points.times(6).floor()]
                }
            },
            body() { 
                let body1 = [
                    "  ",
                    "__",
                    "  ",
                    "你",
                    "你__",
                    "你",
                    "你为",
                    "你为__",
                    "你为",
                    "你为什",
                    "你为什__",
                    "你为什",
                    "你为什么",
                    "你为什么__",
                    "你为什么",
                    "你为什么要",
                    "你为什么要__",
                    "你为什么要",
                    "你为什么要打",
                    "你为什么要打__",
                    "你为什么要打",
                    "你为什么要打我",
                    "你为什么要打我__",
                    "你为什么要打我",
                    "你为什么要打我？",
                    "你为什么要打我？__",
                    "你为什么要打我？",
                    "你为什么要打我？你",
                    "你为什么要打我？你__",
                    "你为什么要打我？你",
                    "你为什么要打我？你真",
                    "你为什么要打我？你真__",
                    "你为什么要打我？你真",
                    "你为什么要打我？你真的",
                    "你为什么要打我？你真的__",
                    "你为什么要打我？你真的",
                    "你为什么要打我？你真的忍",
                    "你为什么要打我？你真的忍__",
                    "你为什么要打我？你真的忍",
                    "你为什么要打我？你真的忍心",
                    "你为什么要打我？你真的忍心__",
                    "你为什么要打我？你真的忍心",
                    "你为什么要打我？你真的忍心做",
                    "你为什么要打我？你真的忍心做__",
                    "你为什么要打我？你真的忍心做",
                    "你为什么要打我？你真的忍心做这",
                    "你为什么要打我？你真的忍心做这__",
                    "你为什么要打我？你真的忍心做这",
                    "你为什么要打我？你真的忍心做这种",
                    "你为什么要打我？你真的忍心做这种__",
                    "你为什么要打我？你真的忍心做这种",
                    "你为什么要打我？你真的忍心做这种事",
                    "你为什么要打我？你真的忍心做这种事__",
                    "你为什么要打我？你真的忍心做这种事",
                    "你为什么要打我？你真的忍心做这种事吗",
                    "你为什么要打我？你真的忍心做这种事吗__",
                    "你为什么要打我？你真的忍心做这种事吗",
                    "你为什么要打我？你真的忍心做这种事吗？",
                    "你为什么要打我？你真的忍心做这种事吗？__",
                    "你为什么要打我？你真的忍心做这种事吗？"
                  ]
                  if(tmp.dr.hurt.eq(1)||tmp.dr.dead.eq(0)){
                    return "文本框"
                }else{
                    return body1[player.t.points.times(12).floor()]
                }
            },
        },
    },
    update(diff){
        if(tmp.dr.enemies[player.dr.dr_num].hp.sub(tmp.dr.damage).lte(0)) {
            player.dr.dr_num=player.dr.dr_num.add(1),
            tmp.dr.damage=new Decimal(0)
            tmp.dr.dead=new Decimal(0)
        }
        if(tmp.dr.enemies[player.dr.dr_num].hp.sub(tmp.dr.damage).eq(tmp.dr.enemies[player.dr.dr_num].hp)) {
            tmp.dr.dead=new Decimal(1)
            tmp.dr.hurt=new Decimal(1)
        }
    },
    tabFormat: [
        //["display-text",function() { return '你已经击杀了 ' + format(player[this.layer].points) + ' 个敌人!' }, { "color": "red", "font-size": "26px", "font-family": "Comic Sans MS" }],
        ["display-text",function() { return tmp.dr.enemies[player.dr.dr_num].name }, { "color": "red", "font-size": "26px", "font-family": "Comic Sans MS" }],
        ["blank","15px"],
        ["row", [["bar", "bigBar"]]],
        ["blank","15px"],
        ["row", [["infobox","1"]]],
        ["blank","275px"],
        "clickables",
        
    ],
    layerShown(){return hasUpgrade("lq",11)},
})

addLayer("zj",{
    name: "筑基", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "筑基", // This appears on the layer's node. Default is the id with the first letter capitalized
    position:1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    displayRow:999,
    startData() { return {
        unlocked: false,
		points: new Decimal(1),
    }},
    color: "white",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "并没有", // Name of prestige currency
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
    tooltipLocked(){return "需要10层炼气期来突破"},
    layerShown(){return true}
})

addLayer("t",{
    name: "时间", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "时间", // This appears on the layer's node. Default is the id with the first letter capitalized
    position:999, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    displayRow:666,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "white",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "时间", // Name of prestige currency
    baseResource: "不需要", // Name of resource prestige is based on
    passiveGeneration(){return new Decimal(1)},
    baseAmount() {return new Decimal(0)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(diff){
        if((player.t.points.gte(5)&&player.t.points.lte(10000))||tmp.dr.hurt.eq(1)||tmp.dr.dead.eq(0) ){
            player.t.points = new Decimal(0)
        }
    },
    layerShown(){return true},
    tabFormat: [
        //["display-text",function() { return '你已经击杀了 ' + format(player[this.layer].points) + ' 个敌人!' }, { "color": "red", "font-size": "26px", "font-family": "Comic Sans MS" }],
        ["display-text",function() { return player.t.points.times(2).floor() }, { "color": "red", "font-size": "26px", "font-family": "Comic Sans MS" }],
    ],
})


/*以下是一些基本的decimal运算符
new Decimal(x) 声明一个decimal数x
x.add(y) 返回两个decimal数x,y相加的值
x.sub(y) 返回两个decimal数x,y相减的值
x.times(y) 返回两个decimal数x,y相乘的值
x.div(y) 返回两个decimal数x,y相除的值(y不为0)
x.sqrt() x开平方根
x.cbrt() x开立方根
x.ln() x取e为底的对数值
x.log10() x取以10为底的对数值
x.pow(y) x变为y次方
x.max(y) 取x和y的最大值
x.min(y) 取x和y的最小值
x.tetrate(y) x变为y的重幂*/