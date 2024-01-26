# API-dokumentation

Dokumentet ger detaljer om API-endpoints som innefattar order information.

# `GET` Endpoints

## Ordrar

- **Sökväg:** `/api/order`

### Beskrivning

Denna endpoint hämtar orderdata för alla ordrar.

### Förfrågan

Kräver ingen body i förfrågan

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`
  ```json
  {
    [
      {
        "order_id": 1,
        "order_date": "2024-01-25T12:34:56Z",
        "customer_id": 123,
        "customer_email": "customer@example.com",
        "customer_address": "123 Main St",
        "customer_phone": "555-1234",
        "products": [
          {
            "order_detail_id": "abc123",
            "product_id": "test1",
            "product_name": "T-shirt",
            "quantity": 2,
            "size": "M",
            "product_price": 19.99,
            "subtotal": 39.98
          },
          {
            "order_detail_id": "def456",
            "product_id": "test2",
            "product_name": "Jeans",
            "quantity": 1,
            "size": "L",
            "product_price": 39.99,
            "subtotal": 39.99
          }
        ]
      }
    ]
  }
  ```

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```

## Specifik order

- **Sökväg:** `/api/order/[orderId]`

### Beskrivning

Denna endpoint hämtar orderdata för specifik order baserat på order_id.

### Förfrågan

Kräver ingen body i förfrågan

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`

  ```json
  {
      {
        "order_id": 1,
        "order_date": "2024-01-25T12:34:56Z",
        "customer_id": 123,
        "customer_email": "customer@example.com",
        "customer_address": "123 Main St",
        "customer_phone": "555-1234",
        "products": [
          {
            "order_detail_id": "abc123",
            "product_id": "test1",
            "product_name": "T-shirt",
            "quantity": 2,
            "size": "M",
            "product_price": 19.99,
            "subtotal": 39.98
          },
        ]
      }
  }
  ```

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```

## Specifik order

- **Sökväg:** `/api/order/customer`

### Beskrivning

Denna endpoint hämtar alla ordrar relaterad till specifik kund

### Förfrågan

Kräver ingen body i förfrågan

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`

  ```json
  {
    [
      {
        "order_id": 1,
        "order_date": "2024-01-25T12:34:56Z",
        "customer_id": 123,
        "customer_email": "customer@example.com",
        "customer_address": "123 Main St",
        "customer_phone": "555-1234",
        "products": [
          {
            "order_detail_id": "abc123",
            "product_id": "test1",
            "product_name": "T-shirt",
            "quantity": 2,
            "size": "M",
            "product_price": 19.99,
            "subtotal": 39.98
          },
        ]
      }
    ]
  }
  ```

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```

# `POST` Endpoints

## Skicka order

- **Sökväg:** `/api/order`

### Beskrivning

Denna endpoint hanterar nya ordrar.

### Förfrågan

  ```json
   {
    "customer_email": "texample.com",
    "customer_address": "Frödingsvägen 11A",
    "customer_phone": "+46707308579",
    "products": [
      {
        "order_detail_id": "detail_id",
        "product_id": "product_id",
        "product_name": "hejan",
        "quantity": 3,
        "size": "XS",
        "product_price": 19.99,
        "subtotal": 19.99
      }
    ]
  }
  ```

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`
  ```json
  {
    "message": "Order skapad"
  }
  ```

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```
