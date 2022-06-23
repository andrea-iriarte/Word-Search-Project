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
        //if it does, it stores the neighbor tile at that index
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
                            
                            word.setStart(start - 8); //setting start value to use in the animate function
                            word.setEnd(this.solution.length); //setting end value to use in the animate function
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
                tile.setIsSelected(true); //so that the below section of code will execute after the first iteration
                tile.getTileElement().style.backgroundColor = "#faf275"; //highlighter hue
            }
            else //logic for second iteration of tile
            {
                tile.setIsSelected(false); //so that the above section will be executed first after the tile is revisited

                let start = word.getStart(); //accessing location of the start and end values of the word solution within the overall solution
                let end = word.getEnd();

                if (tile.getIsFound())
                {
                    tile.getTileElement().style.backgroundColor = tile.getColor();
                }
                else if (index >= start && index <= end) //if the solution index is within the start and end values, the function may be iterating over a solution tile
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
                /*else 
                {
                    tile.getTileElement().style.backgroundColor = tile.getColor(); //resets to tile color if tile is part of a different word solution and has been found
                }*/
                index++; //iterates to next tile

                if (index == word.getEnd()) //iterates to next word if necessary
                {
                    
                    
                    counter = 0;
                    words[wordIndex].setIsFound(true);
                    wordIndex++;
                    if(words[wordIndex].getWord() === "FOG")
                    {
                        console.log(index);
                    }
                    
                    
                }
            }
        }
    }
}