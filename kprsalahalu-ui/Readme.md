
# Steps to Create a New React App

## 1. Install Node.js (if not already installed)

You need Node.js and npm (Node Package Manager) installed on your machine. You can download them from the [Node.js official website](https://nodejs.org/).

Verify the installation by running:

```bash
node -v
npm -v
```

## 2. Install create-react-app (Optional)

You can either globally install `create-react-app` or use `npx` (which comes with npm).

To install globally:

```bash
npm install -g create-react-app
```

## 3. Create a New React App

Using `npx` is recommended because it always uses the latest version of `create-react-app` without needing a global install. Run the following command in your terminal to create a new React app:

```bash
npx create-react-app my-app
```

Replace `my-app` with the name you want for your project.

## 4. Navigate to the Project Directory

After the project is created, move into your app’s directory:

```bash
cd my-app
```

## 5. Start the Development Server

You can start the development server with:

```bash
npm start
```

This will open your new React application in the browser at [http://localhost:3000/](http://localhost:3000/).

## Folder Structure of a Newly Created React App

```
my-app/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock (if you used yarn instead of npm)
```

- **src/**: Contains the application code.
- **public/**: Contains static files like `index.html`.
- **package.json**: Contains project metadata and dependencies.

Now, you can start building your React app by editing files inside the `src/` directory!
