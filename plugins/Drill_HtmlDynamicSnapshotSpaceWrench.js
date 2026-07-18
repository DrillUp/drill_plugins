//=============================================================================
// Drill_HtmlDynamicSnapshotSpaceWrench.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        游戏窗体 - 动态快照次元斩
 * @author Drill_up
 * 
 * @Drill_LE_param "次元斩样式-%d"
 * @Drill_LE_parentKey "---次元斩样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_HDSSW_style_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_HtmlDynamicSnapshotSpaceWrench +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令快速实现次元斩效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 基于：
 *   - Drill_CoreOfBallistics            数学模型-弹道核心★★v2.2及以上★★
 *   - Drill_CoreOfDynamicSnapshot       游戏窗体-动态快照核心
 *   - Drill_HtmlDynamicSnapshotSprite   游戏窗体-天窗层的多层动态快照
 *   - Drill_HtmlDynamicSnapshotCircle   游戏窗体-天窗层的多层魔法圈
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于渲染器。
 * 2.更多详细内容，去看看文档 "1.系统 > 大家族-屏幕快照.docx"。
 * 细节：
 *   (1.天窗层是在整个游戏画面之上的特殊层级，比最顶层还高，
 *      只有天窗层才能使用动态快照效果。
 *   (2.游戏中所有的画面都会被动态快照实时播放，
 *      但不包括天窗层的贴图，以及动态快照自己。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.该插件省去了一个个动态快照配遮罩的麻烦，通过插件指令快速创建
 *      次元斩切割一刀所对应的贴图，多次执行还能反复切割画面。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__layer （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 次元斩样式-1 资源-切割白背景
 * 次元斩样式-1 资源-切割白闪烁
 * 次元斩样式-1 资源-刀光
 * 次元斩样式-2 资源-切割白背景
 * 次元斩样式-2 资源-切割白闪烁
 * 次元斩样式-2 资源-刀光
 * ……
 *
 * 动态快照本身不需要资源，遮罩资源放在Special__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动切割：
 * 
 * 插件指令：>动态快照次元斩 : 执行切割 : 样式[1] : 线段[100,100,200,200]
 * 插件指令：>动态快照次元斩 : 执行切割 : 样式[1] : 线段变量[21,22,23,24]
 * 插件指令：>动态快照次元斩 : 执行切割 : 样式[1] : 随机线段
 * 插件指令：>动态快照次元斩 : 立即清除全部碎片
 * 
 * 1."线段"的四个参数分别指 x1,y1 和 x2,y2 两个点组成的线段，
 *   插件会将此线段进行数学换算，变成一条按照线段方向切过去的次元斩。
 *   x1,y1 为起点，x2,y2 为终点。
 * 2."线段变量[21,22,23,24]"是指线段的 x1为 变量21的值，y1为 变量22的值，
 *    x2为 变量23的值，y2为 变量24的值。
 * 3.注意，根据实际测试，切割超过16个以上(5刀左右)的碎片，会变得非常卡顿。
 *   建议设计时，使用固定线段进行切割，并尽可能减少交叉切割造成大量碎片。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以使用下面的插件指令修改配置：
 * 
 * 插件指令：>动态快照次元斩 : 修改-战斗结束时是否清除所有碎片 : 开启
 * 插件指令：>动态快照次元斩 : 修改-战斗结束时是否清除所有碎片 : 关闭
 * 插件指令：>动态快照次元斩 : 修改-战斗结束时是否清除所有碎片 : 恢复默认
 * 插件指令：>动态快照次元斩 : 修改-是否限制碎片数量 : 开启
 * 插件指令：>动态快照次元斩 : 修改-是否限制碎片数量 : 关闭
 * 插件指令：>动态快照次元斩 : 修改-是否限制碎片数量 : 恢复默认
 * 插件指令：>动态快照次元斩 : 修改-限制的最大碎片数量 : 24
 * 插件指令：>动态快照次元斩 : 修改-限制的最大碎片数量 : 恢复默认
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法1：  在地图中放置多个动态快照，进行性能测试。
 * 测试结果1：  200个事件的地图中，平均消耗为：【95.61ms】
 *              100个事件的地图中，平均消耗为：【50.18ms】
 *               50个事件的地图中，平均消耗为：【39.22ms】
 * 测试方法2：  在不同的界面中，进行性能测试。
 * 测试结果2：  战斗界面中，平均消耗为：【37.25ms】
 *              菜单界面中，平均消耗为：【48.61ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.动态快照包含了对渲染器的处理，通过核心中提供的渲染图像，
 *   对图像进行二次操作，因此消耗较多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件指令"线段变量"的设置。
 * [v1.2]
 * 改进了天窗层帧刷新的结构。
 * 
 * @param 战斗结束时是否清除所有碎片
 * @type boolean
 * @on 清除
 * @off 关闭
 * @desc true - 清除，false - 关闭。战斗结束时，都会执行一次碎片清除，不然会一直残留到下次战斗。
 * @default false
 *
 * @param 是否限制碎片数量
 * @type boolean
 * @on 限制
 * @off 关闭
 * @desc true - 限制，false - 关闭。碎片数量如果超出了最大值，那么下次切割前会立即清空所有碎片。
 * @default true
 *
 * @param 限制的最大碎片数量
 * @parent 是否限制碎片数量
 * @type number
 * @min 1
 * @desc 限制的最大碎片数量。
 * @default 24
 * 
 * @param ---次元斩样式组 1至20---
 * @default 
 * 
 * @param 次元斩样式-1
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default {"标签":"==轻刃样式==","---贴图---":"","是否预加载":"true","是否在地图界面中启用":"true","是否在战斗界面中启用":"true","是否在菜单界面中启用":"true","图片层级":"20","---随机碎片---":"","随机平移幅度 X":"20","随机平移幅度 Y":"20","最小缩放值":"1.04","随机缩放幅度 X":"0.06","随机缩放幅度 Y":"0.06","随机旋转幅度":"0","---动画---":"","资源-切割白背景":"次元斩-底面幕布","是否开启闪烁":"true","资源-切割白闪烁":"天窗层背景-幕布-纯色-白","闪烁时长":"24","闪烁透明度":"75","是否开启直线刀光":"true","资源-直线刀光":"次元斩-直线刀光","直线刀光播放时长":"16","是否开启半面刀光":"false","资源-半面刀光":"","半面刀光方向类型":"含画面中心点的半边","半面刀光显现时间":"12","半面刀光消失时间":"270","是否开启直线伤痕":"false","资源-直线伤痕":"","直线伤痕显现时间":"12","直线伤痕消失时间":"270"}
 * 
 * @param 次元斩样式-2
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default {"标签":"==重砍样式==","---贴图---":"","是否预加载":"true","是否在地图界面中启用":"true","是否在战斗界面中启用":"true","是否在菜单界面中启用":"true","图片层级":"20","---随机碎片---":"","随机平移幅度 X":"20","随机平移幅度 Y":"20","最小缩放值":"1.04","随机缩放幅度 X":"0.06","随机缩放幅度 Y":"0.06","随机旋转幅度":"0","---动画---":"","资源-切割白背景":"次元斩-底面幕布","是否开启闪烁":"true","资源-切割白闪烁":"天窗层背景-幕布-纯色-红","闪烁时长":"24","闪烁透明度":"75","是否开启直线刀光":"false","资源-直线刀光":"次元斩-直线刀光","直线刀光播放时长":"16","是否开启半面刀光":"true","资源-半面刀光":"次元斩-半面刀光","半面刀光方向类型":"含画面中心点的半边","半面刀光显现时间":"12","半面刀光消失时间":"20","是否开启直线伤痕":"true","资源-直线伤痕":"次元斩-直线伤痕","直线伤痕显现时间":"12","直线伤痕消失时间":"270"}
 * 
 * @param 次元斩样式-3
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-4
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-5
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-6
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-7
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-8
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-9
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-10
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-11
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-12
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-13
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-14
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-15
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-16
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-17
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-18
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-19
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-20
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param ---次元斩样式组21至40---
 * @default 
 * 
 * @param 次元斩样式-21
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-22
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-23
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-24
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-25
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-26
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-27
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-28
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-29
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-30
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-31
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-32
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-33
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-34
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-35
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-36
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-37
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-38
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-39
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default 
 * 
 * @param 次元斩样式-40
 * @parent ---次元斩样式组21至40---
 * @type struct<HDSSWSprite>
 * @desc 动态快照的详细配置信息。
 * @default
 * 
 */
/*~struct~HDSSWSprite:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的天窗层动态快照==
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍可见："1.系统 > 关于预加载.docx"。
 * @default false
 *
 * @param 是否在地图界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在战斗界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在菜单界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在STG界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在ACT界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 天窗层先后排序的位置，0表示最后面。
 * @default 20
 * 
 * 
 * @param ---随机碎片---
 * @default 
 *
 * @param 随机平移幅度 X
 * @parent ---随机碎片---
 * @type number
 * @min 0
 * @desc 碎片切割后，平移的幅度范围。单位像素。
 * @default 20
 *
 * @param 随机平移幅度 Y
 * @parent ---随机碎片---
 * @type number
 * @min 0
 * @desc 碎片切割后，平移的幅度范围。单位像素。
 * @default 20
 *
 * @param 最小缩放值
 * @parent ---随机碎片---
 * @desc 切割碎片的最小缩放值，放大是为了随机平移时不会看到切割边缘。通常为104%，624*0.04=24.96像素，大于平移20范围。
 * @default 1.04
 * 
 * @param 随机缩放幅度 X
 * @parent ---随机碎片---
 * @desc 碎片切割后，在最小缩放值的基础上，随机缩放的幅度范围。
 * @default 0.06
 *
 * @param 随机缩放幅度 Y
 * @parent ---随机碎片---
 * @desc 碎片切割后，在最小缩放值的基础上，随机缩放的幅度范围。
 * @default 0.06
 *
 * @param 随机旋转幅度
 * @parent ---随机碎片---
 * @type number
 * @min 0
 * @max 360
 * @desc 碎片切割后，左右随机旋转的角度范围。单位角度。
 * @default 0
 * 
 * 
 * @param ---动画---
 * @default 
 * 
 * @param 资源-切割白背景
 * @parent ---动画---
 * @desc 切割时的底部白背景资源，你也可以换成其它颜色的资源图片，另外注意资源图片要与游戏屏幕一样大。
 * @default (需配置)动态快照次元斩-切割白背景
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 *
 * @param 是否开启闪烁
 * @parent ---动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。每次切割时，整个屏幕会闪一下。
 * @default false
 * 
 * @param 资源-切割白闪烁
 * @parent 是否开启闪烁
 * @desc 切割白闪烁的图片资源。你可以换成其它颜色的资源图片，但注意资源图片要与游戏屏幕一样大。
 * @default (需配置)动态快照次元斩-切割白闪烁
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 闪烁时长
 * @parent 是否开启闪烁
 * @type number
 * @min 1
 * @desc 切割白闪烁的闪烁时长。
 * @default 24
 *
 * @param 闪烁透明度
 * @parent 是否开启闪烁
 * @type number
 * @min 0
 * @max 255
 * @desc 切割白闪烁的透明度。
 * @default 75
 *
 *
 * @param 是否开启直线刀光
 * @parent ---动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。每次切割时，会有直线刀光沿着切割线进行直线移动。
 * @default false
 * 
 * @param 资源-直线刀光
 * @parent 是否开启直线刀光
 * @desc 切割时直线刀光的图片资源。
 * @default (需配置)动态快照次元斩-直线刀光
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 直线刀光播放时长
 * @parent 是否开启直线刀光
 * @type number
 * @min 1
 * @desc 直线刀光动画的播放时长。
 * @default 16
 *
 *
 * @param 是否开启半面刀光
 * @parent ---动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。每次切割时，会有半面刀光根据切割线中心点来旋转一周。
 * @default false
 * 
 * @param 资源-半面刀光
 * @parent 是否开启半面刀光
 * @desc 切割时半面刀光的图片资源。
 * @default (需配置)动态快照次元斩-半面刀光
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 半面刀光方向类型
 * @parent 是否开启半面刀光
 * @type select
 * @option 切割方向的左半边
 * @value 切割方向的左半边
 * @option 切割方向的右半边
 * @value 切割方向的右半边
 * @option 含画面中心点的半边
 * @value 含画面中心点的半边
 * @option 不含画面中心点的半边
 * @value 不含画面中心点的半边
 * @desc 半面刀光的方向类型，具体去看看文档了解类型。
 * @default 含画面中心点的半边
 *
 * @param 半面刀光显现时间
 * @parent 是否开启半面刀光
 * @type number
 * @min 1
 * @desc 半面刀光的显现时间。
 * @default 12
 *
 * @param 半面刀光消失时间
 * @parent 是否开启半面刀光
 * @type number
 * @min 1
 * @desc 半面刀光的消失时间。
 * @default 270
 *
 *
 * @param 是否开启直线伤痕
 * @parent ---动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。每次切割时，沿着切割线留下直线伤痕。
 * @default false
 * 
 * @param 资源-直线伤痕
 * @parent 是否开启直线伤痕
 * @desc 直线伤痕的图片资源。
 * @default (需配置)动态快照次元斩-直线伤痕
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 直线伤痕显现时间
 * @parent 是否开启直线伤痕
 * @type number
 * @min 1
 * @desc 直线伤痕的显现时间。
 * @default 12
 *
 * @param 直线伤痕消失时间
 * @parent 是否开启直线伤痕
 * @type number
 * @min 1
 * @desc 直线伤痕的消失时间。
 * @default 270
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		HDSSW（Html_Dynamic_Snapshot_Space_Wrench）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	特效管理层
//		★性能测试消耗	18.2ms（Drill_HDSSW_SnapshotSprite.update）9.8ms（Drill_HDSSW_CircleSprite.update）
//						4.6ms（drill_HDSSW_updateController）4.4ms（drill_HDSSW_updateCircleController）
//		★最坏情况		暂无
//		★备注			这里的消耗不包含动态快照的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆预加载
//			->☆存储数据
//			
//			->☆自定义控制
//			
//			
//			->☆切割计算
//				->执行多边形切割
//				->数学工具
//			->☆动态快照天窗层贴图对象池管理
//				->创建贴图
//				->销毁贴图
//			->☆动态快照控制器与贴图
//				->立即清除全部碎片（开放函数）
//				->帧刷新 单次切割
//				->帧刷新 控制器
//				->帧刷新 自动销毁
//			
//			->动态快照控制器【Drill_HDSSW_SnapshotController】
//			->动态快照贴图【Drill_HDSSW_SnapshotSprite】
//			
//			
//			->☆刀光计算
//				->获取刀光起点终点
//				->数学工具
//			->☆魔法圈天窗层贴图对象池管理
//				->创建魔法圈贴图
//				->销毁魔法圈贴图
//			->☆魔法圈控制器与贴图
//				->立即清除全部碎片（继承）
//				->帧刷新 单次切割
//				->帧刷新 控制器（继承）
//				->帧刷新 自动销毁（继承）
//			
//			->魔法圈控制器【Drill_HDSSW_CircleController】
//			->魔法圈贴图【Drill_HDSSW_CircleSprite】
//			
//			->☆引擎兼容（STG）
//			->☆引擎兼容（ACT）
//
//
//		★家谱：
//			大家族-屏幕快照
//		
//		★脚本文档：
//			22.游戏窗体 > 多层组合装饰（界面装饰-天窗层）（脚本）.docx
//		
//		★插件私有类：
//			* 动态快照控制器【Drill_HDSSW_SnapshotController】
//			* 动态快照贴图【Drill_HDSSW_SnapshotSprite】
//			* 魔法圈控制器【Drill_HDSSW_CircleController】
//			* 魔法圈贴图【Drill_HDSSW_CircleSprite】
//		
//		★必要注意事项：
//			1.该插件的 魔法圈控制器 和 动态快照控制器 相互独立，可以分离开来。
//		
//		★其它说明细节：
//			1.该插件用了大量数学工具，写函数时注意考虑 null 的情况。
//		
//		★存在的问题：
//			1.问题：见函数 drill_HDSSW_Math2D_getPointToPointDegree 的调用位置，可能存在精度偏差，造成旋转角度不对。
//			  解决：【未解决】
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_HDSSW_PluginTip_curName = "Drill_HtmlDynamicSnapshotSpaceWrench.js 游戏窗体-动态快照次元斩";
	DrillUp.g_HDSSW_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_CoreOfDynamicSnapshot.js 游戏窗体-动态快照核心",
		"Drill_HtmlDynamicSnapshotSprite.js 游戏窗体-天窗层的多层动态快照",
		"Drill_HtmlDynamicSnapshotCircle.js 游戏窗体-天窗层的多层魔法圈"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_HDSSW_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_HDSSW_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_HDSSW_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
		if( check_tank ){
			var keys = Object.keys( check_tank );
			for( var i=0; i < keys.length; i++ ){
				text += "\n" + keys[i] + "的值：" + check_tank[ keys[i] ] ;
			}
		}
		return text;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示2
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_NeedUpdate_DynamicSnapshot = function(){
		return "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n动态快照核心版本过低，你需要更新 动态快照核心 至少v1.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_HtmlDynamicSnapshotSpaceWrench = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_HtmlDynamicSnapshotSpaceWrench');
	
	//==============================
	// * 静态数据 - 次元斩样式
	//				（~struct~HDSSWSprite）
	//==============================
	DrillUp.drill_HDSSW_spriteInit = function( dataFrom ){
		var data = {};
		
		// > 预加载
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		// > 界面
		data['map_enabled'] = String( dataFrom["是否在地图界面中启用"] || "true") == "true";
		data['battle_enabled'] = String( dataFrom["是否在战斗界面中启用"] || "true") == "true";
		data['menu_enabled'] = String( dataFrom["是否在菜单界面中启用"] || "true") == "true";
		data['STG_enabled'] = String( dataFrom["是否在STG界面中启用"] || "true") == "true";
		data['ACT_enabled'] = String( dataFrom["是否在ACT界面中启用"] || "true") == "true";
		
		
		// > A主体 - 基础特性
		data['visible'] = true;
		data['pause'] = false;
		data['blendMode'] = 0;
		data['zIndex'] = Number( dataFrom["图片层级"] || 20);
		data['styleName'] = String( dataFrom["标签"] || "");
		
		// > A主体 - 其它特性
		//	（无）
		
		/*
			注意，当前静态数据存在属性共用的情况，特殊配置要区分成独立的功能来配置。
		*/
		
		// > 2A动态快照遮罩管理
		//	（无）
		
		// > 2B动态快照偏移变换
		data['scope_x'] = Number( dataFrom["随机平移幅度 X"] || 20);
		data['scope_y'] = Number( dataFrom["随机平移幅度 Y"] || 20);
		data['min_scale'] = Number( dataFrom["最小缩放值"] || 1.04);
		data['scope_scaleX'] = Number( dataFrom["随机缩放幅度 X"] || 0.06);
		data['scope_scaleY'] = Number( dataFrom["随机缩放幅度 Y"] || 0.06);
		data['scope_rotate'] = Number( dataFrom["随机旋转幅度"] || 0);
		
		
		// > 2H魔法圈模式
		//	（无）
		
		// > 2I底面幕布
		data['background_img_src'] = String( dataFrom["资源-切割白背景"] || "");
		
		// > 2J闪烁幕布
		data['flicker_enable'] = String( dataFrom["是否开启闪烁"] || "false") == "true";
		data['flicker_img_src'] = String( dataFrom["资源-切割白闪烁"] || "");
		data['flicker_time'] = Number( dataFrom["闪烁时长"] || 24);
		data['flicker_opacity'] = Number( dataFrom["闪烁透明度"] || 75);
		
		// > 2K直线刀光
		data['moveKnife_enable'] = String( dataFrom["是否开启直线刀光"] || "false") == "true";
		data['moveKnife_img_src'] = String( dataFrom["资源-直线刀光"] || "");
		data['moveKnife_time'] = Number( dataFrom["直线刀光播放时长"] || 16);
		
		// > 2L半面刀光
		data['halfKnife_enable'] = String( dataFrom["是否开启半面刀光"] || "false") == "true";
		data['halfKnife_img_src'] = String( dataFrom["资源-半面刀光"] || "");
		data['halfKnife_posType'] = String( dataFrom["半面刀光方向类型"] || "");
		data['halfKnife_showingTime'] = Number( dataFrom["半面刀光显现时间"] || 12);
		data['halfKnife_hidingTime'] = Number( dataFrom["半面刀光消失时间"] || 30);
		
		// > 2M直线伤痕
		data['scar_enable'] = String( dataFrom["是否开启直线伤痕"] || "false") == "true";
		data['scar_img_src'] = String( dataFrom["资源-直线伤痕"] || "");
		data['scar_showingTime'] = Number( dataFrom["直线伤痕显现时间"] || 12);
		data['scar_hidingTime'] = Number( dataFrom["直线伤痕消失时间"] || 270);
		
		
		// > 控制器 - 『控制器与贴图的样式-静态数据-指针初始化』
		Drill_HDSSW_SnapshotController.drill_controller_initData( data );
		Drill_HDSSW_CircleController.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_HDSSW_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_HDSSW_scene_initialize.call(this);
		
		/*-----------------次元斩样式------------------*/
		for( var i = 0; i < DrillUp.g_HDSSW_style.length; i++ ){
			var temp = DrillUp.g_HDSSW_style[i];
			if( temp != undefined ){
				DrillUp.g_HDSSW_style[i] = DrillUp.drill_HDSSW_spriteInit( temp );
			}
		}
	}
	/*-----------------次元斩样式------------------*/
	DrillUp.g_HDSSW_style_length = 40;
	DrillUp.g_HDSSW_style = [];
	for (var i = 0; i < DrillUp.g_HDSSW_style_length; i++) {
		if( DrillUp.parameters["次元斩样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["次元斩样式-" + String(i+1) ] != "" ){
			DrillUp.g_HDSSW_style[i] = JSON.parse(DrillUp.parameters["次元斩样式-" + String(i+1) ]);
		}else{
			DrillUp.g_HDSSW_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_HDSSW_clearWhenBattleEndEnabled = String(DrillUp.parameters["战斗结束时是否清除所有碎片"] || "false") == "true";
	DrillUp.g_HDSSW_clearWhenExceedLimitEnabled = String(DrillUp.parameters["是否限制碎片数量"] || "true") == "true";
	DrillUp.g_HDSSW_limitNum = Number(DrillUp.parameters["限制的最大碎片数量"] || 16);
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfDynamicSnapshot &&
	Imported.Drill_HtmlDynamicSnapshotSprite &&
	Imported.Drill_HtmlDynamicSnapshotCircle ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){  //（弹道核心版本检测）
		alert( DrillUp.drill_HDSSW_getPluginTip_NeedUpdate_Ballistics() );
	}
	if( typeof(Graphics.drill_CODS_overstoryLayerClearAll) == "undefined" ){  //（动态快照核心版本检测）
		alert( DrillUp.drill_HDSSW_getPluginTip_NeedUpdate_DynamicSnapshot() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_HDSSW_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_HDSSW_pluginCommand.call(this, command, args);
	this.drill_HDSSW_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_HDSSW_pluginCommand = function( command, args ){
	if( command === ">动态快照次元斩" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "立即清除全部碎片" ){
				$gameSystem.drill_HDSSW_clearAll();
			}
		}
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "执行切割" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				
				if( temp2 == "随机线段" ){
					$gameTemp.drill_HDSSW_createCut(
						Number(temp1) -1,
						Graphics.boxWidth * Math.random(),		//『随机因子-图像用』
						Graphics.boxHeight * Math.random(),		//『随机因子-图像用』
						Graphics.boxWidth * Math.random(),		//『随机因子-图像用』
						Graphics.boxHeight * Math.random()		//『随机因子-图像用』
					);
					return;
				}
				if( temp2.indexOf("线段变量[") != -1 ){
					temp2 = temp2.replace("线段变量[","");
					temp2 = temp2.replace("]","");
					var arr = temp2.split(/[,，]/);
					if( arr.length >= 4 ){
						$gameTemp.drill_HDSSW_createCut(
							Number(temp1) -1,
							$gameVariables.value( Number(arr[0]) ),
							$gameVariables.value( Number(arr[1]) ),
							$gameVariables.value( Number(arr[2]) ),
							$gameVariables.value( Number(arr[3]) )
						);
						return;
					}
				}
				if( temp2.indexOf("线段[") != -1 ){
					temp2 = temp2.replace("线段[","");
					temp2 = temp2.replace("]","");
					var arr = temp2.split(/[,，]/);
					if( arr.length >= 4 ){
						$gameTemp.drill_HDSSW_createCut(
							Number(temp1) -1,
							Number(arr[0]),
							Number(arr[1]),
							Number(arr[2]),
							Number(arr[3])
						);
					}
					return;
				}
			}
		}
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改-战斗结束时是否清除所有碎片" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_HDSSW_clearWhenBattleEndEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_HDSSW_clearWhenBattleEndEnabled = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_HDSSW_clearWhenBattleEndEnabled = DrillUp.g_HDSSW_clearWhenBattleEndEnabled;
				}
			}
			if( type == "修改-是否限制碎片数量" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_HDSSW_clearWhenExceedLimitEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_HDSSW_clearWhenExceedLimitEnabled = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_HDSSW_clearWhenExceedLimitEnabled = DrillUp.g_HDSSW_clearWhenExceedLimitEnabled;
				}
			}
			if( type == "修改-限制的最大碎片数量" ){
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_HDSSW_limitNum = DrillUp.g_HDSSW_limitNum;
				}else{
					$gameSystem._drill_HDSSW_limitNum = Number(temp1);
				}
			}
		}
	}
};


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_HDSSW_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_HDSSW_preload_initialize.call(this);
	this.drill_HDSSW_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_HDSSW_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_HDSSW_preloadInit = function() {
	this._drill_HDSSW_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_HDSSW_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_HDSSW_style.length; i++ ){
		var temp_data = DrillUp.g_HDSSW_style[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		// > 2I底面幕布
		this._drill_HDSSW_preloadTank.push( 
			ImageManager.reserveBitmap( "img/Special__layer/", temp_data['background_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
		);
		
		// > 2J闪烁幕布
		if( temp_data['flicker_enable'] == true ){
			this._drill_HDSSW_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Special__layer/", temp_data['flicker_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
			);
		}
		
		// > 2K直线刀光
		if( temp_data['moveKnife_enable'] == true ){
			this._drill_HDSSW_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Special__layer/", temp_data['moveKnife_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
			);
		}
		
		// > 2L半面刀光
		if( temp_data['halfKnife_enable'] == true ){
			this._drill_HDSSW_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Special__layer/", temp_data['halfKnife_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
			);
		}
		
		// > 2M直线伤痕
		if( temp_data['scar_enable'] == true ){
			this._drill_HDSSW_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Special__layer/", temp_data['scar_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
			);
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_HDSSW_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSSW_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_HDSSW_sys_initialize.call(this);
	this.drill_HDSSW_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSSW_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_HDSSW_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_HDSSW_saveEnabled == true ){	
		$gameSystem.drill_HDSSW_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_HDSSW_initSysData();
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
Game_System.prototype.drill_HDSSW_initSysData = function() {
	this.drill_HDSSW_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_HDSSW_checkSysData = function() {
	this.drill_HDSSW_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_HDSSW_initSysData_Private = function() {
	
	this._drill_HDSSW_clearWhenBattleEndEnabled = DrillUp.g_HDSSW_clearWhenBattleEndEnabled;
	this._drill_HDSSW_clearWhenExceedLimitEnabled = DrillUp.g_HDSSW_clearWhenExceedLimitEnabled;
	this._drill_HDSSW_limitNum = DrillUp.g_HDSSW_limitNum;
	
	this._drill_HDSSW_snapshotControllerTank = [];	//控制器容器（动态快照）
	
	this._drill_HDSSW_circleControllerTank = [];	//控制器容器（刀光）
	this._drill_HDSSW_backgroundController = null;	//控制器（切割白背景）
	this._drill_HDSSW_flickerController = null;		//控制器（切割白闪烁）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_HDSSW_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_HDSSW_limitNum == undefined ){
		this.drill_HDSSW_initSysData();
	}
};




//=============================================================================
// ** ☆自定义控制
//
//			说明：	> 此模块提供 自定义控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 自定义控制 - 战斗界面销毁时
//==============================
var _drill_HDSSW_sbattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function(){
	_drill_HDSSW_sbattle_terminate.call(this);
	if( $gameSystem._drill_HDSSW_clearWhenBattleEndEnabled == true ){
		$gameSystem.drill_HDSSW_clearAll();		//（立即清除全部碎片）
	}
};




//=============================================================================
// ** ☆切割计算
//
//			说明：	> 此模块专门管理 切割计算。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 切割计算 - 执行多边形切割
//			
//			参数：	> convex_points 点列表 （凸包多边形的全部点）
//					> x1,y1 数字           （切割线的第1个点）
//					> x2,y2 数字           （切割线的第2个点）
//			返回：	> result['intersection_points'] （两交点）
//					> result['convexA_points']      （切割的多边形A）
//					> result['convexB_points']      （切割的多边形B）
//					> null                          （没切割到）
//
//			说明：	> 考虑到切割的多边形太小问题，多边形的点会进行偏移或者压缩，与交点不一定重合。
//==============================
Game_Temp.prototype.drill_HDSSW_cutFace = function( convex_points, x1,y1,x2,y2 ){
	
	// > 延长切割线（求直线与圆的交点）
	var ex_points = this.drill_HDSSW_getCircleTwoPoint( x1,y1,x2,y2 );
	if( ex_points == null ){ return null; }
	
	// > 凸包遍历
	//		（凸包与任意直线最多存在两个交点）
	var intersection_points = [];		//交点列表
	var isFindingA = true;				//多边形标记
	var convexA_points = [];			//切割的多边形A
	var convexB_points = [];			//切割的多边形B
	for(var i=0; i < convex_points.length; i++){
		var cur_point = convex_points[i];
		var next_point = convex_points[i+1];
		if( i == convex_points.length-1 ){
			next_point = convex_points[0];
		};
		
		// > 多边形添加点
		if( isFindingA == true ){
			convexA_points.push( cur_point );
		}else{
			convexB_points.push( cur_point );
		}
		
		// > 获取交点
		var data = this.drill_HDSSW_Math2D_getTwoLineIntersectionPointWithInLine( 
			cur_point['x'], cur_point['y'], next_point['x'], next_point['y'],
			ex_points[0]['x'],ex_points[0]['y'], ex_points[1]['x'],ex_points[1]['y']
		);
		if( data == null ){ continue; }
		
		// > 找到一个线上的交点
		if( data['inLine'] == true ){
			intersection_points.push( data );
			convexA_points.push( data );
			convexB_points.push( data );
			isFindingA = !isFindingA;	 //（多边形标记 取反）
		};
	}
	
	// > 去重
	intersection_points = this.drill_HDSSW_removeSamePoints( intersection_points );
	convexA_points = this.drill_HDSSW_removeSamePoints( convexA_points );
	convexB_points = this.drill_HDSSW_removeSamePoints( convexB_points );
	//alert( JSON.stringify( intersection_points ) )
	//alert( JSON.stringify( convexA_points ) )
	//alert( JSON.stringify( convexB_points ) )
	
	// > 相交点数不够，表示 没切割到
	if( intersection_points.length != 2 ){ return null; }
	
	// > 多边形点数不够，表示 没切割到
	if( convexA_points.length < 3 ){ return null; }
	if( convexB_points.length < 3 ){ return null; }
	
	var result = {};
	result['intersection_points'] = intersection_points;
	result['convexA_points'] = convexA_points;
	result['convexB_points'] = convexB_points;
	return result;
}
//==============================
// * 切割计算 - 坐标点去重
//			
//			参数：	> points 点列表
//			返回：	> 点列表
//
//			说明：	> 返回新数组，新数组为去重的点列表。
//==============================
Game_Temp.prototype.drill_HDSSW_removeSamePoints = function( points ){
	var result_list = [];
	for(var i = 0; i < points.length; i++ ){
		var point = points[i];
		
		// > 相同的点，不添加
		var is_same = false;
		for(var j = 0; j < result_list.length; j++ ){
			if( point['x'] == result_list[j]['x'] &&
				point['y'] == result_list[j]['y'] ){
				is_same = true;
				break;
			}
		}
		if( is_same == true ){ continue; }
		
		// > 不同的点，添加
		result_list.push( point );
	}
	return result_list;
}
//==============================
// * 切割计算 - 数学工具 - 求两直线的交点（含线段判断）
//			
//			参数：	> x1,y1 数字   （直线A的第1个点）
//					> x2,y2 数字   （直线A的第2个点）
//					> x3,y3 数字   （直线B的第1个点）
//					> x4,y4 数字   （直线B的第2个点）
//			返回：	> { x:0, y:0, inLine:false } （结果交点+交点是否在线段上）
//					> null                       （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getTwoLineIntersectionPointWithInLine = function( x1,y1,x2,y2, x3,y3,x4,y4 ){
	
	// > 获取交点
	var point = this.drill_HDSSW_Math2D_getTwoLineIntersectionPoint( x1,y1,x2,y2, x3,y3,x4,y4 );
	if( point == null ){ return null; }
	
	// > 判断在直线上
	var inLine = true;
	var x = point['x'];
	var y = point['y'];
	if( x > Math.max(x1,x2) ){ inLine = false; }
	if( x < Math.min(x1,x2) ){ inLine = false; }
	if( y > Math.max(y1,y2) ){ inLine = false; }
	if( y < Math.min(y1,y2) ){ inLine = false; }
	if( x > Math.max(x3,x4) ){ inLine = false; }
	if( x < Math.min(x3,x4) ){ inLine = false; }
	if( y > Math.max(y3,y4) ){ inLine = false; }
	if( y < Math.min(y3,y4) ){ inLine = false; }
	point['inLine'] = inLine;
	return point;
}
//==============================
// * 切割计算 - 数学工具 - 求两直线的交点
//			
//			参数：	> x1,y1 数字   （直线A的第1个点）
//					> x2,y2 数字   （直线A的第2个点）
//					> x3,y3 数字   （直线B的第1个点）
//					> x4,y4 数字   （直线B的第2个点）
//			返回：	> { x:0, y:0 } （结果交点）
//					> null         （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getTwoLineIntersectionPoint = function( x1,y1,x2,y2, x3,y3,x4,y4 ){
	
	// > 检查是否为合法直线
	if( x1 == x2 && y1 == y2 ){ return null; }
	if( x3 == x4 && y3 == y4 ){ return null; }
	
	// > 垂直的平行线情况
	if( x1 == x2 && x3 == x4 ){ return null; }
	
	// > 水平的平行线情况
	if( y1 == y2 && y3 == y4 ){ return null; }
	
	// > 有一根垂直直线情况
	if( x1 == x2 ){
		var y = this.drill_HDSSW_Math2D_getPointOnLine_FindY( x3,y3,x4,y4, x1 );
		if( y == null ){ return null; }	//（第二根线也垂直）
		return { 'x':x1, 'y':y };
	}
	if( x3 == x4 ){
		var y = this.drill_HDSSW_Math2D_getPointOnLine_FindY( x1,y1,x2,y2, x3 );
		if( y == null ){ return null; }	//（第二根线也垂直）
		return { 'x':x3, 'y':y };
	}
	
	// > 有一根水平直线情况
	if( y1 == y2 ){
		var x = this.drill_HDSSW_Math2D_getPointOnLine_FindX( x3,y3,x4,y4, y1 );
		if( x == null ){ return null; }	//（第二根线也水平）
		return { 'x':x, 'y':y1 };
	}
	if( y3 == y4 ){
		var x = this.drill_HDSSW_Math2D_getPointOnLine_FindX( x1,y1,x2,y2, y3 );
		if( x == null ){ return null; }	//（第二根线也水平）
		return { 'x':x, 'y':y3 };
	}
	
	// > 求斜率和截距 （y = kx + b）
	var k1 = (y2 - y1)/(x2 - x1);
	var k2 = (y4 - y3)/(x4 - x3);
	var b1 = y1 - k1*x1;
	var b2 = y3 - k2*x3;
	
	// > 两根线平行、重合情况
	if( k1 == k2 ){ return null; }
	
	// > 求交点
	var x = (b2 - b1)/(k1 - k2);
	var y = k1 * x + b1;
	return { 'x':x, 'y':y };
}
//==============================
// * 切割计算 - 数学工具 - 已知两点求第三点（求Y）
//			
//			参数：	> x1,y1 数字（第1个点）
//					> x2,y2 数字（第2个点）
//					> x 数字    （第3个点的x）
//			返回：	> 数字      （结果值）
//					> null      （垂直时，无解）
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointOnLine_FindY = function( x1,y1,x2,y2, x ){
	
	// > 垂直情况
	if( x1 == x2 ){ return null; }
	
	// > 水平情况
	if( y1 == y2 ){ return y1; }
	
	// > 求斜率和截距 （y = kx + b）
	var k = (y2 - y1)/(x2 - x1);
	var b = y1 - k*x1;
	return k*x + b;
}
//==============================
// * 切割计算 - 数学工具 - 已知两点求第三点（求X）
//			
//			参数：	> x1,y1 数字（第1个点）
//					> x2,y2 数字（第2个点）
//					> y 数字    （第3个点的y）
//			返回：	> 数字      （结果值）
//					> null      （水平时，无解）
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointOnLine_FindX = function( x1,y1,x2,y2, y ){
	
	// > 垂直情况
	if( x1 == x2 ){ return x1; }
	
	// > 水平情况
	if( y1 == y2 ){ return null; }
	
	// > 求斜率和截距 （y = kx + b）
	var k = (y2 - y1)/(x2 - x1);
	var b = y1 - k*x1;
	return (y-b)/k;
}


//=============================================================================
// ** ☆动态快照天窗层贴图对象池管理
//
//			说明：	> 此模块基于 对象池 来进行 创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动态快照天窗层贴图对象池管理 - 容器初始化
//==============================
var _drill_HDSSW_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_HDSSW_temp_initialize2.call(this);
	this._drill_HDSSW_snapshotSpriteTank = [];			//贴图容器（动态快照贴图）
};
//==============================
// * 动态快照天窗层贴图对象池管理 - 刷新
//==============================
SceneManager.drill_HDSSW_refreshSprite = function() {
	if( $gameTemp == undefined ){ return; }
	if( $gameSystem == undefined ){ return; }
	
	// > 判断
	var operate_list = {};	// 格式为：{控制器ID:数字}，其中数字：0不操作/1创建/2销毁。
	for(var i = 0; i < $gameSystem._drill_HDSSW_snapshotControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_snapshotControllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 判断 - 初始不操作
		operate_list[ temp_controller._drill_controllerSerial ] = 0;
		
		// > 判断 - 创建与销毁
		this.drill_HDSSW_refreshSprite_operate( operate_list, temp_controller );
	}
	
	// > 判断 - 已有的贴图
	for(var i = 0; i < $gameTemp._drill_HDSSW_snapshotSpriteTank.length; i++ ){
		var temp_sprite = $gameTemp._drill_HDSSW_snapshotSpriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 判断 - 已有的贴图 - 创建转为不操作
		if( operate_list[ temp_controller._drill_controllerSerial ] == 1 ){
			operate_list[ temp_controller._drill_controllerSerial ] = 0;
		}
	}
	
	this.drill_HDSSW_refreshSpriteCreate( operate_list );
	this.drill_HDSSW_refreshSpriteDestroy( operate_list );
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
};
//==============================
// * 动态快照天窗层贴图对象池管理 - 刷新 - 判断创建与销毁
//==============================
SceneManager.drill_HDSSW_refreshSprite_operate = function( operate_list, tar_controller ){
	var data = tar_controller.drill_data();
	if( SceneManager._scene instanceof Scene_Map ){
		if( data['map_enabled'] == true ){		//判断创建与销毁『多场景与游戏窗体-地图界面』
			operate_list[ tar_controller._drill_controllerSerial ] = 1;
		}else{
			operate_list[ tar_controller._drill_controllerSerial ] = 2;
		}
	}
	if( SceneManager._scene instanceof Scene_Battle ){
		if( data['battle_enabled'] == true ){	//判断创建与销毁『多场景与游戏窗体-战斗界面』
			operate_list[ tar_controller._drill_controllerSerial ] = 1;
		}else{
			operate_list[ tar_controller._drill_controllerSerial ] = 2;
		}
	}
	if( SceneManager._scene instanceof Scene_MenuBase ){
		if( data['menu_enabled'] == true ){		//判断创建与销毁『多场景与游戏窗体-菜单界面』
			operate_list[ tar_controller._drill_controllerSerial ] = 1;
		}else{
			operate_list[ tar_controller._drill_controllerSerial ] = 2;
		}
	}
};
//==============================
// * 动态快照天窗层贴图对象池管理 - 刷新 - 创建贴图
//
//			说明：	> operate_list 的格式为：{控制器ID:数字}，其中数字：0不操作/1创建/2销毁。
//==============================
SceneManager.drill_HDSSW_refreshSpriteCreate = function( operate_list ){
	for(var i=0; i < $gameSystem._drill_HDSSW_snapshotControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_snapshotControllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		if( operate_list[ temp_controller._drill_controllerSerial ] == 1 ){
			
			// > 创建贴图
			var temp_sprite = new Drill_HDSSW_SnapshotSprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			temp_sprite.drill_sprite_updateExMask();	//（强制刷新一次，多边形绘制没有加载过程）
			temp_sprite.drill_sprite_updateExChange();	//
			
			// > 添加贴图到层级（天窗层）
			$gameTemp._drill_HDSSW_snapshotSpriteTank.push( temp_sprite );
			Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
			
			// > 测试
			//alert( "对象池创建动态快照：" + temp_controller.drill_data()['styleName'] );
		}
	}
}
//==============================
// * 动态快照天窗层贴图对象池管理 - 刷新 - 销毁贴图
//
//			说明：	> operate_list 的格式为：{控制器ID:数字}，其中数字：0不操作/1创建/2销毁。
//					> 对象池管理中，函数 drill_controller_isDead 和 drill_sprite_isNeedDestroy 用不到。
//==============================
SceneManager.drill_HDSSW_refreshSpriteDestroy = function( operate_list ){
	for(var i = $gameTemp._drill_HDSSW_snapshotSpriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSSW_snapshotSpriteTank[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_HDSSW_snapshotSpriteTank.splice(i,1);
			continue;
		}
		
		if( operate_list[ temp_sprite._drill_curSerial ] == 2 ){
			
			// > 测试
			//if( temp_sprite._drill_controller != undefined ){
			//	alert( "对象池销毁动态快照：" + temp_sprite._drill_controller.drill_data()['styleName'] );
			//}
			
			// > 销毁贴图
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );
			temp_sprite.drill_sprite_destroy();
			$gameTemp._drill_HDSSW_snapshotSpriteTank.splice(i,1);
		}
	}
};

//==============================
// * 动态快照天窗层贴图对象池管理 - 界面创建时『多场景与游戏窗体-地图界面』
//
//			说明：	> 每次在 界面创建时 都扫描一遍 创建与销毁关系。
//					> 玩家不能控制创建与销毁，静态数据"界面中启用"的设置也不能直接修改。玩家只能显示隐藏。
//==============================
var _drill_HDSSW_mapCreate_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_HDSSW_mapCreate_createAllWindows.call(this);
	SceneManager.drill_HDSSW_refreshSprite();
};
//==============================
// * 动态快照天窗层贴图对象池管理 - 界面创建时『多场景与游戏窗体-战斗界面』
//==============================
var _drill_HDSSW_battleCreate_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_HDSSW_battleCreate_createAllWindows.call(this);
	SceneManager.drill_HDSSW_refreshSprite();
};
//==============================
// * 动态快照天窗层贴图对象池管理 - 界面创建时『多场景与游戏窗体-菜单界面』
//==============================
var _drill_HDSSW_menuCreate_createWindowLayer = Scene_MenuBase.prototype.createWindowLayer;
Scene_MenuBase.prototype.createWindowLayer = function() {
	_drill_HDSSW_menuCreate_createWindowLayer.call(this);
	SceneManager.drill_HDSSW_refreshSprite();
};


//=============================================================================
// ** ☆动态快照控制器与贴图
//
//			说明：	> 此模块专门管理 贴图 的帧刷新与销毁。
//					> 遍历控制器 切割平面，如果切到了，添加控制器，原控制器使用A多边形，新控制器使用B多边形。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动态快照控制器与贴图 - 立即清除全部碎片（开放函数）
//==============================
Game_System.prototype.drill_HDSSW_clearAll = function() {
	for(var i = 0; i < this._drill_HDSSW_snapshotControllerTank.length; i++ ){
		var controller = this._drill_HDSSW_snapshotControllerTank[i];
		controller.drill_controller_destroy();
	}
	this._drill_HDSSW_snapshotControllerTank.length = 0;
};
//==============================
// * 动态快照控制器与贴图 - 执行切割（开放函数）
//==============================
Game_Temp.prototype.drill_HDSSW_createCut = function( style_id, x1, y1, x2, y2 ){
	
	// > 限制碎片数量
	if( $gameSystem._drill_HDSSW_clearWhenExceedLimitEnabled == true ){
		if( $gameSystem._drill_HDSSW_snapshotControllerTank.length >= $gameSystem._drill_HDSSW_limitNum ){
			$gameSystem.drill_HDSSW_clearAll();
		}
	}
	
	// > 添加切割数据
	var data = {};
	data['style_id'] = style_id;
	data['x1'] = x1;
	data['y1'] = y1;
	data['x2'] = x2;
	data['y2'] = y2;
	this._drill_HDSSW_createCut = data;
};

//==============================
// * 动态快照控制器与贴图 - 单次切割
//
//			说明：	> 单次切割的 动态快照，需要创建 控制器+贴图 。
//==============================
SceneManager.drill_HDSSW_executeSnapshotCut = function( cur_cut ){
	if( $gameTemp == undefined ){ return; }
	if( $gameSystem == undefined ){ return; }
	
	
	// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（提前）
	var temp_styleId   = cur_cut['style_id'] +1;
	var temp_styleData = DrillUp.g_HDSSW_style[ cur_cut['style_id'] ];
	if( temp_styleData == undefined ){
		alert( DrillUp.drill_HDSSW_getPluginTip_StyleNotFind(temp_styleId) );
		return;
	}
	
	
	// > 创建控制器 - 第一刀
	var controller_add_list = [];
	if( $gameSystem._drill_HDSSW_snapshotControllerTank.length == 0 ){
		
		// > 默认游戏屏幕形状
		var bb = 0;
		var ww = Graphics.boxWidth;
		var hh = Graphics.boxHeight;
		var convex_points = [];
		convex_points.push( {'x':0 -bb,'y':0 -bb } );
		convex_points.push( {'x':ww+bb,'y':0 -bb } );
		convex_points.push( {'x':ww+bb,'y':hh+bb } );
		convex_points.push( {'x':0 -bb,'y':hh+bb } );
		
		// > 获取切割面
		var cut_data = $gameTemp.drill_HDSSW_cutFace( convex_points, cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
		if( cut_data == null ){ return; }
		
		// > 创建 动态快照控制器
		var temp_controller = new Drill_HDSSW_SnapshotController( cur_cut['style_id'] );
		temp_controller.drill_controller_setExMaskConvex( cut_data['convexA_points'] );
		controller_add_list.push( temp_controller );
		
		var temp_controller2 = new Drill_HDSSW_SnapshotController( cur_cut['style_id'] );
		temp_controller2.drill_controller_setExMaskConvex( cut_data['convexB_points'] );
		controller_add_list.push( temp_controller2 );
		
		
	// > 创建控制器 - 第N刀
	}else{
		
		// > 遍历切割
		for( var i =0; i < $gameSystem._drill_HDSSW_snapshotControllerTank.length; i++ ){
			var last_controller = $gameSystem._drill_HDSSW_snapshotControllerTank[i];
			
			// > 获取切割面
			var cut_data = $gameTemp.drill_HDSSW_cutFace( last_controller._drill_convex_points, cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
			if( cut_data == null ){ continue; }
			
			// > 当前 动态快照控制器 改变切片
			last_controller.drill_controller_setExMaskConvex( cut_data['convexA_points'] );
			
			// > 创建 动态快照控制器
			var new_controller = new Drill_HDSSW_SnapshotController( cur_cut['style_id'] );
			new_controller.drill_controller_setExMaskConvex( cut_data['convexB_points'] );
			controller_add_list.push( new_controller );
			
		}
	}
	
	// > 创建控制器 - 添加到容器
	for( var i =0; i < controller_add_list.length; i++ ){
		var temp_controller = controller_add_list[i];
		$gameSystem._drill_HDSSW_snapshotControllerTank.push( temp_controller );
	}
	
	
	// > 天窗层贴图对象池管理（添加后直接贴图全部刷一次）
	SceneManager.drill_HDSSW_refreshSprite();
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新1『多场景与游戏窗体-地图界面』
//==============================
var _drill_HDSSW_mapCut_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_HDSSW_mapCut_update.call(this);
	if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
	var cur_cut = $gameTemp._drill_HDSSW_createCut;
	SceneManager.drill_HDSSW_executeSnapshotCut( cur_cut );		//帧刷新 - 单次切割 动态快照
	SceneManager.drill_HDSSW_executeCircleCut( cur_cut );		//帧刷新 - 单次切割 魔法圈
	$gameTemp._drill_HDSSW_createCut = null;
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新1『多场景与游戏窗体-战斗界面』
//==============================
var _drill_HDSSW_battleCut_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_HDSSW_battleCut_update.call(this);
	if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
	var cur_cut = $gameTemp._drill_HDSSW_createCut;
	SceneManager.drill_HDSSW_executeSnapshotCut( cur_cut );		//帧刷新 - 单次切割 动态快照
	SceneManager.drill_HDSSW_executeCircleCut( cur_cut );		//帧刷新 - 单次切割 魔法圈
	$gameTemp._drill_HDSSW_createCut = null;
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新1『多场景与游戏窗体-菜单界面』
//==============================
var _drill_HDSSW_menuCut_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_HDSSW_menuCut_update.call(this);
	if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
	var cur_cut = $gameTemp._drill_HDSSW_createCut;
	SceneManager.drill_HDSSW_executeSnapshotCut( cur_cut );		//帧刷新 - 单次切割 动态快照
	SceneManager.drill_HDSSW_executeCircleCut( cur_cut );		//帧刷新 - 单次切割 魔法圈
	$gameTemp._drill_HDSSW_createCut = null;
};

//==============================
// * 动态快照控制器与贴图 - 帧刷新 控制器
//==============================
SceneManager.drill_HDSSW_updateController = function() {
	if( $gameSystem == undefined ){ return; }
	for(var i = 0; i < $gameSystem._drill_HDSSW_snapshotControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_snapshotControllerTank[i];
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_controller_update();
	}
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新 自动销毁
//==============================
SceneManager.drill_HDSSW_updateDestroy = function() {
	if( $gameTemp == undefined ){ return; }
	if( $gameSystem == undefined ){ return; }
	
	// > 自动销毁 - 贴图 动态快照
	for(var i = $gameTemp._drill_HDSSW_snapshotSpriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSSW_snapshotSpriteTank[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_HDSSW_snapshotSpriteTank.splice(i,1);
			continue;
		}
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//『天窗层的严格销毁』
			$gameTemp._drill_HDSSW_snapshotSpriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
			continue;
		}
		if( temp_controller.drill_controller_isDead() ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_HDSSW_snapshotSpriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
	
	// > 自动销毁 - 控制器 动态快照
	for(var i = $gameSystem._drill_HDSSW_snapshotControllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_HDSSW_snapshotControllerTank[i];
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_HDSSW_snapshotControllerTank.splice(i,1);
		}
	}
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新2『多场景与游戏窗体-地图界面』
//==============================
var _drill_HDSSW_mapController_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_HDSSW_mapController_update.call(this);
	SceneManager.drill_HDSSW_updateController();			//帧刷新 - 控制器
	SceneManager.drill_HDSSW_updateDestroy();				//帧刷新 - 自动销毁
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新2『多场景与游戏窗体-战斗界面』
//==============================
var _drill_HDSSW_battleController_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_HDSSW_battleController_update.call(this);
	SceneManager.drill_HDSSW_updateController();			//帧刷新 - 控制器
	SceneManager.drill_HDSSW_updateDestroy();				//帧刷新 - 自动销毁
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新2『多场景与游戏窗体-菜单界面』
//==============================
var _drill_HDSSW_menuController_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_HDSSW_menuController_update.call(this);
	SceneManager.drill_HDSSW_updateController();			//帧刷新 - 控制器
	SceneManager.drill_HDSSW_updateDestroy();				//帧刷新 - 自动销毁
};



//=============================================================================
// ** 动态快照控制器【Drill_HDSSW_SnapshotController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个专门控制天窗层动态快照的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新（继承）
// **						->重设数据（继承）
// **						->显示/隐藏（继承）
// **						->暂停/继续（继承）
// **						->控制器标记销毁（继承）
// **						->控制器是否销毁（继承）
// **					
// **					->2A动态快照遮罩管理
// **					->2B动态快照偏移变换
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 动态快照控制器 - 定义
//==============================
function Drill_HDSSW_SnapshotController(){
    this.initialize.apply(this, arguments);
};
Drill_HDSSW_SnapshotController.prototype = Object.create(Drill_HDSS_Controller.prototype);
Drill_HDSSW_SnapshotController.prototype.constructor = Drill_HDSSW_SnapshotController;
//==============================
// * 动态快照控制器 - 初始化（继承）
//==============================
Drill_HDSSW_SnapshotController.prototype.initialize = function( data_id ){
	Drill_HDSS_Controller.prototype.initialize.call( this, data_id );
}
//##############################
// * 动态快照控制器 - 帧刷新【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_HDSSW_SnapshotController.prototype.drill_controller_update = function(){
	Drill_HDSS_Controller.prototype.drill_controller_update.call( this );
	if( this.drill_controller_isPause() == true ){ return; }
												//帧刷新 - 2A动态快照遮罩管理（无）
												//帧刷新 - 2B动态快照偏移变换（无）
}
//##############################
// * 动态快照控制器 - 重设数据【标准函数】（继承）
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//##############################
Drill_HDSSW_SnapshotController.prototype.drill_controller_resetData = function( data_id ){
    Drill_HDSS_Controller.prototype.drill_controller_resetData.call( this, data_id );
};
//##############################
// * 动态快照控制器 - 显示/隐藏【标准函数】（继承）
//
//			参数：	> visible 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_SnapshotController.prototype.drill_controller_setVisible = function( visible ){
    Drill_HDSS_Controller.prototype.drill_controller_setVisible.call( this, visible );
};
//##############################
// * 动态快照控制器 - 暂停/继续【标准函数】（继承）
//
//			参数：	> pause 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_SnapshotController.prototype.drill_controller_setPause = function( pause ){
    Drill_HDSS_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 动态快照控制器 - 控制器标记销毁【标准函数】（继承）
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_HDSSW_SnapshotController.prototype.drill_controller_destroy = function(){
    Drill_HDSS_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 动态快照控制器 - 控制器是否销毁【标准函数】（继承）
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSSW_SnapshotController.prototype.drill_controller_isDead = function(){
	return Drill_HDSS_Controller.prototype.drill_controller_isDead.call( this );
};

//##############################
// * 动态快照控制器 - 『控制器与贴图的样式-静态数据』校验标记
//##############################
DrillUp.g_HDSSW_snapshot_notFindStyleAlertOnce = true;
//##############################
// * 动态快照控制器 - 『控制器与贴图的样式-静态数据』获取数据指针【标准函数】（覆写）
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，所以只读静态数据。不要存储到存档中，也不要挂载到控制器身上。
//					> 该函数直接获取指针，可以放在帧刷新中使用。
//##############################
Drill_HDSSW_SnapshotController.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_HDSSW_style[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_HDSSW_snapshot_notFindStyleAlertOnce == true ){
			DrillUp.g_HDSSW_snapshot_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return {};
	}
	return cur_styleData;
};
//##############################
// * 动态快照控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_HDSSW_SnapshotController.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	Drill_HDSS_Controller.drill_controller_initData( data );
	
	
	// > D指令叠加变化（强制居中）
	data['x'] = Graphics.boxWidth*0.5;
	data['y'] = Graphics.boxHeight*0.5;
	
	
	// > 2A动态快照遮罩管理（无）
	
	// > 2B动态快照偏移变换
	if( data['scope_x'] == undefined ){ data['scope_x'] = 20 };
	if( data['scope_y'] == undefined ){ data['scope_y'] = 20 };
	if( data['min_scale'] == undefined ){ data['min_scale'] = 1.04 };
	if( data['scope_scaleX'] == undefined ){ data['scope_scaleX'] = 0.06 };
	if( data['scope_scaleY'] == undefined ){ data['scope_scaleY'] = 0.06 };
	if( data['scope_rotate'] == undefined ){ data['scope_rotate'] = 0 };
}
//==============================
// * 动态快照控制器 - 初始化子功能『控制器与贴图』（继承）
//==============================
Drill_HDSSW_SnapshotController.prototype.drill_controller_initChild = function(){
	Drill_HDSS_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_controller_initExMask();			//初始化子功能 - 2A动态快照遮罩管理
	this.drill_controller_initExChange();		//初始化子功能 - 2B动态快照偏移变换
}

//==============================
// * 2A动态快照遮罩管理 - 初始化子功能
//==============================
Drill_HDSSW_SnapshotController.prototype.drill_controller_initExMask = function() {
	this._drill_convex_serial = new Date().getTime() + Math.random();	//（多边形序列号）『随机因子-生成一个不重复的序列号』
	this._drill_convex_points = [];										//（多边形数据）
}
//==============================
// * 2A动态快照遮罩管理 - 设置多边形（开放函数）
//==============================
Drill_HDSSW_SnapshotController.prototype.drill_controller_setExMaskConvex = function( convex_points ){
	this._drill_convex_serial = new Date().getTime() + Math.random();	//（多边形序列号）『随机因子-生成一个不重复的序列号』
	this._drill_convex_points = convex_points;							//（多边形数据）
}

//==============================
// * 2B动态快照偏移变换 - 初始化子功能
//==============================
Drill_HDSSW_SnapshotController.prototype.drill_controller_initExChange = function() {
	var data = this.drill_data();
	
	// > 偏移变换 - 位置（圈贴图）
	this._drill_randomX = data['scope_x'] * (Math.random()-0.5);	//『随机因子-图像用』
	this._drill_randomY = data['scope_y'] * (Math.random()-0.5);	//『随机因子-图像用』
	
	// > 偏移变换 - 缩放（圈贴图）
	this._drill_randomScaleX = data['min_scale'] + data['scope_scaleX'] * Math.random();	//『随机因子-图像用』
	this._drill_randomScaleY = data['min_scale'] + data['scope_scaleY'] * Math.random();	//『随机因子-图像用』
	
	// > 偏移变换 - 旋转（圈贴图）
	this._drill_randomRotation = data['scope_rotate'] * (Math.random()-0.5);	//『随机因子-图像用』
}


//=============================================================================
// ** 动态快照贴图【Drill_HDSSW_SnapshotSprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个动态快照贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪（继承）
// **						->优化策略（继承）
// **						->贴图是否销毁（继承）
// **						->贴图执行销毁（继承）
// **					
// **					->C对象绑定
// **					
// **					->2A动态快照遮罩管理
// **					->2B动态快照偏移变换
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 动态快照贴图 - 定义
//==============================
function Drill_HDSSW_SnapshotSprite() {
    this.initialize.apply(this, arguments);
};
Drill_HDSSW_SnapshotSprite.prototype = Object.create(Drill_HDSS_Sprite.prototype);
Drill_HDSSW_SnapshotSprite.prototype.constructor = Drill_HDSSW_SnapshotSprite;
//==============================
// * 动态快照贴图 - 初始化（继承）
//==============================
Drill_HDSSW_SnapshotSprite.prototype.initialize = function(){
	Drill_HDSS_Sprite.prototype.initialize.call(this);
};
//==============================
// * 动态快照贴图 - 帧刷新（继承）
//==============================
Drill_HDSSW_SnapshotSprite.prototype.update = function() {
	Drill_HDSS_Sprite.prototype.update.call(this);
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	this.drill_sprite_updateExMask();				//帧刷新 - 2A动态快照遮罩管理
	this.drill_sprite_updateExChange();				//帧刷新 - 2B动态快照偏移变换
};

//##############################
// * C对象绑定 - 设置控制器【标准函数】（继承）
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_setController = function( controller ){
	Drill_HDSS_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_initChild = function(){
	Drill_HDSS_Sprite.prototype.drill_sprite_initChild.call( this );
	this.drill_sprite_initExMask();					//初始化子功能 - 2A动态快照遮罩管理
	this.drill_sprite_initExChange();				//初始化子功能 - 2B动态快照偏移变换
};

//##############################
// * 动态快照贴图 - 是否就绪【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_isReady = function(){
    return Drill_HDSS_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 动态快照贴图 - 优化策略【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_HDSS_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 动态快照贴图 - 贴图是否销毁【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_HDSS_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 动态快照贴图 - 贴图执行销毁【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_destroy = function(){
	Drill_HDSS_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 动态快照贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_initSelf = function(){
	Drill_HDSS_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 动态快照贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_destroyChild = function(){
	Drill_HDSS_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 动态快照贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_destroySelf = function(){
	Drill_HDSS_Sprite.prototype.drill_sprite_destroySelf.call( this );
};

//==============================
// * 2A动态快照遮罩管理 - 初始化子功能
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_initExMask = function() {
	this._drill_convex_curSerial = -1;
	
	// > 遮罩初始化
	var temp_mask = new Sprite();
	this._drill_layerSprite.addChild(temp_mask);
	this._drill_maskSprite = temp_mask;
}
//==============================
// * 2A动态快照遮罩管理 - 帧刷新
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_updateExMask = function(){
	
	// > 遮罩锁（多边形序列号 变化时）
	if( this._drill_convex_curSerial == this._drill_controller._drill_convex_serial ){ return; }
	this._drill_convex_curSerial = this._drill_controller._drill_convex_serial;
	
	// > 遮罩重绘
	var new_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
	var convex_points = this._drill_controller._drill_convex_points;
	this.drill_sprite_drawMaskConvex( new_bitmap, convex_points );
	
	// > 遮罩刷新
	this._drill_maskSprite.bitmap = null;
	this._drill_maskSprite.bitmap = new_bitmap;
	this._drill_layerSprite.mask = this._drill_maskSprite;	//『遮罩赋值』
}
//==============================
// * 2A动态快照遮罩管理 - 遮罩重绘
//			
//			说明：	> 此函数将创建一个实时的 bitmap 对象。
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_drawMaskConvex = function( new_bitmap, convex_points ){
	
	// > 重绘 - 全涂黑
	new_bitmap.fillAll("#000000");
	if( convex_points.length < 3 ){ return; }
	
	// > 重绘 - 多边形路径
    var painter = new_bitmap._context;
	painter.beginPath();
	painter.moveTo( convex_points[0]['x'], convex_points[0]['y'] );
	for( var i=1; i < convex_points.length; i++ ){
		painter.lineTo( convex_points[i]['x'], convex_points[i]['y'] );
	}
	painter.closePath();
	
	// > 重绘 - 多边形填充
    painter.fillStyle = "#ffffff";
	painter.fill();
    painter.fillStyle = "#000000";	//（涂黑边缘）
	painter.stroke();
	
	// > 重绘 - 标记
    new_bitmap._setDirty();
}

//==============================
// * 2B动态快照偏移变换 - 初始化子功能
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_initExChange = function() {
	//（无）
}
//==============================
// * 2B动态快照偏移变换 - 帧刷新
//==============================
Drill_HDSSW_SnapshotSprite.prototype.drill_sprite_updateExChange = function(){
	
	// > 偏移变换 - 位置（圈贴图）
	this._drill_childCircleSprite.x = this._drill_controller._drill_randomX;
	this._drill_childCircleSprite.y = this._drill_controller._drill_randomY;
	
	// > 偏移变换 - 缩放（圈贴图）
	this._drill_childCircleSprite.scale.x = this._drill_controller._drill_randomScaleX;
	this._drill_childCircleSprite.scale.y = this._drill_controller._drill_randomScaleY;
	
	// > 偏移变换 - 旋转（圈贴图）
	this._drill_childCircleSprite.rotation += this._drill_controller._drill_randomRotation *Math.PI/180;
}




//=============================================================================
// ** ☆刀光计算
//
//			说明：	> 此模块专门管理 刀光计算。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 刀光计算 - 获取刀光起点终点
//			
//			参数：	> x1,y1 数字     （切割线的第1个点）
//					> x2,y2 数字     （切割线的第2个点）
//			返回：	> [{ x:0, y:0 }] （结果交点列表）
//					> null           （无解）
//
//			说明：	> 以游戏屏幕中心点为准，画一个圆，确定 刀光 的起始点和终止点。
//==============================
Game_Temp.prototype.drill_HDSSW_getCircleTwoPoint = function( x1,y1,x2,y2 ){
	
	var c_x = Graphics.boxWidth *0.5;
	var c_y = Graphics.boxHeight *0.5;
	var r = Graphics.boxWidth + Graphics.boxHeight;
	
	var result = this.drill_HDSSW_Math2D_getLineAndCircleIntersectionPoint( x1,y1,x2,y2, c_x,c_y,r );
	if( result == null ){ return null; }
	if( result.length < 2 ){ return null; }
	return result;
}
//==============================
// * 刀光计算 - 数学工具 - 求直线与圆的交点
//			
//			参数：	> x1,y1 数字     （直线的第1个点）
//					> x2,y2 数字     （直线的第2个点）
//					> x3,y3 数字     （圆心）
//					> r3 数字        （半径）
//			返回：	> [{ x:0, y:0 }] （结果交点列表）
//					> null           （无解）
//			
//			说明：	> 两交点的顺序为 x1,y1 到 x2,y2 直线方向上的顺序。
//					> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getLineAndCircleIntersectionPoint = function( x1,y1,x2,y2, x3,y3,r3 ){
	
	// > 检查是否为合法直线
	if( x1 == x2 && y1 == y2 ){ return null; }
	
	// > 检查是否为合法圆
	if( r3 <= 0 ){ return null; }
	
	
	// > 获取垂足
	var foot_point = this.drill_HDSSW_Math2D_getLineAndPointPerpendicularFoot( x1,y1,x2,y2, x3,y3 );
	if( foot_point == null ){ return null; }
	
	// > 垂足与半径判断
	var f_x = foot_point.x;
	var f_y = foot_point.y;
	var square_d = (x3-f_x)*(x3-f_x) + (y3-f_y)*(y3-f_y);
	if( square_d > r3*r3 ){	//（没有交点）
		return [];
	}
	if( square_d == r3*r3 ){	//（只有一个交点，就是垂足）
		var result = [];
		result.push( foot_point );
		return result;
	}
	
	// > 有两个交点时
	var result = [];
	
	// > 求垂足到交点的距离
	var d = Math.sqrt( r3*r3 - square_d );
	
	// > 获取其中一个方向的 单位向量
	//		（单位向量*距离 = 垂足到两交点的向量）
	var vec = this.drill_HDSSW_Math2D_getPointToPointVector( f_x,f_y, x1,y1 );	//（注意可能x1,y1恰好和垂足重合）
	if( vec.x == 0 && vec.y == 0 ){ vec = this.drill_HDSSW_Math2D_getPointToPointVector( f_x,f_y, x2,y2 ); }
	var result_x1 = f_x + vec.x * d;
	var result_y1 = f_y + vec.y * d;
	var result_x2 = f_x - vec.x * d;
	var result_y2 = f_y - vec.y * d;
	
	// > 排序
	var d1 = x1 - x2;
	if( d1 == 0 ){ d1 = y1 - y2; }
	var dr = result_x1 - result_x2;
	if( dr == 0 ){ dr = result_y1 - result_y2; }
	if( d1 < 0 ){
		if( dr < 0 ){		//（正负相同，则说明两点位置相同）
			result.push( { 'x':result_x1, 'y':result_y1 } );
			result.push( { 'x':result_x2, 'y':result_y2 } );
		}else{				//（正负相反，则说明两点位置相反）
			result.push( { 'x':result_x2, 'y':result_y2 } );
			result.push( { 'x':result_x1, 'y':result_y1 } );
		}
	}
	if( d1 > 0 ){
		if( dr > 0 ){
			result.push( { 'x':result_x1, 'y':result_y1 } );
			result.push( { 'x':result_x2, 'y':result_y2 } );
		}else{
			result.push( { 'x':result_x2, 'y':result_y2 } );
			result.push( { 'x':result_x1, 'y':result_y1 } );
		}
	}
	
	return result;
}
//==============================
// * 刀光计算 - 数学工具 - 求直线与点的垂足
//			
//			参数：	> x1,y1 数字   （直线的第1个点）
//					> x2,y2 数字   （直线的第2个点）
//					> x3,y3 数字   （点）
//			返回：	> { x:0, y:0 } （垂足点）
//					> null         （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getLineAndPointPerpendicularFoot = function( x1,y1,x2,y2, x3,y3 ){
	
	// > 检查是否为合法直线
	if( x1 == x2 && y1 == y2 ){ return null; }
	
	// > 垂直情况
	if( x1 == x2 ){
		return { 'x':x1, 'y':y3 };
	}
	
	// > 水平情况
	if( y1 == y2 ){
		return { 'x':x3, 'y':y1 };
	}
	
	// > 求一般式 （a*x + b*y + c = 0）
	var a = (y2 - y1)/(x2 - x1);
	var b = -1;
	var c = y1-a*x1;
	
	var x = (b*b*x3 - a*b*y3 - a*c)/( a*a + b*b );
	var y = (a*a*y3 - a*b*x3 - b*c)/( a*a + b*b );
	
	// > 点重合判定（如果计算的垂足与目标点基本重合，则返回目标点）
	if( Math.abs(x - x3) < 0.000001 && 
		Math.abs(y - y3) < 0.000001 ){
		return { 'x':x3, 'y':y3 };
	}
	return { 'x':x, 'y':y };
}
//==============================
// * 刀光计算 - 数学工具 - 计算点A朝向点B的单位向量
//			
//			参数：	> x1,y1 数字   （点A）
//					> x2,y2 数字   （点B）
//			返回：	> { x:0, y:0 } （结果交点）
//			
//			说明：	> 若两点重合，返回 { x:0, y:0 } 。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointToPointVector = function( x1,y1,x2,y2 ){
	
	// > 点重合判定
	if( Math.abs(x1 - x2) < 0.000001 && 
		Math.abs(y1 - y2) < 0.000001 ){
		return { 'x':0, 'y':0 };
	}
	var dx = x2 - x1;
	var dy = y2 - y1;
	
	//var dr = Math.sqrt( dx*dx + dy*dy );			//（原公式）
	//var x = dx / dr;
	//var y = dy / dr;
	var square_r = dx*dx + dy*dy;
	var x = Math.sqrt( dx*dx*square_r )/square_r;	//（用乘法提高精度）
	var y = Math.sqrt( dy*dy*square_r )/square_r;
	if( dx < 0 ){ x = -x; }
	if( dy < 0 ){ y = -y; }
	
	return { 'x':x, 'y':y };
};
//==============================
// * 刀光计算 - 数学工具 - 计算点A朝向点B的角度
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//			返回：	> 数字      （角度，0 至 360 之间）
//			
//			说明：	> 0度朝右，90度朝下，180度朝左，270度朝上。
//					> 若两点重合，返回 270 。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointToPointDegree = function( x1,y1,x2,y2 ){
	var degree = 0;
	
	// > arctan不能为0情况
	if( x2 == x1 ){
		if( y2 > y1 ){
			degree = 90;
		}else{
			degree = 270;
		}
	}else if( y2 == y1 ){
		if( x2 > x1 ){
			degree = 0;
		}else{
			degree = 180;
		}
	
	// > arctan正常计算
	}else{
		degree = Math.atan( (y2 - y1)/(x2 - x1) );
		degree = degree / Math.PI * 180;
		if( x2 < x1 ){
			degree += 180;
		}
	}
	
	// > 修正值
	degree = degree % 360;
	if( degree < 0 ){ degree += 360; }
	
	return degree;
};


//=============================================================================
// ** ☆魔法圈天窗层贴图对象池管理
//
//			说明：	> 此模块基于 对象池 来进行 创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 魔法圈天窗层贴图对象池管理 - 容器初始化
//==============================
var _drill_HDSSW_circle_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_HDSSW_circle_temp_initialize.call(this);
	this._drill_HDSSW_circleSpriteTank = [];		//贴图容器 - 魔法圈（2J闪烁幕布、2K直线刀光、2L半面刀光、2M直线伤痕）
	this._drill_HDSSW_backgroundSprite = null;		//贴图容器 - 2I底面幕布
};
//==============================
// * 魔法圈天窗层贴图对象池管理 - 刷新（继承）
//==============================
var _drill_HDSSW_circle_refreshSprite = SceneManager.drill_HDSSW_refreshSprite;
SceneManager.drill_HDSSW_refreshSprite = function() {
	_drill_HDSSW_circle_refreshSprite.call(this);
	this.drill_HDSSW_refreshCircleSprite();
};
//==============================
// * 魔法圈天窗层贴图对象池管理 - 刷新魔法圈
//
//			说明：	> 界面创建时，贴图 需要根据 控制器 情况进行创建。只创建贴图。
//==============================
SceneManager.drill_HDSSW_refreshCircleSprite = function() {
	if( $gameTemp == undefined ){ return; }
	if( $gameSystem == undefined ){ return; }
	
	// > 判断（魔法圈）
	var operate_list = {};	// 格式为：{控制器ID:数字}，其中数字：0不操作/1创建/2销毁。
	for(var i = 0; i < $gameSystem._drill_HDSSW_circleControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 判断（魔法圈） - 初始不操作
		operate_list[ temp_controller._drill_controllerSerial ] = 0;
		
		// > 判断（魔法圈） - 创建与销毁
		this.drill_HDSSW_refreshCircleSprite_operate( operate_list, temp_controller );
	}
	// > 判断（魔法圈） - 已有的贴图
	for(var i = 0; i < $gameTemp._drill_HDSSW_circleSpriteTank.length; i++ ){
		var temp_sprite = $gameTemp._drill_HDSSW_circleSpriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 判断（魔法圈） - 已有的贴图 - 创建转为不操作
		if( operate_list[ temp_controller._drill_controllerSerial ] == 1 ){
			operate_list[ temp_controller._drill_controllerSerial ] = 0;
		}
	}
	
	
	// > 判断（2I底面幕布）
	var operate_2 = 0;	// 其中数字：0不操作/1创建/2销毁。
	if( $gameSystem._drill_HDSSW_backgroundController != undefined ){
		var temp_controller = $gameSystem._drill_HDSSW_backgroundController;
		
		// > 判断（2I底面幕布） - 初始不操作
		var temp_operate_list = [];
		temp_operate_list[ temp_controller._drill_controllerSerial ] = 0;
		
		// > 判断（2I底面幕布） - 创建与销毁
		this.drill_HDSSW_refreshCircleSprite_operate( temp_operate_list, temp_controller );
		
		// > 判断（2I底面幕布） - 值转换
		operate_2 = temp_operate_list[ temp_controller._drill_controllerSerial ];
	}
	// > 判断（2I底面幕布） - 已有的贴图
	if( $gameTemp._drill_HDSSW_backgroundSprite != undefined ){
		operate_2 = 0;
	}
	
	
	this.drill_HDSSW_refreshCircleSpriteCreate( operate_list, operate_2 );
	this.drill_HDSSW_refreshCircleSpriteDestroy( operate_list, operate_2 );
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
};
//==============================
// * 魔法圈天窗层贴图对象池管理 - 刷新魔法圈 - 判断创建与销毁
//==============================
SceneManager.drill_HDSSW_refreshCircleSprite_operate = function( operate_list, tar_controller ){
	var data = tar_controller.drill_data();
	if( SceneManager._scene instanceof Scene_Map ){
		if( data['map_enabled'] == true ){
			operate_list[ tar_controller._drill_controllerSerial ] = 1;
		}else{
			operate_list[ tar_controller._drill_controllerSerial ] = 2;
		}
	}
	if( SceneManager._scene instanceof Scene_Battle ){
		if( data['battle_enabled'] == true ){
			operate_list[ tar_controller._drill_controllerSerial ] = 1;
		}else{
			operate_list[ tar_controller._drill_controllerSerial ] = 2;
		}
	}
	if( SceneManager._scene instanceof Scene_MenuBase ){
		if( data['menu_enabled'] == true ){
			operate_list[ tar_controller._drill_controllerSerial ] = 1;
		}else{
			operate_list[ tar_controller._drill_controllerSerial ] = 2;
		}
	}
};
//==============================
// * 魔法圈天窗层贴图对象池管理 - 刷新魔法圈 - 创建魔法圈贴图
//==============================
SceneManager.drill_HDSSW_refreshCircleSpriteCreate = function( operate_list, operate_2 ){
	
	// > 创建魔法圈贴图 - 魔法圈（2J闪烁幕布、2K直线刀光、2L半面刀光、2M直线伤痕）
	for(var i=0; i < $gameSystem._drill_HDSSW_circleControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( operate_list[ temp_controller._drill_controllerSerial ] == 1 ){
			
			// > 创建魔法圈贴图
			var temp_sprite = new Drill_HDSSW_CircleSprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			// > 添加贴图到层级（天窗层）
			$gameTemp._drill_HDSSW_circleSpriteTank.push( temp_sprite );
			Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
			
			// > 测试
			//alert( "对象池创建魔法圈：" + temp_controller.drill_data()['styleName'] );
		}
	}
	
	// > 创建魔法圈贴图 - 2I底面幕布
	if( operate_2 == 1 ){
		var temp_controller = $gameSystem._drill_HDSSW_backgroundController;
		if( temp_controller != undefined ){ 
			
			// > 创建魔法圈贴图
			var temp_sprite = new Drill_HDSSW_CircleSprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			// > 添加贴图到层级（天窗层）
			$gameTemp._drill_HDSSW_backgroundSprite = temp_sprite;
			Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
		}
	}
}
//==============================
// * 魔法圈天窗层贴图对象池管理 - 刷新魔法圈 - 销毁魔法圈贴图
//==============================
SceneManager.drill_HDSSW_refreshCircleSpriteDestroy = function( operate_list, operate_2 ){
	
	// > 销毁魔法圈贴图 - 魔法圈（2J闪烁幕布、2K直线刀光、2L半面刀光、2M直线伤痕）
	for(var i = $gameTemp._drill_HDSSW_circleSpriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSSW_circleSpriteTank[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_HDSSW_circleSpriteTank.splice(i,1);
			continue;
		}
		if( operate_list[ temp_sprite._drill_curSerial ] == 2 ){
			
			// > 测试
			//if( temp_sprite._drill_controller != undefined ){
			//	alert( "对象池销毁魔法圈：" + temp_sprite._drill_controller.drill_data()['styleName'] );
			//}
			
			// > 销毁魔法圈贴图
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );
			temp_sprite.drill_sprite_destroy();
			$gameTemp._drill_HDSSW_circleSpriteTank.splice(i,1);
		}
	}
	
	// > 销毁魔法圈贴图 - 2I底面幕布
	if( operate_2 == 2 ){
		
		// > 销毁魔法圈贴图
		Graphics.drill_CODS_overstoryLayerRemoveSprite( $gameTemp._drill_HDSSW_backgroundSprite );
		$gameTemp._drill_HDSSW_backgroundSprite.drill_sprite_destroy();
		$gameTemp._drill_HDSSW_backgroundSprite = null;
	}
};


//=============================================================================
// ** ☆魔法圈控制器与贴图
//
//			说明：	> 此模块管理 控制器 的创建与销毁。
//					> 遍历控制器 切割平面，如果切到了，添加控制器，原控制器使用A多边形，新控制器使用B多边形。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 魔法圈控制器与贴图 - 立即清除全部碎片（继承）
//==============================
var _drill_HDSSW_circle_clearAll = Game_System.prototype.drill_HDSSW_clearAll;
Game_System.prototype.drill_HDSSW_clearAll = function() {
	_drill_HDSSW_circle_clearAll.call( this );
	
	// > 清除全部控制器 - 魔法圈（2J闪烁幕布、2K直线刀光、2L半面刀光、2M直线伤痕）
	for(var i = 0; i < this._drill_HDSSW_circleControllerTank.length; i++ ){
		var controller = this._drill_HDSSW_circleControllerTank[i];
		controller.drill_controller_destroy();
	}
	this._drill_HDSSW_circleControllerTank.length = 0;
	
	// > 清除全部控制器 - 2I底面幕布
	if( this._drill_HDSSW_backgroundController != undefined ){
		this._drill_HDSSW_backgroundController.drill_controller_destroy();
	}
	this._drill_HDSSW_backgroundController = null;
};

//==============================
// * 魔法圈控制器与贴图 - 单次切割
//
//			说明：	> 单次切割的 魔法圈，需要创建 控制器+贴图 。
//==============================
SceneManager.drill_HDSSW_executeCircleCut = function( cur_cut ){
	if( $gameTemp == undefined ){ return; }
	if( $gameSystem == undefined ){ return; }
	
	
	// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（提前）
	var temp_styleId   = cur_cut['style_id'] +1;
	var temp_styleData = DrillUp.g_HDSSW_style[ cur_cut['style_id'] ];
	if( temp_styleData == undefined ){
		alert( DrillUp.drill_HDSSW_getPluginTip_StyleNotFind(temp_styleId) );
		return;
	}
	
	
	// > 创建控制器 - 魔法圈
	var controller_add_list = [];
	var points = $gameTemp.drill_HDSSW_getCircleTwoPoint( cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
	if( points != null ){
		
		// > 魔法圈 - 角度计算
		var rotate = $gameTemp.drill_HDSSW_Math2D_getPointToPointDegree( points[0]['x'],points[0]['y'], points[1]['x'],points[1]['y'] );
		//temp_data['rotate'] = $gameTemp.drill_HDSSW_Math2D_getPointToPointDegree( cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
		//（两点被延长后，按常规来说，计算的角度不会出现偏差，但是这里有偏差，可能是精度问题，暂时不明原因）
		//alert( JSON.stringify(cur_cut) );
		//alert( JSON.stringify(points) );
		
		// > 魔法圈（2J闪烁幕布） - 控制器
		var temp_controller = new Drill_HDSSW_CircleController( cur_cut['style_id'] );
		temp_controller.drill_controller_setMode_ExFlicker();
		if( temp_controller._drill_exMode != "" ){
			controller_add_list.push( temp_controller );
		}
		
		// > 魔法圈（2K直线刀光） - 控制器
		var temp_controller = new Drill_HDSSW_CircleController( cur_cut['style_id'] );
		temp_controller.drill_controller_setMode_ExMoveKnife( points[0], points[1], rotate );
		if( temp_controller._drill_exMode != "" ){
			controller_add_list.push( temp_controller );
		}
		
		// > 魔法圈（2L半面刀光） - 控制器
		var temp_controller = new Drill_HDSSW_CircleController( cur_cut['style_id'] );
		temp_controller.drill_controller_setMode_ExHalfKnife( points[0], points[1], rotate );
		if( temp_controller._drill_exMode != "" ){
			controller_add_list.push( temp_controller );
		}
		
		// > 魔法圈（2M直线伤痕） - 控制器
		var temp_controller = new Drill_HDSSW_CircleController( cur_cut['style_id'] );
		temp_controller.drill_controller_setMode_ExScar( points[0], points[1], rotate );
		if( temp_controller._drill_exMode != "" ){
			controller_add_list.push( temp_controller );
		}
	}
	// > 创建控制器 - 魔法圈 添加到容器
	for( var i =0; i < controller_add_list.length; i++ ){
		var temp_controller = controller_add_list[i];
		$gameSystem._drill_HDSSW_circleControllerTank.push( temp_controller );
	}
	
	
	// > 创建控制器 - 2I底面幕布
	if( $gameSystem._drill_HDSSW_backgroundController != undefined ){
		$gameSystem._drill_HDSSW_backgroundController.drill_controller_setMode_ExBackground();
	}else{
		var temp_controller = new Drill_HDSSW_CircleController( cur_cut['style_id'] );
		temp_controller.drill_controller_setMode_ExBackground();
		$gameSystem._drill_HDSSW_backgroundController = temp_controller;
	}
	
	
	// > 天窗层贴图对象池管理（添加后直接贴图全部刷一次）
	SceneManager.drill_HDSSW_refreshSprite();
};

//==============================
// * 魔法圈控制器与贴图 - 帧刷新 控制器（继承）
//==============================
var _drill_HDSSW_circle_updateController = SceneManager.drill_HDSSW_updateController;
SceneManager.drill_HDSSW_updateController = function() {
	_drill_HDSSW_circle_updateController.call( this );
	
	// > 控制器帧刷新 - 魔法圈（2J闪烁幕布、2K直线刀光、2L半面刀光、2M直线伤痕）
	for(var i = 0; i < $gameSystem._drill_HDSSW_circleControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_controller_update();
	}
	
	// > 控制器帧刷新 - 2I底面幕布
	if( $gameSystem._drill_HDSSW_backgroundController != undefined ){
		$gameSystem._drill_HDSSW_backgroundController.drill_controller_update();
	}
}
//==============================
// * 魔法圈控制器与贴图 - 帧刷新 自动销毁（继承）
//==============================
var _drill_HDSSW_circle_updateDestroy = SceneManager.drill_HDSSW_updateDestroy;
SceneManager.drill_HDSSW_updateDestroy = function() {
	_drill_HDSSW_circle_updateDestroy.call( this );
	
	// > 自动销毁 - 贴图 魔法圈（2J闪烁幕布、2K直线刀光、2L半面刀光、2M直线伤痕）
	for(var i = $gameTemp._drill_HDSSW_circleSpriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSSW_circleSpriteTank[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_HDSSW_circleSpriteTank.splice(i,1);
			continue;
		}
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//『天窗层的严格销毁』
			$gameTemp._drill_HDSSW_circleSpriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
			continue;
		}
		if( temp_controller.drill_controller_isDead() ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_HDSSW_circleSpriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
	// > 自动销毁 - 控制器 魔法圈（2J闪烁幕布、2K直线刀光、2L半面刀光、2M直线伤痕）
	for(var i = $gameSystem._drill_HDSSW_circleControllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_HDSSW_circleControllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图 2I底面幕布
	var temp_sprite = $gameTemp._drill_HDSSW_backgroundSprite;
	if( temp_sprite != undefined ){
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//『天窗层的严格销毁』
			$gameTemp._drill_HDSSW_backgroundSprite = null;
			temp_sprite.drill_sprite_destroy();
		}else if( temp_controller.drill_controller_isDead() ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_HDSSW_backgroundSprite = null;
			temp_sprite.drill_sprite_destroy();
		}
	}
	// > 自动销毁 - 控制器 2I底面幕布
	if( $gameSystem._drill_HDSSW_backgroundController != undefined &&
		$gameSystem._drill_HDSSW_backgroundController.drill_controller_isDead() ){
		$gameSystem._drill_HDSSW_backgroundController = null;
	}
};



//=============================================================================
// ** 魔法圈控制器【Drill_HDSSW_CircleController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个专门控制简单贴图的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新（继承）
// **						->重设数据（继承）
// **						->显示/隐藏（继承）
// **						->暂停/继续（继承）
// **						->控制器标记销毁（继承）
// **						->控制器是否销毁（继承）
// **					
// **					->2H魔法圈模式
// **					->2I底面幕布
// **					->2J闪烁幕布
// **					->2K直线刀光
// **					->2L半面刀光
// **					->2M直线伤痕
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 魔法圈控制器 - 定义
//==============================
function Drill_HDSSW_CircleController(){
    this.initialize.apply(this, arguments);
};
Drill_HDSSW_CircleController.prototype = Object.create(Drill_HDSC_Controller.prototype);
Drill_HDSSW_CircleController.prototype.constructor = Drill_HDSSW_CircleController;
//==============================
// * 魔法圈控制器 - 初始化（继承）
//==============================
Drill_HDSSW_CircleController.prototype.initialize = function( data_id ){
	Drill_HDSC_Controller.prototype.initialize.call( this, data_id );
}
//##############################
// * 魔法圈控制器 - 帧刷新【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_update = function(){
	Drill_HDSC_Controller.prototype.drill_controller_update.call( this );
	if( this.drill_controller_isPause() == true ){ return; }
	this.drill_controller_updateExMode();				//帧刷新 - 2H魔法圈模式
														//帧刷新 - 2I底面幕布（无）
														//帧刷新 - 2J闪烁幕布（无）
														//帧刷新 - 2K直线刀光（无）
}
//##############################
// * 魔法圈控制器 - 重设数据【标准函数】（继承）
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_resetData = function( data_id ){
    Drill_HDSC_Controller.prototype.drill_controller_resetData.call( this, data_id );
};
//##############################
// * 魔法圈控制器 - 显示/隐藏【标准函数】（继承）
//
//			参数：	> visible 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_setVisible = function( visible ){
    Drill_HDSC_Controller.prototype.drill_controller_setVisible.call( this, visible );
};
//##############################
// * 魔法圈控制器 - 暂停/继续【标准函数】（继承）
//
//			参数：	> pause 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_setPause = function( pause ){
    Drill_HDSC_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 魔法圈控制器 - 控制器标记销毁【标准函数】（继承）
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_destroy = function(){
    Drill_HDSC_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 魔法圈控制器 - 控制器是否销毁【标准函数】（继承）
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_isDead = function(){
	
	// > 2H魔法圈模式 - 当前持续时间
	if( this._drill_exSustain < 0 ){ return true; }
	
	// > 原函数
	return Drill_HDSC_Controller.prototype.drill_controller_isDead.call( this );
};

//##############################
// * 动态快照控制器 - 『控制器与贴图的样式-静态数据』校验标记
//##############################
DrillUp.g_HDSSW_circle_notFindStyleAlertOnce = true;
//##############################
// * 动态快照控制器 - 『控制器与贴图的样式-静态数据』获取数据指针【标准函数】（覆写）
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，所以只读静态数据。不要存储到存档中，也不要挂载到控制器身上。
//					> 该函数直接获取指针，可以放在帧刷新中使用。
//##############################
Drill_HDSSW_CircleController.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_HDSSW_style[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_HDSSW_circle_notFindStyleAlertOnce == true ){
			DrillUp.g_HDSSW_circle_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return {};
	}
	return cur_styleData;
};
//##############################
// * 魔法圈控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_HDSSW_CircleController.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	Drill_HDSC_Controller.drill_controller_initData( data );
	
	
	// > D指令叠加变化（强制居中）
	data['x'] = Graphics.boxWidth*0.5;
	data['y'] = Graphics.boxHeight*0.5;
	
	
	// > 2H魔法圈模式（无）
	
	// > 2I底面幕布
	if( data['background_img_src'] == undefined ){ data['background_img_src'] = "" };
	
	// > 2J闪烁幕布
	if( data['flicker_enable'] == undefined ){ data['flicker_enable'] = false };
	if( data['flicker_img_src'] == undefined ){ data['flicker_img_src'] = "" };
	if( data['flicker_time'] == undefined ){ data['flicker_time'] = 24 };
	if( data['flicker_opacity'] == undefined ){ data['flicker_opacity'] = 75 };
	
	// > 2K直线刀光
	if( data['moveKnife_enable'] == undefined ){ data['moveKnife_enable'] = false };
	if( data['moveKnife_img_src'] == undefined ){ data['moveKnife_img_src'] = "" };
	if( data['moveKnife_time'] == undefined ){ data['moveKnife_time'] = 20 };
	
	// > 2L半面刀光
	if( data['halfKnife_enable'] == undefined ){ data['halfKnife_enable'] = false };
	if( data['halfKnife_img_src'] == undefined ){ data['halfKnife_img_src'] = "" };
	if( data['halfKnife_posType'] == undefined ){ data['halfKnife_posType'] = "" };
	if( data['halfKnife_showingTime'] == undefined ){ data['halfKnife_showingTime'] = 12 };
	if( data['halfKnife_hidingTime'] == undefined ){ data['halfKnife_hidingTime'] = 30 };
	
	// > 2M直线伤痕
	if( data['scar_enable'] == undefined ){ data['scar_enable'] = false };
	if( data['scar_img_src'] == undefined ){ data['scar_img_src'] = "" };
	if( data['scar_showingTime'] == undefined ){ data['scar_showingTime'] = 12 };
	if( data['scar_hidingTime'] == undefined ){ data['scar_hidingTime'] = 270 };
}
//==============================
// * 魔法圈控制器 - 初始化子功能『控制器与贴图』（继承）
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initChild = function(){
	Drill_HDSC_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_controller_initExMode();				//初始化子功能 - 2H魔法圈模式
	this.drill_controller_initExBackground();		//初始化子功能 - 2I底面幕布
	this.drill_controller_initExFlicker();			//初始化子功能 - 2J闪烁幕布
	this.drill_controller_initExMoveKnife();		//初始化子功能 - 2K直线刀光
}


//==============================
// * 2H魔法圈模式 - 初始化子功能
//
//			说明：	> 魔法圈只用于播放 动画效果，不影响实际切割。
//					> 动画有时间限制，这里的魔法圈也都会在 持续时间 结束后销毁。（2I底面幕布 例外）
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initExMode = function() {
	this._drill_exMode = "";		//（当前模式）
	this._drill_exImgSrc = "";		//（当前资源）
	this._drill_exSustain = 10;		//（当前持续时间）
}
//==============================
// * 2H魔法圈模式 - 帧刷新
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_updateExMode = function(){
	this._drill_exSustain -= 1;
}


//==============================
// * 2I底面幕布 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initExBackground = function() {
	//（无）
}
//==============================
// * 2I底面幕布 - 设置模式（开放函数）
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_setMode_ExBackground = function(){
	var data = this.drill_data();
	if( data['background_img_src'] == "" ){ return; }
	
	this._drill_exMode = "ExBackground";					//（当前模式）
	this._drill_exImgSrc = data['background_img_src'];		//（当前资源）
	this._drill_exSustain = 518400000;						//（当前持续时间）
	this.drill_controller_setVisible( true );
	this.drill_controller_setZIndex( data['zIndex'] - 0.5 );
};


//==============================
// * 2J闪烁幕布 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initExFlicker = function() {
	//（无）
}
//==============================
// * 2J闪烁幕布 - 设置模式（开放函数）
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_setMode_ExFlicker = function(){
	var data = this.drill_data();
	if( data['flicker_enable'] != true ){ return; }
	if( data['flicker_img_src'] == "" ){ return; }
	
	this._drill_exMode = "ExFlicker";					//（当前模式）
	this._drill_exImgSrc = data['flicker_img_src'];		//（当前资源）
	this._drill_exSustain = data['flicker_time'];		//（当前持续时间）
	this.drill_controller_setVisible( false );
	this.drill_controller_setZIndex( data['zIndex'] + 0.6 );
	
	// > E延迟指令（延迟2帧再显示）
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_setVisible, [true], 2
	);
	
	// > D指令叠加变化 - 修改单属性 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['flicker_opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速变化", 0, data['flicker_time']
	);
};


//==============================
// * 2K直线刀光 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initExMoveKnife = function() {
	//（无）
}
//==============================
// * 2K直线刀光 - 设置模式（开放函数）
//			
//			参数：	> start_point 开始点
//					> end_point 结束点
//					> rotate 旋转角度
//			返回：	> 无
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_setMode_ExMoveKnife = function( start_point, end_point, rotate ){
	var data = this.drill_data();
	if( data['moveKnife_enable'] != true ){ return; }
	if( data['moveKnife_img_src'] == "" ){ return; }
	
	this._drill_exMode = "ExMoveKnife";					//（当前模式）
	this._drill_exImgSrc = data['moveKnife_img_src'];	//（当前资源）
	this._drill_exSustain = data['moveKnife_time'];		//（当前持续时间）
	this.drill_controller_setVisible( false );
	this.drill_controller_setZIndex( data['zIndex'] + 0.5 );
	
	// > E延迟指令（延迟2帧再显示）
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_setVisible, [true], 2
	);
	
	// > D指令叠加变化 - 修改单属性 - 移动到
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", start_point['x'], start_point['y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速移动", end_point['x'], end_point['y'], data['moveKnife_time']
	);
	
	// > D指令叠加变化 - 修改单属性 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", rotate,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速变化", rotate, 1
	);
};


//==============================
// * 2L半面刀光 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initExHalfKnife = function() {
	//（无）
}
//==============================
// * 2L半面刀光 - 设置模式（开放函数）
//			
//			参数：	> start_point 开始点
//					> end_point 结束点
//					> rotate 旋转角度
//			返回：	> 无
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_setMode_ExHalfKnife = function( start_point, end_point, rotate ){
	var data = this.drill_data();
	if( data['halfKnife_enable'] != true ){ return; }
	if( data['halfKnife_img_src'] == "" ){ return; }
	
	this._drill_exMode = "ExHalfKnife";													//（当前模式）
	this._drill_exImgSrc = data['halfKnife_img_src'];									//（当前资源）
	this._drill_exSustain = data['halfKnife_showingTime']+data['halfKnife_hidingTime'];	//（当前持续时间）
	this.drill_controller_setVisible( false );
	this.drill_controller_setZIndex( data['zIndex'] + 0.6 );
	
	// > E延迟指令（延迟2帧再显示）
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_setVisible, [true], 2
	);
	
	// > D指令叠加变化 - 修改中心锚点
	this._drill_change_anchor_x = 0.5;
	this._drill_change_anchor_y = 1.0;
	
	// > D指令叠加变化 - 修改单属性 - 移动到
	var center_x = (start_point['x'] + end_point['x']) *0.5;
	var center_y = (start_point['y'] + end_point['y']) *0.5;
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", center_x, center_y,		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速移动", center_x, center_y, 1
	);
	
	// > 旋转角度计算
	var cur_rotate = rotate;
	if( data['halfKnife_posType'] == "切割方向的左半边" ){
		cur_rotate += 180;
	}else if( data['halfKnife_posType'] == "切割方向的右半边" ){
		//（不操作）
	}else if( data['halfKnife_posType'] == "不含画面中心点的半边" ){
		var c_x = Graphics.boxWidth *0.5;
		var c_y = Graphics.boxHeight *0.5;
		var cross_result = (end_point['x'] - start_point['x']) * (c_y - start_point['y']) - (end_point['y'] - start_point['y']) * (c_x - start_point['x']);
		if( cross_result > 0 ){	//（中心点在左半边）
			//（不操作）
		}
		if( cross_result < 0 ){	//（中心点在右半边）
			cur_rotate += 180;
		}
	}else{	//（含画面中心点的半边）
		var c_x = Graphics.boxWidth *0.5;
		var c_y = Graphics.boxHeight *0.5;
		var cross_result = (end_point['x'] - start_point['x']) * (c_y - start_point['y']) - (end_point['y'] - start_point['y']) * (c_x - start_point['x']);
		if( cross_result > 0 ){	//（中心点在左半边）
			cur_rotate += 180;
		}
		if( cross_result < 0 ){	//（中心点在右半边）
			//（不操作）
		}
	}
	// > D指令叠加变化 - 修改单属性 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", cur_rotate,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速变化", cur_rotate, 1
	);
	
	// > E延迟指令 - 透明度
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_commandChange_setOpacity,
		[ "匀速变化", 255, data['halfKnife_showingTime'] ], 2
	);
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_commandChange_setOpacity,
		[ "匀速变化", 0, data['halfKnife_hidingTime'] ], 2+data['halfKnife_showingTime']
	);
};


//==============================
// * 2M直线伤痕 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initExScar = function() {
	//（无）
}
//==============================
// * 2M直线伤痕 - 设置模式（开放函数）
//			
//			参数：	> start_point 开始点
//					> end_point 结束点
//					> rotate 旋转角度
//			返回：	> 无
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_setMode_ExScar = function( start_point, end_point, rotate ){
	var data = this.drill_data();
	if( data['scar_enable'] != true ){ return; }
	if( data['scar_img_src'] == "" ){ return; }
	
	this._drill_exMode = "ExScar";												//（当前模式）
	this._drill_exImgSrc = data['scar_img_src'];								//（当前资源）
	this._drill_exSustain = data['scar_showingTime']+data['scar_hidingTime'];	//（当前持续时间）
	this.drill_controller_setVisible( false );
	this.drill_controller_setZIndex( data['zIndex'] + 0.4 );
	
	// > E延迟指令（延迟2帧再显示）
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_setVisible, [true], 2
	);
	
	// > D指令叠加变化 - 修改单属性 - 移动到
	var center_x = (start_point['x'] + end_point['x']) *0.5;
	var center_y = (start_point['y'] + end_point['y']) *0.5;
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", center_x, center_y,		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速移动", center_x, center_y, 1
	);
	
	// > D指令叠加变化 - 修改单属性 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", rotate,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速变化", rotate, 1
	);
	
	// > D指令叠加变化 - 修改单属性 - 缩放
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", 1.0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		"匀速变化", 0.0, 1
	);
	
	// > E延迟指令 - 缩放
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_commandChange_setScaleY,
		[ "匀速变化", 1.0, data['scar_showingTime'] ], 2
	);
	this.drill_controller_setDelayingCommand(
		Drill_HDSC_Controller.METHOD__drill_controller_commandChange_setScaleY,
		[ "匀速变化", 0.0, data['scar_hidingTime'] ], 2+data['scar_showingTime']
	);
};


//=============================================================================
// ** 魔法圈贴图【Drill_HDSSW_CircleSprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个动态快照贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪（继承）
// **						->优化策略（继承）
// **						->贴图是否销毁（继承）
// **						->贴图执行销毁（继承）
// **					
// **					->C对象绑定
// **					
// **					->2H魔法圈模式
// **					->2I底面幕布
// **					->2J闪烁幕布
// **					->2K直线刀光
// **					->2L半面刀光
// **					->2M直线伤痕
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 魔法圈贴图 - 定义
//==============================
function Drill_HDSSW_CircleSprite() {
    this.initialize.apply(this, arguments);
};
Drill_HDSSW_CircleSprite.prototype = Object.create(Drill_HDSC_Sprite.prototype);
Drill_HDSSW_CircleSprite.prototype.constructor = Drill_HDSSW_CircleSprite;
//==============================
// * 魔法圈贴图 - 初始化（继承）
//==============================
Drill_HDSSW_CircleSprite.prototype.initialize = function(){
	Drill_HDSC_Sprite.prototype.initialize.call(this);
};
//==============================
// * 魔法圈贴图 - 帧刷新（继承）
//==============================
Drill_HDSSW_CircleSprite.prototype.update = function() {
	Drill_HDSC_Sprite.prototype.update.call(this);
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
												//帧刷新 - 2H魔法圈模式（无）
												//帧刷新 - 2I底面幕布（无）
												//帧刷新 - 2J闪烁幕布（无）
												//帧刷新 - 2K直线刀光（无）
												//帧刷新 - 2L半面刀光（无）
												//帧刷新 - 2M直线伤痕（无）
};

//##############################
// * C对象绑定 - 设置魔法圈控制器【标准函数】（继承）
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_setController = function( controller ){
	Drill_HDSC_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initChild = function(){
	Drill_HDSC_Sprite.prototype.drill_sprite_initChild.call( this );
	this.drill_sprite_initExMode();				//初始化子功能 - 2H魔法圈模式
	this.drill_sprite_initExBackground();		//初始化子功能 - 2I底面幕布
	this.drill_sprite_initExFlicker();			//初始化子功能 - 2J闪烁幕布
	this.drill_sprite_initExMoveKnife();		//初始化子功能 - 2K直线刀光
	this.drill_sprite_initExHalfKnife();		//初始化子功能 - 2L半面刀光
	this.drill_sprite_initExScar();				//初始化子功能 - 2M直线伤痕
};

//##############################
// * 魔法圈贴图 - 是否就绪【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_isReady = function(){
    return Drill_HDSC_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 魔法圈贴图 - 优化策略【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_HDSC_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 魔法圈贴图 - 贴图是否销毁【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_HDSC_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 魔法圈贴图 - 贴图执行销毁【标准函数】（继承）
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_destroy = function(){
	Drill_HDSC_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 魔法圈贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initSelf = function(){
	Drill_HDSC_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 魔法圈贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_destroyChild = function(){
	Drill_HDSC_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 魔法圈贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_destroySelf = function(){
	Drill_HDSC_Sprite.prototype.drill_sprite_destroySelf.call( this );
};

//==============================
// * 2H魔法圈模式 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initExMode = function(){
	var data = this._drill_controller.drill_data();
	this._drill_childCircleSprite.bitmap = ImageManager.loadBitmap( data['src_img_file'], this._drill_controller._drill_exImgSrc, data['tint'], data['smooth'] );
}

//==============================
// * 2I底面幕布 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initExBackground = function(){
	//（无）
}

//==============================
// * 2J闪烁幕布 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initExFlicker = function(){
	//（无）
}

//==============================
// * 2K直线刀光 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initExMoveKnife = function(){
	//（无）
}

//==============================
// * 2L半面刀光 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initExHalfKnife = function(){
	//（无）
}

//==============================
// * 2M直线伤痕 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initExScar = function(){
	//（无）
}


//=============================================================================
// ** ☆引擎兼容（STG）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 最后继承1级
//==============================
var _drill_STG_HDSSW_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_STG_HDSSW_scene_initialize.call(this);
	
	//==============================
	// * 引擎兼容 - 插件指令『STG的插件指令』（游戏窗体，插件位置在前面，需要最后继承）
	//==============================
	if( Imported.Drill_STG__objects ){
		
		//==============================
		// * 插件指令 - STG指令绑定
		//==============================
		var _drill_STG_HDSSW_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
		Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
			_drill_STG_HDSSW_pluginCommand.call(this, command, args);
			this.drill_HDSSW_pluginCommand( command, args );
		}
		//==============================
		// * 插件指令 - STG指令执行
		//==============================
		Drill_STG_GameInterpreter.prototype.drill_HDSSW_pluginCommand = Game_Interpreter.prototype.drill_HDSSW_pluginCommand;
	}
	
	//==============================
	// * 引擎兼容 - 天窗层贴图对象池管理（STG）
	//==============================
	if( Imported.Drill_STG__objects ){
		
		//==============================
		// * 天窗层贴图对象池管理（STG） - 判断创建与销毁『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_HDSSW_refreshSprite_operate = SceneManager.drill_HDSSW_refreshSprite_operate;
		SceneManager.drill_HDSSW_refreshSprite_operate = function( operate_list, tar_controller ){
			_drill_STG_HDSSW_refreshSprite_operate.call( this, operate_list, tar_controller );
			var data = tar_controller.drill_data();
			if( SceneManager._scene instanceof Drill_STG_MapScene ){
				if( data['STG_enabled'] == true ){
					operate_list[ tar_controller._drill_controllerSerial ] = 1;
				}else{
					operate_list[ tar_controller._drill_controllerSerial ] = 2;
				}
			}
		}
		//==============================
		// * 天窗层贴图对象池管理（STG） - 判断创建与销毁（魔法圈）『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_HDSSW_refreshCircleSprite_operate = SceneManager.drill_HDSSW_refreshCircleSprite_operate;
		SceneManager.drill_HDSSW_refreshCircleSprite_operate = function( operate_list, tar_controller ){
			_drill_STG_HDSSW_refreshCircleSprite_operate.call( this, operate_list, tar_controller );
			var data = tar_controller.drill_data();
			if( SceneManager._scene instanceof Drill_STG_MapScene ){
				if( data['STG_enabled'] == true ){
					operate_list[ tar_controller._drill_controllerSerial ] = 1;
				}else{
					operate_list[ tar_controller._drill_controllerSerial ] = 2;
				}
			}
		}
		//==============================
		// * 天窗层贴图对象池管理（STG） - 界面创建时『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_HDSSW_createWindowLayer = Drill_STG_MapScene.prototype.createWindowLayer;
		Drill_STG_MapScene.prototype.createWindowLayer = function(){
			_drill_STG_HDSSW_createWindowLayer.call(this);
			SceneManager.drill_HDSSW_refreshSprite();
		};
		//==============================
		// * 动态快照控制器与贴图（STG） - 帧刷新1『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_HDSSW_Cut_update = Drill_STG_MapScene.prototype.update;
		Drill_STG_MapScene.prototype.update = function() {
			_drill_STG_HDSSW_Cut_update.call(this);
			if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
			var cur_cut = $gameTemp._drill_HDSSW_createCut;
			SceneManager.drill_HDSSW_executeSnapshotCut( cur_cut );		//帧刷新 - 单次切割 动态快照
			SceneManager.drill_HDSSW_executeCircleCut( cur_cut );		//帧刷新 - 单次切割 魔法圈
			$gameTemp._drill_HDSSW_createCut = null;
		};
		//==============================
		// * 动态快照控制器与贴图（STG） - 帧刷新2『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_HDSSW_Controller_update = Drill_STG_MapScene.prototype.update;
		Drill_STG_MapScene.prototype.update = function() {
			_drill_STG_HDSSW_Controller_update.call(this);
			SceneManager.drill_HDSSW_updateController();			//帧刷新 - 控制器
			SceneManager.drill_HDSSW_updateDestroy();				//帧刷新 - 自动销毁
		};
	}
};


//=============================================================================
// ** ☆引擎兼容（ACT）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 最后继承1级
//==============================
var _drill_ACT_HDSSW_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_ACT_HDSSW_scene_initialize.call(this);
	
	//==============================
	// * 引擎兼容 - 插件指令『ACT的插件指令』（游戏窗体，插件位置在前面，需要最后继承）
	//==============================
	if( Imported.Drill_ACT__objects ){
		
		//==============================
		// * 插件指令 - ACT指令绑定
		//==============================
		var _drill_ACT_HDSSW_pluginCommand = Drill_ACT_GameInterpreter.prototype.pluginCommand;
		Drill_ACT_GameInterpreter.prototype.pluginCommand = function( command, args ){
			_drill_ACT_HDSSW_pluginCommand.call(this, command, args);
			this.drill_HDSSW_pluginCommand( command, args );
		}
		//==============================
		// * 插件指令 - ACT指令执行
		//==============================
		Drill_ACT_GameInterpreter.prototype.drill_HDSSW_pluginCommand = Game_Interpreter.prototype.drill_HDSSW_pluginCommand;
	}
	
	//==============================
	// * 引擎兼容 - 天窗层贴图对象池管理（ACT）
	//==============================
	if( Imported.Drill_ACT__objects ){
		
		//==============================
		// * 天窗层贴图对象池管理（ACT） - 判断创建与销毁『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_HDSSW_refreshSprite_operate = SceneManager.drill_HDSSW_refreshSprite_operate;
		SceneManager.drill_HDSSW_refreshSprite_operate = function( operate_list, tar_controller ){
			_drill_ACT_HDSSW_refreshSprite_operate.call( this, operate_list, tar_controller );
			var data = tar_controller.drill_data();
			if( SceneManager._scene instanceof Drill_ACT_MapScene ){
				if( data['ACT_enabled'] == true ){
					operate_list[ tar_controller._drill_controllerSerial ] = 1;
				}else{
					operate_list[ tar_controller._drill_controllerSerial ] = 2;
				}
			}
		}
		//==============================
		// * 天窗层贴图对象池管理（ACT） - 判断创建与销毁（魔法圈）『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_HDSSW_refreshCircleSprite_operate = SceneManager.drill_HDSSW_refreshCircleSprite_operate;
		SceneManager.drill_HDSSW_refreshCircleSprite_operate = function( operate_list, tar_controller ){
			_drill_ACT_HDSSW_refreshCircleSprite_operate.call( this, operate_list, tar_controller );
			var data = tar_controller.drill_data();
			if( SceneManager._scene instanceof Drill_ACT_MapScene ){
				if( data['ACT_enabled'] == true ){
					operate_list[ tar_controller._drill_controllerSerial ] = 1;
				}else{
					operate_list[ tar_controller._drill_controllerSerial ] = 2;
				}
			}
		}
		//==============================
		// * 天窗层贴图对象池管理（ACT） - 界面创建时『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_HDSSW_createWindowLayer = Drill_ACT_MapScene.prototype.createWindowLayer;
		Drill_ACT_MapScene.prototype.createWindowLayer = function(){
			_drill_ACT_HDSSW_createWindowLayer.call(this);
			SceneManager.drill_HDSSW_refreshSprite();
		};
		//==============================
		// * 动态快照控制器与贴图（ACT） - 帧刷新1『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_HDSSW_Cut_update = Drill_ACT_MapScene.prototype.update;
		Drill_ACT_MapScene.prototype.update = function() {
			_drill_ACT_HDSSW_Cut_update.call(this);
			if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
			var cur_cut = $gameTemp._drill_HDSSW_createCut;
			SceneManager.drill_HDSSW_executeSnapshotCut( cur_cut );		//帧刷新 - 单次切割 动态快照
			SceneManager.drill_HDSSW_executeCircleCut( cur_cut );		//帧刷新 - 单次切割 魔法圈
			$gameTemp._drill_HDSSW_createCut = null;
		};
		//==============================
		// * 动态快照控制器与贴图（ACT） - 帧刷新2『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_HDSSW_Controller_update = Drill_ACT_MapScene.prototype.update;
		Drill_ACT_MapScene.prototype.update = function() {
			_drill_ACT_HDSSW_Controller_update.call(this);
			SceneManager.drill_HDSSW_updateController();			//帧刷新 - 控制器
			SceneManager.drill_HDSSW_updateDestroy();				//帧刷新 - 自动销毁
		};
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_HtmlDynamicSnapshotSpaceWrench = false;
		var pluginTip = DrillUp.drill_HDSSW_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

