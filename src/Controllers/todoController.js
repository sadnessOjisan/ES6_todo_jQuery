import todo from '../Models/Todo'
import todoView from '../Views/todo'

class TodoController {
    constructor() {
        // formが送信されたらそれをtodoに付け加える処理
        $('#submit-form').submit(function (event) {
            event.preventDefault();
            var todo = $('#submit-form [name=todo]').val();
            this.createTodo(todo)
        });

        // todoを表示を切り替えのフィルターのトグル処理
        $('#filter-btn').on('click', function () {
            todoView.toggleFilter()
        })
    }

    echo() {
        console.log('echo')
    }

    init() {
        todo.getTodos(_addDataToView)
        todoView.toggleFilter()
    }

    createTodo(todo) {
        todo.createTodo(todo, _addDataToView)
    }

    updateTodo(e, shouldUpdateTodo) {
        const id = e.target.id
        const isChecked = $(e.target).is(':checked')
        const task = shouldUpdateTodo.task
        todoView.updateTodo()
        todoView.filterTodo(id, isChecked)
        todo.updateTodo(id, task, isChecked)
    }

    _addDataToView(data) {
        if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
                var todo = data[i]
                todoView.appendTodo(todo)
            }
        } else {
            todoView.appendTodo(data)
        }
    }
}

const todoController = new TodoController()

export default todoController