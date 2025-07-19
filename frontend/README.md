# 🧑‍💼 HR Performance Dashboard

A mini performance dashboard built using **React.js** for HR managers to view, search, and manage employee data interactively.

---

### 🔧 **Tech Stack**

- **React**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **State Management:** Context API
- **For graph:** Chart.js.

---
### 🎯 **Core Features **

#### 1. 🏠 Dashboard Homepage (`/`)

- Fetches and displays dummy data from [dummyjson.com](https://dummyjson.com/users?limit=20)
- Renders user cards containing:
  - Full Name, Email, Age, Department (randomized )
  - A rating bar (1–5 stars) showing performance (randomized )
  - Buttons: `View`, `Bookmark`, `Promote`

#### 2. 🔍 Search & Filter

- Search bar to filter users by name, email, or department
- Multi-select dropdown filters for department and rating

#### 3. 👤 Dynamic User Details Page (`/employee/[id]`)

- Shows a detailed profile:
  - Address, Phone, Bio (mocked), Past performance history
  - Star-based performance rating and color-coded badges
- Tabbed interface for:
  - `Overview`
  - `Projects`
  - `Feedback`  
  *(Tabs load mock data dynamically)*

#### 4. 📌 Bookmark Manager (`/bookmarks`)

- Displays all bookmarked employees
- Options to:
  - Remove from bookmarks

#### 5. 📊 Analytics Page (`/analytics`)

- Charts showing:
  - Department-wise average performance
  - Bookmark trends (mocked data)
- Built using **Chart.js**
---

## 🛠️ **Setup Instructions**

1. **Clone the repository:**
   ```bash
   git clone 
   cd 
