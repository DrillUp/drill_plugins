//=============================================================================
// Drill_X_SenceEquipParam.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        控件 - 装备界面角色能力值[扩展]
 * @author Drill_up
 *
 * @help  
 * =============================================================================
 * +++ Drill_X_BattlePictureChange +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可以切换 全自定义装备界面 的更多的角色能力值。
 * ★★必须放在 装备界面插件 的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 但只对指定插件扩展，如果没有使用目标插件，则该插件没有任何效果。
 * 作用于：
 *   - MOG_SceneEquip      面板-全自定义装备界面
 *     给目标插件提供的更多可显示的角色能力值。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于装备界面的 角色窗口 。
 * 2.装备界面固定显示6个可变动的属性：攻击、防御、魔法、魔法防御、敏捷、幸运
 *   该插件可以将 最大生命、暴击率 等其他属性都显示进来。
 * 3.你需要调整角色窗口的宽高，使得有足够空间显示那么多数据。
 *   （注意调整与其它窗口互斥遮挡关系）
 * 4.属性抗性由于不是角色的固有属性，这里目前无法提供显示。
 *
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的内部结构。
 * 
 * 
 * 
 * @param 显示数值小数点位数
 * @type number
 * @min 0
 * @desc 显示中百分比的小数位显示的精度，0表示100%，1表示111.1%。
 * @default 1
 *
 * @param 最大行数
 * @type number
 * @min 1
 * @desc 如果你开启了特别多的属性显示，你可以控制最大行数，超出部分另起一列。
 * @default 10
 *
 * @param 是否显示最大生命
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 是否显示最大魔法
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 是否显示攻击力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 是否显示防御力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 是否显示魔法攻击
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 是否显示魔法防御
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 是否显示敏捷
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 是否显示幸运
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 是否显示命中率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-命中率
 * @parent 是否显示命中率
 * @desc 显示能力值的名字用语。
 * @default 命中率
 *
 * @param 是否显示物理闪避率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-物理闪避率
 * @parent 是否显示物理闪避率
 * @desc 显示能力值的名字用语。
 * @default 物理闪避率
 *
 * @param 是否显示魔法闪避率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-魔法闪避率
 * @parent 是否显示魔法闪避率
 * @desc 显示能力值的名字用语。
 * @default 魔法闪避率
 *
 * @param 是否显示暴击率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-暴击率
 * @parent 是否显示暴击率
 * @desc 显示能力值的名字用语。
 * @default 暴击率
 *
 * @param 是否显示暴击回避率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-暴击回避率
 * @parent 是否显示暴击回避率
 * @desc 显示能力值的名字用语。
 * @default 暴击回避率
 *
 * @param 是否显示物理反击
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-物理反击
 * @parent 是否显示物理反击
 * @desc 显示能力值的名字用语。
 * @default 物理反击率
 *
 * @param 是否显示魔法反射
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-魔法反射
 * @parent 是否显示魔法反射
 * @desc 显示能力值的名字用语。
 * @default 魔法反射率
 *
 * @param 是否显示生命恢复
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-生命恢复
 * @parent 是否显示生命恢复
 * @desc 显示能力值的名字用语。
 * @default 生命恢复率
 *
 * @param 是否显示魔法恢复
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-魔法恢复
 * @parent 是否显示魔法恢复
 * @desc 显示能力值的名字用语。
 * @default 魔法恢复率
 *
 * @param 是否显示怒气恢复
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-怒气恢复
 * @parent 是否显示怒气恢复
 * @desc 显示能力值的名字用语。
 * @default 怒气恢复
 *
 * @param 是否显示受攻击几率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-受攻击几率
 * @parent 是否显示受攻击几率
 * @desc 显示能力值的名字用语。
 * @default 受攻击几率
 *
 * @param 是否显示防御效果
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-防御效果
 * @parent 是否显示防御效果
 * @desc 显示能力值的名字用语。
 * @default 防御效果
 *
 * @param 是否显示恢复效果
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-恢复效果
 * @parent 是否显示恢复效果
 * @desc 显示能力值的名字用语。
 * @default 恢复效果
 *
 * @param 是否显示药理知识
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-药理知识
 * @parent 是否显示药理知识
 * @desc 显示能力值的名字用语。
 * @default 药理知识
 *
 * @param 是否显示魔法消耗率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-魔法消耗率
 * @parent 是否显示魔法消耗率
 * @desc 显示能力值的名字用语。
 * @default 魔法消耗率
 *
 * @param 是否显示怒气补充率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-怒气补充率
 * @parent 是否显示怒气补充率
 * @desc 显示能力值的名字用语。
 * @default 怒气补充率
 *
 * @param 是否显示物理伤害
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-物理伤害
 * @parent 是否显示物理伤害
 * @desc 显示能力值的名字用语。
 * @default 受物理伤害
 *
 * @param 是否显示魔法伤害
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-魔法伤害
 * @parent 是否显示魔法伤害
 * @desc 显示能力值的名字用语。
 * @default 受魔法伤害
 *
 * @param 是否显示地形伤害
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-地形伤害
 * @parent 是否显示地形伤害
 * @desc 显示能力值的名字用语。
 * @default 受地形伤害
 *
 * @param 是否显示经验率
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 用语-经验率
 * @parent 是否显示经验率
 * @desc 显示能力值的名字用语。
 * @default 经验率
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XSEP（X_Sence_Equip_Param）
//		临时全局变量	DrillUp.g_XSEP_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_EquipStatus.prototype.refresh（mog插件）
//						Window_EquipStatus.prototype.drawParamName（mog插件）
//						Window_EquipStatus.prototype.drawCurrentParam（mog插件）
//						Window_EquipStatus.prototype.drawRightArrowM（mog插件）
//						Window_EquipStatus.prototype.drawNewParam（mog插件）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		无
//		★时间复杂度		无
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			角色能力值：
//				->8个基本属性，10个特殊属性，9个特殊属性
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.属性太多，只能一个个列出来。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_SenceEquipParam = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_SenceEquipParam');
	
	/*-----------------杂项------------------*/
    DrillUp.g_XSEP_param_float_acc = Number(DrillUp.parameters['显示数值小数点位数'] || 1);
    DrillUp.g_XSEP_param_max_row = Number(DrillUp.parameters['最大行数'] || 10);
	DrillUp.g_XSEP_params = [];
	DrillUp.g_XSEP_param_names = [];
	DrillUp.g_XSEP_params[0] = String(DrillUp.parameters['是否显示最大生命'] || "true") === "true";
	DrillUp.g_XSEP_params[1] = String(DrillUp.parameters['是否显示最大魔法'] || "true") === "true";
	DrillUp.g_XSEP_params[2] = String(DrillUp.parameters['是否显示攻击力'] || "true") === "true";
	DrillUp.g_XSEP_params[3] = String(DrillUp.parameters['是否显示防御力'] || "true") === "true";
	DrillUp.g_XSEP_params[4] = String(DrillUp.parameters['是否显示魔法攻击'] || "true") === "true";
	DrillUp.g_XSEP_params[5] = String(DrillUp.parameters['是否显示魔法防御'] || "true") === "true";
	DrillUp.g_XSEP_params[6] = String(DrillUp.parameters['是否显示敏捷'] || "true") === "true";
	DrillUp.g_XSEP_params[7] = String(DrillUp.parameters['是否显示幸运'] || "true") === "true";
	DrillUp.g_XSEP_params[8] = String(DrillUp.parameters['是否显示命中率'] || "true") === "true";
	DrillUp.g_XSEP_params[9] = String(DrillUp.parameters['是否显示物理闪避率'] || "true") === "true";
	DrillUp.g_XSEP_params[12] = String(DrillUp.parameters['是否显示魔法闪避率'] || "true") === "true";
	DrillUp.g_XSEP_params[10] = String(DrillUp.parameters['是否显示暴击率'] || "true") === "true";
	DrillUp.g_XSEP_params[11] = String(DrillUp.parameters['是否显示暴击回避率'] || "true") === "true";
	DrillUp.g_XSEP_params[14] = String(DrillUp.parameters['是否显示物理反击'] || "true") === "true";
	DrillUp.g_XSEP_params[13] = String(DrillUp.parameters['是否显示魔法反射'] || "true") === "true";
	DrillUp.g_XSEP_params[15] = String(DrillUp.parameters['是否显示生命恢复'] || "true") === "true";
	DrillUp.g_XSEP_params[16] = String(DrillUp.parameters['是否显示魔法恢复'] || "true") === "true";
	DrillUp.g_XSEP_params[17] = String(DrillUp.parameters['是否显示怒气恢复'] || "true") === "true";
	DrillUp.g_XSEP_params[18] = String(DrillUp.parameters['是否显示受攻击几率'] || "true") === "true";
	DrillUp.g_XSEP_params[19] = String(DrillUp.parameters['是否显示防御效果'] || "true") === "true";
	DrillUp.g_XSEP_params[20] = String(DrillUp.parameters['是否显示恢复效果'] || "true") === "true";
	DrillUp.g_XSEP_params[21] = String(DrillUp.parameters['是否显示药理知识'] || "true") === "true";
	DrillUp.g_XSEP_params[22] = String(DrillUp.parameters['是否显示魔法消耗率'] || "true") === "true";
	DrillUp.g_XSEP_params[23] = String(DrillUp.parameters['是否显示怒气补充率'] || "true") === "true";
	DrillUp.g_XSEP_params[24] = String(DrillUp.parameters['是否显示物理伤害'] || "true") === "true";
	DrillUp.g_XSEP_params[25] = String(DrillUp.parameters['是否显示魔法伤害'] || "true") === "true";
	DrillUp.g_XSEP_params[26] = String(DrillUp.parameters['是否显示地形伤害'] || "true") === "true";
	DrillUp.g_XSEP_params[27] = String(DrillUp.parameters['是否显示经验率'] || "true") === "true";
	DrillUp.g_XSEP_param_names[8] = String(DrillUp.parameters['用语-命中率'] || "命中率");
	DrillUp.g_XSEP_param_names[9] = String(DrillUp.parameters['用语-物理闪避率'] || "物理闪避率");
	DrillUp.g_XSEP_param_names[12] = String(DrillUp.parameters['用语-魔法闪避率'] || "魔法闪避率");
	DrillUp.g_XSEP_param_names[10] = String(DrillUp.parameters['用语-暴击率'] || "暴击率");
	DrillUp.g_XSEP_param_names[11] = String(DrillUp.parameters['用语-暴击回避率'] || "暴击回避率");
	DrillUp.g_XSEP_param_names[14] = String(DrillUp.parameters['用语-物理反击'] || "物理反击");
	DrillUp.g_XSEP_param_names[13] = String(DrillUp.parameters['用语-魔法反射'] || "魔法反射");
	DrillUp.g_XSEP_param_names[15] = String(DrillUp.parameters['用语-生命恢复'] || "生命恢复");
	DrillUp.g_XSEP_param_names[16] = String(DrillUp.parameters['用语-魔法恢复'] || "魔法恢复");
	DrillUp.g_XSEP_param_names[17] = String(DrillUp.parameters['用语-怒气恢复'] || "怒气恢复");
	DrillUp.g_XSEP_param_names[18] = String(DrillUp.parameters['用语-受攻击几率'] || "受攻击几率");
	DrillUp.g_XSEP_param_names[19] = String(DrillUp.parameters['用语-防御效果'] || "防御效果");
	DrillUp.g_XSEP_param_names[20] = String(DrillUp.parameters['用语-恢复效果'] || "恢复效果");
	DrillUp.g_XSEP_param_names[21] = String(DrillUp.parameters['用语-药理知识'] || "药理知识");
	DrillUp.g_XSEP_param_names[22] = String(DrillUp.parameters['用语-魔法消耗率'] || "魔法消耗率");
	DrillUp.g_XSEP_param_names[23] = String(DrillUp.parameters['用语-怒气补充率'] || "怒气补充率");
	DrillUp.g_XSEP_param_names[24] = String(DrillUp.parameters['用语-物理伤害'] || "物理伤害");
	DrillUp.g_XSEP_param_names[25] = String(DrillUp.parameters['用语-魔法伤害'] || "魔法伤害");
	DrillUp.g_XSEP_param_names[26] = String(DrillUp.parameters['用语-地形伤害'] || "地形伤害");
	DrillUp.g_XSEP_param_names[27] = String(DrillUp.parameters['用语-经验率'] || "经验率");


//=============================================================================
// ** 角色窗口
//=============================================================================
if(Imported.MOG_SceneEquip){

	//==============================
	// * 帧刷新
	//==============================
	Window_EquipStatus.prototype.refresh = function() {
		this.contents.clear();
		this.contents.fontSize = Moghunter.scEquip_StatusWindow_FontSize;
		if (this._actor) {
			this._parData[0] = this._parImg.width / 3;
			this._parData[1] = this._parImg.height;
			if (!this._faceSprite) {this.createFaceSprite()};
			this.refreshFaceSprite();
			this.drawActorName(this._actor, Moghunter.scEquip_ActorName_X, Moghunter.scEquip_ActorName_Y );
			//重新分配行的布局
			var row_num = 0;
			var row_u = Moghunter.scEquip_Status_param_up_margin;
			var row_h = Moghunter.scEquip_Status_param_line_height;
			var row_w = Moghunter.scEquip_Status_param_left_margin + Moghunter.scEquip_Status_param_width*2 + Moghunter.scEquip_Status_param_arrow_margin*2 + 10;
			var row_max = DrillUp.g_XSEP_param_max_row;
			for (var i = 0; i < DrillUp.g_XSEP_params.length; i++) {
				if( DrillUp.g_XSEP_params[i] ){
					var row_col = Math.floor(row_num/row_max);
					this.drawItem( row_col * row_w, row_u +  row_h * ((row_num)%row_max), i);
					
					row_num += 1;
				}
			}
		}
	};
/*
	//==============================
	// * 绘制整个能力值布局
	//==============================
	Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
		this.contents.fontSize = Moghunter.scEquip_StatusWindow_FontSize;
			
		this.drawParamName(x + this.textPadding(), y, paramId);
		var l = Moghunter.scEquip_Status_param_left_margin;
		var w = Moghunter.scEquip_Status_param_width;
		var a = Moghunter.scEquip_Status_param_arrow_margin;
		if (this._actor) {
			this.drawCurrentParam(x + l, y, paramId);
			if (this._tempActor) {this.drawRightArrowM(x + l + w + a/2, y + 8,paramId)};
		}
		if (this._tempActor) {
			this.drawNewParam(x + l + w + a*2, y, paramId);
		}
		}
	};
*/
	
	//==============================
	// * 绘制能力名
	//==============================
	Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
		if( Moghunter.scEquip_Status_param_name_visible ){
			if(paramId <= 7){
				this.changeTextColor(this.systemColor());
				this.drawText(TextManager.param(paramId), x, y, 120);
			}else{
				this.changeTextColor(this.systemColor());
				this.drawText(DrillUp.g_XSEP_param_names[paramId], x, y, 120);
			}
		}
	};

	//==============================
	// * 绘制当前能力值
	//==============================
	Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
		this.resetTextColor();
		if(paramId <= 7){
			this.drawText(this._actor.param(paramId), x, y, Moghunter.scEquip_Status_param_width, 'right');
		}else if(paramId <= 17){
			var data = this._actor.xparam(paramId - 8) * 100;
			data = data.toFixed(DrillUp.g_XSEP_param_float_acc);
			this.drawText( data+"%", x, y, Moghunter.scEquip_Status_param_width, 'right');
		}else if(paramId <= 27){
			var data = this._actor.sparam(paramId - 18) * 100;
			data = data.toFixed(DrillUp.g_XSEP_param_float_acc);
			this.drawText( data+"%", x, y, Moghunter.scEquip_Status_param_width, 'right');
		}
	};

	//==============================
	// * 绘制图标
	//==============================
	Window_EquipStatus.prototype.drawRightArrowM = function(x, y,paramId) {
		if(paramId <= 7){
			var newValue = this._tempActor.param(paramId);
			var diffvalue = newValue - this._actor.param(paramId); 
		}else if(paramId <= 17){
			var newValue = this._tempActor.xparam(paramId - 8);
			var diffvalue = newValue - this._actor.xparam(paramId -8); 
		}else if(paramId <= 27){
			var newValue = this._tempActor.sparam(paramId - 18);
			var diffvalue = newValue - this._actor.sparam(paramId -18); 
		}
		
		if (diffvalue > 0) {
			 var sx = this._parData[0];
		} else if (diffvalue < 0) {
			var sx = this._parData[0] * 2;
		} else {
			var sx = 0	
		};		
		this.contents.blt(this._parImg, sx, 0, this._parData[0], this._parData[1], x, y);	
		 
	};

	//==============================
	// * 绘制装备后能力值
	//==============================
	Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
		if(paramId <= 7){
			var newValue = this._tempActor.param(paramId);
			var diffvalue = newValue - this._actor.param(paramId); 
			var newData = newValue;
		}else if(paramId <= 17){
			var newValue = this._tempActor.xparam(paramId - 8);
			var diffvalue = newValue - this._actor.xparam(paramId -8); 
			var newData = newValue * 100 ;
			newData = newData.toFixed(DrillUp.g_XSEP_param_float_acc);
			newData = newData + '%';
		}else if(paramId <= 27){
			var newValue = this._tempActor.sparam(paramId - 18);
			var diffvalue = newValue - this._actor.sparam(paramId -18); 
			var newData = newValue * 100 ;
			newData = newData.toFixed(DrillUp.g_XSEP_param_float_acc);
			newData = newData + '%';
		}
		this.changeTextColor(this.paramchangeTextColor(diffvalue));
		this.drawText(newData, x, y, Moghunter.scEquip_Status_param_width, 'right');
	};
}

