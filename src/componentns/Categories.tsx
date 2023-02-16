import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
    value:number;
    onChangeCategory: (index:number) => void
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories:React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {

    useWhyDidYouUpdate('Categories', {value, onChangeCategory} )


    return (
        <div className="categories">
            <ul>
                {categories.map((el, index) =>
                    <li key={index} className={value === index ? 'active': ''} onClick={() => onChangeCategory(index)}>{el}</li>
                )}
            </ul>
        </div>
    );
})

export default Categories;