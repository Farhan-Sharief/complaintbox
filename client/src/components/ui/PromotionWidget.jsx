import { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";

export default function PromotionWidget() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "https://complaintbox-ownf.onrender.com/api/promotion/active";

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await axios.get(API);
        setPromotions(res.data);
      } catch (err) {
        console.error("Promotion fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900/50 p-6 rounded-2xl">
        Loading promotions...
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4">
        Active Promotions
      </h3>

      {promotions.length === 0 && (
        <p className="text-gray-400">
          No active promotions
        </p>
      )}

      <div className="space-y-3">
        {promotions.map((promo) => (
          <div
            key={promo._id}
            className="bg-gray-800 p-3 rounded-lg"
          >
            <p className="font-semibold">
              {promo.title}
            </p>
            <p className="text-sm text-gray-400">
              {promo.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}