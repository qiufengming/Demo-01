
# 1、Redux适用情况
    1、一下情况不需要使用Redux
     - 用户的使用方式非常简单
     - 用户之间没有协作
     - 不需要与服务器大量交互，也没有使用 WebSocket
     - 视图层（View）只从单一来源获取数据
    2、Redux 的适用场景 --> 多交互、多数据源
     - 用户的使用方式复杂
     - 不同身份的用户有不同的使用方式（比如普通用户和管理员）
     - 多个用户之间可以协作
     - 与服务器大量交互，或者使用了WebSocket
     - View要从多个来源获取数据
    3、有以下场景，可以考虑使用 Redux
     - 某个组件的状态，需要共享
     - 某个状态需要在任何地方都可以拿到
     - 一个组件需要改变全局状态
     - 一个组件需要改变另一个组件的状态

# 2、基本概念和 API
    ## 2.1、Store
        1、Store --> 保存数据的地方，看成一个容器，整个应用只有一个Store。
        2、createStore --> 生成Store
         ```javascript
         import { createStore } from 'redux';
         const store = createStore(fn); // 接受另一个函数作为参数，返回新生成的 Store 对象
         ```
    ## 2.2、State
        1、Store对象包含所有数据
        2、
            ```javascript
            import { createStore } from 'redux';
            const store = createStore(fn);

            const state = store.getState();
            ```
        3、一个 State 对应一个 View。
    ## 2.3 Action
        1、View 变化 --> State 变化，Action 是View 发出的通知。
        2、Action 是一个对象，其中 type 属性是必须的，表 Action 的名称，其他属性可自由设置。
            ```javascript
            const action = {
              type: 'ADD_TODO',
              payload: 'Learn Redux'
            };
            ```
    ## 2.4、Action Creator
        1、Action Creato --> 生成 Action
            ```javascript
            const ADD_TODO = '添加 TODO';

            // addTodo函数就是一个 Action Creator
            function addTodo(text) {
              return {
                type: ADD_TODO,
                text
              }
            }

            const action = addTodo('Learn Redux');
            ```
    ## 2.5、store.dispatch()
        1、store.dispatch() --> View 发出 Action 的唯一方法。
            ```javascript
            import { createStore } from 'redux';
            const store = createStore(fn);

            // store.dispatch接受一个 Action 对象作为参数，将它发送出去。
            store.dispatch({
              type: 'ADD_TODO',
              payload: 'Learn Redux'
            });
            ```
    ## 2.6、Reducer
        1、Reducer --> Store 收到 Action，给出新的 State，View 发生变化，这个计算过程。
        2、Reducer 函数，接受 Action 和当前 State 作为参数，返回新的 State。
            ```javascript
            const reducer = function (state, action) {
              // ...
              return new_state;
            };
            ```
        3、整个应用的初始状态，可以作为 State 的默认值。
            ```javascript
            const defaultState = 0;
            const reducer = (state = defaultState, action) => {
              switch (action.type) {
                case 'ADD':
                  return state + action.payload;
                default: 
                  return state;
              }
            };

            const state = reducer(1, {
              type: 'ADD',
              payload: 2
            });
            ```
        4、实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
            ```javascript
            import { createStore } from 'redux';
            const store = createStore(reducer);
            ```
        5、为什么叫 Reducer 
          因为 Reducer 可以作为数组的reduce方法的参数。
            ```javascript
            // actions 表示依次有三个 Action 
            const actions = [
              { type: 'ADD', payload: 0 },
              { type: 'ADD', payload: 1 },
              { type: 'ADD', payload: 2 }
            ];

            // 数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3。
            const total = actions.reduce(reducer, 0); // 3
            ```
    ## 2.7、纯函数
        1、纯函数约束
          - 不得改写参数
          - 不能调用系统 I/O 的API
          - 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
        2、Reducer 函数是纯函数 --> 只要是同样的输入，必定得到同样的输出。
        3、Reducer 函数里面不能改变 State，必须返回一个全新的对象。
          ```javascript
          // State 是一个对象
          function reducer(state, action) {
            return Object.assign({}, state, { thingToChange });
            // 或者
            return { ...state, ...newState };
          }

          // State 是一个数组
          function reducer(state, action) {
            return [...state, newItem];
          }
          ```
        4、最好把 State 对象设成只读。
    ## 2.8、store.subscribe()
        1、Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
          ```javascript
          import { createStore } from 'redux';
          const store = createStore(reducer);

          store.subscribe(listener);
          ```
          显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。
        2、store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
          ```javascript
          let unsubscribe = store.subscribe(() =>
            console.log(store.getState())
          );

          unsubscribe();
          ```
# 3、Store 的实现
    1、Store 提供了三个方法
      - store.getState()
      - store.dispatch()
      - store.subscribe()
      ```javascript
      import { createStore } from 'redux';
      let { subscribe, dispatch, getState } = createStore(reducer);
      ```
    2、createStore 可接受第二个参数，表 State 的最初状态
      ```javascript
      let store = createStore(todoApp, window.STATE_FROM_SERVER)
      // window.STATE_FROM_SERVER：整个应用的状态初始值
      ```
    3、
      ```javascript
      const createStore = (reducer) => {
        let state;
        let listeners = [];

        const getState = () => state;

        const dispatch = (action) => {
          state = reducer(state, action);
          listeners.forEach(listener => listener());
        };

        const subscribe = (listener) => {
          listeners.push(listener);
          return () => {
            listeners = listeners.filter(l => l !== listener);
          }
        };

        dispatch({});

        return { getState, dispatch, subscribe };
      };
      ```

# 4、Reducer 的拆分
    1、Reducer --> 生成 State ，整个应用只有一个 State 对象，包含所有数据，State 比较庞大时，可拆分 Reducer 函数。
    2、Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
      ```javascript
      import { combineReducers } from 'redux';

      // combineReducers方法将三个子 Reducer 合并成一个大的函数。
      const chatReducer = combineReducers({ 
        chatLog, //  State 的属性名与子 Reducer 同名才能这么写
        statusMessage,
        userName
      })

      export default todoApp;
      ```
    3、State 的属性名与子 Reducer 不同名时的写法：
      ```javascript
      const reducer = combineReducers({
        a: doSomethingWithA,
        b: processB,
        c: c
      })

      // 等同于
      function reducer(state = {}, action) {
        return {
          a: doSomethingWithA(state.a, action),
          b: processB(state.b, action),
          c: c(state.c, action)
        }
      }
      ```
    4、combineReducers()产生一个整体的 Reducer 函数，该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。
    5、可把所有子 Reducer 放在一个文件里面，然后统一引入。
      ```javascript
      import { combineReducers } from 'redux'
      import * as reducers from './reducers'

      const reducer = combineReducers(reducers)
      ```
# 5、工作流程
    --> 用户发出 Action
        - store.dispatch(action);
    --> Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
        - let nextState = todoApp(previousState, action);
    --> State 一旦有变化，Store 就会调用监听函数。
        - store.subscribe(listener); // 设置监听函数
    --> listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
        - function listerner() {
            let newState = store.getState();
            component.setState(newState);   
          }

# 6、中间件
    1、Reducer：纯函数，只承担计算 State 的功能，理论上不能进行读写操作。
    2、View：与 State 一一对应，可以看作 State 的视觉层。
    3、Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。
    4、中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
# 7、applyMiddlewares()
    1、applyMiddlewares() --> Redux 的原生方法，将所有中间件组成一个数组，依次执行。
    2、其源码：
      ```javascript
      export default function applyMiddleware(...middlewares) {
        return (createStore) => (reducer, preloadedState, enhancer) => {
          var store = createStore(reducer, preloadedState, enhancer);
          var dispatch = store.dispatch;
          var chain = [];

          var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
          };
          chain = middlewares.map(middleware => middleware(middlewareAPI));
          dispatch = compose(...chain)(store.dispatch);

          return {...store, dispatch}
        }
      }
      ```
# 8、异步操作
    1、同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action。
      - 操作发起时的 Action
      - 操作成功时的 Action
      - 操作失败时的 Action
    2、异步操作时，State要反映不同的操作状态，例子如下：
      ```javascript
      let state = {
        // ... 
        isFetching: true, // 是否在抓取数据
        didInvalidate: true, // 数据是否过时
        lastUpdated: 'xxxxxxx' // 上一次更新时间
      };
      ```
    3、异步操作的思路
      - 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
      - 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染
# 9、redux-thunk 中间件
    






# NNN
    ## XXX
        1、xxxxxx
          ```javascript
          ```
        2、yyyyyy
          - aaaaaa





