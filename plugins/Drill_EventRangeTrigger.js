//=============================================================================
// Drill_EventRangeTrigger.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        物体触发 - 固定区域 & 条件触发
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventRangeTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得事件能够触发 固定范围 + 条件标签 的事件的独立开关。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFixedArea        物体触发-固定区域核心
 *     需要该核心才能进行区域条件触发。
 * 可扩展：
 *   - Drill_EventRangeTrigger      物体触发-固定区域 & 播放并行动画
 *     该插件存储的触发，可以在目标插件的"上一次触发的"、"读取区域"中生效。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.更多详细介绍，去看看 "9.物体触发 > 关于物体触发-固定区域.docx"。
 * 触发：
 *   (1.当前触发分为两种：主动触发的事件 与 被触发的事件。
 *   (2.触发需要通过 插件指令 ，只触发一次。
 *      主动触发是一个区域范围，被触发是一个点，区域内所有符合的点会触发。
 *   (3.触发独立开关后都是设置为ON。硬性规定。
 *      程序上可以OFF独立开关，但是OFF情况更复杂，会使得事件页变混乱。
 *   (4.玩家自己没有独立开关的说法，不过你可以设置一个事件，时刻与玩家的
 *      位置一致，跟随控制玩家的状态、HP、死亡效果。
 *   (5.你需要留意 触发与动画 的关系，
 *      有些图块的触发有效,但不会播放动画，比如炸弹炸到的可炸物。
 *      也有可能只播放一次动画，却触发了多次，比如连续的爆炸伤害。
 * 条件：
 *   (1.只有 被触发关键字 与 主动触发关键字 对应上，独立开关才会被开启。
 *   (2.你可以自定义条件关键字，用于连接不同的主动触发与被触发的事件。
 *      你可以在同一个事件里设置多个被触发条件，主动触发的指令也可以多个。
 * 固定区域：
 *   (1.默认有 菱形、方形、圆形、十字、横条、竖条 六种形状，都与方向无关。
 *   (2.你可以使用 自定义区域，自定义区域与方向有关，可在核心中配置。
 *   (3.上述的区域都可经过筛选器筛选，筛选条件见 固定区域核心 。
 * 记录区域：
 *   (1.记录区域只记录触发的区域。与动画区域无关。
 *   (2.你可以将上一次触发过的区域，再触发一次。
 *      或者将区域保存在一个容器中，可以隔一段时间取出，再次触发。
 *   (3.注意，保存的区域，是经过筛选器筛选后的剩余区域。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 被触发
 * 你需要设置事件的被触发条件，使用下面事件注释：
 * （注意，冒号左右有空格）
 * 
 * 事件注释：=>被触发 : 击碎岩石 : 触发独立开关 : A
 * 事件注释：=>被触发 : 挥砍攻击 : 触发独立开关 : A
 *
 * 插件指令：>被触发 : 本事件 : 设置条件 : 击碎岩石 : 触发独立开关 : A
 * 插件指令：>被触发 : 事件[10] : 设置条件 : 击碎岩石 : 触发独立开关 : A
 * 插件指令：>被触发 : 事件变量[10] : 设置条件 : 击碎岩石 : 触发独立开关 : A
 * 插件指令：>被触发 : 批量事件[10,11,12] : 设置条件 : 击碎岩石 : 触发独立开关 : A
 * 
 * 插件指令：>被触发 : 本事件 : 设置条件 : 击碎岩石 : 触发独立开关 : A
 * 插件指令：>被触发 : 本事件 : 去除条件 : 击碎岩石
 * 插件指令：>被触发 : 本事件 : 去除全部条件
 * 
 * 1."击碎岩石"和"挥砍攻击"是可以完全自定义的条件关键字。
 *   被触发关键字需要与后面的主动触发关键字对应上，才能完成独立开关的开启。
 * 2.插件指令的 前半部分(本事件)和后半部分(设置条件)的参数可以随意组合。
 *   一共有4*3种组合方式。
 * 3.插件指令设置的被触发标签，只对当前地图有效，离开地图后消失。
 * 4.指定事件关闭了被触发条件，可以等同于他暂时免疫某种攻击。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 主动触发
 * 你需要通过插件指令来进行范围触发：
 * （注意，冒号左右有空格）
 *
 * 插件指令：>主动触发 : 玩家位置 : 菱形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 菱形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 事件[10] : 菱形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 事件变量[10] : 菱形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 位置[10,10] : 菱形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 位置变量[10,10] : 菱形区域 : 1 : 击碎岩石
 *
 * 插件指令：>主动触发 : 本事件 : 菱形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 方形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 圆形区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 十字区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 横条区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 竖条区域 : 1 : 击碎岩石
 * 
 * 1.六种形状的区域不需要方向，所以只要找到一个点即可展开面积并触发。
 *   区域后面的数字表示范围，0表示只有坐标点自己。
 *   再比如，"方形区域 : 1"表示事件的位置以及周围8个图块的区域。
 *   玩家自己不是事件，也没有独立开关，所以这里特别标注为"玩家位置"。
 * 2.前半部分（本事件）和后半部分（xx区域）的参数可以随意组合。
 *   一共有6*6种组合方式。
 * 3."击碎岩石"表示触发标志。在范围内的含有"击碎岩石"标志的被触发事件，
 *   会被开启相应的独立开关。
 * 4."事件变量"为变量值对应的事件id，通过变量可以操作 事件复制器 复制出
 *   来的新事件。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自定义区域
 * 你可以通过插件指令设置主动触发的自定义区域：
 * （注意，冒号左右有空格）
 *
 * 插件指令：>主动触发 : 本事件 : 自定义区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 事件[10] : 自定义区域 : 1 : 击碎岩石
 * 插件指令：>主动触发 : 事件变量[10] : 自定义区域 : 1 : 击碎岩石
 *
 * 1.自定义区域只对事件有效，如果是玩家，可以建立一个时刻跟随的玩家事件。
 * 2.区域后面的数字，对应 区域核心配置 的自定义区域编号。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 筛选器
 * 上述的区域，有可能需要再经过一次额外的筛选，来满足复杂地形的条件：
 * 
 * 插件指令：>主动触发 : 固定区域 : 开启筛选器 : 1
 * 插件指令：>主动触发 : 固定区域 : 关闭筛选器
 * 
 * 1.筛选器对应 固定区域核心 中的筛选器配置编号。
 *   开启指定的筛选器，后面的触发区域都会被筛选，留下符合条件的区域。
 * 2.比如，某种爆炸不能在冰面上点燃，配置一个过滤冰面的筛选器并开启，
 *   就可以使得接下来的触发都不会在冰面区域上起效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 记录区域
 * 如果你需要对触发区域进行多次连续触发，你可以设置下面的插件指令：
 * 
 * 插件指令：>主动触发 : 固定区域 : 上一次触发的 : 击碎岩石
 * 
 * 插件指令：>主动触发 : 固定区域 : 上一次事件的 : 本事件 : 击碎岩石
 * 插件指令：>主动触发 : 固定区域 : 上一次事件的 : 事件[5] : 击碎岩石
 * 插件指令：>主动触发 : 固定区域 : 上一次事件的 : 事件变量[21] : 击碎岩石
 * 
 * 1.上一次触发，是指 任意事件 的上一次。
 *   上一次事件，是指 指定事件 的上一次。
 * 2.该操作将对上一次触发的区域，再触发一次。
 * 3.注意，上一次的区域，是经过筛选器筛选后的剩余区域。
 *
 * 插件指令：>主动触发 : 固定区域 : 保存区域 : 1 : 上一次触发的
 * 插件指令：>主动触发 : 固定区域 : 读取区域 : 1 : 击碎岩石
 * 
 * 1.区域存的是地图坐标，保存和读取永久有效。
 * 2.你需要考虑短时间持续触发时，堵路的持续问题。
 *   因为第一次触发后堵路就消失了，第二次触发，激光可能越过堵路。
 * 3.留意插件指令里面语句，语句多了容易搞混淆，最好直接复制粘贴。
 *   含有">主动触发"的指令，都会执行一次范围触发。
 *
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
 * 时间复杂度： o(n^3)
 * 测试方法：   批量执行菱形区域范围4的触发效果，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【7.84ms】
 *              100个事件的地图中，平均消耗为：【6.67ms】
 *               50个事件的地图中，平均消耗为：【6.04ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行几乎没有消耗，并且单次触发的消耗不大，但是播放的动画消耗
 *   非常大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 更新了注释。以及 被触发 插件指令设置。
 * 添加了圆形区域设置。
 * [v1.2]
 * 修复了多个被触发注释对应错误开关的bug。
 * [v1.3]
 * 添加了十字区域设置。
 * [v1.4]
 * 修改了内部结构，并添加了触发修正。
 * [v1.5]
 * 分离了固定区域核心，并添加了筛选器功能。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 * 
 *
 * @param 是否修正区域判定
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 修正后，没有完全离开触发区域的事件也会被捕获到，并触发。
 * @default true
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ERT （Event_Range_Trigger）
//		临时全局变量	DrillUp.g_ERT_xxx
//		临时局部变量	this._drill_ERT_xxxx
//		存储数据变量	【无】
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^3) 
//		★性能测试因素	125个事件
//		★性能测试消耗	6.67ms
//		★最坏情况		所有事件都在玩家范围内，并且所有事件都有"被触发"标签。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			固定区域：
//				->六种形状区域
//				->自定义区域
//				->触发区域
//				->筛选器
//				->记录区域
//
//		★必要注意事项：
//			1.六种形状区域、自定义区域、筛选器 都来自于核心，并调用了其中的接口。
//
//		★其它说明细节：
//			1.触发可以是从一个点展开一个区域，但是，没有方向。
//			  如果已事件为基准的话，事件有方向，就可以规划了。（变量还是不要开太多，开太多会增加复杂度）
//			  （计算图块的坐标就非常绕，要注意）
//			2.判定区域有一点不同，根据贴图的realX来判定是否在图块范围内。
//			3.该插件与【Drill_EventAutoTrigger】插件功能相互有交叉，但并不干扰对方，是独立的。
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventRangeTrigger = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventRangeTrigger');

	
	/*-----------------杂项------------------*/
	DrillUp.g_ERT_fix = String(DrillUp.parameters['是否修正区域判定'] || "true") === "true";	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFixedArea ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ERT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ERT_pluginCommand.call(this, command, args);
	if (command === '>主动触发') {
		/*-----------------形状区域------------------*/
		if(args.length == 8){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = Number(args[5]);
			var temp4 = String(args[7]);
			var _x = -1;
			var _y = -1;
			
			if( unit == "玩家位置" ){
				_x = $gamePlayer._x;
				_y = $gamePlayer._y;
			}
			if( unit == "本事件" ){
				var e_id = this._eventId;
				var e = $gameMap.event( e_id );
				_x = e._x;
				_y = e._y;
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ERT_isEventExist( e_id ) == true ){
					var e = $gameMap.event( e_id );
					_x = e._x;
					_y = e._y;
				}
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ERT_isEventExist( e_id ) == true ){
					var e = $gameMap.event( e_id );
					_x = e._x;
					_y = e._y;
				}
			}
			if( unit.indexOf("位置[") != -1 ){
				unit = unit.replace("位置[","");
				unit = unit.replace("]","");
				var pos = unit.split(/[,，]/);
				if( pos.length >=2 ){
					_x = Number(pos[0]);
					_y = Number(pos[1]);
				}
			}
			if( unit.indexOf("位置变量[") != -1 ){
				unit = unit.replace("位置变量[","");
				unit = unit.replace("]","");
				var pos = unit.split(/[,，]/);
				if( pos.length >=2 ){
					_x = $gameVariables.value(Number(pos[0]));
					_y = $gameVariables.value(Number(pos[1]));
				}
			}
			
			if( type == "菱形区域" || type == "方形区域"  || type == "圆形区域"  || 
				type == "十字区域" || type == "横条区域"  || type == "竖条区域" ){
				var range = Number(temp3);
				var tag = temp4;
				$gameMap.drill_ERT_triggerTypeArea( _x,_y,type,range,tag ,e );	//如果有事件，把事件放进去
			}
			
		}
		/*-----------------自定义区域------------------*/
		if(args.length == 8){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = Number(args[5]);
			var temp4 = String(args[7]);
			
			if( unit == "本事件" ){
				var e_id = this._eventId;
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
			}
			
			if( type == "自定义区域"){
				var self_id = Number(temp3)-1;
				var tag = temp4;
				$gameMap.drill_ERT_triggerSelfArea( e_id, self_id, tag);
			}
		}
		
		/*-----------------上一次触发/事件------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "固定区域" && type2 == "上一次触发的"){	
				var area = $gameSystem.drill_ERT_getLastArea() || [];
				var point = $gameSystem.drill_ERT_getLastPoint();
				$gameMap.drill_ERT_triggerArea( area, temp2 );
			}
		}
		if(args.length == 8){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var unit = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "固定区域" && type2 == "上一次事件的" ){	
				if( unit == "本事件" ){
					var e_id = this._eventId;
				}
				if( unit.indexOf("事件[") != -1 ){
					unit = unit.replace("事件[","");
					unit = unit.replace("]","");
					var e_id = Number(unit);
				}
				if( unit.indexOf("事件变量[") != -1 ){
					unit = unit.replace("事件变量[","");
					unit = unit.replace("]","");
					var e_id = $gameVariables.value(Number(unit));
				}
				$gameMap.drill_ERT_isEventExist( e_id );
				if( e_id == undefined ){
					var e_id = Number(unit);
				}
				var e = $gameMap.event( e_id );
				var area = e._ERT_area || [];
				$gameMap.drill_ERT_triggerArea( area, temp2 );
			}
		}
		/*-----------------记录区域------------------*/
		if(args.length == 8){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var c_id = Number(args[5]);
			var temp2 = String(args[7]);
			if( type == "固定区域" && type2 == "读取区域"){
				var area = $gameSystem.drill_ERT_loadArea(Number(c_id)) || [];
				//（无法获取是否有起始点）
				$gameMap.drill_ERT_triggerArea( area, temp2 );
			}
			if( type == "固定区域" && type2 == "保存区域" ){
				var area = $gameSystem.drill_ERT_getLastArea() || [];
				$gameSystem.drill_ERT_saveArea( Number(c_id), area );
			}
		}
		/*-----------------筛选器------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var s_id = Number(args[5]);
			if( type == "固定区域" && type2 == "开启筛选器"){
				$gameSystem._drill_ERT_curCondition = DrillUp.g_COFA_condition_list[ s_id-1 ];
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var type2 = String(args[3]);
			if( type == "固定区域" && type2 == "关闭筛选器"){
				$gameSystem._drill_ERT_curCondition = {};
			}
		}
	
	}
		
	/*-----------------被触发------------------*/
	if (command === '>被触发') {
		var e_ids = null;
		if(args.length >= 2){
			var unit = String(args[1]);
			if( unit == "本事件" ){
				e_ids = [ this._eventId ];
			}
			if( unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
		}
		
		if( e_ids && args.length == 4){
			var type = String(args[3]);
			if( type == "去除全部条件" ){
				for( var k=0; k < e_ids.length; k++ ){
					if( $gameMap.drill_ERT_isEventExist( e_ids[k] ) == false ){ continue; }
					var e = $gameMap.event( e_ids[k] );
					e._drill_ERT.tags = {};
				}
			}
		}
		if( e_ids && args.length == 6){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "去除条件" ){
				for( var k=0; k < e_ids.length; k++ ){
					if( $gameMap.drill_ERT_isEventExist( e_ids[k] ) == false ){ continue; }
					var e = $gameMap.event( e_ids[k] );
					e._drill_ERT.tags[temp2] = false;
				}
			}
		}
		if( e_ids && args.length == 10){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			var temp4 = String(args[9]);
			if( type == "设置条件" ){
				if( temp3 == "触发独立开关"){
					for( var k=0; k < e_ids.length; k++ ){
						if( $gameMap.drill_ERT_isEventExist( e_ids[k] ) == false ){ continue; }
						var e = $gameMap.event( e_ids[k] );
						e._drill_ERT.tags[temp2] = true;
						e._drill_ERT.self_switchs[temp2] = temp4;
					}
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ERT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventRangeTrigger.js 物体触发 - 固定区域 & 条件触发】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件初始化
//==============================
var _drill_ERT_char_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_drill_ERT_char_initMembers.call(this);
	this._drill_ERT = {};				
	this._drill_ERT.tags = {};				//条件关键字（json串）
	this._drill_ERT.self_switchs = {};		//开启独立开关
};
//==============================
// * 注释初始化
//==============================
var _drill_ERT_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ERT_event_setupPage.call(this);
    this.drill_ERT_setupPage();
};
Game_Event.prototype.drill_ERT_setupPage = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>被触发"){	//=>被触发 : 击碎岩石 : 触发独立开关 : A
				if(args.length == 6){
					if(args[1]){ var temp1 = String(args[1]); }
					if(args[3]){ var temp2 = String(args[3]); }
					if(args[5]){ var temp3 = String(args[5]); }
					if( temp2 == "触发独立开关" ){
						this._drill_ERT.tags[temp1] = true;
						this._drill_ERT.self_switchs[temp1] = temp3;
					}
				}
			};
		};
	}, this);};
};


//=============================================================================
// * 事件触发
//=============================================================================
//==============================
// * 事件触发 - 固定区域（xy点、区域类型、区域范围、条件）
//==============================
Game_Map.prototype.drill_ERT_triggerTypeArea = function( _x, _y, type, range, tag ,e ) {
	if( _x == -1 || _y == -1 ){ return }
	var cal_area = this.drill_COFA_getShapePointsWithCondition( _x, _y, type, range, $gameSystem._drill_ERT_curCondition );
	if( e ){
		e._ERT_area = cal_area;
	}
	$gameSystem.drill_ERT_setLastPoint({'x':_x,'y':_y});
	$gameSystem.drill_ERT_setLastArea(cal_area);
	this.drill_ERT_triggerArea( cal_area, tag );
}
//==============================
// * 事件触发 - 自定义区域（事件id，中心区域，条件）
//==============================
Game_Map.prototype.drill_ERT_triggerSelfArea = function( e_id, self_id, tag ) {
	var e = this.event( e_id );
	var cal_area = this.drill_COFA_getCustomPointsByIdWithCondition( e_id, self_id, $gameSystem._drill_ERT_curCondition );
	
	e._ERT_area = cal_area;
	$gameSystem.drill_ERT_setLastPoint({'x':e._x,'y':e._y});
	$gameSystem.drill_ERT_setLastArea(cal_area);
	this.drill_ERT_triggerArea( cal_area, tag );
}
//==============================
// * 事件触发 - 触发区域（实际区域[{x:21,y:31},{x:22,y:32}]，条件）
//==============================
Game_Map.prototype.drill_ERT_triggerArea = function( area, tag ) {
	
	var events = this.events();
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		for (var j = 0; j < area.length ; j++) {    	//事件朝向与范围有关系
			var temp_point = area[j];
		
			if( DrillUp.g_ERT_fix ){	//修正
				if( temp_event.drill_ERT_isInPosEntirely(  temp_point['x'], temp_point['y'] ) &&
					temp_event._drill_ERT.tags[tag] == true ){	
					
					var key = [this._mapId, temp_event._eventId, temp_event._drill_ERT.self_switchs[tag] ];
					$gameSelfSwitches.setValue(key,true);
					break;
				}
			}else{	//不修正
				if( temp_event.pos(  temp_point['x'], temp_point['y'] ) &&
					temp_event._drill_ERT.tags[tag] == true ){	
					
					var key = [this._mapId, temp_event._eventId, temp_event._drill_ERT.self_switchs[tag] ];
					$gameSelfSwitches.setValue(key,true);
					break;
				}
			}
		}
	}
}
/*
//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function(key, value) {
    if (value) {
        this._data[key] = true;
    } else {
        delete this._data[key];
    }
};*/
//==============================
// * 事件触发 - 判定区域修正
//==============================
Game_CharacterBase.prototype.drill_ERT_isInPosEntirely = function(x,y) {
	if ( Math.abs( x - this._realX) < 0.5 && 
		Math.abs( y - this._realY) < 0.5) {
		return true;
	}
	return false;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ERT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ERT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ERT_sys_initialize.call(this);
	this.drill_ERT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ERT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ERT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ERT_saveEnabled == true ){	
		$gameSystem.drill_ERT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ERT_initSysData();
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
Game_System.prototype.drill_ERT_initSysData = function() {
	this.drill_ERT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ERT_checkSysData = function() {
	this.drill_ERT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ERT_initSysData_Private = function() {
	
	this._drill_ERT_curCondition = {};			//当前筛选器
	
	this._drill_ERT_lastPoint = {'x':0,'y':0};	//触发中心点
	this._drill_ERT_lastArea = [];				//触发中心区域
	this._drill_ERT_lastAreas = [];				//存储的区域
	//this._drill_ERT_lastCondition = {};		//筛选器（不打算存筛选器）
	//this._drill_ERT_lastConditions = {};		//存储的筛选器
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ERT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ERT_curCondition == undefined ){
		this.drill_ERT_initSysData();
	}
	
};
// * 设置 - 上一个触发的中心区域 [{'x':21,'y':31,'block':true}……]
Game_System.prototype.drill_ERT_setLastArea = function(area) {
	this._drill_ERT_lastArea = area;
}
// * 设置 - 上一个触发的中心点 {'x':1,'y':1}
Game_System.prototype.drill_ERT_setLastPoint = function(p) {
	this._drill_ERT_lastPoint = p;
}
// * 获取 - 上一个触发的中心区域
Game_System.prototype.drill_ERT_getLastArea = function() {
	return this._drill_ERT_lastArea;
}
// * 获取 - 上一个触发的中心点
Game_System.prototype.drill_ERT_getLastPoint = function() {
	return this._drill_ERT_lastPoint;
}
// * 设置 - 存储区域
Game_System.prototype.drill_ERT_saveArea = function( area_id, area ) {
	this._drill_ERT_lastAreas[area_id] = area;
}
// * 设置 - 读取区域
Game_System.prototype.drill_ERT_loadArea = function( area_id) {
	return this._drill_ERT_lastAreas[area_id];
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventRangeTrigger = false;
		alert(
			"【Drill_EventRangeTrigger.js 物体触发 - 固定区域 & 条件触发】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFixedArea 物体触发-固定区域核心"
		);
}



