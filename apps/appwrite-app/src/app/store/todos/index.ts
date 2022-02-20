import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Server } from '../../utils/config';
import { Todo } from '../../models/Todo';
import { Api } from '../../helpers/api';
import { GlobalActions } from '../global';

/** State Model */
export class TodoStateModel {
  todos!: Array<any>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Todos {
  /** Actions */
  export class Fetch {
    static readonly type = '[Todo] FetchTodos';
  }

  export class Add {
    static readonly type = '[Todo] AddTodo';
    constructor(
      public payload: { data: Todo; read: string[]; write: string[] }
    ) { }
  }

  export class Update {
    static readonly type = '[Todo] UpdateTodo';
    constructor(
      public payload: {
        documentId: string;
        data: Todo;
        read: string[];
        write: string[];
      }
    ) { }
  }

  export class Delete {
    static readonly type = '[Todo] DeleteTodo';
    constructor(public payload: { documentId: string }) { }
  }
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodoState {
  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  @Action(Todos.Fetch)
  async fetchTodos(
    { setState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Fetch
  ) {
    try {
      const todos = (await Api.provider().database.listDocuments(Server.collectionID)) as Record<string, any>;
      setState({
        todos: todos['documents'] ?? [],
      });
    } catch (e: any) {
      console.log('Failed to fetch todos');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }

  @Action(Todos.Add)
  async addTodo(
    { patchState, getState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Add
  ) {
    try {
      const { data, read, write } = action.payload;
      const todo = await Api.provider().database.createDocument(
        Server.collectionID,
        data as any,
        read,
        write
      );
      const todos = getState().todos;
      patchState({
        todos: [...todos, todo],
      });
    } catch (e: any) {
      console.log('Failed to add todo');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }

  @Action(Todos.Update)
  async updateTodo(
    { patchState, getState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Update
  ) {
    const { documentId, data, read, write } = action.payload;
    try {
      const updatedTodo = (await Api.provider().database.updateDocument(
        Server.collectionID,
        documentId,
        data,
        read,
        write
      )) as any;
      const todoList = [...getState().todos];
      const index = todoList.findIndex(
        (todo) => todo['$id'] === updatedTodo['$id']
      );
      if (index !== -1) {
        todoList[index] = updatedTodo;
        patchState({
          todos: todoList,
        });
      }
    } catch (e: any) {
      console.log('Failed to update todo');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }

  @Action(Todos.Delete)
  async deleteTodo(
    { patchState, getState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Delete
  ) {
    const { documentId } = action.payload;
    try {
      await Api.provider().database.deleteDocument(
        Server.collectionID,
        documentId
      );
      let todos = getState().todos;
      todos = todos.filter((todo) => todo['$id'] !== documentId);
      patchState({
        todos,
      });
    } catch (e: any) {
      console.log('Failed to delete todo');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }
}
