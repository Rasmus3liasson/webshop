# API-dokumentation

API-endpoint för att skapa en betalning session och dirigerar användaren till Stripe checkout.

# `POST` Endpoint

## Skapa en ny betalningssession
- **Sökväg:** `/api/payment`

### Beskrivning

Denna endpoint skapar en ny betalningssession med Stripe och returnerar sessionens detaljer.

### Förfrågan

- **Body:**
  ```json
  {
    "data": [
      {
        "title": "Produkt 1",
        "imageUrl": "https://example.com/product1.jpg",
        "price": 19.99,
        "quantity": 2,
        "size": "M",
        "id": "product1_id"
      },
    ],
    "email": "customer@example.com"
  }

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```

## Hantera Stripe Webhook-händelser

- **Sökväg:** `/api/payment/webhook`

### Beskrivning

Denna endpoint hanterar händelser från Stripe-webhook, särskilt fokuserad på händelser för avslutade betalningssessioner och inkludera metadata med information om produkterna.

### Förfrågan

- **Body:** (Stripe webhook event)

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`
- **Kropp:**
  ```json
  {
    "result": "Stripe webhook-eventdetaljer",
    "ok": true
  }
  ``````


#### Misslyckat svar

```json
{
  "message": "Något gick fel",
  "ok": false
}
```