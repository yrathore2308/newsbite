import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps={
        country:"in",
        pagesize:5,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pagesize:PropTypes.number,
        category:PropTypes.string
    }
    capatalizeFirstLetter=(str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalArticles:0
        }
        document.title=`${this.capatalizeFirstLetter(this.props.category)}-NewsBite`
    }
   
    async updateNews(){
        this.props.setProgress(10);
        this.setState({
            loading:true
        });
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        let data= await fetch(apiUrl);
        this.props.setProgress(30);
        let parsedData=await data.json();
        this.props.setProgress(50);
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalArticles:parsedData.totalResults
        });
        this.props.setProgress(100)

    }
    async componentDidMount(){
        //call after render method
        // let apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        // let data= await fetch(apiUrl);
        // let parsedData=await data.json();
        // console.log("Data from news api",parsedData);
        // this.setState({
        //     articles:parsedData.articles,
        //     loading:false,totalArticles:parsedData.totalResults
        // });
        this.updateNews();

    }
     handlePreviousClick=async ()=>{
        // this.setState({
        //     loading:true
        // });
        // let apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
        // let data= await fetch(apiUrl);
        // let parsedData=await data.json();
        // console.log("Data from news api",parsedData);
        // this.setState({
        //     articles:parsedData.articles,
        //     loading:false,
        //     page:this.state.page-1
        // },()=>{console.log("Value after previous click",this.state.page);}
        // );
        this.setState({
            page:this.state.page-1
        });
        await this.updateNews();
       

    }
     handleNextClick=async ()=>{
        // if (this.state.page+1>Math.ceil(this.state.totalArticles/this.props.pagesize)) {
        //     console.log("Max Pagination reached");
        // } else {
        //     this.setState({
        //         loading:true
        //     });
        //     let apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
        //     let data= await fetch(apiUrl);
        //     let parsedData=await data.json();
        //     console.log("Data from news api",parsedData);
        //     this.setState({
        //         articles:parsedData.articles,
        //         loading:false,
        //         page:this.state.page+1
        //     },()=>{console.log("Value after next click",this.state.page);}
        //     );
        // }
        this.setState({
            page:this.state.page+1
        });
        await this.updateNews();
    }

    fetchMoreData=async ()=>{
        this.setState({
            page:this.state.page+1
        });
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        let data= await fetch(apiUrl);
        let parsedData=await data.json();
        console.log("Data from news api",parsedData);
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalArticles:parsedData.totalResults
        }); 
    }

    
    render() {
        return (
            // this.state.loading?(<div className="container my-3">
            //     <Loader/>
            // </div>):(<div className="container my-3">
            //     <h2 className="text-center">NewsBite - Top {this.capatalizeFirstLetter(this.props.category)} Headlines</h2>
            //     <div className="row">
            //     {this.state.articles.map((element)=>{
            //         return <div className="col-md-4" key={element.url}>
            //          <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage?element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7HjpHNuzVssA9WGGtdCI0kC6gnLmjbMVuw&usqp=CAU"} newsUrl={element.url} author={element.author?element.author:"Anonymous"} date={element.publishedAt} source={element.source.name} />
            //          </div>
            //     })}   
                   
            //     </div>
            //     <div className="container d-flex justify-content-between">
                    
            //     <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
            //     <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
            //     </div>
            // </div>)
            <>
                <h2 className="text-center">NewsBite - Top {this.capatalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Loader/>}
            <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalArticles}
          loader={<Loader/>}
        >
            <div className="container my-3">
            <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                     <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage?element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7HjpHNuzVssA9WGGtdCI0kC6gnLmjbMVuw&usqp=CAU"} newsUrl={element.url} author={element.author?element.author:"Anonymous"} date={element.publishedAt} source={element.source.name} />
                     </div>
                })}   
                   
                </div>
                </div>
        </InfiniteScroll>
        </>
        )
    }
}

export default News;
