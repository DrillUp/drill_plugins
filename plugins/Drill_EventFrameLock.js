//=============================================================================
// Drill_EventFrameLock.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        行走图 - 锁定帧
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventFrameLock +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以完全锁定事件行走图的初始帧。
 * ★★需要放在插件 多帧行走图 的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于核心插件，才能运行。
 * 基于：
 *   - Drill_CoreOfEventFrame        行走图-行走图优化核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   对事件的行走图有效。但不支持多帧行走图锁定。
 * 2.更多详细内容，去看看 "7.行走图 > 关于多帧行走图.docx"。
 * 锁定帧：
 *   (1.锁定后，无论行走图如何、朝向如何，行走图都为编辑器中设置的
 *      行走图帧图像。不会被更改。
 *   (2.固定帧与锁定帧的定义不一样，见 "7.行走图 > 关于多帧行走图.docx"。
 *      固定帧只控制帧数，锁定帧会控制帧数+朝向。
 *   (3.该插件的设置跨事件页。
 *      单独锁定与锁定帧动画同时开启时，以单独锁定的图像为准。
 *   (4.玩家不能锁定帧，但是你可以使用其他事件代替玩家执行某些动作。
 * 锁定帧动画：
 *   (1.锁定帧动画将强制行走图按照指定序列进行播放，也就是将行走图
 *      变成静态gif。并且行走图锁定只有12帧的内容。
 *   (2.如果你要做复杂的帧数动画，建议使用 多帧行走图 插件。
 * 随机锁定：
 *   (1.锁定帧 能够和 事件转向插件 的 当前事件页随机朝向 合并使用。
 *      顺序固定为 先执行随机朝向，再永久锁定帧。
 *   (2.锁定帧 能够和 多帧行走图插件 的 随机初始帧 合并使用。
 *      顺序固定为 先执行随机初始帧，再永久锁定帧。
 * 设计：
 *   (1.锁定帧可用于某些完全静态的砖块，添加注释后不管是触发还是移动，
 *      都不会改变该事件的行走图。
 *   (2.固定的小GIF可以被设计在行走图中，通过锁定帧动画循环播放。
 *      比如小爱丽丝的简易舞蹈动作。但注意最多只有12帧内容。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 锁定帧需要使用下面注释：
 * （注意，冒号左右都有一个空格）
 * 
 * 事件注释：=>行走图锁定帧 : 锁定
 * 事件注释：=>行走图锁定帧 : 解锁
 *
 * 1.锁定后，无论行走图如何、朝向如何，行走图都为编辑器中设置的行走图
 *   帧图像。不会被更改。
 * 2.因为锁定是跨事件页的，所以你可能会需要在新的事件页添加解锁注释。
 * 3.该锁定能够和 事件转向插件 的 当前事件页随机朝向 合并使用。
 *   顺序固定为 先执行随机朝向，再永久锁定帧。
 * 4.该锁定能够和 多帧行走图插件 的 随机初始帧 合并使用。
 *   顺序固定为 先执行随机初始帧，再永久锁定帧。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 锁定解锁
 * 你也可以使用插件指令临时锁定帧：
 * （注意，冒号左右都有一个空格）
 *
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定
 * 插件指令：>行走图锁定帧 : 事件[10] : 锁定
 * 插件指令：>行走图锁定帧 : 事件变量[21] : 锁定
 * 插件指令：>行走图锁定帧 : 批量事件[10,11] : 锁定
 * 插件指令：>行走图锁定帧 : 批量事件变量[21,22] : 锁定
 * 
 * 插件指令：>行走图锁定帧 : 事件[10] : 锁定
 * 插件指令：>行走图锁定帧 : 事件[10] : 解锁
 * 
 * 1.前面部分（本事件）和后面设置（锁定）可以随意组合。
 *   一共有5*2种组合方式。
 * 2.锁定后，无论行走图如何、朝向如何，行走图都为编辑器中设置的行走图
 *   帧图像。不会被更改。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 锁定帧动画
 * 你可以设置行走图的帧按照指定的动画顺序进行播放动作：
 * （注意，冒号左右都有一个空格）
 * 
 * 事件注释：=>行走图锁定帧 : 锁定帧动画 : 从左往右 : 帧间隔[8]
 * 事件注释：=>行走图锁定帧 : 锁定帧动画 : 从右往左 : 帧间隔[8]
 * 事件注释：=>行走图锁定帧 : 锁定帧动画 : 帧序列[1,2,3,4,5,6,7,8,9,10,11,12] : 帧间隔[8]
 * 事件注释：=>行走图锁定帧 : 锁定帧动画 : 解锁
 * 
 * 1.无论行走图如何、朝向如何，帧动画都只按照注释给的序列进行播放。
 *   不会被更改。
 * 2."从左往右 : 帧间隔[8]"，表示每隔8帧的速度，从左往右播放序列。
 *   这里的帧间隔只能填数字。
 * 3.序列"从左往右"即从1到12，"从右往左"即从12到1，
 *   序列编号用逗号隔开，编号数量不限。到了末尾将自动重播序列。
 * 4.标准的行走图是朝向 下,左,右,上，也就是说 从1到12播放一遍即 下方向播
 *   放3个姿势，左方向播放3个姿势，接着是右，再就是上……如此往复。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 锁定帧动画
 * 你也可以使用插件指令临时设置动画：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定帧动画 : 从左往右 : 帧间隔[8]
 * 插件指令：>行走图锁定帧 : 事件[10] : 锁定帧动画 : 从左往右 : 帧间隔[8]
 * 插件指令：>行走图锁定帧 : 事件变量[21] : 锁定帧动画 : 从左往右 : 帧间隔[8]
 * 插件指令：>行走图锁定帧 : 批量事件[10,11] : 锁定帧动画 : 从左往右 : 帧间隔[8]
 * 插件指令：>行走图锁定帧 : 批量事件变量[21,22] : 锁定帧动画 : 从左往右 : 帧间隔[8]
 * 
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定帧动画 : 从左往右 : 帧间隔[8]
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定帧动画 : 从右往左 : 帧间隔[8]
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定帧动画 : 帧序列[1,2,3,4,5,6,7,8] : 帧间隔[8]
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定帧动画 : 暂停
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定帧动画 : 继续
 * 插件指令：>行走图锁定帧 : 本事件 : 锁定帧动画 : 解锁
 * 
 * 1.前面部分（本事件）和后面设置（锁定）可以随意组合。
 *   一共有5*2种组合方式。
 * 2.无论行走图如何、朝向如何，帧动画都只按照插件指令给的序列进行播放。
 *   不会被更改。
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
 * 测试方法：   去行走图管理层、华容道设计跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【34.90ms】
 *              100个事件的地图中，平均消耗为：【17.16ms】
 *               50个事件的地图中，平均消耗为：【9.63ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.如果没有使用优化核心，此插件的性能消耗与事件直接成正比，
 *   因为一个事件对应一个行走图，是几乎一比一的消耗。
 *   分别为：200事件81.70ms，100事件38.41ms，50事件16.19ms。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了解锁帧、锁定帧动画功能。
 * [v1.2]
 * 完善了插件指令，以及文档、概念的说明。
 * [v1.3]
 * 优化了插件指令细节。
 * [v1.4]
 * 优化了内部结构，减少性能消耗。
 * [v1.5]
 * 改进了结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFL（Event_Frame_Lock）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	行走图管理层、华容道设计
//		★性能测试消耗	2024/1/22：
//							》34.9ms（drill_EFL_updateFrame）
//						2024/6/15：
//							》17.2ms（drill_EFL_updateAnimFrame）5.1ms（drill_EFL_isLockEnabled）1.8ms（drill_EFL_isAnimEnabled）
//		★最坏情况		无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//				->播放序列（从左往右、自定义）
//				->暂停/继续播放	
//			->☆事件注释
//			
//			->☆物体的属性
//				->锁定为 初始帧
//				->锁定为 动画帧
//			->☆动画帧控制
//			->☆锁定控制
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
//			暂无
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
	DrillUp.g_EFL_PluginTip_curName = "Drill_EventFrameLock.js 行走图-锁定帧";
	DrillUp.g_EFL_PluginTip_baseList = ["Drill_CoreOfEventFrame.js 行走图-行走图优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EFL_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EFL_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EFL_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EFL_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EFL_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EFL_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EFL_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFrameLock = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventFrameLock');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventFrame ){


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EFL_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFL_pluginCommand.call(this, command, args);
	if( command === ">行走图锁定帧" ){
		
		/*-----------------对象组获取------------------*/
		var e_list = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_list = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_list = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
		}
			
		/*-----------------锁定/解锁------------------*/
		if( e_list != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "锁定" ){
				for( var j=0; j < e_list.length; j++ ){
					var e = e_list[j];
					e.drill_EFL_setLockEnabled( true );
				}
			}
			if( type == "解锁" ){
				for( var j=0; j < e_list.length; j++ ){
					var e = e_list[j];
					e.drill_EFL_setLockEnabled( false );
				}
			}
		}
		
		/*-----------------锁定帧动画------------------*/
		if( e_list != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "锁定帧动画" ){
				for( var j=0; j < e_list.length; j++ ){
					var e = e_list[j];
					if( temp1 == "暂停" ){
						e.drill_EFL_setPaused( true );
					}
					if( temp1 == "继续" ){
						e.drill_EFL_setPaused( false );
					}
					if( temp1 == "解锁" ){
						e.drill_EFL_setAnimEnabled( false );
					}
				}
			}
		}
		if( e_list != null && args.length == 8 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "锁定帧动画" ){
				for( var j=0; j < e_list.length; j++ ){
					var e = e_list[j];
					var temp_seq = [];
					if( temp2 == "从左往右" ){
						temp_seq = [1,2,3,4,5,6,7,8,9,10,11,12];
					}else if( temp2 == "从右往左"){
						temp_seq = [12,11,10,9,8,7,6,5,4,3,2,1];
					}else{
						temp2 = temp2.replace("帧序列[","");
						temp2 = temp2.replace("]","");
						temp_seq = temp2.split(/[,，]/);
					}
					temp3 = temp3.replace("帧间隔[","");
					temp3 = temp3.replace("]","");
					
					e.drill_EFL_setAnimEnabled( true );
					e.drill_EFL_setAnimInter( Number(temp3) );
					e.drill_EFL_setAnimSeq( temp_seq );
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFL_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EFL_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 初始化绑定
//
//			说明：	> 注释与当前事件页有关，不一定跨事件页。
//==============================
var _drill_EFL_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFL_c_setupPageSettings.call(this);
    this.drill_EFL_setupPageSettings();
};
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EFL_setupPageSettings = function() {
	
	// > 事件页变化时，重置
	if( this._drill_EFL_lockData != undefined ){
		//this._drill_EFL_lockData['lockEnabled'] = false;	//（锁定设置 跨事件页）
		this._drill_EFL_lockData['animEnabled'] = false;
	}
	
	// > 注释设置
	var page = this.page();
	if( page == undefined ){ return; }
	
	var temp_list = this.list();
	for(var k = 0; k < temp_list.length; k++ ){
		var l = temp_list[k];
		if( l.code === 108 ){
			
			/*-----------------标准注释------------------*/
			var row = l.parameters[0];
			var args = row.split(/[ ]+/);
			var command = args.shift();
			if( command == "=>行走图锁定帧" ){
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "锁定" ){
						this.drill_EFL_setLockEnabled( true );
					}
					if( type == "解锁" ){
						this.drill_EFL_setLockEnabled( false );
					}
				}
				if( args.length == 6 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					if( type == "锁定帧动画" ){
						var temp_seq = [];
						if( temp1 == "从左往右" || temp1 == "从左往右" ){
							temp_seq = [1,2,3,4,5,6,7,8,9,10,11,12];
						}else if( temp1 == "从右往左" || temp1 == "从右往左"){
							temp_seq = [12,11,10,9,8,7,6,5,4,3,2,1];
						}else{
							temp1 = temp1.replace("帧序列[","");
							temp1 = temp1.replace("]","");
							temp_seq = temp1.split(/[,，]/);
						}
						temp2 = temp2.replace("帧间隔[","");
						temp2 = temp2.replace("]","");
						
						this.drill_EFL_setAnimEnabled( true );
						this.drill_EFL_setAnimInter( Number(temp2) );
						this.drill_EFL_setAnimSeq( temp_seq );
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "锁定帧动画" && temp1 == "解锁" ){
						this.drill_EFL_setAnimEnabled( false );
					}
				}
			}
		};
    };
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
var _drill_EFL_key_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EFL_lockData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EFL_key_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_EFL_checkLockData = function(){
	if( this._drill_EFL_lockData != undefined ){ return; }
	this._drill_EFL_lockData = {};
	
	this._drill_EFL_lockData['lockEnabled'] = false;	//锁定为 初始帧
	
	this._drill_EFL_lockData['animEnabled'] = false;	//锁定为 动画帧
	this._drill_EFL_lockData['animPaused'] = false;
	this._drill_EFL_lockData['animCurTime'] = 0;
	this._drill_EFL_lockData['animInter'] = 4;
	this._drill_EFL_lockData['animSeq'] = [];
	this._drill_EFL_lockData['animPatternX'] = 0;
	this._drill_EFL_lockData['animPatternY'] = 0;
}

//==============================
// * 物体的属性 - 锁定为 初始帧 - 是否启用
//==============================
Game_Character.prototype.drill_EFL_isLockEnabled = function(){
	if( this._drill_EFL_lockData == undefined ){ return false; }
	return this._drill_EFL_lockData['lockEnabled'];
}
//==============================
// * 物体的属性 - 锁定为 初始帧 - 设置
//==============================
Game_Character.prototype.drill_EFL_setLockEnabled = function( enabled ){
	this.drill_EFL_checkLockData();
	if( enabled == true ){
		this._drill_EFL_lockData['lockEnabled'] = true;		//（初始帧和动画帧 只能同时开一个）
		this._drill_EFL_lockData['animEnabled'] = false;
	}else{
		this._drill_EFL_lockData['lockEnabled'] = false;
	}
}

//==============================
// * 物体的属性 - 锁定为 动画帧 - 是否启用
//==============================
Game_Character.prototype.drill_EFL_isAnimEnabled = function(){
	if( this._drill_EFL_lockData == undefined ){ return false; }
	return this._drill_EFL_lockData['animEnabled'];
}
//==============================
// * 物体的属性 - 锁定为 动画帧 - 设置
//==============================
Game_Character.prototype.drill_EFL_setAnimEnabled = function( enabled ){
	this.drill_EFL_checkLockData();
	if( enabled == true ){
		this._drill_EFL_lockData['animEnabled'] = true;		//（初始帧和动画帧 只能同时开一个）
		this._drill_EFL_lockData['lockEnabled'] = false;
	}else{
		this._drill_EFL_lockData['animEnabled'] = false;
	}
	
	this._drill_EFL_lockData['animPaused'] = false;
	this._drill_EFL_lockData['animCurTime'] = 0;
}
//==============================
// * 物体的属性 - 动画帧 - 设置暂停
//==============================
Game_Character.prototype.drill_EFL_setPaused = function( enabled ){
	this.drill_EFL_checkLockData();
	this._drill_EFL_lockData['animPaused'] = enabled;
}
//==============================
// * 物体的属性 - 动画帧 - 设置帧间隔
//==============================
Game_Character.prototype.drill_EFL_setAnimInter = function( inter ){
	this.drill_EFL_checkLockData();
	this._drill_EFL_lockData['animInter'] = inter;
	this._drill_EFL_lockData['animCurTime'] = 0;
}
//==============================
// * 物体的属性 - 动画帧 - 设置动画帧
//
//			说明：	> seq为数字数组，数字范围为 1~12 。
//==============================
Game_Character.prototype.drill_EFL_setAnimSeq = function( seq ){
	this.drill_EFL_checkLockData();
	this._drill_EFL_lockData['animSeq'] = seq;
	this._drill_EFL_lockData['animCurTime'] = 0;
}
//==============================
// * 物体的属性 - 动画帧 - 获取X
//==============================
Game_Character.prototype.drill_EFL_getAnimPatternX = function(){
	if( this._drill_EFL_lockData == undefined ){ return 0; }
	return this._drill_EFL_lockData['animPatternX'];
}
//==============================
// * 物体的属性 - 动画帧 - 获取Y
//==============================
Game_Character.prototype.drill_EFL_getAnimPatternY = function(){
	if( this._drill_EFL_lockData == undefined ){ return 0; }
	return this._drill_EFL_lockData['animPatternY'];
}


//=============================================================================
// ** ☆动画帧控制
//
//			说明：	> 此模块控制 动画帧 的帧刷新。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动画帧控制 - 帧刷新
//==============================
var _drill_EFL_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_EFL_c_update.call(this);
	this.drill_EFL_updateAnimFrame();
};
//==============================
// * 动画帧控制 - 帧刷新 动画帧
//==============================
Game_Character.prototype.drill_EFL_updateAnimFrame = function() {
	if( this.drill_EFL_isAnimEnabled() == false ){ return; }
	
	// > 时间+1
	if( this._drill_EFL_lockData['animPaused'] == true ){
		// （不操作）
	}else{
		this._drill_EFL_lockData['animCurTime'] += 1;
	}
	
	// > 播放
	var cur_time = this._drill_EFL_lockData['animCurTime'];
	var cur_inter = this._drill_EFL_lockData['animInter'];
	var cur_seq = this._drill_EFL_lockData['animSeq'];
	var index = Math.floor(cur_time / cur_inter) % cur_seq.length;
	var pattern = Number( cur_seq[index] ) -1;
	
	this._drill_EFL_lockData['animPatternX'] = Math.floor((pattern % 12) % 3);		//帧数值
	this._drill_EFL_lockData['animPatternY'] = Math.floor((pattern % 12) / 3);		//朝向值
}


//=============================================================================
// ** ☆锁定控制
//
//			说明：	> 此模块提供 锁定控制 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 锁定控制 - 帧数值
//==============================
var _drill_EFL_COEF_updateValue_PatternX = Sprite_Character.prototype.drill_COEF_updateValue_PatternX;
Sprite_Character.prototype.drill_COEF_updateValue_PatternX = function() {
	_drill_EFL_COEF_updateValue_PatternX.call(this);
	if( this._character == undefined ){ return; }
	
	// > 锁定为 初始帧
	if( this._character.drill_EFL_isLockEnabled() ){
		this._drill_COEF_PatternX = this._character._originalPattern;
		return;
	}
	
	// > 锁定为 动画帧
	if( this._character.drill_EFL_isAnimEnabled() ){
		this._drill_COEF_PatternX = this._character.drill_EFL_getAnimPatternX();
	}
};
//==============================
// * 锁定控制 - 朝向值
//==============================
var _drill_EFL_COEF_updateValue_PatternY = Sprite_Character.prototype.drill_COEF_updateValue_PatternY;
Sprite_Character.prototype.drill_COEF_updateValue_PatternY = function() {
    _drill_EFL_COEF_updateValue_PatternY.call(this);
	if( this._character == undefined ){ return; }
	
	// > 锁定为 初始帧
	if( this._character.drill_EFL_isLockEnabled() ){
		this._drill_COEF_PatternY = (this._character._originalDirection - 2) / 2;
		return;
	}
	
	// > 锁定为 动画帧
	if( this._character.drill_EFL_isAnimEnabled() ){
		this._drill_COEF_PatternY = this._character.drill_EFL_getAnimPatternY();
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFrameLock = false;
		var pluginTip = DrillUp.drill_EFL_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

