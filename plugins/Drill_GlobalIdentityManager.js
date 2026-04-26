//=============================================================================
// Drill_GlobalIdentityManager.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        管理器 - 设备校验管理器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GlobalIdentityManager +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以获取玩家设备的信息，并能校验存档是否在相同设备上运行。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 可被扩展：
 *   - Drill_CoreOfString           系统-字符串核心
 *     有了字符串核心，你可以通过插件指令获取设备信息，并用对话框显示出来。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于设备平台。
 * 2.详细内容可以去看看 "21.管理器 > 关于设备校验管理器.docx"。
 * 细节：
 *   (1.游戏设备分为两种情况：电脑端 和 手机端。
 *      电脑端(PC端)：windows系统、mac系统、linux系统。
 *      手机端/平板端：安卓系统、ios系统、浏览器。
 *      这两种情况与游戏部署的设置有关。
 *      （游戏存储的数据载体也会受影响，分为文件载体和网页载体）
 *   (2.插件添加后，每个存档会额外存储用户当前使用的设备数据。
 *      通过插件指令 "当前存档是否在相同设备上运行" 来获取校验结果。
 *      如果存档未被转移，获取后的开关值为true。
 *      如果存档被转移到 别的电脑 或 系统被重装为其它版本，获取后的开关值为false。
 * 设计：
 *   (1.你能通过该插件，提前知道玩家的操作系统、用户名。
 *      以此来给一些有特殊设置的玩家，额外的惊喜。
 *      比如："你windows电脑的用户名居然不是Administrator，送你个葡萄吧"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 信息显示
 * 你可以使用下面插件指令获取信息：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>设备校验管理器 : DEBUG显示当前设备全部信息
 * 
 * 1.执行该指令后，游戏会通过DEBUG弹窗显示当前设备的全部信息。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 信息获取
 * 你可以使用下面插件指令获取信息：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>设备校验管理器 : 当前是否为电脑端 : 开关[21]
 * 插件指令：>设备校验管理器 : 当前是否为手机端 : 开关[21]
 * 
 * 插件指令：>设备校验管理器 : 获取-电脑端-操作系统类型 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-操作系统名 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-内核版本号 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-计算机名 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-用户名 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-用户ID : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-用户组ID : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-CPU架构 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-CPU型号 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-CPU频率 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-CPU核心数 : 变量[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-内存容量 : 变量[21]
 * 
 * 插件指令：>设备校验管理器 : 获取-手机端-浏览器信息 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-语言 : 字符串[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-Cookie开关 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-联网状态 : 开关[21]
 * 
 * 1.你可以通过上述指令获取信息，并且作用在游戏中。
 * 2."内存容量"的单位为GB，不满1GB的都按1GB算，可赋值给变量。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 信息校验
 * 你可以使用下面插件指令实现信息校验：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>设备校验管理器 : 当前存档是否在相同设备上运行 : 开关[21]
 * 
 * 1.插件添加后，每个存档会额外存储用户当前使用的设备数据。
 *   如果存档未被转移，获取后的开关值为true。
 *   如果存档被转移到 别的电脑 或 系统被重装为其它版本，获取后的开关值为false。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 系统判断
 * 你可以使用下面插件指令判断玩家运行游戏的系统：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>设备校验管理器 : 获取-电脑端-是否为windows系统 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-是否为mac系统 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-是否为linux系统 : 开关[21]
 * 
 * 插件指令：>设备校验管理器 : 获取-手机端-是否为ie浏览器 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-是否为edge浏览器 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-是否为opera浏览器 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-是否为safari浏览器 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-是否为chrome浏览器 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-手机端-是否为firefox浏览器 : 开关[21]
 * 
 * 1.玩家只可能是上述系统中的一个，只有一个开关在获取后会为on状态。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 系统判断2
 * 你可以使用下面插件指令判断玩家运行游戏的系统：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>设备校验管理器 : 获取-电脑端-是否为windows7系统 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-是否为windows10系统 : 开关[21]
 * 插件指令：>设备校验管理器 : 获取-电脑端-是否为windows11系统 : 开关[21]
 * 
 * 1.考虑到window的玩家非常多，这里提供进一步的区分。
 *   但windows内核版本号是乱的，这里 win7、win8、win8.1 都划分为win7的开关ON。
 *   并且由于作者我没法知道未来的win11和win12版本号有什么区别，
 *   所以未来win12、win13，都可能使win11的开关ON。
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
 * 测试方法：   分别在地图界面和战斗界面获取设备信息。
 * 测试结果：   地图界面中测试，消耗为：【5ms以下】
 *              战斗界面中测试，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只进行单次数据读取，消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		GIM（Global_Identity_Manager）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	无
//		★性能测试消耗	2026/4/25：
//							》未找到，消耗太小。
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆设备信息获取
//			->☆设备信息校验
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
	DrillUp.g_GIM_PluginTip_curName = "Drill_GlobalIdentityManager.js 管理器-设备校验管理器";
	DrillUp.g_GIM_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_GlobalIdentityManager = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GlobalIdentityManager');
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_GIM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_GIM_pluginCommand.call(this, command, args);
	this.drill_GIM_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_GIM_pluginCommand = function( command, args ){
	if( command === ">设备校验管理器" ){
		
		/*-----------------信息显示------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "DEBUG显示当前设备全部信息" ){
				alert( DataManager.drill_GIM_getDevice_Description() );
				return;
			}
		}
		
		/*-----------------信息获取------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp2 = String(args[3]);
			if( type == "当前是否为电脑端" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, StorageManager.isLocalMode() == true );
				return;
			}
			if( type == "当前是否为手机端" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, StorageManager.isLocalMode() == false );
				return;
			}
			
			// > 电脑端（B文件载体）
			if( StorageManager.isLocalMode() ){
				if( Imported.Drill_CoreOfString ){
					var os = require('os');  //『文件载体-fs』
					if( type == "获取-电脑端-操作系统类型" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.platform ){
							$gameStrings.setValue( Number(temp2), String(os.platform()) );
						}
						return;
					}
					if( type == "获取-电脑端-操作系统名" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.type ){
							$gameStrings.setValue( Number(temp2), String(os.type()) );
						}
						return;
					}
					if( type == "获取-电脑端-内核版本号" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.release ){
							$gameStrings.setValue( Number(temp2), String(os.release()) );
						}
						return;
					}
					if( type == "获取-电脑端-计算机名" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.hostname ){
							$gameStrings.setValue( Number(temp2), String(os.hostname()) );
						}
						return;
					}
					
					if( type == "获取-电脑端-用户名" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.userInfo ){
							$gameStrings.setValue( Number(temp2), String(os.userInfo().username) );
						}
						return;
					}
					if( type == "获取-电脑端-用户ID" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.userInfo ){
							$gameStrings.setValue( Number(temp2), String(os.userInfo().uid) );
						}
						return;
					}
					if( type == "获取-电脑端-用户组ID" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.userInfo ){
							$gameStrings.setValue( Number(temp2), String(os.userInfo().gid) );
						}
						return;
					}
					
					if( type == "获取-电脑端-CPU架构" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.arch ){
							$gameStrings.setValue( Number(temp2), String(os.arch()) );
						}
						return;
					}
					if( type == "获取-电脑端-CPU型号" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.cpus ){
							$gameStrings.setValue( Number(temp2), String(os.cpus()[0].model) );
						}
						return;
					}
					if( type == "获取-电脑端-CPU频率" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( os.cpus ){
							$gameStrings.setValue( Number(temp2), String(os.cpus()[0].speed *0.001) +"GHz" );
						}
						return;
					}
					if( type == "获取-电脑端-CPU核心数" ){
						temp2 = temp2.replace("变量[","");
						temp2 = temp2.replace("]","");
						if( os.cpus ){
							$gameVariables.setValue( Number(temp2), Number(os.cpus().length) );
						}
						return;
					}
					if( type == "获取-电脑端-内存容量" ){
						temp2 = temp2.replace("变量[","");
						temp2 = temp2.replace("]","");
						if( os.totalmem ){
							$gameVariables.setValue( Number(temp2), Number(Math.ceil(os.totalmem() /1024/1024/1024)) );
						}
						return;
					}
				}
				
			// > 手机端（C网页载体）
			}else{
				if( Imported.Drill_CoreOfString ){
					if( type == "获取-手机端-浏览器信息" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( navigator.userAgent ){
							$gameStrings.setValue( Number(temp2), String(navigator.userAgent) );
						}
						return;
					}
					if( type == "获取-手机端-语言" ){
						temp2 = temp2.replace("字符串[","");
						temp2 = temp2.replace("]","");
						if( navigator.language ){
							$gameStrings.setValue( Number(temp2), String(navigator.language) );
						}
						return;
					}
				}
				
				if( type == "获取-手机端-Cookie开关" ){
					temp2 = temp2.replace("开关[","");
					temp2 = temp2.replace("]","");
					if( navigator.cookieEnabled ){
						$gameStrings.setValue( Number(temp2), String(navigator.cookieEnabled).toLowerCase() == "true" );
					}
					return;
				}
				if( type == "获取-手机端-联网状态" ){
					temp2 = temp2.replace("开关[","");
					temp2 = temp2.replace("]","");
					if( navigator.onLine ){
						$gameStrings.setValue( Number(temp2), String(navigator.onLine).toLowerCase() == "true" );
					}
					return;
				}
				
			}
		}
		
		/*-----------------信息校验------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp2 = String(args[3]);
			if( type == "当前存档是否在相同设备上运行" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DrillUp.g_GIM_isSameSave );
				return;
			}
		}
		
		/*-----------------系统判断------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp2 = String(args[3]);
			if( type == "获取-电脑端-是否为windows系统" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_OSType() == "windows" );
				return;
			}
			if( type == "获取-电脑端-是否为mac系统" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_OSType() == "mac" );
				return;
			}
			if( type == "获取-电脑端-是否为linux系统" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_OSType() == "linux" );
				return;
			}
			
			if( type == "获取-手机端-是否为ie浏览器" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_BrowserType() == "ie" );
				return;
			}
			if( type == "获取-手机端-是否为edge浏览器" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_BrowserType() == "edge" );
				return;
			}
			if( type == "获取-手机端-是否为opera浏览器" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_BrowserType() == "opera" );
				return;
			}
			if( type == "获取-手机端-是否为safari浏览器" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_BrowserType() == "safari" );
				return;
			}
			if( type == "获取-手机端-是否为chrome浏览器" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_BrowserType() == "chrome" );
				return;
			}
			if( type == "获取-手机端-是否为firefox浏览器" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_BrowserType() == "firefox" );
				return;
			}
		}
		
		/*-----------------系统判断2------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp2 = String(args[3]);
			if( type == "获取-电脑端-是否为windows7系统" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_OSType_windows() == "windows7" );
				return;
			}
			if( type == "获取-电脑端-是否为windows10系统" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_OSType_windows() == "windows10" );
				return;
			}
			if( type == "获取-电脑端-是否为windows11系统" ){
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameSwitches.setValue( temp2, DataManager.drill_GIM_getDevice_OSType_windows() == "windows11" );
				return;
			}
		}
	}
}


//=============================================================================
// ** ☆设备信息获取
//
//			说明：	> 此模块提供 设备信息获取 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 设备信息获取 - 获取字符串信息（开放函数）
//==============================
DataManager.drill_GIM_getDevice_Description = function(){
	var context = "";
	
	// > 电脑端（B文件载体）
    if( StorageManager.isLocalMode() ){
		context += "设备类型：电脑端";
		context += "（当前nodejs版本为";
		context += process.version;			//（process与window一样，是全局可用参数）
		context += "）";
		context += "\n\n";
		
		var os = require('os');  //『文件载体-fs』
		if( os.platform ){
			context += "操作系统类型：";	//比如 'linux', 'freebsd', 'darwin'(mac系统), 'win32'(windows系统必返回win32) 等字符串
			context += os.platform();
			context += "\n";
		}
		if( os.type ){
			context += "操作系统名：";		//比如 'Darwin', 'Windows_NT', 'Linux' 等字符串
			context += os.type();
			context += "\n";
		}
		if( os.release ){
			context += "内核版本号：";		//比如 '20.6.0' 字符串
			context += os.release();
			context += "\n";
		}
		if( os.hostname ){
			context += "计算机名：";		//比如 'DESKTOP-XXX' 字符串
			context += os.hostname();
			context += "\n";
		}
		
		context += "\n";
		if( os.userInfo ){
			context += "用户名：";
			context += os.userInfo().username;
			context += "\n";
			
			context += "用户ID：";
			context += os.userInfo().uid;
			context += "\n";
			
			context += "用户组ID：";
			context += os.userInfo().gid;
			context += "\n";
		}
		
		context += "\n";
		if( os.arch ){
			context += "CPU架构：";			//比如 'x64', 'arm', 'arm64', 'ia32' 等字符串
			context += os.arch();
			context += "\n";
		}
		if( os.cpus ){
			context += "CPU型号：";
			context += os.cpus()[0].model;
			context += "\n";
			context += "CPU频率：";
			context += String(os.cpus()[0].speed *0.001) +"GHz"; //（默认单位是MHz，转换一下）
			context += "\n";
			context += "CPU核心数：";
			context += os.cpus().length;
			context += "\n";
		}
		if( os.totalmem ){
			context += "内存容量：";
			context += String( Math.ceil(os.totalmem() /1024/1024/1024) ) +"GB"; //（默认单位是B字节，转换一下）
			context += "\n";
		}
	
	// > 手机端（C网页载体）
	}else{
		context += "设备类型：手机端";
		context += "\n\n";
		
		if( navigator.userAgent ){
			context += "浏览器信息：";			//返回一长串字符串
			context += navigator.userAgent;
			context += "\n";
		}
		if( navigator.language ){
			context += "语言：";				//比如 'zh-CN'
			context += navigator.language;
			context += "\n";
		}
		if( navigator.cookieEnabled ){
			context += "Cookie开关：";			//返回 'true'、'false'
			context += navigator.cookieEnabled;
			context += "\n";
		}
		if( navigator.onLine ){
			context += "联网状态：";			//返回 'true'、'false' （局域网也算联网）
			context += navigator.onLine;
			context += "\n";
		}
		//if( navigator.geolocation ){
		//	context += "地理位置：";			//这是一个服务对象，需要手动调用函数才能并得到浏览器回应，才能用
		//	context += JSON.stringify( navigator.geolocation );
		//	context += "\n";
		//}
		
		context += "\n";
		if( navigator.appCodeName ){
			context += "旧版兼容-编码：";		//始终为 'Mozilla' 字符串
			context += navigator.appCodeName;
			context += "\n";
		}
		if( navigator.appName ){
			context += "旧版兼容-名称：";		//始终为 'Netscape' 字符串（IE浏览器会返回'Microsoft Internet Explorer'）
			context += navigator.appName;
			context += "\n";
		}
		if( navigator.product ){
			context += "旧版兼容-引擎名：";		//始终为 'Gecko' 字符串
			context += navigator.product;
			context += "\n";
		}
		//if( navigator.appVersion ){
		//	context += "旧版兼容-版本号：";		//返回一长串字符串（与 userAgent 值相似，但是旧版）
		//	context += navigator.appVersion;
		//	context += "\n";
		//}
		//if( navigator.platform ){
		//	context += "旧版兼容-平台名：";		//返回错误的 'Win32' 字符串
		//	context += navigator.platform;
		//	context += "\n";
		//}
		
		/*
			可见链接： https://www.runoob.com/jsref/obj-navigator.html
			但最好问问deepseek。
		*/
	}
	return context;
};
//==============================
// * 设备信息获取 - 获取操作系统类型（开放函数）
//
//			说明：	> 该函数返回固定字符串："windows"、"mac"、"linux"、""。
//==============================
DataManager.drill_GIM_getDevice_OSType = function(){
    if( StorageManager.isLocalMode() == true ){
		var os = require('os');  //『文件载体-fs』
		if( os.platform ){
			var text = os.platform().toLowerCase();
			if( text.indexOf("darwin") != -1 ){
				return "mac";
			}
			if( text.indexOf("linux") != -1 ){
				return "linux";
			}
			if( text.indexOf("win32") != -1 ){
				return "windows";
			}
		}
	}
	return "";
};
//==============================
// * 设备信息获取 - 获取操作系统类型 - windows版本（开放函数）
//
//			说明：	> 该函数返回固定字符串："windows7"、"windows10"、"windows11"、""。
//==============================
DataManager.drill_GIM_getDevice_OSType_windows = function(){
    if( StorageManager.isLocalMode() == true ){
		var os = require('os');  //『文件载体-fs』
		if( os.platform && os.release ){
			var text = os.platform().toLowerCase();
			if( text.indexOf("win32") != -1 ){
				
				// > Windows 7
				text = os.release();
				if( text.indexOf("6.1") === 0 ){ return "windows7"; }
				// > Windows 8
				if( text.indexOf("6.2") === 0 ){ return "windows7"; }
				// > Windows 8.1
				if( text.indexOf("6.3") === 0 ){ return "windows7"; }
				
				if( text.indexOf("10.0") === 0 ){
					// > Windows 10
					var buildNumber = parseInt(text.split(".")[2]);
					if( buildNumber < 22000 ){
						return "windows10";
					}
					// > Windows 11
					return "windows11";
				}
			}
		}
	}
	return "";
};
//==============================
// * 设备信息获取 - 获取浏览器类型（开放函数）
//
//			说明：	> 该函数返回固定字符串："edge"、"opera"、"chrome"、"firefox"、"safari"、"ie"、""。
//==============================
DataManager.drill_GIM_getDevice_BrowserType = function(){
    if( StorageManager.isLocalMode() == false ){
		if( navigator.userAgent ){
			var text = navigator.userAgent;	//（检查的顺序很重要，因为有些字符串可能包含在其他浏览器中）
			if( text.indexOf("Edg") > -1 ){
				return "edge"; // 新版 Edge (基于 Chromium)
			}else if( text.indexOf("OPR") > -1 || text.indexOf("Opera") > -1 ){
				return "opera"; // Opera 或 Opera GX
			}else if( text.indexOf("Chrome") > -1 && text.indexOf("Edg") === -1 ){
				return "chrome"; 
			}else if( text.indexOf("Safari") > -1 ){
				if( text.indexOf("Firefox") > -1 ){
					return "firefox"; // Firefox 有时会包含 Safari 字样用于兼容
				}else if( text.indexOf("Edg") === -1 && text.indexOf("OPR") === -1 ){
					return "safari"; // 真正的 Safari 通常不包含 Chrome 或 Firefox 的关键词
				}else{
					// 如果前面 Chrome/Edge 没捕获到，这里可能是误判，暂时不处理
				}
			}else if( text.indexOf("Firefox") > -1 ){
				return "firefox";
			}else if( text.indexOf("MSIE") > -1 || text.indexOf("Trident") > -1 ){
				return "ie"; // IE 或 IE 兼容模式
			}
		}
	}
	return "";
};


//=============================================================================
// ** ☆设备信息校验
//
//			说明：	> 此模块提供 设备信息校验 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 设备信息校验 - 参数
//==============================
DrillUp.g_GIM_isSameSave = true;
//==============================
// * 设备信息校验 - 容器初始化（新游戏时）
//==============================
var _drill_GIM_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	_drill_GIM_createGameObjects.call( this );
	DrillUp.g_GIM_isSameSave = true;		//（新游戏时，刷新校验标记）
}
//==============================
// * 设备信息校验 - 保存存档时 - 数据获取
//==============================
var _drill_GIM_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = _drill_GIM_makeSaveContents.call(this);
	
	// > 相同存档时，保存信息
	if( DrillUp.g_GIM_isSameSave == true ){
		contents._drill_GIM_checkInfo = DataManager.drill_GIM_getInfoText();
	}
	
    return contents;
};
//==============================
// * 设备信息校验 - 载入存档时 - 数据赋值
//==============================
var _drill_GIM_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GIM_extractSaveContents.call( this, contents );
	
	// > 比对存档信息
	var info_text = contents._drill_GIM_checkInfo;
	if( info_text == undefined ){
		DrillUp.g_GIM_isSameSave = true;	//（空数据时，无法校验，认定为相同存档）
	}else{
		DrillUp.g_GIM_isSameSave = (info_text == DataManager.drill_GIM_getInfoText() );
	}
};
//==============================
// * 设备信息校验 - 获取校验信息（私有）
//==============================
DataManager.drill_GIM_getInfoText = function(){
	var info_text = "";
	
	// > 电脑端（B文件载体）
    if( StorageManager.isLocalMode() ){
		var os = require('os');  //『文件载体-fs』
		if( os.platform ){
			info_text += os.platform();	//操作系统类型
		}
		if( os.type ){
			info_text += os.type();		//操作系统名
		}
		if( os.release ){
			info_text += os.release();	//内核版本号
		}
		if( os.hostname ){
			info_text += os.hostname();	//计算机名
		}
		if( os.userInfo ){
			info_text += os.userInfo().username;	//用户名
			info_text += os.userInfo().uid;			//用户ID
		}
	
	// > 手机端（C网页载体）
	}else{
		if( navigator.userAgent ){
			info_text += navigator.userAgent;	//浏览器信息
		}
		if( navigator.language ){
			info_text += navigator.language;	//语言
		}
	}
	return info_text;
}

