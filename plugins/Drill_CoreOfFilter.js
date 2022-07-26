//=============================================================================
// Drill_CoreOfFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 滤镜核心
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够给所有贴图添加滤镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 插件作用于以下子插件。
 * 可作用于：
 *   - Drill_EnemyFilter         单位-滤镜效果
 *   - Drill_EventFilter         行走图-滤镜效果
 *   - Drill_ItemTextFilter      UI-物品+技能文本的滤镜效果
 *   - Drill_PictureFilter       图片-滤镜效果
 *   - Drill_DialogFilter        对话框-滤镜效果
 *   - Drill_X_GaugeBossFilter   UI-高级BOSS框的滤镜效果[扩展]
 *   - Drill_X_BattleHudFilter   战斗UI-角色窗口的滤镜效果[扩展]
 *   - Drill_X_EventTextFilter   行走图-事件漂浮文字的滤镜效果[扩展]
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于所有贴图。
 * 2.想要了解更多滤镜效果，可以去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.纯色滤镜、着色滤镜、模糊滤镜……等 都相互独立，且效果可以相互叠加。
 *      添加滤镜的先后顺序不同，可能会产生不同的叠加效果。
 *   (2.波动纯色滤镜 与 纯色滤镜 是同一个滤镜，只是变化方式不同。
 *      二者指令会相互覆盖。
 *   (3.使用滤镜时，最好先设置0（给一个关闭滤镜过程），再切换。避免瞬间切换的不自然。
 *   (4.该核心对所有Sprite都有效。
 *      核心的接口是对外的，如果你对脚本和插件有一定了解。
 *      你可以写插件，从脚本上给任何一个Sprite添加完美的自定义滤镜。
 * 版本：
 *   (1.注意，在1.61盗版rmmv中，滤镜核心可能会出现图像拉扯的小问题。
 *      而火狐浏览器、正版rmmv中都未出现该问题，可能是盗版引擎的内部bug。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 工作类型：   持续执行
 * 时间复杂度： o(n)*o(贴图处理)*o(滤镜) 每帧
 * 测试方法：   无法测出具体值，需要根据基于该核心的子插件来判断。
 * 测试结果：   无
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.滤镜是性能消耗大户，因为带滤镜的图片效果都是通过即时演算形成的。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了代码格式。（没改逻辑结构，但优化后噪点bug就神秘消失了……）
 * [v1.2]
 * 较大幅度优化了滤镜结构。修复了贴图为空时，滤镜效果不消失的bug。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COF（Core_Of_Filter）
//		临时全局变量	无
//		临时局部变量	this._drill_COF
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	地图管理层 125事件
//		★性能测试消耗	Spite.prototype.update 321.71ms
//						Spite.prototype.setFrame 140.88ms
//		★最坏情况		无法判断这个插件的性能，就是最坏情况。
//		★备注			由于与底层类联结，所以会以树根的形式出现。
//						【测试的结果，是sprite的整个update的消耗。】
//		
//		★优化记录		
//			性能消耗分布：
//				模糊滤镜 > 噪点滤镜 > 着色滤镜 > 纯色滤镜 == 填充滤镜
//				其中模糊滤镜有.quality模糊质量分配，模糊质量越高消耗越大
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			滤镜核心：
//				->纯色滤镜 pB
//				->着色滤镜 cB
//				->填充滤镜 fB
//				->彩虹滤镜 rB	x
//				->模糊滤镜 bF
//				->噪点滤镜 nF
//				->滤镜设置、暂停、变化、叠加
//				->滤镜波动效果
//				->置换滤镜	x
//				->彩虹滤镜 纯色/填充 性质	x
//				->（滤镜核）优化，滤镜/滤镜板用到的时候才new
//
//		★必要注意事项：
//			1.滤镜并不像数组一样可以【直接push】，需要个中介。
//			2.滤镜的局限：
//				- 装饰类不稳定，极有可能造成大的负担。
//				- 装饰类结构存在问题，只能装饰一个类，这个与js内部构造有关。
//				- 防止重复定义并不是好方法，因为在性能测试时经常【误抓】。
//			3.开关机制
//				._drill_COF_inited	滤镜开关			（必须手动执行drill_COF_initialize函数开启这个sprite的滤镜）
//				.opened				指定滤镜的启用开关	（直接帧刷新执行xxxx_ONCE即可自动开启）
//			4.容错机制：
//				核心的接口函数如下，由于方法数量太多，这里对输入每个类型都有校验。（弱类型语言的坑还是太大了）
//			5.不同滤镜的消耗也不一样：
//				【模糊滤镜】 > 噪点滤镜 > 着色滤镜 > 纯色滤镜 == 填充滤镜
//				其中模糊滤镜有.quality模糊质量分配，模糊质量越高消耗越大。
//		
//		★其它说明细节：
//			1.着色滤镜和纯色滤镜，是通过建立同等图片板来覆盖实现的。
//			2.参数超级多，复杂，但是并不影响速度，如果电脑卡了，看看是不是参数没对准。
//			3.prototype中获取到的函数名是匿名函数，无法获取指定的函数名。
//			4.关于绘制文字的bitmap完美复制方法：	
//				temp_sprite.bitmap = null;
//				temp_sprite.bitmap = this.bitmap;
//			  这种方法可以绕开sprite的缓存，重置刷新。
//			  （之前尝试了许多在bitmap进行绘图同步的方法，但是都失败了。）
//			  （__baseTexture和__context刷新都不起作用。）
//
//		★核心接口说明：
//			1.打开滤镜：
//				手动执行Sprite的.drill_COF_initialize()函数。
//				手动执行下面的任意一个操作函数即可。
//				操作函数：
//					（_ONCE方法可以放在帧刷新函数中无限次执行，且不影响性能）
//					- drill_COF_setPureLinear_ONCE
//					- drill_COF_setPureWave_ONCE
//					- drill_COF_setColorLinear_ONCE
//					- drill_COF_setColorWave_ONCE
//					- drill_COF_setFillLinear_ONCE
//					- drill_COF_setFillWave_ONCE
//					- drill_COF_setBlurLinear_ONCE
//					- drill_COF_setBlurWave_ONCE
//					- drill_COF_setNoiseLinear_ONCE
//					- drill_COF_setNoiseWave_ONCE
//				初始化函数：
//					（初始化函数在 操作函数 前执行才有效，不设置则用默认值）
//					- drill_COF_setPureLinear_Init
//					- drill_COF_setPureWave_Init
//					- drill_COF_setColorLinear_Init
//					- drill_COF_setColorWave_Init
//					- drill_COF_setFillLinear_Init
//					- drill_COF_setFillWave_Init
//					- drill_COF_setBlurLinear_Init
//					- drill_COF_setBlurWave_Init
//					- drill_COF_setNoiseLinear_Init
//					- drill_COF_setNoiseWave_Init
//			2.参数说明：
//				【具体参数去指定的函数查看】
//				导入了错误的参数不会报错，会在后台警告提示参数错误。
//				最好把所有警告都避免。
//				
//		★存在的问题：
//			1.pixi的滤镜实际上是被分离成本体滤镜和pixi-filter滤镜附件。
//			  为了更多效果，插件可能后期会被进一步分裂。
//			2.滤镜会造成图像扭曲问题。
//	
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfFilter = true;
	Imported.Drill_CoreOfFilter_version = 1.20;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfFilter');
	
	
//=============================================================================
// ** Bitmap监听
//=============================================================================
//==============================
// * 监听 - bitmap变动
//==============================
var _drill_COF_bitmap_clearRect = Bitmap.prototype.clearRect;
Bitmap.prototype.clearRect = function(x, y, width, height) {
	/* 由于 Bitmap.prototype._setDirty 接触面太广，这里单独对 text、方块、渐变方块、圆形 的绘制进行监听 */
	_drill_COF_bitmap_clearRect.apply(this,arguments);
	this._drill_COF_isDirty = true;
}
var _drill_COF_bitmap_fillRect = Bitmap.prototype.fillRect;
Bitmap.prototype.fillRect = function(x, y, width, height, color) {
	_drill_COF_bitmap_fillRect.apply(this,arguments);
	this._drill_COF_isDirty = true;
}
var _drill_COF_bitmap_gradientFillRect = Bitmap.prototype.gradientFillRect;
Bitmap.prototype.gradientFillRect = function(x, y, width, height, color1,color2, vertical){
	_drill_COF_bitmap_gradientFillRect.apply(this,arguments);
	this._drill_COF_isDirty = true;
}
var _drill_COF_bitmap_drawCircle = Bitmap.prototype.drawCircle;
Bitmap.prototype.drawCircle = function(x, y, radius, color) {
	_drill_COF_bitmap_drawCircle.apply(this,arguments);
	this._drill_COF_isDirty = true;
}
var _drill_COF_bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
	_drill_COF_bitmap_drawText.apply(this,arguments);
	if (text !== undefined) {
		this._drill_COF_isDirty = true;
	}
}
	
//=============================================================================
// ** Sprite
//=============================================================================
//==============================
// * 滤镜 - 初始化
//==============================
Sprite.prototype.drill_COF_initialize = function(){
	if( this._drill_COF_inited == true ){ return; }
	this._drill_COF_inited = true;
	this.drill_COF_initializeData();
	this.drill_COF_initializeSprite();
}
//==============================
// * 滤镜 - 初始化判断
//==============================
Sprite.prototype.drill_COF_isInited = function(){
	return this._drill_COF_inited == true;
}
//==============================
// * 初始化 - 数据
//==============================
Sprite.prototype.drill_COF_initializeData = function(){
	this._drill_COF = {};
	
	var pB = {};					// > 纯色滤镜
	pB.o_cur = 0;						//线性 - 当前透明度
	pB.o_tar = 0;						//线性 - 目标透明度
	pB.o_speed = 0;						//线性 - 变化速度
	pB.time = 0;						//线性 - 持续时间
	pB.o_range = 0;						//波动 - 范围
	pB.o_period = 0;					//波动 - 周期
	pB.move = 0;						//已存在时间
	pB.type_cur = "";					//滤镜板当前类型
	pB.type_tar = "";					//滤镜板目标类型
	pB.mode = "";						//变化模式
	 pB.opened = false;					//启用开关
	 pB.inited = false;					//初始化开关（启用了才初始化）
	 pB.init_type = "";					//  初始化数据 - 类型
	 pB.init_mode = "linear";			//  初始化数据 - 模式
	 pB.init_opacity = 0;				//  初始化数据 - 程度（线性）
	 pB.init_range = 0;					//  初始化数据 - 范围（波动）
	 pB.init_period = 0;				//  初始化数据 - 周期（波动）
	 pB.need_setFrame = true;			//框架监听
	pB['lockData'] = {};				//函数赋值锁
	pB['lockData']['linear'] = {};		//  赋值锁 - 线性
	pB['lockData']['wave'] = {};		//  赋值锁 - 波动
	this._drill_COF.pureBoard = pB;	
	
	var cB = {};					// > 着色滤镜
	cB.o_cur = 0;						//线性 - 当前透明度
	cB.o_tar = 0;               		//线性 - 目标透明度
	cB.o_speed = 0;             		//线性 - 变化速度
	cB.time = 0;                		//线性 - 持续时间
	cB.o_range = 0;	            		//波动 - 范围
	cB.o_period = 0;	        		//波动 - 周期
	cB.move = 0;                		//已存在时间
	cB.type_cur = "";           		//滤镜板当前类型
	cB.type_tar = "";           		//滤镜板目标类型
	cB.mode = "";               		//变化模式
	 cB.opened = false;         		//启用开关
	 cB.inited = false;         		//初始化开关（启用了才初始化）
	 cB.init_type = "";					//  初始化数据 - 类型
	 cB.init_mode = "linear";   		//  初始化数据 - 模式
	 cB.init_opacity = 0;       		//  初始化数据 - 程度（线性）
	 cB.init_range = 0;					//  初始化数据 - 范围（波动）
	 cB.init_period = 0;				//  初始化数据 - 周期（波动）
	 cB.need_setFrame = true;			//框架监听
	cB['lockData'] = {};      			//函数赋值锁
	cB['lockData']['linear'] = {};  	//  赋值锁 - 线性
	cB['lockData']['wave'] = {};    	//  赋值锁 - 波动
	this._drill_COF.colorBoard = cB;
	
	var fB = {};					// > 填充滤镜
	fB.o_cur = 0;						//线性 - 当前透明度
	fB.o_tar = 0;               		//线性 - 目标透明度
	fB.o_speed = 0;             		//线性 - 变化速度
	fB.time = 0;                		//线性 - 持续时间
	fB.o_range = 0;	            		//波动 - 范围
	fB.o_period = 0;	        		//波动 - 周期
	fB.move = 0;                		//已存在时间
	fB.type_cur = "";           		//滤镜板当前类型
	fB.type_tar = "";           		//滤镜板目标类型
	fB.mode = "";               		//变化模式
	 fB.opened = false;         		//启用开关
	 fB.inited = false;         		//初始化开关（启用了才初始化）
	 fB.init_type = "";					//  初始化数据 - 类型
	 fB.init_mode = "linear";   		//  初始化数据 - 模式
	 fB.init_opacity = 0;       		//  初始化数据 - 程度（线性）
	 fB.init_range = 0;					//  初始化数据 - 范围（波动）
	 fB.init_period = 0;				//  初始化数据 - 周期（波动）
	 fB.need_setFrame = true;			//框架监听
	fB['lockData'] = {};        	 	//函数赋值锁
	fB['lockData']['linear'] = {};  	//  赋值锁 - 线性
	fB['lockData']['wave'] = {};    	//  赋值锁 - 波动
	this._drill_COF.fillBoard = fB;
	
	var rB = {};					// > 彩虹滤镜
	rB.o_cur = 0;						//线性 - 当前透明度
	rB.o_tar = 0;               		//线性 - 目标透明度
	rB.o_speed = 0;             		//线性 - 变化速度
	rB.time = 0;                		//线性 - 持续时间
	rB.o_range = 0;	            		//波动 - 范围
	rB.o_period = 0;	        		//波动 - 周期
	rB.move = 0;                		//已存在时间
	rB.type_cur = "";           		//滤镜板当前类型
	rB.type_tar = "";           		//滤镜板目标类型
	rB.mode = "";               		//变化模式
	 rB.opened = false;         		//启用开关
	 rB.inited = false;         		//初始化开关（启用了才初始化）
	 rB.init_type = "";					//  初始化数据 - 类型
	 rB.init_mode = "linear";   		//  初始化数据 - 模式
	 rB.init_opacity = 0;       		//  初始化数据 - 程度（线性）
	 rB.init_range = 0;					//  初始化数据 - 范围（波动）
	 rB.init_period = 0;				//  初始化数据 - 周期（波动）
	 rB.need_setFrame = true;			//框架监听
	rB['lockData'] = {};       			//函数赋值锁
	rB['lockData']['linear'] = {}; 		//  赋值锁 - 线性
	rB['lockData']['wave'] = {};  		//  赋值锁 - 波动
	this._drill_COF.rainbowBoard = rB;
	
	var bF = {};					// > 模糊滤镜
	bF.o_cur = 0;						//线性 - 当前透明度
	bF.o_tar = 0;               		//线性 - 目标透明度
	bF.o_speed = 0;             		//线性 - 变化速度
	bF.time = 0;                		//线性 - 持续时间
	bF.o_range = 0;	            		//波动 - 范围
	bF.o_period = 0;	        		//波动 - 周期
	bF.move = 0;                		//已存在时间
	bF.mode = "";               		//变化模式
	 bF.opened = false;         		//启用开关
	 bF.inited = false;         		//初始化开关（启用了才初始化）
	 bF.init_mode = "linear";   		//  初始化数据 - 模式
	 bF.init_opacity = 0;       		//  初始化数据 - 程度（线性）
	 bF.init_range = 0;					//  初始化数据 - 范围（波动）
	 bF.init_period = 0;				//  初始化数据 - 周期（波动）
	bF['lockData'] = {};				//函数赋值锁
	bF['lockData']['linear'] = {}; 		//  赋值锁 - 线性
	bF['lockData']['wave'] = {};  		//  赋值锁 - 波动
	this._drill_COF.blurFilter = bF;
	
	var nF = {};					// > 噪点滤镜
	nF.o_cur = 0;						//线性 - 当前透明度
	nF.o_tar = 0;               		//线性 - 目标透明度
	nF.o_speed = 0;             		//线性 - 变化速度
	nF.time = 0;                		//线性 - 持续时间
	nF.o_range = 0;	            		//波动 - 范围
	nF.o_period = 0;	        		//波动 - 周期
	nF.move = 0;                		//已存在时间
	nF.mode = "";               		//变化模式
	 nF.opened = false;         		//启用开关
	 nF.inited = false;         		//初始化开关（启用了才初始化）
	 nF.init_mode = "linear";   		//  初始化数据 - 模式
	 nF.init_opacity = 0;       		//  初始化数据 - 程度（线性）
	 nF.init_range = 0;					//  初始化数据 - 范围（波动）
	 nF.init_period = 0;				//  初始化数据 - 周期（波动）
	nF['lockData'] = {};   				//函数赋值锁
	nF['lockData']['linear'] = {}; 		//  赋值锁 - 线性
	nF['lockData']['wave'] = {};  		//  赋值锁 - 波动
	this._drill_COF.noiseFilter = nF;
}
//==============================
// * 初始化 - 贴图
//==============================
Sprite.prototype.drill_COF_initializeSprite = function(){
	this._drill_COF_sTank = {};
	this._drill_COF_sTank.pureBoard = null;		//>纯色滤镜
	this._drill_COF_sTank.colorBoard = null;	//>着色滤镜
	this._drill_COF_sTank.fillBoard = null;		//>填充滤镜
	this._drill_COF_sTank.rainbowBoard = null;	//>彩虹滤镜
	this._drill_COF_sTank.blurFilter = null;	//>模糊滤镜
	this._drill_COF_sTank.noiseFilter = null;	//>噪点滤镜
	//（要用的时候才初始化）
}

//==============================
// * 滤镜 - 框架一致（滤镜板）
//==============================
var _drill_COF_sTanketFrame = Sprite.prototype.setFrame;
Sprite.prototype.setFrame = function( x, y, width, height ){
	_drill_COF_sTanketFrame.call(this, x, y, width, height);
	this.drill_COF_frameChanged();
}
Sprite.prototype.drill_COF_frameChanged = function() {
	if( this._drill_COF_inited != true ){ return; }
	this._drill_COF.pureBoard.need_setFrame = true;		//纯色滤镜板刷框架
	this._drill_COF.colorBoard.need_setFrame = true;	//着色滤镜板刷框架
	this._drill_COF.fillBoard.need_setFrame = true;		//填充滤镜板刷框架
}

//==============================
// * 滤镜 - 帧刷新
//==============================
var _drill_COF_update = Sprite.prototype.update;
Sprite.prototype.update = function() {
	_drill_COF_update.call(this);
	if( this._drill_COF_inited == true ){	//（防止其他插件调用出错） 
		this.drill_COF_updateSprite();
	}
}
Sprite.prototype.drill_COF_updateSprite = function() {
	if( this._drill_COF_inited != true ){ return; }
	
	// > 延迟初始化
	this.drill_COF_updateColorBoardInit();
	this.drill_COF_updatePureBoardInit();			//（纯色在着色滤镜前面）
	this.drill_COF_updateFillBoardInit();
	this.drill_COF_updateBlurFilterInit();
	this.drill_COF_updateNoiseFilterInit();
	
	// > 框架同步
	this.drill_COF_updatePureBoardFrame();
	this.drill_COF_updateColorBoardFrame();
	this.drill_COF_updateFillBoardFrame();
	
	// > 滤镜板变化
	if( this.visible == true ){
		this.drill_COF_updatePureBoardTransfer();
		this.drill_COF_updateColorBoardTransfer();
		this.drill_COF_updateFillBoardTransfer();
		this.drill_COF_updateBlurFilterTransfer();
		this.drill_COF_updateNoiseFilterTransfer();
	}
}

//=============================================================================
// ** 纯色滤镜
//=============================================================================
//==============================
// ** 纯色 - 帧刷新 - 延迟初始化
//==============================
Sprite.prototype.drill_COF_updatePureBoardInit = function() {
	var pB = this._drill_COF.pureBoard;
	if( pB.opened == false ){ return }		//滤镜开关锁（开关调用了就一直为true）
	if( pB.inited != false ){ return }		//初始化锁（初始化后一直为true）
	
	// > 建立滤镜板
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = this.anchor.x;
	temp_sprite.anchor.y = this.anchor.y;
	temp_sprite.blendMode = 2;
	temp_sprite.bitmap = this.bitmap;
	temp_sprite._drill_url = this.bitmap ? this.bitmap.url : "_null_";	//（空字符串也需要资源同步）
	this.addChild(temp_sprite); 
	this._drill_COF_sTank.pureBoard = temp_sprite;
	
	// > 滤镜板初始化
	pB.inited = true;
	pB.type_cur = pB.init_type;
	pB.type_tar = pB.init_type;
	pB.mode = pB.init_mode;
	pB.o_cur = pB.init_opacity;
	pB.o_tar = pB.init_opacity;
	pB.o_range = pB.init_range;
	pB.o_period = pB.init_period;
	pB['lockData']['linear'].type_tar = pB.type_tar;
	pB['lockData']['linear'].o_tar = pB.o_tar;
	pB['lockData']['wave'].o_range = pB.o_range;
	pB['lockData']['wave'].o_period = pB.o_period;
	temp_sprite.opacity = pB.o_cur;
	this.drill_COF_setPureBoardType( pB.type_cur );
}
//==============================
// ** 纯色 - 帧刷新 - 框架同步
//==============================
Sprite.prototype.drill_COF_updatePureBoardFrame = function() {
	var pB = this._drill_COF.pureBoard;
	if( pB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.pureBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 中心同步
	if( this.anchor.x !== temp_sprite.anchor.x ){ temp_sprite.anchor.x = this.anchor.x; }
	if( this.anchor.y !== temp_sprite.anchor.y ){ temp_sprite.anchor.y = this.anchor.y; }
	
	// > 滤镜板 - 资源图片同步
	if( this.bitmap && this.bitmap.isReady() ){
		if( temp_sprite._drill_url!= this.bitmap.url){	//（bitmap图片同步）
			temp_sprite.bitmap = this.bitmap;
			temp_sprite._drill_url = this.bitmap.url;
		}
		if( this.bitmap._drill_COF_isDirty == true ){	//（bitmap绘画变动，则滤镜板的bitmap也刷新）
			this.bitmap._drill_COF_isDirty = false;
			temp_sprite.bitmap = null;
			temp_sprite.bitmap = this.bitmap;
		}
	}else{
		temp_sprite.bitmap = null;				//（bitmap为空，滤镜板置空）
		temp_sprite._drill_url = "_null_";		//（置空后，bitmap需要强制赋值一下）
	}
	
	// > 滤镜板 - 框架同步
	if( pB.need_setFrame == true ){
		pB.need_setFrame = false;
		temp_sprite.setFrame( this._frame.x, this._frame.y, this._frame.width, this._frame.height );
	}
}
	
//==============================
// ** 纯色 - 帧刷新 - 滤镜板变化
//==============================
Sprite.prototype.drill_COF_updatePureBoardTransfer = function() {
	var pB = this._drill_COF.pureBoard;
	if( pB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.pureBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 线性变化
	if(pB.mode == "linear"){
		pB.move += 1;
		if( pB.move <= pB.time ){
			if( Math.abs(pB.o_cur - pB.o_tar) <= Math.abs(pB.o_speed) ){
				pB.o_cur = pB.o_tar;
			}else{
				pB.o_cur += pB.o_speed;
			}
			temp_sprite.opacity = pB.o_cur;
		}
		if( pB.type_cur != pB.type_tar ){
			pB.type_cur = pB.type_tar;
			this.drill_COF_setPureBoardType( pB.type_cur );
		}
	}
	// > 滤镜板 - 波动变化
	if(pB.mode == "wave" && pB.o_range != 0 ){
		pB.move += 1;
		var p = pB.o_range ;
		var wave_value = p/2+p/2 * Math.sin( (360* pB.move / pB.o_period - 90 )/ 180 * Math.PI);
		temp_sprite.opacity = wave_value;
		if( pB.type_cur != pB.type_tar ){
			pB.type_cur =  pB.type_tar;
			this.drill_COF_setPureBoardType( pB.type_cur );
		}
	}
}
//==============================
// ** 纯色 - 类型
//==============================
Sprite.prototype.drill_COF_setPureBoardType = function( type ) {
	var temp_sprite = this._drill_COF_sTank.pureBoard;
	if( type == "纯黑" || type == "黑色" ){ temp_sprite.setBlendColor([0, 0, 0, 255]); }
	if( type == "纯蓝" || type == "蓝色" ){ temp_sprite.setBlendColor([0, 0, 255, 255]); }
	if( type == "纯绿" || type == "绿色" ){ temp_sprite.setBlendColor([0, 255, 0, 255]); }
	if( type == "纯红" || type == "红色" ){ temp_sprite.setBlendColor([255, 0, 0, 255]); }
	if( type == "纯青" || type == "青色" ){ temp_sprite.setBlendColor([0, 255, 255, 255]); }
	if( type == "纯紫" || type == "紫色" ){ temp_sprite.setBlendColor([255, 0, 255, 255]); }
	if( type == "纯黄" || type == "黄色" ){ temp_sprite.setBlendColor([255, 255, 0, 255]); }
}
//==============================
// ** 纯色 - 线性模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setPureLinear("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setPureLinear_Init = function( type_,opacity_ ){
	if( this._drill_COF_inited != true ){ return; }
	var pB = this._drill_COF.pureBoard;
	pB.init_mode = "linear";
	pB.init_type = String(type_);
	pB.init_opacity = Number(opacity_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear_Init","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear_Init","opacity_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setPureLinear = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var pB = this._drill_COF.pureBoard;
	if( pB.inited == false && opacity_ == 0 && time_ == 0){ return }
	pB.type_tar = String(type_);
	pB.time = Math.max( Number(time_) ,1);
	pB.move = 0;
	pB.o_tar = Number(opacity_);
	pB.o_speed = (pB.o_tar - pB.o_cur)/pB.time;
	pB.mode = "linear";
	pB.opened = true;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear","time_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setPureLinear_ONCE = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_l = this._drill_COF.pureBoard['lockData']['linear'];
	if( lockData_l.type_tar == type_ && lockData_l.o_tar == opacity_ ){ return; }
	lockData_l.type_tar = type_;
	lockData_l.o_tar = opacity_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear_ONCE","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear_ONCE","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureLinear_ONCE","time_" ); }
	this.drill_COF_setPureLinear( String(type_),Number(opacity_),Number(time_) );
};

//==============================
// ** 纯色 - 波动模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setPureWave("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setPureWave_Init = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var pB = this._drill_COF.pureBoard;
	pB.init_mode = "wave";
	pB.init_type = String(type_);
	pB.init_range = Number(range_);
	pB.init_period = Number(period_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave_Init","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave_Init","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave_Init","period_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setPureWave = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var pB = this._drill_COF.pureBoard;
	if( pB.inited == false && range_ == 0 && period_ == 0){ return }
	pB.type_tar = String(type_);
	pB.move = 0;
	pB.o_range = Number(range_);
	pB.o_period = Number(period_);
	pB.mode = "wave";
	pB.opened = true;
	if( pB.o_range == 0 && this._drill_COF_sTank.pureBoard ){
		this._drill_COF_sTank.pureBoard.opacity = 0;
	}
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave","period_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setPureWave_ONCE = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_w = this._drill_COF.pureBoard['lockData']['wave'];
	if( lockData_w.o_range == range_ && lockData_w.o_period == period_ ){ return; }
	lockData_w.o_range = range_;
	lockData_w.o_period = period_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave_ONCE","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave_ONCE","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setPureWave_ONCE","period_" ); }
	this.drill_COF_setPureWave( String(type_),Number(range_),Number(period_) );
};

//=============================================================================
// ** 着色滤镜
//=============================================================================
//==============================
// ** 着色 - 帧刷新 - 延迟初始化
//==============================
Sprite.prototype.drill_COF_updateColorBoardInit = function() {
	var cB = this._drill_COF.colorBoard;
	if( cB.opened == false ){ return }		//滤镜开关锁（开关调用了就一直为true）
	if( cB.inited != false ){ return }		//初始化锁（初始化后一直为true）
	
	// > 建立滤镜板
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = this.anchor.x;
	temp_sprite.anchor.y = this.anchor.y;
	temp_sprite.bitmap = this.bitmap;
	temp_sprite._colorFilter = new PIXI.filters.ColorMatrixFilter();
	temp_sprite.filters = [temp_sprite._colorFilter];
	temp_sprite._drill_url = this.bitmap ? this.bitmap.url : "_null_";	//（空字符串也需要资源同步）
	this.addChild(temp_sprite); 
	this._drill_COF_sTank.colorBoard = temp_sprite;
	
	// > 滤镜板初始化
	cB.inited = true;
	cB.type_cur = cB.init_type;
	cB.type_tar = cB.init_type;
	cB.mode = cB.init_mode;
	cB.o_cur = cB.init_opacity;
	cB.o_tar = cB.init_opacity;
	cB.o_range = cB.init_range;
	cB.o_period = cB.init_period;
	cB['lockData']['linear'].type_tar = cB.type_tar;
	cB['lockData']['linear'].o_tar = cB.o_tar;
	cB['lockData']['wave'].o_range = cB.o_range;
	cB['lockData']['wave'].o_period = cB.o_period;
	temp_sprite.opacity = cB.o_cur;
	this.drill_COF_setColorBoardType(cB.type_cur);
}
//==============================
// ** 着色 - 帧刷新 - 框架同步
//==============================
Sprite.prototype.drill_COF_updateColorBoardFrame = function() {
	var cB = this._drill_COF.colorBoard;
	if( cB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.colorBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 中心同步
	if( this.anchor.x !== temp_sprite.anchor.x ){ temp_sprite.anchor.x = this.anchor.x; }
	if( this.anchor.y !== temp_sprite.anchor.y ){ temp_sprite.anchor.y = this.anchor.y; }
	
	// > 滤镜板 - 图片资源同步
	if( this.bitmap && this.bitmap.isReady() ){
		if( temp_sprite._drill_url!= this.bitmap.url){	//（bitmap图片同步）
			temp_sprite.bitmap = this.bitmap;
			temp_sprite._drill_url = this.bitmap.url;
		}
		if( this.bitmap._drill_COF_isDirty == true ){	//（bitmap绘画变动，则滤镜板的bitmap也刷新）
			this.bitmap._drill_COF_isDirty = false;
			temp_sprite.bitmap = null;
			temp_sprite.bitmap = this.bitmap;
		}
	}else{
		temp_sprite.bitmap = null;				//（bitmap为空，滤镜板置空）
		temp_sprite._drill_url = "_null_";		//（置空后，bitmap需要强制赋值一下）
	}
	
	// > 滤镜板 - 框架同步
	if( cB.need_setFrame == true ){
		cB.need_setFrame = false;
		temp_sprite.setFrame( this._frame.x, this._frame.y, this._frame.width, this._frame.height );
	}
}
//==============================
// ** 着色 - 帧刷新 - 滤镜板变化
//==============================
Sprite.prototype.drill_COF_updateColorBoardTransfer = function() {
	var cB = this._drill_COF.colorBoard;
	if( cB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.colorBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 线性变化
	if( cB.mode == "linear" ){
		cB.move += 1;
		if( cB.move <= cB.time ){
			if( Math.abs(cB.o_cur - cB.o_tar) <= Math.abs(cB.o_speed) ){
				cB.o_cur = cB.o_tar;
			}else{
				cB.o_cur += cB.o_speed;
			}
			temp_sprite.opacity = cB.o_cur;
		}
		if( cB.type_cur != cB.type_tar ){
			cB.type_cur = cB.type_tar;
			this.drill_COF_setColorBoardType(cB.type_cur);
		}
	}
	
	// > 滤镜板 - 波动变化
	if(cB.mode == "wave" && cB.o_range != 0 ){
		cB.move += 1;
		var p = cB.o_range ;
		var wave_value = p/2+p/2 * Math.sin( (360* cB.move / cB.o_period - 90 )/ 180 * Math.PI);
		temp_sprite.opacity = wave_value;
		if( cB.type_cur != cB.type_tar ){
			cB.type_cur = cB.type_tar;
			this.drill_COF_setColorBoardType( cB.type_cur );
		}
	}
}
//==============================
// ** 着色 - 类型
//==============================
Sprite.prototype.drill_COF_setColorBoardType = function( type ) {
	var temp_sprite = this._drill_COF_sTank.colorBoard;
	temp_sprite._colorFilter.reset();
	if( type == "黑白"){ temp_sprite._colorFilter.blackAndWhite(true); }
	if( type == "反色"){ temp_sprite._colorFilter.negative(true); }
	if( type == "古墨水画色"){ temp_sprite._colorFilter.sepia(true); }
	if( type == "鲜艳"){ temp_sprite._colorFilter.technicolor(true); }
	if( type == "宝丽来相机色"){ temp_sprite._colorFilter.polaroid(true); }
	if( type == "红绿蓝翻转"){ temp_sprite._colorFilter.toBGR(true); }
	if( type == "古铜色"){ temp_sprite._colorFilter.browni(true); }
	if( type == "致幻色"){ temp_sprite._colorFilter.lsd(true); }
	if( type == "漂白"){ temp_sprite._colorFilter.brightness(2,false); }
	if( type == "饱和度降低"){ temp_sprite._colorFilter.greyscale(4,false); }
	if( type == "夜色"){ temp_sprite._colorFilter.night(0.7,false); }
	if( type == "完全反色"){ 
        var matrix = [-1, 0, 0, 0, 255, 	//（完全黑白颠倒）
					  0, -1, 0, 0, 255, 
					  0, 0, -1, 0, 255, 
					  0, 0, 0, 1, 0];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
	if( type == "过量橘黄"){ 
        var matrix = [1.2, 0.4, 0,  0,  0, 
					  0.4, 0.2, 0,  0,  10, 
					  0,   0,   0,  0,  25, 
					  0,   0,   0,  1,  0 ];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
	if( type == "红色通道"){ 
        var matrix = [ 1, 0, 0, 0, 0, 
					   0, 0, 0, 0, 0, 
					   0, 0, 0, 0, 0, 
					   0, 0, 0, 1, 0];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
	if( type == "绿色通道"){ 
        var matrix = [ 0, 0, 0, 0, 0, 
					   0, 1, 0, 0, 0, 
					   0, 0, 0, 0, 0, 
					   0, 0, 0, 1, 0];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
	if( type == "蓝色通道"){ 
        var matrix = [ 0, 0, 0, 0, 0, 
					   0, 0, 0, 0, 0, 
					   0, 0, 1, 0, 0, 
					   0, 0, 0, 1, 0];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
	if( type == "红色通道反色"){ 
        var matrix = [-1, 0, 0, 0, 255, 
					   0, 0, 0, 0, 0, 
					   0, 0, 0, 0, 0, 
					   0, 0, 0, 1, 0];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
	if( type == "绿色通道反色"){ 
        var matrix = [ 0, 0, 0, 0, 0, 
					   0,-1, 0, 0, 255, 
					   0, 0, 0, 0, 0, 
					   0, 0, 0, 1, 0];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
	if( type == "蓝色通道反色"){ 
        var matrix = [ 0, 0, 0, 0, 0, 
					   0, 0, 0, 0, 0, 
					   0, 0,-1, 0, 255, 
					   0, 0, 0, 1, 0];
        temp_sprite._colorFilter._loadMatrix(matrix, true);
	}
}
//==============================
// ** 着色 - 线性模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setColorLinear("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setColorLinear_Init = function( type_,opacity_ ){
	if( this._drill_COF_inited != true ){ return; }
	var cB = this._drill_COF.colorBoard;
	cB.init_mode = "linear";
	cB.init_type = String(type_);
	cB.init_opacity = Number(opacity_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear_Init","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear_Init","opacity_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setColorLinear = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var cB = this._drill_COF.colorBoard;
	if( cB.inited == false && opacity_ == 0 && time_ == 0){ return }
	cB.type_tar = String(type_);
	cB.time = Math.max( Number(time_),1);
	cB.move = 0;
	cB.o_tar = Number(opacity_);
	cB.o_speed = (cB.o_tar - cB.o_cur)/cB.time;
	cB.mode = "linear";
	cB.opened = true;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear","time_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setColorLinear_ONCE = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_l = this._drill_COF.colorBoard['lockData']['linear'];
	if( lockData_l.type_tar == type_ && lockData_l.o_tar == opacity_ ){ return; }
	lockData_l.type_tar = type_;
	lockData_l.o_tar = opacity_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear_ONCE","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear_ONCE","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorLinear_ONCE","time_" ); }
	this.drill_COF_setColorLinear( String(type_),Number(opacity_),Number(time_) );
};
//==============================
// ** 着色 - 波动模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setColorWave("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setColorWave_Init = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var cB = this._drill_COF.colorBoard;
	cB.init_mode = "wave";
	cB.init_type = String(type_);
	cB.init_range = Number(range_);
	cB.init_period = Number(period_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave_Init","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave_Init","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave_Init","period_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setColorWave = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var cB = this._drill_COF.colorBoard;
	if( cB.inited == false && range_ == 0 && period_ == 0){ return; }
	cB.type_tar = String(type_);
	cB.move = 0;
	cB.o_range = Number(range_);
	cB.o_period = Number(period_);
	cB.mode = "wave";
	cB.opened = true;
	if( cB.o_range == 0 && this._drill_COF_sTank.colorBoard ){
		this._drill_COF_sTank.colorBoard.opacity = 0;
	}
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave","period_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setColorWave_ONCE = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_w = this._drill_COF.colorBoard['lockData']['wave'];
	if( lockData_w.o_range == range_ && lockData_w.o_period == period_ ){ return; }
	lockData_w.o_range = range_;
	lockData_w.o_period = period_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave_ONCE","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave_ONCE","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setColorWave_ONCE","period_" ); }
	this.drill_COF_setColorWave( String(type_),Number(range_),Number(period_) );
};


//=============================================================================
// ** 填充滤镜
//=============================================================================
//==============================
// ** 填充 - 帧刷新 - 延迟初始化
//==============================
Sprite.prototype.drill_COF_updateFillBoardInit = function() {
	var fB = this._drill_COF.fillBoard;
	if( fB.opened == false ){ return }		//滤镜开关锁（开关调用了就一直为true）
	if( fB.inited != false ){ return }		//初始化锁（初始化后一直为true）
	
	// > 建立滤镜板
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = this.anchor.x;
	temp_sprite.anchor.y = this.anchor.y;
	temp_sprite.blendMode = 0;
	temp_sprite.bitmap = this.bitmap;
	temp_sprite._drill_url = this.bitmap ? this.bitmap.url : "_null_";	//（空字符串也需要资源同步）
	this.addChild(temp_sprite); 
	this._drill_COF_sTank.fillBoard = temp_sprite;
	
	// > 滤镜板初始化
	fB.inited = true;
	fB.type_cur = fB.init_type;
	fB.type_tar = fB.init_type;
	fB.mode = fB.init_mode;
	fB.o_cur = fB.init_opacity;
	fB.o_tar = fB.init_opacity;
	fB.o_range = fB.init_range;
	fB.o_period = fB.init_period;
	fB['lockData']['linear'].type_tar = fB.type_tar;
	fB['lockData']['linear'].o_tar = fB.o_tar;
	fB['lockData']['wave'].o_range = fB.o_range;
	fB['lockData']['wave'].o_period = fB.o_period;
	temp_sprite.opacity = fB.o_cur;
	this.drill_COF_setFillBoardType( fB.type_cur );
}
//==============================
// ** 填充 - 帧刷新 - 框架同步
//==============================
Sprite.prototype.drill_COF_updateFillBoardFrame = function() {
	var fB = this._drill_COF.fillBoard;
	if( fB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.fillBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 中心同步
	if( this.anchor.x !== temp_sprite.anchor.x ){ temp_sprite.anchor.x = this.anchor.x; }
	if( this.anchor.y !== temp_sprite.anchor.y ){ temp_sprite.anchor.y = this.anchor.y; }
	
	// > 滤镜板 - 资源图片同步
	if( this.bitmap && this.bitmap.isReady() ){
		if( temp_sprite._drill_url!= this.bitmap.url){	//（bitmap图片同步）
			temp_sprite.bitmap = this.bitmap;
			temp_sprite._drill_url = this.bitmap.url;
		}
		if( this.bitmap._drill_COF_isDirty == true ){	//（bitmap绘画变动，则滤镜板的bitmap也刷新）
			this.bitmap._drill_COF_isDirty = false;
			temp_sprite.bitmap = null;
			temp_sprite.bitmap = this.bitmap;
		}
	}else{
		temp_sprite.bitmap = null;				//（bitmap为空，滤镜板置空）
		temp_sprite._drill_url = "_null_";		//（置空后，bitmap需要强制赋值一下）
	}
	
	// > 滤镜板 - 框架同步
	if( fB.need_setFrame == true ){
		fB.need_setFrame = false;
		temp_sprite.setFrame( this._frame.x, this._frame.y, this._frame.width, this._frame.height );
	}
}
//==============================
// ** 填充 - 帧刷新 - 滤镜板变化
//==============================
Sprite.prototype.drill_COF_updateFillBoardTransfer = function() {
	var fB = this._drill_COF.fillBoard;
	if( fB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.fillBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 线性变化
	if( fB.mode == "linear"){
		fB.move += 1;
		if( fB.move <= fB.time ){
			if( Math.abs(fB.o_cur - fB.o_tar) <= Math.abs(fB.o_speed) ){
				fB.o_cur = fB.o_tar;
			}else{
				fB.o_cur += fB.o_speed;
			}
			temp_sprite.opacity = fB.o_cur;
		}
		if( fB.type_cur != fB.type_tar ){
			fB.type_cur = fB.type_tar;
			this.drill_COF_setFillBoardType( fB.type_cur );
		}
	}
	// > 滤镜板 - 波动变化
	if( fB.mode == "wave" && fB.o_range != 0 ){
		fB.move += 1;
		var p = fB.o_range ;
		var wave_value = p/2+p/2 * Math.sin( (360* fB.move / fB.o_period - 90 )/ 180 * Math.PI);
		temp_sprite.opacity = wave_value;
		if( fB.type_cur != fB.type_tar ){
			fB.type_cur =  fB.type_tar;
			this.drill_COF_setFillBoardType( fB.type_cur );
		}
	}
}
//==============================
// ** 填充 - 类型
//==============================
Sprite.prototype.drill_COF_setFillBoardType = function( type ) {
	var temp_sprite = this._drill_COF_sTank.fillBoard;
	if( type == "纯黑" || type == "黑色" ){ temp_sprite.setBlendColor([0, 0, 0, 255]); }
	if( type == "纯蓝" || type == "蓝色" ){ temp_sprite.setBlendColor([0, 0, 255, 255]); }
	if( type == "纯绿" || type == "绿色" ){ temp_sprite.setBlendColor([0, 255, 0, 255]); }
	if( type == "纯红" || type == "红色" ){ temp_sprite.setBlendColor([255, 0, 0, 255]); }
	if( type == "纯青" || type == "青色" ){ temp_sprite.setBlendColor([0, 255, 255, 255]); }
	if( type == "纯紫" || type == "紫色" ){ temp_sprite.setBlendColor([255, 0, 255, 255]); }
	if( type == "纯黄" || type == "黄色" ){ temp_sprite.setBlendColor([255, 255, 0, 255]); }
	if( type == "纯白" || type == "白色" ){ temp_sprite.setBlendColor([255, 255, 255, 255]); }
	if( (/^#/g).test(type) ){
		var str_r = type.slice(1,3);
		var str_g = type.slice(3,5);
		var str_b = type.slice(5,7);
		temp_sprite.setBlendColor([ parseInt(str_r,16), parseInt(str_g,16), parseInt(str_b,16), 255]);
	}
}
//==============================
// ** 填充 - 线性模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setFillLinear("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setFillLinear_Init = function( type_,opacity_ ){
	if( this._drill_COF_inited != true ){ return; }
	var fB = this._drill_COF.fillBoard;
	fB.init_mode = "linear";
	fB.init_type = String(type_);
	fB.init_opacity = Number(opacity_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear_Init","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear_Init","opacity_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setFillLinear = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var fB = this._drill_COF.fillBoard;
	if( fB.inited == false && opacity_ == 0 && time_ == 0){ return }
	fB.type_tar = String(type_);
	fB.time = Math.max( Number(time_) ,1);
	fB.move = 0;
	fB.o_tar = Number(opacity_);
	fB.o_speed = (fB.o_tar - fB.o_cur)/fB.time;
	fB.mode = "linear";
	fB.opened = true;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear","time_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setFillLinear_ONCE = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_l = this._drill_COF.fillBoard['lockData']['linear'];
	if( lockData_l.type_tar == type_ && lockData_l.o_tar == opacity_ ){ return; }
	lockData_l.type_tar = type_;
	lockData_l.o_tar = opacity_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear_ONCE","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear_ONCE","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillLinear_ONCE","time_" ); }
	this.drill_COF_setFillLinear( String(type_),Number(opacity_),Number(time_) );
};

//==============================
// ** 填充 - 波动模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setFillWave("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setFillWave_Init = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var fB = this._drill_COF.fillBoard;
	fB.init_mode = "wave";
	fB.init_type = String(type_);
	fB.init_range = Number(range_);
	fB.init_period = Number(period_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave_Init","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave_Init","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave_Init","period_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setFillWave = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var fB = this._drill_COF.fillBoard;
	if( fB.inited == false && range_ == 0 && period_ == 0){ return }
	fB.type_tar = String(type_);
	fB.move = 0;
	fB.o_range = Number(range_);
	fB.o_period = Number(period_);
	fB.mode = "wave";
	fB.opened = true;
	if( fB.o_range == 0 && this._drill_COF_sTank.fillBoard ){
		this._drill_COF_sTank.fillBoard.opacity = 0;
	}
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave","period_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setFillWave_ONCE = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_w = this._drill_COF.fillBoard['lockData']['wave'];
	if( lockData_w.o_range == range_ && lockData_w.o_period == period_ ){ return; }
	lockData_w.o_range = range_;
	lockData_w.o_period = period_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave_ONCE","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave_ONCE","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setFillWave_ONCE","period_" ); }
	this.drill_COF_setFillWave( String(type_),Number(range_),Number(period_) );
};

//=============================================================================
// ** 彩虹滤镜
//=============================================================================
//==============================
// ** 彩虹 - 帧刷新 - 延迟初始化
//==============================
Sprite.prototype.drill_COF_initRainbowBoardInit = function() {
	var rB = this._drill_COF.rainbowBoard;
	if( rB.opened == false ){ return }		//滤镜开关锁（开关调用了就一直为true）
	if( rB.inited != false ){ return }		//初始化锁（初始化后一直为true）
	
	// > 建立滤镜板
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = this.anchor.x;
	temp_sprite.anchor.y = this.anchor.y;
	temp_sprite.blendMode = 0;
	temp_sprite.bitmap = new Bitmap(100,100);
	temp_sprite.bitmap.gradientFillRect(0,0,100,100, 0, 4, true);
	temp_sprite._drill_url = this.bitmap ? this.bitmap.url : "_null_";	//（空字符串也需要资源同步）
	this.addChild(temp_sprite); 
	this._drill_COF_sTank.rainbowBoard = temp_sprite;
	
	var temp_mask = new Sprite();
	temp_mask.bitmap = this.bitmap;
	temp_mask.setBlendColor([255, 255, 255, 255]);
	temp_sprite._drill_mask = temp_mask;
	temp_sprite.addChild(temp_mask); 
	temp_sprite.mask = temp_mask;
	
	// > 滤镜板初始化
	rB.inited = true;
	rB.type_cur = rB.init_type;
	rB.type_tar = rB.init_type;
	rB.mode = rB.init_mode;
	rB.o_cur = rB.init_opacity;
	rB.o_tar = rB.init_opacity;
	rB.o_range = rB.init_range;
	rB.o_period = rB.init_period;
	rB['lockData']['linear'].type_tar = rB.type_tar;
	rB['lockData']['linear'].o_tar = rB.o_tar;
	rB['lockData']['wave'].o_range = rB.o_range;
	rB['lockData']['wave'].o_period = rB.o_period;
	temp_sprite.opacity = rB.o_cur;
	this.drill_COF_setRainbowBoardType( rB.type_cur );
}
//==============================
// ** 彩虹 - 帧刷新 - 框架同步
//==============================
Sprite.prototype.drill_COF_updateRainbowBoardFrame = function() {
	var rB = this._drill_COF.rainbowBoard;
	if( rB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.rainbowBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 中心同步
	if( this.anchor.x !== temp_sprite.anchor.x ){ temp_sprite.anchor.x = this.anchor.x; }
	if( this.anchor.y !== temp_sprite.anchor.y ){ temp_sprite.anchor.y = this.anchor.y; }
	
	// > 滤镜板 - 资源图片同步
	if( this.bitmap && this.bitmap.isReady() ){
		var temp_mask = temp_sprite._drill_mask;
		if( temp_sprite._drill_url!= this.bitmap.url){	//（bitmap图片同步）
			temp_mask.bitmap = this.bitmap;
			temp_sprite._drill_url = this.bitmap.url;
		}
		if( this.bitmap._drill_COF_isDirty == true ){	//（bitmap绘画变动，则滤镜板的bitmap也刷新）
			this.bitmap._drill_COF_isDirty = false;
			temp_mask.bitmap = null;
			temp_mask.bitmap = this.bitmap;
		}
	}else{
		temp_sprite.bitmap = null;				//（bitmap为空，滤镜板置空）
		temp_sprite._drill_url = "_null_";		//（置空后，bitmap需要强制赋值一下）
	}
	
	// > 滤镜板 - 框架同步
	if( rB.need_setFrame == true ){
		rB.need_setFrame = false;
		temp_sprite.setFrame( this._frame.x, this._frame.y, this._frame.width, this._frame.height );
	}
}
//==============================
// ** 彩虹 - 帧刷新 - 滤镜板变化
//==============================
Sprite.prototype.drill_COF_updateRainbowBoardTransfer = function() {
	var rB = this._drill_COF.rainbowBoard;
	if( rB.opened == false ){ return }
	var temp_sprite = this._drill_COF_sTank.rainbowBoard;
	if( temp_sprite == undefined ){ return; };
	
	// > 滤镜板 - 线性变化
	if( rB.mode == "linear" ){
		rB.move += 1;
		if( rB.move <= rB.time ){
			if( Math.abs(rB.o_cur - rB.o_tar) <= Math.abs(rB.o_speed) ){
				rB.o_cur = rB.o_tar;
			}else{
				rB.o_cur += rB.o_speed;
			}
			temp_sprite.opacity = rB.o_cur;
		}
		if( rB.type_cur != rB.type_tar ){
			rB.type_cur = rB.type_tar;
			this.drill_COF_setRainbowBoardType( rB.type_cur );
		}
	}
	// > 滤镜板 - 波动变化
	if( rB.mode == "wave" && rB.o_range != 0 ){
		rB.move += 1;
		var p = rB.o_range ;
		var wave_value = p/2+p/2 * Math.sin( (360* rB.move / rB.o_period - 90 )/ 180 * Math.PI);
		temp_sprite.opacity = wave_value;
		if( rB.type_cur != rB.type_tar ){
			rB.type_cur =  rB.type_tar;
			this.drill_COF_setRainbowBoardType( rB.type_cur );
		}
	}
}
//==============================
// ** 彩虹 - 类型
//==============================
Sprite.prototype.drill_COF_setRainbowBoardType = function( type ) {
	var temp_sprite = this._drill_COF_sTank.rainbowBoard;
	if( type == "纯黑"){ temp_sprite.setBlendColor([0, 0, 0, 255]); }
	if( type == "纯蓝"){ temp_sprite.setBlendColor([0, 0, 255, 255]); }
	if( type == "纯绿"){ temp_sprite.setBlendColor([0, 255, 0, 255]); }
	if( type == "纯红"){ temp_sprite.setBlendColor([255, 0, 0, 255]); }
	if( type == "青色"){ temp_sprite.setBlendColor([0, 255, 255, 255]); }
	if( type == "紫色"){ temp_sprite.setBlendColor([255, 0, 255, 255]); }
	if( type == "黄色"){ temp_sprite.setBlendColor([255, 255, 0, 255]); }
	if( type == "纯白"){ temp_sprite.setBlendColor([255, 255, 255, 255]); }
	if( (/^#/g).test(type) ){
		var str_r = type.slice(1,3);
		var str_g = type.slice(3,5);
		var str_b = type.slice(5,7);
		temp_sprite.setBlendColor([ parseInt(str_r,16), parseInt(str_g,16), parseInt(str_b,16), 255]);
	}
}
//==============================
// ** 彩虹 - 线性模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setRainbowLinear("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setRainbowLinear_Init = function( type_,opacity_ ){
	if( this._drill_COF_inited != true ){ return; }
	var rB = this._drill_COF.rainbowBoard;
	rB.init_mode = "linear";
	rB.init_type = String(type_);
	rB.init_opacity = Number(opacity_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear_Init","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear_Init","opacity_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setRainbowLinear = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var rB = this._drill_COF.rainbowBoard;
	if( rB.inited == false && opacity_ == 0 && time_ == 0){ return }
	rB.type_tar = String(type_);
	rB.time = Math.max( Number(time_) ,1);
	rB.move = 0;
	rB.o_tar = Number(opacity_);
	rB.o_speed = (rB.o_tar - rB.o_cur)/rB.time;
	rB.mode = "linear";
	rB.opened = true;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear","time_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setRainbowLinear_ONCE = function( type_,opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_l = this._drill_COF.rainbowBoard['lockData']['linear'];
	if( lockData_l.type_tar == type_ && lockData_l.o_tar == opacity_ ){ return; }
	lockData_l.type_tar = type_;
	lockData_l.o_tar = opacity_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear_ONCE","type_" ); }
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear_ONCE","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowLinear_ONCE","time_" ); }
	this.drill_COF_setRainbowLinear( String(type_),Number(opacity_),Number(time_) );
};

//==============================
// ** 彩虹 - 波动模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setRainbowWave("类型", 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setRainbowWave_Init = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var rB = this._drill_COF.rainbowBoard;
	rB.init_mode = "wave";
	rB.init_type = String(type_);
	rB.init_range = Number(range_);
	rB.init_period = Number(period_);
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave_Init","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave_Init","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave_Init","period_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setRainbowWave = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var rB = this._drill_COF.rainbowBoard;
	if( rB.inited == false && range_ == 0 && period_ == 0){ return }
	rB.type_tar = String(type_);
	rB.move = 0;
	rB.o_range = Number(range_);
	rB.o_period = Number(period_);
	rB.mode = "wave";
	rB.opened = true;
	if( rB.o_range == 0 && this._drill_COF_sTank.rainbowBoard ){
		this._drill_COF_sTank.rainbowBoard.opacity = 0;
	}
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave","period_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setRainbowWave_ONCE = function( type_,range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_w = this._drill_COF.rainbowBoard['lockData']['wave'];
	if( lockData_w.o_range == range_ && lockData_w.o_period == period_ ){ return; }
	lockData_w.o_range = range_;
	lockData_w.o_period = period_;
	if( typeof(type_) != "string" ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave_ONCE","type_" ); }
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave_ONCE","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setRainbowWave_ONCE","period_" ); }
	this.drill_COF_setRainbowWave( String(type_),Number(range_),Number(period_) );
};


//=============================================================================
// ** 模糊滤镜
//=============================================================================
//==============================
// ** 模糊 - 帧刷新 - 延迟初始化
//==============================
Sprite.prototype.drill_COF_updateBlurFilterInit = function() {
	var bF = this._drill_COF.blurFilter;
	if( bF.opened == false ){ return }		//滤镜开关锁（开关调用了就一直为true）
	if( bF.inited != false ){ return }		//初始化锁（初始化后一直为true）
	
	// > 建立滤镜
	this._drill_COF_sTank.blurFilter = new PIXI.filters.BlurFilter();
	if( this.filters == null){		//滤镜并不像数组一样可以直接push，需要个中介
		var f_intermediary = [];
	}else{
		var f_intermediary = this.filters;
	}
	f_intermediary.push(this._drill_COF_sTank.blurFilter);
	this.filters = f_intermediary;
	
	// > 滤镜初始化
	bF.inited = true;
	bF.mode = bF.init_mode;
	bF.o_cur = bF.init_opacity;
	bF.o_tar = bF.init_opacity;
	bF.o_range = bF.init_range;
	bF.o_period = bF.init_period;
	bF['lockData']['linear'].o_tar = bF.o_tar;
	bF['lockData']['wave'].o_range = bF.o_range;
	bF['lockData']['wave'].o_period = bF.o_period;
	this._drill_COF_sTank.blurFilter.blur = bF.o_cur / 255 * 8;
	this._drill_COF_sTank.blurFilter.quality = 1 + bF.o_cur / 255;
}
//==============================
// ** 模糊 - 帧刷新 - 滤镜板变化
//==============================
Sprite.prototype.drill_COF_updateBlurFilterTransfer = function() {
	var bF = this._drill_COF.blurFilter;
	if( bF.opened == false ){ return }
	var temp_filter = this._drill_COF_sTank.blurFilter;
	if( temp_filter == undefined ){ return; }
	
	// > 滤镜 - 线性变化
	if( bF.mode == "linear"){
		bF.move += 1;
		if( bF.move <= bF.time ){
			if( Math.abs(bF.o_cur - bF.o_tar) <= Math.abs(bF.o_speed) ){
				bF.o_cur = bF.o_tar;
			}else{
				bF.o_cur += bF.o_speed;
			}
			temp_filter.blur = bF.o_cur / 255 * 8;
			temp_filter.quality = 1 + bF.o_cur/255 /2;	//模糊质量调控 1~1.5之间（节约性能）
		}
	}
	
	// > 滤镜 - 波动变化
	if( bF.mode == "wave" && bF.o_range != 0 ){
		bF.move += 1;
		var p = bF.o_range / 255 * 8;
		var wave_value = p/2+p/2 * Math.sin( (360* bF.move / bF.o_period - 90 )/ 180 * Math.PI);
		temp_filter.blur = wave_value;
		temp_filter.quality = 1 + wave_value/8 /2;		//模糊质量调控 1~1.5之间（节约性能）
	}
}
//==============================
// ** 模糊 - 线性模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setBlurLinear( 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setBlurLinear_Init = function(opacity_) {
	if( this._drill_COF_inited != true ){ return; }
	var bF = this._drill_COF.blurFilter;
	bF.init_mode = "linear";
	bF.init_opacity = Number(opacity_);
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurLinear_Init","opacity_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setBlurLinear = function(opacity_,time_) {
	if( this._drill_COF_inited != true ){ return; }
	var bF = this._drill_COF.blurFilter;
	if( bF.inited == false && opacity_ == 0 && time_ == 0){ return }
	bF.time = Math.max( Number(time_),1);
	bF.move = 0;
	bF.o_tar = Number(opacity_);
	bF.o_speed = (bF.o_tar - bF.o_cur)/bF.time;
	bF.mode = "linear";
	bF.opened = true;
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurLinear","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurLinear","time_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setBlurLinear_ONCE = function(opacity_,time_) {
	if( this._drill_COF_inited != true ){ return; }
	var lockData_l = this._drill_COF.blurFilter['lockData']['linear'];
	if( lockData_l.o_tar == opacity_ ){ return; }
	lockData_l.o_tar = opacity_;
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurLinear_ONCE","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurLinear_ONCE","time_" ); }
	this.drill_COF_setBlurLinear( Number(opacity_),Number(time_) );
};
//==============================
// ** 模糊 - 波动模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setBlurWave( 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setBlurWave_Init = function(range_,period_) {
	if( this._drill_COF_inited != true ){ return; }
	var bF = this._drill_COF.blurFilter;
	bF.init_mode = "wave";
	bF.init_range = Number(range_);
	bF.init_period = Number(period_);
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurWave_Init","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurWave_Init","period_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setBlurWave = function( range_,period_) {
	if( this._drill_COF_inited != true ){ return; }
	var bF = this._drill_COF.blurFilter;
	if( bF.inited == false && range_ == 0 && period_ == 0){ return; }
	bF.move = 0;
	bF.o_range = Number(range_);
	bF.o_period = Number(period_);
	bF.mode = "wave";
	bF.opened = true;
	if( bF.o_range == 0 && this._drill_COF_sTank.blurFilter ){
		this._drill_COF_sTank.blurFilter.blur = 0;
	}
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurWave","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurWave","period_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setBlurWave_ONCE = function( range_,period_) {
	if( this._drill_COF_inited != true ){ return; }
	var lockData_w = this._drill_COF.blurFilter['lockData']['wave'];
	if( lockData_w.o_range == range_ && lockData_w.o_period == period_ ){ return; }
	lockData_w.o_range = range_;
	lockData_w.o_period = period_;
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurWave_ONCE","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setBlurWave_ONCE","period_" ); }
	this.drill_COF_setBlurWave( Number(range_),Number(period_) );
};


//=============================================================================
// ** 噪点滤镜
//=============================================================================
//==============================
// ** 噪点 - 帧刷新 - 延迟初始化
//==============================
Sprite.prototype.drill_COF_updateNoiseFilterInit = function() {
	var nF = this._drill_COF.noiseFilter;
	if( nF.opened == false ){ return }		//滤镜开关锁（开关调用了就一直为true）
	if( nF.inited != false ){ return }		//初始化锁（初始化后一直为true）
	
	// > 建立滤镜
	this._drill_COF_sTank.noiseFilter = new PIXI.filters.NoiseFilter();
	if( this.filters == null){		//滤镜并不像数组一样可以直接push，需要个中介
		var f_intermediary = [];
	}else{
		var f_intermediary = this.filters;
	}
	f_intermediary.push(this._drill_COF_sTank.noiseFilter);
	this.filters = f_intermediary;
	
	// > 滤镜初始化
	nF.inited = true;
	nF.mode = nF.init_mode;
	nF.o_cur = nF.init_opacity;
	nF.o_tar = nF.init_opacity;
	nF.o_range = nF.init_range;
	nF.o_period = nF.init_period;
	nF['lockData']['linear'].o_tar = nF.o_tar;
	nF['lockData']['wave'].o_range = nF.o_range;
	nF['lockData']['wave'].o_period = nF.o_period;
	this._drill_COF_sTank.noiseFilter.noise = nF.o_cur / 255 * 4;
	this._drill_COF_sTank.noiseFilter.seed = Math.random();
}
//==============================
// ** 噪点 - 帧刷新 - 滤镜板变化
//==============================
Sprite.prototype.drill_COF_updateNoiseFilterTransfer = function() {
	var nF = this._drill_COF.noiseFilter;
	if( nF.opened == false ){ return }
	var temp_filter = this._drill_COF_sTank.noiseFilter;
	if( temp_filter == undefined ){ return; }
	
	// > 滤镜 - 线性变化
	if( nF.mode == "linear" ){
		nF.move += 1;
		if( nF.move <= nF.time ){
			if( Math.abs(nF.o_cur - nF.o_tar) <= Math.abs(nF.o_speed) ){
				nF.o_cur = nF.o_tar;
			}else{
				nF.o_cur += nF.o_speed;
			}
			temp_filter.noise = nF.o_cur / 255 * 4;
		}
		if( nF.o_cur > 0 ){
			temp_filter.seed = Math.random();
		}
	}
	// > 滤镜 - 波动变化
	if( nF.mode == "wave" && nF.o_range != 0 ){
		nF.move += 1;
		var p = nF.o_range / 255 * 4;
		var wave_value = p/2+p/2 * Math.sin( (360* nF.move / nF.o_period - 90 )/ 180 * Math.PI);
		temp_filter.noise = wave_value;
		if( nF.o_range > 0 ){
			temp_filter.seed = Math.random();
		}
	}
}
//==============================
// ** 噪点 - 线性模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setNoiseLinear( 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setNoiseLinear_Init = function( opacity_ ){
	if( this._drill_COF_inited != true ){ return; }
	var nF = this._drill_COF.noiseFilter;
	nF.init_mode = "linear";
	nF.init_opacity = Number(opacity_);
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseLinear_Init","opacity_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setNoiseLinear = function( opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var nF = this._drill_COF.noiseFilter;
	if( nF.inited == false && opacity_ == 0 && time_ == 0){ return }
	nF.time = Math.max( Number(time_),1 );
	nF.move = 0;
	nF.o_tar = Number(opacity_);
	nF.o_speed = (nF.o_tar - nF.o_cur)/nF.time;
	nF.mode = "linear";
	nF.opened = true;
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseLinear","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseLinear","time_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setNoiseLinear_ONCE = function( opacity_,time_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_l = this._drill_COF.noiseFilter['lockData']['linear'];
	if( lockData_l.o_tar == opacity_ ){ return; }
	lockData_l.o_tar = opacity_;
	if( typeof(opacity_) != "number" || isNaN(opacity_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseLinear_ONCE","opacity_" ); }
	if( typeof(time_) != "number" || isNaN(time_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseLinear_ONCE","time_" ); }
	this.drill_COF_setNoiseLinear( Number(opacity_),Number(time_) );
};
//==============================
// ** 噪点 - 波动模式（接口）
//
//			说明：	如果要关闭滤镜，设置： sprite.drill_COF_setNoiseWave( 0, 1 );
//					滤镜打开后，无法手动消除，除非重建 父贴图 。
//==============================
/* ------------初始------------- */
Sprite.prototype.drill_COF_setNoiseWave_Init = function( range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var nF = this._drill_COF.noiseFilter;
	nF.init_mode = "wave";
	nF.init_range = Number(range_);
	nF.init_period = Number(period_);
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseWave_Init","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseWave_Init","period_" ); }
};
/* ------------渐变------------- */
Sprite.prototype.drill_COF_setNoiseWave = function( range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var nF = this._drill_COF.noiseFilter;
	if( nF.inited == false && range_ == 0 && period_ == 0){ return }
	nF.move = 0;
	nF.o_range = Number(range_);
	nF.o_period = Number(period_);
	nF.mode = "wave";
	nF.opened = true;
	if( nF.o_range == 0 && this._drill_COF_sTank.noiseFilter ){
		this._drill_COF_sTank.noiseFilter.noise = 0;
	}
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseWave","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseWave","period_" ); }
};
/* ------------渐变（帧刷新）------------- */
Sprite.prototype.drill_COF_setNoiseWave_ONCE = function( range_,period_ ){
	if( this._drill_COF_inited != true ){ return; }
	var lockData_w = this._drill_COF.noiseFilter['lockData']['wave'];
	if( lockData_w.o_range == range_ && lockData_w.o_period == period_ ){ return; }
	lockData_w.o_range = range_;
	lockData_w.o_period = period_;
	if( typeof(range_) != "number" || isNaN(range_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseWave_ONCE","range_" ); }
	if( typeof(period_) != "number" || isNaN(period_) ){ DrillUp.g_drill_COF_DebugLog( "drill_COF_setNoiseWave_ONCE","period_" ); }
	this.drill_COF_setNoiseWave( Number(range_),Number(period_) );
};

//=============================================================================
// ** 函数错误检查机制
//=============================================================================
DrillUp.g_drill_COF_DebugLog = function( method_name, param_name ) {
	console.log("【滤镜核心】警告："+ method_name +"中的"+ param_name + "参数有误。");
}



