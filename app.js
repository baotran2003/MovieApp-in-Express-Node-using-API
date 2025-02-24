const { error } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const request = require("request");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/results", (req, res) => {
    // Lấy giá trị của tham số search từ query string của URL
    let query = req.query.search;

    // dùng để gửi HTTP request đến một URL cụ thể
    request(
        "https://api.themoviedb.org/3/search/movie?api_key=b0081937512d6c64cc363b1f5941e88d&query=" + query,
        (error, response, body) => {
            if (error) {
                console.log(error);
            }
            let data = JSON.parse(body);
            res.render("movies", { data: data, searchQuery: query });
        }
    );
});

app.get("/search", (req, res) => {
    res.render("search");
});

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
