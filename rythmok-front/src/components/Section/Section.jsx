import { Link } from 'react-router-dom'
import './section.scss'

const Section = (props) => {
    let typeOfData = props.children.props.children
    // console.log('type of data', typeOfData)
    return (
        <div className="section">
            <h2>{typeOfData}</h2>
            <div className="carousel">
                <div className="carousel__inner">
                    {props.info && props.info.map((infoItem, index)=>{
                        {/* console.log('image',infoItem.image) */}
                        if(infoItem.image) {
                            {/* console.log('ITEM',infoItem.name) */}
                            return (
                                <div key={index} className="section-card">
                                    <Link to={{ pathname: "/events", infoItem, typeOfData, props: {...props} }}>
                                        <img className="section-card__img" src={infoItem.image}></img>
                                        <span className="section-card__text" >{infoItem.name}</span>
                                    </Link>
                                </div>
                            )
                        }
                        if(!infoItem.image) {
                            return (
                                <div key={index} className="section-card section-card--style">
                                    <Link to={{ pathname: "/events", infoItem, typeOfData, props: {...props} }}>
                                        <span className="section-card__text" >{infoItem}</span>
                                    </Link>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Section