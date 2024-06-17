//=============================================================================
// Drill_EventUnificationOfMove.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        体积 - 一体化 & 移动
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventUnificationOfMove +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得多个事件绑定在一起，其中一个事件移动，都能同步影响所有绑定的事件。
 * ★★必须放在 物体-移动速度 的插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于插件才能运行。并且可以被其他插件扩展。
 * 基于：
 *   - Drill_EventThrough        体积-事件穿透关系
 *     通过该插件，才能进行物体整体移动。
 * 可被扩展：
 *   - Drill_MoveSpeed           物体-移动速度★★v1.3以上★★
 *     通过移动速度插件，能实现 精确速度 统一。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件和玩家。
 * 2.详细介绍可以去看看 "27.体积 > 关于事件一体化.docx"。
 * 移动一体化：
 *   (1.由于结构的特殊性，同类型的一体化标签，只能同时拥有一个。
 *   (2.当多个事件组成一个整体时，尽量只留一个"动力源"来执行移动。
 *   (3.如果整体里一个事件要向上走，另一个事件向下走，则根据id顺序来决定
 *      听谁的。假设向上走的事件被阻塞不能向上走，则听从下一个事件的走法。
 *   (4.在循环地图中，整体也可以正常移动，不过偶尔可能会出现瞬移。
 * 速度统一：
 *   (1.速度是作为移动的一个属性而存在的，与直接一体化性质不同。
 *   (2.事件组整体移动时，速度可以不一样，如果未设置速度一体化，可能会造
 *      成其中一个事件速度慢了出现了脱节一格的情况。
 *   (3.整体速度以走动中的"动力源"的速度为准。多个动力源时，不管速度谁快
 *      谁慢，全部按照正在走的那个事件/玩家的速度来走。
 * 设计：
 *   (1.你可以使用 一体化&移动 和 一体化&触发 来设计占多格图块的大方块。
 *      体积大的方块会承受多次攻击，具体去 物体触发管理层示例 看看。
 *   (2.体积管理层示例 右侧有 速度统一 的事件，左右两侧有两个方块。
 *      玩家开启后，方块和玩家合并，变成了3格图块的大物体，可用来设计华容
 *      道谜题。也可以将方块作为玩家装载的两门大炮，大炮持续发射弹丸，可
 *      用来炸碎石头。
 *  
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过事件注释将事件绑定在一起：
 * （注意，冒号左右两边有空格）
 * 
 * 事件注释：=>一体化&移动 : 绑定标签 : 大箱子_移动_A
 * 事件注释：=>一体化&移动 : 开启速度统一
 *
 * 1.标签可以是任意自定义的字符串，但注意字符串不能出现空格。
 *   事件注释的设置跨事件页，即绑定标签后，切换事件页不会改变一体化的设置。
 * 2.可以将多个事件组合成一个大体积的箱子。（朝向固定+移动一体化）
 *   或者一个大整体的小爱丽丝。（移动+朝向一体化）
 * 3.整体速度以走动中的"动力源"的速度为准。多个动力源时，不管速度谁快
 *   谁慢，全部按照正在走的那个事件/玩家的速度来走。
 * 
 * 事件注释(旧)：=>事件一体化 : 移动标签 : 鼠标一体化示例_A
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 玩家和事件可以通过插件指令设置移动一体化：
 *
 * 插件指令：>一体化&移动 : 玩家 : 绑定标签 : 标签[大箱子_移动_A]
 * 插件指令：>一体化&移动 : 本事件 : 绑定标签 : 标签[大箱子_移动_A]
 * 插件指令：>一体化&移动 : 事件[10] : 绑定标签 : 标签[大箱子_移动_A]
 * 插件指令：>一体化&移动 : 事件变量[21] : 绑定标签 : 标签[大箱子_移动_A]
 * 插件指令：>一体化&移动 : 批量事件[10,11] : 绑定标签 : 标签[大箱子_移动_A]
 * 插件指令：>一体化&移动 : 批量事件变量[21,22] : 绑定标签 : 标签[大箱子_移动_A]
 * 
 * 插件指令：>一体化&移动 : 本事件 : 绑定标签 : 标签[大箱子_移动_A]
 * 插件指令：>一体化&移动 : 本事件 : 去除标签
 * 插件指令：>一体化&移动 : 本事件 : 开启速度统一
 * 插件指令：>一体化&移动 : 本事件 : 关闭速度统一
 *
 * 1.插件指令前面部分（本事件）和后面设置（绑定标签 : 标签[大箱子_移动_A]）可以随意组合。
 *   一共有6*4种组合方式。
 * 2.插件指令添加标签后，只在当前地图有效，离开地图后消失。
 * 3."速度统一"是对于事件而言的，如果开启了速度统一，那么必须要在它自己作
 *   为 动力源 时，才能使得其他整体速度一致变化。
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
 * 测试结果：   200个事件的地图中，消耗为：【19.05ms】
 *              100个事件的地图中，消耗为：【16.20ms】
 *               50个事件的地图中，消耗为：【9.28ms】
 * 测试方法2：  直接在设计华容道地图中测试性能。
 * 测试结果2：  100个一体化事件，消耗为：【21.19ms】
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
 * [v1.1]
 * 修复了该插件限制玩家移动速度的bug。
 * 
 * 
 * 
 * @param 玩家移动一体化标签
 * @type text
 * @desc 初始玩家进入游戏时，默认的具备的移动标签。
 * @default 玩家_移动一体化
 * 
 * @param 玩家速度是否统一
 * @type boolean
 * @on 统一
 * @off 关闭
 * @desc 如果有事件与玩家一体化，玩家移动时，事件的速度与玩家统一。
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EUOM（Event_Unification_Of_Move）
//		临时全局变量	无
//		临时局部变量	this._drill_EUOM.xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.moveStraight	（半覆写）
//						Game_CharacterBase.prototype.moveDiagonally	（半覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	体积管理层
//		★性能测试消耗	16.2ms（drill_EUOM_moveStraight_ByTag）华容道200事件15.1ms（drill_EUOM_moveStraight_ByTag）
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
//				->标签
//					->刷新穿透标签
//				->速度统一
//					->设置开关
//					->获取ID（根据物体）
//					->获取物体（根据ID）
//					->保存速度
//					->还原速度
//					->修改为指定物体的速度
//			->☆一体化移动容器
//
//			->☆一体化移动控制
//				->直线移动
//				->直线整体移动
//				->斜向移动
//				->斜向整体移动
//			->☆速度统一
//				->帧同步移动
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
//			1.执行move命令的时候，事件的update是依次执行的。被牵动的事件会因为当前帧update了，不执行移动操作。
//			  要实现整体移动，当前帧需要等一帧，确保下一帧所有事件都统一开始移动。
//			2.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//
//		★其它说明细节：
//			1.移动一体化：拦截含有移动标签的事件，统一移动。需要确保只有一个动力源。
//				
//		★存在的问题：
//			1.问题：玩家与事件一体化移动 仍然存在一些细节问题，这里没有继续深入。
//			  解决：【已解决】，是isMoving中断造成的bug。
//			

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_EUOM_PluginTip_curName = "Drill_EventUnificationOfMove.js 体积 - 一体化 & 移动";
	DrillUp.g_EUOM_PluginTip_baseList = ["Drill_EventThrough.js 体积-事件穿透关系"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EUOM_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EUOM_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EUOM_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EUOM_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EUOM_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EUOM_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EUOM_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 插件冲突（旧插件）
	//==============================
	DrillUp.drill_EUOM_getPluginTip_ConflictOldName = function(){
		return "【" + DrillUp.g_EUOM_PluginTip_curName + "】\n注意，检测到重复的旧插件：Drill_EventUnification 体积-事件一体化，请及时去掉旧插件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventUnificationOfMove = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventUnificationOfMove');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EUOM_move = String(DrillUp.parameters['玩家移动一体化标签'] || "");
    DrillUp.g_EUOM_speed = String(DrillUp.parameters['玩家速度是否统一'] || "true") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventUnification ){
	alert( DrillUp.drill_EUOM_getPluginTip_ConflictOldName() );
};
if( Imported.Drill_EventSelfSwitch &&
	Imported.Drill_EventThrough ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EUOM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args ){
	_drill_EUOM_pluginCommand.call(this, command, args);
	if( command === ">一体化&移动" ){
		
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
					if( $gameMap.drill_EUOM_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EUOM_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EUOM_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EUOM_isEventExist( e_id ) == false ){ return; }
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
					ch.drill_EUOM_setTag( temp3 );
				}
				$gameTemp._drill_EUOM_needRestatistics = true;
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除标签" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_EUOM_clearTag();
				}
				$gameTemp._drill_EUOM_needRestatistics = true;
			}
			if( type == "开启速度统一" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_EUOM_setKeepSameSpeed( true );
				}
			}
			if( type == "关闭速度统一" ){
				for(var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					ch.drill_EUOM_setKeepSameSpeed( false );
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EUOM_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EUOM_getPluginTip_EventNotFind( e_id ) );
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
var _drill_EUOM_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EUOM_event_initMembers.call(this);
	this._drill_EUOM_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EUOM_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EUOM_event_setupPage.call(this);
    this.drill_EUOM_setupEvent();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EUOM_setupEvent = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EUOM_isFirstBirth == true ){ 
		this._drill_EUOM_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EUOM_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EUOM_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EUOM_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>一体化&移动"){	//=>一体化&移动 : 绑定标签 : 标签[移动_A]
				if( args.length == 4 ){
					var type = String(args[1]); 
					var temp1 = String(args[3]); 
					if( type == "绑定标签" || type == "设置标签" ){
						temp1 = temp1.replace("标签[","");
						temp1 = temp1.replace("]","");
						this.drill_EUOM_setTag( temp1 );
						$gameTemp._drill_EUOM_needRestatistics = true;
					}
				}
				if( args.length == 2 ){
					var type = String(args[1]); 
					if( type == "开启速度统一" ){
						this.drill_EUOM_setKeepSameSpeed( true );
					}
				}
			};
			
			/*-----------------旧指令------------------*/
			if( command == "=>事件一体化" ){	//=>事件一体化 : 移动标签 : 鼠标一体化示例_A
				if( args.length == 4 ){
					var type = String(args[1]); 
					var temp1 = String(args[3]); 
					if( type == "移动标签" ){
						temp1 = temp1.replace("标签[","");
						temp1 = temp1.replace("]","");
						this.drill_EUOM_setTag( temp1 );
						$gameTemp._drill_EUOM_needRestatistics = true;
					}
				}
				if( args.length == 2 ){
					var type = String(args[1]); 
					if( type == "开启速度统一" ){
						this.drill_EUOM_setKeepSameSpeed( true );
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
var _drill_EUOM_key_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EUOM_keyData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EUOM_key_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_CharacterBase.prototype.drill_EUOM_checkKeyData = function(){
	if( this._drill_EUOM_keyData != undefined ){ return; }
	this._drill_EUOM_keyData = {};
	this._drill_EUOM_keyData['tag'] = "";		//标签（只能绑定一个，因为一个和多个标签的效果相同）
	
	this._drill_EUOM_keyData['keepSameSpeed'] = undefined;			//速度统一 - 开关（布尔）
	this._drill_EUOM_keyData['orgSpeed'] = undefined;				//速度统一 - 保存的速度（数字）
	this._drill_EUOM_keyData['orgASpeed'] = undefined;				//速度统一 - 保存的精确速度（数字）
	this._drill_EUOM_keyData['unifyingCharacterId'] = undefined;	//速度统一 - 保存的动力源ID（数字）
}
//==============================
// * 物体的属性 - 标签
//==============================
Game_Character.prototype.drill_EUOM_hasTag = function(){
	return this.drill_EUOM_getTag() != "";
}
//==============================
// * 物体的属性 - 标签 - 获取
//==============================
Game_Character.prototype.drill_EUOM_getTag = function(){
	if( this._drill_EUOM_keyData == undefined ){ return ""; }
	if( this._drill_EUOM_keyData['tag'] == undefined ){ return ""; }
	return this._drill_EUOM_keyData['tag'];
}
//==============================
// * 物体的属性 - 标签 - 设置
//==============================
Game_Character.prototype.drill_EUOM_setTag = function( tag ){
	this.drill_EUOM_checkKeyData();
	this.drill_EUOM_ETh_setNewTag( tag );
	this._drill_EUOM_keyData['tag'] = tag;
	if( this == $gamePlayer ){
		alert( tag );
	}
}
//==============================
// * 物体的属性 - 标签 - 去除
//==============================
Game_Character.prototype.drill_EUOM_clearTag = function(){
	this.drill_EUOM_checkKeyData();
	this.drill_EUOM_ETh_setNewTag( "" );
	this._drill_EUOM_keyData['tag'] = "";
}
//==============================
// * 物体的属性 - 标签 - 刷新穿透标签
//==============================
Game_Character.prototype.drill_EUOM_ETh_setNewTag = function( new_tag ){
	
	// > 穿透标签 - 【体积-事件穿透关系】
	this.drill_ETh_checkData();
	
	// > 穿透标签 - 去除旧标签
	var org_tag = this.drill_EUOM_getTag();
	this.drill_ETh_removeTag( "_drill_EUOM_" + org_tag );
	
	// > 穿透标签 - 设置新标签
	if( new_tag != "" ){
		this.drill_ETh_addTag( "_drill_EUOM_" + new_tag );
	}
}
//==============================
// * 物体的属性 - 标签 - 玩家初始化
//==============================
var _drill_EUOM_p_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function(){
	_drill_EUOM_p_initMembers.call(this);
	
	// > 初始化移动标签
	this.drill_EUOM_setTag( DrillUp.g_EUOM_move );
	$gameTemp._drill_EUOM_needRestatistics = true;
}

//==============================
// * 物体的属性 - 速度统一 - 设置开关
//==============================
Game_Character.prototype.drill_EUOM_setKeepSameSpeed = function( enabled ){
	this.drill_EUOM_checkKeyData();
	this._drill_EUOM_keyData['keepSameSpeed'] = enabled;
}
//==============================
// * 物体的属性 - 速度统一 - 获取ID（根据物体）
//==============================
Game_Map.prototype.drill_EUOM_getIdByCharacter = function( character ){
	
	// > 玩家 为-2
	if( character == $gamePlayer ){ return -2; }	//『玩家id』
	
	// > 事件 为事件id
	if( character instanceof Game_Event ){ return character._eventId; }
	
	return undefined;
};
//==============================
// * 物体的属性 - 速度统一 - 获取物体（根据ID）
//==============================
Game_Map.prototype.drill_EUOM_getCharacterById = function( id ){
	
	// > 玩家 为-2
	if( id == -2 ){ return $gamePlayer; }	//『玩家id』
	
	// > 事件 为事件id
	if( id >= 0 ){ return $gameMap.event( id ); }
	
	return undefined;
};
//==============================
// * 物体的属性 - 速度统一 - 保存速度
//
//			说明：	> 该函数可在帧刷新中执行，只有在 undefined 的情况时才能保存。
//==============================
Game_CharacterBase.prototype.drill_EUOM_saveOrgSpeed = function( unifying_ch_id ){
	this.drill_EUOM_checkKeyData();
	
	if( this._drill_EUOM_keyData['unifyingCharacterId'] == undefined ){
		this._drill_EUOM_keyData['unifyingCharacterId'] = unifying_ch_id;
	}
	// > 保存速度【物体-移动速度】
	if( Imported.Drill_MoveSpeed ){
		if( this._drill_EUOM_keyData['orgASpeed'] == undefined ){
			this._drill_EUOM_keyData['orgASpeed'] = this.drill_MS_getASpeed();
		}
	}else{
		if( this._drill_EUOM_keyData['orgSpeed'] == undefined ){
			this._drill_EUOM_keyData['orgSpeed'] = this._moveSpeed;
		}
	}
}
//==============================
// * 物体的属性 - 速度统一 - 还原速度
//
//			说明：	> 该函数可在帧刷新中执行，只有在 非空 的情况时才能还原。
//==============================
Game_CharacterBase.prototype.drill_EUOM_restoreOrgSpeed = function(){
	this.drill_EUOM_checkKeyData();
	
	if( this._drill_EUOM_keyData['unifyingCharacterId'] != undefined ){
		this._drill_EUOM_keyData['unifyingCharacterId'] =  undefined;
	}
	// > 还原速度【物体-移动速度】
	if( Imported.Drill_MoveSpeed ){
		if( this._drill_EUOM_keyData['orgASpeed'] != undefined ){
			this.drill_MS_setASpeed( this._drill_EUOM_keyData['orgASpeed'] );
			this._drill_EUOM_keyData['orgASpeed'] =  undefined;
		}
	}else{
		if( this._drill_EUOM_keyData['orgSpeed'] != undefined ){
			this._moveSpeed = this._drill_EUOM_keyData['orgSpeed'];
			this._drill_EUOM_keyData['orgSpeed'] =  undefined;
		}
	}
}
//==============================
// * 物体的属性 - 速度统一 - 修改为指定物体的速度
//==============================
Game_CharacterBase.prototype.drill_EUOM_setSpeedFromCharacter = function( tar_ch ){
	
	// > 自身不需要
	if( this == tar_ch ){ return; }
	
	// > 修改速度【物体-移动速度】
	if( Imported.Drill_MoveSpeed ){
		this.drill_MS_setASpeed( tar_ch.drill_MS_getRealASpeed() );
	}else{
		this._moveSpeed = tar_ch._moveSpeed;
	}
}


//=============================================================================
// ** ☆一体化移动容器
//
//			说明：	> 此模块专门定义 一体化移动 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EUOM_clearTemp = function(){
	this._drill_EUOM_keyMap = {};
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EUOM_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EUOM_temp_initialize.call(this);
	this.drill_EUOM_clearTemp();
	this._drill_EUOM_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EUOM_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EUOM_clearTemp();
	$gameTemp._drill_EUOM_needRestatistics = true;
	_drill_EUOM_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EUOM_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EUOM_clearTemp();
	$gameTemp._drill_EUOM_needRestatistics = true;
	_drill_EUOM_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EUOM_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EUOM_map_update.call( this, sceneActive );
	this.drill_EUOM_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EUOM_updateRestatistics = function(){
	if( $gameTemp._drill_EUOM_needRestatistics != true ){ return }
	$gameTemp._drill_EUOM_needRestatistics = false;
	
	$gameTemp._drill_EUOM_keyMap = {};
	var character_list = [];
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		character_list.push( temp_event );
	}
	
	character_list.push( $gamePlayer );
	for (var i = 0; i < character_list.length; i++) {  
		var temp_ch = character_list[i];
		
		var tag = temp_ch.drill_EUOM_getTag();
		if( tag == "" ){ continue; }
		if( $gameTemp._drill_EUOM_keyMap[ tag ] == undefined ){
			$gameTemp._drill_EUOM_keyMap[ tag ] = [];
		}
		$gameTemp._drill_EUOM_keyMap[ tag ].push( temp_ch );	//（存放 事件指针）
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EUOM_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EUOM_erase.call(this);
	if( this.drill_EUOM_hasTag() ){
		$gameTemp._drill_EUOM_needRestatistics = true;
	}
};
//==============================
// * 容器 - 获取对象列表（根据标签）
//==============================
Game_Temp.prototype.drill_EUOM_getCharacterListByTag = function( tag ){
	if( this._drill_EUOM_keyMap[ tag ] == undefined ){ return []; }
	return this._drill_EUOM_keyMap[ tag ];
};



//=============================================================================
// ** ☆一体化移动控制
//
//			说明：	> 此模块专门控制 移动 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体 - 直线移动（半覆写）
//==============================
var _drill_EUOM_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function( d ){
	
	// > 判定 - 是否有标签
	var tag = this.drill_EUOM_getTag();
	if( tag == "" ){
		
		// > 原函数
		_drill_EUOM_moveStraight.call( this, d );
		return;
	}
	
	// > 判定 - 是否组内只有一个对象
	var ch_list = $gameTemp.drill_EUOM_getCharacterListByTag( tag );	//（含玩家）
	if( ch_list.length == 1 ){	//（要排除 == 0 的情况，不然加载地图时小爱丽丝就移动会错位）
		
		// > 原函数
		_drill_EUOM_moveStraight.call( this, d );
		return;
	}
	
	// > 直线整体移动
	//		（当前物体+标签内所有物体，遍历控制移动）
	var unifying_ch_id = $gameMap.drill_EUOM_getIdByCharacter( this );
	$gameMap.drill_EUOM_moveStraight_ByTag( d, ch_list, unifying_ch_id );
	this.setDirection(d);
};
//==============================
// * 地图 - 直线整体移动
//==============================
Game_Map.prototype.drill_EUOM_moveStraight_ByTag = function( d, ch_list, unifying_ch_id ){
	
	// > 整体是否可移动
	var can_pass = true;
	for(var j = 0; j < ch_list.length; j++){
		var ch = ch_list[j];
		if( ch.canPass( ch._x, ch._y, d ) == false ){
			can_pass = false;
		}
	}
	
	// > 整体执行移动
	for(var j = 0; j < ch_list.length; j++){
		var ch = ch_list[j];
		ch.setMovementSuccess(can_pass);
		
		// > 速度统一 - 保存速度
		ch.drill_EUOM_saveOrgSpeed( unifying_ch_id );
		
		
		// > 执行移动
		if( can_pass ){
			
			//ch._x = $gameMap.roundXWithDirection(ch._x, d);		//取消自动锁定位置，因为进入循环地图，角色会到处飞
			//ch._y = $gameMap.roundYWithDirection(ch._y, d);
			//ch._realX = $gameMap.xWithDirection(ch._x, ch.reverseDir(d));	//取消位置修正，被拖动的物体会根据当前位置滑行
			//ch._realY = $gameMap.yWithDirection(ch._y, ch.reverseDir(d));
			if( this.isLoopHorizontal() ){			
				ch._x = $gameMap.xWithDirection(ch._x, d);
				if( ch._x >= this.width() ){		//（这里的功能是把round函数的条件拆解出来单独处理）
					ch._x -= this.width();
					ch._realX -= this.width();
				}
				if( ch._x < 0 ){
					ch._x += this.width();
					ch._realX += this.width();
				}
			}else{
				ch._x = $gameMap.roundXWithDirection(ch._x, d);
			}
			if( this.isLoopVertical() ){
				ch._y = $gameMap.yWithDirection(ch._y, d);
				if( ch._y >= this.height() ){
					ch._y -= this.height();
					ch._realY -= this.height();
				}
				if( ch._y < 0 ){
					ch._y += this.height();
					ch._realY += this.height();
				}
			}else{
				ch._y = $gameMap.roundYWithDirection(ch._y, d);
			}
			
			// > 速度统一 - 当前帧等待
			this._drill_EUOM_movingWaitOneF = true;
			
			ch.increaseSteps();
			
		// > 不能移动时
		}else{
			ch.checkEventTriggerTouchFront(d);
		}
		
	}
};

//==============================
// * 物体 - 斜向移动（半覆写）
//==============================
var _drill_EUOM_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function( horz, vert ){
	
	// > 判定 - 是否有标签
	var tag = this.drill_EUOM_getTag();
	if( tag == "" ){
		
		// > 原函数
		_drill_EUOM_moveDiagonally.call( this, horz, vert );
		return;
	}
	
	// > 判定 - 是否组内只有一个对象
	var ch_list = $gameTemp.drill_EUOM_getCharacterListByTag( tag );	//（含玩家）
	if( ch_list.length == 1 ){	//（要排除 == 0 的情况，不然加载地图时小爱丽丝就移动会错位）
		
		// > 原函数
		_drill_EUOM_moveDiagonally.call( this, horz, vert );
		return;
	}
	
	// > 直线整体移动
	//		（当前物体+标签内所有物体，遍历控制移动）
	var unifying_ch_id = $gameMap.drill_EUOM_getIdByCharacter( this );
	$gameMap.drill_EUOM_moveDiagonally_ByTag( horz, vert, ch_list, unifying_ch_id );
	if( this._direction === this.reverseDir(horz) ){ this.setDirection(horz); }
	if( this._direction === this.reverseDir(vert) ){ this.setDirection(vert); }
};
//==============================
// * 地图 - 斜向整体移动
//==============================
Game_Map.prototype.drill_EUOM_moveDiagonally_ByTag = function( horz, vert, ch_list, unifying_ch_id ){
	
	// > 整体是否可移动
	var can_pass = true;
	for(var j = 0; j < ch_list.length; j++){
		var ch = ch_list[j];
		if( ch.canPassDiagonally( ch._x, ch._y, horz, vert ) == false ){
			can_pass = false;
		}
	}
	
	// > 整体执行移动
	for(var j = 0; j < ch_list.length; j++){
		var ch = ch_list[j];
		ch.setMovementSuccess(can_pass);
		
		// > 速度统一 - 保存速度
		ch.drill_EUOM_saveOrgSpeed( unifying_ch_id );
		
		
		// > 执行移动
		if( can_pass ){
			
			//ch._x = $gameMap.roundXWithDirection(ch._x, horz);
			//ch._y = $gameMap.roundYWithDirection(ch._y, vert);
			//ch._realX = $gameMap.xWithDirection(ch._x, ch.reverseDir(horz));
			//ch._realY = $gameMap.yWithDirection(ch._y, ch.reverseDir(vert));
			if( this.isLoopHorizontal() ){
				ch._x = $gameMap.xWithDirection(ch._x, horz);
				if( ch._x >= this.width() ){		//（这里的功能是把round函数的条件拆解出来单独处理）
					ch._x -= this.width();
					ch._realX -= this.width();
				}
				if( ch._x < 0 ){
					ch._x += this.width();
					ch._realX += this.width();
				}
			}else{
				ch._x = $gameMap.roundXWithDirection(ch._x, horz);
			}
			if( this.isLoopVertical() ){
				ch._y = $gameMap.yWithDirection(ch._y, vert);
				if( ch._y >= this.height() ){
					ch._y -= this.height();
					ch._realY -= this.height();
				}
				if( ch._y < 0 ){
					ch._y += this.height();
					ch._realY += this.height();
				}
			}else{
				ch._y = $gameMap.roundYWithDirection(ch._y, vert);
			}
			
			// > 速度统一 - 当前帧等待
			$gameMap._drill_EUOM_movingWaitOneF = true;
			
			ch.increaseSteps();
			
		// > 不能移动时
		}else{
			//（不操作）
		}
	}
};


//=============================================================================
// ** ☆速度统一
//
//			说明：	> 此模块专门控制 速度统一 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 速度统一 - 当前帧等待
//==============================
var _drill_EUOM_m_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	
	// > 等待1帧
	if( this._drill_EUOM_movingWaitOneF == true ){
		this._drill_EUOM_movingWaitOneF = false;
	}
	
	// > 原函数
    _drill_EUOM_m_update.call( this, sceneActive );
};
//==============================
// * 速度统一 - 帧同步移动
//==============================
var _drill_EUOM_m_updateMove = Game_CharacterBase.prototype.updateMove;	
Game_CharacterBase.prototype.updateMove = function(){
	
	if( this.drill_EUOM_hasTag() &&		//（仅限事件跟随玩家 移动一体化）
		this instanceof Game_Event ){
		
		// > 暂停一帧，再开始移动位置
		if( $gameMap._drill_EUOM_movingWaitOneF === true ){
			return;
		}
		
		// > 修改速度
		var u_c_id = this._drill_EUOM_keyData['unifyingCharacterId'];
		if( u_c_id != undefined ){
			
			var u_c = $gameMap.drill_EUOM_getCharacterById( u_c_id );
			if( u_c._drill_EUOM_keyData['keepSameSpeed'] == true ){
				
				this.drill_EUOM_setSpeedFromCharacter( u_c );
			}
		}
	}
	
	// > 原函数
    _drill_EUOM_m_updateMove.call(this);
}
/*
	var _drill_EUOM_isMoving = Game_CharacterBase.prototype.isMoving;	//该方法会造成move判定中断
	Game_CharacterBase.prototype.isMoving = function(){
		if( $gameMap._drill_EUOM_movingWaitOneF === true && this.drill_EUOM_hasTag() ){
			return false;
		}
		return _drill_EUOM_isMoving.call(this);
	};
*/
//==============================
// * 速度统一 - 还原速度
//==============================
var _drill_EUOM_updateStop = Game_CharacterBase.prototype.updateStop;
Game_CharacterBase.prototype.updateStop = function(){
	_drill_EUOM_updateStop.call(this);
	
	if( this._drill_EUOM_keyData == undefined ){ return; }
	this.drill_EUOM_restoreOrgSpeed();		//（只要暂停，就立即 还原速度）
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventUnificationOfMove = false;
		var pluginTip = DrillUp.drill_EUOM_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

