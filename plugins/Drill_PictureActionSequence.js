//=============================================================================
// Drill_PictureActionSequence.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        图片 - GIF动画序列
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureActionSequence +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以使得 图片 具有动画序列功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfActionSequence    系统-GIF动画序列核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.更多详细内容，去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * 细节：
 *   (1.图片的 GIF动画序列 可以与消失/显现/持续动作效果叠加。
 *   (2.如果你配置的动画帧数量特别多，那么在进入游戏后显示会出现闪图，
 *      你可以勾选 预加载 的设置，防止设置动画序列后闪图。
 * 小工具：
 *   (1.防止你看不见：
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *   (2.小工具能导入 行走图、序列大图、GIF文件 等资源，
 *      然后小工具能将配置转移到插件 GIF动画序列核心 中。
 * 设计：
 *   (1.动画序列在图片建立后，不能立即设置动画序列，不然会使得动画序列
 *      找不到对象进行初始化。这时应该等1帧再设置。
 *      具体去看看 "1.系统 > 大家族-GIF动画序列.docx" 的 配置方法。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 动画序列
 * 你需要通过下面插件指令来激活动画序列：
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 创建动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 图片变量[1] : 创建动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 批量图片[10,11] : 创建动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 批量图片变量[21,22] : 创建动画序列 : 动画序列[1]
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 创建动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 图片[1] : 销毁动画序列
 * 
 * 1.前半部分（图片[1]）和 后半部分（创建动画序列 : 动画序列[1]）
 *   的参数可以随意组合。一共有4*2种组合方式。
 * 2.注意，动画序列可以重复创建，但是不能放入到并行事件中反复执行。
 *   这样会导致动画序列永远在创建，且保持在第一帧的播放状态，还会不停地闪。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 播放
 * 你需要通过下面插件指令来操作动画序列：
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 播放默认的状态元集合
 * 插件指令：>图片动画序列 : 图片[1] : 播放简单状态元集合 : 集合[小爱丽丝静止1,小爱丽丝静止2]
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 播放状态节点 : 状态节点[小爱丽丝拍裙子流程]
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 播放动作元 : 动作元[小爱丽丝发火]
 * 插件指令：>图片动画序列 : 图片[1] : 立即停止动作元
 * 
 * 1.前半部分和后半部分组合方式与前面一样，一共有4*5种组合方式。
 * 2.必须设置动画序列后，才能使用上述操作。
 *   上述指令对应了 小工具 放映区 的播放功能。
 * 3."播放简单状态元集合"中，填入 状态元名称，若找不到对应名称则插件指令没有效果。
 *   "播放状态节点"中，填入 状态节点名称，若找不到对应名称则插件指令没有效果。
 *   "播放动作元"中，填入 动作元名称，若找不到对应名称则插件指令没有效果。
 * 4.注意，如果 动作元 的优先级低于当前播放的 状态元/状态节点/动作元，
 *   则插件指令没有效果。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在图片管理层设置3张图片，加载45帧动画序列。
 * 测试结果：   200个事件的地图中，平均消耗为：【17.76ms】
 *              100个事件的地图中，平均消耗为：【13.94ms】
 *               50个事件的地图中，平均消耗为：【12.60ms】
 * 测试结果2：  战斗界面中，平均消耗为：【21.21ms】
 * 测试结果3：  动画序列载入时，3秒内消耗：【131.05ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于图片加载需要很多时间，加载45帧的动画序列时，出现了明显
 *   的卡顿，但是后期恢复了。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件指令注释。
 * [v1.2]
 * 改进了动画序列的贴图控制。
 * [v1.3]
 * 进一步优化了动画序列底层，该插件重新兼容。
 * [v1.4]
 * 优化了动画序列存储底层。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PASe（Picture_Action_Sequence）
//		临时全局变量	无
//		临时局部变量	this._drill_PASe_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	12.60ms（update） 131.05ms（载入动画序列时）
//		★最坏情况		大量图片，大量动画序列。
//		★备注			加载一个45帧的动画序列时，垃圾电脑出现了明显的卡顿，但是后期恢复了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆图片控制
//				->绑定
//					> 初始化
//					> 帧刷新
//					> 消除图片
//					> 消除图片（command235）
//				->创建 动画序列控制器
//				->销毁 动画序列控制器
//				->播放
//					> 播放默认的状态元集合（开放函数）
//					> 播放简单状态元集合（开放函数）
//					> 播放状态节点（开放函数）
//					> 播放动作元（开放函数）
//					> 立即停止动作元（开放函数）
//			->☆图片贴图控制
//				->创建 动画序列贴图
//				->销毁 动画序列贴图
//				->贴图指令
//				->获取bitmap资源对象
//
//
//		★家谱：
//			大家族-GIF动画序列
//		
//		★脚本文档：
//			1.系统 > 大家族-GIF动画序列（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件将 核心插件 的接口进行了一一对应。
//			  只修改贴图的 bitmap，其它都不影响。
//			2.注意，数据（data）和 贴图装饰器（decorator）是分离的。
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
	DrillUp.g_PASe_PluginTip_curName = "Drill_PictureActionSequence.js 图片-GIF动画序列";
	DrillUp.g_PASe_PluginTip_baseList = ["Drill_CoreOfActionSequence.js 系统-GIF动画序列核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PASe_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PASe_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PASe_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PASe_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PASe_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PASe_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PASe_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新要求
	//==============================
	DrillUp.drill_PASe_getPluginTip_NeedUpdate = function(){
		return "【" + DrillUp.g_APEx_PluginTip_curName + "】\n GIF动画序列核心 插件版本过低，请及时更新核心插件，以及所有动画序列相关子插件。";
	};
	
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureActionSequence = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureActionSequence');
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfActionSequence ){
	
	
//==============================
// * 强制更新要求
//==============================
if( DrillUp.drill_COAS_getSequenceData_ById == undefined ){
	alert( DrillUp.drill_PASe_getPluginTip_NeedUpdate() );
};
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_PASe_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PASe_pluginCommand.call(this, command, args);
	if( command === ">图片动画序列" ){ 
	
		/*-----------------对象组获取------------------*/
		var pics = null;			// 图片对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( pics == null && unit.indexOf("批量图片[") != -1 ){
				unit = unit.replace("批量图片[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PASe_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PASe_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PASe_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PASe_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		// > 透明度检查（不要检查）
		//if( pics != null ){
		//	var temp_tank = [];
		//	for( var k=0; k < pics.length; k++ ){
		//		if( pics[k].opacity() != 0 ){
		//			temp_tank.push( pics[k] );
		//		}
		//	}
		//	pics = temp_tank;
		//}

		
		/*-----------------销毁动画序列------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "销毁动画序列" || type == "关闭动画序列" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_removeActionSequence();
					}
				}
			}
		}
		/*-----------------创建动画序列------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "创建动画序列" || type == "设置动画序列" ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setActionSequence( Number(temp1)-1 );
					}
				}
			}
		}
			
		/*-----------------动画序列 操作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "播放默认的状态元集合" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setStateNodeDefault();
					}
				}
			}
			if( type == "立即停止动作元" || type == "立即停止动作" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_stopAct();
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "播放简单状态元集合" || type == "修改状态元集合" || type == "修改集合" ){
				temp1 = temp1.replace("集合[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setSimpleStateNode( temp1.split(",") );
					}
				}
			}
			if( type == "播放状态节点" ){
				temp1 = temp1.replace("状态节点[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setStateNode( temp1 );
					}
				}
			}
			if( type == "播放动作元" || type == "播放动作" ){
				temp1 = temp1.replace("动作元[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setAct( temp1 );
					}
				}
			}
		}
	}
		
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PASe_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PASe_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};



//=============================================================================
// ** ☆图片控制
//
//			说明：	> 此模块专门控制 动画序列控制器 绑定到图片数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片 - 初始化
//
//			说明：	> 图片数据 存放于 Game_Screen 的 _pictures 参数中，非长期存在，且随时会被移除。
//==============================
var _drill_PASe_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_drill_PASe_c_initialize.call(this);
	this._drill_PASe_controller = undefined;				//动画序列控制器（对象）
	this._drill_PASe_keepDecoratorNull = undefined;			//贴图销毁标记（布尔）
}
//==============================
// * 图片 - 帧刷新
//==============================
var _drill_PASe_c_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_drill_PASe_c_update.call(this);	
	
	// > 帧刷新控制器
	if( this._drill_PASe_controller != undefined ){
		this._drill_PASe_controller.update();
	}
}
//==============================
// * 图片 - 消除图片
//==============================
//var _drill_PASe_c_erase = Game_Picture.prototype.erase;
//Game_Picture.prototype.erase = function() {
//	_drill_PASe_c_erase.call(this);	
//	//（不操作）
//	//（见Sprite_Picture.prototype.update，贴图在找不到数据时，会立即销毁贴图）
//}
//==============================
// * 图片 - 消除图片（command235）
//==============================
//var _drill_PASe_p_erasePicture = Game_Screen.prototype.erasePicture;
//Game_Screen.prototype.erasePicture = function( pictureId ){
//    var realPictureId = this.realPictureId(pictureId);
//	var picture = this._pictures[realPictureId];
//	if( picture != undefined ){
//		//（不操作）
//		//（见Sprite_Picture.prototype.update，贴图在找不到数据时，会立即销毁贴图）
//	}
//	_drill_PASe_p_erasePicture.call( this, pictureId );
//}

//==============================
// * 图片 - 创建 动画序列控制器
//
//			说明：	> 动画序列可以重复创建。
//==============================
Game_Picture.prototype.drill_PASe_setActionSequence = function( as_id ){
	if( this._drill_PASe_controller == undefined ){
		this._drill_PASe_controller = new Drill_COAS_MainController( as_id );
	}else{
		this._drill_PASe_controller.drill_controllerMain_resetData( as_id );
	}
	this._drill_PASe_keepDecoratorNull = undefined;
}
//==============================
// * 图片 - 销毁 动画序列控制器
//==============================
Game_Picture.prototype.drill_PASe_removeActionSequence = function(){
	this._drill_PASe_controller = undefined;
	this._drill_PASe_keepDecoratorNull = true;
}

//==============================
// * 播放 - 播放默认的状态元集合（开放函数）
//
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//==============================
Game_Picture.prototype.drill_PASe_setStateNodeDefault = function(){
	this._drill_PASe_controller.drill_COAS_setStateNodeDefault();
}
//==============================
// * 播放 - 播放简单状态元集合（开放函数）
//
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//==============================
Game_Picture.prototype.drill_PASe_setSimpleStateNode = function( state_nameList ){
	this._drill_PASe_controller.drill_COAS_setSimpleStateNode( state_nameList );
}
//==============================
// * 播放 - 播放状态节点（开放函数）
//
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//==============================
Game_Picture.prototype.drill_PASe_setStateNode = function( node_name ){
	this._drill_PASe_controller.drill_COAS_setStateNode( node_name );
}
//==============================
// * 播放 - 播放动作元（开放函数）
//==============================
Game_Picture.prototype.drill_PASe_setAct = function( act_name ){
	this._drill_PASe_controller.drill_COAS_setAct( act_name );
}
//==============================
// * 播放 - 立即停止动作元（开放函数）
//==============================
Game_Picture.prototype.drill_PASe_stopAct = function(){
	this._drill_PASe_controller.drill_COAS_stopAct();
}


//=============================================================================
// ** ☆图片贴图控制
//
//			说明：	> 此模块专门控制 动画序列控制器 配置到图片贴图。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PASe_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
    _drill_PASe_sp_initialize.call( this,pictureId );
	this._drill_PASe_decorator = null;					//动画序列 贴图
	this._drill_PASe_decoratorCreateSerial = -1;		//动画序列 贴图序列号
}
//==============================
// * 图片贴图 - 创建 动画序列贴图
//
//			说明：	> 此函数可以在帧刷新中反复执行。只在 空贴图 的时候才创建。
//==============================
Sprite_Picture.prototype.drill_PASe_createDecorator = function(){
	var picture = this.picture();
	if( picture == null ){ return; }
	if( picture._drill_PASe_controller == null ){ return; }
	if( this._drill_PASe_decorator == null ){
		this._drill_PASe_decorator = new Drill_COAS_SpriteDecorator( this, picture._drill_PASe_controller );
	}
}
//==============================
// * 图片贴图 - 销毁 动画序列贴图
//
//			说明：	> 此函数可以在帧刷新中反复执行。只在 非空贴图 的时候才销毁。
//==============================
Sprite_Picture.prototype.drill_PASe_destroyDecorator = function(){
	if( this._drill_PASe_decorator != null ){
		this._drill_PASe_decorator.drill_spriteMain_destroy();	//（执行销毁，确保还原贴图）
		this._drill_PASe_decorator = null;						//（置空）
	}
}
//==============================
// * 图片贴图 - 帧刷新绑定
//==============================
var _drill_PASe_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	this.drill_PASe_updateDecoratorCreate();	//帧刷新 - 创建贴图
	this.drill_PASe_updateDecoratorDestroy();	//帧刷新 - 销毁贴图
	this.drill_PASe_updateDecorator();			//帧刷新 - 贴图
	
	// > 原函数
	_drill_PASe_sp_update.call(this);
};
//==============================
// * 图片贴图 - 帧刷新 - 创建贴图
//==============================
Sprite_Picture.prototype.drill_PASe_updateDecoratorCreate = function() {
	var picture = this.picture();
	if( picture == undefined ){ return; }
	
	// > 贴图销毁标记 开启时，不再创建
	if( picture._drill_PASe_keepDecoratorNull == true ){ return; }
	
	// > 控制器序列号变化时，重建贴图
	if( picture._drill_PASe_controller != undefined ){
		if( this._drill_PASe_decoratorCreateSerial != picture._drill_PASe_controller._drill_controllerSerial ){
			this._drill_PASe_decoratorCreateSerial =  picture._drill_PASe_controller._drill_controllerSerial;
			this.drill_PASe_destroyDecorator();
			this.drill_PASe_createDecorator();
		}
	}
	
	// > 有控制器时，创建贴图
	if( picture._drill_PASe_controller != undefined ){
		this.drill_PASe_createDecorator();
	}
}
//==============================
// * 图片贴图 - 帧刷新 - 销毁贴图
//==============================
Sprite_Picture.prototype.drill_PASe_updateDecoratorDestroy = function() {
	var picture = this.picture();
	if( picture == undefined ){
		this.drill_PASe_destroyDecorator();		//（找不到数据时，立即销毁）
		return;
	}
	
	// > 贴图销毁标记（数据存在时，仍然销毁贴图）
	if( picture._drill_PASe_keepDecoratorNull == true ){
		this.drill_PASe_destroyDecorator();
	}
}
//==============================
// * 图片贴图 - 帧刷新 - 贴图
//==============================
Sprite_Picture.prototype.drill_PASe_updateDecorator = function() {
	if( this._drill_PASe_decorator != null ){
		this._drill_PASe_decorator.update();
	}
}

//==============================
// * 图片贴图 - 获取bitmap资源对象
//==============================
var _drill_PASe_sp_loadBitmap = Sprite_Picture.prototype.loadBitmap;
Sprite_Picture.prototype.loadBitmap = function() {
    _drill_PASe_sp_loadBitmap.call( this );
    if( this._drill_PASe_decorator != null ){		//（资源变化时，要同步到装饰器中，确保能正常还原资源图片）
		this._drill_PASe_decorator.drill_COAS_parentBitmapChanged( this, this.bitmap ); 
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureActionSequence = false;
		var pluginTip = DrillUp.drill_PASe_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


