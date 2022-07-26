//=============================================================================
// Drill_RouteAlongTheWall.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        移动路线 - 贴墙移动路线
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_RouteAlongTheWall +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件可以使得事件贴左墙或贴右墙移动。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfMoveRoute   移动路线-移动路线核心★★v1.7以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、事件指令的移动路线设置。
 * 细节：
 *   (1.贴右墙移动，是指事件判断右墙是否可通行，如果可通行则向右走。
 *      如果不可通行则沿着墙继续向前走。
 *      如果四处都没有墙，则物体会循环地向右顺时针绕圈走。
 *   (2.含斜向的贴墙，指如果在墙角位置的斜向是可通行的，那么事件会
 *      直接斜向移动。
 * 设计：
 *   (1.事件贴墙的走法灵感主要来自于绕墙移动的火球。
 *      如果玩家不注意避让，火球接近了会对玩家造成伤害。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的指令，实现贴墙移动。
 * 
 * 移动路线指令：>贴右墙移动
 * 移动路线指令：>贴右墙移动(含斜向)
 * 移动路线指令：>贴左墙移动
 * 移动路线指令：>贴左墙移动(含斜向)
 * 
 * 1.设置贴墙移动后，事件会根据是否可通行性来判断墙壁进行移动。
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
 * 时间复杂度： o(n)*o(事件移动路线) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.贴墙时事件判断可通行性的次数较少(只有4-8次)，所以消耗并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		RATW (Route_Along_The_Wall)
//		临时全局变量	DrillUp.g_RATW_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(事件移动路线) 每帧
//		★性能测试因素	物体管理层
//		★性能测试消耗	太小，未找到
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			移动路线指令集：
//				->遇障碍结束
//				->接近/远离
//		
//		★必要注意事项：
//			1.每次贴墙，就 顺时针/逆时针 判断一圈是否有路可以走即可。
//		
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_RouteAlongTheWall = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_RouteAlongTheWall');


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfMoveRoute ){


//=============================================================================
// * 指令执行阶段 - 执行指令（继承接口）
//=============================================================================
var _drill_RATW_routeCommand = Game_Character.prototype.drill_COMR_routeCommand;
Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
	_drill_RATW_routeCommand.call( this, command, args );
	if( command == ">贴右墙移动" ){
		if( args.length == 0 ){
			this.drill_RATW_moveAlongTheRightWall();
		}
	}
	if( command == ">贴左墙移动" ){
		if( args.length == 0 ){
			this.drill_RATW_moveAlongTheLeftWall();
		}
	}
	if( command == ">贴右墙移动(含斜向)" ){
		if( args.length == 0 ){
			this.drill_RATW_moveAlongTheRightWall_Diagonally();
		}
	}
	if( command == ">贴左墙移动(含斜向)" ){
		if( args.length == 0 ){
			this.drill_RATW_moveAlongTheLeftWall_Diagonally();
		}
	}
}


//=============================================================================
// ** 贴墙判断
//=============================================================================
//==============================
// * 贴墙判断 - 贴右墙移动
//==============================
Game_Character.prototype.drill_RATW_moveAlongTheRightWall = function(){
	var d = this.direction();
	
	// > 检查右侧
	d = this.drill_RATW_getDirectionRight90( d );
	if( this.drill_RATW_canPass(this._x, this._y, d) ){
		this.drill_RATW_moveStraight(d);
	}else{
		
		// > 检查上侧
		d = this.drill_RATW_getDirectionLeft90( d );
		if( this.drill_RATW_canPass(this._x, this._y, d) ){
			this.drill_RATW_moveStraight(d);
		}else{
			
			// > 检查左侧
			d = this.drill_RATW_getDirectionLeft90( d );
			if( this.drill_RATW_canPass(this._x, this._y, d) ){
				this.drill_RATW_moveStraight(d);
			}else{
				
				// > 检查下侧
				d = this.drill_RATW_getDirectionLeft90( d );
				if( this.drill_RATW_canPass(this._x, this._y, d) ){
					this.drill_RATW_moveStraight(d);
				}
			}
		}
	}
};
//==============================
// * 贴墙判断 - 贴左墙移动
//==============================
Game_Character.prototype.drill_RATW_moveAlongTheLeftWall = function(){
	var d = this.direction();
	
	// > 检查左侧
	d = this.drill_RATW_getDirectionLeft90( d );
	if( this.drill_RATW_canPass(this._x, this._y, d) ){
		this.drill_RATW_moveStraight(d);
	}else{
		
		// > 检查上侧
		d = this.drill_RATW_getDirectionRight90( d );
		if( this.drill_RATW_canPass(this._x, this._y, d) ){
			this.drill_RATW_moveStraight(d);
		}else{
			
			// > 检查右侧
			d = this.drill_RATW_getDirectionRight90( d );
			if( this.drill_RATW_canPass(this._x, this._y, d) ){
				this.drill_RATW_moveStraight(d);
			}else{
				
				// > 检查下侧
				d = this.drill_RATW_getDirectionRight90( d );
				if( this.drill_RATW_canPass(this._x, this._y, d) ){
					this.drill_RATW_moveStraight(d);
				}
			}
		}
	}
};
//==============================
// * 贴墙判断 - 贴右墙移动
//==============================
Game_Character.prototype.drill_RATW_moveAlongTheRightWall_Diagonally = function(){
	var d = this.direction();
	
	// > 检查右侧
	d = this.drill_RATW_getDirectionRight90( d );
	if( this.drill_RATW_canPass(this._x, this._y, d) ){
		var xx = $gameMap.roundXWithDirection(this._x, d);
		var yy = $gameMap.roundYWithDirection(this._y, d);
		var dd = this.drill_RATW_getDirectionRight90( d );
		if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（右下方）
			this.drill_RATW_moveDiagonally(d,dd);
		}else{
			this.drill_RATW_moveStraight(d);
		}
	}else{
		
		// > 检查上侧
		d = this.drill_RATW_getDirectionLeft90( d );
		if( this.drill_RATW_canPass(this._x, this._y, d) ){
			var xx = $gameMap.roundXWithDirection(this._x, d);
			var yy = $gameMap.roundYWithDirection(this._y, d);
			var dd = this.drill_RATW_getDirectionRight90( d );
			if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（右上方）
				this.drill_RATW_moveDiagonally(d,dd);
			}else{
				this.drill_RATW_moveStraight(d);
			}
		}else{
			
			// > 检查左侧
			d = this.drill_RATW_getDirectionLeft90( d );
			if( this.drill_RATW_canPass(this._x, this._y, d) ){
				var xx = $gameMap.roundXWithDirection(this._x, d);
				var yy = $gameMap.roundYWithDirection(this._y, d);
				var dd = this.drill_RATW_getDirectionRight90( d );
				if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（左上方）
					this.drill_RATW_moveDiagonally(d,dd);
				}else{
					this.drill_RATW_moveStraight(d);
				}
			}else{
				
				// > 检查下侧
				d = this.drill_RATW_getDirectionLeft90( d );
				if( this.drill_RATW_canPass(this._x, this._y, d) ){
					var xx = $gameMap.roundXWithDirection(this._x, d);
					var yy = $gameMap.roundYWithDirection(this._y, d);
					var dd = this.drill_RATW_getDirectionRight90( d );
					if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（左下方）
						this.drill_RATW_moveDiagonally(d,dd);
					}else{
						this.drill_RATW_moveStraight(d);
					}
				}
			}
		}
	}
};
//==============================
// * 贴墙判断 - 贴左墙移动
//==============================
Game_Character.prototype.drill_RATW_moveAlongTheLeftWall_Diagonally = function(){
	var d = this.direction();
	
	// > 检查左侧
	d = this.drill_RATW_getDirectionLeft90( d );
	if( this.drill_RATW_canPass(this._x, this._y, d) ){
		var xx = $gameMap.roundXWithDirection(this._x, d);
		var yy = $gameMap.roundYWithDirection(this._y, d);
		var dd = this.drill_RATW_getDirectionLeft90( d );
		if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（左下方）
			this.drill_RATW_moveDiagonally(d,dd);
		}else{
			this.drill_RATW_moveStraight(d);
		}
	}else{
		
		// > 检查上侧
		d = this.drill_RATW_getDirectionRight90( d );
		if( this.drill_RATW_canPass(this._x, this._y, d) ){
			var xx = $gameMap.roundXWithDirection(this._x, d);
			var yy = $gameMap.roundYWithDirection(this._y, d);
			var dd = this.drill_RATW_getDirectionLeft90( d );
			if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（左上方）
				this.drill_RATW_moveDiagonally(d,dd);
			}else{
				this.drill_RATW_moveStraight(d);
			}
		}else{
			
			// > 检查右侧
			d = this.drill_RATW_getDirectionRight90( d );
			if( this.drill_RATW_canPass(this._x, this._y, d) ){
				var xx = $gameMap.roundXWithDirection(this._x, d);
				var yy = $gameMap.roundYWithDirection(this._y, d);
				var dd = this.drill_RATW_getDirectionLeft90( d );
				if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（右上方）
					this.drill_RATW_moveDiagonally(d,dd);
				}else{
					this.drill_RATW_moveStraight(d);
				}
			}else{
				
				// > 检查下侧
				d = this.drill_RATW_getDirectionRight90( d );
				if( this.drill_RATW_canPass(this._x, this._y, d) ){
					var xx = $gameMap.roundXWithDirection(this._x, d);
					var yy = $gameMap.roundYWithDirection(this._y, d);
					var dd = this.drill_RATW_getDirectionLeft90( d );
					if( this.drill_RATW_canPass( xx, yy, dd ) ){ //（右下方）
						this.drill_RATW_moveDiagonally(d,dd);
					}else{
						this.drill_RATW_moveStraight(d);
					}
				}
			}
		}
	}
};
//==============================
// * 判断条件 - 方向可通行
//==============================
Game_Character.prototype.drill_RATW_canPass = function( x, y, d ){
	return this.canPass( x, y, d );
};
//==============================
// * 移动 - 直线移动
//==============================
Game_Character.prototype.drill_RATW_moveStraight = function( d ){
	this.moveStraight(d);
};
//==============================
// * 移动 - 斜向移动
//
//			说明：	参数为任意两个方向，只要方向不是相反方向即可。
//==============================
Game_Character.prototype.drill_RATW_moveDiagonally = function( d1, d2 ){
	if( d1 == 2 && d2 == 8 ){ return; }
	if( d1 == 8 && d2 == 2 ){ return; }
	if( d1 == 4 && d2 == 6 ){ return; }
	if( d1 == 6 && d2 == 4 ){ return; }
	
	if( d1 == 2 || d1 == 8 ){
		this.moveDiagonally( d2, d1 );
	}else{
		this.moveDiagonally( d1, d2 );
	}
};
//==============================
// * 方向 - 获取右转90°的方向
//==============================
Game_Character.prototype.drill_RATW_getDirectionRight90 = function( d ){
	if( d == 2 ){ return 4; }
	if( d == 4 ){ return 8; }
	if( d == 6 ){ return 2; }
	if( d == 8 ){ return 6; }
	return d;
};
//==============================
// * 方向 - 获取左转90°的方向
//==============================
Game_Character.prototype.drill_RATW_getDirectionLeft90 = function( d ){
	if( d == 2 ){ return 6; }
	if( d == 4 ){ return 2; }
	if( d == 6 ){ return 8; }
	if( d == 8 ){ return 4; }
	return d;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_RouteAlongTheWall = false;
		alert(
			"【Drill_RouteAlongTheWall.js 移动路线 - 贴墙移动路线】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfMoveRoute 移动路线-移动路线核心"
		);
}
