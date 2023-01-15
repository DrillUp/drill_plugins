//=============================================================================
// Drill_EnemyTextColor.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        UI - 敌人文本颜色
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EnemyTextColor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以任意设置敌人的文本颜色。
 * ★★必须放在插件 MOG_BattleCursor 敌人指针 的后面★★
 * ★★必须放在插件 高级BOSS生命固定框 的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfColor    窗口字符-颜色核心
 *     需要该核心才能修改颜色。
 * 作用于：
 *   - Drill_WindowLog      战斗UI-窗口提示消息★★v1.3及以上★★
 *     结合目标插件，可以使得战斗中的消息提示敌人名字变色。
 *    （消息窗口只支持数字颜色）
 *   - Drill_GaugeForBoss   UI-高级boss生命固定框★★v1.1及以上★★
 *     可以使得目标插件的boss框的文本变色。
 *   - MOG_BattleCursor     战斗-敌人指针
 *     可以使得目标插件的指针文本变色。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面。
 *   作用于战斗界面和窗口界面中的敌人名字。
 * 2.如果想了解高级颜色设置方法，去看看 "23.窗口字符 > 关于颜色核心.docx"。
 * 3.如果你改动注释配置后，使用了旧存档，可能会出现文本为旧存档设定的颜色情况。
 *   具体说明去看看 "21.管理器 > 数据更新与旧存档.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件：
 * 在要修改颜色的敌人设置中，添加注释即可：
 * 
 * 敌人注释：<颜色:1>
 * 敌人注释：<高级颜色:1>
 * 敌人注释：<颜色:#FF4444>
 * 
 * 1."颜色:1" 表示颜色核心的配置中的第1个颜色。你也可以直接写颜色代码。
 * 2."高级颜色:3" 表示核心中配置的第3个高级渐变色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改颜色：
 * 如果你要改变敌人颜色，那么可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>文本颜色 : 敌人[3] : 敌人普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 敌人变量[21] : 敌人普通 : 普通颜色[2]
 * 
 * 插件指令：>文本颜色 : 敌人[3] : 敌人普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 敌人[3] : 敌人普通 : 普通颜色变量[21]
 * 插件指令：>文本颜色 : 敌人[3] : 敌人高级 : 高级颜色[4]
 * 插件指令：>文本颜色 : 敌人[3] : 敌人高级 : 高级颜色变量[21]
 * 
 * 1.前半部分（敌人[5]）和 后半部分（敌人普通 : 普通颜色[2]）
 *   的参数可以随意组合。一共有2*4种组合方式。
 * 2.高级颜色和普通颜色设置可以相互覆盖，修改后永久有效。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>文本颜色 : 3 : 敌人普通 : 2
 * 插件指令(旧)：>文本颜色 : 3 : 敌人高级 : 1
 * 插件指令(旧)：>变量文本颜色 : 21 : 敌人普通 : 2
 * 插件指令(旧)：>变量文本颜色 : 21 : 敌人高级 : 1
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
 * 时间复杂度： o(n^2)
 * 测试方法：   在各个界面中以正常游戏流程进行测试。
 * 测试结果：   战斗界面的角色文本，消耗为：【5ms以下】
 *              地图界面的角色文本，消耗为：【5ms以下】
 *              菜单界面的角色文本，消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行的插件计算量都非常小，消耗可以完全不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得消息窗口中的颜色也会变化。
 * [v1.2]
 * 使得你可以通过插件指令来修改敌人的文本颜色。
 * [v1.3]
 * 使得你可以设置高级颜色渐变，并可以在对话窗口中使用高级颜色。
 * [v1.4]
 * 规范修改了插件指令设置。
 * [v1.5]
 * 优化了高级颜色在某些特殊情况下不起效果的问题。
 * [v1.6]
 * 添加了与高级bosshp插件相互扩展的功能。
 * [v1.7]
 * 与高级bosshp插件一同更新。
 * [v1.8]
 * 修改了内部结构。
 * [v1.9]
 * 分离了颜色核心。添加了插件性能说明。
 * [v2.0]
 * 修正了插件指令。
 * 改进了 新加的敌人 在旧存档中显示为黑色的问题。
 * [v2.1]
 * 优化了旧存档的识别与兼容。
 *
 *
 * @param MOG-敌人指针是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，敌人指针插件也会变色。
 * @default true
 *
 * @param BOSS框是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，高级BOSS框插件也会变色。
 * @default true
 *
 * @param 消息窗口是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，注意，该设置需要 战斗-窗口提示消息 插件才能生效。
 * @default true
 *
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		ETC (Enemy_Text_Color)
//		临时全局变量	DrillUp.g_ETC_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_ETC_xxx
//		全局存储变量	无
//		覆盖重写方法	Window_BattleEnemy.prototype.drawItem
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	菜单界面
//		★性能测试消耗	目前未找到消耗值
//		★最坏情况		暂无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			敌人文本颜色：
//				->敌人指针
//				->boss框
//				->插件指令
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.敌人文本颜色中关联了 mog指针、bosshp，敌人选择窗口 。
//			2.Bitmap.drill_elements_drawText用于控制颜色渐变的位置修正。（目前不理解为啥bitmap绘制渐变时会产生brush偏移的情况。）
//
//		★存在的问题：
//			1.插件的作用域不是很稳定，如果有某部分的改动，则随时可能牵连其它插件一起升级。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EnemyTextColor = true;
　　var DrillUp = DrillUp || {}; 


	/*-----------------杂项------------------*/
    DrillUp.parameters = PluginManager.parameters('Drill_EnemyTextColor');
    DrillUp.g_ETC_mogCursor = String(DrillUp.parameters['MOG-敌人指针是否变色'] || "true") === "true";
    DrillUp.g_ETC_mogBoss = String(DrillUp.parameters['BOSS框是否变色'] || "true") === "true";
    DrillUp.g_ETC_message = String(DrillUp.parameters['消息窗口是否变色'] || "true") === "true";
    //DrillUp.g_ETC_ebook = String(DrillUp.parameters['敌人图鉴是否变色'] || "true") === "true";

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfColor ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_ETC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ETC_pluginCommand.call(this, command, args);
	
	if( command === ">文本颜色" ){	// >文本颜色 : B : 敌人普通 : A1
		if(args.length == 6){
			var type = String(args[3]);
			if( type == "敌人普通" || type == "敌人高级" ){
			
				/*-----------------对象组获取------------------*/
				var temp1 = String(args[1]);
				var temp2 = String(args[5]);
				if( temp1.indexOf("敌人变量[") != -1 ){
					temp1 = temp1.replace("敌人变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
				}else{
					temp1 = temp1.replace("敌人[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
				}
				if( temp2.indexOf("变量[") != -1 ){
					temp2 = temp2.replace("普通颜色变量[","");
					temp2 = temp2.replace("高级颜色变量[","");
					temp2 = temp2.replace("颜色变量[","");
					temp2 = temp2.replace("]","");
					temp2 = $gameVariables.value( Number(temp2) );
					temp2 = String(temp2);
				}else{
					temp2 = temp2.replace("普通颜色[","");
					temp2 = temp2.replace("高级颜色[","");
					temp2 = temp2.replace("颜色[","");
					temp2 = temp2.replace("]","");
					temp2 = String(temp2);
				}
				
				/*-----------------转换------------------*/
				if( type == "敌人普通" ){
					if( temp2.slice(0,1) === "#" ){
						$gameSystem._drill_ETC_colorCode[Number(temp1)] = temp2;
					}else{
						$gameSystem._drill_ETC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
					}
				}
				if( type == "敌人高级" ){
					$gameSystem._drill_ETC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
				}
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">变量文本颜色" ){
		if(args.length == 6){
			var temp1 = $gameVariables.value( Number(args[1]) ) ;
			var temp2 = $gameVariables.value( Number(args[5]) ) ;
			var type = String(args[3]);
			if( type == "敌人普通" ){
				$gameSystem._drill_ETC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getColor( temp2-1 )) ;
			}
			if( type == "敌人高级" ){
				$gameSystem._drill_ETC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getSeniorColor( temp2-1 )) ;
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
DrillUp.g_ETC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ETC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ETC_sys_initialize.call(this);
	this.drill_ETC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ETC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ETC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ETC_saveEnabled == true ){	
		$gameSystem.drill_ETC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ETC_initSysData();
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
Game_System.prototype.drill_ETC_initSysData = function() {
	this.drill_ETC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ETC_checkSysData = function() {
	this.drill_ETC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ETC_initSysData_Private = function() {
	this._drill_ETC_colorCode = [];
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ETC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ETC_colorCode == undefined ){
		this.drill_ETC_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，插件指令改色时才用到）
};
//==============================
// * 存储数据 - 数据获取（兼容旧插件）
//==============================
Object.defineProperty(Game_System.prototype, '_drill_ETC_enemyCount', {
    get: function(){
		alert(
			"【Drill_EnemyTextColor.js UI-敌人文本颜色】\n有插件在调用已经抛弃的变量，注意同步更新一下下面的插件："+
			"\n- Drill_CoreOfColor 窗口字符-颜色核心"+
			"\n- Drill_ActorTextColor UI-角色文本颜色"+
			"\n- Drill_WindowLog 战斗UI-窗口提示消息"
		);
        return 0;
    },
    configurable: true
});



//=============================================================================
// ** 临时数据
//=============================================================================
//==============================
// * 临时数据 - 初始化
//==============================
var _drill_ETC_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_ETC_temp_initialize.call(this);
	
	this._drill_ETC_enemyData = [];
	for( var i = 0; i < $dataEnemies.length; i++ ){
		if( $dataEnemies[i] == null ){ continue; }
		
		// > 开始读取
		var note = String($dataEnemies[i].note);
		var re_color = /<颜色:([^<>]*?)>/; 				//正则获取（返回数组，第二个为匹配内容）
		var color = (note.match(re_color)) || [];
		var re_colorG = /<高级颜色:([^<>]*?)>/; 	
		var colorG = (note.match(re_colorG)) || [];
		
		// > 普通颜色
		if( color != "" && color != [] ){
			
			// > 普通颜色 - 颜色代码
			if( color[1].slice(0,1) === "#" ){
				var data = {};
				data['color_code'] = color[1];
				data['color_id'] = -1;
				this._drill_ETC_enemyData[i] = data;
				
			// > 普通颜色 - 颜色编号
			}else{
				var data = {};
				data['color_code'] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
				data['color_id'] = Number(color[1]) ; //(101开始)
				this._drill_ETC_enemyData[i] = data;
			}
			
		// > 高级颜色
		}else if( colorG != "" && colorG != [] ){
			var data = {};
			data['color_code'] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
			data['color_id'] = Number(colorG[1]) + 100 ; //(201开始)
			this._drill_ETC_enemyData[i] = data;
		
		}else{
			//（不操作）
		}
	}
	//alert(JSON.stringify(this._drill_ETC_enemyData));
}
//==============================
// * 临时数据 - 获取 颜色代码
//==============================
Game_Temp.prototype.drill_ETC_getColorCode = function( enemy_id ){
	
	// > 若存储变量有值，就用存储变量的
	if( $gameSystem._drill_ETC_colorCode[enemy_id] != undefined &&
		$gameSystem._drill_ETC_colorCode[enemy_id] != "" ){
		return $gameSystem._drill_ETC_colorCode[enemy_id];
	}
	var data = this._drill_ETC_enemyData[enemy_id];
	if( data == undefined ){ return ""; }
	return data['color_code'];
}
//==============================
// * 临时数据 - 获取 颜色ID
//==============================
Game_Temp.prototype.drill_ETC_getColorId = function( enemy_id ){
	var data = this._drill_ETC_enemyData[enemy_id];
	if( data == undefined ){ return 0; }
	return data['color_id'];
}


//=============================================================================
// ** 敌人选择窗口绘制（覆写） 
//=============================================================================
Window_BattleEnemy.prototype.drawItem = function( index ){
	var color = $gameTemp.drill_ETC_getColorCode( index );
	if( color != "" ){
		this.changeTextColor(color);
	}
    var name = this._enemies[index].name();
    var rect = this.itemRectForText(index);
    this.drawText(name, rect.x, rect.y, rect.width);
	this.resetTextColor();
};


//=============================================================================
// ** 兼容设置 
//=============================================================================
//=============================
// * 兼容 - 与mog指针相适应
//=============================
var _drill_ETC_mogCursor_refresh = BattleCursor.prototype.refresh_arrow_name;
BattleCursor.prototype.refresh_arrow_name = function(battler,sprite) {
	if(Imported.MOG_BattleCursor && DrillUp.g_ETC_mogCursor){
		//for(var a in battler){
		//	textb ="key:"+a+" value:"+ battler[a]+"\n";
		//	alert(textb);
		//}
		//battler._enemyId
		if( battler._enemyId ){
			var color = $gameTemp.drill_ETC_getColorCode( battler._enemyId );
			if( color != "" ){
				sprite.bitmap.textColor = color;
			}
		}
		_drill_ETC_mogCursor_refresh.call(this,battler,sprite);
		sprite.bitmap.textColor = "#ffffff";
	}else{
		_drill_ETC_mogCursor_refresh.call(this,battler,sprite);
	}
};
//=============================
// * 兼容 - 与mog bosshp相适应
//=============================
if( Imported.MOG_BossHP ){
	var _drill_ETC_mogBossHP_refresh = Sprite_BossHP.prototype.refresh_name;
	Sprite_BossHP.prototype.refresh_name = function() {
		
		if( DrillUp.g_ETC_mogBoss){
			if( this._battler ){
				var color = $gameTemp.drill_ETC_getColorCode( this._battler._enemyId );
				if( color != "" ){
					this._name.bitmap.textColor = color;
				}
			}
			_drill_ETC_mogBossHP_refresh.call(this);
			this._name.bitmap.textColor = "#ffffff";
		}else{
			_drill_ETC_mogBossHP_refresh.call(this);
		}
	};
}
//=============================
// * 兼容 - 与 Drill_GaugeForBoss 相适应
//=============================
if( Imported.Drill_GaugeForBoss ){
	var _drill_ETC_GFB_drawName = Drill_GFB_StyleSprite.prototype.drill_drawName;
	Drill_GFB_StyleSprite.prototype.drill_drawName = function() {
		
		if( DrillUp.g_ETC_mogBoss){
			var color = $gameTemp.drill_ETC_getColorCode( this._drill_enemy._enemyId );
			if( color != "" ){
				this._drill_name_sprite.bitmap.textColor = color;
			}
			_drill_ETC_GFB_drawName.call(this);
			this._drill_name_sprite.bitmap.textColor = "#ffffff";
		}else{
			_drill_ETC_GFB_drawName.call(this);
		}
	};
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EnemyTextColor = false;
		alert(
			"【Drill_EnemyTextColor.js UI-敌人文本颜色】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfColor 窗口字符-颜色核心"
		);
}
