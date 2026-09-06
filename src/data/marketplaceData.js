// Mock marketplace catalog used for demonstration.
// In production, this data would be retrieved from a backend API.

export const mockMarketplaceProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'The ultimate iPhone with titanium design and pro camera system.',
    brand: 'Apple',
    price: 99900,
    originalPrice: 109900,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    ],
    variants: [
      { id: 'v1', name: 'Color', value: 'Black Titanium', available: true },
      { id: 'v2', name: 'Color', value: 'White Titanium', available: true },
      { id: 'v3', name: 'Color', value: 'Blue Titanium', available: false },
      { id: 'v4', name: 'Storage', value: '128GB', available: true },
      { id: 'v5', name: 'Storage', value: '256GB', available: true },
    ],
    emiPlans: [
      { id: 'e1', months: 3, monthlyAmount: 33300, totalAmount: 99900, interestRate: 0 },
      { id: 'e2', months: 6, monthlyAmount: 16650, totalAmount: 99900, interestRate: 0 },
      { id: 'e3', months: 9, monthlyAmount: 11100, totalAmount: 99900, interestRate: 0 },
      { id: 'e4', months: 12, monthlyAmount: 8325, totalAmount: 99900, interestRate: 0 },
    ],
    features: [
      'A17 Pro chip with 6-core GPU',
      '48MP main camera with 2x Telephoto',
      'Titanium design with Ceramic Shield',
      'Always-On display with ProMotion',
      'USB-C port with USB 3.0 support',
    ],
    inStock: true,
    rating: 4.9,
    reviews: 1250,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Experience the future with Galaxy AI and incredible camera zoom.',
    brand: 'Samsung',
    price: 129999,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',  // ✅ Fixed
    ],
    variants: [
      { id: 'v6', name: 'Color', value: 'Titanium Black', available: true },
      { id: 'v7', name: 'Color', value: 'Titanium Violet', available: true },
      { id: 'v8', name: 'Storage', value: '256GB', available: true },
      { id: 'v9', name: 'Storage', value: '512GB', available: true },
    ],
    emiPlans: [
      { id: 'e5', months: 3, monthlyAmount: 43333, totalAmount: 129999, interestRate: 0 },
      { id: 'e6', months: 6, monthlyAmount: 21667, totalAmount: 129999, interestRate: 0 },
      { id: 'e7', months: 12, monthlyAmount: 10833, totalAmount: 129999, interestRate: 0 },
    ],
    features: [
      'Galaxy AI with Circle to Search',
      '200MP camera with 100x Space Zoom',
      'S Pen included',
      '5000mAh battery with 45W fast charging',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 890,
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation with exceptional sound quality.',
    brand: 'Sony',
    price: 29990,
    originalPrice: 34990,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    ],
    variants: [
      { id: 'v10', name: 'Color', value: 'Black', available: true },
      { id: 'v11', name: 'Color', value: 'Silver', available: true },
    ],
    emiPlans: [
      { id: 'e8', months: 3, monthlyAmount: 9997, totalAmount: 29990, interestRate: 0 },
      { id: 'e9', months: 6, monthlyAmount: 4998, totalAmount: 29990, interestRate: 0 },
    ],
    features: [
      'Industry-leading noise cancellation',
      '30-hour battery life with quick charging',
      'Multi-point connection',
      'Premium soft-fit leather',
    ],
    inStock: true,
    rating: 4.7,
    reviews: 650,
  },
];