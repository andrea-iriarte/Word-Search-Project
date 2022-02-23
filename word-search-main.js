//import {Tile} from "/Tile.js";
//import {Word} from "/Word.js";
//import {Puzzle} from "/puzzle.js";

//let colorBank = ["#d28fff", "#8f98ff", "#8ff0ff", "#a2ff8f", "#ff8ff4"];
let colorBank = ["#c2fcf2", "#c2ebfc", "#c2cefc",  "#cdc2fc", "#dfc2fc", "#fac2fc", "#fcc2ea"]
class Word{
    word = "";
    isFound;
    firstLetter;
    word_element;
    color;
    start_index;
    end_index;
    
    constructor(word, word_element){
        this.word = word;
        this.word_element = word_element;
        this.firstLetter = word.slice(0, 1);
        this.isFound = false;
        this.color = colorBank[Math.floor(Math.random() * colorBank.length)];
    }

    getIsFound()
    {
        return this.isFound;
    }

    getWord()
    {
        return this.word;
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
    
    setIsFound(isFound)
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

class Tile{
    letter;
    isSelected;
    i_index;
    j_index;
    isFound;
    neighbors;
    tile_element;
    color;
    word;
    
    //a b c 
    //d e f
    //j k l

    // tile = center(e)
    // 8 potential neighbors (0-7)
    // 0 - top left (a), 1 - directly above (b), 2 - top right (c)
    // 3 - directly left (d), 4 - directly right (f) 
    // 5 - bottom left (j), 6 - directly below (k), 7 - bottom right (l)

    constructor(letter, i_index, j_index, tile_element)
    {
        this.letter = letter;
        this.i_index = i_index;
        this.j_index = j_index;
        this.tile_element = tile_element;
        this.isFound = false;
        this.neighbors = [null, null, null, null, null, null, null, null];
        this.color = "";
        this.isSelected = false;
        this.word = "";
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

    getNeighbors()
    {
        return this.neighbors;
    }

    getIsSelected()
    {
        return this.isSelected;
    }

    getIsFound()
    {
        return this.isFound;
    }

    getWord_()
    {
        return this.word;
    }

    /*getIndex_i()
    {
        return this.i_index;
    }

    getIndex_j()
    {
        return this.j_index;
    }*/

    getLetter()
    {
        return this.letter;
    }

    getTileElement(){
        return this.tile_element;
    }

    getColor()
    {
        return this.color;
    }
    
}

class Puzzle{
    //2d Tile array
    //word array
    //accessor / modifier functions
    //algo functions
    //isCompleted bool?
    //getTileByIndex
    //integration with HTML elements

    puzzle;
    words;
    isCompleted = false;
    solutionMap;
    dimension_x; 
    dimension_y;
    solution;
    wordSolution;
    id;

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
        
        this.setTileNeighbors();

        this.solution = [];
        
        this.id = null;
    }

    setTileNeighbors()
    {

        //absolve conditions into variables
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

    
    getPuzzle()
    {
        return this.puzzle;
    }

    getWords()
    {
        return this.words;
    }

    getSolution()
    {
        return this.solution;
    }

    getIsCompleted()
    {
        return this.isCompleted;
    }

    search(word, index, tile, wordIndex)
    {
          
       
       if(wordIndex != word.length - 1)
        {
            if (tile.getNeighbors()[index] == null)
            {
                return false;
            }
            console.log(typeof words[1]);
            this.solution.push(tile.getNeighbors()[index]);

            //console.log(typeof tile);
            if (word.slice(wordIndex + 1, wordIndex  + 2) != tile.getNeighbors()[index].getLetter()
            )
            {
                return false;
            }
            else
            {
                return this.search(word, index, tile.getNeighbors()[index], wordIndex + 1);
            }
                
        }
        return true;
    }

    findWord(word)
    {
        
        for(let i = 0; i < this.dimension_y; i++)
        {
            for(let j = 0; j < this.dimension_x; j++)
            {
                this.solution.push(this.puzzle[i][j])
                if(word.getFirstLetter() === this.puzzle[i][j].getLetter())
                {
                    for (let index = 0; index < this.puzzle[i][j].getNeighbors().length; index++)
                    {
                        let start = this.solution.length;
                        if (this.search(word.getWord(), index, this.puzzle[i][j], 0))
                        {
                            let tile = this.puzzle[i][j];
                            let color = colorBank[Math.floor(Math.random() * colorBank.length)];
                            //console.log(color);
                            word.setStart(start - 2);
                            //word.setEnd(word.getStart() + word.getWord().length - 1);
                            word.setEnd(this.solution.length);
                            for (let currIndex = 0; currIndex < word.getWord().length; currIndex++)
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

    solve()
    {
        //basic algorithm
        for (let i = 0; i < this.words.length; i++)
        {
            this.findWord(this.words[i]);
            //this.words[i].setIsFound(true);
        }

        this.isCompleted = true;
        this.animate();
    }

    animate()
    {
        let index = 0;
        let wordIndex = 0;
        let counter = 0;
       
        this.id = setInterval(frame, 20, this.solution, this.words);

         function frame(solution, words)
        {
            if (index >= solution.length)
            {
                clearInterval(this.id);
            }

            let tile = solution[index];
            let word = words[wordIndex];
            
            
            if (!tile.getIsSelected())
            {
                tile.setIsSelected(true);
                tile.getTileElement().style.backgroundColor = "#faf275";
            }
            else
            {
                tile.setIsSelected(false);

                console.log(solution[index]);
                let start = word.getStart();
                let end = word.getEnd();

                if (index >= start && index <= end)
                {
                    if (solution[index].getWord_() != word.getWord())
                    {
                        end++;
                        tile.getTileElement().style.backgroundColor = "";
                    }

                    else
                    {
                        tile.getTileElement().style.backgroundColor = tile.getColor();
                        counter++;
                        tile.setIsFound(true);
                    }
                }
                else if (!tile.getIsFound())
                {
                    tile.getTileElement().style.backgroundColor = "";
                }
                else 
                {
                    tile.getTileElement().style.backgroundColor = tile.getColor();
                }
                index++;

                if (index == word.getEnd())
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

const title_element = document.getElementById("title");
const puzzle_element = document.getElementById("puzzle");
const words_element = document.getElementById("words");
const words_list_element = document.getElementById("words-list");
let words_list = [];
let tiles_list = puzzle;
colors = [];

title_element.appendChild(document.createTextNode(title));

for (let i = 0; i < puzzle.length; i++)
{
    let row = document.createElement("ul");
    row.setAttribute("id", "row-${i}");
    row.setAttribute("class", "rows");
    puzzle_element.appendChild(row);
    for(let j = 0; j < puzzle[0].length; j++)
    {
        let letter_tile = document.createElement("li");
        letter_tile.setAttribute("id", "${i}${j}");
        letter_tile.setAttribute("class", "tile");
        letter_tile.appendChild(document.createTextNode(puzzle[i][j]));
        row.appendChild(letter_tile);

        let tileObj = new Tile(puzzle[i][j], i, j, letter_tile);
        tiles_list[i][j] = tileObj;

    }
}

for (let i = 0; i < words.length; i++)
{
    let word = document.createElement("li");
   
    word.appendChild(document.createTextNode(words[i]));
    word.setAttribute("id", words[i]);
    word.setAttribute("class", "list");
    words_list_element.appendChild(word);
    
    let wordObj = new Word(words[i], word);
    words_list[i] = wordObj;
    //console.log(typeof words[i])
}
//console.log(typeof words_list[1])
let puzz = new Puzzle(tiles_list, words_list);
puzz.solve();
console.log(Math.floor(Math.random() * 5));






            
