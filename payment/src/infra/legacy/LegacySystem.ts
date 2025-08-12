import soap from "@/main/lib/mock-soap";

export class LegacySystem {
  protected wsdlUrl: string;
  protected client: any | null = null;

  constructor(wsdlUrl: string) {
    this.wsdlUrl = wsdlUrl;
  }

  protected async initClient() {
    if (!this.client) {
      this.client = await soap.createClientAsync(this.wsdlUrl);
    }
  }

  public async processPayment(payload: Record<string, any>): Promise<any> {
    await this.initClient();
    if (!this.client.ProcessPaymentAsync) {
      throw new Error("ProcessPaymentAsync not present on SOAP client");
    }
    const [result] = await this.client.ProcessPaymentAsync(payload);
    return result;
  }
}
