//=============================================================================
// Drill_CoreOfEventFrameWithMouse.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        行走图 - 行走图与鼠标控制核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfEventFrameWithMouse +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该核心提供行走图与鼠标控制的基本功能，包括判定鼠标是否悬停在行走图上。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput                 系统-输入设备核心
 *   - Drill_CoreOfEventFrame            行走图-行走图优化核心
 * 可作用于：
 *   - Drill_EventUnificationOfTrigger   体积-一体化&触发
 *     使得一体化的事件，能够整体悬停。
 *   - Drill_LayerCamera                 地图-活动地图镜头★★v1.9以上★★
 *     目标插件控制镜头放大缩小时，鼠标也能正常提供相关功能。
 *   - Drill_EventMouseHoverSwitch       物体-鼠标悬停响应开关
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.详细内容可以去看看 "7.行走图 > 关于行走图与鼠标控制核心.docx"。
 * 细节：
 *   (1.判定范围为行走图的 碰撞体范围。
 *      开启"DEBUG碰撞体+悬停查看"可以看见行走图的碰撞体与鼠标悬停效果。
 *   (2.鼠标悬停范围本质上是 游戏术语"碰撞体" 的定义。
 *      悬停范围不要错误理解成：
 *      "鼠标接触图像 不透明的部分 就算悬停，接触 透明的部分 就算离开悬停"。
 *      这种理解能实现但代价巨大，远不如碰撞体的功能。
 * 设计：
 *   (1.你可以通过插件指令"DEBUG碰撞体+悬停查看"，查看行走图与鼠标悬停的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>行走图与鼠标控制核心 : DEBUG碰撞体+悬停查看 : 开启
 * 插件指令：>行走图与鼠标控制核心 : DEBUG碰撞体+悬停查看 : 关闭
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
 * 时间复杂度： o(n^2)  每帧
 * 测试方法：   在机关管理层进行鼠标悬停触发测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件提供实时的 碰撞体+鼠标悬停范围 监听，一般情况下都为
 *   10个以内的多边形范围判断，所以消耗并不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COEFWM (Core_Of_Event_Frame_With_Mouse)
//		临时全局变量	DrillUp.g_COEFWM_xxx
//		临时局部变量	this._drill_COEFWM_xxx
//		存储数据变量	$gameSystem._drill_COEFWM_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	行走图管理层
//		★性能测试消耗	2024/5/2：
//							0.2ms（drill_COEFWM_updateDrawBeanRangeSprite）
//		★最坏情况		暂无
//		★备注			该核心就是为了把所有 鼠标悬停判定 都集中到一起，节省性能消耗。
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
//			
//			->☆鼠标悬停监听
//				->执行绑定【标准函数】
//				->解除绑定【标准函数】
//				->鼠标是否正在悬停【标准函数】
//				->鼠标是否正在悬停+一体化情况【标准函数】
//			
//			->☆行走图的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->事件销毁时
//			->☆悬停判定
//				->碰撞体判定
//				->一体化情况
//			->☆优化控制
//				->同一贴图+同一帧中 被多次调用 优化
//			
//			->☆DEBUG悬停范围
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
//		★必要注意事项：
//			1.插件提供了 标准函数 ，子插件只要在适当位置调用 标准函数 即可。
//		
//		★其它说明细节：
//			暂无
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
	DrillUp.g_COEFWM_PluginTip_curName = "Drill_CoreOfEventFrameWithMouse.js 行走图-行走图与鼠标控制核心";
	DrillUp.g_COEFWM_PluginTip_baseList = [
		"Drill_CoreOfInput.js 系统-输入设备核心",
		"Drill_CoreOfEventFrame.js 行走图-行走图优化核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COEFWM_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COEFWM_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COEFWM_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COEFWM_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COEFWM_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfEventFrameWithMouse = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfEventFrameWithMouse');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfEventFrame ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_COEFWM_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COEFWM_pluginCommand.call(this, command, args);
	if( command === ">行走图与鼠标控制核心" ){
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "DEBUG碰撞体+悬停查看" ){
				if( temp2 == "开启" ){
					$gameSystem._drill_COEFWM_DebugEnabled = true;
					$gameSystem._drill_COEF_DebugEnabled = false;	//（【行走图-行走图优化核心】防止重叠显示）
				}
				if( temp2 == "关闭" ){
					$gameSystem._drill_COEFWM_DebugEnabled = false;
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
DrillUp.g_COEFWM_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COEFWM_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COEFWM_sys_initialize.call(this);
	this.drill_COEFWM_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COEFWM_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COEFWM_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COEFWM_saveEnabled == true ){	
		$gameSystem.drill_COEFWM_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COEFWM_initSysData();
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
Game_System.prototype.drill_COEFWM_initSysData = function() {
	this.drill_COEFWM_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COEFWM_checkSysData = function() {
	this.drill_COEFWM_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COEFWM_initSysData_Private = function() {
	
	this._drill_COEFWM_DebugEnabled = false;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COEFWM_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COEFWM_DebugEnabled == undefined ){
		this.drill_COEFWM_initSysData();
	}
};



//#############################################################################
// ** 【标准模块】鼠标悬停监听 ☆鼠标悬停监听
//#############################################################################
//##############################
// * 鼠标悬停监听 - 执行绑定【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在 物体数据 初始化时 执行，需要子插件手动调用。
//					> 该函数可以放在帧刷新中多次执行。
//##############################
Game_Character.prototype.drill_COEFWM_checkData = function(){
	this.drill_COEF_checkCollisionBean();	//【行走图-行走图优化核心】绑定碰撞体
	this.drill_COEFWM_checkData_Private();
}
//##############################
// * 鼠标悬停监听 - 解除绑定【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在 物体数据 解除绑定时 执行，需要子插件手动调用。
//					> 如果数据整个被删除，则可以不执行此函数。
//##############################
Game_Character.prototype.drill_COEFWM_removeData = function(){
	this.drill_COEF_removeCollisionBean();	//【行走图-行走图优化核心】解除碰撞体
	this.drill_COEFWM_removeData_Private();
}
//##############################
// * 鼠标悬停监听 - 鼠标是否正在悬停【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//					
//			说明：	> 该函数只对 已绑定 的数据有效，否则一直返回false。
//					  你只需要知道绑定 悬停监听 之后，这个函数能用就行，中间过程不要去管。不要把"碰撞体"这些核心的中间过程写到 子插件 里面了。
//					> 该函数可以放在帧刷新中多次执行。
//					  该函数有优化处理，即使在同一帧中也可以多次反复被调用。
//##############################
Game_Character.prototype.drill_COEFWM_isOnHover = function(){
	return this.drill_COEFWM_isOnHover_Private();
}
//##############################
// * 鼠标悬停监听 - 鼠标是否正在悬停+一体化情况【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//					
//			说明：	> 该函数只对 已绑定 的数据有效，否则一直返回false。
//					  你只需要知道绑定 悬停监听 之后，这个函数能用就行，中间过程不要去管。不要把"碰撞体"这些核心的中间过程写到 子插件 里面了。
//					> 该函数可以放在帧刷新中多次执行。
//					  该函数有优化处理，即使在同一帧中也可以多次反复被调用。
//##############################
Game_Character.prototype.drill_COEFWM_isOnHoverWithUnification = function(){
	return this.drill_COEFWM_isOnHoverWithUnification_Private();
}


//=============================================================================
// ** ☆行走图的属性
//
//			说明：	> 此模块专门定义 行走图的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图的属性 - 初始化
//==============================
var _drill_COEFWM_mouse_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_COEFWM_mouseData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_COEFWM_mouse_initialize.call(this);
}
//==============================
// * 行走图的属性 - 初始化 数据（私有）
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：mouseData，一对一。
//==============================
Game_Character.prototype.drill_COEFWM_checkData_Private = function(){	
	if( this._drill_COEFWM_mouseData != undefined ){ return; }
	this._drill_COEFWM_mouseData = {};
	this._drill_COEFWM_mouseData['op_time'] = -1;			//优化控制 - 帧数标记
	this._drill_COEFWM_mouseData['op_result'] = false;		//优化控制 - 第一次的悬停结果
}
//==============================
// * 行走图的属性 - 删除数据（私有）
//==============================
Game_Character.prototype.drill_COEFWM_removeData_Private = function(){
	this._drill_COEFWM_mouseData = undefined;
}
//==============================
// * 行走图的属性 - 事件销毁时
//==============================
var _drill_COEFWM_e_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function(){
	_drill_COEFWM_e_erase.call( this );
	this.drill_COEFWM_removeData();							//（删除数据）
}



//=============================================================================
// ** ☆悬停判定
//
//			说明：	> 此模块管理 鼠标 的悬停判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 悬停判定 - 是否在 碰撞体 范围内
//			
//			参数：	> 无
//			说明：	> 检查鼠标是否在碰撞体的范围内。『鼠标落点与实体类范围』
//						镜头与层级 - 已支持
//						中心锚点   - 已支持（行走图-碰撞体 支持）
//						特殊变换   - 已支持（行走图-碰撞体 支持，缩放+斜切+旋转）
//						触屏响应   - 暂不明确
//==============================
Game_Character.prototype.drill_COEFWM_isOnHover_Private = function(){
	
	// > 未绑定则返回false
	if( this._drill_COEFWM_mouseData == undefined ){ return false; }
	var mouseData = this._drill_COEFWM_mouseData;
	
	// > 优化控制
	//		（如果此函数在 同一贴图+同一帧中 被多次调用）
	//		（那么第一次调用 走正常流程，第二次调用 返回第一次的结果）
	if( mouseData['op_time'] == $gameTemp._drill_COEFWM_op_time ){
		return mouseData['op_result'];
	}
	mouseData['op_time'] = $gameTemp._drill_COEFWM_op_time;
	
	
	// > 判定 - 鼠标位置
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	//if( bean[''] == "触屏按下[持续]" ){
	//	_x = TouchInput.x;
	//	_y = TouchInput.y;
	//}
	
	
	// > 判定 - 镜头与层级
	if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】地图鼠标落点
										//		（注意，这里是 地图鼠标落点 与 矩形范围的图层 偏移关系 ）
		if( SceneManager._scene instanceof Scene_Map ){
			
			// > 下层/中层/上层（这是事件的层级，事件处于 下层、中层、上层）
			var convert_pos = $gameSystem._drill_LCa_controller.drill_LCa_getPos_OuterToChildren( _x, _y );
			_x = convert_pos.x;
			_y = convert_pos.y;
			
			// > 图片层/最顶层
			//	（不考虑，因此也不写if判断了）
		}
	}
	
	
	// > 判定 - 碰撞体
	var result = this.drill_COEF_isPointInCollisionBean( _x, _y );	//【行走图-行走图优化核心】点是否在当前碰撞体内
	mouseData['op_result'] = result;								//（第一次的悬停结果）
	return result;
}
//==============================
// * 悬停判定 - 一体化情况
//==============================
Game_Character.prototype.drill_COEFWM_isOnHoverWithUnification_Private = function(){
	
	// > 【一体化&触发】
	if( Imported.Drill_EventUnificationOfTrigger ){
		var tag = this.drill_EUOT_getTag();
		if( tag == "" ){
			
			// > 常规情况
			return this.drill_COEFWM_isOnHover();
			
		}else{
			
			// > 一体化情况 - 是否悬停在任意一个碰撞体上
			var ev_list = $gameTemp.drill_EUOT_getEventListByTag( tag );
			for(var i = 0; i < ev_list.length; i++){
				var e = ev_list[i];
				var is_onHover = e.drill_COEFWM_isOnHover();
				if( is_onHover == true ){ return true; }
			}
			return false;
		}
	
	// > 常规情况
	}else{
		return this.drill_COEFWM_isOnHover();
	}
}


//=============================================================================
// ** ☆优化控制
//
//			说明：	> 此模块专门管理 优化 计算量。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 优化控制 - 初始化
//==============================
var _drill_COEFWM_optimization_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_COEFWM_optimization_initialize.call(this);
    this._drill_COEFWM_op_time = 0;			//帧数标记
}
//==============================
// * 优化控制 - 帧刷新
//==============================
var _drill_COEFWM_optimizationMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COEFWM_optimizationMap_update.call(this);
    $gameTemp._drill_COEFWM_op_time += 1;
}


//=============================================================================
// ** ☆DEBUG悬停范围
//
//			说明：	> 此模块专门管理 DEBUG悬停范围 显示功能。
//					> 注意，只显示。这个模块删掉也不会影响主功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG悬停范围 - 帧刷新
//==============================
var _drill_COEFWM_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COEFWM_debugMap_update.call(this);
    this.drill_COEFWM_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_COEFWM_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG悬停范围 - 帧刷新 初始化贴图
//==============================
Scene_Map.prototype.drill_COEFWM_updateDrawBeanRangeSprite = function() {
	
	// > 功能关闭时
	if( $gameSystem._drill_COEFWM_DebugEnabled != true ){
		
		// > 销毁贴图
		if( this._drill_COEFWM_DebugSprite != undefined ){
			this.removeChild(this._drill_COEFWM_DebugSprite);
			this._drill_COEFWM_DebugSprite = undefined;
		}
		
	// > 功能开启时
	}else{
		
		// > 创建贴图
		if( this._drill_COEFWM_DebugSprite == undefined ){
			var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
			var temp_sprite = new Sprite();
			temp_sprite.x = 0;
			temp_sprite.y = 0;
			temp_sprite.bitmap = temp_bitmap;
			this._spriteset._drill_mapUpArea.addChild( temp_sprite );	//（加在上层）
			this._drill_COEFWM_DebugSprite = temp_sprite;
		}
	}
}
//==============================
// * DEBUG悬停范围 - 帧刷新 绘制范围
//==============================
Scene_Map.prototype.drill_COEFWM_updateDrawBeanRangeBitmap = function() {
	if( this._drill_COEFWM_DebugSprite == undefined ){ return; }
	
	// > 清空绘制
	var temp_bitmap = this._drill_COEFWM_DebugSprite.bitmap;
	temp_bitmap.clear();
	
	// > 行走图遍历（显示所有行走图的悬停范围）
	var sprite_list = $gameTemp.drill_COEF_getCharacterSpriteTank();	//【行走图-行走图优化核心】获取贴图
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		
		// > 贴图不可见，说明被优化了
		if( temp_sprite.visible != true ){ continue; }
		
		// > 强制 绑定碰撞体+数据
		var character = temp_sprite._character;
		//if( character == undefined ){ continue; }
		//if( character._erased == true ){ continue; }	//『有效事件』（这里不要检查，物体管理-事件管理核心 插件能确保贴图创建时，使用有效事件创建）
		character.drill_COEFWM_checkData();
		var bean = character.drill_COEF_getCollisionBean();		//【行走图-行走图优化核心】获取碰撞体
		
		// > 判断悬停
		var is_hover = character.drill_COEFWM_isOnHoverWithUnification();	//（鼠标是否正在悬停+一体化情况【标准函数】）
		
		
		// > 绘制 - 颜色标记
		var color_line = "rgb(180,90,215)";
		var color_text = "rgb(255,90,255)";
		var color_background = "rgba(180,90,215,0.2)";
		if( is_hover == true ){
			color_line = "rgb(0,255,0)";
			color_text = "rgb(0,255,0)";
			color_background = "rgba(0,255,0,0.2)";
		}
		
		// > 绘制 - 获取矩形的四个顶点
		var point_list = $gameTemp.drill_COEF_getRectPointByBean( bean );	//【行走图-行走图优化核心】获取矩形的四个顶点
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
		temp_bitmap.drill_COEFWM_drawPolygon( point_list, color_background, color_line, 2, "miter" );
		
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
// * DEBUG悬停范围 - 几何绘制 - 填充+描边多边形
//			
//			参数：	> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//					> lineJoin 字符串     （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 该函数不会对参数进行任何校验，绘制前一定要确保参数完整。
//					> 该函数包含多边形闭合处理。
//==============================
Bitmap.prototype.drill_COEFWM_drawPolygon = function( point_list, fill_color, stroke_color, lineWidth, lineJoin ){
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


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfEventFrameWithMouse = false;
		var pluginTip = DrillUp.drill_COEFWM_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

