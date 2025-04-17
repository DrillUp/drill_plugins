//=============================================================================
// Drill_EventUnificationOfTrigger.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        体积 - 一体化 & 触发
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventUnificationOfTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得多个事件绑定在一起，其中一个事件触发后，都能同步影响所有绑定的事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于插件才能运行。并且可以被其他插件扩展。
 * 基于：
 *   - Drill_EventSelfSwitch         物体-独立开关
 *     通过该插件，才能进行物体整体移动。
 * 可被扩展：
 *   - Drill_EventMouseHoverSwitch   物体-鼠标悬停响应开关
 *     通过鼠标悬停响应开关，能对绑定的事件整体悬停触发。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件。
 * 2.详细介绍可以去看看 "27.体积 > 关于事件一体化.docx"。
 * 触发一体化：
 *   (1.由于结构的特殊性，同类型的一体化标签，只能同时拥有一个。
 *   (2.独立开关开启时，统一开启/关闭所有同标签事件的开关。
 *   (3.通过 鼠标悬停响应开关 插件，能对相同标签的全部事件整体进行悬停触发。
 * 设计：
 *   (1.你可以使用 一体化&移动 和 一体化&触发 来设计占多格图块的大方块。
 *      体积大的方块会承受多次攻击，具体去 物体触发管理层示例 看看。
 *  
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过事件注释将事件绑定在一起：
 * （注意，冒号左右两边有空格）
 * 
 * 事件注释：=>一体化&触发 : 绑定标签 : 标签[触发_A]
 *
 * 1.标签可以是任意自定义的字符串，但注意字符串不能出现空格。
 *   事件注释的设置跨事件页，即绑定标签后，切换事件页不会改变一体化的设置。
 * 
 * 事件注释(旧)：=>事件一体化 : 触发标签 : 鼠标一体化示例_A
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 玩家和事件可以通过插件指令设置移动、朝向一体化：
 *
 * 插件指令：>一体化&触发 : 本事件 : 绑定标签 : 标签[大箱子_触发_A]
 * 插件指令：>一体化&触发 : 事件[10] : 绑定标签 : 标签[大箱子_触发_A]
 * 插件指令：>一体化&触发 : 事件变量[21] : 绑定标签 : 标签[大箱子_触发_A]
 * 插件指令：>一体化&触发 : 批量事件[10,11] : 绑定标签 : 标签[大箱子_触发_A]
 * 插件指令：>一体化&触发 : 批量事件变量[21,22] : 绑定标签 : 标签[大箱子_触发_A]
 * 
 * 插件指令：>一体化&触发 : 本事件 : 绑定标签 : 标签[大箱子_触发_A]
 * 插件指令：>一体化&触发 : 本事件 : 去除标签
 * 
 * 1.插件指令前面部分（本事件）和后面设置（绑定标签 : 标签[大箱子_触发_A]）可以随意组合。
 *   一共有5*2种组合方式。
 * 2.插件指令添加标签后，只在当前地图有效，离开地图后消失。
 * 3.由于玩家不是事件，没有触发功能，所以给玩家添加 触发标签 没有任何效果。
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
 * 测试方法2：  直接在设计华容道地图中测试性能。
 * 测试结果2：  100个一体化事件，消耗为：【6.41ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行的插件几乎没有消耗，但考虑到该插件与鼠标触发组合使用
 *   情况，会多出一定的消耗量。因为鼠标触发是持续执行的。
 * 3.插件反复优化了多次，能稍微经得起超多事件的消耗。
 *   （经不起消耗的插件一般会直接爆炸升到 1500ms 以上。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EUOT（Event_Unification_Of_Trigger）
//		临时全局变量	无
//		临时局部变量	this._drill_EUOT.xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	体积管理层
//		★性能测试消耗	0.4ms（drill_EUOT_getEventListByTag）华容道200事件5.0ms（drill_EUOT_getEventListByTag）
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
//			->☆一体化触发容器
//			->☆一体化触发控制
//			->☆一体化触发的开关兼容
//				->【物体 - 鼠标悬停响应开关】
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
//			1.触发一体化：独立开关开启时，统一开启/关闭所有相同标签的开关。（这里需要其他插件进行适应）
//			2.考虑到标签的问题，这里强制每个事件只能设置一个标签，原先的多标签被弃用：
//					//this._drill_EUOT['trigger'] = {};
//					//this._drill_EUOT['trigger'].enabled = false;
//					//this._drill_EUOT['trigger'].tags = {};
//				原因是：当标签绑定在玩家身上时，发现两个标签使得玩家一次移动变成了两次。（如果继续深入下去，程序会极其复杂）
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
	DrillUp.g_EUOT_PluginTip_curName = "Drill_EventUnificationOfTrigger.js 体积 - 一体化 & 触发";
	DrillUp.g_EUOT_PluginTip_baseList = ["Drill_EventSelfSwitch.js 物体-独立开关"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EUOT_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EUOT_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EUOT_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EUOT_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EUOT_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EUOT_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EUOT_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 插件冲突（旧插件）
	//==============================
	DrillUp.drill_EUOT_getPluginTip_ConflictOldName = function(){
		return "【" + DrillUp.g_EUOT_PluginTip_curName + "】\n注意，检测到重复的旧插件：Drill_EventUnification 体积-事件一体化，请及时去掉旧插件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventUnificationOfTrigger = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventUnificationOfTrigger');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventUnification ){
	alert( DrillUp.drill_EUOT_getPluginTip_ConflictOldName() );
};
if( Imported.Drill_EventSelfSwitch ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_EUOT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EUOT_pluginCommand.call(this, command, args);
	this.drill_EUOT_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_EUOT_pluginCommand = function( command, args ){
	if( command === ">一体化&触发" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			//（只有事件）
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EUOT_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EUOT_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EUOT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EUOT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return };
		
		/*-----------------设置标签------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			
			if( type == "绑定标签" || type == "设置标签" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_EUOT_setTag( temp3 );
				}
				$gameTemp._drill_EUOT_needRestatistics = true;
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除标签" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_EUOT_clearTag();
				}
				$gameTemp._drill_EUOT_needRestatistics = true;
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EUOT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EUOT_getPluginTip_EventNotFind( e_id ) );
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
var _drill_EUOT_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EUOT_event_initMembers.call(this);
	this._drill_EUOT_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EUOT_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EUOT_event_setupPage.call(this);
    this.drill_EUOT_setupEvent();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EUOT_setupEvent = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EUOT_isFirstBirth == true ){ 
		this._drill_EUOT_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EUOT_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EUOT_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EUOT_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			
			/*-----------------绑定标签------------------*/
			if( command == "=>一体化&触发" ){	//=>一体化&触发 : 绑定标签 : 标签[触发_A]
				if( args.length == 4 ){
					var type = String(args[1]); 
					var temp1 = String(args[3]); 
					if( type == "绑定标签" || type == "设置标签" ){
						temp1 = temp1.replace("标签[","");
						temp1 = temp1.replace("]","");
						this.drill_EUOT_setTag( temp1 );
						$gameTemp._drill_EUOT_needRestatistics = true;
					}
				}
			};
			
			/*-----------------旧指令------------------*/
			if( command == "=>事件一体化" ){	//=>事件一体化 : 触发标签 : 鼠标一体化示例_A
				if( args.length == 4 ){
					var type = String(args[1]); 
					var temp1 = String(args[3]); 
					if( type == "触发标签" ){
						temp1 = temp1.replace("标签[","");
						temp1 = temp1.replace("]","");
						this.drill_EUOT_setTag( temp1 );
						$gameTemp._drill_EUOT_needRestatistics = true;
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
var _drill_EUOT_key_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EUOT_keyData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EUOT_key_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_EUOT_checkKeyData = function(){
	if( this._drill_EUOT_keyData != undefined ){ return; }
	this._drill_EUOT_keyData = {};
	this._drill_EUOT_keyData['tag'] = "";		//标签（只能绑定一个，因为一个和多个标签，触发结果都是相同的）
}
//==============================
// * 物体的属性 - 标签
//==============================
Game_Character.prototype.drill_EUOT_hasTag = function(){
	return this.drill_EUOT_getTag() != "";
}
//==============================
// * 物体的属性 - 标签 - 获取
//==============================
Game_Character.prototype.drill_EUOT_getTag = function(){
	if( this._drill_EUOT_keyData == undefined ){ return ""; }
	return this._drill_EUOT_keyData['tag'];
}
//==============================
// * 物体的属性 - 标签 - 设置
//==============================
Game_Character.prototype.drill_EUOT_setTag = function( tag ){
	this.drill_EUOT_checkKeyData();
	this._drill_EUOT_keyData['tag'] = tag;
}
//==============================
// * 物体的属性 - 标签 - 去除
//==============================
Game_Character.prototype.drill_EUOT_clearTag = function(){
	this.drill_EUOT_checkKeyData();
	this._drill_EUOT_keyData['tag'] = "";
}


//=============================================================================
// ** ☆一体化触发容器
//
//			说明：	> 此模块专门定义 一体化触发 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EUOT_clearTemp = function(){
	this._drill_EUOT_keyMap = {};
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EUOT_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EUOT_temp_initialize.call(this);
	this.drill_EUOT_clearTemp();
	this._drill_EUOT_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EUOT_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EUOT_clearTemp();
	$gameTemp._drill_EUOT_needRestatistics = true;
	_drill_EUOT_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EUOT_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EUOT_clearTemp();
	$gameTemp._drill_EUOT_needRestatistics = true;
	_drill_EUOT_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EUOT_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EUOT_map_update.call( this, sceneActive );
	this.drill_EUOT_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EUOT_updateRestatistics = function(){
	if( $gameTemp._drill_EUOT_needRestatistics != true ){ return }
	$gameTemp._drill_EUOT_needRestatistics = false;
	
	$gameTemp._drill_EUOT_keyMap = {};
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		var tag = temp_event.drill_EUOT_getTag();
		if( tag == "" ){ continue; }
		if( $gameTemp._drill_EUOT_keyMap[ tag ] == undefined ){
			$gameTemp._drill_EUOT_keyMap[ tag ] = [];
		}
		$gameTemp._drill_EUOT_keyMap[ tag ].push( temp_event );	//（存放 事件指针）
	}
	
	// > 开关兼容
	this.drill_EUOT_refreshSwitch();
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EUOT_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EUOT_erase.call(this);
	if( this.drill_EUOT_hasTag() ){
		$gameTemp._drill_EUOT_needRestatistics = true;
	}
};
//==============================
// * 容器 - 获取对象列表（根据标签）
//==============================
Game_Temp.prototype.drill_EUOT_getEventListByTag = function( tag ){
	if( this._drill_EUOT_keyMap[ tag ] == undefined ){ return []; }
	return this._drill_EUOT_keyMap[ tag ];
};


//=============================================================================
// ** ☆一体化触发控制
//
//			说明：	> 此模块专门控制 触发功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 独立开关控制 - 值变化时（继承）
//==============================
var _drill_EUOT_valueChanged = Game_SelfSwitches.prototype.drill_ESS_valueChanged;
Game_SelfSwitches.prototype.drill_ESS_valueChanged = function( key, value ){
	_drill_EUOT_valueChanged.call( this, key, value );
	//（ key的值：[ 地图id（mapId）, 事件id（eventId）, 字符串值（switch_str） ] ）
	
	if( $gameMap._mapId == key[0] ){
		var e = $gameMap.event(key[1]);
		if( e == undefined ){ return; }
		if( e._erased == true ){ return; }
		
		var tag = e.drill_EUOT_getTag();
		if( tag == "" ){ return; }
		var ev_list = $gameTemp.drill_EUOT_getEventListByTag( tag );	//触发时，所有相同标签的事件同时触发
		for(var i=0; i < ev_list.length; i++){
			var e_key = [ key[0], ev_list[i]._eventId, key[2] ];
			if( value ){ 
				this._data[e_key] = true;
			} else {
				delete this._data[e_key];
			}
		}
	}
};


//=============================================================================
// ** ☆一体化触发的开关兼容
//
//			说明：	> 此模块将 绑定在一起的触发事件，全都变成相同开关。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关兼容 - 刷新
//==============================
Game_Map.prototype.drill_EUOT_refreshSwitch = function(){
	var tag_list = Object.keys( $gameTemp._drill_EUOT_keyMap );
	
	// > 【物体 - 鼠标悬停响应开关】
	if( Imported.Drill_EventMouseHoverSwitch ){
		for(var i = 0; i < tag_list.length; i++ ){
			var tag = tag_list[i];
			var event_list = $gameTemp.drill_EUOT_getEventListByTag( tag );
			
			// > 找到配置 鼠标悬停响应开关 的事件
			var temp_switch = null;
			for(var j = 0; j < event_list.length; j++ ){
				var temp_event = event_list[j];
				if( temp_event._drill_EMoHS_switchData != undefined ){
					temp_switch = temp_event;
					break;
				}
			}
			if( temp_switch == null ){ continue; }
			
			// > 所有事件都配置相同的开关数据
			for(var j = 0; j < event_list.length; j++ ){
				var temp_event = event_list[j];
				if( temp_event == temp_switch ){ continue; }
				
				temp_event.drill_EMoHS_checkSwitchData();	//（Bean是一个对象类，不能直接复制指针）
				temp_event._drill_EMoHS_switchData['switch'] = JSON.parse(JSON.stringify( temp_switch._drill_EMoHS_switchData['switch'] ));
			}
			
			// > 刷新 鼠标悬停响应开关 的统计
			$gameTemp._drill_EMoHS_needRestatistics = true;
		}
	}
	
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventUnificationOfTrigger = false;
		var pluginTip = DrillUp.drill_EUOT_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

