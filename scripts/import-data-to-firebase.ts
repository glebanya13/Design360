import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import siteData from '../public/site-data.json';
import productsData from '../src/data/products.json';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCFdipmaKMbvOTMX4u7-_ZSC4ceLJzLmeA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "design360-efab7.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "design360-efab7",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "design360-efab7.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "912484941208",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:912484941208:web:ae34a702a3ed0ed7a4ffed"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importSettings() {
  console.log('📝 Импорт настроек сайта...');
  
  const settings = {
    site: {
      title: siteData.site.title,
      description: siteData.site.description,
      phone: '+7 (911) 493-46-41', // Реальные контакты из Footer
      email: '89114934641@bk.ru',
      address: 'Калининград, Медовый мост'
    },
    settings: {
      theme: siteData.settings.theme,
      seo: siteData.settings.seo,
      contact: {
        workingHours: 'Пн-Пт: 9:00-18:00', // Реальные часы работы
        socialMedia: siteData.settings.contact.socialMedia
      }
    },
    updatedAt: Timestamp.now()
  };

  await setDoc(doc(db, 'settings', 'site'), settings);
  console.log('✅ Настройки импортированы');
}

async function importProducts() {
  console.log('🛍️ Импорт продуктов...');
  
  const allProducts = [
    ...(siteData.products?.catalog || []),
    ...(siteData.products?.furniture || [])
  ];

  const uniqueProducts = Array.from(
    new Map(allProducts.map(p => [p.id, p])).values()
  );

  for (const product of uniqueProducts) {
    await setDoc(doc(db, 'products', product.id.toString()), {
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  }

  console.log(`✅ Импортировано ${uniqueProducts.length} продуктов`);
}

async function importCatalogCategories() {
  console.log('📁 Импорт категорий каталога...');
  
  const categories = (siteData.pages?.catalog?.categories || []).map((cat: any, index: number) => ({
    name: cat.name,
    order: index + 1,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }));

  const hasBusiness = categories.some(c => c.name === 'Для бизнеса');
  if (!hasBusiness) {
    categories.push({
      name: 'Для бизнеса',
      order: categories.length + 1,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  }

  for (const category of categories) {
    const docRef = doc(collection(db, 'catalogCategories'));
    await setDoc(docRef, category);
  }

  console.log(`✅ Импортировано ${categories.length} категорий каталога`);
}

async function importServiceCategories() {
  console.log('🏷️ Импорт категорий услуг...');
  
  const categories = [
    { name: 'Дизайн интерьера', route: '/design-interior', order: 1 },
    { name: 'Проектирование', order: 2 },
    { name: 'Консультации', order: 3 },
    { name: '3D визуализация', order: 4 },
    { name: 'Авторский надзор', order: 5 },
    { name: 'Для бизнеса', order: 6 },
    { name: 'Для профессионалов', order: 7 },
    { name: 'Электроснабжение', route: '/elektrosnabzhenie', order: 8 },
  ];

  for (const category of categories) {
    const docRef = doc(collection(db, 'serviceCategories'));
    await setDoc(docRef, {
      ...category,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  }

  console.log(`✅ Импортировано ${categories.length} категорий услуг`);
}

async function importPackages() {
  console.log('📦 Импорт пакетов визуализаций...');
  
  const packages = [
    {
      name: 'Базовый',
      targetAudience: 'Для начинающих риелторов',
      visualizations: 3,
      price: '3 900 Р',
      description: 'Идеально для небольших объектов',
      highlighted: false,
      order: 1
    },
    {
      name: 'Стандарт',
      targetAudience: 'Для активных риелторов',
      visualizations: 5,
      price: '5 900 Р',
      description: 'Оптимальный выбор для большинства проектов',
      highlighted: false,
      order: 2
    },
    {
      name: 'Профи',
      targetAudience: 'Для профессионалов',
      visualizations: '10+',
      price: 'от 1 190 Р / шт.',
      description: 'Оптовые цены для больших объемов',
      highlighted: true,
      order: 3
    }
  ];

  for (const pkg of packages) {
    const docRef = doc(collection(db, 'packages'));
    await setDoc(docRef, {
      ...pkg,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  }

  console.log(`✅ Импортировано ${packages.length} пакетов`);
}

async function main() {
  try {
    console.log('🚀 Начало импорта данных в Firebase...\n');

    await importSettings();
    await importProducts();
    await importCatalogCategories();
    await importServiceCategories();
    await importPackages();

    console.log('\n✨ Импорт завершен успешно!');
    console.log('\n📋 Импортировано:');
    console.log('  - Настройки сайта');
    console.log('  - Продукты из каталога');
    console.log('  - Категории каталога');
    console.log('  - Категории услуг');
    console.log('  - Пакеты визуализаций');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка импорта:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { importSettings, importProducts, importCatalogCategories, importServiceCategories, importPackages };

