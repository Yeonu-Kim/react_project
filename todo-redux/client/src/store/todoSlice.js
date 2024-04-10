import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const rootUrl = "http://localhost:7000/api";

const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
  const url = rootUrl + "/todos";
  const response = await fetch(url);

  if (response.ok) {
    const todos = await response.json();
    return todos;
  }
});

const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (payload) => {
  const url = rootUrl + "/todos";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: payload }),
  });

  if (response.ok) {
    const newTodo = await response.json();
    console.log(newTodo);
    return newTodo;
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true },
    { id: 4, title: "todo4", completed: true },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getTodosAsync.pending, (state, action) => {
        return [];
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const { addTodo, deleteTodo, toggleComplete } = todoSlice.actions;
export { getTodosAsync, addTodoAsync };

export default todoSlice.reducer;
