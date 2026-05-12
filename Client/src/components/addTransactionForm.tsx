import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/actions/transaction.actions";

export type TransactionType = "income" | "expense";
export type RecurrenceType = "monthly" | "yearly" | null;

type TransactionFormData = {
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  recurrenceType: RecurrenceType;
  description: string;
};

export const AddTransactionForm = () => {
  type AppDispatch = () => any;
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<TransactionFormData>({
    type: "expense",
    category: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    recurring: false,
    recurrenceType: null,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "amount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(addTransaction(formData,dispatch));

    setFormData({
      type: "expense",
      category: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      recurring: false,
      recurrenceType: null,
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une transaction</h2>

      <div>
        <label>Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">Dépense</option>
          <option value="income">Revenu</option>
        </select>
      </div>

      <div>
        <label>Catégorie</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Ex: Loyer, Salaire, Marketing..."
          required
        />
      </div>

      <div>
        <label>Montant (€)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="recurring"
            checked={formData.recurring}
            onChange={handleChange}
          />
          Transaction récurrente
        </label>
      </div>

      {formData.recurring && (
        <div>
          <label>Récurrence</label>
          <select
            name="recurrenceType"
            value={formData.recurrenceType || ""}
            onChange={handleChange}
          >
            <option value="">Sélectionner</option>
            <option value="monthly">Mensuelle</option>
            <option value="yearly">Annuelle</option>
          </select>
        </div>
      )}

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Détail complémentaire..."
        />
      </div>

      <button type="submit">
        Enregistrer la transaction
      </button>
    </form>
  );
};
