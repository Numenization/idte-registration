# How to build and deploy

1. Open up a bash terminal to the "idte-registration" folder (Git bash if on windows) and run the following command:
   `./deploy`
1. Put the resulting .war file from the target folder into your dropins folder for your WAS Liberty server, or webapps folder for Apache Tomcat
1. To just build the react and html files, run this command:
   `npm run build`
1. To just run the maven packaging process, run this:
   `./mvnw clean package`

# How to open up the development preview server

1. To view your work as you are working, run the integrated Tomcat server for spring with:
   `./mvnw spring-boot:run`
1. When you make changes to the backend, Spring will automatically reload
1. When you make changes to the frontend, you will need to rebuild it with:
   `npm run build`

# How to create a new webpage

1. Create a new React component in a new file under the root of /websrc
1. As this will be the component displayed on the page, include the following line at the bottom of the code:
   `ReactDOM.render(<{COMPONENT NAME} />, document.getElementById('app'));`
1. In the webpack.config.js file, you will need to add a new entry point for webpack, and a new HtmlWebpackPlugin object to create a new html file on build
1. To do this, add a new object to the entry array with a name cooresponding to the name of the webpage, and point it to the path of the .jsx file
1. To add a new HtmlWebpackPlugin object, go to the plugins array and add a new object with the following format:

```javascript
new HtmlWebpackPlugin({
  chunks: ["{ENTRY NAME}"],
  template: "./src/main/websrc/template.html",
  filename: "{RESULTING FILE NAME}.html"
});
```
