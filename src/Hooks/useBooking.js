import { useState } from "react";
import useFetch from "./useFetch";
import { useTimeSlots } from "./useTimeSlots";
import { toast } from "react-toastify";

export const useBooking = (
  hairdresser,
  handleClose,
  localAppointments,
  setLocalAppointments
) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
  });

  const makeAppointment = useFetch("/appointments", { method: "POST" });
  const availableSlots = useTimeSlots(
    hairdresser,
    localAppointments,
    selectedDate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      hairdresser_id: hairdresser.id,
      customer_name: userData.name,
      customer_phone: userData.phone,
      appointment_date: `${selectedDate} ${selectedTime}:00`,
      service: hairdresser.services[0],
    };

    try {
      const result = await makeAppointment({
        body: JSON.stringify(appointmentData),
      });

      if (result) {
        setLocalAppointments((prev) => [...prev, result]);
        toast.success("Sikeres időpontfoglalás!", {
          position: "bottom-center",
          autoClose: 3000,
        });
        setSelectedTime(null);
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      toast.error("Hiba történt a foglalás során!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    userData,
    setUserData,
    availableSlots,
    handleSubmit,
  };
};
