//=============================================================================
// Drill_LayerStairArea.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        图块 - 侧边阶梯区域
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
 * 使得你可以用个画图块R区域，实现 侧边阶梯▂▅▇ 和 侧边阶梯▇▅▂ 效果。
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
 * 2.更多详细的介绍，去看看 "26.图块 > 关于侧边阶梯.docx"。
 * 3.插件需要将指定 地形标志 或 图块R区域 设为侧边阶梯，
 *   去看看 "26.图块 > 关于插件与图块R占用说明.xlsx"
 * 细节：
 *   (1.从普通地面进入到阶梯区域，只能左右进入，不可上下进入。
 *      但是你可以通过跳跃跳上去。
 *   (2.飞行的物体（在人物上方）不受阶梯影响。
 * 组合：
 *   (1.玩家可以举着花盆过阶梯。
 *   (2.玩家可以在阶梯上跳跃。
 *   (3.阶梯区域可以与光滑地面的功能重叠，形成滑坡。
 * 注意事项：
 *   (1.阶梯能够给玩家"高度感"的错觉，而实际上整个游戏仍然为平面图块。
 *      完全没有高度的属性。你需要先去了解文档细节说明，再尝试绘制阶梯。
 *   (2.阶梯有一些"死角型"的入口，虽不会影响移动，但建议使用障碍物阻挡。
 *   (3.使用 鼠标操作 自动寻路阶梯时，会稍微有一些笨拙。
 *      建议设计地图时，使用更宽一点的楼梯。
 * 设计：
 *   (1.侧边阶梯的局限性很多，不太适合作为解谜的互动对象来用。
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
 * 时间复杂度： o(n^3)*o(移动路线) 每帧
 * 测试方法：   去阶梯管理层进行测试。
 * 测试结果：   200个事件的地图中，消耗为：【87.44ms】
 *              100个事件的地图中，消耗为：【56.27ms】
 *               50个事件的地图中，消耗为：【49.07ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.如果事件数量很多，成堆的事件和成群的阶梯区域需要交错判断。
 *   这会使得计算量上升的非常快。主要在大量事件同时上楼梯时，计
 *   算量非常高。
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
//		覆盖重写方法	Game_CharacterBase.prototype.moveStraight（半覆盖）
//						（部分看起来像半覆盖的函数，实际上为 附加条件阻塞/执行 的功能）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(移动路线) 每帧
//		★性能测试因素	阶梯管理层
//		★性能测试消耗	49.07ms（drill_LSA_updateStairY 函数） 14.72ms（drill_LSA_isStairRL）
//		★最坏情况		事件越多，情况越坏。
//		★备注			这里的消耗量与Drill_LayerSlipperyTile光滑地面的计算量相当。帧数一直维持在9帧左右。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			侧边阶梯区域：
//				->阶梯通用接口
//					->判断阶梯
//					->获取阶梯两边边际
//					->获取指定x的阶梯高度
//					->阶梯位置标记
//				->阶梯
//					->从左往右上楼▂▅▇
//					->从右往左上楼▇▅▂
//					->高度修正
//						->减去对角移动情况
//				->移动限制
//					->强转移动
//					->阻塞移动
//					->飞行物体不影响
//				->位置标记刷新
//					->地图初始化
//					->瞬移定位时刷新标记
//				->禁跳
//				->事件触发偏移
//				->性能优化
//					->没有阶梯区域，不工作
//					->减少一帧内多次重复调用时的重新判定次数
//
//		★必要注意事项：
//			1.【修正区域判定是个坑，不要修正，就按原来的 this._x 和 this._y 判定】。
//			2.标签记录特殊情况：
//				-> ▂▅▇ 从西边进入			高度变化为：▂▂▂▅▇ 先平移，再上升（通过h<0判断，如果是阶梯交接，则跳过判断）
//				<- ▂▅▇ 向西离开			高度变化为：▂▂▂▅▇ 先下降，再平移（通过h<0判断，如果是阶梯交接，则跳过判断）
//				▂▅▇ <- 从东边进入			高度变化为：▂▅▇▇▇ 先平移，再下降（通过h>1判断，如果是阶梯交接，则跳过判断）
//				▂▅▇ -> 向东离开			高度变化为：▂▅▇▇▇ 先上升，再平移（通过h>1判断，如果是阶梯交接，则跳过判断）
//
//		★其它说明细节：
//			1.本来以为可以绕开对角移动，没想到最后还是基于对角移动。
//			  物体的本身不在阶梯区域，而右下角是 从右往左的阶梯区域 时，右移和右下角移动 是相等的。
//			2.
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
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
// ** 插件指令
//=============================================================================
var _drill_LSA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LSA_pluginCommand.call(this, command, args);
	
	//...
};


//=============================================================================
// ** 阶梯通用接口
//=============================================================================
//==============================
// * 接口 - 判断阶梯区域
//==============================
Game_Map.prototype.drill_LSA_isStair = function( x, y ){
    if( $gameParty.inBattle() == true ){ return false; }
    if( this.tileset() == undefined ){ return false; }
    if( this.isValid(x, y) == false ){ return false; }
	
	// > 阶梯▂▅▇ R图块 标记
	var regionId = this.regionId( x, y );
	if( DrillUp.g_LSA_regionTank_LR.contains( String(regionId) ) ){
		return true;
	}
	// > 阶梯▇▅▂ R图块 标记
	if( DrillUp.g_LSA_regionTank_RL.contains( String(regionId) ) ){
		return true;
	}
	
	return false;
};
//==============================
// * 接口 - 判断阶梯▂▅▇
//==============================
Game_Map.prototype.drill_LSA_isStairLR = function( x, y ){
    if( $gameParty.inBattle() == true ){ return false; }
    if( this.tileset() == undefined ){ return false; }
    if( this.isValid(x, y) == false ){ return false; }
	
	// > 阶梯▂▅▇ R图块 标记
	var regionId = this.regionId( x, y );
	if( DrillUp.g_LSA_regionTank_LR.contains( String(regionId) ) ){
		return true;
	}
	
	return false;
};
//==============================
// * 接口 - 判断阶梯▇▅▂
//==============================
Game_Map.prototype.drill_LSA_isStairRL = function( x, y ){
    if( $gameParty.inBattle() == true ){ return false; }
    if( this.tileset() == undefined ){ return false; }
    if( this.isValid(x, y) == false ){ return false; }
	
	// > 阶梯▇▅▂ R图块 标记
	var regionId = this.regionId( x, y );
	if( DrillUp.g_LSA_regionTank_RL.contains( String(regionId) ) ){
		return true;
	}
	
	return false;
};
//==============================
// * 接口 - 获取阶梯两边边际（返回json数据）
//==============================
Game_Map.prototype.drill_LSA_getTwoSide = function( x, y ){
	var x_data = {};
	x_data['left'] = 0;			//当前阶梯 最左侧
	x_data['right'] = 0;		//当前阶梯 最右侧
	x_data['len'] = 0;			//阶梯长度
	
	if( this.drill_LSA_isStair( x, y ) == false ){ return x_data; }	//（len为0表示非阶梯区域）
	
	// > 阶梯▂▅▇ 查找（下、左下、左）
	if( this.drill_LSA_isStairLR( x, y ) == true ){
		
		// > 找到最左下的基准坐标
		x_data['org_left'] = 0	
		x_data['org_bottom'] = 0;
		for( var i=0; i < 50; i++ ){	
			var xx = x + x_data['org_left'];
			var yy = y + x_data['org_bottom'];
			if( this.drill_LSA_isStairLR( xx-1, yy+1 ) == true ){
				x_data['org_left'] -= 1;
				x_data['org_bottom'] += 1;
				continue;
			}
			if( this.drill_LSA_isStairLR( xx, yy+1 ) == true ){
				x_data['org_bottom'] += 1;
				continue;
			}
			if( this.drill_LSA_isStairLR( xx-1, yy ) == true ){
				x_data['org_left'] -= 1;
				continue;
			}
			break;
		}
		
		// > 找到基准坐标的最右位置
		for( var j=0; j < 8; j++ ){	
			var xx = x + x_data['org_left'];
			var yy = y + x_data['org_bottom'];
			if( this.drill_LSA_isStairLR( xx + j, yy ) == true ){
				x_data['len'] = j + 1;		//（len最小为1）
			}else{
				break;
			}
		}
		
		// > 换算值
		x_data['left'] = x_data['org_left'] % x_data['len'];
		x_data['right'] = x_data['left'] + x_data['len'];
	}
	
	
	// > 阶梯▇▅▂ 查找（下、右下、右）
	if( this.drill_LSA_isStairRL( x, y ) == true ){
		
		// > 找到最右下的基准坐标
		x_data['org_right'] = 0	
		x_data['org_bottom'] = 0;
		for( var i=0; i < 50; i++ ){	
			var xx = x + x_data['org_right'];
			var yy = y + x_data['org_bottom'];
			if( this.drill_LSA_isStairRL( xx+1, yy+1 ) == true ){
				x_data['org_right'] += 1;
				x_data['org_bottom'] += 1;
				continue;
			}
			if( this.drill_LSA_isStairRL( xx, yy+1 ) == true ){
				x_data['org_bottom'] += 1;
				continue;
			}
			if( this.drill_LSA_isStairRL( xx+1, yy ) == true ){
				x_data['org_right'] += 1;
				continue;
			}
			break;
		}
		
		// > 找到基准坐标的最左位置
		for( var j=0; j < 8; j++ ){	
			var xx = x + x_data['org_right'];
			var yy = y + x_data['org_bottom'];
			if( this.drill_LSA_isStairRL( xx - j, yy ) == true ){
				x_data['len'] = j + 1;		//（len最小为1）
			}else{
				break;
			}
		}
		
		// > 换算值
		x_data['right'] = x_data['org_right'] % x_data['len'];
		x_data['left'] = x_data['right'] - x_data['len'];
	}
	
	return x_data;
}
//==============================
// * 接口 - 获取指定X的 ▂▅▇阶梯高度（单位图块）
//			
//			参数：	(cal_x,cal_y) 表示所在的阶梯区域的一个坐标点， 
//					cur_realX 表示指定的x位置。
//			说明：	所在阶梯区域位置不同，计算的公式也不同，所以必须先基于一个阶梯坐标点，再进行高度计算。
//			返回：	若不符合条件，则返回0，但注意高度可为负数。
//==============================
Game_Map.prototype.drill_LSA_getStairHeightLR = function( cal_x, cal_y, cur_realX ){
	
	// > 获取边际
	var x_data = $gameMap.drill_LSA_getTwoSide( cal_x, cal_y );
	if( x_data['len'] == 0 ){ return 0; }
	//alert(JSON.stringify( x_data ));
	
	// > 三角形比例高度计算
	var left_tile = cal_x + x_data['left'] - 0.5;	//（找到阶梯最左侧的图块）
	var diff = cur_realX - left_tile;
	var len = x_data['len'];
	var height = diff / len * 1;					//（这里默认 图块高度和图块宽度 相等）
	
	return height;
}
//==============================
// * 接口 - 获取指定X的 ▇▅▂阶梯高度（单位图块）
//==============================
Game_Map.prototype.drill_LSA_getStairHeightRL = function( cal_x, cal_y, cur_realX ){
	
	// > 获取边际
	var x_data = $gameMap.drill_LSA_getTwoSide( cal_x, cal_y );
	if( x_data['len'] == 0 ){ return 0; }
	
	// > 三角形比例高度计算
	var right_tile = cal_x + x_data['right'] + 0.5;	//（找到阶梯最右侧的图块）
	var diff = right_tile - cur_realX;
	var len = x_data['len'];
	var height = diff / len * 1;
	
	return height;
}


//=============================================================================
// ** 性能优化（没有阶梯区域，不工作）
//=============================================================================
//==============================
// * 性能优化 - 阶梯区域标记
//==============================
var _drill_LSA_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LSA_setup.call( this, mapId );
	
	this._drill_LSA_hasAnyStairTile = this.drill_LSA_checkAnyStairTile();
}
//==============================
// * 性能优化 - 搜索阶梯区域
//==============================
Game_Map.prototype.drill_LSA_checkAnyStairTile = function(){
	for( var x=0; x < this.width(); x++ ){
		for( var y=0; y < this.height(); y++ ){
			if( this.drill_LSA_isStair( x, y ) ){
				return true;
			}
		}
	}
	return false;
}


//=============================================================================
// ** 阶梯位置标记
//=============================================================================
//==============================
// * 接口 - 阶梯位置标记
//
//				说明：	注意，该标记用于预判移动前，处于阶梯哪种状态。
//						比如：玩家四方向移动【之前】，脚下的地板的所有特殊情况。
//						包括两图块先后关系： A->B， A->A， B->A， B->B 情况。（AA和BB默认不标记）
//				返回：	数字 111, 121 等。
//						百位 表示 阶梯 ▂▅▇/▇▅▂ 情况，
//						十位 表示 离开/进入，
//						个位 表示 向东/向西。
//						数字超过千位表示特殊情况。
//==============================
Game_Map.prototype.drill_LSA_getStairTag = function( xx, yy, d ){
	
	// > 全图无阶梯区域，返回0
	if( this._drill_LSA_hasAnyStairTile == false ){
		return 0;
	}
	
	//------------------------------
	// > 阶梯▂▅▇ 离开时
	if( this.drill_LSA_isStairLR( xx, yy ) ){
		
		// ▂▅▇ -> 向东离开（台阶+1情况，进入平地）
		if( d == 6 && 
			this.drill_LSA_isStairLR( xx + 1, yy ) == false &&
			this.drill_LSA_isStairLR( xx + 1, yy - 1 ) == false ){
			return 111;
		}
		// <- ▂▅▇ 向西离开（台阶不变，进入平地）
		if( d == 4 && 
			this.drill_LSA_isStairLR( xx - 1, yy ) == false &&
			this.drill_LSA_isStairLR( xx - 1, yy + 1 ) == false  ){
			return 121;
		}
		
		//------------------------------
		// > 阶梯▂▅▇ 交接中 行走时
		
		// ▂▅▇ -> ▂▅▇（台阶+1情况，直接进入新阶梯）
		if( d == 6 && this.drill_LSA_isStairLR( xx + 1, yy - 1 ) == true){
			var x_data = this.drill_LSA_getTwoSide( xx, yy );
			if( x_data['right'] == 1 ){
				return 111;	
			}
		}
		// ▂▅▇ <- ▂▅▇（台阶-1情况，直接进入新阶梯）
		if( d == 4 && this.drill_LSA_isStairLR( xx - 1, yy + 1 ) == true){
			var x_data = this.drill_LSA_getTwoSide( xx, yy );
			if( x_data['left'] == 0 ){
				return 122;
			}
		}
	
	//------------------------------
	// > 阶梯▂▅▇ 进入时
	}else{
		
		// ▂▅▇ <- 从东边进入（台阶-1情况）
		if( d == 4 && 
			this.drill_LSA_isStairLR( xx - 1, yy+1 ) == true &&
			this.drill_LSA_isStairLR( xx, yy+1 ) == false ){		//（下方和左下方都是阶梯区域，则不算进入）
			return 122;
		}
		// ▂▅▇ <- 从东边进入（前一情况如果未捕获到，而进入该条件，表示从楼梯底下硬钻上来的情况）
		if( d == 4 && 
			this.drill_LSA_isStairLR( xx - 1, yy ) == true &&
			this.drill_LSA_isStairLR( xx - 1, yy+1 ) == false ){
			return 1220;
		}
		// -> ▂▅▇ 从西边进入
		if( d == 6 && this.drill_LSA_isStairLR( xx + 1, yy ) == true ){
			return 112;
		}
	}
	
	
	//------------------------------
	// > 阶梯▇▅▂ 离开时
	if( this.drill_LSA_isStairRL( xx, yy ) ){
		
		// <- ▇▅▂ 向西离开（台阶+1情况，进入平地）
		if( d == 4 && 
			this.drill_LSA_isStairRL( xx - 1, yy ) == false &&
			this.drill_LSA_isStairRL( xx - 1, yy - 1 ) == false ){
			return 221;
		}
		// ▇▅▂ -> 向东离开
		if( d == 6 && 
			this.drill_LSA_isStairRL( xx + 1, yy ) == false &&
			this.drill_LSA_isStairRL( xx + 1, yy + 1 ) == false ){
			return 211;
		}
		
		//------------------------------
		// > 阶梯▇▅▂ 交接中 行走时
		
		// ▇▅▂ -> ▇▅▂（台阶-1情况，直接进入新阶梯）
		if( d == 6 && this.drill_LSA_isStairRL( xx + 1, yy + 1 ) == true){
			var x_data = this.drill_LSA_getTwoSide( xx, yy );
			if( x_data['right'] == 0 ){
				return 212;	
			}
		}
		// ▇▅▂ <- ▇▅▂（台阶+1情况，直接进入新阶梯）
		if( d == 4 && this.drill_LSA_isStairRL( xx - 1, yy - 1 ) == true){
			var x_data = this.drill_LSA_getTwoSide( xx, yy );
			if( x_data['left'] == -1 ){
				return 221;
			}
		}
		
	//------------------------------
	// > 阶梯▇▅▂ 进入时
	}else{
		
		// -> ▇▅▂ 从西边进入（台阶-1情况）
		if( d == 6 && 
			this.drill_LSA_isStairRL( xx + 1, yy+1 ) == true &&
			this.drill_LSA_isStairRL( xx, yy+1 ) == false ){	//（下方和右下方都是阶梯区域，则不算进入）
			return 212;
		}
		// -> ▇▅▂ 从西边进入（前一情况如果未捕获到，而进入该条件，表示从楼梯底下硬钻上来的情况）
		if( d == 6 && 
			this.drill_LSA_isStairRL( xx + 1, yy ) == true &&
			this.drill_LSA_isStairRL( xx + 1, yy+1 ) == false ){
			return 2120;
		}
		// ▇▅▂ <- 从东边进入
		if( d == 4 && this.drill_LSA_isStairRL( xx - 1, yy ) == true ){
			return 222;
		}
	}
	
	return 1;		//（1表示普通阶梯）
}


//=============================================================================
// ** 物体属性
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_LSA_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	_drill_LSA_initialize.call(this);
	
	this._drill_LSA_height = 0;				//偏移高度
	this._drill_LSA_stairTag = 0;			//阶梯状态标记
}
//==============================
// * 物体 - 判断在阶梯区域（硬性xy坐标）
//==============================
Game_CharacterBase.prototype.drill_LSA_isOnStairFloor = function(){
	return $gameMap.drill_LSA_isStair( this._x, this._y );
}
//==============================
// * 物体 - 相对镜头所在位置Y（像素单位）
//==============================
var _drill_LSA_screenY = Game_CharacterBase.prototype.screenY;
Game_CharacterBase.prototype.screenY = function(){
	var yy = _drill_LSA_screenY.call( this );	//（在这里叠加 计算后的阶梯高度）
	return yy - Math.round( this._drill_LSA_height );
}

//==============================
// * 物体 - 帧刷新
//==============================
var _drill_LSA_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_LSA_update.call( this );
	
	// > 没有阶梯区域，则不工作
	if( $gameMap._drill_LSA_hasAnyStairTile == false ){ return; }
	
	this.drill_LSA_updateStairY();		//帧刷新 - 阶梯高度计算
}
//==============================
// * 帧刷新 - 阶梯高度计算（根据状态使用高度公式）
//
//			说明：	玩家此时的xy位置已经处于【移动后】的目的地位置。
//==============================
Game_CharacterBase.prototype.drill_LSA_updateStairY = function(){
	
	// > 高度清零
	var hh = 0;
	this._drill_LSA_height = 0;
	
	// > 飞行物体不影响
	if( this._priorityType > 1 ){ return; }
	
	//------------------------------
	// > 阶梯▂▅▇的特殊情况
		
		//  -> ▂▅▇ 从西边进入
		if( this._drill_LSA_stairTag == 112 ){
			
			// > 计算阶梯高度
			var xx = this._x;		//（原阶梯坐标）
			var yy = this._y;
			hh = $gameMap.drill_LSA_getStairHeightLR( xx, yy, this._realX );
			hh *= $gameMap.tileWidth();
			
			// > 初始位置若为平地，磨平
			if( hh < 0 && 
				$gameMap.drill_LSA_isStairLR( this._x-1, this._y ) == false &&
				$gameMap.drill_LSA_isStairLR( this._x-1, this._y+1 ) == false ){ 
				hh = 0; 
			}
		}
		
		//  <- ▂▅▇ 向西离开
		if( this._drill_LSA_stairTag == 121 ){
			
			// > 计算阶梯高度
			var xx = this._x +1;	//（原阶梯坐标）
			var yy = this._y;
			hh = $gameMap.drill_LSA_getStairHeightLR( xx, yy, this._realX );
			
			// > 初始位置若为平地，则高度不再下降（所在位置可能是平移 或者 被对角再次吸引）
			if( hh < 0 && $gameMap.drill_LSA_isStairLR( this._x, this._y ) == false ){
				hh = 0;
			}
			
			hh *= $gameMap.tileWidth();
		}
	
		//  ▂▅▇ -> 向东离开（台阶+1情况）
		if( this._drill_LSA_stairTag == 111 ){
			
			// > 计算阶梯高度
			var xx = this._x -1;	//（原阶梯坐标）
			var yy = this._y +1;
			hh = $gameMap.drill_LSA_getStairHeightLR( xx, yy, this._realX );
			
			// > 上台阶后，所在位置若为平地，则高度不再上升
			if( hh > 1 && $gameMap.drill_LSA_isStairLR( this._x, this._y ) == false ){
				hh = 1;
			}
			
			// > 减去对角移动高度
			var left_diagonally = Math.abs( this._realX - xx );
			hh -= left_diagonally;
			
			hh *= $gameMap.tileWidth();
		}
	
		//  ▂▅▇ <- 从东边进入（台阶-1情况）
		if( this._drill_LSA_stairTag == 122 ){
			
			// > 计算阶梯高度
			var xx = this._x;		//（原阶梯坐标）
			var yy = this._y;
			hh = $gameMap.drill_LSA_getStairHeightLR( xx, yy, this._realX );
			
			// > 下台阶前，所在位置若为平地，则高度磨平
			if( hh > 1 && $gameMap.drill_LSA_isStairLR( this._x +1, this._y -1 ) == false ){
				hh = 1;
			}
			
			// > 减去对角移动高度
			var left_diagonally = Math.abs( this._realX - xx );
			hh -= left_diagonally;
			
			hh *= $gameMap.tileWidth();
		}
	
	//------------------------------
	// > 阶梯▇▅▂的特殊情况
	
		
		//  -> ▇▅▂ 从西边进入（台阶-1情况）
		if( this._drill_LSA_stairTag == 212 ){
			
			// > 计算阶梯高度
			var xx = this._x;		//（原阶梯坐标）
			var yy = this._y;
			hh = $gameMap.drill_LSA_getStairHeightRL( xx, yy, this._realX );
			
			// > 下台阶前，所在位置若为平地，则高度磨平
			if( hh > 1 && $gameMap.drill_LSA_isStairRL( this._x -1, this._y -1 ) == false ){
				hh = 1;
			}
			
			// > 减去对角移动高度
			var left_diagonally = Math.abs( this._realX - xx );
			hh -= left_diagonally;
			
			hh *= $gameMap.tileWidth();
		}
		
		//  <- ▇▅▂ 向西离开（台阶+1情况）
		if( this._drill_LSA_stairTag == 221 ){
			
			// > 计算阶梯高度
			var xx = this._x +1;	//（原阶梯坐标）
			var yy = this._y +1;
			hh = $gameMap.drill_LSA_getStairHeightRL( xx, yy, this._realX );
			
			// > 上台阶后，所在位置若为平地，则高度不再上升
			if( hh > 1 && $gameMap.drill_LSA_isStairRL( this._x, this._y ) == false ){
				hh = 1;
			}
			
			// > 减去对角移动高度
			var left_diagonally = Math.abs( this._realX - xx );
			hh -= left_diagonally;
			
			hh *= $gameMap.tileWidth();
		}
	
		//  ▇▅▂ -> 向东离开
		if( this._drill_LSA_stairTag == 211 ){
			
			// > 计算阶梯高度
			var xx = this._x -1;	//（原阶梯坐标）
			var yy = this._y;
			hh = $gameMap.drill_LSA_getStairHeightRL( xx, yy, this._realX );
			
			// > 下台阶后，所在位置若为平地，则高度不再下降（所在位置可能是平移 或者 被对角再次吸引）
			if( hh < 0 && $gameMap.drill_LSA_isStairRL( this._x, this._y ) == false ){
				hh = 0;
			}
			
			hh *= $gameMap.tileWidth();
		}
	
		//  ▇▅▂ <- 从东边进入
		if( this._drill_LSA_stairTag == 222 ){
			
			// > 计算阶梯高度
			var xx = this._x;		//（原阶梯坐标）
			var yy = this._y;
			hh = $gameMap.drill_LSA_getStairHeightRL( xx, yy, this._realX );
			
			// > 初始位置若为平地，磨平
			if( hh < 0 && 
				$gameMap.drill_LSA_isStairRL( this._x + 1, this._y ) == false &&
				$gameMap.drill_LSA_isStairRL( this._x + 1, this._y + 1 ) == false ){
				hh = 0; 
			}
			
			hh *= $gameMap.tileWidth();
		}
	
	//------------------------------
	// > 一般情况
	if( this._drill_LSA_stairTag == 1 && this.drill_LSA_isOnStairFloor() ){
		
		// > 阶梯▂▅▇
		if( $gameMap.drill_LSA_isStairLR( this._x, this._y ) ){
		
			// > 计算阶梯高度
			hh = $gameMap.drill_LSA_getStairHeightLR( this._x, this._y, this._realX );
			hh *= $gameMap.tileWidth();
		}
		
		// > 阶梯▇▅▂
		if( $gameMap.drill_LSA_isStairRL( this._x, this._y ) ){
			
			// > 计算阶梯高度
			hh = $gameMap.drill_LSA_getStairHeightRL( this._x, this._y, this._realX );
			hh *= $gameMap.tileWidth();
		}
		
	}
	
	// > 高度赋值
	this._drill_LSA_height = hh;
}

//=============================================================================
// ** 位置标记刷新
//=============================================================================
//==============================
// * 位置标记刷新 - 地图初始化
//
//			说明：	保持在阶梯区域时切换地图，需要刷新阶梯状态。
//==============================
var _drill_LSA_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function(){
	_drill_LSA_setupEvents.call( this );
	
	for(var i=0; i < this._events.length; i++){
		var temp_event = this._events[i];
		if( temp_event ){
			temp_event._drill_LSA_height = 0;				//偏移高度
			if( temp_event.drill_LSA_isOnStairFloor() ){	//阶梯状态标记（初始刷新）
				temp_event._drill_LSA_stairTag = 1;
			}
		}
	}
	
	$gamePlayer._drill_LSA_height = 0;						//偏移高度
	if( $gamePlayer.drill_LSA_isOnStairFloor() ){			//阶梯状态标记（初始刷新）
		$gamePlayer._drill_LSA_stairTag = 1;
	}
	
	for(var i=0; i < $gamePlayer.followers().visibleFollowers().length; i++){
		var temp_follower = $gamePlayer.followers().visibleFollowers()[i];
		if( temp_follower ){
			temp_follower._drill_LSA_height = 0;			//偏移高度
			if( temp_follower.drill_LSA_isOnStairFloor() ){	//阶梯状态标记（初始刷新）
				temp_follower._drill_LSA_stairTag = 1;
			}
		}
	}
}
//==============================
// * 位置标记刷新 - 瞬移定位时刷新标记
//==============================
var _drill_LSA_locate = Game_CharacterBase.prototype.locate;
Game_CharacterBase.prototype.locate = function( x, y ){
	_drill_LSA_locate.call( this, x, y );
	if( this.drill_LSA_isOnStairFloor() ){	//阶梯状态标记（瞬移时刷新）
		this._drill_LSA_stairTag = 1;
	}
}


//=============================================================================
// ** 移动强转
//=============================================================================
//==============================
// * 物体移动 - 执行直线移动
//==============================
var _drill_LSA_update2 = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_LSA_update2.call( this );
	this._drill_LSA_temp_stairTag = -1;		//（-1表示当前tag需要重刷）
}
//==============================
// * 物体移动 - 执行直线移动
//==============================
var _drill_LSA_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function( d ){
	
	// > 没有阶梯区域，则不工作
	if( $gameMap._drill_LSA_hasAnyStairTile == false ){
		_drill_LSA_moveStraight.call( this, d );	//（直接执行直线移动，且不标记）
		return;
	}
	
	// > 飞行物体不影响
	if( this._priorityType > 1 ){ 
		_drill_LSA_moveStraight.call( this, d );	//（直接执行直线移动，且不标记）
		return;
	}
	
	
	// > 获取标记（减少一帧内多次重复调用时的重新判定次数）
	if( this._drill_LSA_temp_stairTag == -1 ){
		this._drill_LSA_temp_stairTag = $gameMap.drill_LSA_getStairTag( this._x, this._y, d );
	}
	var stair_tag = this._drill_LSA_temp_stairTag;
	
	
	// > 强转移动（阶梯▂▅▇ 向东离开时，台阶+1）
	if( stair_tag == 111 ){
		this.drill_LST_moveDiagonally( 6, 8 );
		if( this.isMovementSucceeded() ){ this._drill_LSA_stairTag = stair_tag; }
		return;
	}
	// > 强转移动（阶梯▂▅▇ 从东边进入时，台阶-1）
	if( stair_tag == 122 ){
		this.drill_LST_moveDiagonally( 4, 2 );
		if( this.isMovementSucceeded() ){ this._drill_LSA_stairTag = stair_tag; }
		return;
	}
	// > 强转移动（阶梯▇▅▂ 向西离开时，台阶-1）
	if( stair_tag == 221 ){
		this.drill_LST_moveDiagonally( 4, 8 );
		if( this.isMovementSucceeded() ){ this._drill_LSA_stairTag = stair_tag; }
		return;
	}
	// > 强转移动（阶梯▇▅▂ 从西边进入时，台阶+1）
	if( stair_tag == 212 ){
		this.drill_LST_moveDiagonally( 6, 2 );
		if( this.isMovementSucceeded() ){ this._drill_LSA_stairTag = stair_tag; }
		return;
	}
	
	// > 阻塞移动
	if( stair_tag == 1220 || stair_tag == 2120 ){
		this.setMovementSuccess(false);
		this.setDirection(d);					//（原函数的执行，面壁/事件触发）
		this.checkEventTriggerTouchFront(d);
		return;
	}
	if( stair_tag == 1 ){
		
		// > 往下走时，如果是 平地到阶梯 则阻塞
		if( d == 2 ){
			if( $gameMap.drill_LSA_isStair( this._x, this._y ) == true &&
				$gameMap.drill_LSA_isStair( this._x, this._y+1 ) == false ){
				this.setMovementSuccess(false);
				this.setDirection(d);					//（原函数的执行，面壁/事件触发）
				this.checkEventTriggerTouchFront(d);
				return;
			}
			if( $gameMap.drill_LSA_isStair( this._x, this._y+1 ) == true &&
				$gameMap.drill_LSA_isStair( this._x, this._y ) == false ){
				this.setMovementSuccess(false);
				this.setDirection(d);					//（原函数的执行，面壁/事件触发）
				this.checkEventTriggerTouchFront(d);
				return;
			}
		}
		// > 往上走时，如果是 平地到阶梯 则阻塞
		if( d == 8 ){
			if( $gameMap.drill_LSA_isStair( this._x, this._y ) == true &&
				$gameMap.drill_LSA_isStair( this._x, this._y-1 ) == false ){
				this.setMovementSuccess(false);
				this.setDirection(d);					//（原函数的执行，面壁/事件触发）
				this.checkEventTriggerTouchFront(d);
				return;
			}
			if( $gameMap.drill_LSA_isStair( this._x, this._y-1 ) == true &&
				$gameMap.drill_LSA_isStair( this._x, this._y ) == false ){
				this.setMovementSuccess(false);
				this.setDirection(d);					//（原函数的执行，面壁/事件触发）
				this.checkEventTriggerTouchFront(d);
				return;
			}
		}
	}
	
	
	// > 执行直线移动
	_drill_LSA_moveStraight.call( this, d );
	
	// > 保存标签
	if( this.isMovementSucceeded() ){ this._drill_LSA_stairTag = stair_tag; }
	
	
}
//==============================
// * 物体移动 - 对角移动（复刻）
//
//			说明：	此函数复刻了 moveDiagonally， 为的就是不受其他插件继承的影响。
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
    if( this._direction === this.reverseDir(horz) ){
        this.setDirection(horz);
    }
    if( this._direction === this.reverseDir(vert) ){	//（去掉对角移动时纵向朝向）
        this.setDirection(vert);
    }
};
//==============================
// * 玩家 - 对角移动（复刻）
//==============================
Game_Player.prototype.drill_LST_moveDiagonally = function( horz, vert ){
    if( this.canPassDiagonally(this.x, this.y, horz, vert) ){
        this._followers.updateMove();
    }
    Game_Character.prototype.drill_LST_moveDiagonally.call(this, horz, vert);
};
//==============================
// * 物体移动 - 穿透斜向可通行区域
//==============================
var _drill_LSA_canPassDiagonally = Game_CharacterBase.prototype.canPassDiagonally;
Game_CharacterBase.prototype.canPassDiagonally = function( x, y, horz, vert ){
	
	// > 阶梯中穿透斜向阻碍
	if( this.drill_LSA_isOnStairFloor() ){
		var x2 = $gameMap.roundXWithDirection(x, horz);
		var y2 = $gameMap.roundYWithDirection(y, vert);
		
		// > 判断 - 穿透
		if( this.isThrough() || this.isDebugThrough() ){ return true; }
		
		// > 判断 - 物体碰撞
		if( this.isCollidedWithCharacters(x2, y2) ){ return false; }
		
		// > 判断 - 图块可通行情况
		return $gameMap.drill_LSA_isAnyPassable(x2, y2);
		
	// > 正常斜向判断
	}else{
		return _drill_LSA_canPassDiagonally.call(this,x, y, horz, vert);
	}
};
//==============================
// * 地图 - 判断图块可通行情况（isPassable需要指定方向是否可通行，这里任意一个方向可通行则返回true）
//==============================
Game_Map.prototype.drill_LSA_isAnyPassable = function( x, y ){
	return this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
};
//==============================
// * 跟随队员 - 同步标签状态
//==============================
var _drill_LSA_chaseCharacter = Game_Follower.prototype.chaseCharacter;
Game_Follower.prototype.chaseCharacter = function( character ){
	_drill_LSA_chaseCharacter.call( this, character );
	this._drill_LSA_stairTag = character._drill_LSA_stairTag;
}

//=============================================================================
// ** 禁跳【物体-事件跳跃】
//=============================================================================
if( Imported.Drill_EventJump ){
	//==============================
	// * 普通跳跃 - 判断禁止跳跃区
	//
	//			说明：	在阶梯上跳跃时，跳跃距离会错位，且高度计算极为复杂，所以这里索性禁止跳跃。
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

//==============================
// * 普通跳跃 - 起跳
//==============================
var _drill_LSA_jump = Game_CharacterBase.prototype.jump;
Game_CharacterBase.prototype.jump = function( xPlus, yPlus ){
	
	// > 跳跃前刷新地面判定
	if( this.drill_LSA_isOnStairFloor() == false ){
		this._drill_LSA_stairTag = -1;
	}
	
	// > 起跳
	_drill_LSA_jump.call( this, xPlus, yPlus );
}


//=============================================================================
// ** 事件触发偏移
//=============================================================================
//==============================
// * 触发 - 同步标签状态
//==============================
var _drill_LSA_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
Game_Player.prototype.checkEventTriggerThere = function( triggers ){
	
	// > 阶梯区域先考虑触发对角的情况
    if( this.canStartLocalEvents() ){
		var d = this.direction();
		if( d == 4 || d == 6 ){
			var x = this._x;
			var y = this._y;
			
			// > 获取标记（减少一帧内多次重复调用时的重新判定次数）
			if( this._drill_LSA_temp_stairTag == -1 ){
				this._drill_LSA_temp_stairTag = $gameMap.drill_LSA_getStairTag( x, y, d );
			}
			var stair_tag = this._drill_LSA_temp_stairTag;
			
			// > 对角触发
			if( stair_tag == 111 ){
				var x2 = $gameMap.roundXWithDirection( x, 6 );
				var y2 = $gameMap.roundYWithDirection( y, 8 );
				this.startMapEvent(x2, y2, triggers, true);
			}
			if( stair_tag == 122 ){
				var x2 = $gameMap.roundXWithDirection( x, 4 );
				var y2 = $gameMap.roundYWithDirection( y, 2 );
				this.startMapEvent(x2, y2, triggers, true);
			}
			if( stair_tag == 221 ){
				var x2 = $gameMap.roundXWithDirection( x, 4 );
				var y2 = $gameMap.roundYWithDirection( y, 8 );
				this.startMapEvent(x2, y2, triggers, true);
			}
			if( stair_tag == 212 ){
				var x2 = $gameMap.roundXWithDirection( x, 6 );
				var y2 = $gameMap.roundYWithDirection( y, 2 );
				this.startMapEvent(x2, y2, triggers, true);
			}
		}
	}
	
	// > 正常触发
	if( !$gameMap.isAnyEventStarting() ){
		_drill_LSA_checkEventTriggerThere.call( this, triggers );
	}
};


//=============================================================================
// ** 鼠标特殊情况
//=============================================================================
//==============================
// * 物体 - 自动寻迹
//==============================
var _drill_LSA_findDirectionTo = Game_Character.prototype.findDirectionTo;
Game_Character.prototype.findDirectionTo = function( goalX, goalY ){
	
	// > 自动寻迹原函数
	var d = _drill_LSA_findDirectionTo.call( this, goalX, goalY );
	
	// > 往下走时，如果是 平地到阶梯 则改成左右走
	if( d == 2 ){
		if( $gameMap.drill_LSA_isStairLR( this._x, this._y ) == true &&
			$gameMap.drill_LSA_isStairLR( this._x, this._y+1 ) == false ){
			return 4;	//<- ▂▅▇ 确保能下楼
		}
		if( $gameMap.drill_LSA_isStairRL( this._x, this._y ) == true &&
			$gameMap.drill_LSA_isStairRL( this._x, this._y+1 ) == false ){
			return 6;	//▇▅▂ -> 确保能下楼
		}
	}
	// > 往上走时，如果是 平地到阶梯 则改成左右走
	if( d == 8 ){
		if( $gameMap.drill_LSA_isStairLR( this._x, this._y ) == true &&
			$gameMap.drill_LSA_isStairLR( this._x, this._y-1 ) == false ){
			return 6;	//▂▅▇ -> 确保能上楼
		}
		if( $gameMap.drill_LSA_isStairRL( this._x, this._y ) == true &&
			$gameMap.drill_LSA_isStairRL( this._x, this._y-1 ) == false ){
			return 4;	//<- ▇▅▂ 确保能上楼
		}
	}
	
	// > 死角处，改为向上走
	if( d == 4 ){
		if( $gameMap.drill_LSA_isStairLR( this._x-1, this._y ) == true &&
			$gameMap.drill_LSA_isStairLR( this._x, this._y ) == false &&
			$gameMap.drill_LSA_isStairLR( this._x-1, this._y+1 ) == false ){
			return 8;
		}
	}
	if( d == 6 ){
		if( $gameMap.drill_LSA_isStairRL( this._x+1, this._y ) == true &&
			$gameMap.drill_LSA_isStairRL( this._x, this._y ) == false &&
			$gameMap.drill_LSA_isStairRL( this._x+1, this._y+1 ) == false ){
			return 8;
		}
	}
	
	// > 上下游离在目标点时，进入楼梯优先
	var diff_x = this.deltaXFrom( goalX );
	if( diff_x > 0 && (d == 2 || d == 8) ){
		
		if( $gameMap.drill_LSA_isStairLR( this._x-1, this._y+1 ) == true &&
			$gameMap.drill_LSA_isStairLR( this._x, this._y ) == false ){
			return 4;	//▂▅▇ <- 进入楼梯优先
		}
	}
	if( diff_x < 0 && (d == 2 || d == 8) ){
		
		if( $gameMap.drill_LSA_isStairRL( this._x+1, this._y+1 ) == true &&
			$gameMap.drill_LSA_isStairRL( this._x, this._y ) == false ){
			return 6;	//▇▅▂ <- 进入楼梯优先
		}
	}
	
	return d;
}



