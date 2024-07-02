export interface FeatureKey {
  requiresActivation?: boolean;
  defaultGroups?: string[];
  actions?: {
    [key: string]: number;
  };
}

export interface FeatureDetail {
  [key: number]: FeatureKey;
}

export class FeatureKeys {
  // Max: 7
  public static readonly MyAppPosts = 1;
  public static readonly MyAppPostsUnlimited = 2;
  public static readonly MyAppFeatures = 3;
  public static readonly MyAppSettings = 4;
  public static readonly MyAppDocs = 5;
  public static readonly MyAppAuth = 6;
  public static readonly MyAdminFeatures = 7;
}
const features: FeatureDetail = {};
features[FeatureKeys.MyAppPosts] =          { actions: { read: 1, refresh: 2, create: 3, update: 4, delete: 5 } };
features[FeatureKeys.MyAppPostsUnlimited] = { actions: { read: 1, refresh: 2, create: 3, update: 4, delete: 5 }, defaultGroups: ['licensed'] };
features[FeatureKeys.MyAppFeatures] =       { actions: { read: 1 }};
features[FeatureKeys.MyAppSettings] =       { actions: { read: 1, signOut: 2 }};
features[FeatureKeys.MyAppDocs] =           { actions: { read: 1 }};
features[FeatureKeys.MyAppAuth] =           { actions: { signIn: 1, signOut: 2, signInFailure: 3, passwordReminder: 4, createAccount: 5 }};
features[FeatureKeys.MyAdminFeatures] =     { actions: { read: 1, create: 2, update: 3, delete: 4 }, defaultGroups: ['admin']};

export { features };