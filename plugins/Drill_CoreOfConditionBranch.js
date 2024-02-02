//=============================================================================
// Drill_CoreOfConditionBranch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        系统 - 分支条件核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfConditionBranch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件用于管理分支条件的指令，防止部分错误的指令拖慢游戏速度。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 该插件为基础核心，可以作用于下列插件。
 * 作用于：
 *   - Drill_EventSelfSwitch     物体-独立开关
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于事件指令。
 * 细节：
 *   (1.分支条件会返回一个布尔值，分别为true和false（是和否），
 *      表示满足条件的分支和不满足条件的分支。
 * 设计：
 *   (1.分支条件核心提供了自定义的分支条件文本指令。
 *      你可以写批量开关、批量变量的判断语句。
 *      避免了默认情况下过多条件导致分支条件语句大量嵌套的麻烦。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 分支条件
 * 你可以将下面的指令写到分支条件脚本中：
 * 
 * 分支条件：>分支条件:如果开关[21]:为ON
 * 分支条件：>分支条件:如果开关[21]:为OFF
 * 分支条件：>分支条件:如果开关[21]:等于开关[22]
 * 分支条件：>分支条件:如果批量开关[21,22]:为ON
 * 分支条件：>分支条件:如果批量开关[21,22]:为OFF
 * 分支条件：>分支条件:如果批量开关[21,22]:等于开关[23]
 * 
 * 分支条件：>分支条件:如果变量[21]:大于或等于[10]
 * 分支条件：>分支条件:如果变量[21]:小于或等于[10]
 * 分支条件：>分支条件:如果变量[21]:等于[10]
 * 分支条件：>分支条件:如果变量[21]:大于[10]
 * 分支条件：>分支条件:如果变量[21]:小于[10]
 * 分支条件：>分支条件:如果变量[21]:大于或等于变量[22]
 * 分支条件：>分支条件:如果变量[21]:小于或等于变量[22]
 * 分支条件：>分支条件:如果变量[21]:等于变量[22]
 * 分支条件：>分支条件:如果变量[21]:大于变量[22]
 * 分支条件：>分支条件:如果变量[21]:小于变量[22]
 * 分支条件：>分支条件:如果批量变量[21,22]:大于或等于[10]
 * 分支条件：>分支条件:如果批量变量[21,22]:小于或等于[10]
 * 分支条件：>分支条件:如果批量变量[21,22]:等于[10]
 * 分支条件：>分支条件:如果批量变量[21,22]:大于[10]
 * 分支条件：>分支条件:如果批量变量[21,22]:小于[10]
 * 分支条件：>分支条件:如果批量变量[21,22]:大于或等于变量[23]
 * 分支条件：>分支条件:如果批量变量[21,22]:小于或等于变量[23]
 * 分支条件：>分支条件:如果批量变量[21,22]:等于变量[23]
 * 分支条件：>分支条件:如果批量变量[21,22]:大于变量[23]
 * 分支条件：>分支条件:如果批量变量[21,22]:小于变量[23]
 * 
 * 1."批量变量[21,22]:等于[10]" 表示涉及的变量必须全部满足条件才能通过分支。
 *   只要有一个变量不等于10，就会进入到 不通过的分支。
 * 2.如果你想写 开关21和22 分别为 开开、开关、关开、关关 的分支条件，
 *   通过上述分支条件指令无法实现，因为分支条件最多只能分出两个分支。
 *   最好直接写两层嵌套的分支条件，第一层判断 开关21，第二层判断 开关22。
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
 * 测试方法：   去各个管理层跑一圈测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 测试方法2：  去战斗界面测试。
 * 测试结果2：  战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只为单次执行，且执行的功能与if相似，所以消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COCB (Core_Of_Condition_Branch)
//		临时全局变量	DrillUp.g_COCB_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	机关管理层
//		★性能测试消耗	11.4ms（drill_COCB_conditionCommand）
//		★最坏情况		无
//		★备注			
//		
//		★优化记录		无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//
//			->☆分支指令
//			->☆分支指令（执行）
//
//			->☆开关判断
//			->☆变量判断
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//
//		★核心说明：
//			1.核心中含有 标准接口/标准函数 ，这是其它子插件的底座，无论核心内容怎么变，标准接口一定不能动。
//			2.最后决定了语句格式：">独立开关:如果开关[10]:为ON"。
//			  ">独立开关:开关[A]:为ON时"与时机、触发的格式有冲突。
//			  ">独立开关:开关[A]:是否为ON"语句不通顺。
//		
//		★必要注意事项：
//			暂无
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
	DrillUp.g_COCB_PluginTip_curName = "Drill_CoreOfConditionBranch.js 系统-分支条件核心";
	DrillUp.g_COCB_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 日志 - 不识别脚本
	//==============================
	DrillUp.drill_COCB_getPluginTip_UnknownScript = function( script_text ){
		return "【" + DrillUp.g_COCB_PluginTip_curName + "】\n不能识别脚本：\""+script_text+"\"。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfConditionBranch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfConditionBranch');
	
	
	
//#############################################################################
// ** ☆分支指令
//#############################################################################
//##############################
// * 分支指令 - 执行指令【标准接口】
//				
//			参数：	> command 字符串   （当前的指令）
//					> args 字符串列表  （当前的参数列表）
//			返回：	> 无
//					
//			说明：	> 与插件指令类似，执行分支条件指令，但注意需要执行提交判定语句后才能跳出。
//			示例：	> 具体应用，可见后面代码：开关判断、变量判断，也可见插件：物体-独立开关
//##############################
Game_Interpreter.prototype.drill_COCB_conditionCommand = function( command, args ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 分支指令 - 提交判定【标准函数】
//
//			参数：	> result 布尔（判断后的布尔值）
//			返回：	> 无
//					
//			说明：	> 此函数只在 执行指令时 有效。
//##############################
Game_Interpreter.prototype.drill_COCB_conditionSubmit = function( result ){
	if( result ){
		this._drill_COCB_result = true;
	}else{
		this._drill_COCB_result = false;
	}
}


//=============================================================================
// ** ☆分支指令（执行）
//
//			说明：	> 该部分管理 eval字符串转分支结果 的阶段，需要拦截部分错误指令。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 分支指令 - 临时全局变量
//==============================
DrillUp.g_COCB_errorMsgTank = [];		//（脚本拦截容器）
//==============================
// * 分支指令 - 添加拦截的指令
//==============================
DrillUp.drill_COCB_addScript = function( temp_script ){
	var message = DrillUp.drill_COCB_getPluginTip_UnknownScript( temp_script );
	if( DrillUp.g_COCB_errorMsgTank.indexOf(message) == -1 ){
		DrillUp.g_COCB_errorMsgTank.push(message);
		console.log("%c" + message, "color:#f67; font-size:14px;");	//（通过Console输出拦截信息）
	}
};
//==============================
// * 分支指令 - 执行事件指令
//==============================
var _drill_COCB_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function(){
	
	// > 拦截脚本的情况
	//		（注意，执行了这条指令之后，分支条件一定要赋值，不管是 true还是false，都需要赋值）
    var param = this._params[0];
	if( param == 12 ){
		var temp_script = String(this._params[1]);
		var result = false;
		
		// > 阻止 ">xxx"
		if( temp_script.substr(0,1) == ">" ){
			var args = temp_script.split(/[ :：]+/);
			var command = args.shift();
			
			// > 准备参数
			this._drill_COCB_result = false;
			
			
			// > 执行 子函数
			this.drill_COCB_conditionCommand( command, args );
			
			
			// > 销毁参数
			result = this._drill_COCB_result;
			this._drill_COCB_result = undefined;
			
			
		// > 阻止 "没有括号的函数"
		}else if( temp_script.indexOf("=") == -1 && ( temp_script.indexOf("(") == -1 || temp_script.indexOf(")") == -1 ) ){
			DrillUp.drill_COCB_addScript( temp_script );
			result = false;
			
			
		// > 正常脚本判断
		}else{
			result = !!eval(this._params[1]);
		}
		
		
		// > 分支条件赋值
		this._branch[this._indent] = result;
		if( this._branch[this._indent] === false ){
			this.skipBranch();
		}
		return true;
	}
	
	// > 原函数
	return _drill_COCB_command111.call( this );
};



//=============================================================================
// ** ☆开关判断
//
//			说明：	> 此模块提供 开关的判断。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_COCB_switch_conditionCommand = Game_Interpreter.prototype.drill_COCB_conditionCommand;
Game_Interpreter.prototype.drill_COCB_conditionCommand = function( command, args ){
	_drill_COCB_switch_conditionCommand.call( this, command, args );
	if( command === ">分支条件" ){		//>分支条件:如果开关[21]:为ON
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			
			/*-----------------对象组获取------------------*/
			var id_list = null;
			if( id_list == null && temp1.indexOf("如果开关[") != -1 ){
				temp1 = temp1.replace("如果开关[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				id_list = [];
				id_list.push( temp1 );
			}
			if( id_list == null && temp1.indexOf("如果批量开关[") != -1 ){
				temp1 = temp1.replace("如果批量开关[","");
				temp1 = temp1.replace("]","");
				id_list = [];
				var temp_arr = temp1.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var id = Number(temp_arr[k]);
					id_list.push( id );
				}
			}
			if( id_list == null ){ return; }
			
			/*-----------------判定------------------*/
			if( temp2 == "为ON" ){
				var passed = true;
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameSwitches.value( id_list[i] );
					if( cur_value != true ){	//（只要有一个不满足，则不通过）
						passed = false
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2 == "为OFF" ){
				var passed = true;
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameSwitches.value( id_list[i] );
					if( cur_value != false ){	//（只要有一个不满足，则不通过）
						passed = false
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("等于开关[") != -1 ){
				temp2 = temp2.replace("等于开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				var tar_value = $gameSwitches.value( temp2 );
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameSwitches.value( id_list[i] );
					if( cur_value != tar_value ){	//（只要有一个不满足，则不通过）
						passed = false
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
		}
	}
}


//=============================================================================
// ** ☆变量判断
//
//			说明：	> 此模块提供 变量的判断。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_COCB_variable_conditionCommand = Game_Interpreter.prototype.drill_COCB_conditionCommand;
Game_Interpreter.prototype.drill_COCB_conditionCommand = function( command, args ){
	_drill_COCB_variable_conditionCommand.call( this, command, args );
	if( command === ">分支条件" ){		//>分支条件:如果变量[21]:大于或等于[10]
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			
			/*-----------------对象组获取------------------*/
			var id_list = null;
			if( id_list == null && temp1.indexOf("如果变量[") != -1 ){
				temp1 = temp1.replace("如果变量[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				id_list = [];
				id_list.push( temp1 );
			}
			if( id_list == null && temp1.indexOf("如果批量变量[") != -1 ){
				temp1 = temp1.replace("如果批量变量[","");
				temp1 = temp1.replace("]","");
				id_list = [];
				var temp_arr = temp1.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var id = Number(temp_arr[k]);
					id_list.push( id );
				}
			}
			if( id_list == null ){ return; }
			
			/*-----------------判定------------------*/
			if( temp2.indexOf("大于或等于[") != -1 ){
				temp2 = temp2.replace("大于或等于[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value < temp2 ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("小于或等于[") != -1 ){
				temp2 = temp2.replace("小于或等于[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value > temp2 ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("等于[") != -1 ){
				temp2 = temp2.replace("等于[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value != temp2 ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("大于[") != -1 ){
				temp2 = temp2.replace("大于[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value <= temp2 ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("小于[") != -1 ){
				temp2 = temp2.replace("小于[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value >= temp2 ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			
			if( temp2.indexOf("大于或等于变量[") != -1 ){
				temp2 = temp2.replace("大于或等于变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				var tar_value = $gameVariables.value( temp2 );
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value < tar_value ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("小于或等于变量[") != -1 ){
				temp2 = temp2.replace("小于或等于变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				var tar_value = $gameVariables.value( temp2 );
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value > tar_value ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("等于变量[") != -1 ){
				temp2 = temp2.replace("等于变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				var tar_value = $gameVariables.value( temp2 );
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value != tar_value ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("大于变量[") != -1 ){
				temp2 = temp2.replace("大于变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				var tar_value = $gameVariables.value( temp2 );
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value <= tar_value ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
			if( temp2.indexOf("小于变量[") != -1 ){
				temp2 = temp2.replace("小于变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var passed = true;
				var tar_value = $gameVariables.value( temp2 );
				for(var i = 0; i < id_list.length; i++){
					var cur_value = $gameVariables.value( id_list[i] );
					if( cur_value >= tar_value ){	//（只要有一个不满足，则不通过）
						passed = false;
						break;
					}
				}
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
		}
	}
}
