//=============================================================================
// Drill_PictureActionSequence.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        图片 - GIF动画序列
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
 *   (2.如果你配置的图片数量特别多，那么必然会造成显示延迟。
 *      图片在执行"设置动画序列"后才会全加载，你可以提前把图片
 *      设为透明放上并设置动画序列。
 * 设计：
 *   (1.动画序列在图片建立后，不能立即设置动画序列，不然会使得动画序列
 *      找不到对象进行初始化。这时应该等1帧再设置。
 *      具体去看看 "1.系统 > 大家族-GIF动画序列.docx" 的 配置方法。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 动画序列
 * 你需要通过下面插件指令来激活动画序列：
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 设置动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 图片变量[1] : 设置动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 批量图片[10,11] : 设置动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 批量图片变量[21,22] : 设置动画序列 : 动画序列[1]
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 设置动画序列 : 动画序列[1]
 * 插件指令：>图片动画序列 : 图片[1] : 关闭动画序列
 * 
 * 1.前半部分（图片[1]）和 后半部分（设置动画序列 : 动画序列[1]）
 *   的参数可以随意组合。一共有4*2种组合方式。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 动作元与状态元
 * 你需要通过下面插件指令来操作动画序列：
 * 
 * 插件指令：>图片动画序列 : 图片[1] : 播放状态节点 : 小爱丽丝拍裙子流程
 * 插件指令：>图片动画序列 : 图片[1] : 播放简单状态元集合 : 集合[小爱丽丝静止1,小爱丽丝静止2]
 * 插件指令：>图片动画序列 : 图片[1] : 播放默认的状态元集合
 * 插件指令：>图片动画序列 : 图片[1] : 播放动作 : 动作元[小爱丽丝发火]
 * 插件指令：>图片动画序列 : 图片[1] : 立即停止动作
 * 
 * 1.必须设置动画序列后，才能使用上述操作，插件指令对当前动画序列进行操作。
 *   如果动画序列中，没有指定的 状态元和动作元，则没有效果。
 * 2.组合方式与前面一样，一共有4*5种组合方式。
 * 3."集合[]"中，填入 状态元名 ，填入多个表示随机播放的几个状态。
 *   "动作元[]"中，填入 动作元名 ，填入后只播放一次动作；
 *   如果动作元优先级不够，则没有效果。
 * 4.插件1.1之前版本的状态元不会立刻改变，新版本的切换都为立刻改变。
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
 * 测试方法：   在对话管理层设置3张图片，加载45帧动画序列。
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
 * 
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
//		★性能测试因素	对话管理层
//		★性能测试消耗	12.60ms（update） 131.05ms（载入动画序列时）
//		★最坏情况		大量图片，大量动画序列。
//		★备注			加载一个45帧的动画序列时，垃圾电脑出现了明显的卡顿，但是后期恢复了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图片动画序列：
//				->动画序列
//					->数据绑定
//					->对象绑定
//				->动作元
//				->状态元
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
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureActionSequence = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureActionSequence');
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfActionSequence ){
	
	
//=============================================================================
// * 强制更新要求
//=============================================================================
if( DrillUp.drill_COAS_getSequenceData == undefined ){
	alert(
		"【Drill_PictureActionSequence.js 图片 - GIF动画序列】\n"+
		"GIF动画序列核心 插件版本过低，请及时更新核心插件，以及所有动画序列相关子插件。"
	);
};
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_PASe_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_PASe_pluginCommand.call(this, command, args);
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

		
		/*-----------------关闭动画序列------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "关闭动画序列" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_removeActionSequence();
					}
				}
			}
		}
		/*-----------------设置动画序列------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "设置动画序列" ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setActionSequence( Number(temp1)-1 );
					}
				}
			}
		}
			
		/*-----------------动画序列操作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "播放默认的状态元集合" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setStateNodeDefault();
					}
				}
			}
			if( type == "立即停止动作" ){
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
			if( type == "播放状态节点" ){
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setStateNode( temp1 );
					}
				}
			}
			if( type == "播放简单状态元集合" || type == "修改状态元集合" || type == "修改集合" ){
				temp1 = temp1.replace("集合[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PASe_setSimpleStateNode( temp1.split(",") );
					}
				}
			}
			if( type == "播放动作" ){
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
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PASe_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureActionSequence.js 图片 - GIF动画序列】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _Drill_PASe_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_Drill_PASe_c_initialize.call(this);	
	
	this._Drill_PASe_enabled = false;				//开关
	this._Drill_PASe_controller = null;				//动画序列数据
	
	this._Drill_PASe_commandInit = false;			//指令-对象初始化开关
	this._Drill_PASe_commandDestroy = false;		//指令-对象销毁开关
}
//==============================
// * 图片 - 帧刷新
//==============================
var _Drill_PASe_c_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_Drill_PASe_c_update.call(this);	
	
	// > 数据帧刷新
	if( this._Drill_PASe_controller != undefined ){
		this._Drill_PASe_controller.update();
	}
}
//==============================
// * 图片 - 销毁时
//==============================
var _Drill_PASe_c_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_Drill_PASe_c_erase.call(this);	
	this._Drill_PASe_commandDestroy = true;		//强制执行销毁指令
}

//==============================
// * 图片 - 创建动画序列
//==============================
Game_Picture.prototype.drill_PASe_setActionSequence = function( as_id ){
	this._Drill_PASe_enabled = true;
	this._Drill_PASe_controller = new Drill_COAS_MainController( DrillUp.g_COAS_list[ as_id ] );
	this._Drill_PASe_commandInit = true;
}
//==============================
// * 图片 - 销毁动画序列
//==============================
Game_Picture.prototype.drill_PASe_removeActionSequence = function(){
	this._Drill_PASe_enabled = false;
	this._Drill_PASe_controller = null;
	this._Drill_PASe_commandDestroy = true;
}
//==============================
// * 动画序列 - 播放默认的状态元集合（开放函数）
//
//			说明：	直接调用核心提供的接口即可，
//					注意，不要为了简化，让插件指令直接去操作COAS核心函数。
//==============================
Game_Picture.prototype.drill_PASe_setStateNodeDefault = function(){
	this._Drill_PASe_controller.drill_COAS_setStateNodeDefault();
}
//==============================
// * 动画序列 - 播放状态节点（开放函数）
//==============================
Game_Picture.prototype.drill_PASe_setStateNode = function( node_name ){
	this._Drill_PASe_controller.drill_COAS_setStateNode( node_name );
}
//==============================
// * 动画序列 - 播放简易状态节点（开放函数）
//==============================
Game_Picture.prototype.drill_PASe_setSimpleStateNode = function( state_nameList ){
	this._Drill_PASe_controller.drill_COAS_setSimpleStateNode( state_nameList );
}
//==============================
// * 动画序列 - 播放动作元（开放函数）
//==============================
Game_Picture.prototype.drill_PASe_setAct = function( act_name ){
	this._Drill_PASe_controller.drill_COAS_setAct( act_name );
}
//==============================
// * 动画序列 - 立刻终止动作（开放函数）
//==============================
Game_Picture.prototype.drill_PASe_stopAct = function(){
	this._Drill_PASe_controller.drill_COAS_stopAct();
}


//=============================================================================
// ** 图片贴图
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PASe_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
    _drill_PASe_sp_initialize.call( this,pictureId );
	
	this._drill_PASe_decorator = null;	//动画序列对象
}

//==============================
// * 图片贴图 - 帧刷新
//==============================
var _Drill_PASe_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PASe_sp_update.call(this);	
	
	if(!this.picture() ){ return; }
	
	// > 指令 - 初始化动画序列对象 
	if( this.picture()._Drill_PASe_commandInit == true ){
		this.picture()._Drill_PASe_commandInit = false;	
		
		if( this._drill_PASe_decorator != null ){		//（销毁旧对象）
			this._drill_PASe_decorator.drill_COAS_destroy(); 
		}
		this._drill_PASe_decorator = new Drill_COAS_SpriteDecorator( this, this.picture()._Drill_PASe_controller );
	}
	
	// > 跨地图，贴图销毁时重建（要在初始化指令后面，防止new执行后立即销毁）
	if( this.picture()._Drill_PASe_enabled == true &&
		this.picture()._Drill_PASe_controller != null &&
		this._drill_PASe_decorator == null ){
		
		this._drill_PASe_decorator = new Drill_COAS_SpriteDecorator( this, this.picture()._Drill_PASe_controller );
	}
	
	// > 动画序列对象 帧刷新
	if( this.picture()._Drill_PASe_enabled == true &&
		this._drill_PASe_decorator != null ){
		this._drill_PASe_decorator.update();
	} 
	
	// > 指令 - 动画序列对象 销毁
	if( this.picture()._Drill_PASe_commandDestroy == true ){
		this.picture()._Drill_PASe_commandDestroy = false;	
		if( this._drill_PASe_decorator != null ){		//（销毁旧对象）
			this._drill_PASe_decorator.drill_COAS_destroy(); 
		}
	}
};
//==============================
// * 图片贴图 - 获取bitmap资源对象
//==============================
var _Drill_PASe_sp_loadBitmap = Sprite_Picture.prototype.loadBitmap;
Sprite_Picture.prototype.loadBitmap = function() {
    _Drill_PASe_sp_loadBitmap.call( this );
    if( this._drill_PASe_decorator != null ){		//（资源变化时，要同步到装饰器中，确保能正常还原资源图片）
		this._drill_PASe_decorator.drill_COAS_parentBitmapChanged( this, this.bitmap ); 
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureActionSequence = false;
		alert(
			"【Drill_PictureActionSequence.js 图片 - GIF动画序列】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfActionSequence  系统-GIF动画序列核心"
		);
}


