//=============================================================================
// Drill_EventText.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        行走图 - 事件漂浮文字
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventText +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置一个一直跟随行走图的漂浮文字，并且支持特殊字符。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，还可以被其他插件扩展使用。
 * 被扩展：
 *   - Drill_X_EventTextFilter     行走图-事件漂浮文字的滤镜效果[扩展]
 *     该插件能给事件的漂浮文字添加滤镜效果。
 *   - Drill_X_EventTextBackground 行走图-事件漂浮文字的背景[扩展]
 *     该插件能给事件的漂浮文字添加背景。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效，放置在 地图上层 。
 * 漂浮文字：
 *   (1.你可以通过换事件页，来切换头顶的漂浮文字。
 *      你可以使用变量等特殊字符，但是变量的变动不会主动刷新漂浮文字。
 *   (2.显示出来的文字不能包含 英文空格 ，但是可以包含中文空格。
 *   (3.你可以在文本中加入各种特殊字符：
 *       \c[n] 变颜色    \i[n] 显示图标    \{ \} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      更多的特殊字符，可以去看看插件：对话框 - 消息核心。
 *      如果你想控制图标大小，去看看：对话框 - 特殊字符大小控制器
 *   (4.字符串中可以使用\V[n]变量，但是注释指令不会刷新变量值，
 *      需要用插件指令执行，才会刷新值。
 * 位置：
 *   (1.漂浮位置固定在事件上方24像素的位置，你可以根据需要，对文字进行
 *      位置偏移调整。
 *   (2.事件变形、位移时，漂浮文字会一直跟着事件。
 *   (3.你还可以设置文本左对齐/居中/右对齐。
 * 外框：
 *   (1.漂浮位置默认都带有外框，你可以设置显示或者隐藏。
 *      外框的皮肤与窗口皮肤一样。
 *   (2.漂浮文字的地图层级固定为 上层 ，图片层级为100。
 *      比如上层且图片层级大于100的地图背景，可以挡住漂浮文字，反之则
 *      在文字下面。
 * 设计：
 *   (1.你可以给漂浮文字添加高级文本色或者设置带框，来突出某些重要的npc。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 事件中，添加注释，在注释中填入以下指令：
 *（中英文冒号都可以,旧注释冒号左右不能有空格,标准注释左右都有一空格。）
 *
 * 事件注释：=>事件漂浮文字 : 这是一串被显示出来的文字
 * 事件注释：=>事件漂浮文字 : 这是一串被显示出来的文字 : 201
 * 事件注释：=>事件漂浮文字 : 偏移 : 5 : -5
 * 事件注释：=>事件漂浮文字 : 外框 : 显示
 * 事件注释：=>事件漂浮文字 : 外框 : 隐藏
 * 事件注释：=>事件漂浮文字 : 对齐方式 : 左对齐
 * 事件注释：=>事件漂浮文字 : 对齐方式 : 居中
 * 事件注释：=>事件漂浮文字 : 对齐方式 : 右对齐
 *
 * 事件注释(旧)：事件漂浮文字:这是一串被显示出来的文字
 * 事件注释(旧)：事件漂浮文字:偏移:5:-5
 * 事件注释(旧)：事件漂浮文字:外框:显示
 * 事件注释(旧)：事件漂浮文字:外框:隐藏
 * 事件注释(旧)：事件漂浮文字:对齐方式:左对齐
 * 事件注释(旧)：事件漂浮文字:对齐方式:居中
 * 事件注释(旧)：事件漂浮文字:对齐方式:右对齐
 *
 * 1.冒号后面的数字表示颜色，可以填rmmv默认的0-31。
 *   也可以填高级颜色编号，这个数字和特殊字符\c[4]的效果是一样的。
 * 2.显示出来的文字不能包含 英文空格 ，但是可以包含中文空格。
 * 3.你可以通过特殊字符使得文字变大变小，可以与偏移设置一起用。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令强制修改事件的漂浮文字：
 * 
 * 插件指令：>事件漂浮文字 : 本事件 : 修改文本 : 这是一串修改的文字
 * 插件指令：>事件漂浮文字 : 事件[10] : 修改文本 : 这是一串修改的文字
 * 插件指令：>事件漂浮文字 : 事件变量[10] : 修改文本 : 这是一串修改的文字
 * 
 * 插件指令：>事件漂浮文字 : 本事件 : 修改文本 : 这是一串修改的文字
 * 插件指令：>事件漂浮文字 : 本事件 : 设置偏移 : 5 : -5
 * 插件指令：>事件漂浮文字 : 本事件 : 设置偏移(变量) : 5 : -5
 * 插件指令：>事件漂浮文字 : 本事件 : 外框 : 显示
 * 插件指令：>事件漂浮文字 : 本事件 : 外框 : 隐藏
 * 插件指令：>事件漂浮文字 : 本事件 : 对齐方式 : 左对齐
 * 插件指令：>事件漂浮文字 : 本事件 : 对齐方式 : 居中
 * 插件指令：>事件漂浮文字 : 本事件 : 对齐方式 : 右对齐
 * 
 * 1.你可以指定某个事件"事件[n]"，或者变量对应的事件id号"事件变量[n]"。
 * 2.字符串中可以使用\V[n]变量，但是注释指令不会刷新变量值，需要用插件
 *   指令执行，才会刷新值。
 * 3.修改的文本离开当前地图后将失效。
 * 4.显示出来的文字不能包含 英文空格 ，但是可以包含中文空格。
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
 * 测试方法：   去物体管理层、地理管理层、鼠标管理层转一圈测试就可以了。
 * 测试结果：   200个事件的地图中，消耗为：【32.48ms】
 *              100个事件的地图中，消耗为：【21.73ms】
 *               50个事件的地图中，消耗为：【10.55ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.v1.3版本之后优化了结构，事件需要时才自动创建，减少了消耗。
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
 * 添加了修改漂浮文字的插件指令设置。
 * 该版本解决了需要时创建的bug，已固定为需要时自动创建。
 * [v1.4]
 * 添加了漂浮文字外框显示隐藏的功能。
 * [v1.5]
 * 添加了对齐方式。
 * [v1.6]
 * 修复了复制事件时，五毛特效 效果会多次叠加的bug。
 * 
 * 
 * 
 * @param 图片层级
 * @type number
 * @min 1
 * @desc 所有漂浮文字都放置在 地图上层 ， 且都处于该图片层级。
 * @default 100
 *
 * @param 默认字体大小
 * @type number
 * @min 1
 * @desc 漂浮文字默认的字体大小。
 * @default 18
 * 
 * @param 默认对齐方式
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 默认文本的对齐方式。
 * @default 居中
 *
 * @param 默认是否显示外框
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 显示漂浮文字的外框背景。
 * @default false
 *
 * @param 内边距
 * @parent 默认是否显示外框
 * @type number
 * @min 1
 * @desc 漂浮文字框的内边距。
 * @default 4
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ET（Event_Text）
//		临时全局变量	DrillUp.g_ET_xxx
//		临时局部变量	this._drill_ET_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理)	每帧
//		性能测试因素	乱跑
//		性能测试消耗	全创建（44.70ms） 自动创建（10.55ms）
//		最坏情况		镜头内出现大量含有窗口的事件，并且随时都在更换文字。
//		备注			1.我不太相信这个消耗那么少，很可能计算量都转移到了图像处理上。
//						2.不确定是否优化成功了，不过消耗量的确是降了。
//
//插件记录：
//		★大体框架与功能如下：
//			事件漂浮文字：
//				->跟随文字
//				->可替换字符
//				->根据字符长宽变化窗口大小
//				->贴图优化，用到的时候才new
//				->插件指令添加/修改漂浮文字
//				->漂浮文字偏移的位置
//
//		★私有类如下：
//			* Drill_ET_WindowSprite【漂浮文字贴图】
//				与事件一对一，与事件行走图没有关系。
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【重刷容器】。
//			3.完美获取字符宽度： drawTextEx()的返回值（这里的函数调了两次，第一次是为计算，第二次是为画）
//			  完美获取字符高度： calcTextHeight()的返回值（必须组装临时textState使用）
//			  由于rmmv是边画边算，需要的东西缠绕在一起，所以只能跟着绕。
//			4.事件容器每次都会重新统计，新事件加入时，【只要加了注释或者定义了插件指令，就能捕获到】，不要考虑太多，把自己绕晕。
//			
//		★其它说明细节：
//			1.window把一个子sprite的bitmap，强制称呼为contents。同时定义了contentsOpacity，区别于窗口本身的opacity。
//				this.createContents();	实际为 new bitmap
//				this.contents.clear();	实际为 bitmap 清除画面（长宽不变）
//			  要重设bitmap，只能new bitmap，重新createContents()。
//			2.经过优化，贴图用到的时候才new，但是由于_init写在object里面，在spriteset_map刷新的时候，object也要刷。
//			  object在进入菜单后是不刷的，但是贴图会刷。
//			3.事件初始化要放在initialize前面。
//			  另外，只有事件才有 this._drill_ET 数据字段。
//			4. 2020/8/15
//				重新整理了一下漂浮文字贴图的结构。
//				整体结构为 事件容器 + 窗口绘制文字 ，虽然结构清晰简单，但是以前是在探索阶段，留下了不少代码旧坑。
//				过去该插件bug修复的次数较多，其中有很多细微的关联，只要一去掉，就会丢失功能。不过这里都标注清楚了。
//				
//		★存在的问题：
//			1.循环地图中，如果在地图边界徘徊，文字变化和滤镜会被累加。 （2021-7-5 此问题似乎已被解决，"创建新的漂浮文字"结构修改之后，问题似乎不见了）
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventText = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventText');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_ET_layer = Number(DrillUp.parameters["图片层级"] || 100); 
	DrillUp.g_ET_fontSize = Number(DrillUp.parameters["默认字体大小"] || 18); 
	DrillUp.g_ET_frame_visible = String(DrillUp.parameters["默认是否显示外框"] || "false") === "true";	
	DrillUp.g_ET_align = String(DrillUp.parameters["默认对齐方式"] || "居中");	
	DrillUp.g_ET_padding = Number(DrillUp.parameters["内边距"] || 4); 
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_ET_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ET_pluginCommand.call(this, command, args);
	if( command === ">事件漂浮文字" ){
		/*-----------------修改文本------------------*/
		if( args.length == 6 ){ 	//	>事件漂浮文字 : 本事件 : 修改文本 : 这是一串字符
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var e_id = null;
			
			if( temp1 == "本事件" ){
				e_id = this._eventId;
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				e_id = Number(temp1);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				e_id = $gameVariables.value(Number(temp1));
			}
			
			if( e_id && type == "修改文本" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				$gameMap.event(e_id)._drill_ET['_enabled'] = true;
				$gameMap.event(e_id)._drill_ET['_text'] = temp3;
				$gameMap.event(e_id)._drill_ET['_forceRefresh'] = true;
				$gameTemp._drill_ET_needRefresh = true;
			}
			if( e_id && type == "外框" ){
				if( temp3 == "显示" ){
					if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
					$gameMap.event(e_id)._drill_ET['_frameVisible'] = true;
					$gameTemp._drill_ET_needRefresh = true;
				}
				if( temp3 == "隐藏" ){
					if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
					$gameMap.event(e_id)._drill_ET['_frameVisible'] = false;
					$gameTemp._drill_ET_needRefresh = true;
				}
			}
			if( e_id && type == "对齐方式" ){
				if( temp3 == "左对齐" || temp3 == "居中" || temp3 == "右对齐" ){
					if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
					$gameMap.event(e_id)._drill_ET['_align'] = temp3;
					$gameMap.event(e_id)._drill_ET['_forceRefresh'] = true;
					$gameTemp._drill_ET_needRefresh = true;
				}
			}
			
		}
		/*-----------------偏移------------------*/
		if( args.length == 8 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp3 = Number(args[5]);
			var temp4 = Number(args[7]);
			var e_id = null;
			
			if( temp1 == "本事件" ){
				e_id = this._eventId;
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				e_id = Number(temp1);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				e_id = $gameVariables.value(Number(temp1));
			}
			if( e_id && type == "设置偏移" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				$gameMap.event(e_id)._drill_ET['_enabled'] = true;
				$gameMap.event(e_id)._drill_ET['_x'] = temp3;
				$gameMap.event(e_id)._drill_ET['_y'] = temp4;
				$gameMap.event(e_id)._drill_ET['_forceRefresh'] = true;		//（地图管理层，偏移时，刷一下）
				$gameTemp._drill_ET_needRefresh = true;
			}
			if( e_id && type == "设置偏移(变量)" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				$gameMap.event(e_id)._drill_ET['_enabled'] = true;
				$gameMap.event(e_id)._drill_ET['_x'] = $gameVariables.value(temp3);
				$gameMap.event(e_id)._drill_ET['_y'] = $gameVariables.value(temp4);
				$gameMap.event(e_id)._drill_ET['_forceRefresh'] = true;
				$gameTemp._drill_ET_needRefresh = true;
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ET_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventText.js 行走图 - 事件漂浮文字】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 初始化
//=============================================================================
//==============================
// * 物体初始化
//==============================
var _drill_ET_c_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
	this._drill_ET = {};
	this._drill_ET['_enabled'] = false;								//默认关闭
	this._drill_ET['_text'] = "";									//文本
	this._drill_ET['_align'] = DrillUp.g_ET_align;					//对齐方式
	this._drill_ET['_x'] = 0;										//偏移x
	this._drill_ET['_y'] = 0;										//偏移y
	this._drill_ET['_frameVisible'] = DrillUp.g_ET_frame_visible;	//外框显示
	this._drill_ET['_forceRefresh'] = false;						//刷新文本
	_drill_ET_c_initialize.call(this,mapId, eventId);
}
//==============================
// * 事件初始化
//==============================
var _drill_ET_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_ET_c_setupPageSettings.call(this);
	this.drill_ET_refreshText();
}
Game_Event.prototype.drill_ET_refreshText = function() {
	
	this._drill_ET['_text'] = "";
	this._drill_ET['_x'] = 0;
	this._drill_ET['_y'] = 0;
	
	var page = this.page();
    if( page ){
		this.list().forEach( function(l){
			if( l.code === 108 ){
				
				/*-----------------旧注释------------------*/
				var comment = l.parameters[0].split(/[:：]/);
				if (comment[0].toLowerCase() === "事件漂浮文字"){
					if( comment.length == 2 ){
						this._drill_ET['_enabled'] = true;
						this._drill_ET['_text'] = String(comment[1]);
						$gameTemp._drill_ET_needRefresh = true;
					}
					if( comment.length == 4 && comment[1] == "偏移" ){
						this._drill_ET['_enabled'] = true;
						this._drill_ET['_x'] = Number(comment[2]);
						this._drill_ET['_y'] = Number(comment[3]);
						$gameTemp._drill_ET_needRefresh = true;
					}
					if( comment.length == 3 && comment[1] == "外框" ){
						if( comment[2] == "显示" ){
							this._drill_ET['_frameVisible'] = true;
							$gameTemp._drill_ET_needRefresh = true;
						}
						if( comment[2] == "隐藏" ){
							this._drill_ET['_frameVisible'] = false;
							$gameTemp._drill_ET_needRefresh = true;
						}
					}
					if( comment.length == 3 && comment[1] == "对齐方式" ){
						if( comment[2] == "左对齐" || comment[2] == "居中" || comment[2] == "右对齐" ){
							this._drill_ET['_align'] = comment[2];
							$gameTemp._drill_ET_needRefresh = true;
						}
					}
				};
				
				/*-----------------标准注释------------------*/
				var args = l.parameters[0].split(/[ ]+/);	
				var command = args.shift();
				if (command == "=>事件漂浮文字" ){
					if( args.length == 2 ){
						this._drill_ET['_enabled'] = true;
						this._drill_ET['_text'] = String(args[1]);
						$gameTemp._drill_ET_needRefresh = true;
					}
					if( args.length == 4 ){
						var temp1 = String(args[1]);
						var temp2 = String(args[3]);
						if( temp1 == "外框" ){
							if( temp2 == "显示" ){
								this._drill_ET['_frameVisible'] = true;
								$gameTemp._drill_ET_needRefresh = true;
							}
							if( temp2 == "隐藏" ){
								this._drill_ET['_frameVisible'] = false;
								$gameTemp._drill_ET_needRefresh = true;
							}
						}else if( temp1 == "对齐方式" ){
							if( temp2 == "左对齐" || temp2 == "居中" || temp2 == "右对齐" ){
								this._drill_ET['_align'] = temp2;
								$gameTemp._drill_ET_needRefresh = true;
							}
						}else{
							this._drill_ET['_enabled'] = true;
							this._drill_ET['_text'] = "\\c["+ temp2 + "]" + temp1;
							$gameTemp._drill_ET_needRefresh = true;
						}
					}
					if( args.length == 6 ){
						var temp1 = String(args[1]);
						var temp2 = Number(args[3]);
						var temp3 = Number(args[5]);
						if( temp1 == "偏移" ){
							this._drill_ET['_enabled'] = true;
							this._drill_ET['_x'] = temp2;
							this._drill_ET['_y'] = temp3;
							$gameTemp._drill_ET_needRefresh = true;
						}
					}
				};  
			};
		}, this);
    }
}


//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_ET_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_ET_temp_initialize.call(this);
	this._drill_ET_textEvents = [];			//含漂浮文字的事件
	this._drill_ET_needRefresh = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_ET_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_ET_textEvents = [];	//含漂浮文字的事件
	$gameTemp._drill_ET_needRefresh = true;
	_drill_ET_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_ET_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_ET_textEvents = [];
	$gameTemp._drill_ET_needRefresh = true;
	_drill_ET_smap_createCharacters.call(this);
}
//==============================
// ** 容器 - 帧刷新
//==============================
var _drill_ET_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_ET_map_update.call(this,sceneActive);
	
	this.drill_ET_refreshEventChecks();
};
//==============================
// ** 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_ET_refreshEventChecks = function() {
	if( !$gameTemp._drill_ET_needRefresh ){ return }
	$gameTemp._drill_ET_needRefresh = false;
	
	var events = this.events();
	$gameTemp._drill_ET_textEvents = [];			//容器中的事件，只增不减，除非清零
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		if( temp_event._drill_ET['_enabled'] == true ){
			$gameTemp._drill_ET_textEvents.push(temp_event);
		}
	}
}


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_ET_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_ET_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Spriteset_Map.prototype.drill_ET_sortByZIndex = function() {
	this._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};


//=============================================================================
// ** 地图绘制层 控制（需要用的时候才初始化）
//=============================================================================
//==============================
// * 层级初始化
//==============================
var _drill_ET_s_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_ET_s_createDestination.call(this);
	this.drill_ET_create();	
}
Spriteset_Map.prototype.drill_ET_create = function() {
	this._drill_ET_textLayer = new Sprite();
	this._drill_ET_textLayer.zIndex = DrillUp.g_ET_layer;
	this._drill_ET_spriteTank = [];			//漂浮文字贴图集合
	this._drill_ET_eventCount = 0;			//事件数量变化监听
	
	this._drill_mapUpArea.addChild(this._drill_ET_textLayer);
	this.drill_ET_sortByZIndex();		//排序
}

//==============================
// * 帧刷新 - 添加漂浮文字
//==============================
var _drill_ET_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_drill_ET_update.call(this);
	this.drill_ET_updateNewEventText();
}
Spriteset_Map.prototype.drill_ET_updateNewEventText = function(){
	var e_tank = $gameTemp._drill_ET_textEvents;
	
	// > 事件数量变化监听
	if( this._drill_ET_eventCount == e_tank.length ){ return; }		//（事件只增不减，以此来控制贴图数量）
	if( this._drill_ET_eventCount > e_tank.length ){ return; }		//异常情况（目前不会出现，如果出现，则需要remove所有的文字，重新添加）
	this._drill_ET_eventCount = e_tank.length;
	
	// > 创建新的漂浮文字（没有贴图时，创建贴图）
	for(var i = 0; i < e_tank.length; i++ ){		
		var temp_event = e_tank[i];
		var temp_sprite = this.drill_ET_getSpriteByEvent( temp_event );
		if( temp_sprite == undefined ){
			this.drill_ET_createWindowSprite( temp_event );
		}
	}
}
//==============================
// * 获取 - 获取漂浮文字贴图（根据事件对象）
//==============================
Spriteset_Map.prototype.drill_ET_getSpriteByEvent = function( ev ){
	if( ev == undefined ){ return null; }
	for(var j = 0; j < this._drill_ET_spriteTank.length; j++ ){
		var temp_sprite = this._drill_ET_spriteTank[j];
		if( temp_sprite['_drill_event'] == ev ){
			return temp_sprite;
		}
	}
	return null;
}
//==============================
// * 创建 - 文字贴图（单独分离该函数，便于扩展）
//==============================
Spriteset_Map.prototype.drill_ET_createWindowSprite = function( ev ){
	if( ev == undefined ){ return }
	var new_sprite = new Drill_ET_WindowSprite( ev );
	this._drill_ET_spriteTank.push(new_sprite);
	this._drill_ET_textLayer.addChild(new_sprite);
}


//=============================================================================
// ** 漂浮文字贴图【Drill_ET_WindowSprite】
//		
//=============================================================================
//==============================
// * 文字贴图 - 定义
//==============================
function Drill_ET_WindowSprite() {
    this.initialize.apply(this, arguments);
};
Drill_ET_WindowSprite.prototype = Object.create(Window_Base.prototype);
Drill_ET_WindowSprite.prototype.constructor = Drill_ET_WindowSprite;
//==============================
// * 文字贴图 - 初始化
//==============================
Drill_ET_WindowSprite.prototype.initialize = function( obj_event ){
	this['_drill_event'] = obj_event;		//事件指针
	this['_character'] = obj_event;			//事件指针（子类用，Drill_X_EventTextFilter、Drill_X_EventTextBackground等）
    Window_Base.prototype.initialize.call(this);
	
	this.drill_initSprite();			//初始化对象
}
//==============================
// * 文字贴图 - 帧刷新
//==============================
Drill_ET_WindowSprite.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	if( this['_drill_event'] == undefined ){ return; } 
	this.drill_ET_updateText();			//文本变化
	this.drill_ET_updatePos();			//位置变化
	this.drill_ET_updateOpacity();		//透明度变化
}
//==============================
// * 文字贴图 - 属性
//==============================
Drill_ET_WindowSprite.prototype.standardFontSize = function(){ return DrillUp.g_ET_fontSize; };
Drill_ET_WindowSprite.prototype.standardPadding = function(){ return DrillUp.g_ET_padding; };
//==============================
// * 初始化 - 对象
//==============================
Drill_ET_WindowSprite.prototype.drill_initSprite = function() {
	
	// > 私有对象初始化
	this._drill_width = 0;					//窗口宽度
	this._drill_height = 0;					//窗口高度
	this._drill_curText = "";				//当前文本
	this._drill_fix_x = 0;					//对齐方式偏移x
	this._drill_fix_y = 0;					//对齐方式偏移y
	
	// > 主体属性
	this.opacity = 0;
	this.contents.opacity = 255;
};
//==============================
// * 帧刷新 - 文本变化
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_updateText = function() {
	var data_ET = this['_drill_event']._drill_ET;
	
	// > 事件去除后
	if( this['_drill_event']._erased ){
		if( this._drill_curText != "" ){
			this._drill_curText = "";
			this.contents.clear();
		}
		return ;
	}
	
	// > 事件属性刷新 锁
	if( data_ET['_forceRefresh'] == true || this._drill_curText != String(data_ET['_text']) ){
		data_ET['_forceRefresh'] = false;

		this._drill_curText = String(data_ET['_text']);	
			
		// > 确定宽高
		var x = this.standardPadding();
		var y = this.standardPadding();
		var textState = { 'index': 0, 'x': x, 'y': y, 'left': x };
		textState.text = this.convertEscapeCharacters( String(this._drill_curText) );
		textState.height = this.calcTextHeight(textState, false);
		
		this._drill_height = textState.height + this.standardPadding() * 2;
		this._drill_width = this.drawTextEx(this._drill_curText,0,0) + this.standardPadding() * 2 ;
		
		this.width = this._drill_width + 4;		//稍微多几像素的空间
		this.height = this._drill_height + 2;
		
		// > 重建bitmap
		this.createContents();
		
		// > 绘制内容
		this.drawTextEx(this._drill_curText,0,0);
		
		// > 对齐方式
		if( data_ET['_align'] == "左对齐" ){
			this._drill_fix_x = 0 ;
			this._drill_fix_y = -0.5 * this.height ;
		}else if( data_ET['_align'] == "居中" ){
			this._drill_fix_x = -0.5 * this.width ;
			this._drill_fix_y = -0.5 * this.height ;
		}else if( data_ET['_align'] == "右对齐" ){
			this._drill_fix_x = -1.0 * this.width ;
			this._drill_fix_y = -0.5 * this.height ;
		}
	}
}

//==============================
// * 帧刷新 - 位置变化
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_updatePos = function() {
	var data_ET = this['_drill_event']._drill_ET;
	
	// > 位置
	var org_x = this['_drill_event'].screenX();
	var org_y = this['_drill_event'].screenY() - $gameMap.tileHeight();
	this.x = org_x + data_ET['_x'] + this._drill_fix_x;
	this.y = org_y + data_ET['_y'] + this._drill_fix_y;
	
}
//==============================
// * 帧刷新 - 透明度变化
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_updateOpacity = function() {
	var data_ET = this['_drill_event']._drill_ET;
	
	// > 可见
	this.visible = !this['_drill_event']._transparent;
	
	// > 透明度
	var oo = Number( this['_drill_event'].opacity() );
	if( data_ET['_frameVisible'] == true ){
		this.opacity = oo;
	}else{
		this.opacity = 0;
	}
	if( this._drill_curText == "" ){	//（空文本时的外框透明度）
		this.opacity = 0;
	}
	this.contents.opacity = oo;
}


