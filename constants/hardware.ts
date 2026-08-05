export interface HardwareItem {
  key: string;
  title: string;
  description: string;
  href: string;
}

export const HARDWARE_ITEMS: HardwareItem[] = [
  {
    description: "Silver, 16GB RAM, 256GB SSD",
    href: "https://www.apple.com/macbook-air/",
    key: "macbook-air-m3",
    title: "MacBook Air M3",
  },
  {
    description: '27" 2K QHD, 180Hz',
    href: "https://www.samsung.com/in/monitors/gaming/odyssey-g5-g50f-32-inch-180hz-qhd-ls32fg502ewxxl/",
    key: "samsung-monitor",
    title: "Samsung Odyssey G5 Monitor",
  },
  {
    description: "Black, 8/128GB, 5G",
    href: "https://www.cashify.in/buy-refurbished-mobile-phones/renewed-apple-iphone-12-mini/107998",
    key: "iphone-12-mini",
    title: "iPhone 12 Mini",
  },
  {
    description: "Aqua Surge, 8/128GB, 5G",
    href: "https://www.oneplus.in/nord-ce-3-5g",
    key: "one-plus-nord-ce3",
    title: "One Plus Nord CE3",
  },
  {
    description: "4K HDMI, 1xUSB 3.0, 2xUSB 2.0, etc.",
    href: "https://honeywellconnection.com/products/type-c-docking-station-7-in-1",
    key: "honeywell-7-in-1",
    title: "Honeywell 7-in-1 TypeC Docking Station",
  },
];
