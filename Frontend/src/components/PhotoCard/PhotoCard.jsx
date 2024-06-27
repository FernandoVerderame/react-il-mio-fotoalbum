import photoCardStyle from './PhotoCard.module.scss';

const PostCard = ({ title, image, description, categories, user, isShow }) => {

    return (
        <section id="photo-card">

            <div className={photoCardStyle.photoCard}>

                <div className="thumb d-flex justify-content-center pt-5">
                    <div className={photoCardStyle.image}>
                        <img src={image ? image : "https://placehold.co/600x400"} alt={title} className={photoCardStyle.img} />
                    </div>
                </div>

                <div className={photoCardStyle.bottom}>
                    <div className="photo-title">
                        <h3 className="h5">{title}</h3>
                    </div>
                    <div className="photo-author">
                        <p className="fst-italic">{user?.name}</p>
                    </div>
                </div>
            </div>

            {isShow &&
                <div className="photo-info">

                    <div className="photo-desc">
                        <p className={photoCardStyle.paragraph}>{description}</p>
                    </div>

                    <div className="photo-cat">
                        {categories?.length > 0 ? (
                            <div>
                                <ul className="m-0 p-0 d-flex gap-2" style={{ listStyle: 'none' }}>
                                    {categories.map((category, i) => (
                                        <li key={`category-${i}`} style={{ backgroundColor: category.color }} className="badge">
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>Nessuna categoria</p>
                        )}
                    </div>
                </div>
            }

        </section>

    );
}

export default PostCard;
