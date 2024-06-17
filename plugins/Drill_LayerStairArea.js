//=============================================================================
// Drill_LayerStairArea.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        图块 - 侧边阶梯区域
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_LayerStairArea +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以画图块R区域，实现 侧边阶梯▂▅▇ 和 侧边阶梯▇▅▂ 效果。
 * ★★必须放在 物体-事件跳跃 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 2.更多详细的介绍，去看看 "26.图块 > 关于侧边阶梯区域.docx"。
 * 3.插件需要将指定 地形标志 或 图块R区域 设为侧边阶梯，
 *   去看看 "26.图块 > 关于插件与图块R占用说明.xlsx"
 * 细节：
 *   (1.阶梯▂▅▇指从左往右上楼的阶梯，
 *      阶梯▇▅▂指从右往左上楼的阶梯，
 *      阶梯能够给玩家"高度感"的错觉，而实际上整个游戏仍然为平面图块。
 *   (2.阶梯的R图块可以绘制多阶、并列阶梯、相连阶梯。
 *      具体绘制方法和规则去看看文档中 R图块规则 。
 *   (3.阶梯上禁止跳跃；
 *      阶梯区域的上边沿和下边沿是阻塞的，只能左右进入；
 *      飞行的物体（在人物上方）不受阶梯影响。
 *   (4.旧版本的阶梯使用 鼠标操作 自动寻路阶梯时，非常笨拙，
 *      此bug已经被修复。
 * 组合：
 *   (1.阶梯上可以推箱子、放炸弹。
 *   (2.玩家可以举着花盆过阶梯。
 *   (3.阶梯区域可以与光滑地面的功能重叠，形成滑坡。
 * 设计：
 *   (1.侧边阶梯的应用场景不多，很少作为解谜的互动对象，多以室内装饰为主。
 *      一般作为细节装饰物比较合适，比如皇宫、神庙、地牢的侧边阶梯。
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
 * 时间复杂度： o(n^3)*o(图块特征获取) 每帧
 * 测试方法1：  去特效管理层，没有事件踩在阶梯上，测试。
 * 测试结果1：  200个事件的地图中，消耗为：【8.17ms】
 *              100个事件的地图中，消耗为：【7.92ms】
 *               50个事件的地图中，消耗为：【6.60ms】
 * 测试方法2：  在阶梯管理层放置10个事件在阶梯移动测试。
 * 测试结果2：  200个事件的地图中，消耗为：【61.49ms】
 *              100个事件的地图中，消耗为：【43.00ms】
 *               50个事件的地图中，消耗为：【28.80ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件旧版本存在事件过多造成阶梯计算量巨大的问题，该版本已经
 *   优化了此问题，虽然计算量降低了，但是如果事件仍然很多，消耗
 *   一样会上涨。
 * 3.插件在进入地图时将图块特征数据全部记录，所以只在获取数据时
 *   产生消耗，获取的次数与事件数量有关。总体消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了上台阶后立即跳跃会错位的bug。
 * 修复了鼠标操作极其不友好的问题。
 * [v1.2]
 * 修复了在阶梯区域中切换地图时，高度未恢复的bug。
 * 修复了瞬移在阶梯区域时，高度未跟上变化的bug。
 * [v1.3]
 * 修改了插件分类。
 * [v1.4]
 * 大幅度改造了底层结构，防止出现乱移动的高度错位问题。
 * 修复了鼠标点击某些位置时，玩家死循环移动问题。
 * [v1.5]
 * 兼容了碰撞体位置叠加的功能。
 * [v1.6]
 * 修复了物体朝上朝下却左右走楼梯的bug。
 * 
 * 
 * 
 * @param 阶梯▂▅▇区域(从左往右上楼)
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，地图中设置的R区域将会变为阶梯区域（从左往右）。
 * @default ["14"]
 *
 * @param 阶梯▇▅▂区域(从右往左上楼)
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，地图中设置的R区域将会变为阶梯区域（从右往左）。
 * @default ["15"]
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LSA（Layer_Stair_Area）
//		临时全局变量	DrillUp.g_LSA_xxx
//		临时局部变量	this._drill_LSA_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.canPass（半覆盖）
//						Game_CharacterBase.prototype.moveStraight（半覆盖）
//						Game_Player.prototype.checkEventTriggerThere（半覆盖）
//						Game_Character.prototype.findDirectionTo（半覆盖）
//						（部分看起来像半覆盖的函数，实际上为 附加条件阻塞/执行 的功能）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(图块特征获取) 每帧
//		★性能测试因素	阶梯管理层
//		★性能测试消耗	2023-6-23：
//							》28.8ms（drill_LSA_updateStairHeight）43.0ms（drill_LSA_getStairHeight）6.6ms（没事件踩在阶梯上，drill_LSA_getStairHeight）
//		★最坏情况		事件越多，情况越坏。
//		★备注			2023-6-23：
//							》改成稀疏矩阵取点后，似乎消耗并没下降多少，事件对图块的判定联系还是太多了。
//		
//		★优化记录		2023-6-23：
//							这次把插件大部分重写了，将写死的图块移动分成：
//							阶梯图块矩阵、行走图高度、可通行控制、移动控制 四个主要大块。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆阶梯图块矩阵
//				->全图是否有阶梯（开放函数）
//				->是否为阶梯区域（开放函数）
//				->是否为阶梯▂▅▇（开放函数）
//				->是否为阶梯▇▅▂（开放函数）
//				->获取阶梯阶数（开放函数）
//				->是否为左边缘（开放函数）
//				->是否为右边缘（开放函数）
//				->是否为上边缘（开放函数）
//				->是否为下边缘（开放函数）
//			->☆阶梯值
//				> 第1位 阶梯类型
//				> 第2位 阶梯阶数
//				> 第3位 阶梯索引
//				> 第4位 左右边缘
//				> 第5位 上下边缘
//			->☆DEBUG阶梯值
//				->显示/隐藏图块阶梯值
//				->开启/关闭阶梯边缘修正
//				->开启/关闭阶梯阻塞
//			->稀疏矩阵【Drill_LSA_SparseMatrix】
//			
//			->☆行走图高度
//				->高度值
//				->获取指定位置的高度
//					->整数边角点
//					->阶梯边缘修正
//						> 左边缘▂▅▇ （▂▂▂▅▇）
//						> ▂▅▇右边缘 （▂▅▇▇▇）
//						> 左边缘▇▅▂ （▇▇▇▅▂）
//						> ▇▅▂右边缘 （▇▅▂▂▂）
//						> ▇▅▂连接的边缘
//					->已知三点平面求平面上第四点（求Z）
//				->条件
//					->没有阶梯区域，跳出
//					->飞行物体，跳出
//			->☆数据最终变换值
//			
//			->☆可通行控制
//				->条件
//					->没有阶梯区域，跳出
//					->飞行物体，跳出
//					->阶梯阻塞 DEBUG
//				->阶梯下边缘 双向阻塞
//				->阶梯▂▅▇上边缘 单向阻塞
//				->阶梯▇▅▂上边缘 单向阻塞
//				->阶梯死角▂▅▇<- 双向阻塞
//				->阶梯死角->▇▅▂ 双向阻塞
//				->阶梯▂▅▇最高顶角 单向阻塞（左和上）
//				->阶梯▇▅▂最高顶角 单向阻塞（右和上）
//			->☆事件触发控制
//				->对角触发
//					> 阶梯 ▂▅▇<- 从东边进入
//					> 阶梯 <-▇▅▂ 向西离开
//					> 阶梯 ▂▅▇-> 向东离开
//					> 阶梯 ->▇▅▂ 从西边进入
//			->☆移动控制
//				->强转移动
//					> 阶梯 ▂▅▇-> 向东离开
//					> 阶梯 ▂▅▇<- 从东边进入
//					> 阶梯 <-▇▅▂ 向西离开
//					> 阶梯 ->▇▅▂ 从西边进入
//				->条件
//					->没有阶梯区域，跳出
//					->飞行物体，跳出
//				->对角移动
//					->强制左右朝向移动
//					->阶梯▂▅▇ - 穿透斜向阻碍
//					->阶梯▇▅▂ - 穿透斜向阻碍
//				->自动寻迹（鼠标用）
//					->最高顶角
//					->最高顶角上面的图块+且不可通行时
//			->☆跳跃控制
//				->禁跳
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			26.图块 > 阶梯图块阻塞原理.png
//			26.图块 > 阶梯行走图高度原理.png
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.【修正区域判定是个坑，不要修正，就按原来的 this._x 和 this._y 判定】。
//			2. 2023-6-22：
//				这个插件几乎被我重写了，将里面纠缠在一起的地形关系，分离成了专门根据位置而改变高度的3D网。
//				阶梯数据获取也进行了结构简化，比较清晰可见。
//
//		★其它说明细节：
//			1.此插件的常用词为：Stair。
//			  功能复制时，注意换为 LSA、阶梯、Stair 字段。
//			2.本来以为可以绕开对角移动，没想到最后还是基于对角移动。
//			  物体的本身不在阶梯区域，而右下角是 从右往左的阶梯区域 时，右移和右下角移动 是相等的。
//
//		★存在的问题：
//			1.问题：画了1阶的多个连接的▇▅▂楼梯后，上下移动会出现玩家一个凸起的抖动。（2024-5-30）
//			  解决：【已解决】，问题出现在 "阶梯边缘修正 - ▇▅▂连接的边缘"，原因是if的返回函数写反了。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_LSA_PluginTip_curName = "Drill_LayerStairArea.js 图块-侧边阶梯区域";
	DrillUp.g_LSA_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LSA_getPluginTip_NeedUpdate_COEF = function(){
		return "【" + DrillUp.g_LSA_PluginTip_curName + "】\n行走图优化核心插件版本过低，你需要更新 核心插件 至少v1.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerStairArea = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerStairArea');
	
	
	/*-----------------杂项------------------*/	
	if( DrillUp.parameters["阶梯▂▅▇区域(从左往右上楼)"] != undefined &&
		DrillUp.parameters["阶梯▂▅▇区域(从左往右上楼)"] != "" ){
		DrillUp.g_LSA_regionTank_LR = JSON.parse( DrillUp.parameters["阶梯▂▅▇区域(从左往右上楼)"] || [] );
	}else{
		DrillUp.g_LSA_regionTank_LR = [];
	}
	if( DrillUp.parameters["阶梯▇▅▂区域(从右往左上楼)"] != undefined &&
		DrillUp.parameters["阶梯▇▅▂区域(从右往左上楼)"] != "" ){
		DrillUp.g_LSA_regionTank_RL = JSON.parse( DrillUp.parameters["阶梯▇▅▂区域(从右往左上楼)"] || [] );
	}else{
		DrillUp.g_LSA_regionTank_RL = [];
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_LSA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LSA_pluginCommand.call(this, command, args);
	if( command === ">侧边阶梯区域" ){
		
		if(args.length == 2){
			var temp1 = String(args[1]);
			if( temp1 == "DEBUG-显示图块阶梯值" ){
				$gameTemp._drill_LSA_debug_showStairId = true;
			}
			if( temp1 == "DEBUG-隐藏图块阶梯值" ){
				$gameTemp._drill_LSA_debug_clearStairId = true;
			}
			if( temp1 == "DEBUG-关闭阶梯边缘修正" ){
				$gameTemp._drill_LSA_debug_noStairFix = true;
			}
			if( temp1 == "DEBUG-开启阶梯边缘修正" ){
				$gameTemp._drill_LSA_debug_noStairFix = false;
			}
			if( temp1 == "DEBUG-关闭阶梯阻塞" ){
				$gameTemp._drill_LSA_debug_noStairBlock = true;
			}
			if( temp1 == "DEBUG-开启阶梯阻塞" ){
				$gameTemp._drill_LSA_debug_noStairBlock = false;
			}
		}
	}
}
	
	
//=============================================================================
// ** ☆阶梯图块矩阵
//
//			说明：	> 此模块用于提供 图块的开放函数 ，外部插件也可以调用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 阶梯图块矩阵 - 全图是否有阶梯（开放函数）
//==============================
Game_Map.prototype.drill_LSA_noStair = function(){
	return this._drill_LSA_sparseMatrix.drill_isEmptyMatrix();
}
//==============================
// * 阶梯图块矩阵 - 是否为阶梯区域（开放函数）
//==============================
Game_Map.prototype.drill_LSA_isStair = function( x, y ){
	if( this.drill_LSA_getStairId( x, y ) == undefined ){
		return false;
	}else{
		return true;
	}
}
//==============================
// * 阶梯图块矩阵 - 是否为阶梯▂▅▇（开放函数）
//==============================
Game_Map.prototype.drill_LSA_isStairLR = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 1 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 阶梯图块矩阵 - 是否为阶梯▇▅▂（开放函数）
//==============================
Game_Map.prototype.drill_LSA_isStairRL = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 2 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 阶梯图块矩阵 - 获取阶梯阶数（开放函数）
//==============================
Game_Map.prototype.drill_LSA_getStairLength = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return 0; }
	return Math.floor(value*0.1) %10;							//（第2位）
}
//==============================
// * 阶梯图块矩阵 - 是否为左边缘（开放函数）
//==============================
Game_Map.prototype.drill_LSA_isStairSideLeft = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return false; }
	if( Math.floor(value*0.001) % 10 == 1 ){ return true; }		//（第4位）
	if( Math.floor(value*0.001) % 10 == 3 ){ return true; }
	return false;
}
//==============================
// * 阶梯图块矩阵 - 是否为右边缘（开放函数）
//==============================
Game_Map.prototype.drill_LSA_isStairSideRight = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return false; }
	if( Math.floor(value*0.001) % 10 == 2 ){ return true; }		//（第4位）
	if( Math.floor(value*0.001) % 10 == 3 ){ return true; }
	return false;
}
//==============================
// * 阶梯图块矩阵 - 是否为上边缘（开放函数）
//==============================
Game_Map.prototype.drill_LSA_isStairSideUp = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return false; }
	if( Math.floor(value*0.0001) % 10 == 1 ){ return true; }	//（第5位）
	if( Math.floor(value*0.0001) % 10 == 3 ){ return true; }
	return false;
}
//==============================
// * 阶梯图块矩阵 - 是否为下边缘（开放函数）
//==============================
Game_Map.prototype.drill_LSA_isStairSideDown = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return false; }
	if( Math.floor(value*0.0001) % 10 == 2 ){ return true; }	//（第5位）
	if( Math.floor(value*0.0001) % 10 == 3 ){ return true; }
	return false;
}
	
	
//=============================================================================
// ** ☆阶梯值
//
//			说明：	> 此模块用于对所有阶梯图块进行初始赋值（通过数字位代号，省存储空间）。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 阶梯值 - 初始化绑定
//==============================
var _drill_LSA_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LSA_map_setup.call( this, mapId );
	this.drill_LSA_refreshStairId();
}
//==============================
// * 阶梯值 - 初始化
//
//			说明：	> 直接给所有图块赋值，获取到值后立刻能知道阶梯的特殊属性。
//					  null为非阶梯区域，非null为阶梯区域。
//					  图块赋值：	00000000 值
//									98654321 位
//					  第1位 阶梯类型 - 1为阶梯▂▅▇，2为阶梯▇▅▂
//					  第2位 阶梯阶数 - 1/2/3/4/5/6/7/8（阶梯最大8图块长）
//					  第3位 阶梯索引 - 从1开始计数（最大为阶数）
//					  第4位 左右边缘 - 0为非边缘，1为左边边缘，2为右边边缘，3为左右两边缘
//					  第5位 上下边缘 - 0为非边缘，1为上边边缘，2为下边边缘，3为上下两边缘
//==============================
Game_Map.prototype.drill_LSA_refreshStairId = function(){
	
	// > 创建矩阵
	this._drill_LSA_sparseMatrix = new Drill_LSA_SparseMatrix();
	
	// > 图块错误，不赋值
	if( this.tileset() == undefined ){ return; }
	
	
	// > 全图块遍历▂▅▇（先y后x，x从左往右遍历）
	for( var x=0; x < this.width(); x++ ){
		for( var y=0; y < this.height(); y++ ){
			
			// > 已赋值的阶梯区域，跳过
			if( this.drill_LSA_isStair( x, y ) ){ continue; }
			
			// > 找到一个 阶梯▂▅▇ R图块
			var cur_regionId = this.regionId( x, y );
			if( DrillUp.g_LSA_regionTank_LR.contains( String(cur_regionId) ) ){
				var cur_xIndex = 0;
				var cur_yIndex = 0;
				
				// > 找到 最左下
				for( var i=0; i < 50; i++ ){	//（阶梯最大50图块宽）
					var xx = x + cur_xIndex;
					var yy = y + cur_yIndex;
					var next_regionId = this.regionId( xx, yy+1 );	//（当前图块的下一个图块判断）
					if( DrillUp.g_LSA_regionTank_LR.contains( String(next_regionId) ) ){
						cur_yIndex += 1;
						continue;
					}
					
					// > 非阶梯图块，跳出
					break;
				}
				
				// > 找到 最右下
				for( var j=0; j < 8; j++ ){		//（阶梯最大8图块长）
					var xx = x + cur_xIndex;
					var yy = y + cur_yIndex;
					var next_regionId = this.regionId( xx+1, yy );	//（当前图块的右一个图块判断）
					if( DrillUp.g_LSA_regionTank_LR.contains( String(next_regionId) ) ){
						cur_xIndex += 1;
						continue;
					}
					
					// > 非阶梯图块，跳出
					break;
				}
				
				// > 矩形批量赋值
				var ww = cur_xIndex+1;
				var hh = cur_yIndex+1;
				for( var i=0; i < ww; i++ ){
					for( var j=0; j < hh; j++ ){
						
						// > 第1位
						var value = 1;
						
						// > 第2位
						value += ww *10;
						
						// > 第3位
						value += (i+1) *100;
						
						// > 第4位
						if( i == 0 ){
							value += 1000;
						}
						if( i == ww -1 ){
							value += 2000;
						}
						
						// > 第5位
						if( j == 0 ){
							value += 10000;
						}
						if( j == hh -1 ){
							value += 20000;
						}
						
						// > 阶梯区域赋值
						this._drill_LSA_sparseMatrix.drill_setValue( x+i, y+j, value );
					}
				}
				
			}
			
		}
	}
	
	
	// > 全图块遍历▇▅▂（先y后x，x从右往左遍历）
	for( var x=this.width()-1; x >= 0; x-- ){
		for( var y=0; y < this.height(); y++ ){
			
			// > 已赋值的阶梯区域，跳过
			if( this.drill_LSA_isStair( x, y ) ){ continue; }
			
			// > 找到一个 阶梯▇▅▂ R图块
			var cur_regionId = this.regionId( x, y );
			if( DrillUp.g_LSA_regionTank_RL.contains( String(cur_regionId) ) ){
				var cur_xIndex = 0;
				var cur_yIndex = 0;
				
				// > 找到 最右下
				for( var i=0; i < 50; i++ ){	//（阶梯最大50图块宽）
					var xx = x + cur_xIndex;
					var yy = y + cur_yIndex;
					var next_regionId = this.regionId( xx, yy+1 );	//（当前图块的下一个图块判断）
					if( DrillUp.g_LSA_regionTank_RL.contains( String(next_regionId) ) ){
						cur_yIndex += 1;
						continue;
					}
					
					// > 非阶梯图块，跳出
					break;
				}
				
				// > 找到 最左下
				for( var j=0; j < 8; j++ ){		//（阶梯最大8图块长）
					var xx = x - cur_xIndex;
					var yy = y + cur_yIndex;
					var next_regionId = this.regionId( xx-1, yy );	//（当前图块的左一个图块判断）
					if( DrillUp.g_LSA_regionTank_RL.contains( String(next_regionId) ) ){
						cur_xIndex += 1;
						continue;
					}
					
					// > 非阶梯图块，跳出
					break;
				}
				
				// > 矩形批量赋值
				var ww = cur_xIndex+1;
				var hh = cur_yIndex+1;
				for( var i=0; i < ww; i++ ){
					for( var j=0; j < hh; j++ ){
						
						// > 第1位
						var value = 2;
						
						// > 第2位
						value += ww *10;
						
						// > 第3位
						value += (i+1) *100;
						
						// > 第4位
						if( i == 0 ){
							value += 2000;	//（由于矩形是反向的，左右边缘要反向）
						}
						if( i == ww -1 ){
							value += 1000;
						}
						
						// > 第5位
						if( j == 0 ){
							value += 10000;
						}
						if( j == hh -1 ){
							value += 20000;
						}
						
						// > 阶梯区域赋值
						this._drill_LSA_sparseMatrix.drill_setValue( x-i, y+j, value );
					}
				}
				
			}
			
		}
	}
}
//==============================
// * 阶梯值 - 获取阶梯值（私有）
//==============================
Game_Map.prototype.drill_LSA_getStairId = function( x, y ){
	return this._drill_LSA_sparseMatrix.drill_getValue( x, y );
}
//==============================
// * 阶梯值 - 获取阶梯编号（私有）
//==============================
Game_Map.prototype.drill_LSA_getStairXIndex = function( x, y ){
	var value = this.drill_LSA_getStairId( x, y );
	if( value == undefined ){ return 0; }
	return Math.floor(value/100) %10;					//（第3位）
}

	
//=============================================================================
// ** ☆DEBUG阶梯值
//
//			说明：	> 此模块用于DEBUG显示图块以及阶梯值。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG - 帧刷新绑定
//==============================
var _drill_LSA_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_LSA_debug_update.call(this);
	this.drill_LSA_updateDebugCreateSprite();
	this.drill_LSA_updateDebugSprite();
}
//==============================
// * DEBUG - 帧刷新
//==============================
Scene_Map.prototype.drill_LSA_updateDebugCreateSprite = function() {
	
	// > DEBUG显示 阶梯值
	if( $gameTemp._drill_LSA_debug_showStairId == true ){
		$gameTemp._drill_LSA_debug_showStairId = false;
		
		// > 清除旧贴图
		this.removeChild( $gameTemp._drill_LSA_debug_sprite );
		$gameTemp._drill_LSA_debug_sprite = null;
		
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		
		var temp_bitmap = new Bitmap( Graphics.boxWidth +tw*2, Graphics.boxHeight +th*2 );
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = temp_bitmap;
		temp_sprite._drill_curTime = 0;
		
		this.addChild( temp_sprite );
		$gameTemp._drill_LSA_debug_sprite = temp_sprite;
	}
	// > DEBUG隐藏 阶梯值
	if( $gameTemp._drill_LSA_debug_clearStairId == true ){
		$gameTemp._drill_LSA_debug_clearStairId = false;
		this.removeChild( $gameTemp._drill_LSA_debug_sprite );
		$gameTemp._drill_LSA_debug_sprite = null;
	}
}
//==============================
// * DEBUG - 帧刷新
//==============================
Scene_Map.prototype.drill_LSA_updateDebugSprite = function() {
	if( $gameTemp._drill_LSA_debug_sprite == null ){ return; }
	var temp_sprite = $gameTemp._drill_LSA_debug_sprite;
	var temp_bitmap = temp_sprite.bitmap;
	var tw = $gameMap.tileWidth();
	var th = $gameMap.tileHeight();
	
	// > 计时器
	temp_sprite._drill_curTime += 1;
	if( temp_sprite._drill_curTime % 2 == 0 ){ return; }	//『Debug减帧』减少绘制次数
	
	// > DEBUG贴图的位置
	var diff_x = Math.floor($gameMap._displayX) - $gameMap._displayX;
	var diff_y = Math.floor($gameMap._displayY) - $gameMap._displayY;
	temp_sprite.x = diff_x *tw;
	temp_sprite.y = diff_y *th;
	
	// > DEBUG画布绘制
	var display_x = Math.floor($gameMap._displayX);
	var display_y = Math.floor($gameMap._displayY);
	temp_bitmap.clear();
	
	var rect_w = Math.ceil( Graphics.boxWidth/tw ) +2;
	var rect_h = Math.ceil( Graphics.boxHeight/th ) +2;
	for( var i=0; i < rect_w; i++ ){
		for( var j=0; j < rect_h; j++ ){
			var xx = display_x + i;
			var yy = display_y + j;
			if( $gameMap.drill_LSA_isStairLR( xx, yy ) ){
				
				// > DEBUG图块绘制▂▅▇
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#ffffff" );	//边框
				temp_bitmap.clearRect( i*tw +2, j*th +2, tw -4, th -4 );
				temp_bitmap.paintOpacity = 100;							//背景颜色
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#ff00ff" );
				
				temp_bitmap.paintOpacity = 255;							//阶梯值
				temp_bitmap.drawText(
					String( $gameMap.drill_LSA_getStairId( xx, yy ) ),
					i*tw, j*th + (xx%2) *th*0.5,
					tw, th*0.5, "center"
				);
			}
			if( $gameMap.drill_LSA_isStairRL( xx, yy ) ){
				
				// > DEBUG图块绘制▇▅▂
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#ffffff" );	//边框
				temp_bitmap.clearRect( i*tw +2, j*th +2, tw -4, th -4 );
				temp_bitmap.paintOpacity = 100;							//背景颜色
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#ffff00" );
				
				temp_bitmap.paintOpacity = 255;							//阶梯值
				temp_bitmap.drawText(
					String( $gameMap.drill_LSA_getStairId( xx, yy ) ),
					i*tw, j*th + (xx%2) *th*0.5,
					tw, th*0.5, "center"
				);
			}
		}
	}
}


//=============================================================================
// ** 稀疏矩阵【Drill_LSA_SparseMatrix】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个稀疏矩阵的数据类。
// **					> 此矩阵适用于 存在大量零值null值 的情况。
// **		子功能：	->稀疏矩阵
// **						->设置值（开放函数）
// **						->获取值（开放函数）
// **						->删除值（开放函数）
// **						->矩阵是否为空（开放函数）
// **		
// **		说明：	> 该类可存储在 $gameMap 中。
//=============================================================================
//==============================
// * 稀疏矩阵 - 定义
//==============================
function Drill_LSA_SparseMatrix(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 稀疏矩阵 - 初始化
//==============================
Drill_LSA_SparseMatrix.prototype.initialize = function(){
	this._drill_matrix = [];
};
//==============================
// * 稀疏矩阵 - 设置值（开放函数）
//==============================
Drill_LSA_SparseMatrix.prototype.drill_setValue = function( x, y, value ){
	
	// > 非空情况
	if( value != undefined ){
		if( this._drill_matrix[x] == undefined ){
			this._drill_matrix[x] = [];
		}
		this._drill_matrix[x][y] = value;
		
	// > 空情况（删除）
	}else{
		
		// > 空数组，不操作
		if( this._drill_matrix[x] == undefined ){ return; }
		
		// > 具体值，置空
		this._drill_matrix[x][y] = value;
		
		// > 判断数组是否已经全空
		if( this.drill_isEmptyArray( this._drill_matrix[x] ) == true ){
			this._drill_matrix[x] = null;
		}
	}
};
//==============================
// * 稀疏矩阵 - 获取值（开放函数）
//==============================
Drill_LSA_SparseMatrix.prototype.drill_getValue = function( x, y ){
	if( this._drill_matrix[x] == undefined ){ return null; }
	return this._drill_matrix[x][y];
};
//==============================
// * 稀疏矩阵 - 删除值（开放函数）
//==============================
Drill_LSA_SparseMatrix.prototype.drill_removeValue = function( x, y, value ){
	this.drill_setValue( x, y, null );
};
//==============================
// * 稀疏矩阵 - 矩阵是否为空（开放函数）
//==============================
Drill_LSA_SparseMatrix.prototype.drill_isEmptyMatrix = function(){
	
	// > 长度为零，必然空
	if( this._drill_matrix.length == 0 ){ return true; }
	
	// > 找到非空对象
	for( var i = this._drill_matrix.length-1; i >= 0; i-- ){	//（倒序遍历，更早跳出循环）
		if( this._drill_matrix[i] == null ){ continue; }
		return false;
	}
	return true;
};
//==============================
// * 稀疏矩阵 - 数组是否为空（私有）
//==============================
Drill_LSA_SparseMatrix.prototype.drill_isEmptyArray = function( arr ){
	for( var i = arr.length-1; i >= 0; i-- ){	//（倒序遍历，更早跳出循环）
		if( arr[i] == null ){ continue; }
		return false;
	}
	return true;
};
	
	
	
//=============================================================================
// ** ☆行走图高度
//
//			说明：	> 此模块专门控制物体在图块上的高度。
//					> 一图介绍全部原理："26.图块 > 阶梯行走图高度原理.png（脚本）"
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图高度 - 初始化
//==============================
var _drill_LSA_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	_drill_LSA_initialize.call(this);
	this._drill_LSA_height = 0;					//高度值
}
//==============================
// * 行走图高度 - 获取
//
//			说明：	> 高度值是正数。
//==============================
Game_CharacterBase.prototype.drill_LSA_getHeight = function(){
	return this._drill_LSA_height;
}
//==============================
// * 行走图高度 - 是否在阶梯区域（开放函数）
//==============================
Game_CharacterBase.prototype.drill_LSA_isOnStairFloor = function(){
	return $gameMap.drill_LSA_isStair( this._x, this._y );
}

//==============================
// * 行走图高度 - 帧刷新绑定
//==============================
var _drill_LSA_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_LSA_update.call( this );
	this.drill_LSA_updateStairHeight();			//帧刷新 - 阶梯高度计算
}
//==============================
// * 行走图高度 - 帧刷新
//
//			说明：	> 此处直接根据玩家的 所在位置（图块单位）算出阶梯高度。
//==============================
Game_CharacterBase.prototype.drill_LSA_updateStairHeight = function(){
	
	// > 高度清零
	this._drill_LSA_height = 0;
	
	// > 条件 - 没有阶梯区域，跳出
	if( $gameMap.drill_LSA_noStair() == true ){ return; }
	
	// > 条件 - 飞行物体，跳出
	if( this._priorityType > 1 ){ return; }
	
	
	// > 高度赋值
	this._drill_LSA_height = $gameMap.drill_LSA_getStairHeight( this._realX, this._realY );
}
//==============================
// * 行走图高度 - 获取指定位置的高度
//			
//			参数：	> realX 小数
//					> realY 小数
//			返回：	数字
//
//			说明：	> 地图上的任意小数位置都能得到高度值，相当于在3D的地图中获取坐标的高度值。
//==============================
Game_Map.prototype.drill_LSA_getStairHeight = function( realX, realY ){
	
	// > 整数边角点 - 初始化
	//		p1 - p2
	//		|     |
	//		p3 - p4
	var x1 = Math.floor( realX );
	var y1 = Math.floor( realY );
	var x2 = Math.floor( realX ) +1;
	var y2 = Math.floor( realY );
	var x3 = Math.floor( realX );
	var y3 = Math.floor( realY ) +1;
	var x4 = Math.floor( realX ) +1;
	var y4 = Math.floor( realY ) +1;
	
	// > 整数边角点 - 高度计算（单位像素）
	var th = this.tileHeight();
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var z4 = 0;
	if( this.drill_LSA_isStair( x1, y1 ) ){
		var x_index = this.drill_LSA_getStairXIndex( x1, y1 ) -0.5;
		var x_length = this.drill_LSA_getStairLength( x1, y1 );
		z1 = th* x_index / x_length;	//（二阶阶梯可得到：0.5/2 和 1.5/2；三阶阶梯可得到：0.5/3 和 1.5/3 和 2.5/3）
	}
	if( this.drill_LSA_isStair( x2, y2 ) ){
		var x_index = this.drill_LSA_getStairXIndex( x2, y2 ) -0.5;
		var x_length = this.drill_LSA_getStairLength( x2, y2 );
		z2 = th* x_index / x_length;
	}
	if( this.drill_LSA_isStair( x3, y3 ) ){
		var x_index = this.drill_LSA_getStairXIndex( x3, y3 ) -0.5;
		var x_length = this.drill_LSA_getStairLength( x3, y3 );
		z3 = th* x_index / x_length;
	}
	if( this.drill_LSA_isStair( x4, y4 ) ){
		var x_index = this.drill_LSA_getStairXIndex( x4, y4 ) -0.5;
		var x_length = this.drill_LSA_getStairLength( x4, y4 );
		z4 = th* x_index / x_length;
	}
	
	// > 高度相同，则返回高度
	if( z1 == z2 && z2 == z3 && z3 == z4 ){ return z1; }
	
	
	// > 阶梯边缘修正
	if( $gameTemp._drill_LSA_debug_noStairFix == undefined ||
		$gameTemp._drill_LSA_debug_noStairFix == false ){
	
		// > 阶梯边缘修正 - 左边缘▂▅▇
		//		p1 - p5 - p2（左边缘）
		//		|          |
		//		p3 - p6 - p4（左边缘）
		//	方格 p1-p3-p6-p5 为水平面，方格 p5-p6-p4-p2 为斜坡，▂▂▂▅▇
		if( (this.drill_LSA_isStairLR( x2, y2 ) == true && this.drill_LSA_isStairSideLeft( x2, y2 )) ||
			(this.drill_LSA_isStairLR( x4, y4 ) == true && this.drill_LSA_isStairSideLeft( x4, y4 )) ){
			if( this.drill_LSA_isStair( x1, y1 ) == false &&
				this.drill_LSA_isStair( x3, y3 ) == false ){
				var x5 = Math.floor( realX ) + 0.5;
				var y5 = Math.floor( realY );
				var z5 = z1;
				var x6 = Math.floor( realX ) + 0.5;
				var y6 = Math.floor( realY ) + 1;
				var z6 = z3;
				
				var diff_x = realX - Math.floor( realX );
				var diff_y = realY - Math.floor( realY );
				if( diff_x < 0.5 ){
					// > p1-p5-p3 和 p5-p3-p6 三角划分（◸◿）
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x5,y5,z5, x3,y3,z3, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x3,y3,z3, x6,y6,z6, realX, realY );
					}
				}else{
					// > p5-p2-p6 和 p2-p6-p4 三角划分（◸◿）
					diff_x -= 0.5;
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x2,y2,z2, x6,y6,z6, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x2,y2,z2, x6,y6,z6, x4,y4,z4, realX, realY );
					}
				}
			}
		}
		
		// > 阶梯边缘修正 - ▂▅▇右边缘
		//		（右边缘）p1 - p5 - p2
		//		　　　　　|          |
		//		（右边缘）p3 - p6 - p4
		//	方格 p1-p3-p6-p5 为斜坡，方格 p5-p6-p4-p2 为水平面，▂▅▇▇▇
		if( (this.drill_LSA_isStairLR( x1, y1 ) == true && this.drill_LSA_isStairSideRight( x1, y1 )) ||
			(this.drill_LSA_isStairLR( x3, y3 ) == true && this.drill_LSA_isStairSideRight( x3, y3 )) ){
			if( this.drill_LSA_isStair( x2, y2 ) == false &&
				this.drill_LSA_isStair( x4, y4 ) == false ){
				var x5 = Math.floor( realX ) + 0.5;
				var y5 = Math.floor( realY );
				var z5 = th - th*0.5;	//（与对角移动产生的高度 相减）
				var x6 = Math.floor( realX ) + 0.5;
				var y6 = Math.floor( realY ) + 1;
				var z6 = th - th*0.5;	//（与对角移动产生的高度 相减）
				
				var diff_x = realX - Math.floor( realX );
				var diff_y = realY - Math.floor( realY );
				if( diff_x < 0.5 ){
					// > p1-p5-p3 和 p5-p3-p6 三角划分（◸◿）
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x5,y5,z5, x3,y3,z3, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x3,y3,z3, x6,y6,z6, realX, realY );
					}
				}else{
					// > p5-p2-p6 和 p2-p6-p4 三角划分（◸◿）
					diff_x -= 0.5;
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x2,y2,z2, x6,y6,z6, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x2,y2,z2, x6,y6,z6, x4,y4,z4, realX, realY );
					}
				}
			}
		}
		
		// > 阶梯边缘修正 - 左边缘▇▅▂
		//		p1 - p5 - p2（左边缘）
		//		|          |
		//		p3 - p6 - p4（左边缘）
		//	方格 p1-p3-p6-p5 为水平面，方格 p5-p6-p4-p2 为斜坡，▇▇▇▅▂
		if( (this.drill_LSA_isStairRL( x2, y2 ) == true && this.drill_LSA_isStairSideLeft( x2, y2 )) ||
			(this.drill_LSA_isStairRL( x4, y4 ) == true && this.drill_LSA_isStairSideLeft( x4, y4 )) ){
			if( this.drill_LSA_isStair( x1, y1 ) == false &&
				this.drill_LSA_isStair( x3, y3 ) == false ){
				var x5 = Math.floor( realX ) + 0.5;
				var y5 = Math.floor( realY );
				var z5 = th - th*0.5;	//（与对角移动产生的高度 相减）
				var x6 = Math.floor( realX ) + 0.5;
				var y6 = Math.floor( realY ) + 1;
				var z6 = th - th*0.5;	//（与对角移动产生的高度 相减）
				
				var diff_x = realX - Math.floor( realX );
				var diff_y = realY - Math.floor( realY );
				if( diff_x < 0.5 ){
					// > p1-p3-p6 和 p1-p5-p6 三角划分（◺◹ 反向）
					if( diff_x*2 <= diff_y ){	//（注意公式分割线）
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x3,y3,z3, x6,y6,z6, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x5,y5,z5, x6,y6,z6, realX, realY );
					}
				}else{
					// > p5-p6-p4 和 p5-p2-p4 三角划分（◺◹ 反向）
					diff_x -= 0.5;
					if( diff_x*2 <= diff_y ){
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x6,y6,z6, x4,y4,z4, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x2,y2,z2, x4,y4,z4, realX, realY );
					}
				}
			}
		}
		
		// > 阶梯边缘修正 - ▇▅▂右边缘
		//		（右边缘）p1 - p5 - p2
		//		　　　　　|          |
		//		（右边缘）p3 - p6 - p4
		//	方格 p1-p3-p6-p5 为斜坡，方格 p5-p6-p4-p2 为水平面，▇▅▂▂▂
		if( (this.drill_LSA_isStairRL( x1, y1 ) == true && this.drill_LSA_isStairSideRight( x1, y1 )) ||
			(this.drill_LSA_isStairRL( x3, y3 ) == true && this.drill_LSA_isStairSideRight( x3, y3 )) ){
			if( this.drill_LSA_isStair( x2, y2 ) == false &&
				this.drill_LSA_isStair( x4, y4 ) == false ){
				var x5 = Math.floor( realX ) + 0.5;
				var y5 = Math.floor( realY );
				var z5 = z2;
				var x6 = Math.floor( realX ) + 0.5;
				var y6 = Math.floor( realY ) + 1;
				var z6 = z4;
				
				var diff_x = realX - Math.floor( realX );
				var diff_y = realY - Math.floor( realY );
				if( diff_x < 0.5 ){
					// > p1-p5-p3 和 p5-p3-p6 三角划分（◸◿）
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x5,y5,z5, x3,y3,z3, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x3,y3,z3, x6,y6,z6, realX, realY );
					}
				}else{
					// > p5-p2-p6 和 p2-p6-p4 三角划分（◸◿）
					diff_x -= 0.5;
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x2,y2,z2, x6,y6,z6, realX, realY );
					}else{
						return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x2,y2,z2, x6,y6,z6, x4,y4,z4, realX, realY );
					}
				}
			}
		}
		
		// > 阶梯边缘修正 - ▇▅▂连接的边缘
		//		（右边缘）p1 - p2
		//		　　　　　|     |
		//		　　　　　p3 - p4（左边缘）
		if( this.drill_LSA_isStairRL( x1, y1 ) == true && 
			this.drill_LSA_isStairRL( x4, y4 ) == true && 
			this.drill_LSA_isStairSideRight( x1, y1 ) && 
			this.drill_LSA_isStairSideLeft(  x4, y4 ) ){
			
			var diff_x = realX - Math.floor( realX );
			var diff_y = realY - Math.floor( realY );
			// > p1-p2-p4 和 p1-p3-p4 三角划分（◺◹ 反向）
			//		（注意，之前此处if的返回函数写反了，才导致左右移动没问题，上下移动出现凸起的抖动）
			if( diff_x <= diff_y ){
				return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x3,y3,z3, x4,y4,z4, realX, realY );
			}else{
				return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x2,y2,z2, x4,y4,z4, realX, realY );
			}
		}
		
	}
	
	// > 普通图块/阶梯常规图块 - p1-p2-p3 和 p2-p3-p4 三角划分（◸◿）
	//		（注意，如果 p1-p2-p3 位置等高(▇▅▂的情况)，则没有斜坡移动）
	var diff_x = realX - Math.floor( realX );
	var diff_y = realY - Math.floor( realY );
	if( diff_x + diff_y <= 1 ){
		return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x2,y2,z2, x3,y3,z3, realX, realY );
	}else{
		return this.drill_LSA_Math3D_getPointOnPlane_FindZ( x2,y2,z2, x3,y3,z3, x4,y4,z4, realX, realY );
	}
}

//==============================
// * 数学工具 - 判断三点是否共线
//			
//			参数：	> x1,y1,z1 数字（第1个点）
//					> x2,y2,z2 数字（第2个点）
//					> x3,y3,z3 数字（第3个点）
//			返回：	> 布尔
//==============================
Game_Map.prototype.drill_LSA_Math3D_isTherePointInOneLine = function( x1,y1,z1, x2,y2,z2, x3,y3,z3 ){
	var x_diff1 = x1-x2;
	var x_diff2 = x2-x3;
	var y_diff1 = y1-y2;
	var y_diff2 = y2-y3;
	var z_diff1 = z1-z2;
	var z_diff2 = z2-z3;
	if( x_diff1*y_diff2 == y_diff1*x_diff2 && z_diff1*y_diff2 == y_diff1*z_diff2 ){
		return true;
	}else{
		return false;
	}
}
//==============================
// * 数学工具 - 已知三点平面求平面上第四点（求Z）
//			
//			参数：	> x1,y1,z1 数字（第1个点）
//					> x2,y2,z2 数字（第2个点）
//					> x3,y3,z3 数字（第3个点）
//					> x,y 数字     （第4个点的x,y）
//			返回：	> 数字         （结果值）
//			
//			说明：	> 如果给的三点 共线 或者 垂直于z轴，都会返回0。
//==============================
Game_Map.prototype.drill_LSA_Math3D_getPointOnPlane_FindZ = function( x1,y1,z1, x2,y2,z2, x3,y3,z3, x,y ){
	
	// > 判断三点是否共线
	if( this.drill_LSA_Math3D_isTherePointInOneLine( x1,y1,z1, x2,y2,z2, x3,y3,z3 ) == true ){ return 0; }
	
	// > 平面方程 ax + by + cz + d = 0
	//	（若a=0，则平面平行于x轴；若b=0，则平面平行于y轴；若c=0，则平面平行于z轴）
	var a = y1*(z2 - z3) + y2*(z3 - z1) + y3*(z1 - z2);
	var b = z1*(x2 - x3) + z2*(x3 - x1) + z3*(x1 - x2);
	var c = x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2);
	var d = -1*x1*(y2*z3 - y3*z2) - x2*(y3*z1 - y1*z3) - x3*(y1*z2 - y2*z1);
	//alert( a+"*x"+" + "+b+"*y"+" + "+c+"*z"+" + "+d+" = 0" );
	
	if( c == 0 ){ return 0; }
    var z = (0 - a*x - b*y - d) / c;
	return z;
}


//=============================================================================
// ** ☆数据最终变换值『物体数据最终变换值』
//
//			说明：	> 此模块专门控制 偏移与其他插件兼容 的设置。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
if( Imported.Drill_CoreOfEventFrame ){
	
	// > 强制更新提示
	if( Game_CharacterBase.prototype.drill_COEF_acc_LRR_x == undefined ){
		alert( DrillUp.drill_LSA_getPluginTip_NeedUpdate_COEF() );
	}
	
	//==============================
	// * 数据最终变换值 - 累积位置X（不影响）
	//==============================
	//var _drill_LSA_COEF_finalTransform_x = Game_CharacterBase.prototype.drill_COEF_acc_x;
	//Game_CharacterBase.prototype.drill_COEF_acc_x = function(){
	//	var xx = _drill_LSA_COEF_finalTransform_x.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 累积位置Y
	//==============================
	var _drill_LSA_COEF_finalTransform_y = Game_CharacterBase.prototype.drill_COEF_acc_y;
	Game_CharacterBase.prototype.drill_COEF_acc_y = function(){
		var yy = _drill_LSA_COEF_finalTransform_y.call( this );
		return yy - this.drill_LSA_getHeight();
	}
	//==============================
	// * 数据最终变换值 - 累积位置X - 倒影镜像用（不影响）
	//==============================
	//var _drill_LSA_COEF_final_LRR_x = Game_CharacterBase.prototype.drill_COEF_acc_LRR_x;
	//Game_CharacterBase.prototype.drill_COEF_acc_LRR_x = function(){
	//	var xx = _drill_LSA_COEF_final_LRR_x.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 累积位置Y - 倒影镜像用
	//==============================
	var _drill_LSA_COEF_final_LRR_y = Game_CharacterBase.prototype.drill_COEF_acc_LRR_y;
	Game_CharacterBase.prototype.drill_COEF_acc_LRR_y = function(){
		var yy = _drill_LSA_COEF_final_LRR_y.call( this );
		return yy + this.drill_LSA_getHeight();
	}
	//==============================
	// * 数据最终变换值 - 累积位置X - 同步镜像用（不影响）
	//==============================
	//var _drill_LSA_COEF_acc_LSR_x = Game_CharacterBase.prototype.drill_COEF_acc_LSR_x;
	//Game_CharacterBase.prototype.drill_COEF_acc_LSR_x = function(){
	//	var xx = _drill_LSA_COEF_acc_LSR_x.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 累积位置Y - 同步镜像用
	//==============================
	var _drill_LSA_COEF_acc_LSR_y = Game_CharacterBase.prototype.drill_COEF_acc_LSR_y;
	Game_CharacterBase.prototype.drill_COEF_acc_LSR_y = function(){
		var yy = _drill_LSA_COEF_acc_LSR_y.call( this );
		return yy + this.drill_LSA_getHeight();	//（虽然不合理，但是离开楼梯的跳变太大，不适合同步镜像表现）
	}
	
}else{
	//==============================
	// * 数据最终变换值 - 相对镜头所在位置X（不影响）
	//
	//			说明：	> 如果没加 行走图优化核心，就继承screenX。
	//==============================
	//var _drill_LSA_screenX = Game_CharacterBase.prototype.screenX;
	//Game_CharacterBase.prototype.screenX = function(){
	//	var xx = _drill_LSA_screenX.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 相对镜头所在位置Y
	//
	//			说明：	> 如果没加 行走图优化核心，就继承screenY。
	//==============================
	var _drill_LSA_screenY = Game_CharacterBase.prototype.screenY;
	Game_CharacterBase.prototype.screenY = function(){
		var yy = _drill_LSA_screenY.call( this );
		return yy - this.drill_LSA_getHeight();
	}
}



//=============================================================================
// ** ☆可通行控制
//
//			说明：	> 此模块专门控制物体在图块的阻塞情况。
//					> 一图介绍全部原理："26.图块 > 阶梯图块阻塞原理.png（脚本）"
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 可通行控制 - 通行绑定
//==============================
var _drill_LSA_canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function( x, y, d ){
	var can_pass = _drill_LSA_canPass.call( this, x, y, d );
	if( can_pass == false ){ return can_pass; }
	
	// > 在可通行时，才添加阻塞
	var result = this.drill_LSA_canPass( x, y, d );
	if( result == null ){ return can_pass; }
	return result;
}
//==============================
// * 可通行控制 - 通行 - 添加阻塞
//
//			说明：	> 只添加阻塞，返回false；如果不影响 通行，返回null值。
//==============================
Game_CharacterBase.prototype.drill_LSA_canPass = function( x, y, d ){
	
	// > 条件 - 没有阶梯区域，跳出
	if( $gameMap.drill_LSA_noStair() == true ){ return null; }
	
	// > 条件 - 飞行物体，跳出
	if( this._priorityType > 1 ){ return null; }
	
	// > 条件 - 阶梯阻塞 DEBUG
	if( $gameTemp._drill_LSA_debug_noStairBlock == true ){ return null; }
	
	var x2 = $gameMap.roundXWithDirection(x, d);
	var y2 = $gameMap.roundYWithDirection(y, d);
	
	
	// > 阶梯下边缘 双向阻塞
	if( d == 2 ){
		if( $gameMap.drill_LSA_isStairSideDown(x,y) == true &&
			$gameMap.drill_LSA_isStair(x2,y2) == false ){
			return false;
		}
	}
	if( d == 8 ){
		if( $gameMap.drill_LSA_isStairSideDown(x2,y2) == true &&
			$gameMap.drill_LSA_isStair(x,y) == false ){
			return false;
		}
	}
	
	// > 阶梯▂▅▇上边缘 单向阻塞（能向下走，不能向上走）
	if( d == 8 ){
		if( $gameMap.drill_LSA_isStair(x2,y2) == false &&
			$gameMap.drill_LSA_isStairLR(x,y) == true &&
			$gameMap.drill_LSA_isStairSideUp(x,y) == true &&
			$gameMap.drill_LSA_isStairSideRight(x,y) == false ){	//（右上角不阻塞）
			return false;
		}
	}
	// > 阶梯▇▅▂上边缘 单向阻塞（能向下走，不能向上走）
	if( d == 8 ){
		if( $gameMap.drill_LSA_isStair(x2,y2) == false &&
			$gameMap.drill_LSA_isStairRL(x,y) == true &&
			$gameMap.drill_LSA_isStairSideUp(x,y) == true &&
			$gameMap.drill_LSA_isStairSideLeft(x,y) == false ){		//（左上角不阻塞）
			return false;
		}
	}
	
	// > 阶梯死角▂▅▇<- 双向阻塞
	if( d == 4 ){
		if( $gameMap.drill_LSA_isStair(x,y) == false &&
			$gameMap.drill_LSA_isStairLR(x2,y2) == true &&
			$gameMap.drill_LSA_isStairSideDown(x2,y2) == true &&
			$gameMap.drill_LSA_isStairSideRight(x2,y2) == true ){
			return false;
		}
	}
	if( d == 6 ){
		if( $gameMap.drill_LSA_isStair(x2,y2) == false &&
			$gameMap.drill_LSA_isStairLR(x,y) == true &&
			$gameMap.drill_LSA_isStairSideDown(x,y) == true &&
			$gameMap.drill_LSA_isStairSideRight(x,y) == true ){
			return false;
		}
	}
	// > 阶梯死角->▇▅▂ 双向阻塞
	if( d == 6 ){
		if( $gameMap.drill_LSA_isStair(x,y) == false &&
			$gameMap.drill_LSA_isStairRL(x2,y2) == true &&
			$gameMap.drill_LSA_isStairSideDown(x2,y2) == true &&
			$gameMap.drill_LSA_isStairSideLeft(x2,y2) == true ){
			return false;
		}
	}
	if( d == 4 ){
		if( $gameMap.drill_LSA_isStair(x2,y2) == false &&
			$gameMap.drill_LSA_isStairRL(x,y) == true &&
			$gameMap.drill_LSA_isStairSideDown(x,y) == true &&
			$gameMap.drill_LSA_isStairSideLeft(x,y) == true ){
			return false;
		}
	}
	
	// > 阶梯▂▅▇最高顶角 单向阻塞（左和上）
	if( d == 4 || d == 8 ){
		if( $gameMap.drill_LSA_isStair(x,y) == false &&
			$gameMap.drill_LSA_isStairLR(x,y+1) == true &&
			$gameMap.drill_LSA_isStairSideUp(x,y+1) == true &&
			$gameMap.drill_LSA_isStairSideRight(x,y+1) == true ){
			return false;
		}
	}
	// > 阶梯▇▅▂最高顶角 单向阻塞（右和上）
	if( d == 6 || d == 8 ){
		if( $gameMap.drill_LSA_isStair(x,y) == false &&
			$gameMap.drill_LSA_isStairRL(x,y+1) == true &&
			$gameMap.drill_LSA_isStairSideUp(x,y+1) == true &&
			$gameMap.drill_LSA_isStairSideLeft(x,y+1) == true ){
			return false;
		}
	}
	
	return null;
}


//=============================================================================
// ** ☆事件触发控制
//
//			说明：	> 此模块专门控制 阶梯区域 的事件触发关系。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件触发控制 - 事件触发偏移
//==============================
var _drill_LSA_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
Game_Player.prototype.checkEventTriggerThere = function( triggers ){
	
	// > 阶梯区域先考虑触发对角的情况
    if( this.canStartLocalEvents() ){
		var d = this.direction();
		
		// > 向左触发
		if( d == 4 ){
			var xx = this._x;
			var yy = this._y;
			
			// > 对角触发（阶梯 ▂▅▇<- 从东边进入）
			if( $gameMap.drill_LSA_isStairLR( xx-1, yy+1 ) == true &&	//（左下地板必须为 ▂▅▇ + 右边缘）
				$gameMap.drill_LSA_isStairSideRight( xx-1, yy+1 ) == true ){
				this.startMapEvent(xx-1, yy+1, triggers, true);
			}
			// > 对角触发（阶梯 <-▇▅▂ 向西离开）
			if( $gameMap.drill_LSA_isStairRL( xx, yy ) == true &&		//（脚下地板必须为 ▇▅▂ + 左边缘）
				$gameMap.drill_LSA_isStairSideLeft( xx, yy ) == true ){
				this.startMapEvent(xx-1, yy-1, triggers, true);
			}
		}
		
		// > 向右触发
		if( d == 6 ){
			var xx = this._x;
			var yy = this._y;
			
			// > 对角触发（阶梯 ▂▅▇-> 向东离开）
			if( $gameMap.drill_LSA_isStairLR( xx, yy ) == true && 		//（脚下地板必须为 ▂▅▇ + 右边缘）
				$gameMap.drill_LSA_isStairSideRight( xx, yy ) == true ){
				this.startMapEvent(xx+1, yy-1, triggers, true);
			}
			// > 对角触发（阶梯 ->▇▅▂ 从西边进入）
			if( $gameMap.drill_LSA_isStairRL( xx+1, yy+1 ) == true &&	//（右下地板必须为 ▇▅▂ + 左边缘）
				$gameMap.drill_LSA_isStairSideLeft( xx+1, yy+1 ) == true ){
				this.startMapEvent(xx+1, yy+1, triggers, true);
			}
		}
	}
	
	// > 正常触发
	if( !$gameMap.isAnyEventStarting() ){
		_drill_LSA_checkEventTriggerThere.call( this, triggers );
	}
};


//=============================================================================
// ** ☆移动控制
//
//			说明：	> 此模块专门控制物体在 阶梯区域 的移动偏转。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 移动控制 - 执行直线移动
//==============================
var _drill_LSA_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function( d ){
	
	// > 条件 - 没有阶梯区域，跳出
	if( $gameMap.drill_LSA_noStair() == true ){
		_drill_LSA_moveStraight.call( this, d );	//（直接执行直线移动，且不标记）
		return;
	}
	
	// > 条件 - 飞行物体，跳出
	if( this._priorityType > 1 ){ 
		_drill_LSA_moveStraight.call( this, d );	//（直接执行直线移动，且不标记）
		return;
	}
	
	
	// > 强转移动
	var xx = this._x;
	var yy = this._y;
	
	// > 强转移动（阶梯 ▂▅▇-> 向东离开）
	if( $gameMap.drill_LSA_isStairLR( xx, yy ) == true && 		//（脚下地板必须为 ▂▅▇ + 右边缘）
		$gameMap.drill_LSA_isStairSideRight( xx, yy ) == true ){
		if( d == 6 ){
			this.drill_LST_moveDiagonally( 6, 8 );
			return;
		}
		if( d == 8 && $gameMap.drill_LSA_isStairLR( xx, yy-1 ) == false ){
			this.drill_LST_moveDiagonally( 6, 8 );	//（只在 最高顶角 向上时才斜向移动）
			return;
		}
	}
	// > 强转移动（阶梯 ▂▅▇<- 从东边进入）
	if( $gameMap.drill_LSA_isStairLR( xx-1, yy+1 ) == true &&	//（左下地板必须为 ▂▅▇ + 右边缘）
		$gameMap.drill_LSA_isStairSideRight( xx-1, yy+1 ) == true ){
		if( d == 4 ){
			this.drill_LST_moveDiagonally( 4, 2 );
			return;
		}
	}
	// > 强转移动（阶梯 <-▇▅▂ 向西离开）
	if( $gameMap.drill_LSA_isStairRL( xx, yy ) == true &&		//（脚下地板必须为 ▇▅▂ + 左边缘）
		$gameMap.drill_LSA_isStairSideLeft( xx, yy ) == true ){
		if( d == 4 ){
			this.drill_LST_moveDiagonally( 4, 8 );
			return;
		}
		if( d == 8 && $gameMap.drill_LSA_isStairRL( xx, yy-1 ) == false ){
			this.drill_LST_moveDiagonally( 4, 8 );	//（只在 最高顶角 向上时才斜向移动）
			return;
		}
	}
	// > 强转移动（阶梯 ->▇▅▂ 从西边进入）
	if( $gameMap.drill_LSA_isStairRL( xx+1, yy+1 ) == true &&	//（右下地板必须为 ▇▅▂ + 左边缘）
		$gameMap.drill_LSA_isStairSideLeft( xx+1, yy+1 ) == true ){
		if( d == 6 ){
			this.drill_LST_moveDiagonally( 6, 2 );
			return;
		}
	}
	
	// > 执行直线移动
	_drill_LSA_moveStraight.call( this, d );
}
//==============================
// * 移动控制 - 对角移动 物体（复刻）
//
//			说明：	> 此函数复刻了 moveDiagonally， 为的就是不受其他插件继承的影响。
//					（参数horz： 4左/6右，参数vert： 2下/8上）
//==============================
Game_CharacterBase.prototype.drill_LST_moveDiagonally = function( horz, vert ){
    this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));
    if( this.isMovementSucceeded() ){
        this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
    }
	
	// > 只要是对角移动，就只能朝向左右
	this.setDirection(horz);								//（强制左右朝向移动）
};
//==============================
// * 移动控制 - 对角移动 玩家（复刻）
//==============================
Game_Player.prototype.drill_LST_moveDiagonally = function( horz, vert ){
    if( this.canPassDiagonally(this.x, this.y, horz, vert) ){
        this._followers.updateMove();
    }
    Game_Character.prototype.drill_LST_moveDiagonally.call(this, horz, vert);
};
//==============================
// * 移动控制 - 对角移动 玩家队员（复刻）
//==============================
var _drill_LSA_f_moveDiagonally = Game_Follower.prototype.moveDiagonally;
Game_Follower.prototype.moveDiagonally = function( horz, vert ){
	
	// > 只要有一个站在阶梯上，就按左右对角移动
	if( $gameMap.drill_LSA_isStair( this.x, this.y ) ||
		$gameMap.drill_LSA_isStair( $gamePlayer.x, $gamePlayer.y ) ){
		this.drill_LST_moveDiagonally( horz, vert );		//（强制左右朝向移动）
		return;
	}
	
	// > 原函数
	_drill_LSA_f_moveDiagonally.call( this, horz, vert );
};
//==============================
// * 移动控制 - 对角移动 - 穿透斜向可通行区域
//==============================
var _drill_LSA_canPassDiagonally = Game_CharacterBase.prototype.canPassDiagonally;
Game_CharacterBase.prototype.canPassDiagonally = function( x, y, horz, vert ){
	var x2 = $gameMap.roundXWithDirection(x, horz);
	var y2 = $gameMap.roundYWithDirection(y, vert);
	
	// > 阶梯▂▅▇ - 穿透斜向阻碍
	if( $gameMap.drill_LSA_isStairLR( x, y ) ||
		$gameMap.drill_LSA_isStairLR( x2, y2 ) ){
		
		// > 判断 - 穿透
		if( this.isThrough() || this.isDebugThrough() ){ return true; }
		
		// > 判断 - 物体碰撞
		if( this.isCollidedWithCharacters(x2, y2) ){ return false; }
		
		// > 判断 - 图块可通行情况
		return $gameMap.drill_LSA_isAnyPassable(x2, y2);
	}
	
	// > 阶梯▇▅▂ - 穿透斜向阻碍
	if( $gameMap.drill_LSA_isStairRL( x, y ) ||
		$gameMap.drill_LSA_isStairRL( x2, y2 ) ){
		
		// > 判断 - 穿透
		if( this.isThrough() || this.isDebugThrough() ){ return true; }
		
		// > 判断 - 物体碰撞
		if( this.isCollidedWithCharacters(x2, y2) ){ return false; }
		
		// > 判断 - 图块可通行情况
		return $gameMap.drill_LSA_isAnyPassable(x2, y2);
	}
	
	// > 原函数
	return _drill_LSA_canPassDiagonally.call(this,x, y, horz, vert);
};
//==============================
// * 移动控制 - 判断图块可通行情况（isPassable需要指定方向是否可通行，这里任意一个方向可通行则返回true）
//==============================
Game_Map.prototype.drill_LSA_isAnyPassable = function( x, y ){
	return this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
};
//==============================
// * 移动控制 - 自动寻迹（鼠标用）
//
//			说明：	> 直接根据绘制的阶梯，直接加阻塞，自动寻迹会根据阻塞情况进行移动，
//					  这里不需要手动改移动，会出现死循环移动的情况。
//==============================
var _drill_LSA_findDirectionTo = Game_Character.prototype.findDirectionTo;
Game_Character.prototype.findDirectionTo = function( goalX, goalY ){
	
	// > 原函数
	var d = _drill_LSA_findDirectionTo.call( this, goalX, goalY );
	var x = this._x;
	var y = this._y;
	
	// > 距离目标点只有向上时
	if( d == 8 ){
		
		// > 最高顶角
		if( x == goalX && y == goalY+1 ){
			// > 阶梯▂▅▇最高顶角（防死循环移动）
			if( $gameMap.drill_LSA_isStair(x,y-1) == false &&
				$gameMap.drill_LSA_isStairLR(x,y) == true &&
				$gameMap.drill_LSA_isStairSideUp(x,y) == true &&
				$gameMap.drill_LSA_isStairSideRight(x,y) == true ){
				return 0;
			}
			// > 阶梯▇▅▂最高顶角（防死循环移动）
			if( $gameMap.drill_LSA_isStair(x,y-1) == false &&
				$gameMap.drill_LSA_isStairRL(x,y) == true &&
				$gameMap.drill_LSA_isStairSideUp(x,y) == true &&
				$gameMap.drill_LSA_isStairSideLeft(x,y) == true ){
				return 0;
			}
		}
		// > 最高顶角上面的图块+且不可通行时
		if( x == goalX && (y == goalY+2 || y == goalY+3) && 
			$gameMap.drill_LSA_isAnyPassable(goalX, goalY) == false ){
			// > 阶梯▂▅▇最高顶角（防死循环移动）
			if( $gameMap.drill_LSA_isStair(x,y-1) == false &&
				$gameMap.drill_LSA_isStairLR(x,y) == true &&
				$gameMap.drill_LSA_isStairSideUp(x,y) == true &&
				$gameMap.drill_LSA_isStairSideRight(x,y) == true ){
				return 0;
			}
			// > 阶梯▇▅▂最高顶角（防死循环移动）
			if( $gameMap.drill_LSA_isStair(x,y-1) == false &&
				$gameMap.drill_LSA_isStairRL(x,y) == true &&
				$gameMap.drill_LSA_isStairSideUp(x,y) == true &&
				$gameMap.drill_LSA_isStairSideLeft(x,y) == true ){
				return 0;
			}
		}
	}
	
	return d;
}



//=============================================================================
// ** ☆跳跃控制
//
//			说明：	> 此模块专门控制 阶梯区域 禁止跳跃。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
if( Imported.Drill_EventJump ){		//【物体-事件跳跃】
	
	//==============================
	// * 普通跳跃 - 判断禁止跳跃区
	//
	//			说明：	> 在阶梯上跳跃时，跳跃距离会错位，且高度计算极为复杂，所以这里索性禁止跳跃。
	//					> 2023-6-22 虽然此问题已解决，但是如果玩家跳进了阶梯顶部图块，也很麻烦，仍然禁跳。
	//==============================
	var _drill_LSA_EJu_isInJumpForbiddenArea = Game_CharacterBase.prototype.drill_EJu_isInJumpForbiddenArea;
	Game_CharacterBase.prototype.drill_EJu_isInJumpForbiddenArea = function(){
		if( this.drill_LSA_isOnStairFloor() ){ return true; }
		return _drill_LSA_EJu_isInJumpForbiddenArea.call(this);
	}
	//==============================
	// * 普通跳跃 - 判断悬崖高度
	//==============================
	var _drill_LSA_EJu_getCliffHeight = Game_CharacterBase.prototype.drill_EJu_getCliffHeight;
	Game_CharacterBase.prototype.drill_EJu_getCliffHeight = function(x, y) {
		if( $gameMap.drill_LSA_isStair( x, y ) ){ return 100; }
		return _drill_LSA_EJu_getCliffHeight.call( this, x, y );
	}
}



