//=============================================================================
// Drill_PictureDragAnimation.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 拖拽的动画效果
 * @author Drill_up
 * 
 * @Drill_LE_param "拖拽动画样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_PDA_styleList_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureDragAnimation +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以给图片添加拖拽的动画效果。
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
 *   (1.动画效果不会影响图片的碰撞体位置，只是贴图位置发生了偏移而已。
 * 设计：
 *   (1.拖拽的动画效果 和 图片阴影效果 两个插件可以一起使用，
 *      能实现"抬起卡片时"，看到卡片的阴影，从而有卡片高度差的感觉。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令控制绑定：
 * 
 * 插件指令：>拖拽的动画效果 : 图片[1] : 绑定动画效果 : 样式[1]
 * 插件指令：>拖拽的动画效果 : 图片变量[1] : 绑定动画效果 : 样式[1]
 * 插件指令：>拖拽的动画效果 : 批量图片[10,11] : 绑定动画效果 : 样式[1]
 * 插件指令：>拖拽的动画效果 : 批量图片变量[21,22] : 绑定动画效果 : 样式[1]
 * 
 * 插件指令：>拖拽的动画效果 : 图片[1] : 绑定动画效果 : 样式[1]
 * 插件指令：>拖拽的动画效果 : 图片[1] : 关闭动画效果
 * 
 * 1.前半部分（图片）和 后半部分（绑定动画效果 : 样式[1]）的参数可以随意组合。
 *   一共有4*2种组合方式。
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
 * 测试方法：   在图片管理层放置多张图片，进行多张拖拽。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 测试方法2：  在战斗时放置多张图片，进行多张拖拽。
 * 测试结果2：  战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件进行坐标动画功能扩展，消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param ---拖拽动画样式集---
 * @default
 *
 * @param 拖拽动画样式-1
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default {"标签":"==标准抬起==","相对移动位置 X":"0","相对移动位置 Y":"-20","移动模式":"弹性移动","移动动画时长":"16"}
 * 
 * @param 拖拽动画样式-2
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default {"标签":"==瞬间抬起==","相对移动位置 X":"0","相对移动位置 Y":"-20","移动模式":"匀速移动","移动动画时长":"1"}
 * 
 * @param 拖拽动画样式-3
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-4
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-5
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-6
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-7
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-8
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-9
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-10
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-11
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-12
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-13
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-14
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-15
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-16
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-17
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-18
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-19
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 * @param 拖拽动画样式-20
 * @parent ---拖拽动画样式集---
 * @type struct<DrillPDAStyle>
 * @desc 拖拽动画样式配置。
 * @default 
 * 
 */
/*~struct~DrillPDAStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的拖拽动画样式==
 * 
 * 
 * @param 相对移动位置 X
 * @desc 以绑定的图片位置为准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 * 
 * @param 相对移动位置 Y
 * @desc 以绑定的图片位置为准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default -20
 * 
 * @param 移动模式
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 增减速移动
 * @value 增减速移动
 * @desc 图片的移动到相对位置时的移动模式。
 * @default 弹性移动
 * 
 * @param 移动动画时长
 * @type number
 * @min 1
 * @desc 图片移动动画的时长。
 * @default 20
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PDA (Picture_Drag_Animation)
//		临时全局变量	DrillUp.g_PDA_xxx
//		临时局部变量	this._drill_PDA_xxx
//		存储数据变量	$gameSystem._drill_PDA_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)  每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2025/7/27：
//							》未找到
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
//			->☆插件指令
//			
//			->☆图片的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->消除图片
//					->消除图片（command235）
//				->参数
//					->设置样式
//					->获取样式
//			->☆图片贴图控制
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
	DrillUp.g_PDA_PluginTip_curName = "Drill_PictureDragAnimation.js 图片-拖拽的动画效果";
	DrillUp.g_PDA_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_PictureDraggable.js 图片-可拖拽的图片"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PDA_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PDA_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PDA_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PDA_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PDA_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PDA_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PDA_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureDragAnimation = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureDragAnimation');
	
	//==============================
	// * 静态数据 - 拖拽动画样式
	//				（~struct~DrillPDAStyle）
	//==============================
	DrillUp.drill_PDA_initStyle = function( dataFrom ){
		var data = {};
		
		data['move_x'] = Number( dataFrom["相对移动位置 X"] || 0);
		data['move_y'] = Number( dataFrom["相对移动位置 Y"] || 0);
		data['move_type'] = String( dataFrom["移动模式"] || "匀速移动");
		data['move_time'] = Number( dataFrom["移动动画时长"] || 20);
		
		return data;
	}
	/*-----------------拖拽动画样式------------------*/
	DrillUp.g_PDA_styleList_length = 20;
	DrillUp.g_PDA_styleList = [];
	for( var i = 0; i < DrillUp.g_PDA_styleList_length; i++ ){
		if( DrillUp.parameters["拖拽动画样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["拖拽动画样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["拖拽动画样式-" + String(i+1) ]);
			DrillUp.g_PDA_styleList[i] = DrillUp.drill_PDA_initStyle( data );
		}else{
			DrillUp.g_PDA_styleList[i] = null;
		}
	}
	
	

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
var _drill_PDA_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PDA_pluginCommand.call(this, command, args);
	this.drill_PDA_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PDA_pluginCommand = function( command, args ){
	if( command === ">拖拽的动画效果" ){
		
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
					if( $gameScreen.drill_PDA_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PDA_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && pic_str.indexOf("图片变量[") != -1 ){
				pic_str = pic_str.replace("图片变量[","");
				pic_str = pic_str.replace("]","");
				var pic_id = $gameVariables.value( Number(pic_str) );
				if( $gameScreen.drill_PDA_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && pic_str.indexOf("图片[") != -1 ){
				pic_str = pic_str.replace("图片[","");
				pic_str = pic_str.replace("]","");
				var pic_id = Number(pic_str);
				if( $gameScreen.drill_PDA_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
			
		/*-----------------绑定动画效果------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "关闭动画效果" ){
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PDA_removeAttrData();
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "绑定动画效果" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PDA_setStyleId( Number(temp1)-1 );
					}
				}
			}
		}
		
	};
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PDA_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PDA_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - STG兼容『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_PDA_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PDA_pluginCommand.call(this, command, args);
		this.drill_PDA_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PDA_pluginCommand = Game_Interpreter.prototype.drill_PDA_pluginCommand;
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
var _drill_PDA_attr_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_PDA_attrData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PDA_attr_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：attrData，一对一。
//==============================
Game_Picture.prototype.drill_PDA_checkAttrData = function(){
	if( this._drill_PDA_attrData != undefined ){ return; }
	this._drill_PDA_attrData = {};
	
	// > 数据 - 动画样式
	this._drill_PDA_attrData['style_id'] = -1;
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PDA_removeAttrData = function(){
	this._drill_PDA_attrData = undefined;
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PDA_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PDA_p_erase.call( this );
	this.drill_PDA_removeAttrData();					//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PDA_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PDA_removeAttrData();				//（删除数据）
	}
	_drill_PDA_p_erasePicture.call( this, pictureId );
}
//==============================
// * 图片的属性 - 参数 - 设置样式
//==============================
Game_Picture.prototype.drill_PDA_setStyleId = function( style_id ){
	this.drill_PDA_checkAttrData();
	this._drill_PDA_attrData['style_id'] = style_id;
}
//==============================
// * 图片的属性 - 参数 - 获取样式
//==============================
Game_Picture.prototype.drill_PDA_getStyleId = function(){
	if( this._drill_PDA_attrData == undefined ){ return -1; }
	return this._drill_PDA_attrData['style_id'];
}


//=============================================================================
// ** ☆图片贴图控制
//
//			说明：	> 该模块专门控制 图片贴图 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片贴图控制 - 初始化
//==============================
var _drill_PDA_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	
	// > 初始化（要放前面，因为 图片贴图initialize中会执行一次update）
	this._drill_PDA_curStyle = -1;
	this._drill_PDA_curBallistics = {};
	this._drill_PDA_curIndex = 0;
	
	// > 原函数
	_drill_PDA_sp_initialize.call( this, pictureId );
};
//==============================
// * 图片贴图控制 - 帧刷新
//==============================
var _drill_PDA_sp_updatePosition = Sprite_Picture.prototype.updatePosition;
Sprite_Picture.prototype.updatePosition = function(){
	_drill_PDA_sp_updatePosition.call(this);
	this.drill_PDA_updateStyle();
	this.drill_PDA_updatePosition();
}

//==============================
// * 图片贴图控制 - 帧刷新 - 样式
//==============================
Sprite_Picture.prototype.drill_PDA_updateStyle = function(){
	var picture = this.picture();
	if( picture == undefined ){ return; }
	
	// > 样式切换时
	var cur_style = picture.drill_PDA_getStyleId();
	if( cur_style != this._drill_PDA_curStyle ){
		
		// > 先赋值样式id
		this._drill_PDA_curStyle = cur_style;
		
		// > 再刷新弹道
		this.drill_PDA_refreshBallistics();
	}
};
//==============================
// * 图片贴图控制 - 获取样式数据（开放函数）
//==============================
Sprite_Picture.prototype.drill_PDA_getStyleData = function(){
	if( this._drill_PDA_curStyle == -1 ){ return null; }
	return DrillUp.g_PDA_styleList[ this._drill_PDA_curStyle ];
};
//==============================
// * 图片贴图控制 - 刷新弹道
//==============================
Sprite_Picture.prototype.drill_PDA_refreshBallistics = function(){
	var s_data = this.drill_PDA_getStyleData();
	
	// > 没有样式时，清空弹道
	if( s_data == undefined ){
		this._drill_PDA_curBallistics['_drill_COBa_x'] = undefined;
		this._drill_PDA_curBallistics['_drill_COBa_y'] = undefined;
		return;
	}
	
	var b_data = {};
	//   移动（movement）
	b_data['movementNum'] = 1;								//对象数量
	b_data['movementTime'] = s_data["move_time"];			//时长
	b_data['movementMode'] = "两点式";						//移动模式
	//   两点式（twoPoint）
	b_data['twoPointType'] = s_data["move_type"];			//两点式 - 类型（匀速移动/弹性移动/…）
	b_data['twoPointDifferenceX'] = 0 - s_data["move_x"];	//两点式 - 距离差值x
	b_data['twoPointDifferenceY'] = 0 - s_data["move_y"];	//两点式 - 距离差值y
	
	// > 弹道（坐标）
	$gameTemp.drill_COBa_setBallisticsMove( b_data );									//弹道核心 - 坐标初始化
	$gameTemp.drill_COBa_preBallisticsMove( this._drill_PDA_curBallistics, 0, 0, 0 );	//弹道核心 - 推演
};

//==============================
// * 图片贴图控制 - 帧刷新 - 位置
//==============================
Sprite_Picture.prototype.drill_PDA_updatePosition = function(){
	var picture = this.picture();
	if( picture == undefined ){ return; }
	
	var x_tank = this._drill_PDA_curBallistics['_drill_COBa_x'];
	var y_tank = this._drill_PDA_curBallistics['_drill_COBa_y'];
	if( x_tank == undefined ){ return; }
	if( y_tank == undefined ){ return; }
	
	// > 是否正在拖拽【图片 - 可拖拽的图片】
	if( picture.drill_PDr_isDraging() == true ){
		this._drill_PDA_curIndex += 1;
	}else{
		this._drill_PDA_curIndex -= 1;
	}
	
	// > 播放弹道
	if( this._drill_PDA_curIndex < 0 ){
		this._drill_PDA_curIndex = 0;
	}
	if( this._drill_PDA_curIndex >= x_tank.length ){
		this._drill_PDA_curIndex = x_tank.length -1;
	}
	var xx = x_tank[ this._drill_PDA_curIndex ];
	var yy = y_tank[ this._drill_PDA_curIndex ];
    this.x -= xx;		//『图片贴图累加变换值』
    this.y -= yy;		//『图片贴图累加变换值』
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureDragAnimation = false;
		var pluginTip = DrillUp.drill_PDA_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


