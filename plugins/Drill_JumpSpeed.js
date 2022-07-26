//=============================================================================
// Drill_JumpSpeed.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        物体 - 跳跃速度
 * @author Drill_up，赤瞳大白猫
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_Jump +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以单独控制事件或者玩家跳跃时的高度、速度、时间。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 并且可以作用于其他插件。
 * 作用于：
 *   - Drill_EventItemGenerator   物体管理-可拾取物生成器
 *     如果使用了该插件，目标插件生成的所有道具弹跳的高度速度可以控制。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 2.更多详细的介绍，去看看 "10.互动 > 关于跳跃能力.docx"。
 * 跳跃设置：
 *   (1.该插件的事件注释不跨事件页，切换事件页后重置设置。
 *      速度和时间只能指定一个，分别对应不同的插件指令与注释。
 *   (2.开超慢速度时，你会发现跳跃的行走图是一直走动的，你可以通过设置
 *      MOG_CharPoses角色姿势的跳跃行走图，使其看起来"飘动"，而不是"走动"。
 * 多次弹跳：
 *   (1.多次弹跳整个只算作一次跳跃。
 *      并且弹跳中间过程时接触地面，都不算落地，不受事件干扰。
 *  （2.例如，弹跳次数为3，第一次落地和第二次落地都不会受干扰。
 *      并且第三次落地的位置为跳跃的目的地。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 在控制了跳跃的事件，在事件注释中，必须含有下面的关键字设置：
 * （注意：冒号两边都有一个空格。）
 * 
 * 事件注释：=>跳跃设置 : 高度[+20] : 时间[60]
 * 事件注释：=>跳跃设置 : 高度[-10] : 速度[1.5]
 * 事件注释：=>跳跃设置 : 弹跳次数[2] : 弹跳声音[1]
 * 
 * 1.重复的事件注释，将以最后一个为准。
 * 2.跳跃的距离对于高度有较大影响。
 *   正数表示在距离影响的基础上增加高度，负数表示减去，单位像素。
 * 3.时间是指定跳跃到目的地消耗的时间。单位帧。（1秒60帧）
 *   速度是指定跳跃的速度，"速度[1.5]"表示在默认的基础上 x1.5 倍。
 * 4."弹跳次数"需要填大于或等于2的数字，填1表示关闭多次弹跳。
 *   "弹跳声音"表示弹跳接触地面时播放的声音，对应该插件配置的资源的序号，
 *   0表示不播放声音。
 * 
 * 以下是旧版本的指令，也可以用：
 * 事件注释(旧)：=>跳跃设置 : 高度时间 : 72 : 60
 * 事件注释(旧)：=>跳跃设置 : 高度速度 : 72 : 1.5
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 跳跃设置：
 * 你可以通过插件指令设置事件的跳跃能力。（切换地图后失效）
 * （注意：冒号两边都有一个空格。）
 * 
 * 插件指令：>跳跃设置 : 玩家 : 高度[+20] : 时间[60]
 * 插件指令：>跳跃设置 : 本事件 : 高度[+20] : 时间[60]
 * 插件指令：>跳跃设置 : 事件[10] : 高度[+20] : 时间[60]
 * 插件指令：>跳跃设置 : 事件变量[21] : 高度[+20] : 时间[60]
 * 插件指令：>跳跃设置 : 批量事件[10,11,12] : 高度[+20] : 时间[60]
 * 插件指令：>跳跃设置 : 批量事件变量[21,22] : 高度[+20] : 时间[60]
 *
 * 插件指令：>跳跃设置 : 本事件 : 高度[+20] : 时间[60]
 * 插件指令：>跳跃设置 : 本事件 : 高度[+20] : 速度[1.5]
 * 插件指令：>跳跃设置 : 本事件 : 弹跳次数[2] : 弹跳声音[1]
 * 
 * 1.前半部分（玩家）和后半部分（时间[60]）的参数可以随意组合。
 *   一共有6*3种组合方式。
 * 2.该插件指令只在当前地图有效，离开地图则失效。
 * 3."弹跳次数"需要填大于或等于2的数字，填1表示关闭多次弹跳。
 *   "弹跳声音"表示弹跳接触地面时播放的声音，0表示不播放声音。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>跳跃设置 : 21 : 高度时间 : 72 : 60
 * 插件指令(旧)：>跳跃设置 : 21 : 高度速度 : 72 : 1.5
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
 * 测试方法：   物体管理层中，放置20个跳跃事件，进行性能测试。
 * 测试结果：   200个事件的地图中，消耗为：【6.03ms】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.跳跃速度由于为单次执行，所以并不会造成大的负担。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范修改了插件指令设置。
 * [v1.2]
 * 修改了注释设置，插件指令规范用">"，注释规范用"=>"。
 * [v1.3]
 * 优化了内部结构。
 * [v1.4]
 * 修改了插件指令格式。添加了弹跳次数功能。
 * 
 * 
 * @param 资源-多次弹跳音效
 * @desc 配置多次弹跳时，中间过程接触地面将播放音效。
 * @default ["动作_弹跳_4"]
 * @require 1
 * @dir audio/se/
 * @type file[]
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		JSp（Jump_Speed）
//		临时全局变量	无
//		临时局部变量	this._drill_JSp_xxx（Game_Event中存储，Game_CharacterBase判断使用）
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.updateJump（半重写）
//						Game_CharacterBase.prototype.jump（半重写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	物体管理层，到处跳
//		★性能测试消耗	4.01ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			跳跃速度：
//				->跳跃公式
//				->高度、速度、时间
//				->弹跳次数
//
//		★必要注意事项：
//			1.弹跳公式没有使用默认公式，这里取得了默认公式的高度，就直接开始自写公式了。
//			  【公式分为 直线位移公式 和 y轴抛物线公式】
//			2.弹跳分段中，每段的时间都是【相等的】，弹3次，则时间为总时间的三分之一。
//			  多层抛物线是根据三角形，逐级递减。
//			  分段速度也是根据阶梯速度公式，逐级递减。（在这里被坑了很长时间）
//
//		★其它说明细节：
//			1.跳跃前不改变朝向，应该在特殊情况下由子插件临时继承方法来写。
//			  这里如果作为中介，反而会让程序变复杂。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_JumpSpeed = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_JumpSpeed');
	
	
	/*-----------------杂项------------------*/
	if( DrillUp.parameters['资源-多次弹跳音效'] != "" &&
		DrillUp.parameters['资源-多次弹跳音效'] != undefined  ){
		DrillUp.g_JSp_se = JSON.parse(DrillUp.parameters['资源-多次弹跳音效']);
	}else{
		DrillUp.g_JSp_se = [];
	}


//=============================================================================
// ** 插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令
//==============================
var _drill_JSp_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_JSp_pluginCommand.call(this,command, args);
    this.drill_JSp_command(command, args);
    this.drill_JSp_oldCommand(command, args);
};
//==============================
// * 插件指令 - 新指令
//==============================
Game_Interpreter.prototype.drill_JSp_command = function( command, args ){
	if( command === ">跳跃设置" ){
		
		/*-----------------事件------------------*/
		if(args.length == 6){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var e_ids = null;
			
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
			
			if( e_ids && e_ids.length > 0 ){
				if( temp1.indexOf("高度[") != -1 && temp2.indexOf("时间[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					temp2 = temp2.replace("时间[","");
					temp2 = temp2.replace("]","");
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_JSp_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_JSp['enabled'] = true;
						e._drill_JSp['height'] = Number(temp1);
						e._drill_JSp['time'] = Number(temp2);
						e._drill_JSp['speed'] = -1;
					}
				}
				if( temp1.indexOf("高度[") != -1 && temp2.indexOf("速度[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					temp2 = temp2.replace("速度[","");
					temp2 = temp2.replace("]","");
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_JSp_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_JSp['enabled'] = true;
						e._drill_JSp['height'] = Number(temp1);
						e._drill_JSp['time'] = -1;
						e._drill_JSp['speed'] = Number(temp2);
					}
				}
				if( temp1.indexOf("弹跳次数[") != -1 && temp2.indexOf("弹跳声音[") != -1 ){
					temp1 = temp1.replace("弹跳次数[","");
					temp1 = temp1.replace("]","");
					temp2 = temp2.replace("弹跳声音[","");
					temp2 = temp2.replace("]","");
					for( var j=0; j < e_ids.length; j++ ){
						var e_id = e_ids[j];
						if( $gameMap.drill_JSp_isEventExist( e_id ) == false ){ continue; }
						var e = $gameMap.event( e_id );
						e._drill_JSp['level'] = Math.max(1, Number(temp1));
						e._drill_JSp['levelSound'] = Number(temp2);
					}
				}
			}
		}
		/*-----------------玩家------------------*/
		if(args.length == 6){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "玩家" ){
				if( temp1.indexOf("高度[") != -1 && temp2.indexOf("时间[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					temp2 = temp2.replace("时间[","");
					temp2 = temp2.replace("]","");
					$gamePlayer._drill_JSp['enabled'] = true;
					$gamePlayer._drill_JSp['height'] = Number(temp1);
					$gamePlayer._drill_JSp['time'] = Number(temp2);
					$gamePlayer._drill_JSp['speed'] = -1;
					for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
						var follower = $gamePlayer.followers()._data[i];
						follower._drill_JSp['enabled'] = true;
						follower._drill_JSp['height'] = Number(temp1);
						follower._drill_JSp['time'] = Number(temp2);
						follower._drill_JSp['speed'] = -1;
					};	
				}
				if( temp1.indexOf("高度[") != -1 && temp2.indexOf("速度[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					temp2 = temp2.replace("速度[","");
					temp2 = temp2.replace("]","");
					$gamePlayer._drill_JSp['enabled'] = true;
					$gamePlayer._drill_JSp['height'] = Number(temp1);
					$gamePlayer._drill_JSp['time'] = -1;
					$gamePlayer._drill_JSp['speed'] = Number(temp2);
					for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
						var follower = $gamePlayer.followers()._data[i];
						follower._drill_JSp['enabled'] = true;
						follower._drill_JSp['height'] = Number(temp1);
						follower._drill_JSp['time'] = -1;
						follower._drill_JSp['speed'] = Number(temp2);
					};	
				}
				if( temp1.indexOf("弹跳次数[") != -1 && temp2.indexOf("弹跳声音[") != -1 ){
					temp1 = temp1.replace("弹跳次数[","");
					temp1 = temp1.replace("]","");
					temp2 = temp2.replace("弹跳声音[","");
					temp2 = temp2.replace("]","");
					$gamePlayer._drill_JSp['level'] = Math.max(1, Number(temp1));
					$gamePlayer._drill_JSp['levelSound'] = Number(temp2);
					for (var i = 0; i < $gamePlayer.followers()._data.length; i++) {
						var follower = $gamePlayer.followers()._data[i];
						follower._drill_JSp['level'] = Math.max(1, Number(temp1));
						follower._drill_JSp['levelSound'] = Number(temp2);
					};	
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 旧指令
//==============================
Game_Interpreter.prototype.drill_JSp_oldCommand = function( command, args ){
	
	/*-----------------旧指令------------------*/
	var event_id = -1;	
	if( command === ">跳跃设置" ){
		if( args.length == 8 ){
			event_id = Number(args[1]);
			var type = String(args[3]);
			if(type == "高度时间"){
				var h = Number(args[5]);
				var t = Number(args[7]);
				var s = -1;
			}
			if(type == "高度速度"){
				var h = Number(args[5]);
				var t = -1;
				var s = Number(args[7]);
			}
		}
	};
	if( event_id > 0 ){
		$gameMap.events().forEach(function(event) {
			if (event.eventId() === event_id) {
				event._drill_JSp['enabled'] = true;
				event._drill_JSp['height'] = h;
				event._drill_JSp['time'] = t;
				event._drill_JSp['speed'] = s;
			};
		}, this);	
	};
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_JSp_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_JumpSpeed.js 物体 - 跳跃速度】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 物体初始化
//==============================
var _drill_JSp_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_drill_JSp_initMembers.call(this);
	this.drill_JSp_initData();
};
Game_CharacterBase.prototype.drill_JSp_initData = function() {
	
	// > 常规属性
	this._drill_JSp = {};
	this._drill_JSp['enabled'] = false;			//激活（未激活使用默认跳跃）
	this._drill_JSp['height'] = -1;				//跳跃高度（增量值）
	this._drill_JSp['time'] = -1;				//跳跃时间
	this._drill_JSp['speed'] = -1;				//跳跃速度（比例值）
	this._drill_JSp['level'] = 1;				//弹跳次数
	this._drill_JSp['levelSound'] = -1;			//弹跳声音
	
	// > 公式参数
	this._drill_JSp['_data_inited'] = false;	//初始化（在起跳setjump时初始化）
	this._drill_JSp['_count'] = 0;				//起跳时间
	this._drill_JSp['_orgX'] = 0;				//起跳点x
	this._drill_JSp['_orgY'] = 0;				//起跳点y
	this._drill_JSp['_realDistance'] = 0;		//抛物线距离
	this._drill_JSp['_realHight'] = 0;			//抛物线高度
	
	// > 私有属性初始化
	this._drill_JSp_curJumpHeight = 0;			//当前跳跃高度值
};
//==============================
// * 玩家初始化
//==============================
var _drill_JSp_p_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	_drill_JSp_p_initMembers.call(this);
	this._drill_JSp['enabled'] = true;		//固定玩家使用的跳跃属性
	this._drill_JSp['height'] = 0;
	this._drill_JSp['time'] = -1;
	this._drill_JSp['speed'] = 1;
}
//==============================
// * 注释初始化
//==============================
var _drill_JSp_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_JSp_setupPage.call(this);
    this.drill_JSp_setJumpSpeed();
};
Game_Event.prototype.drill_JSp_setJumpSpeed = function() {
	if( !this._erased && this.page() ){ this.list().forEach(function(l) {
		if( l.code === 108 ){
			/*-----------------指令------------------*/
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>跳跃设置" ){	//=>跳跃设置 : 高度[+0] : 时间[60]
				if(args.length == 4){
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					if( temp1.indexOf("高度[") != -1 && temp2.indexOf("时间[") != -1 ){
						temp1 = temp1.replace("高度[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("时间[","");
						temp2 = temp2.replace("]","");
						this._drill_JSp['enabled'] = true;
						this._drill_JSp['height'] = Number(temp1);
						this._drill_JSp['time'] = Number(temp2);
						this._drill_JSp['speed'] = -1;
					}
					if( temp1.indexOf("高度[") != -1 && temp2.indexOf("速度[") != -1 ){
						temp1 = temp1.replace("高度[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("速度[","");
						temp2 = temp2.replace("]","");
						this._drill_JSp['enabled'] = true;
						this._drill_JSp['height'] = Number(temp1);
						this._drill_JSp['time'] = -1;
						this._drill_JSp['speed'] = Number(temp2);
					}
					if( temp1.indexOf("弹跳次数[") != -1 && temp2.indexOf("弹跳声音[") != -1 ){
						temp1 = temp1.replace("弹跳次数[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("弹跳声音[","");
						temp2 = temp2.replace("]","");
						this._drill_JSp['level'] = Math.max(1, Number(temp1));
						this._drill_JSp['levelSound'] = Number(temp2) - 1;
					}
				}
			};
			/*-----------------旧指令------------------*/
			var args = l.parameters[0].split(': ');
			if( args[0].toLowerCase() == "=>跳跃设置 " ){
				if (args[1].toLowerCase() == "高度时间 "){
					this._drill_JSp['enabled'] = true;
					this._drill_JSp['height'] = Number(args[2]);
					this._drill_JSp['time'] = Number(args[3]);
					this._drill_JSp['speed'] = -1;
				}
				if (args[1].toLowerCase() == "高度速度 "){
					this._drill_JSp['enabled'] = true;
					this._drill_JSp['height'] = Number(args[2]);
					this._drill_JSp['time'] = -1;
					this._drill_JSp['speed'] = Number(args[3]);
				}
			};  
		};
	}, this);};
};

//=============================================================================
// ** 跳跃
//=============================================================================
//==============================
// * 跳跃 - 参数初始化
//==============================
var _drill_JSp_jump = Game_CharacterBase.prototype.jump;
Game_CharacterBase.prototype.jump = function( xPlus, yPlus ){
	if( this._drill_JSp['enabled'] == true ){
		this.drill_JSp_jumpSet(xPlus, yPlus);
	}else{
		_drill_JSp_jump.call(this,xPlus, yPlus);
	}
};
Game_CharacterBase.prototype.drill_JSp_jumpSet = function(xPlus, yPlus) {
	
	// > 方向控制
	if( Math.abs(xPlus) > Math.abs(yPlus) ){
		if( xPlus !== 0 ){
			this.setDirection(xPlus < 0 ? 4 : 6);
		}
	}else{
		if( yPlus !== 0 ){
			this.setDirection(yPlus < 0 ? 8 : 2);
		}
	}
	
	// > 位置控制（起跳前，事件就已经处于目标位置）
	this._x += xPlus;
	this._y += yPlus;
	
	// > 常量（这部分参数不加入 公式 ）
    var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
    this._jumpPeak = 10 + distance - this._moveSpeed;
    this._jumpCount = this._jumpPeak * 2;
	
	// > 公式参数 - 初始化
	var data = this._drill_JSp;
	data['_data_inited'] = true;													//初始化
	data['_count'] = 0;																//起跳时间
	data['_orgX'] = Number(this._realX);											//起跳点x
	data['_orgY'] = Number(this._realY);											//起跳点y
	data['_realDistance'] = Math.abs(data['_orgX'] - this._x);						//抛物线距离
	data['_realHight'] = this.drill_JSp_maxJumpHeight() + Number(data['height']);	//抛物线高度
	
	if( data['time'] == -1 ){
		data['time'] = this._jumpCount / data['speed'];	
	}
	
	// > 行走图设为暂停状态
	this.resetStopCount();
	this.straighten();
}
//==============================
// * 跳跃 - 速度控制
//==============================
var _drill_JSp_updateJump = Game_CharacterBase.prototype.updateJump;
Game_CharacterBase.prototype.updateJump = function() {
	if( this._drill_JSp['enabled'] == true && this._drill_JSp['_data_inited'] == true ){
		this.drill_JSp_updateJump();
	}else{
		_drill_JSp_updateJump.call(this);
	}
};
Game_CharacterBase.prototype.drill_JSp_updateJump = function() {
	
	// > 时间
	var data = this._drill_JSp;
	data['_count'] += 1;
	
	// > 跳跃 - 直线位移公式
	if( data['level'] == 1 ){
		// > 匀速平移
		this._realX = data['_orgX'] + (this._x - data['_orgX']) * data['_count'] / data['time'];
		this._realY = data['_orgY'] + (this._y - data['_orgY']) * data['_count'] / data['time'];
	}else{
		// > 分段速度
		var x_vspeed = (this._x - data['_orgX']) / data['time'];
		var y_vspeed = (this._y - data['_orgY']) / data['time'];
		var p_time = data['time'] / data['level'];
		var p_count = data['_count'];
		var x_distance = 0;
		var y_distance = 0;
		for(var i= data['level']-1; i >=0 ; i--){
			var cur_x_speed = (i+1) * x_vspeed * 2 / (data['level']+1) ;	//当前段的速度
			var cur_y_speed = (i+1) * y_vspeed * 2 / (data['level']+1) ;
			//alert(cur_x_speed +","+x_vspeed);
			if( p_count > p_time ){
				x_distance += cur_x_speed * p_time;
				y_distance += cur_y_speed * p_time;
				p_count -= p_time;
			}else{
				x_distance += cur_x_speed * p_count;
				y_distance += cur_y_speed * p_count;
				break;
			}
		}
		this._realX = data['_orgX'] + x_distance;
		this._realY = data['_orgY'] + y_distance;
	}
	
	
	// > 跳跃 - y抛物线公式（curJumpHeight放在 jumpHeight()函数中被调用）
	if( data['level'] == 1 ){
		
		// > 单抛物线
		var a = -4*data['_realHight']/data['time']/data['time'];	//a = -4*h/d/d，b = 4*h/d，c = 0
		var b = 4*data['_realHight']/data['time'];
		var c = 0;
		this._drill_JSp_curJumpHeight = a*data['_count']*data['_count'] + b*data['_count'] + c ;
	}else{
		
		// > 多抛物线（平分时间）
		var p_time = Math.floor(data['time'] / data['level']);
		var p_height = data['_realHight'] / 2 * (data['time']-data['_count']) / data['time'];
		var p_count = data['_count'] % p_time;
		
		var a = -4*p_height/p_time/p_time;	//a = -4*h/d/d，b = 4*h/d，c = 0
		var b = 4*p_height/p_time;
		var c = 0;
		this._drill_JSp_curJumpHeight = a*p_count*p_count + b*p_count + c ;
	}
	
	// > 弹跳声音
	if( data['_count'] > 0 &&
		data['_count'] % Math.floor(data['time'] / data['level']) == 0 ){
		var se = DrillUp.g_JSp_se[ data['levelSound'] ];
		if( se != undefined ){
			SoundManager.drill_JSp_playSE( se, this );
		}
	}
	
	// > 刷新跳跃终点位置
	this.refreshBushDepth();
	if (data['_count'] >= data['time']) {
		this._jumpCount = 0;
		this._drill_JSp_curJumpHeight = 0;
		this._realX = this._x = $gameMap.roundX(this._x);
		this._realY = this._y = $gameMap.roundY(this._y);
	}
}
//==============================
// * 跳跃 - 获取实际高度
//==============================
var _drill_JSp_jumpHeight = Game_CharacterBase.prototype.jumpHeight;
Game_CharacterBase.prototype.jumpHeight = function() {
	
	// > 自动初始化
	if( this._drill_JSp == undefined ){ this.drill_JSp_initData(); }
	
	// > 返回高度值
	if( this._drill_JSp['enabled'] == true && this._drill_JSp['_data_inited'] == true ){
		return this._drill_JSp_curJumpHeight;
	}else{
		return _drill_JSp_jumpHeight.call(this);
	}
};
//==============================
// * 跳跃 - 获取最高高度
//==============================
Game_CharacterBase.prototype.drill_JSp_maxJumpHeight = function() {
	var count = this._jumpCount /2;
	var peakHeight = (this._jumpPeak * this._jumpPeak - Math.pow(Math.abs(count - this._jumpPeak), 2)) / 2;
	peakHeight -= (this._y - this._drill_JSp['_orgY'])/2;		//去掉斜向直线公式的干扰
	return peakHeight;
}

//==============================
// * 播放音效
//==============================
SoundManager.drill_JSp_playSE = function( fileName, character ){
	var se = {};
	se.name = fileName;
	se.pitch = 100;
	se.volume = 60;
	
	// > 【声音 - 事件的声音】适应声音距离化
	if( Imported.Drill_EventSound && AudioManager.drill_ESo_playCharacterSe != undefined ){
		AudioManager.drill_ESo_playCharacterSe(se,character);
	}else{
		AudioManager.playSe(se);
	}
};




