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
        current: function () {
            // Subtracting javascript dates returns the difference in milliseconds
            return new Date() - this._start;
        },
        update_counter: function (time) {
            var h, m, s;
            s = time / 1000;
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
            this.update_counter(this.current());
            // Update the counter at 30 FPS (33ms/frame)
            this._watch = setInterval(function () {
                    this.update_counter(this.current());
                }.bind(this),
                33);
        },
        watch_stop: function () {
            clearInterval(this._watch);
            var time = this.current();
            this.update_counter(time);
            this._start = this._watch = null;
            this.$el.removeClass('oe_web_example_started')
                    .addClass('oe_web_example_stopped');
            new instance.web.Model('web_example.stopwatch').call('create', [{
                user_id: instance.session.uid,
                time: time,
            }]);
        },
        destroy: function () {
            if (this._watch) {
                clearInterval(this._watch);
            }
            this._super();
        }
    });
};
