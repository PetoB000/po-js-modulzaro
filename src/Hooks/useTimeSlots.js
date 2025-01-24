export const useTimeSlots = (hairdresser, appointments, selectedDate) => {
  const generateTimeSlots = () => {
    if (!hairdresser || !appointments) return [];

    const slots = [];
    const [startHour] = hairdresser.work_start_time.split(":");
    const [endHour] = hairdresser.work_end_time.split(":");

    for (let hour = parseInt(startHour); hour < parseInt(endHour); hour++) {
      for (let minutes of ["00", "30"]) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minutes}`;
        slots.push(timeString);
      }
    }

    const bookedSlots = Array.isArray(appointments)
      ? appointments
          .filter((app) => {
            if (!app.appointment_date) return false;
            const [appDate] = app.appointment_date.split(" ");
            return (
              app.hairdresser_id === hairdresser.id.toString() &&
              appDate === selectedDate
            );
          })
          .map((app) => {
            const [, time] = app.appointment_date.split(" ");
            return time.substring(0, 5);
          })
      : [];

    return slots.filter((time) => !bookedSlots.includes(time));
  };

  return generateTimeSlots();
};
