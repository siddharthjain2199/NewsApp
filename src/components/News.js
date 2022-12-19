import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
// export class News extends Component {
    // articles =  [
    // we can use it for sample data
    // ]

    // static defaultProps = {
    //     country: 'in',
    //     pageSize: 8,
    //     category: 'general'
    // }

    // static propsTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,
    // }

    const capitalizeFL = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0
    //     }
    //     document.title = `${this.capitalizeFL(props.category)} - NewsSid`;
    // }

    // async update() {
    const update = async () =>{
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `${capitalizeFL(props.category)} - NewsSid`;
        update();
        // eslint-disable-next-line
    }, [])
    
    // async componentDidMount() {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0ea908d0e11d4e8ba3ddb5ff5ebc6b80&page=1&pageSize=${props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({articles: parsedData.articles,
    //     //     totalResults: parsedData.totalResults,
    //     //     loading:false
    //     // })
    //     this.update();
    // }

    // handlePreviousClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0ea908d0e11d4e8ba3ddb5ff5ebc6b80&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({
    //     //     page: this.state.page-1,
    //     //     articles: parsedData.articles,
    //     //     loading:false
    //     // })
    //     this.setState({
    //         page: this.state.page - 1,
    //         loading: false
    //     })
    //     this.update();
    // }

    // handleNextClick = async () => {
    //     // if(!(this.state.page+1> Math.ceil(this.state.totalResults/props.pageSize))){
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0ea908d0e11d4e8ba3ddb5ff5ebc6b80&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({
    //     //     page: this.state.page+1,
    //     //     articles: parsedData.articles,
    //     //     loading:false
    //     // })}
    //     this.setState({
    //         page: this.state.page + 1,
    //         loading: false
    //     })
    //     this.update();
    // }

    const fetchMoreData = async () => {
            // this.setState({ page: this.state.page + 1 })  
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat( parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // this.setState({
        //     articles: this.state.articles.concat( parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
    };

    // render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '35px 0px', marginTop : '90px'}}>NewsSid - Top {capitalizeFL(props.category)} Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    // dataLength={state.articles.length}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                    // endMessage={
                    //     <p style={{ textAlign: "center" }}>
                    //         <b>Yay! You have seen it all</b>
                    //     </p>
                    // }
                >
                    <div className="container">
                        <div className="row">
                            {/* {!this.state.loading && this.state.articles.map((element) => { */}
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    // }
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
