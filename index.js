import express from "express";
import bodyParser from "body-parser"
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

app.get("/", (req, res) => {
    res.render("index.ejs");
})
app.get("/search", (req, res) => {
    res.render("search.ejs");
})
app.post("/search", async (req, res) => {
    const drinkName = req.body["cocktail_name"];
    // console.log(drinkName);
    try {
        const response = await axios.get(`${API_URL}/search.php?s=${drinkName}`);
        const result = response.data;
        // console.log(result);
        res.render("search.ejs", { recipies: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }

})


app.post("/recipie", async (req, res) => {
    const userPickedDrink = req.body["drink_ID"];
    console.log(userPickedDrink);
    
    try {
        const response = await axios.get(`${API_URL}/lookup.php?i=${userPickedDrink}`);
        const result = response.data;
        const temp=result.drinks[0];
        console.log(temp);
        let ingredients=[];
        for(var i=1;i<=15;i++){
            if(temp["strIngredient"+i]===null) break;
            else{
                const element=temp["strMeasure"+i]+" "+temp["strIngredient"+i]
                ingredients.push(element);
            }
        }
        res.render("recipie.ejs", { 
            chosenDrink : result,
            ingredients: ingredients,
         });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
})


