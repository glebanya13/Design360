import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendFormEmail } from '../services/emailService';
import '../styles/TZ.css';
import Step1Files from '../components/steps/Step1Files';
import Step2Object from '../components/steps/Step2Object';
import Step3Rooms from '../components/steps/Step3Rooms';
import Step4Parts from '../components/steps/Step4Parts';
import Step5Style from '../components/steps/Step5Style';
import Step6Summary from '../components/steps/Step6Summary';

export default function TZ() {
  const totalSteps = 6;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: 'apartment',
    files: [],
    objectType: '',
    area: '',
    rooms: '',
    roomsList: [],
    specialRooms: '',
    projectParts: [],
    specialRequirements: '',
    preferredStyle: '',
    colorPreferences: '',
    budget: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    objectAddress: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropRef = useRef(null);

  useEffect(() => {
    const dropZone = dropRef.current;
    if (!dropZone) return;

    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const addHover = () => dropZone.classList.add('dragover');
    const removeHover = () => dropZone.classList.remove('dragover');
    const handleDrop = (e) => {
      const dt = e.dataTransfer;
      const files = Array.from(dt.files);
      handleFiles(files);
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropZone.addEventListener(eventName, preventDefaults);
    });
    ['dragenter', 'dragover'].forEach((eventName) => {
      dropZone.addEventListener(eventName, addHover);
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      dropZone.addEventListener(eventName, removeHover);
    });
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        dropZone.removeEventListener(eventName, preventDefaults);
      });
      ['dragenter', 'dragover'].forEach((eventName) => {
        dropZone.removeEventListener(eventName, addHover);
      });
      ['dragleave', 'drop'].forEach((eventName) => {
        dropZone.removeEventListener(eventName, removeHover);
      });
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, []);

  const updateField = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleFiles = (files) => {
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (fileName) => {
    setFormData((prev) => ({ ...prev, files: prev.files.filter((f) => f.name !== fileName) }));
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const skipStep = () => nextStep();

  const validateStep = (step) => {
    switch (step) {
      case 2: {
        if (!formData.objectType) {
          alert('Пожалуйста, выберите тип объекта');
          return false;
        }
        if (!formData.area) {
          alert('Пожалуйста, укажите площадь объекта');
          return false;
        }
        return true;
      }
      case 5: {
        if (!formData.preferredStyle) {
          alert('Пожалуйста, выберите предпочтительный стиль');
          return false;
        }
        if (!formData.budget) {
          alert('Пожалуйста, выберите бюджет');
          return false;
        }
        return true;
      }
      case 6: {
        if (!formData.clientName) {
          alert('Пожалуйста, укажите ваше ФИО');
          return false;
        }
        if (!formData.clientPhone) {
          alert('Пожалуйста, укажите ваш телефон');
          return false;
        }
        if (!formData.clientEmail) {
          alert('Пожалуйста, укажите ваш email');
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  };

  const adaptProjectPartsForService = (parts) => {
    if (!Array.isArray(parts)) return [];
    const mapping = {
      'planning': 'apr',
      'concept': 'design',
      'visualization': 'design',
      'working-docs': 'working',
      'lighting': 'engineering',
      'furniture': 'design'
      // 'author-supervision' not mapped in service template; skip
    };
    const mapped = new Set();
    parts.forEach((p) => {
      const m = mapping[p];
      if (m) mapped.add(m);
    });
    return Array.from(mapped);
  };

  const buildServicePayload = () => {
    const totalArea = Number(formData.area || 0);
    const adapted = {
      ...formData,
      projectParts: adaptProjectPartsForService(formData.projectParts),
      // Wrap single list of uploaded files into categorized bucket expected by service
      files: { docs: formData.files }
    };
    return { adapted, totalArea };
  };

  const submitForm = async () => {
    if (!validateStep(6)) return;
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const { adapted, totalArea } = buildServicePayload();
      const result = await sendFormEmail(adapted, totalArea);
      if (result?.success) {
        alert('Техническое задание отправлено в Telegram. Мы свяжемся с вами в течение 24 часов.');
      } else {
        alert('Не удалось отправить ТЗ. Попробуйте позже.');
      }
    } catch (err) {
      alert('Произошла ошибка при отправке ТЗ. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeMap = {
    apartment: 'Квартира',
    studio: 'Студия',
    house: 'Частный дом',
    commercial: 'Коммерческое помещение'
  };

  const styleMap = {
    'warm-minimalism': 'Теплый минимализм',
    'urban-loft': 'Урбан-лофт',
    scandinavian: 'Скандинавский',
    japanese: 'Японский минимализм',
    'industrial-light': 'Индастриал-лайт',
    'modern-kitsch': 'Современный китч'
  };

  const budgetMap = {
    '100-300': '100-300 тыс. руб.',
    '300-500': '300-500 тыс. руб.',
    '500-800': '500-800 тыс. руб.',
    '800-1200': '800-1200 тыс. руб.',
    '1200+': '1.2 млн+ руб.'
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo"><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Дизайн360</Link></div>
          <div className="progress-container">
            <div className="step-indicator">Шаг <span>{currentStep}</span> из {totalSteps}</div>
            <div className="progress-steps">
              {Array.from({ length: totalSteps }).map((_, i) => {
                const step = i + 1;
                const classes = ['progress-step'];
                if (step < currentStep) classes.push('completed');
                if (step === currentStep) classes.push('active');
                return <div key={step} className={classes.join(' ')} data-step={step} />;
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="quick-actions">
          {[
            { key: 'apartment', icon: '🏢', title: 'Квартира/Студия', desc: 'Для аренды или проживания' },
            { key: 'house', icon: '🏠', title: 'Частный дом', desc: 'Коттедж, таунхаус, вилла' },
            { key: 'commercial', icon: '🏪', title: 'Коммерция', desc: 'Офис, магазин, ресторан' }
          ].map((opt) => (
            <div
              key={opt.key}
              className={`quick-action-card ${formData.projectType === opt.key ? 'active' : ''}`}
              onClick={() => updateField('projectType', opt.key)}
            >
              <div className="action-icon">{opt.icon}</div>
              <div className="action-title">{opt.title}</div>
              <div className="action-description">{opt.desc}</div>
            </div>
          ))}
        </div>

        <Step1Files currentStep={currentStep} formData={formData} dropRef={dropRef} handleFiles={handleFiles} removeFile={removeFile} skipStep={skipStep} nextStep={nextStep} />

        <Step2Object currentStep={currentStep} formData={formData} updateField={updateField} prevStep={prevStep} nextStep={nextStep} />

        <Step3Rooms currentStep={currentStep} formData={formData} setFormData={setFormData} updateField={updateField} prevStep={prevStep} nextStep={nextStep} />

        <Step4Parts currentStep={currentStep} formData={formData} setFormData={setFormData} updateField={updateField} prevStep={prevStep} nextStep={nextStep} />

        <Step5Style currentStep={currentStep} formData={formData} updateField={updateField} budgetMap={budgetMap} prevStep={prevStep} nextStep={nextStep} />

        <Step6Summary currentStep={currentStep} formData={{...formData, updateField}} typeMap={typeMap} styleMap={styleMap} budgetMap={budgetMap} prevStep={prevStep} submitForm={submitForm} isSubmitting={isSubmitting} />

        {/* Предпросмотр следующих шагов */}
        <div className="steps-preview">
          {[
            { icon: '📁', title: 'Файлы', desc: 'Загрузка материалов' },
            { icon: '🏠', title: 'Тип объекта', desc: 'Параметры объекта' },
            { icon: '🚪', title: 'Помещения', desc: 'Выбор комнат' },
            { icon: '📐', title: 'Состав проекта', desc: 'Этапы работы' },
            { icon: '🎨', title: 'Стиль и бюджет', desc: 'Визуальные предпочтения' },
            { icon: '📊', title: 'Сводка', desc: 'Проверка и контакты' }
          ].map((step, index) => {
            const stepNumber = index + 1;
            const classes = ['step-preview-card'];
            if (stepNumber === currentStep) classes.push('current');
            else if (stepNumber > currentStep) classes.push('coming');
            return (
              <div key={step.title} className={classes.join(' ')}>
                <div className="step-preview-icon">{step.icon}</div>
                <div className="action-title">{step.title}</div>
                <div className="action-description">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}


