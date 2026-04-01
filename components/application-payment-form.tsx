"use client"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

interface ApplicationPaymentFormProps {
  amount: number
  onSuccess: (paymentIntentId: string) => void
}

export default function ApplicationPaymentForm({ amount, onSuccess }: ApplicationPaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setProcessing(true)
    setError("")

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message || "Payment failed")
        setProcessing(false)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSuccess(true)
        setTimeout(() => {
          onSuccess(paymentIntent.id)
        }, 1500)
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment processing failed')
      setProcessing(false)
    }
  }

  if (success) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Payment successful! Submitting your application...
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6" role="form">
      <PaymentElement />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || processing}
        className="w-full bg-amber hover:bg-golden hover:text-slate font-questa py-6 text-lg"
      >
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </>
        ) : (
          `Pay $${amount.toFixed(2)} & Submit Application`
        )}
      </Button>

      <p className="text-xs text-center text-slate-medium font-questa">
        Payments are securely processed by Stripe. We never store your card information.
      </p>
    </div>
  )
}
