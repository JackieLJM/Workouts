/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : mybookdb

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2018-09-11 12:22:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article_table
-- ----------------------------
DROP TABLE IF EXISTS `article_table`;
CREATE TABLE `article_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(20) NOT NULL,
  `author_src` varchar(100) NOT NULL,
  `title` varchar(60) NOT NULL,
  `post_time` int(11) NOT NULL,
  `content` text NOT NULL,
  `summary` varchar(100) DEFAULT NULL,
  `n_like` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_table
-- ----------------------------
INSERT INTO `article_table` VALUES ('1', 'lancy', 'upload/1.jpg', 'test', '1532481752', '本次展览主旨结合2017年上海旅游节相关精彩活动，围绕“相约一带一路”主题，秉承“人民大众节日”的办节宗旨，为上海市民和旅游者倡导全新的文化旅游概念，进一步提升上海旅游节庆活动的文化内涵。回顾展正值2017上海旅游节期间，通过往届旅游节的精彩活动，展示上海旅游文化以及相关理念、各区县的旅游特色，让市民和游客能够充分体验上海特色、品味历史文化、欣赏风貌景观、感受城市气息，将海派文化、城市特色传递给每个旅游爱好者。\r\n\r\n\r\n\r\n展览时间： 2017年9月9日至2017年10月6日\r\n\r\n\r\n\r\n展览地点： 武康路393号甲', '为上海市民和旅游者倡导全新的文化旅游概念', '40');
INSERT INTO `article_table` VALUES ('2', 'sdfsd', 'sdfs', 'sdfsd', '1532491501', '7月24日，上海植物园工作人员在黄母祠附近发现一只成年的貉（Nyctereutesprocyonoides），此貉在被发现后小跑而去。据悉，虽然植物园游人如织，夏季也经常开展夜游活动，但此前还未有在植物园有观察到貉的踪迹。\r\n　　近年来，随着市民生态意识的不断提高，对野生动物的关注程度与日俱增。貉，作为一种中型野生兽类，已经适应于上海各处公园绿地，乃至住宅小区，现已在上海动物园、共青森林公园等多个公园以及周边的别墅区，郊区的住宅区被发现，其中不乏有繁殖记录。\r\n　　据介绍，貉是杂食性动物，城市性情温和，不会攻击人。野外的貉主要以小型动物、植物果实和种子为食，城市中的貉可能会以厨余垃圾以及人为丢弃的食品残渣为食。\r\n　　上海植物园提醒：目前正值貉繁殖期，市民可能会在部分公园僻静处或小区无人处发现貉或者其踪迹，不必担心其会对人造成伤害。如果遇到它们，可以在不干扰到它们正常活动的情况下对它们进行观察，或是绕道而行，避免惊吓到它们。', 'sdfsd', '29');

-- ----------------------------
-- Table structure for banner_table
-- ----------------------------
DROP TABLE IF EXISTS `banner_table`;
CREATE TABLE `banner_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `sub_title` varchar(30) DEFAULT NULL,
  `src` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner_table
-- ----------------------------
INSERT INTO `banner_table` VALUES ('1', '微游上海&美食', '黄瑾', 'upload/1.jpg');
INSERT INTO `banner_table` VALUES ('2', '旅途风景', '陈明', 'upload/2.jpg');
INSERT INTO `banner_table` VALUES ('3', '游客旅途留念', 'zjx', 'upload/3.jpg');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `info` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('8', '沪上“婴戏图”画家难寻？ 贺竹元别具一格精品展示受关注dfs', '沪上“婴戏图”画家难寻？ 贺竹元别具一格精品展示受关注sdf');
INSERT INTO `news` VALUES ('9', 'fsdfsd54', 'fsdfsdfsdf555');
INSERT INTO `news` VALUES ('10', '沪上“婴戏图”画家难寻？ 贺竹元别具一格精品展示受关注', '沪上“婴戏图”画家难寻？ 贺竹元别具一格精品展示受关注');
INSERT INTO `news` VALUES ('12', 'fsdfsd333', 'fsdfsdfsdf33333');
INSERT INTO `news` VALUES ('13', 'lancy\'s yaqin', 'lancy\'s yaqin lancy\'s yaqinlancy\'s yaqinlancy\'s yaqin');
INSERT INTO `news` VALUES ('19', 'dfgdf', 'dfgdfgd');
INSERT INTO `news` VALUES ('20', 'dfgasdf333', 'sdfsdfsd33333');
INSERT INTO `news` VALUES ('22', 'sdfsd', 'sdfsdfsd');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(52) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'lancy', '123456');
INSERT INTO `user` VALUES ('2', 'yaqin', '123563');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) NOT NULL,
  `UserPass` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', 'lancy', '430e39cf0eec69892a0fdb6b0dc4aa70');
INSERT INTO `userinfo` VALUES ('2', 'yaxin', '919890b2ad65d3c05db93abe2f87e9d9');
INSERT INTO `userinfo` VALUES ('3', 'sun', '21218cca77804d2ba1922c33e0151105');
