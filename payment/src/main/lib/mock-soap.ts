import logger from "@/configs/logger";
import { Readable } from "stream";

interface TPaymentData {
  amount: string
  paymentId: number
}

// Mock da configuração do Soap
const MOCKED_SOAP_FACTORY = {
  'http://www.micropay.net/webservices/payments.asmx?wsdl': (soapClient: any) => {
    soapClient.ProcessPaymentAsync = (data: TPaymentData): any[] => {
      logger.info(`Payment processed ${data.paymentId}: ${data.amount}`);
      return ['Done'];
    }

    soapClient.GetPaymentsAsync = (data: any): TPaymentData[] => {
      const payment = {paymentId: 1, amount: '1.00'};
      logger.info(`Payment data received ${payment.paymentId}: ${payment.amount}`);
      return [payment];
    }
  }
}

export default class MockSoap {
  wsdlUrl: string;

  private constructor(wsdlUrl: string) {
    this.wsdlUrl = wsdlUrl;
  }

  public static createClientAsync(wsdlUrl: string) {
    const soapClient = new MockSoap(wsdlUrl);
    MOCKED_SOAP_FACTORY[wsdlUrl](soapClient); //Mock das funções do webservice
  }
}