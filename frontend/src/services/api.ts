import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article } from "../types/dataTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://backend-bitter-wave-1281.fly.dev/api`,
  }),
  tagTypes: ["Session", "User", "Article"],
  endpoints: (builder) => ({
    // AUTH

    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["Session", "Article", "User"],
    }),
    logout: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    // USER

    getUserById: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    // ARTICLE

    getArticle: builder.query({
      query: () => ({
        url: "/article",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Article"],
    }),
    getArticleById: builder.query({
      query: (articleId) => ({
        url: `/article/${articleId}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Article"],
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: "/article/create",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: ["Article"],
    }),
    editArticle: builder.mutation({
      query: ({ articleId, body }) => ({
        url: `/article/${articleId}`,
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation({
      query: (articleId) => ({
        url: `/article/${articleId}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Article"],
    }),

    // COMBINED

    getArticlesWithAuthor: builder.query({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const { data: articles } = await queryApi.dispatch(
          api.endpoints.getArticle.initiate({})
        );

        const articlesWithAuthor = articles.data.map(
          async (article: Article) => {
            try {
              const { data: author } = await queryApi.dispatch(
                api.endpoints.getUserById.initiate(article.author)
              );
              console.log(author);
              return {
                ...article,
                author: author.user.username,
              };
            } catch (error) {
              console.error(
                `Error fetching author for article ${article._id}:`,
                error
              );
              return {
                ...article,
                author: "Deleted account",
              };
            }
          }
        );
        const result: Article[] = await Promise.all(articlesWithAuthor);
        console.log(`articlesWithAuthor: ${JSON.stringify(result)}`);
        return { data: result };
      },
      providesTags: ["Article"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetArticleQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useGetArticlesWithAuthorQuery,
} = api;
