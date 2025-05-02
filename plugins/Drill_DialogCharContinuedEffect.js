//=============================================================================
// Drill_DialogCharContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        窗口字符 - 字符块的持续动作效果
 * @author Drill_up
 * 
 * @Drill_LE_param "预设-%d"
 * @Drill_LE_parentKey "---预设组%d至%d---"
 * @Drill_LE_var "DrillUp.g_DCCE_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogCharContinuedEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以让 窗口字符块 播放持续执行的各种动作。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacterSprite     窗口字符-窗口字符贴图核心
 *     需要该核心才能建立字符块贴图，并播放动作效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于任何窗口。
 * 2.更多详细内容，去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 3.更多详细内容，去看看 "7.行走图 > 关于动作效果.docx"。
 * 细节：
 *   (1.所有字符块建立后，动作都是并行的，且不可控制。
 *   (2.常用于 对话框 显示特殊字符。一般的窗口也能够支持字符块效果。
 *   (3.注意，新版已完全不支持旧版本的窗口字符，工程中的旧窗口字符需要全部替换。
 * 完整流程动作：
 *   (1.含有"缓冲时间"、"开始时间"、"结束时间"的动作，
 *      都称为完整流程动作，都有一套 开始、持续、结束 的流程。
 *      比如"空中飘浮"、"旋转状态"、"缩放状态"等动作。
 *   (2.以"空中飘浮"动作为例，开始、结束的过程，会在"缓冲时间"内完成。
 *      持续150，缓冲60，则表示 开始过程60，结束过程60，中间过程150-60-60=30。
 *      "空中飘浮"可以设置"总时间[无限]"，如果要让其停下，
 *      使用"结束动作"指令即可。
 * 设计：
 *   (1."\dDCCE[4]\dts[某文字]"表示将三个字符作为一个字符块来执行
 *      动作效果。如果你想让三个字符分别执行不同动作，这样写：
 *      "\dDCCE[4]\dts[某]\dts[文]\dts[字]\dDCCE[off]"
 *   (2.直接配置动作的窗口字符，写出来的字符串会超级长。
 *      你可以先将超长字符串写在记事本中，然后粘贴在对话框中。
 *      对话框中没有字数限制，所以不必担心字符串太长显示不了的问题。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 预设配置
 * 你可以设置预设，减少窗口字符的长度：
 * （注意，必须用英文冒号，并且没有空格）
 * 
 * 窗口字符：\dDCCE[4]           之后的字符块，使用预设动作4。
 * 窗口字符：\dDCCE[预设[4]]     之后的字符块，使用预设动作4。
 * 窗口字符：\dDCCE[off]         之后的字符块，关闭动作设置。
 * 
 * 1.你可以通过预设来减少窗口字符的长度。
 *   预设开启后，对之后的全部字符块都有效，然后通过"\dDCCE[off]"来关闭动作设置。
 * 2."dDCCE"表示 drill插件下 DCCE 的插件（该插件的简称）。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 直接配置
 * 你可以使用下面的窗口字符来实现：
 * （注意，必须用英文冒号，并且没有空格）
 * 
 * 窗口字符：\dDCCE[标准闪烁:总时间[180]:周期[30]]
 * 窗口字符：\dDCCE[渐变闪烁:总时间[180]:周期[30]]
 * 窗口字符：\dDCCE[顺时针旋转:总时间[180]:周期[30]]
 * 窗口字符：\dDCCE[逆时针旋转:总时间[180]:周期[30]]
 * 窗口字符：\dDCCE[垂直卡片旋转:总时间[180]:周期[30]]
 * 窗口字符：\dDCCE[水平卡片旋转:总时间[180]:周期[30]]
 * 窗口字符：\dDCCE[上下震动:总时间[180]:周期[6]:震动幅度[10]]
 * 窗口字符：\dDCCE[左右震动:总时间[180]:周期[6]:震动幅度[10]]
 * 窗口字符：\dDCCE[左右摇晃:总时间[180]:周期[20]:摇晃幅度[15]]
 * 窗口字符：\dDCCE[钟摆摇晃:总时间[180]:周期[20]:摇晃幅度[15]]
 * 窗口字符：\dDCCE[锚点摇晃:总时间[180]:周期[20]:摇晃幅度[15]]
 * 窗口字符：\dDCCE[呼吸效果:总时间[180]:周期[45]:呼吸幅度[4]]
 * 窗口字符：\dDCCE[原地小跳:总时间[180]:周期[90]:跳跃高度[20]]
 * 窗口字符：\dDCCE[反复缩放:总时间[180]:缓冲时间[10]:周期[60]:最小缩放[1.00]:最大缩放[1.25]]
 * 窗口字符：\dDCCE[空中飘浮:总时间[240]:缓冲时间[60]:飘浮高度[100]:周期[30]:幅度[8]]
 * 窗口字符：\dDCCE[旋转状态:总时间[240]:缓冲时间[60]:旋转角度[90]]
 * 窗口字符：\dDCCE[缩放状态:总时间[240]:缓冲时间[60]:缩放比例[1.5]]
 * 窗口字符：\dDCCE[顺时针旋转(渐变):总时间[480]:周期[8]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[逆时针旋转(渐变):总时间[480]:周期[8]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[垂直卡片旋转(渐变):总时间[480]:周期[8]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[水平卡片旋转(渐变):总时间[480]:周期[8]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[上下震动(渐变):总时间[480]:周期[6]:震动幅度[12]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[左右震动(渐变):总时间[480]:周期[6]:震动幅度[12]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[左右摇晃(渐变):总时间[480]:周期[8]:摇晃幅度[25]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[钟摆摇晃(渐变):总时间[480]:周期[8]:摇晃幅度[25]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[锚点摇晃(渐变):总时间[480]:周期[8]:摇晃幅度[25]:开始时间[180]:结束时间[120]]
 * 窗口字符：\dDCCE[off]
 * 
 * 1.参数中"总时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"幅度"、"高度"的单位是像素。
 * 2."标准闪烁 : 总时间[180] : 周期[30]"表示：
 *    闪烁30帧，15帧透明，15帧不透明，持续180帧。也就是闪6次。
 * 3."旋转"类型中，一个周期旋转一整圈。
 *   持续60帧，周期30帧，则表示图像旋转两圈后结束。
 * 4.以"空中飘浮"动作为例，开始、结束的过程，会在"缓冲时间"内完成。
 *   持续150，缓冲60，则表示 开始过程60，结束过程60，中间过程150-60-60=30。
 *   "空中飘浮"可以设置"总时间[无限]"。
 * 5."(渐变)"类型的效果，在结束动作后，都能够在原状态下慢慢减速停住。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 无限的时间
 * 你可以将上面窗口字符的总时间中，填"无限"：
 * 
 * 窗口字符：\dDCCE[标准闪烁:总时间[无限]:周期[30]]
 * 窗口字符：\dDCCE[旋转状态:总时间[无限]:缓冲时间[60]:旋转角度[90]]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>字符块的持续动作效果 : DEBUG动作效果测试 : 开启
 * 插件指令：>字符块的持续动作效果 : DEBUG动作效果测试 : 关闭
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
 * 时间复杂度： o(n)*o(字符块数量)*o(贴图处理) 每帧
 * 测试方法：   测试对话框管理层，放置的10个动态窗口字符，
 *              并在战斗界面、菜单界面中测试。
 * 测试结果：   地图界面中，平均消耗为：【12.30ms】
 *              战斗界面中，平均消耗为：【6.90ms】
 *              菜单界面中，平均消耗为：【6.56ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只作用于字符块贴图，添加字符块并设置样式，才会对应一个变化跳动的贴图。
 *   不过贴图本身消耗并不多，累积起来不会造成特别大的消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了使用 修改字体 的效果字符时，跳动字符无变化的bug。
 * [v1.2]
 * 修改了插件的分类。
 * [v1.3]
 * 优化了数学缩短锚点的计算公式。
 * [v1.4]
 * 更新并兼容了新的窗口字符底层。
 *
 *
 * @param ---预设组 1至20---
 * @default
 *
 * @param 预设-1
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==标准闪烁-慢==","持续动作类型":"标准闪烁","持续时长":"无限","参数2":"60","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-2
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==标准闪烁-快==","持续动作类型":"标准闪烁","持续时长":"无限","参数2":"16","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-3
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==渐变闪烁-慢==","持续动作类型":"渐变闪烁","持续时长":"无限","参数2":"90","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-4
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==渐变闪烁-快==","持续动作类型":"渐变闪烁","持续时长":"无限","参数2":"20","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-5
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==顺时针旋转==","持续动作类型":"顺时针旋转","持续时长":"无限","参数2":"60","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-6
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==逆时针旋转==","持续动作类型":"逆时针旋转","持续时长":"无限","参数2":"60","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-7
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==垂直卡片旋转==","持续动作类型":"垂直卡片旋转","持续时长":"无限","参数2":"90","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-8
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==水平卡片旋转==","持续动作类型":"水平卡片旋转","持续时长":"无限","参数2":"90","参数3":"0","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-9
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==上下震动==","持续动作类型":"上下震动","持续时长":"无限","参数2":"6","参数3":"4","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-10
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==上下慢浮动==","持续动作类型":"上下震动","持续时长":"无限","参数2":"90","参数3":"8","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-11
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==左右震动==","持续动作类型":"左右震动","持续时长":"无限","参数2":"6","参数3":"4","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-12
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==左右慢浮动==","持续动作类型":"左右震动","持续时长":"无限","参数2":"90","参数3":"8","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-13
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==左右摇晃==","持续动作类型":"左右摇晃","持续时长":"无限","参数2":"60","参数3":"15","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-14
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==钟摆摇晃==","持续动作类型":"钟摆摇晃","持续时长":"无限","参数2":"60","参数3":"15","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-15
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==锚点摇晃==","持续动作类型":"锚点摇晃","持续时长":"无限","参数2":"60","参数3":"15","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-16
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==呼吸效果==","持续动作类型":"呼吸效果","持续时长":"无限","参数2":"45","参数3":"4","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-17
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==原地小跳==","持续动作类型":"原地小跳","持续时长":"无限","参数2":"120","参数3":"20","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-18
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==空中飘浮==","持续动作类型":"空中飘浮","持续时长":"180","参数2":"60","参数3":"40","参数4":"30","参数5":"8","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-19
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==旋转状态==","持续动作类型":"旋转状态","持续时长":"120","参数2":"60","参数3":"90","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-20
 * @parent ---预设组 1至20---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==缩放状态==","持续动作类型":"缩放状态","持续时长":"120","参数2":"60","参数3":"1.5","参数4":"0","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param ---预设组21至40---
 * @default
 *
 * @param 预设-21
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {"标签":"==反复缩放==","持续动作类型":"反复缩放","持续时长":"无限","参数2":"10","参数3":"60","参数4":"1.00","参数5":"1.25","参数6":"0","参数7":"0","参数8":"0"}
 *
 * @param 预设-22
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-23
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-24
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-25
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-26
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-27
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-28
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-29
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-30
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-31
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-32
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-33
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-34
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-35
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-36
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-37
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-38
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-39
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 *
 * @param 预设-40
 * @parent ---预设组21至40---
 * @type struct<DCCEPreset>
 * @desc 预设的配置信息，用于减少窗口字符长度。
 * @default {}
 * 
 */
/*~struct~DCCEPreset:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动作字符预设==
 *
 * @param 持续动作类型
 * @desc 持续动作的类型，比如标准闪烁、渐变闪烁、顺时针旋转等。注意类型名称要对应上。
 * @default 上下震动
 *
 * @param 持续时长
 * @desc 持续的时间，单位帧。（1秒60帧）你也可以直接填"无限"。
 * @default 120
 *
 * @param 参数2
 * @desc 注意，类型设置中，第二个参数的值。你需要对应一下类型中要填哪些数字值。
 * @default 0
 *
 * @param 参数3
 * @desc 注意，类型设置中，第三个参数的值。你需要对应一下类型中要填哪些数字值。
 * @default 0
 *
 * @param 参数4
 * @desc 注意，类型设置中，第四个参数的值。你需要对应一下类型中要填哪些数字值。
 * @default 0
 *
 * @param 参数5
 * @desc 注意，类型设置中，第五个参数的值。你需要对应一下类型中要填哪些数字值。
 * @default 0
 *
 * @param 参数6
 * @desc 注意，类型设置中，第六个参数的值。你需要对应一下类型中要填哪些数字值。
 * @default 0
 *
 * @param 参数7
 * @desc 注意，类型设置中，第七个参数的值。你需要对应一下类型中要填哪些数字值。
 * @default 0
 *
 * @param 参数8
 * @desc 注意，类型设置中，第八个参数的值。你需要对应一下类型中要填哪些数字值。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCCE（Dialog_Char_Continued_Effect）
//		临时全局变量	DrillUp.g_DCCE_list
//		临时局部变量	this._drill_DCCE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(字符块数量)*o(贴图处理) 每帧
//		★性能测试因素	动作效果管理层
//		★性能测试消耗	2025/4/30：
//							》6.9ms、12.3ms（Drill_DCCE_Sprite.update）38.2ms（Scene_Map.drill_DCCE_createDebugSprite）
//		★最坏情况		暂无
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
//			
//			->☆窗口字符应用之效果字符
//				> \dDCCE[4]
//				> \dDCCE[预设[4]]
//				> \dDCCE[off]
//				> \dDCCE[……]
//			->☆贴图控制
//			->持续动作字符块【Drill_DCCE_Sprite】
//				->数学工具
//			->☆持续动作
//				->搜索『持续动作』查看所有动作
//			
//			->☆DEBUG动作效果测试
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			7.行走图 > 关于动作效果（脚本）.docx
//		
//		★插件私有类：
//			* 持续动作字符块【Drill_DCCE_Sprite】
//		
//		★必要注意事项：
//			无
//
//		★其它说明细节：
//			1.字符块的锚点是固定(0.5,0.5)。
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
	DrillUp.g_DCCE_PluginTip_curName = "Drill_DialogCharContinuedEffect.js 窗口字符-字符块持续动作效果";
	DrillUp.g_DCCE_PluginTip_baseList = ["Drill_CoreOfWindowCharacterSprite.js 窗口字符-窗口字符贴图核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DCCE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DCCE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DCCE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DCCE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DCCE_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 时间计算不正确
	//==============================
	DrillUp.drill_DCCE_getPluginTip_allTimeError = function( playing_type ){
		return "【" + DrillUp.g_DCCE_PluginTip_curName + "】\n动作效果\""+playing_type+"\"播放失败，其配置的时间参数总和大于 总时间的值。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_DCCE_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_DCCE_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogCharContinuedEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogCharContinuedEffect');


    //==============================
    // * 静态数据 - 预设
    //				（~struct~DCCEPreset）
    //==============================
    DrillUp.drill_DCCE_presetInit = function( dataFrom ){
        var data = {};
        data['type'] = String(dataFrom["持续动作类型"] || "");
        data['sustain'] = String(dataFrom["持续时长"] || 120);
        data['param2'] = Number(dataFrom["参数2"] || 0);
        data['param3'] = Number(dataFrom["参数3"] || 0);
        data['param4'] = Number(dataFrom["参数4"] || 0);
        data['param5'] = Number(dataFrom["参数5"] || 0);
        data['param6'] = Number(dataFrom["参数6"] || 0);
        data['param7'] = Number(dataFrom["参数7"] || 0);
        data['param8'] = Number(dataFrom["参数8"] || 0);
        return data;
    }

    /*-----------------预设------------------*/
    DrillUp.g_DCCE_list_length = 40;
    DrillUp.g_DCCE_list = [];
    for (var i = 0; i < DrillUp.g_DCCE_list_length; i++) {
        if (DrillUp.parameters["预设-" + String(i + 1)] != undefined &&
			DrillUp.parameters["预设-" + String(i + 1)] != "") {
            var data = JSON.parse(DrillUp.parameters["预设-" + String(i + 1)]);
            DrillUp.g_DCCE_list[i] = DrillUp.drill_DCCE_presetInit(data);
            DrillUp.g_DCCE_list[i]['inited'] = true;
        } else {
            DrillUp.g_DCCE_list[i] = DrillUp.drill_DCCE_presetInit({});
            DrillUp.g_DCCE_list[i]['inited'] = false;
        }
    }
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacterSprite ){
	
//==============================
// * >>>>基于插件检测>>>> - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_DCCE_getPluginTip_NeedUpdate_drawText() );
}
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DCCE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DCCE_pluginCommand.call(this, command, args);
	this.drill_DCCE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DCCE_pluginCommand = function( command, args ){
	if( command === ">字符块的持续动作效果" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG动作效果测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DCCE_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DCCE_DebugEnabled = false;
				}
			}
		}
	}
};
	
	
//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置
//==============================
var _drill_DCCE_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_DCCE_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	if( command === "dDCCE" ){ 
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			
			// > 『窗口字符定义』字符块 - 关闭（\dDCCE[off]）
			if( temp1.toLowerCase() == "off" ){
				this.drill_COWC_effect_submitCombined( "@@@dce[off]" );
				return;
				
			// > 『窗口字符定义』字符块 - 预设配置（\dDCCE[4]、\dDCCE[预设[4]]）
			}else{
				temp1 = temp1.replace("预设[", "");
				temp1 = temp1.replace("]", "");
				this.drill_COWC_effect_submitCombined( "@@@dce[setPre:" + temp1 + "]" );
				return;
			}
		}
		if( args.length == 3 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			var temp2 = String(args[2]);
			
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[标准闪烁:60:30]）
			if( type == "标准闪烁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ "]" );
				return;
			}
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[渐变闪烁:60:30]）
			if( type == "渐变闪烁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ "]" );
				return;
			}
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[顺时针旋转:持续时间[60]:周期[30]]）
			if( type == "顺时针旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ "]" );
				return;
			}
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[逆时针旋转:持续时间[60]:周期[30]]）
			if( type == "逆时针旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ "]" );
				return;
			}
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[垂直卡片旋转:持续时间[60]:周期[30]]）
			if( type == "垂直卡片旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ "]" );
				return;
			}
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[水平卡片旋转:持续时间[60]:周期[30]]）
			if( type == "水平卡片旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ "]" );
				return;
			}	
		}
		if( args.length == 4 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			var temp2 = String(args[2]);
			var temp3 = String(args[3]);
			
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[上下震动:持续时间[60]:周期[6]:震动幅度[10]]）
			if( type == "上下震动" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[左右震动:持续时间[60]:周期[6]:震动幅度[10]]）
			if( type == "左右震动" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[左右摇晃:持续时间[40]:周期[20]:摇晃幅度[15]]）
			if( type == "左右摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[钟摆摇晃:持续时间[40]:周期[20]:摇晃幅度[15]]）
			if( type == "钟摆摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[锚点摇晃:持续时间[40]:周期[20]:摇晃幅度[15]]）
			if( type == "锚点摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[呼吸效果:持续时间[180]:周期[45]:呼吸幅度[4]]）
			if( type == "呼吸效果" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("呼吸幅度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[原地小跳:持续时间[180]:周期[90]:跳跃高度[20]]）
			if( type == "原地小跳" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("跳跃高度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[旋转状态:持续时间[150]:缓冲时间[60]:旋转角度[90]]）
			if( type == "旋转状态" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("旋转角度[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[缩放状态:持续时间[150]:缓冲时间[60]:缩放比例[1.5]]）
			if( type == "缩放状态" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("缩放比例[","");
				temp3 = temp3.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ "]" );
				return;
			}	
		}
		if( args.length == 5 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			var temp2 = String(args[2]);
			var temp3 = String(args[3]);
			var temp4 = String(args[4]);
			
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[顺时针旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]）
			if( type == "顺时针旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[逆时针旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]）
			if( type == "逆时针旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[垂直卡片旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]）
			if( type == "垂直卡片旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[水平卡片旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]）
			if( type == "水平卡片旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ "]" );
				return;
			}	
		}
		if( args.length == 6 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			var temp2 = String(args[2]);
			var temp3 = String(args[3]);
			var temp4 = String(args[4]);
			var temp5 = String(args[5]);
			
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[反复缩放:持续时间[180]:缓冲时间[10]:周期[60]:最小缩放[1.00]:最大缩放[1.25]]）
			if( type == "反复缩放" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("周期[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("最小缩放[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("最大缩放[","");
				temp5 = temp5.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ ":"+temp5+ "]" );
				return;
			}
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[空中飘浮:持续时间[150]:缓冲时间[60]:飘浮高度[100]:周期[30]:幅度[8]]）
			if( type == "空中飘浮" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("飘浮高度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("周期[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("幅度[","");
				temp5 = temp5.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ ":"+temp5+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[上下震动(渐变):持续时间[40]:周期[6]:震动幅度[4]:开始时间[90]:结束时间[60]]）
			if( type == "上下震动(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ ":"+temp5+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[左右震动(渐变):持续时间[40]:周期[6]:震动幅度[4]:开始时间[90]:结束时间[60]]）
			if( type == "左右震动(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ ":"+temp5+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[左右摇晃(渐变):持续时间[40]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]）
			if( type == "左右摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ ":"+temp5+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[钟摆摇晃(渐变):持续时间[40]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]）
			if( type == "钟摆摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ ":"+temp5+ "]" );
				return;
			}	
			// > 『窗口字符定义』字符块 - 直接配置（\dDCCE[锚点摇晃(渐变):持续时间[40]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]）
			if( type == "锚点摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				this.drill_COWC_effect_submitCombined( "@@@dce[setData:" +type+ ":"+temp1+ ":"+temp2+ ":"+temp3+ ":"+temp4+ ":"+temp5+ "]" );
				return;
			}	
		}
	}
};


//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门对 持续动作字符块贴图 进行控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 样式阶段-配置阶段（继承）
//==============================
var _drill_DCCE_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_DCCE_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command == "@@@dce" ){
		if( args.length >= 1 ){
			
			// > 『底层字符定义』 - 预设配置（@@@dce[setPre:1]） drill_continued_effect
			if( String(args[0]) == "setPre" ){
				var data = DrillUp.g_DCCE_list[ Number(args[1]) -1 ];
				if( data == undefined ){ return; }
				var param_list = [];
				param_list.push( data['sustain'] );
				param_list.push( data['param2'] );
				param_list.push( data['param3'] );
				param_list.push( data['param4'] );
				param_list.push( data['param5'] );
				param_list.push( data['param6'] );
				param_list.push( data['param7'] );
				param_list.push( data['param8'] );
				param_list[0] = param_list[0].replace("无限","518400000");
				cur_baseParam['sprite_DCCE_type'] = data['type'];
				cur_baseParam['sprite_DCCE_paramList'] = param_list;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 直接配置（@@@dce[setData:……]） drill_continued_effect
			if( String(args[0]) == "setData" ){
				cur_baseParam['sprite_DCCE_type'] = String(args[1]);
				var param_list = args;
				param_list.shift();
				param_list.shift();
				param_list[0] = param_list[0].replace("无限","518400000");
				cur_baseParam['sprite_DCCE_paramList'] = param_list;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 关闭配置（@@@dce[off]） drill_continued_effect
			if( String(args[0]) == "off" ){
				cur_baseParam['sprite_DCCE_type'] = undefined;
				cur_baseParam['sprite_DCCE_paramList'] = undefined;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
}
//==============================
// * 贴图控制 - 创建贴图 - 贴图对象（可继承）
//==============================
var _drill_DCCE_COWCSp_sprite_newSprite = Bitmap.prototype.drill_COWCSp_sprite_newSprite;
Bitmap.prototype.drill_COWCSp_sprite_newSprite = function( baseParam ){
	
	if( baseParam['sprite_DCCE_type'] != undefined &&	//『绘制过程定义』 - 预设配置（@@@dce[setPre:1]）
		baseParam['sprite_DCCE_type'] != "" ){			//『绘制过程定义』 - 直接配置（@@@dce[setData:……]）
														//『绘制过程定义』 - 关闭配置（@@@dce[off]）
		var temp_sprite = new Drill_DCCE_Sprite();
		temp_sprite.visible = false;			//（准备好了再显示）
		
		var type = baseParam['sprite_DCCE_type'];
		var params = baseParam['sprite_DCCE_paramList'];
		
		if( type == "标准闪烁" ){
			temp_sprite.drill_DCCE_playSustainingFlicker( Number(params[0]),Number(params[1]) );
		}
		if( type == "渐变闪烁" ){
			temp_sprite.drill_DCCE_playSustainingFlickerCos( Number(params[0]),Number(params[1]) );
		}
		if( type == "顺时针旋转" ){
			temp_sprite.drill_DCCE_playSustainingRotate( Number(params[0]),Number(params[1]), 1 );
		}
		if( type == "逆时针旋转" ){
			temp_sprite.drill_DCCE_playSustainingRotate( Number(params[0]),Number(params[1]), -1 );
		}
		if( type == "垂直卡片旋转" ){
			temp_sprite.drill_DCCE_playSustainingRotateVer( Number(params[0]),Number(params[1]) );
		}
		if( type == "水平卡片旋转" ){
			temp_sprite.drill_DCCE_playSustainingRotateHor( Number(params[0]),Number(params[1]) );
		}
		
		if( type == "上下震动" ){
			temp_sprite.drill_DCCE_playSustainingShakeUD( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "左右震动" ){
			temp_sprite.drill_DCCE_playSustainingShakeLR( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "左右摇晃" ){
			temp_sprite.drill_DCCE_playSustainingShakeRotate( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "钟摆摇晃" ){
			temp_sprite.drill_DCCE_playSustainingPendulumRotate( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "锚点摇晃" ){
			temp_sprite.drill_DCCE_playSustainingAnchorRotate( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "呼吸效果" ){
			temp_sprite.drill_DCCE_playSustainingBreathing( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "原地小跳" ){
			temp_sprite.drill_DCCE_playSustainingJumping( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "旋转状态" ){
			temp_sprite.drill_DCCE_playSustainingRotateState( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		if( type == "缩放状态" ){
			temp_sprite.drill_DCCE_playSustainingResizeState( Number(params[0]),Number(params[1]),Number(params[2]) );
		}
		
		if( type == "顺时针旋转(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingRotate_Gradual( Number(params[0]),Number(params[1]),1,Number(params[2]),Number(params[3]) );
		}
		if( type == "逆时针旋转(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingRotate_Gradual( Number(params[0]),Number(params[1]),-1,Number(params[2]),Number(params[3]) );
		}
		if( type == "垂直卡片旋转(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingRotateVer_Gradual( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]) );
		}
		if( type == "水平卡片旋转(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingRotateHor_Gradual( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]) );
		}
		
		if( type == "反复缩放" ){
			temp_sprite.drill_DCCE_playSustainingZooming( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]),Number(params[4]) );
		}
		if( type == "空中飘浮" ){
			temp_sprite.drill_DCCE_playSustainingFloating( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]),Number(params[4]) );
		}
		if( type == "上下震动(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingShakeUD_Gradual( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]),Number(params[4]) );
		}
		if( type == "左右震动(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingShakeLR_Gradual( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]),Number(params[4]) );
		}
		if( type == "左右摇晃(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingShakeRotate_Gradual( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]),Number(params[4]) );
		}
		if( type == "钟摆摇晃(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingPendulumRotate_Gradual( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]),Number(params[4]) );
		}
		if( type == "锚点摇晃(渐变)" ){
			temp_sprite.drill_DCCE_playSustainingAnchorRotate_Gradual( Number(params[0]),Number(params[1]),Number(params[2]),Number(params[3]),Number(params[4]) );
		}
		
		return temp_sprite;
	}
	
	// > 原函数
	return _drill_DCCE_COWCSp_sprite_newSprite.call( this, baseParam );
};
//==============================
// * 贴图控制 - 创建贴图 - 贴图对象（继承）
//==============================
if( Imported.Drill_CoreOfWindowCharacterSprite ){
	
	var _drill_DCCE_COWCSp_timing_spriteStart = Bitmap.prototype.drill_COWCSp_timing_spriteStart;
	Bitmap.prototype.drill_COWCSp_timing_spriteStart = function( sprite, sprite_index, textBlock, row_index, text_index ){
		_drill_DCCE_COWCSp_timing_spriteStart.call( this, sprite, sprite_index, textBlock, row_index, text_index );
		
		if( sprite instanceof Drill_DCCE_Sprite ){
			sprite.drill_DCCE_checkData();
			var p_data = sprite._drill_DCCE_param;	//（这里暂时只考虑吧时间归零实现刷新效果）
			p_data['fA_time'] = 0;
			p_data['fB_time'] = 0;
			p_data['fC_time'] = 0;
			p_data['fZ_time'] = 0;
			
			p_data['fC_ex_curSpeed'] = 0;
			p_data['fC_ex_maxSpeed'] = 0;
			p_data['fC_ex_leftTime'] = 0;
			
			p_data['f_isEnd'] = false;
			p_data['f_cur_speed'] = 0;
			p_data['f_cur_pos'] = 0;
		}
	};
}


//=============================================================================
// ** 持续动作字符块贴图【Drill_DCCE_Sprite】
//=============================================================================
//==============================
// * 字符块贴图 - 定义
//==============================
function Drill_DCCE_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_DCCE_Sprite.prototype = Object.create(Sprite.prototype);
Drill_DCCE_Sprite.prototype.constructor = Drill_DCCE_Sprite;
//==============================
// * 字符块贴图 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	// > 初始化 数据
	this.drill_DCCE_checkData();
}
//==============================
// * 字符块贴图 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_checkData = function() {
	
	// > 贴图属性
	if( this._drill_DCCE_spriteData == undefined ){
		this._drill_DCCE_spriteData = {};				//（不要用initMembers，follower没有这个方法）
		this._drill_DCCE_spriteData.anchor_x = 0.5;		// 锚点X
		this._drill_DCCE_spriteData.anchor_y = 0.5;		// 锚点Y
		this._drill_DCCE_spriteData.x = 0;				// 位置X
		this._drill_DCCE_spriteData.y = 0;				// 位置Y
		this._drill_DCCE_spriteData.scale_x = 0;		// 缩放X
		this._drill_DCCE_spriteData.scale_y = 0;		// 缩放Y
		this._drill_DCCE_spriteData.opacity = -1;		// 透明度（不叠加）
		this._drill_DCCE_spriteData.skew_x = 0;			// 斜切X
		this._drill_DCCE_spriteData.skew_y = 0;			// 斜切Y
		this._drill_DCCE_spriteData.rotation = 0;		// 旋转
		
		this._drill_DCCE_spriteData.real_width = -1;	// 贴图宽
		this._drill_DCCE_spriteData.real_height = -1;	// 贴图高
	}
	
	// > 动作配置
	if( this._drill_DCCE_param == undefined ){
		this._drill_DCCE_param = {};
		this._drill_DCCE_param.playing_type = "";		// 显示类型
	}
}
//==============================
// * 字符块贴图 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_DCCE_updateOrg();			//帧刷新 - 固定帧初始值
	this.drill_DCCE_updateEffect();			//帧刷新 - 执行变换
	this.drill_DCCE_updateBitmap();			//帧刷新 - 获取资源宽高
	
	if( this._drill_DCCE_spriteData == undefined ){ return; } 		//需要等资源加载完成
	if( this._drill_DCCE_spriteData.real_width == -1 ){ return; }	//
	if( this._drill_DCCE_spriteData.real_height == -1 ){ return; }	//
	
	if( this.drill_COWCSp_sprite_isTimingEnabled() == true ){ 	// 是否处于逐个绘制流程中【窗口字符 - 窗口字符贴图核心】
		//（逐个绘制时，不要在帧刷新里显示）
	}else{
		this.visible = true;
	}
	
	this.drill_DCCE_updateSustainingFlicker();					//帧刷新 - 标准闪烁
	this.drill_DCCE_updateSustainingFlickerCos();				//帧刷新 - 渐变闪烁
	this.drill_DCCE_updateSustainingRotate();					//帧刷新 - 顺时针/逆时针旋转
	this.drill_DCCE_updateSustainingRotateVer();				//帧刷新 - 垂直卡片旋转
	this.drill_DCCE_updateSustainingRotateHor();				//帧刷新 - 水平卡片旋转
	this.drill_DCCE_updateSustainingShakeUD();					//帧刷新 - 上下震动
	this.drill_DCCE_updateSustainingShakeLR();					//帧刷新 - 左右震动
	this.drill_DCCE_updateSustainingShakeRotate();				//帧刷新 - 左右摇晃
	this.drill_DCCE_updateSustainingPendulumRotate();			//帧刷新 - 钟摆摇晃
	this.drill_DCCE_updateSustainingAnchorRotate();				//帧刷新 - 锚点摇晃
	this.drill_DCCE_updateSustainingBreathing();				//帧刷新 - 呼吸效果
	this.drill_DCCE_updateSustainingJumping();					//帧刷新 - 原地小跳
	this.drill_DCCE_updateSustainingZooming();					//帧刷新 - 反复缩放
	this.drill_DCCE_updateSustainingFloating();					//帧刷新 - 空中飘浮
	this.drill_DCCE_updateSustainingRotateState();				//帧刷新 - 旋转状态
	this.drill_DCCE_updateSustainingResizeState();				//帧刷新 - 缩放状态
	this.drill_DCCE_updateSustainingRotate_Gradual();			//帧刷新 - 顺时针/逆时针旋转(渐变)
	this.drill_DCCE_updateSustainingRotateVer_Gradual();		//帧刷新 - 垂直卡片旋转(渐变)
	this.drill_DCCE_updateSustainingRotateHor_Gradual();		//帧刷新 - 水平卡片旋转(渐变)
	this.drill_DCCE_updateSustainingShakeUD_Gradual();			//帧刷新 - 上下震动(渐变)
	this.drill_DCCE_updateSustainingShakeLR_Gradual();			//帧刷新 - 左右震动(渐变)
	this.drill_DCCE_updateSustainingShakeRotate_Gradual();		//帧刷新 - 左右摇晃(渐变)
	this.drill_DCCE_updateSustainingPendulumRotate_Gradual();	//帧刷新 - 钟摆摇晃(渐变)
	this.drill_DCCE_updateSustainingAnchorRotate_Gradual();		//帧刷新 - 锚点摇晃(渐变)
}

//==============================
// * 字符块贴图 - 帧刷新 - 固定帧初始值
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateOrg = function() {
	this.x = this.drill_COWCSp_sprite_getOrgX();	// 位置X （获取贴图原位置X【窗口字符 - 窗口字符贴图核心】）
	this.y = this.drill_COWCSp_sprite_getOrgY();	// 位置Y （获取贴图原位置Y【窗口字符 - 窗口字符贴图核心】）
	this.scale.x = 1;								// 缩放X
	this.scale.y = 1;								// 缩放Y
	//this.skew.x = 0;								// 斜切X
	//this.skew.y = 0;								// 斜切Y
	this.rotation = 0;								// 旋转
}
//==============================
// * 字符块贴图 - 帧刷新 - 执行变换
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateEffect = function() {
	if( this.drill_DCCE_isPlaying() != true ){ return; }
	
	this.x += this._drill_DCCE_spriteData.x;					// x
	this.y += this._drill_DCCE_spriteData.y;					// y
	this.rotation += this._drill_DCCE_spriteData.rotation;		// 旋转
	this.scale.x += this._drill_DCCE_spriteData.scale_x;		// 缩放x
	this.scale.y += this._drill_DCCE_spriteData.scale_y;		// 缩放y
	//this.skew.x += this._drill_DCCE_spriteData.skew_x;		// 斜切x
	//this.skew.y += this._drill_DCCE_spriteData.skew_y;		// 斜切y
	
	if( this._drill_DCCE_spriteData.opacity != -1 ){
		this.opacity = this._drill_DCCE_spriteData.opacity;	// 透明度
	}
}
//==============================
// * 字符块贴图 - 帧刷新 - 获取资源宽高
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() &&
		this._drill_DCCE_spriteData != undefined ){
		this._drill_DCCE_spriteData.real_width = this.bitmap.width;
		this._drill_DCCE_spriteData.real_height = this.bitmap.height;
	}
}

//==============================
// * 字符块贴图 - 是否正在播放（开放函数）
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_isPlaying = function() {
	if( this._drill_DCCE_param == undefined ){ return false; }
	if( this._drill_DCCE_param.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 字符块贴图 - 获取正在播放的类型（开放函数）
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_getPlayingType = function() {
	if( this._drill_DCCE_param == undefined ){ return ""; }
	return this._drill_DCCE_param.playing_type;
}
//==============================
// * 字符块贴图 - 设置透明度（开放函数）
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_setOpacity = function( opacity ){
	this._opacity = opacity;
}
//==============================
// * 字符块贴图 - 立即终止动作（开放函数）
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_stopEffect = function() {
	if( this._drill_DCCE_spriteData != undefined &&
		this._drill_DCCE_spriteData.opacity != -1 ){
		this.drill_DCCE_setOpacity(255);  //（透明度若出现修改才还原）
	}
	
	// > 只删 spriteData
	this._drill_DCCE_spriteData = undefined;
	this.drill_DCCE_checkData();
	
	// > 配置参数保留
	if( this._drill_DCCE_param != undefined ){
		this._drill_DCCE_param.playing_type = "";
	}
}

//==============================
// * 字符块贴图 - 数学工具 - 锁定锚点
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
Game_Temp.prototype.drill_DCCE_Math2D_getFixPointInAnchor = function( 
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
// * 字符块贴图 - 数学工具 - 抛物线三点式
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//					> x3,y3 数字（点C）
//			返回：	> { a:0, b:0, c:0 } （抛物线公式的abc）
//			
//			说明：	已知三点，返回抛物线公式 y = a*x^2 + b*x + c 的abc值。
//==============================
Game_Temp.prototype.drill_DCCE_Math2D_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
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
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingFlicker = function( allTime, period ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingFlicker = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "标准闪烁" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 闪烁 - 灭
		s_data.opacity = 1 ;
		this.drill_DCCE_setOpacity(s_data.opacity);
		
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		
		// > 闪烁 - 亮
		s_data.opacity = 255;
		this.drill_DCCE_setOpacity(s_data.opacity);
		
	}
		
	// > 闪烁 - 重置
	if( p_data.fB_time >= p_data.fB_dest ){
		p_data.fA_time = 0;
		p_data.fB_time = 0;
		s_data.opacity = 1;
		this.drill_DCCE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』渐变闪烁 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingFlickerCos = function( allTime, period ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
	p_data.playing_type = "渐变闪烁";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』渐变闪烁 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingFlickerCos = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "渐变闪烁" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.opacity = 127 + 126*Math.cos( ( 360* p_data.fA_time/p_data.fA_period )/180*Math.PI );
	this.drill_DCCE_setOpacity(s_data.opacity);
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』顺时针/逆时针旋转 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotate = function( allTime, period, prop ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
	p_data.playing_type = "顺时针/逆时针旋转";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	p_data.fA_speed = 360/period /180*Math.PI * prop;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	// > 『消除时差的不连续感』
	var s_data = this._drill_DCCE_spriteData;
	s_data.rotation = 0;
	s_data.rotation += p_data.fA_speed;
};
//==============================
// * 『持续动作』顺时针/逆时针旋转 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotate = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation += p_data.fA_speed;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』垂直卡片旋转 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateVer = function( allTime, period ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateVer = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
		
	p_data.fA_time ++;
	s_data.scale_x = -1 - 1.0 * Math.cos( p_data.fA_time*p_data.fA_speed + Math.PI );		//（取值范围 -2 ~ 0 ）

	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』水平卡片旋转 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateHor = function( allTime, period ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateHor = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.scale_y = -1 - 1.0 * Math.cos( p_data.fA_time*p_data.fA_speed + Math.PI );	//（取值范围 -2 ~ 0 ）
	//s_data.y = 0.5 * s_data.real_height * s_data.scale_y;								//（水平翻转的锚点补正）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』上下震动 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeUD = function( allTime, period, scope ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeUD = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.y = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』左右震动 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeLR = function( allTime, period, scope ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeLR = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.x = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』左右摇晃 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeRotate = function( allTime, period, scope ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeRotate = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』钟摆摇晃 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingPendulumRotate = function( allTime, period, scope ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingPendulumRotate = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』锚点摇晃 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingAnchorRotate = function( allTime, period, scope ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingAnchorRotate = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』呼吸效果 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingBreathing = function( allTime, period, scope ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingBreathing = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "呼吸效果" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.scale_y = (p_data.fA_scope / s_data.real_height) * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』原地小跳 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingJumping = function( allTime, period, jump_height ){
	this.drill_DCCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
	p_data.playing_type = "原地小跳";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_dest = Math.floor(period*0.25);
	p_data.fA_abc = $gameTemp.drill_DCCE_Math2D_getParabolicThree( 0,0, p_data.fA_dest*0.5,-0.1, p_data.fA_dest,0 );
	p_data.fB_time = 0;
	p_data.fB_dest = Math.floor(period*0.6);
	p_data.fB_abc = $gameTemp.drill_DCCE_Math2D_getParabolicThree( 0,0, p_data.fB_dest*0.5,jump_height, p_data.fB_dest,0 );
	p_data.fC_time = 0;
	p_data.fC_dest = Math.floor(period*0.15);
	p_data.fC_abc = $gameTemp.drill_DCCE_Math2D_getParabolicThree( 0,0, p_data.fC_dest*0.5,-0.05, p_data.fC_dest,0 );
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』原地小跳 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingJumping = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "原地小跳" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 起跳缓冲
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
	
		var t = p_data.fA_time;
		s_data.scale_x = -1*( p_data.fA_abc['a']*t*t + p_data.fA_abc['b']*t + p_data.fA_abc['c'] );
		s_data.scale_y = -s_data.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
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
		var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
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
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』反复缩放 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingZooming = function( allTime, bufferTime, period, min_size,max_size ){
	this.drill_DCCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("反复缩放") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingZooming = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "反复缩放" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』反复缩放 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingZooming = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "反复缩放" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』空中飘浮 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingFloating = function( allTime, bufferTime, height,period,scope ){
	this.drill_DCCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("空中飘浮") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingFloating = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "空中飘浮" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』空中飘浮 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingFloating = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "空中飘浮" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』旋转状态 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateState = function( allTime, bufferTime, scope ){
	this.drill_DCCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("旋转状态") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotateState = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "旋转状态" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』旋转状态 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateState = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "旋转状态" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』缩放状态 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingResizeState = function( allTime, bufferTime, scope ){
	this.drill_DCCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("缩放状态") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingResizeState = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "缩放状态" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』缩放状态 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingResizeState = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "缩放状态" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotate_Gradual = function( allTime, period, prop, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("顺时针/逆时针旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
	
	p_data.f_prop = prop;
};
//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 结束动作
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;					//（路程值累加）
	s_data.rotation = p_data.f_cur_pos * p_data.f_prop;		//（区分顺时针逆时针）
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x, s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』垂直卡片旋转(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateVer_Gradual = function( allTime, period, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("垂直卡片旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotateVer_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateVer_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();		
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;								//（路程值累加）
	s_data.scale_x = -1 - 1.0 * Math.cos( p_data.f_cur_pos + Math.PI );	//（取值范围 -2 ~ 0 ）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』水平卡片旋转(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateHor_Gradual = function( allTime, period, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("水平卡片旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotateHor_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateHor_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();		
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;									//（路程值累加）
	s_data.scale_y = -1 - 1.0 * Math.cos( p_data.f_cur_pos + Math.PI );		//（取值范围 -2 ~ 0 ）	
	//s_data.y = 0.5 * s_data.real_height * s_data.scale_y;					//（水平翻转的锚点补正）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』上下震动(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeUD_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("上下震动(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingShakeUD_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeUD_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.y = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』左右震动(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeLR_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("左右震动(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingShakeLR_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeLR_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.x = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};


//==============================
// * 『持续动作』左右摇晃(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("左右摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingShakeRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』钟摆摇晃(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingPendulumRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("钟摆摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingPendulumRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingPendulumRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_DCCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};

//==============================
// * 『持续动作』锚点摇晃(渐变) - 初始化
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingAnchorRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_DCCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_DCCE_getPluginTip_allTimeError("锚点摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingAnchorRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
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
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingAnchorRotate_Gradual = function() {
	var p_data = this._drill_DCCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃(渐变)" ){ return; }
	var s_data = this._drill_DCCE_spriteData;
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
		this.drill_DCCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_DCCE_stopEffect();
	}
};



//=============================================================================
// ** ☆DEBUG动作效果测试
//
//			说明：	> 此模块控制 DEBUG动作效果测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG动作效果测试 - 帧刷新（地图界面）
//==============================
var _drill_DCCE_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DCCE_debugMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DCCE_DebugEnabled == true ){
		$gameTemp._drill_DCCE_DebugEnabled = undefined;
		this.drill_DCCE_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_DCCE_DebugEnabled == false ){
		$gameTemp._drill_DCCE_DebugEnabled = undefined;
		if( this._drill_DCCE_DebugSprite != undefined ){
			this.removeChild(this._drill_DCCE_DebugSprite);
			this._drill_DCCE_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG动作效果测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_DCCE_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DCCE_DebugSprite != undefined ){
		this.removeChild(this._drill_DCCE_DebugSprite);
		this._drill_DCCE_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
	var temp_sprite = new Sprite();
	temp_sprite.x = Graphics.boxWidth*0.5;
	temp_sprite.y = Graphics.boxHeight*0.5;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = temp_bitmap;
	temp_sprite.bitmap.fillAll("rgba(0,0,0,0.5)");
	this.addChild( temp_sprite );	//（直接加在最顶层的上面）
	this._drill_DCCE_DebugSprite = temp_sprite;
	
	// > 绘制 - DEBUG显示画布范围
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 20;
	options['infoParam']['y'] = 20;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['baseParam'] = {};
	//options['baseParam']['drawDebugBaseRect'] = true;
	options['baseParam']['sprite_debugRect'] = true;
	options['baseParam']['fontSize'] = 20;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 30;	//（加行高隔开一下）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_DCCE_PluginTip_curName + "】<br>" + 
				"该插件主要给字符块贴图对象，添加持续动作效果。<br>" + 
				
				"》》贴图测试（无限持续时间）： \\fr\n" + 
				"\\dtsp[3:6]" + 
				"    标准闪烁  \\dDCCE[标准闪烁:持续时间[无限]:周期[30]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    渐变闪烁  \\dDCCE[渐变闪烁:持续时间[无限]:周期[30]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    顺时针旋转  \\dDCCE[顺时针旋转:持续时间[无限]:周期[30]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    逆时针旋转  \\dDCCE[逆时针旋转:持续时间[无限]:周期[30]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    垂直卡片旋转  \\dDCCE[垂直卡片旋转:持续时间[无限]:周期[30]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    水平卡片旋转  \\dDCCE[水平卡片旋转:持续时间[无限]:周期[30]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    上下震动  \\dDCCE[上下震动:持续时间[无限]:周期[6]:震动幅度[10]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    左右震动  \\dDCCE[左右震动:持续时间[无限]:周期[6]:震动幅度[10]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    左右摇晃  \\dDCCE[左右摇晃:持续时间[无限]:周期[20]:摇晃幅度[15]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    钟摆摇晃  \\dDCCE[钟摆摇晃:持续时间[无限]:周期[20]:摇晃幅度[15]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    锚点摇晃  \\dDCCE[锚点摇晃:持续时间[无限]:周期[20]:摇晃幅度[15]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    呼吸效果  \\dDCCE[呼吸效果:持续时间[无限]:周期[45]:呼吸幅度[4]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    原地小跳  \\dDCCE[原地小跳:持续时间[无限]:周期[90]:跳跃高度[20]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    反复缩放  \\dDCCE[反复缩放:持续时间[无限]:缓冲时间[10]:周期[60]:最小缩放[1.00]:最大缩放[1.25]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    空中飘浮      \\dDCCE[空中飘浮:持续时间[无限]:缓冲时间[60]:飘浮高度[10]:周期[30]:幅度[8]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    旋转状态  \\dDCCE[旋转状态:持续时间[无限]:缓冲时间[60]:旋转角度[90]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    缩放状态  \\dDCCE[缩放状态:持续时间[无限]:缓冲时间[60]:缩放比例[1.5]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    顺时针旋转(渐变)  \\dDCCE[顺时针旋转(渐变):持续时间[无限]:周期[8]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    逆时针旋转(渐变)  \\dDCCE[逆时针旋转(渐变):持续时间[无限]:周期[8]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    垂直卡片旋转(渐变)  \\dDCCE[垂直卡片旋转(渐变):持续时间[无限]:周期[8]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    水平卡片旋转(渐变)  \\dDCCE[水平卡片旋转(渐变):持续时间[无限]:周期[8]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    上下震动(渐变)  \\dDCCE[上下震动(渐变):持续时间[无限]:周期[6]:震动幅度[4]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    左右震动(渐变)  \\dDCCE[左右震动(渐变):持续时间[无限]:周期[6]:震动幅度[4]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    左右摇晃(渐变)  \\dDCCE[左右摇晃(渐变):持续时间[无限]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n" + 
				"    钟摆摇晃(渐变)  \\dDCCE[钟摆摇晃(渐变):持续时间[无限]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off]           " + 
				"    锚点摇晃(渐变)  \\dDCCE[锚点摇晃(渐变):持续时间[无限]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]\\dts[测试的贴图]\\dDCCE[off] \\fr\n";
				
	temp_bitmap.drill_COWC_drawText( text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	temp_sprite.drill_COWCSp_sprite_refreshAllSprite();
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharContinuedEffect = false;
		var pluginTip = DrillUp.drill_DCCE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


