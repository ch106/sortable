(function (win) {

    function Drag(opts) {
        this.init(opts);
    };

    Drag.prototype = {
        constructor: Drag,

        options: {
            container: '',
            data: [], //可以是数据，也可以是html标签
            className: 'item'
        },

        //初始化 
        init: function (opts) {
            $.extend(this.options, opts);
            this.$el = $(this.get('container'));
            this._render();
            this._bindEvent();
        },

        get: function (key) {
            return this.options[key];
        },

        set: function (key, value) {
            this.options[key] = value;
        },

        //渲染列表
        _render: function () {
            var me = this, lis = '',
                data = me.get('data') || [];
            for (var i = 0, len = data.length; i < len; i++) lis += '<li class="drag-item" id="drag-item-' + i + '">' + data[i] + '</li>';
            me.$el.append(lis)
                .find('li').attr('draggable', true)
                .addClass(this.get('className'));
        },

        //绑定事件
        _bindEvent: function () {
            var me = this,
                $lis = $('li', me.$el),
                events = ['dragstart', 'dragenter', 'dragover', 'drop', 'dragend'];
            $.each(events, function (index, item) {
                $lis.on(item, function (e) {
                    me['_' + item + 'Handle'] && me['_' + item + 'Handle'](e, me);
                });
            })
            $lis.hover(function () {
                $(this).css('background-color', '#eee');
            }, function () {
                $(this).css('background-color', '#fff');
            });
        },

        //开始拖动
        _dragstartHandle: function (e) {
            var me = this, oe = e.originalEvent;
            if (oe.dataTransfer) {
                oe.dataTransfer.setData('text', '');
            }
            me.$drag = $(e.currentTarget);
            $('li', me.$el).removeClass('item-hover');
            me.$drag.addClass('draging').siblings().addClass('no-draging');
        },

        _dragenterHandle: function (e) {
            var me = this;
            me.$drop = $(e.currentTarget);
            if (me.timer) { clearTimeout(me.timer) } //事件控制
            me.timer = setTimeout(function () {
                if (me.$drag.attr('id') !== me.$drop.attr('id')) {
                    me._createMask();
                    if (me.$drag.index() < me.$drop.index()) me.$drag.insertAfter(me.$drop);
                    else me.$drag.insertBefore(me.$drop);
                }
            }, 30);

        },

        _dragoverHandle: function (e) {
            var oe = e.originalEvent;
            e.preventDefault();
            return false;
        },

        _dropHandle: function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },

        //拖动结束
        _dragendHandle: function (e) {
            var me = this;
            me.$mask && me.$mask.remove();
            setTimeout(function () {
                $('li', me.$el).removeClass('draging no-draging');
            }, 30);
        },

        //创建遮罩
        _createMask: function () {
            var me = this, $mask = me.$mask = $('<div class="drag-mask"></div>');
            $mask.css({
                position: 'absolute',
                width: me.$drop.outerWidth(),//new
                height: me.$drop.outerHeight(),//new
                left: me.$drop.position().left,
                top: me.$drop.position().top + me.$el.scrollTop(),//new
                backgroundColor: '#fff'
            });
            $mask.on({
                'drop': me._dropHandle,
                'dragover': me._dragoverHandle
            });
            this.$el.find('.drag-mask').remove();
            this.$el.append($mask);
        }

    };

    win.Drag = Drag;
})(window);