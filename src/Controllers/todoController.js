import Todo from '../Models/Todo';
import todoView from '../Views/todo';

class TodoController {
  constructor() {
    // formが送信されたらそれをtodoに付け加える処理
    $('#submit-form').submit(event => {
      event.preventDefault();
      const todo = $('#submit-form [name=todo]').val();
      this.createTodo(todo);
    });

    // todoを表示を切り替えのフィルターのトグル処理
    $('#filter-btn').on('click', () => {
      todoView.toggleFilter();
    });
  }

  // 初期化処理
  async init() {
    await Todo.getTodos();
    const todos = Todo.todos;
    todoView.renderTodo(todos);
    todoView.toggleFilter();
  }

  // todo作成処理
  async createTodo(task) {
    await Todo.createTodo(task);
    todoView.renderTodo(Todo.todos);
  }

  // todo更新処理
  updateTodo(e, shouldUpdateTodo) {
    const id = e.target.id;
    const isChecked = $(e.target).is(':checked');
    const task = shouldUpdateTodo.task;
    todoView.updateTodo();
    todoView.filterTodo(id, isChecked);
    Todo.updateTodo(id, task, isChecked);
  }
}

const todoController = new TodoController();

export default todoController;
