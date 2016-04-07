/**
 * Created by harrywang on 15/12/16.
 */
var SLPager = SLComponent.extend({
    events: {
        'click li': 'handlePageClick'
    },

    initialize: function (options) {
        var self = this;
        this.super('initialize');
        self.parentDOM = options.parentDOM;
        self._delegate = options._delegate;
        self.pager = options.pager;
        self.pageNumber = options.pageNumber;
        this.templatePromise = application.loadTemplate('control/pager/sl-pager').then(function (result) {
            self.template = _.template(result);
            self.el = self.template();
            self.setElement(self.el);
            self.render();
        });
    },

    render: function () {
        this.parentDOM && this.parentDOM.append(this.$el);
        this.initUI(this.pager);
    },

    initUI: function (pager) {
        var self = this;
        this.$('#previous').addClass('disabled');
        this.$('#next').addClass('disabled');
        var pageNumber = pager.get('pageNumber');
        var totalPages = pager.get('totalPages');
        var totalRecords = pager.get('totalRecords');
        // 计算页数
        var pageCount = Math.ceil(totalRecords/10);
        // 添加页码到UI
        for (var i = 0; i < pageCount; i++) {
            if (i === self.pageNumber) {
                self.$('#pager-container li:eq('+i+')').
                    after('<li class="active" index="'+i+'"><a href="javascript:;">' + (i+1) + '</a></li>');
            } else {
                self.$('#pager-container li:eq('+i+')').after('<li index="'+i+'"><a href="javascript:;">' + (i+1) + '</a></li>');
            }
        }
    },

    handlePageClick: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.$('li').removeClass('active');
        var index = parseInt($(e.currentTarget).attr('index'));
        var parent = $(e.currentTarget.parentElement.parentElement.parentElement);
        $(e.currentTarget).addClass('active');
        this._delegate.didClickPagerAtIndex(index, parent.attr('id'));
    }
});