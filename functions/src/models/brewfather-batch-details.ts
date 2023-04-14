export interface BrewfatherBatchDetails {
  batchNo: number;
  hideBatchEvents: boolean;
  fermentationStartDate: number;
  brewDate: number;
  name: string;
  _archived: boolean;
  _id: string;
  brewer: string;
  batchFermentablesLocal: any[];
  batchYeastsLocal: any[];
  boilSteps: BoilStep[];
  _init: boolean;
  hidden: boolean;
  batchMiscsLocal: BatchMiscsLocal[];
  estimatedColor: number;
  batchHops: BatchHop[];
  batchYeasts: BatchYeast[];
  measuredConversionEfficiency: any;
  measurements: any[];
  cost: Cost;
  _type: string;
  batchHopsLocal: any[];
  brewControllerEnabled: boolean;
  boilStepsCount: number;
  fermentationControllerEnabled: boolean;
  batchFermentables: BatchFermentable[];
  _created: Timestamp;
  recipe: Recipe;
  mashStepsCount: number;
  measuredPreBoilGravity?: number;
  estimatedIbu: number;
  measuredMashEfficiency: number;
  batchMiscs: BatchMisc[];
  batchNotes?: string;
  hideBrewSheet?: boolean;
  tasteRating?: number;
  measuredKettleEfficiency: number;
  measuredPostBoilGravity?: number;
  estimatedOg: number;
  measuredAbv: number;
  estimatedRbRatio: number;
  estimatedTotalGravity: number;
  measuredAttenuation: number;
  estimatedFg: number;
  measuredEfficiency: number;
  estimatedBuGuRatio: number;
  measuredOg: number;
  devices: Devices;
  primingSugarEquiv?: number;
  carbonationType: string;
  carbonationForce?: number;
  bottlingDate: number;
  bottlingDateSet?: boolean;
  measuredFg?: number;
  measuredBatchSize?: number;
  measuredBottlingSize?: number;
  notes: Note[];
  events: Event[];
  status: string;
  _rev: string;
  _timestamp_ms: number;
  _timestamp: Timestamp;
  _version: string;
  measuredFermenterTopUp?: number;
  fermentationStartDateSet?: boolean;
  carbonationTemp?: number;
  measuredOgSet?: boolean;
  measuredBoilSize?: number;
  measuredKettleSize?: number;
  measuredBottlingTemp?: number;
  tasteNotes?: string;
  hideSummary?: boolean;
}

export interface BoilStep {
  name: string;
  time: number;
}

export interface BatchMiscsLocal {
  displayAmount: number;
  unit: string;
  amount: number;
  inventoryUnit: string;
  use: string;
  name: string;
  _id: string;
  notInRecipe: boolean;
  time: number;
  type: string;
  costPerAmount: number;
  inventory: number;
}

export interface BatchHop {
  farnesene?: number;
  notes?: string;
  hidden?: boolean;
  caryophyllene?: number;
  use?: string;
  origin: string;
  _rev?: string;
  type: string;
  inventory: number;
  oil?: number;
  alpha: number;
  costPerAmount: number;
  _timestamp?: Timestamp;
  _version?: string;
  beta?: number;
  amount: number;
  myrcene?: number;
  notInRecipe: boolean;
  _timestamp_ms?: number;
  displayAmount: number;
  cohumulone?: number;
  humulene?: number;
  _created?: Timestamp;
  name: string;
  time?: number;
  _id: string;
  totalCost: number;
  usage?: string;
}

export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface BatchYeast {
  bestFor?: string;
  attenuation: number;
  hidden?: boolean;
  maxTemp: number;
  description: string;
  ageRate?: number;
  maxAttenuation?: number;
  fermentsAll: boolean;
  type: string;
  inventory: number;
  inventoryUnit: string;
  costPerAmount: number;
  cellsPerPkg?: number;
  amount: number;
  notInRecipe: boolean;
  minAttenuation?: number;
  flocculation: string;
  minTemp: number;
  displayAmount: number;
  unit: string;
  form: string;
  laboratory: string;
  name: string;
  _id: string;
  totalCost: number;
  maxAbv?: number;
  productId?: string;
  _rev?: string;
  _timestamp?: Timestamp;
  _version?: string;
  _timestamp_ms?: number;
  _created?: Timestamp;
}

export interface Cost {
  total: number;
  perBottlingLiter: number;
  fermentablesShare: number;
  miscs: number;
  yeasts: number;
  hops: number;
  yeastsShare: number;
  hopsShare: number;
  fermentables: number;
  miscsShare: number;
}

export interface BatchFermentable {
  ibuPerAmount?: number;
  amount: number;
  attenuation?: number;
  color: number;
  origin: string;
  notFermentable?: boolean;
  notInRecipe: boolean;
  inventory: number;
  type: string;
  displayAmount: number;
  supplier: string;
  potentialPercentage: number;
  name: string;
  _id: string;
  costPerAmount: number;
  potential: number;
  totalCost: number;
  hidden?: boolean;
  grainCategory?: string;
  moisture?: number;
  fgdb?: number;
  protein?: number;
  lovibond?: number;
  notes?: string;
  diastaticPower?: number;
  friability?: number;
  coarseFineDiff?: number;
  maxInBatch?: number;
  _rev?: string;
  _timestamp_ms?: number;
  _created?: Timestamp;
  _version?: string;
  _timestamp?: Timestamp;
  acid?: number;
  substitutes?: string;
}

export interface Recipe {
  _init: boolean;
  data: Data;
  sumDryHopPerLiter: number;
  fgEstimated: number;
  yeasts: Yeast[];
  type: string;
  path: string;
  styleAbv: boolean;
  yeastToleranceExceededBy: any;
  avgWeightedHopstandTemp: number;
  diastaticPower: number;
  ogPlato: number;
  _version: string;
  _timestamp: Timestamp;
  boilSize: number;
  preBoilGravity: number;
  fermentables: Fermentable[];
  styleIbu: boolean;
  fermentablesTotalAmount: number;
  efficiency: number;
  buGuRatio: number;
  _public: boolean;
  author: string;
  totalGravity: number;
  equipment: Equipment;
  sumAromaHopPerLiter?: number;
  _timestamp_ms: number;
  water: Water;
  hopStandMinutes: number;
  tags: any;
  carbonation: number;
  carbonationStyle: CarbonationStyle;
  nutrition: Nutrition;
  defaults: Defaults;
  miscs: Misc[];
  name: string;
  fermentation: Fermentation;
  style: Style;
  _id: string;
  firstWortGravity: any;
  fermentableIbu: number;
  primaryTemp: number;
  fg: number;
  attenuation: number;
  hidden: boolean;
  styleRbr: boolean;
  color: number;
  searchTags: any[];
  _rev: string;
  rbRatio: number;
  styleCarb: boolean;
  boilTime: number;
  fgFormula: string;
  _ev: number;
  extraGravity: number;
  styleOg: boolean;
  mashEfficiency: number;
  styleConformity: boolean;
  og: number;
  ibuFormula: string;
  mash: Mash;
  styleBuGu: boolean;
  styleFg: boolean;
  _type: string;
  postBoilGravity: number;
  abv: number;
  hopsTotalAmount: number;
  _created: Timestamp;
  hops: Hop[];
  batchSize: number;
  ibu: number;
  styleColor: boolean;
  public?: boolean;
  yeast: any;
}

export interface Data {
  mashWaterAmount: number;
  otherFermentablesAmount: number;
  mashFermentablesAmount: number;
  otherFermentables: OtherFermentable[];
  strikeTemp?: number;
  mashFermentables: MashFermentable[];
  batchSpargeWaterAmount4?: number;
  batchSpargeWaterAmount3?: number;
  batchSpargeWaterAmount2?: number;
  batchSpargeWaterAmount1?: number;
  totalDiastaticPower: number;
  mashVolume: number;
  hopsAmount: number;
  hltWaterAmount: number;
  totalWaterAmount: number;
  topUpWater: number;
  mashVolumeSurplus: number;
  spargeWaterAmount: number;
  allDiastaticPower: boolean;
}

export interface OtherFermentable {
  attenuation?: number;
  notes: string;
  color: number;
  use?: string;
  grainCategory: any;
  origin: string;
  type: string;
  cgdb: any;
  inventory: any;
  fgdb: any;
  acid?: number;
  fan: any;
  supplier: string;
  percentage: number;
  protein?: number;
  potentialPercentage: number;
  diastaticPower?: number;
  costPerAmount: any;
  potential: number;
  ibuPerAmount?: number;
  amount: number;
  friability: any;
  substitutes: string;
  usedIn: string;
  bestBeforeDate: any;
  notFermentable: boolean;
  moisture?: number;
  coarseFineDiff?: number;
  name: string;
  manufacturingDate: any;
  _id: string;
  time?: number;
  maxInBatch?: number;
  userNotes: string;
  hidden?: boolean;
}

export interface MashFermentable {
  notes: string;
  color: number;
  hidden?: boolean;
  grainCategory: string;
  origin: string;
  cgdb: any;
  type: string;
  inventory?: number;
  fgdb?: number;
  acid?: number;
  fan: any;
  percentage: number;
  supplier: string;
  protein?: number;
  potentialPercentage: number;
  diastaticPower?: number;
  costPerAmount: any;
  potential: number;
  amount: number;
  friability?: number;
  substitutes: string;
  usedIn: string;
  bestBeforeDate: any;
  notFermentable: boolean;
  moisture?: number;
  coarseFineDiff?: number;
  name: string;
  manufacturingDate: any;
  _id: string;
  userNotes: string;
  maxInBatch?: number;
  lovibond?: number;
  attenuation?: number;
  _rev?: string;
  _version?: string;
  _timestamp?: Timestamp;
  ibuPerAmount?: number;
  _timestamp_ms?: number;
  _created?: Timestamp;
}

export interface Yeast {
  amount: number;
  bestFor?: string;
  attenuation: number;
  productId: string;
  hidden?: boolean;
  maxTemp: number;
  bestBeforeDate: any;
  description: string;
  ageRate?: number;
  maxAttenuation?: number;
  fermentsAll: boolean;
  minAttenuation?: number;
  type: string;
  flocculation: string;
  minTemp: number;
  unit: string;
  form: string;
  laboratory: string;
  name: string;
  manufacturingDate: any;
  _id: string;
  cellsPerPkg?: number;
  userNotes: string;
  maxAbv?: number;
}

export interface Fermentable {
  notes: string;
  color: number;
  hidden?: boolean;
  grainCategory?: string;
  origin: string;
  cgdb: any;
  type: string;
  inventory?: number;
  fgdb?: number;
  acid?: number;
  fan: any;
  supplier: string;
  protein?: number;
  percentage: number;
  potentialPercentage: number;
  diastaticPower?: number;
  costPerAmount: any;
  potential: number;
  amount: number;
  friability?: number;
  substitutes: string;
  usedIn: string;
  bestBeforeDate: any;
  notFermentable: boolean;
  moisture?: number;
  coarseFineDiff?: number;
  name: string;
  manufacturingDate: any;
  _id: string;
  maxInBatch?: number;
  userNotes: string;
  lovibond?: number;
  attenuation?: number;
  _rev?: string;
  _timestamp?: Timestamp;
  _version?: string;
  ibuPerAmount?: number;
  _timestamp_ms?: number;
  _created?: Timestamp;
  use?: string;
  time?: number;
}

export interface Equipment {
  mashWaterVolumeLimitEnabled?: boolean;
  waterCalculation: string;
  efficiencyType: string;
  hidden: boolean;
  fermenterVolumeBeforeTopUp?: number;
  fermenterLossEstimate: number;
  calcStrikeWaterTemperature?: boolean;
  _rev?: string;
  _meta?: Meta;
  hopstandTemperature: number;
  hopUtilization: number;
  grainAbsorptionRate: number;
  spargeWaterReminderEnabled?: boolean;
  boilTime: number;
  waterGrainRatio: number;
  mashEfficiency: number;
  evaporationRate: number;
  mashWaterMax?: number;
  mashTunDeadSpace: number;
  _version?: string;
  boilSize: number;
  _timestamp?: Timestamp;
  mashWaterFormula: string;
  fermenterLoss: number;
  efficiency: number;
  spargeWaterOverflow?: string;
  calcAromaHopUtilization: boolean;
  bottlingVolume: number;
  spargeWaterReminderTime?: number;
  calcBoilVolume: boolean;
  _timestamp_ms?: number;
  aromaHopUtilization: number;
  boilOffPerHr: number;
  brewhouseEfficiency: number;
  trubChillerLoss: number;
  postBoilKettleVol: number;
  spargeWaterFormula: string;
  _created?: Timestamp;
  mashTunLoss?: number;
  name: string;
  fermenterVolume: number;
  _id: string;
  batchSize: number;
  calcMashEfficiency: boolean;
  grainTemperature?: number;
  whirlpoolTime?: number;
  ambientTemperature?: number;
}

export interface Meta {
  equalSourceTotal: boolean;
  efficiencyIsCalculated: boolean;
  mashEfficiencyIsCalculated: boolean;
}

export interface Water {
  diluted: any;
  enableAcidAdjustments?: boolean;
  source: Source;
  mashPhDistilled: number;
  mashPh: number;
  total: Total;
  totalTargetDiff?: TotalTargetDiff;
  mash: Mash;
  spargeWaterAmount: any;
  enableSpargeAdjustments: boolean;
  mashWaterAmount: any;
  settings: Settings;
  totalAdjustments: TotalAdjustments;
  spargeTargetDiff?: SpargeTargetDiff;
  spargeAcidPhAdjustment: number;
  sourceTargetDiff?: SourceTargetDiff;
  mashTargetDiff?: MashTargetDiff;
  mashAdjustments: MashAdjustments;
  enableSpargeAcidAdjustments?: boolean;
  meta: Meta;
  sparge: Sparge;
  acidPhAdjustment: number;
  style?: string;
  dilutionPercentage: any;
  spargeAdjustments: SpargeAdjustments;
  target?: Target;
}

export interface Source {
  residualAlkalinityMeqLCalc: number;
  sulfate: number;
  hidden?: boolean;
  _rev?: string;
  type: string;
  residualAlkalinity: number;
  chloride: number;
  bicarbonate: number;
  anions: number;
  _timestamp?: Timestamp;
  _version?: string;
  ionBalanceOff: boolean;
  cations: number;
  calcium: number;
  bicarbonateMeqL: number;
  magnesium: number;
  _timestamp_ms?: number;
  alkalinity: number;
  hardness: number;
  sodium: number;
  _created?: Timestamp;
  soClRatio: number;
  ph?: number;
  name: string;
  ionBalance: number;
  _id: string;
}

export interface Total {
  residualAlkalinityMeqLCalc: number;
  sulfate: number;
  hidden?: boolean;
  _rev?: string;
  type: string;
  residualAlkalinity: number;
  chloride: number;
  bicarbonate: number;
  _version?: string;
  _timestamp?: Timestamp;
  anions: number;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  bicarbonateMeqL: number;
  magnesium: number;
  _timestamp_ms?: number;
  alkalinity: number;
  sodium: number;
  hardness: number;
  _created?: Timestamp;
  ph?: number;
  name: string;
  soClRatio: number;
  ionBalance: number;
  _id: string;
}

export interface TotalTargetDiff {
  residualAlkalinityMeqLCalc: number;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  sulfate: number;
  bicarbonateMeqL: number;
  magnesium: number;
  alkalinity: number;
  sodium: number;
  hardness: number;
  residualAlkalinity: number;
  soClRatio: number;
  chloride: number;
  ionBalance: number;
  bicarbonate: number;
  anions: number;
}

export interface Mash {
  residualAlkalinityMeqLCalc: number;
  sulfate: number;
  hidden?: boolean;
  _rev?: string;
  type: string;
  residualAlkalinity: number;
  chloride: number;
  bicarbonate: number;
  _version?: string;
  anions: number;
  _timestamp?: Timestamp;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  bicarbonateMeqL: number;
  magnesium: number;
  _timestamp_ms?: number;
  alkalinity: number;
  hardness: number;
  sodium: number;
  _created?: Timestamp;
  name: string;
  ph?: number;
  soClRatio: number;
  ionBalance: number;
  _id: string;
  steps: Step[];
}

export interface Settings {
  magnesiumSulfate: MagnesiumSulfate;
  adjustSparge: boolean;
  sodiumBicarbonate: SodiumBicarbonate;
  calciumSulfate: CalciumSulfate;
  calciumChloride: CalciumChloride;
  calciumHydroxide: CalciumHydroxide;
}

export interface MagnesiumSulfate {
  auto: boolean;
  sparge: boolean;
  mash: boolean;
}

export interface SodiumBicarbonate {
  auto: boolean;
  sparge: boolean;
  mash: boolean;
}

export interface CalciumSulfate {
  auto: boolean;
  sparge: boolean;
  mash: boolean;
}

export interface CalciumChloride {
  auto: boolean;
  form: string;
  sparge: boolean;
  mash: boolean;
}

export interface CalciumHydroxide {
  auto: boolean;
  sparge: boolean;
  mash: boolean;
}

export interface TotalAdjustments {
  ltDWB: number;
  sulfate: number;
  calcium: number;
  calciumCarbonate: number;
  magnesium: number;
  sodiumBicarbonate?: number;
  calciumSulfate: number;
  volume: number;
  magnesiumSulfate: number;
  sodium: number;
  sodiumChloride: number;
  acids?: Acid[];
  sodiumMetabisulfitePPM: number;
  ltAMS: number;
  magnesiumChloride: number;
  chloride: number;
  bicarbonate: number;
  sodiumMetabisulfite: number;
  calciumChloride: number;
  calciumHydroxide?: number;
}

export interface Acid {
  amount: number;
  alkalinityMeqL: number;
  concentration: number;
  type: string;
}

export interface SpargeTargetDiff {
  residualAlkalinityMeqLCalc: number;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  sulfate: number;
  bicarbonateMeqL: number;
  magnesium: number;
  alkalinity: number;
  sodium: number;
  hardness: number;
  residualAlkalinity: number;
  soClRatio: number;
  chloride: number;
  ionBalance: number;
  bicarbonate: number;
  anions: number;
}

export interface SourceTargetDiff {
  residualAlkalinityMeqLCalc: number;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  sulfate: number;
  bicarbonateMeqL: number;
  magnesium: number;
  alkalinity: number;
  sodium: number;
  hardness: number;
  residualAlkalinity: number;
  soClRatio: number;
  chloride: number;
  ionBalance: number;
  bicarbonate: number;
  anions: number;
}

export interface MashTargetDiff {
  residualAlkalinityMeqLCalc: number;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  sulfate: number;
  bicarbonateMeqL: number;
  magnesium: number;
  alkalinity: number;
  sodium: number;
  hardness: number;
  residualAlkalinity: number;
  soClRatio: number;
  chloride: number;
  ionBalance: number;
  bicarbonate: number;
  anions: number;
}

export interface MashAdjustments {
  ltDWB: number;
  sulfate: number;
  calcium: number;
  calciumCarbonate: number;
  magnesium: number;
  sodiumBicarbonate?: number;
  calciumSulfate?: number;
  volume: number;
  magnesiumSulfate?: number;
  sodium: number;
  sodiumChloride: number;
  acids: Acid[];
  sodiumMetabisulfitePPM: number;
  ltAMS: number;
  magnesiumChloride: number;
  chloride: number;
  bicarbonate: number;
  sodiumMetabisulfite: number;
  calciumChloride?: number;
  calciumHydroxide?: number;
}

export interface Sparge {
  residualAlkalinityMeqLCalc: number;
  sulfate: number;
  hidden?: boolean;
  _rev?: string;
  type: string;
  residualAlkalinity: number;
  chloride: number;
  bicarbonate: number;
  _version?: string;
  _timestamp?: Timestamp;
  anions: number;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  bicarbonateMeqL: number;
  magnesium: number;
  _timestamp_ms?: number;
  alkalinity: number;
  sodium: number;
  hardness: number;
  _created?: Timestamp;
  ph?: number;
  soClRatio: number;
  name: string;
  ionBalance: number;
  _id: string;
}

export interface SpargeAdjustments {
  volume: number;
  sodium: number;
  acids: Acid[];
  calcium: number;
  sulfate: number;
  sodiumMetabisulfitePPM: number;
  magnesium: number;
  chloride: number;
  bicarbonate: number;
  ltDWB?: number;
  calciumCarbonate?: number;
  sodiumBicarbonate?: number;
  calciumSulfate?: number;
  magnesiumSulfate?: number;
  sodiumChloride?: number;
  magnesiumChloride?: number;
  ltAMS?: number;
  calciumChloride?: number;
  sodiumMetabisulfite?: number;
  calciumHydroxide?: number;
}

export interface Target {
  residualAlkalinityMeqLCalc: number;
  cations: number;
  ionBalanceOff: boolean;
  calcium: number;
  sulfate: number;
  bicarbonateMeqL: number;
  magnesium: number;
  type: string;
  alkalinity: number;
  sodium: number;
  hardness: number;
  residualAlkalinity: number;
  name: string;
  soClRatio: number;
  chloride: number;
  ionBalance: number;
  _id: string;
  bicarbonate: number;
  anions: number;
}

export interface CarbonationStyle {
  carbMax: number;
  carbMin: number;
  name: string;
}

export interface Nutrition {
  carbs: Carbs;
  calories: Calories;
}

export interface Carbs {
  total: number;
}

export interface Calories {
  alcohol: number;
  total: number;
  carbs: number;
  kJ: number;
}

export interface Defaults {
  altitude: string;
  temp: string;
  attenuation: string;
  color: string;
  hop: string;
  weight: string;
  pressure: string;
  carbonation: string;
  volume: string;
  abv: string;
  gravity: string;
  grainColor: string;
  ibu: string;
  preferred: string;
}

export interface Misc {
  amount: number;
  unit: string;
  use: string;
  name: string;
  concentration?: number;
  timeIsDays?: boolean;
  waterAdjustment?: boolean;
  _id: string;
  time?: number;
  type: string;
  notes?: string;
  substitutes?: string;
  useFor?: string;
  bestBeforeDate: any;
  amountPerL: any;
  manufacturingDate: any;
  userNotes?: string;
  hidden?: boolean;
  _rev?: string;
  _timestamp_ms?: number;
  inventory?: number;
  _created?: Timestamp;
  _timestamp?: Timestamp;
  _version?: string;
}

export interface Fermentation {
  name: string;
  _id: string;
  steps: Step[];
  hidden?: boolean;
  _created?: Timestamp;
  _rev?: string;
  _timestamp_ms?: number;
  _version?: string;
  _timestamp?: Timestamp;
}

export interface Step {
  actualTime: number;
  stepTemp: number;
  name: string;
  type: string;
  stepTime: number;
  displayPressure: any;
  ramp: any;
  rampTime: any;
  pressure: any;
  displayStepTemp?: number;
}

export interface Style {
  ibuMax: number;
  styleGuide: string;
  colorMax: number;
  type: string;
  abvMax: number;
  styleLetter: string;
  rbrMin: number;
  categoryNumber: string;
  ogMin: number;
  buGuMin: number;
  lovibondMin: number;
  fgMin: number;
  rbrMax: number;
  ogMax: number;
  carbMin: number;
  lovibondMax: number;
  buGuMax: number;
  colorMin: number;
  fgMax: number;
  carbMax: number;
  name: string;
  _id: string;
  abvMin: number;
  category: string;
  ibuMin: number;
}

export interface Hop {
  farnesene?: number;
  notes: string;
  hidden?: boolean;
  year: any;
  caryophyllene?: number;
  use: string;
  usage: string;
  origin: string;
  _rev?: string;
  type: string;
  inventory?: number;
  actualTime?: number;
  oil?: number;
  alpha: number;
  _timestamp?: Timestamp;
  _version?: string;
  beta?: number;
  temp: any;
  amount: number;
  substitutes: string;
  usedIn: string;
  bestBeforeDate: any;
  myrcene?: number;
  _timestamp_ms?: number;
  cohumulone?: number;
  humulene?: number;
  _created?: Timestamp;
  name: string;
  manufacturingDate: any;
  _id: string;
  time?: number;
  ibu: number;
  userNotes: string;
  hsi: any;
  timeUnit?: string;
  day?: number;
}

export interface BatchMisc {
  amount: number;
  use: string;
  notInRecipe: boolean;
  type: string;
  inventory: number;
  displayAmount: number;
  unit: string;
  inventoryUnit: string;
  name: string;
  timeIsDays: boolean;
  _id: string;
  time?: number;
  costPerAmount: number;
  totalCost: number;
  waterAdjustment?: boolean;
  hidden?: boolean;
  _rev?: string;
  _timestamp_ms?: number;
  _created?: Timestamp;
  _version?: string;
  _timestamp?: Timestamp;
}

export interface Devices {
  smartPid: SmartPid;
  myBrewbot: MyBrewbot;
  stream: Stream;
  brewPiLess: BrewPiLess;
  floatHydrometer: FloatHydrometer;
  raptCloud: RaptCloud;
  iSpindel: ISpindel;
  floatyHydrometer: FloatyHydrometer;
  tilt: Tilt;
  plaatoAirlock: PlaatoAirlock;
  plaatoKeg: PlaatoKeg;
  gfcc: Gfcc;
}

export interface SmartPid {
  brewDeviceId: any;
  items: any[];
  enabled: boolean;
}

export interface MyBrewbot {
  items: any[];
  enabled: boolean;
}

export interface Stream {
  items: any[];
  enabled: boolean;
}

export interface BrewPiLess {
  items: any[];
  enabled: boolean;
}

export interface FloatHydrometer {
  items: any[];
  enabled: boolean;
}

export interface RaptCloud {
  items: any[];
  enabled: boolean;
}

export interface ISpindel {
  items: any[];
  enabled: boolean;
}

export interface FloatyHydrometer {
  items: any[];
  enabled: boolean;
}

export interface Tilt {
  mode: string;
  temp: boolean;
  gravity: boolean;
  items: Item[];
  enabled: boolean;
}

export interface Item {
  hidden: boolean;
  series: any;
  name: string;
  lastData: LastData;
  type: string;
  batchId: string;
  enabled: boolean;
  key: string;
  lastLog: number;
  settings: any;
}

export interface LastData {
  temp: number;
  sg: number;
  comment: string;
  id: string;
  time: number;
  type: string;
  status: string;
  timepoint: number;
}

export interface PlaatoAirlock {
  items: any[];
  enabled: boolean;
}

export interface PlaatoKeg {
  items: any[];
  enabled: boolean;
}

export interface Gfcc {
  brewDeviceId: any;
  items: any[];
  enabled: boolean;
}

export interface Note {
  note: string;
  type?: string;
  timestamp: number;
  status: string;
}

export interface Event {
  dayEvent: boolean;
  notifyTime?: number;
  eventText?: string;
  description: string;
  active: boolean;
  descriptionHTML: string;
  time: number;
  eventType: string;
  title: string;
}
