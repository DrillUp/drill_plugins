//=============================================================================
// Drill_BombCustomDefine.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        炸弹人 - 自定义炸弹
 * @author Drill_up
 * 
 * @Drill_LE_param "玩家炸弹-火力%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_BoCD_p_list_length"
 * 
 * @Drill_LE_param "事件炸弹-火力%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_BoCD_e_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BombCustomDefine +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 通过该插件扩展，你可以完全自定义炸弹事件、剩余时间、爆炸区域等。
 * ★★必须放在"基于"的所有的插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须拥有下列插件作为基础，才能运行。
 * 基于：
 *   - Drill_BombCore      炸弹人-游戏核心★★v1.3及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.更多详细介绍，去看看 "29.炸弹人 > 关于炸弹人游戏.docx"。
 * 模板：
 *   (1.自定义炸弹即通过事件复制器的方式，把你在模板地图中设置的事件，
 *      作为炸弹功能放置在玩家脚下。
 *   (2.建议将所有炸弹都放在一个专门的模板管理地图中，便于管理。
 *   (3.由于放置的炸弹事件可完全自定义，你甚至可以跳出炸弹的局限，制作
 *      其它放置类的游戏。
 * 炸弹细节：
 *   (1.炸弹人控制台插件指令可以控制，使用 自定义炸弹 或 标准炸弹。
 *   (2.插件配置的火力值相当于自定义炸弹的编号id。
 *      如果对应的火力没有自定义炸弹配置，则使用标准炸弹。
 *   (3.自定义炸弹最好只在最后一段时间爆炸，不要时间分段或者多次爆炸，
 *      因为ai识别不出来。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 自定义炸弹属性
 * 你需要将定义了注释的炸弹存放在一个模板地图中，事件/玩家执行放置炸弹动
 * 作时，会自动复制指定的炸弹。
 * 
 * 事件注释：=>炸弹人核心 : 阵营 : 忽视单位
 * 事件注释：=>炸弹人核心 : AI识别爆炸时长 : 180
 * 
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 可变激光区域 : 东,南,西,北 : 2 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 可变激光区域 : 穿透类型 : 炸弹人-角色
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 可变激光区域 : 穿透类型 : 炸弹人-透明墙
 * 
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 菱形区域 : 1 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 方形区域 : 1 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 圆形区域 : 1 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 十字区域 : 1 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 横条区域 : 1 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 竖条区域 : 1 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 自定义区域 : 1 : 炸弹人-爆炸
 * 事件注释：=>炸弹人核心 : AI识别爆炸区域 : 固定区域 : 含筛选器 : 2
 * 
 * 1.自定义炸弹的爆炸属性跨事件页。
 * 2.注意，炸弹属性设置后，AI会根据炸弹的属性来做躲避决策。
 *   注意设置的属性要和实际爆炸的效果匹配。
 * 3.标准炸弹和自定义炸弹都属于 忽视单位 ，并且能堵路。
 * 4.你设置了自定义爆炸区域形状后，最好单独测试一下小爱丽丝躲避的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 开启自定义炸弹
 * 你可以使用插件指令切换标准炸弹与自定义炸弹：
 * 
 * 插件指令：>炸弹人控制台 : 玩家使用自定义炸弹
 * 插件指令：>炸弹人控制台 : 玩家使用标准炸弹
 * 插件指令：>炸弹人控制台 : 事件使用自定义炸弹
 * 插件指令：>炸弹人控制台 : 事件使用标准炸弹
 * 
 * 1."事件使用自定义炸弹"对所有事件的炸弹有效。
 *   需要注意的是，目前AI具备躲避自定义炸弹的能力，但是她不知道自己的自定
 *   义炸弹是什么威力范围。只会按照标准炸弹来攻击。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 放置炸弹
 * 你可以使用以下指令：
 * 
 * 插件指令：>炸弹人控制台 : 创建自定义炸弹 : 21 : 21 : 3
 * 插件指令：>事件复制器 : 复制其他图事件 : 1 : 3 : 指定位置 : 4 : 4
 * 
 * 1."创建自定义炸弹"参数分别为：x，y，事件自定义炸弹配置的编号。
 * 2.你可以直接使用事件复制器复制到地图中，AI也能够识别。
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
 * 时间复杂度： o(n^3) 每帧
 * 测试方法：   在炸弹人管理层让AI躲避炸弹，测试性能。
 * 测试结果：   200个事件的地图中，消耗为：【27.37ms】
 *              100个事件的地图中，消耗为：【24.19ms】
 *               50个事件的地图中，消耗为：【21.48ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.虽然AI会实时判断炸弹的位置，但是消耗并不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了游戏时，对地图id的校验检查功能。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * @param ----自定义玩家炸弹----
 * @default 
 * 
 * @param 玩家初始是否启用
 * @parent ----自定义玩家炸弹----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 关闭表示初始使用标准炸弹，自定义炸弹可以通过插件指令切换。
 * @default false
 * 
 * @param 玩家炸弹-火力1
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力1的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力2
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力2的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力3
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力3的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力4
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力4的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力5
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力5的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力6
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力6的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力7
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力7的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力8
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力8的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力9
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力9的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力10
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力10的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力11
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力11的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力12
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力12的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力13
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力13的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力14
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力14的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力15
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力15的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力16
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力16的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力17
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力17的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力18
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力18的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力19
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力19的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力20
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力20的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力21
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力21的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力22
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力22的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力23
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力23的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力24
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力24的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力25
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力25的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力26
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力26的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力27
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力27的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力28
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力28的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力29
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力29的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 玩家炸弹-火力30
 * @parent ----自定义玩家炸弹----
 * @type struct<CustomBomb>
 * @desc 火力30的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param ----自定义事件炸弹----
 * @default 
 * 
 * @param 事件初始是否启用
 * @parent ----自定义事件炸弹----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 关闭表示初始使用标准炸弹，自定义炸弹可以通过插件指令切换。
 * @default false
 * 
 * @param 事件炸弹-火力1
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力1的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力2
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力2的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力3
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力3的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力4
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力4的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力5
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力5的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力6
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力6的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力7
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力7的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力8
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力8的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力9
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力9的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力10
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力10的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力11
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力11的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力12
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力12的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力13
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力13的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力14
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力14的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力15
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力15的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力16
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力16的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力17
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力17的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力18
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力18的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力19
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力19的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力20
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力20的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力21
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力21的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力22
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力22的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力23
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力23的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力24
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力24的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力25
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力25的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力26
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力26的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力27
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力27的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力28
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力28的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力29
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力29的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 * @param 事件炸弹-火力30
 * @parent ----自定义事件炸弹----
 * @type struct<CustomBomb>
 * @desc 火力30的自定义炸弹，达到火力时对应当前的炸弹事件。（最好统一把炸弹放在模板管理层）
 * @default 
 * 
 */
/*~struct~CustomBomb:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的自定义炸弹==
 * 
 * @param 是否开启
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 自定义炸弹所在地图ID
 * @type number
 * @min 1
 * @desc 自定义炸弹所处的模板地图。
 * @default 1
 * 
 * @param 自定义炸弹对应的事件ID
 * @type number
 * @min 1
 * @desc 自定义炸弹所对应的模板事件ID。
 * @default 1
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BoCD （Bomb_Custom_Define）
//		临时全局变量	DrillUp.g_BoCD_xxx
//		临时局部变量	this._drill_BoCD_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3) 每帧
//		★性能测试因素	炸弹人对战游戏
//		★性能测试消耗	24.19ms
//		★最坏情况		所有事件都在躲炸弹。
//		★备注			其实AI识别部分在核心，而该插件只是添加自定义区域的识别。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			自定义炸弹
//				->火力对应自定义炸弹id
//				->事件复制器指令
//				->标准炸弹是否可举起	x
//
//		★必要注意事项：
//			暂无
//	
//		★其它说明细节：
//			1.核心需要支持穿透炸弹的效果。
//			2.这里的炸弹数据，都会缓存到temp中，用到时才会new事件。
//		
//		★存在的问题：
//			1.AI目前没法知道自己的炸弹是什么样的火力、范围。
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BombCustomDefine = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BombCustomDefine');
	
	DrillUp.g_BoCD_p_canPick = String(DrillUp.parameters["玩家标准炸弹是否可举起"] || "true") == "true";
	DrillUp.g_BoCD_p_throwRange = Number(DrillUp.parameters["玩家标准炸弹投掷距离"] || 1);
	DrillUp.g_BoCD_e_canPick = String(DrillUp.parameters["事件标准炸弹是否可举起"] || "true") == "true";
	DrillUp.g_BoCD_e_throwRange = Number(DrillUp.parameters["事件标准炸弹投掷距离"] || 1);
	
	DrillUp.g_BoCD_p_enable = String(DrillUp.parameters["玩家初始是否启用"] || "false") == "true";
	DrillUp.g_BoCD_e_enable = String(DrillUp.parameters["事件初始是否启用"] || "false") == "true";
	
	DrillUp.g_BoCD_p_list_length = 30;
	DrillUp.g_BoCD_p_list = [];
	for( var i = 0; i < DrillUp.g_BoCD_p_list_length; i++ ){
		if( DrillUp.parameters['玩家炸弹-火力' + String(i+1) ] != "" ){
			DrillUp.g_BoCD_p_list[i] = JSON.parse(DrillUp.parameters['玩家炸弹-火力' + String(i+1) ]);
			DrillUp.g_BoCD_p_list[i]['enable'] = String(DrillUp.g_BoCD_p_list[i]["是否开启"] || "true") == "true";
			DrillUp.g_BoCD_p_list[i]['map_id'] = Number(DrillUp.g_BoCD_p_list[i]["自定义炸弹所在地图ID"]);
			DrillUp.g_BoCD_p_list[i]['event_id'] = Number(DrillUp.g_BoCD_p_list[i]["自定义炸弹对应的事件ID"]);
		}else{
			DrillUp.g_BoCD_p_list[i] = [];
		}
	}
	DrillUp.g_BoCD_e_list_length = 30;
	DrillUp.g_BoCD_e_list = [];
	for( var i = 0; i < DrillUp.g_BoCD_e_list_length; i++ ){
		if( DrillUp.parameters['事件炸弹-火力' + String(i+1) ] != "" ){
			DrillUp.g_BoCD_e_list[i] = JSON.parse(DrillUp.parameters['事件炸弹-火力' + String(i+1) ]);
			DrillUp.g_BoCD_e_list[i]['enable'] = String(DrillUp.g_BoCD_e_list[i]["是否开启"] || "true") == "true";
			DrillUp.g_BoCD_e_list[i]['map_id'] = Number(DrillUp.g_BoCD_e_list[i]["自定义炸弹所在地图ID"]);
			DrillUp.g_BoCD_e_list[i]['event_id'] = Number(DrillUp.g_BoCD_e_list[i]["自定义炸弹对应的事件ID"]);
		}else{
			DrillUp.g_BoCD_e_list[i] = [];
		}
	}
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_BombCore ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_BoCD_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BoCD_pluginCommand.call(this, command, args);
	if( command === ">炸弹人控制台" ){
		
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "玩家使用标准炸弹" ){
				$gameSystem._drill_BoCD_playerCustomBomb = false;
			}
			if( type == "玩家使用自定义炸弹" ){
				$gameSystem._drill_BoCD_playerCustomBomb = true;
			}
			if( type == "事件使用标准炸弹" ){
				$gameSystem._drill_BoCD_eventCustomBomb = false;
			}
			if( type == "事件使用自定义炸弹" ){
				$gameSystem._drill_BoCD_eventCustomBomb = true;
			}
		}
		if(args.length == 8){
			var type = String(args[1]);
			var temp1 = Number(args[3]);
			var temp2 = Number(args[5]);
			var temp3 = Number(args[7]);
			
			if( type == "创建自定义炸弹" ){
				var temp_bool = $gameSystem._drill_BoCD_eventCustomBomb;
				$gameSystem._drill_BoCD_eventCustomBomb = true;
				var input_data = {
					'x':temp1,
					'y':temp2,
					'fire':temp3,
					'time':null,
					'bomber':"控制台(事件)",
					'bomber_obj':null
				}
				$gameMap.drill_BoC_putBomb(input_data);
				$gameSystem._drill_BoCD_eventCustomBomb = temp_bool;
			}
		}
	}
};

//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_BoCD_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BoCD_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BoCD_sys_initialize.call(this);
	this.drill_BoCD_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BoCD_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BoCD_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BoCD_saveEnabled == true ){	
		$gameSystem.drill_BoCD_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BoCD_initSysData();
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
Game_System.prototype.drill_BoCD_initSysData = function() {
	this.drill_BoCD_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BoCD_checkSysData = function() {
	this.drill_BoCD_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BoCD_initSysData_Private = function() {
	this._drill_BoCD_playerCustomBomb = DrillUp.g_BoCD_p_enable;
	this._drill_BoCD_eventCustomBomb = DrillUp.g_BoCD_e_enable;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BoCD_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BoCD_playerCustomBomb == undefined ){
		this.drill_BoCD_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（不含容器）
};


//=============================================================================
// * 地图数据预加载
//=============================================================================
var _drill_BoCD_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_BoCD_temp_initialize.call(this);
	
	// > 统计配置的地图id
	var maps = {};
	for(var i = 0; i<DrillUp.g_BoCD_p_list.length; i++){
		var temp = DrillUp.g_BoCD_p_list[i];
		if( temp['map_id'] ){
			maps[ temp['map_id'] ] = true;
		}
	}
	for(var i = 0; i<DrillUp.g_BoCD_e_list.length; i++){
		var temp = DrillUp.g_BoCD_e_list[i];
		if( temp['map_id'] ){
			maps[ temp['map_id'] ] = true;
		}
	}
	var map_ids = Object.keys(maps);
	
	// > 初始化时读取地图数据
	this._drill_BoCD_dataMaps = [];
	for( var i=0; i < map_ids.length; i++ ){
		var map_id = map_ids[i];
		if( this.drill_BoCD_hasMapId( map_id ) ){
			this._drill_BoCD_dataMaps[ map_ids[i] ] = DataManager.drill_getMapData( map_ids[i] );
			
		}else{
			this._drill_BoCD_dataMaps[ map_ids[i] ] = null;
			alert(
				"【Drill_BombCustomDefine.js 炸弹人 - 自定义炸弹】\n" + 
				"你在插件配置中，配置了模板地图"+ map_ids +"中的自定义炸弹事件id。\n"+
				"但是系统并没有找到这个地图文件。\n"+
				"请检查你的地图文件是否存在，或者修改插件配置的内容。"
			);
		}
	}
};
//==============================
// ** 检查地图id
//==============================
Game_Temp.prototype.drill_BoCD_hasMapId = function( map_id ) {	
	for( var j=0; j < $dataMapInfos.length; j++ ){
		var temp_info = $dataMapInfos[j];
		if( temp_info != undefined && temp_info['id'] == map_id ){
			return true;
		}
	}
	return false;
}

//=============================================================================
// ** 炸弹 - 放置总流程
//=============================================================================
var _drill_BoCD_BoC_putBomb = Game_Map.prototype.drill_BoC_putBomb;
Game_Map.prototype.drill_BoC_putBomb = function( input_data ) {
	if( $gameSystem._drill_BoC_canPutBomb == false ){ return -1; }
	
	if( $gameSystem._drill_BoCD_playerCustomBomb == true &&	//玩家自定义炸弹
		( input_data['bomber'] == "玩家" ) ){
		var temp = DrillUp.g_BoCD_p_list[ input_data['fire']-1 ];
			
		if( temp['enable'] && this.drill_BoC_isBombCanPut( input_data['x'],input_data['y'] ) ){	//验证炸弹是否能放
			// > 找到火力对应的地图事件
			var map_data = $gameTemp._drill_BoCD_dataMaps[ temp['map_id'] ];
			var data = JSON.parse(JSON.stringify( map_data.events[ temp['event_id'] ] ));
			data['x'] = input_data['x'];
			data['y'] = input_data['y'];
			if( !data['meta'] ){ data['meta'] = {}; }		//镜像错误兼容
			
			// > 新建炸弹事件
			var e = $gameMap.drill_newEvent_createEvent(data);
			
			// > 放置音效
			var _putSound = input_data['putSound'] || DrillUp.g_BoC_bombPutSound;
			if( _putSound ){
				var se = {};
				se.name = _putSound;
				se.pitch = 100;
				se.volume = 100;
				AudioManager.playSe(se);
			}
			return e._eventId;
		}
	}
	if( $gameSystem._drill_BoCD_eventCustomBomb == true &&	//事件自定义炸弹
		( input_data['bomber'] == "事件" || input_data['bomber'] == "控制台(事件)" ) ){
		var temp = DrillUp.g_BoCD_e_list[ input_data['fire']-1 ];
			
		if( temp['enable'] && this.drill_BoC_isBombCanPut( input_data['x'],input_data['y'] ) ){	//验证炸弹是否能放
			// > 找到火力对应的地图事件
			var map_data = $gameTemp._drill_BoCD_dataMaps[ temp['map_id'] ];
			var data = JSON.parse(JSON.stringify( map_data.events[ temp['event_id'] ] ));
			data['x'] = input_data['x'];
			data['y'] = input_data['y'];
			if( !data['meta'] ){ data['meta'] = {}; }		//镜像错误兼容
			
			// > 新建炸弹事件
			var e = $gameMap.drill_newEvent_createEvent(data);
			
			// > 放置音效
			var _putSound = input_data['putSound'] || DrillUp.g_BoC_bombPutSound;
			if( _putSound ){	//放置音效
				var se = {};
				se.name = _putSound;
				se.pitch = 100;
				se.volume = 100;
				AudioManager.playSe(se);
			}
			return e._eventId;
		}
			
	}
	
	return _drill_BoCD_BoC_putBomb.call( this, input_data );
}

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BombCustomDefine = false;
		alert(
			"【Drill_BombCustomDefine.js 炸弹人 - 自定义炸弹】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_BombCore 炸弹人-游戏核心"
		);
}

