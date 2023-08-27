import { apiSlice } from "../../api/apiSlice";

export const todoAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      keepUnusedDataFor: 600,
    }),

    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: JSON.stringify(data),
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // update getAssignments cache pessimistically
        try {
          const { data } = await queryFulfilled;
          const d = {
            ...data,
            ...arg,
          };

          dispatch(
            apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
              draft.push(d);
            })
          );
        } catch (error) {
          // do nothing
        }
      },
    }),

    changeCompleteStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),

      async onQueryStarted({ data, id }, { queryFulfilled, dispatch }) {
        // update todos cache optimistically
        const editTodoInstance = dispatch(
          apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.map((todo) => {
              if (todo.id == id) {
                return data;
              }
              return todo;
            });
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          editTodoInstance.undo();
        }
      },
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        // update todos cache optimistically
        const deleteTodoInstance = dispatch(
          apiSlice.util.updateQueryData("getTodos", undefined, (draft) =>
            draft.filter((todo) => todo.id != id)
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          deleteTodoInstance.undo();
        }
      },
    }),

    editTodo: builder.mutation({
      query: ({ data, id }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),

      async onQueryStarted({ data, id }, { queryFulfilled, dispatch }) {
        // update todos cache optimistically
        const editTodoInstance = dispatch(
          apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.map((todo) => {
              if (todo.id == id) {
                return data;
              }
              return todo;
            });
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          editTodoInstance.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useChangeCompleteStatusMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = todoAPI;
