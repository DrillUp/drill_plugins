//=============================================================================
// Drill_X_SceneShopDiscount.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        控件 - 商店节假日的折扣[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "折扣-%d"
 * @Drill_LE_parentKey "---折扣%d至%d---"
 * @Drill_LE_var "DrillUp.g_XSSD_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_X_SceneShopDiscount +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置特定的时间段，游戏内的商店的折扣功能。
 * ★★必须放在所有"作用于"的插件后面，否则没有扩展效果★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 插件只对指定插件扩展，如果没有使用目标插件，则该插件没有任何效果。
 * 基于：
 *   - Drill_CoreOfInput             系统-输入设备核心
 *   - Drill_CoreOfWindowAuxiliary   系统-窗口辅助核心
 * 可作用于：
 *   - Drill_SceneShop               面板-全自定义商店界面
 *     可以使得该插件具有折扣设置功能。
 *   - Drill_SceneLimitedShop        面板-限量商店
 *     可以使得该插件具有折扣设置功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   专门装饰 全自定义商店 和 限量商店。
 * 结构：
 *   (1.插件的贴图结构为：1个折扣标识 + 1个折扣背景光圈 + 1个鼠标悬浮信息框。
 *      在折扣激活时，商店会显示折扣标志，并且所有商品会享折扣。
 *   (2.鼠标或者触屏接近 折扣贴图 时，会自动显示信息框。
 * 倍率：
 *   (1.如果你配置了多个优惠情况，而这些优惠在商店里都满足了，那么最终的价格
 *      将是 累乘 的结果，比如 优惠0.8 再优惠0.6，那么累乘后得到 0.48 的倍率。
 *   (2.优惠效果还能 与商店原购买倍率 继续叠加。
 * 折扣信息框：
 *   (1.折扣信息框 的具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 * 设计：
 *   (1.有些折扣图标可以直接隐藏，在折扣激活时才显示。比如每周六才打折。
 *   (2.你可以设置大于1的折扣倍率，可以理解为"商品涨价日"活动。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/system
 * 资源路径：img/Menu__shopDiscount （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有system文件夹。
 * 先确保项目img文件夹下是否有Menu__shopDiscount文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 资源-自定义窗口皮肤     （system文件夹）
 * 资源-自定义背景图片     （Menu__shopDiscount文件夹）
 * 
 * 折扣-1 资源-折扣标识        （Menu__shopDiscount文件夹）
 * 折扣-1 资源-未激活折扣图像  （Menu__shopDiscount文件夹）
 * 折扣-1 资源-折扣背景光圈    （Menu__shopDiscount文件夹）
 * 折扣-2 资源-折扣标识        （Menu__shopDiscount文件夹）
 * 折扣-2 资源-未激活折扣图像  （Menu__shopDiscount文件夹）
 * 折扣-2 资源-折扣背景光圈    （Menu__shopDiscount文件夹）
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以在游戏中临时控制折扣设置。
 * 
 * 插件指令：>商店节假日的折扣 : 折扣[1] : 应用到全自定义商店界面 : 开启
 * 插件指令：>商店节假日的折扣 : 折扣[1] : 应用到全自定义商店界面 : 关闭
 * 插件指令：>商店节假日的折扣 : 折扣[1] : 应用到限量商店界面 : 开启
 * 插件指令：>商店节假日的折扣 : 折扣[1] : 应用到限量商店界面 : 关闭
 * 插件指令：>商店节假日的折扣 : 折扣[1] : 修改指定限量商店可用 : 限量商店[1,3,4]
 * 
 * 1.插件指令修改后永久有效。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   进入商店面板或限量商店面板进行测试。
 * 测试结果：   在菜单界面中，消耗为：【6.35ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于在商店界面中固定只放两个贴图和一个窗口，所以消耗并不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了使用 自定义单图背景 模式时，切换折扣样式造成错误叠加的bug。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * [v1.3]
 * 优化了窗口结构。
 * [v1.4]
 * 修复了使用自定义窗口皮肤时文字变黑的bug。
 * 
 * 
 * 
 * @param ---折扣信息框---
 * @default 
 *
 * @param 激活方式
 * @parent ---折扣信息框---
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
 * @desc 鼠标接近指定的折扣贴图时，面板会被激活。你也可以设置按键持续按下才显示。
 * @default 鼠标接近
 *
 * @param 偏移-折扣信息框 X
 * @parent ---折扣信息框---
 * @desc 以鼠标/触屏的点位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-折扣信息框 Y
 * @parent ---折扣信息框---
 * @desc 以鼠标/触屏的点位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 信息框布局
 * @parent ---折扣信息框---
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
 * @default 默认窗口皮肤
 *
 * @param 布局透明度
 * @parent 信息框布局
 * @type number
 * @min 0
 * @max 255
 * @desc 布局的透明度，0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 资源-自定义窗口皮肤
 * @parent 信息框布局
 * @desc 配置该资源，可以使得该窗口有与默认不同的系统窗口。
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 资源-自定义背景图片
 * @parent 信息框布局
 * @desc 自定义背景图片布局的资源。
 * @default 
 * @require 1
 * @dir img/Menu__shopDiscount/
 * @type file
 *
 * @param 平移-自定义背景图片 X
 * @parent 信息框布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-自定义背景图片 Y
 * @parent 信息框布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 是否锁定窗口位置
 * @parent ---折扣信息框---
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
 * @parent ---折扣信息框---
 * @type number
 * @min 0
 * @desc 窗口内容之间的行间距。（默认标准：36）
 * @default 10
 *
 * @param 窗口内边距
 * @parent ---折扣信息框---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---折扣信息框---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent ---折扣信息框---
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 * 
 * @param 窗口附加高度
 * @parent ---折扣信息框---
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
 *
 * @param 窗口菜单层级
 * @parent ---折扣信息框---
 * @type select
 * @option 菜单后面层
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 窗口所属的菜单层级。
 * @default 菜单前面层
 *
 * @param 窗口图片层级
 * @parent ---折扣信息框---
 * @type number
 * @min 0
 * @desc 窗口在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 20
 *
 *
 * @param ---折扣组 1至20---
 * @default
 *
 * @param 折扣-1
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-2
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-3
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-4
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-5
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-6
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-7
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-8
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-9
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-10
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-11
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-12
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-13
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-14
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-15
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-16
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-17
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-18
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-19
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 * @param 折扣-20
 * @parent ---折扣组 1至20---
 * @type struct<DrillShopDiscount>
 * @desc 折扣的详细配置信息。
 * @default 
 *
 */
/*~struct~DrillShopDiscount:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的折扣设置==
 *
 * @param --作用域--
 * @default 
 *
 * @param 是否应用到全自定义商店界面
 * @parent --作用域--
 * @type boolean
 * @on 应用
 * @off 关闭
 * @desc true - 应用，false - 关闭
 * @default true
 *
 * @param 是否应用到限量商店界面
 * @parent --作用域--
 * @type boolean
 * @on 应用
 * @off 关闭
 * @desc true - 应用，false - 关闭
 * @default true
 *
 * @param 是否所有限量商店含折扣
 * @parent 是否应用到限量商店界面
 * @type boolean
 * @on 全部折扣
 * @off 只部分含折扣
 * @desc true - 全部折扣，false - 只部分含折扣
 * @default false
 *
 * @param 指定限量商店含折扣
 * @parent 是否应用到限量商店界面
 * @type number[]
 * @min 1
 * @desc 如果你选择了"只部分含折扣"，这里填可以进行折扣的限量商店id。
 * @default ["1","2","3"]
 * 
 * @param --触发时机--
 * @default 
 *
 * @param 触发时间-类型
 * @parent --触发时机--
 * @type select
 * @option 真实时间
 * @value 真实时间
 * @option 游戏世界时间
 * @value 游戏世界时间
 * @desc 触发基于的时间类型。
 * @default 真实时间
 *
 * @param 触发时间-规定星期
 * @parent --触发时机--
 * @type select
 * @option 星期一
 * @value 星期一
 * @option 星期二
 * @value 星期二
 * @option 星期三
 * @value 星期三
 * @option 星期四
 * @value 星期四
 * @option 星期五
 * @value 星期五
 * @option 星期六
 * @value 星期六
 * @option 星期天
 * @value 星期天
 * @option 不限
 * @value 不限
 * @desc 时间必须满足 所有触发时间，才会激活折扣。
 * @default 星期六
 *
 * @param 触发时间-规定年
 * @parent --触发时机--
 * @type select
 * @option 设置
 * @value 设置
 * @option 不限
 * @value 不限
 * @desc 时间必须满足 所有触发时间，才会激活折扣。
 * @default 不限
 *
 * @param 规定年份
 * @parent 触发时间-规定年
 * @type number
 * @min 0
 * @desc 触发时间所指定的年份。
 * @default 2021
 *
 * @param 触发时间-规定月
 * @parent --触发时机--
 * @type select
 * @option 设置
 * @value 设置
 * @option 不限
 * @value 不限
 * @desc 时间必须满足 所有触发时间，才会激活折扣。
 * @default 不限
 *
 * @param 规定月份
 * @parent 触发时间-规定月
 * @type number
 * @min 1
 * @max 12
 * @desc 触发时间所指定的月份。
 * @default 1
 *
 * @param 触发时间-规定日
 * @parent --触发时机--
 * @type select
 * @option 设置
 * @value 设置
 * @option 不限
 * @value 不限
 * @desc 时间必须满足 所有触发时间，才会激活折扣。
 * @default 不限
 *
 * @param 规定日
 * @parent 触发时间-规定日
 * @type number
 * @min 1
 * @max 31
 * @desc 触发时间所指定的日期的天数。
 * @default 1
 * 
 * @param 是否添加开关条件
 * @parent --触发时机--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-开关
 * @parent 是否添加开关条件
 * @type switch
 * @desc 指定开关的值为 on开 时，即可满足条件。
 * @default 0
 * 
 * @param 是否添加开关2条件
 * @parent --触发时机--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-开关2
 * @parent 是否添加开关2条件
 * @type switch
 * @desc 指定开关的值为 on开 时，即可满足条件。
 * @default 0
 * 
 * @param 是否添加变量条件
 * @parent --触发时机--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-变量
 * @parent 是否添加变量条件
 * @type variable
 * @desc 指定开关的值为 on开 时，即可满足条件。
 * @default 0
 *
 * @param 条件-变量比较符
 * @parent 是否添加变量条件
 * @type select
 * @option 大于等于
 * @value 大于等于
 * @option 小于等于
 * @value 小于等于
 * @option 大于
 * @value 大于
 * @option 小于
 * @value 小于
 * @option 等于
 * @value 等于
 * @desc 变量条件的比较符。
 * @default 大于等于
 *
 * @param 条件-比较值
 * @parent 是否添加变量条件
 * @desc 如果比较符为"大于"，比较值为10，那么表示 变量>10 时满足。
 * @default 10
 * 
 * @param --折扣--
 * @default 
 *
 * @param 折扣倍率
 * @parent --折扣--
 * @desc 从商店购买物品价格的倍率，此倍率能与商店的默认倍率叠加。
 * @default 0.800
 * 
 * @param 折扣文本信息
 * @parent --折扣--
 * @type note
 * @desc 鼠标接近折扣图标后，显示的文本框中的信息。
 * @default "商店在特殊的情况下，有优惠哦！"
 * 
 * @param --折扣标识--
 * @default 
 *
 * @param 资源-折扣标识
 * @parent --折扣标识--
 * @desc 商店折扣激活时，显示的标识图像。
 * @default 商店折扣-默认图像
 * @require 1
 * @dir img/Menu__shopDiscount/
 * @type file
 * 
 * @param 资源-未激活折扣图像
 * @parent --折扣标识--
 * @desc 信息面板的整体布局。
 * @default 商店折扣-未激活图像
 * @require 1
 * @dir img/Menu__shopDiscount/
 * @type file
 *
 * @param 平移-折扣标识 X
 * @parent --折扣标识--
 * @desc x轴方向平移，单位像素。0为贴最左边。
 * @default 550
 *
 * @param 平移-折扣标识 Y
 * @parent --折扣标识--
 * @desc y轴方向平移，单位像素。0为贴最上面。
 * @default 32
 * 
 * @param 资源-折扣背景光圈
 * @parent --折扣标识--
 * @desc 信息面板的整体布局。
 * @default 商店折扣-背景光圈
 * @require 1
 * @dir img/Menu__shopDiscount/
 * @type file
 *
 * @param 背景光圈旋转速度
 * @parent --折扣标识--
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 1.50
 *
 * @param 菜单层级
 * @parent --折扣标识--
 * @type select
 * @option 菜单后面层
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 折扣标识所属的菜单层级。
 * @default 菜单前面层
 *
 * @param 图片层级
 * @parent --折扣标识--
 * @type number
 * @min 0
 * @desc 折扣标识在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 4
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XSSD（X_Scene_Shop_Discount）
//		临时全局变量	DrillUp.g_XSSD_xxx
//		临时局部变量	this._drill_XSSD_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	商店界面
//		★性能测试消耗	6.35ms（drill_updateChecks函数） 5.08ms（Drill_XSSD_Window.prototype.update函数）
//		★最坏情况		无
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
//			->☆预加载
//			->☆存储数据
//			->☆菜单层级
//			
//			->☆贴图创建标记
//				->全自定义商店 帧刷新
//			->☆贴图控制
//				->数据容器
//				->创建
//					->折扣标识
//						->无折扣时的图章
//						->有折扣时的图章
//					->折扣条件
//						->时间条件
//						->开关条件
//						->变量条件
//				->帧刷新
//					->刷新图标鼠标监听
//			->☆折扣倍率
//				->商店界面 折扣
//				->限量商店界面 折扣
//			
//			->折扣信息框【Drill_XSSD_Window】
//				->A主体
//				->B位置跟随
//				->C窗口皮肤
//				->D窗口内容
//		
//		
//		★家谱：
//			无
//		
//		★脚本文档：
//			14.鼠标 > 关于鼠标悬浮窗口（脚本）.docx
//		
//		★插件私有类：
//			* 折扣信息框【Drill_XSSD_Window】
//		
//		★必要注意事项：
//			1.鼠标悬浮窗口目前已经固定了一套框架，你可以找到其他的 MiniPlateXXX 插件，看看私有类的定义。
//			  通过 drill_pushChecks 判定项 帧刷新，来控制面板显示的内容。
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
	DrillUp.g_XSSD_PluginTip_curName = "Drill_X_SceneShopDiscount.js 控件-商店节假日的折扣[扩展]";
	DrillUp.g_XSSD_PluginTip_baseList = [
		"Drill_CoreOfInput.js 系统-输入设备核心",
		"Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_XSSD_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_XSSD_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_XSSD_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_XSSD_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_XSSD_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_XSSD_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_XSSD_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_SceneShopDiscount = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_SceneShopDiscount');
	
	
	//==============================
	// * 静态数据 - 折扣设置
	//				（~struct~DrillShopDiscount）
	//==============================
	DrillUp.drill_XSSD_initShopDiscount = function( dataFrom ) {
		var data = {};
		
		// > 作用域
		data['shopEnabled'] = String( dataFrom["是否应用到全自定义商店界面"] || "true") == "true";
		data['limitShopEnabled'] = String( dataFrom["是否应用到限量商店界面"] || "true") == "true";
		data['limitShopAllDiscount'] = String( dataFrom["是否所有限量商店含折扣"] || "false") == "true";
		if( dataFrom["指定限量商店含折扣"] != "" &&
			dataFrom["指定限量商店含折扣"] != undefined ){
			data['limitShopIdList'] = JSON.parse( dataFrom["指定限量商店含折扣"] );
		}else{
			data['limitShopIdList'] = [];
		}
		
		// > 触发时机
		data['condition_type'] = String( dataFrom["触发时间-类型"] || "真实时间");
		data['condition_week'] = String( dataFrom["触发时间-规定星期"] || "不限");
		data['condition_yearEnabled'] = String( dataFrom["触发时间-规定年"] || "不限");
		data['condition_year'] = Number( dataFrom["规定年份"] || 0);
		data['condition_monthEnabled'] = String( dataFrom["触发时间-规定月"] || "不限");
		data['condition_month'] = Number( dataFrom["规定月份"] || 0);
		data['condition_dayEnabled'] = String( dataFrom["触发时间-规定日"] || "不限");
		data['condition_day'] = Number( dataFrom["规定日"] || 0);
		data['condition_switchEnabled'] = String( dataFrom["是否添加开关条件"] || "false") == "true";
		data['condition_switch'] = Number( dataFrom["条件-开关"] || 0);
		data['condition_switch2Enabled'] = String( dataFrom["是否添加开关2条件"] || "false") == "true";
		data['condition_switch2'] = Number( dataFrom["条件-开关2"] || 0);
		data['condition_variableEnabled'] = String( dataFrom["是否添加变量条件"] || "false") == "true";
		data['condition_variable'] = Number( dataFrom["条件-变量"] || 0);
		data['condition_variableOp'] = String( dataFrom["条件-变量比较符"] || "大于等于");
		data['condition_variableOpValue'] = Number( dataFrom["条件-比较值"] || 0);
		
		// > 折扣
		data['discount'] = Number( dataFrom["折扣倍率"] || 0.8);
		
		// > 折扣标识
		data['src_img'] = String( dataFrom["资源-折扣标识"] || "");
		data['src_imgInactive'] = String( dataFrom["资源-未激活折扣图像"] || "");
		data['x'] = Number( dataFrom["平移-折扣标识 X"] || 0);
		data['y'] = Number( dataFrom["平移-折扣标识 Y"] || 0);
		data['src_circle'] = String( dataFrom["资源-折扣背景光圈"] || "");
		data['rotate'] = Number( dataFrom["背景光圈旋转速度"] || 1.5);
		data['menu_index'] = String( dataFrom["菜单层级"] || "菜单前面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		// > 折扣信息框
		if( dataFrom["折扣文本信息"] != "" &&
			dataFrom["折扣文本信息"] != undefined ){
			data['window_context'] = JSON.parse( dataFrom["折扣文本信息"] );
		}else{
			data['window_context'] = "";
		}
		
		return data;
	}

	/*-----------------折扣------------------*/
	DrillUp.g_XSSD_list_length = 20;
	DrillUp.g_XSSD_list = [];
	for (var i = 0; i < DrillUp.g_XSSD_list_length; i++) {
		if( DrillUp.parameters["折扣-" + String(i+1) ] != undefined &&
			DrillUp.parameters["折扣-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["折扣-" + String(i+1) ]);
			DrillUp.g_XSSD_list[i] = DrillUp.drill_XSSD_initShopDiscount( temp );
		}else{
			DrillUp.g_XSSD_list[i] = null;		//（强制设为空值，节约存储资源）
		}
	}
	
	/*-----------------折扣信息框------------------*/
	DrillUp.g_XSSD_mouse_type = String(DrillUp.parameters["激活方式"] || "鼠标接近");
	DrillUp.g_XSSD_x = Number(DrillUp.parameters["偏移-折扣信息框 X"] || 0 );
	DrillUp.g_XSSD_y = Number(DrillUp.parameters["偏移-折扣信息框 Y"] || 0);
	DrillUp.g_XSSD_layout_type = String(DrillUp.parameters["信息框布局"] || "默认窗口皮肤");
	DrillUp.g_XSSD_layout_opacity = Number(DrillUp.parameters["布局透明度"] || 255);
	DrillUp.g_XSSD_layout_sys_src = String(DrillUp.parameters["资源-自定义窗口皮肤"] );
	DrillUp.g_XSSD_layout_pic_src = String(DrillUp.parameters["资源-自定义背景图片"] );
	DrillUp.g_XSSD_layout_pic_x = Number(DrillUp.parameters["平移-自定义背景图片 X"] );
	DrillUp.g_XSSD_layout_pic_y = Number(DrillUp.parameters["平移-自定义背景图片 Y"] );
	DrillUp.g_XSSD_lock_enable = String(DrillUp.parameters["是否锁定窗口位置"] || "false") === "true";
	DrillUp.g_XSSD_lock_x = Number(DrillUp.parameters["平移-锁定位置 X"] || 0);
	DrillUp.g_XSSD_lock_y = Number(DrillUp.parameters["平移-锁定位置 Y"] || 0);
	DrillUp.g_XSSD_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_XSSD_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_XSSD_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_XSSD_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_XSSD_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	DrillUp.g_XSSD_layer = String(DrillUp.parameters["窗口菜单层级"] || "菜单前面层");
	DrillUp.g_XSSD_zIndex = Number(DrillUp.parameters["窗口图片层级"] || 20);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_XSSD_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XSSD_pluginCommand.call(this, command, args);
	if( command === ">商店节假日的折扣" ){
		
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			
			if( temp1.indexOf("折扣[") != -1 ){
				temp1 = temp1.replace("折扣[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				
				if( type == "应用到全自定义商店界面" ){
					if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
						var data = $gameSystem._drill_XSSD_list[ temp1 ];
						if( data == undefined ){ return; }
						data['shopEnabled'] = true;
					}
					if( temp2 == "关闭" || temp2 == "禁用" ){
						var data = $gameSystem._drill_XSSD_list[ temp1 ];
						if( data == undefined ){ return; }
						data['shopEnabled'] = false;
					}
				}
				if( type == "应用到限量商店界面" ){
					if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
						var data = $gameSystem._drill_XSSD_list[ temp1 ];
						if( data == undefined ){ return; }
						data['limitShopEnabled'] = true;
					}
					if( temp2 == "关闭" || temp2 == "禁用" ){
						var data = $gameSystem._drill_XSSD_list[ temp1 ];
						if( data == undefined ){ return; }
						data['limitShopEnabled'] = false;
					}
				}
				if( type == "修改指定限量商店可用" && temp2.indexOf("限量商店[") != -1 ){
					temp2 = temp2.replace("限量商店[","");
					temp2 = temp2.replace("]","");
					temp2 = temp2.split(",");	//（直接按字符串输入）
					var data = $gameSystem._drill_XSSD_list[ temp1 ];
					if( data == undefined ){ return; }
					data['limitShopAllDiscount'] = false;
					data['limitShopIdList'] = temp2;
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
var _drill_XSSD_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_XSSD_preload_initialize.call(this);
	this.drill_XSSD_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_XSSD_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_XSSD_preloadInit = function() {
	this._drill_XSSD_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_XSSD_preloadTank = [];						//bitmap容器
	
	// > 『窗口皮肤的预加载』
	if( DrillUp.g_XSSD_layout_type == "自定义窗口皮肤" ){
		this._drill_XSSD_preloadTank.push( 
			ImageManager.reserveBitmap( "img/system/", DrillUp.g_XSSD_layout_sys_src, 0, true, this._drill_XSSD_cacheId ) 
		);
	}
	if( DrillUp.g_XSSD_layout_type == "自定义背景图片" ){
		this._drill_XSSD_preloadTank.push( 
			ImageManager.reserveBitmap( "img/Menu__shopDiscount/", DrillUp.g_XSSD_layout_pic_src, 0, true, this._drill_XSSD_cacheId ) 
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
DrillUp.g_XSSD_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XSSD_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_XSSD_sys_initialize.call(this);
	this.drill_XSSD_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XSSD_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_XSSD_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_XSSD_saveEnabled == true ){	
		$gameSystem.drill_XSSD_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_XSSD_initSysData();
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
Game_System.prototype.drill_XSSD_initSysData = function() {
	this.drill_XSSD_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_XSSD_checkSysData = function() {
	this.drill_XSSD_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_XSSD_initSysData_Private = function() {
	
	this._drill_XSSD_list = [];
	for( var i=0; i < DrillUp.g_XSSD_list.length; i++ ){
		var temp_data = DrillUp.g_XSSD_list[i];	
		if( temp_data == undefined ){ continue; }	//（空数据不存）
		this._drill_XSSD_list[i] = JSON.parse(JSON.stringify( temp_data ));
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_XSSD_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_XSSD_list == undefined ){
		this.drill_XSSD_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_XSSD_list.length; i++ ){
		var temp_data = DrillUp.g_XSSD_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_XSSD_list[i] == undefined ){
				this._drill_XSSD_list[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】菜单层级 ☆菜单层级
//#############################################################################
//##############################
// * 菜单层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_MenuBase.prototype.drill_XSSD_layerAddSprite = function( sprite, layer_index ){
    this.drill_XSSD_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从菜单层级中移除。
//##############################
Scene_MenuBase.prototype.drill_XSSD_layerRemoveSprite = function( sprite ){
	this.drill_XSSD_layerRemoveSprite_Private( sprite );
};
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，菜单层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_XSSD_sortByZIndex = function () {
    this.drill_XSSD_sortByZIndex_Private();
};
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_XSSD_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_XSSD_menuLayer_update.call(this);
	
	if(!this._backgroundSprite ){		//菜单后面层（防止覆写报错）
		this._backgroundSprite = new Sprite();
	}
	if(!this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
};
//==============================
// * 菜单层级 - 参数定义
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
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_XSSD_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 去除贴图（私有）
//==============================
Scene_MenuBase.prototype.drill_XSSD_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//
//			说明：	> 此处兼容了 战斗界面、地图界面 的层级名词。
//==============================
Scene_MenuBase.prototype.drill_XSSD_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === 0 || 
		layer_index == "下层" || layer_index == "中层" || layer_index == "上层"){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === 1 || 
		layer_index == "图片层" || layer_index == "最顶层" ){
		this._foregroundSprite.addChild( sprite );
	}
};



//=============================================================================
// ** ☆贴图创建标记
//			
//			说明：	> 此模块专门对 菜单面板 进行 创建标记，确保只创建一次。
//					  注意，该功能在所有菜单面板中都会执行。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图创建标记 - 初始化
//==============================
var _drill_XSSD_initialize = Scene_MenuBase.prototype.initialize;
Scene_MenuBase.prototype.initialize = function() {
	_drill_XSSD_initialize.call(this);
   	this._drill_XSSD_spriteTank = [];
   	this._drill_XSSD_spriteBackTank = [];
	SceneManager._drill_XSSD_created = false;
}
//==============================
// * 贴图创建标记 - 退出界面
//==============================
var _drill_XSSD_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_XSSD_terminate.call(this);			//（下次进入界面需重新创建）
	SceneManager._drill_XSSD_created = false;
};
//==============================
// * 贴图创建标记 - 帧刷新
//==============================
var _drill_XSSD_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_XSSD_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_XSSD_created != true ){
		this.drill_XSSD_create();		
	}
	
	// > 帧刷新
	if( SceneManager._drill_XSSD_created == true ){
		this.drill_XSSD_update();
	}
};
//==============================
// * 贴图创建标记 - 全自定义商店 - 帧刷新
//				
//			说明：	> 注意，由于 Scene_Shop商店场景 的 update函数 并没有被明确定义成函数，
//					  因此 该插件后继承 Scene_MenuBase 的帧刷新函数，不会被 商店场景 的帧刷新执行到。
//==============================
var _drill_XSSD_shop_update = Scene_Shop.prototype.update;
Scene_Shop.prototype.update = function() {
	_drill_XSSD_shop_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_XSSD_created != true ){
		this.drill_XSSD_create();		
	}
	
	// > 帧刷新
	if( SceneManager._drill_XSSD_created == true ){
		this.drill_XSSD_update();
	}
};


//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门对 贴图 进行 创建、帧刷新、数据绑定。不考虑销毁情况。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 数据容器 - 初始化
//==============================
var _drill_XSSD_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_XSSD_temp_initialize.call(this);
	this._drill_XSSD_dataTank = [];			//临时折扣数据容器（菜单界面用）
};
//==============================
// * 贴图控制 - 数据容器 - 面板初始化
//
//			说明：	> 进入到面板时，将折扣数据进行一次赋值。
//==============================
var _drill_XSSD_initialize2 = Scene_MenuBase.prototype.initialize;
Scene_MenuBase.prototype.initialize = function() {
	_drill_XSSD_initialize2.call(this);
	
	// > 折扣数据初始化
	$gameTemp._drill_XSSD_dataTank = [];
	for( var i = 0; i < $gameSystem._drill_XSSD_list.length; i++ ){
		var temp_data = $gameSystem._drill_XSSD_list[i];
		if( temp_data == undefined ){ continue; }
		if( this.drill_XSSD_isEnableDiscount( temp_data ) != true ){ continue; }
		
		$gameTemp._drill_XSSD_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
		//（未通过的数据，容器中都为null值）
	};
};
//==============================
// * 贴图控制 - 数据容器 - 判断折扣是否可用
//==============================
Scene_MenuBase.prototype.drill_XSSD_isEnableDiscount = function( data ){
	
	// > 全自定义商店
	if( Imported.Drill_SceneShop && this instanceof Scene_Shop ){
		if( data['shopEnabled'] == true ){
			return true;
		}
	}
	// > 限量商店
	if( Imported.Drill_SceneLimitedShop && this instanceof Scene_Drill_SLS ){
		var shop_index = $gameSystem._drill_SLS_shopIndex;
		if( data['limitShopEnabled'] == true ){
			if( data['limitShopAllDiscount'] == true ){
				return true;
			}
			if( data['limitShopIdList'].contains( String(shop_index+1) ) ){ 	//（注意 索引+1）
				return true;
			}
		}	
	}
	return false;
};
//==============================
// * 贴图控制 - 创建
//==============================
Scene_MenuBase.prototype.drill_XSSD_create = function() {	
	SceneManager._drill_XSSD_created = true;
	
	if(!this._drill_XSSD_spriteTank){	//防止覆写报错 - 贴图初始化
		this._drill_XSSD_spriteTank = [];	
		this._drill_XSSD_spriteBackTank = [];	
	}
	
	// > 配置的折扣贴图
	for( var i = 0; i < $gameTemp._drill_XSSD_dataTank.length; i++ ){
		var temp_sprite_data = $gameTemp._drill_XSSD_dataTank[i];
		if( temp_sprite_data == undefined ){ continue; }
			
		// > 折扣贴图
		var temp_sprite = new Sprite();
		temp_sprite.visible = false;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.x = temp_sprite_data['x'];
		temp_sprite.y = temp_sprite_data['y'];
		temp_sprite.zIndex = temp_sprite_data['zIndex'];
		temp_sprite['data_ptr'] = temp_sprite_data;		//（暂存贴图指向的数据）
		var temp_sprite_back = new Sprite();
		temp_sprite_back.visible = false;
		temp_sprite_back.bitmap = ImageManager.loadBitmap( "img/Menu__shopDiscount/", temp_sprite_data['src_circle'], 0, true );
		temp_sprite_back.anchor.x = 0.5;
		temp_sprite_back.anchor.y = 0.5;
		temp_sprite_back.x = temp_sprite_data['x'];
		temp_sprite_back.y = temp_sprite_data['y'];
		temp_sprite_back.zIndex = temp_sprite_data['zIndex'];
		
		// > 折扣条件设置
		var is_fit = this.drill_XSSD_isDiscountFit( temp_sprite_data );
		temp_sprite_data['is_fit'] = is_fit;		//满足情况标记
		if( is_fit ){
			temp_sprite.visible = true;
			temp_sprite_back.visible = true;
			temp_sprite.bitmap = ImageManager.loadBitmap( "img/Menu__shopDiscount/", temp_sprite_data['src_img'], 0, true );
		}else{
			temp_sprite.visible = true;
			temp_sprite_back.visible = false;
			temp_sprite.bitmap = ImageManager.loadBitmap( "img/Menu__shopDiscount/", temp_sprite_data['src_imgInactive'], 0, true );
		}
		
		// > 添加到图层
		this._drill_XSSD_spriteTank.push(temp_sprite);
		this._drill_XSSD_spriteBackTank.push(temp_sprite_back);
		this.drill_XSSD_layerAddSprite( temp_sprite, temp_sprite_data['menu_index'] );
		this.drill_XSSD_layerAddSprite( temp_sprite_back, temp_sprite_data['menu_index'] );
	}
	
	// > 配置的折扣信息框（只有一个）
	if(!this._drill_XSSD_window ){
		this._drill_XSSD_window = new Drill_XSSD_Window();
		
		this._drill_XSSD_window.zIndex = DrillUp.g_XSSD_zIndex;
		this.drill_XSSD_layerAddSprite( this._drill_XSSD_window, DrillUp.g_XSSD_layer );
	}
	
	this.drill_XSSD_sortByZIndex();
};
//==============================
// * 贴图控制 - 创建 - 折扣条件
//==============================
Scene_MenuBase.prototype.drill_XSSD_isDiscountFit = function( data ){
	
	// > 条件 - 时间条件
	if( data['condition_type'] == "真实时间" ){
		var date = new Date();
		if( data['condition_week'] == "星期一" && date.getDay() != 1 ){ return false; }
		if( data['condition_week'] == "星期二" && date.getDay() != 2 ){ return false; }
		if( data['condition_week'] == "星期三" && date.getDay() != 3 ){ return false; }
		if( data['condition_week'] == "星期四" && date.getDay() != 4 ){ return false; }
		if( data['condition_week'] == "星期五" && date.getDay() != 5 ){ return false; }
		if( data['condition_week'] == "星期六" && date.getDay() != 6 ){ return false; }
		if( data['condition_week'] == "星期天" && date.getDay() != 0 ){ return false; }
		if( data['condition_yearEnabled'] == true && date.getFullYear() != data['condition_year'] ){ return false; }
		if( data['condition_monthEnabled'] == true && date.getMonth() != data['condition_month']-1 ){ return false; }
		if( data['condition_dayEnabled'] == true && date.getDate() != data['condition_day'] ){ return false; }
	}
	if( data['condition_type'] == "游戏世界时间" ){
		if( Imported.MOG_TimeSystem != true ){ return false; }
		if( data['condition_week'] == "星期一" && $gameSystem.day_week() != 2 ){ return false; }
		if( data['condition_week'] == "星期二" && $gameSystem.day_week() != 3 ){ return false; }
		if( data['condition_week'] == "星期三" && $gameSystem.day_week() != 4 ){ return false; }
		if( data['condition_week'] == "星期四" && $gameSystem.day_week() != 5 ){ return false; }
		if( data['condition_week'] == "星期五" && $gameSystem.day_week() != 6 ){ return false; }
		if( data['condition_week'] == "星期六" && $gameSystem.day_week() != 7 ){ return false; }
		if( data['condition_week'] == "星期天" && $gameSystem.day_week() != 1 ){ return false; }
		if( data['condition_yearEnabled'] == true && $gameSystem.year() != data['condition_year'] ){ return false; }
		if( data['condition_monthEnabled'] == true && $gameSystem.month() != data['condition_month']-1 ){ return false; }
		if( data['condition_dayEnabled'] == true && $gameSystem.day() != data['condition_day'] ){ return false; }
	}
	
	// > 条件 - 开关条件
	if( data['condition_switchEnabled'] == true ){	
		if( $gameSwitches.value( data['condition_switch'] ) == true ){
			//（不操作）
		}else{
			return false; //（开了条件，却不满足时，跳过）
		}
	}
	if( data['condition_switch2Enabled'] == true ){	
		if( $gameSwitches.value( data['condition_switch2'] ) == true ){
			//（不操作）
		}else{
			return false; //（开了条件，却不满足时，跳过）
		}
	}
	
	// > 条件 - 变量条件
	if( data['condition_variableEnabled'] == true ){	
		if( data['condition_variableOp'] == "大于等于" ){
			if( $gameVariables.value( data['condition_variable'] ) >= data['condition_variableOpValue'] ){
				//（不操作）
			}else{
				return false; //（开了条件，却不满足时，跳过）
			}
		}
		if( data['condition_variableOp'] == "小于等于" ){
			if( $gameVariables.value( data['condition_variable'] ) <= data['condition_variableOpValue'] ){  }else{ return false; }
		}
		if( data['condition_variableOp'] == "大于" ){
			if( $gameVariables.value( data['condition_variable'] ) > data['condition_variableOpValue'] ){  }else{ return false; }
		}
		if( data['condition_variableOp'] == "小于" ){
			if( $gameVariables.value( data['condition_variable'] ) < data['condition_variableOpValue'] ){  }else{ return false; }
		}
		if( data['condition_variableOp'] == "等于" ){
			if( $gameVariables.value( data['condition_variable'] ) == data['condition_variableOpValue'] ){  }else{ return false; }
		}
	}
	
	return true;
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_XSSD_update = function() {
	
	// > 刷新光圈
	for( var i = 0; i < this._drill_XSSD_spriteBackTank.length; i++ ){
		this._drill_XSSD_spriteBackTank[i].rotation += $gameTemp._drill_XSSD_dataTank[i]['rotate'] /180*Math.PI;
	};
	
	// > 刷新图标鼠标监听
	if( this._drill_XSSD_window ){
		for( var i = 0; i < this._drill_XSSD_spriteTank.length; i++ ){
			var temp_sprite = this._drill_XSSD_spriteTank[i];
			if( temp_sprite == undefined ){ continue; }
			if( temp_sprite.bitmap == undefined ){ continue; }
			if( temp_sprite.bitmap.isReady() != true ){ continue; }
			if( temp_sprite['data_ptr'] == undefined ){ continue; }
			var pw = temp_sprite.bitmap.width;
			var ph = temp_sprite.bitmap.height;
			var check = {};
			check['x'] = temp_sprite.x - pw * 0.5;		//（贴图资源的边界 作为 鼠标信息框的显示范围）
			check['y'] = temp_sprite.y - ph * 0.5;
			check['w'] = pw;
			check['h'] = ph;
			check['str'] = temp_sprite['data_ptr']['window_context'];
			this._drill_XSSD_window.drill_pushChecks(check);
		};
	}
	
};


//=============================================================================
// ** ☆折扣倍率
//			
//			说明：	> 此模块对 价格 进行 倍率修改。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全自定义商店 - 购买价格（继承叠加）
//==============================
var _drill_XSSD_SSh_price = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function( item ){
	var price = _drill_XSSD_SSh_price.call( this, item );
	if( price == 0 ){ return 0; }
	
	// > 多重优惠叠加
	var result = price;
	for( var i = 0; i < $gameTemp._drill_XSSD_dataTank.length; i++ ){
		var temp_sprite_data = $gameTemp._drill_XSSD_dataTank[i];
		if( temp_sprite_data == undefined ){ continue; }
		if( temp_sprite_data['is_fit'] != true ){ continue; }
		result *= temp_sprite_data['discount'];
	}
	// > 过滤有问题的倍率
	if( result <= 0 ){
		return price;
	}
	return Math.ceil( result );
};
//==============================
// * 限量商店 - 购买价格（窗口，继承叠加）
//==============================
var _drill_XSSD_SLS_price = Drill_SLS_GoodsWindow.prototype.drill_SLS_price;
Drill_SLS_GoodsWindow.prototype.drill_SLS_price = function( index ){
	var price = _drill_XSSD_SLS_price.call( this, index );
	if( price == 0 ){ return 0; }
	
	// > 多重优惠叠加
	var result = price;
	for( var i = 0; i < $gameTemp._drill_XSSD_dataTank.length; i++ ){
		var temp_sprite_data = $gameTemp._drill_XSSD_dataTank[i];
		if( temp_sprite_data == undefined ){ continue; }
		if( temp_sprite_data['is_fit'] != true ){ continue; }
		result *= temp_sprite_data['discount'];
	}
	// > 过滤有问题的倍率
	if( result <= 0 ){
		return price;
	}
	return Math.ceil( result );
};
//==============================
// * 限量商店 - 购买价格（按钮组，继承叠加）
//==============================
var _drill_XSSD_SLS_btn_price = Drill_SLS_GoodsButtonWindow.prototype.drill_SLS_price;
Drill_SLS_GoodsButtonWindow.prototype.drill_SLS_price = function() {
	var price = _drill_XSSD_SLS_btn_price.call( this );
	if( price == 0 ){ return 0; }
	
	// > 多重优惠叠加
	var result = price;
	for( var i = 0; i < $gameTemp._drill_XSSD_dataTank.length; i++ ){
		var temp_sprite_data = $gameTemp._drill_XSSD_dataTank[i];
		if( temp_sprite_data == undefined ){ continue; }
		if( temp_sprite_data['is_fit'] != true ){ continue; }
		result *= temp_sprite_data['discount'];
	}
	// > 过滤有问题的倍率
	if( result <= 0 ){
		return price;
	}
	return Math.ceil( result );
};



//=============================================================================
// ** 折扣信息框【Drill_XSSD_Window】
// **		
// **		索引：	无
// **		来源：	继承于Window_Base
// **		实例：	Scene_MenuBase下的 _drill_XSSD_window 成员
// **		应用：	暂无 
// **		
// **		作用域：	菜单界面
// **		主功能：	定义一个面板，能随时改变内容和高宽，用于描述折扣信息。
// **		子功能：	->窗口
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **					->A主体
// **					->B位置跟随
// **						> 锁定位置
// **						> 跟随鼠标位置
// **						> 鼠标移走则重刷
// **					->C窗口皮肤
// **						> 默认窗口皮肤
// **						> 自定义窗口皮肤
// **						> 自定义背景图片
// **						> 黑底背景
// **					->D窗口内容
// **						->窗口字符
// **						->文本域自适应
// **						->显现时机
// **							->激活
// **							->显示条件
// **							->刷新内容
// **			
// **		说明：	> 整个场景只有一个该窗口。
//=============================================================================
//==============================
// * 折扣信息框 - 定义
//==============================
function Drill_XSSD_Window() {
    this.initialize.apply(this, arguments);
};
Drill_XSSD_Window.prototype = Object.create(Window_Base.prototype);
Drill_XSSD_Window.prototype.constructor = Drill_XSSD_Window;
//==============================
// * 折扣信息框 - 初始化
//==============================
Drill_XSSD_Window.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 折扣信息框 - 帧刷新
//==============================
Drill_XSSD_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
										//帧刷新 - A主体（无）
	this.drill_updatePosition();		//帧刷新 - B位置跟随
	this.drill_updateSkin();			//帧刷新 - C窗口皮肤
	this.drill_updateChecks();			//帧刷新 - D窗口内容
};
//==============================
// * 折扣信息框 - 私有覆写函数
//==============================
Drill_XSSD_Window.prototype.lineHeight = function(){ return DrillUp.g_XSSD_lineheight; };			//窗口行间距
Drill_XSSD_Window.prototype.standardPadding = function(){ return DrillUp.g_XSSD_padding; };			//窗口内边距
Drill_XSSD_Window.prototype.standardFontSize = function(){ return DrillUp.g_XSSD_fontsize; };		//窗口字体大小
//==============================
// * 初始化 - 数据
//==============================
Drill_XSSD_Window.prototype.drill_initData = function() {
	//（暂无 默认值）
};
//==============================
// * 初始化 - 对象
//==============================
Drill_XSSD_Window.prototype.drill_initSprite = function() {
	this.drill_initAttr();				//初始化对象 - A主体
	this.drill_initPosition();			//初始化对象 - B位置跟随
	this.drill_initSkin();				//初始化对象 - C窗口皮肤
	this.drill_initMessage();			//初始化对象 - D窗口内容
};


//==============================
// * A主体 - 初始化对象
//==============================
Drill_XSSD_Window.prototype.drill_initAttr = function() {
	
	// > 私有变量初始化
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_visible = false;
};


//==============================
// * B位置跟随 - 初始化对象
//==============================
Drill_XSSD_Window.prototype.drill_initPosition = function() {
	//（无）
};
//==============================
// * B位置跟随 - 帧刷新
//==============================
Drill_XSSD_Window.prototype.drill_updatePosition = function() {
	
	// > 锁定位置
	if( DrillUp.g_XSSD_lock_enable == true ){
		this.x = DrillUp.g_XSSD_lock_x;
		this.y = DrillUp.g_XSSD_lock_y;
		return;
	}
	
	// > 跟随鼠标位置
	var cal_x = _drill_mouse_x + DrillUp.g_XSSD_x;
	var cal_y = _drill_mouse_y + DrillUp.g_XSSD_y;
	if( cal_x + this._drill_width > Graphics.boxWidth ){	//横向贴边控制
		cal_x = Graphics.boxWidth - this._drill_width;
	}
	if( cal_y + this._drill_height > Graphics.boxHeight ){	//纵向贴边控制
		cal_y = Graphics.boxHeight - this._drill_height;
	}
	this.x = cal_x;
	this.y = cal_y;
}


//==============================
// * C窗口皮肤 - 初始化对象
//
//			说明：	> 此函数只在初始化时执行一次，不要执行多了。
//==============================
Drill_XSSD_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
	
	// > 布局模式
	var data = {};
	data['window_type'] = DrillUp.g_XSSD_layout_type;
	data['window_opacity'] = DrillUp.g_XSSD_layout_opacity;
	data['window_sys_src'] = DrillUp.g_XSSD_layout_sys_src;
	data['window_pic_src'] = DrillUp.g_XSSD_layout_pic_src;
	data['window_pic_x'] = DrillUp.g_XSSD_layout_pic_x;
	data['window_pic_y'] = DrillUp.g_XSSD_layout_pic_y;
	this.drill_resetData_Skin( data );
}
//==============================
// * C窗口皮肤 - 重设数据
//
//			说明：	> data对象中的参数【可以缺项】。
//==============================
Drill_XSSD_Window.prototype.drill_resetData_Skin = function( data ){
	
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
		this._drill_skin_pic_bitmap = ImageManager.loadBitmap( "img/Menu__shopDiscount/", data['window_pic_src'], 0, true );
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
	this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
}
//==============================
// * C窗口皮肤 - 帧刷新
//==============================
Drill_XSSD_Window.prototype.drill_updateSkin = function() {
	
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
		//xx += this._drill_width * this._drill_anchor_x;
		//yy += this._drill_height * this._drill_anchor_y;
		this._drill_skinBackground.x = xx;
		this._drill_skinBackground.y = yy;
		//this._drill_skinBackground.anchor.x = this._drill_anchor_x;
		//this._drill_skinBackground.anchor.y = this._drill_anchor_y;
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
// * C窗口皮肤 - 帧刷新色调
//
//			说明：	setTone可以反复调用赋值，有变化监听的锁。
//==============================
var _drill_XSSD_updateTone = Drill_XSSD_Window.prototype.updateTone;
Drill_XSSD_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_XSSD_updateTone.call( this );
}


//==============================
// * D窗口内容 - 初始化对象
//==============================
Drill_XSSD_Window.prototype.drill_initMessage = function() {
	this._drill_check_tank = [];
}
//==============================
// * D窗口内容 - 添加内容 判断项
//
//			参数：	c['x']: 触发范围坐标X
//					c['y']: 触发范围坐标Y
//					c['w']: 触发范围宽
//					c['h']: 触发范围高
//					c['str']: 文本
//			说明：	> 保留此函数的结构，不考虑强制转为 实体类 的格式。
//					（只有这一个插件使用此结构，给以后代码作为可参考对象）
//==============================
Drill_XSSD_Window.prototype.drill_pushChecks = function( c ){
	if( this._drill_check_tank.length < 1000){	//防止卡顿造成的过度积压
		this._drill_check_tank.push(c);
	}
}
//==============================
// * D窗口内容 - 帧刷新 判断激活
//==============================
Drill_XSSD_Window.prototype.drill_updateChecks = function() {
	if( !this._drill_check_tank ){ this.visible = false; return; }
	
	// > 捕获 判断项
	var is_visible = false;
	var context_list = [];
	for(var i=0; i< this._drill_check_tank.length; i++){
		var check = this._drill_check_tank[i];
		check['mouseType'] = DrillUp.g_XSSD_mouse_type;
		
		if ( this.drill_checkCondition(check) ) { 
			is_visible = true; 
			context_list = check['str'].split("\n"); 
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
			this.drill_refreshMessage( context_list );
			this._drill_visible = true;
		}else{
			// > 隐藏中，不操作
		}
	}
	
	//（宽高不要在update中轻易修改）
	this.visible = this._drill_visible;
}
//==============================
// * D窗口内容 - 显示条件
//==============================
Drill_XSSD_Window.prototype.drill_checkCondition = function( check ){
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
// * D窗口内容 - 刷新内容
//==============================
Drill_XSSD_Window.prototype.drill_refreshMessage = function( context_list ){
	if( context_list.length == 0 ){ return; }
	
	
	// > 窗口高宽 - 计算（文本域自适应）
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
	ww += DrillUp.g_XSSD_ex_width;		//（附加高宽）
	hh += DrillUp.g_XSSD_ex_height;
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
		Imported.Drill_X_SceneShopDiscount = false;
		var pluginTip = DrillUp.drill_XSSD_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


