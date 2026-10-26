
import { useState } from "react";
import { useCashier } from "../context/CashierContext";

function Login() {
  const [name, setName] = useState("");
  const { login } = useCashier();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    login(name);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-2 text-2xl font-bold">
          Supermarket POS
        </h1>

        <p className="mb-6 text-gray-500">
          Enter your cashier name to continue.
        </p>

        <label className="mb-2 block font-medium">
          Cashier Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          autoFocus
          className="mb-5 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
