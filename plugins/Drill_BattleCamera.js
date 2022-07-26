//=============================================================================
// Drill_BattleCamera.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        战斗 - 活动战斗镜头
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleCamera +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 镜头会根据选择的对象进行镜头动态移动。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 由于插件改变了默认固定战斗镜头的规则，对所有战斗UI相关插件有影响。
 * 被扩展：
 *   - Drill_EnemySimpleHud          战斗UI-简单生命框
 *   - Drill_ActorPortraitureExtend  战斗UI-高级角色肖像
 *   - Drill_GaugeForVariable        UI-高级变量固定框
 *   - Drill_GaugeForBoss            UI-高级BOSS生命固定框
 *   - Drill_PictureThumbtack        图片-图片图钉
 *     上述插件，都可以在镜头移动或缩放时，做相应的变换支持。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗整体图层。
 * 2.如果想了解镜头更多的内容，去看看 "2.战斗 > 关于战斗活动镜头.docx"。
 * 素材规则：
 *   (1.你只要满足： 
 *      战斗背景高度 >= 镜头架高度 >= 窗口高度
 *      战斗背景宽度 >= 镜头架宽度 >= 窗口宽度
 *      就可以随意控制战斗背景了。
 *   (2.示例中的配置为：
 *      战斗背景高度(1000) >= 镜头架高度(1000) >= 窗口高度(816)
 *      战斗背景高度(740) >= 镜头架高度(740) >= 窗口高度(624)
 *      这样，示例中有高度0-184范围，宽度0-176范围的可活动空间。
 *   (3.镜头架，相当于窗口的可活动区域。
 *      如果 镜头架宽度 小于 窗口宽度，则镜头无法左右移动。
 *      如果 镜头架高度 小于 窗口高度，则镜头无法上下移动。
 *   (4.你可以通过yep设置窗口为1280*720，设置镜头架为1366*768。
 *      那么你需要配置1366*768的战斗背景素材。（素材小了会看到黑边）
 *      相比原来的mog，这里的镜头不对战斗背景做任何多余操作。
 * 黑边问题：
 *   (1.关于素材看到黑边的几个问题可能原因：
 *   (2.素材小了。
 *      配置高度宽度大于你设置的窗口即可。
 *   (3.战斗背景位移比没有置0。
 *      如果你的战斗背景跟着你的镜头移动，那么很可能是因为你没有将
 *      位移比置0，由于背景往不同的方向移动，很可能会看到边界。
 *   (4.使用了其他相关镜头控制插件。
 *      首先确认一点，除了这个插件的插件指令可以缩放战斗图层。
 *      示例中【没有任何其他插件】会缩放战斗背景。
 *      如果你发现了战斗背景明显变大了，或者敌人大小和战斗背景大小
 *      明显不符，那么极有可能是其它插件进行了介入。造成了问题。
 * 镜头缩放/旋转：
 *   (1.镜头翻转/缩放的原理与 活动地图镜头 原理一样。
 *      你可以去看看活动地图镜头的注意事项。这里不赘述。
 *   (2.注意，镜头翻转，只对图像有效，鼠标点击区域没有变化。
 *      比如，敌人的鼠标靠近状态查看区域，翻转后，还是原来的位置。
 * 设计：
 *   (1.战斗镜头能够让战斗时的场景看起来更加开阔，但具体配置相对
 *      比较麻烦，可以去看看 "2.战斗 > 关于战斗活动镜头.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以手动改变镜头架的大小等参数。
 * 
 * 插件指令：>战斗镜头 : 开启
 * 插件指令：>战斗镜头 : 关闭
 * 插件指令：>战斗镜头 : 修改镜头架宽度 : 像素[1000]
 * 插件指令：>战斗镜头 : 修改镜头架高度 : 像素[740]
 * 插件指令：>战斗镜头 : 修改镜头切换时间 : 时间[15]
 * 插件指令：>战斗镜头 : 修改镜头聚焦延迟 : 时间[20]
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>开启战斗镜头
 * 插件指令(旧)：>关闭战斗镜头
 * 插件指令(旧)：>战斗镜头架高度 1000
 * 插件指令(旧)：>战斗镜头架宽度 740
 * 插件指令(旧)：>战斗镜头切换时间 10
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定看向
 * 你可以通过插件指令设置镜头固定看向某个位置：
 * 
 * 插件指令：>战斗镜头 : 固定看向 : 场景位置[200,200]
 * 插件指令：>战斗镜头 : 固定看向 : 场景位置变量[21,22]
 * 插件指令：>战斗镜头 : 固定看向 : 敌方位置[2]
 * 插件指令：>战斗镜头 : 固定看向 : 敌方变量位置[21]
 * 插件指令：>战斗镜头 : 固定看向 : 我方位置[2]
 * 插件指令：>战斗镜头 : 固定看向 : 我方变量位置[21]
 * 插件指令：>战斗镜头 : 解除固定看向
 * 
 * 1.注意，设置"固定看向"之后，如果不解除，则将永久保持看向的位置。
 *   战斗中的自动看向敌人功能将不起作用。解除固定看向 后将恢复。
 * 2.你可以写入越界的位置，比如"场景位置[-1000,-1000]"。
 *   由于镜头架的限制，这将会看向镜头架的最左上角。
 * 3."场景位置[0,0]"是战斗镜头的中心位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头缩放/旋转
 * 你可以通过插件指令设置镜头缩放：
 * 
 * 插件指令：>战斗镜头 : 缩放X : 1.50 : 时间[60]
 * 插件指令：>战斗镜头 : 缩放Y : 1.50 : 时间[60]
 * 插件指令：>战斗镜头 : 旋转 : 180 : 时间[60]
 * 
 * 1.缩放前一个数字表示缩放比例，后一个数字表示缩放持续时间，单位帧。
 *   缩放建议只用放大，不建议用缩小。
 *   缩放后永久有效，要记得恢复1.00缩放比例。
 * 2.旋转前一个数字表示旋转角度，后一个数字表示旋转持续时间，单位帧。
 *   旋转正数顺时针，也可为负数。
 * 3.缩放 和 旋转 不能 同时使用。
 * 4.缩放/旋转变化只有匀速。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头翻转
 * 你可以通过插件指令设置镜头翻转：
 * 
 * 插件指令：>战斗镜头 : 水平翻转 : 时间[60] : 匀速
 * 插件指令：>战斗镜头 : 垂直翻转 : 时间[60] : 匀速
 * 插件指令：>战斗镜头 : 顺时针翻转 : 时间[60] : 匀速
 * 插件指令：>战斗镜头 : 逆时针翻转 : 时间[60] : 匀速
 * 插件指令：>战斗镜头 : 水平翻转 : 时间[60] : 平滑
 * 插件指令：>战斗镜头 : 垂直翻转 : 时间[60] : 平滑
 * 插件指令：>战斗镜头 : 顺时针翻转 : 时间[60] : 平滑
 * 插件指令：>战斗镜头 : 逆时针翻转 : 时间[60] : 平滑
 * 插件指令：>战斗镜头 : 水平翻转 : 时间[60] : 弹性
 * 插件指令：>战斗镜头 : 垂直翻转 : 时间[60] : 弹性
 * 插件指令：>战斗镜头 : 顺时针翻转 : 时间[60] : 弹性
 * 插件指令：>战斗镜头 : 逆时针翻转 : 时间[60] : 弹性
 * 
 * 插件指令：>战斗镜头 : 恢复翻转 : 时间[60] : 匀速
 * 插件指令：>战斗镜头 : 恢复翻转 : 时间[60] : 平滑
 * 插件指令：>战斗镜头 : 恢复翻转 : 时间[60] : 弹性
 * 
 * 1.数字表示翻转的时间，单位帧。
 * 2.注意，翻转只能处于一种状态。比如顺时针翻转后。其它翻转指令完全失效。
 *   只有恢复翻转后，才能进行其它翻转操作。
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
 * 时间复杂度： o(n^3) 每帧
 * 测试方法：   在战斗界面中，测试战斗镜头的消耗。
 * 测试结果：   战斗界面中，平均消耗为：【12.69ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.战斗镜头大多都是数学位置转换计算，不操作贴图处理。不过相对
 *   而已消耗比一般单纯位置计算插件要多一点。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了镜头翻转、镜头缩放功能。
 * [v1.2]
 * 修复了在sideview情况下，默认战斗背景出现黑边的问题。
 * [v1.3]
 * 修复了镜头移动时，战斗UI跟随延迟的bug。
 * [v1.4]
 * 修复了镜头移动时，配置了位移比的 背景/魔法圈/GIF 会出现不稳定瞬移的bug。
 * [v1.5]
 * 优化了内部结构，以及插件指令。
 * 修复了 车轮战结束 后，镜头第一回合无法移动的bug。
 * 
 * 
 * @param 镜头架宽度
 * @type number
 * @min 50
 * @desc 镜头可以活动的宽度。战斗背景大小 >= 镜头架宽度 >= 窗口宽度 。
 * @default 1000
 *
 * @param 镜头架高度
 * @type number
 * @min 50
 * @desc 镜头可以活动的高度。战斗背景大小 >= 镜头架高度 >= 窗口高度 。
 * @default 740
 *
 * @param 镜头移动模式
 * @type select
 * @option 弹性移动
 * @value 弹性移动
 * @option 匀速移动
 * @value 匀速移动
 * @desc 镜头移动到新目标的模式。
 * @default 弹性移动
 *
 * @param 镜头切换时间
 * @parent 镜头移动模式
 * @type number
 * @min 1
 * @desc 镜头切换移动目标时，移动的时间，单位帧。（1秒60帧）
 * @default 18
 *
 * @param 镜头聚焦延迟
 * @type number
 * @min 0
 * @desc 镜头移动延迟的时间。20表示20帧后开始移动镜头。（1秒60帧）
 * @default 10  
 *
 * @param 偏移-镜头 X
 * @desc 默认镜头聚焦目标的中心，在中心的基础上x轴方向偏移，单位像素。（可为负数）
 * @default 0
 *
 * @param 偏移-镜头 Y
 * @desc 默认镜头聚焦目标的中心，在中心的基础上y轴方向偏移，单位像素。（可为负数）
 * @default 0
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BCa（Battle_Camera）
//		临时全局变量	DrillUp.g_BCa_xxx
//		临时局部变量	$gameTemp._drill_cam_xxx	（许多插件关联，不再改动）
//		存储数据变量	$gameSystem._drill_cam_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	12.69ms（drill_BCa_lockAnchor） 6.26ms（Spriteset_Battle.prototype.update）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			战斗活动镜头：
//				->镜头移动目标
//					->标记
//					->聚焦敌人
//					->镜头位置
//				->镜头移动方式
//					->镜头架
//					->匀速移动
//					->弹性移动
//				->镜头属性
//					->镜头缩放/旋转
//					->翻转的镜头
//					x->镜头放大特写
//				->其它插件兼容
//				->单位贴图
//					->获取 - 敌人容器指针【标准函数】
//					->获取 - 根据敌方索引【标准函数】
//					->获取 - 根据敌人ID【标准函数】
//					->获取 - 角色容器指针【标准函数】
//					->获取 - 根据我方索引【标准函数】
//					->获取 - 根据角色ID【标准函数】
//				->镜头属性
//					->镜头范围【标准函数】
//					->镜头架范围【标准函数】
//					->镜头位置【标准函数】
//					->缩放 - 当前X缩放值【标准函数】
//					->缩放 - 当前Y缩放值【标准函数】
//					->缩放 - 镜头的X 转 缩放后的X【标准函数】
//					->缩放 - 镜头的Y 转 缩放后的Y【标准函数】
//					->缩放 - 缩放后的X 转 镜头的X【标准函数】
//					->缩放 - 缩放后的Y 转 镜头的Y【标准函数】
//	
//		★必要注意事项：
//			1.该插件与弹道核心没有交互，为了独立开来，使用了弹道核心部分代码片段。
//		
//		★其它说明细节：
//			1.该插件原本原理只是对 _battleField 进行简单平移。
//			  （mog由于直接改变了大小，越弄越复杂，这里重建，简化方式。）
//			2.战斗镜头的平移控制的是 _battleField 图层，
//			  缩放、旋转控制的是Spriteset_Battle。
//
//		★存在的问题：
//			1.插件没有完全脱离mog的影子，内部有已经套牢并且无法改名的变量名。（外部插件都与此插件关联引用）
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleCamera = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleCamera');


	/*-----------------杂项------------------*/
	DrillUp.g_BCa_x = Number(DrillUp.parameters['平移-镜头 X'] || 0);
	DrillUp.g_BCa_y = Number(DrillUp.parameters['平移-镜头 Y'] || 0);
	DrillUp.g_BCa_limit_width = Number(DrillUp.parameters['镜头架宽度'] || 1500);
	DrillUp.g_BCa_limit_height = Number(DrillUp.parameters['镜头架高度'] || 900);
    DrillUp.g_BCa_moveType = String(DrillUp.parameters['镜头移动模式'] || '弹性移动');
    DrillUp.g_BCa_switchTime = Number(DrillUp.parameters['镜头切换时间'] || 15);
	DrillUp.g_BCa_ftime = Number(DrillUp.parameters['镜头聚焦延迟'] || 20);
	
	
//=============================================================================
// ** 插件指令
//=============================================================================	
var _drill_BCa_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BCa_pluginCommand.call(this,command, args)
	
	if( command === ">战斗镜头" ){
	
		/*-----------------镜头架------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "开启" ){
				$gameSystem._drill_cam_enable = true;
			}
			if( type == "关闭" ){
				$gameSystem._drill_cam_enable = false;
			}
		}
		if( args.length == 4 ){ 		// >战斗镜头 : 修改镜头架高度 : 像素[1000]
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改镜头架宽度" ){
				temp1 = temp1.replace("像素[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_cam_limit_width = Number(temp1);
			}
			if( type == "修改镜头架高度" ){
				temp1 = temp1.replace("像素[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_cam_limit_height = Number(temp1);
			}
			if( type == "修改镜头切换时间" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_cam_switchTime = Number(temp1);
			}
			if( type == "修改镜头聚焦延迟" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_cam_ftime = Number(temp1);
			}
		}
	
		/*-----------------固定看向------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "解除固定看向" ){
				$gameSystem._drill_BCa_lookAt_x = null;
				$gameSystem._drill_BCa_lookAt_y = null;
			}
		}
		if( args.length == 4 ){ 		// >战斗镜头 : 修改镜头架高度 : 像素[1000]
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "固定看向" ){
				
				var pos = null;
				if( temp1.indexOf("场景位置变量[") != -1 ){
					temp1 = temp1.replace("场景位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
							
				}else if( temp1.indexOf("场景位置[") != -1 ){
					temp1 = temp1.replace("场景位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
							
				}else if( temp1.indexOf("敌方变量位置[") != -1 ){
					temp1 = temp1.replace("敌方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BCa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BCa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
					
				}else if( temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BCa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BCa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}
				
				if( pos != null && pos.length >= 2 ){
					$gameSystem._drill_BCa_lookAt_x = Number(pos[0]);
					$gameSystem._drill_BCa_lookAt_y = Number(pos[1]);
				}
			}
		}
		
		
		/*-----------------翻转------------------*/
		if( args.length == 6 ){ 		// >战斗镜头 : 水平翻转 : 60 : 匀速
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			temp1 = temp1.replace("时间[","");
			temp1 = temp1.replace("]","");
			temp2 = temp2.replace("时间[","");
			temp2 = temp2.replace("]","");
			if( (type == "顺时针翻转" || type == "逆时针翻转") && $gameSystem._drill_BCa_flip.lock == false){
				$gameSystem._drill_BCa_flip.type = type;
				$gameSystem._drill_BCa_flip.back = false;
				$gameSystem._drill_BCa_flip.mode = temp2;
				$gameSystem._drill_BCa_flip.time = Number(temp1);
				$gameSystem._drill_BCa_flip.move = 0;
				$gameSystem._drill_BCa_flip.lock = true;
			}
			if( (type == "水平翻转" || type == "垂直翻转") && $gameSystem._drill_BCa_flip.lock == false){
				$gameSystem._drill_BCa_flip.type = type;
				$gameSystem._drill_BCa_flip.back = false;
				$gameSystem._drill_BCa_flip.mode = temp2;
				$gameSystem._drill_BCa_flip.time = Number(temp1);
				$gameSystem._drill_BCa_flip.move = 0;
				$gameSystem._drill_BCa_flip.lock = true;
			}
			if( type == "恢复翻转" && $gameSystem._drill_BCa_flip.lock == true ){
				$gameSystem._drill_BCa_flip.back = true;
				$gameSystem._drill_BCa_flip.mode = temp2;
				$gameSystem._drill_BCa_flip.time = Number(temp1);
				$gameSystem._drill_BCa_flip.move = Number(temp1);
			}
			if( type == "缩放X" ){
				$gameSystem._drill_BCa_X.move = 0;
				$gameSystem._drill_BCa_X.time = Math.max(Number(temp2),1);
				$gameSystem._drill_BCa_X.speed = (Number(temp1) - 1 - $gameSystem._drill_BCa_X.cur)/$gameSystem._drill_BCa_X.time;
			}
			if( type == "缩放Y" ){
				$gameSystem._drill_BCa_Y.move = 0;
				$gameSystem._drill_BCa_Y.time = Math.max(Number(temp2),1);
				$gameSystem._drill_BCa_Y.speed = (Number(temp1) - 1 - $gameSystem._drill_BCa_Y.cur)/$gameSystem._drill_BCa_Y.time;
			}
			if( type == "旋转" ){
				$gameSystem._drill_BCa_R.move = 0;
				$gameSystem._drill_BCa_R.time = Math.max(Number(temp2),1);
				$gameSystem._drill_BCa_R.speed = (Number(temp1) - $gameSystem._drill_BCa_R.cur)/$gameSystem._drill_BCa_R.time;
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">镜头切换时间" || command === ">战斗镜头切换时间" ){
		if(args.length == 1){
			$gameSystem._drill_cam_switchTime = Number(args[0]);
		};
	};
	if( command === ">镜头架高度" || command === ">战斗镜头架高度" ){
		if(args.length == 1){
			$gameSystem._drill_cam_limit_height = Number(args[0]);
		};
	};
	if( command === ">镜头架宽度" || command === ">战斗镜头架宽度" ){
		if(args.length == 1){
			$gameSystem._drill_cam_limit_width = Number(args[0]);
		};
	};
	if( command === ">开启镜头" || command === ">开启战斗镜头" ){ $gameSystem._drill_cam_enable = true;  };
	if( command === ">关闭镜头" || command === ">关闭战斗镜头" ){ $gameSystem._drill_cam_enable = false; };
};


//=============================================================================
// ** 存储变量初始化
//=============================================================================	
var _drill_BCa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_BCa_sys_initialize.call(this);
	
    this._drill_cam_enable = true ;								//镜头激活
    this._drill_cam_switchTime = DrillUp.g_BCa_switchTime;		//镜头切换时间
    this._drill_cam_ftime = DrillUp.g_BCa_ftime;				//镜头聚焦延迟
    this._drill_cam_limit_width = DrillUp.g_BCa_limit_width;	//镜头架宽度
    this._drill_cam_limit_height = DrillUp.g_BCa_limit_height;	//镜头架高度
	
	this._drill_BCa_lookAt_x = null;	//看向位置
	this._drill_BCa_lookAt_y = null;	//
	
	this._drill_BCa_X = {}				// 缩放x
	this._drill_BCa_X.cur = 0;      	//     cur = -0.1，则缩放为0.9
	this._drill_BCa_X.move = 0;     	//
	this._drill_BCa_X.time = 0;     	//
	this._drill_BCa_Y = {}          	// 缩放y
	this._drill_BCa_Y.cur = 0;      	//
	this._drill_BCa_Y.move = 0;     	//
	this._drill_BCa_Y.time = 0;     	//
	this._drill_BCa_R = {}          	// 旋转
	this._drill_BCa_R.cur = 0;      	//
	this._drill_BCa_R.move = 0;    		//
	this._drill_BCa_R.time = 0;    		//
    this._drill_BCa_flip = {};			//翻转控制
    this._drill_BCa_flip.lock = false;	//
};

//=============================================================================
// ** 临时变量初始化
//=============================================================================	
//==============================
// * 临时变量 - 初始化
//==============================
var _drill_BCa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BCa_temp_initialize.call(this);
    this.drill_BCa_clearCamera();
};
//==============================
// * 临时变量 - 清理镜头属性
//==============================
Game_Temp.prototype.drill_BCa_clearCamera = function() {
	this._drill_BCa_cur_actor = [null,[0,0]];			//当前选中角色（sv）
	this._drill_BCa_being_attack = [null,[0,0],0];		//受伤害单位
	this._drill_BCa_select_single = [null,[0,0]];		//选中一个单位
	this._drill_BCa_select_single_turn = [null,[0,0]];	//
	this._drill_BCa_select_all = false;					//选中所有单位
	this._drill_BCa_select_all_turn = false;			//
	this._drill_BCa_battleEnd = false;					//战斗结束标记
	
	this._drill_cam_pos = [0,0];						//镜头所在位置（常用接口）
	
	this._drill_cam_result_move_X = 0;					//镜头实际位移量X（存在问题，已弃用）
	this._drill_cam_result_move_Y = 0;					//镜头实际位移量Y（存在问题，已弃用）
};


//#############################################################################
// ** 【标准模块】单位贴图
//#############################################################################
//##############################
// * 单位贴图 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BCa_getEnemySpriteTank = function(){
	return this.drill_BCa_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BCa_getEnemySpriteByIndex = function( index ){
	return this.drill_BCa_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_BCa_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_BCa_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BCa_getActorSpriteTank = function(){
	return this.drill_BCa_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BCa_getActorSpriteByIndex = function( index ){
	return this.drill_BCa_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BCa_getActorSpriteByActorId = function( actor_id ){
	return this.drill_BCa_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 单位贴图（接口实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_BCa_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_BCa_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BCa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.index() == index ){
			return enemy_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌人ID（私有）
//==============================
Game_Temp.prototype.drill_BCa_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_BCa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return []; }
	var result_list = [];
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.enemyId() == enemy_id ){
			result_list.push( enemy_sprite );
		}
	}
	return result_list;
};
//==============================
// * 单位贴图容器 - 获取 - 角色容器指针（私有）
//==============================
Game_Temp.prototype.drill_BCa_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_BCa_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BCa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.index() == index ){
			return actor_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据角色ID（私有）
//==============================
Game_Temp.prototype.drill_BCa_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_BCa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.actorId() == actor_id ){
			return actor_sprite;
		}
	}
	return null;
};



//#############################################################################
// ** 【标准模块】镜头属性
//#############################################################################
//##############################
// * 镜头属性 - 镜头范围【标准函数】
//				
//			参数：	无
//			返回：	> 矩形对象
//          
//			说明：	> 常规的镜头矩形范围，不含缩放情况。单位像素。
//##############################
Game_System.prototype.drill_BCa_getCameraRect = function(){
	return this.drill_BCa_getCameraRect_Private();
}
//##############################
// * 镜头属性 - 镜头架范围【标准函数】
//				
//			参数：	无
//			返回：	> 矩形对象
//          
//			说明：	> 镜头架的矩形范围，单位像素。注意x，y可以为负数。
//##############################
Game_System.prototype.drill_BCa_getCameraHolderRect = function(){
	return this.drill_BCa_getCameraHolderRect_Private();
}
//##############################
// * 镜头属性 - 镜头位置【标准函数】
//				
//			参数：	无
//			返回：	> 点对象
//          
//			说明：	> 注意，点位置可以为负数。
//##############################
Game_System.prototype.drill_BCa_curPos = function(){
	return this.drill_BCa_curPos_Private();
}
//##############################
// * 镜头属性 - 缩放 - 当前X缩放值【标准函数】
//				
//			参数：	无
//			返回：	> 数字
//          
//			说明：	> 1.00表示默认缩放值。
//##############################
Game_System.prototype.drill_BCa_curScaleX = function(){
	return 1;
}
//##############################
// * 镜头属性 - 缩放 - 当前Y缩放值【标准函数】
//				
//			参数：	无
//			返回：	> 数字
//          
//			说明：	> 1.00表示默认缩放值。
//##############################
Game_System.prototype.drill_BCa_curScaleY = function(){
	return 1;
}
//##############################
// * 镜头属性 - 缩放 - 镜头的X 转 缩放后的X【标准函数】
//				
//			参数：	> x 数字（镜头的X值）
//			返回：	> 数字  （缩放后的X值）
//##############################
Game_System.prototype.drill_BCa_cameraToMapX = function( x ){
	return x;
}
//##############################
// * 镜头属性 - 缩放 - 镜头的Y 转 缩放后的Y【标准函数】
//				
//			参数：	> y 数字（镜头的Y值）
//			返回：	> 数字  （缩放后的Y值）
//##############################
Game_System.prototype.drill_BCa_cameraToMapY = function( y ){
	return y;
}
//##############################
// * 镜头属性 - 缩放 - 缩放后的X 转 镜头的X【标准函数】
//				
//			参数：	> x 数字（缩放后的X值）
//			返回：	> 数字  （镜头的X值）
//##############################
Game_System.prototype.drill_BCa_mapToCameraX = function( x ){
	return x;
}
//##############################
// * 镜头属性 - 缩放 - 缩放后的Y 转 镜头的Y【标准函数】
//				
//			参数：	> y 数字（缩放后的Y值）
//			返回：	> 数字  （镜头的Y值）
//##############################
Game_System.prototype.drill_BCa_mapToCameraY = function( y ){
	return y;
}
//=============================================================================
// ** 镜头属性（接口实现）
//=============================================================================
//==============================
// * 镜头属性 - 镜头范围（私有）
//==============================
Game_System.prototype.drill_BCa_getCameraRect_Private = function(){
	return new Rectangle( 0, 0, Graphics.boxWidth, Graphics.boxHeight );
}
//==============================
// * 镜头属性 - 镜头架范围（私有）
//==============================
Game_System.prototype.drill_BCa_getCameraHolderRect_Private = function(){
	var x = ($gameSystem._drill_cam_limit_width - Graphics.boxWidth) * 0.5;
	var y = ($gameSystem._drill_cam_limit_height - Graphics.boxHeight) * 0.5;
	if( x < 0 ){ x = 0; }
	if( y < 0 ){ y = 0; }
	return new Rectangle( x, y, $gameSystem._drill_cam_limit_width, $gameSystem._drill_cam_limit_height );
}
//==============================
// * 镜头属性 - 镜头位置（私有）
//==============================
Game_System.prototype.drill_BCa_curPos_Private = function(){
	return {'x': $gameTemp._drill_cam_pos[0], 'y': $gameTemp._drill_cam_pos[1] };
}


//=============================================================================
// ** 镜头属性
//=============================================================================
//==============================
// * 镜头属性 - 固定帧初始值
//==============================
var _drill_BCa_updatePosition = Spriteset_Battle.prototype.updatePosition;
Spriteset_Battle.prototype.updatePosition = function() {
	_drill_BCa_updatePosition.call(this);				// x、y、z、缩放x、缩放y
	if( this.rotation != 0 ){ this.rotation = 0; }		// 旋转
	//if( this.skew.x != 0 ){ this.skew.x = 0; }		// 斜切x
	//if( this.skew.y != 0 ){ this.skew.y = 0; }		// 斜切y
														//Spriteset_Battle的中心锚点没有效果，且rotation被锁定为（0,0）中心点位置，这里索性固定中心点为(0,0)。
}
//==============================
// * 镜头属性 - 帧刷新
//==============================
var _drill_BCa_updatePosition2 = Spriteset_Battle.prototype.updatePosition;
Spriteset_Battle.prototype.updatePosition = function() {
	_drill_BCa_updatePosition2.call(this);			
	
	this._drill_BCa_change_rotation = 0;	//旋转
	this._drill_BCa_change_sizeX = 1;		//缩放x
	this._drill_BCa_change_sizeY = 1;		//缩放y
	
	this.drill_BCa_resize();				//缩放操作
	this.drill_BCa_rotate();				//旋转操作
	this.drill_BCa_flip();					//翻转控制
	this.drill_BCa_lockAnchor();			//锁定锚点
};
//==============================
// * 镜头属性 - 缩放
//==============================
Spriteset_Battle.prototype.drill_BCa_resize = function() {
	var re_x = $gameSystem._drill_BCa_X;
	var re_y = $gameSystem._drill_BCa_Y;
	re_x.move += 1;
	re_y.move += 1;
	
	if( re_x.move < re_x.time ){ re_x.cur += re_x.speed; }
	if( re_y.move < re_y.time ){ re_y.cur += re_y.speed; }
	
	this._drill_BCa_change_sizeX += re_x.cur;
	this._drill_BCa_change_sizeY += re_y.cur;
}
//==============================
// * 镜头属性 - 旋转
//==============================
Spriteset_Battle.prototype.drill_BCa_rotate = function() {
	var re_r = $gameSystem._drill_BCa_R;
	re_r.move += 1;
	
	if( re_r.move < re_r.time ){
		re_r.cur += re_r.speed;
	}
	
	this._drill_BCa_change_rotation += ( re_r.cur /180.0 )*Math.PI;
}
//==============================
// * 镜头属性 - 锁定锚点
//==============================
Spriteset_Battle.prototype.drill_BCa_lockAnchor = function() {
	var rotation = this._drill_BCa_change_rotation;
	var scale_x = this._drill_BCa_change_sizeX;
	var scale_y = this._drill_BCa_change_sizeY;
	if( rotation == 0 && scale_x == 1 && scale_y == 1 ){ return; } 
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_BCa_getFixPointInAnchor( 0,0, 0.5,0.5, Graphics.boxWidth,Graphics.boxHeight, rotation, scale_x, scale_y );
	this.x += Graphics.boxWidth/2;	
	this.y += Graphics.boxHeight/2;	
	this.x += fix_point.x;	
	this.y += fix_point.y;	
	
	this.rotation = rotation;
	this.scale.x *= scale_x;
	this.scale.y *= scale_y;
}
//=============================================================================
// * 数学 - 锁定锚点
//			
//			说明：修正 旋转+缩放 的xy坐标，使其看起来像是在绕着 新的锚点 变换。
//=============================================================================
Game_Temp.prototype.drill_BCa_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图中心锚点 
					target_anchor_x,target_anchor_y, 	//新的中心锚点 
					width, height,						//贴图高宽
					rotation, scale_x, scale_y ) {		//变换的值（旋转+缩放）
	
	var ww = width * ( target_anchor_x - org_anchor_x );
	var hh = height * ( target_anchor_y - org_anchor_y );
	var xx = 0;
	var yy = 0;
	if( ww == 0 && hh == 0){ return { "x":0, "y":0 }; }
	if( ww == 0 ){ ww = 0.0001; }
	
	var r = Math.sqrt( Math.pow(ww,2) + Math.pow(hh,2) );
	var p_degree = Math.atan(hh/ww);	
	p_degree = Math.PI - p_degree;
	
	xx = r*Math.cos( rotation - p_degree);		//圆公式 (x-a)²+(y-b)²=r²
	yy = r*Math.sin( rotation - p_degree);		//圆极坐标 x=ρcosθ,y=ρsinθ
	xx += ww * (1 - scale_x);
	yy += hh * (1 - scale_y);
	
	return { "x":xx, "y":yy };
}
//==============================
// * 镜头属性 - 翻转控制
//==============================
Spriteset_Battle.prototype.drill_BCa_flip = function() {
	var flip = $gameSystem._drill_BCa_flip;
	
	if(flip.type == "顺时针翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2)) - Math.PI;
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += Math.PI * flip.move / flip.time ;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move-flip.time , 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2));
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += Math.PI * flip.move / flip.time ;
			}
		}
	}
	if(flip.type == "逆时针翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2)) - Math.PI;
			}else if( flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += -Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += -Math.PI * flip.move / flip.time ;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move-flip.time , 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2));
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += -Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += -Math.PI * flip.move / flip.time ;
			}
		}
	}
	if(flip.type == "水平翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeX *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeX *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeX *= -2 * flip.move / flip.time + 1;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeX *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeX *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeX *= -2 * flip.move / flip.time + 1;
			}
		}
	}
	if(flip.type == "垂直翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeY *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeY *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeY *= -2 * flip.move / flip.time + 1;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeY *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeY *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeY *= -2 * flip.move / flip.time + 1;
			}
		}
	}
}


//=============================================================================
// ** 镜头移动目标标记
//=============================================================================
//==============================
// * 标记 - 选中全部敌人时（Scene_Battle）
//==============================
var _drill_BCa_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
	var action = BattleManager.inputtingAction();
	$gameTemp._drill_BCa_select_all = action.isForAll();
	_drill_BCa_onSelectAction.call(this);    
};
//==============================
// * 标记 - 角色窗口被隐藏时（Window BattleActor）
//==============================
var _drill_BCa_win_actor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
    _drill_BCa_win_actor_hide.call(this);
    $gameTemp._drill_BCa_select_all = false;
	$gameTemp._drill_BCa_select_single = null;
};
//==============================
// * 标记 - 选中一个敌人时（Window BattleActor）
//==============================
var _drill_BCa_win_actor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _drill_BCa_win_actor_select.call(this,index);
	$gameTemp._drill_BCa_select_single = [null,[0,0]];
	if (this.actor()) {$gameTemp._drill_BCa_select_single[0] = this.actor();};
};

//==============================
// * 标记 - 敌人窗口被隐藏时（Window BattleEnemy）
//==============================
var _drill_BCa_win_enemy_hide = Window_BattleEnemy.prototype.hide; 
Window_BattleEnemy.prototype.hide = function() {
	_drill_BCa_win_enemy_hide.call(this);
	$gameTemp._drill_BCa_select_all = false;
	$gameTemp._drill_BCa_select_single = null;
};
//==============================
// * 标记 - 选中一个角色时（[SV] Window BattleEnemy）
//==============================
var _drill_BCa_win_enemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _drill_BCa_win_enemy_select.call(this,index)
	$gameTemp._drill_BCa_select_single = [null,[0,0]];
	if (this.enemy()) {$gameTemp._drill_BCa_select_single[0] = this.enemy();};
};

//==============================
// * 标记 - 清除目标
//==============================
BattleManager.drill_BCa_targetClear = function() {
	$gameTemp._drill_BCa_being_attack = [null,[0,0],0];
	$gameTemp._drill_BCa_select_single_turn = [null,[0,0]];
	$gameTemp._drill_BCa_select_all_turn = false;
	$gameTemp._drill_cam_pos = [0,0];
};

//==============================
// * 标记 - 结束回合
//==============================
var _drill_BCa_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
	_drill_BCa_endTurn.call(this);
	$gameTemp._drill_BCa_being_attack = [null,[0,0],0];
    this.drill_BCa_targetClear();
};

//==============================
// * 标记 - 开始释放技能
//==============================
var _drill_BCa_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
	_drill_BCa_startAction.call(this);
    this.drill_BCa_targetClear();
	$gameTemp._drill_BCa_being_attack = [this._subject,[0,0],$gameSystem._drill_cam_ftime];	//确定/聚焦 被攻击对象
	$gameTemp._drill_BCa_select_single_turn[0] = this._targets[0];
	if( this._targets.length > 1 ){ $gameTemp._drill_BCa_select_all_turn = true; }
};

//==============================
// * 标记 - 战斗胜利
//==============================
var _drill_BCa_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	$gameTemp._drill_BCa_battleEnd = true;
	_drill_BCa_processVictory.call(this);	 
};
//==============================
// * 标记 - 战斗逃跑
//==============================
var _drill_BCa_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
	$gameTemp._drill_BCa_battleEnd = true;
	_drill_BCa_processAbort.call(this);	 
};
//==============================
// * 标记 - 战斗失败
//==============================
var _drill_BCa_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	$gameTemp._drill_BCa_battleEnd = true;
	_drill_BCa_processDefeat.call(this);	 
};


//=============================================================================
// ** 镜头位置
//=============================================================================
//==============================
// * 位置 - 刷新镜头位置
//==============================
var _drill_BCa_b_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
	_drill_BCa_b_updatePosition.call(this);
    this.drill_BCa_updateCamPos();
};
Sprite_Battler.prototype.drill_BCa_updateCamPos = function() {
	
	// > 锁定看向的位置
	//...
	
	// > 自动转移到位置
	$gameTemp._drill_BCa_cur_actor[0] = BattleManager.actor();
	if( $gameTemp._drill_BCa_select_single && 
		$gameTemp._drill_BCa_select_single[0] === this._battler ){
		this.drill_BCa_focusTarget();
	};
	if( $gameTemp._drill_BCa_select_single_turn && 
		$gameTemp._drill_BCa_select_single_turn[0] === this._battler ){ 
		this.drill_BCa_focusTarget_turn();
	};
	if( $gameTemp._drill_BCa_being_attack && 
		$gameTemp._drill_BCa_being_attack[0] === this._battler ){ 
		this.drill_BCa_focusBeingAttack();
	};
	if( $gameTemp._drill_BCa_cur_actor && 
		$gameTemp._drill_BCa_cur_actor[0] === this._battler ){ 
		this.drill_BCa_focusActor();
	};
};
//==============================
// * 位置 - 当前角色
//==============================
Sprite_Battler.prototype.drill_BCa_focusActor = function() {
	$gameTemp._drill_BCa_cur_actor[1][0] = this.x;
	$gameTemp._drill_BCa_cur_actor[1][1] = this.drill_BCa_heightFix();
};
//==============================
// * 位置 - 选择目标
//==============================
Sprite_Battler.prototype.drill_BCa_focusTarget = function() {
	$gameTemp._drill_BCa_select_single[1][0] = this.x;
	$gameTemp._drill_BCa_select_single[1][1] = this.drill_BCa_heightFix();
};
//==============================
// * 位置 - 选择目标
//==============================
Sprite_Battler.prototype.drill_BCa_focusTarget_turn = function() {
	$gameTemp._drill_BCa_select_single_turn[1][0] = this.x;
	$gameTemp._drill_BCa_select_single_turn[1][1] = this.drill_BCa_heightFix();
};
//==============================
// * 位置 - 受伤单位
//==============================
Sprite_Battler.prototype.drill_BCa_focusBeingAttack = function() {
	$gameTemp._drill_BCa_being_attack[1][0] = this.x;
	$gameTemp._drill_BCa_being_attack[1][1] = this.drill_BCa_heightFix();
};	
//==============================
// * 位置 - 高度修正（将 战斗贴图 的正下方锚点转移到中心）
//==============================
Sprite_Battler.prototype.drill_BCa_heightFix = function() {
	
	// > 角色贴图的 ._mainSprite SV战斗图
	if( this._mainSprite ){
		return this.y - (this._mainSprite.height / 2);
	}
	
	// > 当前高度贴图
	return this.y - (this.bitmap.height / 2);
};

//==============================
// * 位置 - 图层默认两个背景控制
//==============================
var _drill_BCa_createBattleback = Spriteset_Battle.prototype.createBattleback
Spriteset_Battle.prototype.createBattleback = function() {
	_drill_BCa_createBattleback.call(this);
	if( $gameSystem._drill_cam_enable ){
		this._back1Sprite.anchor.x = 0.5;		//（强制将锚点转移到中心）
		this._back1Sprite.anchor.y = 0.5;
		this._back1Sprite.x = this._drill_BCa_centerX;
		this._back1Sprite.y = this._drill_BCa_centerY;
		this._back2Sprite.anchor.x = 0.5;
		this._back2Sprite.anchor.y = 0.5;
		this._back2Sprite.x = this._drill_BCa_centerX;
		this._back2Sprite.y = this._drill_BCa_centerY;
	};
};


//=============================================================================
// ** 镜头移动
//=============================================================================
//==============================
// * 镜头 - 初始化
//==============================
var _drill_BCa_spriteset_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	this.drill_BCa_init();
	_drill_BCa_spriteset_initialize.call(this);	
};
Spriteset_Battle.prototype.drill_BCa_init = function() {
    
	// > 清理目标
	$gameTemp.drill_BCa_clearCamera(); 
	
	// > 私有变量初始化
	this._drill_BCa_curTime = 0;
	this._drill_BCa_centerX = Graphics.boxWidth / 2;		//中心点
	this._drill_BCa_centerY = Graphics.boxHeight / 2;		//
	this._drill_BCa_lastTargetX = 0;						//上一个目标点
	this._drill_BCa_lastTargetY = 0;						//
	this._drill_BCa_ballisticsX = [];						//弹道X（与弹道核心无关）
	this._drill_BCa_ballisticsY = [];						//弹道Y
	
	// > 默认移动到中心
	this.drill_BCa_setMoveTo( this._drill_BCa_centerX, this._drill_BCa_centerY );
};
//==============================
// * 镜头 - 设置移动到（接口）
//==============================
Spriteset_Battle.prototype.drill_BCa_setMoveTo = function( x, y ){
    if(!this._battleField ){ return; }
    if( $gameSystem._drill_cam_enable != true ){ return; }
    if( this._drill_BCa_lastTargetX == x && this._drill_BCa_lastTargetY == y ){ return; }
	this._drill_BCa_lastTargetX = x;
	this._drill_BCa_lastTargetY = y;
	
	// > 目标位置
	var tar_x = this._drill_BCa_centerX - x;
	var tar_y = this._drill_BCa_centerY - y;
	var lim_x = Math.max($gameSystem._drill_cam_limit_width /2 - Graphics.boxWidth / 2,0);
	var lim_y = Math.max($gameSystem._drill_cam_limit_height /2 - Graphics.boxHeight / 2,0);
	tar_x += DrillUp.g_BCa_x;	//（目标偏移量）
	tar_y += DrillUp.g_BCa_y;
	if( tar_x > lim_x ){ tar_x = lim_x; }		//（镜头架限制）
	if( tar_x < -lim_x ){ tar_x = -lim_x; }
	if( tar_y > lim_y ){ tar_y = lim_y; }
	if( tar_y < -lim_y ){ tar_y = -lim_y; }
	
	// > 弹道推演（ 不使用 弹道核心 ）
	this.drill_BCa_ballisticsMove( this._battleField.x, this._battleField.y, tar_x, tar_y, $gameSystem._drill_cam_switchTime );
	
	this._drill_BCa_curTime = 0;
};
//==============================
// * 镜头 - 弹道推演
//==============================
Spriteset_Battle.prototype.drill_BCa_ballisticsMove = function( orgX, orgY, tarX, tarY, movementTime ){
	this._drill_BCa_ballisticsX = [];
	this._drill_BCa_ballisticsY = [];
	var diffX = tarX - orgX;
	var diffY = tarY - orgY;
	
	//（两点式）
	for(var time = 0; time <= movementTime; time++){
		
		// > 速度
		var xx = 0;
		var yy = 0;
		
		if( DrillUp.g_BCa_moveType == "匀速移动"){	
			var dx = diffX;
			var dy = diffY;
			var dt = movementTime;
				
			xx = time * dx / dt;
			yy = time * dy / dt;
		}
		
		if( DrillUp.g_BCa_moveType == "弹性移动"){
			var dx = diffX;
			var dy = diffY;
			var dt = movementTime;
			
			var ax = 2 * dx / dt / dt;		//r = 1/2*a*t^2
			var ay = 2 * dy / dt / dt;		//（匀减速移动到目标点）
			var c_time = dt - time;
			xx = 0.5 * ax * dt * dt - 0.5 * ax * c_time * c_time ;
			yy = 0.5 * ay * dt * dt - 0.5 * ay * c_time * c_time ;
		}
		
		xx = orgX + xx;
		yy = orgY + yy;
		this._drill_BCa_ballisticsX.push(xx);
		this._drill_BCa_ballisticsY.push(yy);
	}
};

//==============================
// * 镜头 - 帧刷新
//==============================
var _drill_BCa_s_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_BCa_s_update.call(this); 
    if( $gameSystem._drill_cam_enable != true ){ return; }

	this.drill_BCa_updateCameraTarget();	//刷新目标
	this.drill_BCa_updateCameraMove();		//移动镜头
};
//==============================
// * 帧刷新 - 刷新目标
//==============================
Spriteset_Battle.prototype.drill_BCa_updateCameraTarget = function() {
	
	// > 看向具体的位置
	if( $gameSystem._drill_BCa_lookAt_x != null &&
		$gameSystem._drill_BCa_lookAt_y != null ){
		this.drill_BCa_setMoveTo( $gameSystem._drill_BCa_lookAt_x, $gameSystem._drill_BCa_lookAt_y );
		return ;
	}
	
	// > 移动到中心
	if( this.drill_BCa_isNeedToCenter() ){
		this.drill_BCa_setMoveTo( this._drill_BCa_centerX, this._drill_BCa_centerY );
		return ;
	};
	
	// > 受伤时镜头震动 - 时间变化
	if( $gameTemp._drill_BCa_being_attack[2] > 0 ){
		$gameTemp._drill_BCa_being_attack[2] -= 1
	};
	
	// > 选择一个敌人/角色
	if ($gameTemp._drill_BCa_select_single && $gameTemp._drill_BCa_select_single[0]) {
		if (!$gameSystem.isSideView() && $gameTemp._drill_BCa_select_single[0].isActor()) {
			var xx = this._drill_BCa_centerX;
			var yy = this._drill_BCa_centerY;		
			this.drill_BCa_setMoveTo( xx,yy );
	    } else { 
			var xx = $gameTemp._drill_BCa_select_single[1][0];
			var yy = $gameTemp._drill_BCa_select_single[1][1];
			this.drill_BCa_setMoveTo( xx,yy );
	    }
		
	// > 受伤时镜头震动
    } else if (this.drill_BCa_isBeingAttack()) {
		if (!$gameSystem.isSideView() && $gameTemp._drill_BCa_being_attack[0].isActor()) {
			var xx = this._drill_BCa_centerX;
			var yy = this._drill_BCa_centerY;		
			this.drill_BCa_setMoveTo( xx,yy );
		} else {
			var xx = $gameTemp._drill_BCa_being_attack[1][0];
			var yy = $gameTemp._drill_BCa_being_attack[1][1];
			this.drill_BCa_setMoveTo( xx,yy );
		}

	// > 敌人回合
	} else if (this.drill_BCa_isTarget()) {
		var xx = $gameTemp._drill_BCa_select_single_turn[1][0];
		var yy = $gameTemp._drill_BCa_select_single_turn[1][1];
		this.drill_BCa_setMoveTo( xx,yy );
		
	// > 角色回合
	} else if (this.drill_BCa_isActor()) {
		var xx = $gameTemp._drill_BCa_cur_actor[1][0];
		var yy = $gameTemp._drill_BCa_cur_actor[1][1];	
		this.drill_BCa_setMoveTo( xx,yy );

	// > 其他情况回到中心
	} else {
		this.drill_BCa_setMoveTo( this._drill_BCa_centerX, this._drill_BCa_centerY );
	}
};
//==============================
// * 帧刷新 - 移动镜头
//==============================
Spriteset_Battle.prototype.drill_BCa_updateCameraMove = function() {
	this._drill_BCa_curTime += 1;
	
	// > 当前位置
	var index = this._drill_BCa_curTime;
	if( index >= this._drill_BCa_ballisticsX.length ){
		index = this._drill_BCa_ballisticsX.length-1;
	}
	
	// > 设置图层位置
	if( index > 0 ){
		this._battleField.x = Math.floor( this._drill_BCa_ballisticsX[ index-1 ] );
		this._battleField.y = Math.floor( this._drill_BCa_ballisticsY[ index-1 ] );
	}
	
	// > 记录位置
	$gameTemp._drill_cam_pos[0] = Math.floor( this._battleField.x );
	$gameTemp._drill_cam_pos[1] = Math.floor( this._battleField.y );
	
};

//==============================
// * 判断 - 移动到 - 中心
//==============================
Spriteset_Battle.prototype.drill_BCa_isNeedToCenter = function() {
	if( $gameTemp._drill_BCa_select_all ){ return true; }			//（选中所有单位时）
	if( $gameTemp._drill_BCa_select_all_turn ){ return true; }		//（释放群体单位技能时）
	if( $gameTemp._drill_BCa_battleEnd ){ return true; }			//（战斗结束时）
	return false
};
//==============================
// * 判断 - 移动到 - 受伤害目标
//==============================
Spriteset_Battle.prototype.drill_BCa_isBeingAttack = function() {
	if (!$gameTemp._drill_BCa_being_attack) {return false};
	if (!$gameTemp._drill_BCa_being_attack[0]) {return false};
	if ($gameTemp._drill_BCa_being_attack[2] === 0) {return false};
	if (Imported.MOG_ATB) {
	    if (this._phase != 'start') {return false};
	};
	return true;
};
//==============================
// * 判断 - 移动到 - 敌人回合
//==============================
Spriteset_Battle.prototype.drill_BCa_isTarget = function() {
	if (!$gameTemp._drill_BCa_select_single_turn) {return false};
	if (!$gameTemp._drill_BCa_select_single_turn[0]) {return false};
	if (!$gameSystem.isSideView() && $gameTemp._drill_BCa_select_single_turn[0].isActor()) {return false};
	return true;
};
//==============================
// * 判断 - 移动到 - 角色回合
//==============================
Spriteset_Battle.prototype.drill_BCa_isActor = function() {
    if (!$gameSystem.isSideView()) {return false};
	if (!$gameTemp._drill_BCa_cur_actor) {return false};
	if (!$gameTemp._drill_BCa_cur_actor[0]) {return false};
	return true;
};


//=============================================================================
// * 兼容yep核心
//=============================================================================
if( Imported.YEP_CoreEngine ){
	var _drill_BCa_scaleSprite = Sprite_Battleback.prototype.scaleSprite;
	Sprite_Battleback.prototype.scaleSprite = function() {
		_drill_BCa_scaleSprite.call(this);
		if ($gameSystem.isSideView()) {
			this.anchor.y = 0.5;				//强制yep的sprite的圆心为0.5
			this.y = Graphics.boxHeight / 2;
		}
	};
}

//=============================================================================
// ** 其它MOG插件兼容
//=============================================================================
//==============================
// * MOG - 帧刷新
//==============================
var _drill_mog_ballon_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_mog_ballon_update.call(this);
	if( Imported.MOG_BalloonActionName && this._balloonField ){	// 技能 - 招式名气泡框
		this._balloonField.x = this._battleField.x
		this._balloonField.y = this._battleField.y
	};
	if( Imported.MOG_ChainCommands && this._bchain ){		// 技能 - 按键连锁攻击
	   this._bchain.x = this._battleField.x;
	   this._bchain.y = this._battleField.y;
	};
	if( Imported.MOG_HPGauge && this._hpField ){		// 敌人 - 生命浮动框
		this._hpField.x = this._battleField.x
		this._hpField.y = this._battleField.y
	};
};
//==============================
// * MOG - 按键连锁攻击
//==============================
if( Imported.MOG_ChainCommands ){
	var _drill_mog_updateFocus = Spriteset_Battle.prototype.updateFocus;
	Spriteset_Battle.prototype.updateFocus = function() {
		if( $gameTemp._bchainTemp ){ $gameTemp._drill_BCa_being_attack[2] = 0 };//技能 - 按键连锁攻击（下一段招不等待）
		_drill_mog_updateFocus.call(this);
	};
};
//==============================
// * MOG - 车轮战
//==============================
if( Imported.MOG_ConsecutiveBattles ){
	var _drill_mog_prepareConBat = BattleManager.prepareConBat;
	BattleManager.prepareConBat = function() {
		$gameTemp.drill_BCa_clearCamera();		//清理镜头属性
		_drill_mog_prepareConBat.call(this);
	}
}


