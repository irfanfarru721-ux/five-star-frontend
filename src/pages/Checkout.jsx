import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/api.js"; // optional backend API
import { useAuth } from "../context/AuthContext.jsx";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Example: call your backend to create an order
    // await createOrder(user.id, cartItems);

    alert("Checkout successful!");
    navigate("/orders");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {user ? (
        <div>
          <p>Ready to place your order, {user.email}?</p>
          <button
            onClick={handleCheckout}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Place Order
          </button>
        </div>
      ) : (
        <p>Please login to proceed with checkout.</p>
      )}
    </div>
  );
}
