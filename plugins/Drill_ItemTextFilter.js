//=============================================================================
// Drill_ItemTextFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        UI - 物品+技能文本的滤镜效果
 * @author Drill_up
 *
 * @help  
 * =============================================================================
 * +++ Drill_ItemTextFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以任意设置物品、装备、防具、技能文本的滤镜效果。
 * ★★必须放在 物品+技能文本颜色插件 的前面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter      系统-滤镜核心
 *     需要该核心才能添加滤镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   作用于物品、技能的名称。
 * 2.想要更多了解滤镜，可以去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.该插件与 UI-物品+技能文本颜色 相互独立，但是为了使得效果
 *      叠加，则必须放其前面。
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
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		ITFi (Item_Text_Filter)
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
//		★大体框架与功能如下：
//			物品+技能文本颜色：
//				->sprite - 伪装文本
//				->sprite - bitmap清理时一并删除
//				->sprite - 通过标识来过滤物品文本
//				->滤镜 - 存储/对应设置
//				->滤镜 - 物品/武器/护甲/技能 的分类
//				->滤镜 - 插件指令修改物品滤镜	x
//		
//		★必要注意事项：
//			1.这里的滤镜配置存储在$gameTemp里面，与 物品/武器/护甲/技能 一一对应。
//			  （与其他滤镜不太一样，其它滤镜附着在对象中。）
//			  物品类型是固定的四种，直接与DataManager的数据文件对齐，与Game_Item没有任何关系。
//			2.滤镜使用本体可能由于支持的内容太多，看起来较复杂。
//			  使用物品文本滤镜，必须走流程：>注释初始化 >物品数据初始化 >滤镜初始化 >滤镜配置
//			  （注释初始化直接存储在system中全局通用。）
//			3.归纳变色作用域：
//				覆写.drawItemName （作用于所有窗口）
//				mog技能浮动框
//				mog战斗结果界面
//				mog道具浮动文字
//				mog道具浮动框
//			  实际上通过sprite画出来的物品的，都需要手动变色，而窗口中的不存在问题。
//
//		★其它说明细节：
//			1.bitmap清理的clearRect有可能只是一个区域。
//			  通过清理的矩形，与sprite的矩形进行碰撞检测，来确定是否去除。
//			2.尝试过通过update的方式来处理。但是由于有延迟，不能即时去除sprite，所以弃用。
//			  这里直接采用 .xxx = this 的方式把父类指针给子类。
//			  注意，子类指向父类的指针，可能存在潜在的问题，这里需要留意。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_ItemTextFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_ItemTextFilter');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFilter ){


//=============================================================================
// ** 插件指令
//=============================================================================
// 暂无


//=============================================================================
// ** 临时数据
//=============================================================================
//==============================
// * 临时数据 - 初始化
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
// * 注释转滤镜内容
//==============================
Game_Temp.prototype.drill_ITFi_convertFilterData = function(note,f_data) {
	var note_list = note.split('\n');
	for(var i=0; i< note_list.length; i++){
		var re_filter = /<(滤镜):([^<>]*?)>/; 				//正则获取（返回数组，第二个为匹配内容）
		var commands = (note_list[i].match(re_filter)) || [];
		if(commands != "" && commands != [] ){
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
// ** 获取对象
//==============================
Game_Temp.prototype.drill_ITFi_getSkillFData = function(item_id) {
	return this._drill_ITFi_skills[item_id];
}
Game_Temp.prototype.drill_ITFi_getItemFData = function(item_id) {
	if( $dataItems[item_id].baseItemId ){		 	//Yep物品核心兼容
		return this._drill_ITFi_items[ $dataItems[item_id].baseItemId ];
	}
	return this._drill_ITFi_items[item_id];
}
Game_Temp.prototype.drill_ITFi_getWeaponFData = function(item_id) {
	if( $dataWeapons[item_id].baseItemId ){		 	//Yep物品核心兼容
		return this._drill_ITFi_weapons[ $dataWeapons[item_id].baseItemId ];
	}
	return this._drill_ITFi_weapons[item_id];
}
Game_Temp.prototype.drill_ITFi_getArmorFData = function(item_id) {
	if( $dataArmors[item_id].baseItemId ){		 	//Yep物品核心兼容
		return this._drill_ITFi_armors[ $dataArmors[item_id].baseItemId ];
	}
	return this._drill_ITFi_armors[item_id];
}



//=============================================================================
// ** 滤镜清除（矩形区域）
//=============================================================================
//=============================
// * 初始化
//=============================
var _drill_ITFi_w_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
	_drill_ITFi_w_initialize.call(this, x, y, width, height);
	this._drill_ITFi_spriteTank = [];
}
//=============================
// * 帧刷新
//=============================
/*
var _drill_ITFi_update = Window_Base.prototype.update;		//暂不选择延迟删除 块
Window_Base.prototype.update = function() {
	if( this.contents && this.contents._drill_ITFi_clearedRect ){
		var rect = this.contents._drill_ITFi_clearedRect;
		this.drill_ITFi_clearSpriteInRect(rect.x, rect.y, rect.width, rect.height);
		this.contents._drill_ITFi_clearedRect = undefined;
	}
	_drill_ITFi_update.call(this);
}
*/
//=============================
// * 清除内容贴图（与范围相交的） 
//=============================
Window_Base.prototype.drill_ITFi_clearSpriteInRect = function(rect) {
	if( !this._drill_ITFi_spriteTank ){ return }
	
	for(var i=this._drill_ITFi_spriteTank.length-1; i >= 0 ;i--){
		var temp_sprite = this._drill_ITFi_spriteTank[i];
		
		var x1 = temp_sprite.x;
		var y1 = temp_sprite.y;
		var x2 = temp_sprite.x + temp_sprite.bitmap.width;
		var y2 = temp_sprite.y + temp_sprite.bitmap.height;
		var x3 = rect.x;
		var y3 = rect.y;
		var x4 = rect.x + rect.width;
		var y4 = rect.y + rect.height;
		
		var minx = Math.max(x1, x3);
		var miny = Math.max(y1, y3);
		var maxx = Math.min(x2, x4);
		var maxy = Math.min(y2, y4);
		
		if( minx <= maxx && miny <= maxy ){
			this._windowContentsSprite.removeChild(temp_sprite);
			this._drill_ITFi_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};
//=============================
// * 清除内容贴图（所有）
//=============================
Window_Base.prototype.drill_ITFi_clearAllSprite = function() {
	if( !this._drill_ITFi_spriteTank ){ return }
	for(var i=this._drill_ITFi_spriteTank.length-1; i >= 0 ;i--){
		var temp_sprite = this._drill_ITFi_spriteTank[i];
		this._windowContentsSprite.removeChild(temp_sprite);
		this._drill_ITFi_spriteTank.splice(i,1);
		delete temp_sprite;
	}
};

//=============================
// * 清理情况 - contents被重建
//=============================
var _drill_ITFi_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function() {
	if( this.contents ){
		this.contents._drill_ITFi_window = null;			//去掉指针
	}
	_drill_ITFi_createContents.call(this);
	this.drill_ITFi_clearAllSprite();
	this.contents._drill_ITFi_window = this;			//新建指针
};
//=============================
// * 清理情况 - bitmap清理区域
//=============================
var _drill_ITFi_bitmap_clearRect = Bitmap.prototype.clearRect;
Bitmap.prototype.clearRect = function(x, y, width, height) {
	_drill_ITFi_bitmap_clearRect.call(this, x, y, width, height);
	if( this._drill_ITFi_window ){
		var rect = {'x':x, 'y':y, 'width':width, 'height':height};
		this._drill_ITFi_window.drill_ITFi_clearSpriteInRect(rect);
	}
};

//=============================================================================
// ** 滤镜创建
//=============================================================================
//=============================
// * 创建 - 绘制标识
//=============================
var _drill_ITFi_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	
	this._drill_ITFi_isDrawingItemName = true;
	this._drill_ITFi_curItem = item;
	_drill_ITFi_drawItemName.call(this, item, x, y, width);
	this._drill_ITFi_isDrawingItemName = false;
	
}
//=============================
// * 创建 - 根据标识修改成 文本块
//=============================
var _drill_ITFi_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function( text, x, y, maxWidth, align ) {
	if( this._drill_ITFi_isDrawingItemName == true ){
		this.drill_ITFi_drawItemSpriteText( text, x, y, maxWidth, align );
		return ;		//所有绘制物品的文本都转成sprite
	}
	_drill_ITFi_drawText.call(this, text, x, y, maxWidth, align);
}
Window_Base.prototype.drill_ITFi_drawItemSpriteText = function(text, x, y, maxWidth, align) {
	var item = this._drill_ITFi_curItem;
	var temp_sprite = new Sprite();
	
	temp_sprite.bitmap = new Bitmap(maxWidth, this.lineHeight());
	temp_sprite.bitmap.textColor = this.contents.textColor;
	temp_sprite.bitmap.paintOpacity = this.contents.paintOpacity;
	temp_sprite.bitmap.fontSize = this.contents.fontSize;
	temp_sprite.bitmap.drawText(item.name, 0, 0, maxWidth, this.lineHeight() );
	temp_sprite.x = 0 ;
	temp_sprite.y = 0 ;
	temp_sprite.x += x;
	temp_sprite.y += y;
	// >物品数据初始化
	temp_sprite._drill_ITFi_itemId = item.id;
    if (DataManager.isSkill(item)) {
		temp_sprite._drill_ITFi_itemType = '技能';
    } else if (DataManager.isItem(item)) {
		temp_sprite._drill_ITFi_itemType = '物品';
    } else if (DataManager.isWeapon(item)) {
		temp_sprite._drill_ITFi_itemType = '武器';
    } else if (DataManager.isArmor(item)) {
		temp_sprite._drill_ITFi_itemType = '护甲';
    }
	
	this._drill_ITFi_spriteTank.push(temp_sprite);
	this._windowContentsSprite.addChild(temp_sprite);
}

//==============================
// * 帧刷新
//==============================
var _drill_ITFi_w_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
	_drill_ITFi_w_update.call(this);
	this.drill_ITFi_updateItemTextFilter();
}
Window_Base.prototype.drill_ITFi_updateItemTextFilter = function() {
	if ( !this._drill_ITFi_spriteTank ) { return; }
	if ( this._drill_ITFi_spriteTank.length == 0 ) { return; }
	
	for(var i=0; i< this._drill_ITFi_spriteTank.length; i++){	//遍历sprite的临时 id和类型，获取system的滤镜设置
		var text_sprite = this._drill_ITFi_spriteTank[i];
		var item__id = text_sprite._drill_ITFi_itemId;
		var item_type = text_sprite._drill_ITFi_itemType;
		if ( !item__id ) { continue; }
		if ( !item_type ) { continue; }
		
		var data;
		if ( item_type == "技能" ){ var f_data = $gameTemp.drill_ITFi_getSkillFData(item__id); }
		if ( item_type == "物品" ){ var f_data = $gameTemp.drill_ITFi_getItemFData(item__id); }
		if ( item_type == "武器" ){ var f_data = $gameTemp.drill_ITFi_getWeaponFData(item__id); }
		if ( item_type == "护甲" ){ var f_data = $gameTemp.drill_ITFi_getArmorFData(item__id); }
		
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

//=============================================================================
// ** 滤镜 - 兼容 mog技能浮动框/气泡框
//=============================================================================
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
		if (DataManager.isSkill(item)){  f_data = $gameTemp.drill_ITFi_getSkillFData(item.id); };
		if (DataManager.isItem(item)){  
			f_data = $gameTemp.drill_ITFi_getItemFData(item.id); 
			if( $dataItems[item.id].baseItemId ){	//Yep物品核心兼容
				f_data = $gameTemp.drill_ITFi_getItemFData($dataItems[item.id].baseItemId); 
			}
		}	
		if (DataManager.isWeapon(item)){  f_data = $gameTemp.drill_ITFi_getWeaponFData(item.id); }
		if (DataManager.isArmor(item)){  f_data = $gameTemp.drill_ITFi_getArmorFData(item.id); }
		
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
// ** 滤镜 - 兼容 mog战斗结果界面
//=============================================================================
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
			if ( item_type == "技能" ){ var f_data = $gameTemp.drill_ITFi_getSkillFData(item__id); }
			if ( item_type == "物品" ){ var f_data = $gameTemp.drill_ITFi_getItemFData(item__id); }
			if ( item_type == "武器" ){ var f_data = $gameTemp.drill_ITFi_getWeaponFData(item__id); }
			if ( item_type == "护甲" ){ var f_data = $gameTemp.drill_ITFi_getArmorFData(item__id); }
			
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

//=============================================================================
// ** 滤镜 - 兼容 mog道具浮动文字
//=============================================================================
if( Imported.MOG_TreasurePopup ){
	
	var _drill_ITFi_mog_TreasurePopup_update = TreasureIcons.prototype.update;
	TreasureIcons.prototype.update = function() {
		_drill_ITFi_mog_TreasurePopup_update.call(this);
		
		// >物品数据初始化
		var data;
		var text_sprite = this._name;
		var item = this._item;
		if (!item){ return; }
		if (DataManager.isSkill(item)){ var f_data = $gameTemp.drill_ITFi_getSkillFData(item.id); };
		if (DataManager.isItem(item)){
			var f_data = $gameTemp.drill_ITFi_getItemFData(item.id); 
			if( $dataItems[item.id].baseItemId ){	//Yep物品核心兼容
				f_data = $gameTemp.drill_ITFi_getItemFData($dataItems[item.id].baseItemId); 
			}
		}
		if (DataManager.isWeapon(item)){ var f_data = $gameTemp.drill_ITFi_getWeaponFData(item.id); }
		if (DataManager.isArmor(item)){ var f_data = $gameTemp.drill_ITFi_getArmorFData(item.id); }
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
//=============================================================================
// ** 滤镜 - 兼容 mog道具浮动框
//=============================================================================
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
		if (DataManager.isSkill(item)){  f_data = $gameTemp.drill_ITFi_getSkillFData(item.id); };
		if (DataManager.isItem(item)){
			f_data = $gameTemp.drill_ITFi_getItemFData(item.id);
			if( $dataItems[item.id].baseItemId ){	//Yep物品核心兼容
				f_data = $gameTemp.drill_ITFi_getItemFData($dataItems[item.id].baseItemId); 
			}
		}
		if (DataManager.isWeapon(item)){  f_data = $gameTemp.drill_ITFi_getWeaponFData(item.id); }
		if (DataManager.isArmor(item)){  f_data = $gameTemp.drill_ITFi_getArmorFData(item.id); }
		
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
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_ItemTextFilter = false;
		alert(
			"【Drill_ItemTextFilter.js  UI - 物品+技能文本的滤镜效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFilter 系统-滤镜核心"
		);
}

	