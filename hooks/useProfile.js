import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AlertContext } from "../context/alertContext";
export const useProfile = () => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/application/login");
        showAlert("You must be logged in to view this page");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch profile");
      showAlert(err.response?.data || "Failed to fetch profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetchProfile: fetchProfile,
  };
};
