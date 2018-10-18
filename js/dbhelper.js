class DBHelper{static createIdb(){let dbPromise=idb.open('restaurantsDB',1,function(upgradeDb){upgradeDb.createObjectStore('restaurants',{keyPath:'id'});upgradeDb.createObjectStore('reviews',{keyPath:'id'})});return dbPromise}
static get DATABASE_URL(){const port=1337
return `http://localhost:${port}/restaurants`}
static fetchRestaurants(callback){let idbPromise=DBHelper.createIdb();fetch(DBHelper.DATABASE_URL).then(function(response){if(!response.ok){throw new Error(response.status)}else{return response.json()}}).then(function(jsondata){idbPromise.then(function(db){let storeTransaction=db.transaction('restaurants','readwrite');let restaurantsStore=storeTransaction.objectStore('restaurants');for(let key in jsondata){restaurantsStore.put(jsondata[key])}
console.log("data inserted into idb!")});callback(null,jsondata)}).catch(function(error){idbPromise.then(function(db){let tx=db.transaction('restaurants','readonly');let store=tx.objectStore('restaurants');return store.getAll()}).then(function(items){callback(null,items)})})}
static fetchRestaurantById(id,callback){DBHelper.fetchRestaurants((error,restaurants)=>{if(error){callback(error,null)}else{const restaurant=restaurants.find(r=>r.id==id);if(restaurant){callback(null,restaurant)}else{callback('Restaurant does not exist',null)}}})}
static fetchRestaurantByCuisine(cuisine,callback){DBHelper.fetchRestaurants((error,restaurants)=>{if(error){callback(error,null)}else{const results=restaurants.filter(r=>r.cuisine_type==cuisine);callback(null,results)}})}
static fetchRestaurantByNeighborhood(neighborhood,callback){DBHelper.fetchRestaurants((error,restaurants)=>{if(error){callback(error,null)}else{const results=restaurants.filter(r=>r.neighborhood==neighborhood);callback(null,results)}})}
static fetchRestaurantByCuisineAndNeighborhood(cuisine,neighborhood,callback){DBHelper.fetchRestaurants((error,restaurants)=>{if(error){callback(error,null)}else{let results=restaurants
if(cuisine!='all'){results=results.filter(r=>r.cuisine_type==cuisine)}
if(neighborhood!='all'){results=results.filter(r=>r.neighborhood==neighborhood)}
callback(null,results)}})}
static fetchNeighborhoods(callback){DBHelper.fetchRestaurants((error,restaurants)=>{if(error){callback(error,null)}else{const neighborhoods=restaurants.map((v,i)=>restaurants[i].neighborhood)
const uniqueNeighborhoods=neighborhoods.filter((v,i)=>neighborhoods.indexOf(v)==i)
callback(null,uniqueNeighborhoods)}})}
static fetchCuisines(callback){DBHelper.fetchRestaurants((error,restaurants)=>{if(error){callback(error,null)}else{const cuisines=restaurants.map((v,i)=>restaurants[i].cuisine_type)
const uniqueCuisines=cuisines.filter((v,i)=>cuisines.indexOf(v)==i)
callback(null,uniqueCuisines)}})}
static urlForRestaurant(restaurant){return(`./restaurant.html?id=${restaurant.id}`)}
static imageUrlForRestaurant(restaurant){if(restaurant.photograph==undefined){restaurant.photograph=restaurant.id}
return(`./img/${restaurant.photograph}.webp`)}
static mapMarkerForRestaurant(restaurant,map){const marker=new L.marker([restaurant.latlng.lat,restaurant.latlng.lng],{title:restaurant.name,alt:restaurant.name,url:DBHelper.urlForRestaurant(restaurant)})
marker.addTo(newMap);return marker}}