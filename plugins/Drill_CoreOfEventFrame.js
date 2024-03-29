//=============================================================================
// Drill_CoreOfEventFrame.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        行走图 - 行走图优化核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfEventFrame +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件对底层进行直接优化，减少行走图底层的性能消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 细节：
 *   (1.注意，此插件会根据条件，强制关闭不符合的行走图贴图的工作。
 *      可能会造成一些其它外部插件 失效 或 出现找不到数据问题。
 *   (2.此插件的消耗与事件数量呈正比，需要实时监听工作情况，因此消耗
 *      较多。但这能保证其他所有行走图相关插件低消耗。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   去各个管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【143.52ms】
 *              100个事件的地图中，平均消耗为：【86.82ms】
 *               50个事件的地图中，平均消耗为：【41.29ms】
 * 测试方法2：  让所有事件出现在镜头内。
 * 测试结果2：  镜头内有200个事件，平均消耗为：【229.30ms】
 *              镜头内有100个事件，平均消耗为：【106.21ms】
 *              镜头内有50个事件，平均消耗为：【54.60ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.此插件的性能消耗与事件直接成正比，因为一个事件对应一个行走图，
 *   是几乎一比一的消耗。关闭此插件并不能减少消耗，因为此插件只是把
 *   底层的消耗转移到此插件并显示了出来。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了部分脚本的规范。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COEF（Core_Of_Event_Frame）
//		临时全局变量	DrillUp.g_COEF_xxx
//		临时局部变量	this._drill_COEF_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.straighten（覆写）
//						Game_CharacterBase.prototype.isOriginalPattern（覆写）
//						Game_CharacterBase.prototype.resetPattern（覆写）
//						Game_Event.prototype.isOriginalPattern（覆写）
//						Game_Event.prototype.resetPattern（覆写）
//						Sprite_Character.prototype.isTile（覆写）
//						Sprite_Character.prototype.characterBlockX（覆写）
//						Sprite_Character.prototype.characterBlockY（覆写）
//						Sprite_Character.prototype.characterPatternX（覆写）
//						Sprite_Character.prototype.characterPatternY（覆写）
//						Sprite_Character.prototype.patternWidth（覆写）
//						Sprite_Character.prototype.patternHeight（覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	各个管理层跑一圈
//		★性能测试消耗	200个事件：229.3ms（drill_COEF_updateValue_BlockX）191.2ms（drill_COEF_updateValue_PatternWidth）
//						50个事件：24.5ms（drill_COEF_updateValue_BlockX）26.0ms（drill_COEF_updateValue_PatternWidth）
//		★最坏情况		暂无
//		★备注			设置了 优化策略 之后，优化的是其他子插件的性能。
//						当前插件的消耗并没有优化多少。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			
//			->☆管辖权
//			->☆原型链规范（Sprite_Character）
//			->☆核心漏洞修复 - 行走图贴图
//			->☆核心漏洞修复 - 初始帧
//			
//			->☆行走图 参数优化
//			->☆行走图 固定帧初始值
//				> 可见
//				> x、y、z
//				> 旋转
//				> 缩放x
//				> 缩放y
//				> 斜切x
//				> 斜切y
//			->☆行走图 优化策略
//				->必要执行函数（开放接口）
//				->允许第一次帧刷新
//				->镜头范围外时，不工作
//			->☆行走图 贴图框架标记？
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
//		★核心说明：
//			无
//		
//		★必要注意事项：
//			1."_pattern"与方向没有直接关系，方向和帧数 是两个独立功能。
//			2."_originalPattern"原先只有事件有，这里强加给了所有物体。
//			
//		★其它说明细节：
//			1.所有 物体动画帧 相关函数：
//				Game_CharacterBase.prototype.updateAnimation
//				Game_CharacterBase.prototype.updateAnimationCount
//				Game_CharacterBase.prototype.updatePattern
//				Game_CharacterBase.prototype.animationWait
//				Game_CharacterBase.prototype.maxPattern
//				Game_CharacterBase.prototype.pattern
//				Game_CharacterBase.prototype.setPattern
//				Game_CharacterBase.prototype.straighten（覆写）
//				Game_CharacterBase.prototype.isOriginalPattern（覆写）
//				Game_CharacterBase.prototype.resetPattern（覆写）
//				Game_Event.prototype.isOriginalPattern（覆写）
//				Game_Event.prototype.resetPattern（覆写）
//			其中，物体的 Game_CharacterBase.prototype.updateAnimation 函数为主入口，帧刷新确定 当前帧数。
//	
//			2.所有 贴图动画帧 相关函数：
//				Sprite_Character.prototype.updateFrame
//				Sprite_Character.prototype.isTile（覆写）
//				Sprite_Character.prototype.tilesetBitmap
//				Sprite_Character.prototype.updateTileFrame
//				Sprite_Character.prototype.updateCharacterFrame
//				Sprite_Character.prototype.characterBlockX（覆写）
//				Sprite_Character.prototype.characterBlockY（覆写）
//				Sprite_Character.prototype.characterPatternX（覆写）
//				Sprite_Character.prototype.characterPatternY（覆写）
//				Sprite_Character.prototype.patternWidth（覆写）
//				Sprite_Character.prototype.patternHeight（覆写）
//			考虑到后续插件的继承情况，单纯的 数据获取函数 需要重置。
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
	DrillUp.g_COEF_PluginTip_curName = "Drill_CoreOfEventFrame.js 行走图-行走图优化核心";
	DrillUp.g_COEF_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_COEF_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_COEF_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfEventFrame = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfEventFrame');
	
	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * A显示属性『行走图优化核心』 - 显示属性（rmmv勾选 - 是否透明）
//
//			说明：	> 注意，此函数从父类就在帧刷新中不断赋值visible。
//==============================
Sprite_Character.prototype.updateVisibility = function(){
    Sprite_Base.prototype.updateVisibility.call(this);
    if( this._character.isTransparent() ){
        this.visible = false;
    }
};

//==============================
// * B动画『行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.updateAnimation = function(){
    this.setupAnimation();
	
	// > 停止 B动画
    if( !this.isAnimationPlaying() ){
        this._character.endAnimation();
    }
	
	// > 停止 H气泡
    if( !this.isBalloonPlaying() ){
        this._character.endBalloon();
    }
};
//==============================
// * B动画『行走图优化核心』 - 动画播放监听
//==============================
Sprite_Character.prototype.setupAnimation = function(){
    if( this._character.animationId() > 0 ){
        var animation = $dataAnimations[this._character.animationId()];
        this.startAnimation(animation, false, 0);
        this._character.startAnimation();
    }
};

//==============================
// * C资源『行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.updateBitmap = function(){
    if( this.isImageChanged() ){
        this._tilesetId = $gameMap.tilesetId();
        this._tileId = this._character.tileId();
        this._characterName = this._character.characterName();
        this._characterIndex = this._character.characterIndex();
        if( this._tileId > 0 ){
            this.setTileBitmap();
        }else{
            this.setCharacterBitmap();
        }
    }
};
//==============================
// * C资源『行走图优化核心』 - 判断资源变化
//==============================
Sprite_Character.prototype.isImageChanged = function(){
    return (this._tilesetId !== $gameMap.tilesetId() ||
            this._tileId !== this._character.tileId() ||
            this._characterName !== this._character.characterName() ||
            this._characterIndex !== this._character.characterIndex());
};
//==============================
// * C资源『行走图优化核心』 - 设置 图块行走图
//==============================
Sprite_Character.prototype.setTileBitmap = function(){
    this.bitmap = this.tilesetBitmap(this._tileId);
};
//==============================
// * C资源『行走图优化核心』 - 设置 单行走图/八行走图
//==============================
Sprite_Character.prototype.setCharacterBitmap = function(){
    this.bitmap = ImageManager.loadCharacter(this._characterName);
    this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);	//（单行走图标记）
};

//==============================
// * D行走图『行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.updateFrame = function(){
	
	// > 图块行走图
	if( this._tileId > 0 ){
		this.updateTileFrame();
	
	// > 单行走图/八行走图
	}else{
		this.updateCharacterFrame();
	}
};
//==============================
// * D行走图『行走图优化核心』 - 图块行走图 - 访问器（这里有bug）
//==============================
Sprite_Character.prototype.isTile = function(){ return this._character.tileId > 0; };
//==============================
// * D行走图『行走图优化核心』 - 图块行走图 - 获取资源图片
//==============================
Sprite_Character.prototype.tilesetBitmap = function( tileId ){
    var tileset = $gameMap.tileset();
    var setNumber = 5 + Math.floor(tileId / 256);
    return ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
};
//==============================
// * D行走图『行走图优化核心』 - 图块行走图 - 帧刷新
//==============================
Sprite_Character.prototype.updateTileFrame = function(){
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (Math.floor(this._tileId / 128) % 2 * 8 + this._tileId % 8) * pw;
    var sy = Math.floor(this._tileId % 256 / 8) % 16 * ph;
    this.setFrame(sx, sy, pw, ph);
};

//==============================
// * D行走图『行走图优化核心』 - 单行走图/八行走图 - 帧刷新
//==============================
Sprite_Character.prototype.updateCharacterFrame = function(){
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
	
	// > E灌木丛 情况
    this.updateHalfBodySprites();
    if( this._bushDepth > 0 ){
        var d = this._bushDepth;
        this._upperBody.setFrame(sx, sy, pw, ph - d);
        this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
        this.setFrame(sx, sy, 0, ph);
	
	// > 默认情况
    }else{
        this.setFrame(sx, sy, pw, ph);
    }
};
//==============================
// * D行走图『行走图优化核心』 - 动画帧 - 帧数（横向）
//==============================
Sprite_Character.prototype.characterBlockX = function(){
	
	// > 单行走图
    if( this._isBigCharacter ){
        return 0;
		
	// > 八行走图
    }else{
        var index = this._character.characterIndex();
        return index % 4 * 3;
    }
};
//==============================
// * D行走图『行走图优化核心』 - 动画帧 - 帧数（纵向）
//==============================
Sprite_Character.prototype.characterBlockY = function(){
	
	// > 单行走图
    if( this._isBigCharacter ){
        return 0;
		
	// > 八行走图
    }else{
        var index = this._character.characterIndex();
        return Math.floor(index / 4) * 4;
    }
};
//==============================
// * D行走图『行走图优化核心』 - 动画帧 - 所在列（横向）
//==============================
Sprite_Character.prototype.characterPatternX = function(){
    return this._character.pattern();
};
//==============================
// * D行走图『行走图优化核心』 - 动画帧 - 所在行（纵向）
//==============================
Sprite_Character.prototype.characterPatternY = function(){
    return (this._character.direction() - 2) / 2;
};
//==============================
// * D行走图『行走图优化核心』 - 动画帧 - 宽度
//==============================
Sprite_Character.prototype.patternWidth = function(){
	
	// > 图块行走图
    if( this._tileId > 0 ){
        return $gameMap.tileWidth();
		
	// > 单行走图
    }else if( this._isBigCharacter ){
        return this.bitmap.width / 3;
		
	// > 八行走图
    }else{
        return this.bitmap.width / 12;
    }
};
//==============================
// * D行走图『行走图优化核心』 - 动画帧 - 高度
//==============================
Sprite_Character.prototype.patternHeight = function(){
	
	// > 图块行走图
    if( this._tileId > 0 ){
        return $gameMap.tileHeight();
		
	// > 单行走图
    }else if( this._isBigCharacter ){
        return this.bitmap.height / 4;
		
	// > 八行走图
    }else{
        return this.bitmap.height / 8;
    }
};

//==============================
// * E灌木丛『行走图优化核心』 - 创建切半透明图层
//==============================
Sprite_Character.prototype.createHalfBodySprites = function(){
    if( !this._upperBody ){
        this._upperBody = new Sprite();
        this._upperBody.anchor.x = 0.5;
        this._upperBody.anchor.y = 1;
        this.addChild(this._upperBody);
    }
    if( !this._lowerBody ){
        this._lowerBody = new Sprite();
        this._lowerBody.anchor.x = 0.5;
        this._lowerBody.anchor.y = 1;
        this._lowerBody.opacity = 128;
        this.addChild(this._lowerBody);
    }
};
//==============================
// * E灌木丛『行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.updateHalfBodySprites = function(){
    if( this._bushDepth > 0 ){
        this.createHalfBodySprites();
        this._upperBody.bitmap = this.bitmap;
        this._upperBody.visible = true;
        this._upperBody.y = - this._bushDepth;
        this._lowerBody.bitmap = this.bitmap;
        this._lowerBody.visible = true;
        this._upperBody.setBlendColor(this.getBlendColor());
        this._lowerBody.setBlendColor(this.getBlendColor());
        this._upperBody.setColorTone(this.getColorTone());
        this._lowerBody.setColorTone(this.getColorTone());
    }else if( this._upperBody ){
        this._upperBody.visible = false;
        this._lowerBody.visible = false;
    }
};

//==============================
// * F贴图属性『行走图优化核心』 - 帧刷新 位置
//==============================
Sprite_Character.prototype.updatePosition = function(){
    this.x = this._character.screenX();
    this.y = this._character.screenY();
    this.z = this._character.screenZ();
};
//==============================
// * F贴图属性『行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.updateOther = function(){
    this.opacity = this._character.opacity();			//贴图属性 - 透明度
    this.blendMode = this._character.blendMode();		//贴图属性 - 混合模式
    this._bushDepth = this._character.bushDepth();		//贴图属性 - E灌木丛 高度
};

//==============================
// * H气泡『行走图优化核心』 - 访问器
//==============================
Sprite_Character.prototype.isBalloonPlaying = function(){ return !!this._balloonSprite; };
//==============================
// * H气泡『行走图优化核心』 - 播放气泡
//==============================
Sprite_Character.prototype.startBalloon = function(){
    if( !this._balloonSprite ){
        this._balloonSprite = new Sprite_Balloon();
    }
    this._balloonSprite.setup(this._character.balloonId());
    this.parent.addChild(this._balloonSprite);
};
//==============================
// * H气泡『行走图优化核心』 - 停止气泡
//==============================
Sprite_Character.prototype.endBalloon = function(){
    if( this._balloonSprite ){
        this.parent.removeChild(this._balloonSprite);
        this._balloonSprite = null;
    }
};
//==============================
// * H气泡『行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.updateBalloon = function(){
    this.setupBalloon();
    if( this._balloonSprite ){
        this._balloonSprite.x = this.x;
        this._balloonSprite.y = this.y - this.height;
        if( !this._balloonSprite.isPlaying() ){
            this.endBalloon();
        }
    }
};
//==============================
// * H气泡『行走图优化核心』 - 气泡播放监听
//==============================
Sprite_Character.prototype.setupBalloon = function(){
    if( this._character.balloonId() > 0 ){
        this.startBalloon();
        this._character.startBalloon();
    }
};
*/


//=============================================================================
// ** ☆原型链规范（Sprite_Character）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图贴图（贴图）（底层） - A贴图属性
//==============================
//（无）
//==============================
// * 行走图贴图（贴图）（底层） - B贴图矩形 - 设置位置
//==============================
Sprite_Character.prototype.move = function( x, y ){
	Sprite.prototype.move.call( this, x, y );
};
//==============================
// * 行走图贴图（贴图）（底层） - B贴图矩形 - 矩形设置 基函数
//==============================
Sprite_Character.prototype.setFrame = function( x, y, width, height ){
	Sprite.prototype.setFrame.call( this, x, y, width, height );
};
//==============================
// * 行走图贴图（贴图）（底层） - B贴图矩形 - 矩形设置 基函数
//==============================
Sprite_Character.prototype._isInBitmapRect = function( x, y, w, h ){
	return Sprite.prototype._isInBitmapRect.call( this, x, y, w, h );
};
//==============================
// * 行走图贴图（贴图）（底层） - C贴图资源 - 回调函数 贴图资源 读取完毕时
//==============================
Sprite_Character.prototype._onBitmapLoad = function( bitmapLoaded ){
	Sprite.prototype._onBitmapLoad.call( this, bitmapLoaded );
};
//==============================
// * 行走图贴图（贴图）（底层） - C贴图资源 - 刷新框架
//==============================
Sprite_Character.prototype._refresh = function() {
	Sprite.prototype._refresh.call(this);
};
//==============================
// * 行走图贴图（贴图）（底层） - D调色板
//==============================
//（暂不考虑）
//==============================
// * 行走图贴图（贴图）（底层） - E渲染器
//==============================
//（暂不考虑）

//==============================
// * 行走图贴图（贴图基类） - 初始化
//==============================
//Sprite_Character.prototype.initialize = function() {
//    Sprite_Base.prototype.initialize.call(this);
//};
//==============================
// * 行走图贴图（贴图基类） - 帧刷新
//==============================
//Sprite_Character.prototype.update = function() {
//    Sprite_Base.prototype.update.call(this);
//};
//==============================
// * 行走图贴图（贴图基类） - A显示属性 - 隐藏
//==============================
Sprite_Character.prototype.hide = function() {
    Sprite_Base.prototype.hide.call(this);
};
//==============================
// * 行走图贴图（贴图基类） - A显示属性 - 显示
//==============================
Sprite_Character.prototype.show = function() {
    Sprite_Base.prototype.show.call(this);
};
//==============================
// * 行走图贴图（贴图基类） - A显示属性 - 帧刷新
//==============================
//Sprite_Character.prototype.updateVisibility = function() {
//    Sprite_Base.prototype.updateVisibility.call(this);
//};
//==============================
// * 行走图贴图（贴图基类） - B动画 - 帧刷新 动画贴图
//==============================
Sprite_Character.prototype.updateAnimationSprites = function() {
    Sprite_Base.prototype.updateAnimationSprites.call(this);
};
//==============================
// * 行走图贴图（贴图基类） - B动画 - 播放动画
//==============================
Sprite_Character.prototype.startAnimation = function( animation, mirror, delay ) {
    Sprite_Base.prototype.startAnimation.call( this, animation, mirror, delay );
};
//==============================
// * 行走图贴图（贴图基类） - B动画 - 是否正在播放动画
//==============================
Sprite_Character.prototype.isAnimationPlaying = function() {
    return Sprite_Base.prototype.isAnimationPlaying.call(this);
};



//=============================================================================
// ** ☆核心漏洞修复 - 行走图贴图
//			
//			说明：	> 原函数有bug，已修正。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * D行走图『行走图优化核心』 - 图块行走图 - 访问器（覆写）
//==============================
Sprite_Character.prototype.isTile = function(){
	return this._character._tileId > 0;
};


//=============================================================================
// ** ☆核心漏洞修复 - 初始帧
//			
//			原函数：	Game_CharacterBase.prototype.straighten
//						Game_CharacterBase.prototype.isOriginalPattern
//						Game_CharacterBase.prototype.resetPattern
//						Game_Event.prototype.isOriginalPattern
//						Game_Event.prototype.resetPattern
//			
//			说明：	> 强制设定初始帧，并覆写相关函数项，给其他插件方便扩展。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 初始帧 - 初始化
//==============================
var _drill_COEF_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	this._originalPattern = 1;				//初始帧（强制附加）
	_drill_COEF_initMembers.call(this);
};
//==============================
// * 初始帧 - 物体基类 - 重置初始帧（覆写）
//==============================
Game_CharacterBase.prototype.straighten = function() {
    if( this.hasWalkAnime() || this.hasStepAnime() ){
        this.resetPattern();
    }
    this._animationCount = 0;
};
//==============================
// * 初始帧 - 物体基类 - 恢复初始帧（覆写）
//==============================
Game_CharacterBase.prototype.resetPattern = function() {
    this.setPattern(this._originalPattern);
};
//==============================
// * 初始帧 - 物体基类 - 判断初始帧（覆写）
//==============================
Game_CharacterBase.prototype.isOriginalPattern = function() {
    return this.pattern() === this._originalPattern;
};
//==============================
// * 初始帧 - 物体 - 恢复初始帧（覆写）
//==============================
Game_Character.prototype.straighten = function() {
	Game_CharacterBase.prototype.straighten.call(this);
};
//==============================
// * 初始帧 - 物体 - 恢复初始帧（覆写）
//==============================
Game_Character.prototype.resetPattern = function() {
	Game_CharacterBase.prototype.resetPattern.call(this);
};
//==============================
// * 初始帧 - 物体 - 判断初始帧（覆写）
//==============================
Game_Character.prototype.isOriginalPattern = function() {
    return Game_CharacterBase.prototype.isOriginalPattern.call(this);
};
//==============================
// * 初始帧 - 事件 - 恢复初始帧（覆写）
//==============================
Game_Event.prototype.straighten = function() {
	Game_Character.prototype.straighten.call(this);
};
//==============================
// * 初始帧 - 事件 - 恢复初始帧（覆写）
//==============================
Game_Event.prototype.resetPattern = function() {
	Game_Character.prototype.resetPattern.call(this);
};
//==============================
// * 初始帧 - 事件 - 判断初始帧（覆写）
//==============================
Game_Event.prototype.isOriginalPattern = function() {
    return Game_Character.prototype.isOriginalPattern.call(this);
};
//==============================
// * 初始帧 - 玩家 - 恢复初始帧（覆写）
//==============================
Game_Player.prototype.straighten = function() {
	Game_Character.prototype.straighten.call(this);
};
//==============================
// * 初始帧 - 玩家 - 恢复初始帧（覆写）
//==============================
Game_Player.prototype.resetPattern = function() {
	Game_Character.prototype.resetPattern.call(this);
};
//==============================
// * 初始帧 - 玩家 - 判断初始帧（覆写）
//==============================
Game_Player.prototype.isOriginalPattern = function() {
    return Game_Character.prototype.isOriginalPattern.call(this);
};
//==============================
// * 初始帧 - 队员 - 恢复初始帧（覆写）
//==============================
Game_Follower.prototype.straighten = function() {
	Game_Character.prototype.straighten.call(this);
};
//==============================
// * 初始帧 - 队员 - 恢复初始帧（覆写）
//==============================
Game_Follower.prototype.resetPattern = function() {
	Game_Character.prototype.resetPattern.call(this);
};
//==============================
// * 初始帧 - 队员 - 判断初始帧（覆写）
//==============================
Game_Follower.prototype.isOriginalPattern = function() {
    return Game_Character.prototype.isOriginalPattern.call(this);
};
	
	
	
//=============================================================================
// ** ☆行走图 参数优化
//			
//			原函数：	Sprite_Character.prototype.characterBlockX
//						Sprite_Character.prototype.characterBlockY
//						Sprite_Character.prototype.characterPatternX
//						Sprite_Character.prototype.characterPatternY
//						Sprite_Character.prototype.patternWidth
//						Sprite_Character.prototype.patternHeight
//			
//			说明：	> 为了让其他插件继承不产生冗余的计算量，这里每帧都提前算一次，然后才被其他插件功能调用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图参数 - 初始化
//==============================
var _drill_COEF_sp_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function( character ){
	_drill_COEF_sp_initialize.call( this, character );
	this._drill_COEF_BlockX = 0;
	this._drill_COEF_BlockY = 0;
	this._drill_COEF_PatternX = 0;
	this._drill_COEF_PatternY = 0;
	this._drill_COEF_PatternWidth = 0;
	this._drill_COEF_PatternHeight = 0;
}
//==============================
// * 贴图参数 - 帧刷新
//==============================
var _drill_COEF_sp_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	
	// > 行走图赋值
	this.drill_COEF_updateValue_BlockX();
	this.drill_COEF_updateValue_BlockY();
	this.drill_COEF_updateValue_PatternX();
	this.drill_COEF_updateValue_PatternY();
	this.drill_COEF_updateValue_PatternWidth();
	this.drill_COEF_updateValue_PatternHeight();
	
	// > 原函数
	_drill_COEF_sp_update.call(this);
}
//==============================
// * 贴图参数 - 帧刷新 - 横向帧数
//==============================
Sprite_Character.prototype.drill_COEF_updateValue_BlockX = function(){
	if( this._character == undefined ){ return; }
	var xx = 0;
	
	// > 单行走图
	if( this._isBigCharacter ){
		xx = 0;
		
	// > 八行走图
	}else{
		var index = this._character.characterIndex();
		xx = index % 4 * 3;
	}
	
	this._drill_COEF_BlockX = xx;
}
//==============================
// * 贴图参数 - 帧刷新 - 纵向帧数
//==============================
Sprite_Character.prototype.drill_COEF_updateValue_BlockY = function(){
	if( this._character == undefined ){ return; }
	var yy = 0;
	
	// > 单行走图
    if( this._isBigCharacter ){
        yy = 0;
		
	// > 八行走图
    }else{
		var index = this._character.characterIndex();
		yy = Math.floor(index / 4) * 4;
    }
	
	this._drill_COEF_BlockY = yy;
}
//==============================
// * 贴图参数 - 帧刷新 - 所在列
//==============================
Sprite_Character.prototype.drill_COEF_updateValue_PatternX = function(){
	if( this._character == undefined ){ return; }
	this._drill_COEF_PatternX = this._character.pattern();
}
//==============================
// * 贴图参数 - 帧刷新 - 所在行
//==============================
Sprite_Character.prototype.drill_COEF_updateValue_PatternY = function(){
	if( this._character == undefined ){ return; }
    this._drill_COEF_PatternY = (this._character.direction() - 2) / 2;
}
//==============================
// * 贴图参数 - 帧刷新 - 宽度
//==============================
Sprite_Character.prototype.drill_COEF_updateValue_PatternWidth = function(){
	if( this.bitmap == undefined ){ return; }
	var ww = 0;
	
	// > 图块行走图
    if( this._tileId > 0 ){
        ww = $gameMap.tileWidth();
		
	// > 单行走图
    }else if( this._isBigCharacter ){
		ww = this.bitmap.width / 3;
		
	// > 八行走图
    }else{
		ww = this.bitmap.width / 12;
    }
	
	this._drill_COEF_PatternWidth = ww;
}
//==============================
// * 贴图参数 - 帧刷新 - 高度
//==============================
Sprite_Character.prototype.drill_COEF_updateValue_PatternHeight = function(){
	if( this.bitmap == undefined ){ return; }
	var hh = 0;
	
	// > 图块行走图
    if( this._tileId > 0 ){
        hh = $gameMap.tileHeight();
		
	// > 单行走图
    }else if( this._isBigCharacter ){
        hh = this.bitmap.height / 4;
		
	// > 八行走图
    }else{
        hh = this.bitmap.height / 8;
    }
	
	this._drill_COEF_PatternHeight = hh;
}

//==============================
// * 贴图参数 - 横向帧数（覆写）
//==============================
Sprite_Character.prototype.characterBlockX = function(){
	return this._drill_COEF_BlockX;
}
//==============================
// * 贴图参数 - 纵向帧数（覆写）
//==============================
Sprite_Character.prototype.characterBlockY = function(){
	return this._drill_COEF_BlockY;
}
//==============================
// * 贴图参数 - 所在列（覆写）
//==============================
Sprite_Character.prototype.characterPatternX = function(){
	return this._drill_COEF_PatternX;
}
//==============================
// * 贴图参数 - 所在列（覆写）
//==============================
Sprite_Character.prototype.characterPatternY = function(){
	return this._drill_COEF_PatternY;
}
//==============================
// * 贴图参数 - 所在列（覆写）
//==============================
Sprite_Character.prototype.patternWidth = function(){
	return this._drill_COEF_PatternWidth;
}
//==============================
// * 贴图参数 - 所在列（覆写）
//==============================
Sprite_Character.prototype.patternHeight = function(){
	return this._drill_COEF_PatternHeight;
}


//=============================================================================
// ** ☆行走图 固定帧初始值
//			
//			说明：	> 强制每帧都将 基础属性 都赋值一次，用于实现贴图 定量变化，防止 增量变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 固定帧初始值
//==============================
var _drill_COEF_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	
	// > 父类的函数 Sprite_Base.prototype.updateVisibility
	//	（每帧赋值 this.visible）
	
	// > 原函数
	//	（每帧赋值 this.x、this.y、this.z）
	_drill_COEF_updatePosition.call(this);
	
	this.rotation = 0;			// 旋转
	this.scale.x = 1;			// 缩放x
	this.scale.y = 1;			// 缩放y
	this.skew.x = 0;			// 斜切x
	this.skew.y = 0;			// 斜切y
};


//=============================================================================
// ** ☆行走图 优化策略
//
//			说明：	> 被优化的 行走图，不工作，不帧刷新。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 优化策略 - 必要执行函数（开放接口）
//==============================
Sprite_Character.prototype.drill_COEF_updateImportant = function(){
	
	//（如果有必须帧刷新且不能被优化的功能，继承此函数去执行。）
	
}
//==============================
// * 优化策略 - 必要执行函数 - 执行
//==============================
var _drill_COEF_spO_updateImportant = Sprite_Character.prototype.drill_COEF_updateImportant;
Sprite_Character.prototype.drill_COEF_updateImportant = function(){
	_drill_COEF_spO_updateImportant.call(this);
	
	// > 强制帧刷新z轴，防止z轴闪烁问题
	if( this._character != undefined ){
		this.z = this._character.screenZ();
	}
}
//==============================
// * 优化策略 - 阻塞判定
//==============================
Sprite_Character.prototype.drill_COEF_isOptimizationPassed = function(){
	
	// > 无物体对象，不工作
	if( this._character == undefined ){
		return false;
	}
	
	// > 镜头范围外时，不工作
	if( this.drill_COEF_posIsInCamera( this._character._realX, this._character._realY ) == false ){
		return false;
	}
	return true;
}
// > 强制更新提示 锁
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Sprite_Character.prototype.drill_COEF_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】镜头范围内+缩放
	
		// > 强制更新提示
		if( DrillUp.drill_LCa_isInScene_Map == undefined && DrillUp.g_LCa_alert == true ){ 
			alert( DrillUp.drill_COEF_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LCa_alert = false;
		}
		
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}
//==============================
// * 优化策略 - 最后继承
//
//			说明：	通过此函数使得优化策略 继承包裹 最外层的帧刷新结构。
//==============================
var _drill_COEF_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_COEF_scene_initialize.call(this);
	
	//==============================
	// * 优化策略 - 初始化
	//==============================
	var _drill_COEF_spO_initialize = Sprite_Character.prototype.initialize;
	Sprite_Character.prototype.initialize = function( character ){
		_drill_COEF_spO_initialize.call( this, character );
		this._drill_COEF_isFristUpdate = true;	//允许第一次帧刷新
	}
	
	//==============================
	// * 优化策略 - 帧刷新
	//==============================
	var _drill_COEF_spO_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function(){
		
		// > 优化策略 - 允许第一次帧刷新（考虑到部分插件可能会在 帧刷新 中初始化）
		if( this._drill_COEF_isFristUpdate == true ){
			this._drill_COEF_isFristUpdate = false;
		}else{
			
			// > 优化策略 - 必要执行函数
			this.drill_COEF_updateImportant();
			
			// > 优化策略 - 阻塞判定
			if( this.drill_COEF_isOptimizationPassed() == false ){ 
				this.visible = false;
				return;
			}
		}
		
		// > 原函数
		_drill_COEF_spO_update.call(this);
	}
}
