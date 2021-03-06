$(function() {
    $('span.btn.btn-clear').click(function(){
        $('span.btn').removeClass('active');
        $('#result').addClass('hidden');
    })
    $('span.btn').click(function(){
        var careers = new Array();
        var sexes = new Array();
        var positions = new Array();
        var tags = new Array();
        var experiences = new Array();
        $(this).toggleClass('active');
        if ($(this).hasClass('btn-clear')) {
            $(this).removeClass('active');
        }
        if ($('span.btn.active').length > 5) {
            alert('最多只能选择5个标签！');
            $(this).removeClass('active');
        }
        if ($('span.btn.active').length == 0) {
            return;
        }
        for (let career of $('tr#career td span.active')) {
            careers.push(career.textContent);
        }
        for (let sex of $('tr#sex td span.active')) {
            sexes.push(sex.textContent);
        }
        for (let position of $('tr#position td span.active')) {
            positions.push(position.textContent);
        }
        for (let tag of $('tr#tag td span.active')) {
            tags.push(tag.textContent);
        }
        for (let experience of $('tr#experience td span.active')) {
            experiences.push(experience.textContent);
        }
        $.ajax({
            type: 'POST',
            url: '/query-data',
            data: JSON.stringify({
                'career_id': careers,
                'sex': sexes,
                'position': positions,
                'tags': tags,
                'experience': experiences,
            }),
            'dataType': 'json',
            'success': function(response) {
                if (!response) {
                    return;
                }
                $("span[id^='hero']").hide();
                $('#result').removeClass('hidden');
                $('#result').empty()
                $('#result').append('<tr><td>标签</td><td>结果</td></tr>')
                for (let dict of response) {
                    let td1 = dict['combine'].join(',');
                    let td2 = '';
                    for (let hero_id of dict['hero_ids']) {
                        let span = $('#hero' + hero_id);
                        span.show()
                        td2 += span.html()
                    }
                $('#result').append('<tr><td>' + td1 + '</td><td>' + td2 + '</td></tr>')
                }
            }
        })
    });
})