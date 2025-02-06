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
            title: "",
            description: "",
            cost: new Decimal(0),
        },
        12: {
            title: "",
            description: "",
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
            requirementDescription: "炼气期一层",
            done() { return player[this.layer].points.gte(1)},
            effectDescription:"灵气获得X2",
        },
        1: {
            requirementDescription: "炼气期二层",
            done() { return player[this.layer].points.gte(2)},
            effectDescription:"",
        },
        2: {
            requirementDescription: "炼气期三层",
            done() { return player[this.layer].points.gte(3)},
            effectDescription:"",
        },
        3: {
            requirementDescription: "炼气期四层",
            done() { return player[this.layer].points.gte(4)},
            effectDescription:"",
        },
        4: {
            requirementDescription: "炼气期五层",
            done() { return player[this.layer].points.gte(5)},
            effectDescription:"灵气获得X2",
        },
        5: {
            requirementDescription: "炼气期六层",
            done() { return player[this.layer].points.gte(6)},
            effectDescription:"灵气获得X2",
        },
        6: {
            requirementDescription: "炼气期七层",
            done() { return player[this.layer].points.gte(7)},
            effectDescription:"灵气获得X2",
        },
        7: {
            requirementDescription: "炼气期八层",
            done() { return player[this.layer].points.gte(8)},
            effectDescription:"灵气获得X2",
        },
        8: {
            requirementDescription: "炼气期九层",
            done() { return player[this.layer].points.gte(9)},
            effectDescription:"灵气获得X2",
        },
        9: {
            requirementDescription: "炼气期十层",
            done() { return player[this.layer].points.gte(10)},
            effectDescription:"灵气获得X2",
        },
        10: {
            requirementDescription: "炼气期十一层？",
            done() { return player[this.layer].points.gte(1)},
            effectDescription:"测试",
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
    stay: true,

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
        },
        2:{
            name:"大垃圾",
            hp(){return new Decimal(1e5) },
        },
        3:{
            name:"测试更大的垃圾",
            hp(){return new Decimal(1e15) },
        },
        4:{
            name:"无辜的小女孩",
            hp(){return new Decimal(1) },
        },
        5:{
            name:"小垃圾",
            hp(){return new Decimal(10) },
        },
    },
    infoboxes: {
        1: {
            title() {
                let str = "你为什么要打我？我做错了什么吗？",str1 = "对话"
                /*if(tmp.dr.hurt.eq(1)||tmp.dr.dead.eq(0)||player.dr.dr_num.neq(4)){
                    return "文本框"*/
                if(player.dr.dr_num.eq(4)){
                    if(tmp.dr.hurt.eq(1)||tmp.dr.dead.eq(0)){
                        return "对话"
                    }else if(player.t.points.times(4).floor().lte(str.length-1)){
                        return getSplitString(str,player.t.points.times(8).floor())
                    }
                    return str
                }else if(player.dr.dr_num.eq(1)){
                    return str1
                }else if(player.dr.dr_num.eq(2)){
                    return str1
                }else if(player.dr.dr_num.eq(3)){
                    return str1
                }else if(player.dr.dr_num.eq(5)){
                    return str1
                }
            },
            body() {
                let hp_percent = tmp.dr.enemies[player.dr.dr_num].hp.sub(tmp.dr.damage).div(tmp.dr.enemies[player.dr.dr_num].hp)
                let str = "你为什么要打我？我做错了什么吗？",str1 = "你这个炼气期的也敢在这里造次？",str2 = "噢哟你打人还挺痛~",str3 = "等等不对劲！",str4 = "别打了！我错了！我真知道错了！"
                if(player.dr.dr_num.eq(4)){
                    if(tmp.dr.hurt.eq(1)||tmp.dr.dead.eq(0)){
                        return "她没有说话，只是看着你"
                    }else if(player.t.points.times(4).floor().lte(str.length-1)){
                        return getSplitString(str,player.t.points.times(8).floor())
                    }
                    return str
                }else if(player.dr.dr_num.eq(1)){
                    if(hp_percent.lte(0.7)){
                        if(hp_percent.lte(0.4)){
                            if(hp_percent.lte(0.2)){
                                return str4
                            }
                            return str3
                        }
                        return str2
                    }
                    return str1
                }else if(player.dr.dr_num.eq(2)){
                    if(hp_percent.lte(0.7)){
                        if(hp_percent.lte(0.4)){
                            if(hp_percent.lte(0.2)){
                                return str4
                            }
                            return str3
                        }
                        return str2
                    }
                    return str1
                }else if(player.dr.dr_num.eq(3)){
                    if(hp_percent.lte(0.7)){
                        if(hp_percent.lte(0.4)){
                            if(hp_percent.lte(0.2)){
                                return str4
                            }
                            return str3
                        }
                        return str2
                    }
                    return str1
                }else if(player.dr.dr_num.eq(5)){
                    if(hp_percent.lte(0.7)){
                        if(hp_percent.lte(0.4)){
                            if(hp_percent.lte(0.2)){
                                return str4
                            }
                            return str3
                        }
                        return str2
                    }
                    return str1
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
        if(tmp.dr.hurt.eq(1)||tmp.dr.dead.eq(0) ){
            player.t.points = new Decimal(0)
        }
    },
    layerShown(){return true},
    tabFormat: [
        //["display-text",function() { return '你已经击杀了 ' + format(player[this.layer].points) + ' 个敌人!' }, { "color": "red", "font-size": "26px", "font-family": "Comic Sans MS" }],
        ["display-text",function() { return player.t.points.times(2).floor() }, { "color": "red", "font-size": "26px", "font-family": "Comic Sans MS" }],
    ],
})
//感谢 ⁰¹⁰⁰⁰⁰⁰⁰⁰⁰ᵃ⁷ 大佬写的函数
const getSplitString=(s,p)=>s.slice(0,p/2|0)+[' ','__'][p%2]

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