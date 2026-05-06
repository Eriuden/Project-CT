import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchDashboard } from "../dashboardSlice";

const DashboardHome = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    monthlyIncome,
    monthlyExpense,
    netBalance,
    burnRate,
    runway,
    cashForecast3Months,
    loading,
  } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading) {
    return <p>Chargement du dashboard...</p>;
  }

  return (
    <div className="dashboard-container">

      {/* HERO SECTION */}
      <section className="main-balance-card">
        <h1>Bilan mensuel</h1>

        <h2>
          {netBalance >= 0 ? "+" : ""}
          {netBalance} €
        </h2>

        <p>
          {netBalance >= 0
            ? "Excédent ce mois-ci"
            : "Déficit ce mois-ci"}
        </p>
      </section>

      {/* KPI GRID */}
      <section className="kpi-grid">

        <div className="kpi-card">
          <h3>Revenus</h3>
          <p>{monthlyIncome} €</p>
        </div>

        <div className="kpi-card">
          <h3>Dépenses</h3>
          <p>{monthlyExpense} €</p>
        </div>

        <div className="kpi-card">
          <h3>Burn Rate</h3>
          <p>{burnRate} € / mois</p>
        </div>

        <div className="kpi-card">
          <h3>Runway</h3>
          <p>
            {runway === Infinity
              ? "Illimité"
              : `${runway.toFixed(1)} mois`}
          </p>
        </div>

        <div className="kpi-card">
          <h3>Prévision à 3 mois</h3>
          <p>{cashForecast3Months} €</p>
        </div>

      </section>

    </div>
  );
};

export default DashboardHome;