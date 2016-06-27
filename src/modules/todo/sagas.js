import { watchFetchApi, fetchApi, createSuccessType } from '../../common/api'
import { fork, call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  viewTodo,
} from './actions';


export default function* todoSagas() {
  yield [
    fork(watchFetchApi, listTodos, '/v1/todos'),
    fork(watchFetchApi, createTodo, '/v1/todos', 'post'),
    fork(watchFetchApi, updateTodo, '/v1/todos/${id}', 'put'),
    fork(watchFetchApi, deleteTodo, '/v1/todos/${id}', 'delete'),
    fork(watchFetchApi, viewTodo, '/v1/todos/${id}', 'get',
      (payload) => payload.store.getState().todo.todos.find(todo => todo.id == payload.id)),
  ]
}
