import TodoManager from '../Models/Todo';
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
      TodoManager.toggleFilter();
      const todos = TodoManager.todos;
      const isFiltered = TodoManager.isFiltered;
      todoView.renderTodo(todos, isFiltered);
      todoView.renderFilterState(isFiltered);
    });
  }

  // 初期化処理
  async init() {
    await TodoManager.getTodos();
    const todos = TodoManager.todos;
    const isFiltered = TodoManager.isFiltered;
    todoView.renderTodo(todos, isFiltered);
    todoView.updateTodo(todos);
    todoView.renderFilterState(isFiltered);
  }

  // todo作成処理
  async createTodo(task) {
    await TodoManager.createTodo(task);
    todoView.renderTodo(TodoManager.todos);
    todoView.updateTodo(TodoManager.todos);
  }

  // todo更新処理
  async updateTodo(e, shouldUpdateTodo) {
    const id = e.target.id;
    const isChecked = $(e.target).is(':checked');
    const task = shouldUpdateTodo.task;
    await TodoManager.updateTodo(id, task, isChecked);
    todoView.renderTodo(TodoManager.todos);
    todoView.updateTodo(TodoManager.todos);
  }
}

const todoController = new TodoController();

export default todoController;
