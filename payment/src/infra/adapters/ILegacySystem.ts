export interface ILegacyAdapterParams {
  methodName?: string
  remoteSource?: string
}

export interface ISendLegacyAdapterParams extends ILegacyAdapterParams{
  data: Record<string, any>
}

export interface ILegacySystem {
  sendPaymentData(params: ISendLegacyAdapterParams): Promise<Record<string, any>>;
}
