class Todo {
  constructor(todos) {
    this.todos = todos || [];
    this.HOST_URL = 'https://json-now-ohjoczewvz.now.sh/';
  }

  // todo一覧を取得
  async getTodos() {
    const response = await fetch(`${this.HOST_URL}todos`, {
      method: 'GET'
    });
    const data = await response.json();
    this.todos = data;
  }

  // todoを作成
  async createTodo(task) {
    const response = await fetch(`${this.HOST_URL}todos`, {
      method: 'POST',
      body: JSON.stringify({
        task,
        isDone: false
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await response.json();
    this.todos.push(data);
  }

  // todoの更新
  updateTodo(id, task, isChecked) {
    const response = fetch(`${this.HOST_URL}todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        task,
        isDone: isChecked
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
    return response;
  }
}

const todo = new Todo();

export default todo;
