# **Store-M: Storage Management System**

**Store-M** is a powerful storage management system that allows users to upload, search, manage and share their files effortlessly. It includes features such as user authentication, file sharing, and responsive UI design.
![alt text](image.png)

---

## **Table of Contents**
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Usage](#usage)

---

## **Features**
- Secure file uploads.
- Efficient search functionality with debounced queries.
- User authentication with profile management.
- File sharing accross users.
- Thumbnail for files.
- Asynchronous file fetching and display.
- Next.js Dynamic Routing.

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/fearalert/Store-M.git
   cd Store-M
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## **Environment Variables**

Create a `.env` file in the project root with the following variables:

```plaintext
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_PUBLIC_APPWRITE_KEY=
```

---

## **Scripts**

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## **Usage**

1. **Run the application:**
   Start the development server:
   ```bash
   npm run dev
   ```

2. **Visit the application:**  
   Open your browser and navigate to `http://localhost:3000`.

3. **Features to explore:**  
   - OTP based Passwordless Authentication.
   - Search for files.
   - Upload and share files effectively.
   - Manage yout files effeciently.
   - Upload files directly via the upload button.
   - Click on the user avatar to view the profile or log out.
---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

---