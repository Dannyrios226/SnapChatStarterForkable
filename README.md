# Bitmigo Chatbot 

This is a chatbot that allows you to have a chat friend. You are able to talk to them as your own personal friend. 

## Fork the Repository 
Click on the Fork button: This is usually found in the top-right corner of the repository's page. This will create a copy of the repository under your own GitHub account.

## Clone the Forked Repository 
1. Go to your forked repository on GitHub.
2. Click on the green "Code" button and copy the command.
3. Open your terminal or Git Bash and run it! It'll look like this: 
```js
gh repo clone your-username/repository-name
```

4. Navigate to the repository directory

# Install Packages
1. Run the following command to be able to run your program.
```js
$ npx expo installs
```

# Set Up the Upstream Remote
1. Add the original repository as a remote: This allows you to pull in updates from the original repository.
```js
$ git remote add upstream https://github.com/Snap-Engineering-Academy-2025/SnapChatStarterForkable.git
```
2. Verify the new remote named 'upstream'

```js
$ git remote -v
```
##  Add Supabase Environment Variable!

Get the code running! You'll need to rename `.env.example` to `.env.local` file. and add your own keys:
EXPO_PUBLIC_SUPABASE_URL=  YOUR_KEY
EXPO_PUBLIC_SUPABASE_KEY=  YOUR_KEY
EXPO_PUBLIC_CHATGPT_KEY=   YOUR_KEY
