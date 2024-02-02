//=============================================================================
// Drill_EventMutiSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        物体 - 计数开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventMutiSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当计数开关的钥匙数量满足一定条件时，会开启相应条件的锁。
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
 *   (1.计数开关被划分为复合传感器类。
 *      复合传感器用于监听多个事件的条件，开启指定事件的独立开关。
 *      当计数开关的钥匙数量满足一定条件时，会开启相应条件的锁。
 *   (2.钥匙的注释设置 不跨事件页。
 *      锁的注释设置 跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.计数开关只记录钥匙的数量，不考虑钥匙的顺序。
 *      计数开关所有钥匙、锁必须在同一张地图中。
 *   (2.与 序列开关 不同，序列开关要求指定每个事件的条件,是有顺序的。
 * 钥匙/锁：
 *   (1.钥匙和锁最好是不同的事件，不然逻辑会混乱。
 *   (2.你可以设置 多个钥匙对应一把锁 或者 一个钥匙对应多把锁 。
 * 设计：
 *   (1.计数开关常用于点亮多个开关的闯关/解谜类游戏。
 *      游戏设计中，你可能需要考虑开关开启后 事件的缓冲动作，即大门
 *      打开/关闭的动作过程。具体可以去机关管理层看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 钥匙
 * 你需要设置指定开关为某个钥匙，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>计数开关 : 钥匙 : 条件[红机关]
 * 
 * 1.其中"红机关"是完全可以自定义的条件关键字。
 * 2.钥匙的设置不跨事件页，事件页有钥匙的注释，即钥匙+1。
 *   如果事件页中没有注释，则退回钥匙。
 * 3.写"条件[红机关]"与直接写"红机关"效果一样，只是前者容易理解一些。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 计数开关
 * 你需要设置指定开关为计数开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定条件 : 条件[红机关] : 大于[4]
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定条件 : 条件[红机关] : 小于[4]
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定条件 : 条件[红机关] : 等于[4]
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定条件 : 条件[红机关] : 大于等于[4]
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定条件 : 条件[红机关] : 小于等于[4]
 *
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>计数开关 : 独立开关[A] : 满足条件时开启
 * 事件注释：=>计数开关 : 独立开关[A] : 不满足条件时关闭
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发" 就是 "满足条件时开启"的触发+"不满足条件时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"不满足条件时关闭"这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.一个开关只能绑定一个条件，比如"独立开关[A]"写了两条注释"等于[4]"和"等于[3]"，
 *   则插件按写在后面的注释条件来算，写在前面的注释条件作废。
 * 3.写"条件[红机关]"与直接写"红机关"效果一样，只是前者容易理解一些。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定持续触发(逆向)
 * 事件注释：=>计数开关 : 独立开关[A] : 满足条件时关闭
 * 事件注释：=>计数开关 : 独立开关[A] : 不满足条件时开启
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
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定条件 : 条件[红机关] : 大于[4]
 * 事件注释：=>计数开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>计数开关 : 独立开关[B] : 绑定条件 : 条件[红机关] : 大于[6]
 * 事件注释：=>计数开关 : 独立开关[B] : 绑定持续触发
 * 事件注释：=>计数开关 : 独立开关[C] : 绑定条件 : 条件[红机关] : 大于[8]
 * 事件注释：=>计数开关 : 独立开关[C] : 绑定持续触发(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧指令
 * 旧指令的格式相对没有那么规范，但是一样有效：
 *
 * 事件注释(旧)：=>计数开关 : 锁 : 红机关 : 4 : 触发独立开关 : A
 * 事件注释(旧)：=>计数开关 : 锁 : 红机关 : 不满足条件自动OFF
 * 
 * 事件注释(旧)：=>计数开关 : 锁 : 红机关 : 大于[4] : 触发独立开关 : A
 * 事件注释(旧)：=>计数开关 : 锁 : 红机关 : 小于[4] : 触发独立开关 : A
 * 事件注释(旧)：=>计数开关 : 锁 : 红机关 : 等于[4] : 触发独立开关 : A
 * 事件注释(旧)：=>计数开关 : 锁 : 红机关 : 大于等于[4] : 触发独立开关 : A
 * 事件注释(旧)：=>计数开关 : 锁 : 红机关 : 小于等于[4] : 触发独立开关 : A
 *
 * 1.红机关后面的数字为满足条件，如果只有一个数字"4"，表示默认
 *   "大于等于[4]"。
 * 2.你可以设置多个钥匙对应一把锁，或者一个钥匙对应多把锁，多对
 *   多也可以。
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
 * 测试方法：   去物体管理层、脉冲开关设计关卡，复制足够多的计数事件，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【10.14ms】
 *              100个事件的地图中，平均消耗为：【8.29ms】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.计数开关虽然每帧都会被监听一次，但由于触发并执行的情况非常少。
 *   所以不会出现消耗量大的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 添加了插件性能说明。
 * [v1.3]
 * 修复了切换事件页 + 离开地图 + 再回来，开关失效的bug。
 * 修改了注释说明，添加了大于、小于、等于的条件设置。
 * [v1.4]
 * 大幅度优化了底层结构，节约了事件数据存储空间。
 * 实现了多个独立开关的计数触发功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EMS（Event_Muti_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EMS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	机关管理层
//		★性能测试消耗	1.0ms（drill_EMS_refreshSwitch）0.9ms（drill_EMS_setValue）
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
//			->☆物体的属性
//				->钥匙 绑定于 事件页
//			->☆开关的属性
//				->可多个独立开关触发
//				->触发设置
//					> 满足条件时开启
//					> 不满足条件时关闭
//					> 满足条件时关闭
//					> 不满足条件时开启
//				->绑定条件
//					> 关键字
//					> 条件类型
//					> 条件值
//			->☆计数开关容器
//				->钥匙容器
//				->锁容器
//				->事件清除时
//
//			->☆开关控制
//				->优化 - 事件页变化时，才刷新全部开关
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
//			1.每次改变事件页的时候，才检查钥匙和锁，根据钥匙开启锁。
//			  统计全部条件放在update里面，侦测到setupPage才执行一次，因为setupPage有可能会在一帧里面刷很多次。
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
	DrillUp.g_EMS_PluginTip_curName = "Drill_EventMutiSwitch.js 物体-计数开关";
	DrillUp.g_EMS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_EMS_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_EMS_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventMutiSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventMutiSwitch');
	
	
//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EMS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EMS_event_initMembers.call(this);
	this._drill_EMS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EMS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EMS_event_setupPage.call(this);
    this.drill_EMS_setupMutiSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EMS_setupMutiSwitch = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EMS_isFirstBirth == true ){ 
		this._drill_EMS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EMS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EMS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EMS_readPage = function( page_list ){
	
	// > 如果有数据，则每次都重刷一次钥匙注释（当前事件页没钥匙注释的，算作没钥匙）
	if( this._drill_EMS_keyData != undefined ){
		this.drill_EMS_clearKeyList();
		$gameTemp._drill_EMS_needRestatistics_key = true;
	}
	
	// > 事件注释发生变化时，才进行开关控制
	$gameTemp._drill_EMS_needRefresh = true;
	
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>计数开关" ){
				
				/*-----------------钥匙------------------*/	
				if( args.length == 4 ){		//=>计数开关 : 钥匙 : 红机关
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					temp2 = temp2.replace("条件[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "钥匙" ){
						this.drill_EMS_addKey( temp2 );
						$gameTemp._drill_EMS_needRestatistics_key = true;
					}
				}
				
				/*-----------------触发设置------------------*/	
				if( args.length == 8 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					temp1 = temp1.replace("条件[","");
					temp1 = temp1.replace("]","");
					if( type == "绑定条件" ){
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
						this.drill_EMS_setCondition( switch_str, temp1, condition, num );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
				}
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定持续触发" ){
						this.drill_EMS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
					if( type == "满足条件时开启" ){
						this.drill_EMS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
					if( type == "不满足条件时关闭" ){
						this.drill_EMS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
					if( type == "绑定持续触发(逆向)" ){
						this.drill_EMS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
					if( type == "满足条件时关闭" ){
						this.drill_EMS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
					if( type == "不满足条件时开启" ){
						this.drill_EMS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
				}
				
				
				/*-----------------旧指令------------------*/	
				if( args.length == 6 ){	//=>计数开关 : 锁 : 红机关 : 不满足条件自动OFF
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					if( temp1 == "锁" && temp3 == "不满足条件自动OFF" ){
						var switch_str = this.drill_EMS_getSwitchList()[0];	//（直接取第一个）
						if( switch_str == undefined ){ return; }
						this.drill_EMS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
				}
				if( args.length == 10 ){	//=>计数开关 : 锁 : 红机关 : 4 : 触发独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					var temp4 = String(args[7]);
					var switch_str = String(args[9]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( temp1 == "锁" && temp4 == "触发独立开关" ){
						var condition = "大于等于";
						if( temp3.indexOf("大于等于[") != -1 ){
							condition = "大于等于";
						}else if( temp3.indexOf("小于等于[") != -1 ){
							condition = "小于等于";
						}else if( temp3.indexOf("等于[") != -1 ){
							condition = "等于";
						}else if( temp3.indexOf("大于[") != -1 ){
							condition = "大于";
						}else if( temp3.indexOf("小于[") != -1 ){
							condition = "小于";
						}
						var num = 0;
						temp3 = temp3.replace("大于等于[","");
						temp3 = temp3.replace("小于等于[","");
						temp3 = temp3.replace("等于[","");
						temp3 = temp3.replace("大于[","");
						temp3 = temp3.replace("小于[","");
						temp3 = temp3.replace("]","");
						num = Number(temp3);
						
						// > 添加独立开关
						this.drill_EMS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMS_setSwitch_TriggeredOff( switch_str, false );
						
						// > 添加绑定条件
						this.drill_EMS_setCondition( switch_str, temp2, condition, num );
						$gameTemp._drill_EMS_needRestatistics_switch = true;
					}
				}
			};
		};
	}, this);
};



//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门定义 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_EMS_key_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EMS_keyData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EMS_key_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_EMS_checkKeyData = function(){
	if( this._drill_EMS_keyData != undefined ){ return; }
	this._drill_EMS_keyData = {};
	this._drill_EMS_keyData['keyList'] = [];		//钥匙列表
}
//==============================
// * 物体的属性 - 钥匙 - 是否有钥匙
//==============================
Game_Character.prototype.drill_EMS_hasAnyKey = function(){
	return this.drill_EMS_getKeyList().length > 0;
}
//==============================
// * 物体的属性 - 钥匙 - 是否有指定钥匙
//==============================
Game_Character.prototype.drill_EMS_hasKey = function( key_str ){
	if( this._drill_EMS_keyData == undefined ){ return false; }
	for(var i = 0; i < this._drill_EMS_keyData['keyList'].length; i++ ){
		var cur_key = this._drill_EMS_keyData['keyList'][i];
		if( cur_key == key_str ){ return true; }
	}
	return false;
}
//==============================
// * 物体的属性 - 钥匙 - 获取列表
//==============================
Game_Character.prototype.drill_EMS_getKeyList = function(){
	if( this._drill_EMS_keyData == undefined ){ return []; }
	return this._drill_EMS_keyData['keyList'];
}
//==============================
// * 物体的属性 - 钥匙 - 添加
//==============================
Game_Character.prototype.drill_EMS_addKey = function( key ){
	this.drill_EMS_checkKeyData();
	if( this.drill_EMS_hasKey(key) == true ){ return; }		//（不重复添加）
	this._drill_EMS_keyData['keyList'].push(key);
}
//==============================
// * 物体的属性 - 钥匙 - 删除
//==============================
Game_Character.prototype.drill_EMS_removeKey = function( key ){
	this.drill_EMS_checkKeyData();
	for(var i = this._drill_EMS_keyData['keyList'].length -1; i >= 0; i-- ){
		var cur_key = this._drill_EMS_keyData['keyList'][i];
		if( cur_key == key ){
			this._drill_EMS_keyData['keyList'].splice( i, 1 );
		}
	}
}
//==============================
// * 物体的属性 - 钥匙 - 删除全部
//==============================
Game_Character.prototype.drill_EMS_clearKeyList = function(){
	this.drill_EMS_checkKeyData();
	this._drill_EMS_keyData['keyList'] = [];
}


//=============================================================================
// ** ☆开关的属性
//
//			说明：	> 此模块专门定义 开关的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关的属性 - 初始化
//==============================
var _drill_EMS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EMS_switchData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EMS_switch_initialize.call(this);
}
//==============================
// * 开关的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_EMS_checkSwitchData = function(){	
	if( this._drill_EMS_switchData != undefined ){ return; }
	this._drill_EMS_switchData = {};
	this._drill_EMS_switchData['switch'] = {};		//锁列表
}
//==============================
// * 开关的属性 - 初始化独立开关
//
//			说明：	> 注意，多个注释能触发多个独立开关。
//==============================
Game_Character.prototype.drill_EMS_checkSwitchData_Switch = function( switch_str ){
	this.drill_EMS_checkSwitchData()
	if( this._drill_EMS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['triggeredOn'] = false;			//满足条件时开启
	switch_data['notTriggeredOff'] = false;		//不满足条件时关闭
	switch_data['triggeredOff'] = false;		//满足条件时关闭
	switch_data['notTriggeredOn'] = false;		//不满足条件时开启
	
	switch_data['key_str'] = "";				//关键字
	switch_data['condition'] = "";				//条件类型
	switch_data['num'] = 0;						//条件值
	
	this._drill_EMS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_EMS_hasAnySwitch = function(){
	return this.drill_EMS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_EMS_getSwitchList = function(){
	if( this._drill_EMS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_EMS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_EMS_removeSwitch = function( switch_str ){
	this.drill_EMS_checkSwitchData()
	this._drill_EMS_switchData['switch'][switch_str] = undefined;
	delete this._drill_EMS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_EMS_clearSwitchList = function(){
	this.drill_EMS_checkSwitchData()
	this._drill_EMS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 绑定条件
//==============================
Game_Character.prototype.drill_EMS_setCondition = function( switch_str, key_str, condition, num ){
	this.drill_EMS_checkSwitchData();
	this.drill_EMS_checkSwitchData_Switch( switch_str );
	this._drill_EMS_switchData['switch'][switch_str]['key_str'] = key_str;
	this._drill_EMS_switchData['switch'][switch_str]['condition'] = condition;
	this._drill_EMS_switchData['switch'][switch_str]['num'] = Number(num);
	if( isNaN( Number(num) ) ){
		alert( DrillUp.drill_EMS_getPluginTip_ParamIsNaN( "num" ) );
	}
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时开启
//==============================
Game_Character.prototype.drill_EMS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_EMS_checkSwitchData();
	this.drill_EMS_checkSwitchData_Switch( switch_str );
	this._drill_EMS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时关闭
//==============================
Game_Character.prototype.drill_EMS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_EMS_checkSwitchData();
	this.drill_EMS_checkSwitchData_Switch( switch_str );
	this._drill_EMS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时关闭
//==============================
Game_Character.prototype.drill_EMS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_EMS_checkSwitchData();
	this.drill_EMS_checkSwitchData_Switch( switch_str );
	this._drill_EMS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时开启
//==============================
Game_Character.prototype.drill_EMS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_EMS_checkSwitchData();
	this.drill_EMS_checkSwitchData_Switch( switch_str );
	this._drill_EMS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}


//=============================================================================
// ** ☆计数开关容器
//
//			说明：	> 此模块专门定义 计数开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EMS_clearTemp = function(){
	this._drill_EMS_keyTank = [];			//钥匙容器
	this._drill_EMS_switchTank = [];		//锁容器
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EMS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EMS_temp_initialize.call(this);
	this.drill_EMS_clearTemp();
	this._drill_EMS_needRestatistics_key = true;
	this._drill_EMS_needRestatistics_switch = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EMS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp.drill_EMS_clearTemp();
	$gameTemp._drill_EMS_needRestatistics_key = true;
	$gameTemp._drill_EMS_needRestatistics_switch = true;
	_drill_EMS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EMS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EMS_clearTemp();
	$gameTemp._drill_EMS_needRestatistics_key = true;
	$gameTemp._drill_EMS_needRestatistics_switch = true;
	_drill_EMS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EMS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EMS_map_update.call( this, sceneActive );
	this.drill_EMS_updateRestatistics_key();		//帧刷新 - 刷新钥匙统计
	this.drill_EMS_updateRestatistics_switch();		//帧刷新 - 刷新锁统计
};
//==============================
// * 容器 - 帧刷新 - 刷新钥匙统计
//==============================
Game_Map.prototype.drill_EMS_updateRestatistics_key = function(){
	if( $gameTemp._drill_EMS_needRestatistics_key != true ){ return }
	$gameTemp._drill_EMS_needRestatistics_key = false;
	
	$gameTemp._drill_EMS_keyTank = [];			//钥匙容器
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._erased == true ){ continue; }
		if( temp_event.drill_EMS_hasAnyKey() ){
			$gameTemp._drill_EMS_keyTank.push(temp_event);
		}
	}
	
	// > 钥匙容器中包含玩家的情况
	if( $gamePlayer.drill_EMS_hasAnyKey() ){
		$gameTemp._drill_EMS_keyTank.push($gamePlayer);
	}
}
//==============================
// * 容器 - 帧刷新 - 刷新锁统计
//==============================
Game_Map.prototype.drill_EMS_updateRestatistics_switch = function(){
	if( $gameTemp._drill_EMS_needRestatistics_switch != true ){ return }
	$gameTemp._drill_EMS_needRestatistics_switch = false;
	
	$gameTemp._drill_EMS_switchTank = [];		//锁容器（开关容器）
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._erased == true ){ continue; }
		if( temp_event.drill_EMS_hasAnySwitch() ){
			$gameTemp._drill_EMS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EMS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EMS_erase.call(this);
	if( this.drill_EMS_hasAnyKey() ){
		$gameTemp._drill_EMS_needRestatistics_key = false;
	}
	if( this.drill_EMS_hasAnySwitch() ){
		$gameTemp._drill_EMS_needRestatistics_switch = false;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 计数开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_EMS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EMS_map_update2.call( this, sceneActive );
	
	// > 优化 - 在刷新启动时，才刷新
	if( $gameTemp._drill_EMS_needRefresh == true ){
		$gameTemp._drill_EMS_needRefresh = false;
		this.drill_EMS_refreshKey();
		this.drill_EMS_refreshSwitch();
	}
};
//==============================
// * 开关控制 - 刷新钥匙
//==============================
Game_Map.prototype.drill_EMS_refreshKey = function() {
	
	// > 钥匙统计
	var key_count = {};
	for(var i = 0; i < $gameTemp._drill_EMS_keyTank.length; i++ ){ 
		var temp_event = $gameTemp._drill_EMS_keyTank[i];
		var temp_keyList = temp_event.drill_EMS_getKeyList();
		for(var j = 0; j < temp_keyList.length; j++ ){
			var key = temp_keyList[j];
			
			// > 添加钥匙
			if( key_count[key] == undefined ){
				key_count[key] = 1;
			}else{
				key_count[key] += 1;
			}
		}
	}
	this._drill_EMS_keyCount = key_count;
	//alert( JSON.stringify(key_count) );
}
//==============================
// * 开关控制 - 刷新锁
//==============================
Game_Map.prototype.drill_EMS_refreshSwitch = function() {
	
	// > 计数开关
	for( var i = 0; i < $gameTemp._drill_EMS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EMS_switchTank[i];
		
		// > 计数开关 - 获取独立开关列表
		var switch_list = temp_switchEv.drill_EMS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			
			// > 触发
			var isTriggered = false;
			var key_str = temp_switchEv._drill_EMS_switchData['switch'][cur_switch]['key_str'];
			var condition = temp_switchEv._drill_EMS_switchData['switch'][cur_switch]['condition'];
			var num = temp_switchEv._drill_EMS_switchData['switch'][cur_switch]['num'];
			if( condition == "" || condition == "大于等于" ){
				if( this._drill_EMS_keyCount[ key_str ] != undefined &&
					this._drill_EMS_keyCount[ key_str ] >= num ){
					isTriggered = true;
				}
			}
			if( condition == "小于等于" ){
				if( this._drill_EMS_keyCount[ key_str ] != undefined &&
					this._drill_EMS_keyCount[ key_str ] <= num ){
					isTriggered = true;
				}
			}
			if( condition == "等于" ){
				if( this._drill_EMS_keyCount[ key_str ] != undefined &&
					this._drill_EMS_keyCount[ key_str ] == num ){
					isTriggered = true;
				}
			}
			if( condition == "大于" ){
				if( this._drill_EMS_keyCount[ key_str ] != undefined &&
					this._drill_EMS_keyCount[ key_str ] > num ){
					isTriggered = true;
				}
			}
			if( condition == "小于" ){
				if( this._drill_EMS_keyCount[ key_str ] != undefined &&
					this._drill_EMS_keyCount[ key_str ] < num ){
					isTriggered = true;
				}
			}
			
			// > 触发 - 满足条件时
			if( isTriggered ){
				
				if( temp_switchEv._drill_EMS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
					this.drill_EMS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
				if( temp_switchEv._drill_EMS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
					this.drill_EMS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				
			// > 触发 - 不满足条件时
			}else{
				
				if( temp_switchEv._drill_EMS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
					this.drill_EMS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				if( temp_switchEv._drill_EMS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
					this.drill_EMS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
			}
			
		}
	}
	
	this._drill_EMS_keyCount = undefined;	//（此变量只临时使用）
};
//==============================
// * 开关控制 - 执行切换开关
//==============================
Game_Map.prototype.drill_EMS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};

