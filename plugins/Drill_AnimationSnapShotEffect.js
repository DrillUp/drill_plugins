//=============================================================================
// Drill_AnimationSnapShotEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        动画 - 屏幕快照的眩晕效果
 * @author Drill_up
 * 
 * @Drill_LE_param "眩晕样式-%d"
 * @Drill_LE_parentKey "---眩晕样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_ASSE_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationSnapShotEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置眩晕效果，其原理基于静态屏幕快照。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于UI。
 * 2.更多详细内容，去看看文档 "1.系统 > 大家族-屏幕快照.docx"。
 * 细节：
 *   (1.播放一次眩晕效果时，眩晕效果将会实时创建一个静态快照，
 *      然后放大并逐渐消失。
 * 设计：
 *   (1.你可以将眩晕效果设计到技能中，技能对敌人或角色伤害时，
 *      会播放一次眩晕效果，让玩家感觉到这次的伤害非常大。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令操作：
 * 
 * 插件指令：>屏幕快照的眩晕效果 : 播放一次 : 样式[1]
 * 插件指令：>屏幕快照的眩晕效果 : 交叉播放 : 多样式[1] : 间隔[3] : 持续时间[40]
 * 插件指令：>屏幕快照的眩晕效果 : 交叉播放 : 多样式[2,3] : 间隔[3] : 持续时间[40]
 * 插件指令：>屏幕快照的眩晕效果 : 停止交叉播放
 * 
 * 1.你可以通过插件指令播放一次眩晕样式。
 *   也可以在指定时间内交叉循环播放多个样式。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 技能注释
 * 你需要通过下面插件指令操作：
 * 
 * 技能注释：<屏幕快照的眩晕效果:1>
 * 
 * 1.数字对应当前配置的样式，技能设置注释后，会播放一次眩晕样式。
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
 * 测试方法：   在不同的界面中，进行快照性能测试。
 * 测试结果：   战斗界面中，平均消耗为：【11.40ms】
 *              地图界面中，平均消耗为：【17.47ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.眩晕效果本质上是贴图放大与透明变化，因此消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了单独使用此插件时，会出错的bug。
 * 
 * 
 * 
 * @param ---眩晕样式组 1至20---
 * @default
 *
 * @param 眩晕样式-1
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default {"标签":"==标准眩晕==","---贴图---":"","透明度":"130","混合模式":"0","地图层级":"图片层","地图图片层级":"10","战斗层级":"图片层","战斗图片层级":"10","---变化效果---":"","单次变化时长":"60","移动速度 X":"0.0","移动速度 Y":"0.0","旋转速度":"0.0","目标缩放大小":"1.0"}
 *
 * @param 眩晕样式-2
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default {"标签":"==左移眩晕==","---贴图---":"","透明度":"130","混合模式":"0","地图层级":"图片层","地图图片层级":"10","战斗层级":"图片层","战斗图片层级":"10","---变化效果---":"","单次变化时长":"60","移动速度 X":"-2.0","移动速度 Y":"0.0","旋转速度":"0.0","目标缩放大小":"1.0"}
 *
 * @param 眩晕样式-3
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default {"标签":"==右移眩晕==","---贴图---":"","透明度":"130","混合模式":"0","地图层级":"图片层","地图图片层级":"10","战斗层级":"图片层","战斗图片层级":"10","---变化效果---":"","单次变化时长":"60","移动速度 X":"2.0","移动速度 Y":"0.0","旋转速度":"0.0","目标缩放大小":"1.0"}
 *
 * @param 眩晕样式-4
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-5
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-6
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-7
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-8
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-9
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-10
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-11
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-12
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-13
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-14
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-15
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-16
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-17
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-18
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-19
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 * @param 眩晕样式-20
 * @parent ---眩晕样式组 1至20---
 * @type struct<ASSEStyle>
 * @desc 眩晕效果的详细配置信息。
 * @default 
 *
 */
/*~struct~ASSEStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的眩晕效果样式==
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 130
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 地图层级
 * @parent ---贴图---
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 地图所在的层级位置。
 * @default 图片层
 *
 * @param 地图图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 层级先后排序的位置，0表示最后面。
 * @default 10
 *
 * @param 战斗层级
 * @parent ---贴图---
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 战斗所在的层级位置。
 * @default 图片层
 *
 * @param 战斗图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 层级先后排序的位置，0表示最后面。
 * @default 10
 * 
 * 
 * @param ---变化效果---
 * @default 
 *
 * @param 单次变化时长
 * @parent ---变化效果---
 * @type number
 * @min 10
 * @desc 眩晕效果的单次变化时长。
 * @default 60
 *
 * @param 移动速度 X
 * @parent ---变化效果---
 * @desc 按x轴方向移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 移动速度 Y
 * @parent ---变化效果---
 * @desc 按y轴方向移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
 *
 * @param 旋转速度
 * @parent ---变化效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 0.0
 *
 * @param 目标缩放大小
 * @parent ---变化效果---
 * @desc 静态快照在变化时间内目标的缩放大小。
 * @default 1.0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ASSE（Gauge_Snap_Shot_Effect）
//		临时全局变量	DrillUp.g_ASSE_xxx
//		临时局部变量	this._drill_ASSE_xxx
//		存储数据变量	$gameSystem._drill_ASSE_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	特效管理层
//		★性能测试消耗	2024/4/13：
//							》11.4ms（Drill_ASSE_Sprite.update）
//		★最坏情况		暂无
//		★备注			虽然贴图用的是静态快照，但是实际上与一般的魔法圈贴图消耗没有什么区别。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆技能注释
//			->☆地图层级
//			->☆战斗层级
//			->☆存储数据
//			
//			->☆控制器创建
//				->单次创建
//				->连续创建
//				x->闲置时会被重复利用
//			->☆贴图控制
//			
//			->静态快照控制器【Drill_ASSE_Controller】
//			->静态快照贴图【Drill_ASSE_Sprite】
//
//
//		★家谱：
//			大家族-屏幕快照
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.注意快照销毁的时机，指令 图片显示、图片删除 时，都需要销毁快照。
//
//		★其它说明细节：
//			暂无
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
	DrillUp.g_ASSE_PluginTip_curName = "Drill_AnimationSnapShotEffect.js UI-屏幕快照的眩晕效果";
	DrillUp.g_ASSE_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_AnimationSnapShotEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationSnapShotEffect');
	
	//==============================
	// * 静态数据 - 眩晕样式
	//				（~struct~ASSEStyle）
	//==============================
	DrillUp.drill_ASSE_initStyle = function( dataFrom ){
		var data = {};
		
		// > 贴图
		data['opacity'] = Number( dataFrom["透明度"] || 130);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['map_layer'] = String( dataFrom["地图层级"] || "图片层");
		data['map_zIndex'] = Number( dataFrom["地图图片层级"] || 10);
		data['battle_layer'] = String( dataFrom["战斗层级"] || "图片层");
		data['battle_zIndex'] = Number( dataFrom["战斗图片层级"] || 10);
		
		// > 变化效果
		data['lifeTime'] = Number( dataFrom["单次变化时长"] || 60);
		data['speedX'] = Number( dataFrom["移动速度 X"] || 0);
		data['speedY'] = Number( dataFrom["移动速度 Y"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0);
		data['scaleSpeed'] = Number( dataFrom["目标缩放大小"] || 1);
		
		return data;
	}
	
	/*-----------------眩晕样式集合------------------*/
	DrillUp.g_ASSE_style_length = 20;
	DrillUp.g_ASSE_style = [];
	for( var i = 0; i < DrillUp.g_ASSE_style_length; i++ ){
		if( DrillUp.parameters["眩晕样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["眩晕样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["眩晕样式-" + String(i+1) ]);
			DrillUp.g_ASSE_style[i] = DrillUp.drill_ASSE_initStyle( temp );
		}else{
			DrillUp.g_ASSE_style[i] = DrillUp.drill_ASSE_initStyle( {} );
		}
	}


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _Drill_ASSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_ASSE_pluginCommand.call(this, command, args);
	if( command === ">屏幕快照的眩晕效果" ){ 
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "播放一次" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				var data = {};
				data['style'] = Number(temp1);
				$gameTemp._Drill_ASSE_createOne = data;
			}
		}
		
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "停止交叉播放" ){
				$gameTemp._drill_ASSE_creatingFlow = null;
			}
		}
		if( args.length == 8 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "交叉播放" ){
				temp1 = temp1.replace("多样式[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("间隔[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("持续时间[","");
				temp3 = temp3.replace("]","");
				var arr = temp1.split(/[,，]+/);
				var arr_num = [];
				for( var i=0; i < arr.length; i++ ){
					arr_num.push( Number(arr[i]) );
				}
				
				var data = {};
				data['seq'] = arr_num;
				data['interval'] = Math.max( Number(temp2), 1 );
				data['curTime'] = 0;
				data['tarTime'] = Number(temp3);
				$gameSystem._drill_ASSE_creatingFlow = data;
			}
		}
	}
};


//=============================================================================
// ** ☆技能注释
//=============================================================================
//==============================
// * 技能注释 - 作用时绑定
//==============================
var _drill_ASSE_actionApply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function( target ){
	_drill_ASSE_actionApply.call( this, target );
	this.drill_ASSE_actionApply( target );
}
//==============================
// * 技能注释 - 作用时
//
//			说明：	> 由于技能是一个临时的对象，因此只能实时解析并使用。
//==============================
Game_Action.prototype.drill_ASSE_actionApply = function( target ){
	
	// > 当前攻击是否连续
	var is_consecutive = true;
	if(this._drill_ASSE_last_target == undefined){
		this._drill_ASSE_last_target = target;
		is_consecutive = false;
	}
	if(this._drill_ASSE_last_target != target){
		this._drill_ASSE_last_target = target;
		is_consecutive = false;
	}
	
	// > 注释来源（技能/物品技能）
	var note = "";
	if( this.isSkill() ){ note = String($dataSkills[this._item.itemId()].note); }
	if( this.isItem() ){ note = String($dataItems[this._item.itemId()].note); }
	var row_list = note.split(/[\n\r ]+/);
	
	// > 技能注释解析
	for( var i=0; i < row_list.length; i++ ){
		var row = row_list[i];
		row = row.replace(/\>$/,"");	//（去掉末尾的>）
		var args = row.split(/[:：]/);
		var command = args.shift();
		if( command == "<屏幕快照的眩晕效果" ){
			if( args.length == 1 ){
				var data = {};
				data['style'] = Number(args[0]);
				$gameTemp._Drill_ASSE_createOne = data;	//（播放一次）
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】地图层级 ☆地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/中层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_ASSE_layerAddSprite = function( sprite, layer_index ){
	this.drill_ASSE_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_ASSE_layerRemoveSprite = function( sprite ){
	this.drill_ASSE_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_ASSE_sortByZIndex = function () {
    this.drill_ASSE_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/中层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_ASSE_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_ASSE_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_ASSE_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_ASSE_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_ASSE_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_ASSE_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_ASSE_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_ASSE_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_ASSE_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_ASSE_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_ASSE_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_ASSE_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_ASSE_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_ASSE_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_ASSE_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_mapDownArea.addChild( sprite );
	}
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 地图层级 - 层级与镜头的位移（私有）
//==============================
Scene_Map.prototype.drill_ASSE_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 层级与镜头的位移
	if( option['window_benchmark'] == "相对于地图" ){
		
		// > 相对地图的偏移
		var pos_x = $gameMap.adjustX(0);
		var pos_y = $gameMap.adjustY(0);
		xx += $gameMap.deltaX( pos_x, option['orgPos_x'] ) * $gameMap.tileWidth();
		yy += $gameMap.deltaY( pos_y, option['orgPos_y'] ) * $gameMap.tileHeight();
		
		
		// > 地图参照 -> 地图参照
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
		
		// > 地图参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不需要变换）
			return {'x':xx, 'y':yy };
		}
	
	}else{
		
		// > 镜头参照 -> 地图参照
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			//（不需要变换）
			return {'x':xx, 'y':yy };
		}
		
		// > 镜头参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
	}
	return {'x':xx, 'y':yy };
}


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_ASSE_layerAddSprite = function( sprite, layer_index ){
	this.drill_ASSE_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_ASSE_layerRemoveSprite = function( sprite ){
	this.drill_ASSE_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_ASSE_sortByZIndex = function () {
    this.drill_ASSE_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_ASSE_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_ASSE_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_ASSE_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_ASSE_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_ASSE_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_ASSE_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_ASSE_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_ASSE_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_ASSE_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_ASSE_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_ASSE_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_ASSE_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_ASSE_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_ASSE_layerCameraMoving_Private = function( xx, yy, layer, option ){
		
	if( option['window_benchmark'] == "相对于战斗场景" ){
		
		// > 战斗参照 -> 战斗参照
		if( layer == "下层" || layer == "上层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
		
		// > 战斗参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			xx += this._spriteset._baseSprite.x;
			yy += this._spriteset._baseSprite.y;
			
			// > 战斗镜头位移（在图层内）
			if( Imported.Drill_BattleCamera ){
				var offset_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPosOffset();
				xx += offset_pos.x;
				yy += offset_pos.y;
			}else{
				xx += this._spriteset._battleField.x;
				yy += this._spriteset._battleField.y;
			}
			return {'x':xx, 'y':yy };
		}
		
	}else{
		
		// > 镜头参照 -> 镜头参照
		if( layer == "下层" || layer == "上层" ){
			xx -= this._spriteset._baseSprite.x;
			yy -= this._spriteset._baseSprite.y;
			
			// > 战斗镜头位移（在图层内）
			if( Imported.Drill_BattleCamera ){
				var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
				xx -= camera_pos.x;
				yy -= camera_pos.y;
			}else{
				xx -= this._spriteset._battleField.x;
				yy -= this._spriteset._battleField.y;
			}
			return {'x':xx, 'y':yy };
		}
		
		// > 镜头参照 -> 战斗参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
	}
	return {'x':xx, 'y':yy };
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ASSE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ASSE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ASSE_sys_initialize.call(this);
	this.drill_ASSE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ASSE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ASSE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ASSE_saveEnabled == true ){	
		$gameSystem.drill_ASSE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ASSE_initSysData();
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
Game_System.prototype.drill_ASSE_initSysData = function() {
	this.drill_ASSE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ASSE_checkSysData = function() {
	this.drill_ASSE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ASSE_initSysData_Private = function() {
	
	this._drill_ASSE_controllerTank = [];
	this._drill_ASSE_creatingFlow = null;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ASSE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ASSE_controllerTank == undefined ){
		this.drill_ASSE_initSysData();
	}
	
};



//=============================================================================
// ** ☆控制器创建
//
//			说明：	> 此模块专门管理 控制器与贴图 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器创建 - 界面创建时（地图界面）
//==============================
var _drill_ASSE_mapCreate_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_ASSE_mapCreate_createAllWindows.call(this);
	this.drill_ASSE_sceneCreate();
};
//==============================
// * 控制器创建 - 帧刷新（地图界面）
//==============================
var _drill_ASSE_mapCreate_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_ASSE_mapCreate_update.call(this);
	this.drill_ASSE_updateCreateOnce();			//帧刷新 - 单次创建
	this.drill_ASSE_updateCreateConstant();		//帧刷新 - 连续创建
};
//==============================
// * 控制器创建 - 界面创建 （地图界面）
//
//			说明：	> 此效果用于防止刷菜单时，效果会消失。
//==============================
Scene_Map.prototype.drill_ASSE_sceneCreate = function() {
	$gameTemp._drill_ASSE_spriteTank = [];
	var cur_scene = SceneManager._scene;
	
	for(var i=0; i< $gameSystem._drill_ASSE_controllerTank.length; i++){
		var temp_controller = $gameSystem._drill_ASSE_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		var data = temp_controller._drill_data;
		
		// > 创建贴图
		var temp_sprite = new Drill_ASSE_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		$gameTemp._drill_ASSE_spriteTank.push( temp_sprite );
		
		// > 图片层级
		if( SceneManager._scene instanceof Scene_Map ){
			temp_sprite.zIndex = data['map_zIndex'];
			this.drill_ASSE_layerAddSprite( temp_sprite, temp_data['map_layer'] );
		}
		if( SceneManager._scene instanceof Scene_Battle ){
			temp_sprite.zIndex = data['battle_zIndex'];
			this.drill_ASSE_layerAddSprite( temp_sprite, temp_data['battle_layer'] );
		}
	}
	
	// > 层级排序
	this.drill_ASSE_sortByZIndex();
}
//==============================
// * 控制器创建 - 帧刷新 单次创建（地图界面）
//==============================
Scene_Map.prototype.drill_ASSE_updateCreateOnce = function() {
	if( $gameTemp._Drill_ASSE_createOne == undefined ){ return; }
	var data = $gameTemp._Drill_ASSE_createOne;
	$gameTemp._Drill_ASSE_createOne = null;
	
	this.drill_ASSE_createOne( data['style'] -1 );
};
//==============================
// * 控制器创建 - 帧刷新 连续创建（地图界面）
//==============================
Scene_Map.prototype.drill_ASSE_updateCreateConstant = function() {
	if( $gameSystem._drill_ASSE_creatingFlow == undefined ){ return; }
	var data = $gameSystem._drill_ASSE_creatingFlow;
	
	// > 帧刷新
	if( data['curTime'] % data['interval'] == 0 ){
		var time = Math.floor( data['curTime'] / data['interval'] );
		var seq_index = Math.floor( time % data['seq'].length );
		this.drill_ASSE_createOne( data['seq'][seq_index] -1 );
	}
	data['curTime'] += 1;
	
	// > 销毁
	if( data['curTime'] > data['tarTime'] ){
		$gameSystem._drill_ASSE_creatingFlow = null;
	}
};
//==============================
// * 控制器创建 - 执行创建 （地图界面）
//==============================
Scene_Map.prototype.drill_ASSE_createOne = function( style_id ){
	
	// > 创建控制器
	var temp_data = DrillUp.g_ASSE_style[ style_id ];
	var temp_controller = new Drill_ASSE_Controller( temp_data );
	$gameSystem._drill_ASSE_controllerTank.push( temp_controller );
	
	// > 创建贴图
	var temp_sprite = new Drill_ASSE_Sprite();
	temp_sprite.drill_sprite_setController( temp_controller );
	temp_sprite.drill_sprite_initChild();
	$gameTemp._drill_ASSE_spriteTank.push( temp_sprite );
	
	// > 图片层级
	if( SceneManager._scene instanceof Scene_Map ){
		temp_sprite.zIndex = temp_data['map_zIndex'];
		this.drill_ASSE_layerAddSprite( temp_sprite, temp_data['map_layer'] );
	}
	if( SceneManager._scene instanceof Scene_Battle ){
		temp_sprite.zIndex = temp_data['battle_zIndex'];
		this.drill_ASSE_layerAddSprite( temp_sprite, temp_data['battle_layer'] );
	}
	
	// > 层级排序
	this.drill_ASSE_sortByZIndex();
}

//==============================
// * 控制器创建 - 界面创建时（战斗界面）
//==============================
var _drill_ASSE_battleCreate_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_ASSE_battleCreate_createAllWindows.call(this);
	this.drill_ASSE_sceneCreate();
};
//==============================
// * 控制器创建 - 帧刷新（战斗界面）
//==============================
var _drill_ASSE_battleCreate_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_ASSE_battleCreate_update.call(this);
	this.drill_ASSE_updateCreateOnce();			//帧刷新 - 单次创建
	this.drill_ASSE_updateCreateConstant();		//帧刷新 - 连续创建
};
//==============================
// * 控制器创建 - 帧刷新 界面创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_ASSE_sceneCreate = Scene_Map.prototype.drill_ASSE_sceneCreate;
//==============================
// * 控制器创建 - 帧刷新 单次创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_ASSE_updateCreateOnce = Scene_Map.prototype.drill_ASSE_updateCreateOnce;
//==============================
// * 控制器创建 - 帧刷新 连续创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_ASSE_updateCreateConstant = Scene_Map.prototype.drill_ASSE_updateCreateConstant;
//==============================
// * 控制器创建 - 执行创建（战斗界面）
//==============================
Scene_Battle.prototype.drill_ASSE_createOne = Scene_Map.prototype.drill_ASSE_createOne;



//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 容器初始化
//==============================
var _drill_ASSE_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_ASSE_temp_initialize2.call(this);
	this._drill_ASSE_spriteTank = [];			//贴图容器
};
//==============================
// * 贴图控制 - 销毁时（地图界面）
//==============================
var _drill_ASSE_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_ASSE_smap_terminate.call(this);
	$gameTemp._drill_ASSE_spriteTank = [];		//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新（地图界面）
//==============================
var _drill_ASSE_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_ASSE_smap_update.call(this);
	this.drill_ASSE_updateController();			//帧刷新 - 控制器
	this.drill_ASSE_updateDestroy();			//帧刷新 - 销毁
};
//==============================
// * 贴图控制 - 帧刷新 控制器（地图界面）
//==============================
Scene_Map.prototype.drill_ASSE_updateController = function() {
	for(var i = 0; i < $gameSystem._drill_ASSE_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_ASSE_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器 - 帧刷新
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 贴图控制 - 帧刷新 销毁（地图界面）
//==============================
Scene_Map.prototype.drill_ASSE_updateDestroy = function() {
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_ASSE_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_ASSE_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_ASSE_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_ASSE_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_ASSE_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_ASSE_layerRemoveSprite( temp_sprite );
			$gameTemp._drill_ASSE_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};

//==============================
// * 贴图控制 - 销毁时（战斗界面）
//==============================
var _drill_ASSE_sbattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_ASSE_sbattle_terminate.call(this);
	$gameTemp._drill_ASSE_spriteTank = [];		//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新（战斗界面）
//==============================
var _drill_ASSE_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_ASSE_sbattle_update.call(this);
	this.drill_ASSE_updateController();			//帧刷新 - 控制器
	this.drill_ASSE_updateDestroy();			//帧刷新 - 销毁
};
//==============================
// * 贴图控制 - 帧刷新 控制器（战斗界面）
//==============================
Scene_Battle.prototype.drill_ASSE_updateController = Scene_Map.prototype.drill_ASSE_updateController;
//==============================
// * 贴图控制 - 帧刷新 销毁（战斗界面）
//==============================
Scene_Battle.prototype.drill_ASSE_updateDestroy = Scene_Map.prototype.drill_ASSE_updateDestroy;



//=============================================================================
// ** 静态快照控制器【Drill_ASSE_Controller】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个专门控制静态快照的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B基本变化
// **		
// **		说明：	> 该类可存储在 $gameMap 中。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_ASSE_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_ASSE_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_ASSE_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_ASSE_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();					//帧刷新 - A主体
	this.drill_controller_updateChange_Position();		//帧刷新 - B基本变化 - 平移
	this.drill_controller_updateChange_Opacity();		//帧刷新 - B基本变化 - 透明度
	this.drill_controller_updateChange_Scale();			//帧刷新 - B基本变化 - 缩放
	this.drill_controller_updateChange_Rotation();		//帧刷新 - B基本变化 - 旋转
	this.drill_controller_updateCheckNaN();				//帧刷新 - A主体 - 校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_ASSE_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_ASSE_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_ASSE_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ASSE_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ASSE_Controller.prototype.drill_controller_isDead = function(){
	if( this._drill_curTime > this._drill_lifeTime ){ return true; }
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_ASSE_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };					//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };						//控制器 - 暂停情况
	
	// > 贴图
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };					//贴图 - 混合模式
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };						//贴图 - 图片层级
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };									//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };									//A主体 - 平移Y
	if( data['lifeTime'] == undefined ){ data['lifeTime'] = 60 };					//A主体 - 单次变化时长
	
	// > B基本变化
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };					//B基本变化 - 透明度
	if( data['speedX'] == undefined ){ data['speedX'] = 0 };						//B基本变化 - 移动速度 X
	if( data['speedY'] == undefined ){ data['speedY'] = 0 };						//B基本变化 - 移动速度 Y
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };						//B基本变化 - 旋转速度（单位角度）
	if( data['scaleSpeed'] == undefined ){ data['scaleSpeed'] = 1 };				//B基本变化 - 目标缩放大小
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_ASSE_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initChange();			//初始化子功能 - B基本变化
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_ASSE_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_ASSE_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;					//常规 - 当前时间
	this._drill_lifeTime = data['lifeTime'];	//常规 - 持续时间
	this._drill_needDestroy = false;			//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_ASSE_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_ASSE_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_ASSE_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_ASSE_checkNaN = false;
			alert( DrillUp.drill_ASSE_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_ASSE_checkNaN = false;
			alert( DrillUp.drill_ASSE_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_ASSE_checkNaN = false;
			alert( DrillUp.drill_ASSE_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_ASSE_checkNaN = false;
			alert( DrillUp.drill_ASSE_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_ASSE_checkNaN = false;
			alert( DrillUp.drill_ASSE_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}

//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_ASSE_Controller.prototype.drill_controller_initChange = function() {
	var data = this._drill_data;
	
	// > 贴图 - 位置
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_xAcc = 0;
	this._drill_yAcc = 0;
	
	// > 贴图 - 透明度
	this._drill_opacity = 0;
	
	// > 贴图 - 缩放
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	
	// > 贴图 - 旋转
	this._drill_rotation = 0;								//父贴图（整体再旋转角度）
	this._drill_childSprite_rotation = 0;					//子贴图（自旋转）
}
//==============================
// * B基本变化 - 帧刷新 位置
//==============================
Drill_ASSE_Controller.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	
	// > 贴图 - 累加位置
	this._drill_xAcc += data['speedX'];
	this._drill_yAcc += data['speedY'];
	
	// > 贴图 - 位置
	var xx = Graphics.boxWidth*0.5;
	var yy = Graphics.boxHeight*0.5;
	xx += data['x'];
	yy += data['y'];
	xx += this._drill_xAcc;
	yy += this._drill_yAcc;
	this._drill_x = xx;
	this._drill_y = yy;
}
//==============================
// * B基本变化 - 帧刷新 透明度
//==============================
Drill_ASSE_Controller.prototype.drill_controller_updateChange_Opacity = function(){
	var data = this._drill_data;
	
	// > 贴图 - 透明度
	this._drill_opacity = data['opacity'] - data['opacity'] * this._drill_curTime / this._drill_lifeTime;
}
//==============================
// * B基本变化 - 帧刷新 缩放
//==============================
Drill_ASSE_Controller.prototype.drill_controller_updateChange_Scale = function(){
	var data = this._drill_data;
	
	// > 贴图 - 缩放
	this._drill_scaleX = 1 + data['scaleSpeed'] * this._drill_curTime / this._drill_lifeTime;
	this._drill_scaleY = 1 + data['scaleSpeed'] * this._drill_curTime / this._drill_lifeTime;
}
//==============================
// * B基本变化 - 帧刷新 旋转
//==============================
Drill_ASSE_Controller.prototype.drill_controller_updateChange_Rotation = function(){
	var data = this._drill_data;
	
	// > 贴图 - 旋转（子贴图）
	this._drill_childSprite_rotation += data['rotate'];
}



//=============================================================================
// ** 静态快照贴图【Drill_ASSE_Sprite】
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个静态快照贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B基本变化
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 贴图控制 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 静态快照贴图 - 定义
//==============================
function Drill_ASSE_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_ASSE_Sprite.prototype = Object.create(Sprite.prototype);
Drill_ASSE_Sprite.prototype.constructor = Drill_ASSE_Sprite;
//==============================
// * 静态快照贴图 - 初始化
//==============================
Drill_ASSE_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 静态快照贴图 - 帧刷新
//==============================
Drill_ASSE_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B基本变化
													//帧刷新 - C对象绑定（无）
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_ASSE_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_ASSE_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B基本变化
												//初始化子功能 - C对象绑定（无）
};

//##############################
// * 静态快照贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_ASSE_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 静态快照贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_ASSE_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 静态快照贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_ASSE_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller.drill_controller_isDead() == true ){ return true; }
    return false;
};
//##############################
// * 静态快照贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_ASSE_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 静态快照贴图 - 贴图初始化（私有）
//==============================
Drill_ASSE_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
};
//==============================
// * 静态快照贴图 - 销毁子功能（私有）
//==============================
Drill_ASSE_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this.removeChild( this._drill_childSprite );
	this._drill_childSprite = null;
	
	// > 销毁 - B基本变化
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 静态快照贴图 - 销毁自身（私有）
//==============================
Drill_ASSE_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_ASSE_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = data['blendMode'];
	this.zIndex = 0;
	this.visible = false;
	
	// > 静态快照 贴图
	var temp_sprite = new Sprite(); 
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = SceneManager.snap();	//（创建后立即截取当前屏幕）
	this._drill_childSprite = temp_sprite;
	
	this.addChild( this._drill_childSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_ASSE_Sprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	this.visible = data['visible'];
	this.blendMode = data['blendMode'];
}


//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_ASSE_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * B基本变化 - 帧刷新
//==============================
Drill_ASSE_Sprite.prototype.drill_sprite_updateChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置 - 层级位置修正
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	this.x = xx;
	this.y = yy;
	
	// > 透明度
	this.opacity = this._drill_controller._drill_opacity;
	
	// > 缩放
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	
	// > 旋转
	this.rotation = this._drill_controller._drill_rotation *Math.PI/180;	//（整体再旋转角度)
	this._drill_childSprite.rotation = this._drill_controller._drill_childSprite_rotation *Math.PI/180;
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


