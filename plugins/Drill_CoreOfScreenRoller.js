//=============================================================================
// Drill_CoreOfScreenRoller.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        窗口字符 - 长画布贴图核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfScreenRoller +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 核心提供一个超长的画布，能将图片、文字、GIF以滚动的方式播放。
 * ★★需要放在 窗口字符核心 插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter      窗口字符-窗口字符核心★★v2.0及以上★★
 * 作用于：
 *   - Drill_SenceCredits               标题-制作组
 *   - Drill_SceneSelfplateE            面板-全自定义信息面板E
 *   - Drill_SceneSelfplateF            面板-全自定义信息面板F
 *   - Drill_DialogSingleRollerSprite   对话框-滚动的长画布贴图
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   提供一个长画布贴图。
 * 2.长画布的播放原理，去看看 "18.面板 > 关于长画布贴图核心.docx"。
 * 结构：
 *   (1.长画布具有多个阶段，每个阶段都需要配置阶段高度、阶段滚动速度、显示模式等信息。
 *   (2.最后一个阶段滚动至末尾后，结束播放。
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
 * 测试方法：   以正常流程进行游戏，记录长画布的消耗。
 * 测试结果：   在菜单界面中，长画布的消耗为：【34.90ms】
 *              在地图界面中，长画布的消耗为：【29.10ms】
 *              在战斗界面中，长画布的消耗为：【21.51ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.长画布相当于一张巨大的图片，这张大图片只在滚动时会产生一些消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部接口的结构。
 * [v1.2]
 * 修复了 子插件 的画布文字错位的bug。
 * [v1.3]
 * 更新并兼容了新的窗口字符底层。
 * [v1.4]
 * 修复了面板播放BGM后，没有切回去的bug。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COSR (Core_Of_Screen_Roller)
//		临时全局变量	无
//		临时局部变量	this._drill_COSR_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	对话框管理层、子插件的界面
//		★性能测试消耗	2025/7/27：
//							》地图界面时：（开启对话框的长画布贴图）
//								4.4ms（Drill_COSR_Sprite.update）5.9ms（Drill_COSR_WindowSprite.update）
//								29.1ms（drill_refreshMessage）15.2ms（Drill_COSR_WindowSprite.initialize）
//							》菜单界面时：（制作组、信息面板E）
//								34.9ms、20.1ms（Drill_COSR_Sprite.update）67.8ms、38.6ms（Drill_COSR_WindowSprite.update）
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
//			
//			->长画布贴图【Drill_COSR_Sprite】
//				->A主体
//				->B阶段
//					> 单图模式
//					> GIF模式
//					> 文本模式
//				->C画布滚动
//					->开始滚动
//					->加速滚动
//				->D播放GIF
//				->E音乐切换
//			->段落文本域【Drill_COSR_WindowSprite】
//				->窗口
//				->绘制文本
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 长画布贴图【Drill_COSR_Sprite】
//			* 段落文本域【Drill_COSR_WindowSprite】
//		
//		★核心说明：
//			1.整个核心只提供了一个封装好的 独立贴图。
//			  具体见类的说明。
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.因为空的阶段高度为0，所以滚动播放时，能直接跳过大量空阶段。
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
	DrillUp.g_COSR_PluginTip_curName = "Drill_CoreOfScreenRoller.js 窗口字符-长画布贴图核心";
	DrillUp.g_COSR_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COSR_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COSR_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COSR_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COSR_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COSR_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_COSR_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_COSR_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfScreenRoller = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfScreenRoller');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** 长画布贴图【Drill_COSR_Sprite】
// **
// **		作用域：	战斗界面、地图界面、菜单界面
// **		主功能：	定义一个长画布，能够进行画布滚动。
// **		子功能：	
// **					->贴图『独立贴图』
// **						x->显示贴图/隐藏贴图
// **						->是否就绪
// **						->优化策略
// **						->销毁
// **						->初始化数据
// **						->初始化对象
// **						
// **					->A主体
// **					->B阶段
// **						> 单图模式
// **						> GIF模式
// **						> 文本模式
// **					->C画布滚动
// **						->开始滚动
// **						->加速滚动
// **					->D播放GIF
// **					->E音乐切换
// **
// **		代码：	> 范围 - 该类定义一个超长画布贴图。
// **				> 结构 - [ ●合并 /分离/混乱] 
// **				> 数量 - [ ●单个 /多个] 
// **				> 创建 - [一次性/ ●自延迟 /外部延迟] 所有阶段中的图片加载完毕后，才进行滚动。
// **				> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
// **
// **		说明：	> 只要建立起该类，然后start启动就可以了，画布会自动update。
// **				> 该类的visible被控制了，start启动才会显示，其它情况会隐藏。
//=============================================================================
//==============================
// * 长画布贴图 - 定义
//==============================
function Drill_COSR_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_COSR_Sprite.prototype = Object.create(Sprite.prototype);
Drill_COSR_Sprite.prototype.constructor = Drill_COSR_Sprite;
//==============================
// * 长画布贴图 - 初始化
//==============================
Drill_COSR_Sprite.prototype.initialize = function( data ){
	Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	//（该贴图不能修改样式，直接删除重建即可）
	
	this.drill_initData();						//初始化数据
	this.drill_initSprite();					//初始化子功能
};
//==============================
// * 长画布贴图 - 帧刷新
//==============================
Drill_COSR_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	
	this.drill_sprite_updateAttr();				//帧刷新 - A主体
												//帧刷新 - B阶段（无）
	this.drill_sprite_updateRoll();				//帧刷新 - C画布滚动
	this.drill_sprite_updateGIF();				//帧刷新 - D播放GIF
	this.drill_sprite_updateMusic();			//帧刷新 - E音乐切换
};

//##############################
// * 长画布贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_COSR_Sprite.prototype.drill_sprite_isReady = function(){
	for( var j = 0; j < this._drill_bitmapTankForLoad.length ;j++){
		if( this._drill_bitmapTankForLoad[j].isReady() != true ){
			return false;
		}
	}
    return true;
};
//##############################
// * 长画布贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COSR_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 长画布贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COSR_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroy_Private();
};

//##############################
// * C画布滚动 - 开始滚动【开放函数】
//
//			说明：	> 该函数只能单次调用。
//##############################
Drill_COSR_Sprite.prototype.drill_COSR_start = function() {
	this._drill_roll_start = true;
	this.visible = true;
}
//##############################
// * C画布滚动 - 加速滚动【开放函数】
//
//			说明：	> 该函数可以放帧刷新中反复调用。
//##############################
Drill_COSR_Sprite.prototype.drill_COSR_speedUp = function( enabled ){
	this._drill_roll_speedUp = enabled;
}
//##############################
// * C画布滚动 - 滚动是否结束【开放函数】
//
//			说明：	> 该函数可以放帧刷新中反复调用。
//##############################
Drill_COSR_Sprite.prototype.drill_COSR_isAtEnd = function() {
	return this._drill_roll_end;
}

//##############################
// * 长画布贴图 - 初始化数据『独立贴图』【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_COSR_Sprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > A主体
	if( data['opacity'] == undefined ){ data['opacity'] = 0 };					//A主体 - 透明度
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };				//A主体 - 混合模式
	if( data['opacityShow'] == undefined ){ data['opacityShow'] = true };		//A主体 - 开始时渐变显示 开关
	if( data['opacitySpeed'] == undefined ){ data['opacitySpeed'] = 15 };		//A主体 - 开始时渐变显示 速度
	
	// > B阶段
	if( data['steps'] == undefined ){ data['steps'] = [] };						//B阶段 - 阶段列表
	for( var j = 0; j < data['steps'].length; j++ ){
		var temp_step = data['steps'][j];
		if( temp_step == undefined ){ continue; }	//（阶段列表中，允许出现空值）
		
		if( temp_step['stepVisible'] == undefined ){ temp_step['stepVisible'] = true };							//B阶段 - 阶段是否可见
		if( temp_step['speed'] == undefined ){ temp_step['speed'] = 1.5 };										//B阶段/C画布滚动 - 阶段滚动速度
		if( temp_step['height'] == undefined ){	temp_step['height'] = 0 };										//B阶段 - 阶段高度
		if( temp_step['mode'] == undefined ){ temp_step['mode'] = "" };											//B阶段 - 显示模式
		
		if( temp_step['img_src'] == undefined ){ temp_step['img_src'] = "" };									//B阶段 - 单图模式 - 资源-单图
		if( temp_step['img_src_file'] == undefined ){ temp_step['img_src_file'] = "img/system/" };				//B阶段 - 单图模式 - 资源-单图文件夹路径
		if( temp_step['img_x'] == undefined ){ temp_step['img_x'] = 0 };										//B阶段 - 单图模式 - 平移-单图 X
		if( temp_step['img_y'] == undefined ){ temp_step['img_y'] = 0 };										//B阶段 - 单图模式 - 平移-单图 Y
		
		if( temp_step['gif_src'] == undefined ){ temp_step['gif_src'] = "" };									//B阶段 - GIF模式 - 资源-GIF
		if( temp_step['gif_src_file'] == undefined ){ temp_step['gif_src_file'] = "img/system/" };				//B阶段 - GIF模式 - 资源-GIF文件夹路径
		if( temp_step['gif_x'] == undefined ){ temp_step['gif_x'] = 0 };										//B阶段 - GIF模式 - 平移-GIF X
		if( temp_step['gif_y'] == undefined ){ temp_step['gif_y'] = 0 };										//B阶段 - GIF模式 - 平移-GIF Y
		if( temp_step['gif_delay'] == undefined ){ temp_step['gif_delay'] = 60 };								//B阶段 - GIF模式 - 开始播放延迟
		if( temp_step['gif_interval'] == undefined ){ temp_step['gif_interval'] = 4 };							//B阶段 - GIF模式 - 帧间隔
		if( temp_step['gif_back_run'] == undefined ){ temp_step['gif_back_run'] = false };						//B阶段 - GIF模式 - 是否倒放
		if( temp_step['gif_replay'] == undefined ){ temp_step['gif_replay'] = true };							//B阶段 - GIF模式 - GIF到末尾是否重播
		
		if( temp_step['text_context'] == undefined ){ temp_step['text_context'] = "" };							//B阶段 - 文本模式 - 文本内容
		if( temp_step['text_fontSize'] == undefined ){ temp_step['text_fontSize'] = 24 };						//B阶段 - 文本模式 - 文本字体大小
		if( temp_step['text_align'] == undefined ){ temp_step['text_align'] = "居中" };							//B阶段 - 文本模式 - 文本对齐方式
		if( temp_step['text_lineheight_type'] == undefined ){ temp_step['text_lineheight_type'] = "默认补正" };	//B阶段 - 文本模式 - 行高控制模式
		if( temp_step['text_lineheight_custom'] == undefined ){ temp_step['text_lineheight_custom'] = 30 };		//B阶段 - 文本模式 - 自定义补正值
		if( temp_step['text_lineheight_lock'] == undefined ){ temp_step['text_lineheight_lock'] = 30 };			//B阶段 - 文本模式 - 锁定行高值
		if( temp_step['text_x'] == undefined ){ temp_step['text_x'] = 0 };										//B阶段 - 文本模式 - 平移-文本 X
		if( temp_step['text_y'] == undefined ){ temp_step['text_y'] = 0 };										//B阶段 - 文本模式 - 平移-文本 Y
		
		// > E音乐切换
		if( temp_step['bgm_set'] == undefined ){ temp_step['bgm_set'] = "不操作" };								//E音乐切换 - 当前阶段BGM设置
		if( temp_step['bgm_src'] == undefined ){ temp_step['bgm_src'] = "" };									//E音乐切换 - 资源-BGM
	}
}
//##############################
// * 长画布贴图 - 初始化对象『独立贴图』【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_COSR_Sprite.prototype.drill_initSprite = function() {
	this.drill_sprite_initAttr();			//初始化子功能 - A主体
	this.drill_sprite_initStep();			//初始化子功能 - B阶段
	this.drill_sprite_initRoll();			//初始化子功能 - C画布滚动
	this.drill_sprite_initGIF();			//初始化子功能 - D播放GIF
	this.drill_sprite_initMusic();			//初始化子功能 - E音乐切换
}

//==============================
// * 长画布贴图 - 销毁（私有）
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_destroy_Private = function() {
	
	// > 销毁 - A主体
	this.visible = false;
	
	// > 销毁 - B阶段
	this._drill_speedTank.length = 0;
	this._drill_heightTank.length = 0;
	this._drill_spriteTank.length = 0;
	this._drill_bitmapTankForLoad.length = 0;
	this.drill_sprite_removeChildConnect( this );	//（断开联系）
	
	// > 销毁 - C画布滚动（无）
	
	// > 销毁 - D播放GIF（无）
	
	// > 销毁 - E音乐切换
	this.drill_sprite_loadLastBGM();	//（恢复之前的BGM）『BGM的保存与还原』
	this._drill_music_lastBGM = null;
};
//==============================
// * 长画布贴图 - 销毁 - 断开贴图连接（私有）『递归函数-头』
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_removeChildConnect = function( parent_sprite ){
	if( parent_sprite == undefined ){ return; }
	this.drill_sprite_removeChildConnect_Recursion( parent_sprite );
};
//==============================
// * 长画布贴图 - 销毁 - 断开贴图连接（私有）『递归函数-节』
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_removeChildConnect_Recursion = function( parent_sprite ){
	var sprite_list = parent_sprite.children;
	if( sprite_list == undefined ){ return; }
	for( var i = sprite_list.length-1; i >= 0; i-- ){
		var sprite = sprite_list[i];
		if( sprite == undefined ){ continue; }
		parent_sprite.removeChild( sprite );
		this.drill_sprite_removeChildConnect_Recursion( sprite );
	}
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_data;
	
	this.x = Graphics.boxWidth *0.5;
	this.y = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0;
	this.opacity = data['opacity'];
	this.blendMode = data['blendMode'];
	this.visible = false;
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_data;
	
	// > 开始时渐变显示
	if( this.opacity < 255 ){
		if( data['opacityShow'] == true ){
			this.opacity += data['opacitySpeed'];
		}else{
			this.opacity = 255;
		}
	}
}

//==============================
// * B阶段 - 初始化子功能
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_initStep = function(){
	this._drill_curStep = 0;				//B阶段 - 当前所在阶段
	this._drill_speedTank = [];				//B阶段 - 速度列表（与阶段一对一）
	this._drill_heightTank = [];			//B阶段 - 高度列表（与阶段一对一）
	this._drill_spriteTank = [];			//B阶段 - 贴图容器（与阶段一对一）
	
	this._drill_bitmapTankForLoad = [];		//B阶段 - 加载的资源列表『界面简单加载』
											//		（注意，该核心只提供了贴图，子插件如果不是面板，则加载过程可能会闪）
	
	// > 创建阶段
	this.drill_sprite_createStepSprite();
}
//==============================
// * B阶段 - 创建阶段
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_createStepSprite = function() {
	var data = this._drill_data;
	var cur_height = 0;
	for( var i = 0; i < data['steps'].length ;i++){
		var temp_step = data['steps'][i];
		
		this._drill_speedTank[i] = 1;
		this._drill_heightTank[i] = 0;
		this._drill_spriteTank[i] = null;
		
		// > 空数据时跳出
		if( temp_step == undefined ){ continue; }
		if( temp_step['height'] == 0 ){ continue; }
		if( temp_step['speed'] <= 0 ){ continue; }
		if( temp_step['mode'] == "" ){ continue; }
		if( temp_step['stepVisible'] == false ){ continue; }
		
		if( temp_step['mode'] == "单图模式" ){
			var temp_sprite = new Sprite();
			var temp_bitmap = ImageManager.loadBitmap( temp_step['img_src_file'], temp_step['img_src'], 0, true);
			temp_sprite.bitmap = temp_bitmap;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0;
			temp_sprite.x = temp_step['img_x'];
			temp_sprite.y = cur_height + temp_step['img_y'];
			
			this.addChild( temp_sprite );
			this._drill_bitmapTankForLoad.push(temp_bitmap);
			this._drill_spriteTank[i] = temp_sprite;
		}
		
		if( temp_step['mode'] == "GIF模式" ){
			var temp_sprite = new Sprite();
			temp_sprite._bitmapTank = [];
			temp_sprite._time = -1 * temp_step['gif_delay'];
			temp_sprite._index = 0;
			for( var k=0; k < temp_step['gif_src'].length; k++ ){
				var temp_bitmap = ImageManager.loadBitmap( temp_step['gif_src_file'], temp_step['gif_src'][k], 0, true);
				this._drill_bitmapTankForLoad.push(temp_bitmap);
				temp_sprite._bitmapTank.push(temp_bitmap);
			}
			temp_sprite.bitmap = temp_sprite._bitmapTank[0];
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0;
			temp_sprite.x = temp_step['gif_x'];
			temp_sprite.y = cur_height + temp_step['gif_y'];
			
			this.addChild( temp_sprite );
			this._drill_spriteTank[i] = temp_sprite;
		}
		
		if( temp_step['mode'] == "文本模式" ){
			var temp_sprite = new Sprite();
			
			// > 文本模式 - 位置初始化
			temp_sprite.anchor.x = 0;
			temp_sprite.anchor.y = 0;
			temp_sprite.x = -1 * Graphics.boxWidth*0.5 + temp_step['text_x'];
			temp_sprite.y = cur_height + temp_step['text_y'];
			
			// > 文本模式 - 对齐方式初始化
			var cur_align = "";
			if( temp_step['text_align'] == "居中" ){	//（窗口字符对齐方式）
				cur_align = "center";
			}else if( temp_step['text_align'] == "右对齐" ){
				cur_align = "right";
			}else{
				cur_align = "left";
			}
			
			// > 文本模式 - 行高初始化
			var cur_lineHeight = -1;
			if( temp_step['text_lineheight_type'] == "默认补正" ){
				cur_lineHeight = -1;
			}
			if( temp_step['text_lineheight_type'] == "自定义补正" ){
				cur_lineHeight = temp_step['text_lineheight_custom'];
			}
			if( temp_step['text_lineheight_type'] == "锁定行高" ){
				cur_lineHeight = temp_step['text_lineheight_lock'];
			}
			if( temp_step['text_lineheight_type'] == "关闭行高控制" ){
				cur_lineHeight = 0;
			}
			
			// > 文本模式 - 创建 段落文本域
			var temp_data = {};
			temp_data['context'] = temp_step['text_context'];
			temp_data['fontSize'] = temp_step['text_fontSize'];
			temp_data['align'] = cur_align;
			temp_data['lineHeight'] = cur_lineHeight;
			var temp_window = new Drill_COSR_WindowSprite( temp_data );
			temp_sprite.addChild( temp_window );
			
			this.addChild( temp_sprite );
			this._drill_spriteTank[i] = temp_sprite;
		}
		
		// > 速度列表
		this._drill_speedTank[i] = temp_step['speed'];
		
		// > 高度列表
		cur_height += temp_step['height'];	//（累积高度）
		this._drill_heightTank[i] = cur_height;
	}
}

//==============================
// * C画布滚动 - 初始化子功能
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_initRoll = function(){
	this._drill_roll_start = false;			//C画布滚动 - 开始开关
	this._drill_roll_end = false;			//C画布滚动 - 结束开关
	this._drill_roll_speedUp = false;		//C画布滚动 - 按键加速
}
//==============================
// * C画布滚动 - 帧刷新
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_updateRoll = function() {
	if( this._drill_roll_start == false ){ return; }	//（开始开关）
	if( this._drill_roll_end == true ){ return; }		//（结束开关）
	if( this.opacity < 255 ){ return; }					//（全部显示之后，才开始滚动）
	
	var cur_speed  = this._drill_speedTank[ this._drill_curStep ];
	var cur_height = this._drill_heightTank[ this._drill_curStep ];
	
	// > 向上滚动
	this.y -= cur_speed;
	if( this._drill_roll_speedUp == true ){
		this.y -= cur_speed;
	}
	
	// > B阶段 - 阶段进度
	if( this.y < -1 * cur_height ){
		this._drill_curStep += 1;
	}
	
	// > 结束播放情况
	if( this._drill_curStep >= this._drill_speedTank.length ){
		this._drill_roll_end = true;
		this.visible = false;
	}
}

//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_initGIF = function(){
	//（无）
}
//==============================
// * D播放GIF - 帧刷新
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_updateGIF = function() {
	var data = this._drill_data;
	for( var j = 0; j < data['steps'].length ;j++){
		var temp_step = data['steps'][j];
		if( temp_step == undefined ){ continue; }
		var temp_sprite = this._drill_spriteTank[j];
		if( temp_sprite == undefined ){ continue; }
		
		if( temp_step['mode'] == "GIF模式" ){
			var cur_height = this._drill_heightTank[ this._drill_curStep ];
			if( this.y + cur_height < Graphics.boxHeight ){		//（GIF出现时才播放）
				temp_sprite._time += 1;
				if( temp_sprite._time >= 0 ){
					
					// > GIF播放
					var inter = temp_sprite._time ;
					inter = inter / temp_step['gif_interval'];
					if( inter >= temp_sprite._bitmapTank.length &&
						temp_step['gif_replay'] == false ){
						inter = temp_sprite._bitmapTank.length - 1;			//不重播
					}else{
						inter = inter % temp_sprite._bitmapTank.length;		//重播
					}
					if( temp_step['gif_back_run'] ){
						inter = Math.floor(inter);
						inter = temp_sprite._bitmapTank.length - 1 - inter;
					}
					inter = Math.floor(inter);
					temp_sprite.bitmap = temp_sprite._bitmapTank[inter];
				}
			}
		}
	}
}

//==============================
// * E音乐切换 - 初始化子功能
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_initMusic = function(){
	this._drill_music_curStep = -1;
	this._drill_music_lastBGM = null;
}
//==============================
// * E音乐切换 - 帧刷新
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_updateMusic = function() {
	var data = this._drill_data;
	var temp_step = data['steps'][ this._drill_curStep ];
	if( temp_step == undefined ){ return; }
	
	// > 音乐切换锁
	if( this._drill_music_curStep == this._drill_curStep ){ return; }
	this._drill_music_curStep = this._drill_curStep;
	
	// > 播放音乐
	if( temp_step['bgm_set'] === "不操作" ){
		//（不操作）
	}
	if( temp_step['bgm_set'] === "暂停之前的BGM" ){ 
		this.drill_sprite_saveBGM();
		AudioManager.stopBgm();
	}
	if( temp_step['bgm_set'] === "播放新的BGM" ){
		this.drill_sprite_saveBGM();
		var bgm = {};
		bgm.name = temp_step['bgm_src'];
		bgm.pitch = 100;
		bgm.volume = 100;
		AudioManager.playBgm(bgm);
	}
};
//==============================
// * E音乐切换 - 保存之前的音乐（私有）『BGM的保存与还原』
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_saveBGM = function(){
	if( this._drill_music_lastBGM == null ){
		this._drill_music_lastBGM = AudioManager.saveBgm();
	}
};
//==============================
// * E音乐切换 - 播放之前的音乐（开放函数）『BGM的保存与还原』
//==============================
Drill_COSR_Sprite.prototype.drill_sprite_loadLastBGM = function(){
	if( this._drill_music_lastBGM != null ){
		AudioManager.playBgm(this._drill_music_lastBGM);
	}
};


//=============================================================================
// ** 段落文本域【Drill_COSR_WindowSprite】
// **
// **		作用域：	战斗界面、地图界面、菜单界面
// **		主功能：	定义一个窗口，用于绘制段落文本。
// **		子功能：	
// **					->窗口『独立贴图』
// **						x->显示贴图/隐藏贴图
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **						->初始化数据
// **						->初始化对象
// **
// **		说明：	> 长画布贴图专用。
// **				> 该类是一个窗口，用于绘制段落文本。暂不考虑换成贴图。
//=============================================================================
//==============================
// * 段落文本域 - 定义
//==============================
function Drill_COSR_WindowSprite() {
    this.initialize.apply(this, arguments);
};
Drill_COSR_WindowSprite.prototype = Object.create(Window_Base.prototype);
Drill_COSR_WindowSprite.prototype.constructor = Drill_COSR_WindowSprite;
//==============================
// * 段落文本域 - 初始化
//==============================
Drill_COSR_WindowSprite.prototype.initialize = function( data ){
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
    Window_Base.prototype.initialize.call(this);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 段落文本域 - 帧刷新
//==============================
Drill_COSR_WindowSprite.prototype.update = function(){
	Window_Base.prototype.update.call(this);
};
//==============================
// * 段落文本域 - 初始化数据『独立贴图』
//==============================
Drill_COSR_WindowSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	if( data['context'] == undefined ){ data['context'] = "" };
	if( data['fontSize'] == undefined ){ data['fontSize'] = 28 };
	if( data['align'] == undefined ){ data['align'] = "left" };
	if( data['lineHeight'] == undefined ){ data['lineHeight'] = this.lineHeight(); };
	if( data['lineHeight'] == -1 ){ data['lineHeight'] = this.lineHeight(); }
}
//==============================
// * 段落文本域 - 初始化对象『独立贴图』
//
//			说明：	> 此函数只在初始化时执行一次，重设数据 被分到各个子功能里面执行。
//==============================
Drill_COSR_WindowSprite.prototype.drill_initSprite = function() {
	
	// > 隐藏窗口皮肤
	this.opacity = 0;
	this.contents.opacity = 255;
	
	// > 绘制文本
	this.drill_refreshMessage( this._drill_data['context'] );
}
//==============================
// * 段落文本域 - 窗口属性
//==============================
Drill_COSR_WindowSprite.prototype.standardPadding = function(){ return 2; };
Drill_COSR_WindowSprite.prototype.standardFontSize = function(){ return this._drill_data['fontSize']; };
//==============================
// * 段落文本域 - 绘制文本
//==============================
Drill_COSR_WindowSprite.prototype.drill_refreshMessage = function( context ){
	
	// > 窗口字符底层校验
	if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
		alert( DrillUp.drill_COSR_getPluginTip_NeedUpdate_drawText() );
	};
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = context;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth']  = Graphics.boxWidth;	//（固定为游戏屏幕宽度）
	options['infoParam']['canvasHeight'] = 100;					//（此参数暂时不用，先给个非零值）
	
	// > 参数准备 - 自定义
	options['blockParam'] = {};									//『自定义字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = this._drill_data['lineHeight'];
	
	options['rowParam']['alignHor_type'] = this._drill_data['align'];	//（窗口字符对齐方式）
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = this.standardFontSize();	//（使用当前窗口的字体大小
	
	// > 参数准备 - 『字符主流程』 - 获取文本高宽【窗口字符 - 窗口字符核心】
	var hh = this.drill_COWC_getOrgTextHeight( org_text, options );
	hh = Math.ceil(hh);
	options['infoParam']['canvasHeight'] = hh;
	
	// > 设置窗口高宽
	hh += this.standardPadding() * 2;				//（使用当前窗口的内边距）
	this._drill_windowWidth = Graphics.boxWidth;	//（固定为游戏屏幕宽度）
	this._drill_windowHeight = hh;
	this.width = this._drill_windowWidth;		//（窗口宽度）
	this.height = this._drill_windowHeight;		//（窗口高度）
	
	
	// > 自适应 - 重建画布（自适应高宽需要重建）
	this.createContents();
	temp_bitmap = this.contents;			//（临时画布重新绑定）
	
	
	// > 『字符主流程』 - DEBUG显示画布范围【窗口字符 - 窗口字符核心】
	//temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
	
	// > 『字符贴图流程』 - 刷新当前的字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfScreenRoller = false;
		var pluginTip = DrillUp.drill_COSR_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


