let colorBank = ["#c2fcf2", "#c2ebfc", "#c2cefc",  "#cdc2fc", "#dfc2fc", "#fac2fc", "#fcc2ea"] // list of colors used

class Word{
    word; //stores the particular word from the puzzle word list
    isFound; //toggled once the word has been 'found' during the animation
    firstLetter; //first character of the word for simplicity
    word_element; //html element corresponding to the word
    color; //color to be assigned to all tiles with the word solution
    start_index; //index within the overall solution where the word is first located
    end_index; //the approximate index where the word solution ends
    
    
    //constructor - takes in a word and html element as parameters, assigns basic values to other class members
    constructor(word, word_element){
        this.word = word;
        this.word_element = word_element;
        this.firstLetter = word.slice(0, 1);
        this.isFound = false;
        this.color = colorBank[Math.floor(Math.random() * colorBank.length)];
    }

    //accessor functions
    getWord()
    {
        return this.word;
    }
    
    getIsFound()
    {
        return this.isFound;
    }

    getFirstLetter()
    {
        return this.firstLetter;
    }

    getWordElement()
    {
        return this.word_element;
    }

    getColor()
    {
        return this.color;
    }

    getStart()
    {
        return this.start_index;
    }

    getEnd()
    {
        return this.end_index;
    }
    
    //modifiers 
    setIsFound(isFound) // if the word is found, the html is assigned to a class that will change the text color and add a strikethrough
    {
        this.isFound = isFound;

        if (this.isFound)
        {
            this.word_element.setAttribute("class", "found");
            
        }
    }

    setStart(start)
    {
        this.start_index = start;
    }

    setEnd(end)
    {
        this.end_index = end;
    }

}

//stores all relevant data about the individual tiles within the puzzle
class Tile{
    letter; //the letter assigned to the tile
    isSelected; //for animation purposes: toggles when the animate function iterates over this particular tile within the solution
    i_index; //the row that this tile corresponds to
    j_index; //the position within the row (i-index) that this tile corresponds to
    isFound; //toggled if this tile is part of a word solution and the solution vector iterates over this tile at the appropiate time
    neighbors; //vector that documents alla adjacent tiles (key below)
    tile_element; //html element for the tile
    color; //color that will be assigned to the tile-element after isFound is toggled
    word; //the word that this tile solves (if applicable) //TODO: change to a vector
    
    
    /* -- neighbors key --
        a b c 
        d e f
        j k l

     tile = center(e)
     8 potential neighbors (0-7)
     0 - top left (a), 1 - directly above (b), 2 - top right (c)
     3 - directly left (d), 4 - directly right (f) 
     5 - bottom left (j), 6 - directly below (k), 7 - bottom right (l)
     */

    
    //constructor that takes in tile position and letter data as well as the relevant html element
    constructor(letter, i_index, j_index, tile_element)
    {
        this.letter = letter;
        this.i_index = i_index;
        this.j_index = j_index;
        this.tile_element = tile_element;
        this.isFound = false;
        this.neighbors = [null, null, null, null, null, null, null, null]; // setting initial values to null so that each tile has a neighbors array of length 8
        this.color = "";
        this.isSelected = false;
        this.word = "";
    }
   
    //modifiers
    setIsFound(isFound)
    {
        this.isFound = isFound;

        /*if(this.isFound)
        {
            this.tile_element.style.backgroundColor = color;
        }*/

        //this.color = color;
    }
    
    setNeighbors(index, tile)
    {
        this.neighbors[index] = tile;
    }
    
    setIsSelected(isSelected)
    {
        this.isSelected = isSelected;
    }

    setColor(color)
    {
        this.color = color;    
    }

    setWord_(word)
    {
        this.word = word;
    }
    
    //accessors
    getLetter()
    {
        return this.letter;
    }
    
    getIndex_i()
    {
        return this.i_index;
    }

    getIndex_j()
    {
        return this.j_index;
    }
    
    getTileElement(){
        return this.tile_element;
    }
    
    getIsFound()
    {
        return this.isFound;
    }
    
    getNeighbors()
    {
        return this.neighbors;
    }
    
    getColor()
    {
        return this.color;
    }
    
    getIsSelected()
    {
        return this.isSelected;
    }

    getWord_()
    {
        return this.word;
    }
}

class Puzzle{
    
    //algo functions
    //getTileByIndex
    //integration with HTML elements

    puzzle; //2D array of all tiles simulating the puzzle grid
    words; //words list array
    isCompleted = false; //toggled when the puzzle is fully solved
    dimension_x; //number of columns 
    dimension_y; //number of rows
    solution; //1D vector tracing the steps of the algorithm as it solves the puzzle
    id; //used for animation purposes 

    
    //constructor that creats the puzzle and words array, the intention is to use pdf files, 
    //but for now, the puzzle is hardcoded in main
    constructor(file, words)
    {
        //get file
        //use dimension to cycle through puzzle and create tiles and store them
        //in the puzzles array
        //store the words list in the words array
        //solutionMap = new Map();
        this.puzzle = file;
        this.words = words;
        
        this.dimension_x = puzzle[0].length;
        this.dimension_y = puzzle.length;
        
        this.setTileNeighbors(); //initializes the neighbors array for all tiles

        this.solution = [];
        
        this.id = null;
    }

    setTileNeighbors()
    {

        //TODO: absolve conditions into variables
        //checks to see whether a tile has a particular neighbor based on its location for each neighbor index, 
        //if it does, it stores the tile at that index
        for (let i = 0; i < this.dimension_y; i++)
        {
            for (let j = 0; j < this.dimension_x; j++)
            {
                if ((i - 1) >= 0 && (j - 1) >= 0)
                {
                    this.puzzle[i][j].setNeighbors(0, this.puzzle[i - 1][j - 1]);
                }

                if ((i - 1) >= 0)
                {
                    this.puzzle[i][j].setNeighbors(1, this.puzzle[i - 1][j]);
                }

                if ((i - 1) >= 0  && (j + 1) <= this.dimension_x - 1)
                {
                    this.puzzle[i][j].setNeighbors(2, this.puzzle[i - 1][j + 1]);
                }

                if ((j - 1) >= 0)
                {
                    this.puzzle[i][j].setNeighbors(3, this.puzzle[i][j - 1]);
                }

                if ((j + 1) < this.dimension_x)
                {
                    this.puzzle[i][j].setNeighbors(4, this.puzzle[i][j + 1]);
                }

                if ((i + 1) < this.dimension_y && (j - 1) >= 0)
                {
                    this.puzzle[i][j].setNeighbors(5, this.puzzle[i + 1][j - 1]);
                }

                if ((i + 1) < this.dimension_y)
                {
                    this.puzzle[i][j].setNeighbors(6, this.puzzle[i + 1][j]);
                }

                if ((i + 1) < this.dimension_y && (j + 1) < this.dimension_x)
                {
                    this.puzzle[i][j].setNeighbors(7, this.puzzle[i + 1][j + 1]);
                }
            }
        }
    }

    //accessors
    getPuzzle()
    {
        return this.puzzle;
    }

    getWords()
    {
        return this.words;
    }
    
    getIsCompleted()
    {
        return this.isCompleted;
    }

    getSolution()
    {
        return this.solution;
    }

    
    //recursively searches along a particular neighbors index 
    //called when an instance of the first letter of the target word is found
    search(word, index, tile, wordIndex)
    {
        if(wordIndex != word.length - 1) // once this condition is false, the function returns true
        {
            if (tile.getNeighbors()[index] == null) //avoiding out of bounds errors
            {
                return false;
            }
           
            this.solution.push(tile.getNeighbors()[index]); //adding the tile traces to the solution array

            if (word.slice(wordIndex + 1, wordIndex  + 2) != tile.getNeighbors()[index].getLetter() //if the letters are not equivalent, return false
            )
            {
                return false;
            }
            else
            {
                return this.search(word, index, tile.getNeighbors()[index], wordIndex + 1); //iterates to the following word index and tile, calls the funciton using these parameters
            }
                
        }
        return true;
    }

    findWord(word) //basic algorithm - searches for instances of the first letter of the target word, and then calls search()
    {
        
        for(let i = 0; i < this.dimension_y; i++) //iterating through puzzle linearly
        {
            for(let j = 0; j < this.dimension_x; j++) //iterating through puzzle linearly
            {
                this.solution.push(this.puzzle[i][j]) //adding tile traces to solution array 
                if(word.getFirstLetter() === this.puzzle[i][j].getLetter()) //checks to see if an instance has been found
                {
                    for (let index = 0; index < this.puzzle[i][j].getNeighbors().length; index++) //calls the search function on all tile neighbors
                    {
                        let start = this.solution.length; //used for the animation function later
                        if (this.search(word.getWord(), index, this.puzzle[i][j], 0)) //if the search algo is successful
                        {
                            let tile = this.puzzle[i][j]; //temporary variable for simplicity, points to the tile containing the first letter of the word
                            let color = colorBank[Math.floor(Math.random() * colorBank.length)]; //assigning color
                            //console.log(color);
                            word.setStart(start - 2); //seting start value to use in the animate function
                            //word.setEnd(word.getStart() + word.getWord().length - 1);
                            word.setEnd(this.solution.length); //seting end value to use in the animate function
                            for (let currIndex = 0; currIndex < word.getWord().length; currIndex++) //iterates through solution tiles to set some values for the animation
                            {
                                //tile.setIsFound(true, color);
                                tile.setWord_(word.getWord());
                                tile.setColor(word.getColor());
                                tile = tile.getNeighbors()[index];
                                
                            }

                            return;
                        }
                    }
                }
            }
        }
    }

    solve() //calls findWord for every word
    {
        //basic algorithm
        for (let i = 0; i < this.words.length; i++)
        {
            this.findWord(this.words[i]);
            //this.words[i].setIsFound(true);
        }

        this.isCompleted = true;
        this.animate(); //animates, or visualizes, the solution
    }

    animate() //adds animation by tracing through a flattened (linear) version of the algorithm movements
    {
        let index = 0; //keeps track of solution index
        let wordIndex = 0; //keeps track of the target word
        let counter = 0;
       
        this.id = setInterval(frame, 20, this.solution, this.words); //calling frame at an interval of 20 ms

        function frame(solution, words)
        {
            if (index >= solution.length) //terminates once the solution array has iterated to the end
            {
                clearInterval(this.id);
            }

            let tile = solution[index]; 
            let word = words[wordIndex];
            
            
            if (!tile.getIsSelected()) //momentarily highlights tile on the first iteration (each tile is iterated through twice)
            {
                tile.setIsSelected(true);
                tile.getTileElement().style.backgroundColor = "#faf275";
            }
            else //logic for second iteration of tile
            {
                tile.setIsSelected(false); //so that the above section will be executed first after the tile is revisited

                let start = word.getStart(); //accessing location of the start and end values of the word solution within the overall solution
                let end = word.getEnd();

                if (index >= start && index <= end) //if the solution index is within the start and end values, the function may be iterating over a solution tile
                {
                    if (solution[index].getWord_() != word.getWord()) //if tile is not part of the solution, end variable is incremented, bg color is reset
                    {
                        end++;
                        tile.getTileElement().style.backgroundColor = "";
                    }

                    else //else, bg color is set to tile color and isFound variable is toggled
                    {
                        tile.getTileElement().style.backgroundColor = tile.getColor();
                        counter++;
                        tile.setIsFound(true);
                    }
                }
                else if (!tile.getIsFound())
                {
                    tile.getTileElement().style.backgroundColor = ""; //resetting tile bg color if the tile is not a solution tile or if its corresponding word has yet to be iterated through
                }
                else 
                {
                    tile.getTileElement().style.backgroundColor = tile.getColor(); //resets to tile color if tile is part of a different word solution and has been found
                }
                index++; //iterates to next tile

                if (index == word.getEnd()) //iterates to next word if necessary
                {
                    counter = 0;
                    words[wordIndex].setIsFound(true);
                    wordIndex++;
                }
            }
        }
    }
}
        




//TODO: add round corners, change color scheme, use a drop shadow effect, create a color bank
// have each word highlighted in a different color
// figure out how to add sorting animations
//figure out how to use files instead
//find solution to overlap issue (circle instead of highlight)
//use greedy algo for color assignment

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







            
