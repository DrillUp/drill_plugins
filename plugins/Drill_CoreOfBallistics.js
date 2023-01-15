//=============================================================================
// Drill_CoreOfBallistics.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        系统 - 弹道核心
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
 *   - Drill_PictureAdsorptionSlot   图片-图片吸附槽
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于贴图。
 * 2.该插件的主要功能为数学计算，绘制二维曲线轨迹。
 *   可以去看看文档 "1.系统 > 关于弹道.docx"。
 * 弹道：
 *   (1.子插件会根据自身特点，控制不同情况的弹道。
 *   (2.部分子插件配置项分为 极坐标模式 与 直角坐标模式。
 *      输入相关配置参数，经过推演，可得到结果数组。
 *      结果数组即子弹运动的轨迹，可以正向播放，也可以倒放。
 *   (3.部分子插件会用到该弹道核心的 两点式 移动算法，来实现
 *      多种弹性移动。
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
 * 修复了 两点式 不移动时，闪移的bug。
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
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COBa（Core_Of_Ballistics）
//		临时全局变量	无
//		临时局部变量	this._drill_COBa_xxx
//		存储数据变量	无
//		全局存储变量	无
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
//		★大体框架与功能如下：
//			弹道：
//				->移动弹道【二维数组】：
//					->标准模块
//						->初始化数据【标准默认值】
//						->预推演【标准函数】
//					->移动模式
//						->极坐标：方向 + 速度
//						->直角坐标：x速度 + y速度
//						->轨道锚点：锚点列表 + 速度
//						->两点式
//					->属性
//						->速度
//							->只初速度
//							->初速度+波动量
//							->初速度+波动量+加速度
//							->初速度+波动量+加速度+最大最小
//							->路程计算公式
//						->方向
//							->固定方向
//							->四周扩散（线性/随机）
//							->扇形范围方向（线性/随机）
//							->方向计算公式
//						->轨道锚点
//							> 锚点列表
//							> 距离容器
//							> 时间冗余标记
//						->两点式
//							> 不移动
//							> 瞬间移动
//							> 匀速移动
//							> 增减速移动
//							> 弹性移动
//							> 抛物线移动
//						->随机因子（RandomFactor）
//						->随机迭代次数（RandomIteration）
//						->终止条件（terminate）
//				->通用弹道【一维数组】：
//					->标准模块
//						->初始化数据【标准默认值】
//						->预推演【标准函数】
//					->变化模式
//						->目标值
//						->时间公式
//						->时间锚点
//						->自定义公式
//					->应用对象
//						->透明度
//						->缩放X
//						->缩放Y
//						->旋转角
//					->随机因子（RandomFactor）
//					->随机迭代次数（RandomIteration）
//
//		★必要注意事项：
//			1.插件提供数学计算，setBallistics初始化配置，preBallistics预推演数据。
//			2.结合文档 "1.系统 > 关于弹道.docx" 来看脚本。
//			
//		★其它说明细节：
//			1.随机因子是一个特殊的参数，作用是使得轨迹既有随机性，又不会在重新赋值时出现轨迹重置现象。
//			  如果你要锁定随机因子，在 默认值 中对因子数列进行的赋值即可。【通常情况下随机因子是不需要赋值的。】
//			2.未设置延迟的情况下，data['movementTime'] 时长 就是数组的长度。
//			  但如果你设置了延迟，就需要考虑数组长度变化的问题了。
//		
//		★核心接口说明：
//			1.整个核心提供多个可调用的函数接口。	
//			2.用法：
//					// > 移动
//					$gameTemp.drill_COBa_setBallisticsMove( data );							//初始化
//					$gameTemp.drill_COBa_preBallisticsMove( obj, index , orgX, orgY );		//推演赋值
//					// > 透明度
//					$gameTemp.drill_COBa_setBallisticsOpacity( data );						//初始化
//					$gameTemp.drill_COBa_preBallisticsOpacity( obj, index , orgOpacity );	//推演赋值
//					// > 旋转
//					$gameTemp.drill_COBa_setBallisticsRotate( data );						//初始化
//					$gameTemp.drill_COBa_preBallisticsRotate( obj, index , orgRotate );		//推演赋值
//	
//			  【注意，初始化和推演函数不要隔得太远】因为有可能会被重叠推演盖掉。
//			  obj用于放配置数据，执行完后，结果集会放到下面两个数组中：
//			  		obj['_drill_COBa_x']
//			  		obj['_drill_COBa_y']
//			  obj可以是个对象，空数组也可以，只要能放结果就可以。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfBallistics = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfBallistics');



//#############################################################################
// ** 【标准模块】弹道
//#############################################################################
//##############################
// * 移动弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象              （准备的数据）
//			返回：	> 动态参数对象                   （预推演 用的数据）
//					> $gameTemp._drill_COBa_moveData （预推演 用的数据）
//			
//			功能：	> 纯数学计算。给传来的data进行初始赋值。
//                  > 执行后，需要立即执行 预推演 ，确保这两个接口在同一个函数内执行即可。
//					
//			说明：	> 动态参数对象 具体见 drill_COBa_setBallisticsMove_Private 。
//                  > 注意，锚点列表的格式固定为：[ {'x':0,'y':0} ]，你可以用工具类转一下。
//					> 执行后，会固定【随机因子】，可将 返回数据 存储，进而确保生成相同的弹道。
//					  返回数据 可以放入此函数再次执行，参数对象内容不会变。
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsMove = function( data ){
	return this.drill_COBa_setBallisticsMove_Private( data );
}
//##############################
// * 移动弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组长度）
//					
//			说明：	> 此函数必须在 初始化数据 之后调用。得到的值是【弹道数组的长度】，即弹道总时间。
//					> 注意，'movementTime'不是总时间，还需要考虑延迟时间。
//					> 此函数能在预推演前，得到数组长度。
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsMove_TotalTime = function(){
	return this.drill_COBa_getBallisticsMove_TotalTime_Private();
}
//##############################
// * 移动弹道 - 预推演【标准函数】
//			
//			参数：	> obj_data 对象  （对象容器）
//					> obj_index 数字 （对象编号）
//					> orgX 数字      （初始x位置）
//					> orgY 数字      （初始y位置）
//					> $gameTemp._drill_COBa_moveData （初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_x'] 数字数组（计算的X结果）
//					> this['_drill_COBa_y'] 数字数组（计算的Y结果）
//			
//			功能：	> 纯数学计算。根据当前的弹道参数设置，开始计算轨迹。
//					
//			说明：	> 对象编号 obj_index 必须按照预先给的来，即 0 到 'movementNum'-1 的值。
//					> 每次推演返回的数组长度都一样。
//					> 此处的【随机因子】已被固定，如果要再次推演不同的随机弹道，可以修改【随机迭代次数】。
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsMove = function( obj_data, obj_index, orgX, orgY ){
	this.drill_COBa_preBallisticsMove_Private( obj_data, obj_index, orgX, orgY );
}

//##############################
// * 透明度弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象                （准备的数据）
//			返回：	> 动态参数对象                     （预推演 用的数据）
//					> $gameTemp._drill_COBa_commonData （预推演 用的数据）
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsOpacity = function( data ){
	return this.drill_COBa_setBallisticsOpacity_Private( data );
}
//##############################
// * 透明度弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsOpacity_TotalTime = function(){
	return this.drill_COBa_preBallisticsCommon_TotalTime_Private();
}
//##############################
// * 透明度弹道 - 预推演【标准函数】
//			
//			参数：	> obj_data 对象  （对象容器）
//					> obj_index 数字 （对象编号）
//					> orgOpacity 数字（初始透明度）
//					> $gameTemp._drill_COBa_commonData （初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_opacity'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsOpacity = function( obj_data, obj_index, orgOpacity ){
	this.drill_COBa_preBallisticsOpacity_Private( obj_data, obj_index, orgOpacity );
}

//##############################
// * 缩放X弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象                （准备的数据）
//			返回：	> 动态参数对象                     （预推演 用的数据）
//					> $gameTemp._drill_COBa_commonData （预推演 用的数据）
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsScaleX = function( data ){
	return this.drill_COBa_setBallisticsScaleX_Private( data );
}
//##############################
// * 缩放X弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsScaleX_TotalTime = function(){
	return this.drill_COBa_preBallisticsCommon_TotalTime_Private();
}
//##############################
// * 缩放X弹道 - 预推演【标准函数】
//			
//			参数：	> obj_data 对象  （对象容器）
//					> obj_index 数字 （对象编号）
//					> orgScaleX 数字（初始缩放X）
//					> $gameTemp._drill_COBa_commonData （初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_scaleX'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsScaleX = function( obj_data, obj_index, orgScaleX ){
	this.drill_COBa_preBallisticsScaleX_Private( obj_data, obj_index, orgScaleX );
}
//##############################
// * 缩放Y弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象                （准备的数据）
//			返回：	> 动态参数对象                     （预推演 用的数据）
//					> $gameTemp._drill_COBa_commonData （预推演 用的数据）
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsScaleY = function( data ){
	return this.drill_COBa_setBallisticsScaleY_Private( data );
}
//##############################
// * 缩放Y弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsScaleY_TotalTime = function(){
	return this.drill_COBa_preBallisticsCommon_TotalTime_Private();
}
//##############################
// * 缩放Y弹道 - 预推演【标准函数】
//			
//			参数：	> obj_data 对象  （对象容器）
//					> obj_index 数字 （对象编号）
//					> orgScaleY 数字（初始缩放Y）
//					> $gameTemp._drill_COBa_commonData （初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_scaleY'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsScaleY = function( obj_data, obj_index, orgScaleY ){
	this.drill_COBa_preBallisticsScaleY_Private( obj_data, obj_index, orgScaleY );
}

//##############################
// * 旋转角弹道 - 初始化数据【标准默认值】
//			
//			参数：	> data 动态参数对象                （准备的数据）
//			返回：	> 动态参数对象                     （预推演 用的数据）
//					> $gameTemp._drill_COBa_commonData （预推演 用的数据）
//##############################
Game_Temp.prototype.drill_COBa_setBallisticsRotate = function( data ){
	return this.drill_COBa_setBallisticsRotate_Private( data );
}
//##############################
// * 缩放Y弹道 - 获取弹道总时间【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字 （弹道数组长度）
//##############################
Game_Temp.prototype.drill_COBa_getBallisticsRotate_TotalTime = function(){
	return this.drill_COBa_preBallisticsCommon_TotalTime_Private();
}
//##############################
// * 旋转角弹道 - 预推演【标准函数】
//			
//			参数：	> obj_data 对象  （对象容器）
//					> obj_index 数字 （对象编号）
//					> orgRotate 数字（初始旋转角）
//					> $gameTemp._drill_COBa_commonData （初始化数据后得到的）
//			返回：	> 无
//					> this['_drill_COBa_rotate'] 数字数组（计算的结果）
//##############################
Game_Temp.prototype.drill_COBa_preBallisticsRotate = function( obj_data, obj_index, orgRotate ){
	this.drill_COBa_preBallisticsRotate_Private( obj_data, obj_index, orgRotate );
}



//=============================================================================
// ** 临时变量初始化
//=============================================================================
var _drill_COBa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(bitmap){
	_drill_COBa_temp_initialize.call(this, bitmap);
	this._drill_COBa_moveData = {};			//临时容器 - 移动弹道
	this._drill_COBa_commonData = {};		//临时容器 - 通用弹道
}


//=============================================================================
// ** 工具
//=============================================================================
//==============================
// * 工具 - 字符串 转 锚点列表
//==============================
DrillUp.drill_COBa_convertStringToPointList = function( str ){
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
// * 工具 - 锚点列表 转 字符串
//==============================
DrillUp.drill_COBa_convertPointListToString = function( point_list ){
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
// * 工具 - 生成随机数（随机种子）
//			
//			参数：	> seed 数字	（正整数）
//			返回：	> 数字 		（0~1随机数）
//			
//			说明：	> 如果随机种子为 1至100，那么你将得到线性均匀分布的随机值。不是乱序随机。
//==============================
DrillUp.drill_COBa_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};
//==============================
// * 工具 - 生成随机数（迭代）
//			
//			参数：	> org_ran 数字   （0~1原随机数）
//					> iteration 数字 （正整数，迭代次数）
//			返回：	> 数字           （0~1新随机数）
//			
//			说明：	> 经过迭代后，能够得到乱序的随机数。
//==============================
DrillUp.drill_COBa_getRandomInIteration = function( org_ran, iteration ){
	var prime = DrillUp.drill_COBa_primeList[ iteration % DrillUp.drill_COBa_primeList.length ];
	var temp_ran = ( (org_ran + iteration) * 9301 + 49297 ) % 233280;
	temp_ran = temp_ran / prime;
	var new_ran = (temp_ran + org_ran * iteration * prime) %1;
	return new_ran;
	//var new_ran = (25214903917 * (org_ran + iteration)) & ((1 << 48) - 1);
	//return new_ran %1;
};
//==============================
// * 数学 - 质数表（1000以内）
//==============================
DrillUp.drill_COBa_primeList = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,
	73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,
	191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,
	311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,
	439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,
	577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,
	709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,
	857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];


//=============================================================================
// * 值校验
//=============================================================================
DrillUp._drill_COBa_checkOn = true;		//（出错一次后，永久关闭）
DrillUp.drill_COBa_checkValue = function( p, result ){
	if( DrillUp._drill_COBa_checkOn != true ){ return; }
	
	if( result == undefined ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到公式值出现undefined未定义，请及时检查你的公式是否正确。"+
			"\n当前取值：" + JSON.stringify( p )
		);
	}
	if( isNaN( result ) == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到公式值出现NaN值，请及时检查你的公式是否正确。"+
			"\n当前取值：" + JSON.stringify( p )
		);
	}else if( isFinite( result ) == false ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到公式值出现无穷大/无穷小，请及时检查你的公式是否正确。"+
			"\n当前取值：" + JSON.stringify( p )
		);
	}
}


//=============================================================================
// ** 移动弹道【二维数组】
//=============================================================================
//==============================
// * 移动弹道 - 初始化数据 默认值（私有）
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsMove_Private = function( data ){
	var result = {};
	
	// > 移动基础参数（movement）
	result['movementNum'] = data['movementNum'] || 1;									//移动 - 子弹数量
	result['movementTime'] = data['movementTime'] || 1;                     			//移动 - 时长
	result['movementDelay'] = data['movementDelay'] || 0;                   			//移动 - 开始前延迟时间
	result['movementEndDelay'] = data['movementEndDelay'] || 0;             			//移动 - 到终点后延迟时间
	result['movementOrderDelay'] = data['movementOrderDelay'] || 0;                   	//移动 - ID依次延迟时间（可为正数负数，将在首尾形成额外梯度的延迟时间）
	result['movementMode'] = data['movementMode'] || "极坐标模式";          			//移动 - 移动模式（极坐标模式/直角坐标模式/两点式/…）
	
	//   ■ 极坐标（polar）		
	if( result['movementMode'] == "极坐标模式" ){	//（这样写是为了减少参数数量，便于存储）
		result['polarSpeedType'] = data['polarSpeedType'] || "只初速度";				//极坐标 - 速度 - 类型
		result['polarSpeedBase'] = data['polarSpeedBase'] || 0;                         //极坐标 - 速度 - 初速度
		result['polarSpeedRandom'] = data['polarSpeedRandom'] || 0;                     //极坐标 - 速度 - 速度随机波动量
		result['polarSpeedInc'] = data['polarSpeedInc'] || 0;                           //极坐标 - 速度 - 加速度
		result['polarSpeedMax'] = data['polarSpeedMax'] || 0;                           //极坐标 - 速度 - 最大速度
		result['polarSpeedMin'] = data['polarSpeedMin'] || 0;                           //极坐标 - 速度 - 最小速度
		result['polarDistanceFormula'] = data['polarDistanceFormula'] || "return 0";    //极坐标 - 速度 - 路程计算公式
		result['polarDirType'] = data['polarDirType'] || "固定方向";                    //极坐标 - 方向 - 类型
		result['polarDirFixed'] = data['polarDirFixed'] || 0;                           //极坐标 - 方向 - 固定方向
		result['polarDirSectorFace'] = data['polarDirSectorFace'] || 0;                 //极坐标 - 方向 - 扇形朝向
		result['polarDirSectorDegree'] = data['polarDirSectorDegree'] || 0;             //极坐标 - 方向 - 扇形角度
		result['polarDirFormula'] = data['polarDirFormula'] || "return 0";              //极坐标 - 方向 - 方向计算公式
	}
	//   ■ 直角坐标（cartesian）
	else if( result['movementMode'] == "直角坐标模式" ){			
		result['cartRotation'] = data['cartRotation'] || 0;								//直角坐标 - 整体坐标轴旋转角度
		result['cartXSpeedType'] = data['cartXSpeedType'] || "只初速度";				//直角坐标 - x - 类型	
		result['cartXSpeedBase'] = data['cartXSpeedBase'] || 0;                         //直角坐标 - x - 初速度
		result['cartXSpeedRandom'] = data['cartXSpeedRandom'] || 0;                     //直角坐标 - x - 速度随机波动量
		result['cartXSpeedInc'] = data['cartXSpeedInc'] || 0;                           //直角坐标 - x - 加速度
		result['cartXSpeedMax'] = data['cartXSpeedMax'] || 0;                           //直角坐标 - x - 最大速度
		result['cartXSpeedMin'] = data['cartXSpeedMin'] || 0;                           //直角坐标 - x - 最小速度
		result['cartXDistanceFormula'] = data['cartXDistanceFormula'] || "return 0";    //直角坐标 - x - 路程计算公式
		result['cartYSpeedType'] = data['cartYSpeedType'] || "只初速度";                //直角坐标 - y - 类型
		result['cartYSpeedBase'] = data['cartYSpeedBase'] || 0;                         //直角坐标 - y - 初速度
		result['cartYSpeedRandom'] = data['cartYSpeedRandom'] || 0;                     //直角坐标 - y - 速度随机波动量
		result['cartYSpeedInc'] = data['cartYSpeedInc'] || 0;                           //直角坐标 - y - 加速度
		result['cartYSpeedMax'] = data['cartYSpeedMax'] || 0;                           //直角坐标 - y - 最大速度
		result['cartYSpeedMin'] = data['cartYSpeedMin'] || 0;                           //直角坐标 - y - 最小速度
		result['cartYDistanceFormula'] = data['cartYDistanceFormula'] || "return 0";    //直角坐标 - y - 路程计算公式
	}
	//   ■ 轨道锚点（track）		
	else if( result['movementMode'] == "轨道锚点模式" ){			
		result['trackSpeedType'] = data['trackSpeedType'] || "只初速度";				//轨道锚点 - 速度 - 类型
		result['trackSpeedBase'] = data['trackSpeedBase'] || 0;                         //轨道锚点 - 速度 - 初速度
		result['trackSpeedRandom'] = data['trackSpeedRandom'] || 0;                     //轨道锚点 - 速度 - 速度随机波动量
		result['trackSpeedInc'] = data['trackSpeedInc'] || 0;                           //轨道锚点 - 速度 - 加速度
		result['trackSpeedMax'] = data['trackSpeedMax'] || 0;                           //轨道锚点 - 速度 - 最大速度
		result['trackSpeedMin'] = data['trackSpeedMin'] || 0;                           //轨道锚点 - 速度 - 最小速度
		result['trackDistanceFormula'] = data['trackDistanceFormula'] || "return 0";    //轨道锚点 - 速度 - 路程计算公式
		result['trackPointTank'] = data['trackPointTank'] || [];                        //轨道锚点 - 轨道 - 锚点列表
		result['trackRotation'] = data['trackRotation'] || 0;                           //轨道锚点 - 轨道 - 整体旋转角度
	}
	//   ■ 两点式（twoPoint）
	else if( result['movementMode'] == "两点式" ){		
		result['twoPointType'] = data['twoPointType'] || "不移动";						//两点式 - 类型（不移动/匀速移动/弹性移动/……）
		result['twoPointDifferenceX'] = data['twoPointDifferenceX'] || 0;				//两点式 - 距离差值x（终点减起点）
		result['twoPointDifferenceY'] = data['twoPointDifferenceY'] || 0;	            //两点式 - 距离差值y（终点减起点）
		result['twoPointParabolaDir'] = data['twoPointParabolaDir'] || 0;	            //两点式 - 抛物线移动 - 初始方向（单位角度）
		result['twoPointParabolaSpeed'] = data['twoPointParabolaSpeed'] || 0;	        //两点式 - 抛物线移动 - 初始速度
	}
	
	
	// > 随机因子（RandomFactor）
	//		（注意，独立参数项之间，随机因子不可共用！会造成强关联的错误关系。）
	if( result['movementMode'] == "极坐标模式" ){
		result['polarSpeedRandomFactor'] = data['polarSpeedRandomFactor'] || Math.random();
		result['polarDirRandomFactor'] = data['polarDirRandomFactor'] || Math.random();
	}
	else if( result['movementMode'] == "直角坐标模式" ){
		result['cartXSpeedRandomFactor'] = data['cartXSpeedRandomFactor'] || Math.random();
		result['cartYSpeedRandomFactor'] = data['cartYSpeedRandomFactor'] || Math.random();
	}
	else if( result['movementMode'] == "轨道锚点模式" ){
		result['trackSpeedRandomFactor'] = data['trackSpeedRandomFactor'] || Math.random();
	}
	else if( result['movementMode'] == "两点式" ){
		//（无随机因子）
	}
	
	
	// > 随机迭代次数（RandomIteration）
	if( result['movementMode'] == "极坐标模式" ){
		if( data['polarSpeedRandomIterationList'] != undefined ){
			result['polarSpeedRandomIterationList'] = data['polarSpeedRandomIterationList'];//（这里直接用指针，迭代次数变化，推演跟着变）
			result['polarDirRandomIterationList'] = data['polarDirRandomIterationList'];
		}else{
			result['polarSpeedRandomIterationList'] = [];								//极坐标 - 速度 - 随机迭代次数（基于随机因子，反复形成新的随机数）
			result['polarDirRandomIterationList'] = [];   								//极坐标 - 方向 - 随机迭代次数
			for( var i=0; i < result['movementNum']; i++ ){
				result['polarSpeedRandomIterationList'].push( 1 );
				result['polarDirRandomIterationList'].push( 1 );
			}
		}
	}
	else if( result['movementMode'] == "直角坐标模式" ){		
		if( data['cartXSpeedRandomIterationList'] != undefined ){
			result['cartXSpeedRandomIterationList'] = data['cartXSpeedRandomIterationList'];//（这里直接用指针，迭代次数变化，推演跟着变）
			result['cartYSpeedRandomIterationList'] = data['cartYSpeedRandomIterationList'];
		}else{
			result['cartXSpeedRandomIterationList'] = [];								//直角坐标 - x - 随机迭代次数（基于随机因子，反复形成新的随机数）
			result['cartYSpeedRandomIterationList'] = [];								//直角坐标 - y - 随机迭代次数
			for( var i=0; i < result['movementNum']; i++ ){
				result['cartXSpeedRandomIterationList'].push( 1 );
				result['cartYSpeedRandomIterationList'].push( 1 );
			}
		}
	}
	else if( result['movementMode'] == "轨道锚点模式" ){		
		if( data['trackSpeedRandomIterationList'] != undefined ){
			result['trackSpeedRandomIterationList'] = data['trackSpeedRandomIterationList'];//（这里直接用指针，迭代次数变化，推演跟着变）
		}else{
			result['trackSpeedRandomIterationList'] = [];								//轨道锚点 - 速度 - 随机迭代次数（基于随机因子，反复形成新的随机数）
			for( var i=0; i < result['movementNum']; i++ ){
				result['trackSpeedRandomIterationList'].push( 1 );
			}
		}
	}
	else if( result['movementMode'] == "两点式" ){		
		//（无随机迭代次数）
	}
	
	
	// > 终止条件（terminate）
	result['terminateRectEnabled'] = data['terminateRectEnabled'] || false;				//终止条件 - 矩形范围开关
	if( data['terminateRect'] != undefined ){											//终止条件 - 矩形范围
		result['terminateRect'] = JSON.parse(JSON.stringify( data['terminateRect'] ));
	}else{
		result['terminateRect'] = {'x':0,'y':0,'width':0,'height':0};
	}
	
	
	this._drill_COBa_moveData = result;
	this._drill_COBa_moveObj = null;
	return result;
}
//==============================
// * 移动弹道 - 获取弹道总时间（私有）
//==============================
Game_Temp.prototype.drill_COBa_getBallisticsMove_TotalTime_Private = function(){
	var data = this._drill_COBa_moveData;
	var result = data['movementTime'];
	result += data['movementDelay'];
	result += data['movementEndDelay'];
	result += data['movementOrderDelay'] * (data['movementNum']-1);
	return result;
}
//==============================
// * 移动弹道 - 预推演（私有）
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsMove_Private = function( obj_data, obj_index, orgX, orgY ){
	var data = this._drill_COBa_moveData;
	var obj = this._drill_COBa_moveObj;
	
	// > 初始化校验
	if( isNaN( obj_index ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到obj_index出现NaN值，请及时检查你的函数。"
		);
	}
	if( isNaN( orgX ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到orgX出现NaN值，请及时检查你的函数。"
		);
	}
	if( isNaN( orgY ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到orgY出现NaN值，请及时检查你的函数。"
		);
	}
	obj_data['_drill_COBa_x'] = [];
	obj_data['_drill_COBa_y'] = [];
	
	
	// > 预推演的obj
	if( this._drill_COBa_moveObj == null ){
		this._drill_COBa_moveObj = {};
		obj = this._drill_COBa_moveObj;
		//   公式obj
		if( data['movementMode'] == "极坐标模式"){
			eval("obj['polarDistanceFunction'] = function( p ){ "+data['polarDistanceFormula']+" }" );
			eval("obj['polarDirFunction'] = function( p ){ "+data['polarDirFormula']+" }" );
		}
		else if( data['movementMode'] == "直角坐标模式"){
			eval("obj['cartXDistanceFunction'] = function( p ){ "+data['cartXDistanceFormula']+" }" );
			eval("obj['cartYDistanceFunction'] = function( p ){ "+data['cartYDistanceFormula']+" }" );
		}
		else if( data['movementMode'] == "轨道锚点模式"){
			eval("obj['trackDistanceFunction'] = function( p ){ "+data['trackDistanceFormula']+" }" );
		}
		else if( data['movementMode'] == "两点式" ){		
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
	
	
	/*-----------------极坐标模式------------------*/
	if( data['movementMode'] == "极坐标模式"){
		
		// > 起点值
		obj_data['_drill_COBa_x'].push( orgX );
		obj_data['_drill_COBa_y'].push( orgY );
		
		// > 随机值（方向随机因子）
		var randomDirValue = DrillUp.drill_COBa_getRandomInIteration( data['polarDirRandomFactor'], obj_index +12345 );
		var randomDirValue_i = data['polarDirRandomIterationList'][ obj_index ];
		if( randomDirValue_i == undefined ){ randomDirValue_i = data['polarDirRandomIterationList'][0]; }
		randomDirValue = DrillUp.drill_COBa_getRandomInIteration( randomDirValue, data['movementNum']*randomDirValue_i +obj_index +12345 );
		
		// > 随机值（速度随机因子）
		var randomSpeed = DrillUp.drill_COBa_getRandomInIteration( data['polarSpeedRandomFactor'], obj_index +23456 );
		var randomSpeed_i = data['polarSpeedRandomIterationList'][ obj_index ];
		if( randomSpeed_i == undefined ){ randomSpeed_i = data['polarSpeedRandomIterationList'][0]; }
		randomSpeed = DrillUp.drill_COBa_getRandomInIteration( randomSpeed, data['movementNum']*randomSpeed_i +obj_index +23456 );
		
		// > 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};				//参数容器
		var xx;					//相对坐标X
		var yy;					//相对坐标Y
		var dir;				//方向
		var radius;				//速度
		
		for(var time=1; time < data['movementTime']; time++){
			
			// > 方向
			dir = null;
			p.index = obj_index;							//索引
			p.time  = time;
			p.ran   = randomDirValue;
			p.num   = data['movementNum'];
			p.d0    = data['polarDirFixed'];
			p.sDegree = data['polarDirSectorDegree'];
			p.sFace   = data['polarDirSectorFace'];
			
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
			DrillUp.drill_COBa_checkValue( p, dir );	//（校验）
			dir = dir / 180 * Math.PI;
			
			// > 速度
			radius = null;
			p.index = obj_index;
			p.time  = time;
			p.ran   = randomSpeed;
			p.num   = data['movementNum'];
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
			DrillUp.drill_COBa_checkValue( p, radius );	//（校验）
		
			xx = 0;
			yy = 0;
			xx = orgX + radius * Math.cos(dir);
			yy = orgY + radius * Math.sin(dir);
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
	
	/*-----------------直角坐标模式------------------*/
	else if( data['movementMode'] == "直角坐标模式"){
		
		// > 起点值
		obj_data['_drill_COBa_x'].push( orgX );
		obj_data['_drill_COBa_y'].push( orgY );
		
		// > 随机值（X随机因子）
		var x_randomSpeed = DrillUp.drill_COBa_getRandomInIteration( data['cartXSpeedRandomFactor'], obj_index +34567 );
		var x_randomSpeed_i = data['cartXSpeedRandomIterationList'][ obj_index ];
		if( x_randomSpeed_i == undefined ){ x_randomSpeed_i = data['cartXSpeedRandomIterationList'][0]; }
		x_randomSpeed = DrillUp.drill_COBa_getRandomInIteration( x_randomSpeed, data['movementNum']*x_randomSpeed_i +obj_index +34567 );
		
		// > 随机值（Y随机因子）
		var y_randomSpeed = DrillUp.drill_COBa_getRandomInIteration( data['cartYSpeedRandomFactor'], obj_index +45678 );
		var y_randomSpeed_i = data['cartYSpeedRandomIterationList'][ obj_index ];
		if( y_randomSpeed_i == undefined ){ y_randomSpeed_i = data['cartYSpeedRandomIterationList'][0]; }
		y_randomSpeed = DrillUp.drill_COBa_getRandomInIteration( y_randomSpeed, data['movementNum']*y_randomSpeed_i +obj_index +45678 );
		
		// > 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};				//参数容器
		var xx;					//相对坐标X
		var yy;					//相对坐标Y
		var r_xx;				//直角坐标X（旋转后得到 相对坐标）
		var r_yy;				//直角坐标X
		var rotate;				//整体旋转角度
		
		for(var time=1; time < data['movementTime']; time++){
			
			// > x速度
			p.index = obj_index;
			p.time  = time;
			p.ran   = x_randomSpeed;
			p.num   = data['movementNum'];
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
			DrillUp.drill_COBa_checkValue( p, xx );	//（校验）
			
			// > y速度
			p.index = obj_index;
			p.time  = time;
			p.ran   = y_randomSpeed;
			p.num   = data['movementNum'];
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
			DrillUp.drill_COBa_checkValue( p, yy );	//（校验）
			
			// > 坐标轴整体旋转
			rotate = data['cartRotation'] / 180 * Math.PI;
			r_xx = xx * Math.cos( rotate ) - yy * Math.sin( rotate );
			r_yy = xx * Math.sin( rotate ) + yy * Math.cos( rotate );
		
			xx = orgX + r_xx;
			yy = orgY + r_yy;
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
	
	
	/*-----------------轨道锚点模式------------------*/
	else if( data['movementMode'] == "轨道锚点模式"){
		
		// > 起点值
		obj_data['_drill_COBa_x'].push( orgX );
		obj_data['_drill_COBa_y'].push( orgY );
		
		// > 随机值（通用随机因子）
		var randomSpeed = DrillUp.drill_COBa_getRandomInIteration( data['trackSpeedRandomFactor'], obj_index +56789 );
		var randomSpeed_i = data['trackSpeedRandomIterationList'][ obj_index ];
		if( randomSpeed_i == undefined ){ randomSpeed_i = data['trackSpeedRandomIterationList'][0]; }
		randomSpeed = DrillUp.drill_COBa_getRandomInIteration( randomSpeed, data['movementNum']*randomSpeed_i +obj_index +56789 );
		
		// > 轨道点初始化
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
		
		// > 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};					//参数容器
		var xx;						//相对坐标X
		var yy;						//相对坐标Y
		var distance;				//轨道距离
		var p_xx;					//轨道X（旋转后得到 相对坐标）
		var p_yy;					//轨道Y
		var rotate;					//整体旋转角度
			
		for(var time=1; time < data['movementTime']; time++){
			
			// > 速度
			distance = null;
			p.index = obj_index;
			p.time  = time;
			p.ran   = randomSpeed;
			p.num   = data['movementNum'];
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
			DrillUp.drill_COBa_checkValue( p, distance );	//（校验）
			
			
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
			xx = orgX + p_xx;
			yy = orgY + p_yy;
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
			
			// > 时间冗余（走完全程后，结束弹道移动）
			if( time_overflow == true ){
				data['movementTime'] = obj_data['_drill_COBa_x'].length;
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
	
	
	/*-----------------两点式------------------*/
	/*
		【匀速移动/增减速移动/弹性移动 经过了反复验证，公式以0,0起点为准，向终点值靠近，差值可为负数。】
		（这里的公式默认递增，你可以反转，变为递减。）
		（不固定开始点也不固定结束点，由于子插件进行了取反，两头只要固定一处，就会出现各种各样的问题，所以不加了）
	*/
	else if( data['movementMode'] == "两点式"){		
	
		// > 变量定义（写这里是为优化性能，减少反复创建次数）
		var xx;					//相对坐标X
		var yy;					//相对坐标Y
		var dx;					//距离差值x
		var dy;					//距离差值y
		var dt;					//时长
		
		for(var time = 0; time <= data['movementTime']; time++){
			// > 速度
			xx = 0;
			yy = 0;
			
			if( data['twoPointType'] == "不移动"){
				xx = 0;								//（一直待在原位置）
				yy = 0;
			}
			
			else if( data['twoPointType'] == "瞬间移动"){
				xx = data['twoPointDifferenceX'];	//（一直待在终点）
				yy = data['twoPointDifferenceY'];
			}
			
			else if( data['twoPointType'] == "匀速移动"){	
				dx = data['twoPointDifferenceX'];
				dy = data['twoPointDifferenceY'];
				dt = data['movementTime'];
				
				xx = time * dx / dt;
				yy = time * dy / dt;
			}
			
			else if( data['twoPointType'] == "增减速移动"){	
				dx = data['twoPointDifferenceX'];
				dy = data['twoPointDifferenceY'];
				dt = data['movementTime'];
				
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
			
			else if( data['twoPointType'] == "弹性移动"){
				dx = data['twoPointDifferenceX'];
				dy = data['twoPointDifferenceY'];
				dt = data['movementTime'];
				
				var ax = 2 * dx / dt / dt;		//r = 1/2*a*t^2
				var ay = 2 * dy / dt / dt;		//（匀减速移动到目标点）
				var c_time = dt - time;
				xx = 0.5 * ax * dt * dt - 0.5 * ax * c_time * c_time ;
				yy = 0.5 * ay * dt * dt - 0.5 * ay * c_time * c_time ;
			}
			
			else if( data['twoPointType'] == "抛物线移动"){
				dx = data['twoPointDifferenceX'];
				dy = data['twoPointDifferenceY'];
				dt = data['movementTime'];
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
			
			xx = orgX + xx;
			yy = orgY + yy;
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
	
	// > 延迟（开始前延迟时间）
	for(var i = 0; i < data['movementDelay']; i++){
		obj_data['_drill_COBa_x'].unshift( obj_data['_drill_COBa_x'][0] );
		obj_data['_drill_COBa_y'].unshift( obj_data['_drill_COBa_y'][0] );
	}
	// > 延迟（到终点后延迟时间）
	for(var i = 0; i < data['movementEndDelay']; i++){
		obj_data['_drill_COBa_x'].push( obj_data['_drill_COBa_x'][ obj_data['_drill_COBa_x'].length-1 ] );
		obj_data['_drill_COBa_y'].push( obj_data['_drill_COBa_y'][ obj_data['_drill_COBa_y'].length-1 ] );
	}
	// > 延迟（ID依次延迟时间）
	if( data['movementOrderDelay'] > 0 ){
		var start_num = obj_index;
		var end_num = data['movementNum']-1 - obj_index;
		var start_delay = start_num * data['movementOrderDelay'];
		var end_delay = end_num * data['movementOrderDelay'];
		for(var i = 0; i < start_delay; i++){
			obj_data['_drill_COBa_x'].unshift( obj_data['_drill_COBa_x'][0] );
			obj_data['_drill_COBa_y'].unshift( obj_data['_drill_COBa_y'][0] );
		}
		for(var i = 0; i < end_delay; i++){
			obj_data['_drill_COBa_x'].push( obj_data['_drill_COBa_x'][ obj_data['_drill_COBa_x'].length-1 ] );
			obj_data['_drill_COBa_y'].push( obj_data['_drill_COBa_y'][ obj_data['_drill_COBa_y'].length-1 ] );
		}
	}else if( data['movementOrderDelay'] < 0 ){
		var start_num = data['movementNum']-1 - obj_index;
		var end_num = obj_index;
		var start_delay = start_num * Math.abs( data['movementOrderDelay'] );
		var end_delay = end_num * Math.abs( data['movementOrderDelay'] );
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
// * 公式 - 方向计算公式(方向类型) - 固定方向
//==============================
Game_Temp.prototype.drill_COBa_directionFunction_1 = function( p ){
	var result =  p.d0;				//（固定方向）
	return result;
}
//==============================
// * 公式 - 方向计算公式(方向类型) - 四周扩散(线性)
//==============================
Game_Temp.prototype.drill_COBa_directionFunction_2 = function( p ){
	var result =  p.d0 + 360 * p.index / p.num;	//（在一个圆圈里，线性放入固定数量的粒子）		
	return result;
}
//==============================
// * 公式 - 方向计算公式(方向类型) - 四周扩散(随机)
//==============================
Game_Temp.prototype.drill_COBa_directionFunction_3 = function( p ){
	var result =  p.d0 + 360 * p.ran;			
	return result;
}
//==============================
// * 公式 - 方向计算公式(方向类型) - 四周扩散(抖动)
//==============================
Game_Temp.prototype.drill_COBa_directionFunction_4 = function( p ){
	var result =  p.d0 + 360 * p.ran + 30 * Math.sin(p.time);
	return result;											
}
//==============================
// * 公式 - 方向计算公式(方向类型) - 扇形范围方向(线性)
//==============================
Game_Temp.prototype.drill_COBa_directionFunction_5 = function( p ){		
	var result =  p.sFace;		
	if( p.num > 1 ){
		result =  p.sFace + p.sDegree * p.index / (p.num - 1) - p.sDegree/2;
	}else{
		result =  p.sFace;
	}	
	return result;
}
//==============================
// * 公式 - 方向计算公式(方向类型) - 扇形范围方向(随机)
//==============================
Game_Temp.prototype.drill_COBa_directionFunction_6 = function( p ){		
	var result =  p.sFace + p.sDegree * (p.ran - 0.5);		//（根据p.sDegree，算出波动范围方向，与朝向相加即可）
	return result;
}

//==============================
// * 公式 - 路程计算公式(速度类型) - 只初速度
//==============================
Game_Temp.prototype.drill_COBa_speedFunction_1 = function( p ){
	var result =  p.v0 * p.time;				//（速度x时间）
	return result;
}
//==============================
// * 公式 - 路程计算公式(速度类型) - 初速度+波动量
//==============================
Game_Temp.prototype.drill_COBa_speedFunction_2 = function( p ){
	var v_ran = p.wave * (p.ran - 0.5);			//（根据波动量，算出波动速度）
	var result =  (p.v0 + v_ran) * p.time;		//（随机速度x时间）
	return result;
}
//==============================
// * 公式 - 路程计算公式(速度类型) - 初速度+波动量+加速度
//==============================
Game_Temp.prototype.drill_COBa_speedFunction_3 = function( p ){
	var v_ran = p.wave * (p.ran - 0.5);			//（根据波动量，算出波动速度）
	var result =  (p.v0 + v_ran) * p.time + 0.5 * p.a *p.time*p.time;		//（加速度公式）	
	return result;
}
//==============================
// * 公式 - 路程计算公式(速度类型) - 初速度+波动量+加速度+最大最小
//==============================
Game_Temp.prototype.drill_COBa_speedFunction_4 = function( p ){
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
// ** 通用弹道【一维数组】
//=============================================================================
//==============================
// * 通用弹道 - 初始化（私有）
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsCommon = function( data ){
	var result = {};
	
	// > 通用基础参数（common）
	result['commonNum'] = data['commonNum'] || 1;						//通用 - 子弹数量
	result['commonTime'] = data['commonTime'] || 1;                 	//通用 - 时长
	result['commonDelay'] = data['commonDelay'] || 0;               	//通用 - 开始前延迟时间
	result['commonEndDelay'] = data['commonEndDelay'] || 0;         	//通用 - 到终点后延迟时间
	result['commonOrderDelay'] = data['commonOrderDelay'] || 0;         //通用 - ID依次延迟时间
	result['commonMode'] = data['commonMode'] || "目标值模式";      	//通用 - 通用模式（时间公式模式/时间锚点模式/目标值模式）
	
	//   ■ 时间公式（o-t图）
	if( result['commonMode'] == "时间公式模式" ){
		result['otFormula'] = data['otFormula'] || "return 0";			//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	else if( result['commonMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = data['anchorPointTank'] || [];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	else if( result['commonMode'] == "目标值模式" ){
		result['targetType'] = data['targetType'] || "瞬间变化";		//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = data['targetDifference'] || 0;     //目标值 - 距离差值（终点值减起点值）
	}
	
	
	// > 随机因子（RandomFactor）
	result['randomFactor'] = data['randomFactor'] || Math.random();
	
	
	// > 随机迭代次数（RandomIteration）
	if( data['randomIterationList'] != undefined ){
		result['randomIterationList'] = data['randomIterationList'];	//（这里直接用指针，迭代次数变化，推演跟着变）
	}else{
		result['randomIterationList'] = [];								//通用 - 随机迭代次数（基于随机因子，反复形成新的随机数）
		for( var i=0; i < result['movementNum']; i++ ){
			result['randomIterationList'].push( 1 );
		}
	}
	
	
	this._drill_COBa_commonData = result;
	this._drill_COBa_commonObj = null;
	return result;
}
//==============================
// * 通用弹道 - 获取弹道总时间（私有）
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsCommon_TotalTime_Private = function(){
	var data = this._drill_COBa_commonData;
	var result = data['commonTime'];
	result += data['commonDelay'];
	result += data['commonEndDelay'];
	result += data['commonOrderDelay'] * (data['commonNum']-1);
	return result;
}
//==============================
// * 通用弹道 - 预推演（私有）
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsCommon = function( obj_data, obj_index, orgCommon ){
	var data = this._drill_COBa_commonData;
	var obj = this._drill_COBa_commonObj;
	
	// > 初始化校验
	if( isNaN( obj_index ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到obj_index出现NaN值，请及时检查你的函数。"
		);
	}
	if( isNaN( orgCommon ) == true && DrillUp._drill_COBa_checkOn == true ){
		DrillUp._drill_COBa_checkOn = false;
		alert(
			"【Drill_CoreOfBallistics.js 系统 - 弹道核心】"+
			"\n检测到orgCommon出现NaN值，请及时检查你的函数。"
		);
	}
	obj_data['_drill_COBa_common'] = [];
	
	
	// > 预推演的obj
	if( this._drill_COBa_commonObj == null ){
		this._drill_COBa_commonObj = {};
		obj = this._drill_COBa_commonObj;
		//   公式obj
		if( data['commonMode'] == "时间公式模式"){
			eval("obj['otFunction'] = function( p ){ "+data['otFormula']+" }" );
		}
		if( data['commonMode'] == "时间锚点模式" ){		
			//（无公式）
		}
		if( data['commonMode'] == "目标值模式" ){		
			//（无公式）
		}
	}
	
	
	/*-----------------时间公式模式------------------*/
	if( data['commonMode'] == "时间公式模式"){
		
		// > 起点值
		obj_data['_drill_COBa_common'].push( orgCommon );
		
		// > 随机值（来自随机因子）
		var randomValue = DrillUp.drill_COBa_getRandomInIteration( data['randomFactor'], obj_index );	//随机因子
		var randomValue_i = data['randomIterationList'][ obj_index ];									//随机迭代次数
		if( randomValue_i == undefined ){ randomValue_i = data['randomIterationList'][0]; }
		randomValue = DrillUp.drill_COBa_getRandomInIteration( randomValue, data['movementNum']*randomValue_i +obj_index );
		
		// > 变量定义（写这里是为优化性能，减少反复创建次数）
		var p = {};				//参数容器
		var cc;					//相对值
		
		for(var time=1; time < data['commonTime']; time++){
			
			p.index = obj_index;				
			p.time  = time;
			p.ran   = randomValue;
			p.num   = data['commonNum'];
			
			cc = obj['otFunction'].call(this, p );	
			DrillUp.drill_COBa_checkValue( p, cc );		//（校验）
		
			cc = orgCommon + cc;
			obj_data['_drill_COBa_common'].push(cc);
		}
	}
	
	
	/*-----------------时间锚点模式------------------*/
	else if( data['commonMode'] == "时间锚点模式"){
		
		// > 起点值
		obj_data['_drill_COBa_common'].push( orgCommon );
		
		// > 时间锚点初始化
		if( data['anchorPointTank'].length < 2 ){	//（至少要两个点才能计算）
			data['anchorPointTank'] = [];
			data['anchorPointTank'].push( {'t':0,'o':0} );
			data['anchorPointTank'].push( {'t':100,'o':255} );
		}
		
		// > 开始找点（这里默认 data['anchorPointTank'] 已根据 t 排序 ）
		for(var time = 1; time <= data['commonTime']; time++){
			var time_per = time * 100 / data['commonTime'];	//（时间百分比） 
			
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
			
			// > 计算通用落点
			var p_start = data['anchorPointTank'][start_index];
			var p_end = data['anchorPointTank'][end_index];
			var d_time = p_end['t'] - p_start['t'];
			var cur_time = time_per - p_start['t'];
			var cc = cur_time / d_time * ( p_end['o'] - p_start['o'] ) + p_start['o'];
			obj_data['_drill_COBa_common'].push( cc );
		}
		
	}


	/*-----------------目标值模式------------------*/
	else if( data['commonMode'] == "目标值模式"){
	
		// > 变量定义（写这里是为优化性能，减少反复创建次数）
		var cc;					//相对值
		var dC;					//距离差值
		var dt;					//时长
		
		for(var time = 0; time <= data['commonTime']; time++){
			// > 通用
			cc = 0;
			
			if( data['targetType'] == "瞬间变化"){
				cc = data['targetDifference'];
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
				
				var ac = 2 * dC / dt / dt;		//（匀减速移动到目标点）
				var c_time = dt - time;
				cc = 0.5 * ac * dt * dt - 0.5 * ac * c_time * c_time ;
			}
			
			cc = orgCommon + cc;
			obj_data['_drill_COBa_common'].push(cc);
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
// ** 透明度弹道【一维数组】
//=============================================================================
//==============================
// * 透明度弹道 - 初始化数据 默认值（私有）
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsOpacity_Private = function( data ){
	// （这里与通用弹道的数据有交叉，但不影响整体使用。正常当做 透明度弹道数据 来存储/处理即可。）
	var result = {};
	
	// > 透明度基础参数（opacity）
	result['opacityNum'] = data['opacityNum'] || 1;					//透明度 - 子弹数量
	result['opacityTime'] = data['opacityTime'] || 1;               //透明度 - 时长
	result['opacityDelay'] = data['opacityDelay'] || 0;             //透明度 - 开始前延迟时间
	result['opacityEndDelay'] = data['opacityEndDelay'] || 0;       //透明度 - 到终点后延迟时间
	result['opacityOrderDelay'] = data['opacityOrderDelay'] || 0;	//透明度 - ID依次延迟时间
	result['opacityMode'] = data['opacityMode'] || "目标值模式";    //透明度 - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['opacityMode'] == "时间公式模式" ){
		result['otFormula'] = data['otFormula'] || "return 0";			//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['opacityMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = data['anchorPointTank'] || [];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['opacityMode'] == "目标值模式" ){
		result['targetType'] = data['targetType'] || "瞬间变化";		//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = data['targetDifference'] || 0;     //目标值 - 距离差值（终点值减起点值）
	}
	
	
	// > 按通用弹道规则设置（私有）
	result['commonNum'] = result['opacityNum'];
	result['commonTime'] = result['opacityTime'];
	result['commonDelay'] = result['opacityDelay'];
	result['commonEndDelay'] = result['opacityEndDelay'];
	result['commonOrderDelay'] = result['opacityOrderDelay'];
	result['commonMode'] = result['opacityMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 透明度弹道 - 预推演（私有）
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsOpacity_Private = function( obj_data, obj_index, orgOpacity ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, orgOpacity );		//（按通用弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_opacity'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}



//=============================================================================
// ** 缩放弹道x2【一维数组】
//=============================================================================
//==============================
// * 缩放X弹道 - 初始化数据 默认值（私有）
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsScaleX_Private = function( data ){
	// （这里与通用弹道的数据有交叉，但不影响整体使用。正常当做 透明度弹道数据 来存储/处理即可。）
	var result = {};
	
	// > 缩放X基础参数（scaleX）
	result['scaleXNum'] = data['scaleXNum'] || 1;					//缩放X - 子弹数量
	result['scaleXTime'] = data['scaleXTime'] || 1;                 //缩放X - 时长
	result['scaleXDelay'] = data['scaleXDelay'] || 0;               //缩放X - 开始前延迟时间
	result['scaleXEndDelay'] = data['scaleXEndDelay'] || 0;         //缩放X - 到终点后延迟时间
	result['scaleXOrderDelay'] = data['scaleXOrderDelay'] || 0;		//缩放X - ID依次延迟时间
	result['scaleXMode'] = data['scaleXMode'] || "目标值模式";      //缩放X - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['scaleXMode'] == "时间公式模式" ){
		result['otFormula'] = data['otFormula'] || "return 0";			//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['scaleXMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = data['anchorPointTank'] || [];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['scaleXMode'] == "目标值模式" ){
		result['targetType'] = data['targetType'] || "瞬间变化";		//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = data['targetDifference'] || 0;     //目标值 - 距离差值（终点值减起点值）
	}
	
	
	// > 按通用弹道规则设置（私有）
	result['commonNum'] = result['scaleXNum'];
	result['commonTime'] = result['scaleXTime'];
	result['commonDelay'] = result['scaleXDelay'];
	result['commonEndDelay'] = result['scaleXEndDelay'];
	result['commonOrderDelay'] = result['scaleXOrderDelay'];
	result['commonMode'] = result['scaleXMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 缩放X弹道 - 预推演（私有）
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsScaleX_Private = function( obj_data, obj_index, orgScaleX ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, orgScaleX );		//（按通用弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_scaleX'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}
//==============================
// * 缩放Y弹道 - 初始化数据 默认值（私有）
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsScaleY_Private = function( data ){
	// （这里与通用弹道的数据有交叉，但不影响整体使用。正常当做 透明度弹道数据 来存储/处理即可。）
	var result = {};
	
	// > 缩放Y基础参数（scaleY）
	result['scaleYNum'] = data['scaleYNum'] || 1;					//缩放Y - 子弹数量
	result['scaleYTime'] = data['scaleYTime'] || 1;                 //缩放Y - 时长
	result['scaleYDelay'] = data['scaleYDelay'] || 0;               //缩放Y - 开始前延迟时间
	result['scaleYEndDelay'] = data['scaleYEndDelay'] || 0;         //缩放Y - 到终点后延迟时间
	result['scaleYOrderDelay'] = data['scaleYOrderDelay'] || 0;		//缩放Y - ID依次延迟时间
	result['scaleYMode'] = data['scaleYMode'] || "目标值模式";      //缩放Y - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['scaleYMode'] == "时间公式模式" ){
		result['otFormula'] = data['otFormula'] || "return 0";			//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['scaleYMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = data['anchorPointTank'] || [];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['scaleYMode'] == "目标值模式" ){
		result['targetType'] = data['targetType'] || "瞬间变化";		//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = data['targetDifference'] || 0;     //目标值 - 距离差值（终点值减起点值）
	}
	
	
	// > 按通用弹道规则设置（私有）
	result['commonNum'] = result['scaleYNum'];
	result['commonTime'] = result['scaleYTime'];
	result['commonDelay'] = result['scaleYDelay'];
	result['commonEndDelay'] = result['scaleYEndDelay'];
	result['commonOrderDelay'] = result['scaleYOrderDelay'];
	result['commonMode'] = result['scaleYMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 缩放Y弹道 - 预推演（私有）
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsScaleY_Private = function( obj_data, obj_index, orgScaleY ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, orgScaleY );		//（按通用弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_scaleY'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}



//=============================================================================
// ** 旋转角弹道【一维数组】
//=============================================================================
//==============================
// * 旋转角弹道 - 初始化数据 默认值（私有）
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsRotate_Private = function( data ){
	// （这里与通用弹道的数据有交叉，但不影响整体使用。正常当做 透明度弹道数据 来存储/处理即可。）
	var result = {};
	
	// > 旋转角基础参数（rotate）
	result['rotateNum'] = data['rotateNum'] || 1;					//旋转角 - 子弹数量
	result['rotateTime'] = data['rotateTime'] || 1;                 //旋转角 - 时长
	result['rotateDelay'] = data['rotateDelay'] || 0;               //旋转角 - 开始前延迟时间
	result['rotateEndDelay'] = data['rotateEndDelay'] || 0;         //旋转角 - 到终点后延迟时间
	result['rotateOrderDelay'] = data['rotateOrderDelay'] || 0;		//旋转角 - ID依次延迟时间
	result['rotateMode'] = data['rotateMode'] || "目标值模式";      //旋转角 - 透明度模式（时间公式模式/时间锚点模式/目标值模式）
	
	
	//   ■ 时间公式（o-t图）
	if( result['rotateMode'] == "时间公式模式" ){
		result['otFormula'] = data['otFormula'] || "return 0";			//时间公式 - 公式值
	}
	
	//   ■ 时间锚点（anchor）		
	if( result['rotateMode'] == "时间锚点模式" ){
		result['anchorPointTank'] = data['anchorPointTank'] || [];		//时间锚点 - 锚点列表
	}
	
	//   ■ 目标值（target）		
	if( result['rotateMode'] == "目标值模式" ){
		result['targetType'] = data['targetType'] || "瞬间变化";		//目标值 - 类型（瞬间变化/匀速变化/增减速变化/弹性变化）
		result['targetDifference'] = data['targetDifference'] || 0;     //目标值 - 距离差值（终点值减起点值）
	}
	
	
	// > 按通用弹道规则设置（私有）
	result['commonNum'] = result['rotateNum'];
	result['commonTime'] = result['rotateTime'];
	result['commonDelay'] = result['rotateDelay'];
	result['commonEndDelay'] = result['rotateEndDelay'];
	result['commonOrderDelay'] = result['rotateOrderDelay'];
	result['commonMode'] = result['rotateMode'];
	return this.drill_COBa_setBallisticsCommon( result );	
}
//==============================
// * 旋转角弹道 - 预推演（私有）
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsRotate_Private = function( obj_data, obj_index, orgRotate ){
	this.drill_COBa_preBallisticsCommon( obj_data, obj_index, orgRotate );		//（按通用弹道规则推演）
	
	// > 指针结果交换
	obj_data['_drill_COBa_rotate'] = obj_data['_drill_COBa_common'];
	obj_data['_drill_COBa_common'] = null;
}

