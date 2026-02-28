export enum SubscriptionPlan {
  FREE = 'free',
  PREMIUM = 'premium',
}
export interface ISubscription {
  plan: SubscriptionPlan;

  // stripeCustomerId stripeSubscriptionId
  customerId: string;
  subscriptionId: string;
}
