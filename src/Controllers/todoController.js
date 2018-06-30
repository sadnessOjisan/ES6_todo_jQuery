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

    async init() {
        const response = await Todo.getTodos()
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
            let todo = data[i]
            todoView.appendTodo(todo)
        }
        todoView.toggleFilter()
    }

    async createTodo(task) {
        const response = await Todo.createTodo(task)
        const data = await response.json()
        todoView.appendTodo(data)
    }

    updateTodo(e, shouldUpdateTodo) {
        const id = e.target.id
        const isChecked = $(e.target).is(':checked')
        const task = shouldUpdateTodo.task
        todoView.updateTodo()
        todoView.filterTodo(id, isChecked)
        Todo.updateTodo(id, task, isChecked)
    }
}

const todoController = new TodoController()

export default todoController