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
        if (this.color === "")
        {
            this.color = color;
        }  
    }

    setWord_(word)
    {
        if (this.word === "")
        {
            this.word = word;
        }
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
