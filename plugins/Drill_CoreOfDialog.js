//=============================================================================
// Drill_CoreOfDialog.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        对话框 - 对话框优化核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfDialog +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 专门优化对话框底层，支持更进一步的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于其他核心插件，才能运行，并作用于其他子插件。
 * 基于：
 *   - Drill_CoreOfWindowCharacter      窗口字符-窗口字符核心
 *     需要该核心才能进行对话框 窗口字符 的支持。
 * 可作用于：
 *   - Drill_DialogNameBox              对话框-姓名框窗口
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   对所有窗口有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 细节：
 *   (1.
 * 设计：
 *   (1.
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 消息输入字符
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\$              对话框中，打开金钱窗口(右上角出现一个金钱窗口,结束对话消失)
 * 
 * 窗口字符：\fc[资源名:1]   对话框中，第二个为脸图索引，从0开始计数，范围为0~7。
 * 窗口字符：\fa[5]          对话框中，换成第n个角色脸图，角色从1开始计数。
 * 窗口字符：\fa[5:0]        对话框中，换成第n个角色脸图，第二个为脸图索引，从0开始计数，范围为0~7。
 * 窗口字符：\fp[1]          对话框中，换成第n个玩家队员脸图，玩家队员从1开始计数，1表示领队。
 * 窗口字符：\fp[1:0]        对话框中，换成第n个玩家队员脸图，第二个为脸图索引，从0开始计数，范围为0~7。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的逐个绘制测试 : 开启
 * 插件指令：>窗口字符核心 : DEBUG窗口字符的逐个绘制测试 : 关闭
 * 
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在绘制窗口字符时才会工作，绘制过程产生的消耗不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		CODi（Core_Of_Dialog）
//		临时全局变量	无
//		临时局部变量	this._drill_CODi_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	见管辖权
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	地图界面
//		★性能测试消耗	4.94ms（drawTextEx） 2.40ms（没有插件使用时）
//		★最坏情况		暂无
//		★备注			
//		
//		★优化记录		
//							
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆场景容器之对话框贴图
//			
//			
//			->☆管辖权（对话框）
//			->☆管辖权覆写函数（对话框）
//			->☆对话框控制
//				->2O打开对话框
//				->2P关闭对话框
//				->2Q绘制页
//				->2R逐个绘制
//				->2S脸图管理
//
//			->☆窗口字符应用之消息输入字符（金钱窗口开关）
//
//			->☆管辖权（2S脸图管理）
//			->☆管辖权覆写函数（2S脸图管理）
//			->☆实时加载（2S脸图管理）
//			->☆窗口字符应用之消息输入字符（2S脸图管理）
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于字符绘制核心（脚本）.docx
//		
//		★插件私有类：
//			无
//			
//		★核心说明：
//			1.核心
//		
//		★必要注意事项：
//			1.该插
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
	DrillUp.g_CODi_PluginTip_curName = "Drill_CoreOfDialog.js 对话框-对话框优化核心";
	DrillUp.g_CODi_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_CODi_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_CODi_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_CODi_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_CODi_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_CODi_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 兼容冲突
	//==============================
	DrillUp.drill_CODi_getPluginTip_CompatibilityYEP = function(){
		return  "【" + DrillUp.g_CODi_PluginTip_curName + "】\n"+
				"检测到你开启了 YEP_MessageCore插件。\n"+
				"请及时关闭该插件，该插件与 窗口字符核心 存在兼容冲突。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfDialog = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfDialog');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_CODi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_CODi_pluginCommand.call(this, command, args);
	this.drill_CODi_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_CODi_pluginCommand = function( command, args ){
	if( command === ">对话框优化核心" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			/*
			if( type == "DEBUG窗口字符的逐个绘制测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_CODi_timing_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_CODi_timing_DebugEnabled = false;
				}
			}
			*/
		}
	}
};
	
	
	
//#############################################################################
// ** 【标准模块】对话框贴图容器 ☆场景容器之对话框贴图
//#############################################################################
//##############################
// * 对话框贴图容器 - 获取 - 对话框窗口【标准函数】
//			
//			参数：	> 无
//			返回：	> 窗口对象          （对话框贴图）
//          
//			说明：	> 此函数返回 对话框窗口 对象。
//##############################
Game_Temp.prototype.drill_CODi_getMassageWindow = function(){
	return this.drill_CODi_getMassageWindow_Private();
}
//##############################
// * 对话框贴图容器 - 获取 - 子窗口【标准函数】
//			
//			参数：	> window_name 字符串（子窗口类名）
//			返回：	> 窗口对象          （子窗口贴图）
//          
//			说明：	> 此函数返回 子窗口 对象。
//##############################
Game_Temp.prototype.drill_CODi_getMassageSubWindowByType = function( window_name ){
	return this.drill_CODi_getMassageSubWindowByType_Private( window_name );
}
//=============================================================================
// ** 场景容器之对话框贴图（实现）
//=============================================================================
//==============================
// * 对话框贴图容器 - 获取 - 对话框窗口（私有）
//==============================
Game_Temp.prototype.drill_CODi_getMassageWindow_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	return SceneManager._scene._messageWindow;
};
//==============================
// * 对话框贴图容器 - 获取 - 子窗口（私有）
//==============================
Game_Temp.prototype.drill_CODi_getMassageSubWindowByType_Private = function( window_name ){
	if( SceneManager._scene == undefined ){ return null; }
	return SceneManager._scene._messageWindow;
};



//=============================================================================
// ** ☆管辖权（对话框）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 对话框『对话框优化核心』 - 帧刷新
//==============================
Window_Message.prototype.update = function(){
	
	// > 帧刷新 - 2C保持显示 - 开关动画
    this.checkToNotClose();
	
	// > 父类帧刷新
    Window_Base.prototype.update.call(this);
    
	// > 遍历对话
	while (!this.isOpening() && !this.isClosing() ){	//（2C保持显示 - 打开时/关闭时，当前帧等待）
        
		// > 遍历对话 - 2D等待
		if( this.updateWait() ){ return; } 
		
		// > 遍历对话 - 2E脸图
		else if( this.updateLoading() ){ return; }
		
		// > 遍历对话 - 2F按键按下
		else if( this.updateInput() ){ return; } 
		
		// > 遍历对话 - 2H消息输入字符
		else if( this.updateMessage() ){ return; }
		
		// > 遍历对话 - 2G下一页
		else if( this.canStart() ){
            this.startMessage();
			//（注意此处没有return，会继续执行循环）
			
		// > 遍历对话 - 2B子窗口 - 执行子窗口
		}else{
            this.startInput();
            return;
        }
    }
};
*/
/*
//==============================
// * 2D等待『对话框优化核心』 - 帧刷新 等待
//
//			说明：	> 返回true表示当前帧等待，返回false表示继续遍历对话。
//==============================
Window_Message.prototype.updateWait = function(){
    if( this._waitCount > 0 ){
        this._waitCount--;
        return true;
    }else{
        return false;
    }
};
//==============================
// * 2D等待『对话框优化核心』 - 设置等待时间（开放函数）
//==============================
Window_Message.prototype.startWait = function( count ){
    this._waitCount = count;
};


//==============================
// * 2F按键按下『对话框优化核心』 - 帧刷新
//
//			说明：	> 返回true表示当前帧等待，返回false表示继续遍历对话。
//==============================
Window_Message.prototype.updateInput = function(){
	
	// > 2F按键按下 - 2B子窗口 - 有子窗口时，该功能跳出
    if( this.isAnySubWindowActive() ){
        return true;
    }
	
	// > 2F按键按下 - 等待按下
    if( this.pause ){
        if( this.isTriggered() ){	//（需要按下一次，才能取消暂停）
            Input.update();
            this.pause = false;
			
			// > 2G下一页 - 达到末尾时（如果 光标已经被删除，则 关闭对话框）
            if( !this._textState ){
                this.terminateMessage();
            }
        }
        return true;
    }
	
    return false;
};
//==============================
// * 2F按键按下『对话框优化核心』 - 是否按下
//==============================
Window_Message.prototype.isTriggered = function(){
    return (Input.isRepeated('ok') || Input.isRepeated('cancel') ||
            TouchInput.isRepeated());
};
//==============================
// * 2F按键按下『对话框优化核心』 - 设置等待按下（开放函数）
//
//			说明：	> this.pause与父类 Window 的 ._windowPauseSignSprite小箭头标贴图 相关。
//==============================
Window_Message.prototype.startPause = function(){
    this.startWait(10);
    this.pause = true;
};


//==============================
// * 2G下一页『对话框优化核心』 - 显示新建页
//==============================
Window_Message.prototype.startMessage = function(){
	
	// > 光标重置
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
	
    this.newPage(this._textState);	//2H消息输入字符 - 执行新建
	
    this.updatePlacement();			//2C保持显示 - 设置位置
    this.updateBackground();		//2C保持显示 - 设置背景
    this.open();					//2C保持显示 - 打开窗口
};
//==============================
// * 2G下一页『对话框优化核心』 - 显示新建页 - 帧刷新监听
//
//			说明：	> 返回true表示当前帧等待，返回false表示继续遍历对话。
//==============================
Window_Message.prototype.canStart = function(){
    return $gameMessage.hasText() && !$gameMessage.scrollMode();
};
//==============================
// * 2G下一页『对话框优化核心』 - 判断末尾
//==============================
Window_Message.prototype.isEndOfText = function( textState ){
    return textState.index >= textState.text.length;
};
//==============================
// * 2G下一页『对话框优化核心』 - 达到末尾时
//==============================
Window_Message.prototype.onEndOfText = function(){
	
	// > 达到末尾时 - 2B子窗口 - 执行子窗口
    if( !this.startInput() ){
		
		// > 达到末尾时 - 2F按键按下 - 设置等待按下
        if( !this._pauseSkip ){
            this.startPause();
			
		// > 达到末尾时 - 关闭对话框
        }else{
            this.terminateMessage();
        }
    }
	
	// > 达到末尾时 - 删除光标
    this._textState = null;
};
//==============================
// * 2G下一页『对话框优化核心』 - 达到末尾时 - 关闭对话框
//==============================
Window_Message.prototype.terminateMessage = function(){
    this.close();
    this._goldWindow.close();
    $gameMessage.clear();
};


//==============================
// * E绘制『对话框优化核心』 - 逐一绘制 - 换行符（继承）
//
//			说明：	> 对话框的 换行符 控制，根据换行符数量，决定是否新建页。
//==============================
Window_Message.prototype.processNewLine = function( textState ){
    
	// > 瞬间显示当前行 标记
	this._lineShowFast = false;
	
    Window_Base.prototype.processNewLine.call(this, textState);
	
	// > 新建页
    if( this.needsNewPage(textState) ){
        this.startPause();
    }
};
//==============================
// * E绘制『对话框优化核心』 - 逐一绘制 - 新建页符（继承）
//
//			说明：	> 该函数只有该类 Window_Message 用到了。
//					> 对话框的 新建页符 控制。
//==============================
Window_Message.prototype.processNewPage = function( textState ){
    Window_Base.prototype.processNewPage.call(this, textState);
    if( textState.text[textState.index] === '\n' ){
        textState.index++;
    }
    textState.y = this.contents.height;
    this.startPause();
};
//==============================
// * E绘制『对话框优化核心』 - 逐一绘制 - 效果字符功能（继承）
//
//			说明：	> 对话框的 效果字符功能 控制。
//==============================
Window_Message.prototype.processEscapeCharacter = function( code, textState ){
    switch( code ){
		case '$':
			this._goldWindow.open();
			break;
		case '.':
			this.startWait(15);		//（2D等待 - 设置等待时间）
			break;
		case '|':
			this.startWait(60);		//（2D等待 - 设置等待时间）
			break;
		case '!':
			this.startPause();		//（2F按键按下 - 设置等待按下）
			break;
		case '>':
			this._lineShowFast = true;
			break;
		case '<':
			this._lineShowFast = false;
			break;
		case '^':
			this._pauseSkip = true;
			break;
		default:
			Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
			break;
    }
};
//==============================
// * 2H消息输入字符『对话框优化核心』 - 帧刷新
//
//			说明：	> 返回true表示当前帧等待，返回false表示继续遍历对话。
//					> 【核心漏洞修复】Drill_CoreOfDialog 此函数应该被分解，作为更适合扩展的结构。
//==============================
Window_Message.prototype.updateMessage = function(){
    if( this._textState ){
		
		// > 遍历字符
        while (!this.isEndOfText(this._textState) ){  //（2G下一页 - 判断末尾）
			
			// > 遍历字符 - 新建页
            if( this.needsNewPage(this._textState) ){
                this.newPage(this._textState);
            }
			
			// > 遍历字符 - 按确定键 瞬间显示当前页
            this.updateShowFast();
			
			// > 遍历字符 - E绘制 - 绘制下一个字符
            this.processCharacter(this._textState);
			
			// > 遍历字符 - 瞬间显示/瞬间显示当前行 时，强制继续循环（此处其实可以拆成两个if，true时break）
            if( !this._showFast && !this._lineShowFast ){
                break;
            }
			// > 遍历字符 - 2F按键按下/2D等待 时，瞬间跳出字符绘制（此处可以拆成两个if）
            if( this.pause || this._waitCount > 0 ){
                break;
            }
        }
		
		// > 2G下一页 - 绘制完 全部字符 时
        if( this.isEndOfText(this._textState) ){
            this.onEndOfText();
        }
        return true;
    }else{
        return false;
    }
};
//==============================
// * 2H消息输入字符『对话框优化核心』 - 新建页 - 判断是否需要新建页
//==============================
Window_Message.prototype.needsNewPage = function( textState ){
    return (!this.isEndOfText(textState) &&
            textState.y + textState.height > this.contents.height);
};
//==============================
// * 2H消息输入字符『对话框优化核心』 - 新建页 - 执行新建
//==============================
Window_Message.prototype.newPage = function( textState ){
	
	// > 清理画布
    this.contents.clear();
    this.resetFontSettings();
    this.clearFlags();				//2H消息输入字符 - 清理字符标记
    this.loadMessageFace();			//2E脸图 - 读取脸图
    
	// > 光标重置
	textState.x = this.newLineX();
    textState.y = 0;
    textState.left = this.newLineX();
    textState.height = this.calcTextHeight(textState, false);
};
//==============================
// * 2H消息输入字符『对话框优化核心』 - 按确定键 瞬间显示当前页
//
//			说明：	> 此功能实现 再次按确定键，能瞬间加速当前内容 。
//==============================
Window_Message.prototype.updateShowFast = function(){
    if( this.isTriggered() ){
        this._showFast = true;
    }
};
//==============================
// * 2H消息输入字符『对话框优化核心』 - 清理字符标记
//==============================
Window_Message.prototype.clearFlags = function(){
    this._showFast = false;			//瞬间显示
    this._lineShowFast = false;		//瞬间显示当前行
    this._pauseSkip = false;		//跳过等待输入
};
*/

//=============================================================================
// ** ☆管辖权覆写函数（对话框）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
//==============================
// * 管辖权覆写函数（对话框） - 最后继承1级
//==============================
var _drill_CODi_scene_initialize4 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_CODi_scene_initialize4.call(this);
	
	var _drill_CODi_message_drawText = Window_Message.prototype.drawText;
	var _drill_CODi_message_drawTextEx = Window_Message.prototype.drawTextEx;
	var _drill_CODi_message_textWidth = Window_Message.prototype.textWidth;
	var _drill_CODi_message_calcTextHeight = Window_Message.prototype.calcTextHeight;
	//==============================
	// * 管辖权覆写函数（对话框） - 绘制【基本文本】（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 对话框的绘制函数，完全弃用。
	//					> 注意，drill插件如果想继承 Window_Message.prototype.drawText ，去继承函数 Window_Message.prototype.drill_CODi_message_initDrawText 即可。
	//==============================
	Window_Message.prototype.drawText = function( text, x, y, maxWidth, align ){
		//（不操作）
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 绘制【扩展文本】（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 对话框的绘制函数，完全弃用。
	//					> 注意，drill插件如果想继承 Window_Message.prototype.drawTextEx ，去继承函数 Window_Message.prototype.drill_CODi_message_initDrawText 即可。
	//==============================
	Window_Message.prototype.drawTextEx = function( text, x, y ){
		//（不操作）
		return 0;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 计算【基本文本】宽度（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 对话框的绘制函数，完全弃用。
	//==============================
	Window_Message.prototype.textWidth = function( text ){
		return 0;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 计算【扩展文本】高度（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 对话框的绘制函数，完全弃用。
	//==============================
	Window_Message.prototype.calcTextHeight = function( textState, all ){
		return 0;
	};
	
	
	//==============================
	// * 管辖权覆写函数（对话框） - 帧刷新（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.update = function(){
		this.drill_CODi_message_update();
	};
	
	
	//==============================
	// * 管辖权覆写函数（对话框） - 2D等待 - 帧刷新 等待（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.updateWait = function(){
		return false;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2D等待 - 设置等待时间（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.startWait = function( count ){
	};
	
	//==============================
	// * 管辖权覆写函数（对话框） - 2F按键按下 - 帧刷新（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.updateInput = function(){
		return false;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2F按键按下 - 是否按下
	//==============================
	// （不覆写）
	//==============================
	// * 管辖权覆写函数（对话框） - 2F按键按下 - 设置等待按下（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.startPause = function(){
	};
	
	//==============================
	// * 管辖权覆写函数（对话框） - 2G下一页 - 显示新建页（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.startMessage = function(){
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2G下一页 - 显示新建页 - 帧刷新监听（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.canStart = function(){
		return false;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2G下一页 - 判断末尾（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.isEndOfText = function( textState ){
		return true;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2G下一页 - 达到末尾时（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.onEndOfText = function(){
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2G下一页 - 达到末尾时 - 关闭对话框（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 『子窗口手动关闭对话框』因为子窗口会调用此函数，所以这里加上 执行关闭 函数。
	//					> 比如代码："this._messageWindow.terminateMessage();" 
	//==============================
	Window_Message.prototype.terminateMessage = function(){
		this.drill_CODi_message_doTerminate();
	};
	
	//==============================
	// * 管辖权覆写函数（对话框） - E绘制 - 换行符（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.processNewLine = function( textState ){
	};
	//==============================
	// * 管辖权覆写函数（对话框） - E绘制 - 新建页符（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.processNewPage = function( textState ){
	};
	//==============================
	// * 管辖权覆写函数（对话框） - E绘制 - 效果字符功能（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.processEscapeCharacter = function( code, textState ){
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2H消息输入字符 - 帧刷新（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.updateMessage = function(){
        return false;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2H消息输入字符 - 判断是否需要新建页（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.needsNewPage = function( textState ){
        return false;
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2H消息输入字符 - 执行新建（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.newPage = function( textState ){
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2H消息输入字符 - 按确定键 瞬间显示当前页（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.updateShowFast = function(){
	};
	//==============================
	// * 管辖权覆写函数（对话框） - 2H消息输入字符 - 清理字符标记（覆写） 『窗口字符旧函数覆写』
	//==============================
	Window_Message.prototype.clearFlags = function(){
	};
}

//=============================================================================
// ** ☆对话框控制
//					
//			作用域：	地图界面、战斗界面
//			主功能：	定义一个对话框，并能根据 消息输入字符 控制输入。
//			子功能：	
//						->窗口
//							->帧刷新
//							->与 Game_Message 交互
//						
//						->2A私有函数
//						->2B子窗口
//							> 金钱窗口
//							> 选项窗口基类
//							> 数字输入窗口
//							> 物品选择窗口
//						->2C保持显示
//							->开关动画
//							->设置位置（顶部/中间/底部）
//							->设置背景（窗口/暗淡/透明）
//						
//						x->2D等待
//						x->2E脸图
//						x->2F按键按下
//						x->2G下一页
//						x->2H消息输入字符
//							x->E绘制
//						
//						->2O打开对话框
//						->2P关闭对话框
//						->2Q绘制页
//						->2R逐个绘制
//						->2S脸图管理
//					
//			说明：	> 该模块将对 对话框 进行专门管理。
//					> 这里禁用了大部分功能，禁用方式就是通过『窗口字符旧函数覆写』实现。
//					  如果注释掉那些函数，则功能会被还原。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 对话框控制 - 初始化
//==============================
var _drill_CODi_message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
	_drill_CODi_message_initialize.call(this);
	this._drill_CODi_message_isStarted = false;		//（打开关闭标记）
}
//==============================
// * 对话框控制 - 帧刷新
//==============================
Window_Message.prototype.drill_CODi_message_update = function(){
	
	// > 帧刷新 - 2C保持显示 - 开关动画
    this.checkToNotClose();
	
	// > 父类帧刷新
    Window_Base.prototype.update.call(this);
	
	if( this.isOpening() ){ return; }
	if( this.isClosing() ){ return; }
	
	// > 帧刷新 - 2O打开对话框
	this.drill_CODi_message_updateStart();
	// > 帧刷新 - 2P关闭对话框
	this.drill_CODi_message_updateTerminate();
	
	// > 帧刷新 - 2S脸图管理（加载阻塞）
	if( $gameTemp.drill_CODi_realTimeLoad_isAllReady() == false ){ return; }
	// > 帧刷新 - 2S脸图管理
	this.drill_CODi_message_updateFace();
	
	// > 帧刷新 - 2Q绘制页
	this.drill_CODi_message_updatePage();
	// > 帧刷新 - 2R逐个绘制
	this.drill_CODi_message_updateDraw();
};


//==============================
// * 2O打开对话框 - 帧刷新
//==============================
Window_Message.prototype.drill_CODi_message_updateStart = function(){
	if( this._drill_CODi_message_isStarted == true ){ return false; } //（已打开时，不需要再次打开）
	if( this.drill_CODi_message_canStart() ){
		this.drill_CODi_message_doStart();
	}
};
//==============================
// * 2O打开对话框 - 打开条件（可继承）
//==============================
Window_Message.prototype.drill_CODi_message_canStart = function(){
	if( $gameMessage.hasText() != true ){ return false; }			//打开条件 - 没有对话文本时，跳出
	if( $gameMessage.scrollMode() == true ){ return false; }		//打开条件 - 滚动模式时，跳出
    return true;
};
//==============================
// * 2O打开对话框 - 执行打开（开放函数）
//==============================
Window_Message.prototype.drill_CODi_message_doStart = function(){
	this._drill_CODi_message_isStarted = true;		//（打开关闭标记）
	
	// > 测试
	//alert("打开对话框（每页对话都执行一次）");
	
	this.drill_CODi_message_newPage();		//2Q绘制页 - 执行新建页
	
    this.updatePlacement();					//2C保持显示 - 设置位置
    this.updateBackground();				//2C保持显示 - 设置背景
    this.open();							//2C保持显示 - 打开窗口
};


//==============================
// * 2P关闭对话框 - 帧刷新
//==============================
Window_Message.prototype.drill_CODi_message_updateTerminate = function(){
	if( this._drill_CODi_message_isStarted == false ){ return; } //（已关闭时，不需要再次关闭）
	if( this.drill_CODi_message_canTerminate() ){
		this.drill_CODi_message_doTerminate();
	}
};
//==============================
// * 2P关闭对话框 - 关闭条件（可继承）
//==============================
Window_Message.prototype.drill_CODi_message_canTerminate = function(){
	if( this.drill_CODi_message_isPagePlaying() == true ){ return false; }	//关闭条件 - 绘制页没结束，跳出
	return true;
};
//==============================
// * 2P关闭对话框 - 执行关闭（开放函数）
//
//			说明：	> 该函数可以手动调用，手动调用后 当前流程的阻塞 会被强制解除，重新放开 2O打开对话框 的条件。
//==============================
Window_Message.prototype.drill_CODi_message_doTerminate = function(){
	this._drill_CODi_message_isStarted = false;		//（打开关闭标记）
	
	// > 测试
	//alert("关闭对话框（每页对话都执行一次）");
	
    this.close();
    this._goldWindow.close();
    $gameMessage.clear();
};


//==============================
// * 2Q绘制页 - 执行新建页
//
//			说明：	> 绘制页流程 = 逐个绘制流程 + 绘制结束时的等待按下 + 2B子窗口的阻塞。
//==============================
Window_Message.prototype.drill_CODi_message_newPage = function(){
	
	// > 清理画布
    this.contents.clear();
	
	// > 自带参数初始化
	//		（这里没有重建画布，但这里的画布参数需要重刷）
	this.contents.drill_COCD_org_initBitmapDefault();
	
	
	// > 2S脸图管理 - 初始化
	this.drill_CODi_message_faceInit();
	
	// > 2R逐个绘制 - 初始化
	var text = $gameMessage.allText() + " ";	//（在末尾多加一个空格，防止写在末尾的\^字符不生效）
	var xx = this.drill_CODi_message_faceOffsetX();
	var yy = 0;
	this.drill_CODi_message_initDrawText( text, xx, yy );
	
	// > 2Q绘制页 - 标记
	this._drill_CODi_message_curPagePlaying = true;
};
//==============================
// * 2Q绘制页 - 帧刷新
//==============================
Window_Message.prototype.drill_CODi_message_updatePage = function(){
	
	// > 绘制结束时
	if( this.drill_COWC_timing_isPlaying() == false ){
		
		
		// > 绘制结束时 - 2B子窗口 - 有子窗口时，该功能跳出
		if( this.isAnySubWindowActive() == true ){ return; }
		
		// > 绘制结束时 - 2B子窗口 - 帧刷新
		//		（子窗口打开后，后面的流程直接跳出了，因为子窗口会执行『子窗口手动关闭对话框』）
		var has_subWindow = this.startInput();
		if( has_subWindow == true ){ return; }
		
		
		// > 绘制结束时 - 等待按下
		if( this.contents._drill_COWC_timing_inputWait_enabled == true ){ //等待按下开关【窗口字符 - 窗口字符核心】（该开关能 开启/关闭 所有 等待按下 的功能）
			if( this._drill_CODi_message_curPagePlaying == true ){
				if( this.contents.drill_COWC_timing_isTriggered() ){
					this._drill_CODi_message_curPagePlaying = false;
				}
			}
		}else{
			this._drill_CODi_message_curPagePlaying = false;
		}
	}
};
//==============================
// * 2Q绘制页 - 是否正在播放（开放函数）
//==============================
Window_Message.prototype.drill_CODi_message_isPagePlaying = function(){
	return this._drill_CODi_message_curPagePlaying == true;
};
//==============================
// * 2Q绘制页 - 是否正在等待按下（开放函数）
//==============================
Window_Message.prototype.drill_CODi_message_isPageWaitingInput = function(){
	if( this.drill_COWC_timing_isPlaying() == true ){ return false; }
	return this._drill_CODi_message_curPagePlaying == true;
};


//==============================
// * 2R逐个绘制 - 绘制文本（对话框）
//			
//			参数：	> text 字符串    （目标文本）
//					> x, y 数字      （文本位置）
//					> maxWidth 数字  （最大宽度值）
//					> align 字符串   （对齐方式，left/center/right）
//			返回：	> 无
//==============================
Window_Message.prototype.drill_CODi_message_initDrawText = function( text, x, y ){
	
	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 参数准备 - 校验
	var org_text = text;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	org_text = String(org_text);	//（有些插件会扔一个数字进来）
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = x;
	options['infoParam']['y'] = y;
	options['infoParam']['canvasWidth']  = this.contentsWidth();  //this.width;
	options['infoParam']['canvasHeight'] = this.contentsHeight(); //this.height;
	this.drill_CODi_message_initOptions( options );
	
	// > 『字符逐个绘制流程』 - 逐个绘制初始化
	this.drill_COWC_timing_initDrawText( org_text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
};
//==============================
// * 2R逐个绘制 - 准备绘制配置（对话框）
//
//			说明：	> 子插件可能会要在 对话框中 进行参数初始化，因此该函数单独分离出来。
//==============================
Window_Message.prototype.drill_CODi_message_initOptions = function( o_data ){
	
	// > 参数准备 - 『字符默认间距』 - 对话框行上补正36像素
	if( o_data['rowParam'] == undefined ){ o_data['rowParam'] = {}; }
	if( o_data['rowParam']['lineHeight_upCorrection'] == undefined ){ o_data['rowParam']['lineHeight_upCorrection'] = 36; } //（默认对话框就是36像素补正）
	
	// > 参数准备 - 修改计时器间隔
	if( o_data['blockParam'] == undefined ){ o_data['blockParam'] = {}; }
	if( o_data['blockParam']['perTick']       == undefined ){ o_data['blockParam']['perTick'] = 1; } //（默认对话框就是最快的每帧一个字符）
	if( o_data['blockParam']['inputTickSkip'] == undefined ){ o_data['blockParam']['inputTickSkip'] = true; }
};
//==============================
// * 2R逐个绘制 - 帧刷新
//==============================
Window_Message.prototype.drill_CODi_message_updateDraw = function(){
	
	// > 『字符逐个绘制流程』 - 逐个绘制帧刷新
	this.drill_COWC_timing_updateTick();
};



//=============================================================================
// ** ☆窗口字符应用之消息输入字符（金钱窗口开关）
//
//			说明：	> 窗口字符应用的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之消息输入字符（金钱窗口开关） - 窗口字符 - 简单符配置
//==============================
var _drill_CODi_COWC_effect_processSimple_1 = Game_Temp.prototype.drill_COWC_effect_processSimple;
Game_Temp.prototype.drill_COWC_effect_processSimple = function( matched_index, matched_str ){
	_drill_CODi_COWC_effect_processSimple_1.call( this, matched_index, matched_str );
	
	// > 『窗口字符定义』 - 金钱窗口开关（\$）
	if( matched_str.substring(0,2).toUpperCase() == "\\$" ){	//（注意，这里使用substring，\FBA 需要被切成 \FB 和 A ）
		this.drill_COWC_effect_submitSimple( 2, "@@@_go[true]" );
	}
}
//==============================
// * 窗口字符应用之消息输入字符（金钱窗口开关） - 底层字符 - 样式阶段-配置阶段
//==============================
var _drill_CODi_COCD_textBlock_processStyle_1 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_CODi_COCD_textBlock_processStyle_1.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 金钱窗口开关（@@@_go[true]） player_gold_window
	if( command.toLowerCase() == "@@@_go" ){
		if( args.length == 1 ){
			if( cur_infoParam['parentWindow'] == "Window_Message" ){
				if( String(args[0]).toUpperCase() == "ON" ||
					String(args[0]).toUpperCase() == "TRUE" ){
					cur_blockParam['goldWindow'] = true;
				}else{
					cur_blockParam['goldWindow'] = false;
				}
			}
			this.drill_COCD_textBlock_submitStyle();	//（其它地方使用此字符，也要消除）
			return;
		}
	}
}
//==============================
// * 窗口字符应用之消息输入字符（金钱窗口开关） - 底层字符 - 样式阶段-回滚样式
//==============================
var _drill_CODi_COCD_textBlock_restoreStyle_1 = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_CODi_COCD_textBlock_restoreStyle_1.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 金钱窗口开关（@@@_go[true]）
	cur_blockParam['goldWindow'] = undefined;
}
//==============================
// * 窗口字符应用之消息输入字符（金钱窗口开关） - 绘制过程 - 每个字符开始时
//==============================
var _drill_CODi_COWC_timing_textStart_1 = Bitmap.prototype.drill_COWC_timing_textStart;
Bitmap.prototype.drill_COWC_timing_textStart = function( textBlock, row_index, text_index ){
	_drill_CODi_COWC_timing_textStart_1.call( this, textBlock, row_index, text_index );
	/*
		这个过程中 <xxx>  \xxx  \xxx[xxx]  @@@xxx 全部都转换完毕了
	*/
	var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
	
	// > 『绘制过程定义』 - 打开金钱窗口（@@@_go[true]）
	if( cur_blockParam['goldWindow'] != undefined ){
		if( cur_blockParam['goldWindow'] == true ){
			var temp_window = $gameTemp.drill_CODi_getMassageWindow();
			if( temp_window != undefined ){
				temp_window._goldWindow.open();
			}
		}
		if( cur_blockParam['goldWindow'] == false ){
			var temp_window = $gameTemp.drill_CODi_getMassageWindow();
			if( temp_window != undefined ){
				temp_window._goldWindow.close();
			}
		}
	}
}



//=============================================================================
// ** ☆管辖权（2S脸图管理）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 2E脸图『对话框优化核心』 - 帧刷新
//
//			说明：	> 返回true表示当前帧等待，返回false表示继续遍历对话。
//==============================
Window_Message.prototype.updateLoading = function(){
	
	// > 等待读取脸图
    if( this._faceBitmap ){
        if( this._faceBitmap.isReady() ){
            this.drawMessageFace();
            this._faceBitmap = null;
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
};
//==============================
// * 2E脸图『对话框优化核心』 - 读取脸图
//==============================
Window_Message.prototype.loadMessageFace = function(){
    this._faceBitmap = ImageManager.reserveFace($gameMessage.faceName(), 0, this._imageReservationId);
};
//==============================
// * 2E脸图『对话框优化核心』 - 绘制脸图
//==============================
Window_Message.prototype.drawMessageFace = function(){
    this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
    ImageManager.releaseReservation(this._imageReservationId);
};
//==============================
// * 2E脸图『对话框优化核心』 - 脸图偏移量X
//
//			说明：	> 该函数只被 Window_Message.prototype.newPage 用到了。
//==============================
Window_Message.prototype.newLineX = function(){ return $gameMessage.faceName() === '' ? 0 : 168; };
*/

//=============================================================================
// ** ☆管辖权覆写函数（2S脸图管理）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
//==============================
// * 管辖权覆写函数（2S脸图管理） - 最后继承1级
//==============================
var _drill_CODi_scene_initialize5 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_CODi_scene_initialize5.call(this);
	
	//==============================
	// * 管辖权覆写函数（对话框） - 2E脸图 - 帧刷新
	//==============================
	Window_Message.prototype.updateLoading = function(){
		return false;
	}
	//==============================
	// * 管辖权覆写函数（对话框） - 2E脸图 - 读取脸图
	//==============================
	Window_Message.prototype.loadMessageFace = function(){
	}
	//==============================
	// * 管辖权覆写函数（对话框） - 2E脸图 - 绘制脸图
	//==============================
	Window_Message.prototype.drawMessageFace = function(){
	}
	//==============================
	// * 管辖权覆写函数（对话框） - 2E脸图 - 脸图偏移量X
	//==============================
	Window_Message.prototype.newLineX = function(){
		return this.drill_CODi_message_faceOffsetX();
	}
}
//==============================
// * 2S脸图管理 - 脸图偏移量X
//==============================
Window_Message.prototype.drill_CODi_message_faceOffsetX = function(){
	return $gameMessage.faceName() === '' ? 0 : 168;
};
//==============================
// * 2S脸图管理 - 初始化
//==============================
Window_Message.prototype.drill_CODi_message_faceInit = function(){
	
	// > 释放缓存
	$gameTemp.drill_CODi_realTimeLoad_destroy();
	
	// > 加载贴图
	this._drill_CODi_drawed = false;
	$gameTemp.drill_CODi_realTimeLoad_addFaceName( $gameMessage.faceName() );
};
//==============================
// * 2S脸图管理 - 帧刷新
//==============================
Window_Message.prototype.drill_CODi_message_updateFace = function(){
	if( this._drill_CODi_drawed == false ){
		this._drill_CODi_drawed = true;
		this.contents.drill_CODi_refreshFace( $gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0 );
	}
};
//==============================
// * 2S脸图管理 - 帧刷新 - 执行绘制
//
//			说明：	> 注意，这里在Bitmap类中，所以要复刻绘制脸图函数。
//==============================
Bitmap.prototype.drill_CODi_refreshFace = function( faceName, faceIndex, x, y, width, height ){
	width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
	if( bitmap.isReady() == false ){ return; }	//（帧刷新中有加载阻塞，所以此处不可能返回false，但，以防万一）
	
	// > 清理脸图区域
	this.clearRect( x, y, width, height );
	
	// > 绘制脸图
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.blt(bitmap, sx, sy, sw, sh, dx, dy);
}



//=============================================================================
// ** ☆实时加载（2S脸图管理）
//
//			说明：	> 加载bitmap过程会被安排在帧刷新中，并实时销毁缓存，减少内存消耗。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 实时加载 （2S脸图管理）- 加载贴图
//
//			说明：	> 由于对话框只有一个，所以 脸图的列表 也按一个来管理。
//==============================
Game_Temp.prototype.drill_CODi_realTimeLoad_addFaceName = function( faceName ){
	if( this._drill_CODi_realTimeLoad_cacheId == undefined ){
		this._drill_CODi_realTimeLoad_cacheId = Utils.generateRuntimeId();	//图像缓存ID
	}
	if( this._drill_CODi_realTimeLoad_bitmapList == undefined ){
		this._drill_CODi_realTimeLoad_bitmapList = [];
	}
	var temp_bitmap = ImageManager.reserveFace( faceName, 0, this._drill_CODi_realTimeLoad_cacheId );
	this._drill_CODi_realTimeLoad_bitmapList.push( temp_bitmap );
}
//==============================
// * 实时加载 （2S脸图管理）- 是否全部已加载
//==============================
Game_Temp.prototype.drill_CODi_realTimeLoad_isAllReady = function(){
	if( this._drill_CODi_realTimeLoad_bitmapList != undefined ){
		for( var i = 0; i < this._drill_CODi_realTimeLoad_bitmapList.length; i++ ){
			var temp_bitmap = this._drill_CODi_realTimeLoad_bitmapList[i];
			if( temp_bitmap == undefined ){ continue; }
			if( temp_bitmap.isReady() == false ){
				return false;
			}
		}
	}
	return true;
}
//==============================
// * 实时加载 （2S脸图管理）- 释放缓存
//==============================
Game_Temp.prototype.drill_CODi_realTimeLoad_destroy = function(){
	if( this._drill_CODi_realTimeLoad_cacheId == undefined ){ return; }
	ImageManager.releaseReservation( this._drill_CODi_realTimeLoad_cacheId );
	this._drill_CODi_realTimeLoad_bitmapList = undefined;
	this._drill_CODi_realTimeLoad_cacheId = undefined;
}


//=============================================================================
// ** ☆窗口字符应用之消息输入字符（2S脸图管理）
//
//			说明：	> 窗口字符应用的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之消息输入字符 （2S脸图管理）- 窗口字符 - 组合符配置
//==============================
var _drill_CODi_COWC_effect_processCombined_2 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_CODi_COWC_effect_processCombined_2.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 指定脸图（\FC[faceName:0]）
	if( command.toUpperCase() == "FC" ){
		if( args.length == 2 ){
			var faceName = String(args[0]);
			var faceIndex = Number(args[1]);
			$gameTemp.drill_CODi_realTimeLoad_addFaceName( faceName ); //（解析时加载贴图）
			this.drill_COWC_effect_submitCombined( "@@@_fc[" + faceName + ":" + String(faceIndex) + "]" );
		}
	}
	// > 『窗口字符定义』 - 第5个角色脸图（\FA[5]、\FA[5:0]）
	if( command.toUpperCase() == "FA" ){
		if( args.length == 1 ){
			var actor = $gameActors.actor( Number(args[0]) );
			if( actor != undefined ){
				var faceName = actor.faceName();
				var faceIndex = actor.faceIndex();
				$gameTemp.drill_CODi_realTimeLoad_addFaceName( faceName ); //（解析时加载贴图）
				this.drill_COWC_effect_submitCombined( "@@@_fc[" + faceName + ":" + String(faceIndex) + "]" );
			}else{
				this.drill_COWC_effect_submitCombined( "" );	//（没有角色脸图时，直接去掉窗口字符）
			}
		}
		if( args.length == 2 ){
			var actor = $gameActors.actor( Number(args[0]) );
			if( actor != undefined ){
				var faceName = actor.faceName();
				var faceIndex = Number(args[1]);
				$gameTemp.drill_CODi_realTimeLoad_addFaceName( faceName ); //（解析时加载贴图）
				this.drill_COWC_effect_submitCombined( "@@@_fc[" + faceName + ":" + String(faceIndex) + "]" );
			}else{
				this.drill_COWC_effect_submitCombined( "" );	//（没有角色脸图时，直接去掉窗口字符）
			}
		}
	}
	// > 『窗口字符定义』 - 第1个玩家队员脸图（\FP[1]、\FP[1:0]）
	if( command.toUpperCase() == "FP" ){
		if( args.length == 1 ){
			var actor = $gameParty.members()[ Number(args[0]) -1 ];
			if( actor != undefined ){
				var faceName = actor.faceName();
				var faceIndex = actor.faceIndex();
				$gameTemp.drill_CODi_realTimeLoad_addFaceName( faceName ); //（解析时加载贴图）
				this.drill_COWC_effect_submitCombined( "@@@_fc[" + faceName + ":" + String(faceIndex) + "]" );
			}else{
				this.drill_COWC_effect_submitCombined( "" );	//（没有角色脸图时，直接去掉窗口字符）
			}
		}
		if( args.length == 2 ){
			var actor = $gameParty.members()[ Number(args[0]) -1 ];
			if( actor != undefined ){
				var faceName = actor.faceName();
				var faceIndex = Number(args[1]);
				$gameTemp.drill_CODi_realTimeLoad_addFaceName( faceName ); //（解析时加载贴图）
				this.drill_COWC_effect_submitCombined( "@@@_fc[" + faceName + ":" + String(faceIndex) + "]" );
			}else{
				this.drill_COWC_effect_submitCombined( "" );	//（没有角色脸图时，直接去掉窗口字符）
			}
		}
	}
}
//==============================
// * 窗口字符应用之消息输入字符（2S脸图管理） - 底层字符 - 样式阶段-配置阶段
//==============================
var _drill_CODi_COCD_textBlock_processStyle_2 = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_CODi_COCD_textBlock_processStyle_2.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 指定脸图（@@@_fc[faceName:0]） face_choose（索引值从0开始编号，是因为对话框编辑后，事件指令显示的是0开始的编号）
	if( command.toLowerCase() == "@@@_fc" ){
		if( args.length == 2 ){
			if( cur_infoParam['parentWindow'] == "Window_Message" ){
				cur_blockParam['faceName'] = String(args[0]);
				cur_blockParam['faceIndex'] = Number(args[1]);
			}
			this.drill_COCD_textBlock_submitStyle();	//（其它地方使用此字符，也要消除）
			return;
		}
	}
}
//==============================
// * 窗口字符应用之消息输入字符（2S脸图管理） - 底层字符 - 样式阶段-回滚样式
//==============================
var _drill_CODi_COCD_textBlock_restoreStyle_2 = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_CODi_COCD_textBlock_restoreStyle_2.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 指定脸图（@@@_fc[faceName:0]）
	cur_blockParam['faceName'] = undefined;
	cur_blockParam['faceIndex'] = undefined;
}
//==============================
// * 窗口字符应用之消息输入字符（2S脸图管理） - 绘制过程 - 每个字符开始时
//==============================
var _drill_CODi_COWC_timing_textStart_2 = Bitmap.prototype.drill_COWC_timing_textStart;
Bitmap.prototype.drill_COWC_timing_textStart = function( textBlock, row_index, text_index ){
	_drill_CODi_COWC_timing_textStart_2.call( this, textBlock, row_index, text_index );
	/*
		这个过程已经处于 逐个绘制 中，且 <xxx>  \xxx  \xxx[xxx]  @@@xxx 全部都转换完毕。
		进入到此函数，至少与前面的字符解析过程相差1帧，具体看update情况。
	*/
	var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
	
	// > 『绘制过程定义』 - 指定脸图（@@@_fc[faceName:0]）
	if( cur_blockParam['faceName']  != undefined &&
		cur_blockParam['faceIndex'] != undefined ){
		this.drill_CODi_refreshFace( cur_blockParam['faceName'], cur_blockParam['faceIndex'], 0, 0 );
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfDialog = false;
		var pluginTip = DrillUp.drill_CODi_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


