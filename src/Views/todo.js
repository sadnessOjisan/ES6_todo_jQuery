import todoController from '../Controllers/todoController';

class TodoView {
  renderTodo(todos, isFiltered = false) {
    const sortedTodos = todos.sort((a, b) => a.id - b.id);
    const filteredTodos = isFiltered
      ? sortedTodos.filter(item => item.isDone)
      : sortedTodos;
    $('#todos-area').empty();
    for (const todo of filteredTodos) {
      const isDone = todo.isDone;
      if (isDone) {
        $('#todos-area').append(
          `<p class="checked"><input checked type="checkbox" class="todo-check" id=${
            todo.id
          } /><span>${todo.task}</span></p>`
        );
      } else {
        $('#todos-area').append(
          `<p class="unchecked"><input type="checkbox" class="todo-check" id=${
            todo.id
          } /><span>${todo.task}</span></p>`
        );
      }
      $('.todo-check').on('click', e => {
        const clickedPoint = e.target;
        if (clickedPoint.id == todo.id) {
          todoController.updateTodo(e, todo);
        }
      });
    }
  }

  // 残りtodo数を表示
  updateTodo(todos) {
    const notYDoneTaskCount = todos.filter(todo => !todo.isDone).length;
    $('#remain').text(notYDoneTaskCount);
  }

  renderFilterState(state) {
    $('#filter-state').text(state ? 'ONです' : 'OFFです');
  }
}

const todoView = new TodoView();

export default todoView;
