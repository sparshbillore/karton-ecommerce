import json
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.views import APIView
import stripe
from django.conf import settings
from django.http import HttpResponseRedirect, JsonResponse


stripe.api_key = settings.STRIPE_SECRET_KEY
webhook_secret = settings.STRIPE_WEBHOOK_SECRET

FRONTEND_CHECKOUT_SUCCESS_URL = settings.CHECKOUT_SUCCESS_URL
FRONTEND_CHECKOUT_FAILED_URL = settings.CHECKOUT_FAILED_URL

class CreateCheckoutSession(APIView):
  def post(self, request):
    try:
      order_items = request.data['orderItems']
      line_items = []
      for item in order_items:
         line_items.append({
            'price_data': {
            'currency': 'inr',
            'product_data': {
              'name': item['name'],
              'Images':[item['image']],
            },
            'unit_amount': int(float(item['price']) * 100) ,
          },
          'quantity': item['qty'],
         })
        
      checkout_session = stripe.checkout.Session.create(
        line_items,
        mode='payment',
       
        success_url= FRONTEND_CHECKOUT_SUCCESS_URL,
        cancel_url= FRONTEND_CHECKOUT_FAILED_URL,
        )
      return redirect(checkout_session.url , code=303)
    except Exception as e:
        error_message = str(e)
        print('mistake' , e)
        return JsonResponse({'error': error_message}, status = 400)


class WebHook(APIView):
  def post(self , request):
    event = None
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']

    try:
      event = stripe.Webhook.construct_event(
        payload ,sig_header , webhook_secret
        )
    except ValueError as err:
        # Invalid payload
        raise err
    except stripe.error.SignatureVerificationError as err:
        # Invalid signature
        raise err

    # Handle the event
    if event.type == 'payment_intent.succeeded':
      payment_intent = event.data.object 
      print("--------payment_intent ---------->" , payment_intent)
    elif event.type == 'payment_method.attached':
      payment_method = event.data.object 
      print("--------payment_method ---------->" , payment_method)
    # ... handle other event types
    else:
      print('Unhandled event type {}'.format(event.type))

    return JsonResponse(success=True, safe=False)