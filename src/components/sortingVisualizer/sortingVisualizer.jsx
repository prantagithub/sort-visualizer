import React from 'react';
import './sortingVisualizer.css';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isActive: false,
            isReset: false,
            array :[],
            numOfEle: 70,
            delay: 50
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);
        this.changeElements = this.changeElements.bind(this);


    }

    componentDidMount(){
        this.resetArray();
    }
    resetArray(){
        const array = []
        let num = this.state.numOfEle;
        for(let i=0;i<num;i++){
            array.push(getRandomInt(10,600));
        }
        this.setState({array});
    }
    resetArray2(){
        const array = []
        let num = this.state.numOfEle;
        for(let i=0;i<num;i++){
            array.push(getRandomInt(10,600));
        }
        this.setState({isReset: true,array, isActive: false});
    }
    handleReset(){
        this.resetArray2();
    }
    async selectionSort(){
    this.setState({isReset: false});
    if(this.state.isActive===false){
        this.setState({isActive: true})
    }
    else return;
    const arr = this.state.array
    var i, j, min_idx;
    var n = arr.length;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++)
        if (arr[j] < arr[min_idx]){
            min_idx = j;
            if(this.state.isReset===true){
                this.refreshFinal();
                return;
            }
        }

        if(this.state.isReset===true){
            this.refreshFinal();
            return;
        }
            
        const DELAY = this.state.delay;
        // Swap the found minimum element with the first element
        this.setState({arr, "min_idx": min_idx,"idx": i});
        await sleep(DELAY);
        swap(arr,min_idx, i);
        this.setState({arr, "min_idx": min_idx,"idx": i});
        await sleep(DELAY);
    }
    this.refreshFinal()
}
    refreshFinal(){
        const array = this.state.array;
        this.setState({isActive: false,isReset: false,array, "min_idx": "","idx": ""});
    }
    handleClick(){
        this.selectionSort()
    }
    changeSpeed(){
        let m = document.getElementById('customRange3').value;
        m = 2020-m;
        this.setState({delay: m});
    }
    changeElements(){
        let m = document.getElementById('customRange2').value;
        this.setState({numOfEle: m});
    }
    render(){
        const {array, min_idx, idx} = this.state;
        let idx_css = "";
        return(
            <div className="main-container">
            <div className="sort-container">
                {array.map((value,index)=>{
                    idx_css = "";
                    if(index === idx) idx_css = "idx";
                    if(index ===min_idx) idx_css = "min-idx";
                    return(
                        <div className={`array-bar ${idx_css}`} key={index} style={{height: `${value+50}px`}}>
                            <div className="bar-text">{value}</div>
                            <div className="endcircle"></div>
                        </div>
                    )
                })}
                
            </div>
            <div className="slider-container">
            <div className="slider">
                <label for="customRange3" class="form-label">Speed</label>
                <input type="range" class="form-range" min="20" max="2000" placeholder="1970" onChange={this.changeSpeed} step="5" id="customRange3" />
            </div>
            <div className="slider">
                <label for="customRange3" class="form-label">Elements</label>
                <input type="range" class="form-range" min="10" max="100" onChange={this.changeElements} step="1" id="customRange2" />
            </div>
            </div>
            <div className="btn-container">
            
            <button className="trigger-sort" onClick={this.handleClick}>Sort</button>
            <button className="trigger-sort" onClick={this.handleReset}>Reset</button>
            </div>
            </div>
        )
    }
    
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function swap(arr,xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}