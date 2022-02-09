//import {Tile} from "/Tile.js";
//import {Word} from "/Word.js";
//import {Puzzle} from "/puzzle.js";

class Word{
    word;
    isFound;
    firstLetter;
    word_element;
    
    constructor(word, word_element){
        this.word = word;
        this.word_element = word_element;
        this.firstLetter = word.slice(0, 1);
        this.isFound = false;
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
    
    setIsFound(isFound)
    {
        this.isFound = isFound;

        if (this.isFound)
        {
            this.word_element.setAttribute("class", "found");
        }
    }

}

class Tile{
    letter;
    isSelected = false;
    i_index;
    j_index;
    isFound;
    neighbors;
    tile_element;

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
    }

    setIsSelected(isSelected)
    {
        this.isSelected = isSelected;
    }

    setIsFound(isFound)
    {
        this.isFound = isFound;

        if(this.isFound)
        {
            this.tile_element.setAttribute("class", "tile-found");
        }
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

    getIndex_i()
    {
        return this.i_index;
    }

    getIndex_j()
    {
        return this.j_index;
    }

    getLetter()
    {
        return this.letter;
    }

    getTileElement(){
        return this.tile_element;
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

    constructor(file, words)
    {
        //get file
        //use dimension to cycle through puzzle and create tiles and store them
        //in the puzzles array
        //store the words list in the words array
        //solutionMap = new Map();
        
        this.puzzle = file;
        this.words = words;

        this.dimension_x = file[0].length;
        this.dimension_y = file.length;

        this.setTileNeighbors();

        
    }

    setTileNeighbors()
    {
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
        return this.solutionMap;
    }

    getIsCompleted()
    {
        return this.isCompleted;
    }

    solve()
    {
        //basic algorithm

        for (let i = 0; i < this.words.length; i++)
        {
            var word = this.words[i].getWord();
            findWord(word);
            console.log(typeof word);
            words[i].setIsCompleted(true);
            
        }

        this.isCompleted = true;
    }

    findWord(word)
    {
        for (let i = 0; i < this.dimension_y; i++)
        {
            for (let j = 0; j < this.dimension_x; j++)
            {
                if(word.substring(0, 1) === this.puzzle[i][j].getLetter())
                {
                    for (let z = 0; z < 8; z++)
                    {
                        if (this.puzzle[i][j].getNeighbors()[z].getLetter() === word.substring(1, 2))
                        {
                            if (search(word, z, this.puzzle[i][j], 1))
                            {

                                let solution = [];
                                let tile = this.puzzle[i][j];

                                for (let v = 0; v < word.length; v++)
                                {
                                    solution[v] = tile;
                                    tile.setIsFound(true);
                                    tile = tile.getNeighbors()[z];
                                }

                                this.solutionMap.set(word, solution);
                                break;
                            }
                        }
                    }
                }
        }   } 
    }

    search(word, index, tile, wordIndex)
    {
        if(wordIndex != word.length - 1)
        {
            if (word.slice(wordIndex + 1, wordIndex  + 2) != tile.getNeighbors[index].getLetter()
            )
            {
                return false;
            }
            else
                return this.search(word, index, tile.getNeighbors[index], wordIndex + 1);
        }

        return true;
    }
    

}

const title = "JANUARY"

const words = ["BLIZZARD", "BOOTS", "CARNATION", "DREARY", "FIRST", "FLU", "FOG", "FURNANCE",
                "GARNET", "HIBERNATE", "ICE", "JANUARY", "KING", "PARKA", "QUILT", "RESOLUTION",
                "SHOVEL", "SKATE", "SKI", "SNOW", "WINTER"];

const puzzle = [
                    ["N", "F", "C", "A", "R", "N", "A", "T", "I", "O", "N", "W", "R"],
                    ["O", "U", "E", "I", "D", "Y", "S", "T", "L", "E", "I", "T", "O"],
                    ["I", "R", "T", "N", "R", "R", "Y", "H", "O", "I", "U", "R", "I"],
                    ["T", "N", "A", "H", "A", "A", "E", "A", "O", "I", "U", "K", "D"],
                    ["U", "A", "N", "R", "Z", "U", "T", "T", "C", "V", "S", "Q", "R"],
                    ["L", "C", "R", "H", "Z", "N", "A", "E", "T", "E", "E", "V", "E"],
                    ["O", "E", "E", "S", "I", "A", "E", "R", "T", "Y", "P", "L", "A"],
                    ["S", "D", "B", "N", "L", "J", "A", "E", "U", "A", "Y", "I", "R"],
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
let words_list = words;
let tiles_list = puzzle;

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
    console.log(typeof words[i])
}

let puzz = new Puzzle(tiles_list, words_list);
puzz.findWord(words[0]);