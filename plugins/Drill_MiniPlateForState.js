//=============================================================================
// Drill_MiniPlateForState.js
//=============================================================================

/*:
 * @plugindesc [v2.7]        鼠标 - 状态和buff说明窗口
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
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。该插件也可以对其它插件扩展。
 * 基于：
 *   - Drill_CoreOfInput             系统-输入设备核心
 *   - Drill_CoreOfWindowAuxiliary   系统-窗口辅助核心
 * 作用于：
 *   - MOG_BattleHud                 战斗UI-角色窗口 
 *     使得角色窗口的状态能显示，状态说明。
 *   - Drill_GaugeForBoss            UI-高级BOSS生命固定框★★v1.7及以上★★
 *     使得敌人生命框的状态能显示，状态说明。
 *   - YEP_BuffsStatesCore           YEP状态核心
 *     yep插件使得sv模式下玩家头上能显示状态图标，这里能兼容yep的图标。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于战斗图、战斗UI、地图UI。
 *   单独对鼠标有效，支持触屏按住。
 * 2.具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 * 细节：
 *   (1.配置的状态与数据库中状态的id一一对应，如果你修改了数据库的状态，
 *      需要记得进入该插件修改状态说明。
 *   (2.状态和buff是两种不同的分类，buff是固定的可叠加的能力值强化弱化。
 *      默认最高强化弱化2次，如果你修改了最大次数，可以继续添加3级以上说明。
 *   (3.sv模式中，角色在战斗中的状态不是图标，而是固定的几个gif状态。
 * 内容：
 *   (1.状态可以有两种说明方式，模糊说明，以及详细说明。
 *      你可以设置最初不了解状态时使用模糊说明，达到一定剧情后，用详细说明。
 *   (2.如果说明中没有任何字符，将不显示这个状态的说明内容。
 *      并视作为没有该状态。
 *   (3.你可以使用表达式 "<当前图标>" 来表示"\i[]"的图标，
 *      省去找图标编号的麻烦。
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
 * 系统窗口与默认的window.png图片一样，可设置为不同的皮肤。
 * 图片布局不能根据窗口内容自适应，你需要合理控制的设置的说明文字。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制状态信息：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>状态说明窗口 : 状态[1] : 使用模糊说明
 * 插件指令：>状态说明窗口 : 状态[2] : 使用详细说明
 * 插件指令：>状态说明窗口 : 状态[1] : 修改模糊说明 : 这是一条模糊说明内容
 * 插件指令：>状态说明窗口 : 状态[2] : 修改详细说明 : 这是一条详细说明内容
 *
 * 1.编号对应配置的编号，也对应状态的id编号。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口属性
 * 你可以修改设置说明窗口的部分属性：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>状态说明窗口 : 修改鼠标激活方式 : 鼠标接近
 * 插件指令：>状态说明窗口 : 修改鼠标激活方式 : 鼠标左键按下[持续]
 * 插件指令：>状态说明窗口 : 修改鼠标激活方式 : 鼠标滚轮按下[持续]
 * 插件指令：>状态说明窗口 : 修改鼠标激活方式 : 鼠标右键按下[持续]
 * 插件指令：>状态说明窗口 : 修改鼠标激活方式 : 触屏按下[持续]
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
 * 时间复杂度： o(n^2)+o(贴图处理) 每帧
 * 测试方法：   以正常流程进行游戏，记录鼠标靠近区域显示窗口的消耗。
 * 测试结果：   战斗界面，平均消耗为：【24.96ms】
 *              地图界面，平均消耗为：【23.35ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件在战斗界面中只有一个窗口和4个状态节点在工作，因此整体
 *   消耗不大。
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
 * 修复了鼠标接近 头顶图标 时，不显示窗口的bug。
 * [v1.9]
 * 添加了战斗层级的设置。
 * [v2.0]
 * 优化了内部整体结构。添加了窗口中心锚点的设置。
 * [v2.1]
 * 优化了与战斗活动镜头的变换关系。
 * [v2.2]
 * 优化了部分结构，减少了性能消耗。
 * [v2.3]
 * 优化了旧存档的识别与兼容。
 * [v2.4]
 * 添加了对 玩家信息固定框 的状态图标说明支持。
 * [v2.5]
 * 优化了内部结构，改进了鼠标触发以及刷新范围。
 * 修复了鼠标一直停留时不会刷新新加入的buff信息的bug。
 * [v2.6]
 * 添加了 <当前图标> 的表达式，省去找图标编号的麻烦。
 * [v2.7]
 * 修复了使用自定义窗口皮肤时文字变黑的bug。
 * 
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
 * @desc 鼠标接近指定的状态图标时，说明窗口会被激活。你也可以设置按键持续按下才显示。
 * @default 鼠标接近
 *
 * @param 偏移-窗口 X
 * @parent ---窗口---
 * @desc 以鼠标/触屏的点位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-窗口 Y
 * @parent ---窗口---
 * @desc 以鼠标/触屏的点位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
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
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-自定义背景图片 Y
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 是否锁定窗口色调
 * @parent ---窗口---
 * @type boolean
 * @on 锁定
 * @off 默认色调
 * @desc true - 锁定，false - 默认色调，你可以单独锁定该窗口的色调。
 * @default false
 *
 * @param 窗口色调-红
 * @parent 是否锁定窗口色调
 * @desc 范围为：-255 至 255，与默认游戏中窗口色调配置的值一样。
 * @default 0
 *
 * @param 窗口色调-绿
 * @parent 是否锁定窗口色调
 * @desc 范围为：-255 至 255，与默认游戏中窗口色调配置的值一样。
 * @default 0
 *
 * @param 窗口色调-蓝
 * @parent 是否锁定窗口色调
 * @desc 范围为：-255 至 255，与默认游戏中窗口色调配置的值一样。
 * @default 0
 *
 * @param 窗口中心锚点
 * @parent ---窗口---
 * @type select
 * @option 左上角
 * @value 左上角
 * @option 右上角
 * @value 右上角
 * @option 左下角
 * @value 左下角
 * @option 右下角
 * @value 右下角
 * @option 正上方
 * @value 正上方
 * @option 正下方
 * @value 正下方
 * @option 正左方
 * @value 正左方
 * @option 正右方
 * @value 正右方
 * @option 正中心
 * @value 正中心
 * @desc 窗口追随鼠标时，中心锚点的位置。
 * @default 左上角
 *
 * @param 是否锁定窗口位置
 * @parent ---窗口---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，将说明窗口锁定在一个固定的地方，而不是跟随鼠标位置走。
 * @default false
 *
 * @param 平移-锁定位置 X
 * @parent 是否锁定窗口位置
 * @desc 将说明窗口锁定在一个固定的地方，而不是跟随鼠标位置走。x轴方向平移，单位像素，0为贴在最左边。
 * @default 0
 *
 * @param 平移-锁定位置 Y
 * @parent 是否锁定窗口位置
 * @desc 将说明窗口锁定在一个固定的地方，而不是跟随鼠标位置走。y轴方向平移，单位像素，0为贴在最上面。
 * @default 0
 *
 * @param 窗口行间距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容之间的行间距。（默认标准：36）
 * @default 10
 *
 * @param 窗口内边距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（默认标准：28）
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
 * @default 最顶层
 *
 * @param 战斗图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在同一个战斗层级时，先后排序的位置，0表示最后面。
 * @default 90
 *
 * @param 地图层级
 * @parent ---窗口---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 窗口所在的战斗层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 最顶层
 *
 * @param 地图图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在同一个地图层级时，先后排序的位置，0表示最后面。
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
 * @default ["\"<当前图标>：暂时性生命\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性生命\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 强化-魔法
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"<当前图标>：暂时性魔法\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性魔法\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 强化-攻击力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"<当前图标>：暂时性物理攻击\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性物理攻击\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 强化-防御力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"<当前图标>：暂时性物理防御\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性物理防御\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 强化-魔法攻击
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"<当前图标>：暂时性魔法攻击\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性魔法攻击\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 强化-魔法防御
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"<当前图标>：暂时性魔法防御\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性魔法防御\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 强化-敏捷
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"<当前图标>：暂时性敏捷\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性敏捷\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 强化-幸运
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的强化buff的说明注释。序号对应强化的等级。
 * @default ["\"<当前图标>：暂时性幸运\\\\c[17] +25%\\\\c[0]。\"","\"<当前图标>：暂时性幸运\\\\c[17] +50%\\\\c[0]。\""]
 * 
 * @param 弱化-生命
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性生命\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性生命\\\\c[18] -50%\\\\c[0]。\""]
 * 
 * @param 弱化-魔法
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性魔法\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性魔法\\\\c[18] -50%\\\\c[0]。\""]
 * 
 * @param 弱化-攻击力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性物理攻击\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性物理攻击\\\\c[18] -50%\\\\c[0]。\""]
 * 
 * @param 弱化-防御力
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性物理防御\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性物理防御\\\\c[18] -50%\\\\c[0]。\""]
 * 
 * @param 弱化-魔法攻击
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性魔法攻击\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性魔法攻击\\\\c[18] -50%\\\\c[0]。\""]
 * 
 * @param 弱化-魔法防御
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性魔法防御\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性魔法防御\\\\c[18] -50%\\\\c[0]。\""]
 * 
 * @param 弱化-敏捷
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性敏捷\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性敏捷\\\\c[18] -50%\\\\c[0]。\""]
 * 
 * @param 弱化-幸运
 * @parent ---buff组---
 * @type note[]
 * @desc rmmv固定的弱化buff的说明注释。序号对应弱化的等级。
 * @default ["\"<当前图标>：暂时性幸运\\\\c[18] -25%\\\\c[0]。\"","\"<当前图标>：暂时性幸运\\\\c[18] -50%\\\\c[0]。\""]
 * 
 *
 * @param ---状态组 1至20---
 * @default 
 *
 * @param 状态-1
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default {"标签":"==战斗不能==","是否初始使用详细说明":"true","模糊说明":"\"<当前图标>：该单位已在战斗中阵亡。\"","详细说明":"\"<当前图标>：该单位已在战斗中阵亡。\""}
 * 
 * @param 状态-2
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default {"标签":"==防御==","是否初始使用详细说明":"true","模糊说明":"\"<当前图标>：该单位进入防御状态。\"","详细说明":"\"<当前图标>：防御\\\\c[204]x120%\\\\c[0]。受到的任何伤害减半。\""}
 * 
 * @param 状态-3
 * @parent ---状态组 1至20---
 * @type struct<MiniPlateForState>
 * @desc 添加状态的内容，当前配置的编号，对应数据库中的状态id。
 * @default {"标签":"==不死身==","是否初始使用详细说明":"true","模糊说明":"\"\"","详细说明":"\"\""}
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
 * @default ==状态名==
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
 * @desc 该状态的模糊说明内容。空字段表示不显示该状态的说明。你可以使用表达式 "<当前图标>" 来表示"\i[]"的图标字符。
 * @default "未知的状态"
 * 
 * @param 详细说明
 * @type note
 * @desc 该状态的详细说明内容。空字段表示不显示该状态的说明。你可以使用表达式 "<当前图标>" 来表示"\i[]"的图标字符。
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
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)+o(贴图处理) 每帧
//		★性能测试因素	鼠标乱晃
//		★性能测试消耗	优化前：41.76ms
//						优化后：12.9ms（update）63.8ms（drill_refreshMessage，这是因为用鼠标反复切换造成重新绘制产生的消耗）
//		★最坏情况		战斗界面出现大量敌人、角色、boss浮动框。
//						（该插件目前没有对最坏情况进行实测。）
//		★备注			无
//		
//		★优化记录
//			2022-10-21优化：
//				优化后的情况（Bean对象方法）：12.9ms，因为判断而造成的消耗显著减少了。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆预加载
//			->☆存储数据
//			->☆战斗层级
//				->添加贴图到层级【标准函数】
//				x->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				x->层级与镜头的位移【标准函数】
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				x->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				x->层级与镜头的位移【标准函数】
//			
//			->☆实体类容器
//			->☆实体类绑定
//				->绑定 - 敌人贴图
//				->绑定 - 角色贴图
//				->绑定 - mog角色窗口（MOG_BattleHud）
//				->绑定 - mog玩家信息固定框（MOG_ActorHud）
//				->绑定 - drill高级boss框（Drill_GaugeForBoss）
//			->状态和buff说明窗口实体类【Drill_MPFS_Bean】
//				->被动赋值
//					> 可见
//					> 位置
//					> 贴图框架值
//					> 状态和buff
//					> 所在层级
//			
//			->☆窗口控制
//				->创建说明窗口
//			->状态和buff说明窗口【Drill_MPFS_Window】
//				->A主体
//				->B实体类交互
//				->C位置跟随
//				->D窗口皮肤
//				->E窗口内容
//				
//				
//		★家谱：
//			无
//		
//		★脚本文档：
//			14.鼠标 > 关于鼠标悬浮窗口（脚本）.docx
//		
//		★插件私有类：
//			* 状态和buff说明窗口 实体类【Drill_MPFS_Bean】
//			* 状态和buff说明窗口【Drill_MPFS_Window】
//		
//		★必要注意事项：
//			1.Bean实体类在 贴图 中被动赋值。
//
//		★其它说明细节：
//			1.	2019/6/13
//			  	我也不知道这个插件的原理到底算不算复杂了。
//			  	写的时候行云流水，回头一看发现已经写了700多行……
//				窗口与布局 + 内容转义 + 字体大小 + 图标与颜色 + 鼠标位置获取 + battlehud父层级获取
//				详细窗口绑定在战斗界面的最顶层：_drill_SenceTopArea，并且只有这一个窗口。
//				窗口显示隐藏部分比较绕。
//				只要出现状态图标，它们就都可以鼠标靠近显示。
//				为此这里我建立了一个接口pushChecks，输入x,y,w,h,s,b等参数，s为状态id的列表。
//				通过这个接口，来实时刷新鼠标位置监听、窗口信息。(pushChecks已被弃用)
//			2.	2022/10/27
//				经过了多个插件修改，最后将原来的check框架彻底换成了bean实体类的结构。
//				从性能上也就减少了最多一半的消耗。
//				经过了多次修改，最后功能都被划分成一个一个块，或许这样逻辑能更清晰一些。
//				（其实我已经不能界定这样的逻辑是否更清晰，毕竟原来的check结构，逻辑已经很清晰了）
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
	DrillUp.g_MPFS_PluginTip_curName = "Drill_MiniPlateForState.js 鼠标-状态和buff说明窗口";
	DrillUp.g_MPFS_PluginTip_baseList = [
		"Drill_CoreOfInput.js 系统-输入设备核心",
		"Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MPFS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MPFS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MPFS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MPFS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MPFS_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_MPFS_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_MPFS_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到Buff对应消息
	//==============================
	DrillUp.drill_MPFS_getPluginTip_BuffNotFind = function( buff_name, level ){
		return "【" + DrillUp.g_MPFS_PluginTip_curName + "】\n找不到Buff对应消息，当前"+buff_name+"叠加到了"+level+"，请检查一下Buff组配置中是否有对应的信息。";
	};
	
	
//=============================================================================
// ** ☆静态数据
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
	
	DrillUp.g_MPFS_anchor = String(DrillUp.parameters["窗口中心锚点"] || "左上角" );
	DrillUp.g_MPFS_lock_enable = String(DrillUp.parameters["是否锁定窗口位置"] || "false") === "true";
	DrillUp.g_MPFS_lock_x = Number(DrillUp.parameters["平移-锁定位置 X"] || 0);
	DrillUp.g_MPFS_lock_y = Number(DrillUp.parameters["平移-锁定位置 Y"] || 0);
	DrillUp.g_MPFS_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_MPFS_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_MPFS_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_MPFS_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_MPFS_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	DrillUp.g_MPFS_battleLayer = String(DrillUp.parameters["战斗层级"] || "最顶层");
	DrillUp.g_MPFS_battleZIndex = Number(DrillUp.parameters["战斗图片层级"] || 90);
	DrillUp.g_MPFS_mapLayer = String(DrillUp.parameters["地图层级"] || "最顶层");
	DrillUp.g_MPFS_mapZIndex = Number(DrillUp.parameters["地图图片层级"] || 90);
	
	/*----------------窗口皮肤---------------*/
	DrillUp.g_MPFS_layout_type = String(DrillUp.parameters["布局模式"] || "黑底背景");
	DrillUp.g_MPFS_layout_opacity = Number(DrillUp.parameters["布局透明度"] || 255);
	DrillUp.g_MPFS_layout_sys_src = String(DrillUp.parameters["资源-自定义窗口皮肤"] || "");
	DrillUp.g_MPFS_layout_pic_src = String(DrillUp.parameters["资源-自定义背景图片"] || "");
	DrillUp.g_MPFS_layout_pic_x = Number(DrillUp.parameters["平移-自定义背景图片 X"] || 0 );
	DrillUp.g_MPFS_layout_pic_y = Number(DrillUp.parameters["平移-自定义背景图片 Y"] || 0 );
	DrillUp.g_MPFS_tone_lock = String(DrillUp.parameters["是否锁定窗口色调"] || "false") === "true";
	DrillUp.g_MPFS_tone_r = Number(DrillUp.parameters["窗口色调-红"] || 0 );
	DrillUp.g_MPFS_tone_g = Number(DrillUp.parameters["窗口色调-绿"] || 0 );
	DrillUp.g_MPFS_tone_b = Number(DrillUp.parameters["窗口色调-蓝"] || 0 );
	
	
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
	// * 静态数据 - 状态描述
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
			DrillUp.g_MPFS_list[i] = null;
		}
	};
	


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowAuxiliary ){


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_MPFS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFS_pluginCommand.call(this, command, args);
	if( command === ">状态说明窗口" ){	// >状态说明窗口 : A : 使用模糊说明
		
		/*-----------------内容------------------*/
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "使用模糊说明" ){
				temp1 = temp1.replace("状态[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(args[1]) -1;
				$gameSystem._drill_MPFS_enables[temp1] = false;
			}
			if( type == "使用详细说明" ){
				temp1 = temp1.replace("状态[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(args[1]) -1;
				$gameSystem._drill_MPFS_enables[temp1] = true;
			}
		}
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "修改模糊说明" ){
				temp1 = temp1.replace("状态[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(args[1]) -1;
				$gameSystem._drill_MPFS_m_context[temp1] = temp2;
			}
			if( type == "修改详细说明" ){
				temp1 = temp1.replace("状态[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(args[1]) -1;
				$gameSystem._drill_MPFS_x_context[temp1] = temp2;
			}
		}
		
		/*-----------------窗口属性------------------*/
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
			if( type == "修改鼠标激活方式" ){ 
				$gameSystem._drill_MPFS_mouseType = temp1;
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
var _drill_MPFS_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_MPFS_preload_initialize.call(this);
	this.drill_MPFS_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_MPFS_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_MPFS_preloadInit = function() {
	this._drill_MPFS_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_MPFS_preloadTank = [];						//bitmap容器
	
	// > 『窗口皮肤的预加载』
	if( DrillUp.g_MPFS_layout_type == "自定义窗口皮肤" ){
		this._drill_MPFS_preloadTank.push( 
			ImageManager.reserveBitmap( "img/system/", DrillUp.g_MPFS_layout_sys_src, 0, true, this._drill_MPFS_cacheId ) 
		);
	}
	if( DrillUp.g_MPFS_layout_type == "自定义背景图片" ){
		this._drill_MPFS_preloadTank.push( 
			ImageManager.reserveBitmap( "img/system/", DrillUp.g_MPFS_layout_pic_src, 0, true, this._drill_MPFS_cacheId ) 
		);
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
DrillUp.g_MPFS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPFS_sys_initialize.call(this);
	this.drill_MPFS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MPFS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MPFS_saveEnabled == true ){	
		$gameSystem.drill_MPFS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MPFS_initSysData();
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
Game_System.prototype.drill_MPFS_initSysData = function() {
	this.drill_MPFS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MPFS_checkSysData = function() {
	this.drill_MPFS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MPFS_initSysData_Private = function() {
	
	this._drill_MPFS_enables = [];			//（详细说明开关）
	this._drill_MPFS_m_context = [];		//（模糊说明文本）
	this._drill_MPFS_x_context = [];		//（详细说明文本）
	for(var i = 0; i < DrillUp.g_MPFS_list.length; i++){
		var temp_data = DrillUp.g_MPFS_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_MPFS_enables[i] = temp_data['enabled'];
		this._drill_MPFS_m_context[i] = temp_data['m_context'];
		this._drill_MPFS_x_context[i] = temp_data['x_context'];
	}
	
	this._drill_MPFS_mouseType = DrillUp.g_MPFS_mouse_type;		//（鼠标激活方式）
	this._drill_MPFS_ex_width = DrillUp.g_MPFS_ex_width;		//（窗口附加宽度）
	this._drill_MPFS_ex_height = DrillUp.g_MPFS_ex_height; 		//（窗口附加高度）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MPFS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MPFS_enables == undefined ){
		this.drill_MPFS_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_MPFS_list.length; i++ ){
		var temp_data = DrillUp.g_MPFS_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MPFS_enables[i] == undefined ){
				this._drill_MPFS_enables[i] = temp_data['enabled'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_MPFS_m_context[i] == undefined ){
				this._drill_MPFS_m_context[i] = temp_data['m_context'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
			
			// > 未存储的，重新初始化
			if( this._drill_MPFS_x_context[i] == undefined ){
				this._drill_MPFS_x_context[i] = temp_data['x_context'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_MPFS_layerAddSprite = function( sprite, layer_index ){
	this.drill_MPFS_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_MPFS_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_MPFS_sortByZIndex = function () {
    this.drill_MPFS_sortByZIndex_Private();
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
Scene_Battle.prototype.drill_MPFS_layerCameraMoving = function( x, y, layer, option ){
	//（当前为窗口，被点击对象，不适用位移）
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 上层
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
// * 战斗层级 - 图片层
//==============================
var _drill_MPFS_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_MPFS_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
};
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_MPFS_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFS_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
};
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
Scene_Battle.prototype.drill_MPFS_sortByZIndex_Private = function() {
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_MPFS_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
};


//#############################################################################
// ** 【标准模块】地图层级 ☆地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_MPFS_layerAddSprite = function( sprite, layer_index ){
    this.drill_MPFS_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_MPFS_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_MPFS_sortByZIndex = function () {
    this.drill_MPFS_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/中层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_MPFS_layerCameraMoving = function( x, y, layer, option ){
	//（当前为窗口，被点击对象，不适用位移）
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 上层
//==============================
var _drill_MPFS_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MPFS_layer_createDestination.call(this);		//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_MPFS_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_MPFS_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_MPFS_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFS_layer_createAllWindows.call(this);		//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
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
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_MPFS_sortByZIndex_Private = function() {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_MPFS_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
};



//=============================================================================
// ** ☆实体类容器
//
//			说明：	> 此模块在战斗界面/地图界面建立一个实体类容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_MPFS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MPFS_temp_initialize.call(this);
	this._drill_MPFS_beanTank = [];				//实体类容器
};
//==============================
// * 容器 - 切换贴图时（战斗界面）
//==============================
var _drill_MPFS_battle_createLowerLayer2 = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
	$gameTemp._drill_MPFS_beanTank = [];		//实体类容器
	_drill_MPFS_battle_createLowerLayer2.call(this);
};
//==============================
// * 容器 - 界面销毁时（战斗界面）
//==============================
var _drill_MPFS_battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_MPFS_battle_terminate.call(this);
	$gameTemp._drill_MPFS_beanTank = [];		//实体类容器
};
//==============================
// * 容器 - 切换贴图时（地图界面）
//==============================
var _drill_MPFS_map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_MPFS_beanTank = [];		//实体类容器
	_drill_MPFS_map_createCharacters.call(this);
};
//==============================
// * 容器 - 界面销毁时（地图界面）
//==============================
var _drill_MPFS_map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_MPFS_map_terminate.call(this);
	$gameTemp._drill_MPFS_beanTank = [];		//实体类容器
};


//=============================================================================
// ** ☆实体类绑定
//
//			说明：	> 此模块根据ui插件的具体位置，进行实体类创建与触发区域绑定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 实体类绑定 - 敌人贴图（战斗界面）
//==============================
var _drill_MPFS_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateStateSprite = function() {
	_drill_MPFS_Enemy_updateStateSprite.call(this);
    if( this._battler == undefined ){ return; }
    if( this._stateIconSprite == undefined ){ return; }
	
	
	// > 实体类创建
	if( this._drill_MPFS_bean == undefined ){
		this._drill_MPFS_bean = new Drill_MPFS_Bean();
		$gameTemp._drill_MPFS_beanTank.push( this._drill_MPFS_bean );
	}
	
	
	// > 范围捕获
	//		（此处不需镜头修正，后面转换为 战斗落点 来捕获范围）
	var xx = 0;
	var yy = 0;
	var ww = 0;
	var hh = 0;
	xx = this.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth;
	yy = this.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight + this._stateIconSprite.y;
	ww = Sprite_StateIcon._iconWidth;
	hh = Sprite_StateIcon._iconHeight;
	
	// > 实体类设置
	var battler = this._stateIconSprite._battler;
	var bean = this._drill_MPFS_bean;
	bean.drill_bean_setPosition( xx, yy );
	bean.drill_bean_resetFrame( 0, 0, ww, hh );		//固定高宽『贴图框架值』
	bean.drill_bean_setStateAndBuff( battler._states, battler._buffs );
	bean.drill_bean_setLayer( "上层" );
	
	if( Imported.YEP_AutoPassiveStates ){
		var state_list = battler.passiveStatesRaw().concat( battler._states );
		bean.drill_bean_setStateAndBuff( state_list, battler._buffs );
	}
};
//==============================
// * 实体类绑定 - 角色贴图（战斗界面）
//==============================
var _drill_MPFS_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
	_drill_MPFS_Actor_update.call(this);
    if( this._battler == undefined ){ return; }
    if( this._actor == undefined ){ return; }
	
	
	// > 实体类创建
	if( this._drill_MPFS_bean == undefined ){
		this._drill_MPFS_bean = new Drill_MPFS_Bean();
		$gameTemp._drill_MPFS_beanTank.push( this._drill_MPFS_bean );
	}
	
	
	// > 范围捕获
	//		（此处不需镜头修正，后面转换为 战斗落点 来捕获范围）
	var xx = 0;
	var yy = 0;
	var ww = 0;
	var hh = 0;
	if( this._stateIconSprite ){	//如果有 Sprite_StateIcon（yep的）则按照那个来
		xx = this.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth;
		yy = this.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight + this._stateIconSprite.y;
		ww = Sprite_StateIcon._iconWidth;
		hh = Sprite_StateIcon._iconHeight;
	}else{
		xx = this.x - this._stateSprite.anchor.x * 48;
		yy = this.y - this._stateSprite.anchor.y * 48 - 24;
		ww = 48;		//（来自Sprite_StateOverlay，固定48像素）
		hh = 48;
	}
	
	// > 实体类设置
	var bean = this._drill_MPFS_bean;
	bean.drill_bean_setPosition( xx, yy );
	bean.drill_bean_resetFrame( 0, 0, ww, hh );		//固定高宽『贴图框架值』
	if( this._stateIconSprite ){
		var battler = this._stateIconSprite._battler;
		bean.drill_bean_setStateAndBuff( battler._states, battler._buffs );
		bean.drill_bean_setLayer( "上层" );
		
		if( Imported.YEP_AutoPassiveStates ){
			var state_list = battler.passiveStatesRaw().concat( battler._states );
			bean.drill_bean_setStateAndBuff( state_list, battler._buffs );
		}
	}else{
		var battler = this._battler;
		bean.drill_bean_setStateAndBuff( battler._states, battler._buffs );
		bean.drill_bean_setLayer( "上层" );
		
		if( Imported.YEP_AutoPassiveStates ){
			var state_list = battler.passiveStatesRaw().concat( battler._states );
			bean.drill_bean_setStateAndBuff( state_list, battler._buffs );
		}
	}
};
//==============================
// * 实体类绑定 - mog角色窗口（战斗界面）
//==============================
if( Imported.MOG_BattleHud ){
	var _drill_MPFS_BHud_update = Battle_Hud.prototype.update;
	Battle_Hud.prototype.update = function() {
		_drill_MPFS_BHud_update.call(this);
		if( this._battler == undefined ){ return; }
		if( this._state_icon == undefined ){ return; }
		
		
		// > 实体类创建
		if( this._drill_MPFS_bean == undefined ){
			this._drill_MPFS_bean = new Drill_MPFS_Bean();
			$gameTemp._drill_MPFS_beanTank.push( this._drill_MPFS_bean );
		}
		
		
		// > 图标数量
		var icon_n = 1;
		if( this._stateType === 0 ){
			icon_n = 1;
		}else{
			icon_n = Math.max(this._battler._states.length,1);
		};
		
		// > 范围捕获
		var xx = 0;
		var yy = 0;
		var ww = 0;
		var hh = 0;
		if(Moghunter.bhud_statesAlign == 1){		//mog状态右对齐
			xx = this._state_icon.x - Window_Base._iconWidth * (icon_n -1);
			yy = this._state_icon.y;
			ww = Window_Base._iconWidth * icon_n;
			hh = Window_Base._iconHeight;
		}else if(Moghunter.bhud_statesAlign == 2){	//mog状态下对齐
			xx = this._state_icon.x;
			yy = this._state_icon.y;
			ww = Window_Base._iconWidth;
			hh = Window_Base._iconHeight * icon_n;
		}else if(Moghunter.bhud_statesAlign == 3){	//mog状态上对齐
			xx = this._state_icon.x;
			yy = this._state_icon.y - Window_Base._iconWidth * (icon_n -1);
			ww = Window_Base._iconWidth;
			hh = Window_Base._iconHeight * icon_n;
		}else{										//mog状态左对齐
			xx = this._state_icon.x;
			yy = this._state_icon.y;
			ww = Window_Base._iconWidth * icon_n;
			hh = Window_Base._iconHeight;
		}
		
		// > 实体类设置
		var battler = this._battler;
		var bean = this._drill_MPFS_bean;
		bean.drill_bean_setPosition( xx, yy );
		bean.drill_bean_resetFrame( 0, 0, ww, hh );		//固定高宽『贴图框架值』
		bean.drill_bean_setStateAndBuff( battler._states, battler._buffs );
		bean.drill_bean_setLayer( "图片层" );
		
		if( Imported.YEP_AutoPassiveStates ){
			var state_list = battler.passiveStatesRaw().concat( battler._states );
			bean.drill_bean_setStateAndBuff( state_list, battler._buffs );
		}
	}
}
//==============================
// * 实体类绑定 - mog玩家信息固定框（地图界面）
//==============================
if( Imported.MOG_ActorHud ){
	var _drill_MPFS_AHud_update = Actor_Hud.prototype.update;
	Actor_Hud.prototype.update = function() {
		_drill_MPFS_AHud_update.call(this);
		if( this._battler == undefined ){ return; }
		if( this._state_icon == undefined ){ return; }
		
		
		// > 实体类创建
		if( this._drill_MPFS_bean == undefined ){
			this._drill_MPFS_bean = new Drill_MPFS_Bean();
			$gameTemp._drill_MPFS_beanTank.push( this._drill_MPFS_bean );
		}
		
		
		// > 范围捕获
		var xx = 0;
		var yy = 0;
		var ww = 0;
		var hh = 0;
		xx = this._state_icon.x;
		yy = this._state_icon.y;
		ww = Window_Base._iconWidth;
		hh = Window_Base._iconHeight;
		
		// > 实体类设置
		var battler = this._battler;
		var bean = this._drill_MPFS_bean;
		bean.drill_bean_setVisible( this.opacity > 0 );	//（该框根据透明度来控制是否显示）
		bean.drill_bean_setPosition( xx, yy );
		bean.drill_bean_resetFrame( 0, 0, ww, hh );		//固定高宽『贴图框架值』
		bean.drill_bean_setStateAndBuff( battler._states, battler._buffs );
		bean.drill_bean_setLayer( "图片层" );
		
		if( Imported.YEP_AutoPassiveStates ){
			var state_list = battler.passiveStatesRaw().concat( battler._states );
			bean.drill_bean_setStateAndBuff( state_list, battler._buffs );
		}
	}
}
//==============================
// * 实体类绑定 - drill高级boss框（战斗界面）
//==============================
if( Imported.Drill_GaugeForBoss ){
	var _drill_MPFS_GFB_update = Drill_GFB_StyleSprite.prototype.drill_updateStates ;
	Drill_GFB_StyleSprite.prototype.drill_updateStates = function() {
		_drill_MPFS_GFB_update.call(this);
		if( this._drill_enemy == undefined ){ return; }
		var data_b = this._drill_data_bind;
		var data_s = this._drill_data_style;
		if( data_s['state_enable'] != true ){ return; }
		
	
		// > 实体类创建
		if( this._drill_MPFS_bean == undefined ){
			this._drill_MPFS_bean = new Drill_MPFS_Bean();
			$gameTemp._drill_MPFS_beanTank.push( this._drill_MPFS_bean );
		}
		
		
		// > 范围捕获
		var xx = 0;
		var yy = 0;
		var ww = 0;
		var hh = 0;
		var icons = this._drill_enemy.allIcons();
		var icon_n = Math.max(icons.length,1);
		var space = data_s['state_spacing'];
		var align = data_s['state_align'];
		var iw = Window_Base._iconWidth;
		var ih = Window_Base._iconHeight;
		if( data_s['state_mode'] == "直线并排" ){
		
			if( align == "右对齐" ){
				xx = this.x + this._drill_state_sprite.x - iw * (icon_n -1);
				yy = this.y + this._drill_state_sprite.y;
				ww = iw * icon_n;
				hh = ih;
			}else if( align == "上对齐" ){
				xx = this.x + this._drill_state_sprite.x;
				yy = this.y + this._drill_state_sprite.y - iw * (icon_n -1);
				ww = iw;
				hh = ih * icon_n;
			}else if( align == "下对齐" ){
				xx = this.x + this._drill_state_sprite.x;
				yy = this.y + this._drill_state_sprite.y;
				ww = iw;
				hh = ih * icon_n;
			}else{
				xx = this.x + this._drill_state_sprite.x;
				yy = this.y + this._drill_state_sprite.y;
				ww = iw * icon_n;
				hh = ih;
			}
		}else{
			xx = this.x + this._drill_state_sprite.x;
			yy = this.y + this._drill_state_sprite.y;
			ww = iw;
			hh = ih;
		}
		xx -= iw/2;
		yy -= ih/2;
		
		// > 实体类设置
		var battler = this._drill_enemy;
		var bean = this._drill_MPFS_bean;
		bean.drill_bean_setVisible( this.visible );
		bean.drill_bean_setPosition( xx, yy );
		bean.drill_bean_resetFrame( 0, 0, ww, hh );		//固定高宽『贴图框架值』
		bean.drill_bean_setStateAndBuff( battler._states, battler._buffs );
		bean.drill_bean_setLayer( data_b['layerIndex_battle'] );	//（boss框的层级）
		
		if( Imported.YEP_AutoPassiveStates ){
			var state_list = battler.passiveStatesRaw().concat( battler._states );
			bean.drill_bean_setStateAndBuff( state_list, battler._buffs );
		}
	}
}


//=============================================================================
// ** 状态和buff说明窗口 实体类【Drill_MPFS_Bean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **					->被动赋值
// **						> 可见
// **						> 位置
// **						> 贴图框架值
// **						> 状态和buff
// **						> 所在层级
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 该类没有帧刷新，只能通过函数被动赋值。
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_MPFS_Bean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_MPFS_Bean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_bean_initData();											//私有数据初始化
};
//##############################
// * 实体类 - 显示/隐藏【开放函数】
//			
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_MPFS_Bean.prototype.drill_bean_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 实体类 - 设置位置【开放函数】
//			
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//			
//			说明：	> 实体类只记录一个坐标和一个框架范围。需要考虑锚点的影响。
//##############################
Drill_MPFS_Bean.prototype.drill_bean_setPosition = function( x, y ){
	this._drill_x = x;
	this._drill_y = y;
};
//##############################
// * 实体类 - 设置框架【开放函数】
//			
//			参数：	> frameX,frameY,frameW,frameH 矩形对象
//			返回：	> 无
//			
//			说明：	> 被动赋值，见 刷新框架 的功能。
//##############################
Drill_MPFS_Bean.prototype.drill_bean_resetFrame = function( frameX, frameY, frameW, frameH ){
	this._drill_frameX = frameX;
	this._drill_frameY = frameY;
	this._drill_frameW = frameW;
	this._drill_frameH = frameH;
};
//##############################
// * 实体类 - 设置状态和buff【开放函数】
//			
//			参数：	> state_list 数字列表
//					> buff_list 数字列表
//			返回：	> 无
//##############################
Drill_MPFS_Bean.prototype.drill_bean_setStateAndBuff = function( state_list, buff_list ){
	this._drill_state_list = state_list;
	this._drill_buff_list = buff_list;
};
//##############################
// * 实体类 - 设置所在层级【开放函数】
//			
//			参数：	> layer 字符串
//			返回：	> 无
//##############################
Drill_MPFS_Bean.prototype.drill_bean_setLayer = function( layer ){
	this._drill_layer = layer;
};
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_MPFS_Bean.prototype.drill_bean_initData = function(){
	
	this._drill_visible = true;				//实体类 - 可见
	
	this._drill_x = 0;						//实体类 - 位置X
	this._drill_y = 0;						//实体类 - 位置Y
	
	this._drill_frameX = 0;					//实体类 - 框架X
	this._drill_frameY = 0;					//实体类 - 框架Y
	this._drill_frameW = 0;					//实体类 - 框架宽度
	this._drill_frameH = 0;					//实体类 - 框架高度
	
	this._drill_state_list = [];			//实体类 - 状态列表
	this._drill_buff_list = [];				//实体类 - buff列表
	
	this._drill_layer = "图片层";			//实体类 - 所在层级
};



//=============================================================================
// ** ☆窗口控制
//			
//			说明：	> 此模块专门管理 说明窗口 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口控制（战斗界面） - 创建说明窗口
//==============================
var _drill_MPFS_battleScene_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFS_battleScene_createAllWindows.call(this);
	
	if( this._drill_MPFS_window == undefined ){		//（只建立一个窗口）
		this._drill_MPFS_window = new Drill_MPFS_Window();
		this._drill_MPFS_window.zIndex = DrillUp.g_MPFS_battleZIndex;
		this._drill_MPFS_window._drill_curScene = "Scene_Battle";
		
		// > 添加贴图到层级
		this.drill_MPFS_layerAddSprite( this._drill_MPFS_window, DrillUp.g_MPFS_battleLayer );
		
		// > 图片层级排序
		this.drill_MPFS_sortByZIndex();
	}
};
//==============================
// * 窗口控制（地图界面） - 创建说明窗口
//==============================
var _drill_MPFS_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_MPFS_map_createAllWindows.call(this);
	
	if( this._drill_MPFS_window == undefined ){		//只建立一个窗口
		this._drill_MPFS_window = new Drill_MPFS_Window();
		this._drill_MPFS_window.zIndex = DrillUp.g_MPFS_mapZIndex;
		this._drill_MPFS_window._drill_curScene = "Scene_Map";
		
		// > 添加贴图到层级
		this.drill_MPFS_layerAddSprite( this._drill_MPFS_window, DrillUp.g_MPFS_mapLayer );
		
		// > 图片层级排序
		this.drill_MPFS_sortByZIndex();
	}
};
	
	
//=============================================================================
// ** 状态和buff说明窗口【Drill_MPFS_Window】
// **		
// **		索引：	无
// **		来源：	继承于Window_Base
// **		实例：	Scene_Battle下的 _drill_MPFS_window 成员
// **		应用：	暂无 
// **		
// **		作用域：	战斗界面
// **		主功能：	定义一个窗口，能随时改变内容和高宽，用于描述状态信息。
// **		子功能：	->窗口
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **					->A主体
// **						->显示/隐藏控制
// **						->锁定皮肤样式
// **					->B实体类交互
// **					->C位置跟随
// **						->跟随鼠标位置
// **						->中心锚点
// **						->边缘修正
// **					->D窗口皮肤
// **						> 默认窗口皮肤
// **						> 自定义窗口皮肤
// **						> 自定义背景图片
// **						> 黑底背景
// **					->E窗口内容
// **						->状态的详细说明
// **						->状态的模糊说明
// **						->buff的说明
// **			
// **		说明：	> 整个场景只有一个该窗口。
// **				> 其它相似的可变窗口插件，可以搜关键词："initSkin"。
//=============================================================================
//==============================
// * 说明窗口 - 定义
//==============================
function Drill_MPFS_Window() {
    this.initialize.apply(this, arguments);
};
Drill_MPFS_Window.prototype = Object.create(Window_Base.prototype);
Drill_MPFS_Window.prototype.constructor = Drill_MPFS_Window;
//==============================
// * 说明窗口 - 初始化
//==============================
Drill_MPFS_Window.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);

	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 说明窗口 - 帧刷新
//==============================
Drill_MPFS_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_updateBean();			//帧刷新 - B实体类交互（最先执行）
	this.drill_updatePosition();		//帧刷新 - C位置跟随
	this.drill_updateSkin();			//帧刷新 - D窗口皮肤
	this.drill_updateMessage();			//帧刷新 - E窗口内容
	this.drill_updateAttr_Visible();	//帧刷新 - A主体 - 可见
}
//==============================
// * 说明窗口 - 私有覆写函数
//==============================
Drill_MPFS_Window.prototype.lineHeight = function(){ return DrillUp.g_MPFS_lineheight; };		//窗口行间距
Drill_MPFS_Window.prototype.standardPadding = function(){ return DrillUp.g_MPFS_padding; };		//窗口内边距
Drill_MPFS_Window.prototype.standardFontSize = function(){ return DrillUp.g_MPFS_fontsize; };	//窗口字体大小
//==============================
// * 说明窗口 - 初始化数据
//==============================
Drill_MPFS_Window.prototype.drill_initData = function() {
	//（暂无 默认值）
}
//==============================
// * 说明窗口 - 初始化数据
//
//			说明：	> 此函数只在初始化时执行一次，重设数据 被分到各个子功能里面执行。
//==============================
Drill_MPFS_Window.prototype.drill_initSprite = function() {
	this.drill_initAttr();				//初始化对象 - A主体
	this.drill_initBean();				//初始化对象 - B实体类交互
	this.drill_initPosition();			//初始化对象 - C位置跟随
	this.drill_initSkin();				//初始化对象 - D窗口皮肤
	this.drill_initMessage();			//初始化对象 - E窗口内容
	
	
	// > 重设数据
	//		（ 状态和buff说明窗口 没有样式切换，所以重设数据只在这里执行一次）
	var data = {};
	
	data['anchor'] = DrillUp.g_MPFS_anchor;
	
	data['window_type'] = DrillUp.g_MPFS_layout_type;
	data['window_opacity'] = DrillUp.g_MPFS_layout_opacity;
	data['window_sys_src'] =  DrillUp.g_MPFS_layout_sys_src;
	data['window_pic_src'] =  DrillUp.g_MPFS_layout_pic_src;
	data['window_pic_x'] = DrillUp.g_MPFS_layout_pic_x;
	data['window_pic_y'] = DrillUp.g_MPFS_layout_pic_y;
	data['window_tone_lock'] = DrillUp.g_MPFS_tone_lock;
	data['window_tone_r'] = DrillUp.g_MPFS_tone_r;
	data['window_tone_g'] = DrillUp.g_MPFS_tone_g;
	data['window_tone_b'] = DrillUp.g_MPFS_tone_b;
	
	// > 重设数据（C位置跟随）
	this.drill_resetData_Position( data );
	// > 重设数据（D窗口皮肤）
	this.drill_resetData_Skin( data );
	// > 重设数据（E窗口内容）
	this.drill_resetData_Message( data );
};


//==============================
// * A主体 - 初始化
//==============================
Drill_MPFS_Window.prototype.drill_initAttr = function() {
	
	// > 私有属性初始化
	this._drill_width = 0;				//窗口宽度
	this._drill_height = 0;				//窗口高度
	this._drill_showDelay = 0;			//显示延迟
}
//==============================
// * A主体 - 帧刷新 可见
//==============================
Drill_MPFS_Window.prototype.drill_updateAttr_Visible = function() {
	
	// > 时间-1
	this._drill_showDelay -= 1;
	
	// > 没有 实体类 时，直接不显示
	if( this._drill_curBean == null ){
		this.visible = false;
		return;
	}
	
	// > 延迟显示时，不显示
	if( this._drill_showDelay >= 0 ){
		this.visible = false;
		return;
	}
	
	// > 显示
	this.visible = true;
}


//==============================
// * B实体类交互 - 初始化
//==============================
Drill_MPFS_Window.prototype.drill_initBean = function() {
	this._drill_curBean = null;
}
//==============================
// * B实体类交互 - 帧刷新
//==============================
Drill_MPFS_Window.prototype.drill_updateBean = function() {
	this._drill_curBean = null;
	
	for( var i=0; i < $gameTemp._drill_MPFS_beanTank.length; i++ ){
		var bean = $gameTemp._drill_MPFS_beanTank[i];
		
		// > 条件 - 触发范围
		if( this.drill_isInFrame(bean) ){
			
			// > 条件 - 鼠标激活方式
			if( this.drill_isMouseControl(bean) ){
				
				this._drill_curBean = bean;
				return;
			}
		}
	}
}
//==============================
// * B实体类交互 - 条件 - 触发范围
//
//			参数：	> bean 实体类对象
//			说明：	> 检查鼠标是否在该实体类的范围内。『鼠标落点与实体类范围』
//						镜头与层级 - 已支持
//						中心锚点   - 已支持（但注意 drill_bean_setPosition 的第n个图标偏移）
//						特殊变换   - 暂不明确
//						触屏响应   - 暂不明确
//==============================
Drill_MPFS_Window.prototype.drill_isInFrame = function( bean ){
	if( bean['_drill_visible'] == false ){ return false; }
	
	// > 判定 - 鼠标位置
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( $gameSystem._drill_MPFS_mouseType == "触屏按下[持续]" ){
		_x = TouchInput.x;
		_y = TouchInput.y;
	}
	
	// > 判定 - 镜头与层级【战斗 - 活动战斗镜头】战斗鼠标落点
	// 	 			（注意，这里是 战斗鼠标落点 与 矩形范围的图层 偏移关系 ）
	if( Imported.Drill_BattleCamera ){
		if( this._drill_curScene == "Scene_Battle" ){
			var layer = bean['_drill_layer'];
			if( layer == "下层" || layer == "上层" ){
				var convert_pos = $gameSystem._drill_BCa_controller.drill_BCa_getPos_OuterToChildren( _x, _y );
				_x = convert_pos.x;
				_y = convert_pos.y;	
			}
			if( layer == "图片层" || layer == "最顶层" ){
				//（不操作）
			}
		}
	}
	
	// > 判定 - 镜头与层级【地图 - 活动地图镜头】地图鼠标落点
	//  			（注意，这里是 地图鼠标落点 与 矩形范围的图层 偏移关系 ）
	if( Imported.Drill_LayerCamera ){
		if( this._drill_curScene == "Scene_Map" ){
			var layer = bean['_drill_layer'];
			if( layer == "下层" || layer == "中层" || layer == "上层" ){
				var convert_pos = $gameSystem._drill_LCa_controller.drill_LCa_getPos_OuterToChildren( _x, _y );
				_x = convert_pos.x;
				_y = convert_pos.y;	
			}
			if( layer == "图片层" || layer == "最顶层" ){
				//（不操作）
			}
		}
	}
	
	// > 判定 - 触发范围
	if( _x > bean['_drill_x'] + bean['_drill_frameW'] ){ return false; }
	if( _x < bean['_drill_x'] + 0 ){ return false; }
	if( _y > bean['_drill_y'] + bean['_drill_frameH'] ){ return false; }
	if( _y < bean['_drill_y'] + 0 ){ return false; }
	return true;
}
//==============================
// * B实体类交互 - 条件 - 鼠标激活方式
//==============================
Drill_MPFS_Window.prototype.drill_isMouseControl = function( bean ){
	if( $gameSystem._drill_MPFS_mouseType == "鼠标左键按下[持续]" ){
		if( TouchInput.drill_isLeftPressed() ){ return true; }else{ return false; }
	}else if( $gameSystem._drill_MPFS_mouseType == "鼠标滚轮按下[持续]" ){
		if( TouchInput.drill_isMiddlePressed() ){ return true; }else{ return false; }
	}else if( $gameSystem._drill_MPFS_mouseType == "鼠标右键按下[持续]" ){
		if( TouchInput.drill_isRightPressed() ){ return true; }else{ return false; }
	}else if( $gameSystem._drill_MPFS_mouseType == "触屏按下[持续]" ){
		if( TouchInput.isPressed() ){ return true; }else{ return false; }
	}
	return true;
}


//==============================
// * C位置跟随 - 初始化
//==============================
Drill_MPFS_Window.prototype.drill_initPosition = function() {
	this._drill_anchor_x = 0;		//中心锚点x
	this._drill_anchor_y = 0;		//中心锚点y
}
//==============================
// * C位置跟随 - 重设数据
//==============================
Drill_MPFS_Window.prototype.drill_resetData_Position = function( data ) {
	if( data['anchor'] == "左上角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 0.0; }
	if( data['anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( data['anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( data['anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	if( data['anchor'] == "正上方" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.0; }
	if( data['anchor'] == "正下方" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 1.0; }
	if( data['anchor'] == "正左方" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 0.5; }
	if( data['anchor'] == "正右方" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.5; }
	if( data['anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
}
//==============================
// * C位置跟随 - 帧刷新
//==============================
Drill_MPFS_Window.prototype.drill_updatePosition = function() {
	var xx = 0;
	var yy = 0;
	xx += DrillUp.g_MPFS_x;
	yy += DrillUp.g_MPFS_y;
	
	// > 锁定位置
	if( DrillUp.g_MPFS_lock_enable == true ){				
		xx += DrillUp.g_MPFS_lock_x;
		yy += DrillUp.g_MPFS_lock_y;
		
		
	// > 跟随鼠标位置
	}else{
		xx += _drill_mouse_x;
		yy += _drill_mouse_y;
		
		// > 【战斗 - 活动战斗镜头】战斗落点 转换
		//  	（注意，这里只改变窗口的位置 ）
		if( Imported.Drill_BattleCamera ){
			if( this._drill_curScene == "Scene_Battle" ){
				var layer = DrillUp.g_MPFS_battleLayer;
				if( layer == "下层" || layer == "上层" ){
					var convert_pos = $gameSystem._drill_BCa_controller.drill_BCa_getPos_OuterToChildren( xx, yy );
					xx = convert_pos.x;
					yy = convert_pos.y;
				}
				if( layer == "图片层" || layer == "最顶层" ){
					//（不操作）
				}
			}
		}
		
		// > 【地图 - 活动地图镜头】地图落点 转换
		//  	（注意，这里只改变窗口的位置 ）
		if( Imported.Drill_LayerCamera ){
			if( this._drill_curScene == "Scene_Map" ){
				var layer = DrillUp.g_MPFS_mapLayer;
				if( layer == "下层" || layer == "上层" ){
					var convert_pos = $gameSystem._drill_LCa_controller.drill_LCa_getPos_OuterToChildren( xx, yy );
					xx = convert_pos.x;
					yy = convert_pos.y;
				}
				if( layer == "图片层" || layer == "最顶层" ){
					//（不操作）
				}
			}
		}
	}
	
	
	// > 中心锚点
	xx -= this._drill_width * this._drill_anchor_x;
	yy -= this._drill_height * this._drill_anchor_y;
	
	
	// > 边缘修正 - 横向贴边
	if( xx < 0 ){ xx = 0; }
	if( xx > Graphics.boxWidth - this._drill_width ){
		xx = Graphics.boxWidth - this._drill_width;
	}
	// > 边缘修正 - 纵向贴边
	if( yy < 0 ){ yy = 0; }
	if( yy > Graphics.boxHeight - this._drill_height ){
		yy = Graphics.boxHeight - this._drill_height;
	}
	
	this.x = xx;
	this.y = yy;
}


//==============================
// * D窗口皮肤 - 初始化
//
//			说明：	> 此函数只在初始化时执行一次，不要执行多了。
//==============================
Drill_MPFS_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
}
//==============================
// * D窗口皮肤 - 重设数据
//
//			说明：	> 样式切换时重设，data对象中的参数【可以缺项】。
//==============================
Drill_MPFS_Window.prototype.drill_resetData_Skin = function( data ){
	
	// > 默认值
	if( data['window_type'] == undefined ){ data['window_type'] = "默认窗口皮肤" };		//布局模式（默认窗口皮肤/自定义窗口皮肤/自定义背景图片/黑底背景）
	if( data['window_opacity'] == undefined ){ data['window_opacity'] = 255 };			//布局透明度
	if( data['window_sys_src'] == undefined ){ data['window_sys_src'] = "" };			//资源-自定义窗口皮肤
	if( data['window_pic_src'] == undefined ){ data['window_pic_src'] = "" };			//资源-自定义背景图片
	if( data['window_pic_x'] == undefined ){ data['window_pic_x'] = 0 };				//背景图片X
	if( data['window_pic_y'] == undefined ){ data['window_pic_y'] = 0 };				//背景图片Y
	
	if( data['window_tone_lock'] == undefined ){ data['window_tone_lock'] = false };	//是否锁定窗口色调
	if( data['window_tone_r'] == undefined ){ data['window_tone_r'] = 0 };				//窗口色调-红
	if( data['window_tone_g'] == undefined ){ data['window_tone_g'] = 0 };				//窗口色调-绿
	if( data['window_tone_b'] == undefined ){ data['window_tone_b'] = 0 };				//窗口色调-蓝
	
	
	// > 窗口皮肤 - 私有变量初始化
	this._drill_skin_type = data['window_type'];
	this._drill_skin_opacity = data['window_opacity'];
	
	this._drill_skinBackground_width = 0;
	this._drill_skinBackground_height = 0;
	if( data['window_type'] == "自定义背景图片" && data['window_pic_src'] != "" ){
		this._drill_skin_pic_bitmap = ImageManager.loadBitmap( "img/system/", data['window_pic_src'], 0, true );
		this._drill_skin_pic_x = data['window_pic_x'];
		this._drill_skin_pic_y = data['window_pic_y'];
	}else{
		this._drill_skin_pic_bitmap = ImageManager.loadEmptyBitmap();
	}
	
	if( data['window_type'] == "自定义窗口皮肤" && data['window_sys_src'] != "" ){
		this._drill_skin_sys_bitmap = ImageManager.loadBitmap( "img/system/", data['window_sys_src'], 0, true );
	}else{
		this._drill_skin_sys_bitmap = this._drill_skin_defaultSkin;
	}
	
	this._drill_skin_tone_lock = data['window_tone_lock'];
	this._drill_skin_tone_r = data['window_tone_r'];
	this._drill_skin_tone_g = data['window_tone_g'];
	this._drill_skin_tone_b = data['window_tone_b'];
	
	
	// > 窗口皮肤 - 贴图初始化
	if( this._drill_skinBackground == undefined ){
		this._drill_skinBackground = new Sprite();
		this._windowSpriteContainer.addChild(this._drill_skinBackground);	//（ _windowSpriteContainer 为窗口的最底层贴图）
	}
	
	
	// > 窗口皮肤 - 布局模式
	if( this._drill_skin_type == "默认窗口皮肤" || this._drill_skin_type == "默认窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = 0;							//背景容器层 - 背景图片 透明度
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;
		
		
	}else if( this._drill_skin_type == "自定义窗口皮肤" || this._drill_skin_type == "系统窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_sys_bitmap;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = this._drill_skin_opacity;		//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = 0;							//背景容器层 - 背景图片 透明度
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;
		
		
	}else if( this._drill_skin_type == "自定义背景图片" || this._drill_skin_type == "图片窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = 0;								//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = 0;							//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = this._drill_skin_opacity;	//背景容器层 - 背景图片 透明度]
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = this._drill_skin_pic_bitmap;
		this._drill_skinBackground.x = this._drill_skin_pic_x;
		this._drill_skinBackground.y = this._drill_skin_pic_y;
		
		
	}else if( this._drill_skin_type == "黑底背景" || this._drill_skin_type == "黑底布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		//this.contentsOpacity = 255;									//文本域 透明度（与 背景容器层 并列）
		//this.opacity = 255;											//背景容器层 透明度
		this._windowBackSprite.opacity = 0;								//背景容器层 - 平铺贴图 透明度
		this._windowFrameSprite.opacity = 0;							//背景容器层 - 框架贴图 透明度
		this._drill_skinBackground.opacity = this._drill_skin_opacity;	//背景容器层 - 背景图片 透明度
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;	//（帧刷新中会自动建立黑色画布）
	}
	
	
	// > 窗口皮肤 - 层级排序
	this._drill_skinBackground.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	if( this._windowSpriteContainer.children != undefined ){
		this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	}
}
//==============================
// * D窗口皮肤 - 帧刷新
//==============================
Drill_MPFS_Window.prototype.drill_updateSkin = function() {
	
	if( this._drill_skin_type == "自定义背景图片" || this._drill_skin_type == "图片窗口布局" ){
		
		// > 高宽改变锁
		if( this._drill_skinBackground_width  == this._drill_width &&
			this._drill_skinBackground_height == this._drill_height ){
			return;
		}
		this._drill_skinBackground_width = this._drill_width;
		this._drill_skinBackground_height = this._drill_height;
		
		// > 背景图片与中心锚点
		var xx = this._drill_skin_pic_x;
		var yy = this._drill_skin_pic_y;
		xx += this._drill_width * this._drill_anchor_x;
		yy += this._drill_height * this._drill_anchor_y;
		this._drill_skinBackground.x = xx;
		this._drill_skinBackground.y = yy;
		this._drill_skinBackground.anchor.x = this._drill_anchor_x;
		this._drill_skinBackground.anchor.y = this._drill_anchor_y;
	}
	
	if( this._drill_skin_type == "黑底背景" || this._drill_skin_type == "黑底布局" ){
		
		// > 高宽改变锁
		if( this._drill_skinBackground_width  == this._drill_width &&
			this._drill_skinBackground_height == this._drill_height ){
			return;
		}
		this._drill_skinBackground_width = this._drill_width;
		this._drill_skinBackground_height = this._drill_height;
		
		// > 改变时新建黑色画布
		this._drill_skinBackground_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_skinBackground_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");
		this._drill_skinBackground.bitmap = this._drill_skinBackground_BlackBitmap;
	}
}
//==============================
// * D窗口皮肤 - 帧刷新色调
//
//			说明：	setTone可以反复调用赋值，有变化监听的锁。
//==============================
var _drill_MPFS_updateTone = Drill_MPFS_Window.prototype.updateTone;
Drill_MPFS_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_MPFS_updateTone.call( this );
}
	
	
//==============================
// * E窗口内容 - 初始化
//==============================
Drill_MPFS_Window.prototype.drill_initMessage = function() {
	
	// > 标记初始化
	this._drill_lastStateList = [];			//状态标记
	this._drill_lastStateTypeList = [];		//状态类型标记
	this._drill_lastBuffList = [];			//buff标记
	
	// > 绘制初始内容
	this._drill_text_default = DrillUp.g_MPFS_default_text;
	this._drill_text_default = this._drill_text_default.substring(1,this._drill_text_default.length-1);
	this.drill_COWA_drawTextEx( this._drill_text_default, {"x":0,"y":0} );
}
//==============================
// * E窗口内容 - 重设数据
//==============================
Drill_MPFS_Window.prototype.drill_resetData_Message = function( data ){
	
	// > 标记初始化
	this._drill_lastStateList = [];			//状态标记
	this._drill_lastStateTypeList = [];		//状态类型标记
	this._drill_lastBuffList = [];			//buff标记
	
	// > 帧刷新一次
	this.drill_updateMessage();
}
//==============================
// * E窗口内容 - 消息只提示一次
//==============================
DrillUp.g_MPFS_buffMessageNotFind = true;
//==============================
// * E窗口内容 - 帧刷新
//==============================
Drill_MPFS_Window.prototype.drill_updateMessage = function(){
	if( this._drill_curBean == null ){ return; }
	
	// > 变化判定
	var bean = this._drill_curBean;
	if( this.drill_isStateAndBuffChanged( bean['_drill_state_list'], bean['_drill_buff_list'] ) == false ){ return; }
	
	// > 赋值 - 传指针
	//		（由于是数组对象，js会默认传指针，相同的指针相互比较的结果永远是相等。）
	//this._drill_lastStateList = bean['_drill_state_list'];
	//this._drill_lastBuffList = bean['_drill_buff_list'];
	
	// > 赋值 - 依次赋值
	this._drill_lastStateList = [];
	this._drill_lastBuffList = [];
	this._drill_lastStateTypeList = [];
	for(var i=0; i < bean['_drill_state_list'].length; i++ ){
		
		// > 赋值 - 状态的id
		this._drill_lastStateList[i] = bean['_drill_state_list'][i];
		
		// > 赋值 - 状态的类型（模糊说明/详细说明）
		var index = bean['_drill_state_list'][i]-1;
		var enabled = $gameSystem._drill_MPFS_enables[index];
		this._drill_lastStateTypeList[i] = enabled;
	}
	for(var i=0; i < bean['_drill_buff_list'].length; i++ ){
		
		// > 赋值 - buff的id
		this._drill_lastBuffList[i] = bean['_drill_buff_list'][i];
	}
	
	
	// > 内容 - 状态的
	var context_list = [];
	for(var i=0; i < bean['_drill_state_list'].length; i++ ){
		var index = bean['_drill_state_list'][i]-1;
		var icon_index = $dataStates[ index+1 ].iconIndex;
		var enabled = $gameSystem._drill_MPFS_enables[index];
		if( enabled ){
			var temp_str = $gameSystem._drill_MPFS_x_context[index];		//详细说明
			if( temp_str && temp_str.length != 0 ){
				temp_str =  temp_str.replace("<当前图标>","\\i["+icon_index+"]");
				context_list.push(temp_str);
			}
		}else{
			var temp_str = $gameSystem._drill_MPFS_m_context[index];		//模糊说明
			if( temp_str && temp_str.length != 0 ){
				temp_str =  temp_str.replace("<当前图标>","\\i["+icon_index+"]");
				context_list.push(temp_str);
			}
		}
	}
	// > 内容 - buff的
	for( var i=0; i< bean['_drill_buff_list'].length; i++ ){
		var level = bean['_drill_buff_list'][i];
		if( level > 0 ){		//强化buff
			var icon_index = this.buffIconIndex( level, i );
			var temp_str = DrillUp.g_MPFS_buff[i][ level-1 ];
			if( temp_str && temp_str.length != 0 ){
				temp_str = temp_str.replace("<当前图标>","\\i["+icon_index+"]");
				context_list.push( temp_str );
			}else{
				if( DrillUp.g_MPFS_buffMessageNotFind == true ){
					DrillUp.g_MPFS_buffMessageNotFind = false;
					alert( DrillUp.drill_MPFS_getPluginTip_BuffNotFind("强化Buff",level) );
				}
			}
		}
		if( level < 0 ){		//弱化buff
			var icon_index = this.buffIconIndex( level, i );
			var temp_str = DrillUp.g_MPFS_debuff[i][ Math.abs(level)-1 ];
			if( temp_str && temp_str.length != 0 ){
				temp_str = temp_str.replace("<当前图标>","\\i["+icon_index+"]");
				context_list.push( temp_str );
			}else{
				if( DrillUp.g_MPFS_buffMessageNotFind == true ){
					DrillUp.g_MPFS_buffMessageNotFind = false;
					alert( DrillUp.drill_MPFS_getPluginTip_BuffNotFind("弱化Buff",Math.abs(level)) );
				}
			}
		}
	}
	
	// > 内容 - 没有时
	if( context_list.length == 0 ){
		if( DrillUp.g_MPFS_default_enable == true ){
			context_list.push( this._drill_text_default );
		}
	}
	
	// > 刷新内容
	this.drill_refreshMessage( context_list );
	this._drill_showDelay = 1;	//（延迟1帧再显示，防止看到内容和高宽的变化）
}
//==============================
// * E窗口内容 - 获取 指定阶段的buff图标（索引号）
//
//			说明：	> 此函数复刻自 Game_BattlerBase.prototype.buffIconIndex 。
//==============================
Drill_MPFS_Window.prototype.buffIconIndex = function( buffLevel, paramId ){
    if( buffLevel > 0 ){
        return Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
    }else if( buffLevel < 0 ){
        return Game_BattlerBase.ICON_DEBUFF_START + (-buffLevel - 1) * 8 + paramId;
    }else{
        return 0;
    }
};
//==============================
// * E窗口内容 - 判断状态与buff变化
//==============================
Drill_MPFS_Window.prototype.drill_isStateAndBuffChanged = function( state_ids, buff_ids ){
	if( this._drill_lastStateList.length != state_ids.length ){ return true; }
	if( this._drill_lastBuffList.length != buff_ids.length ){ return true; }
	
	// > 状态判定
	for( var i=0; i < state_ids.length; i++ ){
		if( this._drill_lastStateList[i] != state_ids[i] ){
			return true;
		}
		
		// > 状态的类型判定（模糊说明/详细说明）
		var index = state_ids[i]-1;
		var enabled = $gameSystem._drill_MPFS_enables[index];
		if( this._drill_lastStateTypeList[i] != enabled ){
			return true;
		}
	}
	
	// > buff判定
	for( var i=0; i < buff_ids.length; i++ ){
		if( this._drill_lastBuffList[i] != buff_ids[i] ){
			return true;
		}
	}
	
	return false;
}
//==============================
// * E窗口内容 - 刷新内容
//==============================
Drill_MPFS_Window.prototype.drill_refreshMessage = function( context_list ){
	if( context_list.length == 0 ){ return; }
	
	
	// > 窗口高宽 - 计算
	var options = {};
	options['autoLineheight'] = true;
	this.drill_COWA_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
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
}


	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MiniPlateForState = false;
		var pluginTip = DrillUp.drill_MPFS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

