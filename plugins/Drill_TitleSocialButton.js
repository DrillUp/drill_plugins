//=============================================================================
// Drill_TitleSocialButton.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        标题 - 网址按钮
 * @author Drill_up
 * 
 * @Drill_LE_param "网址按钮-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_TSB_btn_length"
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleSocialButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题界面中添加你的微信网址、qq网址等按钮。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.选择"新建窗口"时：
 *   pc端：在窗口本体中弹出新窗口。
 *   浏览器：出现新标签，不过可能会阻止弹窗。
 *   手机端：弹出app请求调用功能，需要选择相应的app才能打开。不过
 *           可能会因手机权限问题，被阻止。
 * 3.选择"新建浏览器标签"时：
 *   pc端，弹出电脑的浏览器来打开指定网址。
 *   浏览器，无效。
 *   手机端，如果是客户端打包，会跳出请求功能。
 *           如果是浏览器打包，无效。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-网址按钮1
 * 资源-网址按钮2
 * 资源-网址按钮3
 * ……
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
 * 时间复杂度： o(n)*o(贴图处理)
 * 测试方法：   在标题界面中测试性能。
 * 测试结果：   菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只贴一两个按钮，几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了内部结构，添加了高亮功能。
 * 
 * 
 *
 * @param 未高亮按钮透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标未接触按钮时按钮的透明度。
 * @default 160
 *
 * @param 高亮按钮透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标接触按钮时按钮的透明度。
 * @default 255
 *
 * @param ----按钮组----
 * @default 
 *
 * @param 网址按钮-1
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-2
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-3
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-4
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-5
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-6
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-7
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-8
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-9
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-10
 * @parent ----按钮组----
 * @type struct<SocialButton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 */
/*~struct~SocialButton:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的网址按钮==
 *
 * @param 访问网址
 * @desc 访问目标网址的url。
 * @default https://rpg.blue/thread-409713-1-1.html
 *
 * @param 访问方式
 * @type select
 * @option 新建浏览器标签
 * @value browser
 * @option 新建窗口
 * @value window
 * @desc 访问浏览器的方式。浏览器标签只对用浏览器打开的情况有效，点击后会新建浏览器标签。
 * @default window
 *
 * @param 资源-按钮
 * @desc 网址按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 平移-按钮 X
 * @desc x轴方向平移，单位像素。0为按钮的中心贴在最左边。
 * @default 700
 *
 * @param 平移-按钮 Y
 * @desc x轴方向平移，单位像素。0为按钮的中心贴在最上面。
 * @default 570
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		TSB (Title_Social_Button)
//		临时全局变量	DrillUp.g_TSB_xxx
//		临时局部变量	this._drill_TSB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理)
//		性能测试因素	在标题界面中测试
//		性能测试消耗	2.00ms（drill_TSB_updateHover函数）
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			网址按钮：
//				->点击进入网址
//				->按钮高亮
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.简单的按钮点击事件，然后调用网页的跳转页面功能。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_TitleSocialButton = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleSocialButton');
	
	DrillUp.g_TSB_btn_opacity = Number(DrillUp.parameters['未高亮按钮透明度'] || 160);
	DrillUp.g_TSB_btn_l_opacity = Number(DrillUp.parameters['高亮按钮透明度'] || 255);
	
	DrillUp.g_TSB_btn_length = 10;
	DrillUp.g_TSB_btn = [];
	for(var i = 0; i < DrillUp.g_TSB_btn_length; i++ ){
		if( DrillUp.parameters['网址按钮-' + String(i+1) ] != "" ){
			DrillUp.g_TSB_btn[i] = JSON.parse(DrillUp.parameters['网址按钮-' + String(i+1) ]);
			
			DrillUp.g_TSB_btn[i]['url'] = String(DrillUp.g_TSB_btn[i]["访问网址"]);
			DrillUp.g_TSB_btn[i]['type'] = String(DrillUp.g_TSB_btn[i]["访问方式"]);
			DrillUp.g_TSB_btn[i]['src_img'] = String(DrillUp.g_TSB_btn[i]["资源-按钮"]);
			DrillUp.g_TSB_btn[i]['x'] = Number(DrillUp.g_TSB_btn[i]["平移-按钮 X"]);
			DrillUp.g_TSB_btn[i]['y'] = Number(DrillUp.g_TSB_btn[i]["平移-按钮 Y"]);
		}else{
			DrillUp.g_TSB_btn[i] = null;
		}
	}

//=============================================================================
// ** 标题界面
//=============================================================================
//==============================
// * 标题 - 创建按钮
//==============================
var _drill_TSB_createForeground = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function() {
	_drill_TSB_createForeground.call(this);
	
	// > 创建层
	this._drill_TSB_layer = new Sprite();
	this.addChild(this._drill_TSB_layer);	
	
	// > 创建按钮
	this._drill_TSB_btns = [];
	for (var i = 0; i < DrillUp.g_TSB_btn.length; i++) {
		var temp_data = DrillUp.g_TSB_btn[i];
		if( temp_data == null ){ continue; }
		
		var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.loadTitle1(temp_sprite_data['src_img']);
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.x = temp_sprite_data['x'];
		temp_sprite.y = temp_sprite_data['y'];
		temp_sprite._drill_btn_url = temp_sprite_data['url'];
		temp_sprite._drill_btn_type = temp_sprite_data['type'];
		
		this._drill_TSB_btns.push(temp_sprite);
		this._drill_TSB_layer.addChild(temp_sprite);
	}
}
//==============================
// * 标题 - 帧刷新
//==============================
var _drill_TSB_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() { 
	_drill_TSB_update.call(this);
	
	this.drill_TSB_updateTouch();		//点击监听
	this.drill_TSB_updateHover();		//高亮监听
}
//==============================
// * 标题 - 打开网址
//==============================
Scene_Title.prototype.drill_TSB_openUrl = function(url, type) {
	
	if(type == "browser"){
		if( Utils.isNwjs() ){		//pc浏览器访问
			var gui = require('nw.gui');
			gui.Shell.openExternal(url); 
		}
		return;
	}
	if(type == "window"){
		window.open(url);
		return;
	}
};
//==============================
// * 标题 - 点击监听
//==============================
Scene_Title.prototype.drill_TSB_updateTouch = function() {
    if( !TouchInput.isTriggered() ){ return }
	
	for(var i = 0; i < this._drill_TSB_btns.length; i++ ){
		var temp_btn = this._drill_TSB_btns[i];
		if( this.drill_TSB_isOnSprite( temp_btn ) ){
			this.drill_TSB_openUrl( temp_btn._drill_btn_url, temp_btn._drill_btn_type );
			SoundManager.playOk();
		}
	}
}
//==============================
// * 标题 - 高亮监听
//==============================
Scene_Title.prototype.drill_TSB_updateHover = function() {
	
	for(var i = 0; i < this._drill_TSB_btns.length; i++ ){
		var temp_btn = this._drill_TSB_btns[i];
		if( this.drill_TSB_isHoverBtnSprite( temp_btn ) ){
			temp_btn.opacity = DrillUp.g_TSB_btn_l_opacity;
		}else{
			temp_btn.opacity = DrillUp.g_TSB_btn_opacity;
		}
	}
}
//==============================
// * 鼠标 - 判断按钮点击
//==============================
Scene_Title.prototype.drill_TSB_isOnSprite = function( sprite ){
	if( sprite == null ){ return false };
	if( sprite.bitmap == null ){ return false };
	if( sprite.bitmap.isReady() == false ){ return false };
	if( sprite.visible == false ){ return false };
	
	var cw = sprite.bitmap.width ;
	var ch = sprite.bitmap.height ;
	var cx = sprite.x ;
	var cy = sprite.y ;
	
	var _x = TouchInput.x;
	var _y = TouchInput.y;
	if( _x < this.x + cx - cw*sprite.anchor.x + 0  ){ return false };
	if( _x > this.x + cx - cw*sprite.anchor.x + cw ){ return false };
	if( _y < this.y + cy - ch*sprite.anchor.y + 0  ){ return false };
	if( _y > this.y + cy - ch*sprite.anchor.y + ch ){ return false };
	return true;	
};
//==============================
// * 鼠标 - 判断按钮高亮
//==============================
Scene_Title.prototype.drill_TSB_isHoverBtnSprite = function( sprite ){
	if( sprite == null ){ return false };
	if( sprite.bitmap == null ){ return false };
	if( sprite.bitmap.isReady() == false ){ return false };
	if( sprite.visible == false ){ return false };
	
	var cw = sprite.bitmap.width ;
	var ch = sprite.bitmap.height ;
	var cx = sprite.x ;
	var cy = sprite.y ;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( _x < this.x + cx - cw*sprite.anchor.x + 0  ){ return false };
	if( _x > this.x + cx - cw*sprite.anchor.x + cw ){ return false };
	if( _y < this.y + cy - ch*sprite.anchor.y + 0  ){ return false };
	if( _y > this.y + cy - ch*sprite.anchor.y + ch ){ return false };
	return true;	
};

//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}

