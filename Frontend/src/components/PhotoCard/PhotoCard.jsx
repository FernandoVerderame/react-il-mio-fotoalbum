import photoCardStyle from './PhotoCard.module.scss';

const PhotoCard = ({ title, image, user, categories }) => {

    return (
        <section id="photo-card">

            <div className={photoCardStyle.photoCard}>

                <div className={photoCardStyle.thumb}>
                    <div className={photoCardStyle.image}>
                        <img src={image ? `http://${image}` : "https://placehold.co/600x400"} alt={title} className={photoCardStyle.img} />
                    </div>
                </div>

                <div className={photoCardStyle.bottom}>
                    <div className="photo-title">
                        <h3 className="h5 m-0">{title}</h3>
                    </div>
                    <ul className="photo-categories d-flex m-0 p-0 list-unstyled gap-1 justify-content-center">
                        {categories?.map(({ id, name, color }) =>
                            <li key={`category-${id}`}>
                                <span className='badge' style={{ backgroundColor: color }} >
                                    {name}
                                </span>
                            </li>
                        )}
                    </ul>
                    <div className="photo-author">
                        <p className="fst-italic m-0">{user?.name}</p>
                    </div>
                </div>
            </div>

        </section>

    );
}

export default PhotoCard;
