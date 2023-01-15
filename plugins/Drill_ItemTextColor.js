//=============================================================================
// Drill_ItemTextColor.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        UI - 物品+技能文本颜色
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_ItemTextColor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以任意设置物品、武器、护甲、技能的文本颜色。
 * ★★必须放在 主菜单类插件 的前面★★
 * ★★最好放在 战斗类、地图类插件 的后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfColor        窗口字符-颜色核心
 *     需要该核心才能修改颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   作用于物品、技能的名称。
 * 2.如果想了解高级颜色设置方法，去看看 "23.窗口字符 > 关于颜色核心.docx"。
 * 细节：
 *   (1.该插件与 UI-物品+技能文本的滤镜效果 相互独立，但是为了使得效果
 *      可以叠加，最好放其后面。
 *   (2.注意名词：物品/武器/护甲/技能
 *      护甲=防具，物品=道具，这两个名词是同一个意思，指令写防具、道具都有效。
 *      另外，没有下列名词：装备/装甲/装束 。
 *   (3.注意，发布游戏版本前一定要确认 物品和装备 的颜色不再修改，
 *      玩家存档后，在不同版本的颜色设置中不同步，会累积成更加复杂的问题。
 * 存档问题：
 *   (1.进入游戏后，颜色数据会被保存到存档中，如果你修改了物品的颜色，
 *      再次载入旧存档，将读取到 旧存档 的旧颜色。
 *   (2.插件支持 空数据同步更新 的优化，若新物品加注释后，在旧存档中能同步。
 *      详细去看看"21.管理器 > 数据更新与旧存档.docx"
 * 设计：
 *   (1.你可以给物品用颜色文本染色，用不同颜色来表现物品的品级。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 在要修改颜色的 物品/武器/护甲/技能 下，添加注释即可：
 * 
 * 物品注释：<颜色:1>
 * 物品注释：<高级颜色:1>
 * 物品注释：<颜色:#FF4444>
 * 
 * 武器注释：<颜色:1>
 * 武器注释：<高级颜色:1>
 * 武器注释：<颜色:#FF4444>
 * 
 * 护甲注释：<颜色:1>
 * 护甲注释：<高级颜色:1>
 * 护甲注释：<颜色:#FF4444>
 * 
 * 技能注释：<颜色:1>
 * 技能注释：<高级颜色:1>
 * 技能注释：<颜色:#FF4444>
 * 
 * 1.颜色后面的数字1对应你配置中的第1个颜色。你也可以直接贴颜色代码。
 * 2.注意，配置颜色后，在每次新开档时会刷新，但是在旧存档中，不一定会刷新。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 颜色：
 * 如果你要改变颜色设置，可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>文本颜色 : 物品[5] : 物品普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 武器[5] : 武器普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 护甲[5] : 护甲普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 技能[5] : 技能普通 : 普通颜色[2]
 * 
 * 插件指令：>文本颜色 : 物品[5] : 物品高级 : 高级颜色[4]
 * 插件指令：>文本颜色 : 武器[5] : 武器高级 : 高级颜色[4]
 * 插件指令：>文本颜色 : 护甲[5] : 护甲高级 : 高级颜色[4]
 * 插件指令：>文本颜色 : 技能[5] : 技能高级 : 高级颜色[4]
 * 
 * 1.颜色修改后永久有效。
 * 2.旧插件指令没有"物品[ ]"方框文本，只有单一的数字，
 *   也可以兼容使用。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 颜色变量：
 * 如果你要临时改变颜色，那么可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>文本颜色 : 物品[5] : 物品普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 物品[5] : 物品普通 : 普通颜色变量[21]
 * 插件指令：>文本颜色 : 物品变量[21] : 物品普通 : 普通颜色[2]
 * 插件指令：>文本颜色 : 物品变量[21] : 物品普通 : 普通颜色变量[22]
 * 
 * 插件指令：>文本颜色 : 物品[5] : 物品高级 : 高级颜色[4]
 * 插件指令：>文本颜色 : 物品[5] : 物品高级 : 高级颜色变量[21]
 * 插件指令：>文本颜色 : 物品变量[21] : 物品高级 : 高级颜色[4]
 * 插件指令：>文本颜色 : 物品变量[21] : 物品高级 : 高级颜色变量[22]
 * 
 * 1.这里单独为"物品"类型的插件指令情况。
 *   加上后面的"武器"、"护甲"、"技能"，一共有8*4种组合写法。
 *
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>变量文本颜色 : 21 : 物品普通 : 22
 * 插件指令(旧)：>变量文本颜色 : 21 : 武器普通 : 22
 * 插件指令(旧)：>变量文本颜色 : 21 : 护甲普通 : 22
 * 插件指令(旧)：>变量文本颜色 : 21 : 技能普通 : 22
 * 插件指令(旧)：>变量文本颜色 : 21 : 物品高级 : 22
 * 插件指令(旧)：>变量文本颜色 : 21 : 武器高级 : 22
 * 插件指令(旧)：>变量文本颜色 : 21 : 护甲高级 : 22
 * 插件指令(旧)：>变量文本颜色 : 21 : 技能高级 : 22
 * （修改编号为 变量21值 对应的物品id，为 变量22值 对应的颜色编号）
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
 * 使得招式浮动框中的颜色也会变化。
 * [v1.2]
 * 使得你可以通过插件指令对颜色开关。
 * [v1.3]
 * 使得你可以设置高级颜色渐变，并可以在对话窗口中使用高级颜色。
 * [v1.4]
 * 规范修改了插件指令设置。
 * [v1.5]
 * 优化了高级颜色在某些特殊情况下不起效果的问题。
 * [v1.6]
 * 修改了内部结构。
 * [v1.7]
 * 优化了内部结构。修复了战斗结果界面、道具浮动文字、道具浮动框的颜色支持。
 * [v1.8]
 * 修改了注释和指令，优化了战斗结果界面的颜色结构。
 * 分离了颜色核心。添加了插件性能说明。
 * [v1.9]
 * 修正了部分名词概念的定义。
 * [v2.0]
 * 改进了 新加的物品 在旧存档中显示为黑色的问题。
 * [v2.1]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * @param MOG-技能浮动框是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，技能浮动框插件中的文本也变色。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		ITC (Item_Text_Color)
//		临时全局变量	DrillUp.g_ITC_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_ITC_xxx
//		全局存储变量	无
//		覆盖重写方法	TreasureIcons.prototype.refreshName（mog）
//						Treasure_Hud.prototype.refresh_name（mog）
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
//			物品+技能文本颜色：
//				->文本颜色
//				->物品、装备、护甲、技能
//				->插件指令
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.这个插件不看插件指令的话，结构比较清晰，直接在drawItem识别注释就可以了。
//			  但是，在要求插件指令配置下，整个插件大改：
//				1)多了一层，要识别item是物品还是技能。
//				2)多个插件指令修改颜色，需要建立一个缓冲池
//				3)还原颜色，就把缓冲池去掉（缓冲池还需要和存档一起存储）
//			2.Bitmap.drill_elements_drawText用于控制颜色渐变的位置修正。（目前不理解为啥bitmap绘制渐变时会产生brush偏移的情况。）
//			3.归纳变色作用域：
//				覆写.drawItemName （作用于所有窗口）
//				mog技能浮动框
//				mog战斗结果界面
//				mog道具浮动文字
//				mog道具浮动框
//			  实际上通过sprite画出来的物品的，都需要手动变色，而窗口中的不存在问题。
//			4.v1.6以前版本都是通过覆写实现的，这里优化为继承。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_ItemTextColor = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_ItemTextColor');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_ITC_mog_action = String(DrillUp.parameters["MOG-技能浮动框是否变色"] || "true") === "true";

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfColor ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_ITC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ITC_pluginCommand.call(this, command, args);
	
	if( command === ">文本颜色" ){	// >文本颜色 : B : 物品普通 : A1
		if(args.length == 6){
			var type = String(args[3]);
			if( type == "物品普通" || type == "道具普通" ||
				type == "物品高级" || type == "道具高级" || 
				type == "武器普通" || 
				type == "武器高级" || 
				type == "护甲普通" || type == "防具普通" || 
				type == "护甲高级" || type == "防具高级" || 
				type == "技能普通" || 
				type == "技能高级" ){
			
				/*-----------------对象获取------------------*/
				var temp1 = String(args[1]);
				var temp2 = String(args[5]);
				if( temp1.indexOf("变量[") != -1 ){
					temp1 = temp1.replace("物品变量[","");
					temp1 = temp1.replace("道具变量[","");
					temp1 = temp1.replace("武器变量[","");
					temp1 = temp1.replace("护甲变量[","");
					temp1 = temp1.replace("防具变量[","");
					temp1 = temp1.replace("技能变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
				}else{
					temp1 = temp1.replace("物品[","");
					temp1 = temp1.replace("道具[","");
					temp1 = temp1.replace("武器[","");
					temp1 = temp1.replace("护甲[","");
					temp1 = temp1.replace("防具[","");
					temp1 = temp1.replace("技能[","");
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
				if( type == "物品普通" || type == "道具普通" ){
					if( temp2.slice(0,1) === "#" ){
						$gameSystem._drill_ITC_colorCode_Item[temp1] = temp2;
					}else{
						$gameSystem._drill_ITC_colorCode_Item[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2)-1 ));
					}
				}
				if( type == "物品高级" || type == "道具高级" ){
					$gameSystem._drill_ITC_colorCode_Item[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
				}
				
				if( type == "武器普通" ){
					if( temp2.slice(0,1) === "#" ){
						$gameSystem._drill_ITC_colorCode_Weapon[temp1] = temp2;
					}else{
						$gameSystem._drill_ITC_colorCode_Weapon[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
					}
				}
				if( type == "武器高级" ){
					$gameSystem._drill_ITC_colorCode_Weapon[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
				}
				
				if( type == "护甲普通" || type == "防具普通" ){
					if( temp2.slice(0,1) === "#" ){
						$gameSystem._drill_ITC_colorCode_Armor[temp1] = temp2;
					}else{
						$gameSystem._drill_ITC_colorCode_Armor[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
					}
				}
				if( type == "护甲高级" || type == "防具高级" ){
					$gameSystem._drill_ITC_colorCode_Armor[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
				}
				
				if( type == "技能普通" ){
					if( temp2.slice(0,1) === "#" ){
						$gameSystem._drill_ITC_colorCode_Skill[temp1] = temp2;
					}else{
						$gameSystem._drill_ITC_colorCode_Skill[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
					}
				}
				if( type == "技能高级" ){
					$gameSystem._drill_ITC_colorCode_Skill[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
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
			if( type == "物品普通" || type == "道具普通" ){
				$gameSystem._drill_ITC_colorCode_Item[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
			}
			if( type == "物品高级" || type == "道具高级" ){
				$gameSystem._drill_ITC_colorCode_Item[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
			}
			if( type == "武器普通" ){
				$gameSystem._drill_ITC_colorCode_Weapon[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
			}
			if( type == "武器高级" ){
				$gameSystem._drill_ITC_colorCode_Weapon[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
			}
			if( type == "护甲普通" || type == "防具普通" ){
				$gameSystem._drill_ITC_colorCode_Armor[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
			}
			if( type == "护甲高级" || type == "防具高级" ){
				$gameSystem._drill_ITC_colorCode_Armor[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
			}
			if( type == "技能普通" ){
				$gameSystem._drill_ITC_colorCode_Skill[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 ));
			}
			if( type == "技能高级" ){
				$gameSystem._drill_ITC_colorCode_Skill[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 ));
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
DrillUp.g_ITC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ITC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ITC_sys_initialize.call(this);
	this.drill_ITC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ITC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ITC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ITC_saveEnabled == true ){	
		$gameSystem.drill_ITC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ITC_initSysData();
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
Game_System.prototype.drill_ITC_initSysData = function() {
	this.drill_ITC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ITC_checkSysData = function() {
	this.drill_ITC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ITC_initSysData_Private = function() {
	this._drill_ITC_colorCode_Item = [];
	this._drill_ITC_colorCode_Weapon = [];
	this._drill_ITC_colorCode_Armor = [];
	this._drill_ITC_colorCode_Skill = [];
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ITC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ITC_colorCode_Item == undefined ){
		this.drill_ITC_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，插件指令改色时才用到）
};
//==============================
// * 存储数据 - 数据获取（兼容旧插件）
//==============================
Object.defineProperty(Game_System.prototype, '_drill_ITC_items', {
    get: function(){
        return $gameTemp._drill_ITC_items;
    },
    configurable: true
});
Object.defineProperty(Game_System.prototype, '_drill_ITC_weapons', {
    get: function(){
        return $gameTemp._drill_ITC_weapons;
    },
    configurable: true
});
Object.defineProperty(Game_System.prototype, '_drill_ITC_armors', {
    get: function(){
        return $gameTemp._drill_ITC_armors;
    },
    configurable: true
});
Object.defineProperty(Game_System.prototype, '_drill_ITC_skills', {
    get: function(){
        return $gameTemp._drill_ITC_skills;
    },
    configurable: true
});



//=============================================================================
// ** 临时数据
//=============================================================================
//==============================
// * 临时数据 - 初始化
//==============================
var _drill_ITC_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_ITC_temp_initialize.call(this);
	
	// > 颜色数据容器初始化
	this._drill_ITC_itemData = [];
	this._drill_ITC_weaponData = [];
	this._drill_ITC_armorData = [];
	this._drill_ITC_skillData = [];
	
	// > 物品
	for( var i = 0; i < $dataItems.length; i++ ){
		if( $dataItems[i] == null ){ continue; }
		
		// > 开始读取
		var note = String($dataItems[i].note);
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
				this._drill_ITC_itemData[i] = data;
				
			// > 普通颜色 - 颜色编号
			}else{
				var data = {};
				data['color_code'] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
				data['color_id'] = Number(color[1]) ; //(101开始)
				this._drill_ITC_itemData[i] = data;
			}
			
		// > 高级颜色
		}else if( colorG != "" && colorG != [] ){
			var data = {};
			data['color_code'] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
			data['color_id'] = Number(colorG[1]) + 100 ; //(201开始)
			this._drill_ITC_itemData[i] = data;
		
		}else{
			//（不操作）
		}
	}
	
	// > 武器
	for( var i = 0; i < $dataWeapons.length; i++ ){
		if( $dataWeapons[i] == null ){ continue; }
		
		// > 开始读取
		var note = String($dataWeapons[i].note);
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
				this._drill_ITC_weaponData[i] = data;
				
			// > 普通颜色 - 颜色编号
			}else{
				var data = {};
				data['color_code'] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
				data['color_id'] = Number(color[1]) ; //(101开始)
				this._drill_ITC_weaponData[i] = data;
			}
			
		// > 高级颜色
		}else if( colorG != "" && colorG != [] ){
			var data = {};
			data['color_code'] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
			data['color_id'] = Number(colorG[1]) + 100 ; //(201开始)
			this._drill_ITC_weaponData[i] = data;
		
		}else{
			//（不操作）
		}
	}
	
	// > 护甲
	for( var i = 0; i < $dataArmors.length; i++ ){
		if( $dataArmors[i] == null ){ continue; }
		
		// > 开始读取
		var note = String($dataArmors[i].note);
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
				this._drill_ITC_armorData[i] = data;
				
			// > 普通颜色 - 颜色编号
			}else{
				var data = {};
				data['color_code'] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
				data['color_id'] = Number(color[1]) ; //(101开始)
				this._drill_ITC_armorData[i] = data;
			}
			
		// > 高级颜色
		}else if( colorG != "" && colorG != [] ){
			var data = {};
			data['color_code'] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
			data['color_id'] = Number(colorG[1]) + 100 ; //(201开始)
			this._drill_ITC_armorData[i] = data;
		
		}else{
			//（不操作）
		}
	}
	
	// > 技能
	for( var i = 0; i < $dataSkills.length; i++ ){
		if( $dataSkills[i] == null ){ continue; }
		
		// > 开始读取
		var note = String($dataSkills[i].note);
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
				this._drill_ITC_skillData[i] = data;
				
			// > 普通颜色 - 颜色编号
			}else{
				var data = {};
				data['color_code'] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
				data['color_id'] = Number(color[1]) ; //(101开始)
				this._drill_ITC_skillData[i] = data;
			}
			
		// > 高级颜色
		}else if( colorG != "" && colorG != [] ){
			var data = {};
			data['color_code'] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
			data['color_id'] = Number(colorG[1]) + 100 ; //(201开始)
			this._drill_ITC_skillData[i] = data;
		
		}else{
			//（不操作）
		}
	}
	
	
	// > 字符串容器（兼容旧插件）
	this._drill_ITC_items = [];
	this._drill_ITC_weapons = [];
	this._drill_ITC_armors = [];
	this._drill_ITC_skills = [];
	for( var i=0; i < $dataItems.length; i++ ){
		var data = this._drill_ITC_itemData[i];
		if( data == undefined ){
			this._drill_ITC_items[i] = "";
		}else{
			this._drill_ITC_items[i] = data['color_code'];
		}
	}
	for( var i=0; i < $dataWeapons.length; i++ ){
		var data = this._drill_ITC_weaponData[i];
		if( data == undefined ){
			this._drill_ITC_weapons[i] = "";
		}else{
			this._drill_ITC_weapons[i] = data['color_code'];
		}
	}
	for( var i=0; i < $dataArmors.length; i++ ){
		var data = this._drill_ITC_armorData[i];
		if( data == undefined ){
			this._drill_ITC_armors[i] = "";
		}else{
			this._drill_ITC_armors[i] = data['color_code'];
		}
	}
	for( var i=0; i < $dataSkills.length; i++ ){
		var data = this._drill_ITC_skillData[i];
		if( data == undefined ){
			this._drill_ITC_skills[i] = "";
		}else{
			this._drill_ITC_skills[i] = data['color_code'];
		}
	}
}
//==============================
// * 临时数据 - 获取 颜色代码 - 物品
//==============================
Game_Temp.prototype.drill_ITC_getColorCode_Item = function( i ){
	
	// > 若存储变量有值，就用存储变量的
	if( $gameSystem._drill_ITC_colorCode_Item[i] != undefined &&
		$gameSystem._drill_ITC_colorCode_Item[i] != "" ){
		return $gameSystem._drill_ITC_colorCode_Item[i];
	}
	var data = this._drill_ITC_itemData[i];
	if( data == undefined ){ return ""; }
	return data['color_code'];
}
//==============================
// * 临时数据 - 获取 颜色代码 - 武器
//==============================
Game_Temp.prototype.drill_ITC_getColorCode_Weapon = function( i ){
	
	// > 若存储变量有值，就用存储变量的
	if( $gameSystem._drill_ITC_colorCode_Weapon[i] != undefined &&
		$gameSystem._drill_ITC_colorCode_Weapon[i] != "" ){
		return $gameSystem._drill_ITC_colorCode_Weapon[i];
	}
	var data = this._drill_ITC_weaponData[i];
	if( data == undefined ){ return ""; }
	return data['color_code'];
}
//==============================
// * 临时数据 - 获取 颜色代码 - 护甲
//==============================
Game_Temp.prototype.drill_ITC_getColorCode_Armor = function( i ){
	
	// > 若存储变量有值，就用存储变量的
	if( $gameSystem._drill_ITC_colorCode_Armor[i] != undefined &&
		$gameSystem._drill_ITC_colorCode_Armor[i] != "" ){
		result = $gameSystem._drill_ITC_colorCode_Armor[i];
	}
	var data = this._drill_ITC_armorData[i];
	if( data == undefined ){ return ""; }
	return data['color_code'];
}
//==============================
// * 临时数据 - 获取 颜色代码 - 技能
//==============================
Game_Temp.prototype.drill_ITC_getColorCode_Skill = function( i ){
	
	// > 若存储变量有值，就用存储变量的
	if( $gameSystem._drill_ITC_colorCode_Skill[i] != undefined &&
		$gameSystem._drill_ITC_colorCode_Skill[i] != "" ){
		result = $gameSystem._drill_ITC_colorCode_Skill[i];
	}
	var data = this._drill_ITC_skillData[i];
	if( data == undefined ){ return ""; }
	return data['color_code'];
}



//=============================================================================
// ** 窗口物品文本
//=============================================================================
//=============================
// * 物品文本 - 添加标识
//=============================
var _drill_ITC_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	this._drill_ITC_isDrawingItemName = true;		//绘制标记 - 开
	this._drill_ITC_curItem = item;					//当前的物品对象
	
	_drill_ITC_drawItemName.call(this, item, x, y, width);
	
	this._drill_ITC_isDrawingItemName = false;		//绘制标记 - 关
}
//=============================
// * 物品文本 - 根据标识修改颜色
//=============================
var _drill_ITC_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {

	// > 绘制
	if( this._drill_ITC_isDrawingItemName == true ){
		var item = this._drill_ITC_curItem;
		if( DataManager.isItem(item) ){
			var item__id = item.id;
			if( $dataItems[item.id].baseItemId ){ item__id = $dataItems[item.id].baseItemId; }	//Yep物品核心兼容
			var color = $gameTemp.drill_ITC_getColorCode_Item( item__id );
			if( color != "" ){this.changeTextColor(color);}
		}
		if( DataManager.isWeapon(item) ){
			var item__id = item.id;
			if( $dataWeapons[item.id].baseItemId ){ item__id = $dataWeapons[item.id].baseItemId; }
			var color = $gameTemp.drill_ITC_getColorCode_Weapon( item__id );
			if( color != "" ){this.changeTextColor(color);}
		}
		if( DataManager.isArmor(item) ){
			var item__id = item.id;
			if( $dataArmors[item.id].baseItemId ){ item__id = $dataArmors[item.id].baseItemId; }
			var color = $gameTemp.drill_ITC_getColorCode_Armor( item__id );
			if( color != "" ){this.changeTextColor(color);}
		}
		if( DataManager.isSkill(item) ){
			var color = $gameTemp.drill_ITC_getColorCode_Skill( item.id );
			if( color != "" ){this.changeTextColor(color);}
		}
	}
	
	_drill_ITC_drawText.call(this, text, x, y, maxWidth, align);
	
	// > 绘制后颜色恢复
	if( this._drill_ITC_isDrawingItemName == true ){
		this.resetTextColor();
	}
}

//=============================================================================
// ** 兼容 mog技能浮动框/气泡框相适应
//=============================================================================
if(Imported.MOG_ActionName ){
	
	var _drill_ITC_mog_refreshSkillName = SpriteSkillName.prototype.refreshSkillName;
	SpriteSkillName.prototype.refreshSkillName = function() {
		
		if(Imported.MOG_ActionName && DrillUp.g_ITC_mog_action){
			var item = this.item();
			if( DataManager.isItem(item) ){
				var item__id = item.id;
				if( $dataItems[item.id].baseItemId ){ item__id = $dataItems[item.id].baseItemId; }	//Yep物品核心兼容
				var color = $gameTemp.drill_ITC_getColorCode_Item( item__id );
				if( color != "" ){this._name.bitmap.textColor = color;}
			}
			if( DataManager.isWeapon(item) ){
				var item__id = item.id;
				if( $dataWeapons[item.id].baseItemId ){ item__id = $dataWeapons[item.id].baseItemId; }
				var color = $gameTemp.drill_ITC_getColorCode_Weapon( item__id );
				if( color != "" ){this._name.bitmap.textColor = color;}
			}
			if( DataManager.isArmor(item) ){
				var item__id = item.id;
				if( $dataArmors[item.id].baseItemId ){ item__id = $dataArmors[item.id].baseItemId; }
				var color = $gameTemp.drill_ITC_getColorCode_Armor( item__id );
				if( color != "" ){this._name.bitmap.textColor = color;}
			}
			if( DataManager.isSkill(item) ){
				var color = $gameTemp.drill_ITC_getColorCode_Skill( item.id );
				if( color != "" ){this._name.bitmap.textColor = color;}
			}
			_drill_ITC_mog_refreshSkillName.call(this);
			this._name.bitmap.textColor = "#ffffff";
		}else{
			_drill_ITC_mog_refreshSkillName.call(this);
		}
	};
}
//=============================================================================
// ** 兼容 mog战斗结果界面
//=============================================================================
if(Imported.MOG_BattleResult ){
	
	var _drill_ITC_mog_BattleResult_addIcon = BattleResult.prototype.addIcon;
	BattleResult.prototype.addIcon = function(sprite,data) {
		_drill_ITC_mog_BattleResult_addIcon.call(this,sprite,data);
		var name_sprite = sprite.children[sprite.children.length-1];		//获取上一个添加的child
		if( name_sprite ){
			name_sprite.bitmap = new Bitmap(160,32);
			
			if( DataManager.isItem(data) ){
				var item__id = data.id;
				if( $dataItems[data.id].baseItemId ){ item__id = $dataItems[data.id].baseItemId; }	//Yep物品核心兼容
				var color = $gameTemp.drill_ITC_getColorCode_Item( item__id );
				if( color != "" ){ name_sprite.bitmap.textColor = color;}
			}
			if( DataManager.isWeapon(data) ){
				var item__id = data.id;
				if( $dataWeapons[data.id].baseItemId ){ item__id = $dataWeapons[data.id].baseItemId; }
				var color = $gameTemp.drill_ITC_getColorCode_Weapon( item__id );
				if( color != "" ){ name_sprite.bitmap.textColor = color;}
			}
			if( DataManager.isArmor(data) ){
				var item__id = data.id;
				if( $dataArmors[data.id].baseItemId ){ item__id = $dataArmors[data.id].baseItemId; }
				var color = $gameTemp.drill_ITC_getColorCode_Armor( item__id );
				if( color != "" ){ name_sprite.bitmap.textColor = color;}
			}
			if( DataManager.isSkill(data) ){
				var color = $gameTemp.drill_ITC_getColorCode_Skill( data.id );
				if( color != "" ){ name_sprite.bitmap.textColor = color;}
			}
			name_sprite.bitmap.drawText(data.name,0,0,160,32);
			name_sprite.bitmap.textColor = "#ffffff";
		}
	}
}
//=============================================================================
// ** 兼容 mog道具浮动文字（覆写）
//=============================================================================
if( Imported.MOG_TreasurePopup ){
	
	TreasureIcons.prototype.refreshName = function() {
		this._name.bitmap.clear();
		var name = this._item ? this._item.name + " x " + this._amount : this._amount;
		
		var item = this._item;
		if( DataManager.isItem(item) ){
			var item__id = item.id;
			if( $dataItems[item.id].baseItemId ){ item__id = $dataItems[item.id].baseItemId; }	//Yep物品核心兼容
			var color = $gameTemp.drill_ITC_getColorCode_Item( item__id );
			if( color != "" ){this._name.bitmap.textColor = color;}
		}
		if( DataManager.isWeapon(item) ){
			var item__id = item.id;
			if( $dataWeapons[item.id].baseItemId ){ item__id = $dataWeapons[item.id].baseItemId; }
			var color = $gameTemp.drill_ITC_getColorCode_Weapon( item__id );
			if( color != "" ){this._name.bitmap.textColor = color;}
		}
		if( DataManager.isArmor(item) ){
			var item__id = item.id;
			if( $dataArmors[item.id].baseItemId ){ item__id = $dataArmors[item.id].baseItemId; }
			var color = $gameTemp.drill_ITC_getColorCode_Armor( item__id );
			if( color != "" ){this._name.bitmap.textColor = color;}
		}
		if( DataManager.isSkill(item) ){
			var color = $gameTemp.drill_ITC_getColorCode_Skill( item.id );
			if( color != "" ){this._name.bitmap.textColor = color;}
		}
		this._name.bitmap.drawText(name,0,0,145,32);
		this._name.bitmap.textColor = "#ffffff";
	};
}
//=============================================================================
// ** 兼容 mog道具浮动框（覆写）
//=============================================================================
if( Imported.MOG_TreasureHud  ){
	
	Treasure_Hud.prototype.refresh_name = function() {
		this._text.bitmap.clear();
		var text = String(this.number() + " " + this.name());
		
		var item = this.item();
		if( DataManager.isItem(item) ){
			var item__id = item.id;
			if( $dataItems[item.id].baseItemId ){ item__id = $dataItems[item.id].baseItemId; }	//Yep物品核心兼容
			var color = $gameTemp.drill_ITC_getColorCode_Item( item__id );
			if( color != "" ){this._text.bitmap.textColor = color;}
		}
		if( DataManager.isWeapon(item) ){
			var item__id = item.id;
			if( $dataWeapons[item.id].baseItemId ){ item__id = $dataWeapons[item.id].baseItemId; }
			var color = $gameTemp.drill_ITC_getColorCode_Weapon( item__id );
			if( color != "" ){this._text.bitmap.textColor = color;}
		}
		if( DataManager.isArmor(item) ){
			var item__id = item.id;
			if( $dataArmors[item.id].baseItemId ){ item__id = $dataArmors[item.id].baseItemId; }
			var color = $gameTemp.drill_ITC_getColorCode_Armor( item__id );
			if( color != "" ){this._text.bitmap.textColor = color;}
		}
		if( DataManager.isSkill(item) ){
			var color = $gameTemp.drill_ITC_getColorCode_Skill( item.id );
			if( color != "" ){this._text.bitmap.textColor = color;}
		}
		this._text.bitmap.drawText(text,0,0,160,32,"left");
		this._text.bitmap.textColor = "#ffffff";
	};

}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_ItemTextColor = false;
		alert(
			"【Drill_ItemTextColor.js UI-物品+技能文本颜色】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfColor 窗口字符-颜色核心"
		);
}