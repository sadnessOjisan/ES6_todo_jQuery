class Todo {
  constructor(todos) {
    this.todos = todos || {};
    this.HOST_URL = 'https://json-now-ohjoczewvz.now.sh/';
  }

  // todo一覧を取得
  getTodos() {
    const response = fetch(`${this.HOST_URL}todos`, {
      method: 'GET',
    });
    return response;
  }

  // todoを作成
  createTodo(task) {
    const response = fetch(`${this.HOST_URL}todos`, {
      method: 'POST',
      body: JSON.stringify({
        task,
        isDone: false,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  }

  // todoの更新
  updateTodo(id, task, isChecked) {
    const response = fetch(`${this.HOST_URL}todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        task,
        isDone: isChecked,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  }
}

const todo = new Todo();

export default todo;
