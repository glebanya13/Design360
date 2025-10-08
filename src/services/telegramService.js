// Telegram Bot API сервис для экспорта экспликации в PDF
const TELEGRAM_BOT_TOKEN = '8304590877:AAEfblij32-TzdrBtCa4HNEyTu84ADUW4wY';
const TELEGRAM_CHAT_ID = '522977101'; //  845494093
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Отправка сообщения в Telegram
const sendTelegramMessage = async (message) => {
  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Форматирование данных экспликации для отправки в Telegram
export const formatExplanatoryData = (formData) => {
  const { objectType, totalArea, roomsCount, selectedRooms, roomsData } = formData;
  
  const objectTypeNames = {
    'apartment': 'Квартира',
    'studio': 'Студия', 
    'house': 'Частный дом',
    'commercial': 'Коммерческое помещение'
  };

  const roomNames = {
    'living-room': 'Гостиная',
    'kitchen': 'Кухня',
    'bedroom': 'Спальня',
    'bathroom': 'Ванная',
    'toilet': 'Туалет',
    'hallway': 'Прихожая',
    'balcony': 'Балкон',
    'dressing-room': 'Гардеробная'
  };

  let message = `🏠 <b>ЭКСПЛИКАЦИЯ ПОМЕЩЕНИЙ ПО ГОСТ 21.501-2018</b>\n\n`;
  message += `📋 <b>Тип объекта:</b> ${objectTypeNames[objectType] || objectType}\n`;
  message += `📐 <b>Общая площадь:</b> ${totalArea} м²\n`;
  message += `🚪 <b>Количество комнат:</b> ${roomsCount}\n\n`;
  
  message += `📊 <b>ДЕТАЛИЗАЦИЯ ПОМЕЩЕНИЙ:</b>\n`;
  
  let totalCalculatedArea = 0;
  
  selectedRooms.forEach(roomId => {
    const roomData = roomsData[roomId] || {};
    const roomName = roomNames[roomId] || roomId;
    const area = roomData.area || '0.0';
    totalCalculatedArea += parseFloat(area);
    
    message += `• ${roomName}: ${area} м²`;
    
    if (roomData.length && roomData.width) {
      message += ` (${roomData.length}м × ${roomData.width}м)`;
    }
    
    if (roomData.height) {
      message += `, высота: ${roomData.height}м`;
    }
    
    if (roomData.purpose) {
      message += `\n  Назначение: ${roomData.purpose}`;
    }
    
    if (roomData.requirements) {
      message += `\n  Требования: ${roomData.requirements}`;
    }
    
    message += `\n`;
  });
  
  message += `\n📈 <b>ИТОГО:</b> ${totalCalculatedArea.toFixed(1)} м²\n\n`;
  message += `📅 <b>Дата создания:</b> ${new Date().toLocaleString('ru-RU')}\n`;
  message += `🔗 <b>Источник:</b> Дизайн360 - Экспликация помещений`;

  return message;
};

// Отправка экспликации в Telegram
export const sendExplanatoryToTelegram = async (formData) => {
  try {
    const message = formatExplanatoryData(formData);
    await sendTelegramMessage(message);
    return { success: true, message: 'Экспликация успешно отправлена в Telegram!' };
  } catch (error) {
    return { success: false, message: 'Ошибка отправки в Telegram', error: error.message };
  }
};

