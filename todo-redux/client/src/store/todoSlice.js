import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const rootUrl = "http://localhost:7000/api";

// Async thunk functions
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const url = `${rootUrl}/todos`;
    const response = await fetch(url);

    if (response.ok) {
      return await response.json(); // return todos (list of todo object)
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const url = `${rootUrl}/todos`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload }),
    });

    if (response.ok) {
      return response.json();
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completedTodoAsync",
  async (payload) => {
    const url = `${rootUrl}/todos/${payload}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const todo = await response.json();
    return todo.id;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const url = `${rootUrl}/todos/${payload}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
        const targetTodo = state.find((todo) => todo.id === action.payload);
        if (targetTodo) {
          targetTodo.completed = !targetTodo.completed;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        return state.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
