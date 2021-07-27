
// layui.use(function () {

//     var layer = layui.layer,
//         $ = layui.jquery;



var map = new AMap.Map("map", {
    resizeEnable: true,
    center: [121.40, 35],
    zoom: 5,
    zooms: [4, 8]
});
var infoWindow;//自定义提示窗
map.on("click", function () {
    infoWindow ? infoWindow.close() : "";
});

var dataArr = [];
var idx = 0,
    lth = null,
    html = "";
var colorArr = ["#30FC31", "#307EFA", "#FAF82F", "#FABA31", "#F08BF4", "#FA3031"];
var seep = 300;
//处理数据
function setDataFn() {
    var solidLine = [],
        dashedLine = [];

    var data = dataArr[idx].data;
    var datas = dataArr[idx].datas;
    var name = dataArr[idx].name;

    var dataIdx = data.length > 0 ? data.length - 1 : 0;

    for (var i = 0; i < data.length; i++) {
        (function (i) {
            setTimeout(function () {
                var dataItem = data[i];
                var latlng = [dataItem.longitude, dataItem.latitude];
                solidLine.push(latlng);
                var lineSolid = new AMap.Polyline({
                    path: solidLine,
                    strokeColor: "#000000",
                    strokeWeight: 2
                });
                map.add(lineSolid);

                var cir = new AMap.CircleMarker({
                    center: latlng,
                    strokeColor: '#333',
                    strokeOpacity: 0.7,
                    strokeWeight: 2,
                    fillOpacity: 1,
                    fillColor: colorArr[dataItem.type],
                    zIndex: 200,
                    radius: 7,
                    extData: dataItem
                });
                cir.on("click", cirClickFn);
                map.add(cir);
                

                if(i==0){
                    map.setCenter(latlng); 
                }


                if (i == dataIdx) {
                    map.add(cirArrs);
                    map.add(lineDashed);
                    setNameFn(name);
                    addMarker(data[dataIdx]);
                };
            }, seep * i);
        })(i);
    };
    var cirArrs = [];
    for (var j = 0; j < datas.length; j++) {
        var datasItem = datas[j];
        var latlngs = [datasItem.longitude, datasItem.latitude];
        dashedLine.push(latlngs);
        var cirs = new AMap.CircleMarker({
            center: latlngs,
            strokeColor: '#333',
            strokeOpacity: 0.7,
            strokeWeight: 2,
            fillOpacity: 1,
            fillColor: colorArr[datasItem.type],
            zIndex: 200,
            radius: 7,
            extData: datasItem
        });
        cirs.on("click", cirClickFn);
        cirArrs.push(cirs);
    };
    // 生成预测路线
    var lineDashed = new AMap.Polyline({
        path: dashedLine,
        strokeColor: "#f5000e",
        strokeWeight: 2,
        strokeStyle: "dashed"
    });
};
//最后一个实际路线添加台风动画
function addMarker(item) {
    var lnglat = [item.longitude, item.latitude];
    var marker = new AMap.Marker({
        position: lnglat,
        offset: new AMap.Pixel(-30, -30),
        content: "<img src='./assets/images/z2.png' class='rotate'/>",
        zIndex: 88,
        clickable: true,
        extData: item
    });
    marker.on('click', cirClickFn);
    map.add(marker);

    // 如果不是最后一个台风 继续添加
    idx++;
    if (idx <= (lth - 1)) {
        setDataFn();

    };

};
//添加台风名称
function setNameFn(text) {
    if (!lth) {
        $("#head").html('<p>' + text + '</p>');
    }
    html += '<p>' + text + '</p>';
    if (idx == (lth - 1)) {
        $("#head").html(html);
    }
};
// 点击弹窗
function cirClickFn(e) {
    var item = this.getExtData();

    $.ajax({
        url: "http://120.25.155.2:7000/SeaArea/typhoon_detail_data/",
        type: "post",
        data: {
            id: item.id
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            var data = res.data;
            console.log(data)
            var str = '<div class="tool">' +
                '<p class="tool-head">' + data.text + '</p>' +
                '<div class="tool-center">' +
                '<div class="tool-item">' +
                '<p>台风类型:</p><p>' + data.type + '</p>' +
                '</div>' +
                '<div class="tool-item">' +
                '<p>出现时间:</p><p>' + data.time + '</p>' +
                '</div>' +
                '<div class="tool-item">' +
                '<p>当前位置:</p><p>' + data.postion + '</p>' +
                '</div>' +
                '<div class="tool-item">' +
                '<p>台风风力:</p><p>' + data.grade + '级</p>' +
                '</div>' +
                '<div class="tool-item">' +
                '<p>移动方向:</p><p>' + data.dir + '</p>' +
                '</div>' +
                '<div class="tool-item">' +
                '<p>移动速度:</p><p>1H/' + data.value + 'km</p>' +
                '</div>' +
                '</div>';

            infoWindow = new AMap.InfoWindow({
                isCustom: true,
                content: str
            });
            infoWindow.open(map, [item.longitude, item.latitude]);

        }
    });
    // console.log(item)
    // var data = {
    //     "value": 35,
    //     "text": "台风名称",
    //     "position": "118°E/19.5°N",
    //     "grade": "11级",
    //     "dir": "南东南",
    //     "time": "2021-07-22 16:l0",
    //     "type": "热带气压(TD)"
    // };


};



// 获取数据
function getDataFn() {
    $.ajax({
        url: "http://120.25.155.2:7000/SeaArea/typhoon_path_data/",
        type: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            dataArr = res.data;
            lth = dataArr.length > -1 ? dataArr.length : null;
            lth ? setDataFn() : setNameFn("暂无台风");
        }
    });
    // dataArr = [{
    //     name: "烟花",
    //     data: [
    //         { longitude: 121.40, latitude: 36, id: 1, type: 0, line: 1 },
    //         { longitude: 123.40, latitude: 36, id: 2, type: 1, line: 1 },
    //         { longitude: 123.40, latitude: 32, id: 3, type: 2, line: 1 },
    //         { longitude: 121.40, latitude: 32, id: 4, type: 3, line: 1 },
    //         { longitude: 121.40, latitude: 35, id: 5, type: 1, line: 1 },
    //         { longitude: 122.40, latitude: 35, id: 6, type: 4, line: 1 },
    //     ],
    //     datas: [
    //         { longitude: 122.40, latitude: 35, id: 7, type: 5, line: 2 },
    //         { longitude: 122.40, latitude: 36, id: 8, type: 1, line: 2 },
    //         { longitude: 122.40, latitude: 37, id: 9, type: 2, line: 2 },
    //         { longitude: 122.40, latitude: 38, id: 9, type: 2, line: 2 }
    //     ]
    // }, {
    //     name: "测试",
    //     data: [
    //         { longitude: 110.40, latitude: 17, id: 1, type: 0, line: 1 },
    //         { longitude: 113.40, latitude: 17, id: 2, type: 1, line: 1 },
    //         { longitude: 113.40, latitude: 15, id: 3, type: 2, line: 1 },
    //         { longitude: 113.40, latitude: 13, id: 4, type: 3, line: 1 },
    //         { longitude: 112.40, latitude: 13, id: 5, type: 1, line: 1 },
    //         { longitude: 110.40, latitude: 13, id: 6, type: 4, line: 1 },
    //     ],
    //     datas: [
    //         { longitude: 111.40, latitude: 13, id: 7, type: 5, line: 2 },
    //         { longitude: 111.40, latitude: 15, id: 8, type: 1, line: 2 },
    //         { longitude: 111.40, latitude: 17, id: 9, type: 2, line: 2 },
    //         { longitude: 111.40, latitude: 19, id: 9, type: 2, line: 2 }
    //     ]
    // }];
    // lth = dataArr.length > -1 ? dataArr.length : null;
    // lth ? setDataFn() : setNameFn("暂无台风");
};
getDataFn();
