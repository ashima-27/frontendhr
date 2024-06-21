import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import employeeSlice from "./employee";
import ticketSlice from "./ticket";
import templateSlice from "./template";
import blogSlice from "./blog"
export const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    employee:employeeSlice.reducer,
    ticket:ticketSlice.reducer,
    template:templateSlice.reducer,
    blog:blogSlice.reducer
  },
});
