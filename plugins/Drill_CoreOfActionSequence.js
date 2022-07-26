//=============================================================================
// Drill_CoreOfActionSequence.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        系统 - GIF动画序列核心
 * @author Drill_up
 * 
 * @Drill_LE_param "动画序列-%d"
 * @Drill_LE_parentKey "---动画序列%d至%d---"
 * @Drill_LE_var "DrillUp.g_COAS_list_length"
 * 
 * @Drill_LE_param "状态元-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_COAS_stateList_length"
 * 
 * @Drill_LE_param "动作元-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_COAS_actList_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_CoreOfActionSequence +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够将多个GIF与状态机系统结合，形成动画序列。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 作用于：
 *   - Drill_ActorPortraitureExtend   战斗UI-高级角色肖像
 *   - Drill_PictureActionSequence    图片-GIF动画序列
 *   - Drill_EventActionSequence      行走图-GIF动画序列
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于大部分贴图。
 * 2.更多详细内容，去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * 动画序列：
 *   (1.动画序列有两个主要结构：状态元 和 动作元。
 *      以角色动画序列为例，
 *      状态元是指 角色持续执行的状态。
 *      动作元是指 角色只执行一次的动作。
 *   (2.动画序列可以对各种情况作出不同gif动作，
 *      具体可以去看看相关 子插件 的动画序列动作的说明。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__actionSeq （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__actionSeq文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。这里需要在角色组中手动配置：
 * 
 * 动画序列1 状态元1 资源-状态元
 * 动画序列1 状态元2 资源-状态元
 * 动画序列1 状态元3 资源-状态元
 * 动画序列1 动作元1 资源-动作元
 * 动画序列1 动作元2 资源-动作元
 * 动画序列1 动作元3 资源-动作元
 * 动画序列2 …
 * ……
 *
 * 你可以配置每个动作元、状态元的设置，并且还可以是组成GIF的多张图像。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 动画核心提供了测试动作元、状态元的方法：
 * 
 * 插件指令：>动画序列核心DEBUG : 动画序列[1] : 显示默认状态元集合
 * 插件指令：>动画序列核心DEBUG : 动画序列[1] : 显示全部状态元名称
 * 插件指令：>动画序列核心DEBUG : 动画序列[1] : 显示符合注解的状态元名[@向上移动]
 * 插件指令：>动画序列核心DEBUG : 动画序列[1] : 显示全部动作元名称
 * 
 * 1.注意，这里是动画核心，单独使用没有效果。插件指令只是辅助调试用。
 *   你需要去 子插件 看具体功能。
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
 * 测试方法：   运行子插件时，进行相关的性能测试。
 * 测试结果：   地图界面中，动画序列的消耗为：【12.32ms】
 *              战斗界面中，动画序列的消耗为：【12.32ms】
 *              菜单界面中，动画序列的消耗为：【12.32ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.核心的主要消耗来源于图片资源加载，正常帧刷新的消耗并不大。
 *   你需要多注意子插件的消耗情况。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了 色调值、模糊边缘、帧间隔明细表 设置，
 * 并实现了小工具交互功能。
 * [v1.2]
 * 添加了部分适配接口。
 * [v1.3]
 * 修复了 动作元和状态元 优先级相同时，动作元不能播放的bug。
 * [v1.4]
 * 优化了 单独播放动作元后，进入空状态元时，动作元图像不消失的bug。
 * 
 * 
 *
 * @param ---动画序列 1至20---
 * @default
 *
 * @param 动画序列-1
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-2
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-3
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-4
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-5
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-6
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-7
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-8
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-9
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-10
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-11
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-12
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-13
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-14
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-15
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-16
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-17
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-18
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-19
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-20
 * @parent ---动画序列 1至20---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param ---动画序列21至40---
 * @default
 *
 * @param 动画序列-21
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-22
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-23
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-24
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-25
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-26
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-27
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-28
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-29
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-30
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-31
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-32
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-33
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-34
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-35
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-36
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-37
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-38
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-39
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 *
 * @param 动画序列-40
 * @parent ---动画序列21至40---
 * @type struct<DrillCOASSequence>
 * @desc GIF动画序列的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillCOASSequence:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的动画序列--
 * 
 * @param 默认的状态元集合
 * @type text[]
 * @desc 动画序列会随机在该序列中，抽取并播放一个状态。如果只有一个状态，则反复播放该状态。可用插件指令控制修改序列。
 * @default ["小爱丽丝静止1"]
 * 
 * @param ---状态元---
 * @default
 * 
 * @param 状态元-1
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-2
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-3
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-4
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-5
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-6
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-7
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-8
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-9
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param 状态元-10
 * @parent ---状态元---
 * @type struct<DrillCOASState>
 * @desc 单个状态元的动画配置。
 * @default 
 * 
 * @param ---动作元---
 * @default
 * 
 * @param 动作元-1
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-2
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-3
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-4
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-5
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-6
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-7
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-8
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-9
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * @param 动作元-10
 * @parent ---动作元---
 * @type struct<DrillCOASAct>
 * @desc 单个动作元的动画配置。
 * @default 
 * 
 * 
 */
/*~struct~DrillCOASState:
 * 
 * @param 状态元名称
 * @desc 状态元的标识性名称，注意不要与其他名称重复。
 * @default 小爱丽丝静止1
 * 
 * @param 状态元权重
 * @type number
 * @min 1
 * @desc 如果设置多个状态元时，系统会随机抽取任意一个状态元并进行播放，这里为状态元的播放权重几率。
 * @default 40
 * 
 * @param 状态元优先级
 * @type number
 * @min 0
 * @desc 状态元优先级是针对动作元设置的，优先级高的状态元，不会被优先级低的动作元中断。
 * @default 0
 * 
 * @param ---GIF---
 * @default
 * 
 * @param 资源-状态元
 * @parent ---GIF---
 * @desc 该状态元下的资源图片。可以是单张图片，也可以是多张组成的gif。
 * @default []
 * @require 1
 * @dir img/Special__actionSeq/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---GIF---
 * @type number
 * @min 1
 * @desc 默认gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 * 
 * @param 帧间隔-明细表
 * @parent ---GIF---
 * @type number[]
 * @min 1
 * @desc GIF中，每帧的详细间隔，间隔与配置的资源一一对应。不对应的则用默认的帧间隔。
 * @default []
 *
 * @param 是否倒放
 * @parent ---GIF---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 图像-色调值
 * @parent ---GIF---
 * @type number
 * @min 0
 * @min 360
 * @desc GIF图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---GIF---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 可以模糊GIF图像的边缘，防止出现像素锯齿。
 * @default false
 *
 * @param 备注
 * @type note
 * @desc 备注的文本，在动画序列中并不起实际作用。
 * @default ""
 *
 */
/*~struct~DrillCOASAct:
 * 
 * @param 动作元名称
 * @desc 动作元的标识性名称，注意不要与其他名称重复。
 * @default 小爱丽丝攻击
 * 
 * @param 动作元优先级
 * @type number
 * @min 0
 * @desc 优先级高的动作，可以中断 状态元 和正在播放的低优先级动作元，优先级相同或低的，则不影响。
 * @default 20
 * 
 * @param ---GIF---
 * @default
 *
 * @param 资源-动作元
 * @parent ---GIF---
 * @desc 该动作元下的资源图片。可以是单张图片，也可以是多张组成的gif。
 * @default []
 * @require 1
 * @dir img/Special__actionSeq/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---GIF---
 * @type number
 * @min 1
 * @desc 默认gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 * 
 * @param 帧间隔-明细表
 * @parent ---GIF---
 * @type number[]
 * @min 1
 * @desc GIF中，每帧的详细间隔，间隔与配置的资源一一对应。不对应的则用默认的帧间隔。
 * @default []
 *
 * @param 是否倒放
 * @parent ---GIF---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 图像-色调值
 * @parent ---GIF---
 * @type number
 * @min 0
 * @min 360
 * @desc GIF图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---GIF---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 可以模糊GIF图像的边缘，防止出现像素锯齿。
 * @default false
 *
 * @param 备注
 * @type note
 * @desc 备注的文本，在动画序列中并不起实际作用。
 * @default ""
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COAS（Core_Of_Waitress_Sprite）
//		临时全局变量	无
//		临时局部变量	this._drill_COAS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	12.32ms
//		★最坏情况		无
//		★备注			主要消耗来源于图片资源加载，正常并不消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			动画序列核心：
//				->状态元
//					->初始化状态元
//					->随机状态元
//				->动作元
//					->关闭/启用动作元
// 
//		★私有类如下：
//			* Drill_COAS_Data【动画序列数据】
//			* Drill_COAS_SpriteDecorator【动画序列对象】
//			
//		★其它说明细节：
//			1.暂无
//
//		★核心接口说明：
//			1.整个核心只提供了两个分离的类，数据 和 对象。
//			  具体见类的说明。
//			2.如果只在一个 简单贴图 里面使用，直接new，然后手动update即可。
//				this._Drill_xxx_data = new Drill_COAS_Data( DrillUp.g_COAS_list[ 0 ] );
//				this._Drill_xxx_decorator = new Drill_COAS_SpriteDecorator( this, this._Drill_xxx_data );
//				this._Drill_xxx_data.update();
//				this._Drill_xxx_decorator.update();
//			  但是如果你需要将 二者分离，且 数据 能保存，则：
//				见插件 Drill_PictureActionSequence 。
//			3.如果要对data进行相关操作，可见标注"（接口）"的函数。
//				
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfActionSequence = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfActionSequence');

	//==============================
	// * 变量获取 - 状态元
	//				（~struct~DrillCOASState）
	//==============================
	DrillUp.drill_COAS_initState = function( dataFrom ) {
		var data = {};
		data['name'] = String( dataFrom["状态元名称"] || "");
		data['priority'] = Number( dataFrom["状态元优先级"] || 0);
		data['proportion'] = Number( dataFrom["状态元权重"] || 40);
		if( dataFrom["资源-状态元"] != "" &&
			dataFrom["资源-状态元"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-状态元"] );
		}else{
			data['gif_src'] = [];
		}
		if( dataFrom["帧间隔-明细表"] != "" &&
			dataFrom["帧间隔-明细表"] != undefined ){
			data['gif_intervalTank'] = JSON.parse( dataFrom["帧间隔-明细表"] );
		}else{
			data['gif_intervalTank'] = [];
		}
		data['gif_src_file'] = "img/Special__actionSeq/";
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['gif_tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['gif_smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		// > 帧间隔计算
		data['gif_intervalRealTank'] = [];
		data['gif_intervalRealTank_total'] = 0;
		for( var i=0; i < data['gif_src'].length; i++ ){
			var interval = data['gif_interval'];
			if( i < data['gif_intervalTank'].length ){
				interval = Number(data['gif_intervalTank'][i]);
			}
			data['gif_intervalRealTank'][i] = Number(interval);
			data['gif_intervalRealTank_total'] += Number(interval);
		}
		return data;
	}
	//==============================
	// * 变量获取 - 动作元
	//				（~struct~DrillCOASAct）
	//==============================
	DrillUp.drill_COAS_initAct = function( dataFrom ) {
		var data = {};
		data['name'] = String( dataFrom["动作元名称"] || "");
		data['priority'] = Number( dataFrom["动作元优先级"] || 20);
		if( dataFrom["资源-动作元"] != "" &&
			dataFrom["资源-动作元"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-动作元"] );
		}else{
			data['gif_src'] = [];
		}
		if( dataFrom["帧间隔-明细表"] != "" &&
			dataFrom["帧间隔-明细表"] != undefined ){
			data['gif_intervalTank'] = JSON.parse( dataFrom["帧间隔-明细表"] );
		}else{
			data['gif_intervalTank'] = [];
		}
		data['gif_src_file'] = "img/Special__actionSeq/";
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['gif_tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['gif_smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		var temp = String( dataFrom["备注"] || "" );
		if( temp[0] == "\"" ){
			temp = temp.substring(1,temp.length-1);
			temp = temp.replace(/\\\\/g,"\\");
		}
		data['note'] = temp;
		
		// > 帧间隔计算
		data['gif_intervalRealTank'] = [];
		data['gif_intervalRealTank_total'] = 0;
		for( var i=0; i < data['gif_src'].length; i++ ){
			var interval = data['gif_interval'];
			if( i < data['gif_intervalTank'].length ){
				interval = Number(data['gif_intervalTank'][i]);
			}
			data['gif_intervalRealTank'][i] = Number(interval);
			data['gif_intervalRealTank_total'] += Number(interval);
		}
		return data;
	}
	//==============================
	// * 变量获取 - 动画序列
	//				（~struct~DrillCOASSequence）
	//==============================
	DrillUp.g_COAS_stateList_length = 10;
	DrillUp.g_COAS_actList_length = 10;
	DrillUp.drill_COAS_initSequence = function( dataFrom ) {
		var data = {};
		data['state_default_randomSeq'] = [];
		data['state_tank'] = [];
		data['act_tank'] = [];
			
		if( dataFrom["默认的状态元集合"] != "" &&
			dataFrom["默认的状态元集合"] != undefined ){
			data['state_default_randomSeq'] = JSON.parse( dataFrom["默认的状态元集合"] );
		}else{
			data['state_default_randomSeq'] = [];
		}
		
		for (var j = 0; j < DrillUp.g_COAS_stateList_length; j++) {
			if( dataFrom["状态元-" + String(j+1) ] != undefined &&
				dataFrom["状态元-" + String(j+1) ] != "" ){
				var state = JSON.parse( dataFrom["状态元-" + String(j+1)] );
				data['state_tank'][j] = DrillUp.drill_COAS_initState( state );
			}else{
				data['state_tank'][j] = DrillUp.drill_COAS_initState( {} );
			}
		}
		
		for (var j = 0; j < DrillUp.g_COAS_actList_length; j++) {
			if( dataFrom["动作元-" + String(j+1) ] != undefined &&
				dataFrom["动作元-" + String(j+1) ] != "" ){
				var act = JSON.parse( dataFrom["动作元-" + String(j+1)] );
				data['act_tank'][j] = DrillUp.drill_COAS_initAct( act );
			}else{
				data['act_tank'][j] = DrillUp.drill_COAS_initAct( {} );
			}
		}
		
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_COAS_list_length = 40;
	DrillUp.g_COAS_list = [];
	for (var i = 0; i < DrillUp.g_COAS_list_length; i++) {
		if( DrillUp.parameters["动画序列-" + String(i+1) ] != undefined &&
			DrillUp.parameters["动画序列-" + String(i+1) ] != "" ){
			var sequence = JSON.parse(DrillUp.parameters["动画序列-" + String(i+1) ]);
			DrillUp.g_COAS_list[i] = DrillUp.drill_COAS_initSequence( sequence );
		}else{
			DrillUp.g_COAS_list[i] = DrillUp.drill_COAS_initSequence( {} );
		}
	}
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_COAS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_COAS_pluginCommand.call(this, command, args);
	
	if( command === ">动画序列核心DEBUG" ){
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			
			if( temp1.indexOf("动画序列[") != -1 ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				
				var COAS_data = new Drill_COAS_Data( DrillUp.g_COAS_list[ temp1-1 ] );
				if( temp2 == "显示默认状态元集合" ){
					var seq = COAS_data.drill_COAS_getDefaultStateGroup();
					alert( JSON.stringify(seq) );
				}
				if( temp2 == "显示全部状态元名称" ){
					var seq = COAS_data.drill_COAS_getAllStateName();
					alert( JSON.stringify(seq) );
				}
				if( temp2 == "显示全部动作元名称" ){
					var seq = COAS_data.drill_COAS_getAllActName();
					alert( JSON.stringify(seq) );
				}
				if( temp2.indexOf("显示符合注解的状态元名[") != -1 ){
					temp2 = temp2.replace("显示符合注解的状态元名[","");
					temp2 = temp2.replace("]","");
					COAS_data.drill_COAS_setSequenceByAnnotation( temp2 );
					var seq = COAS_data.drill_COAS_getCurrentStateSeqName();
					alert( JSON.stringify(seq) );
				}
			}
		}
	}
}


//=============================================================================
// ** 动画序列数据【Drill_COAS_Data】
// 
//			来源：	独立数据
//			应用：	高级战斗肖像
//   		功能：	> 独立的数据操作器
//					> 能被存到存档中
//			说明：	> 该类的update函数需要手动调用。
//					> 你可以随时new新的Drill_COAS_Data，但是要注意销毁装饰器对象。
//	
//			特殊：	【该类在c++工具中存在 复刻类 ，修改后注意同步复刻 】
//=============================================================================
//==============================
// * 数据 - 定义
//==============================
function Drill_COAS_Data() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 数据 - 初始化
//==============================
Drill_COAS_Data.prototype.initialize = function( data ){
	if( data == undefined ){ data = {}; }
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	this.drill_initData();									//初始化数据
};
//==============================
// * 数据 - 帧刷新（需要父类手动执行）
//==============================
Drill_COAS_Data.prototype.update = function() {
	this._drill_time += 1;				//时间+1
	this.drill_COAS_updateState();		//刷新状态元
	this.drill_COAS_updateAct();		//刷新动作元
};
//==============================
// * 创建 - 初始化
//==============================
Drill_COAS_Data.prototype.drill_initData = function() {
	var data = this._drill_data;	
	
	// > 默认值
	if( data['waitForPreload'] == undefined ){ data['waitForPreload'] = false };					//预加载等待（子插件用参数）
	if( data['state_default_randomSeq'] == undefined ){ data['state_default_randomSeq'] = [] };		//默认状态元集合
	if( data['state_tank'] == undefined ){ data['state_tank'] = [] };								//状态元 容器
	if( data['act_tank'] == undefined ){ data['act_tank'] = [] };									//动作元 容器
	
	// > 私有变量初始化
	this._drill_time = 0;											//持续时间
	this._drill_arrayCheck = true;									//检查数组元素
	this._drill_bitmapName = "";									//当前的bitmap对象名
	this._drill_bitmapPath = "";									//当前的bitmap路径
	this._drill_bitmapTint = 0;										//当前的bitmap色调
	this._drill_bitmapSmooth = false;								//当前的bitmap模糊
	this._drill_state_curCom = "";									//状态元 - 当前状态（注意，要确保只有 状态元集合为空/资源为空 的情况下，才能为空字符串，其他情况不要随意产生空字符串）
	this._drill_state_curTime = 0;									//状态元 - 当前时间
	this._drill_state_curSeq = data['state_default_randomSeq'];		//状态元 - 当前序列
	this._drill_state_lastAnnotation = "";							//状态元 - 上一个注解名
	this._drill_act_curCom = "";									//动作元 - 当前动作
	this._drill_act_curTime = 0;									//动作元 - 当前时间
}
//==============================
// * 帧刷新 - 刷新状态元
//==============================
Drill_COAS_Data.prototype.drill_COAS_updateState = function() {
	if( this.drill_COAS_isPlayingAct() == true ){ return; }		//动作播放时，不操作状态元
	if( this._drill_state_curSeq.length == 0 ){ return; }		//状态元集合 为空时，不操作
	
	// > 随机抽取
	if( this._drill_state_curCom == "" ){
		this.drill_COAS_rollCurrentState();
	}
	
	var data = this._drill_data;	
	var data_state = this.drill_COAS_getDataState( this._drill_state_curCom );
	
	// > 没有该状态元时
	if( data_state['gif_src'] == undefined ){
		this._drill_state_curCom = "";
		return;
	}
	
	// > 状态声音
	if( this._drill_state_curTime == 0 ){
		var se = {};
		se.name = data_state['se'];
		se.pitch = 100;
		se.volume = 100;
		AudioManager.playSe(se);
	}
	
	// > gif播放
	if( data_state['gif_src'].length != 0 ){
		
		var index = 0;
		var inter_time = this._drill_state_curTime;
		if( data_state['gif_back_run'] == false){

			// > 正向播放
			for (var i = 0; i < data_state['gif_intervalRealTank'].length; i++){
				var i_time = data_state['gif_intervalRealTank'][i];
				if( inter_time < i_time ){
					index = i;
					break;
				}
				inter_time -= i_time;
			}
		}else{

			// > 倒放
			for (var i = data_state['gif_intervalRealTank'].length-1; i >=0 ; i--){
				var i_time = data_state['gif_intervalRealTank'][i];
				if( inter_time < i_time ){
					index = i;
					break;
				}
				inter_time -= i_time;
			}
		}
		this._drill_bitmapName = data_state['gif_src'][index];
		this._drill_bitmapPath = data_state['gif_src_file'];
		this._drill_bitmapTint = data_state['gif_tint'];
		this._drill_bitmapSmooth = data_state['gif_smooth'];

	}else{	//（空状态元时，播放空图片）
		this._drill_bitmapName = "";
		this._drill_bitmapPath = data_state['gif_src_file'];
		this._drill_bitmapTint = data_state['gif_tint'];
		this._drill_bitmapSmooth = data_state['gif_smooth'];
	}
	
	// > 时间+1
	this._drill_state_curTime += 1;
	if( this._drill_state_curTime >= data_state['gif_intervalRealTank_total'] ){
		this.drill_COAS_rollCurrentState();
		this._drill_state_curTime = 0;
	}
	
}	
//==============================
// * 操作 - 抽取新的状态元
//==============================
Drill_COAS_Data.prototype.drill_COAS_rollCurrentState = function() {
	if( this._drill_state_curSeq.length == 0 ){ return; }		//状态元集合 为空时，不操作
	
	// > 只有一个就不变
	if( this._drill_state_curSeq.length == 1 ){
		this._drill_state_curCom = this._drill_state_curSeq[0];
	}
	
	// > 随机抽取
	var index = Math.floor( this._drill_state_curSeq.length * Math.random() );
	this._drill_state_curCom = this._drill_state_curSeq[ index ];
}
//==============================
// * 帧刷新 - 刷新动作元
//==============================
Drill_COAS_Data.prototype.drill_COAS_updateAct = function() {
	if( this.drill_COAS_isPlayingAct() == false ){ return; }	//动作未播放时，不操作
	
	var data = this._drill_data;	
	var data_act = this.drill_COAS_getDataAct( this._drill_act_curCom );
	
	// > 没有该动作元时
	if( data_act['gif_src'] == undefined ){
		this._drill_act_curCom = "";
		return;
	}
	
	// > 动作声音
	if( this._drill_act_curTime == 0 ){
		var se = {};
		se.name = data_act['se'];
		se.pitch = 100;
		se.volume = 100;
		AudioManager.playSe(se);
	}
	
	// > gif播放（一次只能播放一种行为）
	if( data_act['gif_src'].length != 0 ){
		
		var index = 0;
		var inter_time = this._drill_act_curTime;
		if( data_act['gif_back_run'] == false){

			// > 正向播放
			for (var i = 0; i < data_act['gif_intervalRealTank'].length; i++){
				var i_time = data_act['gif_intervalRealTank'][i];
				if( inter_time < i_time ){
					index = i;
					break;
				}
				inter_time -= i_time;
			}
		}else{

			// > 倒放
			for (var i = data_act['gif_intervalRealTank'].length-1; i >=0 ; i--){
				var i_time = data_act['gif_intervalRealTank'][i];
				if( inter_time < i_time ){
					index = i;
					break;
				}
				inter_time -= i_time;
			}
		}
		
		this._drill_bitmapName = data_act['gif_src'][index];
		this._drill_bitmapPath = data_act['gif_src_file'];
		this._drill_bitmapTint = data_act['gif_tint'];
		this._drill_bitmapSmooth = data_act['gif_smooth'];
	}
	
	// > 时间+1
	this._drill_act_curTime += 1;
	if( this._drill_act_curTime > data_act['gif_intervalRealTank_total'] ){
		this._drill_act_curCom = "";
		this._drill_act_curTime = 0;
	}
}

//==============================
// * 数据 - 检查数组元素
//==============================
Drill_COAS_Data.prototype.drill_COAS_checkArray = function( arr ){
	if( this._drill_arrayCheck != true ){ return; }
		
	if( Array.isArray( arr ) ){
		// > 通过
	}else{
		// > 报错提示
		alert( "【Drill_CoreOfActionSequence.js 系统 - GIF动画序列核心】\n" +
				"接口调用错误，数组接口获取到了 非数组 参数："+ arr +" 。");
		this._drill_arrayCheck = false;
	}	
}
//==============================
// * 数据 - 状态元 - 设置状态元序列（接口）
//
//				说明：	序列中存放 状态名称 的数组，状态元会跳过不识别的对象。
//==============================
Drill_COAS_Data.prototype.drill_COAS_setSequence = function( seq ){
	this.drill_COAS_checkArray( seq );
	this._drill_state_curSeq = seq;
}
//==============================
// * 数据 - 状态元 - 设置状态元序列-立刻改变（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_setSequenceImmediate = function( seq ){
	this.drill_COAS_setSequence( seq );
	this.drill_COAS_rollCurrentState();
	this._drill_state_curTime = 0;
}
//==============================
// * 数据 - 状态元 - 设置状态元序列[注解模式]（接口）
//
//			说明：	状态元名称中含有特定注解的，会被捕获。如果都没捕获到，返回失败（false）。
//==============================
Drill_COAS_Data.prototype.drill_COAS_setSequenceByAnnotation = function( annotation ){
	if( this._drill_state_lastAnnotation == annotation ){ return true; }	//（重复注解时跳过）
	this._drill_state_lastAnnotation = annotation;
	
	// > 获取注解列表
	var annotation_list = [];
	var temp_list = annotation.split("@");
	for( var i=0; i < temp_list.length; i++ ){
		var temp = temp_list[i];
		if( temp == "" ){ continue; }
		annotation_list.push( "@"+temp );
	}
	
	// > 找到符合注解数量最多的状态元名
	var name_list = this.drill_COAS_getAllStateName();
	var max_fit_count = 0;			//（最大符合数量）
	var tag_seq = [];				//（最大符合的索引列表）
	for( var i=0; i < name_list.length; i++ ){
		var name = name_list[i];
		
		// > 获取@符号数量
		var char_count = 0;
		for(var j=0; j < name.length; j++){
			if( name[j] == "@" ){
				char_count += 1;
			}	
		}
		if( char_count == 0 ){ continue; }
		
		// > 记录注解符合数量
		var fit_count = 0;
		for(var j=0; j < annotation_list.length; j++){
			var annotation = annotation_list[j];
			if( name.contains(annotation) == true ){
				fit_count += 1;
			}
		}
		
		// > 含有不匹配的@符号时，跳过
		if( char_count > fit_count ){
			continue;
		}
		
		// > 符合数量更大时，清空序列，重新添加
		if( fit_count > max_fit_count ){ 
			tag_seq = [];
			max_fit_count = fit_count;
			
			var tag = {};
			tag['index'] = i;
			tag['count'] = fit_count;
			tag['name'] = name;
			tag_seq.push( tag );
		
		// > 符合数量相等，累计
		}else if( fit_count == max_fit_count ){
			var tag = {};
			tag['index'] = i;
			tag['count'] = fit_count;
			tag['name'] = name;
			tag_seq.push( tag );
			
		// > 符合数量少了，跳过
		}else{
			continue; 
		}
	}
	if( tag_seq.length == 0 ){ return false; }
	
	// > 根据最大值的下标取出符合的名称
	var seq = [];
	for( var i=0; i < tag_seq.length; i++ ){
		seq.push( tag_seq[i]['name'] );
	}
	
	this._drill_state_curSeq = seq;
	return true;
}
//==============================
// * 数据 - 状态元 - 设置状态元序列[注解模式]-立刻改变（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_setSequenceImmediateByAnnotation = function( annotation ){
	if( this._drill_state_lastAnnotation == annotation ){ return true; }	//（重复注解时跳过）
	
	var success = this.drill_COAS_setSequenceByAnnotation(annotation);
	if( success ){
		this.drill_COAS_rollCurrentState();
		this._drill_state_curTime = 0;
	}
	return success;
}
//==============================
// * 数据 - 状态元 - 获取默认状态元集合（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_getDefaultStateGroup = function(){
	return this._drill_data['state_default_randomSeq'];
}
//==============================
// * 数据 - 状态元 - 获取当前状态元名称（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_getCurrentStateName = function(){
	return this._drill_state_curCom;
}
//==============================
// * 数据 - 状态元 - 获取当前状态元集合名称（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_getCurrentStateSeqName = function(){
	return this._drill_state_curSeq;
}
//==============================
// * 数据 - 状态元 - 获取全部状态元名称（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_getAllStateName = function(){
	var data = this._drill_data;
	var result_list = [];	
	for( var i=0; i < data['state_tank'].length; i++ ){
		var data_state = data['state_tank'][i];
		if( data_state && data_state['name'] != "" ){
			result_list.push( data_state['name'] );
		}
	}
	return result_list;
}
//==============================
// * 数据 - 状态元 - 获取数据 根据名称
//==============================
Drill_COAS_Data.prototype.drill_COAS_getDataState = function( state_name ){
	var data = this._drill_data;	
	for( var i=0; i < data['state_tank'].length; i++ ){
		var data_state = data['state_tank'][i];
		if( data_state && data_state['name'] == state_name ){
			return data_state;
		}
	}
	return {};
}

//==============================
// * 数据 - 动作元 - 判断播放
//==============================
Drill_COAS_Data.prototype.drill_COAS_isPlayingAct = function(){
	return this._drill_act_curCom != "";
}
//==============================
// * 数据 - 动作元 - 添加动作（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_setAct = function( act_name ){
	if( this._drill_act_curCom === act_name ){ return; }
	
	// > 检查高优先级状态元
	if( this._drill_act_curCom == "" ){
		var data_act = this.drill_COAS_getDataAct( act_name );
		var cur_state = this.drill_COAS_getDataState( this._drill_state_curCom );
		
		if( cur_state['priority'] > data_act['priority'] ){	//（同级的动作元可以覆盖状态元）
			return;
		}
	}
		
	// > 动作正在播放时
	if( this._drill_act_curCom != "" ){
		var data_act = this.drill_COAS_getDataAct( act_name );
		var cur_act = this.drill_COAS_getDataAct( this._drill_act_curCom );
		
		if( cur_act['priority'] >= data_act['priority'] ){	//（只能覆盖小的优先级，不包括同级）
			return;
		}
	}
	
	this._drill_act_curCom = act_name;
}
//==============================
// * 数据 - 动作元 - 立刻终止动作（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_stopAct = function(){
	this._drill_act_curCom = "";
	this._drill_act_curTime = 0;
}
//==============================
// * 数据 - 状态元 - 获取当前动作元名称（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_getCurrentActName = function(){
	return this._drill_act_curCom;
}
//==============================
// * 数据 - 动作元 - 获取全部动作元名称（接口）
//==============================
Drill_COAS_Data.prototype.drill_COAS_getAllActName = function(){
	var data = this._drill_data;
	var result_list = [];	
	for( var i=0; i < data['act_tank'].length; i++ ){
		var data_act = data['act_tank'][i];
		if( data_act && data_act['name'] != "" ){
			result_list.push( data_act['name'] );
		}
	}
	return result_list;
}
//==============================
// * 数据 - 动作元 - 获取数据 根据名称
//==============================
Drill_COAS_Data.prototype.drill_COAS_getDataAct = function( act_name ){
	var data = this._drill_data;	
	for( var i=0; i < data['act_tank'].length; i++ ){
		var data_act = data['act_tank'][i];
		if( data_act && data_act['name'] == act_name ){
			return data_act;
		}
	}
	return {};
}



//=============================================================================
// ** 动画序列对象（装饰类）【Drill_COAS_SpriteDecorator】
// 
//			来源：	独立对象
//			应用：	高级战斗肖像
//   		功能：	> bitmap对象操作器。
//					> 能够切换父类的bitmap，还可以切换多个父类的bitmap。
//			说明：	> 该类的update函数需要手动调用。
//					> 需要执行销毁函数。
//=============================================================================
//==============================
// * 对象 - 定义
//==============================
function Drill_COAS_SpriteDecorator() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 对象 - 初始化
//==============================
Drill_COAS_SpriteDecorator.prototype.initialize = function( parent, COAS_data ){
	this._drill_parents = [];					//操作的父类
	this._drill_parents.push( parent );			//
	this._drill_controller = COAS_data;			//控制该对象的数据类
	
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 对象 - 帧刷新（需要父类手动执行）
//==============================
Drill_COAS_SpriteDecorator.prototype.update = function() {
	if( this._drill_controller == null ){ return; }
	
	// > 预加载等待
	if( this._drill_controller['waitForPreload'] == true &&
		this.drill_COAS_isAllBitmapReady() == false ){ 
		return; 
	}
	
	// > 执行资源切换
	var temp_bitmap = ImageManager.loadBitmap( 
							this._drill_controller._drill_bitmapPath, 
							this._drill_controller._drill_bitmapName, 
							this._drill_controller._drill_bitmapTint, 
							this._drill_controller._drill_bitmapSmooth );
	this.drill_COAS_setParentBitmap( temp_bitmap );
};
//==============================
// * 对象 - 销毁
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_destroy = function(){
	
	// > 还原父类的bitmap
	for( var i = 0; i < this._drill_parents.length; i++ ){
		this._drill_parents[i].bitmap = this._drill_COAS_parentBitmapTank[i];
	}
	
	this._drill_COAS_parentBitmapTank = [];
	this._drill_parents = [];
	this._drill_controller = null;
};
//==============================
// * 对象 - 添加父类（接口）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_addParent = function( parent ){
	this._drill_parents.push( parent );
};
//==============================
// * 对象 - 去除父类（接口）
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_removeParent = function( parent ){
	for( var i=this._drill_parents.length-1; i >= 0; i-- ){
		if( this._drill_parents[i] == parent ){
			this._drill_parents.splice(i,1);
			this._drill_COAS_parentBitmapTank.splice(i,1);
			break;
		}
	}
};
//==============================
// * 对象 - 外部设置的 父类bitmap资源 变化（接口）
//
//			说明：	部分插件可能会对父类单图的bitmap做修改，子插件需要确保关闭动画序列后，单图能还原。
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_parentBitmapChanged = function( parent, bitmap ){
	for( var i=0; i < this._drill_parents.length; i++ ){
		if( this._drill_parents[i] == parent ){
			this._drill_COAS_parentBitmapTank[i] = bitmap;
			break;
		}
	}
};
//==============================
// * 创建 - 初始化对象
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_initSprite = function() {
	if( this._drill_controller == null ){ return; }
	var data = this._drill_controller._drill_data;	
	
	// > 私有变量初始化
	this._drill_COAS_stateBitmap = [];
	this._drill_COAS_actBitmap = [];
	this._drill_COAS_parentBitmapTank = [];
	
	// > 预加载bitmap
	for(var i = 0; i < data['state_tank'].length ; i++){
		var temp_state = data['state_tank'][i];
		for(var j = 0; j < temp_state['gif_src'].length ; j++){
			var obj_bitmap = ImageManager.loadBitmap( temp_state['gif_src_file'], temp_state['gif_src'][j], 0, true);
			this._drill_COAS_stateBitmap.push( obj_bitmap );
		};
	};
	for(var i = 0; i < data['act_tank'].length ; i++){
		var temp_act = data['act_tank'][i];
		for(var j = 0; j < temp_act['gif_src'].length ; j++){
			var obj_bitmap = ImageManager.loadBitmap( temp_act['gif_src_file'], temp_act['gif_src'][j], 0, true);
			this._drill_COAS_actBitmap.push( obj_bitmap );
		};
	};
	
	// > 测试图片
	//if( data['state_tank'].length > 0 &&
	//	data['state_tank'][0]['gif_src_bitmap'].length > 0 ){
	//	this.drill_COAS_setParentBitmap( data['state_tank'][0]['gif_src_bitmap'][0] );
	//}
}
//==============================
// * 父操作 - 设置bitmap对象
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_setParentBitmap = function( bitmap ){
	
	// > 检查父类默认bitmap
	if( this._drill_COAS_parentBitmapTank.length != this._drill_parents.length ){
		for( var i = this._drill_COAS_parentBitmapTank.length; i < this._drill_parents.length; i++ ){
			this._drill_COAS_parentBitmapTank[i] = this._drill_parents[i].bitmap;
		}
	}
	
	// > 赋值
	for( var i=0; i < this._drill_parents.length; i++ ){
		var temp_parent = this._drill_parents[i];
		temp_parent.bitmap = bitmap;
	}
}
//==============================
// * 对象 - 判断图片加载情况
//==============================
Drill_COAS_SpriteDecorator.prototype.drill_COAS_isAllBitmapReady = function(){
	if( this._drill_controller == null ){ return false; }
	var data = this._drill_controller._drill_data;	
	
	// > 预加载bitmap
	for(var i = 0; i < this._drill_COAS_stateBitmap.length ; i++){
		if( this._drill_COAS_stateBitmap[i].isReady() == false ){
			return false;
		}
	};
	for(var i = 0; i < this._drill_COAS_actBitmap.length ; i++){
		if( this._drill_COAS_actBitmap[i].isReady() == false ){
			return false;
		}
	};
	
	return true;
}

//=============================================================================
// ** 核心漏洞修复
//=============================================================================
//==============================
// * 核心漏洞修复 - 屏蔽根据版本重刷地图
//
//			说明：	此功能会刷掉旧存档的存储数据，因为版本不一样会强制重进地图。
//					而这样做只是 刷新旧存档的当前地图而已，没任何好处。
//==============================
Scene_Load.prototype.reloadMapIfUpdated = function() {
	// （禁止重刷）
};

