//=============================================================================
// Drill_EventFrame.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        行走图 - 多帧行走图
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventFrame +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置行走图的 帧数、初始帧、帧播放速度 。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   事件、玩家都可以设置多帧行走图。但只对大图 $xxxx.png 有效。
 * 2.更多详细内容，去看看 "7.行走图 > 关于多帧行走图.docx"。
 * 帧数：
 *   (1.该插件专门扩充横向的帧，将默认的3列帧扩展到任意列的帧数。
 *      具体可以去看看 "7.行走图 > 关于多帧行走图.docx"。
 *   (2.镜像插件无法反射出与多帧行走图相符的镜像，你需要隐藏镜像。
 *   (3.使用rmmv指令 修改玩家图片/修改事件图片 时要注意帧数一致。
 *      如果你给了一张不符尺寸的单行走图，会得到错误的图片。
 *   (4.该插件兼容mog角色姿势，但是这就意味着你需要配帧数全相同的
 *      跳跃、等待、奔跑图像。
 * 动画帧间隔：
 *   (1.你可以填固定数字，也可以使用速度公式，6+(7-speed)*3，
 *      使得速度快慢能够影响与行走帧的播放速度。
 *   (2.量子妹的间隔为默认间隔，而小爱丽丝的间隔要少一些，这样可以
 *      让小爱丽丝行走帧快一些，看起来动作更加"努力"一点。
 * 行走循环动画：
 *   (1.当事件步行行走时，会循环播放动画，你可以控制动画的循环方式
 *      包括循环序列。
 *   (2.多帧事件在步行结束时，会有一个连贯性修正，使得帧动作不会立
 *      即变成初始帧。
 * 初始帧：
 *   (1.通常行走图分为两种状态：等待和移动。
 *      一般情况下，两种状态会共用行走图初始帧。你可以设置移动时排
 *      除初始帧的播放，来实现等待和移动的行走图分离播放。
 *   (2.随机初始帧通常用于大面积的装饰物事件，比如石头、瓦砾等对象。
 *      在事件页中，添加随机初始帧之后，就可以复制粘贴很多石头了。
 * 固定帧：
 *   (1.固定帧与锁定帧的定义不一样，见文档介绍。
 *      固定帧只控制帧数，锁定帧会控制帧数+朝向。
 *   (2.多帧行走图的固定帧与循环动画，都是控制行走帧的播放顺序。
 *      固定帧开启时，朝上下左右时，会使用锁定的那一列帧的图像。
 * 设计：
 *   (1.你可以缩短动画帧间隔，并配置一个三帧以上的行走图，使得你的
 *      人物移动时动作更加流畅。
 *   (2.你可以设置固定帧+黑白滤镜效果，来表示一个能转向行走但不会
 *      摇摆的小爱丽丝石像。
 *   (3.多帧行走图有很多通过改变帧数实现流畅行走图的设计方法。
 *      具体去看看 "7.行走图 > 关于多帧行走图.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过设置事件注释，来设置你要对应的多帧图片：
 * 
 * 事件注释：=>多帧行走图 : 帧数 : 5
 * 事件注释：=>多帧行走图 : 初始帧 : 2
 * 事件注释：=>多帧行走图 : 动画帧间隔 : 9
 * 事件注释：=>多帧行走图 : 动画帧间隔 : 6+(7-speed)*3
 * 事件注释：=>多帧行走图 : 移动时排除初始帧的播放
 * 事件注释：=>多帧行走图 : 移动时恢复初始帧的播放
 *
 * 角色注释：<多帧行走图:帧数:5>
 * 角色注释：<多帧行走图:初始帧:2>
 * 角色注释：<多帧行走图:动画帧间隔:9>
 * 角色注释：<多帧行走图:动画帧间隔:6+(7-speed)*3>
 * 角色注释：<多帧行走图:移动时排除初始帧的播放>
 * 角色注释：<多帧行走图:移动时恢复初始帧的播放>
 * 
 * 1.行走图有三个基本属性：
 *   帧数（默认3）、初始帧（默认2）、动画帧间隔（默认6+(7-speed)*3 ）
 *   具体可以去看看 "7.行走图 > 关于多帧行走图.docx"。
 * 2.玩家或者事件停止移动时，会恢复到初始帧的图片状态。
 * 3.rmmv的默认公式是 6+(7-speed)*3 ，成反比形式。
 *   速度最慢的1，代入公式，帧间隔为 24 。（相当于半秒换一帧）
 *   速度最快的6，代入公式，帧间隔为 9 。
 *   也就是说，速度越快，帧间隔越短，动画播放速度也越快。
 * 4.speed的值为 1,2,3,4,5,6 使用公式后，系统会自动计算，
 *   得出相应的间隔。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你也可以通过插件指令临时修改三个属性：
 * 
 * 插件指令：>多帧行走图 : 玩家 : 帧数 : 5
 * 插件指令：>多帧行走图 : 本事件 : 帧数 : 5
 * 插件指令：>多帧行走图 : 事件[10] : 帧数 : 5
 * 插件指令：>多帧行走图 : 事件变量[21] : 帧数 : 5
 * 插件指令：>多帧行走图 : 批量事件[10,11] : 帧数 : 5
 * 插件指令：>多帧行走图 : 批量事件变量[21,22] : 帧数 : 5
 * 
 * 插件指令：>多帧行走图 : 事件[10] : 帧数 : 5
 * 插件指令：>多帧行走图 : 事件[10] : 初始帧 : 2
 * 插件指令：>多帧行走图 : 事件[10] : 动画帧间隔 : 9
 * 
 * 1.前面部分（本事件）和后面设置（帧数 : 5）可以随意组合。
 *   一共有6*3种组合方式。
 * 2.玩家插件指令设置后，永久有效，必须手动解锁才可以恢复原样。
 *   事件插件指令设置后，只在本地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定帧
 * 你可以固定指定事件的帧：
 * 
 * 事件注释：=>多帧行走图 : 固定帧 : 1
 * 事件注释：=>多帧行走图 : 解除固定帧
 *
 * 角色注释：<多帧行走图:固定帧:5>
 * 角色注释：<多帧行走图:解除固定帧>
 * 
 * 1.固定帧开启时，朝上下左右时，会使用锁定的那一列帧的图像。
 * 2.注意，固定帧与锁定帧的定义不一样，
 *   详细见文档 "7.行走图 > 关于多帧行走图.docx" 的介绍。
 *   固定帧只控制帧数，锁定帧会控制帧数+朝向。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定帧（插件指令）
 * 你也可以通过插件指令临时修改三个属性：
 * 
 * 插件指令：>多帧行走图 : 玩家 : 固定帧 : 1
 * 插件指令：>多帧行走图 : 本事件 : 固定帧 : 1
 * 插件指令：>多帧行走图 : 事件[10] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 事件变量[21] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 批量事件[10,11] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 批量事件变量[21,22] : 固定帧 : 1
 * 
 * 插件指令：>多帧行走图 : 事件[10] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 事件[10] : 解除固定帧
 * 
 * 1.前面部分（本事件）和后面设置（固定帧 : 1）可以随意组合。
 *   一共有6*2种组合方式。
 * 2.玩家插件指令设置后，永久有效，必须手动解锁才可以恢复原样。
 *   事件插件指令设置后，只在本地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 行走循环动画
 * 你可以设置事件播放行走图的循环方式：
 *
 * 事件注释：=>多帧行走图 : 设置循环 : 从左往右循环
 * 事件注释：=>多帧行走图 : 设置循环 : 从右往左循环
 * 事件注释：=>多帧行走图 : 设置循环 : 左右往返
 * 事件注释：=>多帧行走图 : 设置循环 : 1,2,3,2
 *
 * 角色注释：<多帧行走图:设置循环:从左往右循环>
 * 角色注释：<多帧行走图:设置循环:从右往左循环>
 * 角色注释：<多帧行走图:设置循环:左右往返>
 * 角色注释：<多帧行走图:设置循环:1,2,3,2>
 * 
 * 1.数字"1,2,3,2"表示循环的序列。
 *   如果帧数只有3帧，却出现了越界数字4，则这一帧的行走图为空图。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 行走循环动画（插件指令）
 * 你也可以通过插件指令临时修改三个属性：
 * 
 * 插件指令：>多帧行走图 : 玩家 : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 本事件 : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 事件变量[21] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 批量事件[10,11] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 批量事件变量[21,22] : 设置循环 : 从左往右循环
 * 
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 从右往左循环
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 左右往返
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 1,2,3,2
 * 
 * 1.前面部分（本事件）和后面设置（设置循环 : 从左往右循环）可以随意组合。
 *   一共有6*4种组合方式。
 * 2.玩家插件指令设置后，永久有效，必须手动解锁才可以恢复原样。
 *   事件插件指令设置后，只在本地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 随机初始帧
 * 你可以通过设置事件注释，控制事件初始的帧数：
 * 
 * 事件注释：=>多帧行走图 : 随机初始帧
 * 事件注释：=>多帧行走图 : 随机初始帧 : 指定随机帧[1,2,4]
 * 事件注释：=>多帧行走图 : 随机初始帧(固定随机种子)
 * 事件注释：=>多帧行走图 : 随机初始帧(固定随机种子) : 指定随机帧[1,2,4]
 * 
 * 1.设置后，切换到事件页后会随机初始帧（默认 1~3 的随机范围）。
 *   "指定随机帧[1,2,4]"表示在指定的帧序号中，进行随机。
 * 2.默认情况下，如果玩家离开重进地图，那么帧数会再次随机。
 *   "固定随机种子"可以使得玩家重进地图时，帧数不再随机变化，而是固定的随机值。
 * 3.该设置能够和 行走图-锁定帧 插件合并使用。
 *   顺序固定为 先执行随机初始帧，再永久锁定帧。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【74.23ms】
 *              100个事件的地图中，平均消耗为：【51.21ms】
 *               50个事件的地图中，平均消耗为：【33.87ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.v1.1版本之前的插件，50个事件结果为：【67.98ms】。
 *   如果未升级建议立即升级。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 * [v1.3]
 * 大幅度完善了插件指令，以及文档、概念的说明。
 * [v1.4]
 * 修复了玩家初始帧设置无效的bug。
 * [v1.5]
 * 修复了玩家 修改动画帧 无效的bug。
 * [v1.6]
 * 添加了 随机初始帧 的功能。
 * [v1.7]
 * 添加了移动时，排除初始帧播放的功能。
 * 
 *
 * @param 是否修正多帧连贯性
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 事件停止移动时，修正会有一个恢复过程。不修正则立即切换到初始帧。
 * @default true
 *
 * @param 连贯性帧间隔
 * @type number
 * @min 1
 * @desc 恢复帧的间隔时间。
 * @default 3
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EF（Event_Frame）
//		临时全局变量	DrillUp.g_EF_xxx
//		临时局部变量	this._drill_EF.xxxx（所有变量都放在这个json中控制）
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.updatePattern
//						Game_Player.prototype.isOriginalPattern
//						Game_Player.prototype.resetPattern
//						Game_Follower.prototype.isOriginalPattern
//						Game_Follower.prototype.resetPattern
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理) 每帧
//		性能测试因素	200个事件
//		性能测试消耗	67.98ms		【直接eval】
//						33.87ms		【缓冲后】
//		最坏情况		所有事件都在变速度，并且都在乱跑。
//
//插件记录：
//		★大体框架与功能如下：
//			多帧行走图：
//				->插件指令
//				->注释初始化
//				->动画帧
//					> 帧数（Pattern定义）
//					> 帧间隔（与移动速度）
//					> 固定帧
//					> 是否排除初始帧
//					->行走循环动画
//						->从左往右
//						->从右往左
//						->左右往返
//						->自定义循环序列（不支持 初始帧恢复 和 排除初始帧）
//					->初始帧
//						->连贯性
//				->随机初始帧
//				->优化：eval公式值
//
//		★必要注意事项：
//			1._pattern与方向没有关系，该插件不需要考虑方向问题。
//			2."_originalPattern"原先只有事件有，这里强加给了玩家和队员。
//			
//		★其它说明细节：
//			1.Sprite_Character是附着在 Game_CharacterBase 上的，先有Character，后有Sprite。
//			2.两个需要留意的公式：
//				(this._pattern + 1) % this.maxPattern(); 帧循环公式
//				(9 - this.realMoveSpeed()) * 3;			帧速度公式
//			  展开公式后，if会变得非常多，看起来会比较杂乱。
//			  【公式的结果最好保存，而不是每次请求就计算一次。】
//			3.另外，玩家和跟随者，是需要翻越崇山峻岭，找到id，最后才找到的注释。
//			  （rmmv自己强行把玩家行走图这种远在天边的配置归纳到玩家设置里面也是醉了）
//
//		★存在的问题：
//			1.插件指令临时修改玩家的帧时，人物换队伍后，没有对应。暂时未想到办法。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFrame = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventFrame');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_EF_fix = String(DrillUp.parameters["是否修正多帧连贯性"] || "true") === "true";	
	DrillUp.g_EF_fix_inter = Number(DrillUp.parameters["连贯性帧间隔"] || 3); 
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EF_pluginCommand.call(this, command, args);
	if( command === ">多帧行走图" ){
		
		/*-----------------对象组获取------------------*/
		var e_ids = null;
		if(args.length >= 2){
			var unit = String(args[1]);
			
			if( e_ids == null && unit == "本事件" ){
				e_ids = [];
				e_ids.push( this._eventId );
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[j]) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( Number(unit) );
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( $gameVariables.value(Number(unit)) );
			}
			var eid = parseInt(unit);
			if( e_ids == null && !isNaN(eid) ){ 	// >多帧行走图 : 10 : 固定帧 : 1
				e_ids = [];
				e_ids.push( eid );
			}
		}
		
		/*-----------------解除固定帧------------------*/
		if(args.length == 4){
			var type = String(args[3]);
			
			if( e_ids != null ){
				if( type == "解除固定帧" || type == "解除锁定帧" ){
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_EF_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_EF['lockPattern'] = -1;
					}
				}
			}
			if( unit == "玩家" ){
				if( type == "解除固定帧" || type == "解除锁定帧" ){
					$gamePlayer._drill_EF['lockPattern'] = -1;
					for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
						var follower = $gamePlayer.followers()._data[i];
						follower._drill_EF['lockPattern'] = -1;
					};	
				}
			}
		}
		
		/*-----------------设置帧数------------------*/
		if(args.length == 6){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			
			if( e_ids != null ){
				if( type == "帧数" ){
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_EF_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_EF['num'] = Number(temp2);
					}
				}
				if( type == "初始帧" ){
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_EF_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._originalPattern = Number(temp2)-1;
					}
				}
				if( type == "动画帧间隔" ){
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_EF_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_EF['inter'] = String(temp2);
					}
				}
				if( type == "固定帧" || type == "锁定帧" ){
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_EF_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_EF['lockPattern'] = Number(temp2) -1;
					}
				}
				if( type == "设置循环" ){
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_EF_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						if( temp2.indexOf(",") != -1 || temp2.indexOf("，") != -1 ){
							e._drill_EF['loopData']['type'] = "自定义序列";
							var arr = temp2.split(/[,，]/);
							var arr2 = [];
							for(var j=0; j < arr.length ;j++ ){ arr2.push( Number(arr[j])-1 ); };
							e._drill_EF['loopData']['seq'] = arr2;
							e._drill_EF['loopData']['index'] = 0;
						}else{
							e._drill_EF['loopData']['type'] = String(temp2);
						}
					}
				}
			}
			if( unit == "玩家" ){
				if( type == "帧数" ){
					$gamePlayer._drill_EF['num'] = Number(temp2);
					//for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
					//	var follower = $gamePlayer.followers()._data[i];
					//	follower._drill_EF['num'] = Number(temp2);
					//};	
				}
				if( type == "初始帧" ){
					$gamePlayer._originalPattern = Number(temp2)-1;
					//for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
					//	var follower = $gamePlayer.followers()._data[i];
					//	follower._originalPattern = Number(temp2)-1;
					//};	
				}
				if( type == "动画帧间隔" ){
					$gamePlayer._drill_EF['inter'] = String(temp2);
					//for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
					//	var follower = $gamePlayer.followers()._data[i];
					//	follower._drill_EF['inter'] = String(temp2);
					//};
				}
				if( type == "固定帧" || type == "锁定帧" ){
					$gamePlayer._drill_EF['lockPattern'] = Number(temp2)-1;
					for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
						var follower = $gamePlayer.followers()._data[i];
						follower._drill_EF['lockPattern'] = Number(temp2)-1;
					};	
				}
				if( type == "设置循环" ){
					if( temp2.indexOf(",") != -1 || temp2.indexOf("，") != -1 ){
						$gamePlayer._drill_EF['loopData']['type'] = "自定义序列";
						var arr = temp2.split(/[,，]/);
						var arr2 = [];
						for(var j=0; j < arr.length ;j++ ){ arr2.push( Number(arr[j])-1 ); };
						$gamePlayer._drill_EF['loopData']['seq'] = arr2;
						$gamePlayer._drill_EF['loopData']['index'] = 0;
					}else{
						$gamePlayer._drill_EF['loopData']['type'] = String(temp2);
					}
					//...（暂不考虑队员）
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EF_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventFrame.js 行走图 - 多帧行走图】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

	
//=============================================================================
// ** 注释初始化
//=============================================================================
//==============================
// * 注释 - 事件注释初始化
//==============================
var _drill_EF_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EF_c_setupPageSettings.call(this);
	this.drill_EF_setupPageSettings();
};
Game_Event.prototype.drill_EF_setupPageSettings = function() {
	var page = this.page();
    var image = page.image;
    if( page && image.tileId <= 0 ){
		this.list().forEach(function(l) {	//将页面注释转成插件指令格式
			if( l.code === 108 ){
				var args = l.parameters[0].split(' ');
				var command = args.shift();
				
				if( command == "=>多帧行走图" ){
					if( args.length == 2 ){
						var type = String(args[1]);
						if( type == "解除固定帧"){
							this._drill_EF['lockPattern'] = -1;
						}
						if( type == "移动时排除初始帧的播放"){
							this._drill_EF['isExcludeOrg'] = true;
						}
						if( type == "移动时恢复初始帧的播放"){
							this._drill_EF['isExcludeOrg'] = false;
						}
					}
					if( args.length == 4 ){
						var type = String(args[1]);
						var temp2 = String(args[3]);
						if( type == "帧数"){
							this._drill_EF['num'] = Number(temp2);
						}
						if( type == "初始帧"){
							this._originalPattern = Number(temp2)-1;
						}
						if( type == "动画帧间隔"){
							this._drill_EF['inter'] = String(temp2);
						}
						if( type == "固定帧"){
							this._drill_EF['lockPattern'] = Number(temp2)-1;
						}
						if( type == "设置循环"){
							if( temp2.indexOf(",") != -1 || temp2.indexOf("，") != -1 ){
								this._drill_EF['loopData']['type'] = "自定义序列";
								var arr = temp2.split(/[,，]/);
								var arr2 = [];
								for(var j=0; j < arr.length ;j++ ){ arr2.push( Number(arr[j])-1 ); };
								this._drill_EF['loopData']['seq'] = arr2;
								this._drill_EF['loopData']['index'] = 0;
							}else{
								this._drill_EF['loopData']['type'] = String(temp2);
							}
						}
					}
				};  
			};
		}, this);
    }
}
//==============================
// * 注释 - 玩家注释初始化
//==============================
var _drill_EF_s_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
	_drill_EF_s_setCharacterBitmap.call(this);
	if(!this._character ){ return; }
	if( this._isBigCharacter == false ){ return; }	//只对单图有效

	/*-----------------玩家（注释）初始化------------------*/
	if( this._character instanceof Game_Player || this._character instanceof Game_Follower ){
		var actor = $gameParty.leader();
		if( this._character instanceof Game_Follower ){
			actor = this._character.actor();
		}
		if( actor == undefined ){ return; }
		var note = String($dataActors[actor.actorId()].note);
		
		var types = (note.match( /<多帧行走图:([^<>]*?)>/g )) || [];
		for(var r = 0; r < types.length; r++ ){
			var re_list = (types[r].match( /<多帧行走图:([^<>]*?)>/ )) || [];
			//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

			var args = String( re_list[1] ).split(':');
			if( args.length == 1 ){
				var type = String(args[0]);
				if( type == "解除固定帧"){
					this._character._drill_EF['lockPattern'] = -1;
				}
				if( type == "移动时排除初始帧的播放"){
					this._character._drill_EF['isExcludeOrg'] = true;
				}
				if( type == "移动时恢复初始帧的播放"){
					this._character._drill_EF['isExcludeOrg'] = false;
				}
			}
			if( args.length == 2 ){
				var type = String(args[0]);
				var temp2 = String(args[1]);
				if( type == "帧数"){
					this._character._drill_EF['num'] = Number(temp2);	//初始化图片信息相关内容，还需要同步到 this._character 中
				}
				if( type == "初始帧"){
					this._character._originalPattern = Number(temp2)-1;
				}
				if( type == "动画帧间隔"){
					this._character._drill_EF['inter'] = String(temp2);
				}
				if( type == "固定帧"){
					this._character._drill_EF['lockPattern'] = Number(temp2)-1;
				}
				if( type == "设置循环"){
					if( temp2.indexOf(",") != -1 || temp2.indexOf("，") != -1 ){
						this._character._drill_EF['loopData']['type'] = "自定义序列";
						var arr = temp2.split(/[,，]/);
						var arr2 = [];
						for(var j=0; j < arr.length ;j++ ){ arr2.push( Number(arr[j])-1 ); };
						this._character._drill_EF['loopData']['seq'] = arr2;
						this._character._drill_EF['loopData']['index'] = 0;
					}else{
						this._character._drill_EF['loopData']['type'] = String(temp2);
					}
				}
			}
		}
	}
}


//=============================================================================
// ** 动画帧
//=============================================================================
//==============================
// * 动画帧 - 物体初始化
//==============================
var _drill_EF_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_drill_EF_c_initMembers.call(this);
	
	this._originalPattern = 1;						//强制附加初始帧（继承的子类会覆盖此参数）
	
	this._drill_EF = {};	
	this._drill_EF['num'] = -1;							//帧数	
	this._drill_EF['inter'] = "";						//帧间隔
	this._drill_EF['lockPattern'] = -1;					//固定帧
	this._drill_EF['isExcludeOrg'] = false;				//是否排除初始帧
	this._drill_EF['loopData'] = {};					//循环动画
	this._drill_EF['loopData']['type'] = "从左往右循环";//循环动画 - 类型
	
	this._drill_EF_curInter = "";						//帧间隔 - 当前公式
	this._drill_EF_curRealSpeed = 0;					//帧间隔 - 当前移动速度
	this._drill_EF_curEvalInter = 0;					//帧间隔 - 当前间隔
	this._drill_EF_curResetCount = 0;					//连贯性 - 当前帧
}
//==============================
// * 动画帧 - 行走图帧刷新
//==============================
var _drill_EF_c_updateAnimation = Game_CharacterBase.prototype.updateAnimation;
Game_CharacterBase.prototype.updateAnimation = function() {
	_drill_EF_c_updateAnimation.call(this);
    /*
		原函数：
		this.updateAnimationCount();	//根据移动情况设置帧位移点（默认，行走+1，奔跑+1.5）
		if( this._animationCount >= this.animationWait() ){	//达到帧间隔 刷新帧
			this.updatePattern();
			this._animationCount = 0;
		}
	*/
	
	// > 连贯性 - 恢复过程（与resetPattern等价，但是写在最外层）
	if( !this.hasStepAnime() && this._stopCount > 0 ){
		if(this._drill_EF['num'] != -1 && DrillUp.g_EF_fix ){
			this._drill_EF_curResetCount += 1;
			if( this._drill_EF_curResetCount >= DrillUp.g_EF_fix_inter){
				this._drill_EF_curResetCount = 0;
				this.drill_EF_resetPatternSlowly();
			}
		}
	}
	
	// > 固定帧
	if( this._drill_EF['lockPattern'] != -1 ){	
		this._pattern = this._drill_EF['lockPattern'];
	}
};
//==============================
// * 动画帧 - 帧间隔
//==============================
var _drill_EF_c_animationWait = Game_CharacterBase.prototype.animationWait;
Game_CharacterBase.prototype.animationWait = function() {
	if( this._drill_EF['inter'] != "" ){
		
		// > 帧间隔公式
		if( this._drill_EF_curInter != this._drill_EF['inter'] ||
			this._drill_EF_curRealSpeed != this.realMoveSpeed() ){	//优化：速度如果变化，才求解一次公式，而不是每次都求解公式
			this._drill_EF_curInter = this._drill_EF['inter'];
			this._drill_EF_curRealSpeed = this.realMoveSpeed();
			
			var speed = this.realMoveSpeed();
			this._drill_EF_curEvalInter = Number(eval(this._drill_EF['inter']));
		}
		return this._drill_EF_curEvalInter;
		
	}else{
		// > 默认公式 	（(9 - this.realMoveSpeed()) * 3 ， 1速度24帧，2速度21帧，3速度18帧，6速度9帧）
		return _drill_EF_c_animationWait.call(this);
	}
};

//==============================
// * 动画帧 - 动画帧推进（非帧）（覆写）
//==============================
Game_CharacterBase.prototype.updatePattern = function() {
	/*
		原函数如下：
		
			// > 暂停情况检查
			if( !this.hasStepAnime() && this._stopCount > 0 ){
				this.resetPattern();
				
			// > 帧数推进
			}else{
				this._pattern = (this._pattern + 1) % this.maxPattern();
			}
		
	*/
	// > 暂停情况检查
	var is_stopping = true;
	if( this.hasStepAnime() == true ){	//（勾选了原地踏步，播放永久移动动画）
		is_stopping = false;
	}
	if( this._stopCount == 0 ){			//（停留时间为0，表示 正在移动）
		is_stopping = false;
	}
	if( is_stopping == true ){
		this.resetPattern();
		return;
	}
	
	
	// > 帧数推进
	this.drill_EF_pushForwardPattern();
	
	// > 排除初始帧时，若推进的帧数为初始帧，则再推进一次
	if( this._drill_EF['isExcludeOrg'] == true && 
		this._pattern == this._originalPattern ){ 
		this.drill_EF_pushForwardPattern();
	}
};
//==============================
// * 动画帧 - 帧数推进
//==============================
Game_CharacterBase.prototype.drill_EF_pushForwardPattern = function() {
	var data = this._drill_EF['loopData'];
	
	// > 移动中 - 从左往右
	if( data['type'] == "从左往右循环" || data['type'] == "从左至右循环" ){
		var pn = this._pattern + 1;
		if( pn >= this.maxPattern() ){ pn = 0 };
		this._pattern = pn;
	}
	
	// > 移动中 - 从右往左
	if( data['type'] == "从右往左循环" || data['type'] == "从右至左循环" ){
		var pn = this._pattern - 1 ;
		if( pn < 0 ){ pn = this.maxPattern()-1 };
		this._pattern = pn;
	}
	
	// > 移动中 - 左右往返
	if( data['type'] == "左右往返" ){
		if( data['dir'] == -1 ){		//dir记录当前循环方向
			var pn = this._pattern - 1 ;
			if( pn < 0 ){ pn = 1; data['dir'] = 1; };
			this._pattern = pn;
		}else{
			var pn = this._pattern + 1 ;
			if( pn >= this.maxPattern() ){ data['dir'] = -1; pn = this.maxPattern()-2; }
			this._pattern = pn;
		}
	}
	
	// > 移动中 - 自定义序列 （不支持 初始帧恢复 ）
	if( data['type'] == "自定义序列" ){
		data['index'] = (data['index'] + 1) % data['seq'].length;
		this._pattern = data['seq'][ data['index'] ];
	}
}

//==============================
// * 行走图 - 动画帧 - 最大帧数
//==============================
var _drill_EF_c_maxPattern = Game_CharacterBase.prototype.maxPattern;
Game_CharacterBase.prototype.maxPattern = function() {
	if( this._drill_EF['num'] != -1 ){ return this._drill_EF['num']; }
	return _drill_EF_c_maxPattern.call(this);
};
//==============================
// * 行走图 - 动画帧 - 当前帧数
//==============================
var _drill_EF_c_pattern = Game_CharacterBase.prototype.pattern;
Game_CharacterBase.prototype.pattern = function() {
	if( this._drill_EF['num'] != -1 ){ return this._pattern < this._drill_EF['num'] ? this._pattern : this._originalPattern; }
	return _drill_EF_c_pattern.call(this);
};

//==============================
// * 行走图 - 宽度
//==============================
var _drill_EF_s_patternWidth = Sprite_Character.prototype.patternWidth;
Sprite_Character.prototype.patternWidth = function() {
    if( this._isBigCharacter && this._character && this._character._drill_EF['num'] != -1) {
        return this.bitmap.width / this._character._drill_EF['num'];
    } else {
        return _drill_EF_s_patternWidth.call(this);
    }
};
//==============================
// * 行走图 - 高度
//==============================
/*		高度与朝向相关，不影响		*/


//=============================================================================
// ** 初始帧
//=============================================================================
//==============================
// * 初始帧 - 缓慢恢复初始帧
//==============================
Game_CharacterBase.prototype.drill_EF_resetPatternSlowly = function() {
	if( this._pattern > this._originalPattern ){
		this._pattern = this._pattern -1;
	}
	if( this._pattern < this._originalPattern ){
		this._pattern = this._pattern +1;
	}
}
//==============================
// * 初始帧 - 玩家 - 判断初始帧（覆写）
//==============================
Game_Player.prototype.isOriginalPattern = function() {
    return this.pattern() === this._originalPattern;
};
//==============================
// * 初始帧 - 玩家 - 恢复初始帧（覆写）
//==============================
Game_Player.prototype.resetPattern = function() {
    this.setPattern(this._originalPattern);
};
//==============================
// * 初始帧 - 队员 - 判断初始帧（覆写）
//==============================
Game_Follower.prototype.isOriginalPattern = function() {
    return this.pattern() === this._originalPattern;
};
//==============================
// * 初始帧 - 队员 - 恢复初始帧（覆写）
//==============================
Game_Follower.prototype.resetPattern = function() {
    this.setPattern(this._originalPattern);
};


//=============================================================================
// ** 随机初始帧（事件注释）
//=============================================================================
var _drill_EF_event_setupPage_random = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	this.drill_EF_setupRandom();
	_drill_EF_event_setupPage_random.call(this);
};
Game_Event.prototype.drill_EF_setupRandom = function() {
    if( this._pageIndex < 0 ){ return; }
    if( this._erased != false ){ return; }
	var page = this.page();
    if( page == undefined ){ return; }
	
	var li = this.list();
	for(var k=0; k < li.length; k++){
		var l = li[k];
		if( l.code !== 108 ){ continue; }
		var args = l.parameters[0].split(' ');
		var command = args.shift();
		if( command == "=>多帧行走图" ){
			if( args.length == 2 ){			//=>多帧行走图 : 当前事件页随机帧数
				var type = String(args[1]);
				if( type == "随机初始帧" ){
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 朝向设置
						page.image.pattern = Math.randomInt(3);
					}
				}
				if( type == "随机初始帧(固定随机种子)" ){
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 随机种子
						var seed = this._mapId * this._eventId * (this._pageIndex+1) + this._eventId * this._eventId - this._pageIndex +31;
						seed = ( seed * 9301 + 49297 ) % 233280;
						seed = seed / 233280.0;
						
						// > 朝向设置
						page.image.pattern = Math.floor(seed*3);
					}
				}
			}
			if( args.length == 4 ){
				var type = String(args[1]);
				var temp1 = String(args[3]);
				if( type == "随机初始帧" ){
					temp1 = temp1.replace("指定随机帧[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 朝向设置
						var ran = Math.randomInt(temp1.length);
						page.image.pattern = Number( temp1[ran] );
					}
				}
				if( type == "随机初始帧(固定随机种子)" ){
					temp1 = temp1.replace("指定随机帧[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 随机种子（与 地图id、事件id、事件页id 相关）
						var seed = this._mapId * this._eventId * (this._pageIndex+1) + this._eventId * this._eventId - this._pageIndex +31;
						seed = ( seed * 9301 + 49297 ) % 233280;
						seed = seed / 233280.0;
						
						// > 朝向设置
						var ran = Math.floor(seed * temp1.length);
						page.image.pattern = Number( temp1[ran] );
					}
				}
			}
		};
	}
};