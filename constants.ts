
import { CommodityCategory, Commodity } from './types';

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@cryptomarketinfo6400',
  discord: 'https://discord.com/@Beatitude',
  x: 'https://x.com/abcaminc',
  github: 'https://github.com/abcaminc',
  instagram: 'https://www.instagram.com/foster_l_ming/'
};

export const DONATION_LINKS = {
  patreon: 'https://www.patreon.com/copaco',
  paypal: 'mailto:foster.ming@gmail.com',
  cashapp: '$FosterMing3509',
  venmo: '@FosterL-Ming',
  btc: '3BLj6mkHkU5kPnicu3ySdX5z4ThHV64uu3',
  usdt: '0x0645e3e2456b8F95A6189607DC283f6860C9EdBD'
};

export const INITIAL_COMMODITIES: Commodity[] = [
  {
    id: 'gold',
    name: 'Gold',
    category: CommodityCategory.METALS,
    symbol: 'GC',
    exchange: 'COMEX/LBMA',
    paperPrice: 2045.50,
    physicalPrice: 2450.00,
    paperVolume: 450000000,
    physicalSupply: 1500000,
    leverageRatio: 300,
    premium: 19.8
  },
  {
    id: 'oil',
    name: 'Crude Oil',
    category: CommodityCategory.ENERGY,
    symbol: 'CL',
    exchange: 'NYMEX',
    paperPrice: 78.40,
    physicalPrice: 82.10,
    paperVolume: 12000000,
    physicalSupply: 1000000,
    leverageRatio: 12,
    premium: 4.7
  },
  {
    id: 'corn',
    name: 'Corn',
    category: CommodityCategory.AGRICULTURAL,
    symbol: 'ZC',
    exchange: 'CBOT',
    paperPrice: 4.50,
    physicalPrice: 4.85,
    paperVolume: 8000000,
    physicalSupply: 2000000,
    leverageRatio: 4,
    premium: 7.8
  }
];
