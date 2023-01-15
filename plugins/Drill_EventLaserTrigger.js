//=============================================================================
// Drill_EventLaserTrigger.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        物体触发 - 可变激光区域 & 条件触发
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventLaserTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得事件能够触发 激光范围 + 条件标签 的事件的独立开关。
 * 向前发射的一条光线区域，激光范围会被阻碍物阻挡。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 通过与下面组合，可以有更多功能：
 * 被扩展：
 *   - Drill_EventThrough           体积-事件穿透关系
 *     如果使用了目标插件，该插件的触发效果能支持穿透设置。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.更多详细介绍，去看看 "9.物体触发 > 关于物体触发-激光区域.docx"。
 * 触发：
 *   (1.当前触发分为两种：主动触发的事件 与 被触发的事件。
 *   (2.以指定的事件为中心，发射激光的区域为触发区域，遇到不可穿透的事件
 *      后终止。终止点脚下也是触发区域。
 *   (3.触发需要通过 插件指令 ，只触发一次，不是连续触发。
 *   (4.触发独立开关后都是设置为ON。硬性规定。
 *      程序上可以OFF独立开关，但是OFF情况更复杂，会使得事件页变混乱。
 *   (5.玩家自己没有独立开关的说法，不过你可以设置一个事件，时刻与玩家的
 *      位置一致，跟随控制玩家的状态、HP、死亡效果。
 *   (6.指令过多可能会记混淆，不过可以明确一点：
 *      含有"主动触发"的指令，都会执行一次范围触发。
 *      含有"被触发"的指令，都只是对事件进行标记。
 *   (7.你需要留意 触发与动画 的关系，
 *      有些图块的触发有效,但不会播放动画，比如炸弹炸到的可炸物。
 *      也有可能只播放一次动画，却触发了多次，比如连续的爆炸伤害。
 * 条件：
 *   (1.只有 被触发关键字 与 主动触发关键字 对应上，独立开关才会被开启。
 *   (2.你可以自定义条件关键字，用于连接不同的主动触发与被触发的事件。
 *      你可以在同一个事件里设置多个被触发条件，主动触发的指令也可以多个。
 * 起始点/终止点：
 *   (1.你可以获取上一次触发中起始点/终止点的坐标,从而派生出其他技能效果。
 *   (2.终止点有不存在的情况，即激光发射超过了最大范围却仍然没有命中。
 *      未命中获取时，将会获得 -1,-1 的坐标。
 * 激光穿透：
 *   (1.激光可以被事件阻挡，也可以穿透 含穿透标签 的某事件。
 * 记录区域：
 *   (1.记录区域只记录触发的区域。与动画区域无关，与起始点/终止点无关。
 *   (2.你可以将上一次触发过的区域，再触发一次。
 *      或者将区域保存在一个容器中，可以隔一段时间取出，再次触发。
 *   (3.由于区域是变化的,第一次触发后,第二次再触发的会不同面积的区域。
 *      你可以对第一次触发区域进行保存,确保第二次触发的还是原来的区域。
 * 玩家的激光:
 *   (1.注意，只有事件能发射激光。由于玩家不属于事件，所以这里受到了限制。
 *      这里建议使用插件 玩家的事件 ，该事件永久跟随玩家。
 *      让玩家事件发射激光即可，并且还可以写玩家事件被激光击中的事件处理。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 被触发
 * 如果你需要设置事件的被触发条件，使用下面事件注释：
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
 *   一共有3*3种组合方式。
 * 3.插件指令设置的被触发标签，只对当前地图有效，离开地图后消失。
 * 4.指定事件关闭了被触发条件，可以等同于他暂时免疫某种攻击。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 主动触发
 * 你需要通过插件指令来发射激光：
 * （注意，冒号左右有空格）
 * 
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 东 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 事件[10] : 可变激光区域 : 东 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 事件变量[10] : 可变激光区域 : 东 : 2 : 击碎岩石
 *
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 东 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 南 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 西 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 北 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 东南 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 东北 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 西南 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 西北 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 前 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 后 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 左 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 右 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 左前方 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 左后方 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 右前方 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 右后方 : 2 : 击碎岩石
 *
 * 1.区域朝向后面的数字表示激光的长度。
 * 2.插件指令的 前半部分和后半部分 的参数可以随意组合。
 *   一共有3*16种组合方式。
 * 3."击碎岩石"表示触发标志。在范围内的含有"击碎岩石"标志的被触发事件，
 *   会被开启相应的独立开关。
 * 4.如果你的激光方向与事件的方向有关，就用"前后左右"，如果是固定跟地图
 *   一样，就用"东南西北"。
 * 5."事件变量"为变量值对应的事件id，通过变量可以操作 事件复制器 复制出
 *   来的新事件。
 * 5.如果你想使得玩家也可以发射激光，那么你需要设置一个一直跟随玩家的事
 *   件，并且朝向始终一致。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多个方向
 * 你还可以写这样的插件指令：
 * 
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 东,南,西,北 : 2 : 击碎岩石
 * 插件指令：>主动触发 : 本事件 : 可变激光区域 : 东南,东北 : 2 : 击碎岩石
 * 
 * 1.用逗号隔开，可以同时写多个方向。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 起始点/终止点：
 * 发射一条激光，包含起始点和终止点两个特殊的点位置：
 * 
 * 插件指令：>主动触发 : 可变激光区域 : 获取上一次触发的起始点 : 变量[25,26]
 * 插件指令：>主动触发 : 可变激光区域 : 获取上一次触发的终止点 : 变量[25,26]
 * 
 * 1.使用上述插件指令，可以获取到触发的起始点和终止点。
 *   起始点就是事件的位置，终止点是激光撞到的位置。
 * 2.终止点不存在时，两个变量都赋值 -1 。
 * 3.如果你使用了多个方向同时执行，则变量只存最后一个方向的终止点。
 * 4.如果你只想要终止点位置，
 *   你可以发射一条没有任何意义的激光，比如触发独立开关"NONE"的激光。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 事件穿透
 * 你可以使得播放的动画能穿透某些类型的事件，
 * 但是必须要相关的插件支持，见插件扩展介绍：
 * 
 * 插件指令：>主动触发 : 可变激光区域 : 开启穿透 : 炸弹人,炸弹人道具
 * 插件指令：>主动触发 : 可变激光区域 : 关闭穿透
 * 
 * 1.你可以用逗号隔开，设置多个可穿透的标签。
 *   该插件指令只对可变激光区域有效。
 * 2.开启穿透后，指令后面所有的激光将拥有穿透属性，长期有效。
 *   所以激光发射结束后要关闭穿透。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 记录区域
 * 如果你需要对触发区域进行多次连续触发，你可以设置下面的插件指令：
 * 
 * 插件指令：>主动触发 : 可变激光区域 : 上一次触发的 : 击碎岩石
 * 
 * 插件指令：>主动触发 : 可变激光区域 : 上一次事件的 : 本事件 : 击碎岩石
 * 插件指令：>主动触发 : 可变激光区域 : 上一次事件的 : 事件[5] : 击碎岩石
 * 插件指令：>主动触发 : 可变激光区域 : 上一次事件的 : 事件变量[21] : 击碎岩石
 * 
 * 1.上一次触发，是指 任意事件 的上一次。
 *   上一次事件，是指 指定事件 的上一次。
 * 2.该操作将对上一次触发的区域，再触发一次。
 *
 * 插件指令：>主动触发 : 可变激光区域 : 保存区域 : 1 : 上一次触发的
 * 插件指令：>主动触发 : 可变激光区域 : 读取区域 : 1 : 击碎岩石
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
 * 测试方法：   去物体管理层、地理管理层、镜像管理层放置7个炸弹并测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【7.32ms】
 *              100个事件的地图中，平均消耗为：【6.10ms】
 *               50个事件的地图中，平均消耗为：【5.88ms】
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
 * 添加了触发临时保存的区域的功能。
 * [v1.2]
 * 修改了概念结构说明，并规范了插件指令设置。
 * 添加了起始点/终止点的位置获取。添加了插件性能测试说明。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 *
 * @param 斜向激光是否穿透两边阻碍
 * @type boolean
 * @on 穿透
 * @off 不穿透
 * @desc 假设向东南方发射激光，东南方无阻挡，但是正东和正南两处都有阻碍，设置不穿透则会被阻挡。
 * @default true
 *
 * @param 是否修正区域判定
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 修正后，没有完全离开触发区域的事件也会被捕获到，并触发。
 * @default true
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ELT （Event_Laser_Trigger）
//		临时全局变量	DrillUp.g_ELT_xxx
//		临时局部变量	this._drill_ELT_xxxx
//		存储数据变量	$gameSystem._drill_ELT_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^3) 
//		★性能测试因素	125个事件
//		★性能测试消耗	6.10ms
//		★最坏情况		所有事件都在玩家范围内，并且所有事件都有"被触发"标签。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			可变激光区域：
//				->单方向激光区域
//				->激光穿透
//				->与事件朝向相关的激光
//				->触发区域
//				->起始点/终止点
//				
//		★必要注意事项：
//			1.与激光动画共用 激光区域核心 ，是个小核心。
//			  由于这类核心标识性不足，与固定区域不能统一接口格式，所以内容比较零散。
//			
//		★其它说明细节：
//			1.该插件与其它事件触发插件功能相互有交叉，但并不干扰对方，是独立的。
//			2.判定区域有一点不同，根据贴图的realX来判定是否在图块范围内。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventLaserTrigger = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventLaserTrigger');

	DrillUp.g_ELT_fix = String(DrillUp.parameters['是否修正区域判定'] || "true") === "true";	
	DrillUp.g_ELT_diagonalThrough = String(DrillUp.parameters['斜向激光是否穿透两边阻碍'] || "true") === "true";	
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ELT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ELT_pluginCommand.call(this, command, args);
	if( command === ">主动触发" ){
		
		/*-----------------可变激光区域------------------*/
		if(args.length == 10){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = Number(args[7]);
			var tag = String(args[9]);
			
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
			
			if( e_id && type == "可变激光区域" ){	//>主动触发 : 本事件 : 可变激光区域 : 东 : 2 : 击碎岩石
				var dirs = temp3.split(/[,，]/);
				var range = temp4;
				$gameMap.drill_ELT_laserTrigger( e_id, dirs, range, tag );
			}	
		}
		/*-----------------起始点/终止点------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var pos = String(args[5]);
			pos = pos.replace("变量[","");
			pos = pos.replace("]","");
			pos = pos.split(/[,，]/);
			
			if( type == "可变激光区域" && type2 == "获取上一次触发的起始点" ){
				$gameVariables.setValue(Number(pos[0]), $gameSystem._drill_ELA_tempStartPoint['x']);
				$gameVariables.setValue(Number(pos[1]), $gameSystem._drill_ELA_tempStartPoint['y']);
			}
			if( type == "可变激光区域" && type2 == "获取上一次触发的终止点" ){
				$gameVariables.setValue(Number(pos[0]), $gameSystem._drill_ELA_tempEndPoint['x']);
				$gameVariables.setValue(Number(pos[1]), $gameSystem._drill_ELA_tempEndPoint['y']);
			}
		}
		/*-----------------事件穿透------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "可变激光区域" && type2 == "开启穿透" ){	
				$gameSystem._drill_ELT_eventThrough = temp1.split(/[,，]/);
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var type2 = String(args[3]);
			if( type == "可变激光区域" && type2 == "关闭穿透" ){	
				$gameSystem._drill_ELT_eventThrough = [];
			}
		}
		/*-----------------上一次触发/事件------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "可变激光区域" && type2 == "上一次触发的"){	
				var area = $gameSystem.drill_ELT_getLastArea() || [];
				var point = $gameSystem.drill_ELT_getLastPoint();
				$gameMap.drill_ELT_triggerArea( area, temp2 );
			}
		}
		if(args.length == 8){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var unit = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "可变激光区域" && type2 == "上一次事件的" ){	
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
				if( e_id == undefined ){
					var e_id = Number(unit);
				}
				if( $gameMap.drill_ELT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				var area = e._ELT_area || [];
				$gameMap.drill_ELT_recordPoint( area, e._x, e._y );
				$gameMap.drill_ELT_triggerArea( area, temp2 );
			}
		}
		/*-----------------记录区域------------------*/
		if(args.length == 8){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var c_id = Number(args[5]);
			var temp2 = String(args[7]);
			if( type == "可变激光区域" && type2 == "读取区域"){
				var area = $gameSystem.drill_ELT_loadArea(Number(c_id)) || [];
				//（无法获取是否有起始点）
				$gameMap.drill_ELT_triggerArea( area, temp2 );
			}
			if( type == "可变激光区域" && type2 == "保存区域" ){
				var area = $gameSystem.drill_ELT_getLastArea() || [];
				$gameSystem.drill_ELT_saveArea( Number(c_id), area );
			}
		}
	}
	/*-----------------被触发------------------*/
	if (command === ">被触发") {
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
					var e_id = e_ids[k];
					if( $gameMap.drill_ELT_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e._drill_ELT.tags = {};
				}
			}
		}
		if( e_ids && args.length == 6){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "去除条件" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ELT_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e._drill_ELT.tags[temp2] = false;
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
						var e_id = e_ids[k];
						if( $gameMap.drill_ELT_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_ELT.tags[temp2] = true;
						e._drill_ELT.self_switchs[temp2] = temp4;
					}
				}
			}
		}
	}
	
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ELT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventLaserTrigger.js 物体触发 - 可变激光区域 & 条件触发】\n" +
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
var _drill_ELT_char_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_drill_ELT_char_initMembers.call(this);
	this._drill_ELT = {};				
	this._drill_ELT.tags = {};				//条件关键字（json串）
	this._drill_ELT.self_switchs = {};		//开启独立开关
};

//==============================
// * 注释初始化
//==============================
var _drill_ELT_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ELT_event_setupPage.call(this);
    this.drill_ELT_setupPage();
};
Game_Event.prototype.drill_ELT_setupPage = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>被触发"){	//=>被触发 : 击碎岩石 : 触发独立开关 : A
				if(args.length == 6){
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					if( temp2 == "触发独立开关" ){
						this._drill_ELT.tags[temp1] = true;
						this._drill_ELT.self_switchs[temp1] = temp3;
					}
				}
			};
		};
	}, this);};
};	


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ELT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ELT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ELT_sys_initialize.call(this);
	this.drill_ELT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ELT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ELT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ELT_saveEnabled == true ){	
		$gameSystem.drill_ELT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ELT_initSysData();
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
Game_System.prototype.drill_ELT_initSysData = function() {
	this.drill_ELT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ELT_checkSysData = function() {
	this.drill_ELT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ELT_initSysData_Private = function() {
	
	this._drill_ELT_eventThrough = [];						//穿透设置
	this._drill_ELA_tempStartPoint = {"x":-1,"y":-1};		//暂存起始点
	this._drill_ELA_tempEndPoint = {"x":-1,"y":-1};			//暂存终止点
	
	this._drill_ELT_last_areas = [];			//存储的区域
	this._drill_ELT_last_area = [];				//触发区域
	this._drill_ELT_last_point = {'x':0,'y':0};	//触发中心点
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ELT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ELT_eventThrough == undefined ){
		this.drill_ELT_initSysData();
	}
	
};
// * 设置 - 上一个触发区域 [{'x':21,'y':31,'block':true}……]
Game_System.prototype.drill_ELT_setLastArea = function(area) {
	this._drill_ELT_last_area = area;
}
// * 设置 - 上一个触发中心点 {'x':1,'y':1}
Game_System.prototype.drill_ELT_setLastPoint = function(p) {
	this._drill_ELT_last_point = p;
}
// * 获取 - 上一个触发区域
Game_System.prototype.drill_ELT_getLastArea = function() {
	return this._drill_ELT_last_area;
}
// * 获取 - 上一个触发中心点
Game_System.prototype.drill_ELT_getLastPoint = function() {
	return this._drill_ELT_last_point;
}
// * 设置 - 存储区域
Game_System.prototype.drill_ELT_saveArea = function( area_id, area ) {
	this._drill_ELT_last_areas[area_id] = area;
}
// * 设置 - 读取区域
Game_System.prototype.drill_ELT_loadArea = function( area_id) {
	return this._drill_ELT_last_areas[area_id];
}


//=============================================================================
// ** 主动触发
//=============================================================================
//==============================
// * 主动触发 - 总流程（ 事件id， 方向集， 范围， 条件 ）
//==============================
Game_Map.prototype.drill_ELT_laserTrigger = function(e_id, dirs, range, tag ) {
	var e = this.event(e_id);
	var options = {};
	options["is_two_block"] = !DrillUp.g_ELT_diagonalThrough;	//斜角穿透
	options["through"] = $gameSystem._drill_ELT_eventThrough;	//事件穿透关系
	var area = this.drill_getLaserAreaWithADir(e._x, e._y, e._direction , dirs, range, options);
	//alert(JSON.stringify(area));
	e._ELT_area = area;
	$gameSystem.drill_ELT_setLastPoint({'x':e._x,'y':e._y});
	$gameSystem.drill_ELT_setLastArea(area);
	this.drill_ELT_recordPoint( area, e._x, e._y );
	this.drill_ELT_triggerArea(area, tag );
}
//==============================
// * 主动触发 - 起始点/终止点
//==============================
Game_Map.prototype.drill_ELT_recordPoint = function( area, start_x, start_y ) {
	$gameSystem._drill_ELA_tempStartPoint = {"x":-1,"y":-1};
	$gameSystem._drill_ELA_tempEndPoint = {"x":-1,"y":-1};
	for (var j = 0; j < area.length; j++) {
		var temp = area[j];
		if( temp.x == start_x && temp.y == start_y ){
			$gameSystem._drill_ELA_tempStartPoint = temp;	//记录起始点
		}
		if( temp.block == true ){
			$gameSystem._drill_ELA_tempEndPoint = temp;		//记录终止点
		}
	}
}

//==============================
// * 主动触发 - 触发区域（实际区域[{x:21,y:31,block:true},{x:22,y:32,block:true}]，条件）
//==============================
Game_Map.prototype.drill_ELT_triggerArea = function( area, tag ) {
	
	var events = this.events();
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		for (var j = 0; j < area.length ; j++) {    	//事件朝向与范围有关系
			var temp_point = area[j];
		
			if( DrillUp.g_ELT_fix ){	//修正
				if( temp_event.drill_isInPosEntirely(  temp_point['x'], temp_point['y'] ) &&
					temp_event._drill_ELT.tags[tag] == true ){	
					
					var key = [this._mapId, temp_event._eventId, temp_event._drill_ELT.self_switchs[tag] ];
					$gameSelfSwitches.setValue(key,true);
					break;
				}
			}else{	//不修正
				if( temp_event.pos(  temp_point['x'], temp_point['y'] ) &&
					temp_event._drill_ELT.tags[tag] == true ){	
					
					var key = [this._mapId, temp_event._eventId, temp_event._drill_ELT.self_switchs[tag] ];
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
// * 主动触发 - 判定区域修正
//==============================
Game_CharacterBase.prototype.drill_isInPosEntirely = function(x,y) {
	if ( Math.abs( x - this._realX) < 0.5 && 
		Math.abs( y - this._realY) < 0.5) {
		return true;
	}
	return false;
};


//=============================================================================
// * 	激光区域核心
//		
//		功能：		通过调用主函数，返回发射激光后的区域集合。
//		可选项：	options中有多个可选设置：
//					"is_two_block":true（斜角穿透判定） "through":[]（穿透标签） 
//		主函数：	var area = this.drill_getLaserAreaWithADir( c_x, c_y, a_dir, dirs, range, options  );
//					var area = this.drill_getLaserArea(c_x, c_y, new_dirs, range, options );
//=============================================================================
if( typeof(Game_Map.prototype.drill_getLaserArea) == "undefined" ){	//防止重复定义

	//==============================
	// * 区域 - 活动角色激光区域（ 位置x，位置y， 朝向(2/4/6/8)，激光方向集(东西南北+前后左右 方向)，范围，特殊选项）
	//==============================
	Game_Map.prototype.drill_getLaserAreaWithADir = function(c_x, c_y, a_dir, dirs, range, options ) {
		var new_dirs = [];
		if( dirs.contains("东") ){ new_dirs.push("东");}
		if( dirs.contains("南") ){ new_dirs.push("南");}
		if( dirs.contains("西") ){ new_dirs.push("西");}
		if( dirs.contains("北") ){ new_dirs.push("北");}
		if( dirs.contains("东南") ){ new_dirs.push("东南");}
		if( dirs.contains("东北") ){ new_dirs.push("东北");}
		if( dirs.contains("西南") ){ new_dirs.push("西南");}
		if( dirs.contains("西北") ){ new_dirs.push("西北");}
		
		if( a_dir == 2 ){//下
			if( dirs.contains("前") ){ new_dirs.push("南");}
			if( dirs.contains("后") ){ new_dirs.push("北");}
			if( dirs.contains("左") ){ new_dirs.push("东");}
			if( dirs.contains("右") ){ new_dirs.push("西");}
			if( dirs.contains("左前方") ){ new_dirs.push("东南");}
			if( dirs.contains("右前方") ){ new_dirs.push("西南");}
			if( dirs.contains("左后方") ){ new_dirs.push("东北");}
			if( dirs.contains("右后方") ){ new_dirs.push("西北");}
		}
		if( a_dir == 4 ){//左
			if( dirs.contains("前") ){ new_dirs.push("西");}
			if( dirs.contains("后") ){ new_dirs.push("东");}
			if( dirs.contains("左") ){ new_dirs.push("南");}
			if( dirs.contains("右") ){ new_dirs.push("北");}
			if( dirs.contains("左前方") ){ new_dirs.push("西南");}
			if( dirs.contains("右前方") ){ new_dirs.push("西北");}
			if( dirs.contains("左后方") ){ new_dirs.push("东南");}
			if( dirs.contains("右后方") ){ new_dirs.push("东北");}
		}
		if( a_dir == 6 ){//右
			if( dirs.contains("前") ){ new_dirs.push("东");}
			if( dirs.contains("后") ){ new_dirs.push("西");}
			if( dirs.contains("左") ){ new_dirs.push("北");}
			if( dirs.contains("右") ){ new_dirs.push("南");}
			if( dirs.contains("左前方") ){ new_dirs.push("东北");}
			if( dirs.contains("右前方") ){ new_dirs.push("东南");}
			if( dirs.contains("左后方") ){ new_dirs.push("西北");}
			if( dirs.contains("右后方") ){ new_dirs.push("西南");}
		}
		if( a_dir == 8 ){//上
			if( dirs.contains("前") ){ new_dirs.push("北");}
			if( dirs.contains("后") ){ new_dirs.push("南");}
			if( dirs.contains("左") ){ new_dirs.push("西");}
			if( dirs.contains("右") ){ new_dirs.push("东");}
			if( dirs.contains("左前方") ){ new_dirs.push("西北");}
			if( dirs.contains("右前方") ){ new_dirs.push("东北");}
			if( dirs.contains("左后方") ){ new_dirs.push("西南");}
			if( dirs.contains("右后方") ){ new_dirs.push("东南");}
		}
		return this.drill_getLaserArea(c_x, c_y, new_dirs, range, options );
	}
	//==============================
	// * 区域 - 固定方向激光区域（中心点x，中心点y，激光方向集(东西南北方向)，范围， 特殊选项）
	//==============================
	Game_Map.prototype.drill_getLaserArea = function( c_x, c_y, dirs, range, options ) {
		var cal_area = [];
		cal_area.push({'x':c_x,'y':c_y,'block': false });
		
		if( dirs.contains("东南") ){
			var area = this.drill_getSingleDiagonallyLaserArea( c_x, c_y, 6, 2, 135, range, options );
			cal_area = cal_area.concat(area);
		}
		if( dirs.contains("东北") ){
			var area = this.drill_getSingleDiagonallyLaserArea( c_x, c_y, 6, 8, 45, range, options );
			cal_area = cal_area.concat(area);
		}
		if( dirs.contains("西北") ){
			var area = this.drill_getSingleDiagonallyLaserArea( c_x, c_y, 4, 8, 315, range, options );
			cal_area = cal_area.concat(area);
		}
		if( dirs.contains("西南") ){
			var area = this.drill_getSingleDiagonallyLaserArea( c_x, c_y, 4, 2, 225, range, options );
			cal_area = cal_area.concat(area);
		}
		if( dirs.contains("东") ){
			var area = this.drill_getSingleLineLaserArea( c_x, c_y, 6, 90, range, options );
			cal_area = cal_area.concat(area);
		}
		if( dirs.contains("南") ){
			var area = this.drill_getSingleLineLaserArea( c_x, c_y, 2, 180, range, options );
			cal_area = cal_area.concat(area);
		}
		if( dirs.contains("西") ){
			var area = this.drill_getSingleLineLaserArea( c_x, c_y, 4, 270, range, options );
			cal_area = cal_area.concat(area);
		}
		if( dirs.contains("北") ){
			var area = this.drill_getSingleLineLaserArea( c_x, c_y, 8, 360, range, options );
			cal_area = cal_area.concat(area);
		}
		
		return cal_area;
	}
	//==============================
	// * 区域 - 单方向斜向激光区域（中心点x，中心点y，水平方向(4/6)，垂直方向(2/8)，自适应角度，范围，特殊选项）
	//==============================
	Game_Map.prototype.drill_getSingleDiagonallyLaserArea = function( c_x, c_y, dir_h, dir_v, angle, range, options ) {
		var cal_area = [];
		var laser = new Game_CharacterBase();
		laser._x = c_x;
		laser._y = c_y;
		if( options.through && options.through.length != 0 ){	//设置穿透
			laser._drill_ETh_char = {};
			for(var k=0; k<options.through.length; k++){ laser._drill_ETh_char[ String(options.through[k]) ] = true;  }
		}
		
		for (var i = 0; i < range ; i++) {
			var x = this.roundXWithDirection( laser._x, dir_h );
			var y = this.roundYWithDirection( laser._y, dir_v );
			if( laser.drill_canPassDiagonally(laser._x, laser._y, dir_h, dir_v, options.is_two_block) ){
				laser._x = x;
				laser._y = y;
				cal_area.push({'x':x ,'y':y ,'block': false, 'angle':angle });
			}else{
				cal_area.push({'x':x ,'y':y ,'block': true, 'angle':angle });
				return cal_area;
			}
		}
		return cal_area;
	}
	//==============================
	// * 区域 - 单方向直线激光区域（中心点x，中心点y，方向(2/4/6/8)，自适应角度，范围，特殊选项）
	//==============================
	Game_Map.prototype.drill_getSingleLineLaserArea = function( c_x, c_y, dir, angle, range, options ) {
		var cal_area = [];
		var laser = new Game_CharacterBase();
		laser._x = c_x;
		laser._y = c_y;
		if( options.through && options.through.length != 0 ){	//设置穿透
			laser._drill_ETh_char = {};
			for(var k=0; k<options.through.length; k++){ laser._drill_ETh_char[ String(options.through[k]) ] = true;  }
		}
		
		for (var i = 0; i < range ; i++) {
			var x = this.roundXWithDirection( laser._x, dir );
			var y = this.roundYWithDirection( laser._y, dir );
			if( laser.canPass(laser._x, laser._y, dir) ){
				laser._x = x;
				laser._y = y;
				cal_area.push({'x':x ,'y':y ,'block': false, 'angle':angle });
			}else{
				cal_area.push({'x':x ,'y':y ,'block': true, 'angle':angle });
				return cal_area;
			}
		}
		return cal_area;
	}
	//==============================
	// * 通行 - 穿透判断斜向可通行区域
	//==============================
	Game_CharacterBase.prototype.drill_canPassDiagonally = function(x, y, horz, vert, is_two_block ) {
		if( is_two_block == true ){
			return this.canPassDiagonally(x, y, horz, vert);
		}else{
			var x2 = $gameMap.roundXWithDirection(x, horz);
			var y2 = $gameMap.roundYWithDirection(y, vert);
			if (!$gameMap.isValid(x2, y2)) {
				return false;
			}
			if (!$gameMap.drill_ELT_isAnyPassable( x2, y2 )) {
				return false;
			}
			if (this.isCollidedWithCharacters(x2, y2)) {
				return false;
			}
			return true;
		}
	};
	//==============================
	// * 通用 - 判断图块可通行情况
	//==============================
	Game_Map.prototype.drill_ELT_isAnyPassable = function( x, y ) {
		return this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
	}
}
	


