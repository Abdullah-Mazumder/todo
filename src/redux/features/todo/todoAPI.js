import { apiSlice } from "../../api/apiSlice";

export const todoAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      keepUnusedDataFor: 600,
    }),

    addTodo: builder.mutation({
      query: (data) => {
        return {
          url: "/todos",
          method: "POST",
          body: data,
        };
      },

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        // update getAssignments cache pessimistically
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
              draft.data.unshift(data.data);
            })
          );
        } catch (error) {
          // do nothing
        }
      },
    }),

    deleteTodo: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/todos/${id}`,
          method: "DELETE",
        };
      },

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        // update todos cache optimistically
        const deleteTodoInstance = dispatch(
          apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
            const i = draft.data.findIndex((todo) => todo.id == id);
            draft.data.splice(i, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          deleteTodoInstance.undo();
        }
      },
    }),

    editTodo: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/todos/${id}`,
          method: "PUT",
          body: data,
        };
      },

      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        // update todos cache pessimistically
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
              draft.data.map((todo) => {
                if (todo.id == id) {
                  todo.text = data.data.text;
                }
                return todo;
              });
            })
          );
        } catch (error) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = todoAPI;
