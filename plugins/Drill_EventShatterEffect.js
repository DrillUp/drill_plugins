//=============================================================================
// Drill_EventShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        行走图 - 方块粉碎效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得行走图能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.3及以上版本★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件行走图。
 * 2.想要更多了解方块粉碎，去看看 "1.系统 > 大家族-方块粉碎.docx"。
 * 细节：
 *   (1.行走图的粉碎效果不支持镜面反射。
 *   (2.行走图的粉碎效果不支持滤镜。
 *   (3.碎片的效果只在当前地图有效，离开地图失效。
 *   (4.粉碎后，事件的本体还在。你需要手动设置 暂时消除或彻底删除事件。
 * 设计:
 *   (1.你可以通过插件指令控制碎片永不消失，并且隔一段时间执行碎片重组，
 *      以此来设计一个无法击败的怪物。
 *   (2.你可以自定义方块的粉碎公式，以此形成不同的粉碎扩散效果。
 *      其中"方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 *      具体可以去看看 方块粉碎核心。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置下列的插件指令，指定某个事件播放粉碎效果：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 本事件 : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 事件[10] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 事件变量[10] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 批量事件[10,11,12] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 批量事件变量[21,22,23] : 方块粉碎[1]
 * 
 * 插件指令：>方块粉碎效果 : 本事件 : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 本事件 : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 本事件 : 立刻复原
 * 插件指令：>方块粉碎效果 : 本事件 : 暂停播放
 * 插件指令：>方块粉碎效果 : 本事件 : 继续播放
 * 
 * 1.前面部分（本事件）和后面设置（方块粉碎[1]）可以随意组合。
 *   一共有5*3种组合方式。
 * 2."方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令快速复原全图的碎片：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 全图事件 : 立刻复原
 * 插件指令：>方块粉碎效果 : 全图事件 : 暂停播放
 * 插件指令：>方块粉碎效果 : 全图事件 : 继续播放
 * 
 * 1.插件指令能对碎掉的事件有效，未碎的事件不起效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改碎片的消失设置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 设回默认
 * 
 * 1."设回默认"表示设置为当前当前配置的默认的消失方式。
 * 2.你可以设置碎片不消失，然后使用反转粉碎让地上的碎片重组。
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
 * 时间复杂度： o(n^2)*o(贴图处理)
 * 测试方法：   在地图管理层、消除砖块关卡中测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【115.27ms】
 *              100个事件的地图中，平均消耗为：【94.15ms】
 *               50个事件的地图中，平均消耗为：【76.78ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后贴图实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构，修改了注释内容。
 * [v1.2]
 * 修改了与核心的部分兼容设置。
 * [v1.3]
 * 添加了 全图事件 的粉碎复原指令。
 * [v1.4]
 * 优化了部分细节。
 * [v1.5]
 * 大幅度优化了结构，支持了 暂停播放和继续播放 功能。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * @param 默认事件碎片消失方式
 * @type select
 * @option 不消失
 * @value 不消失
 * @option 线性消失
 * @value 线性消失
 * @option 等一半时间后线性消失
 * @value 等一半时间后线性消失
 * @desc 碎片消失的方式。
 * @default 等一半时间后线性消失
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESE（Event_Shatter_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_ESE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)
//		★性能测试因素	地图管理层测试粉碎
//		★性能测试消耗	115.27ms
//		★最坏情况		大量事件同时执行粉碎。
//		★备注			粉碎过程消耗比较大，是在图像方面的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			方块粉碎效果：
//				->事件贴图
//					->获取 - 容器指针【标准函数】
//					->获取 - 根据事件ID【标准函数】
//				->粉碎配置
//					->绑定控制器
//					->6像素偏移修正
//					->绑定贴图
//					->贴图框架标记
//				->特殊情况
//					->镜像屏蔽
//
//		★必要注意事项：
//			1.该插件的 父贴图隐藏 方法为：this.texture.frame = Rectangle.emptyRectangle;
//			  还原时只要 _refresh 即可。
//			  注意，不要用 setFrame ，会影响贴图中的 this._realFrame 的缓存参数。（绕开这个参数）
//			2.大量事件执行粉碎效果，会造成实质性的【巨大消耗】。
//			  因为该插件暂不考虑 控制器数据 的销毁时机。
//			
//		★其它说明细节：
//			1.  2021/3：
//				使用粉碎前，一定要想明白【贴图框架frame】的分配问题，
//				1) bitmap会不会实时变，是bitmap资源，还是实时bitmap？
//				2) 如果 frameWidth = 0 怎么办？如果bitmap为空怎么办？
//				3) 执行粉碎后，保持粉碎状态是一直持续的，除非执行复原。那么是否要锁定sprite的时间轴？
//				-1- 该插件为资源bitmap，资源变化后，不会立即改变碎片
//				-2- 该插件要杜绝frameWidth=0，建立了缓冲width，bitmap为空时，不会刷新缓冲。
//				-3- 该插件使用 this._drill_ESE['shatter_time'] 锁定了时间轴，存储在事件身上。
//				2022/7：
//				方块粉碎核心重新整合成了 数据-贴图 分离的结构，此问题已不再存在。
//				因为贴图方只要考虑记录高宽，剩下的给数据赋值即可，其它的不用管。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventShatterEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_ESE_opacityType = String(DrillUp.parameters['默认事件碎片消失方式'] || "等一半时间后线性消失");	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_ESE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_ESE_pluginCommand.call(this, command, args);
	if( command === ">方块粉碎效果" ){	// >方块粉碎效果 : 本事件 : 方块粉碎[1]
		if(args.length == 4){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var e_ids = null;
					
			/*-----------------对象组获取------------------*/
			if( unit == "本事件" ){
				e_ids = [ this._eventId ];
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
			if( e_ids == null && unit == "全图事件" ){
				var all_e = $gameMap._events;
				e_ids = [];
				for( var i=0; i < all_e.length; i++ ){
					if( !all_e[i] ){ continue; }
					e_ids.push( all_e[i]._eventId );
				}
			}
			
			/*-----------------粉碎操作------------------*/
			if( e_ids && temp1 == "立刻复原" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					if( e._drill_ESE_controller == undefined ){ continue; }
					e._drill_ESE_controller.drill_COSE_restoreShatter();
				}
				return;
			}
			if( e_ids && temp1 == "暂停播放" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					if( e._drill_ESE_controller == undefined ){ continue; }
					e._drill_ESE_controller.drill_COSE_pause();
				}
				return;
			}
			if( e_ids && temp1 == "继续播放" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					if( e._drill_ESE_controller == undefined ){ continue; }
					e._drill_ESE_controller.drill_COSE_continue();
				}
				return;
			}
				
			if( e_ids && temp1.indexOf("方块粉碎[") != -1 ){
				temp1 = temp1.replace("方块粉碎[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					var controlled_sprite = $gameTemp.drill_ESE_getCharacterSpriteByEventId( e_id );
					if( controlled_sprite == undefined ){ continue; }
					
					var controller = controlled_sprite.drill_ESE_createController( Number(temp1)-1 );
					controller.drill_COSE_runShatter();					//正常播放
				}
			}
			if( e_ids && temp1.indexOf("方块反转粉碎[") != -1 ){
				temp1 = temp1.replace("方块反转粉碎[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					var controlled_sprite = $gameTemp.drill_ESE_getCharacterSpriteByEventId( e_id );
					if( controlled_sprite == undefined ){ continue; }
					
					var controller = controlled_sprite.drill_ESE_createController( Number(temp1)-1 );
					controller.drill_COSE_backrunShatter();				//倒放
				}
			}
		}
		
		/*-----------------消失方式------------------*/
		if(args.length == 6){		//>方块粉碎效果 : 事件碎片 : 消失方式 : 不消失
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "事件碎片" && temp1 == "消失方式" ){
				if( temp2 == "设回默认" ){
					$gameSystem._drill_ESE_opacityType = DrillUp.g_ESE_opacityType;
				}else{
					$gameSystem._drill_ESE_opacityType = temp2;
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ESE_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventShatterEffect.js 行走图 - 方块粉碎效果】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ESE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ESE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ESE_sys_initialize.call(this);
	this.drill_ESE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ESE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ESE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ESE_saveEnabled == true ){	
		$gameSystem.drill_ESE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ESE_initSysData();
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
Game_System.prototype.drill_ESE_initSysData = function() {
	this.drill_ESE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ESE_checkSysData = function() {
	this.drill_ESE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ESE_initSysData_Private = function() {
	
	this._drill_ESE_opacityType = DrillUp.g_ESE_opacityType;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ESE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ESE_opacityType == undefined ){
		this.drill_ESE_initSysData();
	}
	
};


//#############################################################################
// ** 【标准模块】事件贴图
//#############################################################################
//##############################
// * 事件贴图 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组     （事件贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_ESE_getCharacterSpriteTank = function(){
	return this.drill_ESE_getCharacterSpriteTank_Private();
}
//##############################
// * 事件贴图 - 获取 - 根据事件ID【标准函数】
//			
//			参数：	> event_id 数字（事件ID）
//			返回：	> 贴图对象     （事件贴图）
//          
//			说明：	> 事件id和事件贴图一一对应。（不含镜像）
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_ESE_getCharacterSpriteByEventId = function( event_id ){
	return this.drill_ESE_getCharacterSpriteByEventId_Private( event_id );
}
//=============================================================================
// ** 事件贴图（接口实现）
//=============================================================================
//==============================
// * 事件贴图容器 - 获取 - 根据事件ID（私有）
//==============================
Game_Temp.prototype.drill_ESE_getCharacterSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._characterSprites;
};
//==============================
// * 事件贴图容器 - 获取 - 根据事件ID（私有）
//==============================
Game_Temp.prototype.drill_ESE_getCharacterSpriteByEventId_Private = function( event_id ){
	var sprite_list = this.drill_ESE_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }				//（判断 _character 就可以，不需要检验 Sprite_Character 了）
		if( this.drill_ESE_isReflectionSprite( sprite ) ){ continue; }	//（镜像跳过）
		if( sprite._character._eventId == event_id ){
			return sprite;
		}
	}
	return null;
};


//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_ESE_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}


//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _drill_ESE_data_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function() {
	_drill_ESE_data_initialize.call(this);
	//（不要用initMembers，follower没有这个方法）
	this._drill_ESE_controller = null;				//（默认为空）
}
//==============================
// * 物体 - 帧刷新
//==============================
var _drill_ESE_data_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
    _drill_ESE_data_update.call(this);
	if( this._drill_ESE_controller != null ){
		this._drill_ESE_controller.drill_COSE_update();
	}
};
//==============================
// * 物体 - 6像素偏移修正
//==============================
var _Drill_ESE_c_setImage = Game_CharacterBase.prototype.setImage;
Game_CharacterBase.prototype.setImage = function( characterName, characterIndex ){

	var is_obj = this._isObjectCharacter || false;
	if( characterName == undefined ){		//名称修正
		characterName = "";
	}
	
	// > 原函数
	_Drill_ESE_c_setImage.call(this, characterName, characterIndex);
	
	if( characterName == "" ){
		this._isObjectCharacter = is_obj;	//空白时保持object标记
	}
};


//=============================================================================
// ** 事件贴图
//=============================================================================
//==============================
// * 事件贴图 - 初始化
//==============================
var _Drill_ESE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function( character ){
	_Drill_ESE_s_setCharacter.call(this,character);
	
	// > 镜像情况时，直接跳过
	if( $gameTemp.drill_ESE_isReflectionSprite(this) ){ return; }
	
	// > 贴图框架标记
	this.drill_ESE_initBitmapFrame();
	
	// > 创建贴图
	this._drill_ESE_sprite = new Drill_COSE_LayerSprite();
	this.addChild( this._drill_ESE_sprite );
	
	// > 绑定控制器
	if( this._character != undefined &&
		this._character._drill_ESE_controller != undefined ){
		this._drill_ESE_sprite.drill_COSE_setController( this._character._drill_ESE_controller );
	}
};
//==============================
// * 事件贴图 - 帧刷新
//==============================
var _Drill_ESE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	
	// > 镜像情况时，直接跳过
	if( $gameTemp.drill_ESE_isReflectionSprite(this) ){
		_Drill_ESE_s_update.call(this);
		return;
	}
	
	// > 贴图框架 bitmap识别（必须放前面）
	this.drill_ESE_updateBitmapFrame();
	
	
	// > 帧刷新
	_Drill_ESE_s_update.call(this);
	
	
	if( !this._character ){ return; }
	if( !this.bitmap ){ return; }
	if( !this.bitmap.isReady() ){ return; }
	if( this._drill_ESE_sprite == undefined ){ return; }
	
	// > 粉碎播放时，隐藏父贴图
	if( this._drill_ESE_sprite.drill_COSE_canParentVisible() == false ){
		this.texture.frame = Rectangle.emptyRectangle;
		this._drill_ESE_frameIsEmpty = true;
	}else{
		
		// > 结束 粉碎播放 后一帧，还原父贴图
		if( this._drill_ESE_frameIsEmpty == true ){
			this._drill_ESE_frameIsEmpty = false;
			this._refresh();
		}
	}
};
//==============================
// * 贴图 - 创建控制器
//==============================
Sprite_Character.prototype.drill_ESE_createController = function( shatter_id ){
	if( this._character == undefined ){ return; }
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 参数准备
	var data = {
		"frameX": this._drill_ESE_frame_x,
		"frameY": this._drill_ESE_frame_y,
		"frameW": this._drill_ESE_frame_w,
		"frameH": this._drill_ESE_frame_h,
		"shatter_id": shatter_id,										//粉碎样式
		"shatter_opacityType": $gameSystem._drill_ESE_opacityType,		//透明度变化方式
		"shatter_hasParent": true,										//父贴图标记
	};
	
	// > 特殊情况设置
	var name = this.drill_ESE_getSrcName();
	if( name == "" ){			//（名称为空时，按照指定资源名为空来算）
		data["src_mode"] = "指定资源名";
		data["src_img"] = "";
		data["src_file"] = "img/characters/";
	}else if( name == this._character._characterName ){	//（名称一致时，表示有资源）
		data["src_mode"] = "指定资源名";
		data["src_img"] = name;
		data["src_file"] = "img/characters/";
	}else{								//（名称不一致，表示资源关闭）
		data["src_mode"] = "关闭资源控制";
		data["src_img"] = "";
		data["src_file"] = "";
	}
	
	// > 创建控制器
	if( this._character._drill_ESE_controller == undefined ){
		this._character._drill_ESE_controller = new Drill_COSE_Controller( data );
		this._drill_ESE_sprite.drill_COSE_setController( this._character._drill_ESE_controller );
		
	// > 更新控制器
	}else{
		this._character._drill_ESE_controller.drill_COSE_resetData( data );
	}
	
	return this._character._drill_ESE_controller;
};
//==============================
// * 贴图 - 获取资源名称
//==============================
Sprite_Character.prototype.drill_ESE_getSrcName = function(){
	if( this.bitmap == undefined ){ return ""; }
	var path_str = this.bitmap._url;
	path_str = path_str.replace(".png","");
	var str_list = path_str.split("/");
	return decodeURIComponent( str_list[str_list.length-1] );	//（剥离url，留下文件名，并解码）
};


//=============================================================================
// ** 贴图框架
//=============================================================================
//==============================
// * 贴图框架 - 初始化
//==============================
Sprite_Character.prototype.drill_ESE_initBitmapFrame = function() {
	this._drill_ESE_bitmap = null;			//框架 - obj对象
	this._drill_ESE_frame_x = -1;			//框架 - x
	this._drill_ESE_frame_y = -1;			//框架 - y
	this._drill_ESE_frame_w = 0;			//框架 - w
	this._drill_ESE_frame_h = 0;			//框架 - h
}
//==============================
// * 贴图框架 - bitmap识别（必须放前面）
//==============================
Sprite_Character.prototype.drill_ESE_updateBitmapFrame = function() {
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 不接受宽度为0的标记
	if( this._realFrame.width == 0 ){ return; }
	if( this._realFrame.height == 0 ){ return; }
	
	if( this._drill_ESE_frame_x != this._realFrame.x ||
		this._drill_ESE_frame_y != this._realFrame.y ||
		this._drill_ESE_frame_w != this._realFrame.width ||
		this._drill_ESE_frame_h != this._realFrame.height ){
		
		this._drill_ESE_bitmap = this.bitmap;				//记录bitmap数据，确保变成空时，不会丢失bitmap
		this._drill_ESE_frame_x = this._realFrame.x;
		this._drill_ESE_frame_y = this._realFrame.y;
		this._drill_ESE_frame_w = this._realFrame.width;
		this._drill_ESE_frame_h = this._realFrame.height;
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventShatterEffect = false;
		alert(
			"【Drill_EventShatterEffect.js 行走图 - 方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



