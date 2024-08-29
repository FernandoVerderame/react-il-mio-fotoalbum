// Importo lo style del carosello
import postCarouselStyle from './CarouselPost.module.scss';

const CarouselPost = ({ id, image, isActive }) => {
    return (
        isActive && (
            <div>
                <figure className={postCarouselStyle.figure}>
                    <img src={image ? `http://${image}` : "https://placehold.co/600x400"} alt={`Photo-${id}`} className={postCarouselStyle.img} />
                </figure>
            </div>
        )
    );
}

export default CarouselPost;