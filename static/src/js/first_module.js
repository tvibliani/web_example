// static/src/js/first_module.js
openerp.web_example = function (instance) {
    instance.web.client_actions.add('example.action', 'instance.web_example.Action');
    instance.web_example.Action = instance.web.Widget.extend({
        template: 'web_example.action',
        events: {
            'click .oe_web_example_start button': 'watch_start',
            'click .oe_web_example_stop button': 'watch_stop'
        },
        init: function () {
            this._super.apply(this, arguments);
            this._start = null;
            this._watch = null;
        },
        update_counter: function () {
            var h, m, s;
            // Subtracting javascript dates returns the difference in milliseconds
            var diff = new Date() - this._start;
            s = diff / 1000;
            m = Math.floor(s / 60);
            s -= 60*m;
            h = Math.floor(m / 60);
            m -= 60*h;
            this.$('.oe_web_example_timer').text(
                _.str.sprintf("%02d:%02d:%02d", h, m, s));
        },
        watch_start: function () {
            this.$el.addClass('oe_web_example_started')
                    .removeClass('oe_web_example_stopped');
            this._start = new Date();
            // Update the UI to the current time
            this.update_counter();
            // Update the counter at 30 FPS (33ms/frame)
            this._watch = setInterval(
                this.proxy('update_counter'),
                33);
        },
        watch_stop: function () {
            clearInterval(this._watch);
            this.update_counter();
            this._start = this._watch = null;
            this.$el.removeClass('oe_web_example_started')
                    .addClass('oe_web_example_stopped');
        },
        destroy: function () {
            if (this._watch) {
                clearInterval(this._watch);
            }
            this._super();
        }
    });
};
