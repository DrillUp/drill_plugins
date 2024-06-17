//=============================================================================
// Drill_CoreOfEventFrame.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - 行走图优化核心
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
 * 该插件对底层进行直接控制，减少行走图底层的性能消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.详细内容可以去看看 "16.行走图 > 关于行走图优化核心.docx"。
 * 碰撞体：
 *   (1.你可以通过插件指令"DEBUG碰撞体查看"查看行走图的碰撞体范围。
 *      行走图进行 平移/缩放/斜切/旋转 变换时，都会影响碰撞体的形状。
 * 细节：
 *   (1.此插件会根据条件，强制关闭一些不需要的行走图贴图工作。
 *      可能会造成一些其它外部插件 失效 或 出现找不到属性 的问题。
 *   (2.此插件的消耗与事件数量呈正比，需要实时监听工作情况，因此消耗
 *      较多。但这能保证其他所有行走图相关插件低消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>行走图优化核心 : DEBUG碰撞体查看 : 开启
 * 插件指令：>行走图优化核心 : DEBUG碰撞体查看 : 关闭
 * 
 * 插件指令：>行走图优化核心 : DEBUG堆叠级查看 : 开启
 * 插件指令：>行走图优化核心 : DEBUG堆叠级查看 : 关闭
 * 
 * 1."DEBUG碰撞体查看"能显示所有贴图的碰撞体范围。
 *   "DEBUG堆叠级查看"能显示所有贴图的层级和堆叠级。
 * 2.查看堆叠级时，由于 层级 的名词太长，这里简化成两个字，
 *   "物原"表示"物体原层级"，"物上"表示"物体上层"，"上层"表示"上层"。
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
 * [v1.2]
 * 添加了碰撞体的定义，堆叠级的定义。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COEF（Core_Of_Event_Frame）
//		临时全局变量	DrillUp.g_COEF_xxx
//		临时局部变量	this._drill_COEF_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.screenX（覆写）
//						Game_CharacterBase.prototype.screenY（覆写）
//						Sprite_Character.prototype.updatePosition（覆写）
//						Sprite_Character.prototype.updateOther（覆写）
//						Game_CharacterBase.prototype.straighten（覆写）
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
//						Tilemap.prototype._sortChildren（覆写）
//						Tilemap.prototype._compareChildOrder（覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	各个管理层跑一圈
//		★性能测试消耗	2024/5/2：
//							》200个事件：229.3ms（drill_COEF_updateValue_BlockX）191.2ms（drill_COEF_updateValue_PatternWidth）
//							》50个事件：24.5ms（drill_COEF_updateValue_BlockX）26.0ms（drill_COEF_updateValue_PatternWidth）
//							》堆叠级相关消耗：28.8ms（drill_COEF_refreshSortValue）
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
//			->☆插件指令
//			->☆存储数据
//			->☆物体贴图
//			
//			->☆管辖权 - 行走图数据
//			->☆管辖权 - 行走图贴图【全权接管 Sprite_Character】
//			->☆管辖权 - 图块贴图
//			
//			->☆原型链规范（Sprite_Character）
//			->☆核心漏洞修复 - 行走图贴图
//			->☆核心漏洞修复 - 初始帧
//			
//			->☆数据最终变换值『物体数据最终变换值』『变换特性的规范』
//				->基础特性
//					>  资源名
//					x> 可见
//					>  混合模式
//					>  层级
//					>  堆叠级
//				->变换特性『变换特性-单贴图』
//					x> 锚点X
//					x> 锚点Y
//					>  位置X
//					>  位置Y
//					>  缩放X
//					>  缩放Y
//					>  透明度
//					>  斜切X
//					>  斜切Y
//					>  旋转
//					x> 转速
//				->其它特性
//					>  累积位置X
//					>  累积位置Y
//			->☆固定帧初始值
//				->贴图帧刷新 位置（覆写）
//					->位置X
//					->位置Y
//				->贴图帧刷新 其他属性（覆写）
//					->透明度
//				->贴图帧刷新 缩放
//					->缩放X
//					->缩放Y
//				->贴图帧刷新 斜切
//					->斜切X
//					->斜切Y
//				->贴图帧刷新 旋转
//					->旋转
//			
//			->☆行走图 贴图参数优化
//				> 横向帧数
//				> 纵向帧数
//				> 所在列
//				> 所在行
//				> 行走图宽度
//				> 行走图高度
//			->☆行走图 优化策略
//				->必要执行函数（开放接口）
//				->允许第一次帧刷新
//				->镜头范围外时，不工作
//			
//			
//			->☆碰撞体
//				->绑定碰撞体【标准函数】
//				->解除碰撞体【标准函数】
//				->获取碰撞体【标准函数】
//				->绑定碰撞体时【标准接口】
//				->解除碰撞体时【标准接口】
//			->☆碰撞体的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->消除行走图
//					->消除行走图（command235）
//			->☆碰撞体赋值
//				->最后继承2级
//				->刷新 锚点/位置/缩放/斜切/旋转
//				->刷新框架
//			->碰撞体 实体类【Drill_COEF_CollisionBean】
//				->被动赋值（Sprite_Character）
//					> 可见
//					> 锚点/位置/缩放/斜切/旋转
//					> 贴图框架值
//			
//			->☆碰撞体判定
//				->点是否在当前碰撞体内【标准函数】
//				->所有点是否在当前碰撞体内【标准函数】
//				->获取当前碰撞体的全部顶点【标准函数】
//			->☆碰撞体判定实现
//				->获取矩形的四个顶点
//				->数学工具
//					->矩阵点的变换/点A绕点B旋转缩放斜切
//					->获取两点的叉乘/向量积
//					->判断点是否在凸多边形内
//			->☆DEBUG碰撞体范围
//			
//			
//			->☆行走图的地图层级
//			->☆层级与堆叠级
//				->刷新层级【标准函数】
//				->刷新堆叠级【标准函数】
//				->设置层级时【标准函数】
//				->设置堆叠级时【标准函数】
//			->☆层级与堆叠级排序
//			->☆层级控制
//			->☆堆叠级控制
//			->☆DEBUG层级与堆叠级
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			7.行走图 > 关于行走图优化核心（脚本）.docx
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
//			1.所有 固定帧初始值 相关函数：
//				Game_CharacterBase.prototype.screenX（覆写）
//				Game_CharacterBase.prototype.screenY（覆写）
//				Sprite_Character.prototype.updatePosition（覆写）
//				Sprite_Character.prototype.updateOther（覆写）
//				Sprite_Character.prototype.drill_COEF_updateScale
//				Sprite_Character.prototype.drill_COEF_updateSkew
//				Sprite_Character.prototype.drill_COEF_updateRotation
//			
//			2.所有 物体动画帧 相关函数：
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
//			3.所有 贴图动画帧 相关函数：
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
//			4.所有 地图层级 相关函数：
//				Tilemap.prototype._sortChildren（覆写）
//				Tilemap.prototype._compareChildOrder（覆写）
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
// ** ☆插件指令
//=============================================================================
var _drill_COEF_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COEF_pluginCommand.call(this, command, args);
	if( command === ">行走图优化核心" ){
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "DEBUG碰撞体查看" ){
				if( temp2 == "开启" ){
					$gameSystem._drill_COEF_DebugEnabled = true;
					$gameSystem._drill_COEFWM_DebugEnabled = false;	//（【行走图-行走图优化核心】防止重叠显示）
				}
				if( temp2 == "关闭" ){
					$gameSystem._drill_COEF_DebugEnabled = false;
				}
			}
			if( temp1 == "DEBUG堆叠级查看" ){
				if( temp2 == "开启" ){
					$gameSystem._drill_COEF_DebugZIndexEnabled = true;
				}
				if( temp2 == "关闭" ){
					$gameSystem._drill_COEF_DebugZIndexEnabled = false;
				}
			}
		}
		
	};
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_COEF_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COEF_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COEF_sys_initialize.call(this);
	this.drill_COEF_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COEF_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COEF_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COEF_saveEnabled == true ){	
		$gameSystem.drill_COEF_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COEF_initSysData();
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
Game_System.prototype.drill_COEF_initSysData = function() {
	this.drill_COEF_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COEF_checkSysData = function() {
	this.drill_COEF_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COEF_initSysData_Private = function() {
	
	this._drill_COEF_DebugEnabled = false;
	this._drill_COEF_DebugZIndexEnabled = false;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COEF_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COEF_DebugEnabled == undefined ){
		this.drill_COEF_initSysData();
	}
};


//#############################################################################
// ** 【标准模块】物体贴图 ☆物体贴图
//#############################################################################
//##############################
// * 物体贴图 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组     （物体贴图）
//          
//			说明：	> 此函数直接返回容器对象。不含镜像。
//##############################
Game_Temp.prototype.drill_COEF_getCharacterSpriteTank = function(){
	return this.drill_COEF_getCharacterSpriteTank_Private();
}
//##############################
// * 物体贴图 - 获取 - 根据事件ID【标准函数】
//			
//			参数：	> event_id 数字（事件ID）
//			返回：	> 贴图对象     （事件贴图）
//          
//			说明：	> -2表示玩家，1表示第一个事件的贴图。不含镜像。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_COEF_getCharacterSpriteByEventId = function( event_id ){
	return this.drill_COEF_getCharacterSpriteByEventId_Private( event_id );
}
//##############################
// * 物体贴图 - 获取 - 根据玩家队员索引【标准函数】
//			
//			参数：	> follower_index 数字（玩家队员索引）
//			返回：	> 贴图对象           （玩家队员贴图）
//          
//			说明：	> -2表示玩家，1表示第一个玩家队员的贴图。不含镜像。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_COEF_getCharacterSpriteByFollowerIndex = function( follower_index ){
	return this.drill_COEF_getCharacterSpriteByFollowerIndex_Private( follower_index );
}
//=============================================================================
// ** 物体贴图（接口实现）
//=============================================================================
//==============================
// * 物体贴图容器 - 获取 - 容器指针（私有）
//          
//			说明：	> 贴图容器 _characterSprites，存放全部物体贴图，不含镜像贴图。
//					  这只是一个贴图容器，即使贴图在其他层级，也不影响容器获取到贴图。（更多细节去看 脚本文档说明）
//==============================
Game_Temp.prototype.drill_COEF_getCharacterSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._characterSprites;
};
//==============================
// * 物体贴图容器 - 获取 - 根据事件ID（私有）
//==============================
Game_Temp.prototype.drill_COEF_getCharacterSpriteByEventId_Private = function( event_id ){
	var sprite_list = this.drill_COEF_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }		//（判断 _character 就可以，不需要检验 Sprite_Character）
		if( event_id == -2 &&   //『玩家id』
			sprite._character == $gamePlayer ){
			return sprite;
		}
		if( sprite._character._eventId == event_id ){
			return sprite;
		}
	}
	return null;
};
//==============================
// * 物体贴图容器 - 获取 - 根据玩家索引（私有）
//==============================
Game_Temp.prototype.drill_COEF_getCharacterSpriteByFollowerIndex_Private = function( follower_index ){
	var sprite_list = this.drill_COEF_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }	//（判断 _character 就可以，不需要检验 Sprite_Character）
		if( follower_index == -2 &&   //『玩家id』
			sprite._character == $gamePlayer ){
			return sprite;
		}
		if( sprite._character._memberIndex == follower_index &&
			sprite._character.isVisible() ){
			return sprite;
		}
	}
	return null;
};
	
	
	
//=============================================================================
// ** ☆管辖权 - 行走图数据
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * A坐标『行走图-行走图优化核心』 - 该物体的 镜头图块位置X
//
//			说明：	> 单位图块。
//==============================
Game_CharacterBase.prototype.scrolledX = function(){
    return $gameMap.adjustX(this._realX);
};
//==============================
// * A坐标『行走图-行走图优化核心』 - 该物体的 镜头图块位置Y
//
//			说明：	> 单位图块。
//==============================
Game_CharacterBase.prototype.scrolledY = function(){
    return $gameMap.adjustY(this._realY);
};
//==============================
// * A坐标『行走图-行走图优化核心』 - 该物体的 镜头像素位置X
//
//			说明：	> 单位像素。
//==============================
Game_CharacterBase.prototype.screenX = function(){
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw + tw / 2);
};
//==============================
// * A坐标『行走图-行走图优化核心』 - 该物体的 镜头像素位置Y
//
//			说明：	> 单位像素。
//==============================
Game_CharacterBase.prototype.screenY = function(){
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th + th -
                      this.shiftY() - this.jumpHeight());
};
//==============================
// * A坐标『行走图-行走图优化核心』 - 该物体的 优先级位置Z
//==============================
Game_CharacterBase.prototype.screenZ = function(){
    return this._priorityType * 2 + 1;
};
*/

//=============================================================================
// ** ☆管辖权 - 行走图贴图【全权接管 Sprite_Character】
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*  管辖 - 创建贴图
//==============================
// * 3C行走图『行走图-行走图优化核心』 - 创建
//==============================
Spriteset_Map.prototype.createCharacters = function(){
    this._characterSprites = [];
	
	// > 事件的贴图
    $gameMap.events().forEach(function( event ){
        this._characterSprites.push(new Sprite_Character(event));
    }, this);
	
	// > 载具的贴图
    $gameMap.vehicles().forEach(function( vehicle ){
        this._characterSprites.push(new Sprite_Character(vehicle));
    }, this);
	
	// > 跟随队员的贴图
    $gamePlayer.followers().reverseEach(function( follower ){
        this._characterSprites.push(new Sprite_Character(follower));
    }, this);
	
	// > 玩家的贴图
    this._characterSprites.push(new Sprite_Character($gamePlayer));
    
	// > 全部添加到 3A图块层 中（根据 z轴y轴 排序，可见 Tilemap.prototype._sortChildren ）
	for (var i = 0; i < this._characterSprites.length; i++ ){
        this._tilemap.addChild(this._characterSprites[i]);
    }
};
//==============================
// * 3C行走图『行走图-行走图优化核心』 - 隐藏全部
//
//			说明：	> 此函数在遇敌后的动画中触发。
//==============================
Spriteset_Map.prototype.hideCharacters = function(){
    for (var i = 0; i < this._characterSprites.length; i++ ){
        var sprite = this._characterSprites[i];
        if( !sprite.isTile() ){		//（去掉 图块事件 情况，但是此函数有bug，没过滤。最终隐藏全部行走图）
            sprite.hide();
        }
    }
};
*/
/*  管辖 - 贴图类
//==============================
// * 行走图贴图『行走图-行走图优化核心』 - 初始化
//==============================
Sprite_Character.prototype.initialize = function( character ){
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();				//初始化属性
    this.setCharacter(character);	//绑定物体
};
//==============================
// * 行走图贴图『行走图-行走图优化核心』 - 初始化属性
//==============================
Sprite_Character.prototype.initMembers = function(){
	
	this.anchor.x = 0.5;			//中心锚点x（固定正下方）
	this.anchor.y = 1;				//中心锚点y
	
	this._character = null;			//绑定物体
	
	this._tilesetId = 0;			//D行走图 - 图块行走图 标记
	this._isBigCharacter = false;	//D行走图 - 单行走图 标记（"$"）
	
	this._upperBody = null;			//E灌木丛 - 上半层贴图
	this._lowerBody = null;			//E灌木丛 - 下半层贴图
	
	this._balloonDuration = 0;		//H气泡（没用的变量）
};
//==============================
// * 行走图贴图『行走图-行走图优化核心』 - 绑定物体
//==============================
Sprite_Character.prototype.setCharacter = function( character ){
    this._character = character;
};
//==============================
// * 行走图贴图『行走图-行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.update = function(){
	Sprite_Base.prototype.update.call(this);
	this.updateBitmap();		//帧刷新 - C资源
	this.updateFrame();			//帧刷新 - D行走图
								//帧刷新 - E灌木丛（无）
	this.updatePosition();		//帧刷新 - F贴图属性 位置
	this.updateAnimation();		//帧刷新 - B动画
	this.updateBalloon();		//帧刷新 - H气泡
	this.updateOther();			//帧刷新 - F贴图属性 其他属性
};

//==============================
// * A显示属性『行走图-行走图优化核心』 - 显示属性（rmmv勾选 - 是否透明）
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
// * B动画『行走图-行走图优化核心』 - 帧刷新
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
// * B动画『行走图-行走图优化核心』 - 动画播放监听
//==============================
Sprite_Character.prototype.setupAnimation = function(){
    if( this._character.animationId() > 0 ){
        var animation = $dataAnimations[this._character.animationId()];
        this.startAnimation(animation, false, 0);
        this._character.startAnimation();
    }
};

//==============================
// * C资源『行走图-行走图优化核心』 - 帧刷新
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
// * C资源『行走图-行走图优化核心』 - 判断资源变化
//==============================
Sprite_Character.prototype.isImageChanged = function(){
    return (this._tilesetId !== $gameMap.tilesetId() ||
            this._tileId !== this._character.tileId() ||
            this._characterName !== this._character.characterName() ||
            this._characterIndex !== this._character.characterIndex());
};
//==============================
// * C资源『行走图-行走图优化核心』 - 设置 图块行走图
//==============================
Sprite_Character.prototype.setTileBitmap = function(){
    this.bitmap = this.tilesetBitmap(this._tileId);
};
//==============================
// * C资源『行走图-行走图优化核心』 - 设置 单行走图/八行走图
//==============================
Sprite_Character.prototype.setCharacterBitmap = function(){
    this.bitmap = ImageManager.loadCharacter(this._characterName);
    this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);	//（单行走图标记）
};

//==============================
// * D行走图『行走图-行走图优化核心』 - 帧刷新
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
// * D行走图『行走图-行走图优化核心』 - 图块行走图 - 访问器（这里有bug）
//==============================
Sprite_Character.prototype.isTile = function(){ return this._character.tileId > 0; };
//==============================
// * D行走图『行走图-行走图优化核心』 - 图块行走图 - 获取资源
//==============================
Sprite_Character.prototype.tilesetBitmap = function( tileId ){
    var tileset = $gameMap.tileset();
    var setNumber = 5 + Math.floor(tileId / 256);
    return ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
};
//==============================
// * D行走图『行走图-行走图优化核心』 - 图块行走图 - 帧刷新
//==============================
Sprite_Character.prototype.updateTileFrame = function(){
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (Math.floor(this._tileId / 128) % 2 * 8 + this._tileId % 8) * pw;
    var sy = Math.floor(this._tileId % 256 / 8) % 16 * ph;
    this.setFrame(sx, sy, pw, ph);
};

//==============================
// * D行走图『行走图-行走图优化核心』 - 单行走图/八行走图 - 帧刷新
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
// * D行走图『行走图-行走图优化核心』 - 动画帧 - 帧数（横向）
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
// * D行走图『行走图-行走图优化核心』 - 动画帧 - 帧数（纵向）
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
// * D行走图『行走图-行走图优化核心』 - 动画帧 - 所在列（横向）
//==============================
Sprite_Character.prototype.characterPatternX = function(){
    return this._character.pattern();
};
//==============================
// * D行走图『行走图-行走图优化核心』 - 动画帧 - 所在行（纵向）
//==============================
Sprite_Character.prototype.characterPatternY = function(){
    return (this._character.direction() - 2) / 2;
};
//==============================
// * D行走图『行走图-行走图优化核心』 - 动画帧 - 宽度
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
// * D行走图『行走图-行走图优化核心』 - 动画帧 - 高度
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
// * E灌木丛『行走图-行走图优化核心』 - 创建切半透明图层
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
// * E灌木丛『行走图-行走图优化核心』 - 帧刷新
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
// * F贴图属性『行走图-行走图优化核心』 - 帧刷新 位置
//==============================
Sprite_Character.prototype.updatePosition = function(){
    this.x = this._character.screenX();
    this.y = this._character.screenY();
    this.z = this._character.screenZ();
};
//==============================
// * F贴图属性『行走图-行走图优化核心』 - 帧刷新
//==============================
Sprite_Character.prototype.updateOther = function(){
    this.opacity = this._character.opacity();			//贴图属性 - 透明度
    this.blendMode = this._character.blendMode();		//贴图属性 - 混合模式
    this._bushDepth = this._character.bushDepth();		//贴图属性 - E灌木丛 高度
};

//==============================
// * H气泡『行走图-行走图优化核心』 - 访问器
//==============================
Sprite_Character.prototype.isBalloonPlaying = function(){ return !!this._balloonSprite; };
//==============================
// * H气泡『行走图-行走图优化核心』 - 播放气泡
//==============================
Sprite_Character.prototype.startBalloon = function(){
    if( !this._balloonSprite ){
        this._balloonSprite = new Sprite_Balloon();
    }
    this._balloonSprite.setup(this._character.balloonId());
    this.parent.addChild(this._balloonSprite);
};
//==============================
// * H气泡『行走图-行走图优化核心』 - 停止气泡
//==============================
Sprite_Character.prototype.endBalloon = function(){
    if( this._balloonSprite ){
        this.parent.removeChild(this._balloonSprite);
        this._balloonSprite = null;
    }
};
//==============================
// * H气泡『行走图-行走图优化核心』 - 帧刷新
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
// * H气泡『行走图-行走图优化核心』 - 气泡播放监听
//==============================
Sprite_Character.prototype.setupBalloon = function(){
    if( this._character.balloonId() > 0 ){
        this.startBalloon();
        this._character.startBalloon();
    }
};
*/


//=============================================================================
// ** ☆管辖权 - 图块贴图
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//
//					> 注意，这里把图块底层 Tilemap 接管了，就为了实现 层级和堆叠级 的排序。
//=============================================================================
/*
//==============================
// * 帧刷新『行走图-行走图优化核心』 - 子贴图排序
//==============================
Tilemap.prototype._sortChildren = function(){
    this.children.sort(this._compareChildOrder.bind(this));
};
//==============================
// * 帧刷新『行走图-行走图优化核心』 - 子贴图排序 - 比较器（根据z轴y轴）
//==============================
Tilemap.prototype._compareChildOrder = function( a, b ){
    if( a.z !== b.z ){
        return a.z - b.z;
    }else if( a.y !== b.y ){
        return a.y - b.y;
    }else{
        return a.spriteId - b.spriteId;
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
// * D行走图『行走图-行走图优化核心』 - 图块行走图 - 访问器（覆写）
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
// ** ☆数据最终变换值
//			
//			说明：	> 这些值用于贴图变换，由于 叠加的子插件 较多，所以这里统一函数。
//					  注意，这里都是 变换特性 。
//					> 锚点虽然算 变换特性，但是对贴图结构有非常大的影响，所以子插件不能乱改。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//##############################
// * 数据最终变换值 - 位置X（开放函数）
//##############################
//	（没有 drill_COEF_finalTransform_x()，数据最终变换值X就是：screenX() ）
//
//##############################
// * 数据最终变换值 - 位置Y（开放函数）
//##############################
//	（没有 drill_COEF_finalTransform_y()，数据最终变换值Y就是：screenY() ）
//

//##############################
// * 数据最终变换值 - 累积位置X（开放函数）
//
//			说明：	> 子插件可继承此函数，使用 像素单位。
//					  子插件要么继承 screenX，要么继承该函数，不要重复继承。
//##############################
Game_CharacterBase.prototype.drill_COEF_acc_x = function(){ return 0; };
//##############################
// * 数据最终变换值 - 累积位置Y（开放函数）
//
//			说明：	> 子插件可继承此函数，使用 像素单位。
//					  子插件要么继承 screenY，要么继承该函数，不要重复继承。
//##############################
Game_CharacterBase.prototype.drill_COEF_acc_y = function(){ return 0; };
//##############################
// * 数据最终变换值 - 累积位置X - 倒影镜像用（开放函数）
//##############################
Game_CharacterBase.prototype.drill_COEF_acc_LRR_x = function(){ return 0; };
//##############################
// * 数据最终变换值 - 累积位置Y - 倒影镜像用（开放函数）
//##############################
Game_CharacterBase.prototype.drill_COEF_acc_LRR_y = function(){ return 0; };
//##############################
// * 数据最终变换值 - 累积位置X - 同步镜像用（开放函数）
//##############################
Game_CharacterBase.prototype.drill_COEF_acc_LSR_x = function(){ return 0; };
//##############################
// * 数据最终变换值 - 累积位置Y - 同步镜像用（开放函数）
//##############################
Game_CharacterBase.prototype.drill_COEF_acc_LSR_y = function(){ return 0; };
	
//##############################
// * 数据最终变换值 - 缩放X（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_CharacterBase.prototype.drill_COEF_finalTransform_scaleX = function(){
	return 1.00;
};
//##############################
// * 数据最终变换值 - 缩放Y（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_CharacterBase.prototype.drill_COEF_finalTransform_scaleY = function(){
	return 1.00;
};
//##############################
// * 数据最终变换值 - 透明度（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 透明度值0~255。
//##############################
Game_CharacterBase.prototype.drill_COEF_finalTransform_opacity = function(){
	return this._opacity;
};
//##############################
// * 数据最终变换值 - 斜切X（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_CharacterBase.prototype.drill_COEF_finalTransform_skewX = function(){
	return 0.00;
};
//##############################
// * 数据最终变换值 - 斜切Y（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_CharacterBase.prototype.drill_COEF_finalTransform_skewY = function(){
	return 0.00;
};
//##############################
// * 数据最终变换值 - 旋转（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 角度单位。
//##############################
Game_CharacterBase.prototype.drill_COEF_finalTransform_rotate = function(){
	return 0;
};

//==============================
// * 数据最终变换值 - 该物体的 镜头像素位置X（覆写）
//==============================
Game_CharacterBase.prototype.screenX = function(){
    var tw = $gameMap.tileWidth();
	var xx = this.scrolledX()*tw + tw*0.5;
    return xx;		//（不执行Math.round）
};
//==============================
// * 数据最终变换值 - 该物体的 镜头像素位置Y（覆写）
//==============================
Game_CharacterBase.prototype.screenY = function(){
    var th = $gameMap.tileHeight();
	var yy = this.scrolledY()*th + th;
	yy -= this.shiftY();
	yy -= this.jumpHeight();
    return yy;		//（不执行Math.round）
};
//==============================
// * 数据最终变换值 - 最后继承2级
//
//			说明：	> 继承要在 所有变换设置完 之后，所以使用2级。
//==============================
var _drill_COEF_scene_requestUpdateOnce = true;
var _drill_COEF_scene_requestUpdate = SceneManager.requestUpdate;
SceneManager.requestUpdate = function() {
	_drill_COEF_scene_requestUpdate.call(this);							//（注意此函数会执行多次）
	if( _drill_COEF_scene_requestUpdateOnce == undefined ){ return; }	//（继承一次后就跳出）
	_drill_COEF_scene_requestUpdateOnce = undefined;
	
	//==============================
	// * 数据最终变换值 - 位置X
	//
	//			说明：	> 此处叠加 screenX 与 drill_COEF_acc_x 的位置。
	//==============================
	var _drill_COEF_scene_screenX = Game_CharacterBase.prototype.screenX;
	Game_CharacterBase.prototype.screenX = function(){
		var xx = _drill_COEF_scene_screenX.call(this);
		return Math.round( xx + this.drill_COEF_acc_x() );	//（这里才执行Math.round）
	};
	//==============================
	// * 数据最终变换值 - 位置Y
	//
	//			说明：	> 此处叠加 screenY 与 drill_COEF_acc_y 的位置。
	//==============================
	var _drill_COEF_scene_screenY = Game_CharacterBase.prototype.screenY;
	Game_CharacterBase.prototype.screenY = function(){
		var yy = _drill_COEF_scene_screenY.call(this);
		return Math.round( yy + this.drill_COEF_acc_y() );	//（这里才执行Math.round）
	};
};


//=============================================================================
// ** ☆固定帧初始值『变换特性的规范』
//			
//			说明：	> 强制每帧都将 数据最终变换值 都赋值一次，用于实现贴图 定量变化，防止 增量变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 固定帧初始值 - 贴图帧刷新
//
//			说明：	> 注意，这里只标记变换的属性。
//==============================
var _drill_COEF_sp_fix_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	
	// > 原函数
	_drill_COEF_sp_fix_update.call(this);
		//this.updateBitmap();			//贴图帧刷新 - C资源
		//this.updateFrame();			//贴图帧刷新 - D行走图
		//this.updatePosition();		//贴图帧刷新 - F贴图属性 位置（位置X、位置Y）
		//this.updateAnimation();		//贴图帧刷新 - B动画
		//this.updateBalloon();			//贴图帧刷新 - H气泡
		//this.updateOther();			//贴图帧刷新 - F贴图属性 其他属性（透明度）
	
	// > 不修改锚点（锚点X、锚点Y）
	//	（固定锚点为 0.5,1.0 ）
	
	// > 贴图帧刷新 缩放（缩放X、缩放Y）
	this.drill_COEF_updateScale();
	
	// > 贴图帧刷新 斜切（斜切X、斜切Y）
	this.drill_COEF_updateSkew();
	
	// > 贴图帧刷新 旋转（旋转）
	this.drill_COEF_updateRotation();
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 位置（覆写）
//==============================
Sprite_Character.prototype.updatePosition = function(){
    this.x = this._character.screenX();		//（drill_COEF_acc_x 会叠加进 screenX 里面，screenX是最终值）
    this.y = this._character.screenY();		//（drill_COEF_acc_y 会叠加进 screenY 里面，screenY是最终值）
    this.z = this._character.screenZ();
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 其他属性（覆写）
//==============================
Sprite_Character.prototype.updateOther = function(){
    this.opacity = this._character.drill_COEF_finalTransform_opacity();		//贴图属性 - 透明度
    this.blendMode = this._character.blendMode();							//贴图属性 - 混合模式
    this._bushDepth = this._character.bushDepth();							//贴图属性 - E灌木丛 高度
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 缩放
//==============================
Sprite_Character.prototype.drill_COEF_updateScale = function() {
	this.scale.x = this._character.drill_COEF_finalTransform_scaleX();
	this.scale.y = this._character.drill_COEF_finalTransform_scaleY();
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 斜切
//==============================
Sprite_Character.prototype.drill_COEF_updateSkew = function() {
	this.skew.x = this._character.drill_COEF_finalTransform_skewX();
	this.skew.y = this._character.drill_COEF_finalTransform_skewY();
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 旋转
//==============================
Sprite_Character.prototype.drill_COEF_updateRotation = function() {
	this.rotation = this._character.drill_COEF_finalTransform_rotate() *Math.PI /180;
};


	
//=============================================================================
// ** ☆行走图 贴图参数优化
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
var _drill_COEF_sp_frame_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function( character ){
	_drill_COEF_sp_frame_initialize.call( this, character );
	this._drill_COEF_BlockX = 0;			//横向帧数
	this._drill_COEF_BlockY = 0;			//纵向帧数
	this._drill_COEF_PatternX = 0;			//所在列
	this._drill_COEF_PatternY = 0;			//所在行
	this._drill_COEF_PatternWidth = 0;		//行走图宽度
	this._drill_COEF_PatternHeight = 0;		//行走图高度
}
//==============================
// * 贴图参数 - 帧刷新
//==============================
var _drill_COEF_sp_frame_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	
	// > 行走图赋值
	this.drill_COEF_updateValue_BlockX();
	this.drill_COEF_updateValue_BlockY();
	this.drill_COEF_updateValue_PatternX();
	this.drill_COEF_updateValue_PatternY();
	this.drill_COEF_updateValue_PatternWidth();
	this.drill_COEF_updateValue_PatternHeight();
	
	// > 原函数
	_drill_COEF_sp_frame_update.call(this);
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




//#############################################################################
// ** 【标准模块】碰撞体 ☆碰撞体
//#############################################################################
//##############################
// * 碰撞体 - 绑定碰撞体【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在行走图数据 初始化时 执行，需要子插件手动调用。『节约事件数据存储空间』
//					> 该函数可以放在帧刷新中多次执行。
//##############################
Game_CharacterBase.prototype.drill_COEF_checkCollisionBean = function(){
	if( this._drill_COEF_collisionBean != undefined ){ return; }
	this._drill_COEF_collisionBean = new Drill_COEF_CollisionBean();
	this.drill_COEF_whenCheckedCollisionBean();
}
//##############################
// * 碰撞体 - 解除碰撞体【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在行走图数据 解除绑定时 执行，需要子插件手动调用。
//					> 如果行走图数据是整个被删除，则可以不执行此函数。
//##############################
Game_CharacterBase.prototype.drill_COEF_removeCollisionBean = function(){
	this._drill_COEF_collisionBean = undefined;
	this.drill_COEF_whenRemovedCollisionBean();
}
//##############################
// * 碰撞体 - 获取碰撞体【标准函数】
//
//			参数：	> 无
//			返回：	> 碰撞体对象
//##############################
Game_CharacterBase.prototype.drill_COEF_getCollisionBean = function(){
	return this._drill_COEF_collisionBean;
}
//##############################
// * 碰撞体 - 绑定碰撞体时【标准接口】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 常规情况下这个接口用不上，因为直接获取 碰撞体 就足够了。
//					  如果子插件有特殊功能，要与 碰撞体 数据一对一扩展，
//					  可以继承此函数，用于在 绑定碰撞体 之后执行的操作。
//##############################
Game_CharacterBase.prototype.drill_COEF_whenCheckedCollisionBean = function(){
	
	//（待子类继承写内容）
	
}
//##############################
// * 碰撞体 - 解除碰撞体时【标准接口】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 常规情况下这个接口用不上，因为直接获取 碰撞体 就足够了。
//					  如果子插件有特殊功能，要与 碰撞体 数据一对一扩展，
//					  可以继承此函数，用于在 解除碰撞体 之后执行的操作。
//##############################
Game_CharacterBase.prototype.drill_COEF_whenRemovedCollisionBean = function(){
	
	//（待子类继承写内容）
	
}


//=============================================================================
// ** ☆碰撞体的属性
//
//			说明：	> 此模块专门定义 碰撞体的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 碰撞体的属性 - 初始化
//==============================
var _drill_COEF_collision_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	this._drill_COEF_collisionBean = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_COEF_collision_initialize.call(this);
}
//==============================
// * 碰撞体的属性 - 消除行走图
//==============================
var _drill_COEF_collision_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function(){
	_drill_COEF_collision_erase.call( this );
	this.drill_COEF_removeCollisionBean();			//（删除数据）
}


//=============================================================================
// ** ☆碰撞体赋值
//			
//			说明：	> 此模块专门 对碰撞体进行 赋值。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 碰撞体赋值 - 最后继承2级
//
//			说明：	> 继承要在 最后继承 之后，所以使用2级。
//==============================
var _drill_COEF_scene_collision_requestUpdateOnce = true;
var _drill_COEF_scene_collision_requestUpdate = SceneManager.requestUpdate;
SceneManager.requestUpdate = function() {
	_drill_COEF_scene_collision_requestUpdate.call(this);							//（注意此函数会执行多次）
	if( _drill_COEF_scene_collision_requestUpdateOnce == undefined ){ return; }	//（继承一次后就跳出）
	_drill_COEF_scene_collision_requestUpdateOnce = undefined;
	
	//==============================
	// * 碰撞体赋值 - 帧刷新
	//
	//			说明：	> 注意，此帧刷新的实体类赋值，会比行走图数据慢一帧。
	//					  先帧刷新Game_CharacterBase，后帧刷新Sprite_Character。
	//					> 子插件（比如拖拽、鼠标悬停触发行走图）必须自己考虑特殊情况。『鼠标悬停行走图慢一帧』
	//==============================
	var _drill_COEF_collision_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function() {
		_drill_COEF_collision_update.call(this);
		
		var character = this._character;
		if( character == undefined ){ return; }
		if( character._drill_COEF_collisionBean == undefined ){ return; }
		
		this.drill_COEF_updateCollisionPosition();			//帧刷新 - 刷新位置
		this.drill_COEF_updateCollisionRefreshFrame();		//帧刷新 - 刷新框架
	};
}
//==============================
// * 碰撞体赋值 - 帧刷新 - 刷新 锚点/位置/缩放/斜切/旋转
//==============================
Sprite_Character.prototype.drill_COEF_updateCollisionPosition = function() {
	var character = this._character;
	var bean = character._drill_COEF_collisionBean;
	
	// > 数据最终变换值
	var xx = character.screenX();		//（drill_COEF_acc_x 会叠加进 screenX 里面，screenX是最终值）
	var yy = character.screenY();		//（drill_COEF_acc_y 会叠加进 screenY 里面，screenY是最终值）
	bean.drill_bean_setAnchor( this.anchor.x, this.anchor.y );
	bean.drill_bean_setPosition( xx, yy );
	bean.drill_bean_setScale( character.drill_COEF_finalTransform_scaleX(), character.drill_COEF_finalTransform_scaleY() );
	if( this.skew != undefined ){
		bean.drill_bean_setSkew( character.drill_COEF_finalTransform_skewX(), character.drill_COEF_finalTransform_skewY() );
	}
	bean.drill_bean_setRotate( character.drill_COEF_finalTransform_rotate() *Math.PI /180 );
	
	//// > 贴图属性（不采用）
	//bean.drill_bean_setAnchor( this.anchor.x, this.anchor.y );
	//bean.drill_bean_setPosition( this.x, this.y );
	//bean.drill_bean_setScale(  this.scale.x,  this.scale.y  );
	//if( this.skew != undefined ){
	//	bean.drill_bean_setSkew( this.skew.x, this.skew.y );
	//}
	//bean.drill_bean_setRotate( this.rotation  );
};
//==============================
// * 碰撞体赋值 - 帧刷新 - 刷新框架
//==============================
Sprite_Character.prototype.drill_COEF_updateCollisionRefreshFrame = function() {
	var bean = this._character._drill_COEF_collisionBean;
	
	if( bean._drill_frameW == 0 ||	//（宽度为零的时候，执行刷新）
		bean._drill_frameH == 0 ){ 
		this.drill_COEF__refreshFrame();
	}
};
//==============================
// * 碰撞体赋值 - 刷新框架『贴图框架值』（_realFrame）
//
//			说明：	> 此处 非帧刷新，而是在 贴图底层 发生刷新改变时，才变化值。
//==============================
var _drill_COEF_collision__refresh = Sprite_Character.prototype._refresh;
Sprite_Character.prototype._refresh = function(){
	_drill_COEF_collision__refresh.call( this );
	this.drill_COEF__refreshFrame();
}
//==============================
// * 碰撞体赋值 - 刷新框架
//
//			说明：	> 由于Bean会被随时销毁，所以该函数要在帧刷新中执行。
//==============================
Sprite_Character.prototype.drill_COEF__refreshFrame = function(){
	if( this._character == undefined ){ return; }
	if( this._character._drill_COEF_collisionBean == undefined ){ return; }
	
	// > 条件 - 未读取时不赋值
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 条件 - 不接受宽度为0的标记
	if( this._realFrame.width == 0 ){ return; }
	if( this._realFrame.height == 0 ){ return; }
	
	// > 刷新框架
	this._character._drill_COEF_collisionBean.drill_bean_resetFrame(
		this._realFrame.x,
		this._realFrame.y,
		this._realFrame.width,
		this._realFrame.height 
	);
};


//=============================================================================
// ** 碰撞体 实体类【Drill_COEF_CollisionBean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **					->被动赋值（Sprite_Character）
// **						> 可见
// **						> 锚点/位置/缩放/斜切/旋转
// **						> 贴图框架值
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameScreen 中。
// **				> 该类没有帧刷新，只能通过函数被动赋值。
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_COEF_CollisionBean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_COEF_CollisionBean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_bean_initData();											//私有数据初始化
};
//##############################
// * 实体类 - 显示/隐藏【开放函数】
//			
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_COEF_CollisionBean.prototype.drill_bean_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 实体类 - 设置锚点【开放函数】
//			
//			参数：	> anchor_x 数字
//					> anchor_y 数字
//			返回：	> 无
//##############################
Drill_COEF_CollisionBean.prototype.drill_bean_setAnchor = function( anchor_x, anchor_y ){
	this._drill_anchor_x = anchor_x;
	this._drill_anchor_y = anchor_y;
};
//##############################
// * 实体类 - 设置位置【开放函数】
//			
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//##############################
Drill_COEF_CollisionBean.prototype.drill_bean_setPosition = function( x, y ){
	this._drill_x = x;
	this._drill_y = y;
};
//##############################
// * 实体类 - 设置缩放值【开放函数】
//			
//			参数：	> scale_x 数字
//					> scale_y 数字
//			返回：	> 无
//##############################
Drill_COEF_CollisionBean.prototype.drill_bean_setScale = function( scale_x, scale_y ){
	this._drill_scale_x = scale_x;
	this._drill_scale_y = scale_y;
};
//##############################
// * 实体类 - 设置斜切值【开放函数】
//			
//			参数：	> skew_x 数字
//					> skew_y 数字
//			返回：	> 无
//##############################
Drill_COEF_CollisionBean.prototype.drill_bean_setSkew = function( skew_x, skew_y ){
	this._drill_skew_x = skew_x;
	this._drill_skew_y = skew_y;
};
//##############################
// * 实体类 - 设置旋转值【开放函数】
//			
//			参数：	> rotate 数字（弧度）
//			返回：	> 无
//##############################
Drill_COEF_CollisionBean.prototype.drill_bean_setRotate = function( rotate ){
	this._drill_rotate = rotate;
};
//##############################
// * 实体类 - 设置框架【开放函数】
//			
//			参数：	> frameX,frameY,frameW,frameH 矩形对象
//			返回：	> 无
//			
//			说明：	> 被动赋值，见 刷新框架 函数。
//##############################
Drill_COEF_CollisionBean.prototype.drill_bean_resetFrame = function( frameX, frameY, frameW, frameH ){
	this._drill_frameX = frameX;
	this._drill_frameY = frameY;
	this._drill_frameW = frameW;
	this._drill_frameH = frameH;
};
//==============================
// * 实体类 - 私有数据初始化
//==============================
Drill_COEF_CollisionBean.prototype.drill_bean_initData = function(){
	
	this._drill_visible = true;				//实体类 - 可见
	
	this._drill_anchor_x = 0;				//实体类 - 锚点X
	this._drill_anchor_y = 0;				//实体类 - 锚点Y
	
	this._drill_x = 0;						//实体类 - 位置X
	this._drill_y = 0;						//实体类 - 位置Y
	this._drill_scale_x = 1;				//实体类 - 缩放X
	this._drill_scale_y = 1;				//实体类 - 缩放Y
	this._drill_skew_x = 0;					//实体类 - 斜切X
	this._drill_skew_y = 0;					//实体类 - 斜切Y
	this._drill_rotate = 0;					//实体类 - 旋转值
	
	this._drill_frameX = 0;					//实体类 - 框架X
	this._drill_frameY = 0;					//实体类 - 框架Y
	this._drill_frameW = 0;					//实体类 - 框架宽度
	this._drill_frameH = 0;					//实体类 - 框架高度
};



//#############################################################################
// ** 【标准模块】碰撞体判定 ☆碰撞体判定
//#############################################################################
//##############################
// * 碰撞体判定 - 点是否在当前碰撞体内【标准函数】
//			
//			参数：	> x0,y0 数字（点坐标）
//			返回：	> 布尔
//			
//			说明：	> 该函数只对 已绑定 的行走图有效，否则一直返回false。
//					  你只需要知道绑定 碰撞体 之后，这个函数能用就行，中间过程不要去管。不要把"凸包判定"这些核心的中间过程写到 子插件 里面了。
//					> 该函数每调用一次，就计算一次，大量调用会浪费性能。
//					  子插件需要考虑相关功能 同一贴图+同一帧中 被多次调用 的优化。
//##############################
Game_CharacterBase.prototype.drill_COEF_isPointInCollisionBean = function( x0, y0 ){
	return this.drill_COEF_isPointInCollisionBean_Private(x0, y0);
}
//##############################
// * 碰撞体判定 - 所有点是否在当前碰撞体内【标准函数】
//			
//			参数：	> point_list 对象列表（点列表）
//			返回：	> 布尔
//			
//			说明：	> 该函数只对 已绑定 的行走图有效，否则一直返回false。
//					  你只需要知道绑定 碰撞体 之后，这个函数能用就行，中间过程不要去管。
//					> 该函数每调用一次，就计算一次，大量调用会浪费性能。
//					  子插件需要考虑相关功能 同一贴图+同一帧中 被多次调用 的优化。
//##############################
Game_CharacterBase.prototype.drill_COEF_isAllPointInCollisionBean = function( point_list ){
	if( point_list.length <= 0 ){ return false; }
	for(var i = 0; i < point_list.length; i++ ){
		var point = point_list[i];
		if( this.drill_COEF_isPointInCollisionBean( point.x, point.y ) == false ){
			return false;
		}
	}
	return true;
}
//##############################
// * 碰撞体判定 - 获取当前碰撞体的全部顶点【标准函数】
//			
//			参数：	> 无
//			返回：	> point_list 对象列表（点列表，如果为空则返回空数组）
//			
//			说明：	> 该函数只对 已绑定 的行走图有效。
//					  你只需要知道绑定 碰撞体 之后，这个函数能用就行，中间过程不要去管。
//##############################
Game_CharacterBase.prototype.drill_COEF_getCollisionBeanAllPoint = function(){
	var bean = this.drill_COEF_getCollisionBean();
	if( bean == undefined ){ return []; }
	var point_list = $gameTemp.drill_COEF_getRectPointByBean( bean );
	if( point_list == null ){ return []; }
	return point_list;
}


//=============================================================================
// ** ☆碰撞体判定实现
//
//			说明：	> 此模块管理 鼠标与实体类 的判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 碰撞体判定实现 - 点是否在当前碰撞体内（私有）
//==============================
Game_CharacterBase.prototype.drill_COEF_isPointInCollisionBean_Private = function( x0, y0 ){
	var bean = this.drill_COEF_getCollisionBean();
	if( bean == undefined ){ return false; }
	if( bean['_drill_visible'] == false ){ return false; }
	
	// > 获取矩形的四个顶点
	var point_list = $gameTemp.drill_COEF_getRectPointByBean( bean );
	if( point_list == null ){ return false; }
	
	// > 凸多边形判断
	var result = $gameTemp.drill_COEF_Math2D_isPointInConvexPolygon( x0, y0, point_list );
	if( result == true ){ return true; }
	return false;
}
//==============================
// * 碰撞体判定实现 - 获取矩形的四个顶点
//
//			说明：	> 返回 缩放/旋转/斜切 变换后的四个顶点。如果为null表示无法获取。
//==============================
Game_Temp.prototype.drill_COEF_getRectPointByBean = function( bean ){
	
	// > 缩放/旋转值
	var rotation = bean['_drill_rotate'];	//（弧度值）
	var scale_x = bean['_drill_scale_x'];
	var scale_y = bean['_drill_scale_y'];
	var skew_x = bean['_drill_skew_x'];
	var skew_y = bean['_drill_skew_y'];
	
	// > 矩形的四个点 + 执行缩放/旋转（顺时针顺序）
	var ww = bean['_drill_frameW'];
	var hh = bean['_drill_frameH'];
	if( ww == 0 ){ return null; }
	if( hh == 0 ){ return null; }
	
	var x0 = bean['_drill_x'];					//（矩形的中心点，就是xy位置）
	var y0 = bean['_drill_y'];
	var xx = x0 - ww * bean['_drill_anchor_x'];	//（矩形的左上角点）
	var yy = y0 - hh * bean['_drill_anchor_y'];
	var p1 = $gameTemp.drill_COEF_Math2D_getPointWithTransform( xx+0,  yy+0,  x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	var p2 = $gameTemp.drill_COEF_Math2D_getPointWithTransform( xx+ww, yy+0,  x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	var p3 = $gameTemp.drill_COEF_Math2D_getPointWithTransform( xx+ww, yy+hh, x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	var p4 = $gameTemp.drill_COEF_Math2D_getPointWithTransform( xx+0,  yy+hh, x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	
	// > 顶点列表
	var point_list = [];
	point_list.push( p1 );
	point_list.push( p2 );
	point_list.push( p3 );
	point_list.push( p4 );
	return point_list;
}

//==============================
// * 碰撞体判定实现 - 数学工具 - 矩阵点的变换/点A绕点B旋转缩放斜切
//			
//			参数：	> cur_x,cur_y 数字       （需要变换的点）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字     （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	> 矩阵内或矩阵外一个点，能够根据矩阵的 旋转+缩放+斜切 一并变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_COEF_Math2D_getPointWithTransform = function( 
					cur_x,cur_y,						//需要变换的点 
					center_x,center_y, 					//矩形中心点 
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
	
	if( scale_x == undefined ){ scale_x = 1; }
	if( scale_y == undefined ){ scale_y = 1; }
	if( skew_x == undefined ){ skew_x = 0; }
	if( skew_y == undefined ){ skew_y = 0; }
	
	// > 参数准备 （来自 Pixi.Transform）
    var _cx = 1; // cos rotation + skewY;
    var _sx = 0; // sin rotation + skewY;
    var _cy = 0; // cos rotation + Math.PI/2 - skewX;
    var _sy = 1; // sin rotation + Math.PI/2 - skewX;
	
	// > 旋转+斜切 （来自 Pixi.Transform.prototype.updateSkew）
    _cx = Math.cos( rotation + skew_y );
    _sx = Math.sin( rotation + skew_y );
    _cy = -Math.sin( rotation - skew_x ); // cos, added PI/2
    _sy = Math.cos( rotation - skew_x ); // sin, added PI/2
	
	// > 缩放 （来自 Pixi.Transform.prototype.updateLocalTransform）
    var a = _cx * scale_x;
    var b = _sx * scale_x;
    var c = _cy * scale_y;
    var d = _sy * scale_y;
	
	// > 将参数应用到坐标
	var dx = (cur_x - center_x);
	var dy = (cur_y - center_y);
    var tar_x = center_x + (dx * a + dy * c);
    var tar_y = center_y + (dx * b + dy * d);
	
	return { "x":tar_x, "y":tar_y };
}
//==============================
// * 碰撞体判定实现 - 数学工具 - 获取两点的叉乘/向量积
//			
//			参数：	> x1,y1 数字   （第1个点）
//					> x2,y2 数字   （第2个点）
//			返回：	> 数字         （叉乘/向量积）
//			
//			说明：	> 注意点的先后顺序，另外该函数不存在无解的情况。
//==============================
Game_Temp.prototype.drill_COEF_Math2D_getCrossMultiplication = function( x1,y1,x2,y2 ){
    return x1*y2 - x2*y1;
}
//==============================
// * 碰撞体判定实现 - 数学工具 - 判断点是否在凸多边形内
//			
//			参数：	> x0,y0 数字     （目标点）
//					> [{ x:0, y:0 }] （目标凸多边形，注意点的顺序，必须顺时针/逆时针）
//			返回：	> 布尔           （是/否）
//					> null           （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//					> 凸多边形一定要保证点的顺序，顺序不对返回的全是false，最好先画出来看一下多边形。
//					> 多边形的连接线上也会返回true。
//==============================
Game_Temp.prototype.drill_COEF_Math2D_isPointInConvexPolygon = function( x0,y0, point_list ){
	
	// > 检查是否为合法多边形
	if( point_list.length < 3 ){ return null; }
	
	// > 多边形点遍历
	for(var i = 0; i < point_list.length; i++ ){
		var i_next =  (i+1) % point_list.length;
		var i_next2 = (i+2) % point_list.length;
		
		// > 每次往后取三个点
		var x1 = point_list[i].x;
		var y1 = point_list[i].y;
		var x2 = point_list[i_next].x;
		var y2 = point_list[i_next].y;
		var x3 = point_list[i_next2].x;
		var y3 = point_list[i_next2].y;
		
		// > 计算 目标点 到三点的向量值
		var v_x1 = x1 - x0;
		var v_y1 = y1 - y0;
		var v_x2 = x2 - x0;
		var v_y2 = y2 - y0;
		var v_x3 = x3 - x0;
		var v_y3 = y3 - y0;
		
		// > 计算是否同向
		var cross_1_2 = this.drill_COEF_Math2D_getCrossMultiplication( v_x1,v_y1, v_x2,v_y2 );
		var cross_2_3 = this.drill_COEF_Math2D_getCrossMultiplication( v_x2,v_y2, v_x3,v_y3 );
		if( cross_1_2*cross_2_3 < 0 ){
			return false;
		}
	}
	return true;
}


//=============================================================================
// ** ☆DEBUG碰撞体范围
//
//			说明：	> 此模块专门管理 DEBUG碰撞体范围 显示功能。
//					> 注意，只显示。这个模块删掉也不会影响主功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG碰撞体范围 - 帧刷新（地图界面）
//==============================
var _drill_COEF_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COEF_debugMap_update.call(this);
    this.drill_COEF_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_COEF_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG碰撞体范围 - 帧刷新 初始化贴图
//==============================
Scene_Map.prototype.drill_COEF_updateDrawBeanRangeSprite = function() {
	
	// > 功能关闭时
	if( $gameSystem._drill_COEF_DebugEnabled != true ){
		
		// > 销毁贴图
		if( this._drill_COEF_DebugSprite != undefined ){
			this._spriteset._drill_mapUpArea.removeChild(this._drill_COEF_DebugSprite);
			this._drill_COEF_DebugSprite = undefined;
		}
		
	// > 功能开启时
	}else{
		
		// > 创建贴图
		if( this._drill_COEF_DebugSprite == undefined ){
			var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
			var temp_sprite = new Sprite();
			temp_sprite.x = 0;
			temp_sprite.y = 0;
			temp_sprite.bitmap = temp_bitmap;
			this._spriteset._drill_mapUpArea.addChild( temp_sprite );	//（加在上层）
			this._drill_COEF_DebugSprite = temp_sprite;
		}
	}
}
//==============================
// * DEBUG碰撞体范围 - 帧刷新 绘制范围
//==============================
Scene_Map.prototype.drill_COEF_updateDrawBeanRangeBitmap = function() {
	if( this._drill_COEF_DebugSprite == undefined ){ return; }
	
	// > 清空绘制
	var temp_bitmap = this._drill_COEF_DebugSprite.bitmap;
	temp_bitmap.clear();
	
	// > 行走图遍历（显示所有行走图的悬停范围）
	var sprite_list = $gameTemp.drill_COEF_getCharacterSpriteTank();
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		
		// > 贴图不可见，说明被优化了
		if( temp_sprite.visible != true ){ continue; }
		
		// > 强制 绑定碰撞体
		var character = temp_sprite._character;
		//if( character == undefined ){ continue; }
		//if( character._erased == true ){ continue; }	//『有效事件』（这里不要检查，物体管理-事件管理核心 插件能确保贴图创建时，使用有效事件创建）
		character.drill_COEF_checkCollisionBean();
		var bean = character.drill_COEF_getCollisionBean();
		
		
		// > 绘制 - 颜色标记
		var color_line = "rgb(180,90,215)";
		var color_text = "rgb(255,90,255)";
		var color_background = "rgba(180,90,215,0.2)";
		
		// > 绘制 - 获取矩形的四个顶点
		var point_list = $gameTemp.drill_COEF_getRectPointByBean( bean );
		if( point_list == null ){ continue; }
		
		// > 设置显示的ID字符串
		var id_str = null;
		if( character instanceof Game_Event ){
			id_str = String( character._eventId );
		}else if( character instanceof Game_Player ){
			id_str = "-2";
		}else if( character instanceof Game_Follower ){
			id_str = "f" + String( character._memberIndex );
			
			// > 如果玩家队员不可用，就不显示
			if( character._characterName == "" ){ continue; }
		}
		
		// > 绘制 - 绘制凸多边形
		temp_bitmap.drill_COEF_drawPolygon( point_list, color_background, color_line, 2, "miter" );
		
		// > 绘制 - ID编号
		if( id_str != null ){
			var painter = temp_bitmap._context;
			painter.save();										//（a.存储上一个画笔状态）
			painter.font = temp_bitmap._makeFontNameText();		//（b.设置样式）
			painter.fillStyle = color_text;
			painter.strokeStyle = "rgba(0,0,0,0.7)";
			painter.lineWidth = 4;
			painter.lineJoin = 'round';
			painter.strokeText( id_str, 						//（c.路径填充/描边，fillText）
				point_list[0].x-5, point_list[0].y+15, 60 );
			painter.fillText( id_str, 				
				point_list[0].x-5, point_list[0].y+15, 60 );
			painter.restore();									//（d.回滚上一个画笔状态）
		}
		
		// > 绘制 - 矩形中心点
		if( bean['_drill_frameW'] > 0 &&
			bean['_drill_frameH'] > 0 ){
			temp_bitmap.drawCircle( bean['_drill_x'], bean['_drill_y'], 9, color_line );
			temp_bitmap.drawCircle( bean['_drill_x'], bean['_drill_y'], 5, "#ff0000" );
		}
	}
}

//==============================
// * DEBUG碰撞体范围 - 几何绘制 - 填充+描边多边形
//			
//			参数：	> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//					> lineJoin 字符串     （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 该函数不会对参数进行任何校验，绘制前一定要确保参数完整。
//					> 该函数包含多边形闭合处理。
//==============================
Bitmap.prototype.drill_COEF_drawPolygon = function( point_list, fill_color, stroke_color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();						//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;		//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
    painter.beginPath();				//（c.路径填充/描边，注意 beginPath + fill + stroke）
	painter.moveTo( point_list[0].x, point_list[0].y );
	for(var i = 1; i < point_list.length; i++ ){
		painter.lineTo( point_list[i].x, point_list[i].y );
	}
    painter.closePath();
	painter.fill();
	painter.stroke();
	
	painter.restore();					//（d.回滚上一个画笔状态）
    this._setDirty();
};




//#############################################################################
// ** 【标准模块】行走图的地图层级 ☆行走图的地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/中层/上层/物体原层级/物体下层/物体中层/物体上层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_COEF_layerAddSprite = function( sprite, layer_index ){
	this.drill_COEF_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_COEF_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 地图层级 - 堆叠级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_COEF_sortByZIndex = function () {
    this.drill_COEF_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_COEF_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_COEF_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_COEF_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_COEF_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_COEF_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_COEF_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 地图层级 - 堆叠级排序（私有）
//==============================
Scene_Map.prototype.drill_COEF_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	//this._spriteset._tilemap._sortChildren();	//（_tilemap每帧都会刷）
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_COEF_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_mapDownArea.addChild( sprite );
	}
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "物体原层级" ||
		layer_index == "物体下层" ||
		layer_index == "物体中层" ||
		layer_index == "物体上层" ){
		this._spriteset._tilemap.addChild( sprite );	//（_tilemap会按z轴进行排序）
	}
};


//#############################################################################
// ** 【标准模块】层级与堆叠级 ☆层级与堆叠级
//#############################################################################
//##############################
// * 层级与堆叠级 - 刷新层级【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 如果某个 子插件 修改了层级相关自定义属性，需要调用此函数刷新一次。
//##############################
Game_Temp.prototype.drill_COEF_needRefreshSpriteLayer = function(){
	this._drill_COEF_needRefreshSpriteLayer = true;
};
//##############################
// * 层级与堆叠级 - 刷新堆叠级【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 如果某个 子插件 修改了堆叠级相关自定义属性，需要调用此函数刷新一次。
//##############################
Game_Temp.prototype.drill_COEF_needRefreshSpriteZIndex = function(){
	this._drill_COEF_needRefreshSpriteZIndex = true;
};
//##############################
// * 层级与堆叠级 - 设置层级时【标准接口】
//
//			参数：	> temp_characterSprite 贴图对象
//			返回：	> 无
//					
//			说明：	> 该函数在 刷新时+有物体数据时 会被调用。
//					> 可以修改贴图属性 _drill_layer 实现指定行走图的自定义层级。
//					  如果没有任何操作，则默认值为 "物体原层级"。
//					> 继承时，不需要考虑具体原理，只要知道赋值字符串能修改层级即可。
//					  另外具体实现见功能模块：行走图的地图层级。
//					> 注意，只物体贴图，这里不含 镜像贴图 。
//##############################
Game_Temp.prototype.drill_COEF_whenRefreshLayer = function( temp_characterSprite ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 层级与堆叠级 - 帧刷新堆叠级时 - 物体贴图【标准接口】
//
//			参数：	> temp_characterSprite 贴图对象
//			返回：	> 无
//					
//			说明：	> 该函数 每帧 都会被调用。
//					> 可以修改贴图属性 zIndex 实现指定行走图的自定义堆叠级。
//					  如果没有任何操作，则默认值为 y位置值。
//					> 注意，只物体贴图，这里不含 镜像贴图 。
//##############################
Game_Temp.prototype.drill_COEF_whenRefreshZIndex_updateCharacter = function( temp_characterSprite ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 层级与堆叠级 - 帧刷新堆叠级时 - 任意贴图【标准接口】
//
//			参数：	> temp_anySprite 贴图对象
//			返回：	> 无
//					
//			说明：	> 该函数 每帧 都会被调用。
//					> 可以修改贴图属性 zIndex 实现指定贴图的自定义堆叠级。
//					  包含任何 _tilemap 的子贴图。注意，在这一层的是镜面，不是镜像，镜像还要单独写排序功能。
//##############################
Game_Temp.prototype.drill_COEF_whenRefreshZIndex_updateAny = function( temp_anySprite ){
	
	//（待子类继承写内容）
	
};


//=============================================================================
// ** ☆层级与堆叠级排序
//
//			说明：	> 此模块专门管理 排序 。
//					  这里执行的函数，都默认所有贴图已设置z和zIndex。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 地图层级 - 排序前准备
//
//			说明：	> 此函数处于帧刷新中，每帧都会进行排序。
//==============================
Tilemap.prototype.drill_COEF_refreshSortBefore = function(){
	var sprite_list = this.children;
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		$gameTemp.drill_COEF_whenRefreshZIndex_updateAny( temp_sprite );
	}
}
//==============================
// * 地图层级 - 排序值刷新
//
//			说明：	> 此函数处于帧刷新中，每帧都会进行排序。
//==============================
Tilemap.prototype.drill_COEF_refreshSortValue = function(){
	var sprite_list = this.children;
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		var sort = 0;
		
		// > 层级
		if( temp_sprite.z != undefined ){
			sort += temp_sprite.z *1000000;
		}
		
		// > 堆叠级
		if( temp_sprite.__drill_zIndex == undefined ){	//（若贴图未定义zIndex，则按0算）
			sort += 0;
		}else{
			sort += temp_sprite.zIndex;
		}
		
		temp_sprite._drill_COEF_sort = Math.floor( sort );
	}
}
//==============================
// * 地图层级 - 层级+堆叠级排序（覆写）
//
//			说明：	> 此函数处于帧刷新中，每帧都会进行排序。
//==============================
Tilemap.prototype._sortChildren = function(){
	
	// > 排序前准备
	this.drill_COEF_refreshSortBefore();
	
	// > 排序值刷新
	this.drill_COEF_refreshSortValue();
	
	// > 比较器
	this.children.sort(this._compareChildOrder.bind(this));
};
//==============================
// * 地图层级 - 层级+堆叠级排序 - 比较器（覆写）
//==============================
Tilemap.prototype._compareChildOrder = function( a, b ){
	if( a._drill_COEF_sort !== b._drill_COEF_sort ){
		return a._drill_COEF_sort - b._drill_COEF_sort;
	}else{
		return a.spriteId - b.spriteId;
	}
};


//=============================================================================
// ** ☆层级控制
//
//			说明：	> 此模块提供 层级 的控制。
//					  这里只提供【贴图的层级】定义，没有数据的定义，不要定义冗余的参数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 层级控制 - 初始化绑定
//==============================
var _drill_COEF_layer_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	_drill_COEF_layer_createCharacters.call(this);
	$gameTemp._drill_COEF_needRefreshSpriteLayer = true;
};
//==============================
// * 层级控制 - 帧刷新
//==============================
var _drill_COEF_layer_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_COEF_layer_map_update.call(this);
	this.drill_COEF_updateLayer();
}
//==============================
// * 层级控制 - 帧刷新
//==============================
Scene_Map.prototype.drill_COEF_updateLayer = function() {
	if( !$gameTemp._drill_COEF_needRefreshSpriteLayer ){ return; }
	$gameTemp._drill_COEF_needRefreshSpriteLayer = false;
	
	var sprite_list = $gameTemp.drill_COEF_getCharacterSpriteTank();
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._character == undefined ){ continue; }
		var character = temp_sprite._character;
			
		// > 设置层级
		temp_sprite._drill_layer = "物体原层级";
		
		// > 设置层级时
		$gameTemp.drill_COEF_whenRefreshLayer( temp_sprite );
		
		// > 应用设置（添加贴图到层级【标准函数】）
		this.drill_COEF_layerAddSprite( temp_sprite, temp_sprite._drill_layer );
	}
}
//==============================
// * 层级控制 - 参数覆写
//==============================
Object.defineProperty( Sprite_Character.prototype, 'z', {	//（z用于层级控制，具体可见 "地图层级的各个子贴图.txt"）
	set: function( value ){
		this._drill_COEF_zz = value;
	},
	get: function(){
		
		// > 未定义则默认为 物体下层
		if( this._drill_COEF_zz == undefined ){ return 1; }
		
		// > 被锁定时
		if( this._drill_layer == "物体下层" ){ return 1; }
		if( this._drill_layer == "物体中层" ){ return 3; }
		if( this._drill_layer == "物体上层" ){ return 5; }
		
		// > 正常值
		return this._drill_COEF_zz;
	},
	configurable: true
});


//=============================================================================
// ** ☆堆叠级控制
//
//			说明：	> 此模块提供 堆叠级 的控制。
//					  这里只提供【贴图的堆叠级】定义，没有数据的定义，不要定义冗余的参数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 堆叠级控制 - 初始化绑定
//==============================
var _drill_COEF_zIndex_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	_drill_COEF_zIndex_createCharacters.call(this);
	$gameTemp._drill_COEF_needRefreshSpriteZIndex = true;
};
//==============================
// * 堆叠级控制 - 帧刷新
//==============================
var _drill_COEF_zIndex_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_COEF_zIndex_map_update.call(this);
	this.drill_COEF_updateZIndex();
}
//==============================
// * 堆叠级控制 - 帧刷新
//
//			说明：	> 这里只刷一次，能刷 Tilemap + 非Tilemap 的物体贴图。
//==============================
Scene_Map.prototype.drill_COEF_updateZIndex = function() {
	if( !$gameTemp._drill_COEF_needRefreshSpriteZIndex ){ return; }
	$gameTemp._drill_COEF_needRefreshSpriteZIndex = false;
	
	// > 遍历 行走图贴图
	var sprite_list = $gameTemp.drill_COEF_getCharacterSpriteTank();
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
			
		// > 设置堆叠级
		temp_sprite.zIndex = temp_sprite.y;
		
		// > 设置层级时
		$gameTemp.drill_COEF_whenRefreshZIndex_updateCharacter( temp_sprite );
	}
	
	// > 应用设置（行走图层级排序【标准函数】）
	this.drill_COEF_sortByZIndex();
}
//==============================
// * 堆叠级控制 - 帧刷新 - 层级+堆叠级排序（继承）
//
//			说明：	> 这里处于帧刷新，只刷 Tilemap 的物体贴图。
//==============================
var _drill_COEF_zIndex_whenRefreshZIndex_updateAny = Game_Temp.prototype.drill_COEF_whenRefreshZIndex_updateAny;
Game_Temp.prototype.drill_COEF_whenRefreshZIndex_updateAny = function( temp_anySprite ){
	
	// > 遍历 行走图贴图
	var sprite_list = $gameTemp.drill_COEF_getCharacterSpriteTank();
	if( sprite_list.contains( temp_anySprite ) ){
		
		// > 设置堆叠级
		temp_anySprite.zIndex = temp_anySprite.y;
		
		// > 设置层级时
		$gameTemp.drill_COEF_whenRefreshZIndex_updateCharacter( temp_anySprite );
	}
	
	// > 原函数
	_drill_COEF_zIndex_whenRefreshZIndex_updateAny.call( this, temp_anySprite );
}


//=============================================================================
// ** ☆DEBUG层级与堆叠级
//
//			说明：	> 此模块专门管理 DEBUG层级与堆叠级 显示功能。
//					> 注意，只显示。这个模块删掉也不会影响主功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG层级与堆叠级 - 帧刷新（地图界面）
//==============================
var _drill_COEF_debugMap_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COEF_debugMap_update2.call(this);
    this.drill_COEF_updateDrawZIndexSprite();		//帧刷新 - 初始化贴图
    this.drill_COEF_updateDrawZIndexBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG层级与堆叠级 - 帧刷新 初始化贴图
//==============================
Scene_Map.prototype.drill_COEF_updateDrawZIndexSprite = function() {
	
	// > 功能关闭时
	if( $gameSystem._drill_COEF_DebugZIndexEnabled != true ){
		
		// > 销毁贴图
		if( this._drill_COEF_DebugZIndexSprite != undefined ){
			this._spriteset._drill_mapUpArea.removeChild(this._drill_COEF_DebugZIndexSprite);
			this._drill_COEF_DebugZIndexSprite = undefined;
		}
		
	// > 功能开启时
	}else{
		
		// > 创建贴图
		if( this._drill_COEF_DebugZIndexSprite == undefined ){
			var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
			var temp_sprite = new Sprite();
			temp_sprite.x = 0;
			temp_sprite.y = 0;
			temp_sprite.bitmap = temp_bitmap;
			this._spriteset._drill_mapUpArea.addChild( temp_sprite );	//（加在上层）
			this._drill_COEF_DebugZIndexSprite = temp_sprite;
		}
	}
}
//==============================
// * DEBUG层级与堆叠级 - 帧刷新 绘制范围
//==============================
Scene_Map.prototype.drill_COEF_updateDrawZIndexBitmap = function() {
	if( this._drill_COEF_DebugZIndexSprite == undefined ){ return; }
	
	// > 清空绘制
	var temp_bitmap = this._drill_COEF_DebugZIndexSprite.bitmap;
	temp_bitmap.clear();
	
	// > 行走图遍历
	var sprite_list = $gameTemp.drill_COEF_getCharacterSpriteTank();
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		
		// > 贴图不可见，说明被优化了
		if( temp_sprite.visible != true ){ continue; }
		var character = temp_sprite._character;
		
		// > 绘制 - 颜色标记
		var color_text = "rgb(195,255,205)";	//（淡绿色）
		
		// > 设置显示的 堆叠级字符串
		var zIndex_str = "";
		if( temp_sprite._drill_layer == "物体原层级" ){ zIndex_str += "物原" }
		if( temp_sprite._drill_layer == "物体下层" ){ zIndex_str += "物下" }
		if( temp_sprite._drill_layer == "物体中层" ){ zIndex_str += "物中" }
		if( temp_sprite._drill_layer == "物体上层" ){ zIndex_str += "物上" }
		if( temp_sprite._drill_layer == "下层" ){ zIndex_str += "下层" }
		if( temp_sprite._drill_layer == "中层" ){ zIndex_str += "中层" }
		if( temp_sprite._drill_layer == "上层" ){ zIndex_str += "上层" }
		zIndex_str += String( temp_sprite.zIndex );
		if( character instanceof Game_Follower ){
			
			// > 如果玩家队员不可用，就不显示
			if( character._characterName == "" ){ continue; }
		}
		
		// > 绘制 - 点
		//temp_bitmap.drawCircle( temp_sprite.x, temp_sprite.y, 6, color_text );
		
		// > 绘制 - 堆叠级字符串
		temp_bitmap.fontSize = 18;
		if( zIndex_str != null ){
			var painter = temp_bitmap._context;
			painter.save();										//（a.存储上一个画笔状态）
			painter.font = temp_bitmap._makeFontNameText();		//（b.设置样式）
			painter.fillStyle = color_text;
			painter.strokeStyle = "rgba(0,0,0,0.7)";
			painter.lineWidth = 4;
			painter.lineJoin = 'round';
			painter.strokeText( zIndex_str, 					//（c.路径填充/描边，fillText）
				temp_sprite.x-24, temp_sprite.y-6, 180 );
			painter.fillText( zIndex_str, 				
				temp_sprite.x-24, temp_sprite.y-6, 180 );
			painter.restore();									//（d.回滚上一个画笔状态）
		}
	}
}


