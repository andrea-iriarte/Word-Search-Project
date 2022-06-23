let colorBank = ["#c2fcf2", "#c2ebfc", "#c2cefc",  "#cdc2fc", "#dfc2fc", "#fac2fc", "#fcc2ea"] // list of colors used

 
//TODO: add round corners, change color scheme, use a drop shadow effect, create a color bank
// have each word highlighted in a different color
// figure out how to add sorting animations
//figure out how to use files instead
//find solution to overlap issue (circle instead of highlight)
//use greedy algo for color assignment
// !fog, shovel, are not showing up properly
//TODO: use the console to compare the start values to for the shovel and fog objects
//TODO: to the tiles at those indices 

//hardocding of puzzle
const title = "JANUARY";

const words = ["BLIZZARD", "BOOTS", "CARNATION", "DREARY", "FIRST", "FLU", "FOG", "FURNANCE",
                "GARNET", "HIBERNATE", "ICE", "JANUARY", "KING", "PARKA", "QUILT", "RESOLUTION",
                "SHOVEL", "SKATE", "SKI", "SNOW", "WINTER"];

const puzzle = [
                    ["N", "F", "C", "A", "R", "N", "A", "T", "I", "O", "N", "W", "R"],
                    ["O", "U", "E", "I", "D", "Y", "S", "T", "L", "E", "I", "T", "O"],
                    ["I", "R", "T", "N", "R", "R", "Y", "H", "O", "I", "U", "R", "I"],
                    ["T", "N", "A", "H", "A", "A", "E", "A", "O", "I", "U", "K", "D"],
                    ["U", "A", "N", "R", "Z", "U", "T", "T", "C", "V", "S", "Q", "R"],
                    ["L", "N", "R", "H", "Z", "N", "A", "E", "T", "E", "E", "V", "E"],
                    ["O", "C", "E", "S", "I", "A", "E", "R", "T", "Y", "P", "L", "A"],
                    ["S", "E", "B", "N", "L", "J", "A", "E", "U", "A", "Y", "I", "R"],
                    ["E", "S", "I", "O", "B", "T", "N", "L", "R", "H", "E", "B", "Y"],
                    ["R", "F", "H", "W", "G", "R", "F", "K", "T", "S", "R", "I", "F"],
                    ["E", "S", "O", "T", "A", "N", "A", "S", "K", "A", "T", "E", "D"],
                    ["A", "Y", "I", "G", "N", "T", "I", "R", "E", "T", "N", "I", "W"],
                    ["S", "T", "O", "O", "B", "H", "E", "K", "Y", "E", "A", "R", "W"]

                ];

const title_element = document.getElementById("title"); //html title element
const puzzle_element = document.getElementById("puzzle");//html puzzle block
const words_element = document.getElementById("words"); //html words list block
const words_list_element = document.getElementById("words-list"); // html words list element
let words_list = []; //array for words objects
let tiles_list = puzzle; //array for tiles objects

title_element.appendChild(document.createTextNode(title)); //setting title of the puzzle in the html

for (let i = 0; i < puzzle.length; i++) //creating individual tile elements and objects
{
    let row = document.createElement("ul"); //first creates the row for each i using an html ul tag
    row.setAttribute("id", "row-${i}");
    row.setAttribute("class", "rows");
    puzzle_element.appendChild(row);
    for(let j = 0; j < puzzle[0].length; j++)
    {
        let letter_tile = document.createElement("li"); //then creates the individual tile element using the li tag
        letter_tile.setAttribute("id", "${i}${j}");
        letter_tile.setAttribute("class", "tile");
        letter_tile.appendChild(document.createTextNode(puzzle[i][j]));
        row.appendChild(letter_tile); //appends tile element to the row list

        let tileObj = new Tile(puzzle[i][j], i, j, letter_tile); //creates tile object using its position and html element
        tiles_list[i][j] = tileObj; //adds tile to the tiles array

    }
}

for (let i = 0; i < words.length; i++) //creates a word object and html element for each word
{
    let word = document.createElement("li"); //creates the element using a li tag
   
    word.appendChild(document.createTextNode(words[i])); 
    word.setAttribute("id", words[i]);
    word.setAttribute("class", "list");
    words_list_element.appendChild(word); //adds the element to the words ul element 
    
    let wordObj = new Word(words[i], word); //creates a word object using the word string and the word li element
    words_list[i] = wordObj; //adds word object to the array
    
}

let puzz = new Puzzle(tiles_list, words_list); //creates a puzzle object using the tiles and words arrays
puzz.solve(); //calls the solve function



console.log(words_list[6]);
console.log(puzz.getSolution()[836]);


            
