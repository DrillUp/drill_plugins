//=============================================================================
// Drill_EventBufferMarkers.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体管理 - 事件的缓存记号圈
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventBufferMarkers +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以给事件添加标记记号圈，但离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfNumberArray     系统-变量数组核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 功能细节：
 *   (1.记号圈主要用来调试用。
 *      如果事件复制器生成了大量事件，需要批量管理时，
 *      可以添加记号圈，方便识别。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 如果你需要设置标签，使用下面插件指令：
 * （注意，冒号左右都有一个空格）
 *
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 红记号
 * 插件指令：>事件的缓存记号圈 : 事件[10] : 添加 : 红记号
 * 插件指令：>事件的缓存记号圈 : 事件变量[10] : 添加 : 红记号
 * 插件指令：>事件的缓存记号圈 : 批量事件[10,11,12] : 添加 : 红记号
 * 插件指令：>事件的缓存记号圈 : 批量事件变量[25,26] : 添加 : 红记号
 * 插件指令：>事件的缓存记号圈 : 事件变量数组[21] : 添加 : 红记号
 * 插件指令：>事件的缓存记号圈 : 事件变量数组[数组名] : 添加 : 红记号
 * 
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 红记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 橙记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 黄记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 绿记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 青记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 蓝记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 添加 : 紫记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除 : 红记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除 : 橙记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除 : 黄记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除 : 绿记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除 : 青记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除 : 蓝记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除 : 紫记号
 * 插件指令：>事件的缓存记号圈 : 本事件 : 去除全部记号
 * 
 * 1.前半部分（本事件）和 后半部分（添加 : 红记号）
 *   的参数可以随意组合。一共有7*15种组合方式。
 * 2.只有7种固定记号：红橙黄绿青蓝紫。
 *   记号添加一次即可，重复添加同色记号没有效果。
 * 3.指令只在当前地图有效，离开地图后会失效，因为事件被销毁重建了。
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
 * 时间复杂度： o(n) * o(图形绘制)
 * 测试方法：   给事件加上记号圈，测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【51.67ms】
 *              100个事件的地图中，平均消耗为：【36.31ms】
 *               50个事件的地图中，平均消耗为：【28.26ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.记号圈只是测试标记用的，消耗一般，也能接受。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EBM（Event_Buffer_Markers）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) * o(图形绘制)
//		★性能测试因素	物体管理管理层
//		★性能测试消耗	2024/8/8：
//							》260.9ms、104.4ms（drill_EBM_updateDraw）
//		★最坏情况		无
//		★备注			测试的结果感觉不太正常，不过这个插件也只是debug用，暂时不考虑。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆物体贴图
//			
//			->☆物体的属性
//			->☆记号圈绘制
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
//			暂无
//
//		★其它说明细节：
//			暂无
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
	DrillUp.g_EBM_PluginTip_curName = "Drill_EventBufferMarkers.js 物体管理-事件的缓存记号圈";
	DrillUp.g_EBM_PluginTip_baseList = ["Drill_CoreOfNumberArray.js 系统-变量数组核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EBM_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EBM_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EBM_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EBM_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EBM_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EBM_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EBM_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventBufferMarkers = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventBufferMarkers');

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfNumberArray ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EBM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EBM_pluginCommand.call(this, command, args);
	if( command === ">事件的缓存记号圈" ){
		
		/*-----------------对象组获取------------------*/
		var e_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EBM_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EBM_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("事件变量数组[") != -1 ){
				unit = unit.replace("事件变量数组[","");
				unit = unit.replace("]","");
				e_list = [];
				var num_arr = $gameNumberArray.value( unit );
				for( var k=0; k < num_arr.length; k++ ){
					var e_id = num_arr[k];
					if( $gameMap.drill_EBV_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EBM_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EBM_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
		}
		
		/*-----------------记号------------------*/
		if( e_list != null && args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "添加" ){
				for( var k=0; k < e_list.length; k++ ){
					var e = e_list[k];
					e.drill_EBM_addMark(temp2);
				}
			}
			if( type == "去除" ){
				for( var k=0; k < e_list.length; k++ ){
					var e = e_list[k];
					e.drill_EBM_removeMark(temp2);
				}
			}
		}
		if( e_list != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除全部记号" ){
				for( var k=0; k < e_list.length; k++ ){
					var e = e_list[k];
					e.drill_EBM_removeAllMark();
				}
			}
		}
	}
}
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EBM_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EBM_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


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
Game_Temp.prototype.drill_EBM_getCharacterSpriteTank = function(){
	return this.drill_EBM_getCharacterSpriteTank_Private();
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
Game_Temp.prototype.drill_EBM_getCharacterSpriteByEventId = function( event_id ){
	return this.drill_EBM_getCharacterSpriteByEventId_Private( event_id );
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
Game_Temp.prototype.drill_EBM_getCharacterSpriteByFollowerIndex = function( follower_index ){
	return this.drill_EBM_getCharacterSpriteByFollowerIndex_Private( follower_index );
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
Game_Temp.prototype.drill_EBM_getCharacterSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._characterSprites;
};
//==============================
// * 物体贴图容器 - 获取 - 根据事件ID（私有）
//==============================
Game_Temp.prototype.drill_EBM_getCharacterSpriteByEventId_Private = function( event_id ){
	var sprite_list = this.drill_EBM_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }		//（判断 _character 就可以，不需要检验 Sprite_Character）
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
Game_Temp.prototype.drill_EBM_getCharacterSpriteByFollowerIndex_Private = function( follower_index ){
	var sprite_list = this.drill_EBM_getCharacterSpriteTank_Private();
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
// ** ☆物体的属性
//
//			说明：	> 此模块专门定义 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_EBM_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	this._drill_EBM_num = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EBM_initMembers.call(this);
}
//==============================
// * 物体的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Event.prototype.drill_EBM_checkData = function(){
	if( this._drill_EBM_num != undefined ){ return; }
	this._drill_EBM_num = 0;
}
//==============================
// * 物体的属性 - 添加标签（开放函数）
//==============================
Game_Event.prototype.drill_EBM_addMark = function( mark ){
	this.drill_EBM_checkData();
	if( mark == "红记号" ){ this._drill_EBM_num = this._drill_EBM_num | 0x1;  } //0000 0001
	if( mark == "橙记号" ){ this._drill_EBM_num = this._drill_EBM_num | 0x2;  } //0000 0010
	if( mark == "黄记号" ){ this._drill_EBM_num = this._drill_EBM_num | 0x4;  } //0000 0100
	if( mark == "绿记号" ){ this._drill_EBM_num = this._drill_EBM_num | 0x8;  } //0000 1000
	if( mark == "青记号" ){ this._drill_EBM_num = this._drill_EBM_num | 0x10; } //0001 0000
	if( mark == "蓝记号" ){ this._drill_EBM_num = this._drill_EBM_num | 0x20; } //0010 0000
	if( mark == "紫记号" ){ this._drill_EBM_num = this._drill_EBM_num | 0x40; } //0100 0000
}
//==============================
// * 物体的属性 - 去除标签（开放函数）
//==============================
Game_Event.prototype.drill_EBM_removeMark = function( mark ){
	if( this._drill_EBM_num == undefined ){ return; }
	if( mark == "红记号" ){ this._drill_EBM_num = this._drill_EBM_num & (~0x1);  } //0000 0001
	if( mark == "橙记号" ){ this._drill_EBM_num = this._drill_EBM_num & (~0x2);  } //0000 0010
	if( mark == "黄记号" ){ this._drill_EBM_num = this._drill_EBM_num & (~0x4);  } //0000 0100
	if( mark == "绿记号" ){ this._drill_EBM_num = this._drill_EBM_num & (~0x8);  } //0000 1000
	if( mark == "青记号" ){ this._drill_EBM_num = this._drill_EBM_num & (~0x10); } //0001 0000
	if( mark == "蓝记号" ){ this._drill_EBM_num = this._drill_EBM_num & (~0x20); } //0010 0000
	if( mark == "紫记号" ){ this._drill_EBM_num = this._drill_EBM_num & (~0x40); } //0100 0000
}
//==============================
// * 物体的属性 - 去除全部标签（开放函数）
//==============================
Game_Event.prototype.drill_EBM_removeAllMark = function() {
	if( this._drill_EBM_num == undefined ){ return; }
	this._drill_EBM_num = 0;
}


//=============================================================================
// ** ☆记号圈绘制
//
//			说明：	> 此模块专门管理 记号圈绘制 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 记号圈绘制 - 帧刷新（地图界面）
//==============================
var _drill_EBM_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_EBM_update2.call(this);
    this.drill_EBM_updateDraw();	
}
//==============================
// * 记号圈绘制 - 帧刷新
//==============================
Scene_Map.prototype.drill_EBM_updateDraw = function() {
	
	// > 创建贴图
	if( this._drill_EBM_sprite == undefined ){
		var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
		var temp_sprite = new Sprite();
		temp_sprite.x = 0;
		temp_sprite.y = 0;
		temp_sprite.bitmap = temp_bitmap;
		this._spriteset._drill_mapUpArea.addChild( temp_sprite );	//（加在上层）
		this._drill_EBM_sprite = temp_sprite;
	}
	
	// > 清空绘制
	var temp_bitmap = this._drill_EBM_sprite.bitmap;
	temp_bitmap.clear();
	
	// > 行走图遍历
	var sprite_list = $gameTemp.drill_EBM_getCharacterSpriteTank();
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		
		// > 贴图不可见，说明被优化了
		if( temp_sprite.visible != true ){ continue; }
		var character = temp_sprite._character;
		if( character._drill_EBM_num == undefined ){ continue; }
		var num = character._drill_EBM_num;
		
		// > 绘制 - 红记号
		if( num % 2 == 1 ){
			temp_bitmap.drawCircle( temp_sprite.x, temp_sprite.y-24, 9, "rgb(255,255,255)" );
			temp_bitmap.drawCircle( temp_sprite.x, temp_sprite.y-24, 7, "rgb(255,20,20)" );
		}
		// > 绘制 - 橙记号
		if( (num >> 1) % 2 == 1 ){
			temp_bitmap.drawCircle( temp_sprite.x-18, temp_sprite.y-24, 9, "rgb(255,255,255)" );
			temp_bitmap.drawCircle( temp_sprite.x-18, temp_sprite.y-24, 7, "rgb(235,105,20)" );
		}
		// > 绘制 - 黄记号
		if( (num >> 2) % 2 == 1 ){
			temp_bitmap.drawCircle( temp_sprite.x+18, temp_sprite.y-24, 9, "rgb(255,255,255)" );
			temp_bitmap.drawCircle( temp_sprite.x+18, temp_sprite.y-24, 7, "rgb(255,255,20)" );
		}
		// > 绘制 - 绿记号
		if( (num >> 3) % 2 == 1 ){
			temp_bitmap.drawCircle( temp_sprite.x-9, temp_sprite.y-18-24, 9, "rgb(255,255,255)" );
			temp_bitmap.drawCircle( temp_sprite.x-9, temp_sprite.y-18-24, 7, "rgb(20,225,20)" );
		}
		// > 绘制 - 青记号
		if( (num >> 4) % 2 == 1 ){
			temp_bitmap.drawCircle( temp_sprite.x+9, temp_sprite.y-18-24, 9, "rgb(255,255,255)" );
			temp_bitmap.drawCircle( temp_sprite.x+9, temp_sprite.y-18-24, 7, "rgb(20,255,255)" );
		}
		// > 绘制 - 蓝记号
		if( (num >> 5) % 2 == 1 ){
			temp_bitmap.drawCircle( temp_sprite.x-9, temp_sprite.y+18-24, 9, "rgb(255,255,255)" );
			temp_bitmap.drawCircle( temp_sprite.x-9, temp_sprite.y+18-24, 7, "rgb(20,20,255)" );
		}
		// > 绘制 - 紫记号
		if( (num >> 6) % 2 == 1 ){
			temp_bitmap.drawCircle( temp_sprite.x+9, temp_sprite.y+18-24, 9, "rgb(255,255,255)" );
			temp_bitmap.drawCircle( temp_sprite.x+9, temp_sprite.y+18-24, 7, "rgb(175,80,255)" );
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventBufferMarkers = false;
		var pluginTip = DrillUp.drill_EBM_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

