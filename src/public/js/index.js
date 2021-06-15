$(document).ready(function(){
    
    //è®¾ç½®å·¦ä¾§ä¸ºå¯å¤åˆ¶çš„
    $(".deviceLeft .deviceLeft_box").children().draggable({
        helper: "clone",
        scope: "zlg",
    });

    //è®¾ç½®å³ä¾§ä¸ºæ‹–æ‹½å­˜æ”¾åŒº
    var i=0;
    $("#main").droppable({
        scope:"zlg",
        drop:function (event , ui) {
            var left = parseInt(ui.offset.left - $(this).offset().left);
            var top = parseInt(ui.offset.top - $(this).offset().top);
            var type=ui.draggable[0].dataset.type;
            switch (type) {
                case "server"://æœåŠ¡å™¨
                    i++; 
                    var id = "chart-server" + i;
                    $(this).append('<div class="node node1css server" style="position: absolute" id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + '</div>');
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "host"://ä¸»æœº
                    i++;
                    id = "chart-host" + i;
                    $(this).append('<div class="node node2css host" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + "</div>");
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.addEndpoint(id, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "aisle"://é€šé“
                    i++;
                    id = "chart-aisle" + i;
                    $(this).append('<div class="node node3css aisle" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + "</div>");
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.addEndpoint(id, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "route"://è·¯ç”±
                    i++;
                    id = "chart-route" + i;
                    $(this).append('<div class="node node4css route" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + '</div>');
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "signal"://ä¿¡å·
                    i++;
                    id = "chart-signal" + i;
                    $(this).append('<div class="node node5css signal" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + '</div>');
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
            }
        }
    });

    //åŸºæœ¬è¿žæŽ¥çº¿æ ·å¼
    var connectorPaintStyle = {
        lineWidth: 2,
        strokeStyle: "#61b8d0",
    };

    // é¼ æ ‡æ‚¬æµ®åœ¨è¿žæŽ¥çº¿ä¸Šçš„æ ·å¼
    var connectorHoverStyle = {
        lineWidth: 2,
        strokeStyle: "green",
    };

    //ç«¯ç‚¹çš„é¢œè‰²æ ·å¼
    var paintStyle = {
        fillStyle: "#ccc",
        radius: 10,
        lineWidth:6 ,
    }

    // é¼ æ ‡æ‚¬æµ®åœ¨ç«¯ç‚¹ä¸Šçš„æ ·å¼
    var hoverPaintStyle = {
        fillStyle: "#aaa",
    }

    //è®¾ç½®è¿žæŽ¥ç«¯ç‚¹å’Œè¿žæŽ¥çº¿
    var hollowCircle = {
        endpoint: ["Dot", { radius: 5 }],  //ç«¯ç‚¹çš„å½¢çŠ¶
        connectorStyle: connectorPaintStyle,
        connectorHoverStyle: connectorHoverStyle,
        paintStyle: paintStyle,
        hoverPaintStyle: hoverPaintStyle ,
        isSource: true,    //æ˜¯å¦å¯ä»¥æ‹–åŠ¨ï¼ˆä½œä¸ºè¿žçº¿èµ·ç‚¹ï¼‰
        connector: ["Bezier", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],  //è¿žæŽ¥çº¿çš„æ ·å¼ç§ç±»æœ‰[Bezier],[Flowchart],[StateMachine ],[Straight ]
        isTarget: true,    //æ˜¯å¦å¯ä»¥æ”¾ç½®ï¼ˆè¿žçº¿ç»ˆç‚¹ï¼‰
        maxConnections: -1,    // è®¾ç½®è¿žæŽ¥ç‚¹æœ€å¤šå¯ä»¥è¿žæŽ¥å‡ æ¡çº¿
        connectorOverlays:[
            [ "Arrow", { width:10, length:20, location:1, id:"arrow" } ],
            ["Custom", {
                create:function(component) {
                    return $('<span style="background:#fff;position:relative;z-index:999;cursor:pointer;">connect</span>');
                },
                location:0.5,
                id:"customOverlay",
            }],
        ],
    };

    $("#main").on("mouseenter", ".node", function () {
        $(this).append('<img src="./images/close2.png"  style="position:absolute;" />');
        var widthnum = $(this).css("width").substr(0,5);
        if (widthnum <  60) {
            $("img").css("left", 67).css("top", -13);
        } else {
            $("img").css("left", 110).css("top", -10);
        }
    });
    //é¼ æ ‡ç¦»å¼€å°å›¾æ ‡æ¶ˆå¤±
    $("#main").on("mouseleave", ".node", function () {
        $("img").remove();
    });
    //èŠ‚ç‚¹å°å›¾æ ‡çš„å•å‡»äº‹ä»¶
    $("#main").on("click", "img",function () {
        if (confirm("ç¡®å®šè¦åˆ é™¤æ­¤èŠ‚ç‚¹å—?")) {
            jsPlumb.removeAllEndpoints($(this).parent().attr("id"));
            $(this).parent().remove();
        }
    });

    //è¿žæŽ¥çº¿ä¸­çš„æ–‡å­—åŒå‡»äº‹ä»¶
    $("#deviceRight").on("click", "._jsPlumb_overlay", function () {
        // var that=$(this)
        // that.removeClass('_jsPlumb_overlay')
        // var text = that.text();
        // that.html("");
        // that.append('<input type="text" id="myDropDown" value="' + text + '" />');
        // $('#myDropDown').blur(function () {
        //     that.html($("#myDropDown").val());
        //     that.addClass('_jsPlumb_overlay')
        // });
        // return false
    });

    jsPlumb.bind("dblclick", function (conn, originalEvent) {
        if (confirm("ç¡®å®šåˆ é™¤æ­¤è¿žçº¿å—ï¼Ÿ"))
            jsPlumb.detach(conn);
    });

    function doubleclick(id) {
        // $(id).dblclick(function () {
        //     var text = $(this).text();
        //     $(this).html("");
        //     $(this).append('<input style="width:100%" type="text" class="note" value="' + text + '" />');
        //     $(this).mouseleave(function () {
        //         $(this).html($(".note").val());
        //     });
        // });
    }

    

    // å½“è¿žçº¿å»ºç«‹å‰
    jsPlumb.bind('beforeDrop', function (info) {
        if(info.sourceId==info.targetId){//åˆ¤æ–­å½“å¼€å§‹å’Œç»ˆç‚¹ä¸ºä¸€ä¸ªèŠ‚ç‚¹æ—¶ï¼Œä¸è¿žçº¿ã€‚
            return false
        }

        return true // é“¾æŽ¥ä¼šè‡ªåŠ¨å»ºç«‹
    })

    //å¯¼å‡ºjson
    $('.btn1').click(function(){
        var ojson={
            server:[],
            host:[],
            aisle:[],
            route:[],
            signal:[],
            line:[],
        }

        //æœåŠ¡å™¨
        $("#main .server").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.server.push(param)
        });

        $("#main .host").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.host.push(param)
        });

        //
        $("#main .aisle").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.aisle.push(param)
        });

        //è·¯ç”±
        $("#main .route").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.route.push(param)
        });

        //ä¿¡å·
        $("#main .signal").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.signal.push(param)
        });

        //è¿žçº¿
        $.each(jsPlumb.getConnections(), function (idx, connection) {
            var param={
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId
            }
            ojson.line.push(param)
        });

        //æ‰“å°json
        ojson=JSON.stringify(ojson)
        console.log(ojson)
        jsPlumb.ready(function () {
            jsPlumb.connect({
                "source": "chart-host1",
                "target": "chart-server2",
                endpoint: ["Dot", { radius: 5 }],  //ç«¯ç‚¹çš„å½¢çŠ¶
                connectorStyle: connectorPaintStyle,
                connectorHoverStyle: connectorHoverStyle,
                paintStyle: paintStyle,
                hoverPaintStyle: hoverPaintStyle ,
                isSource: true,    //æ˜¯å¦å¯ä»¥æ‹–åŠ¨ï¼ˆä½œä¸ºè¿žçº¿èµ·ç‚¹ï¼‰
                connector: ["Bezier", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],  //è¿žæŽ¥çº¿çš„æ ·å¼ç§ç±»æœ‰[Bezier],[Flowchart],[StateMachine ],[Straight ]
                isTarget: true,    //æ˜¯å¦å¯ä»¥æ”¾ç½®ï¼ˆè¿žçº¿ç»ˆç‚¹ï¼‰
                maxConnections: -1,    // è®¾ç½®è¿žæŽ¥ç‚¹æœ€å¤šå¯ä»¥è¿žæŽ¥å‡ æ¡çº¿
                connectorOverlays:[
                    [ "Arrow", { width:10, length:20, location:1, id:"arrow" } ],
                    ["Custom", {
                        create:function(component) {
                            return $('<span style="background:#fff;position:relative;z-index:999;cursor:pointer;">connect</span>');
                        },
                        location:0.5,
                        id:"customOverlay",
                    }],
                ],
            })
          })

    })
})
 

