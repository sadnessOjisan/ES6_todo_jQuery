class Todo {
    constructor(todos) {
        this.todos = todos || {}
        this.HOST_URL = 'https://json-now-ohjoczewvz.now.sh/'
    }

    echo(){
        console.log('echo')
    }

    // todo一覧を取得
    getTodos(callback) {
        $.ajax({
                type: "GET",
                url: this.HOST_URL + "todos"
            })
            .done((data) => {
                this.todos = data
                callback(data)
            }).fail((err) => {
                alert('Todo一覧取得に失敗しました')
            })
    };

    // todoを作成
    createTodo(task, callback) {
        $.ajax({
                type: "POST",
                url: this.HOST_URL + "todos",
                data: {
                    'task': task,
                    isDone: false
                }
            })
            .done((data) => {
                this.todos = data
                callback(data)
            }).fail((err) => {
                alert('Todo作成に失敗しました')
            })
    }

    // todoの更新
    updateTodo(id, task, isChecked) {
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
}

const todo = new Todo()

export default todo