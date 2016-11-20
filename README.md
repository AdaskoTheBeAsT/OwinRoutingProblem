# Owin Routing problem
This project was born to show problems with routing in OWIN and Angular.  
- When you run project in VS and http://localhost:1337/ is launched all works perfectly
- When you go to 'contact' or 'about' pages - all is ok angular routing works as expected
- When you try to go directly to http://localhost:1337/contact or http://localhost:1337/about problem show up:
     - index.html is served properly but js and css files are not downloaded correctly


# Libs used

To build this solution I used:
-  [OWIN ASP.NET WebAPI SPA Template](https://marketplace.visualstudio.com/items?itemName=OliverLohmann-MSFT.OWINASPNETWebAPISPATemplate)
-  [Geenrator Gulp Angular](https://github.com/Swiip/generator-gulp-angular)

# Warning
-  you need to have Node installed - personally I use (Node Version Manager)[https://github.com/creationix/nvm] 
-  you need to have python 2.x.x installed - node-sass is used for generating css

# Changes from original templates:  
1. Upgraded .NET framework from 4.6 to 4.6.2
2. added classes based on http://stackoverflow.com/questions/27036448/how-to-intercept-404-using-owin-middleware (Tugberk Ugurlu)
3. updated bower and npm packages - only nonbreaking ones
4. added wpp.targets file to deploy non poluted web app
5. tricks for autogenerating base tag for angular-ui-router
6. tslint rules updated

 
