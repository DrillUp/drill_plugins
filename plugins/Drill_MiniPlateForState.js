//=============================================================================
// Drill_MiniPlateForState.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        鼠标 - 状态和buff说明窗口
 * @author Drill_up
 * 
 * @Drill_LE_param "状态-%d"
 * @Drill_LE_parentKey "---状态组%d至%d---"
 * @Drill_LE_var "DrillUp.g_MPFS_list_length"
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_MiniPlateForState +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得鼠标靠近状态图标时，显示状态的说明窗口。
 * ★★必须放在所有"作用于"的插件后面，否则没有扩展效果★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用，基于插件才能运行。该插件也可以对其它插件扩展。
 * 基于：
 *   - Drill_CoreOfInput             系统 - 输入设备核心
 *   - Drill_CoreOfWindowAuxiliary   系统 - 窗口辅助核心
 * 作用于：
 *   - MOG_BattleHud                 战斗UI - 角色窗口 
 *     使得角色窗口的状态能显示，状态说明。
 *   - Drill_GaugeForBoss            UI - 高级BOSS生命固定框 ★★v1.7及以上★★
 *     使得敌人生命框的状态能显示，状态说明。
 *   - YEP_BuffsStatesCore           YEP状态核心
 *     yep插件使得sv模式下玩家头上能显示状态图标，这里能兼容yep的图标。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗图、战斗UI。
 *   单独对鼠标有效，支持触屏按住。
 * 2.具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 * 细节：
 *   (1.配置的状态与数据库中状态的id一一对应，如果你修改了数据库的状态，
 *      需要记得进入该插件修改状态说明。
 *   (2.状态和buff是两种不同的分类，buff是固定的可叠加的能力值强化弱化。
 *      rmmv默认最高强化弱化2次，如果你修改了最大次数，可以继续添加3级以上说明。
 *   (3.sv模式中，角色在战斗中的状态不是图标，而是固定的几个gif状态。
 * 内容：
 *   (1.状态可以有两种说明方式，模糊说明，以及详细说明。
 *      你可以设置最初不了解状态时使用模糊说明，达到一定剧情后，用详细说明。
 *   (2.如果说明中没有任何字符，将不显示这个状态的说明内容。
 *      并视作为没有该状态。
 * 文本：
 *   (1.你可以附加一定的宽度高度来适应被遮住的文字，但是不要加太多。
 *   (2.配置后，你会发现"\"字符变得超级多，这是rmmv多次转义的结果，属正常现象。
 *   (3.该插件支持高级渐变颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/system
 * 先确保项目img文件夹下是否有system文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-自定义窗口皮肤
 * 资源-自定义背景图片
 *
 * 系统窗口与rmmv默认的window.png图片一样，可设置为不同的皮肤。
 * 图片布局不能根据窗口内容自适应，你需要合理控制的设置的说明文字。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制状态信息：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>状态说明窗口 : 1 : 使用模糊说明
 * 插件指令：>状态说明窗口 : 2 : 使用详细说明
 * 插件指令：>状态说明窗口 : 1 : 修改模糊说明 : 这是一条模糊说明内容
 * 插件指令：>状态说明窗口 : 2 : 修改详细说明 : 这是一条详细说明内容
 *
 * 1.编号对应配置的编号，也对应状态的id编号。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口属性
 * 你可以修改设置说明窗口的部分属性：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>状态说明窗口 : 修改附加宽高 : 宽度[100]
 * 插件指令：>状态说明窗口 : 修改附加宽高 : 高度[100]
 * 
 * 1.由于该窗口在场景中只有一个，因此相关属性修改后是永久有效的。
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
 * 时间复杂度： o(n^2) + o(图像处理) 每帧
 * 测试方法：   以正常流程进行游戏，记录鼠标靠近区域显示窗口的消耗。
 * 测试结果：   战斗界面，平均消耗为：【41.76ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了鼠标 滚轮、右键、触屏 按下的条件设置。
 * 添加了玩家在sv模式下显示窗口的功能。以及部分兼容yep图标插件。
 * [v1.2]
 * 添加了附加宽度附加高度设置。
 * [v1.3]
 * 优化了窗口层级的位置。
 * [v1.4]
 * 分离了核心，优化了插件性能。
 * [v1.5]
 * 添加了锁定位置功能。
 * [v1.6]
 * 修改了与boss框的兼容性。
 * [v1.7]
 * 添加了最大值编辑的支持。
 * [v1.8]
 * 修复了鼠标接近 事件头顶图标 时，不显示窗口的bug。
 * [v1.9]
 * 添加了战斗层级的设置。
 * [v2.0]
 * 优化了内部整体结构。添加了窗口中心锚点的设置。
 * 
 * 
 * @param ---窗口---
 * @default 
 *
 * @param 激活方式
 * @parent ---窗口---
 * @type select
 * @option 鼠标接近
 * @value 鼠标接近
 * @option 鼠标左键按下[持续]
 * @value 鼠标左键按下[持续]
 * @option 鼠标滚轮按下[持续]
 * @value 鼠标滚轮按下[持续]
 * @option 鼠标右键按下[持续]
 * @value 鼠标右键按下[持续]
 * @option 触屏按下[持续]
 * @value 触屏按下[持续]
 * @desc 鼠标接近指定的状态图标时，面板会被激活。你也可以设置按键持续按下才显示。
 * @default 鼠标接近
 *
 * @param 偏移-窗口 X
 * @parent ---窗口---
 * @desc 以鼠标/触屏的点位置为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 偏移-窗口 Y
 * @parent ---窗口---
 * @desc 以鼠标/触屏的点位置为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 * 
 * @param 无状态时是否显示窗口
 * @parent ---窗口---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 * 
 * @param 无状态时的说明
 * @parent 无状态时是否显示窗口
 * @type note
 * @desc 没有状态时，靠近区域的说明文字。
 * @default "当前没有任何的状态。"
 *
 * @param 布局模式
 * @parent ---窗口---
 * @type select
 * @option 默认窗口皮肤
 * @value 默认窗口皮肤
 * @option 自定义窗口皮肤
 * @value 自定义窗口皮肤
 * @option 自定义背景图片
 * @value 自定义背景图片
 * @option 黑底背景
 * @value 黑底背景
 * @desc 窗口背景布局的模式。
 * @default 黑底背景
 *
 * @param 布局透明度
 * @parent 布局模式
 * @type number
 * @min 0
 * @max 255
 * @desc 布局的透明度，0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 资源-自定义窗口皮肤
 * @parent 布局模式
 * @desc 配置该资源，可以使得该窗口有与默认不同的系统窗口。
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 资源-自定义背景图片
 * @parent 布局模式
 * @desc 背景图片布局的资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 平移-自定义背景图片 X
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-自定义背景图片 Y
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 窗口中心锚点
 * @parent ---窗口---
 * @type select
 * @option 左上角
 * @value 左上角
 * @option 右上角
 * @value 右上角
 * @option 正中心
 * @value 正中心
 * @option 左下角
 * @value 左下角
 * @option 右下角
 * @value 右下角
 * @desc 窗口追随鼠标时，中心锚点的位置。
 * @default 左上角
 *
 * @param 是否锁定窗口位置
 * @parent ---窗口---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，将面板锁定在一个固定的地方，而不是跟随鼠标位置走。
 * @default false
 *
 * @param 平移-锁定位置 X
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。x轴方向平移，单位像素，0为贴在最左边。
 * @default 0
 *
 * @param 平移-锁定位置 Y
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。y轴方向平移，单位像素，0为贴在最上面。
 * @default 0
 *
 * @param 窗口行间距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容之间的行间距。（rmmv默认标准：36）
 * @default 10
 *
 * @param 窗口内边距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（rmmv默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（rmmv默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 *
 * @param 窗口附加高度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
 *
 * @param 战斗层级
 * @parent ---窗口---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 窗口所在的战斗层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在同一个地图层，先后排序的位置，0表示最后面。
 * @default 90
 *
 *
 * @param ---buff组---
 * @default 
 *
 * @param 强化-生命
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[32]：暂时性生命\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[40]：暂时性生命\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 强化-魔法
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[33]：暂时性魔法\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[41]：暂时性魔法\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 强化-攻击力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[34]：暂时性物理攻击\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[42]：暂时性物理攻击\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 强化-防御力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[35]：暂时性物理防御\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[43]：暂时性物理防御\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 强化-魔法攻击
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[36]：暂时性魔法攻击\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[44]：暂时性魔法攻击\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 强化-魔法防御
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[37]：暂时性魔法防御\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[45]：暂时性魔法防御\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 强化-敏捷
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[38]：暂时性敏捷\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[46]：暂时性敏捷\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 强化-幸运
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"\\\\i[39]：暂时性幸运\\\\c[17] +25%\\\\c[0]。\"","\"\\\\i[47]：暂时性幸运\\\\c[17] +50%\\\\c[0]。\""]
 *
 * @param 弱化-生命
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[48]：暂时性生命\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[56]：暂时性生命\\\\c[18] -50%\\\\c[0]。\""]
 *
 * @param 弱化-魔法
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[49]：暂时性魔法\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[57]：暂时性魔法\\\\c[18] -50%\\\\c[0]。\""]
 *
 * @param 弱化-攻击力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[50]：暂时性物理攻击\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[58]：暂时性物理攻击\\\\c[18] -50%\\\\c[0]。\""]
 *
 * @param 弱化-防御力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[51]：暂时性物理防御\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[59]：暂时性物理防御\\\\c[18] -50%\\\\c[0]。\""]
 *
 * @param 弱化-魔法攻击
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[52]：暂时性魔法攻击\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[60]：暂时性魔法攻击\\\\c[18] -50%\\\\c[0]。\""]
 *
 * @param 弱化-魔法防御
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[53]：暂时性魔法防御\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[61]：暂时性魔法防御\\\\c[18] -50%\\\\c[0]。\""]
 *
 * @param 弱化-敏捷
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[54]：暂时性敏捷\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[62]：暂时性敏捷\\\\c[18] -50%\\\\c[0]。\""]
 *
 * @param 弱化-幸运
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"\\\\i[55]：暂时性幸运\\\\c[18] -25%\\\\c[0]。\"","\"\\\\i[63]：暂时性幸运\\\\c[18] -50%\\\\c[0]。\""]
 *
 *
 * @param ---状态组 1至20---
 * @default 
 *
 * @param 状态-1
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default {"标签":"--战斗不能--","是否初始使用详细说明":"true","模糊说明":"\"\\\\i[1]：该单位已在战斗中阵亡。\"","详细说明":"\"\\\\i[1]：该单位已在战斗中阵亡。\""}
 *
 * @param 状态-2
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default {"标签":"--防御--","是否初始使用详细说明":"true","模糊说明":"\"\\\\i[81]：该单位进入防御状态。\"","详细说明":"\"\\\\i[81]：防御\\\\c[204]x120%\\\\c[0]。受到的任何伤害减半。\""}
 *
 * @param 状态-3
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default {"标签":"--不死身--","是否初始使用详细说明":"true","模糊说明":"\"\"","详细说明":"\"\""}
 *
 * @param 状态-4
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-5
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-6
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-7
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-8
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-9
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-10
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-11
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-12
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-13
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-14
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-15
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-16
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-17
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-18
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-19
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-20
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 *
 * @param ---状态组21至40---
 * @default 
 *
 * @param 状态-21
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-22
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-23
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-24
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-25
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-26
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-27
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-28
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-29
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-30
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-31
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-32
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-33
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-34
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-35
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-36
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-37
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-38
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-39
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-40
 * @parent ---状态组21至40---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param ---状态组41至60---
 * @default 
 *
 * @param 状态-41
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-42
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-43
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-44
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-45
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-46
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-47
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-48
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-49
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-50
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-51
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-52
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-53
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-54
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-55
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-56
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-57
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-58
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-59
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-60
 * @parent ---状态组41至60---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param ---状态组61至80---
 * @default 
 *
 * @param 状态-61
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-62
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-63
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-64
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-65
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-66
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-67
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-68
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-69
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-70
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-71
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-72
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-73
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-74
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-75
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-76
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-77
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-78
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-79
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 *
 * @param 状态-80
 * @parent ---状态组61至80---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default 
 * 
 */
/*~struct~MiniPlateForState:
 *  
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --状态名--
 *
 * @param 是否初始使用详细说明
 * @type boolean
 * @on 使用详细说明
 * @off 使用模糊说明
 * @desc true - 使用详细说明，false - 使用模糊说明
 * @default true
 * 
 * @param 模糊说明
 * @type note
 * @desc 该状态的模糊说明内容。空字段表示不显示该状态的说明。
 * @default "未知的状态"
 * 
 * @param 详细说明
 * @type note
 * @desc 该状态的详细说明内容。空字段表示不显示该状态的说明。
 * @default "没有描述"
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		MPFS (Mini_Plate_For_State)
//		临时全局变量	DrillUp.g_MPFS_xxx
//		临时局部变量	this._drill_MPFS_xxx
//		存储数据变量	$gameSystem._drill_MPFS_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2) + o(图像处理) 每帧
//		性能测试因素	鼠标乱晃
//		性能测试消耗	41.76ms
//		最坏情况		战斗界面出现大量敌人、角色、boss浮动框。
//						（该插件目前没有对最坏情况进行实测。）
//
//插件记录：
//		★大体框架与功能如下：
//			事件说明窗口：
//				->说明面板
//					->类定义
//					->内容
//						> 内容根据id列表自动组合
//						> 详细说明
//						> 模糊说明
//						> 强化buff
//						> 弱化buff
//						> 没有内容时
//					->判定项
//						> 鼠标移走则重刷
//				->鼠标事件
//		
//		
//		★必要注意事项：
//			1.鼠标悬浮窗口目前已经固定了一套框架，你可以找到其他的 MiniPlateXXX 插件，看看私有类的定义。
//			  通过 drill_pushChecks 判定项 帧刷新，来控制面板显示的内容。
//
//		★其它说明细节：
//			1.	2019/6/13
//			  	我也不知道这个插件的原理到底算不算复杂了。
//			  	写的时候行云流水，回头一看发现已经写了700多行……
//				窗口与布局 + 内容转义 + 字体大小 + 图标与颜色 + 鼠标位置获取 + battlehud父层级获取
//				详细窗口绑定在战斗界面的最顶层：_drill_SenceTopArea，并且只有这一个窗口。
//			2.窗口显示隐藏部分比较绕。
//			  只要出现状态图标，它们就都可以鼠标靠近显示。
//			  为此这里我建立了一个接口pushChecks，输入x,y,w,h,s,b等参数，s为状态id的列表。
//			  通过这个接口，来实时刷新鼠标位置监听、窗口信息。
//			3.	2021/7/13
//				框架稍微统一整理了一下，确定了 MiniPlateXXX 插件的结构。
//
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MiniPlateForState = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MiniPlateForState');
	
	/*----------------窗口---------------*/
	DrillUp.g_MPFS_mouse_type = String(DrillUp.parameters["激活方式"] || "鼠标接近");
	DrillUp.g_MPFS_x = Number(DrillUp.parameters["偏移-窗口 X"] || 0 );
	DrillUp.g_MPFS_y = Number(DrillUp.parameters["偏移-窗口 Y"] || 0 );
	DrillUp.g_MPFS_default_enable = String(DrillUp.parameters["无状态时是否显示窗口"] || "true") === "true";	
	DrillUp.g_MPFS_default_text = String(DrillUp.parameters["无状态时的说明"]);
	DrillUp.g_MPFS_layout_type = String(DrillUp.parameters["布局模式"] || "黑底背景");
	DrillUp.g_MPFS_layout_opacity = Number(DrillUp.parameters["布局透明度"] || 255);
	DrillUp.g_MPFS_layout_sys_src = String(DrillUp.parameters["资源-自定义窗口皮肤"] || "");
	DrillUp.g_MPFS_layout_pic_src = String(DrillUp.parameters["资源-自定义背景图片"] || "");
	DrillUp.g_MPFS_layout_pic_x = Number(DrillUp.parameters["平移-自定义背景图片 X"] || 0 );
	DrillUp.g_MPFS_layout_pic_y = Number(DrillUp.parameters["平移-自定义背景图片 Y"] || 0 );
	DrillUp.g_MPFS_anchor = String(DrillUp.parameters["窗口中心锚点"] || "左上角" );
	DrillUp.g_MPFS_lock_enable = String(DrillUp.parameters["是否锁定窗口位置"] || "false") === "true";
	DrillUp.g_MPFS_lock_x = Number(DrillUp.parameters["平移-锁定位置 X"] || 0);
	DrillUp.g_MPFS_lock_y = Number(DrillUp.parameters["平移-锁定位置 Y"] || 0);
	DrillUp.g_MPFS_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_MPFS_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_MPFS_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_MPFS_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_MPFS_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	DrillUp.g_MPFS_layer = String(DrillUp.parameters["战斗层级"] || "图片层");
	DrillUp.g_MPFS_zIndex = Number(DrillUp.parameters["图片层级"] || 0);
	
	/*----------------buff---------------*/
	DrillUp.g_MPFS_buff = [];
	DrillUp.g_MPFS_buff[0] = [];
	DrillUp.g_MPFS_buff[1] = [];
	DrillUp.g_MPFS_buff[2] = [];
	DrillUp.g_MPFS_buff[3] = [];
	DrillUp.g_MPFS_buff[4] = [];
	DrillUp.g_MPFS_buff[5] = [];
	DrillUp.g_MPFS_buff[6] = [];
	DrillUp.g_MPFS_buff[7] = [];
	DrillUp.g_MPFS_debuff = [];
	DrillUp.g_MPFS_debuff[0] = [];
	DrillUp.g_MPFS_debuff[1] = [];
	DrillUp.g_MPFS_debuff[2] = [];
	DrillUp.g_MPFS_debuff[3] = [];
	DrillUp.g_MPFS_debuff[4] = [];
	DrillUp.g_MPFS_debuff[5] = [];
	DrillUp.g_MPFS_debuff[6] = [];
	DrillUp.g_MPFS_debuff[7] = [];
	if( DrillUp.parameters["强化-生命"] != "" ){ DrillUp.g_MPFS_buff[0] = JSON.parse(DrillUp.parameters["强化-生命"] ); }
	if( DrillUp.parameters["强化-魔法"] != "" ){ DrillUp.g_MPFS_buff[1] = JSON.parse(DrillUp.parameters["强化-魔法"] ); }
	if( DrillUp.parameters["强化-攻击力"] != "" ){ DrillUp.g_MPFS_buff[2] = JSON.parse(DrillUp.parameters["强化-攻击力"] ); }
	if( DrillUp.parameters["强化-防御力"] != "" ){ DrillUp.g_MPFS_buff[3] = JSON.parse(DrillUp.parameters["强化-防御力"] ); }
	if( DrillUp.parameters["强化-魔法攻击"] != "" ){ DrillUp.g_MPFS_buff[4] = JSON.parse(DrillUp.parameters["强化-魔法攻击"] ); }
	if( DrillUp.parameters["强化-魔法防御"] != "" ){ DrillUp.g_MPFS_buff[5] = JSON.parse(DrillUp.parameters["强化-魔法防御"] ); }
	if( DrillUp.parameters["强化-敏捷"] != "" ){ DrillUp.g_MPFS_buff[6] = JSON.parse(DrillUp.parameters["强化-敏捷"] ); }
	if( DrillUp.parameters["强化-幸运"] != "" ){ DrillUp.g_MPFS_buff[7] = JSON.parse(DrillUp.parameters["强化-幸运"] ); }
	if( DrillUp.parameters["弱化-生命"] != "" ){ DrillUp.g_MPFS_debuff[0] = JSON.parse(DrillUp.parameters["弱化-生命"] ); }
	if( DrillUp.parameters["弱化-魔法"] != "" ){ DrillUp.g_MPFS_debuff[1] = JSON.parse(DrillUp.parameters["弱化-魔法"] ); }
	if( DrillUp.parameters["弱化-攻击力"] != "" ){ DrillUp.g_MPFS_debuff[2] = JSON.parse(DrillUp.parameters["弱化-攻击力"] ); }
	if( DrillUp.parameters["弱化-防御力"] != "" ){ DrillUp.g_MPFS_debuff[3] = JSON.parse(DrillUp.parameters["弱化-防御力"] ); }
	if( DrillUp.parameters["弱化-魔法攻击"] != "" ){ DrillUp.g_MPFS_debuff[4] = JSON.parse(DrillUp.parameters["弱化-魔法攻击"] ); }
	if( DrillUp.parameters["弱化-魔法防御"] != "" ){ DrillUp.g_MPFS_debuff[5] = JSON.parse(DrillUp.parameters["弱化-魔法防御"] ); }
	if( DrillUp.parameters["弱化-敏捷"] != "" ){ DrillUp.g_MPFS_debuff[6] = JSON.parse(DrillUp.parameters["弱化-敏捷"] ); }
	if( DrillUp.parameters["弱化-幸运"] != "" ){ DrillUp.g_MPFS_debuff[7] = JSON.parse(DrillUp.parameters["弱化-幸运"] ); }
	for(var i = 0; i < DrillUp.g_MPFS_buff.length; i++ ){		//（buff内容处理）
		var texts = DrillUp.g_MPFS_buff[i];
		for(var j = 0; j < texts.length; j++ ){
			//var temp = String(texts[j]);
			//temp = temp.substring(1,temp.length-1);
			//temp = temp.replace(/\\\\/g,"\\");
			//temp = temp.split(/\\n/);
			//texts[j] = String(temp);
			texts[j] = JSON.parse( String(texts[j]) || "" );
		}
	}
	for(var i = 0; i < DrillUp.g_MPFS_debuff.length; i++ ){	//（debuff内容处理）
		var texts = DrillUp.g_MPFS_debuff[i];
		for(var j = 0; j < texts.length; j++ ){
			//var temp = String(texts[j]);
			//temp = temp.substring(1,temp.length-1);
			//temp = temp.replace(/\\\\/g,"\\");
			//temp = temp.split(/\\n/);
			//texts[j] = String(temp);
			texts[j] = JSON.parse( String(texts[j]) || "" );
		}
	}
	
	//==============================
	// * 变量获取 - 状态描述
	//				（~struct~MiniPlateForState）
	//==============================
	DrillUp.drill_MPFS_initState = function( dataFrom ) {
		var data = {};
		data['enabled'] = String( dataFrom["是否初始使用详细说明"] || "true") == "true";
		
		if( dataFrom["模糊说明"] != undefined && 
			dataFrom["模糊说明"] != "" ){
			data['m_context'] = JSON.parse( dataFrom["模糊说明"] );
		}else{
			data['m_context'] = "";
		}
		
		if( dataFrom["详细说明"] != undefined && 
			dataFrom["详细说明"] != "" ){
			data['x_context'] = JSON.parse( dataFrom["详细说明"] );
		}else{
			data['x_context'] = "";
		}
		
		return data;
	}
	
	/*----------------状态---------------*/
	DrillUp.g_MPFS_list_length = 80;
	DrillUp.g_MPFS_list = [];
	for( var i = 0; i < DrillUp.g_MPFS_list_length ; i++ ){
		if( DrillUp.parameters["状态-" + String(i+1) ] != undefined &&
			DrillUp.parameters["状态-" + String(i+1) ] != "" ){
			var temp = JSON.parse( DrillUp.parameters["状态-" + String(i+1)] );
			DrillUp.g_MPFS_list[i] = DrillUp.drill_MPFS_initState( temp );
		}else{
			DrillUp.g_MPFS_list[i] = DrillUp.drill_MPFS_initState( {} );
		}
	};
	DrillUp.g_MPFS_plugin_cur_check = 0;	//（容错检查）
	DrillUp.g_MPFS_plugin_check = 60;
	


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowAuxiliary ){


//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MPFS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFS_pluginCommand.call(this, command, args);
	if (command === ">状态说明窗口") { // >状态说明窗口 : A : 使用模糊说明
		if(args.length == 4){
			var temp1 = Number(args[1]) -1;
			var type = String(args[3]);
			if( type == "使用模糊说明" ){ $gameSystem._drill_MPFS_enables[temp1] = false; }
			if( type == "使用详细说明" ){ $gameSystem._drill_MPFS_enables[temp1] = true; }
		}
		if(args.length == 6){
			var temp1 = Number(args[1]) -1;
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "修改模糊说明" ){ $gameSystem._drill_MPFS_m_context[temp1] = temp2; }
			if( type == "修改详细说明" ){ $gameSystem._drill_MPFS_x_context[temp1] = temp2; }
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改附加宽高" ){ 
				
				if( temp1.indexOf("宽度[") != -1 ){
					temp1 = temp1.replace("宽度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFS_ex_width = Number(temp1);
				}
				if( temp1.indexOf("高度[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFS_ex_height = Number(temp1);
				}
				
			}
		}
	}
};
//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_MPFS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPFS_sys_initialize.call(this);
	
	this._drill_MPFS_enables = [];			//（详细说明开关）
	for(var i = 0; i< DrillUp.g_MPFS_list.length ;i++){
		this._drill_MPFS_enables[i] = DrillUp.g_MPFS_list[i]['enabled'];
	}
	this._drill_MPFS_m_context = [];		//（模糊说明文本）
	for(var i = 0; i< DrillUp.g_MPFS_list.length ;i++){
		this._drill_MPFS_m_context[i] = DrillUp.g_MPFS_list[i]['m_context'];
	}
	this._drill_MPFS_x_context = [];		//（详细说明文本）
	for(var i = 0; i< DrillUp.g_MPFS_list.length ;i++){
		this._drill_MPFS_x_context[i] = DrillUp.g_MPFS_list[i]['x_context'];
	}
	
	this._drill_MPFS_ex_width = DrillUp.g_MPFS_ex_width;		//（附加高宽）
	this._drill_MPFS_ex_height = DrillUp.g_MPFS_ex_height; 
};	


//=============================================================================
// ** 状态图标绑定
//=============================================================================
//==============================
// * 工具 - 父类溯源
//
//			说明：	输入对象、父类定义，返回父类对象。没有则返回空。
//==============================
DrillUp.drill_MPFS_getAncestor = function( sprite, ancestor_class ){
	for( var i=0; i < 8; i++){
		if( sprite.parent == undefined ){
			break;
		}
		var sprite = sprite.parent;
		if( sprite instanceof ancestor_class ){
			return sprite;
		}
	}
	return null;
}

//==============================
// * 绑定 - mog角色窗口
//==============================
if( Imported.MOG_BattleHud ){
	var _drill_MPFS_BHud_update = Battle_Hud.prototype.update;
	Battle_Hud.prototype.update = function() {
		_drill_MPFS_BHud_update.call(this);
		if( this._state_icon == undefined ){ return; }
		
		// > 上一层级 ._hudField >> Scene_Battle
		var p = DrillUp.drill_MPFS_getAncestor( this, Scene_Battle );
		if( p != null ){
			
			var _drill_plate = p._drill_MPFS_window;
			var icon_n = 1;
			if (this._stateType === 0) {
				icon_n = 1;
			} else { 
				icon_n = Math.max(this._battler._states.length,1);
			};
			var check = {
				's': this._battler._states,
				'b': this._battler._buffs
			}
			if(Moghunter.bhud_statesAlign == 1){	//mog状态右对齐
				check['x'] = this._state_icon.x - Window_Base._iconWidth * (icon_n -1);
				check['y'] = this._state_icon.y;
				check['w'] = Window_Base._iconWidth * icon_n;
				check['h'] = Window_Base._iconHeight;
			}else if(Moghunter.bhud_statesAlign == 2){	//mog状态下对齐
				check['x'] = this._state_icon.x;
				check['y'] = this._state_icon.y;
				check['w'] = Window_Base._iconWidth;
				check['h'] = Window_Base._iconHeight * icon_n;
			}else if(Moghunter.bhud_statesAlign == 3){	//mog状态上对齐
				check['x'] = this._state_icon.x;
				check['y'] = this._state_icon.y - Window_Base._iconWidth * (icon_n -1);
				check['w'] = Window_Base._iconWidth;
				check['h'] = Window_Base._iconHeight * icon_n;
			}else{	//mog状态左对齐
				check['x'] = this._state_icon.x;
				check['y'] = this._state_icon.y;
				check['w'] = Window_Base._iconWidth * icon_n;
				check['h'] = Window_Base._iconHeight;
			}
			//if( check.s.length >= 1){
			//	alert(JSON.stringify(check));
			//}
			_drill_plate.pushChecks(check);
		}else{
			//插件检查
			DrillUp.g_MPFS_plugin_cur_check += 1;
			if( DrillUp.g_MPFS_plugin_cur_check > DrillUp.g_MPFS_plugin_check ){
				DrillUp.g_MPFS_plugin_check = 30000000000;
				alert("战斗 - 状态说明窗口[扩展]：\n没有找到角色窗口的层级位置，确保你的mog战斗UI-角色窗口为(v4.0)以上。");
			}
		}
	}
}
//==============================
// * 绑定 - 敌人图像
//==============================
var _drill_MPFS_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateStateSprite = function() {
	_drill_MPFS_Enemy_updateStateSprite.call(this);
	
	// > 上一层级 ._battleField >> ._baseSprite >> Spriteset_Battle >> Scene_Battle
	var p = DrillUp.drill_MPFS_getAncestor( this, Scene_Battle );
	if( p == null ){ return; }
			
	var _drill_plate = p._drill_MPFS_window;
	var check = {
		'w': Sprite_StateIcon._iconWidth,
		'h': Sprite_StateIcon._iconHeight,
		's': this._stateIconSprite._battler._states,
		'b': this._battler._buffs
	}
	check['x'] = this.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth;
	check['y'] = this.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight + this._stateIconSprite.y;
	if( Imported.Drill_BattleCamera ){	//镜头修正
		check['x'] += $gameTemp._drill_cam_pos[0];
		check['y'] += $gameTemp._drill_cam_pos[1];
	}
	//if( check.s.length >= 1){
	//	alert(JSON.stringify(check));
	//}
	
	_drill_plate.pushChecks(check);
};
//==============================
// * 绑定 - 角色图像
//==============================
var _drill_MPFS_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
	_drill_MPFS_Actor_update.call(this);
	
    if( this._actor == undefined ){ return; }
	
	var p = DrillUp.drill_MPFS_getAncestor( this, Scene_Battle );
	if( p == null ){ return; }
	
	var _drill_plate = p._drill_MPFS_window;
	
	if( this._stateIconSprite ){	//如果有Sprite_StateIcon（yep弄的）则按照那个来
		var check = {
			'w': Sprite_StateIcon._iconWidth,
			'h': Sprite_StateIcon._iconHeight,
			's': this._stateIconSprite._battler._states,
			'b': this._battler._buffs
		}
		check['x'] = this.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth;
		check['y'] = this.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight + this._stateIconSprite.y;
		if( Imported.Drill_BattleCamera ){	//镜头修正
			check['x'] += $gameTemp._drill_cam_pos[0];
			check['y'] += $gameTemp._drill_cam_pos[1];
		}
		_drill_plate.pushChecks(check);
	}else{
		var check = {
			'w': 48,		//来自Sprite_StateOverlay，固定48像素
			'h': 48,
			's': this._battler._states,
			'b': this._battler._buffs
		}
		check['x'] = this.x - this._stateSprite.anchor.x * 48;
		check['y'] = this.y - this._stateSprite.anchor.y * 48 - 24;
		if( Imported.Drill_BattleCamera ){	//镜头修正
			check['x'] += $gameTemp._drill_cam_pos[0];
			check['y'] += $gameTemp._drill_cam_pos[1];
		}
		_drill_plate.pushChecks(check);
	}
};
//==============================
// * 绑定 - drill高级boss框
//==============================
if( Imported.Drill_GaugeForBoss ){
	var _drill_MPFS_GFB_update = Drill_GFB_StyleSprite.prototype.drill_updateStates ;
	Drill_GFB_StyleSprite.prototype.drill_updateStates = function() {
		_drill_MPFS_GFB_update.call(this);
		var data_b = this._drill_data_bind;
		var data_s = this._drill_data_style;
		
		// > 上一层级 ._drill_battleUpArea >> ._battleField >> ._baseSprite  >> Spriteset_Battle >> Scene_Battle
		var p = DrillUp.drill_MPFS_getAncestor( this, Scene_Battle );
		if( p == null ){ return; }
		
		if( data_s['state_enable'] == true ){
			var _drill_plate = p._drill_MPFS_window;
		
			var icons = this._drill_enemy.allIcons();
			var icon_n = Math.max(icons.length,1);
			var space = data_s['state_spacing'];
			var align = data_s['state_align'];
			var iw = Window_Base._iconWidth;
			var ih = Window_Base._iconHeight;
			var check = {
				's': this._drill_enemy._states,
				'b': this._drill_enemy._buffs
			}
			if( data_s['state_mode'] == "直线并排" ){
			
				if( align == "右对齐" ){
					check['x'] = this.x + this._drill_state_sprite.x - iw * (icon_n -1);
					check['y'] = this.y + this._drill_state_sprite.y;
					check['w'] = iw * icon_n;
					check['h'] = ih;
				}else if( align == "上对齐" ){
					check['x'] = this.x + this._drill_state_sprite.x;
					check['y'] = this.y + this._drill_state_sprite.y - iw * (icon_n -1);
					check['w'] = iw;
					check['h'] = ih * icon_n;
				}else if( align == "下对齐" ){
					check['x'] = this.x + this._drill_state_sprite.x;
					check['y'] = this.y + this._drill_state_sprite.y;
					check['w'] = iw;
					check['h'] = ih * icon_n;
				}else{
					check['x'] = this.x + this._drill_state_sprite.x;
					check['y'] = this.y + this._drill_state_sprite.y;
					check['w'] = iw * icon_n;
					check['h'] = ih;
				}
			}else{
				check['x'] = this.x + this._drill_state_sprite.x;
				check['y'] = this.y + this._drill_state_sprite.y;
				check['w'] = iw;
				check['h'] = ih;
			}
			check['x'] -= iw/2;
			check['y'] -= ih/2;
			if( Imported.Drill_BattleCamera ){	//镜头修正
				check['x'] += $gameTemp._drill_cam_pos[0];
				check['y'] += $gameTemp._drill_cam_pos[1];
			}
			//if( check.s.length >= 1){
			//	alert(JSON.stringify(check));
			//}
			_drill_plate.pushChecks(check);
		}
	}
}



//=============================================================================
// ** 战斗层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_MPFS_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_MPFS_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// ** 图片层
//==============================
var _drill_MPFS_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_MPFS_battle_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_MPFS_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFS_battle_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Battle.prototype.drill_MPFS_sortByZIndex = function() {
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 创建面板
//==============================
var _drill_MPFS_battleScene_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFS_battleScene_createAllWindows.call(this);
	
	if(!this._drill_MPFS_window ){		//（只建立一个窗口）
		this._drill_MPFS_window = new Drill_MPFS_Window();
		
		this._drill_MPFS_window.zIndex = DrillUp.g_MPFS_zIndex;
		if( DrillUp.g_MPFS_layer == '上层' ){
			this._spriteset._drill_battleUpArea.addChild( this._drill_MPFS_window );
		}
		if( DrillUp.g_MPFS_layer == '图片层' ){
			this._spriteset._drill_battlePicArea.addChild( this._drill_MPFS_window );
		}
		if( DrillUp.g_MPFS_layer == '最顶层' ){
			this._drill_SenceTopArea.addChild( this._drill_MPFS_window );
		}
		this.drill_MPFS_sortByZIndex();
	}
};

	
//=============================================================================
// ** 说明面板【Drill_MPFS_Window】
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Battle下的 _drill_MPFS_window 成员
//			应用：	暂无 
//			
//			作用域：	战斗界面
//			主功能：	定义一个面板，能随时改变内容和高宽，用于描述状态信息。
//			子功能：
//						->贴图内容
//							->文本层
//							->背景
//								> 默认窗口皮肤
//								> 自定义窗口皮肤
//								> 自定义背景图片
//								> 黑底背景
//						->位置
//							> 锁定位置
//							> 跟随鼠标位置
//						->显现时机
//							->激活
//							->显示条件
//							->刷新内容
//				
//			说明：	> 整个场景只有一个该窗口。
//					> 其它相似的可变窗口插件： Drill_MiniPlateForEvent、Drill_X_SceneShopDiscount。
//=============================================================================
//==============================
// * 说明面板 - 定义
//==============================
function Drill_MPFS_Window() {
    this.initialize.apply(this, arguments);
};
Drill_MPFS_Window.prototype = Object.create(Window_Base.prototype);
Drill_MPFS_Window.prototype.constructor = Drill_MPFS_Window;
//==============================
// * 说明面板 - 初始化
//==============================
Drill_MPFS_Window.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	this._drill_data = {};
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 说明面板 - 帧刷新
//==============================
Drill_MPFS_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this.drill_updateChecks();			//帧刷新 - 判断激活
	this.drill_updatePosition();		//帧刷新 - 刷新位置
}
//==============================
// * 说明面板 - 私有覆写函数
//==============================
Drill_MPFS_Window.prototype.lineHeight = function(){ return DrillUp.g_MPFS_lineheight; };		//窗口行间距
Drill_MPFS_Window.prototype.standardPadding = function(){ return DrillUp.g_MPFS_padding; };		//窗口内边距
Drill_MPFS_Window.prototype.standardFontSize = function(){ return DrillUp.g_MPFS_fontsize; };	//窗口字体大小
//==============================
// * 初始化 - 数据
//==============================
Drill_MPFS_Window.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 皮肤设置
	data['window_type'] = DrillUp.g_MPFS_layout_type;
	data['window_opacity'] = DrillUp.g_MPFS_layout_opacity;
	data['window_sys_bitmap'] = ImageManager.loadSystem( DrillUp.g_MPFS_layout_sys_src );
	data['window_pic_bitmap'] = ImageManager.loadSystem( DrillUp.g_MPFS_layout_pic_src );
	data['window_pic_x'] = DrillUp.g_MPFS_layout_pic_x;
	data['window_pic_y'] = DrillUp.g_MPFS_layout_pic_y;
	
	// > 私有变量初始化
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_visible = false;
	
	this._drill_check_tank = [];
	this._drill_text_default = DrillUp.g_MPFS_default_text;
	this._drill_text_default = this._drill_text_default.substring(1,this._drill_text_default.length-1);
	
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( DrillUp.g_MPFS_anchor == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( DrillUp.g_MPFS_anchor == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( DrillUp.g_MPFS_anchor == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( DrillUp.g_MPFS_anchor == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
};
//==============================
// * 初始化 - 对象
//==============================
Drill_MPFS_Window.prototype.drill_initSprite = function() {
	this.drill_createBackground();		//创建背景
	this.drill_createText();			//创建文本层
	this.drill_sortBottomByZIndex();	//底层层级排序
};
//==============================
// * 创建 - 背景
//==============================
Drill_MPFS_Window.prototype.drill_createBackground = function() {
	var data = this._drill_data;
	this._drill_background = new Sprite();
	
	// > 图层顺序处理
	this._drill_background.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	
	// > 信息框布局
	if( data['window_type'] == "默认窗口皮肤" || data['window_type'] == "默认窗口布局" ){
		
		// > 透明度
		this.opacity = data['window_opacity'];
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义窗口皮肤" || data['window_type'] == "系统窗口布局" ){
		
		// > 皮肤设置
		this.windowskin = data['window_sys_bitmap'];
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义背景图片" || data['window_type'] == "图片窗口布局" ){
		
		// > bimap建立
		this._drill_background.bitmap = data['window_pic_bitmap'];
		this._drill_background.x = data['window_pic_x'];
		this._drill_background.y = data['window_pic_y'];
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		
		
	}else if( data['window_type'] == "黑底背景" || data['window_type'] == "黑底布局" ){
		
		// > bimap建立
		//（需延迟设置，见后面）
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
	}
	
	this._windowSpriteContainer.addChild(this._drill_background);	//（ _windowSpriteContainer 为窗口的最底层贴图）
}
//==============================
// * 创建 - 文本层
//==============================
Drill_MPFS_Window.prototype.drill_createText = function() {
	this.createContents();
    this.contents.clear();
	
	// 绘制内容
	this.drawTextEx( this._drill_text_default, 0, 0 );
}
//==============================
// ** 底层层级排序
//==============================
Drill_MPFS_Window.prototype.drill_sortBottomByZIndex = function() {
   this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//==============================
// * 帧刷新 - 刷新位置
//==============================
Drill_MPFS_Window.prototype.drill_updatePosition = function() {
	
	// > 锁定位置
	if( DrillUp.g_MPFS_lock_enable == true ){				
		this.x = DrillUp.g_MPFS_lock_x;
		this.y = DrillUp.g_MPFS_lock_y;
		return;
	}
	
	// > 跟随鼠标位置
	var cal_x = _drill_mouse_x + DrillUp.g_MPFS_x;
	var cal_y = _drill_mouse_y + DrillUp.g_MPFS_y;
	cal_x -= this._drill_width * this._drill_anchor_x;
	cal_y -= this._drill_height * this._drill_anchor_y;
	if( cal_x < 0 ){	//（横向贴边控制）
		cal_x = 0;
	}
	if( cal_x + this._drill_width > Graphics.boxWidth ){
		cal_x = Graphics.boxWidth - this._drill_width;
	}
	if( cal_y < 0 ){	//（纵向贴边控制）
		cal_y = 0;
	}
	if( cal_y + this._drill_height > Graphics.boxHeight ){
		cal_y = Graphics.boxHeight - this._drill_height;
	}
	this.x = cal_x;
	this.y = cal_y;
}
//==============================
// * 接口 - 添加状态图标 判断项
//
//			参数：	c['x']: 触发范围坐标X
//					c['y']: 触发范围坐标Y
//					c['w']: 触发范围宽
//					c['h']: 触发范围高
//					c['s']: 状态的id列表
//					c['b']: buff的id列表
//==============================
Drill_MPFS_Window.prototype.pushChecks = function( c ){
	if( this._drill_check_tank.length < 1000){	//防止卡顿造成的过度积压
		this._drill_check_tank.push(c);
	}
}
//==============================
// * 帧刷新 - 判断激活
//==============================
Drill_MPFS_Window.prototype.drill_updateChecks = function() {
	if( !this._drill_check_tank ){ this.visible = false; return; }
	
	// > 捕获 判断项
	var is_visible = false;
	var state_ids = [];
	var buff_ids = [];
	for(var i=0; i< this._drill_check_tank.length; i++){
		var check = this._drill_check_tank[i];
		check['mouseType'] = DrillUp.g_MPFS_mouse_type;
		
		if ( this.drill_checkCondition(check) ) { 
			is_visible = true; 
			state_ids = check['s']; 
			buff_ids = check['b']; 
			break; 
		}
	}
	this._drill_check_tank = [];
	
	// > 根据 判断项 显示/隐藏
	if( this._drill_visible == true ){
		if( is_visible == true ){
			// > 显示中，不操作
		}else{
			// > 显示中断时
			this._drill_visible = false;
			this._drill_width = 0;
			this._drill_height = 0;
		}
	}else{
		if( is_visible == true ){
			// > 激活显示时
			this.drill_refreshMessage( state_ids, buff_ids );
			this._drill_visible = true;
		}else{
			// > 隐藏中，不操作
		}
	}
	
	//（宽高不要在update中轻易修改）
	this.visible = this._drill_visible;
}
//==============================
// * 激活 - 显示条件
//==============================
Drill_MPFS_Window.prototype.drill_checkCondition = function( check ){
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( check['mouseType'] == "触屏按下[持续]" ){
		var _x = TouchInput.x;
		var _y = TouchInput.y;
	}
	if( _x > check['x'] + check['w'] ){ return false;}
	if( _x < check['x'] + 0 ){ return false;}
	if( _y > check['y'] + check['h'] ){ return false;}
	if( _y < check['y'] + 0 ){ return false;}
	if( check['mouseType'] == "鼠标左键按下[持续]" ){
		if( TouchInput.drill_isLeftPressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "鼠标滚轮按下[持续]" ){
		if( TouchInput.drill_isMiddlePressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "鼠标右键按下[持续]" ){
		if( TouchInput.drill_isRightPressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "触屏按下[持续]" ){
		if( TouchInput.isPressed() ){ return true; }else{ return false; }
	}
	return true;
}

//==============================
// * 激活 - 刷新内容
//==============================
Drill_MPFS_Window.prototype.drill_refreshMessage = function( state_ids, buff_ids ){
	var data = this._drill_data;
	if(!state_ids && !buff_ids ){ return }
	
	// > 内容获取
	var context_list = [];
	for( var i=0; i< state_ids.length; i++ ){	//状态
		
		var index = state_ids[i]-1;
		var enabled = $gameSystem._drill_MPFS_enables[index];
		if( enabled ){
			var temp = $gameSystem._drill_MPFS_x_context[index];		//详细说明
			if( temp && temp.length != 0 ){
				context_list.push(temp);
			}
		}else{
			var temp = $gameSystem._drill_MPFS_m_context[index];		//模糊说明
			if( temp && temp.length != 0 ){
				context_list.push(temp);
			}
		}
	}
	for (var i=0; i< buff_ids.length; i++) {	//buff
		var level = buff_ids[i];
		
		if( level > 0 ){		//强化buff
			context_list.push( DrillUp.g_MPFS_buff[i][ level-1 ] );
		}
		if( level < 0 ){		//弱化buff
			context_list.push( DrillUp.g_MPFS_debuff[i][ Math.abs(level)-1 ] );
		}
		
	}
	var has_no_states = false;
	if( context_list.length == 0){		//没有内容时
		has_no_states = true;
		if( DrillUp.g_MPFS_default_enable == true ){
			context_list.push( this._drill_text_default );
		}
	}
	
	// 2.长度判定（必须在绘制前）
	//var tar_width = 0;
	//for (var i=0; i< contexts.length; i++) {
	//	var ic = 0;		//icon字符大小
	//	var temp = contexts[i];	
	//	var temp_s = temp.concat();
	//	temp_s = temp_s.replace(/\\C\[\d+\]/gi,'');
	//	temp_s = temp_s.replace(/\\I\[\d+\]/gi,function(){
	//		ic+=1;
	//		return '';
	//	}.bind(this));
	//	var temp_w = this.textWidth(temp_s) + ic * (this.standardFontSize() + 8);
	//	if( temp_w > tar_width ){
	//		tar_width = temp_w;
	//	}
	//}
	//this._drill_width = tar_width;
	//this._drill_height = contexts.length * ( this.standardFontSize() + DrillUp.g_MPFS_lineheight);
	//this._drill_width += this.standardPadding() * 2;
	//this._drill_height += this.standardPadding() * 2;
	//this._drill_width += DrillUp.g_MPFS_ex_width;
	//this._drill_height += DrillUp.g_MPFS_ex_height;
	////if( has_no_states ){	
	////	this._drill_width = 0;
	////	this._drill_height = 0;
	////}
	//this.width = this._drill_width;
	//this.height = this._drill_height;
	//
	//// 3.绘制内容
	//this.createContents();
    //this.contents.clear();
	//for (var i=0; i< contexts.length; i++) {
	//	var x = 0;
	//	var y = 0 + i*( this.standardFontSize() + DrillUp.g_MPFS_lineheight);
	//	
	//	var temp = contexts[i];	
	//	this.drawTextEx(temp,x,y);
	//}
	////if(contexts.length >= 1){
	////	alert(contexts);
	////	alert(this._drill_width);
	////	alert(this._drill_height);
	////}
	
	
	// > 窗口高宽 - 计算
	var options = {};
	options['convertEnabled'] = false;
	options['autoLineheight'] = true;
	options['lineheight'] = data['window_lineheight'];
	this.drill_COWA_DTLE_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	ww += $gameSystem._drill_MPFS_ex_width || 0;		//（附加高宽）
	hh += $gameSystem._drill_MPFS_ex_height || 0;
	this._drill_width = ww;
	this._drill_height = hh;
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	
	// > 绘制内容
	this.drill_COWA_drawTextListEx( context_list, options );
	
	
	if( data['window_type'] == "黑底背景" ){
		this._drill_background_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_background_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");	//（背景黑框）
		this._drill_background.bitmap = this._drill_background_BlackBitmap;
	}
	
}
	
	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MiniPlateForState = false;
		alert(
			"【Drill_MiniPlateForState.js 鼠标 - 状态和buff说明窗口】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}

