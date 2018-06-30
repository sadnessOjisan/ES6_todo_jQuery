import todo from '../Models/Todo'

class TodoController {
    constructor() {
        // formが送信されたらそれをtodoに付け加える処理
        $('#submit-form').submit(function (event) {
            event.preventDefault();
            var todo = $('#submit-form [name=todo]').val();
            global.todo.controller.createTodo(todo)
        });

        // todoを表示を切り替えのフィルターのトグル処理
        $('#filter-btn').on('click', function () {
            global.todo.view.toggleFilter()
        })
    }

    echo() {
        console.log('echo')
    }

    init() {
        todo.getTodos(_addDataToView)
        global.todo.view.toggleFilter()
    }

    createTodo(todo) {
        todo.createTodo(todo, _addDataToView)
    }

    updateTodo(e, shouldUpdateTodo) {
        const id = e.target.id
        const isChecked = $(e.target).is(':checked')
        const task = shouldUpdateTodo.task
        global.todo.view.updateTodo()
        global.todo.view.filterTodo(id, isChecked)
        todo.updateTodo(id, task, isChecked)
    }

    _addDataToView(data) {
        if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
                var todo = data[i]
                global.todo.view.appendTodo(todo)
            }
        } else {
            global.todo.view.appendTodo(data)
        }
    }
}

const todoController = new TodoController()

export default todoController