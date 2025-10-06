const TELEGRAM_BOT_TOKEN = '8304590877:AAEfblij32-TzdrBtCa4HNEyTu84ADUW4wY';

/**
 * Send message to Telegram bot
 */
const sendToTelegram = async (formData, totalArea) => {
  try {
    const chatId = '522977101';
    
    const message = createTelegramMessage(formData, totalArea);
    await sendTelegramMessage(chatId, message);
    
    await sendTelegramFiles(chatId, formData.files);
    
    return {
      success: true,
      message: 'Technical specification successfully sent to Telegram!',
      method: 'telegram'
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Send text message to Telegram
 */
const sendTelegramMessage = async (chatId, message) => {
  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(telegramApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  });

  const result = await response.json();
  
  if (!result.ok) {
    throw new Error('Telegram message API error: ' + result.description);
  }
  
  return result;
};

/**
 * Send files to Telegram
 */
const sendTelegramFiles = async (chatId, files) => {
  
  const fileTypes = {
    'measurement': 'Обмерный план',
    'technical': 'Техническое задание', 
    'photos': 'Фотографии/видео',
    'examples': 'Примеры интерьеров',
    'docs': 'Проектная документация'
  };
  
  for (const [type, fileList] of Object.entries(files)) {
    if (fileList && fileList.length > 0) {
      
      // Send a header message for this file type
      await sendTelegramMessage(chatId, `<b>📎 ${fileTypes[type]}:</b>`);
      
      // Send each file in this category
      for (const file of fileList) {
        await sendTelegramFile(chatId, file);
      }
    }
  }
};

/**
 * Send individual file to Telegram
 */
const sendTelegramFile = async (chatId, file) => {
  
  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;
  
  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('document', file, file.name);
  formData.append('caption', `📄 ${file.name}`);
  
  const response = await fetch(telegramApiUrl, {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  
  if (!result.ok) {
    // Don't throw error for individual file failures, just log them
    // This way other files can still be sent
  }
  
  return result;
};

/**
 * Format form data into a Telegram message
 */
const createTelegramMessage = (formData, totalArea) => {
  const getRoomTypeText = (type) => {
    const types = {
      'hall': 'Коридор',
      'living': 'Гостиная',
      'kitchen': 'Кухня',
      'kitchen-living': 'Кухня-гостиная',
      'bedroom': 'Спальня',
      'children': 'Детская',
      'bathroom': 'Ванная',
      'toilet': 'Санузел',
      'combined-bathroom': 'С/У совмещенный',
      'balcony': 'Балкон',
      'loggia': 'Лоджия',
      'wardrobe': 'Гардеробная',
      'office': 'Кабинет',
      'pantry': 'Кладовая',
      'other': 'Другое помещение'
    };
    return types[type] || 'Не указано';
  };

  const getObjectTypeText = () => {
    // New simplified types from HTML v2.0
    const simpleMap = {
      'apartment': 'Квартира',
      'studio': 'Студия',
      'house': 'Частный дом',
      'commercial': 'Коммерческое помещение'
    };
    if (simpleMap[formData.objectType]) {
      return simpleMap[formData.objectType];
    }
    // Legacy detailed structure
    if (formData.objectType === 'residential') {
      if (formData.residentialType === 'apartment') {
        const apartmentTypes = {
          'studio': 'Студия',
          '1': '1-комнатная квартира',
          '2': '2-комнатная квартира',
          '3': '3-комнатная квартира',
          '4': '4-комнатная квартира и более',
          'other': formData.apartmentOtherText || 'Другое (не указано)'
        };
        return apartmentTypes[formData.apartmentType] || 'Квартира';
      } else if (formData.residentialType === 'house') {
        return `Частный дом / Таунхаус${formData.houseFloors ? `, ${formData.houseFloors} этаж(а)` : ''}`;
      }
      return 'Жилая недвижимость';
    } else if (formData.objectType === 'commercial') {
      const commercialTypes = {
        'office': 'Офис / Кабинет',
        'shop': 'Магазин / Шоу-рум',
        'restaurant': 'Ресторан / Бар / Кафе',
        'hotel': 'Гостиница / Отель',
        'mall': 'Торговый центр',
        'warehouse': 'Склад / Производственное помещение',
        'public': `Общественное здание${formData.publicType?.length ? `: ${formData.publicType.join(', ')}` : ''}`,
        'other': formData.commercialOtherText || 'Другое (не указано)'
      };
      return commercialTypes[formData.commercialType] || 'Коммерческая недвижимость';
    }
    return 'Не указано';
  };

  const getProjectPartsText = () => {
    const parts = [];
    if (formData.projectParts?.includes('apr')) parts.push('Архитектурно-планировочные решения (АПР)');
    if (formData.projectParts?.includes('design')) parts.push('Дизайн-проект интерьера');
    if (formData.projectParts?.includes('working')) parts.push('Рабочая документация (Конструктив)');
    if (formData.projectParts?.includes('engineering')) parts.push('Инженерные разделы');
    return parts;
  };

  const stylesBudgetSection = (() => {
    // New fields
    if (formData.preferredStyle || formData.colorPreferences || formData.budget) {
      const styleMap = {
        'warm-minimalism': 'Теплый минимализм',
        'urban-loft': 'Урбан-лофт',
        'scandinavian': 'Скандинавский',
        'japanese': 'Японский минимализм',
        'industrial-light': 'Индастриал-лайт',
        'modern-kitsch': 'Современный китч'
      };
      let result = '';
      if (formData.preferredStyle) result += `• <b>Стиль:</b> ${styleMap[formData.preferredStyle] || formData.preferredStyle}\n`;
      if (formData.colorPreferences) result += `• <b>Цветовые предпочтения:</b> ${formData.colorPreferences}\n`;
      if (formData.budget) {
        const budgetMap = {
          '100-300': '100-300 тыс. руб.',
          '300-500': '300-500 тыс. руб.',
          '500-800': '500-800 тыс. руб.',
          '800-1200': '800-1200 тыс. руб.',
          '1200+': '1.2 млн+ руб.'
        };
        result += `• <b>Бюджет:</b> ${budgetMap[formData.budget] || formData.budget}\n`;
      }
      return result || null;
    }
    return null;
  })();

  // Rooms section supporting new roomsList
  const roomsSection = (() => {
    if (Array.isArray(formData.rooms) && formData.rooms.length) {
      return formData.rooms.map(room => 
        `• ${room.name || getRoomTypeText(room.type)}: ${room.area} м²${room.comment ? ` (${room.comment})` : ''}`
      ).join('\n');
    }
    if (Array.isArray(formData.roomsList) && formData.roomsList.length) {
      return formData.roomsList.map(r => `• ${r}`).join('\n');
    }
    return '• Помещения не добавлены';
  })();

  return `<b>🏢 ТЕХНИЧЕСКОЕ ЗАДАНИЕ</b>
<i>Студия дизайна интерьеров «Дизайн360»</i>

📋 <b>ОБЩАЯ ИНФОРМАЦИЯ:</b>
• <b>Проект:</b> ${formData.projectName || '-'}
• <b>ФИО:</b> ${formData.clientName || '-'}
• <b>Телефон:</b> ${formData.clientPhone || '-'}
• <b>Email:</b> ${formData.clientEmail || '-'}
• <b>Адрес:</b> ${formData.objectAddress || '-'}

🏢 <b>ТИП ОБЪЕКТА:</b>
${getObjectTypeText()}

🏠 <b>ПОМЕЩЕНИЯ:</b>
${roomsSection}

<b>Общая площадь:</b> ${totalArea.toFixed(1)} м²

📐 <b>СОСТАВ ПРОЕКТА:</b>
${(() => {
  const parts = [];
  if (formData.projectParts?.includes('apr')) parts.push('• Архитектурно-планировочные решения (АПР)');
  if (formData.projectParts?.includes('design')) parts.push('• Дизайн-проект интерьера');
  if (formData.projectParts?.includes('working')) parts.push('• Рабочая документация (Конструктив)');
  if (formData.projectParts?.includes('engineering')) parts.push('• Инженерные разделы');
  return parts.length > 0 ? parts.join('\n') : '• Разделы проекта не выбраны';
})()}

🎨 <b>СТИЛЬ И БЮДЖЕТ:</b>
${(() => {
  if (stylesBudgetSection) return stylesBudgetSection;
  // Legacy styles block
  const styles = {
    'scandinavian': 'Скандинавский',
    'loft': 'Лофт',
    'minimalism': 'Минимализм',
    'modern': 'Современный',
    'classic': 'Классический',
    'neoclassic': 'Неоклассика',
    'provence': 'Прованс',
    'ardeco': 'Ар-деко',
    'other': formData.styleOtherText || 'Другое'
  };
  const selectedStyles = formData.styles?.map(style => styles[style] || style) || [];
  let result = '';
  if (selectedStyles.length > 0) result += `• <b>Стили:</b> ${selectedStyles.join(', ')}\n`;
  const colors = { 'light': 'Светлая','dark': 'Темная','neutral': 'Нейтральная','bright': 'Яркая / Контрастная' };
  if (formData.colorScheme) result += `• <b>Цветовая гамма:</b> ${colors[formData.colorScheme]}\n`;
  if (formData.colorPreferences) result += `• <b>Цветовые предпочтения:</b> ${formData.colorPreferences}\n`;
  if (formData.wishes) result += `• <b>Пожелания:</b> ${formData.wishes}\n`;
  if (formData.budget) result += `• <b>Бюджет:</b> ${formData.budget}\n`;
  return result || '• Информация о стиле и бюджете не указана';
})()}

📎 <b>ЗАГРУЖЕННЫЕ ФАЙЛЫ:</b>
${(() => {
  let hasFiles = false;
  
  Object.keys(formData.files).forEach(type => {
    if (formData.files[type]?.length > 0) {
      hasFiles = true;
    }
  });
  
  if (formData.pinterestLinks) {
    hasFiles = true;
  }
  
  if (hasFiles) {
    let result = '• Файлы будут отправлены отдельными сообщениями\n';
    if (formData.pinterestLinks) {
      result += `• <b>Ссылки на примеры:</b> ${formData.pinterestLinks}\n`;
    }
    return result;
  } else {
    return '• Файлы не загружены';
  }
})()}

<i>Создано через форму Дизайн360</i>`;
};

/**
 * Send email with form data using multiple methods
 */
export const sendFormEmail = async (formData, totalArea) => {
  // Send to Telegram bot instead of email
  return await sendToTelegram(formData, totalArea);
};

/**
 * Send via Web3Forms (primary method)
 */
const sendViaWeb3Forms = async (formData, totalArea) => {
  // Public Web3Forms access key for demo - replace with your own
  const accessKey = 'c4c7b5c2-8a3d-4b7f-9e1a-2d5c8f6e4a3b';
  
  const formData3 = new FormData();
  formData3.append('access_key', accessKey);
  formData3.append('to_email', 'gleb.shershnev@yandex.ru');
  formData3.append('from_name', formData.clientName || 'Design360 Form');
  formData3.append('from_email', formData.clientEmail || 'noreply@design360.com');
  formData3.append('subject', `New Technical Specification: ${formData.projectName || 'Unnamed Project'}`);
  
  // Add all form data
  formData3.append('project_name', formData.projectName || 'Not specified');
  formData3.append('client_name', formData.clientName || 'Not specified');
  formData3.append('client_phone', formData.clientPhone || 'Not specified');
  formData3.append('client_email', formData.clientEmail || 'Not specified');
  formData3.append('object_address', formData.objectAddress || 'Not specified');
  formData3.append('total_area', totalArea.toFixed(1) + ' m²');
  
  // Add detailed message
  formData3.append('message', createTextEmailContent(formData, totalArea));
  
  // Additional settings
  formData3.append('_template', 'table');
  formData3.append('_subject', `New Technical Specification from ${formData.clientName || 'Client'}`);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData3
  });

  const result = await response.json();

  if (result.success) {
    return {
      success: true,
      message: 'Technical specification successfully sent to the design studio!',
      method: 'web3forms'
    };
  } else {
    throw new Error('Web3Forms request failed: ' + result.message);
  }
};

/**
 * Fallback method using mailto link
 */
export const sendFormEmailViaMailto = async (formData, totalArea) => {
  try {
    const subject = `New Technical Specification: ${formData.projectName || 'Unnamed Project'}`;
    const textContent = createTextEmailContent(formData, totalArea);
    
    // Truncate content if too long for mailto
    const maxBodyLength = 1500;
    const body = textContent.length > maxBodyLength 
      ? textContent.substring(0, maxBodyLength) + '\n\n[Content truncated - full details in form]'
      : textContent;
    
    const mailtoLink = `mailto:gleb.shershnev@yandex.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Force open mailto link using location.href (more reliable)
    window.location.href = mailtoLink;
    
    return {
      success: true,
      message: 'Opening your email client to send the technical specification.',
      method: 'mailto'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error opening email client: ' + error.message,
      error
    };
  }
};

/**
 * Create text version of email content
 */
const createTextEmailContent = (formData, totalArea) => {

  const getRoomTypeText = (type) => {
    const types = {
      'hall': 'Коридор',
      'living': 'Гостиная',
      'kitchen': 'Кухня',
      'kitchen-living': 'Кухня-гостиная',
      'bedroom': 'Спальня',
      'children': 'Детская',
      'bathroom': 'Ванная',
      'toilet': 'Санузел',
      'combined-bathroom': 'С/У совмещенный',
      'balcony': 'Балкон',
      'loggia': 'Лоджия',
      'wardrobe': 'Гардеробная',
      'office': 'Кабинет',
      'pantry': 'Кладовая',
      'other': 'Другое помещение'
    };
    return types[type] || 'Не указано';
  };

  const getObjectTypeText = () => {
    if (formData.objectType === 'residential') {
      if (formData.residentialType === 'apartment') {
        const apartmentTypes = {
          'studio': 'Студия',
          '1': '1-комнатная квартира',
          '2': '2-комнатная квартира',
          '3': '3-комнатная квартира',
          '4': '4-комнатная квартира и более',
          'other': formData.apartmentOtherText || 'Другое (не указано)'
        };
        return apartmentTypes[formData.apartmentType] || 'Квартира';
      } else if (formData.residentialType === 'house') {
        return `Частный дом / Таунхаус${formData.houseFloors ? `, ${formData.houseFloors} этаж(а)` : ''}`;
      }
      return 'Жилая недвижимость';
    } else if (formData.objectType === 'commercial') {
      const commercialTypes = {
        'office': 'Офис / Кабинет',
        'shop': 'Магазин / Шоу-рум',
        'restaurant': 'Ресторан / Бар / Кафе',
        'hotel': 'Гостиница / Отель',
        'mall': 'Торговый центр',
        'warehouse': 'Склад / Производственное помещение',
        'public': `Общественное здание${formData.publicType?.length ? `: ${formData.publicType.join(', ')}` : ''}`,
        'other': formData.commercialOtherText || 'Другое (не указано)'
      };
      return commercialTypes[formData.commercialType] || 'Коммерческая недвижимость';
    }
    return 'Не указано';
  };

  return `
=====================================
ТЕХНИЧЕСКОЕ ЗАДАНИЕ
Студия дизайна интерьеров «Дизайн360»
=====================================

📋 ОБЩАЯ ИНФОРМАЦИЯ:
--------------------
Название проекта: ${formData.projectName || '-'}
ФИО клиента: ${formData.clientName || '-'}
Телефон: ${formData.clientPhone || '-'}
Email: ${formData.clientEmail || '-'}
Адрес объекта: ${formData.objectAddress || '-'}

🏢 ТИП ОБЪЕКТА:
---------------
${getObjectTypeText()}

🏠 ПОМЕЩЕНИЯ:
-------------
${formData.rooms?.length ? formData.rooms.map(room => 
    `${room.name || getRoomTypeText(room.type)}: ${room.area} м²${room.comment ? ` (${room.comment})` : ''}`
  ).join('\n') : 'Помещения не добавлены'}

Общая площадь: ${totalArea.toFixed(1)} м²

📐 СОСТАВ ПРОЕКТА:
------------------
${(() => {
  const parts = [];
  if (formData.projectParts?.includes('apr')) parts.push('• Архитектурно-планировочные решения (АПР)');
  if (formData.projectParts?.includes('design')) parts.push('• Дизайн-проект интерьера');
  if (formData.projectParts?.includes('working')) parts.push('• Рабочая документация (Конструктив)');
  if (formData.projectParts?.includes('engineering')) parts.push('• Инженерные разделы');
  return parts.length > 0 ? parts.join('\n') : 'Разделы проекта не выбраны';
})()}

🎨 СТИЛЬ И БЮДЖЕТ:
------------------
${(() => {
  const styles = {
    'scandinavian': 'Скандинавский',
    'loft': 'Лофт',
    'minimalism': 'Минимализм',
    'modern': 'Современный',
    'classic': 'Классический',
    'neoclassic': 'Неоклассика',
    'provence': 'Прованс',
    'ardeco': 'Ар-деко',
    'other': formData.styleOtherText || 'Другое'
  };
  const selectedStyles = formData.styles?.map(style => styles[style] || style) || [];
  let result = '';
  if (selectedStyles.length > 0) result += `Стили: ${selectedStyles.join(', ')}\n`;
  
  const colors = {
    'light': 'Светлая',
    'dark': 'Темная',
    'neutral': 'Нейтральная',
    'bright': 'Яркая / Контрастная'
  };
  if (formData.colorScheme) result += `Цветовая гамма: ${colors[formData.colorScheme]}\n`;
  if (formData.colorPreferences) result += `Цветовые предпочтения: ${formData.colorPreferences}\n`;
  if (formData.wishes) result += `Пожелания: ${formData.wishes}\n`;
  if (formData.budget) result += `Бюджет: ${formData.budget}\n`;
  
  return result || 'Информация о стиле и бюджете не указана';
})()}

📎 ЗАГРУЖЕННЫЕ ФАЙЛЫ:
---------------------
${(() => {
  const fileTypes = {
    'measurement': 'Обмерный план',
    'technical': 'Техническое задание',
    'photos': 'Фотографии/видео',
    'examples': 'Примеры интерьеров',
    'docs': 'Проектная документация'
  };
  
  let result = '';
  let hasFiles = false;
  
  Object.keys(formData.files).forEach(type => {
    if (formData.files[type]?.length > 0) {
      hasFiles = true;
      result += `${fileTypes[type]}:\n`;
      formData.files[type].forEach(file => {
        result += `  • ${file.name}\n`;
      });
    }
  });
  
  if (formData.pinterestLinks) {
    hasFiles = true;
    result += `Ссылки на примеры:\n  • ${formData.pinterestLinks}\n`;
  }
  
  return hasFiles ? result : 'Файлы не загружены';
})()}

=====================================
Создано с помощью Конструктора ТЗ
Студия «Дизайн360»
=====================================
  `;
};