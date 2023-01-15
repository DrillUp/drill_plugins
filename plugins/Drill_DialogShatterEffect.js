//=============================================================================
// Drill_DialogShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        对话框 - 方块粉碎效果
 * @author Drill_up
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_DialogShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得对话框能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.3及以上版本★★
 * 可作用于：
 *   - Drill_DialogNameBox          对话框-姓名框窗口
 *     使得 姓名框窗口 也能实现方块粉碎效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于对话框内容贴图。
 * 2.想要更多了解方块粉碎，去看看 "1.系统 > 大家族-方块粉碎.docx"。
 * 细节:
 *   (1.对话内容粉碎后，会一直保持粉碎的状态。跨越多个对话。
 *      切换菜单可以使得对话内容复原。
 *   (2.因为对话框实体只有一个，所以粉碎效果也只有一个实体。
 *      进入下一对话时，不可能看得到上一次对话的碎片。
 * 指令时差：
 *   (1.图解可以去看看 "1.系统 > 大家族-方块粉碎.docx"。
 *   (2.在对话框播放文字时，插件指令是不能执行的。
 *      所以，你必须在文字播放前，预备执行插件指令。
 *   (3.粉碎的插件指令最好 紧贴 对话指令。如果不紧贴，
 *      "延迟[0]"的效果会提早生效。要注意延迟时间长一点。
 *   (4.你需要考虑对话时内容粉碎的时机，可以使用等待字符"\|"或
 *      "\."来限制玩家不停地按确定键情况。避免粉碎指令执行不到。
 *   (5.在事件页的对话完全结束后，要记得执行复原指令。
 *      防止在进行其他对话时，碎片效果仍在，对话内容看不见。
 * 设计:
 *   (1.你可以使用对话框粉碎，来"折磨"那些阅读速度太慢的玩家。
 *      如果看的太慢，选项和说明文字都会被粉碎。
 *      但是注意，如果你使用了 窗口字符块 ，字符块不能播放粉碎
 *      效果，而是直接消失。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面的插件指令，实现延迟粉碎效果：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[60] : 方块粉碎[15]
 * 插件指令：>方块粉碎效果 : 选择框内容 : 延迟[60] : 方块粉碎[15]
 * 插件指令：>方块粉碎效果 : 姓名框内容 : 延迟[60] : 方块粉碎[15]
 * 
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[60] : 方块粉碎[15]
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[60] : 方块反转粉碎[15]
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[80] : 立刻复原
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[80] : 暂停播放
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[80] : 继续播放
 * 插件指令：>方块粉碎效果 : 对话框内容 : 立刻复原
 * 插件指令：>方块粉碎效果 : 对话框内容 : 暂停播放
 * 插件指令：>方块粉碎效果 : 对话框内容 : 继续播放
 * 
 * 1.在对话框播放文字时，插件指令无法立即执行。
 *   所以，你必须在文字播放前，预备执行插件指令。
 * 2.插件指令的 前半部分(对话框内容)和后半部分(延迟[60] : 方块粉碎[15])
 *   的参数可以随意组合。一共有3*8种组合方式。
 * 3."延迟[60]"表示对话开始后，粉碎延迟的时间。单位帧，1秒60帧。
 *   "方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 *   如果"立刻复原"等指令不写"延迟[]"，则表示立即执行。
 * 4.粉碎背景可以有两个过程，先反转拼合在一起，然后破碎。
 *   以此可以制作中间的过渡效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改碎片的消失设置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 设回默认
 * 
 * 1."设回默认"表示设置为当前当前配置的默认的消失方式。
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
 * 测试方法：   在各个管理层中播放对话的粉碎效果。
 * 测试结果：   战斗界面中，平均消耗为：【37.24ms】
 *              200个事件的图片中，平均消耗为：【50.62ms】
 *              100个事件的图片中，平均消耗为：【44.06ms】
 *               50个事件的图片中，平均消耗为：【39.18ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后图片实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.该插件只作用于三个实体：对话框、选择框、姓名框。不是批量的，所以可能
 *   消耗相对比较小。另外对话执行时，部分插件处于暂停状态，可能也使得负担
 *   没有那么大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了部分插件注释内容。
 * [v1.2]
 * 修改了与核心的部分兼容设置。
 * [v1.3]
 * 修复了战斗界面对话框不能粉碎的bug。
 * [v1.4]
 * 优化了对 姓名框窗口 的兼容性。
 * [v1.5]
 * 大幅度优化了结构，支持了 暂停播放和继续播放 功能。
 * [v1.6]
 * 修复了保存后，对话框不可见的bug。
 * [v1.7]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param 默认图片碎片消失方式
 * @type select
 * @option 不消失
 * @value 不消失
 * @option 线性消失
 * @value 线性消失
 * @option 等一半时间后线性消失
 * @value 等一半时间后线性消失
 * @desc 碎片消失的方式。
 * @default 线性消失
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSE（Dialog_Shatter_Effect）
//		临时全局变量	DrillUp.g_DSE_xxx
//		临时局部变量	this._drill_DSE_xxx
//		存储数据变量	$gameMap._drill_DSE.xx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层看粉碎效果
//		★性能测试消耗	12.33ms  26.85ms
//		★最坏情况		粉碎分割的数量特别多。
//		★备注			测的结果有些小，可能是对话时，其他功能暂停工作造成的吧。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图片方块粉碎：
//				->延迟插件指令
//				->粉碎配置
//					->绑定控制器
//					->绑定贴图
//					->贴图框架标记
//					->地图界面/战斗界面 支持
//				->贴图获取
//					->对话框贴图
//					->选择框贴图
//					->姓名框贴图（Yep）
//					->姓名框贴图（Drill）
//
//		★必要注意事项：
//			1.该插件的 父贴图隐藏 方法为：this.texture.frame = Rectangle.emptyRectangle;
//			  还原时只要 _refresh 即可。
//			  注意，不要用 setFrame ，会影响贴图中的 this._realFrame 的缓存参数。（绕开这个参数）
//			
//		★其它说明细节：
//			1.窗口只有一个，但是有三种类型，配置起来非常复杂冗余。
//			  之前想过窗口框架背景也粉碎，但是框架有外框架和背景框架两种，bitmap又是不稳定的状态。
//			  为了防止意义不大的代码越写越多，背景粉碎的功能就不加了。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogShatterEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSE_opacityType = String(DrillUp.parameters['默认图片碎片消失方式'] || "线性消失");	
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
//==============================
// * 插件指令 - 执行
//==============================
var _Drill_DSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_DSE_pluginCommand.call(this, command, args);	
	if( command === ">方块粉碎效果" ){	
		var commandData = {};
		commandData['command'] = command;
		commandData['args'] = args;
		commandData['delay'] = 0;
		commandData['eventId'] = this._eventId;
		if( args.length >= 4 ){
			var temp1 = String(args[3]);
			if( temp1.indexOf("延迟[") != -1 ){
				temp1 = temp1.replace("延迟[","");
				temp1 = temp1.replace("]","");
				commandData['delay'] = Number( temp1 );
			}
		}
		$gameSystem._drill_DSE_delayCommandTank.unshift( commandData );
	}
}

//=============================================================================
// ** 延迟插件指令
//=============================================================================
//==============================
// * 延迟插件指令 - 帧刷新
//==============================
Game_System.prototype.drill_DSE_updateCommandDelay = function() {
	
	// > 时间-1
	for( var i = 0; i < this._drill_DSE_delayCommandTank.length; i++ ){
		var commandData = this._drill_DSE_delayCommandTank[i];
		commandData['delay'] -= 1;
	}
	
	// > 执行指令
	for( var i = this._drill_DSE_delayCommandTank.length-1; i >= 0; i-- ){
		var commandData = this._drill_DSE_delayCommandTank[i];
		if( commandData['delay'] <= 0 ){
			this._drill_DSE_delayCommandTank.splice( i,1 );
			this.drill_DSE_delayPluginCommand( commandData );
		}
	}
}
//==============================
// * 延迟插件指令 - 延迟执行
//==============================
Game_System.prototype.drill_DSE_delayPluginCommand = function( commandData ){
	var args = commandData['args'];
	if( args.length == 6 ){		// >方块粉碎效果 : 对话框内容 : 延迟[60] : 方块粉碎[15]
		var type = String(args[1]);
		var temp1 = String(args[3]);
		var temp2 = String(args[5]);
		
		
		if( type == "对话框内容" ){
			var temp_sprite = $gameTemp.drill_DSE_getContentSprite_MessageWindow();
			if( temp_sprite == undefined ){ return; }
				
			// > 参数准备
			var temp_data = {
				"frameX": temp_sprite._drill_DSE_frame_x,
				"frameY": temp_sprite._drill_DSE_frame_y,
				"frameW": temp_sprite._drill_DSE_frame_w,
				"frameH": temp_sprite._drill_DSE_frame_h,
				"src_mode": "关闭资源控制",
				"src_img": "",
				"src_file": "",
				"shatter_id": 0,
				"shatter_opacityType": $gameSystem._drill_DSE_opacityType,	//透明度变化方式
				"shatter_hasParent": true,									//父贴图标记
			};
			if( temp2.indexOf("方块粉碎[") != -1 ){
				temp2 = temp2.replace("方块粉碎[","");
				temp2 = temp2.replace("]","");
				temp_data["shatter_id"] = Number(temp2)-1;
				
				// > 播放粉碎
				this._drill_DSE_mc.drill_COSE_resetData( temp_data );
				this._drill_DSE_mc.drill_COSE_runShatter();
				
				// > 设置资源对象
				temp_sprite._drill_DSE_sprite.drill_COSE_setUncontroledBitmap( temp_sprite.bitmap );
			}
			if( temp2.indexOf("方块反转粉碎[") != -1 ){
				temp2 = temp2.replace("方块反转粉碎[","");
				temp2 = temp2.replace("]","");
				temp_data["shatter_id"] = Number(temp2)-1;
				
				// > 倒放粉碎
				this._drill_DSE_mc.drill_COSE_resetData( temp_data );
				this._drill_DSE_mc.drill_COSE_backrunShatter();
				
				// > 设置资源对象
				temp_sprite._drill_DSE_sprite.drill_COSE_setUncontroledBitmap( temp_sprite.bitmap );
			}
		}
		
		
		if( type == "选择框内容" ){
			var temp_sprite = $gameTemp.drill_DSE_getContentSprite_ChoiceWindow();
			if( temp_sprite == undefined ){ return; }
				
			// > 参数准备
			var temp_data = {
				"frameX": temp_sprite._drill_DSE_frame_x,
				"frameY": temp_sprite._drill_DSE_frame_y,
				"frameW": temp_sprite._drill_DSE_frame_w,
				"frameH": temp_sprite._drill_DSE_frame_h,
				"src_mode": "关闭资源控制",
				"src_img": "",
				"src_file": "",
				"shatter_id": 0,
				"shatter_opacityType": $gameSystem._drill_DSE_opacityType,	//透明度变化方式
				"shatter_hasParent": true,									//父贴图标记
			};
			if( temp2.indexOf("方块粉碎[") != -1 ){
				temp2 = temp2.replace("方块粉碎[","");
				temp2 = temp2.replace("]","");
				temp_data["shatter_id"] = Number(temp2)-1;
				
				// > 播放粉碎
				this._drill_DSE_cc.drill_COSE_resetData( temp_data );
				this._drill_DSE_cc.drill_COSE_runShatter();
				
				// > 设置资源对象
				temp_sprite._drill_DSE_sprite.drill_COSE_setUncontroledBitmap( temp_sprite.bitmap );
			}
			if( temp2.indexOf("方块反转粉碎[") != -1 ){
				temp2 = temp2.replace("方块反转粉碎[","");
				temp2 = temp2.replace("]","");
				temp_data["shatter_id"] = Number(temp2)-1;
				
				// > 倒放粉碎
				this._drill_DSE_cc.drill_COSE_resetData( temp_data );
				this._drill_DSE_cc.drill_COSE_backrunShatter();
				
				// > 设置资源对象
				temp_sprite._drill_DSE_sprite.drill_COSE_setUncontroledBitmap( temp_sprite.bitmap );
			}
		}
		
		
		if( type == "姓名框内容" ){
			var temp_sprite = $gameTemp.drill_DSE_getContentSprite_NameWindowDrill();
			if( temp_sprite == undefined ){
				temp_sprite = $gameTemp.drill_DSE_getContentSprite_NameWindowYep();
			}
			if( temp_sprite != undefined ){
				
				// > 参数准备
				var temp_data = {
					"frameX": temp_sprite._drill_DSE_frame_x,
					"frameY": temp_sprite._drill_DSE_frame_y,
					"frameW": temp_sprite._drill_DSE_frame_w,
					"frameH": temp_sprite._drill_DSE_frame_h,
					"src_mode": "关闭资源控制",
					"src_img": "",
					"src_file": "",
					"shatter_id": 0,
					"shatter_opacityType": $gameSystem._drill_DSE_opacityType,	//透明度变化方式
					"shatter_hasParent": true,									//父贴图标记
				};
				if( temp2.indexOf("方块粉碎[") != -1 ){
					temp2 = temp2.replace("方块粉碎[","");
					temp2 = temp2.replace("]","");
					temp_data["shatter_id"] = Number(temp2)-1;
					
					// > 播放粉碎
					this._drill_DSE_nc.drill_COSE_resetData( temp_data );
					this._drill_DSE_nc.drill_COSE_runShatter();
				
					// > 设置资源对象
					temp_sprite._drill_DSE_sprite.drill_COSE_setUncontroledBitmap( temp_sprite.bitmap );
				}
				if( temp2.indexOf("方块反转粉碎[") != -1 ){
					temp2 = temp2.replace("方块反转粉碎[","");
					temp2 = temp2.replace("]","");
					temp_data["shatter_id"] = Number(temp2)-1;
					
					// > 倒放粉碎
					this._drill_DSE_nc.drill_COSE_resetData( temp_data );
					this._drill_DSE_nc.drill_COSE_backrunShatter();
				
					// > 设置资源对象
					temp_sprite._drill_DSE_sprite.drill_COSE_setUncontroledBitmap( temp_sprite.bitmap );
				}
			}
		}
	}
	if( args.length == 4 ){
		var type = String(args[1]);
		var temp1 = String(args[3]);
		if( type == "对话框内容" ){
			if( temp1 == "立刻复原" ){
				this._drill_DSE_mc.drill_COSE_restoreShatter();
			}
			if( temp1 == "暂停播放" ){
				this._drill_DSE_mc.drill_COSE_pause();
			}
			if( temp1 == "继续播放" ){
				this._drill_DSE_mc.drill_COSE_continue();
			}
		}
		if( type == "选择框内容" ){
			if( temp1 == "立刻复原" ){
				this._drill_DSE_cc.drill_COSE_restoreShatter();
			}
			if( temp1 == "暂停播放" ){
				this._drill_DSE_cc.drill_COSE_pause();
			}
			if( temp1 == "继续播放" ){
				this._drill_DSE_cc.drill_COSE_continue();
			}
		}
		if( type == "姓名框内容" ){
			if( temp1 == "立刻复原" ){
				this._drill_DSE_nc.drill_COSE_restoreShatter();
			}
			if( temp1 == "暂停播放" ){
				this._drill_DSE_nc.drill_COSE_pause();
			}
			if( temp1 == "继续播放" ){
				this._drill_DSE_nc.drill_COSE_continue();
			}
		}
	}
	if( args.length == 6 ){		//>方块粉碎效果 : 图片碎片 : 消失方式 : 不消失
		var type = String(args[1]);
		var temp1 = String(args[3]);
		var temp2 = String(args[5]);
		if( type == "图片碎片" && temp1 == "消失方式" ){
			if( temp2 == "设回默认" ){
				$gameSystem._drill_DSE_opacityType = DrillUp.g_DSE_opacityType;
			}else{
				$gameSystem._drill_DSE_opacityType = temp1;
			}
		}
	}
};

//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DSE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSE_sys_initialize.call(this);
	this.drill_DSE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DSE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DSE_saveEnabled == true ){	
		$gameSystem.drill_DSE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DSE_initSysData();
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
Game_System.prototype.drill_DSE_initSysData = function() {
	this.drill_DSE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DSE_checkSysData = function() {
	this.drill_DSE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DSE_initSysData_Private = function() {
	
	this._drill_DSE_opacityType = DrillUp.g_DSE_opacityType;	//透明类型
	this._drill_DSE_delayCommandTank = [];						//延迟插件指令容器
	
	// > 对话框
	var data = {};
	data['src_mode'] = "关闭资源控制";
	this._drill_DSE_mc = new Drill_COSE_Controller( data );
	
	// > 选择框
	this._drill_DSE_cc = new Drill_COSE_Controller( data );
	
	// > 姓名框
	this._drill_DSE_nc = new Drill_COSE_Controller( data );
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DSE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DSE_mc == undefined ||
		this._drill_DSE_cc == undefined ||
		this._drill_DSE_nc == undefined ){
		this.drill_DSE_initSysData();
	}
	
};


//=============================================================================
// ** 贴图获取
//=============================================================================
//==============================
// * 贴图获取 - 对话框贴图
//==============================
Game_Temp.prototype.drill_DSE_getContentSprite_MessageWindow = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._messageWindow == undefined ){ return null; }
	return SceneManager._scene._messageWindow._windowContentsSprite;
}
//==============================
// * 贴图获取 - 选择框贴图
//==============================
Game_Temp.prototype.drill_DSE_getContentSprite_ChoiceWindow = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._messageWindow == undefined ){ return null; }
	if( SceneManager._scene._messageWindow._choiceWindow == undefined ){ return null; }
	return SceneManager._scene._messageWindow._choiceWindow._windowContentsSprite;
}
//==============================
// * 贴图获取 - 姓名框贴图（Yep）
//==============================
Game_Temp.prototype.drill_DSE_getContentSprite_NameWindowYep = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._messageWindow == undefined ){ return null; }
	if( SceneManager._scene._messageWindow._nameWindow == undefined ){ return null; }
	return SceneManager._scene._messageWindow._nameWindow._windowContentsSprite;
}
//==============================
// * 贴图获取 - 姓名框贴图（Drill）
//==============================
Game_Temp.prototype.drill_DSE_getContentSprite_NameWindowDrill = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._messageWindow == undefined ){ return null; }
	if( SceneManager._scene._messageWindow._drill_DNB_nameWindow == undefined ){ return null; }
	return SceneManager._scene._messageWindow._drill_DNB_nameWindow._windowContentsSprite;
}


//=============================================================================
// ** 贴图框架
//=============================================================================
//==============================
// * 贴图框架 - 初始化
//==============================
Sprite.prototype.drill_DSE_initBitmapFrame = function() {
	this._drill_DSE_frame_x = -1;			//框架 - x
	this._drill_DSE_frame_y = -1;			//框架 - y
	this._drill_DSE_frame_w = 0;			//框架 - w
	this._drill_DSE_frame_h = 0;			//框架 - h
}
//==============================
// * 贴图框架 - bitmap识别（必须放前面）
//==============================
Sprite.prototype.drill_DSE_updateBitmapFrame = function() {
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 不接受宽度为0的标记
	if( this._realFrame.width == 0 ){ return; }
	if( this._realFrame.height == 0 ){ return; }
	
	if( this._drill_DSE_frame_x != this._realFrame.x ||
		this._drill_DSE_frame_y != this._realFrame.y ||
		this._drill_DSE_frame_w != this._realFrame.width ||
		this._drill_DSE_frame_h != this._realFrame.height ){
		
		this._drill_DSE_frame_x = this._realFrame.x;
		this._drill_DSE_frame_y = this._realFrame.y;
		this._drill_DSE_frame_w = this._realFrame.width;
		this._drill_DSE_frame_h = this._realFrame.height;
	}
}


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_DSE_map_createMessageWindow = Scene_Map.prototype.createMessageWindow;
Scene_Map.prototype.createMessageWindow = function() {
	_drill_DSE_map_createMessageWindow.call(this);
	this.drill_DSE_scene_createMessageWindow();
}
//==============================
// * 地图 - 初始化
//==============================
Scene_Map.prototype.drill_DSE_scene_createMessageWindow = function() {
	
	// > 对话框
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_MessageWindow();
	if( temp_sprite != undefined ){
		
		// > 贴图框架 - 初始化
		temp_sprite.drill_DSE_initBitmapFrame();
		
		// > 碎片贴图
		temp_sprite._drill_DSE_sprite = new Drill_COSE_LayerSprite();
		temp_sprite._drill_DSE_sprite.drill_COSE_setController( $gameSystem._drill_DSE_mc );
		temp_sprite.addChild( temp_sprite._drill_DSE_sprite );
	}
	
	// > 选择框
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_ChoiceWindow();
	if( temp_sprite != undefined ){
		
		// > 贴图框架 - 初始化
		temp_sprite.drill_DSE_initBitmapFrame();
		
		// > 碎片贴图
		temp_sprite._drill_DSE_sprite = new Drill_COSE_LayerSprite();
		temp_sprite._drill_DSE_sprite.drill_COSE_setController( $gameSystem._drill_DSE_cc );
		temp_sprite.addChild( temp_sprite._drill_DSE_sprite );
	}
	
	// > 姓名框（Yep）
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_NameWindowYep();
	if( temp_sprite != undefined ){
		
		// > 贴图框架 - 初始化
		temp_sprite.drill_DSE_initBitmapFrame();
		
		// > 碎片贴图
		temp_sprite._drill_DSE_sprite = new Drill_COSE_LayerSprite();
		temp_sprite._drill_DSE_sprite.drill_COSE_setController( $gameSystem._drill_DSE_nc );
		temp_sprite.addChild( temp_sprite._drill_DSE_sprite );
	}
	
	// > 姓名框（Drill）
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_NameWindowDrill();
	if( temp_sprite != undefined ){
		
		// > 贴图框架 - 初始化
		temp_sprite.drill_DSE_initBitmapFrame();
		
		// > 碎片贴图
		temp_sprite._drill_DSE_sprite = new Drill_COSE_LayerSprite();
		temp_sprite._drill_DSE_sprite.drill_COSE_setController( $gameSystem._drill_DSE_nc );
		temp_sprite.addChild( temp_sprite._drill_DSE_sprite );
	}
}
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_DSE_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	
	// > 帧刷新 前执行
	this.drill_DSE_scene_updateBefore();
	
	// > 帧刷新
	_drill_DSE_map_update.call(this);
	
	// > 帧刷新 后执行
	this.drill_DSE_scene_updateAfter();
}
//==============================
// * 地图 - 帧刷新 前执行
//==============================
Scene_Map.prototype.drill_DSE_scene_updateBefore = function() {
	
	// > 贴图框架 - bitmap识别（必须放前面）
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_MessageWindow();
	if( temp_sprite != undefined ){ temp_sprite.drill_DSE_updateBitmapFrame(); }
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_ChoiceWindow();
	if( temp_sprite != undefined ){ temp_sprite.drill_DSE_updateBitmapFrame(); }
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_NameWindowYep();
	if( temp_sprite != undefined ){ temp_sprite.drill_DSE_updateBitmapFrame(); }
	var temp_sprite = $gameTemp.drill_DSE_getContentSprite_NameWindowDrill();
	if( temp_sprite != undefined ){ temp_sprite.drill_DSE_updateBitmapFrame(); }
}
//==============================
// * 地图 - 帧刷新 后执行
//==============================
Scene_Map.prototype.drill_DSE_scene_updateAfter = function() {
	if( this.isActive() ){
		$gameSystem.drill_DSE_updateCommandDelay();			//帧刷新 - 粉碎指令
		$gameSystem._drill_DSE_mc.drill_COSE_update();		//帧刷新 - 对话框粉碎数据
		$gameSystem._drill_DSE_cc.drill_COSE_update();		//帧刷新 - 选择框粉碎数据
		$gameSystem._drill_DSE_nc.drill_COSE_update();		//帧刷新 - 姓名框粉碎数据
	}
}
//==============================
// * 窗体 - 粉碎时图像隐藏
//==============================
var _drill_DSE_w__updateContents = Window.prototype._updateContents;
Window.prototype._updateContents = function() {
    _drill_DSE_w__updateContents.call(this);
	if( this._windowContentsSprite._drill_DSE_sprite == undefined ){ return; }
	
	// > 粉碎播放时，隐藏父贴图
	if( this._windowContentsSprite._drill_DSE_sprite.drill_COSE_canParentVisible() == false ){
		this._windowContentsSprite.texture.frame = Rectangle.emptyRectangle;
		this._drill_DSE_frameIsEmpty = true;
		
		// > 【窗口字符 - 窗口字符核心】隐藏窗口字符块
		if( Imported.Drill_CoreOfWindowCharacter ){				
			var char_sprite_list = this.drill_COWC_getAllSprite();
			for(var i = 0; i < char_sprite_list.length; i++){
				char_sprite_list[i].visible = false;
			}
			
		}
	}else{
		
		// > 结束 粉碎播放 后一帧，还原父贴图
		if( this._drill_DSE_frameIsEmpty == true ){
			this._drill_DSE_frameIsEmpty = false;
			this._windowContentsSprite._refresh();
		}
	}
};



//=============================================================================
// ** 战斗界面复刻
//=============================================================================
//==============================
// * 战斗 - 初始化
//==============================
var _drill_DSE_battle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
Scene_Battle.prototype.createMessageWindow = function() {
	_drill_DSE_battle_createMessageWindow.call(this);
	this.drill_DSE_scene_createMessageWindow();
}
Scene_Battle.prototype.drill_DSE_scene_createMessageWindow = Scene_Map.prototype.drill_DSE_scene_createMessageWindow;
//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_DSE_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	
	// > 帧刷新 前执行
	this.drill_DSE_scene_updateBefore();
	
	// > 帧刷新
	_drill_DSE_battle_update.call(this);
	
	// > 帧刷新 后执行
	this.drill_DSE_scene_updateAfter();
}
Scene_Battle.prototype.drill_DSE_scene_updateBefore = Scene_Map.prototype.drill_DSE_scene_updateBefore;
Scene_Battle.prototype.drill_DSE_scene_updateAfter = Scene_Map.prototype.drill_DSE_scene_updateAfter;



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogShatterEffect = false;
		alert(
			"【Drill_DialogShatterEffect.js 对话框-方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



