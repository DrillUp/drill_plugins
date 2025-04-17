//=============================================================================
// Drill_EventSequentialSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体 - 序列开关
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventSequentialSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以可以设置多个条件项，使得开关按条件项顺序的开启/关闭时，才会被激活。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 * 复合传感器：
 *   (1.序列开关被划分为复合传感器类。
 *      复合传感器用于监听多个事件的条件，开启指定事件的独立开关。
 *      当序列开关的固定顺序开关满足开启/关闭条件时，才会被激活。
 *   (2.序列开关的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.序列开关必须指定每一个事件的开关状态作为调节，是有顺序的。
 *   (2.你可以写大量条件注释，这些注释与 分歧条件 指令的判断方式相似。
 *      但是必须所有条件全部同时满足才能够触发。
 *   (3.与 计数开关 不同，计数开关只监听钥匙数量，没有严格的条件。
 * 钥匙/锁：
 *   (1.序列开关所有 条件项 都直接写在锁中。
 *      钥匙就是 条件项 中指定的事件和独立开关。
 *   (2.由于条件严格，即使你切换了锁的事件页，只要有条件未满足，
 *      锁会立即关闭。
 * 设计：
 *   (1.多用于事件图案、规律图形、规定放置顺序的解谜类游戏。
 *      游戏设计中，你可能需要考虑开关开启后 事件的缓冲动作，即大门
 *      打开/关闭的动作过程。具体可以参考重力开关的缓冲动作。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 添加条件项
 * 你需要添加序列开关的条件项，使用下面的注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 本事件 : 目标的独立开关[B]开启时
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 本事件 : 目标的独立开关[B]关闭时
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 事件[10] : 目标的独立开关[A]开启时
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 事件[10] : 目标的独立开关[A]关闭时
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 事件变量[11] : 目标的独立开关[A]开启时
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 事件变量[11] : 目标的独立开关[A]关闭时
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 批量事件[11,10] : 目标的独立开关[A]开启时
 * 事件注释：=>序列开关 : 独立开关[A] : 添加条件项 : 批量事件[11,10] : 目标的独立开关[A]关闭时
 * 
 * 1."独立开关[A]"是 要触发的独立开关，
 *   "目标的独立开关"是 条件项中，要求满足的独立开关设置。
 *   注意，不要写自己判定自己的死循环判定。
 *   不要写 "独立开关[A]" + "本事件" + "目标的独立开关[A]" 这种自己判定自己的死循环判定。
 * 2.一个开关可以绑定多个 条件项。
 *   写多条上述注释，表示有多个条件项，所有条件满足了才会触发。
 *   "批量事件[11,10,13] : 目标的独立开关[A]开启时" 表示有3个条件项，每个事件算一个。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 序列开关
 * 你需要设置指定开关为序列开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>序列开关 : 独立开关[A] : 绑定条件 : 满足全部条件项
 * 事件注释：=>序列开关 : 独立开关[A] : 绑定条件 : 满足的条件项数量 : 大于[4]
 *
 * 事件注释：=>序列开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>序列开关 : 独立开关[A] : 满足条件时开启
 * 事件注释：=>序列开关 : 独立开关[A] : 不满足条件时关闭
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发" 就是 "满足条件时开启"的触发+"不满足条件时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"不满足条件时关闭"这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.一个开关只能绑定一个 条件，比如"独立开关[A]"写了两条注释"等于[4]"和"等于[3]"，
 *   则插件按写在后面的注释条件来算，写在前面的注释条件作废。
 * 3.注意，需要先 "添加条件项"，再 "绑定条件"，最后才 "绑定持续触发"。
 *   三个注释缺一不可。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>序列开关 : 独立开关[A] : 绑定持续触发(逆向)
 * 事件注释：=>序列开关 : 独立开关[A] : 满足条件时关闭
 * 事件注释：=>序列开关 : 独立开关[A] : 不满足条件时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发(逆向)" 就是 "满足条件时关闭"的触发+"不满足条件时关闭"的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.注释 "大于[5]" + "绑定持续触发" 等价于 "小于等于[5]" + "绑定持续触发(逆向)" 。
 * 3.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>序列开关 : 独立开关[A] : 绑定条件 : 满足全部条件项
 * 事件注释：=>序列开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>序列开关 : 独立开关[B] : 绑定条件 : 满足全部条件项
 * 事件注释：=>序列开关 : 独立开关[B] : 绑定持续触发
 * 事件注释：=>序列开关 : 独立开关[C] : 绑定条件 : 满足全部条件项
 * 事件注释：=>序列开关 : 独立开关[C] : 绑定持续触发(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧指令
 * 旧指令的格式相对没有那么规范，但是一样有效：
 * 
 * 事件注释(旧)：=>序列开关 : 独立开关条件 : 本事件 : A : 开启
 * 事件注释(旧)：=>序列开关 : 独立开关条件 : 事件[10] : A : 开启
 * 事件注释(旧)：=>序列开关 : 独立开关条件 : 事件变量[11] : A : 开启
 * 事件注释(旧)：=>序列开关 : 独立开关条件 : 批量事件[11,10] : A : 开启
 * 
 * 事件注释(旧)：=>序列开关 : 独立开关条件 : 事件[10] : A : 开启
 * 事件注释(旧)：=>序列开关 : 独立开关条件 : 事件[10] : A : 关闭
 * 
 * 事件注释(旧)：=>序列开关 : 满足全部条件时触发独立开关 : A
 * 事件注释(旧)：=>序列开关 : 满足指定数量条件时触发独立开关 : 5 : A
 * 
 * 事件注释(旧)：=>序列开关 : 不满足条件自动OFF
 * 
 * 1.序列开关不区分"钥匙"与"锁"，所有条件直接写在锁中。
 * 2.你可以写大量条件注释，这些注释与 分歧条件 指令的原理一样。
 *   但是必须所有条件全部同时满足才能够有效。
 * 3.满足条件时，固定开启触发的独立开关。
 *   如果你还需要在不满足时关闭，需要加上"不满足条件自动OFF"的指令。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   去逻辑图形关卡，复制足够多序列条件事件，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【8.61ms】
 *              100个事件的地图中，平均消耗为：【5.15ms】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.序列开关虽然每帧都会被监听一次，但由于触发并执行的情况非常少。
 *   所以不会出现消耗量大的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了游戏注释说明。
 * [v1.2]
 * 大幅度优化了底层结构，节约了事件数据存储空间。
 * 实现了多个独立开关的序列开关触发功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESeS（Event_Sequential_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_ESeS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	机关管理层
//		★性能测试消耗	1.7ms（drill_ESeS_refreshSwitch）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆事件注释
//
//			->☆开关的属性
//				->可多个独立开关触发
//				->触发设置
//					> 满足条件时开启
//					> 不满足条件时关闭
//					> 满足条件时关闭
//					> 不满足条件时开启
//				->绑定条件
//					> 条件项列表
//					> 条件类型
//					> 条件值
//			->☆序列开关容器
//				->开关的容器
//				->事件清除时
//
//			->☆开关控制
//				->优化 - 独立开关变化时，刷新全部开关
//
//
//		★家谱：
//			大家族-开关
//		
//		★脚本文档：
//			8.物体 > 大家族-开关（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.每次改变事件页的时候，检查一遍条件，根据条件开启锁。
//			2.优化：如果地图里面一个序列开关都没有，则不作多余计算。
//			3.优化：统计全部条件放在update里面，侦测到setupPage才执行一次，因为setupPage有可能会在一帧里面刷很多次。
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
	DrillUp.g_ESeS_PluginTip_curName = "Drill_EventSequentialSwitch.js 物体-序列开关";
	DrillUp.g_ESeS_PluginTip_baseList = ["Drill_EventSelfSwitch.js 物体-独立开关"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_ESeS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_ESeS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_ESeS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_ESeS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_ESeS_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_ESeS_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_ESeS_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventSequentialSwitch = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventSequentialSwitch');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventSelfSwitch ){
	
	
//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_ESeS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_ESeS_event_initMembers.call(this);
	this._drill_ESeS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_ESeS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ESeS_event_setupPage.call(this);
    this.drill_ESeS_setupSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_ESeS_setupSwitch = function() {
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_ESeS_isFirstBirth == true ){ 
		this._drill_ESeS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_ESeS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_ESeS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_ESeS_readPage = function( page_list ){
	
	// > 事件注释发生变化时，刷新开关
	$gameTemp._drill_ESeS_needRefresh = true;
	
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>序列开关" ){
				
				/*-----------------添加条件项------------------*/	
				if( args.length == 8 ){		//=>序列开关 : 独立开关[A] : 添加条件项 : 事件[10] : 目标的独立开关[A]开启时
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var unit = String(args[5]);
					var temp1 = String(args[7]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					
					var e_ids = null;
					if( unit == "本事件" ){
						e_ids = [ this._eventId ];
					}
					if( unit.indexOf("批量事件[") != -1 ){
						unit = unit.replace("批量事件[","");
						unit = unit.replace("]","");
						e_ids = [];
						var temp_arr = unit.split(/[,，]/);
						for( var k=0; k < temp_arr.length; k++ ){
							e_ids.push( Number(temp_arr[k]) );
						}
					}
					if( unit.indexOf("事件变量[") != -1 ){
						unit = unit.replace("事件变量[","");
						unit = unit.replace("]","");
						e_ids = [ $gameVariables.value(Number(unit)) ];
					}
					if( unit.indexOf("事件[") != -1 ){
						unit = unit.replace("事件[","");
						unit = unit.replace("]","");
						e_ids = [ Number(unit) ];
					}
					
					if( e_ids != null && type == "添加条件项" ){
						var tar_enabled = true;
						if( temp1.indexOf("开启") != -1 ){ tar_enabled = true; }
						if( temp1.indexOf("关闭") != -1 ){ tar_enabled = false; }
						var temp_arr = temp1.split(/[\[\]]/);
						if( temp_arr.length >= 3 ){
							var tar_switch = temp_arr[1];
							this.drill_ESeS_addRequireList( switch_str, e_ids, tar_switch, tar_enabled );
							$gameTemp._drill_ESeS_needRestatistics = true;
						}
					}
				}
				
				/*-----------------触发设置------------------*/	
				if( args.length == 6 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var temp1 = String(args[5]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定条件" && temp1 == "满足全部条件项" ){
						this.drill_ESeS_setCondition( switch_str, "满足全部条件项", 0 );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
				}
				if( args.length == 8 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定条件" && temp1 == "满足的条件项数量" ){
						var condition = "大于等于";
						if( temp2.indexOf("大于等于[") != -1 ){
							condition = "大于等于";
						}else if( temp2.indexOf("小于等于[") != -1 ){
							condition = "小于等于";
						}else if( temp2.indexOf("等于[") != -1 ){
							condition = "等于";
						}else if( temp2.indexOf("大于[") != -1 ){
							condition = "大于";
						}else if( temp2.indexOf("小于[") != -1 ){
							condition = "小于";
						}
						var num = 0;
						temp2 = temp2.replace("大于等于[","");
						temp2 = temp2.replace("小于等于[","");
						temp2 = temp2.replace("等于[","");
						temp2 = temp2.replace("大于[","");
						temp2 = temp2.replace("小于[","");
						temp2 = temp2.replace("]","");
						num = Number(temp2);
						this.drill_ESeS_setCondition( switch_str, condition, num );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
				}
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定持续触发" ){
						this.drill_ESeS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_ESeS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_ESeS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_ESeS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
					if( type == "满足条件时开启" ){
						this.drill_ESeS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_ESeS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
					if( type == "不满足条件时关闭" ){
						this.drill_ESeS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_ESeS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
					if( type == "绑定持续触发(逆向)" ){
						this.drill_ESeS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_ESeS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_ESeS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_ESeS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
					if( type == "满足条件时关闭" ){
						this.drill_ESeS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_ESeS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
					if( type == "不满足条件时开启" ){
						this.drill_ESeS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_ESeS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
				}
				
				
				/*-----------------旧指令 - 条件项------------------*/
				if( args.length == 8 ){	//=>序列开关 : 独立开关条件 : 本事件 : A : 开启
					var type = String(args[1]);
					var unit = String(args[3]);
					var tar_switch = String(args[5]);
					var temp2 = String(args[7]);
					
					var e_ids = null;
					if( unit == "本事件" ){
						e_ids = [ this._eventId ];
					}
					if( unit.indexOf("批量事件[") != -1 ){
						unit = unit.replace("批量事件[","");
						unit = unit.replace("]","");
						e_ids = [];
						var temp_arr = unit.split(/[,，]/);
						for( var k=0; k < temp_arr.length; k++ ){
							e_ids.push( Number(temp_arr[k]) );
						}
					}
					if( unit.indexOf("事件变量[") != -1 ){
						unit = unit.replace("事件变量[","");
						unit = unit.replace("]","");
						e_ids = [ $gameVariables.value(Number(unit)) ];
					}
					if( unit.indexOf("事件[") != -1 ){
						unit = unit.replace("事件[","");
						unit = unit.replace("]","");
						e_ids = [ Number(unit) ];
					}
					
					if( e_ids != null && type == "独立开关条件" ){
						var tar_enabled = (temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" );
						var switch_list = this.drill_ESeS_getSwitchList();
						if( switch_list.length == 0 ){
							this.drill_ESeS_addRequireList( "temp", e_ids, tar_switch, tar_enabled );	//（暂存到一个临时对象中）
						}else{
							this.drill_ESeS_addRequireList( switch_list[0], e_ids, tar_switch, tar_enabled );
						}
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
				}
				
				/*-----------------旧指令 - 绑定持续触发------------------*/
				if( args.length == 4 ){	//=>序列开关 : 满足全部条件时触发独立开关 : A
					var type = String(args[1]);
					var switch_str = String(args[3]);
					if( type == "满足全部条件时触发独立开关" ){
						
						// > 替换temp的数据
						if( this._drill_ESeS_switchData['switch']["temp"] != undefined ){
							var data = this._drill_ESeS_switchData['switch']["temp"];
							this._drill_ESeS_switchData['switch'][switch_str] = data;
							delete this._drill_ESeS_switchData['switch']["temp"];
						}
						
						// > 添加独立开关
						this.drill_ESeS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_ESeS_setSwitch_TriggeredOff( switch_str, false );
						
						// > 添加绑定条件
						this.drill_ESeS_setCondition( switch_str, "满足全部条件项", 0 );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
				}
				if( args.length == 6 ){	//=>序列开关 : 满足指定数量条件时触发独立开关 : 5 : A
					var type = String(args[1]);
					var temp1 = Number(args[3]);
					var switch_str = String(args[5]);
					if( type == "满足指定数量条件时触发独立开关" ){
						
						// > 替换temp的数据
						if( this._drill_ESeS_switchData['switch']["temp"] != undefined ){
							var data = this._drill_ESeS_switchData['switch']["temp"];
							this._drill_ESeS_switchData['switch'][switch_str] = data;
							delete this._drill_ESeS_switchData['switch']["temp"];
						}
						
						// > 添加独立开关
						this.drill_ESeS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_ESeS_setSwitch_TriggeredOff( switch_str, false );
						
						// > 添加绑定条件
						this.drill_ESeS_setCondition( switch_str, "大于等于", temp1 );
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
				}
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "不满足条件自动OFF" ){
						var switch_list = this.drill_ESeS_getSwitchList();
						if( switch_list.length == 0 ){
							this.drill_ESeS_setSwitch_NotTriggeredOff( "temp", true );
							this.drill_ESeS_setSwitch_NotTriggeredOn( "temp", false );
						}else{
							this.drill_ESeS_setSwitch_NotTriggeredOff( switch_list[0], true );
							this.drill_ESeS_setSwitch_NotTriggeredOn( switch_list[0], false );
						}
						$gameTemp._drill_ESeS_needRestatistics = true;
					}
				}
			};
		};
	}, this);
};



//=============================================================================
// ** ☆开关的属性
//
//			说明：	> 此模块专门定义 开关的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关的属性 - 初始化
//==============================
var _drill_ESeS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_ESeS_switchData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_ESeS_switch_initialize.call(this);
}
//==============================
// * 开关的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Character.prototype.drill_ESeS_checkSwitchData = function(){	
	if( this._drill_ESeS_switchData != undefined ){ return; }
	this._drill_ESeS_switchData = {};
	this._drill_ESeS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 初始化 独立开关容器
//
//			说明：	> 注意，多个注释能触发多个独立开关。
//					> 层面关键字为：['switch']，一对多。
//==============================
Game_Character.prototype.drill_ESeS_checkSwitchData_Switch = function( switch_str ){
	this.drill_ESeS_checkSwitchData()
	if( this._drill_ESeS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['triggeredOn'] = false;			//满足条件时开启
	switch_data['notTriggeredOff'] = false;		//不满足条件时关闭
	switch_data['triggeredOff'] = false;		//满足条件时关闭
	switch_data['notTriggeredOn'] = false;		//不满足条件时开启
	
	switch_data['requireList'] = [];			//条件项列表
	switch_data['condition'] = "";				//条件类型
	switch_data['num'] = 0;						//条件值
	
	this._drill_ESeS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_ESeS_hasAnySwitch = function(){
	return this.drill_ESeS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_ESeS_getSwitchList = function(){
	if( this._drill_ESeS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_ESeS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_ESeS_removeSwitch = function( switch_str ){
	this.drill_ESeS_checkSwitchData()
	this._drill_ESeS_switchData['switch'][switch_str] = undefined;
	delete this._drill_ESeS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_ESeS_clearSwitchList = function(){
	this.drill_ESeS_checkSwitchData()
	this._drill_ESeS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 绑定条件
//==============================
Game_Character.prototype.drill_ESeS_setCondition = function( switch_str, condition, num ){
	this.drill_ESeS_checkSwitchData();
	this.drill_ESeS_checkSwitchData_Switch( switch_str );
	this._drill_ESeS_switchData['switch'][switch_str]['condition'] = condition;
	this._drill_ESeS_switchData['switch'][switch_str]['num'] = Number(num);
	if( isNaN( Number(num) ) ){
		alert( DrillUp.drill_ESeS_getPluginTip_ParamIsNaN( "num" ) );
	}
}
//==============================
// * 开关的属性 - 添加条件（一个）
//==============================
Game_Character.prototype.drill_ESeS_addRequireOne = function( switch_str, tar_e_id, tar_switch, tar_enabled ){
	this.drill_ESeS_checkSwitchData();
	this.drill_ESeS_checkSwitchData_Switch( switch_str );
	//（每个condition对应一条 [ this._mapId, tar_e_id, tar_switch ] == tar_enabled 的判定）
	var switch_data = this._drill_ESeS_switchData['switch'][switch_str];
	var require = {};
	require['tar_e_id'] = tar_e_id;
	require['tar_switch'] = tar_switch;
	require['tar_enabled'] = tar_enabled;
	
	// > 去除重复
	var has_repeat = false;
	for( var i = 0; i < switch_data['requireList'].length; i++ ){
		var cur_require = switch_data['requireList'][i];
		if( cur_require['tar_e_id'] == require['tar_e_id'] &&
			cur_require['tar_switch'] == require['tar_switch'] &&
			cur_require['tar_enabled'] == require['tar_enabled'] ){
			has_repeat = true;
			break;
		}
	}
	if( has_repeat == false ){
		switch_data['requireList'].push( require );
	}
}
//==============================
// * 开关的属性 - 添加条件（多个）
//==============================
Game_Character.prototype.drill_ESeS_addRequireList = function( switch_str, tar_e_id_list, tar_switch, tar_enabled ){
	this.drill_ESeS_checkSwitchData();
	this.drill_ESeS_checkSwitchData_Switch( switch_str );
	//（每个condition对应一条 [ this._mapId, tar_e_id, tar_switch ] == tar_enabled 的判定）
	var switch_data = this._drill_ESeS_switchData['switch'][switch_str];
	for( var i=0; i < tar_e_id_list.length; i++ ){
		var tar_e_id = tar_e_id_list[i];
		var require = {};
		require['tar_e_id'] = tar_e_id;
		require['tar_switch'] = tar_switch;
		require['tar_enabled'] = tar_enabled;
		
		// > 去除重复
		var has_repeat = false;
		for( var j = 0; j < switch_data['requireList'].length; j++ ){
			var cur_require = switch_data['requireList'][j];
			if( cur_require['tar_e_id'] == require['tar_e_id'] &&
			    cur_require['tar_switch'] == require['tar_switch'] &&
			    cur_require['tar_enabled'] == require['tar_enabled'] ){
				has_repeat = true;
				break;
			}
		}
		if( has_repeat == false ){
			switch_data['requireList'].push( require );
		}
	}
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时开启
//==============================
Game_Character.prototype.drill_ESeS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_ESeS_checkSwitchData();
	this.drill_ESeS_checkSwitchData_Switch( switch_str );
	this._drill_ESeS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时关闭
//==============================
Game_Character.prototype.drill_ESeS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_ESeS_checkSwitchData();
	this.drill_ESeS_checkSwitchData_Switch( switch_str );
	this._drill_ESeS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时关闭
//==============================
Game_Character.prototype.drill_ESeS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_ESeS_checkSwitchData();
	this.drill_ESeS_checkSwitchData_Switch( switch_str );
	this._drill_ESeS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时开启
//==============================
Game_Character.prototype.drill_ESeS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_ESeS_checkSwitchData();
	this.drill_ESeS_checkSwitchData_Switch( switch_str );
	this._drill_ESeS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}


//=============================================================================
// ** ☆序列开关容器
//
//			说明：	> 此模块专门定义 序列开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_ESeS_clearTemp = function(){
	this._drill_ESeS_switchTank = [];
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_ESeS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_ESeS_temp_initialize.call(this);
	this.drill_ESeS_clearTemp();
	this._drill_ESeS_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_ESeS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp.drill_ESeS_clearTemp();
	$gameTemp._drill_ESeS_needRestatistics = true;
	_drill_ESeS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_ESeS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_ESeS_clearTemp();
	$gameTemp._drill_ESeS_needRestatistics = true;
	_drill_ESeS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_ESeS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ESeS_map_update.call( this, sceneActive );
	this.drill_ESeS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_ESeS_updateRestatistics = function(){
	if( $gameTemp._drill_ESeS_needRestatistics != true ){ return }
	$gameTemp._drill_ESeS_needRestatistics = false;
	
	$gameTemp._drill_ESeS_switchTank = [];
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_ESeS_hasAnySwitch() ){
			$gameTemp._drill_ESeS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_ESeS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_ESeS_erase.call(this);
	if( this.drill_ESeS_hasAnySwitch() ){
		$gameTemp._drill_ESeS_needRestatistics = true;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 序列开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 独立开关 值变化时
//
//			说明：	> 注意，序列开关的条件项 绑定于 独立开关，所以独立开关变化时，条件项需要立即变化。
//==============================
var _drill_ESeS_valueChanged = Game_SelfSwitches.prototype.drill_ESS_valueChanged;
Game_SelfSwitches.prototype.drill_ESS_valueChanged = function( key, value ){
	_drill_ESeS_valueChanged.call( this, key, value );
	$gameTemp._drill_ESeS_needRefresh = true;
};
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_ESeS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_ESeS_map_update2.call( this, sceneActive );
	
	// > 优化 - 在刷新启动时，才刷新
	if( $gameTemp._drill_ESeS_needRefresh == true ){
		$gameTemp._drill_ESeS_needRefresh = false;
		this.drill_ESeS_refreshSwitch();
	}
};
//==============================
// * 开关控制 - 刷新开关
//==============================
Game_Map.prototype.drill_ESeS_refreshSwitch = function() {
	
	// > 序列开关
	for( var i = 0; i < $gameTemp._drill_ESeS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_ESeS_switchTank[i];
		
		// > 数据 - switchData层面（与事件一对一）
		var switch_list = temp_switchEv.drill_ESeS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		
		// > 数据 - ['switch']层面（与事件一对多）
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			
			// > 触发 - 统计准备
			var fit_num = 0;
			var requireList = temp_switchEv._drill_ESeS_switchData['switch'][cur_switch]['requireList'];
			for(var k = 0; k < requireList.length; k++ ){
				var require = requireList[k];
				var s_key = [this._mapId, require['tar_e_id'], require['tar_switch'] ];
				if( $gameSelfSwitches.value(s_key) == require['tar_enabled'] ){
					fit_num += 1;
				}
			}
			//alert( cur_switch );		//（如果没有其他事件反复切换 独立开关，那么此处只会执行 有限次数的 切换）
			//alert( fit_num );
			//alert( JSON.stringify( requireList ) );
			
			// > 触发
			var isTriggered = false;
			var condition = temp_switchEv._drill_ESeS_switchData['switch'][cur_switch]['condition'];
			var num = temp_switchEv._drill_ESeS_switchData['switch'][cur_switch]['num'];
			if( condition == "满足全部条件项" ){
				if( fit_num >= requireList.length ){
					isTriggered = true;
				}
			}
			if( condition == "" || condition == "大于等于" ){
				if( fit_num >= num ){
					isTriggered = true;
				}
			}
			if( condition == "小于等于" ){
				if( fit_num <= num ){
					isTriggered = true;
				}
			}
			if( condition == "等于" ){
				if( fit_num == num ){
					isTriggered = true;
				}
			}
			if( condition == "大于" ){
				if( fit_num > num ){
					isTriggered = true;
				}
			}
			if( condition == "小于" ){
				if( fit_num < num ){
					isTriggered = true;
				}
			}
			
			// > 触发 - 满足条件时
			if( isTriggered ){
				
				if( temp_switchEv._drill_ESeS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
					this.drill_ESeS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
				if( temp_switchEv._drill_ESeS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
					this.drill_ESeS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				
			// > 触发 - 不满足条件时
			}else{
				
				if( temp_switchEv._drill_ESeS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
					this.drill_ESeS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				if( temp_switchEv._drill_ESeS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
					this.drill_ESeS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
			}
			
		}
	}
};
//==============================
// * 开关控制 - 执行切换开关
//==============================
Game_Map.prototype.drill_ESeS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventSequentialSwitch = false;
		var pluginTip = DrillUp.drill_ESeS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


