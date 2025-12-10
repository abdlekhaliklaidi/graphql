# **GraphQL Profile – README**

## **📌 Overview**

This project is a personal **interactive profile page** built using **GraphQL**, which retrieves real-time school data from the Zone01 Oujda platform.

The goal is to learn:

* GraphQL querying (basic, nested, with arguments)
* Authentication with JWT
* UI design fundamentals
* SVG graphs for statistics
* Front-end development and hosting

Your profile page displays **your own user data**, fetched from the GraphQL endpoint:

```
https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql
```

A login system is implemented to authenticate the user and retrieve their JWT token using:

```
https://learn.zone01oujda.ma/api/auth/signin
```

---

## **✨ Features**

### 🔐 **Authentication**

* Login using **username:password** or **email:password**
* Credentials encoded with **Basic Auth (Base64)**
* Receive a JWT token from the signin endpoint
* Store token in localStorage/sessionStorage
* Logout feature to clear session
* Use JWT via **Bearer authentication** for all GraphQL queries

### 👤 **Profile Page**

Your profile displays at least **three user sections** of your choice, for example:

* Basic user info (login, audit ratio, campus info...)
* XP earned
* Passed / failed projects
* Grades
* Skills
* Attempt history

### 📊 **Statistics (SVG Graphs) — Required**

At least **TWO SVG graphs** must be implemented. Examples:

* XP progression over time
* XP earned by project
* Audit ratio graph
* PASS / FAIL ratio
* Piscine (JS/Go) statistics
* Attempts per exercise

SVG graphs can be:

* Interactive
* Animated
* Responsive

(Your choice)

### 🌐 **Hosting**

The profile must be deployed online using:

* GitHub Pages
---

## **🔐 Authentication Flow**

### **1. Send POST request to signin**

```js
const response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + credentials
  }
});
const jwt = await response.text();
```

### **2. Store JWT**

```js
localStorage.setItem("token", jwt);
```

### **3. Use JWT for GraphQL queries**

```js
fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + jwt,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query })
});
```

---

## **📌 GraphQL Examples**

### ✔ Basic Query (normal)

```graphql
{
  user {
    id
    login
  }
}
```

### ✔ Query with arguments

```graphql
{
  object(where: { id: { _eq: 3323 } }) {
    name
    type
  }
}
```

### ✔ Nested Query

```graphql
{
  result {
    id
    user {
      id
      login
    }
  }
}
```
