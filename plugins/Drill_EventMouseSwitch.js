//=============================================================================
// Drill_EventMouseSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 鼠标响应开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventMouseSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 鼠标响应开关指只要 鼠标执行点击操作 就能触发事件的开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。并且可以与其他插件扩展。
 * 基于：
 *   - Drill_CoreOfInput        系统-输入设备核心
 *     通过该核心才能进行鼠标控制操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   只作用于事件，单独对鼠标有效。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 * 传感器：
 *   (1.该插件被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      鼠标点击时，触发事件的独立开关。
 *   (2.该插件的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 输入设备：
 *   (1.插件只对鼠标有效。
 *   (2.插件只支持 物理按键，不支持 逻辑按键。
 *      按键介绍可以去看看 "1.系统 > 关于输入设备核心（入门篇）.docx"。
 * 鼠标的物理按键：
 *   (1.鼠标有三个键位：左键、中键/滚轮、右键。鼠标中键与鼠标滚轮是同一个键。
 *      鼠标滚轮的 上滚和下滚 只在特殊情况下能支持，需要看具体应用场景。
 * 细节：
 *   (1.该插件没有"悬停"二字，地图中只要有任何鼠标操作，就都能触发该插件的开关。
 *   (2.你可以设置对话框弹出时，鼠标仍然可触发事件。
 *      但是，事件指令仍然会被阻塞，只有对话框结束后才会执行事件的指令。
 * 设计：
 *   (1.你可以设置一个事件，监听 地图内 任何一个鼠标操作。
 *      在剧情进行时，对话全部是固定时间播放。
 *      只要鼠标有点击操作，则触发"是否要跳过剧情？"的流程。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要给指定的开关事件添加下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-左键按下
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 左键按下时开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 左键没按时关闭
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-右键按下
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 右键按下时开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 右键没按时关闭
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-滚轮按下
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 滚轮按下时开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 滚轮没按时关闭
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发-左键按下" 就是 "左键按下时开启"的触发+"左键没按时关闭"的触发 两个触发。
 *   "绑定持续触发-右键按下" 就是 "右键按下时开启"的触发+"右键没按时关闭"的触发 两个触发。
 *   "绑定持续触发-滚轮按下" 就是 "滚轮按下时开启"的触发+"滚轮没按时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"左键没按时关闭"这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.注意，当前插件 "左键按下"、"右键按下"、"滚轮按下" 这三类，
 *   每个独立开关只能绑定一个类型。
 * 3.只要鼠标 "左键按下"、"右键按下"、"滚轮按下" 就能触发，
 *   开关放在地图任何地方都能触发。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-左键按下(逆向)
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 左键按下时关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 左键没按时开启
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-右键按下(逆向)
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 右键按下时关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 右键没按时开启
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-滚轮按下(逆向)
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 滚轮按下时关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 滚轮没按时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发-左键按下(逆向)" 就是 "左键按下时关闭"的触发+"左键没按时开启"的触发 两个触发。
 *   "绑定持续触发-右键按下(逆向)" 就是 "右键按下时关闭"的触发+"右键没按时开启"的触发 两个触发。
 *   "绑定持续触发-滚轮按下(逆向)" 就是 "滚轮按下时关闭"的触发+"滚轮没按时开启"的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-左键按下
 * 事件注释：=>鼠标响应开关 : 独立开关[B] : 绑定持续触发-左键按下
 * 事件注释：=>鼠标响应开关 : 独立开关[C] : 绑定持续触发-左键按下(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 单次触发
 * 你可以写注释设计单次触发效果：
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键按下[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键按下[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键释放[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键释放[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键双击[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键双击[一帧]时 : 关闭
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键按下[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键按下[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键释放[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键释放[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键双击[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键双击[一帧]时 : 关闭
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮按下[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮按下[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮释放[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮释放[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮双击[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮双击[一帧]时 : 关闭
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮上滚时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮上滚时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮下滚时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-滚轮下滚时 : 关闭
 * 
 * 1.当前为单次触发，只在满足条件的那一帧执行一次开启/关闭。
 * 2.上述的指令互斥，每个独立开关只能绑定上述的一个类型。
 *   但有个例外，左键和右键 能叠加，后面内容"左键或右键"会提到。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 左键或右键
 * 除了前面介绍的各个指令，你还可以合并左键和右键：
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-左键或右键按下
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定持续触发-左键或右键按下(逆向)
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键或右键按下[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键或右键按下[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键或右键释放[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键或右键释放[一帧]时 : 关闭
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键或右键双击[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键或右键双击[一帧]时 : 关闭
 * 
 * 1.持续触发中，"左键或右键按下"表示 +左键 和 +右键 任意一个满足时，
 *   即可触发独立开关。
 *   单次触发中，"左键或右键按下[一帧]时"表示 +左键 和 +右键 任意一个满足时，
 *   即可开启/关闭一次独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 左键或右键合并
 * 你写多个注释，也能合并左键和右键：
 * 
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-左键按下[一帧]时 : 开启
 * 事件注释：=>鼠标响应开关 : 独立开关[A] : 绑定单次触发-右键按下[一帧]时 : 开启
 * 
 * 1.常规情况下，独立开关[A]只能绑定一个类型。
 *   但考虑到触发同一个开关情况，这里写"左键""右键"两个注释等同于直接写"左键或右键"。
 *   能实现 左键 或 右键 开启同一个独立开关的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>鼠标响应开关 : 对话框弹出时保持触发
 * 插件指令：>鼠标响应开关 : 对话框弹出时暂停触发
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 临时控制触发
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>鼠标响应开关 : 添加触发 : 本事件 : 独立开关[A] : 绑定持续触发-左键按下
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-左键按下
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件变量[21] : 独立开关[A] : 绑定持续触发-左键按下
 * 插件指令：>鼠标响应开关 : 添加触发 : 批量事件[10,11] : 独立开关[A] : 绑定持续触发-左键按下
 * 插件指令：>鼠标响应开关 : 添加触发 : 批量事件变量[21,22] : 独立开关[A] : 绑定持续触发-左键按下
 * 
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-左键按下
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-右键按下
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-滚轮按下
 * 
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-左键按下[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-左键释放[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-左键双击[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-右键按下[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-右键释放[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-右键双击[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-滚轮按下[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-滚轮释放[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-滚轮双击[一帧]时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-滚轮上滚时 : 开启
 * 插件指令：>鼠标响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-滚轮下滚时 : 开启
 * 
 * 插件指令：>鼠标响应开关 : 去除触发 : 事件[10] : 独立开关[A]
 * 插件指令：>鼠标响应开关 : 去除触发 : 事件[10] : 全部独立开关
 * 
 * 1.插件指令前面部分（本事件）和后面设置（独立开关[A] : 绑定持续触发-左键按下）可以随意组合。
 *   一共有5*(3+11+2)种组合方式。
 * 2.注意，"添加触发"、"去除触发"的设置都只在当前地图有效，离开地图后失效。
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
 * 测试方法：   地图界面中，放置20个鼠标响应开关，进行鼠标触发等操作。
 * 测试结果：   200个事件的地图中，消耗为：【44.60ms】
 *              100个事件的地图中，消耗为：【26.23ms】
 *               50个事件的地图中，消耗为：【34.19ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于 鼠标响应开关 对全图有效，地图的鼠标开关放置多了，
 *   性能消耗会线性增加。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 对话框弹出时是否保持触发
 * @type boolean
 * @on 保持触发
 * @off 暂停触发
 * @desc 对话框弹出时，通常会暂停鼠标的事件触发监听。你可以设置弹出后仍然保持触发。
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EMoS (Event_Mouse_Switch)
//		临时全局变量	DrillUp.g_EMoS_xxx
//		临时局部变量	this._drill_EMoS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	设计-华容道
//		★性能测试消耗	44.6ms（drill_EMoS_updateSwitch）
//		★最坏情况		地图存在大量开关，都在帧刷新鼠标监听。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆事件注释
//			
//			->☆开关的属性
//			->☆鼠标响应开关容器
//			
//			->☆开关控制
//				->触发（持续）
//					->左键或右键
//				->触发（单次）
//					> 按下[一帧]
//					> 释放[一帧]
//					> 双击[一帧]
//					> 滚轮上滚
//					> 滚轮下滚
//					->左键或右键
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
//			无
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
	DrillUp.g_EMoS_PluginTip_curName = "Drill_EventMouseSwitch.js 物体-鼠标响应开关";
	DrillUp.g_EMoS_PluginTip_baseList = ["Drill_CoreOfInput.js 系统-输入设备核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EMoS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EMoS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EMoS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EMoS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EMoS_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EMoS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EMoS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventMouseSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventMouseSwitch');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EMoS_remainTrigger = String(DrillUp.parameters['对话框弹出时是否保持触发'] || "true") === "true";



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EMoS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){ 
	_drill_EMoS_pluginCommand.call(this, command, args);
	if( command === ">鼠标响应开关" ){
		
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "对话框弹出时保持触发" ){
				$gameSystem._drill_EMoS_remainTrigger = true;
			}
			if( temp1 == "对话框弹出时暂停触发" ){
				$gameSystem._drill_EMoS_remainTrigger = false;
			}
		}
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 4 ){		//（注意，第3个位置为事件对象）
			var unit = String(args[3]);
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EMoS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EMoS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EMoS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EMoS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 	
		
		/*-----------------持续触发------------------*/
		if( args.length == 8 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			var type = String(args[7]);
			if( a_type == "添加触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				
				for( var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					if( type == "绑定持续触发-左键按下" ){
						ch.drill_EMoS_setMouseType( switch_str, "左键按下[持续]" );
						ch.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						ch.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						ch.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						ch.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定持续触发-右键按下" ){
						ch.drill_EMoS_setMouseType( switch_str, "右键按下[持续]" );
						ch.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						ch.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						ch.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						ch.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定持续触发-滚轮按下" ){
						ch.drill_EMoS_setMouseType( switch_str, "滚轮按下[持续]" );
						ch.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						ch.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						ch.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						ch.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
				}
			}
		}
		/*-----------------单次触发------------------*/
		if( args.length == 10 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			var type = String(args[7]);
			var value = String(args[9]);
			if( a_type == "添加触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				if( value == "开启" ){ 
					value = true;
				}else{
					value = false;
				}
				
				for( var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					
					// > 单次触发 - 左键按下
					if( type == "绑定单次触发-左键按下[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "左键按下[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-左键释放[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "左键释放[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-左键双击[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "左键双击[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 单次触发 - 右键按下
					if( type == "绑定单次触发-右键按下[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "右键按下[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-右键释放[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "右键释放[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-右键双击[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "右键双击[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 单次触发 - 滚轮按下
					if( type == "绑定单次触发-滚轮按下[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "滚轮按下[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮释放[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "滚轮释放[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮双击[一帧]时" ){
						ch.drill_EMoS_setMouseType( switch_str, "滚轮双击[一帧]" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮上滚时" ){
						ch.drill_EMoS_setMouseType( switch_str, "滚轮上滚" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮下滚时" ){
						ch.drill_EMoS_setMouseType( switch_str, "滚轮下滚" );
						ch.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
				}
			}
		}
		/*-----------------去除触发------------------*/
		if( args.length == 6 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			if( a_type == "去除触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				
				if( switch_str == "全部独立开关" ){
					for( var i = 0; i < c_chars.length; i++ ){
						var ch = c_chars[i];
						ch.drill_EMoS_clearSwitchList();
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
				}else{
					for( var i = 0; i < c_chars.length; i++ ){
						var ch = c_chars[i];
						ch.drill_EMoS_removeSwitch( switch_str );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
				}
			}
		}
	};
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EMoS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EMoS_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};

	
//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EMoS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EMoS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EMoS_sys_initialize.call(this);
	this.drill_EMoS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EMoS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EMoS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EMoS_saveEnabled == true ){	
		$gameSystem.drill_EMoS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EMoS_initSysData();
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
Game_System.prototype.drill_EMoS_initSysData = function() {
	this.drill_EMoS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EMoS_checkSysData = function() {
	this.drill_EMoS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EMoS_initSysData_Private = function() {
	
	this._drill_EMoS_remainTrigger = DrillUp.g_EMoS_remainTrigger;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EMoS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EMoS_remainTrigger == undefined ){
		this.drill_EMoS_initSysData();
	}
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EMoS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EMoS_event_initMembers.call(this);
	this._drill_EMoS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EMoS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EMoS_event_setupPage.call(this);
    this.drill_EMoS_setupMutiSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EMoS_setupMutiSwitch = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EMoS_isFirstBirth == true ){ 
		this._drill_EMoS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EMoS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EMoS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EMoS_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>鼠标响应开关" ){
				
				/*-----------------触发设置------------------*/	
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					
					// > 持续触发 - 左键按下
					if( type == "绑定持续触发-左键按下" ){
						this.drill_EMoS_setMouseType( switch_str, "左键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键按下时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "左键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键没按时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "左键按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定持续触发-左键按下(逆向)" ){
						this.drill_EMoS_setMouseType( switch_str, "左键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键按下时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "左键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键没按时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "左键按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 持续触发 - 右键按下
					if( type == "绑定持续触发-右键按下" ){
						this.drill_EMoS_setMouseType( switch_str, "右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "右键按下时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "右键没按时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "右键按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定持续触发-右键按下(逆向)" ){
						this.drill_EMoS_setMouseType( switch_str, "右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "右键按下时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "右键没按时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "右键按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 持续触发 - 滚轮按下
					if( type == "绑定持续触发-滚轮按下" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "滚轮按下时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "滚轮没按时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定持续触发-滚轮按下(逆向)" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "滚轮按下时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "滚轮没按时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 持续触发 - 左键或右键按下
					if( type == "绑定持续触发-左键或右键按下" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键或右键按下时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键或右键没按时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定持续触发-左键或右键按下(逆向)" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键或右键按下时关闭" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键按下[持续]" );
						this.drill_EMoS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "左键或右键没按时开启" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键按下[持续]" );
						this.drill_EMoS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
				}
				if( args.length == 6 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var value = String(args[5]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( value == "开启" ){ 
						value = true;
					}else{
						value = false;
					}
					
					// > 单次触发 - 左键按下
					if( type == "绑定单次触发-左键按下[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "左键按下[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-左键释放[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "左键释放[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-左键双击[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "左键双击[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 单次触发 - 右键按下
					if( type == "绑定单次触发-右键按下[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "右键按下[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-右键释放[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "右键释放[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-右键双击[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "右键双击[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 单次触发 - 滚轮按下
					if( type == "绑定单次触发-滚轮按下[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮按下[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮释放[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮释放[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮双击[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮双击[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮上滚时" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮上滚" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-滚轮下滚时" ){
						this.drill_EMoS_setMouseType( switch_str, "滚轮下滚" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					
					// > 单次触发 - 左键或右键按下
					if( type == "绑定单次触发-左键或右键按下[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键按下[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-左键或右键释放[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键释放[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
					}
					if( type == "绑定单次触发-左键或右键双击[一帧]时" ){
						this.drill_EMoS_setMouseType( switch_str, "左键或右键双击[一帧]" );
						this.drill_EMoS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoS_needRestatistics = true;
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
var _drill_EMoS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EMoS_switchData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EMoS_switch_initialize.call(this);
}
//==============================
// * 开关的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Character.prototype.drill_EMoS_checkSwitchData = function(){	
	if( this._drill_EMoS_switchData != undefined ){ return; }
	this._drill_EMoS_switchData = {};
	this._drill_EMoS_switchData['switch'] = {};					//独立开关容器
}
//==============================
// * 开关的属性 - 初始化 独立开关容器
//
//			说明：	> 注意，鼠标响应开关能控制多个独立开关。
//					> 层面关键字为：['switch']，一对多。
//==============================
Game_Character.prototype.drill_EMoS_checkSwitchData_Switch = function( switch_str ){
	this.drill_EMoS_checkSwitchData()
	if( this._drill_EMoS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['mouseType'] = 1;				//鼠标触发类型（使用数字表示类型，能减轻if判定消耗，见 drill_EMoS_setMouseType ）
	
	switch_data['triggeredOn'] = false;			//按下时开启（持续触发用）
	switch_data['notTriggeredOff'] = false;		//没按下时关闭（持续触发用）
	switch_data['triggeredOff'] = false;		//按下时关闭（持续触发用）
	switch_data['notTriggeredOn'] = false;		//没按下时开启（持续触发用）
	
	switch_data['onceValue'] = true;			//开关赋值（单次触发用）
	
	this._drill_EMoS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_EMoS_hasAnySwitch = function(){
	return this.drill_EMoS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_EMoS_getSwitchList = function(){
	if( this._drill_EMoS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_EMoS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_EMoS_removeSwitch = function( switch_str ){
	this.drill_EMoS_checkSwitchData()
	this._drill_EMoS_switchData['switch'][switch_str] = undefined;
	delete this._drill_EMoS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_EMoS_clearSwitchList = function(){
	this.drill_EMoS_checkSwitchData()
	this._drill_EMoS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时开启
//==============================
Game_Character.prototype.drill_EMoS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_EMoS_checkSwitchData();
	this.drill_EMoS_checkSwitchData_Switch( switch_str );
	this._drill_EMoS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时关闭
//==============================
Game_Character.prototype.drill_EMoS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_EMoS_checkSwitchData();
	this.drill_EMoS_checkSwitchData_Switch( switch_str );
	this._drill_EMoS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时关闭
//==============================
Game_Character.prototype.drill_EMoS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_EMoS_checkSwitchData();
	this.drill_EMoS_checkSwitchData_Switch( switch_str );
	this._drill_EMoS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时开启
//==============================
Game_Character.prototype.drill_EMoS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_EMoS_checkSwitchData();
	this.drill_EMoS_checkSwitchData_Switch( switch_str );
	this._drill_EMoS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 开关赋值
//==============================
Game_Character.prototype.drill_EMoS_setSwitch_OnceValue = function( switch_str, value ){
	this.drill_EMoS_checkSwitchData();
	this.drill_EMoS_checkSwitchData_Switch( switch_str );
	this._drill_EMoS_switchData['switch'][switch_str]['onceValue'] = value;
}
//==============================
// * 开关的属性 - 设置鼠标触发类型
//==============================
Game_Character.prototype.drill_EMoS_setMouseType = function( switch_str, type ){
	var result_type = -1;
	
	// > 持续触发
	if( type == "左键按下" || type == "左键按下[持续]" ){
		result_type = 1;
		
	}else if( type == "右键按下" || type == "右键按下[持续]" ){
		result_type = 2;
		
	}else if( type == "滚轮按下" || type == "滚轮按下[持续]" || type == "中键按下" || type == "中键按下[持续]" ){
		result_type = 3;
		
	}else if( type == "左键或右键按下" || type == "左键或右键按下[持续]" ){
		result_type = 9;
		
	
	// > 单次触发
	}else if( type == "左键按下[一帧]" ){
		result_type = 11;
	}else if( type == "左键释放[一帧]" ){
		result_type = 12;
	}else if( type == "左键双击[一帧]" ){
		result_type = 13;
		
	}else if( type == "右键按下[一帧]" ){
		result_type = 21;
	}else if( type == "右键释放[一帧]" ){
		result_type = 22;
	}else if( type == "右键双击[一帧]" ){
		result_type = 23;
		
	}else if( type == "滚轮按下[一帧]" || type == "中键按下[一帧]" ){
		result_type = 31;
	}else if( type == "滚轮释放[一帧]" || type == "中键按下[一帧]" ){
		result_type = 32;
	}else if( type == "滚轮双击[一帧]" || type == "中键按下[一帧]" ){
		result_type = 33;
	}else if( type == "滚轮上滚" ){
		result_type = 34;
	}else if( type == "滚轮下滚" ){
		result_type = 35;
		
	}else if( type == "左键或右键按下[一帧]" ){
		result_type = 91;
	}else if( type == "左键或右键释放[一帧]" ){
		result_type = 92;
	}else if( type == "左键或右键双击[一帧]" ){
		result_type = 93;
	}
	
	if( result_type == -1 ){ return; }
	this.drill_EMoS_checkSwitchData();
	this.drill_EMoS_checkSwitchData_Switch( switch_str );
	
	// > 持续触发 叠加（左键+右键 合并）
	var cur_type = this._drill_EMoS_switchData['switch'][switch_str]['mouseType'];
	if( cur_type == 1 && result_type == 2 ){ result_type = 9; }
	if( cur_type == 2 && result_type == 1 ){ result_type = 9; }
	
	// > 单次触发 叠加（左键+右键 合并）
	if( cur_type == 11 && result_type == 21 ){ result_type = 91; }
	if( cur_type == 21 && result_type == 11 ){ result_type = 91; }
	if( cur_type == 12 && result_type == 22 ){ result_type = 92; }
	if( cur_type == 22 && result_type == 12 ){ result_type = 92; }
	if( cur_type == 13 && result_type == 23 ){ result_type = 93; }
	if( cur_type == 23 && result_type == 13 ){ result_type = 93; }
	
	this._drill_EMoS_switchData['switch'][switch_str]['mouseType'] = result_type;
}


//=============================================================================
// ** ☆鼠标响应开关容器
//
//			说明：	> 此模块专门定义 鼠标响应开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EMoS_clearTemp = function(){
	this._drill_EMoS_switchTank = [];
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EMoS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EMoS_temp_initialize.call(this);
	this.drill_EMoS_clearTemp();
	this._drill_EMoS_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EMoS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EMoS_clearTemp();
	$gameTemp._drill_EMoS_needRestatistics = true;
	_drill_EMoS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EMoS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EMoS_clearTemp();
	$gameTemp._drill_EMoS_needRestatistics = true;
	_drill_EMoS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EMoS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EMoS_map_update.call( this, sceneActive );
	this.drill_EMoS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EMoS_updateRestatistics = function(){
	if( $gameTemp._drill_EMoS_needRestatistics != true ){ return }
	$gameTemp._drill_EMoS_needRestatistics = false;
	
	$gameTemp._drill_EMoS_switchTank = [];
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_EMoS_hasAnySwitch() ){
			$gameTemp._drill_EMoS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EMoS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EMoS_erase.call(this);
	if( this.drill_EMoS_hasAnySwitch() ){
		$gameTemp._drill_EMoS_needRestatistics = true;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 鼠标响应开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_EMoS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EMoS_map_update2.call( this, sceneActive );
	if( this.drill_EMoS_isOptimizationPassed() == false ){ return; }
	this.drill_EMoS_updateSwitch();
}
//==============================
// * 开关控制 - 帧刷新 - 优化策略
//==============================
Game_Map.prototype.drill_EMoS_isOptimizationPassed = function(){
	
	// > 地图中所有容器都为空时，不工作
	if( $gameTemp._drill_EMoS_switchTank.length == 0 ){
		return false;
	}
	return true;
}
//==============================
// * 开关控制 - 帧刷新
//==============================
Game_Map.prototype.drill_EMoS_updateSwitch = function(){
	
	// > 对话框弹出时是否仍然可触发
	if( ($gameMessage.isBusy() || SceneManager._scene.isBusy()) &&
		$gameSystem._drill_EMoS_remainTrigger == false ){
		return;
	}
	
	// > 鼠标响应开关
	for( var i = 0; i < $gameTemp._drill_EMoS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EMoS_switchTank[i];
		
		// > 数据 - switchData层面（与事件一对一）
		var switch_list = temp_switchEv.drill_EMoS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		
		// > 数据 - ['switch']层面（与事件一对多）
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			var cur_mouseType = temp_switchEv._drill_EMoS_switchData['switch'][cur_switch]['mouseType'];
			if( cur_mouseType < 10 ){
			
				// > 触发（持续）
				var isTriggered = false;
				if( cur_mouseType == 1 && TouchInput.drill_isLeftPressed() ){
					isTriggered = true;		//左键按下[持续]
				}
				if( cur_mouseType == 2 && TouchInput.drill_isRightPressed() ){
					isTriggered = true;		//右键按下[持续]
				}
				if( cur_mouseType == 3 && TouchInput.drill_isMiddlePressed() ){
					isTriggered = true;		//滚轮按下[持续]
				}
				if( cur_mouseType == 9 && 
					(TouchInput.drill_isLeftPressed() || TouchInput.drill_isRightPressed()) ){
					isTriggered = true;		//左键或右键按下[持续]
				}
				
				// > 触发（持续） - 按下时
				if( isTriggered ){
					
					if( temp_switchEv._drill_EMoS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
						this.drill_EMoS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							true
						);
					}
					if( temp_switchEv._drill_EMoS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
						this.drill_EMoS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							false
						);
					}
					
				// > 触发（持续） - 没按下时
				}else{
					
					if( temp_switchEv._drill_EMoS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
						this.drill_EMoS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							false
						);
					}
					if( temp_switchEv._drill_EMoS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
						this.drill_EMoS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							true
						);
					}
				}
			
			}else{
				
				// > 触发（单次）
				var canSetValue = false;
				
				if( cur_mouseType == 11 && TouchInput.drill_isLeftTriggerd() ){
					canSetValue = true;		//左键按下[一帧]
				}
				if( cur_mouseType == 12 && TouchInput.drill_isLeftReleased() ){
					canSetValue = true;		//左键释放[一帧]
				}
				if( cur_mouseType == 13 && TouchInput.drill_isLeftDoubled() ){
					canSetValue = true;		//左键双击[一帧]
				}
				
				if( cur_mouseType == 21 && TouchInput.drill_isRightTriggerd() ){
					canSetValue = true;		//右键按下[一帧]
				}
				if( cur_mouseType == 22 && TouchInput.drill_isRightReleased() ){
					canSetValue = true;		//右键释放[一帧]
				}
				if( cur_mouseType == 23 && TouchInput.drill_isRightDoubled() ){
					canSetValue = true;		//右键双击[一帧]
				}
				
				if( cur_mouseType == 31 && TouchInput.drill_isMiddleTriggerd() ){
					canSetValue = true;		//滚轮按下[一帧]
				}
				if( cur_mouseType == 32 && TouchInput.drill_isMiddleReleased() ){
					canSetValue = true;		//滚轮释放[一帧]
				}
				if( cur_mouseType == 33 && TouchInput.drill_isMiddleDoubled() ){
					canSetValue = true;		//滚轮双击[一帧]
				}
				if( cur_mouseType == 34 && TouchInput.drill_isWheelUp() ){
					canSetValue = true;		//滚轮上滚
				}
				if( cur_mouseType == 35 && TouchInput.drill_isWheelDown() ){
					canSetValue = true;		//滚轮下滚
				}
				
				if( cur_mouseType == 91 && 
					(TouchInput.drill_isLeftTriggerd() || TouchInput.drill_isRightTriggerd()) ){
					canSetValue = true;		//左键或右键按下[一帧]
				}
				if( cur_mouseType == 92 && 
					(TouchInput.drill_isLeftReleased() || TouchInput.drill_isRightReleased()) ){
					canSetValue = true;		//左键或右键释放[一帧]
				}
				if( cur_mouseType == 93 && 
					(TouchInput.drill_isLeftDoubled() || TouchInput.drill_isRightDoubled()) ){
					canSetValue = true;		//左键或右键双击[一帧]
				}
				
				// > 触发（单次） - 赋值一次
				if( canSetValue ){
					var cur_value = temp_switchEv._drill_EMoS_switchData['switch'][cur_switch]['onceValue'];
					this.drill_EMoS_setValue(
						temp_switchEv._eventId, 
						cur_switch, 
						cur_value
					);
				}
			}
		}
	}
};
//==============================
// * 开关控制 - 执行切换开关
//==============================
Game_Map.prototype.drill_EMoS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventMouseSwitch = false;
		var pluginTip = DrillUp.drill_EMoS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


