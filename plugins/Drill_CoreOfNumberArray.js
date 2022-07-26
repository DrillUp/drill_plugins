//=============================================================================
// Drill_CoreOfNumberArray.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 变量数组核心
 * @author Drill_up
 * 
 * @Drill_LE_param "变量数组-%d"
 * @Drill_LE_parentKey "---变量数组集%d至%d---"
 * @Drill_LE_var "DrillUp.g_CONA_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfNumberArray +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令存储、操作变量数组。与变量、开关用法相似。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 可以作用于其他插件，也可以被其他插件扩展。
 * 可作用于：
 *   - Drill_CoreOfString          系统-字符串核心
 *     可以将数组信息，以字符串的形式赋值给指定的字符串。
 * 可被扩展：
 *   - Drill_CoreOfEventTags       物体管理-事件标签核心
 *     通过该插件，可以从地图中获取 指定标签 的事件id组。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   用于辅助设计者设计复杂的数字组合。
 * 2.具体可以去看看 "1.系统 > 关于变量数组核心.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 细节：
 *   (1.变量数组 是一维数组，且只能装 整数数字 ，索引从1开始计数。
 *   (2.使用数组能够极大地减少部分开关的功能实现。
 * 设计：
 *   (1.由于 变量 的数组经常不够用，所以这里使用变量数组，
 *      可以节省许多事件变量的操作指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改变量数组内容：
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 索引[1] : 变量[21]
 * 插件指令：>变量数组核心 : 数组[自定义容器名] : 获取值 : 索引[1] : 变量[21]
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 索引[1] : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 索引变量[21] : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 数组长度 : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 数组最大值 : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 数组最小值 : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 数组中位数 : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 数组平均数 : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 数组总和 : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 获取值 : 数组总积 : 变量[21]
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 全数组从小到大排序
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 全数组从大到小排序
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 全数组值[+10]
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 全数组设置为[10]
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 索引[1] : 值[10]
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 索引[1] : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 索引变量[21] : 值[10]
 * 插件指令：>变量数组核心 : 数组[4] : 修改值 : 索引变量[21] : 变量[21]
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 添加值 : 值[10]
 * 插件指令：>变量数组核心 : 数组[4] : 添加值 : 变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 删除值 : 索引[1]
 * 插件指令：>变量数组核心 : 数组[4] : 删除值 : 索引变量[21]
 * 插件指令：>变量数组核心 : 数组[4] : 删除值 : 大于[100]的值
 * 插件指令：>变量数组核心 : 数组[4] : 删除值 : 小于[100]的值
 * 插件指令：>变量数组核心 : 数组[4] : 删除值 : 等于[100]的值
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否含大于[100] : 开关[21]
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否含小于[100] : 开关[21]
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否含等于[100] : 开关[21]
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否含重复值 : 开关[21]
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否为从小到大顺序 : 开关[21]
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否为从大到小顺序 : 开关[21]
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否完全匹配数组 : 数组[6] : 开关[21]
 * 插件指令：>变量数组核心 : 数组[4] : 判断值 : 是否完全匹配数组 : 数组值[1,2,3] : 开关[21]
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 复制数组 : 数组[6]
 * 插件指令：>变量数组核心 : 数组[4] : 重置数组 : 数组值[1,-1,2]
 * 插件指令：>变量数组核心 : 数组[4] : 翻转数组
 * 插件指令：>变量数组核心 : 数组[4] : 清空数组
 * 插件指令：>变量数组核心 : 数组[4] : DEBUG查看数组数据
 * 
 * 1.数组可以直接使用自定义名称调用插件指令，比如"数组[时间数组]"。
 * 2.插件指令添加/修改/删除操作后，永久有效。
 * 3."数组中位数"表示统计学意义上的中位数，值处于中间位置的数值。
 *   "数组平均数"赋值给指定变量后会四舍五入，比如平均数为"4.8"则值取"5"。
 * 4.注意，"添加值"和"删除值"会改变数组的长度。
 * 5."是否为从小到大顺序"的判断，包括相等的情况，比如 [1,1,4,7,7]，返回true。
 *   注意，如果数值全部为3，也会返回true。
 * 
 * -----------------------------------------------------------------------------
 * ----知识点 - 脚本用法
 * 默认的常用脚本如下：
 *     var aa = $gameSwitches.value(21);       //获取21号开关值（true/false）
 *     var bb = $gameVariables.value(22);      //获取22号变量值（整数）
 *     $gameSwitches.setValue(21,false);       //设置21号开关值为false
 *     $gameVariables.setValue(22,100);        //设置22号变量值为100
 * 该核心的用法一样：
 *     var ss = $gameNumberArray.value(21);       //获取21号变量数组
 *     $gameNumberArray.setValue(21,[1,1,1]);     //设置21号变量数组为[1,1,1]
 * 特殊用法：
 *     var ss = $gameNumberArray.value("数表");   //获取名为"数表"变量数组
 *     $gameNumberArray.setValue("数表",[1,1,1]); //设置"数表"变量数组为[1,1,1]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 批量变量
 * 你可以控制数组与批量变量的交互：
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 依次赋值到变量 : 变量[21]至[26]
 * 插件指令：>变量数组核心 : 数组[4] : 抽取成新数组 : 变量[21]至[26]
 * 
 * 1."依次赋值到变量"时，如果数组的长度不够，剩余变量会赋值0。
 *   如果长度超出，则超出索引的不会被赋值。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 字符串相关
 * 你可以通过将数组转成字符串：
 * 
 * 插件指令：>变量数组核心 : 数组[4] : 转为字符串(空格连接) : 字符串[6]
 * 插件指令：>变量数组核心 : 数组[4] : 转为字符串(逗号连接) : 字符串[6]
 * 
 * 1.数组的每个值以空格或逗号进行分隔，转为可用的字符串格式。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n^2)
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于插件只执行一两次，不存在反复执行情况，所以几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了转字符串功能。
 * [v1.2]
 * 添加了 判断从小到大顺序 功能。
 * 
 * 
 * 
 * @param ---变量数组集 1至20---
 * @default 
 * 
 * @param 变量数组-1
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-2
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-3
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-4
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-5
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-6
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-7
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-8
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-9
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-10
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-11
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-12
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-13
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-14
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-15
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-16
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-17
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-18
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-19
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-20
 * @parent ---变量数组集 1至20---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集21至40---
 * @default 
 * 
 * @param 变量数组-21
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-22
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-23
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-24
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-25
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-26
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-27
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-28
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-29
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-30
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-31
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-32
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-33
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-34
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-35
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-36
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-37
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-38
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-39
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-40
 * @parent ---变量数组集21至40---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集41至60---
 * @default 
 * 
 * @param 变量数组-41
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-42
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-43
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-44
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-45
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-46
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-47
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-48
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-49
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-50
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-51
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-52
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-53
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-54
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-55
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-56
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-57
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-58
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-59
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-60
 * @parent ---变量数组集41至60---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集61至80---
 * @default 
 * 
 * @param 变量数组-61
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-62
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-63
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-64
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-65
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-66
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-67
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-68
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-69
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-70
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-71
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-72
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-73
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-74
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-75
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-76
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-77
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-78
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-79
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-80
 * @parent ---变量数组集61至80---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集81至100---
 * @default 
 * 
 * @param 变量数组-81
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-82
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-83
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-84
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-85
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-86
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-87
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-88
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-89
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-90
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-91
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-92
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-93
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-94
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-95
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-96
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-97
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-98
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-99
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-100
 * @parent ---变量数组集81至100---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集101至120---
 * @default 
 * 
 * @param 变量数组-101
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-102
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-103
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-104
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-105
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-106
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-107
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-108
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-109
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-110
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-111
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-112
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-113
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-114
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-115
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-116
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-117
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-118
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-119
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-120
 * @parent ---变量数组集101至120---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集121至140---
 * @default 
 * 
 * @param 变量数组-121
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-122
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-123
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-124
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-125
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-126
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-127
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-128
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-129
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-130
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-131
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-132
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-133
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-134
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-135
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-136
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-137
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-138
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-139
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-140
 * @parent ---变量数组集121至140---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集141至160---
 * @default 
 * 
 * @param 变量数组-141
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-142
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-143
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-144
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-145
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-146
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-147
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-148
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-149
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-150
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-151
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-152
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-153
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-154
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-155
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-156
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-157
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-158
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-159
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-160
 * @parent ---变量数组集141至160---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集161至180---
 * @default 
 * 
 * @param 变量数组-161
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-162
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-163
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-164
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-165
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-166
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-167
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-168
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-169
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-170
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-171
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-172
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-173
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-174
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-175
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-176
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-177
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-178
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-179
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-180
 * @parent ---变量数组集161至180---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param ---变量数组集181至200---
 * @default 
 * 
 * @param 变量数组-181
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-182
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-183
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-184
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-185
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-186
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-187
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-188
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-189
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-190
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-191
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-192
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-193
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-194
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-195
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-196
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-197
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-198
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-199
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default 
 * 
 * @param 变量数组-200
 * @parent ---变量数组集181至200---
 * @type struct<DrillNATank>
 * @desc 变量数组的内容配置。
 * @default
 * 
 */
/*~struct~DrillNATank:
 *
 * @param 识别名
 * @desc 插件指令设置时方便调用的识别名称。注意，名称必须唯一。
 * @default 新的数组名
 *
 * @param 变量数组内容
 * @type text[]
 * @desc 变量数组的内容，可以含有窗口字符，包括\str[]来嵌套其它的自定义变量数组，但是要注意不能死循环嵌套。
 * @default []
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		CONA（Core_Of_NumberArray）
//		临时全局变量	DrillUp.g_CONA_xxx
//		临时局部变量	this._drill_CONA_xxx
//		存储数据变量	$gameNumberArray
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	设计-顺序记忆
//		★性能测试消耗	（太小，没有找到）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			变量数组核心：
//				->脚本提供
//				->重名检查
//				->插件指令
//					->增删改查
//					->复制数组
//					->翻转数组
//					->统计
//						->中位数
//						->平均数
//					->筛选
//						->删除条件值
//
//		★必要注意事项：
//			1.这里相对完整地复刻了 变量、开关 的程序结构，将变量数组对象化。
//			
//			
//		★其它说明细节：
//			1.刚开始使用的是集群存储法： 
//				this._data 中存储的是 {"name":"……","context":"……"}
//				这种方法在每次获取名称的时候，都要遍历一次，于是抛弃了该方法。
//			  现在使用的是映射法：
//				使用 json 根据名称映射到指定的索引，再根据索引进行操作.
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfNumberArray = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfNumberArray');
	
	//==============================
	// * 变量获取 - 变量数组
	//				(~struct~DrillNATank)
	//==============================
	DrillUp.drill_CONA_initNATank = function( dataFrom ){
		var data = {};
		data['name'] = String( dataFrom["识别名"] || "" );
		if( dataFrom["变量数组内容"] != undefined && 
			dataFrom["变量数组内容"] != "" ){
			data['context'] = [];
			var temp = JSON.parse( dataFrom["变量数组内容"] );
			for( var i=0; i < temp.length; i++ ){
				data['context'].push( Number(temp[i]) );
			}
		}else{
			data['context'] = [];
		}
		return data;
	}
	
	/*-----------------变量数组------------------*/
	DrillUp.g_CONA_list_length = 200;
	DrillUp.g_CONA_list = [];
	for( var i = 0; i < DrillUp.g_CONA_list_length ; i++ ){
		if( DrillUp.parameters['变量数组-' + String(i+1) ] != "" &&
			DrillUp.parameters['变量数组-' + String(i+1) ] != undefined ){
			var temp = JSON.parse( DrillUp.parameters['变量数组-' + String(i+1)] || {} );
			DrillUp.g_CONA_list[i] = DrillUp.drill_CONA_initNATank( temp );
		}else{
			DrillUp.g_CONA_list[i] = DrillUp.drill_CONA_initNATank( {} );
		}
	}
	
	// > 检查重名
	DrillUp.g_CONA_nameList = [];
	for( var i = 0; i < DrillUp.g_CONA_list.length ; i++ ){
		var temp = DrillUp.g_CONA_list[i];
		DrillUp.g_CONA_nameList.push( temp['name'] );
	}
	DrillUp.g_CONA_nameList.sort();
	for( var i=0; i < DrillUp.g_CONA_nameList.length; i++ ){
		var name = DrillUp.g_CONA_nameList[i];
		var name_next = DrillUp.g_CONA_nameList[i+1];
		if( name == "" ){ continue; }
		if( name_next == "" ){ continue; }
		if( name == name_next ){
			alert( "【Drill_CoreOfNumberArray.js 系统 - 变量数组核心】\n" +
					"注意，变量数组中，有重名的数组： "+name+" 。数组调用时会出现未知影响。");
		}
	}
	
	
//=============================================================================
// * 全局管理器
//=============================================================================
//==============================
// * 管理器 - 定义
//==============================
var $gameNumberArray    = null;
//==============================
// * 管理器 - 初始化
//==============================
var _drill_CONA_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	_drill_CONA_createGameObjects.call( this );
	$gameNumberArray    = new Game_NumberArray();
};
//==============================
// * 管理器 - 保存数据
//==============================
var _drill_CONA_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	var contents = _drill_CONA_makeSaveContents.call( this );
	contents.numberArray    = $gameNumberArray;
	return contents;
};
//==============================
// * 管理器 - 读取数据
//==============================
var _drill_CONA_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_CONA_extractSaveContents.call( this,contents );
	if( contents.numberArray != undefined ){
		$gameNumberArray        = contents.numberArray;
	}
};
	

//=============================================================================
// ** 变量数组【Game_NumberArray】
//			
//			实例：	$gameNumberArray
//			索引：	无
//			来源：	无（独立数据）
//			应用：	> 事件指令
//			
//			功能：	> 提供基本的变量数组数据设置/获取功能。
//					> 根据名称/根据索引 操作
//
//			说明：	this._data中存的不是单纯的数组，而是一个集群（含名称的数组）。
//=============================================================================
//==============================
// * 变量数组 - 定义
//==============================
function Game_NumberArray() {
    this.initialize.apply(this, arguments);
}
//==============================
// * 变量数组 - 初始化
//==============================
Game_NumberArray.prototype.initialize = function() {
    this.clear();
    this.drill_CONA_init();
};
//==============================
// * 变量数组 - 清理全部
//==============================
Game_NumberArray.prototype.clear = function(){ this._data = []; };
//==============================
// * 变量数组 - 数据初始化
//==============================
Game_NumberArray.prototype.drill_CONA_init = function(){
	
	// > 数组初始化
	var data_tank = [];	
	data_tank.push([]);		//（第0个为空变量数组）
	for( var i = 0; i < DrillUp.g_CONA_list.length; i++ ){
		var temp_arr = DrillUp.g_CONA_list[i]['context'];
		data_tank.push(temp_arr);
	}
	this._data = data_tank;

	// > 映射初始化
	this._drill_keyMapping = {};
	for( var i = 0; i < DrillUp.g_CONA_list.length; i++ ){
		var temp_name = DrillUp.g_CONA_list[i]['name'];
		this._drill_keyMapping[ temp_name ] = i+1;		//（索引位置）
	}
};
//==============================
// * 变量数组 - 获取数组（接口）
//
//			说明：	返回数字数组，na_id可以是数字，也可以是名称。
//==============================
Game_NumberArray.prototype.value = function( na_id ){
	var index = this.drill_CONA_getArrayIndex( na_id );
    return this._data[ index ] || [];
};
//==============================
// * 变量数组 - 设置数组（接口）
//
//			说明：	返回数字数组，na_id可以是数字，也可以是名称。
//==============================
Game_NumberArray.prototype.setValue = function( na_id, value ){
	if( Array.isArray( value ) == false ){ return; }

	var index = this.drill_CONA_getArrayIndex( na_id );
	if( index != -1 ){ 
		this._data[ index ] = value;
	}
};
//==============================
// * 私有 - 获取索引位置（综合判断获取）
//
//			说明：	根据传来的na_id，返回数组的索引位置。
//==============================
Game_NumberArray.prototype.drill_CONA_getArrayIndex = function( na_id ){
	if( na_id == undefined ){ return -1; }
	if( na_id == "" ){ return -1; }
	
	// > 数字获取
	if( typeof na_id === "number" ||
	   (typeof na_id === "string" && /^\d+$/.test( na_id ) == true ) ){
		var index = Number( na_id );
		if( index > 0 ){ return index; }
		return -1;
	}
	
	// > 名称获取
	if( typeof na_id === "string" && /^\d+$/.test( na_id ) != true ){
		var index = this._drill_keyMapping[ na_id ];
		if( index != undefined ){
			return index;
		}
		return -1;
	}
	
	return -1;
};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_CONA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_CONA_pluginCommand.call(this, command, args);
	if( command === ">变量数组核心" ){		//>变量数组核心 : 变量数组[1] : 修改变量数组 : 某\c[2]变量数组
		
		/*-----------------对象组获取------------------*/
		var arr_index = null;
		if(args.length >= 2){
			var na_id = String(args[1]);
			na_id = na_id.replace("数组[","");
			na_id = na_id.replace("]","");
			arr_index = $gameNumberArray.drill_CONA_getArrayIndex( na_id );
			if( arr_index == -1 ){
				
				alert( "【Drill_CoreOfNumberArray.js 系统 - 变量数组核心】\n" +
						"插件指令错误，数组["+na_id+"] 不存在，需要先创建再使用。");
				return;
			}
		}
		var data_tank = $gameNumberArray._data;
		if( data_tank[ arr_index ] == undefined ){ return; }
		
		/*-----------------集群操作 - 获取值------------------*/
		if(args.length == 8){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			
			if( type == "获取值" && temp1.indexOf("索引变量[") != -1 ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				temp1 = temp1.replace("索引变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) ) -1; 	//（注意索引-1）
				var result = data_tank[ arr_index ][ temp1 ];
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1.indexOf("索引[") != -1 ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				temp1 = temp1.replace("索引[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;			//（注意索引-1）
				var result = data_tank[ arr_index ][ temp1 ];
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1 == "数组长度" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var result = data_tank[ arr_index ].length;
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1 == "数组最大值" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( data_tank[ arr_index ].length == 0 ){
					$gameVariables.setValue( temp2, 0 );
					return;
				}
				var result = data_tank[ arr_index ][0];
				for( var i=1; i < data_tank[ arr_index ].length; i++ ){
					if( result < data_tank[ arr_index ][i] ){
						result = data_tank[ arr_index ][i];
					}
				}
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1 == "数组最小值" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( data_tank[ arr_index ].length == 0 ){
					$gameVariables.setValue( temp2, 0 );
					return;
				}
				var result = data_tank[ arr_index ][0];
				for( var i=1; i < data_tank[ arr_index ].length; i++ ){
					if( result > data_tank[ arr_index ][i] ){
						result = data_tank[ arr_index ][i];
					}
				}
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1 == "数组中位数" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				var copy_arr = JSON.parse(JSON.stringify( data_tank[ arr_index ] ));	//（深拷贝）
				var result = 0;
				copy_arr.sort();
				if( copy_arr.length == 0 ){
					result = 0;
				}else{
					result = copy_arr[ Math.floor( (copy_arr.length -0.5)/2) ];
				}
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1 == "数组平均数" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( data_tank[ arr_index ].length == 0 ){
					$gameVariables.setValue( temp2, 0 );
					return;
				}
				var result = 0;
				for( var i=0; i < data_tank[ arr_index ].length; i++ ){
					result += data_tank[ arr_index ][i];
				}
				result = Math.round( result / data_tank[ arr_index ].length );
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1 == "数组总和" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( data_tank[ arr_index ].length == 0 ){
					$gameVariables.setValue( temp2, 0 );
					return;
				}
				var result = 0;
				for( var i=0; i < data_tank[ arr_index ].length; i++ ){
					result += data_tank[ arr_index ][i];
				}
				$gameVariables.setValue( temp2, result );
			}
			
			else if( type == "获取值" && temp1 == "数组总积" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( data_tank[ arr_index ].length == 0 ){
					$gameVariables.setValue( temp2, 0 );
					return;
				}
				var result = 0;
				for( var i=0; i < data_tank[ arr_index ].length; i++ ){
					result *= data_tank[ arr_index ][i];
				}
				$gameVariables.setValue( temp2, result );
			}
		}
		
		/*-----------------集群操作 - 修改值------------------*/
		if(args.length == 6){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "修改值" && temp1 == "全数组从小到大排序" ){	
				data_tank[ arr_index ].sort(function(a, b){ return a - b });
			}
			
			else if( type == "修改值" && temp1 == "全数组从大到小排序" ){	
				data_tank[ arr_index ].sort(function(a, b){ return b - a });
			}
			
			else if( type == "修改值" && temp1.indexOf("全数组值[") != -1 ){	
				temp1 = temp1.replace("全数组值[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				for( var i=0; i < data_tank[ arr_index ].length; i++ ){
					data_tank[ arr_index ][i] += temp1;
				}
			}
			
			else if( type == "修改值" && temp1.indexOf("全数组设置为[") != -1 ){	
				temp1 = temp1.replace("全数组设置为[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				for( var i=0; i < data_tank[ arr_index ].length; i++ ){
					data_tank[ arr_index ][i] = temp1;
				}
			}
		}
		if(args.length == 8){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			
			if( type == "修改值" && temp1.indexOf("索引变量[") != -1 ){	
				temp1 = temp1.replace("索引变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) ) -1;  	//（注意索引-1）
				if( temp2.indexOf("值[") != -1 ){
					temp2 = temp2.replace("值[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					data_tank[ arr_index ][ temp1 ] = temp2;
				}
				else if( temp2.indexOf("变量[") != -1 ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					data_tank[ arr_index ][ temp1 ] = $gameVariables.value( temp2 );
				}
			}
			
			else if( type == "修改值" && temp1.indexOf("索引[") != -1 ){	
				temp1 = temp1.replace("索引[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;  	//（注意索引-1）
				if( temp2.indexOf("值[") != -1 ){
					temp2 = temp2.replace("值[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					data_tank[ arr_index ][ temp1 ] = temp2;
				}
				else if( temp2.indexOf("变量[") != -1 ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					data_tank[ arr_index ][ temp1 ] = $gameVariables.value( temp2 );
				}
			}
		}
			
		/*-----------------集群操作 - 删除值------------------*/
		if(args.length == 6){
			var type = String(args[3]);
			var temp1 = String(args[5]);
		
			if( type == "删除值" && temp1.indexOf("索引变量[") != -1 ){	
				temp1 = temp1.replace("索引变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) ) -1;  	//（注意索引-1）
				data_tank[ arr_index ].splice( temp1, 1 );
			}
			
			else if( type == "删除值" && temp1.indexOf("索引[") != -1 ){	
				temp1 = temp1.replace("索引[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1; 		 	//（注意索引-1）
				data_tank[ arr_index ].splice( temp1, 1 );
			}
			
			else if( type == "删除值" && temp1.indexOf("大于[") != -1 ){	
				temp1 = temp1.replace("大于[","");
				temp1 = temp1.replace("]的值","");
				temp1 = Number(temp1); 
				
				for(var i = data_tank[ arr_index ].length-1; i >= 0; i-- ){
					var v = data_tank[ arr_index ][i];
					if( v > temp1 ){
						data_tank[ arr_index ].splice(i,1);
					}
				}
			}
			
			else if( type == "删除值" && temp1.indexOf("小于[") != -1 ){	
				temp1 = temp1.replace("小于[","");
				temp1 = temp1.replace("]的值","");
				temp1 = Number(temp1); 
				
				for(var i = data_tank[ arr_index ].length-1; i >= 0; i-- ){
					var v = data_tank[ arr_index ][i];
					if( v < temp1 ){
						data_tank[ arr_index ].splice(i,1);
					}
				}
			}
			
			else if( type == "删除值" && temp1.indexOf("等于[") != -1 ){	
				temp1 = temp1.replace("等于[","");
				temp1 = temp1.replace("]的值","");
				temp1 = Number(temp1); 
				
				for(var i = data_tank[ arr_index ].length-1; i >= 0; i-- ){
					var v = data_tank[ arr_index ][i];
					if( v == temp1 ){
						data_tank[ arr_index ].splice(i,1);
					}
				}
			}
		}
			
		/*-----------------集群操作 - 添加值------------------*/
		if(args.length == 6){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "添加值" && temp1.indexOf("变量[") != -1 ){	
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) ); 
				data_tank[ arr_index ].push( temp1 );
			}
			
			else if( type == "添加值" && temp1.indexOf("值[") != -1 ){	
				temp1 = temp1.replace("值[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				data_tank[ arr_index ].push( temp1 );
			}
		}
			
		/*-----------------集群操作 - 判断值------------------*/
		if(args.length == 8){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "判断值" && temp1.indexOf("是否含大于[") != -1 ){	
				temp1 = temp1.replace("是否含大于[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1); 
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2); 
				var result = false;
				for(var i = 0; i < data_tank[ arr_index ].length; i++ ){
					var v = data_tank[ arr_index ][i];
					if( v > temp1 ){
						result = true;
						break;
					}
				}
				$gameSwitches.setValue( temp2, result );
			}
			
			else if( type == "判断值" && temp1.indexOf("是否含小于[") != -1 ){	
				temp1 = temp1.replace("是否含小于[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1); 
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2); 
				var result = false;
				for(var i = 0; i < data_tank[ arr_index ].length; i++ ){
					var v = data_tank[ arr_index ][i];
					if( v < temp1 ){
						result = true;
						break;
					}
				}
				$gameSwitches.setValue( temp2, result );
			}
			
			else if( type == "判断值" && temp1.indexOf("是否含等于[") != -1 ){	
				temp1 = temp1.replace("是否含等于[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1); 
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2); 
				var result = false;
				for(var i = 0; i < data_tank[ arr_index ].length; i++ ){
					var v = data_tank[ arr_index ][i];
					if( v == temp1 ){
						result = true;
						break;
					}
				}
				$gameSwitches.setValue( temp2, result );
			}
			
			else if( type == "判断值" && temp1 == "是否含重复值" ){	
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2); 
				
				var result = false;
				var temp_arr = [];
				for(var i = 0; i < data_tank[ arr_index ].length; i++ ){
					var v = data_tank[ arr_index ][i];
					if( temp_arr.indexOf( v ) != -1 ){
						result = true;
						break;
					}
					temp_arr.push( v );
				}
				$gameSwitches.setValue( temp2, result );
			}
			
			else if( type == "判断值" && temp1 == "是否为从小到大顺序" ){	
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2); 
				
				var result = true;
				for(var i = 0; i < data_tank[ arr_index ].length-1; i++ ){
					var v1 = data_tank[ arr_index ][i];
					var v2 = data_tank[ arr_index ][i+1];
					if( v1 > v2 ){
						result = false;
						break;
					}
				}
				$gameSwitches.setValue( temp2, result );
			}
			
			else if( type == "判断值" && temp1 == "是否为从大到小顺序" ){	
				temp2 = temp2.replace("开关[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2); 
				
				var result = true;
				for(var i = 0; i < data_tank[ arr_index ].length-1; i++ ){
					var v1 = data_tank[ arr_index ][i];
					var v2 = data_tank[ arr_index ][i+1];
					if( v1 < v2 ){
						result = false;
						break;
					}
				}
				$gameSwitches.setValue( temp2, result );
			}
		}
		if(args.length == 10){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			
			if( type == "判断值" && temp1 == "是否完全匹配数组" ){	
				if( temp2.indexOf("数组值[") != -1 ){
					temp3 = temp3.replace("开关[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3); 
					temp2 = temp2.replace("数组值[","");
					temp2 = temp2.replace("]","");
					var temp_arr = temp2.split(/[，,]/);
					
					var result = true;
					// > 一一比对
					if( data_tank[ arr_index ].length == temp_arr.length ){
						for( var i=0; i < temp_arr.length; i++ ){
							if( data_tank[ arr_index ][i] != Number(temp_arr[i]) ){
								result = false;
								break;
							}
						}
					// > 数组长度不对，不匹配
					}else{
						result = false;
					}
					$gameSwitches.setValue( temp3, result );
					
				}else if( temp2.indexOf("数组[") != -1 ){
					temp3 = temp3.replace("开关[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3); 
					temp2 = temp2.replace("数组[","");
					temp2 = temp2.replace("]","");
					var arr2_index = $gameNumberArray.drill_CONA_getArrayIndex( temp2 );
					if( arr2_index == -1 ){ 
						$gameSwitches.setValue( temp3, false );
					}
					var temp_arr = data_tank[ arr2_index ];
					
					var result = true;
					// > 一一比对
					if( data_tank[ arr_index ].length == temp_arr.length ){
						for( var i=0; i < temp_arr.length; i++ ){
							if( data_tank[ arr_index ][i] != Number(temp_arr[i]) ){
								result = false;
								break;
							}
						}
					// > 数组长度不对，不匹配
					}else{
						result = false;
					}
					$gameSwitches.setValue( temp3, result );
				}
			}
		}
		
		
		/*-----------------集群操作 - 数组操作------------------*/
		if(args.length == 6){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "复制数组" && temp1.indexOf("数组[") != -1 ){	
				temp1 = temp1.replace("数组[","");
				temp1 = temp1.replace("]","");
				var arr2_index = $gameNumberArray.drill_CONA_getArrayIndex( temp1 );
				if( arr2_index == -1 ){ return; }
				data_tank[ arr_index ] = JSON.parse(JSON.stringify( data_tank[ arr2_index ] ));	//（深拷贝）
			}
			
			if( type == "重置数组" && temp1.indexOf("数组值[") != -1 ){	
				temp1 = temp1.replace("数组值[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[，,]/);
				data_tank[ arr_index ] = [];
				for( var i=0; i < temp_arr.length; i++ ){
					data_tank[ arr_index ].push( Number(temp_arr[i]) );
				}
			}
			
		}
		if(args.length == 4){
			var type = String(args[3]);
			
			if( type == "翻转数组" ){	
				var new_arr = [];
				for( var i= data_tank[ arr_index ].length-1; i >= 0; i-- ){
					new_arr.push( data_tank[ arr_index ][i] );
				}
				data_tank[ arr_index ] = new_arr;
			}
			
			if( type == "清空数组" ){	
				data_tank[ arr_index ] = [];
			}
			
			if( type == "DEBUG查看数组数据" ){	
				alert( na_id + ":" + JSON.stringify(data_tank[ arr_index ]) );
			}
		}
		
		/*-----------------集群操作 - 批量变量------------------*/
		if(args.length == 6){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "依次赋值到变量" ){	
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("]","");
				var range = temp1.split("至[");
				if( range.length >= 2 ){
					var start = Number(range[0]);
					var size = Number(range[1]) - Number(range[0]);
					for(var j=0; j <= size; j++ ){
						var value = data_tank[ arr_index ][ j ] || 0;
						$gameVariables.setValue( start + j, value );
					}
				}
			}
			if( type == "抽取成新数组" ){	
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("]","");
				var range = temp1.split("至[");
				if( range.length >= 2 ){
					var start = Number(range[0]);
					var size = Number(range[1]) - Number(range[0]);
					var new_arr = [];
					for(var j=0; j <= size; j++ ){
						var value = $gameVariables.value( start + j );
						new_arr.push(value);
					}
					data_tank[ arr_index ] = new_arr;
				}
			}
		}
		
		/*-----------------字符串相关------------------*/
		if( Imported.Drill_CoreOfString ){
			if(args.length == 6){
				var type = String(args[3]);
				var temp1 = String(args[5]);
				
				if( type == "转为字符串(空格连接)" && temp1.indexOf("字符串[") != -1 ){	
					temp1 = temp1.replace("字符串[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var result = "";
					var arr = data_tank[ arr_index ];
					for(var i = 0; i < arr.length; i++ ){
						result += String( arr[i] );
						if( i < arr.length -1 ){
							result += " ";
						}
					}
					if( Imported.Drill_CoreOfString ){
						$gameStrings.setValue( temp1, result );
					}else{
						alert( "【Drill_CoreOfNumberArray.js 系统 - 变量数组核心】\n" +
								"缺少 字符串核心 插件，插件指令执行失败。");
					}
				}
				
				if( type == "转为字符串(逗号连接)" && temp1.indexOf("字符串[") != -1 ){	
					temp1 = temp1.replace("字符串[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var result = "";
					var arr = data_tank[ arr_index ];
					for(var i = 0; i < arr.length; i++ ){
						result += String( arr[i] );
						if( i < arr.length -1 ){
							result += ",";
						}
					}
					if( Imported.Drill_CoreOfString ){
						$gameStrings.setValue( temp1, result );
					}else{
						alert( "【Drill_CoreOfNumberArray.js 系统 - 变量数组核心】\n" +
								"缺少 字符串核心 插件，插件指令执行失败。");
					}
				}
			}
		}
	}
};


