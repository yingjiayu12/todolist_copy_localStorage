$(function () {
    load();
    $('#title').on('keydown', function (event) {
        if (event.keyCode === 13 && $(this).val() !== '') {
            var local = getDate();
            local.push({
                title: $(this).val(),
                done: false
            });
            saveDate(local);
            load();
            $(this).val('');
        }
    });
    function saveDate(local) {
        localStorage.setItem('todolist', JSON.stringify(local));
    }
    $('ol,ul').on('click', 'a', function () {
        var data = getDate();
        var _index = $(this).attr('id');
        data.splice(_index, 1);
        saveDate(data);
        load();
    })
    $('ol,ul').on('click', 'input', function () {
        var data = getDate();
        var _index = $(this).siblings('a').attr('id');
        data[_index].done = $(this).prop('checked');
        saveDate(data);
        load();
    })
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            return JSON.parse(data);
        }
        else {
            return [];
        }
    }
    function load() {
        var data = getDate();
        // console.log(data);
        $('ol').empty();
        $('ul').empty();
        var todoCount=0,doneCount=0;
        $.each(data, function (i, n) {
            if (data[i].done === true) {
                doneCount++;
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>' + n.title + '</p><a href="javascript:;" id=' + i + '></a></li>');
            }
            else {
                todoCount++;
                $('ol').prepend('<li><input type="checkbox"><p>' + n.title + '</p><a href="javascript:;" id=' + i + '></a></li>');
            }
            // console.log(n);
        })
        $('#todoCount').text(todoCount);
        $('#doneCount').text(doneCount);
    }
})