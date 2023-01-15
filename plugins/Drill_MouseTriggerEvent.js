//=============================================================================
// Drill_MouseTriggerEvent.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        鼠标 - 鼠标触发事件
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseTriggerEvent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得鼠标靠近事件、点击事件时，触发事件的独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。并且可以与其他插件扩展。
 * 基于：
 *   - Drill_CoreOfInput       系统-输入设备核心
 *     通过该核心才能进行鼠标控制操作。
 * 可作用于：
 *   - Drill_EventUnification  体积-事件一体化★★v1.1以上★★
 *     使得一体化的事件，能够整体触发悬停等功能。
 *   - Drill_LayerCamera       地图-活动地图镜头★★v1.9以上★★
 *     目标插件控制镜头放大缩小时，鼠标也能正常触发事件。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件，触发事件的独立开关。
 *   单独对鼠标有效。
 * 传感器：
 *   (1.该插件被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      鼠标悬停、点击事件时，触发事件的独立开关。
 *   (2.该插件的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.ON触发的范围为事件行走图大小。注意不要在空的行走图中加触发设置。
 *      触发范围具体介绍可以去看看 "7.行走图 > 关于行走图与图块.docx"。
 *   (2.如果你设置了"悬停"+"不在悬停区域时"，一定要确保事件页AB两边都配
 *      置了行走图，不然会不停地 行走图 -> 空行走图 来回切换。
 * 可选设置：
 *   (1.默认右键会进入菜单，你如果需要使用右键，可以在插件"互动-鼠
 *      标辅助操作面板" 里面禁用右键菜单。
 *   (2.你可以设置对话框弹出时，鼠标仍然可触发事件。但是，事件指令仍然
 *      会被阻塞，只有对话框结束后才会执行事件的指令。
 * 设计：
 *   (1.左键按下 + 接近鼠标的移动路线 + 任何位置左键释放 = 拖拽事件效果。
 *      具体可以去华容道设计关卡看看。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - ON条件
 * 设置鼠标能触发指定的事件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>鼠标触发 : 悬停 : 触发独立开关 : A
 *
 * 事件注释：=>鼠标触发 : 左键按下[持续] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 左键按下[一帧] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 左键释放[一帧] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 左键双击[一帧] : 触发独立开关 : A
 * 
 * 事件注释：=>鼠标触发 : 右键按下[持续] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 右键按下[一帧] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 右键释放[一帧] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 右键双击[一帧] : 触发独立开关 : A
 * 
 * 事件注释：=>鼠标触发 : 滚轮按下[持续] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 滚轮按下[一帧] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 滚轮释放[一帧] : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 滚轮双击[一帧] : 触发独立开关 : A
 *
 * 事件注释：=>鼠标触发 : 滚轮上滚 : 触发独立开关 : A
 * 事件注释：=>鼠标触发 : 滚轮下滚 : 触发独立开关 : A
 *
 * 1.上述所有触发，都是以 鼠标进入行走图区域 为前提执行的。
 * 2.注意，"持续"和"一帧"的区别，就是你按住小爱丽丝，前者会不停地跳，
 *   后者只跳一次。
 * 3."持续"实际上是在时间段内，一直保持独立开关为开启状态。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - OFF条件
 * 你可以设置特殊的开关OFF条件，使用下面事件注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>鼠标触发 : 不在悬停区域时 : 关闭独立开关 : A
 * 事件注释：=>鼠标触发 : 任何位置左键释放[一帧] : 关闭独立开关 : A
 * 事件注释：=>鼠标触发 : 任何位置右键释放[一帧] : 关闭独立开关 : A
 * 事件注释：=>鼠标触发 : 任何位置滚轮释放[一帧] : 关闭独立开关 : A
 * 
 * 1.在鼠标左键按下后，开关A一直为ON，这时需要OFF的特殊条件。
 *   这些条件固定关闭独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制类型情况：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>鼠标触发 : 添加 : 本事件 : 左键按下[持续] : 触发独立开关 : A
 * 插件指令：>鼠标触发 : 添加 : 1 : 左键按下[持续] : 触发独立开关 : A
 * 
 * 插件指令：>鼠标触发 : 去除 : 本事件 : 左键按下[持续]
 * 插件指令：>鼠标触发 : 去除 : 1 : 左键按下[持续]
 *
 * 插件指令：>鼠标触发 : 去除 : 1 : 全部
 *
 * 注意，插件指令添加的触发事件都是暂时的，刷新地图后失效。
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
 * 测试方法：   地图界面中，放置20个鼠标触发事件，进行鼠标触发等操作。
 * 测试结果：   200个事件的地图中，消耗为：【31.08ms】
 *              100个事件的地图中，消耗为：【26.23ms】
 *               50个事件的地图中，消耗为：【34.19ms】
 * 测试方法2：  直接在设计华容道地图中测试性能。
 * 测试结果2：  150个含鼠标触发的事件，消耗为：【168.53ms】
 * 测试方法3：  直接在设计逻辑地图中测试性能。
 * 测试结果3：  164个含鼠标触发的事件，消耗为：【193.79ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.v1.0版本的消耗量非常大，50个事件的消耗就有：【108.54ms】。
 *   建议立即把旧版本升级。
 * 3.插件反复优化了多次，能稍微经得起超多事件的消耗。
 *   （经不起消耗的插件一般会直接爆炸升到 1500ms 以上。）
 * 4.插件的性能只与含有标签触发的事件数量成正比。
 *   一张地图含鼠标触发的事件太多，对电脑性能是一种挑战。
 * 5.150个鼠标触发事件，玩还是可以玩的，我的低配电脑持续在20帧左右。
 *   不过，还是建议做成一个地图一个鼠标关卡。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 大幅度优化了插件性能，并添加了性能测试说明。
 * [v1.2]
 * 修改了对事件一体化的支持。
 * [v1.3]
 * 添加了镜头缩放时，鼠标触发的支持。
 * 修复了保存后再读取，鼠标触发失效的bug。
 * [v1.4]
 * 修复了切换事件页 + 离开地图 + 再回来，开关失效的bug。
 * 修改了注释说明。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 *
 * @param 对话框弹出时是否仍然可触发
 * @type boolean
 * @on 可触发
 * @off 关闭触发
 * @desc 对话框弹出时，一般会关闭事件的触发状态。你可以设置仍然可触发。
 * @default true
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MTE (Mouse_Trigger_Event)
//		临时全局变量	DrillUp.g_MTE_xxx
//		临时局部变量	this._drill_MTE_xxx
//						$gameTemp.drill_MTE_xxx函数
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) *o(n) 		每帧【双重for】
//						(o(n) + o(n)) *o(n) 每帧【实时添加】
//		★性能测试因素	鼠标乱晃
//		★性能测试消耗	63.94ms-139.72ms 波动	【双重for】
//						34.19ms					【实时添加】
//						54.50ms					【一体化加入+优化后】
//		★最坏情况		当前视角，存在大批触发的事件，并且玩家的鼠标乱晃。
//		★备注			由于直接降了一维，所以基本不担心性能。
//						然而，即使降了一维，150个事件仍然能造成不小的消耗。
//		
//		★优化记录
//			第一次优化：
//				使用距离排序，由于该插件变量时间复杂度本来就不高o(n^2)，结果直接跳到378.00ms左右。失败。
//			第二次优化：
//				使用触发刷新时，生成数组。计算量没有太大变化，138ms被分成了121ms和21ms。失败。
//			第三次优化：
//				就是现在采用的方法，根据记录的data数量，关联sprite，而不是每次都遍历sprite，实现降维。
//			    （将实时生成的数组，变成固定添加/减少的数组容器，【时空权衡】）
//			第四次优化：
//				鼠标触发关系当时仍然是含糊不清的情况。为了完美划分减少冗余计算量，这里重组了type的设置关系。
//				先后判定关系分为： ON类型/OFF类型 > 鼠标操作类型 > 鼠标范围 > 是否为一体化事件 > 触发开关
//			第五次优化：
//				针对根据事件获取贴图，这里用【缓冲池】方法，防止多次重复筛选取贴图。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			鼠标触发事件：
//				->接近触发
//				->按下触发
//				->先后触发顺序
//				->优化，尽可能减少计算量
//				->事件一体化触发情况
//				->事件容器
//				->优化，event变动时，缓冲池同步刷新
//		
//		★必要注意事项：
//			1.插件触发与行走图完全相关，行走图不变，触发也会更新。
//			2.注意，【数据和贴图不是同步的】
//				数据在切换地图时会刷新，而贴图，只要切菜单就会刷新。所以需要考虑贴图刷新的时机。
//			3.【needRestatistics说明】，该插件 数据 在$gameSystem中，与 贴图 在$gameTemp中。
//			4.【serial说明】这里的插件，数据和贴图 不同步，所以实际操作起来非常复杂，以前优化过很多次。
//			  不确定是否需要使用 序列号 来进行排布，这里只暂时标记一下。
//
//		★其它说明细节：
//			1.根据事件的贴图，进行条件插入。
//			  实时判断条件，来确定独立开关是否被激活。
//			2.帧刷新时，从最高层的Scene_Map开始，遍历每个sprite，来找条件，每个sprite都是鼠标监听条件。
//			  Scene_Map.prototype.update 有疑问，不确定每次地图刷新，update会进行几次。这里用updateScene。
//
//		★存在的问题：
//			1.当鼠标靠近时，开启了独立开关，然后保存，读档，所有跨事件页的事件会保持停滞的锁死状态。
//			  正常情况都会停留回原来有注释页的那一面。正常状态下保存，则没有任何问题。
//			  该插件的解决办法是：pushdata到$gameSystem中，sprite临时贴图放$gameTemp中。数据存储，贴图随着数据刷新。
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseTriggerEvent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseTriggerEvent');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_MTE_remainTrigger = String(DrillUp.parameters['对话框弹出时是否仍然可触发'] || "true") === "true";


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MTE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){ 
	_drill_MTE_pluginCommand.call(this, command, args);
	if( command === ">鼠标触发" ){
		
		if( args.length == 10 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var type = String(args[5]);
			var temp3 = String(args[7]);
			var temp4 = String(args[9]);
			if(temp1 == "添加"){
				var obj = {};
				if(temp2 == "本事件"){
					obj._event_id = this._eventId;
				}else{
					obj._event_id = Number(temp2);
				}
				obj._type = type;
				obj._switch = temp4;
				$gameSystem.drill_MTE_pushData(obj);
			}
		}
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var type = String(args[5]);
			if( temp1 == "去除" ){
				var obj = {};
				if( temp2 == "本事件" ){
					obj._event_id = this._eventId;
				}else{
					obj._event_id = Number(temp2);
				}
				obj._type = type;
				$gameSystem.drill_MTE_removeData(obj);
			}
		}
	};
};
//=============================================================================
// ** 事件初始化
//=============================================================================
//==============================
// * 贴图初始化
//==============================
var _drill_MTE_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function(){ 
	_drill_MTE_initMembers.call(this);
	this._drill_MTE_isFirstBirth = true;
};
var _drill_MTE_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character){ 		//图像改变，范围就改变
	_drill_MTE_setCharacter.call(this,character);
    this.drill_MTE_setupTrigger();
};
Sprite_Character.prototype.drill_MTE_setupTrigger = function(){ 
	if( this._character && this._character instanceof Game_Event ){
		var ch = this._character;
		
		// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
		if( !ch._erased && ch.event() && ch.event().pages[0] && ch._drill_MTE_isFirstBirth ){ 
			ch._drill_MTE_isFirstBirth = false;
			ch.drill_MTE_readPage( ch.event().pages[0].list );
		}
		
		// > 读取当前页注释
		if( !ch._erased && ch.page() ){ 
			ch.drill_MTE_readPage( ch.list() );
		}
		
	}
};
//==============================
// * 读取注释
//==============================
Game_Event.prototype.drill_MTE_readPage = function( page_list ){
	page_list.forEach( function(l){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>鼠标触发" ){	//=>鼠标触发 : 悬停 : 触发独立开关 : A
				if( args.length >= 6 ){
					if(args[1]){ var type  = String(args[1]); }
					if(args[3]){ var temp1 = String(args[3]); }
					if(args[5]){ var temp2 = String(args[5]); }
					if( temp1 == "触发独立开关" ){
						var obj = {};
						obj._event_id = this._eventId;	//只能存数据，不能存对象指针
						obj._type = type;
						obj._switch = temp2;
						$gameSystem.drill_MTE_pushData(obj);
					}
					if( temp1 == "关闭独立开关" ){
						var obj = {};
						obj._event_id = this._eventId;
						obj._type = type;
						obj._switch = temp2;
						$gameSystem.drill_MTE_pushData(obj);
					}
				}
			};
		};
	}, this);
}

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_MTE_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// ** 容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_MTE_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){ 	
	_drill_MTE_temp_initialize.call(this);
	this._drill_MTE_sprites = [];				//缓冲池 - 鼠标贴图
	this._drill_MTE_EU_cacheSprites = {};		//缓冲池 - 一体化贴图集合
	this._drill_MTE_EU_cacheListener = {};		//缓冲池 - 一体化事件监听
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_MTE_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameSystem._drill_MTE_data = [];				//缓冲池 - 鼠标数据
	$gameTemp._drill_MTE_sprites = [];				//缓冲池 - 鼠标贴图
	$gameTemp._drill_MTE_EU_cacheSprites = {};		//缓冲池 - 一体化贴图集合
	$gameTemp._drill_MTE_EU_cacheListener = {};		//缓冲池 - 一体化事件监听
													//（注意，要在事件注释的前面）
	_drill_MTE_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_MTE_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){ 
	for( var i = 0; i < $gameSystem._drill_MTE_data.length; i++ ){
		$gameTemp._drill_MTE_sprites[i] = null;
	}
	$gameTemp._drill_MTE_EU_cacheSprites = {};
	$gameTemp._drill_MTE_EU_cacheListener = {};	
	_drill_MTE_smap_createCharacters.call(this);
}


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_MTE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MTE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MTE_sys_initialize.call(this);
	this.drill_MTE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MTE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MTE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MTE_saveEnabled == true ){	
		$gameSystem.drill_MTE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MTE_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_MTE_initSysData = function() {
	this.drill_MTE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MTE_checkSysData = function() {
	this.drill_MTE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MTE_initSysData_Private = function() {
	
	this._drill_MTE_data = [];						//缓冲池 - 鼠标数据
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MTE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MTE_data == undefined ){
		this.drill_MTE_initSysData();
	}
	
};
//==============================
// * 存储数据 - 添加
//==============================
Game_System.prototype.drill_MTE_pushData = function(data){ 	
	for(var i=0; i< this._drill_MTE_data.length; i++){	//重复的不插入
		var temp_data = this._drill_MTE_data[i];
		if( temp_data._event_id == data._event_id &&
			temp_data._type == data._type &&
			temp_data._switch == data._switch ){
			return;
		}
	}
	
	this._drill_MTE_data.push(data);
};
//==============================
// * 存储数据 - 去除
//==============================
Game_System.prototype.drill_MTE_removeData = function(data){ 	

	for(var i=this._drill_MTE_data.length-1; i>=0; i--){
		var temp_data = this._drill_MTE_data[i];
		if( temp_data._event_id == data._event_id){
			if(data._type == "全部"){
				this._drill_MTE_data.splice(i,1);
				$gameTemp._drill_MTE_sprites.splice(i,1);
			}else if( temp_data._type == data._type ){
				this._drill_MTE_data.splice(i,1);
				$gameTemp._drill_MTE_sprites.splice(i,1);
			}
		}
	}
};


//=============================================================================
// ** 地图界面（Scene_Map）
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_MTE_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){ 	
	_drill_MTE_smap_update.call(this);
	if( this.isActive() ){
		this.drill_MTE_refreshArray();
		this.drill_MTE_updateTrigger();
	}
}

//==============================
// * 帧刷新 - 容器触发集合
//==============================
Scene_Map.prototype.drill_MTE_refreshArray = function(){ 
	//	$gameSystem._drill_MTE_data：动态变化的触发条件
	//	this._spriteset._characterSprites：只增不减的数组（这个数组其实一开始就不应该在每帧里面遍历）
	
	for( var i = 0; i < $gameSystem._drill_MTE_data.length; i++ ){
		var temp_data = $gameSystem._drill_MTE_data[i];		//鼠标数据（存储）
		var temp_obj = $gameTemp._drill_MTE_sprites[i];		//鼠标贴图（临时）
		if( !temp_obj ){
			
			var char_sprites = this._spriteset._characterSprites;	//从地图贴图找起 >> 找到含event的Sprite_Character >> 存入触发集合
			for(var j=0; j< char_sprites.length; j++){
				var temp_sprite = char_sprites[j];
				if( $gameTemp.drill_MTE_isReflectionSprite(temp_sprite) ){ continue; }	//（跳过镜像情况）
				var temp_character = temp_sprite._character;
				if( temp_character && temp_character instanceof Game_Event && temp_character._eventId == temp_data._event_id ){
					$gameTemp._drill_MTE_sprites[i] = temp_sprite;
				}
			}
		}
	}
	
}

//==============================
// * 帧刷新 - 鼠标触发
//==============================
Scene_Map.prototype.drill_MTE_updateTrigger = function(){ 	
	if( DrillUp.g_MTE_remainTrigger == false && ($gameMessage.isBusy() || this.isBusy()) ){
		return;
	}
	
	for(var i=0; i< $gameSystem._drill_MTE_data.length; i++){			//根据触发集合，遍历触发
		var temp_sprite = $gameTemp._drill_MTE_sprites[i];
		var temp_data = $gameSystem._drill_MTE_data[i];
		if( this.drill_MTE_isBitmapReady(temp_sprite) ){
			
			// > 鼠标ON触发
			if( this.drill_MTE_isOnMouse( temp_data._type, temp_sprite ) ){
				var key = [ $gameMap._mapId, temp_data._event_id, temp_data._switch ];
				if( $gameSelfSwitches.value(key) !== true){
					$gameSelfSwitches.drill_setValueWithOutChange(key,true);
					$gameSelfSwitches.onChange();
				}
			}
			
			// > 鼠标OFF触发
			if( this.drill_MTE_isOnOFFMouse( temp_data._type, temp_sprite ) ){
				var key = [ $gameMap._mapId, temp_data._event_id, temp_data._switch ];
				if( $gameSelfSwitches.value(key) !== false){
					$gameSelfSwitches.drill_setValueWithOutChange(key,false);
					$gameSelfSwitches.onChange();
				}
			}
			
			//【注意，这里是并列结构，根据 temp_data._type 分门别类进行触发判定。】
		}
	}
};
//==============================
// * 判定 - 鼠标ON触发
//==============================
Scene_Map.prototype.drill_MTE_isOnMouse = function( type, sprite ){ 
	if( type == "左键按下[持续]" ){
		if( TouchInput.drill_isLeftPressed() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "左键按下[一帧]" ){
		if( TouchInput.drill_isLeftTriggerd() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "左键释放[一帧]" ){
		if( TouchInput.drill_isLeftReleased() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "左键双击[一帧]" ){
		if( TouchInput.drill_isLeftDoubled() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
		
	}else if( type == "右键按下[持续]" ){
		if( TouchInput.drill_isRightPressed() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "右键按下[一帧]" ){
		if( TouchInput.drill_isRightTriggerd() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "右键释放[一帧]" ){
		if( TouchInput.drill_isRightReleased() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "右键双击[一帧]" ){
		if( TouchInput.drill_isRightDoubled() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
		
	}else if( type == "滚轮按下[持续]" ){
		if( TouchInput.drill_isMiddlePressed() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "滚轮按下[一帧]" ){
		if( TouchInput.drill_isMiddleTriggerd() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "滚轮释放[一帧]" ){
		if( TouchInput.drill_isMiddleReleased() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
	}else if( type == "滚轮双击[一帧]" ){
		if( TouchInput.drill_isMiddleDoubled() && this.drill_MTE_isOnMouseHover(sprite) ){ return true};
		
	}else if( type == "滚轮上滚" ){
		if( TouchInput.drill_isWheelUp() && this.drill_MTE_isOnMouseHover(sprite) ){return true;}
	}else if( type == "滚轮下滚" ){
		if( TouchInput.drill_isWheelDown() && this.drill_MTE_isOnMouseHover(sprite) ){return true;}
	}else if( type == "悬停且离开时OFF" ){
		if( this.drill_MTE_isOnMouseHover(sprite) ){return true;}
	}else if( type == "悬停" ){
		if( this.drill_MTE_isOnMouseHover(sprite) ){return true;}
	}
	return false;	
};
//==============================
// * 判定 - 鼠标OFF触发
//==============================
Scene_Map.prototype.drill_MTE_isOnOFFMouse = function( type, sprite ){ 
	if( type == "任何位置左键释放[一帧]" ){
		if( TouchInput.drill_isLeftReleased() ){ return true; }
	}else if( type == "任何位置右键释放[一帧]" ){
		if( TouchInput.drill_isRightReleased() ){ return true; }
	}else if( type == "任何位置滚轮释放[一帧]" ){
		if( TouchInput.drill_isMiddleReleased() ){ return true; }
	}else if( type == "悬停且离开时OFF" ){
		if( !this.drill_MTE_isOnMouseHover(sprite) ){return true; }
	}else if( type == "不在悬停区域时" ){
		if( !this.drill_MTE_isOnMouseHover(sprite) ){return true; }
	}
	return false;	
}
//==============================
// * 判定 - 鼠标触发所处范围
//==============================
Scene_Map.prototype.drill_MTE_isOnMouseHover = function( sprite ){ 
	if( this.drill_MTE_isUnificationSprite(sprite) ){
		//一体化事件
		var sprite_list = this.drill_MTE_getUnificationSprites( sprite );
		return this.drill_MTE_isOnRangeList( sprite_list );
	}else{
		//单独事件
		return this.drill_MTE_isOnRange( sprite );
	}
};
//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function( key, value ){ 
    if( value ){ 
        this._data[key] = true;
    }else{
        delete this._data[key];
    }
};
//==============================
// * 一体化 - 判断是否为一体化事件
//==============================
Scene_Map.prototype.drill_MTE_isUnificationSprite = function( sprite ){ 
	if( !Imported.Drill_EventUnification ){ return false;}
	if( !sprite._character ){ return false;}
	if( !sprite._character.drill_EU_hasTriggerTag() ){ return false;}
	return true;
}

//==============================
// * 一体化 - 根据单个贴图获取到关联的贴图(乱序)
//==============================
Scene_Map.prototype.drill_MTE_getUnificationSprites = function( sprite ){ 
	var tag = sprite._character._drill_EU.trigger;
	var sprite_list = [];
	var sprites = this.drill_MTE_getSpritesByTag(tag);	//触发时，所有相同标签的事件同时触发
	sprite_list = sprite_list.concat(sprites);
	return sprite_list;
}
//==============================
// * 一体化 - 根据标签获取到对应贴图(乱序)
//==============================
Scene_Map.prototype.drill_MTE_getSpritesByTag = function( t_key ){ 
	var ev_list = $gameTemp.drill_EU_getEventsByTriggerTag( t_key );
	if(	$gameTemp._drill_MTE_EU_cacheSprites[t_key] &&
		$gameTemp._drill_MTE_EU_cacheListener[t_key] === ev_list.length ){
		return $gameTemp._drill_MTE_EU_cacheSprites[t_key];		//缓冲池中有，且event没有变化，就直接返回
	}
		
	var result = [];
	for(var i=0; i< this._spriteset._characterSprites.length; i++){		//如果没有，则新组装
		var temp_sprite = this._spriteset._characterSprites[i];
		if( temp_sprite &&
			temp_sprite._character &&
			ev_list.indexOf(temp_sprite._character) != -1 ){
			result.push(temp_sprite);
		}
	}
	$gameTemp._drill_MTE_EU_cacheSprites[t_key] = result;
	$gameTemp._drill_MTE_EU_cacheListener[t_key] = result.length;
	return result;
};

//==============================
// * 贴图判定 - 是否准备完毕
//==============================
Scene_Map.prototype.drill_MTE_isBitmapReady = function( sprite ){ 
	if( !sprite ){ return false };
	if( !sprite.bitmap ){ return false };
	if( !sprite.bitmap.isReady() ){ return false };
	if( sprite.visible === false ){ return false};
	if( sprite.opacity === 0 ){ return false};
	return true;	
}
DrillUp.g_LPa_alert = true;
//==============================
// * 贴图判定 - 是否处在范围
//==============================
Scene_Map.prototype.drill_MTE_isOnRange = function( sprite ){ 
	var cw = sprite.patternWidth();
	var ch = sprite.patternHeight();
	var cx = sprite.x;
	var cy = sprite.y;
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( Imported.Drill_LayerCamera ){		// 【地图 - 活动地图镜头】获取鼠标落点位置
											//	（这是事件的层级，事件处于 下层、中层、上层）
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPa_alert == true ){ 
			alert("【Drill_MouseTriggerEvent.js 鼠标 - 鼠标触发事件】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
			DrillUp.g_LPa_alert = false;
			return; 
		}
		var mouse_pos = $gameSystem._drill_LCa_controller.drill_LCa_getMousePos_OnChildren();
		_x = mouse_pos.x;
		_y = mouse_pos.y;
	}
	if( _x <  cx + 0  - cw*sprite.anchor.x ){ return false };
	if( _x >= cx + cw - cw*sprite.anchor.x ){ return false };
	if( _y <  cy + 0  - ch*sprite.anchor.y ){ return false };
	if( _y >= cy + ch - ch*sprite.anchor.y ){ return false };
	return true;	
};
//==============================
// * 贴图判定 - 是否处在范围集合中
//==============================
Scene_Map.prototype.drill_MTE_isOnRangeList = function( sprite_list ){ 
	for(var i=0; i < sprite_list.length; i++){
		if( this.drill_MTE_isOnRange( sprite_list[i] ) ){ return true; }
	}
	return false;
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MouseTriggerEvent = false;
		alert(
			"【Drill_MouseTriggerEvent.js 鼠标 - 鼠标触发事件】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"
		);
}


