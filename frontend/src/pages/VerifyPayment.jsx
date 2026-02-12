import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppContext } from "../context/AppContext";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentType = searchParams.get("type"); // "service" or null (appointment)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { backendurl, token } = useContext(AppContext);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Invalid payment session");
        navigate("/");
        return;
      }

      try {
        const endpoint =
          paymentType === "service"
            ? `${backendurl}/api/services/verify-payment?session_id=${sessionId}`
            : `${backendurl}/api/user/verify-payment?session_id=${sessionId}`;

        const { data } = await axios.post(
          endpoint,
          {},
          {
            headers: { token },
          },
        );

        if (data.success) {
          toast.success(
            paymentType === "service"
              ? "Payment successful! Service booking confirmed."
              : "Payment successful! Appointment confirmed.",
          );
          navigate("/my-appointments");
        } else {
          toast.error(data.message || "Payment verification failed.");
          navigate("/");
        }
      } catch (error) {
        toast.error("Payment verification failed. Please contact support.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate, backendurl, token, paymentType]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-semibold">Verifying payment...</h2>
    </div>
  );
};

export default VerifyPayment;
