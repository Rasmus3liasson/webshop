# Konfigurare Infisical

## Beskrivning
Denna konfiguration möjliggör att du kan ta del utav mina egna värden utan att behöva skriva in egna värden för att köra detta med docker-compose.

### Steg : 1
Installera Infisical via homebrew 

```
brew install infisical/get-cli/infisical
```

### Steg : 2
Skapa ett konto på [Infisical](https://infisical.com/)

### Steg : 3
Skicka ett mail eller kontakta mig på något annat sätt med din mailadress som är relaterat till ditt konto. Så jag kan lägga till dig med access till mina värden till enviroment variablerna. 

### Steg : 4
Navigera till ditt klonade projekt och logga in på ditt Infisical konto. Och auktorisera dig med cloud alternativet.

```
infisical login
```

### Steg : 5 
Kör följande kommand för att skapa en **infisical.json** fil med konfigurationen för projektet. Och initialisera till projektet **webshop**

```
infisical init
```
Därefter välj **webshop** som jag lagt till dig att ha åtkomst till.

### Steg : 6
Skapa en `.env` fil och kopiera datan från `.env.example` med exempeldatan för att Infisical lägger till de "korrekta" värdena. 

##
Därefter har du konfigurerat projektet till att kunna starta projektet lokalt med docker compose och får tillgång till mina värden för att köra projektet med alla funktioner.

Kommandot för detta finns i [README.md](../README.md)
