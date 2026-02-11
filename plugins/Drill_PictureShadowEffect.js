//=============================================================================
// Drill_PictureShadowEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 图片阴影效果
 * @author Drill_up
 * 
 * @Drill_LE_param "阴影样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_PSwE_styleList_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureShadowEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以给图片添加阴影效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 * 细节：
 *   (1.阴影效果本质上是一个黑色阴影的贴图，
 *      长期保持在图片的下方，且与图片位置一致。
 *   (2.你可以在样式中自定义阴影的位置，
 *      但注意图片的锚点会对阴影缩放、旋转有影响。
 * 设计：
 *   (1.拖拽的动画效果 和 图片阴影效果 两个插件可以一起使用，
 *      能实现"抬起卡片时"，看到卡片的阴影，从而有卡片高度差的感觉。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令控制绑定：
 * 
 * 插件指令：>图片阴影效果 : 图片[1] : 绑定阴影 : 样式[1]
 * 插件指令：>图片阴影效果 : 图片变量[21] : 绑定阴影 : 样式[1]
 * 插件指令：>图片阴影效果 : 批量图片[4,5] : 绑定阴影 : 样式[1]
 * 插件指令：>图片阴影效果 : 批量图片变量[21,22] : 绑定阴影 : 样式[1]
 * 
 * 插件指令：>图片阴影效果 : 图片[1] : 绑定阴影 : 样式[1]
 * 插件指令：>图片阴影效果 : 图片[1] : 关闭阴影
 * 
 * 1.前半部分（图片）和 后半部分（绑定阴影 : 样式[1]）的参数可以随意组合。
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
 * 时间复杂度： o(n^2)*o(图片数量)*o(贴图处理) 每帧
 * 测试方法：   在对话框管理层中测试单张对话图功能。
 * 测试结果：   战斗界面中，平均消耗为：【20.23ms】
 *              200个事件的地图中，平均消耗为：【44.00ms】
 *              100个事件的地图中，平均消耗为：【22.80ms】
 *               50个事件的地图中，平均消耗为：【18.13ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每个图片都对应一个阴影贴图，后台不显示，开启了绑定才会显示。
 *   默认情况下，阴影贴图会以低消耗的状态执行。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 相对堆叠级
 * @desc 以绑定的图片的堆叠级为准，阴影的相对堆叠级。（默认-0.5，即在图片下方，但又比后一张图片高一点）
 * @default -0.5
 * 
 * @param ---阴影样式集---
 * @default
 *
 * @param 阴影样式-1
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default {"标签":"==标准阴影==","偏移-阴影 X":"2","偏移-阴影 Y":"2","比例-透明度":"0.25","比例-缩放 X":"1.0","比例-缩放 Y":"1.0"}
 * 
 * @param 阴影样式-2
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default {"标签":"==较远的阴影==","偏移-阴影 X":"20","偏移-阴影 Y":"20","比例-透明度":"0.25","比例-缩放 X":"1.0","比例-缩放 Y":"1.0"}
 * 
 * @param 阴影样式-3
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-4
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-5
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-6
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-7
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-8
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-9
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-10
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-11
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-12
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-13
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-14
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-15
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-16
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-17
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-18
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-19
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 * @param 阴影样式-20
 * @parent ---阴影样式集---
 * @type struct<DrillPSwEStyle>
 * @desc 阴影样式配置。
 * @default 
 * 
 */
/*~struct~DrillPSwEStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的阴影样式==
 * 
 * 
 * @param 偏移-阴影 X
 * @desc 以绑定的图片位置为准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 8
 * 
 * @param 偏移-阴影 Y
 * @desc 以绑定的图片位置为准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 8
 * 
 * @param 比例-透明度
 * @desc 以绑定的图片的透明度为准，阴影的透明度 = 图片的透明度*比例。
 * @default 0.25
 * 
 * @param 比例-缩放 X
 * @desc 以绑定的图片的缩放为准，阴影的缩放 = 图片的缩放*比例。
 * @default 1.0
 * 
 * @param 比例-缩放 Y
 * @desc 以绑定的图片的缩放为准，阴影的缩放 = 图片的缩放*比例。
 * @default 1.0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PSwE（Picture_Shadow_Effect）
//		临时全局变量	DrillUp.g_PSwE_xxx
//		临时局部变量	this._drill_PSwE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(图片数量)*o(贴图处理) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2025/7/27：
//							》22.8ms（drill_sprite_updateAttr）44.0ms（Drill_PSwE_ShadowSprite.update）
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
//			->☆堆叠级同步
//			
//			->☆场景容器之图片阴影贴图
//			->图片阴影贴图【Drill_PSwE_ShadowSprite】
//				->A主体
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
//			1.注意，图片贴图创建100个后就长期存在，根据图片数据进行自变化，不会执行removeChild。
//			  图片阴影贴图 同理。
//			2.该插件没有使用 图片层级、战斗层级，是因为直接使用了 图片优化核心 的函数。
//			
//		★其它说明细节：
//			无
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
	DrillUp.g_PSwE_PluginTip_curName = "Drill_PictureShadowEffect.js 图片-阴影与高度效果";
	DrillUp.g_PSwE_PluginTip_baseList = ["Drill_CoreOfPicture.js 图片-图片优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PSwE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PSwE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PSwE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PSwE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PSwE_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureShadowEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureShadowEffect');
	
	//==============================
	// * 静态数据 - 阴影样式
	//				（~struct~DrillPSwEStyle）
	//==============================
	DrillUp.drill_PSwE_initStyle = function( dataFrom ){
		var data = {};
		
		data['offset_x'] = Number( dataFrom["偏移-阴影 X"] || 0);
		data['offset_y'] = Number( dataFrom["偏移-阴影 Y"] || 0);
		data['per_opacity'] = Number( dataFrom["比例-透明度"] || 0.5);
		data['per_scaleX'] = Number( dataFrom["比例-缩放 X"] || 1.0);
		data['per_scaleY'] = Number( dataFrom["比例-缩放 Y"] || 1.0);
		
		return data;
	}
	/*-----------------阴影样式------------------*/
	DrillUp.g_PSwE_styleList_length = 20;
	DrillUp.g_PSwE_styleList = [];
	for( var i = 0; i < DrillUp.g_PSwE_styleList_length; i++ ){
		if( DrillUp.parameters["阴影样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["阴影样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["阴影样式-" + String(i+1) ]);
			DrillUp.g_PSwE_styleList[i] = DrillUp.drill_PSwE_initStyle( data );
		}else{
			DrillUp.g_PSwE_styleList[i] = null;
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_PSwE_offsetZIndex = Number(DrillUp.parameters["相对堆叠级"] || -0.5);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfPicture ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PSwE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PSwE_pluginCommand.call( this, command, args );
	this.drill_PSwE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PSwE_pluginCommand = function( command, args ){
	if( command === ">图片阴影效果" ){
		
		/*-----------------对象组获取------------------*/
		var pics = null;			// 图片对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( pics == null && unit.indexOf("批量图片[") != -1 ){
				unit = unit.replace("批量图片[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PSwE_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PSwE_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PSwE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PSwE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		
		/*-----------------绑定阴影------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "关闭阴影" ){
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PSwE_removeShadowData();
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "绑定阴影" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PSwE_setStyleId( Number(temp1)-1 );
					}
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PSwE_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PSwE_getPluginTip_PictureNotFind( pic_id ) );
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
	var _drill_STG_PSwE_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PSwE_pluginCommand.call(this, command, args);
		this.drill_PSwE_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PSwE_pluginCommand = Game_Interpreter.prototype.drill_PSwE_pluginCommand;
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
var _drill_PSwE_data_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_PSwE_shadowData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PSwE_data_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Picture.prototype.drill_PSwE_checkShadowData = function(){
	if( this._drill_PSwE_shadowData != undefined ){ return; }
	this._drill_PSwE_shadowData = {};
	
	// > 数据 - 阴影样式
	this._drill_PSwE_shadowData['style_id'] = -1;
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PSwE_removeShadowData = function(){
	this._drill_PSwE_shadowData = undefined;
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PSwE_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PSwE_p_erase.call( this );
	this.drill_PSwE_removeShadowData();						//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PSwE_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PSwE_removeShadowData();				//（删除数据）
	}
	_drill_PSwE_p_erasePicture.call( this, pictureId );
}
//==============================
// * 图片的属性 - 参数 - 设置阴影样式
//==============================
Game_Picture.prototype.drill_PSwE_setStyleId = function( style_id ){
	this.drill_PSwE_checkShadowData();
	this._drill_PSwE_shadowData['style_id'] = style_id;
}
//==============================
// * 图片的属性 - 参数 - 获取阴影样式
//==============================
Game_Picture.prototype.drill_PSwE_getStyleId = function(){
	if( this._drill_PSwE_shadowData == undefined ){ return -1; }
	return this._drill_PSwE_shadowData['style_id'];
}


//=============================================================================
// ** ☆堆叠级同步
//
//			说明：	> 此模块控制 图片阴影贴图 的层级和堆叠级。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 堆叠级同步 - 最后继承1级
//
//			说明：	> 确保最后继承，能够将其它图片插件都影响到该贴图。
//==============================
var _drill_PSwE_scene2_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_PSwE_scene2_initialize.call(this);
	
	//==============================
	// * 堆叠级同步 - 设置层级时（继承）
	//==============================
	var _drill_PSwE_COPi_whenRefreshLayer = Game_Temp.prototype.drill_COPi_whenRefreshLayer;
	Game_Temp.prototype.drill_COPi_whenRefreshLayer = function( temp_sprite, picture_id ){
		_drill_PSwE_COPi_whenRefreshLayer.call( this, temp_sprite, picture_id );
		
		// > 应用设置（添加贴图到层级【标准函数】）
		var temp_shadowSprite = $gameTemp.drill_PSwE_getShadowSpriteByPictureSprite( temp_sprite );
		if( temp_shadowSprite == undefined ){ return; }
		SceneManager._scene.drill_COPi_layerAddSprite( temp_shadowSprite, temp_sprite._drill_layer );
	};
	//==============================
	// * 堆叠级同步 - 设置堆叠级时（继承）
	//==============================
	var _drill_PSwE_COPi_whenRefreshZIndex = Game_Temp.prototype.drill_COPi_whenRefreshZIndex;
	Game_Temp.prototype.drill_COPi_whenRefreshZIndex = function( temp_sprite, picture_id ){
		_drill_PSwE_COPi_whenRefreshZIndex.call( this, temp_sprite, picture_id );
		
		// > 直接修改贴图即可
		//		（此处会根据父贴图的zIndex，一起刷一遍堆叠级，见函数：SceneManager._scene.drill_COPi_sortByZIndex();）
		//		（相对堆叠级 不能放阴影样式里面，刷新的时机容易混乱，所以作为全局参数）
		var temp_shadowSprite = $gameTemp.drill_PSwE_getShadowSpriteByPictureSprite( temp_sprite );
		if( temp_shadowSprite == undefined ){ return; }
		temp_shadowSprite.zIndex = temp_sprite.zIndex + DrillUp.g_PSwE_offsetZIndex;
	};
}


//=============================================================================
// ** ☆场景容器之图片阴影贴图
//=============================================================================
//==============================
// * 场景容器之图片阴影贴图 - 初始化
//==============================
var _drill_PSwE_tank_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_PSwE_tank_initialize.call(this);
	this._drill_PSwE_spriteTank = [];
};
//==============================
// * 场景容器之图片阴影贴图 - 获取
//==============================
Game_Temp.prototype.drill_PSwE_getShadowSpriteByPictureSprite = function( pictureSprite ){
	for(var i = 0; i < this._drill_PSwE_spriteTank.length; i++){
		var temp_shadowSprite = this._drill_PSwE_spriteTank[i];
		if( temp_shadowSprite._drill_parentSprite == pictureSprite ){
			return temp_shadowSprite;
		}
	}
	return null;
};
//==============================
// * 场景容器之图片阴影贴图 - 创建贴图绑定『多场景与图片-地图界面』
//==============================
var _drill_PSwE_tank_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function(){
	_drill_PSwE_tank_map_createPictures.call(this);
	this.drill_PSwE_createShadow();
};
//==============================
// * 场景容器之图片阴影贴图 - 创建贴图『多场景与图片-地图界面』
//==============================
Spriteset_Map.prototype.drill_PSwE_createShadow = function(){
	//（注意，图片贴图创建100个后就长期存在，根据图片数据进行自变化，不会执行removeChild。）
	
	$gameTemp._drill_PSwE_spriteTank = [];
	
	// > 创建 图片阴影贴图
	var pictureSprite_list = this._pictureContainer.children;
	for(var i = 0; i < pictureSprite_list.length; i++ ){
		var temp_pictureSprite = pictureSprite_list[i];
		if( temp_pictureSprite instanceof Sprite_Picture != true ){ continue; } //『复制的图片贴图』
		
		var temp_shadowSprite = new Drill_PSwE_ShadowSprite();
		temp_shadowSprite.drill_sprite_setParentSprite( temp_pictureSprite );
		$gameTemp._drill_PSwE_spriteTank.push( temp_shadowSprite );
		
		// > 初始化层级（不需要，通过 drill_COPi_whenRefreshLayer 控制层级）
		//this._pictureContainer.addChild( temp_shadowSprite );
		
		// > 初始化堆叠级（不需要，通过 drill_COPi_whenRefreshZIndex 控制堆叠级）
		//temp_shadowSprite.zIndex = temp_pictureSprite.zIndex + DrillUp.g_PSwE_offsetZIndex;
	}
};
//==============================
// * 场景容器之图片阴影贴图 - 创建贴图绑定『多场景与图片-战斗界面』
//==============================
var _drill_PSwE_tank_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function(){
	_drill_PSwE_tank_battle_createPictures.call(this);
	this.drill_PSwE_createShadow();
};
//==============================
// * 场景容器之图片阴影贴图 - 创建贴图『多场景与图片-战斗界面』
//==============================
Spriteset_Battle.prototype.drill_PSwE_createShadow = Spriteset_Map.prototype.drill_PSwE_createShadow;


//=============================================================================
// ** 图片阴影贴图【Drill_PSwE_ShadowSprite】『复制的图片贴图』
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	定义一个图片贴图的复制版本。
// **		子功能：	
// **					->贴图『独立贴图』
// **						x->显示贴图/隐藏贴图
// **						x->是否就绪
// **						x->优化策略
// **						->销毁
// **						->初始化数据
// **						->初始化对象
// **					
// **					->A主体
// **						->绑定父贴图
// **					->B样式切换
// **
// **		说明：	> 阴影贴图需要实时与图片贴图同步变化。
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [ ●合并/分离/混乱]
// **				> 数量 - [单个/ ●多个] 一个图片贴图对应一个图片阴影贴图。
// **				> 创建 - [ ●一次性 /自延迟/外部延迟]
// **				> 销毁 - [ ●不考虑 /自销毁/外部销毁] 该贴图与 图片贴图 一样，根据图片数据进行自变化，不会执行removeChild。
// **				> 样式 - [不可修改/ ●自变化 /外部变化] 
//=============================================================================
//==============================
// * 图片阴影贴图 - 定义
//==============================
function Drill_PSwE_ShadowSprite() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 图片阴影贴图 - 最后继承1级
//
//			说明：	> 确保最后继承，能够将其它图片插件都影响到该贴图。
//==============================
var _drill_PSwE_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_PSwE_scene_initialize.call(this);
	
	Drill_PSwE_ShadowSprite.prototype = Object.create(Sprite.prototype);
	Drill_PSwE_ShadowSprite.prototype.constructor = Drill_PSwE_ShadowSprite;
	//==============================
	// * 图片阴影贴图 - 初始化
	//==============================
	Drill_PSwE_ShadowSprite.prototype.initialize = function(){
		Sprite.prototype.initialize.call(this);
		this.drill_initData();					//初始化数据
		this.drill_initSprite();				//初始化子功能
	};
	//==============================
	// * 图片阴影贴图 - 帧刷新
	//==============================
	Drill_PSwE_ShadowSprite.prototype.update = function() {
		Sprite.prototype.update.call(this);
		this.drill_sprite_updateAttr();			//帧刷新 - A主体
		this.drill_sprite_updateStyle();		//帧刷新 - B样式切换
	};
	
	//##############################
	// * A主体 - 绑定父贴图【标准函数】
	//			
	//			参数：	> temp_sprite 贴图对象
	//			返回：	> 无
	//##############################
	Drill_PSwE_ShadowSprite.prototype.drill_sprite_setParentSprite = function( temp_sprite ){
		this._drill_parentSprite = temp_sprite;
	};
	
	//##############################
	// * 图片阴影贴图 - 销毁【标准函数】
	//			
	//			参数：	> 无
	//			返回：	> 无
	//			
	//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
	//##############################
	Drill_PSwE_ShadowSprite.prototype.drill_sprite_destroy = function(){
		this.drill_sprite_destroy_Private();
	};
	//##############################
	// * 长画布贴图 - 初始化数据『独立贴图』【标准默认值】
	//
	//			参数：	> 无
	//			返回：	> 无
	//			
	//			说明：	> data 动态参数对象（来自类初始化）
	//					  该对象包含 类所需的所有默认值。
	//##############################
	Drill_PSwE_ShadowSprite.prototype.drill_initData = function() {
		//（暂无）
	};
	//##############################
	// * 图片阴影贴图 - 初始化对象『独立贴图』【标准函数】
	//
	//			参数：	> 无
	//			返回：	> 无
	//##############################
	Drill_PSwE_ShadowSprite.prototype.drill_initSprite = function(){
		this.drill_sprite_initAttr();			//初始化子功能 - A主体
		this.drill_sprite_initStyle();			//初始化子功能 - B样式切换
	};
	//==============================
	// * 图片阴影贴图 - 销毁（私有）
	//==============================
	Drill_PSwE_ShadowSprite.prototype.drill_sprite_destroy_Private = function(){
		
		// > 销毁 - A主体
		this._drill_parentSprite = null;
		
		// > 销毁 - B样式切换
		this._drill_curStyle = -1;
	};
	
	//==============================
	// * A主体 - 初始化子功能
	//==============================
	Drill_PSwE_ShadowSprite.prototype.drill_sprite_initAttr = function(){
		this._drill_parentSprite = null;
		
		// > 私有属性初始化
		var color = [0,0,0,255];
		this.setBlendColor( color );	//（设置填充色，设置后永久有效）
	};
	//==============================
	// * A主体 - 帧刷新
	//==============================
	Drill_PSwE_ShadowSprite.prototype.drill_sprite_updateAttr = function(){
		if( this._drill_parentSprite == undefined ){ return; }
		
		var picture = this._drill_parentSprite.picture();
		if( picture == undefined ){ return; }
		
		// > 获取样式
		//		（注意细节：图片被删除后，图片贴图仍然为显示状态，所以需要根据 绑定的阴影样式，来控制显示隐藏）
		var style_data = this.drill_PSwE_getStyleData();
		if( style_data == undefined ){
			this.visible = false;
			return;
		}
		
		// > 同步 - 可见
		this.visible = this._drill_parentSprite.visible;
		
		// > 同步 - 贴图属性
		//		（同步父贴图的属性时 会有一帧延迟，能看出来）
		this.x = picture.drill_COPi_finalTransform_x() + style_data['offset_x'];
		this.y = picture.drill_COPi_finalTransform_y() + style_data['offset_y'];
		this.anchor.x = this._drill_parentSprite.anchor.x;
		this.anchor.y = this._drill_parentSprite.anchor.y;
		this.scale.x = this._drill_parentSprite.scale.x * style_data['per_scaleX'];
		this.scale.y = this._drill_parentSprite.scale.y * style_data['per_scaleY'];
		this.skew.x = this._drill_parentSprite.skew.x;
		this.skew.y = this._drill_parentSprite.skew.y;
		this.rotation = this._drill_parentSprite.rotation;
		this.opacity = this._drill_parentSprite.opacity * style_data['per_opacity'];
		
		// > 同步 - 资源
		//		（只同步bitmap即可，填充色设置一次后永久有效）
		this.bitmap = this._drill_parentSprite.bitmap;
		
		// > 同步 - 堆叠级
		//		（堆叠级单独同步，见前面模块）
		//this.zIndex;
	};
	
	//==============================
	// * B样式切换 - 初始化子功能
	//==============================
	Drill_PSwE_ShadowSprite.prototype.drill_sprite_initStyle = function(){
		this._drill_curStyle = -1;
	};
	//==============================
	// * B样式切换 - 帧刷新
	//==============================
	Drill_PSwE_ShadowSprite.prototype.drill_sprite_updateStyle = function(){
		if( this._drill_parentSprite == undefined ){ return; }
		
		var picture = this._drill_parentSprite.picture();
		if( picture == undefined ){ return; }
		
		// > 样式切换时
		var cur_style = picture.drill_PSwE_getStyleId();
		if( cur_style != this._drill_curStyle ){
			//（目前无操作）
		}
		this._drill_curStyle = cur_style;
	};
	//==============================
	// * B样式切换 - 获取样式数据（开放函数）
	//==============================
	Drill_PSwE_ShadowSprite.prototype.drill_PSwE_getStyleData = function(){
		if( this._drill_curStyle == -1 ){ return null; }
		return DrillUp.g_PSwE_styleList[ this._drill_curStyle ];
	};
}

	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureShadowEffect = false;
		var pluginTip = DrillUp.drill_PSwE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
