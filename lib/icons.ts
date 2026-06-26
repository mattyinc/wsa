import {
  Banana,
  Bird,
  Bitcoin,
  Building2,
  Car,
  Clock,
  Coins,
  DollarSign,
  Egg,
  Factory,
  Fish,
  Footprints,
  Gem,
  Globe,
  Handshake,
  Home,
  Landmark,
  Percent,
  Scale,
  Shirt,
  TrendingUp,
  Users,
  Wheat,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IconEntry = [RegExp, LucideIcon];

export const ICON_MAP: IconEntry[] = [
  // Crypto & digital
  [/\b(bitcoin|crypto|cryptocurrency|blockchain|digital currency)\b/i, Bitcoin],
  [/\b(electricity|energy|power|kilowatt|watt|solar|renewable)\b/i, Zap],
  // Money & finance
  [/\b(u\.?s\.? dollar|dollar bill|greenback)\b/i, DollarSign],
  [/\b(money|cash|dollars?|currency|banknotes?|payments?|pay|purchasing power|fiat|trust)\b/i, DollarSign],
  [/\bcoins?\b/i, Coins],
  [/\b(banks?|banking|loans?|credits?|borrow(?:ing)?|deposits?|mortgage|lend(?:ing)?)\b/i, Building2],
  [/\b(government|taxes?|policy|fiscal|regulation|central bank|federal reserve|fed)\b/i, Landmark],
  [/\binterest(?: rates?)?\b/i, Percent],
  [/\b(inflation|deflation|price level|cpi)\b/i, TrendingUp],
  [/\b(gold|silver|metals?|commodit(?:y|ies)|gems?|jewels?|precious)\b/i, Gem],
  // Food & agriculture
  [/\b(fish(?:ing|es)?|seafood|salmon|tuna|cod)\b/i, Fish],
  [/\b(chickens?|hens?|poultry|roosters?|birds?|ducks?|geese|goose|fowl)\b/i, Bird],
  [/\b(bananas?)\b/i, Banana],
  [/\beggs?\b/i, Egg],
  [/\b(wheat|rice|grains?|bread|flour|crops?|harvest|cereal)\b/i, Wheat],
  // Goods & clothing
  [/\b(shoes?|boots?|footwear|sandals?)\b/i, Footprints],
  [/\b(clothes?|clothing|shirts?|fabric|textiles?|garments?)\b/i, Shirt],
  // Property & transport
  [/\b(houses?|homes?|property|real estate|housing|rent|apartments?|dwelling)\b/i, Home],
  [/\b(cars?|vehicles?|trucks?|automobiles?|transport)\b/i, Car],
  [/\b(global|international|world|foreign|cross-border|trade routes?)\b/i, Globe],
  // Production
  [/\b(factor(?:y|ies)|manufactur(?:e|ing)|production|industr(?:y|ial)|plants?)\b/i, Factory],
  [/\b(tools?|equipment|machinery|repairs?)\b/i, Wrench],
  // People & agreements
  [/\b(agrees?|agreed|agreement|deals?|handshake|contracts?|trades?|exchanges?|barter)\b/i, Handshake],
  [/\b(workers?|employees?|labou?r|wages?|salar(?:y|ies)|people|persons?|consumers?)\b/i, Users],
  // Time & balance
  [/\b(times?|hours?|days?|years?|duration|period|clock)\b/i, Clock],
  [/\b(balance|fairness?|equalit(?:y|ies)|weights?|scales?)\b/i, Scale],
];

export function findIcon(text: string): LucideIcon | null {
  for (const [pattern, Icon] of ICON_MAP) {
    if (pattern.test(text)) return Icon;
  }
  return null;
}
