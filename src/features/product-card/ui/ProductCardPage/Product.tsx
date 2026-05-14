import ProductShowcase from "@/widgets/ProductShowcase/ProductShowcase";
import productCard from "@/data/productCard.json"

import styles from './Product.module.css'
import Image from "next/image";

export default function Product() {
    return (
        <div>
            <ProductShowcase
            brand={productCard.brand}
            title={productCard.title}
            description={productCard.description}
            price={productCard.price}
            code={productCard.code}
            size={productCard.size}
            rating={productCard.rating}
            images={productCard.images}
            link={productCard.link}
            />
            <div className={styles.catalog}>
                <h2 className={styles.catalogTitle}> You may also like </h2>
                <div className={styles.catalogList}>
                {productCard.botonImages.map((item,key)=> (
                    <div key={key} className={styles.catalogProduct}>
                    <Image

                        src={item.image.src}
                        alt={item.image.alt}
                        width={413}
                        height={387}
                    />
                        <button className={styles.btnAdd}>Like</button>
                        {/*<button className={styles.btnLike}>Cart</button>*/}
                        <div className={styles.titleInfoImage}>
                        <ul>{item.title}</ul>
                        <ul>{item.price}</ul>
                        </div>
                        </div>
                ))}
            </div>
            </div>
        </div>
    );
};


