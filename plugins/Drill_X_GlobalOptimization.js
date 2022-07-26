//=============================================================================
// Drill_X_GlobalOptimization.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        管理器 - 全局存储性能优化[扩展]
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GlobalOptimization +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 优化频繁改变 全局变量 而造成卡顿的情况。
 * ★★ 最好放在所有 全局存储 相关插件的后面 ★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 但只对指定插件扩展，如果没有使用目标插件，则该插件没有任何效果。
 * 作用于：
 *   - 所有 全局存储 相关插件
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于所有含全局存储的插件。
 * 2.全局存储在你每次做改变全局变量时，都会全部保存一次。
 *   如果你使用了大量插件指令或者跨存档变量变换频率达到20次以上，
 *   慢的系统就会卡顿。
 * 3.该插件能使得存储优化，变为延时存储，将短时间内变量多次变化统一，
 *   减少冗余存储次数。
 * 4.此插件功能与 全局存储核心 插件的部分功能重复，插件可有可无。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部计数刷新的结构。
 * 修复了计数器在某些情况（瞬间关游戏）没有存储成功的bug。
 * 
 * 
 * 
 * @param 全局存储轮询时间
 * @type number
 * @min 5
 * @max 120
 * @desc 设置全局存储检查变量的间隔。
 * @default 10
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XGO（X_Global_Optimization）
//		临时全局变量	DrillUp.g_XGO_xx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		无
//		★时间复杂度		无
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			全局存储优化：
//				->游戏任何时段运行
//				->优化延迟
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.函数修改 这里直接写在SceneManager.initialize中了，相对来说，属于比较危险的操作。
//			（虽然这对于js本身来说，是正常的覆写与回调。）
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_GlobalOptimization = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_GlobalOptimization');
	
	
	DrillUp.g_XGO_saveTimeDelay = Number(DrillUp.parameters['全局存储轮询时间'] || 10);
	DrillUp.g_XGO_globalSave = false;
	DrillUp.g_XGO_time = 0;
	
	
//=============================================================================
// ** 在SceneManager运行时才加载插件函数
//=============================================================================
var _drill_XGO_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_XGO_initialize.call(this);
	
	//=============================================================================
	// ** 全局存储
	//=============================================================================
	DataManager.forceSaveGlobalInfo = function() {	//（forceSaveGlobalInfo不是原框架函数）覆盖为打开存储开关	
		DrillUp.g_XGO_globalSave = true;
	};
	DataManager.forceSaveGlobalInfo_delay = function() {	//（forceSaveGlobalInfo_delay不是原框架函数）	
		var globalInfo = this.loadGlobalInfo() || [];
		globalInfo[0] = this.makeSavefileInfo();
		this.saveGlobalInfo(globalInfo);
	};

	//=============================================================================
	// ** 延迟触发
	//=============================================================================
	var _drill_XGO_update = SceneManager.updateScene;
	SceneManager.updateScene = function() {
		_drill_XGO_update.call(this);
		DrillUp.g_XGO_time += 1;
		
		if( DrillUp.g_XGO_time > DrillUp.g_XGO_saveTimeDelay ){
			DrillUp.g_XGO_time = 0;
			if( DrillUp.g_XGO_globalSave ){
				DataManager.forceSaveGlobalInfo_delay();
				DrillUp.g_XGO_globalSave = false;
			}
		}
	};

};


