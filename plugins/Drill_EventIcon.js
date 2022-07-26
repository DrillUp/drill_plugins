//=============================================================================
// Drill_EventIcon.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - 图标行走图
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventIcon +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将指定事件的行走图 变成一个临时的图标行走图。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 并且可以作用于其他插件。
 * 作用于：
 *   - Drill_EventItemGenerator     物体管理-可拾取物生成器
 *     如果使用了该插件，目标插件生成的所有道具会自动换成图标行走图。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效。
 * 细节：
 *   (1.注意名词：物品/武器/护甲/技能
 *      护甲=防具，物品=道具，这两个名词是同一个意思，指令写防具、道具都有效。
 *      另外，没有下列名词：装备/装甲/装束 。
 * 图标：
 *   (1.行走图在游戏中即时生成，不需要图片资源。
 *   (2.插件的使用面比较窄，只能画固定图标的行走图。
 *   (3.插件的行走图大小固定为 144x192 。
 * 设计：
 *   (1.你没必要专门去画一个图标作为行走图来使用，
 *      通过图标行走图插件可以节省许多重复的资源配置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指定图标id
 * 你可以通过设置事件注释，将目标注释变成图标：
 * （注意，冒号左右都有一个空格）
 * 
 * 事件注释：=>图标行走图 : 设置图标 : 图标[1]
 * 事件注释：=>图标行走图 : 设置图标 : 图标变量[21]
 * 
 * 1."图标[1]"表示图标的id，设置后，行走图将自动切换为图标。
 *   注意，事件注释只在事件页切换时才会激活并赋值图标。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 配置的图标
 * 你也可以设置与你在数据库中配置的图标一样：
 * （注意，冒号左右都有一个空格）
 * 
 * 事件注释：=>图标行走图 : 设置物品图标 : 物品[1]
 * 事件注释：=>图标行走图 : 设置武器图标 : 武器[1]
 * 事件注释：=>图标行走图 : 设置护甲图标 : 护甲[1]
 * 事件注释：=>图标行走图 : 设置技能图标 : 技能[1]
 *
 * 事件注释：=>图标行走图 : 设置物品图标 : 物品名[南瓜]
 * 事件注释：=>图标行走图 : 设置武器图标 : 武器名[方片晶块]
 * 事件注释：=>图标行走图 : 设置护甲图标 : 护甲名[抗火戒]
 * 事件注释：=>图标行走图 : 设置技能图标 : 技能名[重击]
 *
 * 1."物品[1]"表示匹配物品的id，
 *   "物品名[南瓜]"则表示匹配物品的名字。
 * （如果有重名的物品，则按照id小的物品来）
 * （如果物品名有空格，则事件注释会失效）
 * 2.由于是固定的事件注释，所以 不能设置"物品变量[21]"的情况。
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
 * 时间复杂度： o(n)
 * 测试方法：   在物体管理层、地理管理层、镜像管理层放置了宝物弹出箱。
 *              弹出大量道具测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件为单次执行，画完图片就结束工作了，性能几乎可以忽略。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了插件指令和注释。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EI（Event_Icon）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	125个事件的地图，弹出30个道具
//		★性能测试消耗	4.97ms ~ 1.22ms（低于5ms的都是小到无法估计的值）
//		★最坏情况		无
//		★备注			由于插件只是绘制图片，本来想执行10000次，但是这样并不能体现出这个插件性能有多好。
//						毕竟使用面太窄了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图标行走图：
//				->覆盖事件行走图设置
//				->获取/绘制图标bitmap
//				->物品、武器、护甲、技能 四大分类
//
//		★必要注意事项：
//			暂无。
//			
//		★其它说明细节：
//			1.本来打算覆写Sprite_Character.prototype.setCharacterBitmap。
//			  但是这样做存在一个问题，就是图片没有进入缓冲池，所以还是得修改ImageManager底层。
//
//		★存在的问题：
//			1.有一个比较不明用途的函数：ImageManager.requestCharacter。（2022-1-6 此函数与载入一样，只是载入失败不会报错。）
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventIcon = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventIcon');
	
	
//=============================================================================
// ** 事件注释设置
//=============================================================================
var _drill_EI_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function(){
	_drill_EI_setupPageSettings.call(this);
    var page = this.page();
    var image = page.image;
    if( page && image.tileId <= 0 ){
		
		this.list().forEach(function( l ){	//将页面注释转成插件指令格式
			if( l.code === 108 ){
				var args = l.parameters[0].split(' ');
				var command = args.shift();
				
				if( command == "=>图标行走图" ){
					if( args.length == 4 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						
						if( type == "设置图标" ){
							if( temp1.indexOf("图标[") != -1 ){
								temp1 = temp1.replace("图标[","");
								temp1 = temp1.replace("]","");
								var temp_name = "$DrillEIIconSet_" + temp1;
								this.setImage(temp_name, image.characterIndex);
								
							}else if( temp1.indexOf("图标变量[") != -1 ){
								temp1 = temp1.replace("图标变量[","");
								temp1 = temp1.replace("]","");
								var temp_name = "$DrillEIIconSet_" + String( $gameVariables.value( Number(temp1) ) );
								this.setImage(temp_name, image.characterIndex);
								
							}else{	//（旧指令）
								var temp_name = "$DrillEIIconSet_" + temp1;
								this.setImage(temp_name, image.characterIndex);
							}
						}
						
						if( type == "设置物品图标" || type == "设置道具图标" ){
							var icon_i = "";
							var re = /^\d+$/;
							if( temp1.indexOf("物品[") != -1 ||
								temp1.indexOf("道具[") != -1 ){
								temp1 = temp1.replace("物品[","");
								temp1 = temp1.replace("道具[","");
								temp1 = temp1.replace("]","");
								var item_id = Number(temp1) ;
								if( $dataItems[item_id] != null ){
									icon_i = String( $dataItems[item_id].iconIndex );
								}
								
							}else if( temp1.indexOf("物品名[") != -1 ||
									  temp1.indexOf("道具名[") != -1 ){
								temp1 = temp1.replace("物品名[","");
								temp1 = temp1.replace("道具名[","");
								temp1 = temp1.replace("]","");
								for( var i = 0; i < $dataItems.length; i++ ){
									if( $dataItems[i] == null ){continue;}
									if( $dataItems[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataItems[i].iconIndex );
										break;
									}
								}
								
							}else if( re.test(temp1) ){	//（旧指令，数字）
								var item_id = Number(temp1) ;
								if( $dataItems[item_id] != null ){
									icon_i = String( $dataItems[item_id].iconIndex );
								}
							}else{						//（旧指令，名称）
								for( var i = 0; i < $dataItems.length; i++ ){
									if( $dataItems[i] == null ){continue;}
									if( $dataItems[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataItems[i].iconIndex );
										break;
									}
								}
							}
							if( icon_i != "" ){
								var temp_name = "$DrillEIIconSet_" + icon_i;
								this.setImage(temp_name, image.characterIndex);
							}
						}
						
						if( type == "设置武器图标" ){
							var icon_i = "";
							var re = /^\d+$/;
							if( temp1.indexOf("武器[") != -1 ){
								temp1 = temp1.replace("武器[","");
								temp1 = temp1.replace("]","");
								var item_id = Number(temp1) ;
								if( $dataWeapons[item_id] != null ){
									icon_i = String( $dataWeapons[item_id].iconIndex );
								}
								
							}else if( temp1.indexOf("武器名[") != -1 ){
								temp1 = temp1.replace("武器名[","");
								temp1 = temp1.replace("]","");
								for( var i = 0; i < $dataWeapons.length; i++ ){
									if( $dataWeapons[i] == null ){continue;}
									if( $dataWeapons[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataWeapons[i].iconIndex );
										break;
									}
								}
					
							}else if( re.test(temp1) ){	//（旧指令，数字）
								var item_id = Number(temp1) ;
								if( $dataWeapons[item_id] != null ){
									icon_i = String( $dataWeapons[item_id].iconIndex );
								}
							}else{						//（旧指令，名称）
								for( var i = 0; i < $dataWeapons.length; i++ ){
									if( $dataWeapons[i] == null ){continue;}
									if( $dataWeapons[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataWeapons[i].iconIndex );
										break;
									}
								}
							}
							if( icon_i != "" ){
								var temp_name = "$DrillEIIconSet_" + icon_i;
								this.setImage(temp_name, image.characterIndex);
							}
						}
						
						if( type == "设置护甲图标" || type == "设置防具图标" ){
							var icon_i = "";
							var re = /^\d+$/;
							if( temp1.indexOf("护甲[") != -1 ||
								temp1.indexOf("防具[") != -1 ){
								temp1 = temp1.replace("护甲[","");
								temp1 = temp1.replace("防具[","");
								temp1 = temp1.replace("]","");
								var item_id = Number(temp1) ;
								if( $dataArmors[item_id] != null ){
									icon_i = String( $dataArmors[item_id].iconIndex );
								}
								
							}else if( temp1.indexOf("护甲名[") != -1 ||
									  temp1.indexOf("防具名[") != -1 ){
								temp1 = temp1.replace("护甲名[","");
								temp1 = temp1.replace("防具名[","");
								temp1 = temp1.replace("]","");
								for( var i = 0; i < $dataArmors.length; i++ ){
									if( $dataArmors[i] == null ){continue;}
									if( $dataArmors[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataArmors[i].iconIndex );
										break;
									}
								}
								
							}else if( re.test(temp1) ){	//（旧指令，数字）
								var item_id = Number(temp1) ;
								if( $dataArmors[item_id] != null ){
									icon_i = String( $dataArmors[item_id].iconIndex );
								}
							}else{						//（旧指令，名称）
								for( var i = 0; i < $dataArmors.length; i++ ){
									if( $dataArmors[i] == null ){continue;}
									if( $dataArmors[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataArmors[i].iconIndex );
										break;
									}
								}
							}
							if( icon_i != "" ){
								var temp_name = "$DrillEIIconSet_" + icon_i;
								this.setImage(temp_name, image.characterIndex);
							}
						}
						
						if( type == "设置技能图标"){
							var icon_i = "";
							var re = /^\d+$/;
							if( temp1.indexOf("技能[") != -1 ){
								temp1 = temp1.replace("技能[","");
								temp1 = temp1.replace("]","");
								var item_id = Number(temp1) ;
								if( $dataSkills[item_id] != null ){
									icon_i = String( $dataSkills[item_id].iconIndex );
								}
								
							}else if( temp1.indexOf("技能名[") != -1 ){
								temp1 = temp1.replace("技能名[","");
								temp1 = temp1.replace("]","");
								for( var i = 0; i < $dataSkills.length; i++ ){
									if( $dataSkills[i] == null ){continue;}
									if( $dataSkills[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataSkills[i].iconIndex );
										break;
									}
								}
								
							}else if( re.test(temp1) ){	//（旧指令，数字）
								var item_id = Number(temp1) ;
								if( $dataSkills[item_id] != null ){
									icon_i = String( $dataSkills[item_id].iconIndex );
								}
							}else{						//（旧指令，名称）
								for( var i = 0; i < $dataSkills.length; i++ ){
									if( $dataSkills[i] == null ){continue;}
									if( $dataSkills[i].name == temp1 ){			//（根据名称搜索）
										icon_i = String( $dataSkills[i].iconIndex );
										break;
									}
								}
							}
							if( icon_i != "" ){
								var temp_name = "$DrillEIIconSet_" + icon_i;
								this.setImage(temp_name, image.characterIndex);
							}
						}
					}
				};  
			};
		}, this);
    }
}

//=============================================================================
// ** 拦截读取图片
//=============================================================================
var _drill_EI_loadBitmap = ImageManager.loadBitmap;
ImageManager.loadBitmap = function( folder, filename, hue, smooth ){
	var temp = String(filename).split("_");
	if( temp[0] == "$DrillEIIconSet" ){		//拦截所有图片名为 $DrillEIIconSet 的图片
        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = this.drill_EI_loadNormalBitmap(path, hue || 0 , Number(temp[1]) );
        bitmap.smooth = smooth;
        return bitmap;
    } else {
        return _drill_EI_loadBitmap.call(this, folder, filename, hue, smooth);
    }
};
//=============================================================================
// ** 图片缓冲池（复制新写）
//=============================================================================
ImageManager.drill_EI_loadNormalBitmap = function( path, hue, icon_index ){
    var key = this._generateCacheKey(path, hue);
    var bitmap = this._imageCache.get(key);
    if( !bitmap ){
        bitmap = ImageManager.drill_EI_drawIconBitmap(icon_index);
        bitmap.addLoadListener(function(){
            bitmap.rotateHue(hue);
        });
        this._imageCache.add(key, bitmap);
    }else if(!bitmap.isReady()){
        bitmap.decode();
    }

    return bitmap;
};
//=============================================================================
// ** 创建bitmap对象
//=============================================================================
ImageManager.drill_EI_drawIconBitmap = function( icon_index ){
	var cur_bitmap = new Bitmap( 144 , 192 );
	var pbitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth ;
	var ph = Window_Base._iconHeight ;
	var px = icon_index % 16 * pw ;
	var py = Math.floor(icon_index / 16) * ph;
	var icon_size = 1;
	cur_bitmap._context.imageSmoothingEnabled = false;
	var icon_x = 8;
	var icon_y = 8;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y - 2, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y + 2, pw*icon_size, ph*icon_size);
	
	 icon_x -= 48*2;
	 icon_y += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y - 2, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y + 2, pw*icon_size, ph*icon_size);
	
	 icon_x -= 48*2;
	 icon_y += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y - 2, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y + 2, pw*icon_size, ph*icon_size);
	
	 icon_x -= 48*2;
	 icon_y += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y - 2, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y, pw*icon_size, ph*icon_size);
	 icon_x += 48;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y + 2, pw*icon_size, ph*icon_size);
	cur_bitmap._context.imageSmoothingEnabled = true;
	
    return cur_bitmap;
};


