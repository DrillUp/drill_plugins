//=============================================================================
// Drill_PictureShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        图片 - 方块粉碎效果
 * @author Drill_up
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_PictureShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得图片能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.3及以上版本★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.想要更多了解方块粉碎，去看看 "1.系统 > 大家族-方块粉碎.docx"。
 * 细节:
 *   (1.图片的粉碎效果不支持滤镜。
 *   (2.粉碎后，图片的本体还在。你需要手动删除图片。
 * 设计:
 *   (1.你可以用图片表示某玻璃球、水晶、圣物，被某种邪恶力量侵蚀
 *      而被粉碎。然后播放粉碎动画效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置指定图片播放方块粉碎效果：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 图片[1] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 图片[1] : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 图片[1] : 立刻复原
 * 插件指令：>方块粉碎效果 : 图片[1] : 暂停播放
 * 插件指令：>方块粉碎效果 : 图片[1] : 继续播放
 * 
 * 1."方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 * 2.粉碎背景可以有两个过程，先反转拼合在一起，然后破碎。
 *   以此可以制作中间的过渡效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改碎片的消失设置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 设回默认
 * 
 * 1."设回默认"表示设置为当前当前配置的默认的消失方式。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在各个管理层中添加图片并播放粉碎效果。
 * 测试结果：   200个事件的图片中，平均消耗为：【60.12ms】
 *              100个事件的图片中，平均消耗为：【56.49ms】
 *               50个事件的图片中，平均消耗为：【48.16ms】
 * 测试方法2：  在战斗界面中添加图片并播放粉碎效果。
 * 测试结果2：  战斗界面中，平均消耗为：【45.26ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后图片实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.图片粉碎的消耗和事件数量关系不大，并且低配电脑能够比较流畅地播放粉碎
 *   效果。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了与核心的部分兼容设置。
 * [v1.2]
 * 添加了插件指令图片检查。
 * [v1.3]
 * 修复了图片刚创建时，就执行粉碎出错的bug。
 * [v1.4]
 * 大幅度优化了结构，支持了 暂停播放和继续播放 功能。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * @param 默认图片碎片消失方式
 * @type select
 * @option 不消失
 * @value 不消失
 * @option 线性消失
 * @value 线性消失
 * @option 等一半时间后线性消失
 * @value 等一半时间后线性消失
 * @desc 碎片消失的方式。
 * @default 线性消失
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PSE（Picture_Shatter_Effect）
//		临时全局变量	DrillUp.g_PSE_opacityType
//		临时局部变量	this._drill_PSE_xxx
//		存储数据变量	$gameMap._drill_PSE_opacityType
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层看粉碎效果
//		★性能测试消耗	80.12ms  45.16ms
//		★最坏情况		粉碎分割的数量特别多。
//		★备注			单张图片似乎和事件贴图消耗差不多，造成的差距可能是测的时候不稳定。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图片方块粉碎：
//				->图片贴图
//					->获取 - 容器指针【标准函数】
//					->获取 - 根据图片ID【标准函数】
//				->粉碎配置
//					->绑定控制器
//					->绑定贴图
//					->贴图框架标记
//
//		★必要注意事项：
//			1.该插件的 父贴图隐藏 方法为：this.texture.frame = Rectangle.emptyRectangle;
//			  还原时只要 _refresh 即可。
//			  注意，不要用 setFrame ，会影响贴图中的 this._realFrame 的缓存参数。（绕开这个参数）
//			2.大量事件执行粉碎效果，会造成实质性的【巨大消耗】。
//			  因为该插件暂不考虑 控制器数据 的销毁时机。
//			
//		★其它说明细节：
//			1.picture的结构与character的结构非常相似，都需要考虑 贴图框架 变动问题。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureShatterEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PSE_opacityType = String(DrillUp.parameters['默认图片碎片消失方式'] || "线性消失");	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_PSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_PSE_pluginCommand.call(this, command, args);
	if( command === ">方块粉碎效果" ){	// >方块粉碎效果 : 图片[1] : 方块粉碎[1]
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
					
			if( type.indexOf("图片[") != -1 ){
				var pic_id = type.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				
				if( temp1 == "立刻复原" ){
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					var picture = $gameScreen.picture( pic_id );
					if( picture._drill_PSE_controller == undefined ){ return; }
					picture._drill_PSE_controller.drill_COSE_restoreShatter();
					return;
				}
				if( temp1 == "暂停播放" ){
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					var picture = $gameScreen.picture( pic_id );
					if( picture._drill_PSE_controller == undefined ){ return; }
					picture._drill_PSE_controller.drill_COSE_pause();
					return;
				}
				if( temp1 == "继续播放" ){
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					var picture = $gameScreen.picture( pic_id );
					if( picture._drill_PSE_controller == undefined ){ return; }
					picture._drill_PSE_controller.drill_COSE_continue();
					return;
				}
					
				if( temp1.indexOf("方块粉碎[") != -1 ){
					temp1 = temp1.replace("方块粉碎[","");
					temp1 = temp1.replace("]","");
					
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					var controlled_sprite = $gameTemp.drill_PSE_getPictureSpriteByPictureId( pic_id );
					if( controlled_sprite == undefined ){ return; }
					
					var controller = controlled_sprite.drill_PSE_createController( Number(temp1)-1 );
					controller.drill_COSE_runShatter();					//正常播放
				}
				if( temp1.indexOf("方块反转粉碎[") != -1 ){
					temp1 = temp1.replace("方块反转粉碎[","");
					temp1 = temp1.replace("]","");
					
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					var controlled_sprite = $gameTemp.drill_PSE_getPictureSpriteByPictureId( pic_id );
					if( controlled_sprite == undefined ){ return; }
					
					var controller = controlled_sprite.drill_PSE_createController( Number(temp1)-1 );
					controller.drill_COSE_backrunShatter();				//倒放
				}
			}
		}
		if(args.length == 6){		//>方块粉碎效果 : 图片碎片 : 消失方式 : 不消失
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "图片碎片" && temp1 == "消失方式" ){
				if( temp2 == "设回默认" ){
					$gameSystem._drill_PSE_opacityType = DrillUp.g_PSE_opacityType;
				}else{
					$gameSystem._drill_PSE_opacityType = temp2;
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PSE_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureShatterEffect.js 图片 - 方块粉碎效果】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
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
DrillUp.g_PSE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PSE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PSE_sys_initialize.call(this);
	this.drill_PSE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PSE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PSE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PSE_saveEnabled == true ){	
		$gameSystem.drill_PSE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PSE_initSysData();
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
Game_System.prototype.drill_PSE_initSysData = function() {
	this.drill_PSE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PSE_checkSysData = function() {
	this.drill_PSE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PSE_initSysData_Private = function() {
	
	this._drill_PSE_opacityType = DrillUp.g_PSE_opacityType;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PSE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PSE_opacityType == undefined ){
		this.drill_PSE_initSysData();
	}
	
};


//#############################################################################
// ** 【标准模块】图片贴图
//#############################################################################
//##############################
// * 图片贴图 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组       （图片贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_PSE_getPictureSpriteTank = function(){
	return this.drill_PSE_getPictureSpriteTank_Private();
}
//##############################
// * 图片贴图 - 获取 - 根据图片ID【标准函数】
//			
//			参数：	> picture_id 数字（图片ID）
//			返回：	> 贴图对象       （图片贴图）
//          
//			说明：	> 图片id和图片贴图一一对应。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_PSE_getPictureSpriteByPictureId = function( picture_id ){
	return this.drill_PSE_getPictureSpriteByPictureId_Private( picture_id );
}
//=============================================================================
// ** 图片贴图（接口实现）
//=============================================================================
//==============================
// * 图片贴图容器 - 获取 - 容器（私有）
//==============================
Game_Temp.prototype.drill_PSE_getPictureSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	if( SceneManager._scene._spriteset._pictureContainer == undefined ){ return null; }
	return SceneManager._scene._spriteset._pictureContainer.children;
};
//==============================
// * 图片贴图容器 - 获取 - 根据图片ID（私有）
//==============================
Game_Temp.prototype.drill_PSE_getPictureSpriteByPictureId_Private = function( picture_id ){
	var sprite_list = this.drill_PSE_getPictureSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite instanceof Sprite_Picture == false ){ continue; }
		if( sprite._pictureId == picture_id ){
			return sprite;
		}
	}
	return null;
};


//=============================================================================
// ** 图片对象
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _drill_PSE_data_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
    _drill_PSE_data_initialize.call(this);
	this._drill_PSE_controller = null;		//（默认为空）
};
//==============================
// * 图片 - 帧刷新
//==============================
var _drill_PSE_data_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function(){
    _drill_PSE_data_update.call(this);
	if( this._drill_PSE_controller != null ){
		this._drill_PSE_controller.drill_COSE_update();
	}
};


//=============================================================================
// ** 贴图
//=============================================================================
//==============================
// * 贴图框架 - 初始化
//==============================
var _drill_PSE_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
    _drill_PSE_sp_initialize.call(this,pictureId);
	
	// > 贴图框架标记
	this.drill_PSE_initBitmapFrame();
	
	// > 创建贴图
	this._drill_PSE_sprite = new Drill_COSE_LayerSprite();
	this.addChild( this._drill_PSE_sprite );
	
	// > 绑定控制器
	if( this.picture() != undefined &&
		this.picture()._drill_PSE_controller != undefined ){
		this._drill_PSE_sprite.drill_COSE_setController( this.picture()._drill_PSE_controller );
	}
}
//==============================
// * 贴图 - 帧刷新
//==============================
var _drill_PSE_pic_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {	
	
	// > 贴图框架 bitmap识别（必须放前面）
	this.drill_PSE_updateBitmapFrame();
	
	// > 帧刷新
	_drill_PSE_pic_update.call(this);
	
	if( !this.picture() ){ return; }
	if( !this.bitmap ){ return; }
	if( !this.bitmap.isReady() ){ return; }
	if( this._drill_PSE_sprite == undefined ){ return; }
		
	// > 粉碎播放时，隐藏父贴图
	if( this._drill_PSE_sprite.drill_COSE_canParentVisible() == false ){
		this.texture.frame = Rectangle.emptyRectangle;
		this._drill_PSE_frameIsEmpty = true;
	}else{
		
		// > 结束 粉碎播放 后一帧，还原父贴图
		if( this._drill_PSE_frameIsEmpty == true ){
			this._drill_PSE_frameIsEmpty = false;
			this._refresh();
		}
	}
};
//==============================
// * 贴图 - 创建控制器
//==============================
Sprite_Picture.prototype.drill_PSE_createController = function( shatter_id ){
	var picture = this.picture();
	if( picture == undefined ){ return; }
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 参数准备
	var data = {
		"frameX": this._drill_PSE_frame_x,
		"frameY": this._drill_PSE_frame_y,
		"frameW": this._drill_PSE_frame_w,
		"frameH": this._drill_PSE_frame_h,
		"shatter_id": shatter_id,										//粉碎样式
		"shatter_opacityType": $gameSystem._drill_PSE_opacityType,		//透明度变化方式
		"shatter_hasParent": true,										//父贴图标记
	};
	
	// > 特殊情况设置
	var name = this.drill_PSE_getSrcName();
	if( name == "" ){			//（名称为空时，按照指定资源名为空来算）
		data["src_mode"] = "指定资源名";
		data["src_img"] = "";
		data["src_file"] = "img/pictures/";
	}else if( name == picture._name ){	//（名称一致时，表示有资源）
		data["src_mode"] = "指定资源名";
		data["src_img"] = name;
		data["src_file"] = "img/pictures/";
	}else{								//（名称不一致，表示资源关闭）
		data["src_mode"] = "关闭资源控制";
		data["src_img"] = "";
		data["src_file"] = "";
	}
	
	// > 创建控制器
	if( picture._drill_PSE_controller == undefined ){
		picture._drill_PSE_controller = new Drill_COSE_Controller( data );
		this._drill_PSE_sprite.drill_COSE_setController( picture._drill_PSE_controller );
		
	// > 更新控制器
	}else{
		picture._drill_PSE_controller.drill_COSE_resetData( data );
	}
	
	return picture._drill_PSE_controller;
};
//==============================
// * 贴图 - 获取资源名称
//==============================
Sprite_Picture.prototype.drill_PSE_getSrcName = function(){
	if( this.bitmap == undefined ){ return ""; }
	var path_str = this.bitmap._url;
	path_str = path_str.replace(".png","");
	var str_list = path_str.split("/");
	return decodeURIComponent( str_list[str_list.length-1] );	//（剥离url，留下文件名，并解码）
};


//=============================================================================
// ** 贴图框架
//=============================================================================
//==============================
// * 贴图框架 - 初始化
//==============================
Sprite_Picture.prototype.drill_PSE_initBitmapFrame = function() {
	this._drill_PSE_bitmap = null;			//框架 - obj对象
	this._drill_PSE_frame_x = -1;			//框架 - x
	this._drill_PSE_frame_y = -1;			//框架 - y
	this._drill_PSE_frame_w = 0;			//框架 - w
	this._drill_PSE_frame_h = 0;			//框架 - h
}
//==============================
// * 贴图框架 - bitmap识别（必须放前面）
//==============================
Sprite_Picture.prototype.drill_PSE_updateBitmapFrame = function() {
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 不接受宽度为0的标记
	if( this._realFrame.width == 0 ){ return; }
	if( this._realFrame.height == 0 ){ return; }
	
	if( this._drill_PSE_frame_x != this._realFrame.x ||
		this._drill_PSE_frame_y != this._realFrame.y ||
		this._drill_PSE_frame_w != this._realFrame.width ||
		this._drill_PSE_frame_h != this._realFrame.height ){
		
		this._drill_PSE_bitmap = this.bitmap;				//记录bitmap数据，确保变成空时，不会丢失bitmap
		this._drill_PSE_frame_x = this._realFrame.x;
		this._drill_PSE_frame_y = this._realFrame.y;
		this._drill_PSE_frame_w = this._realFrame.width;
		this._drill_PSE_frame_h = this._realFrame.height;
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureShatterEffect = false;
		alert(
			"【Drill_PictureShatterEffect.js 图片 - 方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



