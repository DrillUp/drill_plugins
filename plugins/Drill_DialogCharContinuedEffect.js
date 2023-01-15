//=============================================================================
// Drill_DialogCharContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        窗口字符 - 字符块持续动作效果
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
 *   - Drill_CoreOfWindowCharacter     窗口字符-窗口字符核心
 *     需要该核心才能建立字符块，并播放动作效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于任何窗口。
 * 2.更多详细内容，去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.所有字符块建立后，动作都是并行的，且不可控制。
 *   (2.常用于 对话框 显示特殊字符。一般的窗口也能够支持字符块，
 *      但具体情况需要设置 窗口字符 后才能知道是否有效。
 *   (3.字符块的效果无法与滤镜效果、方块粉碎效果叠加。
 * 完整流程动作：
 *   (1.含有"缓冲时间"的动作都有一套 开始、持续、结束 的流程。
 *      比如"空中飘浮"、"旋转状态"、"缩放状态"等动作。
 *   (2.以"空中飘浮"动作为例，开始、结束的过程，会在缓冲时间内完成。
 *      持续150，缓冲60，那么整个动作将在 60+150+60 的时间内完成。
 *      "空中飘浮"可以设置无限持续时间，但由于是窗口字符，设置后
 *      就无法停下来了。
 * 设计：
 *   (1."\dDCCE[某文字:预设[4]]"表示将三个字符作为一个字符块来执行
 *      动作效果。如果你想让三个字符分别执行不同动作，这样写：
 *      "\dDCCE[某:预设[4]]\dDCCE[文:预设[4]]\dDCCE[字:预设[4]]"
 *   (2.含动作的窗口字符，写出来的字符串会超级长。
 *      你可以先将超长字符串写在记事本中，然后粘贴在对话框中。
 *      对话框中没有字数限制，所以不必担心字符串太长显示不了的问题。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 预设配置
 * 你可以设置预设，减少窗口字符的长度：
 * （注意，必须用英文冒号，并且没有空格）
 * 
 * 窗口字符：\dDCCE[文本[某文字]:预设[4]]
 * 窗口字符：\dDCCE[某文字:预设[4]]
 * 窗口字符：\dDCCE[某文字:4]
 * 
 * 1.你可以通过预设来减少窗口字符的长度。
 *   最短的可以连"文本[]"和"预设[]"都不写，只留下"\dDCCE[某文字:4]"格式。
 *   但是注意，不要与其他的窗口字符混淆了。
 * 2."dDCCE"表示 drill插件下 DCCE 的插件（该插件的简称）。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 直接配置
 * 你可以使用下面的窗口字符来实现：
 * （注意，必须用英文冒号，并且没有空格）
 * 
 * 窗口字符：\dDCCE[文本[某文字]:标准闪烁:持续时间[60]:周期[30]]
 * 窗口字符：\dDCCE[文本[某文字]:渐变闪烁:持续时间[60]:周期[30]]
 * 窗口字符：\dDCCE[文本[某文字]:顺时针旋转:持续时间[60]:周期[30]]
 * 窗口字符：\dDCCE[文本[某文字]:逆时针旋转:持续时间[60]:周期[30]]
 * 窗口字符：\dDCCE[文本[某文字]:垂直卡片旋转:持续时间[60]:周期[30]]
 * 窗口字符：\dDCCE[文本[某文字]:水平卡片旋转:持续时间[60]:周期[30]]
 * 窗口字符：\dDCCE[文本[某文字]:上下震动:持续时间[60]:周期[6]:震动幅度[10]]
 * 窗口字符：\dDCCE[文本[某文字]:左右震动:持续时间[60]:周期[6]:震动幅度[10]]
 * 窗口字符：\dDCCE[文本[某文字]:左右摇晃:持续时间[40]:周期[20]:摇晃幅度[15]]
 * 窗口字符：\dDCCE[文本[某文字]:钟摆摇晃:持续时间[40]:周期[20]:摇晃幅度[15]]
 * 窗口字符：\dDCCE[文本[某文字]:锚点摇晃:持续时间[40]:周期[20]:摇晃幅度[15]]
 * 窗口字符：\dDCCE[文本[某文字]:呼吸效果:持续时间[180]:周期[45]:呼吸幅度[4]]
 * 窗口字符：\dDCCE[文本[某文字]:原地小跳:持续时间[180]:周期[90]:跳跃高度[20]]
 * 窗口字符：\dDCCE[文本[某文字]:反复缩放:持续时间[180]:周期[60]:最小缩放[1.00]:最大缩放[1.25]]
 * 窗口字符：\dDCCE[文本[某文字]:空中飘浮:持续时间[150]:缓冲时间[60]:飘浮高度[100]:周期[30]:幅度[8]]
 * 窗口字符：\dDCCE[文本[某文字]:旋转状态:持续时间[150]:缓冲时间[60]:旋转角度[90]]
 * 窗口字符：\dDCCE[文本[某文字]:缩放状态:持续时间[150]:缓冲时间[60]:缩放比例[1.5]]
 * 窗口字符：\dDCCE[文本[某文字]:顺时针旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:逆时针旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:垂直卡片旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:水平卡片旋转(渐变):持续时间[40]:周期[8]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:上下震动(渐变):持续时间[40]:周期[6]:震动幅度[4]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:左右震动(渐变):持续时间[40]:周期[6]:震动幅度[4]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:左右摇晃(渐变):持续时间[40]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:钟摆摇晃(渐变):持续时间[40]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]
 * 窗口字符：\dDCCE[文本[某文字]:锚点摇晃(渐变):持续时间[40]:周期[8]:摇晃幅度[25]:开始时间[90]:结束时间[60]]
 * 
 * 1.前半部分（图片）和 后半部分（标准闪烁 : 持续时间[60] : 周期[30]）
 *   的参数可以随意组合。一共有4*26种组合方式。
 * 2.参数中"时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"幅度"、"高度"的单位是像素。
 * 3."标准闪烁 : 持续时间[60] : 周期[30]"表示：
 *    闪烁30帧，15帧透明，15帧不透明，持续60帧。也就是闪两次。
 * 4."旋转"类型中，一个周期旋转一整圈。
 *   持续60帧，周期30帧，则表示图像旋转两圈后结束。
 * 5."空中飘浮"类型中，包含飘起、漂浮中、飘落三种状态。
 *   缓冲时间对应飘起飘落的时间，可以应用于某种法术的释放动作。
 * 6."(渐变)"类型的效果，无论周期、结束时间如何，在结束动作后，
 *   都能够在原状态下慢慢减速停住。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 无限时间
 * 你可以将上面窗口字符的持续时间中，填"无限"：
 * 
 * 窗口字符：\dDCCE[文本[某文字]:标准闪烁:持续时间[无限]:周期[30]]
 * 窗口字符：\dDCCE[文本[某文字]:旋转状态:持续时间[无限]:缓冲时间[60]:旋转角度[90]]
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
 * 测试方法：   放置10个窗口字符，在不同的界面中测试。
 * 测试结果：   地图界面中，平均消耗为：【17.64ms】
 *              战斗界面中，平均消耗为：【12.60ms】
 *              菜单界面中，平均消耗为：【7.56ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每添加一个窗口字符块，就对应一个变化跳动的贴图。
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
 * @default {"标签":"==反复缩放==","持续动作类型":"反复缩放","持续时长":"无限","参数2":"60","参数3":"1.00","参数4":"1.25","参数5":"0","参数6":"0","参数7":"0","参数8":"0"}
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
//		★性能测试因素	对话管理层
//		★性能测试消耗	7.56ms，12.60ms（Drill_DCCE_Sprite.prototype.update）17.64ms（drill_DCCE_updateBitmap）
//		★最坏情况		地图中添加了大量头顶文字，而且这些文字还都是跳动的字符块。
//		★备注			对话管理层测试时直接卡到2-3帧，但都不是对话框插件造成的影响，有必要对其他插件进行整体优化了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			持续动作效果：
//				->动作
//					->标准闪烁
//					->渐变闪烁
//					->标准旋转（顺/逆时针）
//					->垂直卡片旋转
//					->水平卡片旋转
//					->上下震动
//					->左右震动
//					->左右摇晃
//					->钟摆摇晃
//					->锚点摇晃
//				->其他
//					->数学锚点变换问题
//
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//
//		★其它说明细节：
//			1.图片的锚点不是固定的，可能会到处变，注意控制锚点。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogCharContinuedEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogCharContinuedEffect');


    //==============================
    // * 变量获取 - 预设
    //				（~struct~DCCEPreset）
    //==============================
    DrillUp.drill_DCCE_presetInit = function (dataFrom) {
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
        if (DrillUp.parameters['预设-' + String(i + 1)] != undefined &&
			DrillUp.parameters['预设-' + String(i + 1)] != "") {
            var data = JSON.parse(DrillUp.parameters['预设-' + String(i + 1)]);
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
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** 窗口字符指令
//=============================================================================
var _drill_DCCE_COWC_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_DCCE_COWC_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	if( command === "dDCCE" ){ 
		
		/*-----------------文本获取------------------*/
		var data_str = null;
		if( args.length >= 1 ){ 
			data_str = String(args[0]);
			data_str = data_str.replace("文本[","");
			data_str = data_str.replace("]","");
		}

	    /*-----------------预设------------------*/
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("预设[", "");
			temp1 = temp1.replace("]", "");
			temp1 = Number(temp1) -1;
			var data = DrillUp.g_DCCE_list[temp1];
			if( data == undefined ){ return; }
			if( data['type'] == "" ){ return; }
			
			var sustain_time = data['sustain'];
			if( sustain_time == "无限" ){ sustain_time = 518400000; }
			sustain_time = Number( sustain_time );
			var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
			
			if( data['type'] == "标准闪烁" ){
				temp_sprite.drill_DCCE_playSustainingFlicker( sustain_time, data['param2'] );
			}
			if( data['type'] == "渐变闪烁" ){
				temp_sprite.drill_DCCE_playSustainingFlickerCos( sustain_time, data['param2'] );
			}
			if( data['type'] == "顺时针旋转" ){
				temp_sprite.drill_DCCE_playSustainingRotate( sustain_time, data['param2'], 1 );
			}
			if( data['type'] == "逆时针旋转" ){
				temp_sprite.drill_DCCE_playSustainingRotate( sustain_time, data['param2'], -1 );
			}
			if( data['type'] == "垂直卡片旋转" ){
				temp_sprite.drill_DCCE_playSustainingRotateVer( sustain_time, data['param2'] );
			}
			if( data['type'] == "水平卡片旋转" ){
				temp_sprite.drill_DCCE_playSustainingRotateHor( sustain_time, data['param2'] );
			}
			if( data['type'] == "上下震动" ){
				temp_sprite.drill_DCCE_playSustainingShakeUD( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "左右震动" ){
				temp_sprite.drill_DCCE_playSustainingShakeLR( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "左右摇晃" ){
				temp_sprite.drill_DCCE_playSustainingShakeRotate( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "钟摆摇晃" ){
				temp_sprite.drill_DCCE_playSustainingPendulumRotate( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "锚点摇晃" ){
				temp_sprite.drill_DCCE_playSustainingAnchorRotate( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "呼吸效果" ){
				temp_sprite.drill_DCCE_playSustainingBreathing( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "原地小跳" ){
				temp_sprite.drill_DCCE_playSustainingJumping( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "反复缩放" ){
				temp_sprite.drill_DCCE_playSustainingZooming( sustain_time, data['param2'],  data['param3'],  data['param4'] );
			}
			if( data['type'] == "旋转状态" ){
				temp_sprite.drill_DCCE_playSustainingRotateState( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "缩放状态" ){
				temp_sprite.drill_DCCE_playSustainingResizeState( sustain_time, data['param2'],  data['param3'] );
			}
			if( data['type'] == "顺时针旋转(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingRotate_Gradual( sustain_time, data['param2'], -1, data['param3'], data['param4'] );
			}
			if( data['type'] == "逆时针旋转(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingRotate_Gradual( sustain_time, data['param2'], 1, data['param3'], data['param4'] );
			}
			if( data['type'] == "垂直卡片旋转(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingRotateVer_Gradual( sustain_time, data['param2'], data['param3'], data['param4'] );
			}
			if( data['type'] == "水平卡片旋转(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingRotateHor_Gradual( sustain_time, data['param2'], data['param3'], data['param4'] );
			}
			if( data['type'] == "空中飘浮" ){
				temp_sprite.drill_DCCE_playSustainingFloating( sustain_time, data['param2'], data['param3'], data['param4'], data['param5'] );
			}
			if( data['type'] == "上下震动(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingShakeUD_Gradual( sustain_time, data['param2'], data['param3'], data['param4'], data['param5'] );
			}
			if( data['type'] == "左右震动(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingShakeLR_Gradual( sustain_time, data['param2'], data['param3'], data['param4'], data['param5'] );
			}
			if( data['type'] == "左右摇晃(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingShakeRotate_Gradual( sustain_time, data['param2'], data['param3'], data['param4'], data['param5'] );
			}
			if( data['type'] == "钟摆摇晃(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingPendulumRotate_Gradual( sustain_time, data['param2'], data['param3'], data['param4'], data['param5'] );
			}
			if( data['type'] == "锚点摇晃(渐变)" ){
				temp_sprite.drill_DCCE_playSustainingAnchorRotate_Gradual( sustain_time, data['param2'], data['param3'], data['param4'], data['param5'] );
			}
			
			this.drill_COWC_addSprite( temp_sprite );
			this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
		}

		if( args.length == 4 ){ 
			var type = String(args[1]);
			var temp1 = String(args[2]);
			var temp2 = String(args[3]);
			/*-----------------标准闪烁 - 开始------------------*/
			if( type == "标准闪烁" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingFlicker( Number(temp1),Number(temp2) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}
			/*-----------------渐变闪烁 - 开始------------------*/
			if( type == "渐变闪烁" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingFlickerCos( Number(temp1),Number(temp2) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}
			/*-----------------顺时针旋转 - 开始------------------*/
			if( type == "顺时针旋转" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotate( Number(temp1),Number(temp2), 1 );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}
			/*-----------------逆时针旋转 - 开始------------------*/
			if( type == "逆时针旋转" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotate( Number(temp1),Number(temp2), -1 );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}
			/*-----------------垂直卡片旋转 - 开始------------------*/
			if( type == "垂直卡片旋转" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotateVer( Number(temp1),Number(temp2) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}
			/*-----------------水平卡片旋转 - 开始------------------*/
			if( type == "水平卡片旋转" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotateHor( Number(temp1),Number(temp2) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
		}
		
		if( args.length == 5 ){
			var type = String(args[1]);
			var temp1 = String(args[2]);
			var temp2 = String(args[3]);
			var temp3 = String(args[4]);
			/*-----------------上下震动 - 开始------------------*/
			if( type == "上下震动" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingShakeUD( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------左右震动 - 开始------------------*/
			if( type == "左右震动" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingShakeLR( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------左右摇晃 - 开始------------------*/
			if( type == "左右摇晃" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingShakeRotate( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------钟摆摇晃 - 开始------------------*/
			if( type == "钟摆摇晃" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingPendulumRotate( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------锚点摇晃 - 开始------------------*/
			if( type == "锚点摇晃" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingAnchorRotate( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------呼吸效果 - 开始------------------*/
			if( type == "呼吸效果" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("呼吸幅度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingBreathing( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------原地小跳 - 开始------------------*/
			if( type == "原地小跳" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("跳跃高度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingJumping( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------旋转状态 - 开始------------------*/
			if( type == "旋转状态" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("旋转角度[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotateState( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------缩放状态 - 开始------------------*/
			if( type == "缩放状态" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("缩放比例[","");
				temp3 = temp3.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingResizeState( Number(temp1),Number(temp2),Number(temp3) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
		}
		
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[2]);
			var temp2 = String(args[3]);
			var temp3 = String(args[4]);
			var temp4 = String(args[5]);
			/*-----------------反复缩放 - 开始------------------*/
			if( type == "反复缩放" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("最小缩放[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("最大缩放[","");
				temp4 = temp4.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingZooming( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------顺时针旋转(渐变) - 开始------------------*/
			if( type == "顺时针旋转(渐变)" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),-1,Number(temp3),Number(temp4) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------逆时针旋转(渐变) - 开始------------------*/
			if( type == "逆时针旋转(渐变)" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),1,Number(temp3),Number(temp4) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------垂直卡片旋转(渐变) - 开始------------------*/
			if( type == "垂直卡片旋转(渐变)" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotateVer_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------水平卡片旋转(渐变) - 开始------------------*/
			if( type == "水平卡片旋转(渐变)" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingRotateHor_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
		}
		
		if( args.length == 7 ){
			var type = String(args[1]);
			var temp1 = String(args[2]);
			var temp2 = String(args[3]);
			var temp3 = String(args[4]);
			var temp4 = String(args[5]);
			var temp5 = String(args[6]);
			/*-----------------空中飘浮 - 开始------------------*/
			if( type == "空中飘浮" ){
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
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingFloating( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------上下震动(渐变) - 开始------------------*/
			if( type == "上下震动(渐变)" ){
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
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingShakeUD_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------左右震动(渐变) - 开始------------------*/
			if( type == "左右震动(渐变)" ){
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
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingShakeLR_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------左右摇晃(渐变) - 开始------------------*/
			if( type == "左右摇晃(渐变)" ){
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
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingShakeRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------钟摆摇晃(渐变) - 开始------------------*/
			if( type == "钟摆摇晃(渐变)" ){
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
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingPendulumRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
			/*-----------------锚点摇晃(渐变) - 开始------------------*/
			if( type == "锚点摇晃(渐变)" ){
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
				var temp_sprite = this.drill_DCCE_createBlockSprite( data_str );
				temp_sprite.drill_DCCE_playSustainingAnchorRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
				this.drill_COWC_addSprite( temp_sprite );
				this.drill_COWC_charSubmit_Effect( temp_sprite._drill_width, 0 );
			}	
		}
		
	}
		
};
//==============================
// * 字符块 - 创建字符块贴图
//==============================
Window_Base.prototype.drill_DCCE_createBlockSprite = function( text ){
	var text_width = this.drill_COWA_getTextWidth( text );
	var text_height = this.drill_COWA_getTextHeight( text );
	var temp_sprite = new Drill_DCCE_Sprite();
	temp_sprite.visible = false;			//（准备好了再显示）
	temp_sprite.bitmap = new Bitmap( text_width +2, text_height +2 );
	temp_sprite.bitmap.textColor = this.contents.textColor;
	temp_sprite.bitmap.paintOpacity = this.contents.paintOpacity;
	temp_sprite.bitmap.fontSize = this.contents.fontSize;
	temp_sprite.bitmap['drill_elements_drawText'] = true;		//（高级渐变颜色 偏移标记）
	
	// > 画笔同步
	this.drill_COWC_drawSynchronization( this.contents, temp_sprite.bitmap );
	
	temp_sprite.bitmap.drawText( text, 0, 0, text_width, text_height );
	temp_sprite._drill_width = text_width;
	temp_sprite._drill_height = text_height;
	temp_sprite._drill_orgX = this._drill_COWC_effect_curData['x'] + text_width*0.5;		//（字符块出现在当前光标位置）
	temp_sprite._drill_orgY = this._drill_COWC_effect_curData['y'] + text_height*0.5;
	return temp_sprite;
};


//=============================================================================
// * 数学 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	修正 旋转+缩放 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					旋转值和缩放值可为负数。
//=============================================================================
Game_Temp.prototype.drill_DCCE_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图中心锚点 
					target_anchor_x,target_anchor_y, 	//新的中心锚点 
					width, height,						//贴图高宽
					rotation, scale_x, scale_y ) {		//变换的值（旋转+缩放）
	
	var ww = width * ( target_anchor_x - org_anchor_x );
	var hh = height * ( target_anchor_y - org_anchor_y );
	var xx = 0;
	var yy = 0;
	if( ww == 0 && hh == 0){ return { "x":0, "y":0 }; }
	if( ww == 0 ){ ww = 0.0001; }
	
	// > 先缩放
	var sww = ww*scale_x;
	var shh = hh*scale_y;
	
	// > 后旋转
	var r = Math.sqrt( Math.pow(sww,2) + Math.pow(shh,2) );
	var p_degree = Math.atan(shh/sww);	
	p_degree = Math.PI - p_degree;
	if( sww < 0 ){
		p_degree = Math.PI + p_degree;
	}
	
	// > 变换的偏移量
	xx += r*Math.cos( rotation - p_degree);		//圆公式 (x-a)²+(y-b)²=r²
	yy += r*Math.sin( rotation - p_degree);		//圆极坐标 x=ρcosθ,y=ρsinθ
	
	// > 锚点偏移量
	xx += ww;
	yy += hh;
	
	return { "x":xx, "y":yy };
}
//=============================================================================
// * 数学 - 抛物线三点式
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//					> x3,y3 数字（点C）
//			返回：	> { a:0, b:0, c:0 } （抛物线公式的abc）
//			
//			说明：	已知三点，返回抛物线公式 y = a*x^2 + b*x + c 的abc值。
//=============================================================================
Game_Temp.prototype.drill_DCCE_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}


//=============================================================================
// ** 持续动作字符块
//=============================================================================
//==============================
// * 字符块 - 定义
//==============================
function Drill_DCCE_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_DCCE_Sprite.prototype = Object.create(Sprite.prototype);
Drill_DCCE_Sprite.prototype.constructor = Drill_DCCE_Sprite;
//==============================
// * 字符块 - 初始化
//==============================
Drill_DCCE_Sprite.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	
	this._drill_orgX = 0;
	this._drill_orgY = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this._Drill_DCCE = {};					//（不要用initMembers，follower没有这个方法）
	this._Drill_DCCE.x = 0;					// x
	this._Drill_DCCE.y = 0;					// y
	this._Drill_DCCE.rotation = 0;			// 旋转
	this._Drill_DCCE.scale_x = 0;			// 缩放x
	this._Drill_DCCE.scale_y = 0;			// 缩放y
	this._Drill_DCCE.skew_x = 0;			// 斜切x
	this._Drill_DCCE.skew_y = 0;			// 斜切y
	
	this._Drill_DCCE.opacity = -1;			// 透明度（不叠加）
	this._Drill_DCCE.playing_type = "";		// 显示类型
	this._Drill_DCCE.real_width = -1;		// 贴图宽
	this._Drill_DCCE.real_height = -1;		// 贴图高
	this._Drill_DCCE.anchor_x = 0.5;		// 锚点中心x
	this._Drill_DCCE.anchor_y = 0.5;		// 锚点中心y
}
//==============================
// * 字符块 - 动作判定
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_isPlaying = function() {
	if( !this._Drill_DCCE ){ return false; }
	if( this._Drill_DCCE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 字符块 - 设置透明度
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_setOpacity = function(opacity) {
	this._opacity = opacity;
}
//==============================
// * 字符块 - 帧刷新
//==============================
Drill_DCCE_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_DCCE_updateOrg();			//帧刷新 - 固定帧初始值
	this.drill_DCCE_updateEffect();			//帧刷新 - 执行变换
	this.drill_DCCE_updateBitmap();			//帧刷新 - 获取图片宽高
	
	if( this._Drill_DCCE == undefined ){ return; } 
	if( this._Drill_DCCE.playing_type == "" ){ return; }
	if( this._Drill_DCCE.real_width == -1 ){ return; }		//需要等图片加载完成
	if( this._Drill_DCCE.real_height == -1 ){ return; }
	
	this.visible = true;
	
	this.drill_DCCE_updateSustainingFlicker();					//帧刷新 - 标准闪烁
	this.drill_DCCE_updateSustainingFlickerCos();					//帧刷新 - 渐变闪烁
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
// * 帧刷新 - 固定帧初始值
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateOrg = function() {
	this.x = this._drill_orgX;			// x
	this.y = this._drill_orgY;			// y
	this.rotation = 0;					// 旋转
	this.scale.x = 1;					// 缩放x
	this.scale.y = 1;					// 缩放y
	//this.skew.x = 0;					// 斜切x
	//this.skew.y = 0;					// 斜切y
}
//==============================
// * 帧刷新 - 执行变换
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateEffect = function() {
	if( !this.drill_DCCE_isPlaying() ){ return; }
	
	this.x += this._Drill_DCCE.x ;					// x
	this.y += this._Drill_DCCE.y ;					// y
	this.rotation += this._Drill_DCCE.rotation;		// 旋转
	this.scale.x += this._Drill_DCCE.scale_x;		// 缩放x
	this.scale.y += this._Drill_DCCE.scale_y;		// 缩放y
	//this.skew.x += this._Drill_DCCE.skew_x;		// 斜切x
	//this.skew.y += this._Drill_DCCE.skew_y;		// 斜切y
	
	if( this._Drill_DCCE.opacity != -1 ){
		this.opacity = this._Drill_DCCE.opacity;	// 透明度
	}
}
//==============================
// * 帧刷新 - 获取图片宽高
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() ){
		this._Drill_DCCE.real_width = this.bitmap.width;
		this._Drill_DCCE.real_height = this.bitmap.height;
	}
}
//==============================
// * 字符块 - 终止效果
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_stopEffect = function() {
	var ef = this._Drill_DCCE;
	ef.x = 0;					// x
	ef.y = 0;					// y
	ef.rotation = 0;			// 旋转
	ef.scale_x = 0;				// 缩放x
	ef.scale_y = 0;				// 缩放y
	ef.skew_x = 0;				// 斜切x
	ef.skew_y = 0;				// 斜切y
	ef.playing_type = "";
	if( ef.opacity != -1 ){ this.drill_DCCE_setOpacity(255); }		//透明度
	ef.opacity = -1 ;
}


//=============================================================================
// ** 持续动作
//=============================================================================
//==============================
// * 初始化 - 持续 标准闪烁
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingFlicker = function(time,period) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "标准闪烁";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.fA_time = 0;
	ef.fA_dest = period/2;
	ef.fB_time = 0;
	ef.fB_dest = period/2;
}
//==============================
// * 帧刷新 - 持续 标准闪烁
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingFlicker = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "标准闪烁" ){ return; }
	
	if( ef.fA_time < ef.fA_dest ){
		ef.fA_time ++;
		ef.opacity = 1 ;
		this.drill_DCCE_setOpacity(ef.opacity);
	}else if( ef.fB_time < ef.fB_dest ){
		ef.fB_time ++;
		ef.opacity = 255;
		this.drill_DCCE_setOpacity(ef.opacity);
	}
	ef.f_time ++;
	if( ef.f_time % ef.f_period == 0 ){
		ef.fA_time = 0;
		ef.fB_time = 0;
	}
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 渐变闪烁
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingFlickerCos = function(time,period) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "渐变闪烁";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
}
//==============================
// * 帧刷新 - 持续 渐变闪烁
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingFlickerCos = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "渐变闪烁" ){ return; }
	
	ef.f_time ++;
	ef.opacity = 127 + 126*Math.cos( ( 360* ef.f_time/ef.f_period )/180*Math.PI );
	this.drill_DCCE_setOpacity(ef.opacity);
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 顺时针/逆时针旋转
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotate = function(time,period,prop) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "顺时针/逆时针旋转";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI * prop;
}
//==============================
// * 帧刷新 - 持续 顺时针/逆时针旋转
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotate = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "顺时针/逆时针旋转" ){ return; }
	
	ef.f_time ++;
	ef.rotation += ef.f_speed;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 垂直卡片旋转
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateVer = function(time,period) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "垂直卡片旋转";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 垂直卡片旋转
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateVer = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "垂直卡片旋转" ){ return; }
		
	ef.f_time ++;
	ef.scale_x = -1 - 1.0 * Math.cos( ef.f_time*ef.f_speed + Math.PI );		//（取值范围 -2 ~ 0 ）

	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 水平卡片旋转
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateHor = function(time,period) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "水平卡片旋转";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 水平卡片旋转
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateHor = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "水平卡片旋转" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = -1 - 1.0 * Math.cos( ef.f_time*ef.f_speed + Math.PI );		//（取值范围 -2 ~ 0 ）
	
	ef.y = 0.5 * this._Drill_DCCE.real_height * ef.scale_y;	//（水平翻转的锚点补正）
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 上下震动
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeUD = function( time,period,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "上下震动";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 上下震动
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeUD = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "上下震动" ){ return; }
	
	ef.f_time ++;
	ef.y = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右震动
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeLR = function( time,period,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "左右震动";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 左右震动
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeLR = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "左右震动" ){ return; }
	
	ef.f_time ++;
	ef.x = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右摇晃
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeRotate = function( time,period,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "左右摇晃";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope /180*Math.PI;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 左右摇晃
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeRotate = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "左右摇晃" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 钟摆摇晃
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingPendulumRotate = function( time,period,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "钟摆摇晃";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope /180*Math.PI;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 钟摆摇晃
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingPendulumRotate = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "钟摆摇晃" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 锚点摇晃
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingAnchorRotate = function( time,period,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "锚点摇晃";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope /180*Math.PI;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 锚点摇晃
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingAnchorRotate = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "锚点摇晃" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}

//==============================
// * 初始化 - 持续 呼吸效果
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingBreathing = function( time,period,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "呼吸效果";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope ;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 呼吸效果
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingBreathing = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "呼吸效果" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = (ef.f_scope / ef.real_height) * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}

//==============================
// * 初始化 - 持续 原地小跳
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingJumping = function( time,period,jump_height ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "原地小跳";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	
	ef.fA_time = 0;
	ef.fA_dTime = period*0.25;
	ef.fA_abc = $gameTemp.drill_DCCE_getParabolicThree( 0,0, ef.fA_dTime*0.5,-0.1, ef.fA_dTime,0 );
	
	ef.fB_time = 0;
	ef.fB_dTime = period*0.6;
	ef.fB_abc = $gameTemp.drill_DCCE_getParabolicThree( 0,0, ef.fB_dTime*0.5,jump_height, ef.fB_dTime,0 );
	
	ef.fC_time = 0;
	ef.fC_dTime = period*0.15;
	ef.fC_abc = $gameTemp.drill_DCCE_getParabolicThree( 0,0, ef.fC_dTime*0.5,-0.1, ef.fC_dTime,0 );
	
}
//==============================
// * 帧刷新 - 持续 原地小跳
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingJumping = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "原地小跳" ){ return; }
	
	ef.f_time ++;
	
	// > 起跳缓冲
	if( ef.fA_time <= ef.fA_dTime ){
		ef.fA_time ++;
	
		var t = ef.fA_time;
		ef.scale_x = -1*( ef.fA_abc['a']*t*t + ef.fA_abc['b']*t + ef.fA_abc['c'] );
		ef.scale_y = -ef.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;	
		ef.y = fix_point.y;	
	
	// > 跳跃后高度变化
	}else if( ef.fB_time <= ef.fB_dTime ){
		ef.fB_time ++;
		
		var t = ef.fB_time;
		ef.y = -1*( ef.fB_abc['a']*t*t + ef.fB_abc['b']*t + ef.fB_abc['c'] );
		
	// > 踩地缓冲
	}else if( ef.fC_time <= ef.fC_dTime ){
		ef.fC_time ++;
		var t = ef.fC_time;
		ef.scale_x = -1*( ef.fC_abc['a']*t*t + ef.fC_abc['b']*t + ef.fC_abc['c'] );
		ef.scale_y = -ef.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;	
		ef.y = fix_point.y;	
	}
	
	// > 周期结束，重新跳
	if( ef.fC_time > ef.fC_dTime ){	
		ef.fA_time = 0;
		ef.fB_time = 0;
		ef.fC_time = 0;
	}
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}

//==============================
// * 初始化 - 持续 反复缩放
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingZooming = function( time,period,min_size,max_size ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "反复缩放";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_min = min_size -1;
	ef.f_max = max_size -1;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 反复缩放
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingZooming = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "反复缩放" ){ return; }
	
	ef.f_time ++;
	ef.scale_x = ef.f_min + (ef.f_max - ef.f_min)/2 + (ef.f_max - ef.f_min)/2 * Math.sin( ef.f_time*ef.f_speed );
	ef.scale_y = ef.scale_x;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 空中飘浮
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingFloating = function( time,b_time,height,period,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "空中飘浮";
	ef.f_isEnd = false;
	ef.f_height = height;
	ef.fA_time = 0;
	ef.fA_dest = b_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fB_period = period;
	ef.fB_scope = scope ;
	ef.fB_speed = 360/period /180*Math.PI;
	ef.fC_time = 0;
	ef.fC_dest = b_time;
}
//==============================
// * 结束动作 - 持续 空中飘浮
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingFloating = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "空中飘浮" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 空中飘浮
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingFloating = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "空中飘浮" ){ return; }
	
	// > 升起
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.y = ef.f_height * ef.fA_time / ef.fA_dest;
		ef.y *= -1;
		
	// > 漂浮
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		ef.y = ef.f_height + ef.fB_scope * Math.sin( ef.fB_time*ef.fB_speed );
		ef.y *= -1;
		
	// > 降落
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.y = ef.f_height * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		ef.y *= -1;
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 旋转状态
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateState = function( time,b_time,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "旋转状态";
	ef.f_isEnd = false;
	ef.f_scope = scope /180*Math.PI;
	ef.fA_time = 0;
	ef.fA_dest = b_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = b_time;
}
//==============================
// * 结束动作 - 持续 旋转状态
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotateState = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "旋转状态" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 旋转状态
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateState = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "旋转状态" ){ return; }
	
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.rotation = ef.f_scope * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		ef.rotation = ef.f_scope;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.rotation = ef.f_scope * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 缩放状态
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingResizeState = function( time,b_time,scope ) {
	var ef = this._Drill_DCCE;
	ef.playing_type = "缩放状态";
	ef.f_isEnd = false;
	ef.f_scope = scope - 1.0;
	ef.fA_time = 0;
	ef.fA_dest = b_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = b_time;
}
//==============================
// * 结束动作 - 持续 缩放状态
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingResizeState = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "缩放状态" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 缩放状态
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingResizeState = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "缩放状态" ){ return; }
	
	// > 开始缩放
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.scale_x = ef.f_scope * ef.fA_time / ef.fA_dest;
		ef.scale_y = ef.scale_x;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		ef.scale_x = ef.f_scope;
		ef.scale_y = ef.scale_x;
		
	// > 结束缩放
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.scale_x = ef.f_scope * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		ef.scale_y = ef.scale_x;
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 顺时针/逆时针旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotate_Gradual = function( time, period, prop, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "顺时针/逆时针旋转(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_prop = prop;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 顺时针/逆时针旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 顺时针/逆时针旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;				//（路程值累加）
	ef.rotation = ef.f_pos * ef.f_prop;		//（区分顺时针逆时针）
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x, ef.anchor_y, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
		
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){	
		ef.fB_time ++;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 垂直卡片旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateVer_Gradual = function( time, period, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "垂直卡片旋转(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 垂直卡片旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotateVer_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 垂直卡片旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateVer_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.scale_x = -1 - 1.0 * Math.cos( ef.f_pos + Math.PI );		//（取值范围 -2 ~ 0 ）
		
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){	
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){	
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();		
	}
}


//==============================
// * 初始化 - 持续 水平卡片旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingRotateHor_Gradual = function( time, period, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "水平卡片旋转(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 水平卡片旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingRotateHor_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "水平卡片旋转(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 水平卡片旋转(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingRotateHor_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "水平卡片旋转(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.scale_y = -1 - 1.0 * Math.cos( ef.f_pos + Math.PI );		//（取值范围 -2 ~ 0 ）	
	
	ef.y = 0.5 * ef.real_height * ef.scale_y;	//（水平翻转的锚点补正）
	
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){	
		ef.fB_time ++;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();		
	}
}


//==============================
// * 初始化 - 持续 上下震动(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeUD_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "上下震动(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 上下震动(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingShakeUD_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "上下震动(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 上下震动(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeUD_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "上下震动(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.y = ef.f_scope * Math.sin( ef.f_pos );
		
	// > 开始震动
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束震动
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右震动(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeLR_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "左右震动(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 左右震动(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingShakeLR_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "左右震动(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 左右震动(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeLR_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "左右震动(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.x = ef.f_scope * Math.sin( ef.f_pos );
		
	// > 开始震动
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束震动
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingShakeRotate_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "左右摇晃(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 左右摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingShakeRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "左右摇晃(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 左右摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingShakeRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "左右摇晃(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.rotation = ef.f_scope * Math.sin( ef.f_pos );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 开始摇晃
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束摇晃
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 钟摆摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingPendulumRotate_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "钟摆摇晃(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 钟摆摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingPendulumRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "钟摆摇晃(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 钟摆摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingPendulumRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "钟摆摇晃(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.rotation = ef.f_scope * Math.sin( ef.f_pos );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_DCCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 开始摇晃
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束摇晃
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 锚点摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_playSustainingAnchorRotate_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_DCCE;
	ef.playing_type = "锚点摇晃(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 锚点摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_endSustainingAnchorRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "锚点摇晃(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 锚点摇晃(渐变)
//==============================
Drill_DCCE_Sprite.prototype.drill_DCCE_updateSustainingAnchorRotate_Gradual = function() {
	var ef = this._Drill_DCCE;
	if( ef.playing_type != "锚点摇晃(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.rotation = ef.f_scope * Math.sin( ef.f_pos );
	
	// > 开始摇晃
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束摇晃
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_DCCE_stopEffect();
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharContinuedEffect = false;
		alert(
			"【Drill_DialogCharContinuedEffect.js 窗口字符 - 字符块持续动作效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowCharacter 窗口字符-窗口字符核心"
		);
}


