var mysql = require('mysql');
var config = require('../config/default.js');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

var query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return resolve(err);
      } else {
        connection.query(sql, val, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

let videos = `create table if not exists videos(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     country VARCHAR(100) NOT NULL,
     classify VARCHAR(100) NOT NULL,
     time1 VARCHAR(40) NOT NULL,
     img VARCHAR(40) NOT NULL,
     star VARCHAR(40) NOT NULL,
     timelong VARCHAR(40) NOT NULL,
     type VARCHAR(40) NOT NULL,
     actors VARCHAR(100) NOT NULL,
     detail VARCHAR(1000) NOT NULL,
     PRIMARY KEY ( id )
    );`;
let users = `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL,
     password VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`;
let mobileusers = `create table if not exists mobileusers(
     id INT NOT NULL AUTO_INCREMENT,
     userName VARCHAR(100) NOT NULL,
     password VARCHAR(100) NOT NULL,
     avator VARCHAR(100) NOT NULL DEFAULT '',
     time VARCHAR(100) NOT NULL DEFAULT '',
     PRIMARY KEY ( id )
    );`;
let comments = `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(100) NOT NULL,
    date VARCHAR(100) NOT NULL,
    content VARCHAR(100) NOT NULL,
    videoName VARCHAR(100) NOT NULL,
    uid VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL DEFAULT '',
    PRIMARY KEY ( id )
    );`;
let likes = `create table if not exists likes(
    id INT NOT NULL AUTO_INCREMENT,
    iLike VARCHAR(100) NOT NULL,
    userName VARCHAR(100) NOT NULL,
    videoName VARCHAR(100) NOT NULL,
    videoImg VARCHAR(100) NOT NULL,
    star VARCHAR(100) NOT NULL,
    uid VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
    );`;
let createTable = sql => {
  return query(sql, []);
};
// ??????
createTable(videos);
createTable(users);
createTable(mobileusers);
createTable(comments);
createTable(likes);
// ??????????????????
let addUser = value => {
  let _sql = `insert into users set username=?,password=?`;
  return query(_sql, value);
};
// ??????????????????
let deleteUser = name => {
  let _sql = `delete from users where username="${name}"; `;
  return query(_sql);
};
// ????????????
let findUser = name => {
  var _sql = `select * from users where username="${name}"; `;
  return query(_sql);
};
// ??????????????????
let findData = table => {
  var _sql = `select * from ${table}; `;
  return query(_sql);
};
// ??????????????????
let findPageData = (table, page, num) => {
  var _sql = `select * from ${table} limit ${(page - 1) * num},${num}; `;
  return query(_sql);
};
// ??????cls??????
let findDataByCls = cls => {
  var _sql = `select * from videos where classify="${cls}"; `;
  return query(_sql);
};
// ??????id??????
let findDataById = id => {
  var _sql = `select * from videos where id="${id}"; `;
  return query(_sql);
};
// ??????video??????
let insertData = value => {
  let _sql = `insert into videos set name=?,country=?,classify=?,time1=?,img=?,star=?,timelong=?,type=?,actors=?,detail=?;`;
  return query(_sql, value);
};
let updateDataHasImg = value => {
  let _sql = `update videos set name=?,country=?,classify=?,time1=?,img=?,star=?,timelong=?,type=?,actors=?,detail=? where id=?; `;
  return query(_sql, value);
};
let updateDataNoneImg = value => {
  let _sql = `update videos set name=?,country=?,classify=?,time1=?,star=?,timelong=?,type=?,actors=?,detail=? where id=?; `;
  return query(_sql, value);
};
let updateLikesImg = value => {
  let _sql = `update likes set videoImg=? where uid=?; `;
  return query(_sql, value);
};
let updateLikeName = value => {
  let _sql = `update likes set videoName=? where uid=?; `;
  return query(_sql, value);
};
let updateCommentName = value => {
  let _sql = `update comments set videoName=? where uid=?; `;
  return query(_sql, value);
};
// ??????video
let deleteVideo = id => {
  let _sql = `delete from videos where id="${id}"; `;
  return query(_sql);
};
let getDataById = id => {
  var _sql = `select * from videos where id="${id}"; `;
  return query(_sql);
};

// ?????????????????????

// ???????????????????????????
let findMobileUserByName = name => {
  var _sql = `select * from mobileusers where userName="${name}";`;
  return query(_sql);
};

// ??????????????????
let addMobileUser = value => {
  var _sql = `insert into mobileusers set userName=?,password=?,time=?`;
  return query(_sql, value);
};
// ????????????????????????????????????
let checkUser = value => {
  var _sql = `select * from mobileusers where userName=?;`;
  return query(_sql, value);
};

// ????????????????????? comment???like???????????????
let updateMobileName = value => {
  var _sql = `update mobileusers set userName=? where userName=?;`;
  return query(_sql, value);
};
let updateMobileCommentName = value => {
  var _sql = `update comments set userName=? where userName=?;`;
  return query(_sql, value);
};
let updateMobileLikeName = value => {
  var _sql = `update likes set userName=? where userName=?;`;
  return query(_sql, value);
};

// ????????????
let updateMobileAvator = value => {
  var _sql = `update mobileusers set avator=? where userName=?;`;
  return query(_sql, value);
};
// ????????????????????????
let updateMobileCommentAvator = value => {
  var _sql = `update comments set avator=? where userName=?;`;
  return query(_sql, value);
};
// ????????????
let addComment = value => {
  var _sql = `insert into comments set userName=?,date=?,content=?,videoName=?,uid=?,avator=?;`;
  return query(_sql, value);
};
// ??????id????????????
let getCommentById = id => {
  var _sql = `select * from comments where uid="${id}"; `;
  return query(_sql);
};
// ???????????????????????????
let getCommentByUser = name => {
  var _sql = `select * from comments where userName="${name}"; `;
  return query(_sql);
};
// ????????????
let deleteComment = id => {
  var _sql = `delete from comments where id="${id}"; `;
  return query(_sql);
};
// ??????like
let addLike = value => {
  var _sql = `insert into likes set iLike=?,userName=?,videoName=?,videoImg=?,star=?,uid=?; `;
  return query(_sql, value);
};
// ????????????video????????????like??????
let getLike = (name, uid) => {
  var _sql = `select * from likes where userName='${name}' AND uid='${uid}'; `;
  return query(_sql);
};
// ????????????????????????like/dislike?????????
let getLikeList = (name, num) => {
  var _sql = `select * from likes where userName='${name}' AND iLike='${num}'; `;
  return query(_sql);
};
// ?????????????????????
let getLikeStar = (type, uid) => {
  var _sql = `select count(*) from likes where iLike='${type}' AND uid='${uid}' ; `;
  return query(_sql);
};
// ??????????????????like/dislike????????????
let getUidLikeLength = uid => {
  var _sql = `select count(*) from likes where uid='${uid}'; `;
  return query(_sql);
};
// ??????videos star??????
let updateVideoStar = value => {
  var _sql = `update videos set star=? where id=?; `;
  return query(_sql, value);
};
// ??????likes star??????
let updateLikeStar = value => {
  var _sql = `update likes set star=? where uid=?; `;
  return query(_sql, value);
};
// ??????
let search = value => {
  var _sql = `select * from videos where name like '%${value}%';`;
  return query(_sql);
};

// ****** 2019-7-27 ?????? ?????? ******
// ??????????????????????????????as??????????????????????????????????????????????????????????????????
// ps: ?????????????????????????????????????????????????????????????????????????????????id????????????????????????????????????????????????????????????????????????too young????????????????????????????????????????????????
let getUserLikeV2 = (name, status = 1) => {
  var _sql = `select likes.id, likes.iLike, videos.name as videoName, videos.star, videos.img as videoImg, videos.id as uid from likes left join videos on videos.id = likes.uid where likes.username = '${name}' and likes.iLike = ${status} and videos.id is not NULL`;
  return query(_sql);
};
module.exports = {
  addUser,
  deleteUser,
  findUser,
  findData,
  findPageData,
  insertData,
  findDataById,
  updateDataHasImg,
  updateDataNoneImg,
  updateLikesImg,
  updateLikeName,
  updateCommentName,
  deleteVideo,
  findDataByCls,
  getDataById,
  addMobileUser,
  findMobileUserByName,
  checkUser,
  addComment,
  getCommentById,
  getCommentByUser,
  addLike,
  getLike,
  getLikeList,
  getLikeStar,
  updateVideoStar,
  updateLikeStar,
  getUidLikeLength,
  deleteComment,
  updateMobileAvator,
  updateMobileCommentAvator,
  updateMobileName,
  updateMobileCommentName,
  updateMobileLikeName,
  search,
  query,
  // 2019-7-27 ?????????
  getUserLikeV2,
};
