/*
Navicat MySQL Data Transfer

Source Server         : lrx
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : order_cms_db

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2022-07-23 10:50:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `categorys`
-- ----------------------------
DROP TABLE IF EXISTS `categorys`;
CREATE TABLE `categorys` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of categorys
-- ----------------------------
INSERT INTO `categorys` VALUES ('1', '爆款热销');
INSERT INTO `categorys` VALUES ('2', '冬季必点');
INSERT INTO `categorys` VALUES ('3', '限时优惠');
INSERT INTO `categorys` VALUES ('4', '本店招牌');
INSERT INTO `categorys` VALUES ('11', '酒水饮料');
INSERT INTO `categorys` VALUES ('12', '主食');

-- ----------------------------
-- Table structure for `coupons`
-- ----------------------------
DROP TABLE IF EXISTS `coupons`;
CREATE TABLE `coupons` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `full` int unsigned NOT NULL,
  `subtract` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of coupons
-- ----------------------------
INSERT INTO `coupons` VALUES ('1', '400', '88');
INSERT INTO `coupons` VALUES ('2', '200', '38');
INSERT INTO `coupons` VALUES ('3', '100', '18');
INSERT INTO `coupons` VALUES ('4', '50', '8');
INSERT INTO `coupons` VALUES ('5', '30', '5');
INSERT INTO `coupons` VALUES ('6', '20', '3');
INSERT INTO `coupons` VALUES ('7', '10', '2');

-- ----------------------------
-- Table structure for `evaluations`
-- ----------------------------
DROP TABLE IF EXISTS `evaluations`;
CREATE TABLE `evaluations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `reply` varchar(255) DEFAULT NULL,
  `score` int unsigned NOT NULL,
  `anonymous` tinyint(1) NOT NULL,
  `evaluate_time` datetime NOT NULL,
  `reply_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of evaluations
-- ----------------------------
INSERT INTO `evaluations` VALUES ('1', '144', '3', '好吃好吃，强烈推荐', null, '5', '1', '2022-04-17 16:42:18', null);
INSERT INTO `evaluations` VALUES ('2', '143', '3', '梅菜扣肉好好吃还有辣子鸡也是', '谢谢您的评价，欢迎下次再来品尝', '5', '0', '2022-04-18 11:41:04', '2022-04-18 16:10:38');
INSERT INTO `evaluations` VALUES ('3', '140', '3', '鱼香肉丝还行', '我们一定会努力改进的', '4', '0', '2022-04-18 13:40:37', '2022-04-18 16:11:30');
INSERT INTO `evaluations` VALUES ('4', '4', '3', '味道还行哦～', null, '5', '1', '2022-04-18 16:31:33', null);
INSERT INTO `evaluations` VALUES ('5', '148', '3', '好好吃', '谢谢', '5', '1', '2022-04-23 09:11:22', '2022-04-23 09:11:42');
INSERT INTO `evaluations` VALUES ('6', '149', '3', '123', null, '4', '1', '2022-04-24 16:50:13', null);

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `original_price` int unsigned NOT NULL,
  `discount_amount` int unsigned DEFAULT '0',
  `real_price` int unsigned NOT NULL,
  `raw_materials` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `category_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `goods_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '爆炒肥肠', '68', '0', '68', '肥肠,泡椒,红辣椒,葱,姜,蒜', '0', '2021-12-28 15:26:09', '2022-03-08 14:52:22', '爆炒肥肠 油而不腻 爆汁美味11111111111大撒大撒', '1');
INSERT INTO `goods` VALUES ('2', '小炒黄牛肉', '58', '0', '58', '牛肉,泡椒,红辣椒,葱,姜,蒜', '0', '2021-12-29 10:24:36', '2021-12-29 10:24:39', '', '1');
INSERT INTO `goods` VALUES ('18', '香菇滑鸡', '34', '0', '34', '香菇,鸡肉,青椒', '0', '2022-02-22 15:56:25', '2022-02-22 15:56:25', '香滑的鸡肉~', '1');
INSERT INTO `goods` VALUES ('19', '辣子鸡', '30', '0', '30', '鸡肉，花生米，朝天椒，大蒜叶', '0', '2022-02-22 16:01:53', '2022-02-22 16:01:53', '', '4');
INSERT INTO `goods` VALUES ('21', '土豆烧牛腩', '50', '4', '46', '土豆,牛腩', '0', '2022-02-22 16:17:06', '2022-02-22 16:17:06', '', '3');
INSERT INTO `goods` VALUES ('22', '鱼香肉丝', '30', '0', '30', '猪肉,红萝卜,青椒,红椒,木耳', '0', '2022-03-02 13:46:53', '2022-03-02 13:46:53', '', '1');
INSERT INTO `goods` VALUES ('23', '米饭', '2', '0', '2', '大米', '0', '2022-03-18 10:23:29', '2022-03-18 10:23:29', '', '12');
INSERT INTO `goods` VALUES ('24', '梅菜扣肉', '30', '0', '30', '五花肉,梅干菜', '0', '2022-04-10 14:15:55', '2022-04-10 14:15:55', '', '4');
INSERT INTO `goods` VALUES ('25', '糖醋里脊', '34', '0', '34', '里脊肉,鸡蛋,番茄酱,白砂糖,白醋', '0', '2022-04-10 14:18:52', '2022-04-10 14:18:52', '', '1');
INSERT INTO `goods` VALUES ('26', '上海青', '18', '0', '18', '小青菜', '0', '2022-04-10 14:20:30', '2022-04-10 14:20:30', '', '3');
INSERT INTO `goods` VALUES ('27', '酸辣土豆丝', '18', '0', '18', '土豆,红辣椒', '0', '2022-04-10 14:21:44', '2022-04-10 14:21:44', '', '4');

-- ----------------------------
-- Table structure for `goods_parameters`
-- ----------------------------
DROP TABLE IF EXISTS `goods_parameters`;
CREATE TABLE `goods_parameters` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `good_id` int unsigned DEFAULT NULL,
  `parameter_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `goods_parameters_ParameterId_GoodId_unique` (`good_id`,`parameter_id`),
  KEY `parameter_id` (`parameter_id`),
  CONSTRAINT `goods_parameters_ibfk_1061` FOREIGN KEY (`good_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goods_parameters_ibfk_1062` FOREIGN KEY (`parameter_id`) REFERENCES `parameters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods_parameters
-- ----------------------------
INSERT INTO `goods_parameters` VALUES ('53', '1', '2');
INSERT INTO `goods_parameters` VALUES ('54', '1', '4');
INSERT INTO `goods_parameters` VALUES ('55', '1', '5');
INSERT INTO `goods_parameters` VALUES ('48', '2', '1');
INSERT INTO `goods_parameters` VALUES ('49', '2', '2');
INSERT INTO `goods_parameters` VALUES ('27', '19', '1');
INSERT INTO `goods_parameters` VALUES ('28', '19', '2');
INSERT INTO `goods_parameters` VALUES ('29', '19', '4');
INSERT INTO `goods_parameters` VALUES ('30', '19', '5');
INSERT INTO `goods_parameters` VALUES ('31', '19', '6');
INSERT INTO `goods_parameters` VALUES ('32', '19', '10');
INSERT INTO `goods_parameters` VALUES ('7', '21', '2');
INSERT INTO `goods_parameters` VALUES ('8', '21', '4');

-- ----------------------------
-- Table structure for `goods_pics`
-- ----------------------------
DROP TABLE IF EXISTS `goods_pics`;
CREATE TABLE `goods_pics` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int unsigned NOT NULL,
  `pic_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`),
  CONSTRAINT `goods_pics_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods_pics
-- ----------------------------
INSERT INTO `goods_pics` VALUES ('15', '18', '/uploads/goods/e08ca6ca9cb54a7165868091e187f2d0.png');
INSERT INTO `goods_pics` VALUES ('18', '19', '/uploads/goods/054c9b96405d317adad2a9a0ba759e66.png');
INSERT INTO `goods_pics` VALUES ('19', '21', '/uploads/goods/156d93df5b34346af9d41f9ec94ea938.png');
INSERT INTO `goods_pics` VALUES ('20', '22', '/uploads/goods/ff1e0be506d86d376debe940b3bb3029.png');
INSERT INTO `goods_pics` VALUES ('33', '2', '/uploads/goods/906761ae808b66f72396407df3b6f315.png');
INSERT INTO `goods_pics` VALUES ('34', '23', '/uploads/goods/cd14b6874c84c856f37e872257f5a634.png');
INSERT INTO `goods_pics` VALUES ('37', '1', '/uploads/goods/900d6f68b81e31963888abf0faaf694e.png');
INSERT INTO `goods_pics` VALUES ('38', '24', '/uploads/goods/297dcaaeca3cbe541b4aea30eac25309.png');
INSERT INTO `goods_pics` VALUES ('39', '25', '/uploads/goods/6b014df6b44300be3c36492f1acef281.png');
INSERT INTO `goods_pics` VALUES ('40', '26', '/uploads/goods/e7b0ebe3bf9b78cdad5375d41d321689.png');
INSERT INTO `goods_pics` VALUES ('41', '27', '/uploads/goods/3d89b2b079d89c48949f1121ca8c1b70.png');

-- ----------------------------
-- Table structure for `menus`
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `level` int NOT NULL,
  `parent_id` int NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('1', '用户管理', '0', '0', 'users');
INSERT INTO `menus` VALUES ('2', '权限管理', '0', '0', 'power');
INSERT INTO `menus` VALUES ('3', '店铺管理', '0', '0', 'storefront');
INSERT INTO `menus` VALUES ('4', '商品管理', '0', '0', 'goods');
INSERT INTO `menus` VALUES ('5', '订单管理', '0', '0', 'orders');
INSERT INTO `menus` VALUES ('6', '用户列表', '1', '1', 'users');
INSERT INTO `menus` VALUES ('7', '角色列表', '1', '2', 'roles');
INSERT INTO `menus` VALUES ('8', '权限列表', '1', '2', 'rights');
INSERT INTO `menus` VALUES ('9', '店面管理', '1', '3', 'storefront');
INSERT INTO `menus` VALUES ('11', '商品列表', '1', '4', 'goods');
INSERT INTO `menus` VALUES ('12', '商品分类', '1', '4', 'categories');
INSERT INTO `menus` VALUES ('13', '订单列表', '1', '5', 'orders');
INSERT INTO `menus` VALUES ('14', '动态参数', '1', '4', 'params');
INSERT INTO `menus` VALUES ('15', '轮播图管理', '1', '3', 'swipers');
INSERT INTO `menus` VALUES ('16', '餐桌管理', '0', '0', 'tables');
INSERT INTO `menus` VALUES ('17', '餐桌信息', '1', '16', 'tables');
INSERT INTO `menus` VALUES ('18', '订单评价', '1', '5', 'evaluations');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `finish_time` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_price` int unsigned DEFAULT NULL,
  `discount_price` int unsigned DEFAULT NULL,
  `deal_price` int unsigned DEFAULT NULL,
  `order_time` datetime NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `number` int unsigned DEFAULT NULL,
  `table_id` int unsigned NOT NULL,
  `meals_number` int unsigned DEFAULT NULL,
  `evaluated` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('4', '3', '164819089749125184', '2022-04-08 16:24:12', '已完成', '204', '0', '204', '2022-03-25 14:48:17', '嘿嘿嘿哈哈哈', '6', '1', '4', '1');
INSERT INTO `orders` VALUES ('21', '3', '164931656924294932', '2022-04-07 15:44:29', '已取消', '2', '0', '2', '2022-04-07 15:29:29', '', '1', '1', '4', '0');
INSERT INTO `orders` VALUES ('27', '3', '164931851914531044', '2022-04-07 16:16:59', '已取消', '60', '0', '60', '2022-04-07 16:01:59', '', '2', '1', '4', '0');
INSERT INTO `orders` VALUES ('127', '3', '164992233929283330', '2022-04-14 16:00:39', '已取消', '98', '0', '98', '2022-04-14 15:45:39', '', '3', '2', '2', '0');
INSERT INTO `orders` VALUES ('128', '3', '164992264582068851', '2022-04-14 16:05:45', '已取消', '98', '0', '98', '2022-04-14 15:50:45', '', '3', '2', '2', '0');
INSERT INTO `orders` VALUES ('129', '3', '164992266685549739', '2022-04-14 16:06:06', '已取消', '98', '0', '98', '2022-04-14 15:51:06', '', '3', '2', '2', '0');
INSERT INTO `orders` VALUES ('135', '3', '164992568434978432', '2022-04-14 16:41:41', '已取消', '64', '0', '64', '2022-04-14 16:41:24', '', '2', '2', '2', '0');
INSERT INTO `orders` VALUES ('136', '3', '164992581926949265', '2022-04-14 16:45:50', '已取消', '82', '0', '82', '2022-04-14 16:43:39', '', '3', '1', '2', '0');
INSERT INTO `orders` VALUES ('137', '3', '164992583360676191', '2022-04-14 16:45:42', '已取消', '82', '0', '82', '2022-04-14 16:43:53', '', '3', '1', '2', '0');
INSERT INTO `orders` VALUES ('138', '3', '164992760764852742', '2022-04-14 17:28:27', '已取消', '64', '0', '64', '2022-04-14 17:13:27', '', '2', '2', '2', '0');
INSERT INTO `orders` VALUES ('139', '3', '164992858394358101', '2022-04-14 17:44:43', '已取消', '98', '0', '98', '2022-04-14 17:29:43', '', '3', '2', '2', '0');
INSERT INTO `orders` VALUES ('140', '3', '164992909300113246', '2022-04-15 10:49:11', '已完成', '64', '0', '64', '2022-04-14 17:38:13', '', '2', '1', '3', '1');
INSERT INTO `orders` VALUES ('141', '3', '164992913806418156', '2022-04-14 17:53:58', '已取消', '30', '0', '30', '2022-04-14 17:38:58', '', '1', '3', '2', '0');
INSERT INTO `orders` VALUES ('142', '3', '164999439376928561', '2022-04-15 12:01:33', '已取消', '98', '0', '98', '2022-04-15 11:46:33', '', '3', '2', '2', '0');
INSERT INTO `orders` VALUES ('143', '3', '165000340198577327', '2022-04-15 14:35:55', '已完成', '112', '0', '112', '2022-04-15 14:16:41', '', '6', '3', '3', '1');
INSERT INTO `orders` VALUES ('144', '3', '165000460089078150', '2022-04-15 17:44:06', '已完成', '50', '0', '50', '2022-04-15 14:36:40', '', '3', '7', '1', '1');
INSERT INTO `orders` VALUES ('145', '3', '165027060847113511', '2022-04-18 16:36:19', '已完成', '230', '0', '230', '2022-04-18 16:30:08', '嘿嘿嘿', '5', '1', '1', '0');
INSERT INTO `orders` VALUES ('146', '3', '165027553406970617', '2022-04-18 17:53:11', '已完成', '102', '0', '102', '2022-04-18 17:52:14', '', '2', '2', '1', '0');
INSERT INTO `orders` VALUES ('147', '3', '165027562866750264', '2022-04-18 18:08:48', '已取消', '34', '0', '34', '2022-04-18 17:53:48', '', '1', '1', '2', '0');
INSERT INTO `orders` VALUES ('148', '3', '165067614207438950', '2022-04-23 09:10:11', '已完成', '170', '0', '170', '2022-04-23 09:09:02', '', '3', '1', '2', '1');
INSERT INTO `orders` VALUES ('149', '3', '165078970319891348', '2022-04-24 16:43:04', '已完成', '150', '0', '150', '2022-04-24 16:41:43', '', '3', '1', '2', '1');
INSERT INTO `orders` VALUES ('150', '3', '165172205739636815', '2022-05-05 11:44:31', '已完成', '102', '0', '102', '2022-05-05 11:40:57', '', '2', '2', '2', '0');
INSERT INTO `orders` VALUES ('153', '3', '165188795509438698', '2022-05-13 11:11:30', '已完成', '84', '0', '84', '2022-05-07 09:45:55', '', '4', '6', '2', '0');
INSERT INTO `orders` VALUES ('154', '3', '165188800058464362', '2022-05-13 11:11:28', '已完成', '50', '0', '50', '2022-05-07 09:46:40', '', '3', '5', '1', '0');
INSERT INTO `orders` VALUES ('157', '3', '165321236544069219', '2022-05-22 17:54:25', '已取消', '98', '0', '98', '2022-05-22 17:39:25', '', '5', '2', '3', '0');
INSERT INTO `orders` VALUES ('159', '3', '165321256309015135', '2022-05-22 17:46:29', '已完成', '36', '0', '36', '2022-05-22 17:42:43', '嘿嘿嘿', '2', '1', '2', '0');
INSERT INTO `orders` VALUES ('160', '3', '165331146521328511', '2022-05-23 21:14:22', '已完成', '60', '0', '60', '2022-05-23 21:11:05', '', '2', '3', '2', '0');
INSERT INTO `orders` VALUES ('161', '3', '165335391862443580', null, '进行中', '36', '0', '36', '2022-05-24 08:58:38', '', '2', '2', '2', '0');
INSERT INTO `orders` VALUES ('162', '3', '165335496106337697', null, '进行中', '136', '0', '136', '2022-05-24 09:16:01', '', '2', '3', '3', '0');

-- ----------------------------
-- Table structure for `order_goods`
-- ----------------------------
DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned DEFAULT NULL,
  `params` varchar(255) DEFAULT NULL,
  `unit_price` int unsigned NOT NULL,
  `total_price` int unsigned NOT NULL,
  `number` int unsigned NOT NULL,
  `good_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of order_goods
-- ----------------------------
INSERT INTO `order_goods` VALUES ('1', '4', '葱:不加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('2', '4', '葱:不加;香菜:少加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('3', '4', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('4', '4', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('5', '4', '', '2', '4', '2', '23');
INSERT INTO `order_goods` VALUES ('27', '21', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('33', '27', '', '30', '60', '2', '22');
INSERT INTO `order_goods` VALUES ('144', '127', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('145', '127', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('146', '127', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('147', '128', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('148', '128', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('149', '128', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('150', '129', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('151', '129', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('152', '129', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('153', '130', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('154', '131', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('155', '132', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('156', '132', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('157', '133', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('158', '133', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('159', '135', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('160', '135', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('161', '136', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('162', '136', '', '18', '18', '1', '26');
INSERT INTO `order_goods` VALUES ('163', '136', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('164', '137', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('165', '137', '', '18', '18', '1', '26');
INSERT INTO `order_goods` VALUES ('166', '137', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('167', '138', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('168', '138', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('169', '139', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('170', '139', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('171', '139', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('172', '140', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('173', '140', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('174', '141', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('175', '142', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('176', '142', '', '30', '30', '1', '22');
INSERT INTO `order_goods` VALUES ('177', '142', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('178', '143', '', '18', '18', '1', '26');
INSERT INTO `order_goods` VALUES ('179', '143', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('180', '143', '辣度:不辣;葱:不加;香菜:不加;麻度:不麻;温度:冷;蒜:多加;', '30', '60', '2', '19');
INSERT INTO `order_goods` VALUES ('181', '143', '', '2', '4', '2', '23');
INSERT INTO `order_goods` VALUES ('182', '144', '', '18', '18', '1', '27');
INSERT INTO `order_goods` VALUES ('183', '144', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('184', '144', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('185', '145', '葱:不加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('186', '145', '葱:少加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('187', '145', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('188', '145', '', '30', '60', '2', '22');
INSERT INTO `order_goods` VALUES ('189', '146', '葱:不加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('190', '146', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('191', '147', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('192', '148', '葱:不加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('193', '148', '葱:多加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('194', '148', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('195', '149', '辣度:不辣;葱:不加;', '58', '58', '1', '2');
INSERT INTO `order_goods` VALUES ('196', '149', '辣度:微辣;葱:不加;', '58', '58', '1', '2');
INSERT INTO `order_goods` VALUES ('197', '149', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('198', '150', '葱:多加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('199', '150', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('207', '153', '', '34', '34', '1', '25');
INSERT INTO `order_goods` VALUES ('208', '153', '葱:不加;香菜:不加;', '46', '46', '1', '21');
INSERT INTO `order_goods` VALUES ('209', '153', '', '2', '4', '2', '23');
INSERT INTO `order_goods` VALUES ('210', '154', '', '18', '18', '1', '27');
INSERT INTO `order_goods` VALUES ('211', '154', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('212', '154', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('213', '155', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('214', '155', '', '18', '36', '2', '27');
INSERT INTO `order_goods` VALUES ('215', '155', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('216', '155', '辣度:中辣;葱:不加;香菜:不加;麻度:不麻;温度:冷;蒜:多加;', '30', '30', '1', '19');
INSERT INTO `order_goods` VALUES ('217', '156', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('218', '156', '', '18', '36', '2', '27');
INSERT INTO `order_goods` VALUES ('219', '156', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('220', '156', '辣度:中辣;葱:不加;香菜:不加;麻度:不麻;温度:冷;蒜:多加;', '30', '30', '1', '19');
INSERT INTO `order_goods` VALUES ('221', '157', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('222', '157', '', '18', '36', '2', '27');
INSERT INTO `order_goods` VALUES ('223', '157', '', '30', '30', '1', '24');
INSERT INTO `order_goods` VALUES ('224', '157', '辣度:中辣;葱:不加;香菜:不加;麻度:不麻;温度:冷;蒜:多加;', '30', '30', '1', '19');
INSERT INTO `order_goods` VALUES ('227', '159', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('228', '159', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('229', '160', '辣度:不辣;葱:不加;', '58', '58', '1', '2');
INSERT INTO `order_goods` VALUES ('230', '160', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('231', '161', '', '34', '34', '1', '18');
INSERT INTO `order_goods` VALUES ('232', '161', '', '2', '2', '1', '23');
INSERT INTO `order_goods` VALUES ('233', '162', '葱:不加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');
INSERT INTO `order_goods` VALUES ('234', '162', '葱:多加;香菜:不加;麻度:不麻;', '68', '68', '1', '1');

-- ----------------------------
-- Table structure for `parameters`
-- ----------------------------
DROP TABLE IF EXISTS `parameters`;
CREATE TABLE `parameters` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `list` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of parameters
-- ----------------------------
INSERT INTO `parameters` VALUES ('1', '不辣,微辣,中辣,特辣', '辣度');
INSERT INTO `parameters` VALUES ('2', '不加,少加,多加', '葱');
INSERT INTO `parameters` VALUES ('4', '不加,少加,多加', '香菜');
INSERT INTO `parameters` VALUES ('5', '不麻,微麻,中麻,特麻', '麻度');
INSERT INTO `parameters` VALUES ('6', '冷,热', '温度');
INSERT INTO `parameters` VALUES ('10', '多加,少加,不加', '蒜');

-- ----------------------------
-- Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `menu_list` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', '店长', '商店管理管理员', '3,9,15,4,11,12,14,5,13,18,16,17');
INSERT INTO `roles` VALUES ('2', '前台', '前台小姐姐', '');
INSERT INTO `roles` VALUES ('3', '服务员1', '苦逼服务员小哥', '');

-- ----------------------------
-- Table structure for `stores`
-- ----------------------------
DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `notice` text,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of stores
-- ----------------------------
INSERT INTO `stores` VALUES ('1', '我要吃饭点餐', '/uploads/logo/b32af7dbb7866a0a64afa00d9fa0942b.png', '08:00:00', '23:30:00', '新店开业，欢迎大家来品尝！新店开业，欢迎大家来品尝！', '18873886666', '科技大学南堕', '湖南省', '湘潭市', '雨湖区');

-- ----------------------------
-- Table structure for `swipers`
-- ----------------------------
DROP TABLE IF EXISTS `swipers`;
CREATE TABLE `swipers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pic_url` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of swipers
-- ----------------------------
INSERT INTO `swipers` VALUES ('2', '/uploads/swipers/1.jpg', '1', '2022-01-21 15:22:08', '2022-01-21 15:22:10');
INSERT INTO `swipers` VALUES ('3', '/uploads/swipers/2.jpg', '1', '2022-01-21 15:22:13', '2022-01-21 15:22:16');
INSERT INTO `swipers` VALUES ('4', '/uploads/swipers/3.png', '1', '2022-01-21 15:22:18', '2022-01-21 15:22:21');
INSERT INTO `swipers` VALUES ('6', '/uploads/swipers/f7086d0db8c0134b848ded588adbce19.png', '0', '2022-03-05 15:15:57', '2022-03-05 15:15:57');
INSERT INTO `swipers` VALUES ('7', '/uploads/swipers/af870c75b977adbea2c3fd793b3c1c65.png', '0', '2022-03-05 15:18:19', '2022-03-05 15:18:19');
INSERT INTO `swipers` VALUES ('9', '/uploads/swipers/e746a3e11b4c6a259b3554277b5c812e.png', '0', '2022-04-14 17:48:03', '2022-04-14 17:48:03');

-- ----------------------------
-- Table structure for `tables`
-- ----------------------------
DROP TABLE IF EXISTS `tables`;
CREATE TABLE `tables` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `occupy` tinyint(1) DEFAULT '0',
  `complete` tinyint(1) DEFAULT '1',
  `contain` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tables_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tables
-- ----------------------------
INSERT INTO `tables` VALUES ('1', '1号桌', '0', null, '4');
INSERT INTO `tables` VALUES ('2', '2号桌', '1', '0', '4');
INSERT INTO `tables` VALUES ('3', '3号桌', '1', '0', '4');
INSERT INTO `tables` VALUES ('4', '4号桌', '0', null, '4');
INSERT INTO `tables` VALUES ('5', '5号桌', '0', null, '2');
INSERT INTO `tables` VALUES ('6', '6号桌', '0', null, '2');
INSERT INTO `tables` VALUES ('7', '7号桌', '0', null, '2');
INSERT INTO `tables` VALUES ('8', '8号桌', '0', null, '2');
INSERT INTO `tables` VALUES ('9', '9号桌', '0', null, '8');
INSERT INTO `tables` VALUES ('10', '10号桌', '0', null, '8');
INSERT INTO `tables` VALUES ('11', '11号桌', '0', null, '4');
INSERT INTO `tables` VALUES ('12', '12号桌', '0', null, '4');
INSERT INTO `tables` VALUES ('13', '13号桌', '0', null, '4');
INSERT INTO `tables` VALUES ('14', '14号桌', '0', null, '4');
INSERT INTO `tables` VALUES ('15', '15号桌', '0', null, '12');
INSERT INTO `tables` VALUES ('16', '16号桌', '0', null, '12');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL DEFAULT '-1',
  `status` tinyint(1) DEFAULT '0',
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '$2a$10$BrBBaexL4M7PeIWCMJsAzut8XfrZSao934GoTWrThz5BF6xbXtMVK', '0', '1', 'raysealee@foxmail.com', '2021-12-16 10:18:24', '2022-03-31 14:49:28');
INSERT INTO `users` VALUES ('5', 'ray', '$2a$10$MkKrbdOgU3uKrSIahvOTqeWSgX.mFAiTv6RuB7ln82lJ3upEZnCJa', '3', '0', 'ray@foxmai.com', '2021-12-16 11:13:18', '2021-12-17 14:10:00');
INSERT INTO `users` VALUES ('6', 'asd', '$2a$10$FGBb4u4yAFCmk07hfyU7KuvWIWhyhUFoG.Ms3dtpffeNGkDbGoeW.', '-1', '0', 'asde@q.cn', '2021-12-16 11:31:21', '2021-12-22 11:12:53');
INSERT INTO `users` VALUES ('7', '123', '$2a$10$P.JfKZWc3/dVQw8Ejo5CIOiDlk9uu6QOZgOldWkEDCYg70VJti6Ty', '3', '0', '1234@qq.com', '2021-12-16 16:37:18', '2022-03-31 15:29:10');
INSERT INTO `users` VALUES ('11', 'Lee', '$2a$10$n0Yt.D5qSt1qpGx3Yf917ufzY1JnPWDYD0WrMOro24xcF.ZXSk/pa', '1', '1', 'lee@lee.com', '2021-12-20 14:21:03', '2021-12-20 14:21:50');

-- ----------------------------
-- Table structure for `wx_users`
-- ----------------------------
DROP TABLE IF EXISTS `wx_users`;
CREATE TABLE `wx_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of wx_users
-- ----------------------------
INSERT INTO `wx_users` VALUES ('3', 'oeFQK5gbn8GPru5Vn0gh5aujHP80', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKphK4JoAF7H5s2wV48YlW1t2TaWfNJlJFAPpcicyuvjO1ZEfZSoRxo8EeQiaGLwEicBStuoS7ECCuHw/132', '0', '', '', '', 'Lee');
