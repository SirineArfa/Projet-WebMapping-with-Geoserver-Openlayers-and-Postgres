## Context
Through the use of Geoserver,which is a map server, this project covers the following aspects:

- Storing the vector and raster data in PostGIS/PostgreSQ. 
- Discover the publication on the web of spatial data in the form of cartographic services.
- Loading and publishing of vector and raster data.
- Definition of vector data publication styles (SLD).
- HTML/JavaScript web programming of a geographical map using jQuery , Bootstrap and JSON
- The use of Openlayers 6 geolocation API as WEB mapping API

The data used in this project relate to Côte d'Ivoire.

![gis](https://user-images.githubusercontent.com/80635318/208997262-e7ed891f-f462-410c-91f6-774756527b14.PNG)


Then I applied the same work on the data related to Tunisia.

![gis2](https://user-images.githubusercontent.com/80635318/208997625-662c90f0-dee3-4203-b274-379a82aef33e.PNG)

## Getting started

###### Prerequisites

You should have installed on your machine the following software:
- Geoserver `2.21.2`
- PostgreSQL `11.18.1`
- PostGIS `2.3.2`
- pgAdmin `4`


###### Pipeline
This project is brought down into 3 main steps:

![gis3](https://user-images.githubusercontent.com/80635318/208999275-1a5368ea-6109-421e-8945-8f3741a053a7.PNG)
1. ###### PostGIS/PostgreSQL:
Database for data storage that is used to store the Shapefiles layers of Côte d'Ivoire into PostgreSQL.
![gis4](https://user-images.githubusercontent.com/80635318/209000340-0611c359-4355-4ba2-abf8-24b8fb5e14a6.PNG)
As we can see the layers are stored in a PostgreSQL called Geoserver_db and we can visualize the their content with the through the SQL Query tool available in pgAdmin4 `SELECT * FROM civ_admbnda_adm1_cntig_ocha_itos_20180706;`

2. ###### Geoserver:
Geoserver is used for the publication of data in a `PostGIS - PostGIS Database` warehouse
![gis5](https://user-images.githubusercontent.com/80635318/209001355-20e47dec-8897-4584-bf0b-e2579cccdd51.PNG)


3. ###### OpenLayers:
OpenLayers for data visualization (webmapping)

###### Geometries in PostGIS

The main task is to save a polygon,point or a line that was drawn in Openlayers into the PostGIS database.
For example assuming that you already have a list of coordinates that describe your polygons (the result from the console.log ) and also assuming you are using WGS84 projection and SRID=4326 (SRID, Spatial Reference Identifier) then a simple query using `ST_GeomFromText(text, srid)` should do the job.
You should before that create a `polygones` relation in your PostGIS database t store the coordinates of the drown polygon as well as for the points relation and the line relation.
![poly](https://user-images.githubusercontent.com/80635318/209005985-5b8ebcce-77d7-49e9-8e8c-8a37663057b2.PNG)






