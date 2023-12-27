import { useEffect, useState } from "react";

function OrderDeliveryTimeCounter({ deliveryTimeFromApi }) {
    const [deliveryTime, setDeliveryTime] = useState(0);
  
    useEffect(() => {
      const startTime = new Date(deliveryTimeFromApi).getTime() / 1000; // Converter para segundos
      const intervalId = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000); // Obter o tempo atual em segundos
        setDeliveryTime(currentTime - startTime);
      }, 1000);
  
      // Lembre-se de limpar o intervalo quando o componente for desmontado
      return () => clearInterval(intervalId);
    }, [deliveryTimeFromApi]);
  
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
  
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
  
    return <p>{formatTime(deliveryTime)}</p>;
  }

  export default OrderDeliveryTimeCounter;