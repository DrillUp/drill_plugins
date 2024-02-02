//=============================================================================
// Drill_LayerSlipperyTile.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        图块 - 物体滑行
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerSlipperyTile +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能使得地图中指定的区域或者图块表面完全光滑，走在上面会一直滑行，
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 可作用于：
 *   - Drill_EventActionSequenceAutomation   行走图-GIF动画序列全标签播放
 *     如果你使用了动画序列，可以自定义"滑行"和"滑行静止"的动画。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于图块。
 * 2.更多详细的介绍，去看看 "26.图块 > 关于物体滑行.docx"。
 * 3.插件需要将指定 地形标志 或 图块R区域 设为光滑地面，
 *   去看看 "26.图块 > 关于插件与图块R占用说明.xlsx"
 * 细节：
 *   (1.滑行过程不能改变方向。
 *   (2.斜向滑行时，可以设置是否穿透对角两边的阻碍。
 *   (3.飞行的物体（在人物上方）不会滑行。
 * 组合：
 *   (1.玩家可以举着花盆滑行。
 *   (2.玩家可以在滑行时跳跃。
 *   (3.玩家可以在滑行时改变移动速度。
 * 行走图：
 *   (1.默认行走图会选择播放 移动动画的第3帧（踏出一只脚）。
 *   (2.如果你使用了动画序列，你可以自定义"滑行"和"滑行静止"的动画。
 *      这两个动画可以是动态的，比如小爱丽丝站不稳/打滑的动作。
 *      详细内容去看看："7.行走图 > 关于行走图GIF动画序列.docx"
 * 移动路线：
 *   (1.滑行时，大部分移动路线指令是被暂停的，包含 移动和转向 指令。
 *      如果滑行时需要强制转向，需要使用 插件指令或转向毯。
 *     （事件指令的转向会让角色暂停滑行，如果玩家一直按住方向键，会无视强制转向。）
 *   (2.注意，移动路线的 脚本 也是被暂停的，只有滑行结束后才会执行。
 * 转向毯：
 *   (1.由于事件指令无法实现手动控制 事件与事件 的触发关系，
 *      所以插件专门提供了 物体滑行转向毯 的功能，
 *      接触到转向毯的玩家或事件，能自动转向。
 * 设计：
 *   (1.物体滑行功能中最常见的是冰面关卡。
 *      你可以组合 物体滑行+地形伤害 形成撞刺即死的迷宫。
 *   (2.除了光滑的冰面，当然还有本身就是大冰块的事件。
 *      大冰块事件可以用 制动开关 制作，具体去看"26.图块 > 关于物体滑行.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以使用下面插件指令：
 * 
 * 插件指令：>物体滑行 : 玩家 : 开启滑行
 * 插件指令：>物体滑行 : 本事件 : 开启滑行
 * 插件指令：>物体滑行 : 事件[10] : 开启滑行
 * 插件指令：>物体滑行 : 事件变量[21] : 开启滑行
 * 
 * 插件指令：>物体滑行 : 玩家 : 开启滑行
 * 插件指令：>物体滑行 : 玩家 : 关闭滑行
 * 
 * 1.前半部分（玩家）和 后半部分（开启滑行）的参数可以随意组合。
 *   一共有4*2种组合方式。
 * 2."关闭滑行"后，玩家/事件在光滑图块上行走时，将不会处于滑行状态。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 图块注释
 * 除了指定R区域为光滑的地面，你可以直接在图块中设置指定的图块为光滑地面。
 * 
 * 图块注释：=>光滑地面:0
 * 图块注释：=>光滑地面:0,1,2
 * 
 * 1.指定参数对应的 地形标志 将为光滑表面。你可以设置0-7。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 转向毯
 * 你可以设置转向毯事件，任何滑行中接触了转向毯的事件/玩家，都会被转向。
 * 
 * 事件注释：=>物体滑行转向毯 : 转向上方
 * 事件注释：=>物体滑行转向毯 : 转向下方
 * 事件注释：=>物体滑行转向毯 : 转向左方
 * 事件注释：=>物体滑行转向毯 : 转向右方
 * 事件注释：=>物体滑行转向毯 : 转向左上方
 * 事件注释：=>物体滑行转向毯 : 转向左下方
 * 事件注释：=>物体滑行转向毯 : 转向右上方
 * 事件注释：=>物体滑行转向毯 : 转向右下方
 * 
 * 1.添加注释后，指定事件将具有转向毯功能，滑行过程中接触到转向毯的 事件或
 *   玩家 将会被强制转向。
 * 2.转向毯会扭转所有 非自己 的事件、玩家。
 *   另外，转向毯事件本身也是可以滑行的，前提是自己主动移动。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 强制转向
 * 你可以使用下面插件指令：
 * 
 * 插件指令：>物体滑行 : 玩家 : 转向上方
 * 插件指令：>物体滑行 : 本事件 : 转向上方
 * 插件指令：>物体滑行 : 事件[10] : 转向上方
 * 插件指令：>物体滑行 : 事件变量[21] : 转向上方
 * 
 * 插件指令：>物体滑行 : 玩家 : 转向上方
 * 插件指令：>物体滑行 : 玩家 : 转向下方
 * 插件指令：>物体滑行 : 玩家 : 转向左方
 * 插件指令：>物体滑行 : 玩家 : 转向右方
 * 插件指令：>物体滑行 : 玩家 : 转向左上方
 * 插件指令：>物体滑行 : 玩家 : 转向左下方
 * 插件指令：>物体滑行 : 玩家 : 转向右上方
 * 插件指令：>物体滑行 : 玩家 : 转向右下方
 * 
 * 1.前半部分（玩家）和 后半部分（开启滑行）的参数可以随意组合。
 *   一共有4*8种组合方式。
 * 2."转向上方"是指玩家/事件处于滑行状态时，控制其立即转向别的方向滑行。
 *   如果没有处于滑行状态，则插件指令没有效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取数据
 * 你可以通过插件指令获取到 滑行过程 相关的数据。
 * 
 * 插件指令：>物体滑行 : 事件[21] : 获取上一次滑行位置 : 变量[25,26]
 * 插件指令：>物体滑行 : 事件[21] : 脚下是否为光滑地面 : 开关[21]
 * 
 * 1.插件指令与前面的指令同样可以组合，有4*2种组合方式。
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
 * 时间复杂度： o(n^2)*o(移动路线) 每帧
 * 测试方法：   去图块管理层进行性能测试。
 * 测试结果：   200个事件的地图中，消耗为：【86.45ms】
 *              100个事件的地图中，消耗为：【50.08ms】
 *               50个事件的地图中，消耗为：【37.56ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件实际测试中的值不是很稳定。插件对事件和玩家都有效，由于事件和
 *   玩家每次都要检查自己脚下是否为光滑地面，所以消耗会时高时低。
 * 3.由于部分事件具备转向毯功能，这里还要确保转向毯与事件接触后，事件
 *   能够转向，所以消耗进一步增加。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了光滑图块中靠边的转向地毯，在玩家持续按方向键时不能转向的bug。
 * 优化了计算结构。
 * [v1.2]
 * 修改了插件的类型。优化了内部算法细节。
 * [v1.3]
 * 修改了插件分类。
 * [v1.4]
 * 优化了内部结构。
 * 
 * 
 * 
 * @param 是否修正区域判定
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 修正后，超过一半的身体处于光滑地面时，则算作该物体处于光滑地面中。
 * @default true
 * 
 * @param 光滑地面区域列表
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，地图中设置的R区域将会变为光滑区域。
 * @default []
 * 
 * @param 滑行动作帧
 * @type number
 * @min 0
 * @desc 滑行时角色的行走动作。根据当前角色的行走图的位置开始，0-左，1-中，2-右，>2会选择往右的其它行走图。
 * @default 2
 * 
 * @param 是否锁定滑行速度
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc 锁定后，所有物体以固定的速度滑行。
 * @default false
 * 
 * @param 滑行速度
 * @parent 是否锁定滑行速度
 * @type number
 * @min 1
 * @desc 滑行时会改变到指定速度，填入1-6，4为标准速度。
 * @default 4
 * 
 * @param 斜向滑行是否穿透两边阻碍
 * @type boolean
 * @on 穿透
 * @off 不穿透
 * @desc 假设向左上方滑行，左上方可以通行，但是左方和上方两处都有阻碍，设置不穿透则会被阻挡。
 * @default true
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		LST (Layer_Slippery_Tile)
//		临时全局变量	DrillUp.drill_LST_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(移动路线) 每帧
//		★性能测试因素	图块管理层
//		★性能测试消耗	50.08ms（drill_LST_isSlippery函数） 37.56ms（drill_LST_isOnSlipperyFloor函数） 150.81ms 120.52ms（200事件中）
//		★最坏情况		暂无
//		★备注			这里很难确定是不是光滑运算的问题，在光滑图块关卡中200事件，帧数保持在 6 帧左右。（Drill_EventContinuedEffect 有 508.46ms）
//		
//		★优化记录
//			2022-6-26优化
//				将 drill_LST_isOnSlipperyFloor 变成单个状态位的函数。防止多次被调用时消耗大量性能。
//			2023-9-1优化
//				去掉了状态位设置，改成了 图块矩阵 的模式，直接获取图块值。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆图块注释
//			->☆事件注释
//				->转向毯
//			
//			->☆光滑地面图块矩阵
//				->全图是否有光滑地面（开放函数）
//				->是否为光滑地面区域（开放函数）
//			->☆DEBUG光滑地面值
//				->显示/隐藏光滑地面值
//			->稀疏矩阵【Drill_LST_SparseMatrix】
//			
//			->☆行走图帧控制
//			
//			->☆物体滑行控制
//				->捕获属性
//					->滑行状态
//					->滑行方向
//					->滑行前位置X
//					->滑行前位置Y
//				->是否在光滑地面上
//				->滑行控制
//					->事件 帧刷新
//					->玩家 帧刷新
//					->开始滑行前位置记录
//				->物体约束
//					->关闭鼠标目的地
//					->关闭按键控制（无法转向）
//					->速度控制
//					->禁止奔跑
//				x->滑行掉入深渊后回到滑行前位置
//			->☆可通行控制
//				->斜向穿透
//			->☆移动路线暂停
//			
//			->☆转向毯容器
//			->☆转向毯
//		
//		
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//
//		★其它说明细节：
//			1.2023/4/24 这里我没有注意到 滑行过程 中需要暂停移动路线的情况。
//			  由于移动过程中，移动路线时阻塞的，而一直滑行不经过移动路线的话，是一直阻塞的。
//			  这里我强制写了个暂停移动路线的功能。
//			  不知道会不会对后期有什么特殊影响。（在滑行时，isMoving的时候，可以执行部分指令）
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
	DrillUp.g_LST_PluginTip_curName = "Drill_LayerSlipperyTile.js 图块-物体滑行";
	DrillUp.g_LST_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_LST_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_LST_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerSlipperyTile = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerSlipperyTile');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_LST_fix = String(DrillUp.parameters["是否修正区域判定"] || "true") === "true";
	if( DrillUp.parameters["光滑地面区域列表"] != undefined &&
		DrillUp.parameters["光滑地面区域列表"] != "" ){
		DrillUp.g_LST_regionTank = JSON.parse( DrillUp.parameters["光滑地面区域列表"] || [] );
	}else{
		DrillUp.g_LST_regionTank = [];
	}
	
	DrillUp.g_LST_act = Number(DrillUp.parameters["滑行动作帧"] || 2);
	
	DrillUp.g_LST_speedLock = String(DrillUp.parameters["是否锁定滑行速度"] || "false") === "true";
	DrillUp.g_LST_speed = Number(DrillUp.parameters["滑行速度"] || 4);
	
	DrillUp.g_LST_diagonallyThrough = String(DrillUp.parameters["斜向滑行是否穿透两边阻碍"] || "true") == "true";
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令
//==============================
var _drill_LST_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LST_pluginCommand.call(this, command, args);
	if( command === ">物体滑行" ){
		
		/*-----------------DEBUG------------------*/
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "DEBUG-显示光滑地面值" ){	//（对象组获取 有个 return，所以要放前面）
				$gameTemp._drill_LST_debug_showSlipperyId = true;
			}
			if( temp1 == "DEBUG-隐藏光滑地面值" ){
				$gameTemp._drill_LST_debug_clearSlipperyId = true;
			}
		}
		
		/*-----------------对象组获取------------------*/
		var chars = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				chars = [ e ];
			}
			if( chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_LST_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				chars = [ e ];
			}
			if( chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_LST_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				chars = [ e ];
			}
			
			if( chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				chars = [ $gamePlayer ];
			}
		}
		if( chars == null ){ return; }
		
		/*-----------------事件滑行------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type === "启用滑行" || type === "开启滑行" || type === "打开滑行" || type === "启动滑行" ){
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_enable'] = true;
				}
			}
			if( type === "关闭滑行" || type === "禁用滑行" ){
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_enable'] = false;
				}
			}
			
			if( type === "转向上方" ){
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 8;
				}
			}
			if (type === "转向下方") {
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 2;
				}
			}
			if (type === "转向左方") {
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 4;
				}
			}
			if (type === "转向右方") {
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 6;
				}
			}
			if (type === "转向左上方") {
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 48;
				}
			}
			if (type === "转向左下方") {
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 42;
				}
			}
			if (type === "转向右上方") {
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 68;
				}
			}
			if (type === "转向右下方") {
				for( var k=0; k < chars.length; k++ ){
					chars[k]['_drill_LST_slidingDirection'] = 62;
				}
			}
		}
		
		/*-----------------滑行数据------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type === "获取上一次滑行位置" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[，,]/);
				$gameVariables.setValue( Number(temp_arr[0]), chars[0]._drill_LST_lastX );
				$gameVariables.setValue( Number(temp_arr[1]), chars[0]._drill_LST_lastY );
			}
			if( type === "脚下是否为光滑地面" ){
				temp1 = temp1.replace("开关[","");
				temp1 = temp1.replace("]","");
				$gameSwitches.setValue( Number(temp1), chars[0].drill_LST_isOnSlipperyFloor() );
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_LST_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_LST_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆图块注释
//=============================================================================
//==============================
// * 图块注释 - 初始化绑定
//==============================
var _drill_LST_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	var success = _drill_LST_isDatabaseLoaded.call( this );
	if( success ){
		if( this._drill_LST_readTilesetsFinished == undefined ){
			this._drill_LST_readTilesetsFinished = true;
			this.drill_LST_readTilesets();
		}
	}
	return success;
}
//==============================
// * 图块注释 - 初始化
//==============================
DataManager.drill_LST_readTilesets = function(){
	for( var n = 1; n < $dataTilesets.length; n++ ){
		var data_tileset = $dataTilesets[n];
		var note_list = data_tileset.note.split(/[\r\n]+/);
		
		// > 光滑地面 图块注释标记
		data_tileset['_drill_LST_slipTileTag'] = [];
		
		// > 注释解析
		for( var i = 0; i < note_list.length; i++ ){
			var args = note_list[i].split(/[:：]+/);
			var command = args.shift();
			if( command == "=>光滑地面"){
				
				if( args.length == 1 ){
					var temp1 = String(args[0]);
					var data_str_list = temp1.split(",");
					var result_data = [];
					for( var j = 0; j < data_str_list.length; j++ ){
						result_data.push( Number(data_str_list[j]) );
					}
					data_tileset['_drill_LST_slipTileTag'] = data_tileset['_drill_LST_slipTileTag'].concat( result_data );
				}
			}
		}
	}
}


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_LST_e_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_LST_e_initMembers.call(this);
	this._drill_LST_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_LST_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_LST_setupPage.call(this);
    this.drill_LST_setupBlanket();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_LST_setupBlanket = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_LST_isFirstBirth == true ){ 
		this._drill_LST_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_LST_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_LST_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_LST_readPage = function( page_list ){	
	page_list.forEach( function(l) {
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			
			/*-----------------事件注释 - 转向毯------------------*/
			if( command == "=>物体滑行转向毯" ){
				if( args.length == 2 ){		//=>物体滑行转向毯 : 转向上方
					var temp1 = String(args[1]);
					if( temp1 == "转向上方" ){
						this['_drill_LST_blanketDir'] = 8;
					}
					if( temp1 == "转向下方" ){
						this['_drill_LST_blanketDir'] = 2;
					}
					if( temp1 == "转向左方" ){
						this['_drill_LST_blanketDir'] = 4;
					}
					if( temp1 == "转向右方" ){
						this['_drill_LST_blanketDir'] = 6;
					}
					if( temp1 == "转向左上方" ){
						this['_drill_LST_blanketDir'] = 48;
					}
					if( temp1 == "转向左下方" ){
						this['_drill_LST_blanketDir'] = 42;
					}
					if( temp1 == "转向右上方" ){
						this['_drill_LST_blanketDir'] = 68;
					}
					if( temp1 == "转向右下方" ){
						this['_drill_LST_blanketDir'] = 62;
					}
				}
			};
		};
	}, this);
};



//=============================================================================
// ** ☆光滑地面图块矩阵
//
//			说明：	> 此模块用于对所有 光滑地面 图块进行初始赋值（通过数字位代号）。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 光滑地面 - 全图是否有光滑地面（开放函数）
//==============================
Game_Map.prototype.drill_LST_noSlippery = function(){
	return this._drill_LST_sparseMatrix.drill_isEmptyMatrix();
}
//==============================
// * 光滑地面 - 是否为光滑地面区域（开放函数）
//==============================
Game_Map.prototype.drill_LST_isSlippery = function( x, y ){
	if( this.drill_LST_getSlipperyId( x, y ) == undefined ){
		return false;
	}else{
		return true;
	}
}
//==============================
// * 光滑地面 - 初始化绑定
//==============================
var _drill_LST_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LST_map_setup.call( this, mapId );
	this.drill_LST_refreshSlipperyId();
}
//==============================
// * 光滑地面 - 初始化
//
//			说明：	> 直接给所有图块赋值，获取到值后立刻能知道光滑地面的特殊属性。
//					  null为非光滑地面区域，非null为光滑地面区域。
//==============================
Game_Map.prototype.drill_LST_refreshSlipperyId = function(){
	
	// > 创建矩阵
	this._drill_LST_sparseMatrix = new Drill_LST_SparseMatrix();
	
	// > 图块错误，不赋值
	if( this.tileset() == undefined ){ return; }
	var tileset = this.tileset();
	
	// > 全图块遍历
	for( var x=0; x < this.width(); x++ ){
		for( var y=0; y < this.height(); y++ ){
			var value = null;
			
			// > 已赋值的光滑地面区域，跳过
			if( this.drill_LST_isSlippery( x, y ) ){ continue; }
			
			
			// > 光滑地面 R图块 标记
			var regionId = this.regionId( x, y )
			if( DrillUp.g_LST_regionTank.contains( String(regionId) ) ){
				value = 1;
			}
			
			// > 光滑地面 图块注释标记
			var tagId = this.terrainTag( x, y );
			var slip_tags = tileset['_drill_LST_slipTileTag'];
			if( slip_tags != undefined && 
				slip_tags.contains(tagId) ){
				value = 1;
			}
			
			// > 光滑地面 赋值
			if( value == null ){ continue; }
			this._drill_LST_sparseMatrix.drill_setValue( x, y, value );
		}
	}
	
}
//==============================
// * 光滑地面 - 获取光滑地面值（私有）
//==============================
Game_Map.prototype.drill_LST_getSlipperyId = function( x, y ){
	return this._drill_LST_sparseMatrix.drill_getValue( x, y );
}


//=============================================================================
// ** ☆DEBUG光滑地面值
//
//			说明：	> 此模块用于DEBUG显示图块以及光滑地面值。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG - 帧刷新绑定
//==============================
var _drill_LST_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_LST_debug_update.call(this);
	this.drill_LST_updateDebugCreateSprite();
	this.drill_LST_updateDebugSprite();
}
//==============================
// * DEBUG - 帧刷新
//==============================
Scene_Map.prototype.drill_LST_updateDebugCreateSprite = function() {
	
	// > DEBUG显示 光滑地面值
	if( $gameTemp._drill_LST_debug_showSlipperyId == true ){
		$gameTemp._drill_LST_debug_showSlipperyId = false;
		
		// > 清除旧贴图
		this.removeChild( $gameTemp._drill_LST_debug_sprite );
		$gameTemp._drill_LST_debug_sprite = null;
		
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		
		var temp_bitmap = new Bitmap( Graphics.boxWidth +tw*2, Graphics.boxHeight +th*2 );
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = temp_bitmap;
		temp_sprite._drill_curTime = 0;
		
		this.addChild( temp_sprite );
		$gameTemp._drill_LST_debug_sprite = temp_sprite;
	}
	// > DEBUG隐藏 光滑地面值
	if( $gameTemp._drill_LST_debug_clearSlipperyId == true ){
		$gameTemp._drill_LST_debug_clearSlipperyId = false;
		this.removeChild( $gameTemp._drill_LST_debug_sprite );
		$gameTemp._drill_LST_debug_sprite = null;
	}
}
//==============================
// * DEBUG - 帧刷新
//==============================
Scene_Map.prototype.drill_LST_updateDebugSprite = function() {
	if( $gameTemp._drill_LST_debug_sprite == null ){ return; }
	var temp_sprite = $gameTemp._drill_LST_debug_sprite;
	var temp_bitmap = temp_sprite.bitmap;
	var tw = $gameMap.tileWidth();
	var th = $gameMap.tileHeight();
	
	// > 计时器
	temp_sprite._drill_curTime += 1;
	if( temp_sprite._drill_curTime % 2 == 0 ){ return; }	//减少绘制次数
	
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
			if( $gameMap.drill_LST_isSlippery( xx, yy ) ){
				
				// > DEBUG图块绘制
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#ffffff" );	//边框
				temp_bitmap.clearRect( i*tw +2, j*th +2, tw -4, th -4 );
				temp_bitmap.paintOpacity = 100;							//背景颜色
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#ff00ff" );
				
				temp_bitmap.paintOpacity = 255;							//光滑地面值
				temp_bitmap.drawText(
					String( $gameMap.drill_LST_getSlipperyId( xx, yy ) ),
					i*tw, j*th + (xx%2) *th*0.5,
					tw, th*0.5, "center"
				);
			}
		}
	}
}


//=============================================================================
// ** 稀疏矩阵【Drill_LST_SparseMatrix】
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
function Drill_LST_SparseMatrix(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 稀疏矩阵 - 初始化
//==============================
Drill_LST_SparseMatrix.prototype.initialize = function(){
	this._drill_matrix = [];
};
//==============================
// * 稀疏矩阵 - 设置值（开放函数）
//==============================
Drill_LST_SparseMatrix.prototype.drill_setValue = function( x, y, value ){
	
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
Drill_LST_SparseMatrix.prototype.drill_getValue = function( x, y ){
	if( this._drill_matrix[x] == undefined ){ return null; }
	return this._drill_matrix[x][y];
};
//==============================
// * 稀疏矩阵 - 删除值（开放函数）
//==============================
Drill_LST_SparseMatrix.prototype.drill_removeValue = function( x, y, value ){
	this.drill_setValue( x, y, null );
};
//==============================
// * 稀疏矩阵 - 矩阵是否为空（开放函数）
//==============================
Drill_LST_SparseMatrix.prototype.drill_isEmptyMatrix = function(){
	
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
Drill_LST_SparseMatrix.prototype.drill_isEmptyArray = function( arr ){
	for( var i = arr.length-1; i >= 0; i-- ){	//（倒序遍历，更早跳出循环）
		if( arr[i] == null ){ continue; }
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆行走图帧控制
//
//			说明：	> 此模块专门控制 行走图 以及贴图。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图帧控制 - 滑行动作帧
//==============================
var _drill_LST_pattern = Game_CharacterBase.prototype.pattern;
Game_CharacterBase.prototype.pattern = function() {
	
	// > 固定帧数
	if( this.hasStepAnime() == false && this.drill_LST_isOnSlipperyFloor() ){
		return DrillUp.g_LST_act;
	}
	
	// > 动画序列
	//	（动画序列的帧不通过此函数执行，见 Drill_EventActionSequenceAutomation 的 drill_EASA_setAnnotation 注解函数）
	
	// > 原函数
	return _drill_LST_pattern.call(this);
}


//=============================================================================
// ** ☆物体滑行控制
//
//			说明：	> 此模块专门控制 物体滑行 相关功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_LST_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	_drill_LST_initialize.call(this);
	
	// > 自定义属性
	this['_drill_LST_enable'] = true;				//滑行开关
	
	// > 捕获属性
	this['_drill_LST_isSliding'] = false;			//滑行状态
	this['_drill_LST_slidingDirection'] = 0;		//滑行方向
	this['_drill_LST_lastX'] = 0;					//滑行前位置X
	this['_drill_LST_lastY'] = 0;					//滑行前位置Y
}
//==============================
// * 物体 - 捕获 滑行状态
//
//			说明：	> 此属性在帧刷新中根据情况赋值，随时变化 滑行状态 。
//==============================
Game_CharacterBase.prototype.drill_LST_isSliding = function(){ return this['_drill_LST_isSliding'] == true; }
Game_CharacterBase.prototype.drill_LST_setSlide = function( b ){ this['_drill_LST_isSliding'] = b; }
//==============================
// * 物体 - 捕获 滑行方向（正向）
//==============================
var _drill_LST_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function( d ){
	_drill_LST_moveStraight.call( this, d );
	this['_drill_LST_slidingDirection'] = d;
}
//==============================
// * 物体 - 捕获 滑行方向（斜向）
//==============================
var _drill_LST_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function( horz, vert ){
	_drill_LST_moveDiagonally.call( this, horz, vert );
	this['_drill_LST_slidingDirection'] = horz*10 + vert;
}
//==============================
// * 物体 - 是否在光滑地面上
//
//			说明：	> 此处直接判断，直接在 图块矩阵 上获取值，暂时不考虑中转存一个麻烦的状态位。
//==============================
Game_CharacterBase.prototype.drill_LST_isOnSlipperyFloor = function(){
	
	// > 没有光滑地面，不工作
	if( $gameMap.drill_LST_noSlippery() ){ return false; }
	
	// > 区域判定修正
	if( DrillUp.g_LST_fix == true ){
		return $gameMap.drill_LST_isSlippery( Math.floor(this._realX + 0.5), Math.floor(this._realY + 0.5) );
	}else{
		return $gameMap.drill_LST_isSlippery( this._x, this._y );
	}
}

//==============================
// * 滑行控制 - 事件 帧刷新
//==============================
var _drill_LST_e_update = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
	_drill_LST_e_update.call(this);
    this.drill_LST_updateSlippery();		//帧刷新 - 滑行控制
};
//==============================
// * 滑行控制 - 玩家 帧刷新
//==============================
var _drill_LST_p_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
	_drill_LST_p_update.call(this,sceneActive);
    this.drill_LST_updatePlayerSlippery();	//帧刷新 - 玩家控制
    this.drill_LST_updateSlippery();		//帧刷新 - 滑行控制
};
//==============================
// * 滑行控制 - 帧刷新
//
//			说明：	> 该刷新由子类选择调用，并不直接嵌套到update帧刷新中。
//==============================
Game_CharacterBase.prototype.drill_LST_updateSlippery = function() {
	
	// > 滑行不可用
	if( this['_drill_LST_enable'] != true ){
		this.drill_LST_setSlide( false );
		return;
	}
	
	// > 飞行物体的不会滑
	if( this._priorityType == 2 ){
		this.drill_LST_setSlide( false );
		return;
	}
	
	// > 光滑地面处理
    if( this.drill_LST_isOnSlipperyFloor() ){
		
		// > 移动过程中，不操作
		if( this.isMoving() ){
			
			
		// > 停止移动时
		}else{
			
			// > 若移动成功，则继续滑行
			if( this.isMovementSucceeded() ){
				if( this.drill_LST_isSliding() == false ){	//（开始滑行前位置记录）
					this['_drill_LST_lastX'] = this._x;	
					this['_drill_LST_lastY'] = this._y;	
				}
				this.drill_LST_setSlide( true );
				
			// > 若移动失败（撞墙），则停止滑行
			}else{
				this.drill_LST_setSlide( false );
			}
			
			// > 保持滑行移动
			if( this.drill_LST_isSliding() ){
				
				// > 上下左右滑行
				if( this['_drill_LST_slidingDirection'] < 10){
					this.moveStraight( this['_drill_LST_slidingDirection'] );
				
				// > 斜向滑行
				}else if(this['_drill_LST_slidingDirection'] == 42){
					this.moveDiagonally(4, 2);
				}else if(this['_drill_LST_slidingDirection'] == 62){
					this.moveDiagonally(6, 2);
				}else if(this['_drill_LST_slidingDirection'] == 48){
					this.moveDiagonally(4, 8);
				}else if(this['_drill_LST_slidingDirection'] == 68){
					this.moveDiagonally(6, 8);
				}
			}
		}
		
	// > 不在光滑地面时，停止滑行
    }else{
		this.drill_LST_setSlide( false );
	}
};
//==============================
// * 滑行控制 - 帧刷新 玩家控制
//==============================
Game_Player.prototype.drill_LST_updatePlayerSlippery = function() {
	
	// > 事件运行时，不滑（靠边的转向地毯会失效）
	//if( $gameMap.isEventRunning() ){ return; }
	
	// > 关闭鼠标目的地
    if( this.isMoving() == false && this.drill_LST_isOnSlipperyFloor() ){
		$gameTemp.clearDestination();	//（目的地长期滞留时，防止玩家滑行结束后立即反方向滑行）
	}
};

//==============================
// * 物体约束 - 关闭按键控制
//==============================
var _drill_LST_p_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
	
	// > 滑行时关闭输入
	if( this.drill_LST_isSliding() ){ return; }
	
	// > 原函数
	_drill_LST_p_moveByInput.call(this);
};
//==============================
// * 物体约束 - 速度控制
//==============================
var _drill_LST_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
Game_CharacterBase.prototype.realMoveSpeed = function() {
	
	// > 固定速度滑行
	if( DrillUp.g_LST_speedLock == true && this.drill_LST_isOnSlipperyFloor() ){
		return DrillUp.g_LST_speed;
	}
	
	// > 原函数
	return _drill_LST_realMoveSpeed.call(this);
}
//==============================
// * 物体约束 - 禁止奔跑
//==============================
var _drill_LST_c_isDashing = Game_CharacterBase.prototype.isDashing;
Game_CharacterBase.prototype.isDashing = function() {
	var is_dashing = _drill_LST_c_isDashing.call(this);		//（先判断，尽可能不要先执行 drill_LST_isOnSlipperyFloor，费性能）
	if( is_dashing == false ){ return false; }
	if( this.drill_LST_isOnSlipperyFloor() ){ return false; }
	return is_dashing;
}
//==============================
// * 物体约束 - 禁止奔跑（玩家）
//==============================
var _drill_LST_p_isDashing = Game_Player.prototype.isDashing;
Game_Player.prototype.isDashing = function() {
	var is_dashing = _drill_LST_p_isDashing.call(this);
	if( is_dashing == false ){ return false; }
	if( this.drill_LST_isOnSlipperyFloor() ){ return false; }
	return is_dashing;
}


//=============================================================================
// ** ☆可通行控制
//
//			说明：	> 此模块专门控制物体在图块的阻塞情况。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 斜向穿透 - 判断斜向可通行区域
//==============================
var _drill_LST_canPassDiagonally = Game_CharacterBase.prototype.canPassDiagonally;
Game_CharacterBase.prototype.canPassDiagonally = function( x, y, horz, vert ){
	
	// > 滑行中时穿透斜向阻碍
	if( DrillUp.g_LST_diagonallyThrough == true &&
		this.drill_LST_isSliding() && 
		this.drill_LST_isOnSlipperyFloor() ){
		var x2 = $gameMap.roundXWithDirection(x, horz);
		var y2 = $gameMap.roundYWithDirection(y, vert);
		return $gameMap.drill_LST_isAnyPassable(x2, y2);
		
	// > 正常斜向判断
	}else{
		return _drill_LST_canPassDiagonally.call(this,x, y, horz, vert);
	}
};
//==============================
// * 斜向穿透 - 判断图块可通行情况
//
//			说明：	> isPassable需要指定方向是否可通行，这里任意一个方向可通行则返回true。
//==============================
Game_Map.prototype.drill_LST_isAnyPassable = function( x, y ){
	return this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
};


//=============================================================================
// ** ☆移动路线暂停
//
//			说明：	> 此模块专门控制物体的 移动路线 ，在光滑地面上滑行时，物体的移动路线暂停。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 移动路线暂停 - 初始化
//==============================
var _drill_LST_mr_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_LST_mr_initialize.call(this);
	this['_drill_LST_moveRoutePause'] = false;		//移动路线暂停 标记
};
//==============================
// * 移动路线暂停 - 帧刷新
//==============================
var _drill_LST_mr_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_LST_mr_update.call(this);
	
	// > 滑行时，可执行部分移动路线指令（若不开这个，滑行过程一直不会停，只有离开光滑地面才能结束）
    if( this.drill_LST_isSliding() ){ 
		if( this._moveRouteForcing ){
			this.updateRoutineMove();
		}
	}
}
//==============================
// * 移动路线暂停 - 暂停条件
//
//			说明：	> 下列常量中，执行任意一个，都会被暂停。
//					> 这样是为了实现：
//					  小爱丽丝按移动路线走，此时踩到了光滑地面，此时她无法控制转向/移动，
//					  并且移动路线暂停，离开光滑地面后，继续刚才的移动路线。
//					> 移动路线的脚本，不需要暂停，因此你需要继承此函数，进行自定义情况标记。
//==============================
Game_Character.prototype.drill_LST_moveRouteNeedPause = function( code ){
	var gc = Game_Character;
	if( code == gc.ROUTE_MOVE_DOWN      ){ return true; }  //向下移动
	if( code == gc.ROUTE_MOVE_LEFT      ){ return true; }  //向左移动
	if( code == gc.ROUTE_MOVE_RIGHT     ){ return true; }  //向右移动
	if( code == gc.ROUTE_MOVE_UP        ){ return true; }  //向上移动
	if( code == gc.ROUTE_MOVE_LOWER_L   ){ return true; }  //向左下移动
	if( code == gc.ROUTE_MOVE_LOWER_R   ){ return true; }  //向右下移动
	if( code == gc.ROUTE_MOVE_UPPER_L   ){ return true; }  //向左上移动
	if( code == gc.ROUTE_MOVE_UPPER_R   ){ return true; }  //向右上移动
	if( code == gc.ROUTE_MOVE_RANDOM    ){ return true; }  //随机移动
	if( code == gc.ROUTE_MOVE_TOWARD    ){ return true; }  //接近玩家
	if( code == gc.ROUTE_MOVE_AWAY      ){ return true; }  //远离玩家
	if( code == gc.ROUTE_MOVE_FORWARD   ){ return true; }  //前进一步
	if( code == gc.ROUTE_MOVE_BACKWARD  ){ return true; }  //后退一步
	if( code == gc.ROUTE_TURN_DOWN      ){ return true; }  //朝向下方
	if( code == gc.ROUTE_TURN_LEFT      ){ return true; }  //朝向左方
	if( code == gc.ROUTE_TURN_RIGHT     ){ return true; }  //朝向右方
	if( code == gc.ROUTE_TURN_UP        ){ return true; }  //朝向上方
	if( code == gc.ROUTE_TURN_90D_R     ){ return true; }  //右转90°
	if( code == gc.ROUTE_TURN_90D_L     ){ return true; }  //左转90°
	if( code == gc.ROUTE_TURN_180D      ){ return true; }  //后转180°
	if( code == gc.ROUTE_TURN_90D_R_L   ){ return true; }  //向左或向右转90°
	if( code == gc.ROUTE_TURN_RANDOM    ){ return true; }  //随机转向
	if( code == gc.ROUTE_TURN_TOWARD    ){ return true; }  //朝向玩家
	if( code == gc.ROUTE_TURN_AWAY      ){ return true; }  //背向玩家
	if( code == gc.ROUTE_SCRIPT         ){ return true; }  //脚本...
	return false;
}
//==============================
// * 移动路线暂停 - 执行单条移动路线
//==============================
var _drill_LST_mr_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function( command ){
	
	// > 根据暂停条件，设置暂停
	if( this.drill_LST_isSliding() == true ){
		if( this.drill_LST_moveRouteNeedPause( command.code ) == true ){
			this['_drill_LST_moveRoutePause'] = true;
		}
	}
	
	// > 暂停中
	if( this['_drill_LST_moveRoutePause'] == true ){ return; }
	
	_drill_LST_mr_processMoveCommand.call( this, command );
};
//==============================
// * 移动路线暂停 - 帧刷新 移动路线
//==============================
var _drill_LST_mr_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
Game_Character.prototype.updateRoutineMove = function(){
	
	// > 离开光滑地面后，取消暂停
	if( this.drill_LST_isSliding() == false ){	
		this['_drill_LST_moveRoutePause'] = false;
    }
	
	// > 暂停中
	if( this['_drill_LST_moveRoutePause'] == true ){ return; }
	
	// > 原函数
	_drill_LST_mr_updateRoutineMove.call(this);
};
//==============================
// * 移动路线暂停 - 移动路线索引+1
//==============================
var _drill_LST_mr_advanceMoveRouteIndex = Game_Character.prototype.advanceMoveRouteIndex;
Game_Character.prototype.advanceMoveRouteIndex = function(){
	
	// > 暂停中
	if( this['_drill_LST_moveRoutePause'] == true ){ return; }
	
	// > 原函数
	_drill_LST_mr_advanceMoveRouteIndex.call( this );
};



//=============================================================================
// ** ☆转向毯容器
//
//			说明：	> 此模块专门管理 转向毯容器 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_LST_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_LST_temp_initialize.call(this);
	this._drill_LST_blanketTank = [];
	this._drill_LST_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_LST_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_LST_blanketTank = [];
	$gameTemp._drill_LST_needRestatistics = true;
	_drill_LST_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_LST_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_LST_blanketTank = [];
	$gameTemp._drill_LST_needRestatistics = true;
	_drill_LST_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_LST_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_LST_map_update.call(this,sceneActive);
	this.drill_LST_updateRestatistics();
};
//==============================
// * 容器 - 刷新统计
//==============================
Game_Map.prototype.drill_LST_updateRestatistics = function() {
	if( !$gameTemp._drill_LST_needRestatistics ){ return }
	$gameTemp._drill_LST_needRestatistics = false;
	
	$gameTemp._drill_LST_blanketTank = [];
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){  
		var temp_event = events[i];
		if( temp_event['_drill_LST_blanketDir'] > 0 ){		//捕获转向毯
			$gameTemp._drill_LST_blanketTank.push( temp_event );
		}
	}
}


//=============================================================================
// ** ☆转向毯
//
//			说明：	> 此模块专门控制 转向毯 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 转向毯 - 初始化
//==============================
var _drill_LST_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_LST_c_initialize.call(this);
	this['_drill_LST_blanketDir'] = 0;		//转向毯属性（事件注释 赋值）
};
//==============================
// * 转向毯 - 事件 帧刷新
//==============================
var _drill_LST_blanket_e_update = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
    this.drill_LST_updateBlanket();		//转向毯帧刷新（优先执行）
	_drill_LST_blanket_e_update.call( this );
};
//==============================
// * 转向毯 - 玩家 帧刷新
//==============================
var _drill_LST_blanket_p_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    this.drill_LST_updateBlanket();		//转向毯帧刷新（优先执行）
	_drill_LST_blanket_p_update.call( this, sceneActive );
};
//==============================
// * 转向毯 - 帧刷新
//
//			说明：	> 该刷新由子类选择调用，并不直接嵌套到update帧刷新中。
//==============================
Game_CharacterBase.prototype.drill_LST_updateBlanket = function() {
	
	// > 滑行不可用
	if( this['_drill_LST_enable'] != true ){ return; }
	
	// > 飞行物体的不会滑
	if( this._priorityType == 2 ){ return; }
	
	// > 光滑地面处理
    if( this.drill_LST_isOnSlipperyFloor() ){
		
		// > 与转向毯重合时，强制转向
		for( var i = 0; i < $gameTemp._drill_LST_blanketTank.length; i++ ){
			var temp_blanket = $gameTemp._drill_LST_blanketTank[i];
			if( temp_blanket == this ){ return; }		//排除自身
			if( temp_blanket._x == this._x &&
				temp_blanket._y == this._y ){
				
				this['_drill_LST_slidingDirection'] = temp_blanket['_drill_LST_blanketDir'];
			}
		}
	}
}


