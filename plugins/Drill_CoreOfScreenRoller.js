//=============================================================================
// Drill_CoreOfScreenRoller.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 滚轴核心
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
 * 能够将图片、文字、GIF以滚动的方式播放。
 * ★★尽量放在最靠上的位置★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 需要基于核心才能运行，并作用于子插件：
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心★★v1.9及以上★★
 * 作用于：
 *   - Drill_SenceCredits           标题-制作组
 *   - Drill_SceneSelfplateE        面板-全自定义信息面板E
 *   - Drill_SceneSelfplateF        面板-全自定义信息面板F
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   用于控制长滚轴画布。
 * 2.画布的绘制方法，去看看 "18.面板 > 关于滚轴式长画布.docx"。
 * 结构：
 *   (1.滚轴分成阶段组，每个阶段都需要配置相应高度、内容等信息。
 *   (2.最后一个阶段滚动至末尾后，滚轴结束播放。
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
 * 测试方法：   以正常流程进行游戏，记录滚轴画布的消耗。
 * 测试结果：   在菜单界面中，长画布的消耗为：【15.78ms】
 *              在地图界面中，长画布的消耗为：【29.20ms】
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
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COSR (Core_Of_Screen_Roller)
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
//		★性能测试因素	进入制作组界面，查看消耗。
//		★性能测试消耗	15.78ms
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			滚轴核心：
//				->阶段
//				->图片模式
//				->文字模式
//				->GIF模式
// 
//		★私有类如下：
//			* Drill_COSR_Sprite【长画布】
//			* Drill_COSR_WindowSprite【文本域】
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.空的阶段时，阶段高度为0，根据滚轴推进可以快速跳过大量空阶段。
//			  空阶段也会建立sprite，但是是空的sprite。
//		
//		★核心接口说明：
//			1.整个核心只提供了一个封装好的【Sprite独立子类】。
//			  具体见类的说明。
//		
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfScreenRoller = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfScreenRoller');
	
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 长画布贴图【Drill_COSR_Sprite】
// **
// **		作用域：	地图界面、菜单界面
// **		主功能：	> 定义一个长画布，能够自我进行画布滚动。
// **
// **		说明：	> 【temp_data配置参数】都在drill_initData中，其他的都为私有参数。
// **				> 只要建立起该类，然后start启动就可以了，画布会自动update。
// **
// **		代码：	> 范围 - 该类定义一个超长画布贴图。
// **				> 结构 - [ ●合并 /分离/混乱] 
// **				> 数量 - [ ●单个 /多个] 
// **				> 创建 - [一次性/ ●自延迟 /外部延迟] 所有阶段中的图片加载完毕后，才进行滚动。
// **				> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
// **
// **		调用方法：	调用方法如下，数据格式见 >默认值 
// **					// > 滚轴 贴图初始化
// **					var temp_sprite = new Drill_COSR_Sprite( temp_data );
// **					this.addChild( temp_sprite );
// **					// > 滚轴启动
// **					temp_sprite.drill_COSR_start();	
//=============================================================================
function Drill_COSR_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_COSR_Sprite.prototype = Object.create(Sprite.prototype);
Drill_COSR_Sprite.prototype.constructor = Drill_COSR_Sprite;
//==============================
// * 长画布 - 初始化
//==============================
Drill_COSR_Sprite.prototype.initialize = function( data ) {
	Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 长画布 - 帧刷新
//==============================
Drill_COSR_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateSprite();			//帧刷新对象
}
//==============================
// * 长画布 - 开始滚动（接口，单次调用）
//==============================
Drill_COSR_Sprite.prototype.drill_COSR_start = function() {
	this._drill_start = true;
	this.visible = true;
}
//==============================
// * 长画布 - 滚动结束（接口，实时调用）
//==============================
Drill_COSR_Sprite.prototype.drill_COSR_isAtEnd = function() {
	return this._drill_end;
}
//==============================
// * 长画布 - 加速（接口，实时调用）
//==============================
Drill_COSR_Sprite.prototype.drill_COSR_speedUp = function( b ) {
	this._drill_speed_up = b;
}
//==============================
// * 初始化 - 数据
//==============================
Drill_COSR_Sprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	if( data['x'] == undefined ){ data['x'] = Graphics.boxWidth/2 };		//布局 - x
	if( data['y'] == undefined ){ data['y'] = 0 };							//布局 - y
	if( data['anchorX'] == undefined ){ data['anchorX'] = 0.5 };			//布局 - 中心x
	if( data['anchorY'] == undefined ){ data['anchorY'] = 0 };				//布局 - 中心y
	if( data['opacity'] == undefined ){ data['opacity'] = 0 };				//布局 - 透明度
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };			//布局 - 混合模式
	
	if( data['opacityShow'] == undefined ){ data['opacityShow'] = true };	//整体 - 初始阶段渐变显示
	if( data['opacitySpeed'] == undefined ){ data['opacitySpeed'] = 15 };	//整体 - 初始阶段
	if( data['steps'] == undefined ){ data['steps'] = [] };					//整体 - 阶段
	for( var j = 0; j < data['steps'].length ;j++){
		var temp_step = data['steps'][j];
		if( temp_step['height'] == undefined ){	temp_step['height'] = 0 };								//阶段 - 阶段高度
		if( temp_step['speed'] == undefined ){ temp_step['speed'] = 1.5 };								//阶段 - 阶段滚动速度
		if( temp_step['mode'] == undefined ){ temp_step['mode'] = "单图模式" };							//阶段 - 显示模式
		if( temp_step['img_src'] == undefined ){ temp_step['img_src'] = "" };							//阶段 - 资源-单图
		if( temp_step['img_src_file'] == undefined ){ temp_step['img_src_file'] = "img/system/" };		//阶段 - 资源-单图文件夹路径
		if( temp_step['img_x'] == undefined ){ temp_step['img_x'] = 0 };								//阶段 - 平移-单图 X
		if( temp_step['img_y'] == undefined ){ temp_step['img_y'] = 0 };								//阶段 - 平移-单图 Y
		if( temp_step['gif_src'] == undefined ){ temp_step['gif_src'] = "" };							//阶段 - 资源-GIF
		if( temp_step['gif_src_file'] == undefined ){ temp_step['gif_src_file'] = "img/system/" };		//阶段 - 资源-GIF文件夹路径
		if( temp_step['gif_x'] == undefined ){ temp_step['gif_x'] = 0 };								//阶段 - 平移-GIF X
		if( temp_step['gif_y'] == undefined ){ temp_step['gif_y'] = 0 };								//阶段 - 平移-GIF Y
		if( temp_step['gif_delay'] == undefined ){ temp_step['gif_delay'] = 60 };						//阶段 - 开始播放延迟
		if( temp_step['gif_interval'] == undefined ){ temp_step['gif_interval'] = 4 };					//阶段 - 帧间隔
		if( temp_step['gif_back_run'] == undefined ){ temp_step['gif_back_run'] = false };				//阶段 - 是否倒放
		if( temp_step['gif_replay'] == undefined ){ temp_step['gif_replay'] = true };					//阶段 - GIF到末尾是否重播
		if( temp_step['text_context'] == undefined ){ temp_step['text_context'] = "" };					//阶段 - 文本内容		
		if( temp_step['text_fontSize'] == undefined ){ temp_step['text_fontSize'] = 24 };				//阶段 - 文本字体大小
		if( temp_step['text_align'] == undefined ){ temp_step['text_align'] = "居中" };					//阶段 - 文本字体大小
		if( temp_step['text_x'] == undefined ){ temp_step['text_x'] = 0 };								//阶段 - 平移-文本 X
		if( temp_step['text_y'] == undefined ){ temp_step['text_y'] = 0 };								//阶段 - 平移-文本 Y	
		if( temp_step['bgm_set'] == undefined ){ temp_step['bgm_set'] = "不操作" };						//阶段 - 当前阶段BGM设置
		if( temp_step['bgm_src'] == undefined ){ temp_step['bgm_src'] = "" };							//阶段 - 资源-BGM
	}
	
}
//==============================
// * 初始化 - 对象
//==============================
Drill_COSR_Sprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this._drill_spriteTank = [];			//贴图容器
	this._drill_bitmapTank = [];			//资源容器
	this._drill_cur_step = 0;				//当前所在阶段
	
	this._drill_start = false;				//接口控制 - 开始开关
	this._drill_end = false;				//接口控制 - 结束开关
	this._drill_speed_up = false;			//接口控制 - 按键加速
	
	
	// > 主体属性
	this.x = data['x'];
	this.y = data['y'];
	this.anchor.x = data['anchorX'];
	this.anchor.y = data['anchorY'];
	this.opacity = data['opacity'];
	this.blendMode = data['blendMode'];
	this.visible = false;
	
	// > 创建函数
	this.drill_createStep();				//创建 - 阶段
}
//==============================
// * 创建 - 阶段准备
//==============================
Drill_COSR_Sprite.prototype.drill_createStep = function() {
	var data = this._drill_data;
	var cur_height = 0;
	for( var j = 0; j < data['steps'].length ;j++){
		var temp_step = data['steps'][j];
		var temp_sprite = new Sprite();
		if( temp_step['mode'] == "单图模式" ){
			var temp_bitmap = ImageManager.loadBitmap( temp_step['img_src_file'], temp_step['img_src'], 0, true);
			temp_sprite.bitmap = temp_bitmap;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0;
			temp_sprite.x = temp_step['img_x'];
			temp_sprite.y = cur_height + temp_step['img_y'];
			this._drill_bitmapTank.push(temp_bitmap);
			this._drill_spriteTank.push(temp_sprite);
			this.addChild( temp_sprite );
		}
		if( temp_step['mode'] == "GIF模式" ){
			temp_sprite._bitmapTank = [];
			temp_sprite._time = -1 * temp_step['gif_delay'];
			temp_sprite._index = 0;
			for( var k=0; k < temp_step['gif_src'].length; k++ ){
				var temp_bitmap = ImageManager.loadBitmap( temp_step['gif_src_file'], temp_step['gif_src'][k], 0, true);
				this._drill_bitmapTank.push(temp_bitmap);
				temp_sprite._bitmapTank.push(temp_bitmap);
			}
			temp_sprite.bitmap = temp_sprite._bitmapTank[0];
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0;
			temp_sprite.x = temp_step['gif_x'];
			temp_sprite.y = cur_height + temp_step['gif_y'];
			this._drill_spriteTank.push(temp_sprite);
			this.addChild( temp_sprite );
		}
		if( temp_step['mode'] == "文本模式" ){
			temp_sprite.anchor.x = 0;
			temp_sprite.anchor.y = 0;
			temp_sprite.x = -1 * Graphics.boxWidth/2 + temp_step['text_x'];
			temp_sprite.y = cur_height + temp_step['text_y'];
			var w = new Drill_COSR_WindowSprite(temp_step);
			temp_sprite.addChild( w );
			this._drill_spriteTank.push(temp_sprite);
			this.addChild( temp_sprite );
		}
		cur_height += temp_step['height'];
		temp_step['next_step_height'] = cur_height;
	}
}

//==============================
// * 帧刷新对象
//==============================
Drill_COSR_Sprite.prototype.drill_updateSprite = function() {
	if( this.drill_isAllBitmapReady() == false ){ return; }		//图片准备
	if( this._drill_start == false ){ return; }					//开始开关
	if( this._drill_end == true ){ return; }					//结束开关
	
	this.drill_updateShowUp();			//初始阶段渐变
	this.drill_updateRollSpeed();		//滚轴速度
	this.drill_updateGIF();				//GIF刷新
	this.drill_updateMusic();			//背景音乐切换
}
//==============================
// * 帧刷新 - 图片准备
//==============================
Drill_COSR_Sprite.prototype.drill_isAllBitmapReady = function() {
	for( var j = 0; j < this._drill_bitmapTank.length ;j++){
		if( this._drill_bitmapTank[j].isReady() != true ){
			return false;
		}
	}
	return true;
}
//==============================
// * 帧刷新 - 初始阶段渐变显示
//==============================
Drill_COSR_Sprite.prototype.drill_updateShowUp = function() {
	if( this.opacity == 255 ){ return; }
	
	var data = this._drill_data;
	if( data['opacityShow'] == true ){
		this.opacity += data['opacitySpeed'];
	}else{
		this.opacity = 255;
	}
}
//==============================
// * 帧刷新 - 滚轴速度
//==============================
Drill_COSR_Sprite.prototype.drill_updateRollSpeed = function() {
	if( this.opacity < 255 ){ return; }
	
	// > 向上滚动
	var data = this._drill_data;
	var temp_step = data['steps'][this._drill_cur_step];
	this.y -= temp_step['speed'];
	if( this._drill_speed_up == true ){
		this.y -= temp_step['speed'];
	}
	
	// > 阶段进度
	if( this.y < -1 * temp_step['next_step_height'] ){
		this._drill_cur_step += 1;
	}
	
	// > 结束播放情况
	if( this._drill_cur_step >= data['steps'].length ){
		this._drill_end = true;
		this.visible = false;
	}
}

//==============================
// * 帧刷新 - GIF刷新
//==============================
Drill_COSR_Sprite.prototype.drill_updateGIF = function() {
	var data = this._drill_data;
	for( var j = 0; j < data['steps'].length ;j++){
		var temp_step = data['steps'][j];
		var temp_sprite = this._drill_spriteTank[j];
		if( temp_step['mode'] == "GIF模式" ){
			if( this.y + temp_step['next_step_height'] < Graphics.boxHeight ){	//GIF出现时才播放
				temp_sprite._time += 1;
				if( temp_sprite._time >= 0 ){
					//>GIF播放
					var inter = temp_sprite._time ;
					inter = inter / temp_step['gif_interval'];
					if( inter >= temp_sprite._bitmapTank.length &&
						temp_step['gif_replay'] == false ){
						inter = temp_sprite._bitmapTank.length - 1;			//不重播
					}else{
						inter = inter % temp_sprite._bitmapTank.length;		//重播
					}
					if(temp_step['gif_back_run']){
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
// ** 帧刷新 - 背景音乐切换
//==============================
Drill_COSR_Sprite.prototype.drill_updateMusic = function() {
	var data = this._drill_data;
	var temp_step = data['steps'][this._drill_cur_step];
	if( !temp_step ){ return }
	if( temp_step['bgm_set'] === "不操作" ){ return }
	if( temp_step['bgm_set'] === "暂停之前的BGM" ){ 
		AudioManager.stopBgm();
		return;
	}
	if( temp_step['bgm_set'] === "播放新的BGM" ){
		var bgm = {};
		bgm.name = temp_step['bgm_src'];
		bgm.pitch = 100;
		bgm.volume = 100;
		AudioManager.playBgm(bgm);
	}
};



//=============================================================================
// ** Drill_COSR_WindowSprite 文本域
//=============================================================================
function Drill_COSR_WindowSprite() {
    this.initialize.apply(this, arguments);
};
Drill_COSR_WindowSprite.prototype = Object.create(Window_Base.prototype);
Drill_COSR_WindowSprite.prototype.constructor = Drill_COSR_WindowSprite;
//==============================
// * 文本域 - 初始化
//==============================
Drill_COSR_WindowSprite.prototype.initialize = function( data ) {
	this._drill_data = data;
	this._drill_fontSize = data['text_fontSize'];
	var context_list = data['text_context'];
	var options = {
		"width":Graphics.boxWidth,
		"convertEnabled":data['text_convertEnabled'],
		"autoLineheight":data['text_autoLineheight'],
		"lineheight":data['text_lineheight'],
		"align":data['text_align'],
	}
	
    Window_Base.prototype.initialize.call(this);
	
	this.opacity = 0;
	this.contents.opacity = 255;
	this.drill_createText( context_list, options );
};

//==============================
// * 文本域 - 帧刷新
//==============================
Drill_COSR_WindowSprite.prototype.update = function() {
	Window_Base.prototype.update.call(this);
}
//==============================
// * 文本域 - 绘制文本
//==============================
Drill_COSR_WindowSprite.prototype.drill_createText = function( context_list, options ) {
	
	// > 默认值（COWA函数）
	options = this.drill_COWA_checkDrawExOptions(options);
	
	// > 计算字符高宽（COWA函数）
	this.drill_COWA_DTLE_calculateHeightAndWidth( context_list, options );
	
	// > 修改窗口高宽
	var hh = 0;
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){
		hh += this.drill_COWA_heightList[i];
	}
	this.width = Graphics.boxWidth;
	this.height = hh + this.standardPadding() * 2;
	
	// > 画布重建（COWA函数）
    this.createContents();
    this.contents.clear();
	
	// > 开始绘制（COWA函数）
	this.drill_COWA_startDrawListEx( context_list, options );
	
}
//==============================
// * 文本域 - 配置
//==============================
Drill_COSR_WindowSprite.prototype.standardFontSize = function() {
    return this._drill_fontSize;
};
Drill_COSR_WindowSprite.prototype.standardPadding = function() {
    return 2;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfScreenRoller = false;
		alert(
			"【Drill_CoreOfScreenRoller.js 系统-滚轴核心】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}



