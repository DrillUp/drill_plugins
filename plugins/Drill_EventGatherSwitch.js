//=============================================================================
// Drill_EventGatherSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体 - 聚集开关
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventGatherSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当聚集开关聚集的数量超过一定值时，可以触发独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 * 复合传感器：
 *   (1.聚集开关被划分为复合传感器类。
 *      复合传感器用于监听多个事件的条件，开启指定事件的独立开关。
 *      当聚集开关聚集的数量超过一定值时，独立开关会自动开启。
 *   (2.聚集开关的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 聚集开关与钥匙：
 *   (1."聚集开关"可以理解为带电池带灯泡的物体。
 *      "聚集钥匙"可以理解为只带电池的物体。
 *      多个电池相邻才能相互点亮灯泡，触发独立开关。
 *   (2.假设聚集条件为"大于等于[2]"，但是碰巧有2个开关相隔，中间插入了第3个开关，
 *      那么这3个开关都会被同时触发。
 *   (3.如果你需要获取聚集触发的数量，可以使用插件指令获取上一次聚集数量。
 * 延迟触发：
 *   (1.该插件有两个参数设置："是否优化每帧计算量" 和 "触发延迟时间"。
 *      若关闭优化，触发延迟时间设为0，则表示 物体聚集后立刻触发 。
 *   (2.但如果这样设置，会因为聚集开关触发的"太快了"而造成一些麻烦。
 *      设计-消除砖块 的关卡中，常规理解为：等砖块落地停稳后再触发聚集开关，
 *      但如果物体聚集后立刻触发，会导致砖块还没落地，就与中途接触的砖块触发了。
 * 关闭聚集开关：
 *   (1.常规情况下，事件被 暂时消除/彻底删除 后，将不再具备聚集效果。
 *      但置空的事件并没有被删除，所以置空事件仍然能聚集触发。
 *   (2."关闭聚集开关"是一个特殊设置，比如 消除砖块 关卡中，
 *      砖块粉碎消失后，砖块并没有真的被删除，而是置为空事件，
 *      因此置空的砖块不能和其它砖块继续产生聚集效果，
 *      所以需要在砖块消失状态的 事件页中 写注释"关闭聚集开关"。
 * 设计：
 *   (1.多用于三消类型的游戏，聚集的事件会一起被消除。
 *      注意示例中的消除砖块的设计中，鼠标拖移时需要等1帧，聚集开关
 *      判定需要至少延迟1帧，这样就需要静止2帧缓冲时间，再触发砖块消除。
 *   (2.你也可以以此制作基于华容道但必须要求全部同色方块相邻才能通过
 *      的解谜。比如连接两头远距离的不可移动同色方块，形成一座桥。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 聚集钥匙
 * 你可以给物体添加聚集钥匙，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>聚集开关 : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 
 * 1.聚集钥匙的注释 需要写在一般事件身上。
 *   表示具备聚集功能，但是不会触发自身独立开关的物体。
 * 2."聚集开关"可以理解为带电池带灯泡的物体。
 *   "聚集钥匙"可以理解为只带电池的物体。
 *   多个电池相邻才能点亮灯泡，触发独立开关。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 聚集开关
 * 你需要设置指定开关为聚集开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定条件 : 相邻聚集钥匙[红机关] : 大于[4]
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定条件 : 相邻聚集钥匙[红机关] : 小于[4]
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定条件 : 相邻聚集钥匙[红机关] : 等于[4]
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定条件 : 相邻聚集钥匙[红机关] : 大于等于[4]
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定条件 : 相邻聚集钥匙[红机关] : 小于等于[4]
 *
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>聚集开关 : 独立开关[A] : 满足条件时开启
 * 事件注释：=>聚集开关 : 独立开关[A] : 不满足条件时关闭
 *
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发" 就是 "满足条件时开启"的触发+"不满足条件时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"不满足条件时关闭"这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.一个开关只能绑定一个条件，比如"独立开关[A]"写了两条注释"等于[4]"和"等于[3]"，
 *   则插件按写在后面的注释条件来算，写在前面的注释条件作废。
 * 3.注意，每个聚集开关绑定条件后自带"相邻聚集钥匙"，
 *   如果设置了多个聚集开关，则表示具备多个聚集钥匙。
 * 4.假设聚集条件为"大于等于[2]"，但是碰巧有2个开关相隔，中间插入了第3个开关，
 *   那么这3个开关都会被同时触发。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定持续触发(逆向)
 * 事件注释：=>聚集开关 : 独立开关[A] : 满足条件时关闭
 * 事件注释：=>聚集开关 : 独立开关[A] : 不满足条件时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发(逆向)" 就是 "满足条件时关闭"的触发+"不满足条件时关闭"的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.注释 "大于[5]" + "绑定持续触发" 等价于 "小于等于[5]" + "绑定持续触发(逆向)" 。
 * 3.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定条件 : 条件[红机关] : 大于[4]
 * 事件注释：=>聚集开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>聚集开关 : 独立开关[B] : 绑定条件 : 条件[红机关] : 大于[6]
 * 事件注释：=>聚集开关 : 独立开关[B] : 绑定持续触发
 * 事件注释：=>聚集开关 : 独立开关[C] : 绑定条件 : 条件[红机关] : 大于[8]
 * 事件注释：=>聚集开关 : 独立开关[C] : 绑定持续触发(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 关闭聚集开关
 * 如果你想关闭某个事件页的聚集开关触发效果，用下面的注释。
 * 
 * 事件注释：=>聚集开关 : 关闭聚集开关
 * 
 * 1.常规情况下，事件被 暂时消除/彻底删除 后，将不再具备聚集效果。
 *   但置空的事件并没有被删除，所以置空事件仍然能聚集触发。
 * 2."关闭聚集开关"是一个特殊设置，比如 消除砖块 关卡中，
 *   砖块粉碎消失后，砖块并没有真的被删除，而是置为空事件，
 *   因此置空的砖块不能和其它砖块继续产生聚集效果，
 *   所以需要在砖块消失状态的 事件页中 写注释"关闭聚集开关"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 添加聚集钥匙
 * 你可以使用插件指令，给其他事件或玩家添加聚集钥匙：
 * 
 * 插件指令：>聚集开关 : 玩家 : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 插件指令：>聚集开关 : 本事件 : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 插件指令：>聚集开关 : 事件[10] : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 插件指令：>聚集开关 : 事件变量[21] : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 插件指令：>聚集开关 : 批量事件[10,11] : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 插件指令：>聚集开关 : 批量事件变量[21,22] : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 
 * 插件指令：>聚集开关 : 本事件 : 添加钥匙 : 相邻聚集钥匙[红机关]
 * 插件指令：>聚集开关 : 本事件 : 去除钥匙 : 相邻聚集钥匙[红机关]
 * 插件指令：>聚集开关 : 本事件 : 去除全部钥匙
 *
 * 1.前半部分（玩家）和 后半部分（添加钥匙 : 相邻聚集钥匙[红机关]）
 *   的参数可以随意组合。一共有6*3种组合方式。
 * 2.插件指令设置了玩家后，永久有效。
 *   插件指令设置了事件后，只在当前地图有效。因为离开地图后事件会重建。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取聚集数量
 * 你可以获取到上一次的发生聚集反应后，相关事件的数量。
 * 
 * 插件指令：>聚集开关 : 变量[21] : 获取上一次触发聚集的数量
 * 
 * 1.获取到的数量，为独立开关触发后聚集的总数量。
 *   如果独立开关一开始就是都开的，则没有效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 其他设置
 * 你可以修改聚焦开关的一些全局设置。
 * 
 * 插件指令：>聚集开关 : 是否优化每帧计算量 : 开启
 * 插件指令：>聚集开关 : 是否优化每帧计算量 : 关闭
 * 插件指令：>聚集开关 : 修改触发延迟时间 : 时间[2]
 * 
 * 1."触发延迟时间"可以设为0，表示聚集接触后立即触发。
 *   这个值与实际设计的游戏机制密切相关，不能乱设置，具体需要去看看文档说明。
 * 2."是否优化每帧计算量"默认开启，但在 解谜中
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧指令
 * 旧指令的格式相对没有那么规范，但是一样有效：
 * 
 * 事件注释(旧)：=>聚集开关 : 聚集标签 : 红方块
 * 事件注释(旧)：=>聚集开关 : 聚集数量[2] : 作用于独立开关 : A
 * 
 * 1."聚集标签" 就是 "聚集钥匙"。
 *   "聚集标签"和"作用于独立开关"两个注释必须写在同一个事件页，
 *   只写其中一个注释则没有效果。
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
 * 时间复杂度： o(n^4) 每帧
 * 测试方法：   去消除砖块关卡中进行测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【45.30ms】
 *              100个事件的地图中，平均消耗为：【38.98ms】
 *               50个事件的地图中，平均消耗为：【25.34ms】
 * 测试方法2：  直接在设计消除砖块关卡地图中测试性能。
 * 测试结果2：  100个含聚集开关的事件，消耗为：【149.00ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.聚集开关由于结构特殊，只能用 深度优先遍历/广度优先遍历，其他
 *   的优化算法都受限，所以消耗量比较大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 大幅度优化了底层结构，节约了事件数据存储空间。
 * 实现了多个独立开关的聚集触发功能。
 * 
 * 
 * 
 * @param 是否优化每帧计算量
 * @type boolean
 * @on 优化
 * @off 关闭
 * @desc 考虑到聚集开关对 触发的实时性 要求不高，计算量可以由原来的每1帧计算一次，改为每2帧计算一次。
 * @default true
 *
 * @param 触发延迟时间
 * @type number
 * @min 0
 * @desc 聚集开关接触后，延迟触发的时间。
 * @default 2
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EGS（Event_Gather_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EGS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^4) 每帧
//		★性能测试因素	机关管理层、消除砖块关卡
//		★性能测试消耗	2023/12/9：
//							》每1帧计算一次。
//							》机关管理层：45.3ms（drill_EGS_updatePositionTank）
//							》消除砖块关卡：149.0ms（drill_EGS_updateSwitch）153.5ms（drill_EGS_getAllEventsNearBy）172.3ms（drill_EGS_updatePositionTank）
//						2024/5/2：
//							》机关管理层：28.8ms（开优化，drill_EGS_updatePositionTank）
//							》加了个"优化每帧计算量"功能，但后来发现 消除砖块关卡 不能开这个优化，所以感觉这个优化没用。
//		★最坏情况		暂无
//		★备注			这个插件最能提现其消耗程度的，就在关卡 设计-消除砖块，用垃圾本跑一次就能知道情况了。
//						最初版本帧数为2-3帧，现在优化到了5-6帧，详情去看脚本文档的记录。
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
//			->☆事件注释
//
//			->☆物体的属性
//			->☆开关的属性
//				->可多个独立开关触发
//				->触发设置
//					> 满足条件时开启
//					> 不满足条件时关闭
//					> 满足条件时关闭
//					> 不满足条件时开启
//				->绑定条件
//					> 关键字
//					> 条件类型
//					> 条件值
//				->聚集开关自带聚集钥匙
//				->关闭聚集开关（特殊设置）
//			->☆聚集开关容器
//				->钥匙容器
//				->锁容器
//				->事件清除时
//
//			->☆开关控制
//				->是否优化每帧计算量
//			->☆开关控制（坐标容器）
//			->☆开关控制（聚集组容器）
//			->☆开关控制（触发设置）
//				->触发延迟时间
//
//
//		★家谱：
//			大家族-开关
//		
//		★脚本文档：
//			8.物体 > 大家族-开关（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1. 坐标容器、聚集组容器 都是在帧刷新中实时创建然后销毁用，
//			   由于大多传的都是指针，不确定会不会浪费内存。
//			2.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			
//		★其它说明细节：
//			1.优化：如果地图里面一个聚集开关都没有，则不作多余计算。
//			  优化：聚集开关对 触发的实时性 要求不高，可以减帧计算。
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
	DrillUp.g_EGS_PluginTip_curName = "Drill_EventGatherSwitch.js 物体-聚集开关";
	DrillUp.g_EGS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EGS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EGS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventGatherSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventGatherSwitch');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_EGS_reduceUpdate = String(DrillUp.parameters["是否优化每帧计算量"] || "true") === "true";
	DrillUp.g_EGS_delayTime = Number(DrillUp.parameters["触发延迟时间"] || 2);
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EGS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EGS_pluginCommand.call(this, command, args);
	if( command === ">聚集开关" ){	// >聚集开关 : 变量[21] : 获取上一次触发聚集的数量
		
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "获取上一次触发聚集的数量"){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameVariables.setValue( temp1, $gameTemp._drill_EGS_count );
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改触发延迟时间"){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameSystem._drill_EGS_delayTime = temp1;
			}
			if( type == "是否优化每帧计算量"){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_EGS_reduceUpdate = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_EGS_reduceUpdate = false;
				}
			}
		}
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "玩家" ){
				c_chars = [ $gamePlayer ];
			}
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EGS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EGS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EGS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EGS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 		
		
		/*-----------------条件钥匙------------------*/	
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			temp1 = temp1.replace("相邻聚集钥匙[","");
			temp1 = temp1.replace("]","");
			if( type == "添加钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EGS_addKey( temp1 );
				}
			}
			if( type == "去除钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EGS_removeKey( temp1 );
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除全部钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EGS_clearKeyList();
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EGS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EGS_getPluginTip_EventNotFind( e_id ) );
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
DrillUp.g_EGS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EGS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EGS_sys_initialize.call(this);
	this.drill_EGS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EGS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EGS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EGS_saveEnabled == true ){	
		$gameSystem.drill_EGS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EGS_initSysData();
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
Game_System.prototype.drill_EGS_initSysData = function() {
	this.drill_EGS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EGS_checkSysData = function() {
	this.drill_EGS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EGS_initSysData_Private = function() {
	
	this._drill_EGS_reduceUpdate = DrillUp.g_EGS_reduceUpdate;	//是否优化每帧计算量
	this._drill_EGS_delayTime = DrillUp.g_EGS_delayTime;		//触发延迟时间
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EGS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EGS_delayTime == undefined ){
		this.drill_EGS_initSysData();
	}
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EGS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EGS_event_initMembers.call(this);
	this._drill_EGS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EGS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EGS_event_setupPage.call(this);
    this.drill_EGS_setupSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EGS_setupSwitch = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EGS_isFirstBirth == true ){ 
		this._drill_EGS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EGS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EGS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EGS_readPage = function( page_list ){
	
	// > 旧指令用
	var temp_switch = undefined;
	var temp_key_str = undefined;
	var temp_condition = undefined;
	var temp_num = undefined;
	
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>聚集开关" ){
				
				/*-----------------聚集钥匙------------------*/
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					temp1 = temp1.replace("相邻聚集钥匙[","");
					temp1 = temp1.replace("]","");
					if( type == "添加钥匙" ){
						this.drill_EGS_addKey( temp1 );
						$gameTemp._drill_EGS_needRestatistics_key = true;
					}
				}
				
				/*-----------------绑定持续触发------------------*/
				if( args.length == 8 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					temp1 = temp1.replace("相邻聚集钥匙[","");
					temp1 = temp1.replace("]","");
					if( type == "绑定条件" ){
						var condition = "大于等于";
						if( temp2.indexOf("大于等于[") != -1 ){
							condition = "大于等于";
						}else if( temp2.indexOf("小于等于[") != -1 ){
							condition = "小于等于";
						}else if( temp2.indexOf("等于[") != -1 ){
							condition = "等于";
						}else if( temp2.indexOf("大于[") != -1 ){
							condition = "大于";
						}else if( temp2.indexOf("小于[") != -1 ){
							condition = "小于";
						}
						var num = 0;
						temp2 = temp2.replace("大于等于[","");
						temp2 = temp2.replace("小于等于[","");
						temp2 = temp2.replace("等于[","");
						temp2 = temp2.replace("大于[","");
						temp2 = temp2.replace("小于[","");
						temp2 = temp2.replace("]","");
						num = Number(temp2);
						this.drill_EGS_setCondition( switch_str, temp1, condition, num );
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
				}
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定持续触发" ){
						this.drill_EGS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EGS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EGS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EGS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
					if( type == "满足条件时开启" ){
						this.drill_EGS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EGS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
					if( type == "不满足条件时关闭" ){
						this.drill_EGS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EGS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
					if( type == "绑定持续触发(逆向)" ){
						this.drill_EGS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EGS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EGS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EGS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
					if( type == "满足条件时关闭" ){
						this.drill_EGS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EGS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
					if( type == "不满足条件时开启" ){
						this.drill_EGS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EGS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
				}
				
				/*-----------------关闭聚集开关------------------*/
				if( args.length == 2 ){	//=>聚集开关 : 关闭聚集开关
					var temp1 = String(args[1]);
					if( temp1 == "关闭聚集开关" ){
						this.drill_EGS_clearKeyList();
						this.drill_EGS_clearSwitchList();
						$gameTemp._drill_EGS_needRestatistics_key = true;
						$gameTemp._drill_EGS_needRestatistics_switch = true;
					}
				}
				
				
				/*-----------------旧指令------------------*/
				if( args.length == 6 ){	//=>聚集开关 : 聚集数量[2] : 作用于独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var switch_str = String(args[5]);
					if( temp2 == "作用于独立开关" ){
						temp1 = temp1.replace("聚集数量[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						
						temp_switch = switch_str;
						temp_condition = "大于等于";
						temp_num = temp1;
						if( temp_switch != undefined && 	//（两个旧指令都写才能生效）
							temp_key_str != undefined && 
							temp_condition != undefined && 
							temp_num != undefined ){
							
							// > 添加独立开关
							this.drill_EGS_setSwitch_TriggeredOn( temp_switch, true );
							this.drill_EGS_setSwitch_NotTriggeredOff( temp_switch, true );
							this.drill_EGS_setSwitch_TriggeredOff( temp_switch, false );
							this.drill_EGS_setSwitch_NotTriggeredOn( temp_switch, false );
							
							// > 添加绑定条件
							this.drill_EGS_setCondition( temp_switch, temp_key_str, temp_condition, temp_num );
							$gameTemp._drill_EGS_needRestatistics_key = true;
							$gameTemp._drill_EGS_needRestatistics_switch = true;
						}
					}
				}
				if( args.length == 4 ){	//=>聚集开关 : 聚集标签 : 红方块
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1 == "聚集标签" ){
						temp_key_str = temp2;
						if( temp_switch != undefined && 	//（两个旧指令都写才能生效）
							temp_key_str != undefined && 
							temp_condition != undefined && 
							temp_num != undefined ){
							
							// > 添加独立开关
							this.drill_EGS_setSwitch_TriggeredOn( temp_switch, true );
							this.drill_EGS_setSwitch_NotTriggeredOff( temp_switch, true );
							this.drill_EGS_setSwitch_TriggeredOff( temp_switch, false );
							this.drill_EGS_setSwitch_NotTriggeredOn( temp_switch, false );
							
							// > 添加绑定条件
							this.drill_EGS_setCondition( temp_switch, temp_key_str, temp_condition, temp_num );
							$gameTemp._drill_EGS_needRestatistics_key = true;
							$gameTemp._drill_EGS_needRestatistics_switch = true;
						}
					}
				}
			};
		};
	}, this);
};


//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门定义 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_EGS_key_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EGS_keyData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EGS_key_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：keyData，一对一。
//==============================
Game_Character.prototype.drill_EGS_checkKeyData = function(){
	if( this._drill_EGS_keyData != undefined ){ return; }
	this._drill_EGS_keyData = {};
	this._drill_EGS_keyData['curDelayTime'] = 0;
	this._drill_EGS_keyData['keyList'] = [];		//钥匙列表
}
//==============================
// * 物体的属性 - 钥匙 - 是否有钥匙
//==============================
Game_Character.prototype.drill_EGS_hasAnyKey = function(){
	return this.drill_EGS_getKeyList().length > 0;
}
//==============================
// * 物体的属性 - 钥匙 - 是否有指定钥匙
//==============================
Game_Character.prototype.drill_EGS_hasKey = function( key_str ){
	if( this._drill_EGS_keyData == undefined ){ return false; }
	for(var i = 0; i < this._drill_EGS_keyData['keyList'].length; i++ ){
		var cur_key = this._drill_EGS_keyData['keyList'][i];
		if( cur_key == key_str ){ return true; }
	}
	return false;
}
//==============================
// * 物体的属性 - 钥匙 - 获取列表
//==============================
Game_Character.prototype.drill_EGS_getKeyList = function(){
	if( this._drill_EGS_keyData == undefined ){ return []; }
	return this._drill_EGS_keyData['keyList'];
}
//==============================
// * 物体的属性 - 钥匙 - 添加
//==============================
Game_Character.prototype.drill_EGS_addKey = function( key ){
	this.drill_EGS_checkKeyData();
	if( this.drill_EGS_hasKey(key) == true ){ return; }		//（不重复添加）
	this._drill_EGS_keyData['keyList'].push(key);
}
//==============================
// * 物体的属性 - 钥匙 - 删除
//==============================
Game_Character.prototype.drill_EGS_removeKey = function( key ){
	this.drill_EGS_checkKeyData();
	for(var i = this._drill_EGS_keyData['keyList'].length -1; i >= 0; i-- ){
		var cur_key = this._drill_EGS_keyData['keyList'][i];
		if( cur_key == key ){
			this._drill_EGS_keyData['keyList'].splice( i, 1 );
		}
	}
}
//==============================
// * 物体的属性 - 钥匙 - 删除全部
//==============================
Game_Character.prototype.drill_EGS_clearKeyList = function(){
	this.drill_EGS_checkKeyData();
	this._drill_EGS_keyData['keyList'] = [];
}
//==============================
// * 物体的属性 - 钥匙 - 是否正在延迟触发
//==============================
Game_Character.prototype.drill_EGS_isDelaying = function(){
	if( this._drill_EGS_keyData == undefined ){ return false; }
	return this._drill_EGS_keyData['curDelayTime'] < $gameSystem._drill_EGS_delayTime;
}


//=============================================================================
// ** ☆开关的属性
//
//			说明：	> 此模块专门定义 开关的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关的属性 - 初始化
//==============================
var _drill_EGS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	_drill_EGS_switch_initialize.call(this);
	this._drill_EGS_switchData = undefined;
}
//==============================
// * 开关的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Character.prototype.drill_EGS_checkSwitchData = function(){	
	if( this._drill_EGS_switchData != undefined ){ return; }
	this._drill_EGS_switchData = {};
	this._drill_EGS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 初始化 独立开关容器
//
//			说明：	> 注意，多个注释能触发多个独立开关。
//					> 层面关键字为：['switch']，一对多。
//==============================
Game_Character.prototype.drill_EGS_checkSwitchData_Switch = function( switch_str ){
	this.drill_EGS_checkSwitchData()
	if( this._drill_EGS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['triggeredOn'] = false;			//满足条件时开启
	switch_data['notTriggeredOff'] = false;		//不满足条件时关闭
	switch_data['triggeredOff'] = false;		//满足条件时关闭
	switch_data['notTriggeredOn'] = false;		//不满足条件时开启
	
	switch_data['key_str'] = "";				//关键字
	switch_data['condition'] = "";				//条件类型
	switch_data['num'] = 0;						//条件值
	
	this._drill_EGS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_EGS_hasAnySwitch = function(){
	return this.drill_EGS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_EGS_getSwitchList = function(){
	if( this._drill_EGS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_EGS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_EGS_removeSwitch = function( switch_str ){
	this.drill_EGS_checkSwitchData()
	this._drill_EGS_switchData['switch'][switch_str] = undefined;
	delete this._drill_EGS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_EGS_clearSwitchList = function(){
	this.drill_EGS_checkSwitchData()
	this._drill_EGS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 绑定条件
//==============================
Game_Character.prototype.drill_EGS_setCondition = function( switch_str, key_str, condition, num ){
	this.drill_EGS_checkSwitchData();
	this.drill_EGS_checkSwitchData_Switch( switch_str );
	this._drill_EGS_switchData['switch'][switch_str]['key_str'] = key_str;
	this._drill_EGS_switchData['switch'][switch_str]['condition'] = condition;
	this._drill_EGS_switchData['switch'][switch_str]['num'] = Number(num);
	if( isNaN( Number(num) ) ){
		alert( DrillUp.drill_EGS_getPluginTip_ParamIsNaN( "num" ) );
	}
	
	// > 绑定条件时，强制绑定钥匙
	this.drill_EGS_addKey( key_str );
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时开启
//==============================
Game_Character.prototype.drill_EGS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_EGS_checkSwitchData();
	this.drill_EGS_checkSwitchData_Switch( switch_str );
	this._drill_EGS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时关闭
//==============================
Game_Character.prototype.drill_EGS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_EGS_checkSwitchData();
	this.drill_EGS_checkSwitchData_Switch( switch_str );
	this._drill_EGS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时关闭
//==============================
Game_Character.prototype.drill_EGS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_EGS_checkSwitchData();
	this.drill_EGS_checkSwitchData_Switch( switch_str );
	this._drill_EGS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时开启
//==============================
Game_Character.prototype.drill_EGS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_EGS_checkSwitchData();
	this.drill_EGS_checkSwitchData_Switch( switch_str );
	this._drill_EGS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}


//=============================================================================
// ** ☆聚集开关容器
//
//			说明：	> 此模块专门定义 聚集开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EGS_clearTemp = function(){
	this._drill_EGS_keyTank = [];			//钥匙容器
	this._drill_EGS_switchTank = [];		//锁容器
	this._drill_EGS_curTime = 0;			//优化策略 计时器
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EGS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EGS_temp_initialize.call(this);
	this.drill_EGS_clearTemp();
	this._drill_EGS_needRestatistics_key = true;
	this._drill_EGS_needRestatistics_switch = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EGS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp.drill_EGS_clearTemp();
	$gameTemp._drill_EGS_needRestatistics_key = true;
	$gameTemp._drill_EGS_needRestatistics_switch = true;
	_drill_EGS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EGS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EGS_clearTemp();
	$gameTemp._drill_EGS_needRestatistics_key = true;
	$gameTemp._drill_EGS_needRestatistics_switch = true;
	_drill_EGS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EGS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EGS_map_update.call( this, sceneActive );
	this.drill_EGS_updateRestatistics_key();		//帧刷新 - 刷新钥匙统计
	this.drill_EGS_updateRestatistics_switch();		//帧刷新 - 刷新锁统计
};
//==============================
// * 容器 - 帧刷新 - 刷新钥匙统计
//==============================
Game_Map.prototype.drill_EGS_updateRestatistics_key = function(){
	if( $gameTemp._drill_EGS_needRestatistics_key != true ){ return }
	$gameTemp._drill_EGS_needRestatistics_key = false;
	
	$gameTemp._drill_EGS_keyTank = [];			//钥匙容器
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_EGS_hasAnyKey() ){
			$gameTemp._drill_EGS_keyTank.push(temp_event);
		}
	}
	
	// > 钥匙容器中包含玩家的情况
	if( $gamePlayer.drill_EGS_hasAnyKey() ){
		$gameTemp._drill_EGS_keyTank.push($gamePlayer);
	}
}
//==============================
// * 容器 - 帧刷新 - 刷新锁统计
//==============================
Game_Map.prototype.drill_EGS_updateRestatistics_switch = function(){
	if( $gameTemp._drill_EGS_needRestatistics_switch != true ){ return }
	$gameTemp._drill_EGS_needRestatistics_switch = false;
	
	$gameTemp._drill_EGS_switchTank = [];		//锁容器（开关容器）
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_EGS_hasAnySwitch() ){
			$gameTemp._drill_EGS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EGS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EGS_erase.call(this);
	if( this.drill_EGS_hasAnyKey() ){
		$gameTemp._drill_EGS_needRestatistics_key = false;
	}
	if( this.drill_EGS_hasAnySwitch() ){
		$gameTemp._drill_EGS_needRestatistics_switch = false;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 聚集开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_EGS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EGS_map_update2.call( this, sceneActive );
	if( this.drill_EGS_isOptimizationPassed() == false ){ return; }
	this.drill_EGS_updatePositionTank();		//帧刷新 - 坐标容器
	this.drill_EGS_updateKey();					//帧刷新 - 聚集钥匙
	this.drill_EGS_updateSwitch();				//帧刷新 - 聚集开关
};
//==============================
// * 开关控制 - 帧刷新 - 优化策略
//==============================
Game_Map.prototype.drill_EGS_isOptimizationPassed = function(){
	
	// > 地图中所有容器都为空时，不工作
	if( $gameTemp._drill_EGS_switchTank.length == 0 ){
		return false;
	}
	
	// > 优化每帧计算量 - 每2帧才计算一次『减帧』
	if( $gameSystem._drill_EGS_reduceUpdate == true ){
		$gameTemp._drill_EGS_curTime += 1;
		if( $gameTemp._drill_EGS_curTime % 2 == 1 ){
			return false;
		}
	}
	
	return true;
}


//=============================================================================
// ** ☆开关控制（坐标容器）
//
//			说明：	> 此模块为 坐标容器 的操作控制。注意，只存储聚集钥匙的坐标。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制（坐标容器） - 初始化
//==============================
var _drill_EGS_position_clearTemp = Game_Temp.prototype.drill_EGS_clearTemp;
Game_Temp.prototype.drill_EGS_clearTemp = function(){
	_drill_EGS_position_clearTemp.call( this );
	this._drill_EGS_positionTank = {};			//坐标容器
}
//==============================
// * 开关控制（坐标容器） - 帧刷新
//==============================
Game_Map.prototype.drill_EGS_updatePositionTank = function(){
	$gameTemp._drill_EGS_positionTank = {};
	
	// > 物体坐标 - 聚集钥匙（聚集开关在赋值时自动包含钥匙）
	var character_list = $gameTemp._drill_EGS_keyTank;
	
	// > 物体坐标 - 玩家
	character_list.unshift($gamePlayer);
	
	for(var i = 0; i < character_list.length; i++ ){
		var character = character_list[i];
		var slot_id = this.drill_EGS_getSlotId( character );
		
		if( character == null ){ continue; }
		if( character._erased == true ){ continue; }	//『有效事件』
		
		if( $gameTemp._drill_EGS_positionTank[slot_id] == undefined ){
			$gameTemp._drill_EGS_positionTank[slot_id] = [];
		}
		$gameTemp._drill_EGS_positionTank[slot_id].push( character );
	}
}
//==============================
// * 开关控制（坐标容器） - 获取坐标ID
//==============================
Game_Map.prototype.drill_EGS_getSlotId = function( character ){
	return Math.floor( character.x ) * 100000 + Math.floor( character.y );
}
//==============================
// * 开关控制（坐标容器） - 获取坐标ID
//==============================
Game_Map.prototype.drill_EGS_getSlotIdByPos = function( x_pos, y_pos ){
	return Math.floor( x_pos ) * 100000 + Math.floor( y_pos );
}


//=============================================================================
// ** ☆开关控制（聚集组容器）
//
//			说明：	> 此模块为 坐标容器 的操作控制。注意，只存储聚集钥匙的坐标。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制（聚集组容器） - 初始化
//==============================
var _drill_EGS_nearBy_clearTemp = Game_Temp.prototype.drill_EGS_clearTemp;
Game_Temp.prototype.drill_EGS_clearTemp = function(){
	_drill_EGS_nearBy_clearTemp.call( this );
	this._drill_EGS_nearByTank = {};
};
//==============================
// * 开关控制（聚集组容器） - 获取事件附近的聚集钥匙（主流程）
//
//			说明：	> 返回容器指针，注意容器只读。
//==============================
Game_Map.prototype.drill_EGS_getAllEventsNearBy = function( tar_event, key_str ){
	var nearBy_str = key_str + "_" + String( tar_event._eventId );
	var event_tank = $gameTemp._drill_EGS_nearByTank[nearBy_str];
	
	// > 若存在，则返回聚集组
	if( event_tank != undefined ){ return event_tank; }
	
	// > 若不存在，获取该事件的所有聚集钥匙
	var new_event_tank = [];
	this.drill_EGS_findAllEventsNearBy( tar_event, new_event_tank, key_str );
	
	// > 根据聚集钥匙，建立聚集组（所有 聚集钥匙 都指向 这个组）
	for(var i = 0; i < new_event_tank.length; i++ ){
		var temp_event = new_event_tank[i];
		var nearBy_str = key_str + "_" + String( temp_event._eventId );
		$gameTemp._drill_EGS_nearByTank[nearBy_str] = new_event_tank;
	}
	return new_event_tank;
}
//==============================
// * 开关控制（聚集组容器） - 获取事件附近的聚集钥匙（基函数）
//
//			说明：	> 一次性递归获取所有聚集钥匙事件，事件存储在 nearEvent_tank 中。
//					> 若该函数执行次数过多，消耗可能较大。
//					> 需要先刷新 坐标容器，再从中获取事件。
//==============================
Game_Map.prototype.drill_EGS_findAllEventsNearBy = function( tar_event, nearEvent_tank, key_str ){
	
	// > 若事件不含钥匙，跳出
	if( tar_event.drill_EGS_hasKey( key_str ) == false ){ return; }
	
	// > 若当前事件已存在于列表，跳出
	if( nearEvent_tank.indexOf( tar_event ) != -1 ){ return; }
	
	// > 添加当前事件
	nearEvent_tank.push( tar_event );
	
	
	// > 临近事件 - 位置(0,0) （与事件重合，也算聚集）
	var slot_id = this.drill_EGS_getSlotId( tar_event );
	var event_list = $gameTemp._drill_EGS_positionTank[slot_id];
	if( event_list != undefined ){
		for(var i = 0; i < event_list.length; i++ ){
			var temp_event = event_list[i];
			this.drill_EGS_findAllEventsNearBy( temp_event, nearEvent_tank, key_str );
		}
	}
	// > 临近事件 - 位置(1,0)
	var xx = this.roundX( tar_event.x +1 );
	var yy = this.roundY( tar_event.y +0 );
	var slot_id = this.drill_EGS_getSlotIdByPos( xx, yy );
	var event_list = $gameTemp._drill_EGS_positionTank[slot_id];
	if( event_list != undefined ){
		for(var i = 0; i < event_list.length; i++ ){
			var temp_event = event_list[i];
			this.drill_EGS_findAllEventsNearBy( temp_event, nearEvent_tank, key_str );
		}
	}
	// > 临近事件 - 位置(0,1)
	var xx = this.roundX( tar_event.x +0 );
	var yy = this.roundY( tar_event.y +1 );
	var slot_id = this.drill_EGS_getSlotIdByPos( xx, yy );
	var event_list = $gameTemp._drill_EGS_positionTank[slot_id];
	if( event_list != undefined ){
		for(var i = 0; i < event_list.length; i++ ){
			var temp_event = event_list[i];
			this.drill_EGS_findAllEventsNearBy( temp_event, nearEvent_tank, key_str );
		}
	}
	// > 临近事件 - 位置(-1,0)
	var xx = this.roundX( tar_event.x -1 );
	var yy = this.roundY( tar_event.y +0 );
	var slot_id = this.drill_EGS_getSlotIdByPos( xx, yy );
	var event_list = $gameTemp._drill_EGS_positionTank[slot_id];
	if( event_list != undefined ){
		for(var i = 0; i < event_list.length; i++ ){
			var temp_event = event_list[i];
			this.drill_EGS_findAllEventsNearBy( temp_event, nearEvent_tank, key_str );
		}
	}
	// > 临近事件 - 位置(0,-1)
	var xx = this.roundX( tar_event.x +0 );
	var yy = this.roundY( tar_event.y -1 );
	var slot_id = this.drill_EGS_getSlotIdByPos( xx, yy );
	var event_list = $gameTemp._drill_EGS_positionTank[slot_id];
	if( event_list != undefined ){
		for(var i = 0; i < event_list.length; i++ ){
			var temp_event = event_list[i];
			this.drill_EGS_findAllEventsNearBy( temp_event, nearEvent_tank, key_str );
		}
	}
}
/*
//==============================
// * 开关控制 - 单个事件附近的聚集开关（深度优先遍历，tank为容器指针）（旧代码）
//==============================
Game_Map.prototype.drill_EGS_eventsNearBy = function( e, tank ) {
	if( tank.indexOf(e) != -1 ){ return; }
	
	tank.push(e);
	var tag = e._drill_EGS._tag;
	var temp_group = $gameTemp._drill_EGS_switchs[tag];
	for( var i = 0; i < temp_group.length; i++ ){
		var temp_event = temp_group[i];
		if( tank.indexOf(temp_event) != -1 ){ continue; }
		
		if( $gameMap.distance(temp_event.x, temp_event.y, e.x, e.y) == 1 ){	//距离为1的即相邻
			this.drill_EGS_eventsNearBy( temp_event, tank );
		}
	}
}
*/


//=============================================================================
// ** ☆开关控制（触发设置）
//
//			说明：	> 此模块为 触发设置 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制（触发设置） - 初始化
//==============================
var _drill_EGS_switch_clearTemp = Game_Temp.prototype.drill_EGS_clearTemp;
Game_Temp.prototype.drill_EGS_clearTemp = function(){
	_drill_EGS_switch_clearTemp.call( this );
	this._drill_EGS_count = 0;			//上一次触发聚集的数量
};
//==============================
// * 开关控制（触发设置） - 帧刷新 钥匙
//==============================
Game_Map.prototype.drill_EGS_updateKey = function() {
	
	// > 聚集钥匙
	for( var i = 0; i < $gameTemp._drill_EGS_keyTank.length; i++ ){
		var temp_keyEv = $gameTemp._drill_EGS_keyTank[i];
		if( temp_keyEv._drill_EGS_keyData == undefined ){ continue; }
		
		// > 聚集钥匙 - 延迟触发时间
		if( $gameSystem._drill_EGS_reduceUpdate == true ){
			temp_keyEv._drill_EGS_keyData['curDelayTime'] += 2;
		}else{
			temp_keyEv._drill_EGS_keyData['curDelayTime'] += 1;
		}
		
		// > 如果未处于停止状态，重置延迟时间
		if( temp_keyEv.isStopping() == false ){
			temp_keyEv._drill_EGS_keyData['curDelayTime'] = 0;
		}
	}
};
//==============================
// * 开关控制（触发设置） - 帧刷新 开关
//==============================
Game_Map.prototype.drill_EGS_updateSwitch = function() {
	
	// > 获取前，先清空 聚集组容器
	$gameTemp._drill_EGS_nearByTank = {};
	
	// > 聚集开关
	for( var i = 0; i < $gameTemp._drill_EGS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EGS_switchTank[i];
		
		// > 数据 - switchData层面（与事件一对一）
		var switch_list = temp_switchEv.drill_EGS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		
		// > 数据 - ['switch']层面（与事件一对多）
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			
			// > 触发 - 获取聚集组
			var key_str = temp_switchEv._drill_EGS_switchData['switch'][cur_switch]['key_str'];
			var nearBy_tank = this.drill_EGS_getAllEventsNearBy( temp_switchEv, key_str );
			var gather_num = nearBy_tank.length;
			//if( gather_num >= 2 ){
			//	alert( gather_num );
			//}
			
			// > 触发 - 延迟触发时间（聚集组里只要有一个钥匙 正在延迟 那么不作判定）
			if( gather_num >= 2 ){
				var is_delaying = false;
				for(var k = 0; k < nearBy_tank.length; k++ ){
					var temp_keyEv = nearBy_tank[k];
					if( temp_keyEv.drill_EGS_isDelaying() == true ){
						is_delaying = true;
						break;
					}
				}
				if( is_delaying == true ){	//（跳出判定）
					continue;
				}
			}
			
			// > 触发
			var isTriggered = false;
			var condition = temp_switchEv._drill_EGS_switchData['switch'][cur_switch]['condition'];
			var num = temp_switchEv._drill_EGS_switchData['switch'][cur_switch]['num'];
			if( condition == "" || condition == "大于等于" ){
				if( gather_num >= num ){
					isTriggered = true;
				}
			}
			if( condition == "小于等于" ){
				if( gather_num <= num ){
					isTriggered = true;
				}
			}
			if( condition == "等于" ){
				if( gather_num == num ){
					isTriggered = true;
				}
			}
			if( condition == "大于" ){
				if( gather_num > num ){
					isTriggered = true;
				}
			}
			if( condition == "小于" ){
				if( gather_num < num ){
					isTriggered = true;
				}
			}
			
			// > 触发 - 满足条件时
			if( isTriggered ){
				
				if( temp_switchEv._drill_EGS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
					this.drill_EGS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
				if( temp_switchEv._drill_EGS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
					this.drill_EGS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				
			// > 触发 - 不满足条件时
			}else{
				
				if( temp_switchEv._drill_EGS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
					this.drill_EGS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				if( temp_switchEv._drill_EGS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
					this.drill_EGS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
			}
		}
	}
};
//==============================
// * 开关控制（触发设置） - 执行切换开关
//==============================
Game_Map.prototype.drill_EGS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};

