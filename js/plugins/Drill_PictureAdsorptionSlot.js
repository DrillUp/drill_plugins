//=============================================================================
// Drill_PictureAdsorptionSlot.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        图片 - 图片吸附槽
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureAdsorptionSlot +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在指定位置添加吸附槽，拖拽时会自动吸附。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件基于 可拖拽图片 插件。
 * 基于：
 *   - Drill_CoreOfBallistics     系统 - 弹道核心
 *   - Drill_MouseDragPicture     鼠标 - 可拖拽的图片
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 * 2.详细内容可以去看看"关于鼠标拖拽图片.docx"。
 * 细节：
 *   (1.吸附只针对 图片的锚点 ，锚点进入范围后，自动吸附。
 *      你需要注意标记图片的锚点位置。
 * 吸附关系：
 *   (1.吸附槽、吸附类型、图片，是三种相互关系的结构，具体去看看文档。
 * 设计：
 *   (1.你可以通过该插件，建立简单的石板放置谜题、卡片顺序谜题。
 *      但是不建议制作复杂的装备卡牌类功能。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令添加吸附槽：
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 建立吸附槽 : 类型[卡牌A类] : 位置[200,300]
 * 插件指令：>图片吸附槽 : 槽变量[1] : 建立吸附槽 : 类型[卡牌A类] : 位置[200,300]
 * 
 * 插件指令：>图片吸附槽 : 槽[1] : 建立吸附槽 : 类型[卡牌A类] : 位置[200,300]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 必然吸附范围[72]
 * 插件指令：>图片吸附槽 : 槽[1] : 修改属性 : 一般吸附范围[144]
 * 插件指令：>图片吸附槽 : 槽[1] : 删除吸附槽
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 添加吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 图片变量[1] : 添加吸附类型 : 类型[卡牌A类]
 * 
 * 插件指令：>图片吸附槽 : 图片[1] : 添加吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 图片[1] : 去除吸附类型 : 类型[卡牌A类]
 * 插件指令：>图片吸附槽 : 图片[1] : 去除全部吸附类型
 * 插件指令：>图片吸附槽 : 图片[1] : 获取该图片吸附的槽ID : 变量[21]
 * 
 * 1.槽配置中，前面部分（槽变量）和后面部分（建立吸附槽）可以随意组合。
 *   一共有2*4种组合方式。
 *   图片配置中，前面部分（图片变量）和后面部分（添加吸附类型）可以随意组合。
 *   一共有2*4种组合方式。
 * 2.只有图片吸附类型与槽的类型对应上，才能被吸附。
 *   你可以通过吸附类型，来区分不同种类的卡片与槽的放置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制额外操作：
 * 
 * 插件指令：>图片吸附槽 : 槽吸附范围DEBUG显示
 * 
 * 1."DEBUG显示"将会标出当前所有吸附槽的范围，可反复执行。
 *   显示的范围都是临时显示的贴图，切菜单即消失。
 *   另外，槽被删除或者被修改后，临时贴图不会发生变化。
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
 * 测试方法：   在对话管理层，放置5张图片和5个槽，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【13.37ms】
 *              100个事件的地图中，平均消耗为：【13.42ms】
 *               50个事件的地图中，平均消耗为：【12.20ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.图片吸附槽主要消耗在于槽与图片之间的位置判断，消耗并不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 该插件 造成图片插件设置斜切无效的bug。
 * 
 * 
 *
 * @param 默认必然吸附范围
 * @type number
 * @min 0
 * @desc 只要图片进入必然范围，就一定会被吸附。
 * @default 16
 *
 * @param 默认一般吸附范围
 * @type number
 * @min 0
 * @desc 图片静止且未被鼠标按着时，才会被吸附的范围。
 * @default 108
 *
 * @param 吸附时长
 * @type number
 * @min 1
 * @desc 图片吸附过程持续的时长。
 * @default 20
 * 
 * @param 吸附移动方式
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 吸附移动方式的设置。
 * @default 匀速移动
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PAS (Picture_Adsorption_Slot)
//		临时全局变量	DrillUp.g_PAS_xxx
//		临时局部变量	this._drill_PAS_xxx
//		存储数据变量	$gameSystem._drill_PAS_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)  每帧
//		性能测试因素	对话管理层
//		性能测试消耗	13.42ms、12.20ms（Sprite_Picture的update）6.10ms（updateAdsorptionCheck）
//		最坏情况		暂无
//		备注			能够稳定在10帧左右，去掉图片后，15帧左右。
//
//插件记录：
//		★大体框架与功能如下：
//			图片吸附槽：（鼠标+触屏）
//				->吸附条件
//					->必然吸附范围
//					->一般吸附范围
//					->鼠标拖拽
//					->鼠标从某槽位拖走
//					->槽最多只能吸附一张图片	x
//				->状态机
//					->已吸附
//					->正被吸附
//					->未吸附
//				->吸附类型
//				->扩展操作
//					->根据类型删除吸附槽		x
//					->获取槽吸附的图片数量		x
//				->吸附时音效	x
//			
//		★私有类如下：
//			* Drill_PAS_GamePicSlot      吸附槽
//
//		★必要注意事项：
//			1.该插件由于基于 鼠标拖拽 插件，其中不稳定的坐标偏移比较多，容易绕晕。
//			
//		★其它说明细节：
//			1.图片比较特殊，同时在战斗界面和地图界面都要有效果。
//			2.吸附槽物体容器建立在$gameScreen中，能保存到存储文件中。
//		
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureAdsorptionSlot = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureAdsorptionSlot');
	
	DrillUp.g_PAS_defaultEssentialRange = Number(DrillUp.parameters['默认必然吸附范围'] || 16);
	DrillUp.g_PAS_defaultCommonRange = Number(DrillUp.parameters['默认一般吸附范围'] || 108);
	DrillUp.g_PAS_adsorptTime = Number(DrillUp.parameters['吸附时长'] || 20);
	DrillUp.g_PAS_adsorptMoveType = String(DrillUp.parameters['吸附移动方式'] || "弹性移动");


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_MouseDragPicture ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_PAS_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PAS_pluginCommand.call(this, command, args);
	if(command === ">图片吸附槽"){
		
		/*-----------------建立槽------------------*/
		if( args.length == 8 ){		//>图片吸附槽 : 槽[1] : 建立吸附槽 : 类型[卡牌A类] : 位置[200,300]
			var slot_id = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			
			if( type == "建立吸附槽" ){
				if( slot_id.indexOf("槽变量[") != -1 ){
					slot_id = slot_id.replace("槽变量[","");
					slot_id = slot_id.replace("]","");
					slot_id = $gameVariables.value( Number(slot_id) );
				}
				if( slot_id.indexOf("槽[") != -1 ){
					slot_id = slot_id.replace("槽[","");
					slot_id = slot_id.replace("]","");
					slot_id = Number(slot_id);
				}
				temp3 = temp3.replace("类型[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("位置[","");
				temp4 = temp4.replace("]","");
				var temp_arr = temp4.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					var pos = [ Number(temp_arr[0]), Number(temp_arr[1]) ];
					$gameScreen.drill_PAS_addSlot( slot_id, pos[0], pos[1], temp3 );
				}
			}
		}
		/*-----------------修改属性------------------*/
		if( args.length == 6 ){	
			var slot_id = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( type == "修改属性" ){
				if( slot_id.indexOf("槽变量[") != -1 ){
					slot_id = slot_id.replace("槽变量[","");
					slot_id = slot_id.replace("]","");
					slot_id = $gameVariables.value( Number(slot_id) );
				}
				if( slot_id.indexOf("槽[") != -1 ){
					slot_id = slot_id.replace("槽[","");
					slot_id = slot_id.replace("]","");
					slot_id = Number(slot_id);
				}
				
				if( temp3.indexOf("必然吸附范围[") != -1 ){
					temp3 = temp3.replace("必然吸附范围[","");
					temp3 = temp3.replace("]","");
					if( $gameScreen.drill_PAS_isSlotExist( slot_id ) == false ){ return; }
					var slot = $gameScreen.drill_PAS_getSlot( slot_id );
					slot._drill_data['essentialRange'] = Number(temp3);
				}
				if( temp3.indexOf("一般吸附范围[") != -1 ){
					temp3 = temp3.replace("一般吸附范围[","");
					temp3 = temp3.replace("]","");
					if( $gameScreen.drill_PAS_isSlotExist( slot_id ) == false ){ return; }
					var slot = $gameScreen.drill_PAS_getSlot( slot_id );
					slot._drill_data['commonRange'] = Number(temp3);
				}
			}
		}
		if( args.length == 4 ){	
			var slot_id = String(args[1]);
			var type = String(args[3]);
			if( type == "删除吸附槽" ){
				if( slot_id.indexOf("槽变量[") != -1 ){
					slot_id = slot_id.replace("槽变量[","");
					slot_id = slot_id.replace("]","");
					slot_id = $gameVariables.value( Number(slot_id) );
				}
				if( slot_id.indexOf("槽[") != -1 ){
					slot_id = slot_id.replace("槽[","");
					slot_id = slot_id.replace("]","");
					slot_id = Number(slot_id);
				}
				$gameScreen.drill_PAS_removeSlot( slot_id );
			}
		}
		
		
		
		/*-----------------添加吸附类型------------------*/
		if( args.length == 6 ){		//>图片吸附槽 : 图片[1] : 添加吸附类型 : 类型[卡牌A类]
			var pic_id = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			var pic = null;
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			
			if( pic != null ){
				if( type == "添加吸附类型" ){
					temp1 = temp1.replace("类型[","");
					temp1 = temp1.replace("]","");
					pic.drill_PAS_addAdsorptionType( temp1 );
				}
				if( type == "去除吸附类型" ){
					temp1 = temp1.replace("类型[","");
					temp1 = temp1.replace("]","");
					pic.drill_PAS_removeAdsorptionType( temp1 );
				}
			}
		}
		if( args.length == 4 ){		//>图片吸附槽 : 图片[1] : 去除全部吸附类型
			var pic_id = String(args[1]);
			var type = String(args[3]);
			
			var pic = null;
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic != null ){
				if( type == "去除全部吸附类型" ){
					pic.drill_PAS_removeAllAdsorptionType();
				}
			}
		}
		
		
		/*-----------------获取吸附的槽ID------------------*/
		if( args.length == 6 ){		//>图片吸附槽 : 图片[1] : 获取该图片吸附的槽ID : 变量[21]
			var pic_id = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			var pic = null;
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_PAS_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			
			if( pic != null ){
				if( type == "获取该图片吸附的槽ID" ){
					temp1 = temp1.replace("变量[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					$gameVariables.setValue( temp1, pic._drill_PAS.adsorbedSlot );
				}
			}
		}
		
		/*-----------------DEBUG显示------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "槽吸附范围DEBUG显示" ){
				$gameTemp._Drill_PAS_showDebug = true;
			}
		}
		
	};
};
//==============================
// ** 插件指令 - 槽检查
//==============================
Game_Screen.prototype.drill_PAS_isSlotExist = function( slot_id ){
	if( slot_id == 0 ){ return false; }
	
	var slot = this.drill_PAS_getSlot( slot_id );
	if( slot == undefined ){
		alert( "【Drill_PictureAdsorptionSlot.js 图片 - 图片吸附槽】\n" +
				"插件指令错误，id为"+slot_id+"的槽还没被创建。");
		return false;
	}
	return true;
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PAS_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureAdsorptionSlot.js 图片 - 图片吸附槽】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 存储数据变量初始化
//=============================================================================
var _drill_PAS_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_PAS_initialize.call(this);
	// ...
}



//=============================================================================
// ** 屏幕
//=============================================================================
//==============================
// * 屏幕 - 初始化
//==============================
var _drill_PAS_screen_initialize = Game_Screen.prototype.initialize;
Game_Screen.prototype.initialize = function() {
	_drill_PAS_screen_initialize.call(this);
	this._drill_PAS_slotTank = [];		// 吸附槽容器
};
//==============================
// * 屏幕 - 帧刷新
//==============================
var _drill_PAS_screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
	_drill_PAS_screen_update.call(this);
	this.drill_PAS_updateSlots();
}
Game_Screen.prototype.drill_PAS_updateSlots = function() {
	this._drill_PAS_slotTank.forEach(function( slot ) {
        if( slot ){
            slot.update();
        }
    });
};
//==============================
// * 屏幕 - 添加吸附槽
//==============================
Game_Screen.prototype.drill_PAS_addSlot = function( id, x, y, type_name ) {
	var data = {};
	data['id'] = Number(id);
	data['x'] = Number(x);
	data['y'] = Number(y);
	data['type'] = type_name;
	data['essentialRange'] = DrillUp.g_PAS_defaultEssentialRange;
	data['commonRange'] = DrillUp.g_PAS_defaultCommonRange;
	var slot = new Drill_PAS_GamePicSlot( data );
	this._drill_PAS_slotTank[ Number(id) ] = slot;
}
//==============================
// * 屏幕 - 删除吸附槽
//==============================
Game_Screen.prototype.drill_PAS_removeSlot = function( id ) {
	
	this._drill_PAS_slotTank[ Number(id) ] = null;
	
	// > 所有被此槽吸附的图片变为 未吸附
	for(var i=0; i < this._pictures.length; i++ ){
		var pic = this._pictures[i];
		if( pic == undefined ){ continue; }
		if( pic._drill_PAS.lastSlot == Number(id) ){
			pic._drill_PAS.lastSlot = -1;
		}
		if( pic._drill_PAS.adsorbedSlot == Number(id) ){
			pic.drill_PAS_setNotAdsorbed();
		}
	}
}
//==============================
// * 屏幕 - 获取吸附槽
//==============================
Game_Screen.prototype.drill_PAS_getSlot = function( id ) {
	return this._drill_PAS_slotTank[ Number(id) ];
}


//=============================================================================
// ** 吸附槽
//=============================================================================
//==============================
// * 吸附槽 - 定义
//==============================
function Drill_PAS_GamePicSlot() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 吸附槽 - 初始化
//==============================
Drill_PAS_GamePicSlot.prototype.initialize = function( data ) {
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	var data = this._drill_data;
	
	// > 默认值
	if( data['id'] == undefined ){ data['id'] = -1 };										//主体 - id
	if( data['x'] == undefined ){ data['x'] = 0 };											//主体 - 位置X
	if( data['y'] == undefined ){ data['y'] = 0 };											//主体 - 位置Y
	if( data['type'] == undefined ){ data['type'] = [] };									//主体 - 吸附类型
	if( data['essentialRange'] == undefined ){ data['essentialRange'] = 16 };				//主体 - 必然吸附范围
	if( data['commonRange'] == undefined ){ data['commonRange'] = 108 };					//主体 - 一般吸附范围
	
	// > 私有对象初始化
	this._drill_cur_time = 0;					//当前时间
}
//==============================
// * 吸附槽 - 帧刷新
//==============================
Drill_PAS_GamePicSlot.prototype.update = function() {
	var data = this._drill_data;
	
	// （暂无）
}
//==============================
// * 吸附槽 - 属性获取
//==============================
Drill_PAS_GamePicSlot.prototype.id = function(){ return this._drill_data['id']; };							//id
Drill_PAS_GamePicSlot.prototype.x = function(){ return this._drill_data['x']; };							//位置X
Drill_PAS_GamePicSlot.prototype.y = function(){ return this._drill_data['y']; };							//位置Y
Drill_PAS_GamePicSlot.prototype.type = function(){ return this._drill_data['type']; };						//吸附类型
Drill_PAS_GamePicSlot.prototype.essentialRange = function(){ return this._drill_data['essentialRange']; };	//必然吸附范围
Drill_PAS_GamePicSlot.prototype.commonRange = function(){ return this._drill_data['commonRange']; };		//一般吸附范围


//=============================================================================
// ** 吸附槽贴图（DEBUG用）
//=============================================================================
//==============================
// * 场景层 - 帧刷新
//==============================
var _drill_PAS_base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {	
	_drill_PAS_base_update.call(this);
	
	if( $gameTemp._Drill_PAS_showDebug == true ){
		$gameTemp._Drill_PAS_showDebug = false;
		
		// > 去除旧层
		if( this._drill_PAS_layer != undefined ){
			this.removeChild( this._drill_PAS_layer );
		}
		
		// > 刷新新层
		this._drill_PAS_layer = new Sprite();
		for( var i=0; i < $gameScreen._drill_PAS_slotTank.length; i++ ){
			var temp_slot = $gameScreen._drill_PAS_slotTank[i];
			if( temp_slot == null ){ continue; }
			var temp_sprite = this.drill_PAS_getDebugRange( temp_slot );
			this._drill_PAS_layer.addChild( temp_sprite );
		}
		this.addChild( this._drill_PAS_layer );
	}
}
//==============================
// * 场景层 - 生成sprite范围
//==============================
Spriteset_Base.prototype.drill_PAS_getDebugRange = function( temp_slot ) {	
	var e_r = temp_slot.essentialRange();
	var c_r = temp_slot.commonRange();
	var max_r = c_r;
	if( e_r > c_r ){ max_r = e_r; }
	
	var temp_sprite = new Sprite();
	var temp_bitmap = new Bitmap( max_r*2, max_r*2 );
	// > 常规范围
		context = temp_bitmap._context;
		context.save();
		context.beginPath();
		context.arc( max_r, max_r, c_r-1, 0, Math.PI * 2, false);
		context.strokeStyle = "#00ff00";
		context.stroke();
		context.closePath();
		context.restore();
		temp_bitmap._setDirty();
	// > 必要范围
		var context = temp_bitmap._context;
		context.save();
		context.beginPath();
		context.arc( max_r, max_r, e_r-1, 0, Math.PI * 2, false);
		context.strokeStyle = "#ffff00";
		context.stroke();
		context.closePath();
		context.restore();
		temp_bitmap._setDirty();
	temp_sprite.bitmap = temp_bitmap;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = temp_slot.x();
	temp_sprite.y = temp_slot.y();
	
	var fill_sprite = new Sprite();
	var fill_bitmap = new Bitmap( max_r*2, max_r*2 );
	// > 常规范围
	fill_bitmap.drawCircle(max_r,max_r,c_r-1,"#00ff00");
	// > 必要范围
	fill_bitmap.drawCircle(max_r,max_r,e_r-1,"#ffff00");
	fill_sprite.bitmap = fill_bitmap;
	fill_sprite.anchor.x = 0.5;
	fill_sprite.anchor.y = 0.5;
	fill_sprite.opacity = 50;
	temp_sprite.addChild(fill_sprite);
	
	return temp_sprite;
}


//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _drill_PAS_pic_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_drill_PAS_pic_initialize.call(this);
	this._drill_PAS = {};
	this._drill_PAS.adsorptionTypeList = [];	//吸附类型
	
	this._drill_PAS.adsorbState = "未吸附";		//过程 - 吸附状态（ 未吸附 / 正被吸附 / 已吸附 ）
	this._drill_PAS.lastSlot = -1;				//过程 - 上一个吸附着的槽
	this._drill_PAS.adsorbedSlot = -1;			//过程 - 吸附着的槽
	
	this._drill_PAS.lastPicX = 0;				//位置 - 正被吸附 - 开始吸附时的位置
	this._drill_PAS.lastPicY = 0;				//
	this._drill_PAS.targetX = 0;				//位置 - 正被吸附 - 目标吸附位置
	this._drill_PAS.targetY = 0;				//
	this._drill_PAS.cur_adsorbingX = 0;			//位置 - 正被吸附 - 吸附的偏移量
	this._drill_PAS.cur_adsorbingY = 0;			//
	this._drill_PAS.cur_time = 0;				//
	
	this._drill_PAS.adsorbed_x = 0;				//位置 - 吸附时的位置
	this._drill_PAS.adsorbed_y = 0;				//
	
}
//==============================
// * 图片 - 清理吸附
//==============================
Game_Picture.prototype.drill_PAS_clearAdsorb = function() {
	this._drill_PAS.adsorptionTypeList = [];
	
	this._drill_PAS.adsorbState = "未吸附";		
	this._drill_PAS.lastSlot = -1;				
	this._drill_PAS.adsorbedSlot = -1;			
	
	this._drill_PAS.lastPicX = 0;				
	this._drill_PAS.lastPicY = 0;				
	this._drill_PAS.targetX = 0;				
	this._drill_PAS.targetY = 0;				
	this._drill_PAS.cur_adsorbingX = 0;			
	this._drill_PAS.cur_adsorbingY = 0;			
	this._drill_PAS.cur_time = 0;				
	
	this._drill_PAS.adsorbed_x = 0;				
	this._drill_PAS.adsorbed_y = 0;				
	
}
//==============================
// * 图片 - 图片移除时
//==============================
var _drill_PAS_pic_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_drill_PAS_pic_erase.call(this);
	this.drill_PAS_clearAdsorb();
}
//==============================
// * 图片 - 帧刷新
//==============================
var _drill_PAS_pic_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_drill_PAS_pic_update.call(this);
	this.drill_PAS_updateAdsorptionCheck();		//吸附判定
	this.drill_PAS_updateAdsorptionMove();		//正被吸附的位移
}
//==============================
// * 帧刷新 - 未吸附 - 吸附判定
//==============================
Game_Picture.prototype.drill_PAS_updateAdsorptionCheck = function() {
	if( this.drill_PAS_hasAnyAdsorptionType() != true ){ return; }
	
	// > 必然吸附范围
	for( var i=0; i < $gameScreen._drill_PAS_slotTank.length; i++ ){
		var temp_slot = $gameScreen._drill_PAS_slotTank[i];
		if( temp_slot == null ){ continue; }
		if( this._drill_PAS.adsorbState != "未吸附" ){ continue; }		//未吸附状态才能吸附
		
		// > 获取图片实际位置（基础值 + 拖拽偏移的值 + 吸附偏移的值）
		var xx = this.x() + this.drill_MDP_getDraggingXOffset() + this.drill_PAS_getAdsorbXOffset();
		var yy = this.y() + this.drill_MDP_getDraggingYOffset() + this.drill_PAS_getAdsorbYOffset();

		// > 距离判定
		var dx = xx - temp_slot.x() ;
		var dy = yy - temp_slot.y() ;
		var dr = temp_slot.essentialRange();
		if( dx*dx + dy*dy > dr*dr ){ continue; }
		
		// > 类型判定
		if( this.drill_PAS_hasAdsorptionType( temp_slot.type() ) != true ){ continue; }
		
		// > 其他条件
		if( this._drill_MDP.isDragging == true && 						//（鼠标拖拽按住脱离槽时）
			this._drill_PAS.lastSlot == temp_slot.id() ){ continue; }
		
		this.drill_PAS_setBeingAdsorb( temp_slot );
	}
	
	// > 一般吸附范围
	for( var i=0; i < $gameScreen._drill_PAS_slotTank.length; i++ ){
		var temp_slot = $gameScreen._drill_PAS_slotTank[i];
		if( temp_slot == undefined ){ continue; }
		if( this._drill_PAS.adsorbState != "未吸附" ){ continue; }		//未吸附状态才能吸附
		
		// > 获取图片实际位置（基础值 + 拖拽偏移的值 + 吸附偏移的值）
		var xx = this.x() + this.drill_MDP_getDraggingXOffset() + this.drill_PAS_getAdsorbXOffset();
		var yy = this.y() + this.drill_MDP_getDraggingYOffset() + this.drill_PAS_getAdsorbYOffset();
		
		// > 距离判定
		var dx = xx - temp_slot.x() ;
		var dy = yy - temp_slot.y() ;
		var dr = temp_slot.commonRange();
		if( dx*dx + dy*dy > dr*dr ){ continue; }	
		
		// > 类型判定
		if( this.drill_PAS_hasAdsorptionType( temp_slot.type() ) != true ){ continue; }
		
		// > 其他条件
		if( this._drill_MDP.isDragging == true ){ continue; }			//正在拖拽时，不吸附
		
		this.drill_PAS_setBeingAdsorb( temp_slot );
	}
	
}
//==============================
// * 帧刷新 - 正被吸附 - 位移动画
//==============================
Game_Picture.prototype.drill_PAS_updateAdsorptionMove = function() {
	if( this._drill_PAS.adsorbState != "正被吸附" ){ return; }
	this._drill_PAS.cur_time += 1;
	
	// > 吸附移动（直接播放弹道结果即可）
	this._drill_PAS.cur_adsorbingX = this._drill_PAS['_drill_COBa_x'][ this._drill_PAS.cur_time ] ;
	this._drill_PAS.cur_adsorbingY = this._drill_PAS['_drill_COBa_y'][ this._drill_PAS.cur_time ] ;
	
	// > 切换已被吸附状态
	if( this._drill_PAS.cur_time >= DrillUp.g_PAS_adsorptTime ){
		var temp_slot = $gameScreen.drill_PAS_getSlot( this._drill_PAS.adsorbedSlot );	//以正在吸附的槽id为准
		this.drill_PAS_setIsAdsorbed( temp_slot );
	}
}
//==============================
// * 拖拽 - 刚好拖拽开始时
//==============================
var _drill_PAS_MDP_dragStarting = Game_Picture.prototype.drill_MDP_dragStarting;
Game_Picture.prototype.drill_MDP_dragStarting = function() {
	_drill_PAS_MDP_dragStarting.call(this);
	
	// > 已吸附 时，点击拖拽，表示要拖走
	var last_slot = this._drill_PAS.adsorbedSlot;
	if( last_slot != -1 && this._drill_PAS.adsorbState == "已吸附" ){
		this.drill_PAS_setNotAdsorbed();
		this._drill_PAS.lastSlot = last_slot;	//记录拖走时吸附的槽
	}
}
//==============================
// * 拖拽 - 刚好拖拽结束时
//==============================
var _drill_PAS_MDP_dragEnding = Game_Picture.prototype.drill_MDP_dragEnding;
Game_Picture.prototype.drill_MDP_dragEnding = function() {
	_drill_PAS_MDP_dragEnding.call(this);
	
	// > 松开拖拽，必然为 未吸附 状态
	this.drill_PAS_setNotAdsorbed();
}

//==============================
// * 图片 - 状态机 - 设置正被吸附
//==============================
Game_Picture.prototype.drill_PAS_setBeingAdsorb = function( temp_slot ) {
	if( this._drill_PAS.adsorbState == "正被吸附" ){ return; };
	
	// > 获取图片实际位置（基础值 + 拖拽偏移的值 + 吸附偏移累加值）
	var xx = this.x() + this.drill_MDP_getDraggingXOffset() + this.drill_PAS_getAdsorbXOffset();
	var yy = this.y() + this.drill_MDP_getDraggingYOffset() + this.drill_PAS_getAdsorbYOffset();
		
	// > 记录 正被吸附 的数据
	this._drill_PAS.lastPicX = xx ;
	this._drill_PAS.lastPicY = yy ;
	this._drill_PAS.targetX = temp_slot.x();	
	this._drill_PAS.targetY = temp_slot.y();	
	this._drill_PAS.cur_adsorbingX = 0;
	this._drill_PAS.cur_adsorbingY = 0;
	
	// > 切换状态机：正被吸附
	this._drill_PAS.adsorbState = "正被吸附";
	this._drill_PAS.lastSlot = -1;
	this._drill_PAS.adsorbedSlot = temp_slot.id();
	
	// > 关闭拖拽效果
	this._drill_MDP.isDragging = false;
	
	// > 两点式弹道
	var data = {};
	data['movementMode'] = "两点式";
	data['movementTime'] = DrillUp.g_PAS_adsorptTime;
	data['movementDelay']= 0;
	data['twoPointType'] = DrillUp.g_PAS_adsorptMoveType;
	data['twoPointDifferenceX'] = this._drill_PAS.targetX - this._drill_PAS.lastPicX ;
	data['twoPointDifferenceY'] = this._drill_PAS.targetY - this._drill_PAS.lastPicY ;
		
	// > 弹道初始化
	$gameTemp.drill_COBa_setBallisticsMove( data );						//初始化
	$gameTemp.drill_COBa_preBallisticsMove( this._drill_PAS, 0, 0, 0 );	//推演赋值（由于是偏移，原始位置为0,0，且将推演数组放 this._drill_PAS 中 ）
	this._drill_PAS.cur_time = 0;
	//alert( data['twoPointDifferenceY'] );
	//alert( this._drill_PAS['_drill_COBa_y'] );
}
//==============================
// * 图片 - 状态机 - 设置已被吸附
//==============================
Game_Picture.prototype.drill_PAS_setIsAdsorbed = function( temp_slot ) {
	if( this._drill_PAS.adsorbState == "已吸附" ){ return; };
	
	// > 吸附偏移记录
	//	（注意，被吸附后，一定在被吸附的槽位置，吸附偏移量 = 终点 - 起点 ）
	this._drill_PAS.adsorbed_x = temp_slot.x() - ( this.x() + this.drill_MDP_getDraggingXOffset() );
	this._drill_PAS.adsorbed_y = temp_slot.y() - ( this.y() + this.drill_MDP_getDraggingYOffset() );
	
	// > 切换： 已吸附
	this._drill_PAS.adsorbState = "已吸附";
	this._drill_PAS.lastSlot = -1;
	this._drill_PAS.adsorbedSlot = temp_slot.id();
	
}
//==============================
// * 图片 - 状态机 - 设置未吸附
//==============================
Game_Picture.prototype.drill_PAS_setNotAdsorbed = function() {
	if( this._drill_PAS.adsorbState == "未吸附" ){ return; };
	
	// > 切换： 未吸附
	this._drill_PAS.adsorbState = "未吸附";
	this._drill_PAS.lastSlot = -1;
	this._drill_PAS.adsorbedSlot = -1;
	
}
//==============================
// * 图片 - 获取吸附的偏移量X（接口）
//		
//			说明：任何情况下，吸附所产生的实际偏移量X。（用于定位吸附偏移位置）
//==============================
Game_Picture.prototype.drill_PAS_getAdsorbXOffset = function(){
	if( this._drill_PAS.adsorbState == "正被吸附" ){
		return this._drill_PAS.adsorbed_x + this._drill_PAS.cur_adsorbingX ;
	}
	return this._drill_PAS.adsorbed_x ;
}
//==============================
// * 图片 - 获取吸附的偏移量Y（接口）
//		
//			说明：任何情况下，吸附所产生的实际偏移量Y。（用于定位吸附偏移位置）
//==============================
Game_Picture.prototype.drill_PAS_getAdsorbYOffset = function(){
	if( this._drill_PAS.adsorbState == "正被吸附" ){
		return this._drill_PAS.adsorbed_y + this._drill_PAS.cur_adsorbingY ;
	}
	return this._drill_PAS.adsorbed_y ;
}


//=============================================================================
// ** 图片吸附类型
//=============================================================================
//==============================
// * 图片吸附类型 - 判断是否含吸附
//==============================
Game_Picture.prototype.drill_PAS_hasAnyAdsorptionType = function() {
	return this._drill_PAS.adsorptionTypeList.length > 0;
}
//==============================
// * 图片吸附类型 - 判断含有的吸附类型
//==============================
Game_Picture.prototype.drill_PAS_hasAdsorptionType = function( type_name ) {
	return this._drill_PAS.adsorptionTypeList.contains(type_name);
}
//==============================
// * 图片吸附类型 - 添加
//==============================
Game_Picture.prototype.drill_PAS_addAdsorptionType = function( type_name ){
	if( this._drill_PAS.adsorptionTypeList.contains(type_name) ){ return ; }
	this._drill_PAS.adsorptionTypeList.push( type_name );
}
//==============================
// * 图片吸附类型 - 去除
//==============================
Game_Picture.prototype.drill_PAS_removeAdsorptionType = function( type_name ){
	// > 断开连接
	if( this._drill_PAS.adsorbedSlot != -1 ){
		var temp_slot = $gameScreen.drill_PAS_getSlot( this._drill_PAS.adsorbedSlot );
		if( temp_slot.type().contains(type_name) ){
			this.drill_PAS_setNotAdsorbed();
		};
	}
	
	// > 从数组中去除
	for( var i=0; i < this._drill_PAS.adsorptionTypeList.length; i++ ){
		if( this._drill_PAS.adsorptionTypeList[i] == type_name ){
			this._drill_PAS.adsorptionTypeList.splice(i,1);
			break;
		}
	}
}
//==============================
// * 图片吸附类型 - 去除全部
//==============================
Game_Picture.prototype.drill_PAS_removeAllAdsorptionType = function(){
	// > 断开连接
	if( this._drill_PAS.adsorbedSlot != -1 ){
		this.drill_PAS_setNotAdsorbed();
	}
	
	// > 从数组中去除
	for( var i=0; i < this._drill_PAS.adsorptionTypeList.length; i++ ){
		this._drill_PAS.adsorptionTypeList.splice(i,1);
	}
}



//=============================================================================
// ** 图片贴图
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PAS_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    _drill_PAS_sp_initialize.call(this,pictureId);
	// ...暂无
}
//==============================
// * 图片贴图 - 帧刷新
//==============================
var _Drill_PAS_sp_update2 = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PAS_sp_update2.call(this);
	if( this.picture() ){
		this.update_PAS_position();			//刷新贴图位置
	}
};
//==============================
// * 帧刷新 - 刷新吸附贴图位置
//==============================
Sprite_Picture.prototype.update_PAS_position = function() {
	this.x += this.picture().drill_PAS_getAdsorbXOffset();		//吸附产生的偏移量X
	this.y += this.picture().drill_PAS_getAdsorbYOffset();		//吸附产生的偏移量Y
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureAdsorptionSlot = false;
		alert(
			"【Drill_PictureAdsorptionSlot.js 图片 - 图片吸附槽】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心" + 
			"\n- Drill_MouseDragPicture 鼠标-可拖拽的图片"
		);
}

