import type { CatalogParams, ProductRow } from "@/lib/catalog";

const P = (id: number | string, w = 940) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${id === 17209708 ? "png" : "jpeg"}?auto=compress&cs=tinysrgb&dpr=2&h=650&w=${w}`;

export type StaticCategory = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
  sort: number;
};

export type StaticShop = {
  id: number;
  userId: number;
  name: string;
  slug: string;
  city: string;
  story: string;
  avatarColor: string;
  verified: boolean;
  commissionPercent: number | null;
  createdAt: Date;
};

export type StaticProduct = ProductRow & {
  description: string;
  specs: Record<string, string>;
};

export type StaticComment = {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  text: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
};

export const STATIC_CATEGORIES: StaticCategory[] = [
  { id: 1, name: "فرش و گلیم", slug: "carpet", icon: "Scroll", color: "#b4532a", sort: 1 },
  { id: 2, name: "سفال و سرامیک", slug: "pottery", icon: "Amphora", color: "#0f766e", sort: 2 },
  { id: 3, name: "نساجی و سوزن‌دوزی", slug: "textile", icon: "Scissors", color: "#7c2d12", sort: 3 },
  { id: 4, name: "چرم دست‌دوز", slug: "leather", icon: "Handbag", color: "#44403c", sort: 4 },
  { id: 5, name: "نقاشی و خوشنویسی", slug: "painting", icon: "Brush", color: "#6d28d9", sort: 5 },
  { id: 6, name: "زیورآلات هنری", slug: "jewelry", icon: "Gem", color: "#0e7490", sort: 6 },
  { id: 7, name: "صنایع چوبی و خاتم", slug: "wood", icon: "TreePine", color: "#92400e", sort: 7 },
  { id: 8, name: "فلز و قلمزنی", slug: "metal", icon: "Hammer", color: "#57534e", sort: 8 },
  { id: 9, name: "سوغات و دکوراسیون", slug: "decor", icon: "Gift", color: "#be185d", sort: 9 },
  { id: 10, name: "طرح و پترن", slug: "pattern", icon: "Shapes", color: "#7e22ce", sort: 10 },
  { id: 11, name: "نمد و نمدمالی", slug: "felt", icon: "Layers", color: "#a16207", sort: 11 },
  { id: 12, name: "صنایع روشنایی", slug: "lighting", icon: "LampCeiling", color: "#ca8a04", sort: 12 },
];

const catBySlug = Object.fromEntries(STATIC_CATEGORIES.map((c) => [c.slug, c]));

const rawShops = [
  { name: "گالری سفال لالجین", slug: "laljin-pottery", city: "لالجین، همدان", story: "سه نسل است که در خاندان رضایی سفال لعاب‌دار با گل و مینا می‌سازیم. هر قطعه کاملاً دست‌ساز و یکتاست.", avatarColor: "#0f766e", verified: true },
  { name: "گلیم و فرش کردستان", slug: "kordestan-carpet", city: "سنندج", story: "گلیم‌ها و قالیچه‌های کردستان با پشم دست‌ریس و رنگ‌های گیاهی بافته می‌شوند؛ هر طرح روایت یک روستا است.", avatarColor: "#b4532a", verified: true },
  { name: "دست‌دوز بلوچ", slug: "baluch-handcraft", city: "زاهدان", story: "سوزن‌دوزی بلوچی با نخ‌های ابریشم و رنگ‌های طبیعی؛ اشتغال‌زایی برای زنان هنرمند سیستان و بلوچستان.", avatarColor: "#7c2d12", verified: true },
  { name: "چرم میزان", slug: "mizan-leather", city: "تبریز", story: "چرم طبیعی گاوی با دوخت دستی و یراق‌آلات برنج؛ هر کیف با شماره سریال و امضای کارگاه تحویل می‌شود.", avatarColor: "#44403c", verified: true },
  { name: "نگارستان نقاشی", slug: "negarestan-art", city: "تهران", story: "تابلوهای نقاشی رنگ روغن و خوشنویسی معاصر روی کاغذ ابری و بوم؛ با گواهی امضاشده هنرمند.", avatarColor: "#6d28d9", verified: true },
  { name: "فیروزه‌کوب نیشابور", slug: "firouzeh-koub", city: "نیشابور", story: "فیروزه اصل نیشابور روی نقره ۹۲۵ و مسی با چکش‌های مینیاتوری کوبیده می‌شود.", avatarColor: "#0e7490", verified: true },
  { name: "کارگاه خاتم اصفهان", slug: "khatam-isfahan", city: "اصفهان", story: "خاتم‌کاری با چوب، استخوان و فلز؛ میراث جهانی یونسکو با دستان استادکاران اصفهانی.", avatarColor: "#92400e", verified: true },
  { name: "قلمزنی هنر اصفهان", slug: "ghalamzani-isfahan", city: "اصفهان", story: "قلم‌زنی روی مس و برنج با طرح‌های شکارگاه و اسلیمی؛ هر بشقاب هفته‌ها کار می‌برد.", avatarColor: "#57534e", verified: false },
  { name: "خانه سوغات شیراز", slug: "shiraz-souvenirs", city: "شیراز", story: "تابلو فرش‌ها و دکوراسیون الهام‌گرفته از نارنجستان و باغ ارم؛ بسته‌بندی هدیه رایگان.", avatarColor: "#be185d", verified: true },
  { name: "آتلیه ترنج؛ پترن و چاپ دستی", slug: "taranj-pattern", city: "تهران", story: "چاپ دستی بلاک‌پرینت و باتیک روی پارچه‌های طبیعی با رنگ‌های گیاهی بدون سرب؛ هر پارچه شماره‌دار و امضاشده است.", avatarColor: "#7e22ce", verified: true },
  { name: "نمدینه؛ هنر نمدمالی معاصر", slug: "nemadineh-felt", city: "شیراز", story: "نمدمالی سنتی با پشم مرینوس دست‌چیده و رنگرزی گیاهی؛ از زیرانداز و پاپوش تا اکسسوری نمدی مدرن.", avatarColor: "#a16207", verified: true },
  { name: "چراغ‌چی؛ صنایع روشنایی دست‌ساز", slug: "cheraghchi-lighting", city: "اصفهان", story: "لوستر، آباژور و فانوس‌های موزائیک شیشه‌ای و برنجی با دست استادکاران اصفهان؛ هر قطعه کاملاً یکتاست.", avatarColor: "#ca8a04", verified: true },
];

export const STATIC_SHOPS: StaticShop[] = rawShops.map((s, idx) => ({
  id: idx + 1,
  userId: idx + 3,
  name: s.name,
  slug: s.slug,
  city: s.city,
  story: s.story,
  avatarColor: s.avatarColor,
  verified: s.verified,
  commissionPercent: null,
  createdAt: new Date("2025-03-21T09:00:00.000Z"),
}));

const shopBySlug = Object.fromEntries(STATIC_SHOPS.map((s) => [s.slug, s]));

type RawProd = {
  name: string;
  slug: string;
  shop: string;
  cat: string;
  price: number;
  original?: number;
  rating: string;
  ratingsCount: number;
  sales: number;
  image: string;
  desc: string;
  specs: Record<string, string>;
  featured?: boolean;
};

const rawProducts: RawProd[] = [
  { name: "گلدان سفالی لالجینی با لعاب فیروزه‌ای — دست‌ساز", slug: "laljin-turquoise-vase", shop: "laljin-pottery", cat: "pottery", price: 1850000, original: 2100000, rating: "4.9", ratingsCount: 214, sales: 486, image: P(29286721), desc: "گلدان سفالی با لعاب فیروزه‌ای و پتینه دستی؛ هر قطعه یکتاست و با شماره کارگاه امضا می‌شود. مناسب چیدمان مدرن و کلاسیک.", specs: { "جنس": "سفال لعاب‌دار لالجین", "روش ساخت": "چرخ‌کاری و لعاب‌کاری دستی", "ابعاد": "ارتفاع ۳۵ سانتی‌متر", "محل ساخت": "لالجین، همدان" }, featured: true },
  { name: "بشقاب دیواری سفالی نقاشی‌دست با نقش گل و مرغ", slug: "laljin-gol-o-morgh-platter", shop: "laljin-pottery", cat: "pottery", price: 1250000, original: 1400000, rating: "4.7", ratingsCount: 158, sales: 392, image: P(16131600), desc: "بشقاب لعابی با نقوش دست‌نگاره گل و مرغ؛ برای آویزان کردن روی دیوار یا سرو میوه در مجالس.", specs: { "جنس": "سفال لعاب‌دار", "روش ساخت": "نقاشی دستی روی لعاب", "قطر": "۳۲ سانتی‌متر", "محل ساخت": "لالجین، همدان" } },
  { name: "ست ۴ لیوان قهوه‌خوری دست‌ساز لالجینی", slug: "laljin-coffee-cups", shop: "laljin-pottery", cat: "pottery", price: 2400000, original: 2750000, rating: "4.8", ratingsCount: 190, sales: 274, image: P(39060114), desc: "چهار لیوان قهوه‌خوری دست‌ساز با نقش‌های دست‌نگاره رنگارنگ؛ هر لیوان کمی متفاوت از دیگری است — زیبایی واقعی دست‌ساز.", specs: { "جنس": "سفال لعاب‌دار", "تعداد": "۴ عدد", "حجم": "هر لیوان ۱۲۰ میلی‌لیتر", "محل ساخت": "لالجین، همدان" }, featured: true },
  { name: "گلدان سفالی روستیک با بافت طبیعی", slug: "laljin-rustic-vase", shop: "laljin-pottery", cat: "pottery", price: 980000, original: 1100000, rating: "4.6", ratingsCount: 121, sales: 530, image: P(32877675), desc: "گلدان خام با بافت طبیعی خاک رس؛ بدون لعاب رنگی، زیبایی خامی و زمینی به دکوراسیون می‌بخشد.", specs: { "جنس": "خاک رس طبیعی", "ابعاد": "ارتفاع ۲۸ سانتی‌متر", "روش ساخت": "دست‌ساز بدون چرخ", "محل ساخت": "لالجین، همدان" } },
  { name: "گلیم کردستان دیوارکوب طرح آریا — پشم دست‌ریس", slug: "kordestan-arya-kilim", shop: "kordestan-carpet", cat: "carpet", price: 8500000, original: 9800000, rating: "5.0", ratingsCount: 87, sales: 64, image: P(34084601), desc: "گلیم پشمی با رنگ‌های گیاهی (روناس، نیل، پوست انار) بافته‌شده توسط بافندگان روستای کامیاران.", specs: { "جنس": "پشم دست‌ریس و رنگ گیاهی", "ابعاد": "۱۶۰×۱۱۰ سانتی‌متر", "روش ساخت": "گلیم‌بافی تخت", "محل ساخت": "سنندج، کردستان" }, featured: true },
  { name: "قالیچه دستباف شیراز طرح شاه‌عباسی", slug: "shiraz-shahabbasi-rug", shop: "kordestan-carpet", cat: "carpet", price: 24000000, original: 28000000, rating: "5.0", ratingsCount: 42, sales: 18, image: P(34157887), desc: "قالیچه دستباف با نقشه شاه‌عباسی، گره ترکی و چله پشمی؛ سرمایه‌ای از هنر و اصالت برای دکوراسیون شما.", specs: { "جنس": "پشم و ابریشم", "ابعاد": "۲۰۰×۱۳۰ سانتی‌متر", "گره": "ترکی — ۴۵ گره در رج", "محل ساخت": "شیراز، فارس" } },
  { name: "جاجیم پشمی دستباف سرمه‌ای", slug: "kordestan-siblue-jajim", shop: "kordestan-carpet", cat: "carpet", price: 3200000, original: 3600000, rating: "4.5", ratingsCount: 96, sales: 148, image: P(33868697), desc: "جاجیم دو رویه پشمی با راه‌راه سرمه‌ای و کرم؛ مناسب پتو، رومیزی و دکوراسیون روستیک.", specs: { "جنس": "پشم چیده‌شده دستی", "ابعاد": "۲۲۰×۱۵۰ سانتی‌متر", "روش ساخت": "جاجیم‌بافی دو رو", "محل ساخت": "سنندج، کردستان" } },
  { name: "سفره سوزن‌دوزی بلوچی با طرح سرو و بته‌جقه", slug: "baluch-batteh-joqeh-sofreh", shop: "baluch-handcraft", cat: "textile", price: 2900000, original: 3400000, rating: "4.9", ratingsCount: 134, sales: 210, image: P(35251793), desc: "سوزن‌دوزی دستی با نخ ابریشم رنگی روی پارچه ترمه؛ تزیین‌کننده سفره‌های ایرانی و هدیه نفیس.", specs: { "جنس": "ترمه و نخ ابریشم", "ابعاد": "۹۰×۹۰ سانتی‌متر", "روش ساخت": "سوزن‌دوزی بلوچی دستی", "محل ساخت": "زاهدان، سیستان" }, featured: true },
  { name: "رومیزی ترمه‌دوزی با طرح سروی", slug: "baluch-sorvi-tablecloth", shop: "baluch-handcraft", cat: "textile", price: 1450000, original: 1700000, rating: "4.4", ratingsCount: 88, sales: 265, image: P(9981356), desc: "رومیزی ترمه‌ای با گلدوزی سرمه‌دوزی؛ مناسب سفره هفت‌سین و میز پذیرایی.", specs: { "جنس": "ترمه ابریشم و سرمه", "ابعاد": "۱۰۰×۱۰۰ سانتی‌متر", "روش ساخت": "گلدوزی دستی", "محل ساخت": "زاهدان، سیستان" } },
  { name: "تابلوی سوزن‌دوزی «قلب رنگی» با مهره‌دوزی — قاب گرد", slug: "baluch-hands-artwork", shop: "baluch-handcraft", cat: "textile", price: 5800000, original: 6500000, rating: "4.9", ratingsCount: 61, sales: 33, image: P(9738087), desc: "تابلوی سوزن‌دوزی برجسته با طرح قلب و مهره‌های رنگی؛ اثر هنری یکتا با قاب چوبی گرد.", specs: { "جنس": "نخ رنگی و مهره روی پارچه", "ابعاد": "۴۰×۴۰ سانتی‌متر", "روش ساخت": "سوزن‌دوزی و مهره‌دوزی برجسته", "محل ساخت": "زاهدان، سیستان" } },
  { name: "کیف دوشی چرم دست‌دوز مدل کویر", slug: "mizan-desert-shoulder-bag", shop: "mizan-leather", cat: "leather", price: 6400000, original: 7200000, rating: "4.8", ratingsCount: 172, sales: 238, image: P(21326994), desc: "چرم گاوی طبیعی با دوخت دستی و یراق برنجی؛ داخل پارچه جیر با جیب‌های متعدد. شماره سریال کارگاه و امضای استاد میزان.", specs: { "جنس": "چرم گاوی طبیعی", "ابعاد": "۳۲×۲۲×۱۰ سانتی‌متر", "روش ساخت": "دوخت دستی زین‌دوزی", "محل ساخت": "تبریز" }, featured: true },
  { name: "کیف دستی چرم مراکشی با طرح سنتی", slug: "mizan-moroccan-tote", shop: "mizan-leather", cat: "leather", price: 9800000, original: 11000000, rating: "4.7", ratingsCount: 94, sales: 87, image: P(36933384), desc: "کیف دستی بزرگ با طرح سنتی ترکیبی مراکشی؛ جادار، شیک و بسیار بادوام.", specs: { "جنس": "چرم گاوی کروپون", "ابعاد": "۴۰×۳۰×۱۵ سانتی‌متر", "روش ساخت": "برش و دوخت دستی", "محل ساخت": "تبریز" } },
  { name: "کیف دست‌دوز بازار تبریز — چرم و جیر", slug: "mizan-bazaar-bag", shop: "mizan-leather", cat: "leather", price: 7600000, original: 8900000, rating: "4.6", ratingsCount: 110, sales: 121, image: P(27100523), desc: "ترکیب چرم و جیر با دوخت زین‌دوزی؛ سبک و مناسب استفاده روزمره و اداری.", specs: { "جنس": "چرم و جیر طبیعی", "ابعاد": "۲۸×۲۰×۸ سانتی‌متر", "روش ساخت": "دوخت دستی", "محل ساخت": "تبریز" } },
  { name: "تابلوی نقاشی رنگ روغن «دشت لاله» ۵۰×۷۰", slug: "negarestan-tulip-field", shop: "negarestan-art", cat: "painting", price: 18000000, original: 22000000, rating: "5.0", ratingsCount: 38, sales: 12, image: P(16484131), desc: "رنگ روغن اورجینال روی بوم کتان با امضای هنرمند؛ با گواهی اصالت اثر و قاب چوبی دست‌ساز ارسال می‌شود.", specs: { "تکنیک": "رنگ روغن روی بوم کتان", "ابعاد": "۵۰×۷۰ سانتی‌متر", "هنرمند": "نگار محمدی", "محل ساخت": "تهران" }, featured: true },
  { name: "تابلوی انتزاعی رنگ روغن — بافت زنده", slug: "negarestan-abstract-texture", shop: "negarestan-art", cat: "painting", price: 15500000, original: 17000000, rating: "4.8", ratingsCount: 45, sales: 21, image: P(34902536), desc: "بافت‌های امپاستو با رنگ‌های گرم؛ مناسب دیوارهای مدرن و پذیرایی‌های مینیمال.", specs: { "تکنیک": "رنگ روغن امپاستو", "ابعاد": "۶۰×۸۰ سانتی‌متر", "هنرمند": "نگار محمدی", "محل ساخت": "تهران" } },
  { name: "نقاشی در حال اجرای کارگاه — قاب‌دار ۳۵×۲۵", slug: "negarestan-studio-in-progress", shop: "negarestan-art", cat: "painting", price: 9500000, original: 11000000, rating: "4.9", ratingsCount: 52, sales: 27, image: P(11077392), desc: "اثر منحصربه‌فرد ثبت‌کننده لحظه خلق؛ امضای هنرمند و شماره‌گذاری روی پشت قاب.", specs: { "تکنیک": "رنگ روغن روی بوم", "ابعاد": "۲۵×۳۵ سانتی‌متر", "هنرمند": "نگار محمدی", "محل ساخت": "تهران" } },
  { name: "گردنبند فیروزه اصل نیشابور روی نقره ۹۲۵", slug: "firouzeh-necklace-silver", shop: "firouzeh-koub", cat: "jewelry", price: 4200000, original: 4800000, rating: "4.9", ratingsCount: 143, sales: 187, image: P(135486), desc: "فیروزه آبی اصل نیشابور روی زنجیر نقره ۹۲۵ با قفل دست‌ساز؛ با گواهی سنگ اصل.", specs: { "جنس": "نقره ۹۲۵ و فیروزه نیشابور", "طول زنجیر": "۵۵ سانتی‌متر", "روش ساخت": "فیروزه‌کوبی و زنجیربافی دستی", "محل ساخت": "نیشابور" }, featured: true },
  { name: "دستبند فیروزه‌کوب نقره طرح گل‌افشان", slug: "firouzeh-bracelet-golafshan", shop: "firouzeh-koub", cat: "jewelry", price: 6800000, original: 7500000, rating: "4.8", ratingsCount: 98, sales: 96, image: P(11006287), desc: "دستبند تنگ نقره با کوبش فیروزه طرح گل‌افشان؛ مناسب هدیه نفیس و مناسبت‌ها.", specs: { "جنس": "نقره ۹۲۵ و فیروزه", "سایز": "۱۸ سانتی‌متر", "روش ساخت": "فیروزه‌کوبی دستی", "محل ساخت": "نیشابور" } },
  { name: "انگشتر نقره با عقیق و فیروزه نیشابور", slug: "firouzeh-agate-ring", shop: "firouzeh-koub", cat: "jewelry", price: 3600000, original: 4100000, rating: "4.7", ratingsCount: 120, sales: 154, image: P(11705369), desc: "انگشتر نقره ۹۲۵ با نگین عقیق و مرصع‌کاری فیروزه؛ سایز قابل تنظیم.", specs: { "جنس": "نقره ۹۲۵، عقیق و فیروزه", "سایز": "۵۲ تا ۶۲ متغیر", "روش ساخت": "مرصع‌کاری دستی", "محل ساخت": "نیشابور" } },
  { name: "قاب خاتم‌کاری طرح اسلیمی ۳۰×۴۰", slug: "khatam-eslimi-frame", shop: "khatam-isfahan", cat: "wood", price: 12500000, original: 14000000, rating: "5.0", ratingsCount: 47, sales: 19, image: P(30563520), desc: "قاب خاتم با هزاران قطعه چوب، استخوان و فلز؛ میراث یونسکو با امضای استادکار. تحویل با جعبه چوبی و گواهی.", specs: { "جنس": "خاتم (چوب، استخوان، برنج)", "ابعاد": "۳۰×۴۰ سانتی‌متر", "روش ساخت": "خاتم‌کاری دستی اسلیمی", "محل ساخت": "اصفهان" }, featured: true },
  { name: "جعبه جواهرات چوبی منبت‌کاری", slug: "khatam-jewelry-box", shop: "khatam-isfahan", cat: "wood", price: 5200000, original: 5900000, rating: "4.8", ratingsCount: 76, sales: 68, image: P(33395676), desc: "جعبه جواهرات با منبت و خاتم هندسی و آستر مخمل قرمز؛ هدیه‌ای ماندگار برای عزیزان شما.", specs: { "جنس": "چوب گردو و منبت", "ابعاد": "۱۸×۱۲×۸ سانتی‌متر", "روش ساخت": "منبت‌کاری با دست", "محل ساخت": "اصفهان" } },
  { name: "گلدان منبت‌کاری چوبی طرح اسلیمی", slug: "khatam-carved-vase", shop: "khatam-isfahan", cat: "wood", price: 7800000, original: 9000000, rating: "4.7", ratingsCount: 58, sales: 41, image: P(37248118), desc: "گلدان چوبی منبت‌شده با گل‌های برجسته؛ چند ساعت کار استادکار برای هر قطعه.", specs: { "جنس": "چوب گردو", "ابعاد": "ارتفاع ۴۵ سانتی‌متر", "روش ساخت": "منبت‌کاری با دست", "محل ساخت": "اصفهان" } },
  { name: "بشقاب قلم‌زنی طرح شکارگاه — مس", slug: "ghalamzani-hunting-plate", shop: "ghalamzani-isfahan", cat: "metal", price: 6200000, original: 7000000, rating: "4.9", ratingsCount: 71, sales: 58, image: P(34391573), desc: "قلم‌زنی دستی روی مس با طرح شکارگاه؛ مناسب دکوراسیون و هدیه لوکس.", specs: { "جنس": "مس مرغوب", "قطر": "۳۵ سانتی‌متر", "روش ساخت": "قلم‌زنی دستی", "محل ساخت": "اصفهان" }, featured: true },
  { name: "سینی قلم‌زنی مس طرح اسلیمی", slug: "ghalamzani-slimi-tray", shop: "ghalamzani-isfahan", cat: "metal", price: 4900000, original: 5600000, rating: "4.6", ratingsCount: 84, sales: 92, image: P(31435132), desc: "سینی مس با قلم‌زنی اسلیمی و لبه‌های صیقلی؛ هم کاربردی و هم تزئینی.", specs: { "جنس": "مس", "قطر": "۴۰ سانتی‌متر", "روش ساخت": "قلم‌زنی دستی", "محل ساخت": "اصفهان" } },
  { name: "گلدان سفالی تزئینی طرح کوهپایه", slug: "shiraz-mountain-vase", shop: "shiraz-souvenirs", cat: "decor", price: 1150000, original: 1300000, rating: "4.5", ratingsCount: 132, sales: 240, image: P(34259434), desc: "گلدان تزئینی با طرح‌های الهام‌گرفته از کوهپایه‌های شیراز؛ مناسب هدیه و چیدمان.", specs: { "جنس": "سفال تزئینی", "ابعاد": "ارتفاع ۳۰ سانتی‌متر", "روش ساخت": "قالب‌گیری و نقاشی دستی", "محل ساخت": "شیراز" } },
  { name: "تابلو فرش دیواری طرح نارنجستان سعدی", slug: "shiraz-narangestan-tapestry", shop: "shiraz-souvenirs", cat: "decor", price: 16000000, original: 19000000, rating: "4.9", ratingsCount: 35, sales: 9, image: P(28438629), desc: "تابلو فرش بافته‌شده با نقشه نارنجستان سعدی؛ اثر هنری نفیس با قاب چوبی و جعبه هدیه.", specs: { "جنس": "پشم و ابریشم", "ابعاد": "۸۰×۶۰ سانتی‌متر", "روش ساخت": "گره ترکی دستباف", "محل ساخت": "شیراز" } },
  { name: "شال باتیک ابریشم طرح «سرو و بته‌جقه»", slug: "taranj-batteh-shawl", shop: "taranj-pattern", cat: "pattern", price: 3200000, original: 3600000, rating: "4.9", ratingsCount: 156, sales: 240, image: P(2171218), desc: "باتیک دستی روی ابریشم طبیعی با واکس و رنگ‌های گیاهی؛ طرح سرو و بته‌جقه با دات‌های دست‌ساز؛ هر شال شماره‌دار و امضاشده است.", specs: { "جنس": "ابریشم طبیعی", "ابعاد": "۹۰×۲۵۰ سانتی‌متر", "روش ساخت": "باتیک دستی با واکس مذاب", "رنگ": "گیاهی بدون سرب" }, featured: true },
  { name: "رانر میز باتیک طرح شاه‌عباسی", slug: "taranj-shahabbasi-runner", shop: "taranj-pattern", cat: "pattern", price: 1650000, original: 1950000, rating: "4.7", ratingsCount: 189, sales: 310, image: P(34465333), desc: "رانر پارچه‌ای با چاپ باتیک دستی طرح گل شاه‌عباسی؛ مناسب میز پذیرایی و دکوراسیون سنتی.", specs: { "جنس": "پنبه طبیعی", "ابعاد": "۴۵×۱۵۰ سانتی‌متر", "روش ساخت": "باتیک رزرو و رنگ‌آمیزی دستی", "محل ساخت": "تهران" } },
  { name: "روسری باتیک طرح اسلیمی لاجوردی", slug: "taranj-slimi-scarf", shop: "taranj-pattern", cat: "pattern", price: 3400000, original: 3850000, rating: "4.8", ratingsCount: 142, sales: 198, image: P(8752421), desc: "روسری ابریشم و کتان با بته‌جقه‌ها و اسلیمی‌های لاجوردی باتیک؛ رنگ ثابت و دوخت دستی لبه‌ها.", specs: { "جنس": "ابریشم و کتان", "ابعاد": "۹۰×۹۰ سانتی‌متر", "روش ساخت": "باتیک و دوخت دستی", "محل ساخت": "تهران" } },
  { name: "پارچه باتیک متری طرح ترنج — ۲ متر", slug: "taranj-termeh-meter", shop: "taranj-pattern", cat: "pattern", price: 4200000, original: 4700000, rating: "4.6", ratingsCount: 98, sales: 154, image: P(38892118), desc: "پارچه متری باتیک با طرح ترنج برای دوخت لباس، پرده و کوسن؛ ۲ متر عرض ۱۱۰ سانتی‌متر.", specs: { "جنس": "پنبه و ویسکوز", "متراژ": "۲ متر × عرض ۱۱۰ سانتی‌متر", "روش ساخت": "باتیک صنعتی-دستی", "محل ساخت": "تهران" } },
  { name: "بلوز کتانی چاپ بلاک طرح بته", slug: "taranj-batteh-blouse", shop: "taranj-pattern", cat: "pattern", price: 1950000, original: 2300000, rating: "4.5", ratingsCount: 210, sales: 380, image: P(31879670), desc: "بلوز کتانی زنانه با چاپ بلاک دستی طرح بته‌جقه؛ سایز آزاد و تنفس‌پذیر برای تابستان.", specs: { "جنس": "کتان طبیعی", "سایز": "آزاد (S–XL)", "روش ساخت": "بلاک‌پرینت دستی", "محل ساخت": "تهران" } },
  { name: "پانل دیواری باتیک «کویر در شب» ۹۰×۱۲۰", slug: "taranj-desert-panel", shop: "taranj-pattern", cat: "pattern", price: 5600000, original: 6500000, rating: "5.0", ratingsCount: 44, sales: 18, image: P(8751695), desc: "پانل دیواری هنری باتیک با طرح شفق کویر؛ اثر شماره‌دار و امضاشده هنرمند، با قاب چوبی.", specs: { "جنس": "ابریشم و بوم", "ابعاد": "۹۰×۱۲۰ سانتی‌متر", "روش ساخت": "باتیک نقاشی دستی", "هنرمند": "ترانه رستمی" }, featured: true },
  { name: "کیف نمدی زنانه طرح گل آبی دست‌دوز", slug: "nemadineh-blue-bag", shop: "nemadineh-felt", cat: "felt", price: 1450000, original: 1700000, rating: "4.8", ratingsCount: 178, sales: 265, image: P(30529136), desc: "کیف دوشی نمدی با گل‌های برجسته دست‌دوز؛ چرم طبیعی در بندها و آستر کتان؛ بسیار سبک و مقاوم.", specs: { "جنس": "نمد پشم مرینوس", "ابعاد": "۲۸×۲۲×۸ سانتی‌متر", "روش ساخت": "نمدمالی و گل‌دوزی دستی", "محل ساخت": "شیراز" }, featured: true },
  { name: "کلاه نمدی دست‌ساز طرح سنتی", slug: "nemadineh-traditional-hat", shop: "nemadineh-felt", cat: "felt", price: 890000, original: 1050000, rating: "4.6", ratingsCount: 134, sales: 240, image: P(34550330), desc: "کلاه نمدی کلاسیک با الیاف طبیعی و فرم‌دهی دستی؛ گرم، سبک و مناسب پاییز و زمستان.", specs: { "جنس": "پشم مرینوس", "سایز": "۵۶ تا ۶۰ قابل تنظیم", "روش ساخت": "نمدمالی سنتی", "محل ساخت": "شیراز" } },
  { name: "پاپوش نمدی عشایری طرح قشقایی", slug: "nemadineh-ghashghai-slipper", shop: "nemadineh-felt", cat: "felt", price: 1150000, original: 1350000, rating: "4.9", ratingsCount: 203, sales: 320, image: P(39847406), desc: "پاپوش نمدی با نقش‌ونگار قشقایی به شیوه نمدمالان فارس؛ زیره چرمی طبیعی ضد لغزش.", specs: { "جنس": "نمد پشم و چرم طبیعی", "سایز": "۳۷ تا ۴۴", "روش ساخت": "نمدمالی و دوخت دستی", "محل ساخت": "شیراز" }, featured: true },
  { name: "کیف نمدی طرح گوزن — هدیه کودک", slug: "nemadineh-deer-pouch", shop: "nemadineh-felt", cat: "felt", price: 750000, original: 900000, rating: "4.4", ratingsCount: 120, sales: 275, image: P(3403861), desc: "کیف نمدی کودکانه با طرح گوزن؛ مناسب هدیه تولد و مهدکودک؛ با بند قابل تنظیم.", specs: { "جنس": "نمد پشم رنگی", "ابعاد": "۱۸×۱۸ سانتی‌متر", "روش ساخت": "برش و دوخت دستی نمد", "محل ساخت": "شیراز" } },
  { name: "ست ۴ پاپوش نمدی عروس و داماد", slug: "nemadineh-couple-slippers", shop: "nemadineh-felt", cat: "felt", price: 2200000, original: 2600000, rating: "4.7", ratingsCount: 96, sales: 88, image: P(12024998), desc: "ست چهار عددی پاپوش نمدی با گلدوزی رنگی؛ هدیه‌ای صمیمی و بادوام برای زوج‌ها.", specs: { "جنس": "نمد پشم و گلدوزی", "سایز": "۳۷ تا ۴۴ (دو جفت)", "روش ساخت": "نمدمالی دستی", "محل ساخت": "شیراز" } },
  { name: "پاپوش نمدی دست‌دوز عشایری — تک", slug: "nemadineh-single-slipper", shop: "nemadineh-felt", cat: "felt", price: 980000, original: 1150000, rating: "4.8", ratingsCount: 165, sales: 290, image: P(34787523), desc: "پاپوش نمدی با گلدوزی عشایری؛ زیره نرم و انعطاف‌پذیر، مناسب خانه و سفر.", specs: { "جنس": "نمد پشم و گلدوزی", "سایز": "۳۷ تا ۴۴", "روش ساخت": "نمدمالی و گلدوزی دستی", "محل ساخت": "شیراز" } },
  { name: "عروسک نمدی جفت کفش سنتی — دکوری", slug: "nemadineh-boot-ornament", shop: "nemadineh-felt", cat: "felt", price: 650000, original: 800000, rating: "4.9", ratingsCount: 210, sales: 350, image: P(39891607), desc: "جفت کفش نمدی دکوری با توری و گل‌های دست‌دوز؛ برای آویختن روی در و دیوار و درخت نوروز.", specs: { "جنس": "نمد و توری", "ابعاد": "۱۲×۱۵ سانتی‌متر", "روش ساخت": "نمدمالی و گلدوزی دستی", "محل ساخت": "شیراز" } },
  { name: "لوستر موزائیک شیشه‌ای ۹ تایی دست‌ساز", slug: "cheraghchi-mosaic-chandelier", shop: "cheraghchi-lighting", cat: "lighting", price: 18500000, original: 21000000, rating: "5.0", ratingsCount: 38, sales: 14, image: P(14779248), desc: "لوستر ۹ شعله با شیشه‌های موزائیک رنگی روی بدنه برنجی؛ نصب آسان با یراق کامل و ضمانت ۱ ساله کارگاه.", specs: { "جنس": "برنج و شیشه موزائیک", "تعداد شعله": "۹", "ابعاد": "قطر ۷۵ × ارتفاع ۶۰ سانتی‌متر", "محل ساخت": "اصفهان" }, featured: true },
  { name: "آباژور موزائیک شیشه‌ای کنار مبلی", slug: "cheraghchi-mosaic-table-lamp", shop: "cheraghchi-lighting", cat: "lighting", price: 7800000, original: 8900000, rating: "4.8", ratingsCount: 87, sales: 42, image: P(16771766), desc: "آباژور رومیزی با شیشه‌های موزائیک چندرنگ و سرپیچ E27؛ نور گرم و دلنشین برای اتاق نشیمن.", specs: { "جنس": "شیشه موزائیک و فلز", "ارتفاع": "۴۵ سانتی‌متر", "سرپیچ": "E27 — لامپ LED شامل نیست", "محل ساخت": "اصفهان" } },
  { name: "سری ۳ فانوس موزائیک شیشه‌ای رنگارنگ", slug: "cheraghchi-mosaic-trio", shop: "cheraghchi-lighting", cat: "lighting", price: 9600000, original: 10800000, rating: "4.7", ratingsCount: 64, sales: 29, image: P(32980208), desc: "سه فانوس موزائیک در اندازه‌های کوچک، متوسط و بزرگ؛ برای گوشه نشیمن، آویز حیاط یا دکوراسیون تالار.", specs: { "جنس": "شیشه موزائیک و فلز", "تعداد": "۳ فانوس (۲۰/۳۰/۴۰ سانتی‌متر)", "روش ساخت": "موزائیک‌کاری دستی", "محل ساخت": "اصفهان" } },
  { name: "فانوس مراکشی شیشه رنگی ۵۰ سانتی", slug: "cheraghchi-moroccan-lantern", shop: "cheraghchi-lighting", cat: "lighting", price: 5400000, original: 6200000, rating: "4.9", ratingsCount: 121, sales: 73, image: P(40675534), desc: "فانوس ایستاده با شیشه‌های رنگی مراکشی و اسکلت فلزی دست‌ساز؛ فضایی افسانه‌ای برای حیاط و تراس.", specs: { "جنس": "شیشه رنگی و آهن", "ارتفاع": "۵۰ سانتی‌متر", "کاربرد": "آویز یا رومیزی", "محل ساخت": "اصفهان" }, featured: true },
  { name: "فانوس سبز شیشه‌ای عتیقه‌نما ۴۰ سانتی", slug: "cheraghchi-green-lantern", shop: "cheraghchi-lighting", cat: "lighting", price: 4300000, original: 4950000, rating: "4.6", ratingsCount: 92, sales: 61, image: P(18354698), desc: "فانوس سبز شیشه‌ای با پرداخت عتيقه‌نما؛ مناسب بالکن، حیاط و چیدمان سبک وینتیج.", specs: { "جنس": "شیشه و فلز پتینه‌کاری شده", "ارتفاع": "۴۰ سانتی‌متر", "کاربرد": "آویز و رومیزی", "محل ساخت": "اصفهان" } },
  { name: "آویز موزائیک دست‌ساز طرح سلجوقی", slug: "cheraghchi-seljuq-pendant", shop: "cheraghchi-lighting", cat: "lighting", price: 6700000, original: 7600000, rating: "4.8", ratingsCount: 77, sales: 38, image: P(11594900), desc: "آویز سقفی تک‌شعله با موزائیک‌های شیشه‌ای طرح سلجوقی؛ برای بالای میز غذاخوری یا تخت.", specs: { "جنس": "شیشه موزائیک و برنج", "تعداد شعله": "۱", "کاربرد": "آویز سقفی", "محل ساخت": "اصفهان" } },
  { name: "لوستر برنجی ۶ پارچه با شیشه رنگی کارگاه", slug: "cheraghchi-brass-chandelier", shop: "cheraghchi-lighting", cat: "lighting", price: 12400000, original: 14000000, rating: "4.9", ratingsCount: 41, sales: 19, image: P(36389229), desc: "چلچراغ ۶ شعله با بدنه برنجی و حباب‌های شیشه رنگی؛ ساخته دست استاد چراغچی در اصفهان.", specs: { "جنس": "برنج و شیشه رنگی", "تعداد شعله": "۶", "ابعاد": "قطر ۶۰ سانتی‌متر", "محل ساخت": "اصفهان" } },
];

export const STATIC_PRODUCTS: StaticProduct[] = rawProducts.map((p, idx) => {
  const shop = shopBySlug[p.shop];
  const cat = catBySlug[p.cat];
  return {
    id: idx + 1,
    name: p.name,
    slug: p.slug,
    image: p.image,
    price: p.price,
    originalPrice: p.original ?? p.price,
    stock: 4 + ((idx * 5) % 15),
    rating: p.rating,
    ratingsCount: p.ratingsCount,
    salesCount: p.sales,
    isFeatured: !!p.featured,
    createdAt: new Date(Date.UTC(2026, 9, 1 + (idx % 28))),
    shopId: shop.id,
    shopName: shop.name,
    shopSlug: shop.slug,
    shopCity: shop.city,
    shopVerified: shop.verified,
    shopAvatarColor: shop.avatarColor,
    categoryName: cat.name,
    categorySlug: cat.slug,
    categoryId: cat.id,
    description: p.desc,
    specs: p.specs,
  };
});

const productIdBySlug = Object.fromEntries(STATIC_PRODUCTS.map((p) => [p.slug, p.id]));

const rawComments: Array<{ product: string; user: string; rating: number; text: string; likes: number }> = [
  { product: "laljin-turquoise-vase", user: "سارا احمدی", rating: 5, text: "گلدان فوق‌العاده زیباست؛ لعابش در نور برق می‌زند و دقیقاً مثل عکس است. ممنون از گالری لالجین.", likes: 24 },
  { product: "laljin-turquoise-vase", user: "رضا کریمی", rating: 5, text: "بسته‌بندی خیلی مطمئن بود و سریع رسید. حتماً دوباره خرید می‌کنم.", likes: 11 },
  { product: "kordestan-arya-kilim", user: "مریم صادقی", rating: 5, text: "رنگ‌ها دقیقاً مثل تصاویر است؛ بافتش خیلی لطیف‌تر از چیزی بود که انتظار داشتم.", likes: 18 },
  { product: "baluch-batteh-joqeh-sofreh", user: "نیلوفر نوری", rating: 5, text: "سفره‌ی سوزن‌دوزی شاهکار است؛ مهمان‌ها همه تعجب کردند. هنر واقعاً زنده است.", likes: 27 },
  { product: "mizan-desert-shoulder-bag", user: "علی محمدی", rating: 4, text: "کیف خیلی باکیفیت و دوخت‌ها تمیز است. رنگش کمی تیره‌تر از عکس بود ولی راضی‌ام.", likes: 9 },
  { product: "negarestan-tulip-field", user: "آرمان حقیقی", rating: 5, text: "تابلو در قالبی بسیار تمیز رسید؛ گواهی امضاشده تابلو حس اصل‌بودن می‌دهد. ارزشش را داشت.", likes: 15 },
  { product: "firouzeh-necklace-silver", user: "زهرا مرادی", rating: 5, text: "فیروزه‌اش واقعاً آبی نیشابوری است؛ گواهی سنگ اصل هم داخل جعبه بود.", likes: 22 },
  { product: "khatam-eslimi-frame", user: "حسین شریفی", rating: 5, text: "قاب خاتم از نزدیک باورنکردنی است؛ میلیون‌ها قطعه ریز! اثر نادری است.", likes: 19 },
  { product: "ghalamzani-hunting-plate", user: "کیانوش رستمی", rating: 5, text: "قلم‌زنی ریز و دقیق؛ هم به‌عنوان دکور هم برای سرو میوه عالی است.", likes: 13 },
  { product: "shiraz-narangestan-tapestry", user: "فائزه رحیمی", rating: 5, text: "بافت قالیچه فوق‌العاده لطیف است؛ هدیه تولد همسرم بود و عاشق شد.", likes: 16 },
  { product: "laljin-coffee-cups", user: "مهدی توکلی", rating: 4, text: "لیوان‌ها قشنگ و خوش‌دست هستند؛ رنگ‌ها کمی با هم فرق دارند که خب طبیعی است.", likes: 7 },
  { product: "mizan-moroccan-tote", user: "سارا احمدی", rating: 5, text: "جادار و خیلی شیک؛ چرم طبیعی بعد از چند هفته خیلی بهتر می‌شود.", likes: 12 },
  { product: "taranj-batteh-shawl", user: "لیلا صادقی", rating: 5, text: "شال فوق‌العاده‌ایه؛ طرح‌ها دقیق و رنگ‌ها زنده هستن. ارزشش رو داشت.", likes: 17 },
  { product: "taranj-shahabbasi-runner", user: "رضا موسوی", rating: 5, text: "رانر روی میز پذیرایی خیلی خودنمایی می‌کنه؛ کیفیت چاپ بلاک عالی بود.", likes: 9 },
  { product: "nemadineh-ghashghai-slipper", user: "مریم کاظمی", rating: 5, text: "پاپوش‌ها گرم و نرم هستن و زیره‌شون نمی‌لغزه؛ هدیه مادرم بود عاشقش شد.", likes: 21 },
  { product: "nemadineh-blue-bag", user: "نازنین شریفی", rating: 5, text: "کیف نمدی خیلی خاصه؛ همه ازم می‌پرسن از کجا خریدم. ممنون از نمدینه.", likes: 14 },
  { product: "cheraghchi-mosaic-chandelier", user: "آرش بهرامی", rating: 5, text: "لوستر ۹ شعله‌ای فوق‌العاده زیباست؛ نور گرم و فضای خانه عوض شده. نصب هم آسان بود.", likes: 26 },
  { product: "cheraghchi-moroccan-lantern", user: "سپیده نجفی", rating: 5, text: "فانوس واقعاً مثل عکس است؛ شیشه‌ها رنگارنگ و خوش‌ساخت. حیاط رو رویایی کرده.", likes: 18 },
];

export const STATIC_COMMENTS: StaticComment[] = rawComments.map((c, idx) => ({
  id: idx + 1,
  productId: productIdBySlug[c.product],
  userName: c.user,
  rating: c.rating,
  text: c.text,
  likes: c.likes,
  dislikes: Math.floor(c.likes / 5),
  createdAt: new Date(Date.UTC(2026, 9, 10 + (idx % 18))),
}));

export const STATIC_PROMOS = [
  { code: "HONAR10", percent: 10, maxDiscount: 500000 },
  { code: "WELCOME15", percent: 15, maxDiscount: 1000000 },
  { code: "HANDMADE25", percent: 25, maxDiscount: 2000000 },
  { code: "DIGI20", percent: 20, maxDiscount: 1500000 },
  { code: "WELCOME", percent: 15, maxDiscount: 1000000 },
  { code: "SUPER50", percent: 50, maxDiscount: 2500000 },
];

export function staticValidatePromo(code: string) {
  const norm = code.trim().toUpperCase();
  return STATIC_PROMOS.find((p) => p.code === norm) ?? null;
}

export function staticQueryProducts(p: CatalogParams): { products: StaticProduct[]; total: number } {
  let rows = [...STATIC_PRODUCTS];

  if (p.q?.trim()) {
    const q = p.q.trim().toLowerCase();
    rows = rows.filter(
      (r) => r.name.toLowerCase().includes(q) || r.shopName.toLowerCase().includes(q)
    );
  }
  if (p.category) {
    rows = rows.filter((r) => r.categorySlug === p.category);
  }
  if (p.shop) {
    const slugs = p.shop.split(",").map((s) => s.trim()).filter(Boolean);
    if (slugs.length) rows = rows.filter((r) => slugs.includes(r.shopSlug));
  }
  if (p.featured) {
    rows = rows.filter((r) => r.isFeatured);
  }
  if (p.min !== undefined) {
    rows = rows.filter((r) => r.price >= p.min!);
  }
  if (p.max !== undefined) {
    rows = rows.filter((r) => r.price <= p.max!);
  }

  switch (p.sort) {
    case "price_asc":
      rows.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      rows.sort((a, b) => b.price - a.price);
      break;
    case "sales":
      rows.sort((a, b) => b.salesCount - a.salesCount);
      break;
    case "rating":
      rows.sort((a, b) => Number(b.rating) - Number(a.rating));
      break;
    case "newest":
      rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    case "discount":
      rows.sort((a, b) => {
        const da = a.originalPrice > 0 ? 1 - a.price / a.originalPrice : 0;
        const db = b.originalPrice > 0 ? 1 - b.price / b.originalPrice : 0;
        return db - da;
      });
      break;
    default:
      rows.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.salesCount - a.salesCount);
      break;
  }

  const total = rows.length;
  const limit = Math.min(Math.max(p.limit ?? 12, 1), 48);
  const offset = Math.max(p.offset ?? 0, 0);
  return { products: rows.slice(offset, offset + limit), total };
}

export function staticGetProductBySlug(slug: string): StaticProduct | null {
  return STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function staticGetCategoryBySlug(slug: string): StaticCategory | null {
  return STATIC_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function staticGetShopBySlug(slug: string): StaticShop | null {
  return STATIC_SHOPS.find((s) => s.slug === slug) ?? null;
}

export function staticGetCommentsByProductId(productId: number): StaticComment[] {
  return STATIC_COMMENTS.filter((c) => c.productId === productId).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function staticGetShopsWithStats() {
  return STATIC_SHOPS.map((shop) => {
    const prods = STATIC_PRODUCTS.filter((p) => p.shopId === shop.id);
    const salesCount = prods.reduce((acc, p) => acc + p.salesCount, 0);
    return {
      ...shop,
      productsCount: prods.length,
      salesCount,
    };
  }).sort((a, b) => Number(b.verified) - Number(a.verified) || b.salesCount - a.salesCount);
}
