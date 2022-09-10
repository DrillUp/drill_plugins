//=============================================================================
// Drill_X_EventTextLine.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        行走图 - 事件漂浮文字批注线[扩展]
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_EventTextLine +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以给事件漂浮文字添加批注线。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_EventText             行走图-事件漂浮文字★★v1.9及以上★★
 *     需要该插件才能绘制批注线。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件漂浮文字。
 * 2.具体可以去看看 "7.行走图 > 关于事件漂浮文字.docx"。
 * 细节：
 *   (1.批注线会自适应 事件漂浮文字 的文本宽度、偏移量。
 *      并且能自定义批注线的模式、厚度。
 * 设计：
 *   (1.最好先让事件漂浮文字偏移一段距离，再设置批注线。
 *      这样能比较好地看见折线效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要添加下面的事件注释：
 *
 * 事件注释：=>事件漂浮文字批注线 : 显示线
 * 事件注释：=>事件漂浮文字批注线 : 隐藏线
 * 
 * 1.该设置不跨事件页，切换事件页后默认隐藏，需要重新添加注释来开启。
 * 2.添加事件注释即可生成线。
 *   为了更好地表现出批注线，建议设置 漂浮文字偏移 大于50像素。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 属性设置
 * 你可以添加下面的事件注释，修改批注线的属性：
 * 
 * 事件注释：=>事件漂浮文字批注线 : 属性设置 : 线厚度[1]
 * 事件注释：=>事件漂浮文字批注线 : 属性设置 : 线颜色[#ffffff]
 * 事件注释：=>事件漂浮文字批注线 : 属性设置 : 连接位置 : 最左
 * 事件注释：=>事件漂浮文字批注线 : 属性设置 : 连接位置 : 居中
 * 事件注释：=>事件漂浮文字批注线 : 属性设置 : 连接位置 : 最右
 * 
 * 1.注意 文字的偏移与线的连接位置 关系即可。
 * 2."线颜色[#ffffff]"中，需填入对应的颜色代码。
 *   找相关颜色的代码可以去看看：http://tool.oschina.net/commons?type=3
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以通过插件指令临时修改属性：
 * 
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 显示线
 * 插件指令：>事件漂浮文字批注线 : 事件[5] : 显示线
 * 插件指令：>事件漂浮文字批注线 : 事件变量[5] : 显示线
 * 
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 显示线
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 隐藏线
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 属性设置 : 线厚度[1]
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 属性设置 : 线颜色[#ffffff]
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 属性设置 : 连接位置 : 最左
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 属性设置 : 连接位置 : 居中
 * 插件指令：>事件漂浮文字批注线 : 本事件 : 属性设置 : 连接位置 : 最右
 * 
 * 1.前半部分（本事件）和 后半部分（显示线）
 *   的参数可以随意组合。一共有3*7种组合方式。
 * 2.修改的设置离开当前地图后将失效。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   20个事件，添加批注线，分别放置测试。
 * 测试结果：   200个事件的地图中，消耗为：【6.09ms】
 *              100个事件的地图中，消耗为：【5.81ms】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件基于 事件漂浮文字，消耗与含设置的事件数量有关，但消耗并不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * @param 默认线厚度
 * @type number
 * @min 1
 * @desc 默认情况下，批注线的厚度。
 * @default 1
 * 
 * @param 默认线颜色
 * @desc 默认情况下，批注线的颜色。填入相关的颜色代码。
 * @default #ffffff
 *
 * @param 默认连接位置
 * @type select
 * @option 最左
 * @value 最左
 * @option 居中
 * @value 居中
 * @option 最右
 * @value 最右
 * @desc 批注线默认的连接位置。
 * @default 最左
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XETL（X_Event_Text_Line）
//		临时全局变量	DrillUp.g_XETL_xxx
//		临时局部变量	this._drill_XETL_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	4.86ms（update）5.81ms（drill_XETL_updateLineRefresh）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件漂浮文字批注线：
//				->创建画布
//				->画布画线
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_EventTextLine = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_EventTextLine');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_XETL_thickness = Number(DrillUp.parameters["默认线厚度"] || 1 );
	DrillUp.g_XETL_color = String(DrillUp.parameters["默认线颜色"] || "#ffffff");
	DrillUp.g_XETL_mode = String(DrillUp.parameters["默认连接位置"] || "最左");
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventText ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_XETL_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XETL_pluginCommand.call(this, command, args);
	if( command === ">事件漂浮文字批注线" ){
		
		/*-----------------对象组获取------------------*/
		var e_id = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "本事件" ){
				var e_id = this._eventId;
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				var e_id = Number(temp1);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				var e_id = $gameVariables.value(Number(temp1));
			}
		}
		
		/*-----------------指令设置------------------*/
		if( e_id != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "显示线" ){
				if( $gameMap.drill_XETL_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETL_setEnabled( true );
			}
			if( type == "隐藏线" ){
				if( $gameMap.drill_XETL_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_XETL_setEnabled( false );
			}
		}
		if( e_id != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "属性设置" ){
				if( $gameMap.drill_XETL_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				if( temp1.indexOf("线厚度[") != -1 ){
					temp1 = temp1.replace("线厚度[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETL_setThickness( temp1 );
				}
				if( temp1.indexOf("线颜色[") != -1 ){
					temp1 = temp1.replace("线颜色[","");
					temp1 = temp1.replace("]","");
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETL_setColor( temp1 );
				}
			}
		}
		if( e_id != null && args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "属性设置" && temp1 == "连接位置" ){
				if( temp2 == "最左" || temp2 == "居中" || temp2 == "最右" ){
					if( $gameMap.drill_XETL_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event(e_id);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_XETL_setLineMode( temp2 );
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_XETL_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_X_EventTextLine.js 行走图 - 事件漂浮文字批注线[扩展]】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 事件 - 注释初始化
//==============================
var _drill_XETL_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_XETL_c_setupPageSettings.call(this);
	this.drill_XETL_refreshBackground();
}
Game_Event.prototype.drill_XETL_refreshBackground = function() {
	
	// > 默认情况下，关闭显示线
	if( this._drill_ET_controller != null ){
		this._drill_ET_controller.drill_XETL_setEnabled( false );
	}
	
	var page = this.page();
    if( page ){
		this.list().forEach(function(l){
			if( l.code === 108 ){
				var l_str = l.parameters[0];
				
				/*-----------------注释------------------*/
				var args = l_str.split(/[ ]+/);	
				var command = args.shift();
				if( command == "=>事件漂浮文字批注线" ){
					if( args.length == 2 ){
						var type = String(args[1]);
						if( type == "显示线" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETL_setEnabled( true );
						}
						if( type == "隐藏线" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETL_setEnabled( false );
						}
					}
					if( args.length == 4 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						if( type == "属性设置" ){
							if( temp1.indexOf("线厚度[") != -1 ){
								temp1 = temp1.replace("线厚度[","");
								temp1 = temp1.replace("]","");
								temp1 = Number(temp1);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETL_setThickness( temp1 );
							}
							if( temp1.indexOf("线颜色[") != -1 ){
								temp1 = temp1.replace("线颜色[","");
								temp1 = temp1.replace("]","");
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETL_setColor( temp1 );
							}
						}
					}
					if( args.length == 6 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						var temp2 = String(args[5]);
						if( type == "属性设置" && temp1 == "连接位置" ){
							if( temp2 == "最左" || temp2 == "居中" || temp2 == "最右" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETL_setLineMode( temp2 );
							}
						}
					}
				};  
			};
		}, this);
    }
}

//=============================================================================
// ** 漂浮文字控制器（继承）
//=============================================================================
//==============================
// * 控制器 - 初始化（继承）
//==============================
var _drill_XETL_ET_c_initData = Drill_ET_Controller.prototype.drill_initData;
Drill_ET_Controller.prototype.drill_initData = function(){
	_drill_XETL_ET_c_initData.call(this);
	var data = this._drill_data;
	
	// > 默认值
	if( data['line_enable'] == undefined ){ data['line_enable'] = false };
	if( data['line_thickness'] == undefined ){ data['line_thickness'] = DrillUp.g_XETL_thickness };
	if( data['line_color'] == undefined ){ data['line_color'] = DrillUp.g_XETL_color };
	if( data['line_mode'] == undefined ){ data['line_mode'] = DrillUp.g_XETL_mode };
}
//==============================
// * 控制器 - 设置可用（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETL_setEnabled = function( enable ){
	var data = this._drill_data;
	data['line_enable'] = enable;
}
//==============================
// * 控制器 - 设置厚度（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETL_setThickness = function( thickness ){
	var data = this._drill_data;
	data['line_thickness'] = thickness;
}
//==============================
// * 控制器 - 设置颜色（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETL_setColor = function( color ){
	var data = this._drill_data;
	data['line_color'] = color;
}
//==============================
// * 控制器 - 设置连接位置（接口）
//==============================
Drill_ET_Controller.prototype.drill_XETL_setLineMode = function( mode ){
	var data = this._drill_data;
	data['line_mode'] = mode;
}


//=============================================================================
// ** 漂浮文字贴图（继承）
//=============================================================================
//==============================
// * 文字贴图 - 初始化（继承）
//==============================
var _drill_XETL_ET_sp_initialize = Drill_ET_WindowSprite.prototype.initialize;
Drill_ET_WindowSprite.prototype.initialize = function( obj_event ){
    _drill_XETL_ET_sp_initialize.call( this,obj_event );
	
	// > 线贴图
	this._drill_XETL_curSprite = null;			//线贴图
	this._drill_XETL_lastWidth = -1;			//宽度标记
	this._drill_XETL_lastOffsetX = -1;			//偏移x标记
	this._drill_XETL_lastOffsetY = -1;			//偏移y标记
};
//==============================
// * 文字贴图 - 销毁（继承）
//==============================
var _drill_XETL_ET_sp_destroy_Private = Drill_ET_WindowSprite.prototype.drill_ET_destroy_Private;
Drill_ET_WindowSprite.prototype.drill_ET_destroy_Private = function(){
    _drill_XETL_ET_sp_destroy_Private.call( this );
	
	// > 移除层
	this.removeChild(this._drill_XETL_curSprite);
	
	// > 断开连接
	this._drill_XETL_curSprite = null;
}

//==============================
// * 文字贴图 - 帧刷新
//==============================
var _drill_XETL_ET_sp_update = Drill_ET_WindowSprite.prototype.update;
Drill_ET_WindowSprite.prototype.update = function() {
	_drill_XETL_ET_sp_update.call(this);
	if( this._drill_controller == undefined ){ return; }
	this.drill_XETL_updateSpriteRebuild();		//帧刷新 - 批注线贴图
	if( this._drill_XETL_curSprite == undefined ){ return; }
	this.drill_XETL_updateLineRefresh();		//帧刷新 - 画布刷新
	this.drill_XETL_updatePosition();			//帧刷新 - 位置
}
//==============================
// * 帧刷新 - 批注线贴图
//==============================
Drill_ET_WindowSprite.prototype.drill_XETL_updateSpriteRebuild = function() {
	var d_data = this._drill_controller._drill_data;
	if( d_data['line_enable'] == false ){
		
		// > 关闭时，隐藏贴图
		if( this._drill_XETL_curSprite != undefined ){
			this._drill_XETL_curSprite.visible = false;
		}
		return;
	}
	
	// > 没有贴图时，创建
	if( this._drill_XETL_curSprite == undefined ){
		this._drill_XETL_curSprite = new Sprite();
		this._drill_XETL_curSprite.anchor.x = 0.0;
		this._drill_XETL_curSprite.anchor.y = 0.0;
		this.addChildAt( this._drill_XETL_curSprite, 0 );
	}
	
	// > 保持跟进
	this._drill_XETL_curSprite.visible = true;
}
//==============================
// * 帧刷新 - 批注线贴图
//==============================
Drill_ET_WindowSprite.prototype.drill_XETL_updatePosition = function() {
	var d_data = this._drill_controller._drill_data;
	
	// > 位移
	var xx = 0;
	var yy = 0;
	
	// > 画布偏移位置（由于画布锚点固定为左上角，所以在 漂浮文字偏移 时，需要确保画布能包裹 文字+头顶基点 ）
	if( this._drill_XETL_lastOffsetX > 0 ){
		xx = -1* this._drill_XETL_lastOffsetX;
	}
	if( this._drill_XETL_lastOffsetY > 0 ){
		yy = -1* this._drill_XETL_lastOffsetY;
	}
	
	this._drill_XETL_curSprite.x = xx;
	this._drill_XETL_curSprite.y = yy;
}
//==============================
// * 帧刷新 - 画布刷新
//==============================
Drill_ET_WindowSprite.prototype.drill_XETL_updateLineRefresh = function() {
	var d_data = this._drill_controller._drill_data;
	
	// > 无变化时不刷新
	if( d_data['x'] == this._drill_XETL_lastOffsetX &&
		d_data['y'] == this._drill_XETL_lastOffsetY &&
		this.width == this._drill_XETL_lastWidth ){
		return;
	}
	this._drill_XETL_lastOffsetX = d_data['x'];
	this._drill_XETL_lastOffsetY = d_data['y'];
	this._drill_XETL_lastWidth = this.width;
	
	
	// > 画布重建
	var ww = this.width  + Math.abs( d_data['x'] );
	var hh = this.height + Math.abs( d_data['y'] );
	var temp_bitmap = new Bitmap( ww, hh );
	//temp_bitmap.fillAll("#ff5555");
	
	// > 画布偏移位置（由于画布锚点固定为左上角，所以在 漂浮文字偏移 时，需要确保画布能包裹 文字+头顶基点 ）
	var xOffset = 0;
	var yOffset = 0;
	if( this._drill_XETL_lastOffsetX > 0 ){
		xOffset = this._drill_XETL_lastOffsetX;
	}
	if( this._drill_XETL_lastOffsetY > 0 ){
		yOffset = this._drill_XETL_lastOffsetY;
	}
	
	// > 连接位置
	var xConnect = 0;
	var yConnect = 0;
	if( d_data['line_mode'] == "最左" ){
		xConnect = 0;
		yConnect = this.height;
	}
	if( d_data['line_mode'] == "居中" ){
		xConnect = this.width*0.5;
		yConnect = this.height;
	}
	if( d_data['line_mode'] == "最右" ){
		xConnect = this.width;
		yConnect = this.height;
	}
	
	// > 文本横线
	var start_x = xOffset + 0;
	var start_y = yOffset + this.height;
	temp_bitmap.drill_XETL_drawLine( start_x, start_y, start_x + this.width, start_y, d_data['line_thickness'], d_data['line_color'] );
	
	// > 连接线
	var start_x = xOffset + xConnect;
	var start_y = yOffset + yConnect;
	var end_x = xOffset - d_data['x'];	//（减去偏移）
	var end_y = yOffset - d_data['y'];
	if( d_data['align'] == "左对齐" ){
		end_x += 0;
		end_y += this.height*0.5;
	}
	if( d_data['align'] == "居中" ){
		end_x += this.width*0.5;
		end_y += this.height*0.5;
	}
	if( d_data['align'] == "右对齐" ){
		end_x += this.width*1.0;
		end_y += this.height*0.5;
	}
	temp_bitmap.drill_XETL_drawLine( start_x, start_y, end_x, end_y, d_data['line_thickness'], d_data['line_color'] );
	
	// > 设置画布
	this._drill_XETL_curSprite.bitmap = temp_bitmap;
}
//==============================
// * 画布 - 绘制 - 线段
//==============================
Bitmap.prototype.drill_XETL_drawLine = function( x1, y1, x2, y2, width, color ){
    var context = this._context;
    context.save();
	
	// > 线段属性
    context.strokeStyle = color;
    context.lineWidth = width;
    context.lineJoin = 'round';
	
	// > 画线
    context.moveTo( x1, y1 );
    context.lineTo( x2, y2 );
    context.stroke();
	
    context.restore();
    this._setDirty();
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_EventTextLine = false;
		alert(
			"【Drill_X_EventTextLine.js 行走图 - 事件漂浮文字批注线[扩展]】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventText 行走图-事件漂浮文字"
		);
}



