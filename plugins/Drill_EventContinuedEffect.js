//=============================================================================
// Drill_EventContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        行走图 - 持续动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventContinuedEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放事件持续播放的各种动作。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于核心插件，才能运行。
 * 基于：
 *   - Drill_CoreOfEventFrame        行走图-行走图优化核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 事件、玩家 。
 * 2.更多详细内容，去看看 "7.行走图 > 关于动作效果.docx"。
 * 细节：
 *   (1.所有动作都是并行的，你需要手动设置总时间。
 *      并且需要 等待 时，加等待指令。
 *   (2.持续动作 同时只能播放一种。
 *      所有 持续动作 都可以与消失/显现动作效果效果叠加，但不包括透明度的叠加。
 *      叠加效果要自己试，但叠加效果一般都不太好。
 *   (3.动作效果 与 动画序列 插件相互独立，可以叠加使用。
 *   (4.持续动作效果对镜像有效，只是倒影镜像的动作和事件本身的动作有
 *      旋转、缩放不对称的现象。
 * 指令：
 *   (1.透明度为0的事件不能执行持续动作效果。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 临时动作/永久动作：
 *   (1.插件指令的类型中，都有"总时间"控制，用于临时动作。
 *      你可以填写"总时间[无限]"，使得事件永久执行动作。
 *   (2.事件注释设置 跨事件页。
 *      并且注释为永久执行动作。
 * 完整流程动作：
 *   (1.含有"缓冲时间"、"开始时间"、"结束时间"的动作，
 *      都称为完整流程动作，都有一套 开始、持续、结束 的流程。
 *      比如"空中飘浮"、"旋转状态"、"缩放状态"等动作。
 *   (2.以"空中飘浮"动作为例，开始、结束的过程，会在"缓冲时间"内完成。
 *      持续150，缓冲60，则表示 开始过程60，结束过程60，中间过程150-60-60=30。
 *      "空中飘浮"可以设置"总时间[无限]"，如果要让其停下，
 *      使用"结束动作"指令即可。
 * 设计：
 *   (1.你可以用"空中飘浮"的持续动作注释，来让一个物品事件保持浮动。
 *   (2."左右震动(渐变)"的效果，可以简单模拟火车的发动引擎逐渐变快的
 *      过程。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行持续动作：
 * 
 * 插件指令：>持续动作 : 玩家 : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 玩家领队 : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 玩家全员 : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 玩家队员[1] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 玩家队员变量[21] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 事件[1] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 事件变量[1] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 批量事件[10,11] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 批量事件变量[21,22] : 标准闪烁 : 总时间[180] : 周期[30]
 * 
 * 插件指令：>持续动作 : 本事件 : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 渐变闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 顺时针旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 逆时针旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 垂直卡片旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 水平卡片旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 上下震动 : 总时间[180] : 周期[6] : 震动幅度[4]
 * 插件指令：>持续动作 : 本事件 : 左右震动 : 总时间[180] : 周期[6] : 震动幅度[4]
 * 插件指令：>持续动作 : 本事件 : 左右摇晃 : 总时间[180] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 本事件 : 钟摆摇晃 : 总时间[180] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 本事件 : 锚点摇晃 : 总时间[180] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 本事件 : 呼吸效果 : 总时间[180] : 周期[45] : 呼吸幅度[2]
 * 插件指令：>持续动作 : 本事件 : 原地小跳 : 总时间[180] : 周期[45] : 跳跃高度[20]
 * 插件指令：>持续动作 : 本事件 : 反复缩放 : 总时间[180] : 缓冲时间[10] : 周期[60] : 最小缩放[1.00] : 最大缩放[1.25]
 * 插件指令：>持续动作 : 本事件 : 空中飘浮 : 总时间[240] : 缓冲时间[60] : 飘浮高度[24] : 周期[30] : 幅度[3]
 * 插件指令：>持续动作 : 本事件 : 旋转状态 : 总时间[240] : 缓冲时间[60] : 旋转角度[90]
 * 插件指令：>持续动作 : 本事件 : 缩放状态 : 总时间[240] : 缓冲时间[60] : 缩放比例[1.5]
 * 插件指令：>持续动作 : 本事件 : 顺时针旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 逆时针旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 垂直卡片旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 水平卡片旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 上下震动(渐变) : 总时间[480] : 周期[6] : 震动幅度[12] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 左右震动(渐变) : 总时间[480] : 周期[6] : 震动幅度[12] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 左右摇晃(渐变) : 总时间[480] : 周期[8] : 摇晃幅度[25] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 钟摆摇晃(渐变) : 总时间[480] : 周期[8] : 摇晃幅度[25] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 本事件 : 锚点摇晃(渐变) : 总时间[480] : 周期[8] : 摇晃幅度[25] : 开始时间[180] : 结束时间[120]
 * 
 * 1.前半部分（玩家）和 后半部分（标准闪烁 : 总时间[180] : 周期[30]）
 *   的参数可以随意组合。一共有10*26种组合方式。
 * 2."玩家"和"玩家领队"是同一个意思。
 *   "玩家队员[1]"表示领队后面第一个跟随的队友。
 * 3.参数中"总时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"幅度"、"高度"的单位是像素。
 * 4.类型的更详细介绍，去看看 "7.行走图 > 关于动作效果.docx"。
 * 5."标准闪烁 : 总时间[180] : 周期[30]"表示：
 *    闪烁30帧，15帧透明，15帧不透明，持续180帧。也就是闪6次。
 * 6."旋转"类型中，一个周期旋转一整圈。
 *   持续60帧，周期30帧，则表示图像旋转两圈后结束。
 * 7.以"空中飘浮"动作为例，开始、结束的过程，会在"缓冲时间"内完成。
 *   持续150，缓冲60，则表示 开始过程60，结束过程60，中间过程150-60-60=30。
 *   "空中飘浮"可以设置"总时间[无限]"，如果要让其停下，
 *   使用"结束动作"指令即可。
 * 8."(渐变)"类型的效果，在结束动作后，都能够在原状态下慢慢减速停住。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>玩家持续效果 : 领队 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>玩家持续效果 : 指定队员 : 1 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>玩家持续效果 : 指定队员(变量) : 1 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>玩家持续效果 : 全部队员 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>事件持续效果 : 本事件 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>事件持续效果 : 指定事件 : 1 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>事件持续效果 : 指定事件(变量) : 1 : 标准闪烁 : 60 : 30
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 无限的时间
 * 你可以将上面插件指令的总时间中，填"无限"：
 * 
 * 插件指令：>持续动作 : 本事件 : 标准闪烁 : 总时间[无限] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 旋转状态 : 总时间[无限] : 缓冲时间[60] : 旋转角度[90]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 结束动作
 * 上述的部分类型中包含完整流程动作，你可以控制其结束：
 * 
 * 插件指令：>持续动作 : 本事件 : 空中飘浮 : 结束动作
 * 插件指令：>持续动作 : 本事件 : 旋转状态 : 结束动作
 * 插件指令：>持续动作 : 本事件 : 缩放状态 : 结束动作
 * 插件指令：>持续动作 : 本事件 : 顺时针旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 逆时针旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 垂直卡片旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 水平卡片旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 上下震动(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 左右震动(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 左右摇晃(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 钟摆摇晃(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 锚点摇晃(渐变) : 结束动作
 * 插件指令：>持续动作 : 本事件 : 立即终止动作
 * 
 * 1.含"缓冲时间"或"结束时间"的完整流程动作，可以使得该动作能够结束。
 *   而"立即终止动作"会直接终止所有动作，立即复原。
 * 2.如果你设置了"空中飘浮"为"总时间[无限]"，让其停下来可以使用"结束动作"指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 事件注释
 * 你可以直接添加事件注释，让一个事件永久持续某个效果。
 * 
 * 事件注释：=>持续动作 : 标准闪烁 : 周期[30]
 * 事件注释：=>持续动作 : 渐变闪烁 : 周期[30]
 * 事件注释：=>持续动作 : 顺时针旋转 : 周期[30]
 * 事件注释：=>持续动作 : 逆时针旋转 : 周期[30]
 * 事件注释：=>持续动作 : 垂直卡片旋转 : 周期[30]
 * 事件注释：=>持续动作 : 水平卡片旋转 : 周期[30]
 * 事件注释：=>持续动作 : 上下震动 : 周期[6] : 震动幅度[4]
 * 事件注释：=>持续动作 : 左右震动 : 周期[6] : 震动幅度[4]
 * 事件注释：=>持续动作 : 左右摇晃 : 周期[20] : 摇晃幅度[15]
 * 事件注释：=>持续动作 : 钟摆摇晃 : 周期[20] : 摇晃幅度[15]
 * 事件注释：=>持续动作 : 锚点摇晃 : 周期[20] : 摇晃幅度[15]
 * 事件注释：=>持续动作 : 呼吸效果 : 周期[45] : 呼吸幅度[2]
 * 事件注释：=>持续动作 : 原地小跳 : 周期[45] : 跳跃高度[20]
 * 事件注释：=>持续动作 : 反复缩放 : 周期[60] : 最小缩放[1.00] : 最大缩放[1.25]
 * 事件注释：=>持续动作 : 空中飘浮 : 飘浮高度[24] : 周期[30] : 幅度[3]
 * 事件注释：=>持续动作 : 旋转状态 : 旋转角度[90]
 * 事件注释：=>持续动作 : 缩放状态 : 缩放比例[1.5]
 * 
 * 1.注释加上后，直接为"总时间[无限]"。数字表示动作周期。
 *   如果要终止效果，可以使用插件指令终止。
 * 
 * 以下是旧版本的指令，也可以用：
 * 事件注释(旧)：=>事件持续效果 : 标准闪烁 : 30
 * 事件注释(旧)：=>事件持续效果 : 渐变闪烁 : 30
 * 事件注释(旧)：=>事件持续效果 : 顺时针旋转 : 30
 * 事件注释(旧)：=>事件持续效果 : 逆时针旋转 : 30
 * 事件注释(旧)：=>事件持续效果 : 垂直卡片旋转 : 30
 * 事件注释(旧)：=>事件持续效果 : 水平卡片旋转 : 30
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取状态
 * 你可以单独获取物体的状态信息，并赋值给开关或字符串：
 * 
 * 插件指令：>持续动作 : 玩家领队 : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 玩家队员[1] : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 玩家队员变量[21] : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 本事件 : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 事件[1] : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 事件变量[21] : 是否正在播放 : 开关[21]
 * 
 * 插件指令：>持续动作 : 事件[1] : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 事件[1] : 获取正在播放的类型 : 字符串[21]
 * 
 * 1.前半部分（事件）和 后半部分（是否正在播放 : 开关[21]）
 *   的参数可以随意组合。一共有6*2种组合方式。
 * 2.用开关值获取时，可以考虑设置并行执行时获取。
 * 3."字符串[21]"表示 字符串核心 中的字符串，
 *   如果当前没有播放的类型，则获取到 空字符串 。
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
 * 时间复杂度： o(n)*o(镜像)*o(贴图处理) 每帧
 * 测试方法：   行走图管理层放置10个持续动作变化的事件测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【12.62ms】
 *              100个事件的地图中，平均消耗为：【10.60ms】
 *               50个事件的地图中，平均消耗为：【8.30ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件经过一轮大优化，相比旧插件，减少了大概一半的性能消耗。
 *   不用担心设置太多事件并播放动作会卡的问题了。
 *   但还是留意播放动作的事件数量和消耗成正比，不要设置太多事件。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 * [v1.3]
 * 修改了插件指令格式。
 * [v1.4]
 * 添加了上下震动、左右摇晃、呼吸效果、空中飘浮 功能。
 * [v1.5]
 * 添加了 顺时针旋转(渐变)、上下震动(渐变) 等七种类型。
 * [v1.6]
 * 添加了 钟摆摇晃、锚点摇晃、钟摆摇晃(渐变)、锚点摇晃(渐变) 四个类型。
 * 添加了插件指令获取状态信息功能。
 * [v1.7]
 * 优化了数学缩短锚点的计算公式。
 * [v1.8]
 * 优化了内部结构，减少性能消耗。
 * [v1.9]
 * 修正了渐变效果的公式。
 * [v2.0]
 * 优化了内部结构，减小存档时数据占用的空间。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ECE（Event_Continued_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_ECE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(镜像)*o(贴图处理) 每帧
//		★性能测试因素	动作效果管理层
//		★性能测试消耗	2025/4/30：
//							》10.6ms（drill_ECE_updateBitmap）8.3ms（drill_ECE_updateEffect）
//		★最坏情况		所有事件都在执行动作。
//		★备注			插件已将动作函数全都分离了。因此播放动作时，指定函数能被性能测试捕获到。
//						插件的播放数据没被创建时，捕获不到任何消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆事件注释
//			
//			->☆玩家队员控制
//				->关闭透明度同步
//			->☆物体贴图控制
//			->☆物体的属性
//				->数学锚点变换问题
//				->结构优化（换成Game_Character）
//			->☆持续动作
//				->搜索『持续动作』查看所有动作
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			7.行走图 > 关于动作效果（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.【行走图 - 行走图优化核心】已包含了 固定帧初始值 功能，所以这里只要累加变化即可。
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
	DrillUp.g_ECE_PluginTip_curName = "Drill_EventContinuedEffect.js 行走图-持续动作效果";
	DrillUp.g_ECE_PluginTip_baseList = ["Drill_CoreOfEventFrame.js 行走图-行走图优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_ECE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_ECE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_ECE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_ECE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_ECE_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_ECE_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_ECE_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 时间计算不正确
	//==============================
	DrillUp.drill_ECE_getPluginTip_allTimeError = function( playing_type ){
		return "【" + DrillUp.g_ECE_PluginTip_curName + "】\n动作效果\""+playing_type+"\"播放失败，其配置的时间参数总和大于 总时间的值。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_ECE_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_ECE_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventContinuedEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventContinuedEffect');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventFrame ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_ECE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_ECE_pluginCommand.call(this, command, args);
	this.drill_ECE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_ECE_pluginCommand = function( command, args ){
	if( command === ">持续动作" ){ 
	
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		var p_chars = null;			// 玩家对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			
			if( p_chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				p_chars = [ $gamePlayer ];
			}
			if( p_chars == null && unit == "玩家全员" ){
				p_chars = $gamePlayer.followers().visibleFollowers();
				p_chars.unshift($gamePlayer);
			}
			if( p_chars == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var p_id = $gameVariables.value(Number(unit));
				if( p_id == -2 ){  //『玩家id』
					p_chars = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					p_chars = [];
					p_chars.push(group[ p_id-1 ]);
				}
			}
			if( p_chars == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var p_id = Number(unit);
				if( p_id == -2 ){  //『玩家id』
					p_chars = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					p_chars = [];
					p_chars.push(group[ p_id-1 ]);
				}
			}
		}
		// > 透明度检查
		if( p_chars != null ){
			if( $gamePlayer.opacity() == 0 ){
				p_chars = null;
			}
		}
		if( e_chars != null ){
			var temp_tank = [];
			for( var k=0; k < e_chars.length; k++ ){
				var e = e_chars[k];
				if( e.opacity() != 0 ){
					temp_tank.push( e );
				}
			}
			e_chars = temp_tank;
			if( e_chars.length == 0 ){
				e_chars = null;
			}
		}
		
		// > 未获取到对象，直接跳过
		if( e_chars == null && p_chars == null ){ return; }

		
		/*-----------------立即终止动作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即终止动作" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
					}
				}
			}
		}	
		
		/*-----------------获取状态------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "是否正在播放" || type == "是否正在播放持续动作" ){
				temp1 = temp1.replace("开关[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( e_chars != null){
					var b = false;
					for( var k=0; k < e_chars.length; k++ ){
						b = e_chars[k].drill_ECE_isPlaying();
					}
					$gameSwitches.setValue( temp1, b );
				}
				if( p_chars != null){
					var b = false;
					for( var k=0; k < p_chars.length; k++ ){
						b = p_chars[k].drill_ECE_isPlaying();
					}
					$gameSwitches.setValue( temp1, b );
				}
			}
			if( type == "获取正在播放的类型" && Imported.Drill_CoreOfString ){	//【系统 - 字符串核心】
				temp1 = temp1.replace("字符串[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( e_chars != null){
					var str = false;
					for( var k=0; k < e_chars.length; k++ ){
						str = e_chars[k].drill_ECE_getPlayingType();
					}
					$gameStrings.setValue( temp1, str );
				}
				if( p_chars != null){
					var str = false;
					for( var k=0; k < p_chars.length; k++ ){
						str = p_chars[k].drill_ECE_getPlayingType();
					}
					$gameStrings.setValue( temp1, str );
				}
			}
		}	
			
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			/*-----------------标准闪烁 - 开始------------------*/
			if( type == "标准闪烁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingFlicker( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingFlicker( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------渐变闪烁 - 开始------------------*/
			if( type == "渐变闪烁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingFlickerCos( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingFlickerCos( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------顺时针旋转 - 开始------------------*/
			if( type == "顺时针旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), 1 );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), 1 );
					}
				}
			}
			/*-----------------逆时针旋转 - 开始------------------*/
			if( type == "逆时针旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), -1 );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), -1 );
					}
				}
			}
			/*-----------------垂直卡片旋转 - 开始------------------*/
			if( type == "垂直卡片旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateVer( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateVer( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------水平卡片旋转 - 开始------------------*/
			if( type == "水平卡片旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateHor( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateHor( Number(temp1),Number(temp2) );
					}
				}
			}	
		}
		
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			/*-----------------上下震动 - 开始------------------*/
			if( type == "上下震动" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeUD( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeUD( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------左右震动 - 开始------------------*/
			if( type == "左右震动" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeLR( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeLR( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------左右摇晃 - 开始------------------*/
			if( type == "左右摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------钟摆摇晃 - 开始------------------*/
			if( type == "钟摆摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingPendulumRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingPendulumRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------锚点摇晃 - 开始------------------*/
			if( type == "锚点摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingAnchorRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingAnchorRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------呼吸效果 - 开始------------------*/
			if( type == "呼吸效果" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("呼吸幅度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingBreathing( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingBreathing( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------原地小跳 - 开始------------------*/
			if( type == "原地小跳" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("跳跃高度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingJumping( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingJumping( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------旋转状态 - 开始------------------*/
			if( type == "旋转状态" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("旋转角度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------缩放状态 - 开始------------------*/
			if( type == "缩放状态" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("缩放比例[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingResizeState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingResizeState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
		}
		
		if( args.length == 12 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			var temp4 = String(args[11]);
			/*-----------------顺时针旋转(渐变) - 开始------------------*/
			if( type == "顺时针旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),-1,Number(temp3),Number(temp4) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),-1,Number(temp3),Number(temp4) );
					}
				}
			}	
			/*-----------------逆时针旋转(渐变) - 开始------------------*/
			if( type == "逆时针旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),1,Number(temp3),Number(temp4) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),1,Number(temp3),Number(temp4) );
					}
				}
			}	
			/*-----------------垂直卡片旋转(渐变) - 开始------------------*/
			if( type == "垂直卡片旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateVer_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateVer_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}	
			/*-----------------水平卡片旋转(渐变) - 开始------------------*/
			if( type == "水平卡片旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateHor_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateHor_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}	
		}
		
		if( args.length == 14 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			var temp4 = String(args[11]);
			var temp5 = String(args[13]);
			/*-----------------反复缩放 - 开始------------------*/
			if( type == "反复缩放" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("周期[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("最小缩放[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("最大缩放[","");
				temp5 = temp5.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingZooming( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingZooming( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}
			/*-----------------空中飘浮 - 开始------------------*/
			if( type == "空中飘浮" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("飘浮高度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("周期[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("幅度[","");
				temp5 = temp5.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingFloating( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingFloating( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------上下震动(渐变) - 开始------------------*/
			if( type == "上下震动(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeUD_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeUD_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------左右震动(渐变) - 开始------------------*/
			if( type == "左右震动(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeLR_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeLR_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------左右摇晃(渐变) - 开始------------------*/
			if( type == "左右摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------钟摆摇晃(渐变) - 开始------------------*/
			if( type == "钟摆摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingPendulumRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingPendulumRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------锚点摇晃(渐变) - 开始------------------*/
			if( type == "锚点摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingAnchorRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingAnchorRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( temp1 == "结束动作" ){
				/*-----------------反复缩放 - 结束动作------------------*/
				if( type == "反复缩放" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingZooming();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingZooming();
						}
					}
				}
				/*-----------------空中飘浮 - 结束动作------------------*/
				if( type == "空中飘浮" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingFloating();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingFloating();
						}
					}
				}
				/*-----------------旋转状态 - 结束动作------------------*/
				if( type == "旋转状态" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingRotateState();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingRotateState();
						}
					}
				}
				/*-----------------缩放状态 - 结束动作------------------*/
				if( type == "缩放状态" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingResizeState();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingResizeState();
						}
					}
				}
				/*-----------------顺时针/逆时针旋转(渐变) - 结束动作------------------*/
				if( type == "顺时针旋转(渐变)" || type == "逆时针旋转(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingRotate_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingRotate_Gradual();
						}
					}
				}
				/*-----------------垂直卡片旋转(渐变) - 结束动作------------------*/
				if( type == "垂直卡片旋转(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingRotateVer_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingRotateVer_Gradual();
						}
					}
				}
				/*-----------------水平卡片旋转(渐变) - 结束动作------------------*/
				if( type == "水平卡片旋转(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingRotateHor_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingRotateHor_Gradual();
						}
					}
				}
				/*-----------------上下震动(渐变) - 结束动作------------------*/
				if( type == "上下震动(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingShakeUD_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingShakeUD_Gradual();
						}
					}
				}
				/*-----------------左右震动(渐变) - 结束动作------------------*/
				if( type == "左右震动(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingShakeLR_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingShakeLR_Gradual();
						}
					}
				}
				/*-----------------左右摇晃(渐变) - 结束动作------------------*/
				if( type == "左右摇晃(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingShakeRotate_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingShakeRotate_Gradual();
						}
					}
				}
				/*-----------------钟摆摇晃(渐变) - 结束动作------------------*/
				if( type == "钟摆摇晃(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingPendulumRotate_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingPendulumRotate_Gradual();
						}
					}
				}
				/*-----------------锚点摇晃(渐变) - 结束动作------------------*/
				if( type == "锚点摇晃(渐变)" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingAnchorRotate_Gradual();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingAnchorRotate_Gradual();
						}
					}
				}
			}
		}
	}
	
	
	/*-----------------------------------------*/
	/*-----------------旧指令------------------*/
	/*-----------------------------------------*/
	if (command === '>玩家持续效果') { // >玩家持续效果 : 领队 : 标准闪烁 : 60 : 30
		if(args.length >= 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if(args[5]){ var time = String(args[5]); }
			if(args[7]){ var period = Number(args[7]); }
			
			if( $gamePlayer.opacity() == 0){ return; }
			if( time == '无限时间' ){ time = 60*60*60*24*100; }else{ time = Number(time); }
			if( temp1 == '领队' ){ 
				if( type == '终止持续效果' ){ $gamePlayer.drill_ECE_stopEffect(); }
				if( type == '标准闪烁' ){ $gamePlayer.drill_ECE_playSustainingFlicker(time,period); }
				if( type == '渐变闪烁' ){ $gamePlayer.drill_ECE_playSustainingFlickerCos(time,period); }
				if( type == '顺时针旋转' ){ $gamePlayer.drill_ECE_playSustainingRotate(time,period,1); }
				if( type == '逆时针旋转' ){ $gamePlayer.drill_ECE_playSustainingRotate(time,period,-1); }
				if( type == '垂直卡片旋转' ){ $gamePlayer.drill_ECE_playSustainingRotateVer(time,period); }
				if( type == '水平卡片旋转' ){ $gamePlayer.drill_ECE_playSustainingRotateHor(time,period); }
			}
			if( temp1 == '全部队员' ){ 
				if( type == '终止持续效果' ){ $gamePlayer.drill_ECE_stopEffect(); $gamePlayer.followers().forEach(function(f){ f.drill_ECE_stopEffect(); },this); }
				if( type == '标准闪烁' ){ $gamePlayer.drill_ECE_playSustainingFlicker(time,period); $gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingFlicker(time,period); },this); }
				if( type == '渐变闪烁' ){ $gamePlayer.drill_ECE_playSustainingFlickerCos(time,period); $gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingFlickerCos(time,period); },this); }
				if( type == '顺时针旋转' ){ $gamePlayer.drill_ECE_playSustainingRotate(time,period,1); $gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotate(time,period,1); },this); }
				if( type == '逆时针旋转' ){ $gamePlayer.drill_ECE_playSustainingRotate(time,period,-1); $gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotate(time,period,-1); },this); }
				if( type == '垂直卡片旋转' ){ $gamePlayer.drill_ECE_playSustainingRotateVer(time,period); $gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotateVer(time,period); },this); }
				if( type == '水平卡片旋转' ){ $gamePlayer.drill_ECE_playSustainingRotateHor(time,period); $gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotateHor(time,period); },this); }
			}
		}
		if(args.length >= 6 ){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			if(args[7]){ var time = String(args[7]); }
			if(args[9]){ var period = Number(args[9]); }
			if(time == '无限时间'){ time = 60*60*60*24*100; }else{ time = Number(time); }
			var _followers = $gamePlayer.followers().visibleFollowers();
			_followers.unshift($gamePlayer);
			if( temp1 == '指定队员' ){
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0){ return; }
					if( type == '终止持续效果' ){ _followers[temp2].drill_ECE_stopEffect(); }
					if( type == '标准闪烁' ){ _followers[temp2].drill_ECE_playSustainingFlicker(time,period); }
					if( type == '渐变闪烁' ){ _followers[temp2].drill_ECE_playSustainingFlickerCos(time,period); }
					if( type == '顺时针旋转' ){ _followers[temp2].drill_ECE_playSustainingRotate(time,period,1); }
					if( type == '逆时针旋转' ){ _followers[temp2].drill_ECE_playSustainingRotate(time,period,-1); }
					if( type == '垂直卡片旋转' ){ _followers[temp2].drill_ECE_playSustainingRotateVer(time,period); }
					if( type == '水平卡片旋转' ){ _followers[temp2].drill_ECE_playSustainingRotateHor(time,period); }
				}
			}
			if( temp1 == '指定队员(变量)' ){ 
				temp2 = $gameVariables.value(temp2);
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0){ return; }
					if( type == '终止持续效果' ){ _followers[temp2].drill_ECE_stopEffect(); }
					if( type == '标准闪烁' ){ _followers[temp2].drill_ECE_playSustainingFlicker(time,period); }
					if( type == '渐变闪烁' ){ _followers[temp2].drill_ECE_playSustainingFlickerCos(time,period); }
					if( type == '顺时针旋转' ){ _followers[temp2].drill_ECE_playSustainingRotate(time,period,1); }
					if( type == '逆时针旋转' ){ _followers[temp2].drill_ECE_playSustainingRotate(time,period,-1); }
					if( type == '垂直卡片旋转' ){ _followers[temp2].drill_ECE_playSustainingRotateVer(time,period); }
					if( type == '水平卡片旋转' ){ _followers[temp2].drill_ECE_playSustainingRotateHor(time,period); }
				}
			}
		}
	}
	if( command === '>事件持续效果' ){ // >事件持续效果 : 本事件 : 标准闪烁 : 60 : 168
		if(args.length >= 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if(args[5]){ var time = String(args[5]); }
			if(args[7]){ var period = Number(args[7]); } 
			if(time == '无限时间'){ time = 60*60*60*24*100; }else{ time = Number(time); }
			if( temp1 == '本事件' ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				if( e.opacity() == 0){ return; }
				if( type == '终止持续效果' ){ e.drill_ECE_stopEffect(); }
				if( type == '标准闪烁'){ e.drill_ECE_playSustainingFlicker(time,period); }
				if( type == '渐变闪烁'){ e.drill_ECE_playSustainingFlickerCos(time,period); }
				if( type == '顺时针旋转'  ){ e.drill_ECE_playSustainingRotate(time,period,1); }
				if( type == '逆时针旋转'  ){ e.drill_ECE_playSustainingRotate(time,period,-1); }
				if( type == '垂直卡片旋转'  ){ e.drill_ECE_playSustainingRotateVer(time,period); }
				if( type == '水平卡片旋转'  ){ e.drill_ECE_playSustainingRotateHor(time,period); }
			}
		}
		if(args.length >= 6){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			if(args[7]){ var time = String(args[7]); }
			if(args[9]){ var period = Number(args[9]); }
			if(time == '无限时间'){ time = 60*60*60*24*100; }else{ time = Number(time); }
			if( temp1 == '指定事件' ){ 
				if( $gameMap.drill_ECE_isEventExist( temp2 ) == false ){ return; }
				var e = $gameMap.event( temp2 );
				if( e.opacity() == 0){ return; }
				if( type == '终止持续效果' ){ e.drill_ECE_stopEffect(); }
				if( type == '标准闪烁' ){ e.drill_ECE_playSustainingFlicker(time,period); }
				if( type == '渐变闪烁' ){ e.drill_ECE_playSustainingFlickerCos(time,period); }
				if( type == '顺时针旋转' ){ e.drill_ECE_playSustainingRotate(time,period,1); }
				if( type == '逆时针旋转' ){ e.drill_ECE_playSustainingRotate(time,period,-1); }
				if( type == '垂直卡片旋转' ){ e.drill_ECE_playSustainingRotateVer(time,period); }
				if( type == '水平卡片旋转' ){ e.drill_ECE_playSustainingRotateHor(time,period); }
			}
			if( temp1 == '指定事件(变量)' ){ 
				var e_id = $gameVariables.value(temp2);
				if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				if( e.opacity() == 0){ return; }
				if( type == '终止持续效果' ){ e.drill_ECE_stopEffect(); }
				if( type == '标准闪烁' ){ e.drill_ECE_playSustainingFlicker(time,period); }
				if( type == '渐变闪烁' ){ e.drill_ECE_playSustainingFlickerCos(time,period); }
				if( type == '顺时针旋转' ){ e.drill_ECE_playSustainingRotate(time,period,1); }
				if( type == '逆时针旋转' ){ e.drill_ECE_playSustainingRotate(time,period,-1); }
				if( type == '垂直卡片旋转' ){ e.drill_ECE_playSustainingRotateVer(time,period); }
				if( type == '水平卡片旋转' ){ e.drill_ECE_playSustainingRotateHor(time,period); }
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ECE_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_ECE_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_ECE_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_ECE_event_initMembers.call(this);
	this._drill_ECE_isFirstBirth = true;
};
//==============================
// * 事件注释 - 读取绑定
//==============================
var _drill_ECE_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ECE_event_setupPage.call(this);
    this.drill_ECE_event_readPage();
};
//==============================
// * 事件注释 - 读取 页
//==============================
Game_Event.prototype.drill_ECE_event_readPage = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_ECE_isFirstBirth == true ){ 
		this.drill_ECE_event_readList( this.event().pages[0].list );
		this._drill_ECE_isFirstBirth = undefined;		//『节约临时参数存储空间』（放后面，注释通过这个识别"跨事件页/不跨事件页"。"跨事件页"的注释必须放在第一页才能生效。）
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_ECE_event_readList( this.list() );
	}
}
//==============================
// * 事件注释 - 读取 注释
//==============================
Game_Event.prototype.drill_ECE_event_readList = function( pageOfList ){
	pageOfList.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			
			if( command == "=>持续动作" ){
				var time = 60*60*60*24*100;
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					/*-----------------标准闪烁------------------*/
					if( type == "标准闪烁" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingFlicker( time,Number(temp1) );
					}
					/*-----------------渐变闪烁------------------*/
					if( type == "渐变闪烁" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingFlickerCos( time,Number(temp1) );
					}
					/*-----------------顺时针旋转------------------*/
					if( type == "顺时针旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotate( time,Number(temp1),1 );
					}
					/*-----------------逆时针旋转------------------*/
					if( type == "逆时针旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotate( time,Number(temp1),-1 );
					}
					/*-----------------垂直卡片旋转------------------*/
					if( type == "垂直卡片旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotateVer( time,Number(temp1) );
					}
					/*-----------------水平卡片旋转------------------*/
					if( type == "水平卡片旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotateHor( time,Number(temp1) );
					}
					/*-----------------旋转状态------------------*/
					if( type == "旋转状态" ){
						temp1 = temp1.replace("旋转角度[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotateState( time, 1, Number(temp1) );
					}
					/*-----------------缩放状态------------------*/
					if( type == "缩放状态" ){
						temp1 = temp1.replace("缩放比例[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingResizeState( time, 1, Number(temp1) );
					}
				}
				if( args.length == 6 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					/*-----------------上下震动------------------*/
					if( type == "上下震动" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("震动幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingShakeUD( time,Number(temp1),Number(temp2) );
					}
					/*-----------------左右震动------------------*/
					if( type == "左右震动" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("震动幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingShakeLR( time,Number(temp1),Number(temp2) );
					}
					/*-----------------左右摇晃------------------*/
					if( type == "左右摇晃" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("摇晃幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingShakeRotate( time,Number(temp1),Number(temp2) );
					}
					/*-----------------钟摆摇晃------------------*/
					if( type == "钟摆摇晃" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("摇晃幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingPendulumRotate( time,Number(temp1),Number(temp2) );
					}
					/*-----------------锚点摇晃------------------*/
					if( type == "锚点摇晃" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("摇晃幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingAnchorRotate( time,Number(temp1),Number(temp2) );
					}
					/*-----------------呼吸效果------------------*/
					if( type == "呼吸效果" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("呼吸幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingBreathing( time,Number(temp1),Number(temp2) );
					}
					/*-----------------原地小跳------------------*/
					if( type == "原地小跳" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("跳跃高度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingJumping( time,Number(temp1),Number(temp2) );
					}
				}
				if( args.length == 8 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					/*-----------------反复缩放 - 开始------------------*/
					if( type == "反复缩放" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("最小缩放[","");
						temp2 = temp2.replace("]","");
						temp3 = temp3.replace("最大缩放[","");
						temp3 = temp3.replace("]","");
						this.drill_ECE_playSustainingZooming( time, 1, Number(temp1),Number(temp2),Number(temp3) );
					}	
					/*-----------------空中飘浮------------------*/
					if( type == "空中飘浮" ){
						temp1 = temp1.replace("飘浮高度[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("周期[","");
						temp2 = temp2.replace("]","");
						temp3 = temp3.replace("幅度[","");
						temp3 = temp3.replace("]","");
						this.drill_ECE_playSustainingFloating( time, 1, Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}
			
			/*-----------------旧指令------------------*/
			if( command == "=>事件持续效果" ){
				var type = String(args[1]);
				var temp1 = Number(args[3]);
				var time = 60*60*60*24*100;
				if( type == "标准闪烁" ){
					this.drill_ECE_playSustainingFlicker(time,temp1);
				}
				if( type == "渐变闪烁" ){
					this.drill_ECE_playSustainingFlickerCos(time,temp1);
				}
				if( type == "顺时针旋转" ){
					this.drill_ECE_playSustainingRotate(time,temp1,1);
				}
				if( type == "逆时针旋转" ){
					this.drill_ECE_playSustainingRotate(time,temp1,-1);
				}
				if( type == "垂直卡片旋转" ){
					this.drill_ECE_playSustainingRotateVer(time,temp1);
				}
				if( type == "水平卡片旋转" ){
					this.drill_ECE_playSustainingRotateHor(time,temp1);
				}
			};
		};
	}, this);
};


//=============================================================================
// ** ☆玩家队员控制
//
//			说明：	> 此模块专门控制 玩家队员 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 玩家队员控制 - 关闭透明度同步
//
//			说明：	> 玩家队员在帧刷新中会保持与 玩家 相同透明度，这里关掉。
//==============================
var _drill_ECE_setOpacity = Game_Follower.prototype.setOpacity;
Game_Follower.prototype.setOpacity = function( opacity ){
	if( $gamePlayer.drill_ECE_isPlaying() ){ return; }
	if( this.drill_ECE_isPlaying() ){ return; }
	
	// > 原函数
	_drill_ECE_setOpacity.call( this, opacity );
};


//=============================================================================
// ** ☆物体贴图控制
//
//			说明：	> 此模块专门控制 物体贴图 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体贴图控制 - 帧刷新
//==============================
var _drill_ECE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_drill_ECE_s_update.call(this);
	if( this._character != undefined ){
		this.drill_ECE_updateEffect();			//帧刷新 - 执行变换
		this.drill_ECE_updateBitmap();			//帧刷新 - 获取资源宽高
	};
};
//==============================
// * 物体贴图控制 - 帧刷新 - 执行变换
//
//			说明：	> 【行走图 - 行走图优化核心】已包含了 固定帧初始值 功能，所以这里只要累加变化即可。
//==============================
Sprite_Character.prototype.drill_ECE_updateEffect = function() {
	if( this._character.drill_ECE_isPlaying() != true ){ return; }
	
	var sprite_data = this._character._drill_ECE_spriteData;
												// 贴图 - 锚点X（不操作）
												// 贴图 - 锚点Y（不操作）
	this.x += sprite_data.x ;					// 贴图 - 位置X
	this.y += sprite_data.y ;					// 贴图 - 位置Y
	this.scale.x += sprite_data.scale_x;		// 贴图 - 缩放X
	this.scale.y += sprite_data.scale_y;		// 贴图 - 缩放Y
	
	if( sprite_data.opacity != -1 ){			// 贴图 - 透明度
		this.opacity = sprite_data.opacity;		//
	}											//
	
	//this.skew.x += sprite_data.skew_x;		// 贴图 - 斜切X
	//this.skew.y += sprite_data.skew_y;		// 贴图 - 斜切Y
	this.rotation += sprite_data.rotation;		// 贴图 - 旋转
	
}
//==============================
// * 物体贴图控制 - 帧刷新 - 获取资源宽高
//==============================
Sprite_Character.prototype.drill_ECE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() &&
		this._character._drill_ECE_spriteData != undefined ){
		this._character._drill_ECE_spriteData.real_width = this.patternWidth();
		this._character._drill_ECE_spriteData.real_height = this.patternHeight();
	}
}


//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门管理 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_ECE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	this._drill_ECE_spriteData = undefined;
	this._drill_ECE_param = undefined;
	_drill_ECE_c_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_ECE_checkData = function() {
	
	// > 贴图属性
	if( this._drill_ECE_spriteData == undefined ){
		this._drill_ECE_spriteData = {};				//（不要用initMembers，follower没有这个方法）
		this._drill_ECE_spriteData.anchor_x = 0.5;		// 锚点X
		this._drill_ECE_spriteData.anchor_y = 1.0;		// 锚点Y
		this._drill_ECE_spriteData.x = 0;				// 位置X
		this._drill_ECE_spriteData.y = 0;				// 位置Y
		this._drill_ECE_spriteData.scale_x = 0;			// 缩放X
		this._drill_ECE_spriteData.scale_y = 0;			// 缩放Y
		this._drill_ECE_spriteData.opacity = -1;		// 透明度（不叠加）
		this._drill_ECE_spriteData.skew_x = 0;			// 斜切X
		this._drill_ECE_spriteData.skew_y = 0;			// 斜切Y
		this._drill_ECE_spriteData.rotation = 0;		// 旋转
		
		this._drill_ECE_spriteData.real_width = -1;		// 贴图宽
		this._drill_ECE_spriteData.real_height = -1;	// 贴图高
	}
	
	// > 动作配置
	if( this._drill_ECE_param == undefined ){
		this._drill_ECE_param = {};
		this._drill_ECE_param.playing_type = "";		// 显示类型
	}
}
//==============================
// * 物体的属性 - 帧刷新
//==============================
var _drill_ECE_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_ECE_c_update.call(this);
	
	if( this._drill_ECE_spriteData == undefined ){ return; } 		//需要等资源加载完成
	if( this._drill_ECE_spriteData.real_width == -1 ){ return; }	//
	if( this._drill_ECE_spriteData.real_height == -1 ){ return; }	//
	
	this.drill_ECE_updateSustainingFlicker();					//帧刷新 - 标准闪烁
	this.drill_ECE_updateSustainingFlickerCos();              	//帧刷新 - 渐变闪烁
	this.drill_ECE_updateSustainingRotate();                	//帧刷新 - 顺时针/逆时针旋转
	this.drill_ECE_updateSustainingRotateVer();             	//帧刷新 - 垂直卡片旋转
	this.drill_ECE_updateSustainingRotateHor();             	//帧刷新 - 水平卡片旋转
	this.drill_ECE_updateSustainingShakeUD();               	//帧刷新 - 上下震动
	this.drill_ECE_updateSustainingShakeLR();               	//帧刷新 - 左右震动
	this.drill_ECE_updateSustainingShakeRotate();           	//帧刷新 - 左右摇晃
	this.drill_ECE_updateSustainingPendulumRotate();        	//帧刷新 - 钟摆摇晃
	this.drill_ECE_updateSustainingAnchorRotate();          	//帧刷新 - 锚点摇晃
	this.drill_ECE_updateSustainingBreathing();             	//帧刷新 - 呼吸效果
	this.drill_ECE_updateSustainingJumping();					//帧刷新 - 原地小跳
	this.drill_ECE_updateSustainingZooming();					//帧刷新 - 反复缩放
	this.drill_ECE_updateSustainingFloating();              	//帧刷新 - 空中飘浮
	this.drill_ECE_updateSustainingRotateState();           	//帧刷新 - 旋转状态
	this.drill_ECE_updateSustainingResizeState();           	//帧刷新 - 缩放状态
	this.drill_ECE_updateSustainingRotate_Gradual();        	//帧刷新 - 顺时针/逆时针旋转(渐变)
	this.drill_ECE_updateSustainingRotateVer_Gradual();     	//帧刷新 - 垂直卡片旋转(渐变)
	this.drill_ECE_updateSustainingRotateHor_Gradual();     	//帧刷新 - 水平卡片旋转(渐变)
	this.drill_ECE_updateSustainingShakeUD_Gradual();       	//帧刷新 - 上下震动(渐变)
	this.drill_ECE_updateSustainingShakeLR_Gradual();       	//帧刷新 - 左右震动(渐变)
	this.drill_ECE_updateSustainingShakeRotate_Gradual();   	//帧刷新 - 左右摇晃(渐变)
	this.drill_ECE_updateSustainingPendulumRotate_Gradual();	//帧刷新 - 钟摆摇晃(渐变)
	this.drill_ECE_updateSustainingAnchorRotate_Gradual();  	//帧刷新 - 锚点摇晃(渐变)
}

//==============================
// * 物体的属性 - 是否正在播放（开放函数）
//==============================
Game_Character.prototype.drill_ECE_isPlaying = function() {
	if( this._drill_ECE_param == undefined ){ return false; }
	if( this._drill_ECE_param.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 物体的属性 - 获取正在播放的类型（开放函数）
//==============================
Game_Character.prototype.drill_ECE_getPlayingType = function() {
	if( this._drill_ECE_param == undefined ){ return ""; }
	return this._drill_ECE_param.playing_type;
}
//==============================
// * 物体的属性 - 设置透明度（开放函数）
//==============================
Game_Character.prototype.drill_ECE_setOpacity = function( opacity ){
	if( isNaN(opacity) ){
		alert( DrillUp.drill_ECE_getPluginTip_ParamIsNaN( "opacity" ) );
	}
	this.setOpacity( opacity );
}
//==============================
// * 物体的属性 - 立即终止动作（开放函数）
//==============================
Game_Character.prototype.drill_ECE_stopEffect = function() {
	if( this._drill_ECE_spriteData != undefined &&
		this._drill_ECE_spriteData.opacity != -1 ){
		this.drill_ECE_setOpacity( 255 );  //（透明度若出现修改才还原）
	}
	this._drill_ECE_spriteData = undefined;
	this._drill_ECE_param = undefined;
}

//==============================
// * 物体的属性 - 数学工具 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字   （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	> 修正 旋转+缩放+斜切 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_ECE_Math2D_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图锚点 
					target_anchor_x,target_anchor_y, 	//新的锚点 
					width, height,						//贴图高宽
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
	
	if( scale_x == undefined ){ scale_x = 1; }
	if( scale_y == undefined ){ scale_y = 1; }
	if( skew_x == undefined ){ skew_x = 0; }
	if( skew_y == undefined ){ skew_y = 0; }
	
	// > 参数准备 （来自 Pixi.Transform）
    var _cx = 1; // cos rotation + skewY;
    var _sx = 0; // sin rotation + skewY;
    var _cy = 0; // cos rotation + Math.PI/2 - skewX;
    var _sy = 1; // sin rotation + Math.PI/2 - skewX;
	
	// > 旋转+斜切 （来自 Pixi.Transform.prototype.updateSkew）
    _cx = Math.cos( rotation + skew_y );
    _sx = Math.sin( rotation + skew_y );
    _cy = -Math.sin( rotation - skew_x ); // cos, added PI/2
    _sy = Math.cos( rotation - skew_x ); // sin, added PI/2
	
	// > 缩放 （来自 Pixi.Transform.prototype.updateLocalTransform）
    var a = _cx * scale_x;
    var b = _sx * scale_x;
    var c = _cy * scale_y;
    var d = _sy * scale_y;
	
	// > 将参数应用到坐标
	var cur_x = width  * target_anchor_x;
	var cur_y = height * target_anchor_y;
	var center_x = width  * org_anchor_x;
	var center_y = height * org_anchor_y;
	var dx = (center_x - cur_x);
	var dy = (center_y - cur_y);
    var tar_x = cur_x + (dx * a + dy * c) - center_x;
    var tar_y = cur_y + (dx * b + dy * d) - center_y;
	
	return { "x":tar_x, "y":tar_y };
}
//==============================
// * 物体的属性 - 数学工具 - 抛物线三点式
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//					> x3,y3 数字（点C）
//			返回：	> { a:0, b:0, c:0 } （抛物线公式的abc）
//			
//			说明：	已知三点，返回抛物线公式 y = a*x^2 + b*x + c 的abc值。
//==============================
Game_Temp.prototype.drill_ECE_Math2D_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}



//=============================================================================
// ** ☆持续动作
//
//			说明：	> 此模块专门管理 持续动作 的设置。
//					> 不考虑转控制器结构，且不考虑自定义变换扩展，只硬编码的公式控制变换动画。
//					> 此模块的代码 在其他同类插件中一模一样，只要替换 类名和简称 即可。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 『持续动作』标准闪烁 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingFlicker = function( allTime, period ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "标准闪烁";
	p_data.fA_time = 0;
	p_data.fA_dest = period *0.5;
	p_data.fB_time = 0;
	p_data.fB_dest = period *0.5;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』标准闪烁 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingFlicker = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "标准闪烁" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 闪烁 - 灭
		s_data.opacity = 1 ;
		this.drill_ECE_setOpacity(s_data.opacity);
		
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		
		// > 闪烁 - 亮
		s_data.opacity = 255;
		this.drill_ECE_setOpacity(s_data.opacity);
		
	}
		
	// > 闪烁 - 重置
	if( p_data.fB_time >= p_data.fB_dest ){
		p_data.fA_time = 0;
		p_data.fB_time = 0;
		s_data.opacity = 1;
		this.drill_ECE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』渐变闪烁 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingFlickerCos = function( allTime, period ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "渐变闪烁";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』渐变闪烁 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingFlickerCos = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "渐变闪烁" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.opacity = 127 + 126*Math.cos( ( 360* p_data.fA_time/p_data.fA_period )/180*Math.PI );
	this.drill_ECE_setOpacity(s_data.opacity);
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』顺时针/逆时针旋转 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotate = function( allTime, period, numDirection ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "顺时针/逆时针旋转";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	p_data.fA_speed = 360/period /180*Math.PI * numDirection;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	// > 『消除时差的不连续感』
	var s_data = this._drill_ECE_spriteData;
	s_data.rotation = 0;
	s_data.rotation += p_data.fA_speed;
};
//==============================
// * 『持续动作』顺时针/逆时针旋转 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotate = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation += p_data.fA_speed;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』垂直卡片旋转 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateVer = function( allTime, period ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "垂直卡片旋转";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』垂直卡片旋转 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateVer = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
		
	p_data.fA_time ++;
	s_data.scale_x = -1 - 1.0 * Math.cos( p_data.fA_time*p_data.fA_speed + Math.PI );		//（取值范围 -2 ~ 0 ）

	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』水平卡片旋转 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateHor = function( allTime, period ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "水平卡片旋转";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』水平卡片旋转 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateHor = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.scale_y = -1 - 1.0 * Math.cos( p_data.fA_time*p_data.fA_speed + Math.PI );	//（取值范围 -2 ~ 0 ）
	//s_data.y = 0.5 * s_data.real_height * s_data.scale_y;								//（水平翻转的锚点补正）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』上下震动 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeUD = function( allTime, period, scope ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "上下震动";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』上下震动 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingShakeUD = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.y = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』左右震动 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeLR = function( allTime, period, scope ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "左右震动";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』左右震动 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingShakeLR = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.x = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』左右摇晃 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeRotate = function( allTime, period, scope ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "左右摇晃";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope /180*Math.PI;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』左右摇晃 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingShakeRotate = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』钟摆摇晃 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingPendulumRotate = function( allTime, period, scope ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "钟摆摇晃";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope /180*Math.PI;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』钟摆摇晃 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingPendulumRotate = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』锚点摇晃 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingAnchorRotate = function( allTime, period, scope ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "锚点摇晃";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope /180*Math.PI;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』锚点摇晃 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingAnchorRotate = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』呼吸效果 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingBreathing = function( allTime, period, scope ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "呼吸效果";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』呼吸效果 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingBreathing = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "呼吸效果" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.scale_y = (p_data.fA_scope / s_data.real_height) * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』原地小跳 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingJumping = function( allTime, period, jump_height ){
	this.drill_ECE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "原地小跳";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_dest = Math.floor(period*0.25);
	p_data.fA_abc = $gameTemp.drill_ECE_Math2D_getParabolicThree( 0,0, p_data.fA_dest*0.5,-0.1, p_data.fA_dest,0 );
	p_data.fB_time = 0;
	p_data.fB_dest = Math.floor(period*0.6);
	p_data.fB_abc = $gameTemp.drill_ECE_Math2D_getParabolicThree( 0,0, p_data.fB_dest*0.5,jump_height, p_data.fB_dest,0 );
	p_data.fC_time = 0;
	p_data.fC_dest = Math.floor(period*0.15);
	p_data.fC_abc = $gameTemp.drill_ECE_Math2D_getParabolicThree( 0,0, p_data.fC_dest*0.5,-0.05, p_data.fC_dest,0 );
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』原地小跳 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingJumping = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "原地小跳" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 起跳缓冲
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
	
		var t = p_data.fA_time;
		s_data.scale_x = -1*( p_data.fA_abc['a']*t*t + p_data.fA_abc['b']*t + p_data.fA_abc['c'] );
		s_data.scale_y = -s_data.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
	
	// > 跳跃后高度变化
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		
		var t = p_data.fB_time;
		s_data.y = -1*( p_data.fB_abc['a']*t*t + p_data.fB_abc['b']*t + p_data.fB_abc['c'] );
		
	// > 踩地缓冲
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		var t = p_data.fC_time;
		s_data.scale_x = -1*( p_data.fC_abc['a']*t*t + p_data.fC_abc['b']*t + p_data.fC_abc['c'] );
		s_data.scale_y = -s_data.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;	
		s_data.y = fix_point.y;	
	}
	
	// > 周期结束，重新跳
	if( p_data.fC_time >= p_data.fC_dest ){	
		p_data.fA_time = 1;
		p_data.fB_time = 0;
		p_data.fC_time = 0;
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』反复缩放 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingZooming = function( allTime, bufferTime, period, min_size,max_size ){
	this.drill_ECE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("反复缩放") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "反复缩放";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fB_period = period;
	p_data.fB_min = min_size -1;
	p_data.fB_max = max_size -1;
	p_data.fB_avg = p_data.fB_min + (p_data.fB_max-p_data.fB_min)*0.5;
	p_data.fB_speed = 360/period /180*Math.PI;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_pos = 0;	//（当前的缩放值）
}
//==============================
// * 『持续动作』反复缩放 - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingZooming = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "反复缩放" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』反复缩放 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingZooming = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "反复缩放" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 缩放到中间值
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_pos = 0.0 + p_data.fB_avg * p_data.fA_time / p_data.fA_dest;
		s_data.scale_x = p_data.f_cur_pos;
		s_data.scale_y = p_data.f_cur_pos;
		
	// > 反复缩放
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_pos = p_data.fB_avg + (p_data.fB_max-p_data.fB_min)*0.5 * Math.sin( p_data.fB_time*p_data.fB_speed );
		s_data.scale_x = p_data.f_cur_pos;
		s_data.scale_y = p_data.f_cur_pos;
		
	// > 回到原缩放值
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.scale_x = 0.0 + p_data.f_cur_pos * (p_data.fC_dest-p_data.fC_time) / p_data.fC_dest;
		s_data.scale_y = 0.0 + p_data.f_cur_pos * (p_data.fC_dest-p_data.fC_time) / p_data.fC_dest;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』空中飘浮 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingFloating = function( allTime, bufferTime, height,period,scope ){
	this.drill_ECE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("空中飘浮") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "空中飘浮";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fB_period = period;
	p_data.fB_scope = scope ;
	p_data.fB_speed = 360/period /180*Math.PI;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_height = height;
};
//==============================
// * 『持续动作』空中飘浮 - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingFloating = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "空中飘浮" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』空中飘浮 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingFloating = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "空中飘浮" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 升起
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		s_data.y = p_data.f_height * p_data.fA_time / p_data.fA_dest;
		s_data.y *= -1;
		
	// > 漂浮
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		s_data.y = p_data.f_height + p_data.fB_scope * Math.sin( p_data.fB_time*p_data.fB_speed );
		s_data.y *= -1;
		
	// > 降落
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.y = p_data.f_height * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		s_data.y *= -1;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』旋转状态 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateState = function( allTime, bufferTime, scope ){
	this.drill_ECE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("旋转状态") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "旋转状态";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』旋转状态 - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingRotateState = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "旋转状态" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』旋转状态 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateState = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "旋转状态" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		s_data.rotation = p_data.f_scope * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		s_data.rotation = p_data.f_scope;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.rotation = p_data.f_scope * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』缩放状态 - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingResizeState = function( allTime, bufferTime, scope ){
	this.drill_ECE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("缩放状态") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "缩放状态";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_scope = scope - 1.0;
};
//==============================
// * 『持续动作』缩放状态 - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingResizeState = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "缩放状态" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』缩放状态 - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingResizeState = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "缩放状态" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始缩放
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		s_data.scale_x = p_data.f_scope * p_data.fA_time / p_data.fA_dest;
		s_data.scale_y = s_data.scale_x;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		s_data.scale_x = p_data.f_scope;
		s_data.scale_y = s_data.scale_x;
		
	// > 结束缩放
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.scale_x = p_data.f_scope * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		s_data.scale_y = s_data.scale_x;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotate_Gradual = function( allTime, period, numDirection, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("顺时针/逆时针旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "顺时针/逆时针旋转(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_numDirection = numDirection;
};
//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
		
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){	
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;							//（路程值累加）
	s_data.rotation = p_data.f_cur_pos * p_data.f_numDirection;		//（区分顺时针逆时针）
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x, s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』垂直卡片旋转(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateVer_Gradual = function( allTime, period, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("垂直卡片旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "垂直卡片旋转(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
};
//==============================
// * 『持续动作』垂直卡片旋转(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingRotateVer_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』垂直卡片旋转(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateVer_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){	
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){	
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();		
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;								//（路程值累加）
	s_data.scale_x = -1 - 1.0 * Math.cos( p_data.f_cur_pos + Math.PI );	//（取值范围 -2 ~ 0 ）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』水平卡片旋转(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateHor_Gradual = function( allTime, period, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("水平卡片旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "水平卡片旋转(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
};
//==============================
// * 『持续动作』水平卡片旋转(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingRotateHor_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』水平卡片旋转(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateHor_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){	
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();		
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;									//（路程值累加）
	s_data.scale_y = -1 - 1.0 * Math.cos( p_data.f_cur_pos + Math.PI );		//（取值范围 -2 ~ 0 ）	
	//s_data.y = 0.5 * s_data.real_height * s_data.scale_y;					//（水平翻转的锚点补正）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』上下震动(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeUD_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("上下震动(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "上下震动(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope;
};
//==============================
// * 『持续动作』上下震动(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingShakeUD_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』上下震动(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingShakeUD_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
		
	// > 开始震动
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束震动
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.y = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』左右震动(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeLR_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("左右震动(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "左右震动(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope;
};
//==============================
// * 『持续动作』左右震动(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingShakeLR_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』左右震动(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingShakeLR_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始震动
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束震动
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.x = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};


//==============================
// * 『持续动作』左右摇晃(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("左右摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "左右摇晃(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』左右摇晃(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingShakeRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』左右摇晃(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingShakeRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始摇晃
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		
	// > 结束摇晃
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』钟摆摇晃(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingPendulumRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("钟摆摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "钟摆摇晃(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』钟摆摇晃(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingPendulumRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』钟摆摇晃(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingPendulumRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始摇晃
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束摇晃
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_ECE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};

//==============================
// * 『持续动作』锚点摇晃(渐变) - 初始化
//==============================
Game_Character.prototype.drill_ECE_playSustainingAnchorRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_ECE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_ECE_getPluginTip_allTimeError("锚点摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_ECE_param;
	p_data.playing_type = "锚点摇晃(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』锚点摇晃(渐变) - 结束动作
//==============================
Game_Character.prototype.drill_ECE_endSustainingAnchorRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』锚点摇晃(渐变) - 帧刷新
//==============================
Game_Character.prototype.drill_ECE_updateSustainingAnchorRotate_Gradual = function() {
	var p_data = this._drill_ECE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃(渐变)" ){ return; }
	var s_data = this._drill_ECE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始摇晃
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		
	// > 结束摇晃
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_ECE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_ECE_stopEffect();
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventContinuedEffect = false;
		var pluginTip = DrillUp.drill_ECE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


