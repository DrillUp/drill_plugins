//=============================================================================
// Drill_CoreOfBallistics.js
//=============================================================================

/*:
 * @plugindesc [v2.5]        数学模型 - 弹道核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfBallistics +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够描述 单个或一群 粒子/碎片/子弹 运动的轨迹。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 作用于：
 *   - Drill_CoreOfGaugeMeter        系统-参数条核心
 *   - Drill_CoreOfShatterEffect     系统-方块粉碎核心
 *   - Drill_CoreOfSelectableButton  系统-按钮组核心
 *   - Drill_STG__core               STG核心-引擎
 *   
 *   - Drill_GaugeForBoss            UI-高级BOSS生命固定框
 *   - Drill_GaugeForVariable        UI-高级变量固定框
 *   - Drill_GaugeFloatingNum        地图UI-漂浮参数数字
 *   - Drill_MenuCursor              主菜单-多样式菜单指针
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于贴图。
 * 2.该插件的主要功能为数学计算，绘制二维曲线轨迹。
 *   可以去看看文档 "32.数学模型 > 关于弹道.docx"。
 * 弹道：
 *   (1.子插件会根据自身特点，控制不同情况的弹道。
 *   (2.部分子插件配置项分为 极坐标模式 与 直角坐标模式。
 *      输入相关配置参数，经过推演，可得到结果数组。
 *      结果数组即子弹运动的轨迹，可以正向播放，也可以倒放。
 *   (3.部分子插件会用到该弹道核心的 两点式 移动算法，
 *      来实现多种弹性变化。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n^2)
 * 测试方法1：  在各个界面中以正常游戏流程进行测试。
 * 测试结果1：  战斗界面，消耗为：【5ms以下】
 *              地图界面，消耗为：【5ms以下】
 *              菜单界面，消耗为：【5ms以下】
 * 测试方法2：  参数条核心，制造了210个弹出条，反复调用弹道核心计算。
 * 测试结果2：  测试后消耗为：【208.17ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于核心只进行一次粒子路程的数学计算，计算完毕后不再工作，
 *   所以消耗可以忽略不计。
 * 3.插件原理上，属于单次执行的核心，而如果子插件反复调用数学计
 *   算，消耗一样会上去。而且都算核心的消耗，不算子插件消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了两点式计算功能。
 * [v1.2]
 * 优化了内部接口的结构。
 * [v1.3]
 * 修复了 移动延迟 功能，并且调整了两点式移动细节。
 * [v1.4]
 * 修复了 两点式 不变化时，闪移的bug。
 * [v1.5]
 * 修复了 两点式 终点距离差一帧的bug。
 * [v1.6]
 * 优化了内部公式结构。整理了公式函数以及文档。
 * 添加了 轨道锚点模式 。
 * [v1.7]
 * 优化了内部功能。完善了透明度弹道的结构。
 * [v1.8]
 * 优化了添加了缩放的弹道变化功能。
 * [v1.9]
 * 优化了底层的结构。
 * [v2.0]
 * 添加了随机数迭代功能。
 * [v2.1]
 * 优化了内部底层结构。
 * [v2.2]
 * 优化了部分参数设置，节省子插件存储空间。添加了 叠加变化宏定义 功能。
 * [v2.3]
 * 优化了叠加变化的结构，
 * [v2.4]
 * 添加了 瞬间变化 的条件识别。
 * [v2.5]
 * 添加了 方向角速率 的功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		COBa（Core_Of_Ballistics）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		不可估计
//		★备注			虽然无法测试该核心的消耗，但是由于核心只进行一次粒子路程的数学
//						计算，计算完毕后不再工作，可以确定消耗小于5ms。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			
//			
//			->☆移动弹道 标准模块
//				->初始化数据【标准默认值】
//				->获取弹道总时间【标准函数】
//				->推演赋值【标准函数】
//				->（由 1I移动弹道 具体实现）
//			->☆透明度弹道 标准模块
//				->初始化数据【标准默认值】
//				->获取弹道总时间【标准函数】
//				->推演赋值【标准函数】
//				->（由 1H透明度弹道 具体实现）
//			->☆缩放X弹道 标准模块
//				->初始化数据【标准默认值】
//				->获取弹道总时间【标准函数】
//				->推演赋值【标准函数】
//				->（由 1H缩放X弹道 具体实现）
//			->☆缩放Y弹道 标准模块
//				->初始化数据【标准默认值】
//				->获取弹道总时间【标准函数】
//				->推演赋值【标准函数】
//				->（由 1H缩放Y弹道 具体实现）
//			->☆旋转角弹道 标准模块
//				->初始化数据【标准默认值】
//				->获取弹道总时间【标准函数】
//				->推演赋值【标准函数】
//				->（由 1H旋转角弹道 具体实现）
//			
//			->☆弹道工具 标准模块
//				->字符串 转 锚点列表【标准函数】
//				->锚点列表 转 字符串【标准函数】
//				->（由 0M弹道工具函数 具体实现）
//			
//			->弹道管理器（私有）【Drill_COBa_Manager】
//				->0A一维弹道【common】
//					> 时间公式模式
//					> 时间锚点模式
//					> 目标值模式
//				->0B二维弹道【planimetry】
//					> 极坐标模式
//					> 直角坐标模式
//					> 轨道锚点模式
//					> 两点式
//				->0H一维弹道应用
//					->1H透明度弹道（私有）
//					->1H缩放X弹道（私有）
//					->1H缩放Y弹道（私有）
//					->1H旋转角弹道（私有）
//				->0I二维弹道应用
//					->1I移动弹道（私有）
//				->0M弹道工具函数（私有）
//				->0N校验值
//			
//			
//			->弹道扩展工具【Drill_COBa_ExtendTool】
//				->0A叠加变化宏定义
//					->设置目标（开放函数）
//					->控制器帧刷新（开放函数）
//					->贴图帧刷新（开放函数）
//		
//		
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 弹道管理器（私有）【Drill_COBa_Manager】
//			* 弹道扩展工具【Drill_COBa_ExtendTool】
//		
//		★核心说明：
//			1.插件提供数学计算，setBallistics初始化，preBallistics推演赋值（也叫 预推演，两词一样意思）。
//			  预推演 是指在 移动之前 进行弹道计算，才有"预"的意思。
//			  此计算过程【不存储】任何参数。
//			2.用法：
//					// > 移动
//					$gameTemp.drill_COBa_setBallisticsMove( data );							//初始化
//					$gameTemp.drill_COBa_preBallisticsMove( obj, index , org_x, org_y );	//推演赋值（也叫 预推演，两词一样意思）
//					// > 透明度
//					$gameTemp.drill_COBa_setBallisticsOpacity( data );						//初始化
//					$gameTemp.drill_COBa_preBallisticsOpacity( obj, index , org_opacity );	//推演赋值（也叫 预推演，两词一样意思）
//					// > 旋转
//					$gameTemp.drill_COBa_setBallisticsRotate( data );						//初始化
//					$gameTemp.drill_COBa_preBallisticsRotate( obj, index , org_rotate );	//推演赋值（也叫 预推演，两词一样意思）
//			
//			  注意，初始化和推演函数【不要隔得太远】因为有可能会被重叠推演盖掉。
//			  obj用于放配置数据，执行完后，结果集会放到下面两个数组中：
//			  		obj['_drill_COBa_x']
//			  		obj['_drill_COBa_y']
//			  obj可以是 控制器、贴图、空对象、空数组，只要能放结果就可以。
//		
//		★必要注意事项：
//			1.结合文档 "32.数学模型 > 关于弹道.docx" 来看脚本。
//			2.记得多画几个星星弹道作为演示，小爱丽丝+星星的效果本身就不差。
//				   ____________   / \
//				__________ ......'   '......
//				 __________ '-._       _.-'
//				_____________  /       \
//				  __________  /_.-'''-._\
//			
//		★其它说明细节：
//			1.默认情况下，data['planimetryTime'] 时长 就是数组的长度。
//			  但如果你设置了 延迟时间，就需要考虑数组长度变化的问题了。
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
	DrillUp.g_COBa_PluginTip_curName = "Drill_CoreOfBallistics.js 数学模型-弹道核心";
	DrillUp.g_COBa_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 参数错误
	//==============================
	DrillUp.drill_COBa_getPluginTip_ValueError = function( param_msg, p ){
		return  "【" + DrillUp.g_COBa_PluginTip_curName + "】\n检测到公式值出现"+param_msg+"，请及时检查你的公式是否正确。"+
				"\n当前取值：" + JSON.stringify( p );
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_COBa_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_COBa_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
		if( check_tank != undefined ){
			var keys = Object.keys( check_tank );
			for( var i=0; i < keys.length; i++ ){
				text += "\n" + keys[i] + "的值：" + check_tank[ keys[i] ] ;
			}
		}
		return text;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfBallistics = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfBallistics');
	
	
	//==============================
	// * 静态数据 - 定义弹道管理器
	//==============================
	function Drill_COBa_Manager() {
		throw new Error("弹道管理器 Drill_COBa_Manager 是一个静态类，不需要实例化。");
	};



//#############################################################################
// ** 【标准模块】☆移动弹道 标准模块
//#############################################################################
//##############################
// * 移动弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象								（准备的数据）
//			返回：	> 动态参数对象									（推演赋值 用的数据）
//					> Drill_COBa_Manager._drill_COBa_planimetryData	（推演赋值 用的数据）
//			
//			功能：	> 纯数学计算。给传来的data进行初始赋值。
//                  > 一次性执行：
//						执行此函数后，立即执行 推演赋值，并且确保这两个接口在同一个函数内执行即可。
//					> 控制器-贴图执行：
//						先将 返回的初始化数据 放控制器中存储，在到贴图中再进行推演赋值。
//						返回的数据参数进行了最大化的简略，存储消耗较低。
//					
//			说明：	> 动态参数对象 全部参数见 drill_COBa_setBallisticsMove_Private 。
//                  > 注意，锚点列表的格式固定为：[ {'x':0,'y':0} ]，你可以用工具类转一下。
//					> 执行后，会固定 随机因子列表（randomFactorList），可将 返回数据 存储，进而确保生成相同的弹道。
//					  返回数据 可以放入此函数再次执行，参数对象内容不会变。
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsMove = function( data ){
	return Drill_COBa_Manager.drill_COBa_setBallisticsMove( data );
}
Drill_COBa_Manager.drill_COBa_setBallisticsMove = function( data ){
	return this.drill_COBa_setBallisticsMove_Private( data );
}
//##############################
// * 移动弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组的长度）
//					
//			说明：	> 此函数必须在 初始化数据 之后调用。得到的值是【弹道数组的长度】，即弹道总时间。
//					> 注意，'movementTime'不是总时间，还需要考虑延迟时间。
//					> 此函数能在推演赋值前，得到数组长度。
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsMove_TotalTime = function(){
	return Drill_COBa_Manager.drill_COBa_getBallisticsMove_TotalTime();
}
Drill_COBa_Manager.drill_COBa_getBallisticsMove_TotalTime = function(){
	return this.drill_COBa_getBallisticsPlanimetry_TotalTime();
}
//##############################
// * 移动弹道 - 推演赋值【标准函数】
//			
//			参数：	> obj_data 对象									（对象容器）
//					> obj_index 数字								（对象编号）
//					> org_x 数字										（初始x位置）
//					> org_y 数字										（初始y位置）
//					> Drill_COBa_Manager._drill_COBa_planimetryData	（初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_x'] 数字数组（计算的X结果）
//					> this['_drill_COBa_y'] 数字数组（计算的Y结果）
//			
//			功能：	> 纯数学计算。根据当前的弹道参数设置，开始计算轨迹。
//					> 如果对象为碎片组/粒子组，则此函数需要在for循环内遍历 对象编号 并执行。
//					
//			说明：	> 对象编号 obj_index 必须按照预先给的来，即 0 到 'movementNum'-1 的值。
//					> 每次推演返回的数组长度都一样。
//					  但注意 弹道长度 = 时长+1，延迟参数 会影响弹道长度。
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsMove = function( obj_data, obj_index, org_x, org_y ){
	Drill_COBa_Manager.drill_COBa_preBallisticsMove( obj_data, obj_index, org_x, org_y );
}
Drill_COBa_Manager.drill_COBa_preBallisticsMove = function( obj_data, obj_index, org_x, org_y ){
	this.drill_COBa_preBallisticsMove_Private( obj_data, obj_index, org_x, org_y );
}


//#############################################################################
// ** 【标准模块】☆透明度弹道 标准模块
//#############################################################################
//##############################
// * 透明度弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象							（准备的数据）
//			返回：	> 动态参数对象								（推演赋值 用的数据）
//					> Drill_COBa_Manager._drill_COBa_commonData	（推演赋值 用的数据）
//			
//			功能：	> 见 "移动弹道 - 初始化数据【标准默认值】"。
//			说明：	> 动态参数对象 全部参数见 drill_COBa_setBallisticsOpacity_Private 。
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsOpacity = function( data ){
	return Drill_COBa_Manager.drill_COBa_setBallisticsOpacity( data );
}
Drill_COBa_Manager.drill_COBa_setBallisticsOpacity = function( data ){
	return this.drill_COBa_setBallisticsOpacity_Private( data );
}
//##############################
// * 透明度弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组的长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsOpacity_TotalTime = function(){
	return Drill_COBa_Manager.drill_COBa_getBallisticsOpacity_TotalTime();
}
Drill_COBa_Manager.drill_COBa_getBallisticsOpacity_TotalTime = function(){
	return this.drill_COBa_getBallisticsCommon_TotalTime();
}
//##############################
// * 透明度弹道 - 推演赋值【标准函数】
//			
//			参数：	> obj_data 对象								（对象容器）
//					> obj_index 数字							（对象编号）
//					> org_opacity 数字							（初始透明度）
//					> Drill_COBa_Manager._drill_COBa_commonData	（初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_opacity'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsOpacity = function( obj_data, obj_index, org_opacity ){
	Drill_COBa_Manager.drill_COBa_preBallisticsOpacity( obj_data, obj_index, org_opacity );
}
Drill_COBa_Manager.drill_COBa_preBallisticsOpacity = function( obj_data, obj_index, org_opacity ){
	this.drill_COBa_preBallisticsOpacity_Private( obj_data, obj_index, org_opacity );
}

//#############################################################################
// ** 【标准模块】☆缩放X弹道 标准模块
//#############################################################################
//##############################
// * 缩放X弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象							（准备的数据）
//			返回：	> 动态参数对象								（推演赋值 用的数据）
//					> Drill_COBa_Manager._drill_COBa_commonData	（推演赋值 用的数据）
//			
//			功能：	> 见 "移动弹道 - 初始化数据【标准默认值】"。
//			说明：	> 动态参数对象 全部参数见 drill_COBa_setBallisticsScaleX_Private 。
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsScaleX = function( data ){
	return Drill_COBa_Manager.drill_COBa_setBallisticsScaleX( data );
}
Drill_COBa_Manager.drill_COBa_setBallisticsScaleX = function( data ){
	return this.drill_COBa_setBallisticsScaleX_Private( data );
}
//##############################
// * 缩放X弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组的长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsScaleX_TotalTime = function(){
	return Drill_COBa_Manager.drill_COBa_getBallisticsScaleX_TotalTime();
}
Drill_COBa_Manager.drill_COBa_getBallisticsScaleX_TotalTime = function(){
	return this.drill_COBa_getBallisticsCommon_TotalTime();
}
//##############################
// * 缩放X弹道 - 推演赋值【标准函数】
//			
//			参数：	> obj_data 对象								（对象容器）
//					> obj_index 数字							（对象编号）
//					> orgScaleX 数字							（初始缩放X）
//					> Drill_COBa_Manager._drill_COBa_commonData	（初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_scaleX'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsScaleX = function( obj_data, obj_index, orgScaleX ){
	Drill_COBa_Manager.drill_COBa_preBallisticsScaleX( obj_data, obj_index, orgScaleX );
}
Drill_COBa_Manager.drill_COBa_preBallisticsScaleX = function( obj_data, obj_index, orgScaleX ){
	this.drill_COBa_preBallisticsScaleX_Private( obj_data, obj_index, orgScaleX );
}

//#############################################################################
// ** 【标准模块】☆缩放Y弹道 标准模块
//#############################################################################
//##############################
// * 缩放Y弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象							（准备的数据）
//			返回：	> 动态参数对象								（推演赋值 用的数据）
//					> Drill_COBa_Manager._drill_COBa_commonData	（推演赋值 用的数据）
//			
//			功能：	> 见 "移动弹道 - 初始化数据【标准默认值】"。
//			说明：	> 动态参数对象 全部参数见 drill_COBa_setBallisticsScaleY_Private 。
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsScaleY = function( data ){
	return Drill_COBa_Manager.drill_COBa_setBallisticsScaleY( data );
}
Drill_COBa_Manager.drill_COBa_setBallisticsScaleY = function( data ){
	return this.drill_COBa_setBallisticsScaleY_Private( data );
}
//##############################
// * 缩放Y弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组的长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsScaleY_TotalTime = function(){
	return Drill_COBa_Manager.drill_COBa_getBallisticsScaleY_TotalTime();
}
Drill_COBa_Manager.drill_COBa_getBallisticsScaleY_TotalTime = function(){
	return this.drill_COBa_getBallisticsCommon_TotalTime();
}
//##############################
// * 缩放Y弹道 - 推演赋值【标准函数】
//			
//			参数：	> obj_data 对象								（对象容器）
//					> obj_index 数字							（对象编号）
//					> orgScaleY 数字							（初始缩放Y）
//					> Drill_COBa_Manager._drill_COBa_commonData	（初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_scaleY'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsScaleY = function( obj_data, obj_index, orgScaleY ){
	Drill_COBa_Manager.drill_COBa_preBallisticsScaleY( obj_data, obj_index, orgScaleY );
}
Drill_COBa_Manager.drill_COBa_preBallisticsScaleY = function( obj_data, obj_index, orgScaleY ){
	this.drill_COBa_preBallisticsScaleY_Private( obj_data, obj_index, orgScaleY );
}

//#############################################################################
// ** 【标准模块】☆旋转角弹道 标准模块
//#############################################################################
//##############################
// * 旋转角弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象							（准备的数据）
//			返回：	> 动态参数对象								（推演赋值 用的数据）
//					> Drill_COBa_Manager._drill_COBa_commonData	（推演赋值 用的数据）
//			
//			功能：	> 见 "移动弹道 - 初始化数据【标准默认值】"。
//			说明：	> 动态参数对象 全部参数见 drill_COBa_setBallisticsRotate_Private 。
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsRotate = function( data ){
	return Drill_COBa_Manager.drill_COBa_setBallisticsRotate( data );
}
Drill_COBa_Manager.drill_COBa_setBallisticsRotate = function( data ){
	return this.drill_COBa_setBallisticsRotate_Private( data );
}
//##############################
// * 旋转角弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组的长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsRotate_TotalTime = function(){
	return Drill_COBa_Manager.drill_COBa_getBallisticsRotate_TotalTime();
}
Drill_COBa_Manager.drill_COBa_getBallisticsRotate_TotalTime = function(){
	return this.drill_COBa_getBallisticsCommon_TotalTime();
}
//##############################
// * 旋转角弹道 - 推演赋值【标准函数】
//			
//			参数：	> obj_data 对象								（对象容器）
//					> obj_index 数字							（对象编号）
//					> org_rotate 数字							（初始旋转角）
//					> Drill_COBa_Manager._drill_COBa_commonData	（初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_rotate'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsRotate = function( obj_data, obj_index, org_rotate ){
	Drill_COBa_Manager.drill_COBa_preBallisticsRotate( obj_data, obj_index, org_rotate );
}
Drill_COBa_Manager.drill_COBa_preBallisticsRotate = function( obj_data, obj_index, org_rotate ){
	this.drill_COBa_preBallisticsRotate_Private( obj_data, obj_index, org_rotate );
}



//#############################################################################
// ** 【标准模块】☆弹道工具 标准模块
//#############################################################################
//##############################
// * 弹道工具 - 字符串 转 锚点列表【标准函数】
//			
//			参数：	> str 字符串
//			返回：	> 点列表
//			
//			说明：	> 字符串的格式如："(1,1),(2,3)"，可以穿插空格，括号可以是中文括号。
//##############################
DrillUp.drill_COBa_convertStringToPointList = function( str ){
	return Drill_COBa_Manager.drill_COBa_convertStringToPointList( str );
};
Drill_COBa_Manager.drill_COBa_convertStringToPointList = function( str ){
	return this.drill_COBa_convertStringToPointList_Private( str );
};
//##############################
// * 弹道工具 - 锚点列表 转 字符串【标准函数】
//			
//			参数：	> point_list 点列表
//			返回：	> 字符串
//			
//			说明：	> 点列表格式为：[{x:0,y:0},{x:1,y:0}] 。
//##############################
DrillUp.drill_COBa_convertPointListToString = function( point_list ){
	return Drill_COBa_Manager.drill_COBa_convertPointListToString( point_list );
};
Drill_COBa_Manager.drill_COBa_convertPointListToString = function( point_list ){
	return this.drill_COBa_convertPointListToString_Private( point_list );
};



//=============================================================================
// ** 弹道管理器（私有）【Drill_COBa_Manager】
// **			
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个静态类，用于弹道的纯数学计算。
// **		子功能：	
// **					->0A一维弹道【common】
// **						->模式
// **							> 时间公式模式
// **							> 时间锚点模式
// **							> 目标值模式
// **						->参数模式
// **							-> ■ 时间公式（o-t图）
// **							-> ■ 时间锚点（anchor）
// **							-> ■ 目标值（target）
// **						->应用对象
// **							->透明度
// **							->缩放X
// **							->缩放Y
// **							->旋转角
// **						->随机因子列表（randomFactorList）
// **					
// **					->0B二维弹道【planimetry】
// **						->模式
// **							> 极坐标模式
// **							> 直角坐标模式
// **							> 轨道锚点模式
// **							> 两点式
// **						->参数模式
// **							-> ■ 极坐标（polar）：方向 + 速度
// **							-> ■ 直角坐标（cartesian）：x速度 + y速度
// **							-> ■ 轨道锚点（track）：锚点列表 + 速度
// **							-> ■ 两点式（twoPoint）
// **						->属性
// **							->速度
// **								->只初速度
// **								->初速度+波动量
// **								->初速度+波动量+加速度
// **								->初速度+波动量+加速度+最大最小
// **								->路程计算公式
// **							->方向
// **								->固定方向
// **								->四周扩散（线性/随机）
// **								->扇形范围方向（线性/随机）
// **								->方向计算公式
// **							->轨道锚点
// **								> 锚点列表
// **								> 距离容器
// **								> 时间冗余标记
// **							->两点式
// **								> 不变化
// **								> 瞬间变化
// **								> 匀速变化
// **								> 增减速变化
// **								> 弹性变化
// **								> 抛物线变化
// **							->随机因子列表（randomFactorList）
// **							->终止条件（terminate）
// **					
// **					->0H一维弹道应用
// **						->1H透明度弹道（私有）
// **						->1H缩放X弹道（私有）
// **						->1H缩放Y弹道（私有）
// **						->1H旋转角弹道（私有）
// **					->0I二维弹道应用
// **						->1I移动弹道（私有）
// **					
// **					->0M弹道工具函数（私有）
// **						->字符串 转 锚点列表
// **						->锚点列表 转 字符串
// **					->0N校验值
// **						->undefined未定义
// **						->NaN值
// **						->无穷大/无穷小
// **				
// **		说明：	> 该静态类中【不存储】任何参数。
// **				> 具体功能见 "32.数学模型 > 关于弹道.docx"。
// **				> 如果子插件要存储弹道，可以只存参数配置，需要用时才执行 初始化和推演赋值；也可以存储 推演赋值 的结果。
//=============================================================================
//==============================
// * 弹道管理器 - 定义
//==============================
	//（必须放最前面）

//=============================================================================
// * 0A一维弹道【common】
//			
//			说明：	> 此模块不对 子插件 开放，不建议直接使用该弹道中的参数。
//					> 一维弹道走流程 初始化 > 推演赋值 之后，会赋值参数：_drill_COBa_common 。
//=============================================================================
//==============================
// * 0A一维弹道 - 参数（私有）
//==============================
Drill_COBa_Manager._drill_COBa_commonData = {};
//==============================
// * 0A一维弹道 - 初始化（私有）
//==============================
Drill_COBa_Manager.drill_COBa_setBallisticsCommon = function( dataFrom ){
	var result = {};
	
	// > 基础参数（common）
	result['commonNum'] = dataFrom['commonNum'] || 1;						//一维弹道 - 子弹数量
	result['commonTime'] = dataFrom['commonTime'] || 1;                 	//一维弹道 - 时长
	result['commonDelay'] = dataFrom['commonDelay'] || 0;               	//一维弹道 - 开始前延迟时间
	result['commonEndDelay'] = dataFrom['commonEndDelay'] || 0;         	//一维弹道 - 到终点后延迟时间
	result['commonOrderDelay'] = dataFrom['commonOrderDelay'] || 0;         //一维弹道 - ID依次延迟时间
	result['commonMode'] = dataFrom['commonMode'] || "目标值模式";      	//一维弹道 - 变化模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['commonMode'] == "时间公式模式" ){
		result['otFormula'] = dataFrom['otFormula'];						//时间公式 - 公式值（字符串，可为空）
	}
	
	//   ■ 时间锚点（anchor）
	else if( result['commonMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = dataFrom['anchorPointTank'] || [];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）
	else if( result['commonMode'] == "目标值模式" ){
		result['targetType'] = dataFrom['targetType'] || "瞬间变化";		//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = dataFrom['targetDifference'] || 0;     //目标值 - 距离差值（终点值减起点值）
	}
	
	
	// > 随机因子列表（randomFactorList）
	//		『随机因子的迭代管理』『随机因子的迭代工具』：弹道核心不含任何迭代功能，需要外部插件自己管理随机因子。
	result['randomFactorList'] = [];
	for( var i = 0; i < result['commonNum']; i++ ){
		if( dataFrom['randomFactorList'] !== undefined &&
			dataFrom['randomFactorList'][i] !== undefined ){
			result['randomFactorList'][i] = dataFrom['randomFactorList'][i];
		}else{
			result['randomFactorList'][i] = Math.random();  //『随机因子-玩法用』（可以被子插件覆盖赋值）
		}
	}
	
	
	// > 终止条件（terminate）
	result['terminateRangeEnabled'] = dataFrom['terminateRangeEnabled'] || false;	//终止条件 - 范围开关
	if( result['terminateRangeEnabled'] == true ){									//
		if( dataFrom['terminateRange'] != undefined ){								//终止条件 - 范围
			result['terminateRange'] = JSON.parse(JSON.stringify( dataFrom['terminateRange'] ));  //『深拷贝-核心自定义数据』
		}else{
			result['terminateRange'] = {'min':0,'max':0};
		}
	}
	
	
	this._drill_COBa_commonData = result;
	this._drill_COBa_commonObj = null;
	return result;
}
//==============================
// * 0A一维弹道 - 获取弹道总时间（私有）
//==============================
Drill_COBa_Manager.drill_COBa_getBallisticsCommon_TotalTime = function(){
	var dataFrom = this._drill_COBa_commonData;
	var result = dataFrom['commonTime'];
	result += dataFrom['commonDelay'];
	result += dataFrom['commonEndDelay'];
	result += dataFrom['commonOrderDelay'] * (dataFrom['commonNum']-1);
	return result;
}
//==============================
// * 0A一维弹道 - 推演赋值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_preBallisticsCommon = function( obj_data, obj_index, orgCommon ){
	var data = this._drill_COBa_commonData;
	var obj = this._drill_COBa_commonObj;
	
	// > 初始化校验
	if( isNaN( obj_index ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ParamIsNaN( "obj_index" ) );
	}
	if( isNaN( orgCommon ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ParamIsNaN( "orgCommon" ) );
	}
	obj_data['_drill_COBa_common'] = [];
	
	
	// > 推演赋值的obj
	if( this._drill_COBa_commonObj == null ){
		this._drill_COBa_commonObj = {};
		obj = this._drill_COBa_commonObj;
		//   公式obj
		if( data['commonMode'] == "时间公式模式"){
			var formula = data['otFormula'];
			if( formula == undefined || formula == "" ){ formula = "return 0"; }
			eval("obj['otFunction'] = function( p ){ "+formula+" }" );
		}
		if( data['commonMode'] == "时间锚点模式" ){
			//（无公式）
		}
		if( data['commonMode'] == "目标值模式" ){
			//（无公式）
		}
	}
	
	// > 终止条件（最大值最小值范围）
	var range_enabled = data['terminateRangeEnabled'] || false;
	if( range_enabled ){			
		var value_min = data['terminateRange']['min'];
		var value_max = data['terminateRange']['max'];
	}
	
	
	/*-----------------一维弹道 - 时间公式模式------------------*/
	if( data['commonMode'] == "时间公式模式"){
		
		// > 时间公式模式 - 起点值
		obj_data['_drill_COBa_common'].push( orgCommon );
		
		// > 时间公式模式 - 随机值（来自 随机因子列表）
		var randomValue = 0;
		if( data['randomFactorList'] !== undefined &&
			data['randomFactorList'][ obj_index ] !== undefined ){
			randomValue = data['randomFactorList'][ obj_index ];
		}
		
		// > 时间公式模式 - 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};				//参数容器
		var cc;					//相对值
		
		// > 时间公式模式 - 开始计算
		for(var time=1; time <= data['commonTime']; time++){	//（弹道长度 = 时长+1，延迟参数 会影响弹道长度）
			
			p.index = obj_index;				
			p.time  = time;
			p.ran   = randomValue;
			p.num   = data['commonNum'];
			
			cc = obj['otFunction'].call(this, p );	
			Drill_COBa_Manager.drill_COBa_checkParamValue( p, cc );		//（校验值）
		
			cc = orgCommon + cc;
			obj_data['_drill_COBa_common'].push(cc);
			
			// > 终止条件
			if( range_enabled ){				
				if( cc < value_min ){ break; }
				if( cc > value_max ){ break; }
			}
		}
	}
	
	
	/*-----------------一维弹道 - 时间锚点模式------------------*/
	else if( data['commonMode'] == "时间锚点模式"){
		
		// > 时间锚点模式 - 起点值
		obj_data['_drill_COBa_common'].push( orgCommon );
		
		// > 时间锚点模式 - 锚点初始化
		if( data['anchorPointTank'].length < 2 ){	//（至少要两个点才能计算）
			data['anchorPointTank'] = [];
			data['anchorPointTank'].push( {'t':0,'o':0} );
			data['anchorPointTank'].push( {'t':100,'o':255} );
		}
		
		// > 时间锚点模式 - 开始计算（这里默认 data['anchorPointTank'] 已根据 t 排序 ）
		for(var time=1; time <= data['commonTime']; time++){	//（弹道长度 = 时长+1，延迟参数 会影响弹道长度）
			var time_per = time * 100 / data['commonTime'];		//（时间百分比） 
			
			// > 找到百分比的落脚点
			var start_index = 0;
			var end_index = 0;
			for( var i = 0; i < data['anchorPointTank'].length; i++ ){
				var p = data['anchorPointTank'][i];
				if( time_per < p['t'] ){
					start_index = i-1;
					end_index = i;
					break;
				}
			}
			
			// > 直接找到末尾点
			if( end_index == 0 ){
				obj_data['_drill_COBa_common'].push( data['anchorPointTank'][ data['anchorPointTank'].length-1 ]['o'] );
				continue;
			}
			// > 开头点都没接触到
			if( start_index == -1 ){
				obj_data['_drill_COBa_common'].push( data['anchorPointTank'][0]['o'] );
				continue;
			}
			
			// > 计算落脚点
			var p_start = data['anchorPointTank'][start_index];
			var p_end = data['anchorPointTank'][end_index];
			var d_time = p_end['t'] - p_start['t'];
			var cur_time = time_per - p_start['t'];
			var cc = cur_time / d_time * ( p_end['o'] - p_start['o'] ) + p_start['o'];
			obj_data['_drill_COBa_common'].push( cc );
			
			// > 终止条件
			if( range_enabled ){				
				if( cc < value_min ){ break; }
				if( cc > value_max ){ break; }
			}
		}
		
	}


	/*-----------------一维弹道 - 目标值模式------------------*/
	else if( data['commonMode'] == "目标值模式"){
	
		// > 目标值模式 - 变量定义（写这里是为优化性能，减少反复创建次数）
		var cc;					//相对值
		var dC;					//距离差值
		var dt;					//时长
		
		// > 目标值模式 - 瞬间变化（目标时间<=1，无视类型直接视作为瞬间变化）
		if( data['commonTime'] <= 1 ){
			
			cc = data['targetDifference'];	//（一直待在终点）
			
			cc = orgCommon + cc;
			obj_data['_drill_COBa_common'].push(cc);
			
		// > 目标值模式 - 开始计算
		}else{
			
			for(var time = 0; time <= data['commonTime']; time++){	//（弹道长度 = 时长+1，延迟参数 会影响弹道长度）
				cc = 0;
				
				if( data['targetType'] == "瞬间变化"){
					cc = data['targetDifference'];	//（一直待在终点）
				}
				
				else if( data['targetType'] == "匀速变化"){
					dC = data['targetDifference'];
					dt = data['commonTime'];
					
					cc = time * dC / dt;
				}
				
				else if( data['targetType'] == "增减速变化"){	
					dC = data['targetDifference'];
					dt = data['commonTime'];
					
					var v_max = dC / dt *2;			//（先加速后减速）
					var a = v_max / dt *2;
					if( time < dt/2 ){
						cc = a*time*time/2;
					}else{
						var t_p = time - dt/2;
						cc = dC/2 + v_max*t_p - a*t_p*t_p/2;
					}
				}
				
				else if( data['targetType'] == "弹性变化"){
					dC = data['targetDifference'];
					dt = data['commonTime'];
					
					var ac = 2 * dC / dt / dt;		//（匀减速变化到目标点）
					var c_time = dt - time;
					cc = 0.5 * ac * dt * dt - 0.5 * ac * c_time * c_time ;
				}
				
				cc = orgCommon + cc;
				obj_data['_drill_COBa_common'].push(cc);
				
				// > 终止条件
				if( range_enabled ){				
					if( cc < value_min ){ break; }
					if( cc > value_max ){ break; }
				}
			}
		}
	}
	
	// > 延迟（开始前延迟时间）
	for(var i = 0; i < data['commonDelay']; i++){
		obj_data['_drill_COBa_common'].unshift( obj_data['_drill_COBa_common'][0] );
	}
	// > 延迟（到终点后延迟时间）
	for(var i = 0; i < data['commonEndDelay']; i++){
		obj_data['_drill_COBa_common'].push( obj_data['_drill_COBa_common'][ obj_data['_drill_COBa_common'].length-1 ] );
	}
	// > 延迟（ID依次延迟时间）
	if( data['commonOrderDelay'] > 0 ){
		var start_num = obj_index;
		var end_num = data['commonNum']-1 - obj_index;
		var start_delay = start_num * data['commonOrderDelay'];
		var end_delay = end_num * data['commonOrderDelay'];
		for(var i = 0; i < start_delay; i++){
			obj_data['_drill_COBa_common'].unshift( obj_data['_drill_COBa_common'][0] );
		}
		for(var i = 0; i < end_delay; i++){
			obj_data['_drill_COBa_common'].push( obj_data['_drill_COBa_common'][ obj_data['_drill_COBa_common'].length-1 ] );
		}
	}else if( data['commonOrderDelay'] < 0 ){
		var start_num = data['commonNum']-1 - obj_index;
		var end_num = obj_index;
		var start_delay = start_num * Math.abs( data['commonOrderDelay'] );
		var end_delay = end_num * Math.abs( data['commonOrderDelay'] );
		for(var i = 0; i < start_delay; i++){
			obj_data['_drill_COBa_common'].unshift( obj_data['_drill_COBa_common'][0] );
		}
		for(var i = 0; i < end_delay; i++){
			obj_data['_drill_COBa_common'].push( obj_data['_drill_COBa_common'][ obj_data['_drill_COBa_common'].length-1 ] );
		}
	}else{
		//（不操作）
	}
	
}


//=============================================================================
// * 0B二维弹道【planimetry】
//			
//			说明：	> 此模块不对 子插件 开放，不建议直接使用该弹道中的参数。
//					> 二维弹道走流程 初始化 > 推演赋值 之后，会赋值参数：_drill_COBa_x、_drill_COBa_y 。
//=============================================================================
//==============================
// * 0B二维弹道 - 参数（私有）
//==============================
Drill_COBa_Manager._drill_COBa_planimetryData = {};
//==============================
// * 0B二维弹道 - 初始化数据 默认值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_setBallisticsPlanimetry = function( dataFrom ){
	var result = {};
	
	// > 基础参数（planimetry）
	result['planimetryNum'] = dataFrom['planimetryNum'] || 1;								//二维弹道 - 子弹数量
	result['planimetryTime'] = dataFrom['planimetryTime'] || 1;                     		//二维弹道 - 时长
	result['planimetryDelay'] = dataFrom['planimetryDelay'] || 0;                   		//二维弹道 - 开始前延迟时间
	result['planimetryEndDelay'] = dataFrom['planimetryEndDelay'] || 0;             		//二维弹道 - 到终点后延迟时间
	result['planimetryOrderDelay'] = dataFrom['planimetryOrderDelay'] || 0; 				//二维弹道 - ID依次延迟时间（可为正数负数，将在首尾形成额外梯度的延迟时间）
	result['planimetryMode'] = dataFrom['planimetryMode'] || "极坐标模式";          		//二维弹道 - 变化模式（极坐标模式/直角坐标模式/两点式/…）
	
	//   ■ 极坐标（polar）		
	if( result['planimetryMode'] == "极坐标模式" ){  //（这样写是为了减少参数数量，便于存储）
		result['polarSpeedType'] = dataFrom['polarSpeedType'] || "只初速度";				//极坐标 - 速度 - 类型
		result['polarSpeedBase'] = dataFrom['polarSpeedBase'] || 0;                         //极坐标 - 速度 - 初速度
		result['polarSpeedRandom'] = dataFrom['polarSpeedRandom'] || 0;                     //极坐标 - 速度 - 速度随机波动量
		result['polarSpeedInc'] = dataFrom['polarSpeedInc'] || 0;                           //极坐标 - 速度 - 加速度
		result['polarSpeedMax'] = dataFrom['polarSpeedMax'] || 0;                           //极坐标 - 速度 - 最大速度
		result['polarSpeedMin'] = dataFrom['polarSpeedMin'] || 0;                           //极坐标 - 速度 - 最小速度
		result['polarDistanceFormula'] = dataFrom['polarDistanceFormula']; 					//极坐标 - 速度 - 路程计算公式（字符串，可为空）
		result['polarDirType'] = dataFrom['polarDirType'] || "固定方向";                    //极坐标 - 方向 - 类型
		result['polarDirFixed'] = dataFrom['polarDirFixed'] || 0;                           //极坐标 - 方向 - 固定方向
		result['polarDirSectorFace'] = dataFrom['polarDirSectorFace'] || 0;                 //极坐标 - 方向 - 扇形朝向
		result['polarDirSectorDegree'] = dataFrom['polarDirSectorDegree'] || 0;             //极坐标 - 方向 - 扇形角度
		result['polarDirRate'] = dataFrom['polarDirRate'] || 0;                             //极坐标 - 方向 - 方向角速率
		result['polarDirFormula'] = dataFrom['polarDirFormula'];							//极坐标 - 方向 - 方向计算公式（字符串，可为空）
	}
	//   ■ 直角坐标（cartesian）
	else if( result['planimetryMode'] == "直角坐标模式" ){
		result['cartRotation'] = dataFrom['cartRotation'] || 0;								//直角坐标 - 整体坐标轴旋转角度
		result['cartXSpeedType'] = dataFrom['cartXSpeedType'] || "只初速度";				//直角坐标 - x - 类型	
		result['cartXSpeedBase'] = dataFrom['cartXSpeedBase'] || 0;                         //直角坐标 - x - 初速度
		result['cartXSpeedRandom'] = dataFrom['cartXSpeedRandom'] || 0;                     //直角坐标 - x - 速度随机波动量
		result['cartXSpeedInc'] = dataFrom['cartXSpeedInc'] || 0;                           //直角坐标 - x - 加速度
		result['cartXSpeedMax'] = dataFrom['cartXSpeedMax'] || 0;                           //直角坐标 - x - 最大速度
		result['cartXSpeedMin'] = dataFrom['cartXSpeedMin'] || 0;                           //直角坐标 - x - 最小速度
		result['cartXDistanceFormula'] = dataFrom['cartXDistanceFormula'];					//直角坐标 - x - 路程计算公式（字符串，可为空）
		result['cartYSpeedType'] = dataFrom['cartYSpeedType'] || "只初速度";                //直角坐标 - y - 类型
		result['cartYSpeedBase'] = dataFrom['cartYSpeedBase'] || 0;                         //直角坐标 - y - 初速度
		result['cartYSpeedRandom'] = dataFrom['cartYSpeedRandom'] || 0;                     //直角坐标 - y - 速度随机波动量
		result['cartYSpeedInc'] = dataFrom['cartYSpeedInc'] || 0;                           //直角坐标 - y - 加速度
		result['cartYSpeedMax'] = dataFrom['cartYSpeedMax'] || 0;                           //直角坐标 - y - 最大速度
		result['cartYSpeedMin'] = dataFrom['cartYSpeedMin'] || 0;                           //直角坐标 - y - 最小速度
		result['cartYDistanceFormula'] = dataFrom['cartYDistanceFormula'];					//直角坐标 - y - 路程计算公式（字符串，可为空）
	}
	//   ■ 轨道锚点（track）		
	else if( result['planimetryMode'] == "轨道锚点模式" ){
		result['trackSpeedType'] = dataFrom['trackSpeedType'] || "只初速度";				//轨道锚点 - 速度 - 类型
		result['trackSpeedBase'] = dataFrom['trackSpeedBase'] || 0;                         //轨道锚点 - 速度 - 初速度
		result['trackSpeedRandom'] = dataFrom['trackSpeedRandom'] || 0;                     //轨道锚点 - 速度 - 速度随机波动量
		result['trackSpeedInc'] = dataFrom['trackSpeedInc'] || 0;                           //轨道锚点 - 速度 - 加速度
		result['trackSpeedMax'] = dataFrom['trackSpeedMax'] || 0;                           //轨道锚点 - 速度 - 最大速度
		result['trackSpeedMin'] = dataFrom['trackSpeedMin'] || 0;                           //轨道锚点 - 速度 - 最小速度
		result['trackDistanceFormula'] = dataFrom['trackDistanceFormula'];					//轨道锚点 - 速度 - 路程计算公式（字符串，可为空）
		result['trackPointTank'] = dataFrom['trackPointTank'] || [];                        //轨道锚点 - 轨道 - 锚点列表
		result['trackRotation'] = dataFrom['trackRotation'] || 0;                           //轨道锚点 - 轨道 - 整体旋转角度
	}
	//   ■ 两点式（twoPoint）
	else if( result['planimetryMode'] == "两点式" ){
		result['twoPointType'] = dataFrom['twoPointType'] || "不变化";						//两点式 - 类型（不变化/匀速变化/弹性变化/……）
		result['twoPointDifferenceX'] = dataFrom['twoPointDifferenceX'] || 0;				//两点式 - 距离差值x（终点减起点）
		result['twoPointDifferenceY'] = dataFrom['twoPointDifferenceY'] || 0;	            //两点式 - 距离差值y（终点减起点）
		result['twoPointParabolaDir'] = dataFrom['twoPointParabolaDir'] || 0;	            //两点式 - 抛物线变化 - 初始方向（单位角度）
		result['twoPointParabolaSpeed'] = dataFrom['twoPointParabolaSpeed'] || 0;	        //两点式 - 抛物线变化 - 初始速度
	}
	
	
	// > 随机因子列表（randomFactorList）
	//		『随机因子的迭代管理』『随机因子的迭代工具』：弹道核心不含任何迭代功能，需要外部插件自己管理随机因子。
	if( result['planimetryMode'] == "极坐标模式" ){
		result['polarSpeedRandomFactorList'] = [];
		for( var i = 0; i < result['planimetryNum']; i++ ){
			if( dataFrom['polarSpeedRandomFactorList'] !== undefined &&
				dataFrom['polarSpeedRandomFactorList'][i] !== undefined ){
				result['polarSpeedRandomFactorList'][i] = dataFrom['polarSpeedRandomFactorList'][i];
			}else{
				result['polarSpeedRandomFactorList'][i] = Math.random();  //『随机因子-玩法用』（可以被子插件覆盖赋值）
			}
		}
		result['polarDirRandomFactorList'] = [];
		for( var i = 0; i < result['planimetryNum']; i++ ){
			if( dataFrom['polarDirRandomFactorList'] !== undefined &&
				dataFrom['polarDirRandomFactorList'][i] !== undefined ){
				result['polarDirRandomFactorList'][i] = dataFrom['polarDirRandomFactorList'][i];
			}else{
				result['polarDirRandomFactorList'][i] = Math.random();  //『随机因子-玩法用』（可以被子插件覆盖赋值）
			}
		}
	}
	else if( result['planimetryMode'] == "直角坐标模式" ){
		result['cartXSpeedRandomFactorList'] = [];
		for( var i = 0; i < result['planimetryNum']; i++ ){
			if( dataFrom['cartXSpeedRandomFactorList'] !== undefined &&
				dataFrom['cartXSpeedRandomFactorList'][i] !== undefined ){
				result['cartXSpeedRandomFactorList'][i] = dataFrom['cartXSpeedRandomFactorList'][i];
			}else{
				result['cartXSpeedRandomFactorList'][i] = Math.random();  //『随机因子-玩法用』（可以被子插件覆盖赋值）
			}
		}
		result['cartYSpeedRandomFactorList'] = [];
		for( var i = 0; i < result['planimetryNum']; i++ ){
			if( dataFrom['cartYSpeedRandomFactorList'] !== undefined &&
				dataFrom['cartYSpeedRandomFactorList'][i] !== undefined ){
				result['cartYSpeedRandomFactorList'][i] = dataFrom['cartYSpeedRandomFactorList'][i];
			}else{
				result['cartYSpeedRandomFactorList'][i] = Math.random();  //『随机因子-玩法用』（可以被子插件覆盖赋值）
			}
		}
	}
	else if( result['planimetryMode'] == "轨道锚点模式" ){
		result['trackSpeedRandomFactorList'] = [];
		for( var i = 0; i < result['planimetryNum']; i++ ){
			if( dataFrom['trackSpeedRandomFactorList'] !== undefined &&
				dataFrom['trackSpeedRandomFactorList'][i] !== undefined ){
				result['trackSpeedRandomFactorList'][i] = dataFrom['trackSpeedRandomFactorList'][i];
			}else{
				result['trackSpeedRandomFactorList'][i] = Math.random();  //『随机因子-玩法用』（可以被子插件覆盖赋值）
			}
		}
	}
	else if( result['planimetryMode'] == "两点式" ){
		//（无）
	}
	
	
	// > 终止条件（terminate）
	result['terminateRectEnabled'] = dataFrom['terminateRectEnabled'] || false;		//终止条件 - 矩形范围开关
	if( result['terminateRectEnabled'] == true ){									//
		if( dataFrom['terminateRect'] != undefined ){								//终止条件 - 矩形范围
			result['terminateRect'] = JSON.parse(JSON.stringify( dataFrom['terminateRect'] ));  //『深拷贝-核心自定义数据』
		}else{
			result['terminateRect'] = {'x':0,'y':0,'width':0,'height':0};
		}
	}
	
	
	this._drill_COBa_planimetryData = result;
	this._drill_COBa_planimetryObj = null;
	return result;
}
//==============================
// * 0B二维弹道 - 获取弹道总时间（私有）
//==============================
Drill_COBa_Manager.drill_COBa_getBallisticsPlanimetry_TotalTime = function(){
	var dataFrom = this._drill_COBa_planimetryData;
	var result = dataFrom['planimetryTime'];
	result += dataFrom['planimetryDelay'];
	result += dataFrom['planimetryEndDelay'];
	result += dataFrom['planimetryOrderDelay'] * (dataFrom['planimetryNum']-1);
	return result;
}
//==============================
// * 0B二维弹道 - 推演赋值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_preBallisticsPlanimetry = function( obj_data, obj_index, org_x, org_y ){
	var data = this._drill_COBa_planimetryData;
	var obj = this._drill_COBa_planimetryObj;
	
	// > 初始化校验
	if( isNaN( obj_index ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ParamIsNaN( "obj_index" ) );
	}
	if( isNaN( org_x ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ParamIsNaN( "org_x" ) );
	}
	if( isNaN( org_y ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ParamIsNaN( "org_y" ) );
	}
	obj_data['_drill_COBa_x'] = [];
	obj_data['_drill_COBa_y'] = [];
	
	
	// > 推演赋值的obj
	if( this._drill_COBa_planimetryObj == null ){
		this._drill_COBa_planimetryObj = {};
		obj = this._drill_COBa_planimetryObj;
		//   公式obj
		if( data['planimetryMode'] == "极坐标模式"){
			var formula = data['polarDistanceFormula'];
			if( formula == undefined || formula == "" ){ formula = "return 0"; }
			eval("obj['polarDistanceFunction'] = function( p ){ "+formula+" }" );
			var formula = data['polarDirFormula'];
			if( formula == undefined || formula == "" ){ formula = "return 0"; }
			eval("obj['polarDirFunction'] = function( p ){ "+formula+" }" );
		}
		else if( data['planimetryMode'] == "直角坐标模式"){
			var formula = data['cartXDistanceFormula'];
			if( formula == undefined || formula == "" ){ formula = "return 0"; }
			eval("obj['cartXDistanceFunction'] = function( p ){ "+formula+" }" );
			var formula = data['cartYDistanceFormula'];
			if( formula == undefined || formula == "" ){ formula = "return 0"; }
			eval("obj['cartYDistanceFunction'] = function( p ){ "+formula+" }" );
		}
		else if( data['planimetryMode'] == "轨道锚点模式"){
			var formula = data['trackDistanceFormula'];
			if( formula == undefined || formula == "" ){ formula = "return 0"; }
			eval("obj['trackDistanceFunction'] = function( p ){ "+formula+" }" );
		}
		else if( data['planimetryMode'] == "两点式" ){		
			//（无公式）
		}
	}
	
	// > 终止条件（矩形范围）
	var rect_enabled = data['terminateRectEnabled'] || false;
	if( rect_enabled ){			
		var x_min = data['terminateRect']['x'];
		var x_max = data['terminateRect']['x'] + data['terminateRect']['width'];
		var y_min = data['terminateRect']['y'];
		var y_max = data['terminateRect']['y'] + data['terminateRect']['height'];
	}
	
	
	/*-----------------二维弹道 - 极坐标模式------------------*/
	if( data['planimetryMode'] == "极坐标模式" ){
		
		// > 极坐标模式 - 版本兼容（适配旧存档，防止NaN报错）
		if( data['polarDirRate'] == undefined ){ data['polarDirRate'] = 0; }
		
		
		// > 极坐标模式 - 起点值
		obj_data['_drill_COBa_x'].push( org_x );
		obj_data['_drill_COBa_y'].push( org_y );
		
		// > 极坐标模式 - 随机值 方向（来自 随机因子列表）
		var randomDirValue = 0;
		if( data['polarSpeedRandomFactorList'] !== undefined &&
			data['polarSpeedRandomFactorList'][ obj_index ] !== undefined ){
			randomDirValue = data['polarSpeedRandomFactorList'][ obj_index ];
		}
		
		// > 极坐标模式 - 随机值 速度（来自 随机因子列表）
		var randomSpeed = 0;
		if( data['polarDirRandomFactorList'] !== undefined &&
			data['polarDirRandomFactorList'][ obj_index ] !== undefined ){
			randomSpeed = data['polarDirRandomFactorList'][ obj_index ];
		}
		
		// > 极坐标模式 - 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};				//参数容器
		var xx;					//相对坐标X
		var yy;					//相对坐标Y
		var dir;				//方向
		var radius;				//速度
		
		// > 极坐标模式 - 开始计算
		for(var time=1; time <= data['planimetryTime']; time++){	//（弹道长度 = 时长+1，延迟参数 会影响弹道长度）
			
			// > 方向
			dir = null;
			p.index = obj_index;
			p.time  = time;
			p.ran   = randomDirValue;
			p.num   = data['planimetryNum'];
			p.d0      = data['polarDirFixed'];
			p.sDegree = data['polarDirSectorDegree'];
			p.sFace   = data['polarDirSectorFace'];
			p.dv      = data['polarDirRate'];
			
			if( data['polarDirType'] == "固定方向"){
				dir = this.drill_COBa_directionFunction_1( p );	
			}
			else if( data['polarDirType'] == "四周扩散(线性)"){
				dir = this.drill_COBa_directionFunction_2( p );	
			}
			else if( data['polarDirType'] == "四周扩散(随机)"){
				dir = this.drill_COBa_directionFunction_3( p );	
			}
			else if( data['polarDirType'] == "四周扩散(抖动)"){
				dir = this.drill_COBa_directionFunction_4( p );	
			}
			else if( data['polarDirType'] == "扇形范围方向(线性)"){
				dir = this.drill_COBa_directionFunction_5( p );	
			}
			else if( data['polarDirType'] == "扇形范围方向(随机)"){		//扇形的线性和随机的配置角度是反的，目前不明原因
				dir = this.drill_COBa_directionFunction_6( p );	
			}
			else if( data['polarDirType'] == "方向计算公式"){
				dir = obj['polarDirFunction'].call(this, p );	
			}
			Drill_COBa_Manager.drill_COBa_checkParamValue( p, dir );	//（校验值）
			dir = dir / 180 * Math.PI;
			
			// > 速度
			radius = null;
			p.index = obj_index;
			p.time  = time;
			p.ran   = randomSpeed;
			p.num   = data['planimetryNum'];
			p.v0    = data['polarSpeedBase'];
			p.wave  = data['polarSpeedRandom'];
			p.a     = data['polarSpeedInc'];
			p.vMax  = data['polarSpeedMax'];
			p.vMin  = data['polarSpeedMin'];
			
			if( data['polarSpeedType'] == "只初速度"){
				radius = this.drill_COBa_speedFunction_1( p );	
			}
			else if( data['polarSpeedType'] == "初速度+波动量"){
				radius = this.drill_COBa_speedFunction_2( p );	
			}
			else if( data['polarSpeedType'] == "初速度+波动量+加速度"){
				radius = this.drill_COBa_speedFunction_3( p );	
			}
			else if( data['polarSpeedType'] == "初速度+波动量+加速度+最大最小"){
				radius = this.drill_COBa_speedFunction_4( p );	
			}
			else if( data['polarSpeedType'] == "路程计算公式"){
				radius = obj['polarDistanceFunction'].call(this, p );	
			}
			Drill_COBa_Manager.drill_COBa_checkParamValue( p, radius );	//（校验值）
		
			xx = 0;
			yy = 0;
			xx = org_x + radius * Math.cos(dir);
			yy = org_y + radius * Math.sin(dir);
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
			
			// > 终止条件
			if( rect_enabled ){				
				if( xx < x_min ){ break; }
				if( xx > x_max ){ break; }
				if( yy < y_min ){ break; }
				if( yy > y_max ){ break; }
			}
		}
	}
	
	/*-----------------二维弹道 - 直角坐标模式------------------*/
	else if( data['planimetryMode'] == "直角坐标模式"){
		
		// > 直角坐标模式 - 起点值
		obj_data['_drill_COBa_x'].push( org_x );
		obj_data['_drill_COBa_y'].push( org_y );
		
		// > 直角坐标模式 - 随机值 X轴（来自 随机因子列表）
		var x_randomSpeed = 0;
		if( data['cartXSpeedRandomFactorList'] !== undefined &&
			data['cartXSpeedRandomFactorList'][ obj_index ] !== undefined ){
			x_randomSpeed = data['cartXSpeedRandomFactorList'][ obj_index ];
		}
		
		// > 直角坐标模式 - 随机值 Y轴（来自 随机因子列表）
		var y_randomSpeed = 0;
		if( data['cartYSpeedRandomFactorList'] !== undefined &&
			data['cartYSpeedRandomFactorList'][ obj_index ] !== undefined ){
			y_randomSpeed = data['cartYSpeedRandomFactorList'][ obj_index ];
		}
		
		// > 直角坐标模式 - 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};				//参数容器
		var xx;					//相对坐标X
		var yy;					//相对坐标Y
		var r_xx;				//直角坐标X（旋转后得到 相对坐标）
		var r_yy;				//直角坐标X
		var rotate;				//整体旋转角度
		
		// > 直角坐标模式 - 开始计算
		for(var time=1; time <= data['planimetryTime']; time++){	//（弹道长度 = 时长+1，延迟参数 会影响弹道长度）
			
			// > x速度
			p.index = obj_index;
			p.time  = time;
			p.ran   = x_randomSpeed;
			p.num   = data['planimetryNum'];
			p.v0    = data['cartXSpeedBase'];
			p.wave  = data['cartXSpeedRandom'];
			p.a     = data['cartXSpeedInc'];
			p.vMax  = data['cartXSpeedMax'];
			p.vMin  = data['cartXSpeedMin'];
			
			if( data['cartXSpeedType'] == "只初速度"){
				xx = this.drill_COBa_speedFunction_1( p );	
			}
			else if( data['cartXSpeedType'] == "初速度+波动量"){
				xx = this.drill_COBa_speedFunction_2( p );	
			}
			else if( data['cartXSpeedType'] == "初速度+波动量+加速度"){
				xx = this.drill_COBa_speedFunction_3( p );	
			}
			else if( data['cartXSpeedType'] == "初速度+波动量+加速度+最大最小"){
				xx = this.drill_COBa_speedFunction_4( p );	
			}
			else if( data['cartXSpeedType'] == "路程计算公式"){
				xx = obj['cartXDistanceFunction'].call(this, p );	
			}
			Drill_COBa_Manager.drill_COBa_checkParamValue( p, xx );	//（校验值）
			
			// > y速度
			p.index = obj_index;
			p.time  = time;
			p.ran   = y_randomSpeed;
			p.num   = data['planimetryNum'];
			p.v0    = data['cartYSpeedBase'];
			p.wave  = data['cartYSpeedRandom'];
			p.a     = data['cartYSpeedInc'];
			p.vMax  = data['cartYSpeedMax'];
			p.vMin  = data['cartYSpeedMin'];
			
			if( data['cartYSpeedType'] == "只初速度"){
				yy = this.drill_COBa_speedFunction_1( p );	
			}
			else if( data['cartYSpeedType'] == "初速度+波动量"){
				yy = this.drill_COBa_speedFunction_2( p );	
			}
			else if( data['cartYSpeedType'] == "初速度+波动量+加速度"){
				yy = this.drill_COBa_speedFunction_3( p );	
			}
			else if( data['cartYSpeedType'] == "初速度+波动量+加速度+最大最小"){
				yy = this.drill_COBa_speedFunction_4( p );	
			}
			else if( data['cartYSpeedType'] == "路程计算公式"){
				yy = obj['cartYDistanceFunction'].call(this, p );	
			}
			Drill_COBa_Manager.drill_COBa_checkParamValue( p, yy );	//（校验值）
			
			// > 坐标轴整体旋转
			rotate = data['cartRotation'] / 180 * Math.PI;
			r_xx = xx * Math.cos( rotate ) - yy * Math.sin( rotate );
			r_yy = xx * Math.sin( rotate ) + yy * Math.cos( rotate );
		
			xx = org_x + r_xx;
			yy = org_y + r_yy;
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
			
			// > 终止条件
			if( rect_enabled ){				
				if( xx < x_min ){ break; }
				if( xx > x_max ){ break; }
				if( yy < y_min ){ break; }
				if( yy > y_max ){ break; }
			}
		}
	}	
	
	
	/*-----------------二维弹道 - 轨道锚点模式------------------*/
	else if( data['planimetryMode'] == "轨道锚点模式"){
		
		// > 轨道锚点模式 - 起点值
		obj_data['_drill_COBa_x'].push( org_x );
		obj_data['_drill_COBa_y'].push( org_y );
		
		// > 轨道锚点模式 - 随机值 速度（来自 随机因子列表）
		var track_randomSpeed = 0;
		if( data['trackSpeedRandomFactorList'] !== undefined &&
			data['trackSpeedRandomFactorList'][ obj_index ] !== undefined ){
			track_randomSpeed = data['trackSpeedRandomFactorList'][ obj_index ];
		}
		
		// > 轨道锚点模式 - 轨道点初始化
		if( data['trackPointTank'].length < 2 ){	//（至少要两个点才能计算）
			data['trackPointTank'] = [];
			data['trackPointTank'].push( {'x':0,'y':0} );
			data['trackPointTank'].push( {'x':0,'y':200} );
		}
		var distance_total = 0;			//总距离
		var distance_tank = [0];		//距离容器
		var time_overflow = false;		//时间冗余标记
		for(var i=1; i < data['trackPointTank'].length; i++){
			var cur_point = data['trackPointTank'][i];
			var last_point = data['trackPointTank'][i-1];
			
			var dx = cur_point.x - last_point.x;
			var dy = cur_point.y - last_point.y;
			var distance = Math.sqrt( dx*dx + dy*dy );
			
			distance_tank.push( distance );
			distance_total += distance;
		};
		
		// > 轨道锚点模式 - 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};					//参数容器
		var xx;						//相对坐标X
		var yy;						//相对坐标Y
		var distance;				//轨道距离
		var p_xx;					//轨道X（旋转后得到 相对坐标）
		var p_yy;					//轨道Y
		var rotate;					//整体旋转角度
		
		// > 轨道锚点模式 - 开始计算
		for(var time=1; time <= data['planimetryTime']; time++){	//（弹道长度 = 时长+1，延迟参数 会影响弹道长度）
			
			// > 速度
			distance = null;
			p.index = obj_index;
			p.time  = time;
			p.ran   = track_randomSpeed;
			p.num   = data['planimetryNum'];
			p.v0    = data['trackSpeedBase'];
			p.wave  = data['trackSpeedRandom'];
			p.a     = data['trackSpeedInc'];
			p.vMax  = data['trackSpeedMax'];
			p.vMin  = data['trackSpeedMin'];
			
			if( data['trackSpeedType'] == "只初速度"){
				distance = this.drill_COBa_speedFunction_1( p );	
			}
			else if( data['trackSpeedType'] == "初速度+波动量"){
				distance = this.drill_COBa_speedFunction_2( p );	
			}
			else if( data['trackSpeedType'] == "初速度+波动量+加速度"){
				distance = this.drill_COBa_speedFunction_3( p );	
			}
			else if( data['trackSpeedType'] == "初速度+波动量+加速度+最大最小"){
				distance = this.drill_COBa_speedFunction_4( p );	
			}
			else if( data['trackSpeedType'] == "路程计算公式"){
				distance = obj['trackDistanceFunction'].call(this, p );	
			}
			Drill_COBa_Manager.drill_COBa_checkParamValue( p, distance );	//（校验值）
			
			
			// > 轨道计算（根据每个落脚点的距离计算）
			p_xx = 0;
			p_yy = 0;
			for(var j=1; j < distance_tank.length; j++ ){
				var cur_distance = distance_tank[j];
				var last_distance = distance_tank[j-1];
				distance -= last_distance;	
				
				// > 距离冗余，说明不在当前落脚点
				if( distance > cur_distance ){ 
					if( j == distance_tank.length-1 ){	//（已是终点且距离冗余时，直接为终点位置）
						p_xx = data['trackPointTank'][j].x;
						p_yy = data['trackPointTank'][j].y;
						time_overflow = true;			//（标记为时间冗余，要去掉后面的时间）
						break;
					}else{
						continue; 
					}
				}
				
				// > 不冗余，说明落脚点在 cur和last之间
				var cur_point = data['trackPointTank'][j];
				var last_point = data['trackPointTank'][j-1];
				var per = distance/cur_distance;	//（距离比）
				
				p_xx = last_point.x + (cur_point.x - last_point.x) * per;
				p_yy = last_point.y + (cur_point.y - last_point.y) * per;
				break;
			}
			
			// > 轨道整体旋转
			rotate = data['trackRotation'] / 180 * Math.PI;
			p_xx = p_xx * Math.cos( rotate ) - p_xx * Math.sin( rotate );
			p_yy = p_yy * Math.sin( rotate ) + p_yy * Math.cos( rotate );
			
			xx = 0;
			yy = 0;
			xx = org_x + p_xx;
			yy = org_y + p_yy;
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
			
			// > 时间冗余（走完全程后，结束弹道）
			if( time_overflow == true ){
				data['planimetryTime'] = obj_data['_drill_COBa_x'].length-1;
				break;
			}
			
			// > 终止条件
			if( rect_enabled ){				
				if( xx < x_min ){ break; }
				if( xx > x_max ){ break; }
				if( yy < y_min ){ break; }
				if( yy > y_max ){ break; }
			}
		}
		
	}
	
	
	/*-----------------二维弹道 - 两点式------------------*/
	/*
		【匀速变化/增减速变化/弹性变化 经过了反复验证，公式以0,0起点为准，向终点值靠近，差值可为负数。】
		（这里的公式默认递增，你可以反转，变为递减。）
		（不固定开始点也不固定结束点，由于子插件进行了取反，两头只要固定一处，就会出现各种各样的问题，所以不加了）
	*/
	else if( data['planimetryMode'] == "两点式"){		
	
		// > 两点式 - 变量定义（写这里是为优化性能，减少反复创建次数）
		var xx;					//相对坐标X
		var yy;					//相对坐标Y
		var dx;					//距离差值x
		var dy;					//距离差值y
		var dt;					//时长
		
		// > 两点式 - 瞬间变化（目标时间<=1，无视类型直接视作为瞬间变化）
		if( data['planimetryTime'] <= 1 ){
			
			xx = data['twoPointDifferenceX'];	//（一直待在终点）
			yy = data['twoPointDifferenceY'];
			
			xx = org_x + xx;
			yy = org_y + yy;
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
			
		// > 两点式 - 开始计算
		}else{
			
			for(var time = 0; time <= data['planimetryTime']; time++){	//（弹道长度 = 时长+1，延迟参数 会影响弹道长度）
				
				xx = 0;
				yy = 0;
				
				if( data['twoPointType'] == "不变化"){
					xx = 0;								//（一直待在原位置）
					yy = 0;
				}
				
				else if( data['twoPointType'] == "瞬间变化"){
					xx = data['twoPointDifferenceX'];	//（一直待在终点）
					yy = data['twoPointDifferenceY'];
				}
				
				else if( data['twoPointType'] == "匀速变化"){	
					dx = data['twoPointDifferenceX'];
					dy = data['twoPointDifferenceY'];
					dt = data['planimetryTime'];
					
					xx = time * dx / dt;
					yy = time * dy / dt;
				}
				
				else if( data['twoPointType'] == "增减速变化"){	
					dx = data['twoPointDifferenceX'];
					dy = data['twoPointDifferenceY'];
					dt = data['planimetryTime'];
					
					var v_max = dx / dt *2;			//（先加速后减速）
					var a = v_max / dt *2;
					if( time < dt/2 ){
						xx = a*time*time/2;
					}else{
						var t_p = time - dt/2;
						xx = dx/2 + v_max*t_p - a*t_p*t_p/2;
					}
					
					var v_max = dy / dt *2;
					var a = v_max / dt *2;
					if( time < dt/2 ){
						yy = a*time*time/2;
					}else{
						var t_p = time - dt/2;
						yy = dy/2 + v_max*t_p - a*t_p*t_p/2;
					}
				}
				
				else if( data['twoPointType'] == "弹性变化"){
					dx = data['twoPointDifferenceX'];
					dy = data['twoPointDifferenceY'];
					dt = data['planimetryTime'];
					
					var ax = 2 * dx / dt / dt;		//r = 1/2*a*t^2
					var ay = 2 * dy / dt / dt;		//（匀减速变化到目标点）
					var c_time = dt - time;
					xx = 0.5 * ax * dt * dt - 0.5 * ax * c_time * c_time ;
					yy = 0.5 * ay * dt * dt - 0.5 * ay * c_time * c_time ;
				}
				
				else if( data['twoPointType'] == "抛物线变化"){
					dx = data['twoPointDifferenceX'];
					dy = data['twoPointDifferenceY'];
					dt = data['planimetryTime'];
					var org_speed = data['twoPointParabolaSpeed'];
					var org_dir = data['twoPointParabolaDir'] / 180 * Math.PI ;
					
					// >（单独旋转轴公式测试）
					//var c_dx = dx * Math.cos( -1*org_dir ) - dy * Math.sin( -1*org_dir );
					//var c_dy = dx * Math.sin( -1*org_dir ) + dy * Math.cos( -1*org_dir );
					//var c_xx = c_dx / dt * time;
					//var c_yy = c_dy / dt * time;
					//var c_xx = org_speed * time;
					//var c_yy = 0 * time;
					//xx = c_xx * Math.cos( org_dir ) - c_yy * Math.sin( org_dir );
					//yy = c_xx * Math.sin( org_dir ) + c_yy * Math.cos( org_dir );
					
					// > 旋转坐标轴
					var c_dx = dx * Math.cos( -1*org_dir ) - dy * Math.sin( -1*org_dir );
					var c_dy = dx * Math.sin( -1*org_dir ) + dy * Math.cos( -1*org_dir );
					var c_speedX = c_dx / dt;
					var c_speedY = c_dy / dt;
					
					// > 加速度公式（抛物线）
					var c_x_v1 = 0 + org_speed - c_speedX;	
					var c_y_v1 = 0 - c_speedY;
					var c_x_a = c_x_v1 / dt;
					var c_y_a = c_y_v1 / dt;
					
					var c_xx = org_speed *time - c_x_a*time*time;	//（粒子初速度一定是 原方向+原速度，通过匀加速改变朝向）
					var c_yy = 0 *time - c_y_a*time*time;
					
					// > 转回坐标轴
					xx = c_xx * Math.cos( org_dir ) - c_yy * Math.sin( org_dir );
					yy = c_xx * Math.sin( org_dir ) + c_yy * Math.cos( org_dir );
				}
				
				xx = org_x + xx;
				yy = org_y + yy;
				obj_data['_drill_COBa_x'].push(xx);
				obj_data['_drill_COBa_y'].push(yy);
				
				// > 终止条件
				if( rect_enabled ){				
					if( xx < x_min ){ break; }
					if( xx > x_max ){ break; }
					if( yy < y_min ){ break; }
					if( yy > y_max ){ break; }
				}
			}
		}
	}
	
	// > 延迟（开始前延迟时间）
	for(var i = 0; i < data['planimetryDelay']; i++){
		obj_data['_drill_COBa_x'].unshift( obj_data['_drill_COBa_x'][0] );
		obj_data['_drill_COBa_y'].unshift( obj_data['_drill_COBa_y'][0] );
	}
	// > 延迟（到终点后延迟时间）
	for(var i = 0; i < data['planimetryEndDelay']; i++){
		obj_data['_drill_COBa_x'].push( obj_data['_drill_COBa_x'][ obj_data['_drill_COBa_x'].length-1 ] );
		obj_data['_drill_COBa_y'].push( obj_data['_drill_COBa_y'][ obj_data['_drill_COBa_y'].length-1 ] );
	}
	// > 延迟（ID依次延迟时间）
	if( data['planimetryOrderDelay'] > 0 ){
		var start_num = obj_index;
		var end_num = data['planimetryNum']-1 - obj_index;
		var start_delay = start_num * data['planimetryOrderDelay'];
		var end_delay = end_num * data['planimetryOrderDelay'];
		for(var i = 0; i < start_delay; i++){
			obj_data['_drill_COBa_x'].unshift( obj_data['_drill_COBa_x'][0] );
			obj_data['_drill_COBa_y'].unshift( obj_data['_drill_COBa_y'][0] );
		}
		for(var i = 0; i < end_delay; i++){
			obj_data['_drill_COBa_x'].push( obj_data['_drill_COBa_x'][ obj_data['_drill_COBa_x'].length-1 ] );
			obj_data['_drill_COBa_y'].push( obj_data['_drill_COBa_y'][ obj_data['_drill_COBa_y'].length-1 ] );
		}
	}else if( data['planimetryOrderDelay'] < 0 ){
		var start_num = data['planimetryNum']-1 - obj_index;
		var end_num = obj_index;
		var start_delay = start_num * Math.abs( data['planimetryOrderDelay'] );
		var end_delay = end_num * Math.abs( data['planimetryOrderDelay'] );
		for(var i = 0; i < start_delay; i++){
			obj_data['_drill_COBa_x'].unshift( obj_data['_drill_COBa_x'][0] );
			obj_data['_drill_COBa_y'].unshift( obj_data['_drill_COBa_y'][0] );
		}
		for(var i = 0; i < end_delay; i++){
			obj_data['_drill_COBa_x'].push( obj_data['_drill_COBa_x'][ obj_data['_drill_COBa_x'].length-1 ] );
			obj_data['_drill_COBa_y'].push( obj_data['_drill_COBa_y'][ obj_data['_drill_COBa_y'].length-1 ] );
		}
	}else{
		//（不操作）
	}
	
}

//==============================
// * 0B二维弹道 - 公式 - 方向计算公式(方向类型) - 固定方向
//==============================
Drill_COBa_Manager.drill_COBa_directionFunction_1 = function( p ){
	var result =  p.d0;				//（固定方向）
	result +=  p.dv * p.time;		//（方向角速率）
	return result;
}
//==============================
// * 0B二维弹道 - 公式 - 方向计算公式(方向类型) - 四周扩散(线性)
//==============================
Drill_COBa_Manager.drill_COBa_directionFunction_2 = function( p ){
	var result =  p.d0 + 360 * p.index / p.num;	//（在一个圆圈里，线性放入固定数量的粒子）
	result +=  p.dv * p.time;
	return result;
}
//==============================
// * 0B二维弹道 - 公式 - 方向计算公式(方向类型) - 四周扩散(随机)
//==============================
Drill_COBa_Manager.drill_COBa_directionFunction_3 = function( p ){
	var result =  p.d0 + 360 * p.ran;
	result +=  p.dv * p.time;
	return result;
}
//==============================
// * 0B二维弹道 - 公式 - 方向计算公式(方向类型) - 四周扩散(抖动)
//==============================
Drill_COBa_Manager.drill_COBa_directionFunction_4 = function( p ){
	var result =  p.d0 + 360 * p.ran + 30 * Math.sin(p.time);
	result +=  p.dv * p.time;
	return result;											
}
//==============================
// * 0B二维弹道 - 公式 - 方向计算公式(方向类型) - 扇形范围方向(线性)
//==============================
Drill_COBa_Manager.drill_COBa_directionFunction_5 = function( p ){		
	var result =  p.sFace;
	if( p.num > 1 ){
		result =  p.sFace + p.sDegree * p.index / (p.num - 1) - p.sDegree/2;
	}else{
		result =  p.sFace;
	}
	result +=  p.dv * p.time;
	return result;
}
//==============================
// * 0B二维弹道 - 公式 - 方向计算公式(方向类型) - 扇形范围方向(随机)
//==============================
Drill_COBa_Manager.drill_COBa_directionFunction_6 = function( p ){		
	var result =  p.sFace + p.sDegree * (p.ran - 0.5);		//（根据p.sDegree，算出波动范围方向，与朝向相加即可）
	result += p.dv * p.time;
	return result;
}

//==============================
// * 0B二维弹道 - 公式 - 路程计算公式(速度类型) - 只初速度
//==============================
Drill_COBa_Manager.drill_COBa_speedFunction_1 = function( p ){
	var result =  p.v0 * p.time;				//（速度x时间）
	return result;
}
//==============================
// * 0B二维弹道 - 公式 - 路程计算公式(速度类型) - 初速度+波动量
//==============================
Drill_COBa_Manager.drill_COBa_speedFunction_2 = function( p ){
	var v_ran = p.wave * (p.ran - 0.5);			//（根据波动量，算出波动速度）
	var result =  (p.v0 + v_ran) * p.time;		//（随机速度x时间）
	return result;
}
//==============================
// * 0B二维弹道 - 公式 - 路程计算公式(速度类型) - 初速度+波动量+加速度
//==============================
Drill_COBa_Manager.drill_COBa_speedFunction_3 = function( p ){
	var v_ran = p.wave * (p.ran - 0.5);			//（根据波动量，算出波动速度）
	var result =  (p.v0 + v_ran) * p.time + 0.5 * p.a *p.time*p.time;		//（加速度公式）	
	return result;
}
//==============================
// * 0B二维弹道 - 公式 - 路程计算公式(速度类型) - 初速度+波动量+加速度+最大最小
//==============================
Drill_COBa_Manager.drill_COBa_speedFunction_4 = function( p ){
	var v_ran = p.wave * (p.ran - 0.5);			//（根据波动量，算出波动速度）
	
	// > 加速度公式
	var v1 = (p.v0 + v_ran) + p.a * p.time;	
	var d =  (p.v0 + v_ran)*p.time + 0.5 * p.a *p.time*p.time;
	var result = d;
	
	// > 分段函数（超过上限/下限，将减去多出的路程值）
	if( v1 >= p.vMax ){
		var m_v = v1 - p.vMax;
		var m_t =(v1 - p.vMax) / p.a;
		result = d - m_v*m_t + 0.5 * p.a *m_t*m_t;
	}
	if( v1 <= p.vMin ){
		var m_v = v1 - p.vMin;
		var m_t =(v1 - p.vMin) / p.a;
		result = d - m_v*m_t + 0.5 * p.a *m_t*m_t;
	}
	return result;
}



//=============================================================================
// * 0H一维弹道应用 - 1H透明度弹道
//=============================================================================
//==============================
// * 1H透明度弹道 - 初始化数据 默认值（私有）
//			
//			说明：	弹道 参数名称 有交叉，但不影响整体使用。正常存储/处理即可。
//==============================
Drill_COBa_Manager.drill_COBa_setBallisticsOpacity_Private = function( dataFrom ){
	var result = {};
	
	// > 透明度基础参数（opacity）
	result['opacityNum'] = dataFrom['opacityNum'] || 1;					//透明度 - 子弹数量
	result['opacityTime'] = dataFrom['opacityTime'] || 1;               //透明度 - 时长
	result['opacityDelay'] = dataFrom['opacityDelay'] || 0;             //透明度 - 开始前延迟时间
	result['opacityEndDelay'] = dataFrom['opacityEndDelay'] || 0;       //透明度 - 到终点后延迟时间
	result['opacityOrderDelay'] = dataFrom['opacityOrderDelay'] || 0;	//透明度 - ID依次延迟时间
	result['opacityMode'] = dataFrom['opacityMode'] || "目标值模式";    //透明度 - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['opacityMode'] == "时间公式模式" ){
		result['otFormula'] = dataFrom['otFormula'];					//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['opacityMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = dataFrom['anchorPointTank'];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['opacityMode'] == "目标值模式" ){
		result['targetType'] = dataFrom['targetType'];					//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = dataFrom['targetDifference']; 		//目标值 - 距离差值（终点值减起点值）
	}
	
	// > 随机因子列表（randomFactorList）
	result['randomFactorList'] = dataFrom['randomFactorList'];
	
	// > 终止条件（terminate）
	result['terminateRangeEnabled'] = dataFrom['terminateRangeEnabled'];
	result['terminateRange'] = dataFrom['terminateRange'];
	
	
	// > 按一维弹道规则设置（私有）
	result['commonNum'] = result['opacityNum'];
	result['commonTime'] = result['opacityTime'];
	result['commonDelay'] = result['opacityDelay'];
	result['commonEndDelay'] = result['opacityEndDelay'];
	result['commonOrderDelay'] = result['opacityOrderDelay'];
	result['commonMode'] = result['opacityMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 1H透明度弹道 - 推演赋值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_preBallisticsOpacity_Private = function( obj_data, obj_index, org_opacity ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, org_opacity );		//（按一维弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_opacity'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}

//=============================================================================
// * 0H一维弹道应用 - 1H缩放X弹道
//=============================================================================
//==============================
// * 1H缩放X弹道 - 初始化数据 默认值（私有）
//			
//			说明：	弹道 参数名称 有交叉，但不影响整体使用。正常存储/处理即可。
//==============================
Drill_COBa_Manager.drill_COBa_setBallisticsScaleX_Private = function( dataFrom ){
	var result = {};
	
	// > 缩放X基础参数（scaleX）
	result['scaleXNum'] = dataFrom['scaleXNum'] || 1;					//缩放X - 子弹数量
	result['scaleXTime'] = dataFrom['scaleXTime'] || 1;                 //缩放X - 时长
	result['scaleXDelay'] = dataFrom['scaleXDelay'] || 0;               //缩放X - 开始前延迟时间
	result['scaleXEndDelay'] = dataFrom['scaleXEndDelay'] || 0;         //缩放X - 到终点后延迟时间
	result['scaleXOrderDelay'] = dataFrom['scaleXOrderDelay'] || 0;		//缩放X - ID依次延迟时间
	result['scaleXMode'] = dataFrom['scaleXMode'] || "目标值模式";      //缩放X - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['scaleXMode'] == "时间公式模式" ){
		result['otFormula'] = dataFrom['otFormula'];					//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['scaleXMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = dataFrom['anchorPointTank'];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['scaleXMode'] == "目标值模式" ){
		result['targetType'] = dataFrom['targetType'];					//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = dataFrom['targetDifference']; 		//目标值 - 距离差值（终点值减起点值）
	}
	
	// > 随机因子列表（randomFactorList）
	result['randomFactorList'] = dataFrom['randomFactorList'];
	
	// > 终止条件（terminate）
	result['terminateRangeEnabled'] = dataFrom['terminateRangeEnabled'];
	result['terminateRange'] = dataFrom['terminateRange'];
	
	
	// > 按一维弹道规则设置（私有）
	result['commonNum'] = result['scaleXNum'];
	result['commonTime'] = result['scaleXTime'];
	result['commonDelay'] = result['scaleXDelay'];
	result['commonEndDelay'] = result['scaleXEndDelay'];
	result['commonOrderDelay'] = result['scaleXOrderDelay'];
	result['commonMode'] = result['scaleXMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 1H缩放X弹道 - 推演赋值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_preBallisticsScaleX_Private = function( obj_data, obj_index, orgScaleX ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, orgScaleX );		//（按一维弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_scaleX'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}

//=============================================================================
// * 0H一维弹道应用 - 1H缩放Y弹道
//=============================================================================
//==============================
// * 1H缩放Y弹道 - 初始化数据 默认值（私有）
//			
//			说明：	弹道 参数名称 有交叉，但不影响整体使用。正常存储/处理即可。
//==============================
Drill_COBa_Manager.drill_COBa_setBallisticsScaleY_Private = function( dataFrom ){
	var result = {};
	
	// > 缩放Y基础参数（scaleY）
	result['scaleYNum'] = dataFrom['scaleYNum'] || 1;					//缩放Y - 子弹数量
	result['scaleYTime'] = dataFrom['scaleYTime'] || 1;                 //缩放Y - 时长
	result['scaleYDelay'] = dataFrom['scaleYDelay'] || 0;               //缩放Y - 开始前延迟时间
	result['scaleYEndDelay'] = dataFrom['scaleYEndDelay'] || 0;         //缩放Y - 到终点后延迟时间
	result['scaleYOrderDelay'] = dataFrom['scaleYOrderDelay'] || 0;		//缩放Y - ID依次延迟时间
	result['scaleYMode'] = dataFrom['scaleYMode'] || "目标值模式";      //缩放Y - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['scaleYMode'] == "时间公式模式" ){
		result['otFormula'] = dataFrom['otFormula'];					//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['scaleYMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = dataFrom['anchorPointTank'];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['scaleYMode'] == "目标值模式" ){
		result['targetType'] = dataFrom['targetType'];					//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = dataFrom['targetDifference']; 		//目标值 - 距离差值（终点值减起点值）
	}
	
	// > 随机因子列表（randomFactorList）
	result['randomFactorList'] = dataFrom['randomFactorList'];
	
	// > 终止条件（terminate）
	result['terminateRangeEnabled'] = dataFrom['terminateRangeEnabled'];
	result['terminateRange'] = dataFrom['terminateRange'];
	
	
	// > 按一维弹道规则设置（私有）
	result['commonNum'] = result['scaleYNum'];
	result['commonTime'] = result['scaleYTime'];
	result['commonDelay'] = result['scaleYDelay'];
	result['commonEndDelay'] = result['scaleYEndDelay'];
	result['commonOrderDelay'] = result['scaleYOrderDelay'];
	result['commonMode'] = result['scaleYMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 1H缩放Y弹道 - 推演赋值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_preBallisticsScaleY_Private = function( obj_data, obj_index, orgScaleY ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, orgScaleY );		//（按一维弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_scaleY'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}

//=============================================================================
// * 0H一维弹道应用 - 1H旋转角弹道
//=============================================================================
//==============================
// * 1H旋转角弹道 - 初始化数据 默认值（私有）
//			
//			说明：	弹道 参数名称 有交叉，但不影响整体使用。正常存储/处理即可。
//==============================
Drill_COBa_Manager.drill_COBa_setBallisticsRotate_Private = function( dataFrom ){
	var result = {};
	
	// > 旋转角基础参数（rotate）
	result['rotateNum'] = dataFrom['rotateNum'] || 1;					//旋转角 - 子弹数量
	result['rotateTime'] = dataFrom['rotateTime'] || 1;                 //旋转角 - 时长
	result['rotateDelay'] = dataFrom['rotateDelay'] || 0;               //旋转角 - 开始前延迟时间
	result['rotateEndDelay'] = dataFrom['rotateEndDelay'] || 0;         //旋转角 - 到终点后延迟时间
	result['rotateOrderDelay'] = dataFrom['rotateOrderDelay'] || 0;		//旋转角 - ID依次延迟时间
	result['rotateMode'] = dataFrom['rotateMode'] || "目标值模式";      //旋转角 - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['rotateMode'] == "时间公式模式" ){
		result['otFormula'] = dataFrom['otFormula'];					//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['rotateMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = dataFrom['anchorPointTank'];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['rotateMode'] == "目标值模式" ){
		result['targetType'] = dataFrom['targetType'];					//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = dataFrom['targetDifference']; 		//目标值 - 距离差值（终点值减起点值）
	}
	
	// > 随机因子列表（randomFactorList）
	result['randomFactorList'] = dataFrom['randomFactorList'];
	
	// > 终止条件（terminate）
	result['terminateRangeEnabled'] = dataFrom['terminateRangeEnabled'];
	result['terminateRange'] = dataFrom['terminateRange'];
	
	
	// > 按一维弹道规则设置（私有）
	result['commonNum'] = result['rotateNum'];
	result['commonTime'] = result['rotateTime'];
	result['commonDelay'] = result['rotateDelay'];
	result['commonEndDelay'] = result['rotateEndDelay'];
	result['commonOrderDelay'] = result['rotateOrderDelay'];
	result['commonMode'] = result['rotateMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 1H旋转角弹道 - 推演赋值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_preBallisticsRotate_Private = function( obj_data, obj_index, org_rotate ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, org_rotate );		//（按一维弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_rotate'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}



//=============================================================================
// * 0I二维弹道应用 - 1I移动弹道
//=============================================================================
//==============================
// * 1I移动弹道 - 初始化数据 默认值（私有）
//			
//			说明：	弹道 参数名称 有交叉，但不影响整体使用。正常存储/处理即可。
//==============================
Drill_COBa_Manager.drill_COBa_setBallisticsMove_Private = function( dataFrom ){
	var result = {};
	
	// > 移动基础参数（movement）
	result['movementNum'] = dataFrom['movementNum'] || 1;								//移动 - 子弹数量
	result['movementTime'] = dataFrom['movementTime'] || 1;             				//移动 - 时长
	result['movementDelay'] = dataFrom['movementDelay'] || 0;           				//移动 - 开始前延迟时间
	result['movementEndDelay'] = dataFrom['movementEndDelay'] || 0;     				//移动 - 到终点后延迟时间
	result['movementOrderDelay'] = dataFrom['movementOrderDelay'] || 0;					//移动 - ID依次延迟时间
	result['movementMode'] = dataFrom['movementMode'] || "极坐标模式";  				//移动 - 移动模式
	
	//   ■ 极坐标（polar）		
	if( result['movementMode'] == "极坐标模式" ){	//（这样写是为了减少参数数量，便于存储）
		result['polarSpeedType'] = dataFrom['polarSpeedType'];							//极坐标 - 速度 - 类型（只初速度/初速度+波动量/……）
		result['polarSpeedBase'] = dataFrom['polarSpeedBase'];      					//极坐标 - 速度 - 初速度
		result['polarSpeedRandom'] = dataFrom['polarSpeedRandom'];  					//极坐标 - 速度 - 速度随机波动量
		result['polarSpeedInc'] = dataFrom['polarSpeedInc'];        					//极坐标 - 速度 - 加速度
		result['polarSpeedMax'] = dataFrom['polarSpeedMax'];        					//极坐标 - 速度 - 最大速度
		result['polarSpeedMin'] = dataFrom['polarSpeedMin'];        					//极坐标 - 速度 - 最小速度
		result['polarDistanceFormula'] = dataFrom['polarDistanceFormula']; 				//极坐标 - 速度 - 路程计算公式
		result['polarDirType'] = dataFrom['polarDirType'];         						//极坐标 - 方向 - 类型
		result['polarDirFixed'] = dataFrom['polarDirFixed'];              				//极坐标 - 方向 - 固定方向
		result['polarDirSectorFace'] = dataFrom['polarDirSectorFace'];    				//极坐标 - 方向 - 扇形朝向
		result['polarDirSectorDegree'] = dataFrom['polarDirSectorDegree'];				//极坐标 - 方向 - 扇形角度
		result['polarDirRate'] = dataFrom['polarDirRate'];                              //极坐标 - 方向 - 方向角速率
		result['polarDirFormula'] = dataFrom['polarDirFormula'];   						//极坐标 - 方向 - 方向计算公式
	}
	//   ■ 直角坐标（cartesian）
	else if( result['movementMode'] == "直角坐标模式" ){			
		result['cartRotation'] = dataFrom['cartRotation'];								//直角坐标 - 整体坐标轴旋转角度
		result['cartXSpeedType'] = dataFrom['cartXSpeedType'];							//直角坐标 - x - 类型（只初速度/初速度+波动量/……）
		result['cartXSpeedBase'] = dataFrom['cartXSpeedBase'];     						//直角坐标 - x - 初速度
		result['cartXSpeedRandom'] = dataFrom['cartXSpeedRandom']; 						//直角坐标 - x - 速度随机波动量
		result['cartXSpeedInc'] = dataFrom['cartXSpeedInc'];       						//直角坐标 - x - 加速度
		result['cartXSpeedMax'] = dataFrom['cartXSpeedMax'];       						//直角坐标 - x - 最大速度
		result['cartXSpeedMin'] = dataFrom['cartXSpeedMin'];       						//直角坐标 - x - 最小速度
		result['cartXDistanceFormula'] = dataFrom['cartXDistanceFormula'];				//直角坐标 - x - 路程计算公式
		result['cartYSpeedType'] = dataFrom['cartYSpeedType'];     						//直角坐标 - y - 类型（只初速度/初速度+波动量/……）
		result['cartYSpeedBase'] = dataFrom['cartYSpeedBase'];     						//直角坐标 - y - 初速度
		result['cartYSpeedRandom'] = dataFrom['cartYSpeedRandom']; 						//直角坐标 - y - 速度随机波动量
		result['cartYSpeedInc'] = dataFrom['cartYSpeedInc'];       						//直角坐标 - y - 加速度
		result['cartYSpeedMax'] = dataFrom['cartYSpeedMax'];       						//直角坐标 - y - 最大速度
		result['cartYSpeedMin'] = dataFrom['cartYSpeedMin'];       						//直角坐标 - y - 最小速度
		result['cartYDistanceFormula'] = dataFrom['cartYDistanceFormula']; 				//直角坐标 - y - 路程计算公式
	}
	//   ■ 轨道锚点（track）		
	else if( result['movementMode'] == "轨道锚点模式" ){			
		result['trackSpeedType'] = dataFrom['trackSpeedType'];							//轨道锚点 - 速度 - 类型
		result['trackSpeedBase'] = dataFrom['trackSpeedBase'];     						//轨道锚点 - 速度 - 初速度
		result['trackSpeedRandom'] = dataFrom['trackSpeedRandom']; 						//轨道锚点 - 速度 - 速度随机波动量
		result['trackSpeedInc'] = dataFrom['trackSpeedInc'];       						//轨道锚点 - 速度 - 加速度
		result['trackSpeedMax'] = dataFrom['trackSpeedMax'];       						//轨道锚点 - 速度 - 最大速度
		result['trackSpeedMin'] = dataFrom['trackSpeedMin'];       						//轨道锚点 - 速度 - 最小速度
		result['trackDistanceFormula'] = dataFrom['trackDistanceFormula'];				//轨道锚点 - 速度 - 路程计算公式
		result['trackPointTank'] = dataFrom['trackPointTank'];   						//轨道锚点 - 轨道 - 锚点列表
		result['trackRotation'] = dataFrom['trackRotation'];       						//轨道锚点 - 轨道 - 整体旋转角度
	}
	//   ■ 两点式（twoPoint）
	else if( result['movementMode'] == "两点式" ){
		result['twoPointType'] = dataFrom['twoPointType'];								//两点式 - 类型（不变化/匀速变化/弹性变化/……）
		result['twoPointDifferenceX'] = dataFrom['twoPointDifferenceX'];				//两点式 - 距离差值x（终点减起点）
		result['twoPointDifferenceY'] = dataFrom['twoPointDifferenceY'];	            //两点式 - 距离差值y（终点减起点）
		result['twoPointParabolaDir'] = dataFrom['twoPointParabolaDir'];	            //两点式 - 抛物线变化 - 初始方向（单位角度）
		result['twoPointParabolaSpeed'] = dataFrom['twoPointParabolaSpeed'];	        //两点式 - 抛物线变化 - 初始速度
	}
	
	// > 随机因子列表（randomFactorList）
	if( result['movementMode'] == "极坐标模式" ){
		result['polarSpeedRandomFactorList'] = dataFrom['polarSpeedRandomFactorList'];
		result['polarDirRandomFactorList'] = dataFrom['polarDirRandomFactorList'];
	}
	else if( result['movementMode'] == "直角坐标模式" ){
		result['cartXSpeedRandomFactorList'] = dataFrom['cartXSpeedRandomFactorList'];
		result['cartYSpeedRandomFactorList'] = dataFrom['cartYSpeedRandomFactorList'];
	}
	else if( result['movementMode'] == "轨道锚点模式" ){
		result['trackSpeedRandomFactorList'] = dataFrom['trackSpeedRandomFactorList'];
	}
	else if( result['movementMode'] == "两点式" ){
		//（无）
	}
	
	// > 终止条件（terminate）
	result['terminateRectEnabled'] = dataFrom['terminateRectEnabled'];
	result['terminateRect'] = dataFrom['terminateRect'];
	
	
	
	// > 按二维弹道规则设置（私有）
	result['planimetryNum'] = result['movementNum'];
	result['planimetryTime'] = result['movementTime'];
	result['planimetryDelay'] = result['movementDelay'];
	result['planimetryEndDelay'] = result['movementEndDelay'];
	result['planimetryOrderDelay'] = result['movementOrderDelay'];
	result['planimetryMode'] = result['movementMode'];
	if( result['movementMode'] == "两点式" ){
		if(      result['twoPointType'] == "不移动"     ){ result['twoPointType'] = "不变化";     }
		else if( result['twoPointType'] == "瞬间移动"   ){ result['twoPointType'] = "瞬间变化";   }
		else if( result['twoPointType'] == "匀速移动"   ){ result['twoPointType'] = "匀速变化";   }
		else if( result['twoPointType'] == "增减速移动" ){ result['twoPointType'] = "增减速变化"; }
		else if( result['twoPointType'] == "弹性移动"   ){ result['twoPointType'] = "弹性变化";   }
		else if( result['twoPointType'] == "抛物线移动" ){ result['twoPointType'] = "抛物线变化"; }
	}
	return this.drill_COBa_setBallisticsPlanimetry( result );
}
//==============================
// * 1I移动弹道 - 推演赋值（私有）
//==============================
Drill_COBa_Manager.drill_COBa_preBallisticsMove_Private = function( obj_data, obj_index, org_x, org_y ){
	this.drill_COBa_preBallisticsPlanimetry( obj_data, obj_index, org_x, org_y );		//（按一维弹道规则推演）
	
	// > 指针结果交换（不需要交换）
	//obj_data['_drill_COBa_x'];
	//obj_data['_drill_COBa_y'];
}



//==============================
// * 0M弹道工具函数 - 字符串 转 锚点列表（私有）
//==============================
Drill_COBa_Manager.drill_COBa_convertStringToPointList_Private = function( str ){
	str = str.replace(/[ ]/g,"");			//（去空格）
	str = str.replace(/[\(（]/g,"");		//（去左括号，包括中文）
	str = str.replace(/[\)）]/g,"");		//（去右括号，包括中文）
	str = str.split(/[,，]/g);				//（根据逗号分隔，包括中文）
	
	// > 格式不符则返回空数组
	if( str.length == 0 || str.length %2 == 1 ){
		return [];
	}
	
	// > 锚点列表
	var point_list = [];
	for( var j = 0; j < str.length ; j+=2 ){
		var x = Number( str[j] );
		var y = Number( str[j+1] );
		point_list.push({ 'x':x,'y':y });
	}
	return point_list;
};
//==============================
// * 0M弹道工具函数 - 锚点列表 转 字符串（私有）
//==============================
Drill_COBa_Manager.drill_COBa_convertPointListToString_Private = function( point_list ){
	var str = "";
	for( var j = 0; j < point_list.length ; j++ ){
		var point = point_list[j]
		str += "(" + point.x + "," + point.y + ")";
		if( j < point_list.length-1 ){
			str += ",";
		}
	}
	return str;
};


//==============================
// * 0N校验值 - 参数
//==============================
Drill_COBa_Manager._drill_COBa_checkOn = true;		//（出错一次后，永久关闭）
//==============================
// * 0N校验值 - 校验参数容器
//==============================
Drill_COBa_Manager.drill_COBa_checkParamValue = function( p, result ){
	if( this._drill_COBa_checkOn != true ){ return; }
	
	if( result == undefined ){
		this._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ValueError("undefined未定义",p ) );
	}
	if( isNaN( result ) == true ){
		this._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ValueError("NaN值",p ) );
		
	}else if( isFinite( result ) == false ){
		this._drill_COBa_checkOn = false;
		alert( DrillUp.drill_COBa_getPluginTip_ValueError("无穷大/无穷小",p ) );
	}
}





//=============================================================================
// ** 弹道扩展工具【Drill_COBa_ExtendTool】
// **			
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个静态类，用于子插件快速调用，减少冗余代码。
// **		子功能：	
// **					->0A叠加变化宏定义
// **						->一维弹道
// **							->控制器 设置目标
// **							->控制器 帧刷新
// **							->贴图 帧刷新
// **						->二维弹道
// **							->控制器 设置目标
// **							->控制器 帧刷新
// **							->贴图 帧刷新
// **				
// **		说明：	> 该静态类中【不存储】任何参数。
// **				> 具体功能见 "32.数学模型 > 关于弹道.docx"。
//=============================================================================
//==============================
// * 弹道扩展工具 - 定义
//==============================
function Drill_COBa_ExtendTool() {
    throw new Error("弹道扩展工具 Drill_COBa_ExtendTool 是一个静态类，不需要实例化。");
}

//=============================================================================
// * 0A叠加变化宏定义
//
//			限制条件：	> 弹道的变化只能为 "目标值模式"（一维） 和 "两点式"（二维）。
//						> 必须绑定在 控制器-贴图 的结构中。
//						> 必须要求的 控制器-贴图 是一对一。因为贴图会改变控制器中的数据。
//
//			说明：	> 通过 调用 设置目标，可以快速定义一个弹道，并执行弹道的变化。
//					  定义的弹道能被一并保存，没有被定义时，不消耗存储和性能。
//					
//					> 此工具包含三个函数：
//							设置目标、控制器帧刷新、贴图帧刷新。
//					
//					> 原理上类似于在 控制器-贴图 中套一个更小的弹道控制器 来获取数据。
//					> 贴图帧刷新 完全可以避免掉，但是考虑到性能和内存，这里还是把计算转移到贴图中吧。
//					> 用法可见 地图魔法圈 插件的 D指令叠加变化 子功能。
//=============================================================================
//==============================
// * 0A叠加变化宏定义（一维弹道） - 控制器 - 设置目标（开放函数）
//
//			参数：	> controller 对象      （控制器对象）
//					> CDataName 字符串     （控制器中的变量名，变量初始定义必须为null）
//					> org_value 数字       （初始值）
//					> change_type 字符串   （目标值变化类型）
//					> tar_value 数字       （目标值）
//					> tar_time 数字        （时长）
//					> change_delay 数字    （开始前延迟时间，可为空，可不填）
//					> change_endDelay 数字 （到终点后延迟时间，可为空，可不填）
//			返回：	> 无
//
//			说明：	> 该静态类中【不存储】任何参数。
//					> 该函数会给 controller 进行参数赋值。
//					> 调用时要给定初始值 org_value，虽然初始值只在第一次调用指令时有效，但必须要给。
//==============================
Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget = function( controller, CDataName, org_value, change_type, tar_value, tar_time, change_delay, change_endDelay ){
	
	// > 第一次调用时，创建
	if( controller[CDataName] == undefined ){
		var c_data = {};
		c_data['cur_value'] = org_value;	//（初始值只赋值一次）
		controller[CDataName] = c_data;
	}
	
	// > 刷新目标与弹道
	var c_data = controller[CDataName];
	c_data['serial'] = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
	c_data['cur_time'] = 0;
	c_data['change_type'] = change_type;
	c_data['tar_value'] = tar_value;
	c_data['tar_time'] = tar_time;
	if( change_delay    != undefined ){ c_data['change_delay']    = change_delay;    }
	if( change_endDelay != undefined ){ c_data['change_endDelay'] = change_endDelay; }
	controller[CDataName] = c_data;
}
//==============================
// * 0A叠加变化宏定义（一维弹道） - 控制器 - 清空目标（开放函数）
//
//			参数：	> controller 对象      （控制器对象）
//					> CDataName 字符串     （控制器中的变量名）
//			返回：	> 无
//==============================
Drill_COBa_ExtendTool.drill_COBa_Common_controller_clearTarget = function( controller, CDataName ){
	controller[CDataName] = undefined;
}
//==============================
// * 0A叠加变化宏定义（一维弹道） - 帧刷新控制器（开放函数）
//
//			参数：	> controller 对象  （控制器对象）
//					> CDataName 字符串 （控制器中的变量名）
//			返回：	> 无
//==============================
Drill_COBa_ExtendTool.drill_COBa_Common_controller_update = function( controller, CDataName ){
	if( controller[CDataName] == undefined ){ return; }
	
	controller[CDataName]['cur_time'] += 1;
}
//==============================
// * 0A叠加变化宏定义（一维弹道） - 帧刷新贴图（开放函数）
//
//			参数：	> sprite 对象      （贴图对象）
//					> SDataName 字符串 （贴图中的变量名，变量初始定义必须为null）
//					> controller 对象  （控制器对象）
//					> CDataName 字符串 （控制器中的变量名）
//			返回：	> controller[CDataName]['cur_value'] 数字（当前值）
//
//			说明：	> 注意，此函数处于帧刷新中，通过 变量对象 的有无来进行 初始化、弹道推演、帧刷新赋值 。
//==============================
Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update = function( sprite, SDataName, controller, CDataName ){
	if( controller[CDataName] == undefined ){ return; }
	
	// > 一维弹道 - 初始化
	var c_data = controller[CDataName];
	var s_data = sprite[SDataName];
	if( s_data == undefined ){
		s_data = {};
		s_data['serial'] = null;
		s_data['value_seq'] = null;
		sprite[SDataName] = s_data;
	}
	
	// > 一维弹道 - 弹道推演
	//			（在贴图中 推演赋值，控制器只存 计时器 ）
	if( s_data['serial'] != c_data['serial'] ){
		s_data['serial'] =  c_data['serial'];
		
		// > 重建弹道
		var org_value = c_data['cur_value'];
		var b_data = {};
		b_data['commonNum'] = 1;
		b_data['commonTime'] = c_data['tar_time'];
		b_data['commonMode'] = "目标值模式";
		if( c_data['change_delay']    != undefined ){ b_data['commonDelay']    = c_data['change_delay'];    }
		if( c_data['change_endDelay'] != undefined ){ b_data['commonEndDelay'] = c_data['change_endDelay']; }
		b_data['targetType'] = c_data['change_type'];
		b_data['targetDifference'] = c_data['tar_value'] - org_value;
		Drill_COBa_Manager.drill_COBa_setBallisticsCommon( b_data );
		Drill_COBa_Manager.drill_COBa_preBallisticsCommon( sprite, 0, org_value );
		s_data['value_seq'] = sprite._drill_COBa_common;
		sprite._drill_COBa_common = null;
	}
	
	// > 一维弹道 - 帧刷新赋值
	if( s_data['value_seq'] != undefined ){
		var cur_time = c_data['cur_time'];
		if( cur_time >= s_data['value_seq'].length ){
			cur_time =  s_data['value_seq'].length -1;
		}
		c_data['cur_value'] = s_data['value_seq'][cur_time];
	}
}


//==============================
// * 0A叠加变化宏定义（二维弹道） - 控制器 - 设置目标（开放函数）
//
//			参数：	> controller 对象      （控制器对象）
//					> CDataName 字符串     （控制器中的变量名，变量初始定义必须为null）
//					> org_valueA 数字      （初始值）
//					> org_valueB 数字      （初始值）
//					> change_type 字符串   （两点式变化类型）
//					> tar_valueA 数字      （目标值）
//					> tar_valueB 数字      （目标值）
//					> tar_time 数字        （时长）
//					> change_delay 数字    （开始前延迟时间，可为空，可不填）
//					> change_endDelay 数字 （到终点后延迟时间，可为空，可不填）
//			返回：	> 无
//
//			说明：	> 该静态类中【不存储】任何参数。
//					> 该函数会给 controller 进行参数赋值。
//					> 调用时要给定初始值 org_valueA、org_valueB，虽然初始值只在第一次调用指令时有效，但必须要给。
//==============================
Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget = function( controller, CDataName, org_valueA, org_valueB, change_type, tar_valueA, tar_valueB, tar_time, change_delay, change_endDelay ){
	
	// > 第一次调用时，创建
	if( controller[CDataName] == undefined ){
		var c_data = {};
		c_data['cur_valueA'] = org_valueA;	//（初始值只赋值一次）
		c_data['cur_valueB'] = org_valueB;	//
		controller[CDataName] = c_data;
	}
	
	// > 刷新目标与弹道
	var c_data = controller[CDataName];
	c_data['serial'] = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
	c_data['cur_time'] = 0;
	c_data['change_type'] = change_type;
	c_data['tar_valueA'] = tar_valueA;
	c_data['tar_valueB'] = tar_valueB;
	c_data['tar_time'] = tar_time;
	if( change_delay    != undefined ){ c_data['change_delay']    = change_delay;    }
	if( change_endDelay != undefined ){ c_data['change_endDelay'] = change_endDelay; }
	controller[CDataName] = c_data;
}
//==============================
// * 0A叠加变化宏定义（二维弹道） - 控制器 - 清空目标（开放函数）
//
//			参数：	> controller 对象      （控制器对象）
//					> CDataName 字符串     （控制器中的变量名）
//			返回：	> 无
//==============================
Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_clearTarget = function( controller, CDataName ){
	controller[CDataName] = undefined;
}
//==============================
// * 0A叠加变化宏定义（二维弹道） - 帧刷新控制器（开放函数）
//
//			参数：	> controller 对象  （控制器对象）
//					> CDataName 字符串 （控制器中的变量名）
//			返回：	> 无
//==============================
Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update = function( controller, CDataName ){
	if( controller[CDataName] == undefined ){ return; }
	
	controller[CDataName]['cur_time'] += 1;
}
//==============================
// * 0A叠加变化宏定义（二维弹道） - 帧刷新贴图（开放函数）
//
//			参数：	> sprite 对象      （贴图对象）
//					> SDataName 字符串 （贴图中的变量名，变量初始定义必须为null）
//					> controller 对象  （控制器对象）
//					> CDataName 字符串 （控制器中的变量名）
//			返回：	> controller[CDataName]['cur_valueA'] 数字（当前值）
//                  > controller[CDataName]['cur_valueB'] 数字（当前值）
//               	
//			说明：	> 注意，此函数处于帧刷新中，通过数据对象的有无来进行 初始化、弹道推演、帧刷新赋值 。
//==============================
Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update = function( sprite, SDataName, controller, CDataName ){
	if( controller[CDataName] == undefined ){ return; }
	
	// > 二维弹道 - 初始化
	var c_data = controller[CDataName];
	var s_data = sprite[SDataName];
	if( s_data == undefined ){
		s_data = {};
		s_data['serial'] = null;
		s_data['valueA_seq'] = null;
		s_data['valueB_seq'] = null;
		sprite[SDataName] = s_data;
	}
	
	// > 二维弹道 - 弹道推演
	//			（在贴图中 推演赋值，控制器只存 计时器 ）
	if( s_data['serial'] != c_data['serial'] ){
		s_data['serial'] =  c_data['serial'];
		
		// > 重建弹道
		var org_valueA = c_data['cur_valueA'];
		var org_valueB = c_data['cur_valueB'];
		var b_data = {};
		b_data['planimetryNum'] = 1;
		b_data['planimetryTime'] = c_data['tar_time'];
		b_data['planimetryMode'] = "两点式";
		if( c_data['change_delay']    != undefined ){ b_data['planimetryDelay']    = c_data['change_delay'];    }
		if( c_data['change_endDelay'] != undefined ){ b_data['planimetryEndDelay'] = c_data['change_endDelay']; }
		
		b_data['twoPointType'] = c_data['change_type'];
		if(      b_data['twoPointType'] == "不移动"     ){ b_data['twoPointType'] = "不变化";     }
		else if( b_data['twoPointType'] == "瞬间移动"   ){ b_data['twoPointType'] = "瞬间变化";   }
		else if( b_data['twoPointType'] == "匀速移动"   ){ b_data['twoPointType'] = "匀速变化";   }
		else if( b_data['twoPointType'] == "增减速移动" ){ b_data['twoPointType'] = "增减速变化"; }
		else if( b_data['twoPointType'] == "弹性移动"   ){ b_data['twoPointType'] = "弹性变化";   }
		else if( b_data['twoPointType'] == "抛物线移动" ){ b_data['twoPointType'] = "抛物线变化"; }
		
		b_data['twoPointDifferenceX'] = c_data['tar_valueA'] - org_valueA;
		b_data['twoPointDifferenceY'] = c_data['tar_valueB'] - org_valueB;
		Drill_COBa_Manager.drill_COBa_setBallisticsPlanimetry( b_data );
		Drill_COBa_Manager.drill_COBa_preBallisticsPlanimetry( sprite, 0, org_valueA, org_valueB );
		s_data['valueA_seq'] = sprite._drill_COBa_x;
		s_data['valueB_seq'] = sprite._drill_COBa_y;
		sprite._drill_COBa_x = null;
		sprite._drill_COBa_y = null;
	}
	
	// > 二维弹道 - 帧刷新赋值
	if( s_data['valueA_seq'] != undefined ){
		var cur_time = c_data['cur_time'];
		if( cur_time >= s_data['valueA_seq'].length ){
			cur_time =  s_data['valueA_seq'].length -1;
		}
		c_data['cur_valueA'] = s_data['valueA_seq'][cur_time];
		c_data['cur_valueB'] = s_data['valueB_seq'][cur_time];
	}
}

