import Todo from '../Models/Todo'
import todoView from '../Views/todo'

class TodoController {
    constructor() {
        // formが送信されたらそれをtodoに付け加える処理
        $('#submit-form').submit((event) => {
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

    async init() {
        const response = await Todo.getTodos()
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
            let todo = data[i]
            todoView.appendTodo(todo)
        }
        todoView.toggleFilter()
    }

    createTodo(task) {
        console.log('fire', task)
        Todo.createTodo(task, this._addDataToView)
    }

    updateTodo(e, shouldUpdateTodo) {
        const id = e.target.id
        const isChecked = $(e.target).is(':checked')
        const task = shouldUpdateTodo.task
        todoView.updateTodo()
        todoView.filterTodo(id, isChecked)
        Todo.updateTodo(id, task, isChecked)
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