import http from 'http';

const PORT = 3000;

const htmlContent = `<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Al-Noor Grocery Store - النور گروسری اسٹور</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#2E7D32',
            primaryDark: '#1B5E20',
            primaryLight: '#E8F5E9',
            secondary: '#D4A017',
            secondaryLight: '#FFF9C4',
            bgLight: '#F5F5F5',
            surface: '#FFFFFF',
            textDark: '#212121',
            textLight: '#757575',
            appError: '#D32F2F',
            appSuccess: '#388E3C',
            appWarning: '#FFA000'
          },
          fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            urdu: ['Noto Nastaliq Urdu', 'serif']
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #E0E0E0;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .lang-ur { font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; }
    .lang-en { font-family: 'Poppins', sans-serif; direction: ltr; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .mobile-frame {
      max-width: 440px;
      height: 100vh;
      max-height: 920px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    @media (max-width: 640px) {
      .mobile-frame { max-width: 100%; height: 100vh; max-height: 100%; border-radius: 0 !important; }
    }
    .dashed-line {
      border-top: 2px dashed #BDBDBD;
    }
  </style>
</head>
<body class="flex items-center justify-center min-h-screen bg-slate-800 p-0 sm:p-4">

  <div id="app-container" class="mobile-frame w-full bg-[#F5F5F5] flex flex-col sm:rounded-3xl overflow-hidden relative border border-slate-700/50">
    <!-- View will be injected here -->
  </div>

  <script>
    // ═══════════════════════════════════════════════
    // MOCK DATA
    // ═══════════════════════════════════════════════
    const mockUser = {
      name: 'Ahmed Ali',
      phone: '03001234567',
      address: 'House 12, Street 4, Gulshan-e-Iqbal, Karachi',
    };

    const mockCategories = [
      { id: 'rice_grains',   nameEn: 'Rice & Grains',        nameUr: 'چاول اور اناج',   icon: '🍚' },
      { id: 'flour_atta',    nameEn: 'Flour & Atta',         nameUr: 'آٹا',             icon: '🌾' },
      { id: 'oil_ghee',      nameEn: 'Cooking Oil & Ghee',   nameUr: 'تیل و گھی',       icon: '🛢️' },
      { id: 'sugar_salt',    nameEn: 'Sugar & Salt',         nameUr: 'چینی و نمک',      icon: '🧂' },
      { id: 'spices',        nameEn: 'Spices & Masala',      nameUr: 'مصالحے',          icon: '🌶️' },
      { id: 'tea_coffee',    nameEn: 'Tea & Coffee',         nameUr: 'چائے و کافی',     icon: '☕' },
      { id: 'pulses',        nameEn: 'Pulses & Lentils',     nameUr: 'دالیں',           icon: '🫘' },
      { id: 'dry_fruits',    nameEn: 'Dry Fruits',           nameUr: 'خشک میوہ',        icon: '🥜' },
      { id: 'beverages',     nameEn: 'Beverages',            nameUr: 'مشروبات',         icon: '🥤' },
      { id: 'cleaning',      nameEn: 'Cleaning & Household', nameUr: 'صفائی کا سامان',  icon: '🧴' },
      { id: 'personal_care', nameEn: 'Personal Care',        nameUr: 'ذاتی نگہداشت',    icon: '🧼' },
      { id: 'snacks',        nameEn: 'Snacks & Biscuits',    nameUr: 'بسکٹ و اسنیکس',   icon: '🍪' },
    ];

    const mockProducts = [
      {
        id: 'p1', categoryId: 'rice_grains',
        nameEn: 'Basmati Rice Super Kernel', nameUr: 'باسمتی چاول سپر کرنل',
        icon: '🍚', allowCustom: true, customPricePerKg: 700,
        packings: [
          { id: 'p1_1', labelEn: 'Half Kg',   labelUr: 'آدھا کلو',      price: 350 },
          { id: 'p1_2', labelEn: '1 Kg',      labelUr: 'ایک کلو',       price: 700 },
          { id: 'p1_3', labelEn: '5 Kg Bag',  labelUr: 'پانچ کلو تھیلا', price: 3400 },
          { id: 'p1_4', labelEn: '10 Kg Bag', labelUr: 'دس کلو تھیلا',   price: 6700 },
        ],
      },
      {
        id: 'p2', categoryId: 'flour_atta',
        nameEn: 'Wheat Flour (Chakki Atta)', nameUr: 'چکی کا آٹا',
        icon: '🌾', allowCustom: true, customPricePerKg: 120,
        packings: [
          { id: 'p2_1', labelEn: '5 Kg Bag',  labelUr: 'پانچ کلو', price: 580 },
          { id: 'p2_2', labelEn: '10 Kg Bag', labelUr: 'دس کلو',   price: 1150 },
        ],
      },
      {
        id: 'p3', categoryId: 'oil_ghee',
        nameEn: 'Sunflower Cooking Oil', nameUr: 'سورج مکھی کا تیل',
        icon: '🛢️', allowCustom: false, customPricePerKg: 0,
        packings: [
          { id: 'p3_1', labelEn: '1 Liter', labelUr: 'ایک لیٹر',  price: 520 },
          { id: 'p3_2', labelEn: '5 Liter', labelUr: 'پانچ لیٹر', price: 2500 },
        ],
      },
      {
        id: 'p4', categoryId: 'sugar_salt',
        nameEn: 'White Sugar', nameUr: 'سفید چینی',
        icon: '🧂', allowCustom: true, customPricePerKg: 150,
        packings: [
          { id: 'p4_1', labelEn: '1 Kg', labelUr: 'ایک کلو',  price: 150 },
          { id: 'p4_2', labelEn: '5 Kg', labelUr: 'پانچ کلو', price: 720 },
        ],
      },
      {
        id: 'p5', categoryId: 'spices',
        nameEn: 'Red Chili Powder', nameUr: 'لال مرچ پاؤڈر',
        icon: '🌶️', allowCustom: true, customPricePerKg: 1200,
        packings: [
          { id: 'p5_1', labelEn: '100 g', labelUr: 'سو گرام',      price: 120 },
          { id: 'p5_2', labelEn: '250 g', labelUr: 'ڈھائی سو گرام', price: 280 },
          { id: 'p5_3', labelEn: '500 g', labelUr: 'پانچ سو گرام',  price: 540 },
        ],
      },
      {
        id: 'p6', categoryId: 'tea_coffee',
        nameEn: 'Black Tea (Patti)', nameUr: 'کالی چائے کی پتی',
        icon: '☕', allowCustom: false, customPricePerKg: 0,
        packings: [
          { id: 'p6_1', labelEn: '250 g', labelUr: 'ڈھائی سو گرام', price: 450 },
          { id: 'p6_2', labelEn: '500 g', labelUr: 'پانچ سو گرام',  price: 880 },
        ],
      },
      {
        id: 'p7', categoryId: 'pulses',
        nameEn: 'Red Lentils (Masoor Dal)', nameUr: 'مسور دال',
        icon: '🫘', allowCustom: true, customPricePerKg: 280,
        packings: [
          { id: 'p7_1', labelEn: '1 Kg', labelUr: 'ایک کلو',  price: 280 },
          { id: 'p7_2', labelEn: '5 Kg', labelUr: 'پانچ کلو', price: 1350 },
        ],
      },
      {
        id: 'p8', categoryId: 'dry_fruits',
        nameEn: 'Almonds (Badam)', nameUr: 'بادام',
        icon: '🥜', allowCustom: true, customPricePerKg: 2500,
        packings: [
          { id: 'p8_1', labelEn: '250 g', labelUr: 'ڈھائی سو گرام', price: 620 },
          { id: 'p8_2', labelEn: '500 g', labelUr: 'پانچ سو گرام',  price: 1200 },
        ],
      },
      {
        id: 'p9', categoryId: 'beverages',
        nameEn: 'Coca Cola', nameUr: 'کوکا کولا',
        icon: '🥤', allowCustom: false, customPricePerKg: 0,
        packings: [
          { id: 'p9_1', labelEn: '500 ml',    labelUr: '500 ملی',   price: 100 },
          { id: 'p9_2', labelEn: '1.5 Liter', labelUr: 'ڈیڑھ لیٹر', price: 250 },
        ],
      },
      {
        id: 'p10', categoryId: 'cleaning',
        nameEn: 'Washing Powder (Surf)', nameUr: 'واشنگ پاؤڈر',
        icon: '🧴', allowCustom: false, customPricePerKg: 0,
        packings: [
          { id: 'p10_1', labelEn: '1 Kg', labelUr: 'ایک کلو', price: 320 },
          { id: 'p10_2', labelEn: '2 Kg', labelUr: 'دو کلو',   price: 620 },
        ],
      },
      {
        id: 'p11', categoryId: 'personal_care',
        nameEn: 'Toothpaste', nameUr: 'ٹوتھ پیسٹ',
        icon: '🧼', allowCustom: false, customPricePerKg: 0,
        packings: [
          { id: 'p11_1', labelEn: '100 g', labelUr: 'سو گرام', price: 180 },
        ],
      },
      {
        id: 'p12', categoryId: 'snacks',
        nameEn: 'Biscuits Family Pack', nameUr: 'بسکٹ فیملی پیک',
        icon: '🍪', allowCustom: false, customPricePerKg: 0,
        packings: [
          { id: 'p12_1', labelEn: 'Small', labelUr: 'چھوٹا', price: 50 },
          { id: 'p12_2', labelEn: 'Large', labelUr: 'بڑا',   price: 150 },
        ],
      },
    ];

    const mockOrders = [
      {
        orderNumber: 'ORD-2026-0001', status: 'pending',
        date: '13 Oct, 3:45 PM', total: 2375, itemsCount: 3,
        paymentMethod: 'installment',
        items: [
          { name: 'Basmati Rice', qty: 2, price: 700 },
          { name: 'White Sugar', qty: 1, price: 150 },
          { name: 'Cooking Oil', qty: 1, price: 520 },
        ],
      },
      {
        orderNumber: 'ORD-2026-0002', status: 'delivered',
        date: '10 Oct, 5:20 PM', total: 1240, itemsCount: 2,
        paymentMethod: 'cod',
        items: [
          { name: 'Wheat Flour', qty: 1, price: 1150 },
          { name: 'Biscuits', qty: 1, price: 90 },
        ],
      },
      {
        orderNumber: 'ORD-2026-0003', status: 'preparing',
        date: '14 Oct, 10:00 AM', total: 3400, itemsCount: 1,
        paymentMethod: 'cod',
        items: [
          { name: 'Basmati Rice 5Kg', qty: 1, price: 3400 },
        ],
      },
    ];

    const deliveryFee = 100.0;

    // ═══════════════════════════════════════════════
    // LOCALIZATION
    // ═══════════════════════════════════════════════
    const strings = {
      en: {
        appName: 'Al-Noor Grocery',
        home: 'Home', cart: 'Cart', orders: 'Orders', profile: 'Profile',
        search: 'Search Kiryana, Atta, Ghee, Spices...',
        categories: 'Kiryana Categories',
        featured: 'Featured Products',
        addToCart: 'Add to Cart', checkout: 'Checkout',
        subtotal: 'Subtotal', delivery: 'Delivery Fee', total: 'Total',
        login: 'Login', signup: 'Sign Up', welcome: 'Welcome Back!',
        phone: 'Phone Number', password: 'Password', name: 'Full Name',
        address: 'Delivery Address', logout: 'Logout',
        myOrders: 'My Orders', installment: 'Installment',
        cod: 'Cash on Delivery', selectPacking: 'Select Packing',
        custom: 'Custom', quantity: 'Quantity',
        proceedCheckout: 'Proceed to Checkout', placeOrder: 'Place Order',
        orderPlaced: 'Order Placed Successfully!',
        downloadReceipt: 'Download Receipt', trackOrder: 'Track Order',
        continueShopping: 'Continue Shopping',
        downPayment: 'Down Payment', remaining: 'Remaining',
        daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly',
        confirmOrder: 'Confirm Order',
        orderDetails: 'Order Details', status: 'Order Status',
        items: 'Items', paymentSummary: 'Payment Summary',
        bannerBadge: '0% INSTALLMENTS',
        bannerTitle: 'Get Monthly Kiryana Ration on Easy 0% Markup Installments',
        bannerSub: 'Flat Rs. 100 delivery across town. Pure & weighed accurately.',
        planHighlight: 'Your Plan',
        customWeight: 'Weight (kg)',
      },
      ur: {
        appName: 'النور گروسری',
        home: 'ہوم', cart: 'کارٹ', orders: 'آرڈرز', profile: 'پروفائل',
        search: 'کریانہ، آٹا، گھی، مصالحے تلاش کریں...',
        categories: 'کریانہ کیٹیگریز',
        featured: 'نمایاں پروڈکٹس',
        addToCart: 'کارٹ میں ڈالیں', checkout: 'چیک آؤٹ',
        subtotal: 'سب ٹوٹل', delivery: 'ڈیلیوری فیس', total: 'کل',
        login: 'لاگ ان', signup: 'سائن اپ', welcome: 'خوش آمدید',
        phone: 'فون نمبر', password: 'پاس ورڈ', name: 'پورا نام',
        address: 'ڈیلیوری ایڈریس', logout: 'لاگ آؤٹ',
        myOrders: 'میرے آرڈرز', installment: 'آسان اقساط',
        cod: 'کیش آن ڈیلیوری', selectPacking: 'پیکنگ منتخب کریں',
        custom: 'اپنی مرضی', quantity: 'تعداد',
        proceedCheckout: 'چیک آؤٹ کریں', placeOrder: 'آرڈر دیں',
        orderPlaced: 'آرڈر کامیابی سے ہو گیا!',
        downloadReceipt: 'رسید ڈاؤن لوڈ', trackOrder: 'آرڈر ٹریک کریں',
        continueShopping: 'مزید خریداری',
        downPayment: 'پیشگی رقم', remaining: 'باقی رقم',
        daily: 'روزانہ', weekly: 'ہفتہ وار', monthly: 'ماہانہ',
        confirmOrder: 'آرڈر کنفرم کریں',
        orderDetails: 'آرڈر کی تفصیل', status: 'آرڈر کی حالت',
        items: 'آئٹمز', paymentSummary: 'ادائیگی کا خلاصہ',
        bannerBadge: '0% آسان اقساط',
        bannerTitle: 'ماہانہ کریانہ راشن 0٪ مارک اپ پر آسان اقساط میں حاصل کریں',
        bannerSub: 'پورے شہر میں فلیٹ 100 روپے ڈیلیوری۔ خالص اور درست تول۔',
        planHighlight: 'آپ کا اقساط پلان',
        customWeight: 'وزن (کلو گرام)',
      }
    };

    // ═══════════════════════════════════════════════
    // APPLICATION STATE
    // ═══════════════════════════════════════════════
    const state = {
      currentLang: 'ur',
      currentScreen: 'splash',
      cart: [],
      selectedCategory: null,
      selectedProduct: null,
      selectedOrder: null,
      searchQuery: '',
      filterPrice: 'all',
      // Installment State
      downPayment: 500,
      installmentType: 'daily',
      duration: 15,
      // Order Confirmation Data
      lastOrder: {
        orderNumber: 'ORD-2026-0004',
        total: 2375,
        paymentMethod: 'installment',
        plan: 'Rs. 125 × 15 Days'
      }
    };

    function t(key) {
      return strings[state.currentLang][key] || key;
    }

    function isUrdu() {
      return state.currentLang === 'ur';
    }

    function toggleLang() {
      state.currentLang = state.currentLang === 'ur' ? 'en' : 'ur';
      document.documentElement.lang = state.currentLang;
      document.documentElement.dir = isUrdu() ? 'rtl' : 'ltr';
      render();
    }

    function setLang(code) {
      state.currentLang = code;
      document.documentElement.lang = state.currentLang;
      document.documentElement.dir = isUrdu() ? 'rtl' : 'ltr';
      render();
    }

    function navigate(screen, data = {}) {
      state.currentScreen = screen;
      if (data.category) state.selectedCategory = data.category;
      if (data.product) state.selectedProduct = data.product;
      if (data.order) state.selectedOrder = data.order;
      render();
    }

    function addToCart(productId, name, packing, price, icon, qty = 1) {
      const idx = state.cart.findIndex(i => i.productId === productId && i.packing === packing);
      if (idx >= 0) {
        state.cart[idx].qty += qty;
      } else {
        state.cart.push({ productId, name, packing, price, icon, qty });
      }
      render();
    }

    function updateCartQty(index, newQty) {
      if (newQty <= 0) {
        state.cart.splice(index, 1);
      } else {
        state.cart[index].qty = newQty;
      }
      render();
    }

    function getCartTotalCount() {
      return state.cart.reduce((s, i) => s + i.qty, 0);
    }

    function getCartSubtotal() {
      return state.cart.reduce((s, i) => s + (i.price * i.qty), 0);
    }

    // ═══════════════════════════════════════════════
    // TOP & BOTTOM NAV
    // ═══════════════════════════════════════════════
    function renderTopBar(title, showBack = false, backScreen = 'home') {
      const count = getCartTotalCount();
      return \`
        <header class="bg-primary text-white px-4 py-3 flex items-center justify-between shadow-md z-10 shrink-0">
          <div class="flex items-center gap-2">
            \${showBack ? \`
              <button onclick="navigate('\${backScreen}')" class="p-1 hover:bg-white/20 rounded-full transition">
                <svg class="w-6 h-6 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
            \` : ''}
            <h1 class="text-lg font-bold truncate">\${title}</h1>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="toggleLang()" class="px-2.5 py-1 text-xs font-bold rounded-full bg-white/20 border border-white/40 hover:bg-white/30 transition">
              \${isUrdu() ? 'EN' : 'اردو'}
            </button>
            <button onclick="navigate('cart')" class="relative p-1.5 hover:bg-white/20 rounded-full transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              \${count > 0 ? \`<span class="absolute -top-1 -right-1 bg-secondary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-primary">\${count}</span>\` : ''}
            </button>
          </div>
        </header>
      \`;
    }

    function renderBottomNav(activeTab) {
      const count = getCartTotalCount();
      const tabs = [
        { id: 'home', label: t('home'), icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>' },
        { id: 'cart', label: t('cart'), count: count, icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' },
        { id: 'orders', label: t('orders'), icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>' },
        { id: 'profile', label: t('profile'), icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' },
      ];

      return \`
        <nav class="bg-white border-t border-slate-200 py-2 px-3 flex justify-around items-center shrink-0 z-10 shadow-lg">
          \${tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return \`
              <button onclick="navigate('\${tab.id}')" class="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition \${isActive ? 'text-primary font-bold bg-primaryLight/40' : 'text-slate-500 hover:text-slate-800'}">
                <div class="relative">
                  \${tab.icon}
                  \${tab.count && tab.count > 0 ? \`<span class="absolute -top-1 -right-2 bg-secondary text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">\${tab.count}</span>\` : ''}
                </div>
                <span class="text-[11px]">\${tab.label}</span>
              </button>
            \`;
          }).join('')}
        </nav>
      \`;
    }

    // ═══════════════════════════════════════════════
    // 15 SCREEN RENDERERS
    // ═══════════════════════════════════════════════

    // SCREEN 1: SPLASH
    function renderSplash() {
      return \`
        <div class="flex-1 bg-primary text-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div class="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8">
            <span class="text-6xl text-primary">🛒</span>
          </div>
          <h1 class="text-2xl font-bold tracking-wide">Al-Noor Grocery Store</h1>
          <h2 class="text-lg font-semibold text-white/80 mt-2">النور گروسری اسٹور</h2>
          <div class="mt-12">
            <div class="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
          <button onclick="navigate('language')" class="mt-8 text-xs text-white/70 underline">
            Tap to skip (خودکار آگے بڑھے گا)
          </button>
        </div>
      \`;
    }

    // SCREEN 2: LANGUAGE
    function renderLanguage() {
      return \`
        <div class="flex-1 bg-white flex flex-col justify-between p-6">
          <div class="flex-1 flex flex-col items-center justify-center">
            <div class="w-28 h-28 bg-primaryLight rounded-full flex items-center justify-center mb-6">
              <span class="text-5xl">🌐</span>
            </div>
            <h1 class="text-2xl font-bold text-slate-800">زبان منتخب کریں</h1>
            <p class="text-base text-slate-500 mt-1">Select Language</p>
          </div>
          <div class="flex flex-col gap-4 pb-6">
            <button onclick="setLang('ur'); navigate('login');" class="w-full h-16 bg-primary hover:bg-primaryDark text-white text-xl font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-3">
              <span>🇵🇰</span> <span>اردو</span>
            </button>
            <button onclick="setLang('en'); navigate('login');" class="w-full h-16 bg-white hover:bg-slate-50 border-2 border-primary text-primary text-xl font-bold rounded-2xl shadow-sm transition flex items-center justify-center gap-3">
              <span>🇬🇧</span> <span>English</span>
            </button>
          </div>
        </div>
      \`;
    }

    // SCREEN 3: LOGIN
    function renderLogin() {
      return \`
        <div class="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
          <div class="text-center mb-6">
            <div class="w-24 h-24 bg-primaryLight rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-4xl">🛍️</span>
            </div>
            <h1 class="text-2xl font-bold text-slate-900">\${t('welcome')}</h1>
            <p class="text-slate-500 text-sm mt-1">\${isUrdu() ? 'Al-Noor Grocery Store' : 'النور گروسری اسٹور'}</p>
          </div>

          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">\${t('phone')}</label>
              <input type="text" value="03001234567" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:outline-none text-sm font-semibold">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">\${t('password')}</label>
              <input type="password" value="demo123" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:outline-none text-sm font-semibold">
            </div>
            <button onclick="navigate('home')" class="w-full py-3.5 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl mt-2 transition shadow-md">
              \${t('login')}
            </button>
          </div>

          <div class="text-center mt-6 text-sm text-slate-500">
            <span>\${isUrdu() ? 'نیا اکاؤنٹ؟ ' : 'New account? '}</span>
            <button onclick="navigate('signup')" class="text-primary font-bold hover:underline">\${t('signup')}</button>
          </div>
        </div>
      \`;
    }

    // SCREEN 4: SIGNUP
    function renderSignup() {
      return \`
        <div class="flex-1 flex flex-col">
          \${renderTopBar(t('signup'), true, 'login')}
          <div class="flex-1 overflow-y-auto p-5">
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">\${t('name')}</label>
                <input type="text" value="\${mockUser.name}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary text-sm font-semibold">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">\${t('phone')}</label>
                <input type="text" value="\${mockUser.phone}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary text-sm font-semibold">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">\${t('password')}</label>
                <input type="password" value="secret123" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary text-sm font-semibold">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">\${t('address')}</label>
                <textarea rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary text-sm font-semibold">\${mockUser.address}</textarea>
              </div>
              <button onclick="navigate('home')" class="w-full py-3.5 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl mt-2 transition shadow-md">
                \${t('signup')}
              </button>
            </div>
          </div>
        </div>
      \`;
    }

    // SCREEN 5: HOME
    function renderHome() {
      const filtered = mockProducts.filter(p => {
        if (!state.searchQuery) return true;
        const q = state.searchQuery.toLowerCase();
        return p.nameEn.toLowerCase().includes(q) || p.nameUr.includes(q);
      });

      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(t('appName'))}
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            
            <!-- Search bar -->
            <div class="relative">
              <input 
                type="text" 
                placeholder="\${t('search')}" 
                value="\${state.searchQuery}"
                oninput="state.searchQuery = this.value; render();"
                class="w-full bg-white rounded-2xl py-3 px-10 text-xs text-slate-800 shadow-sm border border-slate-200 focus:outline-none focus:border-primary"
              >
              <span class="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center text-primary text-sm">🔍</span>
              \${state.searchQuery ? \`
                <button onclick="state.searchQuery = ''; render();" class="absolute inset-y-0 ltr:right-3 rtl:left-3 flex items-center text-slate-400">✕</button>
              \` : ''}
            </div>

            \${!state.searchQuery ? \`
              <!-- Banner Card (0% installments) -->
              <div class="bg-gradient-to-br from-primary to-primaryDark text-white p-4 rounded-2xl shadow-lg relative overflow-hidden">
                <div class="flex justify-between items-center mb-2">
                  <span class="bg-secondary text-black text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    \${t('bannerBadge')}
                  </span>
                  <span class="text-xl">🌾 🫘 🍚</span>
                </div>
                <h3 class="font-bold text-sm leading-snug text-white mb-1.5">\${t('bannerTitle')}</h3>
                <p class="text-xs text-white/80 leading-relaxed">\${t('bannerSub')}</p>
              </div>

              <!-- Kiryana Categories -->
              <div>
                <div class="flex justify-between items-center mb-2.5">
                  <h2 class="font-bold text-slate-800 text-sm">\${t('categories')}</h2>
                  <span class="text-xs text-slate-500">\${isUrdu() ? '(12 شعبہ جات)' : '(12 sections)'}</span>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  \${mockCategories.map(cat => \`
                    <button onclick="navigate('products', { category: \${JSON.stringify(cat).replace(/"/g, '&quot;')} })" class="flex flex-col items-center p-1.5 rounded-xl hover:bg-slate-100 transition group">
                      <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-primaryLight group-hover:scale-105 transition">
                        \${cat.icon}
                      </div>
                      <span class="text-[10px] font-semibold text-slate-800 mt-1 text-center line-clamp-2 leading-tight">
                        \${isUrdu() ? cat.nameUr : cat.nameEn}
                      </span>
                    </button>
                  \`).join('')}
                </div>
              </div>
            \` : ''}

            <!-- Featured Products -->
            <div>
              <div class="flex justify-between items-center mb-2.5">
                <h2 class="font-bold text-slate-800 text-sm">
                  \${state.searchQuery ? \`\${isUrdu() ? 'تلاش کے نتائج' : 'Search Results'} (\${filtered.length})\` : t('featured')}
                </h2>
                <span class="text-xs text-slate-500">\${filtered.length} \${t('items')}</span>
              </div>

              <div class="grid grid-cols-2 gap-3 pb-4">
                \${filtered.map(p => {
                  const startPrice = p.packings[0]?.price || 0;
                  return \`
                    <div class="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
                      <div onclick="navigate('product_detail', { product: \${JSON.stringify(p).replace(/"/g, '&quot;')} })" class="cursor-pointer">
                        <div class="w-full h-24 bg-primaryLight/40 rounded-xl flex items-center justify-center text-4xl mb-2">
                          \${p.icon}
                        </div>
                        <h4 class="font-bold text-xs text-slate-900 line-clamp-1">\${isUrdu() ? p.nameUr : p.nameEn}</h4>
                        <p class="text-primary font-bold text-xs mt-0.5">Rs. \${startPrice}+</p>
                      </div>
                      <button onclick="addToCart('\${p.id}', '\${isUrdu() ? p.nameUr : p.nameEn}', '\${p.packings[0].labelEn}', \${startPrice}, '\${p.icon}', 1)" class="w-full mt-2 py-1.5 bg-primaryLight text-primaryDark font-bold text-[11px] rounded-lg hover:bg-primary hover:text-white transition">
                        \${t('addToCart')}
                      </button>
                    </div>
                  \`;
                }).join('')}
              </div>
            </div>

          </div>
          \${renderBottomNav('home')}
        </div>
      \`;
    }

    // SCREEN 6: PRODUCT LIST
    function renderProductList() {
      const cat = state.selectedCategory;
      const catName = cat ? (isUrdu() ? cat.nameUr : cat.nameEn) : t('categories');
      const categoryProducts = cat ? mockProducts.filter(p => p.categoryId === cat.id) : mockProducts;

      const filtered = categoryProducts.filter(p => {
        const price = p.packings[0]?.price || 0;
        if (state.filterPrice === 'under_500') return price < 500;
        if (state.filterPrice === '500_1000') return price >= 500 && price <= 1000;
        if (state.filterPrice === 'above_1000') return price > 1000;
        return true;
      });

      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(catName, true, 'home')}
          
          <!-- Filter chips -->
          <div class="bg-white px-3 py-2 border-b border-slate-200 flex gap-2 overflow-x-auto no-scrollbar">
            \${[
              { id: 'all', label: isUrdu() ? 'تمام' : 'All' },
              { id: 'under_500', label: isUrdu() ? '500 سے کم' : 'Under Rs. 500' },
              { id: '500_1000', label: isUrdu() ? '500 تا 1000' : 'Rs. 500-1000' },
              { id: 'above_1000', label: isUrdu() ? '1000 سے زائد' : 'Above Rs. 1000' },
            ].map(f => \`
              <button onclick="state.filterPrice = '\${f.id}'; render();" class="px-3 py-1 text-xs rounded-full whitespace-nowrap transition \${state.filterPrice === f.id ? 'bg-primary text-white font-bold' : 'bg-slate-100 text-slate-700'}">
                \${f.label}
              </button>
            \`).join('')}
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <div class="grid grid-cols-2 gap-3 pb-4">
              \${filtered.map(p => {
                const startPrice = p.packings[0]?.price || 0;
                return \`
                  <div class="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div onclick="navigate('product_detail', { product: \${JSON.stringify(p).replace(/"/g, '&quot;')} })" class="cursor-pointer">
                      <div class="w-full h-24 bg-primaryLight/40 rounded-xl flex items-center justify-center text-4xl mb-2">
                        \${p.icon}
                      </div>
                      <h4 class="font-bold text-xs text-slate-900 line-clamp-1">\${isUrdu() ? p.nameUr : p.nameEn}</h4>
                      <p class="text-primary font-bold text-xs mt-0.5">Rs. \${startPrice}+</p>
                    </div>
                    <button onclick="addToCart('\${p.id}', '\${isUrdu() ? p.nameUr : p.nameEn}', '\${p.packings[0].labelEn}', \${startPrice}, '\${p.icon}', 1)" class="w-full mt-2 py-1.5 bg-primaryLight text-primaryDark font-bold text-[11px] rounded-lg hover:bg-primary hover:text-white transition">
                      \${t('addToCart')}
                    </button>
                  </div>
                \`;
              }).join('')}
            </div>
          </div>
        </div>
      \`;
    }

    // SCREEN 7: PRODUCT DETAIL
    let detailSelectedPacking = 0;
    let detailIsCustom = false;
    let detailCustomWeight = 1.0;
    let detailQuantity = 1;

    function renderProductDetail() {
      const p = state.selectedProduct || mockProducts[0];
      const primaryName = isUrdu() ? p.nameUr : p.nameEn;
      const secondaryName = isUrdu() ? p.nameEn : p.nameUr;

      let unitPrice = 0;
      let packingLabel = '';

      if (detailIsCustom) {
        unitPrice = p.customPricePerKg * detailCustomWeight;
        packingLabel = \`\${detailCustomWeight} kg (\${t('custom')})\`;
      } else {
        const pack = p.packings[detailSelectedPacking] || p.packings[0];
        unitPrice = pack.price;
        packingLabel = isUrdu() ? (pack.labelUr || pack.labelEn) : pack.labelEn;
      }

      const total = unitPrice * detailQuantity;

      return \`
        <div class="flex-1 flex flex-col overflow-hidden bg-white">
          <div class="relative w-full h-56 bg-primaryLight/50 rounded-b-3xl flex items-center justify-center">
            <button onclick="navigate('home')" class="absolute top-4 ltr:left-4 rtl:right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg class="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <span class="text-8xl">\${p.icon}</span>
          </div>

          <div class="flex-1 overflow-y-auto p-5 space-y-4">
            <div>
              <h1 class="text-xl font-bold text-slate-900">\${primaryName}</h1>
              <p class="text-xs text-slate-500 mt-0.5">\${secondaryName}</p>
              <div class="flex justify-between items-center mt-3">
                <span class="text-2xl font-bold text-primary">Rs. \${Math.round(unitPrice)}</span>
                <span class="px-2.5 py-1 bg-primaryLight text-primaryDark text-xs font-bold rounded-full">\${packingLabel}</span>
              </div>
            </div>

            <hr class="border-slate-100">

            <div>
              <h3 class="font-bold text-sm text-slate-800 mb-2">\${t('selectPacking')}</h3>
              <div class="space-y-2">
                \${p.packings.map((pack, idx) => {
                  const isSelected = !detailIsCustom && detailSelectedPacking === idx;
                  const label = isUrdu() ? (pack.labelUr || pack.labelEn) : pack.labelEn;
                  return \`
                    <div onclick="detailIsCustom = false; detailSelectedPacking = \${idx}; render();" class="p-3 rounded-xl border \${isSelected ? 'border-primary bg-primaryLight/20 font-bold' : 'border-slate-200'} flex justify-between items-center cursor-pointer">
                      <div class="flex items-center gap-2">
                        <input type="radio" name="packing" \${isSelected ? 'checked' : ''} class="text-primary focus:ring-primary">
                        <span class="text-xs">\${label}</span>
                      </div>
                      <span class="text-xs font-bold text-primaryDark">Rs. \${pack.price}</span>
                    </div>
                  \`;
                }).join('')}

                \${p.allowCustom ? \`
                  <div onclick="detailIsCustom = true; render();" class="p-3 rounded-xl border \${detailIsCustom ? 'border-primary bg-primaryLight/20' : 'border-slate-200'} cursor-pointer">
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-2">
                        <input type="radio" name="packing" \${detailIsCustom ? 'checked' : ''} class="text-primary focus:ring-primary">
                        <span class="text-xs font-semibold">\${t('custom')} (Rs. \${p.customPricePerKg}/kg)</span>
                      </div>
                      <span>⚖️</span>
                    </div>
                    \${detailIsCustom ? \`
                      <div class="mt-2 flex items-center gap-2 pt-2 border-t border-slate-100">
                        <input type="number" step="0.5" min="0.5" value="\${detailCustomWeight}" oninput="detailCustomWeight = parseFloat(this.value) || 1; render();" class="w-24 px-2 py-1 text-xs border rounded-lg focus:outline-primary">
                        <span class="text-xs text-slate-500">kg</span>
                      </div>
                    \` : ''}
                  </div>
                \` : ''}
              </div>
            </div>

            <hr class="border-slate-100">

            <!-- Quantity selector -->
            <div class="flex justify-between items-center">
              <span class="font-bold text-sm text-slate-800">\${t('quantity')}</span>
              <div class="flex items-center gap-3">
                <button onclick="if(detailQuantity > 1) { detailQuantity--; render(); }" class="w-8 h-8 rounded-lg bg-primaryLight text-primary flex items-center justify-center font-bold">−</button>
                <span class="font-bold text-base">\${detailQuantity}</span>
                <button onclick="detailQuantity++; render();" class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">+</button>
              </div>
            </div>
          </div>

          <!-- Sticky Bottom Add to Cart -->
          <div class="p-4 bg-white border-t border-slate-100 flex items-center justify-between shadow-lg">
            <div>
              <p class="text-[10px] text-slate-500">\${t('total')}</p>
              <p class="text-xl font-bold text-primary">Rs. \${Math.round(total)}</p>
            </div>
            <button onclick="addToCart('\${p.id}', '\${primaryName}', '\${packingLabel}', \${unitPrice}, '\${p.icon}', \${detailQuantity}); navigate('cart');" class="px-6 py-3 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl flex items-center gap-2 text-sm shadow-md transition">
              <span>🛒</span> <span>\${t('addToCart')}</span>
            </button>
          </div>
        </div>
      \`;
    }

    // SCREEN 8: CART
    function renderCart() {
      const subtotal = getCartSubtotal();
      const delivery = state.cart.length > 0 ? deliveryFee : 0;
      const total = subtotal + delivery;

      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(\`\${t('cart')} (\${getCartTotalCount()})\`)}
          
          <div class="flex-1 overflow-y-auto p-4">
            \${state.cart.length === 0 ? \`
              <div class="h-full flex flex-col items-center justify-center text-center p-6">
                <div class="w-24 h-24 bg-primaryLight rounded-full flex items-center justify-center text-5xl mb-4">
                  🛒
                </div>
                <h3 class="text-lg font-bold text-slate-800">\${isUrdu() ? 'آپ کی کارٹ خالی ہے' : 'Your cart is empty'}</h3>
                <p class="text-xs text-slate-500 mt-1 mb-6">\${isUrdu() ? 'کیٹیگریز سے راشن منتخب کریں' : 'Browse categories to add items'}</p>
                <button onclick="navigate('home')" class="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-md">
                  \${t('continueShopping')}
                </button>
              </div>
            \` : \`
              <div class="space-y-3 pb-4">
                \${state.cart.map((item, idx) => \`
                  <div class="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-primaryLight rounded-xl flex items-center justify-center text-2xl">
                        \${item.icon}
                      </div>
                      <div>
                        <h4 class="font-bold text-xs text-slate-900">\${item.name}</h4>
                        <p class="text-[10px] text-slate-500">\${item.packing}</p>
                        <p class="text-xs font-bold text-primary mt-0.5">Rs. \${Math.round(item.price)}</p>
                      </div>
                    </div>
                    <div class="flex flex-col items-end gap-1.5">
                      <div class="flex items-center gap-2">
                        <button onclick="updateCartQty(\${idx}, \${item.qty - 1})" class="w-6 h-6 rounded-md bg-primaryLight text-primary flex items-center justify-center text-xs font-bold">−</button>
                        <span class="text-xs font-bold">\${item.qty}</span>
                        <button onclick="updateCartQty(\${idx}, \${item.qty + 1})" class="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center text-xs font-bold">+</button>
                      </div>
                      <span class="text-xs font-bold text-slate-800">Rs. \${Math.round(item.price * item.qty)}</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
            \`}
          </div>

          \${state.cart.length > 0 ? \`
            <div class="bg-white p-4 border-t border-slate-200 rounded-t-3xl shadow-xl shrink-0">
              <div class="space-y-1.5 text-xs">
                <div class="flex justify-between text-slate-500">
                  <span>\${t('subtotal')}</span>
                  <span class="font-semibold text-slate-800">Rs. \${Math.round(subtotal)}</span>
                </div>
                <div class="flex justify-between text-slate-500">
                  <span>\${t('delivery')}</span>
                  <span class="font-semibold text-slate-800">Rs. \${Math.round(delivery)}</span>
                </div>
                <hr class="border-slate-100 my-2">
                <div class="flex justify-between text-sm font-bold">
                  <span class="text-slate-800">\${t('total')}</span>
                  <span class="text-primary text-base">Rs. \${Math.round(total)}</span>
                </div>
              </div>
              <button onclick="navigate('checkout')" class="w-full mt-3 py-3 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl text-sm shadow-md transition">
                \${t('proceedCheckout')}
              </button>
            </div>
          \` : ''}

          \${renderBottomNav('cart')}
        </div>
      \`;
    }

    // SCREEN 9: CHECKOUT
    let checkoutPaymentMethod = 'cod';
    function renderCheckout() {
      const items = state.cart.length > 0 ? state.cart : [
        { name: 'Basmati Rice Super Kernel', packing: '1 Kg', qty: 2, price: 700 },
        { name: 'White Sugar', packing: '1 Kg', qty: 1, price: 150 }
      ];
      const subtotal = items.reduce((s, i) => s + (i.price * i.qty), 0);
      const delivery = deliveryFee;
      const total = subtotal + delivery;

      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(t('checkout'), true, 'cart')}
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            
            <!-- Card 1: Address -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-1.5 text-primary font-bold text-xs">
                  <span>📍</span> <span>\${t('address')}</span>
                </div>
                <button onclick="alert('Address edit modal');" class="text-primary text-xs font-semibold">✏️</button>
              </div>
              <p class="font-bold text-xs text-slate-800">\${mockUser.name}</p>
              <p class="text-[11px] text-slate-500">\${mockUser.phone}</p>
              <p class="text-xs text-slate-700 mt-1">\${mockUser.address}</p>
            </div>

            <!-- Card 2: Summary -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h3 class="font-bold text-xs text-slate-800 mb-2.5 flex items-center gap-1.5 text-primary">
                <span>📋</span> <span>\${t('paymentSummary')}</span>
              </h3>
              <div class="space-y-1.5 text-xs text-slate-600">
                \${items.map(i => \`
                  <div class="flex justify-between">
                    <span class="truncate max-w-[200px]">\${i.name} (\${i.packing}) × \${i.qty}</span>
                    <span class="font-semibold text-slate-800">Rs. \${Math.round(i.price * i.qty)}</span>
                  </div>
                \`).join('')}
                <hr class="border-slate-100 my-2">
                <div class="flex justify-between text-slate-500">
                  <span>\${t('subtotal')}</span>
                  <span>Rs. \${Math.round(subtotal)}</span>
                </div>
                <div class="flex justify-between text-slate-500">
                  <span>\${t('delivery')}</span>
                  <span>Rs. \${Math.round(delivery)}</span>
                </div>
                <div class="flex justify-between font-bold text-sm text-slate-900 pt-1">
                  <span>\${t('total')}</span>
                  <span class="text-primary">Rs. \${Math.round(total)}</span>
                </div>
              </div>
            </div>

            <!-- Card 3: Payment Method -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h3 class="font-bold text-xs text-slate-800 mb-3">\${isUrdu() ? 'طریقہ ادائیگی' : 'Payment Method'}</h3>
              
              <div class="space-y-2.5">
                <label class="p-3 rounded-xl border flex items-center justify-between cursor-pointer \${checkoutPaymentMethod === 'cod' ? 'border-primary bg-primaryLight/20 font-bold' : 'border-slate-200'}">
                  <div class="flex items-center gap-2.5">
                    <input type="radio" name="paymentMethod" \${checkoutPaymentMethod === 'cod' ? 'checked' : ''} onchange="checkoutPaymentMethod = 'cod'; render();" class="text-primary">
                    <div>
                      <p class="text-xs">\${t('cod')}</p>
                      <p class="text-[10px] text-slate-500 font-normal">\${isUrdu() ? 'سامان وصول کرتے وقت نقد ادائیگی' : 'Pay cash on delivery'}</p>
                    </div>
                  </div>
                  <span class="text-xl">💵</span>
                </label>

                <label class="p-3 rounded-xl border flex items-center justify-between cursor-pointer \${checkoutPaymentMethod === 'installment' ? 'border-primary bg-primaryLight/20 font-bold' : 'border-slate-200'}">
                  <div class="flex items-center gap-2.5">
                    <input type="radio" name="paymentMethod" \${checkoutPaymentMethod === 'installment' ? 'checked' : ''} onchange="checkoutPaymentMethod = 'installment'; render();" class="text-primary">
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs">\${t('installment')}</span>
                        <span class="bg-secondary text-black text-[9px] font-bold px-1.5 py-0.5 rounded">0% Markup</span>
                      </div>
                      <p class="text-[10px] text-slate-500 font-normal">\${isUrdu() ? 'آسان اقساط میں ادائیگی' : 'Pay in easy installments'}</p>
                    </div>
                  </div>
                  <span class="text-xl">📅</span>
                </label>
              </div>
            </div>

          </div>

          <!-- Bottom Sticky -->
          <div class="p-4 bg-white border-t border-slate-100 flex items-center justify-between shadow-lg">
            <div>
              <p class="text-[10px] text-slate-500">\${t('total')}</p>
              <p class="text-xl font-bold text-primary">Rs. \${Math.round(total)}</p>
            </div>
            <button onclick="if(checkoutPaymentMethod === 'installment') { state.lastOrder.total = \${total}; navigate('installment'); } else { state.lastOrder.total = \${total}; state.lastOrder.paymentMethod = 'cod'; navigate('confirmation'); }" class="px-6 py-3 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl text-sm shadow-md transition">
              \${checkoutPaymentMethod === 'installment' ? t('installment') : t('placeOrder')}
            </button>
          </div>
        </div>
      \`;
    }

    // SCREEN 10: INSTALLMENT
    function renderInstallment() {
      const totalAmount = state.lastOrder.total || 2375;
      const remaining = Math.max(0, totalAmount - state.downPayment);
      const perInstallment = state.duration > 0 ? (remaining / state.duration) : 0;
      const unitLabel = state.installmentType === 'weekly' ? t('weekly') : (state.installmentType === 'monthly' ? t('monthly') : t('daily'));
      const planString = \`Rs. \${Math.round(perInstallment)} × \${state.duration} \${unitLabel}\`;

      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(t('installment'), true, 'checkout')}
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            
            <!-- Card 1: Summary -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h3 class="font-bold text-xs text-slate-800 mb-3 flex items-center gap-1.5 text-primary">
                <span>🧮</span> <span>\${t('paymentSummary')}</span>
              </h3>
              <div class="flex justify-between text-xs mb-3">
                <span class="text-slate-500">\${t('total')}</span>
                <span class="font-bold text-slate-900 text-sm">Rs. \${Math.round(totalAmount)}</span>
              </div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">\${t('downPayment')}</label>
              <input type="number" value="\${state.downPayment}" oninput="state.downPayment = parseFloat(this.value) || 0; render();" class="w-full px-3 py-2 text-xs border rounded-xl focus:border-primary font-bold">
              <div class="mt-3 p-3 bg-primaryLight/50 rounded-xl flex justify-between items-center text-xs">
                <span class="font-bold text-primaryDark">\${t('remaining')}</span>
                <span class="font-bold text-primaryDark text-sm">Rs. \${Math.round(remaining)}</span>
              </div>
            </div>

            <!-- Card 2: Frequency -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h3 class="font-bold text-xs text-slate-800 mb-2">\${isUrdu() ? 'اقساط کی نوعیت' : 'Installment Frequency'}</h3>
              <div class="space-y-2">
                \${[
                  { id: 'daily', label: t('daily'), defaultDur: 15, icon: '☀️' },
                  { id: 'weekly', label: t('weekly'), defaultDur: 4, icon: '🗓️' },
                  { id: 'monthly', label: t('monthly'), defaultDur: 2, icon: '📆' }
                ].map(freq => \`
                  <label class="p-2.5 rounded-xl border flex items-center justify-between cursor-pointer \${state.installmentType === freq.id ? 'border-primary bg-primaryLight/20 font-bold' : 'border-slate-200'}">
                    <div class="flex items-center gap-2">
                      <input type="radio" name="freq" \${state.installmentType === freq.id ? 'checked' : ''} onchange="state.installmentType = '\${freq.id}'; state.duration = \${freq.defaultDur}; render();" class="text-primary">
                      <span class="text-xs">\${freq.label}</span>
                    </div>
                    <span>\${freq.icon}</span>
                  </label>
                \`).join('')}
              </div>

              <div class="mt-3">
                <label class="block text-xs font-semibold text-slate-700 mb-1">\${isUrdu() ? 'مدت' : 'Duration'} (\${unitLabel})</label>
                <input type="number" value="\${state.duration}" oninput="state.duration = parseInt(this.value) || 1; render();" class="w-full px-3 py-2 text-xs border rounded-xl focus:border-primary font-bold">
              </div>
            </div>

            <!-- Highlight Plan Card -->
            <div class="bg-primaryLight p-4 rounded-2xl border border-primary/30 text-center">
              <p class="text-xs font-bold text-primaryDark">✓ \${t('planHighlight')}</p>
              <p class="text-xl font-bold text-primaryDark mt-1">\${planString}</p>
              <p class="text-[11px] text-slate-600 mt-1">Down: Rs. \${state.downPayment} | Total: Rs. \${Math.round(totalAmount)}</p>
            </div>

          </div>

          <div class="p-4 bg-white border-t border-slate-100 shadow-lg">
            <button onclick="state.lastOrder.plan = '\${planString}'; state.lastOrder.paymentMethod = 'installment'; navigate('confirmation');" class="w-full py-3.5 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl text-sm shadow-md transition">
              \${t('confirmOrder')}
            </button>
          </div>
        </div>
      \`;
    }

    // SCREEN 11: ORDER CONFIRMATION
    function renderConfirmation() {
      const orderNum = state.lastOrder.orderNumber;
      return \`
        <div class="flex-1 bg-white p-6 flex flex-col justify-between items-center text-center">
          <div class="my-auto flex flex-col items-center">
            <div class="w-28 h-28 bg-primaryLight rounded-full flex items-center justify-center mb-6">
              <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-4xl shadow-md">
                ✓
              </div>
            </div>
            <h2 class="text-xl font-bold text-slate-900">\${t('orderPlaced')}</h2>
            <p class="text-xs text-slate-500 mt-1">\${isUrdu() ? 'Order Placed Successfully!' : 'آرڈر کامیابی سے ہو گیا'}</p>
            
            <div class="mt-4 px-4 py-1.5 bg-slate-100 rounded-full border border-slate-300 font-mono text-sm font-bold text-slate-800">
              \${orderNum}
            </div>
            
            <p class="text-xs text-slate-500 mt-3 max-w-xs">
              \${isUrdu() ? 'آپ کا کریانہ راشن درج کر لیا گیا ہے اور جلد پہنچا دیا جائے گا۔' : 'Your Kiryana ration order is confirmed and will be dispatched shortly.'}
            </p>
          </div>

          <div class="w-full space-y-2.5 pb-4">
            <button onclick="navigate('receipt')" class="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl text-xs hover:bg-primaryLight/30 transition flex items-center justify-center gap-2">
              <span>🧾</span> <span>\${t('downloadReceipt')}</span>
            </button>
            <button onclick="state.cart = []; navigate('orders');" class="w-full py-3 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2">
              <span>🚚</span> <span>\${t('trackOrder')}</span>
            </button>
            <button onclick="state.cart = []; navigate('home');" class="w-full py-2 text-primary font-bold text-xs hover:underline">
              \${t('continueShopping')}
            </button>
          </div>
        </div>
      \`;
    }

    // SCREEN 12: MY ORDERS
    function renderOrders() {
      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(t('myOrders'))}
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            \${mockOrders.map(order => {
              const isDelivered = order.status === 'delivered';
              const isPrep = order.status === 'preparing';
              const statusBg = isDelivered ? 'bg-green-100 text-green-800 border-green-300' : (isPrep ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-orange-100 text-orange-800 border-orange-300');
              const statusText = isDelivered ? (isUrdu() ? 'پہنچ گیا' : 'DELIVERED') : (isPrep ? (isUrdu() ? 'تیار ہو رہا ہے' : 'PREPARING') : (isUrdu() ? 'زیر التواء' : 'PENDING'));

              return \`
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div class="flex justify-between items-center">
                    <span class="font-mono text-xs font-bold text-slate-800">\${order.orderNumber}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border \${statusBg}">\${statusText}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">\${order.date}</p>
                  <hr class="border-slate-100 my-2.5">
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-slate-600">\${order.itemsCount} \${t('items')}</span>
                    <span class="font-bold text-primary text-sm">Rs. \${order.total}</span>
                  </div>
                  <div class="mt-2 text-right">
                    <button onclick="navigate('order_detail', { order: \${JSON.stringify(order).replace(/"/g, '&quot;')} })" class="text-primary font-bold text-xs hover:underline">
                      \${isUrdu() ? 'تفصیل دیکھیں ←' : 'View Details →'}
                    </button>
                  </div>
                </div>
              \`;
            }).join('')}
          </div>
          \${renderBottomNav('orders')}
        </div>
      \`;
    }

    // SCREEN 13: ORDER DETAIL
    function renderOrderDetail() {
      const order = state.selectedOrder || mockOrders[0];
      const subtotal = Math.max(0, order.total - deliveryFee);

      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(t('orderDetails'), true, 'orders')}
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            
            <!-- Info -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-xs space-y-1.5">
              <h3 class="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1.5 text-primary">
                <span>ℹ️</span> <span>\${isUrdu() ? 'آرڈر معلومات' : 'Order Info'}</span>
              </h3>
              <div class="flex justify-between"><span class="text-slate-500">Order #</span><span class="font-mono font-bold">\${order.orderNumber}</span></div>
              <div class="flex justify-between"><span class="text-slate-500">Date</span><span class="font-semibold">\${order.date}</span></div>
              <div class="flex justify-between"><span class="text-slate-500">Payment</span><span class="font-bold text-primary uppercase">\${order.paymentMethod}</span></div>
            </div>

            <!-- Timeline -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h3 class="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5 text-primary">
                <span>⏱️</span> <span>\${t('status')}</span>
              </h3>
              <div class="space-y-3 relative ltr:pl-4 rtl:pr-4">
                <div class="flex items-start gap-2.5">
                  <span class="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center shrink-0">✓</span>
                  <div><p class="text-xs font-bold text-slate-800">Order Placed</p><p class="text-[10px] text-slate-400">Received at Kiryana counter</p></div>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center shrink-0">✓</span>
                  <div><p class="text-xs font-bold text-slate-800">Confirmed</p><p class="text-[10px] text-slate-400">Items verified in inventory</p></div>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="w-5 h-5 rounded-full bg-appWarning text-white text-[10px] flex items-center justify-center shrink-0">⏳</span>
                  <div><p class="text-xs font-bold text-slate-800">Preparing</p><p class="text-[10px] text-slate-400">Weighing & packing ration</p></div>
                </div>
                <div class="flex items-start gap-2.5 opacity-40">
                  <span class="w-5 h-5 rounded-full bg-slate-300 text-white text-[10px] flex items-center justify-center shrink-0">•</span>
                  <div><p class="text-xs font-semibold text-slate-800">Out for Delivery</p><p class="text-[10px] text-slate-400">Dispatched on bike</p></div>
                </div>
                <div class="flex items-start gap-2.5 opacity-40">
                  <span class="w-5 h-5 rounded-full bg-slate-300 text-white text-[10px] flex items-center justify-center shrink-0">•</span>
                  <div><p class="text-xs font-semibold text-slate-800">Delivered</p><p class="text-[10px] text-slate-400">Arrived safely</p></div>
                </div>
              </div>
            </div>

            <!-- Items -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-xs space-y-2">
              <h3 class="font-bold text-slate-800 text-xs mb-2">\${t('items')}</h3>
              \${order.items.map(i => \`
                <div class="flex justify-between">
                  <span>\${i.name} × \${i.qty}</span>
                  <span class="font-semibold text-slate-800">Rs. \${i.price * i.qty}</span>
                </div>
              \`).join('')}
              <hr class="border-slate-100 my-2">
              <div class="flex justify-between font-bold text-sm text-slate-900">
                <span>\${t('total')}</span>
                <span class="text-primary">Rs. \${order.total}</span>
              </div>
            </div>

            <button onclick="navigate('receipt')" class="w-full py-3 bg-primary text-white font-bold rounded-xl text-xs shadow-md">
              \${t('downloadReceipt')}
            </button>
          </div>
        </div>
      \`;
    }

    // SCREEN 14: PROFILE
    function renderProfile() {
      return \`
        <div class="flex-1 flex flex-col overflow-hidden">
          \${renderTopBar(t('profile'))}
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            
            <!-- User card -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <div class="w-14 h-14 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center">
                A
              </div>
              <div class="overflow-hidden">
                <h3 class="font-bold text-sm text-slate-900">\${mockUser.name}</h3>
                <p class="text-xs text-slate-500">\${mockUser.phone}</p>
                <p class="text-[11px] text-slate-400 truncate mt-0.5">\${mockUser.address}</p>
              </div>
            </div>

            <!-- Language Toggle Card -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">🌐</span>
                <span class="text-xs font-bold text-slate-800">\${isUrdu() ? 'زبان تبدیل کریں' : 'Change Language'}</span>
              </div>
              <div class="flex border border-slate-200 rounded-xl overflow-hidden text-xs">
                <button onclick="setLang('ur')" class="px-3 py-1.5 font-bold transition \${isUrdu() ? 'bg-primary text-white' : 'bg-white text-slate-700'}">اردو</button>
                <button onclick="setLang('en')" class="px-3 py-1.5 font-bold transition \${!isUrdu() ? 'bg-primary text-white' : 'bg-white text-slate-700'}">EN</button>
              </div>
            </div>

            <!-- Menu Tiles -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100 text-xs">
              <div onclick="alert(mockUser.address)" class="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div class="flex items-center gap-2.5">
                  <span class="text-primary text-base">📍</span>
                  <div><p class="font-semibold text-slate-800">\${t('address')}</p><p class="text-[10px] text-slate-400 truncate max-w-[220px]">\${mockUser.address}</p></div>
                </div>
                <span class="text-slate-400">›</span>
              </div>
              <div onclick="navigate('orders')" class="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div class="flex items-center gap-2.5">
                  <span class="text-primary text-base">📦</span>
                  <div><p class="font-semibold text-slate-800">\${t('myOrders')}</p><p class="text-[10px] text-slate-400">View recent orders</p></div>
                </div>
                <span class="text-slate-400">›</span>
              </div>
              <div onclick="alert('Kiryana Helpline: 0300-1234567')" class="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div class="flex items-center gap-2.5">
                  <span class="text-primary text-base">❓</span>
                  <div><p class="font-semibold text-slate-800">Help & Support</p><p class="text-[10px] text-slate-400">0300-1234567</p></div>
                </div>
                <span class="text-slate-400">›</span>
              </div>
              <div onclick="alert('Al-Noor Grocery Store Karachi v1.0.0')" class="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div class="flex items-center gap-2.5">
                  <span class="text-primary text-base">ℹ️</span>
                  <div><p class="font-semibold text-slate-800">About Store</p><p class="text-[10px] text-slate-400">v1.0.0 Kiryana App</p></div>
                </div>
                <span class="text-slate-400">›</span>
              </div>
            </div>

            <button onclick="navigate('login')" class="w-full py-3 border border-appError text-appError font-bold rounded-xl text-xs hover:bg-red-50 transition flex items-center justify-center gap-2 mt-4">
              <span>🚪</span> <span>\${t('logout')}</span>
            </button>

          </div>
          \${renderBottomNav('profile')}
        </div>
      \`;
    }

    // SCREEN 15: RECEIPT
    function renderReceipt() {
      const order = state.lastOrder;
      const subtotal = Math.max(0, order.total - deliveryFee);

      return \`
        <div class="flex-1 flex flex-col overflow-hidden bg-slate-200">
          \${renderTopBar(t('downloadReceipt'), true, 'orders')}
          
          <div class="flex-1 overflow-y-auto p-4 flex items-center justify-center">
            <div class="bg-white w-full rounded-2xl p-5 shadow-lg border border-slate-300 text-xs">
              <div class="text-center">
                <span class="text-3xl text-primary">🛒</span>
                <h2 class="text-base font-bold text-slate-900 mt-1">Al-Noor Grocery Store</h2>
                <p class="text-[11px] text-slate-500">النور گروسری اسٹور — کراچی</p>
                <p class="text-[9px] text-slate-400">Phone: 0300-1234567 | NTN: 823491-0</p>
              </div>

              <div class="dashed-line my-3"></div>

              <div class="space-y-1 text-[11px] text-slate-600">
                <div class="flex justify-between"><span>Receipt #</span><span class="font-mono font-bold">RCP-2026-0001</span></div>
                <div class="flex justify-between"><span>Order #</span><span class="font-mono font-bold">\${order.orderNumber}</span></div>
                <div class="flex justify-between"><span>Date</span><span>13-Oct-2026, 3:45 PM</span></div>
              </div>

              <hr class="border-slate-100 my-2.5">

              <div class="text-[11px] text-slate-600">
                <p class="font-bold text-slate-800">Customer: \${mockUser.name}</p>
                <p>Phone: \${mockUser.phone}</p>
                <p class="truncate">Address: \${mockUser.address}</p>
              </div>

              <hr class="border-slate-100 my-2.5">

              <!-- Items Table -->
              <div class="space-y-1 text-[11px]">
                <div class="flex justify-between font-bold text-slate-400 text-[10px]">
                  <span class="w-1/2">ITEM</span>
                  <span class="w-1/4 text-center">QTY</span>
                  <span class="w-1/4 text-right">PRICE</span>
                </div>
                <div class="flex justify-between">
                  <span class="w-1/2">Basmati Rice Super</span>
                  <span class="w-1/4 text-center">2</span>
                  <span class="w-1/4 text-right font-semibold">Rs. 1,400</span>
                </div>
                <div class="flex justify-between">
                  <span class="w-1/2">White Sugar (1kg)</span>
                  <span class="w-1/4 text-center">1</span>
                  <span class="w-1/4 text-right font-semibold">Rs. 150</span>
                </div>
                <div class="flex justify-between">
                  <span class="w-1/2">Sunflower Oil (1L)</span>
                  <span class="w-1/4 text-center">1</span>
                  <span class="w-1/4 text-right font-semibold">Rs. 520</span>
                </div>
              </div>

              <div class="dashed-line my-3"></div>

              <div class="space-y-1 text-[11px]">
                <div class="flex justify-between text-slate-500"><span>Subtotal</span><span>Rs. \${Math.round(subtotal)}</span></div>
                <div class="flex justify-between text-slate-500"><span>Delivery Fee</span><span>Rs. 100</span></div>
                <div class="flex justify-between font-bold text-sm text-slate-900 pt-1">
                  <span>TOTAL</span>
                  <span class="text-primary text-base">Rs. \${Math.round(order.total)}</span>
                </div>
              </div>

              <div class="dashed-line my-3"></div>

              <div class="text-[10px] text-slate-600 space-y-0.5">
                <div class="flex justify-between"><span>Payment Mode</span><span class="font-bold uppercase">\${order.paymentMethod}</span></div>
                \${order.paymentMethod === 'installment' ? \`
                  <div class="flex justify-between"><span>Down Payment</span><span>Rs. 500</span></div>
                  <div class="flex justify-between"><span>Plan</span><span class="font-bold">\${order.plan || 'Rs. 125 × 15 Days'}</span></div>
                \` : ''}
              </div>

              <!-- QR Code -->
              <div class="mt-4 flex flex-col items-center">
                <div class="w-20 h-20 bg-black rounded-lg flex flex-col items-center justify-center text-white">
                  <span class="text-3xl">▦</span>
                  <span class="text-[8px] font-mono tracking-widest font-bold">QR CODE</span>
                </div>
                <p class="text-xs font-bold text-primaryDark mt-2">Shukriya! Dobara tashreef laayen 🌟</p>
                <p class="text-[11px] text-slate-400">شکریہ! دوبارہ تشریف لائیں</p>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // ═══════════════════════════════════════════════
    // ROOT RENDERER
    // ═══════════════════════════════════════════════
    function render() {
      const container = document.getElementById('app-container');
      container.className = \`mobile-frame w-full bg-[#F5F5F5] flex flex-col sm:rounded-3xl overflow-hidden relative border border-slate-700/50 \${isUrdu() ? 'lang-ur' : 'lang-en'}\`;

      switch (state.currentScreen) {
        case 'splash': container.innerHTML = renderSplash(); break;
        case 'language': container.innerHTML = renderLanguage(); break;
        case 'login': container.innerHTML = renderLogin(); break;
        case 'signup': container.innerHTML = renderSignup(); break;
        case 'home': container.innerHTML = renderHome(); break;
        case 'products': container.innerHTML = renderProductList(); break;
        case 'product_detail': container.innerHTML = renderProductDetail(); break;
        case 'cart': container.innerHTML = renderCart(); break;
        case 'checkout': container.innerHTML = renderCheckout(); break;
        case 'installment': container.innerHTML = renderInstallment(); break;
        case 'confirmation': container.innerHTML = renderConfirmation(); break;
        case 'orders': container.innerHTML = renderOrders(); break;
        case 'order_detail': container.innerHTML = renderOrderDetail(); break;
        case 'profile': container.innerHTML = renderProfile(); break;
        case 'receipt': container.innerHTML = renderReceipt(); break;
        default: container.innerHTML = renderHome();
      }
    }

    // Initial render
    render();

    // Auto transition from splash after 2 seconds
    setTimeout(() => {
      if (state.currentScreen === 'splash') {
        navigate('language');
      }
    }, 2000);
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  res.end(htmlContent);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Al-Noor Dev Server] listening on http://0.0.0.0:${PORT}`);
});
