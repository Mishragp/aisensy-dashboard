# 🎯 Simple GitHub Push - Step by Step

## 📋 पहले GitHub पर Repository बनाएं:

1. **github.com** पर जाएं और login करें
2. Top right में **"+"** icon पर click करें
3. **"New repository"** select करें
4. **Repository name** दें (जैसे: `aisensy-dashboard`)
5. **Public** select करें
6. ❌ **"Add README"** को UNCHECK करें
7. **"Create repository"** click करें

---

## 🖥️ अब Terminal में ये Commands Run करें:

### Step 1: सभी Files Add करें
```bash
git add .
```

### Step 2: Commit करें
```bash
git commit -m "Initial commit - Aisensy Dashboard"
```

### Step 3: Main Branch Set करें
```bash
git branch -M main
```

### Step 4: GitHub Remote Add करें
**⚠️ यहाँ अपना username और repo name डालें:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
अगर आपका username `gopalmishra` है और repo name `aisensy-dashboard` है, तो:
```bash
git remote add origin https://github.com/gopalmishra/aisensy-dashboard.git
```

### Step 5: Push करें
```bash
git push -u origin main
```

---

## 🔑 Authentication (अगर Password मांगे):

1. **GitHub.com** → **Settings** (profile picture पर click करें)
2. **Developer settings** (बाईं तरफ)
3. **Personal access tokens** → **Tokens (classic)**
4. **"Generate new token"** → **"Generate new token (classic)"**
5. **Note**: दें (जैसे: "aisensy-deploy")
6. **Expiration**: 90 days select करें
7. **Scopes**: ✅ **`repo`** check करें (सब कुछ)
8. **"Generate token"** click करें
9. Token को **copy** करें (एक बार ही दिखेगा!)
10. Password के बजाय ये **token paste** करें

---

## ✅ Check करें:

GitHub.com पर जाकर अपने repository में सभी files देखें!

---

## 🚀 अब Deploy करें:

1. **vercel.com** पर जाएं
2. GitHub से login करें
3. **"Add New Project"**
4. अपना repository select करें
5. **"Deploy"** click करें
6. **1-2 मिनट में live! 🎉**

---

## 📝 सभी Commands एक साथ:

```bash
git add .
git commit -m "Initial commit - Aisensy Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**⚠️ अपना username और repo name बदलना न भूलें!**

