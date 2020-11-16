define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'order/order/index' + location.search,
                    add_url: 'order/order/add',
                    // edit_url: 'order/order/edit',
                    // del_url: 'order/order/del',
                    multi_url: 'order/order/multi',
                    table: 'order',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'order_sn', title: __('Order_sn')},
                        {field: 'department.name', title: __('Department.name')},
                        {field: 'supplier.supplier_name', title: __('Supplier.supplier_name')},
                        {field: 'supplier.linkman', title: __('Supplier.linkman')},
                        {field: 'supplier.mobile', title: __('Supplier.mobile')},
                        {field: 'order_amount', title: __('Order_amount'), operate:'BETWEEN'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'sendtime', title: __('Sendtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime,datetimeFormat:'YYYY-MM-DD'},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1'),"2":__('Status 2')}, formatter: Table.api.formatter.status},
                        {field: 'department_id', title: __('Department_id'),visible:false,operate:false},
                        {field: 'supplier_id', title: __('Supplier_id'),visible:false,operate:false},
                        {field: 'department.id', title: __('Department.id'),visible:false,operate:false},
                        {field: 'supplier.id', title: __('Supplier.id'),visible:false,operate:false},
                        {
                            field: 'buttons',
                            width: "120px",
                            title: "操作",
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'ajax',
                                    text: __('取消订单'),
                                    title: __('取消订单'),
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-magic',
                                    url: 'example/bootstraptable/detail',
                                    confirm: '确认取消',
                                    success: function (data, ret) {
                                        Layer.alert(ret.msg + ",返回数据：" + JSON.stringify(data));
                                        //如果需要阻止成功提示，则必须使用return false;
                                        //return false;
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },
                                {
                                    name: 'addtabs',
                                    text: __('编辑'),
                                    title: __('编辑'),
                                    classname: 'btn btn-xs btn-warning btn-addtabs',
                                    icon: 'fa fa-folder-o',
                                    url: 'order/order/next2',
                                }
                            ],
                            formatter: Table.api.formatter.buttons
                        }
                        // {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]

            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {

            Controller.api.bindevent();

        },
        edit: function () {
            Controller.api.bindevent();
        },
        next:function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'order/order/index' + location.search,
                    // index_url:'order/order/index' + loadLoaction.supplier_id,
                    // loadLoaction
                    // add_url: 'order/order/add',
                    // edit_url: 'order/order/edit',
                    // del_url: 'order/order/del',
                    // multi_url: 'order/order/multi',
                    next_url:'order/order/next',
                    table: 'order',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.next_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        // {checkbox: true},
                        {field: 'index_id', title: __('序号'), formatter: function(value, row, index){
                                return ++index;
                            },operate:false,class:"index_id"},
                        {field: 'goods_id', title: __('Id'),operate:false,class:"goods_id"},
                        {field: 'goods_sn', title: __('商品编号'),operate:false},
                        {field: 'goods_name', title: __('商品名称'),operate: 'LIKE %...%'},
                        {field: 'spec', title: __('规格'),operate:false},
                        {field: 'unit', title: __('单位'),operate:false},
                        {field: 'price', title: __('单价'),operate:false,class:"price"},
                        {field: 'department.id', title: __('Department.id'),visible:false,operate:false},
                        {field: 'supplier.id', title: __('Supplier.id'),visible:false},
                        {
                            field: 'order_count',
                            title: '下单数量',
                            operate:false,
                            formatter:(value)=>{
                                return `<input value='${!value?"":value}' 
                                               type="text" class="change-input" data-type='order_count'>`
                            }
                        },
                        {
                            field: 'order_amount',
                            class:"order_amount",
                            title: '下单金额',
                            operate:false
                        },
                        {
                            field: 'remark',
                            title: '备注',
                            operate:false,
                            formatter:(value)=>{
                                return `<input value='${!value?"":value}' 
                                               type="text" class="change-input" data-type='remark'>`
                            }
                        },
                        {
                            field: '添加',
                            width: "150px",
                            title: '添加',
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'click',
                                    title: __('点击执行事件'),
                                    classname: 'btn btn-xs btn-info btn-click',
                                    icon: 'fa fa-leaf',
                                    // dropdown: '更多',//如果包含dropdown，将会以下拉列表的形式展示
                                    click: function (data) {
                                        layer.confirm("确认更新数据",
                                            {btn: ['确定', '取消']}, function () {
                                                const locatinObj = loadLoaction(); //地址数据
                                                const ele = $($(data.tableId).find("tr")[data.rowIndex+1]);
                                                const order_count = $(ele).find("td .change-input").eq(0).val();
                                                const remark = $(ele).find("td .change-input").eq(1).val()
                                                const goods_id = ele.find("td.goods_id").text();
                                                let order_id = $('#order_id').val();

                                                Fast.api.ajax({
                                                    url:'order/order/ajax_add',
                                                    data:{
                                                        order_count:order_count,
                                                        remark:remark,
                                                        supplier_id:locatinObj.supplier_id,
                                                        send_time:locatinObj.send_time,
                                                        department_id:locatinObj.department_id,
                                                        goods_id:goods_id,
                                                        order_id:order_id
                                                    }
                                                }, function(data, ret){
                                                    //成功的回调
                                                    alert(ret.msg);
                                                    console.log(ret);
                                                    var order_id = ret.data.order_id
                                                    console.log(order_id);
                                                    $("#order_id").val(order_id);
                                                    return false;
                                                }, function(data, ret){
                                                    //失败的回调
                                                    alert(ret.msg);
                                                    return false;
                                                });

                                                layer.closeAll();
                                            });

                                    }
                                }
                                ],
                            formatter: Table.api.formatter.buttons,
                            operate:false
                        }
                    ]
                ],
                search:false,
                showToggle: false,
                showColumns: false,
                searchFormVisible: true,
                showExport: false
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        next2:function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'order/order/index' + location.search,
                    // index_url:'order/order/index' + loadLoaction.supplier_id,
                    // loadLoaction
                    // add_url: 'order/order/add',
                    // edit_url: 'order/order/edit',
                    // del_url: 'order/order/del',
                    // multi_url: 'order/order/multi',
                    next_url:'order/order/next2',
                    table: 'order',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.next_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'index_id', title: __('序号'), formatter: function(value, row, index){
                                return ++index;
                            },operate:false,class:"index_id"},
                        {field: 'goods_id', title: __('Id'),operate:false,class:"goods_id"},
                        {field: 'goods_sn', title: __('商品编号'),operate:false},
                        {field: 'goods_name', title: __('商品名称'),operate: 'LIKE %...%'},
                        {field: 'spec', title: __('规格'),operate:false},
                        {field: 'unit', title: __('单位'),operate:false},
                        {field: 'price', title: __('单价'),operate:false,class:"price"},
                        {field: 'department.id', title: __('Department.id'),visible:false,operate:false},
                        {field: 'supplier.id', title: __('Supplier.id'),visible:false,operate:false},
                        {
                            field: 'order_count',
                            title: '下单数量',
                            operate:false,
                            formatter:(value)=>{
                                return `<input value='${!value?"":value}' 
                                               type="text" class="change-input" data-type='order_count'>`
                            }
                        },
                        {
                            field: 'order_amount',
                            class:"order_amount",
                            title: '下单金额',
                            operate:false
                        },
                        {
                            field: 'remark',
                            title: '备注',
                            operate:false,
                            formatter:(value)=>{
                                return `<input value='${!value?"":value}' 
                                               type="text" class="change-input" data-type='remark'>`
                            }
                        },
                        {
                            field: '添加',
                            width: "150px",
                            title: '添加',
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'click',
                                    title: __('点击执行事件'),
                                    classname: 'btn btn-xs btn-info btn-click',
                                    icon: 'fa fa-leaf',
                                    // dropdown: '更多',//如果包含dropdown，将会以下拉列表的形式展示
                                    click: function (data) {
                                        layer.confirm("确认更新数据",
                                            {btn: ['确定', '取消']}, function () {
                                                const locatinObj = loadLoaction(); //地址数据
                                                const ele = $($(data.tableId).find("tr")[data.rowIndex+1]);
                                                const order_count = $(ele).find("td .change-input").eq(0).val();
                                                const remark = $(ele).find("td .change-input").eq(1).val()
                                                const goods_id = ele.find("td.goods_id").text();
                                                let order_id = $('#order_id').val();
                                                Fast.api.ajax({
                                                    url:'order/order/ajax_add',
                                                    data:{
                                                        order_count:order_count,
                                                        remark:remark,
                                                        supplier_id:Config.supplier_id,
                                                        send_time:Config.send_time,
                                                        department_id:Config.department_id,
                                                        goods_id:goods_id,
                                                        order_id:order_id
                                                    }
                                                }, function(data, ret){
                                                    //成功的回调
                                                    alert(ret.msg);
                                                    console.log(ret);
                                                    var order_id = ret.data.order_id
                                                    console.log(order_id);
                                                    $("#order_id").val(order_id);
                                                    return false;
                                                }, function(data, ret){
                                                    //失败的回调
                                                    alert(ret.msg);
                                                    return false;
                                                });

                                                layer.closeAll();
                                            });

                                    }
                                }
                            ],
                            formatter: Table.api.formatter.buttons,
                            operate:false
                        }
                    ]
                ],
                queryParams: function (params) {
                    // 自定义搜索条件
                    var filter = params.filter ? JSON.parse(params.filter) : {};
                    var op = params.op ? JSON.parse(params.op) : {};
                    //filter.后跟的是在ajax里使用的名称只需修改这两行
                    filter.order_id = Config.order_id;
                    //opop后跟的也是ajax里使用的名称，后面是条件
                    op.order_id = '=';
                    params.filter = JSON.stringify(filter);
                    params.op = JSON.stringify(op);
                    // console.log(params);
                    return params;
                },
                search:false,
                showToggle: false,
                showColumns: false,
                searchFormVisible: true,
                showExport: false
            });
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"),function(data,ret){
                    console.log(data);//需要携带的参数
                    // console.log(ret);
                    var obj = new Function("return" + data)();//转换后的JSON对象
                    var url = ret.url+'?send_time='+obj.send_time+'&department_id='+obj.department_id+'&supplier_id='+obj.supplier_id;
                    // console.log(url)
                    // console.log(obj.send_time);//json name
                    Backend.api.addtabs(url,{iframeForceRefresh: true});//新建选项卡
                });
            }
        }
    };
    return Controller;
});

$("#table").on("blur",".change-input",function(e){
    const type = $(e.target).attr("data-type");
    const value = $(e.target).val();
    const obj = loadLoaction();
    const parents = $(e.target).parents("tr");
    switch (type){
        case 'order_count':
            parents.find("td.order_amount").text((Number(value)*parents.find("td.price").text()).toFixed(2));
            break;

    }
});
function loadLoaction(local){
    local = window.location.search.substring(1);
    const localArr = local.split("&");
    const localObj = {};
    localArr.map(v=>{
        const arr = v.split("=");
        localObj[arr[0]] = arr[1];
    });
    return localObj;
}