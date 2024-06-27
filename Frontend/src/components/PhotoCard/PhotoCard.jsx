import photoCardStyle from './PhotoCard.module.scss';

const PostCard = ({ title, image, description, categories, user }) => {

    const abstract = () => description ? description.slice(0, 60) + '...' : '';

    return (
        <div className={photoCardStyle.photoCard}>

            <div className={photoCardStyle.image}>
                <img src={image ? image : "https://placehold.co/600x400"} alt={title} className={photoCardStyle.img} />
            </div>

            <div className={photoCardStyle.bottom}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5">{title}</h3>
                </div>

                <p className={photoCardStyle.paragraph}>{abstract()}</p>

                <div className={photoCardStyle.dFlex}>

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
                <p className="mt-3 mb-0 fst-italic text-center">{user?.name}</p>
            </div>
        </div>
    );
}

export default PostCard;
