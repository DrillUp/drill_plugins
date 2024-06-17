//=============================================================================
// Drill_EventFrameLayerAndZIndex.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        行走图 - 层级与堆叠级
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventFrameLayerAndZIndex +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令修改行走图的 层级或堆叠级。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfEventFrame          行走图-行走图优化核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图对象。
 * 2.你可以了解一下基础文档： "0.基本定义 > 界面.docx"
 *   详细内容可以去看看 "16.行走图 > 关于行走图优化核心.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 行走图的层级：
 *   (1.行走图可以切换七个层级：
 *        物体原层级、物体下层、物体中层、物体上层、下层、中层、上层
 *      物体原层级为行走图原来所在层级，会根据设置自动分配物体的 上中下层。
 *      具体介绍可以去看看 "16.行走图 > 关于行走图优化核心.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过添加事件注释来设置层级：
 * 
 * 事件注释：=>行走图的层级与堆叠级 : 设置层级 : 物体原层级
 * 事件注释：=>行走图的层级与堆叠级 : 设置层级 : 物体上层
 * 事件注释：=>行走图的层级与堆叠级 : 设置层级 : 物体中层
 * 事件注释：=>行走图的层级与堆叠级 : 设置层级 : 物体下层
 * 事件注释：=>行走图的层级与堆叠级 : 设置层级 : 上层
 * 事件注释：=>行走图的层级与堆叠级 : 设置层级 : 中层
 * 事件注释：=>行走图的层级与堆叠级 : 设置层级 : 下层
 * 事件注释：=>行走图的层级与堆叠级 : 设置固定堆叠级 : 堆叠级[10]
 * 事件注释：=>行走图的层级与堆叠级 : 设置附加堆叠级 : 堆叠级[10]
 * 
 * 1.该事件注释只对当前事件页有效，切换事件页后会失效。
 * 2.如果层级为"上层"、"中层"、"下层"，建议使用"固定堆叠级"。
 *   如果层级为"物体原层级"、"物体上层"、"物体中层"、"物体下层"，建议使用"附加堆叠级"。
 *   因为在物体层级时，所有物体对象的 堆叠级，都与贴图y坐标相关，且为实时变换。
 *   所以使用"附加堆叠级"，能提升一部分优先级，其它详细介绍去看文档。
 * 3.堆叠级可以设置为小数、负数。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来设置层级：
 * 
 * 插件指令：>行走图的层级与堆叠级 : 玩家 : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 玩家领队 : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 玩家全员 : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 玩家队员[1] : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 玩家队员变量[1] : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 本事件 : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 事件变量[21] : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 批量事件[10,11] : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 批量事件变量[21,22] : 设置层级 : 中层
 * 
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 物体原层级
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 物体上层
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 物体中层
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 物体下层
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 上层
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 中层
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置层级 : 下层
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置固定堆叠级 : 堆叠级[10]
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 解除固定堆叠级
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置附加堆叠级 : 堆叠级[10]
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 设置附加堆叠级 : 堆叠级[12.5]
 * 插件指令：>行走图的层级与堆叠级 : 事件[10] : 恢复默认层级和堆叠级
 * 
 * 1.前半部分（行走图[1]）和 后半部分（切换行走图层级 : 行走图层）的参数
 *   可以随意组合。一共有10*12种组合方式。
 * 2.如果层级为"上层"、"中层"、"下层"，建议使用"固定堆叠级"。
 *   如果层级为"物体原层级"、"物体上层"、"物体中层"、"物体下层"，建议使用"附加堆叠级"。
 *   因为在物体层级时，所有物体对象的 堆叠级，都与贴图y坐标相关，且为实时变换。
 *   所以使用"附加堆叠级"，能提升一部分优先级，其它详细介绍去看文档。
 * 3.堆叠级可以设置为小数、负数。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   行走图管理层放置10个行走图，控制多个并测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【41.21ms】
 *              100个事件的地图中，平均消耗为：【28.80ms】
 *               50个事件的地图中，平均消耗为：【21.32ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件需要实时管理所有行走图的先后顺序，因此有一定的消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFLAZ（Event_Frame_Layer_And_ZIndex）
//		临时全局变量	DrillUp.g_EFLAZ_xxx
//		临时局部变量	this._drill_EFLAZ_xxx
//		存储数据变量	$gameSystem._drill_EFLAZ_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	横版2D模仿
//		★性能测试消耗	2024/5/2：
//							》由于继承，消耗被转移到 行走图优化核心 中。
//							》28.8ms（drill_COEF_refreshSortValue）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆事件注释
//			->☆物体贴图
//			
//			->☆行走图的属性
//				> 层级
//				> 固定堆叠级
//				> 附加堆叠级
//			->☆行走图贴图控制
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
//			无
//
//		★其它说明细节：
//			无
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
	DrillUp.g_EFLAZ_PluginTip_curName = "Drill_EventFrameLayerAndZIndex.js 行走图-层级与堆叠级";
	DrillUp.g_EFLAZ_PluginTip_baseList = [
		"Drill_CoreOfEventFrame.js 行走图-行走图优化核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EFLAZ_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EFLAZ_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EFLAZ_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EFLAZ_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EFLAZ_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EFLAZ_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EFLAZ_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventFrameLayerAndZIndex = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventFrameLayerAndZIndex');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventFrame ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EFLAZ_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EFLAZ_pluginCommand.call( this, command, args );
	if( command == ">行走图的层级与堆叠级" ){ 
		
		/*-----------------对象组获取------------------*/
		var charSprite_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( charSprite_list == null && unit == "本事件" ){
				var charSprite = $gameTemp.drill_EFLAZ_getCharacterSpriteByEventId( this._eventId );
				if( charSprite == undefined ){ return; }	//『防止并行删除事件出错』
				charSprite_list = [];
				charSprite_list.push( charSprite );
			}
			if( charSprite_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				charSprite_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EFLAZ_isEventExist( e_id ) == false ){ continue; }
					charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByEventId( e_id ) );
				}
			}
			if( charSprite_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				charSprite_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EFLAZ_isEventExist( e_id ) == false ){ continue; }
					charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByEventId( e_id ) );
				}
			}
			if( charSprite_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EFLAZ_isEventExist( e_id ) == false ){ return; }
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByEventId( e_id ) );
			}
			if( charSprite_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EFLAZ_isEventExist( e_id ) == false ){ return; }
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByEventId( e_id ) );
			}
			if( charSprite_list == null && (unit == "玩家" || unit == "玩家领队") ){
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByFollowerIndex( -2 ) );  //『玩家id』
			}
			if( charSprite_list == null && unit == "玩家全员" ){
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByFollowerIndex( -2 ) );  //『玩家id』
				for(var i=0; i < $gamePlayer.followers().visibleFollowers().length; i++ ){
					charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByFollowerIndex( i+1 ) );
				}
			}
			if( charSprite_list == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var f_index = Number(unit);
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByFollowerIndex( f_index ) );
			}
			if( charSprite_list == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var f_index = $gameVariables.value(Number(unit));
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_EFLAZ_getCharacterSpriteByFollowerIndex( f_index ) );
			}
		}
		
		/*-----------------设置层级------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( charSprite_list != null ){
				if( type == "设置层级" && 
					(temp1 == "物体原层级" || temp1 == "物体上层" || temp1 == "物体中层" || temp1 == "物体下层" ||
					 temp1 == "上层" || temp1 == "中层" || temp1 == "下层" ) ){
					for( var k=0; k < charSprite_list.length; k++ ){
						var temp_sprite = charSprite_list[k];
						var ch = temp_sprite._character;
						if( ch == undefined ){ continue; }
						ch.drill_EFLAZ_setLayer( temp1 );
					}
				}
				if( type == "设置固定堆叠级" ){
					temp1 = temp1.replace("堆叠级[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < charSprite_list.length; k++ ){
						var temp_sprite = charSprite_list[k];
						var ch = temp_sprite._character;
						if( ch == undefined ){ continue; }
						ch.drill_EFLAZ_setFixZIndex( Number(temp1) );
					}
				}
				if( type == "设置附加堆叠级" ){
					temp1 = temp1.replace("堆叠级[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < charSprite_list.length; k++ ){
						var temp_sprite = charSprite_list[k];
						var ch = temp_sprite._character;
						if( ch == undefined ){ continue; }
						ch.drill_EFLAZ_setAddZIndex( Number(temp1) );
					}
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( charSprite_list != null ){
				if( type == "解除固定堆叠级" ){
					for( var k=0; k < charSprite_list.length; k++ ){
						var temp_sprite = charSprite_list[k];
						var ch = temp_sprite._character;
						if( ch == undefined ){ continue; }
						ch.drill_EFLAZ_setFixZIndex( null );
					}
				}
				if( type == "恢复默认层级和堆叠级" ){
					for( var k=0; k < charSprite_list.length; k++ ){
						var temp_sprite = charSprite_list[k];
						var ch = temp_sprite._character;
						if( ch == undefined ){ continue; }
						ch.drill_EFLAZ_restore();
					}
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFLAZ_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EFLAZ_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 初始化绑定
//
//			说明：	> 注释与当前事件页有关，不一定跨事件页。
//==============================
var _drill_EFLAZ_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFLAZ_c_setupPageSettings.call(this);
	this.drill_EFLAZ_setupPageSettings();
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EFLAZ_setupPageSettings = function() {
	
	// > 恢复默认
	if( this._drill_EFLAZ_data != undefined ){
		this.drill_EFLAZ_restore();
	}
	
	var page = this.page();
    if( page ){
		
		var temp_list = this.list();
		for(var k = 0; k < temp_list.length; k++ ){
			var l = temp_list[k];
			if( l.code === 108 ){
				var row = l.parameters[0];
				var args = row.split(/[ ]+/);	
				var command = args.shift();
				if( command == "=>行走图的层级与堆叠级" ){
					
					if( args.length == 4 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						if( type == "设置层级" && 
							(temp1 == "物体原层级" || temp1 == "物体上层" || temp1 == "物体中层" || temp1 == "物体下层" ||
							 temp1 == "上层" || temp1 == "中层" || temp1 == "下层" ) ){
							this.drill_EFLAZ_setLayer( temp1 );
						}
						if( type == "设置固定堆叠级" ){
							temp1 = temp1.replace("堆叠级[","");
							temp1 = temp1.replace("]","");
							this.drill_EFLAZ_setFixZIndex( Number(temp1) );
						}
						if( type == "设置附加堆叠级" ){
							temp1 = temp1.replace("堆叠级[","");
							temp1 = temp1.replace("]","");
							this.drill_EFLAZ_setAddZIndex( Number(temp1) );
						}
					}
				};
				
			};
		};
    }
}


//#############################################################################
// ** 【标准模块】物体贴图 ☆物体贴图
//#############################################################################
//##############################
// * 物体贴图 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组     （物体贴图）
//          
//			说明：	> 此函数直接返回容器对象。不含镜像。
//##############################
Game_Temp.prototype.drill_EFLAZ_getCharacterSpriteTank = function(){
	return this.drill_EFLAZ_getCharacterSpriteTank_Private();
}
//##############################
// * 物体贴图 - 获取 - 根据事件ID【标准函数】
//			
//			参数：	> event_id 数字（事件ID）
//			返回：	> 贴图对象     （事件贴图）
//          
//			说明：	> -2表示玩家，1表示第一个事件的贴图。不含镜像。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_EFLAZ_getCharacterSpriteByEventId = function( event_id ){
	return this.drill_EFLAZ_getCharacterSpriteByEventId_Private( event_id );
}
//##############################
// * 物体贴图 - 获取 - 根据玩家队员索引【标准函数】
//			
//			参数：	> follower_index 数字（玩家队员索引）
//			返回：	> 贴图对象           （玩家队员贴图）
//          
//			说明：	> -2表示玩家，1表示第一个玩家队员的贴图。不含镜像。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_EFLAZ_getCharacterSpriteByFollowerIndex = function( follower_index ){
	return this.drill_EFLAZ_getCharacterSpriteByFollowerIndex_Private( follower_index );
}
//=============================================================================
// ** 物体贴图（接口实现）
//=============================================================================
//==============================
// * 物体贴图容器 - 获取 - 容器指针（私有）
//          
//			说明：	> 贴图容器 _characterSprites，存放全部物体贴图，不含镜像贴图。
//					  这只是一个贴图容器，即使贴图在其他层级，也不影响容器获取到贴图。（更多细节去看 脚本文档说明）
//==============================
Game_Temp.prototype.drill_EFLAZ_getCharacterSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._characterSprites;
};
//==============================
// * 物体贴图容器 - 获取 - 根据事件ID（私有）
//==============================
Game_Temp.prototype.drill_EFLAZ_getCharacterSpriteByEventId_Private = function( event_id ){
	var sprite_list = this.drill_EFLAZ_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }	//（判断 _character 就可以，不需要检验 Sprite_Character）
		if( event_id == -2 &&   //『玩家id』
			sprite._character == $gamePlayer ){
			return sprite;
		}
		if( sprite._character._eventId == event_id ){
			return sprite;
		}
	}
	return null;
};
//==============================
// * 物体贴图容器 - 获取 - 根据玩家索引（私有）
//==============================
Game_Temp.prototype.drill_EFLAZ_getCharacterSpriteByFollowerIndex_Private = function( follower_index ){
	var sprite_list = this.drill_EFLAZ_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }	//（判断 _character 就可以，不需要检验 Sprite_Character）
		if( follower_index == -2 &&   //『玩家id』
			sprite._character == $gamePlayer ){
			return sprite;
		}
		if( sprite._character._memberIndex == follower_index &&
			sprite._character.isVisible() ){
			return sprite;
		}
	}
	return null;
};
	
	
	
//=============================================================================
// ** ☆行走图的属性
//
//			说明：	> 此模块专门定义 行走图的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图的属性 - 初始化
//==============================
var _drill_EFLAZ_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	this._drill_EFLAZ_data = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_EFLAZ_initialize.call(this);
}
//==============================
// * 行走图的属性 - 初始化 数据（私有）
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_CharacterBase.prototype.drill_EFLAZ_checkData = function(){
	if( this._drill_EFLAZ_data != undefined ){ return; }
	this._drill_EFLAZ_data = {};
	this._drill_EFLAZ_data['layer'] = "物体原层级";
	this._drill_EFLAZ_data['fix_zIndex'] = undefined;
	this._drill_EFLAZ_data['add_zIndex'] = undefined;
}
//==============================
// * 行走图的属性 - 删除数据（私有）
//==============================
Game_CharacterBase.prototype.drill_EFLAZ_removeData = function(){
	this._drill_EFLAZ_data = undefined;
	$gameTemp.drill_COEF_needRefreshSpriteLayer();	//（刷新层级）
	$gameTemp.drill_COEF_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
//==============================
// * 行走图的属性 - 消除行走图
//==============================
var _drill_EFLAZ_e_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function(){
	_drill_EFLAZ_e_erase.call( this );
	this.drill_EFLAZ_removeData();					//（删除数据）
}

//==============================
// * 行走图的属性 - 设置层级（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFLAZ_setLayer = function( layer ){
	this.drill_EFLAZ_checkData();
	this._drill_EFLAZ_data['layer'] = layer;
	$gameTemp.drill_COEF_needRefreshSpriteLayer();	//（刷新层级）
	$gameTemp.drill_COEF_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
//==============================
// * 行走图的属性 - 设置固定堆叠级（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFLAZ_setFixZIndex = function( zIndex ){
	this.drill_EFLAZ_checkData();
	this._drill_EFLAZ_data['fix_zIndex'] = zIndex;
	$gameTemp.drill_COEF_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
//==============================
// * 行走图的属性 - 设置附加堆叠级（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFLAZ_setAddZIndex = function( zIndex ){
	this.drill_EFLAZ_checkData();
	this._drill_EFLAZ_data['add_zIndex'] = zIndex;
	$gameTemp.drill_COEF_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
//==============================
// * 行走图的属性 - 恢复默认（开放函数）
//==============================
Game_CharacterBase.prototype.drill_EFLAZ_restore = function(){
	this.drill_EFLAZ_checkData();
	this._drill_EFLAZ_data['layer'] = "物体原层级";
	this._drill_EFLAZ_data['add_zIndex'] = undefined;
	this._drill_EFLAZ_data['fix_zIndex'] = undefined;
	$gameTemp.drill_COEF_needRefreshSpriteLayer();	//（刷新层级）
	$gameTemp.drill_COEF_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
	
	
//=============================================================================
// ** ☆行走图贴图控制
//
//			说明：	> 此模块控制 行走图 的层级和堆叠级。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图贴图控制 - 设置层级时（继承）
//==============================
var _drill_EFLAZ_whenRefreshLayer = Game_Temp.prototype.drill_COEF_whenRefreshLayer;
Game_Temp.prototype.drill_COEF_whenRefreshLayer = function( temp_sprite ){
	_drill_EFLAZ_whenRefreshLayer.call( this, temp_sprite );
	
	var character = temp_sprite._character;
	if( character == undefined ){ return; }
	if( character._drill_EFLAZ_data == undefined ){ return; }
	
	// > 设置层级
	temp_sprite._drill_layer = character._drill_EFLAZ_data['layer'];
}
//==============================
// * 行走图贴图控制 - 帧刷新堆叠级时（继承）
//==============================
var _drill_EFLAZ_COEF_whenRefreshZIndex_updateCharacter = Game_Temp.prototype.drill_COEF_whenRefreshZIndex_updateCharacter;
Game_Temp.prototype.drill_COEF_whenRefreshZIndex_updateCharacter = function( temp_sprite ){
	_drill_EFLAZ_COEF_whenRefreshZIndex_updateCharacter.call( this, temp_sprite );
	
	var character = temp_sprite._character;
	if( character == undefined ){ return; }
	if( character._drill_EFLAZ_data == undefined ){ return; }
	
	// > 固定堆叠级
	if( character._drill_EFLAZ_data['fix_zIndex'] != null ){
		temp_sprite.zIndex = character._drill_EFLAZ_data['fix_zIndex'];
	}
	// > 附加堆叠级
	if( character._drill_EFLAZ_data['add_zIndex'] != null ){
		temp_sprite.zIndex += character._drill_EFLAZ_data['add_zIndex'];
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFrameLayerAndZIndex = false;
		var pluginTip = DrillUp.drill_EFLAZ_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


