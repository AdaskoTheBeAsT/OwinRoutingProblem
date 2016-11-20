# Owin Routing problem
This project was born to show problems with routing in OWIN and Angular.  
When you open i browser your main root all works perfectly.  
WHen you try to open subroute index.html is properly served from server but css files and js files are not served.


# Libs used

To build this solution I used:
-  [OWIN ASP.NET WebAPI SPA Template](https://marketplace.visualstudio.com/items?itemName=OliverLohmann-MSFT.OWINASPNETWebAPISPATemplate)
-  [Geenrator Gulp Angular](https://github.com/Swiip/generator-gulp-angular)

# Warning
-  you need to have python 2.x.x installed - node-sass is used for generating css

# Changes from original templates:  
1. Upgraded .NET framework from 4.6 to 4.6.2
2. added classes based on http://stackoverflow.com/questions/27036448/how-to-intercept-404-using-owin-middleware (Tugberk Ugurlu)

 