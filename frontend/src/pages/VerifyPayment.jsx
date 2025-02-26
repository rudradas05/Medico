import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AppContext } from "../context/AppContext";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
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
        const { data } = await axios.post(
          `${backendurl}/api/user/verify-payment?session_id=${sessionId}`,
          {},
          {
            headers: { token },
          }
        );

        if (data.success) {
          toast.success("Payment successful! Appointment confirmed.");
          navigate("/my-appointments");
        } else {
          toast.error(data.message || "Payment verification failed.");
          navigate("/");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Payment verification failed. Please contact support.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate, backendurl, token]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-semibold">Verifying payment...</h2>
    </div>
  );
};

export default VerifyPayment;
