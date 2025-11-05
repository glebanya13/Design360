const BOT_CONFIG = {
  BOT_TOKEN: '8304590877:AAEfblij32-TzdrBtCa4HNEyTu84ADUW4wY',
  CHAT_ID:  '572193621', //'522977101',
  API_URL: 'https://api.telegram.org/bot'
};

const escapeHtml = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.description || `HTTP error! status: ${response.status}`;
      console.error('Telegram API error:', errorData);
      throw new Error(errorMessage);
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
      const length = params.length?.toString() || '0';
      const width = params.width?.toString() || '0';
      const height = params.height?.toString() || '0';
      const area = params.area?.toString() || '0.0';
      return `• ${escapeHtml(roomName)}: ${escapeHtml(area)} м² (${escapeHtml(length)}×${escapeHtml(width)}×${escapeHtml(height)} м)`;
    }).join('\n');
  }

  let roomsFullDetails = '';
  if (selectedRooms.length > 0) {
    roomsFullDetails = selectedRooms.map(roomId => {
      const roomName = roomTypeNames[roomId] || roomId;
      const params = roomParams[roomId] || {};
      const length = params.length?.toString() || '0';
      const width = params.width?.toString() || '0';
      const height = params.height?.toString() || '0';
      const area = params.area?.toString() || '0.0';
      const purpose = escapeHtml(params.purpose || 'Не указано');
      const requirements = escapeHtml(params.requirements || 'Не указаны');
      return `\n🏠 <b>${escapeHtml(roomName)}</b>:
📐 Размеры: ${escapeHtml(length)} × ${escapeHtml(width)} × ${escapeHtml(height)} м
📏 Площадь: ${escapeHtml(area)} м²
🎯 Назначение: ${purpose}
⚙️ Требования: ${requirements}`;
    }).join('\n');
  }

  const totalCalculatedArea = selectedRooms.reduce((total, roomId) => {
    const params = roomParams[roomId] || {};
    const area = params.area?.toString() || '0';
    return total + (parseFloat(area) || 0);
  }, 0).toFixed(1);

  const objectTypeName = escapeHtml(objectTypeNames[objectType] || objectType);
  const dateStr = new Date().toLocaleString('ru-RU');

  const message = `🏠 <b>ЭКСПЛИКАЦИЯ ПОМЕЩЕНИЙ ПО ГОСТ 21.501-2018</b>

📋 <b>Тип объекта:</b> ${objectTypeName}
📐 <b>Общая площадь:</b> ${escapeHtml(totalCalculatedArea)} м²
🚪 <b>Количество комнат:</b> ${escapeHtml(roomsCount)}

📊 <b>КРАТКАЯ СВОДКА:</b>
${roomsDetails || '• Данные не заполнены'}

📋 <b>ПОДРОБНАЯ ИНФОРМАЦИЯ О ПОМЕЩЕНИЯХ:</b>${roomsFullDetails || '\n• Данные не заполнены'}

📈 <b>ИТОГО:</b> ${escapeHtml(totalCalculatedArea)} м²

📅 <b>Дата создания:</b> ${escapeHtml(dateStr)}
🔗 <b>Источник:</b> Дизайн360 - Экспликация помещений`.trim();

  // Telegram ограничение на длину сообщения - 4096 символов
  if (message.length > 4096) {
    // Если сообщение слишком длинное, обрезаем roomsFullDetails
    const shortRoomsDetails = selectedRooms.map(roomId => {
      const roomName = roomTypeNames[roomId] || roomId;
      const params = roomParams[roomId] || {};
      const area = params.area?.toString() || '0.0';
      return `• ${escapeHtml(roomName)}: ${escapeHtml(area)} м²`;
    }).join('\n');

    return `🏠 <b>ЭКСПЛИКАЦИЯ ПОМЕЩЕНИЙ ПО ГОСТ 21.501-2018</b>

📋 <b>Тип объекта:</b> ${objectTypeName}
📐 <b>Общая площадь:</b> ${escapeHtml(totalCalculatedArea)} м²
🚪 <b>Количество комнат:</b> ${escapeHtml(roomsCount)}

📊 <b>СВОДКА:</b>
${shortRoomsDetails || '• Данные не заполнены'}

📈 <b>ИТОГО:</b> ${escapeHtml(totalCalculatedArea)} м²

📅 <b>Дата создания:</b> ${escapeHtml(dateStr)}
🔗 <b>Источник:</b> Дизайн360 - Экспликация помещений`.trim();
  }

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
