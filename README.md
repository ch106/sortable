### 文件说明
文件名 | 功能介绍 |优点 | 缺点
-|-|-|-|
drag | 简易的、可拖拽的div | data可以设置成HTML或者data；布局可以控制横向和纵向；代码简洁，复用性高 | 火狐、谷歌低版本浏览器，带滚动条的拖拽不兼容
sortable | 可拖拽、可添加新数据json、可删除 | data可以设置成json，与后端数据格式匹配；item样式可以在js中直接用Config配置 | 只适用于jquery-1.7.1 ，数据可扩展性弱


### drag数据格式
```
var htmlArr = [];
var html = ``;
for (var i = 0; i < 30; i++) {
    html = `<button>${1 + 1}</button>`;
    htmlArr.push(html);
}
new Drag({
    container: '.drag-box',
    data: htmlArr
});
```
### sortable数据格式
```
var DATA = {
    'appL': {
        'avatar': '头像信息',
        'comment': '留言簿',
        'doing': '最新动态',
    },
    'appM': {
        'blog': 'blog',
        'profile': '个人资料',
        'spaceinfo': '空间介绍',
        'friends': '我的好友'
    },
    'appR': {
        'gallery': '我的相册',
        'visitors': '最近访客',
        'thread': '我的话题'
    }
};
```