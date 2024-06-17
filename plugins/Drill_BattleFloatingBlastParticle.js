//=============================================================================
// Drill_BattleFloatingBlastParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        战斗UI - 临时粒子小爆炸
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子样式-%d"
 * @Drill_LE_parentKey "---粒子样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BFBPa_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_BattleFloatingBlastParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令播放一个粒子小爆炸的临时动画，基于界面装饰。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfParticle       系统-粒子核心
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于界面的各图层。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 *   临时对象相关内容，去看看文档 "13.UI > 关于临时对象与模板.docx"。
 * 细节：
 *   (1.粒子小爆炸是一个插件指令直接控制的动画。
 *      此动画基于界面装饰，需要指定 战斗层级 和 坐标 。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__anim （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 粒子样式-1 资源-粒子
 * 粒子样式-2 资源-粒子
 * 粒子样式-3 资源-粒子
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 简单指令
 * 你可以通过插件指令快速生成对象：
 * 
 * 插件指令：>战斗临时粒子小爆炸 : 简单临时对象 : 位置[100,200] : 样式[1]
 * 插件指令：>战斗临时粒子小爆炸 : 简单临时对象 : 位置变量[25,26] : 样式[1]
 * 插件指令：>战斗临时粒子小爆炸 : 简单临时对象 : 位置-敌方[1] : 样式[1]
 * 插件指令：>战斗临时粒子小爆炸 : 简单临时对象 : 位置-敌方变量[21] : 样式[1]
 * 插件指令：>战斗临时粒子小爆炸 : 简单临时对象 : 位置-我方[1] : 样式[1]
 * 插件指令：>战斗临时粒子小爆炸 : 简单临时对象 : 位置-我方变量[21] : 样式[1]
 * 插件指令：>战斗临时粒子小爆炸 : 简单临时对象 : 位置-鼠标 : 样式[1]
 * 
 * 1.临时对象创建后，持续时间结束会自动清掉。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 高级指令
 * 你可以通过插件指令控制临时对象的具体参数：
 * 
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 初始化 : 样式[1]
 * 
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-混合模式 : 混合模式[0]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-UI基准 : 相对于战斗场景
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-UI基准 : 相对于镜头
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-战斗层级 : 下层
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-战斗层级 : 上层
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-战斗层级 : 图片层
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-战斗层级 : 最顶层
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-图片层级 : 图片层级[4]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子数量 : 数量[15]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子数量 : 数量变量[21]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子生命周期 : 时长[45]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子生命周期 : 时长变量[21]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子自旋转初始角度 : 角度[90.0]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子自旋转初始角度 : 角度变量[21]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子固定方向 : 角度[90.0]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子固定方向 : 角度变量[21]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子扇形朝向 : 角度[90.0]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子扇形朝向 : 角度变量[21]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子初速度 : 速度[2.5]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 修改样式属性-粒子缩放值 : 缩放[1.0]
 * 
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 创建 : 位置[100,200]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 创建 : 位置变量[25,26]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 创建 : 位置-敌方[1]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 创建 : 位置-敌方变量[21]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 创建 : 位置-我方[1]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 创建 : 位置-我方变量[21]
 * 插件指令：>战斗临时粒子小爆炸 : 临时对象 : 创建 : 位置-鼠标
 * 
 * 1.插件指令需要先后执行： 初始化、修改样式属性、创建 。
 *   如果 样式属性 不需要变化，直接先后执行： 初始化、创建 即可。
 *   临时对象创建之后，将不再受控制。
 * 2.临时对象创建后，持续时间结束会自动清掉。
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
 * 时间复杂度： o(n^3)*o(贴图处理) 每帧
 * 测试方法：   在战斗界面中通过插件指令播放20个粒子小爆炸。
 * 测试结果：   战斗界面中，平均消耗为：【48.30ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.粒子小爆炸的数量较多，由于一次性播放粒子数量的比较多，会产生
 *   一定的消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了粒子 彩虹化 功能。
 * 
 * 
 * 
 *
 * @param ---粒子样式组 1至20---
 * @default
 *
 * @param 粒子样式-1
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-2
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-3
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-4
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-5
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-6
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-7
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-8
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-9
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-10
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-11
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-12
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-13
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-14
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-15
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-16
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-17
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-18
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-19
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-20
 * @parent ---粒子样式组 1至20---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组21至40---
 * @default
 *
 * @param 粒子样式-21
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-22
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-23
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-24
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-25
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-26
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-27
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-28
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-29
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-30
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-31
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-32
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-33
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-34
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-35
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-36
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-37
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-38
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-39
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-40
 * @parent ---粒子样式组21至40---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组41至60---
 * @default
 *
 * @param 粒子样式-41
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-42
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-43
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-44
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-45
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-46
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-47
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-48
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-49
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-50
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-51
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-52
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-53
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-54
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-55
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-56
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-57
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-58
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-59
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-60
 * @parent ---粒子样式组41至60---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组61至80---
 * @default
 *
 * @param 粒子样式-61
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-62
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-63
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-64
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-65
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-66
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-67
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-68
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-69
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-70
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-71
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-72
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-73
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-74
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-75
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-76
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-77
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-78
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-79
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-80
 * @parent ---粒子样式组61至80---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组81至100---
 * @default
 *
 * @param 粒子样式-81
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-82
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-83
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-84
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-85
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-86
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-87
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-88
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-89
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-90
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-91
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-92
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-93
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-94
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-95
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-96
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-97
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-98
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-99
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-100
 * @parent ---粒子样式组81至100---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组101至120---
 * @default
 *
 * @param 粒子样式-101
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-102
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-103
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-104
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-105
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-106
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-107
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-108
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-109
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-110
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-111
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-112
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-113
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-114
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-115
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-116
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-117
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-118
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-119
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-120
 * @parent ---粒子样式组101至120---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组121至140---
 * @default
 *
 * @param 粒子样式-121
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-122
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-123
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-124
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-125
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-126
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-127
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-128
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-129
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-130
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-131
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-132
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-133
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-134
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-135
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-136
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-137
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-138
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-139
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-140
 * @parent ---粒子样式组121至140---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组141至160---
 * @default
 *
 * @param 粒子样式-141
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-142
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-143
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-144
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-145
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-146
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-147
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-148
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-149
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-150
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-151
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-152
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-153
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-154
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-155
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-156
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-157
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-158
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-159
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-160
 * @parent ---粒子样式组141至160---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组161至180---
 * @default
 *
 * @param 粒子样式-161
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-162
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-163
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-164
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-165
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-166
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-167
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-168
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-169
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-170
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-171
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-172
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-173
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-174
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-175
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-176
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-177
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-178
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-179
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-180
 * @parent ---粒子样式组161至180---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组181至200---
 * @default
 *
 * @param 粒子样式-181
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-182
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-183
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-184
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-185
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-186
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-187
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-188
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-189
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-190
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-191
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-192
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-193
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-194
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-195
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-196
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-197
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-198
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-199
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-200
 * @parent ---粒子样式组181至200---
 * @type struct<BFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 */
/*~struct~BFBPaStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的粒子小爆炸样式==
 * 
 * @param ---贴图---
 * @desc 
 *
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)战斗临时粒子小爆炸
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 平移-粒子 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-粒子 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param UI基准
 * @parent ---贴图---
 * @type select
 * @option 相对于战斗场景
 * @value 相对于战斗场景
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 相对于镜头的漂浮文字，会与镜头位置保持一致。相对于战斗的漂浮文字，会与战斗坐标保持一致。
 * @default 相对于战斗场景
 *
 * @param 战斗层级
 * @parent ---贴图---
 * @type select
 * @option 下层
 * @value 下层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 粒子所属的层级
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个战斗层级时，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * 
 * @param ---粒子效果---
 * @desc 
 * 
 * @param 粒子数量
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 出现的粒子数量。
 * @default 15
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 45
 *
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
 *
 * @param 粒子出现范围
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 以目标中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。设置0表示粒子全部集中于圆心。
 * @default 0
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 四周扩散(线性)
 *
 * @param 粒子固定方向
 * @parent 粒子方向模式
 * @desc 方向模式为"固定方向"时，碎片固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
 * @default 90.0
 * 
 * @param 粒子扇形朝向
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形的朝向角度。0朝右，90朝下，180朝左，270朝上。
 * @default 45.0
 * 
 * @param 粒子扇形角度
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形弧的角度数。
 * @default 30.0
 *
 * @param 粒子速度模式
 * @parent ---粒子效果---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @desc 粒子出现后，移动速度的模式设置。
 * @default 只初速度
 * 
 * @param 粒子初速度
 * @parent 粒子速度模式
 * @desc 粒子的基本速度，单位 像素/帧。
 * @default 2.5
 * 
 * @param 粒子速度随机波动量
 * @parent 粒子速度模式
 * @desc 粒子速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 *
 * @param 粒子透明度模式
 * @parent ---粒子效果---
 * @type select
 * @option 逐渐消失
 * @value 逐渐消失
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 等一半时间后逐渐消失
 * @value 等一半时间后逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 先显现后消失
 *
 * @param 粒子自旋转模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机角度
 * @value 随机角度
 * @option 固定角度
 * @value 固定角度
 * @option 始终与朝向一致
 * @value 始终与朝向一致
 * @desc 粒子自旋转的模式。
 * @default 固定角度
 *
 * @param 粒子自旋转初始角度
 * @parent 粒子自旋转模式
 * @desc 粒子自旋转的初始角度，单位角度。
 * @default 0.0
 *
 * @param 粒子自旋转速度
 * @parent 粒子自旋转模式
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
 *
 * @param 粒子缩放模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定缩放值
 * @value 固定缩放值
 * @option 缩放值+波动量
 * @value 缩放值+波动量
 * @desc 粒子出现后，缩放的模式设置。
 * @default 固定缩放值
 * 
 * @param 粒子缩放值
 * @parent 粒子缩放模式
 * @desc 粒子的缩放大小，1.0 表示 100%。
 * @default 1.0
 * 
 * @param 粒子缩放随机波动量
 * @parent 粒子缩放模式
 * @desc 粒子缩放上下随机浮动的量。比如值为 0.2，则随机浮动范围为 -0.1 ~ 0.1 之间。
 * @default 0.2
 * 
 * 
 * @param ---双层效果---
 * @default 
 *
 * @param 是否开启双层效果
 * @parent ---双层效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 资源-第二层粒子
 * @parent ---双层效果---
 * @desc 第二层粒子的图片资源。
 * @default (需配置)第二层粒子
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 第二层粒子战斗层级
 * @parent ---双层效果---
 * @type select
 * @option 下层
 * @value 下层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 第二层粒子所属的层级。
 * @default 图片层
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 3
 * 
 * 
 * @param ---随机种子---
 * @desc 
 *
 * @param 是否固定随机种子
 * @parent ---随机种子---
 * @type boolean
 * @on 固定
 * @off 关闭
 * @desc true - 固定，false - 关闭，固定随机种子，能使得所有该样式的粒子，随机轨迹都一模一样。
 * @default false
 * 
 * @param 固定随机种子
 * @parent 是否固定随机种子
 * @desc 固定的随机种子值，范围在0.0000至1.0000之间。
 * @default 0.20221002
 * 
 * 
 * @param ---直线拖尾效果---
 * @desc 
 *
 * @param 是否开启直线拖尾效果
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，拖尾贴图会根据粒子的方向进行旋转。
 * @default false
 *
 * @param 是否固定拖尾在粒子中心
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 固定在中心
 * @off 正右方锚点
 * @desc true - 固定在中心，false - 正右方锚点。
 * @default false
 *
 * @param 资源-直线拖尾
 * @parent ---直线拖尾效果---
 * @desc 粒子的图片资源。
 * @default (需配置)战斗临时粒子小爆炸直线拖尾贴图
 * @require 1
 * @dir img/Special__anim/
 * @type file
 * 
 * 
 * @param ---彩虹化---
 * @desc 
 *
 * @param 是否开启彩虹化-粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-第二层粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个第二层粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-直线拖尾
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子的拖尾都会根据彩虹进行染色变化。
 * @default false
 * 
 * @param 彩虹化色彩数量
 * @parent ---彩虹化---
 * @type number
 * @min 1
 * @max 360
 * @desc 彩虹化色彩的数量，最大值为360。
 * @default 20
 *
 * @param 彩虹化是否锁定色调值
 * @parent ---彩虹化---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default false
 * 
 * @param 锁定的色调值列表
 * @parent 彩虹化是否锁定色调值
 * @type number[]
 * @min 0
 * @max 360
 * @desc 彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default []
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BFBPa (Animation_Blasting_Particle)
//		临时全局变量	DrillUp.g_BFBPa_style_xxx
//		临时局部变量	this._drill_BFBPa_xxx
//		存储数据变量	$gameSystem._drill_BFBPa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	敌群-临时对象
//		★性能测试消耗	2024/5/10：
//							》48.3ms（Drill_BFBPa_Sprite.update）
//		★最坏情况		大量小爆炸被同时播放。
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
//				->简单指令
//				->高级指令
//			->☆单位贴图
//				->获取 - 敌人容器指针【标准函数】
//				->获取 - 根据敌方索引【标准函数】
//				->获取 - 根据敌人ID【标准函数】
//				->获取 - 角色容器指针【标准函数】
//				->获取 - 根据我方索引【标准函数】
//				->获取 - 根据角色ID【标准函数】
//			->☆战斗层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆临时对象
//				->高级指令 初始化
//				->高级指令 创建
//				->修改样式属性
//			->☆贴图控制
//				->帧刷新（战斗界面）
//			
//			->小爆炸粒子控制器【Drill_BFBPa_Controller】
//			->小爆炸粒子贴图【Drill_BFBPa_Sprite】
//			->小爆炸粒子贴图（第二层）【Drill_BFBPa_SecSprite】
//			
//		
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 小爆炸粒子控制器【Drill_BFBPa_Controller】
//			* 小爆炸粒子贴图【Drill_BFBPa_Sprite】
//			* 小爆炸粒子贴图（第二层）【Drill_BFBPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//				_drill_animPBackArea 			父贴图后面层
//				_drill_animPFrontArea			父贴图前面层
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
	DrillUp.g_BFBPa_PluginTip_curName = "Drill_BattleFloatingBlastParticle.js 动画-粒子小爆炸";
	DrillUp.g_BFBPa_PluginTip_baseList = ["Drill_CoreOfParticle.js 系统-粒子核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_BFBPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_BFBPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_BFBPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_BFBPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_BFBPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 临时对象 未初始化
	//==============================
	DrillUp.drill_BFBPa_getPluginTip_BufferIsNull = function(){
		return "【" + DrillUp.g_BFBPa_PluginTip_curName + "】\n插件指令错误，你使用高级指令时，未执行临时对象的初始化指令。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleFloatingBlastParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleFloatingBlastParticle');
	
	//==============================
	// * 静态数据 - 粒子样式
	//				（~struct~BFBPaStyle）
	//==============================
	DrillUp.drill_BFBPa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 控制器
		data['visible'] = true;
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Special__anim/";
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['opacity'] = 255;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['layerIndex'] = String( dataFrom["战斗层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 32);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "固定角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_layerIndex'] = String( dataFrom["第二层粒子战斗层级"] || "图片层");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		// > 随机种子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > 直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/Special__anim/";
		
		// > 彩虹化
		data['rainbow_enable'] = String( dataFrom["是否开启彩虹化-粒子"] || "false") == "true";
		data['rainbow_enableSecond'] = String( dataFrom["是否开启彩虹化-第二层粒子"] || "false") == "true";
		data['rainbow_enableTrailing'] = String( dataFrom["是否开启彩虹化-直线拖尾"] || "false") == "true";
		data['rainbow_num'] = Number( dataFrom["彩虹化色彩数量"] || 20);
		data['rainbow_lockTint'] = String( dataFrom["彩虹化是否锁定色调值"] || "false") == "true";
		if( dataFrom["锁定的色调值列表"] != undefined &&
			dataFrom["锁定的色调值列表"] != "" ){
			data['rainbow_tintList'] = JSON.parse( dataFrom["锁定的色调值列表"] || [] );
		}else{
			data['rainbow_tintList'] = [];
		}
		
		data['offsetEx_x'] = 0;	//（额外位置偏移，注意此配置在样式中）
		data['offsetEx_y'] = 0;
		return data;
	}
	
	
	/*-----------------粒子样式------------------*/
	DrillUp.g_BFBPa_style_length = 200;
	DrillUp.g_BFBPa_style = [];
	for (var i = 0; i < DrillUp.g_BFBPa_style_length; i++) {
		if( DrillUp.parameters['粒子样式-' + String(i+1) ] != undefined && 
			DrillUp.parameters['粒子样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['粒子样式-' + String(i+1) ]);
			DrillUp.g_BFBPa_style[i] = DrillUp.drill_BFBPa_styleInit( data );
			DrillUp.g_BFBPa_style[i]['inited'] = true;
		}else{
			DrillUp.g_BFBPa_style[i] = DrillUp.drill_BFBPa_styleInit( {} );
			DrillUp.g_BFBPa_style[i]['inited'] = false;
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_BFBPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BFBPa_pluginCommand.call(this, command, args);
	if( command === ">战斗临时粒子小爆炸" ){
		
		
		/*-----------------简单指令------------------*/
		if( args.length >= 6 ){		//（考虑变化参数数量情况）
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "简单临时对象" ){
				
				var pos = null;
				if( temp1.indexOf("位置-敌方变量[") != -1 || temp1.indexOf("敌方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方变量[","");
					temp1 = temp1.replace("敌方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFBPa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-敌方[") != -1 || temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方[","");
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFBPa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方变量[") != -1 || temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-我方变量[","");
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFBPa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方[") != -1 || temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("位置-我方[","");
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFBPa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
				}else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
				}else if( temp1 == "位置-鼠标" || temp1 == "鼠标位置" ){
					pos = [ _drill_mouse_x, _drill_mouse_y ];
				}
				
				if( pos != null ){
					temp2 = temp2.replace("样式[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2)-1;
					$gameTemp.drill_BFBPa_createSimple( pos, temp2 );
				}
			}
		}
		
		
		/*-----------------高级指令 - 初始化------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" && type == "初始化" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				$gameTemp.drill_BFBPa_setBuffer( temp1 );
			}
		}
		
		/*-----------------高级指令 - 修改样式属性------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" ){
				
				if( type == "修改样式属性-混合模式" ){
					temp1 = temp1.replace("混合模式[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFBPa_setStyle_blendMode( Number(temp1) );
				}
				if( type == "修改样式属性-UI基准" ){
					$gameTemp.drill_BFBPa_setStyle_benchmark( temp1 );
				}
				if( type == "修改样式属性-战斗层级" ){
					$gameTemp.drill_BFBPa_setStyle_layerIndex( temp1 );
				}
				if( type == "修改样式属性-图片层级" ){
					temp1 = temp1.replace("图片层级[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFBPa_setStyle_zIndex( Number(temp1) );
				}
				if( type == "修改样式属性-粒子数量" ){
					if( temp1.indexOf("数量变量[") != -1 ){
						temp1 = temp1.replace("数量变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFBPa_setStyle_parCount( temp1 );
					}
					else if( temp1.indexOf("数量[") != -1 ){
						temp1 = temp1.replace("数量[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFBPa_setStyle_parCount( temp1 );
					}
				}
				if( type == "修改样式属性-粒子生命周期" ){
					if( temp1.indexOf("时长变量[") != -1 ){
						temp1 = temp1.replace("时长变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFBPa_setStyle_parLife( temp1 );
					}
					else if( temp1.indexOf("时长[") != -1 ){
						temp1 = temp1.replace("时长[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFBPa_setStyle_parLife( temp1 );
					}
				}
				if( type == "修改样式属性-粒子自旋转初始角度" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFBPa_setStyle_parSelfRotateFix( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFBPa_setStyle_parSelfRotateFix( temp1 );
					}
				}
				if( type == "修改样式属性-粒子固定方向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFBPa_setStyle_parDirFix( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFBPa_setStyle_parDirFix( temp1 );
					}
				}
				if( type == "修改样式属性-粒子扇形朝向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_BFBPa_setStyle_parDirSectorFace( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_BFBPa_setStyle_parDirSectorFace( temp1 );
					}
				}
				if( type == "修改样式属性-粒子初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFBPa_setStyle_parSpeedBase( Number(temp1) );
				}
				if( type == "修改样式属性-粒子缩放值" ){
					temp1 = temp1.replace("缩放[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_BFBPa_setStyle_parScaleBase( Number(temp1) );
				}
			}
		}
		
		/*-----------------高级指令 - 创建------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" && type == "创建" ){
				
				var pos = null;
				if( temp1.indexOf("位置-敌方变量[") != -1 || temp1.indexOf("敌方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方变量[","");
					temp1 = temp1.replace("敌方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFBPa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-敌方[") != -1 || temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("位置-敌方[","");
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFBPa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方变量[") != -1 || temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("位置-我方变量[","");
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BFBPa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置-我方[") != -1 || temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("位置-我方[","");
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BFBPa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
				}else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
				}else if( temp1 == "位置-鼠标" || temp1 == "鼠标位置" ){
					pos = [ _drill_mouse_x, _drill_mouse_y ];
				}
				
				if( pos != null ){
					$gameTemp.drill_BFBPa_createByBuffer( pos );
				}
			}
		}
		
	}
};


//#############################################################################
// ** 【标准模块】单位贴图 ☆单位贴图
//#############################################################################
//##############################
// * 单位贴图 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BFBPa_getEnemySpriteTank = function(){
	return this.drill_BFBPa_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFBPa_getEnemySpriteByIndex = function( index ){
	return this.drill_BFBPa_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_BFBPa_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_BFBPa_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BFBPa_getActorSpriteTank = function(){
	return this.drill_BFBPa_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFBPa_getActorSpriteByIndex = function( index ){
	return this.drill_BFBPa_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BFBPa_getActorSpriteByActorId = function( actor_id ){
	return this.drill_BFBPa_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 单位贴图（接口实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_BFBPa_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_BFBPa_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BFBPa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.index() == index ){
			return enemy_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌人ID（私有）
//==============================
Game_Temp.prototype.drill_BFBPa_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_BFBPa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return []; }
	var result_list = [];
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.enemyId() == enemy_id ){
			result_list.push( enemy_sprite );
		}
	}
	return result_list;
};
//==============================
// * 单位贴图容器 - 获取 - 角色容器指针（私有）
//==============================
Game_Temp.prototype.drill_BFBPa_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_BFBPa_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BFBPa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.index() == index ){
			return actor_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据角色ID（私有）
//==============================
Game_Temp.prototype.drill_BFBPa_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_BFBPa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.actorId() == actor_id ){
			return actor_sprite;
		}
	}
	return null;
};



//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_BFBPa_layerAddSprite = function( sprite, layer_index ){
	this.drill_BFBPa_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BFBPa_layerRemoveSprite = function( sprite ){
	this.drill_BFBPa_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_BFBPa_sortByZIndex = function () {
    this.drill_BFBPa_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_BFBPa_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_BFBPa_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BFBPa_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_BFBPa_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BFBPa_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_BFBPa_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BFBPa_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_BFBPa_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BFBPa_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BFBPa_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_BFBPa_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_BFBPa_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BFBPa_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_BFBPa_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	if( option['benchmark'] == "相对于战斗" || option['benchmark'] == "相对于战斗场景" ){
		
		// > 战斗参照 -> 战斗参照
		if( layer == "下层" || layer == "上层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
		
		// > 战斗参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			xx += this._spriteset._baseSprite.x;
			yy += this._spriteset._baseSprite.y;
			
			// > 战斗镜头位移（在图层内）
			if( Imported.Drill_BattleCamera ){
				var offset_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPosOffset();
				xx += offset_pos.x;
				yy += offset_pos.y;
			}else{
				xx += this._spriteset._battleField.x;
				yy += this._spriteset._battleField.y;
			}
			return {'x':xx, 'y':yy };
		}
		
	}else{
		
		// > 镜头参照 -> 镜头参照
		if( layer == "下层" || layer == "上层" ){
			xx -= this._spriteset._baseSprite.x;
			yy -= this._spriteset._baseSprite.y;
			
			// > 战斗镜头位移（在图层内）
			if( Imported.Drill_BattleCamera ){
				var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
				xx -= camera_pos.x;
				yy -= camera_pos.y;
			}else{
				xx -= this._spriteset._battleField.x;
				yy -= this._spriteset._battleField.y;
			}
			return {'x':xx, 'y':yy };
		}
		
		// > 镜头参照 -> 战斗参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
	}
	return {'x':xx, 'y':yy };
}



//=============================================================================
// ** ☆临时对象
//			
//			说明：	> 此模块专门管理 插件指令控制的临时对象 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 临时对象 - 容器初始化
//==============================
var _drill_BFBPa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BFBPa_temp_initialize.call(this);
	this._drill_BFBPa_commandBuffer = null;		//临时对象
	this._drill_BFBPa_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 临时对象 - 容器销毁
//==============================
var _drill_BFBPa_temp_terminate2 = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_BFBPa_temp_terminate2.call(this);
	this._drill_BFBPa_commandBuffer = null;		//临时对象
	this._drill_BFBPa_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 『临时对象』 - 简单指令
//==============================
Game_Temp.prototype.drill_BFBPa_createSimple = function( pos, style_id ){
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFBPa_style[ style_id ] ));
	
	// > 临时对象设置
	data['param_x'] = pos[0];
	data['param_y'] = pos[1];
	
	this._drill_BFBPa_commandSeq.push( data );
};
//==============================
// * 『临时对象』 - 高级指令 初始化
//==============================
Game_Temp.prototype.drill_BFBPa_setBuffer = function( style_id ){
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_BFBPa_style[ style_id ] ));
	
	// > 临时对象设置
	data['param_x'] = 0;
	data['param_y'] = 0;
	
	this._drill_BFBPa_commandBuffer = data;
};
//==============================
// * 『临时对象』 - 高级指令 创建
//==============================
Game_Temp.prototype.drill_BFBPa_createByBuffer = function( pos ){
	var data = this._drill_BFBPa_commandBuffer;
	if( data == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	data = JSON.parse(JSON.stringify( data ));
	
	// > 临时对象设置
	data['param_x'] = pos[0];
	data['param_y'] = pos[1];
	
	this._drill_BFBPa_commandSeq.push( data );
};
//==============================
// * 临时对象 - 修改样式属性-混合模式
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_blendMode = function( blendMode ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['blendMode'] = blendMode;
};
//==============================
// * 临时对象 - 修改样式属性-额外位置偏移
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_offset = function( xx, yy ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['offsetEx_x'] = xx;
	this._drill_BFBPa_commandBuffer['s_data']['offsetEx_y'] = yy;
};
//==============================
// * 临时对象 - 修改样式属性-UI基准
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_benchmark = function( benchmark ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['benchmark'] = benchmark;
};
//==============================
// * 临时对象 - 修改样式属性-战斗层级
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_layerIndex = function( layerIndex ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['layerIndex'] = layerIndex;
};
//==============================
// * 临时对象 - 修改样式属性-图片层级
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_zIndex = function( zIndex ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['zIndex'] = zIndex;
};
//==============================
// * 临时对象 - 修改样式属性-粒子数量
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_parCount = function( par_count ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['par_count'] = par_count;
};
//==============================
// * 临时对象 - 修改样式属性-粒子生命周期
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_parLife = function( par_life ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['par_life'] = par_life;
};
//==============================
// * 临时对象 - 修改样式属性-粒子自旋转初始角度
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_parSelfRotateFix = function( par_selfRotateFix ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['par_selfRotateFix'] = par_selfRotateFix;
};
//==============================
// * 临时对象 - 修改样式属性-粒子固定方向
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_parDirFix = function( par_dirFix ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['par_dirFix'] = par_dirFix;
};
//==============================
// * 临时对象 - 修改样式属性-粒子扇形朝向
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_parDirSectorFace = function( par_dirSectorFace ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['par_dirSectorFace'] = par_dirSectorFace;
};
//==============================
// * 临时对象 - 修改样式属性-粒子初速度
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_parSpeedBase = function( par_speedBase ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['par_speedBase'] = par_speedBase;
};
//==============================
// * 临时对象 - 修改样式属性-粒子缩放值
//==============================
Game_Temp.prototype.drill_BFBPa_setStyle_parScaleBase = function( par_scaleBase ){
	if( this._drill_BFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_BFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_BFBPa_commandBuffer['s_data']['par_scaleBase'] = par_scaleBase;
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 容器初始化
//==============================
var _drill_BFBPa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BFBPa_temp_initialize2.call(this);
	this._drill_BFBPa_controllerTank = [];		//数据容器
	this._drill_BFBPa_spriteTank = [];			//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新（战斗界面）
//==============================
var _drill_BFBPa_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_BFBPa_sbattle_update.call(this);
	this.drill_BFBPa_updateWindowAddChild();		//帧刷新 - 指令建立贴图
	this.drill_BFBPa_updateController();			//帧刷新 - 控制器
	this.drill_BFBPa_updateDestroy();				//帧刷新 - 销毁
}
//==============================
// * 贴图控制 - 帧刷新 指令建立贴图
//==============================
Scene_Battle.prototype.drill_BFBPa_updateWindowAddChild = function() {
	for( var i = $gameTemp._drill_BFBPa_commandSeq.length-1; i >= 0; i-- ){
		var temp_data = $gameTemp._drill_BFBPa_commandSeq[i];
		if( temp_data == undefined ){ continue; }
		
		// > 创建数据
		var s_data = temp_data['s_data'];
		s_data['param_x'] = temp_data['param_x'];
		s_data['param_y'] = temp_data['param_y'];
		var temp_controller = new Drill_BFBPa_Controller( s_data );
		$gameTemp._drill_BFBPa_controllerTank.push( temp_controller );
		
		// > 创建贴图
		var temp_sprite = new Drill_BFBPa_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		
		// > 双层效果
		if( temp_controller._drill_data['second_enable'] == true ){
			
			// > 双层效果 - 创建贴图
			var temp_secSprite = new Drill_BFBPa_SecSprite( temp_sprite );
			
			// > 双层效果 - 添加贴图到层级（先添加）
			$gameTemp._drill_BFBPa_spriteTank.push( temp_secSprite );
			this.drill_BFBPa_layerAddSprite( temp_secSprite, s_data['second_layerIndex'] );
		}
		
		
		// > 添加贴图到层级
		$gameTemp._drill_BFBPa_spriteTank.push( temp_sprite );
		this.drill_BFBPa_layerAddSprite( temp_sprite, s_data['layerIndex'] );
		
		// > 层级排序
		//（暂时不排了，浪费资源）
	
		// > 出栈
		$gameTemp._drill_BFBPa_commandSeq.splice( i, 1 );
	}
}
//==============================
// * 贴图控制 - 帧刷新 控制器
//==============================
Scene_Battle.prototype.drill_BFBPa_updateController = function() {
	
	// > 帧刷新 - 控制器
	for(var i = $gameTemp._drill_BFBPa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_BFBPa_controllerTank[i];
		temp_controller.drill_controller_update();
		
		
		// > 层级与镜头的位移
		var xx = temp_controller._drill_x;
		var yy = temp_controller._drill_y;
		var s_data = temp_controller._drill_data;
		var option = {
			"benchmark": s_data['benchmark'],
		};
		var pos = this.drill_BFBPa_layerCameraMoving(xx, yy, s_data['layerIndex'], option );
		xx = pos['x'];
		yy = pos['y'];
		
		
		// > 位置数据
		xx += s_data['param_x'];
		yy += s_data['param_y'];
		
		// > 额外位置偏移
		xx += s_data['offsetEx_x'];
		yy += s_data['offsetEx_y'];
		
		temp_controller._drill_x = xx;
		temp_controller._drill_y = yy;
	}
}
//==============================
// * 贴图控制 - 帧刷新 销毁
//==============================
Scene_Battle.prototype.drill_BFBPa_updateDestroy = function() {
	
	// > 自动销毁 - 控制器
	for(var i = $gameTemp._drill_BFBPa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_BFBPa_controllerTank[i];
		if( temp_controller.drill_BFBPa_isDead() ){
			$gameTemp._drill_BFBPa_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_BFBPa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_BFBPa_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_BFBPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_BFBPa_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};

	

//=============================================================================
// ** 小爆炸粒子控制器【Drill_BFBPa_Controller】
// **		
// **		作用域：	战斗界面
// **		主功能：	> 定义一个专门控制动画粒子的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B粒子群弹道
// **					->C随机因子
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **		
// **		说明：	> 该类处于战斗界面，只一次性使用。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_BFBPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_BFBPa_Controller.prototype = Object.create(Drill_COPa_Controller.prototype);
Drill_BFBPa_Controller.prototype.constructor = Drill_BFBPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_BFBPa_Controller.prototype.initialize = function( data ){
    Drill_COPa_Controller.prototype.initialize.call( this, data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_BFBPa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_Controller.prototype.drill_controller_update.call( this );
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_BFBPa_Controller.prototype.drill_controller_resetData = function( data ){
    Drill_COPa_Controller.prototype.drill_controller_resetData.call( this, data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BFBPa_Controller.prototype.drill_controller_setVisible = function( visible ){
    Drill_COPa_Controller.prototype.drill_controller_setVisible.call( this, visible );
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BFBPa_Controller.prototype.drill_controller_setPause = function( pause ){
    Drill_COPa_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_BFBPa_Controller.prototype.drill_controller_destroy = function(){
    Drill_COPa_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_BFBPa_Controller.prototype.drill_BFBPa_isDead = function(){
	return Drill_COPa_Controller.prototype.drill_controller_isDead.call( this );
};
//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_BFBPa_Controller.prototype.drill_controller_initData = function(){
	Drill_COPa_Controller.prototype.drill_controller_initData.call( this );
	var data = this._drill_data;
	
	// > 贴图
	data['src_img_file'] = "img/Special__anim/";
	data['trailing_src_img_file'] = "img/Special__anim/";
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "图片层" };						//贴图 - 所在层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };									//贴图 - 图片层级（贴图用）
	
	// > D粒子变化
	data['par_holdingBirthPosition'] = false;													//D粒子变化 - 粒子是否滞留
	
	// > E粒子重设
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };					//E粒子重设 - 粒子出现范围
	
	// > F双层效果
	if( data['second_layerIndex'] == undefined ){ data['second_layerIndex'] = "图片层" };		//F双层效果 - 第二层粒子层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };						//F双层效果 - 第二层粒子图片层级
	
	// > I粒子生命周期
	data['par_lifeType'] = "同时产生(一次性)";
}
//==============================
// * 控制器 - 初始化子功能
//==============================
Drill_BFBPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_Controller.prototype.drill_controller_initChild.call( this );
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_BFBPa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_Controller.prototype.drill_controller_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_BFBPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_BFBPa_Controller.prototype.drill_controller_initBallistics = function() {
	Drill_COPa_Controller.prototype.drill_controller_initBallistics.call( this );
}
//==============================
// * C随机因子 - 初始化子功能
//==============================
Drill_BFBPa_Controller.prototype.drill_controller_initRandom = function() {
	Drill_COPa_Controller.prototype.drill_controller_initRandom.call( this );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_BFBPa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_BFBPa_Controller.prototype.drill_controller_initReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_initReset.call( this );
}
//==============================
// * E粒子重设 - 帧刷新
//==============================
Drill_BFBPa_Controller.prototype.drill_controller_updateReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_updateReset.call( this );
}
//==============================
// * E粒子重设 - 执行重设 - 位置
//
//			说明：	> 由于当前插件为 个体装饰，因此起始点为 一个圆内随机出现 。
//==============================	
Drill_BFBPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	
	var angle = 360 * this.drill_controller_curRandom( cur_iteration*i + 41*i );		//（一个圆内随机出现）
	var radius = data['par_birthRange'] * this.drill_controller_curRandom( cur_iteration*i +43*i +1000 );
	var xx = radius * Math.cos( angle *Math.PI/180 );
	var yy = radius * Math.sin( angle *Math.PI/180 );
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
}
//==============================
// * F双层效果 - 初始化子功能
//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
// * H贴图高宽 - 初始化子功能
//==============================
// * I粒子生命周期 - 初始化子功能
//==============================



//=============================================================================
// ** 小爆炸粒子贴图【Drill_BFBPa_Sprite】
// **
// **		作用域：	战斗界面
// **		主功能：	> 定义一个粒子贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					->A主体
// **						->层级位置修正
// **					->B粒子群弹道
// **					->C对象绑定
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器和个体贴图 ）
// **
// **		代码：	> 范围 - 该类显示单独的动画装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 贴图与数据分离。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，在 _spriteset 创建后，再创建此贴图。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_BFBPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_BFBPa_Sprite.prototype = Object.create(Drill_COPa_Sprite.prototype);
Drill_BFBPa_Sprite.prototype.constructor = Drill_BFBPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_BFBPa_Sprite.prototype.initialize = function(){
    Drill_COPa_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_BFBPa_Sprite.prototype.update = function() {
	Drill_COPa_Sprite.prototype.update.call(this);
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_BFBPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行手动初始化。
//##############################
Drill_BFBPa_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initChild.call( this );
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_BFBPa_Sprite.prototype.drill_sprite_isReady = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_BFBPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 粒子贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_BFBPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 粒子贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_BFBPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 粒子贴图 - 销毁子功能
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroySelf.call( this );
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private.call( this );
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_BFBPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	this.zIndex = this._drill_controller._drill_data['zIndex'];
};
//==============================
// * A主体 - 帧刷新 - 位置
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_updateAttr_Position = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position.call( this );
	// > 层级位置修正
	//	（该函数被上提到战斗界面中执行，见 层级与镜头的位移 ）
};
//==============================
// * A主体 - 帧刷新 - 可见
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_updateAttr_Visible = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Visible.call( this );
};
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_initBallistics = function() {
	
	// > 粒子 出生时父类位置标记（无）
	
    Drill_COPa_Sprite.prototype.drill_sprite_initBallistics.call( this );
}
//==============================
// * B粒子群弹道 - 推演弹道
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
    Drill_COPa_Sprite.prototype.drill_sprite_refreshBallistics.call( this, i );
	
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_initTransform = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initTransform.call( this );
}
//==============================
// * D粒子变化 - 帧刷新 - 位置
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	//（不含粒子滞留功能）
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_BFBPa_Sprite.prototype.drill_sprite_initReset = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initReset.call( this );
}
//==============================
// * F双层效果 - 初始化子功能
//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
// * H贴图高宽 - 初始化子功能
//==============================
// * I粒子生命周期 - 初始化子功能
//==============================



//=============================================================================
// ** 小爆炸粒子贴图（第二层）【Drill_BFBPa_SecSprite】
// **
// **		作用域：	战斗界面
// **		主功能：	> 定义一个 第二层粒子贴图 。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					->A主体
// **					->B粒子群弹道（无）
// **					->C对象绑定（无）
// **					->D粒子变化
// **					->E粒子重设（无）
// **					->F双层效果（无）
// **					->G直线拖尾贴图（无）
// **					->H贴图高宽（无）
// **					->I粒子生命周期（无）
// **
// **		说明：	> 第二层粒子与 父贴图 的 D粒子变化 保持一致。
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_BFBPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_BFBPa_SecSprite.prototype = Object.create(Drill_COPa_SecSprite.prototype);
Drill_BFBPa_SecSprite.prototype.constructor = Drill_BFBPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_BFBPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_BFBPa_SecSprite.prototype.update = function() {
	Drill_COPa_SecSprite.prototype.update.call(this);
}
//##############################
// * 第二层粒子 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isReady.call(this);
};
//##############################
// * 第二层粒子 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed.call(this);
};
//##############################
// * 第二层粒子 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy.call(this);
};
//##############################
// * 第二层粒子 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化自身
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
};
//==============================
// * 第二层粒子 - 初始化子功能
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁子功能
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private = function(){
	return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private.call( this );
}

//==============================
// * A主体（第二层） - 初始化子功能
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
};
//==============================
// * B粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_initBallistics = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initBallistics.call( this );
};
//==============================
// * D粒子变化（第二层） - 初始化子功能
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_initTransform = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initTransform.call( this );
}
//==============================
// * E粒子重设（第二层） - 初始化子功能
//==============================
Drill_BFBPa_SecSprite.prototype.drill_spriteSec_initReset = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initReset.call( this );
};
//==============================
// * F双层效果（第二层） - 初始化子功能
//==============================
// * G直线拖尾贴图（第二层） - 初始化子功能
//==============================
// * H贴图高宽（第二层） - 初始化子功能
//==============================
// * I粒子生命周期（第二层） - 初始化子功能
//==============================



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleFloatingBlastParticle = false;
		var pluginTip = DrillUp.drill_BFBPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

