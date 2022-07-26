//=============================================================================
// Drill_EventUnification.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        体积 - 事件一体化
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventUnification +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得多个相同标签的事件完全绑定在一起，形成一个整体。
 * ★★必须放在 基于 的插件后面★★
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
 *   - Drill_MouseTriggerEvent   鼠标-鼠标触发事件★★v1.2以上★★
 *     通过鼠标触发插件，能对事件整体进行触发。
 *   - Drill_MoveSpeed           物体-移动速度★★v1.3以上★★
 *     通过移动速度插件，精确的速度也能够统一。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件和玩家。
 * 2.事件一体化具有各种特殊的绑定分组方式，
 *   详细介绍可以去看看 "27.体积 > 关于事件一体化.docx"。
 * 细节：
 *   (1.由于结构的特殊性，同类型的一体化标签，只能同时拥有一个。
 *   (2.该插件的注释设置跨事件页。
 * 移动一体化：
 *   (1.当多个事件组成一个整体时，尽量只留一个"动力源"来执行移动。
 *   (2.如果整体里一个事件要向上走，另一个事件向下走，则根据id顺序来决定
 *      听谁的。假设向上走的事件被阻塞不能向上走，则听从下一个事件的走法。
 *   (3.在循环地图中，整体也可以正常移动，不过偶尔可能会出现瞬移。
 * 速度统一：
 *   (1.速度是作为移动的一个属性而存在的，与直接一体化性质不同。
 *   (2.事件组整体移动时，速度可以不一样，如果未设置速度一体化，可能会造
 *      成其中一个事件速度慢了出现了脱节一格的情况。
 *   (3.整体速度以走动中的"动力源"的速度为准。多个动力源时，不管速度谁快
 *      谁慢，全部按照正在走的那个事件/玩家的速度来走。
 * 朝向一体化：
 *   (1.含有相同朝向标签的事件，统一朝向。
 *   (2.注意要关闭事件"固定朝向"的设置。
 *   (3.添加标签后，事件会立即统一朝向，不会存在相同朝向标签的事件会出现
 *      朝向不同的情况。
 * 触发一体化：
 *   (1.独立开关开启时，统一开启/关闭所有同标签事件的开关。
 *   (2.通过鼠标触发插件，能对相同标签的全部事件整体进行触发。
 * 设计：
 *   (1.你可以使用 移动一体化和触发一体化 来设计占多格图块的大方块。
 *      体积大的方块会承受多次攻击，具体去 物体触发管理层 看看。
 *   (2.地图管理层右侧有 速度统一 的事件示例，左右两侧有两个方块。
 *      玩家开启后，方块和玩家合并，变成了3格图块的大物体，可用来设计华容
 *      道谜题。也可以将方块作为玩家装载的两门大炮，大炮持续发射弹丸，可
 *      用来炸碎石头。
 *  
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过事件注释将事件绑定在一起：
 * （注意，冒号左右两边有空格）
 * 
 * 事件注释：=>事件一体化 : 移动标签 : 大箱子_移动_A
 * 事件注释：=>事件一体化 : 朝向标签 : 朝向_A
 * 事件注释：=>事件一体化 : 触发标签 : 触发_A
 * 事件注释：=>事件一体化 : 开启速度统一
 *
 * 1.标签后面可以是任意自定义的字符串，但是字符串不能出现空格。
 * 2.可以将多个事件组合成一个大体积的箱子。（朝向固定+移动+触发一体化）
 *   或者一个大队伍的小爱丽丝。（移动+朝向一体化）
 * 3.整体速度以走动中的"动力源"的速度为准。多个动力源时，不管速度谁快
 *   谁慢，全部按照正在走的那个事件/玩家的速度来走。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 玩家和事件可以通过插件指令设置移动、朝向一体化：
 *
 * 插件指令：>事件一体化 : 玩家 : 设置移动标签 : 大箱子_移动_A
 * 插件指令：>事件一体化 : 本事件 : 设置移动标签 : 大箱子_移动_A
 * 插件指令：>事件一体化 : 事件[10] : 设置移动标签 : 大箱子_移动_A
 * 插件指令：>事件一体化 : 事件变量[21] : 设置移动标签 : 大箱子_移动_A
 * 
 * 插件指令：>事件一体化 : 本事件 : 设置移动标签 : 大箱子_移动_A
 * 插件指令：>事件一体化 : 本事件 : 设置朝向标签 : 大箱子_朝向_A
 * 插件指令：>事件一体化 : 本事件 : 设置触发标签 : 大箱子_触发_A
 * 插件指令：>事件一体化 : 本事件 : 去除移动标签
 * 插件指令：>事件一体化 : 本事件 : 去除朝向标签
 * 插件指令：>事件一体化 : 本事件 : 去除触发标签
 * 插件指令：>事件一体化 : 本事件 : 开启速度统一
 * 插件指令：>事件一体化 : 本事件 : 关闭速度统一
 *
 * 1.添加标签后，只在当前地图有效，离开地图后消失。
 * 2.玩家 表示玩家的领队，跟随队员由于没有碰撞体积，所以不需要一体化。
 * 3.插件指令的 前半部分(玩家)和后半部分(设置移动标签)的参数可以随意组合。
 *   一共有4*8种组合方式。
 * 4.由于玩家不是事件，没有触发功能，所以给玩家添加 触发标签 没有任何效果。
 * 5."速度统一"是对于事件而言的，如果开启了速度统一，那么必须要在它自己作
 *   为 动力源 时，才能使得其他整体速度一致变化。
 * 
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
 * 测试方法：   与鼠标触发插件一起使用，设置鼠标触发的十几个一体化事件，
 *              放置在不同的地图中检测消耗。
 * 测试结果：   200个事件的地图中，消耗为：【54.50ms】
 *              100个事件的地图中，消耗为：【30.08ms】
 *               50个事件的地图中，消耗为：【20.28ms】
 * 测试方法2：  直接在设计华容道地图中测试性能。
 * 测试结果2：  100个一体化事件，消耗为：【152.46ms】
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
 * 优化了内部结构，规范了插件指令，
 * 修复了玩家一体化的bug，并且添加了玩家初始标签设置。
 * [v1.2]
 * 修复了一体化斜向移动时的bug。
 * [v1.3]
 * 修复了一体化朝向初始状态时，事件方向不一致的bug。
 * [v1.4]
 * 修复了 移动一体化 造成跟随队员颤抖的bug。
 * [v1.5]
 * 修改了插件分类。
 * 
 * 
 * 
 * @param 玩家移动一体化标签
 * @type text
 * @desc 初始玩家进入游戏时，默认的具备的移动标签。
 * @default 玩家_移动一体化
 * 
 * @param 玩家朝向一体化标签
 * @type text
 * @desc 初始玩家进入游戏时，默认的具备的朝向标签。
 * @default 玩家_朝向一体化
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
//		插件简称		EU（Event_Unification）
//		临时全局变量	无
//		临时局部变量	this._drill_EU.xxx
//						$gameTemp.drill_EU_xxx函数
//		存储数据变量	$gameSystem._drill_EU_player
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.moveStraight	（半覆写）
//						Game_CharacterBase.prototype.moveDiagonally	（半覆写）
//						Game_CharacterBase.prototype.setDirection	（半覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	鼠标管理层多物体移动
//		★性能测试消耗	54.50ms ~ 30.08ms ~ 20.28ms
//		★最坏情况		大量一体化的物体到处移动并触发。
//		★备注			一体化事件的性能消耗，会与好几个插件交织在一起，不过目前没有出现累加后超级大的计算量。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件一体化：
//				->移动一体化
//					->速度统一
//				->朝向一体化
//				->触发一体化
//				->帧同步移动
//				->跳跃一体化 ?
//				->插件指令设置标签
//				->与鼠标触发的交互
//				->事件容器
//				->载入存档后重刷$gameTemp
//
//		★必要注意事项：
//			1.考虑到插件性能问题，这里统一绑定为同时 添加事件tag + 添加地图tag数组列表。
//			  （将实时生成的数组，变成固定添加/减少的数组容器，【时空权衡】）
//			2.执行move命令的时候，事件的update是依次执行的。被牵动的事件会因为当前帧update了，不执行移动操作。
//			  要实现整体移动，当前帧需要等一帧，确保下一帧所有事件都统一开始移动。
//			3.【$gameTemp与$gameMap】同步校验，确保载入存档，地图重新进入后，能刷一次事件注释的记录。
//			4.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//
//		★其它说明细节：
//			1.移动一体化：
//				拦截含有移动标签的事件，统一移动。需要确保只有一个动力源。
//			  朝向一体化
//				拦截含有朝向标签的事件，统一朝向。
//			  触发一体化
//				独立开关开启时，统一开启/关闭所有相同标签的开关。（这里需要其他插件进行适应）
//			2.关于容器增量：
//				如果使用增加/去除 这种增量性质的容器，会造成 $gamePlayer与事件放在同一个容器时，【二者难以区分直接紊乱】。
//				所以每次变化还不如直接重刷容器。
//			3.考虑到标签的问题，这里强制每个事件只能设置一个标签，原先的多标签被弃用：
//					//this._drill_EU['trigger'] = {};
//					//this._drill_EU['trigger'].enabled = false;
//					//this._drill_EU['trigger'].tags = {};
//				原因是：当标签绑定在玩家身上时，发现两个标签使得玩家一次移动变成了两次。（如果继续深入下去，程序会极其复杂）
//				
//		★存在的问题：
//			1.该插件没有通过events获取sprites的方法。也无法展开这个方面。（目前使用缓冲池解决）
//			  在鼠标触发事件的引用中，存在性能消耗过大的麻烦。
//			2.玩家与事件一体化移动 仍然存在一些细节问题，这里没有继续深入。（已解决，是isMoving中断造成的bug）
//			
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventUnification = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventUnification');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EU_move = String(DrillUp.parameters['玩家移动一体化标签'] || "");
    DrillUp.g_EU_rotate = String(DrillUp.parameters['玩家朝向一体化标签'] || "");
    DrillUp.g_EU_speed = String(DrillUp.parameters['玩家速度是否统一'] || "true") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventThrough ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EU_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args ){
	_drill_EU_pluginCommand.call(this, command, args);
	if( command === ">事件一体化" ){	//>事件一体化 : 本事件 : 添加移动标签 : 大箱子A
		
		/*-----------------事件------------------*/
		var e = null;
		if(args.length >= 2){
			var unit = String(args[1]);
			if( unit == "本事件" ){
				var e_id = this._eventId;
				e = $gameMap.event( e_id );
			}
			if( unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EU_isEventExist( e_id ) == false ){ return; }
				e = $gameMap.event( e_id );
			}
			if( unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EU_isEventExist( e_id ) == false ){ return; }
				e = $gameMap.event( e_id );
			}
		}
			
		if(args.length == 6){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( e && type == "设置移动标签" ){
				e._drill_EU['move'] = temp1;
				e._drill_ETh_char[ "_drill_EU_"+temp1 ] = true;		//穿透标签
				$gameTemp._drill_EU_needRestatistics = true;
			}
			if( e && type == "设置朝向标签" ){
				e._drill_EU['rotate'] = temp1;
				e._drill_EU['rotateNeedInit'] = true;
				$gameTemp._drill_EU_needRestatistics = true;
			}
			if( e && type == "设置触发标签" ){
				e._drill_EU['trigger'] = temp1;
				$gameTemp._drill_EU_needRestatistics = true;
			}
		}
		if(args.length == 4){
			var type = String(args[3]);
			if( e && type == "去除移动标签" ){
				e._drill_ETh_char[ "_drill_EU_" + e._drill_EU['move'] ] = false;	//穿透标签
				e._drill_EU['move'] = "" ;
				$gameTemp._drill_EU_needRestatistics = true;
			}
			if( e && type == "去除朝向标签" ){
				e._drill_EU['rotate'] = "" ;
				$gameTemp._drill_EU_needRestatistics = true;
			}
			if( e && type == "去除触发标签" ){
				e._drill_EU['trigger'] = "" ;
				$gameTemp._drill_EU_needRestatistics = true;
			}
			if( e && type == "开启速度统一" ){
				e._drill_EU['speed'] = true ;
			}
			if( e && type == "关闭速度统一" ){
				e._drill_EU['speed'] = false ;
			}
		}
		
		/*-----------------玩家------------------*/
		if(args.length == 6){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( unit == "领队" || unit == "玩家" ){
				if( type == "设置移动标签" ){
					$gamePlayer._drill_EU['move'] = temp1;
					$gamePlayer._drill_ETh_char[ "_drill_EU_"+temp1 ] = true;		//穿透标签
					$gameTemp._drill_EU_needRestatistics = true;
				}
				if( type == "设置朝向标签" ){
					$gamePlayer._drill_EU['rotate'] = temp1;
					$gamePlayer._drill_EU['rotateNeedInit'] = true;
					$gameTemp._drill_EU_needRestatistics = true;
				}
			}
		}
		if(args.length == 4){
			var unit = String(args[1]);
			var type = String(args[3]);
			
			if( unit == "领队" || unit == "玩家" ){
				if( type == "去除移动标签" ){
					$gamePlayer._drill_ETh_char[ "_drill_EU_" + $gamePlayer._drill_EU['move'] ] = false;	//穿透标签
					$gamePlayer._drill_EU['move'] = "" ;
					$gameTemp._drill_EU_needRestatistics = true;
				}
				if( type == "去除朝向标签" ){
					$gamePlayer._drill_EU['rotate'] = "" ;
					$gameTemp._drill_EU_needRestatistics = true;
				}
				if( type == "开启速度统一" ){
					$gamePlayer._drill_EU['speed'] = true ;
				}
				if( type == "关闭速度统一" ){
					$gamePlayer._drill_EU['speed'] = false ;
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EU_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventUnification.js 体积 - 事件一体化】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储数据初始化
//=============================================================================
//==============================
// * 玩家数据
//==============================
var _drill_EU_p_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function(){
	_drill_EU_p_initMembers.call(this);
	this._drill_EU['move'] = DrillUp.g_EU_move;				//移动标签
	this._drill_EU['rotate'] = DrillUp.g_EU_rotate;			//朝向标签
	this._drill_EU['speed'] = DrillUp.g_EU_speed;			//触发标签
	this._drill_EU['rotateNeedInit'] = false;				//朝向初始化标记
	if( this.drill_EU_hasMoveTag() ){
		this._drill_ETh_char[ "_drill_EU_"+this._drill_EU['move'] ] = true;		//穿透标签
	}
}

//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_EU_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function(){
	_drill_EU_initMembers.call(this);
	this._drill_EU = {};
	this._drill_EU['move'] = "";				//移动标签
	this._drill_EU['rotate'] = "";				//朝向标签
	this._drill_EU['trigger'] = "";				//触发标签
	this._drill_EU['speed'] = false;			//速度统一标记
	this._drill_EU['rotateNeedInit'] = false;	//朝向初始化标记
	this._drill_EU_orgSpeed = null;
	this._drill_EU_unifyingMovingTarget = null;
}
//==============================
// * 物体 - 是否含有标签 - 移动
//==============================
Game_CharacterBase.prototype.drill_EU_hasMoveTag = function(){
	return this._drill_EU['move'] !== "";
}
//==============================
// * 物体 - 是否含有标签 - 朝向
//==============================
Game_CharacterBase.prototype.drill_EU_hasRotateTag = function(){
	return this._drill_EU['rotate'] !== "";
}
//==============================
// * 物体 - 是否含有标签 - 触发
//==============================
Game_CharacterBase.prototype.drill_EU_hasTriggerTag = function(){
	return this._drill_EU['trigger'] !== "";
}

//=============================================================================
// ** 容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_EU_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EU_temp_initialize.call(this);
	this._drill_EU_map_move = {};
	this._drill_EU_map_rotate = {};
	this._drill_EU_map_trigger = {};
	this._drill_EU_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EU_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId ){
	$gameTemp._drill_EU_map_move = {};
	$gameTemp._drill_EU_map_rotate = {};
	$gameTemp._drill_EU_map_trigger = {};
	$gameTemp._drill_EU_needRestatistics = true;
	_drill_EU_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EU_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	//（暂时无操作）
	_drill_EU_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EU_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive){
	_drill_EU_map_update.call(this,sceneActive);
	this.drill_EU_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EU_updateRestatistics = function(){
	if( !$gameTemp._drill_EU_needRestatistics ){ return }
	$gameTemp._drill_EU_needRestatistics = false;
	
	var events = this.events();
	events.push( $gamePlayer );
	$gameTemp._drill_EU_map_move = {};
	$gameTemp._drill_EU_map_rotate = {};
	$gameTemp._drill_EU_map_trigger = {};
	for (var i = 0; i < events.length; i++ ){  
		var temp_event = events[i];
		
		// > 移动标签 - 统计
		if( temp_event.drill_EU_hasMoveTag() ){
			if( !$gameTemp._drill_EU_map_move[ temp_event._drill_EU['move'] ] ){
				$gameTemp._drill_EU_map_move[ temp_event._drill_EU['move'] ] = [];
			}
			$gameTemp._drill_EU_map_move[ temp_event._drill_EU['move'] ].push(temp_event);
		}
		
		// > 朝向标签 - 统计
		if( temp_event.drill_EU_hasRotateTag() ){
			if( !$gameTemp._drill_EU_map_rotate[ temp_event._drill_EU['rotate'] ] ){
				$gameTemp._drill_EU_map_rotate[ temp_event._drill_EU['rotate'] ] = [];
			}
			$gameTemp._drill_EU_map_rotate[ temp_event._drill_EU['rotate'] ].push(temp_event);
		
			// > 朝向初始化
			if( temp_event._drill_EU['rotateNeedInit'] == true ){
				temp_event._drill_EU['rotateNeedInit'] = false;
				temp_event.setDirection( temp_event.direction() );
			}
		}
		
		// > 触发标签 - 统计
		if( temp_event.drill_EU_hasTriggerTag() ){
			if( !$gameTemp._drill_EU_map_trigger[ temp_event._drill_EU['trigger'] ] ){
				$gameTemp._drill_EU_map_trigger[ temp_event._drill_EU['trigger'] ] = [];
			}
			$gameTemp._drill_EU_map_trigger[ temp_event._drill_EU['trigger'] ].push(temp_event);
		}
	}
}
//==============================
// * 容器 - 根据标签获取 - 移动
//==============================
Game_Temp.prototype.drill_EU_getEventsByMoveTag = function(e_tag ){
	if( !this._drill_EU_map_move[e_tag] ){ return []; }
	return this._drill_EU_map_move[e_tag];
};
//==============================
// * 容器 - 根据标签获取 - 朝向
//==============================
Game_Temp.prototype.drill_EU_getEventsByRotateTag = function(e_tag ){
	if( !this._drill_EU_map_rotate[e_tag] ){ return []; }
	return this._drill_EU_map_rotate[e_tag];
};
//==============================
// * 容器 - 根据标签获取 - 触发
//==============================
Game_Temp.prototype.drill_EU_getEventsByTriggerTag = function(e_tag ){
	if( !this._drill_EU_map_trigger[e_tag] ){ return []; }
	return this._drill_EU_map_trigger[e_tag];
};


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 注释设置
//==============================
var _drill_EU_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function(){
	_drill_EU_setupPage.call(this);
    this.drill_EU_setupTags();
};
Game_Event.prototype.drill_EU_setupTags = function(){
	if( !this._erased && this.page() ){this.list().forEach(function(l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>事件一体化"){	//=>事件一体化 : 移动标签 : 大箱子A
				if(args.length == 4){
					var type = String(args[1]); 
					var temp1 = String(args[3]); 
					if( type == "移动标签" ){
						this._drill_EU['move'] = temp1;
						this._drill_ETh_char[ "_drill_EU_"+temp1 ] = true;		//穿透标签
						$gameTemp._drill_EU_needRestatistics = true;
					}
					if( type == "朝向标签" ){
						this._drill_EU['rotate'] = temp1;
						this._drill_EU['rotateNeedInit'] = true;			
						$gameTemp._drill_EU_needRestatistics = true;
					}
					if( type == "触发标签" ){
						this._drill_EU['trigger'] = temp1;
						$gameTemp._drill_EU_needRestatistics = true;
					}
				}
				if(args.length == 2){
					var type = String(args[1]); 
					if( type == "开启速度统一" ){
						this._drill_EU['speed'] = true;
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// ** 移动一体化
//=============================================================================
//==============================
// * 物体 - 帧同步移动
//==============================
var _drill_EU_m_updateEvents = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function(){
	if( this._drill_EU_movingWaitOneF === true ){
		this._drill_EU_movingWaitOneF = false;
	}
    _drill_EU_m_updateEvents.call(this);
};
//==============================
// * 物体 - 帧同步移动
//==============================
/*
	var _drill_EU_isMoving = Game_CharacterBase.prototype.isMoving;	//该方法会造成move判定中断
	Game_CharacterBase.prototype.isMoving = function(){
		if( $gameMap._drill_EU_movingWaitOneF === true && this.drill_EU_hasMoveTag() ){
			return false;
		}
		return _drill_EU_isMoving.call(this);
	};
*/
var _drill_EU_m_updateMove = Game_CharacterBase.prototype.updateMove;	
Game_CharacterBase.prototype.updateMove = function(){
	if( this instanceof Game_Event &&		//（仅限事件跟随玩家 移动一体化）
		this.drill_EU_hasMoveTag() ){
		if( $gameMap._drill_EU_movingWaitOneF === true ){		//还是直接暂停一帧移动位置好了
			return;
		}
		if( this._drill_EU_unifyingMovingTarget != null ){		//速度改变
			var u_c = this._drill_EU_unifyingMovingTarget;
			if( u_c._drill_EU['speed'] && u_c != this ){
				this._moveSpeed = u_c._moveSpeed;
				if( Imported.Drill_MoveSpeed ){		//【物体-移动速度】
					this._drill_MS_ASpeed = u_c.drill_MS_getRealASpeed();
				}
			}
		}
	}
    _drill_EU_m_updateMove.call(this);
}

//==============================
// * 物体 - 速度恢复
//==============================
var _drill_EU_updateStop = Game_CharacterBase.prototype.updateStop;
Game_CharacterBase.prototype.updateStop = function(){
	_drill_EU_updateStop.call(this);
	if( this._drill_EU_unifyingMovingTarget != null ){
		this._moveSpeed = this._drill_EU_orgSpeed['moveSpeed'];
		this._drill_MS_ASpeed = this._drill_EU_orgSpeed['accurateSpeed'];
		this._drill_EU_orgSpeed = null;
		this._drill_EU_unifyingMovingTarget = null;
	}
}

//==============================
// * 物体 - 直线移动
//==============================
var _drill_EU_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function(d ){
	if( this.drill_EU_hasMoveTag() ){
		$gameMap.drill_EU_moveStraightByMoveTag( d, this._drill_EU['move'] , this );		//移动时，所有相同标签的事件同时移动
		this.setDirection(d);
	}else{
		_drill_EU_moveStraight.call(this,d);
	}
};
//==============================
// * 地图 - 直线整体移动
//==============================
Game_Map.prototype.drill_EU_moveStraightByMoveTag = function( d, e_tag , unifyingTarget  ){
	var ev_list = $gameTemp.drill_EU_getEventsByMoveTag(e_tag);
	var can_pass = true;
	for(var j = 0; j < ev_list.length; j++){	//判断整体是否可移动
		var e = ev_list[j];
		if( !e.canPass(e._x, e._y, d) ){
			can_pass = false;
		}
	}
	for(var j = 0; j < ev_list.length; j++){	//整体执行移动
		var e = ev_list[j];
		e.setMovementSuccess(can_pass);
		
		// > 速度存储
		if( e._drill_EU_orgSpeed == null ){
			e._drill_EU_orgSpeed = {
				"moveSpeed": e._moveSpeed,
				"accurateSpeed": e._drill_MS_ASpeed
			};
		}
		e._drill_EU_unifyingMovingTarget = unifyingTarget;
		
		// > 移动
		if( can_pass ){
			//e._x = $gameMap.roundXWithDirection(e._x, d);		//取消自动锁定位置，因为进入循环地图，角色会到处飞
			//e._y = $gameMap.roundYWithDirection(e._y, d);
			//e._realX = $gameMap.xWithDirection(e._x, e.reverseDir(d));	//取消位置修正，被拖动的物体会根据当前位置滑行
			//e._realY = $gameMap.yWithDirection(e._y, e.reverseDir(d));
			if( this.isLoopHorizontal() ){			
				e._x = $gameMap.xWithDirection(e._x, d);
				if( e._x >= this.width() ){		//这里的功能是把round函数的条件拆解出来单独处理
					e._x -= this.width();
					e._realX -= this.width();
				}
				if( e._x < 0 ){
					e._x += this.width();
					e._realX += this.width();
				}
			}else{
				e._x = $gameMap.roundXWithDirection(e._x, d);
			}
			if( this.isLoopVertical() ){
				e._y = $gameMap.yWithDirection(e._y, d);
				if( e._y >= this.height() ){
					e._y -= this.height();
					e._realY -= this.height();
				}
				if( e._y < 0 ){
					e._y += this.height();
					e._realY += this.height();
				}
			}else{
				e._y = $gameMap.roundYWithDirection(e._y, d);
			}
			this._drill_EU_movingWaitOneF = true;		//当前帧等待
			e.increaseSteps();
		}else{
			e.checkEventTriggerTouchFront(d);
		}
		
	}
};

//==============================
// * 物体 - 斜向移动
//==============================
var _drill_EU_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function(horz, vert ){
	if( this.drill_EU_hasMoveTag() ){
		$gameMap.drill_EU_moveDiagonallyByMoveTag(horz,vert,this._drill_EU['move']);		//移动时，所有相同标签的事件同时移动
		if( this._direction === this.reverseDir(horz) ){
			this.setDirection(horz);
		}
		if( this._direction === this.reverseDir(vert) ){
			this.setDirection(vert);
		}
	}else{
		_drill_EU_moveDiagonally.call(this,horz, vert);
	}
};
//==============================
// * 地图 - 斜向整体移动
//==============================
Game_Map.prototype.drill_EU_moveDiagonallyByMoveTag = function( horz, vert, e_tag  ){
	var ev_list = $gameTemp.drill_EU_getEventsByMoveTag(e_tag);
	var can_pass = true;
	for(var j = 0; j < ev_list.length; j++){	//判断整体是否可移动
		var e = ev_list[j];
		if( !e.canPassDiagonally(e._x, e._y, horz, vert) ){
			can_pass = false;
		}
	}
	for(var j = 0; j < ev_list.length; j++){	//整体执行移动
		var e = ev_list[j];
		e.setMovementSuccess(can_pass);
		if( can_pass ){
			//e._x = $gameMap.roundXWithDirection(e._x, horz);
			//e._y = $gameMap.roundYWithDirection(e._y, vert);
			//e._realX = $gameMap.xWithDirection(e._x, e.reverseDir(horz));
			//e._realY = $gameMap.yWithDirection(e._y, e.reverseDir(vert));
			if( this.isLoopHorizontal() ){
				e._x = $gameMap.xWithDirection(e._x, horz);
				if( e._x >= this.width() ){
					e._x -= this.width();
					e._realX -= this.width();
				}
				if( e._x < 0 ){
					e._x += this.width();
					e._realX += this.width();
				}
			}else{
				e._x = $gameMap.roundXWithDirection(e._x, horz);
			}
			if( this.isLoopVertical() ){
				e._y = $gameMap.yWithDirection(e._y, vert);
				if( e._y >= this.height() ){
					e._y -= this.height();
					e._realY -= this.height();
				}
				if( e._y < 0 ){
					e._y += this.height();
					e._realY += this.height();
				}
			}else{
				e._y = $gameMap.roundYWithDirection(e._y, vert);
			}
			$gameMap._drill_EU_movingWaitOneF = true;		//当前帧等待
			e.increaseSteps();
		}
	}
};


//=============================================================================
// ** 朝向一体化
//=============================================================================
//==============================
// * 物体 - 设置朝向
//==============================
var _drill_EU_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function(d ){
	if( this.drill_EU_hasRotateTag() ){
		$gameMap.drill_EU_setDirectionByRotateTag( d, this._drill_EU['rotate'] );
	}else{
		_drill_EU_setDirection.call(this,d);
	}
}
//==============================
// * 地图 - 整体朝向
//==============================
Game_Map.prototype.drill_EU_setDirectionByRotateTag = function( d, e_tag  ){
	var ev_list = $gameTemp.drill_EU_getEventsByRotateTag(e_tag);
	for(var j = 0; j < ev_list.length; j++){	//判断整体是否可移动
		var e = ev_list[j];
	    if( !e.isDirectionFixed() && d ){
			e._direction = d;
		}
		e.resetStopCount();
	}
}


//=============================================================================
// ** 触发一体化
//=============================================================================
//==============================
// * 独立开关触发设置
//==============================
var _drill_EU_setValue = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function( key, value ){
	
	if( $gameMap._mapId === key[0] ){
		var e = $gameMap.event(key[1]);
		if( e && e.drill_EU_hasTriggerTag() ){
			var ev_list = $gameTemp.drill_EU_getEventsByTriggerTag( e._drill_EU['trigger'] );		//触发时，所有相同标签的事件同时触发
			for(var i=0; i < ev_list.length; i++){
				var e_key = [ key[0], ev_list[i]._eventId, key[2] ];
				if( value ){ 
					this._data[e_key] = true;
				} else {
					delete this._data[e_key];
				}
			}
		}
	}
	_drill_EU_setValue.call(this, key, value);
	
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventUnification = false;
		alert(
			"【Drill_EventUnification.js 体积 - 事件一体化】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventThrough 体积-事件穿透关系"
		);
}

