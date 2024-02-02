//=============================================================================
// Drill_EventUnificationOfDirection.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        体积 - 一体化 & 朝向
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventUnificationOfDirection +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得多个事件绑定在一起，其中一个事件转向，都能同步影响所有绑定的事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件和玩家。
 * 2.详细介绍可以去看看 "27.体积 > 关于事件一体化.docx"。
 * 朝向一体化：
 *   (1.由于结构的特殊性，同类型的一体化标签，只能同时拥有一个。
 *   (2.一个事件转向时，所有具有相同标签的事件都会与主动事件统一朝向。
 *   (3.注意关闭事件"固定朝向"的勾选设置，否则无法执行转向。
 * 设计：
 *   (1.你可以设计 一个事件和一个朝向标 绑定一体化朝向。
 *      通过控制改变朝向标的 方向，实现操控 事件 的朝向。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过事件注释将事件绑定在一起：
 * （注意，冒号左右两边有空格）
 * 
 * 事件注释：=>一体化&朝向 : 绑定标签 : 朝向_A
 *
 * 1.标签可以是任意自定义的字符串，但注意字符串不能出现空格。
 *   事件注释的设置跨事件页，即绑定标签后，切换事件页不会改变一体化的设置。
 * 2.可以将多个事件组合成一个大体积的箱子。（朝向固定+移动一体化）
 *   或者一个大整体的小爱丽丝。（移动+朝向一体化）
 * 
 * 事件注释(旧)：=>事件一体化 : 朝向标签 : 鼠标一体化示例_A
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 玩家和事件可以通过插件指令设置移动、朝向一体化：
 *
 * 插件指令：>一体化&朝向 : 玩家 : 绑定标签 : 标签[大箱子_朝向_A]
 * 插件指令：>一体化&朝向 : 本事件 : 绑定标签 : 标签[大箱子_朝向_A]
 * 插件指令：>一体化&朝向 : 事件[10] : 绑定标签 : 标签[大箱子_朝向_A]
 * 插件指令：>一体化&朝向 : 事件变量[21] : 绑定标签 : 标签[大箱子_朝向_A]
 * 插件指令：>一体化&朝向 : 批量事件[10,11] : 绑定标签 : 标签[大箱子_朝向_A]
 * 插件指令：>一体化&朝向 : 批量事件变量[21,22] : 绑定标签 : 标签[大箱子_朝向_A]
 * 
 * 插件指令：>一体化&朝向 : 本事件 : 绑定标签 : 标签[大箱子_朝向_A]
 * 插件指令：>一体化&朝向 : 本事件 : 去除标签
 *
 * 1.插件指令前面部分（本事件）和后面设置（绑定标签 : 标签[大箱子_朝向_A]）可以随意组合。
 *   一共有6*2种组合方式。
 * 2.插件指令添加标签后，只在当前地图有效，离开地图后消失。
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
 * 测试方法：   在体积管理层测试性能消耗。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行的插件几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 玩家朝向一体化标签
 * @type text
 * @desc 初始玩家进入游戏时，默认的具备的朝向标签。
 * @default 玩家_朝向一体化
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EUOD（Event_Unification_Of_Direction）
//		临时全局变量	无
//		临时局部变量	this._drill_EUOD.xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.setDirection	（半覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	体积管理层
//		★性能测试消耗	0.6ms（drill_EUOD_hasTag）
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
//
//			->☆物体的属性
//			->☆一体化朝向容器
//			->☆一体化朝向控制
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
//			无
//				
//		★存在的问题：
//			无
//			

//=============================================================================
// ** 提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_EUOD_PluginTip_curName = "Drill_EventUnificationOfDirection.js 体积 - 一体化 & 朝向";
	DrillUp.g_EUOD_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EUOD_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EUOD_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EUOD_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EUOD_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EUOD_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EUOD_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EUOD_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 插件冲突（旧插件）
	//==============================
	DrillUp.drill_EUOD_getPluginTip_ConflictOldName = function(){
		return "【" + DrillUp.g_EUOD_PluginTip_curName + "】\n注意，检测到重复的旧插件：Drill_EventUnification 体积-事件一体化，请及时去掉旧插件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventUnificationOfDirection = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventUnificationOfDirection');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EUOD_rotate = String(DrillUp.parameters['玩家朝向一体化标签'] || "");
	
	
//=============================================================================
// * 插件检测
//=============================================================================
if( Imported.Drill_EventUnification ){
	alert( DrillUp.drill_EUOD_getPluginTip_ConflictOldName() );
};

	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EUOD_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args ){
	_drill_EUOD_pluginCommand.call(this, command, args);
	if( command === ">一体化&朝向" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			//（事件+玩家）
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "玩家" ){
				c_chars = [ $gamePlayer ];
			}
			if( c_chars == null && unit == "领队" ){
				c_chars = [ $gamePlayer ];
			}
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EUOD_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EUOD_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EUOD_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EUOD_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null ){	//（单个数字的事件id）
				var e_id = Number(unit);
				var e = $gameMap.event( e_id );
				if( e == undefined ){ return; }
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return };
		
		/*-----------------设置标签------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			temp3 = temp3.replace("标签[","");
			temp3 = temp3.replace("]","");
			
			if( type == "绑定标签" || type == "设置标签" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_EUOD_setTagAndDirection( temp3 );
				}
				$gameTemp._drill_EUOD_needRestatistics = true;
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除标签" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_EUOD_clearTag();
				}
				$gameTemp._drill_EUOD_needRestatistics = true;
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EUOD_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EUOD_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EUOD_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EUOD_event_initMembers.call(this);
	this._drill_EUOD_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EUOD_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EUOD_event_setupPage.call(this);
    this.drill_EUOD_setupEvent();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EUOD_setupEvent = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EUOD_isFirstBirth == true ){ 
		this._drill_EUOD_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EUOD_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EUOD_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EUOD_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>一体化&朝向"){	//=>一体化&朝向 : 绑定标签 : 标签[朝向_A]
				if( args.length == 4 ){
					var type = String(args[1]); 
					var temp1 = String(args[3]); 
					if( type == "绑定标签" || type == "设置标签" ){
						temp1 = temp1.replace("标签[","");
						temp1 = temp1.replace("]","");
						this.drill_EUOD_setTagAndDirection( temp1 );
						$gameTemp._drill_EUOD_needRestatistics = true;
					}
				}
			};
			
			/*-----------------旧指令------------------*/
			if( command == "=>事件一体化" ){	//=>事件一体化 : 朝向标签 : 鼠标一体化示例_A
				if( args.length == 4 ){
					var type = String(args[1]); 
					var temp1 = String(args[3]); 
					if( type == "朝向标签" ){
						temp1 = temp1.replace("标签[","");
						temp1 = temp1.replace("]","");
						this.drill_EUOD_setTagAndDirection( temp1 );
						$gameTemp._drill_EUOD_needRestatistics = true;
					}
				}
			};
		};
	}, this);
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
var _drill_EUOD_key_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EUOD_keyData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EUOD_key_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_EUOD_checkKeyData = function(){
	if( this._drill_EUOD_keyData != undefined ){ return; }
	this._drill_EUOD_keyData = {};
	this._drill_EUOD_keyData['tag'] = "";		//标签（只能绑定一个，因为一个和多个标签，朝向结果都是相同的）
	this._drill_EUOD_keyData['needInit'] = false;
}
//==============================
// * 物体的属性 - 标签
//==============================
Game_Character.prototype.drill_EUOD_hasTag = function(){
	return this.drill_EUOD_getTag() != "";
}
//==============================
// * 物体的属性 - 标签 - 获取
//==============================
Game_Character.prototype.drill_EUOD_getTag = function(){
	if( this._drill_EUOD_keyData == undefined ){ return ""; }
	return this._drill_EUOD_keyData['tag'];
}
//==============================
// * 物体的属性 - 标签 - 设置
//==============================
Game_Character.prototype.drill_EUOD_setTag = function( tag ){
	this.drill_EUOD_checkKeyData();
	this._drill_EUOD_keyData['tag'] = tag;
}
//==============================
// * 物体的属性 - 标签 - 设置+设置朝向
//==============================
Game_Character.prototype.drill_EUOD_setTagAndDirection = function( tag ){
	this.drill_EUOD_checkKeyData();
	this._drill_EUOD_keyData['tag'] = tag;
	this._drill_EUOD_keyData['needInit'] = true;
}
//==============================
// * 物体的属性 - 标签 - 去除
//==============================
Game_Character.prototype.drill_EUOD_clearTag = function(){
	this.drill_EUOD_checkKeyData();
	this._drill_EUOD_keyData['tag'] = "";
}
//==============================
// * 物体的属性 - 玩家初始化
//==============================
var _drill_EUOD_p_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function(){
	_drill_EUOD_p_initMembers.call(this);
	
	// > 初始化移动标签
	this.drill_EUOD_setTag( DrillUp.g_EUOD_rotate );
	$gameTemp._drill_EUOD_needRestatistics = true;
}


//=============================================================================
// ** ☆一体化朝向容器
//
//			说明：	> 此模块专门定义 一体化朝向 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EUOD_clearTemp = function(){
	this._drill_EUOD_keyMap = {};
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EUOD_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EUOD_temp_initialize.call(this);
	this.drill_EUOD_clearTemp();
	this._drill_EUOD_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EUOD_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EUOD_clearTemp();
	$gameTemp._drill_EUOD_needRestatistics = true;
	_drill_EUOD_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EUOD_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EUOD_clearTemp();
	$gameTemp._drill_EUOD_needRestatistics = true;
	_drill_EUOD_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EUOD_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EUOD_map_update.call( this, sceneActive );
	this.drill_EUOD_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EUOD_updateRestatistics = function(){
	if( $gameTemp._drill_EUOD_needRestatistics != true ){ return }
	$gameTemp._drill_EUOD_needRestatistics = false;
	
	$gameTemp._drill_EUOD_keyMap = {};
	var ch_list = this.events();
	ch_list.push( $gamePlayer );		//（包含玩家）
	for( var i = 0; i < ch_list.length; i++ ){
		var temp_ch = ch_list[i];
		if( temp_ch == undefined ){ continue; }
		if( temp_ch._erased == true ){ continue; }
		
		var tag = temp_ch.drill_EUOD_getTag();
		if( tag == "" ){ continue; }
		if( $gameTemp._drill_EUOD_keyMap[ tag ] == undefined ){
			$gameTemp._drill_EUOD_keyMap[ tag ] = [];
		}
		$gameTemp._drill_EUOD_keyMap[ tag ].push( temp_ch );	//（存放 事件指针）
		
		// > 朝向初始化（修改绑定时，统一一次朝向）
		if( temp_ch._drill_EUOD_keyData['needInit'] == true ){
			temp_ch._drill_EUOD_keyData['needInit'] = false;
			temp_ch.setDirection( temp_ch.direction() );
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EUOD_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EUOD_erase.call(this);
	if( this.drill_EUOD_hasTag() ){
		$gameTemp._drill_EUOD_needRestatistics = true;
	}
};
//==============================
// * 容器 - 获取对象列表（根据标签）
//==============================
Game_Temp.prototype.drill_EUOD_getCharacterListByTag = function( tag ){
	if( this._drill_EUOD_keyMap[ tag ] == undefined ){ return []; }
	return this._drill_EUOD_keyMap[ tag ];
};


//=============================================================================
// ** ☆一体化朝向控制
//
//			说明：	> 此模块专门控制 转向功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 朝向控制 - 设置朝向
//==============================
var _drill_EUOD_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function( d ){
	if( this.drill_EUOD_hasTag() ){
		$gameMap.drill_EUOD_setDirectionByTag( d, this.drill_EUOD_getTag() );
	}else{
		_drill_EUOD_setDirection.call(this,d);
	}
}
//==============================
// * 朝向控制 - 设置整体转向
//==============================
Game_Map.prototype.drill_EUOD_setDirectionByTag = function( d, tag ){
	var ch_list = $gameTemp.drill_EUOD_getCharacterListByTag( tag );
	for(var j = 0; j < ch_list.length; j++ ){
		var ch = ch_list[j];
	    if(!ch.isDirectionFixed() && d ){
			ch._direction = d;
		}
		ch.resetStopCount();
	}
}

