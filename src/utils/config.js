export const config = {
  urls: {
    baseUrl: "http://localhost:3000",
    auth: {
      login: "/auth/login",
      signup: "/auth/signup",
      logout: "/auth/logout",
    },
    profile: {
      view: "/profile/view",
      edit: "/profile/edit",
    },
    user: {
      feed: "/user/feed",
      connections: "/user/connections",
      requestReceived: "/user/requests/received",
    },
    request: {
      send: "/request/send",
      review: "/request/review",
    },
  },
};
