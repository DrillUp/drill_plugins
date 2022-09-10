//=============================================================================
// Drill_CoreOfDynamicMask.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 动态遮罩核心
 * @author Drill_up，赤瞳大白猫
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_CoreOfDynamicMask +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够实现动态的遮罩变化。该动态遮罩与ps中的蒙版功能相似。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 插件基于弹道核心，可以作用于所有需要用到动态遮罩的子插件。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v1.8及以上★★
 * 可作用于：
 *   - Drill_LayerDynamicMaskA      地图-地图动态遮罩板A
 *   - Drill_PictureDynamicMaskA    图片-图片动态遮罩板A
 *   - Drill_EventDynamicMaskA      行走图-行走图动态遮罩板A
 *   - Drill_DialogSkinBackground   对话框-对话框背景
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于所有贴图。
 * 2.建议先了解 "0.基本定义 > 显示与透明度.docx"。
 *   详细内容可以去看看 "1.系统 > 大家族-动态遮罩.docx"。
 * 动态遮罩板：
 *   (1.该插件将为各个子插件提供 动态遮罩板 的基础功能，
 *      包括 透视镜物体 和 透视镜贴图 的定义。
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
 * 时间复杂度： o(n)*o(贴图处理)*o(遮罩渲染) 每帧
 * 测试方法：   在遮罩管理层进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【66.21ms】
 *              100个事件的地图中，平均消耗为：【57.79ms】
 *               50个事件的地图中，平均消耗为：【40.24ms】
 *               20个事件的地图中，平均消耗为：【25.55ms】
 * 测试方法2：  在各个界面中进行性能测试。
 * 测试结果2：  战斗界面中，平均消耗为：【39.49ms】
 *              菜单界面中，平均消耗为：【23.10ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只执行渲染器的功能，并不含 动态遮罩板和透视镜 的操作。
 *   相关消耗在其子插件中有 性能消耗 的体现。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 大幅度改进了内部结构，以及完成 透视镜物体和透视镜贴图 的数据结构。
 * [v1.2]
 * 添加了透视镜容器的部分接口。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		CODM（Core_Of_Dynamic_Mask）
//		临时全局变量	DrillUp.g_CODM_xxx
//		临时局部变量	this._drill_CODM_xxx
//		存储数据变量	$gameSystem._drill_CODM_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(遮罩渲染) 每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	25.55ms（Drill_CODM_MaskStage.prototype.update）
//						40.24ms（Drill_CODM_MaskStage.prototype.update）
//						57.79ms（Drill_CODM_MaskStage.prototype.update 测试中 TilingSprite的update 也算进去了，目前不明原因）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			动态遮罩核心：
//				->动态遮罩
//					->渲染器（Renderer）
//					->容器（MaskStage）
//						->手动帧刷新（update）
//					->贴图（容器的实例）
//				->透视镜
//					->物体（Marker） - 贴图（Sprite）
//					->物体容器（MarkerContainer） - 贴图容器（子插件实现）
//						->物体添加/删除（drill_CODM_addOne） - 贴图添加/删除（子插件实现）
//		
//		★私有类如下：
//			* Drill_CODM_Renderer【遮罩渲染器】
//			* Drill_CODM_MaskStage【动态遮罩容器】
//			* Drill_CODM_MaskSprite【动态遮罩贴图】
//			* Drill_CODM_PerspectiveMarker【透视镜物体】
//			* Drill_CODM_PerspectiveSprite【透视镜贴图】
//			* Drill_CODM_PerspectiveMarkerContainer【透视镜物体容器】
//
//		★必要注意事项：
//			1.动态遮罩容器使用了 PIXI.RenderTexture 作为底层。
//
//		★其它说明细节：
//			1.
//				
//		★存在的问题：
//			1. 2021-10-30 使用新写的 遮罩渲染器【Drill_CODM_Renderer】进行 render渲染，没有任何效果。
//			  而使用 Graphics._renderer进行 render，就有效。
//			（pixi的底层render反复看了很多次，调用函数也换了很多种写法，但是自写的均无效。）
//			（唯一找到两者的区别就是 Graphics._renderer 进行过 stage场景渲染； 而遮罩渲染器没有，是直接去进行 renderTexture 渲染。）
//			（此问题搁置，因为继续探讨没有意义了，只要加了动态遮罩就一定费性能，换自写的并不能优化性能）
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfDynamicMask = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfDynamicMask');


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	

//=============================================================================
// ** 遮罩渲染器【Drill_CODM_Renderer】（未被使用）
//			
//			说明：	> 该类为静态类，单独定义一个渲染器结构。
//					> 该渲染器与 主游戏界面 完全并行渲染场景。
//=============================================================================
//==============================
// * 渲染器 - 定义
//==============================
function Drill_CODM_Renderer() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 渲染器 - 初始化
//==============================
Drill_CODM_Renderer.initialize = function(){
	this.drill_CODM_createCanvas();			//创建 - 画布
	this.drill_CODM_createRenderer();		//创建 - 渲染器
};
//==============================
// * 渲染器 - 刷新（非帧）
//==============================
Drill_CODM_Renderer.update = function() {
	this.drill_CODM_updateCanvas();			//刷新 - 画布
	this.drill_CODM_updateRenderer();		//刷新 - 渲染器
}
//==============================
// * 创建 - 画布
//==============================
Drill_CODM_Renderer.drill_CODM_createCanvas = function() {
	this._drill_CODM_canvas = document.createElement('canvas');		//（canvas是非常基础的对象，一个texture/bitmap就有一个canvas）
	this._drill_CODM_canvas.id = 'drill_CODM_canvas';

	this.drill_CODM_updateCanvas();		//（创建后刷新）
    
	//document.body.appendChild(this._drill_CODM_canvas);
};
//==============================
// * 创建 - 渲染器
//==============================
Drill_CODM_Renderer.drill_CODM_createRenderer = function() {
	PIXI.dontSayHello = true;
	var width = Graphics._width;
	var height = Graphics._height;
	var options = { view: this._drill_CODM_canvas };
	try {
		switch( Graphics._rendererType ){
			
		// > canvas渲染器
		case 'canvas':
			this._drill_CODM_renderer = new PIXI.CanvasRenderer(width, height, options);
			break;
			
		// > webgl渲染器
		case 'webgl':
			this._drill_CODM_renderer = new PIXI.WebGLRenderer(width, height, options);
			break;
			
		// > 自动渲染器（在canvas和webgl选一）
		default:
			this._drill_CODM_renderer = PIXI.autoDetectRenderer(width, height, options);
			break;
		}
	
		// > webgl渲染器 的材质缓存数
		if( this._drill_CODM_renderer && this._drill_CODM_renderer.textureGC ){
			this._drill_CODM_renderer.textureGC.maxIdle = 600;		//（最大缓存值：600）
		}
	}catch( e ){
		this._drill_CODM_renderer = null;
	}
};
//==============================
// * 刷新 - 画布
//==============================
Drill_CODM_Renderer.drill_CODM_updateCanvas = function() {
	this._drill_CODM_canvas.style.width = Graphics._width;		//（保持窗口高宽）
	this._drill_CODM_canvas.style.height = Graphics._height;
	this._drill_CODM_canvas.style.zIndex = 0;
};
//==============================
// * 刷新 - 渲染器
//==============================
Drill_CODM_Renderer.drill_CODM_updateRenderer = function() {
	if( this._drill_CODM_renderer == undefined ){ return; }			//（保持窗口高宽）
	this._drill_CODM_renderer.resize( Graphics._width, Graphics._height );
};
//==============================
// * 渲染器 - 执行渲染（接口）
//==============================
Drill_CODM_Renderer.drill_CODM_doRender = function( sprite, texture ){
	if( sprite ){
		this._drill_CODM_renderer.render( sprite, texture );
		if( this._drill_CODM_renderer.gl && this._drill_CODM_renderer.gl.flush ){
			this._drill_CODM_renderer.gl.flush();
		}
	}
};
//==============================
// * 渲染器 - 初始化（绑定）
//==============================
var _drill_CODM_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function() {
	_drill_CODM_createAllElements.call(this);
	Drill_CODM_Renderer.initialize();		//渲染器初始化
}
//==============================
// * 渲染器 - 刷新（非帧）
//==============================
var _drill_CODM_updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
	_drill_CODM_updateAllElements.call(this);
	Drill_CODM_Renderer.update();			//渲染器刷新
}


//=============================================================================
// ** 动态遮罩容器【Drill_CODM_MaskStage】
//			
//			
//			主功能：	> 定义一个单独的遮罩容器。
//						> 提供与 Graphics.render(…)函数 相似的渲染功能。
//						> 但不含fps和帧数计数器。
//			子功能：	
//						->容器
//							->获取材质
//							->获取新贴图
//						->渲染
//							->低帧优化
//							->遮罩高宽
//							->渲染材质（PIXI.RenderTexture）
//						->绘制层
//							->添加透视镜（可嵌套）
//							->移除透视镜
//							->遮罩底色
//							->反色绘制
//			
//			说明：	> 该类不是贴图，只是一个集合体。
//					> 从集合体中，可以获取多个使用该集合体材质的贴图。
//					> 注意，该类必须固定 高宽 ，与bitmap定义相似。
//=============================================================================
//==============================
// * 动态遮罩容器 - 定义
//==============================
function Drill_CODM_MaskStage() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 动态遮罩容器 - 初始化
//==============================
Drill_CODM_MaskStage.prototype.initialize = function( width, height ){
	
	this._drill_time = 0;					//低帧优化
	this._drill_width = width;				//遮罩宽度
	this._drill_height = height;			//遮罩高度
	this._drill_skipCount = 0;				//渲染计时器
	this._drill_maxSkipCount = 3;			//最大跳过帧
	this._drill_converted = false;			//反色标记
	
	this.drill_createRenderer();			//创建 - 渲染材质
	this.drill_createLayer();				//创建 - 绘制层
};
//==============================
// * 动态遮罩容器 - 帧刷新（接口）
//
//			说明：	该类需要放在帧刷新中 手动调用刷新。
//					注意，此帧刷新会造成很大的消耗，子类调用此函数时，要根据情况加锁不让其工作。
//==============================
Drill_CODM_MaskStage.prototype.update = function() {
	
	// > fps控制（低帧优化）
	this._drill_time += 1;
	var fps = 1000 / Graphics._fpsMeter.duration;
	if( fps < 10 ){
		if( this._drill_time * 3 != 0 ){ return; }	//（低帧数时，减少刷新次数）
	}
	
	// > 渲染计数器
    if( this._drill_skipCount <= 0 ){
        var startTime = Date.now();
		
		// > 开始渲染材质（遮罩渲染器）
		//this._drill_CODM_layer.update();
		//Drill_CODM_Renderer.drill_CODM_doRender( this._drill_CODM_layer, this._drill_CODM_texture );	//（可以看看pixi的 WebGLRenderer.prototype.render 和 CanvasRenderer.prototype.render）
		//Drill_CODM_Renderer._drill_CODM_renderer.render( this._drill_CODM_layer, this._drill_CODM_texture );	//（可以看看pixi的 WebGLRenderer.prototype.render 和 CanvasRenderer.prototype.render）
		
		// > 开始渲染材质（使用 Graphics默认的渲染器 渲染）
		this._drill_CODM_layer.update();
		Graphics._renderer.render( this._drill_CODM_layer, this._drill_CODM_texture );
		
		// > 清理渲染缓存
		if( Graphics._renderer.gl && Graphics._renderer.gl.flush ){
			Graphics._renderer.gl.flush();
		}
		
        var endTime = Date.now();
        var elapsed = endTime - startTime;	//（渲染时差）
        this._drill_skipCount = Math.min( Math.floor(elapsed / 15), this._drill_maxSkipCount );
    }else{
        this._drill_skipCount--;
	}
	
};
//==============================
// * 创建 - 渲染材质
//==============================
Drill_CODM_MaskStage.prototype.drill_createRenderer = function(){
	
	// > 自定义渲染器 - 材质（会出现绑定错误，.render( sprite, renderTexture ) 第二个参数必须是 RenderTexture ）
	//var source = Drill_CODM_Renderer._drill_CODM_canvas;
	//var baseTexture = new PIXI.BaseTexture(source);
    //baseTexture.mipmap = false;
    //baseTexture.width = source.width;
    //baseTexture.height = source.height;
	//var texture = new PIXI.Texture( baseTexture );
	//this._drill_CODM_texture = texture;
	
	// > 自带的默认渲染器
    if( Graphics._renderer && Graphics._renderer.textureGC ){
		Graphics._renderer.textureGC.maxIdle = 600;		//（覆写，强制改为600）（核心功能扩展）
	}
	
	// > 渲染材质（写法1）
	var renderTexture = PIXI.RenderTexture.create( this._drill_width, this._drill_height );
	this._drill_CODM_texture = renderTexture;
	
	// > 渲染材质（写法2）
	//var baseRenderTexture = new PIXI.BaseRenderTexture(this._drill_width, this._drill_height );
	//var renderTexture = new PIXI.RenderTexture(baseRenderTexture);
	//this._drill_CODM_texture = renderTexture;
};
//==============================
// * 创建 - 绘制层
//==============================
Drill_CODM_MaskStage.prototype.drill_createLayer = function(){
	
	// > 绘制层
	this._drill_CODM_layer = new Sprite();
	this._drill_CODM_layer.bitmap = new Bitmap( this._drill_width, this._drill_height );
	
	this.drill_CODM_setBlack();			//（默认黑底）
}

//==============================
// * 容器 - 获取材质（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_getTexture = function(){
	return this._drill_CODM_texture;
}
//==============================
// * 容器 - 获取新贴图（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_getNewSprite = function(){
	var sprite = new Sprite();
	sprite.texture = this._drill_CODM_texture;
	return sprite;
}

//==============================
// * 绘制层 - 设置遮罩底色
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_setColor = function( color ){
	this._drill_CODM_layer.bitmap.fillAll( color );		
}
//==============================
// * 绘制层 - 设为白底（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_setWhite = function(){
	this.drill_CODM_setColor("#ffffff");
}
//==============================
// * 绘制层 - 设为黑底（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_setBlack = function(){
	this.drill_CODM_setColor("#000000");
}
//==============================
// * 绘制层 - 是否反色（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_setConvert = function( b ){
	if( this._drill_converted == b ){ return; }
	this._drill_converted = b;
	
	// > 遮罩颜色
	if( b == true ){
		this.drill_CODM_setWhite();
	}else{
		this.drill_CODM_setBlack();
	}
	
	// > 透视镜 反色
	for(var i=0; i < this.children.length; i++){
		var temp_sprite = this.children[i];
		this.drill_CODM_reverseColor( temp_sprite, b );
	}
	
	//if( b == true ){
	//	var filter = new PIXI.filters.ColorMatrixFilter();	//（反色滤镜）
	//	
    //    var matrix = [-1, 0, 0, 0, 255, 	//（完全黑白颠倒）
	//				  0, -1, 0, 0, 255, 
	//				  0, 0, -1, 0, 255, 
	//				  0, 0, 0, 1, 0];
    //    filter._loadMatrix(matrix, true);
	//	
	//	this.filters = [filter];
	//}else{
	//	this.filters = null;
	//}
}

//==============================
// * 透视镜 - 添加透视镜（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_addMaskChild = function( temp_sprite ){
	this.drill_CODM_reverseColor( temp_sprite, this._drill_converted );
	this._drill_CODM_layer.addChild( temp_sprite );
}
//==============================
// * 透视镜 - 移除透视镜（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_removeMaskChild = function( temp_sprite ){
	this._drill_CODM_layer.removeChild( temp_sprite );
}
//==============================
// * 透视镜 - 图片层级排序（接口）
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_sortByZIndex = function(){
	this._drill_CODM_layer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
}
//==============================
// * 反色绘制 - 贴图黑白反色
//==============================
Drill_CODM_MaskStage.prototype.drill_CODM_reverseColor = function( sprite, b ){
	if( sprite._drill_CODM_reversed == undefined ){
		sprite._drill_CODM_reversed = false;
	}
	if( sprite._drill_CODM_reversed == b ){ return; }
		sprite._drill_CODM_reversed = b;
	
	// > 反色处理
	if( sprite._drill_CODM_reversed == false ){
		sprite._drill_CODM_bitmap = sprite.bitmap;
		
		sprite.bitmap.addLoadListener( sprite.drill_CODM_reverseBitmap.bind(sprite) );	//（绑定bitmap读取）
		
	// > 恢复原色
	}else{
		sprite.bitmap = sprite._drill_CODM_bitmap;
	}
}
//==============================
// * 反色绘制 - bitmap反转
//==============================
Sprite.prototype.drill_CODM_reverseBitmap = function( bitmapLoaded ){
	if( this._drill_CODM_reversed != true ){ return; }
	
	var ww = bitmapLoaded.width;
	var hh = bitmapLoaded.height;
	
	var bitmap = new Bitmap( ww, hh );		//（重头绘制一个新的）
	bitmap.blt( this.bitmap, 0, 0, ww, hh, 0,  0,  ww, hh  );
	bitmap.adjustTone(-255,-255,-255);
	this.bitmap = bitmap;
}


//=============================================================================
// ** 动态遮罩贴图【Drill_CODM_MaskSprite】
//			
//			
//			主功能：	> 定义一个贴图，能够使用自定义的动态遮罩容器。
//						> 能通过贴图，调用容器中部分函数。
//			子功能：	
//						->贴图
//							->动态遮罩容器
//							->继承函数
//			
//			说明：	> 该贴图需要绑定到目标贴图的 .mask 中。单独显示也可以，为黑白蒙版的图像。
//					> 注意，这是一个固定 高宽 的贴图对象。
//					
// 			代码：	> 范围 - 核心插件提供的贴图类，需调用接口来进行交互。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [ ●单个 /多个]
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 动态遮罩贴图 - 定义
//==============================
function Drill_CODM_MaskSprite() {
	this.initialize.apply(this, arguments);
}
Drill_CODM_MaskSprite.prototype = Object.create(Sprite.prototype);
Drill_CODM_MaskSprite.prototype.constructor = Drill_CODM_MaskSprite;
//==============================
// * 动态遮罩贴图 - 初始化
//==============================
Drill_CODM_MaskSprite.prototype.initialize = function( width, height ){
	Sprite.prototype.initialize.call(this);
	
	this._drill_CODM_stage = new Drill_CODM_MaskStage( width, height );
	this.texture = this._drill_CODM_stage.drill_CODM_getTexture();
};
//==============================
// * 动态遮罩贴图 - 帧刷新
//==============================
Drill_CODM_MaskSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	// > 贴图显示时，容器才工作
	if( this.visible == true && this.opacity > 0 ){
		this._drill_CODM_stage.update();
	}
}
//==============================
// * 容器 - 是否反色（接口）
//==============================
Drill_CODM_MaskSprite.prototype.drill_CODM_setConvert = function( b ){
	this._drill_CODM_stage.drill_CODM_setConvert( b );
}
//==============================
// * 容器 - 添加到父类（接口）
//==============================
Drill_CODM_MaskSprite.prototype.drill_CODM_addMaskChild = function( temp_sprite ){
	this._drill_CODM_stage.drill_CODM_addMaskChild( temp_sprite );
}
//==============================
// * 容器 - 从父类中移除（接口）
//==============================
Drill_CODM_MaskSprite.prototype.drill_CODM_removeMaskChild = function( temp_sprite ){
	this._drill_CODM_stage.drill_CODM_removeMaskChild( temp_sprite );
}


/*
//=============================================================================
// ** 测试 绘制
//=============================================================================
//==============================
// * 地图 - 创建
//==============================
var _drill_CODM_Scene_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_CODM_Scene_createAllWindows.call(this);
	this.drill_CODM_createLayer();	
};
//==============================
// * 地图 - 创建贴图
//==============================
Scene_Map.prototype.drill_CODM_createLayer = function() {
	
	// > 遮罩容器
	var temp_stage = new Drill_CODM_MaskStage(Graphics.boxWidth, Graphics.boxHeight);
	this._drill_CODM_stage = temp_stage;
	
	// > 遮罩容器 子贴图
	var temp_mask_1 = new Sprite();
	temp_mask_1.bitmap = new Bitmap(70,70);
	temp_mask_1.bitmap.fillAll( "#ff00ff" );
	temp_mask_1.x = 100;
	temp_mask_1.y = 30;
	temp_stage.drill_CODM_addMaskChild( temp_mask_1 );
	this._drill_CODM_maskChild_1 = temp_mask_1;
	
	// > 遮罩容器 子贴图
	var temp_mask_2 = new Sprite();
	temp_mask_2.bitmap = new Bitmap(234,30);
	temp_mask_2.bitmap.fillAll( "#880000" );
	temp_mask_2.x = 20;
	temp_mask_2.y = 100;
	temp_stage.drill_CODM_addMaskChild( temp_mask_2 );
	this._drill_CODM_maskChild_2 = temp_mask_2;
	
	// > 遮罩容器 子贴图
	var temp_mask_3 = new Sprite();
	temp_mask_3.bitmap = new Bitmap(455,100);
	temp_mask_3.bitmap.fillAll( "#ffffff" );
	temp_mask_3.x = 50;
	temp_mask_3.y = 500;
	temp_stage.drill_CODM_addMaskChild( temp_mask_3 );
	this._drill_CODM_maskChild_3 = temp_mask_3;
	
	
	// > 遮罩层1
	var temp_mask_1 = temp_stage.drill_CODM_getNewSprite();
	temp_mask_1.zIndex = 100;
	this._drill_CODM_maskSprite_1 = temp_mask_1;
	
	// > 贴图1
	var layer_sprite_1 = new Sprite();
	layer_sprite_1.bitmap = ImageManager.loadBattleback1("草地");
	layer_sprite_1.mask = temp_mask_1;
	layer_sprite_1.addChild( temp_mask_1 );
	this.addChild(layer_sprite_1);
	this._drill_CODM_layerSprite_1 = layer_sprite_1;
	
	// > 遮罩层2
	var temp_mask_2 = temp_stage.drill_CODM_getNewSprite();
	temp_mask_2.zIndex = 100;
	this._drill_CODM_maskSprite_2 = temp_mask_2;
	
	// > 贴图2
	var layer_sprite_2 = new Sprite();
	layer_sprite_2.bitmap = ImageManager.loadBattleback1("雪地");
	layer_sprite_2.mask = temp_mask_2;
	layer_sprite_2.addChild( temp_mask_2 );
	this.addChild(layer_sprite_2);
	this._drill_CODM_layerSprite_2 = layer_sprite_2;
	
}
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_CODM_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_CODM_update.call(this);
	
	// > 遮罩组
	this._drill_CODM_stage.update();
	
	// > 遮罩层 子贴图
	this._drill_CODM_maskChild_1.y = 70 + 60*Math.sin( Graphics.frameCount /180 * Math.PI );
	this._drill_CODM_maskChild_2.y = 160 + 120*Math.sin( (Graphics.frameCount + 30) /180 * Math.PI );
	
	// > 贴图
	this._drill_CODM_layerSprite_1.x = 20 + 60*Math.sin( Graphics.frameCount /180 * Math.PI );
	this._drill_CODM_layerSprite_2.x = 400 - 60*Math.sin( Graphics.frameCount /180 * Math.PI );
};
*/


//=============================================================================
// ** 透视镜物体【Drill_CODM_PerspectiveMarker】
//			
//			
//			主功能：	> 定义一个透视镜物体，能够控制物体移动、缩放等变换。
//						> 物体与透视镜贴图一对一绑定。
//			子功能：	
//						->基本属性
//							->当前时间
//							->销毁标记
//						->绑定对象
//							> 事件
//							> 角色
//							> 敌人
//							> 图片
//							> 鼠标
//						->生命周期
//							->生命流逝
//							->到时自动销毁
//							->暂停
//						->弹道
//							->位置
//							->透明度
//							->缩放X
//							->缩放Y
//						->特殊
//							->简单透视镜标记
//							->高级透视镜ID
//						
//			说明：	> 该类与事件相似，并且可以在战斗界面中存在。
//					> 必要时可以继承该类。
//					> 该类可以定义弹道轨迹，并进行移动，移动效果与 偏移、绑定对象位置 叠加。
//=============================================================================
//==============================
// * 透视镜物体 - 定义
//==============================
function Drill_CODM_PerspectiveMarker() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 透视镜物体 - 初始化
//==============================
Drill_CODM_PerspectiveMarker.prototype.initialize = function( data ){
	this.drill_initData( data );
	
	// > 私有属性初始化
	this._x = 0;										//位置x
	this._y = 0;										//位置y
	this._scaleX = this._drill_data['scale_x'];			//缩放x
	this._scaleY = this._drill_data['scale_y'];			//缩放y
	this._opacity = 255;								//透明度
	this._rotate = 0;									//旋转
	this._drill_curTime = 0;							//当前时间
	this._drill_destroyed = false;						//销毁标记（标记为true后，不可逆）
	
	this._drill_lifeEnabled = this._drill_data['lifeEnabled'];	//生命周期 - 开关
	this._drill_lifeTime = this._drill_data['lifeTime'];		//生命周期 - 总时间
	this._drill_curLife = 0;									//生命周期 - 当前生命
	this._drill_lifePause = false;								//生命周期 - 暂停控制
	
	this._drill_movingTime = 0;							//弹道 - 当前时间（位置）
	this._drill_curX = 0;								//弹道 - 所在位置X
	this._drill_curY = 0;								//弹道 - 所在位置Y
	this._drill_COBa_x = [];							//弹道 - 列表X
	this._drill_COBa_y = [];							//弹道 - 列表Y
	
	this._drill_opacityTime = 0;						//弹道 - 当前时间（透明度）
	this._drill_COBa_opacity = [];						//弹道 - 透明度列表
	
	this._drill_scaleXTime = 0;							//弹道 - 当前时间（缩放X）
	this._drill_scaleYTime = 0;							//弹道 - 当前时间（缩放Y）
	this._drill_COBa_scaleX = [];						//弹道 - 缩放X列表
	this._drill_COBa_scaleY = [];						//弹道 - 缩放Y列表
	
	this._drill_rotateTime = 0;							//弹道 - 当前时间（旋转）
	this._drill_COBa_rotate = [];						//弹道 - 旋转列表
	
	this._drill_isSimple = false;						//筛选器 - 简单透视镜标记
	this._drill_id = -1;								//筛选器 - id标识（仅限高级透视镜使用，不包括简单透视镜。）
	
	this.drill_clearBinding();							//绑定
}
//==============================
// * 透视镜物体 - 帧刷新
//==============================
Drill_CODM_PerspectiveMarker.prototype.update = function() {
	this._drill_curTime += 1;
	this.drill_updateLife();			//帧刷新 - 生命周期
	this.drill_updatePosition();		//帧刷新 - 位置
	this.drill_updateOpacity();			//帧刷新 - 透明度
	this.drill_updateScale();			//帧刷新 - 缩放
	this.drill_updateRotate();			//帧刷新 - 旋转
}
//==============================
// * 属性 - 默认值初始化
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_initData = function( data ){
	this._drill_data = JSON.parse(JSON.stringify( data ));
	var data = this._drill_data;
	
	// > 贴图
	if( data['offsetX'] == undefined ){ data['offsetX'] = 0 };							//透视镜 X
	if( data['offsetY'] == undefined ){ data['offsetY'] = 0 };							//透视镜 Y
	if( data['gif_src'] == undefined ){ data['gif_src'] = [] };							//透视镜GIF
	if( data['gif_src_file'] == undefined ){ data['gif_src_file'] = "img/system/" };	//透视镜资源路径
	if( data['gif_interval'] == undefined ){ data['gif_interval'] = 4 };				//帧间隔
	if( data['gif_back_run'] == undefined ){ data['gif_back_run'] = false };			//是否倒放
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };						//缩放 X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };						//缩放 Y
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };							//图片层级
	
	// > 生命周期
	if( data['lifeEnabled'] == undefined ){ data['lifeEnabled'] = false };				//生命周期 - 开关
	if( data['lifeTime'] == undefined ){ data['lifeTime'] = 0 };						//生命周期 - 总时间
	
	// > 朝向
	if( data['dir_mode'] == undefined ){ data['dir_mode'] = "不旋转" };					//旋转模式（不旋转/无限自旋转/根据事件朝向转向）
	if( data['dir_selfSpeed'] == undefined ){ data['dir_selfSpeed'] = 5.0 };			//自旋转速度
	if( data['dir_evType'] == undefined ){ data['dir_evType'] = "瞬间转向" };			//事件转向类型（瞬间转向/匀速转向/弹性转向）
	if( data['dir_evSpeed'] == undefined ){ data['dir_evSpeed'] = 0 };					//转向速度
	
	// > 透明度
	if( data['opacity_mode'] == undefined ){ data['opacity_mode'] = "固定透明度" };		//透明度模式（固定透明度/波动透明度）
	if( data['opacity_fix'] == undefined ){ data['opacity_fix'] = 255 };				//固定透明度
	if( data['opacity_waveMin'] == undefined ){ data['opacity_waveMin'] = 150 };		//透明度波动 - 最小值
	if( data['opacity_waveMax'] == undefined ){ data['opacity_waveMax'] = 255 };		//透明度波动 - 最大值
	if( data['opacity_period'] == undefined ){ data['opacity_period'] = 120 };			//透明度波动 - 周期
	
}
//==============================
// * 绑定 - 清除绑定
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_clearBinding = function(){
	this._drill_bindingCharacterId = -1;				//绑定 - 事件Id（-2:玩家，-1:无，0:无，>=1 事件）
	this._drill_bindingActorId = -1;					//绑定 - 角色Id
	this._drill_bindingEnemyId = -1;					//绑定 - 敌人Id
	this._drill_bindingPictureId = -1;					//绑定 - 图片Id
	this._drill_bindingMouse = false;					//绑定 - 鼠标
}
//==============================
// * 绑定 - 设置绑定的 事件（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setBindingCharacterId = function( character_id ){
	this.drill_clearBinding();
	this._drill_bindingCharacterId = character_id;
}
//==============================
// * 绑定 - 设置绑定的 角色（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setBindingActorId = function( actor_id ){
	this.drill_clearBinding();
	this._drill_bindingActorId = actor_id;
}
//==============================
// * 绑定 - 设置绑定的 敌人（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setBindingEnemyId = function( enemy_id ){
	this.drill_clearBinding();
	this._drill_bindingEnemyId = enemy_id;
}
//==============================
// * 绑定 - 设置绑定的 图片（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setBindingPictureId = function( picture_id ){
	this.drill_clearBinding();
	this._drill_bindingPictureId = picture_id;
}
//==============================
// * 绑定 - 设置绑定的 鼠标（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setBindingMouse = function( enable ){
	this.drill_clearBinding();
	this._drill_bindingMouse = enable;
}
//==============================
// * 绑定 - ID标识（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setId = function( id ){ this._drill_id = id; }
Drill_CODM_PerspectiveMarker.prototype.drill_id = function(){ return this._drill_id; }
//==============================
// * 属性 - 简单透视镜标记（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setSimple = function( enabled ){ this._drill_isSimple = enabled; }
Drill_CODM_PerspectiveMarker.prototype.drill_isSimple = function(){ return this._drill_isSimple; }
//==============================
// * 属性 - 设置销毁（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_destroy = function(){ this._drill_destroyed = true; }
Drill_CODM_PerspectiveMarker.prototype.drill_isDestroyed = function(){ return this._drill_destroyed; }
//==============================
// * 属性 - 方向
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_direction = function(){ return 2; }


//==============================
// * 生命周期 - 开关（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setLifeEnabled = function( enabled ){
	this._drill_lifeEnabled = enabled;
}
//==============================
// * 生命周期 - 设定生命时长（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setLifeTime = function( lifeTime ){
	this._drill_lifeEnabled = true;
	this._drill_lifeTime = lifeTime;
}
//==============================
// * 生命周期 - 暂停生命流逝（接口）
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_setLifePause = function( enable ){
	this._drill_lifePause = enable;
}
//==============================
// * 生命周期 - 帧刷新
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_updateLife = function(){
	if( this.drill_isDead() == true ){ return; }
	if( this._drill_lifePause == true ){ return; }
	this._drill_curLife += 1;
}
//==============================
// * 生命周期 - 销毁判定
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_isDead = function(){
	if( this._drill_lifeEnabled == false ){ return false; }
	return this._drill_curLife >= this._drill_lifeTime;
}

//==============================
// * 弹道 - 获取位置
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_getBallisticsX = function(){ return this._drill_curX; }
Drill_CODM_PerspectiveMarker.prototype.drill_getBallisticsY = function(){ return this._drill_curY; }
Drill_CODM_PerspectiveMarker.prototype.drill_getBallisticsOpacity = function(){ return this._opacity; }
Drill_CODM_PerspectiveMarker.prototype.drill_getBallisticsScaleX = function(){ return this._scaleX; }
Drill_CODM_PerspectiveMarker.prototype.drill_getBallisticsScaleY = function(){ return this._scaleY; }
Drill_CODM_PerspectiveMarker.prototype.drill_getBallisticsRotate = function(){ return this._rotate; }
//==============================
// * 弹道 - 重设弹道时间
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_resetBallisticsMovingTime = function(){ this._drill_movingTime = 0; }
Drill_CODM_PerspectiveMarker.prototype.drill_resetBallisticsOpacityTime = function(){ this._drill_opacityTime = 0; }
Drill_CODM_PerspectiveMarker.prototype.drill_resetBallisticsScaleXTime = function(){ this._drill_scaleXTime = 0; }
Drill_CODM_PerspectiveMarker.prototype.drill_resetBallisticsScaleYTime = function(){ this._drill_scaleYTime = 0; }
Drill_CODM_PerspectiveMarker.prototype.drill_resetBallisticsRotateTime = function(){ this._drill_rotateTime = 0; }

//==============================
// * 位置 - 帧刷新
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_updatePosition = function(){
	var xx = 0;
	var yy = 0;
	
	// > 位置 - 事件
	if( this._drill_bindingCharacterId != -1 ){
		var character = null;
		if( this._drill_bindingCharacterId == -2 ){
			character = $gamePlayer;
		}else{
			character = $gameMap.event( this._drill_bindingCharacterId );
		}
		if( character == undefined ){ return; }
		xx = (character._realX - $gameMap._displayX + 0.5 );
		yy = (character._realY - $gameMap._displayY + 0.5 );
		
		// > 循环地图中，透视镜位置
		if( $gameMap.isLoopHorizontal() &&
			$gameMap._displayX > $dataMap.width-$gameMap.screenTileX() ){	//（镜头能容纳 17个图块，地图假设100个图块，那么 83-100图块时的范围，镜头处于循环边缘状态。）
			if( xx < 0.5 ){ xx += $dataMap.width; }
		}
		if( $gameMap.isLoopVertical() &&
			$gameMap._displayY > $dataMap.height-$gameMap.screenTileY() ){
			if( yy < 0.5 ){ yy += $dataMap.height; }
		}
		
		xx = xx * $gameMap.tileWidth();
		yy = yy * $gameMap.tileHeight();
	}
	
	// > 位置 - 角色
	if( this._drill_bindingActorId != -1 ){
		//..
	}
	
	// > 位置 - 敌人
	if( this._drill_bindingEnemyId != -1 ){
		//..
	}
	
	// > 位置 - 图片
	if( this._drill_bindingPictureId != -1 ){
		var pic = $gameScreen.picture( this._drill_bindingPictureId );
		if( pic == undefined ){ return; }
		xx = pic.x();
		yy = pic.y();
		if( Imported.Drill_MouseDragPicture ){		//（鼠标-可拖拽的图片）
			xx += pic.drill_MDP_getDraggingXOffset();
			yy += pic.drill_MDP_getDraggingYOffset();
		}
		if( Imported.Drill_PictureAdsorptionSlot ){	//（鼠标-图片吸附槽）
			xx += pic.drill_PAS_getAdsorbXOffset();
			yy += pic.drill_PAS_getAdsorbYOffset();
		}
	}
	
	// > 位置 - 鼠标
	if( this._drill_bindingMouse == true ){
		xx = _drill_mouse_x;
		yy = _drill_mouse_y;
	}
	
	// > 根据轨迹进行播放
	if( this._drill_COBa_x.length != 0 ){
		this._drill_movingTime += 1;
		if( this._drill_movingTime < 0 ){ this._drill_movingTime = 0; }
		if( this._drill_movingTime > this._drill_COBa_x.length-1 ){
			this._drill_movingTime = this._drill_COBa_x.length-1;
		}
		this._drill_curX = this._drill_COBa_x[ this._drill_movingTime ];		//播放弹道轨迹
		this._drill_curY = this._drill_COBa_y[ this._drill_movingTime ];
		xx += this._drill_curX;
		yy += this._drill_curY;
	}
	
	// > 配置的偏移量
	xx += this._drill_data['offsetX'];
	yy += this._drill_data['offsetY'];
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 透明度 - 帧刷新
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_updateOpacity = function(){

	// > 播放弹道轨迹
	if( this._drill_COBa_opacity.length != 0 ){
		this._drill_opacityTime += 1;
		if( this._drill_opacityTime < 0 ){ this._drill_opacityTime = 0; }
		if( this._drill_opacityTime > this._drill_COBa_opacity.length-1 ){
			this._drill_opacityTime = this._drill_COBa_opacity.length-1;
		}
		this._opacity = this._drill_COBa_opacity[ this._drill_opacityTime ];

	// > 默认值（不变）
	}else{
		this._opacity = 255;
	}	
}
//==============================
// * 缩放 - 帧刷新
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_updateScale = function(){
	
	// > 播放弹道轨迹
	if( this._drill_COBa_scaleX.length != 0 ){
		this._drill_scaleXTime += 1;
		if( this._drill_scaleXTime < 0 ){ this._drill_scaleXTime = 0; }
		if( this._drill_scaleXTime > this._drill_COBa_scaleX.length-1 ){
			this._drill_scaleXTime = this._drill_COBa_scaleX.length-1;
		}
		this._scaleX = this._drill_COBa_scaleX[ this._drill_scaleXTime ];
		
	// > 默认值（不变）
	}else{
		this._scaleX = this._drill_data['scale_x'];
	}
	
	
	// > 播放弹道轨迹
	if( this._drill_COBa_scaleY.length != 0 ){
		this._drill_scaleYTime += 1;
		if( this._drill_scaleYTime < 0 ){ this._drill_scaleYTime = 0; }
		if( this._drill_scaleYTime > this._drill_COBa_scaleY.length-1 ){
			this._drill_scaleYTime = this._drill_COBa_scaleY.length-1;
		}
		this._scaleY = this._drill_COBa_scaleY[ this._drill_scaleYTime ];
		
	// > 默认值（不变）
	}else{
		
		this._scaleY = this._drill_data['scale_y'];
	}
}
//==============================
// * 旋转 - 帧刷新
//==============================
Drill_CODM_PerspectiveMarker.prototype.drill_updateRotate = function(){

	// > 播放弹道轨迹
	if( this._drill_COBa_rotate.length != 0 ){
		this._drill_rotateTime += 1;
		if( this._drill_rotateTime < 0 ){ this._drill_rotateTime = 0; }
		if( this._drill_rotateTime > this._drill_COBa_rotate.length-1 ){
			this._drill_rotateTime = this._drill_COBa_rotate.length-1;
		}
		this._rotate = this._drill_COBa_rotate[ this._drill_rotateTime ];

	// > 默认值（不变）
	}else{
		this._rotate = 0;
	}	
}


//=============================================================================
// ** 透视镜贴图【Drill_CODM_PerspectiveSprite】
//			
//			
//			主功能：	> 定义一个透视镜贴图。
//			子功能：	
//						->GIF播放
//						->弹道变化
//							> 位置
//							> 透明度
//							> 缩放
//						->旋转
//							->自适应旋转
//							->固定旋转
//						
//			说明：	> 该类与事件相似，并且可以在战斗界面中存在。
//					> 贴图的弹道变化都由 透视镜物体 自身控制，贴图只获取并显示效果。
//					
// 			代码：	> 范围 - 该类只显示全黑或全白的透视镜贴图。
//					> 结构 - [合并/ ●分离 /混乱] 贴图与数据分离，数据单独由 Drill_CODM_PerspectiveMarker 控制。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 即时创建，不需要等资源延迟
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 贴图通过 drill_isDestroyed 接口作为信号，由外部容器销毁。
//					> 样式 - [不可修改/自变化/ ●外部变化 ] 
//=============================================================================
//==============================
// * 透视镜贴图 - 定义
//==============================
function Drill_CODM_PerspectiveSprite() {
	this.initialize.apply(this, arguments);
}
Drill_CODM_PerspectiveSprite.prototype = Object.create(Sprite.prototype);
Drill_CODM_PerspectiveSprite.prototype.constructor = Drill_CODM_PerspectiveSprite;
//==============================
// * 透视镜贴图 - 初始化
//==============================
Drill_CODM_PerspectiveSprite.prototype.initialize = function( marker ){
	Sprite.prototype.initialize.call(this);
	this.drill_setMarker( marker );
};
//==============================
// * 透视镜贴图 - 帧刷新
//==============================
Drill_CODM_PerspectiveSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if( this._drill_data == undefined ){ return; }
	
	this.drill_CODM_updateLife();				//帧刷新 - 生命周期
	this.drill_CODM_updateGif();				//帧刷新 - 播放gif
	this.drill_CODM_updatePosition();			//帧刷新 - 位置
	this.drill_CODM_updateOpacity();			//帧刷新 - 透明度
	this.drill_CODM_updateScale();				//帧刷新 - 缩放
	this.drill_CODM_updateRotation();			//帧刷新 - 旋转
};
//==============================
// * 透视镜贴图 - 设置物体（接口）
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_setMarker = function( marker ){
	if( this._drill_marker == marker ){ return; }
	this._drill_marker = marker;
	this._drill_data = marker._drill_data;
	var data = this._drill_data;
	if( data == undefined ){ return; }
	
	
	// > 透视镜贴图初始化
	this._drill_src_bitmaps = [];
	for(var j = 0; j < data['gif_src'].length ; j++){
		var bitmap = ImageManager.loadBitmap( data['gif_src_file'], data['gif_src'][j], 0, true );
		this._drill_src_bitmaps.push( bitmap );
	}
	
	// > 贴图属性初始化
	this.visible = true;
	this.bitmap = this._drill_src_bitmaps[0];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.scale.x = this._drill_data['scale_x'];
	this.scale.y = this._drill_data['scale_y'];
	this.zIndex = this._drill_data['zIndex'];
	
	// > 私有属性初始化
	this._drill_curTime = this._drill_marker._drill_curTime;
	this._drill_lifeLock = false;
	
	// > 朝向初始化
	if( this._drill_data['dir_mode'] == "根据事件朝向转向" ){
		this.rotation = this.drill_getCurRotation() / 180*Math.PI;
	}
};
//==============================
// * 透视镜贴图 - 判断销毁（接口）
//
//			说明：	贴图与物体绑定，物体被销毁，则贴图销毁。
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_isDestroyed = function(){
	if( this._drill_marker == undefined ){ return true; }
	return this._drill_marker.drill_isDestroyed();
}

//==============================
// * 帧刷新 - 生命周期
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_CODM_updateLife = function() {
	
	// > 时间同步
	this._drill_curTime = this._drill_marker._drill_curTime;
	
	// > 生命周期控制
	if( this._drill_lifeLock != this._drill_marker.drill_isDead() ){
		this._drill_lifeLock = this._drill_marker.drill_isDead();		//（锁，变化时才执行一次）
		if( this._drill_lifeLock == true ){
			this.visible = false;
		}else{
			this.visible = true;
		}
	}
	
	// > 自动去除
	if( this._drill_marker._drill_destroyed == true ){
		if( this.parent != undefined ){
			this.parent.removeChild(this);
		}
	}
}
//==============================
// * 帧刷新 - 播放gif
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_CODM_updateGif = function() {
	
	var inter = this._drill_curTime;
	inter = inter / this._drill_data['gif_interval'];
	inter = inter % this._drill_data['gif_src'].length;
	if( this._drill_data['gif_back_run'] ){
		inter = this._drill_data['gif_src'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this.bitmap = this._drill_src_bitmaps[inter];
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_CODM_updatePosition = function() {
	this.x = this._drill_marker._x;
	this.y = this._drill_marker._y;
}
//==============================
// * 帧刷新 - 透明度
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_CODM_updateOpacity = function() {
	var time = this._drill_curTime;
	var mode = this._drill_data['opacity_mode'];
	
	// > 数据的透明度值
	var rr = this._drill_marker._opacity;
	
	// > 透明度模式
	if( mode == "固定透明度" ){
		rr += this._drill_data['opacity_fix'] - 255;
	}
	if( mode == "波动透明度" ){
		var waveMax = Math.max( this._drill_data['opacity_waveMax'], this._drill_data['opacity_waveMin'] );
		var waveDiff = Math.abs( this._drill_data['opacity_waveMax'] - this._drill_data['opacity_waveMin'] );
		var period_time = time * 360 / this._drill_data['opacity_period'];
		rr += waveMax - 255;
		rr += waveDiff * (Math.cos( period_time /180*Math.PI ) * 0.5 - 0.5 );	//（-1 ~ 0 波动）
	}
	
	this.opacity = rr;
}
//==============================
// * 帧刷新 - 缩放
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_CODM_updateScale = function() {
	if( this.scale.x == this._drill_marker._scaleX &&
		this.scale.y == this._drill_marker._scaleY ){ return; }
	this.scale.x = this._drill_marker._scaleX;
	this.scale.y = this._drill_marker._scaleY;
}
//==============================
// * 帧刷新 - 旋转
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_CODM_updateRotation = function() {
	var time = this._drill_curTime;
	var mode = this._drill_data['dir_mode'];
	
	// > 数据的旋转值
	var rr = this._drill_marker._rotate;
	
	
	// > 旋转模式（与数据值叠加）
	if( mode == "不旋转" ){
		//（不操作）
		this.rotation = rr / 180 * Math.PI;
	}
	if( mode == "无限自旋转" ){
		rr += time * this._drill_data['dir_selfSpeed'];
		this.rotation = rr / 180 * Math.PI;
	}
	
	
	// > 旋转模式（锁定旋转值）
	if( mode == "根据事件朝向转向" ){
		var target_rotation = this.drill_getCurRotation() /180*Math.PI;
		
		if( this._drill_data['dir_evType'] == "瞬间转向" ){
			this.rotation = target_rotation;
		}
		if( this._drill_data['dir_evType'] == "匀速转向" ){
			// > 角度修正
			this.rotation %= (Math.PI*2);
			if( this.rotation < 0 ){ this.rotation += Math.PI*2; }
			
			// > 顺时针/逆时针判断
			var anticlockwise = $gameTemp.drill_CODM_isAnticlockwise(target_rotation, this.rotation);
			var distance = $gameTemp.drill_CODM_getMinDistance(target_rotation, this.rotation);
			var r_speed = this._drill_data['dir_evSpeed'] / 180 * Math.PI;
			if( anticlockwise ){	//逆时针转
				this.rotation += r_speed;
			}else{					//顺时针转
				this.rotation -= r_speed;
			}
			
			// > 速度收敛
			if( distance < r_speed ){
				this.rotation = target_rotation;
			}
		}
		if( this._drill_data['dir_evType'] == "弹性转向" ){
			// > 角度修正
			this.rotation %= (Math.PI*2);
			if( this.rotation < 0 ){ this.rotation += Math.PI*2; }
			
			// > 顺时针/逆时针判断
			var anticlockwise = $gameTemp.drill_CODM_isAnticlockwise(target_rotation, this.rotation);
			var distance = $gameTemp.drill_CODM_getMinDistance(target_rotation, this.rotation);
			var r_speed = distance/ this._drill_data['dir_evSpeed'];
			if( anticlockwise ){	//逆时针转
				this.rotation += r_speed;
			}else{					//顺时针转
				this.rotation -= r_speed;
			}
			
			// > 速度收敛
			if( distance < 0.01 ){
				this.rotation = target_rotation;
			}
		}
	}
	if( mode == "始终朝向鼠标位置" ){
		var angle = $gameTemp.drill_CODM_getPointToPointDegree( this.x,this.y, _drill_mouse_x,_drill_mouse_y );
		this.rotation = (angle + 270) /180*Math.PI;
	}
	
}
//==============================
// * 朝向 - 转向判定
//==============================
Drill_CODM_PerspectiveSprite.prototype.drill_getCurRotation = function() {
	var ch = null;
	if( this._drill_marker._drill_bindingCharacterId == -2 ){
		ch = $gamePlayer;
	}else{
		ch = $gameMap._events[ this._drill_marker._drill_bindingCharacterId ];
	}
	if( ch == undefined ){ return 0; }
	
	if( ch.direction() === 2 ){	//下
		return 0;
	}
	if( ch.direction() === 4 ){	//左
		return 90;
	}
	if( ch.direction() === 6 ){	//右
		return 270;
	}
	if( ch.direction() === 8 ){	//上
		return 180;
	}
	return 0;
}
//==============================
// * 朝向 - 获得两个角度的最小距离
//==============================
Game_Temp.prototype.drill_CODM_getMinDistance = function( a,b ) {
	a %= Math.PI*2;
	b %= Math.PI*2;
	if( a < 0 ){ a += Math.PI*2; }		//js负数取余，会得到负数
	if( b < 0 ){ b += Math.PI*2; }
	var distance = Math.abs( a - b );
	if( distance < Math.PI ){
		return distance;
	}else{
		return Math.PI*2 - distance;
	}
}
//==============================
// * 朝向 - 判断顺时针/逆时针
//==============================
Game_Temp.prototype.drill_CODM_isAnticlockwise = function( a,b ) {
	a %= Math.PI*2;
	b %= Math.PI*2;
	if( a < 0 ){ a += Math.PI*2; }
	if( b < 0 ){ b += Math.PI*2; }
	var angle = a - b;
	if( angle >= Math.PI ){				//顺时针
		return false;
	}else if( angle <= -1 * Math.PI ){	//逆时针
		return true;
	}else if( angle > 0 ){				//逆时针
		return true;
	}else{								//顺时针
		return false;
	}
}
//==============================
// * 数学 - 计算点A朝向点B的角度
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//			返回：	> 数字      （角度，0 至 360 之间）
//			
//			说明：	0度朝右，90度朝下，180度朝左，270度朝上。
//==============================
Game_Temp.prototype.drill_CODM_getPointToPointDegree = function( x1,y1,x2,y2 ){
	var degree = 0;
	
	// > arctan不能为0情况
	if( x2 == x1 ){
		if( y2 > y1 ){
			degree = 90;
		}else{
			degree = 270;
		}
	}else if( y2 == y1 ){
		if( x2 > x1 ){
			degree = 0;
		}else{
			degree = 180;
		}
	
	// > arctan正常计算
	}else{
		degree = Math.atan( (y2 - y1)/(x2 - x1) );
		degree = degree / Math.PI * 180;
		if( x2 < x1 ){
			degree += 180;
		}
	}
	
	// > 修正值
	degree = degree % 360;
	if( degree < 0 ){ degree += 360; }
	
	return degree;
};


//=============================================================================
// ** 透视镜物体容器【Drill_CODM_PerspectiveMarkerContainer】
//			
//			
//			主功能：	> 定义一个容器，能够批量管理 透视镜物体 。
//			子功能：	
//						->简单透视镜
//							->绑定事件
//							->绑定角色
//							->绑定敌人
//							->绑定图片
//							->绑定鼠标
//						->高级透视镜
//							->绑定id
//							->关联事件、角色、敌人……
//						
//			说明：	> 容器提供的接口，只能增加不能减少，你可以通过设置指定物体 drill_destroy() 确保自动销毁。
//					> 该容器整个类需要一并存储到存档中，以确保高级透视镜数据不被丢弃。
//					> 核心不提供 透视镜贴图容器 的定义，因为贴图容器与 实例化的动态遮罩容器 密切相关。
//=============================================================================
//==============================
// * 物体容器 - 定义
//==============================
function Drill_CODM_PerspectiveMarkerContainer() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 物体容器 - 初始化
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.initialize = function(){
	this._drill_tank = [];
}
//==============================
// * 物体容器 - 帧刷新
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.update = function(){
	
	// > 帧刷新
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		
		// > 帧刷新
		marker.update();
		
		// > 过期自动销毁
		if( marker.drill_isDead() ){
			marker.drill_destroy();
		}
	}
	
	// > 销毁时
	for(var i = this._drill_tank.length-1; i >= 0; i-- ){
		var marker = this._drill_tank[i];
		if( marker.drill_isDestroyed() ){
			this._drill_tank.splice( i, 1 );
		}
	}
}
//==============================
// * 物体容器 - 添加（接口）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_addOne = function( marker ){
	if( this._drill_tank.contains( marker ) ){ return; }
	
	// > 简单透视镜 过滤（出现重复的绑定对象时，销毁挤兑）
	if( marker.drill_isSimple() == true ){
		var old_marker = null;
		
		// > 绑定的重复 事件Id
		if( marker._drill_bindingCharacterId != -1 ){
			old_marker = this.drill_CODM_getSimpleMarkerByCharacterId( marker._drill_bindingCharacterId );
		}
		// > 绑定的重复 角色Id
		if( marker._drill_bindingActorId != -1 ){
			old_marker = this.drill_CODM_getSimpleMarkerByActorId( marker._drill_bindingActorId );
		}
		// > 绑定的重复 敌人Id
		if( marker._drill_bindingEnemyId != -1 ){
			old_marker = this.drill_CODM_getSimpleMarkerByEnemyId( marker._drill_bindingEnemyId );
		}
		// > 绑定的重复 图片Id
		if( marker._drill_bindingPictureId != -1 ){
			old_marker = this.drill_CODM_getSimpleMarkerByPictureId( marker._drill_bindingPictureId );
		}
		// > 绑定的重复 鼠标
		if( marker._drill_bindingMouse != false ){
			old_marker = this.drill_CODM_getSimpleMarkerByMouse( marker._drill_bindingMouse );
		}
		
		// > 现有的 简单透视镜 销毁
		if( old_marker != undefined ){
			old_marker.drill_destroy();
		}

	
	// > 高级透视镜 过滤（出现重复的Id时，销毁挤兑）
	}else{
		var old_marker = null;
		
		// > 绑定的重复Id
		if( marker._drill_id != -1 ){
			old_marker = this.drill_CODM_getSeniorMarkerById( marker._drill_id );
		}
		
		// > 现有的 简单透视镜 销毁
		if( old_marker != undefined ){
			old_marker.drill_destroy();
		}
	}
	
	// > 添加到容器
	this._drill_tank.push( marker );
}
//==============================
// * 物体容器 - 获取全部（接口）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getTank = function(){
	return this._drill_tank;
}
//==============================
// * 物体容器 - 清理简单透视镜（接口）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_clearSimple = function(){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker.drill_isSimple() ){
			marker.drill_destroy();
		}
	}
}
//==============================
// * 物体容器 - 清理全部（接口）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_clearAll = function(){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		marker.drill_destroy();
	}
	this._drill_tank = [];
}
//==============================
// * 物体容器 - 获取简单 - 根据绑定事件（接口，一对一）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSimpleMarkerByCharacterId = function( character_id ){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true &&
			marker._drill_bindingCharacterId == character_id ){ 
			return marker; 
		}
	}
	return null;
}
//==============================
// * 物体容器 - 获取简单 - 根据绑定角色（接口，一对一）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSimpleMarkerByActorId = function( actor_id ){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true &&
			marker._drill_bindingActorId == actor_id ){ 
			return marker; 
		}
	}
	return null;
}
//==============================
// * 物体容器 - 获取简单 - 根据绑定敌人（接口，一对一）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSimpleMarkerByEnemyId = function( enemy_id ){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true &&
			marker._drill_bindingEnemyId == enemy_id ){ 
			return marker; 
		}
	}
	return null;
}
//==============================
// * 物体容器 - 获取简单 - 根据绑定图片（接口，一对一）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSimpleMarkerByPictureId = function( picture_id ){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true &&
			marker._drill_bindingPictureId == picture_id ){ 
			return marker; 
		}
	}
	return null;
}
//==============================
// * 物体容器 - 获取简单 - 根据绑定鼠标（接口，一对一）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSimpleMarkerByMouse = function(){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true &&
			marker._drill_bindingMouse == true ){ 
			return marker; 
		}
	}
	return null;
}
//==============================
// * 物体容器 - 获取高级 - 根据绑定事件（接口，多对多）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSeniorMarkerByCharacterId = function( character_id ){
	var result_list = [];
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true ){ continue; } 
		if( marker._drill_bindingCharacterId == character_id ){ 
			result_list.push( marker ); 
		}
	}
	return result_list;
}
//==============================
// * 物体容器 - 获取高级 - 根据绑定角色（接口，多对多）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSeniorMarkerByActorId = function( actor_id ){
	var result_list = [];
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true ){ continue; } 
		if( marker._drill_bindingActorId == actor_id ){ 
			result_list.push( marker ); 
		}
	}
	return result_list;
}
//==============================
// * 物体容器 - 获取高级 - 根据绑定敌人（接口，多对多）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSeniorMarkerByEnemyId = function( enemy_id ){
	var result_list = [];
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true ){ continue; } 
		if( marker._drill_bindingEnemyId == enemy_id ){ 
			result_list.push( marker ); 
		}
	}
	return result_list;
}
//==============================
// * 物体容器 - 获取高级 - 根据绑定图片（接口，多对多）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSeniorMarkerByPictureId = function( picture_id ){
	var result_list = [];
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true ){ continue; } 
		if( marker._drill_bindingPictureId == picture_id ){ 
			result_list.push( marker ); 
		}
	}
	return result_list;
}
//==============================
// * 物体容器 - 获取高级 - 根据绑定鼠标（接口，多对多）
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSeniorMarkerByMouse = function(){
	var result_list = [];
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true ){ continue; } 
		if( marker._drill_bindingMouse == true ){ 
			result_list.push( marker ); 
		}
	}
	return result_list;
}
//==============================
// * 物体容器 - 获取高级 - 根据Id（接口）
//
//			说明：	Id仅限高级透视镜使用，不包括简单透视镜。
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getSeniorMarkerById = function( id ){
	for(var i=0; i < this._drill_tank.length; i++ ){
		var marker = this._drill_tank[i];
		if( marker._drill_isSimple == true ){ continue; } 
		if( marker._drill_id == id ){ 
			return marker;
		}
	}
	return null;
}
//==============================
// * 物体容器 - 获取未使用的高级透视镜Id（接口）
//
//			说明：	在指定id的范围内，获取到空的id，用于创建。
//==============================
Drill_CODM_PerspectiveMarkerContainer.prototype.drill_CODM_getEmptyId = function( range_min, range_max ){
	for(var i = range_min; i <= range_max; i++ ){
		var marker = this.drill_CODM_getSeniorMarkerById( i );
		if( marker == null ){ return i; }
	}
	return -1;
}

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

//=============================================================================
// ** 核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 屏蔽根据版本重刷地图
//
//			说明：	此功能会刷掉旧存档的存储数据，因为版本不一样会强制重进地图。
//					而这样做只是 刷新旧存档的当前地图而已，没任何好处。
//==============================
Scene_Load.prototype.reloadMapIfUpdated = function() {
	// （禁止重刷）
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfDynamicMask = false;
		alert(
			"【Drill_CoreOfDynamicMask.js  系统 - 动态遮罩核心】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics  系统-弹道核心"
		);
}


