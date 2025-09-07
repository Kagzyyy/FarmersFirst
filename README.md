**Farmer's First**

✨ **Key Features**
A detailed look at the functionalities that make Farmer's First a powerful tool for modern agriculture.

🎨 **Professional & Accessible UI/UX**
Animated Splash Screen: A beautiful, animated entry point that professionally introduces the app and its branding.
Themed Interface: A calming and appropriate theme of agricultural greens and earth tones that resonates with the target audience.
Custom Branding: Features a custom-designed, minimalist "FF" logo that is both modern and thematic.
Responsive Feedback: Interactive toast notifications provide instant, clear feedback for user actions like successful updates or errors.

🔒 **Secure & Complete User Authentication**
Seamless Registration: A multi-step registration flow with (mock) OTP verification and automatic FarmId generation.
Robust Login: A secure login system that validates user credentials against stored data.
Full Profile Management: Users can upload and change their profile picture, which is persisted across sessions.
Secure Password Updates: A dedicated "Change Password" modal requires current password verification before allowing an update.

👤 **In-Depth Farmer Profile**
At-a-Glance Info: A clean profile screen displaying the farmer's name, FarmId, email, and contact number.
Reputation Building: A dynamic star rating system calculates and displays the farmer's average rating.
Trust Signals: A "Top Reviews" section showcases positive feedback from buyers, helping to build trust and credibility in the marketplace.

🌱 **CRUD Crop Management**
Create: An intuitive form to add new crop listings, including image uploads (from camera or gallery), crop type, cultural practice (e.g., Organic, Hybrid), price, and stock quantity.
Read: A clean, grid-based home screen that beautifully displays all active crop listings with key details.
Update: Full functionality to edit any detail of an existing crop listing through a dedicated editing screen.
Delete: The ability to securely remove crop listings with a confirmation prompt to prevent accidental deletions.

📈 **Data-Driven Price Recommendation**
Intelligent Pricing Tool: A "Get Recommended Price" button on the Add/Edit Crop screens provides data-driven pricing suggestions.
ML Model Simulation: This feature simulates a linear regression model by processing a large, embedded CSV of historical market data to recommend a fair and competitive price based on the crop's name and cultural practice.

📦 **Simplified Order Tracking**
Organized Dashboard: A dedicated "Your Orders" screen neatly separates transactions into Ongoing and Completed tabs.
Detailed Views: Provides clear, itemized lists showing buyer details, crop information, quantity, and order status (e.g., 'Pending Payment').

🛠 **Tech Stack**
This project leverages modern frontend technologies to deliver a fast, reliable, and scalable application.
Frontend: React & TypeScript
Styling: Tailwind CSS
State Management: React Context API
Persistence: Browser Local Storage
Machine Learning Model: SciKit-Learn, Python

[farmerfirstpdfpdf.pdf](https://github.com/user-attachments/files/22192571/farmerfirstpdfpdf.pdf)



**Crop Connect**
A mobile-first web application designed to bridge the gap between farmers and vendors. It provides a seamless marketplace for browsing agricultural produce and features an innovative UPI mandate-based payment system for large-scale transactions.
(Suggestion: It would be great to replace the static image above with a GIF showcasing the registration flow, browsing crops, and the payment process to fully demonstrate the app's functionality.)

✨ **Core Features**

👤 **Seamless Onboarding:** 
A multi-step registration wizard to securely collect user details, vendor information (GST), and bank/UPI credentials.

🌾 **Rich Product Catalog:**
An interactive dashboard to browse, search, and discover a wide variety of crops with real-time search suggestions.

🔍 **Advanced Search & Filtering:**
Filter by maximum price range.
Filter by seller rating (e.g., 4+ stars).
Toggle filters for Organic and Seasonal tags.
Filter by seller category: Farmer, Wholesaler, or Cooperative.

📄 **Detailed Crop Views:**
Get comprehensive information on each product, including available stock, pricing, seller details, and authentic user reviews.

💳 **Innovative Payment System:**
UPI Mandate Flow: For large orders, an initial 25% of the payment is blocked via a UPI mandate, with the remaining amount scheduled in future installments.
Integrated Wallet: Users can add money to their personal wallet and use the balance to pay for orders fully or partially, streamlining transactions.

👨‍💼 **Comprehensive User Profile:**
View and manage personal, business, and bank information.
Track wallet balance and add funds through a secure UPI flow.

📜 **Detailed Order History:**
Keep track of all past and current orders, their status (Blocked, Installment Paid, Delivered, etc.), and total amounts.

⭐ **Ratings & Reviews:**
After an order is delivered, users can leave a star rating and a comment, contributing to a trustworthy and transparent community marketplace.

🛠 **Tech Stack**
Framework: React
Language: TypeScript
Styling: Tailwind CSS
State Management: React Hooks (useState, useCallback, useMemo)
Module System: ES Modules with Import Maps for a modern, build-less development experience.


[crop_connect_pdf.pdf](https://github.com/user-attachments/files/22192573/crop_connect_pdf.pdf)

