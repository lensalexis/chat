// src/content/services.ts
export type ServiceCategory = 'Websites' | 'Marketing' | 'SEO' | 'Design';

export type Service = {
  slug: string;
  category: ServiceCategory;
  title: string;
  tagline: string;          // the bold subhead line
  intro: string;            // opening paragraph
  perfectFor: string[];
  deliverables: string[];   // "What you'll get"
  price: string;            // e.g., "$497"
  timeline: string;         // e.g., "3–5 days"
};

export const services: Service[] = [
  // Websites
  {
    slug: 'landing-page-that-converts',
    category: 'Websites',
    title: 'Landing Page That Converts',
    tagline: 'Turn clicks into customers with a page built to sell',
    intro:
      `Tired of sending traffic to your homepage and watching visitors bounce? Your generic website has too many distractions. We build focused landing pages that do one thing exceptionally well: convert visitors into leads and sales.`,
    perfectFor: [
      'Running Facebook or Google ads',
      'Promoting a specific product or event',
      'Capturing leads from your marketing campaigns',
    ],
    deliverables: [
      'A conversion-focused single page designed around your specific goal',
      'Mobile-responsive design that looks great everywhere',
      'Contact form that sends leads straight to your inbox',
      'Fast turnaround to meet your campaign deadlines',
    ],
    price: '$497',
    timeline: '3–5 days',
  },
  {
    slug: 'product-page-that-sells',
    category: 'Websites',
    title: 'Product Page That Sells',
    tagline: 'Transform browsers into buyers with pages that build trust and drive sales',
    intro:
      `Your product deserves better than a basic template. We design high-converting product pages that act like your best salesperson—building trust, answering questions, and making that "Add to Cart" button irresistible.`,
    perfectFor: [
      'E-commerce stores looking to boost sales',
      'Launching new products',
      'Improving performance of existing items',
    ],
    deliverables: [
      'Professional product page template you can reuse',
      'Seamless payment integration (Stripe, PayPal, etc.)',
      'Beautiful image gallery to showcase your product',
      'Strategic layout designed to increase conversions',
    ],
    price: '$697',
    timeline: '5–7 days',
  },
  {
    slug: 'website-speed-boost',
    category: 'Websites',
    title: 'Website Speed Boost',
    tagline: 'Make your slow website lightning fast (your visitors will thank you)',
    intro:
      `Is your website slower than dial-up internet? Even a 1-second delay kills conversions and hurts your Google rankings. We’ll supercharge your site’s speed so visitors stick around and search engines love you.`,
    perfectFor: [
      'Websites with high bounce rates',
      'Stores losing sales due to slow loading',
      'Anyone wanting better Google rankings',
    ],
    deliverables: [
      'Image optimization without quality loss',
      'Caching setup for instant repeat visits',
      'Code cleanup and optimization',
      'Before/after performance report showing your improvements',
    ],
    price: '$297',
    timeline: '2–3 days',
  },
  {
    slug: 'complete-website-package',
    category: 'Websites',
    title: 'Complete Website Package',
    tagline: 'Your professional online presence, built from scratch',
    intro:
      `Need a real website, not just a basic template? We build beautiful, professional 5-page websites that establish credibility and serve as the foundation of your online presence. No cookie-cutter designs here.`,
    perfectFor: [
      'New businesses needing their first website',
      'Companies ready for a complete redesign',
      'Anyone who wants to look professional online',
    ],
    deliverables: [
      '5 custom-designed pages (Home, About, Services, Blog, Contact)',
      'Easy-to-update content management system',
      'Mobile-responsive design',
      'Basic SEO foundation',
      'Training on managing your new site',
    ],
    price: '$1,997',
    timeline: '2–3 weeks',
  },

  // Marketing
  {
    slug: 'social-media-content-pack',
    category: 'Marketing',
    title: 'Social Media Content Pack',
    tagline: 'Stop stressing about what to post — we’ve got you covered',
    intro:
      `Tired of staring at a blank screen wondering what to post? We create a month’s worth of professional, branded social media content so you can focus on running your business instead of being a content creator.`,
    perfectFor: [
      'Busy business owners',
      'Companies wanting consistent social presence',
      'Anyone who hates creating social content',
    ],
    deliverables: [
      '10 custom-designed, branded graphics',
      'Engaging captions for every post',
      'Strategic hashtag research for maximum reach',
      'Everything organized and ready to post',
    ],
    price: '$197',
    timeline: '3–5 days',
  },
  {
    slug: 'email-campaign-setup',
    category: 'Marketing',
    title: 'Email Campaign Setup',
    tagline: 'Launch professional email campaigns that actually get opened',
    intro:
      `Ready to connect with your customers but don’t know where to start with email marketing? We handle the complete setup—from beautiful templates to performance tracking—so you can start building relationships and driving sales.`,
    perfectFor: [
      'Businesses with email lists they’re not using',
      'Companies launching promotions or new products',
      'Anyone wanting to improve customer relationships',
    ],
    deliverables: [
      'Custom email template matching your brand',
      'List import and organization',
      'Campaign launch at optimal timing',
      'Performance report showing your results',
    ],
    price: '$397',
    timeline: '5–7 days',
  },
  {
    slug: 'ppc-campaign-launch',
    category: 'Marketing',
    title: 'PPC Campaign Launch',
    tagline: 'Get instant traffic while your competition waits for SEO',
    intro:
      `Need customers now, not in 6 months? We set up and launch your first Google Ads campaign using proven strategies that maximize your budget and minimize waste. Start getting targeted traffic today.`,
    perfectFor: [
      'Businesses needing immediate results',
      'Testing new products or markets',
      'Companies with advertising budget ready to deploy',
    ],
    deliverables: [
      'Complete ad campaign setup',
      'Keyword research for high-intent searches',
      'Compelling ad copy that gets clicks',
      'Budget optimization for maximum ROI',
    ],
    price: '$597',
    timeline: '7–10 days',
  },
  {
    slug: 'complete-marketing-strategy',
    category: 'Marketing',
    title: 'Complete Marketing Strategy',
    tagline: 'Stop guessing — get a clear roadmap for growth',
    intro:
      `Tired of random marketing tactics that don’t connect? We create a comprehensive 3-month marketing strategy that tells you exactly what to do, when to do it, and how to measure success.`,
    perfectFor: [
      'Businesses ready to scale systematically',
      'Companies tired of inconsistent marketing',
      'Anyone wanting a data-driven approach',
    ],
    deliverables: [
      'Detailed ideal customer analysis',
      'Strategic channel recommendations',
      '3-month content calendar',
      'Clear KPIs and success metrics',
    ],
    price: '$1,497',
    timeline: '2–3 weeks',
  },

  // SEO
  {
    slug: 'seo-health-check',
    category: 'SEO',
    title: 'SEO Health Check',
    tagline: 'Find out what’s secretly killing your Google rankings',
    intro:
      `Wonder why your competitors show up on Google but you don’t? Our comprehensive SEO audit reveals the hidden issues holding your website back and gives you a clear action plan to fix them.`,
    perfectFor: [
      'Websites not getting organic traffic',
      'Businesses before investing in SEO',
      'Anyone curious about their site’s Google performance',
    ],
    deliverables: [
      'Complete technical SEO analysis',
      'Content and keyword optimization review',
      'Backlink quality assessment',
      'Prioritized action plan with clear next steps',
    ],
    price: '$497',
    timeline: '5–7 days',
  },
  {
    slug: 'keyword-research-pack',
    category: 'SEO',
    title: 'Keyword Research Pack',
    tagline: 'Target the exact words your customers are searching for',
    intro:
      `Stop guessing what your customers want. We research and identify the 50 most valuable keywords for your business—the ones that bring high-intent visitors ready to buy what you’re selling.`,
    perfectFor: [
      'Creating targeted content',
      'Optimizing website pages',
      'Running effective ad campaigns',
    ],
    deliverables: [
      '50 high-value target keywords',
      'Competitor keyword analysis',
      'Search intent categorization',
      'Volume and difficulty scores for each keyword',
    ],
    price: '$297',
    timeline: '3–5 days',
  },
  {
    slug: 'local-seo-setup',
    category: 'SEO',
    title: 'Local SEO Setup',
    tagline: 'Dominate “near me” searches in your area',
    intro:
      `Are local customers finding your competitors instead of you? We optimize your online presence to ensure you show up when people in your area search for what you offer on Google and Google Maps.`,
    perfectFor: [
      'Local businesses and service providers',
      'Restaurants, dentists, contractors, retail stores',
      'Anyone serving customers in specific geographic areas',
    ],
    deliverables: [
      'Complete Google Business Profile optimization',
      'Top 10 local directory listings',
      'Consistent business information across the web',
      'Increased visibility in local searches',
    ],
    price: '$397',
    timeline: '5–7 days',
  },
  {
    slug: 'on-page-seo-optimization',
    category: 'SEO',
    title: 'On-Page SEO Optimization',
    tagline: 'Make Google understand what your pages are actually about',
    intro:
      `Got great content that’s not ranking? We implement proven on-page SEO techniques on your 5 most important pages, helping Google understand and rank your content for the keywords that matter most.`,
    perfectFor: [
      'Websites with good content but poor rankings',
      'Businesses wanting to optimize key service pages',
      'Anyone needing technical SEO implementation',
    ],
    deliverables: [
      'Optimized titles and descriptions for 5 pages',
      'Proper header structure implementation',
      'Image optimization with alt text',
      'Strategic internal linking setup',
    ],
    price: '$597',
    timeline: '7–10 days',
  },

  // Design
  {
    slug: 'professional-logo-design',
    category: 'Design',
    title: 'Professional Logo Design',
    tagline: 'A memorable logo that makes your business unforgettable',
    intro:
      `Your logo is often the first thing customers see. Make it count. We design professional, timeless logos that represent your brand perfectly and help you stand out from the competition.`,
    perfectFor: [
      'New businesses needing brand identity',
      'Companies with outdated logos',
      'Anyone wanting to look more professional',
    ],
    deliverables: [
      '3 unique logo concepts to choose from',
      '2 rounds of revisions',
      'Complete file package for web and print',
      'Vector files for unlimited scaling',
    ],
    price: '$697',
    timeline: '5–7 days',
  },
  {
    slug: 'social-media-banner-design',
    category: 'Design',
    title: 'Social Media Banner Design',
    tagline: 'Make a powerful first impression on social media',
    intro:
      `Your social media profile is your digital storefront. We design eye-catching banners that stop the scroll and build instant credibility.`,
    perfectFor: [
      'Businesses wanting professional social presence',
      'Personal brands building authority',
      'Anyone with outdated social media visuals',
    ],
    deliverables: [
      'Custom banner for your chosen platform',
      'Properly sized profile picture',
      'Source files for future updates',
      'Platform-specific optimization',
    ],
    price: '$197',
    timeline: '2–3 days',
  },
  {
    slug: 'business-card-design',
    category: 'Design',
    title: 'Business Card Design',
    tagline: 'Business cards people actually want to keep',
    intro:
      `In our digital world, a well-designed business card stands out even more. We create memorable cards that make lasting impressions.`,
    perfectFor: [
      'Professionals attending networking events',
      'Business owners meeting potential clients',
      'Anyone wanting to make a great first impression',
    ],
    deliverables: [
      'Custom double-sided design',
      'Print-ready files for any printer',
      '2 rounds of revisions',
      'Professional layout and typography',
    ],
    price: '$147',
    timeline: '2–3 days',
  },
  {
    slug: 'brand-style-guide',
    category: 'Design',
    title: 'Brand Style Guide',
    tagline: 'Keep your brand looking consistent everywhere',
    intro:
      `Tired of your brand looking different everywhere? We create a simple, one-page brand guide that ensures your logo, colors, and fonts are used correctly every time.`,
    perfectFor: [
      'Businesses working with multiple people',
      'Companies wanting consistent branding',
      'Anyone planning to scale their marketing',
    ],
    deliverables: [
      'Clear logo usage guidelines',
      'Official color palette with exact codes',
      'Typography rules and specifications',
      'Professional one-page reference guide',
    ],
    price: '$297',
    timeline: '3–5 days',
  },
];