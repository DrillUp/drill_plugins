//=============================================================================
// Drill_CoreOfSelectableButton.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 按钮组核心
 * @author Drill_up
 * 
 * @Drill_LE_param "按钮组样式-%d"
 * @Drill_LE_parentKey "---按钮组样式%d至%d---"
 * @Drill_LE_var "DrillUp.g_COSB_btn_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfSelectableButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够将含选项的窗口，变成一系列灵活分布的按钮组。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件必须基于核心，并可以辅助扩展下列插件。
 * 基于：
 *   - Drill_CoreOfBallistics       系统 - 弹道核心
 * 可作用于：
 *   - Drill_SceneMain              面板 - 全自定义主菜单面板
 *   - Drill_SceneSelfplateI        面板 - 全自定义信息面板I
 * 可被扩展：
 *   - Drill_MenuCursor             主菜单 - 多样式菜单指针
 *     目标插件可以使得该 核心 支持按钮指针功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于所有含选项的窗口。
 * 2.具体可以去看看"关于按钮组核心.docx"。
 *   文档中有相关图解，比纯文字容易理解。
 * 主体：
 *   (1.按钮组核心必须依赖一个有 选项的窗口，通过选项窗口获取到
 *      对应的选项。每个选项都对应一个按钮贴图。
 *   (2.该插件中所有设置都以按钮组(0,0)中心位置为基准。子插件可
 *      以设置按钮组的整体位置，对整体进行位移。
 * 按钮贴图：
 *   (1.核心本体并不配置贴图资源，贴图资源都在子插件中配置。
 *   (2.按钮组核心必须依赖一个有 选项的窗口，通过选项窗口获取到
 *      对应的选项。每个选项都对应一个按钮贴图。
 *   (3.你可以设置写在按钮上面的按钮名称，配合按钮贴图实现按钮。
 * 移动动画：
 *   (1.每个按钮都可以配置起点，起点是指 按钮最初出现的位置，
 *      进入菜单后，按钮会从起点回到原位置。
 *   (2.按钮移动分为两种：相对坐标起点 与 统一坐标起点。
 * 排列方式：
 *   (1.排列方式有直线排列、环形排列、矩阵排列、固定离散排列。
 *      具体去看看文档中的图文介绍。
 *   (2.如果你在排列方式上有疑问，可以在该核心中开启debug规划
 *      轨迹，看到规划排列的红线。
 *   (3.注意按钮组的排列方式，你需要根据排列实际情况，配置合适的键
 *      盘模式。270度朝上的直线排列，使用的是反向上下切换键盘模式。
 * 指针：
 *   (1.从本质上说，指针就是一个贴图。
 *      可以是圆环，可以是指向标，可以是大外框，还可以配置成gif。
 *   (2.具体可以去看看”关于指针与边框.docx”。
 * 按钮变化效果：
 *   (1.按钮组中，所有按钮的变化效果都是独立的，插件会对当前
 *      选中的按钮进行透明度变化、摇晃效果、缩放效果等变化。
 *   (2.当选中的按钮失去选中焦点后，变化效果并不会立即消失，
 *      会有一小段恢复过程。
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
 * 时间复杂度： o(n^3)*o(贴图处理)
 * 测试方法：   标题菜单、主菜单界面性能测试。
 * 测试结果：   菜单界面中，消耗为：【24.54ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.一般情况下，一个按钮同时关联了多个情况的贴图，按钮数量越多，
 *   消耗越大。不过一般情况下，不会造成40多个按钮同时出现在界面
 *   中，所以不需要特别担心过多的性能消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了鼠标接近自动选中功能。以及键盘控制功能。
 * [v1.2]
 * 添加了多样式菜单指针的支持。
 * 
 * 
 * 
 * @param ---按钮组样式 1至20---
 * @default
 * 
 * @param 按钮组样式-1
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default {"标签":"--主菜单环形菜单按钮--","按钮组模式":"固定指针式","---主体---":"","DEBUG-规划网格线":"false","是否显示按钮名称":"false","按钮名称字体大小":"28","按钮名称对齐方式":"居中","按钮组移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"15\",\"移动延迟\":\"0\",\"依次移动延迟间隔\":\"3\",\"---起点---\":\"\",\"坐标类型\":\"统一的坐标\",\"起点-相对坐标 X\":\"-80\",\"起点-相对坐标 Y\":\"0\",\"起点-统一坐标 X\":\"0\",\"起点-统一坐标 Y\":\"0\"}","---排列---":"","排列方式":"环形排列","==直线排列==":"","直线间距":"48","直线W间距":"36","直线旋转角度":"45","==环形排列==":"","环形半径":"148","环形起始角":"270","环形终止角":"270","==矩阵排列==":"","矩阵列数":"4","矩阵列宽":"48","矩阵行高":"48","==固定离散排列==":"","固定离散位置序列":"[]","---名称块---":"","是否显示名称块":"true","平移-名称块 X":"0","平移-名称块 Y":"0","名称块字体大小":"24","名称块对齐方式":"居中","名称块移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"20\",\"移动延迟\":\"0\",\"起点-相对坐标 X\":\"-20\",\"起点-相对坐标 Y\":\"-40\"}","---选中的按钮---":"","未选中按钮透明度":"160","选中后透明度变化时长":"15","闪烁效果":"关闭","闪烁速度":"6.0","闪烁幅度范围":"35","摇晃效果":"关闭","摇晃速度":"4.0","摇晃幅度范围":"12","缩放效果":"整体缩放","缩放速度":"4.0","缩放幅度范围":"0.2","浮动效果":"关闭","浮动速度":"1.0","浮动偏移量":"15","是否出列":"false","选中后出列变化时长":"20","平移-出列相对偏移 X":"50","平移-出列相对偏移 Y":"0","---指针---":"","---激活的按钮---":""}
 * 
 * @param 按钮组样式-2
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default {"标签":"--主菜单环形角色头像--","按钮组模式":"固定指针式","---主体---":"","DEBUG-规划网格线":"false","是否显示按钮名称":"false","按钮名称字体大小":"28","按钮名称对齐方式":"居中","按钮组移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"15\",\"移动延迟\":\"0\",\"依次移动延迟间隔\":\"3\",\"---起点---\":\"\",\"坐标类型\":\"统一的坐标\",\"起点-相对坐标 X\":\"-80\",\"起点-相对坐标 Y\":\"0\",\"起点-统一坐标 X\":\"0\",\"起点-统一坐标 Y\":\"0\"}","---排列---":"","排列方式":"环形排列","==直线排列==":"","直线间距":"48","直线W间距":"36","直线旋转角度":"45","==环形排列==":"","环形半径":"68","环形起始角":"270","环形终止角":"270","==矩阵排列==":"","矩阵列数":"4","矩阵列宽":"48","矩阵行高":"48","==固定离散排列==":"","固定离散位置序列":"[]","---名称块---":"","是否显示名称块":"true","平移-名称块 X":"0","平移-名称块 Y":"0","名称块字体大小":"24","名称块对齐方式":"居中","名称块移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"20\",\"移动延迟\":\"0\",\"起点-相对坐标 X\":\"-20\",\"起点-相对坐标 Y\":\"-40\"}","---选中的按钮---":"","未选中按钮透明度":"160","选中后透明度变化时长":"15","闪烁效果":"关闭","闪烁速度":"6.0","闪烁幅度范围":"35","摇晃效果":"关闭","摇晃速度":"4.0","摇晃幅度范围":"12","缩放效果":"整体缩放","缩放速度":"4.0","缩放幅度范围":"0.2","浮动效果":"关闭","浮动速度":"1.0","浮动偏移量":"15","是否出列":"false","选中后出列变化时长":"20","平移-出列相对偏移 X":"50","平移-出列相对偏移 Y":"0","---指针---":"","---激活的按钮---":""}
 * 
 * @param 按钮组样式-3
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-4
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-5
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default {"标签":"--信息面板I按钮样式--","按钮组模式":"固定指针式","---主体---":"","DEBUG-规划网格线":"false","是否显示按钮名称":"true","按钮名称字体大小":"28","按钮名称对齐方式":"居中","按钮组移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"20\",\"移动延迟\":\"0\",\"依次移动延迟间隔\":\"15\",\"---起点---\":\"\",\"坐标类型\":\"各按钮的相对坐标\",\"起点-相对坐标 X\":\"0\",\"起点-相对坐标 Y\":\"-80\",\"起点-统一坐标 X\":\"0\",\"起点-统一坐标 Y\":\"0\"}","---排列---":"","排列方式":"直线排列","==直线排列==":"","直线间距":"72","直线W间距":"0","直线旋转角度":"0","==环形排列==":"","环形半径":"48","环形起始角":"0","环形终止角":"360","==矩阵排列==":"","矩阵列数":"4","矩阵列宽":"96","矩阵行高":"96","==固定离散排列==":"","固定离散位置序列":"[]","---名称块---":"","是否显示名称块":"false","平移-名称块 X":"0","平移-名称块 Y":"-100","名称块字体大小":"24","名称块对齐方式":"居中","名称块移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"20\",\"移动延迟\":\"0\",\"---起点---\":\"\",\"坐标类型\":\"相对坐标\",\"起点-相对坐标 X\":\"-80\",\"起点-相对坐标 Y\":\"0\",\"起点-绝对坐标 X\":\"0\",\"起点-绝对坐标 Y\":\"0\"}","---选中的按钮---":"","未选中按钮透明度":"160","选中后透明度变化时长":"20","闪烁效果":"关闭","闪烁速度":"6.0","闪烁幅度范围":"35","摇晃效果":"关闭","摇晃速度":"4.0","摇晃幅度范围":"12","缩放效果":"关闭","缩放速度":"1.0","缩放幅度范围":"0.2","浮动效果":"关闭","浮动速度":"1.0","浮动偏移量":"15","是否出列":"true","选中后出列变化时长":"20","平移-出列相对偏移 X":"0","平移-出列相对偏移 Y":"20","---指针---":"","---激活的按钮---":""}
 * 
 * @param 按钮组样式-6
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-7
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-8
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-9
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-10
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-11
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-12
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-13
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-14
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-15
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-16
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-17
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-18
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-19
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-20
 * @parent ---按钮组样式 1至20---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param ---按钮组样式21至40---
 * @default
 * 
 * @param 按钮组样式-21
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-22
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-23
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-24
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-25
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-26
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-27
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-28
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-29
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-30
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-31
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-32
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-33
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-34
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-35
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-36
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-37
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-38
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-39
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-40
 * @parent ---按钮组样式21至40---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param ---按钮组样式41至60---
 * @default
 * 
 * @param 按钮组样式-41
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-42
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-43
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-44
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-45
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-46
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-47
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-48
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-49
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-50
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-51
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-52
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-53
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-54
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-55
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-56
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-57
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-58
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-59
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-60
 * @parent ---按钮组样式41至60---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param ---按钮组样式61至80---
 * @default
 * 
 * @param 按钮组样式-61
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-62
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-63
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-64
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-65
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-66
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-67
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-68
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-69
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-70
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-71
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-72
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-73
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-74
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-75
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-76
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-77
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-78
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-79
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default 
 * 
 * @param 按钮组样式-80
 * @parent ---按钮组样式61至80---
 * @type struct<DrillCOSBCommandButton>
 * @desc 配置按钮组的样式信息。
 * @default
 * 
 */
/*~struct~DrillCOSBCommandButton:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的按钮组样式--
 * 
 * @param 按钮组模式
 * @type select
 * @option 固定指针式
 * @value 固定指针式
 * @option 流线滚动式
 * @value 流线滚动式
 * @desc 按钮组的整体模式。流线滚动式 目前还在开发中，坑太大，后期会实现。
 * @default 固定指针式
 * 
 * @param ---主体---
 * @desc 
 *
 * @param DEBUG-规划网格线
 * @parent ---主体---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 如果你对按钮组的排列与位置存在疑问，可以开启该设置查看规划线。
 * @default false
 * 
 * @param 是否显示按钮名称
 * @parent ---主体---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 按钮名称字体大小
 * @parent 是否显示按钮名称
 * @type number
 * @min 4
 * @desc 按钮名称的字体大小。
 * @default 28
 * 
 * @param 按钮名称对齐方式
 * @parent 是否显示按钮名称
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 按钮名称的对齐方式。
 * @default 左对齐
 *
 * @param 按钮组移动动画
 * @parent ---主体---
 * @type struct<DrillButtonGroupMoving>
 * @desc 按钮组改变时会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"20","移动延迟":"0","依次移动延迟间隔":"10","---起点---":"","坐标类型":"各按钮的相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"-80","起点-统一坐标 X":"0","起点-统一坐标 Y":"0"}
 * 
 * @param ---排列---
 * @desc 
 * 
 * @param 排列方式
 * @parent ---排列---
 * @type select
 * @option 直线排列
 * @value 直线排列
 * @option 环形排列
 * @value 环形排列
 * @option 矩阵排列
 * @value 矩阵排列
 * @option 固定离散排列
 * @value 固定离散排列
 * @desc 选项文本的对齐方式。
 * @default 直线排列
 * 
 * @param ==直线排列==
 * @parent ---排列---
 * @desc 
 *
 * @param 直线间距
 * @parent ==直线排列==
 * @type number
 * @min 0
 * @desc 直线排列时，按钮间的间距。单位像素。
 * @default 48
 *
 * @param 直线W间距
 * @parent ==直线排列==
 * @desc 直线排列时，偶数个按钮的垂直方向间距。单位像素。设置0则按钮组成一条直线。可为负数。
 * @default 36
 *
 * @param 直线旋转角度
 * @parent ==直线排列==
 * @type number
 * @min 0
 * @desc 直线排列时，排列延长线的旋转角度，单位角度。（逆时针，90度朝下，270度朝上）
 * @default 0
 * 
 * @param 是否限制最大长度
 * @parent ==直线排列==
 * @type boolean
 * @on 限制
 * @off 关闭
 * @desc true - 限制，false - 关闭。限制长度后，如果 按钮数*间距 超过了最大长度，将会缩短间距，确保挤压在一起。
 * @default false
 *
 * @param 直线最大长度
 * @parent 是否限制最大长度
 * @desc 限制指定长度后，如果 按钮数*间距 超过了最大长度，将会缩短间距，确保挤压在一起。
 * @default 600
 * 
 * @param ==环形排列==
 * @parent ---排列---
 * @desc 
 *
 * @param 环形半径
 * @parent ==环形排列==
 * @type number
 * @min 0
 * @desc 环形排列时，按钮围绕的半径。单位像素。
 * @default 48
 * 
 * @param 环形起始角
 * @parent ==环形排列==
 * @type number
 * @min 0
 * @max 360
 * @desc 环形排列时，第一个按钮所在的角度位置。
 * @default 0
 * 
 * @param 环形终止角
 * @parent ==环形排列==
 * @type number
 * @min 0
 * @max 360
 * @desc 环形排列时，最后一个按钮所在的角度位置。
 * @default 360
 * 
 * @param ==矩阵排列==
 * @parent ---排列---
 * @desc 
 *
 * @param 矩阵列数
 * @parent ==矩阵排列==
 * @type number
 * @min 1
 * @desc 矩阵排列时，矩阵的列数。行数会根据列数自动匹配。
 * @default 4
 * 
 * @param 矩阵列宽
 * @parent ==矩阵排列==
 * @type number
 * @min 0
 * @desc 矩阵排列时，矩阵列之间的宽度。
 * @default 96
 *
 * @param 矩阵行高
 * @parent ==矩阵排列==
 * @type number
 * @min 0
 * @desc 矩阵排列时，矩阵行之间的高度。
 * @default 96
 * 
 * @param ==固定离散排列==
 * @parent ---排列---
 * @desc 
 * 
 * @param 固定离散位置序列
 * @parent ==固定离散排列==
 * @type text[]
 * @desc 固定离散排列时，填入 x,y 的坐标的序列。例如：200,200，不填则默认0,0。
 * @default []
 * 
 * @param ---名称块---
 * @desc 
 *
 * @param 是否显示名称块
 * @parent ---名称块---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false
 * 
 * @param 平移-名称块 X
 * @parent ---名称块---
 * @desc 以按钮组中心的位置为基准。x轴方向平移，单位像素。
 * @default 0
 * 
 * @param 平移-名称块 Y
 * @parent ---名称块---
 * @desc 以按钮组中心的位置为基准。y轴方向平移，单位像素。
 * @default -100
 *
 * @param 名称块字体大小
 * @parent ---名称块---
 * @type number
 * @min 1
 * @desc 名称块的字体大小。
 * @default 24
 * 
 * @param 名称块对齐方式
 * @parent ---名称块---
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 名称块的对齐方式。
 * @default 居中
 *
 * @param 名称块移动动画
 * @parent ---名称块---
 * @type struct<DrillNameMoving>
 * @desc 名称块改变时会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"20","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"-80","起点-相对坐标 Y":"0","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * 
 * @param ---选中的按钮---
 * @desc 
 *
 * @param 失去焦点后是否立刻复原
 * @parent ---选中的按钮---
 * @type boolean
 * @on 立刻复原
 * @off 缓冲复原
 * @desc true - 立刻复原，false - 缓冲复原。注意，仅限周期变化的复原，线性变化不会立刻复原。
 * @default false
 *
 * @param 未选中按钮透明度
 * @parent ---选中的按钮---
 * @type number
 * @min 1
 * @max 255
 * @desc 未选中的其它按钮默认的透明度。0为完全透明，255为完全不透明。(设置0会造成鼠标点不了，这里最低为1。)
 * @default 160
 *
 * @param 选中后透明度变化时长
 * @parent 未选中按钮透明度
 * @type number
 * @min 1
 * @desc 按钮选中后，按钮高亮的时间。
 * @default 20
 *
 * @param 闪烁效果
 * @parent ---选中的按钮---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前选中的按钮，会来回闪烁。
 * @default 关闭
 * 
 * @param 闪烁速度
 * @parent 闪烁效果
 * @desc 闪烁明亮变化的速度。
 * @default 6.0
 * 
 * @param 闪烁幅度范围
 * @parent 闪烁效果
 * @type number
 * @min 1
 * @max 255
 * @desc 闪烁变化的透明度幅度范围。
 * @default 35
 * 
 * @param 摇晃效果
 * @parent ---选中的按钮---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前选中的按钮，会来回摇晃。
 * @default 关闭
 * 
 * @param 摇晃速度
 * @parent 摇晃效果
 * @desc 来回摇晃变化的速度。
 * @default 4.0
 * 
 * @param 摇晃幅度范围
 * @parent 摇晃效果
 * @type number
 * @min 1
 * @desc 来回摇晃的幅度范围。单位角度。
 * @default 12
 *
 * @param 缩放效果
 * @parent ---选中的按钮---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右缩放
 * @value 左右缩放
 * @option 上下缩放
 * @value 上下缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 当前选中的按钮，会来回缩放。
 * @default 关闭
 * 
 * @param 缩放速度
 * @parent 缩放效果
 * @desc 缩放大小变化的速度。
 * @default 1.0
 * 
 * @param 缩放幅度范围
 * @parent 缩放效果
 * @desc 缩放变化的比例幅度范围。
 * @default 0.2
 *
 * @param 浮动效果
 * @parent ---选中的按钮---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @desc 当前选中的按钮，会来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 1.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 是否出列
 * @parent ---选中的按钮---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会来回闪烁。
 * @default false
 *
 * @param 选中后出列变化时长
 * @parent 是否出列
 * @type number
 * @min 1
 * @desc 按钮选中后，按钮出列的时间。
 * @default 20
 * 
 * @param 平移-出列相对偏移 X
 * @parent 是否出列
 * @desc 以按钮的位置为基准。x轴方向平移，单位像素。
 * @default 50
 * 
 * @param 平移-出列相对偏移 Y
 * @parent 是否出列
 * @desc 以按钮的位置为基准。y轴方向平移，单位像素。
 * @default 0
 * 
 * 
 * @param ---指针---
 * @desc 
 * 
 * @param 是否显示菜单指针
 * @parent ---指针---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，菜单指针可以指向你当前选中的按钮。需要Drill_MenuCursor插件支持。
 * @default false
 * 
 * @param 是否锁定菜单指针样式
 * @parent ---指针---
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定，按钮组可以指定一个指针样式来装饰。需要Drill_MenuCursor插件支持。
 * @default true
 * 
 * @param 菜单指针样式
 * @parent 是否锁定菜单指针样式
 * @type number
 * @min 1
 * @desc 锁定时，指定的指针样式id，具体见Drill_MenuCursor插件中对应的配置。
 * @default 1
 * 
 * 
 * @param ---输入设备---
 * @desc 
 *
 * @param 鼠标-接近是否自动选中
 * @parent ---输入设备---
 * @type boolean
 * @on 自动选中
 * @off 关闭
 * @desc true - 自动选中，false - 关闭。
 * @default false
 * 
 * @param 鼠标-是否启用滚轮切换
 * @parent ---输入设备---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。鼠标滚轮可以切换选项。
 * @default true
 *
 * @param 滚轮切换间隔
 * @parent 鼠标-是否启用滚轮切换
 * @type number
 * @min 1
 * @desc 持续动滚轮时，选项切换的间隔时间，单位帧。
 * @default 6
 * 
 * @param 键盘-按键模式
 * @parent ---输入设备---
 * @type select
 * @option 只能上下切换
 * @value 只能上下切换
 * @option 只能左右切换
 * @value 只能左右切换
 * @option 能上左与下右切换
 * @value 能上左与下右切换
 * @option 只能上下切换(反向)
 * @value 只能上下切换(反向)
 * @option 只能左右切换(反向)
 * @value 只能左右切换(反向)
 * @option 能上左与下右切换(反向)
 * @value 能上左与下右切换(反向)
 * @option 以矩阵排列框架为准
 * @value 以矩阵排列框架为准
 * @desc 当前选中的按钮，会来回缩放。
 * @default 只能上下切换
 * 
 * @param 键盘-起始与末尾是否循环
 * @parent ---输入设备---
 * @type boolean
 * @on 循环
 * @off 关闭
 * @desc true - 循环，false - 关闭。按键到达末尾项时，自动循环到起始项。
 * @default false
 * 
 * 
 * 
 */
/*~struct~DrillNameMoving:
 *
 * @param 移动类型
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 不移动
 * @value 不移动
 * @desc 初始的移动方式。
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
 * @param 起点-相对坐标 X
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 100
 * 
 * @param 起点-相对坐标 Y
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 */
/*~struct~DrillButtonGroupMoving:
 *
 * @param 移动类型
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 不移动
 * @value 不移动
 * @desc 初始的移动方式。
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
 * @param 依次移动延迟间隔
 * @type number
 * @min 0
 * @desc 每个按钮比前一个按钮延迟移动的间隔时间。
 * @default 10
 *
 * @param ---起点---
 * @default 
 *
 * @param 坐标类型
 * @parent ---起点---
 * @type select
 * @option 各按钮的相对坐标
 * @value 各按钮的相对坐标
 * @option 统一的坐标
 * @value 统一的坐标
 * @desc 起点的坐标类型。
 * @default 各按钮的相对坐标
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
 * @param 起点-统一坐标 X
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最左边，单位像素。
 * @default 0
 * 
 * @param 起点-统一坐标 Y
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最上面，单位像素。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COSB (Core_Of_Selectable_Button)
//		临时全局变量	DrillUp.g_COSB_xxx
//		临时局部变量	this._drill_COSB_xxx
//		存储数据变量	$gameSystem._drill_COSB_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^3)*o(贴图处理)  每帧
//		性能测试因素	主菜单界面
//		性能测试消耗	24.54ms（update函数 9.71ms）
//		最坏情况		出现了100个以上的按钮，不过一般情况下，子插件都会限制最大显示数量。
//		备注			按钮组消耗一般，类似于gif的消耗。
//
//插件记录：
//		★大体框架与功能如下：
//			按钮组核心：
//				->主体
//					->窗口子类类型
//					->移动动画
//					->按钮名称
//					->debug规划网格线
//						->按钮组原点
//						->排列线
//				->模式
//					->固定指针式
//					->流线滚动式		x
//				->按钮贴图
//					->菜单关键字关联（Window_Command）
//					->交错索引列表/默认顺序（Window_Selectable）
//					->鼠标点击选中
//					->单图模式（目前只能单图）
//					x->gif模式+高亮+按下+封印
//				->排列
//					->直线排列
//					->环形排列
//					->矩阵排列
//					->固定离散排列
//				->名称块
//					->固定位置
//					->单一切换
//					->切换时亮光动画	x
//				->额外文本域		?
//					->高宽划分			?
//					->子插件文本编写	?
//				->窗口refresh
//					->按钮名称
//					->按钮贴图
//					->选中的按钮（实时刷）
//				->选中的按钮
//					->指针
//						->连接MenuCursor插件
//					->鼠标再点击进入
//					->鼠标接近自动选中
//					->变化方式
//						->出列、浮动
//						->闪烁、整体透明度
//						->缩放
//				->激活
//					->按钮回落/折回（零散分布于函数中）
//					->激活前状态
//					->激活后状态
//					->按钮移动到指定位置
//					->激活后瞬间隐藏（克隆选中按钮用）	x
//				->输入设备
//					->鼠标-接近是否自动选中	
//					->键盘-按键模式
//					->键盘-起始项终止项是否循环	
//		
//		
//		★配置参数结构体如下：
//			~struct~DrillCOSBCommandButton:			按钮组样式
//			~struct~DrillNameMoving:				名称块移动动画（弹道核心-两点式）
//			~struct~DrillButtonGroupMoving:			按钮组移动动画（弹道核心-两点式）
//			
//		★私有类如下：
//			* Drill_COSB_LayerSprite【按钮组】
//			* Drill_COSB_WindowSprite【单行文字贴图】
//
//		★必要注意事项：
//			1. Window_Selectable是一个父类，单独不可使用。
//				其子类一定会覆写.maxCols和.maxItems函数。
//			2. 如果你的子窗口【覆写了refresh函数】，那么要记得添加刷新标记。
//	
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfSelectableButton = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfSelectableButton');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
		
	//==============================
	// * 变量获取 - 按钮组样式（必须写在前面）
	//				（~struct~DrillCOSBCommandButton）
	//				
	//				说明：函数未定义白色括号中的参数，需要子插件定义。若不定义则为默认值。
	//==============================
	DrillUp.drill_COSB_initSelectableButton = function( dataFrom ) {
		var data = {};
		data['mode'] = String( dataFrom["按钮组模式"] || "固定指针式");
		// > 主体
		//		data['x']【平移x】
		//		data['y']【平移y】
		//		data['btn_constructor']【窗口子类类型】
		data['btn_debugArrange'] = String( dataFrom["DEBUG-规划网格线"] || "false") == "true";
		data['btn_nameEnable'] = String( dataFrom["是否显示按钮名称"] || "false") == "true";
		data['btn_nameFontsize'] = Number( dataFrom["按钮名称字体大小"] || 28);
		data['btn_nameAlign'] = String( dataFrom["按钮名称对齐方式"] || "左对齐");
		if( dataFrom["按钮组移动动画"] != undefined &&
			dataFrom["按钮组移动动画"] != "" ){
			var slideAnimFrom = JSON.parse( dataFrom["按钮组移动动画"] || {} );
			var slideAnim = {};
			slideAnim['slideMoveType'] = String(slideAnimFrom["移动类型"] || "匀速移动");
			slideAnim['slideTime'] = Number(slideAnimFrom["移动时长"] || 20);
			slideAnim['slideDelay'] = Number(slideAnimFrom["移动延迟"] || 0);
			slideAnim['slideOrderlyDelay'] = Number(slideAnimFrom["依次移动延迟间隔"] || 0);
			slideAnim['slidePosType'] = String(slideAnimFrom["坐标类型"] || "各按钮的相对坐标");
			slideAnim['slideX'] = Number(slideAnimFrom["起点-相对坐标 X"] || -100);
			slideAnim['slideY'] = Number(slideAnimFrom["起点-相对坐标 Y"] || 0);
			slideAnim['slideAbsoluteX'] = Number(slideAnimFrom["起点-统一坐标 X"] || 0);
			slideAnim['slideAbsoluteY'] = Number(slideAnimFrom["起点-统一坐标 Y"] || 0);
			data['btn_slideAnim'] = slideAnim;
		}else{
			data['btn_slideAnim'] = {};
		}
		// > 额外文本域
		
		
		// > 排列
		data['arrange_mode'] = String( dataFrom["排列方式"] || "直线排列");
		data['arrange_spacing'] = Number( dataFrom["直线间距"] || 10);
		data['arrange_wSpacing'] = Number( dataFrom["直线W间距"] || 0);
		data['arrange_angle'] = Number( dataFrom["直线旋转角度"] || 0);
		data['arrange_limitEnable'] = String( dataFrom["是否限制最大长度"] || "false") == "true";
		data['arrange_limitLength'] = Number( dataFrom["直线最大长度"] || 600);
		data['arrange_radius'] = Number( dataFrom["环形半径"] || 10);
		data['arrange_angleStart'] = Number( dataFrom["环形起始角"] || 0);
		data['arrange_angleEnd'] = Number( dataFrom["环形终止角"] || 0);
		data['arrange_col'] = Number( dataFrom["矩阵列数"] || 1);
		data['arrange_width'] = Number( dataFrom["矩阵列宽"] || 10);
		data['arrange_height'] = Number( dataFrom["矩阵行高"] || 10);
		if( dataFrom["固定离散位置序列"] != "" &&
			dataFrom["固定离散位置序列"] != undefined ){
			data['arrange_squeeze'] = JSON.parse( dataFrom["固定离散位置序列"] );
		}else{
			data['arrange_squeeze'] = [];
		}
		// > 名称块
		data['name_visible'] = String( dataFrom["是否显示名称块"] || "false") == "true";
		data['name_x'] = Number( dataFrom["平移-名称块 X"] || 0);
		data['name_y'] = Number( dataFrom["平移-名称块 Y"] || 0);
		data['name_fontsize'] = Number( dataFrom["名称块字体大小"] || 22);
		data['name_align'] = String( dataFrom["名称块对齐方式"] || "居中");
		if( dataFrom["名称块移动动画"] != undefined &&
			dataFrom["名称块移动动画"] != "" ){
			var slideAnimFrom = JSON.parse( dataFrom["名称块移动动画"] || {} );
			var slideAnim = {};
			slideAnim['slideMoveType'] = String(slideAnimFrom["移动类型"] || "匀速移动");
			slideAnim['slideTime'] = Number(slideAnimFrom["移动时长"] || 20);
			slideAnim['slideDelay'] = Number(slideAnimFrom["移动延迟"] || 0);
			slideAnim['slideX'] = Number(slideAnimFrom["起点-相对坐标 X"] || -100);
			slideAnim['slideY'] = Number(slideAnimFrom["起点-相对坐标 Y"] || 0);
			data['name_slideAnim'] = slideAnim;
		}else{
			data['name_slideAnim'] = {};
		}
		// > 按钮贴图
		//		data['btn_src_default']【默认资源】
		//		data['btn_src_file']【资源文件夹】
		//		data['btn_src']【资源列表】
		//		data['btn_srcKeyword']【资源关键字列表】
		// > 选中的按钮
		data['selected_opacity_default'] = Number( dataFrom["未选中按钮透明度"] || 160);
		data['selected_opacity_time'] = Number( dataFrom["选中后透明度变化时长"] || 20);
		data['selected_flash'] = String( dataFrom["闪烁效果"] || "关闭");
		data['selected_flashSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['selected_flashRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['selected_swing'] = String( dataFrom["摇晃效果"] || "关闭");
		data['selected_swingSpeed'] = Number( dataFrom["摇晃速度"] || 4.0);
		data['selected_swingRange'] = Number( dataFrom["摇晃幅度范围"] || 12);
		data['selected_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['selected_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['selected_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		data['selected_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['selected_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['selected_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['selected_out'] = String( dataFrom["是否出列"] || "false") == "true";
		data['selected_out_time'] = Number( dataFrom["选中后出列变化时长"] || 20);
		data['selected_out_x'] = Number( dataFrom["平移-出列相对偏移 X"] || 0);
		data['selected_out_y'] = Number( dataFrom["平移-出列相对偏移 Y"] || 0);
		data['selected_recoverImmediately'] = String( dataFrom["失去焦点后是否立刻复原"] || "false") == "true";
		// > 指针
		data['cursor_enable'] = String( dataFrom["是否显示菜单指针"] || "false") == "true";
		data['cursor_lockStyle'] = String( dataFrom["是否锁定菜单指针样式"] || "true") == "true";
		data['cursor_style'] = Number( dataFrom["菜单指针样式"] || 0);
		// > 激活
		//		data['active_enableMouseOk']【鼠标ok点击】
		//		data['active_hide']【激活后是否瞬间隐藏，克隆选中按钮用】
		//		data['active_out']【激活后是否出列】
		//		data['active_out_time']【激活后出列变化时长】
		//		data['active_out_x']【激活后出列x】
		//		data['active_out_y']【激活后出列y】
		// > 输入设备
		data['input_enableMouseHover'] = String( dataFrom["鼠标-接近是否自动选中"] || "false") == "true";
		data['input_enableMouseWheel'] = String( dataFrom["鼠标-是否启用滚轮切换"] || "true") == "true";
		data['input_mouseWheelInterval'] = Number( dataFrom["滚轮切换间隔"] || 6);
		data['input_keyBoardMode'] = String( dataFrom["键盘-按键模式"] || "只能上下切换");
		data['input_keyBoardLoop'] = String( dataFrom["键盘-起始与末尾是否循环"] || "false") == "true";
		
		return data;
	}
	
	
	
	/*-----------------按钮组样式------------------*/
	DrillUp.g_COSB_btn_length = 80;
	DrillUp.g_COSB_btn = [];
	for (var i = 0; i < DrillUp.g_COSB_btn_length; i++) {
		if( DrillUp.parameters["按钮组样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["按钮组样式-" + String(i+1) ] != "" ){
			DrillUp.g_COSB_btn[i] = JSON.parse(DrillUp.parameters["按钮组样式-" + String(i+1) ]);
			DrillUp.g_COSB_btn[i] = DrillUp.drill_COSB_initSelectableButton( DrillUp.g_COSB_btn[i] );		
		}else{
			DrillUp.g_COSB_btn[i] = null;
		}
	}

	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_COSB_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COSB_pluginCommand.call(this, command, args);
	if(command === ">主菜单面板"){
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Menu);
			}
		}
	};
};


//=============================================================================
// ** 按钮组
//=============================================================================
//==============================
// * 按钮组 - 定义
//==============================
function Drill_COSB_LayerSprite() {
	this.initialize.apply(this, arguments);
}
Drill_COSB_LayerSprite.prototype = Object.create(Sprite.prototype);
Drill_COSB_LayerSprite.prototype.constructor = Drill_COSB_LayerSprite;

//==============================
// * 按钮组 - 初始化
//==============================
Drill_COSB_LayerSprite.prototype.initialize = function( data, selectableWindow ) {
	Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	this._drill_window = selectableWindow;					//选项窗口对象
	
	this.drill_initData();				//初始化数据
	this.drill_initWindow();			//初始化窗口
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 按钮组 - 帧刷新
//==============================
Drill_COSB_LayerSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateDelayingInit();	//延迟初始化
	this.drill_updateSprite();			//帧刷新对象
};
//==============================
// * 初始化 - 数据
//==============================
Drill_COSB_LayerSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	data['enable'] = true;	
	if( data['x'] == undefined ){ data['x'] = 0 };													//主体 - 平移x
	if( data['y'] == undefined ){ data['y'] = 0 };													//主体 - 平移y
	if( data['btn_constructor'] == undefined ){ data['btn_constructor'] = "Window_Selectable" };	//主体 - 窗口子类类型（Window_Selectable / Window_Command）
	if( data['btn_debugArrange'] == undefined ){ data['btn_debugArrange'] = false };				//主体 - DEBUG规划网格线
	if( data['btn_nameEnable'] == undefined ){ data['btn_nameEnable'] = false };					//主体 - 是否显示按钮名称
	if( data['btn_nameFontsize'] == undefined ){ data['btn_nameFontsize'] = 28 };					//主体 - 按钮名称字体大小
	if( data['btn_nameAlign'] == undefined ){ data['btn_nameAlign'] = "左对齐" };					//主体 - 按钮名称对齐方式
	if( data['btn_slideAnim'] == undefined ){ data['btn_slideAnim'] = {} };							//主体 - 按钮组移动动画
	if( data['arrange_mode'] == undefined ){ data['arrange_mode'] = "直线排列" };					//排列 - 排列方式
	if( data['arrange_spacing'] == undefined ){ data['arrange_spacing'] = 10 };						//排列 - 直线间距
	if( data['arrange_wSpacing'] == undefined ){ data['arrange_wSpacing'] = 0 };					//排列 - 直线W间距
	if( data['arrange_angle'] == undefined ){ data['arrange_angle'] = 0 };							//排列 - 直线旋转角度
	if( data['arrange_limitEnable'] == undefined ){ data['arrange_limitEnable'] = false };			//排列 - 是否限制最大长度
	if( data['arrange_limitLength'] == undefined ){ data['arrange_limitLength'] = 0 };				//排列 - 直线最大长度
	if( data['arrange_radius'] == undefined ){ data['arrange_radius'] = 10 };						//排列 - 环形半径
	if( data['arrange_angleStart'] == undefined ){ data['arrange_angleStart'] = 0 };				//排列 - 环形起始角
	if( data['arrange_angleEnd'] == undefined ){ data['arrange_angleEnd'] = 0 };					//排列 - 环形终止角
	if( data['arrange_col'] == undefined ){ data['arrange_col'] = 1 };								//排列 - 矩阵列数
	if( data['arrange_width'] == undefined ){ data['arrange_width'] = 10 };							//排列 - 矩阵列宽
	if( data['arrange_height'] == undefined ){ data['arrange_height'] = 10 };						//排列 - 矩阵行高
	if( data['arrange_squeeze'] == undefined ){ data['arrange_squeeze'] = [] };						//排列 - 固定位置序列（["200,200","0,0"] 字符串数组）
	if( data['name_visible'] == undefined ){ data['name_visible'] = false };						//名称块 - 是否显示
	if( data['name_x'] == undefined ){ data['name_x'] = 0 };										//名称块 - 平移x
	if( data['name_y'] == undefined ){ data['name_y'] = 0 };										//名称块 - 平移y
	if( data['name_fontsize'] == undefined ){ data['name_fontsize'] = 22 };							//名称块 - 名称块字体大小
	if( data['name_align'] == undefined ){ data['name_align'] = "居中" };							//名称块 - 名称块对齐方式
	if( data['name_slideAnim'] == undefined ){ data['name_slideAnim'] = {} };						//名称块 - 名称块移动动画
	if( data['btn_src_default'] == undefined ){ data['btn_src_default'] = "" };						//贴图 - 默认资源
	if( data['btn_src_file'] == undefined ){ data['btn_src_file'] = "img/system/" };				//贴图 - 资源文件夹
	if( data['btn_src'] == undefined ){ data['btn_src'] = [] };										//贴图 - 资源列表
	if( data['btn_srcKeyword'] == undefined ){ data['btn_srcKeyword'] = [] };						//贴图 - 资源关键字列表
	if( data['selected_opacity_default'] == undefined ){ data['selected_opacity_default'] = 160 };	//选中的按钮 - 未选中按钮透明度
	if( data['selected_opacity_time'] == undefined ){ data['selected_opacity_time'] = 20 };			//选中的按钮 - 选中后透明度变化时长
	if( data['selected_flash'] == undefined ){ data['selected_flash'] = "关闭" };					//选中的按钮 - 闪烁效果
	if( data['selected_flashSpeed'] == undefined ){ data['selected_flashSpeed'] = 6.0 };			//选中的按钮 - 闪烁速度
	if( data['selected_flashRange'] == undefined ){ data['selected_flashRange'] = 20 };				//选中的按钮 - 闪烁幅度范围
	if( data['selected_swing'] == undefined ){ data['selected_swing'] = "关闭" };					//选中的按钮 - 摇晃效果
	if( data['selected_swingSpeed'] == undefined ){ data['selected_swingSpeed'] = 20 };				//选中的按钮 - 摇晃速度
	if( data['selected_swingRange'] == undefined ){ data['selected_swingRange'] = 20 };				//选中的按钮 - 摇晃幅度范围
	if( data['selected_zoom'] == undefined ){ data['selected_zoom'] = "关闭" };						//选中的按钮 - 缩放效果
	if( data['selected_zoomSpeed'] == undefined ){ data['selected_zoomSpeed'] = 20 };				//选中的按钮 - 缩放速度
	if( data['selected_zoomRange'] == undefined ){ data['selected_zoomRange'] = 20 };				//选中的按钮 - 缩放幅度范围
	if( data['selected_float'] == undefined ){ data['selected_float'] = "关闭" };					//选中的按钮 - 浮动效果
	if( data['selected_floatSpeed'] == undefined ){ data['selected_floatSpeed'] = 20 };				//选中的按钮 - 浮动速度
	if( data['selected_floatRange'] == undefined ){ data['selected_floatRange'] = 20 };				//选中的按钮 - 浮动偏移量
	if( data['selected_out'] == undefined ){ data['selected_out'] = false };						//选中的按钮 - 是否出列
	if( data['selected_out_time'] == undefined ){ data['selected_out_time'] = 20 };					//选中的按钮 - 选中后出列变化时长
	if( data['selected_out_x'] == undefined ){ data['selected_out_x'] = 20 };						//选中的按钮 - 出列x
	if( data['selected_out_y'] == undefined ){ data['selected_out_y'] = 20 };						//选中的按钮 - 出列y
	if( data['selected_recoverImmediately'] == undefined ){ data['selected_recoverImmediately'] = false };//选中的按钮 - 失去焦点后立刻复原
	if( data['active_enableMouseOk'] == undefined ){ data['active_enableMouseOk'] = false };		//激活 - 鼠标ok点击
	if( data['active_hide'] == undefined ){ data['active_hide'] = false };							//激活 - 激活后是否瞬间隐藏（克隆选中按钮用）
	if( data['active_out'] == undefined ){ data['active_out'] = false };							//激活 - 激活后是否出列
	if( data['active_out_time'] == undefined ){ data['active_out_time'] = 20 };						//激活 - 激活后出列变化时长
	if( data['active_out_x'] == undefined ){ data['active_out_x'] = 100 };							//激活 - 激活后出列x
	if( data['active_out_y'] == undefined ){ data['active_out_y'] = 100 };							//激活 - 激活后出列y
	if( data['input_enableMouseHover'] == undefined ){ data['input_enableMouseHover'] = false };	//输入设备 - 鼠标接近选中
	if( data['input_enableMouseWheel'] == undefined ){ data['input_enableMouseWheel'] = true };		//输入设备 - 滚轮切换
	if( data['input_mouseWheelInterval'] == undefined ){ data['input_mouseWheelInterval'] = 6 };	//输入设备 - 滚轮切换间隔
	if( data['input_keyBoardMode'] == undefined ){ data['input_keyBoardMode'] = "只能上下切换" };	//输入设备 - 键盘按键模式
	if( data['input_keyBoardLoop'] == undefined ){ data['input_keyBoardLoop'] = false };			//输入设备 - 键盘起始与末尾是否循环
	
	// > 窗口修改开关
	//		（如果你不想让按钮组破坏原来的窗口，可设置false，但是会影响部分按钮组功能）
	if( data['enable_windowRebuild'] == undefined ){ data['enable_windowRebuild'] = true };
	
};
//==============================
// * 初始化 - 窗口
//==============================
Drill_COSB_LayerSprite.prototype.drill_initWindow = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	
	if( temp_data['enable_windowRebuild'] == true ){
	
		// > 数据赋值
		this._drill_window._drill_COSB_data = this._drill_data;
		
		// > 强制窗口可见按钮数量
		if( temp_window.numVisibleRows == undefined ){
			temp_window.numVisibleRows = function(){
				return this.maxItems();
			};
		};
		// > 强制窗口选项高度（在高度不够时，避免topIndex + 1）
		temp_window.itemHeight = function(){
			var clientHeight = this.height - this.padding * 2;
			return Math.floor(clientHeight / this.numVisibleRows());
		};
		// > 强制窗口列
		temp_window._drill_COSB_maxCols = temp_window.maxCols;
		temp_window.maxCols = function(){
			var data = this._drill_COSB_data;
			if( data && data['input_keyBoardMode'] == "只能上下切换" ){ return 1; }
			if( data && data['input_keyBoardMode'] == "只能左右切换" ){ return 1; }	//（键盘被锁死只能 cursorDown 和 cursorUp）
			if( data && data['input_keyBoardMode'] == "能上左与下右切换" ){ return 1; }
			if( data && data['input_keyBoardMode'] == "只能上下切换(反向)" ){ return 1; }
			if( data && data['input_keyBoardMode'] == "只能左右切换(反向)" ){ return 1; }
			if( data && data['input_keyBoardMode'] == "能上左与下右切换(反向)" ){ return 1; }
			return this._drill_COSB_maxCols.call(this);	//以矩阵排列框架为准
		};
		// > 键盘按键模式（函数继承）
		temp_window._drill_COSB_processCursorMove = temp_window.processCursorMove;
		temp_window.processCursorMove = function(){
			var data = this._drill_COSB_data;
			if( data && this.isCursorMovable() ){
				var lastIndex = this.index();
				
				if( data['input_keyBoardMode'] == "只能上下切换" ){
					// > 下
					if( Input.isRepeated('down') ){
						this.drill_COSB_cursorForward( lastIndex );
						return;
					};
					// > 上
					if( Input.isRepeated('up') ){
						this.drill_COSB_cursorBack( lastIndex );
						return;
					};
				}
				if( data['input_keyBoardMode'] == "只能左右切换" ){
					// > 右
					if( Input.isRepeated('right') ){
						this.drill_COSB_cursorForward( lastIndex );
						return;
					};
					// > 左
					if( Input.isRepeated('left') ){
						this.drill_COSB_cursorBack( lastIndex );
						return;
					};
					if( Input.isRepeated('down') || Input.isRepeated('up') ){ return; }
					
				}
				if( data['input_keyBoardMode'] == "能上左与下右切换" ){
					// > 下、右
					if( Input.isRepeated('down') || Input.isRepeated('right') ){
						this.drill_COSB_cursorForward( lastIndex );
						return;
					};
					// > 上、左
					if( Input.isRepeated('up') || Input.isRepeated('left') ){
						this.drill_COSB_cursorBack( lastIndex );
						return;
					};
				}
				if( data['input_keyBoardMode'] == "只能上下切换(反向)" ){
					// > 上
					if( Input.isRepeated('up') ){
						this.drill_COSB_cursorForward( lastIndex );
						return;
					};
					// > 下
					if( Input.isRepeated('down') ){
						this.drill_COSB_cursorBack( lastIndex );
						return;
					};
				}
				if( data['input_keyBoardMode'] == "只能左右切换(反向)" ){
					// > 左
					if( Input.isRepeated('left') ){
						this.drill_COSB_cursorForward( lastIndex );
						return;
					};
					// > 右
					if( Input.isRepeated('right') ){
						this.drill_COSB_cursorBack( lastIndex );
						return;
					};
					if( Input.isRepeated('down') || Input.isRepeated('up') ){ return; }
					
				}
				if( data['input_keyBoardMode'] == "能上左与下右切换(反向)" ){
					// > 上、左
					if( Input.isRepeated('up') || Input.isRepeated('left') ){
						this.drill_COSB_cursorForward( lastIndex );
						return;
					};
					// > 下、右
					if( Input.isRepeated('down') || Input.isRepeated('right') ){
						this.drill_COSB_cursorBack( lastIndex );
						return;
					};
				}
			};
			this._drill_COSB_processCursorMove.call(this);
		};
		// > 强制去掉鼠标滚轮（放在 drill_updateMouseWheelSelect 中处理）
		temp_window.processWheel = function(){ };
		
	};
	
	
	// > 子类检验
	if( temp_data['btn_constructor'] == "Window_Selectable" ){
		if( temp_window._list == undefined ){
			alert("系统-按钮组核心：\n窗口继承项Window_Selectable错误，注意参数配置。");
		}
	}
	if( temp_data['btn_constructor'] == "Window_Command" ){
		if( temp_window instanceof Window_Command == false ){
			alert("系统-按钮组核心：\n窗口继承项Window_Command错误，注意参数配置。");
		}
	}
	
	// > 特殊参数（外部接口参数都在这里传，注意不要把sprite自己指针传给 window ）
	//	
	//		1."_drill_COSB_isOccupyed"表示这个窗口被按钮组占领了，
	//			用于判断选项窗口是否被装饰。
	temp_window._drill_COSB_isOccupyed = true;
	//
	//		2.当['btn_constructor'] == "Window_Selectable" 时，
	//			在window上挂一个 ._drill_COSB_indexList 交错索引列表，可以使得按钮按 索引列表 的顺序对应 ，
	//			如果没有该交错列表，那么则默认文档中的"关于按钮组核心.docx"顺序对应。
	//
	//		3."_drill_COSB_curStatus"用于监听窗口确认/取消情况。
	//			在 窗口未激活 + status为"cancel" 时，按钮处于 "激活前状态"。
	//			在 窗口未激活 + status为"ok" 时，    按钮处于 "激活后状态"。
	temp_window._drill_COSB_curStatus = "cancel";
	//	
	//		4."_drill_COSB_selectedBtnX"表示选中按钮的坐标，
	//			给菜单指针用的。
	temp_window._drill_COSB_selectedBtnX = 0;
	temp_window._drill_COSB_selectedBtnY = 0;
	temp_window._drill_COSB_forceCursorStyle = 0;
	
};
//==============================
// * 初始化 - 对象
//==============================
Drill_COSB_LayerSprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this._drill_time = 0;							//时间
	this._drill_index = -1;							//当前索引
	
	this._drill_button_needInit = true;				//按钮集合 - 初始化
	this._drill_button_spriteTank = [];				//按钮集合 - 贴图（与实际窗口出现的选项一一对应，且顺序一致）
	this._drill_button_orgPositionTank = [];		//按钮集合 - 原始坐标集
	this._drill_name_sprite = null;					//名称块 - 按钮块
	this._drill_name_window = null;					//名称块 - 按钮文本对象
	this._drill_name_curIndex = -1;					//名称块 - 当前选项
	
	this._drill_last_mouse_x = 0;					//鼠标接近自动选中 - 记录
	this._drill_last_mouse_y = 0;					//
	
	// > 主体属性
	this.width = Graphics.boxWidth;
	this.height = Graphics.boxHeight;
	
	// > 创建函数
	this.drill_createLayer();				//创建 - 层级
	this.drill_createDebugArrange();		//创建 - DEBUG规划网格线
	this.drill_createButton();				//创建 - 按钮集合
	this.drill_createName();				//创建 - 名称块
	
	// > 强制窗口refresh
	this._drill_window.refresh();
};
//==============================
// * 创建 - 层级
//==============================
Drill_COSB_LayerSprite.prototype.drill_createLayer = function() {
	var data = this._drill_data;
	
	// > 层级初始化
	this._layer_context = new Sprite();				//内容层
	this._layer_context.x = data['x'];				//
	this._layer_context.y = data['y'];				//
	this.addChild(this._layer_context);				//
	this._layer_outer = new Sprite();				//外层
	this.addChild(this._layer_outer);				//
}
//==============================
// * 创建 - DEBUG规划网格线
//==============================
Drill_COSB_LayerSprite.prototype.drill_createDebugArrange = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	if( temp_data['btn_debugArrange'] == false ){ return; }
	
	var temp_sprite = new Sprite();
	var temp_bitmap = null;
	// > 直线排列
	if( temp_data['arrange_mode'] == "直线排列" ){
		// > 延长线
		temp_bitmap = new Bitmap( 2400, temp_data['arrange_wSpacing'] );
		temp_bitmap.fillRect(0,0,2400,2,"#ff0000");
		// > 偶数线与奇数点
		var count = 2400 / temp_data['arrange_spacing'];
		for(var i=0; i < count; i++){
			if( i % 2 == 1 ){
				temp_bitmap.fillRect( temp_data['arrange_spacing']*i,0,2,temp_data['arrange_wSpacing'],"#ffff00");
			}else{
				temp_bitmap.drawCircle( temp_data['arrange_spacing']*i,0,4,"#ffff00");
			}
		}
		// > 按钮组原点
		temp_bitmap.drawCircle(1,1,2,"#ff00ff");
		temp_sprite.anchor.x = 0.0;
		temp_sprite.anchor.y = 0.0;
		temp_sprite.rotation = temp_data['arrange_angle'] / 180.0 * Math.PI;
	}
	// > 环形排列
	if( temp_data['arrange_mode'] == "环形排列" ){
		var r = temp_data['arrange_radius'];
		temp_bitmap = new Bitmap( r*2, r*2 );
		// > 圆心
		temp_bitmap.drawCircle(r,r,4,"#ffff00");
		// > 圆弧
		var context = temp_bitmap._context;
		context.save();
		context.beginPath();
		context.arc( r, r, r, 0, Math.PI * 2, false);
		context.strokeStyle = "#ff0000";
		context.stroke();
		context.closePath();
		context.restore();
		temp_bitmap._setDirty();
		// > 起始角
		var temp_spriteStart = new Sprite();
		temp_spriteStart.bitmap = new Bitmap( r,2 );
		temp_spriteStart.bitmap.fillAll("#ffff00");
		temp_spriteStart.rotation = temp_data['arrange_angleStart'] / 180.0 * Math.PI;
		temp_sprite.addChild(temp_spriteStart);
		// > 终止角
		var temp_spriteEnd = new Sprite();
		temp_spriteEnd.bitmap = new Bitmap( r,2 );
		temp_spriteEnd.bitmap.fillAll("#ff0000");
		temp_spriteEnd.y = -2;
		temp_spriteEnd.rotation = temp_data['arrange_angleEnd'] / 180.0 * Math.PI;
		temp_sprite.addChild(temp_spriteEnd);
		// > 按钮组原点
		temp_bitmap.drawCircle(r,r,2,"#ff00ff");
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
	}
	// > 矩阵排列
	if( temp_data['arrange_mode'] == "矩阵排列" ){
		var count = temp_window.maxItems();
		// > 画布空间
		var width = temp_data['arrange_col'] * temp_data['arrange_width'];
		var height = temp_data['arrange_col'] * temp_data['arrange_height'];	//（干脆多给点空间）
		temp_bitmap = new Bitmap( width, height );
		// > 圆点 和 向左连接线
		for(var i = 0; i < count; i++ ){
			var xx = Math.floor(i % temp_data['arrange_col']) * temp_data['arrange_width'] ;
			var yy = Math.floor(i / temp_data['arrange_col']) * temp_data['arrange_height'] ;
			temp_bitmap.drawCircle(xx,yy,4,"#ffff00");
			if( i % temp_data['arrange_col'] != temp_data['arrange_col'] - 1 ||		//（末尾的按钮不加向左的连接线）
				i != count - 1 ){
				temp_bitmap.fillRect(xx,yy,temp_data['arrange_width'],2,"#ff0000");
			}
		}
		// > 按钮组原点
		temp_bitmap.drawCircle(1,1,2,"#ff00ff");
		temp_sprite.anchor.x = 0.0;
		temp_sprite.anchor.y = 0.0;
	}
	// > 固定离散排列
	if( temp_data['arrange_mode'] == "固定离散排列" ){
		// > 固定坐标点
		for( var i=0; i < temp_data['arrange_squeeze'].length; i++ ){
			var str = String( temp_data['arrange_squeeze'][i] );
			str = str.replace("(","");
			str = str.replace(")","");
			var str_arr = str.split(",");
			var temp_spritePoint = new Sprite();
			temp_spritePoint.bitmap = new Bitmap( 2,2 );
			temp_spritePoint.bitmap.fillAll("#ffff00");
			temp_spritePoint.x = Number( str_arr[0] );
			temp_spritePoint.y = Number( str_arr[1] );
			temp_sprite.addChild(temp_spritePoint);
		}
		// > 按钮组原点
		temp_bitmap.drawCircle(2,2,4,"#ff00ff");
		temp_sprite.anchor.x = 0.0;
		temp_sprite.anchor.y = 0.0;
	}
	
	temp_sprite.bitmap = temp_bitmap;
	this._layer_context.addChild(temp_sprite);
}
//==============================
// * 创建 - 按钮集合
//==============================
Drill_COSB_LayerSprite.prototype.drill_createButton = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	
	this._drill_button_spriteTank = [];
	this._drill_button_orgPositionTank = [];
	var count = temp_window.maxItems();
	if( count > temp_window.numVisibleRows() ){
		count = temp_window.numVisibleRows()
	}
	for( var i = 0; i < count; i++ ){
		
		// > 按钮贴图
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.loadBitmap( temp_data['btn_src_file'], temp_data['btn_src_default'], 0, true);
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.visible = false;
		
		// > 按钮排列
		var orgX = 0;
		var orgY = 0;
		if( temp_data['arrange_mode'] == "直线排列" ){
			var xx = temp_data['arrange_spacing'] * i;
			var yy = (i % 2) * temp_data['arrange_wSpacing'];
			var angle = temp_data['arrange_angle'] / 180.0 * Math.PI;
			if( count > 1 && 	//（限宽）
				temp_data['arrange_limitEnable'] == true &&	
				temp_data['arrange_spacing'] * (count - 1) > temp_data['arrange_limitLength'] ){
				xx = temp_data['arrange_limitLength'] / (count - 1) * i;
			}
			orgX = xx * Math.cos(angle) - yy * Math.sin(angle);
			orgY = xx * Math.sin(angle) + yy * Math.cos(angle);
		}
		if( temp_data['arrange_mode'] == "环形排列" ){
			if( Math.abs( temp_data['arrange_angleStart'] - temp_data['arrange_angleEnd'] ) % 360 == 0 ){
				var angle = 360 * i / count + temp_data['arrange_angleStart'];
				angle = angle / 180.0 * Math.PI;
				orgX = temp_data['arrange_radius'] * Math.cos(angle) ;
				orgY = temp_data['arrange_radius'] * Math.sin(angle) ;
			}else{
				var angle = (temp_data['arrange_angleEnd'] - temp_data['arrange_angleStart']) * i / (count-1) + temp_data['arrange_angleStart'];
				angle = angle / 180.0 * Math.PI;
				orgX = temp_data['arrange_radius'] * Math.cos(angle) ;
				orgY = temp_data['arrange_radius'] * Math.sin(angle) ;
			}
		}
		if( temp_data['arrange_mode'] == "矩阵排列" ){
			orgX = Math.floor(i % temp_data['arrange_col']) * temp_data['arrange_width'] ;
			orgY = Math.floor(i / temp_data['arrange_col']) * temp_data['arrange_height'] ;
		}
		if( temp_data['arrange_mode'] == "固定离散排列" ){
			if( temp_data['arrange_squeeze'][i] != undefined ){
				var str = String( temp_data['arrange_squeeze'][i] );
				str = str.replace("(","");
				str = str.replace(")","");
				var str_arr = str.split(",");
				orgX = Number( str_arr[0] );
				orgY = Number( str_arr[1] );
			}
		}
		temp_sprite['_org_x'] = orgX;
		temp_sprite['_org_y'] = orgY;
		temp_sprite.x = orgX;
		temp_sprite.y = orgY;
		
		// > 按钮添加
		this._layer_context.addChild(temp_sprite);
		this._drill_button_spriteTank[i] = temp_sprite;
		var pos = { "x" : orgX, "y" : orgY };
		this._drill_button_orgPositionTank.push( pos );
		
		// > 显示按钮名称
		if( temp_data['btn_nameEnable'] == true ){
			var data = {};
			data['align'] = temp_data['btn_nameAlign'];
			data['fontsize'] = temp_data['btn_nameFontsize'];
			if( temp_data['btn_constructor'] == "Window_Command" ){
				data['text'] = String(temp_window.commandName(i));
			}
			if( temp_data['btn_constructor'] == "Window_Selectable" ){
				data['text'] = String(temp_window._list[i]);
			}
			var temp_childWindow = new Drill_COSB_WindowSprite( data );
			temp_sprite.addChild(temp_childWindow);
			temp_sprite._drill_COSB_btnNameWindow = temp_childWindow;
		}
		
		
		// > 移动动画参数 转 两点式弹道
		var data = {};
		data['movementMode'] = "两点式";
		data['movementTime'] = temp_data['btn_slideAnim']['slideTime'];
		data['movementDelay']= temp_data['btn_slideAnim']['slideDelay'] + i * temp_data['btn_slideAnim']['slideOrderlyDelay'];		//间隔+依次间隔
		data['twoPointType'] = temp_data['btn_slideAnim']['slideMoveType'];
		if( temp_data['btn_slideAnim']['slidePosType'] == "各按钮的相对坐标" ){
			data['twoPointDifferenceX'] = temp_data['btn_slideAnim']['slideX'];
			data['twoPointDifferenceY'] = temp_data['btn_slideAnim']['slideY'];
		}else{
			data['twoPointDifferenceX'] = temp_data['btn_slideAnim']['slideAbsoluteX'] - temp_sprite.x;
			data['twoPointDifferenceY'] = temp_data['btn_slideAnim']['slideAbsoluteY'] - temp_sprite.y;
		}
		
		// > 弹道初始化
		$gameTemp.drill_COBa_setBallisticsMove( data );												//初始化
		$gameTemp.drill_COBa_preBallisticsMove( temp_sprite, i , temp_sprite.x, temp_sprite.y );	//推演赋值
		temp_sprite._drill_foldTime = 0;		//播放帧时间置零
		
		// > 选中属性初始化
		temp_sprite['_select_periodTime'] = 0;		//选中时间（周期类）
		temp_sprite['_select_outTime'] = 0;			//选中时间（出列控制）
		temp_sprite['_select_opacityTime'] = 0;		//选中时间（透明度控制）
		
		// > 激活属性初始化
		temp_sprite['_active_outTime'] = 0;			//选中时间（出列控制）
	}
}
//==============================
// * 创建 - 名称块
//==============================
Drill_COSB_LayerSprite.prototype.drill_createName = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	
	// > 名称块贴图
	var temp_layer = new Sprite();
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	temp_layer.x = temp_data['name_x'];
	temp_layer.y = temp_data['name_y'];
	temp_layer.visible = temp_data['name_visible'];
	this._layer_context.addChild(temp_layer);
	this._drill_name_sprite = temp_layer;
	
	// > 名称块文字
	var data = {};
	data['align'] = temp_data['name_align'];
	data['fontsize'] = temp_data['name_fontsize'];
	data['text'] = "";
	var temp_childWindow = new Drill_COSB_WindowSprite( data );
	temp_layer.addChild( temp_childWindow );
	this._drill_name_window = temp_childWindow;
	
	// > 名称块移动动画 转 两点式弹道
	var data = {};
	data['movementMode'] = "两点式";
	data['movementTime'] = temp_data['name_slideAnim']['slideTime'];
	data['movementDelay']= temp_data['name_slideAnim']['slideDelay'];		//间隔+依次间隔
	data['twoPointType'] = temp_data['name_slideAnim']['slideMoveType'];
	data['twoPointDifferenceX'] = temp_data['name_slideAnim']['slideX'];	//只能相对坐标
	data['twoPointDifferenceY'] = temp_data['name_slideAnim']['slideY'];
	
	// > 弹道初始化
	$gameTemp.drill_COBa_setBallisticsMove( data );											//初始化
	$gameTemp.drill_COBa_preBallisticsMove( temp_layer, 0 , temp_layer.x, temp_layer.y );	//推演赋值
	temp_layer._drill_foldTime = 0;		//播放帧时间置零
}


//==============================
// * 帧刷新 - 延迟初始化
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateDelayingInit = function() {
	// > 按钮加载
	if( this.drill_isAllButtonReady() && this._drill_button_needInit ){	
		this._drill_button_needInit = false;
		for( var i = 0; i < this._drill_button_spriteTank.length; i++ ){
			var temp_sprite = this._drill_button_spriteTank[i];
			temp_sprite.visible = true;
			temp_sprite.opacity = 0;
		}
	}
}
//==============================
// * 帧刷新 - 帧刷新对象
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateSprite = function() {
	if( this._drill_button_needInit == true ){ return; }	//未初始化完毕，不执行update
	
	this._drill_time += 1;
	this.drill_updateNameSprite();					//名称块
	
	this.drill_updateButtonAttrInit();				//按钮 - 固定帧初始值
	this.drill_updateButtonStartMove();				//按钮 - 起点移动
	this.drill_updateButtonStreamlineMove();		//按钮 - 流线式移动
	this.drill_updateButtonSelectionCursor();		//按钮 - 选中的按钮指针跟随
	this.drill_updateButtonSelectionTransfer();		//按钮 - 选中非选中变换
	this.drill_updateButtonActiveTransfer();		//按钮 - 激活后变换
	this.drill_updateButtonAttrSet();				//按钮 - 固定帧赋值
	
	this.drill_updateMouseSelect();					//按钮 - 鼠标点击选中
	this.drill_updateMouseHoverSelect();			//按钮 - 鼠标接近自动选中
	this.drill_updateMouseWheelSelect();			//按钮 - 鼠标滚轮切换
	this.drill_updateButtonRefresh();				//按钮 - refresh
}
//==============================
// * 帧刷新 - 按钮 固定帧初始值
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonAttrInit = function() {
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		
		temp_sprite['_x'] = 0;				// x
		temp_sprite['_y'] = 0;				// y
		temp_sprite['_opacity'] = 0;		// 透明度
		temp_sprite['_rotation'] = 0;		// 旋转
		temp_sprite['_scale_x'] = 1; 		// 缩放x
		temp_sprite['_scale_y'] = 1; 		// 缩放y
		temp_sprite['_skew_x'] = 0;  		// 斜切x
		temp_sprite['_skew_y'] = 0;  		// 斜切y
	}
}
//==============================
// * 帧刷新 - 按钮 固定帧赋值
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonAttrSet = function() {
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		
		if( temp_sprite.x != temp_sprite['_x'] ){ temp_sprite.x = temp_sprite['_x']; }								// x
		if( temp_sprite.y != temp_sprite['_y'] ){ temp_sprite.y = temp_sprite['_y']; }								// y
		if( temp_sprite.opacity != temp_sprite['_opacity'] ){ temp_sprite.opacity = temp_sprite['_opacity']; }		// 透明度
		if( temp_sprite.rotation != temp_sprite['_rotation'] ){ temp_sprite.rotation = temp_sprite['_rotation']; }	// 旋转
		if( temp_sprite.scale.x != temp_sprite['_scale_x'] ){ temp_sprite.scale.x = temp_sprite['_scale_x']; }		// 缩放x
		if( temp_sprite.scale.y != temp_sprite['_scale_y'] ){ temp_sprite.scale.y = temp_sprite['_scale_y']; }		// 缩放y
		if( temp_sprite.skew.x != temp_sprite['_skew_x'] ){ temp_sprite.skew.x = temp_sprite['_skew_x']; }			// 斜切x
		if( temp_sprite.skew.y != temp_sprite['_skew_y'] ){ temp_sprite.skew.y = temp_sprite['_skew_y']; }			// 斜切y
	}
}
//==============================
// * 帧刷新 - 名称块
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateNameSprite = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	if( temp_data['name_visible'] == false ){ return; }
	
	// > 播放轨迹
	var temp_sprite = this._drill_name_sprite;
	var end_index = temp_sprite['_drill_COBa_x'].length - 1;
	if( temp_window.isOpenAndActive() ){ 
		temp_sprite._drill_foldTime += 1;
	}else{
		temp_sprite._drill_foldTime -= 1;
	}
	if( temp_sprite._drill_foldTime > end_index ){ temp_sprite._drill_foldTime = end_index; }
	if( temp_sprite._drill_foldTime < 0 ){ temp_sprite._drill_foldTime = 0; }
	
	var time = temp_sprite._drill_foldTime;
	var xx = temp_data['name_x'] + temp_sprite['_drill_COBa_x'][ end_index ] - temp_sprite['_drill_COBa_x'][ time ];
	var yy = temp_data['name_y'] + temp_sprite['_drill_COBa_y'][ end_index ] - temp_sprite['_drill_COBa_y'][ time ];
	temp_sprite.x = Math.floor(xx);
	temp_sprite.y = Math.floor(yy);
	temp_sprite.opacity = 255 * time / end_index;
	
	
	// > 选项变化
	if( temp_window.index() == -1 ){ return; }
	if( temp_window.index() == this._drill_name_curIndex ){ return; }
	this._drill_name_curIndex = temp_window.index();
	
	// > 选项名
	var result_str = "";
	if( temp_data['btn_constructor'] == "Window_Command" ){
		result_str = String(temp_window.commandName( this._drill_name_curIndex ));
	}
	if( temp_data['btn_constructor'] == "Window_Selectable" ){
		result_str = String(temp_window._list[ this._drill_name_curIndex ]);
	}
	this._drill_name_window.setText( result_str );
	
	// > 轨迹重置
	this._drill_name_sprite._drill_foldTime = 0;
}
//==============================
// * 帧刷新 - 按钮 起点移动
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonStartMove = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		
		// > 激活与未激活（可折回倒转的移动）
		var end_index = temp_sprite['_drill_COBa_x'].length - 1;
		if( temp_window.isOpenAndActive() ){ 
			temp_sprite._drill_foldTime += 1;
		}else{
			temp_sprite._drill_foldTime -= 1;
		}
		if( temp_sprite._drill_foldTime > end_index ){ temp_sprite._drill_foldTime = end_index; }
		if( temp_sprite._drill_foldTime < 0 ){ temp_sprite._drill_foldTime = 0; }
		
		// > 播放轨迹（注意，轨迹都在temp_sprite中）
		var time = temp_sprite._drill_foldTime;
		var xx = temp_sprite['_org_x'] + temp_sprite['_drill_COBa_x'][ end_index ] - temp_sprite['_drill_COBa_x'][ time ];
		var yy = temp_sprite['_org_y'] + temp_sprite['_drill_COBa_y'][ end_index ] - temp_sprite['_drill_COBa_y'][ time ];
		var oo = temp_data['selected_opacity_default'] * time / end_index;
		
		//if( temp_data['btn_slideAnim']['slideMoveType'] == "不移动" ){
		//	（注意，不移动的轨迹，是真的不会移动，终点设置无效的，链式移动时，要注意该情况。）
		//}
		
		// > 属性赋值
		temp_sprite['_opacity'] += oo;
		temp_sprite['_x'] += Math.floor(xx);
		temp_sprite['_y'] += Math.floor(yy);
	}
}
//==============================
// * 帧刷新 - 按钮 流线式移动
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonStreamlineMove = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	
	//...
}
//==============================
// * 帧刷新 - 按钮 选中的按钮指针跟随
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonSelectionCursor = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	if( temp_data['cursor_enable'] == false ){ return; }
	
	var btn_index = temp_window.index() - temp_window.topIndex();
	if( btn_index == -1 ){ return; }
	if( btn_index >= this._drill_button_spriteTank.length ){ return; }
	var selected_sprite = this._drill_button_spriteTank[btn_index];
	
	if(!temp_window.isOpenAndActive() ){ return; } 	//（窗口未激活时，不操作）
	
	// > 将坐标赋值到窗口
	temp_window._drill_COSB_selectedBtnX = this.drill_getSpriteAbsoluteX(selected_sprite);
	temp_window._drill_COSB_selectedBtnY = this.drill_getSpriteAbsoluteY(selected_sprite);
	if( temp_data['cursor_lockStyle'] == false ){
		temp_window._drill_COSB_forceCursorStyle = 0;
	}else{
		temp_window._drill_COSB_forceCursorStyle = temp_data['cursor_style'];
	}
}
//==============================
// * 帧刷新 - 按钮 选中非选中变换
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonSelectionTransfer = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	var btn_index = temp_window.index() - temp_window.topIndex();
	if( btn_index == -1 ){ return; }
	if( btn_index >= this._drill_button_spriteTank.length ){ return; }
	
	var selected_sprite = this._drill_button_spriteTank[btn_index];
	if(!temp_window.isOpenAndActive() ){ 	//（窗口未激活时，激活对象置空）
		selected_sprite = {};
	}
	
	// > 选中的按钮 - 时间+1
	selected_sprite['_select_periodTime'] += 1;
	selected_sprite['_select_periodTime'] %= 360;
	
	// > 选中的按钮 - 透明度时间+1
	if( temp_data['selected_flash'] != "开启" ){
		selected_sprite['_select_opacityTime'] += 1;
		if( selected_sprite['_select_opacityTime'] > temp_data['selected_opacity_time'] ){
			selected_sprite['_select_opacityTime'] = temp_data['selected_opacity_time'];
		}
	}
	
	// > 选中的按钮 - 出列时间+1
	if( temp_data['selected_out'] == true ){
		selected_sprite['_select_outTime'] += 1;
		if( selected_sprite['_select_outTime'] > temp_data['selected_out_time'] ){
			selected_sprite['_select_outTime'] = temp_data['selected_out_time'];
		}
	}
	
	
	// > 非选中的按钮 - 时间回落
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		if( temp_sprite == selected_sprite ){ continue; }
		
		// > 周期瞬间恢复
		if( temp_data['selected_recoverImmediately'] == true ){
			temp_sprite['_select_periodTime'] = 0;
		}
		
		// > 周期时间稳定值（sin公式回落）
		if( temp_sprite['_select_periodTime'] == 0 ){ continue; }
		if( temp_sprite['_select_periodTime'] == 180 ){ continue; }
		if( temp_sprite['_select_periodTime'] == 360 ){ continue; }
		if( temp_sprite['_select_periodTime'] > 0 &&
			temp_sprite['_select_periodTime'] <= 90 ){
			temp_sprite['_select_periodTime'] -= 1;
		}
		if( temp_sprite['_select_periodTime'] > 90 &&
			temp_sprite['_select_periodTime'] < 180 ){
			temp_sprite['_select_periodTime'] += 1;
		}
		if( temp_sprite['_select_periodTime'] > 180 &&
			temp_sprite['_select_periodTime'] < 270 ){
			temp_sprite['_select_periodTime'] -= 1;
		}
		if( temp_sprite['_select_periodTime'] >= 270 &&
			temp_sprite['_select_periodTime'] < 360 ){
			temp_sprite['_select_periodTime'] += 1;
		}
	}
	
	// > 非选中按钮 - 透明度时间回落
	if( temp_data['selected_flash'] != "开启" ){
		for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
			var temp_sprite = this._drill_button_spriteTank[i];
			if( temp_sprite == selected_sprite ){ continue; }
			temp_sprite['_select_opacityTime'] -= 1;
			if( temp_sprite['_select_opacityTime'] < 0 ){
				temp_sprite['_select_opacityTime'] = 0;
			}
		}
	}
	
	// > 非选中按钮 - 出列时间回落
	if( temp_data['selected_out'] == true ){
		for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
			var temp_sprite = this._drill_button_spriteTank[i];
			if( temp_sprite == selected_sprite ){ continue; }
			temp_sprite['_select_outTime'] -= 1;
			if( temp_sprite['_select_outTime'] < 0 ){
				temp_sprite['_select_outTime'] = 0;
			}
		}
	}
	
	
	// > 所有按钮（周期变动算法：时间控制一切，变回未选中时，时间回到下坡原点）
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		var cur_time = temp_sprite['_select_periodTime'];
		// > 闪烁效果
		if( temp_data['selected_flash'] == "开启" ){
			var speed = temp_data['selected_flashSpeed'];
			var range = temp_data['selected_flashRange'];
			temp_sprite['_opacity'] += range * Math.sin( cur_time * speed /180*Math.PI );
			temp_sprite['_opacity'] = temp_sprite['_opacity'].clamp(0,255);
		
		// > 透明度高亮效果
		}else{
			var oo = temp_data['selected_opacity_default'];
			temp_sprite['_opacity'] += (255 - oo) * temp_sprite['_select_opacityTime'] / temp_data['selected_opacity_time'];
		}
		// > 摇晃效果
		if( temp_data['selected_swing'] == "开启" ){
			var speed = temp_data['selected_swingSpeed'];
			var range = temp_data['selected_swingRange'];
			var value = range / 180 * Math.PI * Math.sin( cur_time * speed /180*Math.PI );
			temp_sprite['_rotation'] += value;
		}
		// > 缩放效果
		if( temp_data['selected_zoom'] == "左右缩放" ){
			var speed = temp_data['selected_zoomSpeed'];
			var range = temp_data['selected_zoomRange'];
			var value = range * Math.sin( cur_time * speed /180*Math.PI );
			temp_sprite['_scale_x'] += value;
		}
		if( temp_data['selected_zoom'] == "上下缩放" ){
			var speed = temp_data['selected_zoomSpeed'];
			var range = temp_data['selected_zoomRange'];
			var value = range * Math.sin( cur_time * speed /180*Math.PI );
			temp_sprite['_scale_y'] += value;
		}
		if( temp_data['selected_zoom'] == "整体缩放" ){
			var speed = temp_data['selected_zoomSpeed'];
			var range = temp_data['selected_zoomRange'];
			var value = range * Math.sin( cur_time * speed /180*Math.PI );
			temp_sprite['_scale_x'] += value;
			temp_sprite['_scale_y'] += value;
		}
		// > 浮动效果
		if( temp_data['selected_float'] == "左右浮动" ){
			var speed = temp_data['selected_floatSpeed'];
			var range = temp_data['selected_floatRange'];
			var value = range * Math.sin( cur_time * speed /180*Math.PI );
			temp_sprite['_x'] += value;
		}
		if( temp_data['selected_float'] == "上下浮动" ){
			var speed = temp_data['selected_floatSpeed'];
			var range = temp_data['selected_floatRange'];
			var value = range * Math.sin( cur_time * speed /180*Math.PI );
			temp_sprite['_y'] += value;
		}
		// > 是否出列
		if( temp_data['selected_out'] == true ){
			temp_sprite['_x'] += temp_data['selected_out_x'] * temp_sprite['_select_outTime'] / temp_data['selected_out_time'];
			temp_sprite['_y'] += temp_data['selected_out_y'] * temp_sprite['_select_outTime'] / temp_data['selected_out_time'];
		}
		
	}
}
//==============================
// * 帧刷新 - 按钮 激活后变换
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonActiveTransfer = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	var btn_index = temp_window.index() - temp_window.topIndex();
	if( btn_index == -1 ){ return; }
	if( btn_index >= this._drill_button_spriteTank.length ){ return; }
	
	if( temp_data['active_out'] != true ){ return; }
	
	var selected_sprite = this._drill_button_spriteTank[btn_index];
	if(!temp_window.drill_COSB_isActiveAfter() ){ 	//（未处于 激活后状态 时，激活对象置空）
		selected_sprite = {};
	}
	
	// > 激活的按钮 - 出列时间+1
	selected_sprite['_active_outTime'] += 1;
	if( selected_sprite['_active_outTime'] > temp_data['active_out_time'] ){
		selected_sprite['_active_outTime'] = temp_data['active_out_time'];
	}
	
	// > 非激活按钮 - 出列时间回落
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		if( temp_sprite == selected_sprite ){ continue; }
		temp_sprite['_active_outTime'] -= 1;
		if( temp_sprite['_active_outTime'] < 0 ){
			temp_sprite['_active_outTime'] = 0;
		}
	}
	
	
	// > 所有按钮
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		
		// > 激活后状态 - 出列
		if( temp_data['active_out'] == true ){
			var xx = temp_data['active_out_x'];
			var yy = temp_data['active_out_y'];
			xx -= temp_data['x'];			//去掉框架位置
			yy -= temp_data['y'];
			if( temp_data['btn_slideAnim']['slidePosType'] == "各按钮的相对坐标" ){	//相对时，去掉相对位置
				xx -= temp_sprite['_org_x'];
				yy -= temp_sprite['_org_y'];
				xx -= temp_data['btn_slideAnim']['slideX'];
				yy -= temp_data['btn_slideAnim']['slideY'];
			}
			temp_sprite['_x'] += xx * temp_sprite['_active_outTime'] / temp_data['active_out_time'];
			temp_sprite['_y'] += yy * temp_sprite['_active_outTime'] / temp_data['active_out_time'];
			temp_sprite['_opacity'] += 255 * temp_sprite['_active_outTime'] / temp_data['active_out_time'];
		}
		
	}
}
//==============================
// * 帧刷新 - 按钮 鼠标点击选中
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateMouseSelect = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	if( temp_window.index() == -1 ){ return; }		//（未选任何选项）
	if(!temp_window.isCursorMovable() ){ return; }	//（不可选中时跳过）
	
	if( TouchInput.isTriggered() ){
		for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
			var temp_sprite = this._drill_button_spriteTank[i];
			if( this.drill_isOnButton( temp_sprite ) ){
				
				var real_index = i + temp_window.topIndex();
				if( temp_window.index() == real_index ){		//（点第二次时进入）
					if( temp_data['active_enableMouseOk'] == true ){
						temp_window.processOk();
					}
				}else{
					temp_window.select( real_index );
					SoundManager.playCursor();
				}
				break;
			}
		}
	}
}
//==============================
// * 帧刷新 - 按钮 鼠标接近自动选中
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateMouseHoverSelect = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	if(!temp_window.isCursorMovable() ){ return; }	//（不可选中时跳过）
	if( temp_data['input_enableMouseHover'] == false ){ return; }
	if( this._drill_last_mouse_x == _drill_mouse_x && 
		this._drill_last_mouse_y == _drill_mouse_y ){ return; }	//（鼠标没有移动操作，跳过）
	this._drill_last_mouse_x = _drill_mouse_x;
	this._drill_last_mouse_y = _drill_mouse_y;
	
	for(var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		if( this.drill_isOnHoverButton( temp_sprite ) ){
			
			var real_index = i + temp_window.topIndex();	
			if( temp_window.index() == real_index ){	
				return; 
			}else{
				temp_window.select( real_index );
				SoundManager.playCursor();
			}
			break;
		}
	}
}
//==============================
// * 帧刷新 - 按钮 鼠标滚轮切换
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateMouseWheelSelect = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	if(!temp_window.isCursorMovable() ){ return; }	//（不可选中时跳过）
	if( temp_data['input_enableMouseWheel'] == false ){ return; }
	
	// > 滚轮监听
	var lastIndex = temp_window.index();
	var threshold = 20;
	if (TouchInput.wheelY >= threshold) {
		this._drill_COSB_mouseWheelDown = true;
		this._drill_COSB_mouseWheelUp = false;
	}
	if (TouchInput.wheelY <= -threshold) {
		this._drill_COSB_mouseWheelDown = false;
		this._drill_COSB_mouseWheelUp = true;
	}
			
	// > 滚轮切换间隔
	if( this._drill_time % temp_data['input_mouseWheelInterval'] == 0 ){ 
		if( this._drill_COSB_mouseWheelDown == true ){
			temp_window.drill_COSB_cursorForward( lastIndex );
			this._drill_COSB_mouseWheelDown = false;
			this._drill_COSB_mouseWheelUp = false;
		}
		if( this._drill_COSB_mouseWheelUp == true ){
			temp_window.drill_COSB_cursorBack( lastIndex );
			this._drill_COSB_mouseWheelDown = false;
			this._drill_COSB_mouseWheelUp = false;
		}
	}
}

//==============================
// * 获取 - 指定贴图的绝对坐标
//==============================
Drill_COSB_LayerSprite.prototype.drill_getSpriteAbsoluteX = function( sprite ){
	return sprite.x + this._layer_context.x;
}
Drill_COSB_LayerSprite.prototype.drill_getSpriteAbsoluteY = function( sprite ){
	return sprite.y + this._layer_context.y;
}
//==============================
// * 判断 - 所有按钮加载完成
//==============================
Drill_COSB_LayerSprite.prototype.drill_isAllButtonReady = function(){	
	for( var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		if( this._drill_button_spriteTank[i].bitmap.isReady() != true ){
			return false;
		}
	}
	return true;
};
//==============================
// * 判断 - 鼠标点击图片范围判断
//==============================
Drill_COSB_LayerSprite.prototype.drill_isOnButton = function( sprite ) {
	if( sprite.bitmap == null ){ return false };
	if(!sprite.bitmap.isReady() ){ return false };
	if( sprite.visible === false ){ return false };
	var pw = sprite.bitmap.width /2 + 10;
	var ph = sprite.bitmap.height /2 + 10;
	
	if( TouchInput.x < this.drill_getSpriteAbsoluteX(sprite) - pw ){ return false };
	if( TouchInput.x > this.drill_getSpriteAbsoluteX(sprite) + pw ){ return false };
	if( TouchInput.y < this.drill_getSpriteAbsoluteY(sprite) - ph ){ return false };
	if( TouchInput.y > this.drill_getSpriteAbsoluteY(sprite) + ph ){ return false };
	return true;	
};
//==============================
// * 判断 - 鼠标点击图片范围判断
//==============================
Drill_COSB_LayerSprite.prototype.drill_isOnHoverButton = function( sprite ) {
	if( sprite.bitmap == null ){ return false };
	if(!sprite.bitmap.isReady() ){ return false };
	if( sprite.visible === false ){ return false };
	var pw = sprite.bitmap.width /2 + 10;
	var ph = sprite.bitmap.height /2 + 10;
	
	if( _drill_mouse_x < sprite.x + this._layer_context.x - pw ){ return false };
	if( _drill_mouse_x > sprite.x + this._layer_context.x + pw ){ return false };
	if( _drill_mouse_y < sprite.y + this._layer_context.y - ph ){ return false };
	if( _drill_mouse_y > sprite.y + this._layer_context.y + ph ){ return false };
	return true;	
};
//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}


//=============================================================================
// ** 窗口refresh
//=============================================================================
//==============================
// * 窗口refresh - 标记
//
//				说明：	如果你的子窗口覆写了refresh函数，那么要记得添加刷新标记。
//==============================
var _drill_COSB_windowSelectableRefresh = Window_Selectable.prototype.refresh;
Window_Selectable.prototype.refresh = function(){
	this._drill_COSB_windowSelectable_refreshing = true;
	_drill_COSB_windowSelectableRefresh.call(this);
}
//==============================
// * 帧刷新 - refresh监听
//==============================
Drill_COSB_LayerSprite.prototype.drill_updateButtonRefresh = function() {
	var temp_data = this._drill_data;
	var temp_window = this._drill_window;
	if( temp_window._drill_COSB_windowSelectable_refreshing != true ){ return; }
	temp_window._drill_COSB_windowSelectable_refreshing = false;
	
	
	// > 实际按钮重刷
	for( var i = 0; i < this._drill_button_spriteTank.length; i++ ){
		var temp_sprite = this._drill_button_spriteTank[i];
		var real_index = i + temp_window.topIndex();
		
		// > 按钮名称切换
		if( temp_data['btn_nameEnable'] == true ){
			if( temp_data['btn_constructor'] == "Window_Command" ){
				temp_sprite._drill_COSB_btnNameWindow.setText( String(temp_window.commandName( real_index )) );
			}
			if( temp_data['btn_constructor'] == "Window_Selectable" ){
				temp_sprite._drill_COSB_btnNameWindow.setText( String(temp_window._list[ real_index ]) );
			}
		}

		// > 按钮贴图切换
		var bitmap_replaced = false;
		if( temp_data['btn_constructor'] == "Window_Command" ){
			if( temp_data['btn_src'][ real_index ] != undefined &&
				temp_data['btn_srcKeyword'][ real_index ] != undefined ){
				
				// > 切换检查
				//if( temp_window.topIndex() >= 1){ alert(temp_window.topIndex()); }
				
				// > 当前项的关键字
				var symbol = temp_window.commandSymbol( real_index );
				var index = this.drill_getKeywordIndex( symbol );
				if( index != -1 ){
					temp_sprite.bitmap = ImageManager.loadBitmap( temp_data['btn_src_file'], temp_data['btn_src'][index], 0, true);
					bitmap_replaced = true;
				}
			}
		}
		if( temp_data['btn_constructor'] == "Window_Selectable" ){
			if( temp_window._drill_COSB_indexList != undefined &&		//（使用_drill_COSB_indexList交错索引列表分布）
				temp_data['btn_src'][ real_index ] != undefined ){					//（用于在_list中隐藏了选项的情况，用法可见 信息面板I ）
				var index = temp_window._drill_COSB_indexList[ real_index ] || 0;	//（也可用于配置了长列的角色头像情况，根据角色id分配到选项）
				temp_sprite.bitmap = ImageManager.loadBitmap( temp_data['btn_src_file'], temp_data['btn_src'][index], 0, true);
				bitmap_replaced = true;
			}else if( temp_data['btn_src'][ real_index ] != undefined ){			//（默认按_list顺序直接分布按钮）
				temp_sprite.bitmap = ImageManager.loadBitmap( temp_data['btn_src_file'], temp_data['btn_src'][ real_index ], 0, true);
				bitmap_replaced = true;
			}
		}
		if( bitmap_replaced == false ){
			temp_sprite.bitmap = ImageManager.loadBitmap( temp_data['btn_src_file'], temp_data['btn_src_default'], 0, true);
		}
	}
}
//==============================
// * 获取 - 根据关键字找到索引
//==============================
Drill_COSB_LayerSprite.prototype.drill_getKeywordIndex = function( keyword ) {
	var temp_data = this._drill_data;
	for( var i=0; i < temp_data['btn_srcKeyword'].length; i++ ){
		if( keyword.toLowerCase() == temp_data['btn_srcKeyword'][i].toLowerCase() ){	//（关键字不区分大小写）
			return i;
		}
	}
	return -1;
}


//=============================================================================
// ** 窗口控制
//=============================================================================
//==============================
// * 获取 - 确定按钮
//==============================
var _drill_COSB_callOkHandler = Window_Selectable.prototype.processOk;
Window_Selectable.prototype.processOk = function() {
	_drill_COSB_callOkHandler.call(this);
    if (this.isCurrentItemEnabled()) {
		this._drill_COSB_curStatus = "ok";
	}
};
//==============================
// * 获取 - 取消按钮
//==============================
var _drill_COSB_callCancelHandler = Window_Selectable.prototype.processCancel;
Window_Selectable.prototype.processCancel = function() {
	_drill_COSB_callCancelHandler.call(this);
	this._drill_COSB_curStatus = "cancel";
};
//==============================
// * 获取 - 激活前状态
//==============================
Window_Selectable.prototype.drill_COSB_isActiveBefore = function() {
	if( this.isOpenAndActive() == true ){ return false; }
	return this._drill_COSB_curStatus == "cancel";
};
//==============================
// * 获取 - 激活后状态
//==============================
Window_Selectable.prototype.drill_COSB_isActiveAfter = function() {
	if( this.isOpenAndActive() == true ){ return false; }
	return this._drill_COSB_curStatus == "ok";
};
//==============================
// * 窗口 - 前进一项
//==============================
Window_Selectable.prototype.drill_COSB_cursorForward = function( lastIndex ){
	var data = this._drill_COSB_data;
	if( data && data['input_keyBoardLoop'] == true &&	//（循环）
		lastIndex == this.maxRows()-1 ){
		this.select(0);
	}else{
		this.cursorDown();
	}
	if( this.index() !== lastIndex ){
		SoundManager.playCursor();
	};
}
//==============================
// * 窗口 - 后退一项
//==============================
Window_Selectable.prototype.drill_COSB_cursorBack = function( lastIndex ){
	var data = this._drill_COSB_data;
	if( data && data['input_keyBoardLoop'] == true &&	//（循环）
		lastIndex == 0 ){
		this.select(this.maxRows()-1);
	}else{
		this.cursorUp();
	}
	if (this.index() !== lastIndex) {
		SoundManager.playCursor();
	};
}



//=============================================================================
// ** Drill_COSB_WindowSprite 单行文字贴图
//=============================================================================
//==============================
// * 文字贴图 - 定义
//==============================
function Drill_COSB_WindowSprite() {
    this.initialize.apply(this, arguments);
};
Drill_COSB_WindowSprite.prototype = Object.create(Window_Base.prototype);
Drill_COSB_WindowSprite.prototype.constructor = Drill_COSB_WindowSprite;

//==============================
// * 文字贴图 - 初始化
//==============================
Drill_COSB_WindowSprite.prototype.initialize = function( data ){
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
    Window_Base.prototype.initialize.call(this);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
}
//==============================
// * 文字贴图 - 帧刷新
//==============================
Drill_COSB_WindowSprite.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_COSB_updateText();		//文本变化
}
//==============================
// * 文字贴图 - 属性
//==============================
Drill_COSB_WindowSprite.prototype.standardFontSize = function() {
    return this._drill_data['fontsize'] || 28;
};
Drill_COSB_WindowSprite.prototype.standardPadding = function() {
    return 6;
};
//==============================
// * 文字贴图 - 接口（单次调用）
//==============================
Drill_COSB_WindowSprite.prototype.setText = function( text ) {
    this._drill_curText = String( text );
	this._drill_needRefresh = true;
};

//==============================
// * 初始化 - 数据
//==============================
Drill_COSB_WindowSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	if( data['text'] == undefined ){ data['text'] = "" };									
	if( data['fontsize'] == undefined ){ data['fontsize'] = 28 };					
	if( data['align'] == undefined ){ data['align'] = "左对齐" };										
	
}
//==============================
// * 初始化 - 对象
//==============================
Drill_COSB_WindowSprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_curText = data['text'];
	this._drill_needRefresh = true;
	
	// > 主体属性
	this.opacity = 0;
	this.contents.opacity = 255;
};
//==============================
// * 帧刷新 - 文本变化
//==============================
Drill_COSB_WindowSprite.prototype.drill_COSB_updateText = function() {
	var data = this._drill_data;
	
	if( this._drill_needRefresh == true ){
		this._drill_needRefresh = false;
		
		// > 确定宽高
		var x = this.standardPadding();
		var y = this.standardPadding();
		var textState = { 'index': 0, 'x': x, 'y': y, 'left': x };
		textState.text = this.convertEscapeCharacters( this._drill_curText );
		textState.height = this.calcTextHeight(textState, false);
		
		this._drill_height = textState.height + this.standardPadding() * 2;
		this._drill_width = this.drawTextEx(this._drill_curText,0,0) + this.standardPadding() * 2 ;
		
		this.width = this._drill_width + 4;		//稍微多几像素的空间
		this.height = this._drill_height + 2;
		
		// > 重建bitmap
		this.createContents();
		
		// > 绘制内容
		this.drawTextEx(this._drill_curText,0,0);
		
		// > 对齐方式
		if( data['align'] == "左对齐" ){
			this.x = 0 ;
			this.y = -0.5 * this.height ;
		}else if( data['align'] == "居中" ){
			this.x = -0.5 * this.width ;
			this.y = -0.5 * this.height ;
		}else if( data['align'] == "右对齐" ){
			this.x = -1.0 * this.width ;
			this.y = -0.5 * this.height ;
		}
	}
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfSelectableButton = false;
		alert(
			"【Drill_CoreOfSelectableButton.js 系统 - 按钮组核心】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心"
		);
}

