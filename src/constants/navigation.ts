export interface NavLink {
  href: string;
  label: string;
  hasDropdown?: boolean;
  mobileOnly?: boolean;
}

export interface ShopCategoryItem {
  href: string;
  label: string;
  searchQuery?: string;
}

export interface ShopCategories {
  category: ShopCategoryItem[];
  shape: ShopCategoryItem[];
  occasion: ShopCategoryItem[];
  color: ShopCategoryItem[];
  length: ShopCategoryItem[];
  texture: ShopCategoryItem[];
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'HOME' },
  { 
    href: '/products', 
    label: 'SHOP',
    hasDropdown: true,
  },
  { href: '/products?category=Sale', label: 'SALE' },
  { href: '/products?category=Designer', label: 'DESIGNER NAILS' },
  { href: '/tutorial', label: 'TUTORIAL' },
  { href: '/blog', label: 'BLOG' },
  { href: '/contact', label: 'CONTACT US' },
  { href: '/profile', label: 'PROFILE', mobileOnly: true },
  { href: '/wishlist', label: 'WISHLIST', mobileOnly: true },
];

export const shopCategories: ShopCategories = {
  category: [
    { href: '/products?category=bestsellers', label: 'Best Sellers', searchQuery: 'best sellers' },
    { href: '/products?search=french nails', label: 'French nails', searchQuery: 'french nails' },
    { href: '/products?category=casual', label: 'Casual Wear Nails', searchQuery: 'casual wear nails' },
    { href: '/products?search=toe nails', label: 'Toe Nails', searchQuery: 'toe nails' },
    { href: '/products?search=ombre nails', label: 'Ombre Nails', searchQuery: 'ombre nails' },
  ],
  shape: [
    { href: '/products?shape=coffin', label: 'Coffin Nails' },
    { href: '/products?shape=stiletto', label: 'Stiletto Nails' },
    { href: '/products?shape=square', label: 'Square Nails' },
    { href: '/products?shape=round', label: 'Round Nails' },
    { href: '/products?shape=almond', label: 'Almond Nails' },
    { href: '/products?shape=ballerina', label: 'Ballerina Nails' },
  ],
  occasion: [
    { href: '/products?occasion=casual', label: 'Casual Nails' },
    { href: '/products?occasion=party', label: 'Party Nails' },
    { href: '/products?occasion=wedding', label: 'Wedding Nails' },
    { href: '/products?occasion=formal', label: 'Formal Nails' },
    { href: '/products?occasion=holiday', label: 'Holiday Nails' },
  ],
  color: [
    { href: '/products?color=pink', label: 'Pink' },
    { href: '/products?color=red', label: 'Red' },
    { href: '/products?color=pastel', label: 'Pastel' },
    { href: '/products?color=gold', label: 'Gold' },
    { href: '/products?color=nude', label: 'Nude' },
    { href: '/products?color=others', label: 'Others' },
  ],
  length: [
    { href: '/products?length=short', label: 'Short Nails' },
    { href: '/products?length=medium', label: 'Medium Nails' },
    { href: '/products?length=long', label: 'Long Nails' },
  ],
  texture: [
    { href: '/products?texture=matte', label: 'Matte Nails' },
    { href: '/products?texture=glossy', label: 'Glossy Nails' },
    { href: '/products?texture=glitter', label: 'Glitter Nails' },
  ],
};

