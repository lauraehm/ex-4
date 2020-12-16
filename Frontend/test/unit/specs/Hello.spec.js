import {
  shallowMount
} from '@vue/test-utils'
import App from '../../../src/App'
import TodoList from '../../../src/components/TodoList'
import store from '../../../src/store'
import router from '../../../src/router'

describe('App.vue', () => {
  it('Should render correct contents', () => {
    const wrapper = shallowMount(App, {
      router,
      store
    })
    const byId = wrapper.find('#title-id')
    expect(byId.text()).contains('Vue.js Todo App')
  })
})

const todos = []

describe('TodoList.vue', () => {
  it('Should render correct completed tasks', () => {
    const wrapper = shallowMount(TodoList, {
      propsData: {
        todos: todos
      },
      router,
      store
    })
    const div = wrapper.find('#completed-tasks')
    expect(div.text()).contains('Completed Tasks: 0')
  })
})

describe('TodoList.vue', () => {
  it('Should render correct pending tasks', () => {
    const wrapper = shallowMount(TodoList, {
      propsData: {
        todos: todos
      },
      router,
      store
    })
    const div = wrapper.find('#pending-tasks')
    expect(div.text()).contains('Pending Tasks: 0')
  })
})

