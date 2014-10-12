openerp.testing.section('timer', function (test) {
    test('format_time', function (instance) {
        var w = new instance.web_example.Action();

        strictEqual(
            w.format_time(0),
            '00:00:00');
        strictEqual(
            w.format_time(543),
            '00:00:00',
            "should round sub-second times down to zero");
        strictEqual(
            w.format_time(5340),
            '00:00:05',
            "should floor sub-second extents to the previous second");
        strictEqual(
            w.format_time(60000),
            '00:01:00');
        strictEqual(
            w.format_time(3600000),
            '01:00:00');
        strictEqual(
            w.format_time(86400000),
            '24:00:00');
        strictEqual(
            w.format_time(604800000),
            '168:00:00');

        strictEqual(
            w.format_time(22733958),
            '06:18:53');
        strictEqual(
            w.format_time(41676639),
            '11:34:36');
        strictEqual(
            w.format_time(57802094),
            '16:03:22');
        strictEqual(
            w.format_time(73451828),
            '20:24:11');
        strictEqual(
            w.format_time(84092336),
            '23:21:32');
    });
});
