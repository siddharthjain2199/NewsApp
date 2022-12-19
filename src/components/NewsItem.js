import React from 'react'

const NewsItem = (props)=>{
// export class NewsItem extends Component {
    // render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = props //this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{right:'0',position:'absolute', display:'flex',justifyContent:'flex-end'}}>
                    <span className="badge rounded-pill bg-danger">
                        {source}</span>
                        </div>
                    <img src={imageUrl ? imageUrl : "https://cdn-icons-png.flaticon.com/512/21/21601.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    // }
}

export default NewsItem
