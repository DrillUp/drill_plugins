//=============================================================================
// Drill_EventFrameLock.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        行走图 - 锁定帧
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
 * 测试方法：   去物体管理层、地理管理层、华容道设计跑一圈测试就可以了。
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
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFL（Event_Frame_Lock）
//		临时全局变量	无
//		临时局部变量	this._drill_EFL_lockEnabled
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	华容道设计
//		★性能测试消耗	优化核心加入前：81.7ms（drill_EFL_updateFrame）
//						优化核心加入后：34.9ms（drill_EFL_updateFrame）
//		★最坏情况		无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			锁定帧：
//				->锁定帧/解锁帧
//				->播放序列（从左往右、自定义）
//				->暂停/继续播放	
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.索引位置characterIndex()嵌入在物体中，贴图获取不到。
//			  所以这里不考虑索引的复杂情况。（索引会关联到单个人物，8个人物，多帧行走图等复杂情况。）
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
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
// * 事件注释初始化
//=============================================================================
var _drill_EFL_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFL_c_setupPageSettings.call(this);
	
	// > 初始化
	if( this._drill_EFL_anim == undefined ){
		this._drill_EFL_anim = {};
		this._drill_EFL_anim['enabled'] = false;
	}
	
	// > 注释设置
	var page = this.page();
    if( page ){
		this.list().forEach( function(l){	//将页面注释转成插件指令格式
			if( l.code === 108 ){
				var args = l.parameters[0].split(' ');
				var command = args.shift();
				if( command == "=>行走图锁定帧" ){
					if( args.length == 2 ){
						var type = String(args[1]);
						if( type == "锁定" ){
							this._drill_EFL_lockEnabled = true;
						}
						if( type == "解锁" ){
							this._drill_EFL_lockEnabled = false;
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
							this._drill_EFL_anim = {};
							this._drill_EFL_anim['enabled'] = true;
							this._drill_EFL_anim['paused'] = false;
							this._drill_EFL_anim['inter'] = Number(temp2);
							this._drill_EFL_anim['seq'] = temp_seq;
							this._drill_EFL_anim['cur_patternX'] = 0;
							this._drill_EFL_anim['cur_patternY'] = 0;
						}
					}
					if( args.length == 4 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						if( type == "锁定帧动画" && temp1 == "解锁" ){
							this._drill_EFL_anim['enabled'] = false;
						}
					}
				};  
			};
		}, this);
    }
};


//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EFL_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFL_pluginCommand.call(this, command, args);
	if( command === ">行走图锁定帧" ){
		
		/*-----------------对象组获取------------------*/
		var e_ids = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			
			if( e_ids == null && unit == "本事件" ){
				e_ids = [];
				e_ids.push( this._eventId );
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[j]) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( Number(unit) );
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( $gameVariables.value(Number(unit)) );
			}
			if( e_ids == null ){ 	//>行走图锁定帧 : 10 : 锁定
				var eid = parseInt( unit );
				if( !isNaN(eid) ){
					e_ids = [];
					e_ids.push( eid );
				}
			}
		}
			
		/*-----------------锁定/解锁------------------*/
		if( e_ids != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "锁定" ){
				for( var j=0; j < e_ids.length; j++ ){
					var e_id = e_ids[j];
					if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e._drill_EFL_lockEnabled = true;
				}
			}
			if( type == "解锁" ){
				for( var j=0; j < e_ids.length; j++ ){
					var e_id = e_ids[j];
					if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e._drill_EFL_lockEnabled = false;
				}
			}
		}
		
		/*-----------------锁定帧动画------------------*/
		if( e_ids != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "锁定帧动画" ){
				for( var j=0; j < e_ids.length; j++ ){
					var e_id = e_ids[j];
					if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					if( temp1 == "暂停" ){
						e._drill_EFL_anim['paused'] = true;
					}
					if( temp1 == "继续" ){
						e._drill_EFL_anim['paused'] = false;
					}
					if( temp1 == "解锁" ){
						e._drill_EFL_anim['enabled'] = false;
					}
				}
			}
		}
		if( e_ids != null && args.length == 8 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "锁定帧动画" ){
				for( var j=0; j < e_ids.length; j++ ){
					var e_id = e_ids[j];
					if( $gameMap.drill_EFL_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
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
					e._drill_EFL_anim = {};
					e._drill_EFL_anim['enabled'] = true;
					e._drill_EFL_anim['paused'] = false;
					e._drill_EFL_anim['inter'] = Number(temp3);
					e._drill_EFL_anim['seq'] = temp_seq;
					e._drill_EFL_anim['cur_patternX'] = 0;
					e._drill_EFL_anim['cur_patternY'] = 0;
				}
			}
		}
		
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFL_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventFrameLock.js 行走图 - 锁定帧】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// * 物体贴图帧锁定
//=============================================================================
//==============================
// * 物体贴图 - 单帧
//==============================
var _drill_EFL_COEF_updateValue_PatternX = Sprite_Character.prototype.drill_COEF_updateValue_PatternX;
Sprite_Character.prototype.drill_COEF_updateValue_PatternX = function() {
	_drill_EFL_COEF_updateValue_PatternX.call(this);
	if( this._character == undefined ){ return; }
	
	// > 锁定初始帧
	if( this._character._drill_EFL_lockEnabled == true ){
		this._drill_COEF_PatternX = this._character._originalPattern;
		return;
	}
	
	// > 锁定帧动画
	var a_data = this._character._drill_EFL_anim;
	if( a_data == undefined ){ return; }
	if( a_data['enabled'] == true ){
		this._drill_COEF_PatternX = a_data['cur_patternX'];
	}
};
//==============================
// * 物体贴图 - 朝向
//==============================
var _drill_EFL_COEF_updateValue_PatternY = Sprite_Character.prototype.drill_COEF_updateValue_PatternY;
Sprite_Character.prototype.drill_COEF_updateValue_PatternY = function() {
    _drill_EFL_COEF_updateValue_PatternY.call(this);
	if( this._character == undefined ){ return; }
	
	// > 锁定初始帧
	if( this._character._drill_EFL_lockEnabled == true ){
		this._drill_COEF_PatternY = (this._character._originalDirection - 2) / 2;
		return;
	}
	
	// > 锁定帧动画
	var a_data = this._character._drill_EFL_anim;
	if( a_data == undefined ){ return; }
	if( a_data['enabled'] == true ){
		this._drill_COEF_PatternY = a_data['cur_patternY'];
	}
};


//=============================================================================
// * 动画帧锁定
//=============================================================================
//==============================
// * 动画帧锁定 - 初始化
//==============================
var _drill_EFL_c_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function( character ){
	_drill_EFL_c_initialize.call(this,character);
	this._drill_EFL_animEnabled = false;		//锁定帧动画 开关
	this._drill_EFL_animTime = 0;				//锁定帧动画 计时器
};
//==============================
// * 动画帧锁定 - 帧刷新
//==============================
var _drill_EFL_c_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	
	// > 帧刷新当前帧
	this.drill_EFL_updateFrame();
	
	// > 原函数
	_drill_EFL_c_update.call(this);
};
//==============================
// * 动画帧锁定 - 帧刷新当前帧
//==============================
Sprite_Character.prototype.drill_EFL_updateFrame = function() {
	if( this._character == undefined ){ return; }
	
	// > 开关获取
	var a_data = this._character._drill_EFL_anim;
	if( a_data == undefined ){ return; }
	if( a_data['enabled'] == true ){
		
		// > 开启时第一帧
		if( this._drill_EFL_animEnabled == false ){
			this._drill_EFL_animEnabled = true;
			
			this._drill_EFL_animTime = 0;	//（时间置零）
		}
	}else{
		
		// > 关闭时第一帧
		if( this._drill_EFL_animEnabled == true ){
			this._drill_EFL_animEnabled = false;
			// （暂无）
		}
	}
	
	// > 播放动画帧
	if( this._drill_EFL_animEnabled == true ){
		
		// > 帧时间
		if( a_data['paused'] != true ){
			this._drill_EFL_animTime += 1;
		
		// > 帧时间暂停
		}else{
			// （无操作）
		}
		
		// > 播放
		var index = Math.floor(this._drill_EFL_animTime / a_data['inter']) % a_data['seq'].length;
		var pattern = Number( a_data['seq'][index] ) - 1;
		
		a_data['cur_patternX'] = Math.floor((pattern % 12) % 3);		//单帧
		a_data['cur_patternY'] = Math.floor((pattern % 12) / 3);		//朝向
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFrameLock = false;
		alert(
			"【Drill_EventFrameLock.js 行走图-锁定帧】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfEventFrame 行走图-行走图优化核心"
		);
}

