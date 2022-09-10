//=============================================================================
// Drill_RouteCommandGroup.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        移动路线 - 指令集
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_RouteCommandGroup +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供一系列方便的路线指令。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfMoveRoute   移动路线-移动路线核心★★v1.7以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、事件指令的移动路线设置。
 * 2.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 指令集：
 *   (1.该插件提供了许多方便的 移动路线指令。注意，是移动路线的脚本。
 *      打开移动路线后，点击脚本，输入中文即可。
 *   (2."遇障碍结束"表示：如果移动遇到障碍，则当前这条指令直接无效，
 *      进入下一条指令。功能与"无法移动时跳过指令"相似，但是这里的
 *      指令不会产生过多的等待时间。
 * 旧版本：
 *   (1.旧版本的 移动路线核心 是包含指令集和路线记忆的各项功能的。
 *      新版本考虑到 插件性能优化 因素，所以将上述两大功能分离成了两个插件。
 *   (2.注意，部分旧版本的移动路线指令被修改为新的格式，
 *      比如 "上移10步" 被改为 ">指令集:上移:步数[n]" 。
 *      请用新的格式来写移动路线，因为旧的格式会增加性能消耗负担。
 * 设计：
 *   (1.持续执行移动路线">指令集:下移(遇障碍结束)"，可以模拟出简单的类似
 *      重力下落的效果，详细可以参考"解谜设计-消除砖块"。
 *      并且，如果改变事件页为"持续左移""持续上移"，即相当于物体的重力方
 *      向发生了变化。
 *   (2.">指令集:接近(只横向):玩家"可以用于设计专门挡玩家路的事件。
 *      这样玩家必须跑的更快，或者使用跳跃，才能通过那个事件。
 *   (3.">指令集:接近:鼠标"可以用于设计被鼠标控制的事件。
 *      比如可以拖拽的事件，详细可以参考 鼠标管理层 的可拖拽小爱丽丝。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 以下为移动路线指令快速指令，以及一些新加的功能指令：
 * 
 * 移动路线指令：>指令集:上移
 * 移动路线指令：>指令集:下移
 * 移动路线指令：>指令集:左移
 * 移动路线指令：>指令集:右移
 * 移动路线指令：>指令集:左下移
 * 移动路线指令：>指令集:左上移
 * 移动路线指令：>指令集:右下移
 * 移动路线指令：>指令集:右上移
 * 移动路线指令：>指令集:上移:步数[n]
 * 移动路线指令：>指令集:下移:步数[n]
 * 移动路线指令：>指令集:左移:步数[n]
 * 移动路线指令：>指令集:右移:步数[n]
 * 移动路线指令：>指令集:左下移:步数[n]
 * 移动路线指令：>指令集:左上移:步数[n]
 * 移动路线指令：>指令集:右下移:步数[n]
 * 移动路线指令：>指令集:右上移:步数[n]
 * 移动路线指令：>指令集:上移(遇障碍结束)
 * 移动路线指令：>指令集:下移(遇障碍结束)
 * 移动路线指令：>指令集:左移(遇障碍结束)
 * 移动路线指令：>指令集:右移(遇障碍结束)
 * 移动路线指令：>指令集:左下移(遇障碍结束)
 * 移动路线指令：>指令集:左上移(遇障碍结束)
 * 移动路线指令：>指令集:右下移(遇障碍结束)
 * 移动路线指令：>指令集:右上移(遇障碍结束)
 * 移动路线指令：>指令集:上移(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:下移(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:左移(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:右移(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:左下移(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:左上移(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:右下移(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:右上移(遇障碍结束):步数[n]
 * 
 * 移动路线指令：>指令集:前进
 * 移动路线指令：>指令集:后退
 * 移动路线指令：>指令集:前进:步数[n]
 * 移动路线指令：>指令集:后退:步数[n]
 * 移动路线指令：>指令集:前进(遇障碍结束)
 * 移动路线指令：>指令集:后退(遇障碍结束)
 * 移动路线指令：>指令集:前进(遇障碍结束):步数[n]
 * 移动路线指令：>指令集:后退(遇障碍结束):步数[n]
 * 
 * 移动路线指令：>指令集:随机移动
 * 移动路线指令：>指令集:随机移动(只横向)
 * 移动路线指令：>指令集:随机移动(只纵向)
 * 移动路线指令：>指令集:随机移动(遇障碍结束)
 * 移动路线指令：>指令集:随机移动:步数[n]
 * 移动路线指令：>指令集:随机移动(只横向):步数[n]
 * 移动路线指令：>指令集:随机移动(只纵向):步数[n]
 * 移动路线指令：>指令集:随机移动(遇障碍结束):步数[n]
 * 
 * 1.">指令集:前进" 表示事件前进一步。
 *   后面添加参数"步数[3]"，可以使得移动的指令变成3个前进的指令。
 * 2."遇障碍结束"表示：如果移动遇到障碍，则当前这条指令直接无效，
 *   进入下一条指令。功能与"无法移动时跳过指令"相似，但是这里的
 *   指令不会产生过多的等待时间。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 步数设置
 * 你可以设置事件之间保持某个距离值。
 * 
 * 移动路线指令：>指令集:上移:步数[n]
 * 移动路线指令：>指令集:上移:步数变量[n]
 * 
 * 1.该插件的所有指令，都可以在末尾设置 "步数[n]"和"步数变量[n]"。
 *   设置后，指令集数量会按照数量自动进行翻倍处理。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 接近/远离
 * 你可以设置事件之间保持某个距离值。
 * 
 * 移动路线指令：>指令集:接近:玩家
 * 移动路线指令：>指令集:接近:鼠标
 * 移动路线指令：>指令集:接近:事件[10]
 * 移动路线指令：>指令集:接近:事件变量[10]
 * 移动路线指令：>指令集:接近:位置[30,32]
 * 移动路线指令：>指令集:接近:位置变量[25,26]
 * 
 * 移动路线指令：>指令集:接近:玩家
 * 移动路线指令：>指令集:接近(只横向):玩家
 * 移动路线指令：>指令集:接近(只纵向):玩家
 * 移动路线指令：>指令集:远离:玩家
 * 移动路线指令：>指令集:远离(只横向):玩家
 * 移动路线指令：>指令集:远离(只纵向):玩家
 * 
 * 1.只横向/只纵向一般用于不封路却专门拦住玩家的事件。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 保持距离
 * 你可以设置事件之间保持某个距离值。
 * 
 * 移动路线指令：>指令集:保持距离:玩家:距离[5]
 * 移动路线指令：>指令集:保持距离:鼠标:距离[5]
 * 移动路线指令：>指令集:保持距离:事件[10]:距离[5]
 * 移动路线指令：>指令集:保持距离:事件变量[10]:距离[5]
 * 移动路线指令：>指令集:保持距离:位置[30,32]:距离[5]
 * 移动路线指令：>指令集:保持距离:位置变量[25,26]:距离[5]
 * 
 * 1."保持距离"判定范围为菱形区域，距离值为保持的菱形区域的距离大小。
 * 
 * -----------------------------------------------------------------------------
 * ----知识点 - 旧指令
 * 插件能够支持下列旧指令。
 * 
 * 移动路线指令(旧)：>下移10步
 * 移动路线指令(旧)：>左移10步
 * 移动路线指令(旧)：>右移10步
 * 移动路线指令(旧)：>上移10步
 * 移动路线指令(旧)：>左下移10步
 * 移动路线指令(旧)：>右下移10步
 * 移动路线指令(旧)：>右上移10步
 * 移动路线指令(旧)：>左上移10步
 * 移动路线指令(旧)：>前进10步
 * 移动路线指令(旧)：>后退10步
 * 移动路线指令(旧)：>随机移动(只横向)
 * 移动路线指令(旧)：>随机移动(只纵向)
 * 移动路线指令(旧)：>接近玩家(只横向)
 * 移动路线指令(旧)：>接近玩家(只纵向)
 * 移动路线指令(旧)：>远离玩家(只横向)
 * 移动路线指令(旧)：>远离玩家(只纵向)
 * 移动路线指令(旧)：>接近鼠标
 * 移动路线指令(旧)：>接近鼠标(只横向)
 * 移动路线指令(旧)：>接近鼠标(只纵向)
 * 移动路线指令(旧)：>远离鼠标
 * 移动路线指令(旧)：>远离鼠标(只横向)
 * 移动路线指令(旧)：>远离鼠标(只纵向)
 * 
 * 1.考虑到移动路线实时判定的性能问题，其他部分的旧指令被丢弃。
 *   建议使用现有的标准指令格式来写移动路线。
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
 * 时间复杂度： o(n)*o(事件移动路线) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【26.25ms】
 *              100个事件的地图中，平均消耗为：【14.14ms】
 *               50个事件的地图中，平均消耗为：【11.29ms】
 * 测试方法2：  消除砖块设计关卡。
 * 测试结果2：  150个持续下落砖块的测试，平均消耗为：【122.96ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于消除砖块设计关卡中，大量事件使用"移动12步(遇障碍结束)"指令，
 *   而且是循环不断地执行指令，使得低配电脑会有些吃不消。
 * 3.旧版本的插件在消除砖块设计关卡中消耗为 143.69ms 。
 *   经过优化后，降低到了 122.96ms，
 *   并且优化后，明显不会再出现第一次进入鼠标管理层卡爆的问题了。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了 移动路线指令转义 的功能。
 * [v1.2]
 * 修改了插件分类。
 * 
 * 
 *
 * @param 接近到重叠位置时是否停下
 * @type boolean
 * @on 停下
 * @off 随机移动
 * @desc 使用接近玩家/接近事件时，如果已经在目标位置下并且重叠，该事件停下。
 * @default true
 *
 * @param 接近/远离时是否随机
 * @type boolean
 * @on 随机
 * @off 固定
 * @desc 当接近/远离有两种方向选择时，事件会随机选择一个方向移动。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		RCG (Core_Of_Move_Route)
//		临时全局变量	DrillUp.g_RCG_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(事件移动路线) 每帧
//		★性能测试因素	鼠标管理层9个事件，消除砖块关卡125个事件
//		★性能测试消耗	75.95ms（drill_COMR_routeCommand）
//		★最坏情况		无
//		★备注			插件与原核心分离后，性能消耗也分离了。
//						浏览器中，高配电脑能稳定在18-20帧。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			移动路线指令集：
//				->遇障碍结束
//				->接近/远离
//					->玩家、事件、位置
//					->鼠标
//					->只横向/只纵向
//				->随机移动
//					->只横向/只纵向
//				->保持距离
//					->玩家、事件、位置
//					->鼠标
//
//		★必要注意事项：
//			1.留意继承 移动路线核心 的方式。
//			  一个接口是用来执行指令的，另一个接口是用来指令翻倍的。
//		
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_RouteCommandGroup = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_RouteCommandGroup');
	
	/*-----------------杂项------------------*/
    DrillUp.g_RCG_towardStop = String(DrillUp.parameters["接近到重叠位置时是否停下"] || "true") === "true";
    DrillUp.g_RCG_towardRandom = String(DrillUp.parameters["接近/远离时是否随机"] || "true") === "true";



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfMoveRoute ){


//=============================================================================
// * 指令执行阶段 - 执行指令（继承接口）
//=============================================================================
var _drill_RCG_routeCommand = Game_Character.prototype.drill_COMR_routeCommand;
Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
	_drill_RCG_routeCommand.call( this, command, args );
	if( command == ">指令集" ){
		
		if( args.length == 1 ){
			var type = String(args[0]);
			
			if( type == "下移" ){ this.moveStraight(2); }
			if( type == "左移" ){ this.moveStraight(4); }
			if( type == "右移" ){ this.moveStraight(6); }
			if( type == "上移" ){ this.moveStraight(8); }
			if( type == "左下移" ){ this.moveDiagonally(4, 2); }
			if( type == "右下移" ){ this.moveDiagonally(6, 2); }
			if( type == "左上移" ){ this.moveDiagonally(4, 8); }
			if( type == "右上移" ){ this.moveDiagonally(6, 8); }
			if( type == "前进" ){ this.moveForward(); }
			if( type == "后退" ){ this.moveBackward(); }
			if( type == "随机移动" ){ this.moveRandom(); }
			
			if( type == "下移(遇障碍结束)" ){ this.drill_RCG_moveStraight_skip(2); }
			if( type == "左移(遇障碍结束)" ){ this.drill_RCG_moveStraight_skip(4); }
			if( type == "右移(遇障碍结束)" ){ this.drill_RCG_moveStraight_skip(6); }
			if( type == "上移(遇障碍结束)" ){ this.drill_RCG_moveStraight_skip(8); }
			if( type == "左下移(遇障碍结束)" ){ this.drill_RCG_moveDiagonally_skip(4, 2); }
			if( type == "右下移(遇障碍结束)" ){ this.drill_RCG_moveDiagonally_skip(6, 2); }
			if( type == "左上移(遇障碍结束)" ){ this.drill_RCG_moveDiagonally_skip(4, 8); }
			if( type == "右上移(遇障碍结束)" ){ this.drill_RCG_moveDiagonally_skip(6, 8); }
			if( type == "前进(遇障碍结束)" ){ this.drill_RCG_moveForward_skip(); }
			if( type == "后退(遇障碍结束)" ){ this.drill_RCG_moveBackward_skip(); }
			if( type == "随机移动(遇障碍结束)" ){ this.drill_RCG_moveRandom_skip(); }
			
			if( type == "随机移动(只横向)" ){ this.drill_RCG_moveRandom_X(); }
			if( type == "随机移动(只纵向)" ){ this.drill_RCG_moveRandom_Y(); }
		}
		
		if( args.length == 2 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			
			/*-----------------接近------------------*/
			if( type == "接近" ){
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					this.moveTowardCharacter( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					this.moveTowardCharacter( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = Number(temp1[0]);
						pos['y'] = Number(temp1[1]);
						this.moveTowardCharacter( pos ); 
					}
				}
				else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = $gameVariables.value( Number(temp1[0]) );
						pos['y'] = $gameVariables.value( Number(temp1[1]) );
						this.moveTowardCharacter( pos ); 
					}
				}
				else if( temp1 == "玩家" ){
					this.moveTowardCharacter( $gamePlayer ); 
				}
				else if( temp1 == "鼠标" ){
					this.drill_RCG_moveTowardMouse(); 
				}
			}
			if( type == "接近(只横向)" ){
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					this.drill_RCG_moveTowardCharacter_X( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					this.drill_RCG_moveTowardCharacter_X( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = Number(temp1[0]);
						pos['y'] = Number(temp1[1]);
						this.drill_RCG_moveTowardCharacter_X( pos ); 
					}
				}
				else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = $gameVariables.value( Number(temp1[0]) );
						pos['y'] = $gameVariables.value( Number(temp1[1]) );
						this.drill_RCG_moveTowardCharacter_X( pos ); 
					}
				}
				else if( temp1 == "玩家" ){
					this.drill_RCG_moveTowardCharacter_X( $gamePlayer );
				}
				else if( temp1 == "鼠标" ){
					this.drill_RCG_moveTowardMouse_X(); 
				}
			}
			if( type == "接近(只纵向)" ){
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					this.drill_RCG_moveTowardCharacter_Y( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					this.drill_RCG_moveTowardCharacter_Y( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = Number(temp1[0]);
						pos['y'] = Number(temp1[1]);
						this.drill_RCG_moveTowardCharacter_Y( pos ); 
					}
				}
				else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = $gameVariables.value( Number(temp1[0]) );
						pos['y'] = $gameVariables.value( Number(temp1[1]) );
						this.drill_RCG_moveTowardCharacter_Y( pos ); 
					}
				}
				else if( temp1 == "玩家" ){
					this.drill_RCG_moveTowardCharacter_Y($gamePlayer);
				}
				else if( temp1 == "鼠标" ){
					this.drill_RCG_moveTowardMouse_Y(); 
				}
			}
			/*-----------------远离------------------*/
			if( type == "远离" ){
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					this.moveAwayCharacter( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					this.moveAwayCharacter( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = Number(temp1[0]);
						pos['y'] = Number(temp1[1]);
						this.moveAwayCharacter( pos ); 
					}
				}
				else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = $gameVariables.value( Number(temp1[0]) );
						pos['y'] = $gameVariables.value( Number(temp1[1]) );
						this.moveAwayCharacter( pos ); 
					}
				}
				else if( temp1 == "玩家" ){
					this.moveAwayCharacter( $gamePlayer ); 
				}
				else if( temp1 == "鼠标" ){
					this.drill_RCG_moveAwayMouse(); 
				}
			}
			if( type == "远离(只横向)" ){
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					this.drill_RCG_moveAwayCharacter_X( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					this.drill_RCG_moveAwayCharacter_X( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = Number(temp1[0]);
						pos['y'] = Number(temp1[1]);
						this.drill_RCG_moveAwayCharacter_X( pos ); 
					}
				}
				else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = $gameVariables.value( Number(temp1[0]) );
						pos['y'] = $gameVariables.value( Number(temp1[1]) );
						this.drill_RCG_moveAwayCharacter_X( pos ); 
					}
				}
				else if( temp1 == "玩家" ){
					this.drill_RCG_moveAwayCharacter_X( $gamePlayer );
				}
				else if( temp1 == "鼠标" ){
					this.drill_RCG_moveAwayMouse_X(); 
				}
			}
			if( type == "远离(只纵向)" ){
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					this.drill_RCG_moveAwayCharacter_Y( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					this.drill_RCG_moveAwayCharacter_Y( $gameMap.event(temp1) ); 
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = Number(temp1[0]);
						pos['y'] = Number(temp1[1]);
						this.drill_RCG_moveAwayCharacter_Y( pos ); 
					}
				}
				else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = $gameVariables.value( Number(temp1[0]) );
						pos['y'] = $gameVariables.value( Number(temp1[1]) );
						this.drill_RCG_moveAwayCharacter_Y( pos ); 
					}
				}
				else if( temp1 == "玩家" ){
					this.drill_RCG_moveAwayCharacter_Y($gamePlayer);
				}
				else if( temp1 == "鼠标" ){
					this.drill_RCG_moveAwayMouse_Y(); 
				}
			}
		}
		
		if( args.length == 3 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			var temp2 = String(args[2]);
			
			/*-----------------保持距离------------------*/
			if( type == "保持距离" ){
				temp2 = temp2.replace("距离[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					this.drill_RCG_keepDistance( $gameMap.event(temp1), temp2 ); 
				}
				else if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
					this.drill_RCG_keepDistance( $gameMap.event(temp1), temp2 ); 
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = Number(temp1[0]);
						pos['y'] = Number(temp1[1]);
						this.drill_RCG_keepDistance( pos, temp2 ); 
					}
				}
				else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 2 ){
						var pos = {};
						pos['x'] = $gameVariables.value( Number(temp1[0]) );
						pos['y'] = $gameVariables.value( Number(temp1[1]) );
						this.drill_RCG_keepDistance( pos, temp2 ); 
					}
				}
				else if( temp1 == "玩家" ){
					this.drill_RCG_keepDistance( $gamePlayer, temp2 ); 
				}
				else if( temp1 == "鼠标" ){
					this.drill_RCG_mouseKeepDistance(); 
				}
			}
		}
		
	}else if( command == ">随机移动(只横向)" ){
		this.drill_RCG_moveRandom_X();
	}else if( command == ">随机移动(只纵向)" ){
		this.drill_RCG_moveRandom_Y();
	
	}else if( command == ">接近玩家(只横向)" ){
		this.drill_RCG_moveTowardCharacter_X($gamePlayer);
	}else if( command == ">接近玩家(只纵向)" ){
		this.drill_RCG_moveTowardCharacter_Y($gamePlayer);
		
	}else if( command == ">远离玩家(只横向)" ){
		this.drill_RCG_moveAwayCharacter_X($gamePlayer);
	}else if( command == ">远离玩家(只纵向)" ){
		this.drill_RCG_moveAwayCharacter_Y($gamePlayer);
		
	}else if( command == ">接近鼠标(只横向)" ){
		this.drill_RCG_moveTowardMouse_X();
	}else if( command == ">接近鼠标(只纵向)" ){
		this.drill_RCG_moveTowardMouse_Y();
	}else if( command == ">接近鼠标" ){
		this.drill_RCG_moveTowardMouse();
		
	}else if( command == ">远离鼠标(只横向)" ){
		this.drill_RCG_moveAwayMouse_X();
	}else if( command == ">远离鼠标(只纵向)" ){
		this.drill_RCG_moveAwayMouse_Y();
	}else if( command == ">远离鼠标" ){
		this.drill_RCG_moveAwayMouse();
	}
}


//=============================================================================
// * 脚本转义阶段 - 执行转义（继承接口）
//=============================================================================
var _drill_RCG_routeTransform = Game_Character.prototype.drill_COMR_routeTransform;
Game_Character.prototype.drill_COMR_routeTransform = function( command, args ){
	_drill_RCG_routeTransform.call( this, command, args );
	if( command == ">指令集" ){
		
		/*-----------------步数叠加------------------*/
		var step = String(args[args.length-1]);
		if( step != undefined ){
			if( step.indexOf("步数[") != -1 ){
				step = step.replace("步数[","");
				step = step.replace("]","");
				step = Number(step);
				args.pop();
				var route_list = [];
				for( var i=0; i < step; i++ ){
					var _script = command + ":" + args.join(":");
					route_list.push( {code:45,parameters:[_script]} );	//（去掉步数参数，将剩余指令复制n次）
				}
				this.drill_COMR_routeSubmit_Transform( route_list );
				
			}else if( step.indexOf("步数变量[") != -1 ){
				step = step.replace("步数变量[","");
				step = step.replace("]","");
				step = $gameVariables.value( Number(step) );
				args.pop();
				var route_list = [];
				for( var i=0; i < step; i++ ){
					var _script = command + ":" + args.join(":");
					route_list.push( {code:45,parameters:[_script]} );
				}
				this.drill_COMR_routeSubmit_Transform( route_list );
			}
		}
	}
	
	/*-----------------部分旧指令------------------*/
	if( command.match( /^>下移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:1});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>左移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:2});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>右移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:3});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>上移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:4});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>左下移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:5});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>右下移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:6});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>右上移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:7});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>左上移(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:8});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>前进(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:12});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
		
	}else if( command.match( /^>后退(\d+)步/ ) ){
		var route_list = [];
		for( var i=0; i < Number(RegExp.$1); i++){
			route_list.push({code:13});
		}
		this.drill_COMR_routeSubmit_Transform( route_list );
	}
}


//=============================================================================
// * 遇障碍结束
//=============================================================================
//==============================
// * 遇障碍结束 - 直线移动
//==============================
Game_Character.prototype.drill_RCG_moveStraight_skip = function( d ){
	if( this.canPass(this._x, this._y, d) ){
		this.moveStraight(d);
	}else{
		this.drill_COMR_skipToNext();
	}
};
//==============================
// * 遇障碍结束 - 对角移动
//==============================
Game_Character.prototype.drill_RCG_moveDiagonally_skip = function( horz, vert ){
	if( this.canPassDiagonally(this._x, this._y, horz, vert) ){
		this.moveDiagonally(horz, vert);
	}else{
		this.drill_COMR_skipToNext();
	}
};
//==============================
// * 遇障碍结束 - 前进一步
//==============================
Game_Character.prototype.drill_RCG_moveForward_skip = function(){
    this.drill_RCG_moveStraight_skip(this.direction());
};
//==============================
// * 遇障碍结束 - 后退一步
//
//			说明：	后退时，朝向会锁定。
//==============================
Game_Character.prototype.drill_RCG_moveBackward_skip = function(){
    var lastDirectionFix = this.isDirectionFixed();
    this.setDirectionFix(true);
    this.drill_RCG_moveStraight_skip(this.reverseDir(this.direction()));
    this.setDirectionFix(lastDirectionFix);
};
//==============================
// * 遇障碍结束 - 随机移动
//==============================
Game_Character.prototype.drill_RCG_moveRandom_skip = function(){
    var d = 2 + Math.randomInt(4) * 2;
    if( this.canPass(this.x, this.y, d) ){
        this.drill_RCG_moveStraight_skip(d);
    }
};


//=============================================================================
// * 接近/远离
//=============================================================================
//==============================
// * 路线动作 - 接近物体（修正）
//==============================
var _drill_RCG_moveTowardCharacter = Game_Character.prototype.moveTowardCharacter;
Game_Character.prototype.moveTowardCharacter = function( character ){
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		if( DrillUp.g_RCG_towardStop ){
			return;
		}else{
			this.moveRandom();
			return;
		}
	}
	if( DrillUp.g_RCG_towardRandom ){
		if( sx != 0 && sy != 0 ){
			if ( !this.canPass(this.x, this.y, sx > 0 ? 4 : 6) && !this.canPass(this.x, this.y, sy > 0 ? 8 : 2)  ){
				return;
			}
			if( Math.randomInt(2) == 0 ){
				this.moveStraight(sx > 0 ? 4 : 6);
				if (!this.isMovementSucceeded() && sy !== 0 ){
					this.moveStraight(sy > 0 ? 8 : 2);
				}
			}else{
				this.moveStraight(sy > 0 ? 8 : 2);
				if (!this.isMovementSucceeded() && sx !== 0 ){
					this.moveStraight(sx > 0 ? 4 : 6);
				}
			}
			return;
		}
	}
	_drill_RCG_moveTowardCharacter.call(this,character);
}
//==============================
// * 路线动作 - 接近物体 - 只横向
//==============================
Game_Character.prototype.drill_RCG_moveTowardCharacter_X = function(character ){
    var sx = this.deltaXFrom(character.x);
	if( sx == 0 ){
		this.turnTowardCharacter(character);
	}else{
		this.moveStraight(sx > 0 ? 4 : 6);
	}
};
//==============================
// * 路线动作 - 接近物体 - 只纵向
//==============================
Game_Character.prototype.drill_RCG_moveTowardCharacter_Y = function(character ){
    var sy = this.deltaYFrom(character.y);
	if( sy == 0 ){
		this.turnTowardCharacter(character);
	}else{
		this.moveStraight(sy > 0 ? 8 : 2);
	}
}
//==============================
// * 路线动作 - 接近鼠标
//==============================
Game_Character.prototype.drill_RCG_moveTowardMouse = function( ){
	var m = this.drill_RCG_getMousePoint();
	this.moveTowardCharacter(m);
}
//==============================
// * 路线动作 - 接近鼠标 - 只横向
//==============================
Game_Character.prototype.drill_RCG_moveTowardMouse_X = function( ){
	var m = this.drill_RCG_getMousePoint();
	this.drill_RCG_moveTowardCharacter_X(m);
}
//==============================
// * 路线动作 - 接近鼠标 - 只纵向
//==============================
Game_Character.prototype.drill_RCG_moveTowardMouse_Y = function( ){
	var m = this.drill_RCG_getMousePoint();
	this.drill_RCG_moveTowardCharacter_Y(m);
}

//==============================
// * 路线动作 - 远离物体（修正）
//==============================
var _drill_RCG_moveAwayFromCharacter = Game_Character.prototype.moveAwayFromCharacter;
Game_Character.prototype.moveAwayFromCharacter = function(character ){
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		this.moveRandom();
		return;
	}
	if( DrillUp.g_RCG_towardRandom ){
		if( sx != 0 && sy != 0 ){
			if ( !this.canPass(this.x, this.y, sx > 0 ? 6 : 4) && !this.canPass(this.x, this.y, sy > 0 ? 2 : 8)  ){
				return;
			}
			if( Math.randomInt(2) == 0 ){
				this.moveStraight(sx > 0 ? 6 : 4);
				if (!this.isMovementSucceeded() && sy !== 0 ){
					this.moveStraight(sy > 0 ? 2 : 8);
				}
			}else{
				this.moveStraight(sy > 0 ? 2 : 8);
				if (!this.isMovementSucceeded() && sx !== 0 ){
					this.moveStraight(sx > 0 ? 6 : 4);
				}
			}
			return;
		}
	}
	_drill_RCG_moveAwayFromCharacter.call(this,character);
}
//==============================
// * 路线动作 - 远离物体 - 只横向
//==============================
Game_Character.prototype.drill_RCG_moveAwayCharacter_X = function(character ){
    var sx = this.deltaXFrom(character.x);
	this.moveStraight(sx > 0 ? 6 : 4);
};
//==============================
// * 路线动作 - 远离物体 - 只纵向
//==============================
Game_Character.prototype.drill_RCG_moveAwayCharacter_Y = function(character ){
    var sy = this.deltaYFrom(character.y);
	this.moveStraight(sy > 0 ? 2 : 8);
}
//==============================
// * 路线动作 - 远离鼠标
//==============================
Game_Character.prototype.drill_RCG_moveAwayMouse = function( ){
	var m = this.drill_RCG_getMousePoint();
	this.moveAwayFromCharacter(m);
}
//==============================
// * 路线动作 - 远离鼠标 - 只横向
//==============================
Game_Character.prototype.drill_RCG_moveAwayMouse_X = function( ){
	var m = this.drill_RCG_getMousePoint();
	this.drill_RCG_moveAwayCharacter_X(m);
}
//==============================
// * 路线动作 - 远离鼠标 - 只纵向
//==============================
Game_Character.prototype.drill_RCG_moveAwayMouse_Y = function( ){
	var m = this.drill_RCG_getMousePoint();
	this.drill_RCG_moveAwayCharacter_Y(m);
}

//==============================
// * 路线动作 - 随机移动 - 只横向
//==============================
Game_Character.prototype.drill_RCG_moveRandom_X = function( ){
    var d = 4 + Math.randomInt(2) * 2;
    if (this.canPass(this.x, this.y, d) ){
        this.moveStraight(d);
    }
};
//==============================
// * 路线动作 - 随机移动 - 只纵向
//==============================
Game_Character.prototype.drill_RCG_moveRandom_Y = function( ){
    var d = 2 + Math.randomInt(2) * 6;
    if (this.canPass(this.x, this.y, d) ){
        this.moveStraight(d);
    }
};


//=============================================================================
// ** 保持距离
//=============================================================================
//==============================
// * 保持距离 - 物体保持距离
//==============================
Game_Character.prototype.drill_RCG_keepDistance = function( character, distance ){
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		this.moveRandom();
	}
	if( Math.abs(sx) + Math.abs(sy) == distance ){
		this.turnTowardCharacter(character);
	}
	if( Math.abs(sx) + Math.abs(sy) > distance ){
		this.moveTowardCharacter(character);
	}
	if( Math.abs(sx) + Math.abs(sy) < distance ){
		this.moveAwayFromCharacter(character);
	}
}
//==============================
// * 保持距离 - 鼠标保持距离
//==============================
Game_Character.prototype.drill_RCG_mouseKeepDistance = function( distance ){
	var m = this.drill_RCG_getMousePoint();
	this.drill_RCG_keepDistance(m,distance);
}


//=============================================================================
// ** 鼠标 - 获取点
//=============================================================================
Game_Character.prototype.drill_RCG_getMousePoint = function( ){
	
	// > 鼠标坐标
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	
	// > 镜头缩放【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){	//（事件处于 下层、中层、上层 之间）
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );	
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );	
	}
	
	// > 坐标转换
	var m = {}
	m.x = Math.floor( $gameMap._displayX + mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + mouse_y / $gameMap.tileHeight() );
	
	return m;
}
//=============================================================================
// ** 鼠标 - 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event ){		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}
if( typeof(_drill_touchPad_getCurPos) == "undefined" ){	//防止重复定义
	
	var _drill_touchPad_getCurPos = TouchInput._onTouchMove;
	TouchInput._onTouchMove = function(event ){
		_drill_touchPad_getCurPos.call(this,event);	//触屏位置
			
		if(event.changedTouches && event.changedTouches[0]){
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
	};
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_RouteCommandGroup = false;
		alert(
			"【Drill_RouteCommandGroup.js 移动路线 - 指令集】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfMoveRoute 移动路线-移动路线核心"
		);
}
