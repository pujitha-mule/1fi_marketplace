```markdown
# 1Fi Marketplace

A React Native / Expo implementation of the **1Fi Marketplace** experience within the Shop section, developed as part of the 1Fi SDE Intern assignment.

The implementation focuses on a clean, responsive mobile marketplace experience where users can browse products, view product details, select product variants and EMI plans, and proceed to a confirmation screen.

---

## 📱 Project Overview

The objective of this project is to implement the **1Fi Marketplace** section within the existing Shop experience while maintaining a visual style consistent with the 1Fi application.

The Marketplace provides users with:

- Marketplace product listing
- Product cards with images, pricing, ratings and reviews
- Product detail pages
- Product variant selection
- EMI plan selection
- Dynamic product and EMI data through a mock API/service layer
- Loading, error and empty states
- Product selection and confirmation flow
- Navigation back to the Shop section
- Responsive mobile-first UI

The implementation intentionally focuses on the requested **1Fi Marketplace** scope rather than recreating unrelated areas of the 1Fi application.

---

## ✨ Features

### Shop Integration

The Marketplace is accessible from the Shop section through the **1Fi Marketplace** option.

The other Shop categories are retained as placeholders because their full implementation is outside the scope of this assignment.

### Marketplace Listing

The Marketplace screen includes:

- 1Fi Marketplace header
- 0% interest promotional banner
- Product grid
- Product images
- Product names
- Current pricing
- Original pricing where applicable
- EMI/monthly payment information
- Ratings
- Review counts
- Responsive two-column layout
- Pull-to-refresh
- Loading state
- Error state
- Empty state

### Product Details

Each product has a dedicated details screen containing:

- Product image
- Brand
- Product name
- Current price
- Original price
- Rating
- Review count
- Product description
- Product features
- Available variants
- EMI plans
- Proceed CTA

### Variant Selection

Products can contain selectable variants such as:

- Color
- Storage

Required options must be selected before the user can proceed.

### EMI Selection

The Product Details screen provides available EMI plans.

Plans display relevant information such as:

- Monthly EMI
- Duration
- Interest information
- Total payable amount

Users can select an EMI plan before proceeding.

### Confirmation Flow

After completing the required selections, the user can proceed to a confirmation screen.

The confirmation screen displays:

- Selected product
- Selected variants
- Selected EMI plan
- Relevant purchase information
- Continue Shopping action

The Continue Shopping action returns the user to the Shop section.

---

## 🛍️ Included Products

The current marketplace catalogue contains representative products:

| Product | Category |
|---|---|
| iPhone 15 Pro | Smartphone |
| Samsung Galaxy S24 Ultra | Smartphone |
| Sony WH-1000XM5 | Audio |

Product information is maintained separately from the UI rather than being directly embedded inside the screen components.

---

## 🏗️ Architecture

The project separates presentation, navigation, data and service responsibilities.

```text
App.js
   │
   └── AppNavigator
          │
          ├── Shop
          │
          └── Marketplace
                 │
                 ├── MarketplaceScreen
                 │      │
                 │      └── ProductCard
                 │
                 └── ProductDetailsScreen
                        │
                        ├── Variant Selection
                        ├── EMI Selection
                        └── Confirmation
```

The architecture is intentionally lightweight while maintaining separation of concerns appropriate for the assignment.

---

## 📂 Project Structure

```text
1fi-marketplace/
│
├── src/
│   │
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── data/
│   │   └── marketplaceData.js
│   │
│   ├── hooks/
│   │   └── Marketplace-related hooks
│   │
│   ├── navigation/
│   │   └── AppNavigator.js
│   │
│   ├── screens/
│   │   ├── MarketplaceScreen.js
│   │   ├── ProductDetailsScreen.js
│   │   └── ConfirmationScreen.js
│   │
│   └── services/
│       └── marketplaceApi.js
│
├── App.js
├── app.json
├── babel.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 🔄 Data Flow

Marketplace information is separated from the UI and retrieved through a mock service layer.

```text
Marketplace Data
       │
       ▼
Mock API Service
       │
       ▼
Marketplace Hook
       │
       ▼
Marketplace Screen
       │
       ▼
Product Details
       │
       ├── Variant Selection
       │
       └── EMI Selection
              │
              ▼
        Confirmation Screen
```

This approach keeps product information independent from the presentation layer and makes it possible to replace the mock implementation with a real backend API later.

---

## 🔌 API / Service Layer

Because the assignment does not provide a production marketplace backend, a mock API/service layer is used.

The service provides asynchronous operations for retrieving marketplace products and individual product details.

Core responsibilities include:

```text
getProducts()
getProductById(id)
```

The mock service introduces an asynchronous delay to simulate network behaviour.

This allows the application to demonstrate realistic loading and error handling rather than assuming that data is immediately available.

### Why a service layer?

Separating data retrieval from the UI provides several benefits:

* UI components remain focused on presentation and interaction
* The data source can be replaced later
* Loading and error states can be handled consistently
* Product data is not duplicated across screens
* The structure is closer to a production application architecture

---

## ⏳ Loading States

Marketplace data is retrieved asynchronously.

While data is being retrieved, the application displays a loading state rather than rendering an incomplete product list.

The Product Details screen also handles asynchronous product retrieval independently.

---

## ⚠️ Error Handling

The application includes error handling for failed product retrieval.

If a product cannot be retrieved or an invalid product ID is requested, the application provides an error state rather than allowing the screen to fail silently.

This also makes the UI ready for a future production API where network failures may occur.

---

## 🈳 Empty State

The Marketplace listing handles the case where no products are returned.

Instead of leaving the screen blank, an explicit empty state is provided.

This gives the Marketplace a defined behaviour when the catalogue contains no products.

---

## 🔄 Pull to Refresh

The Marketplace listing supports pull-to-refresh.

Users can refresh the product catalogue without leaving the Marketplace screen.

This is useful for a marketplace because product availability and pricing may change over time.

---

## 🧭 Navigation Flow

The main user journey is:

```text
Shop
  │
  ▼
1Fi Marketplace
  │
  ▼
Product Listing
  │
  ▼
Product Details
  │
  ├── Select Color
  │
  ├── Select Storage
  │
  └── Select EMI
          │
          ▼
       Proceed
          │
          ▼
     Confirmation
          │
          ▼
   Continue Shopping
          │
          ▼
         Shop
```

The Proceed button remains disabled until the required selections have been completed.

This prevents users from reaching the confirmation stage with incomplete product information.

---

## 🎨 UI / UX

The UI was designed to remain visually aligned with the 1Fi application style shown in the assignment and reference experience.

The implementation emphasizes:

* Clean card-based layouts
* Rounded UI elements
* Purple-accented actions
* Clear visual hierarchy
* Product-focused imagery
* Readable pricing
* Clear EMI information
* Consistent spacing
* Touch-friendly controls
* Mobile-first layouts
* Simple navigation

The implementation intentionally avoids redesigning the entire application and focuses on the requested Marketplace experience.

---

## 📱 Responsive Design

The application uses React Native components and is designed for mobile form factors.

The Marketplace product grid maintains:

* Consistent card spacing
* Readable typography
* Proper image scaling
* Touch-friendly controls
* Scrollable content

The Product Details screen is vertically scrollable so that product information, variants and EMI options remain accessible on smaller screens.

---

## 🧩 Technology Stack

### Core

* React Native
* Expo
* JavaScript

### Navigation

* React Navigation
* Stack navigation
* Bottom tab navigation

### Data

* JavaScript mock data
* Mock asynchronous API/service layer
* Custom marketplace hook

### Development

* Node.js
* npm
* Git
* GitHub
* Expo Go

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git
* Expo
* Expo Go for physical-device testing

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/pujitha-mule/1fi_marketplace.git
```

Move into the project directory:

```bash
cd 1fi_marketplace
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Application

Start the Expo development server:

```bash
npx expo start
```

Expo will display a QR code.

### Android

1. Install Expo Go.
2. Connect the Android device and development machine to the same network.
3. Open Expo Go.
4. Scan the QR code.
5. Launch the project.

### iOS

1. Install Expo Go from the App Store.
2. Connect the iPhone and development machine to the same network.
3. Start the Expo development server.
4. Open Expo Go.
5. Scan the QR code or open the discovered development server.
6. Launch the project.

---

## 🧪 Testing

The primary flow can be tested using:

```text
Shop
→ 1Fi Marketplace
→ Select a Product
→ Open Product Details
→ Select Required Variants
→ Select EMI Plan
→ Proceed
→ Confirmation
→ Continue Shopping
```

The flow can be repeated for all products in the marketplace catalogue.

### Product Listing Tests

* Products are displayed correctly
* Product images load
* Pricing is displayed
* EMI information is displayed
* Ratings and review counts are displayed
* Product grid can be scrolled
* Pull-to-refresh works

### Product Details Tests

* Product details load correctly
* Product image is displayed
* Product information is displayed
* Variants can be selected
* EMI plans can be selected
* Proceed is disabled when required selections are missing
* Proceed becomes available after required selections are completed

### Confirmation Tests

* Selected product is correct
* Selected variants are correct
* Selected EMI plan is correct
* Continue Shopping returns to Shop

### Edge Case Tests

* Loading state while data is retrieved
* Product-not-found handling
* Empty catalogue handling
* API/service failure handling

---

## 💳 EMI Scope

The EMI functionality implemented in this assignment is a product-selection experience.

Users can:

1. View available EMI plans
2. Review relevant plan information
3. Select an EMI plan
4. Continue to confirmation with the selected plan

The implementation does not process real financial transactions or connect to a real payment gateway.

---

## 🔐 Data Handling

The application uses mock marketplace data because a production marketplace backend was not provided as part of the assignment.

No real customer information, payment credentials or financial account information is collected or processed.

The project does not implement real financial transactions.

---

## 🛒 Assignment Scope

### Implemented

* 1Fi Marketplace entry point
* Marketplace product catalogue
* Product cards
* Product images
* Product names
* Pricing
* Ratings and reviews
* Product details
* Product variants
* EMI plans
* EMI selection
* Proceed CTA
* Confirmation screen
* Navigation
* Loading state
* Error state
* Empty state
* Pull-to-refresh
* Mock API/data layer
* Responsive mobile UI

### Intentionally Not Implemented

The following are outside the scope of the requested Marketplace implementation:

* Real payment gateway
* Real order placement
* Production backend
* User authentication
* Real financial account integration
* Real inventory management
* Delivery tracking
* Merchant administration
* Full Top Brands marketplace
* Full Nearby Stores marketplace

The implementation remains focused on the requested **1Fi Marketplace** functionality.

---

## 🧠 Engineering Decisions

### Separation of Data and UI

Product information is maintained separately from UI components.

This prevents marketplace data from being duplicated throughout the application.

### Mock API Abstraction

The service layer simulates asynchronous API calls.

This makes the UI behave more like a real application and allows the data source to be replaced later.

### Reusable Components

Reusable components are used for repeated UI patterns where appropriate.

This helps maintain consistency and reduces unnecessary duplication.

### Dynamic Product Details

Products are identified through navigation parameters rather than creating a separate screen for each product.

The same Product Details screen can therefore render different products.

### Selection State

Variant and EMI selections are maintained as screen state and passed to the confirmation flow once the required selections have been completed.

### Defensive UI States

Loading, error and empty states are explicitly handled so that the application does not assume every data request will succeed.

---

## 🔮 Future Improvements

If this project were extended into a production marketplace, potential improvements could include:

### Production Backend

Replace the mock service with a production REST or GraphQL API.

```text
Production API
      │
      ▼
Marketplace Service
      │
      ▼
React Native Application
```

### Real Inventory

Retrieve real-time stock and product availability from the backend.

### User Authentication

Authenticated users could access:

* Orders
* Saved products
* Purchase history
* Personalized EMI information

### Production Checkout

A complete checkout experience could include:

* Address selection
* Order summary
* Payment processing
* Order creation
* Transaction status

### Product Search and Filtering

The catalogue could be extended with:

* Search
* Categories
* Brand filters
* Price filters
* Rating filters
* Storage filters

### Advanced State Management

As the application grows, a dedicated state-management solution could be introduced for shared marketplace state.

---

## 📸 Application Flow

```text
┌──────────────────────┐
│         Shop         │
├──────────────────────┤
│ Top Brands           │
│ Nearby Stores        │
│ 1Fi Marketplace  →   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ 1Fi Marketplace      │
├──────────────────────┤
│ 0% Interest Banner   │
│                      │
│ ┌────────┐ ┌────────┐│
│ │ iPhone │ │Samsung ││
│ │ 15 Pro │ │ S24    ││
│ └────────┘ └────────┘│
│                      │
│ ┌──────────────────┐ │
│ │ Sony WH-1000XM5  │ │
│ └──────────────────┘ │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Product Details      │
├──────────────────────┤
│ Product Image        │
│ Product Information  │
│                      │
│ Color                │
│ [Option] [Option]    │
│                      │
│ Storage              │
│ [Option] [Option]    │
│                      │
│ EMI Plans            │
│ [Plan] [Plan]        │
│                      │
│ [Proceed]            │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Confirmation         │
├──────────────────────┤
│ Product              │
│ Selected Variants    │
│ Selected EMI         │
│                      │
│ [Continue Shopping]  │
└──────────────────────┘
```

---

## 📝 Assignment Notes

This project was developed specifically around the Marketplace requirements of the 1Fi SDE Intern assignment.

The implementation prioritizes:

1. Understanding the requested product experience
2. Consistent UI/UX
3. Functional navigation
4. Product variant selection
5. EMI selection
6. Separation of data and UI
7. API/service abstraction
8. Loading and error handling
9. Responsive mobile behaviour
10. Maintainable project structure

The implementation avoids adding unnecessary functionality that was not required by the assignment.

---

## 👩‍💻 Author

**Pujitha Mule**

B.Tech — Computer Science & Engineering

GitHub:

[https://github.com/pujitha-mule](https://github.com/pujitha-mule)

---

## 🔗 Repository

[https://github.com/pujitha-mule/1fi_marketplace](https://github.com/pujitha-mule/1fi_marketplace)

---

## 📄 License

This project was created for the 1Fi SDE Intern assignment and is intended for evaluation purposes.

```
```
