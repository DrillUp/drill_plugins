//=============================================================================
// Drill_MouseTriggerPicture.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        鼠标 - 鼠标触发图片
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseTriggerPicture +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 鼠标与图片进行触发交互时，你可以执行特定的公共事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。并可以辅助扩展下列插件。
 * 基于：
 *   - Drill_CoreOfInput          系统-输入设备核心
 *   - Drill_LayerCommandThread   地图-多线程
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于图片。
 * 细节：
 *   (1.插件右键点击时，可能会触发 地图界面 中的右键菜单功能，需要关闭。
 *   (2.鼠标触发的范围与资源图片的高宽相关。点击范围内透明区域，也有效。
 *   (3.需要先建立图片后，再进行触发添加，顺序不能反。
 *      如果建立图片与添加触发的指令没有写在一起，可能没有效果。
 * 公共事件：
 *   (1.地图界面中，公共事件的执行通过 地图-多线程 插件来控制，固定并行。
 *      战斗界面中，固定为串行执行。
 *   (2.注意，对话框事件指令 是特殊的指令体，只要执行对话框，就会强
 *      制串行，阻塞其他所有事件的线程。
 *   (3."上一次触发的" = "当前触发的" 你在公共事件中执行获取，就是当前的。
 *   (4.如果你的公共事件是并行执行，且有等待指令，那么一定要在等待指令之
 *      前获取"上一次触发"的数据，不然数据可能会被其他事件冲掉。
 * 设计：
 *   (1.你可以通过该插件，制作简单的图片点击按钮、拖拽图片等功能。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令控制鼠标事件绑定：
 * 
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标进入图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片变量[1] : 鼠标进入图片时 : 执行公共事件[1]
 * 
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标进入图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标离开图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标左键按下[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标左键释放[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标左键双击[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标右键按下[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标右键释放[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标右键双击[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标滚轮按下[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标滚轮释放[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标滚轮双击[一帧]图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标滚轮上滚图片时 : 执行公共事件[1]
 * 插件指令：>图片鼠标事件 : 图片[1] : 鼠标滚轮下滚图片时 : 执行公共事件[1]
 * 
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标进入图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标离开图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标左键按下[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标左键释放[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标左键双击[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标右键按下[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标右键释放[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标右键双击[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标滚轮按下[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标滚轮释放[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标滚轮双击[一帧]图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标滚轮上滚图片时
 * 插件指令：>图片鼠标事件 : 图片[1] : 去除触发条件 : 鼠标滚轮下滚图片时
 * 
 * 1.前半部分（图片）和 后半部分（鼠标进入图片时）的参数可以随意组合。
 *   一共有2*26种组合方式。
 * 2.该插件与 鼠标-鼠标触发事件 功能相似，但是由于图片没有独立开关，
 *   因此这里绑定的触发都是一帧，发生一次后只触发一次。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以获取插件触发记录中的数据：
 * 
 * 插件指令：>图片鼠标事件 : 获取触发记录 : 上一次触发的鼠标位置X : 变量[25]
 * 插件指令：>图片鼠标事件 : 获取触发记录 : 上一次触发的鼠标位置Y : 变量[26]
 * 插件指令：>图片鼠标事件 : 获取触发记录 : 上一次触发的图片ID : 变量[21]
 * 插件指令：>图片鼠标事件 : 获取触发记录 : 上一次触发的公共事件ID : 变量[22]
 * 
 * 1."上一次触发的" = "当前触发的" 你在公共事件中执行获取，就是当前的。
 * 2.如果你的公共事件是并行执行，且有等待指令，那么一定要在等待指令之前获取
 *   "上一次触发"的数据，不然数据可能会被其他事件冲掉。
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
 * 时间复杂度： o(n^2)  每帧
 * 测试方法：   在对话管理层进行图片鼠标触发测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【10.31ms】
 *              100个事件的地图中，平均消耗为：【9.15ms】
 *               50个事件的地图中，平均消耗为：【6.58ms】
 * 测试方法2：  在战斗时，进行图片鼠标触发测试。
 * 测试结果2：  战斗界面中，平均消耗为：【9.41ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于主要监听鼠标的位置，并不对图片进行实时的追踪处理，所以
 *   消耗非常小。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了重复加入事件绑定会叠加的bug。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MTP (Mouse_Trigger_Picture)
//		临时全局变量	DrillUp.g_MTP_xxx
//		临时局部变量	this._drill_MTP_xxx
//		存储数据变量	$gameSystem._drill_MTP_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)  每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	6.58ms（Scene_Map.update）
//		★最坏情况		暂无
//		★备注			能够稳定在10帧左右，去掉图片后，15帧左右。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			鼠标触发图片：（鼠标+触屏）
//				->鼠标点击
//				->触发记录
//
//		★必要注意事项：
//			1.【该插件使用了图片容器】。
//
//		★其它说明细节：
//			1.图片比较特殊，同时在战斗界面和地图界面都要有效果。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseTriggerPicture = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseTriggerPicture');
	


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_LayerCommandThread ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MTP_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MTP_pluginCommand.call(this, command, args);
	if( command === ">图片鼠标事件" ){
		
		if( args.length == 6 ){				//>图片鼠标事件 : 图片[1] : 鼠标进入图片时 : 执行公共事件[1]
			var pic_id = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			
			/*-----------------图片对象获取------------------*/
			var pic = null;
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_MTP_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			else if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_MTP_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			
			/*-----------------添加绑定------------------*/
			if( pic != null && temp3.indexOf("执行公共事件[") != -1 ){
				temp3 = temp3.replace("执行公共事件[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				if( temp2 == "鼠标进入图片时" ||
					temp2 == "鼠标离开图片时" || 
					temp2 == "鼠标左键按下[一帧]图片时" || 
					temp2 == "鼠标左键释放[一帧]图片时" || 
					temp2 == "鼠标左键双击[一帧]图片时" || 
					temp2 == "鼠标右键按下[一帧]图片时" || 
					temp2 == "鼠标右键释放[一帧]图片时" || 
					temp2 == "鼠标右键双击[一帧]图片时" || 
					temp2 == "鼠标滚轮按下[一帧]图片时" || 
					temp2 == "鼠标滚轮释放[一帧]图片时" || 
					temp2 == "鼠标滚轮双击[一帧]图片时" || 
					temp2 == "鼠标滚轮上滚图片时" || 
					temp2 == "鼠标滚轮下滚图片时" ){
					pic.drill_MTP_addTrigger( temp2, temp3 );
				}
			}
			
			/*-----------------去除绑定------------------*/
			if( pic != null && temp2 == "去除触发条件" ){
				if( temp3 == "鼠标进入图片时" ||
					temp3 == "鼠标离开图片时" || 
					temp3 == "鼠标左键按下[一帧]图片时" || 
					temp3 == "鼠标左键释放[一帧]图片时" || 
					temp3 == "鼠标左键双击[一帧]图片时" || 
					temp3 == "鼠标右键按下[一帧]图片时" || 
					temp3 == "鼠标右键释放[一帧]图片时" || 
					temp3 == "鼠标右键双击[一帧]图片时" || 
					temp3 == "鼠标滚轮按下[一帧]图片时" || 
					temp3 == "鼠标滚轮释放[一帧]图片时" || 
					temp3 == "鼠标滚轮双击[一帧]图片时" || 
					temp3 == "鼠标滚轮上滚图片时" || 
					temp3 == "鼠标滚轮下滚图片时" ){
					pic.drill_MTP_removeTrigger( temp3 );
				}
			}
		}
		
		if( args.length == 6 ){	
			var type = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			
			if( type == "获取触发记录" ){
				temp3 = temp3.replace("变量[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				if( temp2 == "上一次触发的鼠标位置X" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_MTP_lastX );
				}
				if( temp2 == "上一次触发的鼠标位置Y" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_MTP_lastY );
				}
				if( temp2 == "上一次触发的图片ID" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_MTP_lastPicId );
				}
				if( temp2 == "上一次触发的公共事件ID" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_MTP_lastCommonId );
				}
			}
		}
	};
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_MTP_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_MouseTriggerPicture.js 鼠标 - 鼠标触发图片】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
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
DrillUp.g_MTP_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MTP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MTP_sys_initialize.call(this);
	this.drill_MTP_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MTP_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MTP_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MTP_saveEnabled == true ){	
		$gameSystem.drill_MTP_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MTP_initSysData();
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
Game_System.prototype.drill_MTP_initSysData = function() {
	this.drill_MTP_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MTP_checkSysData = function() {
	this.drill_MTP_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MTP_initSysData_Private = function() {
	
	this._drill_MTP_lastX = 0;				//上一次触发的鼠标位置X
	this._drill_MTP_lastY = 0;				//上一次触发的鼠标位置Y
	this._drill_MTP_lastPicId = 0;			//上一次触发的图片ID
	this._drill_MTP_lastCommonId = 0;		//上一次触发的公共事件ID
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MTP_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MTP_lastCommonId == undefined ){
		this.drill_MTP_initSysData();
	}
	
};


//=============================================================================
// ** 图片容器
//=============================================================================
//==============================
// * 图片容器 - 初始化
//==============================
var _drill_MTP_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MTP_temp_initialize.call(this);
	this._drill_MTP_needRestatistics = true;			//刷新统计
};
//==============================
// * 图片容器 - 切换地图时
//==============================
var _drill_MTP_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_MTP_gmap_setup.call(this,mapId);
	//$gameTemp._drill_MTP_needRestatistics = true;
}
//==============================
// * 图片容器 - 切换贴图时（菜单界面刷新）（注意，这里对 地图界面+战斗界面 都有效）
//==============================
var _drill_MTP_sbase_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
	_drill_MTP_sbase_createPictures.call(this);
	$gameTemp._drill_MTP_needRestatistics = true;
}
//==============================
// * 场景层 - 帧刷新
//==============================
var _drill_MTP_base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {	
	_drill_MTP_base_update.call(this);
	this.drill_MTP_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 场景层 - 帧刷新 - 刷新统计
//==============================
Spriteset_Base.prototype.drill_MTP_updateRestatistics = function() {
	if( !$gameTemp._drill_MTP_needRestatistics ){ return }
	$gameTemp._drill_MTP_needRestatistics = false;
	
	$gameTemp._drill_MTP_sprites = [];
	for( var i=0; i < this._pictureContainer.children.length; i++ ){
		var temp_sprite = this._pictureContainer.children[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite instanceof Sprite_Picture == false ){ continue; }
		if( temp_sprite.picture() == undefined ){ continue; }
		
		if( temp_sprite.picture()._drill_MTP['triggerType'].length > 0 ){
			temp_sprite.picture()._drill_MTP['isMouseInRange'] == false;	//防止按住图片切菜单的情况
			$gameTemp._drill_MTP_sprites.push( temp_sprite );
		}
	}
}
//==============================
// * 图片 - 获取图片ID
//==============================
Game_Screen.prototype.drill_MTP_getPictureId = function( game_picture ) {
    if ($gameParty.inBattle()) {	//战斗界面
		var pic_id = this._pictures.indexOf( game_picture );
		if( pic_id == -1 ){ return -1; }
        return pic_id - this.maxPictures();
    } else {	//地图界面
		var pic_id = this._pictures.indexOf( game_picture );
        return pic_id;
    }
};

//=============================================================================
// ** 地图点击拦截
//=============================================================================
//==============================
// * 拦截 - 点击监听
//==============================
var _drill_MTP_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {	
	if( this.drill_MTP_isOnGaugeButton() ){ return; }	//鼠标按下（阻止目的地+鼠标辅助面板）
	_drill_MTP_processMapTouch.call(this);
};
//==============================
// * 拦截 - 条件
//==============================
Scene_Map.prototype.drill_MTP_isOnGaugeButton = function() {	
	for(var i=0; i < $gameTemp._drill_MTP_sprites.length; i++){
		var temp_sprite = $gameTemp._drill_MTP_sprites[i];
		if( this.drill_MTP_isOnRange( temp_sprite ) ){
			return true;
		}
	}
	return false;	
};

//=============================================================================
// ** 地图界面点击捕获
//=============================================================================
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_MTP_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_MTP_map_update.call(this);
	this.drill_MTP_updatePictureHover();			//判定图片悬停范围
	this.drill_MTP_updatePictureMouse();			//判定图片鼠标点击事件
};
//==============================
// * 帧刷新 - 判定图片悬停范围
//==============================
Scene_Map.prototype.drill_MTP_updatePictureHover = function() {
	for(var i=$gameTemp._drill_MTP_sprites.length-1; i >= 0; i--){	//（倒序）
		var temp_sprite = $gameTemp._drill_MTP_sprites[i];
		if( temp_sprite.picture() == undefined ){ continue; }
		var temp_pic = temp_sprite.picture();
		
		if( this.drill_MTP_isOnRange( temp_sprite ) ){
			if( temp_pic._drill_MTP['isMouseInRange'] == false ){
				temp_pic._drill_MTP['isMouseInRange'] = true;
				
				// > 进入范围时
				var commonId = temp_pic.drill_MTP_getCommonIdByTriggerType( "鼠标进入图片时" );
				if( commonId != -1 ){
					$gameSystem._drill_MTP_lastPicId = $gameScreen.drill_MTP_getPictureId( temp_pic );	//（记录上一个图片id）
					this.drill_MTP_executeCommonEvent( commonId );
				}
			}
			
		}else{
			if( temp_pic._drill_MTP['isMouseInRange'] == true ){
				temp_pic._drill_MTP['isMouseInRange'] = false;
				
				// > 离开范围时
				var commonId = temp_pic.drill_MTP_getCommonIdByTriggerType( "鼠标离开图片时" );
				if( commonId != -1 ){
					$gameSystem._drill_MTP_lastPicId = $gameScreen.drill_MTP_getPictureId( temp_pic );	//（记录上一个图片id）
					this.drill_MTP_executeCommonEvent( commonId );
				}
			}
			
		}
	}
}
//==============================
// * 帧刷新 - 判定图片鼠标点击事件
//==============================
Scene_Map.prototype.drill_MTP_updatePictureMouse = function() {
	
	// > 获取鼠标触发类型
	var trigger_type = "";
	if( TouchInput.drill_isWheelUp() ){ 		trigger_type = "鼠标滚轮上滚图片时"; }			// 滚轮向上[一帧]
	if( TouchInput.drill_isWheelDown() ){ 		trigger_type = "鼠标滚轮下滚图片时"; }			// 滚轮向下[一帧]
	if( TouchInput.drill_isLeftTriggerd() ){ 	trigger_type = "鼠标左键按下[一帧]图片时"; }	// 左键按下[一帧]
	if( TouchInput.drill_isLeftReleased() ){ 	trigger_type = "鼠标左键释放[一帧]图片时"; }	// 左键释放[一帧]
	if( TouchInput.drill_isLeftDoubled() ){ 	trigger_type = "鼠标左键双击[一帧]图片时"; }	// 左键双击[一帧]
	if( TouchInput.drill_isMiddleTriggerd() ){ 	trigger_type = "鼠标滚轮按下[一帧]图片时"; }	// 中键按下[一帧]
	if( TouchInput.drill_isMiddleReleased() ){ 	trigger_type = "鼠标滚轮释放[一帧]图片时"; }	// 中键释放[一帧]
	if( TouchInput.drill_isMiddleDoubled() ){ 	trigger_type = "鼠标滚轮双击[一帧]图片时"; }	// 中键双击[一帧]
	if( TouchInput.drill_isRightTriggerd() ){ 	trigger_type = "鼠标右键按下[一帧]图片时"; }	// 右键按下[一帧]
	if( TouchInput.drill_isRightReleased() ){ 	trigger_type = "鼠标右键释放[一帧]图片时"; }	// 右键释放[一帧]
	if( TouchInput.drill_isRightDoubled() ){ 	trigger_type = "鼠标右键双击[一帧]图片时"; }	// 右键双击[一帧]
	
	// > 执行公共事件
	if( trigger_type != "" ){
		for(var i=$gameTemp._drill_MTP_sprites.length-1; i >= 0; i--){	//（倒序）
			var temp_sprite = $gameTemp._drill_MTP_sprites[i];
			if( temp_sprite.picture() == undefined ){ continue; }
			var temp_pic = temp_sprite.picture();
			
			if( this.drill_MTP_isOnRange( temp_sprite ) ){
				
				var commonId = temp_pic.drill_MTP_getCommonIdByTriggerType( trigger_type );
				if( commonId != -1 ){
					$gameSystem._drill_MTP_lastPicId = $gameScreen.drill_MTP_getPictureId( temp_pic );	//（记录上一个图片id）
					this.drill_MTP_executeCommonEvent( commonId );
				}
			}
		}
	}
}
//==============================
// * 地图 - 判断悬停
//==============================
Scene_Map.prototype.drill_MTP_isOnRange = function( sprite ){
	if( sprite == undefined ){ return false };
	if( sprite.bitmap == undefined ){ return false };
	var cw = sprite.bitmap.width;
	var ch = sprite.bitmap.height;
	var cx = sprite.x ;
	var cy = sprite.y ;
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	
	// > 镜头缩放【地图 - 活动地图镜头】
	//		（图片处于 图片层、最顶层 之间，不需要考虑缩放）
	
	if( _x <  cx + 0  - cw*sprite.anchor.x ){ return false };
	if( _x >= cx + cw - cw*sprite.anchor.x ){ return false };
	if( _y <  cy + 0  - ch*sprite.anchor.y ){ return false };
	if( _y >= cy + ch - ch*sprite.anchor.y ){ return false };
	return true;	
}


//=============================================================================
// ** 战斗界面点击捕获
//=============================================================================
//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_MTP_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_MTP_battle_update.call(this);
	this.drill_MTP_updatePictureHover();			//判定图片悬停范围
	this.drill_MTP_updatePictureMouse();			//判定图片鼠标点击事件
};
//==============================
// * 战斗 - 判定图片
//==============================
Scene_Battle.prototype.drill_MTP_updatePictureHover = Scene_Map.prototype.drill_MTP_updatePictureHover;
Scene_Battle.prototype.drill_MTP_updatePictureMouse = Scene_Map.prototype.drill_MTP_updatePictureMouse;
//==============================
// * 战斗 - 判断悬停
//==============================
Scene_Battle.prototype.drill_MTP_isOnRange = function( sprite ){
	if( sprite == undefined ){ return false };
	if( sprite.bitmap == undefined ){ return false };
	var cw = sprite.bitmap.width;
	var ch = sprite.bitmap.height;
	var cx = sprite.x ;
	var cy = sprite.y ;
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	
	// > 镜头缩放【战斗 - 活动战斗镜头】
	//		（图片处于 图片层、最顶层 之间，不需要考虑缩放）
	
	if( _x <  cx + 0  - cw*sprite.anchor.x ){ return false };
	if( _x >= cx + cw - cw*sprite.anchor.x ){ return false };
	if( _y <  cy + 0  - ch*sprite.anchor.y ){ return false };
	if( _y >= cy + ch - ch*sprite.anchor.y ){ return false };
	return true;	
}


//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _drill_MTP_pic_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_drill_MTP_pic_initialize.call(this);
	this.drill_MTP_init();							//参数初始化
	$gameTemp._drill_MTP_needRestatistics = true;	//图片创建后，强制刷新（战斗界面中创建的图片）
}
//==============================
// * 图片 - 参数初始化
//==============================
Game_Picture.prototype.drill_MTP_init = function(){
	this._drill_MTP = {};
	this._drill_MTP['triggerType'] = [];			//触发的鼠标类型
	this._drill_MTP['triggerCommonId'] = [];		//触发的公共事件
	this._drill_MTP['isMouseInRange'] = false;		//鼠标进入图片范围
}
//==============================
// * 图片 - 图片移除时
//==============================
var _drill_MTP_pic_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_drill_MTP_pic_erase.call(this);
	this.drill_MTP_init();							//参数清空
	$gameTemp._drill_MTP_needRestatistics = true;	//图片消除后，强制刷新
}
//==============================
// * 图片操作 - 消除图片（command235）
//==============================
var _drill_MTP_pic_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var pic_id = this.realPictureId(pictureId);
    var pic = this._pictures[pic_id];
	if( pic != undefined ){
		pic.drill_MTP_init();					//参数清空
	}
	
	_drill_MTP_pic_erasePicture.call( this, pictureId );
	
	$gameTemp._drill_MTP_needRestatistics = true;	//图片消除后，强制刷新
};
//==============================
// * 图片 - 加入新的触发
//==============================
Game_Picture.prototype.drill_MTP_addTrigger = function( typeName, commonId ){
	// > 检查重复
	var index = this._drill_MTP['triggerType'].indexOf(typeName);
	if( index == -1 ){
		this._drill_MTP['triggerType'].push( typeName );
		this._drill_MTP['triggerCommonId'].push( commonId );
	}else{
		this._drill_MTP['triggerCommonId'][ index ] = commonId;
	}
}
//==============================
// * 图片 - 去除新的触发
//==============================
Game_Picture.prototype.drill_MTP_removeTrigger = function( typeName ){
	for(var i = this._drill_MTP['triggerType'].length-1; i >= 0; i-- ){
		var temp_name = this._drill_MTP['triggerType'][i];
		if( temp_name == typeName ){
			this._drill_MTP['triggerType'].splice(i,1);
			this._drill_MTP['triggerCommonId'].splice(i,1);
		}
	}
}
//==============================
// * 图片 - 获取触发类型的公共事件id
//==============================
Game_Picture.prototype.drill_MTP_getCommonIdByTriggerType = function( typeName ){
	for(var i = this._drill_MTP['triggerType'].length-1; i >= 0; i-- ){
		var temp_name = this._drill_MTP['triggerType'][i];
		if( temp_name == typeName ){
			return this._drill_MTP['triggerCommonId'][i];
		}
	}
	return -1;
}

//=============================================================================
// ** 公共事件
//=============================================================================
//==============================
// ** 公共事件 - 地图界面执行
//==============================
Scene_Map.prototype.drill_MTP_executeCommonEvent = function( commonId ) {
	
	$gameSystem._drill_MTP_lastX = _drill_mouse_x;
	$gameSystem._drill_MTP_lastY = _drill_mouse_y;
	$gameSystem._drill_MTP_lastCommonId = commonId;
	
	var e_data = {
		'type':"公共事件",
		'pipeType': "并行",
		'commonEventId': commonId,
	};
	$gameMap.drill_LCT_addPipeEvent( e_data );
}
//==============================
// ** 公共事件 - 战斗界面执行
//==============================
Scene_Battle.prototype.drill_MTP_executeCommonEvent = function( commonId ) {
	
	$gameSystem._drill_MTP_lastX = _drill_mouse_x;
	$gameSystem._drill_MTP_lastY = _drill_mouse_y;
	$gameSystem._drill_MTP_lastCommonId = commonId;
	
	//...
	var e_data = {
		'type':"公共事件",
		'pipeType': "串行",
		'commonEventId': commonId,
	};
	
	$gameTemp.reserveCommonEvent( commonId );
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MouseTriggerPicture = false;
		alert(
			"【Drill_MouseTriggerPicture.js 地图UI - 地图公共事件按钮集】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心" + 
			"\n- Drill_LayerCommandThread 地图-多线程"
		);
}

