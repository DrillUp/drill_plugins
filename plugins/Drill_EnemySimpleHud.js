//=============================================================================
// Drill_EnemySimpleHud.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        战斗UI - 简单生命框
 * @author Drill_up
 * 
 * @Drill_LE_param "生命框-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_ESH_data_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EnemySimpleHud +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面中快速显示一个或多个生命框。
 * ★★必须放在 车轮战 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGaugeMeter       系统 - 参数条核心
 *   - Drill_CoreOfGaugeNumber      系统 - 参数数字核心
 *     必须要有上述核心，才能配置完整的生命框。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗敌人和战斗角色。
 * 2.更多内容可以去看看文档 "5.战斗UI > 关于战斗简单生命框.docx"。
 *   其中也有简单生命框"从零开始设计"的教程。
 * 生命框：
 *   (1.战斗简单生命框 = 3个参数条 + 3个参数数字 + 2个外框。
 *   (2.生命框是一个基于 参数条核心 样式的贴图，具体数字配置方式
 *      可以去看看参数条核心。
 *   (3.你可以将生命框放置在地图层级的 下层、中层、上层、图片层、
 *      最顶层 中。
 *   (4.每个生命框只能绑定到一个物体上。
 *      注意，必须写角色/敌人注释设置样式后，才能显示出生命框。
 * 参数条：
 *   (1.参数值：　固定绑定角色/敌人属性。
 *      遮罩：　　可自定义。
 *      旋转：　　可自定义。
 *      段上限：　固定绑定角色/敌人属性，只有1段。
 *      流动效果：可自定义。
 *      凹槽条：　可自定义。
 *      弹出条：　可自定义。
 *      粒子：　　可自定义。
 *      游标：　　可自定义。
 *      加满动画：关闭。
 *   (2.参数条样式配置在 参数条核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 * 参数数字：
 *   (1.参数值：　固定绑定角色/敌人属性。
 *      旋转：　　可自定义。
 *      滚动效果：可自定义。
 *      符号：　　可自定义。
 *      前缀后缀：可自定义。
 *      对齐方式：可自定义。
 *      额定值：　固定绑定角色/敌人属性。
 *      额定符号：可自定义。
 *      时间格式：可自定义。
 *   (2.参数数字样式配置在 参数数字核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 * 细节：
 *   (1.战斗中有四个名词： 角色、敌人、我方、敌方。
 *      角色/敌人，是指数据库里配置的数据信息。
 *      我方/敌方，是指战斗时，双方所站立的位置。
 *      比如，角色[1] 表示角色ID为1的数据。
 *      比如，敌方[1] 表示战斗时，第1个位置的敌人。
 * 设计：
 *   (1.敌人生命框支持多种不同的样式。你可以通过设计多个不同的
 *      生命框样式，来表现不同阵营、不同强度的敌人。
 *   (2.你可以在战斗时默认隐藏生命框，玩家需要使用特定技能
 *      (比如天眼)才能显示看见敌人的生命框和生命值。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Battle__ui （Battle后面有两个下划线）
 * 先确保项目img文件夹下是否有Battle__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 资源-固定框背景
 * 资源-固定框前景
 * 
 * 注意，参数条和参数数字的资源设置，需要在核心中配置。
 * 参数条核心 的资源路径为 img/Special__meter 。
 * 参数数字核心 的资源路径为 img/Special__number 。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过添加角色备注或敌人备注实现相关配置：
 * 
 * 角色注释：<战斗简单生命框:样式:1>
 * 角色注释：<战斗简单生命框:偏移:-24:0>
 * 角色注释：<战斗简单生命框:隐藏>
 * 
 * 敌人注释：<战斗简单生命框:样式:1>
 * 敌人注释：<战斗简单生命框:偏移:-24:0>
 * 敌人注释：<战斗简单生命框:隐藏>
 * 
 * 1.注意，必须写注释设置样式后，才能显示出生命框。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制生命框集合：
 *
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 修改样式 : 样式[1]
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 修改平移 : 位置[-24,24]
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 开启永久显示
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 关闭永久显示
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 开启长期显示
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 关闭长期显示
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 显示生命数字
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 隐藏生命数字
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 显示魔法数字
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 隐藏魔法数字
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 显示怒气数字
 * 插件指令：>战斗简单生命框 : 敌方生命框[1] : 隐藏怒气数字
 * 
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 修改样式 : 样式[1]
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 修改平移 : 位置[-24,24]
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 开启永久显示
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 关闭永久显示
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 开启长期显示
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 关闭长期显示
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 显示生命数字
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 隐藏生命数字
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 显示魔法数字
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 隐藏魔法数字
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 显示怒气数字
 * 插件指令：>战斗简单生命框 : 我方生命框[1] : 隐藏怒气数字
 * 
 * 1.每个生命框都是单独的对象，一个生命框只能绑定到一个物体上。
 *   战斗双方所有单位，都有一个生命框。
 *   "敌方生命框[1]"表示第一个敌人。
 * 2.上面的插件指令，都只在当前战斗中有效，离开战斗后，恢复默认。
 * 3.注意，"修改样式"会重刷样式数据。
 *   你对生命框的临时修改会被重置，要记得等1帧后，再重新加上。
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
 * 测试方法：   放置4个敌人，并进行生命框测试。
 * 测试结果：   战斗界面测试时，平均消耗为：【27.66ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于敌人和角色的数量是固定的，最多16个人，所以消耗不会陡增。
 *   基本上能稳定在30ms左右。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了生命框在战斗界面中进入菜单界面，然后返回战斗界面后出错的bug。
 * [v1.2]
 * 添加了 生命框 固定不随敌人移动 的功能。
 * [v1.3]
 * 优化了与战斗活动镜头的变换关系。
 * [v1.4]
 * 优化了旧存档的识别与兼容。
 * [v1.5]
 * 大幅度优化了内部结构。
 * [v1.6]
 * 修复了默认生命框设置无效的bug。
 *
 * 
 * 
 * @param 受伤后框保持显现时间
 * @type number
 * @min 1
 * @desc 战斗任何一个单位受到攻击时，生命框保持显现的持续时间，时间结束则自动消失。
 * @default 90
 * 
 * @param 角色组是否显示生命框
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，非SV模式建议false。
 * @default false
 * 
 * @param 默认生命框
 * @type number
 * @min 1
 * @desc 进入战斗后，默认使用的生命框。
 * @default 1
 * 
 * @param ----生命框集合----
 * @default 
 * 
 * @param 生命框-1
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-2
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-3
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-4
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-5
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-6
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-7
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-8
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-9
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-10
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-11
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-12
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-13
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-14
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-15
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-16
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-17
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-18
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-19
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * @param 生命框-20
 * @parent ----生命框集合----
 * @type struct<DrillESHStyle>
 * @desc 生命框的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillESHStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的生命框==
 *
 * @param ---层级---
 * @desc 
 *
 * @param 平移-位置 X
 * @parent ---层级---
 * @desc 以玩家/事件的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 * 
 * @param 平移-位置 Y
 * @parent ---层级---
 * @desc 以玩家/事件的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 战斗层级
 * @parent ---层级---
 * @type select
 * @option 下层
 * @value 下层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 生命框所在的战斗层级。
 * @default 上层
 *
 * @param 图片层级
 * @parent ---层级---
 * @desc 时间数字所处在的图片层级。
 * @default 12
 * 
 * 
 * @param ---显现效果---
 * @desc 
 * 
 * @param 是否固定生命框
 * @parent ---显现效果---
 * @type boolean
 * @on 固定
 * @off 关闭固定
 * @desc true - 固定，false - 关闭固定。固定后，敌人移动时，生命框的位置不会变化。
 * @default false
 * 
 * @param 是否永久显示
 * @parent ---显现效果---
 * @type boolean
 * @on 永久显示
 * @off 关闭
 * @desc true - 永久显示，false - 关闭。永久显示，不会因为任何条件改变显示情况。
 * @default false
 * 
 * @param 是否长期显示
 * @parent ---显现效果---
 * @type boolean
 * @on 长期显示
 * @off 关闭
 * @desc true - 长期显示，false - 关闭，单位活着时一直保持显示，死亡后才消失。
 * @default false
 *
 * @param 消失位置 X
 * @parent ---显现效果---
 * @desc 以生命框的位置为基准，x轴方向偏移，可为负数。生命框会从消失位置出现，然后回到原位置。
 * @default 0
 * 
 * @param 消失位置 Y
 * @parent ---显现效果---
 * @desc 以生命框的位置为基准，y轴方向平移，可为负数。生命框会从消失位置出现，然后回到原位置。
 * @default 0
 *
 * @param 消失时长
 * @parent ---显现效果---
 * @type number
 * @min 1
 * @desc 生命框消失/显现的时长。
 * @default 20
 * 
 * 
 * @param ----参数条----
 * @desc 
 * 
 * @param 生命-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 生命-参数条样式
 * @parent 生命-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 生命-平移-参数条 X
 * @parent 生命-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 生命-平移-参数条 Y
 * @parent 生命-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 魔法-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 魔法-参数条样式
 * @parent 魔法-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 魔法-平移-参数条 X
 * @parent 魔法-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 魔法-平移-参数条 Y
 * @parent 魔法-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 怒气-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 怒气-参数条样式
 * @parent 怒气-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 怒气-平移-参数条 X
 * @parent 怒气-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 怒气-平移-参数条 Y
 * @parent 怒气-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 *
 * 
 * @param ----参数数字----
 * @desc 
 * 
 * @param 生命-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 生命-参数数字样式
 * @parent 生命-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 生命-平移-参数数字 X
 * @parent 生命-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 生命-平移-参数数字 Y
 * @parent 生命-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 魔法-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 魔法-参数数字样式
 * @parent 魔法-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 魔法-平移-参数数字 X
 * @parent 魔法-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 魔法-平移-参数数字 Y
 * @parent 魔法-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 怒气-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 怒气-参数数字样式
 * @parent 怒气-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 怒气-平移-参数数字 X
 * @parent 怒气-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 怒气-平移-参数数字 Y
 * @parent 怒气-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * 
 * @param ----外框----
 * @desc 
 *
 * @param 资源-固定框背景
 * @parent ----外框----
 * @desc 固定框背景的图片资源。
 * @default (需配置)战斗生命框背景
 * @require 1
 * @dir img/Battle__ui/
 * @type file
 *
 * @param 平移-固定框背景 X
 * @parent ----外框----
 * @desc 修正校对背景的位置用，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-固定框背景 Y
 * @parent ----外框----
 * @desc 修正校对背景的位置用，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 资源-固定框前景
 * @parent ----外框----
 * @desc 固定框前景的图片资源，可以遮住生命条、魔法条、怒气条。
 * @default (需配置)战斗生命框前景
 * @require 1
 * @dir img/Battle__ui/
 * @type file
 *
 * @param 平移-固定框前景 X
 * @parent ----外框----
 * @desc 修正校对前景的位置用，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-固定框前景 Y
 * @parent ----外框----
 * @desc 修正校对前景的位置用，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESH (Enemy_Simple_Hud)
//		临时全局变量	DrillUp.g_ESH_xxx
//		临时局部变量	this._drill_ESH_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理)  每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	27.66ms（drill_updateValue函数）  10.06ms（Sprite_Enemy.prototype.update函数）
//		★最坏情况		开了大量生命框，并且开了大量其他参数条相关的框，计算量会非常大。
//		★备注			消耗比想象中的要小很多。
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
//			->☆战斗层级
//			
//			->☆角色实体类赋值
//				> 原位置
//				> 贴图位置
//				> 隐藏状态
//				> 死亡状态
//				> 选中状态
//				> 帧刷新聚焦时长
//			->☆敌人实体类赋值
//				->隐藏状态（中途出现的敌人）
//				->敌人数据排序（车轮战）
//				->敌人变身
//				->战斗行动 聚焦
//			->☆实体类容器
//				> 角色 实体类容器（1-8个）
//				> 敌人 实体类容器（1-8个）
//			->生命框贴图 实体类【Drill_ESH_Bean】
//				->无帧刷新
//				->重设数据
//				->捕获
//				->聚焦
//				->单位注释初始化
//			
//			->☆生命框贴图容器
//			->生命框贴图【Drill_ESH_LifeSprite】
//				->A主体
//				->B绑定
//				->C样式
//				->D背景前景
//				->E参数条
//				->F参数数字
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 生命框贴图 实体类【Drill_ESH_Bean】
//			* 生命框贴图【Drill_ESH_LifeSprite】
//		
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.注意，这里是【第一次】尝试混写 敌人和角色 的贴图数据变化，之前从未深入，结构不一定成熟 2021-5-27。
//			3.车轮战重组后，【索引会错位】，只有标定enemyIndex才能避免。
//
//		★其它说明细节：
//			1.敌人创建的顺序如下：
//				敌人数据备注的样式id > 敌人生命框数据 > 配置的样式id指令 > 创建敌人贴图 > 创建敌人生命框 > 样式数据初始化
//				如果改了样式，那么"敌人贴图"后面的流程全部要重新走。
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
	DrillUp.g_ESH_PluginTip_curName = "Drill_EnemySimpleHud.js 战斗UI-简单生命框";
	DrillUp.g_ESH_PluginTip_baseList = [
		"Drill_CoreOfGaugeMeter.js 系统-参数条核心",
		"Drill_CoreOfGaugeNumber.js 系统-参数数字核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_ESH_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_ESH_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_ESH_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_ESH_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_ESH_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_ESH_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_ESH_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EnemySimpleHud = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EnemySimpleHud');
	
	
	//==============================
	// * 静态数据 - 生命框
	//				（~struct~DrillESHStyle）
	//==============================
	DrillUp.drill_ESH_initParam = function( dataFrom ) {
		var data = {};
		// > 层级
		data['x'] = Number( dataFrom["平移-位置 X"] || 0);
		data['y'] = Number( dataFrom["平移-位置 Y"] || 0);
		data['battle_index'] = String( dataFrom["战斗层级"] || "上层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		// > 显现效果
		data['lockHomePos_enable'] = String( dataFrom["是否固定生命框"] || "false") === "true";
		data['slide_permanentShowing'] = String( dataFrom["是否永久显示"] || "false") === "true";
		data['slide_longTimeShowing'] = String( dataFrom["是否长期显示"] || "false") === "true";
		data['slide_x'] = Number( dataFrom["消失位置 X"] || 0);
		data['slide_y'] = Number( dataFrom["消失位置 Y"] || 0);
		data['slide_time'] = Number( dataFrom["消失时长"] || 30);
		// > 参数条
		data['hp_meter_enable'] = String( dataFrom["生命-是否显示参数条"] || "true") === "true";
		data['hp_meter_id'] = Number( dataFrom["生命-参数条样式"] || 0 );
		data['hp_meter_x'] = Number( dataFrom["生命-平移-参数条 X"] || 0 );
		data['hp_meter_y'] = Number( dataFrom["生命-平移-参数条 Y"] || 0 );
		data['mp_meter_enable'] = String( dataFrom["魔法-是否显示参数条"] || "true") === "true";
		data['mp_meter_id'] = Number( dataFrom["魔法-参数条样式"] || 0 );
		data['mp_meter_x'] = Number( dataFrom["魔法-平移-参数条 X"] || 0 );
		data['mp_meter_y'] = Number( dataFrom["魔法-平移-参数条 Y"] || 0 );
		data['tp_meter_enable'] = String( dataFrom["怒气-是否显示参数条"] || "true") === "true";
		data['tp_meter_id'] = Number( dataFrom["怒气-参数条样式"] || 0 );
		data['tp_meter_x'] = Number( dataFrom["怒气-平移-参数条 X"] || 0 );
		data['tp_meter_y'] = Number( dataFrom["怒气-平移-参数条 Y"] || 0 );
		// > 参数数字
		data['hp_number_enable'] = String( dataFrom["生命-是否显示参数数字"] || "true") === "true";
		data['hp_number_id'] = Number( dataFrom["生命-参数数字样式"] || 0 );
		data['hp_number_x'] = Number( dataFrom["生命-平移-参数数字 X"] || 0 );
		data['hp_number_y'] = Number( dataFrom["生命-平移-参数数字 Y"] || 0 );
		data['mp_number_enable'] = String( dataFrom["魔法-是否显示参数数字"] || "true") === "true";
		data['mp_number_id'] = Number( dataFrom["魔法-参数数字样式"] || 0 );
		data['mp_number_x'] = Number( dataFrom["魔法-平移-参数数字 X"] || 0 );
		data['mp_number_y'] = Number( dataFrom["魔法-平移-参数数字 Y"] || 0 );
		data['tp_number_enable'] = String( dataFrom["怒气-是否显示参数数字"] || "true") === "true";
		data['tp_number_id'] = Number( dataFrom["怒气-参数数字样式"] || 0 );
		data['tp_number_x'] = Number( dataFrom["怒气-平移-参数数字 X"] || 0 );
		data['tp_number_y'] = Number( dataFrom["怒气-平移-参数数字 Y"] || 0 );
		// > 外框
		data['background_src'] = String( dataFrom["资源-固定框背景"] || "" );
		data['background_x'] = Number( dataFrom["平移-固定框背景 X"] || 0 );
		data['background_y'] = Number( dataFrom["平移-固定框背景 Y"] || 0 );
		data['foreground_src'] = String( dataFrom["资源-固定框前景"] || "" );
		data['foreground_x'] = Number( dataFrom["平移-固定框前景 X"] || 0 );
		data['foreground_y'] = Number( dataFrom["平移-固定框前景 Y"] || 0 );
		return data;
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_ESH_focusingTime = Number(DrillUp.parameters['受伤后框保持显现时间'] || 60);
    DrillUp.g_ESH_actorGroupShow = String(DrillUp.parameters['角色组是否显示生命框'] || "false") == "true";
    DrillUp.g_ESH_defaultIndex = Number(DrillUp.parameters['默认生命框'] || 1);
	
	/*-----------------生命框集合------------------*/
	DrillUp.g_ESH_data_length = 20;
	DrillUp.g_ESH_data = [];
	for (var i = 0; i < DrillUp.g_ESH_data_length; i++) {
		if( DrillUp.parameters["生命框-" + String(i+1) ] != undefined &&
			DrillUp.parameters["生命框-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["生命框-" + String(i+1) ]);
			DrillUp.g_ESH_data[i] = DrillUp.drill_ESH_initParam( data );
		}else{
			DrillUp.g_ESH_data[i] = null;
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGaugeMeter &&
	Imported.Drill_CoreOfGaugeNumber ){
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_ESH_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ESH_pluginCommand.call(this, command, args);
	if(command === ">战斗简单生命框" && args.length >= 2 ){
		var sprite_id = String(args[1]);
		
		/*-----------------生命框获取------------------*/
		var sprite = null;
		if( sprite_id.indexOf("敌方生命框[") != -1 ){
			sprite_id = sprite_id.replace("敌方生命框[","");
			sprite_id = sprite_id.replace("]","");
			sprite_id = Number(sprite_id) - 1;
			
			sprite = $gameTemp._drill_ESH_enemySpriteTank[ sprite_id ];
		}
		else if( sprite_id.indexOf("我方生命框[") != -1 ){
			sprite_id = sprite_id.replace("我方生命框[","");
			sprite_id = sprite_id.replace("]","");
			sprite_id = Number(sprite_id) - 1;
			
			sprite = $gameTemp._drill_ESH_actorSpriteTank[ sprite_id ];
		}
		if( sprite == null ){ return; } 
		if( sprite._drill_styleData == null ){ return; } 
		
		/*-----------------样式数据修改------------------*/
		if( args.length == 4 ){		
			var type = String(args[3]);
			if( type == "开启永久显示" ){	
				sprite._drill_styleData['slide_permanentShowing'] = true;
			}		
			if( type == "关闭永久显示" ){	
				sprite._drill_styleData['slide_permanentShowing'] = false;
			}
			if( type == "开启长期显示" || type == "强制长期显示" ){	
				sprite._drill_styleData['slide_longTimeShowing'] = true;
			}		
			if( type == "关闭长期显示" ){	
				sprite._drill_styleData['slide_longTimeShowing'] = false;
			}
			if( type == "显示生命数字" ){	
				sprite._drill_styleData['hp_number_enable'] = true;
			}
			if( type == "隐藏生命数字" ){	
				sprite._drill_styleData['hp_number_enable'] = false;
			}
			if( type == "显示魔法数字" ){	
				sprite._drill_styleData['mp_number_enable'] = true;
			}
			if( type == "隐藏魔法数字" ){	
				sprite._drill_styleData['mp_number_enable'] = false;
			}
			if( type == "显示怒气数字" ){	
				sprite._drill_styleData['tp_number_enable'] = true;
			}
			if( type == "隐藏怒气数字" ){	
				sprite._drill_styleData['tp_number_enable'] = false;
			}
		}
		if( args.length == 6 ){		
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "修改平移" ){
				temp1 = temp1.replace("位置[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					sprite._drill_styleData['x'] = temp_arr[0];
					sprite._drill_styleData['y'] = temp_arr[1];
				}
			}
		}
		
		/*-----------------绑定数据修改------------------*/
		if( args.length == 6 ){		
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "修改样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 )-1;
				var bean = sprite.drill_ESH_getBean();
				if( bean != undefined ){
					bean.drill_ESH_setStyleId( temp1 );
				}
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ESH_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ESH_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ESH_sys_initialize.call(this);
	this.drill_ESH_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ESH_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ESH_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ESH_saveEnabled == true ){	
		$gameSystem.drill_ESH_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ESH_initSysData();
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
Game_System.prototype.drill_ESH_initSysData = function() {
	this.drill_ESH_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ESH_checkSysData = function() {
	this.drill_ESH_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ESH_initSysData_Private = function() {
	
	this._drill_ESH_defaultIndex = DrillUp.g_ESH_defaultIndex - 1;		//默认生命框
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ESH_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ESH_defaultIndex == undefined ){
		this.drill_ESH_initSysData();
	}
	
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
Scene_Battle.prototype.drill_ESH_layerAddSprite = function( sprite, layer_index ){
	this.drill_ESH_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_ESH_layerRemoveSprite = function( sprite ){
	this.drill_ESH_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_ESH_sortByZIndex = function () {
    this.drill_ESH_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 战斗参照）
//					> y 数字              （y位置，当前为 战斗参照）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_ESH_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_ESH_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_ESH_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_ESH_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_ESH_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_ESH_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_ESH_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_ESH_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_ESH_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_ESH_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Battle.prototype.drill_ESH_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_ESH_layerAddSprite_Private = function( sprite, layer_index ){
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
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_ESH_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_ESH_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 战斗参照 -> 战斗参照
	if( layer == "下层" || layer == "上层" ){
		//（不操作）
		return {'x':xx, 'y':yy };
	}
	
	// > 战斗参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		xx -= this._spriteset._baseSprite.x;	//（由于 Spriteset_Battle 的 _baseSprite 坐标始终是(0,0)，所以两个参照没有区别。）
		yy -= this._spriteset._baseSprite.y;
		
		// > 战斗镜头位移
		if( Imported.Drill_BattleCamera ){
			//（此处有点小瑕疵，反复调整 调不对，暂时搁置 2022/8/18）
			
			// > 镜头变换位置（去掉 在图层内的位移）
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
			xx += camera_pos.x;
			yy += camera_pos.y;
			
			// > 镜头变换位置（恢复在图层外变换）
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_OuterSprite( xx, yy );
			xx = camera_pos.x;
			yy = camera_pos.y;
		}else{
			xx -= this._spriteset._battleField.x;	//（处于 Spriteset_Battle 的 _battleField 情况。）
			yy -= this._spriteset._battleField.y;
		}
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}


//=============================================================================
// ** ☆角色实体类赋值
//
//			说明：	> 注意，角色数据是在开始游戏后，永久存在的。
//					  但是生命框数据的 生命周期 只有一场战斗的时间。
//					> 生命框数据划分出来，是为了确保贴图被重建时，数据不会再次初始化。
//					> 生命框数据嵌套到 Game_Actor 类中，这样 角色贴图 能获取到对象指针。
//					  注意，生命框数据由于嵌套到该类，会被一并保存。
//					  实际上该数据只在战斗中临时有用。
//=============================================================================
//==============================
// * 实体类赋值 - 初始化（战斗图层）
//
//			说明：	角色数据长期存在，而敌人数据是临时的，所以刷新标记的位置不一样。
//==============================
var _drill_ESH_createActors = Spriteset_Battle.prototype.createActors;
Spriteset_Battle.prototype.createActors = function() {
	_drill_ESH_createActors.call(this);
	
	// > 实体类初始化
	var actors = $gameParty.members();
	$gameTemp._drill_ESH_actorBeanTank = [];
	for(var i=0; i < actors.length; i++){
		var actor = actors[i];
		
		// > 实体类创建
		var bean = new Drill_ESH_Bean();
		bean.drill_ESH_setActor( actor.actorId(), i );
		$gameTemp._drill_ESH_actorBeanTank[i] = bean;
	}
	
	// > 重建标记（角色贴图重建时）
	$gameTemp._drill_ESH_needRecreateActor = true;
}
//==============================
// * 实体类赋值 - 帧刷新（角色贴图）
//==============================
var _drill_ESH_actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
	_drill_ESH_actor_update.call( this );
    if( this._actor == undefined ){ return; }
	var bean = $gameTemp._drill_ESH_actorBeanTank[ this._actor.index() ];
    if( bean == undefined ){ return; }
	
	
	// > 捕获 - 角色贴图 原位置
	bean.drill_ESH_setHomePosition( this._homeX, this._homeY );
	
	// > 捕获 - 角色贴图 贴图位置
	bean.drill_ESH_setPosition( this.x, this.y );
	
	
	//// > 标识变化
	//ESH_data['actorId'] = this._actor.actorId();
	////	（角色索引没有变化）
	
	// > 捕获 - 角色贴图 隐藏状态
	bean.drill_ESH_setHidden( this._actor.isHidden() );
	
	// > 捕获 - 角色贴图 死亡状态
	bean.drill_ESH_setDead( this._actor.isDead() );
	
	// > 捕获 - 角色贴图 选中状态
	bean.drill_ESH_setSelected( this._actor.isSelected() );
	
	// > 帧刷新聚焦时长
	bean.drill_ESH_updateFocusingTime();
}


//=============================================================================
// ** ☆敌人实体类赋值
//
//			说明：	> 敌人数据 是进入战斗后，实时新建的。
//					  生命框数据和敌人数据的 生命周期 都是一场战斗的时间。
//					> 生命框数据划分出来，是为了确保贴图被重建时，数据不会再次初始化。
//					> 生命框数据嵌套到 Game_Troop 类中，这样 敌人贴图 能获取到对象指针。
//=============================================================================
//==============================
// * 实体类赋值 - 初始化（敌群）
//==============================
var _drill_ESH_troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function( troopId ){
	_drill_ESH_troop_setup.call( this, troopId );
	
	// > 敌人数据排序（$gameTroop中的顺序是 添加顺序，而不是按照 x位置 从左往右，需要排序）
	var enemies = this.members();
	enemies.sort( function(a, b){ return a._screenX-b._screenX } );
	
	// > 实体类初始化
	$gameTemp._drill_ESH_enemyBeanTank = [];
	for(var i=0; i < enemies.length; i++){
		var enemy = enemies[i];
		
		// > 实体类创建
		var bean = new Drill_ESH_Bean();
		bean.drill_ESH_setEnemy( enemy.enemyId(), i );
		$gameTemp._drill_ESH_enemyBeanTank[i] = bean;
		
		//alert( "enemy:"+enemy.enemyId() );
	}
	
	// > 重建标记
	$gameTemp._drill_ESH_needRecreateEnemy = true;
}
//==============================
// * 实体类赋值 - 帧刷新（敌人贴图）
//==============================
var _drill_ESH_enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
	_drill_ESH_enemy_update.call( this );
    if( this._enemy == undefined ){ return; }
	var bean = $gameTemp._drill_ESH_enemyBeanTank[ this._enemy.index() ];
    if( bean == undefined ){ return; }
	
	
	// > 捕获 - 敌人贴图 原位置
	bean.drill_ESH_setHomePosition( this._homeX, this._homeY );
	
	// > 捕获 - 敌人贴图 贴图位置
	bean.drill_ESH_setPosition( this.x, this.y );
	
	
	//// > 标识变化
	//ESH_data['enemyId'] = this._enemy.enemyId();
	//ESH_data['enemyIndex'] = this._enemy.index();
	
	// > 捕获 - 敌人贴图 隐藏状态
	bean.drill_ESH_setHidden( this._enemy.isHidden() );
	
	// > 捕获 - 敌人贴图 死亡状态
	bean.drill_ESH_setDead( this._enemy.isDead() );
	
	// > 捕获 - 敌人贴图 选中状态
	bean.drill_ESH_setSelected( this._enemy.isSelected() );
	
	// > 帧刷新聚焦时长
	bean.drill_ESH_updateFocusingTime();
}
//==============================
// * 实体类赋值 - 敌人变身
//==============================
var _drill_ESH_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function( enemyId ){
	_drill_ESH_transform.call( this, enemyId );

	// > 实体类重置
	var bean = $gameTemp._drill_ESH_enemyBeanTank[ this.index() ];
	bean.drill_ESH_setEnemy( this.enemyId(), this.index() );
	
	$gameTemp._drill_ESH_needRecreateEnemy = true;
}
//==============================
// * 实体类赋值 - 战斗行动 聚焦
//
//			说明：	此处 角色和敌人 都放一起进行聚焦判定。
//==============================
var _drill_ESH_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function( target ){
	_drill_ESH_apply.call( this, target );
	if( target == undefined ){ return; }
	
	// > 敌人受伤
	if( target.isEnemy() ){
		var bean = $gameTemp._drill_ESH_enemyBeanTank[ target.index() ];
		if( bean == undefined ){ return; }
		
		if( this.isHpRecover() ){
			bean.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
			
		}else if( this.item() && this.item().damage.type === 5 ){
			bean.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
			
			//var sub = this.subject();
			//if( sub &&
			//	sub['_drill_ESH_data'] ){
			//	sub['_drill_ESH_data']['focusing_time'] = DrillUp.g_ESH_focusingTime; 
			//}
		};
	}
	
	// > 角色受伤
	if( target.isActor() ){
		var bean = $gameTemp._drill_ESH_actorBeanTank[ target.index() ];
		if( bean == undefined ){ return; }
		
		if( this.isHpRecover() ){
			bean.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
			
		}else if( this.item() && this.item().damage.type === 5 ){
			bean.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
			
		};
	}
};


//=============================================================================
// ** ☆实体类容器
//
//			说明：	> 此模块用于存放 实体类 对象，贴图能够通过容器，直接操作到实体类。
//					> 比如通过 $gameTemp._drill_ESH_actorBeanTank[0] 直接获取到第一个角色的实体类。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_ESH_beanTank_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_ESH_beanTank_temp_initialize.call(this);
	this._drill_ESH_actorBeanTank = [];				//角色 实体类容器（1-8个）
	this._drill_ESH_enemyBeanTank = [];				//敌人 实体类容器（1-8个）
};
//==============================
// * 容器 - 切换贴图时（战斗界面刷新）
//==============================
var _drill_ESH_beanTank_createCharacters = Spriteset_Battle.prototype.createCharacters;
Spriteset_Battle.prototype.createCharacters = function() {
	$gameTemp._drill_ESH_actorBeanTank = [];		//角色 实体类容器
	$gameTemp._drill_ESH_enemyBeanTank = [];		//敌人 实体类容器
	_drill_ESH_beanTank_createCharacters.call(this);
};
//==============================
// * 容器 - 界面销毁时
//==============================
var _drill_ESH_beanTank_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_ESH_beanTank_terminate.call(this);
	$gameTemp._drill_ESH_actorBeanTank = [];		//角色 实体类容器
	$gameTemp._drill_ESH_enemyBeanTank = [];		//敌人 实体类容器
};

//=============================================================================
// ** 生命框贴图 实体类【Drill_ESH_Bean】
// **		
// **		作用域：	战斗界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **					->捕获
// **						> 原位置
// **						> 贴图位置
// **						> 隐藏状态
// **						> 死亡状态
// **						> 选中状态
// **					->聚焦
// **						->判断是否被聚焦
// **						->判断是否符合长期显示
// **					->单位注释初始化
// **		
// **		说明：	> 该类可存储。
// **				> 该类没有帧刷新，只能被动赋值。（Sprite_Actor/Sprite_Enemy 外部控制）
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_ESH_Bean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_ESH_Bean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_initPrivateData();										//私有数据初始化
};
//##############################
// * 实体类 - 设置可见【开放函数】
//			
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 实体类 - 设置样式ID【开放函数】
//			
//			参数：	> styleId 数字
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setStyleId = function( styleId ){
	this._drill_styleId = styleId;
};
//##############################
// * 实体类 - 设置角色【开放函数】
//			
//			参数：	> actorId 数字
//					> actorIndex 数字
//			返回：	> 无
//
//			说明：	> 此函数不能放在 帧刷新 中执行，最好必要时才执行一次。
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setActor = function( actorId, actorIndex ){
	var members = $gameParty.members();
	if( members.length == 0 ){ return; }
	var actor = members[ actorIndex ];
	var actor_data = actor.actor();
	this.drill_ESH_readNote( actor_data.note );		//（注释初始化）
	this._drill_actorId = actorId;
	this._drill_actorIndex = actorIndex;
	
	this._drill_enemyId = -1;
	this._drill_enemyIndex = -1;
};
//##############################
// * 实体类 - 设置敌人【开放函数】
//			
//			参数：	> enemyId 数字
//					> enemyIndex 数字
//			返回：	> 无
//
//			说明：	> 此函数不能放在 帧刷新 中执行，最好必要时才执行一次。
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setEnemy = function( enemyId, enemyIndex ){
	var members = $gameTroop.members();
	if( members.length == 0 ){ return; }
	//var enemy = members[ enemyIndex ];
	//var enemy_data = enemy.enemy();
	this.drill_ESH_readNote( $dataEnemies[ enemyId ].note );		//（注释初始化）
	this._drill_enemyId = enemyId;
	this._drill_enemyIndex = enemyIndex;
	
	this._drill_actorId = -1;
	this._drill_actorIndex = -1;
};
//##############################
// * 实体类 - 判断角色【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ESH_Bean.prototype.drill_ESH_isActor = function(){
	if( this._drill_actorId == -1 ){ return false; }
	if( this._drill_actorIndex == -1 ){ return false; }
	return true;
};
//##############################
// * 实体类 - 判断敌人【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ESH_Bean.prototype.drill_ESH_isEnemy = function(){
	if( this._drill_enemyId == -1 ){ return false; }
	if( this._drill_enemyIndex == -1 ){ return false; }
	return true;
};

//##############################
// * 实体类 - 捕获 - 设置原位置【开放函数】
//			
//			参数：	> x,y 坐标
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setHomePosition = function( x, y ){
	this._drill_spriteHomeX = x;
	this._drill_spriteHomeY = y;
};
//##############################
// * 实体类 - 捕获 - 设置贴图位置【开放函数】
//			
//			参数：	> x,y 坐标
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setPosition = function( x, y ){
	this._drill_spriteX = x;
	this._drill_spriteY = y;
};
//##############################
// * 实体类 - 捕获 - 设置隐藏状态【开放函数】
//			
//			参数：	> enabled 布尔
//			返回：	> 无
//
//			说明：	> 捕获单位 隐藏状态 的情况。
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setHidden = function( enabled ){
	this._drill_isHidden = enabled;
};
//##############################
// * 实体类 - 捕获 - 设置死亡状态【开放函数】
//			
//			参数：	> enabled 布尔
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setDead = function( enabled ){
	this._drill_isDead = enabled;
};
//##############################
// * 实体类 - 捕获 - 设置选中状态【开放函数】
//			
//			参数：	> enabled 布尔
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setSelected = function( enabled ){
	this._drill_isSelected = enabled;
};

//##############################
// * 实体类 - 聚焦 - 设置聚焦时长【开放函数】
//			
//			参数：	> time 数字
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_setFocusingTime = function( time ){
	this._drill_focusingTime = time;
};
//##############################
// * 实体类 - 聚焦 - 帧刷新聚焦时长【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_ESH_Bean.prototype.drill_ESH_updateFocusingTime = function(){
	this._drill_focusingTime -= 1;
	if( this._drill_focusingTime < 0 ){
		this._drill_focusingTime = 0;
	}
};
//##############################
// * 实体类 - 聚焦 - 判断是否被聚焦【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ESH_Bean.prototype.drill_ESH_isFocusing = function(){
	
	// > 隐藏状态，不聚焦（比如 中途出现的敌人）
	if( this._drill_isHidden == true ){ return false; }
	
	// > 选中+活着，聚焦
	if( this._drill_isSelected == true && this._drill_isDead == false ){ return true; }
	
	// > 手动聚焦（比如受伤时）
	if( this._drill_focusingTime > 0 ){ return true; }
	
	return false;
};
//##############################
// * 实体类 - 聚焦 - 判断是否符合长期显示【开放函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ESH_Bean.prototype.drill_ESH_isLongTimeShowing = function(){
	
	// > 隐藏状态，不聚焦（比如 中途出现的敌人）
	if( this._drill_isHidden == true ){ return false; }
	
	// > 活着，聚焦
	if( this._drill_isDead == false ){ return true; }
	
	return false;
};
//==============================
// * 实体类 - 私有数据初始化
//==============================
Drill_ESH_Bean.prototype.drill_initPrivateData = function(){
	
	this._drill_visible = true;									//实体类 - 可见
	this._drill_styleId = $gameSystem._drill_ESH_defaultIndex;	//实体类 - 样式ID
	
	this._drill_actorId = -1;				//实体类 - 单位 - 角色ID
	this._drill_actorIndex = -1;			//实体类 - 单位 - 我方索引
	this._drill_enemyId = -1;				//实体类 - 单位 - 敌人ID
	this._drill_enemyIndex = -1;			//实体类 - 单位 - 敌方索引
	
	this._drill_spriteHomeX = 0;			//实体类 - 原位置X
	this._drill_spriteHomeY = 0;			//实体类 - 原位置Y
	this._drill_spriteX = 0;				//实体类 - 贴图位置X
	this._drill_spriteY = 0;				//实体类 - 贴图位置Y
	this._drill_offsetX = 0;				//实体类 - 偏移位置X
	this._drill_offsetY = 0;				//实体类 - 偏移位置Y
	
	this._drill_isHidden = false;			//实体类 - 隐藏状态
	this._drill_isDead = false;				//实体类 - 死亡状态
	this._drill_isSelected = false;			//实体类 - 选中状态
	
	this._drill_focusingTime = 0;			//实体类 - 聚焦 - 聚焦时长
};
//==============================
// * 实体类 - 单位注释初始化
//
//			说明：	> 此函数不能放在 帧刷新 中执行，最好必要时才执行一次。
//==============================
Drill_ESH_Bean.prototype.drill_ESH_readNote = function( note_str ){
	note_str = note_str.replace( />/g, "" );	//（去掉右尖括号）
	
	var row_list = note_str.split(/[\r\n]+/);
	for(var k=0; k < row_list.length; k++){
		var args = row_list[k].split(/[：:]/);
		var command = args.shift();
		if( command == "<战斗简单生命框" ){
			
			if( args.length == 1 ){
				var type = String(args[0]);
				if( type == "隐藏" ){
					this._drill_visible = false;
				}
			}
			if( args.length == 2 ){
				var type = String(args[0]);
				var temp1 = String(args[1]);
				if( type == "样式" ){
					this._drill_styleId = Number( temp1 )-1;
				}
			}
			if( args.length == 3 ){
				var type = String(args[0]);
				var temp1 = String(args[1]);
				var temp2 = String(args[2]);
				if( type == "偏移" ){
					this._drill_offsetX = Number( temp1 );
					this._drill_offsetY = Number( temp2 );
				}
			}
		}
	}
}



//=============================================================================
// ** ☆生命框贴图容器
//
//			说明：	> 此模块控制 生命框贴图 的创建、帧刷新。
//					> 改变 实体类、样式 【不重建】贴图。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图容器 - 初始化
//==============================
var _drill_ESH_spTank_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_ESH_spTank_temp_initialize.call(this);
	this._drill_ESH_actorSpriteTank = [];			//角色 生命框贴图容器
	this._drill_ESH_needRecreateActor = false;		//角色 重建标记
	this._drill_ESH_enemySpriteTank = [];			//敌人 生命框贴图容器
	this._drill_ESH_needRecreateEnemy = false;		//敌人 重建标记
};
//==============================
// * 贴图容器 - 帧刷新
//==============================
var _drill_ESH_spTank_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_ESH_spTank_update.call(this);
	this.drill_ESH_updateCreateActorSprite();		//帧刷新 - 创建角色生命框
	this.drill_ESH_updateActorSprite();				//帧刷新 - 角色生命框
	this.drill_ESH_updateCreateEnemySprite();		//帧刷新 - 创建敌人生命框
	this.drill_ESH_updateEnemySprite();				//帧刷新 - 敌人生命框
};
//==============================
// * 贴图容器 - 析构函数
//==============================
var _drill_ESH_spTank_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_ESH_spTank_terminate.call(this);
	this.drill_ESH_clearActorSpriteTank();			//清空角色容器
	this.drill_ESH_clearEnemySpriteTank();			//清空敌人容器
};

//==============================
// * 敌人贴图容器 - 创建生命框
//
//			说明：	此函数在 帧刷新 中，通过 重建标记 来执行重建。
//==============================
Scene_Battle.prototype.drill_ESH_updateCreateEnemySprite = function() {
	if( $gameTemp._drill_ESH_needRecreateEnemy != true ){ return; }
	$gameTemp._drill_ESH_needRecreateEnemy = false;
	
	// > 清理旧贴图
	this.drill_ESH_clearEnemySpriteTank();
	
	// > 敌方队员（这时敌人已排序）
	for( var i = 0; i < $gameTroop.members().length; i++ ){
		var enemy_data = $gameTroop.members()[i];
		
		var temp_sprite = new Drill_ESH_LifeSprite();
		temp_sprite.drill_ESH_bindEnemy( i );	//绑定敌人
		
		var s_data = temp_sprite._drill_styleData;
		if( s_data != undefined ){
			this.drill_ESH_layerAddSprite( temp_sprite, s_data['battle_index'] );
		}else{
			this.drill_ESH_layerAddSprite( temp_sprite, "上层" );
		}
		$gameTemp._drill_ESH_enemySpriteTank.push( temp_sprite );	//（注意，最顶层也加在了spriteSet的tank中）
	}
	
	this.drill_ESH_sortByZIndex();
}
//==============================
// * 敌人贴图容器 - 清空全部敌人生命框
//==============================
Scene_Battle.prototype.drill_ESH_clearEnemySpriteTank = function(){
	var s_tank = $gameTemp._drill_ESH_enemySpriteTank;
	for(var i = s_tank.length-1; i >= 0; i-- ){
		this.drill_ESH_layerRemoveSprite( s_tank[i] );
		s_tank.splice(i,1);
	}
	$gameTemp._drill_ESH_enemySpriteTank = [];
}
//==============================
// * 敌人贴图容器 - 帧刷新
//==============================
Scene_Battle.prototype.drill_ESH_updateEnemySprite = function() {
	for(var i = 0; i < $gameTemp._drill_ESH_enemySpriteTank.length; i++ ){
		var temp_sprite = $gameTemp._drill_ESH_enemySpriteTank[i];
		this.drill_ESH_updatePosition( temp_sprite );
	}
}
//==============================
// * 敌人贴图容器 - 重建时
//==============================
var _drill_ESH_spTank_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
	_drill_ESH_spTank_createEnemies.call(this);
	$gameTemp._drill_ESH_needRecreateEnemy = true;
};

//==============================
// * 角色贴图容器 - 创建生命框
//
//			说明：	此函数在 帧刷新 中，通过 重建标记 来执行重建。
//==============================
Scene_Battle.prototype.drill_ESH_updateCreateActorSprite = function() {
	if( $gameTemp._drill_ESH_needRecreateActor != true ){ return; }
	$gameTemp._drill_ESH_needRecreateActor = false;
	
	// > 清理旧贴图
	this.drill_ESH_clearActorSpriteTank();
	
	// > 我方队员
	for( var i = 0; i < $gameParty.members().length; i++ ){
		var actor_data = $gameParty.members()[i];
		
		var temp_sprite = new Drill_ESH_LifeSprite();
		temp_sprite.drill_ESH_bindActor( i );	//绑定角色
		
		var s_data = temp_sprite._drill_styleData;
		if( s_data != undefined ){
			this.drill_ESH_layerAddSprite( temp_sprite, s_data['battle_index'] );
		}else{
			this.drill_ESH_layerAddSprite( temp_sprite, "上层" );
		}
		$gameTemp._drill_ESH_actorSpriteTank.push( temp_sprite );
	}
	
	this.drill_ESH_sortByZIndex();
}
//==============================
// * 角色贴图容器 - 清空全部角色生命框
//==============================
Scene_Battle.prototype.drill_ESH_clearActorSpriteTank = function(){
	var s_tank = $gameTemp._drill_ESH_actorSpriteTank;
	for(var i = s_tank.length-1; i >= 0; i-- ){
		this.drill_ESH_layerRemoveSprite( s_tank[i] );
		s_tank.splice(i,1);
	}
	$gameTemp._drill_ESH_actorSpriteTank = [];
}
//==============================
// * 角色贴图容器 - 帧刷新
//==============================
Scene_Battle.prototype.drill_ESH_updateActorSprite = function() {
	for(var i = 0; i < $gameTemp._drill_ESH_actorSpriteTank.length; i++ ){
		var temp_sprite = $gameTemp._drill_ESH_actorSpriteTank[i];
		this.drill_ESH_updatePosition( temp_sprite );
	}
}
//==============================
// * 角色贴图容器 - 重建时
//==============================
var _drill_ESH_spTank_createActors = Spriteset_Battle.prototype.createActors;
Spriteset_Battle.prototype.createActors = function() {
	_drill_ESH_spTank_createActors.call(this);
	$gameTemp._drill_ESH_needRecreateActor = true;
};

//==============================
// * 贴图容器 - 帧刷新 镜头与位置
//
//			说明：	由于 生命框贴图 包含镜头的位移控制，因此 单独提出来 进行帧刷新。 
//==============================
Scene_Battle.prototype.drill_ESH_updatePosition = function( sprite ){
	var s_data = sprite.drill_ESH_getStyleData();
	var b_data = sprite.drill_ESH_getBean();
	if( s_data == undefined ){ return; }
	if( b_data == undefined ){ return; }
	
	
	// > 位移（战斗参照）
	var xx = s_data['x'];
	var yy = s_data['y'];
	xx += b_data._drill_spriteX;
	yy += b_data._drill_spriteY;
	
	// > 固定生命框
	if( s_data['lockHomePos_enable'] == true ){
		xx = b_data._drill_spriteHomeX;
		yy = b_data._drill_spriteHomeY;
	}
	
	// > 偏移（单位注释）
	xx += b_data._drill_offsetX;
	yy += b_data._drill_offsetY;
	
	
	// > 根据背景资源居中
	if( sprite._drill_background_sprite.bitmap != null ){
		xx -= sprite._drill_background_sprite.bitmap.width *0.5;
		yy -= sprite._drill_background_sprite.bitmap.height *0.5;		
		
	}else if( sprite._drill_foreground_sprite.bitmap != null ){
		xx -= sprite._drill_foreground_sprite.bitmap.width *0.5;
		yy -= sprite._drill_foreground_sprite.bitmap.height *0.5;		
	}
	
	// > 显现/消失 的位移
	xx += sprite._drill_curSlideX;
	yy += sprite._drill_curSlideY;
	
	// > 层级与镜头的位移
	var pos = this.drill_ESH_layerCameraMoving( xx, yy, s_data['battle_index'], {} );
	xx = pos['x'];
	yy = pos['y'];
	
	// > 校验值
	if( DrillUp.g_ESH_checkNaN == true ){
		if( isNaN( xx ) ){
			DrillUp.g_ESH_checkNaN = false;
			alert( DrillUp.drill_ESH_getPluginTip_ParamIsNaN( "xx" ) );
		}
		if( isNaN( yy ) ){
			DrillUp.g_ESH_checkNaN = false;
			alert( DrillUp.drill_ESH_getPluginTip_ParamIsNaN( "yy" ) );
		}
	}
	
	sprite.x = Math.floor(xx);
	sprite.y = Math.floor(yy);
}
//==============================
// * 贴图容器 - 校验标记
//==============================
DrillUp.g_ESH_checkNaN = true;
	
	

//=============================================================================
// ** 生命框贴图【Drill_ESH_LifeSprite】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个贴图组合体，根据预设定义，得到一个参数条贴图。
// **					> 具体功能见 "1.系统 > 关于参数条.docx"。
// **		子功能：	->贴图
// **					->A主体
// **						->显示/隐藏
// **						->显现/消失
// **					->B绑定
// **						->绑定角色
// **						->绑定敌人
// **						->获取 - 样式数据
// **						->获取 - 实体类
// **						->获取 - 角色对象
// **						->获取 - 敌人对象
// **						->聚焦
// **					->C样式
// **						->销毁
// **						->初始化对象
// **					->D背景前景
// **					->E参数条
// **						> 生命条
// **						> 魔法条
// **						> 怒气条
// **					->F参数数字
// **						> 生命数字
// **						> 魔法数字
// **						> 怒气数字
// **
// **		说明：	> sprite贴在任意地方都可以。
// **				> 改变 实体类、样式 【不重建】贴图。
// **				
// ** 		代码：	> 范围 - 该类显示单独的敌人生命框。
// **				> 结构 - [ ●合并 /分离/混乱] 该类使用了样式结构。
// **				> 数量 - [单个/ ●多个 ] 
// **				> 创建 - [一次性/ ●自延迟 /外部延迟] 
// **				> 销毁 - [不考虑/ ●自销毁 /外部销毁] 
// **				> 样式 - [不可修改/ ●自变化 /外部变化] 样式能够根据 bean 的 _drill_styleId 自变化，随时修改。
//=============================================================================
//==============================
// * 生命框贴图 - 定义
//==============================
function Drill_ESH_LifeSprite() {
    this.initialize.apply(this, arguments);
}
Drill_ESH_LifeSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_ESH_LifeSprite.prototype.constructor = Drill_ESH_LifeSprite;
//==============================
// * 生命框贴图 - 初始化
//==============================
Drill_ESH_LifeSprite.prototype.initialize = function(){
	Sprite_Base.prototype.initialize.call(this);
	this._drill_actorBeanId = -1;		//B绑定 - 绑定角色
	this._drill_enemyBeanId = -1;		//B绑定 - 绑定敌人
	this._drill_styleId = -1;			//C样式 - 样式ID
	this._drill_styleData = null;		//C样式 - 样式数据
	
										//初始化数据（无）
										//初始化对象（在 B绑定 时执行）
};
//==============================
// * 生命框贴图 - 帧刷新
//==============================
Drill_ESH_LifeSprite.prototype.update = function() {
	if( this.drill_ESH_isReady() == false ){ return; }
	if( this.drill_ESH_isOptimizationPassed() == false ){ return; }
	Sprite_Base.prototype.update.call(this);
	this.drill_updateVisible();			//帧刷新 - A主体 - 显示/隐藏
	this.drill_updateSlide();			//帧刷新 - A主体 - 显现/消失
	this.drill_updateBind();			//帧刷新 - B绑定
	this.drill_updateStyle();			//帧刷新 - C样式
	this.drill_updateMeterValue();		//帧刷新 - E参数条
	this.drill_updateNumberValue();		//帧刷新 - F参数数字
};
//##############################
// * 生命框贴图 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_ESH_LifeSprite.prototype.drill_ESH_setVisible = function( visible ){
	var b_data = this.drill_ESH_getBean();
	if( b_data == undefined ){ return; }
	b_data._drill_visible = visible;
};
//##############################
// * 生命框贴图 - 是否就绪【标准函数】
//
//			参数：	> 无
//			返回：	> visible 布尔
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_ESH_LifeSprite.prototype.drill_ESH_isReady = function(){
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	if( s_data == undefined ){ return false; }
	if( b_data == undefined ){ return false; }
	return true;
};
//##############################
// * 生命框贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_ESH_LifeSprite.prototype.drill_ESH_isOptimizationPassed = function(){
    return true;	//（暂无策略）
};
//##############################
// * 生命框贴图 - 销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 如果需要重建时。
//##############################
Drill_ESH_LifeSprite.prototype.drill_ESH_destroy = function(){
	this.drill_ESH_destroy_Private();
};
//==============================
// * 生命框贴图 - 初始化对象
//==============================
Drill_ESH_LifeSprite.prototype.drill_initSprite = function() {
	this.drill_initAttr();					//初始化对象 - A主体
	this.drill_initBind();					//初始化对象 - B绑定
	this.drill_initStyle();					//初始化对象 - C样式
	this.drill_createBackground();			//初始化对象 - D背景前景 - 创建背景
	this.drill_createMeter();				//初始化对象 - E参数条
	this.drill_createForeground();			//初始化对象 - D背景前景 - 创建前景
	this.drill_createNumber();				//初始化对象 - F参数数字
};
//==============================
// * 生命框贴图 - 销毁（私有）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_destroy_Private = function() {
	
	// > 销毁 - A主体
	this.visible = false;
	
	// > 销毁 - B绑定（无）
	
	// > 销毁 - C样式（无）
	
	// > 销毁 - D背景前景
	this.removeChild( this._drill_background_sprite );
	this.removeChild( this._drill_foreground_sprite );
	this._drill_background_sprite = null;
	this._drill_foreground_sprite = null;
	
	// > 销毁 - E参数条
	this.removeChild( this._drill_hp_meterSprite );
	this.removeChild( this._drill_mp_meterSprite );
	this.removeChild( this._drill_tp_meterSprite );
	this._drill_hp_meterSprite = null;
	this._drill_mp_meterSprite = null;
	this._drill_tp_meterSprite = null;
	
	// > 销毁 - F参数数字
	this.removeChild( this._drill_hp_numberSprite );
	this.removeChild( this._drill_mp_numberSprite );
	this.removeChild( this._drill_tp_numberSprite );
	this._drill_hp_numberSprite = null;
	this._drill_mp_numberSprite = null;
	this._drill_tp_numberSprite = null;
}

//==============================
// * A主体 - 初始化对象
//==============================
Drill_ESH_LifeSprite.prototype.drill_initAttr = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 私有对象初始化
	this._drill_slideTime = 0;			//当前显现效果时间
	this._drill_curSlideX = 0;
	this._drill_curSlideY = 0;
	
	// > 自身属性初始化
	this.x = s_data['x'];
	this.y = s_data['y'];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = false;
	this.opacity = 255;
	this.zIndex = s_data['zIndex'];		//图片层级
};
//==============================
// * A主体 - 帧刷新 显示/隐藏
//==============================
Drill_ESH_LifeSprite.prototype.drill_updateVisible = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 注释中关闭了显示
	if( b_data._drill_visible == false ){
		this.visible = false;
		return; 
	}
	
	// > 中途出现的敌人，隐藏
	if( b_data._drill_isHidden == true ){
		this.visible = false;
		return; 
	}
	
	// > 关闭角色组的显示
	if( DrillUp.g_ESH_actorGroupShow == false &&
		this.drill_ESH_isBindingActor() == true ){
		this.visible = false;
		return;
	}
	
	this.visible = true;
}
//==============================
// * A主体 - 帧刷新 显现/消失
//==============================
Drill_ESH_LifeSprite.prototype.drill_updateSlide = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 显现时
	if( this.drill_isShowing() ){
		this._drill_slideTime += 1;
		if( this._drill_slideTime > s_data['slide_time'] ){
			this._drill_slideTime = s_data['slide_time'];
		}
		
	// > 消失时
	}else{
		this._drill_slideTime -= 1;
		if( this._drill_slideTime < 0 ){
			this._drill_slideTime = 0;
		}
	}
	
	// > 参数设置
	this._drill_curSlideX = s_data['slide_x'] - s_data['slide_x'] * this._drill_slideTime / s_data['slide_time'];
	this._drill_curSlideY = s_data['slide_y'] - s_data['slide_y'] * this._drill_slideTime / s_data['slide_time'];
	this.opacity = 255 * this._drill_slideTime / s_data['slide_time'] ;
}
//==============================
// * A主体 - 是否显现/消失（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_isShowing = function(){
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	if( s_data == undefined ){ return false; }
	if( b_data == undefined ){ return false; }
	
	// > 永久显示
	if( s_data['slide_permanentShowing'] == true ){ return true; }
	
	// > 长期显示
	if( s_data['slide_longTimeShowing'] == true ){
		if( b_data.drill_ESH_isLongTimeShowing() ){
			return true; 
		}
	}
	
	// > 被聚焦时才显示
	if( b_data.drill_ESH_isFocusing() ){
		return true; 
	}
	
	return false;
}


//==============================
// * B绑定 - 初始化对象
//			
//			说明：	注意，这里【不能放】敌人或角色的index和id，因为随时会变，变化后，会错位。
//==============================
Drill_ESH_LifeSprite.prototype.drill_initBind = function() {
	
	// > 此处不能对id初始化，会丢失绑定
	//this._drill_actorBeanId = -1;
	//this._drill_enemyBeanId = -1;
	
	// > hp/mp标定值初始化
	this._drill_hp_flag = 0;
	this._drill_mp_flag = 0;
	var enemy = this.drill_ESH_getEnemy();
	if( enemy != undefined ){
		this._drill_hp_flag = enemy._hp;
		this._drill_mp_flag = enemy._mp;
	}
	var actor = this.drill_ESH_getActor();
	if( actor != undefined ){
		this._drill_hp_flag = actor._hp;
		this._drill_mp_flag = actor._mp;
	}
};
//==============================
// * B绑定 - 绑定角色（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_bindActor = function( actorBeanId ){
	
	// > 角色赋值
	this._drill_actorBeanId = actorBeanId;
	this._drill_enemyBeanId = -1;
	
	// > 帧刷新样式
	this.drill_updateStyle();
};
//==============================
// * B绑定 - 绑定敌人（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_bindEnemy = function( enemyBeanId ){
	
	// > 敌人赋值
	this._drill_enemyBeanId = enemyBeanId;
	this._drill_actorBeanId = -1;
	
	// > 帧刷新样式
	this.drill_updateStyle();
};
//==============================
// * B绑定 - 判断是否为角色（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_isBindingActor = function() {
	return this._drill_actorBeanId != -1;
};
//==============================
// * B绑定 - 判断是否为敌人（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_isBindingEnemy = function() {
	return this._drill_enemyBeanId != -1;
};
//==============================
// * B绑定 - 获取 - 实体类（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_getBean = function() {
	if( this._drill_actorBeanId != -1 ){ return $gameTemp._drill_ESH_actorBeanTank[ this._drill_actorBeanId ]; }
	if( this._drill_enemyBeanId != -1 ){ return $gameTemp._drill_ESH_enemyBeanTank[ this._drill_enemyBeanId ]; }
	return null;
};
//==============================
// * B绑定 - 获取 - 角色对象（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_getActor = function() {
	if( this._drill_actorBeanId == -1 ){ return null; }
	var members = $gameParty.members();
	if( members.length == 0 ){ return null; }
	return members[ this._drill_actorBeanId ];
};
//==============================
// * B绑定 - 获取 - 敌人对象（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_getEnemy = function() {
	if( this._drill_enemyBeanId == -1 ){ return null; }
	var members = $gameTroop.members();
	if( members.length == 0 ){ return null; }
	return members[ this._drill_enemyBeanId ];
};
//==============================
// * B绑定 - 帧刷新 聚焦
//==============================
Drill_ESH_LifeSprite.prototype.drill_updateBind = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 敌人对象
	var enemy = this.drill_ESH_getEnemy();
	if( enemy != undefined ){
		
		// > 值变化时，聚焦
		if( this._drill_hp_flag != enemy._hp ){
			this._drill_hp_flag = enemy._hp;
			b_data.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
		}
		if( this._drill_mp_flag != enemy._mp ){
			this._drill_mp_flag = enemy._mp;
			b_data.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
		}
	}
	
	// > 角色对象
	var actor = this.drill_ESH_getActor();
	if( actor != undefined ){
		
		// > 值变化时，聚焦
		if( this._drill_hp_flag != actor._hp ){
			this._drill_hp_flag = actor._hp;
			b_data.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
		}
		if( this._drill_mp_flag != actor._mp ){
			this._drill_mp_flag = actor._mp;
			b_data.drill_ESH_setFocusingTime( DrillUp.g_ESH_focusingTime );
		}
	}
}


//==============================
// * C样式 - 初始化对象
//==============================
Drill_ESH_LifeSprite.prototype.drill_initStyle = function() {
	
	// > 此处不能对id初始化，会丢失样式数据
	//this._drill_styleId = -1;
	//this._drill_styleData = null;
}
//==============================
// * C样式 - 帧刷新
//==============================
Drill_ESH_LifeSprite.prototype.drill_updateStyle = function() {
	var b_data = this.drill_ESH_getBean();
	
	// > id变化时，自变化 销毁与重建
	if( this._drill_styleId == b_data._drill_styleId ){ return; }
	this._drill_styleId = b_data._drill_styleId;
	if( this._drill_styleId == -1 ){ return; }
	
	// > 样式数据初始化
	var s_data = DrillUp.g_ESH_data[ this._drill_styleId ];
	if( s_data == undefined ){ return; }
	this._drill_styleData = JSON.parse(JSON.stringify( s_data ));
	
	// > 销毁
	this.drill_ESH_destroy();
	
	// > 初始化对象
	this.drill_initSprite();
}
//==============================
// * C样式 - 获取 - 样式数据（开放函数）
//==============================
Drill_ESH_LifeSprite.prototype.drill_ESH_getStyleData = function() {
	return this._drill_styleData;
};


//==============================
// * D背景前景 - 创建背景
//==============================
Drill_ESH_LifeSprite.prototype.drill_createBackground = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 固定框背景
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadBitmap( "img/Battle__ui/", s_data['background_src'], 0, true );
	temp_sprite.x = s_data['background_x'];
	temp_sprite.y = s_data['background_y'];
	this.addChild(temp_sprite);
	this._drill_background_sprite = temp_sprite;
};
//==============================
// * D背景前景 - 创建前景
//==============================
Drill_ESH_LifeSprite.prototype.drill_createForeground = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 固定框前景
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadBitmap( "img/Battle__ui/", s_data['foreground_src'], 0, true );
	temp_sprite.x = s_data['foreground_x'];
	temp_sprite.y = s_data['foreground_y'];
	this.addChild(temp_sprite);
	this._drill_foreground_sprite = temp_sprite;
};


//==============================
// * E参数条 - 创建
//==============================
Drill_ESH_LifeSprite.prototype.drill_createMeter = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 生命条 贴图初始化
	if( s_data['hp_meter_enable'] == true &&	//（不显示，则不创建）
		s_data['hp_meter_id'] > 0 ){
	
		var hp_meter_id = s_data['hp_meter_id'];
		this._drill_hp_meterData = DrillUp.drill_COGM_getCopyedData( hp_meter_id -1 );
		this._drill_hp_meterData['level_max'] = 100;								//段上限
		this._drill_hp_meterData['x'] = s_data['hp_meter_x'];						//x
		this._drill_hp_meterData['y'] = s_data['hp_meter_y'];						//y
		this._drill_hp_meterData['anchor_x'] = 0.0;									//中心锚点x
		this._drill_hp_meterData['anchor_y'] = 0.0;									//中心锚点y
		this._drill_hp_meterData['filling_enable'] = false;							//关闭加满动画
		
		var temp_sprite = new Drill_COGM_MeterSprite( this._drill_hp_meterData );
		this.addChild( temp_sprite );
		this._drill_hp_meterSprite = temp_sprite;
	}
	
	// > 魔法条 贴图初始化
	if( s_data['mp_meter_enable'] == true &&	//（不显示，则不创建）
		s_data['mp_meter_id'] > 0 ){
			
		var mp_meter_id = s_data['mp_meter_id'];
		this._drill_mp_meterData = DrillUp.drill_COGM_getCopyedData( mp_meter_id -1 );
		this._drill_mp_meterData['level_max'] = 100;								//段上限
		this._drill_mp_meterData['x'] = s_data['mp_meter_x'];						//x
		this._drill_mp_meterData['y'] = s_data['mp_meter_y'];						//y
		this._drill_mp_meterData['anchor_x'] = 0.0;									//中心锚点x
		this._drill_mp_meterData['anchor_y'] = 0.0;									//中心锚点y
		this._drill_mp_meterData['filling_enable'] = false;							//关闭加满动画
		
		var temp_sprite = new Drill_COGM_MeterSprite( this._drill_mp_meterData );
		this.addChild( temp_sprite );
		this._drill_mp_meterSprite = temp_sprite;
	}
	
	// > 怒气条 贴图初始化
	if( s_data['tp_meter_enable'] == true &&	//（不显示，则不创建）
		s_data['tp_meter_id'] > 0 ){
			
		var tp_meter_id = s_data['tp_meter_id'];
		this._drill_tp_meterData = DrillUp.drill_COGM_getCopyedData( tp_meter_id -1 );
		this._drill_tp_meterData['level_max'] = 100;								//段上限
		this._drill_tp_meterData['x'] = s_data['tp_meter_x'];						//x
		this._drill_tp_meterData['y'] = s_data['tp_meter_y'];						//y
		this._drill_tp_meterData['anchor_x'] = 0.0;									//中心锚点x
		this._drill_tp_meterData['anchor_y'] = 0.0;									//中心锚点y
		this._drill_tp_meterData['filling_enable'] = false;							//关闭加满动画
		
		var temp_sprite = new Drill_COGM_MeterSprite( this._drill_tp_meterData );
		this.addChild( temp_sprite );
		this._drill_tp_meterSprite = temp_sprite;
	}
};
//==============================
// * E参数条 - 帧刷新
//==============================
Drill_ESH_LifeSprite.prototype.drill_updateMeterValue = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 敌方队员
	var enemy = this.drill_ESH_getEnemy();
	if( enemy != undefined ){
		
		// > 参数条 - 值
		if( this._drill_hp_meterSprite ){ this._drill_hp_meterSprite.drill_COGM_reflashValue( enemy._hp ); }
		if( this._drill_mp_meterSprite ){ this._drill_mp_meterSprite.drill_COGM_reflashValue( enemy._mp ); }
		if( this._drill_tp_meterSprite ){ this._drill_tp_meterSprite.drill_COGM_reflashValue( enemy._tp ); }
		// > 参数条 - 段上限
		if( this._drill_hp_meterSprite ){ this._drill_hp_meterSprite.drill_COGM_setLevelMax( enemy.mhp ); }
		if( this._drill_mp_meterSprite ){ this._drill_mp_meterSprite.drill_COGM_setLevelMax( enemy.mmp ); }
		if( this._drill_tp_meterSprite ){ this._drill_tp_meterSprite.drill_COGM_setLevelMax( enemy.maxTp() ); }
	}
	
	// > 我方队员
	var actor = this.drill_ESH_getActor();
	if( actor != undefined ){
		
		// > 参数条 - 值
		if( this._drill_hp_meterSprite ){ this._drill_hp_meterSprite.drill_COGM_reflashValue( actor._hp ); }
		if( this._drill_mp_meterSprite ){ this._drill_mp_meterSprite.drill_COGM_reflashValue( actor._mp ); }
		if( this._drill_tp_meterSprite ){ this._drill_tp_meterSprite.drill_COGM_reflashValue( actor._tp ); }
		// > 参数条 - 段上限
		if( this._drill_hp_meterSprite ){ this._drill_hp_meterSprite.drill_COGM_setLevelMax( actor.mhp ); }
		if( this._drill_mp_meterSprite ){ this._drill_mp_meterSprite.drill_COGM_setLevelMax( actor.mmp ); }
		if( this._drill_tp_meterSprite ){ this._drill_tp_meterSprite.drill_COGM_setLevelMax( actor.maxTp() ); }
	}
};


//==============================
// * F参数数字 - 创建
//==============================
Drill_ESH_LifeSprite.prototype.drill_createNumber = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 生命数字 贴图初始化
	if( s_data['hp_number_id'] > 0 ){		//（不显示，也要创建）
	
		var hp_number_id = s_data['hp_number_id'];
		this._drill_hp_numberData = DrillUp.drill_COGN_getCopyedData( hp_number_id -1 );
		this._drill_hp_numberData['x'] = s_data['hp_number_x'];							//x
		this._drill_hp_numberData['y'] = s_data['hp_number_y'];							//y
		this._drill_hp_numberData['visible'] = s_data['hp_number_enable'];				//显示情况
		this._drill_hp_numberData['specified_conditionNum'] = 100;						//额定值
		
		var temp_sprite = new Drill_COGN_NumberSprite( this._drill_hp_numberData );
		this.addChild( temp_sprite );
		this._drill_hp_numberSprite = temp_sprite;
	}
	
	// > 魔法数字 贴图初始化
	if( s_data['mp_number_id'] > 0 ){		//（不显示，也要创建）
			
		var mp_number_id = s_data['mp_number_id'];
		this._drill_mp_numberData = DrillUp.drill_COGN_getCopyedData( mp_number_id -1 );
		this._drill_mp_numberData['x'] = s_data['mp_number_x'];							//x
		this._drill_mp_numberData['y'] = s_data['mp_number_y'];							//y
		this._drill_mp_numberData['visible'] = s_data['mp_number_enable'];				//显示情况
		this._drill_mp_numberData['specified_conditionNum'] = 100;						//额定值
		
		var temp_sprite = new Drill_COGN_NumberSprite( this._drill_mp_numberData );
		this.addChild( temp_sprite );
		this._drill_mp_numberSprite = temp_sprite;
	}
	
	// > 怒气数字 贴图初始化
	if( s_data['tp_number_id'] > 0 ){		//（不显示，也要创建）
			
		var tp_number_id = s_data['tp_number_id'];
		this._drill_tp_numberData = DrillUp.drill_COGN_getCopyedData( tp_number_id -1 );
		this._drill_tp_numberData['x'] = s_data['tp_number_x'];							//x
		this._drill_tp_numberData['y'] = s_data['tp_number_y'];							//y
		this._drill_tp_numberData['visible'] = s_data['tp_number_enable'];				//显示情况
		this._drill_tp_numberData['specified_conditionNum'] = 100;						//额定值
		
		var temp_sprite = new Drill_COGN_NumberSprite( this._drill_tp_numberData );
		this.addChild( temp_sprite );
		this._drill_tp_numberSprite = temp_sprite;
	}
};
//==============================
// * F参数数字 - 帧刷新
//==============================
Drill_ESH_LifeSprite.prototype.drill_updateNumberValue = function() {
	var s_data = this.drill_ESH_getStyleData();
	var b_data = this.drill_ESH_getBean();
	
	// > 敌方队员
	var enemy = this.drill_ESH_getEnemy();
	if( enemy != undefined ){
		
		// > 参数数字 - 显示
		if( this._drill_hp_numberSprite ){ this._drill_hp_numberSprite.drill_COGN_setVisible( s_data['hp_number_enable'] ); }
		if( this._drill_mp_numberSprite ){ this._drill_mp_numberSprite.drill_COGN_setVisible( s_data['mp_number_enable'] ); }
		if( this._drill_tp_numberSprite ){ this._drill_tp_numberSprite.drill_COGN_setVisible( s_data['tp_number_enable'] ); }
		// > 参数数字 - 值
		if( this._drill_hp_numberSprite ){ this._drill_hp_numberSprite.drill_COGN_reflashValue( enemy._hp ); }
		if( this._drill_mp_numberSprite ){ this._drill_mp_numberSprite.drill_COGN_reflashValue( enemy._mp ); }
		if( this._drill_tp_numberSprite ){ this._drill_tp_numberSprite.drill_COGN_reflashValue( enemy._tp ); }
		// > 参数数字 - 额定值
		if( this._drill_hp_numberSprite ){ this._drill_hp_numberSprite.drill_COGN_setSpecifiedNum( enemy.mhp ); }
		if( this._drill_mp_numberSprite ){ this._drill_mp_numberSprite.drill_COGN_setSpecifiedNum( enemy.mmp ); }
		if( this._drill_tp_numberSprite ){ this._drill_tp_numberSprite.drill_COGN_setSpecifiedNum( enemy.maxTp() ); }
	}
	
	// > 我方队员
	var actor = this.drill_ESH_getActor();
	if( actor != undefined ){
		
		// > 参数数字 - 显示
		if( this._drill_hp_numberSprite ){ this._drill_hp_numberSprite.drill_COGN_setVisible( s_data['hp_number_enable'] ); }
		if( this._drill_mp_numberSprite ){ this._drill_mp_numberSprite.drill_COGN_setVisible( s_data['mp_number_enable'] ); }
		if( this._drill_tp_numberSprite ){ this._drill_tp_numberSprite.drill_COGN_setVisible( s_data['tp_number_enable'] ); }
		// > 参数数字 - 值
		if( this._drill_hp_numberSprite ){ this._drill_hp_numberSprite.drill_COGN_reflashValue( actor._hp ); }
		if( this._drill_mp_numberSprite ){ this._drill_mp_numberSprite.drill_COGN_reflashValue( actor._mp ); }
		if( this._drill_tp_numberSprite ){ this._drill_tp_numberSprite.drill_COGN_reflashValue( actor._tp ); }
		// > 参数数字 - 额定值
		if( this._drill_hp_numberSprite ){ this._drill_hp_numberSprite.drill_COGN_setSpecifiedNum( actor.mhp ); }
		if( this._drill_mp_numberSprite ){ this._drill_mp_numberSprite.drill_COGN_setSpecifiedNum( actor.mmp ); }
		if( this._drill_tp_numberSprite ){ this._drill_tp_numberSprite.drill_COGN_setSpecifiedNum( actor.maxTp() ); }
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EnemySimpleHud = false;
		var pluginTip = DrillUp.drill_ESH_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

