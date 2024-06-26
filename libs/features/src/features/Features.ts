export interface FeatureKey {
  requiresActivation?: boolean;
  defaultGroups?: string[];
  actions?: {
    [key: string]: number;
  };
}

export interface FeatureDetail {
  [key: string]: FeatureKey;
}

export class FeatureKeys {
  public static readonly MyAppPosts = 'MyApp.Posts';
  public static readonly MyAppPostsUnlimited = 'MyApp.Posts.Unlimited';
  public static readonly MyAppFeatures = 'MyApp.Features';
  public static readonly MyAppSettings = 'MyApp.Settings';
  public static readonly MyAppDocs = 'MyApp.Docs';
  public static readonly MyAppAuth = 'MyApp.Auth';
  public static readonly MyAdminFeatures = 'MyAdmin.Features';
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