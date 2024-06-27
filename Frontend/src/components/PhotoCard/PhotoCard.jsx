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
                    <div className="">
                        <h3 className="h5">{title}</h3>
                    </div>

                    <div className={photoCardStyle.dFlex}>


                    </div>
                    <p className="mb-0 fst-italic">{user?.name}</p>
                </div>
            </div>

            <div className="photo-info">

                <div className="photo-desc">
                    {isShow && (
                        <p className={photoCardStyle.paragraph}>{description}</p>
                    )}
                </div>

                <div className="photo-cat">
                    {isShow && (
                        <div>
                            {categories?.length > 0 ? (
                                <div>
                                    <ul className={photoCardStyle.categories}>
                                        {categories.map((category, i) => (
                                            <li key={`category-${i}`} style={{ backgroundColor: category.color || '#ccc' }} className={photoCardStyle.photoBadge}>
                                                {category.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>Nessuna categoria</p>
                            )}
                        </div>
                    )}
                </div>

            </div>

        </section>

    );
}

export default PostCard;
