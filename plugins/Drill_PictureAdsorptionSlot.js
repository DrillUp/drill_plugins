//=============================================================================
// Drill_PictureAdsorptionSlot.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        图片 - 图片吸附槽
 * @author Drill_up
 * 
 * @Drill_LE_param "吸附槽样式-%d"
 * @Drill_LE_parentKey "---吸附槽样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_PAS_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureAdsorptionSlot +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在指定位置添加吸附槽，图片拖拽时会自动吸附图片。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于 弹道核心、可拖拽图片 插件。
 * 基于：
 *   - Drill_PictureDraggable       图片-可拖拽的图片
 * 可被扩展：
 *   - Drill_CoreOfNumberArray      系统-变量数组核心
 *     如果你需要通过插件指令 批量获取 信息，可以用变量数组来接收。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 * 2.详细内容可以去看看 "16.图片 > 关于鼠标拖拽图片.docx"。
 * 吸附偏移量：
 *   (1.吸附偏移量 指将图片被吸附后，图片的位置与原位置的距离差。
 *   (2.吸附清零 指将图片迅速归位到 原位置 。
 *      吸附合并 指将图片 原位置 变为图片现在所处位置，并以此位置为基准。
 *   (3.注意，执行 吸附清零、吸附合并 时，已包含拖拽的清零与合并。
 * 吸附范围：
 *   (1.必然吸附 指只要图片进入必然吸附范围，就一定会被吸附。
 *      一般吸附 指图片进入一般吸附范围后，如果未被鼠标拖拽，才会被吸附。
 *      交换吸附 为"交换"而存在，两个吸附槽之间可以相互交换图片。
 *      详细内容可以去看看 "16.图片 > 关于鼠标拖拽图片.docx"。
 *   (2.吸附槽会针对图片的中心锚点吸附，
 *      你需要留意图片的中心锚点为 中心、左上 或 自定义锚点。
 * 断开吸附：
 *   (1.断开吸附：指吸附条件发生改变，造成图片与吸附槽无法继续吸附，
 *      从而断开的过程。
 *      断开吸附后图片会立即归位，这个过程没有吸附动画。
 *   (2.对于玩家来说，图片突然瞬移可能看着有些不顺眼。
 *      因此你需要在执行 断开吸附 的指令前，合并吸附位置。
 *      这样断开吸附后，图片才不会出现瞬移现象。
 * 吸附类型：
 *   (1.图片有自己的吸附类型，可配置多个。（删除图片后配置的类型会清空）
 *      槽有自己的吸附类型，可配置多个。（删除槽后配置的类型会清空）
 *      图片与槽只要有一个吸附类型能对应，则槽就能吸附图片。
 *   (2.可以根据类型设置，对不同图片进行不同的吸附规则。
 *      假设是一个换装小游戏，可以区分类型："裙子"、"上衣"、"裤子"。
 * 设计：
 *   (1.你可以通过该插件，建立简单的石板放置谜题、卡片顺序谜题。
 *      但是不建议制作复杂的装备卡牌类功能。
 *      可以参考示例中的：卡片解谜、书本解谜、选择道具小系统。
 *   (2.两个吸附槽之间不要靠的太近，因为拖走时只会断开当前槽的连接，
 *      如果另一个槽在，那么会立马被另一个吸走了。
 *      如过必须要非常接近（比如扑克牌），那么需要将 必然吸附半径 
 *      设置为零。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 槽创建
 * 你需要通过插件指令添加吸附槽：
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 建立吸附槽 : 样式[1] : 位置[200,300]
 * 插件指令：>图片吸附槽 : 槽[1] : 建立吸附槽 : 样式[1] : 变量位置[21,22]
 * 插件指令：>图片吸附槽 : 槽变量[21] : 建立吸附槽 : 样式[1] : 位置[200,300]
 * 插件指令：>图片吸附槽 : 槽变量[21] : 建立吸附槽 : 样式[1] : 变量位置[21,22]
 * 
 * 1.槽创建后，不会显示任何图像。
 *   你可以使用后面介绍的"DEBUG吸附槽范围查看"显示槽的范围。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 槽修改
 * 你需要通过插件指令添加吸附槽：
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附 : 关闭
 * 插件指令：>图片吸附槽 : 槽变量[21] : 修改属性 : 必然吸附 : 关闭
 * 插件指令：>图片吸附槽 : 批量槽[1,2] : 修改属性 : 必然吸附 : 关闭
 * 插件指令：>图片吸附槽 : 批量槽变量[21,22] : 修改属性 : 必然吸附 : 关闭
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附 : 开启
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附 : 关闭
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 一般吸附 : 开启
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 一般吸附 : 关闭
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 交换吸附 : 开启
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 交换吸附 : 关闭
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 最大吸附图片数量[1]
 * 插件指令：>图片吸附槽 : 槽[1] : 删除吸附槽
 * 
 * 1.槽配置中，前面部分（槽变量）和后面部分（必然吸附 : 开启）可以随意组合。
 *   一共有4*8种组合方式。
 * 2.吸附属性的详细内容可以去看看 "16.图片 > 关于鼠标拖拽图片.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 槽样式修改
 * 你需要通过插件指令添加吸附槽：
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附半径[16]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附宽度[32]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附高度[32]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附范围类型[0]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 一般吸附半径[90]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 一般吸附宽度[180]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 一般吸附高度[180]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 一般吸附范围类型[0]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 交换吸附半径[30]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 交换吸附宽度[60]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 交换吸附高度[60]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 交换吸附范围类型[0]
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 浮动效果[关闭]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 浮动效果[左右浮动]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 浮动效果[上下浮动]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 浮动速度[1.0]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 浮动偏移量[15]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 圆周移动效果[关闭]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 圆周移动效果[顺时针圆周移动]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 圆周移动效果[逆时针圆周移动]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 圆周移动起始角度[90.0]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 圆周移动旋转速度[1.0]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 圆周移动半径[15]
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 添加槽的吸附类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 去除槽的吸附类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 去除槽的全部吸附类型
 * 
 * 1.槽配置中，前面部分（槽变量）和后面部分（修改属性 : 必然吸附半径[16]）可以随意组合。
 *   一共有4*26种组合方式。
 * 2."范围类型"中0表示圆形，1表示方形。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 图片吸附设置
 * 你需要通过插件指令添加图片吸附设置：
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 添加吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 图片变量[1] : 添加吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 批量图片[10,11] : 添加吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 批量图片变量[21,22] : 添加吸附类型 : 类型[卡牌A类]
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 添加吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 图片[1] : 去除吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 图片[1] : 去除全部吸附类型
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 吸附功能 : 开启
 * 插件指令：>图片吸附槽 : 图片[1] : 吸附功能 : 关闭
 * 插件指令：>图片吸附槽 : 图片[1] : 拖拽后可脱离槽 : 开启
 * 插件指令：>图片吸附槽 : 图片[1] : 拖拽后可脱离槽 : 关闭
 * 
 * 1.图片配置中，前面部分（图片）和后面部分（添加吸附类型）可以随意组合。
 *   一共有4*7种组合方式。
 * 2.只有图片吸附类型与槽的类型对应上，才能被吸附。
 *   你可以通过吸附类型，来区分不同种类的卡片与槽的放置。
 * 3."吸附功能 : 关闭" 会使图片立即 断开吸附，并且对所有 吸附槽 都不吸附。
 *   "吸附功能 : 开启" 则能够重新被吸附。
 * 4.注意，执行 吸附清零、吸附合并 时，已包含拖拽的清零与合并。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 图片吸附控制
 * 你需要通过插件指令添加图片吸附设置：
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 吸附到槽[1]
 * 插件指令：>图片吸附槽 : 图片[1] : 立即吸附到槽[1]
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 立即合并吸附偏移量
 * 插件指令：>图片吸附槽 : 图片[1] : 立即清零吸附偏移量
 * 
 * 1.图片配置中，前面部分（图片）和后面部分（吸附到槽[1]）可以随意组合。
 *   一共有4*4种组合方式。
 * 2."吸附到槽"和"立即吸附到槽"为强制的吸附，无视所有条件。
 *   即无视范围、无视吸附类型、无视最大数量、无视交换。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取信息
 * 你需要通过插件指令获取吸附情况：
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 获取该图片吸附的槽ID : 变量[21]
 * 插件指令：>图片吸附槽 : 图片变量[21] : 获取该图片吸附的槽ID : 变量[21]
 * 
 * 插件指令：>图片吸附槽 : 批量图片[1,2,3] : 获取批量图片的吸附的槽ID : 数组[21]
 * 插件指令：>图片吸附槽 : 批量图片[1,2,3] : 获取批量图片的吸附的槽ID : 数组[某数组名]
 * 插件指令：>图片吸附槽 : 批量图片变量[21,22] : 获取批量图片的吸附的槽ID : 数组[21]
 * 插件指令：>图片吸附槽 : 批量图片变量[21,22] : 获取批量图片的吸附的槽ID : 数组[某数组名]
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 获取该槽第一个吸附的图片ID : 变量[21]
 * 插件指令：>图片吸附槽 : 槽变量[21] : 获取该槽第一个吸附的图片ID : 变量[21]
 * 
 * 插件指令：>图片吸附槽 : 批量槽[1] : 获取该批量槽第一个吸附的图片ID : 数组[21]
 * 插件指令：>图片吸附槽 : 批量槽[1] : 获取该批量槽第一个吸附的图片ID : 数组[某数组名]
 * 插件指令：>图片吸附槽 : 批量槽变量[21] : 获取该批量槽第一个吸附的图片ID : 数组[21]
 * 插件指令：>图片吸附槽 : 批量槽变量[21] : 获取该批量槽第一个吸附的图片ID : 数组[某数组名]
 * 插件指令：>图片吸附槽 : 槽[1] : 获取该槽全部吸附的图片ID : 数组[21]
 * 插件指令：>图片吸附槽 : 槽[1] : 获取该槽全部吸附的图片ID : 数组[某数组名]
 * 插件指令：>图片吸附槽 : 槽变量[21] : 获取该槽全部吸附的图片ID : 数组[21]
 * 插件指令：>图片吸附槽 : 槽变量[21] : 获取该槽全部吸附的图片ID : 数组[某数组名]
 * 
 * 1.使用"批量图片"赋值时，可以赋值到 变量数组核心 中的数组。
 *   如果没有获取到，则变量会被赋值-1。
 * 2.注意，一张图片只能吸附到一个槽，但一个槽能吸附多张图片。
 *   "获取该批量槽第一个吸附的图片ID" 是指多个槽，每个槽的第一个图片ID，给数组。
 *   "获取该槽全部吸附的图片ID" 是指一个槽的全部吸附图片ID，给数组。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 设置
 * 你需要通过插件指令获取吸附情况：
 * 
 * 插件指令：>图片吸附槽 : 吸附动画-修改吸附动画开关 : 开启
 * 插件指令：>图片吸附槽 : 吸附动画-修改吸附动画开关 : 关闭
 * 插件指令：>图片吸附槽 : 吸附动画-修改吸附时长 : 时间[20]
 * 插件指令：>图片吸附槽 : 吸附动画-修改吸附移动方式 : 匀速移动
 * 插件指令：>图片吸附槽 : 吸附动画-修改吸附移动方式 : 弹性移动
 * 插件指令：>图片吸附槽 : 吸附动画-修改吸附移动方式 : 增减速移动
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令控制DEBUG查看相关操作：
 * 
 * 插件指令：>图片吸附槽 : DEBUG吸附槽范围查看 : 开启
 * 插件指令：>图片吸附槽 : DEBUG吸附槽范围查看 : 关闭
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   在图片管理层，放置5张图片和5个槽，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【37.20ms】
 *              100个事件的地图中，平均消耗为：【22.42ms】
 *               50个事件的地图中，平均消耗为：【12.30ms】
 * 测试方法2：  在战斗界面中，放置5张图片和5个槽，测试。
 * 测试结果2：  战斗界面中，平均消耗为：【14.15ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.图片吸附槽主要在于实时判断槽与图片之间的位置，消耗并不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 该插件 造成图片插件设置斜切无效的bug。
 * [v1.2]
 * 添加了 批量图片 插件指令设置。图片临时关闭吸附的功能。
 * 添加了 最大吸附图片数量 功能。
 * [v1.3]
 * 大幅度改进了内部结构。
 * [v1.4]
 * 
 * 
 * 
 * @param ---吸附动画---
 * @default
 *
 * @param 是否启用吸附动画
 * @parent ---吸附动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。若关闭动画，则瞬间吸附。
 * @default true
 *
 * @param 吸附时长
 * @parent ---吸附动画---
 * @type number
 * @min 1
 * @desc 图片吸附过程持续的时长。
 * @default 20
 * 
 * @param 吸附移动方式
 * @parent ---吸附动画---
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 增减速移动
 * @value 增减速移动
 * @desc 吸附移动方式的设置。
 * @default 匀速移动
 * 
 * 
 * @param ---吸附槽样式组 1至20---
 * @default
 *
 * @param 吸附槽样式-1
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-2
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-3
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-4
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-5
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-6
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-7
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-8
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-9
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-10
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-11
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-12
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-13
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-14
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-15
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-16
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-17
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-18
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-19
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 *
 * @param 吸附槽样式-20
 * @parent ---吸附槽样式组 1至20---
 * @type struct<PASStyle>
 * @desc 吸附槽样式的详细配置信息。
 * @default 
 * 
 */
/*~struct~PASStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的吸附槽样式==
 * 
 * @param 最大吸附图片数量
 * @type number
 * @min 1
 * @desc 槽最大吸附的图片数量，可以通过插件指令修改。
 * @default 1
 * 
 * @param 可吸附类型
 * @type text[]
 * @desc 槽可吸附的类型，可以通过插件指令修改。
 * @default []
 *
 *
 * @param ---吸附控制---
 * @default
 *
 * @param 必然吸附开关
 * @parent ---吸附控制---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，只要图片进入必然范围，就一定会被吸附。
 * @default true
 *
 * @param 必然吸附范围类型
 * @parent 必然吸附开关
 * @type select
 * @option 圆形
 * @value 0
 * @option 方形
 * @value 1
 * @desc 范围类型，0表示圆形，1表示方形。
 * @default 0
 * 
 * @param 必然吸附半径
 * @parent 必然吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为圆形时，圆形的半径。单位像素。
 * @default 16
 * 
 * @param 必然吸附宽度
 * @parent 必然吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为方形时，方形的宽度。单位像素。
 * @default 32
 * 
 * @param 必然吸附高度
 * @parent 必然吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为方形时，方形的高度。单位像素。
 * @default 32
 *
 * @param 一般吸附开关
 * @parent ---吸附控制---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，图片静止且未被鼠标按着时，才会被吸附的范围。
 * @default true
 *
 * @param 一般吸附范围类型
 * @parent 一般吸附开关
 * @type select
 * @option 圆形
 * @value 0
 * @option 方形
 * @value 1
 * @desc 范围类型，0表示圆形，1表示方形。
 * @default 0
 * 
 * @param 一般吸附半径
 * @parent 一般吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为圆形时，圆形的半径。单位像素。
 * @default 90
 * 
 * @param 一般吸附宽度
 * @parent 一般吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为方形时，方形的宽度。单位像素。
 * @default 180
 * 
 * @param 一般吸附高度
 * @parent 一般吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为方形时，方形的高度。单位像素。
 * @default 180
 *
 * @param 交换吸附开关
 * @parent ---吸附控制---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，图片自动交换范围，详细去看文档介绍。
 * @default false
 *
 * @param 交换吸附范围类型
 * @parent 交换吸附开关
 * @type select
 * @option 圆形
 * @value 0
 * @option 方形
 * @value 1
 * @desc 范围类型，0表示圆形，1表示方形。
 * @default 0
 * 
 * @param 交换吸附半径
 * @parent 交换吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为圆形时，圆形的半径。单位像素。
 * @default 32
 * 
 * @param 交换吸附宽度
 * @parent 交换吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为方形时，方形的宽度。单位像素。
 * @default 64
 * 
 * @param 交换吸附高度
 * @parent 交换吸附开关
 * @type number
 * @min 1
 * @desc 当范围类型为方形时，方形的高度。单位像素。
 * @default 64
 *
 *
 * @param ---自变化效果---
 * @default 
 *
 * @param 浮动效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @option 左上右下斜向浮动
 * @value 左上右下斜向浮动
 * @option 右上左下斜向浮动
 * @value 右上左下斜向浮动
 * @desc 当前贴图，会来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 1.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 圆周移动效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 顺时针圆周移动
 * @value 顺时针圆周移动
 * @option 逆时针圆周移动
 * @value 逆时针圆周移动
 * @desc 当前贴图，会围绕一个圆周进行移动。
 * @default 关闭
 * 
 * @param 圆周移动起始角度
 * @parent 圆周移动效果
 * @type number
 * @min 0
 * @desc 圆周移动时的起始角度。角度0表示在原位置。
 * @default 0
 * 
 * @param 圆周移动旋转速度
 * @parent 圆周移动效果
 * @desc 圆周移动时的旋转速度，单位角度/帧。
 * @default 1.0
 *
 * @param 圆周移动半径
 * @parent 圆周移动效果
 * @type number
 * @min 1
 * @desc 圆周移动的半径，单位像素。
 * @default 15
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PAS (Picture_Adsorption_Slot)
//		临时全局变量	DrillUp.g_PAS_xxx
//		临时局部变量	this._drill_PAS_xxx
//		存储数据变量	$gameSystem._drill_PAS_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)  每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》12.3ms（drill_PAS_org_finalTransform_x）37.2ms（drill_PAS_updateAdsorb）
//		★最坏情况		暂无
//		★备注			核心功能应用到图片贴图上，不需要过多考虑优化问题。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			
//			->☆图片吸附管理 标准模块
//				->获取吸附位置X【标准函数】
//				->获取吸附位置Y【标准函数】
//				->立即合并吸附偏移量【标准函数】
//				->立即清零吸附偏移量【标准函数】
//			
//			->☆图片的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->消除图片
//					->消除图片（command235）
//				->获取控制器
//				->参数
//					> 可吸附
//					> 可脱离槽
//					> 可吸附类型（列表）
//						->添加可吸附类型
//						->去除可吸附类型
//						->去除全部可吸附类型
//				->操作
//					->吸附到槽
//					->立即吸附到槽
//					->立即合并吸附偏移量（私有）
//					->立即清零吸附偏移量（私有）
//			->☆图片吸附控制
//				->帧刷新 吸附
//					->原位置
//					->继承 Game_Picture 的帧刷新，不分界面
//				->不含吸附+不含拖拽 的数据最终变换值X
//				->不含吸附+不含拖拽 的数据最终变换值Y
//				->吸附位置X（继承）
//				->吸附位置Y（继承）
//			
//			->☆吸附槽容器
//				->添加吸附槽（开放函数）
//				->删除吸附槽（开放函数）
//				->获取吸附槽 - 根据索引（开放函数）
//				->获取吸附槽 - 根据工厂标识（开放函数）
//			->☆吸附槽控制
//				->帧刷新吸附槽
//			
//			->☆DEBUG吸附槽范围
//			
//			?->根据类型删除吸附槽
//			?->获取槽吸附的图片数量
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 关于图片与鼠标控制核心（脚本）.docx
//			1.系统 > 关于拖拽与吸附控制核心（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.注意，图片-可拖拽的图片 的偏移量 已经叠加到了 数据最终变换值。
//			  吸附控制器 的帧刷新 drill_controllerAdsorb_update 要求 不含吸附+不含拖拽 的原位置。
//			  因此才编写了 drill_PAS_org_finalTransform_x 的实现函数。
//			
//		★其它说明细节：
//			1.图片比较特殊，同时在战斗界面和地图界面都要有效果。
//			2.吸附槽容器 只存product_id，通过index映射到 控制器对象。
//			3.该插件需要考虑的交互比较多，这里简单分成下面几大类：
//				- 吸附控制器（图片的属性） + 容器
//				- 吸附槽控制器 + 容器
//				- 拖拽、吸附、吸附槽关系控制（来自核心）
//				- DEBUG
//			  设计时，注意下面几点：
//				- 吸附槽可以动态移动
//				- 正被吸附时 播放吸附动画，已吸附时 完全跟着吸附槽移动
//				- 未吸附/正被吸附/已吸附 可以手动设置，也可以被其他插件手动设置
//		
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_PAS_PluginTip_curName = "Drill_PictureAdsorptionSlot.js 图片-图片吸附槽";
	DrillUp.g_PAS_PluginTip_baseList = [
		"Drill_PictureDraggable.js 图片-可拖拽的图片"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PAS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PAS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PAS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PAS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PAS_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到槽
	//==============================
	DrillUp.drill_PAS_getPluginTip_SlotNotFind = function( slot_id ){
		return "【" + DrillUp.g_PAS_PluginTip_curName + "】\n插件指令错误，id为"+slot_id+"的槽还没被创建。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PAS_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PAS_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	//==============================
	// * 提示信息 - 报错 - 插件指令已改变
	//==============================
	DrillUp.drill_PAS_getPluginTip_CommandChanged = function( temp3 ){
		return "【" + DrillUp.g_PAS_PluginTip_curName + "】\n插件指令错误，指令中'"+temp3+"'已不支持，需要改成'样式[]'。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureAdsorptionSlot = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureAdsorptionSlot');
	
	//==============================
	// * 静态数据 - 吸附槽样式
	//				（~struct~PASStyle）
	//==============================
	DrillUp.drill_PAS_styleInit = function( dataFrom ){
		var data = {};
		
		// > B吸附类型
		if( dataFrom["可吸附类型"] != "" &&
			dataFrom["可吸附类型"] != undefined ){
			data['slotTypeList'] = JSON.parse( dataFrom["可吸附类型"] );
		}else{
			data['slotTypeList'] = [];
		}
		
		// > C吸附数量
		data['maxAdsorbNum'] = Number( dataFrom["最大吸附图片数量"] || 1);
		
		// > E自变化效果
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['effect_ring'] = String( dataFrom["圆周移动效果"] || "关闭");
		data['effect_ringStart'] = Number( dataFrom["圆周移动起始角度"] || 0.0);
		data['effect_ringSpeed'] = Number( dataFrom["圆周移动旋转速度"] || 1.0);
		data['effect_ringRadius'] = Number( dataFrom["圆周移动半径"] || 15);
		
		// > H必然吸附
		data['essentialEnabled'] = String( dataFrom["必然吸附开关"] || "false") == "true";
		data['essentialType'] = Number( dataFrom["必然吸附范围类型"] || 0);
		data['essentialRadius'] = Number( dataFrom["必然吸附半径"] || 16);
		data['essentialWidth'] = Number( dataFrom["必然吸附宽度"] || 32);
		data['essentialHeight'] = Number( dataFrom["必然吸附高度"] || 32);
		
		// > I一般吸附
		data['commonEnabled'] = String( dataFrom["一般吸附开关"] || "false") == "true";
		data['commonType'] = Number( dataFrom["一般吸附范围类型"] || 0);
		data['commonRadius'] = Number( dataFrom["一般吸附半径"] || 90);
		data['commonWidth'] = Number( dataFrom["一般吸附宽度"] || 180);
		data['commonHeight'] = Number( dataFrom["一般吸附高度"] || 180);
		
		// > J交换吸附
		data['exchangeEnabled'] = String( dataFrom["交换吸附开关"] || "false") == "true";
		data['exchangeType'] = Number( dataFrom["交换吸附范围类型"] || 0);
		data['exchangeRadius'] = Number( dataFrom["交换吸附半径"] || 30);
		data['exchangeWidth'] = Number( dataFrom["交换吸附宽度"] || 60);
		data['exchangeHeight'] = Number( dataFrom["交换吸附高度"] || 60);
		
		return data;
	}
	
	/*-----------------吸附槽样式------------------*/
	DrillUp.g_PAS_style_length = 20;
	DrillUp.g_PAS_style = [];
	for( var i = 0; i < DrillUp.g_PAS_style_length; i++ ){
		if( DrillUp.parameters['吸附槽样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['吸附槽样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['吸附槽样式-' + String(i+1) ]);
			DrillUp.g_PAS_style[i] = DrillUp.drill_PAS_styleInit( data );
		}else{
			DrillUp.g_PAS_style[i] = null;
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_PAS_adsorptAnimEnabled = String(DrillUp.parameters['是否启用吸附动画'] || "true") == "true";
	DrillUp.g_PAS_adsorptTime = Number(DrillUp.parameters['吸附时长'] || 20);
	DrillUp.g_PAS_adsorptMoveType = String(DrillUp.parameters['吸附移动方式'] || "弹性移动");


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_PictureDraggable ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_PAS_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PAS_pluginCommand.call(this, command, args);
	if(command === ">图片吸附槽"){
		
		/*-----------------槽 - 对象组获取------------------*/
		var slotIndex_list = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( slotIndex_list == null && temp1.indexOf("批量槽[") != -1 ){
				temp1 = temp1.replace("批量槽[","");
				temp1 = temp1.replace("]","");
				slotIndex_list = [];
				var temp_arr = temp1.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					slotIndex_list.push( Number(temp_arr[k]) );
				}
			}
			if( slotIndex_list == null && temp1.indexOf("批量槽变量[") != -1 ){
				temp1 = temp1.replace("批量槽变量[","");
				temp1 = temp1.replace("]","");
				slotIndex_list = [];
				var temp_arr = temp1.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					slotIndex_list.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( slotIndex_list == null && temp1.indexOf("槽变量[") != -1 ){
				temp1 = temp1.replace("槽变量[","");
				temp1 = temp1.replace("]","");
				var slot = $gameVariables.value( Number(temp1) );
				slotIndex_list = [ slot ];
			}
			if( slotIndex_list == null && temp1.indexOf("槽[") != -1 ){
				temp1 = temp1.replace("槽[","");
				temp1 = temp1.replace("]","");
				var slot = Number(temp1);
				slotIndex_list = [ slot ];
			}
		}
		
		/*-----------------槽 - 建立------------------*/
		if( slotIndex_list != null && args.length == 8 ){		//>图片吸附槽 : 槽[1] : 建立吸附槽 : 样式[1] : 位置[200,300]
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			
			if( type == "建立吸附槽" ){
				if( temp3.indexOf("类型[") != -1 ){
					alert( DrillUp.drill_PAS_getPluginTip_CommandChanged( temp3 ) );
				}
				temp3 = temp3.replace("样式[","");
				temp3 = temp3.replace("]","");
				
				if( temp4.indexOf("变量位置[") != -1 ){
					temp4 = temp4.replace("变量位置[","");
					temp4 = temp4.replace("]","");
					var temp_arr = temp4.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var pos = [ 
							$gameVariables.value( Number(temp_arr[0]) ), 
							$gameVariables.value( Number(temp_arr[1]) )
						];
						var slot_index = slotIndex_list[0];
						$gameScreen.drill_PAS_addSlot_ByIndex( slot_index, pos[0], pos[1], Number(temp3)-1 );
					}
				}
				else if( temp4.indexOf("位置[") != -1 ){
					temp4 = temp4.replace("位置[","");
					temp4 = temp4.replace("]","");
					var temp_arr = temp4.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						var pos = [ 
							Number(temp_arr[0]), 
							Number(temp_arr[1]) 
						];
						var slot_index = slotIndex_list[0];
						$gameScreen.drill_PAS_addSlot_ByIndex( slot_index, pos[0], pos[1], Number(temp3)-1 );
					}
				}
			}
		}
		/*-----------------槽 - 修改属性------------------*/
		if( slotIndex_list != null && args.length == 8 ){	
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			if( type == "修改属性" ){
				if( temp3 == "必然吸附" ){
					if( temp4 == "启用" || temp4 == "开启" || temp4 == "打开" || temp4 == "启动" ){
						for( var k=0; k < slotIndex_list.length; k++ ){
							if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
							var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
							slot._drill_data['essentialEnabled'] = true;
						}
					}
					if( temp4 == "关闭" || temp4 == "禁用" ){
						for( var k=0; k < slotIndex_list.length; k++ ){
							if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
							var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
							slot._drill_data['essentialEnabled'] = false;
						}
					}
				}
				if( temp3 == "一般吸附" ){
					if( temp4 == "启用" || temp4 == "开启" || temp4 == "打开" || temp4 == "启动" ){
						for( var k=0; k < slotIndex_list.length; k++ ){
							if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
							var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
							slot._drill_data['commonEnabled'] = true;
						}
					}
					if( temp4 == "关闭" || temp4 == "禁用" ){
						for( var k=0; k < slotIndex_list.length; k++ ){
							if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
							var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
							slot._drill_data['commonEnabled'] = false;
						}
					}
				}
				if( temp3 == "交换吸附" ){
					if( temp4 == "启用" || temp4 == "开启" || temp4 == "打开" || temp4 == "启动" ){
						for( var k=0; k < slotIndex_list.length; k++ ){
							if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
							var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
							slot._drill_data['exchangeEnabled'] = true;
						}
					}
					if( temp4 == "关闭" || temp4 == "禁用" ){
						for( var k=0; k < slotIndex_list.length; k++ ){
							if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
							var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
							slot._drill_data['exchangeEnabled'] = false;
						}
					}
				}
			}
		}
		if( slotIndex_list != null && args.length == 6 ){	
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( type == "修改属性" ){
				if( temp3.indexOf("最大吸附图片数量[") != -1 ){
					temp3 = temp3.replace("最大吸附图片数量[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot.drill_slot_setMaxAdsorbNum( Number(temp3) );
					}
				}
			}
		}
		if( slotIndex_list != null && args.length == 4 ){	
			var type = String(args[3]);
			if( type == "删除吸附槽" ){
				for(var k = 0; k < slotIndex_list.length; k++ ){
					$gameScreen.drill_PAS_removeSlot_ByIndex( slotIndex_list[k] );
				}
			}
		}
			
		
		/*-----------------槽 - 修改样式属性------------------*/
		if( slotIndex_list != null && args.length == 6 ){	
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( type == "修改属性" ){
				if( temp3.indexOf("必然吸附范围[") != -1 ||
					temp3.indexOf("必然吸附半径[") != -1 ){
					temp3 = temp3.replace("必然吸附范围[","");
					temp3 = temp3.replace("必然吸附半径[","");
					temp3 = temp3.replace("]","");
					for( var k=0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['essentialRadius'] = Number(temp3);
					}
				}
				if( temp3.indexOf("必然吸附宽度[") != -1 ){
					temp3 = temp3.replace("必然吸附宽度[","");
					temp3 = temp3.replace("]","");
					for( var k=0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['essentialWidth'] = Number(temp3);
					}
				}
				if( temp3.indexOf("必然吸附高度[") != -1 ){
					temp3 = temp3.replace("必然吸附高度[","");
					temp3 = temp3.replace("]","");
					for( var k=0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['essentialHeight'] = Number(temp3);
					}
				}
				if( temp3.indexOf("必然吸附范围类型[") != -1 ){
					temp3 = temp3.replace("必然吸附范围类型[","");
					temp3 = temp3.replace("]","");
					for( var k=0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['essentialType'] = Number(temp3);
					}
				}
				
				if( temp3.indexOf("一般吸附范围[") != -1 || 
					temp3.indexOf("一般吸附半径[") != -1 ){
					temp3 = temp3.replace("一般吸附范围[","");
					temp3 = temp3.replace("一般吸附半径[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['commonRadius'] = Number(temp3);
					}
				}
				if( temp3.indexOf("一般吸附宽度[") != -1 ){
					temp3 = temp3.replace("一般吸附宽度[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['commonWidth'] = Number(temp3);
					}
				}
				if( temp3.indexOf("一般吸附高度[") != -1 ){
					temp3 = temp3.replace("一般吸附高度[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['commonHeight'] = Number(temp3);
					}
				}
				if( temp3.indexOf("一般吸附范围类型[") != -1 ){
					temp3 = temp3.replace("一般吸附范围类型[","");
					temp3 = temp3.replace("]","");
					for( var k=0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['commonType'] = Number(temp3);
					}
				}
				
				if( temp3.indexOf("交换吸附范围[") != -1 ||
					temp3.indexOf("交换吸附半径[") != -1 ){
					temp3 = temp3.replace("交换吸附范围[","");
					temp3 = temp3.replace("交换吸附半径[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['exchangeRadius'] = Number(temp3);
					}
				}
				if( temp3.indexOf("交换吸附宽度[") != -1 ){
					temp3 = temp3.replace("交换吸附宽度[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['exchangeWidth'] = Number(temp3);
					}
				}
				if( temp3.indexOf("交换吸附高度[") != -1 ){
					temp3 = temp3.replace("交换吸附高度[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['exchangeHeight'] = Number(temp3);
					}
				}
				if( temp3.indexOf("交换吸附范围类型[") != -1 ){
					temp3 = temp3.replace("交换吸附范围类型[","");
					temp3 = temp3.replace("]","");
					for( var k=0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['exchangeType'] = Number(temp3);
					}
				}
				
				if( temp3.indexOf("浮动效果[") != -1 ){
					temp3 = temp3.replace("浮动效果[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['effect_float'] = temp3;
					}
				}
				if( temp3.indexOf("浮动速度[") != -1 ){
					temp3 = temp3.replace("浮动速度[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['effect_floatSpeed'] = Number(temp3);
					}
				}
				if( temp3.indexOf("浮动偏移量[") != -1 ){
					temp3 = temp3.replace("浮动偏移量[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['effect_floatRange'] = Number(temp3);
					}
				}
				if( temp3.indexOf("圆周移动效果[") != -1 ){
					temp3 = temp3.replace("圆周移动效果[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['effect_ring'] = temp3;
					}
				}
				if( temp3.indexOf("圆周移动起始角度[") != -1 ){
					temp3 = temp3.replace("圆周移动起始角度[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['effect_ringStart'] = Number(temp3);
					}
				}
				if( temp3.indexOf("圆周移动旋转速度[") != -1 ){
					temp3 = temp3.replace("圆周移动旋转速度[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['effect_ringSpeed'] = Number(temp3);
					}
				}
				if( temp3.indexOf("圆周移动半径[") != -1 ){
					temp3 = temp3.replace("圆周移动半径[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot._drill_data['effect_ringRadius'] = Number(temp3);
					}
				}
				
				if( temp3.indexOf("添加槽的吸附类型[") != -1 ){
					temp3 = temp3.replace("添加槽的吸附类型[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot.drill_slot_addAdsorbType( temp3 );
					}
				}
				if( temp3.indexOf("去除槽的吸附类型[") != -1 ){
					temp3 = temp3.replace("去除槽的吸附类型[","");
					temp3 = temp3.replace("]","");
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot.drill_slot_removeAdsorbType( temp3 );
					}
				}
				if( temp3 == "去除槽的全部吸附类型" ){
					for(var k = 0; k < slotIndex_list.length; k++ ){
						if( $gameScreen.drill_PAS_isSlotExist( slotIndex_list[k] ) == false ){ continue; }
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
						slot.drill_slot_removeAllAdsorbType();
					}
				}
			}
		}
		
		/*-----------------槽 - 获取信息------------------*/
		if( slotIndex_list != null && args.length == 6 ){	
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "获取该槽第一个吸附的图片ID" ){
				if( slotIndex_list.length == 1 &&
					temp1.indexOf("变量[") != -1 ){
					temp1 = temp1.replace("变量[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					
					var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[0] );
					var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( slot._drill_productId );
					if( adsorb_list.length == 0 ){
						$gameVariables.setValue( temp1, -1 );
						return;
					}
					var adsorb_controller = adsorb_list[0];
					var pic_id = $gameScreen.drill_PAS_getPictureID_ByAdsorbControllerId( adsorb_controller._drill_productId );
					$gameVariables.setValue( temp1, pic_id );
				}
			}
			if( type == "获取该批量槽第一个吸附的图片ID" ){
				if( Imported.Drill_CoreOfNumberArray ){
					if( temp1.indexOf("数组[") != -1 ){
						temp1 = temp1.replace("数组[","");
						temp1 = temp1.replace("]","");
						var arr = [];
						for(var k = 0; k < slotIndex_list.length; k++ ){
							var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[k] );
							var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( slot._drill_productId );
							if( adsorb_list.length == 0 ){
								arr.push( -1 );
								continue;
							}
							var adsorb_controller = adsorb_list[0];
							var pic_id = $gameScreen.drill_PAS_getPictureID_ByAdsorbControllerId( adsorb_controller._drill_productId );
							arr.push( pic_id );
						}
						$gameNumberArray.setValue( temp1, arr );
					}
				}
			}
			if( type == "获取该槽全部吸附的图片ID" ){
				if( Imported.Drill_CoreOfNumberArray ){
					if( slotIndex_list.length == 1 &&
						temp1.indexOf("数组[") != -1 ){
						temp1 = temp1.replace("数组[","");
						temp1 = temp1.replace("]","");
						
						var slot = $gameScreen.drill_PAS_getSlotController_ByIndex( slotIndex_list[0] );
						var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( slot._drill_productId );
						var arr = [];
						for(var k = 0; k < adsorb_list.length; k++ ){
							var adsorb_controller = adsorb_list[k];
							var pic_id = $gameScreen.drill_PAS_getPictureID_ByAdsorbControllerId( adsorb_controller._drill_productId );
							arr.push( pic_id );
						}
						$gameNumberArray.setValue( temp1, arr );
					}
				}
			}
		}
		
		
		/*-----------------图片 - 对象组获取------------------*/
		var pics = null;
		if( args.length >= 2 ){
			var pic_str = String(args[1]);
			if( pics == null && pic_str.indexOf("批量图片[") != -1 ){
				pic_str = pic_str.replace("批量图片[","");
				pic_str = pic_str.replace("]","");
				pics = [];
				var temp_arr = pic_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && pic_str.indexOf("批量图片变量[") != -1 ){
				pic_str = pic_str.replace("批量图片变量[","");
				pic_str = pic_str.replace("]","");
				pics = [];
				var temp_arr = pic_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && pic_str.indexOf("图片变量[") != -1 ){
				pic_str = pic_str.replace("图片变量[","");
				pic_str = pic_str.replace("]","");
				var pic_id = $gameVariables.value( Number(pic_str) );
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && pic_str.indexOf("图片[") != -1 ){
				pic_str = pic_str.replace("图片[","");
				pic_str = pic_str.replace("]","");
				var pic_id = Number(pic_str);
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		
		/*-----------------图片 - 图片吸附设置------------------*/
		if( pics != null && args.length == 6 ){		//>图片吸附槽 : 图片[1] : 添加吸附类型 : 类型[卡牌A类]
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "吸附功能" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PAS_setCanAdsorb( true );
					}
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PAS_setCanAdsorb( false );
					}
				}
			}
			if( type == "拖拽后可脱离槽" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PAS_setPullOutEnabled( true );
					}
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PAS_setPullOutEnabled( false );
					}
				}
			}
			if( type == "添加吸附类型" ){
				temp1 = temp1.replace("类型[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PAS_addAdsorbType( temp1 );
				}
			}
			if( type == "去除吸附类型" ){
				temp1 = temp1.replace("类型[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PAS_removeAdsorbType( temp1 );
				}
			}
		}
		if( pics != null && args.length == 4 ){		//>图片吸附槽 : 图片[1] : 去除全部吸附类型
			var type = String(args[3]);
			if( type == "关闭吸附功能" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PAS_setCanAdsorb( false );
				}
			}
			if( type == "恢复吸附功能" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PAS_setCanAdsorb( true );
				}
			}
			if( type == "去除全部吸附类型" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PAS_removeAllAdsorbType();
				}
			}
		}
		
		/*-----------------图片 - 图片吸附控制------------------*/
		if( pics != null && args.length == 4 ){
			var temp1 = String(args[3]);
			if( temp1.indexOf("立即吸附到槽[") != -1 ){
				temp1 = temp1.replace("立即吸附到槽[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < pics.length; k++ ){
					var slot_index = Number(temp1);
					pics[k].drill_PAS_doAdsorb2_ByIndex( slot_index );
				}
			}
			else if( temp1.indexOf("吸附到槽[") != -1 ){
				temp1 = temp1.replace("吸附到槽[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < pics.length; k++ ){
					var slot_index = Number(temp1);
					pics[k].drill_PAS_doAdsorb1_ByIndex( slot_index );
				}
			}
			if( temp1 == "立即合并吸附偏移量" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PAS_mergeAdsorbPosition();
				}
			}
			if( temp1 == "立即清零吸附偏移量" ){
				for( var k=0; k < pics.length; k++ ){
					pics[k].drill_PAS_clearAdsorbPosition();
				}
			}
		}
		
		
		/*-----------------图片 - 获取信息------------------*/
		if( pics != null && args.length == 6 ){		//>图片吸附槽 : 图片[1] : 获取该图片吸附的槽ID : 变量[21]
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "获取该图片吸附的槽ID" ){
				if( pics.length == 1 && temp1.indexOf("变量[") != -1 ){
					temp1 = temp1.replace("变量[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					
					var adsorb_controller = pics[0].drill_PAS_getAdsorbController();
					if( adsorb_controller == undefined ){
						$gameVariables.setValue( temp1, -1 );
						return;
					}
					var product_id = adsorb_controller.drill_controllerAdsorb_getSlotId();
					var slot_index = $gameScreen.drill_PAS_getSlotIndex_ByProductId( product_id );
					$gameVariables.setValue( temp1, slot_index );	//（这里告诉玩家使用的是index，而不是product_id）
				}
			}
			if( type == "获取批量图片的吸附的槽ID" ){
				if( Imported.Drill_CoreOfNumberArray ){
					if( pics.length >= 1 && temp1.indexOf("数组[") != -1 ){
						temp1 = temp1.replace("数组[","");
						temp1 = temp1.replace("]","");
						var arr = [];
						for(var k = 0; k < pics.length; k++ ){
							var adsorb_controller = pics[k].drill_PAS_getAdsorbController();
							if( adsorb_controller == undefined ){
								arr.push( -1 );
								continue;
							}
							var product_id = adsorb_controller.drill_controllerAdsorb_getSlotId();
							var slot_index = $gameScreen.drill_PAS_getSlotIndex_ByProductId( product_id );
							arr.push( slot_index );		//（这里告诉玩家使用的是index，而不是product_id）
						}
						$gameNumberArray.setValue( temp1, arr );
					}
				}
			}
		}
		
		/*-----------------设置------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "吸附动画-修改吸附动画开关" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_PAS_adsorptAnimEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_PAS_adsorptAnimEnabled = false;
				}
			}
			if( type == "吸附动画-修改吸附时长" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_PAS_adsorptTime = Number(temp1);
			}
			if( type == "吸附动画-修改吸附移动方式" ){
				$gameSystem._drill_PAS_adsorptMoveType = temp1;
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "槽吸附范围DEBUG显示" ){
				$gameSystem._drill_PAS_DebugEnabled = true;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG吸附槽范围查看" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_PAS_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_PAS_DebugEnabled = false;
				}
			}
		}
	};
};
//==============================
// * 插件指令 - 槽检查
//==============================
Game_Screen.prototype.drill_PAS_isSlotExist = function( slot_id ){
	if( slot_id == 0 ){ return false; }
	
	var slot = this.drill_PAS_getSlotController_ByIndex( slot_id );
	if( slot == undefined ){
		alert( DrillUp.drill_PAS_getPluginTip_SlotNotFind( slot_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PAS_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PAS_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_PAS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PAS_sys_initialize.call(this);
	this.drill_PAS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PAS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PAS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PAS_saveEnabled == true ){	
		$gameSystem.drill_PAS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PAS_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_PAS_initSysData = function() {
	this.drill_PAS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PAS_checkSysData = function() {
	this.drill_PAS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PAS_initSysData_Private = function() {
	
	this._drill_PAS_DebugEnabled = false;									//DEBUG吸附槽范围查看
	
	this._drill_PAS_adsorptAnimEnabled = DrillUp.g_PAS_adsorptAnimEnabled;	//是否启用吸附动画
	this._drill_PAS_adsorptTime = DrillUp.g_PAS_adsorptTime;				//吸附时长
	this._drill_PAS_adsorptMoveType = DrillUp.g_PAS_adsorptMoveType;		//吸附移动方式
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PAS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PAS_adsorptMoveType == undefined ){
		this.drill_PAS_initSysData();
	}
};



//#############################################################################
// ** 标准接口（☆图片吸附管理 标准模块）
//
//			说明：	即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 图片吸附管理 - 获取吸附位置X【标准函数】
//
//			参数：	> 无
//			返回：	> 数字
//					
//			说明：	> 吸附位置X，单位像素。
//					> 注意，吸附后就被固定位置了，与吸附槽的位置始终一致。
//##############################
Game_Picture.prototype.drill_PAS_getAdsorbingX = function(){
	return this.drill_PAS_getAdsorbingX_Private();
}
//##############################
// * 图片吸附管理 - 获取吸附位置Y【标准函数】
//
//			参数：	> 无
//			返回：	> 数字
//					
//			说明：	> 吸附位置Y，单位像素。
//					> 注意，吸附后就被固定位置了，与吸附槽的位置始终一致。
//##############################
Game_Picture.prototype.drill_PAS_getAdsorbingY = function(){
	return this.drill_PAS_getAdsorbingY_Private();
}
//##############################
// * 图片吸附管理 - 立即合并吸附偏移量【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 将吸附槽偏移量转移到图片坐标中，图片显示的位置不会变。
//					> 合并不会改变 吸附状态 。
//##############################
Game_Picture.prototype.drill_PAS_mergeAdsorbPosition = function(){
	this.drill_PAS_mergeAdsorbPosition_Private();
}
//##############################
// * 图片吸附管理 - 立即清零吸附偏移量【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 将吸附槽偏移量清零，图片会立即归位原位置。
//					> 清零会使得 吸附状态 变为 "未吸附"。
//##############################
Game_Picture.prototype.drill_PAS_clearAdsorbPosition = function(){
	this.drill_PAS_clearAdsorbPosition_Private();
}



//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PAS_switch_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_PAS_switchData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PAS_switch_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Picture.prototype.drill_PAS_checkSwitchData = function(){
	
	// > 【图片-可拖拽的图片】强制绑定
	this.drill_PDr_checkSwitchData();
	
	if( this._drill_PAS_switchData != undefined ){ return; }
	this._drill_PAS_switchData = {};
	
	// > 数据 - 图片ID【图片-图片优化核心】
	this._drill_PAS_switchData['pic_id'] = this.drill_COPi_getPictureId();
	
	// > 数据 - 吸附控制器ID【数学模型-拖拽与吸附核心】
	var adsorb_factory = $gameSystem.drill_CODAA_adsorbFactory();
	var product_id = adsorb_factory.drill_factoryAdsorb_create( "PAS" );	//（通过工厂创建控制器，并印上该插件的简称）
	this._drill_PAS_switchData['adsorbController_id'] = product_id;
	
	// > 控制器初始化 - 外键绑定 拖拽控制器ID
	var adsorb_controller = this.drill_PAS_getAdsorbController();
	adsorb_controller.drill_controllerAdsorb_setForeignKey_dragId( this._drill_PDr_switchData['dragController_id'] );
	
	// > 控制器初始化 - 设置吸附动画开关
	adsorb_controller.drill_controllerAdsorb_setAnimEnabled( $gameSystem._drill_PAS_adsorptAnimEnabled );
	
	// > 控制器初始化 - 设置动画时长
	adsorb_controller.drill_controllerAdsorb_setAnim1PlayerTime( $gameSystem._drill_PAS_adsorptTime );
	
	// > 控制器初始化 - 设置动画移动方式
	adsorb_controller.drill_controllerAdsorb_setAnim1MoveType( $gameSystem._drill_PAS_adsorptMoveType );
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PAS_removeSwitchData = function(){
	
	// > 删除控制器
	var controller = this.drill_PAS_getAdsorbController();
	$gameSystem.drill_CODAA_adsorbFactory().drill_factoryAdsorb_remove( controller );
	
	// > 删除数据
	this._drill_PAS_switchData = undefined;
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PAS_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PAS_p_erase.call( this );
	this.drill_PAS_removeSwitchData();						//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PAS_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PAS_removeSwitchData();				//（删除数据）
	}
	_drill_PAS_p_erasePicture.call( this, pictureId );
}

//==============================
// * 图片的属性 - 获取控制器
//
//			说明：	> 该函数返回 吸附控制器 的指针。
//==============================
Game_Picture.prototype.drill_PAS_getAdsorbController = function(){
	if( this._drill_PAS_switchData == undefined ){ return null; }
	var c_id = this._drill_PAS_switchData['adsorbController_id'];
	return $gameSystem.drill_CODAA_adsorbFactory().drill_factoryAdsorb_getByProductId( c_id );
}
//==============================
// * 图片的属性 - 获取图片ID（根据 吸附控制器ID）
//==============================
Game_Screen.prototype.drill_PAS_getPictureID_ByAdsorbControllerId = function( adsorbController_id ){
	
	// > 图片遍历『图片与多场景』
	var i_offset = 0;							//地图界面的图片
	var pic_length = this.maxPictures();
	if( $gameParty.inBattle() == true ){		//战斗界面的图片
		i_offset = pic_length;
	}
	for(var i = 0; i < pic_length; i++ ){
		var picture = this._pictures[ i + i_offset ];
		if( picture == undefined ){ continue; }
		if( picture._drill_PAS_switchData == undefined ){ continue; }
		if( picture._drill_PAS_switchData['adsorbController_id'] == adsorbController_id ){
			return picture._drill_PAS_switchData['pic_id'];
		}
	}
	return -1;
}
//==============================
// * 图片的属性 - 参数 - 设置可吸附
//==============================
Game_Picture.prototype.drill_PAS_setCanAdsorb = function( enabled ){
	this.drill_PAS_checkSwitchData();
	this.drill_PAS_getAdsorbController().drill_controllerAdsorb_setCanAdsorb( enabled );
}
//==============================
// * 图片的属性 - 参数 - 是否可吸附
//==============================
Game_Picture.prototype.drill_PAS_canAdsorb = function(){
	if( this._drill_PAS_switchData == undefined ){ return false; }
	return this.drill_PAS_getAdsorbController().drill_controllerAdsorb_canAdsorb();
}
//==============================
// * 图片的属性 - 参数 - 设置可脱离槽
//==============================
Game_Picture.prototype.drill_PAS_setPullOutEnabled = function( enabled ){
	this.drill_PAS_checkSwitchData();
	this.drill_PAS_getAdsorbController().drill_controllerAdsorb_setPullOutEnabled( enabled );
}
//==============================
// * 图片的属性 - 参数 - 是否可脱离槽
//==============================
Game_Picture.prototype.drill_PAS_pullOutEnabled = function(){
	if( this._drill_PAS_switchData == undefined ){ return false; }
	return this.drill_PAS_getAdsorbController().drill_controllerAdsorb_pullOutEnabled();
}

//==============================
// * 图片的属性 - 参数 - 添加可吸附类型
//==============================
Game_Picture.prototype.drill_PAS_addAdsorbType = function( type_str ){
	this.drill_PAS_checkSwitchData();
	this.drill_PAS_getAdsorbController().drill_controllerAdsorb_addAdsorbType( type_str );
}
//==============================
// * 图片的属性 - 参数 - 去除可吸附类型
//==============================
Game_Picture.prototype.drill_PAS_removeAdsorbType = function( type_str ){
	this.drill_PAS_checkSwitchData();
	this.drill_PAS_getAdsorbController().drill_controllerAdsorb_removeAdsorbType( type_str );
}
//==============================
// * 图片的属性 - 参数 - 去除全部可吸附类型
//==============================
Game_Picture.prototype.drill_PAS_removeAllAdsorbType = function(){
	this.drill_PAS_checkSwitchData();
	this.drill_PAS_getAdsorbController().drill_controllerAdsorb_removeAllAdsorbType();
}

//==============================
// * 图片的属性 - 操作 - 吸附到槽
//==============================
Game_Picture.prototype.drill_PAS_doAdsorb1_ByIndex = function( slot_index ){
	this.drill_PAS_checkSwitchData();
	var slot_controller = $gameScreen.drill_PAS_getSlotController_ByIndex( slot_index );
	if( slot_controller == undefined ){ return; }
	
	var adsorb_controller = this.drill_PAS_getAdsorbController();
	adsorb_controller.drill_controllerAdsorb_setState1( slot_controller );
}
//==============================
// * 图片的属性 - 操作 - 立即吸附到槽
//==============================
Game_Picture.prototype.drill_PAS_doAdsorb2_ByIndex = function( slot_index ){
	this.drill_PAS_checkSwitchData();
	var slot_controller = $gameScreen.drill_PAS_getSlotController_ByIndex( slot_index );
	if( slot_controller == undefined ){ return; }
	
	var adsorb_controller = this.drill_PAS_getAdsorbController();
	adsorb_controller.drill_controllerAdsorb_setState2( slot_controller );
}
//==============================
// * 图片的属性 - 操作 - 立即合并吸附偏移量（私有）
//==============================
Game_Picture.prototype.drill_PAS_mergeAdsorbPosition_Private = function() {
	this.drill_PAS_checkSwitchData();
	var adsorb_controller = this.drill_PAS_getAdsorbController();
	
	// > 吸附时
	if( adsorb_controller.drill_controllerAdsorb_isState1() ||
		adsorb_controller.drill_controllerAdsorb_isState2() ||
		adsorb_controller.drill_controllerAdsorb_isState3() ){
			
		// > 【图片-可拖拽的图片】立即清零拖拽偏移量
		this.drill_PDr_clearDragPosition();
		
		// > 直接覆盖为吸附位置
		this._x = this.drill_PAS_getAdsorbingX();
		this._y = this.drill_PAS_getAdsorbingY();
		
	// > 没吸附时
	}else{
		
		// > 【图片-可拖拽的图片】立即合并拖拽偏移量
		this.drill_PDr_mergeDragPosition();
	}
}
//==============================
// * 图片的属性 - 操作 - 立即清零吸附偏移量（私有）
//==============================
Game_Picture.prototype.drill_PAS_clearAdsorbPosition_Private = function() {
	this.drill_PAS_checkSwitchData();
	
	// > 【图片-可拖拽的图片】立即清零拖拽偏移量
	this.drill_PDr_clearDragPosition();
	
	// > 立即清零吸附偏移量
	var controller = this.drill_PAS_getAdsorbController();
	controller.drill_controllerAdsorb_clearAdsorbPosition();
	
	// > 设置"未吸附"
	controller.drill_controllerAdsorb_setState0();
}


//=============================================================================
// ** ☆图片吸附控制
//
//			说明：	> 此模块管理 图片吸附 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片吸附控制 - 帧刷新
//==============================
var _drill_PAS_p_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function(){
	_drill_PAS_p_update.call( this );
	this.drill_PAS_updateAdsorb();
}
//==============================
// * 图片吸附控制 - 帧刷新吸附
//==============================
Game_Picture.prototype.drill_PAS_updateAdsorb = function() {
	if( this.drill_PAS_canAdsorb() != true ){ return; }
	
	// > 参数 - 原位置
	var cur_orgX = this.drill_PAS_org_finalTransform_x();
	var cur_orgY = this.drill_PAS_org_finalTransform_y();
	
	// > 帧刷新 控制器
	var controller = this.drill_PAS_getAdsorbController();
	controller.drill_controllerAdsorb_update( cur_orgX, cur_orgY );
}

//==============================
// * 图片吸附控制 - 获取吸附位置X（私有）
//==============================
Game_Picture.prototype.drill_PAS_getAdsorbingX_Private = function(){
	if( this._drill_PAS_switchData == undefined ){ return 0; }
	return this.drill_PAS_getAdsorbController().drill_controllerAdsorb_getAdsorbingX();
}
//==============================
// * 图片吸附控制 - 获取吸附位置Y（私有）
//==============================
Game_Picture.prototype.drill_PAS_getAdsorbingY_Private = function(){
	if( this._drill_PAS_switchData == undefined ){ return 0; }
	return this.drill_PAS_getAdsorbController().drill_controllerAdsorb_getAdsorbingY();
}
//==============================
// * 图片吸附控制 - 不含吸附+不含拖拽 的数据最终变换值X
//==============================
Game_Picture.prototype.drill_PAS_org_finalTransform_x = function() {
	this.drill_COPi_finalTransform_x();		//（执行一次函数，就能刷新值）
	return $gameTemp._drill_PAS_org_final_x;
}
//==============================
// * 图片吸附控制 - 不含吸附+不含拖拽 的数据最终变换值Y
//==============================
Game_Picture.prototype.drill_PAS_org_finalTransform_y = function() {
	this.drill_COPi_finalTransform_y();		//（执行一次函数，就能刷新值）
	return $gameTemp._drill_PAS_org_final_y;
}
//==============================
// * 图片吸附控制 - 吸附位置X（继承）
//
//			说明：	> 由于吸附后就被固定位置了，所以这里会覆盖位置。
//==============================
var _drill_PAS_COPi_finalTransform_x = Game_Picture.prototype.drill_COPi_finalTransform_x;
Game_Picture.prototype.drill_COPi_finalTransform_x = function() {
	var xx = _drill_PAS_COPi_finalTransform_x.call(this);
	
	// > 不含吸附+不含拖拽 的数据最终变换值
	//			（减去偏移量【图片-可拖拽的图片】）
	$gameTemp._drill_PAS_org_final_x = xx - this.drill_PDr_getDraggingXOffset();
	
	// > 直接覆盖【图片-图片优化核心】
	if( this._drill_PAS_switchData != undefined ){
		var controller = this.drill_PAS_getAdsorbController();
		if( controller._drill_curState == 1 ||
			controller._drill_curState == 2 ||
			controller._drill_curState == 3 ){
			
			// > 直接覆盖为吸附位置
			return this.drill_PAS_getAdsorbingX_Private();
		}
	}
	return xx;
};
//==============================
// * 图片吸附控制 - 吸附位置Y（继承）
//
//			说明：	> 由于吸附后就被固定位置了，所以这里会覆盖位置。
//==============================
var _drill_PAS_COPi_finalTransform_y = Game_Picture.prototype.drill_COPi_finalTransform_y;
Game_Picture.prototype.drill_COPi_finalTransform_y = function() {
	var yy = _drill_PAS_COPi_finalTransform_y.call(this);
	
	// > 不含吸附+不含拖拽 的数据最终变换值
	//			（减去偏移量【图片-可拖拽的图片】）
	$gameTemp._drill_PAS_org_final_y = yy - this.drill_PDr_getDraggingYOffset();
	
	// > 直接覆盖【图片-图片优化核心】
	if( this._drill_PAS_switchData != undefined ){
		var controller = this.drill_PAS_getAdsorbController();
		if( controller._drill_curState == 1 ||
			controller._drill_curState == 2 ||
			controller._drill_curState == 3 ){
			
			// > 直接覆盖为吸附位置
			return this.drill_PAS_getAdsorbingY_Private();
		}
	}
	return yy;
};



//=============================================================================
// ** ☆吸附槽容器
//
//			说明：	> 此模块提供 吸附槽数据 的存储功能，绑定于 $gameScreen 中。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 吸附槽容器 - 初始化
//==============================
var _drill_PAS_screen_initialize = Game_Screen.prototype.initialize;
Game_Screen.prototype.initialize = function() {
	_drill_PAS_screen_initialize.call(this);
	this._drill_PAS_slotIdTank = [];		//吸附槽ID容器
};
//==============================
// * 吸附槽容器 - 添加吸附槽（开放函数）
//
//			说明：	> index 是吸附槽ID容器的索引位置，与 工厂标识 互为映射关系。
//==============================
Game_Screen.prototype.drill_PAS_addSlot_ByIndex = function( index, x, y, style_id ){
	var data = DrillUp.g_PAS_style[ style_id ];
	if( data == null ){ return; }
	
	// > A主体
	var c_data = JSON.parse(JSON.stringify( data ));
	c_data['x'] = x;
	c_data['y'] = y;
	
	// > 删除 旧控制器
	this.drill_PAS_removeSlot_ByIndex( index );
	
	// > 创建控制器
	var slot_factory = $gameSystem.drill_CODAA_slotFactory();
	var product_id = slot_factory.drill_factorySlot_create( "PAS", c_data );
	this._drill_PAS_slotIdTank[ index ] = product_id;
};
//==============================
// * 吸附槽容器 - 删除吸附槽（开放函数）
//==============================
Game_Screen.prototype.drill_PAS_removeSlot_ByIndex = function( index ){
	
	// > 删除控制器
	if( this._drill_PAS_slotIdTank != undefined ){
		var product_id = this._drill_PAS_slotIdTank[ index ];
		if( product_id != undefined ){
			$gameSystem.drill_CODAA_slotFactory().drill_factorySlot_removeByProductId( product_id );
		}
	}
	
	this._drill_PAS_slotIdTank[ index ] = undefined;
};
//==============================
// * 吸附槽容器 - 获取吸附槽 - 根据索引（开放函数）
//==============================
Game_Screen.prototype.drill_PAS_getSlotController_ByIndex = function( index ){
	var product_id = this._drill_PAS_slotIdTank[ index ];
	return this.drill_PAS_getSlotController_ByProductId( product_id );
};
//==============================
// * 吸附槽容器 - 获取吸附槽 - 根据工厂标识（开放函数）
//==============================
Game_Screen.prototype.drill_PAS_getSlotController_ByProductId = function( productId ){
	return $gameSystem.drill_CODAA_slotFactory().drill_factorySlot_getByProductId( productId );
};
//==============================
// * 吸附槽容器 - 获取索引 根据工厂标识
//==============================
Game_Screen.prototype.drill_PAS_getSlotIndex_ByProductId = function( productId ){
	for(var i = 0; i < this._drill_PAS_slotIdTank.length; i++ ){
		var id = this._drill_PAS_slotIdTank[i];
		if( id == productId ){
			return i;
		}
	}
	return -1;
};


//=============================================================================
// ** ☆吸附槽控制
//
//			说明：	> 此模块管理 吸附槽 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 吸附槽容器 - 帧刷新
//==============================
var _drill_PAS_screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
	_drill_PAS_screen_update.call(this);
	this.drill_PAS_updateSlotTank();
};
//==============================
// * 吸附槽容器 - 帧刷新吸附槽
//==============================
Game_Screen.prototype.drill_PAS_updateSlotTank = function() {
	if( this._drill_PAS_slotIdTank == undefined ){ return; }
	for(var i = 0; i < this._drill_PAS_slotIdTank.length; i++ ){
		var product_id = this._drill_PAS_slotIdTank[i];
		var controller = this.drill_PAS_getSlotController_ByProductId( product_id );
		if( controller == undefined ){ continue; }
		controller.drill_slot_update();
	}
};



//=============================================================================
// ** ☆DEBUG吸附槽范围
//
//			说明：	> 此模块专门管理 DEBUG吸附槽范围 显示功能。
//					> 注意，只显示。这个模块删掉也不会影响主功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG吸附槽范围 - 帧刷新（地图界面）
//==============================
var _drill_PAS_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_PAS_debugMap_update.call(this);
    this.drill_PAS_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_PAS_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG吸附槽范围 - 帧刷新 初始化贴图
//==============================
Scene_Map.prototype.drill_PAS_updateDrawBeanRangeSprite = function() {
	
	// > 功能关闭时
	if( $gameSystem._drill_PAS_DebugEnabled != true ){
		
		// > 销毁贴图
		if( this._drill_PAS_DebugSprite != undefined ){
			this.removeChild(this._drill_PAS_DebugSprite);
			this._drill_PAS_DebugSprite = undefined;
		}
		
	// > 功能开启时
	}else{
		
		// > 创建贴图
		if( this._drill_PAS_DebugSprite == undefined ){
			var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
			var temp_sprite = new Sprite();
			temp_sprite.x = 0;
			temp_sprite.y = 0;
			temp_sprite.bitmap = temp_bitmap;
			this.addChild( temp_sprite );	//（直接加在最顶层的上面）
			this._drill_PAS_DebugSprite = temp_sprite;
		}
	}
}
//==============================
// * DEBUG吸附槽范围 - 帧刷新 绘制范围
//==============================
Scene_Map.prototype.drill_PAS_updateDrawBeanRangeBitmap = function() {
	if( this._drill_PAS_DebugSprite == undefined ){ return; }
	
	// > 清空绘制
	var temp_bitmap = this._drill_PAS_DebugSprite.bitmap;
	temp_bitmap.clear();
	
	// > 吸附槽遍历
	for(var i = 0; i < $gameScreen._drill_PAS_slotIdTank.length; i++ ){
		var product_id = $gameScreen._drill_PAS_slotIdTank[i];
		var slot_controller = $gameScreen.drill_PAS_getSlotController_ByProductId( product_id );
		if( slot_controller == undefined ){ continue; }
		
		// > 必然吸附
		slot_controller.drill_slot_drawEssentialRange( temp_bitmap, "rgba(0,255,215,0.2)", "rgba(0,255,215,1)" );
		
		// > 一般吸附
		slot_controller.drill_slot_drawCommonRange( temp_bitmap, "rgba(0,255,145,0.3)", "rgba(0,255,145,1)" );
		
		// > 交换吸附
		slot_controller.drill_slot_drawExchangeRange( temp_bitmap, "rgba(0,255,95,0.3)", "rgba(0,255,95,1)" );
		
		// > 绘制 编号 + 吸附类型
		var cur_str = String(i);	//（索引号就是 吸附槽容器的index）
		//cur_str += "<";
		//cur_str += String( slot_controller._drill_productId );
		//cur_str += ">";
		temp_bitmap.drill_PAS_drawCustomText( cur_str, slot_controller.drill_slot_x() -4, slot_controller.drill_slot_y() +4, "rgba(0,255,145,1)" );
	}
	
	// > 图片遍历『图片与多场景』（显示所有图片的悬停范围）
	var i_offset = 0;							//地图界面的图片
	var pic_length = $gameScreen.maxPictures();
	if( $gameParty.inBattle() == true ){		//战斗界面的图片
		i_offset = pic_length;
	}
	for(var i = 0; i < pic_length; i++ ){
		var picture = $gameScreen._pictures[ i + i_offset ];
		if( picture == undefined ){ continue; }
		
		// > 绘制 - 颜色标记
		var color_line = "rgb(200,255,230)";
		
		// > 绘制 - 矩形中心点
		var xx = picture.drill_COPi_finalTransform_x();  //【图片-图片优化核心】『图片数据最终变换值』
		var yy = picture.drill_COPi_finalTransform_y();
		temp_bitmap.drawCircle( xx, yy, 11, color_line );
		temp_bitmap.drawCircle( xx, yy, 5, "#ff0000" );
		
		// > 绘制 - 无吸附功能时
		if( picture.drill_PAS_canAdsorb() != true ){
			var pic_id_str = String(i);
			pic_id_str += "无吸附功能";
			temp_bitmap.drill_PAS_drawCustomText( pic_id_str, xx+10, yy, color_line );
			continue;
		}
		
		// > 绘制 - 有吸附功能时
		var adsorb_controller = picture.drill_PAS_getAdsorbController();
		
		// > 绘制 - 图片id + 吸附状态 + 吸附的槽id + 吸附类型
		var cur_str = String(i);	//（此处i就是图片id）
		var adsorb_index = $gameScreen.drill_PAS_getSlotIndex_ByProductId( adsorb_controller._drill_foreignKey_slotId );
		cur_str += adsorb_controller.drill_controllerAdsorb_getAdsorbingStateString();
		cur_str += "(";
		cur_str += String( adsorb_index );
		cur_str += ")";
		//cur_str += "<";
		//cur_str += String( adsorb_controller._drill_productId );
		//cur_str += ">";
		temp_bitmap.drill_PAS_drawCustomText( cur_str, xx+10, yy, color_line );
	}
}
//==============================
// * DEBUG吸附槽范围 - 帧刷新（战斗界面）
//==============================
var _drill_PAS_debugBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_PAS_debugBattle_update.call( this );
    this.drill_PAS_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_PAS_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG吸附槽范围 - 函数赋值『图片与多场景』
//==============================
Scene_Battle.prototype.drill_PAS_updateDrawBeanRangeSprite = Scene_Map.prototype.drill_PAS_updateDrawBeanRangeSprite;
Scene_Battle.prototype.drill_PAS_updateDrawBeanRangeBitmap = Scene_Map.prototype.drill_PAS_updateDrawBeanRangeBitmap;

//==============================
// * DEBUG吸附槽范围 - 绘制自定义文本
//==============================
Bitmap.prototype.drill_PAS_drawCustomText = function( str, x, y, color_text ){
	var painter = this._context;
	painter.save();										//（a.存储上一个画笔状态）
	
	this.fontSize = 18;									//（b.设置样式）
	painter.font = this._makeFontNameText();
	painter.fillStyle = color_text;
	painter.strokeStyle = "rgba(0,0,0,0.7)";
	painter.lineWidth = 4;
	painter.lineJoin = 'round';
	
	painter.strokeText( str, x, y, 120 );				//（c.路径填充/描边，fillText）
	painter.fillText( str, x, y, 120 ); 
	
	painter.restore();									//（d.回滚上一个画笔状态）
    this._setDirty();
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureAdsorptionSlot = false;
		var pluginTip = DrillUp.drill_PAS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

