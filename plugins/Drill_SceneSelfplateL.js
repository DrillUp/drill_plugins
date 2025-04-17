//=============================================================================
// Drill_SceneSelfplateL.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        面板 - 全自定义信息面板L
 * @author Drill_up
 * 
 * @Drill_LE_param "内容-%d"
 * @Drill_LE_parentKey "---内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_SSpL_context_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_SceneSelfplateL +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全部自定义的信息面板L。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary   系统-窗口辅助核心★★v2.2及以上★★
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 *     必须基于该插件才能显示描述内容。（不含全局存储）
 *   - Drill_CoreOfSelectableButton  系统-按钮组核心★★v1.8及以上★★
 *     必须基于该插件才能使用按钮组。
 *   - Drill_LayerCommandThread      地图-多线程
 *     必须基于该插件才能使用公共事件触发。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面。
 * 2.该面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SSpL
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 3.若要开始上手设计，去看看 "18.面板 > 关于全自定义信息面板.docx"。
 * 结构：
 *   (1.插件包含：1个选项窗口 + 1个按钮组 + 1个文本描述窗口 + 1个描述图
 *      + 公共事件触发 - 不能全局存储
 *      选项窗口中，每个选项都会改变 描述图和描述窗口 的内容。
 *      该插件比面板I多了公共事件触发功能，但不能全局存储。
 *   (2.窗口的布局规划没有限制，去了解下 "17.主菜单 > 窗口与布局.docx"。
 * 窗口：
 *   (1.如果你只要一个单独的描述窗口：
 *      设置一个选项，然后把选项窗口设置y1000看不见即可。
 *   (2.如果你要做像任务激活那种形式：
 *      设置两个选项，一个激活，一个未激活（灰色），
 *      通过插件指令显示/隐藏两个按钮,只显示一个,使其看起来像一个选项。
 *   (3.注意，信息面板具有当前页记忆，如果你修改了一些选项，你需要用插
 *      件指令设置一下当前选中选项。
 * 公共事件触发：
 *   (1.由于需要支持公共事件的触发，所以放弃了全局存储的功能。
 *      选择一个按钮之后，将会返回到地图界面，并执行对应的公共事件。
 *   (2.公共事件优先以"执行的公共事件"为准。
 *      当"执行的公共事件"为0时，则按"执行对应变量的公共事件"执行。
 *      如果两个都为0，则不执行任何公共事件。
 * 内容：
 *   (1.每个对应的描述内容，都能设置行高、居中等设置。
 *   (2.选项窗口和描述窗口支持下列字符：
 *       \c[n] 变颜色    \i[n] 显示图标    \{\} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      除了这些，其他的如 表达式、指代字符、效果字符 也都支持，
 *      你可以去看看文档 "23.窗口字符 > 关于窗口字符.docx" 。
 * 内容锁定：
 *   (1.你可以将某个内容锁定，锁定项将会只显示锁定信息。
 *      但注意前提是选项没有被隐藏。
 *   (2.内容锁定时，可以选择锁定内容或描述图。
 *      如果你想让锁定时描述图不显示，可以配置空的锁定图片。
 * 设计：
 *   (1.信息面板L选择后会在地图中执行公共事件，因此在示例中
 *      可作为一种锦囊切换的面板来使用。
 *      除此之外，你还可以用于执行 属性加点、能力使用、执行
 *      特殊技能 等简易功能。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__self （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__self文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 资源-整体布局           （默认为 信息面板L-整体布局）
 * 资源-锁定的描述图       （默认为 信息面板L-锁定描述图）
 * 选项窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 描述窗口布局 资源-贴图  （默认为 单张背景贴图 - 背景贴图）
 * 
 * 内容1 资源-描述图片     （默认为 空）
 * 内容2 资源-描述图片     （默认为 空）
 * 内容3 资源-描述图片     （默认为 空）
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义信息面板，使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>信息面板L : 打开面板
 *
 * 插件指令：>信息面板L : 显示选项 : 选项[1]
 * 插件指令：>信息面板L : 显示选项 : 选项变量[21]
 * 插件指令：>信息面板L : 隐藏选项 : 选项[1]
 * 插件指令：>信息面板L : 隐藏选项 : 选项变量[21]
 * 插件指令：>信息面板L : 显示全部选项
 * 插件指令：>信息面板L : 隐藏全部选项
 * 
 * 插件指令：>信息面板L : 锁定选项 : 选项[1]
 * 插件指令：>信息面板L : 锁定选项 : 选项变量[21]
 * 插件指令：>信息面板L : 解锁选项 : 选项[1]
 * 插件指令：>信息面板L : 解锁选项 : 选项变量[21]
 * 插件指令：>信息面板L : 锁定全部选项
 * 插件指令：>信息面板L : 解锁全部选项
 *
 * 1.面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 选中选项
 * 你可以控制选项窗口当前选中第N页。（选项有3个，表示有3页）
 * 
 * 插件指令：>信息面板L : 选中选项 : 选项[1]
 * 插件指令：>信息面板L : 选中选项 : 选项变量[21]
 * 
 * 1.信息面板具有当前选项的记忆，如果你修改了一些选项，你需要用该指令
 *   设置一下当前选中的选项。
 * 2.不存在第0页，如果选中选项大于页数，将选择最末尾的页。
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
 * 时间复杂度： o(n^2)*o(场景元素) 每帧
 * 测试方法：   直接进入该信息面板进行测试。
 * 测试结果：   在菜单界面中，基本元素消耗为：【9.41ms】
 *              在地图界面中，执行公共事件消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件为一个界面，在该插件的界面中，地图界面、战斗界面处于完全
 *   暂停状态，所以该界面占用的图形资源、计算资源充足，消耗也低。
 * 3.该界面中的元素数量有限，消耗也上不去。暂无与消耗相关的线性关系量。
 *   （地图的线性关系量：事件，因为50/100/200事件对于消耗影响较大。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了drill指针的控制。
 * [v1.2]
 * 优化了全局存储的结构，减小了存储的数据容量。
 * 修复了设置 按钮贴图序列 时无效的bug。
 * [v1.3]
 * 添加了 变量对应调用公共事件 的功能。
 * [v1.4]
 * 修复了按钮组模式时，点击按钮无效的bug。
 * [v1.5]
 * 修复了锁定选项后，点击却仍然可以执行选项的bug。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 * [v1.7]
 * 优化了插件指令。
 * [v1.8]
 * 添加了窗口选项的未读功能。
 * 更新并兼容了新的窗口字符底层。
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 信息面板L-整体布局
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 是否添加到主菜单
 * @parent ----杂项----
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default false
 *
 * @param 主菜单显示名
 * @parent 是否添加到主菜单
 * @desc 主菜单显示的选项名。
 * @default 信息面板L
 * 
 * 
 * @param ----锁定内容----
 * @default 
 *
 * @param 内容锁定方式
 * @parent ----锁定内容----
 * @type select
 * @option 锁定描述图和描述内容
 * @value 锁定描述图和描述内容
 * @option 只锁定描述图
 * @value 只锁定描述图
 * @option 只锁定描述内容
 * @value 只锁定描述内容
 * @desc 内容锁定的方式。
 * @default 锁定描述图和描述内容
 *
 * @param 用语-锁定的选项名
 * @parent ----锁定内容----
 * @desc 选项被锁定时，信息面板显示的选项名。
 * @default \c[7]---未知---
 *
 * @param 用语-锁定的选项内容
 * @parent ----锁定内容----
 * @type note
 * @desc 选项被锁定时，信息面板显示的内容。
 * @default "该内容的描述已被隐藏。"
 *
 * @param 资源-锁定的描述图
 * @parent ----锁定内容----
 * @desc 选项被锁定时，信息面板显示的描述图。
 * @default 信息面板L-锁定描述图
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * 
 * @param ----选项----
 * @desc
 *
 * @param 选项模式
 * @parent ----选项----
 * @type select
 * @option 按钮组模式
 * @value 按钮组模式
 * @option 窗口模式
 * @value 窗口模式
 * @desc 选项的模式。
 * @default 窗口模式
 * 
 * @param 选项按钮组
 * @parent ----选项----
 * @desc 选项模式为 按钮组模式 时，选项按钮组的配置数据。
 * @type struct<DrillCommandButton>
 * @default {"平移-按钮组 X":"80","平移-按钮组 Y":"30","按钮组样式":"5","---按钮贴图---":"","默认按钮贴图":"信息面板L-默认按钮","按钮贴图序列":"[]"}
 * 
 * @param 选项窗口
 * @parent ----选项----
 * @desc 选项模式为 窗口模式 时，选项窗口的配置数据。
 * @type struct<DrillSelectWindow>
 * @default {"选项窗口 X":"50","选项窗口 Y":"50","选项窗口宽度":"700","选项窗口高度":"520","选项窗口列数":"1","每条选项高度":"120","选项窗口对齐方式":"左对齐","选项窗口字体大小":"22","选项窗口移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"30\",\"移动延迟\":\"0\",\"---起点---\":\"\",\"坐标类型\":\"相对坐标\",\"起点-相对坐标 X\":\"-100\",\"起点-相对坐标 Y\":\"0\",\"起点-绝对坐标 X\":\"0\",\"起点-绝对坐标 Y\":\"0\"}","选项窗口布局":"{\"布局类型\":\"默认皮肤\",\"---单张背景贴图---\":\"\",\"资源-贴图\":\"信息面板L-选项窗口\",\"贴图位置修正 X\":\"0\",\"贴图位置修正 Y\":\"0\"}"}
 * 
 * 
 * @param ----未读提示----
 * @default 
 *
 * @param 是否启用未读提示
 * @parent ----未读提示----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。未读提示只在选项窗口中有效。
 * @default true
 *
 * @param 未读提示字体大小
 * @parent ----未读提示----
 * @type number
 * @min 0
 * @desc 未读提示的字体大小。
 * @default 18
 *
 * @param 未读提示是否放右下角
 * @parent ----未读提示----
 * @type boolean
 * @on 放右下角
 * @off 默认左上角
 * @desc true - 放右下角，false - 默认左上角
 * @default true
 * 
 * @param 用语-未读提示信息
 * @parent ----未读提示----
 * @type note
 * @desc 未读提示的文本内容，可以使用各种窗口字符。
 * @default "\\c[6]新"
 * 
 * 
 * @param ----描述窗口----
 * @default 
 * 
 * @param 描述窗口 X
 * @parent ----描述窗口----
 * @desc 描述窗口的位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 285
 *
 * @param 描述窗口 Y
 * @parent ----描述窗口----
 * @desc 描述窗口的位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 100
 *
 * @param 描述窗口宽度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 510
 *
 * @param 描述窗口高度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 360
 *
 * @param 描述窗口字体大小
 * @parent ----描述窗口----
 * @type number
 * @min 1
 * @desc 描述窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 描述窗口移动动画
 * @parent ----描述窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"100","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 描述窗口布局
 * @parent ----描述窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"信息面板L-描述窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 是否重播描述窗口移动动画
 * @parent ----描述窗口----
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播。切换选项时，重播描述窗口的移动动画。
 * @default true
 * 
 * 
 * @param ----描述图----
 * @default 
 * 
 * @param 描述图 X
 * @parent ----描述图----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 285
 *
 * @param 描述图 Y
 * @parent ----描述图----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 480
 * 
 * @param 描述图移动动画
 * @parent ----描述图----
 * @type struct<DrillWindowMoving>
 * @desc 描述图会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"100","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param 是否重播描述图移动动画
 * @parent ----描述图----
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播。切换选项时，重播描述图的移动动画。
 * @default true
 * 
 * @param 是否瞬间显示描述图
 * @parent ----描述图----
 * @type boolean
 * @on 瞬间显示
 * @off 渐变出现
 * @desc true - 瞬间显示，false - 渐变出现。
 * @default false
 *
 *
 * @param ----内容----
 * @default 
 *
 * @param ---内容组 1至20---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-1
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-2
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-3
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-4
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-5
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-6
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-7
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-8
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-9
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-10
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-11
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-12
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-13
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-14
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-15
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-16
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-17
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-18
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-19
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-20
 * @parent ---内容组 1至20---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组21至40---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-21
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-22
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-23
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-24
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-25
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-26
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-27
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-28
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-29
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-30
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-31
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-32
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-33
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-34
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-35
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-36
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-37
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-38
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-39
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-40
 * @parent ---内容组21至40---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组41至60---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-41
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-42
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-43
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-44
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-45
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-46
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-47
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-48
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-49
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-50
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-51
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-52
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-53
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-54
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-55
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-56
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-57
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-58
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-59
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-60
 * @parent ---内容组41至60---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组61至80---
 * @parent ----内容----
 * @default 
 *
 * @param 内容-61
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-62
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-63
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-64
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-65
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-66
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-67
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-68
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-69
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-70
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-71
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-72
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-73
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-74
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-75
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-76
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-77
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-78
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-79
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-80
 * @parent ---内容组61至80---
 * @type struct<DrillSSpL>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 */
/*~struct~DrillSSpL:
 * 
 * @param 选项名
 * @desc 当前的选项名字。
 * @default 未命名选项
 * 
 * 
 * @param ---选项内容---
 * @default 
 *
 * @param 是否初始显示
 * @parent ---选项内容---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 是否初始锁定
 * @parent ---选项内容---
 * @type boolean
 * @on 锁定
 * @off 解锁
 * @desc true - 锁定，false - 解锁
 * @default false
 * 
 * @param 选项内容
 * @parent ---选项内容---
 * @type note
 * @desc 每个选项显示的长文本内容。（只有窗口模式有效，且需要启用 选项内容 。）
 * @default "长文本选项描述"
 * 
 * 
 * @param ---描述内容---
 * @default 
 *
 * @param 资源-描述图片
 * @parent ---描述内容---
 * @desc 该选项下的显示的描述图片。
 * @default 
 * @require 1
 * @dir img/Menu__self/
 * @type file
 * 
 * @param 描述内容
 * @parent ---描述内容---
 * @type note
 * @desc 该选项下的描述窗口显示的内容。
 * @default "没有描述"
 *
 * @param 描述内容对齐方式
 * @parent ---描述内容---
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 文本的对齐方式。
 * @default 左对齐
 *
 * @param 行高控制模式
 * @parent ---描述内容---
 * @type select
 * @option 默认补正
 * @value 默认补正
 * @option 自定义补正
 * @value 自定义补正
 * @option 锁定行高
 * @value 锁定行高
 * @option 关闭行高控制
 * @value 关闭行高控制
 * @desc 行高的控制模式。你也可以关闭行高控制，用窗口字符来修改行高设置。
 * @default 自定义补正
 *
 * @param 自定义补正值
 * @parent 行高控制模式
 * @type number
 * @min 0
 * @desc 行高控制模式为"自定义补正"时，每行文本的行高补正值。（默认补正为36，因为默认字体就为28，所以补正值大）
 * @default 30
 *
 * @param 锁定行高值
 * @parent 行高控制模式
 * @type number
 * @min 0
 * @desc 行高控制模式为"锁定行高"时，锁定的行高值。
 * @default 30
 * 
 * 
 * @param ---选项功能---
 * @default 
 * 
 * @param 执行的脚本
 * @parent ---选项功能---
 * @type note
 * @desc 该选项按下后执行的脚本。
 * @default ""
 * 
 * @param 是否执行公共事件
 * @parent ---选项功能---
 * @type boolean
 * @on 执行
 * @off 不执行
 * @desc true - 执行，false - 不执行。执行公共事件会必然离开菜单界面，因为菜单界面中游戏是暂停状态。
 * @default false
 * 
 * @param 执行的公共事件
 * @parent 是否执行公共事件
 * @type common_event
 * @desc 按钮按下后执行的公共事件。执行公共事件会必然离开菜单界面，因为菜单界面中游戏是暂停状态。
 * @default 0
 * 
 * @param 执行对应变量的公共事件
 * @parent 是否执行公共事件
 * @type common_event
 * @desc 按钮按下后执行的该变量对应到的那个公共事件id。执行公共事件会必然离开菜单界面，因为菜单界面中游戏是暂停状态。
 * @default 0
 *
 * @param 公共事件执行方式
 * @parent 是否执行公共事件
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。
 * @default 串行
 *
 *
 */
/*~struct~DrillWindowMoving:
 *
 * @param 移动类型
 * @type select
 * @option 不移动
 * @value 不移动
 * @option 匀速移动
 * @value 匀速移动
 * @option 增减速移动
 * @value 增减速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "32.数学模型 > 关于弹道.docx"。
 * @default 匀速移动
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param ---起点---
 * @default 
 *
 * @param 坐标类型
 * @parent ---起点---
 * @type select
 * @option 相对坐标
 * @value 相对坐标
 * @option 绝对坐标
 * @value 绝对坐标
 * @desc 起点的坐标类型。
 * @default 相对坐标
 *
 * @param 起点-相对坐标 X
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 100
 * 
 * @param 起点-相对坐标 Y
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 X
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最左边，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 Y
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最上面，单位像素。
 * @default 0
 * 
 */
/*~struct~DrillWindowLayout:
 *
 * @param 布局类型
 * @type select
 * @option 默认皮肤
 * @value 默认皮肤
 * @option 单张背景贴图
 * @value 单张背景贴图
 * @option 隐藏布局
 * @value 隐藏布局
 * @desc 窗口布局的类型。
 * @default 单张背景贴图
 *
 * @param ---单张背景贴图---
 * @default 
 *
 * @param 资源-贴图
 * @parent ---单张背景贴图---
 * @desc 窗口的背景贴图的资源。
 * @default 背景贴图
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 贴图位置修正 X
 * @parent ---单张背景贴图---
 * @desc 修正图片的位置用。以窗口的点为基准，负数向右，正数向左，单位像素。
 * @default 0
 *
 * @param 贴图位置修正 Y
 * @parent ---单张背景贴图---
 * @desc 修正图片的位置用。以窗口的点为基准，负数向上，正数向下，单位像素。
 * @default 0
 *
 *
 */
/*~struct~DrillSelectWindow:
 * 
 * @param 选项窗口 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 50
 *
 * @param 选项窗口 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 50
 *
 * @param 选项窗口宽度
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 700
 *
 * @param 选项窗口高度
 * @type number
 * @min 50
 * @desc 窗口的高宽设置。注意，实际文本域的高宽要比该设置小一些，因为有内边距。具体去看看 "17.主菜单 > 窗口与布局.docx"。
 * @default 520
 *
 * @param 选项窗口列数
 * @type number
 * @min 1
 * @desc 选项窗口的列数。
 * @default 1
 *
 * @param 每条选项高度
 * @type number
 * @min 1
 * @desc 每条选项的高度。（宽度无法调整，宽度固定根据 列数和窗口宽度 自适应。）
 * @default 120
 * 
 * @param 是否启用选项内容
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，每条选项将会显示长文本的选项内容。
 * @default false
 * 
 * @param 选项窗口对齐方式
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 选项文本的对齐方式。
 * @default 居中
 *
 * @param 选项窗口字体大小
 * @type number
 * @min 1
 * @desc 选项窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 * 
 * @param 选项窗口移动动画
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"-100","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 *
 * @param 选项窗口布局
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"单张背景贴图","---单张背景贴图---":"","资源-贴图":"信息面板L-选项窗口","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 * 
 * @param 选项窗口指针与边框
 * @type struct<DrillCursor>
 * @desc 窗口的指针设置与选项边框设置。
 * @default {}
 * 
 * 
 */
/*~struct~DrillCursor:
 *
 * @param ---drill插件---
 * @default 
 * 
 * @param 是否启用菜单指针
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，菜单指针可以指向你当前选中的项。需要Drill_MenuCursor插件支持。
 * @default true
 * 
 * @param 是否锁定菜单指针样式
 * @parent 是否启用菜单指针
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定，窗口可以指定一个指针样式来装饰。需要Drill_MenuCursor插件支持。
 * @default false
 * 
 * @param 锁定的菜单指针样式
 * @parent 是否启用菜单指针
 * @type number
 * @min 1
 * @desc 锁定时，指定的指针样式id，具体见Drill_MenuCursor插件中对应的配置。
 * @default 1
 * 
 * @param 是否启用闪烁白矩形
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，你可以开关默认选项的白色闪烁矩形。需要Drill_MenuCursorBorder插件支持。
 * @default true
 * 
 * @param 是否启用菜单边框
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，菜单选项边框装饰当前选中的矩形项。需要Drill_MenuCursorBorder插件支持。
 * @default true
 * 
 * @param 是否锁定菜单边框样式
 * @parent 是否启用菜单边框
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定，窗口可以指定一个选项边框样式来装饰。需要Drill_MenuCursorBorder插件支持。
 * @default false
 * 
 * @param 锁定的菜单边框样式
 * @parent 是否启用菜单边框
 * @type number
 * @min 1
 * @desc 锁定时，指定的矩形边框样式id，具体见Drill_MenuCursorBorder插件中对应的配置。
 * @default 1
 * 
 * @param 是否启用滚动条
 * @parent ---drill插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，你可以关闭装饰当前窗口的菜单滚动条。需要Drill_MenuScrollBar插件支持。
 * @default true
 * 
 * @param 是否锁定滚动条样式
 * @parent 是否启用滚动条
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定，窗口可以指定一个滚动条样式来装饰。需要Drill_MenuScrollBar插件支持。
 * @default false
 * 
 * @param 锁定的滚动条样式
 * @parent 是否启用滚动条
 * @type number
 * @min 1
 * @desc 锁定时，指定的滚动条样式id，具体见Drill_MenuScrollBar插件中对应的配置。
 * @default 1
 *
 * @param ---mog插件---
 * @default 
 * 
 * @param 是否启用mog菜单指针
 * @parent ---mog插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，使用 MOG_MenuCursor 菜单指针插件（旧插件），可以装饰选项窗口，你也可以关闭装饰。
 * @default true
 * 
 * @param 是否启用mog菜单边框
 * @parent ---mog插件---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，使用 MOG_CursorBorder 菜单边框插件（旧插件），可以装饰选项窗口，你也可以关闭装饰。
 * @default true
 *
 */
/*~struct~DrillCommandButton:
 * 
 * @param 平移-按钮组 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 80
 * 
 * @param 平移-按钮组 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 30
 * 
 * @param 按钮组样式
 * @type number
 * @min 0
 * @desc 按钮组对应的样式配置，对应 按钮组核心 的样式id。
 * @default 1
 * 
 * @param ---按钮贴图---
 * @desc 
 * 
 * @param 默认按钮贴图
 * @parent ---按钮贴图---
 * @desc 默认按钮的图片资源。
 * @default 信息面板L-默认按钮
 * @require 1
 * @dir img/Menu__self/
 * @type file
 *
 * @param 按钮贴图序列
 * @parent ---按钮贴图---
 * @desc 自定义按钮的图片资源，对应每个内容编号。
 * @default []
 * @require 1
 * @dir img/Menu__self/
 * @type file[]
 * 
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SSpL（Scene_Selfplate_A）
//		临时全局变量	DrillUp.g_SSpL_xxx
//		临时局部变量	this._drill_SSpL_xxx
//		存储数据变量	$gameSystem._drill_SSpL_context_list
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(场景元素) 每帧
//		★性能测试因素	直接进入信息面板进行测试。
//		★性能测试消耗	7.41ms
//		★最坏情况		无
//		★备注			本来以为反复绘制可能会影响性能，结果直接接近60帧的流畅。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			x->☆全局存储
//			->☆存储数据
//			->☆插件指令
//			
//			->☆主菜单选项
//			x->☆标题选项
//			->☆面板控制
//			
//			->信息面板L【Scene_Drill_SSpL】
//				->A主体
//				->B选项窗口
//					->选项按钮组
//					->公共事件触发
//				->C描述窗口
//				->D描述图片
//				->E流程
//				->☆原型链规范（Scene_Drill_SSpL）
//			
//			->选项窗口【Drill_SSpL_SelectWindow】
//				->G子项（覆写）
//				->2A选中
//				->2B绘制选项
//				->2C已读情况
//				->2D兼容
//			->显示窗口【Drill_SSpL_DescWindow】
//				->窗口行高
//				->对齐方式
//				->绘制文本
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 信息面板L【Scene_Drill_SSpL】
//			* 选项窗口【Drill_SSpL_SelectWindow】
//			* 显示窗口【Drill_SSpL_DescWindow】
//		
//		★必要注意事项：
//			1.替换以下字符变成新面板：
//				SSpL
//				信息面板L
//				Drill_SceneSelfplateL
//
//		★其它说明细节：
//			1.【全局和存档两种数据都有保存，开关只用于切换显示哪种数据】。
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
	DrillUp.g_SSpL_PluginTip_curName = "Drill_SceneSelfplateL.js 面板-全自定义信息面板L";
	DrillUp.g_SSpL_PluginTip_baseList = [
		"Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心",
		"Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心",
		"Drill_CoreOfSelectableButton.js 系统-按钮组核心",
		"Drill_LayerCommandThread.js 地图-多线程"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_SSpL_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_SSpL_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_SSpL_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_SSpL_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_SSpL_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 缺少插件
	//==============================
	DrillUp.drill_SSpL_getPluginTip_NoSupportPlugin = function( option_name ){
		return "【" + DrillUp.g_SSpL_PluginTip_curName + "】\n选项'" + option_name + "'执行公共事件时，缺少基础插件 Drill_LayerCommandThread 地图-多线程。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_SSpL_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_SSpL_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_SceneSelfplateL = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_SceneSelfplateL');
	
	
	//==============================
	// * 静态数据 - 指针与边框
	//				（~struct~DrillCursor）
	//==============================
	DrillUp.drill_SSpL_initMenuCursor = function( dataFrom ) {
		var data = {};
		
		data['mog_enabled'] = String( dataFrom["是否启用mog菜单指针"] || "true") == "true";
		data['mog_borderEnabled'] = String( dataFrom["是否启用mog菜单边框"] || "true") == "true";
		
		data['MCu_enabled'] = String( dataFrom["是否启用菜单指针"] || "true") == "true";
		data['MCu_lock'] = String( dataFrom["是否锁定菜单指针样式"] || "false") == "true";
		data['MCu_style'] = Number( dataFrom["锁定的菜单指针样式"] || 1);
		
		data['MCB_rectEnabled'] = String( dataFrom["是否启用闪烁白矩形"] || "true") == "true";
		data['MCB_enabled'] = String( dataFrom["是否启用菜单边框"] || "true") == "true";
		data['MCB_lock'] = String( dataFrom["是否锁定菜单边框样式"] || "false") == "true";
		data['MCB_style'] = Number( dataFrom["锁定的菜单边框样式"] || 1);
		
		data['MSB_enabled'] = String( dataFrom["是否启用滚动条"] || "true") == "true";
		data['MSB_lock'] = String( dataFrom["是否锁定滚动条样式"] || "false") == "true";
		data['MSB_style'] = Number( dataFrom["锁定的滚动条样式"] || 1);
		
		return data;
	}
	//==============================
	// * 静态数据 - 选项窗口参数
	//				（~struct~DrillSelectWindow）
	//==============================
	DrillUp.drill_SSpL_initCommandWindow = function( dataFrom ) {
		var data = {};
		data['x'] = Number( dataFrom["选项窗口 X"] || 0);
		data['y'] = Number( dataFrom["选项窗口 Y"] || 0);
		data['width'] = Number( dataFrom["选项窗口宽度"] || 100);
		data['height'] = Number( dataFrom["选项窗口高度"] || 100);
		data['col'] = Number( dataFrom["选项窗口列数"] || 1);
		data['itemHeight'] = Number( dataFrom["每条选项高度"] || 36);
		data['nameExEnabled'] = String( dataFrom["是否启用选项内容"] || "false") == "true";
		data['align'] = String( dataFrom["选项窗口对齐方式"] || "左对齐");
		data['fontsize'] = Number( dataFrom["选项窗口字体大小"] || 22);
		if( dataFrom["选项窗口移动动画"] != "" &&
			dataFrom["选项窗口移动动画"] != undefined ){
			var slideAnim = JSON.parse( dataFrom["选项窗口移动动画"] );
			data['slideMoveType'] = String( slideAnim["移动类型"] || "匀速移动");
			data['slideTime'] = Number( slideAnim["移动时长"] || 20);
			data['slideDelay'] = Number( slideAnim["移动延迟"] || 0);
			data['slidePosType'] = String( slideAnim["坐标类型"] || "相对坐标");
			data['slideX'] = Number( slideAnim["起点-相对坐标 X"] || -100);
			data['slideY'] = Number( slideAnim["起点-相对坐标 Y"] || 0);
			data['slideAbsoluteX'] = Number( slideAnim["起点-绝对坐标 X"] || 0);
			data['slideAbsoluteY'] = Number( slideAnim["起点-绝对坐标 Y"] || 0);
		}
		if( dataFrom["选项窗口布局"] != "" &&
			dataFrom["选项窗口布局"] != undefined ){
			var layout = JSON.parse( dataFrom["选项窗口布局"] );
			data['layoutType'] = String( layout["布局类型"] || "默认皮肤");
			data['layoutSrc'] = String( layout["资源-贴图"] || "");
			data['layoutSrcFile'] = "img/Menu__self/";
			data['layoutX'] = Number( layout["贴图位置修正 X"] || -100);
			data['layoutY'] = Number( layout["贴图位置修正 Y"] || 0);
		}
		if( dataFrom["选项窗口指针与边框"] != "" &&
			dataFrom["选项窗口指针与边框"] != undefined ){
			var cursor = JSON.parse( dataFrom["选项窗口指针与边框"] );
			data['cursor'] = DrillUp.drill_SSpL_initMenuCursor( cursor );
		}else{
			data['cursor'] = DrillUp.drill_SSpL_initMenuCursor( {} );
		}
		return data;
	}
	//==============================
	// * 静态数据 - 选项按钮组
	//				（~struct~DrillCommandButton）
	//==============================
	DrillUp.drill_SSpL_initCommandButton = function( dataFrom ) {
		var data = {};
		data['style_id'] = Number( dataFrom["按钮组样式"] || 0);
		
		// > 按钮组 - A主体
		data['x'] = Number( dataFrom["平移-按钮组 X"] || 0);
		data['y'] = Number( dataFrom["平移-按钮组 Y"] || 0);
		
		// > 按钮组 - B父窗口
		data['btn_constructor'] = "Window_Selectable";
		
		// > 按钮组 - B父窗口（资源）
		data['btn_src_default'] = String( dataFrom["默认按钮贴图"] || "");
		data['btn_src_file'] = "img/Menu__self/";
		if( dataFrom["按钮贴图序列"] != "" &&
			dataFrom["按钮贴图序列"] != undefined ){
			data['btn_src'] = JSON.parse( dataFrom["按钮贴图序列"] );
		}else{
			data['btn_src'] = [];
		}
		data['btn_srcKeyword'] = [];
		
		// > 按钮组 - F激活
		data['active_enableMouseOk'] = true;	//（鼠标ok点击 开启）
		
		return data;
	}
	//==============================
	// * 静态数据 - 内容
	//				（~struct~DrillSSpL）
	//==============================
	DrillUp.drill_SSpL_initContext = function( dataFrom ) {
		var data = {};
		
		// > 选项名处理
		var temp = String(dataFrom['选项名']);
		temp = temp.replace(/\\\\/g,"\\");	//（为了支持\\n的写法）
		data['name'] = temp;
		
		// > 选项内容处理
		if( dataFrom["选项内容"] != "" &&
			dataFrom["选项内容"] != undefined ){
			data['nameEx'] = JSON.parse( dataFrom["选项内容"] );
		}else{
			data['nameEx'] = "";
		}
		
		// > 显示情况
		data['enabled'] = (dataFrom['是否初始显示'] || "false") == "true" ;
		
		// > 锁定情况
		data['locked'] = (dataFrom['是否初始锁定'] || "false") == "true" ;
		
		// > 已读情况
		data['watched'] = false;
		
		// > 描述图片处理
		data['pic'] = (dataFrom['资源-描述图片'] || "");
		
		// > 描述内容处理
		if( dataFrom["描述内容"] != "" &&
			dataFrom["描述内容"] != undefined ){
			data['context'] = JSON.parse( dataFrom["描述内容"] );
		}else{
			data['context'] = "";
		}
		data['context_align'] = String(dataFrom["描述内容对齐方式"] || "左对齐");
		data['context_lineheight_type'] = String(DrillUp.parameters["行高控制模式"] || "默认补正");
		data['context_lineheight_custom'] = Number(DrillUp.parameters["自定义补正值"] || 30);
		data['context_lineheight_lock'] = Number(DrillUp.parameters["锁定行高值"] || 30);
		
		// > 选项功能
		data['script'] = String(dataFrom['执行的脚本'] || "");
		data['commonEventEnable'] = String(dataFrom['是否执行公共事件'] || "false") == "true";
		data['commonEventId'] = Number(dataFrom['执行的公共事件'] || 0);
		data['commonEventVarId'] = Number(dataFrom['执行对应变量的公共事件'] || 0);
		data['pipeType'] = String(dataFrom['公共事件执行方式'] || "串行");
		
		return data;
	}

	/*-----------------杂项------------------*/
    DrillUp.g_SSpL_layout = String(DrillUp.parameters['资源-整体布局'] || "");
	DrillUp.g_SSpL_add_to_menu = String(DrillUp.parameters['是否添加到主菜单'] || "true") === "true";	
    DrillUp.g_SSpL_menu_name = String(DrillUp.parameters['主菜单显示名'] || "");
	DrillUp.g_SSpL_title_data_global = false;	
	
	/*-----------------选项------------------*/
	DrillUp.g_SSpL_command_mode = String(DrillUp.parameters["选项模式"] || "按钮组模式");
	if( DrillUp.parameters["选项窗口"] != undefined &&
		DrillUp.parameters["选项窗口"] != "" ){
		var data = JSON.parse( DrillUp.parameters["选项窗口"] );
		DrillUp.g_SSpL_command_window = DrillUp.drill_SSpL_initCommandWindow( data );
	}else{
		DrillUp.g_SSpL_command_window = DrillUp.drill_SSpL_initCommandWindow( {} );
	}
	if( DrillUp.parameters["选项按钮组"] != undefined &&
		DrillUp.parameters["选项按钮组"] != "" ){
		var data = JSON.parse( DrillUp.parameters["选项按钮组"] );
		DrillUp.g_SSpL_command_button = DrillUp.drill_SSpL_initCommandButton( data );
	}else{
		DrillUp.g_SSpL_command_button = DrillUp.drill_SSpL_initCommandButton( {} );
	}

	/*-----------------描述窗口------------------*/
	DrillUp.g_SSpL_descWin_x = Number(DrillUp.parameters['描述窗口 X'] || 285);
	DrillUp.g_SSpL_descWin_y = Number(DrillUp.parameters['描述窗口 Y'] || 100);
	DrillUp.g_SSpL_descWin_width = Number(DrillUp.parameters['描述窗口宽度'] || 510);
	DrillUp.g_SSpL_descWin_height = Number(DrillUp.parameters['描述窗口高度'] || 360);
	DrillUp.g_SSpL_descWin_fontsize = Number(DrillUp.parameters['描述窗口字体大小'] || 22);
	DrillUp.g_SSpL_descWin_replay = String(DrillUp.parameters['是否重播描述窗口移动动画'] || "true") === "true";	
	if( DrillUp.parameters['描述窗口移动动画'] != undefined ){
		DrillUp.g_SSpL_descWin_slideAnim = JSON.parse( DrillUp.parameters['描述窗口移动动画'] );
		DrillUp.g_SSpL_descWin_slideAnim['slideMoveType'] = String(DrillUp.g_SSpL_descWin_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpL_descWin_slideAnim['slideTime'] = Number(DrillUp.g_SSpL_descWin_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpL_descWin_slideAnim['slideDelay'] = Number(DrillUp.g_SSpL_descWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpL_descWin_slideAnim['slidePosType'] = String(DrillUp.g_SSpL_descWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpL_descWin_slideAnim['slideX'] = Number(DrillUp.g_SSpL_descWin_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpL_descWin_slideAnim['slideY'] = Number(DrillUp.g_SSpL_descWin_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpL_descWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpL_descWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpL_descWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpL_descWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpL_descWin_slideAnim = {};
	}
	if( DrillUp.parameters['描述窗口布局'] != undefined ){
		DrillUp.g_SSpL_descWin_layout = JSON.parse( DrillUp.parameters['描述窗口布局'] );
		DrillUp.g_SSpL_descWin_layout['layoutType'] = String(DrillUp.g_SSpL_descWin_layout['布局类型'] || "默认皮肤");
		DrillUp.g_SSpL_descWin_layout['layoutSrc'] = String(DrillUp.g_SSpL_descWin_layout['资源-贴图'] || "");
		DrillUp.g_SSpL_descWin_layout['layoutSrcFile'] = "img/Menu__self/";
		DrillUp.g_SSpL_descWin_layout['layoutX'] = Number(DrillUp.g_SSpL_descWin_layout['贴图位置修正 X'] || -100);
		DrillUp.g_SSpL_descWin_layout['layoutY'] = Number(DrillUp.g_SSpL_descWin_layout['贴图位置修正 Y'] || 0);
	}else{
		DrillUp.g_SSpL_descWin_layout = {};
	}

	/*-----------------描述图------------------*/
	DrillUp.g_SSpL_descPic_x = Number(DrillUp.parameters['描述图 X'] || 285);
	DrillUp.g_SSpL_descPic_y = Number(DrillUp.parameters['描述图 Y'] || 480);
	DrillUp.g_SSpL_descPic_replay = String(DrillUp.parameters['是否重播描述图移动动画'] || "true") === "true";	
	DrillUp.g_SSpL_descPic_showInstant = String(DrillUp.parameters['是否瞬间显示描述图'] || "false") === "true";	
	if( DrillUp.parameters['描述图移动动画'] != undefined ){
		DrillUp.g_SSpL_descPic_slideAnim = JSON.parse( DrillUp.parameters['描述图移动动画'] );
		DrillUp.g_SSpL_descPic_slideAnim['slideMoveType'] = String(DrillUp.g_SSpL_descPic_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_SSpL_descPic_slideAnim['slideTime'] = Number(DrillUp.g_SSpL_descPic_slideAnim['移动时长'] || 20);
		DrillUp.g_SSpL_descPic_slideAnim['slideDelay'] = Number(DrillUp.g_SSpL_descPic_slideAnim['移动延迟'] || 0);
		DrillUp.g_SSpL_descPic_slideAnim['slidePosType'] = String(DrillUp.g_SSpL_descPic_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_SSpL_descPic_slideAnim['slideX'] = Number(DrillUp.g_SSpL_descPic_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_SSpL_descPic_slideAnim['slideY'] = Number(DrillUp.g_SSpL_descPic_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_SSpL_descPic_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_SSpL_descPic_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_SSpL_descPic_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_SSpL_descPic_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_SSpL_descPic_slideAnim = {};
	}
	
	/*-----------------内容------------------*/
	DrillUp.g_SSpL_context_list_length = 80;
	DrillUp.g_SSpL_context_list = [];
	for( var i = 0; i < DrillUp.g_SSpL_context_list_length ; i++ ){
		if( DrillUp.parameters["内容-" + String(i+1) ] != "" &&
			DrillUp.parameters["内容-" + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["内容-" + String(i+1)] );
			DrillUp.g_SSpL_context_list[i] = DrillUp.drill_SSpL_initContext( data );
			DrillUp.g_SSpL_context_list[i]['index'] = i;
		}else{
			DrillUp.g_SSpL_context_list[i] = null;
		}
	};
	
	/*-----------------锁定内容------------------*/
	DrillUp.g_SSpL_locked_name = String(DrillUp.parameters["用语-锁定的选项名"] || "");
	DrillUp.g_SSpL_locked_name = DrillUp.g_SSpL_locked_name.replace(/\\\\/g,"\\");	//（为了支持\\n的写法）
	if( DrillUp.parameters["用语-锁定的选项内容"] != undefined && 
		DrillUp.parameters["用语-锁定的选项内容"] != "" ){
		DrillUp.g_SSpL_locked_context = JSON.parse( DrillUp.parameters["用语-锁定的选项内容"] );
	}else{
		DrillUp.g_SSpL_locked_context = "";
	}
	DrillUp.g_SSpL_locked_type = String(DrillUp.parameters["内容锁定方式"] || "锁定描述图和描述内容");
	DrillUp.g_SSpL_locked_pic = String(DrillUp.parameters["资源-锁定的描述图"] || "");
	
	/*-----------------未读提示------------------*/
	DrillUp.g_SSpL_watch_enabled = String(DrillUp.parameters["是否启用未读提示"] || "true") === "true";	
	DrillUp.g_SSpL_watch_fontsize = Number(DrillUp.parameters["未读提示字体大小"] || 20);
	DrillUp.g_SSpL_watch_setCorner = String(DrillUp.parameters["未读提示是否放右下角"] || "true") == "true";
	if( DrillUp.parameters["用语-未读提示信息"] != undefined && 
		DrillUp.parameters["用语-未读提示信息"] != "" ){
		DrillUp.g_SSpL_watch_text = JSON.parse( DrillUp.parameters["用语-未读提示信息"] );
	}else{
		DrillUp.g_SSpL_watch_text = "";
	}
	
	/*-----------------全局存储对象------------------*/
	//（无）
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary &&
	Imported.Drill_CoreOfWindowCharacter &&
	Imported.Drill_CoreOfSelectableButton &&
	Imported.Drill_LayerCommandThread ){
	
	
//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_SSpL_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpL_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SSpL_sys_initialize.call(this);
	this.drill_SSpL_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SSpL_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SSpL_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SSpL_saveEnabled == true ){	
		$gameSystem.drill_SSpL_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SSpL_initSysData();
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
Game_System.prototype.drill_SSpL_initSysData = function() {
	this.drill_SSpL_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SSpL_checkSysData = function() {
	this.drill_SSpL_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SSpL_initSysData_Private = function() {
	
	this._drill_SSpL_enableTank = [];				//显示情况
	this._drill_SSpL_lockTank = [];					//锁定情况
	this._drill_SSpL_watchedTank = [];				//已读情况
	for( var i = 0; i < DrillUp.g_SSpL_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpL_context_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_SSpL_enableTank[i] = temp_data['enabled'];
		this._drill_SSpL_lockTank[i] = temp_data['locked'];
		this._drill_SSpL_watchedTank[i] = temp_data['watched'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SSpL_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SSpL_enableTank == undefined ){
		this.drill_SSpL_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_SSpL_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpL_context_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_SSpL_enableTank[i] == undefined ){
				this._drill_SSpL_enableTank[i] = temp_data['enabled'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_SSpL_lockTank[i] == undefined ){
				this._drill_SSpL_lockTank[i] = temp_data['locked'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_SSpL_watchedTank[i] == undefined ){
				this._drill_SSpL_watchedTank[i] = temp_data['watched'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
	
	this._drill_SSpL_context_list = null;		//（强制清除旧插件的冗余存档数据）
};


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_SSpL_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_SSpL_pluginCommand.call(this, command, args);
	this.drill_SSpL_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_SSpL_pluginCommand = function( command, args ){
	if( command === ">信息面板L" ){
		
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Drill_SSpL);
			}
			if( type == "显示全部选项" || type == "显示全部" ){
				for( var i = 0; i < DrillUp.g_SSpL_context_list.length; i++ ){
					$gameSystem._drill_SSpL_enableTank[i] = true;		//正常存储
				}
			}
			if( type == "隐藏全部选项" || type == "隐藏全部" ){
				for( var i = 0; i < DrillUp.g_SSpL_context_list.length; i++ ){
					$gameSystem._drill_SSpL_enableTank[i] = false;		//正常存储
				}
			}
			if( type == "锁定全部选项" || type == "锁定全部" ){
				for( var i = 0; i < DrillUp.g_SSpL_context_list.length; i++ ){
					$gameSystem._drill_SSpL_lockTank[i] = true;			//正常存储
				}
			}
			if( type == "解锁全部选项" || type == "解锁全部" ){
				for( var i = 0; i < DrillUp.g_SSpL_context_list.length; i++ ){
					$gameSystem._drill_SSpL_lockTank[i] = false;		//正常存储
				}
			}
		}
		
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( temp1.indexOf("选项变量[") != -1 ){
				temp1 = temp1.replace("选项变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value(Number(temp1));
			}else if( temp1.indexOf("选项[") != -1 ){
				temp1 = temp1.replace("选项[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
			}
			if( type == "显示选项" ){
				$gameSystem._drill_SSpL_enableTank[ Number(temp1)-1 ] = true;		//正常存储
			}
			if( type == "隐藏选项" ){
				$gameSystem._drill_SSpL_enableTank[ Number(temp1)-1 ] = false;		//正常存储
			}
			if( type == "锁定选项" ){
				$gameSystem._drill_SSpL_lockTank[ Number(temp1)-1 ] = true;			//正常存储
			}
			if( type == "解锁选项" ){
				$gameSystem._drill_SSpL_lockTank[ Number(temp1)-1 ] = false;		//正常存储
			}
			if( type == "选中选项" || type == "选中页" ){
				$gameSystem._drill_SSpL_context_index = Number(temp1) -1;
			}
		}
	}
	
};


//=============================================================================
// ** ☆主菜单选项
//
//			说明：	> 此模块专门关联主菜单选项，选项进入后跳转到 信息面板L 界面。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_SSpL_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SSpL_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SSpL',   this.drill_SSpL_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SSpL_menuCommand = function() {
    SceneManager.push(Scene_Drill_SSpL);
};
var _drill_SSpL_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SSpL_addOriginalCommands.call(this);
	if( DrillUp.g_SSpL_add_to_menu ){
		this.addCommand(DrillUp.g_SSpL_menu_name, 'Drill_SSpL', this.areMainCommandsEnabled());
	}
};


//=============================================================================
// ** ☆面板控制
//
//			说明：	> 此模块专门将部分面板配置转移到 Game_Temp 方便随时调用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 面板控制 - 初始化
//==============================
var _drill_SSpL_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_SSpL_temp_initialize.call(this);
	this._drill_SSpL_visibleContextDataList = [];
};
//==============================
// * 面板控制 - 判断 锁定情况
//==============================
Game_Temp.prototype.drill_SSpL_isLocked = function( context_realIndex ){
	
	// > 正常存储控制
	if( $gameSystem._drill_SSpL_lockTank[ context_realIndex ] == true ){
		return true;
	}else{
		return false;
	}
}
//==============================
// * 面板控制 - 判断 显示情况
//==============================
Game_Temp.prototype.drill_SSpL_isEnabled = function( context_realIndex ){
	
	// > 正常存储控制
	if( $gameSystem._drill_SSpL_enableTank[ context_realIndex ] == true ){
		return true;
	}else{
		return false;
	}
}
//==============================
// * 面板控制 - 判断 已读情况
//==============================
Game_Temp.prototype.drill_SSpL_isWatched = function( context_realIndex ){
	
	// > 正常存储控制
	if( $gameSystem._drill_SSpL_watchedTank[ context_realIndex ] == true ){
		return true;
	}else{
		return false;
	}
};
//==============================
// * 面板控制 - 资源文件夹
//==============================
ImageManager.load_MenuSelfDef = function(filename) {
    return this.loadBitmap('img/Menu__self/', filename, 0, true);
};



//=============================================================================
// ** 信息面板L【Scene_Drill_SSpL】
// **
// **		作用域：	菜单界面
// **		主功能：	信息面板的基本功能。
// **		子功能：
// **					->界面重要函数
// **						> 初始化（initialize）
// **						> 创建（create）
// **						> 帧刷新（update）
// **						x> 开始运行（start）
// **						x> 结束运行（stop）
// **						x> 忙碌状态（isBusy）
// **						x> 析构函数（terminate）
// **						x> 判断加载完成（isReady）
// **						x> 判断是否激活/启动（isActive）
// **						x> 当前角色切换时（onActorChange）
// **						x> 创建 - 菜单背景（createBackground）
// **						x> 创建 - 帮助窗口（createHelpWindow）
// **					
// **					->A主体
// **					->B选项窗口
// **						->选项按钮组
// **						->选项变化时
// **							->重播窗口动画
// **							->重绘内容
// **							->重播贴图动画
// **							->切换描述图
// **					->C描述窗口
// **					->D描述图片
// **						->显现效果
// **					->E流程
// **						->选项窗口按钮确认（ok键）
// **						->退出窗口（cancel键）
// **		界面成员：
// **					> ._drill_field							布局层
// **						> ._window_select						选项窗口
// **						> ._drill_SSpL_commandButtonSprite		按钮组贴图
// **						> ._window_desc							描述窗口
// **						> ._sprite_descPic						描述图片
// **					> ._drill_layout						整体布局贴图
// **				
// **		说明：	> 必须离开菜单界面，回到地图界面，才能执行公共事件。
//=============================================================================
//==============================
// * 信息面板L - 定义
//==============================
function Scene_Drill_SSpL() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SSpL.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SSpL.prototype.constructor = Scene_Drill_SSpL;
//==============================
// * 信息面板L - 初始化（继承）
//==============================
Scene_Drill_SSpL.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._drill_curSelectedIndex = -1;
	this._drill_lastSelectedIndex = -1;
};
//==============================
// * 信息面板L - 创建（继承）
//============================== 
Scene_Drill_SSpL.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.drill_createAttr();			//创建 - A主体
	this.drill_createDescPic();			//创建 - C描述窗口
	this.drill_createSelect();			//创建 - B选项窗口 - 选项窗口
	this.drill_createCommandButton();	//创建 - B选项窗口 - 选项按钮组
	this.drill_createDesc();			//创建 - D描述图片
};
//==============================
// * 信息面板L - 帧刷新（继承）
//==============================
Scene_Drill_SSpL.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
										//帧刷新 - A主体（无）
	this.drill_updateSelect();			//帧刷新 - B选项窗口
	this.drill_updateSelectChanged();	//帧刷新 - B选项窗口 - 选项变化时
	this.drill_updateDesc();			//帧刷新 - C描述窗口
	this.drill_updateDescPic();			//帧刷新 - D描述图片
}

//==============================
// * A主体 - 创建
//==============================
Scene_Drill_SSpL.prototype.drill_createAttr = function() {
	
	// > 布局层（先画，其图层都被放在后面）
	this._drill_field = new Sprite();
	this.addChild(this._drill_field);
	
	// > 整体布局贴图
	this._drill_layout = new Sprite(ImageManager.load_MenuSelfDef(DrillUp.g_SSpL_layout));
	this.addChild(this._drill_layout);
};

//==============================
// * B选项窗口 - 创建 选项窗口
//==============================
Scene_Drill_SSpL.prototype.drill_createSelect = function() {
	var data = DrillUp.g_SSpL_command_window;	//（直接读取选项窗口中的项）
	
	this._window_select = new Drill_SSpL_SelectWindow(0, 0, 0, 0);
	this._window_select.drill_COWA_changeParamData( data ); //『辅助核心初始化』-窗口基本属性
	this._window_select.refresh();
	this._window_select.drill_window_initSelect();
	
	this._window_select.setHandler('ok', this.drill_processOk.bind(this));	//绑定确定选择界面事件
	this._window_select.setHandler('cancel', this.popScene.bind(this));		//绑定退出界面事件
	this._drill_field.addChild(this._window_select);
};
//==============================
// * B选项窗口 - 创建 选项按钮组
//==============================
Scene_Drill_SSpL.prototype.drill_createCommandButton = function() {
	if( DrillUp.g_SSpL_command_mode != "按钮组模式" ){ return; }
	
	// > 准备按钮组参数
	var data_org = DrillUp.g_SSpL_command_button;
	var data_style = DrillUp.drill_COSB_getCopyedBtnData( data_org['style_id']-1 );	//深拷贝数据
	for(var key in data_org){
		data_style[ key ] = data_org[ key ];
	}
	data_style['active_enableMouseOk'] = true;	//（鼠标ok点击 开启，强制）
	//alert(JSON.stringify(data_style));
	
	// > 建立按钮组层
	var temp_sprite = new Drill_COSB_LayerSprite( data_style, this._window_select );
	this._drill_field.addChild( temp_sprite );
	this._drill_SSpL_commandButtonSprite = temp_sprite;
};
//==============================
// * B选项窗口 - 帧刷新
//==============================
Scene_Drill_SSpL.prototype.drill_updateSelect = function() {
	
	// > 初始化 - 插件指令选中
	var max_index = $gameTemp._drill_SSpL_visibleContextDataList.length -1;
	if( $gameSystem._drill_SSpL_context_index != undefined ){
		var index = $gameSystem._drill_SSpL_context_index;
		if( index < 0 ){ index = 0; };
		if( index > max_index ){ index = max_index; };
		this._window_select.select( index );			//（设置选中选项）
		$gameSystem._drill_SSpL_context_index = null;	//（激活后清空）
	}
	
	// > 初始化 - 默认选中
	if( this._window_select._index == null ){ this._window_select.select(0); }
	if( this._window_select._index < 0 ){ this._window_select.select(0); }
	if( this._window_select._index > max_index ){ this._window_select.select(max_index); }
	
	// > 动画帧刷新
	if( DrillUp.g_SSpL_command_mode == "按钮组模式" ){
		this._window_select.y = Graphics.boxHeight * 2;
	}
	if( DrillUp.g_SSpL_command_mode == "窗口模式" ){
		//（不操作，动画自己会帧刷新）
	}
};
//==============================
// * B选项窗口 - 帧刷新 - 选项变化时
//==============================
Scene_Drill_SSpL.prototype.drill_updateSelectChanged = function() {
	if( $gameTemp._drill_SSpL_visibleContextDataList.length == 0 ){ return };
	
	// > 选项变化时
	if( this._drill_curSelectedIndex != this._window_select._index ){
		this._drill_curSelectedIndex  = this._window_select._index;
		
		// > 描述窗口 - 重播窗口动画
		if( DrillUp.g_SSpL_descWin_replay ){
			this._window_desc.drill_COWA_resetAttrMove(); //『辅助核心动画』-重播窗口动画
			this._window_desc.drill_COWA_resetAttrOpacity(); //『辅助核心动画』-重播窗口动画
		}
		// > 描述窗口 - 重绘内容
		this._window_desc.drill_refreshDescText(this._drill_curSelectedIndex);
		
		// > 描述图 - 重播贴图动画
		if( DrillUp.g_SSpL_descPic_replay ){
			this._sprite_descPic.drill_COWA_resetAttrMove(); //『辅助核心动画』-重播贴图动画
		}
		// > 描述图 - 切换描述图
		this.drill_refreshDescPic(this._drill_curSelectedIndex);
		
		// > 选项窗口 - 已读情况
		this._window_select.drill_window_watchedChanged(this._drill_lastSelectedIndex);
		
		this._drill_lastSelectedIndex = this._drill_curSelectedIndex;
	}
}

//==============================
// * C描述窗口 - 创建
//==============================
Scene_Drill_SSpL.prototype.drill_createDesc = function() {
	var data = {
		"x": DrillUp.g_SSpL_descWin_x,
		"y": DrillUp.g_SSpL_descWin_y,
		"width": DrillUp.g_SSpL_descWin_width,
		"height": DrillUp.g_SSpL_descWin_height,
		"fontsize": DrillUp.g_SSpL_descWin_fontsize,
		
		"slideMoveType": DrillUp.g_SSpL_descWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpL_descWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpL_descWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpL_descWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpL_descWin_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpL_descWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpL_descWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpL_descWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_SSpL_descWin_layout['layoutType'],
		"layoutX": DrillUp.g_SSpL_descWin_layout['layoutX'],
		"layoutY": DrillUp.g_SSpL_descWin_layout['layoutY'],
		"layoutSrc": DrillUp.g_SSpL_descWin_layout['layoutSrc'],
		"layoutSrcFile": DrillUp.g_SSpL_descWin_layout['layoutSrcFile'],
	}
	this._window_desc = new Drill_SSpL_DescWindow(0, 0, 0, 0);
	this._window_desc.drill_COWA_changeParamData( data ); //『辅助核心初始化』-窗口基本属性
	
	this._drill_field.addChild(this._window_desc);
};
//==============================
// * C描述窗口 - 帧刷新
//==============================
Scene_Drill_SSpL.prototype.drill_updateDesc = function() {
	//（不操作，动画自己会帧刷新）
};

//==============================
// * D描述图片 - 创建
//==============================
Scene_Drill_SSpL.prototype.drill_createDescPic = function() {
	var data = {
		"x": DrillUp.g_SSpL_descPic_x,
		"y": DrillUp.g_SSpL_descPic_y,
		
		"slideMoveType": DrillUp.g_SSpL_descPic_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_SSpL_descPic_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_SSpL_descPic_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_SSpL_descPic_slideAnim['slidePosType'],
		"slideX": DrillUp.g_SSpL_descPic_slideAnim['slideX'],
		"slideY": DrillUp.g_SSpL_descPic_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_SSpL_descPic_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_SSpL_descPic_slideAnim['slideAbsoluteY'],
	}
	this._sprite_descPic = new Sprite();
	this._sprite_descPic.drill_COWA_setAttrMove( data ); //『辅助核心初始化』-贴图基本属性
	this._drill_field.addChild(this._sprite_descPic);	
	
	this._sprite_descPic._drill_bitmaps = [];
};
//==============================
// * D描述图片 - 帧刷新
//==============================
Scene_Drill_SSpL.prototype.drill_updateDescPic = function() {
	
	// > 显现效果
	if( DrillUp.g_SSpL_descPic_showInstant == false ){
		this._sprite_descPic.opacity += 255/DrillUp.g_SSpL_descPic_slideAnim['slideTime'];
	}
}
//==============================
// * D描述图片 - 切换描述图
//==============================
Scene_Drill_SSpL.prototype.drill_refreshDescPic = function( cur_index ){
	
	// > 资源全加载
	var src_tank = this._sprite_descPic._drill_bitmaps;	//资源bitmap容器
	if( src_tank.length == 0 ){
		src_tank[0] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpL_locked_pic);
		for( var i = 0; i < $gameTemp._drill_SSpL_visibleContextDataList.length; i++ ){
			var temp_data = $gameTemp._drill_SSpL_visibleContextDataList[i];
			if( temp_data == null ){ continue; }
			if( temp_data == "" ){ continue; }
			
			var context_realIndex = temp_data['index'];
			src_tank[ i+1 ] = ImageManager.load_MenuSelfDef(DrillUp.g_SSpL_context_list[ context_realIndex ]["pic"]);	
		}
		this._sprite_descPic._drill_bitmaps = src_tank;
	}
	
	// > 切换描述图
	var temp_curData = $gameTemp._drill_SSpL_visibleContextDataList[ cur_index ];	//（当前选项）
	if( $gameTemp.drill_SSpL_isLocked( temp_curData['index'] ) == true && 
		(DrillUp.g_SSpL_locked_type == "锁定描述图和描述内容" || 
		 DrillUp.g_SSpL_locked_type == "只锁定描述图" ) ){
		this._sprite_descPic.bitmap = src_tank[ 0 ];			//锁定描述图
	}else{
		this._sprite_descPic.bitmap = src_tank[ cur_index+1 ];	//当前描述图
	}
	
	// > 显现效果 重置
	if( DrillUp.g_SSpL_descPic_showInstant == false ){
		this._sprite_descPic.opacity = 0;
	}
}

//==============================
// * E流程 - 选项窗口按钮确认
//==============================
Scene_Drill_SSpL.prototype.drill_processOk = function() {
	
	// > 获取选中的内容
	var temp_context = $gameTemp._drill_SSpL_visibleContextDataList[ this._window_select.index() ];
	if(!temp_context ){ this._window_select.activate(); return; }
	
	// > 锁定时，不允许执行
	var realIndex = temp_context['index'];
	if( $gameTemp.drill_SSpL_isLocked( realIndex ) == true ){
		SoundManager.playBuzzer();
		this._window_select.activate();
		return;
	}
	
	// > 执行脚本
	if( temp_context['script'] != "" ){
		eval(JSON.parse(temp_context['script']));
	}
	
	// > 执行公共事件（切出当前所有菜单Scene）
	if( temp_context['commonEventEnable'] ){
		
		var common_id = temp_context['commonEventId'];
		if( common_id == 0 ){ 
			common_id = $gameVariables.value( temp_context['commonEventVarId'] );
		}
		
		SoundManager.playOk();
		this.drill_SSpL_doCommonEvent( temp_context['name'], temp_context['pipeType'], common_id, "" );
		
	}else{
		this._window_select.activate(); return; 
	}
};
//==============================
// * E流程 - 『执行公共事件』（地图界面）
//==============================
Scene_Drill_SSpL.prototype.drill_SSpL_doCommonEvent = function( btn_name, pipeType, commonEventId, callBack_str ){
	
	// > 插件【地图-多线程】
	if( Imported.Drill_LayerCommandThread ){
		
		// > 跳出界面
		if(SceneManager._stack.length > 0){ SceneManager.pop(); }
		if(SceneManager._stack.length > 0){ SceneManager.pop(); }
		if(SceneManager._stack.length > 0){ SceneManager.pop(); }
		
		var e_data = {
			'type': "公共事件",
			'pipeType': pipeType,
			'commonEventId': commonEventId,
			'callBack_str': callBack_str,
		};
		$gameMap.drill_LCT_addPipeEvent( e_data );
		
	// > 未配置插件 提示
	}else{
		alert( DrillUp.drill_SSpL_getPluginTip_NoSupportPlugin( btn_name ) );
	}
};


//=============================================================================
// ** ☆原型链规范（Scene_Drill_SSpL）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 信息面板L（场景基类） - 初始化
//==============================
//Scene_Drill_SSpL.prototype.initialize = function() {
//    Scene_MenuBase.prototype.initialize.call(this);
//};
//==============================
// * 信息面板L（场景基类） - 创建
//==============================
//Scene_Drill_SSpL.prototype.create = function() {
//    Scene_MenuBase.prototype.create.call(this);
//};
//==============================
// * 信息面板L（场景基类） - 帧刷新
//==============================
//Scene_Drill_SSpL.prototype.update = function() {
//    Scene_MenuBase.prototype.update.call(this);
//};
//==============================
// * 信息面板L（场景基类） - 开始运行
//==============================
Scene_Drill_SSpL.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
//==============================
// * 信息面板L（场景基类） - 结束运行
//==============================
Scene_Drill_SSpL.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
};
//==============================
// * 信息面板L（场景基类） - 忙碌状态
//==============================
Scene_Drill_SSpL.prototype.isBusy = function() {
	return Scene_MenuBase.prototype.isBusy.call(this);
};
//==============================
// * 信息面板L（场景基类） - 析构函数
//==============================
Scene_Drill_SSpL.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
};
//==============================
// * 信息面板L（场景基类） - 判断加载完成
//==============================
Scene_Drill_SSpL.prototype.isReady = function() {
	return Scene_MenuBase.prototype.isReady.call(this);
};
//==============================
// * 信息面板L（场景基类） - 判断是否激活/启动
//==============================
Scene_Drill_SSpL.prototype.isActive = function() {
	return Scene_MenuBase.prototype.isActive.call(this);
};

//==============================
// * 信息面板L（菜单界面基类） - 当前角色切换时
//==============================
Scene_Drill_SSpL.prototype.onActorChange = function() {
	Scene_MenuBase.prototype.onActorChange.call(this);
};
//==============================
// * 信息面板L（菜单界面基类） - 创建 - 菜单背景
//==============================
Scene_Drill_SSpL.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
};
//==============================
// * 信息面板L（菜单界面基类） - 创建 - 帮助窗口
//==============================
Scene_Drill_SSpL.prototype.createHelpWindow = function() {
	Scene_MenuBase.prototype.createHelpWindow.call(this);
};



//==========================================================================================
// ** 选项窗口【Drill_SSpL_SelectWindow】
// **
// **		作用域：	菜单界面
// **		主功能：	定义一个选项窗口，能进行选项切换。
// **		子功能：	
// **					->窗口
// **						->帧刷新
// **					->G子项（覆写）
// **					->2A选中
// **					->2B绘制选项
// **					->2C已读情况
// **					->2D兼容
// **
// **		说明：	> 该插件专用。
//==========================================================================================
//==============================
// * 选项窗口 - 定义
//==============================
function Drill_SSpL_SelectWindow() {
	this.initialize.apply(this, arguments);
}
Drill_SSpL_SelectWindow.prototype = Object.create(Window_Selectable.prototype);
Drill_SSpL_SelectWindow.prototype.constructor = Drill_SSpL_SelectWindow;
//==============================
// * 选项窗口 - 初始化
//==============================
Drill_SSpL_SelectWindow.prototype.initialize = function( x, y, width, height ){
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.activate();
	this.drill_window_initSelect();
};
//==============================
// * 选项窗口 - 帧刷新
//==============================
Drill_SSpL_SelectWindow.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	//（无）
};

//==============================
// * G子项 - 属性 - 列数（覆写）
//==============================
Drill_SSpL_SelectWindow.prototype.maxCols = function() {
	return DrillUp.g_SSpL_command_window['col'] || 1;
};
//==============================
// * G子项 - 属性 - 子项数量（覆写）
//==============================
Drill_SSpL_SelectWindow.prototype.maxItems = function() {
	return this._drill_selectionNameList ? this._drill_selectionNameList.length : 0;
};
//==============================
// * G子项 - 属性 - 子项间距
//==============================
// （不操作）
//==============================
// * G子项 - 属性 - 子项宽度
//==============================
// （不操作）
//==============================
// * G子项 - 属性 - 子项高度（覆写）
//==============================
Drill_SSpL_SelectWindow.prototype.itemHeight = function() {
	return DrillUp.g_SSpL_command_window['itemHeight'] || this.lineHeight();
};
//==============================
// * G子项 - 重画所有子项（覆写）
//==============================
Drill_SSpL_SelectWindow.prototype.refresh = function() {
	
	// > 重刷可见项列表
	$gameTemp._drill_SSpL_visibleContextDataList = [];
	this._drill_COSB_indexList = [];							// 按钮组核心 - 交错索引列表
	this._drill_COSB_windowSelectable_refreshing = true;		// 按钮组核心 - 刷新标记
	for( var i = 0; i < DrillUp.g_SSpL_context_list.length; i++ ){
		var temp_data = DrillUp.g_SSpL_context_list[i];
		if( temp_data == null ){ continue; }
		
		if( $gameTemp.drill_SSpL_isEnabled( i ) == true ){
			$gameTemp._drill_SSpL_visibleContextDataList.push( temp_data );
			this._drill_COSB_indexList.push( i-1 );
		}
	}
	
	// > 选项显示的文本（与可见项一对一）
	this._drill_selectionNameList = [];
	for( var j = 0; j < $gameTemp._drill_SSpL_visibleContextDataList.length ;j++ ){
		var temp_data = $gameTemp._drill_SSpL_visibleContextDataList[j];
		var context_realIndex = temp_data['index'];
		
		// > 选项锁定
		if( $gameTemp.drill_SSpL_isLocked( context_realIndex ) == true ){
			this._drill_selectionNameList[j] = String(DrillUp.g_SSpL_locked_name);
			continue;
		}
		
		// > 选项长文本
		if( DrillUp.g_SSpL_command_window['nameExEnabled'] == true ){
			this._drill_selectionNameList[j] = String(temp_data['nameEx']);
			continue;
		}
		
		// > 选项名
		this._drill_selectionNameList[j] = String(temp_data['name']);
	}
	
	// > 绘制选项内容
	this.createContents();
	this.drill_window_drawAllItem();
	
	// > 选项兼容（._list 是 Window_Command 的参数，Window_Selectable 没有此参数，但为了兼容这里赋值一下）
	this._list = this._drill_selectionNameList;
};

//==============================
// * 2A选中 - 参数初始化
//==============================
Drill_SSpL_SelectWindow.g_drill_lastTopRow = 0;
Drill_SSpL_SelectWindow.g_drill_lastIndex  = 0;
//==============================
// * 2A选中 - 设置选项
//==============================
Drill_SSpL_SelectWindow.prototype.drill_window_initSelect = function() {
	if( Drill_SSpL_SelectWindow.g_drill_lastIndex >= this._drill_selectionNameList.length ){
		Drill_SSpL_SelectWindow.g_drill_lastIndex = this._drill_selectionNameList.length-1;
	}
	this.setTopRow(Drill_SSpL_SelectWindow.g_drill_lastTopRow);
	this.select(Drill_SSpL_SelectWindow.g_drill_lastIndex);
}
//==============================
// * 2A选中 - 退出时暂存选项（继承）
//==============================
Drill_SSpL_SelectWindow.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	Drill_SSpL_SelectWindow.g_drill_lastTopRow = this.topRow();
	Drill_SSpL_SelectWindow.g_drill_lastIndex = this.index();
};

//==============================
// * 2B绘制选项 - 绘制所有
//
//			说明：	> 该函数是一个单独定义的函数，参考了 Window_Selectable.prototype.drawAllItems 结构。
//==============================
Drill_SSpL_SelectWindow.prototype.drill_window_drawAllItem = function(){
	
	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 原函数
    var topIndex = this.topIndex();
    for( var i = 0; i < this.maxPageItems(); i++ ){
        var index = topIndex + i;
        if( index < this.maxItems() ){
            this.drill_window_drawItem(index);
            this.drill_window_drawNewTag(index);
        }
    }
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
};
//==============================
// * 2B绘制选项 - 绘制单个
//
//			说明：	> 该函数是一个单独定义的函数，参考了 Window_Selectable.prototype.drawItem 结构。
//==============================
Drill_SSpL_SelectWindow.prototype.drill_window_drawItem = function( index ){
	var rect = this.itemRectForText(index);
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = this._drill_selectionNameList[index];
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = rect.x,
	options['infoParam']['y'] = rect.y,
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	options['rowParam'] = {};
	options['rowParam']['alignHor_maxWidth'] = rect.width;
	options['rowParam']['alignVer_maxHeight'] = rect.height;
	
	options['rowParam']['alignHor_type'] = DrillUp.g_SSpL_command_window['align'];	//（对齐方式）
	
	// > 清空画布（这里在连续绘制选项，不要清空）
	//temp_bitmap.clear();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
};

//==============================
// * 2C已读情况 - 绘制新标签
//==============================
Drill_SSpL_SelectWindow.prototype.drill_window_drawNewTag = function( index ){
	if( DrillUp.g_SSpL_watch_enabled != true ){ return; }
	
	var temp_data = $gameTemp._drill_SSpL_visibleContextDataList[index];	//（当前选项）
	if( temp_data == undefined ){ return; }
	var rect = this.itemRectForText(index);
	var context_realIndex = temp_data['index'];
	
	// > 已读则跳出
	if( $gameTemp.drill_SSpL_isWatched( context_realIndex ) == true ){ return; }
	// > 锁定则跳出
	if( $gameTemp.drill_SSpL_isLocked( context_realIndex ) == true ){ return; }
	
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = DrillUp.g_SSpL_watch_text;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = rect.x,
	options['infoParam']['y'] = rect.y,
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	options['rowParam'] = {};
	options['rowParam']['alignHor_maxWidth'] = rect.width;
	options['rowParam']['alignVer_maxHeight'] = rect.height;
	if( DrillUp.g_SSpL_watch_setCorner == true ){
		options['rowParam']['alignHor_type'] = "right";	//（右下角）
		options['rowParam']['alignVer_type'] = "bottom";
	}
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = DrillUp.g_SSpL_watch_fontsize;
	
	// > 清空画布（这里在连续绘制选项，不要清空）
	//temp_bitmap.clear();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
};
//==============================
// * 2C已读情况 - 选项变化时
//
//			说明：	> 注意选项变化时，要传入上一次选项的索引。因为当前索引不算已读，上一次索引才算已读。
//==============================
Drill_SSpL_SelectWindow.prototype.drill_window_watchedChanged = function( last_index ){
	if( DrillUp.g_SSpL_watch_enabled != true ){ return; }
	
	var temp_data = $gameTemp._drill_SSpL_visibleContextDataList[ last_index ];	//（当前选项）
	if( temp_data == undefined ){ return; }
	var context_realIndex = temp_data['index'];
	
	// > 锁定则跳出
	if( $gameTemp.drill_SSpL_isLocked( context_realIndex ) == true ){ return; }
	
	// > 新标签 数据变化
	if( $gameTemp.drill_SSpL_isWatched( context_realIndex ) != true ){
		$gameSystem._drill_SSpL_watchedTank[ context_realIndex ] = true;
		this.createContents();				//（强制重绘）
		this.drill_window_drawAllItem();	//（强制重绘）
	}
};

//==============================
// * 2D兼容 - mog菜单指针插件
//==============================
if( Imported.MOG_MenuCursor == true ){
	var _drill_SSpL_mog_set_mcursor_data = Drill_SSpL_SelectWindow.prototype.need_set_mcursor_data;
	Drill_SSpL_SelectWindow.prototype.need_set_mcursor_data = function() {
		if( DrillUp.g_SSpL_command_window['cursor']['mog_enabled'] == false ){
			return false;
		}
		return _drill_SSpL_mog_set_mcursor_data.call(this);
	}
}
//==============================
// * 2D兼容 - mog菜单边框插件
//==============================
if( Imported.MOG_CursorBorder == true ){
	var _drill_SSpL_mog_createSprSelMenu = Drill_SSpL_SelectWindow.prototype.createSprSelMenu;
	Drill_SSpL_SelectWindow.prototype.createSprSelMenu = function() {
		if( DrillUp.g_SSpL_command_window['cursor']['mog_borderEnabled'] == false ){
			return ;
		}
		_drill_SSpL_mog_createSprSelMenu.call(this);
	}
}
//==============================
// * 2D兼容 - 【Drill_MenuCursor 主菜单 - 多样式菜单指针】
//==============================
if( Imported.Drill_MenuCursor == true ){
	Drill_SSpL_SelectWindow.prototype.drill_MCu_cursorEnabled = function() {
		return DrillUp.g_SSpL_command_window['cursor']['MCu_enabled'];
	}
	Drill_SSpL_SelectWindow.prototype.drill_MCu_cursorStyleId = function() {
		if( DrillUp.g_SSpL_command_window['cursor']['MCu_lock'] == true ){
			return DrillUp.g_SSpL_command_window['cursor']['MCu_style'];
		}else{
			return $gameSystem._drill_MCu_style;
		}
	}
}
//==============================
// * 2D兼容 - 【Drill_MenuCursorBorder 主菜单 - 多样式菜单选项边框】
//==============================
if( Imported.Drill_MenuCursorBorder == true ){
	Drill_SSpL_SelectWindow.prototype.drill_MCB_glimmerRectVisible = function() {
		return DrillUp.g_SSpL_command_window['cursor']['MCB_rectEnabled'];
	}
	Drill_SSpL_SelectWindow.prototype.drill_MCB_borderEnabled = function() {
		return DrillUp.g_SSpL_command_window['cursor']['MCB_enabled'];
	}
	Drill_SSpL_SelectWindow.prototype.drill_MCB_borderStyleId = function() {
		if( DrillUp.g_SSpL_command_window['cursor']['MCB_lock'] == true ){
			return DrillUp.g_SSpL_command_window['cursor']['MCB_style'];
		}else{
			return $gameSystem._drill_MCB_style;
		}
	}
}
//==============================
// * 2D兼容 - 【Drill_MenuScrollBar 主菜单 - 多样式菜单滚动条】
//==============================
if( Imported.Drill_MenuScrollBar == true ){
	Drill_SSpL_SelectWindow.prototype.drill_MSB_scrollBarEnabled = function() {
		return DrillUp.g_SSpL_command_window['cursor']['MSB_enabled'];
	}
	Drill_SSpL_SelectWindow.prototype.drill_MSB_scrollBarStyleId = function() {
		if( DrillUp.g_SSpL_command_window['cursor']['MSB_lock'] == true ){
			return DrillUp.g_SSpL_command_window['cursor']['MSB_style'];
		}else{
			return $gameSystem._drill_MSB_style;
		}
	}
}


//==========================================================================================
// ** 显示窗口【Drill_SSpL_DescWindow】
// **
// **		作用域：	菜单界面
// **		主功能：	定义一个窗口，用于绘制段落文本。
// **		子功能：	
// **					->窗口
// **					->窗口行高
// **					->对齐方式
// **					->绘制文本
// **
// **		说明：	> 该插件专用。
//==========================================================================================
//==============================
// * 显示窗口 - 定义
//==============================
function Drill_SSpL_DescWindow() {
    this.initialize.apply(this, arguments);
}
Drill_SSpL_DescWindow.prototype = Object.create(Window_Base.prototype);
Drill_SSpL_DescWindow.prototype.constructor = Drill_SSpL_DescWindow;
//==============================
// * 显示窗口 - 初始化
//==============================
Drill_SSpL_DescWindow.prototype.initialize = function( x, y, width, height ){
    Window_Base.prototype.initialize.call(this, x,y,width,height);
	//（无）
};
//==============================
// * 显示窗口 - 帧刷新
//==============================
Drill_SSpL_DescWindow.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	//（无）
};
//==============================
// * 显示窗口 - 重绘内容
//==============================
Drill_SSpL_DescWindow.prototype.drill_refreshDescText = function( cur_index ){
	var temp_data = $gameTemp._drill_SSpL_visibleContextDataList[ cur_index ];	//（当前选项）
	if( temp_data == undefined ){ return; }
	
	// > 切换描述内容
	var context = "";
	if( $gameTemp.drill_SSpL_isLocked( temp_data['index'] ) == true && 
		(DrillUp.g_SSpL_locked_type == "锁定描述图和描述内容" || 
		 DrillUp.g_SSpL_locked_type == "只锁定描述内容" ) ){
		context = DrillUp.g_SSpL_locked_context;	//锁定内容
	}else{
		context = temp_data['context'];				//当前内容
	}
	
	// > 窗口行高
	var cur_lineHeight = 0;
	if( temp_data['context_lineheight_type'] == "默认补正" ){
		cur_lineHeight = 30;
	}
	if( temp_data['context_lineheight_type'] == "自定义补正" ){
		cur_lineHeight = temp_data['context_lineheight_custom'];
	}
	if( temp_data['context_lineheight_type'] == "锁定行高" ){
		cur_lineHeight = temp_data['context_lineheight_lock'];
	}
	if( temp_data['context_lineheight_type'] == "关闭行高控制" ){
		cur_lineHeight = 0;
	}
	
	// > 对齐方式
	var cur_align = "left";
	if( temp_data['context_align'] == "居中" ){ cur_align = "center"; }
	if( temp_data['context_align'] == "右对齐" ){ cur_align = "right"; }
	
	
	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = context;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	options['blockParam'] = {};							//『自定义字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = cur_lineHeight;
	
	options['rowParam']['alignHor_type'] = cur_align;	//（对齐方式）
	
	// > 清空画布（固定高宽只需要清空）
	temp_bitmap.clear();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * 显示窗口 - 刷新内容 - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_SSpL_getPluginTip_NeedUpdate_drawText() );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SceneSelfplateL = false;
		var pluginTip = DrillUp.drill_SSpL_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

