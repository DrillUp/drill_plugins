//=============================================================================
// Drill_X_BattlePictureChange.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        战斗UI - 角色头像切换[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "角色头像-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_XBPC_face_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_BattlePictureChange +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件在角色图像和角色窗口的基础上提供切换立绘支持。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 但只对指定插件扩展，如果没有使用目标插件，则该插件没有任何效果。
 * 作用于：
 *   - MOG_BattleHud    战斗UI-角色窗口
 *     给目标插件提供插件指令支持，以切换角色头像。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于ui层的面板。
 * 2.由于 MOG_ActorPictureCM 插件被取代，所以相关插件的支持被去掉。
 *   以免混淆。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 战斗UI-角色窗口
 * 你可以通过插件设置战斗角色窗口中的头像:
 *
 * 插件指令（头像）：>角色立绘 : A : 切换头像 : C
 * 插件指令（还原）：>角色立绘 : A : 还原头像
 *
 * 参数A：角色的id
 * 参数C：配置的角色头像编号
 * 插件指令任何时候都可以设置，如果不还原，战斗结束后立绘才会自动还原。
 * 
 * 示例：
 * 插件指令：>角色立绘 : 5 : 切换头像 : 1
 * （5号角色的头像切换为配置的1号角色图像）
 * 插件指令：>角色立绘 : 5 : 还原头像
 * （5号角色的头像恢复原状）
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了单人战斗时，立绘无法切换的bug。规范了插件指令。
 * [v1.2]
 * 修改了插件的内部结构。
 * [v1.3]
 * 去除了MOG_ActorPictureCM插件的支持。修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了最大值编辑的支持。
 * 
 * 
 * @param ----角色头像组----
 * @default 
 *
 * @param 角色头像-1
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-2
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-3
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-4
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-5
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-6
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-7
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-8
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-9
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-10
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-11
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-12
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-13
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-14
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-15
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-16
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-17
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-18
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-19
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 * @param 角色头像-20
 * @parent ----角色头像组----
 * @desc 角色头像的图片资源。MOG_BattleHud 战斗UI-角色窗口 插件。
 * @default 
 * @require 1
 * @dir img/Battle__ui_hud/
 * @type file
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XBPC（X_Battle_Picture_Change）
//		临时全局变量	DrillUp.g_XBPC_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_XBPC_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
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
//			角色立绘切换：
//				x->角色图像-前视图
//				x->角色图像-背景图
//				->角色窗口-头像
//				->（滤镜核）优化，滤镜/滤镜板用到的时候才new
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.mog的角色图像有个大坑，只有一个人战斗时，立绘无法切换。
//			  原理实在琢磨不清，是if (this._actor_cm_data[0] != BattleManager.actor())的问题，但是这个条件又不能去掉。（去掉直接不显示立绘）
//			  目前的解决方法是，绕着这个条件，新写变换条件。（mog代码居然那么稀烂）
//				
//		★存在的问题：
//			暂无
//		该插件有 $gameSystem._drill_xxx ，但都为临时使用的变量。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_BattlePictureChange = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_X_BattlePictureChange');
	
	DrillUp.g_XBPC_face_list_length = 20;
	DrillUp.g_XBPC_face_list = {};
	for (var i = 1; i <= DrillUp.g_XBPC_face_list_length ; i++ ) {
		DrillUp.g_XBPC_face_list[i] = DrillUp.parameters['角色头像-' + String(i) ];
	};

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_XBPC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XBPC_pluginCommand.call(this, command, args);
	if (command === '>角色立绘') {
		if(args.length >= 4){
			var temp1 = Number(args[1]);
			if(args.length >= 6){ var temp2 = Number(args[5]); }
			var type = String(args[3]);
			if( type == '切换头像' ){
				$gameSystem._drill_XBPC_bHud_change = true;
				$gameSystem._drill_XBPC_bHud_face_id = temp1;
				$gameSystem._drill_XBPC_bHud_new_face_id = temp2;
			}
			if( type == '还原头像' ){
				$gameSystem._drill_XBPC_bHud_reset = true;
				$gameSystem._drill_XBPC_bHud_reset_id = temp1;
			}
			
		}
	}
};

//=============================================================================
// ** 角色窗口
//=============================================================================

if(Imported.MOG_BattleHud){
	
	//==============================
	// * Update Face
	//==============================
	var _drill_Battle_Hud_face_update = Battle_Hud.prototype.update_face;
	Battle_Hud.prototype.update_face = function() {
		if (!this._face) {return};
		if ( $gameSystem._drill_XBPC_bHud_change && this._battler._actorId == $gameSystem._drill_XBPC_bHud_face_id ) {
			$gameSystem._drill_XBPC_bHud_change = false;
			this._face.bitmap = ImageManager.loadBHud(DrillUp.g_XBPC_face_list[ $gameSystem._drill_XBPC_bHud_new_face_id ]);
			this._face_data[5] = -1;
		};
		if ( $gameSystem._drill_XBPC_bHud_reset && this._battler._actorId == $gameSystem._drill_XBPC_bHud_reset_id ) {
			$gameSystem._drill_XBPC_bHud_reset = false;
			this._face.bitmap = ImageManager.loadBHud(Moghunter.actFace_list[this._battler._actorId]);
			this._face_data[5] = -1;
		}
		_drill_Battle_Hud_face_update.call(this);
	};
}
