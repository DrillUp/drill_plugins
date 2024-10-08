//=============================================================================
// Drill_EventUnification.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        体积 - 事件一体化
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventUnification +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得多个相同标签的事件完全绑定在一起，形成一个整体。
 * ★★必须放在 基于 的插件后面★★
 * ★★必须放在 物体-移动速度 的插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于插件才能运行。并且可以被其他插件扩展。
 * 基于：
 *   - Drill_EventThrough        体积-事件穿透关系
 *     通过该插件，才能进行物体整体移动。
 * 可被扩展：
 *   - Drill_MoveSpeed           物体-移动速度★★v1.3以上★★
 *     通过移动速度插件，精确的速度也能够统一。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件和玩家。
 * 已弃用的插件：
 *   (1.该插件已被其他插件替换，所以此插件弃用。
 *      快去使用最新的插件：
 *      Drill_EventUnificationOfDirection 体积 - 一体化 & 朝向
 *      Drill_EventUnificationOfMove 体积 - 一体化 & 移动
 *      Drill_EventUnificationOfTrigger 体积 - 一体化 & 触发
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   与鼠标触发插件一起使用，设置鼠标触发的十几个一体化事件，
 *              放置在不同的地图中检测消耗。
 * 测试结果：   200个事件的地图中，消耗为：【54.50ms】
 *              100个事件的地图中，消耗为：【30.08ms】
 *               50个事件的地图中，消耗为：【20.28ms】
 * 测试方法2：  直接在设计华容道地图中测试性能。
 * 测试结果2：  100个一体化事件，消耗为：【152.46ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行的插件几乎没有消耗，但考虑到该插件与鼠标触发组合使用
 *   情况，会多出一定的消耗量。因为鼠标触发是持续执行的。
 * 3.插件反复优化了多次，能稍微经得起超多事件的消耗。
 *   （经不起消耗的插件一般会直接爆炸升到 1500ms 以上。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构，规范了插件指令，
 * 修复了玩家一体化的bug，并且添加了玩家初始标签设置。
 * [v1.2]
 * 修复了一体化斜向移动时的bug。
 * [v1.3]
 * 修复了一体化朝向初始状态时，事件方向不一致的bug。
 * [v1.4]
 * 修复了 移动一体化 造成跟随队员颤抖的bug。
 * [v1.5]
 * 修改了插件分类。
 * [v1.6]
 * 拆解了插件，插件已弃用。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EU（Event_Unification）
//		临时全局变量	无
//		临时局部变量	this._drill_EU.xxx
//						$gameTemp.drill_EU_xxx函数
//		存储数据变量	$gameSystem._drill_EU_player
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.moveStraight	（半覆写）
//						Game_CharacterBase.prototype.moveDiagonally	（半覆写）
//						Game_CharacterBase.prototype.setDirection	（半覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	体积管理层
//		★性能测试消耗	暂无
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//
//		★其它说明细节：
//			暂无
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
	DrillUp.g_EU_PluginTip_curName = "Drill_EventUnification.js 体积-事件一体化";
	DrillUp.g_EU_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 插件已弃用
	//==============================
	DrillUp.drill_EU_getPluginTip_EventNotFind = function(){
		return "【" + DrillUp.g_EU_PluginTip_curName + "】\n该插件已弃用，已经被拆解成了下面三个插件：\n" + 
		"Drill_EventUnificationOfDirection 体积 - 一体化 & 朝向 \n"+ 
		"Drill_EventUnificationOfMove 体积 - 一体化 & 移动 \n"+ 
		"Drill_EventUnificationOfTrigger 体积 - 一体化 & 触发 \n"+
		"详细介绍可以去看看：27.体积 > 关于事件一体化.docx ";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventUnification = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventUnification');
	
	
	// > 『已弃用的插件』
	alert( DrillUp.drill_EU_getPluginTip_EventNotFind() );
	
	