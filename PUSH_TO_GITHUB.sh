#!/bin/bash

echo "🚀 GitHub Push Script for Aisensy Dashboard"
echo "==========================================="
echo ""
echo "⚠️  IMPORTANT: पहले GitHub पर repository बनाएं!"
echo "   1. github.com पर जाएं"
echo "   2. + icon → New repository"
echo "   3. Repository name दें (जैसे: aisensy-dashboard)"
echo "   4. Public select करें"
echo "   5. 'Initialize with README' UNCHECK करें"
echo "   6. Create repository click करें"
echo ""
read -p "GitHub repository बना लिया? (y/n): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ पहले GitHub पर repository बनाएं, फिर script run करें!"
    exit 1
fi

echo ""
echo "अब अपना GitHub username और repository name दें:"
read -p "GitHub Username: " USERNAME
read -p "Repository Name: " REPO_NAME

echo ""
echo "📦 Adding files..."
git add .

echo "💾 Creating commit..."
git commit -m "Initial commit - Aisensy Dashboard"

echo "🌿 Setting main branch..."
git branch -M main

echo "🔗 Adding remote..."
git remote add origin https://github.com/$USERNAME/$REPO_NAME.git

echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Check your repository at:"
echo "   https://github.com/$USERNAME/$REPO_NAME"
echo ""
echo "🎉 अब Vercel पर deploy करें: vercel.com"

