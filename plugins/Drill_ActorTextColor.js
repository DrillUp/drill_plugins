//=============================================================================
// Drill_ActorTextColor.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        UI - 角色文本颜色
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_ActorTextColor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置角色的文本颜色。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfColor     窗口字符-颜色核心
 *     需要该核心才能修改颜色。
 * 作用于：
 *   - Drill_WindowLog       战斗UI-窗口提示消息
 *     结合目标插件，可以使得战斗中的消息提示角色名字变色。
 *    （消息窗口只支持数字颜色）
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   作用于任何单独出现角色名的地方。
 * 2.如果想了解高级颜色设置方法，去看看 "23.窗口字符 > 关于颜色核心.docx"。
 * 3.如果你改动注释配置后，使用了旧存档，可能会出现文本为旧存档设定的颜色情况。
 *   具体说明去看看 "21.管理器 > 数据更新与旧存档.docx"。
 * 细节：
 *   (1.插件放任意位置都可以。
 *      最好使得角色名字独一无二，如果出现重名，那么重名文本也会变色。
 *   (2.插件支持角色改名，但如果玩家修改的角色名字与游戏中物品、敌人名字一样，
 *      则会造成重名的文本也变色。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件：
 * 在要修改颜色的角色设置中，添加注释即可：
 *
 * 角色注释：<颜色:1>
 * 角色注释：<高级颜色:1>
 * 角色注释：<颜色:#FF4444>
 *
 * 1."颜色:1" 表示颜色核心的配置中的第1个颜色。你也可以直接写颜色代码。
 * 2."高级颜色:3" 表示核心中配置的第3个高级渐变色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改颜色：
 * 如果你要改变角色颜色，那么可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>文本颜色 : 角色[5] : 角色普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 角色变量[21] : 角色普通 : 普通颜色[2]
 * 
 * 插件指令：>文本颜色 : 角色[5] : 角色普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 角色[5] : 角色普通 : 普通颜色变量[21]
 * 插件指令：>文本颜色 : 角色[5] : 角色高级 : 高级颜色[4]
 * 插件指令：>文本颜色 : 角色[5] : 角色高级 : 高级颜色变量[21]
 * 
 * 1.前半部分（角色[5]）和 后半部分（角色普通 : 普通颜色[2]）
 *   的参数可以随意组合。一共有2*4种组合方式。
 * 2.高级颜色和普通颜色设置可以相互覆盖，修改后永久有效。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>文本颜色 : 3 : 角色普通 : 2
 * 插件指令(旧)：>文本颜色 : 3 : 角色高级 : 1
 * 插件指令(旧)：>变量文本颜色 : 21 : 角色普通 : 2
 * 插件指令(旧)：>变量文本颜色 : 21 : 角色高级 : 1
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
 * 使得你可以设置高级颜色渐变，并可以在对话窗口中使用高级颜色。
 * [v1.2]
 * 规范修改了插件指令设置。
 * [v1.3]
 * 优化了高级颜色在某些特殊情况下不起效果的问题。
 * [v1.4]
 * 修改了内部结构。
 * [v1.5]
 * 分离了颜色核心。添加了插件性能说明。
 * [v1.6]
 * 修正了插件指令。
 * [v1.7]
 * 改进了 新加的角色 在旧存档中显示为黑色的问题。
 * [v1.8]
 * 修复了角色改名后，不变色的bug。
 * [v1.9]
 * 优化了旧存档的识别与兼容。
 *
 * 
 * @param 消息窗口是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，注意，该设置需要 战斗-窗口提示消息 插件才能生效。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		ATC (Actor_Text_Color)
//		临时全局变量	DrillUp.g_ATC_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_ATC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	菜单界面
//		★性能测试消耗	3.70ms
//		★最坏情况		暂无
//		★备注			能够在性能列表中找到消耗，但是很小。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			角色文本颜色：
//				->文本过滤
//				->插件指令
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.因为角色的名字完全唯一，这里直接根据角色名进行完美变色操作。
//			2.Bitmap.drill_elements_drawText用于控制颜色渐变的位置修正。（目前不理解为啥bitmap绘制渐变时会产生brush偏移的情况。）
//
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** 提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_ATC_tipCurName = "Drill_ActorTextColor.js UI-角色文本颜色";
	DrillUp.g_ATC_tipBasePluginList = ["Drill_CoreOfColor.js 窗口字符-颜色核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_ATC_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_ATC_tipBasePluginList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_ATC_tipCurName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_ATC_tipBasePluginList.length; i++){
			message += "\n- ";
			message += DrillUp.g_ATC_tipBasePluginList[i];
		}
		return message;
	};
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_ActorTextColor = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_ActorTextColor');
	
	/*-----------------杂项------------------*/
    DrillUp.g_ATC_message = String(DrillUp.parameters['消息窗口是否变色'] || "true") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfColor ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_ATC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ATC_pluginCommand.call(this, command, args);
	if( command === ">文本颜色" ){ // >文本颜色 : B : 角色普通 : A1
	
		if( args.length == 6 ){
			var type = String(args[3]);
			if( type == "角色普通" || type == "角色高级" ){
			
				/*-----------------对象组获取------------------*/
				var temp1 = String(args[1]);
				var temp2 = String(args[5]);
				if( temp1.indexOf("角色变量[") != -1 ){
					temp1 = temp1.replace("角色变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
				}else{
					temp1 = temp1.replace("角色[","");
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
				if( type == "角色普通" ){
					if( temp2.slice(0,1) === "#" ){
						$gameSystem._drill_ATC_colorCode[Number(temp1)] = temp2;
					}else{
						$gameSystem._drill_ATC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
					}
				}
				if( type == "角色高级" ){
					$gameSystem._drill_ATC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
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
			if( type == "角色普通" ){
				$gameSystem._drill_ATC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getColor( temp2-1 )) ;
			}
			if( type == "角色高级" ){
				$gameSystem._drill_ATC_colorCode[Number(temp1)] = String(DrillUp.drill_COC_getSeniorColor( temp2-1 )) ;
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
DrillUp.g_ATC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ATC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ATC_sys_initialize.call(this);
	this.drill_ATC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ATC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ATC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ATC_saveEnabled == true ){	
		$gameSystem.drill_ATC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ATC_initSysData();
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
Game_System.prototype.drill_ATC_initSysData = function() {
	this.drill_ATC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ATC_checkSysData = function() {
	this.drill_ATC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ATC_initSysData_Private = function() {
	this._drill_ATC_colorCode = [];
	this._drill_ATC_actorName = [];
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ATC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ATC_colorCode == undefined ){
		this.drill_ATC_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，插件指令改色时才用到）
};
//==============================
// * 存储数据 - 数据获取（兼容旧插件）
//==============================
Object.defineProperty(Game_System.prototype, '_drill_ATC_actorCount', {
    get: function(){
		alert(
			"【Drill_ActorTextColor.js UI-角色文本颜色】\n有插件在调用已经抛弃的变量，注意同步更新一下下面的插件："+
			"\n- Drill_CoreOfColor 窗口字符-颜色核心"+
			"\n- Drill_EnemyTextColor UI-敌人文本颜色"+
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
var _drill_ATC_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_ATC_temp_initialize.call(this);
	
	this._drill_ATC_actorData = [];
	for( var i = 0; i < $dataActors.length; i++ ){
		if( $dataActors[i] == null ){ continue; }
		
		// > 开始读取
		var note = String($dataActors[i].note);
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
				data['actor_name'] = $dataActors[i].name;
				this._drill_ATC_actorData[i] = data;
				
			// > 普通颜色 - 颜色编号
			}else{
				var data = {};
				data['color_code'] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
				data['color_id'] = Number(color[1]) ; //(101开始)
				data['actor_name'] = $dataActors[i].name;
				this._drill_ATC_actorData[i] = data;
			}
			
		// > 高级颜色
		}else if( colorG != "" && colorG != [] ){
			var data = {};
			data['color_code'] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
			data['color_id'] = Number(colorG[1]) + 100 ; //(201开始)
			data['actor_name'] = $dataActors[i].name;
			this._drill_ATC_actorData[i] = data;
		
		}else{
			//（不操作）
		}
	}
	//alert(JSON.stringify(this._drill_ATC_actorData));
}
//==============================
// * 临时数据 - 获取 颜色代码
//==============================
Game_Temp.prototype.drill_ATC_getColorCode = function( actor_id ){
	
	// > 若存储变量有值，就用存储变量的
	if( $gameSystem._drill_ATC_colorCode[actor_id] != undefined &&
		$gameSystem._drill_ATC_colorCode[actor_id] != "" ){
		return $gameSystem._drill_ATC_colorCode[actor_id];
	}
	var data = this._drill_ATC_actorData[actor_id];
	if( data == undefined ){ return ""; }
	return data['color_code'];
}
//==============================
// * 临时数据 - 获取 角色名称
//==============================
Game_Temp.prototype.drill_ATC_getActorName = function( actor_id ){
	
	// > 若存储变量有值，就用存储变量的
	if( $gameSystem._drill_ATC_colorCode[actor_id] != undefined &&
		$gameSystem._drill_ATC_colorCode[actor_id] != "" ){
		result = $gameSystem._drill_ATC_colorCode[actor_id];
	}
	var data = this._drill_ATC_actorData[actor_id];
	if( data == undefined ){ return ""; }
	return data['actor_name'];
}
//==============================
// * 临时数据 - 获取 颜色ID
//==============================
Game_Temp.prototype.drill_ATC_getColorId = function( enemy_id ){
	var data = this._drill_ATC_actorData[enemy_id];
	if( data == undefined ){ return 0; }
	return data['color_id'];
}


//=============================================================================
// ** 角色
//=============================================================================
//==============================
// * 角色 - 改名情况
//==============================
var _drill_ATC_setName = Game_Actor.prototype.setName;
Game_Actor.prototype.setName = function( name ){
	_drill_ATC_setName.call( this, name );
	
	// > 名称改变
	var data = $gameTemp._drill_ATC_actorData[this._actorId];
	if( data == undefined ){ return; }
	$gameSystem._drill_ATC_actorName[this._actorId] = name;
};


//=============================================================================
// ** 变色绑定 （Bitmap drawText）
//=============================================================================
var _drill_ATC_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function( text, x, y, maxWidth, lineHeight, align ){
	
	// > 颜色改变（所有文本都是在这里写的，只要识别字符串就可以变色了）
	for( var i = 0; i < $gameTemp._drill_ATC_actorData.length; i++ ){
		var data = $gameTemp._drill_ATC_actorData[i];
		if( data == undefined ){ continue; }
		var color_code = $gameTemp.drill_ATC_getColorCode(i);
		var actor_name = $gameTemp.drill_ATC_getActorName(i);
		if( color_code == "" ){ continue; }
		if( actor_name == "" ){ continue; }
		if( text == actor_name ){
			this.textColor = color_code;
			this._drill_ATC_needReset = true;
		}
	}
	
	// > 绘制
	_drill_ATC_drawText.call(this,text, x, y, maxWidth, lineHeight, align);
	
	// > 颜色改变后恢复
	if( this._drill_ATC_needReset == true ){
		this.textColor = '#ffffff';
		this._drill_ATC_needReset = false;
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_ActorTextColor = false;
		var tip = DrillUp.drill_ATC_getPluginTip_NoBasePlugin();
		alert( tip );
}

