//=============================================================================
// Drill_ItemTextFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        UI - 物品+技能文本的滤镜效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_ItemTextFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以任意设置物品、装备、防具、技能文本的滤镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter            系统-滤镜核心
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.2及以上★★
 *     需要该核心才能添加滤镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   作用于物品、技能的名称。
 * 2.想要更多了解滤镜，可以去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.该插件与 UI-物品+技能文本颜色 相互独立。
 *   (2.该插件不支持 技能块元素 的滤镜变色。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件：
 * 在要修改颜色的 物品/武器/护甲/技能 下，添加注释即可：
 * （注意，冒号左右两边都没有空格）
 * 
 * 物品注释：<滤镜:噪点滤镜:55>
 * 武器注释：<滤镜:噪点滤镜:55>
 * 护甲注释：<滤镜:噪点滤镜:55>
 * 技能注释：<滤镜:噪点滤镜:55>
 * 
 * 物品注释：<滤镜:纯色滤镜:纯蓝:55>
 * 物品注释：<滤镜:着色滤镜:黑白:255>
 * 物品注释：<滤镜:填充滤镜:紫色:255>
 * 物品注释：<滤镜:模糊滤镜:55>
 * 物品注释：<滤镜:噪点滤镜:55>
 * 
 * 物品注释：<滤镜:波动纯色滤镜:纯蓝:155:60>
 * 物品注释：<滤镜:波动着色滤镜:黑白:255:60>
 * 物品注释：<滤镜:波动填充滤镜:紫色:255:60>
 * 物品注释：<滤镜:波动模糊滤镜:55:60>
 * 物品注释：<滤镜:波动噪点滤镜:55:60>
 *
 * 1.填写注释的滤镜可以相互叠加。
 * 2.填充滤镜设置中，你可以填自定义颜色的颜色代码。
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
 * 时间复杂度： o(n)*o(贴图处理)*o(滤镜) 每帧
 * 测试方法：   在不同界面进行相应性能检测测试。
 * 测试结果：   战斗界面的技能、物品中，消耗为：【32.27ms】
 *              菜单界面的技能、物品中，消耗为：【30.98ms】
 *              地图界面的事件指令选择物品中，消耗为：【22.90ms】
 * 测试方法2：  在菜单界面中以正常游戏流程进行测试。
 * 测试结果2：  5个含波动滤镜的物品，消耗为：【30.98ms】
 *              10个含波动滤镜的物品，消耗为：【36.03ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的【20ms】范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.滤镜是性能消耗大户，因为带滤镜的图片效果都是通过即时演算形成的。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了该插件浪费存储空间的bug。
 * [v1.2]
 * 更新并兼容了新的窗口字符底层。
 * [v1.3]
 * 修复了使用 窗口字符贴图 时显示不正常的bug。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ITFi (Item_Text_Filter)
//		临时全局变量	DrillUp.g_ITFi_xxx
//		临时局部变量	$gameTemp._drill_ITFi_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	BattleResult.prototype.addIcon（mog）
//						TreasureIcons.prototype.refreshName（mog）
//						Treasure_Hud.prototype.refresh_name（mog）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	菜单界面的物品
//		★性能测试消耗	26.03ms ~ 20.98ms   22.90ms(地图界面)
//		★最坏情况		出现超多的物品的窗口，并且都是波动滤镜
//		★备注			该插件在地图界面居然在消耗，不确定是不是附着了某个方法而出现的消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			
//			->滤镜数据
//			->滤镜兼容
//				->兼容 mog技能浮动框/招式名气泡框
//				->兼容 mog战斗结果界面
//				->兼容 mog道具浮动文字
//				->兼容 mog道具浮动框
//			
//			->☆字符块容器
//			->☆字符块的滤镜
//		
//		
//		★家谱：
//			大家族-滤镜效果
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.这里的滤镜配置存储在$gameTemp里面，与 物品/武器/护甲/技能 一一对应。
//			  （与其他滤镜不太一样，其它滤镜附着在对象中。）
//			2.物品类型是固定的四种，直接与DataManager的数据文件对齐，与Game_Item没有任何关系。
//		
//		★其它说明细节：
//			1. 2025-12-18：
//				已将滤镜作用于的贴图，对应到了 窗口字符贴图 上。
//				原来的贴图结构去掉了。
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
	DrillUp.g_ITFi_PluginTip_curName = "Drill_ItemTextFilter.js UI-物品+技能文本的滤镜效果";
	DrillUp.g_ITFi_PluginTip_baseList = [
		"Drill_CoreOfFilter.js 系统-滤镜核心",
		"Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_ITFi_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_ITFi_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_ITFi_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_ITFi_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_ITFi_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_ITFi_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_ITFi_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_ItemTextFilter = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_ItemTextFilter');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFilter &&
	Imported.Drill_CoreOfWindowCharacter ){


//==============================
// * 基于插件检测 - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_ITFi_getPluginTip_NeedUpdate_drawText() );
}



//=============================================================================
// ** 滤镜数据
//=============================================================================
//==============================
// * 滤镜数据 - 初始化
//==============================
var _drill_ITFi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_ITFi_temp_initialize.call(this);
	
	// > 容器初始化
	this._drill_ITFi_items = [];
	this._drill_ITFi_weapons = [];
	this._drill_ITFi_armors = [];
	this._drill_ITFi_skills = [];
	
	// > 对象初始化
	for( var i = 0; i < $dataItems.length; i++ ){	//物品
		f_data = {};
		f_data.openFilter = false;
		f_data.setPureLinear = ["",0,0];		//临时赋值用的数组
		f_data.setColorLinear = ["",0,0];
		f_data.setFillLinear = ["",0,0];
		f_data.setBlurLinear = [0,0];
		f_data.setNoiseLinear = [0,0];
		f_data.setPureWave = ["",0,0];
		f_data.setColorWave = ["",0,0];
		f_data.setFillWave = ["",0,0];
		f_data.setBlurWave = [0,0];
		f_data.setNoiseWave = [0,0];
		this._drill_ITFi_items[i] = f_data;
	}
	for( var i = 0; i < $dataWeapons.length; i++ ){	//武器
		f_data = {};
		f_data.openFilter = false;
		f_data.setPureLinear = ["",0,0];	
		f_data.setColorLinear = ["",0,0];
		f_data.setFillLinear = ["",0,0];
		f_data.setBlurLinear = [0,0];
		f_data.setNoiseLinear = [0,0];
		f_data.setPureWave = ["",0,0];
		f_data.setColorWave = ["",0,0];
		f_data.setFillWave = ["",0,0];
		f_data.setBlurWave = [0,0];
		f_data.setNoiseWave = [0,0];
		this._drill_ITFi_weapons[i] = f_data;
	}
	for( var i = 0; i < $dataArmors.length; i++ ){	//护甲
		f_data = {};
		f_data.openFilter = false;
		f_data.setPureLinear = ["",0,0];	
		f_data.setColorLinear = ["",0,0];
		f_data.setFillLinear = ["",0,0];
		f_data.setBlurLinear = [0,0];
		f_data.setNoiseLinear = [0,0];
		f_data.setPureWave = ["",0,0];
		f_data.setColorWave = ["",0,0];
		f_data.setFillWave = ["",0,0];
		f_data.setBlurWave = [0,0];
		f_data.setNoiseWave = [0,0];
		this._drill_ITFi_armors[i] = f_data;
	}
	for( var i = 0; i < $dataSkills.length; i++ ){	//技能
		f_data = {};
		f_data.openFilter = false;
		f_data.setPureLinear = ["",0,0];	
		f_data.setColorLinear = ["",0,0];
		f_data.setFillLinear = ["",0,0];
		f_data.setBlurLinear = [0,0];
		f_data.setNoiseLinear = [0,0];
		f_data.setPureWave = ["",0,0];
		f_data.setColorWave = ["",0,0];
		f_data.setFillWave = ["",0,0];
		f_data.setBlurWave = [0,0];
		f_data.setNoiseWave = [0,0];
		this._drill_ITFi_skills[i] = f_data;
	}
	
	// >注释初始化
	for( var i = 0; i < $dataItems.length; i++ ){	//物品
		if( $dataItems[i] == null ){ continue; }
		var note = String($dataItems[i].note);
		this._drill_ITFi_items[i] = this.drill_ITFi_convertFilterData(note,this._drill_ITFi_items[i]);
	}
	for( var i = 0; i < $dataWeapons.length; i++ ){	//武器
		if( $dataWeapons[i] == null ){ continue; }
		var note = String($dataWeapons[i].note);
		this._drill_ITFi_weapons[i] = this.drill_ITFi_convertFilterData(note,this._drill_ITFi_weapons[i]);
	}
	for( var i = 0; i < $dataArmors.length; i++ ){	//护甲
		if( $dataArmors[i] == null ){ continue; }
		var note = String($dataArmors[i].note);
		this._drill_ITFi_armors[i] = this.drill_ITFi_convertFilterData(note,this._drill_ITFi_armors[i]);
	}
	for( var i = 0; i < $dataSkills.length; i++ ){	//技能
		if( $dataSkills[i] == null ){ continue; }
		var note = String($dataSkills[i].note);
		this._drill_ITFi_skills[i] = this.drill_ITFi_convertFilterData(note,this._drill_ITFi_skills[i]);
	}
};
//==============================
// * 滤镜数据 - 解析注释
//==============================
Game_Temp.prototype.drill_ITFi_convertFilterData = function( note, f_data ){
	var note_list = note.split('\n');
	for(var i=0; i< note_list.length; i++){
		var re_filter = /<(滤镜):([^<>]*?)>/; 				//正则获取（返回数组，第二个为匹配内容）
		var commands = (note_list[i].match(re_filter)) || [];
		if( commands != "" && commands != [] ){
			var args = commands[2].split(':');
			if(args.length >= 2 && args.length <= 4){
				var type = String(args[0]);
				var temp1 = String(args[1]);
				if( args[2]!=undefined ){ var temp2 = String(args[2]); };
				if( args[3]!=undefined ){ var temp3 = String(args[3]); };
				if( type == "纯色滤镜" ){		//<滤镜:纯色滤镜:纯蓝:55>
					f_data.openFilter = true;
					f_data.setPureLinear = [ String(temp1),Number(temp2),0 ];
				}
				if( type == "着色滤镜" ){
					f_data.openFilter = true;
					f_data.setColorLinear = [ String(temp1),Number(temp2),0 ];
				}
				if( type == "填充滤镜" ){
					f_data.openFilter = true;
					f_data.setFillLinear = [ String(temp1),Number(temp2),0 ];
				}
				if( type == "模糊滤镜" ){		//<滤镜:噪点滤镜:55>
					f_data.openFilter = true;
					f_data.setBlurLinear = [ Number(temp1),0 ];
				}
				if( type == "噪点滤镜" ){
					f_data.openFilter = true;
					f_data.setNoiseLinear = [ Number(temp1),0 ];
				}
				if( type == "波动纯色滤镜" ){	//<滤镜:波动纯色滤镜:纯蓝:55:60>
					f_data.openFilter = true;
					f_data.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动着色滤镜" ){
					f_data.openFilter = true;
					f_data.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动填充滤镜" ){
					f_data.openFilter = true;
					f_data.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动模糊滤镜" ){	//<滤镜:波动噪点滤镜:55:60>
					f_data.openFilter = true;
					f_data.setBlurWave = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动噪点滤镜" ){
					f_data.openFilter = true;
					f_data.setNoiseWave = [ Number(temp1),Number(temp2) ];
				}
			}
		}
	}
	return f_data;
};
//==============================
// * 滤镜数据 - 获取 - 物品
//==============================
Game_Temp.prototype.drill_ITFi_getFilterData_Item = function( i ){
	
	// > 兼容 - Yep物品核心
	if( $dataItems[i] == undefined ){ return null; }
	if( $dataItems[i].baseItemId != undefined ){ i = $dataItems[i].baseItemId; }
	
	return this._drill_ITFi_items[i];
}
//==============================
// * 滤镜数据 - 获取 - 武器
//==============================
Game_Temp.prototype.drill_ITFi_getFilterData_Weapon = function( i ){

	// > 兼容 - Yep物品核心
	if( $dataWeapons[i] == undefined ){ return null; }
	if( $dataWeapons[i].baseItemId != undefined ){ i = $dataWeapons[i].baseItemId; }
	
	return this._drill_ITFi_weapons[i];
}
//==============================
// * 滤镜数据 - 获取 - 护甲
//==============================
Game_Temp.prototype.drill_ITFi_getFilterData_Armor = function( i ){

	// > 兼容 - Yep物品核心
	if( $dataArmors[i] == undefined ){ return null; }
	if( $dataArmors[i].baseItemId != undefined ){ i = $dataArmors[i].baseItemId; }
	
	return this._drill_ITFi_armors[i];
}
//==============================
// * 滤镜数据 - 获取 - 技能
//==============================
Game_Temp.prototype.drill_ITFi_getFilterData_Skill = function( i ){
	return this._drill_ITFi_skills[i];
}



//=============================================================================
// ** 滤镜兼容
//=============================================================================
//==============================
// * 滤镜兼容 - 兼容 mog技能浮动框/招式名气泡框
//==============================
if(Imported.MOG_ActionName ){
	
	var _drill_ITFi_mog_ActionName_update = SpriteSkillName.prototype.update;
	SpriteSkillName.prototype.update = function() {
		_drill_ITFi_mog_ActionName_update.call(this);
		
		// >物品数据初始化
		var data;
		var text_sprite = this._name;
		var item = this.item();
		var f_data = {};
		f_data.openFilter = false;
		f_data.setPureLinear = ["",0,0];
		f_data.setColorLinear = ["",0,0];
		f_data.setFillLinear = ["",0,0];
		f_data.setBlurLinear = [0,0];
		f_data.setNoiseLinear = [0,0];
		f_data.setPureWave = ["",0,0];
		f_data.setColorWave = ["",0,0];
		f_data.setFillWave = ["",0,0];
		f_data.setBlurWave = [0,0];
		f_data.setNoiseWave = [0,0];
		if (DataManager.isSkill(item)){  f_data = $gameTemp.drill_ITFi_getFilterData_Skill(item.id); };
		if (DataManager.isItem(item)){  
			f_data = $gameTemp.drill_ITFi_getFilterData_Item(item.id); 
			if( $dataItems[item.id].baseItemId ){	//Yep物品核心兼容
				f_data = $gameTemp.drill_ITFi_getFilterData_Item($dataItems[item.id].baseItemId); 
			}
		}	
		if (DataManager.isWeapon(item)){  f_data = $gameTemp.drill_ITFi_getFilterData_Weapon(item.id); }
		if (DataManager.isArmor(item)){  f_data = $gameTemp.drill_ITFi_getFilterData_Armor(item.id); }
		
		//>滤镜初始化
		if( text_sprite.drill_COF_isInited() == false ){
			text_sprite.drill_COF_initialize();
		}
		
		//>插件指令配置 - 线性
		data = f_data.setPureLinear;	
		text_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorLinear;
		text_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillLinear;
		text_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurLinear;
		text_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = f_data.setNoiseLinear;
		text_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		//>插件指令配置 - 波动
		data = f_data.setPureWave;	
		text_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorWave;
		text_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillWave;
		text_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurWave;
		text_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = f_data.setNoiseWave;
		text_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	};
}
//==============================
// * 滤镜兼容 - 兼容 mog战斗结果界面
//==============================
if(Imported.MOG_BattleResult ){
	
	var _drill_ITFi_mog_BattleResult_addIcon = BattleResult.prototype.addIcon;
	BattleResult.prototype.addIcon = function(sprite,data) {
		_drill_ITFi_mog_BattleResult_addIcon.call(this,sprite,data);
		var name_sprite = sprite.children[sprite.children.length-1];		//获取上一个添加的child
		if( name_sprite ){
			name_sprite._drill_ITFi_itemId = data.id;	//无法获取到itemid
			if (DataManager.isSkill(data)) {
				name_sprite._drill_ITFi_itemType = '技能';
			} else if (DataManager.isItem(data)) {
				name_sprite._drill_ITFi_itemType = '物品';
			} else if (DataManager.isWeapon(data)) {
				name_sprite._drill_ITFi_itemType = '武器';
			} else if (DataManager.isArmor(data)) {
				name_sprite._drill_ITFi_itemType = '护甲';
			}
			
			if( !this._drill_ITFi_nameTank ){ this._drill_ITFi_nameTank = []; }
			this._drill_ITFi_nameTank.push(name_sprite);
		}
	}
	var _drill_ITFi_mog_BattleResult_update = BattleResult.prototype.update;
	BattleResult.prototype.update = function() {
		
		// > 优化 - 不准在非战斗情况下刷新此贴图
		if( $gameParty.inBattle() == false ){ return; }
		
		_drill_ITFi_mog_BattleResult_update.call(this);
		
		if ( !this._drill_ITFi_nameTank ) { return; }
		if ( this._drill_ITFi_nameTank.length == 0 ) { return; }
		
		for(var i=0; i< this._drill_ITFi_nameTank.length; i++){	//遍历sprite的临时 id和类型，获取system的滤镜设置
			var text_sprite = this._drill_ITFi_nameTank[i];
			var item__id = text_sprite._drill_ITFi_itemId;
			var item_type = text_sprite._drill_ITFi_itemType;
			if ( !item__id ) { continue; }
			if ( !item_type ) { continue; }
			
			var data;
			if ( item_type == "技能" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Skill(item__id); }
			if ( item_type == "物品" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Item(item__id); }
			if ( item_type == "武器" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Weapon(item__id); }
			if ( item_type == "护甲" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Armor(item__id); }
			
			//>滤镜初始化
			if( text_sprite.drill_COF_isInited() == false ){
				text_sprite.drill_COF_initialize();
			}
			
			//>插件指令配置 - 线性
			data = f_data.setPureLinear;	
			text_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
			data = f_data.setColorLinear;
			text_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
			data = f_data.setFillLinear;
			text_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
			data = f_data.setBlurLinear;
			text_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
			data = f_data.setNoiseLinear;
			text_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
			
			//>插件指令配置 - 波动
			data = f_data.setPureWave;	
			text_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
			data = f_data.setColorWave;
			text_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
			data = f_data.setFillWave;
			text_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
			data = f_data.setBlurWave;
			text_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
			data = f_data.setNoiseWave;
			text_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		}
	}
}
//==============================
// * 滤镜兼容 - 兼容 mog道具浮动文字
//==============================
if( Imported.MOG_TreasurePopup ){
	
	var _drill_ITFi_mog_TreasurePopup_update = TreasureIcons.prototype.update;
	TreasureIcons.prototype.update = function() {
		_drill_ITFi_mog_TreasurePopup_update.call(this);
		
		// >物品数据初始化
		var data;
		var text_sprite = this._name;
		var item = this._item;
		if (!item){ return; }
		if (DataManager.isSkill(item)){ var f_data = $gameTemp.drill_ITFi_getFilterData_Skill(item.id); };
		if (DataManager.isItem(item)){
			var f_data = $gameTemp.drill_ITFi_getFilterData_Item(item.id); 
			if( $dataItems[item.id].baseItemId ){	//Yep物品核心兼容
				f_data = $gameTemp.drill_ITFi_getFilterData_Item($dataItems[item.id].baseItemId); 
			}
		}
		if (DataManager.isWeapon(item)){ var f_data = $gameTemp.drill_ITFi_getFilterData_Weapon(item.id); }
		if (DataManager.isArmor(item)){ var f_data = $gameTemp.drill_ITFi_getFilterData_Armor(item.id); }
		if (!f_data){ return; }
		
		//>滤镜初始化
		if( text_sprite.drill_COF_isInited() == false ){
			text_sprite.drill_COF_initialize();
		}
		
		//>插件指令配置 - 线性
		data = f_data.setPureLinear;	
		text_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorLinear;
		text_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillLinear;
		text_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurLinear;
		text_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = f_data.setNoiseLinear;
		text_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		//>插件指令配置 - 波动
		data = f_data.setPureWave;	
		text_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorWave;
		text_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillWave;
		text_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurWave;
		text_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = f_data.setNoiseWave;
		text_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	};
}
//==============================
// * 滤镜兼容 - 兼容 mog道具浮动框
//==============================
if( Imported.MOG_TreasureHud  ){
	
	var _drill_ITFi_mog_TreasureHud_update = Treasure_Hud.prototype.update;
	Treasure_Hud.prototype.update = function() {
		_drill_ITFi_mog_TreasureHud_update.call(this);
		
		// >物品数据初始化
		var data;
		var text_sprite = this._text;
		var item = this.item();
		var f_data = {};
		f_data.openFilter = false;
		f_data.setPureLinear = ["",0,0];
		f_data.setColorLinear = ["",0,0];
		f_data.setFillLinear = ["",0,0];
		f_data.setBlurLinear = [0,0];
		f_data.setNoiseLinear = [0,0];
		f_data.setPureWave = ["",0,0];
		f_data.setColorWave = ["",0,0];
		f_data.setFillWave = ["",0,0];
		f_data.setBlurWave = [0,0];
		f_data.setNoiseWave = [0,0];
		if (DataManager.isSkill(item)){  f_data = $gameTemp.drill_ITFi_getFilterData_Skill(item.id); };
		if (DataManager.isItem(item)){
			f_data = $gameTemp.drill_ITFi_getFilterData_Item(item.id);
			if( $dataItems[item.id].baseItemId ){	//Yep物品核心兼容
				f_data = $gameTemp.drill_ITFi_getFilterData_Item($dataItems[item.id].baseItemId); 
			}
		}
		if (DataManager.isWeapon(item)){  f_data = $gameTemp.drill_ITFi_getFilterData_Weapon(item.id); }
		if (DataManager.isArmor(item)){  f_data = $gameTemp.drill_ITFi_getFilterData_Armor(item.id); }
		
		//>滤镜初始化
		if( text_sprite.drill_COF_isInited() == false ){
			text_sprite.drill_COF_initialize();
		}
		
		//>插件指令配置 - 线性
		data = f_data.setPureLinear;	
		text_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorLinear;
		text_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillLinear;
		text_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurLinear;
		text_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = f_data.setNoiseLinear;
		text_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		//>插件指令配置 - 波动
		data = f_data.setPureWave;	
		text_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorWave;
		text_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillWave;
		text_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurWave;
		text_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = f_data.setNoiseWave;
		text_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		
	};
}



//=============================================================================
// ** ☆字符块容器
//
//			说明：	> 该模块提供 字符块贴图 绑定的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//=============================
// * 字符块容器 - 初始化
//=============================
var _drill_ITFi_window_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function( x, y, width, height ){
	_drill_ITFi_window_initialize.call(this, x, y, width, height);
	this._drill_ITFi_spriteTank = [];
};
//=============================
// * 字符块容器 - 字符块文本设置
//
//			说明：	> 由于窗口字符核心覆写了 drawText 函数，所以这里 继承 窗口字符核心函数。
//=============================
var _drill_ITFi_COWC_org_drawText = Window_Base.prototype.drill_COWC_org_drawText;
Window_Base.prototype.drill_COWC_org_drawText = function( text, x, y, maxWidth, align ){
	
	// > 绘制标记 - 执行
	if( this._drill_ITFi_isDrawingItemName == true ){
		
		// > 直接把所有物品名称变成 字符块
		text = "\\dts[" + text + "]";
		
		//// > 颜色文本拼接【UI-物品+技能文本颜色】
		//if( this._drill_ITC_curCode != undefined ){
		//	text = "\\cc[oSave]\\cc["+ this._drill_ITC_curCode +"]"+ text +"\\cc[oLoad]";
		//}
	}
	
	// > 原函数
	_drill_ITFi_COWC_org_drawText.call( this, text, x, y, maxWidth, align );
};
//=============================
// * 字符块容器 - 字符块贴图设置
//
//			说明：	> 由于窗口字符核心覆写了 drawItemName 函数，所以这里 继承 窗口字符核心函数。
//=============================
var _drill_ITFi_COWC_org_drawItemName = Window_Base.prototype.drill_COWC_org_drawItemName;
Window_Base.prototype.drill_COWC_org_drawItemName = function( item, x, y, width ){
	this._drill_ITFi_isDrawingItemName = true;		//绘制标记 - 开
	
	// > 原函数
	_drill_ITFi_COWC_org_drawItemName.call(this, item, x, y, width);
	
	// > 绘制标记 - 执行
	if( this._drill_ITFi_isDrawingItemName == true ){
		
		// > 『字符贴图流程』 - 刷新当前的字符块贴图【窗口字符 - 窗口字符贴图核心】
		//this.drill_COWCSp_sprite_refreshAllSprite();	//（此处不需要刷新，因为 drill_COWC_org_drawText 中已经刷过一次了）
		
		// > 获取贴图
		//		（矩形获取总是有小问题获取不到）
		//var rect = {};
		//rect['x'] = x;
		//rect['y'] = y;
		//rect['width'] = width;
		//rect['height'] = this.lineHeight();
		//alert( "物品滤镜插件，矩形位置：" + JSON.stringify( rect ) );
		//var temp_sprite_list = this.drill_COWCSp_sprite_getSpriteInRect( rect );
		
		
		// > 获取贴图【窗口字符 - 窗口字符贴图核心】
		//		（直接获取最后一个字符块贴图）
		var temp_sprite_list = this.drill_COWCSp_sprite_getAllSprite();
		if( temp_sprite_list.length > 0 ){
			var temp_sprite = temp_sprite_list[temp_sprite_list.length-1];
			
			// > 物品数据初始化
			if( item != undefined ){
				temp_sprite._drill_ITFi_itemId = item.id;
				if( DataManager.isSkill(item) ){
					temp_sprite._drill_ITFi_itemType = "技能";
				}else if( DataManager.isItem(item) ){
					temp_sprite._drill_ITFi_itemType = "物品";
				}else if( DataManager.isWeapon(item) ){
					temp_sprite._drill_ITFi_itemType = "武器";
				}else if( DataManager.isArmor(item) ){
					temp_sprite._drill_ITFi_itemType = "护甲";
				}
			}
			
			//// > 测试，强制加颜色板
			//var temp_sprite_2 = new Sprite();
			//temp_sprite_2.anchor.x = temp_sprite.anchor.x;
			//temp_sprite_2.anchor.y = temp_sprite.anchor.y;
			//temp_sprite_2.bitmap = temp_sprite.bitmap;
			//temp_sprite_2.blendMode = 2;
			//temp_sprite_2.setBlendColor([255, 0, 0, 255]);
			//temp_sprite.addChild( temp_sprite_2 );
			
			this._drill_ITFi_spriteTank.push(temp_sprite);
		}
	}
	this._drill_ITFi_isDrawingItemName = false;		//绘制标记 - 关
};


//=============================================================================
// ** ☆字符块的滤镜
//
//			说明：	> 该模块专门进行 滤镜设置。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//=============================
// * 字符块的滤镜 - 帧刷新绑定
//=============================
var _drill_ITFi_window_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
	_drill_ITFi_window_update.call(this);
	this.drill_ITFi_updateItemTextFilter();	//帧刷新 - 滤镜效果
	this.drill_ITFi_updateSpriteRemove();	//帧刷新 - 删除滤镜
}
//=============================
// * 字符块的滤镜 - 帧刷新 滤镜效果
//=============================
Window_Base.prototype.drill_ITFi_updateItemTextFilter = function() {
	if( this._drill_ITFi_spriteTank == undefined ){ return; }
	if( this._drill_ITFi_spriteTank.length == 0 ){ return; }
	
	for(var i=0; i < this._drill_ITFi_spriteTank.length; i++){	//遍历sprite的临时 id和类型，获取system的滤镜设置
		var text_sprite = this._drill_ITFi_spriteTank[i];
		var item__id = text_sprite._drill_ITFi_itemId;
		var item_type = text_sprite._drill_ITFi_itemType;
		if( item__id == undefined ){ continue; }
		if( item_type == undefined ){ continue; }
		
		var data;
		if( item_type == "技能" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Skill(item__id); }
		if( item_type == "物品" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Item(item__id); }
		if( item_type == "武器" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Weapon(item__id); }
		if( item_type == "护甲" ){ var f_data = $gameTemp.drill_ITFi_getFilterData_Armor(item__id); }
		
		// > 滤镜初始化
		if( text_sprite.drill_COF_isInited() == false ){
			text_sprite.drill_COF_initialize();
		}
		
		// > 插件指令配置 - 线性
		data = f_data.setPureLinear;	
		text_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorLinear;
		text_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillLinear;
		text_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurLinear;
		text_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = f_data.setNoiseLinear;
		text_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		// > 插件指令配置 - 波动
		data = f_data.setPureWave;	
		text_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setColorWave;
		text_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setFillWave;
		text_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = f_data.setBlurWave;
		text_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = f_data.setNoiseWave;
		text_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	}
}
//=============================
// * 字符块的滤镜 - 帧刷新 删除滤镜
//=============================
Window_Base.prototype.drill_ITFi_updateSpriteRemove = function() {
	if( this._drill_ITFi_spriteTank == undefined ){ return; }
	if( this._drill_ITFi_spriteTank.length == 0 ){ return; }
	
	// > 获取字符块贴图-全部【窗口字符 - 窗口字符贴图核心】
	var temp_sprite_list = this.drill_COWCSp_sprite_getAllSprite();
	
	// > 删除滤镜（如果字符块贴图列表中，没有滤镜的父贴图，就删除）
	for(var i = this._drill_ITFi_spriteTank.length-1; i >= 0; i-- ){
		var cur_sprite = this._drill_ITFi_spriteTank[i];
		if( temp_sprite_list.contains(cur_sprite) ){
			//（不操作）
		}else{
			this._drill_ITFi_spriteTank.splice( i, 1 );
		}
	}
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_ItemTextFilter = false;
		var pluginTip = DrillUp.drill_ITFi_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

	