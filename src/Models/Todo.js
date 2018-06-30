(function (global) {
    var Todo = function (todos) {
        if (!(this instanceof Todo)) {
            return new Todo();
        }

        this.todos = todos || {}
        this.HOST_URL = 'https://json-now-ohjoczewvz.now.sh/'
    }

    // todo一覧を取得
    Todo.prototype.getTodos = function (callback) {
        $.ajax({
                type: "GET",
                url: this.HOST_URL+"todos"
            })
            .done((data) => {
                this.todos = data
                callback(data)
            }).fail((err) => {
                alert('Todo一覧取得に失敗しました')
            })
    }

    // todoを作成
    Todo.prototype.createTodo = function (task, callback) {
        $.ajax({
                type: "POST",
                url: this.HOST_URL + "todos",
                data: {
                    'task': task,
                    isDone: false
                }
            })
            .done((data) => {
                global.todo.model.todos = data
                callback(data)
            }).fail((err) => {
                alert('Todo作成に失敗しました')
            })
    }

    // todoの更新
    Todo.prototype.updateTodo = function (id, task, isChecked) {
        $.ajax({
                type: "PUT",
                url: this.HOST_URL + "todos/" + id,
                data: {
                    task: task,
                    isDone: isChecked ? true : false
                }
            })
            .done((data) => {}).fail(function () {
                alert('更新に失敗しました')
            })
    }

    global.todo.model = new Todo()

}(window || global));