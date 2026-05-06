import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DashboardState {
  monthlyIncome: number;
  monthlyExpense: number;
  netBalance: number;
  burnRate: number;
  runway: number;
  cashForecast3Months: number;
  loading: boolean;
}

const initialState: DashboardState = {
  monthlyIncome: 0,
  monthlyExpense: 0,
  netBalance: 0,
  burnRate: 0,
  runway: 0,
  cashForecast3Months: 0,
  loading: false,
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async () => {
    const res = await axios.get("/api/dashboard", {
      withCredentials: true,
    });

    return res.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.monthlyIncome = action.payload.monthlyIncome;
        state.monthlyExpense = action.payload.monthlyExpense;
        state.netBalance = action.payload.netBalance;
        state.burnRate = action.payload.burnRate;
        state.runway = action.payload.runway;
        state.cashForecast3Months =
          action.payload.cashForecast3Months;
      });
  },
});

export default dashboardSlice.reducer;