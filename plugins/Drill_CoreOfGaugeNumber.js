//=============================================================================
// Drill_CoreOfGaugeNumber.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        系统 - 参数数字核心
 * @author Drill_up
 * 
 * @Drill_LE_param "数字样式-%d"
 * @Drill_LE_parentKey "---数字样式%d至%d---"
 * @Drill_LE_var "DrillUp.g_COGN_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfGaugeNumber +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件描述了一个复杂的 参数数字 贴图结构，并提供各项扩展操作接口。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单用没有任何效果。
 * 插件作用于下列子插件：
 * 作用于：
 *   - Drill_GaugeForBoss           UI - 高级BOSS生命固定框
 *   - Drill_GaugeForVariable       UI - 高级变量固定框
 *   - Drill_GaugeOfBufferTimeNum   UI - 缓冲时间数字
 *   - Drill_GaugeFloatingNum       地图UI - 临时漂浮参数数字
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   作用于rmmv贴图。
 * 2.具体可以去看看 "13.UI > 关于参数数字.docx"。
 *   文档中有相关图解，比纯文字容易理解。
 * 主体：
 *   (1.参数数字有下列固定且硬性结构：
 *      只能根据基本符号和扩展符号显示内容、没有外框、只能左右挤占。
 * 符号：
 *   (1.基本符号用于表示数字关系，与参数值有关。
 *      图片资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 *   (2.扩展符号用于表示数字关系，与参数值无关。
 *      图片资源会被分成14等分，通过字母表示扩展符号（abcdefghijklmn）。
 *   (3.参数值减少时，如果瞬间减少了大段数值（比如从200降到100）。
 *      弹性滚动设置下，显示的参数数字不会立即达到100，而是慢慢滚动到100。
 * 排列：
 *   (1.符号根据中心锚点进行的对齐情况，分为右对齐、左对齐、居中三种。
 *      注意中心锚点的位置。
 *   (2.如果显示数字的宽度区域十分有限，你可以给参数数字添加宽度限制，
 *      宽度分为两种：缩放限制和挤压限制。
 * 额定值：
 *   (1.额定值可以根据当前数值达到某些条件时，直接改变显示的符号的信息。
 *   (2.你可以配置与基本符号不同的额定符号，达到额定条件后，相关基本符号
 *      可以转变为额定符号。
 * 设计：
 *   (1.额定值、时间单位 都是参数数字中的一项配置属性，因此对所有子插件通用。
 *      你完全可以脑洞大开，把角色的生命值 用 时间格式 展现出来。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__number （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__number文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 样式1 资源-基本符号
 * 样式1 资源-扩展符号
 * 样式1 资源-额定基本符号
 * 样式1 资源-额定扩展符号
 * 样式2 ……
 * ……
 * 
 * 参数数字的资源非常多，你需要仔细给你的文件分门别类。
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
 * 时间复杂度： o(参数数字数)*o(n^3)*o(贴图处理) 每帧
 * 测试方法：   主要基于该核心的子插件来判断。
 * 测试结果：   地图界面，平均消耗为：【30.04ms】
 *              战斗界面，平均消耗为：【21.33ms】
 * 测试方法2：  主菜单界面中显示4个角色固定框x5的参数数字。
 * 测试结果2：  菜单界面中，消耗为：【37.62ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.子插件的参数条消耗，都算作参数条核心的消耗，所以这里的消耗
 *   为不同子插件的相对平均值。
 * 3.参数数字消耗比我预想要小的多，与gif的消耗居然差不多。
 *   因为参数数字滚动的底层原理就是gif播放。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构，减少性能消耗。添加了时间格式的支持。
 * 
 * 
 *
 * @param ---数字样式 1至20---
 * @default
 *
 * @param 数字样式-1
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-左对齐--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"左对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 * 
 * @param 数字样式-2
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-右对齐--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 * 
 * @param 数字样式-3
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-居中--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"居中","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 * 
 * @param 数字样式-4
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-限宽挤扁--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"缩放限制","排列限制宽度":"30","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-5
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-限宽挤压--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"挤压限制","排列限制宽度":"30","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-6
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"所有符号变为额定符号","资源-额定基本符号":"时间精简风格-额定基本符号","资源-额定扩展符号":""}
 *
 * @param 数字样式-7
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值+限额--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"所有符号变为额定符号","资源-额定基本符号":"时间精简风格-额定基本符号","资源-额定扩展符号":""}
 * 
 * @param 数字样式-8
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值+只参数红--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"只参数符号变为额定符号","资源-额定基本符号":"时间精简风格-额定基本符号","资源-额定扩展符号":""}
 *
 * @param 数字样式-9
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值+限宽--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"挤压限制","排列限制宽度":"72","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"不变化","资源-额定基本符号":"","资源-额定扩展符号":""}
 *
 * @param 数字样式-10
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-额定值-递减--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"50","额定条件":"小于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"所有符号变为额定符号","资源-额定基本符号":"时间精简风格-额定基本符号","资源-额定扩展符号":""}
 *
 * @param 数字样式-11
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-斜向--","---主体---":"","整体旋转角度":"45","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"居中","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-12
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-扩展符号--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"ff","额外符号后缀":"","---排列---":"","对齐方式":"居中","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-13
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-百分比--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"c","---排列---":"","对齐方式":"居中","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"","资源-额定扩展符号":""}
 *
 * @param 数字样式-14
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-15
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--时间数字-点阵板--","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间点阵板风格-基本符号","资源-扩展符号":"时间点阵板风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"f","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-16
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-17
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-18
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-19
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-20
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 * @param ---数字样式21至40---
 * @default
 *
 * @param 数字样式-21
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--BOSS像素风格-生命--","---主体---":"","整体旋转角度":"0","资源-基本符号":"BOSS像素风格-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-22
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--BOSS标准风格-生命--","---主体---":"","整体旋转角度":"0","资源-基本符号":"BOSS标准风格-生命数字-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-23
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--BOSS标准风格-生命段--","---主体---":"","整体旋转角度":"0","资源-基本符号":"BOSS标准风格-生命数字-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"x","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-24
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--BOSS标准风格-魔法--","---主体---":"","整体旋转角度":"0","资源-基本符号":"BOSS标准风格-魔法数字-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-25
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--BOSS标准风格-怒气--","---主体---":"","整体旋转角度":"0","资源-基本符号":"BOSS标准风格-怒气数字-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-26
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--BOSS反向风格-生命--","---主体---":"","整体旋转角度":"0","资源-基本符号":"BOSS反向风格-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 * 
 * @param 数字样式-27
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-28
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-29
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-30
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-31
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-32
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-33
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-34
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-35
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-36
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-37
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-38
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-39
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-40
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param ---数字样式41至60---
 * @default
 *
 * @param 数字样式-41
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--变量框像素风格-含额定值--","---主体---":"","整体旋转角度":"0","资源-基本符号":"变量框像素风格-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"左对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"所有符号变为额定符号","资源-额定基本符号":"变量框像素风格-额定基本符号","资源-额定扩展符号":""}
 *
 * @param 数字样式-42
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--变量框像素风格-一般数字--","---主体---":"","整体旋转角度":"0","资源-基本符号":"变量框像素风格-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"左对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-43
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--变量框标准风格-一般数字--","---主体---":"","整体旋转角度":"0","资源-基本符号":"变量框标准风格-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"左对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-44
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--变量框标准风格-含额定值--","---主体---":"","整体旋转角度":"0","资源-基本符号":"变量框标准风格-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"左对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"弹性滚动","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"不变化","资源-额定基本符号":"","资源-额定扩展符号":""}
 *
 * @param 数字样式-45
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"--变量框垂直表单风格-像素数字--","---主体---":"","整体旋转角度":"0","资源-基本符号":"变量框像素风格-基本符号","资源-扩展符号":"","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"true","是否显示额定值":"true","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"false","达到条件时符号":"所有符号变为额定符号","资源-额定基本符号":"变量框像素风格-额定基本符号","资源-额定扩展符号":""}
 *
 * @param 数字样式-46
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-47
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-48
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-49
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-50
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-51
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-52
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-53
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-54
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-55
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-56
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-57
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-58
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-59
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-60
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 */
/*~struct~GaugeNumber:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的参数数字--
 *
 * @param ---主体---
 * @desc 
 *
 * @param 整体旋转角度
 * @parent ---主体---
 * @type number
 * @min 0
 * @desc 参数数字的整体旋转角度，单位角度。中心锚点在左上角。
 * @default 0
 * 
 * @param 资源-基本符号
 * @parent ---主体---
 * @desc 基本符号的图片资源。注意，资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 * @default 基本符号-默认
 * @require 1
 * @dir img/Special__number/
 * @type file
 *
 * @param 资源-扩展符号
 * @parent ---主体---
 * @desc 扩展符号的图片资源，注意，资源会被分成14等分。通过字母表示扩展符号（abcdefghijklmn）。
 * @default 扩展符号-默认
 * @require 1
 * @dir img/Special__number/
 * @type file
 *
 * @param ---符号---
 * @desc 
 * 
 * @param 是否显示负号
 * @parent ---符号---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 如果参数值出现了负数值，会显示负号。
 * @default true
 * 
 * @param 额外符号前缀
 * @parent ---符号---
 * @desc 在当前显示的数字字符，前缀额外显示的 额外符号。注意，这里不是输入HP就能显示HP，去看文档！
 * @default 
 * 
 * @param 额外符号后缀
 * @parent ---符号---
 * @desc 在当前显示的数字字符，后缀额外显示的 额外符号。注意，这里不是输入HP就能显示HP，去看文档！
 * @default 
 *
 * @param ---排列---
 * @desc 
 *
 * @param 对齐方式
 * @parent ---排列---
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 居中
 * @value 居中
 * @option 左对齐
 * @value 左对齐
 * @desc 符号的对齐方式。
 * @default 右对齐
 *
 * @param 最大符号数量
 * @parent ---排列---
 * @type number
 * @min 1
 * @desc 最多显示的符号数量，比如"1000"中有4个符号，"-100/-110"中有9个符号。
 * @default 20
 * 
 * @param 符号间间距
 * @parent ---排列---
 * @desc 符号贴图之间的间距，可以为负数，负数的间距将会更加紧凑。
 * @default 0
 *
 * @param 排列宽度模式
 * @parent ---排列---
 * @type select
 * @option 不限制宽度
 * @value 不限制宽度
 * @option 缩放限制
 * @value 缩放限制
 * @option 挤压限制
 * @value 挤压限制
 * @desc 排列符号是宽度的模式。超出宽度时，缩放限制会横向缩放。挤压限制则会减小间距。
 * @default 不限制宽度
 *
 * @param 排列限制宽度
 * @parent 排列宽度模式
 * @desc 模式中设置限制时，符号的最大宽度。
 * @default 300
 * 
 * @param ---滚动效果---
 * @desc 
 *
 * @param 滚动模式
 * @parent ---滚动效果---
 * @type select
 * @option 瞬间变化
 * @value 瞬间变化
 * @option 弹性滚动
 * @value 弹性滚动
 * @desc 滚动效果指 数字的值变化后，数值滚动到指定值的动画效果。
 * @default 弹性滚动
 * 
 * @param 弹性变化速度
 * @parent ---滚动效果---
 * @desc 值为比例除数，值越小，速度越快。值越大，速度越慢。
 * @default 10.0
 *
 * @param ---额定值---
 * @desc 
 * 
 * @param 是否启用额定值
 * @parent ---额定值---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。额定值将根据参数值情况，改变符号样式。
 * @default false
 * 
 * @param 是否显示额定值
 * @parent ---额定值---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。"100/200"中，200为额定值，不显示额定值则只显示"100"。
 * @default false
 * 
 * @param 默认额定值
 * @parent ---额定值---
 * @desc 用于比较的额定值。注意，部分子插件可能会覆盖该额定值，具体看子插件说明。
 * @default 100
 * 
 * @param 额定条件
 * @parent ---额定值---
 * @type select
 * @option 小于额定值时
 * @value 小于额定值时
 * @option 大于额定值时
 * @value 大于额定值时
 * @option 等于额定值时
 * @value 等于额定值时
 * @option 小于等于额定值时
 * @value 小于等于额定值时
 * @option 大于等于额定值时
 * @value 大于等于额定值时
 * @desc 满足额定条件时，显示的符号将会变为额定符号。
 * @default 大于等于额定值时
 * 
 * @param 达到条件后是否限制值
 * @parent ---额定值---
 * @type boolean
 * @on 限制
 * @off 不限制
 * @desc true - 不限制，false - 不限制。大于等于额定值条件 且 出现"11/10"时，若限制将只显示"10/10"。
 * @default false
 * 
 * @param 达到条件时符号
 * @parent ---额定值---
 * @type select
 * @option 所有符号变为额定符号
 * @value 所有符号变为额定符号
 * @option 有效符号变为额定符号
 * @value 有效符号变为额定符号
 * @option 只参数符号变为额定符号
 * @value 只参数符号变为额定符号
 * @option 不变化
 * @value 不变化
 * @desc 满足额定条件后，变化的符号情况。
 * @default 不变化
 * 
 * @param 资源-额定基本符号
 * @parent ---额定值---
 * @desc 满足额定条件时基本符号的图片资源。注意，资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 * @default 额定基本符号-默认
 * @require 1
 * @dir img/Special__number/
 * @type file
 * 
 * @param 资源-额定扩展符号
 * @parent ---额定值---
 * @desc 满足额定条件时扩展符号的图片资源，注意，资源会被分成14等分。通过字母表示扩展符号（abcdefghijklmn）。
 * @default 额定扩展符号-默认
 * @require 1
 * @dir img/Special__number/
 * @type file
 * 
 * 
 * @param ---时间格式---
 * @desc 
 * 
 * @param 是否启用时间格式
 * @parent ---时间格式---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。设置后，将以时间格式来显示数字。
 * @default false
 * 
 * @param 格式结构
 * @parent ---时间格式---
 * @type select
 * @option 时间(hh:mm:ss)
 * @value 时间(hh:mm:ss)
 * @option 时间(hh:mm:ss)+零填充
 * @value 时间(hh:mm:ss)+零填充
 * @option 逐帧计时器(hh:mm:ss ff)
 * @value 逐帧计时器(hh:mm:ss ff)
 * @option 逐帧计时器(hh:mm:ss ff)+零填充
 * @value 逐帧计时器(hh:mm:ss ff)+零填充
 * @desc 满足额定条件后，变化的符号情况。具体效果看看文档"关于参数数字.docx"。
 * @default 时间(hh:mm:ss)
 * 
 * @param 基础值单位
 * @parent ---时间格式---
 * @type select
 * @option 秒单位
 * @value 秒单位
 * @option 帧单位
 * @value 帧单位
 * @desc 使用 逐帧计时器 结构，参数数字值为10000时，秒单位表示 1万秒，显示"1:66:40 00"。 帧单位表示 1万帧，显示"1:66 40"。
 * @default 秒单位
 * 
 * @param 时间格式符号
 * @parent ---时间格式---
 * @desc 此处填指代字符。用于表示"hh:mm:ss"中的":"符号。
 * @default e
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COGN (Core_Of_Gauge_Number)
//		临时全局变量	无
//		临时局部变量	this._drill_COGN_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(参数数字数)*o(n^3)*o(贴图处理) 每帧
//		性能测试因素	可视化管理层、战斗界面
//		性能测试消耗	21.33ms 30.04ms（菜单界面 37.62ms）
//		最坏情况		暂无
//		备注			参数数字消耗比我预想要小的多，与gif的消耗居然差不多。
//
//插件记录：
//		★大体框架与功能如下：
//			参数数字核心：
//				->主体
//				->符号
//					->负号
//					->零填充	x
//					->前缀后缀
//				->排列
//					->对齐方式
//					->宽度限制	
//				->滚动效果
//					->滚动方式
//					->滚动速度
//				->额定值
//					->最大值（除号）
//					->满足额定条件变化
//				->时间符号
//					->格式结构
//					->秒单位
//					->帧单位
//				->弹出数字 ？ （扣除超过某个量，直接扣除，弹出一个数字？）
//				->粒子 ？
//		
//		
//		★配置参数结构体如下：
//			~struct~GaugeNumber:					参数数字样式
//				
//		★私有类如下：
//			* Drill_COGN_NumberSprite【参数数字】
//
//		★必要注意事项：
//			1.参数数字只分两层，内容层 和 外层。两层级可以通过zIndex排序。
//			
//		★其它说明细节：
//			暂无
//		
//		★核心接口说明：
//			1.整个核心只提供了一个封装好的【Sprite独立子类】。
//			  具体见类的说明。
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfGaugeNumber = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfGaugeNumber');
	
	
	//==============================
	// * 变量获取 - 数字样式
	//				（~struct~GaugeNumber）
	//
	//			说明：	函数未定义白色括号中的参数，需要子插件定义。若不定义则为默认值。
	//==============================
	DrillUp.drill_COGN_initStyle = function( dataFrom ) {
		var data = {};
		
		// > 主体
		//		data['x']【平移x（非实时赋值）】
		//		data['y']【平移y（非实时赋值）】
		//		data['visible']【可见】
		//		data['symbol_src_file']【资源文件夹】
		//		data['symbolEx_src_file']【资源文件夹】
		data['rotation'] = Number( dataFrom["整体旋转角度"] || 0 );
		data['symbol_src'] = String( dataFrom["资源-基本符号"] || "" );
		data['symbolEx_src'] = String( dataFrom["资源-扩展符号"] || "" );
		
		// > 符号
		data['symbol_hasNegative'] = String( dataFrom["是否显示负号"] || "true") === "true";
		data['symbol_prefix'] = String( dataFrom["额外符号前缀"] || "") ;
		data['symbol_suffix'] = String( dataFrom["额外符号后缀"] || "") ;
		
		// > 排列
		data['section_align'] = String( dataFrom["对齐方式"] || "右对齐") ;
		data['section_spriteLength'] = Number( dataFrom["最大符号数量"] || 20 );
		data['section_interval'] = Number( dataFrom["符号间间距"] || 0 );
		data['section_widthMode'] = String( dataFrom["排列宽度模式"] || "不限制宽度");
		data['section_widthLimit'] = Number( dataFrom["排列限制宽度"] || 300 );
		
		// > 滚动效果
		data['rolling_mode'] = String( dataFrom["滚动模式"] || "弹性滚动");
		data['rolling_speed'] = Number( dataFrom["弹性变化速度"] || 10.0 );
		
		// > 额定值
		//		data['specified_symbol_src_file']【资源文件夹】
		//		data['specified_symbolEx_src_file']【资源文件夹】
		data['specified_enable'] = String( dataFrom["是否启用额定值"] || "false") === "true";
		data['specified_visible'] = String( dataFrom["是否显示额定值"] || "false") === "true";
		data['specified_conditionNum'] = Number( dataFrom["默认额定值"] || 100 );
		data['specified_conditionType'] = String( dataFrom["额定条件"] || "大于等于额定值时") ;
		data['specified_remainChange'] = String( dataFrom["达到条件后是否限制值"] || "true") === "true";
		data['specified_changeType'] = String( dataFrom["达到条件时符号"] || "不变化") ;
		data['specified_symbol_src'] = String( dataFrom["资源-额定基本符号"] || "" );
		data['specified_symbolEx_src'] = String( dataFrom["资源-额定扩展符号"] || "" );
		
		// > 时间单位
		data['timeUnit_enable'] = String( dataFrom["是否启用时间格式"] || "false") === "true";
		data['timeUnit_mode'] = String( dataFrom["格式结构"] || "时间(hh:mm:ss)");
		data['timeUnit_unitType'] = String( dataFrom["基础值单位"] || "秒单位");
		data['timeUnit_timeChar'] = String( dataFrom["时间格式符号"] || "e");
		
		return data;
	};
	
	/*-----------------参数数字样式（配置）------------------*/
	DrillUp.g_COGN_list_length = 60;
	DrillUp.g_COGN_list = [];
	for (var i = 0; i < DrillUp.g_COGN_list_length; i++) {
		if( DrillUp.parameters["数字样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["数字样式-" + String(i+1) ] != "" ){
			DrillUp.g_COGN_list[i] = JSON.parse(DrillUp.parameters["数字样式-" + String(i+1) ]);
			DrillUp.g_COGN_list[i] = DrillUp.drill_COGN_initStyle( DrillUp.g_COGN_list[i] );
		}else{
			DrillUp.g_COGN_list[i] = {};
		}
	}
	

//=============================================================================
// ** 参数数字
// **			
// **		索引：	COGN（可从子插件搜索到函数、类用法）
// **		来源：	继承于Sprite
// **		实例：	> 可见 Drill_GaugeOfBufferTimeNum插件 的 _drill_symbolSprite 成员
// **		应用：	> 可见 Drill_GaugeOfBufferTimeNum插件 的 drill_createNumber 函数
// **				（应用中除了参数数字贴图，还包括背景层和前景层，组合形成 缓冲时间数字）
// **			
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个贴图组合体，根据预设定义，得到一个参数数字贴图。
// **					> 具体功能见 "13.UI > 关于参数数字.docx"。
// **				
// **		说明：	> sprite贴在任意地方都可以。
// **			  	> 你可以先取【DrillUp.g_COGN_list样式数据】再赋值各个额外属性，也可以【直接new】全参数自己建立控制。
// **			  	> 需要实时调用函数.drill_COGN_reflashValue(value)改变参数数字的值。
// **
// **		代码：	> 范围 - 该类只对 具体的数值 提供可视化参数数字显示。
// **				> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并，主要靠接口控制 当前值 和 额定值。
// **				> 数量 - [单个/ ●多个 ] 
// **				> 创建 - [一次性/ ●自延迟 /外部延迟] 需要等 基本符号和扩展符号 加载完毕后，才进行切割划分。
// **				> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
// **
// **		调用方法：	数据格式见函数drill_initData。
// **					// > 参数数字 数据初始化
// **					var temp_data = DrillUp.g_COGN_list[ meter_id ];
// **					temp_data['anchor_x'] = 0.5;						//中心锚点x
// **					temp_data['anchor_y'] = 0.5;						//中心锚点y	
// **					// > 参数数字 贴图初始化
// **					var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
// **					this.addChild( temp_sprite );
//=============================================================================
//==============================
// * 参数数字 - 定义
//==============================
function Drill_COGN_NumberSprite() {
	this.initialize.apply(this, arguments);
}
Drill_COGN_NumberSprite.prototype = Object.create(Sprite.prototype);
Drill_COGN_NumberSprite.prototype.constructor = Drill_COGN_NumberSprite;
//==============================
// * 参数数字 - 初始化
//==============================
Drill_COGN_NumberSprite.prototype.initialize = function( data ) {
	Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
}
//==============================
// * 参数数字 - 帧刷新
//==============================
Drill_COGN_NumberSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateDelayingInit();	//延迟初始化
	this.drill_updateSprite();			//帧刷新对象
}
//==============================
// * 参数数字 - 变化因子（接口，实时调用）
//==============================
Drill_COGN_NumberSprite.prototype.drill_COGN_reflashValue = function(value) {
	this._drill_new_value = value;
}
//==============================
// * 参数数字 - 显示/隐藏（接口，单次调用）
//==============================
Drill_COGN_NumberSprite.prototype.drill_COGN_setVisible = function( visible ) {
	var data = this._drill_data;
	data['visible'] = visible;
}
//==============================
// * 参数数字 - 修改额定值（接口，单次调用）
//==============================
Drill_COGN_NumberSprite.prototype.drill_COGN_setSpecifiedNum = function( num ) {
	var data = this._drill_data;
	data['specified_conditionNum'] = num;
}
//==============================
// * 参数数字 - 修改额定值显示（接口，单次调用）
//==============================
Drill_COGN_NumberSprite.prototype.drill_COGN_setSpecifiedNumVisible = function( visible ) {
	var data = this._drill_data;
	data['specified_visible'] = visible;
}
//==============================
// * 初始化 - 数据
//==============================
Drill_COGN_NumberSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 默认值
	data['enable'] = true;	
	if( data['x'] == undefined ){ data['x'] = 0 };														//主体 - 平移x（非实时赋值）
	if( data['y'] == undefined ){ data['y'] = 0 };														//主体 - 平移y（非实时赋值）
	if( data['rotation'] == undefined ){ data['rotation'] = 0 };										//主体 - 旋转（非实时赋值）
	if( data['visible'] == undefined ){ data['visible'] = true };										//主体 - 可见
	if( data['symbol_src'] == undefined ){ data['symbol_src'] = "" };									//主体 - 资源
	if( data['symbol_src_file'] == undefined ){ data['symbol_src_file'] = "img/Special__number/" };		//主体 - 资源文件夹
	if( data['symbolEx_src'] == undefined ){ data['symbolEx_src'] = "" };								//主体 - 资源
	if( data['symbolEx_src_file'] == undefined ){ data['symbolEx_src_file'] = "img/Special__number/" };	//主体 - 资源文件夹
	
	if( data['symbol_hasNegative'] == undefined ){ data['symbol_hasNegative'] = true };					//符号 - 是否显示负号
	if( data['symbol_prefix'] == undefined ){ data['symbol_prefix'] = "" };								//符号 - 额外符号前缀
	if( data['symbol_suffix'] == undefined ){ data['symbol_suffix'] = "" };								//符号 - 额外符号后缀
	
	if( data['section_align'] == undefined ){ data['section_align'] = "右对齐" };						//排列 - 对齐方式
	if( data['section_spriteLength'] == undefined ){ data['section_spriteLength'] = 20 };				//排列 - 最大符号数量
	if( data['section_interval'] == undefined ){ data['section_interval'] = 0 };						//排列 - 符号间间距
	if( data['section_widthMode'] == undefined ){ data['section_widthMode'] = "不限制宽度" };			//排列 - 排列宽度模式
	if( data['section_widthLimit'] == undefined ){ data['section_widthLimit'] = 300 };					//排列 - 排列限制宽度
	
	if( data['rolling_mode'] == undefined ){ data['rolling_mode'] = "弹性滚动" };						//滚动 - 滚动模式
	if( data['rolling_speed'] == undefined ){ data['rolling_speed'] = 10.0 };							//滚动 - 弹性变化速度
	
	if( data['specified_enable'] == undefined ){ data['specified_enable'] = false };											//额定值 - 是否启用
	if( data['specified_visible'] == undefined ){ data['specified_visible'] = false };											//额定值 - 是否显示
	if( data['specified_conditionType'] == undefined ){ data['specified_conditionType'] = "大于等于额定值时" };					//额定值 - 额定条件
	if( data['specified_conditionNum'] == undefined ){ data['specified_conditionNum'] = 0 };									//额定值 - 额定数值
	if( data['specified_remainChange'] == undefined ){ data['specified_remainChange'] = false };								//额定值 - 达到条件后是否限制值
	if( data['specified_changeType'] == undefined ){ data['specified_changeType'] = "不变化" };									//额定值 - 达到条件时符号
	if( data['specified_symbol_src'] == undefined ){ data['specified_symbol_src'] = "" };										//额定值 - 额定基本符号资源
	if( data['specified_symbol_src_file'] == undefined ){ data['specified_symbol_src_file'] = "img/Special__number/" };			//额定值 - 资源文件夹
	if( data['specified_symbolEx_src'] == undefined ){ data['specified_symbolEx_src'] = "" };									//额定值 - 额定扩展符号资源
	if( data['specified_symbolEx_src_file'] == undefined ){ data['specified_symbolEx_src_file'] = "img/Special__number/" };		//额定值 - 资源文件夹

	if( data['timeUnit_enable'] == undefined ){ data['timeUnit_enable'] = false };						//时间单位 - 是否启用
	if( data['timeUnit_mode'] == undefined ){ data['timeUnit_mode'] = "时间(hh:mm:ss)" };				//时间单位 - 格式结构
	if( data['timeUnit_unitType'] == undefined ){ data['timeUnit_unitType'] = "秒单位" };				//时间单位 - 基础值单位
	if( data['timeUnit_timeChar'] == undefined ){ data['timeUnit_timeChar'] = "e" };					//时间单位 - 时间格式符号

};
//==============================
// * 初始化 - 对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_initSprite = function() {
	var data = this._drill_data;
	
	// > 私有对象初始化
	this._drill_new_value = 0;					//变化因子 - 新变化参数【使用时只读】
	this._drill_cur_value = 0;					//变化因子 - 当前参数【使用时只读】
	
	this._layer_outer = null;					//层级 - 外层
	this._layer_context = null;					//层级 - 内容层
	this._layer_contextMask = null;				//层级 - 内容层遮罩
	
	this._drill_symbol_needInit = true;			//符号 - 初始化 锁
	this._drill_symbol_bitmap = null;			//符号 - 基本符号bitmap
	this._drill_symbolEx_bitmap = null;			//符号 - 扩展符号bitmap
	this._drill_symbol_bitmapTank = [];			//符号 - bitmap容器

	this._drill_section_layer = null;			//排列 - 排列层
	this._drill_symbol_height = 0;				//排列 - 高度
	this._drill_symbol_width = 0;				//排列 - 宽度
	this._drill_section_changed = true;			//排列 - 排列刷新
	this._drill_section_string = "";			//排列 - 转义字符串
	this._drill_section_spriteTank = [];		//排列 - 贴图容器
	
	this._drill_rolling_cur_value = 0;			//滚动 - 当前数值
	
	this._drill_specified_needInit = true;		//额定值 - 初始化 锁
	this._drill_specified_bitmap = null;		//额定值 - 额定基本符号bitmap
	this._drill_specifiedEx_bitmap = null;		//额定值 - 额定扩展符号bitmap
	this._drill_specified_bitmapTank = [];		//额定值 - 额定bitmap容器
	this._drill_specified_isFit = false;		//额定值 - 是否满足额定条件
	this._drill_specified_checkString = "";		//额定值 - 资源指向字符（贴图用）
	
	// > 主体属性
	this._drill_attr_needInit = true;
	this.x = data['x'] ;	
	this.y = data['y'] ;	
	this.anchor.x = 0.5;	
	this.anchor.y = 0.5;	
	this.rotation = data['rotation'] /180 * Math.PI;	
	this.visible = false;
	
	// > 创建函数
	this.drill_createLayer();				//创建 - 层级
	this.drill_createSymbol();				//创建 - 符号
	this.drill_createSection();				//创建 - 排列
	this.drill_createSpecified();			//创建 - 额定值
}

//==============================
// * 创建 - 层级
//==============================
Drill_COGN_NumberSprite.prototype.drill_createLayer = function() {
	
	// > 层级初始化
	this._layer_context = new Sprite();				//内容层（暂不考虑遮罩）
	this.addChild(this._layer_context);				//
	this._layer_outer = new Sprite();				//外层
	this.addChild(this._layer_outer);				//
	
}
//==============================
// * 创建 - 符号
//==============================
Drill_COGN_NumberSprite.prototype.drill_createSymbol = function() {
	var data = this._drill_data;
	
	// > 符号bitmap
	if( data['symbol_src'] == "" ){
		this._drill_symbol_bitmap = new Bitmap(0,0);
	}else{
		this._drill_symbol_bitmap = ImageManager.loadBitmap( data['symbol_src_file'], data['symbol_src'], 0, true);
	}
	if( data['symbolEx_src'] == "" ){
		this._drill_symbolEx_bitmap = new Bitmap(0,0);
	}else{
		this._drill_symbolEx_bitmap = ImageManager.loadBitmap( data['symbolEx_src_file'], data['symbolEx_src'], 0, true);
	}
}
//==============================
// * 创建 - 排列
//==============================
Drill_COGN_NumberSprite.prototype.drill_createSection = function() {
	var data = this._drill_data;
	
	// > 排列层
	this._drill_section_layer = new Sprite();
	this._drill_section_layer.zIndex = 10;
	this._layer_context.addChild(this._drill_section_layer);
	
	// > 创建贴图
	this._drill_section_spriteTank = [];	
	for(var i=0; i < data['section_spriteLength']; i++){
		var temp_sprite = new Sprite();
		temp_sprite.x = 0;
		temp_sprite.y = 0;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		this._drill_section_layer.addChild( temp_sprite );
		this._drill_section_spriteTank.push(temp_sprite);	
	}
}
//==============================
// * 创建 - 额定值
//==============================
Drill_COGN_NumberSprite.prototype.drill_createSpecified = function() {
	var data = this._drill_data;
	if( data['specified_enable'] == false ){ return; }
	
	// > 额定符号bitmap
	if( data['symbol_src'] == "" ){
		this._drill_specified_bitmap = new Bitmap(0,0);
	}else{
		this._drill_specified_bitmap = ImageManager.loadBitmap( data['specified_symbol_src_file'], data['specified_symbol_src'], 0, true);
	}
	if( data['symbolEx_src'] == "" ){
		this._drill_specifiedEx_bitmap = new Bitmap(0,0);
	}else{
		this._drill_specifiedEx_bitmap = ImageManager.loadBitmap( data['specified_symbolEx_src_file'], data['specified_symbolEx_src'], 0, true);
	}
	
}
//==============================
// * 延迟初始化
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateDelayingInit = function() {
	var data = this._drill_data;
	
	// > 主体
	if( this._drill_symbol_bitmap.isReady() && this._drill_attr_needInit ){
		this._drill_attr_needInit = false;
		this._drill_symbol_height = this._drill_symbol_bitmap.height;
		this._drill_symbol_width = this._drill_symbol_bitmap.width;
	}
	// > 显示
	if( this._drill_symbol_bitmap.isReady() && this.visible != data['visible'] ){
		this.visible = data['visible'];
		this.drill_updateOutputString();	//（显示时，才刷新一下输出的 参数数字）
	}
	// > 符号
	if( this._drill_symbol_bitmap.isReady() && 
		this._drill_symbolEx_bitmap.isReady() && 
		this._drill_symbol_needInit ){	
		
		this._drill_symbol_needInit = false;
		this.drill_delayingInitSymbol();
	}
	// > 额定值
	if( data['specified_enable'] &&
		this._drill_specified_bitmap.isReady() && 
		this._drill_specifiedEx_bitmap.isReady() && 
		this._drill_specified_needInit ){	
		
		this._drill_specified_needInit = false;
		this.drill_delayingInitSpecified();
	}
}
//==============================
// * 延迟初始化 - 符号
//==============================
Drill_COGN_NumberSprite.prototype.drill_delayingInitSymbol = function() {
	var data = this._drill_data;
	this._drill_symbol_bitmapTank = [];	
	
	// > 资源切割（基本符号）
	var w = Math.ceil(this._drill_symbol_width / 14);
	var h = this._drill_symbol_height;
	for(var i=0; i < 14; i++){
		var x = w * i;
		var y = 0;
		var new_bitmap = new Bitmap( w, h );
		new_bitmap.blt( this._drill_symbol_bitmap,  x, y, w, h,  0, 0, w, h);
		this._drill_symbol_bitmapTank.push(new_bitmap);	
	}
	// > 资源切割（扩展符号）
	for(var i=0; i < 14; i++){
		var x = w * i;
		var y = 0;
		var new_bitmap = new Bitmap( w, h );
		new_bitmap.blt( this._drill_symbolEx_bitmap,  x, y, w, h,  0, 0, w, h);
		this._drill_symbol_bitmapTank.push(new_bitmap);	
	}
}
//==============================
// * 延迟初始化 - 额定值
//==============================
Drill_COGN_NumberSprite.prototype.drill_delayingInitSpecified = function() {
	var data = this._drill_data;
	this._drill_specified_bitmapTank = [];	
	
	// > 资源切割（额定基本符号）
	var w = Math.ceil(this._drill_specified_bitmap.width / 14);
	var h = this._drill_specified_bitmap.height;
	for(var i=0; i < 14; i++){
		var x = w * i;
		var y = 0;
		var new_bitmap = new Bitmap( w, h );
		new_bitmap.blt( this._drill_specified_bitmap,  x, y, w, h,  0, 0, w, h);
		this._drill_specified_bitmapTank.push(new_bitmap);	
	}
	// > 资源切割（额定扩展符号）
	for(var i=0; i < 14; i++){
		var x = w * i;
		var y = 0;
		var new_bitmap = new Bitmap( w, h );
		new_bitmap.blt( this._drill_specifiedEx_bitmap,  x, y, w, h,  0, 0, w, h);
		this._drill_specified_bitmapTank.push(new_bitmap);	
	}
}

//==============================
// * 帧刷新对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateSprite = function() {
	var data = this._drill_data;
	if( !this.drill_isSymbolReady() ){ return }
	
	this.drill_updateRolling();						//帧刷新 - 滚动效果
													//	> 帧刷新 - 输出字符串
													//		> 帧刷新 - 额定值
	this.drill_updateSpecifiedConvert(); 			//帧刷新 - 资源指向字符转义
	this.drill_updateSection(); 					//帧刷新 - 排列
	
	this._drill_cur_value = this._drill_new_value;	//（变化因子）
}
//==============================
// * 帧刷新 - 滚动效果
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateRolling = function() {
	var data = this._drill_data;
	if( this._drill_rolling_cur_value == this._drill_new_value ){ return; }
		
	// > 滚动效果 - 瞬间变化
	if( data['rolling_mode'] == "瞬间变化" || data['rolling_time'] == 1 ){
		this._drill_rolling_cur_value = this._drill_new_value;
	}
	
	// > 滚动效果 - 弹性滚动
	if( data['rolling_mode'] == "弹性滚动" ){
		var move = (this._drill_new_value - this._drill_rolling_cur_value) / data['rolling_speed'];
		if( move > 0 && move < 1 ){ 
			this._drill_rolling_cur_value = this._drill_new_value; 
		}else if( move < 0 && move > -1 ){
			this._drill_rolling_cur_value = this._drill_new_value; 
		}else {
			move = Math.floor( move );
			this._drill_rolling_cur_value += move;
		}
	}
	
	// > 优化 - 数字变化时才刷新 参数数字 的字符串
	this.drill_updateOutputString(); 				//帧刷新 - 输出字符串（含额定值控制）
}

//==============================
// * 输出字符串 - 帧刷新
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateOutputString = function() {
	var data = this._drill_data;
	
	// > 参数值字符串
	var num_str = this.drill_convertNumberToString(this._drill_rolling_cur_value);
	this._drill_section_string = num_str;
	this._drill_specified_checkString = this.drill_getFillString( "1", num_str.length );	//资源指向字符（贴图用）
	
	
	// > 额定值帧刷新
	this.drill_updateSpecified();
	
	
	// > 前缀后缀
	this._drill_section_string = data['symbol_prefix'] + this._drill_section_string;
	this._drill_section_string = this._drill_section_string + data['symbol_suffix'];
	this._drill_specified_checkString = this.drill_getFillString( "2",String(data['symbol_prefix']).length ) + this._drill_specified_checkString;	//资源指向字符（贴图用）
	this._drill_specified_checkString = this._drill_specified_checkString + this.drill_getFillString( "3",String(data['symbol_suffix']).length );
	
	this._drill_section_changed = true;
}
//==============================
// * 输出字符串 - 额定值帧刷新
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateSpecified = function() {
	var data = this._drill_data;
	if( data['specified_enable'] == false ){ return; }
	
	// > 额定判断
	var is_fit = false;
	if( data['specified_conditionType'] == "小于额定值时" ){
		is_fit = this._drill_new_value < data['specified_conditionNum'];
	}else if( data['specified_conditionType'] == "大于额定值时" ){
		is_fit = this._drill_new_value > data['specified_conditionNum'];
	}else if( data['specified_conditionType'] == "等于额定值时" ){
		is_fit = this._drill_new_value == data['specified_conditionNum'];
	}else if( data['specified_conditionType'] == "小于等于额定值时" ){
		is_fit = this._drill_new_value <= data['specified_conditionNum'];
	}else if( data['specified_conditionType'] == "大于等于额定值时" ){
		is_fit = this._drill_new_value >= data['specified_conditionNum'];
	}
	this._drill_specified_isFit = is_fit;
	
	// > 保持额定值
	if( is_fit && data['specified_remainChange'] == true ){
		var num_str = this.drill_convertNumberToString( data['specified_conditionNum'] );
		this._drill_section_string = num_str;
		this._drill_specified_checkString = this.drill_getFillString( "1", num_str.length );		//资源指向字符（贴图用）
	}
	// > 显示额定值 (120/100)
	if( data['specified_visible'] == true ){
		var num_str = this.drill_convertNumberToString( data['specified_conditionNum'] );
		this._drill_section_string += "/" + num_str;
		this._drill_specified_checkString += this.drill_getFillString( "4", num_str.length +1 );	//资源指向字符（贴图用）
	}
}
//==============================
// * 输出字符串 - 根据 数字值 获取到 字符串
//==============================
Drill_COGN_NumberSprite.prototype.drill_convertNumberToString = function( value ){
	var data = this._drill_data;
	var result_str = "";
	if( isNaN( value ) ){ return ""; }
	
	// > 时间单位情况
	//		（不要考虑日期情况，Date() 的日期包含大小月、闰年问题、1970年问题）
	if( data['timeUnit_enable'] == true ){
		if( data['timeUnit_unitType'] == "秒单位" ){
			value *= 60;
		}
		
		var ff = Math.floor(value) %60;
		var ss = Math.floor(value /60) %60;
		var mm = Math.floor(value /3600) %60;
		var hh = Math.floor(value /216000 );
		
		if( data['timeUnit_mode'] == "时间(hh:mm:ss)" ){
			if( value > 216000 ){
				result_str = String(hh) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 3600 ){
				result_str = String(mm) + ":" + String(ss).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 60 ){
				result_str = String(ss);
			}else{
				//（不显示）
			}
		}
		if( data['timeUnit_mode'] == "时间(hh:mm:ss)+零填充" ){
			result_str = hh.padZero(2) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2);
			result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
		}
		if( data['timeUnit_mode'] == "逐帧计时器(hh:mm:ss ff)" ){
			if( value > 216000 ){
				result_str = String(hh) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2) + " " + String(ff).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 3600 ){
				result_str = String(mm) + ":" + String(ss).padZero(2) + " " + String(ff).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 60 ){
				result_str = String(ss) + " " + String(ff).padZero(2);
			}else{
				result_str = String(ff);
			}
		}
		if( data['timeUnit_mode'] == "逐帧计时器(hh:mm:ss ff)+零填充" ){
			result_str = hh.padZero(2) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2) + " " + String(ff).padZero(2);
			result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
		}
		
	// > 默认数字情况
	}else{
		result_str = String( value );
		if( data['symbol_hasNegative'] == false ){		//没有负号时，去掉负号
			result_str = String( Math.abs( value ) );
		}
	}
	
	return result_str;
}

//==============================
// * 帧刷新 - 资源指向字符转义
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateSpecifiedConvert = function() {
	var data = this._drill_data;
	if( this._drill_specified_isFit == false ){ return; }
	
	//	每创建一个字符串时，都会在 this._drill_specified_checkString 中追加 资源指向字符，字符含义如下：
	// 		1 参数值
	// 		2 前缀
	// 		3 后缀
	// 		4 额定值
	
	if( data['specified_changeType'] == "所有符号变为额定符号" ){
		this._drill_specified_checkString = this.drill_getFillString( "s",this._drill_specified_checkString.length );
	}
	if( data['specified_changeType'] == "有效符号变为额定符号" ){
		this._drill_specified_checkString = this._drill_specified_checkString.replace( /[1]/g, "s" );
		this._drill_specified_checkString = this._drill_specified_checkString.replace( /[4]/g, "s" );
	}
	if( data['specified_changeType'] == "只参数符号变为额定符号" ){
		this._drill_specified_checkString = this._drill_specified_checkString.replace( /[1]/g, "s" );
	}
	
}
//==============================
// * 帧刷新 - 排列
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateSection = function() {
	var data = this._drill_data;
	if( this._drill_section_changed == false ){ return; }
	this._drill_section_changed = false;
	
	// > 转义字符串（必须在符号阶段时，把所有字符串都编辑好）
	var str_len = this._drill_section_string.length;
	if( str_len > data['section_spriteLength'] ){
		str_len = data['section_spriteLength'];
	}
	for( var i=0; i < this._drill_section_spriteTank.length; i++ ){
		var temp_sprite = this._drill_section_spriteTank[i];
		if( i >= str_len ){
			temp_sprite.bitmap = null;
			continue;
		}
		
		// > 符号索引
		var temp_index = 0;
		var temp_char = this._drill_section_string.charAt(i).toLowerCase();
		if( temp_char == "0" ){
			temp_index = 0;
		}else if( temp_char == "1" ){
			temp_index = 1;
		}else if( temp_char == "2" ){
			temp_index = 2;
		}else if( temp_char == "3" ){
			temp_index = 3;
		}else if( temp_char == "4" ){
			temp_index = 4;
		}else if( temp_char == "5" ){
			temp_index = 5;
		}else if( temp_char == "6" ){
			temp_index = 6;
		}else if( temp_char == "7" ){
			temp_index = 7;
		}else if( temp_char == "8" ){
			temp_index = 8;
		}else if( temp_char == "9" ){
			temp_index = 9;
		}else if( temp_char == "+" ){
			temp_index = 10;
		}else if( temp_char == "-" ){
			temp_index = 11;
		}else if( temp_char == "x" || temp_char == "*" ){
			temp_index = 12;
		}else if( temp_char == "/" ){
			temp_index = 13;
			
		}else if( temp_char == "a" ){
			temp_index = 14;
		}else if( temp_char == "b" ){
			temp_index = 15;
		}else if( temp_char == "c" ){
			temp_index = 16;
		}else if( temp_char == "d" ){
			temp_index = 17;
		}else if( temp_char == "e" ){
			temp_index = 18;
		}else if( temp_char == "f" ){
			temp_index = 19;
		}else if( temp_char == "g" ){
			temp_index = 20;
		}else if( temp_char == "h" ){
			temp_index = 21;
		}else if( temp_char == "i" ){
			temp_index = 22;
		}else if( temp_char == "j" ){
			temp_index = 23;
		}else if( temp_char == "k" ){
			temp_index = 24;
		}else if( temp_char == "l" ){
			temp_index = 25;
		}else if( temp_char == "m" ){
			temp_index = 26;
		}else if( temp_char == "n" ){
			temp_index = 27;
		}else if( temp_char == " " ){	//（空格，空字符）
			temp_index = 9999;
		}
		
		// > 符号bitmap对象
		var temp_char = this._drill_specified_checkString.charAt(i).toLowerCase();
		if( temp_char == "s" ){
			temp_sprite.bitmap = this._drill_specified_bitmapTank[temp_index];	//额定bitmap容器
		}else{
			temp_sprite.bitmap = this._drill_symbol_bitmapTank[temp_index];		//bitmap容器
		}
	}
	
	
	// > 排列
	var section_width = this.drill_width() + data['section_interval'];		//单字符长度
	var section_widthTotal = str_len * section_width;						//总长度
	if( section_widthTotal > data['section_widthLimit'] && data['section_widthMode'] == "挤压限制" ){
		section_widthTotal = data['section_widthLimit'];
		section_width = Math.floor( section_widthTotal / str_len );
	}
	for( var i=0; i < str_len; i++ ){
		var temp_sprite = this._drill_section_spriteTank[i];
		if( data['section_align'] == "右对齐" ){
			temp_sprite.x = i * section_width - section_widthTotal + this.drill_width()*0.5;
			temp_sprite.y = 0;
		}else if( data['section_align'] == "左对齐" ){
			temp_sprite.x = i * section_width + this.drill_width()*0.5;
			temp_sprite.y = 0;
		}else{		//居中
			temp_sprite.x = i * section_width - section_widthTotal * 0.5 + this.drill_width()*0.5;
			temp_sprite.y = 0;
		}
	}
	if( data['section_widthMode'] == "缩放限制" ){
		if( section_widthTotal > data['section_widthLimit'] ){
			this.scale.x = data['section_widthLimit'] / section_widthTotal ; 
		}else{
			this.scale.x = 1.0;
		}
	}
	
}


//==============================
// ** 获取 - 重复填充的字符串
//==============================
Drill_COGN_NumberSprite.prototype.drill_getFillString = function( str, len ) {
	var temp_str = "";
	for( var i=0; i < len; i++ ){
		temp_str += str;
	}
	return temp_str;
};
//==============================
// ** 层级排序
//==============================
Drill_COGN_NumberSprite.prototype.drill_COGN_sortByZIndex = function() {
   this._layer_context.children.sort(function(a, b){return a.zIndex-b.zIndex});		//内容层
   this._layer_outer.children.sort(function(a, b){return a.zIndex-b.zIndex});		//外层
};
//==============================
// * 获取 - 符号是否准备就绪
//==============================
Drill_COGN_NumberSprite.prototype.drill_isSymbolReady = function() {
	if(!this._drill_symbol_bitmapTank ){ return false; }
	if( this._drill_symbol_bitmapTank.length == 0 ){ return false; }
	for( var i=0; i<this._drill_symbol_bitmapTank.length; i++ ){
		if( !this._drill_symbol_bitmapTank[i].isReady() ){ return false; }
	}
	return true;
}
//==============================
// * 获取 - 符号宽度
//==============================
Drill_COGN_NumberSprite.prototype.drill_width = function(){
	return Math.ceil(this._drill_symbol_width / 14);
}
//==============================
// * 获取 - 符号高度
//==============================
Drill_COGN_NumberSprite.prototype.drill_height = function() {
	return this._drill_symbol_height;
}


