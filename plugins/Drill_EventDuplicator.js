//=============================================================================
// Drill_EventDuplicator.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        物体管理 - 事件复制器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventDuplicator +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以通过插件指令复制一个事件。
 * 复制的事件是临时的，离开地图后消失。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于核心，也可以作用于其它插件。
 * 基于：
 *   - Drill_CoreOfEventManager     物体管理-事件管理核心
 * 扩展于：
 *   - Drill_EventSelfSwitch        物体-独立开关★★v1.7及以上★★
 *     复制的事件可以支持自定义E、F、G 等的独立开关。
 *   - Drill_EventForPlayer         物体管理-玩家的事件
 *     目标插件基于该插件才能进行对玩家事件的创建。
 *   - Drill_BombCore               炸弹人-游戏核心
 *     目标插件基于该插件才能进行对炸弹的基本操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.详细内容去看看 "9.物体触发 > 物体设计-复制事件的批量管理.docx"。
 * 细节：
 *   (1.复制器不建议复制自身，因为会出现死循环。
 *   (2.复制出来的事件独立开关是全部关闭的，不会随 复制源 变化。
 *   (3.复制器复制事件后，需要使用插件进行统一管理。
 *      比如使用变量数组，记录所有复制事件的id。
 *      详细管理方法，去看看 "28.物体管理 > 关于事件管理核心.docx"。
 * 注意事项：
 *   (1.该指令经过优化，可以进地图后立即使用，因为此时还需初始化外部
 *      地图的事件数据。
 *   (2.注意，v1.5以下低版本的rmmv工程不支持事件复制。
 * 设计：
 *   (1.你可以设置初始事件透明，配合 事件显现动作 插件，使得事件像是
 *      跳出来或者召唤出来一样。
 *   (2.你可以建立一个模板地图（如 模板管理层示例 ），并通过事件复制器
 *      在地图中复制任何需要的事件，比如一个可拾取的物品事件、一个炸弹、
 *      一个弹丸等。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 复制本图事件
 * 你可以通过插件指令手动修改生成的一些基本设置。
 *
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件[1] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件[1] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件[1] : 指定位置(变量) : 25 : 26
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件变量[21] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件变量[21] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制本图事件 : 源事件变量[21] : 指定位置(变量) : 25 : 26
 *
 * 1.第一条参数为：被复制的事件id，复制到位置的事件id。
 * 2.第二条参数为：被复制的事件id，复制到位置x，复制到位置y。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 复制其他图事件
 * 你可以通过插件指令手动修改生成的一些基本设置。
 *
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件[3] : 指定位置(变量) : 25 : 26
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件变量[21] : 事件位置 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件变量[21] : 指定位置 : 4 : 4
 * 插件指令：>事件复制器 : 复制其他图事件 : 地图[1] : 源事件变量[21] : 指定位置(变量) : 25 : 26
 * 
 * 1.第一条参数为：地图id，被复制的事件id，复制到位置的事件id。
 * 2.第二条参数为：地图id，被复制的事件id，复制到位置x，复制到位置y。
 * 3."地图[1]"的数值不能设置为变量，因为插件指令需要对此地图id对应的资源进行预加载。
 *   建议你将需要复制的事件，都放置到统一的地图中，再进行复制。（比如 模板管理层示例 ）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 初始透明
 * 你也可以设置初始的事件的透明情况。
 *
 * 插件指令：>事件复制器 : 事件透明开启
 * 插件指令：>事件复制器 : 事件透明关闭
 * 
 * 1.透明开启后，接下来复制的全部事件，都是透明的。并且永久有效。
 *   你需要根据情况手动关闭。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取新事件id
 * 你可以通过插件指令获取到复制的新事件的id：
 * 
 * 插件指令：>事件复制器 : 获取上一个复制事件的id : 变量[25]
 * 
 * 1.数字是 变量 的编号，新事件的id会被复制到这个变量的值中。
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
 * 测试方法：   在地图界面中，创建大量事件，比如放置15个炸弹。
 * 测试结果：   200个事件的地图中，消耗为：【28.05ms】
 *              100个事件的地图中，消耗为：【20.33ms】
 *               50个事件的地图中，消耗为：【18.72ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件比较特殊，单次执行虽然消耗的性能不多，但是事件新建之后消耗
 *   的性能就不能确定了，这个需要由它自己带的各种属性与其它插件的综合
 *   关系来决定。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了初始透明、获取新事件的id功能。
 * [v1.2]
 * 添加了版本检测。
 * [v1.3]
 * 添加了性能测试说明。
 * [v1.4]
 * 添加了游戏时，对地图id的校验检查功能。
 * [v1.5]
 * 优化了内部整体结构。
 * [v1.6]
 * 添加了 指定位置(变量) 插件指令。
 * 添加了 自定义独立开关 的支持。
 * [v1.7]
 * 修改了插件分类。
 * [v1.8]
 * 添加了 "源事件变量" 的设置。
 * [v1.9]
 * 优化了旧存档的识别与兼容。
 * [v2.0]
 * 修复了部分旧插件指令报错的bug。
 * [v2.1]
 * 修复了公共事件中的事件复制无效的bug。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EDu （Event_Duplicator）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_EDu_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	放置超级多的炸弹
//		★性能测试消耗	28.05ms
//		★最坏情况		无	
//		★备注			建立事件不消耗，消耗的是事件建立后的各种行为。
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
//				->复制本地图的事件
//				->复制其它地图的事件
//			
//			->☆等待控制
//			->☆预加载地图数据
//			->☆旧插件兼容
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
//			1.事件的独立开关是独立于事件的，需要额外刷新。
//			2.如果你需要引用该插件来创建一个外部地图的事件，
//			  那么必须先预加载地图文本数据，再创建事件。（可参考 Drill_EventForPlayer ）
//			
//		★其它说明细节：
//			1.先有事件数据，再通过事件数据new事件。
//			  事件存储数据 -> 即时事件数据 -> 事件对象
//			2.上一个复制事件的id，可以在插件指令中记录。
//
//		★存在的问题：
//			1.问题：低版本的rmmv中没有ResourceHandler的定义。
//			  解决：【已解决】，通过添加版本限制。
//		

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_EDu_PluginTip_curName = "Drill_EventDuplicator.js 物体管理-事件复制器";
	DrillUp.g_EDu_PluginTip_baseList = ["Drill_CoreOfEventManager.js 物体管理-事件管理核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EDu_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EDu_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EDu_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EDu_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EDu_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EDu_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EDu_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 地图文件丢失
	//==============================
	DrillUp.drill_EDu_getPluginTip_MapLost = function( key ){
		return "【" + DrillUp.g_EDu_PluginTip_curName + "】\n"+
				"插件指令指定要复制地图"+ key +"中的某个事件。\n"+
				"但是系统并没有找到这个地图文件。\n"+
				"请检查你的地图文件是否存在，或者修改插件指令。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventDuplicator = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventDuplicator');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventManager ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EDu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EDu_pluginCommand.call(this, command, args);
	if( command === ">事件复制器" ){
		
		/*-----------------复制本图事件------------------*/
		if( args.length >= 8 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var pos = String(args[5]);
			var temp2 = Number(args[7]);
			if(args[9]){ var temp3 = Number(args[9]) };
			
			if( type == "复制本图事件" ){
				var e_id = null;
				if( temp1.indexOf("源事件[") != -1 ||
					temp1.indexOf("原事件[") != -1 ||
					/^\d+$/.test(temp1) == true ){	//（判断数字）
					temp1 = temp1.replace("源事件[","");
					temp1 = temp1.replace("原事件[","");
					temp1 = temp1.replace("]","");
					e_id = Number(temp1);
				}
				if( temp1.indexOf("源事件变量[") != -1 ||
					temp1.indexOf("原事件变量[") != -1 ){
					temp1 = temp1.replace("源事件变量[","");
					temp1 = temp1.replace("原事件变量[","");
					temp1 = temp1.replace("]","");
					e_id = $gameVariables.value( Number(temp1) );
				}
				
				var xx = null;
				var yy = null;
				if( e_id != null && pos == "指定位置" ){
					if( $gameMap.drill_EDu_isEventExist( e_id ) == false ){ return; }
					xx = temp2;
					yy = temp3;
				}
				if( e_id != null && pos == "指定位置(变量)" ){
					if( $gameMap.drill_EDu_isEventExist( e_id ) == false ){ return; }
					xx = $gameVariables.value(temp2);
					yy = $gameVariables.value(temp3);
				}
				if( e_id != null && pos == "事件位置" ){
					if( $gameMap.drill_EDu_isEventExist( e_id ) == false ){ return; }
					if( $gameMap.drill_EDu_isEventExist( temp2 ) == false ){ return; }
					xx = $gameMap.event(temp2)._x;
					yy = $gameMap.event(temp2)._y;
				}
				
				if( xx != null && yy != null ){
					// > 生成事件
					var e = $gameMap.drill_COEM_offspring_createEvent( $gameMap._mapId, e_id, xx, yy );
					// > 记录id
					$gameSystem._drill_EDu_last_id = e._eventId;
					// > 设置透明度
					if( $gameSystem._drill_EDu_is_opacity == true ){ e._opacity = 0; }
				}
			}
		}
		
		/*-----------------复制其他图事件------------------*/
		if( args.length >= 10 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var pos = String(args[7]);
			var temp3 = Number(args[9]);
			if(args[11]){ var temp4 = Number(args[11]) };
			
			if( type == "复制其他图事件" ){
				temp1 = temp1.replace("地图[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				var e_id = null;
				if( temp2.indexOf("源事件[") != -1 ||
					temp2.indexOf("原事件[") != -1 ||
					/^\d+$/.test(temp2) == true ){	//（判断数字）
					temp2 = temp2.replace("源事件[","");
					temp2 = temp2.replace("原事件[","");
					temp2 = temp2.replace("]","");
					e_id = Number(temp2);
				}
				if( temp2.indexOf("源事件变量[") != -1 ||
					temp2.indexOf("原事件变量[") != -1 ){
					temp2 = temp2.replace("源事件变量[","");
					temp2 = temp2.replace("原事件变量[","");
					temp2 = temp2.replace("]","");
					e_id = $gameVariables.value( Number(temp2) );
				}
				
				var xx = null;
				var yy = null;
				if( e_id != null && pos == "指定位置" ){
					if( DataManager.drill_COEM_isMapExist( temp1 ) == false ){ return; }
					xx = Number(temp3);
					yy = Number(temp4);
				}
				if( e_id != null && pos == "指定位置(变量)" ){
					if( DataManager.drill_COEM_isMapExist( temp1 ) == false ){ return; }
					xx = $gameVariables.value(temp3);
					yy = $gameVariables.value(temp4);
				}
				if( e_id != null && pos == "事件位置" ){
					if( DataManager.drill_COEM_isMapExist( temp1 ) == false ){ return; }
					if( $gameMap.drill_EDu_isEventExist( temp3 ) == false ){ return; }
					xx = $gameMap.event(temp3)._x;
					yy = $gameMap.event(temp3)._y;
				}
				
				if( xx != null && yy != null ){
					
					// > 等待加载，然后再生成事件（见函数 drill_EDu_setWait_MapId ）
					if( DataManager.drill_COEM_isMapLoaded( temp1 ) == false ){
						DataManager.drill_COEM_loadMapData( temp1, e_id, xx, yy );
						this.drill_EDu_setWait_MapId( temp1 );
						this.setWaitMode("_drill_EDu_waitLoading");		//『强制等待』
						
					// > 已加载，直接生成事件
					}else{
						// > 生成事件
						var e = $gameMap.drill_COEM_offspring_createEvent( temp1, e_id, xx, yy );
						// > 记录id
						$gameSystem._drill_EDu_last_id = e._eventId;
						// > 设置透明度
						if( e && $gameSystem._drill_EDu_is_opacity == true ){ e._opacity = 0; }
					}
				}
			}
		}
		
		/*-----------------初始透明------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "事件透明开启" ){
				$gameSystem._drill_EDu_is_opacity = true;
			}
			if( type == "事件透明关闭" ){
				$gameSystem._drill_EDu_is_opacity = false;
			}
		}
		
		/*-----------------获取新事件id------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "获取上一个复制事件的id" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameVariables.setValue(temp1, $gameSystem._drill_EDu_last_id);
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EDu_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EDu_getPluginTip_EventNotFind( e_id ) );
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
DrillUp.g_EDu_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EDu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EDu_sys_initialize.call(this);
	this.drill_EDu_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EDu_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EDu_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EDu_saveEnabled == true ){	
		$gameSystem.drill_EDu_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EDu_initSysData();
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
Game_System.prototype.drill_EDu_initSysData = function() {
	this.drill_EDu_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EDu_checkSysData = function() {
	this.drill_EDu_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EDu_initSysData_Private = function() {
	
	this._drill_EDu_last_id = 0;			//上一个生成的事件id
	this._drill_EDu_is_opacity = false;		//透明度（只限于本插件的指令）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EDu_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EDu_last_id == undefined ){
		this.drill_EDu_initSysData();
	}
};



//=============================================================================
// ** ☆等待控制
//
//			说明：	> 此模块专门定义 等待类型。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 等待控制 - 设置监听列表
//
//			说明：	> 由于 等待函数updateWaitMode 会在 执行函数executeCommand 之前帧刷新，所以可以在等待函数中复制事件。
//==============================
Game_Interpreter.prototype.drill_EDu_setWait_MapId = function( map_id, e_id, xx, yy ){
	this._drill_EDu_wait_map_id = map_id;
	this._drill_EDu_wait_e_id = e_id;
	this._drill_EDu_wait_xx = xx;
	this._drill_EDu_wait_yy = yy;
};
//==============================
// * 等待控制 - 自定义等待类型
//==============================
var _drill_EDu_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function(){
	
	// > 等待类型
	if( this._waitMode == "_drill_EDu_waitLoading" ){		//『强制等待』指定的图片任何一个未加载，则持续等待
		if( this._drill_EDu_wait_map_id != undefined ){
			var map_id = this._drill_EDu_wait_map_id;
			if( DataManager.drill_COEM_isMapLoaded( map_id ) == false ){
				return true;	//（返回true表示要等待）
			}
			var e_id = this._drill_EDu_wait_e_id;
			var xx = this._drill_EDu_wait_xx;
			var yy = this._drill_EDu_wait_yy;
			
			// > 生成事件
			var e = $gameMap.drill_COEM_offspring_createEvent( temp1, e_id, xx, yy );
			// > 记录id
			$gameSystem._drill_EDu_last_id = e._eventId;
			// > 设置透明度
			if( e && $gameSystem._drill_EDu_is_opacity == true ){ e._opacity = 0; }
			
			// > 清空参数
			this._drill_EDu_wait_map_id = undefined;
			this._drill_EDu_wait_e_id = undefined;
			this._drill_EDu_wait_xx = undefined;
			this._drill_EDu_wait_yy = undefined;
		}
	}
	
	// > 原函数
	return _drill_EDu_updateWaitMode.call(this);
};


//=============================================================================
// ** ☆预加载地图数据
//			
//			说明：	> 此模块根据 地图id 预加载 地图数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载地图数据 - 绑定数据
//==============================
var _drill_EDu_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	this.drill_EDu_loadMapData();
    _drill_EDu_onMapLoaded.call(this);
};
//==============================
// * 预加载地图数据 - 插件指令的地图id
//==============================
Scene_Map.prototype.drill_EDu_loadMapData = function() {
	var temp_map = {};
	
	// > 全词匹配 - 事件 的插件指令
	var dataString = JSON.stringify( $dataMap.events );
	var matches = dataString.match( />事件复制器 : 复制其他图事件 : (\d+) :/g ) ;
	if( matches ){
		for( var i=0; i< matches.length; i++ ){		//（标记地图id）
			var str = matches[i].match( />事件复制器 : 复制其他图事件 : (\d+) :/ );
			temp_map[Number(str[1])] = true;
		}
	}
	var matches = dataString.match( />事件复制器 : 复制其他图事件 : 地图\[(\d+)\] :/g ) ;
	if( matches ){
		for( var i=0; i< matches.length; i++ ){
			var str = matches[i].match( />事件复制器 : 复制其他图事件 : 地图\[(\d+)\] :/ );
			temp_map[Number(str[1])] = true;
		}
	}
	
	// > 全词匹配 - 公共事件 的插件指令
	var dataString = JSON.stringify( $dataCommonEvents );
	var matches = dataString.match( />事件复制器 : 复制其他图事件 : (\d+) :/g ) ;
	if( matches ){
		for( var i=0; i< matches.length; i++ ){		//（标记地图id）
			var str = matches[i].match( />事件复制器 : 复制其他图事件 : (\d+) :/ );
			temp_map[Number(str[1])] = true;
		}
	}
	var matches = dataString.match( />事件复制器 : 复制其他图事件 : 地图\[(\d+)\] :/g ) ;
	if( matches ){
		for( var i=0; i< matches.length; i++ ){
			var str = matches[i].match( />事件复制器 : 复制其他图事件 : 地图\[(\d+)\] :/ );
			temp_map[Number(str[1])] = true;
		}
	}
	
	// > 测试 - 显示匹配的地图
	//alert( JSON.stringify(temp_map) );
	
	// > 加载地图
	for( var key in temp_map ){
		
		// > 资源不存在 提示
		if( DataManager.drill_COEM_isMapExist( key ) == false ){
			alert( DrillUp.drill_EDu_getPluginTip_MapLost( key ) );
		}
		
		// > 执行加载
		DataManager.drill_COEM_loadMapData( key );
	}
};


//=============================================================================
// ** ☆旧插件兼容
//			
//			说明：	> 此模块兼容 旧插件 的函数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 旧插件兼容 - 创建事件（主流程）
//==============================
Game_Map.prototype.drill_EDu_createEvent = function( map_id, event_id, tar_x, tar_y ){
	return this.drill_COEM_offspring_createEvent( map_id, event_id, tar_x, tar_y );
};
//==============================
// * 旧插件兼容 - 创建事件（根据数据）
//==============================
Game_Map.prototype.drill_newEvent_createEvent = function( data ){
	return this.drill_COEM_offspring_createEventByData_Private( data );
};
//==============================
// * 旧插件兼容 - 删除全部独立开关
//==============================
Game_SelfSwitches.prototype.drill_newEvent_clearKeys = function( map_id, e_id ){
	this.drill_COEM_deleteEventKeys_Private( map_id, e_id );
};

//==============================
// * 旧插件兼容 - 地图读取器 - 获取资源
//==============================
DataManager.drill_getMapData = function( map_id ){
	return this.drill_COEM_getMapData_Private( map_id );
};
//==============================
// * 旧插件兼容 - 地图读取器 - 提前加载资源
//==============================
DataManager.drill_loadMapData = function( map_id ){
	this.drill_COEM_loadMapData_Private( map_id );
};
//==============================
// * 旧插件兼容 - 地图读取器 - 地图资源是否存在
//==============================
Game_Temp.prototype.drill_EDu_hasMapId = function( map_id ){
	return DataManager.drill_COEM_isMapExist( map_id );
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventDuplicator = false;
		var pluginTip = DrillUp.drill_EDu_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

