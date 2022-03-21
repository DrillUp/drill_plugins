//=============================================================================
// Drill_ActorTextColor.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        UI - 角色文本颜色
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
 * 该插件 不能 单独使用，必须基于核心。
 * 基于：
 *   - Drill_CoreOfColor 系统-颜色核心
 *     需要该核心才能修改颜色。
 * 作用于：
 *   - Drill_WindowLog 窗口提示消息 
 *     结合目标插件，可以使得战斗中的消息提示角色名字变色。
 *    （消息窗口只支持数字颜色）
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   作用于任何单独出现角色名的地方。
 * 2.如果想了解高级颜色设置方法，去看看 "13.UI > 关于文本颜色.docx"。
 * 3.如果你改动注释配置后，使用了旧存档，可能会出现文本为旧存档设定的颜色情况。
 *   具体说明去看看 "0.基本定义 > 数据更新与旧存档.docx"。
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
//		工作类型		持续执行
//		时间复杂度		o(n^2)
//		性能测试因素	菜单界面
//		性能测试消耗	3.70ms
//		最坏情况		暂无
//		备注			能够在性能列表中找到消耗，但是很小。
//
//插件记录：
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
		if(args.length == 6){
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
						$gameSystem._drill_ATC_actor[temp1] = temp2;
						$gameSystem._drill_ATC_actorCount[temp1] = -1;
					}else{
						$gameSystem._drill_ATC_actor[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 )) ;
						$gameSystem._drill_ATC_actorCount[temp1] = Number(temp2) ;
					}
				}
				if( type == "角色高级" ){
					$gameSystem._drill_ATC_actor[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 )) ;
					$gameSystem._drill_ATC_actorCount[temp1] = Number(temp2) + 100 ;
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
				$gameSystem._drill_ATC_actor[temp1] = String(DrillUp.drill_COC_getColor( temp2-1 )) ;
				$gameSystem._drill_ATC_actorCount[temp1] = Number(temp2) -1;
			}
			if( type == "角色高级" ){
				$gameSystem._drill_ATC_actor[temp1] = String(DrillUp.drill_COC_getSeniorColor( temp2-1 )) ;
				$gameSystem._drill_ATC_actorCount[temp1] = Number(temp2) + 100 ;
			}
		}
	}
};

//=============================================================================
// ** 存储变量
//=============================================================================
//==============================
// * 存储变量 - 初始化
//==============================
var _drill_ATC_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_ATC_initialize.call(this);
	this._drill_ATC_actor = [];				//角色颜色代码
	this._drill_ATC_actorCount = [];		//角色颜色序号
	this._drill_ATC_actor_name = [];		//角色名
	
	// > 读取注释
	this.drill_ATC_readCommon();
}
//==============================
// * 存储变量 - 载入存档 - 数据赋值
//==============================
var _drill_ATC_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ATC_extractSaveContents.call( this, contents );
	$gameSystem.drill_ATC_readCommon();		//（载入旧存档时，再次读取注释检查）
}
//=============================
// * 存储变量 - 读取注释
//=============================
Game_System.prototype.drill_ATC_readCommon = function() {
	for( var i = 0; i < $dataActors.length; i++ ){
		
		// > 空角色数据时，跳过
		if( $dataActors[i] == null ){
			this._drill_ATC_actor[i] = "";
			this._drill_ATC_actorCount[i] = -1;
			this._drill_ATC_actor_name[i] = null;
			continue;
		}
		
		// > 无数据时，才赋值
		if( this._drill_ATC_actor[i] == null || 
			this._drill_ATC_actor[i] == "" ){
				
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
					this._drill_ATC_actor[i] = color[1];
					this._drill_ATC_actorCount[i] = -1;
					this._drill_ATC_actor_name[i] = $dataActors[i].name;
					
				// > 普通颜色 - 颜色编号
				}else{
					this._drill_ATC_actor[i] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
					this._drill_ATC_actorCount[i] = Number(color[1]) ; //(101开始)
					this._drill_ATC_actor_name[i] = $dataActors[i].name;
				}
				
			// > 高级颜色
			}else if( colorG != "" && colorG != [] ){
				this._drill_ATC_actor[i] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
				this._drill_ATC_actorCount[i] = Number(colorG[1]) + 100 ; //(201开始)
				this._drill_ATC_actor_name[i] = $dataActors[i].name;
			
			// > 不操作
			}else{
				this._drill_ATC_actor[i] = "";
				this._drill_ATC_actorCount[i] = -1;
				this._drill_ATC_actor_name[i] = null;
			}
		}
	}
	//alert(JSON.stringify(this._drill_ATC_actor));
	//alert(JSON.stringify(this._drill_ATC_actor_name));
};
//==============================
// * 存储变量 - 角色改名情况
//==============================
var _drill_ATC_setName = Game_Actor.prototype.setName;
Game_Actor.prototype.setName = function( name ){
	_drill_ATC_setName.call( this, name );
	
	// > 名称改变
	var textColor = $gameSystem._drill_ATC_actor[this._actorId];
	if( textColor != null && 
		textColor != "" ){
		$gameSystem._drill_ATC_actor_name[this._actorId] = name;
	}
};

//=============================================================================
// ** 变色绑定 （Bitmap drawText）
//=============================================================================
var _drill_ATC_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function( text, x, y, maxWidth, lineHeight, align ){
	
	// > 颜色改变（所有文本都是在这里写的，只要识别字符串就可以变色了）
	for( var i = 0; i < $gameSystem._drill_ATC_actor_name.length; i++ ){
		var name = $gameSystem._drill_ATC_actor_name[i];
		if( name != null && text == name ){
			this.textColor = $gameSystem._drill_ATC_actor[i];
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
		alert(
			"【Drill_ActorTextColor.js UI-角色文本颜色】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfColor 系统-颜色核心"
		);
}

