//=============================================================================
// Drill_RotateDirection.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        互动 - 原地转向能力
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_RotateDirection +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得地图的玩家具有原地转向能力。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以通过其他插件添加更多功能。
 * 被扩展：
 *   - Drill_OperateHud           鼠标-鼠标辅助操作面板
 *     该插件提供鼠标、触碰辅助控制原地转向的支持。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对玩家有效。
 * 2.更多详细的介绍，去看看 "10.互动 > 关于原地转向能力.docx"。
 * 细节：
 *   (1.原地转向在光滑的图块上不能转向。
 *   (2.原地转向能力非常基础，单独扩展比较有限，一般需要与其它能力组合用。
 *     （虽然基础，但是可以做跳舞毯。）
 * 
 * -----------------------------------------------------------------------------
 * ----知识点 - 键盘、手柄
 * 键盘 - "W"键 + 方向键 转向
 * 手柄 - "RB"键 + 方向键 转向
 *
 * -----------------------------------------------------------------------------
 * ----知识点 - 鼠标、触屏
 * 鼠标 - 无法控制
 * 触屏 - 无法控制
 * 
 * 必须要 Drill_OperateHud 鼠标辅助操作面板 才能支持。
 * 鼠标 - 点击操作面板的环方向按钮 转向
 * 触屏 - 触碰操作面板的环方向按钮 转向
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置玩家原地转向能力。
 *
 * 插件指令：>玩家原地转向 : 开启能力
 * 插件指令：>玩家原地转向 : 关闭能力
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
 * 时间复杂度： o(n)
 * 测试方法：   在各个管理层中进行原地转向性能测试。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.原地转向为单次执行，几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 添加了插件性能说明。
 * [v1.3]
 * 修复了原地转向在光滑地面上能转向的bug。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		RD（Rotate_Direction）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	到处测试
//		★性能测试消耗	找不到
//		★最坏情况		无
//		★备注			转向只是换一下bitmap那么简单，消耗几乎没有。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			原地转向能力：
//				->不走动转向
//				->按键设置
//				x->八方向
//
//		★必要注意事项：
//			1.互动之间如果有较复杂的接口，必须遵循下面的格式：
//				drill_canXxxx_Normal()			静态约束条件（无提示音）
//				drill_canXxxx_Conditional()		外力限制条件（有提示音）
//				drill_doXxxx()					执行操作
//				drill_isXxxxControl()			键盘按键条件
//			  面板通过上述四个接口 主动调用 能力插件中的函数。
//			  注意，这里【没有】 drill_doRotate() 函数。
//
//		★其它说明细节：
//			1.转向可以朝向8个方向，这里还是只考虑4个方向，太复杂。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_RotateDirection = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_RotateDirection');


//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_RD_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
	_drill_RD_pluginCommand.call(this,command, args);
	if( command === ">玩家原地转向" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "开启能力" ){
				$gameSystem._drill_RD_enable = true;
			}
			if( type == "关闭能力" ){
				$gameSystem._drill_RD_enable = false;
			}
		}
	}
};

//=============================================================================
// ** 玩家原地转向
//=============================================================================
//==============================
// * 玩家 - 转向初始化
//==============================
var _drill_RD_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	_drill_RD_initialize.call(this);
	if( $gameSystem._drill_RD_enable == undefined ){ $gameSystem._drill_RD_enable = true;}
};
//==============================
// * 玩家 - 执行移动
//==============================
var _drill_RD_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
	
	// > 转向阻止
    if( this.drill_canRotate_Normal() ){ 			//基本转向条件
		if( this.drill_isRotateControl() ){			//转向按钮按下
			if( this.drill_canRotate_Conditional() ){//限制转向条件
				this.drill_RD_setDirection();
				return;
			}else{
				SoundManager.playBuzzer();
			}
		}
	}
	
	// > 原函数
	_drill_RD_moveByInput.call(this);
};

//==============================
// * 转向 - 键盘按键条件
//==============================
Game_Player.prototype.drill_isRotateControl = function() {
	//W键 + 方向键
	return Input.isPressed('pagedown') && 
		( this.getInputDirection() == 2 ||
		 this.getInputDirection() == 4 ||
		 this.getInputDirection() == 6 ||
		 this.getInputDirection() == 8 
		);
}
//==============================
// * 转向 - 静态约束条件
//				
//			程序执行流程中，必须禁止该能力的条件，一般不播放错误音。
//==============================
Game_Player.prototype.drill_canRotate_Normal = function() {
	if( this.isJumping() ){return false};						//跳跃时
	if( !this.canMove() ){return false};						//无法移动时
	return true;
}
//==============================
// * 转向 - 外力限制条件
//				
//			由能力关闭、封印、数量限制等因素造成的，一般会播放错误提示音。
//==============================
Game_Player.prototype.drill_canRotate_Conditional = function() {
	if( this.drill_RD_isInSlipperyArea() ){return false};		//光滑图块上禁止转向
	if( !$gameSystem._drill_RD_enable ){return false};			//关闭转向能力，禁止转向
	return true;
}

//==============================
// * 判断光滑图块
//==============================
Game_Player.prototype.drill_RD_isInSlipperyArea = function() {
	// > 【图块 - 物体滑行】
	if( Imported.Drill_LayerSlipperyTile ){ return this.drill_LST_isOnSlipperyFloor(); }
	// > 【Yep图块插件】
	if( Imported.YEP_SlipperyTiles ){ return this.onSlipperyFloor(); }
	return false;
}

//==============================
// * 转向按钮按下控制条件
//==============================
Game_Player.prototype.drill_RD_setDirection = function() {
	
	this.setDirection(this.getInputDirection());
	
	/*
	if (Input.isPressed('down')) {this.setDirection(2);
	} else if (Input.isPressed('left')) {this.setDirection(4);
	} else if (Input.isPressed('right')) {this.setDirection(6);
	} else if (Input.isPressed('up')) {this.setDirection(8);
	};*/
};


