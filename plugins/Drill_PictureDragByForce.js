//=============================================================================
// Drill_PictureDragByForce.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 拖拽的强制操作
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureDragByForce +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令，强制拖拽图片。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics       数学模型-弹道核心
 *   - Drill_PictureDraggable       图片-可拖拽的图片
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 * 2.详细内容可以去看看 "16.图片 > 关于鼠标拖拽图片.docx"。
 * 细节：
 *   (1.此操作将模拟玩家拖拽过程，图片会被激活拖拽的标记。
 *   (2.强制操作过程中，与玩家的拖拽一样，图片在移动时会被吸附槽吸附走。
 * 设计：
 *   (1.你可以通过强制操作拖拽，实现卡片的发牌、收牌效果。
 *      就算玩家正在拖着卡片，也会被强制拿走。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令控制绑定：
 * 
 * 插件指令：>拖拽的强制操作 : 图片[1] : 拖拽到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 图片变量[1] : 拖拽到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 批量图片[10,11] : 拖拽到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 批量图片变量[21,22] : 拖拽到-匀速移动 : 位置[100,100] : 时间[60]
 * 
 * 插件指令：>拖拽的强制操作 : 图片[1] : 拖拽到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 图片[1] : 拖拽到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 图片[1] : 拖拽到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 图片[1] : 拖拽到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 图片[1] : 拖拽到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>拖拽的强制操作 : 图片[1] : 拖拽到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 
 * 1.前半部分（图片）和 后半部分（拖拽到-匀速移动 : 位置[100,100] : 时间[60]）的参数可以随意组合。
 *   一共有4*6种组合方式。
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
 * 时间复杂度： o(n^2)
 * 测试方法：   在图片管理层放置多张图片，进行多张拖拽。
 * 测试结果：   200个事件的地图中，平均消耗为：【5.10ms】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 测试方法2：  在战斗时放置多张图片，进行多张拖拽。
 * 测试结果2：  战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只进行单次拖拽指令执行，消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PDBF (Picture_Drag_By_Force)
//		临时全局变量	DrillUp.g_PDBF_xxx
//		临时局部变量	this._drill_PDBF_xxx
//		存储数据变量	$gameSystem._drill_PDBF_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	图片管理层
//		★性能测试消耗	2025/7/27：
//							》5.1ms、3.7ms（drill_PDBF_updatePosition）0.6ms、0.4ms（drill_PDBF_pluginCommand）
//		★最坏情况		暂无
//		★备注			插件指令也可能会占一点性能，因为该插件需要频繁发牌。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆图片的属性
//			->☆图片强制拖拽控制
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
//			1.此处的强制拖拽，通过 前摇时间 + 后摇时间 + 关闭优先级判定 + 设置弹道前先断开拖拽 实现。
//
//		★其它说明细节：
//			1.图片比较特殊，同时在战斗界面和地图界面都要有效果。
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
	DrillUp.g_PDBF_PluginTip_curName = "Drill_PictureDragByForce.js 图片-拖拽的强制操作";
	DrillUp.g_PDBF_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_PictureDraggable.js 图片-可拖拽的图片"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PDBF_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PDBF_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PDBF_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PDBF_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PDBF_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PDBF_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PDBF_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureDragByForce = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureDragByForce');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_PictureDraggable ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PDBF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PDBF_pluginCommand.call(this, command, args);
	this.drill_PDBF_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PDBF_pluginCommand = function( command, args ){
	if( command === ">拖拽的强制操作" ){
		
		/*-----------------对象组获取------------------*/
		var pics = null;			// 图片对象组
		if( args.length >= 2 ){
			var pic_str = String(args[1]);
			if( pics == null && pic_str.indexOf("批量图片[") != -1 ){
				pic_str = pic_str.replace("批量图片[","");
				pic_str = pic_str.replace("]","");
				pics = [];
				var temp_arr = pic_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PDBF_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PDBF_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && pic_str.indexOf("图片变量[") != -1 ){
				pic_str = pic_str.replace("图片变量[","");
				pic_str = pic_str.replace("]","");
				var pic_id = $gameVariables.value( Number(pic_str) );
				if( $gameScreen.drill_PDBF_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && pic_str.indexOf("图片[") != -1 ){
				pic_str = pic_str.replace("图片[","");
				pic_str = pic_str.replace("]","");
				var pic_id = Number(pic_str);
				if( $gameScreen.drill_PDBF_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
			
		/*-----------------拖拽到------------------*/
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "拖拽到-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					if( temp1.indexOf("位置[") != -1 ||
						temp1.indexOf("位置变量[") != -1 ){
						var num_list = this.drill_PDBF_getArgNumList(temp1);
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PDBF_setMove( "匀速变化", num_list[0], num_list[1], Number(temp2) );
						}
					}
				}
			}
			if( type == "拖拽到-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					if( temp1.indexOf("位置[") != -1 ||
						temp1.indexOf("位置变量[") != -1 ){
						var num_list = this.drill_PDBF_getArgNumList(temp1);
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PDBF_setMove( "弹性变化", num_list[0], num_list[1], Number(temp2) );
						}
					}
				}
			}
			if( type == "拖拽到-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					if( temp1.indexOf("位置[") != -1 ||
						temp1.indexOf("位置变量[") != -1 ){
						var num_list = this.drill_PDBF_getArgNumList(temp1);
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PDBF_setMove( "增减速变化", num_list[0], num_list[1], Number(temp2) );
						}
					}
				}
			}
		}
		
	};
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PDBF_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PDBF_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - 获取方括号中的数字
//
//			参数：	> arg_str 字符串
//			返回：	> 数字数组
//
//			说明：	> 能获取到字符串中的数字，且包含 变量 转换情况。
//==============================
Game_Interpreter.prototype.drill_PDBF_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr != undefined && arr.length >= 3 ){
	// > 有方括号
		var data_name = arr[1];
		var data_list = arr[2].split(",");
		var result_list = [];
		
		if( data_name.contains("变量%") ){	//（将变量值赋值给目标，需要*0.01）
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i]))*0.01 ); }
			return result_list;
		}else if( data_name.contains("变量") ){
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i])) ); }
			return result_list;
		}else{
			for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
			return result_list;
		}
	}else{
	// > 没有方括号
		var data_list = arg_str.split(",");
		var result_list = [];
		for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
		return result_list;
	}
};
//==============================
// * 插件指令 - STG兼容『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_PDBF_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PDBF_pluginCommand.call(this, command, args);
		this.drill_PDBF_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PDBF_pluginCommand = Game_Interpreter.prototype.drill_PDBF_pluginCommand;
};


//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PDBF_attr_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_PDBF_attrData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PDBF_attr_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：attrData，一对一。
//==============================
Game_Picture.prototype.drill_PDBF_checkAttrData = function(){
	if( this._drill_PDBF_attrData != undefined ){ return; }
	this._drill_PDBF_attrData = {};
	
	this._drill_PDBF_attrData['cur_time'] = 0;
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PDBF_removeAttrData = function(){
	this._drill_PDBF_attrData = undefined;
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PDBF_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PDBF_p_erase.call( this );
	this.drill_PDBF_removeAttrData();					//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PDBF_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PDBF_removeAttrData();			//（删除数据）
	}
	_drill_PDBF_p_erasePicture.call( this, pictureId );
}
//==============================
// * 图片的属性 - 参数 - 设置弹道
//==============================
Game_Picture.prototype.drill_PDBF_setMove = function( move_type, move_x, move_y, move_time ){
	
	// > 设置弹道前先断开拖拽【图片 - 可拖拽的图片】
	var controller = this.drill_PDr_getDragController();
	if( controller == undefined ){ return; }
	controller.drill_controllerDrag_updateDraging( false, false );
	
	// > 赋值 - 数据
	this.drill_PDBF_checkAttrData();
	this._drill_PDBF_attrData['cur_time'] = 0;
	
	// > 赋值 - 弹道
	var xx = this.drill_COPi_finalTransform_x();
	var yy = this.drill_COPi_finalTransform_y();
	var b_data = {};
	//   移动（movement）
	b_data['movementNum'] = 1;							//对象数量
	b_data['movementTime'] = move_time;					//时长
	b_data['movementMode'] = "两点式";					//移动模式
	//   两点式（twoPoint）
	b_data['twoPointType'] = move_type;					//两点式 - 类型（匀速移动/弹性移动/…）
	b_data['twoPointDifferenceX'] = move_x - xx;		//两点式 - 距离差值x
	b_data['twoPointDifferenceY'] = move_y - yy;		//两点式 - 距离差值y
	
	// > 赋值 - 弹道（坐标）
	$gameTemp.drill_COBa_setBallisticsMove( b_data );									//弹道核心 - 坐标初始化
	$gameTemp.drill_COBa_preBallisticsMove( this._drill_PDBF_attrData, 0, xx, yy );		//弹道核心 - 推演
}
//==============================
// * 图片的属性 - 参数 - 是否正在强制拖拽
//==============================
Game_Picture.prototype.drill_PDBF_isForcing = function(){
	if( this._drill_PDBF_attrData == undefined ){ return false; }
	if( this._drill_PDBF_attrData['_drill_COBa_x'] == undefined ){ return false; }
	if( this._drill_PDBF_attrData['cur_time'] < this._drill_PDBF_attrData['_drill_COBa_x'].length +2 +2 ){	//（播放时间+前摇时间+后摇时间）
		return true;
	}
	return false;
}


//=============================================================================
// ** ☆图片强制拖拽控制
//
//			说明：	> 此模块专门控制 图片拖拽。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片强制拖拽控制 - 拖拽的帧刷新（继承）
//==============================
var _drill_PDBF_PDr_updateDrag = Game_Picture.prototype.drill_PDr_updateDrag_OffsetAndDraging;
Game_Picture.prototype.drill_PDr_updateDrag_OffsetAndDraging = function() {
	
	this.drill_PDBF_updatePriority();		//拖拽的帧刷新 - 优先级
	this.drill_PDBF_updatePosition();		//拖拽的帧刷新 - 位置
	if( this.drill_PDBF_isForcing() == true ){ return; }	//（正在强制拖拽，跳出）
	
	// > 原函数【图片 - 可拖拽的图片】
	_drill_PDBF_PDr_updateDrag.call(this);
};
//==============================
// * 图片强制拖拽控制 - 拖拽的帧刷新 - 优先级
//==============================
Game_Picture.prototype.drill_PDBF_updatePriority = function(){
	var controller = this.drill_PDr_getDragController();
	if( controller == undefined ){ return; }
	controller._drill_PDBF_isForcing = this.drill_PDBF_isForcing();	//强制拖拽标记
}
//==============================
// * 图片强制拖拽控制 - 拖拽的帧刷新 - 优先级 - 是否启用（继承）
//==============================
var _drill_CODAA_PDBF_controllerDrag_isPriorityEnabled = Drill_CODAA_DragController.prototype.drill_controllerDrag_isPriorityEnabled;
Drill_CODAA_DragController.prototype.drill_controllerDrag_isPriorityEnabled = function(){
	
	// > 强制拖拽标记
	if( this._drill_PDBF_isForcing == true ){ return false; }
	
	// > 原函数
	return _drill_CODAA_PDBF_controllerDrag_isPriorityEnabled.call( this );
}
//==============================
// * 图片强制拖拽控制 - 拖拽的帧刷新 - 位置
//==============================
Game_Picture.prototype.drill_PDBF_updatePosition = function() {
	var controller = this.drill_PDr_getDragController();
	if( controller == undefined ){ return; }
	var is_forcing = this.drill_PDBF_isForcing();
	if( is_forcing == false ){ return; }
	
	// > 参数 - 是否悬停
	var is_onHover = true;
	
	// > 参数 - 是否按下
	var is_onPress = true;
	
	// > 前摇时间
	//		（前两帧，取消悬停、按下）
	var time = this._drill_PDBF_attrData['cur_time'] -2;
	if( time < 0 ){
		time = 0;
		is_onHover = false;
		is_onPress = false;
	}
	
	// > 后摇时间
	//		（播放结束后两帧，取消悬停、按下）
	if( time >= this._drill_PDBF_attrData['_drill_COBa_x'].length ){
		time =  this._drill_PDBF_attrData['_drill_COBa_x'].length -1;
		is_onHover = false;
		is_onPress = false;
	}
	
	// > 参数 - 鼠标位置
	var xx = this._drill_PDBF_attrData['_drill_COBa_x'][time];
	var yy = this._drill_PDBF_attrData['_drill_COBa_y'][time];
	
	// > 帧刷新 控制器【图片 - 可拖拽的图片】
	controller.drill_controllerDrag_updateOffset( xx, yy );
	controller.drill_controllerDrag_updateDraging( is_onHover, is_onPress );
	
	// > 时间+1
	this._drill_PDBF_attrData['cur_time'] += 1;
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureDragByForce = false;
		var pluginTip = DrillUp.drill_PDBF_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


