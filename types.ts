
export enum CommodityCategory {
  AGRICULTURAL = 'Agricultural',
  ENERGY = 'Energy',
  METALS = 'Metals',
  LIVESTOCK = 'Livestock',
  SOFTS = 'Softs'
}

export interface Commodity {
  id: string;
  name: string;
  category: CommodityCategory;
  symbol: string;
  exchange: string;
  paperPrice: number;
  physicalPrice: number;
  paperVolume: number;
  physicalSupply: number;
  leverageRatio: number;
  premium: number;
}

export interface AuditReport {
  timestamp: string;
  commodity: string;
  summary: string;
  metrics: {
    paperToPhysicalRatio: number;
    rehypothecationIndex: number;
    anomalyDetected: boolean;
    manipulationRisk: 'Low' | 'Medium' | 'High' | 'Extreme';
  };
  recommendations: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
