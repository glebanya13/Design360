const BOT_CONFIG = {
  BOT_TOKEN: '8304590877:AAEfblij32-TzdrBtCa4HNEyTu84ADUW4wY',
  CHAT_ID: '522977101',
  API_URL: 'https://api.telegram.org/bot'
};

export const sendMessageToBot = async (message) => {
  try {
    const response = await fetch(`${BOT_CONFIG.API_URL}${BOT_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: BOT_CONFIG.CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending message to bot:', error);
    return { success: false, error: error.message };
  }
};

export const formatFormDataForBot = (formData) => {
  const { objectType, totalArea, roomsCount, selectedRooms, roomParams } = formData;
  
  const objectTypeNames = {
    'apartment': 'Квартира',
    'studio': 'Студия', 
    'house': 'Частный дом',
    'commercial': 'Коммерция'
  };

  const roomTypeNames = {
    'living-room': 'Гостиная',
    'kitchen': 'Кухня',
    'bedroom': 'Спальня',
    'bathroom': 'Ванная',
    'toilet': 'Туалет',
    'hallway': 'Прихожая',
    'balcony': 'Балкон',
    'dressing-room': 'Гардеробная'
  };

  const selectedRoomsNames = selectedRooms.map(room => roomTypeNames[room] || room);

  let roomsDetails = '';
  if (selectedRooms.length > 0) {
    roomsDetails = selectedRooms.map(roomId => {
      const roomName = roomTypeNames[roomId] || roomId;
      const params = roomParams[roomId] || {};
      return `• ${roomName}: ${params.area || '0.0'} м² (${params.length || '0'}×${params.width || '0'}×${params.height || '0'} м)`;
    }).join('\n');
  }

  let roomsFullDetails = '';
  if (selectedRooms.length > 0) {
    roomsFullDetails = selectedRooms.map(roomId => {
      const roomName = roomTypeNames[roomId] || roomId;
      const params = roomParams[roomId] || {};
      return `\n🏠 <b>${roomName}</b>:
📐 Размеры: ${params.length || '0'} × ${params.width || '0'} × ${params.height || '0'} м
📏 Площадь: ${params.area || '0.0'} м²
🎯 Назначение: ${params.purpose || 'Не указано'}
⚙️ Требования: ${params.requirements || 'Не указаны'}`;
    }).join('\n');
  }

  const totalCalculatedArea = selectedRooms.reduce((total, roomId) => {
    const params = roomParams[roomId] || {};
    return total + (parseFloat(params.area) || 0);
  }, 0).toFixed(1);

  const message = `
🏠 <b>ЭКСПЛИКАЦИЯ ПОМЕЩЕНИЙ ПО ГОСТ 21.501-2018</b>

📋 <b>Тип объекта:</b> ${objectTypeNames[objectType] || objectType}
📐 <b>Общая площадь:</b> ${totalCalculatedArea} м²
🚪 <b>Количество комнат:</b> ${roomsCount}

📊 <b>КРАТКАЯ СВОДКА:</b>
${roomsDetails || '• Данные не заполнены'}

📋 <b>ПОДРОБНАЯ ИНФОРМАЦИЯ О ПОМЕЩЕНИЯХ:</b>${roomsFullDetails || '\n• Данные не заполнены'}

📈 <b>ИТОГО:</b> ${totalCalculatedArea} м²

📅 <b>Дата создания:</b> ${new Date().toLocaleString('ru-RU')}
🔗 <b>Источник:</b> Дизайн360 - Экспликация помещений
  `.trim();

  return message;
};

export const submitFormToBot = async (formData) => {
  try {
    const message = formatFormDataForBot(formData);
    const result = await sendMessageToBot(message);
    
    if (result.success) {
      return {
        success: true,
        message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
      };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error submitting form to bot:', error);
    return {
      success: false,
      message: 'Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами напрямую.'
    };
  }
};

export const checkBotConfig = () => {
  return BOT_CONFIG.BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE' && 
         BOT_CONFIG.CHAT_ID !== 'YOUR_CHAT_ID_HERE';
};
