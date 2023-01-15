//=============================================================================
// Drill_EventItemGenerator.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        物体管理 - 可拾取物生成器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventItemGenerator +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以通过插件指令快速生成可拾取的道具。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 插件需要基于事件管理核心，如果有相关插件，还可以支持更多功能。
 * 基于：
 *   - Drill_CoreOfEventManager  物体管理-事件管理核心
 *     生成的事件必须由事件管理核心来控制 创建、删除 流程。
 * 被扩展：
 *   - Drill_JumpSpeed           物体-跳跃速度
 *     该插件可使得生成的所有道具弹跳的高度速度可以控制。
 *     插件指令">可拾取物生成器 : 弹跳 : xxxx"生效。
 *
 *   - Drill_EventIcon           行走图-图标行走图★★v1.4及以上版本★★
 *     该插件可使得生成的所有道具会自动换成图标行走图，默认开启。
 *     金币仍然使用默认图像。
 *     插件指令">可拾取物生成器 : 行走图 : 设置为图标行走图"生效。
 *
 *   - Drill_CoreOfFixedArea     物体触发-固定区域核心★★v1.2及以上版本★★
 *     该插件可使得跳跃至随机点、筛选器功能生效。
 *     插件指令的"自定义区域"和"筛选器"功能生效。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 生成：
 *   (1.注意名词：物品/武器/护甲/技能
 *      护甲=防具，物品=道具，这两个名词是同一个意思，指令写防具、道具都有效。
 *      另外，没有下列名词：装备/装甲/装束 。
 *   (2.可拾取道具用 纯事件 也可以做，只是比较复杂。
 *      你可以去示例中 物体触发管理层 去看看道具生成方法。
 *   (3.如果你没有导入 固定区域核心 则你无法使用"自定义区域"和"筛选器"功能。
 *      并且【默认只避开不可通行】图块。要了解更多物品落点的方法，
 *      去看看 "9.物体触发 > 关于物体触发-固定区域.docx"中的 筛选器 章节。
 *   (4.生成器生成的事件是临时的，捡起物品后 或 离开地图就会消失。
 * 选项配置：
 *   (1.你可以控制弹跳开启/关闭，以及控制弹跳的高度。
 *   (2.行走图默认使用图标行走图，你也可以设置成固定的资源中的行走图，
 *      金钱的图像不受控制，在配置的资源序列中随机抽取金币行走图。
 *   (3.配置随机的音效是拾取音效，生成物品的音效你应该直接在调用"生成"插件指
 *      令时播放。
 * 设计：
 *   (1.你可以设计一个宝箱/花盆/可破坏物，打开/打碎后弹出大量可拾取的
 *      金钱或物品。
 *   (2.可拾取物的物品支持负数写法，"物品[2] : 数量[-1]"，捡起后会导致
 *      物品丢失。负数的 变量值 也有效。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 生成
 * 你可以通过插件指令快速设置生成一个道具拾取事件。
 * 
 * 插件指令：>可拾取物生成器 : 生成 : 金钱[10,20] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[南瓜] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品变量[21] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 武器[2] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 武器[红宝石] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 武器变量[21] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 护甲[2] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 护甲[神秘指环] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 护甲变量[21] : 数量[1] : 本事件 : 菱形区域 : 2
 * 
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 玩家位置 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 事件[10] : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 事件变量[10] : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 位置[10,10] : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 位置变量[10,10] : 菱形区域 : 2
 * 
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 方形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 圆形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 十字区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 横条区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 竖条区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 自定义区域 : 1
 *
 * 1.前半部分（物品[36] : 数量[1]）中间部分（本事件）后半部分（xx区域）的参数可以随意组合。
 *   一共有7*6*7种组合方式。
 * 2.如果你没有导入 固定区域核心 则你无法使用"自定义区域"和"筛选器"功能。
 *   并且默认只避开不可通行部分。另外，自定义区域固定为方向朝下的图形。
 * 3.生成器生成的事件是临时的，离开地图就会消失。
 * 4.生成金钱后的两个数字，为随机金钱数的上限与下限。
 *   比如 金钱[10,20] 表示拾取金钱事件后，获得10至20的金钱。
 *   物品/武器/护甲 后可以填物品的名字，如果名字没有对应的物品，则不会生成事件。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>可拾取物生成器 : 生成金钱 : 10 : 20 : 随机方形区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机方形区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机菱形区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机圆形区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机十字区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机横条区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 36 : 1 : 随机竖条区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 随机方形区域 : 2
 * 插件指令(旧)：>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 指定位置 : -1 : 3
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 选项配置
 * 你可以通过插件指令手动修改生成的一些基本设置。
 * 
 * 插件指令：>可拾取物生成器 : 生成 : 使用筛选器 : 1
 * 
 * 插件指令：>可拾取物生成器 : 弹跳 : 开启
 * 插件指令：>可拾取物生成器 : 弹跳 : 关闭
 * 插件指令：>可拾取物生成器 : 弹跳 : 设置 : 高度[+72] : 速度[0.60]
 * 插件指令：>可拾取物生成器 : 弹跳 : 设置 : 弹跳次数[3] : 弹跳声音[0]
 * 
 * 插件指令：>可拾取物生成器 : 行走图 : 设置 : 1
 * 插件指令：>可拾取物生成器 : 行走图 : 设置随机之一 : 1,2,3,4
 * 插件指令：>可拾取物生成器 : 行走图 : 设置为图标行走图
 * 
 * 插件指令：>可拾取物生成器 : 拾取音效 : 设置 : 1
 * 插件指令：>可拾取物生成器 : 拾取音效 : 设置随机之一 : 1,2,3,4
 * 插件指令：>可拾取物生成器 : 拾取音效 : 设置 : 空音效
 * 
 * 1.如果关闭弹跳，则物品直接出现在目标位置，没有弹跳效果。
 *   弹跳默认的属性为：高度[+72]，速度[0.60]，只弹跳1次
 * 2.所有物品默认使用图像1，插件指令可以修改默认使用的图像，对应配置的编号。
 *   拾取音效设置与图像一样。
 *   金钱的图像不受控制，在配置的资源序列中随机抽取金币行走图。
 * 3.设置音效随机后，会随机选取其中的一个声音或者图像生成道具。
 *   注意，这个音效是拾取音效，生成物品的音效你应该直接在调用插件指令时播放。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>可拾取物生成器 : 弹跳开启
 * 插件指令(旧)：>可拾取物生成器 : 弹跳开启 : 72 : 0.60
 * 插件指令(旧)：>可拾取物生成器 : 弹跳关闭
 * 插件指令(旧)：>可拾取物生成器 : 自动图标行走图开启
 * 插件指令(旧)：>可拾取物生成器 : 自动图标行走图关闭
 * 插件指令(旧)：>可拾取物生成器 : 使用图像 : 1
 * 插件指令(旧)：>可拾取物生成器 : 使用音效 : 1
 * 插件指令(旧)：>可拾取物生成器 : 使用随机图像 : 1,2,3,4
 * 插件指令(旧)：>可拾取物生成器 : 使用随机音效 : 1,2,3,4
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 变量值的物品
 * 在生成道具时，你可以设置变量值的道具数量。
 * 
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 物品[36] : 变量[21] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 武器[2] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 武器[2] : 变量[21] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 护甲[3] : 数量[1] : 本事件 : 菱形区域 : 2
 * 插件指令：>可拾取物生成器 : 生成 : 护甲[3] : 变量[21] : 本事件 : 菱形区域 : 2
 * 
 * 1.使用变量后，将生成变量值对应的物品数量。
 * 2.物品支持负数写法，"物品[2] : 数量[-1]"，捡起后会导致物品丢失。
 *   负数 变量值 也有效。
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
 * 时间复杂度： o(n)
 * 测试方法：   在物体管理层、地理管理层、镜像管理层放置了宝物弹出箱。
 *              弹出大量道具测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件为单次执行，且不负责控制生成的道具，所以生成的事件的性能
 *   无法追踪，这里可以看做只是生成了一个普通的事件。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了随机图像、音效的功能。
 * [v1.2]
 * 修复了事件过多时切换地图出错的bug。添加了圆形区域设置。
 * [v1.3]
 * 大幅度修正了插件指令，并且旧指令仍然支持。
 * 添加了自定义区域、筛选器的支持。
 * [v1.4]
 * 修复了插件指令"玩家位置"没有效果的bug。
 * [v1.5]
 * 修正了拾取音效的设置。
 * [v1.6]
 * 添加了 变量 物品的生成。
 * [v1.7]
 * 修改了插件分类。
 * [v1.8]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param 资源-金币行走图
 * @desc 默认金币的图片资源，如果生成了金钱，将在下列行走图中随机抽取一个图像。注意必须是"$"的大图。
 * @default ["$金币"]
 * @require 1
 * @dir img/characters/
 * @type file[]
 * 
 * @param 金币的朝向是否随机
 * @type boolean
 * @on 随机
 * @off 固定朝下
 * @desc true - 随机，false - 固定朝下。
 * @default true
 * 
 * @param 资源-可拾取物行走图
 * @desc 默认可拾取物的图片资源集合。注意必须是"$"的大图。
 * @default []
 * @require 1
 * @dir img/characters/
 * @type file[]
 * 
 * @param 可拾取物的朝向是否随机
 * @type boolean
 * @on 随机
 * @off 固定朝下
 * @desc true - 随机，false - 固定朝下。
 * @default true
 * 
 * @param 资源-拾取音效
 * @desc 默认可拾取物的拾取的音效。
 * @default ["item3"]
 * @require 1
 * @dir audio/se/
 * @type file[]
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EIG（Event_Item_Generator）
//		临时全局变量	DrillUp.g_EIG_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_EIG_xxxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	125个事件的地图，弹出30个道具
//		★性能测试消耗	1.22ms（低于5ms的都是小到无法估计的值）
//		★最坏情况		无
//		★备注			能感觉到性能有消耗，但是无法定位确定值。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			可拾取物生成器：
//				->随机位置
//					->随机可通行位置
//					->与固定区域核心交互
//				->生成数据
//					->弹跳效果
//					->图标行走图
//					->拾取声音
//				->可拾取物生成器得分道具：变量[20] : +100		x（目前不考虑，因为变量行走图未定）
//
//		★必要注意事项：
//			1.该插件有两个分离的操作，一个是在map里面添加event，另一个是在sprite里面添加贴图。
//			  先有event然后sprite绑定event。
//
//		★其它说明细节：
//			1.先有事件数据，再通过事件数据new事件。
//			2.另外……操作事件内容并不难，难的是事件数据太多了……
//			  可拾取物定义：
//				随机行走图 + 下方触发 + 拾取声音 + 获得道具情况 + 获得金钱情况 + 拾取后消失
//				跳跃速度 + 图标行走图 + mata标签（如果没有，镜面反射会不兼容）
//				道具不能落入不可行走区域
//
//		★存在的问题：
//			1.每多一条可选注释，插件就要多一个额外扩展。需要想办法优化。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventItemGenerator = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventItemGenerator');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EIG_goldRandomDir = String(DrillUp.parameters["金币的朝向是否随机"] || "true") === "true";
    DrillUp.g_EIG_itemRandomDir = String(DrillUp.parameters["可拾取物的朝向是否随机"] || "true") === "true";
	if( DrillUp.parameters["资源-金币行走图"] != "" &&
		DrillUp.parameters["资源-金币行走图"] != undefined ){
		DrillUp.g_EIG_goldPic = JSON.parse(DrillUp.parameters["资源-金币行走图"]);
	}else{
		DrillUp.g_EIG_goldPic = [];
	}
	if( DrillUp.parameters["资源-可拾取物行走图"] != "" &&
		DrillUp.parameters["资源-可拾取物行走图"] != undefined ){
		DrillUp.g_EIG_itemPic = JSON.parse(DrillUp.parameters["资源-可拾取物行走图"]);
	}else{
		DrillUp.g_EIG_itemPic = [];
	}
	if( DrillUp.parameters["资源-拾取音效"] != "" &&
		DrillUp.parameters["资源-拾取音效"] != undefined ){
		DrillUp.g_EIG_se = JSON.parse(DrillUp.parameters["资源-拾取音效"]);
	}else{
		DrillUp.g_EIG_se = [""];
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventManager ){
	

//=============================================================================
// * 插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令
//==============================
var _drill_EIG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	_drill_EIG_pluginCommand.call(this,command, args);
	this.drill_EIG_command(command, args);
	this.drill_EIG_oldCommand(command, args);
};
Game_Interpreter.prototype.drill_EIG_command = function(command, args){
	if( command === ">可拾取物生成器" ){
		if( args.length >= 4 ){
			var main_type = String(args[1]);
			if( main_type == "生成" ){
				
				/*-----------------金钱（金钱[10,20]）------------------*/
				if( args.length == 10 ){
					var type = String(args[3]);
					var pos = String(args[5]);
					var area_type = String(args[7]);
					var area_range = String(args[9]);
					if( type.indexOf("金钱[") != -1 ){
						type = type.replace("金钱[","");
						type = type.replace("]","");
						var type = type.split(/[,，]/);
						if( type.length >=2 ){
							var a = Number(type[0]);
							var b = Number(type[1]);
							
							var item_type = "金钱";
							var item_id = 0;
							var item_num = Math.floor(Math.random()*(b-a+1)) + a ;
							var item_icon = 0;
						}
					}
				}
				
				/*-----------------物品类型（物品[36] : 数量[1]）------------------*/
				if( args.length == 12 ){
					var type = String(args[3]);
					var item_str = String(args[5]);
					var pos = String(args[7]);
					var area_type = String(args[9]);
					var area_range = String(args[11]);
					if( type.indexOf("物品[") != -1 || type.indexOf("道具[") != -1 ){
						var item_type = "物品";
						var item_id = 0;
						var item_num = 0;
						var item_icon = 0;
						
						if( item_str.indexOf("变量[") != -1 ){
							item_str = item_str.replace("变量[","");
							item_str = item_str.replace("]","");
							item_num = $gameVariables.value( Number(item_str) );
						}else{
							item_str = item_str.replace("数量[","");
							item_str = item_str.replace("]","");
							item_num = Number(item_str);
						}
						
						type = type.replace("物品[","");
						type = type.replace("道具[","");
						type = type.replace("]","");
						var re = /^\d+$/;
						if( re.test(type) ){	//数字
							if( $dataItems[Number(type)] != null ){
								item_id = Number(type) ;
								item_icon = String( $dataItems[item_id].iconIndex );
							}
						}else{					//物品名称
							for( var i = 0; i < $dataItems.length; i++ ){
								if( $dataItems[i] == null ){continue;}
								if( $dataItems[i].name == type ){			//根据物品名搜索
									item_id = i;
									item_icon = String( $dataItems[i].iconIndex );
								}
							}
						}
					}
					if( type.indexOf("物品变量[") != -1 || type.indexOf("道具变量[") != -1 ){
						var item_type = "物品";
						var item_id = 0;
						var item_num = 0;
						var item_icon = 0;
						
						if( item_str.indexOf("变量[") != -1 ){
							item_str = item_str.replace("变量[","");
							item_str = item_str.replace("]","");
							item_num = $gameVariables.value( Number(item_str) );
						}else{
							item_str = item_str.replace("数量[","");
							item_str = item_str.replace("]","");
							item_num = Number(item_str);
						}
						
						type = type.replace("物品变量[","");
						type = type.replace("道具变量[","");
						type = type.replace("]","");
						if( $dataItems[ $gameVariables.value(Number(type)) ] != null ){
							item_id = $gameVariables.value(Number(type));
							item_icon = String( $dataItems[item_id].iconIndex );
						}
					}
					if( type.indexOf("武器[") != -1 ){
						var item_type = "武器";
						var item_id = 0;
						var item_num = 0;
						var item_icon = 0;
						
						if( item_str.indexOf("变量[") != -1 ){
							item_str = item_str.replace("变量[","");
							item_str = item_str.replace("]","");
							item_num = $gameVariables.value( Number(item_str) );
						}else{
							item_str = item_str.replace("数量[","");
							item_str = item_str.replace("]","");
							item_num = Number(item_str);
						}
						
						type = type.replace("武器[","");
						type = type.replace("]","");
						var re = /^\d+$/;
						if( re.test(type) ){	//数字
							if( $dataWeapons[Number(type)] != null ){
								item_id = Number(type) ;
								item_icon = String( $dataWeapons[item_id].iconIndex );
							}
						}else{					//武器名称
							for( var i = 0; i < $dataWeapons.length; i++ ){
								if( $dataWeapons[i] == null ){continue;}
								if( $dataWeapons[i].name == type ){			//根据物品名搜索
									item_id = i;
									item_icon = String( $dataWeapons[i].iconIndex );
								}
							}
						}
					}
					if( type.indexOf("武器变量[") != -1 ){
						var item_type = "武器";
						var item_id = 0;
						var item_num = 0;
						var item_icon = 0;
						
						if( item_str.indexOf("变量[") != -1 ){
							item_str = item_str.replace("变量[","");
							item_str = item_str.replace("]","");
							item_num = $gameVariables.value( Number(item_str) );
						}else{
							item_str = item_str.replace("数量[","");
							item_str = item_str.replace("]","");
							item_num = Number(item_str);
						}
						
						type = type.replace("武器变量[","");
						type = type.replace("]","");
						if( $dataWeapons[ $gameVariables.value(Number(type)) ] != null ){
							item_id = $gameVariables.value(Number(type));
							item_icon = String( $dataWeapons[item_id].iconIndex );
						}
					}
					if( type.indexOf("护甲[") != -1 || type.indexOf("防具[") != -1 ){
						var item_type = "护甲";
						var item_id = 0;
						var item_num = 0;
						var item_icon = 0;
						
						if( item_str.indexOf("变量[") != -1 ){
							item_str = item_str.replace("变量[","");
							item_str = item_str.replace("]","");
							item_num = $gameVariables.value( Number(item_str) );
						}else{
							item_str = item_str.replace("数量[","");
							item_str = item_str.replace("]","");
							item_num = Number(item_str);
						}
						
						type = type.replace("护甲[","");
						type = type.replace("防具[","");
						type = type.replace("]","");
						var re = /^\d+$/;
						if( re.test(type) ){	//数字
							if( $dataArmors[Number(type)] != null ){
								item_id = Number(type) ;
								item_icon = String( $dataArmors[item_id].iconIndex );
							}
						}else{					//护甲名称
							for( var i = 0; i < $dataArmors.length; i++ ){
								if( $dataArmors[i] == null ){continue;}
								if( $dataArmors[i].name == type ){			//根据物品名搜索
									item_id = i;
									item_icon = String( $dataArmors[i].iconIndex );
								}
							}
						}
					}
					if( type.indexOf("护甲变量[") != -1 || type.indexOf("防具变量[") != -1 ){
						var item_type = "护甲";
						var item_id = 0;
						var item_num = 0;
						var item_icon = 0;
						
						if( item_str.indexOf("变量[") != -1 ){
							item_str = item_str.replace("变量[","");
							item_str = item_str.replace("]","");
							item_num = $gameVariables.value( Number(item_str) );
						}else{
							item_str = item_str.replace("数量[","");
							item_str = item_str.replace("]","");
							item_num = Number(item_str);
						}
						
						type = type.replace("护甲变量[","");
						type = type.replace("防具变量[","");
						type = type.replace("]","");
						if( $dataArmors[ $gameVariables.value(Number(type)) ] != null ){
							item_id = $gameVariables.value(Number(type));
							item_icon = String( $dataArmors[item_id].iconIndex );
						}
					}
				}
				
				/*-----------------起始位置（位置[10,10]）------------------*/
				if( pos != undefined ){
					if( pos == "玩家" || pos == "玩家位置" ){
						var x1 = $gamePlayer._realX;
						var y1 = $gamePlayer._realY;
					}
					if( pos == "本事件" ){
						var e_id = this._eventId;
						var x1 = $gameMap.event(e_id)._realX;
						var y1 = $gameMap.event(e_id)._realY;
					}
					if( pos.indexOf("事件[") != -1 ){
						pos = pos.replace("事件[","");
						pos = pos.replace("]","");
						var e_id = Number(pos);
						if( $gameMap.drill_EIG_isEventExist( e_id ) == false ){ return; }
						var x1 = $gameMap.event(e_id)._realX;
						var y1 = $gameMap.event(e_id)._realY;
					}
					if( pos.indexOf("事件变量[") != -1 ){
						pos = pos.replace("事件变量[","");
						pos = pos.replace("]","");
						var e_id = $gameVariables.value(Number(pos));
						if( $gameMap.drill_EIG_isEventExist( e_id ) == false ){ return; }
						var x1 = $gameMap.event(e_id)._realX;
						var y1 = $gameMap.event(e_id)._realY;
					}
					if( pos.indexOf("位置[") != -1 ){
						pos = pos.replace("位置[","");
						pos = pos.replace("]","");
						var pos = pos.split(/[,，]/);
						if( pos.length >=2 ){
							x1 = Number(pos[0]);
							y1 = Number(pos[1]);
						}
					}
					if( pos.indexOf("位置变量[") != -1 ){
						pos = pos.replace("位置变量[","");
						pos = pos.replace("]","");
						var pos_arr = pos.split(/[,，]/);
						if( pos_arr.length >=2 ){
							x1 = $gameVariables.value(Number(pos_arr[0]));
							y1 = $gameVariables.value(Number(pos_arr[1]));
						}
					}
				}
				
				/*-----------------生成------------------*/
				if( x1 != undefined && item_type != undefined ){
					var temp_event_data = {};
					temp_event_data['org_x'] = x1;
					temp_event_data['org_y'] = y1;
					temp_event_data['tar_x'] = 0;
					temp_event_data['tar_y'] = 0;
					temp_event_data['item_type'] = String(item_type);
					temp_event_data['item_id'] = Number(item_id);
					temp_event_data['item_num'] = Number(item_num);
					temp_event_data['item_icon'] = Number(item_icon);
					
					// > 生成事件
					var new_event_data = $gameMap.drill_EIG_createEventDataTemplate( temp_event_data );
					var new_event = $gameMap.drill_COEM_offspring_createEventByData( new_event_data );
					
					// > 跳跃目标
					if( Imported.Drill_CoreOfFixedArea ){	//【物体触发-固定区域核心】
						var cur_condition = $gameSystem._drill_EIG_areaCondition || {};
						var c_area = [];
						if( area_type == "菱形区域" || area_type == "方形区域"  || area_type == "圆形区域"  || 
							area_type == "十字区域" || area_type == "横条区域"  || area_type == "竖条区域" ){
							c_area = $gameMap.drill_COFA_getShapePointsWithCondition( x1,y1, area_type,area_range, cur_condition );
						}
						if( area_type == "自定义区域" ){	//自定义形状，只有位置无方向
							c_area = $gameMap.drill_COFA_getCustomPointsByOnlyPositionWithCondition( x1,y1, area_range-1, cur_condition );
						}
						if( c_area.length == 0 ){ c_area.push({'x':x1,'y':y1 }) }
						
						var ran = c_area[ Math.floor( Math.random()*c_area.length ) ];
						temp_event_data['tar_x'] = ran['x'] - x1;
						temp_event_data['tar_y'] = ran['y'] - y1;
						
					}else{	//如果没有固定区域核心，使用自带的
						var av_list = $gameMap.drill_EIG_getAvailablePosList( x1,y1, area_range,area_type );
						var ran = av_list[ Math.floor( Math.random()*av_list.length ) ];
						temp_event_data['tar_x'] = ran['x'] - x1;
						temp_event_data['tar_y'] = ran['y'] - y1;
					}
					
					// > 执行跳跃
					if( $gameSystem._drill_EIG_need_jump ){
						new_event.jump(temp_event_data['tar_x'],temp_event_data['tar_y']);
					}else{
						new_event.locate(temp_event_data['tar_x'],temp_event_data['tar_y']);
					}
					
				}
				
			}
			if( main_type == "生成" ){
				if( args.length == 6 ){
					var type = String(args[3]);
					var temp1 = Number(args[5]);
					if( type == "使用筛选器" && Imported.Drill_CoreOfFixedArea ){	//【物体触发-固定区域核心】
						$gameSystem._drill_EIG_areaCondition = DrillUp.g_COFA_condition_list[ temp1-1 ];
					}
				}
			}
			if( main_type == "弹跳" ){
				if( args.length == 4 ){
					var type = String(args[3]);
					if( type == "开启" ){
						$gameSystem._drill_EIG_need_jump = true;
					}
					if( type == "关闭" ){
						$gameSystem._drill_EIG_need_jump = false;
					}
				}
				if( args.length == 8 ){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					if( type == "设置" ){
						$gameSystem._drill_EIG_need_jump = true;
						if( temp1.indexOf("高度[") != -1 && temp2.indexOf("速度[") != -1 ){
							temp1 = temp1.replace("高度[","");
							temp1 = temp1.replace("]","");
							temp2 = temp2.replace("速度[","");
							temp2 = temp2.replace("]","");
							$gameSystem._drill_EIG_jump_height = Number(temp1);
							$gameSystem._drill_EIG_jump_speed = Number(temp2);
						}
						if( temp1.indexOf("弹跳次数[") != -1 && temp2.indexOf("弹跳声音[") != -1 ){
							temp1 = temp1.replace("弹跳次数[","");
							temp1 = temp1.replace("]","");
							temp2 = temp2.replace("弹跳声音[","");
							temp2 = temp2.replace("]","");
							$gameSystem._drill_EIG_jump_level = Number(temp1);
							$gameSystem._drill_EIG_jump_levelSound = Number(temp2);
						}
					}
				}
			}
			if( main_type == "行走图" ){
				if( args.length == 6 ){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					if( type == "设置" ){
						$gameSystem._drill_EIG_need_useIcon = false;
						var index = Number(temp1) - 1;
						$gameSystem._drill_EIG_default_img_random = [index];
					}
					if( type == "设置随机之一" ){
						$gameSystem._drill_EIG_need_useIcon = false;
						var arr = String(temp1).split(/[,，]/);
						$gameSystem._drill_EIG_default_img_random = arr;
					}
				}
				if( args.length == 4 ){
					var type = String(args[3]);
					if( type == "设置为图标行走图" ){
						$gameSystem._drill_EIG_need_useIcon = true;
					}
				}
			}
			if( main_type == "音效" || main_type == "拾取音效" ){
				if( args.length == 6 ){
					var type = String(args[3]);
					var temp1 = String(args[5]);
					if( type == "设置" ){
						if( temp1 == "空音效" ){
							$gameSystem._drill_EIG_default_se_random = [-1];
						}else{
							var index = Number(temp1) - 1;
							$gameSystem._drill_EIG_default_se_random = [index];
						}
					}
					if( type == "设置随机之一" ){
						var arr = String(temp1).split(/[,，]/);
						$gameSystem._drill_EIG_default_se_random = arr;
					}
				}
			}
		}
	}
}
//==============================
// * 插件指令 - 旧指令
//==============================
Game_Interpreter.prototype.drill_EIG_oldCommand = function(command, args){
	if( command === ">可拾取物生成器" ){	// 旧指令
		var temp_type = String(args[1]);
		var temp_need_generate = false;
		var temp_event_data = {};
		temp_event_data['tar_x'] = 0;
		temp_event_data['tar_y'] = 0;
		
		//>可拾取物生成器 : 弹跳开启
		//>可拾取物生成器 : 弹跳开启 : 5 : 1.00
		//>可拾取物生成器 : 弹跳关闭
		//>可拾取物生成器 : 自动图标行走图开启
		//>可拾取物生成器 : 自动图标行走图关闭
		//>可拾取物生成器 : 使用图像 : 1
		//>可拾取物生成器 : 使用音效 : 1
		//>可拾取物生成器 : 使用随机图像 : 1,2,3,4
		//>可拾取物生成器 : 使用随机音效 : 1,2,3,4
		if( temp_type == "弹跳开启" ){
			$gameSystem._drill_EIG_need_jump = true;
			if( args[3] != undefined ){
				$gameSystem._drill_EIG_jump_height = Number(args[3]);
				$gameSystem._drill_EIG_jump_speed = Number(args[5]);
			}
		}
		if( temp_type == "弹跳关闭" ){
			$gameSystem._drill_EIG_need_jump = false;
		}
		if( temp_type == "自动图标行走图开启" ){
			$gameSystem._drill_EIG_need_useIcon = true;
		}
		if( temp_type == "自动图标行走图关闭" ){
			$gameSystem._drill_EIG_need_useIcon = false;
		}
		if( temp_type == "使用图像" ){
			var index = Number(args[3]) - 1;
			$gameSystem._drill_EIG_default_img_random = [index];
		}
		if( temp_type == "使用音效" ){
			var index = Number(args[3]) - 1;
			$gameSystem._drill_EIG_default_se_random = [index];
		}
		if( temp_type == "使用随机图像" ){
			var arr = String(args[3]).split(",");
			$gameSystem._drill_EIG_default_img_random = arr;
		}
		if( temp_type == "使用随机音效" ){
			var arr = String(args[3]).split(",");
			$gameSystem._drill_EIG_default_se_random = arr;
		}
		
		//>可拾取物生成器 : 生成金钱 : 10 : 20 : 随机方形区域 : 2
		//>可拾取物生成器 : 生成道具 : 36 : 1 : 随机方形区域 : 2
		//>可拾取物生成器 : 生成道具 : 36 : 1 : 随机菱形区域 : 2
		//>可拾取物生成器 : 生成道具 : 36 : 1 : 随机圆形区域 : 2
		//>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 随机方形区域 : 2
		//>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 随机菱形区域 : 2
		//>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 随机圆形区域 : 2
		//>可拾取物生成器 : 生成道具 : 南瓜 : 1 : 指定位置 : -1 : 3
		if( temp_type == "生成金钱" ){
			temp_need_generate = true;
			var a = Number(args[3]);		//金钱设置
			var b = Number(args[5]);
			if(a > b){
				var t = a;
				a = b;
				b = t
			}
			var gold = Math.floor(Math.random()*(b-a+1)) + a ;
			temp_event_data['item_type'] = "金钱";
			temp_event_data['item_num'] = gold;
		}
		if( temp_type == "生成物品" || temp_type == "生成道具" ){
			temp_need_generate = true;
			
			var item_name = String(args[3]);		//道具设置
			var item_num = Number(args[5]);
			var item_id = "";
			var item_icon = "";
			var re = /^\d+$/;
			if( re.test(item_name) ){	//数字
				var item_id = Number(item_name) ;
				if( $dataItems[item_id] != null ){
					item_icon = String( $dataItems[item_id].iconIndex );
					item_name = String( $dataItems[item_id].name );
				}
			}else{		//物品名称
				for( var i = 0; i < $dataItems.length; i++ ){
					if( $dataItems[i] == null ){continue;}
					if( $dataItems[i].name == item_name ){			//根据物品名搜索
						item_icon = String( $dataItems[i].iconIndex );
						item_id = i;
						break;
					}
				}
			}
			temp_event_data['item_type'] = "物品";
			temp_event_data['item_id'] = Number(item_id);/*判断物品id与名字情况*/
			temp_event_data['item_name'] = item_name;
			temp_event_data['item_num'] = item_num;
			temp_event_data['item_icon'] = item_icon;
		}
		if( args[7] != undefined ){
			var area_type = String(args[7]);		//区域设置
			if(area_type == "随机方形区域"){
				temp_event_data['tar_type'] = "方形区域";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "随机菱形区域"){
				temp_event_data['tar_type'] = "菱形区域";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "随机圆形区域"){
				temp_event_data['tar_type'] = "圆形区域";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "随机十字区域"){
				temp_event_data['tar_type'] = "十字区域";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "随机横条区域"){
				temp_event_data['tar_type'] = "横条区域";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "随机竖条区域"){
				temp_event_data['tar_type'] = "竖条区域";
				temp_event_data['range'] = Number(args[9]);
			}
			if(area_type == "指定位置"){
				temp_event_data['tar_type'] = "指定位置";
				temp_event_data['tar_x'] = Number(args[9]);
				temp_event_data['tar_y'] = Number(args[11]);
			}
			if(temp_event_data['tar_type'] == undefined){
				temp_event_data['tar_type'] = "指定位置";
				temp_event_data['tar_x'] = 0;
				temp_event_data['tar_y'] = 0;
			}
			
		}
		if( temp_need_generate ){	//生成新事件
			$gameMap.events().forEach(function(event){
				if (event.eventId() === this._eventId){	//当前执行插件指令的 事件id
					temp_event_data['org_x'] = event._x;
					temp_event_data['org_y'] = event._y;
					if( temp_event_data['tar_type'] != "指定位置"){
						var av_list = $gameMap.drill_EIG_getAvailablePosList(event._x,event._y,temp_event_data['range'],temp_event_data['tar_type']);
						var ran = av_list[ Math.floor( Math.random()*av_list.length ) ];
						temp_event_data['tar_x'] = ran['x']-event._x;
						temp_event_data['tar_y'] = ran['y']-event._y;
					}
					
					var new_event_data = $gameMap.drill_EIG_createEventDataTemplate( temp_event_data );
					var new_event = $gameMap.drill_COEM_offspring_createEventByData( new_event_data );
					if($gameSystem._drill_EIG_need_jump){
						new_event.jump(temp_event_data['tar_x'],temp_event_data['tar_y']);
					}else{
						new_event.locate(temp_event_data['tar_x'],temp_event_data['tar_y']);
					}
					//new_event.start();
					//alert($gameMap._events.length);
				};
			}, this);	
		}
	};
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EIG_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventItemGenerator.js 物体管理 - 可拾取物生成器】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EIG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EIG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EIG_sys_initialize.call(this);
	this.drill_EIG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EIG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EIG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EIG_saveEnabled == true ){	
		$gameSystem.drill_EIG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EIG_initSysData();
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
Game_System.prototype.drill_EIG_initSysData = function() {
	this.drill_EIG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EIG_checkSysData = function() {
	this.drill_EIG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EIG_initSysData_Private = function() {
	
	this._drill_EIG_need_useIcon = true;		//自动图标行走图开关
	
	this._drill_EIG_need_jump = true;			//弹跳开关
	this._drill_EIG_jump_height = 72;			//弹跳高度
	this._drill_EIG_jump_speed = 0.60;			//弹跳速度
	this._drill_EIG_jump_level = 1;				//弹跳次数
	this._drill_EIG_jump_levelSound = 0;		//弹跳声音
	
	this._drill_EIG_default_img_random = [0];	//随机图像
	this._drill_EIG_default_se_random = [0];	//随机音效
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EIG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EIG_need_useIcon == undefined ){
		this.drill_EIG_initSysData();
	}
	
};


//=============================================================================
// ** 地图
//=============================================================================
//==============================
// * 地图 - 生成物品事件模板数据
//==============================
Game_Map.prototype.drill_EIG_createEventDataTemplate = function( input_data ){
	
	// > 随机图像
	var random_img = "";
	var random_dir = 2;
	if( input_data['item_type'] == "金钱" && 
		DrillUp.g_EIG_goldPic.length > 0 ){		//（注意 金钱行走图 为空情况）
		var index_img  = Math.floor( Math.random() * DrillUp.g_EIG_goldPic.length );
		random_img = DrillUp.g_EIG_goldPic[index_img];
		random_dir = 2;
		if( DrillUp.g_EIG_goldRandomDir ){ random_dir = 2 + Math.randomInt(4) * 2; }
		
	}else if( DrillUp.g_EIG_itemPic.length > 0 ){	//（注意 可拾取物行走图 为空情况）
		var index_img =  Number($gameSystem._drill_EIG_default_img_random[Math.floor(Math.random()*$gameSystem._drill_EIG_default_img_random.length)]);
		index_img = Math.min( index_img ,DrillUp.g_EIG_itemPic.length-1 );
		random_img = DrillUp.g_EIG_itemPic[index_img];
		random_dir = 2;
		if( DrillUp.g_EIG_itemRandomDir ){ random_dir = 2 + Math.randomInt(4) * 2; }
	}
	
	// > 随机音效
	var index_se = Number($gameSystem._drill_EIG_default_se_random[Math.floor(Math.random()*$gameSystem._drill_EIG_default_se_random.length)]);
	var random_se = "";
	if( index_se >= 0 && DrillUp.g_EIG_se.length > 0 ){
		index_se = Math.min( index_se ,DrillUp.g_EIG_se.length-1 );
		random_se = DrillUp.g_EIG_se[index_se];
	}
	
	// > 新建模板数据
	var new_event_data = {
		"name":"可拾取物",
		"note":"",
		"meta":{},	//镜像反射的查找meta的bug修复（其实一直不知道meta的作用）
		"pages":[{
			"conditions":{
				"actorId":1,"actorValid":false,"itemId":1,"itemValid":false,"selfSwitchCh":"A","selfSwitchValid":false,"switch1Id":1,"switch1Valid":false,"switch2Id":1,"switch2Valid":false,"variableId":1,"variableValid":false,"variableValue":0
			},
			"directionFix":false,
			"image":{
				"tileId":0,
				"characterName":random_img,
				"direction": random_dir ,
				"pattern": Math.floor(Math.random()*3),
				"characterIndex":0
			},
			"list":[
				{"code":250,"indent":0,"parameters":[{"name":random_se,"volume":74,"pitch":100,"pan":0}]},	//音效
				{"code":108,"indent":0,"parameters":[	//【物体-跳跃速度】
					"=>跳跃设置 : 高度["+ String($gameSystem._drill_EIG_jump_height) + "] : 速度[" +
					  String($gameSystem._drill_EIG_jump_speed) +"]"
				]},
				{"code":108,"indent":0,"parameters":[
					"=>跳跃设置 : 弹跳次数["+ String($gameSystem._drill_EIG_jump_level) + "] : 弹跳声音[" +
					  String($gameSystem._drill_EIG_jump_levelSound) +"]"
				]},
				//{"code":126,"indent":0,"parameters":[1,0,0,1]},	//道具
				//{"code":125,"indent":0,"parameters":[0,0,10]},	//金钱
				//{"code":214,"indent":0,"parameters":[]},
				//{"code":0,"indent":0,"parameters":[]}
			],
			"moveFrequency":3,
			"moveRoute":{
				"list":[{"code":0,"parameters":[]}],"repeat":true,"skippable":false,"wait":false
			},
			"moveSpeed":3,
			"moveType":0,
			"priorityType":0,
			"stepAnime":true,
			"through":true,
			"trigger":1,
			"walkAnime":false
		}],
		"x":input_data['org_x'],
		"y":input_data['org_y']
	};
	
	// > 填入事件脚本
	var new_list = new_event_data['pages'][0]['list'];
	if( input_data['item_type'] != "金钱" && input_data['item_icon'] != undefined && $gameSystem._drill_EIG_need_useIcon ){
		if( Imported.Drill_EventIcon ){	//【行走图-图标行走图】
			var com1 = {"code":108,"indent":0,"parameters":["=>图标行走图 : 设置图标 : "+ input_data['item_icon'] ]} ;
			new_list.push(com1);
		}else{
			alert( "【Drill_EventItemGenerator.js 物体管理 - 可拾取物生成器】\n" +
					"生成的事件缺少插件 Drill_EventIcon 行走图-图标行走图，\n你可以选择 添加该插件 或者 关闭自动图标行走图功能。");
		}
	}
	if( input_data['item_type'] == "金钱" ){
		var com2 = {"code":125,"indent":0,"parameters":[0,0,input_data['item_num']]} ;
		new_list.push(com2);
	}
	if( input_data['item_type'] == "物品" ){
		var com3 = {"code":126,"indent":0,"parameters":[input_data['item_id'],0,0,input_data['item_num']]} ;
		new_list.push(com3);
	}
	if( input_data['item_type'] == "武器" ){
		var com4 = {"code":127,"indent":0,"parameters":[input_data['item_id'],0,0,input_data['item_num'],false]} ;
		new_list.push(com4);
	}
	if( input_data['item_type'] == "护甲" ){
		var com5 = {"code":128,"indent":0,"parameters":[input_data['item_id'],0,0,input_data['item_num'],false]} ;
		new_list.push(com5);
	}
	//new_list.push( {"code":214,"indent":0,"parameters":[]} );	//（暂时消除）
	new_list.push( {"code":356,"indent":0,"parameters":[">事件管理核心 : 本事件 : 彻底删除"]} );
	new_list.push( {"code":0,"indent":0,"parameters":[]} );
	
	
	return new_event_data;
};

//=============================================================================
// ** 获取点（自带函数）
//=============================================================================
//==============================
// * 获取点 - 区域
//
//			说明：	该为临时自带用函数，默认使用 固定区域核心。
//==============================
Game_Map.prototype.drill_EIG_getAvailablePosList = function( x, y, range, type ){
	var available_list = [];
	for( var i = -range; i <= range; i++ ){
		for( var j = -range; j <= range; j++ ){
			var _x = this.roundX( x + i );
			var _y = this.roundY( y + j );
			var events = this.eventsXyNt( _x,_y );	//（注意，要求坐标 xy 必须先满足公式，再进行条件捕获，减少计算量）
			if( type == "方形区域" && Math.abs(i) <= range && Math.abs(j) <= range ){				//deltaX()函数考虑了循环地图的情况（公式：dx <= r，dy <= r）
				if( this.isValid(_x,_y) && this.drill_EIG_isAnyPassable(_x,_y) && 
					events.length == 0  && $gamePlayer.pos(_x,_y) == false ){
					available_list.push( {'x':_x ,'y':_y } );
				}
			}
			if( type == "菱形区域" && Math.abs(i) + Math.abs(j) <= range ){							//（公式：dx + dy <= r）
				if( this.isValid(_x,_y) && this.drill_EIG_isAnyPassable(_x,_y) && 
					events.length == 0  && $gamePlayer.pos(_x,_y) == false ){
					available_list.push( {'x':_x ,'y':_y } );
				}
			}
			if( type == "圆形区域" && Math.pow( i ,2) + Math.pow( j ,2) <= Math.pow(range,2) ){		//（公式：dx^2 + dy^2 <= r^2）
				if( this.isValid(_x,_y) && this.drill_EIG_isAnyPassable(_x,_y) && 
					events.length == 0  && $gamePlayer.pos(_x,_y) == false ){
					available_list.push( {'x':_x ,'y':_y } );
				}
			}
			if( type == "十字区域" && ( i == 0 || j == 0 ) ){										//（公式：dx + dy <= r 且 (dx==0 或 dy==0) ）
				if( this.isValid(_x,_y) && this.drill_EIG_isAnyPassable(_x,_y) && 
					events.length == 0  && $gamePlayer.pos(_x,_y) == false ){
					available_list.push( {'x':_x ,'y':_y } );
				}
			}
			if( type == "横条区域" && ( j == 0 )  ){												//（公式：dx + dy <= r 且 (dy==0) ）
				if( this.isValid(_x,_y) && this.drill_EIG_isAnyPassable(_x,_y) && 
					events.length == 0  && $gamePlayer.pos(_x,_y) == false ){
					available_list.push( {'x':_x ,'y':_y } );
				}
			}
			if( type == "竖条区域" && ( i == 0 )  ){												//（公式：dx + dy <= r 且 (dx==0) ）
				if( this.isValid(_x,_y) && this.drill_EIG_isAnyPassable(_x,_y) && 
					events.length == 0  && $gamePlayer.pos(_x,_y) == false ){
					available_list.push( {'x':_x ,'y':_y } );
				}
			}
		}
	}
	if( available_list.length == 0){
		available_list.push( {'x':x ,'y':y } );
	}
	return available_list;
}
//==============================
// * 获取点 - 不可通行判断
//==============================
Game_Map.prototype.drill_EIG_isAnyPassable = function( x, y ){
	return this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventItemGenerator = false;
		alert(
			"【Drill_EventItemGenerator.js 物体管理 - 可拾取物生成器】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfEventManager 物体管理-事件管理核心"
		);
}

