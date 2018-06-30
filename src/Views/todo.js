(function (global) {
    var TodoView = function () {
        if (!(this instanceof TodoView)) {
            return new TodoView();
        }
    }

    // todoの追加処理
    TodoView.prototype.appendTodo = function (todo) {
        var isDone = todo.isDone === "false"? false:true
        if (isDone) {
            $('#todos-area').append('<p class="checked"><input checked type="checkbox" class="todo-check" id=' + todo.id + ' /><span>' + todo.task + '</span></p>')
        } else {
            $('#todos-area').append('<p class="unchecked"><input type="checkbox" class="todo-check" id=' + todo.id + ' /><span>' + todo.task + '</span></p>')
        }
        $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
        $('.todo-check').on('click', function (e) {
            var clickedPoint = e.target
            if (clickedPoint.id == todo.id) {
                global.todo.controller.updateTodo(e, todo)
            }
        })
    }
    
    // todoのfilter処理
    TodoView.prototype.filterTodo = function(id, isChecked){
        var todoDom = $("#" + id).parent()
        if (isChecked) {
            todoDom.addClass("checked")
            todoDom.removeClass("unchecked")
        } else {
            todoDom.addClass("unchecked")
            todoDom.removeClass("checked")
        }
    }

    // todoの更新処理
    TodoView.prototype.updateTodo = function(){
        $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
    }

    // fiterのtoggle処理
    TodoView.prototype.toggleFilter = function(){
        var filterState = $('#filter-state').text()
        if (filterState === 'off') {
            $('#filter-state').text('on')
            $('#todos-area input:checkbox:checked').parent().addClass('hide')
        } else {
            // on -> off もしくは, init時はこっちの分岐に入る. 
            $('#filter-state').text('off')
            $('#todos-area input:checkbox:checked').parent().removeClass('hide')
        }
    }

    global.todo.view = new TodoView()

}(window || global));