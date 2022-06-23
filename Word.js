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