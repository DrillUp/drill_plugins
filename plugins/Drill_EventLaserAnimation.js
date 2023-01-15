//=============================================================================
// Drill_EventLaserAnimation.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        物体触发 - 可变激光区域 & 播放并行动画
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventLaserAnimation +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得事件能够在 激光范围内 的区域，批量播放并行动画。
 * 向前发射的一条光线区域，激光范围会被阻碍物阻挡。只播放动画。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 通过与下面插件组合，可以有更多功能：
 * 被扩展：
 *   - Drill_EventLaserTrigger       物体触发-可变激光区域 & 条件触发
 *     如果使用了目标插件，插件指令的"上一次触发的激光区域"可以生效。
 *   - Drill_EventThrough            体积-事件穿透关系
 *     如果使用了目标插件，该插件的动画就能支持穿透设置。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件，坐标点。
 * 2.更多详细介绍，去看看 "9.物体触发 > 关于物体触发-激光区域.docx"。
 * 并行动画：
 *   (1.以指定的事件为中心，以发射激光的区域批量播放动画。
 *   (2.你可以播放无限时间的动画，但是只要离开地图或者读档，动画就消失。
 *   (3.你需要留意 触发与动画 的关系，
 *      有些图块的触发有效,但不会播放动画，比如炸弹炸到的可炸物。
 *      也有可能只播放一次动画，却触发了多次，比如连续的爆炸伤害。
 * 起始点/终止点：
 *   (1.你可以设置上一次动画的起始点与终止点再播放其它动画。
 *   (2.终止点有不存在的情况，即激光发射超过了最大范围却仍然没有命中。
 *      如果上一个终止点不存在，则终止点动画不会被播放。
 *   (3.旧版本中的"堵路部分""不堵路部分"概念 与 终止点的意思一样。
 *      因为激光是一条直线，堵路部分就是终止点位置，
 * 激光穿透：
 *   (1.激光可以被事件阻挡，也可以穿透 含穿透标签 的某事件。
 * 记录区域：
 *   (1.记录区域只记录触发的区域。与动画区域无关，与起始点/终止点无关。
 *   (2.你可以将上一次触发过的区域，进行动画播放。
 *      或者将保存在一个容器中区域取出，进行动画播放。
 *   (3.由于区域是变化的,第一次触发后,第二次再触发的会不同面积的区域。
 *      你可以对第一次触发区域进行保存,确保第二次触发的还是原来的区域。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 范围播放
 * 你可以通过插件指令设置播放动画的条件。
 * （注意，冒号左右有空格）
 * 
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 东 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 事件[10] : 可变激光区域 : 东 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 事件变量[10] : 可变激光区域 : 东 : 2 : 动画[81]
 *
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 东 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 南 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 西 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 北 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 东南 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 东北 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 西南 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 西北 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 前 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 后 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 左 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 右 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 左前方 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 左后方 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 右前方 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 右后方 : 2 : 动画[81]
 *
 * 1.区域朝向后面的数字表示激光的长度。
 * 2.插件指令的 前半部分和后半部分 的参数可以随意组合。
 *   一共有3*16种组合方式。
 * 3."动画[81]"中数字表示对应的动画id。
 * 4.如果你的激光方向与事件的方向有关，就用"前后左右"，如果是固定跟地图
 *   一样，就用"东南西北"。
 * 5."事件变量"为变量值对应的事件id，通过变量可以操作 事件复制器 复制出
 *   来的新事件。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多个方向
 * 你可以写这样的插件指令：
 * 
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 东,南,西,北 : 2 : 动画[81]
 * 插件指令：>物体范围动画 : 本事件 : 可变激光区域 : 东南,东北 : 2 : 动画[81]
 *
 * 1.用逗号隔开，可以同时写多个方向。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 起始点/终止点：
 * 你可以操作激光起始点和终止点的动画：
 * 
 * 插件指令：>物体范围动画 : 可变激光区域 : 关闭起始点动画
 * 插件指令：>物体范围动画 : 可变激光区域 : 开启起始点动画
 * 
 * 插件指令：>物体范围动画 : 可变激光区域 : 关闭终止点动画
 * 插件指令：>物体范围动画 : 可变激光区域 : 开启终止点动画
 * 
 * 插件指令：>物体范围动画 : 可变激光区域 : 在上一个起始点播放动画 : 动画[81]
 * 插件指令：>物体范围动画 : 可变激光区域 : 在上一个终止点播放动画 : 动画[81]
 *
 * 1.一般来说，起始点和终止点的动画默认都是关闭的。
 * 2.终止点有不存在的情况，即激光发射超过了最大范围，但是仍然没有命中。
 * 3.如果上一个终止点不存在，则终止点动画不会被播放。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 事件穿透/动画自适应
 * 你可以使得播放的动画能穿透某些类型的事件，但是必须要相关的插件支持，
 * 见插件扩展介绍：
 * 
 * 插件指令：>物体范围动画 : 可变激光区域 : 开启穿透 : 炸弹人,炸弹人道具
 * 插件指令：>物体范围动画 : 可变激光区域 : 关闭穿透
 * 
 * 插件指令：>物体范围动画 : 可变激光区域 : 开启动画自适应旋转
 * 插件指令：>物体范围动画 : 可变激光区域 : 关闭动画自适应旋转
 *
 * 1.你可以用逗号隔开，设置多个可穿透的标签。
 *   指令结束后要习惯性执行关闭穿透的设置。
 * 2.堵路设置/自适应/起始点动画 设置变化后永久有效。
 * 3."起始点动画"是指发射的事件的位置是否播放动画，你可以根据情况开关。
 *   "动画自适应旋转"会根据你插件指令的方向而调整角度。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 上一次触发区域
 * 通过相关的插件支持，你可以使用上一次触发的区域：
 * （注意，冒号左右有空格）
 *
 * 插件指令：>物体范围动画 : 可变激光区域 : 上一次触发的 : 动画[81]
 * 
 * 插件指令：>物体范围动画 : 可变激光区域 : 上一次事件的 : 本事件 : 动画[81]
 * 插件指令：>物体范围动画 : 可变激光区域 : 上一次事件的 : 事件[10] : 动画[81]
 * 插件指令：>物体范围动画 : 可变激光区域 : 上一次事件的 : 事件变量[10] : 动画[81]
 * 
 * 1.上一次触发，是指 任意事件 的上一次。
 *   上一次事件，是指 指定事件 的上一次。
 * 2.该操作将对上一次触发的区域，再播放一次动画。
 * 
 * 插件指令：>物体范围动画 : 可变激光区域 : 读取区域 : 10 : 动画[81]
 *
 * 1.区域读取的是 可变激光区域&条件触发 的插件中保存的地图坐标。
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
 * 工作类型：   短时间持续
 * 时间复杂度： o(n^2)*o(动画数量)*o(图片处理) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层放置7个炸弹并测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【282.09ms】
 *              100个事件的地图中，平均消耗为：【233.18ms】
 *               50个事件的地图中，平均消耗为：【214.64ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.播放并行动画的功能比较特殊，因为是基于默认的自定义动画，并且批量
 *   同时播放，消耗量不言而喻。
 * 3.同时发射8条激光，垃圾电脑卡成1帧，并且只能看见3条激光。
 *   这是由于游戏中动画计算量突然增大，造成丢帧情况。
 * 4.如果你觉得性能消耗太大承受不起，可以设置只在起始点播放一个动画，
 *   通过设计拼接，形成固定的技能动画。不过代价也比较大，由于单独动画
 *   极度缺乏灵活性，你只能一个技能一个动画。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了读取上一次事件，读取保存的区域的功能。
 * [v1.2]
 * 修改了概念结构说明，并规范了插件指令设置。
 * 添加了起始点/终止点动画播放。添加了插件性能测试说明。
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
 * @param ----动画----
 * @default 
 * 
 * @param 起始点是否播放动画
 * @parent ----动画----
 * @type boolean
 * @on 播放
 * @off 关闭
 * @desc 起始点是指发射的事件的位置，你可以根据情况开关起始点的动画。可以通过插件指令随时修改。
 * @default false
 *
 * @param 终止点是否播放动画
 * @parent ----动画----
 * @type boolean
 * @on 播放
 * @off 关闭
 * @desc 终止点是指激光遇到阻碍的位置，你可以根据情况开关终止点的动画。可以通过插件指令随时修改。
 * @default false
 *
 * @param 动画自适应旋转
 * @parent ----动画----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 以向东方向为基准，向东南、向南、向西南的八个方向会根据方向而旋转动画。可以通过插件指令随时修改。
 * @default true
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ELA （Event_Laser_Animation）
//		临时全局变量	DrillUp.g_ELA_xxx
//		临时局部变量	this._drill_ELA_xxxx
//		存储数据变量	$gameSystem._drill_ELA_autoRotate
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		短时间持续
//		★时间复杂度		o(n^2)*o(动画数量)*o(图片处理) 每帧
//		★性能测试因素	125个事件 发射激光
//		★性能测试消耗	233.18ms
//		★最坏情况		大量事件释放大量动画技能。
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
//				->播放动画
//				->堵路部分/动画自适应
//				->起始点/终止点
//		
//		★必要注意事项：
//			1.要播放动画，必须先放置Sprite_Base，用于动画绑定。
//			  Sprite_Base旋转并不能影响动画，需要setup之后，把动画Sprite_Animation取出来后再旋转。
//			
//		★其它说明细节：
//			1.激光部分完全与固定区域不同，相当于重新写了一大堆核心函数。
//			  另外，东南西北八个方向超级难对应……
//			  地区转换是一个封装相对比较全的核，用于后期ai判定调用。
//			  （一个核心超级难提炼出来，太多东西藕断丝连。）
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventLaserAnimation = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventLaserAnimation');

	DrillUp.g_ELA_diagonalThrough = String(DrillUp.parameters['斜向激光是否穿透两边阻碍'] || "true") === "true";
	DrillUp.g_ELA_startAnim = String(DrillUp.parameters['起始点是否播放动画'] || "false") === "true";
	DrillUp.g_ELA_endAnim = String(DrillUp.parameters['终止点是否播放动画'] || "false") === "true";
	DrillUp.g_ELA_autoRotate = String(DrillUp.parameters['动画自适应旋转'] || "true") === "true";
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ELA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ELA_pluginCommand.call(this, command, args);
	if( command === ">物体范围动画" ){
		if(args.length == 10){	//>物体范围动画 : 本事件 : 可变激光区域 : 东 : 2 : 动画[81]
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = Number(args[7]);
			var anim = String(args[9]);
			
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
				anim = anim.replace("动画[","");
				anim = anim.replace("]","");
				var a_id = Number(anim);
				$gameMap.drill_ELA_laserTrigger( e_id, dirs, range, a_id );
			}	
		}
		
		/*-----------------事件穿透/动画自适应------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "可变激光区域" && type2 == "开启穿透" ){	
				$gameSystem._drill_ELA_eventThrough = temp2.split(/[,，]/);
			}
		}
		if(args.length == 4 ){
			var type = String(args[1]);
			var type2 = String(args[3]);
			if( type == "可变激光区域" ){	
				if( type2 == "关闭穿透"){	
					$gameSystem._drill_ELA_eventThrough = [];
				}
				if( type2 == "开启动画自适应旋转"){	
					$gameSystem._drill_ELA_autoRotate = true;
				}
				if( type2 == "关闭动画自适应旋转"){	
					$gameSystem._drill_ELA_autoRotate = false;
				}
			}
		}
		/*-----------------起始点/终止点------------------*/
		if(args.length == 4 ){
			var type = String(args[1]);
			var type2 = String(args[3]);
			if( type == "可变激光区域" ){	
				if( type2 == "关闭起始点动画"){	
					$gameSystem._drill_ELA_startAnim = false;
				}
				if( type2 == "开启起始点动画"){	
					$gameSystem._drill_ELA_startAnim = true;
				}
				if( type2 == "关闭终止点动画"){	
					$gameSystem._drill_ELA_endAnim = false;
				}
				if( type2 == "开启终止点动画"){	
					$gameSystem._drill_ELA_endAnim = true;
				}
			}
		}
		if(args.length == 6 ){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var anim = String(args[5]);
			anim = anim.replace("动画[","");
			anim = anim.replace("]","");
			var a_id = Number(anim);
			
			if( type == "可变激光区域" ){	
				if( type2 == "在上一个起始点播放动画"){	
					$gameMap.drill_ELA_triggerArea( [$gameSystem._drill_ELA_tempStartPoint], a_id );
				}
				if( type2 == "在上一个终止点播放动画"){	
					$gameMap.drill_ELA_triggerArea( $gameSystem._drill_ELA_tempEndPoints, a_id );
				}
			}
		}
		
		/*-----------------上一次区域------------------*/
		if(args.length == 6 ){
			var type = String(args[1]);
			var type2 = String(args[3]);
			var anim = String(args[5]);
			anim = anim.replace("动画[","");
			anim = anim.replace("]","");
			var a_id = Number(anim);
			if( type == "可变激光区域" && type2 == "上一次触发的" && Imported.Drill_EventLaserTrigger){	
				var last_area = $gameSystem.drill_ELT_getLastArea() || [];
				var point = $gameSystem.drill_ELT_getLastPoint();
				last_area = $gameMap.drill_ELA_operatePoint( last_area, point.x, point.y );
				$gameMap.drill_ELA_triggerArea( last_area, a_id );
			}
		}
		if(args.length == 8 ){
			var type = String(args[1]);
			var type2 = String(args[3]);
			
			var anim = String(args[7]);		//动画id
			anim = anim.replace("动画[","");
			anim = anim.replace("]","");
			var a_id = Number(anim);
			var e_id = -1;
			
			var unit = String(args[5]);		//事件id
			if( unit == "本事件" ){
				e_id = this._eventId;
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_id = Number(unit);
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_id = $gameVariables.value(Number(unit));
			}
			if( e_id == -1 ){
				e_id = Number(unit);
			}
			
			if( type == "可变激光区域" && type2 == "上一次事件的" && Imported.Drill_EventLaserTrigger){	
				if( $gameMap.drill_ELA_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				var area = e._ELT_area || [];
				area = $gameMap.drill_ELA_operatePoint( area, e._x, e._y );
				$gameMap.drill_ELA_triggerArea( area, a_id );
			}
			if( type == "可变激光区域" && type2 == "读取区域" && Imported.Drill_EventLaserTrigger){	
				var area = $gameSystem.drill_ELT_loadArea( Number(unit) ) || [];	//这个unit是区域容器的编号
				//（无法获取是否有起始点）
				area = $gameMap.drill_ELA_operatePoint( area, -1, -1 );
				$gameMap.drill_ELA_triggerArea( area, a_id );
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ELA_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventLaserAnimation.js 物体触发 - 可变激光区域 & 播放并行动画】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ELA_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ELA_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ELA_sys_initialize.call(this);
	this.drill_ELA_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ELA_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ELA_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ELA_saveEnabled == true ){	
		$gameSystem.drill_ELA_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ELA_initSysData();
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
Game_System.prototype.drill_ELA_initSysData = function() {
	this.drill_ELA_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ELA_checkSysData = function() {
	this.drill_ELA_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ELA_initSysData_Private = function() {
	
	this._drill_ELA_autoRotate = DrillUp.g_ELA_autoRotate;	//自适应
	this._drill_ELA_startAnim = DrillUp.g_ELA_startAnim;	//起始点动画
	this._drill_ELA_endAnim = DrillUp.g_ELA_endAnim;		//终止点动画
	this._drill_ELA_eventThrough = [];		//穿透设置
	this._drill_ELA_tempStartPoint = {};	//暂存起始点（用到的属性有：x,y,angle）
	this._drill_ELA_tempEndPoints = [];		//暂存终止点（起始点只有一个，终止点根据多方向可以有很多个）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ELA_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ELA_eventThrough == undefined ){
		this.drill_ELA_initSysData();
	}
	
};


//=============================================================================
// ** 播放
//=============================================================================
//==============================
// * 播放 - 总流程（ 事件id， 方向集， 范围， 动画id ）
//==============================
Game_Map.prototype.drill_ELA_laserTrigger = function(e_id, dirs, range, a_id ) {
	var e = this.event(e_id);
	var options = {};
	options["is_two_block"] = !DrillUp.g_ELA_diagonalThrough;	//斜角穿透
	options["through"] = $gameSystem._drill_ELA_eventThrough;	//事件穿透关系
	var area = this.drill_getLaserAreaWithADir(e._x, e._y, e._direction , dirs, range, options);	//获取范围
	area = this.drill_ELA_operatePoint( area, e._x, e._y );
	this.drill_ELA_triggerArea(area, a_id );	//播放 - 一个个播放
}
//==============================
// * 播放 - 去掉起始点/终止点
//==============================
Game_Map.prototype.drill_ELA_operatePoint = function( area, start_x, start_y ) {
	
	for (var j = 0; j < area.length ; j++) {
		var temp = area[j];
		if( temp.x == start_x && temp.y == start_y ){
			$gameSystem._drill_ELA_tempStartPoint = temp;		//记录起始点
			if( $gameSystem._drill_ELA_startAnim == false ){	//去掉起始点
				area.splice(j,1);
			}
			break;
		}
	}
	$gameSystem._drill_ELA_tempEndPoints = [];
	for (var j = area.length-1; j >= 0 ; j--) {
		var temp = area[j];
		if( temp.block == true ){
			$gameSystem._drill_ELA_tempEndPoints.push(temp);	//记录终止点
			if( $gameSystem._drill_ELA_endAnim == false ){		//去掉终止点
				area.splice(j,1);
			}
		}
	}
	return area;
}
//==============================
// * 播放 - 一个个播放（ 实际区域[{x:21,y:31,block:true,angle:90},……]，动画id ）
//==============================
Game_Map.prototype.drill_ELA_triggerArea = function( area, a_id ) {
	//alert(JSON.stringify(area));
	
	for (var j = 0; j < area.length ; j++) {    	//事件朝向与范围有关系
		var temp = area[j];
		this.drill_ELA_playAnimInPos(a_id, temp.x, temp.y, temp.angle);
	}
}
//==============================
// * 播放 - 只播放终止点
//==============================
Game_Map.prototype.drill_ELA_triggerAreaOnlyBlock = function( area, a_id ) {
	for (var j = 0; j < area.length ; j++) {    	//事件朝向与范围有关系
		var temp = area[j];
		if( temp.block == true ){
			this.drill_ELA_playAnimInPos(a_id, temp.x, temp.y, temp.angle);
		}
	}
}


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
			if (!$gameMap.drill_ELA_isAnyPassable( x2, y2 )) {
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
	Game_Map.prototype.drill_ELA_isAnyPassable = function( x, y ) {
		return this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
	}
}


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_ELA_m_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_ELA_m_initialize.call(this);
	this._drill_ELA_datas = [];
}
//==============================
// * 物体 - 播放动画
//==============================
Game_Map.prototype.drill_ELA_playAnimInPos = function( a_id, x, y, angle ) {
	this._drill_ELA_datas.push( {"a_id":a_id, "x":x, "y":y,"angle":angle } );
}

//==============================
// * 场景 - 初始化
//==============================
var _drill_ELA_s_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
	_drill_ELA_s_initialize.call(this);
	this._drill_ELA_animTank = [];
}
//==============================
// * 场景 - 地图ui层
//==============================
var _drill_ELA_s_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
	_drill_ELA_s_createSpriteset.call(this);	
	if (!this._drill_map_ui_board) {
		this._drill_map_ui_board = new Sprite();
		this.addChild(this._drill_map_ui_board);
	};
};
//==============================
// * 帧刷新
//==============================
var _drill_ELA_s_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
	_drill_ELA_s_updateScene.call(this);
	this.drill_ELA_updateAnimAdd();
	this.drill_ELA_updateAnimUpdate();
	this.drill_ELA_updateAnimRemove();
}
//==============================
// * 帧刷新 - 添加动画
//==============================
Scene_Map.prototype.drill_ELA_updateAnimAdd = function() {
	
	for(var i=$gameMap._drill_ELA_datas.length-1; i>= 0; i--){
		var data = $gameMap._drill_ELA_datas[i];
		var sprite = new Sprite_Base();
		sprite.origin_x = data.x;
		sprite.origin_y = data.y;
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		this._drill_ELA_animTank.push(sprite);
		this._drill_map_ui_board.addChild(sprite);
		
		var animation = $dataAnimations[data.a_id];
		sprite.startAnimation(animation, false, 0);
		var last_a_sprite = sprite._animationSprites[sprite._animationSprites.length-1];
		if(data.angle && $gameSystem._drill_ELA_autoRotate == true){
			last_a_sprite.rotation = (data.angle-90) / 180 * Math.PI;
		}
	
		$gameMap._drill_ELA_datas.splice(i,1);
	}	
}
//==============================
// * 帧刷新 - 刷新动画位置
//==============================
Scene_Map.prototype.drill_ELA_updateAnimUpdate = function() {
	
	for(var i=0; i<this._drill_ELA_animTank.length; i++){
		var sprite = this._drill_ELA_animTank[i];
		sprite.x = $gameMap.tileWidth() * $gameMap.adjustX(sprite.origin_x) + $gameMap.tileWidth()/2 ;
		sprite.y = $gameMap.tileHeight() * $gameMap.adjustY(sprite.origin_y) + $gameMap.tileHeight()/2 ;
	}
	
}
//==============================
// * 帧刷新 - 去除动画
//==============================
Scene_Map.prototype.drill_ELA_updateAnimRemove = function() {
	for(var i=this._drill_ELA_animTank.length-1; i>=0; i--){
		var sprite = this._drill_ELA_animTank[i];
		if( !sprite.isAnimationPlaying() ){
			this._drill_map_ui_board.removeChild(sprite);
			this._drill_ELA_animTank.splice(i,1);
		}
	}
}



