import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentInformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card Number
            </label>
            <Input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="0000 0000 0000 0000"
              required
              pattern="[0-9]{16}"
              minLength={16}
              maxLength={16}
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expiration Date
              </label>
              <Input
                id="expDate"
                name="expDate"
                type="text"
                placeholder="MM/YY"
                required
                pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                minLength={4}
                maxLength={5}
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CVC
              </label>
              <Input
                id="cvc"
                name="cvc"
                type="text"
                placeholder="123"
                required
                pattern="[0-9]{3,4}"
                minLength={3}
                maxLength={4}
                disabled
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cardholderName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cardholder Name
            </label>
            <Input
              id="cardholderName"
              name="cardholderName"
              type="text"
              placeholder="John Doe"
              required
              disabled
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
